interface Window {
  abnormalTheme: {
    getPreference(): "system" | "light" | "dark";
    setPreference(preference: "system" | "light" | "dark"): void;
  };
}
