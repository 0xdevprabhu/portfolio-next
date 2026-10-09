"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectsData, utilityToolsData, workflowSteps } from "@/data/projects";
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
} from "lucide-react";

export function ProjectsSection() {
  const { currentColorTheme } = useTheme();
  const [filter, setFilter] = useState<"all" | "company" | "personal" | "tool">("all");

  const companyProjects = projectsData.filter((p) => p.category === "company");
  const personalProjects = projectsData.filter((p) => p.category === "personal");

  const workflowIcons = [PenTool, Database, Server, Layout, Rocket];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
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
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
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
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
              style={filter === "personal" ? { backgroundColor: currentColorTheme.primary } : {}}
            >
              Personal & AI ({personalProjects.length})
            </button>
            <button
              onClick={() => setFilter("tool")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === "tool"
                  ? "text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
              style={filter === "tool" ? { backgroundColor: currentColorTheme.primary } : {}}
            >
              Utility Tools ({utilityToolsData.length})
            </button>
          </div>
        </div>

        {/* 1. Noxlay Cyber Tech Production Projects */}
        {(filter === "all" || filter === "company") && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Noxlay Cyber Tech Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/60">
                      Noxlay Cyber Tech
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        >
                          <span>Live Preview</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Personal & AI Projects */}
        {(filter === "all" || filter === "personal") && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Personal & AI Engineering Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-3 left-3 bg-amber-500/90 text-white backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs">
                      Self Project
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
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
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Github className="h-3.5 w-3.5" />
                            <span>GitHub Source</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Frontend Utility Tools */}
        {(filter === "all" || filter === "tool") && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Frontend Utility Tools
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {utilityToolsData.map((tool) => (
                <div
                  key={tool.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
                >
                  <div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mb-3">
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
                    className="inline-flex items-center justify-between w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-primary hover:text-white text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors group"
                  >
                    <span>Open Tool</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Engineering Workflow ("How I Build") */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
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
        </div>
      </div>
    </section>
  );
}
