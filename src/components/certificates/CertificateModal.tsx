"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";

interface CertificateModalProps {
  fileUrl: string | null;
  fileUrls?: string[];
  title?: string;
  issuer?: string;
  onClose: () => void;
}

export function CertificateModal({
  fileUrl,
  fileUrls,
  title = "Certificate of Achievement",
  issuer,
  onClose,
}: CertificateModalProps) {
  const { currentColorTheme } = useTheme();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<number>(1);

  // Normalize image list
  const images: string[] = React.useMemo(() => {
    if (fileUrls && fileUrls.length > 0) return fileUrls;
    if (fileUrl) return [fileUrl];
    return [];
  }, [fileUrl, fileUrls]);

  // Reset index and zoom when modal opens or images change
  useEffect(() => {
    if (fileUrl && images.length > 0) {
      const idx = images.indexOf(fileUrl);
      setCurrentIndex(idx >= 0 ? idx : 0);
    } else {
      setCurrentIndex(0);
    }
    setZoomLevel(1);
    setRotation(0);
  }, [fileUrl, images]);

  const activeFile = images[currentIndex] || fileUrl;

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomLevel(1);
    setRotation(0);
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
    setRotation(0);
  }, [images.length]);

  const handleGoTo = (index: number) => {
    if (index === currentIndex) return;
    setSlideDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setZoomLevel(1);
    setRotation(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  if (!activeFile) return null;

  const isPdf = activeFile.toLowerCase().endsWith(".pdf");

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
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base truncate">{title}</h3>
                {images.length > 1 && (
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: `${currentColorTheme.primary}15`,
                      color: currentColorTheme.primary,
                    }}
                  >
                    <Layers className="h-3 w-3" />
                    {currentIndex + 1} / {images.length}
                  </span>
                )}
              </div>
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
              href={activeFile}
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

        {/* Viewer Content Area with Slide Controls */}
        <div className="relative flex-grow overflow-auto p-4 flex items-center justify-center bg-slate-100/70 dark:bg-slate-950/90 min-h-[350px]">
          {/* Navigation Arrows for Slider */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous Certificate"
                title="Previous (Left Arrow)"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md shadow-xl border border-white/20 transition-all hover:scale-110 active:scale-95 focus:outline-none"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next Certificate"
                title="Next (Right Arrow)"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md shadow-xl border border-white/20 transition-all hover:scale-110 active:scale-95 focus:outline-none"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </>
          )}

          {isPdf ? (
            <iframe
              src={`${activeFile}#toolbar=0&navpanes=0`}
              title={title}
              className="w-full h-[65vh] rounded-lg border border-slate-300 dark:border-slate-800"
            />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFile}
                initial={{ opacity: 0, x: slideDirection * 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideDirection * 25 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="relative transition-transform duration-200 max-w-full max-h-[70vh] flex items-center justify-center"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                }}
              >
                <Image
                  src={activeFile}
                  alt={`${title} - Document ${currentIndex + 1}`}
                  width={1200}
                  height={800}
                  priority
                  className="max-h-[68vh] w-auto object-contain rounded-lg shadow-lg border border-slate-200 dark:border-slate-800"
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Bottom Dot Indicators for Slider */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
              {images.map((img, idx) => (
                <button
                  key={img}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGoTo(idx);
                  }}
                  className={`transition-all rounded-full ${
                    idx === currentIndex
                      ? "w-6 h-2 bg-white"
                      : "w-2 h-2 bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Go to certificate ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            {images.length > 1
              ? `Viewing credential ${currentIndex + 1} of ${images.length} · Prabhu P`
              : "Official credential issued to Prabhu P"}
          </span>
          <a
            href={activeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 text-primary font-medium"
            style={{ color: currentColorTheme.primary }}
          >
            <span>Open in new tab</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
