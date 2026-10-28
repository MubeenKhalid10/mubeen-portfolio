import type { Project } from "@/types/project";

/**
 * Case-study content. Statements come from the résumé and from what the
 * live apps show. Add repo URLs and screenshots only once they are verified
 * and public. Screenshot files go in public/images/<slug>/.
 */
export const projects: Project[] = [
  {
    slug: "leadflow",
    context: "Internship project · Hashmaker Solutions",
    title: "LeadFlow",
    tagline: "Lead data cleaning, sorting, and management.",
    summary:
      "Cleaning, organizing, and managing large contact datasets by hand is slow and error-prone. LeadFlow is a Python and PostgreSQL application that maps columns, standardizes data, removes duplicates, and keeps a validated master database.",
    tags: ["Python", "Streamlit", "PostgreSQL", "AWS"],
    statusLabel: "Deployed on AWS",
    cover: "Clean Leads",
    status:
      "Streamlit application deployed on AWS (internship project at Hashmaker Solutions). A separate Next.js + FastAPI migration prototype exists and is not a completed migration.",
    links: {
      demo: "http://leadflow-alb-2104659750.ap-southeast-1.elb.amazonaws.com/",
    },
    screenshots: [],
    diagram: {
      caption:
        "Simplified diagram of the deployed Streamlit architecture — not a screenshot.",
      steps: [
        { label: "Users", detail: "Browser" },
        { label: "Load balancer", detail: "AWS ALB" },
        { label: "App service", detail: "Streamlit on ECS Fargate" },
        { label: "Database", detail: "PostgreSQL on AWS RDS" },
      ],
    },
    overview: [
      "LeadFlow is a data cleaning and lead management platform for processing, organizing, searching, and managing large contact datasets. It was built as an internship project at Hashmaker Solutions.",
      "The original application is built with Python, Streamlit, and PostgreSQL. A separate, exploratory prototype has also tried a Next.js frontend with a FastAPI backend. This page keeps the two clearly apart.",
    ],
    problem: [
      "Contact lists arrive in inconsistent shapes: different column names, formatting, duplicate entries, invalid or bounced emails, and stray special characters. Cleaning them manually does not scale.",
      "Records also have different meanings depending on their state (Master, MQL, Bounce, Unsub), so they must stay separated and consistent.",
    ],
    solution: {
      paragraphs: [
        "LeadFlow turns cleaning into a repeatable pipeline backed by a database, so each upload is processed the same way and validated against a persistent master list.",
      ],
      workflow: [
        "Upload a contact data file.",
        "Map its columns to the expected fields and standardize the data.",
        "Remove duplicates, handle special characters, filter by country, and detect bounced emails.",
        "Validate against the master database and keep master data persistent.",
        "Search and manage records across the Master, MQL, Bounce, and Unsub categories.",
      ],
    },
    contribution: [
      "Built the Python and Streamlit application and its PostgreSQL-backed data workflows.",
      "Implemented intelligent column mapping, data standardization, duplicate removal, country-based filtering, bounced-email detection, master database validation, special-character handling, and persistent master data management.",
      "Worked on the AWS deployment: PostgreSQL on RDS, an ECS Fargate service, and an Application Load Balancer.",
      "Explored a Next.js and FastAPI migration in a separate prototype.",
    ],
    architecture: {
      paragraphs: [
        "The deployed application runs as a containerised Streamlit service behind an Application Load Balancer, reading and writing records in a managed PostgreSQL database. Credentials and internal infrastructure details are not published.",
        "The migration prototype splits the product into a Next.js client and a FastAPI service. It is exploratory and should not be read as the production system.",
      ],
      stack: [
        { group: "Deployed application", items: ["Python", "Streamlit", "PostgreSQL"] },
        { group: "Infrastructure", items: ["AWS RDS", "ECS Fargate", "Application Load Balancer"] },
        { group: "Migration prototype (separate)", items: ["Next.js", "FastAPI"] },
      ],
    },
    decisions: [
      {
        title: "A persistent master database",
        body: "Validating every upload against a stored master list keeps results consistent over time and catches records that were already processed.",
      },
      {
        title: "Separate categories for each record state",
        body: "Master, MQL, Bounce, and Unsub data are distinct workflows so that records in one state are not confused with another.",
      },
      {
        title: "Prototype the migration separately",
        body: "Trying a Next.js and FastAPI split in its own prototype lets the approach be evaluated without risking the working Streamlit application.",
      },
    ],
    challenges: [
      {
        challenge: "Inconsistent, messy input files.",
        response:
          "Column mapping and standardization normalize each file before any validation or filtering happens.",
      },
      {
        challenge: "Working with large datasets in an interactive tool.",
        response:
          "Handling data in the database and querying it, rather than holding whole datasets in memory, keeps operations practical as data grows.",
      },
      {
        challenge: "Running the application reliably outside a local machine.",
        response:
          "Deploying it as a container on ECS Fargate behind a load balancer, with a managed database, separates the app from its data.",
      },
    ],
    results: {
      paragraphs: [
        "No measured performance figures or dataset-size numbers are published on this page. They will be added only when they can be supported with project evidence.",
      ],
      caveats: [
        "Deployed functionality (Streamlit) and prototype functionality (Next.js + FastAPI) are different things; the migration is not claimed to be complete.",
        "The live demo is served over plain HTTP from an AWS load balancer address. The source repository is not assumed to be public.",
      ],
    },
    lessons: [
      "Deployment architecture shapes design decisions as much as application code does.",
      "A frontend/backend split is worth prototyping before committing to a migration.",
      "Next step: document measured behaviour on realistic data volumes.",
    ],
  },
  {
    slug: "contentpulse",
    context: "Full-stack product",
    title: "ContentPulse",
    tagline: "Trend-driven content workflow for marketing agencies.",
    summary:
      "Agencies struggle to turn scattered trend signals into approved posts for each client. ContentPulse finds and scores trends per client, then guides the team through topic planning, writing, design, and approval.",
    tags: ["Next.js", "TypeScript", "FastAPI", "Python", "AI integration"],
    statusLabel: "Live",
    cover: "Landing",
    status:
      "Live application. Approved posts are shared manually; the app does not publish to social platforms automatically.",
    links: { demo: "https://contentpulse-hms.vercel.app/" },
    screenshots: [],
    diagram: {
      caption: "Simplified view of the product workflow — not a screenshot.",
      steps: [
        { label: "Discover & score trends" },
        { label: "Plan topics" },
        { label: "Write & design posts" },
        { label: "Review & approve" },
      ],
    },
    overview: [
      "ContentPulse is a social media workspace for marketing agencies with a Next.js frontend and a FastAPI backend. It finds trends in each client's market, scores them for fit, and helps the team turn the relevant ones into approved posts.",
      "It is a product workflow with several stages and human approval, not a standalone AI chatbot.",
    ],
    problem: [
      "Finding what is worth posting about, choosing an angle, writing and designing the post, and getting it approved usually spans several disconnected tools.",
      "Agencies also serve many clients, each with its own brand voice, markets, and platforms, so each client's context has to stay separate.",
    ],
    solution: {
      paragraphs: [
        "The application gives each client its own workspace and walks the team through the content process as an ordered workflow. AI assists at specific steps, and people stay in control of what is approved.",
      ],
      workflow: [
        "Set up a client workspace with its profile, services, brand voice, markets, platforms, and website pages as a knowledge base.",
        "Discover trends from sources such as Google Trends, Google News, Hacker News, Reddit, and RSS feeds, each given a 0–100 fit score with a stated reason.",
        "Shortlist relevant trends, choose a platform, and get a suggested post idea, format, and goal.",
        "Write drafts from the client's own material, with version comparison and restore.",
        "Add a design by exporting a brief, uploading media, or generating images.",
        "Review the post as it will appear in the feed, then approve it or request changes.",
      ],
    },
    contribution: [
      "Worked across the Next.js frontend and the FastAPI backend.",
      "Worked on authentication and client-level data separation in the application's architecture.",
      "Worked on database-backed trends with scheduled ingestion, and on AI integrations used within the workflow.",
    ],
    architecture: {
      paragraphs: [
        "A Next.js client talks to a FastAPI service. The backend handles authentication, scopes data to a client workspace, stores trends, and calls AI providers.",
        "Trends are stored in a database and refreshed by scheduled ingestion rather than fetched on every page view. AI is optional: without it, scoring falls back to rules and posts start from templates.",
      ],
      stack: [
        { group: "Frontend", items: ["Next.js", "TypeScript", "React"] },
        { group: "Backend", items: ["FastAPI", "Python"] },
        {
          group: "Data & integrations",
          items: ["Database-backed trends", "Scheduled ingestion", "Trend sources (Google Trends, Google News, Hacker News, Reddit, RSS)", "AI providers"],
        },
      ],
    },
    decisions: [
      {
        title: "Per-client workspaces",
        body: "Each client has its own profile and knowledge base so scoring and writing reflect that client's voice and markets.",
      },
      {
        title: "Scored trends with thresholds",
        body: "A 0–100 fit score with a reason means only relevant trends move on to post ideas, instead of every trending topic.",
      },
      {
        title: "AI inside a workflow, with approval",
        body: "Generation is one stage in a larger process, and an admin approves each post before it is marked ready to publish.",
      },
      {
        title: "Role-based access",
        body: "Admins, creators, and viewers have different permissions, so approval stays with admins.",
      },
    ],
    challenges: [
      {
        challenge: "Keeping each client's data and context separate.",
        response:
          "Authentication identifies the user, and data access is scoped to the client workspace.",
      },
      {
        challenge: "Making AI features optional and resilient.",
        response:
          "The workflow still works without AI, using rule-based scoring and templates, and text and image generation can fall back between providers.",
      },
    ],
    results: {
      paragraphs: [
        "The application is live at the demo link. Test counts and coverage figures are not published here; automated tests and manual browser testing are different kinds of evidence and will be reported separately once verified.",
      ],
      caveats: [
        "Passing tests are not presented as proof of successful deployment.",
        "Some trend sources need API keys, so not every source is necessarily active.",
        "No API keys, tokens, or client data are shown.",
      ],
    },
    lessons: [
      "Multi-client products need data separation at every layer, from authentication to queries.",
      "Treating AI output as a draft in a workflow produces a more trustworthy product.",
      "Next step: publish verified test results and a walkthrough with real screenshots.",
    ],
  },
  {
    slug: "ai-call-agent",
    context: "Internship project · Hashmaker Solutions",
    title: "Outbound AI Call Agent",
    tagline: "Real-time voice AI for outbound sales calls.",
    summary:
      "Cold calling is repetitive and hard to scale. This platform runs AI-powered outbound sales calls in real time, from campaign and prospect management through qualification, transcription, and CRM-ready call results.",
    tags: ["Pipecat", "Twilio", "Deepgram", "Cartesia", "LLMs", "RAG", "PostgreSQL"],
    statusLabel: "Live · in development",
    cover: "dashboard",
    status:
      "Internship project at Hashmaker Solutions, live at the demo link and still in development.",
    links: { demo: "https://ai-outbound-call-agent.vercel.app/app/" },
    screenshots: [],
    diagram: {
      caption:
        "Simplified view of the real-time call pipeline — not a screenshot.",
      steps: [
        { label: "Twilio call", detail: "Phone audio" },
        { label: "Speech to text", detail: "Deepgram" },
        { label: "LLM + RAG", detail: "Pipecat pipeline" },
        { label: "Text to speech", detail: "Cartesia" },
      ],
    },
    overview: [
      "The Outbound AI Call Agent is an AI-powered cold-calling platform for natural, real-time sales conversations. It was built as an internship project at Hashmaker Solutions.",
      "The web app is organised into a dashboard, campaigns, contacts, calls, a live AI agent, a knowledge base, analytics, and settings.",
    ],
    problem: [
      "Outbound sales calling takes many repetitive calls, consistent handling of objections, and careful follow-up. Summaries and call outcomes also have to be recorded for the sales team.",
      "A voice agent must respond quickly enough to feel like a conversation, which makes it a real-time systems problem as well as an AI one.",
    ],
    solution: {
      paragraphs: [
        "The platform manages prospects and campaigns, runs the live conversation through a voice pipeline, and records the outcome of each call in a form a CRM can use.",
      ],
      workflow: [
        "Create campaigns and manage prospects.",
        "Place calls where an AI agent qualifies the lead, handles objections, and personalises the conversation using a knowledge base (RAG).",
        "Handle meeting and callback workflows during the call.",
        "Transcribe each call, produce a summary, and store CRM-ready results.",
      ],
    },
    contribution: [
      "Developed the platform using Pipecat, Twilio, Deepgram, LLMs, Cartesia, PostgreSQL, and RAG.",
      "Implemented prospect and campaign management, intelligent lead qualification, objection handling, and personalised conversations.",
      "Implemented meeting and callback workflows, call transcription, summaries, and CRM-ready call results.",
    ],
    architecture: {
      paragraphs: [
        "Phone audio comes in through Twilio and is transcribed by Deepgram. A Pipecat pipeline passes the text to an LLM, which can retrieve from the knowledge base (RAG), and the reply is spoken back with Cartesia. Campaigns, contacts, and call records are stored in PostgreSQL.",
      ],
      stack: [
        { group: "Voice pipeline", items: ["Pipecat", "Twilio", "Deepgram", "Cartesia"] },
        { group: "AI", items: ["LLMs", "RAG knowledge base"] },
        { group: "Data", items: ["PostgreSQL"] },
      ],
    },
    decisions: [
      {
        title: "A streaming voice pipeline",
        body: "Processing audio as a stream, rather than waiting for whole turns, is what makes the conversation feel natural.",
      },
      {
        title: "Ground answers in a knowledge base",
        body: "RAG lets the agent answer from approved material instead of relying on the model alone.",
      },
      {
        title: "Produce CRM-ready results",
        body: "Transcripts, summaries, and structured outcomes make each call useful after it ends.",
      },
    ],
    challenges: [
      {
        challenge: "Keeping latency low enough for a real conversation.",
        response:
          "Using a streaming pipeline that connects speech recognition, the LLM, and speech synthesis.",
      },
      {
        challenge: "Handling objections and unexpected replies.",
        response:
          "Giving the agent qualification and objection-handling behaviour, with meeting and callback paths when a prospect is interested.",
      },
    ],
    results: {
      paragraphs: [
        "The application is live at the demo link. No call-quality, latency, or conversion figures are published on this page, because none have been verified.",
      ],
      caveats: [
        "The project is still in development.",
        "No call recordings, transcripts, or prospect data are shown.",
      ],
    },
    lessons: [
      "Real-time voice AI is as much about latency and turn-taking as model quality.",
      "A useful agent needs the surrounding workflow: campaigns, follow-ups, and records.",
      "Next step: measure latency and call outcomes and add real screenshots.",
    ],
  },
  {
    slug: "swiftcare",
    context: "Final year project · COMSATS University",
    title: "SwiftCare",
    tagline: "Healthcare appointment and queue management.",
    summary:
      "Waiting rooms and phone-based booking waste patients' and clinics' time. SwiftCare is a Next.js platform for online appointment booking, live queue tracking, and doctor and hospital management, with an AI assistant that guides patients.",
    tags: ["Next.js", "REST APIs", "JWT", "Role-based access", "AI assistant"],
    statusLabel: "Live · final year project",
    cover: "Landing",
    status:
      "Final year project for the BS Software Engineering degree, live at the demo link. No public repository is linked.",
    links: { demo: "https://swiftcare-health.vercel.app/" },
    screenshots: [],
    diagram: {
      caption: "Simplified view of the patient and clinic workflow — not a screenshot.",
      steps: [
        { label: "Book appointment", detail: "Online" },
        { label: "Join live queue", detail: "Real-time tracking" },
        { label: "Doctor & hospital management", detail: "Role-based access" },
        { label: "AI assistant", detail: "Patient guidance" },
      ],
    },
    overview: [
      "SwiftCare is a healthcare appointment and queue management platform built with Next.js and backend APIs, developed as a final year project.",
    ],
    problem: [
      "Patients often do not know how long they will wait, and booking an appointment can mean calling or visiting in person.",
      "Clinics also need a way to manage doctors, hospitals, and who is allowed to see and change what.",
    ],
    solution: {
      paragraphs: [
        "The platform lets patients book online and watch the live queue, while staff manage doctors and hospitals under role-based permissions. A project-specific AI assistant helps patients find their way around.",
      ],
      workflow: [
        "Patients book an appointment online.",
        "The live queue shows their position in real time.",
        "Doctors and hospitals are managed through role-restricted screens.",
        "Users sign in with secure JWT authentication.",
        "A project-specific AI assistant offers guidance to patients.",
      ],
    },
    contribution: [
      "Built the platform with Next.js and backend APIs.",
      "Implemented real-time live queue tracking, online appointment booking, and doctor and hospital management.",
      "Implemented secure JWT authentication and role-based access control.",
      "Added a project-specific AI assistant for patient guidance.",
    ],
    architecture: {
      paragraphs: [
        "A Next.js frontend communicates with backend APIs. Authentication uses JWTs, and access to features depends on the user's role. Live queue state is updated in real time.",
      ],
      stack: [
        { group: "Frontend", items: ["Next.js"] },
        { group: "Backend", items: ["Backend APIs", "JWT authentication"] },
        { group: "Features", items: ["Real-time queue tracking", "Role-based access control", "AI assistant"] },
      ],
    },
    decisions: [
      {
        title: "Role-based access control",
        body: "Patients, doctors, and administrators see and change different things, which matters for healthcare data.",
      },
      {
        title: "Real-time queue updates",
        body: "Showing live queue position removes the guesswork that makes waiting frustrating.",
      },
      {
        title: "A scoped AI assistant",
        body: "The assistant is specific to this project and focused on guiding patients rather than being a general chatbot.",
      },
    ],
    challenges: [
      {
        challenge: "Keeping the live queue accurate for everyone at once.",
        response: "Queue changes are pushed to users in real time rather than only on page reload.",
      },
      {
        challenge: "Protecting sensitive features.",
        response: "JWT authentication combined with role-based checks controls who can reach which actions.",
      },
    ],
    results: {
      paragraphs: [
        "No usage figures, test counts, or deployment results are published for this project.",
      ],
      caveats: [
        "This is an academic final year project and is not claimed to be used by a real clinic.",
        "No real patient data is shown.",
      ],
    },
    lessons: [
      "Authentication and authorization need to be designed together from the start.",
      "Real-time features change how state is shared between users.",
      "Next step: add a demo link and screenshots.",
    ],
  },
];

