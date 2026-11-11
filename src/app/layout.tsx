import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { JsonLd } from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://0xdevprabhu.vercel.app"),
  title: {
    default:
      "0xdevprabhu | Prabhu P - Full Stack Developer & Freelancer in Sivakasi | Noxlay Cyber Tech",
    template: "%s | Prabhu P (@0xdevprabhu)",
  },
  description:
    "Official portfolio of Prabhu P (@0xdevprabhu), Certified LAMP Stack Specialist, Full Stack Developer at Noxlay Cyber Tech, and Freelance Web Developer in Sivakasi, Tamil Nadu. Available for freelance websites, e-commerce stores, Next.js, React, PHP, MySQL, and AI apps. Explore ZipZap Jobs Portal, ChessMate AI, Grocerzap & more.",
  applicationName: "0xdevprabhu Portfolio",
  authors: [
    { name: "Prabhu P", url: "https://0xdevprabhu.vercel.app" },
    { name: "0xdevprabhu", url: "https://github.com/0xdevprabhu" },
  ],
  generator: "Next.js",
  keywords: [
    // Personal Brand & Handles
    "0xdevprabhu",
    "devprabhu",
    "Prabhu P",
    "Prabhu developer",
    "Prabhu Sivakasi",
    "0xdevprabhu portfolio",
    "Prabhu portfolio",
    "Prabhu P developer",
    "developer",
    
    // Company Queries (Noxlay)
    "Noxlay developer",
    "Noxlay Cyber Tech developer",
    "Noxlay company developer",
    "Noxlay software engineer",
    "Noxlay web developer",
    "Noxlay Prabhu",
    "Noxlay tech team",

    // Sivakasi & Tamil Nadu Freelancer / Developer Location Keywords
    "Sivakasi developer",
    "Sivakasi freelancer",
    "freelancer in Sivakasi",
    "freelance web developer in Sivakasi",
    "freelance full stack developer Sivakasi",
    "freelance software developer Sivakasi",
    "hire freelancer in Sivakasi",
    "web developer in Sivakasi",
    "full stack developer in Sivakasi",
    "software developer Sivakasi",
    "freelance developer Sivakasi",
    "freelance web designer Sivakasi",
    "best freelancer in Sivakasi",
    "Sivakasi web designer",
    "custom website developer Sivakasi",
    "ecommerce website developer Sivakasi",
    "fireworks website developer Sivakasi",
    "Tamil Nadu developer",
    "Tamil Nadu freelance web developer",
    "best developer in Sivakasi",
    "web development services Sivakasi",
    "Sivakasi IT specialist",
    "Virudhunagar developer",
    "freelance web developer Virudhunagar",
    "Madurai web developer",
    "freelance web developer India",

    // Tech Stack & Engineering Specializations
    "LAMP stack specialist",
    "LAMP stack developer",
    "PHP MySQL developer",
    "PHP freelance developer India",
    "Next.js developer",
    "Next.js freelance developer",
    "React developer",
    "React freelance developer",
    "Full Stack Developer",
    "Frontend developer Sivakasi",
    "Backend developer Sivakasi",
    "AI integration engineer",
    "REST API developer",
    "Tailwind CSS developer",
    "TypeScript developer",
    "Linux Apache MySQL PHP",
    "Stockfish AI developer",

    // Project & Intent Searches
    "ZipZap Jobs Portal",
    "ZipZap Jobs developer",
    "Grocerzap developer",
    "Sirenpyro developer",
    "ChessMate AI developer",
    "Smartmenu developer",
    "Niranya fashions developer",
    "Hire web developer in Sivakasi",
    "Hire full stack developer",
    "Hire freelance developer Tamil Nadu",
    "0xdevprabhu freelancer",
    "0xdevprabhu projects",
    "0xdevprabhu contact",
    "Prabhu resume",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Prabhu P (@0xdevprabhu)",
  publisher: "Prabhu P",
  category: "technology",
  classification: "Portfolio / Software Engineering",
  alternates: {
    canonical: "https://0xdevprabhu.vercel.app",
    languages: {
      "en-US": "https://0xdevprabhu.vercel.app",
      "ta-IN": "https://0xdevprabhu.vercel.app",
    },
  },
  icons: {
    icon: [
      { url: "/assets/images/profile.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/assets/images/profile.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: [
      { url: "/assets/images/profile.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: "/assets/images/profile.jpg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://0xdevprabhu.vercel.app/",
    siteName: "0xdevprabhu | Prabhu P Portfolio",
    title: "0xdevprabhu | Prabhu P - Full Stack Developer & Freelancer in Sivakasi",
    description:
      "Certified LAMP Stack Specialist, Full Stack Developer at Noxlay Cyber Tech & Freelance Web Developer in Sivakasi. Explore ZipZap Jobs Portal, ChessMate AI, Grocerzap & hire for freelance or full-time projects.",
    images: [
      {
        url: "/assets/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Prabhu P (@0xdevprabhu) - Full Stack Developer & Freelancer in Sivakasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@0xdevprabhu",
    creator: "@0xdevprabhu",
    title: "Prabhu P (@0xdevprabhu) | Full Stack Developer & Freelancer in Sivakasi",
    description:
      "Certified LAMP Stack Specialist, Full Stack Developer at Noxlay Cyber Tech & Freelance Web Developer in Sivakasi. Explore ZipZap Jobs Portal, ChessMate AI & hire.",
    images: ["/assets/images/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "google-site-verification=GSC_VERIFICATION_TOKEN_HERE",
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Sivakasi",
    "geo.position": "9.4533;77.7946",
    "ICBM": "9.4533, 77.7946",
    "contact:email": "0xdevprabhu@gmail.com",
    "contact:phone_number": "+919344095995",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Canonical link */}
        <link rel="canonical" href="https://0xdevprabhu.vercel.app/" />

        {/* Structured Data (Schema.org / JSON-LD) */}
        <JsonLd />

        {/* Anti-FOUC Theme Initialization Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isDark = localStorage.getItem('prabhu_portfolio_dark') === 'true';
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary overflow-x-hidden w-full max-w-full">
        <ThemeProvider>
          <LoadingScreen minDuration={1000} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
