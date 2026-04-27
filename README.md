
[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)

A modern, responsive **DORA Metrics Dashboard** built with React that helps engineering teams track and visualize the four key DevOps metrics: **Deployment Frequency**, **Lead Time for Changes**, **Change Failure Rate**, and **Time to Restore Service**.

---

## 📸 Screenshots


---

## ✨ Features

✅ **Live Metrics Display** — Fetches real-time DORA metrics from AWS API  
✅ **Color-Coded Performance** — Elite (green), High (blue), Medium (orange), Low (red)  
✅ **Deployment Tracking** — Record new deployments with repo, status, and lead time  
✅ **Recent History** — View last 5 deployments with instant visual feedback  
✅ **Responsive Design** — Works on desktop, tablet, and mobile  
✅ **Zero-Dependency UI** — Minimal styling, no external UI libraries  
✅ **Type-Safe Status** — Automatic metric classification based on DORA benchmarks  

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.5 | UI framework |
| **ReactDOM** | 19.2.5 | DOM rendering |
| **Create React App** | 5.0.1 | Build tooling & dev server |
| **Web Vitals** | 2.1.4 | Performance monitoring |
| **AWS API Gateway** | — | Backend metrics API |

---

## 📊 DORA Metrics Explained

| Metric | Elite | High | Medium |
|--------|-------|------|--------|
| **Deployment Frequency** | ≥ 1/day | ≥ 0.5/day | < 0.5/day |
| **Lead Time for Changes** | ≤ 60 min | ≤ 24 hours | > 24 hours |
| **Change Failure Rate** | < 5% | < 15% | ≥ 15% |
| **Time to Restore Service** | < 1 hour | < 24 hours | ≥ 24 hours |

*Source: [Accelerate State of DevOps Report](https://services.google.com/fh/files/misc/accelerate-state-of-devops-2021.pdf)*

---

## 🚦 Getting Started

### Prerequisites

- Node.js ≥ 16.x
- npm ≥ 7.x
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/tanikush/dora-ui.git
cd dora-ui

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## ⚙️ Configuration

### API Endpoint

The dashboard connects to a backend API hosted on AWS. By default, it uses:

```
https://01u368r3fl.execute-api.ap-south-1.amazonaws.com/metrics
```

To change the API endpoint, update the `API` constant in `src/App.js:3`:

```javascript
const API = "https://your-api-endpoint.com";
```

### Expected API Response Format

**GET `/metrics`**
```json
{
  "dora": {
    "deploymentFrequency": 1.2,
    "avgLeadTimeMinutes": 45,
    "successRate": 95,
    "changeFailureRate": 3.5
  },
  "deployments": [
    {
      "deploymentId": "uuid-1234",
      "repo": "frontend-app",
      "status": "success",
      "leadTimeMinutes": 30,
      "timestamp": "2026-04-27T12:00:00Z"
    }
  ]
}
```

**POST `/metrics`**
```json
{
  "repo": "backend-api",
  "status": "success",
  "leadTimeMinutes": 45
}
```

---

## 📁 Project Structure

```
dora-ui/
├── src/
│   ├── App.js              # Main dashboard component
│   ├── App.css             # Component styles (unused)
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   ├── App.test.js         # Unit tests
│   ├── reportWebVitals.js  # Performance monitoring
│   └── setupTests.js       # Test configuration
├── public/
│   └── manifest.json       # PWA manifest
├── docs/
│   └── screenshots/        # Screenshots directory
├── package.json
├── README.md
└── .gitignore
```

---

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests once (CI mode)
CI=true npm test
```

---

## 🏗️ Build for Production

```bash
# Create optimized build
npm run build

# Build output will be in /build folder
# Deploy to any static hosting (Netlify, Vercel, GitHub Pages, S3)
```

---

## 🎨 Customization

### Change Color Scheme

Edit `MetricCard` component in `src/App.js:5-14`:

```javascript
const colors = {
  ELITE: "#1D9E75",   // Green
  HIGH: "#185FA5",    // Blue
  MEDIUM: "#BA7517",  // Orange
  LOW: "#A32D2D"      // Red
};
```

### Adjust Thresholds

Modify `getStatus()` function in `src/App.js:37-42` to customize performance benchmarks.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙋 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/dora-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/dora-ui/discussions)
- **Email**: support@your-project.com

---

## 🙏 Acknowledgments

- **DORA Metrics** — Google's DevOps Research and Assessment team
- **Create React App** — Facebook's React build tooling
- **AWS Lambda** — Backend API hosting

---

**⭐ If you find this project useful, please give it a star!**

*Last updated: April 2026*
