/**
 * Central profile data. Edit values here; nothing else in the codebase
 * hardcodes personal details. Set a field to `null` to hide it everywhere.
 */
export const profile = {
  name: "Mubeen Khalid",
  monogram: "MUBEEN KHALID",
  headline: "Full-Stack Engineer | Python, Next.js & AI Integration",
  intro:
    "I build full-stack applications, data-driven tools, and AI-powered products that solve practical problems.",
  github: "https://github.com/MubeenKhalid10",
  linkedin: "https://www.linkedin.com/in/mubeenkhalid10/" as string | null,
  /** From the résumé. Set to null to hide. */
  email: "mubeenkhalid1110@gmail.com" as string | null,
  /**
   * The résumé buttons appear only when this file exists in /public.
   * They open the PDF in a new tab.
   */
  resumeFile: "MUBEEN_KHALID.pdf",
  about: [
    "I'm a Software Engineer with a BS in Software Engineering from COMSATS University Islamabad, Lahore Campus, and I work as an AI Associate Engineer at Hashmaker Solutions. I like building software that people can actually use, and I learn best by taking real problems from idea to a working system.",
    "My work spans the stack: Next.js interfaces, Python and FastAPI services, PostgreSQL-backed data workflows, and AI integration including retrieval-augmented generation (RAG), semantic search, and real-time voice AI.",
    "I'm looking for full-stack engineering and AI / ML engineering roles where I can contribute, keep learning, and ship dependable software.",
  ],
  education: {
    degree: "BS Software Engineering",
    institution: "COMSATS University Islamabad, Lahore Campus",
    period: "September 2022 – July 2026" as string | null,
  },
  experience: [
    {
      title: "AI Associate Engineer",
      organization: "Hashmaker Solutions",
      period: "August 2026 – Present",
      bullets: [
        "Developing AI-powered and data-driven applications, working with Python, PostgreSQL, LLMs, RAG, real-time voice AI, API integration, and backend development.",
        "Collaborating on production-oriented software projects focused on automation, scalable data processing, AI integration, and practical solutions for business use cases.",
      ],
    },
  ] as { title: string; organization: string; period: string; bullets: string[] }[],
  certifications: [
    { name: "Foundations of AI and Machine Learning", issuer: "Microsoft" },
    { name: "AI and Machine Learning Algorithms and Techniques", issuer: "Microsoft" },
    { name: "Python Full Course", issuer: "IBM" },
  ],
  /** Shown as the hero technology strip; each is used in a listed project (see skills.ts). */
  stack: [
    "Python",
    "FastAPI",
    "Next.js",
    "React & TypeScript",
    "PostgreSQL",
    "AWS",
    "LLMs & RAG",
  ],
  focus: [
    "Full-stack web applications with Next.js, Python, and FastAPI",
    "Data pipelines and database-backed workflows",
    "RAG, LLM applications, and real-time voice AI",
    "Integrating AI services into real product workflows",
  ],
} as const;
