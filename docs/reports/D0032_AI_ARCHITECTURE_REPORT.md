# Sprint D-003.2 — AI Core Architecture Report
## Overview
The goal of this sprint was to establish a modular, secure, and highly scalable AI architecture for Astra, transitioning it into a real AI Decision Intelligence Platform. 

## Architectural Components

### 1. Context Builder (`services/ai/context-builder.ts`)
Instead of simply sending the raw JSON decision state to the LLM, the Context Builder serializes the decision into a deterministic, human-and-machine-readable Markdown string. 
- Strips empty fields to save tokens.
- Organizes Options (Pros/Cons) into distinct sections.
- Prevents unbounded token growth by intelligently truncating excessively large contexts.

### 2. Prompt Registry (`prompts/*`)
All AI instructions have been externalized into a `prompts/` module, ensuring reusability and eliminating inline string hardcoding from the React components.
- `system.ts`: Defines the base system instruction and 8 unique AI Personas (e.g., Executive Advisor, Devil's Advocate, Strategic Consultant).
- `analysis.ts`: Specialized prompts for Risk Analysis, Bias Detection, Tradeoff matrices, and Summarization.
- `generators.ts`: Action-oriented prompts for generating novel options, missing constraints, or piercing questions.

### 3. Orchestrator (`services/ai/orchestrator.ts`)
The orchestrator acts as the "AI Brain" on the client side. 
- It acts as the intermediary between the React hooks (e.g., `useChat`) and the backend proxy (`/api/ai/chat`).
- It seamlessly constructs the full system payload (Base Prompt + Context + Persona + Task Prompt) so that UI components only have to request "Analyze Risks" rather than orchestrate the strings.
- Future-proofed to handle token counting, rate limiting, and multi-provider selection logic natively.

### 4. Edge API Proxy (`/api/ai/chat/route.ts`)
Updated to dynamically receive the orchestrated `system` instruction string from the client, streaming responses securely back to the frontend using the user's local API keys (BYOK).

## Quality & Compliance
- The architecture correctly implements BYOK (Bring Your Own Key) privacy standards, never touching a backend database.
- `.env` files are verified as git-ignored.
- Code has passed formatting, typing, and production builds (`pnpm lint` and `pnpm build` completed with zero errors).

## Next Steps
With the core AI engine implemented, the next sprint (D-003.3) will introduce the Sidebar Copilot UI to wire these services into a premium, interactive user experience.
