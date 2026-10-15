"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { skillCategories } from "@/data/skills";
import { useTheme } from "../theme/ThemeProvider";
import { Github, ExternalLink, Code2, Cpu, Wrench, Layers } from "lucide-react";
import { SkillItem } from "@/types";
import { motion } from "framer-motion";

interface SkillCardProps {
  skill: SkillItem;
  primaryColor: string;
}

function SkillCard({ skill, primaryColor }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const radius = 34;
  const arcLength = Math.PI * radius; // ~106.81
  const level = skill.level ?? 85;
  // Semicircle arc offset: 106.81 is empty (left), 0 is full (right)
  const strokeOffset = isHovered ? arcLength * (1 - level / 100) : arcLength;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col items-center justify-center p-4 pt-5 pb-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 cursor-pointer"
      style={{
        borderColor: isHovered ? `${primaryColor}60` : undefined,
      }}
    >
      {/* Badge if present */}
      {skill.badge && (
        <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 z-20">
          {skill.badge}
        </span>
      )}

      {/* Icon with Semicircular Arc Gauge */}
      <div className="relative w-20 h-20 flex items-center justify-center mb-1">
        {/* Floating Percentage Badge on Hover */}
        <div
          className={`absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 transform ${
            isHovered
              ? "opacity-100 -translate-y-1.5 scale-100"
              : "opacity-0 translate-y-1 scale-75"
          }`}
        >
          <span
            className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full text-white shadow-md flex items-center justify-center whitespace-nowrap tracking-tight"
            style={{ backgroundColor: primaryColor }}
          >
            {level}%
          </span>
        </div>

        {/* Semicircle SVG Arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 80 80"
          fill="none"
        >
          {/* Background Track */}
          <path
            d="M 6 40 A 34 34 0 0 1 74 40"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={`text-slate-200 dark:text-slate-700/60 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Animated Progress Fill Arc (from Left to Right) */}
          <path
            d="M 6 40 A 34 34 0 0 1 74 40"
            stroke={primaryColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeOffset}
            style={{
              transition: "stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
              filter: isHovered ? `drop-shadow(0 0 5px ${primaryColor}70)` : "none",
            }}
            className={`transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </svg>

        {/* Skill Icon */}
        <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Image
            src={skill.icon}
            alt={skill.name}
            width={40}
            height={40}
            className="object-contain h-9 w-9 sm:h-10 sm:w-10"
          />
        </div>
      </div>

      {/* Skill Name */}
      <span
        className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 text-center transition-colors"
        style={{
          color: isHovered ? primaryColor : undefined,
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
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
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
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
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    primaryColor={currentColorTheme.primary}
                  />
                ))}
              </div>
            </motion.div>
          ))}

          {/* GitHub Activity Wall */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-white shadow-xl"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
