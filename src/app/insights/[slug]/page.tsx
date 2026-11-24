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

  const url = `https://0xdevprabhu.vercel.app/insights/${article.slug}`;
  const ogImage = "https://0xdevprabhu.vercel.app/assets/images/profile.jpg";

  return {
    title: article.title,
    description: article.summary,
    keywords: article.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.summary,
      publishedTime: article.publishedAt,
      authors: ["Prabhu P"],
      tags: article.keywords,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      creator: "@0xdevprabhu",
      images: [ogImage],
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

  const relatedInsights = engineeringInsightsData
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

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
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/#projects"
            className="px-4 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:border-primary hover:text-primary transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/#contact"
            className="px-4 py-2.5 rounded-full bg-primary text-white text-xs font-bold"
          >
            Start a Project &rarr;
          </Link>
        </div>
      </div>

      {relatedInsights.length > 0 && (
        <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Related Engineering Insights
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedInsights.map((related) => (
              <Link
                key={related.slug}
                href={`/insights/${related.slug}`}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors bg-white/50 dark:bg-slate-900/50"
              >
                <span className="text-[11px] font-mono text-primary font-semibold">
                  {related.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                  {related.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {related.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
