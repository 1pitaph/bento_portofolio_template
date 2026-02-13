# components/animations/

Third-party animation components sourced from [reactbits.dev](https://reactbits.dev). These are vendored as `.jsx` files (with accompanying `.css` and `.d.ts` files) because they rely on specific peer dependencies.

## Contents

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| `FallingText` | Physics-based text drop using Matter.js. Each character becomes a rigid body that falls under gravity when triggered. | `matter-js` |
| `RotatingText` | Carousel-style text rotator using Framer Motion. Cycles through an array of strings on an interval. | `framer-motion` |

## Usage

```ts
import RotatingText from "@/components/animations/RotatingText";
import FallingText from "@/components/animations/FallingText";
```

## Important

These files are intentionally **not** converted to TypeScript to preserve their original behaviour. Avoid modifying them unless you are upgrading to a newer version from the upstream source. Type declarations are provided via the `.d.ts` sidecar files.

## Source

Originally from `components/ReactBits/`. Renamed to `components/animations/` to use a semantic, vendor-neutral name.
