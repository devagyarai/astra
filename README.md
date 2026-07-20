# Astra - AI Decision Intelligence Platform

Astra is an enterprise-grade decision intelligence platform that transforms raw ideas into structured, bias-free, and thoroughly analyzed decisions.

## Architecture & AI Infrastructure

Astra operates as a purely local-first, privacy-respecting client application. It uses a Bring Your Own Key (BYOK) architecture to interface with AI models (OpenAI, Anthropic) via a Next.js Edge API Proxy. 

Key AI modules:
- **Orchestrator (`services/ai/orchestrator.ts`)**: The AI brain coordinating provider selection, prompt injection, and stream handling.
- **Context Builder (`services/ai/context-builder.ts`)**: Deterministic serializer converting the Decision React state into optimal LLM context strings.
- **Prompt Registry (`prompts/*`)**: Modular, role-based instruction sets for analysis, generation, and personas (e.g., Devil's Advocate, Strategic Consultant).
- **Decision Intelligence Engine (`services/ai/analysis.ts`)**: A structured analytics engine employing `generateObject` and strict `zod` schemas to return perfectly typed JSON structures (Risk Analysis, Bias Detection, Tradeoff Matrices).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. To enable the AI Copilot features, navigate to **Settings** and input your API key (stored securely and exclusively in your browser's local storage).

## Documentation

Full architectural decisions, reports, and component guidelines are located in the `docs/` folder.
- `docs/reports/D0032_AI_ARCHITECTURE_REPORT.md` (AI Architecture Design)
- `docs/architecture/` (System Architecture)
