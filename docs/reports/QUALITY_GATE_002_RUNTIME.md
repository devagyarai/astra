# Quality Gate 002 — Runtime Stability Report

## Objective
Eradicate synchronous rendering violations caused by duplicate state instantiation across sibling components. Ensure that state flows downward unidirectionally strictly through React's native mechanism (Props/Context) to maintain a single source of truth.

## Investigation & Root Cause
During Sprint 1.5, `SidebarRight` was injected into the persistent `layout.tsx` wrapper, while the `WorkspacePage` handled the main canvas. Both imported the `useDecision()` hook independently. 

To keep the insights sidebar perfectly synced with the canvas inputs without a context provider, a Custom Event bus (`astra:decision-sync`) was dispatched synchronously upon every keystroke via `updateField()`. 

**The Error:** When the user typed in the canvas, `WorkspacePage` initiated a re-render. Concurrently, the `window.dispatchEvent` synchronously triggered `setDecision()` inside `SidebarRight`, commanding React to mutate a completely different component's state while the parent rendering phase was actively calculating the DOM diff. This violates React's strict concurrent rendering safety protocols, yielding the warning: *Cannot update a component (`SidebarRight`) while rendering a different component (`WorkspacePage`)*.

## Architectural Fix
1. **Removed Custom Event Sync:** Completely eradicated `astra:decision-sync` logic, custom listeners, and the `sync()` wrapper from `hooks/useDecision.ts`. The hook returns to being a pure local-storage synchronized state manager.
2. **Re-architected Hierarchy:** Removed `<SidebarRight />` from the global `layout.tsx` boundary.
3. **Prop Drilling (Single Source of Truth):** Relocated `<SidebarRight />` into the `WorkspacePage` tree as a sibling to the canvas. Passed the unified `decision` state downwards as a direct React Prop: `<SidebarRight decision={decision} />`.

## Verification
- **Runtime Execution:** Typing in the `Goal`, `Context`, and `Options` fields dynamically evaluates the Insights Sidebar with zero console lag or React hydration warnings.
- **`pnpm lint`:** Passed with 0 errors.
- **`pnpm build`:** Verified successful compilation of statically evaluated routes and TypeScript enforcement.
