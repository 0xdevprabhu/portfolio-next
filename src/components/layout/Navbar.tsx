"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "../theme/ThemeProvider";
import {
  Home,
  User,
  Layers,
  Award,
  Briefcase,
  Mail,
  Zap,
  Moon,
  Sun,
  FileDown,
  Palette,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Layers },
  { href: "#certifications", label: "Certificates", icon: Award },
  { href: "#projects", label: "Projects", icon: Briefcase },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const {
    isDarkMode,
    toggleDarkMode,
    currentColorTheme,
    setIsThemeCustomizerOpen,
    isFastTrack,
    toggleFastTrack,
  } = useTheme();

  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-xs"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md transition-transform group-hover:scale-105"
              style={{ backgroundColor: currentColorTheme.primary }}
            >
              P
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                Prabhu P.
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                Full Stack & LAMP
              </span>
            </div>
          </Link>

          {/* Desktop Top Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-xs font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  style={isActive ? { backgroundColor: currentColorTheme.primary } : {}}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Recruiter Fast-Track Button */}
            <button
              onClick={toggleFastTrack}
              title="Toggle Recruiter Fast-Track Mode"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isFastTrack
                  ? "bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-600"
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${isFastTrack ? "fill-white" : ""}`} />
              <span className="hidden sm:inline">Fast-Track</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 sm:p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>

            {/* Palette Trigger */}
            <button
              onClick={() => setIsThemeCustomizerOpen(true)}
              aria-label="Change theme colors"
              className="p-2 sm:p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Palette className="h-4 w-4 text-primary" />
            </button>

            {/* Resume Quick Link */}
            <a
              href="/assets/documents/Prabhu's_Resume.pdf"
              download
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white shadow-xs transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: currentColorTheme.primary }}
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Burger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 lg:hidden rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-white font-semibold shadow-xs"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  style={isActive ? { backgroundColor: currentColorTheme.primary } : {}}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <a
              href="/assets/documents/Prabhu's_Resume.pdf"
              download
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm mt-3"
              style={{ backgroundColor: currentColorTheme.primary }}
            >
              <FileDown className="h-4 w-4" />
              <span>Download CV</span>
            </a>
          </div>
        )}
      </header>

      {/* Floating Bottom Navigation Bar for Mobile Phones (App Style per portfolio-main) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-full border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-2 flex items-center justify-around">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md scale-110"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                style={isActive ? { backgroundColor: currentColorTheme.primary } : {}}
                aria-label={link.label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
