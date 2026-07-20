# Astra Interactive Workspace — Capability C-001 (Slice 2)

## Executive Summary
The Decision Workspace has been successfully transitioned from a visual prototype into a fully interactive, local-first React application. All state is strictly typed, rigorously validated, and automatically persisted to the browser's Local Storage without requiring a backend.

## Architecture Decisions
1. **Local-First State:** Engineered `useDecision` as a custom React Hook orchestrating the primary data flow. It abstracts local storage access, automatically provisioning default states when empty.
2. **Debounced Autosave:** Implemented a non-blocking 500ms debounce on the `save` side-effect to ensure the UI remains performant during rapid typing while guaranteeing data durability.
3. **Presentational Preservation:** Kept `page.tsx` tightly focused on composition and layout, passing down state and mutators directly from the hook to maintain the "dumb component" pattern where possible, aligning with Astra's architecture standards.

## Files Created
- `types/decision.ts`: Strict TypeScript definition defining the core `Decision` model.
- `hooks/useDecision.ts`: The central state management layer responsible for data persistence and mutators.
- `components/ui/textarea.tsx`: Integrated via Shadcn to provide the standard multi-line input field.
- `INTERACTIVE_WORKSPACE_REPORT.md`: This architectural summary document.

## Files Modified
- `app/workspace/page.tsx`: Transformed the static grid into a fully data-bound form. Replaced placeholder text blocks with `Textarea` and `Input` components. Bound all fields to `useDecision` mutators. Rebuilt the header to provide real-time save status and validation feedback.

## Validation Strategy
- **Inline, Non-Blocking:** Title and Goal are strictly required. Validation is computed on every render cycle.
- **Save Protection:** If the `Decision` object is invalid (empty Title or Goal), the header actively communicates that it cannot be saved and the autosave effect is bypassed.
- **No Alerts:** Errors are elegantly displayed inline using red semantic typography and warning icons (`text-destructive`), avoiding jarring browser alerts.
- **Character Limits:** Hard limits enforced via HTML `maxLength` (Goal: 1000, Context: 3000, Notes: 5000) alongside visual counters warning users as they approach limits.

## Local Storage Strategy
- Data is serialized as JSON and stored under the deterministic key `astra_decision_workspace`.
- A fallback recovery mechanism captures `JSON.parse` failures and safely replaces corrupted data with a clean `defaultDecision` model, ensuring the app never enters an unrecoverable crash state.

## Future Backend Integration Notes
- The `useDecision` hook currently abstracts persistence. When a backend is introduced, the `localStorage.setItem` call within the `setTimeout` can be gracefully replaced with an API `fetch/POST` request.
- The `id` field is currently generated via `crypto.randomUUID()`, which easily maps to standard PostgreSQL UUID primary keys.
- State initialization via `localStorage.getItem` can be swapped for a Server-Side data fetch within the Next.js page component (using React Server Components), passing the initial `Decision` down to a Client Component wrapper.
