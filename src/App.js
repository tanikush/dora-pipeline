import { useState, useEffect } from "react";

const API = "https://01u368r3fl.execute-api.ap-south-1.amazonaws.com";

function MetricCard({ label, value, unit, status }) {
  const colors = { ELITE: "#1D9E75", HIGH: "#185FA5", MEDIUM: "#BA7517", LOW: "#A32D2D" };
  return (
    <div style={{background:"#f8f8f6",borderRadius:12,padding:"16px 20px",textAlign:"center"}}>
      <div style={{fontSize:28,fontWeight:500,color:"#1a1a18"}}>{value}<span style={{fontSize:14,color:"#888"}}>{unit}</span></div>
      <div style={{fontSize:13,color:"#666",margin:"4px 0"}}>{label}</div>
      <div style={{fontSize:11,fontWeight:500,color:colors[status]||"#888"}}>{status}</div>
    </div>
  );
}

export default function App() {
  const [dora, setDora] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ repo:"", status:"success", leadTimeMinutes:30 });

  const fetchMetrics = () => {
    setLoading(true);
    fetch(`${API}/metrics`)
      .then(r => r.json())
      .then(data => { setDora(data.dora); setDeployments(data.deployments || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchMetrics(); }, []);

  const recordDeployment = () => {
    fetch(`${API}/metrics`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) })
      .then(() => { fetchMetrics(); setForm({ repo:"", status:"success", leadTimeMinutes:30 }); });
  };

  const getStatus = (value, metric) => {
    if (metric === "freq") return value >= 1 ? "ELITE" : value >= 0.5 ? "HIGH" : "MEDIUM";
    if (metric === "cfr") return value < 5 ? "ELITE" : value < 15 ? "HIGH" : "MEDIUM";
    if (metric === "lead") return value <= 60 ? "ELITE" : value <= 1440 ? "HIGH" : "MEDIUM";
    return "MEDIUM";
  };

  return (
    <div style={{fontFamily:"system-ui",maxWidth:680,margin:"0 auto",padding:24}}>
      <h1 style={{fontSize:20,fontWeight:500,marginBottom:6}}>DORA Metrics Dashboard</h1>
      <p style={{fontSize:13,color:"#888",marginBottom:24}}>DevOps Research and Assessment — 4 key engineering metrics</p>

      {loading ? <p>Loading...</p> : dora && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
          <MetricCard label="Deployment Frequency" value={dora.deploymentFrequency} unit=" deploys" status={getStatus(dora.deploymentFrequency,"freq")}/>
          <MetricCard label="Avg Lead Time" value={dora.avgLeadTimeMinutes} unit=" min" status={getStatus(+dora.avgLeadTimeMinutes,"lead")}/>
          <MetricCard label="Success Rate" value={dora.successRate} unit="%" status="HIGH"/>
          <MetricCard label="Change Failure Rate" value={dora.changeFailureRate} unit="%" status={getStatus(+dora.changeFailureRate,"cfr")}/>
        </div>
      )}

      <div style={{background:"#f8f8f6",borderRadius:12,padding:"16px 20px",marginBottom:24}}>
        <h3 style={{fontSize:14,fontWeight:500,marginBottom:12}}>Record deployment event</h3>
        <input placeholder="Repo name" value={form.repo} onChange={e=>setForm({...form,repo:e.target.value})} style={{width:"100%",marginBottom:8,padding:"8px 12px",borderRadius:6,border:"0.5px solid #ccc",fontSize:13}}/>
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} style={{width:"100%",marginBottom:8,padding:"8px 12px",borderRadius:6,border:"0.5px solid #ccc",fontSize:13}}>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
        <label style={{fontSize:12,color:"#888"}}>Lead time: {form.leadTimeMinutes} min</label>
        <input type="range" min="5" max="1440" value={form.leadTimeMinutes} onChange={e=>setForm({...form,leadTimeMinutes:+e.target.value})} style={{width:"100%",margin:"6px 0 12px"}}/>
        <button onClick={recordDeployment} style={{width:"100%",padding:"9px",borderRadius:6,background:"#1a1a18",color:"#fff",border:"none",fontSize:13,cursor:"pointer"}}>Record Deployment</button>
      </div>

      <h3 style={{fontSize:14,fontWeight:500,marginBottom:10}}>Recent deployments</h3>
      {deployments.slice(-5).reverse().map(d => (
        <div key={d.deploymentId} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"0.5px solid #e8e8e4",fontSize:13}}>
          <span>{d.repo || "—"}</span>
          <span style={{color:d.status==="success"?"#1D9E75":"#A32D2D",fontWeight:500}}>{d.status}</span>
          <span style={{color:"#888"}}>{d.leadTimeMinutes} min</span>
        </div>
      ))}
    </div>
  );
}