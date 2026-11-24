"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  minDuration?: number;
}

type IntroPhase = "wordmark" | "merging" | "avatar";

const HANDLE_REST = ["x", "d", "e", "v", "p", "r", "a", "b", "h", "u"];

interface TechBubble {
  id: string;
  label: string;
  angleDeg: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
  tint: string;
  renderIcon: () => React.ReactNode;
}

const TECH_BUBBLES: TechBubble[] = [
  {
    id: "php",
    label: "PHP",
    angleDeg: -90,
    distance: 132,
    size: 44,
    duration: 2.1,
    delay: 0.0,
    tint: "border-indigo-400/40 bg-indigo-500/10 dark:bg-indigo-500/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
        <ellipse cx="16" cy="16" rx="14" ry="8.5" fill="#777BB4" />
        <text
          x="16"
          y="19"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="9"
          fontWeight="800"
          fontFamily="monospace"
        >
          PHP
        </text>
      </svg>
    ),
  },
  {
    id: "firebase",
    label: "Firebase",
    angleDeg: -50,
    distance: 142,
    size: 42,
    duration: 2.25,
    delay: 0.12,
    tint: "border-amber-400/45 bg-amber-500/10 dark:bg-amber-500/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
        <path
          d="M7.5 23.5L10.3 6.2c.2-1 1.5-1.2 2-.3l3.1 5.8 3.6-3.7c.6-.7 1.8-.3 1.9.6l3.6 15-8.5 4.8a2 2 0 01-2 0l-6.5-4.9z"
          fill="#FFA000"
        />
        <path
          d="M15.4 11.7L7.5 23.5l8.5 4.8a2 2 0 002 0l6.5-4.8-3.6-15c-.1-.9-1.3-1.3-1.9-.6l-3.6 3.8z"
          fill="#FFCA28"
          opacity="0.9"
        />
        <path
          d="M16 28.4l8.5-4.9-2.8-11.6L16 28.4z"
          fill="#F57C00"
          opacity="0.7"
        />
      </svg>
    ),
  },
  {
    id: "html5",
    label: "HTML5",
    angleDeg: -14,
    distance: 136,
    size: 42,
    duration: 2.05,
    delay: 0.24,
    tint: "border-orange-400/45 bg-orange-500/10 dark:bg-orange-500/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
        <path d="M5 4l2 22 9 2.5 9-2.5 2-22H5z" fill="#E34F26" />
        <path d="M16 6v20.6l7.3-2 1.7-18.6H16z" fill="#EF652A" />
        <path
          d="M10 10.5h12l-.4 3h-8.3l.3 3h7.7l-.7 7.5-4.6 1.3-4.6-1.3-.3-3.5h2.9l.2 1.7 1.8.5 1.8-.5.3-2.9H10.7L10 10.5z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    id: "css3",
    label: "CSS3",
    angleDeg: 24,
    distance: 138,
    size: 42,
    duration: 2.2,
    delay: 0.36,
    tint: "border-sky-400/45 bg-sky-500/10 dark:bg-sky-500/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
        <path d="M5 4l2 22 9 2.5 9-2.5 2-22H5z" fill="#1572B6" />
        <path d="M16 6v20.6l7.3-2 1.7-18.6H16z" fill="#33A9DC" />
        <path
          d="M10.2 10.5h11.6l-.4 3H14l.2 2.5h7l-.7 7.7-4.5 1.3-4.5-1.3-.3-3.4h2.8l.2 1.6 1.8.5 1.8-.5.3-3H11.2l-.4-2.9h8.1l.2-2.5h-8.6l-.3-3z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    id: "react",
    label: "React",
    angleDeg: 62,
    distance: 130,
    size: 44,
    duration: 2.15,
    delay: 0.48,
    tint: "border-cyan-400/45 bg-cyan-500/10 dark:bg-cyan-500/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
        <circle cx="16" cy="16" r="2.4" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1.5" fill="none">
          <ellipse cx="16" cy="16" rx="11.5" ry="4.6" />
          <ellipse
            cx="16"
            cy="16"
            rx="11.5"
            ry="4.6"
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="11.5"
            ry="4.6"
            transform="rotate(120 16 16)"
          />
        </g>
      </svg>
    ),
  },
  {
    id: "nextjs",
    label: "Next.js",
    angleDeg: 102,
    distance: 135,
    size: 40,
    duration: 2.1,
    delay: 0.6,
    tint: "border-slate-400/45 bg-slate-500/10 dark:bg-slate-400/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
        <circle
          cx="16"
          cy="16"
          r="12"
          className="fill-slate-900 dark:fill-white"
        />
        <path
          d="M11.5 21V11l10.2 12.6M20.5 11v7.2"
          className="stroke-white dark:stroke-slate-900"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: "js",
    label: "JavaScript",
    angleDeg: 140,
    distance: 140,
    size: 40,
    duration: 2.25,
    delay: 0.72,
    tint: "border-yellow-400/50 bg-yellow-400/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="4" fill="#F7DF1E" />
        <text
          x="21.5"
          y="24"
          textAnchor="end"
          fill="#1E293B"
          fontSize="12"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          JS
        </text>
      </svg>
    ),
  },
  {
    id: "mysql",
    label: "MySQL",
    angleDeg: 178,
    distance: 134,
    size: 42,
    duration: 2.05,
    delay: 0.84,
    tint: "border-blue-400/45 bg-blue-500/10 dark:bg-blue-500/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
        <ellipse cx="16" cy="9.5" rx="9" ry="3.8" fill="#00758F" />
        <path
          d="M7 9.5v13c0 2.1 4 3.8 9 3.8s9-1.7 9-3.8v-13"
          fill="none"
          stroke="#00758F"
          strokeWidth="2"
        />
        <path
          d="M7 16c0 2.1 4 3.8 9 3.8s9-1.7 9-3.8"
          fill="none"
          stroke="#F29111"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "tailwind",
    label: "Tailwind",
    angleDeg: -146,
    distance: 140,
    size: 40,
    duration: 2.2,
    delay: 0.96,
    tint: "border-teal-400/45 bg-teal-500/10 dark:bg-teal-500/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
        <path
          d="M16 9c-3.7 0-6 1.9-7 5.6 1.4-1.9 3-2.6 4.9-2.1 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3 6.4 3 3.7 0 6-1.9 7-5.6-1.4 1.9-3 2.6-4.9 2.1-1.1-.3-1.8-1.1-2.7-2-1.4-1.4-3-3-6.4-3zM9 17.4c-3.7 0-6 1.9-7 5.6 1.4-1.9 3-2.6 4.9-2.1 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3 6.4 3 3.7 0 6-1.9 7-5.6-1.4 1.9-3 2.6-4.9 2.1-1.1-.3-1.8-1.1-2.7-2-1.4-1.4-3-3-6.4-3z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    id: "gemini",
    label: "AI / Gemini",
    angleDeg: -116,
    distance: 128,
    size: 38,
    duration: 2.1,
    delay: 1.08,
    tint: "border-violet-400/45 bg-violet-500/10 dark:bg-violet-500/15",
    renderIcon: () => (
      <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
        <path
          d="M16 4c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12 6.5-1 11-5.5 12-12z"
          fill="#8B5CF6"
        />
      </svg>
    ),
  },
];

export function LoadingScreen({ minDuration = 2250 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>("wordmark");
  const [isSlowWaiting, setIsSlowWaiting] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let isWindowLoaded =
      typeof document !== "undefined" && document.readyState === "complete";
    let minElapsed = false;
    let hasExited = false;

    const triggerExit = () => {
      if (hasExited) return;
      hasExited = true;
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = originalOverflow;
      }, 280);
    };

    const handleWindowLoad = () => {
      isWindowLoaded = true;
      if (minElapsed) {
        triggerExit();
      }
    };

    if (!isWindowLoaded && typeof window !== "undefined") {
      window.addEventListener("load", handleWindowLoad);
    }

    // Stage 1 -> Stage 2: Letters converge & merge into "0" -> morphs to "O"
    const mergeTimer = setTimeout(() => {
      setPhase("merging");
    }, 520);

    // Stage 2 -> Stage 3: Circular photo reveals inside "O" + tech bubbles burst from behind
    const avatarTimer = setTimeout(() => {
      setPhase("avatar");
    }, 980);

    // Minimum choreography completion (~2.25s + 280ms exit ≈ 2.5s total)
    const minTimer = setTimeout(() => {
      minElapsed = true;
      if (isWindowLoaded) {
        triggerExit();
      } else {
        // Keep looping pulse + tech stack bubbles continuously while network finishes
        setIsSlowWaiting(true);
      }
    }, minDuration);

    // Safety ceiling so a stalled third-party request never locks the user out
    const safetyTimer = setTimeout(() => {
      triggerExit();
    }, 14000);

    return () => {
      clearTimeout(mergeTimer);
      clearTimeout(avatarTimer);
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleWindowLoad);
      }
      document.body.style.overflow = originalOverflow;
    };
  }, [minDuration]);

  if (!isVisible) return null;

  const isCircle = phase === "merging" || phase === "avatar";
  const showAvatarAndBubbles = phase === "avatar";

  return (
    <div
      aria-label="Loading portfolio"
      role="status"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center px-4 select-none overflow-hidden bg-slate-50 dark:bg-[#030712] transition-all duration-300 ease-out ${
        isExiting ? "opacity-0 scale-[1.03] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle Ambient Theme Glow */}
      <div
        className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full blur-3xl opacity-20 dark:opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      {/* Stage Center Wrapper */}
      <div className="relative flex items-center justify-center w-full max-w-md h-80">
        {/* Pulse Waves & Tech Stack Bubbles BEHIND the circular profile image (z-10) */}
        {showAvatarAndBubbles && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            aria-hidden="true"
          >
            {/* Continuous Concentric Pulse Rings */}
            {[0, 0.7, 1.4].map((ringDelay, idx) => (
              <motion.span
                key={`pulse-${idx}`}
                className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-primary/50"
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 2.35, opacity: 0 }}
                transition={{
                  duration: 2.1,
                  delay: ringDelay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Continuous Tech Stack Bubbles Emerging From Behind Avatar */}
            {TECH_BUBBLES.map((bubble) => {
              const rad = (bubble.angleDeg * Math.PI) / 180;
              const tx = Math.cos(rad) * bubble.distance;
              const ty = Math.sin(rad) * bubble.distance;

              return (
                <motion.div
                  key={bubble.id}
                  title={bubble.label}
                  className={`absolute flex items-center justify-center rounded-full border backdrop-blur-md shadow-md ${bubble.tint}`}
                  style={{
                    width: bubble.size,
                    height: bubble.size,
                  }}
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
                  animate={{
                    x: [0, tx * 0.68, tx],
                    y: [0, ty * 0.68, ty],
                    scale: [0.2, 1.06, 0.8],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: bubble.duration,
                    delay: bubble.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.55, 1],
                  }}
                >
                  {bubble.renderIcon()}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Foreground Row: "0" + "xdevprabhu" -> merges to center "0" -> morphs to "O" circle -> avatar (z-20) */}
        <div className="relative z-20 flex items-center justify-center">
          {/* Leading "0" SVG that morphs smoothly into a circular "O" & hosts the avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: 1,
              width: isCircle ? 120 : 30,
              height: isCircle ? 120 : 44,
            }}
            transition={{
              opacity: { duration: 0.25 },
              scale: { duration: 0.3 },
              width: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
              height: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
            }}
            className="relative flex items-center justify-center shrink-0"
          >
            {/* Vector "0" morphing into circular "O" ring */}
            <svg
              viewBox="0 0 120 120"
              className="absolute inset-0 w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <motion.rect
                fill="none"
                stroke="currentColor"
                className="text-primary"
                initial={false}
                animate={
                  isCircle
                    ? {
                        x: 4,
                        y: 4,
                        width: 112,
                        height: 112,
                        rx: 56,
                        strokeWidth: 4,
                      }
                    : {
                        x: 16,
                        y: 8,
                        width: 88,
                        height: 104,
                        rx: 42,
                        strokeWidth: 11,
                      }
                }
                transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Zero inner diagonal indicator (fades out as "0" becomes "O") */}
              <motion.line
                x1="40"
                y1="82"
                x2="80"
                y2="38"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                className="text-primary"
                initial={{ opacity: 0.85 }}
                animate={{ opacity: isCircle ? 0 : 0.85 }}
                transition={{ duration: 0.2 }}
              />
            </svg>

            {/* Circular Profile Image inside the morphed "O" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.35 }}
              animate={
                showAvatarAndBubbles
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.35 }
              }
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[108px] h-[108px] rounded-full overflow-hidden bg-gradient-to-br from-primary/25 to-slate-900/40 shadow-[0_0_32px_var(--shadow-glow)]"
            >
              <Image
                src="/profile.webp"
                alt="Prabhu P"
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Remaining letters "xdevprabhu" in a single row -> converge & merge into "0" */}
          <motion.div
            initial={{ opacity: 1, width: "auto" }}
            animate={
              isCircle
                ? { width: 0, opacity: 0 }
                : { width: "auto", opacity: 1 }
            }
            transition={{
              width: { duration: 0.42, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.32, ease: "easeIn" },
            }}
            className="flex items-center overflow-hidden whitespace-nowrap"
            aria-label="0xdevprabhu"
          >
            <div className="flex items-center pl-0.5 font-mono font-extrabold tracking-tight text-[26px] sm:text-[34px] text-slate-900 dark:text-white leading-none">
              {HANDLE_REST.map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={
                    isCircle
                      ? {
                          x: -(idx + 1) * 14,
                          opacity: 0,
                          scale: 0.35,
                        }
                      : {
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: 1,
                        }
                  }
                  transition={
                    isCircle
                      ? {
                          duration: 0.36,
                          delay: idx * 0.015,
                          ease: [0.65, 0, 0.35, 1],
                        }
                      : {
                          duration: 0.25,
                          delay: idx * 0.025,
                          ease: "easeOut",
                        }
                  }
                  className={
                    idx === 0
                      ? "text-primary inline-block"
                      : "inline-block"
                  }
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle status text ONLY when waiting on a slow connection past 2.25s */}
      {isSlowWaiting && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-[11px] font-mono tracking-[0.22em] uppercase text-slate-500 dark:text-slate-400"
        >
          Syncing experience...
        </motion.p>
      )}
    </div>
  );
}
