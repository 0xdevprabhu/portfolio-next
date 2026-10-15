"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { useTheme } from "../theme/ThemeProvider";
import {
  FileDown,
  Eye,
  ArrowRight,
  Linkedin,
  Github,
  MapPin,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenResumePreview: () => void;
}

export function HeroSection({ onOpenResumePreview }: HeroSectionProps) {
  const { currentColorTheme, isFastTrack } = useTheme();

  // Typing animation state
  const roles = profileData.rolesToType;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentFullRole.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullRole.slice(0, displayedText.length + 1));
        }, 90);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullRole.slice(0, displayedText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decorative Ambient Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] rounded-full blur-[120px] pointer-events-none opacity-20 dark:opacity-25 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentColorTheme.primary} 0%, ${currentColorTheme.accent} 100%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center z-10">
        {/* Recruiter Fast-Track Banner (if active) */}
        {isFastTrack && (
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Recruiter Fast-Track Mode Active — Executive Highlights Enabled</span>
          </div>
        )}

        {/* Profile Avatar with Ambient Glow Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative group mb-8"
        >
          <div
            className="absolute -inset-1.5 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow"
            style={{
              background: `linear-gradient(135deg, ${currentColorTheme.primary}, ${currentColorTheme.accent})`,
            }}
          />
          <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden p-1 bg-white dark:bg-slate-900 shadow-2xl">
            <Image
              src={profileData.avatar}
              alt="Prabhu P - Full Stack Developer"
              width={160}
              height={160}
              priority
              className="h-full w-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Status Badge */}
          <div className="absolute bottom-1 right-1 flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-full shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">
              Open to Roles
            </span>
          </div>
        </motion.div>

        {/* Greeting & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 max-w-3xl"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Hello, I am
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Prabhu P.
          </h1>

          {/* Animated Typing Text with Fixed Height to Prevent Layout Shift */}
          <div className="h-10 sm:h-14 flex items-center justify-center">
            <span
              className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${currentColorTheme.primary}, ${currentColorTheme.dark})`,
              }}
            >
              {displayedText}
            </span>
            <span
              className="inline-block w-[3px] sm:w-[4px] h-6 sm:h-8 ml-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: currentColorTheme.primary }}
            />
          </div>

          {/* Bio Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto pt-2">
            Certified LAMP Stack Specialist & Full Stack Developer at{" "}
            <span
              className="font-semibold underline decoration-2 underline-offset-4"
              style={{ color: currentColorTheme.primary }}
            >
              {profileData.company}
            </span>
            . Passionate about building secure, AI-integrated web solutions and scalable web architectures.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Sivakasi, Tamil Nadu, India</span>
          </div>
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: currentColorTheme.primary,
              boxShadow: `0 8px 25px ${currentColorTheme.primary}55`,
            }}
          >
            <span>My Works</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="https://www.linkedin.com/in/0xdevprabhu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95"
          >
            <Linkedin className="h-4 w-4 text-sky-600" />
            <span>LinkedIn</span>
          </a>

          {/* Resume Download & Preview Button Group */}
          <div className="flex items-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 shadow-sm">
            <a
              href={profileData.resumePath}
              download
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-primary transition-colors"
            >
              <FileDown className="h-4 w-4 text-emerald-600" />
              <span>Download CV</span>
            </a>
            <button
              onClick={onOpenResumePreview}
              title="Interactive Live Resume Preview"
              aria-label="Preview Resume in modal"
              className="p-2.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Key Highlights / Stats Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80"
        >
          {profileData.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xs"
            >
              <span
                className="text-xl sm:text-2xl font-extrabold"
                style={{ color: currentColorTheme.primary }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
