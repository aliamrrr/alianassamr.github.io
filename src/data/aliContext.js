const ALI_CONTEXT = `
# Ali Anass Amradouch — Complete Professional Profile

## Who is Ali?
Ali Anass Amradouch is a 23-year-old AI Engineer and Data Scientist based in Nantes, France. He graduated from IMT Atlantique (ranked #3 engineering school in France by L'Étudiant) with a GPA of 3.92/4, and completed an Erasmus+ semester at Universidad Carlos III de Madrid specializing in LLMs. He is currently working as an AI Engineer at Sopra Steria Next in Nantes.

He speaks 4 languages: Arabic (native), French (bilingual), English (C1), Spanish (B2).

## Contact & Links
- Email: aliamr3210@gmail.com
- LinkedIn: https://www.linkedin.com/in/ali-anass-amradouch-321567255/
- GitHub: https://github.com/aliamrrr
- Location: Nantes, France
- Football & AI content: https://www.linkedin.com/company/ali-decodes/

---

## Current Position

### AI Engineer — Sopra Steria Next (Oct 2025 – Present, Nantes)
Sopra Steria Next is a leading European tech consulting firm. Ali works as an AI Engineer contributing to enterprise-grade AI projects:
- Contributed to the framing of AI use cases across generative AI, speech-to-text, and observability
- Developed AI solutions and components within enterprise environments
- Supported the industrialization of AI use cases, from POC to production-ready solutions
- Currently focused on AI evals & monitoring: measuring, monitoring and improving the quality of LLM and agent systems in production

---

## Professional Experience (Chronological)

### AI Research Intern — ALTEN R&D Innovation Lab (Apr – Sept 2025, Rennes)
ALTEN is a major European engineering & technology consultancy with a dedicated R&D lab. Supervised by Pierpaolo Goffredo (PhD in NLP, LLM expert) and Saad Abidi (AI Engineer at Atos).
End-of-studies internship on the Cobot-Greenwashing project: a conversational agent that answers questions about companies' CSR (sustainability) reports with sources. Ali owned the table tool, since key CSR figures live in tables where LLMs perform worse than on text.
- Compared three methods: LLM-Table (whole table in the prompt, baseline), Multi-Experts (a few-shot classifier routes questions to 5 categories with specialised prompts, 90% routing accuracy on 250 questions) and Chain-of-Tables (the LLM selects relevant rows, then columns, and answers from the sub-table; inspired by Google's Chain-of-Table)
- Built an evaluation on 1,000 QA pairs from FeTaQA, TAT-QA, TableBench and WikiTables, across Gemma 2B, Gemma 3n, Mistral 7B and GPT-4o-mini. Showed BERTScore could not separate methods (0.827–0.878) and added LLM-as-a-Judge scoring of factual correctness (20.7–74.1)
- Chain-of-Tables won on every model: Gemma 2B went from 20.7 to 65.1; Mistral 7B came within 2.6 points of GPT-4o-mini (71.5 vs 74.1)
- Found merged cells (−5.1 pts) and hierarchical indexes (−12 pts) hurt accuracy; injecting table metadata into the prompt raised GPT-4o-mini + Chain-of-Tables to 80.4 (+6.2), numerical reasoning to 86.55 (+10.85)
- Set up a 3,000-table labelling campaign: 120 Label Studio projects of 25 tables, Azure Blob Storage, Label Studio Python API, custom annotation interface, annotation guide and tracking pipelines
- Shipped a demonstrator: chat over any table with GPT-4o-mini / Mistral / Gemma, analytics dashboard (sessions, latency, cost) on a SQL database, like/dislike feedback. Tested on ALTEN and Carrefour reports: 96% satisfaction, 100% of misleading questions caught
- Explored Text-to-SQL for larger tables, with a taxonomy of LLM SQL errors

### Software Engineer / Data Analyst — French Health Insurance (Sept – Dec 2024, Remote)
A mission-critical government project with high visibility:
- Led a team of 4 engineers building a full-stack fraud detection interface
- Designed the database architecture, backend API, and frontend dashboard
- Built Business Intelligence dashboards for healthcare fraud analysis
- Presented the final product at Palais des Congrès de Paris to the French Ministry of Health — exceptional visibility for a student project

### AI Research Intern — Royal Belgian Football Association / RBFA (Dec 2024 – Mar 2025, Remote)
The RBFA is the national football federation of Belgium. Managed by Max Goldsmith (Analytics at Just Eat Takeaway).
- Translated complex tactical match analysis needs into concrete AI solutions
- Built computer vision pipelines for player detection & phase-of-play segmentation using deep learning
- Produced custom tactical visualizations for match preparation used by coaching staff

---

## Education

### IMT Atlantique — Engineering Degree, Data Science Specialization (2022–2025, Nantes)
- GPA: 3.92 / 4.00
- Ranked #3 engineering school in France by L'Étudiant
- One of the elite "Grandes Écoles" in France (equivalent to top-tier engineering universities)
- Specialization: AI & Data Science
- Key courses: Machine Learning, NLP, Data Engineering, System Design, Algorithms, Statistics
- Hands-on production AI projects and research throughout the curriculum

### Universidad Carlos III de Madrid — Erasmus+, AI & LLMs (Jan–Jun 2024, Madrid)
- International exchange in Madrid as part of the Erasmus+ program
- Deep dive into cutting-edge LLM research and serving infrastructure
- Topics: vLLM serving at scale, advanced RAG pipeline design, LLM fine-tuning methodologies
- Broadened international perspective and network

### MPSI / MP Prépa — Mathematics & Physics (2020–2022, Meknes, Morocco)
- Finished Top of Class in a highly competitive two-year preparatory program
- "Classes Préparatoires aux Grandes Écoles" — the most rigorous academic track in the French system
- Covered advanced mathematics (algebra, analysis, topology), physics, and engineering sciences
- This is the intellectual foundation behind everything Ali builds: rigorous, first-principles thinking

---

## Technical Skills

### AI & Machine Learning
Python (expert), PyTorch, LangChain, Fine-Tuning (supervised & RLHF variants), GRPO (reinforcement learning for LLMs), Hugging Face ecosystem, vLLMs (serving large models efficiently)

### NLP & RAG
RAG (Retrieval-Augmented Generation) pipeline design, Semantic Search, Embeddings, NLP preprocessing, Text2SQL (natural language to SQL), vector databases

### Data Engineering
SQL (advanced), PostgreSQL, Data Engineering pipelines, ETL design, Grafana (observability dashboards), Power BI (business intelligence)

### Computer Vision
OpenCV, Object Detection (YOLO-family), Segmentation models, Player Tracking in sports video

### Infrastructure & Cloud
Docker, Kubernetes, OpenShift (enterprise Kubernetes), FastAPI (ML model serving), Azure (cloud platform)

---

## Achievements & Awards

- **3+ Production AI Apps** shipped across fintech, sports analytics & enterprise consulting
- **#2 at FC Barcelona Hackathon** — out of 3,000 participants worldwide, placed 2nd
- **3× International Hackathon Wins** — including competitions organized by Huawei, Airbus, and FC Barcelona
- **Research presented at Palais des Congrès de Paris** — to the French Ministry of Health as part of a healthcare fraud detection project
- **GPA 3.92/4** at IMT Atlantique — consistently top of his cohort

---

## LinkedIn Recommendations (verbatim)

### Pierpaolo Goffredo, PhD — Pilote Innovation in R&D, NLP & LLMs Expert at ALTEN
*Direct supervisor during AI internship at ALTEN R&D*
"I had the pleasure of working with Ali during his internship, and I was very impressed by both his professionalism and his positive attitude. Throughout our collaboration, he consistently demonstrated strong commitment, reliability, and the ability to quickly learn and adapt. Ali contributed valuable insights and delivered his work with great attention to detail, always showing motivation to go the extra mile. I truly appreciated working with him and I am confident that he will continue to excel in his future professional experiences. I wholeheartedly recommend Ali to any organization looking for a dedicated and talented colleague."

### Max Goldsmith — Analytics at Just Eat Takeaway, former RBFA
*Direct manager during internship at the Royal Belgian Football Association*
"I had the privilege of managing Ali Anass during his internship at the RBFA. Throughout his time with us, Ali demonstrated exceptional problem-solving abilities, navigating complex challenges with ease in our fast-paced environment. His professionalism was unwavering, and his collaborative nature made him a pleasure to work with daily. What truly set Ali apart was his dedication to research and innovation — constantly developing and exploring new ideas that benefited our organization. He has undoubtedly redefined our standards of excellence for interns at the RBFA. I offer my highest recommendation for Ali without reservation and am confident he will bring tremendous value to any organization fortunate enough to work with him."

### Saad Abidi — AI Engineer | Data Scientist at Atos
*Supervisor during internship at ALTEN*
"I had the opportunity to supervise Ali Anass during his internship, and I particularly appreciated his commitment to his work. He is a motivated individual who integrated quickly into the team, demonstrated excellent organizational skills, and contributed significantly to the project as well as during meetings. Additionally, he has a solid understanding of AI and data science."

---

## Personal Interests & Personality

### Football & AI (Passion Project)
Ali is deeply passionate about football — not just as a fan but as an analyst. He watches matches with a tactical lens and actively explores how AI and data science are reshaping the sport:
- Expected Goals (xG) models and shot quality metrics
- Computer Vision in football: player tracking, detection, phase-of-play segmentation (directly applied at RBFA)
- AI-driven scouting platforms and performance analytics
- Set-piece optimization through data
- Tactical pattern recognition using ML

He runs a LinkedIn page called "Ali Decodes" dedicated to AI applications in football: https://www.linkedin.com/company/ali-decodes/

### Other Interests
Competitive football player, fishing, tennis, tech talks & AI research

### Working Style & Personality
Based on direct manager feedback:
- Highly motivated and deeply committed to quality
- Integrates extremely fast into new teams and environments
- Excellent organizational and project management skills
- Strong problem-solver, comfortable working under pressure
- Dedicated researcher — constantly exploring new ideas beyond the scope asked
- Goes the extra mile consistently
- Great communicator in 4 languages
- First-principles thinker trained by rigorous French academic system

---

## Recent Activity & Side Projects (2026, from Ali's LinkedIn)

- **Focus**: GenAI & agentic systems at Sopra Steria Next, in the AI x SmartOps team (Practice AI & Smart Operations).
- **Certifications**: Claude Certified Developer (Anthropic), Claude Certified Associate (Anthropic), and AWS Certified AI Practitioner — all passed in the same week, supported by Sopra Steria Next.
- **CodmAI — 2nd out of 3,000 applicants at the Barça Innovation Hub hackathon (#MoreThanAHack)**, organised by FC Barcelona's Barça Innovation Hub and Metrica Sports, final presented at Talent Arena in Barcelona. CodmAI is a multi-agent platform that turns football data into instant tactical insights: ask anything in natural language and get automated analysis with charts, reports and video clips. Team: Abderrahim Abdellaoui, Brahim Anfoud, Adam Rochdi, Bilal Aidi.
- **Taible — Mistral AI Worldwide Hackathon** (1,000+ engineers across 7 cities): a tactical drill builder where coaches describe a setup in natural language and get an animated pitch with a narrated voiceover (voice by ElevenLabs), tactical overlays, and video export.
- **Next Radio — Paris AI Hackathon**, built with Adnane El Yazid: a radio channel fully run by AI agents (media generation, web search, scripts, audio).
- **OpenBootroom** (published via Ali Decodes): open-source AI skills for football, installable in Claude Code, Codex, GitHub Copilot or Cursor. Day 1: skills for SkillCorner data analysis and football intelligence (analysts, coaches, recruitment, performance and data teams). Day 2: youth football coaching — training-session reports (HTML/PDF) from notes, player observation reports from text or images, training-video review, development progressions. The skills ask one question at a time and adapt to the coach's context and methodology. Episode #1 analysed Sydney FC 4–1 Adelaide United with SkillCorner data: data audit, Q&A, confirmed brief, passing networks and shot maps for both teams, a PDF report uploaded to Google Drive, and a reusable pipeline.
- **World Cup 2026 sentiment analysis**: measured French public sentiment about Les Bleus players across the tournament (e.g. Mbappé's sentiment with Real Madrid vs with the national team; impact on the pitch vs public sentiment). Praised publicly by Bruno Maillot, Managing Director of the Practice AI & Smart Operations at Sopra Steria Next.
- **CatchBall — RL × robotics** (Ali's first reinforcement learning × robotics side project): a simulated humanoid robot learning to catch a ball. 4,096 robots train in parallel through five levels (drop, lob, medium, fast, expert) with asymmetric actor-critic PPO (the actor sees noisy, delayed ball positions; the critic sees exact physics during training). Rewards: +50 catch, +2 per step held, +100 per second held, −10 ball on the ground, −30 fall. The first policies exploited the reward (reward hacking) until it was tightened. For vision, a single pixels-to-actions network reached only 1%, so Ali separated seeing from acting: a CNN ball detector trained on ~38M simulator images with free labels finds 99.2% of visible balls with 2.0 cm 3D error and feeds the frozen teacher policy; then a camera-only student learns from the teacher's corrections. Weighted catch rate: teacher 64.9%, camera + detector chain 64.3%, camera-only student v3 59.1% (v2: 1.0%); under 1% falls. Part 3 added a world model: TD-MPC2 learns the dynamics in latent space (no images) and Dream-MPC plans in it every step (propose, imagine, improve with gradients inside a trust region, act). The policy learned in the model reached 58.9% after ~200M steps for $3.38 of GPU, but planning on top did not help (58-60% with small corrections, 27.5% unbounded) because the planner exploits the model's errors. Lessons: the reward is the law; split seeing from acting; don't trust your model too much.
- **Devoxx Morocco 2026**: attended the conference in Morocco.
- **Interests in AI research Ali has written about**: evolving the agent harness instead of fine-tuning the model (Joel Niklaus' "Don't Train the Model, Evolve the Harness" — agent performance depends heavily on the system around the model: tool-call repair, loop detection, output verification); conditional memory for LLMs (Engram, beyond Mixture-of-Experts); how Claude's perceived character varies across languages, and what that could mean for physical AI.
- **Background**: Ali is Moroccan and a proud supporter of the Moroccan national team; he cares about the Moroccan AI ecosystem.

---

## Frequently Asked Questions

**Q: Is Ali open to new opportunities or job offers?**
A: Ali is currently working at Sopra Steria Next as an AI Engineer. He is focused on his current role and not actively seeking new positions, but is always open to interesting conversations about AI, data science, and football analytics.

**Q: What type of projects has Ali worked on?**
A: Production AI apps (RAG pipelines, semantic search, RFP analysis), computer vision for sports analytics (player tracking, phase segmentation for RBFA), Text2SQL systems for enterprise data, fraud detection for French government healthcare, and LLM fine-tuning research.

**Q: What is Ali's strongest technical area?**
A: Python-based AI/ML engineering, specifically RAG pipelines, LLM fine-tuning (GRPO/RL), and deploying production-grade AI systems. He also has strong computer vision skills from his RBFA work.

**Q: Where did Ali study?**
A: IMT Atlantique (top 3 engineering school in France, GPA 3.92/4), Erasmus+ at Carlos III Madrid (LLMs), and two years of Prépa MPSI/MP in Morocco (top of class).

**Q: What languages does Ali speak?**
A: Arabic (native), French (bilingual), English (C1), Spanish (B2).
`;

export default ALI_CONTEXT;
