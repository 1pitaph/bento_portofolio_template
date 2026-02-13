# components/layouts/

Top-level layout components that compose the portfolio's page structure. These are pure React client components (not Next.js route segments).

## Component hierarchy

```
app/page.tsx  (server component, fetches data)
└── ClientLayout  (client boundary, owns expandedSection state)
    ├── MobileLayout   (block md:hidden)
    └── LaptopLayout   (hidden md:block)
```

## Contents

| Component | Description |
|-----------|-------------|
| `ClientLayout` | Top-level client component. Owns `expandedSection` state shared between both layout trees. Both trees are always mounted (show/hide via Tailwind) to preserve state across breakpoint changes. |
| `LaptopLayout` | Four-panel resizable bento grid for `md` and above. Panels are separated by independently draggable dividers with LERP damping. Entry animation driven by `useEntryAnimation`. Expanded overlays use `ExpandedOverlay` with clip-path transitions. |
| `MobileLayout` | Single-column scrollable layout for below `md`. Sections stack vertically with the same expanded overlay mechanism. |

## Usage

`ClientLayout` is loaded by `app/page.tsx` only:

```ts
import ClientLayout from "@/components/layouts/ClientLayout";
```

`LaptopLayout` and `MobileLayout` are internal to `ClientLayout` and should not be imported elsewhere.
