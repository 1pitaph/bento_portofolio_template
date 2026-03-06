import {
  BrainCircuit,
  Workflow,
  PenTool,
  Server,
  BookOpen,
  BarChart3,
  Wand2,
  Code2,
  LayoutGrid,
  Waves,
  Bird,
  Mountain,
  LayoutDashboard,
  TreePine,
  Camera,
  Building2,
  Building,
  Anchor,
  Link,
  Palette,
  Smartphone,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<LucideProps>> = {
  BrainCircuit,
  Workflow,
  PenTool,
  Server,
  BookOpen,
  BarChart3,
  Wand2,
  Code2,
  LayoutGrid,
  Waves,
  Bird,
  Mountain,
  LayoutDashboard,
  TreePine,
  Camera,
  Building2,
  Building,
  Anchor,
  Link,
  Palette,
  Smartphone,
};

export function WorkIcon({
  name,
  size,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name];
  if (!Icon) return <span>{name}</span>;
  return <Icon size={size} className={className} strokeWidth={1.5} />;
}
