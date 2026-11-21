import type { Metadata } from "next";
import Link from "next/link";
import { engineeringInsightsData } from "@/data/insights";

export const metadata: Metadata = {
  title: "Engineering Insights & Web Development Notes — Sivakasi",
  description:
    "Technical articles, LAMP stack architecture notes, Next.js guides, and digital solutions for businesses in Sivakasi & Tamil Nadu by Prabhu P (@0xdevprabhu).",
  alternates: {
    canonical: "https://0xdevprabhu.vercel.app/insights",
  },
};

export default function InsightsIndexPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <div className="mb-10">
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-wider text-primary hover:underline"
        >
          &larr; Back to Portfolio
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          Engineering Insights &amp; Tech Notes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Practical full-stack engineering, LAMP architecture, AI integration, and web solutions by{" "}
          <strong className="text-slate-900 dark:text-white">Prabhu P (@0xdevprabhu)</strong> in Sivakasi, Tamil Nadu.
        </p>
      </div>

      <div className="space-y-5">
        {engineeringInsightsData.map((item) => (
          <article
            key={item.slug}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2">
              <span className="text-primary font-semibold">{item.category}</span>
              <span>&bull;</span>
              <time dateTime={item.publishedAt}>{item.publishedAt}</time>
              <span>&bull;</span>
              <span>{item.readTime}</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              <Link href={`/insights/${item.slug}`} className="hover:text-primary transition-colors">
                {item.title}
              </Link>
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {item.summary}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}