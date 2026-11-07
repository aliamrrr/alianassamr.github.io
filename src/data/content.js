import { asset } from '../utils/asset';

/*
 * All site copy lives here.
 * Any `src: null` renders a grey "[INSERT ASSET HERE]" slot.
 * To fill one: drop the file in /public and set `src: asset('/your-file.ext')`
 * (.mp4 / .webm autoplay muted & loop). `ratio` is width / height.
 */

export const profile = {
  name: 'Ali Anass Amradouch',
  email: 'aliamr3210@gmail.com',
  location: 'Nantes',
  resume: asset('/AMRADOUCH_Ali_Anass_Reusme.pdf'),
  portrait: asset('/media/portrait.jpg'),
};

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/ali-anass-amradouch-321567255/',
  aliDecodes: 'https://www.linkedin.com/company/ali-decodes/',
  openBootroom: 'https://lnkd.in/ejDBZEAi',
  codmai: 'https://lnkd.in/eMS8sEqD',
};

export const socials = [
  { label: 'LinkedIn', href: LINKS.linkedin, cursor: 'linkedin' },
  { label: 'Email', href: `mailto:${profile.email}`, cursor: 'email' },
  { label: 'GitHub', href: 'https://github.com/aliamrrr', cursor: 'github' },
  { label: 'Ali Decodes', href: LINKS.aliDecodes, cursor: 'linkedin' },
  { label: 'Resume', href: profile.resume, cursor: 'resume' },
];

/* ── Work: projects with case studies ─────────────────────── */
export const projects = [
  {
    slug: 'rbfa',
    title: 'Royal Belgian FA',
    tag: 'Shipped 2025',
    heading: 'Computer vision for national-team match preparation',
    role: 'AI Research Intern',
    timeline: 'Dec 2024 to Mar 2025',
    team: ['Max Goldsmith (manager)'],
    skills: ['Computer Vision', 'Deep Learning', 'Sports Analytics'],
    media: { src: asset('/media/rbfa-tactical-frame.jpg'), ratio: '1460 / 821' },
    clickable: true,
    ctx: 'ball',
    cardLive: 'cv',
    live: 'detect',
    liveCaption: 'A live simulation of what the pipeline produces: every player detected and tracked, the ball carrier and the presser tagged, the defensive block drawn, the phase of play read, and the same play mirrored on a top-down tracking map. It runs in your browser.',
    summary:
      'The Royal Belgian Football Association wanted faster tactical analysis for the coaching staff. I turned their match-analysis questions into computer-vision pipelines and visual reports they used before games.',
    sections: [
      { title: 'The problem', body: ['Coaches had precise tactical questions (how compact is the block, who steps out, when does the shape break), and answering them meant hours of manual video review.'] },
      { title: 'What I built', bullets: [
        'Player detection pipelines on broadcast footage using deep learning.',
        'Phase-of-play segmentation, so analysts can jump straight to build-up, transition or set-piece moments.',
        'Tactical visuals of team shapes, lines and spacing for match preparation.',
      ] },
      { title: 'Outcome', body: ['The staff used these visuals to prepare national-team matches.'] },
    ],
    gallery: [
      { src: asset('/media/rbfa-defensive-lines.jpg'), ratio: '1300 / 800', caption: 'Defensive lines reconstructed from detections.' },
    ],
    quote: { text: 'He has undoubtedly redefined our standards of excellence for interns at the RBFA.', by: 'Max Goldsmith, Analytics at Just Eat Takeaway, former RBFA' },
  },
  {
    slug: 'sopra',
    title: 'Sopra Steria Next',
    tag: 'Shipping 2026',
    heading: 'GenAI & agentic systems for enterprise',
    media: { src: null, ratio: '4 / 3', hint: 'Cover for your Sopra Steria Next work (team photo, diagram or abstract visual)' },
    clickable: false,
  },
  {
    slug: 'codmai',
    title: 'CodmAI',
    tag: '2nd of 3,000 · Barça Innovation Hub',
    heading: 'Ask football data anything',
    role: 'AI Engineer',
    timeline: '2026',
    team: ['Abderrahim Abdellaoui', 'Brahim Anfoud', 'Adam Rochdi', 'Bilal Aidi'],
    skills: ['Multi-agent systems', 'Generative AI', 'Football data'],
    media: { src: asset('/media/codmai-talent-arena.jpg'), ratio: '1178 / 895' },
    clickable: true,
    ctx: 'ball',
    cardLive: 'codmai',
    live: 'codmai',
    liveCaption: 'The kind of question CodmAI answers: the planner splits it, the data agent pulls the events, the viz agent draws the heatmap and pass map, and the clips agent cuts the moments. Illustrative data.',
    summary:
      'CodmAI is a multi-agent platform: you ask a question about a match and get charts, reports and video clips back. We built it for #MoreThanAHack, the hackathon run by FC Barcelona’s Barça Innovation Hub and Metrica Sports, finished 2nd out of 3,000 applicants and presented the final at Talent Arena in Barcelona.',
    sections: [
      { title: 'How it works', bullets: [
        'Ask anything about a match in natural language.',
        'A team of agents plans the analysis, queries the data and answers with charts, reports and video clips.',
      ] },
    ],
    gallery: [
      { src: asset('/media/codmai-2nd-place.jpg'), ratio: '380 / 410', caption: 'More Than a Hack, 2nd place: the diploma from Talent Arena, Barcelona.' },
    ],
    link: { href: LINKS.codmai, label: 'More about the solution' },
  },
  {
    slug: 'openbootroom',
    title: 'OpenBootroom',
    tag: 'Open source 2026',
    heading: 'AI skills for football analysts and coaches',
    role: 'Creator',
    timeline: '2026',
    team: [],
    skills: ['Agent skills', 'Football data', 'Open source'],
    media: { src: asset('/media/openbootroom-passing-network.jpg'), ratio: '600 / 333' },
    clickable: true,
    ctx: 'ball',
    summary:
      'OpenBootroom is a set of open-source AI skills for football, published through Ali Decodes. You install them in Claude Code, Codex, GitHub Copilot or Cursor, and they guide you from raw data or notes to a finished report, asking one question at a time and following your own methodology.',
    sections: [
      { title: 'Day 1: SkillCorner analysis', body: ['Skills for analysts, coaches, recruitment, performance and data teams working with SkillCorner data.'] },
      { title: 'Day 2: Youth coaching', bullets: [
        'Turn coaching notes into training-session reports (HTML / PDF).',
        'Generate player observation reports from text or images.',
        'Review training videos and build development progressions.',
      ] },
      { title: 'Episode 1: Sydney FC 4-1 Adelaide United', bullets: [
        'Audit and parse the SkillCorner data, then clarify needs through short Q&A.',
        'A step-by-step brief, confirmed before anything changes.',
        'Passing networks and shot maps for both teams, with analysis.',
        'A PDF report uploaded to Google Drive, and a pipeline you can rerun on the next match.',
      ] },
      { title: 'Next', body: ['More data providers, video analysis, and scheduled Google Drive data that turns into automatic reports.'] },
    ],
    gallery: [
      { src: asset('/media/ali-decodes-post.jpg'), ratio: '617 / 510', caption: 'Episode 1 as published on Ali Decodes: passing networks for Sydney FC and Adelaide United.' },
    ],
    link: { href: LINKS.openBootroom, label: 'Install OpenBootroom' },
  },
  {
    slug: 'health-insurance',
    title: 'French Health Insurance',
    tag: 'Shipped 2024',
    heading: 'A fraud-detection platform, presented to the Ministry of Health',
    role: 'Software Engineer & Team Lead',
    timeline: 'Sept to Dec 2024',
    team: ['Team of 4 engineers'],
    skills: ['Full-stack', 'Data Engineering', 'Business Intelligence'],
    media: { src: null, ratio: '16 / 10' },
    clickable: false, // no visuals yet: kept out of Work and of the Next-project loop
    summary:
      'I led a team of four engineers building a full-stack tool that helps analysts spot healthcare fraud.',
    sections: [
      { title: 'What we built', bullets: [
        'The database, the backend API and the frontend dashboard.',
        'Business-intelligence dashboards for healthcare fraud analysis.',
      ] },
      { title: 'Outcome', body: ['We presented the final product at the Palais des Congrès de Paris, to representatives of the French Ministry of Health.'] },
    ],
    gallery: [
      { src: null, ratio: '16 / 10', hint: 'Photo from the Palais des Congrès presentation', caption: 'Palais des Congrès de Paris.' },
      { src: null, ratio: '16 / 10', hint: 'Architecture diagram (database → API → dashboard)', caption: 'System overview.' },
    ],
  },
  {
    slug: 'alten',
    title: 'ALTEN Labs',
    tag: 'LLM research 2025',
    heading: 'Teaching LLMs to read the tables in CSR reports',
    role: 'AI Research Intern (end-of-studies)',
    timeline: 'Apr to Sept 2025',
    team: ['Pierpaolo Goffredo, PhD', 'Saad Abidi'],
    skills: ['LLMs', 'Chain-of-Tables', 'LLM-as-a-Judge evals', 'Text-to-SQL'],
    media: { src: null, ratio: '4 / 3' },
    clickable: true,
    cardLive: 'tables',
    live: 'tables',
    liveCaption: 'The table tool on a real table from ALTEN’s 2023 CSR report: keep the relevant row, then the relevant columns, answer from the sub-table, and check it with the benchmark. The scores are the real LLM-as-a-Judge means from the study.',
    summary:
      'Cobot-Greenwashing is an R&D project at ALTEN Labs Rennes: a conversational agent that answers questions about companies’ CSR reports quickly, precisely and with sources. A report runs to around 150 pages, and the key figures (emissions, energy, workforce) sit in tables, where LLMs answer noticeably worse than on text. I worked on the table tool: find how to process tables, which model to use and how to answer, measure it, and ship a demo.',
    sections: [
      { title: 'The constraints', bullets: [
        'Tables arrive already parsed, as CSV or HTML (another team owned PDF parsing).',
        'CSR tables are small, typically 5 to 50 rows.',
        'An answer has to come back in under 2 seconds.',
      ] },
      { title: 'Three methods', blocks: [{ type: 'methods', items: [
        { name: 'LLM-Table', note: 'baseline', text: 'The whole table and the question go into one context prompt, with an instruction to answer strictly from the table.' },
        { name: 'Multi-Experts', note: 'router', text: 'A few-shot classifier sends each question to one of five categories (lookup, summarization, fact verification, data analysis, numerical reasoning), each with its own prompt. It routed 90% of 250 labelled questions correctly.' },
        { name: 'Chain-of-Tables', note: 'winner', text: 'Inspired by Google’s Chain-of-Table: the LLM first selects the relevant rows, then the relevant columns, and answers from that much smaller sub-table.' },
      ] }] },
      { title: 'Measuring it properly', body: [
        'I moved evaluation from 76 hand-written questions to 1,000 question/answer pairs from four public benchmarks (FeTaQA, TAT-QA, TableBench, WikiTables), across four models: Gemma 2B, Gemma 3n (a mixture-of-experts model), Mistral 7B and GPT-4o-mini.',
        'BERTScore alone could not separate the methods: every combination landed between 0.827 and 0.878. It measures semantic closeness, not whether the number is right. So I added an LLM-as-a-Judge that scores factual correctness from 0 to 100, and the spread opened up from 20.7 to 74.1.',
      ], blocks: [{ type: 'duel',
        reference: 'The United States finished behind 7 countries.',
        generated: 'The United States placed behind 9 countries, including Finland, Netherlands, Norway, East Germany, Sweden, West Germany, Canada and Japan.',
        scores: [{ metric: 'BERTScore', value: '0.74', verdict: 'looks close enough' }, { metric: 'LLM-as-a-Judge', value: '0', verdict: 'wrong answer' }],
      }] },
      { title: 'Results', body: [
        'Chain-of-Tables wins on every model, and the smaller the model, the bigger the gain: Gemma 2B jumps from 20.7 to 65.1. Mistral 7B with Chain-of-Tables lands within 2.6 points of GPT-4o-mini, with an open model you can run on your own hardware.',
      ], blocks: [{ type: 'bars' }] },
      { title: 'Where it breaks', body: [
        'Real reports are not tidy. Every company has its own template, with merged cells and multi-level headers, and those layouts cost the model points (GPT-4o-mini with Chain-of-Tables). Longer answers also drift: the more words, the lower the BERTScore.',
      ], blocks: [{ type: 'stats', items: [
        { value: '−5.1', label: 'with merged cells (73.9 → 68.7)' },
        { value: '−12.0', label: 'with a hierarchical index (73.5 → 61.5)' },
      ] }] },
      { title: 'The fix: describe the table to the model', body: [
        'I added a metadata block to the prompt (size, column names and types, merged cells, hierarchical index, missing values) plus an instruction to keep answers short. Every model except the smallest improved.',
      ], blocks: [
        { type: 'table', caption: 'Chain-of-Tables, LLM-as-a-Judge score',
          head: ['Model', 'Without metadata', 'With metadata', 'Δ'],
          rows: [['GPT-4o-mini', '74.12', '80.36', '+6.24'], ['Mistral 7B', '71.55', '73.16', '+1.62'], ['Gemma 3n (4B active)', '67.21', '71.70', '+4.49'], ['Gemma 2B', '65.14', '62.42', '−2.72']] },
        { type: 'table', caption: 'Best set-up per question type, with metadata',
          head: ['Question type', 'Best set-up', 'Score', 'Gain'],
          rows: [['Fact checking', 'GPT-4o-mini · LLM-Table', '95.00', '+0.40'], ['Numerical reasoning', 'GPT-4o-mini · Chain-of-Tables', '86.55', '+10.85'], ['Simple lookup', 'GPT-4o-mini · Chain-of-Tables', '76.77', '+4.17'], ['Data analysis', 'Mistral 7B · Chain-of-Tables', '72.50', '+3.80']] },
      ] },
      { title: 'A 3,000-table labelling campaign', body: [
        'Some metadata cannot be detected automatically: what a table is about, whether it is clean enough for SQL, which questions it can answer. So I set up a human labelling campaign to collect it, which also gives the other table projects at ALTEN a way to monitor their models.',
      ], bullets: [
        '3,000 tables and their question/answer pairs from FeTaQA, SciGen, TableBench, WikiTables and TAT-QA, stored on Azure Blob Storage.',
        '120 Label Studio projects of 25 tables each, created with the Label Studio Python API on a dedicated VM, with a custom HTML/CSS annotation interface and an annotation guide.',
        'Labels: a description, structure (language, merged cells, layout), quality (SQL-ready or not) and the question types each table supports.',
        'Tracking pipelines that pull annotations in real time and report progress per project and per task.',
      ] },
      { title: 'The demonstrator', bullets: [
        'Upload a table and ask questions in natural language, switching between GPT-4o-mini, Mistral and Gemma.',
        'An analytics tab backed by a SQL database: sessions, questions, response time and cost per session.',
        'Like / dislike feedback stored with every answer, as a base for learning from users later.',
        'Tested on ALTEN (2021, 2023, 2024) and Carrefour (2021, 2022) reports: 96% satisfaction, and 100% of misleading questions (worded to bait a hallucination) caught.',
      ] },
      { title: 'What I took from it', body: [
        'The method mattered more than the model size. A 7B open model with the right pipeline came within a few points of GPT-4o-mini, for much less cost and energy. That counts when the reports you analyse are about sustainability.',
        'Next steps I documented: Text-to-SQL for larger tables (with a taxonomy of LLM SQL errors to evaluate it), and multimodal models that turn charts into tables so the same pipeline can read them.',
      ] },
    ],
    gallery: [],
    quote: { text: 'Ali contributed valuable insights and delivered his work with great attention to detail, always showing motivation to go the extra mile.', by: 'Pierpaolo Goffredo, PhD, NLP & LLMs at ALTEN' },
  },
  {
    // case study reachable from Fun
    slug: 'taible',
    title: 'Taible',
    tag: 'Mistral AI Worldwide Hackathon',
    heading: 'Describe a drill. Watch it play out.',
    role: 'Builder',
    timeline: '2026',
    team: [],
    skills: ['LLMs', 'Voice AI', 'Product'],
    media: { src: asset('/media/taible.jpg'), ratio: '1069 / 573' },
    clickable: true,
    ctx: 'ball',
    summary:
      'Taible is a tactical drill builder for football coaches, built over a weekend at the Mistral AI Worldwide Hackathon. You request a setup in plain language and get an animated pitch, with a narrated voiceover.',
    sections: [
      { title: 'How it works', bullets: [
        'Type a request like "build-up from the goalkeeper with back-line circulation" and the pitch animates the drill.',
        'Switch tactical overlays: standard pitch, 18-zone grid, vertical lanes or thirds.',
        'Generate a narration voiceover in the language of your choice (voice by ElevenLabs), then export the video.',
        'Save drills to a personal library of zone-training sessions.',
      ] },
    ],
    gallery: [],
  },
  {
    // case study reachable from Fun
    slug: 'catchball',
    title: 'CatchBall',
    tag: 'Physical AI · RL × world models',
    heading: 'Teaching a humanoid robot to catch',
    role: 'Solo side project',
    timeline: '2026',
    team: [],
    skills: ['Physical AI', 'Reinforcement learning (PPO)', 'World models (TD-MPC2)', 'Computer vision'],
    media: { src: asset('/media/catchball-film.mp4'), type: 'video', ratio: '16 / 9', poster: asset('/media/catchball-poster.jpg'), controls: true },
    cardMedia: { src: asset('/media/catchball-loop.mp4'), type: 'video', ratio: '16 / 9', poster: asset('/media/catchball-poster.jpg') },
    clickable: true,
    summary:
      'My first reinforcement learning × robotics side project: a simulated humanoid learning to catch a ball, first with perfect knowledge of the ball, then with nothing but its own camera, and finally with a world model to plan. The film above covers the whole thing.',
    sections: [
      { title: 'Learning to catch', bullets: [
        '4,096 robots train at the same time in simulation, through five levels: drop, lob, medium, fast and expert.',
        'The reward pays for catching (+50), for holding the ball (+2 per step, +100 per second held) and penalises letting it hit the ground (−10) or falling (−30).',
        'Asymmetric actor-critic PPO: the actor sees what a real robot would (noisy, delayed ball positions, sometimes lost), while the critic sees the exact physics during training only.',
      ] },
      { title: 'Then it cheated', body: ['The first policies found loopholes in the reward instead of really catching: classic reward hacking. Tightening the reward is what made the behaviour honest.'] },
      { title: 'Seeing with its own camera', bullets: [
        'One network going straight from pixels to actions managed 1% on the first try.',
        'So I separated seeing from acting: a CNN ball detector, trained on ~38M simulator images with free labels (no manual annotation), finds 99.2% of visible balls with a 2.0 cm 3D error, and feeds the frozen teacher policy.',
        'Then the student drives and the teacher corrects: the camera-only student learns from the teacher’s corrections.',
      ] },
      { title: 'Results', body: ['Weighted catch rate: teacher 64.9%, camera + detector chain 64.3%, camera-only student v3 59.1% (up from 1.0% for v2). The robot falls less than 1% of the time; the expert level tops out around 20%, with or without vision.'] },
      { title: 'Then a world model to plan', bullets: [
        'TD-MPC2: the robot learns its own simulator. From noisy ball readings and its own body state, it predicts the next latent state and what each future is worth. No images, only vectors.',
        'Dream-MPC plans inside that model at every step: the policy proposes a few action sequences, the world model rolls each one out, the gradient pushes them toward more value, the robot plays the first action and starts over.',
        'The policy learned in the model reaches 58.9% after about 200M steps, for $3.38 of GPU, close to the PPO teacher (64.9%).',
        'Planning on top does not help. With small corrections (at most ±0.01 to ±0.05 per action) the catch rate stays between 58% and 60%; with unbounded planning it drops to 27.5%. The planner exploits the model\'s errors: a shortcut that only exists on the map.',
      ] },
      { title: 'What I learned', bullets: ['The reward is the law.', 'Split seeing from acting.', 'Don\'t trust your model too much.'] },
    ],
    gallery: [],
  },
];

export const workColumns = [
  ['rbfa', 'codmai'],
  ['catchball', 'alten'],
];
export const workOrder = ['rbfa', 'catchball', 'codmai', 'alten'];
export const getProject = (slug) => projects.find((p) => p.slug === slug);

/* ── Fun: side projects, hackathons, football ─────────────── */
export const funFilters = ['all', 'hackathon', 'agents', 'football', 'side project'];

export const funItems = [
  { title: 'Taible', description: 'Describe a drill, watch it play out', tag: 'Mistral AI Worldwide Hackathon',
    categories: ['hackathon', 'football'], src: asset('/media/taible.jpg'), ratio: 1069 / 573, href: '#/work/taible', cursor: 'case-study', ctx: 'ball' },
  { title: 'This portfolio + AliLLM', description: 'This site, and a chatbot that answers questions about me', tag: 'Side project · React, canvas, Mistral',
    categories: ['side project', 'agents'], src: asset('/media/portfolio-alillm.jpg'), ratio: 1440 / 900, cursorText: 'You are looking at it :)' },
  { title: 'Next Radio', description: 'A radio channel run entirely by AI agents', tag: 'Paris AI Hackathon, with Adnane El Yazid',
    categories: ['hackathon', 'agents'], src: asset('/media/next-radio-app.jpg'), ratio: 480 / 872 },
  { title: 'Mbappé sentiment', description: 'How France feels about Mbappé, match by match', tag: 'Sentiment analysis · World Cup 2026',
    categories: ['football', 'side project'], src: asset('/media/mbappe-sentiment.jpg'), ratio: 1280 / 657, ctx: 'ball' },
  { title: 'RL × robotics', description: 'Teaching a humanoid to catch, with RL', tag: 'CatchBall · first robotics side project',
    categories: ['side project'], src: asset('/media/catchball-loop.mp4'), type: 'video', poster: asset('/media/catchball-poster.jpg'), ratio: 16 / 9, href: '#/work/catchball', cursor: 'case-study' },
  { title: 'OpenBootroom, Ep. 1', description: 'Passing networks & shot maps from SkillCorner data', tag: 'Ali Decodes',
    categories: ['football', 'agents'], src: asset('/media/openbootroom-passing-network.jpg'), ratio: 600 / 333, href: '#/work/openbootroom', cursor: 'case-study', ctx: 'ball' },
  { title: 'Huawei Tech Arena', description: 'AI for audio', tag: 'Outstanding Award @ Huawei Tech Arena, Munich',
    categories: ['hackathon'], src: asset('/media/huawei-tech-arena.jpg'), ratio: 788 / 528 },
  { title: 'Airbus Digital Challenge', description: 'NLP for informal aerospace data', tag: 'Winner @ Airbus Digital Challenge',
    categories: ['hackathon'], src: asset('/hackathons/aurbus logo.png'), ratio: 4 / 3, fit: 'contain' },
  { title: 'Ali Decodes', description: 'Football, decoded with AI', tag: 'LinkedIn page',
    categories: ['football'], src: asset('/media/ali-decodes-post.jpg'), ratio: 617 / 510, href: LINKS.aliDecodes, cursor: 'linkedin', ctx: 'ball' },
];

/* ── About ────────────────────────────────────────────────── */
export const roles = [
  { date: 'Now', company: 'Sopra Steria Next', url: 'https://www.soprasteria.com', title: 'AI Engineer, GenAI & agentic systems' },
  { date: '2025', company: 'ALTEN R&D Innovation Lab', url: 'https://www.alten.com', title: 'AI Research Intern, LLMs over tables' },
  { date: '2025', company: 'Royal Belgian Football Association', url: 'https://www.rbfa.be', title: 'AI Research Intern' },
  { date: '2024', company: 'French Health Insurance', title: 'Software Engineer & Team Lead' },
];

export const aboutPhotos = [
  { label: 'Me', photos: [
    { src: profile.portrait, ratio: 1, cursor: "That's me :)", alt: 'Portrait of Ali Anass' },
  ] },
  { label: 'Hackathons', photos: [
    { src: asset('/media/codmai-talent-arena.jpg'), ratio: 1178 / 895, cursor: 'Presenting CodmAI at Talent Arena, Barcelona', alt: 'Presenting CodmAI on stage at Talent Arena' },
    { src: asset('/media/paris-ai-hackathon.jpg'), ratio: 800 / 533, cursor: 'With Adnane at the Paris AI Hackathon', alt: 'Ali and Adnane El Yazid at the Paris AI Hackathon' },
  ] },
  { label: 'Conferences', photos: [
    { src: asset('/media/devoxx-morocco.jpg'), ratio: 800 / 1294, pos: 'center 30%', cursor: 'Devoxx Morocco, with Abdel Sghiouar', alt: 'Ali with Abdel Sghiouar at Devoxx Morocco 2026' },
  ] },
  { label: 'Certified', photos: [
    { src: asset('/media/certifications.jpg'), ratio: 800 / 418, cursor: 'Claude Developer & Associate, AWS AI Practitioner', alt: 'Claude Certified Developer, Claude Certified Associate and AWS Certified AI Practitioner badges' },
  ] },
  { label: 'Stadiums', photos: [
    { src: asset('/media/stadium-metropolitano.jpg'), ratio: 3 / 4, cursor: 'Metropolitano, Madrid', alt: 'Ali at the Metropolitano stadium' },
    { src: asset('/media/stadium-parc-des-princes.jpg'), ratio: 3 / 4, cursor: 'Parc des Princes, Paris', alt: 'Ali at the Parc des Princes' },
    { src: asset('/media/stadium-allianz-arena.jpg'), ratio: 3021 / 3427, cursor: 'Allianz Arena, Munich', alt: 'Ali at the Allianz Arena' },
  ] },
];
