"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectsData, utilityToolsData, workflowSteps } from "@/data/projects";
import { Project } from "@/types";
import { useTheme } from "../theme/ThemeProvider";
import {
  ExternalLink,
  Github,
  Building,
  User,
  Wrench,
  PenTool,
  Database,
  Server,
  Layout,
  Rocket,
  ArrowRight,
  Sparkles,
  MoveRight,
} from "lucide-react";
import { motion } from "framer-motion";

function extractHostname(url?: string): string {
  if (!url) return "localhost:3000";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "preview.app";
  }
}

interface BentoProjectCardProps {
  project: Project;
  idx: number;
  isFeaturedBento: boolean;
  primaryColor: string;
}

function BentoProjectCard({
  project,
  idx,
  isFeaturedBento,
  primaryColor,
}: BentoProjectCardProps) {
  const isPersonal = project.category === "personal";
  const isAI = project.badge?.toLowerCase().includes("ai");
  const hostname = extractHostname(project.liveUrl);
  const maxVisibleTags = isFeaturedBento ? 4 : 3;
  const visibleTags = project.tags.slice(0, maxVisibleTags);
  const hiddenCount = Math.max(0, project.tags.length - maxVisibleTags);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: Math.min(idx * 0.07, 0.35), ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl overflow-hidden bg-white/95 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 w-[84vw] sm:w-[70vw] md:w-auto shrink-0 snap-center flex flex-col ${
        isFeaturedBento ? "md:col-span-2 lg:flex-row" : ""
      }`}
    >
      {/* Dynamic Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--primary) 16%, transparent), transparent 65%)",
        }}
      />

      {/* Browser Frame Preview */}
      <div
        className={`relative flex flex-col bg-slate-100 dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800/80 overflow-hidden ${
          isFeaturedBento
            ? "lg:w-[54%] lg:border-b-0 lg:border-r shrink-0"
            : "w-full"
        }`}
      >
        {/* Mini Browser Top Bar */}
        <div className="h-8 px-3.5 flex items-center justify-between bg-slate-50/95 dark:bg-slate-900/95 border-b border-slate-200/70 dark:border-slate-800/80 z-20">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400/85" />
            <span className="w-2 h-2 rounded-full bg-amber-400/85" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/85" />
          </div>

          <div className="px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800/90 text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[155px]">
            {hostname}
          </div>

          <span className="flex items-center gap-1 text-[9px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Screenshot Container */}
        <div
          className={`relative w-full overflow-hidden ${
            isFeaturedBento ? "h-48 sm:h-56 lg:h-full lg:min-h-[260px]" : "h-44 sm:h-48"
          }`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes={
              isFeaturedBento
                ? "(max-width: 768px) 85vw, (max-width: 1200px) 80vw, 55vw"
                : "(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 33vw"
            }
          />

          {/* Subtle Gradient Overlay + Desktop Hover Quick Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-between p-4 z-20">
            <div className="flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span>Visit Live</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-[11px] font-bold shadow-lg hover:bg-white transition-transform hover:scale-105"
                >
                  <Github className="h-3 w-3" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Floating Category / Featured Badge */}
          <div className="absolute top-3 left-3 z-20">
            {isPersonal ? (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-md backdrop-blur-md"
                style={{ backgroundColor: `${primaryColor}e6` }}
              >
                {isAI ? (
                  <Sparkles className="h-3 w-3" />
                ) : (
                  <User className="h-3 w-3" />
                )}
                <span>{project.badge || "Personal"}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700/70 backdrop-blur-md shadow-xs">
                <Building className="h-3 w-3 text-primary" />
                <span>{isFeaturedBento ? "Featured Production" : "Noxlay Cyber Tech"}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="relative z-20 p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4">
        <div>
          {isFeaturedBento && (
            <span
              className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5"
              style={{ color: primaryColor }}
            >
              Spotlight Architecture
            </span>
          )}
          <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            {project.title}
          </h4>
          <p
            className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed ${
              isFeaturedBento ? "line-clamp-4" : "line-clamp-3"
            }`}
          >
            {project.description}
          </p>
        </div>

        <div className="space-y-4 pt-1">
          {/* Clean Tech Pills + Overflow Counter */}
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80"
              >
                {tag}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded-lg bg-primary/10 text-primary">
                +{hiddenCount}
              </span>
            )}
          </div>

          {/* Persistent Footer Links (Accessible on Mobile & Desktop) */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                  style={{ color: primaryColor }}
                >
                  <span>Live Preview</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>Source</span>
                </a>
              )}
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { currentColorTheme } = useTheme();
  const [filter, setFilter] = useState<"all" | "company" | "personal" | "tool">("all");

  const companyProjects = projectsData.filter((p) => p.category === "company");
  const personalProjects = projectsData.filter((p) => p.category === "personal");

  const workflowIcons = [PenTool, Database, Server, Layout, Rocket];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10"
            style={{ color: currentColorTheme.primary }}
          >
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Recent Projects & Production Work
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Real enterprise applications, commercial e-commerce stores, intelligent tools, and personal systems.
          </p>
          <div
            className="h-1 w-12 mx-auto rounded-full mt-3"
            style={{ backgroundColor: currentColorTheme.primary }}
          />

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === "all"
                  ? "text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={filter === "all" ? { backgroundColor: currentColorTheme.primary } : {}}
            >
              All Projects ({projectsData.length})
            </button>
            <button
              onClick={() => setFilter("company")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === "company"
                  ? "text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={filter === "company" ? { backgroundColor: currentColorTheme.primary } : {}}
            >
              Noxlay Cyber Tech ({companyProjects.length})
            </button>
            <button
              onClick={() => setFilter("personal")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === "personal"
                  ? "text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={filter === "personal" ? { backgroundColor: currentColorTheme.primary } : {}}
            >
              Personal & AI Innovations ({personalProjects.length})
            </button>
            <button
              onClick={() => setFilter("tool")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === "tool"
                  ? "text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={filter === "tool" ? { backgroundColor: currentColorTheme.primary } : {}}
            >
              Utility Tools ({utilityToolsData.length})
            </button>
          </div>
        </motion.div>

        {/* 1. Noxlay Cyber Tech Production Projects (Bento Grid Desktop + Snap Carousel Mobile) */}
        {(filter === "all" || filter === "company") && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 gap-2">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Noxlay Cyber Tech Projects
                </h3>
              </div>
              <span className="inline-flex md:hidden items-center gap-1 text-[11px] font-mono text-slate-400">
                Swipe <MoveRight className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid-cols-2 lg:grid-cols-3 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {companyProjects.map((project, idx) => (
                <BentoProjectCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  isFeaturedBento={idx === 0}
                  primaryColor={currentColorTheme.primary}
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. Personal & AI Projects (Bento Grid Desktop + Snap Carousel Mobile) */}
        {(filter === "all" || filter === "personal") && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" style={{ color: currentColorTheme.primary }} />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Personal Innovations & AI Engineering
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Independent full-stack architectures & AI tools
                </span>
                <span className="inline-flex md:hidden items-center gap-1 text-[11px] font-mono text-slate-400">
                  Swipe <MoveRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid-cols-2 lg:grid-cols-3 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {personalProjects.map((project, idx) => (
                <BentoProjectCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  isFeaturedBento={idx === 0}
                  primaryColor={currentColorTheme.primary}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. Frontend Utility Tools */}
        {(filter === "all" || filter === "tool") && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 gap-2">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Frontend Utility Tools
                </h3>
              </div>
              <span className="inline-flex sm:hidden items-center gap-1 text-[11px] font-mono text-slate-400">
                Swipe <MoveRight className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {utilityToolsData.map((tool, idx) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="w-[76vw] sm:w-auto shrink-0 snap-center p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
                >
                  <div>
                    <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-3">
                      {tool.tag}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-primary hover:text-white text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors group"
                  >
                    <span>Open Tool</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Engineering Workflow ("How I Build") */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="text-center max-w-xl mx-auto mb-10">
            <span
              className="text-xs font-bold uppercase tracking-wider text-primary"
              style={{ color: currentColorTheme.primary }}
            >
              Engineering Workflow
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              How I Build Production Software
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              From concept formulation and database schema normalization to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {workflowSteps.map((step, idx) => {
              const Icon = workflowIcons[idx];
              return (
                <div
                  key={step.step}
                  className="relative p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex flex-col items-center text-center space-y-2 shadow-xs"
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs"
                    style={{ backgroundColor: currentColorTheme.primary }}
                  >
                    {step.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
