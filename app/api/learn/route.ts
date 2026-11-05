import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

type OutlineWeek = { number: number; title: string; outcome: string };
type RequestBody = {
  goal?: string;
  experience?: string;
  outcome?: string;
  dailyTime?: string;
  daysPerWeek?: string;
  preference?: string;
  challengeLevel?: string;
  durationWeeks?: number;
  focusWeek?: number;
  currentOutline?: OutlineWeek[];
};

type Citation = { title: string; url: string; why?: string; snippet?: string };

const sessionSchema = {
  type: "object", additionalProperties: false,
  required: ["title", "subtitle", "minutes", "lessonTitle", "lesson", "example", "question", "practiceType", "choices", "expectedAnswer", "rubric", "answerIndex", "hint", "correctFeedback", "retryFeedback", "nextStep"],
  properties: {
    title: { type: "string" }, subtitle: { type: "string" }, minutes: { type: "integer", minimum: 1, maximum: 90 },
    lessonTitle: { type: "string" }, lesson: { type: "string" }, example: { type: "string" }, question: { type: "string" },
    practiceType: { type: "string", enum: ["choice", "translate", "fill_blank", "assemble", "roleplay"] },
    choices: { type: "array", items: { type: "string" } }, expectedAnswer: { type: "string" }, rubric: { type: "string" },
    answerIndex: { type: "integer", minimum: 0, maximum: 2 }, hint: { type: "string" },
    correctFeedback: { type: "string" }, retryFeedback: { type: "string" }, nextStep: { type: "string" },
  },
};

function makeSchema(weeks: number, detailStart: number, detailEnd: number) {
  return {
    type: "object", additionalProperties: false,
    required: ["title", "subtitle", "level", "durationWeeks", "weeks", "sources"],
    properties: {
      title: { type: "string" }, subtitle: { type: "string" }, level: { type: "string" },
      durationWeeks: { type: "integer", minimum: weeks, maximum: weeks },
      weeks: {
        type: "array", minItems: weeks, maxItems: weeks,
        items: {
          type: "object", additionalProperties: false,
          required: ["number", "title", "outcome", "playable", "sessions"],
          properties: {
            number: { type: "integer", minimum: 1, maximum: weeks }, title: { type: "string" }, outcome: { type: "string" },
            playable: { type: "boolean" }, sessions: { type: "array", minItems: 0, maxItems: 7, items: sessionSchema },
          },
        },
      },
      sources: {
        type: "array", minItems: 1, maxItems: 8,
        items: {
          type: "object", additionalProperties: false, required: ["title", "url", "why"],
          properties: { title: { type: "string" }, url: { type: "string" }, why: { type: "string" } },
        },
      },
    },
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.MODEL_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Meta Model API is not configured." }, { status: 503 });

  let body: RequestBody;
  try { body = await request.json() as RequestBody; }
  catch { return NextResponse.json({ error: "Please try your learning goal again." }, { status: 400 }); }

  const durationWeeks = Math.max(1, Math.min(52, Math.round(Number(body.durationWeeks) || 1)));
  const focusWeek = Math.max(1, Math.min(durationWeeks, Math.round(Number(body.focusWeek) || 1)));
  const detailEnd = Math.min(durationWeeks, focusWeek + 3);
  const studyDays = /every day/i.test(body.daysPerWeek || "") ? 7 : /5 days/i.test(body.daysPerWeek || "") ? 5 : /3 days/i.test(body.daysPerWeek || "") ? 3 : 2;
  const outline = Array.isArray(body.currentOutline) ? body.currentOutline.slice(0, durationWeeks) : [];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 115_000);

  try {
    const response = await fetch("https://api.meta.ai/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.META_MODEL ?? "muse-spark-1.3",
        tools: [{ type: "web_search", search_context_size: "high" }],
        include: ["web_search_call.results"],
        text: { format: { type: "json_schema", name: "curio_weekly_learning_path", strict: true, schema: makeSchema(durationWeeks, focusWeek, detailEnd) } },
        input: `You are Curio, a warm, rigorous personal tutor. Create an adaptive learning path grounded in trustworthy sources you find with web search. Prefer official documentation, universities, museums, public institutions, textbooks, and open courseware. Prefer accessible, age-appropriate resources. Never invent citations.

Learner profile:
- Goal and subject: ${body.goal || "Learn a new subject"}
- Starting experience: ${body.experience || "Beginner"}
- Desired outcome: ${body.outcome || "Understand the fundamentals"}
- Session length: ${body.dailyTime || "15 minutes"}
- Study rhythm: ${body.daysPerWeek || "3 days a week"} (${studyDays} sessions per week)
- Learning preference: ${body.preference || "Examples then practice"}
- Challenge preference: ${body.challengeLevel || "A balanced mix"}
- Total track length: exactly ${durationWeeks} weeks
- Detailed-session window: weeks ${focusWeek} through ${detailEnd}
${outline.length ? `Existing week outline to preserve as the plan evolves: ${JSON.stringify(outline)}` : "Create a coherent week-by-week outline for the full track."}

Return exactly ${durationWeeks} ordered weeks. Every week needs a clear, measurable outcome. Create detailed lessons and distinct practice sessions ONLY for weeks ${focusWeek} through ${detailEnd}; for the other weeks return playable=false and sessions=[]. For each detailed week, create exactly ${studyDays} sessions (one per chosen study day), each fitting in ${body.dailyTime || "15 minutes"}. Set playable=true only when sessions are present. Each session must include a concise lesson, a concrete example, one subject-specific exercise, an exact no-spoiler hint, an understandable rubric, and supportive correct/retry feedback. Vary exercise formats where suitable and progressively build skill. Choices are three plausible options for choice, a shuffled word bank for assemble, and [] for written response formats. Use real subject practice, never generic study-skills questions. On later requests, preserve the existing outline's subject and outcomes while filling the newly requested detailed-session window; adjust its next outcomes if the learner's new evidence warrants it.

For language learning, use natural, level-appropriate phrases and accept reasonable answer variants. For coding, ask for code or tracing but do not run learner code. For health, legal, and finance topics, teach general concepts only, avoid personalized advice, and encourage qualified help for personal decisions. Keep all language family-friendly.

Return a JSON object with title, subtitle, level, durationWeeks, weeks, and sources. The weeks array has exactly ${durationWeeks} items, numbered 1..${durationWeeks}; every item has number, title, outcome, playable, sessions. Sources must be trustworthy links that support the course.`
      }),
    });
    if (!response.ok) {
      const details = await response.text();
      console.error("Meta Model API error", response.status, details.slice(0, 500));
      return NextResponse.json({ error: "Curio could not build the live learning path. Please try again." }, { status: 502 });
    }

    const payload = await response.json() as {
      status?: string; incomplete_details?: { reason?: string };
      output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }>; results?: Array<{ title?: string; url?: string; snippet?: string }> }>;
    };
    const outputTexts = payload.output?.flatMap((item) => item.content ?? []).filter((part) => part.type === "output_text").map((part) => part.text || "") ?? [];
    const text = outputTexts.at(-1);
    if (!text) return NextResponse.json({ error: "Curio received an empty learning path." }, { status: 502 });
    let course: Record<string, unknown>;
    try {
      const cleanText = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      const firstBrace = cleanText.indexOf("{");
      const lastBrace = cleanText.lastIndexOf("}");
      course = JSON.parse(firstBrace >= 0 && lastBrace > firstBrace ? cleanText.slice(firstBrace, lastBrace + 1) : cleanText) as Record<string, unknown>;
    } catch (error) {
      console.error("Meta course output was not valid JSON", { status: payload.status, incompleteReason: payload.incomplete_details?.reason, outputTypes: payload.output?.map((item) => item.type), textStart: text.slice(0, 250) });
      throw error;
    }
    const searchResults: Citation[] = payload.output?.filter((item) => item.type === "web_search_call").flatMap((item) => (item.results ?? []).filter((result) => result.url && /^https?:\/\//.test(result.url)).map((result) => ({ title: result.title || result.url!, url: result.url!, snippet: result.snippet }))) ?? [];
    const reportedSources = Array.isArray(course.sources) ? course.sources as Citation[] : [];
    const sources = [...new Map([...reportedSources, ...searchResults].filter((source) => /^https?:\/\//.test(source.url)).map((source) => [source.url, source])).values()].slice(0, 8);
    return NextResponse.json({ ...course, sources, mode: "live" });
  } catch (error) {
    console.error("Curio course generation failed", error);
    return NextResponse.json({ error: "Curio’s research took too long this time. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
