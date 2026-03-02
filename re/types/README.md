# types/

Centralised TypeScript type definitions for the entire portfolio project.

## Contents

| File | Description |
|------|-------------|
| `index.ts` | All shared types: `SiteData`, `HeroData`, `SkillsData`, `AboutData`, `ContactEntry`, `Project`, `ProjectCategory` |

## Usage

```ts
import type { SiteData, Project } from "@/types";
```

## Migration note

These types were previously located at `data/types.ts` and imported via `@/data/types`. That path is now **removed**. Update any legacy imports to use `@/types`.
