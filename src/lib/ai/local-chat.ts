import { practiceAreas } from "../../../content/practice-areas";
import { site } from "../../../content/site";

type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  keywords: string[];
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+$]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 2);
}

function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    {
      id: "firm",
      title: "About the firm",
      text: `${site.name} (${site.shortName}) — ${site.tagline}. ${site.summary} Serving ${site.jurisdiction}. ${site.nameMeaning}`,
      keywords: [
        "about",
        "firm",
        "proact",
        "who",
        "company",
        "paralegal",
        "ontario",
        "tagline",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      text: `Phone: ${site.phone}. Email: ${site.email}. Contact page: /contact. ${site.cta.body}`,
      keywords: [
        "contact",
        "phone",
        "email",
        "call",
        "reach",
        "book",
        "consultation",
        "appointment",
        "speak",
      ],
    },
    {
      id: "founder",
      title: "Leadership",
      text: `${site.founder.name}, ${site.founder.role}. ${site.founder.experience}`,
      keywords: [
        "percy",
        "founder",
        "ceo",
        "leadership",
        "professional",
        "who runs",
        "owner",
      ],
    },
    {
      id: "ethos",
      title: "The PROACT method",
      text: site.ethos
        .map((item) => `${item.letter} — ${item.title}: ${item.description}`)
        .join(" "),
      keywords: [
        "proact",
        "ethos",
        "method",
        "approach",
        "professional",
        "research",
        "organize",
        "action",
        "collaborative",
        "transform",
      ],
    },
    {
      id: "why",
      title: "Why clients choose ProAct",
      text: site.differentiators.join(". "),
      keywords: ["why", "choose", "different", "standout", "benefit", "value"],
    },
    {
      id: "disclaimer",
      title: "Important limits",
      text: `${site.disclaimerShort} This chat shares general website information only and is not legal advice.`,
      keywords: [
        "advice",
        "legal advice",
        "confidential",
        "disclaimer",
        "relationship",
        "privileged",
        "guarantee",
      ],
    },
  ];

  for (const area of practiceAreas) {
    chunks.push({
      id: area.slug,
      title: area.title,
      text: `${area.summary} ${area.intro} Key services include: ${area.services
        .flatMap((group) => group.items.slice(0, 4))
        .join("; ")}. More details: /practice-areas/${area.slug}`,
      keywords: [
        ...tokenize(area.title),
        ...tokenize(area.shortTitle),
        area.slug.replace(/-/g, " "),
        "practice",
        "service",
        "area",
        "represent",
        "tribunal",
        "court",
      ],
    });
  }

  return chunks;
}

const knowledgeChunks = buildKnowledgeChunks();

function scoreChunk(query: string, chunk: KnowledgeChunk) {
  const q = normalize(query);
  const tokens = tokenize(query);
  let score = 0;

  for (const keyword of chunk.keywords) {
    if (q.includes(normalize(keyword))) score += 3;
  }

  for (const token of tokens) {
    if (normalize(chunk.title).includes(token)) score += 2;
    if (normalize(chunk.text).includes(token)) score += 1;
  }

  return score;
}

function isGreeting(query: string) {
  return /^(hi|hello|hey|good\s+(morning|afternoon|evening)|howdy)\b/.test(
    normalize(query),
  );
}

function wantsHumanHelp(query: string) {
  return /\b(lawyer|speak to (someone|a person)|talk to (someone|a person)|human|real person|call me)\b/.test(
    normalize(query),
  );
}

function asksForAdvice(query: string) {
  return /\b(should i|what should i do|can i sue|will i win|advise me|legal advice|represent me|my case|my landlord|my tenant)\b/.test(
    normalize(query),
  );
}

/** Local site-guide replies when OpenAI is unavailable. */
export function answerFromSiteKnowledge(
  messages: { role: "user" | "assistant"; content: string }[],
) {
  const latest =
    [...messages].reverse().find((message) => message.role === "user")
      ?.content ?? "";

  if (!latest.trim()) {
    return `I can share general information about ${site.name}. Ask about our practice areas, contact details, or the PROACT approach. This is not legal advice.`;
  }

  if (isGreeting(latest)) {
    return `Hello — I’m the ${site.name} site assistant. I can explain our practice areas and how to contact the firm. I don’t give legal advice, and this chat doesn’t create a professional relationship. What would you like to know?`;
  }

  if (asksForAdvice(latest) || wantsHumanHelp(latest)) {
    return `I can only share general information published on this website — not advice for your specific situation. For guidance on your matter, please contact the firm at ${site.phone}, ${site.email}, or through the contact page (/contact). Please don’t share confidential details here.`;
  }

  const ranked = knowledgeChunks
    .map((chunk) => ({ chunk, score: scoreChunk(latest, chunk) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    return `I don’t have that specific detail in the site information I can share. You can browse Practice Areas, About, and Professionals on this website, or contact ${site.name} at ${site.phone} / ${site.email} (/contact). This chat is for general firm information only — not legal advice.`;
  }

  const top = ranked.slice(0, 2);
  const body = top
    .map(({ chunk }) => `${chunk.title}\n${chunk.text}`)
    .join("\n\n");

  return `${body}\n\nIf you need help with a specific matter, contact us at ${site.phone} or ${site.email}. This is general website information only — not legal advice.`;
}

export function streamTextResponse(text: string) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}
