# Astra Architecture

Astra is an AI-native decision intelligence platform. It is built as a highly interactive, client-first Next.js application that uses deterministic heuristics in tandem with Large Language Models to guide decision-making.

## High-Level Stack
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19, Tailwind CSS, Framer Motion
- **Components**: shadcn/ui (Radix UI)
- **AI Integration**: Vercel AI SDK
- **Testing**: Vitest, React Testing Library
- **State/Persistence**: React state + Local Storage (`hooks/useDecision.ts`)

## Directory Structure
- `/app`: Next.js App Router definitions. Note that the application is heavily client-rendered (`"use client"`).
- `/components`:
  - `/ai`: Specialized components for interacting with the AI Copilot (e.g., Action Cards, Visualizations).
  - `/decision`: Domain-specific components for rendering the Decision Canvas (Options, Context, Constraints).
  - `/ui`: Generic, accessible building blocks (shadcn/ui).
  - `/workspace`: The core layout orchestrators (`WorkspacePage`, `CopilotSidebar`).
- `/hooks`: Custom React hooks, most notably `useDecision.ts` for lifecycle management.
- `/lib`: Pure utility functions and deterministic heuristic engines (e.g., `lib/analysis/decision-analysis.ts`).
- `/services`: Abstractions for external or browser APIs:
  - `/ai`: AI provider bridging and API key hydration.
  - `/storage`: LocalStorage abstraction for BYOK and multi-decision persistence.
- `/types`: Zod schemas and TypeScript interfaces ensuring end-to-end type safety.

## State Flow
1. **Decision Canvas**: The user interacts with the canvas via `WorkspacePage`. This component acts as the source of truth for the active decision.
2. **Autosave Engine**: `useDecision.ts` debounces state changes natively, saving to the `localStorage` backend synchronously upon resolution.
3. **Copilot Sync**: The `CopilotSidebar` takes the `Decision` object as a prop. When users trigger "AI Actions", the current object state is serialized and securely piped to the edge routes.

## AI Security & Privacy (BYOK)
Astra uses a Bring Your Own Key (BYOK) model. User keys for OpenAI or Anthropic are persisted exclusively in the browser's `localStorage`. They are never logged or saved to a remote backend. The keys are transported via HTTP headers (`x-ai-key`) to Astra's proxy routes, which securely hydrate the AI SDK server-side to prevent CORS issues.
