# Contributing to Astra

Thank you for your interest in contributing to Astra! This document outlines the process for proposing changes, submitting pull requests, and building the project locally.

## Development Workflow

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v8+)

### Setup
1. Clone the repository: `git clone https://github.com/your-org/astra.git`
2. Install dependencies: `pnpm install`
3. Start the dev server: `pnpm dev`
4. Run tests: `pnpm test`

### Guidelines
1. **Zero Warnings**: Ensure `pnpm lint`, `pnpm build`, and `pnpm test` pass with 0 errors and 0 warnings before submitting a PR.
2. **Component Libraries**: Do not install new third-party UI components unless absolutely necessary. We rely on standard `shadcn/ui` primitives styled with Tailwind.
3. **Memoization**: If you introduce a component that renders inside a list (like `DecisionCard`) or relies on heavy computation, enforce strict `React.useMemo` and `React.memo` boundaries.
4. **Testing**: Any modification to `services/` or `hooks/` must include corresponding updates to the `vitest` suite.

### Commits
We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code restructuring
- `docs:` for documentation changes

## Submitting a PR
- Clearly describe the problem you are solving.
- Attach before/after screenshots if modifying the UI.
- Ensure all CI checks pass.
