# Vercel Deployment Guide

This guide will help you deploy your React + Vite website on Vercel.

## Prerequisites

- Your code should be pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- A Vercel account (sign up at https://vercel.com)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Prepare for Vercel deployment"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/M-Sarim/VirtualWesbite.git

# Push to GitHub
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to https://vercel.com and sign in
2. Click on **"Add New..."** → **"Project"**
3. Import your GitHub repository (you may need to authorize Vercel to access your repositories)
4. Select the **VirtualWesbite** repository

### Step 3: Configure Project Settings

In the project configuration screen:

1. **Framework Preset**: Select **"Vite"**
2. **Root Directory**: Click **"Edit"** and set it to `frontend`
3. **Build Command**: `pnpm build` (or `npm run build` if using npm)
4. **Output Directory**: `dist`
5. **Install Command**: `pnpm install` (or `npm install` if using npm)

### Step 4: Environment Variables (if needed)

If you have any environment variables:

1. Click on **"Environment Variables"**
2. Add your variables (e.g., `VITE_API_URL`, `VITE_GOOGLE_ANALYTICS_ID`, etc.)
3. You can add different values for Production, Preview, and Development

### Step 5: Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy your project
3. Once complete, you'll get a production URL (e.g., `https://your-project.vercel.app`)

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Terminal

Navigate to your project root and run:

```bash
# First deployment (will ask configuration questions)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name: VirtualWesbite (or your preferred name)
# - In which directory is your code located? frontend
# - Override settings? Yes (if needed)
```

### Step 4: Production Deployment

For production deployment:

```bash
vercel --prod
```

---

## Configuration Files

### vercel.json (Already Created)

The `vercel.json` file at the root of your project configures:

- Build settings pointing to the frontend directory
- Routing rules for SPA (Single Page Application)
- Asset serving

### Package.json Build Script

Your `frontend/package.json` already has the correct build script:

```json
"build": "tsc && vite build"
```

---

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project settings in Vercel dashboard
2. Click on **"Domains"**
3. Add your custom domain
4. Follow the instructions to configure your DNS

### Environment Variables

If you need to add environment variables after deployment:

1. Go to Project Settings → **"Environment Variables"**
2. Add variables with `VITE_` prefix for Vite projects
3. Redeploy to apply changes

### Automatic Deployments

- Every push to `main` branch triggers a production deployment
- Pull requests create preview deployments automatically
- You can configure branch deployments in project settings

---

## Troubleshooting

### Build Fails

1. Check that all dependencies are in `package.json`
2. Verify the build command works locally: `cd frontend && pnpm build`
3. Check Vercel build logs for specific errors

### 404 Errors on Routes

- The `vercel.json` configuration handles SPA routing
- If you still face issues, verify the routes configuration

### Environment Variables Not Working

- Ensure variables have the `VITE_` prefix
- Redeploy after adding new variables
- Check that variables are available in the correct environment (Production/Preview/Development)

---

## Useful Commands

```bash
# Test build locally
cd frontend
pnpm build
pnpm preview

# Deploy preview
vercel

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs

# List all deployments
vercel ls
```

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

---

## Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Root directory set to `frontend`
- [ ] Framework preset set to "Vite"
- [ ] Environment variables added (if needed)
- [ ] First deployment successful
- [ ] Custom domain configured (optional)
- [ ] Automatic deployments working
