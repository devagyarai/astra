# Decision Framework Report (Capability D-001)

## Executive Summary
The Decision Workspace has been successfully transformed into a robust, guided 6-step multi-stage framework. By redesigning the interaction model, we enforce structured thinking while adhering strictly to the local-first, zero-backend architectural constraints.

## Architecture Decisions
- **State Granularity:** Kept the `currentStep` UI state isolated within `page.tsx`. This avoids polluting the domain-level `useDecision.ts` hook with ephemeral view constraints while keeping the persistence engine clean.
- **Progressive Validation Blockades:** Implemented strict gatekeeping (`canProceedToNext()`). A user is mathematically prevented from accessing step N+1 unless the required constraints of step N are fulfilled. Step 6 (Review) cannot be accessed directly without all preceding prerequisites.
- **Component Decomposition:** Broken down the monolithic form into highly focused, single-responsibility components in `components/decision/` to allow for independent scaling.

## New Components Created
1. `components/decision/DecisionStep.tsx`: A lightweight `framer-motion` wrapper that enforces consistent 220ms ease-out enter/exit transitions for all stages.
2. `components/decision/DecisionProgress.tsx`: A semantic horizontal progress bar tracking completion depth.
3. `components/decision/NavigationControls.tsx`: Standardized Previous/Next interactive buttons enforcing navigation constraints.
4. `components/decision/ReviewPanel.tsx`: A read-only compilation surface dynamically reflecting the active `Decision` model state, complete with granular "Edit" callbacks to return to the relevant stage.

## Files Modified
- `app/workspace/page.tsx`: Entirely rewritten. The static grid composition was replaced with conditional step rendering tied to `currentStep`, integrating the new domain components.

## UX Rationale
- **Cognitive Load Reduction:** Presenting all forms simultaneously caused vertical scrolling fatigue. The stepper forces singularity of focus, optimizing user throughput.
- **Inertia:** The 220ms motion curve gives the illusion of physical cards sliding in, maintaining the 60% Apple, 25% Linear design DNA requested in Astra Style v1.
- **No Dead Ends:** The Review step explicitly offers `Edit` buttons linked backwards so the user isn't forced to hit "Previous" five times to fix a typo.

## Future AI Integration Points
- **Step 4 (Options):** When AI is integrated, a subtle "Suggest Options" ghost button can hook into the LLM orchestration layer to pre-fill the dynamic list.
- **Step 6 (Review):** The final step provides the perfect surface area for a "Synthesize Recommendation" CTA, where the AI can read the entire local context payload and stream its analysis.
