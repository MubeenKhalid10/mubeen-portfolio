/**
 * `evidence` names the project(s) that demonstrate a skill. Leave it as ""
 * until a project is added for it; nothing is shown beside the skill then.
 */
export type Skill = { name: string; evidence: string };

export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Full-Stack Development",
    skills: [
      { name: "Next.js", evidence: "ContentPulse" },
      { name: "React & TypeScript", evidence: "ContentPulse" },
      { name: "Python", evidence: "All projects" },
      { name: "FastAPI", evidence: "ContentPulse" },
      { name: "REST APIs", evidence: "ContentPulse, AI Call Agent" },
      { name: "Node.js", evidence: "" },
    ],
  },
  {
    title: "Data and Databases",
    skills: [
      { name: "SQL & PostgreSQL", evidence: "LeadFlow, AI Call Agent" },
      { name: "Data cleaning & processing", evidence: "LeadFlow" },
      { name: "MongoDB, Firebase, Supabase", evidence: "" },
      { name: "Pinecone (vector database)", evidence: "" },
    ],
  },
  {
    title: "AI and Machine Learning",
    skills: [
      { name: "RAG & LLM applications", evidence: "AI Call Agent" },
      { name: "Real-time voice AI", evidence: "AI Call Agent" },
      { name: "LangChain, embeddings", evidence: "" },
      { name: "Scikit-learn, TensorFlow, PyTorch", evidence: "" },
    ],
  },
  {
    title: "Tools and Deployment",
    skills: [
      { name: "Git & GitHub", evidence: "All projects" },
      { name: "AWS (RDS, ECS Fargate, ALB)", evidence: "LeadFlow" },
      { name: "Vercel", evidence: "ContentPulse, AI Call Agent" },
      { name: "Twilio, Deepgram, Cartesia, Pipecat", evidence: "AI Call Agent" },
    ],
  },
];
