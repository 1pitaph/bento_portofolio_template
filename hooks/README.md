# hooks/

Root-level custom React hooks following the [shadcn/ui](https://ui.shadcn.com) convention of placing hooks at the project root rather than inside `components/`.

## Contents

| Hook | Description |
|------|-------------|
| `useResizablePanels` | Manages drag state and LERP-animated sizes for the four resizable panels in `LaptopLayout`. Returns `sizes`, `isDragging`, and `handleMouseDown`. |
| `useEntryAnimation` | Drives the sequential GSAP entry animation: border lines draw in first, then content fades up. Accepts refs for four line elements and five content containers. |

## Usage

```ts
import { useResizablePanels, useEntryAnimation } from "@/hooks";
```

## Details

### `useResizablePanels(containerRef)`

- **`containerRef`** — Ref to the outer `<div>` used to convert absolute mouse coordinates to percentages.
- **`sizes`** — Current rendered panel sizes (percentages). See `PanelSizes` type.
- **`isDragging`** — Which divider is active (`"horizontal-main"` | `"vertical-top"` | `"vertical-bottom"` | `"horizontal-bottom-right"` | `null`).
- **`handleMouseDown(divider)`** — Factory that returns a `mousedown` handler for a given divider type.

Panel constraints and defaults live in `@/lib/constants`.

### `useEntryAnimation({ lines, content })`

Runs once on mount. Sequence:
1. Lines scale from 0 → 1 (`scaleX` / `scaleY`) with staggered timing via GSAP.
2. Content elements fade up (`y: 20 → 0`, `opacity: 0 → 1`) with further stagger.
