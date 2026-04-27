# Place Screenshots Here 📸

This directory contains screenshots for the README.

## Required Screenshots

### 1. Dashboard View — `dashboard.png`
Shows the main DORA metrics dashboard with all 4 metric cards.

**How to capture:**
1. Open app at http://localhost:3000
2. Ensure all 4 metrics are visible
3. Use browser screenshot tool or `Win + Shift + S`
4. Save as `dashboard.png`

**What to capture:**
- DORA Metrics Dashboard header
- 4 metric cards (Deployment Frequency, Lead Time, Success Rate, Change Failure Rate)
- Color-coded performance status badges (ELITE/HIGH/MEDIUM)

---

### 2. Record Deployment — `record-deployment.png`
Shows the deployment recording form.

**How to capture:**
1. Scroll to "Record deployment event" section
2. Fill in sample data or leave blank
3. Capture the entire form section
4. Save as `record-deployment.png`

**What to capture:**
- Repo name input field
- Status dropdown (success/failure)
- Lead time slider (5-1440 min)
- "Record Deployment" button

---

### 3. Recent Deployments — `recent-deployments.png`
Shows the deployment history list.

**How to capture:**
1. Record 3-5 deployments to populate the list
2. Scroll to "Recent deployments" section
3. Capture the list with all entries
4. Save as `recent-deployments.png`

**What to capture:**
- Section header "Recent deployments"
- 3-5 deployment entries showing repo, status (color-coded), lead time
- Each entry shows: repo name | status (green/red) | time in minutes

---

## Image Specifications

| Property | Value |
|----------|-------|
| **Format** | PNG (preferred) or JPG |
| **Resolution** | 1920×1080 minimum (full HD) |
| **Aspect Ratio** | 16:9 recommended |
| **File Size** | < 500KB per image (compress if needed) |
| **Naming** | `kebab-case.png` (lowercase, hyphens) |

---

## 🛠️ Image Optimization (Optional)

Reduce file size for faster GitHub Pages loading:

```bash
# Using ImageMagick
convert dashboard.png -resize 1200x -quality 85 dashboard.png

# Using TinyPNG (online)
https://tinypng.com/
```

---

## 📝 Updating README

After adding screenshots, verify README links work:

```bash
# Check local
start docs/screenshots/dashboard.png

# Or open README in browser
start README.md
```

Screenshots are referenced in README as:
```markdown
![Dashboard](./docs/screenshots/dashboard.png)
```

---

## ❓ Need Help?

If screenshots don't display:
1. Ensure file names match exactly (case-sensitive)
2. Check path: `docs/screenshots/` relative to README
3. Clear browser cache and reload

---

*Once screenshots are added, the README will display them inline!* 🎨
