"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Copy, IconName } from "@/i18n/types";
import { fillTemplate } from "@/lib/template";
import { Icon } from "./Icon";

type Preference = "system" | "light" | "dark";

const icons: Record<Preference, IconName> = { system: "monitor", light: "sun", dark: "moon" };
const preferences = Object.keys(icons) as Preference[];

// window.abnormalTheme 由头部的 theme-init.js 在水合之前写好；静态 HTML 一律按「跟随系统」输出。
function subscribe(onChange: () => void) {
  window.addEventListener("abnormal:themechange", onChange);
  return () => window.removeEventListener("abnormal:themechange", onChange);
}
const getPreference = () => window.abnormalTheme.getPreference();
const getServerPreference = (): Preference => "system";

export function ThemePicker({ copy, onOpen }: { copy: Copy["theme"]; onOpen?: () => void }) {
  const preference = useSyncExternalStore(subscribe, getPreference, getServerPreference);
  const current = copy.options[preference];

  return (
    <DropdownMenu
      modal={false}
      onOpenChange={(open) => {
        if (open) onOpen?.();
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          aria-label={fillTemplate(copy.ariaTemplate, { label: current }).join("")}
          title={fillTemplate(copy.titleTemplate, { label: current }).join("")}
        >
          <Icon name={icons[preference]} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-44">
        <DropdownMenuLabel>{copy.title}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference}
          onValueChange={(value) => window.abnormalTheme.setPreference(value as Preference)}
        >
          {preferences.map((value) => (
            <DropdownMenuRadioItem value={value} key={value}>
              <Icon name={icons[value]} className="size-4" />
              {copy.options[value]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
