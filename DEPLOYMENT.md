# GitHub Pages Deployment Guide for Feelis

This guide provides the exact terminal commands to properly build and deploy your Feelis application to GitHub Pages.

## Prerequisites

Make sure you have:
1. A GitHub repository named `feelis-emotion-moon`
2. Node.js and npm installed
3. All your code committed and pushed to the main branch

## Step-by-Step Deployment Commands

### 1. Clean Previous Builds (Important!)
```bash
# Remove any old build artifacts
rm -rf dist
rm -rf node_modules/.vite
```

### 2. Install/Update Dependencies
```bash
# Ensure all dependencies are properly installed
npm ci
```

### 3. Build for Production
```bash
# Set production environment and build
NODE_ENV=production npm run build
```

### 4. Verify Build Output
```bash
# Check that videos were properly included in the build
ls -la dist/assets/video/
```

### 5. Deploy to GitHub Pages
```bash
# Deploy the dist folder to gh-pages branch
npm run deploy
```

### Complete Deployment Script (Run All at Once)
```bash
# Clean, build, and deploy in one command
rm -rf dist && rm -rf node_modules/.vite && npm ci && NODE_ENV=production npm run build && npm run deploy
```

## Troubleshooting

### If Videos Still Don't Load:

1. **Check Network Tab**: Open browser dev tools → Network tab → look for 404 errors on .mp4 files

2. **Verify Build Output**: After building, check that videos are in `dist/assets/video/`:
   ```bash
   find dist -name "*.mp4" -type f
   ```

3. **Check Repository Settings**: 
   - Go to your GitHub repository
   - Settings → Pages
   - Source should be "Deploy from a branch"
   - Branch should be "gh-pages"

4. **Clear Browser Cache**: Force refresh with Ctrl+F5 (or Cmd+Shift+R on Mac)

### If Deployment Fails:

1. **Authentication Issues**:
   ```bash
   # Make sure you're logged into GitHub CLI or have SSH keys set up
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. **Repository URL Issues**:
   ```bash
   # Verify your remote origin
   git remote -v
   ```

3. **Clean and Retry**:
   ```bash
   # Remove gh-pages branch and redeploy
   git push origin --delete gh-pages
   npm run deploy
   ```

## Post-Deployment Verification

1. **Wait 2-3 minutes** for GitHub Pages to update
2. Visit: `https://rennesbory.github.io/feelis-emotion-moon/`
3. **Check video loading** in browser dev tools
4. **Test on mobile** to ensure responsive videos work

## Configuration Details

The following configuration changes were made to support GitHub Pages:

### vite.config.ts
- Added `base: '/feelis-emotion-moon/'` for production
- Configured asset handling for videos
- Set up proper build output structure

### package.json
- Added `predeploy` and `deploy` scripts
- Configured gh-pages deployment

## Notes

- Videos are imported as ES modules for reliable path resolution
- The build process automatically handles asset optimization and cache busting
- All video files are processed and copied to the correct deployment directory