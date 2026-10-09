"use client";

import React, { useState } from "react";
import Image from "next/image";
import { certificatesData } from "@/data/certificates";
import { useTheme } from "../theme/ThemeProvider";
import { Award, Eye, Download, ExternalLink, Calendar, CheckCircle } from "lucide-react";

interface CertificatesSectionProps {
  onOpenCertificatePreview: (fileUrl: string, title?: string, issuer?: string) => void;
}

export function CertificatesSection({ onOpenCertificatePreview }: CertificatesSectionProps) {
  const { currentColorTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCerts =
    activeCategory === "all"
      ? certificatesData
      : certificatesData.filter((c) => c.category === activeCategory);

  return (
    <section id="certifications-gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10"
            style={{ color: currentColorTheme.primary }}
          >
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Certifications & Verified Credentials
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Professional certifications from AWS Academy, TCS iON, tech organizations, and academic institutions.
          </p>
          <div
            className="h-1 w-12 mx-auto rounded-full mt-3"
            style={{ backgroundColor: currentColorTheme.primary }}
          />

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {[
              { id: "all", label: "All Credentials" },
              { id: "cloud", label: "Cloud & AWS" },
              { id: "frontend", label: "Frontend & React" },
              { id: "fullstack", label: "Full Stack & LAMP" },
              { id: "ai", label: "AI & Machine Learning" },
              { id: "evaluation", label: "TCS iON NQT" },
            ].map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? "text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                  style={isSelected ? { backgroundColor: currentColorTheme.primary } : {}}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
            >
              {/* Certificate Image Preview */}
              <div
                onClick={() => onOpenCertificatePreview(cert.fileUrl, cert.title, cert.issuer)}
                className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-pointer"
              >
                <Image
                  src={cert.thumbnailUrl}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 text-xs font-bold text-slate-900 dark:text-white shadow-lg backdrop-blur-xs">
                    <Eye className="h-4 w-4 text-primary" />
                    <span>View Original Document</span>
                  </span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3 w-3" />
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <button
                    onClick={() => onOpenCertificatePreview(cert.fileUrl, cert.title, cert.issuer)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {cert.verifiedUrl && (
                      <a
                        href={cert.verifiedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-primary transition-colors"
                        title="Verify badge on Credly"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={cert.fileUrl}
                      download
                      className="p-1.5 rounded-lg text-slate-500 hover:text-primary transition-colors"
                      title="Download file"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
