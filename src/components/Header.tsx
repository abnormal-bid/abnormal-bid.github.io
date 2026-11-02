"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { linksFor, type Lang } from "@/data/site";
import { localePath, switchPath } from "@/i18n/paths";
import type { Copy } from "@/i18n/types";
import { Icon } from "./Icon";
import { ThemePicker } from "./ThemePicker";
import styles from "./Header.module.css";

export function Header({
  lang,
  brand,
  copy,
  themeCopy,
  langToggle,
}: {
  lang: Lang;
  /** Brand 是服务端组件，从布局传进来，避免把两种语言的文案打进浏览器脚本。 */
  brand: ReactNode;
  copy: Copy["header"];
  themeCopy: Copy["theme"];
  langToggle: Copy["langToggle"];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const closeMenu = () => setMenuOpen(false);

  const links = linksFor(lang);
  const nav = copy.nav.map(({ anchor, label }) => ({ href: localePath(lang, `/#${anchor}`), label }));
  const other = lang === "zh" ? "en" : "zh";
  const otherHtmlLang = other === "en" ? "en" : "zh-CN";
  const otherPath = switchPath(pathname.endsWith("/") ? pathname : `${pathname}/`, other);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    desktop.addEventListener("change", onDesktopChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
      desktop.removeEventListener("change", onDesktopChange);
    };
  }, [menuOpen]);

  return (
    <header className={styles.siteHeader} ref={header}>
      <div className={`page-shell ${styles.headerInner}`}>
        {brand}
        <nav className={styles.desktopNav} aria-label={copy.navLabel}>
          {nav.map(({ href, label }) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerActions}>
          {/* 两种语言各有一个根布局，切换时本来就是整页加载，不用 next/link。 */}
          <a
            className={styles.langToggle}
            href={otherPath}
            hrefLang={otherHtmlLang}
            lang={otherHtmlLang}
            aria-label={langToggle.aria}
            title={langToggle.aria}
          >
            {langToggle.label}
          </a>
          <ThemePicker copy={themeCopy} onOpen={closeMenu} />
          <span className={styles.headerDivider} aria-hidden="true"></span>
          <a className={styles.headerLogin} href={links.webmail}>
            {copy.login}
          </a>
          <a className={`btn btn-primary ${styles.headerCta}`} href={links.shop}>
            {copy.buy} <Icon name="up-right" className="size-3.5" />
          </a>
          <button
            className={`icon-button ${styles.menuToggle}`}
            type="button"
            ref={toggle}
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <nav className={styles.mobileNav} id="mobile-nav" aria-label={copy.mobileNavLabel} hidden={!menuOpen}>
        <div className={`page-shell ${styles.mobileNavInner}`}>
          {nav.map(({ href, label }, index) => (
            <Link href={href} key={href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {label}
              <Icon name="up-right" className="size-4" />
            </Link>
          ))}
          <div className={styles.mobileNavActions}>
            <a className="btn btn-primary" href={links.shop} onClick={closeMenu}>
              {copy.buy} <Icon name="up-right" className="size-4" />
            </a>
            <a className="btn btn-outline" href={links.redeem} onClick={closeMenu}>
              {copy.haveCode} <Icon name="up-right" className="size-4" />
            </a>
            <a className="btn btn-outline" href={links.webmail} onClick={closeMenu}>
              {copy.loginWebmail} <Icon name="up-right" className="size-4" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
