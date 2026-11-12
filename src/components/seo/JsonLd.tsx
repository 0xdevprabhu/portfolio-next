import React from "react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";

export function JsonLd() {
  const baseUrl = "https://0xdevprabhu.vercel.app";

  // 1. Person Schema (Primary Authoritative Entity for Prabhu P / @0xdevprabhu)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: profileData.name,
    alternateName: [
      "0xdevprabhu",
      "Prabhu P.",
      "devprabhu",
      "Prabhu Sivakasi",
      "Prabhu P Developer",
    ],
    jobTitle: [
      "Elite Full Stack Developer",
      "Full Stack Developer",
      "Freelance Web Developer",
      "LAMP Stack Specialist",
      "AI Web Applications Engineer",
    ],
    description:
      "Prabhu P (@0xdevprabhu) is an Elite Full Stack Developer, Certified LAMP Stack Specialist & Freelance Web Developer in Sivakasi, Tamil Nadu, building scalable SaaS systems, Next.js interfaces, PHP/MySQL platforms, and AI applications.",
    url: baseUrl,
    image: `${baseUrl}/assets/images/profile.jpg`,
    email: `mailto:${profileData.email}`,
    telephone: profileData.phone,
    gender: "Male",
    nationality: {
      "@type": "Country",
      name: "India",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sivakasi",
      addressRegion: "Tamil Nadu",
      postalCode: "626123",
      addressCountry: "IN",
    },
    homeLocation: {
      "@type": "Place",
      name: profileData.location,
      geo: {
        "@type": "GeoCoordinates",
        latitude: "9.4533",
        longitude: "77.7946",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: profileData.company,
      url: "https://www.noxlay.com/",
      sameAs: ["https://www.noxlay.com/"],
    },
    knowsAbout: [
      "Full Stack Web Development",
      "LAMP Stack (Linux, Apache, MySQL, PHP)",
      "Next.js & React",
      "TypeScript & JavaScript",
      "Tailwind CSS",
      "RESTful APIs & Backend Architecture",
      "Artificial Intelligence & LLM Integration",
      "Stockfish AI Chess Engine",
      "E-Commerce Architecture & Payment Gateways",
      "Relational Database Design (MySQL)",
      "Web Security (SQLi, XSS, CSRF Protection)",
    ],
    sameAs: [
      "https://github.com/0xdevprabhu",
      "https://www.linkedin.com/in/0xdevprabhu",
      "https://www.instagram.com/in__prabhu/?hl=en",
      "https://www.youtube.com/@PrabhuP-s9l",
      "https://wa.me/919344095995",
    ],
  };

  // 2. WebSite Schema (Explicit short Site Name "Prabhu P" for Google SERP Site Name override)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Prabhu P",
    alternateName: [
      "0xdevprabhu",
      "Prabhu P - Elite Full Stack Developer",
      "Prabhu P Portfolio",
    ],
    description:
      "Official portfolio of Prabhu P (@0xdevprabhu) - Elite Full Stack Developer & Freelance Web Developer in Sivakasi, India.",
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    inLanguage: ["en-US", "ta-IN"],
  };

  // 3. BreadcrumbList Schema (Clean 3-level hierarchy for Google SERP Breadcrumb trail)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Prabhu P",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Elite Full Stack Developer",
        item: `${baseUrl}/#about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Portfolio & Projects",
        item: `${baseUrl}/#projects`,
      },
    ],
  };

  // 4. SiteNavigationElement Schema (Helps Google understand portfolio sections & sitelinks)
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/#navigation`,
    name: "Portfolio Navigation",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Home",
        url: `${baseUrl}/#home`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "About Me",
        url: `${baseUrl}/#about`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Skills & GitHub",
        url: `${baseUrl}/#skills`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Experience & Education",
        url: `${baseUrl}/#experience`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Featured Projects",
        url: `${baseUrl}/#projects`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Certifications",
        url: `${baseUrl}/#certifications`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 7,
        name: "Contact & Hire",
        url: `${baseUrl}/#contact`,
      },
    ],
  };

  // 5. ProfessionalService Schema (Local & Freelance SEO)
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name: "Prabhu P (@0xdevprabhu) - Elite Full Stack & Freelance Web Developer",
    image: `${baseUrl}/icon-512x512.png`,
    description:
      "Freelance web development, custom business websites, LAMP stack engineering, e-commerce solutions, Next.js apps, and AI web portals by Prabhu P in Sivakasi, Tamil Nadu, India.",
    url: baseUrl,
    telephone: "+919344095995",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sivakasi",
      addressLocality: "Sivakasi",
      addressRegion: "Tamil Nadu",
      postalCode: "626123",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "9.4533",
      longitude: "77.7946",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    areaServed: [
      "Sivakasi",
      "Virudhunagar",
      "Madurai",
      "Tamil Nadu",
      "India",
      "Remote Worldwide",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance Web & Software Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Freelance Custom Business Website Development in Sivakasi",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce & Payment Gateway Web Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Next.js, React, PHP & MySQL Full Stack Engineering",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Chatbot & Generative AI Web Integrations",
          },
        },
      ],
    },
    founder: {
      "@id": `${baseUrl}/#person`,
    },
  };

  // 6. ItemList Schema for Featured Projects
  const projectsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projects by Prabhu P",
    description:
      "Production web platforms, freelance client portals, and AI tools developed by Prabhu P (@0xdevprabhu).",
    numberOfItems: projectsData.length,
    itemListElement: projectsData.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
        operatingSystem: "Web Browser",
        url: project.liveUrl,
        author: {
          "@id": `${baseUrl}/#person`,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
    })),
  };

  // 7. FAQPage Schema (Strengthens authoritative rich snippets & AI citations)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Prabhu P (0xdevprabhu)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prabhu P (@0xdevprabhu) is an Elite Full Stack Developer, Certified LAMP Stack Specialist, and Freelance Web Developer based in Sivakasi, Tamil Nadu, India, specializing in PHP, Laravel, MySQL, Next.js, React, and AI web applications.",
        },
      },
      {
        "@type": "Question",
        name: "Is Prabhu P available for freelance web development in Sivakasi or remotely?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Prabhu P is available as a Freelance Web Developer in Sivakasi, Tamil Nadu and for remote clients worldwide — building custom business websites, e-commerce stores, B2B estimation portals, SaaS platforms, and AI chatbots.",
        },
      },
      {
        "@type": "Question",
        name: "What notable web projects has Prabhu P built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notable projects by Prabhu P include ZipZap Jobs Portal, ChessMate AI (powered by Stockfish AI & Next.js), Grocerzap, Sirenpyro, SmartMenu, Niranya Fashions, and enterprise portals.",
        },
      },
    ],
  };

  // 8. ProfilePage Schema (Directly linking the WebPage to Person, Breadcrumbs & Primary Image)
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#webpage`,
    url: baseUrl,
    name: "Prabhu P - Elite Full Stack Developer | 0xdevprabhu",
    description:
      "Official portfolio of Prabhu P (@0xdevprabhu) - Elite Full Stack Developer & Freelance Web Developer in Sivakasi featuring client web platforms, AI tools, and technical credentials.",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/icon-512x512.png`,
    },
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    about: {
      "@id": `${baseUrl}/#person`,
    },
    mainEntity: {
      "@id": `${baseUrl}/#person`,
    },
    breadcrumb: {
      "@id": `${baseUrl}/#breadcrumbs`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
