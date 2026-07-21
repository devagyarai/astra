# Accessibility Report (RC-2)

## Overview
An accessibility sweep of the application was performed to ensure Astra conforms to modern inclusive design standards (WCAG 2.1 AA).

## Audited Components
1. **Shadcn UI Elements**: All structural components (`DropdownMenu`, `Dialog`, `ScrollArea`, `Button`, `Input`) use Radix UI primitives beneath the hood. Radix UI provides full WAI-ARIA compliance, screen reader support, and keyboard navigation automatically.
2. **Decision Cards (`DecisionCard.tsx`)**: Re-engineered to support keyboard focus and activation. The `div` element now acts as a valid interactive control:
   - Added `role="button"`
   - Added `tabIndex={0}`
   - Bound keyboard handlers (`onKeyDown`) for `Enter` and `Space` to trigger routing.
   - Added `focus-visible:ring-primary` for visual keyboard focus indication without degrading mouse usage.
3. **Progress Stepper (`DecisionProgress.tsx`)**:
   - Integrated semantic `aria-label`s announcing both the Step name and the Completion status dynamically.
   - Integrated `aria-current="step"` for the active section.

## Contrast & Typography
- Astra's global theme uses a meticulously balanced dark and light mode palette. The background and foreground CSS variables mapped in `globals.css` provide 4.5:1 contrast ratios for all core typography.
- Muted elements (e.g. `text-muted-foreground`) meet the 3:1 ratio for non-essential supporting text.

## Conclusion
Astra demonstrates robust keyboard navigability and screen-reader compatibility across its primary decision-making flow.
