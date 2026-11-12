"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { curatedThemes, radiusPresets, fullColorSwatches } from "@/data/themes";
import {
  Palette,
  X,
  Sparkles,
  Dices,
  Sun,
  Moon,
  Zap,
  Check,
  Pipette,
} from "lucide-react";

export function ThemeCustomizer() {
  const {
    isDarkMode,
    toggleDarkMode,
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
  } = useTheme();

  return (
    <>
      {/* Floating Theme Button — Lifted neatly above Mobile Bottom Dock & AI Chatbot */}
      <button
        onClick={() => setIsThemeCustomizerOpen(true)}
        aria-label="Customize Theme & Appearance"
        className="fixed bottom-36 lg:bottom-24 right-4 sm:right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-primary/40"
        style={{
          backgroundColor: currentColorTheme.primary,
          boxShadow: `0 8px 25px ${currentColorTheme.primary}66`,
        }}
      >
        <Palette className="h-5 w-5 transition-transform group-hover:rotate-45" />
        <span className="sr-only">Customize theme</span>
      </button>

      {/* Studio Theme Modal Overlay */}
      {isThemeCustomizerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Theme Customizer"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2.5 sm:p-5 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsThemeCustomizerOpen(false)}
        >
          {/* Expanded Desktop (max-w-4xl) + Compact Mobile Shell */}
          <div
            className="relative w-full max-w-md md:max-w-3xl lg:max-w-4xl rounded-[24px] sm:rounded-[28px] bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_28px_70px_-15px_rgba(15,23,42,0.4)] backdrop-blur-xl max-h-[88vh] sm:max-h-[90vh] flex flex-col text-slate-900 dark:text-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent Top Hairline */}
            <div
              className="h-1 w-full shrink-0"
              style={{
                background: `linear-gradient(90deg, ${currentColorTheme.accent}, ${currentColorTheme.primary}, ${currentColorTheme.dark})`,
              }}
            />

            {/* Compact Studio Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-[14px] flex items-center justify-center text-white shadow-md shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${currentColorTheme.accent}, ${currentColorTheme.primary})`,
                  }}
                >
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base sm:text-lg tracking-tight truncate">
                      Theme Studio
                    </h3>
                    <span
                      className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        backgroundColor: `${currentColorTheme.primary}15`,
                        color: currentColorTheme.primary,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: currentColorTheme.primary }}
                      />
                      {currentColorTheme.name}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                    Customize palette, mode, curves &amp; recruiter fast-track
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsThemeCustomizerOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                aria-label="Close customizer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Responsive Body: 2-Column Wide Bento on Desktop, Compact Single Scroll on Mobile */}
            <div className="overflow-y-auto px-4 py-3.5 sm:px-6 sm:py-5 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6 items-start">
                {/* LEFT PANEL (Desktop 5 Cols): Modes, Live Preview, & Curves */}
                <div className="md:col-span-5 space-y-3.5 sm:space-y-4">
                  {/* Display & Mode Controls */}
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      Display &amp; View Mode
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={toggleDarkMode}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[14px] border text-xs font-semibold transition-all whitespace-nowrap ${
                          isDarkMode
                            ? "bg-slate-800 border-slate-700 text-amber-300 shadow-xs"
                            : "bg-slate-50 border-slate-200 text-amber-600 hover:bg-slate-100"
                        }`}
                      >
                        {isDarkMode ? (
                          <Moon className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <Sun className="h-3.5 w-3.5 shrink-0" />
                        )}
                        <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={toggleFastTrack}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[14px] border text-xs font-semibold transition-all whitespace-nowrap ${
                          isFastTrack
                            ? "bg-amber-500/15 border-amber-500/50 text-amber-600 dark:text-amber-300 shadow-xs"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Zap
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isFastTrack ? "fill-amber-400 text-amber-500" : ""
                          }`}
                        />
                        <span>Fast-Track</span>
                      </button>
                    </div>
                  </div>

                  {/* Desktop-Only Live Studio Mini Preview */}
                  <div className="hidden md:block rounded-[18px] p-4 border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Live Preview
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {currentColorTheme.primary}
                      </span>
                    </div>

                    <div className="rounded-[14px] p-3.5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
                            style={{ backgroundColor: currentColorTheme.primary }}
                          >
                            P
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            Prabhu P.
                          </span>
                        </div>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                          style={{ backgroundColor: currentColorTheme.primary }}
                        >
                          Active Pill
                        </span>
                      </div>

                      <div className="h-1.5 w-3/4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full w-2/3 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${currentColorTheme.accent}, ${currentColorTheme.primary})`,
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Curves: <strong>{currentRadius.name}</strong>
                        </span>
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                          style={{
                            background: `linear-gradient(135deg, ${currentColorTheme.accent}, ${currentColorTheme.primary})`,
                          }}
                        >
                          CTA Button
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interface Corner Radius */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Corner Style
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                        {currentRadius.name}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 p-1 rounded-[16px] bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60">
                      {radiusPresets.map((r) => {
                        const isSelected = currentRadius.id === r.id;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setRadiusById(r.id)}
                            className={`py-2 px-1.5 rounded-[12px] text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap ${
                              isSelected
                                ? "text-white shadow-sm"
                                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                            }`}
                            style={
                              isSelected
                                ? { backgroundColor: currentColorTheme.primary }
                                : undefined
                            }
                          >
                            {r.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL (Desktop 7 Cols): Full Curated Themes + Unclipped Swatches */}
                <div className="md:col-span-7 space-y-3.5 sm:space-y-4">
                  {/* Curated Themes — Zero Text Truncation */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Curated Themes
                      </span>
                      <span
                        className="text-[11px] font-semibold sm:hidden"
                        style={{ color: currentColorTheme.primary }}
                      >
                        {currentColorTheme.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {curatedThemes.map((theme) => {
                        const isSelected = currentColorTheme.id === theme.id;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => setColorThemeById(theme.id)}
                            className={`group flex items-center gap-2 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-[14px] border text-left transition-all ${
                              isSelected
                                ? "bg-slate-50 dark:bg-slate-800/90 shadow-xs"
                                : "border-slate-200/85 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
                            }`}
                            style={
                              isSelected
                                ? {
                                    borderColor: theme.primary,
                                    boxShadow: `0 0 0 1px ${theme.primary}`,
                                  }
                                : undefined
                            }
                          >
                            <span
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white shadow-xs"
                              style={{
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`,
                              }}
                            >
                              {isSelected && <Check className="h-3 w-3" />}
                            </span>
                            <span className="text-[11.5px] sm:text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                              {theme.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Full Color Swatches Grid + Custom Color Picker */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        40+ Color Swatches
                      </span>

                      <label
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors border border-slate-200/80 dark:border-slate-700"
                        title="Pick custom hex color"
                      >
                        <Pipette
                          className="w-3 h-3"
                          style={{ color: currentColorTheme.primary }}
                        />
                        <span>Custom</span>
                        <input
                          type="color"
                          value={
                            currentColorTheme.primary.startsWith("#")
                              ? currentColorTheme.primary
                              : "#4f46e5"
                          }
                          onChange={(e) => setCustomHexColor(e.target.value)}
                          className="sr-only"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 sm:gap-2 p-2.5 sm:p-3.5 border border-slate-200/85 dark:border-slate-800 rounded-[18px] bg-slate-50/90 dark:bg-slate-950/50">
                      {fullColorSwatches.map((c) => {
                        const isSelected =
                          currentColorTheme.id === c.id ||
                          currentColorTheme.primary.toLowerCase() === c.p.toLowerCase();
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setColorThemeById(c.id)}
                            title={c.id}
                            aria-label={`Select color ${c.id}`}
                            className={`aspect-square w-full max-w-[28px] mx-auto rounded-full transition-transform hover:scale-110 focus:outline-none flex items-center justify-center ${
                              isSelected ? "scale-110" : ""
                            }`}
                            style={{
                              backgroundColor: c.p,
                              ...(isSelected
                                ? {
                                    boxShadow: `0 0 0 2px ${
                                      isDarkMode ? "#0f172a" : "#ffffff"
                                    }, 0 0 0 4px ${c.p}`,
                                  }
                                : {}),
                            }}
                          >
                            {isSelected && (
                              <Check className="h-3 w-3 text-white drop-shadow" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Studio Footer Actions */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={randomizeTheme}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[14px] bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-semibold text-xs sm:text-sm transition-all active:scale-[0.98]"
              >
                <Dices
                  className="h-4 w-4"
                  style={{ color: currentColorTheme.primary }}
                />
                <span>Surprise Me</span>
              </button>

              <button
                type="button"
                onClick={() => setIsThemeCustomizerOpen(false)}
                className="flex-1 sm:flex-none sm:ml-auto py-2.5 px-6 rounded-[14px] font-bold text-xs sm:text-sm text-white shadow-md transition-all hover:opacity-95 active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${currentColorTheme.accent}, ${currentColorTheme.primary})`,
                }}
              >
                Apply &amp; Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
