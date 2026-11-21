"use client";

import React, { useState } from "react";
import Link from "next/link";
import { engineeringInsightsData } from "@/data/insights";
import { Navbar } from "@/components/layout/Navbar";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { ThemeCustomizer } from "@/components/theme/ThemeCustomizer";
import { CertificateModal } from "@/components/certificates/CertificateModal";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";

export default function Home() {
  // Modal states
  const [selectedCertificate, setSelectedCertificate] = useState<{
    fileUrl: string | null;
    fileUrls?: string[];
    title?: string;
    issuer?: string;
  }>({ fileUrl: null });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenCertificate = (
    fileUrlOrFiles: string | string[],
    title?: string,
    issuer?: string
  ) => {
    if (Array.isArray(fileUrlOrFiles)) {
      setSelectedCertificate({
        fileUrl: fileUrlOrFiles[0] || null,
        fileUrls: fileUrlOrFiles,
        title,
        issuer,
      });
    } else {
      setSelectedCertificate({
        fileUrl: fileUrlOrFiles,
        fileUrls: [fileUrlOrFiles],
        title,
        issuer,
      });
    }
  };

  const handleCloseCertificate = () => {
    setSelectedCertificate({ fileUrl: null, fileUrls: undefined });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        <BreadcrumbNav />
        <HeroSection onOpenResumePreview={() => setIsResumeModalOpen(true)} />
        <AboutSection onOpenResumePreview={() => setIsResumeModalOpen(true)} />
        <SkillsSection />
        <ExperienceSection onOpenCertificatePreview={handleOpenCertificate} />
        <ProjectsSection />

        {/* Daily Updated Engineering Insight Strip for SEO & Internal Crawling */}
        {engineeringInsightsData[0] && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 my-8">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Latest Dev Insight &bull; {engineeringInsightsData[0].publishedAt}</span>
                </div>
                <Link
                  href={`/insights/${engineeringInsightsData[0].slug}`}
                  className="block text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors"
                >
                  {engineeringInsightsData[0].title}
                </Link>
              </div>
              <Link
                href="/insights"
                className="text-xs font-mono font-semibold text-primary hover:underline shrink-0"
              >
                All Notes ({engineeringInsightsData.length}) &rarr;
              </Link>
            </div>
          </section>
        )}

        <CertificatesSection onOpenCertificatePreview={handleOpenCertificate} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Overlays & Modals */}
      <ThemeCustomizer />

      <CertificateModal
        fileUrl={selectedCertificate.fileUrl}
        fileUrls={selectedCertificate.fileUrls}
        title={selectedCertificate.title}
        issuer={selectedCertificate.issuer}
        onClose={handleCloseCertificate}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <ChatbotWidget />
    </div>
  );
}
