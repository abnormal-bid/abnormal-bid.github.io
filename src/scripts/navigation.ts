import { requiredElement } from "./dom";

export function initializeNavigation() {
  const toggle = requiredElement<HTMLButtonElement>(".menu-toggle");
  const nav = requiredElement<HTMLElement>("#mobile-nav");
  const desktop = window.matchMedia("(min-width: 768px)");

  function closeMenu() {
    nav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "展开导航");
  }

  toggle.addEventListener("click", () => {
    const opening = nav.hidden;
    nav.hidden = !opening;
    toggle.setAttribute("aria-expanded", String(opening));
    toggle.setAttribute("aria-label", opening ? "收起导航" : "展开导航");
  });
  nav
    .querySelectorAll("a, button")
    .forEach((item) => item.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !nav.hidden) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Element &&
      !event.target.closest(".site-header")
    )
      closeMenu();
  });
  desktop.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}
