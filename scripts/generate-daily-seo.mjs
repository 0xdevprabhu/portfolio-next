import fs from "node:fs";
import path from "node:path";

function loadGeminiApiKey() {
  const envVar = (process.env.GEMINI_API_KEY || "").trim();
  if (envVar) {
    return envVar;
  }

  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, "utf8");
    const matches = [...raw.matchAll(/^GEMINI_API_KEY\s*=\s*(.+)$/gm)];
    if (matches.length > 0) {
      const lastMatch = matches[matches.length - 1][1];
      return lastMatch.trim().replace(/^["']|["']$/g, "");
    }
  }

  return "";
}

const GEMINI_API_KEY = loadGeminiApiKey();
if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY not found in environment or .env file.");
  process.exit(1);
}

const MODEL_PRIORITY = [
  "gemini-3.8-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
];

const INSIGHTS_FILE = path.join(process.cwd(), "src", "data", "insights.ts");
const existingFileContent = fs.readFileSync(INSIGHTS_FILE, "utf8");

const existingTitles = [
  ...existingFileContent.matchAll(/title:\s*"([^"]+)"/g),
].map((m) => m[1]);

const todayISO = new Date().toISOString().split("T")[0];

const prompt = `
You are Prabhu P (@0xdevprabhu), an Elite Full Stack Developer & LAMP Stack Specialist at Noxlay Cyber Tech in Sivakasi, Tamil Nadu, India.
Generate ONE fresh, genuinely helpful, non-spammy technical & business insight article for your developer portfolio blog to strengthen organic SEO for searches like "Sivakasi developer", "freelance web developer in Sivakasi", "developer prabhu", "LAMP stack specialist", and "Next.js developer Tamil Nadu".

Avoid repeating these existing titles:
${existingTitles.map((t) => `- ${t}`).join("\n")}

Pick a practical angle covering web development, Next.js, PHP/MySQL security, AI chatbots, SaaS portals, or helping local businesses in Sivakasi, Virudhunagar, and Madurai scale online.

Return ONLY valid JSON matching this exact schema (no markdown fences):
{
  "slug": "url-friendly-kebab-case-slug",
  "title": "Compelling Specific Title (55-70 chars)",
  "summary": "Clear 1-2 sentence meta description summary (130-160 chars)",
  "content": [
    "Paragraph 1: Practical engineering or local business problem statement.",
    "Paragraph 2: Technical architecture solution using Next.js, PHP/MySQL, REST APIs, or AI.",
    "Paragraph 3: Real-world impact and how businesses or founders can collaborate with Prabhu P (@0xdevprabhu)."
  ],
  "category": "Short Category Name",
  "keywords": ["keyword 1", "keyword 2", "keyword 3"],
  "publishedAt": "${todayISO}",
  "readTime": "3 min read"
}
`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGeminiModel(modelName) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000); // 45s timeout for peak hours

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.75,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      return { ok: false, status: response.status, error: errBody };
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return { ok: false, status: 500, error: "Empty candidate response" };
    }

    return { ok: true, text: rawText };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err.name === "AbortError" ? "Request timed out (45s)" : err.message,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function discoverFallbackFlashModel() {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        headers: {
          "X-goog-api-key": GEMINI_API_KEY,
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const found = (data.models || []).find(
      (m) =>
        m.name?.includes("flash") &&
        !m.name?.includes("2.5") &&
        !m.name?.includes("2.0") &&
        Array.isArray(m.supportedGenerationMethods) &&
        m.supportedGenerationMethods.includes("generateContent")
    );
    return found ? found.name.replace(/^models\//, "") : null;
  } catch {
    return null;
  }
}

async function run() {
  console.log("Starting Daily Gemini SEO Generator...");

  let rawJsonText = null;
  let usedModel = null;
  const maxRounds = 3;

  for (let round = 1; round <= maxRounds; round++) {
    if (round > 1) {
      const waitSec = round * 3;
      console.log(`\nTemporary server load detected. Retrying round ${round}/${maxRounds} in ${waitSec}s...`);
      await sleep(waitSec * 1000);
    }

    for (const model of MODEL_PRIORITY) {
      console.log(`-> Trying model: ${model}...`);
      const result = await callGeminiModel(model);

      if (result.ok) {
        rawJsonText = result.text;
        usedModel = model;
        break;
      }

      const shortReason =
        result.status === 503
          ? "High demand (503)"
          : result.status === 429
          ? "Rate limited (429)"
          : result.status === 404
          ? "Not found (404)"
          : result.error;

      console.warn(`   [${model}] skipped: ${shortReason}`);
    }

    if (rawJsonText) break;
  }

  if (!rawJsonText) {
    console.log("-> Auto-discovering active Gemini Flash model...");
    const discovered = await discoverFallbackFlashModel();
    if (discovered && !MODEL_PRIORITY.includes(discovered)) {
      console.log(`-> Trying discovered model: ${discovered}...`);
      const result = await callGeminiModel(discovered);
      if (result.ok) {
        rawJsonText = result.text;
        usedModel = discovered;
      }
    }
  }

  if (!rawJsonText) {
    throw new Error(
      "Gemini servers are temporarily overloaded (503). Try running again in 1 minute."
    );
  }

  const cleanedJson = rawJsonText
    .replace(/^```json\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const newInsight = JSON.parse(cleanedJson);

  const safeSlug = `${newInsight.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "")}-${todayISO}`;
  newInsight.slug = safeSlug;
  newInsight.publishedAt = todayISO;

  const formattedEntry = `  ${JSON.stringify(newInsight, null, 2).replace(
    /\n/g,
    "\n  "
  )},\n`;

  const markerRegex = /export const engineeringInsightsData: EngineeringInsight\[\] = \[\r?\n/;
  const match = existingFileContent.match(markerRegex); if (!match) {
    throw new Error("Could not find array marker in src/data/insights.ts");
  }

  const updatedContent = existingFileContent.replace(markerRegex, `${match[0]}${formattedEntry}`
  );

  fs.writeFileSync(INSIGHTS_FILE, updatedContent, "utf8");
  console.log(`\nSuccess using [${usedModel}]!`);
  console.log(`Added SEO Insight: "${newInsight.title}"`);
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  });
