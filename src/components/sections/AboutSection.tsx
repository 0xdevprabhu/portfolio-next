"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { useTheme } from "../theme/ThemeProvider";
import {
  Terminal,
  MapPin,
  Mail,
  Phone,
  Send,
  Download,
  Eye,
  FileCode2,
} from "lucide-react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  onOpenResumePreview: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

interface FloatingTechTile {
  name: string;
  iconSrc?: string;
  desktopPosClass: string;
  tiltClass: string;
}

const FLOATING_TECH_TILES: FloatingTechTile[] = [
  {
    name: "React.js",
    iconSrc: "/assets/images/react.svg",
    desktopPosClass: "sm:-top-6 sm:left-16 lg:left-20",
    tiltClass: "-rotate-6",
  },
  {
    name: "Next.js",
    desktopPosClass: "sm:-top-9 sm:left-[44%] lg:left-[45%]",
    tiltClass: "-rotate-2",
  },
  {
    name: "Laravel",
    iconSrc: "/assets/images/laravel.png",
    desktopPosClass: "sm:-top-4 sm:right-6 lg:right-4",
    tiltClass: "rotate-6",
  },
  {
    name: "PHP",
    iconSrc: "/assets/images/php.svg",
    desktopPosClass: "sm:top-20 sm:-right-3 lg:-right-4",
    tiltClass: "rotate-3",
  },
  {
    name: "MySQL",
    iconSrc: "/assets/images/mysql.svg",
    desktopPosClass: "sm:top-44 sm:-right-2 lg:-right-3",
    tiltClass: "-rotate-3",
  },
];

const JSON_EDITOR_LINES = [
  { line: 1, content: <span className="text-slate-400">{"{"}</span> },
  {
    line: 2,
    content: (
      <>
        {"  "}
        <span className="text-sky-300">&quot;name&quot;</span>
        <span className="text-slate-400">: </span>
        <span className="text-emerald-300">&quot;Prabhu P&quot;</span>
        <span className="text-slate-400">,</span>
      </>
    ),
  },
  {
    line: 3,
    content: (
      <>
        {"  "}
        <span className="text-sky-300">&quot;role&quot;</span>
        <span className="text-slate-400">: </span>
        <span className="text-amber-300">
          &quot;Full Stack Developer &amp; Freelance Web Architect&quot;
        </span>
        <span className="text-slate-400">,</span>
      </>
    ),
  },
  {
    line: 4,
    content: (
      <>
        {"  "}
        <span className="text-sky-300">&quot;company&quot;</span>
        <span className="text-slate-400">: </span>
        <span className="text-amber-300">&quot;Noxlay Cyber Tech&quot;</span>
        <span className="text-slate-400">,</span>
      </>
    ),
  },
  {
    line: 5,
    content: (
      <>
        {"  "}
        <span className="text-sky-300">&quot;location&quot;</span>
        <span className="text-slate-400">: </span>
        <span className="text-emerald-300">&quot;Sivakasi, Tamil Nadu, India&quot;</span>
        <span className="text-slate-400">,</span>
      </>
    ),
  },
  {
    line: 6,
    content: (
      <>
        {"  "}
        <span className="text-sky-300">&quot;skills&quot;</span>
        <span className="text-slate-400">: [</span>
        <span className="text-cyan-300">&quot;React&quot;</span>
        <span className="text-slate-400">, </span>
        <span className="text-cyan-300">&quot;Next.js&quot;</span>
        <span className="text-slate-400">, </span>
        <span className="text-cyan-300">&quot;Laravel&quot;</span>
        <span className="text-slate-400">, </span>
        <span className="text-cyan-300">&quot;PHP&quot;</span>
        <span className="text-slate-400">,</span>
      </>
    ),
  },
  {
    line: 7,
    content: (
      <>
        {"    "}
        <span className="text-cyan-300">&quot;MySQL&quot;</span>
        <span className="text-slate-400">, </span>
        <span className="text-cyan-300">&quot;Tailwind CSS&quot;</span>
        <span className="text-slate-400">],</span>
      </>
    ),
  },
  {
    line: 8,
    content: (
      <>
        {"  "}
        <span className="text-sky-300">&quot;focus&quot;</span>
        <span className="text-slate-400">: </span>
        <span className="text-amber-300">
          &quot;Web Development, E-commerce, AI Solutions&quot;
        </span>
      </>
    ),
  },
  { line: 9, content: <span className="text-slate-400">{"}"}</span> },
];

function TechAppBadge({
  tile,
  sizeClass = "w-12 h-12 sm:w-14 sm:h-14",
}: {
  tile: FloatingTechTile;
  sizeClass?: string;
}) {
  return (
    <div
      title={tile.name}
      className={`${sizeClass} rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-700/70 shadow-[0_14px_28px_-8px_rgba(15,23,42,0.18)] flex items-center justify-center p-2.5 backdrop-blur-md transition-transform duration-300 hover:scale-110 ${tile.tiltClass}`}
    >
      {tile.iconSrc ? (
        <Image
          src={tile.iconSrc}
          alt={tile.name}
          width={32}
          height={32}
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
        />
      ) : (
        <span className="w-8 h-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-sm flex items-center justify-center">
          N
        </span>
      )}
    </div>
  );
}

function StudioDeskPedestal({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="relative mx-auto -mt-5 z-20 hidden sm:flex flex-col items-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="relative flex items-end justify-center gap-6 px-10 pb-2">
        {/* Sleek Isometric Laptop */}
        <div className="relative">
          <div className="relative mx-auto w-32 h-20 rounded-xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 p-[3px] shadow-xl border border-slate-400/40 dark:border-slate-600/50">
            <div className="w-full h-full rounded-[9px] bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 72%)`,
                }}
              />
              <span
                className="relative font-mono font-black text-xl tracking-tighter"
                style={{
                  color: accentColor,
                  textShadow: `0 0 16px ${accentColor}`,
                }}
              >
                &lt;/&gt;
              </span>
            </div>
          </div>
          <div
            className="mx-auto -mt-0.5 w-40 h-3 rounded-b-xl bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 dark:from-slate-600 dark:via-slate-400 dark:to-slate-600 shadow-lg border-t border-white/80"
            style={{ transform: "perspective(180px) rotateX(45deg)" }}
          />
        </div>

        {/* Ceramic Dev Mug & Desk Plant */}
        <div className="flex items-end gap-3 -mb-0.5">
          {/* Ceramic Mug */}
          <div className="relative flex items-center">
            <div className="w-10 h-11 rounded-b-xl rounded-t-sm bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-800 border border-slate-200/80 dark:border-slate-600 shadow-md flex items-center justify-center">
              <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-200">
                &lt;/&gt;
              </span>
            </div>
            <div className="w-2.5 h-5 rounded-r-full border-2 border-l-0 border-slate-300 dark:border-slate-600 -ml-0.5" />
          </div>

          {/* Mini Desk Plant */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-10 h-8 flex items-end justify-center -mb-1">
              <span
                className="w-3.5 h-6 bg-emerald-500 rounded-full origin-bottom shadow-xs"
                style={{ transform: "rotate(-26deg)" }}
              />
              <span className="w-3.5 h-7 bg-emerald-600 rounded-full z-10 -mx-1.5 shadow-xs" />
              <span
                className="w-3.5 h-6 bg-emerald-400 rounded-full origin-bottom shadow-xs"
                style={{ transform: "rotate(26deg)" }}
              />
            </div>
            <div className="w-9 h-7 rounded-b-lg bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 border-t-2 border-white/70 shadow-md" />
          </div>
        </div>
      </div>

      {/* Rounded 3D Desk Platform Shelf */}
      <div className="w-[92%] max-w-md h-5 rounded-full bg-gradient-to-b from-white to-slate-200/90 dark:from-slate-800 dark:to-slate-900 border border-white/90 dark:border-slate-700/70 shadow-[0_18px_36px_-10px_rgba(15,23,42,0.18)]" />
    </div>
  );
}

export function AboutSection({ onOpenResumePreview }: AboutSectionProps) {
  const { currentColorTheme, isDarkMode } = useTheme();

  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const runCliCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="text-amber-300 space-y-1 font-mono text-xs">
            <p>Available commands:</p>
            <p>
              {"  "}
              <span className="text-cyan-400">help</span> - List available commands
            </p>
            <p>
              {"  "}
              <span className="text-cyan-400">resume</span> - Open interactive resume viewer
            </p>
            <p>
              {"  "}
              <span className="text-cyan-400">skills</span> - Display technical skill set
            </p>
            <p>
              {"  "}
              <span className="text-cyan-400">contact</span> - Get direct email and phone number
            </p>
            <p>
              {"  "}
              <span className="text-cyan-400">about</span> - Read bio synopsis
            </p>
            <p>
              {"  "}
              <span className="text-cyan-400">clear</span> - Clear terminal logs
            </p>
            <p>
              {"  "}
              <span className="text-cyan-400">sudo</span> - Elevated root execution test
            </p>
          </div>
        );
        break;

      case "resume":
      case "cv":
        output = (
          <div className="text-emerald-400 font-mono text-xs">
            [System] Opening Secure Resume Viewer modal...
          </div>
        );
        onOpenResumePreview();
        break;

      case "skills":
        output = (
          <div className="text-slate-200 font-mono text-xs space-y-1">
            <p className="text-cyan-400 font-bold">Backend &amp; DB:</p>
            <p>  PHP (OOP, MVC), MySQL, Linux CLI, Apache, Laravel</p>
            <p className="text-cyan-400 font-bold mt-1">Frontend:</p>
            <p>  HTML5, CSS3, JavaScript (ES6+), React JS, Next.js, Tailwind CSS</p>
            <p className="text-cyan-400 font-bold mt-1">AI &amp; Tools:</p>
            <p>  Google Gemini API, Git/GitHub, VS Code, XAMPP, phpMyAdmin</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-slate-200 font-mono text-xs space-y-1">
            <p>
              Email: <span className="text-cyan-400">{profileData.email}</span>
            </p>
            <p>
              Phone: <span className="text-cyan-400">{profileData.phone}</span>
            </p>
            <p>
              Location: <span className="text-cyan-400">{profileData.location}</span>
            </p>
          </div>
        );
        break;

      case "about":
        output = (
          <p className="text-slate-300 font-mono text-xs">
            Prabhu P is a Full Stack Developer &amp; LAMP Stack Specialist at Noxlay Cyber
            Tech, focused on high-performance web applications, reliable databases, and
            practical AI integrations.
          </p>
        );
        break;

      case "sudo":
        output = (
          <p className="text-rose-400 font-mono text-xs">
            Permission denied: Nice try! But you are not root admin 😉
          </p>
        );
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      default:
        output = (
          <p className="text-rose-400 font-mono text-xs">
            Command not recognized: &apos;{cmd}&apos;. Type &apos;help&apos; for available
            commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [...prev, { command: rawCommand, output }]);
    setInputVal("");
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    runCliCommand(inputVal);
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const contactItems = [
    {
      Icon: MapPin,
      label: profileData.location,
      tint: currentColorTheme.primary,
    },
    {
      Icon: Mail,
      label: profileData.email,
      href: `mailto:${profileData.email}`,
      tint: "#2563eb",
    },
    {
      Icon: Phone,
      label: profileData.phone,
      href: `tel:${profileData.phone.replace(/\s+/g, "")}`,
      tint: currentColorTheme.accent,
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f8faff] via-white to-[#f6f8ff] dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 w-full max-w-full overflow-hidden"
    >
      {/* Subtle Background Atmosphere & Decorative Dot Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-16 right-[6%] w-[380px] h-[380px] rounded-full blur-[110px] opacity-15 dark:opacity-20"
          style={{ backgroundColor: currentColorTheme.accent }}
        />
        <div
          className="absolute bottom-12 left-[4%] w-[320px] h-[320px] rounded-full blur-[110px] opacity-10 dark:opacity-15"
          style={{ backgroundColor: currentColorTheme.primary }}
        />
        {/* Decorative top-right dotted grid accent */}
        <div className="hidden lg:grid grid-cols-5 gap-2 absolute top-14 right-12 opacity-30">
          {Array.from({ length: 20 }).map((_, idx) => (
            <span
              key={idx}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: currentColorTheme.primary }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header: Pill + Dual-Tone Heading + Subtitle + Brush Stroke */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-3">
            <span className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-700" />
            <span
              className="text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/70 shadow-xs"
              style={{ color: currentColorTheme.primary }}
            >
              Who Am I?
            </span>
            <span className="hidden sm:block w-12 h-px bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-700" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-4">
            About{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(120deg, ${currentColorTheme.primary}, ${currentColorTheme.accent})`,
              }}
            >
              Me
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2.5">
            Get to know more about me, my journey and what I do!
          </p>

          <svg
            className="w-28 h-3 mx-auto mt-3"
            viewBox="0 0 120 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 9C36 3 78 2.5 116 7.5"
              stroke={currentColorTheme.primary}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Main 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* LEFT COLUMN: Frosted White Story Card with Top Floating </> Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative pt-4"
          >
            {/* Floating Top-Left </> Medallion Badge */}
            <div className="absolute -top-2 left-6 z-20 flex items-center gap-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-mono font-black text-base shadow-lg border-2 border-white dark:border-slate-900"
                style={{
                  background: `linear-gradient(135deg, ${currentColorTheme.accent}, ${currentColorTheme.primary})`,
                  boxShadow: `0 12px 24px -6px ${currentColorTheme.glow}`,
                }}
              >
                &lt;/&gt;
              </div>
              <svg
                className="w-5 h-5 -mt-4 text-slate-400 dark:text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 16L9 11M11 8V3M15 11L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="rounded-[2rem] bg-white/95 dark:bg-slate-900/90 border border-white dark:border-slate-800 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] backdrop-blur-xl p-6 sm:p-8 pt-11 space-y-5">
              <h3 className="text-2xl sm:text-[1.65rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug">
                Full Stack Developer &amp;{" "}
                <span style={{ color: currentColorTheme.primary }}>Freelancer</span> in
                Sivakasi
              </h3>

              <div className="space-y-3.5 text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Known online as{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    Prabhu P (@0xdevprabhu)
                  </strong>
                  , I am a dedicated{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    Full Stack Developer &amp; Freelance Web Designer
                  </strong>{" "}
                  based in Sivakasi, Tamil Nadu, India. My journey in tech is driven by an
                  insatiable curiosity to build reliable web applications through clean code,
                  relational databases, and modern UI engineering.
                </p>
                <p>
                  Alongside engineering client platforms at{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    {profileData.company}
                  </strong>
                  , I also work as an active{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    freelancer in Sivakasi
                  </strong>{" "}
                  and remotely — building custom business websites, e-commerce stores, B2B
                  estimation portals, and AI-powered web apps using the LAMP stack, Next.js,
                  and React.
                </p>
              </div>

              {/* Clean Horizontal Contact Chips */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                {contactItems.map(({ Icon, label, href, tint }) => (
                  <div key={label} className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${tint}18`, color: tint }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-xs font-medium text-slate-700 dark:text-slate-200 hover:underline truncate"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                        {label}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons: Let's Connect + Download CV / Preview */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${currentColorTheme.accent}, ${currentColorTheme.primary}, ${currentColorTheme.dark})`,
                    boxShadow: `0 12px 24px -6px ${currentColorTheme.glow}`,
                  }}
                >
                  <span>Let&apos;s Connect</span>
                  <Send className="w-4 h-4" />
                </Link>

                <div
                  className="inline-flex items-center rounded-full bg-white dark:bg-slate-900 border-[1.75px] overflow-hidden shadow-xs transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: `${currentColorTheme.primary}85` }}
                >
                  <a
                    href={profileData.resumePath}
                    download="Prabhu_P_FullStack_Resume.pdf"
                    className="inline-flex items-center gap-2 pl-4 pr-3 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Download
                      className="w-4 h-4"
                      style={{ color: currentColorTheme.primary }}
                    />
                    <span>Download CV</span>
                  </a>
                  <span className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
                  <button
                    type="button"
                    onClick={onOpenResumePreview}
                    aria-label="Preview Resume"
                    title="Preview Resume"
                    className="pl-2.5 pr-3.5 py-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Orbiting Tech Icons + Interactive Mac Code Window + 3D Studio Desk */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative w-full min-w-0 sm:pt-8 sm:pr-4"
          >
            {/* Mobile Compact Tech Icon Strip (< sm) */}
            <div className="flex sm:hidden items-center justify-center gap-2.5 mb-4 flex-wrap">
              {FLOATING_TECH_TILES.map((tile) => (
                <TechAppBadge key={tile.name} tile={tile} sizeClass="w-11 h-11" />
              ))}
            </div>

            {/* Desktop/Tablet Floating Orbit Tech Icons + Curved Arrow */}
            <div className="hidden sm:block pointer-events-none" aria-hidden="true">
              {/* Decorative Curved Arrow into Editor Window */}
              <svg
                className="w-14 h-12 absolute -top-2 left-2 text-slate-400 dark:text-slate-500 z-20"
                viewBox="0 0 64 52"
                fill="none"
              >
                <path
                  d="M6 42C8 20 26 8 54 14M54 14L46 9M54 14L48 22"
                  stroke={currentColorTheme.primary}
                  strokeOpacity="0.65"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {FLOATING_TECH_TILES.map((tile) => (
                <div
                  key={tile.name}
                  className={`absolute z-30 ${tile.desktopPosClass}`}
                >
                  <TechAppBadge tile={tile} />
                </div>
              ))}
            </div>

            {/* Interactive Developer Profile Code Window */}
            <div
              className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0e1326] border border-slate-700/80 shadow-[0_28px_65px_-15px_rgba(15,23,42,0.5)] flex flex-col w-full"
              style={{
                boxShadow: isDarkMode
                  ? `0 25px 60px -15px rgba(0, 0, 0, 0.7)`
                  : `0 25px 60px -15px ${currentColorTheme.primary}35`,
              }}
            >
              {/* macOS Window Chrome Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#151b33] border-b border-slate-800/90">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-3 w-3 rounded-full bg-rose-500 shrink-0" />
                  <span className="h-3 w-3 rounded-full bg-amber-400 shrink-0" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400 shrink-0" />
                  <span className="ml-2 px-2.5 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/70 font-mono text-[11px] sm:text-xs text-slate-200 flex items-center gap-1.5 truncate">
                    <FileCode2
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: currentColorTheme.accent }}
                    />
                    <span className="truncate">developer_profile.json</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    <Terminal className="w-3 h-3" />
                    Interactive CLI
                  </span>
                  <span
                    className="font-mono text-xs font-extrabold"
                    style={{ color: currentColorTheme.accent }}
                  >
                    &lt;/&gt;
                  </span>
                </div>
              </div>

              {/* Code Lines & Interactive Terminal Feed */}
              <div
                ref={terminalBodyRef}
                className="p-4 sm:p-5 h-[270px] sm:h-[295px] overflow-y-auto font-mono text-xs space-y-2.5"
              >
                {/* Colorized Line-Numbered Profile JSON */}
                <div className="space-y-0.5 select-text">
                  {JSON_EDITOR_LINES.map(({ line, content }) => (
                    <div key={line} className="flex items-start leading-relaxed">
                      <span className="w-6 shrink-0 text-slate-600 text-[11px] select-none">
                        {line}
                      </span>
                      <pre className="whitespace-pre-wrap break-words font-mono text-[11.5px] sm:text-xs m-0">
                        {content}
                      </pre>
                    </div>
                  ))}
                </div>

                {/* Quick Command Helper Bar */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-slate-500 mr-1">Try:</span>
                  {["help", "skills", "resume", "contact"].map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => runCliCommand(cmd)}
                      className="px-2 py-0.5 rounded bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-slate-700/70 transition-colors"
                    >
                      {cmd}
                    </button>
                  ))}
                  {logs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => runCliCommand("clear")}
                      className="px-2 py-0.5 rounded bg-slate-800/60 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 transition-colors"
                    >
                      clear
                    </button>
                  )}
                </div>

                {/* Executed Command Logs */}
                {logs.map((log, index) => (
                  <div key={index} className="space-y-1 pt-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-emerald-400">prabhu@dev:~$</span>
                      <span className="text-white font-medium">{log.command}</span>
                    </div>
                    <div className="pl-3">{log.output}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Terminal Input Bar */}
              <form
                onSubmit={handleCommand}
                className="flex items-center px-4 py-2.5 bg-[#12172c] border-t border-slate-800"
              >
                <span className="text-emerald-400 font-mono text-xs mr-2 shrink-0">
                  prabhu@dev:~$
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type command (help, skills, resume)..."
                  className="flex-grow min-w-0 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  className="ml-2 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] transition-colors shrink-0"
                >
                  Enter ↵
                </button>
              </form>
            </div>

            {/* 3D Desk Showcase Platform (Desktop & Tablet) */}
            <StudioDeskPedestal accentColor={currentColorTheme.accent} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
