"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
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
    title?: string;
    issuer?: string;
  }>({ fileUrl: null });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenCertificate = (fileUrl: string, title?: string, issuer?: string) => {
    setSelectedCertificate({ fileUrl, title, issuer });
  };

  const handleCloseCertificate = () => {
    setSelectedCertificate({ fileUrl: null });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <HeroSection onOpenResumePreview={() => setIsResumeModalOpen(true)} />
        <AboutSection onOpenResumePreview={() => setIsResumeModalOpen(true)} />
        <SkillsSection />
        <ExperienceSection onOpenCertificatePreview={handleOpenCertificate} />
        <ProjectsSection />
        <CertificatesSection onOpenCertificatePreview={handleOpenCertificate} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Overlays & Modals */}
      <ThemeCustomizer />

      <CertificateModal
        fileUrl={selectedCertificate.fileUrl}
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
