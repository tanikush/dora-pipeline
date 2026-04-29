# 🚀 DORA Metrics Dashboard

[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)

A modern, **production-ready DORA Metrics Dashboard** built with React 19 that visualizes DevOps Research & Assessment metrics in real-time. Track Deployment Frequency, Lead Time, Change Failure Rate, and Success Rate with an elegant, responsive UI connected to AWS backend services.

⚠️ Note:  
AWS resources have been removed after testing to avoid ongoing costs.  
Current GitHub Actions may show failed status due to inactive services.

---

## 📸 Architecture Daigram
---
![Recent Deployments](./screenshots/DORA.png)
*Live deployment history showing last 5 events with status indicators and timing*
---

## 📸 Application Screenshots
---
### 🎯 Dashboard Overview
![Dashboard](./screenshots/dashboard.png)
*Main dashboard displaying real-time DORA metrics with color-coded performance badges (Elite/High/Medium)*
---
### 📝 Record Deployment
![Record Deployment](./screenshots/metics.png)
*Interactive form to capture deployment events — repo name, success/failure status, and lead time slider*

---


## 🏗️ Infrastructure & Deployment
---
### 🔵 AWS DynamoDB
![DynamoDB Table](./screenshots/Dynamodb.png)
*DynamoDB table storing deployment metrics and historical data with timestamp indexing*
---
### ⚡ AWS Lambda Function
![Lambda Function](./screenshots/lambda.png)
*Serverless Lambda function handling metric calculations and data persistence*
---
### 🔄 GitHub Actions CI/CD
![GitHub Actions](./screenshots/github%20action.png)
*Automated deployment pipeline — builds React app and deploys to AWS S3 & Lambda*
---
### 📦 AWS S3 Deployment
![S3 Dashboard](./screenshots/s3%20project%20dashboard.png)
*Static hosting on S3 with CloudFront CDN for global availability*

---

## ✨ Key Features

✅ **Real-Time Metrics** — Live data fetching from AWS API Gateway every 60 seconds  
✅ **DORA Compliant** — Automatically classifies performance (Elite/High/Medium)  
✅ **Deployment Tracking** — Log new releases with repo, status, and lead time  
✅ **Audit History** — View last 5 deployments with color-coded success/failure  
✅ **Responsive Design** — Mobile-first CSS with graceful degradation  
✅ **Zero External UI Libs** — Custom design system, no MUI/AntD dependencies  
✅ **Type-Safe** — Numeric conversion guards against API type inconsistencies  
✅ **Auto-Refresh** — Metrics update automatically without page reload  

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 19.2.5 | Component UI with hooks |
| | ReactDOM | 19.2.5 | Client-side rendering |
| | Create React App | 5.0.1 | Build tooling & dev server |
| | Web Vitals | 2.1.4 | Performance monitoring |
| **Backend** | AWS Lambda | — | Serverless API endpoints |
| | AWS API Gateway | — | RESTful metrics API |
| | AWS DynamoDB | — | NoSQL metrics storage |
| **CI/CD** | GitHub Actions | — | Automated build & deployment |
| | AWS S3 | — | Static website hosting |
| | AWS CloudFront | — | CDN & SSL termination |
| **Design** | CSS Custom Properties | — | Design tokens & theming |
| | Inter Font | — | Modern UI typography |
| | CSS Grid/Flexbox | — | Responsive layouts |

---

## 📊 DORA Metrics Reference

| Metric | Elite | High | Medium |
|--------|-------|------|--------|
| **Deployment Frequency** | ≥ 1/day | ≥ 0.5/day | < 0.5/day |
| **Lead Time for Changes** | ≤ 60 min | ≤ 24 hours | > 24 hours |
| **Change Failure Rate** | < 5% | < 15% | ≥ 15% |
| **Time to Restore Service** | < 1 hour | < 24 hours | ≥ 24 hours |

*Benchmarks from [Google's Accelerate State of DevOps Report](https://services.google.com/fh/files/misc/accelerate-state-of-devops-2021.pdf)*

---

## 🚦 Getting Started

### Prerequisites

- Node.js ≥ 16.x (18.x or 20.x recommended)
- npm ≥ 7.x
- Git
- Browser (Chrome, Firefox, Safari, Edge)

### Installation & Development

```bash
# Clone repository
git clone https://github.com/tanikush/dora-ui.git
cd dora-ui

# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm start
```

---

## ⚙️ Configuration

### API Endpoint

Frontend connects to AWS API Gateway. Default:

```javascript
// src/App.js:3
const API = "https://01u368r3fl.execute-api.ap-south-1.amazonaws.com";
```

**Custom endpoint:** Create `.env.local`:

```env
REACT_APP_API_URL=https://your-api-endpoint.com
```

Update `App.js`:

```javascript
const API = process.env.REACT_APP_API_URL;
```

### Environment Variables

| File | Usage |
|------|-------|
| `.env.local` | Local overrides (gitignored) |
| `.env.development` | Development environment |
| `.env.production` | Production environment |

---

## 🔌 API Specification

### GET `/metrics`

Returns current DORA metrics + deployment history.

**Response:**
```json
{
  "dora": {
    "deploymentFrequency": 1.2,
    "avgLeadTimeMinutes": 45,
    "successRate": 95.5,
    "changeFailureRate": 3.2
  },
  "deployments": [
    {
      "deploymentId": "uuid",
      "repo": "frontend-app",
      "status": "success",
      "leadTimeMinutes": 30,
      "timestamp": "2026-04-27T12:00:00Z"
    }
  ]
}
```

### POST `/metrics`

Creates new deployment record.

**Body:**
```json
{
  "repo": "backend-api",
  "status": "success",
  "leadTimeMinutes": 45
}
```

---

## 📁 Repository Structure

```
dora-ui/
├── src/
│   ├── App.js              # Dashboard component
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles + design system
│   ├── App.test.js         # Unit tests
│   ├── reportWebVitals.js  # Perf monitoring
│   └── setupTests.js       # Test config
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── screenshots/            # Project documentation images
├── docs/
│   └── screenshots/        # Capture guide
├── lambda/                 # Backend Lambda (separate deployment)
│   └── index.mjs
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
├── package.json
├── package-lock.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

---

## 🧪 Testing

```bash
# Interactive watch mode
npm test

# Single run (CI)
CI=true npm test

# With coverage report
npm test -- --coverage
```

---

## 🏗️ Build & Production

```bash
# Create optimized build
npm run build

# Output: /build (static files for deployment)
```

### Deployment Workflow

1. **Push to `main`** → Triggers GitHub Actions
2. **Lambda update** — Deploys `lambda/index.mjs`
3. **React build** — Runs `npm install && npm run build`
4. **S3 upload** — Syncs `build/` to S3 bucket
5. **CloudFront invalidation** — (optional) clears CDN cache

### Manual Deploy

```bash
npm run build
aws s3 sync build/ s3://your-bucket --delete
```

---


### DORA Thresholds

Modify `getStatus()` in `src/App.js:37-42`:

```javascript
const getStatus = (value, metric) => {
  if (metric === "freq") return value >= 1 ? "ELITE" : value >= 0.5 ? "HIGH" : "MEDIUM";
  if (metric === "cfr") return value < 5 ? "ELITE" : value < 15 ? "HIGH" : "MEDIUM";
  if (metric === "lead") return value <= 60 ? "ELITE" : value <= 1440 ? "HIGH" : "MEDIUM";
  return "HIGH";
};
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

```bash
# Fork → Clone → Branch
git checkout -b feature/your-feature

# Commit (Conventional Commits)
git commit -m "feat(metrics): add threshold config"

# Push & PR
git push origin feature/your-feature
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) file.

---

## 🙋 Support

- **Issues**: [GitHub Issues](https://github.com/tanikush/dora-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tanikush/dora-ui/discussions)
- **Email**: tanikush@gmail.com

---

## 🙏 Acknowledgments

- **DORA Team** — Google's DevOps Research & Assessment
- **React Team** — Meta's UI library
- **AWS Serverless** — Lambda, API Gateway, DynamoDB
- **GitHub Actions** — CI/CD automation

---


**⭐ Star this repo if it's useful!**
By Tanisha
*April 2026 | React 19 • AWS • CI/CD*
