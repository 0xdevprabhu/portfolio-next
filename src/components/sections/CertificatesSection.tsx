"use client";

import React, { useState } from "react";
import Image from "next/image";
import { certificatesData } from "@/data/certificates";
import { useTheme } from "../theme/ThemeProvider";
import {
  Eye,
  Download,
  ExternalLink,
  Calendar,
  Layers,
  ShieldCheck,
  MoveRight,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

interface CertificatesSectionProps {
  onOpenCertificatePreview: (
    fileUrl: string | string[],
    title?: string,
    issuer?: string
  ) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Credentials" },
  { id: "cloud", label: "Cloud & AWS" },
  { id: "frontend", label: "Frontend & React" },
  { id: "fullstack", label: "Full Stack & LAMP" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "evaluation", label: "TCS iON NQT" },
];

export function CertificatesSection({
  onOpenCertificatePreview,
}: CertificatesSectionProps) {
  const { currentColorTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCerts =
    activeCategory === "all"
      ? certificatesData
      : certificatesData.filter((c) => c.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="certifications"
      className="py-20 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden"
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
            Verified Vault
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
        </motion.div>

        {/* Filter Pills (Single-row horizontal scroll on mobile, wrapped centered on desktop) */}
        <div className="flex items-center sm:justify-center gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isSelected
                    ? "text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                style={
                  isSelected
                    ? { backgroundColor: currentColorTheme.primary }
                    : {}
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Swipe Header Hint */}
        <div className="flex md:hidden items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            <Award
              className="h-3.5 w-3.5"
              style={{ color: currentColorTheme.primary }}
            />
            {filteredCerts.length} Verified
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
            Swipe <MoveRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Certificates Vault Grid (Desktop Bento) + Snap Carousel (Mobile) */}
        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid-cols-2 lg:grid-cols-3 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filteredCerts.map((cert, idx) => {
            const isFeaturedVault = idx === 0 && filteredCerts.length >= 3;
            const files =
              cert.fileUrls && cert.fileUrls.length > 0
                ? cert.fileUrls
                : cert.fileUrl;
            const slideCount = cert.fileUrls?.length || 1;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(idx * 0.06, 0.3),
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseMove={handleMouseMove}
                className={`group relative rounded-3xl overflow-hidden bg-white/95 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 w-[83vw] sm:w-[70vw] md:w-auto shrink-0 snap-center flex flex-col ${
                  isFeaturedVault ? "md:col-span-2 lg:flex-row" : ""
                }`}
              >
                {/* Cursor Spotlight Glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{
                    background:
                      "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--primary) 15%, transparent), transparent 65%)",
                  }}
                />

                {/* Preview Pane with Holographic Verification Header */}
                <div
                  className={`relative flex flex-col bg-slate-100 dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800/80 overflow-hidden ${
                    isFeaturedVault
                      ? "lg:w-[48%] lg:border-b-0 lg:border-r shrink-0"
                      : "w-full"
                  }`}
                >
                  {/* Holographic Verified Bar */}
                  <div className="relative h-8 px-3.5 flex items-center justify-between bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 border-b border-slate-200/70 dark:border-slate-800/80 z-20">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      VERIFIED
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      #{String(idx + 1).padStart(2, "0")} &bull; {cert.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Clickable Certificate Image */}
                  <div
                    onClick={() =>
                      onOpenCertificatePreview(files, cert.title, cert.issuer)
                    }
                    className={`relative w-full overflow-hidden cursor-pointer ${
                      isFeaturedVault
                        ? "h-48 sm:h-56 lg:h-full lg:min-h-[250px]"
                        : "h-48"
                    }`}
                  >
                    {slideCount > 1 && (
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-white/20 shadow-md">
                        <Layers className="h-3 w-3" />
                        <span>{slideCount} Slides</span>
                      </div>
                    )}

                    <Image
                      src={cert.thumbnailUrl}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes={
                        isFeaturedVault
                          ? "(max-width: 768px) 85vw, (max-width: 1200px) 75vw, 50vw"
                          : "(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 33vw"
                      }
                    />

                    {/* Desktop Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center p-4 z-20">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 text-xs font-bold text-slate-900 dark:text-white shadow-xl backdrop-blur-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye
                          className="h-4 w-4"
                          style={{ color: currentColorTheme.primary }}
                        />
                        <span>
                          {slideCount > 1
                            ? `Inspect All ${slideCount} Slides`
                            : "Inspect Credential"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div className="relative z-20 p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider truncate"
                        style={{ color: currentColorTheme.primary }}
                      >
                        {cert.issuer}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                        <Calendar className="h-3 w-3" />
                        {cert.date}
                      </span>
                    </div>

                    <h3
                      className={`font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors ${
                        isFeaturedVault ? "text-lg sm:text-xl" : "text-base"
                      }`}
                    >
                      {cert.title}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed ${
                        isFeaturedVault ? "line-clamp-4" : "line-clamp-3"
                      }`}
                    >
                      {cert.description}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenCertificatePreview(files, cert.title, cert.issuer)
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                      style={{ color: currentColorTheme.primary }}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>
                        {slideCount > 1 ? `Preview (${slideCount})` : "Preview"}
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {cert.verifiedUrl && (
                        <a
                          href={cert.verifiedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                          title="Verify badge on Credly"
                        >
                          <span>Verify</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      <a
                        href={cert.fileUrl}
                        download
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                        title="Download certificate"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
