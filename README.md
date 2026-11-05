# SpendWise — Budget Tracker

SpendWise is a responsive, browser-based expense tracker. Add, review, and delete expenses while monitoring your monthly budget. Expense data is saved in the current browser using `localStorage`; it is not uploaded to a server and will not automatically sync between devices.

## Project structure

```text
.
├── index.html       # App page and accessible form/table structure
├── style.css        # Responsive application styles
├── script.js        # Expense management and budget calculations
├── netlify.toml     # Netlify static-site publish configuration
└── README.md        # Setup, deployment, and testing notes
```

This is a static website: no build command, package installation, or server-side runtime is required. The deployed entry point is the root `index.html` file.

## Run locally

Open `index.html` in a modern browser, or serve the project root with any static HTTP server. For example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Browser storage behavior can vary when opening files directly, so use a local server to verify persistence.

## Deploy to Netlify

1. Push this public GitHub repository to GitHub.
2. In Netlify, choose **Add new site → Import an existing project**, authorize GitHub, and select this repository.
3. Keep the build command empty. Set the publish directory to `.` (the repository root), as configured in `netlify.toml`.
4. Deploy the site. Netlify will provide a `*.netlify.app` URL.
5. In **Site configuration → Site details → Change site name**, choose an available name such as `spendwise-budget-tracker`. The resulting URL will be `https://spendwise-budget-tracker.netlify.app` if that name is available.
6. To verify continuous deployment, make and push a visible change to the connected branch. Check the Netlify **Deploys** page for the new production deploy, then reload the live site.

The repository is already public. Netlify account authorization, site creation, site-name availability, and a live deploy must be completed and verified in Netlify; repository files alone cannot perform those account-level actions.

## Final deployment checks

After the first deploy, verify the following on the Netlify URL (including a narrow/mobile viewport):

- The page loads over HTTPS and the SpendWise dashboard renders.
- `style.css` is applied and `script.js` runs without console errors.
- Add an expense, check the totals and balance, then delete it.
- Reload the page and confirm the expense remains; clear expenses and confirm the empty state.
- Check the Netlify deploy log and confirm a pushed change triggers a new production deployment.

## Features

- KSh budget, expense total, and remaining balance summary.
- Expense validation, category selection, accessible feedback, and per-item deletion.
- Budget threshold warnings and an over-budget indicator.
- Browser-local persistence and responsive layout.
