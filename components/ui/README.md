# components/ui/

Reusable UI primitives following the [shadcn/ui](https://ui.shadcn.com) convention. Components here are layout-agnostic and can be composed inside any section or page.

## Contents

| Component | Description |
|-----------|-------------|
| `CloseButton` | Small SVG × button used to dismiss an expanded overlay. |
| `ExpandedOverlay` | Full-screen overlay that animates in/out with a Framer Motion clip-path transition, creating the illusion of expanding from the source panel. |
| `ProjectCard` | Displays a single project with cover image, title, and tech-stack badges. Uses `next/image`. |
| `SectionHeadingClickable` | Section heading that doubles as an expand/collapse toggle button; renders an arrow indicator. |

## Usage

```ts
import { CloseButton, ExpandedOverlay, ProjectCard, SectionHeadingClickable } from "@/components/ui";
```

Or import individually:

```ts
import ExpandedOverlay from "@/components/ui/ExpandedOverlay";
```

## shadcn compatibility

This directory mirrors shadcn's `components/ui/` convention so that shadcn components can be added here alongside project-specific primitives without restructuring.

## Migration note

These components were previously located at `components/sections/ui/`. `SectionHeading_Clickable` has been renamed to `SectionHeadingClickable` (camelCase, no underscore).
