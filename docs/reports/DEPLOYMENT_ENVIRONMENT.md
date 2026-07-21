# Deployment Environment Variables

This document outlines the environment variables required for deploying Astra v1.0.0.

## Zero-Config Architecture

Astra utilizes a strict **Bring Your Own Key (BYOK)** architecture. All sensitive credentials, including AI provider API keys (OpenAI, Anthropic), are strictly managed and stored client-side within the user's browser `localStorage`. 

Because Astra's Next.js Edge functions act only as pass-through proxies without persistently storing data or requiring central database access, **there are exactly ZERO required backend environment variables.**

## Variable Audit

| Variable Name | Purpose | Required? | Safe for client? | Example value |
| :--- | :--- | :--- | :--- | :--- |
| `NODE_ENV` | Automatically set by Next.js/Vercel to determine build mode (`production` vs `development`). | **No** (Auto-injected) | No | `production` |
| `CI` | Automatically set by CI environments to disable watch modes or adjust Playwright workers. | **No** (Auto-injected) | No | `true` |

Astra is 100% plug-and-play on Vercel without any manual environment configuration.
