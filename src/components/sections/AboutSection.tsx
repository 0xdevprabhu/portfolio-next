"use client";

import React, { useState, useRef, useEffect } from "react";
import { profileData } from "@/data/profile";
import { useTheme } from "../theme/ThemeProvider";
import { Terminal, MapPin, Mail, Phone, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  onOpenResumePreview: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export function AboutSection({ onOpenResumePreview }: AboutSectionProps) {
  const { currentColorTheme } = useTheme();

  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: "cat devProfile.json",
      output: (
        <pre className="text-emerald-400 font-mono text-xs overflow-x-auto">
{`{
  "name": "Prabhu P",
  "role": "Full Stack Developer & LAMP Specialist",
  "company": "Noxlay Cyber Tech",
  "location": "Sivakasi, Tamil Nadu, IN",
  "primaryStack": ["PHP", "MySQL", "JavaScript", "Linux", "Apache"],
  "modernStack": ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  "aiExperience": ["Gemini API", "Claude", "ChatGPT"],
  "status": "Ready for high-impact engineering"
}`}
        </pre>
      ),
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="text-amber-300 space-y-1 font-mono text-xs">
            <p>Available commands:</p>
            <p>  <span className="text-cyan-400">help</span> - List available commands</p>
            <p>  <span className="text-cyan-400">resume</span> - Open interactive resume viewer</p>
            <p>  <span className="text-cyan-400">skills</span> - Display technical skill set</p>
            <p>  <span className="text-cyan-400">contact</span> - Get direct email and phone number</p>
            <p>  <span className="text-cyan-400">about</span> - Read bio synopsis</p>
            <p>  <span className="text-cyan-400">clear</span> - Clear terminal logs</p>
            <p>  <span className="text-cyan-400">sudo</span> - Elevated root execution test</p>
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
            <p className="text-cyan-400 font-bold">Backend & DB:</p>
            <p>  PHP (OOP, MVC), MySQL, Linux CLI, Apache, Laravel</p>
            <p className="text-cyan-400 font-bold mt-1">Frontend:</p>
            <p>  HTML5, CSS3, JavaScript (ES6+), React JS, Next.js, Tailwind CSS</p>
            <p className="text-cyan-400 font-bold mt-1">AI & Tools:</p>
            <p>  Google Gemini API, Git/GitHub, VS Code, XAMPP, phpMyAdmin</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-slate-200 font-mono text-xs space-y-1">
            <p>Email: <span className="text-cyan-400">0xdevprabhu@gmail.com</span></p>
            <p>Phone: <span className="text-cyan-400">+91 93440 95995</span></p>
            <p>Location: <span className="text-cyan-400">Sivakasi, Tamil Nadu, India</span></p>
          </div>
        );
        break;

      case "about":
        output = (
          <p className="text-slate-300 font-mono text-xs">
            Prabhu P is a Full Stack Developer & LAMP Stack Specialist at Noxlay Cyber Tech, focused on high-performance web applications, reliable databases, and practical AI integrations.
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
            Command not recognized: &apos;{cmd}&apos;. Type &apos;help&apos; for available commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [...prev, { command: inputVal, output }]);
    setInputVal("");
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/40">
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
            Who Am I?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            About Me
          </h2>
          <div
            className="h-1 w-12 mx-auto rounded-full mt-3"
            style={{ backgroundColor: currentColorTheme.primary }}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative Story & Contact Pills */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Passionate Full Stack Developer & LAMP Specialist
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                I am a passionate <span className="font-semibold text-slate-900 dark:text-white">Full Stack Developer</span> based in Sivakasi, India. My journey in tech is driven by an insatiable curiosity to solve real-world problems through clean code, structured relational databases, and high-performance server architectures.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Currently, I engineer client-facing solutions at <span className="font-semibold text-slate-900 dark:text-white">Noxlay Cyber Tech</span>, specializing in the complete LAMP stack (Linux, Apache, MySQL, PHP) while upskilling in modern React/Next.js frameworks and cutting-edge generative AI integration.
              </p>

              {/* Direct Info Badges */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-2.5">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>Sivakasi, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="mailto:0xdevprabhu@gmail.com"
                    className="hover:underline text-slate-900 dark:text-white font-medium"
                  >
                    0xdevprabhu@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="tel:+919344095995"
                    className="hover:underline text-slate-900 dark:text-white font-medium"
                  >
                    +91 93440 95995
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Developer Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col h-[420px]">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-3 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" />
                    developer_profile.json
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Interactive CLI
                </span>
              </div>

              {/* Terminal Logs & Output */}
              <div
                ref={terminalBodyRef}
                className="flex-grow p-4 overflow-y-auto space-y-3 font-mono text-xs text-slate-300"
              >
                <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-800/60">
                  Type <span className="text-amber-400 font-semibold">&apos;help&apos;</span> to discover available commands, or <span className="text-emerald-400 font-semibold">&apos;resume&apos;</span> to open CV.
                </div>

                {logs.map((log, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-emerald-400">prabhu@dev:~$</span>
                      <span className="text-white font-medium">{log.command}</span>
                    </div>
                    <div className="pl-4">{log.output}</div>
                  </div>
                ))}
              </div>

              {/* Terminal Interactive Input Form */}
              <form
                onSubmit={handleCommand}
                className="flex items-center px-4 py-3 bg-slate-900/80 border-t border-slate-800"
              >
                <span className="text-emerald-400 font-mono text-xs mr-2 shrink-0">
                  prabhu@dev:~$
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type command (e.g. help, skills, resume)..."
                  className="flex-grow bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  className="ml-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] transition-colors"
                >
                  Enter ↵
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
