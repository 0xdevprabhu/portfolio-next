import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { engineeringInsightsData } from "@/data/insights";

export function generateStaticParams() {
  return engineeringInsightsData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = engineeringInsightsData.find((item) => item.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    keywords: article.keywords,
    alternates: {
      canonical: `https://0xdevprabhu.vercel.app/insights/${article.slug}`,
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = engineeringInsightsData.find((item) => item.slug === slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: "Prabhu P",
      url: "https://0xdevprabhu.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Prabhu P (@0xdevprabhu)",
    },
  };

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/insights"
        className="text-xs font-mono uppercase tracking-wider text-primary hover:underline"
      >
        &larr; All Engineering Insights
      </Link>

      <header className="mt-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
            {article.category}
          </span>
          <time dateTime={article.publishedAt}>{article.publishedAt}</time>
          <span>&bull;</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {article.title}
        </h1>
      </header>

      <div className="mt-8 space-y-5 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {article.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Need a Custom Web App or E-Commerce Portal in Sivakasi?
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Connect with Prabhu P (@0xdevprabhu) on Instagram, LinkedIn, or WhatsApp.
          </p>
        </div>
        <Link
          href="/#contact"
          className="px-4 py-2.5 rounded-full bg-primary text-white text-xs font-bold shrink-0"
        >
          Start a Project &rarr;
        </Link>
      </div>
    </main>
  );
}