import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({});
const TABLE = process.env.TABLE_NAME || "dora-metrics";

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.rawPath || event.path || "/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (method === "OPTIONS") return { statusCode: 200, headers, body: "" };

  // POST /metrics — record a deployment event
  if (method === "POST" && path.includes("metrics")) {
    const body = JSON.parse(event.body || "{}");
    const item = {
      deploymentId: Date.now().toString(),
      timestamp: new Date().toISOString(),
      repo: body.repo || "unknown",
      status: body.status || "success",
      leadTimeMinutes: body.leadTimeMinutes || 0,
      ...body
    };
    await client.send(new PutItemCommand({
      TableName: TABLE,
      Item: marshall(item)
    }));
    return { statusCode: 201, headers, body: JSON.stringify({ ok: true, item }) };
  }

  // GET /metrics — return all deployments + DORA calculations
  if (method === "GET" && path.includes("metrics")) {
    const { Items = [] } = await client.send(new ScanCommand({ TableName: TABLE }));
    const deployments = Items.map(i => unmarshall(i));
    const successful = deployments.filter(d => d.status === "success");
    const failed = deployments.filter(d => d.status === "failure");
    const avgLeadTime = deployments.reduce((s,d) => s + (d.leadTimeMinutes||0), 0) / (deployments.length || 1);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        deployments,
        dora: {
          deploymentFrequency: deployments.length,
          successRate: deployments.length ? (successful.length / deployments.length * 100).toFixed(1) : 0,
          changeFailureRate: deployments.length ? (failed.length / deployments.length * 100).toFixed(1) : 0,
          avgLeadTimeMinutes: avgLeadTime.toFixed(1)
        }
      })
    };
  }

  return { statusCode: 404, headers, body: JSON.stringify({ error: "Not found" }) };
};