"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Download, ZoomIn, ZoomOut, RotateCcw, ExternalLink, ShieldCheck } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

interface CertificateModalProps {
  fileUrl: string | null;
  title?: string;
  issuer?: string;
  onClose: () => void;
}

export function CertificateModal({
  fileUrl,
  title = "Certificate of Achievement",
  issuer,
  onClose,
}: CertificateModalProps) {
  const { currentColorTheme } = useTheme();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!fileUrl) return null;

  const isPdf = fileUrl.toLowerCase().endsWith(".pdf");

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
          <div className="flex items-center gap-3 pr-4 min-w-0">
            <div
              className="p-2 rounded-lg text-white shrink-0"
              style={{ backgroundColor: currentColorTheme.primary }}
            >
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base truncate">{title}</h3>
              {issuer && (
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{issuer}</p>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 shrink-0">
            {!isPdf && (
              <>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRotate}
                  title="Rotate"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={handleReset}
                  title="Reset Zoom"
                  className="px-2 py-1 text-xs rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors hidden sm:inline"
                >
                  Reset
                </button>
              </>
            )}

            <a
              href={fileUrl}
              download
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-90 ml-1"
              style={{ backgroundColor: currentColorTheme.primary }}
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Viewer Content Area */}
        <div className="flex-grow overflow-auto p-4 flex items-center justify-center bg-slate-100/70 dark:bg-slate-950/90 min-h-[350px]">
          {isPdf ? (
            <iframe
              src={`${fileUrl}#toolbar=0&navpanes=0`}
              title={title}
              className="w-full h-[65vh] rounded-lg border border-slate-300 dark:border-slate-800"
            />
          ) : (
            <div
              className="relative transition-transform duration-200 max-w-full max-h-[70vh] flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              }}
            >
              <Image
                src={fileUrl}
                alt={title}
                width={1200}
                height={800}
                className="max-h-[68vh] w-auto object-contain rounded-lg shadow-lg border border-slate-200 dark:border-slate-800"
              />
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Official credential issued to Prabhu P</span>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 text-primary"
          >
            <span>Open in new tab</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
