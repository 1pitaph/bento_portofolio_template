import {
  BrainCircuit,
  PenTool,
  BookOpen,
  BarChart3,
  Wand2,
  Code2,
  LayoutGrid,
  Waves,
  Bird,
  Mountain,
  LayoutDashboard,
  Camera,
  Building2,
  Building,
  Anchor,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<LucideProps>> = {
  BrainCircuit,
  PenTool,
  BookOpen,
  BarChart3,
  Wand2,
  Code2,
  LayoutGrid,
  Waves,
  Bird,
  Mountain,
  LayoutDashboard,
  Camera,
  Building2,
  Building,
  Anchor,
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
