import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = "0xdevprabhu";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubRepoSummary {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  updatedAt: string;
}

/**
 * Parse GitHub's official contributions fragment HTML into structured daily entries.
 */
function parseGitHubContributionsHtml(html: string): {
  contributions: ContributionDay[];
  total: number;
} {
  // Extract tooltip counts keyed by cell ID (e.g., contribution-day-component-0-0)
  const tooltipCounts = new Map<string, number>();
  const tooltipRegex =
    /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
  let tipMatch: RegExpExecArray | null;
  while ((tipMatch = tooltipRegex.exec(html)) !== null) {
    const cellId = tipMatch[1];
    const text = tipMatch[2].trim();
    const numMatch = text.match(/^(\d+)\s+contribution/);
    tooltipCounts.set(cellId, numMatch ? parseInt(numMatch[1], 10) : 0);
  }

  // Extract total count from header
  let parsedTotal = 0;
  const totalMatch = html.match(
    /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contribution/i
  );
  if (totalMatch) {
    parsedTotal = parseInt(totalMatch[1].replace(/,/g, ""), 10) || 0;
  }

  // Extract all day cells
  const cellRegex = /<td\s+([^>]*data-date="[^"]+"[^>]*)>/g;
  const contributions: ContributionDay[] = [];
  let cellMatch: RegExpExecArray | null;

  while ((cellMatch = cellRegex.exec(html)) !== null) {
    const attrs = cellMatch[1];
    const dateMatch = attrs.match(/data-date="(\d{4}-\d{2}-\d{2})"/);
    const levelMatch = attrs.match(/data-level="([0-4])"/);
    const idMatch = attrs.match(/id="([^"]+)"/);

    if (dateMatch && levelMatch) {
      const date = dateMatch[1];
      const level = parseInt(levelMatch[1], 10) as 0 | 1 | 2 | 3 | 4;
      const cellId = idMatch ? idMatch[1] : "";
      const count = tooltipCounts.get(cellId) ?? (level > 0 ? level : 0);
      contributions.push({ date, count, level });
    }
  }

  // Sort chronologically by date
  contributions.sort((a, b) => a.date.localeCompare(b.date));

  const sumCount = contributions.reduce((acc, d) => acc + d.count, 0);
  return {
    contributions,
    total: parsedTotal > 0 ? parsedTotal : sumCount,
  };
}

/**
 * Compute activity metrics from chronological contribution days.
 */
function computeMetrics(contributions: ContributionDay[]) {
  let activeDays = 0;
  let longestStreak = 0;
  let runningStreak = 0;
  let maxDay: ContributionDay | null = null;

  for (const day of contributions) {
    if (day.count > 0) {
      activeDays++;
      runningStreak++;
      if (runningStreak > longestStreak) {
        longestStreak = runningStreak;
      }
      if (!maxDay || day.count > maxDay.count) {
        maxDay = day;
      }
    } else {
      runningStreak = 0;
    }
  }

  // Compute current streak up to the latest recorded day (allowing today = 0 if yesterday > 0)
  let currentStreak = 0;
  for (let i = contributions.length - 1; i >= 0; i--) {
    const day = contributions[i];
    if (day.count > 0) {
      currentStreak++;
    } else if (i === contributions.length - 1) {
      // Allow today to still have 0 commits without breaking streak from yesterday
      continue;
    } else {
      break;
    }
  }

  return {
    activeDays,
    longestStreak,
    currentStreak,
    maxDay,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year") || "last";
  const isSpecificYear = /^\d{4}$/.test(yearParam);

  let contributions: ContributionDay[] = [];
  let totalContributions = 0;
  let source = "github-live";

  // 1. Primary: Fetch directly from GitHub contributions endpoint
  try {
    const ghUrl = isSpecificYear
      ? `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${yearParam}-01-01&to=${yearParam}-12-31`
      : `https://github.com/users/${GITHUB_USERNAME}/contributions`;

    const res = await fetch(ghUrl, {
      headers: {
        "User-Agent": "portfolio-next-0xdevprabhu",
        Accept: "text/html",
      },
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      const html = await res.text();
      const parsed = parseGitHubContributionsHtml(html);
      if (parsed.contributions.length > 0) {
        contributions = parsed.contributions;
        totalContributions = parsed.total;
      }
    }
  } catch (err) {
    console.warn("Direct GitHub HTML fetch failed, trying fallback API:", err);
  }

  // 2. Fallback: Use Jogruber public GitHub contributions JSON API
  if (contributions.length === 0) {
    try {
      const fallbackYear = isSpecificYear ? yearParam : "last";
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${fallbackYear}`,
        { next: { revalidate: 1800 } }
      );
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.contributions)) {
          contributions = json.contributions;
          const totalObj = json.total || {};
          totalContributions =
            (isSpecificYear ? totalObj[yearParam] : totalObj.lastYear) ??
            contributions.reduce((acc, d) => acc + (d.count || 0), 0);
          source = "github-api-fallback";
        }
      }
    } catch (err) {
      console.error("Fallback GitHub contributions fetch failed:", err);
    }
  }

  // 3. Fetch public user profile & latest repositories (best-effort)
  let publicRepos = 20;
  let followers = 0;
  let recentRepos: GitHubRepoSummary[] = [];

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=3`,
        {
          headers: { Accept: "application/vnd.github.v3+json" },
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (userRes.ok) {
      const userData = await userRes.json();
      publicRepos = userData.public_repos ?? publicRepos;
      followers = userData.followers ?? followers;
    }

    if (reposRes.ok) {
      const reposData = await reposRes.json();
      if (Array.isArray(reposData)) {
        recentRepos = reposData.map((r) => ({
          name: r.name,
          description: r.description,
          url: r.html_url,
          language: r.language,
          stars: r.stargazers_count || 0,
          updatedAt: r.pushed_at,
        }));
      }
    }
  } catch {
    // Silent fallback if unauthenticated GitHub REST API rate limit is hit
  }

  const metrics = computeMetrics(contributions);
  const currentYear = new Date().getFullYear();
  const availableYears = ["last", String(currentYear), String(currentYear - 1)];

  return NextResponse.json(
    {
      username: GITHUB_USERNAME,
      selectedYear: yearParam,
      availableYears,
      totalContributions,
      contributions,
      stats: {
        ...metrics,
        publicRepos,
        followers,
      },
      recentRepos,
      source,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    }
  );
}

