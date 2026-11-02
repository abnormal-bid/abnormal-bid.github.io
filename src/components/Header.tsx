"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import { InquiryButton } from "./InquiryDialog";
import { ThemePicker } from "./ThemePicker";
import styles from "./Header.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setMenuOpen(false);
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
        <Brand />
        <nav className={styles.desktopNav} aria-label="主导航">
          {navigation.map(({ href, label }) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <ThemePicker onOpen={closeMenu} />
          <span className={styles.headerDivider} aria-hidden="true"></span>
          <InquiryButton className={`btn btn-primary ${styles.headerInquiry}`}>
            咨询邮箱 <Icon name="up-right" className="size-3.5" />
          </InquiryButton>
          <button
            className={`icon-button ${styles.menuToggle}`}
            type="button"
            ref={toggle}
            aria-label={menuOpen ? "收起导航" : "展开导航"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <nav
        className={styles.mobileNav}
        id="mobile-nav"
        aria-label="移动端导航"
        hidden={!menuOpen}
      >
        <div className={`page-shell ${styles.mobileNavInner}`}>
          {navigation.map(({ href, label }, index) => (
            <Link href={href} key={href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {label}
              <Icon name="up-right" className="size-4" />
            </Link>
          ))}
          <InquiryButton className="btn btn-primary" onClick={closeMenu}>
            咨询邮箱 <Icon name="up-right" className="size-4" />
          </InquiryButton>
        </div>
      </nav>
    </header>
  );
}
