Ran list top-level directories
Ran list top-level files
Analyzed package.json:L1-58
Ran list core files in key directories
Ran list files in app, components, hooks, types, docs
Ran run pnpm test
Ran run pnpm lint
Analyzed ARCHITECTURE.md:L1-33
Analyzed decision-analysis.ts:L1-184
Analyzed decision.ts:L1-22
Analyzed ai.ts:L1-44
Analyzed analysis.ts:L1-118
Ran run pnpm build
Analyzed route.ts:L1-61
Analyzed route.ts:L1-75
Analyzed orchestrator.ts:L1-55
Analyzed providers.ts:L1-27
Analyzed context-builder.ts:L1-64
Checked task Run pnpm build
Analyzed copilot-sidebar.tsx:L1-500
Analyzed analysis.ts:L1-119
Checked task Run pnpm build
Analyzed system.ts:L1-21
Analyzed analysis.ts:L1-11
Analyzed bias.ts:L1
Analyzed executive.ts:L1
Analyzed generators.ts:L1-9
Analyzed alternatives.ts:L1
Analyzed goal.ts:L1
Analyzed recommendation.ts:L1
Analyzed risks.ts:L1
Analyzed tradeoff.ts:L1
Ran search for prompt imports
Ran search for ANALYSIS_PROMPTS and GENERATOR_PROMPTS
Ran search for services/ai/analysis usages
Ran search for AIOrchestrator
Ran search for buildDecisionContext
Analyzed copilot-sidebar.tsx:L495-520
Analyzed decision-repository.ts:L1-181
Analyzed useDecision.ts:L1-156
Analyzed useLocalStorage.ts
Analyzed useAutosave.ts
Analyzed useWorkspace.ts:L1-89
Ran check size of useLocalStorage and useAutosave
Ran check imports of empty hooks
Analyzed validations.ts
Analyzed constants.ts
Analyzed hash.ts:L1-19
Analyzed monitoring.ts:L1-82
Analyzed utils.ts:L1-6
Ran find all 0-byte files
Killing task Find all 0-byte files
Ran check if animations is imported
Analyzed ai.test.ts:L1-33
Analyzed setup.ts:L1-31
Analyzed workspace.test.ts:L1-89
Analyzed core-workflow.spec.ts:L1-89
Analyzed playwright.config.ts:L1-48
Analyzed page.tsx:L1-493
Analyzed DecisionStep.tsx:L1-16
Analyzed ReviewPanel.tsx:L1-105
Analyzed NavigationControls.tsx:L1-41
Analyzed DecisionProgress.tsx:L1-72
Analyzed DecisionCard.tsx:L1-125
Ran search for ReviewPanel, DecisionStep, NavigationControls
Analyzed page.tsx:L1-284
Analyzed page.tsx:L1-275
Analyzed page.tsx:L1-131
Analyzed sidebar-left.tsx:L1-262
Analyzed page.tsx:L1-106
Analyzed action-card.tsx:L1-90
Analyzed hybrid-analysis.tsx:L1-178
Analyzed SuggestionPreview.tsx:L1-53
Analyzed visualizations.tsx:L1-177
Ran search for GoalVisualization
Canceled list documentation files
Killed task List documentation files
Ran list project markdown docs
Analyzed README.md:L1-41
Analyzed AI.md:L1-13
Analyzed BACKEND.md:L1-13
Analyzed DATABASE.md:L1-13
Analyzed FRONTEND.md:L1-20
Analyzed SECURITY.md:L1-13
Analyzed SYSTEM.md:L1-13
Analyzed D0032_AI_ARCHITECTURE_REPORT.md:L1-34
Analyzed D0033_DECISION_INTELLIGENCE_ENGINE_REPORT.md:L1-36
Analyzed D0034_COPILOT_UI_REPORT.md:L1-34
Analyzed HYBRID_INTELLIGENCE_REPORT.md:L1-35
Analyzed FINAL_RELEASE_AUDIT.md:L1-94
Analyzed next.config.ts:L1-35
Analyzed tsconfig.json:L1-34
Analyzed eslint.config.mjs:L1-18
Ran git status and recent commits
Analyzed layout.tsx:L1-62
Analyzed page.tsx:L1-323
Analyzed page.tsx:L1-47
Analyzed page.tsx:L1-62
Analyzed page.tsx:L1-54
Ran search for IndexedDB in codebase
Ran run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests
Checked task Run playwright e2e tests

# ASTRA — Comprehensive Technical & Architectural Audit Report

**Audit Mode:** Read-Only Technical Audit  
**Auditor:** Senior Full-Stack Engineer & Software Architect  
**Target Repository:** [devagyarai/astra](https://github.com/devagyarai/astra) (Local Workspace: `c:\Development\astra`)  
**Git Branch & Commit:** `main` @ `6297c91` (`feat(ui): Astra v1.1.1 professional UI polish`)  
**Audit Date:** November 20, 2026

---

## 1. Executive Summary

This audit is an evidence-based technical assessment of the **ASTRA** codebase prior to code modifications. ASTRA is designed as an AI-assisted decision-support platform combining deterministic decision-analysis heuristics with Large Language Model (LLM) copilot assistance and structured analytical tooling.

### Key Findings Summary

1. **Strong Foundations:**
   - The user interface is well-structured using Next.js App Router, Tailwind CSS v4, Radix primitives, and Framer Motion.
   - The multi-decision workspace architecture (`DecisionRepository`) provides clean client-side persistence and autosave in browser `localStorage`.
   - The deterministic heuristic engine (`lib/analysis/decision-analysis.ts`) evaluates decision completeness, confidence, biases, and trade-offs locally without remote dependencies.
2. **Critical AI Integration Bugs & Disconnects:**
   - **Chat Context Disconnect (High Severity):** While `components/workspace/copilot-sidebar.tsx` constructs and transmits a `decisionContext` JSON payload inside the chat request body, the backend edge route `app/api/ai/chat/route.ts` discards this field during destructuring. As a result, **the conversational AI partner receives zero decision data and answers entirely blind to the user's canvas**.
   - **Broken "Improve Goal" Feature (High Severity):** In `types/analysis.ts`, `GoalReviewSchema` returns the rewritten goal under the key `improvedVersion`. However, both `components/workspace/copilot-sidebar.tsx` (lines 447, 450) and `app/workspace/page.tsx` (lines 310, 314, 316) check for `improvedGoal`. Consequently, the inline "Improve" button renders nothing upon completion, and the Copilot sidebar displays raw stringified JSON, where the "Accept" action is completely non-functional.
   - **Bypassed Prompt Registry & Ghost Abstractions:** Specialized prompts defined in `prompts/` (`GOAL_SYSTEM_PROMPT`, `BIAS_SYSTEM_PROMPT`, etc.) and the client-side `AIOrchestrator` (`services/ai/orchestrator.ts`) and analysis runner (`services/ai/analysis.ts`) are completely bypassed. The UI directly triggers `fetch('/api/ai/analyze')` without providing system prompts, causing the backend route to default to a generic fallback string.
   - **Disconnected Personas:** All eight conversational AI personas defined in `types/ai.ts` and `prompts/system.ts` are unreachable from the UI and never injected into requests.
3. **Ghost Code & Repository Hygiene:**
   - Five files in the active source tree are completely empty (0 bytes): `hooks/useAutosave.ts`, `hooks/useLocalStorage.ts`, `lib/animations.ts`, `lib/constants.ts`, and `lib/validations.ts`.
   - Three UI components (`ReviewPanel.tsx`, `DecisionStep.tsx`, `NavigationControls.tsx`) are orphaned remnants of a legacy step-by-step wizard, completely unused by the active single-page canvas.
4. **Testing Coverage Deficits:**
   - The deterministic engine (`lib/analysis/decision-analysis.ts`) has **zero unit test coverage**.
   - The End-to-End (E2E) test suite (`tests/e2e/core-workflow.spec.ts`) contains conditional `if (await ...isVisible())` guards and selector mismatches (`'Ask Astra...'` vs actual `'Ask AI Partner...'`), resulting in silent assertion skips rather than genuine regression validation.

---

## 2. Verified System Architecture

```
                          ┌────────────────────────────────────────────────────────┐
                          │                   CLIENT BROWSER                       │
                          │                                                        │
                          │   ┌────────────────────┐      ┌────────────────────┐   │
                          │   │   Decision Canvas  │      │  Copilot Sidebar   │   │
                          │   │ (app/workspace)    │      │ (Analysis/Chat/Act)│   │
                          │   └─────────┬──────────┘      └─────────┬──────────┘   │
                          │             │                           │              │
                          │             ▼                           │              │
                          │   ┌────────────────────┐                │              │
                          │   │  Deterministic     │                │              │
                          │   │  Heuristic Engine  │                │              │
                          │   │ (decision-analysis)│                │              │
                          │   └─────────┬──────────┘                │              │
                          │             │                           │              │
                          │             ▼                           │              │
                          │   ┌────────────────────┐                │              │
                          │   │ DecisionRepository │                │              │
                          │   │   (localStorage)   │                │              │
                          │   └────────────────────┘                │              │
                          └─────────────────┬───────────────────────┼──────────────┘
                                            │                       │
                                            │ HTTP POST             │ HTTP POST
                                            │ (x-ai-key header)     │ (x-ai-key header)
                                            ▼                       ▼
                          ┌───────────────────────────┐   ┌────────────────────────┐
                          │   /api/ai/analyze (Edge)  │   │  /api/ai/chat (Node)   │
                          │   ai: generateObject      │   │  ai: streamText        │
                          └─────────────┬─────────────┘   └────────────┬───────────┘
                                        │                              │
                                        └──────────────┬───────────────┘
                                                       │
                                                       ▼
                                         ┌───────────────────────────┐
                                         │ Provider API (BYOK)       │
                                         │ - OpenAI (gpt-4o)         │
                                         │ - Anthropic (claude-3.5)  │
                                         └───────────────────────────┘
```

### Module Responsibilities & Verification Status

| Module Path                                  | Primary Responsibility                                                                                           | Verification Status                | Implementation Notes                                                                                                                |
| :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `app/workspace/page.tsx`                     | Main decision-making canvas; real-time form inputs, section scrolling, inline AI action triggers.                | **Implemented & Verified**         | Actively rendered. Contains property name bug for inline goal improvement (`improvedGoal` vs `improvedVersion`).                    |
| `app/dashboard/page.tsx`                     | Dashboard displaying high-level decision metrics, completion averages, recent decisions, and creation triggers.  | **Implemented & Verified**         | Functional; correctly computes aggregate metrics via `analyzeDecision`.                                                             |
| `app/timeline/page.tsx`                      | Chronological feed of active decisions sorted by `updatedAt`.                                                    | **Implemented & Verified**         | Functional; uses `DecisionCard` components.                                                                                         |
| `app/archive/page.tsx`                       | Soft-deleted / archived decision management with search and sort.                                                | **Implemented & Verified**         | Functional; restores or permanently deletes records.                                                                                |
| `app/settings/page.tsx`                      | BYOK API key entry, theme management, JSON backup export/import, data reset.                                     | **Implemented & Verified**         | Fully functional. Contains privacy claim contradiction regarding proxy transmission.                                                |
| `components/workspace/copilot-sidebar.tsx`   | Three-tab copilot (Analysis, Chat, Tools); orchestrates hybrid intelligence, chat streaming, and tool execution. | **Partially Implemented / Broken** | Chat drops decision context; "Improve Goal" tool references invalid property `improvedGoal`.                                        |
| `components/decision/DecisionCard.tsx`       | Summary card representing a decision state with completion and confidence badges.                                | **Implemented & Verified**         | Shared across Dashboard, Timeline, and Archive.                                                                                     |
| `components/decision/DecisionProgress.tsx`   | Top-bar stepper and anchor navigation for canvas sections.                                                       | **Implemented & Verified**         | Section "review" is only an empty anchor tag.                                                                                       |
| `components/decision/ReviewPanel.tsx`        | Read-only review card layout with edit triggers per step.                                                        | **Missing or Broken (Orphaned)**   | Dead code. Never imported or rendered anywhere in the application.                                                                  |
| `components/decision/DecisionStep.tsx`       | Motion wrapper for wizard steps.                                                                                 | **Missing or Broken (Orphaned)**   | Dead code. Never imported or rendered.                                                                                              |
| `components/decision/NavigationControls.tsx` | "Previous" / "Next" step buttons.                                                                                | **Missing or Broken (Orphaned)**   | Dead code. Never imported or rendered.                                                                                              |
| `hooks/useDecision.ts`                       | React lifecycle hook for active decision: loading, state mutations, and debounced autosave.                      | **Implemented & Verified**         | 500ms autosave debounce. Correctly dispatches and listens to `astra_workspace_updated`.                                             |
| `hooks/useWorkspace.ts`                      | Decision collection management: active ID switching, creating, renaming, duplicating, deleting.                  | **Implemented & Verified**         | Manages multi-decision workspace state cleanly.                                                                                     |
| `hooks/useLocalStorage.ts`                   | Generic localStorage synchronization hook.                                                                       | **Missing or Broken**              | 0-byte file (completely empty).                                                                                                     |
| `hooks/useAutosave.ts`                       | Generic autosave hook.                                                                                           | **Missing or Broken**              | 0-byte file (completely empty). Autosave logic is embedded directly in `useDecision.ts`.                                            |
| `lib/analysis/decision-analysis.ts`          | Deterministic decision analysis engine: score formulas, risk ratings, bias heuristics, trade-offs.               | **Implemented & Verified**         | Pure deterministic logic. Verified implementation, but has 0 unit tests.                                                            |
| `lib/repositories/decision-repository.ts`    | Data access layer for browser `localStorage`, multi-decision CRUD, chat persistence, and schema migrations.      | **Implemented & Verified**         | Verified with 7 passing unit tests in `tests/workspace.test.ts`.                                                                    |
| `lib/hash.ts`                                | Cyrb53 53-bit string hash utility for context caching.                                                           | **Implemented & Verified**         | Verified; used exclusively inside `services/ai/analysis.ts`.                                                                        |
| `lib/monitoring.ts`                          | Production logger facade with performance tracking wrapper.                                                      | **Implemented & Verified**         | Functional abstraction, though sparingly used across components.                                                                    |
| `lib/validations.ts`                         | Zod validations for decision forms.                                                                              | **Missing or Broken**              | 0-byte file (completely empty).                                                                                                     |
| `lib/constants.ts`                           | Application-wide constants.                                                                                      | **Missing or Broken**              | 0-byte file (completely empty).                                                                                                     |
| `lib/animations.ts`                          | Shared Framer Motion animation configurations.                                                                   | **Missing or Broken**              | 0-byte file (completely empty).                                                                                                     |
| `services/ai/providers.ts`                   | Settings persistence for BYOK provider and keys (`astra_ai_settings`).                                           | **Implemented & Verified**         | Verified with 3 passing unit tests in `tests/ai.test.ts`.                                                                           |
| `services/ai/context-builder.ts`             | Serializes `Decision` object to markdown string.                                                                 | **Partially Implemented**          | Implemented, but only imported by unused modules (`services/ai/orchestrator.ts` and `services/ai/analysis.ts`). UI does not use it. |
| `services/ai/orchestrator.ts`                | Client-side orchestrator intended to assemble chat payloads with system prompts and context.                     | **Missing or Broken (Orphaned)**   | Completely orphaned. Never imported or invoked by `copilot-sidebar.tsx` or any other file.                                          |
| `services/ai/analysis.ts`                    | Typed client SDK for invoking `/api/ai/analyze` with local caching.                                              | **Missing or Broken (Orphaned)**   | Completely orphaned. Never imported by UI components.                                                                               |
| `prompts/system.ts`                          | Defines base system prompt and 8 AI personas.                                                                    | **Documented but not verified**    | Implemented in file, but never active in runtime execution.                                                                         |
| `prompts/analysis.ts`                        | Legacy raw analysis prompt strings.                                                                              | **Missing or Broken**              | Dead code. Unused.                                                                                                                  |
| `prompts/generators.ts`                      | Legacy generator prompt strings.                                                                                 | **Missing or Broken**              | Dead code. Unused.                                                                                                                  |

---

## 3. AI Integration and Request Lifecycle

### 3.1 Tracing the Request Lifecycles

#### Flow A: Copilot Streaming Chat (`/api/ai/chat`)

1. **User Action:** User types a question into the Copilot chat input (`copilot-sidebar.tsx`, line 390) and submits.
2. **Request Construction:** `useChat` hook calls the custom `DefaultChatTransport` (lines 137–162).
   - In `fetch` override (lines 143–160), the payload body is assembled:
     ```ts
     body: JSON.stringify({
       ...parsedBody,
       provider: aiSettings.provider,
       system: "You are an expert Decision Intelligence Partner (Astra)...",
       decisionContext: JSON.stringify({
         goal: decision.goal,
         context: decision.context,
         constraints: decision.constraints,
         options: decision.options,
         evidence: decision.evidence,
       }),
     });
     ```
   - Headers include `x-ai-key: apiKey`.
3. **API Route Handling:** `app/api/ai/chat/route.ts` receives the request.
   - Parses payload with `ChatRequestSchema` (lines 10–15):
     ```ts
     const ChatRequestSchema = z.object({
       messages: z.array(z.any()),
       provider: z.enum(["openai", "anthropic"]),
       system: z.string().optional(),
       decisionContext: z.string().optional(),
     });
     ```
   - **THE FATAL DEFECT (Line 26):**
     ```ts
     const { messages, provider, system } = parsed.data;
     ```
     `decisionContext` is accepted by the schema, but is **never destructured and never referenced**.
4. **Model Invocation (Lines 47–51):**
   ```ts
   const result = await streamText({
     model,
     messages,
     system:
       system || "You are Astra, an elite executive decision-making partner.",
   });
   return result.toTextStreamResponse();
   ```
5. **Observed Reality:** The upstream model (GPT-4o or Claude 3.5 Sonnet) is called with **only** the user conversation history and a generic static instruction string. **It has no access to the decision's title, goal, context, constraints, options, or evidence.**

#### Flow B: Structured Output Analysis (`/api/ai/analyze`)

1. **User Action:** User clicks "Run Analysis" in Copilot (hybrid) or clicks an action card ("Improve Goal", "Detect Biases", "Trade-off Matrix") or canvas "Improve".
2. **Request Construction:** Direct `fetch("/api/ai/analyze")` is executed from `copilot-sidebar.tsx` (lines 73–90, 108–125) or `app/workspace/page.tsx` (lines 117–134).
   - Sends: `{ provider, type, context: JSON.stringify(...) }`.
   - **Notice:** `system` is **not passed**.
3. **API Route Execution (`app/api/ai/analyze/route.ts`):**
   - Resolves Zod schema from `schemaMap[type]` (lines 9–19).
   - Resolves model (`claude-3-5-sonnet-20240620` or `gpt-4o`).
   - Invokes `generateObject`:
     ```ts
     const { object } = await generateObject({
       model,
       schema: schemaMap[type],
       system: system || "You are an expert decision intelligence analyst.",
       prompt: context,
     });
     ```
   - Because `system` was omitted by the caller, it defaults to `"You are an expert decision intelligence analyst."`.
4. **Response Handling:**
   - For `type: "hybrid"`, returns `AiInsights` and renders in `components/ai/hybrid-analysis.tsx`. (Functional).
   - For `type: "bias"`, renders `BiasVisualization`. (Functional).
   - For `type: "tradeoff"`, renders `TradeoffVisualization`. (Functional).
   - For `type: "goal"`, expected to return `GoalReview`. **Fails due to property mismatch (`improvedGoal` vs `improvedVersion`).**

### 3.2 Provider Configuration & BYOK Verification

- **Supported Providers:**
  - `openai`: `createOpenAI({ apiKey })("gpt-4o")` via `@ai-sdk/openai`.
  - `anthropic`: `createAnthropic({ apiKey })("claude-3-5-sonnet-20240620")` via `@ai-sdk/anthropic`.
- **Validation:** Both routes verify presence of `req.headers.get("x-ai-key")`. If missing, return HTTP 401 with JSON error.
- **Timeouts & Failure Handling:**
  - `app/api/ai/chat/route.ts` defines `export const maxDuration = 30;`.
  - `app/api/ai/analyze/route.ts` defines `export const runtime = "edge";` but sets no explicit timeout.
  - Failures are caught via top-level `try/catch` returning `{ error: (error as Error).message }` with status 500.

---

## 4. Prompt Engineering Audit

### 4.1 Prompt Inventory and Utilization Matrix

| Prompt File                 | Exported Identifier            | Purpose                                               | Bound Zod Schema             | Intended Invoker                    | Actual Active Usage    |
| :-------------------------- | :----------------------------- | :---------------------------------------------------- | :--------------------------- | :---------------------------------- | :--------------------- |
| `prompts/system.ts`         | `getSystemPrompt(persona)`     | Base system prompt + 8 persona overlays               | N/A                          | `AIOrchestrator.prepareChatPayload` | **Unused (Dead Code)** |
| `prompts/goal.ts`           | `GOAL_SYSTEM_PROMPT`           | Instruction for goal scoring and rewriting            | `GoalReviewSchema`           | `services/ai/analysis.ts`           | **Unused (Dead Code)** |
| `prompts/bias.ts`           | `BIAS_SYSTEM_PROMPT`           | Instruction for identifying cognitive biases          | `BiasAnalysisSchema`         | `services/ai/analysis.ts`           | **Unused (Dead Code)** |
| `prompts/risks.ts`          | `RISKS_SYSTEM_PROMPT`          | Instruction for operational/technical risk assessment | `RiskAnalysisSchema`         | `services/ai/analysis.ts`           | **Unused (Dead Code)** |
| `prompts/tradeoff.ts`       | `TRADEOFF_SYSTEM_PROMPT`       | Instruction for constructing trade-off matrix         | `TradeoffMatrixSchema`       | `services/ai/analysis.ts`           | **Unused (Dead Code)** |
| `prompts/alternatives.ts`   | `ALTERNATIVES_SYSTEM_PROMPT`   | Innovation strategist for alternative generation      | `AlternativeGeneratorSchema` | `services/ai/analysis.ts`           | **Unused (Dead Code)** |
| `prompts/executive.ts`      | `EXECUTIVE_SYSTEM_PROMPT`      | Chief of Staff summary instruction                    | `ExecutiveSummarySchema`     | `services/ai/analysis.ts`           | **Unused (Dead Code)** |
| `prompts/recommendation.ts` | `RECOMMENDATION_SYSTEM_PROMPT` | Definitive decision recommendation instruction        | `RecommendationSchema`       | `services/ai/analysis.ts`           | **Unused (Dead Code)** |
| `prompts/analysis.ts`       | `ANALYSIS_PROMPTS`             | Dictionary of raw analysis prompt strings             | None                         | Legacy                              | **Unused (Dead Code)** |
| `prompts/generators.ts`     | `GENERATOR_PROMPTS`            | Dictionary of raw generator prompt strings            | None                         | Legacy                              | **Unused (Dead Code)** |

### 4.2 Findings on Personas & Prompt Information Flow

1. **The Eight Personas Are Completely Disconnected:**
   `types/ai.ts` defines `AIPersona`: `"Executive Advisor" | "Devil's Advocate" | "Strategic Consultant" | "Product Manager" | "Technical Architect" | "Investor" | "Psychologist" | "Socratic Mentor"`. `prompts/system.ts` defines corresponding instructions. However:
   - There is no persona selector dropdown or radio group in `CopilotSidebar` or `SettingsPage`.
   - `CopilotSidebar` hardcodes its chat system instruction to `"You are an expert Decision Intelligence Partner (Astra)..."`.
   - Personas are never transmitted in any API call.
2. **Duplicated & Orphaned Prompt Files:**
   `prompts/analysis.ts` and `prompts/generators.ts` duplicate prompts that were later split into individual files (`bias.ts`, `tradeoff.ts`, `goal.ts`). Neither is imported anywhere in the repository.
3. **Structured Prompt Bypassing:**
   The specialized prompts in `goal.ts`, `bias.ts`, etc. were intended to be passed by `services/ai/analysis.ts`. Because `copilot-sidebar.tsx` bypasses `services/ai/analysis.ts` and invokes `fetch('/api/ai/analyze')` directly without a `system` parameter, **none of these prompt files are ever passed to the LLM during runtime**.

---

## 5. Deterministic Algorithm Audit

The decision-analysis engine is implemented in `lib/analysis/decision-analysis.ts` via the function `analyzeDecision(decision: Decision): DecisionAnalysis`. Below are the exact source-code formulas, thresholds, and heuristics.

### 5.1 Input Evaluations

- `hasGoal`: `decision.goal.trim().length > 0`
- `hasContext`: `decision.context.trim().length > 0`
- `hasConstraints`: `decision.constraints.trim().length > 0`
- `validOptions`: `decision.options.filter(o => o.trim().length > 0)`
- `validEvidence`: `decision.evidence.filter(e => e.trim().length > 0)`
- `hasNotes`: `decision.notes.trim().length > 0`

### 5.2 Completion Score Formulation

Initial: `completionScore = 0`
$$\text{completionScore} = 20\mathbb{I}_{\text{hasGoal}} + 20\mathbb{I}_{\text{hasContext}} + 15\mathbb{I}_{\text{hasConstraints}} + 20\mathbb{I}_{|\text{validOptions}| > 0} + 15\mathbb{I}_{|\text{validEvidence}| > 0} + 10\mathbb{I}_{\text{hasNotes}}$$

- Theoretical Minimum: `0`
- Theoretical Maximum: `100`

### 5.3 Confidence Score Formulation

Initial: `confidenceScore = 0`

1. **Additive Bonuses:**
   - If `hasGoal`: $+20$
   - If `hasContext`: $+20$
   - If `validOptions.length > 1`: $+30$ _(Note: 0 points if exactly 1 option)_
   - If `validEvidence.length > 0`: $+20$
   - If `hasNotes`: $+10$
2. **Deductions / Penalties:**
   - If `!hasGoal`: $-20$
   - If `validOptions.length === 1`: $-10$
   - If `validEvidence.length === 0`: $-15$
   - If `!hasContext`: $-10$
3. **Contradictory State Penalty (Overconfidence without evidence):**
   - If `confidenceScore > 60 && validEvidence.length === 0`: $\text{confidenceScore} \mathrel{-}= 30$
4. **Boundary Clamping:**
   $$\text{confidenceScore} = \max(0, \min(100, \text{confidenceScore}))$$

### 5.4 Classification Thresholds

#### Risk Level Classification

Evaluated strictly in order:

1. **High Risk:**
   $$\text{completionScore} < 40 \lor |\text{validOptions}| < 2 \lor \neg\text{hasGoal} \lor \neg\text{hasContext}$$
2. **Medium Risk:**
   $$\text{completionScore} < 75 \lor |\text{validEvidence}| = 0 \lor \neg\text{hasConstraints}$$
3. **Low Risk:**
   All other conditions.

#### Readiness Classification

Evaluated strictly in order:

1. **Ready:**
   $$\text{completionScore} \ge 80 \land \text{confidenceScore} \ge 70 \land \text{riskLevel} \ne \text{"High"}$$
2. **Needs Work:**
   $$\text{completionScore} \ge 50 \lor \text{confidenceScore} \ge 40$$
3. **Not Ready:**
   All other conditions.

### 5.5 Deterministic Heuristics

#### Missing Information Heuristics

- If `!hasGoal`: `"Missing Goal"`
- If `!hasContext`: `"Missing Context"`
- If `!hasConstraints`: `"No Constraints"`
- If `validOptions.length === 0`: `"No Options"`
- If `validEvidence.length === 0`: `"No Evidence"`
- If `!hasNotes`: `"No Notes"`

#### Weaknesses & Strengths

- **Goal Length Heuristics:**
  - Length $< 20$: Weakness `"Very Short Goal"`
  - Length $> 1000$: Weakness `"Very Long Goal"`
  - Otherwise (if `hasGoal`): Strength `"Clear objective"`
- **Options Heuristics:**
  - Length $= 0$: Weakness `"No alternatives defined"`
  - Length $= 1$: Weakness `"Single-option bias"`
  - Length $> 1$: Strength `"Multiple alternatives considered"`
- **Evidence Heuristics:**
  - Length $= 0$: Weaknesses `"Decision relies on intuition"`, `"Missing supporting evidence"`
  - Length $> 0$: Strengths `"Evidence-backed decision"`, `"Balanced reasoning"`

#### Next Best Action Priority Ladder

Evaluated as an exclusive cascading priority:

1. If `!hasGoal` $\rightarrow$ `"Define the Goal"`
2. Else if `!hasContext` $\rightarrow$ `"Provide Context"`
3. Else if `validOptions.length === 0` $\rightarrow$ `"Add Options"`
4. Else if `validOptions.length === 1` $\rightarrow$ `"Add another option"`
5. Else if `!hasConstraints` $\rightarrow$ `"Define Constraints"`
6. Else if `validEvidence.length === 0` $\rightarrow$ `"Add Evidence"`
7. Default $\rightarrow$ `"Review and finalize decision"`

#### Rule-Based Bias Flags

- If `validOptions.length === 1`: `"Single-Option Aversion (Tunnel Vision)"` _(Note: Author used "Aversion" in place of "Narrow Framing")_
- If `validEvidence.length === 0 && confidenceScore > 50`: `"Confirmation Bias Risk (Overconfidence without evidence)"`
- If `!hasConstraints && validOptions.length > 2`: `"Choice Overload Risk (Many options, no constraints)"`

---

## 6. Data Persistence and Security

### 6.1 Storage Architecture & Keys

All application data is persisted exclusively client-side via the browser's `Window.localStorage` API.

| Key                                           | Storage Target                                  | Format                                                  | Lifecycle / Invalidation                                                                       |
| :-------------------------------------------- | :---------------------------------------------- | :------------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| `astra_decisions`                             | All active and archived decisions               | JSON Array of `Decision` objects                        | Updated on every debounced autosave (500ms) or CRUD action.                                    |
| `astra_active_decision_id`                    | ID of the current decision loaded in the canvas | UUID string                                             | Updated on decision switch or creation. Cleared on delete if active.                           |
| `astra_decision_workspace`                    | Legacy v1.0 single-decision storage             | JSON Object                                             | Migrated into `astra_decisions` array on first `getAll()` run, then deleted.                   |
| `astra_chat_${decisionId}`                    | Chat message history per decision               | JSON Array of `UIMessage`                               | Loaded on decision load, updated on message receive, cleared on decision delete or user clear. |
| `astra_ai_settings`                           | User AI provider and API keys                   | JSON Object (`{ provider, openaiKey?, anthropicKey? }`) | Persisted indefinitely until user changes or clears in Settings.                               |
| `astra_analysis_cache_${decision.id}_${type}` | Caching layer for structured analysis           | JSON Object (`{ hash, timestamp, data }`)               | Defined in `services/ai/analysis.ts`, but currently inactive due to direct fetch in UI.        |

### 6.2 Autosave Behavior

- Implemented in `hooks/useDecision.ts` (lines 61–82).
- Triggers a 500ms debounce timer on every mutation to the active `decision` state.
- Upon timer resolution, writes the updated decision to `localStorage` via `DecisionRepository.save(updatedDecision)`.
- Updates `saveStatus` state: `"saving"` $\rightarrow$ `"saved"` (or `"error"` if quota exceeded).
- Dispatches a custom window event `"astra_workspace_updated"` to notify other components (e.g., `useWorkspace`).

### 6.3 Backup, Export, and Data Migration

- **Export (`app/settings/page.tsx`, line 34):** Generates a downloadable JSON file `astra-backup-YYYY-MM-DD.json`.
  - **Limitation:** Exports **only** the `astra_decisions` array. Chat history (`astra_chat_${id}`) and AI settings are **not** included in the backup.
- **Import (`app/settings/page.tsx`, line 47):** Reads the JSON file, merges imported decisions by matching `id` (overwriting existing IDs or appending new ones), saves each to `DecisionRepository`, and triggers `window.location.reload()`.
- **Reset (`app/settings/page.tsx`, line 82):** Double browser confirmation prompt, calls `DecisionRepository.clearAllData()`, removing all decisions and all associated `astra_chat_${id}` keys.

### 6.4 Security & Privacy Analysis

1. **API Key Exposure in Browser Storage:**
   API keys are stored as plaintext JSON under `astra_ai_settings` in `localStorage`. Any script executing in the page origin (e.g., third-party script injection or compromised dependency) can read the keys.
2. **False Privacy Claims in UI:**
   - In `app/settings/page.tsx` (lines 194 and 213), the UI states:
     > _"Your key is never sent to Astra's servers. It is used directly from your browser to the provider."_
   - **Verification Reality:** The key **is transmitted** to Astra's Next.js server/edge routes (`/api/ai/chat` and `/api/ai/analyze`) in the `x-ai-key` HTTP header. On any remote deployment (e.g., Vercel), the key leaves the browser and traverses the hosting infrastructure. While necessary to prevent CORS blocks from OpenAI/Anthropic, the user-facing privacy statement is factually false.
3. **Sensitive Error Leakage:**
   In `app/api/ai/analyze/route.ts` line 70, upstream provider errors are forwarded directly to the client:
   `return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })`.
   If an upstream provider returns an error string containing account details or project identifiers, it is exposed to the client response.
4. **Content Security Policy (CSP):**
   Defined in `next.config.ts`:
   `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;`
   While restricting script origins, the inclusion of `'unsafe-eval'` and `'unsafe-inline'` diminishes XSS defense capabilities.

---

## 7. Testing and Quality Assurance

### 7.1 Unit & Integration Test Audit

```
tests/
├── ai.test.ts (3 tests)
├── setup.ts (Test environment mocks)
├── workspace.test.ts (7 tests)
└── e2e/
    └── core-workflow.spec.ts (1 test)
```

| Test File Path                    | Target Under Test                         | What It Tests                                                                                                                                                                                                                                                | What It Does NOT Test                                                                                                              | Validity Assessment                                                                            |
| :-------------------------------- | :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `tests/ai.test.ts`                | `services/ai/providers.ts`                | 1. Default settings when storage is empty (`{ provider: 'openai' }`).<br>2. Saving and retrieving custom provider settings (`anthropic`, key).<br>3. Graceful handling of invalid JSON in `localStorage`.                                                    | Does not test API key transmission, headers, model selection, prompt construction, streaming, or error handling.                   | Validates pure storage accessors; does not validate AI integration.                            |
| `tests/workspace.test.ts`         | `lib/repositories/decision-repository.ts` | 1. `createDefaultDecision` default values.<br>2. Saving and retrieving by ID.<br>3. `getAll()` returning all records.<br>4. Deleting a decision.<br>5. Active ID management.<br>6. Legacy single-decision format auto-migration.<br>7. Decision duplication. | Does not test storage quota exhaustion, concurrent tab writes, event listener dispatching, or chat history clearing upon deletion. | Genuinely validates repository CRUD logic and migration.                                       |
| `tests/setup.ts`                  | Vitest environment setup                  | In-memory `localStorageMock` and dummy `ResizeObserver`.                                                                                                                                                                                                     | N/A                                                                                                                                | Mock configuration file.                                                                       |
| `tests/e2e/core-workflow.spec.ts` | Full web workflow via Playwright          | Marketing page navigation, Settings localStorage seeding, Dashboard new decision creation, Goal input, Autosave persistence upon page reload, Options entry, Archive page check.                                                                             | Does not genuinely test AI Copilot chat; does not test analysis triggers; does not test error boundaries.                          | **Critically Flawed:** Contains conditional guards and wrong selector strings (details below). |

### 7.2 Flaws in End-to-End Test Suite (`tests/e2e/core-workflow.spec.ts`)

1. **Wrong Selector Masks Chat Test:**
   Line 78: `const chatInput = page.getByPlaceholder('Ask Astra...');`
   In `copilot-sidebar.tsx` line 396, the placeholder is actually `'Ask AI Partner...'`.
   Because line 79 wraps the assertion in:
   `if (await chatInput.isVisible()) { await chatInput.fill(...); }`
   `chatInput.isVisible()` evaluates to `false`, and the test **silently skips the entire chat interaction without failing**.
2. **Conditional Assertions Throughout:**
   Lines 47, 64, and 73 similarly use `if (await contextTextarea.isVisible())`, `if (await addOptionBtn.isVisible())`, and `if (optionCount >= 1)`. If UI rendering regresses, the test suite passes green because the assertions are bypassed.
3. **Hydration Warning in SSR:**
   During the Playwright execution, Turbopack and React 19 logged server/client hydration mismatch warnings on `SettingsPage` regarding button styling attributes.

### 7.3 Critical Gap: Zero Test Coverage on Deterministic Engine

`lib/analysis/decision-analysis.ts` contains over 150 lines of core business logic (completion formulas, confidence deductions, contradictory state penalties, risk classifications, readiness states, and bias heuristics). **There is not a single unit test written for this engine in the entire codebase.**

---

## 8. Documentation Inconsistencies

A comprehensive comparison between documentation claims and the actual codebase revealed multiple notable discrepancies:

| Topic                           | Documentation Claim                                                                                                                                                    | Actual Codebase Implementation                                                                                                       | Discrepancy Severity |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| **Framework Version**           | `README.md` and `ARCHITECTURE.md` claim **"Next.js 15 (App Router)"**.                                                                                                 | `package.json` line 29 specifies `"next": "16.2.10"`. Build runs on Turbopack Next.js 16.                                            | Medium               |
| **Architecture Documentation**  | `docs/architecture/` contains 6 files (`AI.md`, `BACKEND.md`, `DATABASE.md`, `FRONTEND.md`, `SECURITY.md`, `SYSTEM.md`).                                               | Every file in this folder is an unwritten **13-line placeholder** containing only "Placeholder for...".                              | Medium               |
| **Storage Technology**          | `app/(marketing)/documentation/page.tsx` line 41 claims decisions are stored in **"IndexedDB/LocalStorage"**. `FINAL_RELEASE_AUDIT.md` mentions IndexedDB abstraction. | IndexedDB is **never initialized or referenced** in any source file. Only `Window.localStorage` is used.                             | Low                  |
| **AI Data Transmission**        | `app/settings/page.tsx` lines 194 & 213 claim: _"Your key is never sent to Astra's servers. It is used directly from your browser to the provider."_                   | API keys are sent directly to Astra's API routes (`/api/ai/chat` and `/api/ai/analyze`) in the `x-ai-key` header.                    | High                 |
| **Marketing FAQ Contradiction** | `app/(marketing)/page.tsx` line 288 FAQ: _"Does Astra use AI or LLMs to make decisions? No. Astra uses deterministic heuristic algorithms..."_                         | The hero banner reads _"Astra is your AI-powered decision intelligence platform"_ and the app includes OpenAI/Anthropic integration. | Medium               |
| **Pricing Tier Contradiction**  | `app/(marketing)/pricing/page.tsx` line 49 lists **"AI-assisted analysis"** as an Enterprise ($12/mo) "Coming Soon" feature.                                           | AI-assisted analysis is currently fully accessible in the core product under BYOK.                                                   | Low                  |
| **Sprint Report Claims**        | `D0032_AI_ARCHITECTURE_REPORT.md` claims `AIOrchestrator` seamlessly acts as the intermediary between `useChat` and `/api/ai/chat`.                                    | `AIOrchestrator` is never imported by `copilot-sidebar.tsx` or any other file.                                                       | High                 |

---

## 9. Critical Bugs

### Bug 1: Complete Loss of Decision Context in Copilot AI Chat

- **Severity:** Critical
- **Files Affected:** `app/api/ai/chat/route.ts` (lines 14, 26, 47–51), `components/workspace/copilot-sidebar.tsx` (lines 151–157)
- **Root Cause:**
  `copilot-sidebar.tsx` attaches a stringified `decisionContext` object to the JSON body sent by `DefaultChatTransport`. `app/api/ai/chat/route.ts` declares `decisionContext: z.string().optional()` in `ChatRequestSchema`. However, line 26 destructures only `{ messages, provider, system }`. `decisionContext` is ignored, and the system prompt given to `streamText` contains only the static string.
- **Impact:** The AI chat model is completely blind to the user's active decision, unable to answer questions regarding the goal, options, evidence, or constraints.

### Bug 2: Broken "Improve Goal" Suggestion & Action

- **Severity:** High
- **Files Affected:** `components/workspace/copilot-sidebar.tsx` (lines 447, 450–451), `app/workspace/page.tsx` (lines 310, 314, 316), `types/analysis.ts` (line 7)
- **Root Cause:**
  `GoalReviewSchema` in `types/analysis.ts` names the rewritten goal `improvedVersion`. Both `copilot-sidebar.tsx` and `app/workspace/page.tsx` expect `improvedGoal`.
  In `app/workspace/page.tsx`:
  ```tsx
  {inlineResult?.field === "goal" && inlineResult.data.improvedGoal && (
    <SuggestionPreview ... />
  )}
  ```
  Since `improvedGoal` is `undefined`, the suggestion preview never renders.
  In `copilot-sidebar.tsx`:
  ```tsx
  suggestion={(actionResult.improvedGoal as string) || (actionResult.recommendation as string) || JSON.stringify(actionResult, null, 2)}
  ```
  `actionResult.improvedGoal` is `undefined`, rendering raw JSON. The accept condition `if (actionResult.improvedGoal)` fails, making the "Accept" button completely unresponsive.
- **Impact:** The primary AI goal improvement action is broken across both the main canvas and the copilot sidebar.

### Bug 3: Bypassed Prompt Registry & Generic Fallback in `/api/ai/analyze`

- **Severity:** High
- **Files Affected:** `components/workspace/copilot-sidebar.tsx` (lines 81–89, 114–125), `app/workspace/page.tsx` (lines 123–133), `app/api/ai/analyze/route.ts` (line 60)
- **Root Cause:**
  The structured analysis caller in the UI makes direct fetch calls to `/api/ai/analyze` omitting the `system` property. Line 60 of `app/api/ai/analyze/route.ts` falls back to `system: system || "You are an expert decision intelligence analyst."`.
  Specialized prompt files (`GOAL_SYSTEM_PROMPT`, `BIAS_SYSTEM_PROMPT`, `TRADEOFF_SYSTEM_PROMPT`, etc.) are completely bypassed.
- **Impact:** Model analysis lacks domain-specific instructions (e.g., checking specific bias categories like Sunk Cost or Confirmation Bias), resulting in degraded output quality.

### Bug 4: Orphaned Ghost Code & 0-Byte Source Files

- **Severity:** Medium
- **Files Affected:**
  - `hooks/useAutosave.ts` (0 bytes)
  - `hooks/useLocalStorage.ts` (0 bytes)
  - `lib/animations.ts` (0 bytes)
  - `lib/constants.ts` (0 bytes)
  - `lib/validations.ts` (0 bytes)
  - `components/decision/ReviewPanel.tsx` (105 lines, orphaned)
  - `components/decision/DecisionStep.tsx` (16 lines, orphaned)
  - `components/decision/NavigationControls.tsx` (41 lines, orphaned)
  - `services/ai/orchestrator.ts` (55 lines, orphaned)
  - `services/ai/analysis.ts` (119 lines, orphaned)
  - `prompts/analysis.ts` (11 lines, orphaned)
  - `prompts/generators.ts` (9 lines, orphaned)
- **Root Cause:** Incomplete refactoring during sprints D-003.2 through D-003.5. New modules were stubbed or created without being wired into the UI tree, while legacy wizard components were left in place.
- **Impact:** Bloats repository complexity, creates maintenance overhead, and misleads future engineers.

---

## 10. Recommended Improvements

| Recommendation                                              | Category         | Priority     | Rationale                                                                                                                                                                        |
| :---------------------------------------------------------- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inject `decisionContext` into Chat System Prompt**        | Bug Fix          | **Critical** | Restore the primary value proposition of the AI Copilot by injecting serialized decision markdown into `streamText`.                                                             |
| **Align Goal Schema Field Names**                           | Bug Fix          | **High**     | Normalize `improvedVersion` in `GoalReviewSchema` with `improvedGoal` (or update consumer components) to fix the broken "Improve Goal" feature.                                  |
| **Connect Specialized System Prompts to `/api/ai/analyze`** | Architecture     | **High**     | Wire `services/ai/analysis.ts` or map prompts in `app/api/ai/analyze/route.ts` so structured outputs use their dedicated prompt engineering instructions.                        |
| **Add Unit Tests for `decision-analysis.ts`**               | Testing / QA     | **High**     | Establish comprehensive test coverage for completion scores, confidence penalties, contradictory states, and risk/readiness ratings.                                             |
| **Surface and Connect the 8 Personas**                      | Feature / Polish | **Medium**   | Add a persona selector in the Copilot UI and inject the selected persona instruction into the chat request.                                                                      |
| **Clean Up 0-Byte and Orphaned Files**                      | Hygiene          | **Medium**   | Remove empty files (`useAutosave.ts`, `useLocalStorage.ts`, etc.) and delete or repurpose orphaned components (`ReviewPanel.tsx`, `DecisionStep.tsx`, `NavigationControls.tsx`). |
| **Fix E2E Test Selectors and Remove Conditional Skips**     | Testing / QA     | **Medium**   | Update `'Ask Astra...'` to `'Ask AI Partner...'` and remove conditional `if (isVisible)` guards to prevent silent regression skips.                                              |
| **Reconcile Documentation and Privacy Claims**              | Documentation    | **Medium**   | Update `README.md` to reflect Next.js 16; correct `app/settings/page.tsx` to accurately describe the API proxy BYOK mechanism; write placeholder docs in `docs/architecture/`.   |
| **Implement Response Caching for Analysis**                 | Performance      | **Low**      | Utilize `lib/hash.ts` context hashing to cache structured analysis results in `localStorage` and prevent redundant LLM billing.                                                  |

---

## 11. Exact Files Requiring Changes

### File 1: `app/api/ai/chat/route.ts`

- **Priority:** **Critical**
- **Why It Is Necessary:** The chat model receives no information about the decision being discussed because `decisionContext` is discarded during destructuring.
- **Expected Behavior After Correction:** Line 26 should destructure `decisionContext`. Lines 50–51 should append `decisionContext` to the `system` prompt parameter passed to `streamText`:
  ```ts
  const fullSystem = `${system || "You are Astra, an elite executive decision-making partner."}\n\n${decisionContext ? `CURRENT DECISION CONTEXT:\n${decisionContext}` : ""}`;
  ```
- **How It Should Be Tested:** Unit test with mocked `streamText` verifying `system` prompt contains decision title, goal, and options; E2E test verifying AI answers questions about active canvas options.

### File 2: `components/workspace/copilot-sidebar.tsx`

- **Priority:** **High**
- **Why It Is Necessary:**
  1. Lines 447 & 450 reference `actionResult.improvedGoal`, which does not exist on `GoalReview` (the field is `improvedVersion`), preventing goal preview and acceptance.
  2. Lines 81–89 & 114–125 execute direct `fetch` without `system` prompts.
  3. Uses hardcoded system instruction and lacks persona selection.
- **Expected Behavior After Correction:**
  1. Change `actionResult.improvedGoal` to `(actionResult.improvedVersion as string) || (actionResult.improvedGoal as string)`.
  2. Provide persona selector state and pass selected persona prompt.
  3. Pass appropriate system prompt or use `services/ai/analysis.ts`.
- **How It Should Be Tested:** Click "Improve Goal" in Copilot tools, verify formatted preview appears with score/rationale, click "Accept", and verify `decision.goal` in canvas is updated.

### File 3: `app/workspace/page.tsx`

- **Priority:** **High**
- **Why It Is Necessary:** Lines 310, 314, and 316 check `inlineResult.data.improvedGoal`, which is undefined because the API returns `improvedVersion`. The inline "Improve" suggestion never displays.
- **Expected Behavior After Correction:** Check and read `inlineResult.data.improvedVersion || inlineResult.data.improvedGoal`.
- **How It Should Be Tested:** Click inline "Improve" on the Goal card with valid API key; verify `SuggestionPreview` renders; click "Accept" and verify goal textarea updates.

### File 4: `app/api/ai/analyze/route.ts`

- **Priority:** **High**
- **Why It Is Necessary:** When callers omit `system`, the route defaults to a generic string, ignoring all prompts written in `prompts/*.ts`.
- **Expected Behavior After Correction:** Implement a server-side default prompt map:
  ```ts
  const defaultPromptMap: Record<string, string> = {
    goal: GOAL_SYSTEM_PROMPT,
    bias: BIAS_SYSTEM_PROMPT,
    risk: RISKS_SYSTEM_PROMPT,
    tradeoff: TRADEOFF_SYSTEM_PROMPT,
    alternative: ALTERNATIVES_SYSTEM_PROMPT,
    executive: EXECUTIVE_SYSTEM_PROMPT,
    recommendation: RECOMMENDATION_SYSTEM_PROMPT,
  };
  ```
  And use `system: system || defaultPromptMap[type] || "You are an expert decision intelligence analyst."`.
- **How It Should Be Tested:** Trigger each analysis type with empty `system` header and verify returned object adheres to specialized prompt instructions.

### File 5: `tests/analysis.test.ts` (New File to Create)

- **Priority:** **High**
- **Why It Is Necessary:** `lib/analysis/decision-analysis.ts` has zero tests, leaving the core mathematical engine vulnerable to unnoticed regressions.
- **Expected Behavior After Correction:** Comprehensive unit test suite covering:
  - Completion score calculation for empty, partial, and full decisions.
  - Confidence score with bonuses and deductions.
  - Contradictory state penalty ($>60$ confidence with $0$ evidence).
  - Risk level transitions (High, Medium, Low).
  - Readiness state transitions (Not Ready, Needs Work, Ready).
  - Bias heuristics (Single-option, confirmation bias, choice overload).
- **How It Should Be Tested:** Run `pnpm test` and verify all test cases pass.

### File 6: `tests/e2e/core-workflow.spec.ts`

- **Priority:** **Medium**
- **Why It Is Necessary:** Line 78 uses `'Ask Astra...'` instead of `'Ask AI Partner...'`, causing the chat check to be skipped due to conditional `if`. Conditional wrappers throughout allow silent regression skips.
- **Expected Behavior After Correction:** Replace placeholder with `'Ask AI Partner...'`, remove conditional guards, and require strict visibility assertions.
- **How It Should Be Tested:** Run `pnpm exec playwright test` and ensure all assertions execute.

### File 7: `app/settings/page.tsx` & `README.md`

- **Priority:** **Medium**
- **Why It Is Necessary:** Privacy claims falsely state that API keys never touch Astra's servers. Documentation claims Next.js 15 instead of Next.js 16.
- **Expected Behavior After Correction:** Clarify that keys are stored locally in the browser and transmitted via proxy headers (`x-ai-key`) to Next.js API routes without backend database persistence. Update Next.js version to 16.
- **How It Should Be Tested:** Review rendered text on `/settings` and verify documentation accuracy.

### File 8: Cleanup of 0-Byte and Orphaned Files

- **Priority:** **Low**
- **Files:** `hooks/useAutosave.ts`, `hooks/useLocalStorage.ts`, `lib/animations.ts`, `lib/constants.ts`, `lib/validations.ts`, `components/decision/ReviewPanel.tsx`, `components/decision/DecisionStep.tsx`, `components/decision/NavigationControls.tsx`, `prompts/analysis.ts`, `prompts/generators.ts`.
- **Why It Is Necessary:** Eliminates dead code and empty stubs.
- **Expected Behavior After Correction:** Files either populated with intended shared logic or deleted.
- **How It Should Be Tested:** `pnpm build` and `pnpm lint` pass with zero errors.

---

## 12. Commands Executed and Their Actual Results

Every check below was executed directly in the project environment during this audit session:

### Command 1: Unit Test Suite Execution

```bash
pnpm test
```

- **Exit Code:** `0`
- **Timestamp:** `2026-11-20T18:26:47`
- **Duration:** 4.26s
- **Output:**

  ```
  $ vitest run
   RUN  v4.1.10 C:/Development/astra

   ✓ tests/ai.test.ts (3 tests) 7ms
   ✓ tests/workspace.test.ts (7 tests) 11ms

   Test Files  2 passed (2)
        Tests  10 passed (10)
  ```

- **Analysis:** All 10 existing unit tests passed. However, these only test `AIProviderService` and `DecisionRepository`. Zero unit tests exist for `decision-analysis.ts`.

### Command 2: ESLint Code Linter Execution

```bash
pnpm lint
```

- **Exit Code:** `0`
- **Timestamp:** `2026-11-20T18:27:11`
- **Output:**

  ```
  $ eslint

  C:\Development\astra\app\(marketing)\page.tsx
    4:10  warning  'Button' is defined but never used          @typescript-eslint/no-unused-vars
    4:18  warning  'buttonVariants' is defined but never used  @typescript-eslint/no-unused-vars

  ✖ 2 problems (0 errors, 2 warnings)
  ```

- **Analysis:** Linter succeeded with 0 errors and 2 unused variable warnings in the marketing page.

### Command 3: Next.js Production Build

```bash
pnpm build
```

- **Exit Code:** `0`
- **Timestamp:** `2026-11-20T18:27:58`
- **Output:**

  ```
  $ next build
  ▲ Next.js 16.2.10 (Turbopack)

    Creating an optimized production build ...
  ✓ Compiled successfully in 22.1s
    Running TypeScript ...
    Finished TypeScript in 13.7s ...
    Collecting page data using 3 workers ...
  ⚠ Using edge runtime on a page currently disables static generation for that page
    Generating static pages using 3 workers (15/15) in 1286ms
    Finalizing page optimization ...

  Route (app)
  ┌ ○ /
  ├ ○ /_not-found
  ├ ƒ /api/ai/analyze
  ├ ƒ /api/ai/chat
  ├ ○ /archive
  ├ ○ /dashboard
  ├ ○ /documentation
  ├ ○ /features
  ├ ○ /pricing
  ├ ○ /robots.txt
  ├ ○ /settings
  ├ ○ /sitemap.xml
  ├ ○ /timeline
  └ ○ /workspace

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```

- **Analysis:** Production compilation succeeded with Turbopack and TypeScript checking in 37.1s. All 13 static pages and 2 dynamic API routes compiled cleanly.

### Command 4: Playwright End-to-End Test Suite

```bash
pnpm exec playwright test
```

- **Exit Code:** `0`
- **Timestamp:** `2026-11-20T18:37:14`
- **Duration:** 1.4m
- **Output:**
  ```
  [WebServer] $ next dev
  Running 1 test using 1 worker
  [1/1] [chromium] › tests\e2e\core-workflow.spec.ts:4:7 › Astra Core Workflow › Complete decision workflow
  [WebServer] [browser] A tree hydrated but some attributes of the server rendered HTML didn't match the client properties... https://react.dev/link/hydration-mismatch
    1 passed (1.4m)
  ```
- **Analysis:** Test passed, but server logged an SSR hydration mismatch warning on `SettingsPage` button styling, and internal inspection revealed that critical chat assertions were conditionally skipped due to placeholder mismatch.

---

_This technical audit report is finalized and ready for planning remediation work and drafting the academic project report._
