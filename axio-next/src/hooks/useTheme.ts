"use client";

import { useCallback, useEffect, useState } from "react";
import { loadTheme, saveTheme } from "@/lib/storage";
import type { Theme } from "@/types/theme";

const DEFAULT_THEME: Theme = "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedTheme = loadTheme();
      const preferredTheme = window.matchMedia?.("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      setTheme(storedTheme ?? preferredTheme);
      setReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (ready) {
      saveTheme(theme);
    }
  }, [ready, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
