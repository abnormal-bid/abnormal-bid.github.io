"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./ThemePicker.module.css";

type Preference = "system" | "light" | "dark";

const options: { value: Preference; label: string; icon: IconName }[] = [
  { value: "system", label: "跟随系统", icon: "monitor" },
  { value: "light", label: "浅色模式", icon: "sun" },
  { value: "dark", label: "深色模式", icon: "moon" },
];

// window.abnormalTheme 由头部的 theme-init.js 在水合之前写好；静态 HTML 一律按「跟随系统」输出。
function subscribe(onChange: () => void) {
  window.addEventListener("abnormal:themechange", onChange);
  return () => window.removeEventListener("abnormal:themechange", onChange);
}
const getPreference = () => window.abnormalTheme.getPreference();
const getServerPreference = (): Preference => "system";

export function ThemePicker({ onOpen }: { onOpen?: () => void }) {
  const preference = useSyncExternalStore(
    subscribe,
    getPreference,
    getServerPreference,
  );
  const picker = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const label = options.find(({ value }) => value === preference)?.label;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        picker.current &&
        event.target instanceof Node &&
        !picker.current.contains(event.target)
      )
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
        aria-label={`切换主题，当前${label}`}
        title={`主题：${label}`}
      >
        {options.map(({ value, icon }) => (
          <span key={value} hidden={value !== preference}>
            <Icon name={icon} />
          </span>
        ))}
      </summary>
      <fieldset className={styles.themeMenu}>
        <legend className="sr-only">外观主题</legend>
        <div className={styles.themeMenuTitle} aria-hidden="true">
          外观主题
        </div>
        {options.map(({ value, label, icon }) => (
          <label className={styles.themeOption} key={value}>
            <input
              className="sr-only"
              type="radio"
              name="theme"
              value={value}
              checked={value === preference}
              onChange={() => window.abnormalTheme.setPreference(value)}
            />
            <Icon name={icon} className="size-4" />
            <span>{label}</span>
            <Icon name="check" className="theme-check ml-auto size-3.5" />
          </label>
        ))}
      </fieldset>
    </details>
  );
}
