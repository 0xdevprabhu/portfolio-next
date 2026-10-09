"use client";

import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { useTheme } from "../theme/ThemeProvider";
import { ArrowUp, Heart, Github, Linkedin, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  const { currentColorTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-600 dark:text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:items-start items-center space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: currentColorTheme.primary }}
            />
            <span className="font-bold text-slate-900 dark:text-white text-base">
              Prabhu P.
            </span>
            <span className="text-xs text-slate-400">| Full Stack Developer</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            &copy; {currentYear} Prabhu P. All rights reserved. Sivakasi, Tamil Nadu, India.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/0xdevprabhu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/0xdevprabhu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/in__prabhu/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://www.youtube.com/@PrabhuP-s9l"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href="mailto:0xdevprabhu@gmail.com"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Scroll to Top"
        >
          <span>Back to Top</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
