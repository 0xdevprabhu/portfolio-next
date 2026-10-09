"use client";

import React, { useEffect } from "react";
import { X, Download, FileText, ExternalLink } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
}

export function ResumeModal({
  isOpen,
  onClose,
  pdfUrl = "/assets/documents/Prabhu's_Resume.pdf",
}: ResumeModalProps) {
  const { currentColorTheme } = useTheme();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume Preview Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* macOS Style Window Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-rose-500 cursor-pointer hover:opacity-80 transition-opacity"
                title="Close"
              />
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 ml-2">
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span>Prabhu_P_Resume.pdf</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
              style={{ backgroundColor: currentColorTheme.primary }}
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-grow bg-slate-200 dark:bg-slate-950 p-2 sm:p-4 flex items-center justify-center min-h-[400px]">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            title="Prabhu P Resume"
            className="w-full h-[70vh] rounded-lg border border-slate-300 dark:border-slate-800 shadow-inner bg-white"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Prabhu P — Full Stack Developer & LAMP Stack Specialist</span>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 text-primary"
          >
            <span>Open standalone</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
