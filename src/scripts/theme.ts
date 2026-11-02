export function initializeThemePicker() {
  const picker = document.querySelector<HTMLDetailsElement>(
    "[data-theme-picker]",
  );
  const summary = picker?.querySelector("summary");
  if (!picker || !summary) return;

  // 文案随页面语言渲染：模板在 data-aria-template / data-title-template，选项名取自菜单里的选项。
  const ariaTemplate = picker.dataset.ariaTemplate ?? "{label}";
  const titleTemplate = picker.dataset.titleTemplate ?? "{label}";
  const labelOf = (preference: string) =>
    picker
      .querySelector(`input[value="${preference}"]`)
      ?.closest("label")
      ?.querySelector("[data-theme-label]")
      ?.textContent?.trim() ?? preference;
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
    const label = labelOf(preference);
    summary.setAttribute("aria-label", ariaTemplate.replace("{label}", label));
    summary.title = titleTemplate.replace("{label}", label);
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
