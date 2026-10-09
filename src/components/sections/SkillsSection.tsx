"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { skillCategories } from "@/data/skills";
import { useTheme } from "../theme/ThemeProvider";
import { Github, ExternalLink, Code2, Cpu, Wrench, Layers } from "lucide-react";

export function SkillsSection() {
  const { currentColorTheme } = useTheme();
  const [ghActivitySquares, setGhActivitySquares] = useState<number[]>([]);

  useEffect(() => {
    // Generate simulated commit intensity squares (48 squares)
    const squares: number[] = [];
    for (let i = 0; i < 52; i++) {
      // 0 = empty, 1 = low, 2 = medium, 3 = high
      const val = Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0;
      squares.push(val);
    }
    setGhActivitySquares(squares);
  }, []);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10"
            style={{ color: currentColorTheme.primary }}
          >
            My Arsenal
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Technical Skills & Technologies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            The programming languages, frameworks, AI tools, and architectures I leverage daily.
          </p>
          <div
            className="h-1 w-12 mx-auto rounded-full mt-3"
            style={{ backgroundColor: currentColorTheme.primary }}
          />
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.title}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl text-white"
                    style={{ backgroundColor: currentColorTheme.primary }}
                  >
                    {idx === 0 && <Layers className="h-5 w-5" />}
                    {idx === 1 && <Cpu className="h-5 w-5" />}
                    {idx === 2 && <Code2 className="h-5 w-5" />}
                    {idx === 3 && <Wrench className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {cat.title}
                    </h3>
                    {cat.description && (
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills Dock Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
                  >
                    {/* Badge if present */}
                    {skill.badge && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        {skill.badge}
                      </span>
                    )}

                    {/* Skill Icon */}
                    <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={48}
                        height={48}
                        className="object-contain h-10 w-10 sm:h-12 sm:w-12"
                      />
                    </div>

                    {/* Skill Name */}
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 text-center group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>

                    {/* Proficiency Bar */}
                    {skill.level && (
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: currentColorTheme.primary,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* GitHub Activity Wall */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 text-white">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Open Source Activity</h3>
                  <p className="text-xs text-slate-400">
                    Real-time activity and contributions from{" "}
                    <a
                      href="https://github.com/0xdevprabhu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      @0xdevprabhu
                    </a>
                  </p>
                </div>
              </div>

              <a
                href="https://github.com/0xdevprabhu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <span>View GitHub Profile</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Simulated Contribution Grid */}
            <div className="pt-2 overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-flow-col grid-rows-4 gap-1.5">
                  {ghActivitySquares.map((intensity, i) => (
                    <div
                      key={i}
                      className="h-3.5 w-3.5 rounded-xs transition-transform hover:scale-125"
                      style={{
                        backgroundColor:
                          intensity === 0
                            ? "#1e293b"
                            : intensity === 1
                            ? `${currentColorTheme.primary}55`
                            : intensity === 2
                            ? `${currentColorTheme.primary}aa`
                            : currentColorTheme.primary,
                      }}
                      title={`Activity index: ${intensity}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-900">
                  <span>Continuous open-source integration</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <span className="h-2.5 w-2.5 rounded-xs bg-slate-800" />
                    <span
                      className="h-2.5 w-2.5 rounded-xs"
                      style={{ backgroundColor: `${currentColorTheme.primary}55` }}
                    />
                    <span
                      className="h-2.5 w-2.5 rounded-xs"
                      style={{ backgroundColor: `${currentColorTheme.primary}aa` }}
                    />
                    <span
                      className="h-2.5 w-2.5 rounded-xs"
                      style={{ backgroundColor: currentColorTheme.primary }}
                    />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
