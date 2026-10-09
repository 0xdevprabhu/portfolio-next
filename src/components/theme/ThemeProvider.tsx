"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { curatedThemes, radiusPresets, fullColorSwatches } from "@/data/themes";
import { ColorTheme, RadiusTheme } from "@/types";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
  currentColorTheme: ColorTheme;
  setColorThemeById: (id: string) => void;
  setCustomHexColor: (hex: string) => void;
  currentRadius: RadiusTheme;
  setRadiusById: (id: string) => void;
  randomizeTheme: () => void;
  isThemeCustomizerOpen: boolean;
  setIsThemeCustomizerOpen: (open: boolean) => void;
  isFastTrack: boolean;
  toggleFastTrack: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentColorTheme, setCurrentColorTheme] = useState<ColorTheme>(curatedThemes[0]);
  const [currentRadius, setCurrentRadius] = useState<RadiusTheme>(radiusPresets[2]); // rounded by default
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState<boolean>(false);
  const [isFastTrack, setIsFastTrack] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Apply CSS Variables to root
  const applyColorThemeVariables = (theme: ColorTheme) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-dark", theme.dark);
    root.style.setProperty("--primary-light", theme.accent);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--shadow-glow", theme.glow);
  };

  const applyRadiusVariables = (radius: RadiusTheme) => {
    const root = document.documentElement;
    Object.entries(radius.values).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
  };

  // On initial mount, read preferences from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      // 1. Dark Mode: default to false (Light Mode) per prompt requirements
      const savedDark = localStorage.getItem("prabhu_portfolio_dark");
      if (savedDark !== null) {
        const isDark = savedDark === "true";
        setIsDarkMode(isDark);
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else {
        // Explicitly set light mode
        document.documentElement.classList.remove("dark");
      }

      // 2. Color Theme: Auto-shuffle on every page refresh (different from previous)
      const lastColorId = localStorage.getItem("prabhu_portfolio_color_id");
      const availableThemes = curatedThemes.filter((t) => t.id !== lastColorId);
      const chosenTheme =
        availableThemes.length > 0
          ? availableThemes[Math.floor(Math.random() * availableThemes.length)]
          : curatedThemes[Math.floor(Math.random() * curatedThemes.length)];
      setCurrentColorTheme(chosenTheme);
      applyColorThemeVariables(chosenTheme);
      try {
        localStorage.setItem("prabhu_portfolio_color_id", chosenTheme.id);
      } catch {}

      // 3. Corner Radius: Auto-shuffle on every page refresh (different from previous)
      const lastRadiusId = localStorage.getItem("prabhu_portfolio_radius_id");
      const availableRadii = radiusPresets.filter((r) => r.id !== lastRadiusId);
      const chosenRadius =
        availableRadii.length > 0
          ? availableRadii[Math.floor(Math.random() * availableRadii.length)]
          : radiusPresets[Math.floor(Math.random() * radiusPresets.length)];
      setCurrentRadius(chosenRadius);
      applyRadiusVariables(chosenRadius);
      try {
        localStorage.setItem("prabhu_portfolio_radius_id", chosenRadius.id);
      } catch {}

      // 4. Fast Track
      const savedFastTrack = localStorage.getItem("fastTrackMode");
      if (savedFastTrack === "true") {
        setIsFastTrack(true);
      }
    } catch {
      // localStorage might fail in restricted iframe, fallback smoothly
      applyColorThemeVariables(curatedThemes[0]);
      applyRadiusVariables(radiusPresets[2]);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      try {
        localStorage.setItem("prabhu_portfolio_dark", String(next));
      } catch {}
      return next;
    });
  };

  const setDarkMode = (dark: boolean) => {
    setIsDarkMode(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("prabhu_portfolio_dark", String(dark));
    } catch {}
  };

  const setColorThemeById = (id: string) => {
    let themeToSet: ColorTheme | undefined = curatedThemes.find((t) => t.id === id);

    if (!themeToSet) {
      const swatch = fullColorSwatches.find((s) => s.id === id);
      if (swatch) {
        themeToSet = {
          id: swatch.id,
          name: swatch.id,
          primary: swatch.p,
          dark: swatch.d,
          accent: swatch.a,
          glow: `rgba(2, 132, 199, 0.4)`,
        };
      }
    }

    if (themeToSet) {
      setCurrentColorTheme(themeToSet);
      applyColorThemeVariables(themeToSet);
      try {
        localStorage.setItem("prabhu_portfolio_color_id", themeToSet.id);
      } catch {}
    }
  };

  const setCustomHexColor = (hex: string) => {
    const customTheme: ColorTheme = {
      id: "custom-" + hex.replace("#", ""),
      name: "Custom " + hex,
      primary: hex,
      dark: hex,
      accent: hex,
      glow: `${hex}66`,
    };
    setCurrentColorTheme(customTheme);
    applyColorThemeVariables(customTheme);
    try {
      localStorage.setItem("prabhu_portfolio_color_id", customTheme.id);
    } catch {}
  };

  const setRadiusById = (id: string) => {
    const radius = radiusPresets.find((r) => r.id === id);
    if (radius) {
      setCurrentRadius(radius);
      applyRadiusVariables(radius);
      try {
        localStorage.setItem("prabhu_portfolio_radius_id", radius.id);
      } catch {}
    }
  };

  const randomizeTheme = () => {
    // Pick a different theme than current
    const availableThemes = curatedThemes.filter((t) => t.id !== currentColorTheme.id);
    const chosenTheme =
      availableThemes.length > 0
        ? availableThemes[Math.floor(Math.random() * availableThemes.length)]
        : curatedThemes[0];

    const availableRadii = radiusPresets.filter((r) => r.id !== currentRadius.id);
    const chosenRadius =
      availableRadii.length > 0
        ? availableRadii[Math.floor(Math.random() * availableRadii.length)]
        : radiusPresets[2];

    setCurrentColorTheme(chosenTheme);
    applyColorThemeVariables(chosenTheme);
    setCurrentRadius(chosenRadius);
    applyRadiusVariables(chosenRadius);

    try {
      localStorage.setItem("prabhu_portfolio_color_id", chosenTheme.id);
      localStorage.setItem("prabhu_portfolio_radius_id", chosenRadius.id);
    } catch {}
  };

  const toggleFastTrack = () => {
    setIsFastTrack((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("fastTrackMode", String(next));
      } catch {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        setDarkMode,
        currentColorTheme,
        setColorThemeById,
        setCustomHexColor,
        currentRadius,
        setRadiusById,
        randomizeTheme,
        isThemeCustomizerOpen,
        setIsThemeCustomizerOpen,
        isFastTrack,
        toggleFastTrack,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
