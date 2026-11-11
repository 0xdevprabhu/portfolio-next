import React from "react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";

export function JsonLd() {
  const baseUrl = "https://0xdevprabhu.vercel.app";

  // 1. Person Schema (Identity, Handle, Company, Location, Socials)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Prabhu P",
    alternateName: [
      "0xdevprabhu",
      "devprabhu",
      "Prabhu",
      "Prabhu Sivakasi",
      "Sivakasi Freelancer Prabhu",
      "Noxlay Developer Prabhu",
      "Prabhu P Developer",
    ],
    jobTitle: [
      "Full Stack Developer",
      "Freelance Web Developer",
      "Freelancer in Sivakasi",
      "LAMP Stack Specialist",
      "AI Web Applications Engineer",
      "Web Developer",
      "Software Engineer",
    ],
    description:
      "Certified LAMP Stack Specialist, Full Stack Developer at Noxlay Cyber Tech, and Freelance Web Developer in Sivakasi, Tamil Nadu. Builds custom business websites, e-commerce platforms, B2B portals, Next.js, React, PHP, MySQL, and AI applications.",
    url: baseUrl,
    image: `${baseUrl}/assets/images/profile.jpg`,
    email: "mailto:0xdevprabhu@gmail.com",
    telephone: "+919344095995",
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
      name: "Sivakasi, Tamil Nadu, India",
      geo: {
        "@type": "GeoCoordinates",
        latitude: "9.4533",
        longitude: "77.7946",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "Noxlay Cyber Tech",
      url: "https://www.noxlay.com/",
      sameAs: ["https://www.noxlay.com/"],
      location: {
        "@type": "PostalAddress",
        addressLocality: "Sivakasi",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
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
      "Sivakasi Web Development & IT Solutions",
    ],
    sameAs: [
      "https://github.com/0xdevprabhu",
      "https://www.linkedin.com/in/0xdevprabhu",
      "https://www.instagram.com/in__prabhu/?hl=en",
      "https://www.youtube.com/@PrabhuP-s9l",
      "https://wa.me/919344095995",
    ],
  };

  // 2. WebSite Schema (with SearchAction / Sitelinks metadata)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "0xdevprabhu | Prabhu P Portfolio",
    alternateName: [
      "Prabhu P Portfolio",
      "0xdevprabhu",
      "Noxlay Developer Prabhu",
      "Sivakasi Full Stack Developer",
    ],
    description:
      "Official portfolio website of Prabhu P (@0xdevprabhu), Full Stack Developer & LAMP Stack Specialist at Noxlay Cyber Tech, Sivakasi.",
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    inLanguage: ["en-US", "ta-IN"],
  };

  // 3. BreadcrumbList Schema (Crucial for Google Rich Breadcrumb Snippets)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Prabhu P",
        item: `${baseUrl}/#about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Technical Skills",
        item: `${baseUrl}/#skills`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Experience at Noxlay Cyber Tech",
        item: `${baseUrl}/#experience`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Client & AI Projects",
        item: `${baseUrl}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Verified Certifications",
        item: `${baseUrl}/#certifications`,
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Contact & Hire Developer",
        item: `${baseUrl}/#contact`,
      },
    ],
  };

  // 4. ProfessionalService / LocalBusiness Schema (Ranks high for "Sivakasi developer" & "Sivakasi freelancer")
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name: "Prabhu P (@0xdevprabhu) - Freelance Web & Full Stack Developer Sivakasi",
    image: `${baseUrl}/assets/images/profile.jpg`,
    description:
      "Freelance web development, custom business websites, LAMP stack engineering, e-commerce solutions, B2B fireworks catalogs, and AI web applications by Prabhu P in Sivakasi, Tamil Nadu, India.",
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
            name: "Fireworks & B2B Digital Catalog / WhatsApp Estimation Portals",
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

  // 5. ItemList Schema for Featured Projects (Rich Project Search snippets)
  const projectsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projects by Prabhu P",
    description:
      "Web applications, live client portals, and AI systems engineered by Prabhu P at Noxlay Cyber Tech.",
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

  // 6. ProfilePage Schema (Directly linking the WebPage to Person)
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#webpage`,
    url: baseUrl,
    name: "Prabhu P (0xdevprabhu) - Developer Portfolio & Projects",
    description:
      "Full Stack Developer & LAMP Stack Specialist portfolio of Prabhu P, Sivakasi. Showcase of enterprise web applications, AI tools, and technical skills.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}

