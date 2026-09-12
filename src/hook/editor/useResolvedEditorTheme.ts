import { resolveEditorTheme } from "@/domain/editor/theme";
import { useEffect, useState } from "react";

const siteUsesDarkTheme = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

export const useResolvedEditorTheme = (
  preference: CodeEditorThemePreference,
) => {
  const [siteIsDark, setSiteIsDark] = useState(siteUsesDarkTheme);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setSiteIsDark(root.classList.contains("dark"));
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return resolveEditorTheme(preference, siteIsDark);
};
