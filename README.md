# Solae

A React TypeScript application built with Vite.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment (Recommended)

1. **Push to main branch**: The GitHub Actions workflow will automatically build and deploy your site when you push to the `main` branch.

2. **View your site**: Your site will be available at `https://[your-username].github.io/solae/`

### Manual Deployment

If you prefer manual deployment:

```bash
# Deploy to GitHub Pages
npm run deploy
```

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Repository Settings**:
   - Ensure your repository is public (or you have GitHub Pro for private repos)
   - The workflow will automatically deploy to `https://[your-username].github.io/solae/`

3. **Custom Domain** (Optional):
   - If you want to use a custom domain, add it in the GitHub Pages settings
   - Update the `base` path in `vite.config.ts` accordingly

### Troubleshooting

- **404 errors**: Make sure the `base` path in `vite.config.ts` matches your repository name
- **Build failures**: Check the GitHub Actions tab in your repository for detailed error logs
- **Assets not loading**: Verify that all asset paths are relative and the base path is correctly configured

## Project Structure

```
solae/
├── .github/workflows/  # GitHub Actions workflows
├── src/                # Source code
├── public/             # Static assets
├── dist/               # Build output (generated)
└── package.json        # Dependencies and scripts
```
