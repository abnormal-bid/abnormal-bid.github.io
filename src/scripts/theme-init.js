// Inlined in <head> so the saved or system theme applies before the first paint.
(() => {
  const storageKey = "abnormal-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const root = document.documentElement;

  const readPreference = () => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved === "light" || saved === "dark" ? saved : "system";
    } catch {
      return "system";
    }
  };

  let preference = readPreference();

  const applyTheme = () => {
    const theme =
      preference === "system"
        ? systemTheme.matches
          ? "dark"
          : "light"
        : preference;
    root.dataset.theme = theme;
    root.dataset.themePreference = preference;
    root.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#141e19" : "#fbfcf8");
    window.dispatchEvent(new CustomEvent("abnormal:themechange"));
  };

  window.abnormalTheme = {
    getPreference: () => preference,
    setPreference(nextPreference) {
      preference = nextPreference;
      try {
        if (preference === "system") {
          window.localStorage.removeItem(storageKey);
        } else {
          window.localStorage.setItem(storageKey, preference);
        }
      } catch {
        // The theme still works when browser storage is unavailable.
      }
      applyTheme();
    },
  };

  systemTheme.addEventListener("change", () => {
    if (preference === "system") applyTheme();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = readPreference();
    applyTheme();
  });
  applyTheme();
})();
