export const site = {
  name: "ProAct Legal Solutions",
  shortName: "ProAct",
  tagline: "Transforming Legal Challenges into Strategic Solutions",
  summary:
    "ProAct Legal Solutions delivers clear, strategic, and results-focused advocacy across Ontario.",
  phone: "416-822-6860",
  phoneHref: "tel:+14168226860",
  email: "info.ptls@gmail.com",
  emailHref: "mailto:info.ptls@gmail.com",
  website: "https://www.proactlegalsolutions.com",
  jurisdiction: "Ontario",
  founder: {
    name: "Percy Adjei Laryea, LL.M.",
    role: "CEO & Founder",
    experience:
      "With over 15 years of combined experience in litigation, adjudication, and dispute resolution, he continues to help individuals, landlords, tenants, small businesses, and newcomers to Canada navigate complex legal processes with confidence.",
    image: "/images/percy-web.jpg",
    imageAlt:
      "Percy Adjei Laryea, founder of ProAct Legal Solutions, in a light gray suit and navy tie",
  },
  ethos: [
    {
      letter: "P",
      title: "Professional",
      description: "Delivering clear, respectful, and reliable representation",
    },
    {
      letter: "R",
      title: "Research",
      description:
        "Gathering facts, evidence, and legal insight to strengthen your case",
    },
    {
      letter: "O",
      title: "Organize",
      description: "Structuring every file with precision and clarity",
    },
    {
      letter: "A",
      title: "Action",
      description: "Moving your matter forward with purpose and urgency",
    },
    {
      letter: "C",
      title: "Collaborative",
      description:
        "Working with clients, tribunals, and stakeholders to achieve results",
    },
    {
      letter: "T",
      title: "Transform",
      description:
        "Turning legal challenges into strategic, practical solutions",
    },
  ],
  differentiators: [
    "Clear, step-by-step guidance",
    "Professional representation at Ontario tribunals and Small Claims Court",
    "Modern, trustworthy, client-focused service",
    "Transparent communication",
    "Strategic, organized, and proactive advocacy",
  ],
  nameMeaning:
    "Our name reflects our commitment to being Professional, conducting thorough Research, staying Organized, taking decisive Action, working Collaboratively, and ultimately Transforming complex legal challenges into practical, successful outcomes.",
  cta: {
    headline: "Ready to move forward?",
    body: "Contact ProAct Legal Solutions today for professional, proactive legal support tailored to your situation.",
    label: "Contact us",
    href: "/contact",
  },
  disclaimerShort:
    "Submitting a form or chatting with our AI assistant does not create a paralegal-client or solicitor-client relationship. Do not send confidential, privileged, or time-sensitive information through this website.",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/professionals", label: "Professionals" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLegalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Website Terms & Disclaimer" },
] as const;
