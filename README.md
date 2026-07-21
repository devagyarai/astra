# Astra — AI Decision Copilot

Astra is an elite, open-source AI decision intelligence platform. It replaces scattered notes and disjointed chat logs with a structured Decision Canvas, partnered with an intelligent Copilot that dynamically analyzes biases, risks, and blind spots.

## Features
- **Structured Decision Canvas**: Define goals, context, constraints, and options cleanly.
- **AI Copilot (BYOK)**: Bring your own OpenAI or Anthropic key. Astra's Copilot contextually understands your decision canvas without you needing to copy-paste.
- **Local-First Privacy**: All decisions and API keys are stored purely in your browser's Local Storage. Astra never syncs your sensitive strategic data to a remote backend.
- **Dynamic Heuristics**: Get real-time deterministic scoring on your decision's confidence and completion status before ever talking to the AI.

## Getting Started

### Prerequisites
- Node.js v18+
- pnpm v8+

### Installation
```bash
git clone https://github.com/your-org/astra.git
cd astra
pnpm install
```

### Development
```bash
pnpm dev
```
Navigate to `http://localhost:3000`.

### Setup AI
Go to the **Settings** page within the app, select your preferred provider (OpenAI or Anthropic), and paste your API key. Keys remain locally securely in your browser.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS & shadcn/ui
- Vercel AI SDK
- Vitest

## License
MIT License. See [LICENSE](LICENSE) for details.
