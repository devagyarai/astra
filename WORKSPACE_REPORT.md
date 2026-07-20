# Astra Decision Workspace — Capability C-001 (Slice 1)

## Architecture Overview
The visual shell for the primary Decision Workspace has been successfully implemented using Next.js 15 (App Router) and the Astra Style v1.0 design system. The workspace utilizes a resilient 3-column layout structure on desktop, seamlessly degrading to a collapsible sidebar on tablet, and a drawer-based interaction on mobile.

## Components Implemented

### 1. Left Sidebar (`components/workspace/sidebar-left.tsx`)
- Constructed using the `shadcn/ui` Sidebar primitive for guaranteed responsiveness.
- Features a prominent primary "New Decision" CTA.
- Primary navigation links: Dashboard, Decisions (Active), Timeline, Archive.
- Fixed bottom module for Settings.
- Styling integrates deeply with the `.dark` theme tokens (`bg-background/50 backdrop-blur-xl`).

### 2. Main Workspace (`app/workspace/page.tsx`)
- Central area acting as the focal point for decision-making.
- Demonstrates a placeholder "Project Titan Migration" decision.
- Designed with a grid layout utilizing reusable `DecisionCard` components with consistent internal padding and subtle icon typography.
- Built-in Framer Motion orchestrations (`staggerChildren` and `fade-up`) introduce elements with a luxurious 220ms ease-out curve.
- Integrated Sections:
  - **Goal** (Full width)
  - **Context** & **Constraints** (Split)
  - **Options** (Highlighted recommended option)
  - **Evidence** & **AI Analysis**
  - **Recommendation** (Prominent full-width CTA block with primary gradient accents)
  - **Notes**

### 3. Right Insights Panel (`components/workspace/sidebar-right.tsx`)
- A 320px contextual side-panel that disappears gracefully on smaller viewports.
- Integrates specialized data-display widgets:
  - **Confidence Score**: Utilizing a customized `Progress` bar.
  - **Key Risks**: Contextual warning block using the `--warning` semantic token.
  - **Missing Information**: Unordered list with muted typographic hierarchy.
  - **Suggested Next Step**: Actionable block prompting the user.

## Technical Notes
- **Zero Business Logic:** The implementation remains strictly visual as requested. No API integrations, state management (beyond UI interactions), or database calls were included.
- **Accessibility:** Maintains full keyboard navigation and semantic structure through `shadcn` primitives (`TooltipProvider`, `SidebarProvider`).
- **Validation:** Successfully passes strict TypeScript compiler checks and `pnpm lint`.
