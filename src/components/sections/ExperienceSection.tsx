"use client";

import React, { useState, useRef } from "react";
import { experiences } from "@/data/experience";
import { useTheme } from "../theme/ThemeProvider";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Eye,
  Building2,
  Layers,
  ChevronLeft,
  ChevronRight,
  MoveRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceSectionProps {
  onOpenCertificatePreview: (
    fileUrl: string | string[],
    title?: string,
    issuer?: string
  ) => void;
}

function getShortPeriodLabel(period: string): string {
  if (period.toLowerCase().includes("present")) return "Now";
  if (period.toLowerCase().includes("graduated")) return "B.E.";
  const match = period.match(/\b(20\d{2})\b/);
  return match ? match[1] : period;
}

export function ExperienceSection({
  onOpenCertificatePreview,
}: ExperienceSectionProps) {
  const { currentColorTheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const activeExp = experiences[activeIndex] || experiences[0];
  const total = experiences.length;

  const handleOpenCert = (exp: (typeof experiences)[number]) => {
    const files =
      exp.certificateFiles && exp.certificateFiles.length > 0
        ? exp.certificateFiles
        : exp.certificateFile
        ? [exp.certificateFile]
        : [];
    onOpenCertificatePreview(
      files,
      `${exp.role} Certification${files.length > 1 ? "s" : ""}`,
      exp.company
    );
  };

  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / total;
    const idx = Math.round(el.scrollLeft / cardWidth);
    if (idx >= 0 && idx < total && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  };

  const scrollToMobileCard = (idx: number) => {
    setActiveIndex(idx);
    const el = mobileScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / total;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  const progressPct = total > 1 ? (activeIndex / (total - 1)) * 100 : 0;

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/40 w-full max-w-full overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10"
            style={{ color: currentColorTheme.primary }}
          >
            My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Experience & Education
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Professional trajectory, engineering roles, internships, and academic foundation.
          </p>
          <div
            className="h-1 w-12 mx-auto rounded-full mt-3"
            style={{ backgroundColor: currentColorTheme.primary }}
          />
        </motion.div>

        {/* ================= DESKTOP: Circuit Metro Rail + Split Glass Spotlight ================= */}
        <div className="hidden md:block space-y-6">
          {/* Elevated Circuit Metro Rail Dock */}
          <div className="relative rounded-3xl bg-white/80 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 px-6 pt-5 pb-6 shadow-sm">
            {/* Top Rail Telemetry Header */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 mb-6">
              <span className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: currentColorTheme.primary }}
                />
                CAREER TIMELINE RAIL // {total} MILESTONES
              </span>
              <span className="font-bold text-slate-600 dark:text-slate-300">
                STATION {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Metro Track & Station Nodes */}
            <div className="relative pt-2">
              {/* Dashed Blueprint Base Track */}
              <div className="absolute left-[7%] right-[7%] top-[26px] h-[2px] border-t-2 border-dashed border-slate-200 dark:border-slate-700/80" />

              {/* Glowing Active Energy Rail */}
              <div className="absolute left-[7%] right-[7%] top-[26px] h-[2px] overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: currentColorTheme.primary,
                    boxShadow: `0 0 12px ${currentColorTheme.primary}`,
                  }}
                  initial={false}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                />
              </div>

              {/* Station Nodes Grid */}
              <div className="relative grid grid-cols-7 gap-2">
                {experiences.map((exp, idx) => {
                  const isActive = idx === activeIndex;
                  const isPassed = idx < activeIndex;
                  const isEducation = exp.type === "education";
                  const isCurrent = idx === 0;

                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className="group relative flex flex-col items-center text-center focus:outline-none"
                    >
                      {/* Node Circle */}
                      <div className="relative flex items-center justify-center">
                        {isCurrent && (
                          <span
                            className="absolute -inset-1.5 rounded-2xl animate-ping opacity-25"
                            style={{ backgroundColor: currentColorTheme.primary }}
                          />
                        )}
                        {isActive && (
                          <motion.span
                            layoutId="metro-active-halo"
                            className="absolute -inset-1.5 rounded-2xl opacity-25 blur-[2px]"
                            style={{ backgroundColor: currentColorTheme.primary }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 26,
                            }}
                          />
                        )}
                        <div
                          className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                            isActive
                              ? "scale-110 shadow-lg text-white"
                              : isPassed
                              ? "bg-white dark:bg-slate-900 text-primary border-primary/50"
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 group-hover:border-primary/60 group-hover:text-primary group-hover:scale-105"
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor: currentColorTheme.primary,
                                  borderColor: currentColorTheme.primary,
                                }
                              : isPassed
                              ? {
                                  color: currentColorTheme.primary,
                                  borderColor: `${currentColorTheme.primary}80`,
                                }
                              : {}
                          }
                        >
                          {isEducation ? (
                            <GraduationCap className="h-4.5 w-4.5" />
                          ) : (
                            <Briefcase className="h-4.5 w-4.5" />
                          )}

                          {/* Tiny Step Number Badge */}
                          <span
                            className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-mono font-bold flex items-center justify-center border ${
                              isActive
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                            }`}
                          >
                            {idx + 1}
                          </span>
                        </div>
                      </div>

                      {/* Year / Milestone Pill */}
                      <span
                        className={`mt-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                        style={
                          isActive ? { color: currentColorTheme.primary } : {}
                        }
                      >
                        {getShortPeriodLabel(exp.period)}
                      </span>

                      {/* Short Role + Company */}
                      <span
                        className={`mt-1 text-[11px] font-bold leading-tight line-clamp-1 px-1 transition-colors ${
                          isActive
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                        }`}
                      >
                        {exp.role.replace(
                          "Bachelor of Engineering (B.E.) - Computer Science & Engineering",
                          "B.E. CSE"
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 px-1">
                        {exp.company.replace(" Pvt. Ltd.", "").replace(" College of Engineering and Technology", " Engg.")}
                      </span>

                      {/* Active Pointer Connector Dot */}
                      {isActive && (
                        <motion.span
                          layoutId="metro-pointer"
                          className="mt-2 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: currentColorTheme.primary }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Split Glass Spotlight Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl bg-white/95 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden"
            >
              {/* Ambient Glow */}
              <div
                className="pointer-events-none absolute -top-28 -right-28 w-72 h-72 rounded-full blur-3xl opacity-15"
                style={{ backgroundColor: currentColorTheme.primary }}
              />

              <div className="relative z-10 grid grid-cols-12">
                {/* Left Telemetry Column */}
                <div className="col-span-4 p-7 bg-slate-50/90 dark:bg-slate-950/55 border-r border-slate-200/70 dark:border-slate-800/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10"
                        style={{ color: currentColorTheme.primary }}
                      >
                        {activeExp.type === "education" ? (
                          <GraduationCap className="h-3 w-3" />
                        ) : (
                          <Briefcase className="h-3 w-3" />
                        )}
                        {activeExp.type}
                      </span>

                      {activeIndex === 0 && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>

                    {/* Watermark Station Number */}
                    <div className="text-5xl font-black font-mono tracking-tighter text-slate-200/90 dark:text-slate-800 select-none leading-none mb-4">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                        <Building2
                          className="h-4 w-4 shrink-0 mt-0.5"
                          style={{ color: currentColorTheme.primary }}
                        />
                        <span>{activeExp.company}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                        <Calendar
                          className="h-3.5 w-3.5"
                          style={{ color: currentColorTheme.primary }}
                        />
                        <span>{activeExp.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Credential Status */}
                  <div className="pt-6 mt-6 border-t border-slate-200/70 dark:border-slate-800/80">
                    {Boolean(
                      activeExp.certificateFile ||
                        (activeExp.certificateFiles &&
                          activeExp.certificateFiles.length > 0)
                    ) ? (
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="h-4 w-4 shrink-0" />
                        <span>Verified Credential Attached</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <Sparkles
                          className="h-4 w-4 shrink-0"
                          style={{ color: currentColorTheme.primary }}
                        />
                        <span>Current Production Role</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Detail Column */}
                <div className="col-span-8 p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                      {activeExp.role}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-3 mb-6">
                      {activeExp.description}
                    </p>

                    {activeExp.skills && activeExp.skills.length > 0 && (
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2.5">
                          Core Stack & Competencies
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeExp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80"
                            >
                              <CheckCircle2
                                className="h-3 w-3 shrink-0"
                                style={{ color: currentColorTheme.primary }}
                              />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action & Station Controls */}
                  <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={activeIndex === 0}
                        onClick={() =>
                          setActiveIndex((i) => Math.max(0, i - 1))
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary disabled:opacity-35 disabled:pointer-events-none transition-colors"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span>Prev</span>
                      </button>
                      <button
                        type="button"
                        disabled={activeIndex === total - 1}
                        onClick={() =>
                          setActiveIndex((i) => Math.min(total - 1, i + 1))
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary disabled:opacity-35 disabled:pointer-events-none transition-colors"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {Boolean(
                      activeExp.certificateFile ||
                        (activeExp.certificateFiles &&
                          activeExp.certificateFiles.length > 0)
                    ) && (
                      <button
                        type="button"
                        onClick={() => handleOpenCert(activeExp)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: currentColorTheme.primary }}
                      >
                        {activeExp.certificateFiles &&
                        activeExp.certificateFiles.length > 1 ? (
                          <Layers className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                        <span>
                          {activeExp.certificateFiles &&
                          activeExp.certificateFiles.length > 1
                            ? `View Verified Certificates (${activeExp.certificateFiles.length})`
                            : "View Verified Certificate"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= MOBILE: Milestone Jump Chips + Story Progress + Swipeable Cards ================= */}
        <div className="md:hidden">
          {/* Quick Milestone Year/Step Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => scrollToMobileCard(idx)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold shrink-0 transition-all ${
                    isActive
                      ? "text-white shadow-xs"
                      : "bg-white dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: currentColorTheme.primary }
                      : {}
                  }
                >
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                  <span>&middot;</span>
                  <span>{getShortPeriodLabel(exp.period)}</span>
                </button>
              );
            })}
          </div>

          {/* Story Progress Bar + Swipe Hint */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex-1 flex items-center gap-1.5">
              {experiences.map((exp, idx) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => scrollToMobileCard(idx)}
                  aria-label={`View ${exp.role}`}
                  className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: idx === activeIndex ? "100%" : "0%",
                      backgroundColor: currentColorTheme.primary,
                    }}
                  />
                </button>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 shrink-0">
              Swipe <MoveRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Horizontal Swipeable Story Deck */}
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {experiences.map((exp, idx) => {
              const isEducation = exp.type === "education";
              return (
                <div
                  key={exp.id}
                  className="w-[85vw] shrink-0 snap-center rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden flex flex-col justify-between"
                >
                  {/* Mini Timeline Rail Top Strip inside Card */}
                  <div className="px-5 py-3 bg-slate-50/90 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold text-white"
                        style={{ backgroundColor: currentColorTheme.primary }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase"
                        style={{ color: currentColorTheme.primary }}
                      >
                        {isEducation ? (
                          <GraduationCap className="h-3 w-3" />
                        ) : (
                          <Briefcase className="h-3 w-3" />
                        )}
                        {exp.type}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      {exp.period}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mt-1">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>{exp.company}</span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                        {exp.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700/70"
                            >
                              {skill}
                            </span>
                          ))}
                          {exp.skills.length > 4 && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                              +{exp.skills.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {Boolean(
                        exp.certificateFile ||
                          (exp.certificateFiles &&
                            exp.certificateFiles.length > 0)
                      ) && (
                        <button
                          type="button"
                          onClick={() => handleOpenCert(exp)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-xs"
                          style={{ backgroundColor: currentColorTheme.primary }}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>
                            {exp.certificateFiles &&
                            exp.certificateFiles.length > 1
                              ? `View Certificates (${exp.certificateFiles.length})`
                              : "View Certificate"}
                          </span>
                        </button>
                      )}

                      {idx === 0 && (
                        <div className="text-center text-[10px] font-mono text-emerald-500 font-semibold">
                          ● CURRENTLY ACTIVE
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
