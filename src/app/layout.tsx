import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://0xdevprabhu.vercel.app"),
  title: "Prabhu P | Elite Full Stack Developer & LAMP Stack Specialist",
  description:
    "Portfolio of Prabhu P, a Certified LAMP Stack Specialist, Full Stack Developer, and AI Enthusiast based in Sivakasi. View my projects, experience, resume, and credentials.",
  keywords: [
    "Prabhu P",
    "Full Stack Developer",
    "LAMP Stack Specialist",
    "AI Enthusiast",
    "Sivakasi",
    "Web Developer",
    "Noxlay Cyber Tech",
    "React",
    "Next.js",
    "PHP Developer",
  ],
  authors: [{ name: "Prabhu P", url: "https://0xdevprabhu.vercel.app/" }],
  creator: "Prabhu P",
  icons: {
    icon: "/assets/images/profile.jpg",
    apple: "/assets/images/profile.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://0xdevprabhu.vercel.app/",
    title: "Prabhu P | Elite Full Stack Developer",
    description: "Certified LAMP Stack Specialist and AI Enthusiast from Sivakasi, Tamil Nadu.",
    images: [
      {
        url: "/assets/images/profile.jpg",
        width: 800,
        height: 800,
        alt: "Prabhu P - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabhu P | Elite Full Stack Developer",
    description: "Certified LAMP Stack Specialist and AI Enthusiast from Sivakasi.",
    images: ["/assets/images/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prabhu P",
              jobTitle: "Full Stack Developer & LAMP Stack Specialist",
              worksFor: {
                "@type": "Organization",
                name: "Noxlay Cyber Tech",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Sivakasi",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              url: "https://0xdevprabhu.vercel.app/",
              image: "https://0xdevprabhu.vercel.app/assets/images/profile.jpg",
              sameAs: [
                "https://www.linkedin.com/in/0xdevprabhu",
                "https://github.com/0xdevprabhu",
                "https://www.instagram.com/in__prabhu/?hl=en",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <LoadingScreen minDuration={1000} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
