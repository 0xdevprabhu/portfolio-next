"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { curatedThemes, radiusPresets, fullColorSwatches } from "@/data/themes";
import { Palette, X, Sparkles, Dices, Sun, Moon, Zap, Check } from "lucide-react";

export function ThemeCustomizer() {
  const {
    isDarkMode,
    toggleDarkMode,
    currentColorTheme,
    setColorThemeById,
    currentRadius,
    setRadiusById,
    randomizeTheme,
    isThemeCustomizerOpen,
    setIsThemeCustomizerOpen,
    isFastTrack,
    toggleFastTrack,
  } = useTheme();

  return (
    <>
      {/* Floating Theme Button */}
      <button
        onClick={() => setIsThemeCustomizerOpen(true)}
        aria-label="Customize Theme & Appearance"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-primary/40"
        style={{
          backgroundColor: currentColorTheme.primary,
          boxShadow: `0 8px 25px ${currentColorTheme.primary}66`,
        }}
      >
        <Palette className="h-5 w-5 transition-transform group-hover:rotate-45" />
        <span className="sr-only">Customize theme</span>
      </button>

      {/* Modal Overlay */}
      {isThemeCustomizerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Theme Customizer"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsThemeCustomizerOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl backdrop-blur-xl max-h-[90vh] flex flex-col text-slate-900 dark:text-slate-100 transition-all overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div
                  className="p-2 rounded-lg text-white"
                  style={{ backgroundColor: currentColorTheme.primary }}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg tracking-tight">Theme Customizer</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fine-tune the palette, interface curves, and mode
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsThemeCustomizerOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close customizer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto py-4 space-y-6 flex-grow pr-1">
              {/* Quick Mode Toggles */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border font-medium text-sm transition-all ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 text-amber-300 shadow-sm"
                      : "bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200"
                  }`}
                >
                  {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleFastTrack}
                  className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border font-medium text-sm transition-all ${
                    isFastTrack
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-500 dark:text-amber-400 font-semibold"
                      : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Zap className={`h-4 w-4 ${isFastTrack ? "fill-amber-400" : ""}`} />
                  <span>Recruiter Fast-Track</span>
                </button>
              </div>

              {/* Curated Color Themes */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Curated Color Themes
                  </span>
                  <span className="text-xs font-medium text-primary">
                    {currentColorTheme.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {curatedThemes.map((theme) => {
                    const isSelected = currentColorTheme.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setColorThemeById(theme.id)}
                        className={`group relative flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white shadow-xs"
                          style={{ backgroundColor: theme.primary }}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </span>
                        <span className="text-xs font-medium truncate">{theme.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interface Corner Radius */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  Interface Corner Radius
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {radiusPresets.map((r) => {
                    const isSelected = currentRadius.id === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRadiusById(r.id)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                          isSelected
                            ? "border-primary bg-primary text-white shadow-sm"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {r.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Extended 40+ Color Swatches Palette */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  Full 40+ Color Swatches Palette
                </span>
                <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 max-h-36 overflow-y-auto p-1 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40">
                  {fullColorSwatches.map((c) => {
                    const isSelected = currentColorTheme.id === c.id || currentColorTheme.primary === c.p;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setColorThemeById(c.id)}
                        title={c.id}
                        className={`h-7 w-7 rounded-full transition-transform hover:scale-125 focus:outline-none flex items-center justify-center ${
                          isSelected ? "ring-2 ring-offset-2 ring-primary scale-110" : ""
                        }`}
                        style={{ backgroundColor: c.p }}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white drop-shadow" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with Surprise Me */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                type="button"
                onClick={randomizeTheme}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Dices className="h-4 w-4 text-primary" />
                <span>Surprise Me</span>
              </button>
              <button
                type="button"
                onClick={() => setIsThemeCustomizerOpen(false)}
                className="py-2.5 px-5 rounded-xl font-medium text-sm text-white shadow-md transition-all hover:opacity-95"
                style={{ backgroundColor: currentColorTheme.primary }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
