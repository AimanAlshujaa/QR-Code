declare module "lucide-react" {
  import { FC, SVGProps } from "react"
  type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string
    strokeWidth?: number | string
    absoluteStrokeWidth?: boolean
  }
  type Icon = FC<IconProps>
  export const ArrowLeftRight: Icon
  export const BarChart3: Icon
  export const Bell: Icon
  export const BrainCircuit: Icon
  export const CheckCircle2: Icon
  export const ChevronDown: Icon
  export const Database: Icon
  export const Download: Icon
  export const ExternalLink: Icon
  export const FileText: Icon
  export const Fingerprint: Icon
  export const Flame: Icon
  export const Globe2: Icon
  export const Languages: Icon
  export const Layers3: Icon
  export const LockKeyhole: Icon
  export const MapPin: Icon
  export const MonitorSmartphone: Icon
  export const Network: Icon
  export const Play: Icon
  export const Presentation: Icon
  export const QrCode: Icon
  export const Radar: Icon
  export const Route: Icon
  export const ShieldCheck: Icon
  export const Smartphone: Icon
  export const Sparkles: Icon
  export const Users: Icon
  export const Zap: Icon
}
