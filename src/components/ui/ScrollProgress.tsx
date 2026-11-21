"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";

export function ScrollProgress() {
  const { currentColorTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const percent =
        docHeight > 0
          ? Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)))
          : 0;

      setProgress(percent);
      setIsScrolling(true);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Scroll stop pannathum 900ms-la smooth-aa fade out aagum
      hideTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 900);
    };

    const handleScroll = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed right-0 z-[60] flex items-center gap-1.5 -translate-y-1/2 pointer-events-none select-none transition-opacity duration-300 ease-out ${
        isScrolling ? "opacity-100" : "opacity-0"
      }`}
      style={{
        top: `calc(18px + (100vh - 36px) * ${progress / 100})`,
      }}
    >
      {/* Small Circle Percentage Badge */}
      <div
        className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border shadow-md"
        style={{
          borderColor: `${currentColorTheme.primary}40`,
        }}
      >
        <span
          className="font-mono text-[9px] font-bold tabular-nums leading-none"
          style={{ color: currentColorTheme.primary }}
        >
          {progress}%
        </span>
      </div>

      {/* Single 5px Height Theme-Colored Edge Marker */}
      <div
        className="w-[4px] h-[5px] rounded-l-full shrink-0"
        style={{
          backgroundColor: currentColorTheme.primary,
          boxShadow: `0 0 8px ${currentColorTheme.glow}`,
        }}
      />
    </div>
  );
}