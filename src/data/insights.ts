export interface EngineeringInsight {
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  keywords: string[];
  publishedAt: string;
  readTime: string;
}

export const engineeringInsightsData: EngineeringInsight[] = [
  {
    slug: "custom-ecommerce-and-b2b-portals-for-sivakasi-businesses",
    title: "Building High-Speed Custom E-Commerce & B2B Portals for Sivakasi Industries",
    summary:
      "How Sivakasi fireworks, printing, and retail enterprises can replace slow templates with custom PHP/MySQL and Next.js order management systems.",
    content: [
      "Businesses across Sivakasi and Virudhunagar handle high-volume seasonal orders, wholesale price lists, and rapid dispatch workflows that generic website builders struggle to support.",
      "By combining a secure LAMP stack (Linux, Apache, MySQL, PHP) backend with a modern Next.js or responsive frontend, local manufacturers and retailers can automate quotation generation, GST invoicing, and real-time stock visibility.",
      "At Noxlay Cyber Tech and through freelance engineering projects like SirenPyro and GrocerZap, custom-engineered architectures consistently deliver sub-second load times and higher search visibility across Tamil Nadu.",
    ],
    category: "Sivakasi Tech & E-Commerce",
    keywords: [
      "Sivakasi web developer",
      "custom ecommerce developer Sivakasi",
      "LAMP stack specialist Tamil Nadu",
    ],
    publishedAt: "2026-11-21",
    readTime: "3 min read",
  },
];