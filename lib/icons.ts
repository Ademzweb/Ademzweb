import {
  Search,
  Target,
  Globe,
  Code,
  Network,
  Cloud,
  ClipboardCheck,
  ShieldCheck,
  Siren,
  GraduationCap,
  Award,
  Zap,
  Lock,
  DollarSign,
  Cpu,
  Puzzle,
  Mail,
  Phone,
  MapPin,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps icon name strings from content files to Lucide React components.
 * When adding a new icon in content files, add it here too.
 * Browse icons at: https://lucide.dev/icons
 */
const iconMap: Record<string, LucideIcon> = {
  Search,
  Target,
  Globe,
  Code,
  Network,
  Cloud,
  ClipboardCheck,
  ShieldCheck,
  Siren,
  GraduationCap,
  Award,
  Zap,
  Lock,
  DollarSign,
  Cpu,
  Puzzle,
  Mail,
  Phone,
  MapPin,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? ShieldCheck;
}

export { iconMap };
