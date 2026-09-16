export function initializeThemePicker() {
  const picker = document.querySelector<HTMLDetailsElement>(
    "[data-theme-picker]",
  );
  const summary = picker?.querySelector("summary");
  if (!picker || !summary) return;

  const labels = { system: "跟随系统", light: "浅色模式", dark: "深色模式" };
  const syncPicker = () => {
    const preference = window.abnormalTheme.getPreference();
    picker
      .querySelectorAll<HTMLInputElement>('input[name="theme"]')
      .forEach((input) => {
        input.checked = input.value === preference;
      });
    picker
      .querySelectorAll<HTMLElement>("[data-theme-icon]")
      .forEach((icon) => {
        icon.hidden = icon.dataset.themeIcon !== preference;
      });
    summary.setAttribute("aria-label", `切换主题，当前${labels[preference]}`);
    summary.title = `主题：${labels[preference]}`;
  };

  picker.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (
      input.value !== "system" &&
      input.value !== "light" &&
      input.value !== "dark"
    )
      return;
    window.abnormalTheme.setPreference(input.value);
  });
  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !picker.contains(event.target))
      picker.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && picker.open) {
      picker.open = false;
      summary.focus();
    }
  });
  window.addEventListener("abnormal:themechange", syncPicker);
  syncPicker();
}
