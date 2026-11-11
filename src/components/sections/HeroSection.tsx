"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Download,
  Eye,
  FolderKanban,
  Github,
  Linkedin,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { useTheme } from "../theme/ThemeProvider";

interface HeroSectionProps {
  onOpenResumePreview: () => void;
}

interface TechPreviewItem {
  name: string;
  iconSrc?: string;
}

const TECH_STACK_PREVIEW: TechPreviewItem[] = [
  { name: "React.js", iconSrc: "/assets/images/react.svg" },
  { name: "Next.js" },
  { name: "Laravel", iconSrc: "/assets/images/laravel.png" },
  { name: "PHP", iconSrc: "/assets/images/php.svg" },
  { name: "MySQL", iconSrc: "/assets/images/mysql.svg" },
];

const KPI_ICONS = [
  { Icon: FolderKanban, tintFrom: "#6366f1", tintTo: "#4f46e5" },
  { Icon: Trophy, tintFrom: "#8b5cf6", tintTo: "#7c3aed" },
  { Icon: Star, tintFrom: "#3b82f6", tintTo: "#2563eb" },
  { Icon: Zap, tintFrom: "#0ea5e9", tintTo: "#0284c7" },
];

function splitRoleDisplay(text: string): { prefix: string; accent: string } {
  const trimmed = text.trimEnd();
  if (!trimmed) return { prefix: "", accent: "" };
  const lastSpaceIdx = text.lastIndexOf(" ");
  if (lastSpaceIdx <= 0) {
    return { prefix: "", accent: text };
  }
  return {
    prefix: text.slice(0, lastSpaceIdx + 1),
    accent: text.slice(lastSpaceIdx + 1),
  };
}

function MiniDeveloperLaptop({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="relative select-none pointer-events-none drop-shadow-[0_18px_28px_rgba(15,23,42,0.28)]"
      aria-hidden="true"
    >
      {/* Screen lid angled cleanly like a studio isometric laptop */}
      <div className="relative mx-auto w-20 h-14 sm:w-24 sm:h-16 rounded-lg bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 p-[2px] -skew-x-6 shadow-md border border-slate-400/40 dark:border-slate-600/50">
        <div className="w-full h-full rounded-[6px] bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 70%)`,
            }}
          />
          <span
            className="relative font-mono font-extrabold text-sm sm:text-base tracking-tighter"
            style={{
              color: accentColor,
              textShadow: `0 0 12px ${accentColor}`,
            }}
          >
            &lt;/&gt;
          </span>
        </div>
      </div>
      {/* Metallic keyboard base deck */}
      <div
        className="mx-auto -mt-0.5 w-24 sm:w-28 h-2.5 sm:h-3 rounded-b-lg bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 dark:from-slate-600 dark:via-slate-400 dark:to-slate-600 shadow-md border-t border-white/60"
        style={{ transform: "perspective(160px) rotateX(42deg)" }}
      />
    </div>
  );
}

export function HeroSection({ onOpenResumePreview }: HeroSectionProps) {
  const { currentColorTheme, isFastTrack, isDarkMode } = useTheme();

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = profileData.rolesToType;

  useEffect(() => {
    const currentFullText = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 35 : 70;
    const pauseTime = 1750;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText.length < currentFullText.length) {
        setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
      } else if (!isDeleting && displayedText.length === currentFullText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  const { prefix: rolePrefix, accent: roleAccent } = splitRoleDisplay(displayedText);
  const nameEndStop = isDarkMode ? "#f8fafc" : "#0f172a";

  return (
    <section
      id="home"
      className="relative w-full max-w-full overflow-hidden pt-20 pb-8 md:pt-4 md:pb-10 lg:pt-5 lg:pb-12 bg-gradient-to-b from-white via-[#f8faff] to-[#f8faff] dark:from-slate-950 dark:via-slate-950 dark:to-slate-950"
    >
      {/* Atmospheric Luminous Mesh Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent dark:from-[#030712] z-[1]" />
        <div
          className="absolute -top-24 -left-24 w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] rounded-full blur-[110px] opacity-20 dark:opacity-25 transition-colors duration-700"
          style={{ backgroundColor: currentColorTheme.accent }}
        />
        <div
          className="absolute top-[10%] -right-24 w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] rounded-full blur-[120px] opacity-20 dark:opacity-20 transition-colors duration-700"
          style={{ backgroundColor: currentColorTheme.primary }}
        />
        <div
          className="absolute -bottom-32 left-1/3 w-[520px] h-[340px] rounded-full blur-[120px] opacity-15 dark:opacity-15"
          style={{ backgroundColor: currentColorTheme.accent }}
        />

        {/* Smooth Bottom Decorative Curved Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full h-24 sm:h-36 lg:h-44 opacity-50 dark:opacity-20"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColorTheme.accent} stopOpacity="0.14" />
              <stop offset="55%" stopColor={currentColorTheme.primary} stopOpacity="0.1" />
              <stop offset="100%" stopColor={currentColorTheme.accent} stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#heroWaveGradient)"
            d="M0,130 C320,185 680,45 1080,105 C1260,132 1365,112 1440,85 L1440,200 L0,200 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Fast Track Notice if enabled */}
        {isFastTrack && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 w-full max-w-2xl mx-auto lg:mx-0 flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-200 text-xs sm:text-sm font-medium shadow-sm"
          >
            <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Fast-Track Recruiter View:</strong> Verified projects, live stats & resume prioritized above the fold.
            </span>
          </motion.div>
        )}

        {/* Main Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* LEFT COLUMN: Clean Typography & Direct CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Emerald Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-emerald-700 dark:text-emerald-300 tracking-tight">
                Available for Opportunities
              </span>
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
            </div>

            {/* Greeting + Signature Gradient Name */}
            <h1 className="mt-5 tracking-tight">
              <span className="block text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 dark:text-white leading-tight">
                Hello, I am
              </span>
              <span className="relative inline-block mt-0.5 pb-3">
                <span
                  className="text-5xl sm:text-6xl xl:text-[4.5rem] font-black leading-[1.04] bg-clip-text text-transparent transition-all duration-500"
                  style={{
                    backgroundImage: `linear-gradient(100deg, ${currentColorTheme.accent} 0%, ${currentColorTheme.primary} 48%, ${nameEndStop} 90%)`,
                  }}
                >
                  Prabhu P.
                </span>

                {/* Hand-drawn Curved Brush Underline */}
                <svg
                  className="absolute right-0 bottom-0 w-32 sm:w-44 h-3.5 sm:h-4 pointer-events-none"
                  viewBox="0 0 180 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.25, ease: "easeOut" }}
                    d="M4 13C48 5.5 112 3.5 174 8.5"
                    stroke={currentColorTheme.primary}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 0.75, delay: 0.4, ease: "easeOut" }}
                    d="M28 16C74 11 124 9.5 162 13"
                    stroke={currentColorTheme.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="sr-only">
                {" "}
                - Full Stack Developer &amp; Freelance Web Developer in Sivakasi, Tamil Nadu
              </span>
            </h1>

            {/* Dynamic Dual-Tone Role Typing Line */}
            <div className="mt-2 min-h-[2.3rem] sm:min-h-[2.75rem] flex items-center justify-center lg:justify-start">
              <p className="text-xl sm:text-2xl lg:text-[1.7rem] font-extrabold tracking-tight leading-snug">
                <span className="text-slate-900 dark:text-white">{rolePrefix}</span>
                <span
                  className="transition-colors duration-300"
                  style={{ color: currentColorTheme.primary }}
                >
                  {roleAccent}
                </span>
                <span
                  className="inline-block w-[3px] h-5 sm:h-6 ml-1.5 align-middle rounded-full animate-pulse"
                  style={{ backgroundColor: currentColorTheme.primary }}
                />
              </p>
            </div>

            {/* Clean Crisp Bio */}
            <p className="mt-3.5 text-sm sm:text-base lg:text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl">
              Certified LAMP Stack Specialist &amp; Full Stack Developer at{" "}
              <a
                href="https://noxlay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 dark:text-white hover:underline underline-offset-4 decoration-2"
                style={{ textDecorationColor: currentColorTheme.primary }}
              >
                {profileData.company}
              </a>{" "}
              in Sivakasi, India. Also available as a{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                Freelance Web Developer
              </strong>{" "}
              crafting custom business websites, e-commerce stores, Next.js interfaces, and
              AI-driven SaaS applications.
            </p>

            {/* Primary & Secondary Action Pills + Social Links */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {/* Primary Pill CTA */}
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full text-sm sm:text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${currentColorTheme.accent}, ${currentColorTheme.primary}, ${currentColorTheme.dark})`,
                  boxShadow: `0 12px 26px -6px ${currentColorTheme.glow}`,
                }}
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Pill CTA: Download CV + Modal Preview */}
              <div
                className="inline-flex items-center rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-[1.75px] shadow-sm transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                style={{ borderColor: `${currentColorTheme.primary}90` }}
              >
                <a
                  href={profileData.resumePath}
                  download="Prabhu_P_FullStack_Resume.pdf"
                  className="inline-flex items-center gap-2 pl-5 pr-3.5 py-3 text-sm sm:text-[15px] font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <Download
                    className="w-4 h-4"
                    style={{ color: currentColorTheme.primary }}
                  />
                  <span>Download CV</span>
                </a>
                <span className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
                <button
                  type="button"
                  onClick={onOpenResumePreview}
                  aria-label="Preview Resume"
                  title="Preview Resume"
                  className="pl-3 pr-4 py-3 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Clean Compact Social Circles */}
              <div className="flex items-center gap-2 pl-0.5">
                {[
                  {
                    social: profileData.socials.find((s) => s.icon === "linkedin"),
                    Icon: Linkedin,
                    colorClass: "text-[#0A66C2]",
                    label: "LinkedIn Profile",
                  },
                  {
                    social: profileData.socials.find((s) => s.icon === "github"),
                    Icon: Github,
                    colorClass: "text-slate-800 dark:text-slate-100",
                    label: "GitHub Profile",
                  },
                ]
                  .filter((item) => item.social?.url)
                  .map(({ social, Icon, colorClass, label }) => (
                    <a
                      key={label}
                      href={social!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-11 h-11 rounded-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-700/70 flex items-center justify-center ${colorClass} shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Creative Studio Portrait Composition + Floating Widgets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[335px] sm:max-w-[420px] lg:max-w-[450px] aspect-square flex items-center justify-center">
              {/* Organic Gradient Blob Backing */}
              <div
                className="absolute w-[82%] h-[82%] opacity-30 dark:opacity-30 blur-[2px] transition-all duration-700"
                style={{
                  background: `linear-gradient(145deg, ${currentColorTheme.accent}, ${currentColorTheme.primary})`,
                  borderRadius: "58% 42% 48% 52% / 44% 52% 48% 56%",
                  transform: "rotate(-10deg)",
                }}
              />

              {/* Crisp Tilted Orbital Ellipse Ring */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 400"
                fill="none"
                aria-hidden="true"
              >
                <ellipse
                  cx="200"
                  cy="200"
                  rx="182"
                  ry="88"
                  transform="rotate(-28 200 200)"
                  stroke={currentColorTheme.primary}
                  strokeOpacity="0.42"
                  strokeWidth="1.6"
                />
                <circle
                  cx="52"
                  cy="275"
                  r="4.5"
                  fill={currentColorTheme.primary}
                  opacity="0.7"
                />
                <circle
                  cx="346"
                  cy="122"
                  r="3.5"
                  fill={currentColorTheme.accent}
                  opacity="0.75"
                />
              </svg>

              {/* Center Seamless Studio Circular Portrait */}
              <div className="relative z-10 w-[13.5rem] h-[13.5rem] sm:w-[16.5rem] sm:h-[16.5rem] xl:w-[18rem] xl:h-[18rem] rounded-full p-1.5 bg-white/95 dark:bg-slate-900/95 shadow-[0_24px_55px_-12px_rgba(15,23,42,0.28)] ring-2 ring-white/90 dark:ring-slate-700/70">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={profileData.avatar}
                    alt={`${profileData.name} - Full Stack Developer`}
                    fill
                    priority
                    sizes="(max-width: 640px) 220px, (max-width: 1280px) 264px, 288px"
                    className="object-cover object-top scale-[1.09]"
                  />
                  {/* Soft Studio Edge Vignette for Seamless Finish */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(to top, rgba(15,23,42,0.55), transparent)"
                        : "linear-gradient(to top, rgba(255,255,255,0.45), transparent)",
                    }}
                  />
                </div>
              </div>

              {/* Floating Widget 1: Top-Left Dark Code Mantra Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="absolute top-3 left-0 sm:top-5 sm:-left-1 z-20 -rotate-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700/70 shadow-[0_16px_32px_-8px_rgba(15,23,42,0.45)] px-3 py-2 sm:px-4 sm:py-2.5 backdrop-blur-md"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-mono text-xs sm:text-sm font-extrabold"
                    style={{ color: currentColorTheme.accent }}
                  >
                    &lt;/&gt;
                  </span>
                  <Sparkles className="w-3 h-3 text-amber-300 opacity-85" />
                </div>
                <p className="mt-0.5 text-[10px] sm:text-xs font-medium italic text-slate-200 tracking-wide whitespace-nowrap">
                  Build. Innovate. Grow.
                </p>
              </motion.div>

              {/* Floating Widget 2: Right Glassmorphic Tech Stack Card */}
              <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32, duration: 0.45 }}
                className="absolute right-0 sm:-right-2 top-8 sm:top-10 z-20 rotate-2"
              >
                {/* Decorative Curved Pointer Arrow above Stack Card */}
                <svg
                  className="hidden sm:block w-8 h-8 ml-auto mr-5 -mb-1.5 text-slate-400 dark:text-slate-500"
                  viewBox="0 0 36 36"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 6C17 7 24 14 23 26M23 26L18.5 21.5M23 26L27.5 21.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="w-[106px] sm:w-[138px] rounded-xl sm:rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/85 dark:border-slate-700/70 shadow-[0_18px_36px_-10px_rgba(15,23,42,0.18)] p-2.5 sm:p-3.5">
                  <ul className="space-y-1.5 sm:space-y-2">
                    {TECH_STACK_PREVIEW.map((tech) => (
                      <li
                        key={tech.name}
                        className="flex items-center gap-2 text-[10.5px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        {tech.iconSrc ? (
                          <span className="relative w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0 flex items-center justify-center">
                            <Image
                              src={tech.iconSrc}
                              alt={tech.name}
                              width={18}
                              height={18}
                              className="w-full h-full object-contain"
                            />
                          </span>
                        ) : (
                          <span className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-[9px] sm:text-[10px] flex items-center justify-center flex-shrink-0">
                            N
                          </span>
                        )}
                        <span className="truncate">{tech.name}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-1.5 pt-1 border-t border-slate-100 dark:border-slate-800 text-[9.5px] sm:text-[11px] font-medium italic text-slate-400 dark:text-slate-500">
                    ... and more!
                  </p>
                </div>
              </motion.div>

              {/* Floating Widget 3: Bottom-Right Developer Mini Laptop */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.45 }}
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-4 z-20"
              >
                <MiniDeveloperLaptop accentColor={currentColorTheme.accent} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Unified Frosted-Glass KPI Dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 sm:mt-8 lg:mt-10 w-full rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl border border-white/95 dark:border-slate-800/80 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.1)]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {profileData.stats.map((stat, idx) => {
              const badge = KPI_ICONS[idx % KPI_ICONS.length];
              const IconComponent = badge.Icon;

              // Responsive internal borders so mobile shows 2x2 crosshairs and desktop shows 1x4 dividers
              const borderClasses = [
                idx % 2 === 0 ? "border-r border-slate-200/70 dark:border-slate-800/80" : "",
                idx < 2 ? "border-b lg:border-b-0 border-slate-200/70 dark:border-slate-800/80" : "",
                idx < 3 ? "lg:border-r lg:border-slate-200/70 dark:lg:border-slate-800/80" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={stat.label}
                  className={`flex items-center gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:py-5 transition-colors hover:bg-white/60 dark:hover:bg-slate-800/40 ${borderClasses}`}
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${
                        idx === 0 ? currentColorTheme.accent : badge.tintFrom
                      }, ${idx === 0 ? currentColorTheme.primary : badge.tintTo})`,
                    }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xl sm:text-2xl lg:text-[1.7rem] font-black tracking-tight text-slate-900 dark:text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
