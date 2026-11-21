"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  minDuration?: number;
}

const TARGET_HANDLE = ["0", "x", "d", "e", "v", "p", "r", "a", "b", "h", "u"];
const FLAP_GLYPHS = ["#", "8", "F", "X", "0", "/", "9", "A", "*", "1", "E"];

export function LoadingScreen({ minDuration = 1150 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [flapTick, setFlapTick] = useState(0);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    let isWindowLoaded =
      typeof document !== "undefined" && document.readyState === "complete";
    let isComplete = false;

    const handleWindowLoad = () => {
      isWindowLoaded = true;
    };

    if (!isWindowLoaded && typeof window !== "undefined") {
      window.addEventListener("load", handleWindowLoad);
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(elapsed / minDuration, 1);

      setFlapTick((prev) => prev + 1);

      if (!isComplete) {
        if (timeRatio < 1) {
          const eased = 1 - Math.pow(1 - timeRatio, 1.75);
          setProgress(Math.round(eased * 94));
        } else if (isWindowLoaded) {
          isComplete = true;
          setProgress(100);
          clearInterval(interval);

          // Hold completed photo + locked split-flap board briefly before reveal
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsVisible(false);
              document.body.style.overflow = originalOverflow;
            }, 480);
          }, 260);
        } else {
          setProgress((prev) => Math.min(prev + 1, 97));
        }
      }
    }, 45);

    const fallbackTimeout = setTimeout(() => {
      if (!isComplete) {
        isComplete = true;
        setProgress(100);
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = originalOverflow;
        }, 480);
      }
    }, 6500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleWindowLoad);
      }
      document.body.style.overflow = originalOverflow;
    };
  }, [minDuration]);

  if (!isVisible) return null;

  const lockedCount = Math.floor((progress / 100) * TARGET_HANDLE.length);

  return (
    <div
      aria-label="Loading portfolio"
      role="status"
      className={`fixed inset-0 z-[99999] flex items-center justify-center px-4 select-none pointer-events-none bg-slate-50/98 dark:bg-[#030712]/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Subtle Matte Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Center Solari Portrait & Split-Flap Pass */}
      <div
        className={`relative z-10 w-full max-w-[440px] rounded-3xl bg-white dark:bg-[#090f1d] border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] transition-transform duration-500 ${
          isExiting ? "scale-[0.97]" : "scale-100"
        }`}
      >
        {/* Top Hardware Header Strip */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                progress === 100
                  ? "bg-emerald-500"
                  : "bg-primary animate-pulse"
              }`}
            />
            ID.PASS // 2026
          </span>
          <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>

        {/* Main Content: Live Developing Photo + Solari Split-Flap Board */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Left: Darkroom Scan-Reveal Portrait */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {/* Base Monochrome Layer */}
            <Image
              src="/assets/images/profile.jpg"
              alt="Prabhu P"
              fill
              sizes="112px"
              priority
              className="object-cover grayscale contrast-125 opacity-45"
            />

            {/* Progressive Full-Color Developed Layer */}
            <div
              className="absolute inset-0 transition-[clip-path] duration-100 ease-out"
              style={{
                clipPath: `inset(0 0 ${100 - progress}% 0)`,
              }}
            >
              <Image
                src="/assets/images/profile.jpg"
                alt="Prabhu P"
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
            </div>

            {/* Laser Scanline Sweeping Down */}
            {progress < 100 && (
              <div
                className="absolute inset-x-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)] transition-all duration-100 ease-out"
                style={{ top: `${progress}%` }}
              />
            )}

            {/* Corner Viewfinder Registration Marks */}
            <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-white/80 pointer-events-none" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-white/80 pointer-events-none" />
            <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-white/80 pointer-events-none" />
            <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-white/80 pointer-events-none" />
          </div>

          {/* Right: Identity & Solari Split-Flap Character Tiles */}
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Full Stack Developer
            </span>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight mt-0.5">
              Prabhu P
            </h2>

            {/* Solari Mechanical Split-Flap Tiles */}
            <div
              className="flex items-center gap-[3px] mt-3.5"
              aria-label="0xdevprabhu"
            >
              {TARGET_HANDLE.map((char, idx) => {
                const isLocked = idx < lockedCount;
                const displayChar = isLocked
                  ? char
                  : FLAP_GLYPHS[(flapTick + idx * 3) % FLAP_GLYPHS.length];
                const isPrefix = idx < 2; // "0x" highlighted

                return (
                  <div
                    key={idx}
                    className={`relative w-[21px] sm:w-[23px] h-8 rounded-[5px] flex items-center justify-center font-mono text-xs sm:text-sm font-bold overflow-hidden border transition-all duration-200 ${
                      isLocked
                        ? isPrefix
                          ? "bg-primary/10 border-primary/40 text-primary translate-y-0"
                          : "bg-slate-900 dark:bg-slate-800 border-slate-800 dark:border-slate-700 text-white translate-y-0"
                        : "bg-slate-100 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 -translate-y-[1px]"
                    }`}
                  >
                    {/* Upper Flap Subtle Highlight */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-white/[0.06] pointer-events-none" />

                    {/* Mechanical Center Split-Flap Hinge Line */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/15 dark:bg-black/50 pointer-events-none" />

                    <span className="relative z-10">{displayChar}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Precision Progress Hairline */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex-1 h-[3px] rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
            {progress < 100 ? "VERIFYING..." : "READY"}
          </span>
        </div>
      </div>
    </div>
  );
}