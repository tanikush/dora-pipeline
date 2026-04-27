import { useState, useEffect } from "react";

const API = "https://01u368r3fl.execute-api.ap-south-1.amazonaws.com";

/**
 * MetricCard Component
 * Displays a single DORA metric with color-coded performance badge
 */
function MetricCard({ label, value, unit, status }) {
  const accentColors = {
    ELITE: "#10b981",
    HIGH: "#3b82f6",
    MEDIUM: "#f59e0b",
    LOW: "#ef4444"
  };

  const accent = accentColors[status] || "#94a3b8";

  return (
    <div className="metric-card" style={{ "--card-accent": accent }}>
      <div className="metric-value">
        {value}
        <span>{unit}</span>
      </div>
      <div className="metric-label">{label}</div>
      <span className={`metric-status ${status.toLowerCase()}`}>
        {status}
      </span>
    </div>
  );
}

/**
 * LoadingSpinner Component
 * Shows a spinner while fetching data
 */
function LoadingSpinner() {
  return (
    <div className="loading">
      <div className="loading-spinner" />
      <span>Loading metrics...</span>
    </div>
  );
}

/**
 * Main App Component
 * DORA Metrics Dashboard
 */
export default function App() {
  const [dora, setDora] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ repo: "", status: "success", leadTimeMinutes: 30 });
  const [submitting, setSubmitting] = useState(false);

  // Fetch metrics
  const fetchMetrics = () => {
    setLoading(true);
    fetch(`${API}/metrics`)
      .then(r => r.json())
      .then(data => {
        setDora(data.dora);
        setDeployments(data.deployments || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch metrics:", err);
        setLoading(false);
      });
  };

  // Initial fetch + auto-refresh every 60s
  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  // Record new deployment
  const recordDeployment = async (e) => {
    e.preventDefault();
    if (!form.repo.trim()) {
      alert("Please enter a repository name");
      return;
    }

    setSubmitting(true);
    try {
      await fetch(`${API}/metrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      await fetchMetrics();
      setForm({ repo: "", status: "success", leadTimeMinutes: 30 });
    } catch (err) {
      console.error("Failed to record deployment:", err);
      alert("Failed to record deployment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Determine DORA performance status
  const getStatus = (value, metric) => {
    if (metric === "freq") return value >= 1 ? "ELITE" : value >= 0.5 ? "HIGH" : "MEDIUM";
    if (metric === "cfr") return value < 5 ? "ELITE" : value < 15 ? "HIGH" : "MEDIUM";
    if (metric === "lead") return value <= 60 ? "ELITE" : value <= 1440 ? "HIGH" : "MEDIUM";
    return "HIGH";
  };

  // Format lead time (minutes → "Xd HHh MMm")
  const formatLeadTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="header-title">DORA Metrics Dashboard</h1>
        <p className="header-subtitle">DevOps Research & Assessment — 4 Key Engineering Metrics</p>
      </header>

      {/* Metrics Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : dora && (
        <div className="metrics-grid">
          <MetricCard
            label="Deployment Frequency"
            value={Number(dora.deploymentFrequency).toFixed(1)}
            unit=" deploys/day"
            status={getStatus(Number(dora.deploymentFrequency), "freq")}
          />
          <MetricCard
            label="Lead Time for Changes"
            value={formatLeadTime(Number(dora.avgLeadTimeMinutes))}
            unit=""
            status={getStatus(Number(dora.avgLeadTimeMinutes), "lead")}
          />
          <MetricCard
            label="Success Rate"
            value={Number(dora.successRate).toFixed(1)}
            unit="%"
            status="HIGH"
          />
          <MetricCard
            label="Change Failure Rate"
            value={Number(dora.changeFailureRate).toFixed(1)}
            unit="%"
            status={getStatus(Number(dora.changeFailureRate), "cfr")}
          />
        </div>
      )}

      {/* Record Deployment Form */}
      <section className="form-section">
        <h3 className="form-title">Record Deployment Event</h3>
        <form onSubmit={recordDeployment}>
          <div className="form-field">
            <label className="form-label" htmlFor="repo">Repository Name</label>
            <input
              id="repo"
              type="text"
              className="form-input"
              placeholder="e.g., frontend-app, api-gateway"
              value={form.repo}
              onChange={e => setForm({ ...form, repo: e.target.value })}
              disabled={submitting}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="status">Deployment Status</label>
            <select
              id="status"
              className="form-select"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              disabled={submitting}
            >
              <option value="success">✅ Success</option>
              <option value="failure">❌ Failure</option>
            </select>
          </div>

          <div className="slider-container">
            <div className="slider-label">
              <span className="form-label" style={{ margin: 0 }}>Lead Time</span>
              <span className="slider-value">{form.leadTimeMinutes} min</span>
            </div>
            <input
              type="range"
              className="slider"
              min="5"
              max="1440"
              value={form.leadTimeMinutes}
              onChange={e => setForm({ ...form, leadTimeMinutes: +e.target.value })}
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? "⏳ Recording..." : "🚀 Record Deployment"}
          </button>
        </form>
      </section>

      {/* Recent Deployments */}
      <section className="deployments-section">
        <h3 className="section-title">Recent Deployments</h3>
        {deployments.length === 0 ? (
          <div className="deployments-list">
            <div className="empty-state">
              <span className="empty-state-icon">📦</span>
              <p>No deployments recorded yet.</p>
              <p style={{ fontSize: "0.8125rem", marginTop: "0.25rem" }}>
                Use the form above to add your first deployment.
              </p>
            </div>
          </div>
        ) : (
          <div className="deployments-list">
            {deployments.slice(-5).reverse().map(d => (
              <div key={d.deploymentId} className="deployment-item">
                <span className="deployment-repo">
                  {d.repo || "Unnamed Repository"}
                </span>
                <span className={`deployment-status ${d.status}`}>
                  {d.status === "success" ? "Success" : "Failure"}
                </span>
                <span className="deployment-time">
                  {formatLeadTime(d.leadTimeMinutes || 0)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "2rem 0",
        color: "#94a3b8",
        fontSize: "0.75rem",
        marginTop: "3rem"
      }}>
        <p>DORA Metrics Dashboard • Powered by React & AWS</p>
      </footer>
    </div>
  );
}
