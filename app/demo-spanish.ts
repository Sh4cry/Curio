export type DemoPracticeType = "choice" | "translate" | "fill_blank" | "assemble" | "roleplay";

export type DemoSession = {
  title: string;
  subtitle: string;
  minutes: number;
  lessonTitle: string;
  lesson: string;
  example: string;
  question: string;
  practiceType: DemoPracticeType;
  choices: string[];
  expectedAnswer: string;
  rubric: string;
  answerIndex: number;
  hint: string;
  correctFeedback: string;
  retryFeedback: string;
  nextStep: string;
};

export type DemoWeek = {
  number: number;
  title: string;
  outcome: string;
  sessions: DemoSession[];
  playable: boolean;
};

export type LearningCourse = {
  title: string;
  subtitle: string;
  level: string;
  durationWeeks: number;
  weeks: DemoWeek[];
  sources: { title: string; url: string; why: string }[];
  mode: "demo" | "live";
};

export type DemoCourse = LearningCourse & { mode: "demo" };

type Profile = {
  goal: string;
  experience: string;
  outcome: string;
  dailyTime: string;
  daysPerWeek: string;
  preference: string;
  challengeLevel: string;
};

type ExerciseSeed = {
  title: string;
  question: string;
  practiceType: DemoPracticeType;
  choices?: string[];
  answer: string;
  answerIndex?: number;
  rubric: string;
  hint: string;
  example: string;
};

type WeekSeed = {
  title: string;
  outcome: string;
  lesson: string;
  exercises: ExerciseSeed[];
};

const yearOutline = [
  ["Meet and greet", "Greet someone, say your name, and ask how they are."],
  ["Be polite in a café", "Order a drink and use please, thank you, and a polite request."],
  ["Make a simple plan", "Talk about what you are going to do and where you will go."],
  ["Keep a conversation going", "Share a preference and ask a friendly follow-up question."],
  ["People and family", "Introduce people and describe how you know them."],
  ["Numbers that matter", "Use numbers for prices, phone numbers, and quantities."],
  ["Days, dates, and time", "Arrange a simple meeting and understand when it happens."],
  ["Everyday routines", "Describe a typical day with common present-tense verbs."],
  ["Food you enjoy", "Talk about ingredients, preferences, and simple meals."],
  ["At home", "Name rooms and describe where familiar things are."],
  ["Describe your world", "Use colors, size, and basic adjectives with agreement."],
  ["Ask useful questions", "Build clear questions with qué, dónde, cuándo, and por qué."],
  ["Get around town", "Ask for and understand simple directions."],
  ["Make a travel plan", "Talk about transport, destinations, and departure times."],
  ["Shop with confidence", "Ask about sizes, prices, and available options."],
  ["Solve a small problem", "Explain what you need and ask someone to help."],
  ["Talk about yesterday", "Describe a completed event with common past-tense forms."],
  ["Set the scene", "Use the imperfect to describe people, places, and habits in the past."],
  ["Tell a short story", "Combine background and completed events in a clear sequence."],
  ["Share a memory", "Describe a meaningful experience and how it felt."],
  ["Plan the weekend", "Talk about future intentions and invitations."],
  ["Make arrangements", "Suggest a time, place, and activity, then confirm the plan."],
  ["Talk about what-if", "Use simple conditional phrases to explore possibilities."],
  ["A month of stories", "Tell a short story that connects past events and future plans."],
  ["Give an opinion", "State what you think and support it with a reason."],
  ["Agree and disagree kindly", "Respond to another viewpoint with a respectful reason."],
  ["Compare your options", "Compare places, activities, and choices using useful structures."],
  ["Explain a preference", "Describe what you prefer and what matters to you."],
  ["Understand a short article", "Find the main point and useful details in accessible Spanish."],
  ["Follow a short story", "Use context and familiar words to follow a narrative."],
  ["Talk about music and film", "Describe a story, artist, or scene and share your reaction."],
  ["Summarize what you learned", "Retell the important points of a short text in your own words."],
  ["Study and work", "Describe responsibilities, schedules, and everyday tasks."],
  ["Explain a process", "Give clear steps for a familiar activity."],
  ["Ask for clarification", "Repair a conversation when you miss a word or idea."],
  ["Tell a longer story", "Connect events with transitions and time markers."],
  ["Talk about hopes", "Describe hopes, goals, and possibilities with growing nuance."],
  ["Make a recommendation", "Suggest an option and explain why it could fit."],
  ["Discuss a community", "Talk about places, people, and changes around you."],
  ["Explore cultural context", "Notice how context and relationship shape everyday language."],
  ["Connect complex ideas", "Link opinions and reasons with natural transitions."],
  ["Use more nuanced language", "Soften a statement and express uncertainty appropriately."],
  ["Follow a longer conversation", "Track the main point and respond with a relevant question."],
  ["Handle an unexpected moment", "Stay calm, clarify, and keep a conversation moving."],
  ["Share a point of view", "Present a view, support it, and respond to a different one."],
  ["Learn from authentic media", "Use a short audio or video clip to notice useful language."],
  ["Speak about a topic you love", "Explain a personal interest with examples and detail."],
  ["Plan a real-world challenge", "Prepare language for a goal chosen by the learner."],
  ["Complete your conversation project", "Use Spanish to complete a multi-step real-life scenario."],
  ["Reflect and revisit", "Find strengths and choose the next skills to practice."],
  ["Build an independent routine", "Choose useful sources and plan continued practice."],
  ["Your next chapter", "Set a new Spanish goal and carry forward what you can now do."],
] as const;

const beginnerWeeks: WeekSeed[] = [
  {
    title: "Meet and greet",
    outcome: "Greet someone, say your name, and ask how they are.",
    lesson: "Spanish greetings change with the time of day, but ¡hola! works in friendly situations. Me llamo… introduces your name, and ¿cómo estás? asks how someone is.\n\nShort, useful phrases are a great start: try them aloud, then add one small detail.",
    exercises: [
      { title: "Pick a warm hello", question: "You meet someone for the first time. Which phrase introduces your name?", practiceType: "choice", choices: ["Me llamo Ana", "Hasta luego", "Tengo hambre"], answer: "Me llamo Ana", answerIndex: 0, rubric: "Choose Me llamo Ana as a name introduction.", hint: "Look for the words that mean “my name is.”", example: "¡Hola! Me llamo Ana." },
      { title: "Say good morning", question: "Translate “Good morning” into Spanish.", practiceType: "translate", answer: "Buenos días", rubric: "Accept Buenos días, with or without punctuation.", hint: "This greeting literally uses the plural word for “days.”", example: "Buenos días, ¿cómo estás?" },
      { title: "Complete your introduction", question: "Fill in the missing word: Me ___ Ana.", practiceType: "fill_blank", answer: "llamo", rubric: "The missing word is llamo; accept Me llamo Ana as a full response.", hint: "The phrase for “my name is” starts with me llamo.", example: "Me llamo Ana." },
      { title: "Build a greeting", question: "Use the word bank to say “Hi, my name is Ana.”", practiceType: "assemble", choices: ["Ana", "Hola", "llamo", "Me"], answer: "Hola Me llamo Ana", rubric: "Accept Hola, me llamo Ana in natural order; capitalization and punctuation can vary.", hint: "Start with hola, then use me llamo before the name.", example: "Hola, me llamo Ana." },
      { title: "Your turn: meet someone", question: "Greet a new conversation partner and tell them your name in Spanish.", practiceType: "roleplay", answer: "A Spanish greeting followed by me llamo and a name.", rubric: "Correct when the learner gives an understandable Spanish greeting and introduces a name. Accept Hola, soy… and ¡Buenos días! Me llamo… .", hint: "Use ¡Hola! and a phrase such as me llamo… .", example: "¡Hola! Soy Ana. ¿Cómo estás?" },
      { title: "Ask how they are", question: "Which question means “How are you?”", practiceType: "choice", choices: ["¿Cómo estás?", "¿Cuánto cuesta?", "¿Dónde vives?"], answer: "¿Cómo estás?", answerIndex: 0, rubric: "Choose ¿Cómo estás? as the friendly “How are you?” question.", hint: "Listen for cómo, the word used for “how.”", example: "A: ¿Cómo estás? B: Muy bien, gracias." },
      { title: "Keep the hello going", question: "Reply to “¡Hola! Me llamo Luis.” Say hello, share your name, and ask how Luis is.", practiceType: "roleplay", answer: "A Spanish greeting, a name introduction, and ¿Cómo estás? or a natural equivalent.", rubric: "Look for three moves: greet Luis, introduce a name, and ask how Luis is. Minor spelling errors are okay.", hint: "Try: ¡Hola! Me llamo ___. ¿Cómo estás?", example: "¡Hola, Luis! Me llamo Ana. ¿Cómo estás?" },
    ],
  },
  {
    title: "Be polite in a café",
    outcome: "Order a drink, ask for something, and thank the person helping you.",
    lesson: "Quisiera means “I would like” and makes a gentle request. Add the item and por favor (please). Gracias (thank you) closes the exchange.\n\nYou can also ask ¿qué me recomienda? (what do you recommend?) when you want a suggestion.",
    exercises: [
      { title: "Choose the polite order", question: "Which is a polite way to order a coffee?", practiceType: "choice", choices: ["Quisiera un café, por favor", "Dame café ahora", "No quiero café"], answer: "Quisiera un café, por favor", answerIndex: 0, rubric: "Choose Quisiera un café, por favor as the polite request.", hint: "Look for the phrase that means “I would like.”", example: "Quisiera un café, por favor." },
      { title: "Ask for water", question: "Translate “I would like water, please.”", practiceType: "translate", answer: "Quisiera agua, por favor", rubric: "Accept Quisiera agua, por favor and natural equivalents such as Me gustaría agua, por favor.", hint: "Start with quisiera, then say agua and por favor.", example: "Quisiera agua, por favor." },
      { title: "Add a little", question: "Complete the phrase: Quisiera ___ agua. (a little bit of)", practiceType: "fill_blank", answer: "un poco de", rubric: "The expected phrase is un poco de; accept the full phrase Quisiera un poco de agua.", hint: "Use the three-word phrase meaning “a little bit of.”", example: "Quisiera un poco de agua." },
      { title: "Arrange your request", question: "Build “I would like a tea, please.”", practiceType: "assemble", choices: ["por favor", "té", "quisiera", "un"], answer: "Quisiera un té por favor", rubric: "Accept Quisiera un té, por favor in natural order.", hint: "Begin with quisiera, then the article and drink.", example: "Quisiera un té, por favor." },
      { title: "Your turn: order", question: "Order a drink politely in Spanish. Choose a drink and say please.", practiceType: "roleplay", answer: "A polite Spanish request for a drink using quisiera or me gustaría and por favor.", rubric: "Correct when the learner politely asks for a drink in understandable Spanish. Accept other drinks and natural polite wording.", hint: "Use quisiera + a drink + por favor.", example: "Quisiera un té, por favor." },
      { title: "Ask for a recommendation", question: "Which phrase asks “What do you recommend?”", practiceType: "choice", choices: ["¿Qué me recomienda?", "¿A qué hora?", "¿Cuántos años tienes?"], answer: "¿Qué me recomienda?", answerIndex: 0, rubric: "Choose ¿Qué me recomienda? as a request for a recommendation.", hint: "The phrase starts with qué, meaning “what.”", example: "¿Qué me recomienda para beber?" },
      { title: "Finish the café chat", question: "The server brings your drink. Thank them and ask for the bill in Spanish.", practiceType: "roleplay", answer: "Gracias plus a Spanish request for the bill, such as La cuenta, por favor.", rubric: "Correct when the learner thanks the server and asks for the bill understandably. Accept La cuenta, por favor and ¿Me trae la cuenta, por favor?.", hint: "Say gracias, then ask for la cuenta.", example: "Gracias. ¿Me trae la cuenta, por favor?" },
    ],
  },
  {
    title: "Make a plan and get around",
    outcome: "Talk about a simple plan and ask for directions to a place.",
    lesson: "Voy a + an infinitive means “I am going to…”: voy a visitar (I am going to visit). For directions, ¿dónde está…? asks where something is, and sigue todo recto means keep going straight.\n\nKeep the plan short: say when, what you will do, and where you need to go.",
    exercises: [
      { title: "Pick the plan", question: "Which phrase means “I am going to visit the museum”?", practiceType: "choice", choices: ["Voy a visitar el museo", "Visité el museo ayer", "Me gusta el museo"], answer: "Voy a visitar el museo", answerIndex: 0, rubric: "Choose Voy a visitar el museo as a future plan.", hint: "The frame voy a + infinitive expresses “I am going to.”", example: "Mañana voy a visitar el museo." },
      { title: "Say it in Spanish", question: "Translate “Tomorrow I am going to visit the museum.”", practiceType: "translate", answer: "Mañana voy a visitar el museo", rubric: "Accept Mañana voy a visitar el museo and Voy a visitar el museo mañana.", hint: "Use mañana + voy a + the infinitive visitar.", example: "Mañana voy a visitar el museo." },
      { title: "Give a direction", question: "Fill in the missing word: Sigue todo recto y ___ a la izquierda. (turn)", practiceType: "fill_blank", answer: "gira", rubric: "The expected informal command is gira. Accept gira a la izquierda as a complete response.", hint: "Use the tú command form of girar.", example: "Sigue todo recto y gira a la izquierda." },
      { title: "Build the sentence", question: "Arrange the words to say “I am going to visit the market.”", practiceType: "assemble", choices: ["el mercado", "visitar", "voy", "a"], answer: "Voy a visitar el mercado", rubric: "Accept Voy a visitar el mercado in natural order.", hint: "Start with voy, then use a + infinitive.", example: "Voy a visitar el mercado." },
      { title: "Your turn: ask the way", question: "Ask someone in Spanish how to get to the museum.", practiceType: "roleplay", answer: "A Spanish question asking how to get to the museum, such as ¿Cómo llego al museo?", rubric: "Correct when the learner asks an understandable Spanish question about reaching the museum.", hint: "Start with ¿Cómo llego a…? and name el museo.", example: "Disculpe, ¿cómo llego al museo?" },
      { title: "Understand the answer", question: "Someone says “Sigue todo recto.” What should you do?", practiceType: "choice", choices: ["Keep going straight", "Turn around", "Stop and order a drink"], answer: "Keep going straight", answerIndex: 0, rubric: "Choose Keep going straight; sigue todo recto means continue straight ahead.", hint: "Sigue is a direction to continue; recto means straight.", example: "Sigue todo recto hasta la plaza." },
      { title: "Put it together", question: "Say where you are going tomorrow, then ask where the station is.", practiceType: "roleplay", answer: "An understandable Spanish plan for tomorrow and a question asking where the station is.", rubric: "Correct when the learner includes a future plan with mañana or voy a and asks ¿Dónde está la estación? or an equivalent.", hint: "Use mañana voy a… and then ¿Dónde está la estación?", example: "Mañana voy a visitar el centro. ¿Dónde está la estación?" },
    ],
  },
  {
    title: "Keep a conversation going",
    outcome: "Share what you like, give a small reason, and invite the other person to reply.",
    lesson: "Me gusta… means “I like…” Add a noun or an infinitive to say what you enjoy. A follow-up such as ¿Y a ti? invites the other person to share, too.\n\nA natural exchange has a few small moves: react, share one detail, and ask a related question.",
    exercises: [
      { title: "Find the right reaction", question: "Your friend says they love music. Which reply shows interest and asks a question?", practiceType: "choice", choices: ["¡Qué bien! ¿Qué música te gusta?", "La cuenta, por favor", "Hasta mañana, estación"], answer: "¡Qué bien! ¿Qué música te gusta?", answerIndex: 0, rubric: "Choose the reaction and relevant follow-up question.", hint: "Pick the response that reacts to music and asks what kind they like.", example: "¡Qué bien! ¿Qué música te gusta?" },
      { title: "Share a preference", question: "Translate “I like reading.”", practiceType: "translate", answer: "Me gusta leer", rubric: "Accept Me gusta leer. Minor punctuation does not matter.", hint: "Use me gusta followed by the infinitive leer.", example: "Me gusta leer por la noche." },
      { title: "Complete the idea", question: "Fill in the missing word: Me ___ cocinar. (I like cooking)", practiceType: "fill_blank", answer: "gusta", rubric: "The expected word is gusta; accept Me gusta cocinar as the full phrase.", hint: "Use gusta before an infinitive activity.", example: "Me gusta cocinar." },
      { title: "Build a question", question: "Arrange the words to ask “And what do you like?”", practiceType: "assemble", choices: ["te", "gusta", "qué", "Y", "¿"], answer: "¿Y qué te gusta", rubric: "Accept ¿Y qué te gusta? in natural order; punctuation can vary.", hint: "Begin with ¿Y qué…? then te gusta.", example: "¿Y qué te gusta hacer?" },
      { title: "Your turn: share and ask", question: "Say one thing you like in Spanish and ask the other person what they like.", practiceType: "roleplay", answer: "An understandable Spanish preference with me gusta and a relevant question back.", rubric: "Correct when the learner names a preference and asks a related question, such as ¿Y a ti qué te gusta?. Allow minor grammar errors.", hint: "Try me gusta… followed by ¿Y a ti?", example: "Me gusta la música. ¿Y a ti?" },
      { title: "Add a reason", question: "Which word means “because” and can introduce your reason?", practiceType: "choice", choices: ["porque", "mañana", "despacio"], answer: "porque", answerIndex: 0, rubric: "Choose porque, which means because.", hint: "This word connects an idea to its reason.", example: "Me gusta caminar porque es tranquilo." },
      { title: "A mini conversation", question: "Tell a partner one activity you enjoy, give a reason, and ask a follow-up question.", practiceType: "roleplay", answer: "A short Spanish response with a preference, a reason such as porque, and a question for the partner.", rubric: "Correct when the learner shares an activity, gives a simple reason, and asks a relevant question in understandable Spanish.", hint: "Use me gusta…, porque…, ¿y a ti?", example: "Me gusta bailar porque es divertido. ¿Y a ti?" },
    ],
  },
];

const advancedWeeks: WeekSeed[] = [
  {
    title: "Connect ideas naturally",
    outcome: "Join opinions and reasons with transitions that sound natural.",
    lesson: "Words such as aunque (although), mientras (while), and por eso (that’s why) show how ideas relate. Pick a connector based on whether you are adding contrast, time, or a result.\n\nA clear transition helps your listener follow the shape of your thought.",
    exercises: [
      { title: "Choose the contrast", question: "Which connector best means “although”?", practiceType: "choice", choices: ["aunque", "por eso", "después"], answer: "aunque", answerIndex: 0, rubric: "Choose aunque, which introduces a contrast.", hint: "This connector signals that the next idea contrasts with the first.", example: "Quería salir, aunque estaba lloviendo." },
      { title: "Translate with a reason", question: "Translate: “I stayed home because it was raining.”", practiceType: "translate", answer: "Me quedé en casa porque estaba lloviendo", rubric: "Accept Me quedé en casa porque llovía and equivalent natural forms preserving the meaning.", hint: "Use me quedé for “I stayed,” then connect the reason with porque.", example: "Me quedé en casa porque estaba lloviendo." },
      { title: "Complete the transition", question: "Fill in the connector: Estaba cansado; ___, terminé el trabajo. (nevertheless)", practiceType: "fill_blank", answer: "sin embargo", rubric: "The expected connector is sin embargo. Accept it with punctuation.", hint: "Use the two-word connector for “however/nevertheless.”", example: "Estaba cansado; sin embargo, terminé el trabajo." },
      { title: "Build a balanced sentence", question: "Arrange the words: “I wanted to go out although it was raining.”", practiceType: "assemble", choices: ["aunque", "llovía", "quería", "salir", "estaba"], answer: "Quería salir aunque estaba llovía", rubric: "Accept a natural sentence such as Quería salir aunque estaba lloviendo. The word bank is a scaffold; explain if the learner uses the progressive form.", hint: "Use quería salir for the intention, then aunque to add contrast.", example: "Quería salir, aunque estaba lloviendo." },
      { title: "Your turn: explain a choice", question: "Share an opinion in Spanish, give a reason, and add a contrasting idea.", practiceType: "roleplay", answer: "A Spanish opinion with a reason and a contrast using aunque or a natural equivalent.", rubric: "Correct when the response contains an understandable opinion, a reason, and a contrasting idea. Minor grammar issues are okay.", hint: "Try: En mi opinión…, porque… aunque…", example: "Prefiero el tren porque es cómodo, aunque tarda más." },
      { title: "Pick the result", question: "Which connector introduces a result like “that’s why”?", practiceType: "choice", choices: ["por eso", "aunque", "mientras"], answer: "por eso", answerIndex: 0, rubric: "Choose por eso to introduce a result.", hint: "This phrase points from a reason to its consequence.", example: "Llovía; por eso, me quedé en casa." },
      { title: "A short connected reply", question: "Explain why you chose an activity, then add one contrast in Spanish.", practiceType: "roleplay", answer: "A connected Spanish explanation using a reason and a contrast connector.", rubric: "Correct when the learner communicates a choice, reason, and contrast understandably.", hint: "Use porque for the reason and aunque for the contrast.", example: "Elegí caminar porque me gusta, aunque hoy hace frío." },
    ],
  },
  {
    title: "Tell a story in the past",
    outcome: "Use completed events and background details to tell a short story.",
    lesson: "The preterite often moves a story forward with a completed event. The imperfect sets a scene, describes a habit, or shows an action already in progress.\n\nThink of the imperfect as the background and the preterite as the event that enters the scene.",
    exercises: [
      { title: "Set the scene", question: "Which form describes an ongoing past action: llovía or llovió?", practiceType: "choice", choices: ["llovía", "llovió", "lloverá"], answer: "llovía", answerIndex: 0, rubric: "Choose llovía for the ongoing background action.", hint: "The scene was already in progress.", example: "Cuando llegué, llovía." },
      { title: "Translate the event", question: "Translate: “When I arrived, my friends were eating.”", practiceType: "translate", answer: "Cuando llegué, mis amigos comían", rubric: "Accept Cuando llegué, mis amigos estaban comiendo and other natural equivalents.", hint: "Use a completed past form for “arrived” and an ongoing form for “were eating.”", example: "Cuando llegué, mis amigos cenaban." },
      { title: "Choose the habit form", question: "Complete: Cuando era niña, ___ al parque cada sábado. (ir)", practiceType: "fill_blank", answer: "iba", rubric: "The expected imperfect form is iba.", hint: "Every Saturday signals a repeated past habit.", example: "Cuando era niña, iba al parque cada sábado." },
      { title: "Order the story", question: "Build “While we were eating, the phone rang.”", practiceType: "assemble", choices: ["el teléfono", "sonó", "Mientras", "comíamos"], answer: "Mientras comíamos sonó el teléfono", rubric: "Accept Mientras comíamos, sonó el teléfono in natural order.", hint: "Put the ongoing background after mientras, then the completed event.", example: "Mientras comíamos, sonó el teléfono." },
      { title: "Your turn: tell a memory", question: "Describe what you were doing when one memorable thing happened.", practiceType: "roleplay", answer: "An understandable Spanish sentence with a background action and a completed event.", rubric: "Correct when the learner expresses a scene/action relationship in Spanish. Accept natural tense variation if the meaning is clear.", hint: "Start with mientras + a background action, then add one event.", example: "Mientras caminaba, encontré una librería." },
      { title: "Find the completed event", question: "In “Mientras caminaba, encontré una librería,” which event moves the story forward?", practiceType: "choice", choices: ["Encontré una librería", "Mientras caminaba", "Both are future plans"], answer: "Encontré una librería", answerIndex: 0, rubric: "Choose encontré una librería as the completed event.", hint: "Look for the event that happened once during the ongoing walk.", example: "Mientras caminaba, encontré una librería." },
      { title: "Tell it with two camera angles", question: "Write a short Spanish memory using one background detail and one completed event.", practiceType: "roleplay", answer: "A Spanish response combining an ongoing/background detail and a completed event.", rubric: "Correct when both a setting or ongoing action and a completed event are understandable.", hint: "Set the scene with hacía, era, or estaba; add one event with a past-tense verb.", example: "Hacía sol cuando llegamos a la playa." },
    ],
  },
  {
    title: "Give advice with nuance",
    outcome: "Offer a thoughtful recommendation and explain its tradeoffs.",
    lesson: "The conditional makes many suggestions feel open and considerate: podrías (you could), te convendría (it might suit you). Pair a suggestion with a reason and acknowledge a tradeoff.\n\nNuance helps your advice sound like an invitation to consider, not an order.",
    exercises: [
      { title: "Choose a softer suggestion", question: "Which phrase means “you could try the train”?", practiceType: "choice", choices: ["Podrías probar el tren", "Prueba el tren ahora", "Probaste el tren"], answer: "Podrías probar el tren", answerIndex: 0, rubric: "Choose Podrías probar el tren as a softer conditional suggestion.", hint: "Look for the conditional form of poder.", example: "Podrías probar el tren; es más rápido." },
      { title: "Translate with a gentle tone", question: "Translate: “You could visit the museum.”", practiceType: "translate", answer: "Podrías visitar el museo", rubric: "Accept Podrías visitar el museo and natural variants using tú conditional language.", hint: "Use podrías followed by the infinitive visitar.", example: "Podrías visitar el museo." },
      { title: "Complete the conditional", question: "Fill in: Te ___ probar el tren. (it would suit you / convendría)", practiceType: "fill_blank", answer: "convendría", rubric: "The target form is convendría.", hint: "Use the conditional form of convenir.", example: "Te convendría probar el tren." },
      { title: "Build a recommendation", question: "Arrange a suggestion: “You could take the bus because it’s cheaper.”", practiceType: "assemble", choices: ["porque", "Podrías", "más barato", "tomar el autobús", "es"], answer: "Podrías tomar el autobús porque es más barato", rubric: "Accept Podrías tomar el autobús porque es más barato in natural order.", hint: "Start with podrías + infinitive, then give the reason with porque.", example: "Podrías tomar el autobús porque es más barato." },
      { title: "Your turn: offer advice", question: "A friend wants to visit a museum but has little time. Suggest an option and explain a tradeoff in Spanish.", practiceType: "roleplay", answer: "A Spanish suggestion using conditional language and a reason or tradeoff.", rubric: "Correct when the learner gives a considerate suggestion and explains a reason or tradeoff understandably.", hint: "Use podrías… and add a reason with porque or aunque.", example: "Podrías visitar el museo pequeño porque está cerca, aunque cierra temprano." },
      { title: "Spot the nuance", question: "Which sentence sounds more like an open suggestion?", practiceType: "choice", choices: ["Podrías probarlo", "Hazlo ahora", "Lo hiciste"], answer: "Podrías probarlo", answerIndex: 0, rubric: "Choose Podrías probarlo as a conditional suggestion.", hint: "The conditional leaves room for the other person’s choice.", example: "Podrías probarlo si tienes tiempo." },
      { title: "A balanced recommendation", question: "Recommend an activity, give one reason, and mention one tradeoff in Spanish.", practiceType: "roleplay", answer: "An understandable Spanish recommendation with a reason and a tradeoff.", rubric: "Correct when the learner makes a recommendation and acknowledges a benefit plus a limitation.", hint: "Try podrías…, porque…, aunque… .", example: "Podrías ir en tren porque es cómodo, aunque cuesta más." },
    ],
  },
  {
    title: "Handle a spontaneous conversation",
    outcome: "React, express a point of view, and ask a useful follow-up.",
    lesson: "A natural conversational turn reacts to what you heard, adds a detail, and invites the other person to continue. Use phrases such as ¡Qué interesante! (how interesting), en mi opinión (in my opinion), and ¿qué piensas? (what do you think?).\n\nYou do not need perfect grammar to make a thoughtful exchange; clarity and listening matter.",
    exercises: [
      { title: "Pick a useful reaction", question: "Your partner shares a travel story. Which reply invites them to continue?", practiceType: "choice", choices: ["¡Qué interesante! ¿Qué pasó después?", "La cuenta, por favor", "Me llamo Ana"], answer: "¡Qué interesante! ¿Qué pasó después?", answerIndex: 0, rubric: "Choose the interested reaction with a relevant follow-up.", hint: "Look for the response that asks what happened next.", example: "¡Qué interesante! ¿Qué pasó después?" },
      { title: "Share your view", question: "Translate: “In my opinion, traveling by train is comfortable.”", practiceType: "translate", answer: "En mi opinión, viajar en tren es cómodo", rubric: "Accept En mi opinión, viajar en tren es cómodo and equivalent natural phrasing.", hint: "Begin with en mi opinión, then state the activity and your view.", example: "En mi opinión, viajar en tren es cómodo." },
      { title: "Complete the invitation", question: "Fill in: ¿Qué ___ tú? (what do you think?)", practiceType: "fill_blank", answer: "piensas", rubric: "The expected form is piensas.", hint: "Use the tú form of pensar.", example: "¿Qué piensas tú?" },
      { title: "Build a full turn", question: "Arrange: “In my opinion, it’s useful. What do you think?”", practiceType: "assemble", choices: ["útil", "En mi opinión", "¿Qué piensas?", "es"], answer: "En mi opinión es útil ¿Qué piensas?", rubric: "Accept En mi opinión, es útil. ¿Qué piensas? in natural order.", hint: "State your view first, then invite their opinion.", example: "En mi opinión, es útil. ¿Qué piensas?" },
      { title: "Your turn: talk about an interest", question: "Share an opinion about a hobby, give a reason, and ask your partner what they think.", practiceType: "roleplay", answer: "A Spanish opinion, a reason, and a relevant question to the partner.", rubric: "Correct when the learner shares a clear opinion, supports it, and invites a reply in understandable Spanish.", hint: "Use en mi opinión…, porque…, ¿qué piensas tú?", example: "En mi opinión, cocinar es divertido porque puedes compartir. ¿Qué piensas tú?" },
      { title: "React and clarify", question: "Which phrase politely asks someone to repeat something more slowly?", practiceType: "choice", choices: ["¿Puedes repetirlo más despacio?", "¿Cuánto cuesta?", "¿Qué hora es?"], answer: "¿Puedes repetirlo más despacio?", answerIndex: 0, rubric: "Choose ¿Puedes repetirlo más despacio? as a request to repeat slowly.", hint: "Look for repetirlo and más despacio.", example: "Perdona, ¿puedes repetirlo más despacio?" },
      { title: "Bring it all together", question: "Respond to a partner’s opinion: react, add your view, and ask one follow-up in Spanish.", practiceType: "roleplay", answer: "An understandable Spanish response with a reaction, viewpoint, and follow-up question.", rubric: "Correct when the learner reacts to a view, contributes their own thought, and asks a relevant question.", hint: "Use three steps: react, share, ask.", example: "¡Qué interesante! En mi opinión, también es importante. ¿Qué piensas de…?" },
    ],
  },
];

const toNumber = (value: string, fallback: number) => Number.parseInt(value, 10) || fallback;
const daysAvailable = (value: string) => /every day/i.test(value) ? 7 : /5 days/i.test(value) ? 5 : /3 days/i.test(value) ? 3 : 2;

export function recommendSpanishDuration(profile: Profile) {
  const joined = `${profile.goal} ${profile.outcome} ${profile.challengeLevel}`.toLowerCase();
  let baseWeeks = /exam|class|fundamental|basics/i.test(joined) ? 24 : /project|build/i.test(joined) ? 32 : /advanced|deep|fluent|conversation|confident/i.test(joined) ? 52 : 40;
  if (/advanced|fundamentals/i.test(profile.experience)) baseWeeks *= 0.72;
  else if (/tried/i.test(profile.experience)) baseWeeks *= 0.88;
  const weeklyMinutes = toNumber(profile.dailyTime, 15) * daysAvailable(profile.daysPerWeek);
  const effortAdjustment = Math.sqrt(45 / Math.max(15, weeklyMinutes));
  return Math.max(1, Math.min(52, Math.round(baseWeeks * effortAdjustment)));
}

function makeExercise(seed: ExerciseSeed, week: WeekSeed, profile: Profile, day: number): DemoSession {
  const minutes = toNumber(profile.dailyTime, 15);
  return {
    title: seed.title,
    subtitle: `Day ${day + 1} · ${week.title}`,
    minutes,
    lessonTitle: seed.title,
    lesson: `${week.lesson}\n\nToday’s small focus: ${seed.title.toLowerCase()}. Read the example once, then try the exercise without worrying about perfection.`,
    example: seed.example,
    question: seed.question,
    practiceType: seed.practiceType,
    choices: seed.choices || [],
    expectedAnswer: seed.answer,
    rubric: seed.rubric,
    answerIndex: seed.answerIndex ?? 0,
    hint: seed.hint,
    correctFeedback: `¡Muy bien! ${week.outcome}`,
    retryFeedback: `Good try. ${seed.rubric} Take another look at the example and try once more.`,
    nextStep: week.outcome,
  };
}

export function createSpanishDemo(profile: Profile, durationWeeks: number): DemoCourse {
  const advanced = /fundamentals|advanced|deep/i.test(`${profile.experience} ${profile.challengeLevel}`);
  const content = advanced ? advancedWeeks : beginnerWeeks;
  const count = Math.max(1, Math.min(52, Math.round(durationWeeks)));
  const days = daysAvailable(profile.daysPerWeek);
  const weeks = Array.from({ length: count }, (_, index): DemoWeek => {
    const outline = yearOutline[index];
    const seed = content[index];
    const playable = index < content.length;
    const sessions = playable ? seed.exercises.slice(0, days).map((exercise, day) => makeExercise(exercise, seed, profile, day)) : [];
    return {
      number: index + 1,
      title: seed?.title || outline[0],
      outcome: seed?.outcome || outline[1],
      sessions,
      playable,
    };
  });
  const level = advanced ? "Stretch path · building on your experience" : /tried/i.test(profile.experience) ? "Building on your first phrases" : "Friendly beginner path";
  return {
    title: "Spanish for everyday conversations",
    subtitle: `A ${count}-week preview path shaped around ${profile.outcome.toLowerCase()}, with ${profile.dailyTime.toLowerCase()} sessions across ${profile.daysPerWeek.toLowerCase()}.`,
    level,
    durationWeeks: count,
    weeks,
    sources: [{ title: "Language Transfer · Complete Spanish", url: "https://www.languagetransfer.org/complete-spanish", why: "A free audio course that explains how Spanish structures build on ideas learners already know." }],
    mode: "demo",
  };
}
