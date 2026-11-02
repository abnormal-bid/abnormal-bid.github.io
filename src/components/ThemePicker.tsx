"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { Copy, IconName } from "@/i18n/types";
import { Icon } from "./Icon";
import styles from "./ThemePicker.module.css";

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
  const picker = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const current = copy.options[preference];

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (picker.current && event.target instanceof Node && !picker.current.contains(event.target))
        picker.current.open = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && picker.current?.open) {
        picker.current.open = false;
        summary.current?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details
      className={styles.themePicker}
      ref={picker}
      onToggle={(event) => {
        if (event.currentTarget.open) onOpen?.();
      }}
    >
      <summary
        className={`icon-button ${styles.themeToggle}`}
        ref={summary}
        aria-label={copy.ariaTemplate.replace("{label}", current)}
        title={copy.titleTemplate.replace("{label}", current)}
      >
        {preferences.map((value) => (
          <span key={value} hidden={value !== preference}>
            <Icon name={icons[value]} />
          </span>
        ))}
      </summary>
      <fieldset className={styles.themeMenu}>
        <legend className="sr-only">{copy.title}</legend>
        <div className={styles.themeMenuTitle} aria-hidden="true">
          {copy.title}
        </div>
        {preferences.map((value) => (
          <label className={styles.themeOption} key={value}>
            <input
              className="sr-only"
              type="radio"
              name="theme"
              value={value}
              checked={value === preference}
              onChange={() => window.abnormalTheme.setPreference(value)}
            />
            <Icon name={icons[value]} className="size-4" />
            <span>{copy.options[value]}</span>
            <Icon name="check" className="theme-check ml-auto size-3.5" />
          </label>
        ))}
      </fieldset>
    </details>
  );
}
