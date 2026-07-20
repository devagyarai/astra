# Astra Storage Forensics Report

## Objective
Perform a forensic persistence audit of the Astra application to determine exactly how and where decisions are stored, specifically addressing why they might not appear in Chrome DevTools Local Storage.

## Methodology
We instrumented the application globally by monkey-patching all browser storage mechanisms before application hydration. The following APIs were intercepted:
- `window.localStorage`
- `window.sessionStorage`
- `document.cookie`
- `window.indexedDB`
- `window.caches`

Each interaction (READ, WRITE, DELETE, OPEN) was logged with the target backend, key name, payload size, and the calling stack trace. 

## Forensic Findings

The audit confirmed that **Astra exclusively uses `localStorage` for decision persistence.** No data is stored in `IndexedDB`, `sessionStorage`, `cookies` (except sidebar state), or `caches`.

### Execution Trace & Persistence Logs

Upon navigating to the application (`/dashboard` and then `/workspace`), the following forensic logs were captured:

```log
[FORENSICS] [localStorage] READ Key: "astra_active_decision_id" | Size: 0 bytes | Caller: at Object.getActiveDecisionId
[FORENSICS] [localStorage] READ Key: "astra_decisions" | Size: 0 bytes | Caller: at Object.getAllDecisions
[FORENSICS] [localStorage] WRITE Key: "astra_decisions" | Size: 299 bytes | Caller: at Object.saveDecision
[FORENSICS] [localStorage] WRITE Key: "astra_active_decision_id" | Size: 36 bytes | Caller: at Object.setActiveDecisionId
[FORENSICS] [localStorage] READ Key: "astra_decisions" | Size: 299 bytes | Caller: at Object.getAllDecisions
[FORENSICS] [localStorage] WRITE Key: "astra_decisions" | Size: 299 bytes | Caller: at Object.saveDecision
```

### Data Schema
- **Backend:** `localStorage`
- **Primary Key:** `astra_decisions`
- **Payload Format:** JSON Stringified array of `Decision` objects.
- **Active State Key:** `astra_active_decision_id`
- **Execution Path:** The `useDecision` hook leverages the `storage.ts` abstraction layer. Writes are debounced by 500ms using `setTimeout` inside a `useEffect` hook.

## Root Cause Analysis (DevTools Discrepancy)

Since the application definitively uses standard `localStorage` and persists the keys exactly as designed, the issue of DevTools showing "no Local Storage entries" is not a code defect. 

The most common reasons for this discrepancy are:
1. **DevTools Refresh Requirement:** The Chrome DevTools `Application` panel does not always live-update when `localStorage` is manipulated programmatically via React hooks. Clicking the small "Refresh" icon (↻) inside the Local Storage panel is required.
2. **Origin Mismatch:** The application is running on `http://localhost:3000`, but the browser might be accessed via `http://127.0.0.1:3000` (or vice-versa). `localStorage` is strictly bound to the exact origin string.
3. **Iframe Isolation:** If the application is being viewed inside an IDE preview window or iframe wrapper, the storage belongs to the iframe's origin, not the parent window's origin.

## Conclusion & Next Steps
- **No code defects were found.** The persistence layer operates flawlessly according to the local-first architecture.
- We will retain the `storage.ts` logic as it works as intended.
- I will remove the forensic monkey-patching to restore the original un-instrumented environment, ensuring no performance overhead remains.
