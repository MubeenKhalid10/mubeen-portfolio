export type FlowStep = {
  label: string;
  detail?: string;
};

export type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Short origin label, e.g. "Internship project · Hashmaker Solutions". */
  context: string;
  /** One-line positioning shown on cards and under the case-study title. */
  tagline: string;
  /** Concise problem/solution description for cards and metadata. */
  summary: string;
  tags: string[];
  /** Short badge text for cards, e.g. "Live". Must agree with `status`. */
  statusLabel: string;
  /** Part of the screenshot filename that picks the card/hero image (defaults to the first file). */
  cover?: string;
  /** Plain statement of what state the work is in; keeps claims honest. */
  status: string;
  /** Add only verified, publicly accessible URLs. */
  links: { repo?: string; demo?: string };
  /** Filled automatically from public/images/<slug>/ (see lib/projects.ts). */
  screenshots: Screenshot[];
  diagram: { caption: string; steps: FlowStep[] };
  overview: string[];
  problem: string[];
  solution: { paragraphs: string[]; workflow: string[] };
  contribution: string[];
  architecture: {
    paragraphs: string[];
    stack: { group: string; items: string[] }[];
  };
  decisions: { title: string; body: string }[];
  challenges: { challenge: string; response: string }[];
  results: {
    paragraphs: string[];
    metrics?: { label: string; value: string }[];
    caveats: string[];
  };
  lessons: string[];
};
