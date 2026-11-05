# Curio

Curio turns a learning goal into a guided, source-based course. It asks about a learner’s starting point, desired outcome, available time, weekly rhythm, learning preference, and challenge level, then builds a course with a continuous learn, practice, check, and adapt loop.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Meta Model API key as `MODEL_API_KEY`.
4. Run `npm run dev` and open `http://localhost:3000`.

The key stays server-side and `.env.local` is ignored by Git. The app uses Meta’s Responses API with web search grounding. `META_MODEL` defaults to `muse-spark-1.3`.

If live course generation is unavailable, Spanish has a local demo with four playable weeks and a 52-week outline. Non-Spanish goals show an explanation instead of unrelated sample lessons.

## Learning path

- The interview asks one question at a time about goal, experience, outcome, session length, days per week, learning preference, and challenge level.
- Course lengths range from 1 to 52 weeks. Curio suggests a duration and the learner can adjust it.
- Meta generates an outcome for each week and detailed lessons and practice for the first four weeks. Curio prepares later weeks as the learner reaches them.
- Practice uses rubric-based feedback. Misses trigger supported review; demonstrated understanding leads to a transfer activity. The plan can adapt the next practice and later weekly outline.
- Ask Curio follow-up questions from any lesson. Course sources and tutor citations are shown with the learning path or answer.
- The demo and guest progress remain in local browser storage. No learner files are required, and code samples are never executed.

## Current scope

This is a family-friendly guest demo. Sign-in, cloud persistence, and private source storage are not implemented yet. For health, legal, and financial subjects, Curio provides general education and avoids personalized advice.
