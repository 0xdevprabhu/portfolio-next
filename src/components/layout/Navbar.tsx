"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "../theme/ThemeProvider";
import {
  Home,
  User,
  Layers,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  FileDown,
  Palette,
  Menu,
  X,
  Send,
} from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Layers },
  { href: "#experience", label: "Experience", icon: GraduationCap },
  { href: "#projects", label: "Projects", icon: Briefcase },
  { href: "#certifications", label: "Certificates", icon: Award },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const { currentColorTheme, setIsThemeCustomizerOpen } = useTheme();

  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollLockRef = useRef<{
    target: string;
    targetTop: number;
    expiresAt: number;
  } | null>(null);

  const handleSectionNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();

      const sectionId = href.substring(1);
      setIsMobileMenuOpen(false);
      setActiveSection(sectionId);

      const el = document.getElementById(sectionId);
      const targetTop =
        sectionId === "home" || !el
          ? 0
          : Math.max(0, el.getBoundingClientRect().top + window.scrollY - 24);

      scrollLockRef.current = {
        target: sectionId,
        targetTop,
        expiresAt: Date.now() + 900,
      };

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", href);
      }
    },
    []
  );

  useEffect(() => {
    const clearLockOnManualInput = () => {
      scrollLockRef.current = null;
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 15);

      if (scrollLockRef.current) {
        const { targetTop, expiresAt } = scrollLockRef.current;
        if (Math.abs(scrollPos - targetTop) <= 10 || Date.now() > expiresAt) {
          scrollLockRef.current = null;
        } else {
          return;
        }
      }

      if (scrollPos < 60) {
        setActiveSection("home");
        return;
      }

      const isNearBottom =
        window.innerHeight + scrollPos >= document.documentElement.scrollHeight - 60;
      if (isNearBottom) {
        setActiveSection("contact");
        return;
      }

      const focusLine = scrollPos + Math.min(window.innerHeight * 0.35, 260);
      let currentMatched = "home";

      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const el = document.getElementById(sectionId);
        if (el) {
          const sectionTop = el.getBoundingClientRect().top + scrollPos;
          if (sectionTop <= focusLine) {
            currentMatched = sectionId;
          }
        }
      }

      setActiveSection(currentMatched);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", clearLockOnManualInput, { passive: true });
    window.addEventListener("touchstart", clearLockOnManualInput, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", clearLockOnManualInput);
      window.removeEventListener("touchstart", clearLockOnManualInput);
    };
  }, []);

  return (
    <>
      {/* Top Header Bar — Pinned Permanently at the Top */}
      <header
        className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs"
            : "bg-white/80 dark:bg-slate-900/80 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-slate-200/40 dark:border-slate-800/40 sm:border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo / Brand */}
          <Link
            href="#home"
            onClick={(e) => handleSectionNavigate(e, "#home")}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0"
          >
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md transition-transform group-hover:scale-105 shrink-0"
              style={{ backgroundColor: currentColorTheme.primary }}
            >
              P
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base md:text-lg tracking-tight text-slate-900 dark:text-white leading-none whitespace-nowrap">
                Prabhu P.
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 whitespace-nowrap">
                Full Stack &amp; LAMP
              </span>
            </div>
          </Link>

          {/* Desktop Top Nav — Crisp Fixed-Icon Width-Expanding Pill */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 bg-white/95 dark:bg-slate-900/90 p-1.5 rounded-full border border-slate-200/85 dark:border-slate-700/70 shadow-sm backdrop-blur-xl"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSectionNavigate(e, link.href)}
                  aria-label={link.label}
                  title={link.label}
                  className={`flex items-center justify-center rounded-full py-2 text-xs transition-[background-color,color,padding,box-shadow] duration-300 ease-out select-none ${
                    isActive
                      ? "px-4 text-white font-semibold shadow-sm"
                      : "px-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: currentColorTheme.primary }
                      : undefined
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span
                    className="grid transition-[grid-template-columns,opacity,margin] duration-300 ease-out"
                    style={{
                      gridTemplateColumns: isActive ? "1fr" : "0fr",
                      opacity: isActive ? 1 : 0,
                      marginLeft: isActive ? "8px" : "0px",
                    }}
                  >
                    <span className="min-w-0 overflow-hidden whitespace-nowrap leading-none py-0.5">
                      {link.label}
                    </span>
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Desktop (Theme Modal Trigger + Let's Talk), Mobile (Let's Talk + Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Desktop Theme Customizer Button (holds Dark/Light, Fast-Track, & Colors inside modal) */}
            <button
              type="button"
              onClick={() => setIsThemeCustomizerOpen(true)}
              aria-label="Open Theme & Display Settings"
              title="Theme, Dark Mode & Fast-Track"
              className="hidden lg:flex items-center justify-center p-2.5 rounded-full bg-white/95 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/85 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-xs transition-all hover:scale-105"
            >
              <Palette className="h-4 w-4" style={{ color: currentColorTheme.primary }} />
            </button>

            {/* Primary Contact CTA: Let's Talk Pill */}
            <a
              href="#contact"
              onClick={(e) => handleSectionNavigate(e, "#contact")}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#070b2b] hover:bg-[#11194d] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs sm:text-[13px] font-bold shadow-[0_6px_18px_-4px_rgba(7,11,43,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>Let&apos;s Talk</span>
              <Send className="h-3.5 w-3.5 shrink-0" />
            </a>

            {/* Mobile Burger Toggle Only */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 lg:hidden rounded-xl bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-2 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSectionNavigate(e, link.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-white font-semibold shadow-xs"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  style={isActive ? { backgroundColor: currentColorTheme.primary } : {}}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              );
            })}

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsThemeCustomizerOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
              >
                <Palette className="h-4 w-4" style={{ color: currentColorTheme.primary }} />
                <span>Theme &amp; Mode</span>
              </button>

              <a
                href="/assets/documents/Prabhu's_Resume.pdf"
                download
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-white shadow-sm"
                style={{ backgroundColor: currentColorTheme.primary }}
              >
                <FileDown className="h-4 w-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Navigation Bar for Mobile Phones — Centered & Contained */}
      <div className="lg:hidden fixed bottom-4 inset-x-0 px-4 z-40 pointer-events-none flex justify-center">
        <div className="w-full max-w-sm bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-full border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-1.5 flex items-center justify-around pointer-events-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionNavigate(e, link.href)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md scale-110"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                style={isActive ? { backgroundColor: currentColorTheme.primary } : {}}
                aria-label={link.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
