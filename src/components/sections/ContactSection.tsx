"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { useTheme } from "../theme/ThemeProvider";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Linkedin,
  Github,
  Instagram,
  Youtube,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
  const { currentColorTheme } = useTheme();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Offer Letter Form State
  const [hrEmail, setHrEmail] = useState("");
  const [offerFile, setOfferFile] = useState<File | null>(null);
  const [isOfferSubmitting, setIsOfferSubmitting] = useState(false);
  const [offerStatus, setOfferStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isDragging, setIsDragging] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error occurred. Please try again or email directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerFile) {
      setOfferStatus({
        type: "error",
        message: "Please attach your Offer Letter document (PDF/Word).",
      });
      return;
    }

    setIsOfferSubmitting(true);
    setOfferStatus({ type: null, message: "" });

    try {
      const data = new FormData();
      data.append("is_offer", "yes");
      data.append("hr_email", hrEmail);
      data.append("offer_file", offerFile);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok && result.status === "success") {
        setOfferStatus({
          type: "success",
          message: "Offer letter uploaded successfully! 🎉 Prabhu will review it ASAP.",
        });
        setHrEmail("");
        setOfferFile(null);
      } else {
        setOfferStatus({
          type: "error",
          message: result.message || "Upload failed. Please check file format and size.",
        });
      }
    } catch {
      setOfferStatus({
        type: "error",
        message: "Failed to upload offer letter. Please email directly.",
      });
    } finally {
      setIsOfferSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/40">
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
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Contact Me & Start a Project
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Have a project in mind, want to hire, or just want to say hi? My inbox is always open.
          </p>
          <div
            className="h-1 w-12 mx-auto rounded-full mt-3"
            style={{ backgroundColor: currentColorTheme.primary }}
          />
        </motion.div>

        {/* Top Grid: Info & Standard Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Column: Direct Info & Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className="p-2.5 rounded-xl text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: currentColorTheme.primary }}
                  >
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Email</span>
                    <a
                      href="mailto:0xdevprabhu@gmail.com"
                      className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors"
                    >
                      0xdevprabhu@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div
                    className="p-2.5 rounded-xl text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: currentColorTheme.primary }}
                  >
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Phone & WhatsApp</span>
                    <a
                      href="tel:+919344095995"
                      className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors"
                    >
                      +91 93440 95995
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div
                    className="p-2.5 rounded-xl text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: currentColorTheme.primary }}
                  >
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Location</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      Sivakasi, Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-700/60">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
                  Connect on Social Media
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.linkedin.com/in/0xdevprabhu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#0077b5] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/0xdevprabhu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-slate-900 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/in__prabhu/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#e4405f] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@PrabhuP-s9l"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#ff0000] transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/919344095995"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#25d366] transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                  <div
                    className={`p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${
                      submitStatus.type === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                        : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm shadow-md transition-all duration-300 hover:opacity-90 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-70"
                  style={{ backgroundColor: currentColorTheme.primary }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature: Recruiter Offer Letter Dropzone */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Recruiter Express Pipeline</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Loved my work? Drop your Offer Letter directly! 😉
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Skip lengthy screening loops. Submit your offer letter or job spec document for top-priority review.
              </p>
            </div>
          </div>

          <form onSubmit={handleOfferSubmit} className="space-y-4">
            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setOfferFile(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => document.getElementById("offer-file-input")?.click()}
              className={`p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                  : "border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <input
                id="offer-file-input"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setOfferFile(e.target.files[0]);
                  }
                }}
              />
              <UploadCloud
                className={`h-10 w-10 mb-2 transition-transform ${
                  isDragging ? "scale-110 text-emerald-500" : "text-slate-400"
                }`}
              />
              {offerFile ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <FileText className="h-4 w-4" />
                  <span>{offerFile.name} ({(offerFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Drag & Drop PDF or DOC here, or <span className="text-primary underline">browse file</span>
                  </p>
                  <p className="text-xs text-slate-400">Max size 5MB (.pdf, .doc, .docx)</p>
                </div>
              )}
            </div>

            {/* HR Email Input & Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="email"
                required
                value={hrEmail}
                onChange={(e) => setHrEmail(e.target.value)}
                placeholder="HR Email ID (for immediate reply)"
                className="w-full sm:flex-grow px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />

              <button
                type="submit"
                disabled={isOfferSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 disabled:opacity-70"
              >
                {isOfferSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Uploading Offer...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Offer Letter</span>
                  </>
                )}
              </button>
            </div>

            {/* Offer Status */}
            {offerStatus.type && (
              <div
                className={`p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${
                  offerStatus.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                    : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {offerStatus.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{offerStatus.message}</span>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
