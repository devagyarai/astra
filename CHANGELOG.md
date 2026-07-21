# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-21
### Added
- **Astra Copilot:** AI-powered Decision Intelligence Engine for evaluating decisions, detecting biases, and summarizing trade-offs.
- **BYOK (Bring Your Own Key):** Enterprise-grade security allowing users to store OpenAI or Anthropic API keys locally in `localStorage`.
- **Decision Canvas:** A structured editor for defining Goals, Context, Constraints, Options, and Evidence.
- **Timeline & Dashboard:** Aggregated views of all active and completed decisions, complete with completion scores and confidence tracking.
- **Local Persistence:** Zero-latency data persistence using IndexedDB / LocalStorage, enabling complete offline functionality.
- **Playwright E2E Testing:** Full end-to-end user workflows tested seamlessly.
- **Error Resilience:** Global Error Boundaries and component-level fallbacks preventing abrupt crashes.

### Changed
- Promoted architecture from RC (Release Candidate) phases to production standard.
- Optimized performance by removing cascading state updates and implementing aggressive component memoization.
- Improved accessibility (WCAG 2.1 AA) across all interactive components.

### Fixed
- Next.js hydration mismatch errors caused by local storage state synchronization.
- Markdown rendering unresponsiveness on mobile devices.
