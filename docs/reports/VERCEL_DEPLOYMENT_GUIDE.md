# Vercel Deployment Guide

Astra v1.0.0 is fully optimized for a zero-configuration deployment on Vercel. Thanks to the Next.js App Router and local-first architecture, no database provisioning or complex environment setups are required.

## 1. Required Environment Variables
**None**. Astra uses a strict Bring Your Own Key (BYOK) model. All API keys (OpenAI, Anthropic) are stored client-side in the user's browser via `localStorage`. The Edge backend acts only as a secure proxy.

## 2. Vercel Build Settings
Ensure your Vercel project uses the following default framework preset for Next.js:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (Default)

## 3. Install Command
```bash
pnpm install
```
*(Vercel automatically detects `pnpm-lock.yaml` and will run this).*

## 4. Build Command
```bash
pnpm build
```
*(Vercel automatically detects this via the Next.js preset).*

## 5. Output Directory
```bash
.next
```
*(Vercel automatically manages the `.next` directory).*

## 6. Node Version
Astra requires **Node.js 18.x or 20.x**. Vercel defaults to Node.js 20.x, which is perfectly compatible.

## 7. Production Domain Configuration
Ensure your custom domain (e.g., `astra.devagyarai.com`) is mapped within Vercel's Project Settings > Domains. Vercel will automatically provision the SSL certificates.

## 8. Post-deployment Verification Checklist
Once the Vercel deployment completes successfully, perform the following checks on the live production URL:
- [ ] **Marketing Pages Load**: Verify `/`, `/features`, and `/pricing` load instantly (these are statically generated).
- [ ] **Workspace Loads**: Navigate to `/workspace`. Check console for any hydration errors.
- [ ] **LocalStorage Persistence**: Type into a decision canvas, refresh the page, and ensure data is retained.
- [ ] **API Key Input**: Navigate to `/settings`, input a dummy API key, refresh, and verify it persists securely.

## 9. Rollback Procedure
If a critical flaw is discovered post-deployment:
1. Navigate to the **Deployments** tab in your Vercel dashboard.
2. Locate the previous successful production deployment.
3. Click the vertical ellipsis (`⋮`) and select **Promote to Production** (or **Instant Rollback**).
4. Vercel will instantaneously revert the active traffic to the stable build.
