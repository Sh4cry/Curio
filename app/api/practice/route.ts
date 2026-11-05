import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const adaptiveSessionSchema = {
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

const practiceSchema = {
  type: "object", additionalProperties: false,
  required: ["correct", "feedback", "skillSignal", "nextPractice"],
  properties: {
    correct: { type: "boolean" }, feedback: { type: "string" }, skillSignal: { type: "string" },
    nextPractice: adaptiveSessionSchema,
  },
};

type SessionInput = {
  title?: string; subtitle?: string; minutes?: number; lessonTitle?: string; lesson?: string; example?: string;
  question?: string; practiceType?: string; choices?: string[]; expectedAnswer?: string; rubric?: string;
  answerIndex?: number; hint?: string; correctFeedback?: string; retryFeedback?: string; nextStep?: string;
};
type PracticeBody = {
  goal?: string; experience?: string; outcome?: string; dailyTime?: string; daysPerWeek?: string;
  preference?: string; challengeLevel?: string; response?: string; milestone?: SessionInput; nextMilestone?: SessionInput;
};

export async function POST(request: Request) {
  const apiKey = process.env.MODEL_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Live practice feedback needs MODEL_API_KEY in .env.local." }, { status: 503 });
  let body: PracticeBody;
  try { body = await request.json() as PracticeBody; }
  catch { return NextResponse.json({ error: "Please submit your practice answer again." }, { status: 400 }); }

  const milestone = body.milestone;
  if (!milestone?.question || !body.response?.trim()) return NextResponse.json({ error: "A practice question and answer are required." }, { status: 400 });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);

  try {
    const response = await fetch("https://api.meta.ai/v1/responses", {
      method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, signal: controller.signal,
      body: JSON.stringify({
        model: process.env.META_MODEL ?? "muse-spark-1.3",
        text: { format: { type: "json_schema", name: "curio_adaptive_practice", strict: true, schema: practiceSchema } },
        input: `You are Curio, a friendly, rigorous, family-friendly tutor. Evaluate the learner's answer against the exact exercise rubric. Be generous about harmless spelling, punctuation, and grammar variation; for language practice, judge understandable meaning and the target skill rather than perfect accents. Never mark a response correct if it misses the skill. Give specific, encouraging feedback.

Learner profile: goal=${body.goal || "learning"}; experience=${body.experience || "new"}; outcome=${body.outcome || "understand the subject"}; time=${body.dailyTime || "15 minutes"}; schedule=${body.daysPerWeek || "3 days a week"}; preference=${body.preference || "examples then practice"}; challenge=${body.challengeLevel || "balanced"}.
Current session: ${milestone.title || "Practice"}
Lesson: ${milestone.lesson || ""}
Example: ${milestone.example || ""}
Format: ${milestone.practiceType || "choice"}
Question: ${milestone.question}
Choices/word bank: ${(milestone.choices || []).join(" | ") || "none"}
Expected answer: ${milestone.expectedAnswer || ""}
Rubric: ${milestone.rubric || "Judge the demonstrated subject skill."}
Learner response: ${body.response.slice(0, 1200)}

Next planned skill: ${body.nextMilestone?.title || milestone.nextStep || "continue applying the current skill"}
Next planned lesson context: ${body.nextMilestone?.lesson || ""}

Return correct, feedback, skillSignal, and nextPractice. When the learner is incorrect, nextPractice must be a gentler review of the SAME skill with a new supported example, a small step, and a helpful no-spoiler hint. When correct, create a transfer challenge for the next planned skill, using a meaningfully different exercise format when possible. It must stay specific to the learner's subject. Use approximately ${body.dailyTime || "15 minutes"}. For choice, provide exactly three choices and set answerIndex to the correct one. For assemble, choices are a shuffled word bank. For text formats, choices=[]. Include a real rubric, a correct answer, specific hint, lesson, example, encouraging correct and retry feedback, and a clear nextStep. Do not execute code.`
      }),
    });
    if (!response.ok) {
      const details = await response.text();
      console.error("Meta practice API error", response.status, details.slice(0, 400));
      return NextResponse.json({ error: "Curio could not check that answer right now." }, { status: 502 });
    }
    const payload = await response.json() as { output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }> };
    const text = payload.output?.flatMap((item) => item.content ?? []).filter((part) => part.type === "output_text").map((part) => part.text || "").at(-1);
    if (!text) return NextResponse.json({ error: "Curio received an empty practice result." }, { status: 502 });
    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error("Curio practice evaluation failed", error);
    return NextResponse.json({ error: "Curio could not check that answer right now." }, { status: 502 });
  } finally { clearTimeout(timeout); }
}
