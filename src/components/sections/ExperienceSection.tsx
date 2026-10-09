"use client";

import React from "react";
import { experiences } from "@/data/experience";
import { useTheme } from "../theme/ThemeProvider";
import { Briefcase, GraduationCap, Calendar, Eye, Building2, CheckCircle2 } from "lucide-react";

interface ExperienceSectionProps {
  onOpenCertificatePreview: (fileUrl: string) => void;
}

export function ExperienceSection({ onOpenCertificatePreview }: ExperienceSectionProps) {
  const { currentColorTheme } = useTheme();

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-8 sm:space-y-12 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {experiences.map((exp) => {
            const isEducation = exp.type === "education";
            return (
              <div key={exp.id} className="relative group">
                {/* Timeline Dot */}
                <div
                  className="absolute -left-[30px] sm:-left-[43px] top-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 transition-transform duration-300 group-hover:scale-125 shadow-md"
                  style={{ borderColor: currentColorTheme.primary }}
                >
                  {isEducation ? (
                    <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  ) : (
                    <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  )}
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {exp.type.toUpperCase()}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary mt-1">
                        <Building2 className="h-4 w-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 shrink-0">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Skills tags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View Certificate Action */}
                  {exp.certificateFile && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex justify-end">
                      <button
                        onClick={() => onOpenCertificatePreview(exp.certificateFile!)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white shadow-xs transition-all hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: currentColorTheme.primary }}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View Verified Certificate</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
