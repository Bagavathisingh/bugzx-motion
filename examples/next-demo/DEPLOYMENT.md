# Deploying to Cloudflare Pages

This guide covers deploying the next-demo application to Cloudflare Pages.

## Prerequisites

- Cloudflare account (free tier works)
- GitHub repository (or GitLab/Bitbucket)
- Node.js 18+ installed locally

## Method 1: Cloudflare Dashboard (Recommended)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/bugzx-motion.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages**
3. Click **Create application** → **Pages** → **Connect to Git**
4. Select your repository
5. Configure build settings:

**Build Configuration:**
```
Framework preset: Next.js (Static HTML Export)
Build command: cd examples/next-demo && npm install && npm run build
Build output directory: examples/next-demo/out
Root directory: (leave empty)
Node version: 18
```

**Environment Variables:**
```
NODE_VERSION=18
```

6. Click **Save and Deploy**

### Step 3: Wait for Deployment

Cloudflare will build and deploy your site. You'll get a URL like:
```
https://bugzx-motion.pages.dev
```

---

## Method 2: Wrangler CLI

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

### Step 3: Build the Application

```bash
cd examples/next-demo
npm install
npm run build
```

This creates a static export in the `out` directory.

### Step 4: Deploy

```bash
wrangler pages deploy out --project-name=bugzx-motion
```

---

## Custom Domain Setup

1. Go to your Cloudflare Pages project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `demo.bugzx-motion.com`)
5. Follow DNS configuration instructions

---

## Automatic Deployments

Once connected to Git, Cloudflare Pages automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

---

## Troubleshooting

### Build Fails

If the build fails, check:
1. Node version is set to 18+
2. Build command includes `npm install`
3. Output directory is correct (`examples/next-demo/out`)

### Images Not Loading

The config already includes `images: { unoptimized: true }` which is required for static export.

### Environment Variables

Add any required environment variables in the Cloudflare Pages dashboard under **Settings** → **Environment variables**.

---

## Performance Optimization

Cloudflare Pages automatically provides:
- Global CDN distribution
- Automatic HTTPS
- HTTP/2 and HTTP/3
- Brotli compression
- Automatic cache invalidation

---

## Monitoring

View deployment logs and analytics in the Cloudflare Pages dashboard.
