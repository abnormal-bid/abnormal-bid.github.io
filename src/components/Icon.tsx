import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookIcon,
  CheckIcon,
  CopyIcon,
  MailIcon,
  MenuIcon,
  MessageCircleMoreIcon,
  MonitorIcon,
  MoonIcon,
  PlusIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SparkleIcon,
  SunIcon,
  TicketIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/i18n/types";
import { cn } from "@/lib/utils";

const icons: Record<IconName, LucideIcon> = {
  arrow: ArrowRightIcon,
  "up-right": ArrowUpRightIcon,
  check: CheckIcon,
  plus: PlusIcon,
  close: XIcon,
  menu: MenuIcon,
  shield: ShieldCheckIcon,
  chat: MessageCircleMoreIcon,
  spark: SparkleIcon,
  copy: CopyIcon,
  sun: SunIcon,
  moon: MoonIcon,
  monitor: MonitorIcon,
  cart: ShoppingCartIcon,
  ticket: TicketIcon,
  mail: MailIcon,
  book: BookIcon,
};

/** 文案里按名字选图标（入口卡片、流程步骤），所以这里保留一层名字到 lucide 图标的映射。 */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Glyph = icons[name];
  return <Glyph className={cn("size-5 shrink-0", className)} strokeWidth={1.6} aria-hidden="true" focusable="false" />;
}
