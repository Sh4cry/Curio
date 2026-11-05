import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const apiKey = process.env.MODEL_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Live tutor chat needs MODEL_API_KEY in .env.local." }, { status: 503 });
  const body = await request.json() as { question?: string; goal?: string; experience?: string; preference?: string; challengeLevel?: string; lesson?: string; source?: string };
  if (!body.question?.trim()) return NextResponse.json({ error: "Type a question for Curio." }, { status: 400 });
  try {
    const response = await fetch("https://api.meta.ai/v1/responses", {
      method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.META_MODEL ?? "muse-spark-1.3", tools: [{ type: "web_search", search_context_size: "medium" }], include: ["web_search_call.results"], input: `You are Curio, a kind, family-friendly tutor. Answer the learner's follow-up with clear steps, one concrete example, and citations when web search is useful. Keep the answer concise and suited to the learner's level and preference. For medical, legal, or financial matters, give only general educational information and encourage consulting a qualified professional for personal decisions.\n\nLearning goal: ${body.goal || "Learning"}\nStarting experience: ${body.experience || "New learner"}\nLearning preference: ${body.preference || "Examples then practice"}\nChallenge preference: ${body.challengeLevel || "Balanced"}\nCurrent lesson: ${body.lesson || ""}\nSources: ${body.source || ""}\nLearner asks: ${body.question}` })
    });
    if (!response.ok) return NextResponse.json({ error: "Curio could not answer right now. Please try again." }, { status: 502 });
    const data = await response.json() as { output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string; annotations?: Array<{ type?: string; title?: string; url?: string }> }> }> };
    const part = data.output?.flatMap((item) => item.content ?? []).filter((item) => item.type === "output_text").at(-1);
    const citations = part?.annotations?.filter((item) => item.type === "url_citation" && item.url).map(({ title, url }) => ({ title, url })) ?? [];
    return NextResponse.json({ answer: part?.text || "I’m not sure yet. Try asking in another way.", citations });
  } catch {
    return NextResponse.json({ error: "Curio could not answer right now. Please try again." }, { status: 502 });
  }
}
