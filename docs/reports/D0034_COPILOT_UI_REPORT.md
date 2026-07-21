# D-003.4: Astra Copilot UI Report

## Objective
Transform the static Insights sidebar into an intelligent Astra Copilot that provides both conversational guidance and automated actions, maintaining a premium "Decision Intelligence Partner" aesthetic.

## Implementation Details

### Architecture
- Replaced `SidebarRight` with `CopilotSidebar` (`components/workspace/copilot-sidebar.tsx`).
- Created a dual-tab interface (`Chat` and `Actions`).
- Chat operates using `Vercel AI SDK` (`@ai-sdk/react`), with a custom `DefaultChatTransport` to properly communicate with the App Router API (`/api/ai/chat`) in AI SDK v7.
- Replaced raw text processing with proper message streaming and markdown rendering (`react-markdown` + `remark-gfm`).

### Vercel AI SDK v7 Integration
Upgrading to/using `@ai-sdk/react@4.x` / `ai@7.x` introduced severe breaking changes from standard v3 tutorials:
1. `api: string` was removed from `useChat` parameters.
2. `fetch` option was removed directly from `useChat` parameter surface.
3. Solution: Implemented `DefaultChatTransport` initialized with custom `api` and `fetch` interception to manually pass the custom `x-ai-key` header and the JSON `decisionContext` within the body string.
4. Extracted text from `UIMessagePart`s instead of standard `m.content`.

### Action Triggers (Decision Intelligence)
- Action buttons trigger structural AI analyses.
- Current triggers implemented: **Improve Goal**, **Detect Biases**, **Identify Tradeoffs**.
- The Copilot seamlessly calls the `/api/ai/analyze` route for structured suggestions.
- The UI exposes a "Diff Preview" allowing the user to `Accept` or `Reject` AI suggestions (e.g. improved goal text) inline before modifying the primary decision state.

## Runtime Stability
- All state modifications happen outside of render execution, respecting React paradigms.
- The build is stable and `pnpm build` passes with zero type errors.

## Next Steps (D-003.5)
- Enhance inline suggestions across the other fields (Context, Constraints, Options).
- Consider floating `/suggest` action menus for deeper text integration.
- Implement streaming persistence on navigation away from the Decision.
