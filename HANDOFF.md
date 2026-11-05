# Curio — Hackathon Project Handoff

Curio is a personal AI tutor that turns a learner’s goal into a guided, evolving course. Its core loop is learn, practice, check understanding, and adapt. The target is the Meta Global AI Developer Hackathon, with a polished learning experience for self-learners and students.

## Current product and implementation

- The learner names a goal. Curio asks, one question at a time, about starting level, outcome, session length, days per week, learning preference, and challenge level.
- Plans support 1–52 weeks with an adjustable recommendation. Each week has an outcome; detailed lessons and sessions are generated for the near term and prepared as the learner progresses.
- Meta Model API is integrated server-side using the Responses API and web search grounding. The model is `muse-spark-1.3` by default and the key is read from the ignored `.env.local` file as `MODEL_API_KEY`.
- The live app supports any educational subject, with family-friendly prompts and added guardrails for sensitive topics. Spanish has a deterministic four-week local demo fallback and a curated year outline.
- Practice feedback is rubric-based. Misses get a supported review; mastery gets a transfer challenge. The model can adapt the upcoming exercise and course outline.
- Follow-up tutor chat uses the current lesson and citations. The learner does not need to upload a source file.
- Guests retain progress in browser storage. Sign-in/cloud storage and private file storage are future work. No code execution in v1.
- Future hosting preference: Next.js + TypeScript + Supabase + Vercel. Keep API credentials server-side.

## Workspace

This project belongs in `D:\Curio`. The previous workspace, `D:\Python\Quant-analysis-copilot`, was selected by mistake and should remain untouched for Curio work.
