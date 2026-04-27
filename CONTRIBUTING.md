# Contributing to DORA Metrics Dashboard

Thank you for considering contributing! 🎉

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating a bug report:
- Check if the bug has already been reported in [Issues](../../issues)
- Ensure you're using the latest version
- Collect steps to reproduce, browser info, and console errors

**Bug Report Template:**
```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. See error

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 0.1.0]
```

### 💡 Suggesting Enhancements

- Check existing issues and pull requests
- Provide clear use case and benefit
- Include mockups/wireframes if applicable

### 🔧 Pull Requests

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/dora-ui.git`
3. **Create branch**: `git checkout -b feature/your-feature-name`
4. **Make changes** and add tests if applicable
5. **Lint & test**: `npm test` (all tests must pass)
6. **Commit**: `git commit -m "feat: add new metric card component"`
7. **Push**: `git push origin feature/your-feature-name`
8. **Open PR** against `main` branch

#### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:**
```
feat(metrics): add lead time threshold configuration

- Add slider control for lead time threshold
- Update getStatus() to use configurable values
- Add unit tests for threshold logic

Closes #12
```

### 📝 Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Trailing commas**: ESLint default
- **Component naming**: PascalCase (`MetricCard`)
- **File naming**: camelCase (`App.js`)

Run linter before committing:
```bash
npm run lint   # (if configured)
```

---

## 📋 Development Workflow

### Setup
```bash
npm install
npm start      # Starts dev server at http://localhost:3000
npm test       # Runs test suite
npm run build  # Production build
```

### Project Structure
```
src/
├── components/     # Reusable UI components (future)
├── hooks/          # Custom React hooks (future)
├── services/       # API calls (future)
├── utils/          # Helper functions (future)
├── App.js          # Main dashboard
├── index.js        # Entry point
└── index.css       # Global styles
```

### Adding New Features

1. **Create component** in `src/components/` if reusable
2. **Add tests** in `__tests__/` or `*.test.js` files
3. **Update README** if feature changes user-facing behavior
4. **Update API types** if modifying data structure

---

## 🧪 Testing Guidelines

- Write tests for new components and utilities
- Maintain minimum 80% code coverage
- Use React Testing Library patterns:
  ```javascript
  render(<Component />)
  expect(screen.getByText('...')).toBeInTheDocument()
  ```

---

## 🔒 Security

- **Never commit secrets** (API keys, tokens) — use `.env.local`
- Report security vulnerabilities privately to security@your-project.com
- Follow OWASP guidelines for React apps

---

## 📚 Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [DORA Metrics Guide](https://cloud.google.com/devops/learn/dora-metrics)
- [Create React App Docs](https://create-react-app.dev/docs/getting-started/)

---

## ❓ Questions?

Open an issue or reach out at maintainers@your-project.com

**Happy contributing!** 🎊
