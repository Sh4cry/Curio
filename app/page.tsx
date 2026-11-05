"use client";

import { useEffect, useState } from "react";
import { createSpanishDemo, recommendSpanishDuration, type LearningCourse as Course, type DemoSession } from "./demo-spanish";

type Stage = "interview" | "building" | "track" | "lesson" | "quiz" | "result" | "unsupported";
type IconName = "spark" | "compass" | "book" | "clock" | "calendar" | "arrow" | "check" | "file" | "link" | "play" | "chat" | "light" | "chevron" | "back" | "plus" | "lock" | "menu" | "close" | "send" | "quote" | "target" | "leaf";
type PracticeEvaluation = { correct: boolean; feedback: string; skillSignal: string; nextPractice?: DemoSession };

const Icon = ({ name, size = 18 }: { name: IconName; size?: number }) => {
  const shared = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<IconName, React.ReactNode> = {
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.8 8.2-2.2 5.4-5.4 2.2 2.2-5.4 5.4-2.2Z"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M4 6v16M8 7h8M8 11h7"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" strokeWidth="2.4"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1"/></>,
    play: <><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none"/></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2 1.4-4A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="2.4"/></>,
    light: <><path d="M9 18h6M10 22h4M8.2 14.5A7 7 0 1 1 15.8 14.5c-.9.8-1.3 1.7-1.5 2.5h-4.6c-.2-.8-.6-1.7-1.5-2.5Z"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    back: <><path d="M19 12H5M11 18l-6-6 6-6"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/></>,
    quote: <><path d="M10 11H5V6h5v5Zm9 0h-5V6h5v5ZM5 11c0 4-1 6-3 7m12-7c0 4-1 6-3 7"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    leaf: <><path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 8-8 8-16Z"/><path d="M4 21c2-5 6-8 12-11"/></>,
  };
  return <svg {...shared}>{paths[name]}</svg>;
};

const interviewQuestions = [
  { title: "What would you love to learn?", sub: "A goal, a skill, or a question you can’t stop thinking about.", placeholder: "For example: Spanish for confident conversations", kind: "text" },
  { title: "Where are you starting from?", sub: "New to it, coming back, or ready for advanced work? There’s no wrong door.", kind: "options", options: ["Completely new", "I’ve tried a little", "I know the fundamentals", "Ready for advanced work"] },
  { title: "What would you love to do with it?", sub: "Tell Curio what a real win would look like for you.", kind: "options", options: ["Feel confident in everyday conversations", "Make a project or solve a real problem", "Feel confident with the fundamentals", "Go deeper in my current field", "Support a class or exam"] },
  { title: "How much time feels realistic most days?", sub: "Your track will fit around your life, not the other way around.", kind: "options", options: ["10 minutes", "15 minutes", "30 minutes"] },
  { title: "How many days a week can you show up?", sub: "A realistic rhythm beats a perfect plan. Choose what you can keep.", kind: "options", options: ["Every day", "5 days a week", "3 days a week", "1–2 days a week"] },
  { title: "How do you like to learn?", sub: "We’ll use this to shape the explanations and practice.", kind: "options", options: ["See examples, then try", "Talk it through together", "Practice first, then explain"] },
  { title: "What kind of challenge sounds fun?", sub: "Curio can make your track gentle, balanced, or a proper stretch.", kind: "options", options: ["Gentle steps, lots of encouragement", "A balanced mix", "Stretch me with tougher practice", "Go deep; assume I know the basics"] },
];

export default function Home() {
  const [stage, setStage] = useState<Stage>("interview");
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("Learn Spanish for confident everyday conversations");
  const [answers, setAnswers] = useState<string[]>(["", "Completely new", "Feel confident in everyday conversations", "15 minutes", "3 days a week", "See examples, then try", "A balanced mix"]);
  const [durationWeeks, setDurationWeeks] = useState(52);
  const [recommendedWeeks, setRecommendedWeeks] = useState(52);
  const [course, setCourse] = useState<Course | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [apiNotice, setApiNotice] = useState("");
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [completedSessions, setCompletedSessions] = useState<Record<number, number[]>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatText, setChatText] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>(["Hi! I’m here if you want to think this through together. What part feels fuzzy?"]);
  const [showHint, setShowHint] = useState(false);
  const [freeResponse, setFreeResponse] = useState("");
  const [assembledTokens, setAssembledTokens] = useState<number[]>([]);
  const [practiceEvaluation, setPracticeEvaluation] = useState<PracticeEvaluation | null>(null);
  const [isCheckingPractice, setIsCheckingPractice] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const currentQuestion = interviewQuestions[step];
  const currentAnswer = step === 0 ? goal : answers[step];
  const targetLearningDays = /every day/i.test(answers[4]) ? 7 : /5 days/i.test(answers[4]) ? 5 : /3 days/i.test(answers[4]) ? 3 : 2;
  const learnerProfile = { goal, experience: answers[1], outcome: answers[2], dailyTime: answers[3], daysPerWeek: answers[4], preference: answers[5], challengeLevel: answers[6] };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("curio.demo.v2");
      if (saved) {
        const state = JSON.parse(saved) as {
          goal?: string; answers?: string[]; durationWeeks?: number; recommendedWeeks?: number; course?: (Omit<Course, "mode"> & { mode?: string }) | null;
          currentWeekIndex?: number; currentSessionIndex?: number; completedSessions?: Record<number, number[]>;
          stage?: Stage; earnedXp?: number; selectedAnswer?: number | null; freeResponse?: string; assembledTokens?: number[];
          practiceEvaluation?: PracticeEvaluation | null; showHint?: boolean;
        };
        if (state.goal) setGoal(state.goal);
        if (state.answers?.length === 7) setAnswers(state.answers);
        if (state.durationWeeks) setDurationWeeks(state.durationWeeks);
        if (state.recommendedWeeks) setRecommendedWeeks(state.recommendedWeeks);
        if (state.course?.weeks?.length) setCourse({ ...state.course, mode: state.course.mode === "live" ? "live" : "demo" });
        if (typeof state.currentWeekIndex === "number") setCurrentWeekIndex(state.currentWeekIndex);
        if (typeof state.currentSessionIndex === "number") setCurrentSessionIndex(state.currentSessionIndex);
        if (state.completedSessions) setCompletedSessions(state.completedSessions);
        if (state.stage && state.stage !== "unsupported" && state.stage !== "building") setStage(state.stage);
        if (typeof state.earnedXp === "number") setEarnedXp(state.earnedXp);
        if (typeof state.selectedAnswer === "number" || state.selectedAnswer === null) setSelectedAnswer(state.selectedAnswer);
        if (state.freeResponse) setFreeResponse(state.freeResponse);
        if (state.assembledTokens) setAssembledTokens(state.assembledTokens);
        if (state.practiceEvaluation) setPracticeEvaluation(state.practiceEvaluation);
        if (state.showHint) setShowHint(state.showHint);
      }
    } catch { localStorage.removeItem("curio.demo.v2"); }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("curio.demo.v2", JSON.stringify({
      goal, answers, durationWeeks, recommendedWeeks, course, currentWeekIndex, currentSessionIndex,
      completedSessions, stage, earnedXp, selectedAnswer, freeResponse, assembledTokens, practiceEvaluation, showHint,
    }));
  }, [hydrated, goal, answers, durationWeeks, recommendedWeeks, course, currentWeekIndex, currentSessionIndex, completedSessions, stage, earnedXp, selectedAnswer, freeResponse, assembledTokens, practiceEvaluation, showHint]);

  useEffect(() => {
    if (!hydrated || !course || course.mode !== "live" || course.durationWeeks === durationWeeks || isGeneratingPlan) return;
    const timeout = window.setTimeout(() => { void refreshLiveCourse(durationWeeks, currentWeekIndex + 1); }, 900);
    return () => window.clearTimeout(timeout);
  }, [hydrated, course, durationWeeks, currentWeekIndex, isGeneratingPlan]);

  async function nextInterview() {
    if (step === 0 && goal.trim()) setAnswers((prev) => prev.map((item, index) => index === 0 ? goal : item));
    if (step < interviewQuestions.length - 1) setStep((prev) => prev + 1);
    else await buildTrack();
  }

  function setOption(option: string) {
    setAnswers((prev) => prev.map((item, index) => index === step ? option : item));
  }

  async function fetchLiveCourse(selectedDuration: number, focusWeek: number, existingCourse?: Course | null) {
    const response = await fetch("/api/learn", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...learnerProfile, durationWeeks: selectedDuration, focusWeek,
        currentOutline: existingCourse?.weeks.map(({ number, title, outcome }) => ({ number, title, outcome })),
      }),
    });
    const data = await response.json() as Course & { error?: string };
    if (!response.ok) throw new Error(data.error || "Curio could not build that learning path.");
    if (!Array.isArray(data.weeks) || data.weeks.length !== selectedDuration) throw new Error("Curio returned an incomplete weekly outline. Please try again.");
    return { ...data, mode: "live" as const };
  }

  async function refreshLiveCourse(selectedDuration: number, focusWeek: number) {
    if (!course || course.mode !== "live") return;
    const previousCourse = course;
    setIsGeneratingPlan(true);
    setApiNotice("");
    try {
      const nextCourse = await fetchLiveCourse(selectedDuration, focusWeek, previousCourse);
      setCourse(nextCourse);
      setDurationWeeks(selectedDuration);
    } catch (error) {
      setDurationWeeks(previousCourse.durationWeeks);
      setApiNotice(error instanceof Error ? error.message : "Curio couldn’t update this plan.");
    } finally { setIsGeneratingPlan(false); }
  }

  async function buildTrack(durationOverride?: number) {
    const profile = { ...learnerProfile };
    const recommendation = recommendSpanishDuration(profile);
    const selectedDuration = durationOverride ?? recommendation;
    setRecommendedWeeks(recommendation);
    setDurationWeeks(selectedDuration);
    setCurrentWeekIndex(0);
    setCurrentSessionIndex(0);
    setCompletedSessions({});
    setEarnedXp(0);
    setSelectedAnswer(null);
    setFreeResponse("");
    setAssembledTokens([]);
    setPracticeEvaluation(null);
    setApiNotice("");
    setStage("building");
    setIsGeneratingPlan(true);
    try {
      const liveCourse = await fetchLiveCourse(selectedDuration, 1);
      setCourse(liveCourse);
      setStage("track");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Curio couldn’t connect to the live tutor.";
      setApiNotice(`${message} ${/spanish|español/i.test(goal) ? "Showing the local Spanish demo instead." : ""}`.trim());
      if (/spanish|español/i.test(goal)) {
        setCourse(createSpanishDemo(profile, selectedDuration));
        setStage("track");
      } else {
        setCourse(null);
        setStage("unsupported");
      }
    } finally { setIsGeneratingPlan(false); }
  }

  function adjustDuration(value: number) {
    const selectedDuration = Math.max(1, Math.min(52, value));
    setDurationWeeks(selectedDuration);
    setCurrentWeekIndex((week) => Math.min(week, selectedDuration - 1));
    setCurrentSessionIndex(0);
    setApiNotice("");
    if (course?.mode === "demo") {
      setCourse(createSpanishDemo(learnerProfile, selectedDuration));
    }
  }

  function continuePath() {
    setShowHint(false);
    if (!answerIsCorrect) {
      setShowHint(true);
      setStage("lesson");
      setPracticeEvaluation(null);
      setFreeResponse("");
      setAssembledTokens([]);
      setSelectedAnswer(null);
      return;
    }
    if (!course || !activeWeek || !activeMilestone) return;
    setCompletedSessions((previous) => {
      const done = new Set(previous[currentWeekIndex] || []);
      done.add(currentSessionIndex);
      return { ...previous, [currentWeekIndex]: [...done] };
    });
    setPracticeEvaluation(null);
    setFreeResponse("");
    setAssembledTokens([]);
    setSelectedAnswer(null);
    if (currentSessionIndex < activeWeek.sessions.length - 1) {
      setCurrentSessionIndex((session) => session + 1);
      setStage("lesson");
    } else if (currentWeekIndex < course.weeks.length - 1) {
      setCurrentWeekIndex((week) => week + 1);
      setCurrentSessionIndex(0);
      setStage("track");
    } else {
      setStage("track");
    }
  }

  const activeWeek = course?.weeks[currentWeekIndex];
  const activeMilestone = activeWeek?.sessions[currentSessionIndex];
  const practiceType = activeMilestone?.practiceType || "choice";
  const canSubmitPractice = practiceType === "choice" ? selectedAnswer !== null : practiceType === "assemble" ? assembledTokens.length > 0 : Boolean(freeResponse.trim());
  const answerIsCorrect = practiceEvaluation?.correct ?? selectedAnswer === (activeMilestone?.answerIndex ?? 0);
  const currentWeekDone = Boolean(activeWeek?.sessions.length && activeWeek.sessions.every((_, index) => (completedSessions[currentWeekIndex] || []).includes(index)));

  function submittedPractice() {
    if (!activeMilestone) return "";
    if ((activeMilestone.practiceType || "choice") === "choice") return selectedAnswer === null ? "" : activeMilestone.choices[selectedAnswer] || "";
    if (activeMilestone.practiceType === "assemble") return assembledTokens.map((index) => activeMilestone.choices[index]).join(" ");
    return freeResponse.trim();
  }

  function previewEvaluation(milestone: DemoSession, response: string): PracticeEvaluation {
    const normalize = (value: string) => value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[¿¡.,!?;:]/g, "").replace(/\s+/g, " ").trim();
    const variants = (milestone.expectedAnswer || milestone.choices[milestone.answerIndex] || "").split(/\s*\|\s*/).map(normalize).filter(Boolean);
    const answer = normalize(response);
    const type = milestone.practiceType || "choice";
    let correct = false;
    if (type === "choice") correct = selectedAnswer === milestone.answerIndex;
    else if (type === "roleplay") correct = answer.split(" ").length >= 5 && (/\b(me gusta|quisiera|quiero|soy|estoy|puedes|cuanto|donde|porque|recomiendas|te gusta|me encanta|opino)\b/.test(answer) || /[¿?]/.test(response));
    else correct = variants.some((variant) => answer === variant || (variant.length > 4 && answer.includes(variant)));
    return {
      correct,
      feedback: correct ? milestone.correctFeedback : milestone.retryFeedback,
      skillSignal: correct ? "You showed the key idea in this exercise." : "This idea may need one more supported example before moving on.",
    };
  }

  async function finishQuiz() {
    if (!activeMilestone) return;
    const learnerResponse = submittedPractice();
    if (!learnerResponse.trim()) return;
    let evaluation: PracticeEvaluation;
    if (course?.mode === "live") {
      setIsCheckingPractice(true);
      setApiNotice("");
      try {
        const nextSession = activeWeek?.sessions[currentSessionIndex + 1] || course.weeks[currentWeekIndex + 1]?.sessions[0];
        const response = await fetch("/api/practice", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...learnerProfile, response: learnerResponse, milestone: activeMilestone,
            nextMilestone: nextSession || { title: activeWeek?.outcome || "Apply this skill", lesson: activeWeek?.outcome || "" },
          }),
        });
        const data = await response.json() as PracticeEvaluation & { error?: string };
        if (!response.ok) throw new Error(data.error || "Curio couldn’t check this answer.");
        evaluation = data;
        const nextPractice = data.nextPractice;
        if (nextPractice) {
          setCourse((previous) => {
            if (!previous) return previous;
            const weeks = previous.weeks.map((week) => ({ ...week, sessions: [...week.sessions] }));
            if (!data.correct) {
              weeks[currentWeekIndex].sessions[currentSessionIndex] = nextPractice;
            } else if (currentSessionIndex + 1 < weeks[currentWeekIndex].sessions.length) {
              weeks[currentWeekIndex].sessions[currentSessionIndex + 1] = nextPractice;
            } else if (currentWeekIndex + 1 < weeks.length) {
              const nextWeek = weeks[currentWeekIndex + 1];
              if (nextWeek.sessions.length) nextWeek.sessions[0] = nextPractice;
              else { nextWeek.sessions = [nextPractice]; nextWeek.playable = true; }
            }
            return { ...previous, weeks };
          });
        }
      } catch (error) {
        setApiNotice(error instanceof Error ? error.message : "Live feedback is unavailable. A local check was used.");
        evaluation = previewEvaluation(activeMilestone, learnerResponse);
      } finally { setIsCheckingPractice(false); }
    } else {
      evaluation = previewEvaluation(activeMilestone, learnerResponse);
      evaluation.skillSignal = evaluation.correct
        ? "You showed this skill. Your next practice takes it into a new situation."
        : "This idea will get another try with its hint and worked example close by.";
    }
    setPracticeEvaluation(evaluation);
    setEarnedXp((xp) => xp + (evaluation.correct ? 12 : 4));
    setStage("result");
  }

  async function sendChat() {
    if (!chatText.trim()) return;
    const question = chatText.trim();
    setChatMessages((previous) => [...previous, question]);
    setChatText("");
    if (course?.mode === "live") {
      try {
        const response = await fetch("/api/tutor", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...learnerProfile, question, lesson: activeMilestone?.lesson, source: course.sources.map((source) => `${source.title}: ${source.url}`).join("\n") }),
        });
        const data = await response.json() as { answer?: string; citations?: Array<{ title: string; url: string }>; error?: string };
        if (!response.ok) throw new Error(data.error || "Curio couldn’t answer right now.");
        const citations = data.citations?.length ? `\n\nSources: ${data.citations.map((citation) => `${citation.title} (${citation.url})`).join(" · ")}` : "";
        setChatMessages((previous) => [...previous, `${data.answer || "I’m not sure yet. Try asking in another way."}${citations}`]);
      } catch (error) {
        setChatMessages((previous) => [...previous, error instanceof Error ? error.message : "Curio couldn’t answer right now. Please try again."]);
      }
      return;
    }
    const reply = activeMilestone
      ? `Let’s look at this step together. The example is “${activeMilestone.example}”. ${question.toLowerCase().includes("hint") ? activeMilestone.hint : "Try noticing which phrase in the example matches the skill you are practicing."}`
      : "This is the Spanish demo guide. Choose a week to see its lessons and practice.";
    setChatMessages((previous) => [...previous, reply]);
  }

  return (
    <main className="app-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <button className="menu-toggle icon-button" onClick={() => setMobileNavOpen((open) => !open)} aria-label="Toggle navigation"><Icon name="menu" /></button>
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); setStage("interview"); setStep(0); }}>
          <span className="brand-mark"><Icon name="spark" size={20} /></span><span>curio</span>
        </a>
        <div className="topbar-center"><span className="eyebrow-pill"><span className="status-dot" /> YOUR LEARNING STUDIO</span></div>
        <div className="topbar-actions"><button className="help-link" onClick={() => setChatOpen(true)}><span className="help-icon">?</span><span>Need a hand?</span></button><button className="avatar" aria-label="Guest profile">J</button></div>
      </header>

      <div className="layout">
        <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-top-label">YOUR SPACE</div>
          <button className={`nav-item ${stage === "interview" || stage === "building" ? "nav-active" : ""}`} onClick={() => { setStage("interview"); setStep(0); setMobileNavOpen(false); }}><span className="nav-icon"><Icon name="compass" /></span><span>Start something new</span></button>
          <button className={`nav-item ${stage === "track" || stage === "lesson" || stage === "quiz" || stage === "result" ? "nav-active" : ""}`} onClick={() => { if (course) setStage("track"); setMobileNavOpen(false); }}><span className="nav-icon"><Icon name="book" /></span><span>My learning paths</span><span className="nav-count">{course ? "1" : "0"}</span></button>
          <div className="sidebar-rule" />
          <div className="sidebar-top-label path-label">IN PROGRESS <button className="tiny-add" onClick={() => { setStage("interview"); setStep(0); }} aria-label="Add a learning path"><Icon name="plus" size={15} /></button></div>
          {course && <button className="path-item" onClick={() => setStage("track")}><span className="path-icon"><span>{course.title.slice(0, 2)}</span></span><span className="path-copy"><strong>{course.title}</strong><small>{course.level}</small></span><Icon name="chevron" size={15} /></button>}
          <div className="sidebar-spacer" />
          <div className="mini-progress-card">
            <div className="mini-progress-top"><span className="mini-sun"><Icon name="spark" size={15} /></span><span>YOUR RHYTHM</span><span className="xp-mini">✦ {earnedXp} XP</span></div>
            <strong>{answers[4] || "3 days a week"}</strong>
            <p>{answers[3] || "15 minutes"} per session · {durationWeeks} weeks</p>
            <div className="week-dots" aria-label={`${targetLearningDays} study days chosen per week`}>{Array.from({ length: 7 }, (_, index) => <i key={index} className={index < targetLearningDays ? "dot-done" : ""}/>)}</div>
            <div className="week-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
          </div>
          <div className="sidebar-footer"><span className="privacy-mark"><Icon name="lock" size={14} /></span><span>Your space is private</span></div>
        </aside>

        <section className="main-area" aria-live="polite">
          {stage === "interview" && (
            <div className="interview-wrap">
              <div className="interview-kicker"><span className="kicker-line"/> A PATH THAT FITS YOU <span className="kicker-line"/></div>
              <div className="interview-title"><h1>Your next big<br/><em>“aha!” starts here.</em></h1><p>Tell Curio what lights you up. Together, we’ll turn it into a learning quest built around your life.</p></div>
              <div className="learning-buddy-strip"><div className="buddy-avatar" aria-hidden="true"><i/><i/><span>✦</span></div><div className="buddy-note"><span>MEET YOUR LEARNING BUDDY</span><strong>Little wins add up to “I made this.”</strong></div><span className="buddy-doodle">✳</span></div>
              {step === 0 && <div className="spark-picks"><div className="spark-picks-heading"><strong>Need a spark?</strong><span>Pick one to get started</span></div><div className="spark-pick-grid"><button className="spark-pick spanish-pick" onClick={()=>setGoal("Learn Spanish for confident everyday conversations")}><span>👋</span><strong>Speak Spanish</strong><small>Real-world chats</small></button><button className="spark-pick code-pick" onClick={()=>setGoal("Learn Python so I can build a small app")}><span>🪄</span><strong>Make with code</strong><small>Build your first app</small></button><button className="spark-pick sky-pick" onClick={()=>setGoal("Understand astronomy and the night sky")}><span>🌙</span><strong>Explore space</strong><small>Follow your wonder</small></button></div></div>}
              <div className="conversation-card">
                <div className="conversation-top"><div className="curio-orb"><Icon name="spark" size={19}/></div><div><strong>Your learning quest</strong><small>Question {step + 1} of {interviewQuestions.length} <span className="separator-dot">·</span> about 2 minutes</small></div><div className="conversation-progress" aria-label={`Question ${step + 1} of ${interviewQuestions.length}`}>{interviewQuestions.map((_, index) => <i key={index} className={index <= step ? "is-filled" : ""}/>)}</div></div>
                <div className="coach-message"><p className="coach-salute">HI, I’M CURIO <span>✳</span></p><h2>{currentQuestion.title}</h2><p className="coach-subtitle">{currentQuestion.sub}</p></div>
                <div className="answer-area">
                  {currentQuestion.kind === "text" ? <div className="goal-input-wrap"><textarea value={goal} onChange={(event) => setGoal(event.target.value)} placeholder={currentQuestion.placeholder} rows={2} aria-label="What would you like to learn?"/><span className="input-spark"><Icon name="spark" size={18}/></span></div> : <div className="option-grid">{currentQuestion.options?.map((option, index) => <button key={option} className={`option-card ${currentAnswer === option ? "option-selected" : ""}`} onClick={() => setOption(option)}><span className="option-key">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="option-check"><Icon name="check" size={15}/></span></button>)}</div>}
                </div>
                <div className="conversation-bottom"><span className="gentle-note"><Icon name="lock" size={13}/> Just for your learning path</span><button className="primary-button" disabled={step === 0 && !goal.trim()} onClick={nextInterview}>{step === interviewQuestions.length - 1 ? "Build my learning path" : "That sounds right"}<Icon name="arrow" size={16}/></button></div>
              </div>
              <div className="interview-footnote"><span>Thoughtful, small steps.</span><span>Made for real life <span className="tiny-heart">♥</span></span></div>
            </div>
          )}

          {stage === "building" && <div className="interview-wrap"><div className="loading-card"><div className="loading-orbit"><Icon name="spark" size={25}/></div><div className="eyebrow">MAKING YOUR PATH</div><h1>Finding your<br/><em>first good step.</em></h1><p>Curio is researching trusted sources and shaping a learning plan around the time you can give it.</p><div className="loading-lines"><i/><i/><i/></div><span className="loading-caption">This can take a little moment…</span></div></div>}

          {stage === "track" && (
            <div className="content-page track-page">
              <div className="track-topline"><div className="eyebrow">YOUR LEARNING PATH <span className="gold-dot">✳</span></div><span className="mode-badge preview-badge">{course?.mode === "demo" ? "SPANISH DEMO" : "LIVE COURSE"}</span></div>
              <div className="track-hero"><div className="track-hero-copy"><div className="track-tag"><span className="tag-dot"/> WEEK {String((activeWeek?.number || 1)).padStart(2,"0")} OF {durationWeeks}</div><h1>{activeWeek?.title || course?.title}</h1><p>{activeWeek?.outcome || course?.subtitle}</p><div className="track-meta"><span><Icon name="clock" size={16}/> {answers[3] || "15 minutes"} sessions</span><i/><span><Icon name="calendar" size={16}/> {answers[4] || "3 days a week"}</span><i/><span><Icon name="target" size={16}/> {course?.level}</span></div></div><div className="track-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit-core"><span>{String(activeWeek?.number || 1).padStart(2,"0")}</span></div><span className="orbit-spark spark-one">✦</span><span className="orbit-spark spark-two">✳</span><span className="orbit-spark spark-three">·</span><div className="art-caption">one good week<br/>at a time</div></div></div>
              {apiNotice && <div className="preview-note api-notice"><Icon name="light" size={16}/><span>{apiNotice}</span></div>}
              {isGeneratingPlan && <div className="preview-note"><Icon name="spark" size={16}/><span><strong>Updating your path</strong> Curio is refreshing the plan around your selected length.</span></div>}
              {course?.mode === "demo" && <div className="preview-note"><Icon name="light" size={16}/><span><strong>Local Spanish preview</strong> Your plan and progress stay in this browser. The first four weeks include full lessons and practice; later weeks are a year-long outline ready for future AI generation.</span></div>}
              <div className="year-duration-card"><div className="year-duration-head"><div><span className="eyebrow">YOUR COMMITMENT</span><strong>Curio suggests {recommendedWeeks} weeks</strong><small>Based on your goal, starting point, and weekly study time. Adjust it any time.</small></div><div className="week-total"><strong>{durationWeeks}</strong><span>weeks</span></div></div><input aria-label="Choose learning plan length in weeks" type="range" min="1" max="52" value={durationWeeks} onChange={(event)=>adjustDuration(Number(event.target.value))}/><div className="duration-scale"><span>1 week</span><span>1 month</span><span>6 months</span><span>1 year</span></div></div>
              <div className="milestone-heading"><div><div className="eyebrow">THIS WEEK’S QUEST</div><h2>{activeWeek?.playable ? "Your study sessions" : "A glimpse of what’s ahead"}</h2></div><span className="milestone-count">{currentWeekIndex + 1} of {durationWeeks} weeks <span>·</span> {currentWeekDone ? "week complete" : `${activeWeek?.sessions.length || 0} sessions`}</span></div>
              {activeWeek?.playable ? <div className="milestone-list">{activeWeek.sessions.map((session,index)=>{const done=(completedSessions[currentWeekIndex]||[]).includes(index);const status=done?"done":index===currentSessionIndex?"active":"upcoming";return <button className={`milestone-row ${status}`} key={`${index}-${session.title}`} onClick={()=>{if(index<=currentSessionIndex){setCurrentSessionIndex(index);setPracticeEvaluation(null);setStage("lesson");}}}><span className="milestone-step">{done?<Icon name="check" size={15}/>:String(index+1).padStart(2,"0")}</span><span className="milestone-info"><strong>{session.title}</strong><small>{session.subtitle}</small></span><span className="milestone-time"><Icon name="clock" size={14}/>{session.minutes} min</span><Icon name="chevron" size={16}/></button>})}</div> : <div className="future-week-card"><span className="future-week-icon">✦</span><div><strong>Week {activeWeek?.number}: {activeWeek?.title}</strong><p>{activeWeek?.outcome}</p><small>{course?.mode === "demo" ? "This week is part of your year map. The offline demo has detailed Spanish practice for weeks 1–4." : "This week’s outline is ready; ask Curio to prepare its lessons and practice."}</small>{course?.mode === "live" && <button className="primary-button future-generate" disabled={isGeneratingPlan} onClick={()=>void refreshLiveCourse(durationWeeks, currentWeekIndex + 1)}>{isGeneratingPlan?"Preparing this week…":"Prepare this week’s lessons"}<Icon name="arrow" size={15}/></button>}</div></div>}
              {course?.sources.length ? <div className="course-sources"><div className="eyebrow">{course.mode === "demo" ? "DEMO SOURCE" : "COURSE SOURCES"}</div>{course.sources.slice(0,2).map(source=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}><Icon name="link" size={14}/><span><strong>{source.title}</strong><small>{source.why||source.url}</small></span><Icon name="arrow" size={14}/></a>)}</div>:null}
              <div className="track-bottom"><span><Icon name="quote" size={16}/> Built around <strong>{goal}</strong></span>{activeWeek?.playable ? <button className="primary-button" onClick={()=>{setCurrentSessionIndex(Math.min(currentSessionIndex,activeWeek.sessions.length-1));setStage("lesson");}}><Icon name="play" size={16}/>{currentWeekDone?"Replay this week":"Start this session"}</button> : course?.mode === "demo" ? <span className="future-lock"><Icon name="lock" size={15}/> Demo outline only</span> : null}</div>
            </div>
          )}

          {stage === "unsupported" && <div className="content-page unsupported-page"><div className="unsupported-illustration">✦</div><div className="eyebrow">A LITTLE MORE CURIOSITY, SOON</div><h1>{apiNotice ? "Curio couldn’t reach the live tutor." : "This demo is starting with Spanish."}</h1><p>{apiNotice || "The offline demo includes four playable Spanish weeks and a year-long roadmap. Subject-specific courses for other goals will be available when the Meta connection is added."}</p><div className="unsupported-goal"><span>Your goal</span><strong>{goal}</strong></div><button className="primary-button" onClick={()=>{setGoal("Learn Spanish for confident everyday conversations");setStep(0);setStage("interview");}}>Try the Spanish demo <Icon name="arrow" size={16}/></button><button className="text-button" onClick={()=>{setStep(0);setStage("interview");}}>Edit my learning goal</button></div>}

          {stage === "lesson" && (
            <div className="content-page lesson-page">
              <div className="lesson-breadcrumb"><button onClick={()=>setStage("track")}>{course?.title}</button><Icon name="chevron" size={14}/><span>Week {currentWeekIndex + 1} · Session {currentSessionIndex + 1} of {activeWeek?.sessions.length}</span></div>
              <div className="lesson-heading"><div className="lesson-kicker"><span className="lesson-index">{String(currentSessionIndex+1).padStart(2,"0")}</span><span>{activeMilestone?.title.toUpperCase()}</span><span className="lesson-separator"/><span><Icon name="clock" size={14}/> {activeMilestone?.minutes} min</span></div><h1>{activeMilestone?.lessonTitle}</h1><p>{activeMilestone?.subtitle}</p></div>
              <div className="lesson-tools"><span className="source-citation-pill"><Icon name="link" size={14}/> {course?.sources[0]?.title || "Curio learning notes"}</span><div><button onClick={()=>{setShowHint((shown)=>!shown);setChatOpen(false);}} className={`tool-button ${showHint?"tool-active":""}`}><Icon name="light" size={15}/> Hint</button><button onClick={()=>{setChatOpen(true);setShowHint(false);}} className="tool-button"><Icon name="chat" size={15}/> Ask Curio</button></div></div>
              {showHint&&<div className="hint-card"><span className="hint-icon"><Icon name="light" size={17}/></span><div><strong>A small nudge</strong><p>{activeMilestone?.hint || "Start with the example: what is the main idea, and which part shows it in action?"}</p></div><button onClick={()=>setShowHint(false)} aria-label="Dismiss hint"><Icon name="close" size={15}/></button></div>}
              <article className="lesson-card"><div className="lesson-card-label"><span className="label-number">01</span><span>THE IDEA</span></div><h2>{activeMilestone?.lessonTitle}</h2>{activeMilestone?.lesson.split("\n").map((paragraph,index)=><p key={index}>{paragraph}</p>)}<div className="language-example"><span className="eyebrow">{course?.mode === "demo" ? "SAY IT OUT LOUD" : "TRY THIS EXAMPLE"}</span><pre>{activeMilestone?.example}</pre></div><div className="lesson-aside"><span className="aside-flower">✳</span><span><strong>Try it</strong>{course?.mode === "demo" ? "Say it slowly, then swap one word to make the phrase your own." : "Work through the example, then change one detail to make the idea your own."}</span></div><div className="lesson-card-bottom"><span><Icon name="clock" size={14}/> About {activeMilestone?.minutes} min</span><button onClick={()=>setStage("quiz")}>Try a little practice <Icon name="arrow" size={15}/></button></div></article>
              <div className="lesson-bottom-note"><span className="tiny-spark">✳</span> Learning can be a conversation. Ask for a hint whenever you need one.</div>
            </div>
          )}

          {stage === "quiz" && (
            <div className="content-page quiz-page">
              <div className="lesson-breadcrumb"><button onClick={()=>setStage("lesson")}>Lesson: {activeMilestone?.lessonTitle}</button><Icon name="chevron" size={14}/><span>Quick check</span></div>
              <div className="quiz-heading"><div className="eyebrow">A QUICK CHECK-IN <span className="gold-dot">✳</span></div><h1>Let’s see what <em>stuck.</em></h1><p>No grades here. This helps shape what comes next.</p></div>
              <div className={`quiz-card practice-${practiceType}`}>
                <div className="quiz-card-top"><span className="quiz-count">WEEK {String(currentWeekIndex+1).padStart(2,"0")} <span>· SESSION {currentSessionIndex+1}/{activeWeek?.sessions.length}</span></span><span className="quiz-skill"><Icon name="target" size={14}/> {practiceType === "roleplay" ? "YOUR TURN" : practiceType === "translate" ? "TRANSLATE" : practiceType === "fill_blank" ? "FILL THE GAP" : practiceType === "assemble" ? "WORD PUZZLE" : "QUICK CHECK"}</span></div>
                <h2>{activeMilestone?.question}</h2>
                {practiceType === "choice" && <div className="quiz-options">{activeMilestone?.choices.map((option,index)=><button key={`${index}-${option}`} className={`quiz-option ${selectedAnswer===index?"quiz-selected":""}`} onClick={()=>setSelectedAnswer(index)}><span className="quiz-radio">{selectedAnswer===index&&<i/>}</span><span>{option}</span><span className="quiz-option-note"/></button>)}</div>}
                {(practiceType === "translate" || practiceType === "fill_blank" || practiceType === "roleplay") && <div className="practice-write-wrap"><label htmlFor="practice-answer">{practiceType === "roleplay" ? "Write your reply" : "Your answer"}</label><textarea id="practice-answer" value={freeResponse} onChange={(event)=>setFreeResponse(event.target.value)} placeholder={practiceType === "roleplay" ? "Try a short reply in Spanish…" : "Type your answer here…"} rows={practiceType === "roleplay" ? 3 : 2}/><span>{practiceType === "roleplay" ? "A few words is enough. Curio will help you polish it." : "Accents are welcome; small spelling slips are okay."}</span></div>}
                {practiceType === "assemble" && <div className="assemble-exercise"><div className="assembled-answer" aria-label="Your sentence so far">{assembledTokens.length ? assembledTokens.map((tokenIndex,position)=><button type="button" key={`${position}-${tokenIndex}`} onClick={()=>setAssembledTokens((tokens)=>tokens.filter((_,index)=>index!==position))}>{activeMilestone?.choices[tokenIndex]} <span>×</span></button>) : <span>Tap the words to build your sentence</span>}</div><div className="word-bank">{activeMilestone?.choices.map((word,index)=>!assembledTokens.includes(index)&&<button type="button" key={`${index}-${word}`} onClick={()=>setAssembledTokens((tokens)=>[...tokens,index])}>{word}</button>)}</div></div>}
                <div className="quiz-card-footer"><button className={`exercise-hint-trigger ${showHint?"hint-is-open":""}`} onClick={()=>setShowHint((shown)=>!shown)}><Icon name="light" size={16}/>{showHint?"Hide this hint":"Need a hint?"}<span>no spoilers</span></button><button className="primary-button" disabled={!canSubmitPractice || isCheckingPractice} onClick={finishQuiz}>{isCheckingPractice?"Curio is checking…":"Check my answer"}<Icon name="arrow" size={16}/></button></div>
              </div>
              <div className="quiz-help"><button onClick={()=>{setChatOpen(true);setShowHint(false);}}><Icon name="chat" size={16}/> Ask Curio to explain</button><span>Take your time — this is practice, not a test.</span></div>
              {showHint&&<div className="hint-card quiz-hint"><span className="hint-icon"><Icon name="light" size={17}/></span><div><strong>Your hint for this exercise</strong><p>{activeMilestone?.hint || "Start with the example and trace one part at a time."}</p></div><button onClick={()=>setShowHint(false)} aria-label="Dismiss hint"><Icon name="close" size={15}/></button></div>}
            </div>
          )}

          {stage === "result" && (
            <div className="content-page result-page">
              <div className="result-symbol"><span>{answerIsCorrect?<Icon name="spark" size={24}/>:<Icon name="leaf" size={24}/>}</span><i/><i/><i/></div>
                <div className="result-kicker">{answerIsCorrect?"AHA! THAT COUNTS.":"A LITTLE PROGRESS, ALREADY"}</div><h1>{answerIsCorrect?"You’ve got the idea!":"That’s a useful clue."}</h1><p className="result-lede">{practiceEvaluation?.feedback || (answerIsCorrect?activeMilestone?.correctFeedback:activeMilestone?.retryFeedback)}</p>{apiNotice&&<p className="api-inline-note">{apiNotice}</p>}
              <div className="xp-reward"><span>✦</span><strong>+{answerIsCorrect?12:4} XP</strong><small>{answerIsCorrect?"for showing up and learning":"for giving it a go"}</small><span className="xp-total">{earnedXp} total</span></div>
               <div className={`adaptation-card ${answerIsCorrect?"adapt-advance":"adapt-review"}`}><span className="adapt-icon"><Icon name={answerIsCorrect?"arrow":"light"} size={17}/></span><div><div className="adapt-label">YOUR PATH JUST ADAPTED</div><strong>{answerIsCorrect?(currentSessionIndex < (activeWeek?.sessions.length||0)-1?`Next up: ${activeWeek?.sessions[currentSessionIndex+1]?.title}`:currentWeekIndex < durationWeeks-1?`Next week: ${course?.weeks[currentWeekIndex+1]?.title}`:"You completed this learning path"):`We’ll revisit: ${activeMilestone?.title}`}</strong><p>{practiceEvaluation?.skillSignal || (answerIsCorrect?"You’re ready to build on this idea. Curio will bring it back for review later.":"Let’s take another look at this idea, then try a fresh check.")}</p></div><span className="adapt-check"><Icon name="check" size={16}/></span></div>
              <div className="progress-summary"><div><span>YOUR CONFIDENCE</span><strong>{answerIsCorrect?"Growing":"Taking shape"}</strong></div><div className="confidence-bars"><i className="bar-filled"/><i className={answerIsCorrect?"bar-filled":""}/><i/><i/><i/></div><span className="progress-note">A guide, not a grade</span></div>
              <div className="result-actions"><button className="text-button" onClick={()=>setStage("track")}><Icon name="back" size={16}/> Back to this week</button><button className="primary-button" onClick={continuePath}>{answerIsCorrect?(currentSessionIndex < (activeWeek?.sessions.length||0)-1?"Next session":currentWeekIndex < durationWeeks-1?"Next week":"Finish learning plan"):"Review with a hint"}<Icon name="arrow" size={16}/></button></div>
            </div>
          )}
        </section>
      </div>

      {chatOpen&&<div className="chat-overlay" role="presentation" onClick={(event)=>event.target===event.currentTarget&&setChatOpen(false)}><aside className="chat-drawer" aria-label="Ask Curio"><div className="chat-header"><div className="chat-title-mark"><Icon name="spark" size={18}/></div><div><strong>Ask Curio</strong><small>Here with you, in this lesson</small></div><button className="icon-button" onClick={()=>setChatOpen(false)} aria-label="Close chat"><Icon name="close"/></button></div><div className="chat-context"><span><Icon name="book" size={14}/> {(course?.title || "YOUR PATH").toUpperCase()}</span><span className="context-dot">·</span><span><Icon name="file" size={14}/> {activeMilestone?.title || "Your lesson"}</span></div><div className="chat-messages">{chatMessages.map((message,index)=><div className={`chat-bubble ${index%2===1?"chat-user":"chat-curio"}`} key={`${index}-${message.slice(0,8)}`}>{index%2===0&&<span className="chat-avatar"><Icon name="spark" size={12}/></span>}<p>{message}</p></div>)}<button className="suggested-prompt" onClick={()=>setChatText("Can you give me another example?")}>Can you give me another example? <Icon name="arrow" size={13}/></button></div><form className="chat-compose" onSubmit={(event)=>{event.preventDefault();void sendChat();}}><input value={chatText} onChange={(event)=>setChatText(event.target.value)} placeholder="Ask anything about this idea…" aria-label="Ask Curio a question"/><button type="submit" aria-label="Send message"><Icon name="send" size={17}/></button><small>{course?.mode === "live" ? "Answers grounded in your course and its sources." : "Spanish demo guide · examples from this lesson"}</small></form></aside></div>}
      <footer className="mobile-footer"><span><span className="footer-spark">✳</span> You’re learning at your own pace.</span><button onClick={()=>setChatOpen(true)}><Icon name="chat" size={16}/> Ask Curio</button></footer>
    </main>
  );
}
