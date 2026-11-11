"use client";

import React, { useState, useEffect } from "react";
import { profileData } from "@/data/profile";
import { useTheme } from "../theme/ThemeProvider";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Youtube,
} from "lucide-react";

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Me" },
  { href: "#skills", label: "Skills & GitHub" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_TILES = [
  {
    name: "GitHub",
    handle: "@0xdevprabhu",
    href: "https://github.com/0xdevprabhu",
    Icon: Github,
    accentClass: "group-hover:text-slate-900 dark:group-hover:text-white",
  },
  {
    name: "LinkedIn",
    handle: "in/0xdevprabhu",
    href: "https://www.linkedin.com/in/0xdevprabhu",
    Icon: Linkedin,
    accentClass: "group-hover:text-[#0A66C2]",
  },
  {
    name: "WhatsApp",
    handle: "Quick Chat",
    href: "https://wa.me/919344095995",
    Icon: MessageCircle,
    accentClass: "group-hover:text-emerald-500",
  },
  {
    name: "Instagram",
    handle: "@in__prabhu",
    href: "https://www.instagram.com/in__prabhu/?hl=en",
    Icon: Instagram,
    accentClass: "group-hover:text-pink-500",
  },
  {
    name: "YouTube",
    handle: "@PrabhuP-s9l",
    href: "https://www.youtube.com/@PrabhuP-s9l",
    Icon: Youtube,
    accentClass: "group-hover:text-red-500",
  },
  {
    name: "Email",
    handle: "Direct Mail",
    href: "mailto:0xdevprabhu@gmail.com",
    Icon: Mail,
    accentClass: "group-hover:text-sky-500",
  },
];

function BackToTopRingButton({
  primaryColor,
  accentColor,
  scrollPercent,
  onClick,
}: {
  primaryColor: string;
  accentColor: string;
  scrollPercent: number;
  onClick: () => void;
}) {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (Math.min(100, Math.max(0, scrollPercent)) / 100) * circumference;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll back to top"
      className="group w-fit sm:w-auto inline-flex items-center justify-center gap-3 pl-2.5 pr-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/85 dark:border-slate-700/80 shadow-[0_12px_30px_-8px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
    >
      {/* Circular Live Scroll Progress Ring */}
      <span className="relative w-9 h-9 flex items-center justify-center shrink-0">
        <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>
        <span
          className="absolute inset-1.5 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})`,
          }}
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </span>
      </span>

      <span className="flex flex-col items-start text-left leading-tight">
        <span className="text-xs font-bold text-slate-900 dark:text-white">
          Back to Top
        </span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
          {Math.round(scrollPercent)}% explored
        </span>
      </span>
    </button>
  );
}

export function Footer() {
  const { currentColorTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [istTime, setIstTime] = useState<string>("");
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setIstTime(formatted);
      } catch {
        setIstTime("IST");
      }
    };

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollPercent(100);
        return;
      }
      setScrollPercent(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };

    updateClock();
    updateScroll();

    const clockInterval = setInterval(updateClock, 30000);
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      clearInterval(clockInterval);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.substring(1);
    const el = document.getElementById(id);
    const targetTop =
      id === "home" || !el
        ? 0
        : Math.max(0, el.getBoundingClientRect().top + window.scrollY - 24);
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${profileData.email}`;
    }
  };

  return (
    <footer className="relative pt-14 pb-28 lg:pb-10 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-[#f8faff] to-[#eef2ff]/60 dark:from-slate-950 dark:via-slate-950 dark:to-[#030712] text-slate-600 dark:text-slate-400 w-full max-w-full overflow-hidden">
      {/* Subtle Ambient Theme Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-24 left-1/4 w-[420px] h-[240px] rounded-full blur-[120px] opacity-15 dark:opacity-20"
          style={{ backgroundColor: currentColorTheme.accent }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[380px] h-[240px] rounded-full blur-[120px] opacity-15 dark:opacity-15"
          style={{ backgroundColor: currentColorTheme.primary }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Top Out-of-the-Box Studio CTA Banner */}
        <div
          className="relative overflow-hidden rounded-[2rem] bg-white/90 dark:bg-slate-900/90 border border-white/95 dark:border-slate-800 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.1)] backdrop-blur-xl p-6 sm:p-8 lg:p-10"
        >
          <div
            className="absolute top-0 inset-x-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${currentColorTheme.accent}, ${currentColorTheme.primary}, ${currentColorTheme.dark})`,
            }}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open for Freelance Projects &amp; Full-Stack Roles</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                Have a project in mind?{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(110deg, ${currentColorTheme.primary}, ${currentColorTheme.accent})`,
                  }}
                >
                  Let&apos;s build it together.
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Custom business websites, scalable LAMP &amp; Next.js SaaS platforms, and
                AI-driven web applications from Sivakasi to anywhere worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${currentColorTheme.accent}, ${currentColorTheme.primary}, ${currentColorTheme.dark})`,
                  boxShadow: `0 12px 24px -6px ${currentColorTheme.glow}`,
                }}
              >
                <span>Start a Conversation</span>
                <Send className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 transition-all"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Email Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy
                      className="w-4 h-4"
                      style={{ color: currentColorTheme.primary }}
                    />
                    <span>{profileData.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Middle Bento Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand Identity + Live Local Time */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${currentColorTheme.accent}, ${currentColorTheme.primary})`,
                }}
              >
                P
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                    Prabhu P.
                  </span>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      backgroundColor: `${currentColorTheme.primary}15`,
                      color: currentColorTheme.primary,
                    }}
                  >
                    @0xdevprabhu
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Full Stack Developer @ {profileData.company}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Certified LAMP Stack Specialist &amp; Freelance Web Architect crafting secure,
              fast, modern digital experiences engineered for real-world scale.
            </p>

            {/* Live Sivakasi Location & Local Time Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-xs">
                <MapPin className="w-3.5 h-3.5" style={{ color: currentColorTheme.primary }} />
                <span>Sivakasi, TN, India</span>
              </span>

              {istTime && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{istTime} IST</span>
                </span>
              )}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles
                className="w-3.5 h-3.5"
                style={{ color: currentColorTheme.primary }}
              />
              <span>Navigate</span>
            </h4>

            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tactile Bento Social Grid */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Connect Everywhere
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2.5">
              {SOCIAL_TILES.map(({ name, handle, href, Icon, accentClass }) => (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={name}
                  className="group flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 min-w-0"
                >
                  <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 transition-colors">
                    <Icon
                      className={`w-4 h-4 text-slate-600 dark:text-slate-300 transition-colors ${accentClass}`}
                    />
                  </span>
                  <div className="min-w-0 leading-tight">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Architectural Bar + Progress Back-to-Top Capsule */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <p className="font-medium text-slate-700 dark:text-slate-300">
              &copy; {currentYear} Prabhu P. All rights reserved.
            </p>
            <p>
              Crafted with Next.js, TypeScript &amp; Tailwind CSS in Sivakasi, India.
            </p>
          </div>

          <BackToTopRingButton
            primaryColor={currentColorTheme.primary}
            accentColor={currentColorTheme.accent}
            scrollPercent={scrollPercent}
            onClick={scrollToTop}
          />
        </div>

        {/* Subtle Oversized Ambient Signature Watermark */}
        <div
          className="pt-2 select-none pointer-events-none overflow-hidden text-center"
          aria-hidden="true"
        >
          <span
            className="block font-black tracking-[0.14em] text-3xl sm:text-6xl lg:text-[6.25rem] leading-none text-transparent bg-clip-text opacity-15 dark:opacity-15"
            style={{
              backgroundImage: `linear-gradient(180deg, ${currentColorTheme.primary}, transparent)`,
            }}
          >
            0XDEVPRABHU
          </span>
        </div>
      </div>
    </footer>
  );
}
