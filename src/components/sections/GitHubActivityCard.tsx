"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Github,
  ExternalLink,
  Flame,
  CalendarCheck,
  Trophy,
  FolderGit2,
  Sparkles,
  GitBranch,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";

interface ContributionDay {
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

interface GitHubResponse {
  username: string;
  selectedYear: string;
  availableYears: string[];
  totalContributions: number;
  contributions: ContributionDay[];
  stats: {
    activeDays: number;
    longestStreak: number;
    currentStreak: number;
    maxDay: ContributionDay | null;
    publicRepos: number;
    followers: number;
  };
  recentRepos: GitHubRepoSummary[];
  source: string;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDateReadable(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatRelativeTime(isoDate: string) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function GitHubActivityCard() {
  const { currentColorTheme } = useTheme();
  const [selectedYear, setSelectedYear] = useState<string>("last");
  const [colorMode, setColorMode] = useState<"theme" | "github">("github");
  const [data, setData] = useState<GitHubResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch(`/api/github?year=${encodeURIComponent(selectedYear)}`)
      .then((res) => res.json())
      .then((json: GitHubResponse) => {
        if (isMounted && Array.isArray(json.contributions)) {
          setData(json);
          setHoveredDay(null);
        }
      })
      .catch((err) => {
        console.error("Failed to load GitHub contributions:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  // Group contributions into Sun-Sat week columns + compute month label positions
  const { weeks, monthLabels } = useMemo(() => {
    const days = data?.contributions ?? [];
    if (days.length === 0) {
      return {
        weeks: [] as (ContributionDay | null)[][],
        monthLabels: [] as { label: string; colIndex: number }[],
      };
    }

    const firstDate = new Date(`${days[0].date}T00:00:00Z`);
    const leadingEmpty = firstDate.getUTCDay(); // 0 = Sunday

    const padded: (ContributionDay | null)[] = [
      ...Array.from({ length: leadingEmpty }, () => null),
      ...days,
    ];

    const groupedWeeks: (ContributionDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      const week = padded.slice(i, i + 7);
      while (week.length < 7) week.push(null);
      groupedWeeks.push(week);
    }

    const labels: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;

    groupedWeeks.forEach((week, colIndex) => {
      const firstValidDay = week.find((d) => d !== null);
      if (!firstValidDay) return;
      const monthIdx = parseInt(firstValidDay.date.split("-")[1], 10) - 1;
      if (monthIdx !== lastMonth) {
        // Avoid overlapping labels on adjacent first columns
        if (labels.length === 0 || colIndex - labels[labels.length - 1].colIndex >= 3) {
          labels.push({ label: MONTH_NAMES[monthIdx], colIndex });
        }
        lastMonth = monthIdx; 
      }
    });

    return { weeks: groupedWeeks, monthLabels: labels };
  }, [data]);

  const getCellStyle = (level: 0 | 1 | 2 | 3 | 4): React.CSSProperties => {
    if (level === 0) {
      return {
        backgroundColor: "#161b22",
        border: "1px solid rgba(255,255,255,0.05)",
      };
    }

    if (colorMode === "github") {
      const palette: Record<1 | 2 | 3 | 4, string> = {
        1: "#0e4429",
        2: "#006d32",
        3: "#26a641",
        4: "#39d353",
      };
      return {
        backgroundColor: palette[level],
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: level >= 3 ? `0 0 8px ${palette[level]}55` : undefined,
      };
    }

    const themeAlphas: Record<1 | 2 | 3 | 4, string> = {
      1: `${currentColorTheme.primary}44`,
      2: `${currentColorTheme.primary}80`,
      3: `${currentColorTheme.primary}cc`,
      4: currentColorTheme.primary,
    };

    return {
      backgroundColor: themeAlphas[level],
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow:
        level >= 3 ? `0 0 10px ${currentColorTheme.primary}66` : undefined,
    };
  };

  const yearOptions = data?.availableYears ?? ["last", "2026", "2025"];
  const activeInspect = hoveredDay || data?.stats.maxDay || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-4 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800/90 text-white shadow-2xl w-full max-w-full overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[110px] pointer-events-none opacity-20"
        style={{
          backgroundColor:
            colorMode === "github" ? "#26a641" : currentColorTheme.primary,
        }}
      />

      {/* Header Row */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative p-3 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-inner shrink-0">
            <Github className="h-6 w-6" />
            <span
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-950 animate-pulse"
              style={{
                backgroundColor:
                  colorMode === "github" ? "#39d353" : currentColorTheme.primary,
              }}
              title="Live GitHub Sync"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Open Source Activity
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live GitHub Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {isLoading ? (
                "Fetching real-time contribution telemetry..."
              ) : (
                <>
                  <span className="text-white font-semibold">
                    {data?.totalContributions ?? 0} contributions
                  </span>{" "}
                  {selectedYear === "last"
                    ? "in the last year"
                    : `in ${selectedYear}`}{" "}
                  by{" "}
                  <a
                    href="https://github.com/0xdevprabhu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-semibold"
                    style={{
                      color:
                        colorMode === "github"
                          ? "#39d353"
                          : currentColorTheme.primary,
                    }}
                  >
                    @0xdevprabhu
                  </a>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Controls: Palette Switcher + Year Pills + Profile Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Palette Mode Switch */}
          <button
            type="button"
            onClick={() =>
              setColorMode((prev) => (prev === "github" ? "theme" : "github"))
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-300 transition-colors"
            title="Switch contribution heatmap palette"
          >
            <Sparkles
              className="h-3.5 w-3.5"
              style={{
                color:
                  colorMode === "github" ? "#39d353" : currentColorTheme.primary,
              }}
            />
            <span>{colorMode === "github" ? "GitHub Green" : "Theme Glow"}</span>
          </button>

          {/* Year Filter Pills */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            {yearOptions.map((yr) => {
              const isActive = selectedYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor:
                            colorMode === "github"
                              ? "#238636"
                              : currentColorTheme.primary,
                        }
                      : undefined
                  }
                >
                  {yr === "last" ? "Last Year" : yr}
                </button>
              );
            })}
          </div>

          <a
            href="https://github.com/0xdevprabhu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-100 transition-colors"
          >
            <span>Profile</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Live Telemetry Stat Cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <Flame className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 truncate">Total Contributions</p>
            <p className="text-base sm:text-lg font-extrabold text-white">
              {isLoading ? "—" : data?.totalContributions ?? 0}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
            <CalendarCheck className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 truncate">Active Coding Days</p>
            <p className="text-base sm:text-lg font-extrabold text-white">
              {isLoading ? "—" : `${data?.stats.activeDays ?? 0} days`}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
            <Trophy className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 truncate">Longest Streak</p>
            <p className="text-base sm:text-lg font-extrabold text-white">
              {isLoading ? "—" : `${data?.stats.longestStreak ?? 0} days`}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <FolderGit2 className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 truncate">Public Repos</p>
            <p className="text-base sm:text-lg font-extrabold text-white">
              {isLoading ? "—" : data?.stats.publicRepos ?? 20}
            </p>
          </div>
        </div>
      </div>

      {/* Authentic 53-Week × 7-Day Contribution Calendar */}
      <div className="relative z-10 p-4 rounded-2xl bg-[#0d1117] border border-slate-800/90 w-full max-w-full overflow-hidden">
        <div className="w-full max-w-full overflow-x-auto pb-2">
          {isLoading ? (
            <div className="min-w-[680px] space-y-2 py-2 animate-pulse">
              <div className="h-3 w-full bg-slate-800/60 rounded" />
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {Array.from({ length: 371 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-[11px] w-[11px] rounded-[2px] bg-slate-800/80"
                  />
                ))}
              </div>
            </div>
          ) : weeks.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Unable to reach GitHub right now. Visit{" "}
              <a
                href="https://github.com/0xdevprabhu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline"
              >
                github.com/0xdevprabhu
              </a>{" "}
              directly.
            </div>
          ) : (
            <div className="min-w-[690px] inline-block">
              {/* Month Axis Labels */}
              <div className="flex items-center mb-1.5 pl-8 relative h-4 text-[10px] font-medium text-slate-400">
                {monthLabels.map((m) => (
                  <span
                    key={`${m.label}-${m.colIndex}`}
                    className="absolute"
                    style={{ left: `${32 + m.colIndex * 14}px` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Weekday Labels + 7-Row Grid */}
              <div className="flex items-start gap-2">
                <div className="flex flex-col justify-between h-[94px] text-[10px] font-medium text-slate-500 pt-[13px] pb-[13px] w-6 shrink-0 select-none">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                <div className="flex gap-[3px]">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dIdx) =>
                        day ? (
                          <button
                            key={day.date}
                            type="button"
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            onClick={() => setHoveredDay(day)}
                            aria-label={`${day.count} contributions on ${formatDateReadable(
                              day.date
                            )}`}
                            title={`${day.count} ${
                              day.count === 1 ? "contribution" : "contributions"
                            } on ${formatDateReadable(day.date)}`}
                            className="h-[11px] w-[11px] rounded-[2.5px] transition-all duration-150 hover:scale-125 focus:outline-none focus:ring-1 focus:ring-white/60"
                            style={getCellStyle(day.level)}
                          />
                        ) : (
                          <div
                            key={`empty-${wIdx}-${dIdx}`}
                            className="h-[11px] w-[11px]"
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Inspector & Color Legend Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 min-h-[18px]">
            {activeInspect ? (
              <>
                <span
                  className="inline-block h-2 w-2 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      colorMode === "github"
                        ? "#39d353"
                        : currentColorTheme.primary,
                  }}
                />
                <span>
                  {hoveredDay ? (
                    <>
                      <strong className="text-white">
                        {hoveredDay.count}{" "}
                        {hoveredDay.count === 1 ? "contribution" : "contributions"}
                      </strong>{" "}
                      on {formatDateReadable(hoveredDay.date)}
                    </>
                  ) : (
                    <>
                      Peak activity:{" "}
                      <strong className="text-white">
                        {activeInspect.count} contributions
                      </strong>{" "}
                      on {formatDateReadable(activeInspect.date)}
                    </>
                  )}
                </span>
              </>
            ) : (
              <span>Hover or tap any square to inspect daily contributions</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <span>Less</span>
            {([0, 1, 2, 3, 4] as const).map((lvl) => (
              <span
                key={lvl}
                className="h-[11px] w-[11px] rounded-[2.5px] inline-block"
                style={getCellStyle(lvl)}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Latest Pushed Repositories Strip */}
      {data?.recentRepos && data.recentRepos.length > 0 && (
        <div className="relative z-10 mt-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2.5">
            <GitBranch className="h-3.5 w-3.5 text-emerald-400" />
            <span>Recently Active Repositories</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.recentRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-2"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-emerald-400 transition-colors truncate">
                      {repo.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-slate-300 shrink-0" />
                  </div>
                  {repo.description && (
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                      {repo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          colorMode === "github"
                            ? "#39d353"
                            : currentColorTheme.primary,
                      }}
                    />
                    {repo.language || "Code"}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    {repo.stars > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-amber-400">
                        <Star className="h-2.5 w-2.5 fill-amber-400" />
                        {repo.stars}
                      </span>
                    )}
                    <span>{formatRelativeTime(repo.updatedAt)}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

