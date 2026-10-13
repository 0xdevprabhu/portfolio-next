"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  minDuration?: number; // Minimum duration in ms (default 2000ms)
}

export function LoadingScreen({ minDuration = 2000 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  // 12 inner orbital dots around radius ~72px
  const innerDots = useMemo(() => {
    const total = 12;
    const radius = 72; // px
    return Array.from({ length: total }, (_, i) => {
      const angle = (i * 360) / total;
      const rad = (angle * Math.PI) / 180;
      const x = Math.round(Math.cos(rad) * radius);
      const y = Math.round(Math.sin(rad) * radius);
      // Create a gradient trail effect with dot sizes & opacities
      const size = 4 + (i % 4) * 1.5; // 4px to 8.5px
      const opacity = 0.35 + (i / total) * 0.65; // 0.35 to 1.0
      return { id: i, x, y, size, opacity };
    });
  }, []);

  // 8 outer orbital dots around radius ~104px
  const outerDots = useMemo(() => {
    const total = 8;
    const radius = 104; // px
    return Array.from({ length: total }, (_, i) => {
      const angle = (i * 360) / total;
      const rad = (angle * Math.PI) / 180;
      const x = Math.round(Math.cos(rad) * radius);
      const y = Math.round(Math.sin(rad) * radius);
      const isAccent = i % 2 === 0;
      return { id: i, x, y, isAccent };
    });
  }, []);

  useEffect(() => {
    // Lock body scrolling while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    let isWindowLoaded = typeof document !== "undefined" && document.readyState === "complete";
    let isComplete = false;

    const handleWindowLoad = () => {
      isWindowLoaded = true;
    };

    if (!isWindowLoaded && typeof window !== "undefined") {
      window.addEventListener("load", handleWindowLoad);
    }

    // Interval to calculate progress and evaluate completion
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(elapsed / minDuration, 1);

      if (!isComplete) {
        if (timeRatio < 1) {
          // Still within the 2000ms minimum window -> smoothly climb up to ~92%
          setProgress(Math.round(timeRatio * 92));
        } else {
          // 2000ms has elapsed. Now check if the network / page is actually loaded!
          if (isWindowLoaded) {
            // Page is ready! Finish to 100%
            isComplete = true;
            setProgress(100);
            clearInterval(interval);

            // Brief delay at 100% before smooth fade-out
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = originalOverflow;
              }, 500); // fade out duration
            }, 250);
          } else {
            // Network is still slow / waiting for assets!
            // Hold progress around 93-96% with gentle crawl
            setProgress((prev) => Math.min(prev + 1, 96));
          }
        }
      }
    }, 50);

    // Fallback safety timeout: never block longer than 8 seconds
    const fallbackTimeout = setTimeout(() => {
      if (!isComplete) {
        isComplete = true;
        setProgress(100);
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = originalOverflow;
        }, 500);
      }
    }, 8000);

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

  return (
    <div
      aria-label="Loading portfolio"
      role="status"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none bg-slate-950/95 dark:bg-[#030712]/95 backdrop-blur-xl transition-all duration-500 ease-out ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient background glow */}
      <div
        className="absolute w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, rgba(2, 132, 199, 0.15) 45%, transparent 70%)",
        }}
      />

      {/* Main Avatar & Orbiting Dots Container */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Pulsing Ripple Shockwave Behind Avatar */}
        <div className="absolute w-28 h-28 rounded-full border border-primary/30 animate-ripple pointer-events-none" />
        <div
          className="absolute w-28 h-28 rounded-full border border-primary/20 animate-ripple pointer-events-none"
          style={{ animationDelay: "1.2s" }}
        />

        {/* Outer Orbit Circular Track */}
        <div className="absolute w-[208px] h-[208px] rounded-full border border-dashed border-primary/25 pointer-events-none" />

        {/* Inner Orbit Circular Track */}
        <div className="absolute w-[144px] h-[144px] rounded-full border border-slate-700/40 dark:border-slate-800/60 pointer-events-none" />

        {/* Outer Ring of Orbiting Dots (Counter-Clockwise) */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse pointer-events-none">
          {outerDots.map((dot) => (
            <div
              key={`outer-${dot.id}`}
              className="absolute flex items-center justify-center"
              style={{
                transform: `translate(${dot.x}px, ${dot.y}px)`,
              }}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  dot.isAccent
                    ? "w-3 h-3 bg-primary shadow-[0_0_12px_var(--primary)]"
                    : "w-2 h-2 bg-primary-light/80 shadow-[0_0_8px_var(--primary-light)]"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Inner Ring of Orbiting Dots (Clockwise) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: "spin 3.2s linear infinite",
          }}
        >
          {innerDots.map((dot) => (
            <div
              key={`inner-${dot.id}`}
              className="absolute flex items-center justify-center"
              style={{
                transform: `translate(${dot.x}px, ${dot.y}px)`,
              }}
            >
              <span
                className="rounded-full bg-primary"
                style={{
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  opacity: dot.opacity,
                  boxShadow: `0 0 ${dot.size * 1.6}px var(--primary)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Center Profile Photo Frame */}
        <div className="relative z-10 w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-primary via-primary-light to-accent shadow-[0_0_28px_var(--shadow-glow)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-950/80 relative">
            <Image
              src="/assets/images/profile.jpg"
              alt="Prabhu P"
              fill
              sizes="96px"
              priority
              className="object-cover rounded-full select-none"
            />
          </div>

          {/* Active online glowing dot indicator on avatar bottom right */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-[0_0_8px_#10b981]" />
        </div>
      </div>

      {/* Developer Branding & Creative Loading Status */}
      <div className="flex flex-col items-center mt-6 text-center z-10 space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/90">
          Prabhu P
        </h2>
        <p className="text-xs tracking-wider text-slate-400 font-mono">
          Full Stack Developer &bull; LAMP Specialist
        </p>

        {/* Creative Progress Bar */}
        <div className="w-48 h-1.5 mt-3 bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-slate-700/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-accent transition-all duration-150 ease-out shadow-[0_0_10px_var(--primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text with Dynamic Animated Dots */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pt-1">
          <span>Initializing Portfolio</span>
          <span className="inline-flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
          <span className="ml-1 text-primary-light font-semibold tabular-nums">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
