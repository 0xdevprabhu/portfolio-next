"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Home, MapPin } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

const sectionLabels: Record<string, string> = {
  home: "Home",
  about: "About Prabhu",
  skills: "Technical Skills",
  experience: "Experience @ Noxlay",
  projects: "Client & AI Projects",
  certifications: "Certifications",
  contact: "Contact & Hire",
};

export function BreadcrumbNav() {
  const { currentColorTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "certifications",
        "contact",
      ];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden md:flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 pt-20 pb-1.5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {/* Item 1: Home */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            href="#home"
            itemProp="item"
            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span itemProp="name">0xdevprabhu</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        <li aria-hidden="true" className="text-slate-400 dark:text-slate-600">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>

        {/* Item 2: Regional/Developer Hub */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            href="#about"
            itemProp="item"
            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <MapPin className="h-3 w-3 text-primary" />
            <span itemProp="name">Sivakasi Developer</span>
          </Link>
          <meta itemProp="position" content="2" />
        </li>

        <li aria-hidden="true" className="text-slate-400 dark:text-slate-600">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>

        {/* Item 3: Current Active Section */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            href={`#${activeSection}`}
            itemProp="item"
            className="font-semibold transition-colors"
            style={{ color: currentColorTheme.primary }}
          >
            <span itemProp="name">{sectionLabels[activeSection] || "Overview"}</span>
          </Link>
          <meta itemProp="position" content="3" />
        </li>
      </ol>
    </nav>
  );
}

