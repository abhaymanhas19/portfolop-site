export type SocialChannel = {
  id: 'github' | 'linkedin' | 'instagram' | 'x'
  label: string
  icon: keyof typeof import('lucide-react')
  url: string
}

export type HeroContent = {
  eyebrow: string
  title: string
  highlight: string
  description: string
  detail: string
  aiSummary: string
  trustBadge: string
  primaryAction: { label: string; to: string }
  secondaryAction: { label: string; to: string }
  backgroundImage: string
  portraitIllustration: string
  codeTiles: Array<{
    id: string
    title: string
    code: string
    accent: string
    delay: number
  }>
  stats: Array<{ label: string; value: string; icon?: keyof typeof import('lucide-react') }>
}

export type SkillCluster = {
  id: 'backend' | 'aiml' | 'devops' | 'pipelines' | 'data-engineering' | 'ai-agents' | 'azure'
  label: string
  icon: keyof typeof import('lucide-react')
  summary: string
  image: string
  accent: string
  tint: string
  skills: Array<{
    name: string
    level: number
    description?: string
    highlight?: string
  }>
}

export type ProjectCase = {
  slug: string
  title: string
  summary: string
  description: string
  tags: string[]
  image: string
  backdrop: string
  demo?: string
  repo?: string
  category: 'AI Platform' | 'Realtime Apps' | 'Automation' | 'Other'
}

export type AchievementBadge = {
  id: string
  title: string
  issuer: string
  year: string
  summary: string
  badgeImage: string
  credentialUrl?: string
  category: 'Backend' | 'AI/ML' | 'Cloud' | 'Problem Solving'
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  summary: string
  achievements: string[]
  link?: string
}

export type ValueStatement = {
  title: string
  description: string
}

export type GalleryHighlight = {
  name: string
  tagline: string
  image: string
  highlight: string
  cta: string
}

export type GalleryImage = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  title?: string
  location?: string
  capturedAt?: string
  description?: string
}

export type Capability = {
  id: string
  title: string
  description: string
  bullets?: string[]
  icon: keyof typeof import('lucide-react')
  category: string
}

export const content = {
  branding: {
    name: 'Abhay Manhas',
    role: 'Full-Stack Developer & AI Engineer',
    tagline: 'Building AI-first backends with Python, RAG, and realtime systems.',
    location: 'Pathankot, Punjab, India',
    contactEmail: 'abhayramgarhia19@outlook.com',
    resumePath: '/resume.pdf',
    avatar: '/hero-abhay.svg',
  },
  socials: [
    { id: 'github', label: 'GitHub', icon: 'Github', url: 'https://github.com/abhaymanhas19' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/abhaymanhas19' },
    { id: 'instagram', label: 'Instagram', icon: 'Instagram', url: 'https://www.instagram.com/abhaymanhas19' },
    { id: 'x', label: 'X', icon: 'Twitter', url: 'https://x.com/abhaymanhas_19' },
  ] satisfies SocialChannel[],
  hero: {
    eyebrow: 'Available to Work',
    title: 'Transform Your Ideas into AI-Powered Solutions',
    highlight: 'Python & AI/ML Engineer',
    description:
      'As a Python & AI/ML expert, I build scalable web apps, intelligent models, and automation tools that drive growth.',
    detail: "From custom ML algorithms to full-stack deployments, let's turn your vision into reality.",
    aiSummary: 'Partner with an engineer who blends ML strategy, backend architecture, and automation to ship results.',
    trustBadge: 'Python | PyTorch | Django',
    primaryAction: { label: 'Get a Free Project Quote', to: '/#contact' },
    secondaryAction: { label: 'What I Can Offer', to: '/what-i-can-build' },
    backgroundImage: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760205991/Firefly_A_clean_glossy_3D_object_in_shape_of_a_speech_bubble_in_soft_white_material_minimal_162578_hm8yka.jpg',
    portraitIllustration: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760182542/DALL_E_2025-10-11_02.11.56_-_A_digital_avatar_of_a_young_full-stack_developer_and_AI_engineer_with_short_wavy_dark_brown_hair_and_black-rimmed_glasses._He_is_sitting_at_a_desk_us_j8bzeu.webp',
    codeTiles: [
      {
        id: 'tasks',
        title: 'worker.ts',
        code: `queue.process("sync", async job => {\n  await orchestrate(job.data)\n  return ctx.emit("synced")\n})`,
        accent: 'from-violet-100/80 via-blue-200/60 to-white/40',
        delay: 0.85,
      },
      {
        id: 'realtime-stream',
        title: 'stream.py',
        code: `@router.websocket("/events")\nasync def stream(ws):\n    await ws.accept()\n    async for payload in broker.subscribe("updates"):\n        await ws.send_json(payload)`,
        accent: 'from-[#8ED9FF]/50 via-[#C7B2FF]/35 to-white/35',
        delay: 0.4,
      },
      {
        id: 'rag-service',
        title: 'rag.py',
        code: `answer = rag.generate(\n  query,\n  rerank=True,\n  stream=True,\n  guardrails=True,\n)`,
        accent: 'from-teal-100/80 via-emerald-200/60 to-white/40',
        delay: 0.55,
      },
      {
        id: 'metrics',
        title: 'observability.yaml',
        code: `latency_budget: 120ms\nrealtime_feed: 99.9\nerror_budget: 0.1\nreporting: grafana`,
        accent: 'from-[#8ED9FF]/55 via-[#C7B2FF]/35 to-[#FFD1B3]/45',
        delay: 0.7,
      },
    ],
    stats: [
      { label: 'Years Experience', value: '4+', icon: 'BriefcaseBusiness' },
      { label: 'Clients Served', value: '10+', icon: 'UsersRound' },
      { label: 'Companies Partnered', value: '3+', icon: 'Building2' },
    ],
  } satisfies HeroContent,
  home: {
    heroBackground: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    skillBackground: 'https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1600&q=80',
    projectBackground: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    achievementsBackground: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    aboutBackground: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760285796/Firefly_extreme_close_up_of_a_digital_computer_futuristic_human_eye_detailed_pupil_laser_o_73970_i4rp8d.jpg',
    contactBackground: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    galleryBackground: 'https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?auto=format&fit=crop&w=1600&q=80',
  },
  skills: {
    categories: [
      {
        id: 'backend',
        label: 'Backend Engineering',
        icon: 'ServerCog',
        summary: 'Event-driven Python services with robust APIs, websockets, and background workers that stay performant under load.',
        image: '',
        accent: 'from-[#8ED9FF] via-[#C7B2FF] to-[#FFD1B3]/80',
        tint: 'bg-cyan-500/10',
        skills: [
          { name: 'Python', level: 95, highlight: 'AsyncIO, typing, profiling' },
          { name: 'Django + DRF', level: 92, highlight: 'Schema-first APIs, multi-tenant auth' },
          { name: 'Django Channels', level: 88, highlight: 'Realtime dashboards & collab suites' },
          { name: 'Asynchronous Programming', level: 90, highlight: 'AsyncIO' },
          { name: 'Celery', level: 90, highlight: 'Task orchestration & monitoring' },
          { name: 'PostgreSQL', level: 86, highlight: 'Query tuning & migration strategy' },
          { name: 'NumPy', level: 82, highlight: 'Numerical computing & vectorization' },
          { name: 'Pandas', level: 84, highlight: 'Data wrangling & analytics' },
        ],
      },
      {
        id: 'aiml',
        label: 'AI & ML Systems',
        icon: 'BrainCircuit',
        summary: 'Applied ML stacks that pair evaluation harnesses with resilient serving for copilots, chatbots, and document intelligence.',
        image: '',
        accent: 'from-emerald-100 via-teal-100 to-white',
        tint: 'bg-teal-500/10',
        skills: [
          { name: 'PyTorch + Scikit-Learn', level: 82, highlight: 'Modeling, training loops, pipelines' },
          { name: 'Hugging Face', level: 80, highlight: 'Model hub & inference tooling' },
          { name: 'Transformers', level: 84, highlight: 'Attention models & fine-tuning' },
          { name: 'Linear Regression', level: 78, highlight: 'Baseline modeling & explainability' },
          { name: 'Classification', level: 80, highlight: 'Supervised learning & metrics' },
          { name: 'Model Training', level: 85, highlight: 'Forward pass, loss, backprop, optimizers' },
          { name: 'RAG Pipelines', level: 91, highlight: 'Hybrid search, reranking, evaluation' },
          { name: 'MCP Servers', level: 91, highlight: 'Actions using LLM' },
          { name: 'LLM APIs (OpenAI, Azure, Gemini)', level: 89, highlight: 'Cost-aware orchestration' },
          { name: 'AI Unified Platforms (OpenRouter, LangChain)', level: 84, highlight: 'Tooling & guardrails' },
          { name: 'Model Evaluation', level: 88, highlight: 'Offline + automated reporting' },
          { name: 'Azure OpenAI', level: 88, highlight: 'Model deployment & safety' },
        ],
      },
      {
        id: 'devops',
        label: 'Cloud & DevOps',
        icon: 'Cloud',
        summary: 'Container-native platforms with observability baked in so releases stay repeatable and rollbacks become rare.',
        image: '',
        accent: 'from-sky-100 via-blue-100 to-white',
        tint: 'bg-blue-500/10',
        skills: [
          { name: 'AWS, AZURE, GCP', level: 90, highlight: 'Hosting servers' },
          { name: 'Docker & Compose', level: 90, highlight: 'Local parity & developer experience' },
          { name: 'Kubernetes (Azure Kubernetes Service)', level: 84, highlight: 'Scalable workloads & GitOps' },
          { name: 'Git, GitHub, Azure DevOps', level: 88, highlight: 'Version control systems' },
          { name: 'CI/CD Pipelines (GitHub Actions, Jenkins)', level: 88, highlight: 'Build, test, and release automation' },
          
        ],
      },
      {
        id: 'pipelines',
        label: 'Agentic Automation Workflow',
        icon: 'Workflow',
        summary: 'LLM-driven automations that connect tools, trigger actions, and streamline ops without heavy code.',
        image: '',
        accent: 'from-[#8ED9FF] via-[#C7B2FF] to-[#FFD1B3]',
        tint: 'bg-indigo-500/10',
        skills: [
          { name: 'Zapier', level: 80, highlight: 'No-code workflow automation' },
          { name: 'n8n', level: 80, highlight: 'Self-hosted automation builder' },
          { name: 'ChatGPT Agentic Builder', level: 82, highlight: 'LLM agent workflows' },
          
          
        ],
      },
      {
        id: 'data-engineering',
        label: 'Data Engineering & Monitoring',
        icon: 'Layers',
        summary: 'Queue-backed data infrastructure with storage, observability, and reliability signals that keep pipelines healthy.',
        image: '',
        accent: 'from-amber-100 via-orange-100 to-white',
        tint: 'bg-amber-500/10',
        skills: [
          { name: 'Redis', level: 84, highlight: 'Caching & ephemeral data' },
          { name: 'RabbitMQ', level: 82, highlight: 'Queue routing & delivery' },
          { name: 'Azure Blob Storage', level: 80, highlight: 'Object storage & archives' },
          { name: 'Message Queues', level: 82, highlight: 'Backpressure & async processing' },
          { name: 'Flower', level: 78, highlight: 'Celery monitoring & alerts' },
        ],
      },
      {
        id: 'ai-agents',
        label: 'AI Agents',
        icon: 'Cpu',
        summary: 'Tool-using agent orchestration for autonomous workflows and multi-step reasoning tasks.',
        image: '',
        accent: 'from-slate-100 via-sky-100 to-white',
        tint: 'bg-slate-500/10',
        skills: [
          { name: 'CrewAI', level: 80, highlight: 'Multi-agent coordination' },
          { name: 'OpenAI Agents SDK', level: 82, highlight: 'Tooling, planning, and execution' },
        ],
      },
    ] satisfies SkillCluster[],
  },
  projects: {
    featured: [
      {
        slug: 'ailyze-qualitative-insights',
        title: 'AILYZE — Qualitative Analysis Copilot',
        summary: 'Multi-agent interviewer and document insight lab supporting 20+ languages.',
        description:
          'AILYZE is an online qualitative analysis platform with an avatar interviewer that autonomously conducts interviews in 20+ languages while the advanced analysis workspace ingests docx/pdf/xlsx/csv research artefacts. The system generates thematic, content, and frequency studies, cross-segment analysis, and stakeholder-ready summaries in minutes.',
        tags: ['Python', 'Django', 'Celery', 'WebSockets', 'Azure OpenAI', 'PostgreSQL'],
        image: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1758566179/ailyze_spnxi7.png',
        backdrop: '',
        demo: 'https://www.ailyze.com',
        category: 'AI Platform',
      },
      {
        slug: 'chds-food-service',
        title: 'CHDS — Healthy Meal Ordering',
        summary: 'End-to-end ordering with subscription nutrition plans and Stripe billing.',
        description:
          'CHDS.com.au provides fresh, balanced meals across rotating menus. Customers browse curated plans, personalise dietary choices, and checkout via Stripe. The admin workspace supports menu scheduling, live order tracking, and nutrition tagging to keep the experience reliable for both chefs and customers.',
        tags: ['Python', 'Django', 'Stripe', 'Redis'],
        image: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1758565860/Screenshot_from_2025-09-23_00-00-44_yhk2hv.png',
        backdrop: '',
        demo: 'https://chds.com.au',
        category: 'Realtime Apps',
      },
      {
        slug: 'document-rag-chatbot',
        title: 'Document Reader RAG Chatbot',
        summary: 'Secure document-to-answer assistant with hybrid retrieval and audit logging.',
        description:
          'Production-grade DRF backend for retrieval-augmented generation. Semantic chunking, hybrid vector/BM25 search, re-ranking, and context windows optimised for factuality. Includes user auth, roles, and audit logs. Handles docx, pdf, and xlsx sources with streaming responses.',
        tags: ['Python', 'RAG', 'Server-Sent Events', 'PostgreSQL', 'Azure OpenAI'],
        image: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1758566203/Chatbot_vdriyv.png',
        backdrop: '',
        demo: 'https://ailyze.com/ai-chatbot',
        category: 'AI Platform',
      },
    ] satisfies ProjectCase[],
  },
  achievements: {
    certifications: [
      {
        id: 'pytorch',
        title: 'Completed 25-hour PyTorch Deep Learning Course',
        issuer: '(YouTube, [Daniel Bourke], [Nov 2025])',
        year: '2025',
        summary: 'Gained hands-on proficiency in tensors, neural networks, backpropagation, optimizers (Adam, Gradient Descent), loss functions, and model training/deployment',
        badgeImage: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219373/PyTorch-Contributor-Awards-2025_uaawnr.avif',
        credentialUrl: 'https://youtu.be/Z_ikDlimN6A?si=ugrMN4nTCptH5SR1',
        category: 'AI/ML',
      },
      {
        id: 'crewai',
        title: 'CrewAI Certified',
        issuer: 'CrewAI',
        year: '2025',
        summary: 'Operational playbooks for multi-agent AI architectures with context-aware routing.',
        badgeImage: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219628/AutoGPT-vs-AgentGPT-Which-AI-Agent-Builder-is-Best-in-2025--31-_m5gcbs.png',
        credentialUrl: 'https://shorturl.at/tKln2',
        category: 'AI/ML',
      },
      {
        id: 'python-hackerrank',
        title: 'Python Certified',
        issuer: 'HackerRank',
        year: '2022',
        summary: 'Validated advanced Python knowledge with focus on performance and clean design.',
        badgeImage: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219741/1711003166802_bmbwxr.jpg',
        credentialUrl: 'https://shorturl.at/xSlfD',
        category: 'Backend',
      },
      {
        id: 'kcna',
        title: 'KCNA — Kubernetes & Cloud Native Associate',
        issuer: 'Cloud Native Computing Foundation',
        year: '2024',
        summary: 'Core Kubernetes concepts, observability, and security fundamentals for cloud-native delivery.',
        badgeImage: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219779/download_afjvdg.png',
        credentialUrl: 'https://www.cncf.io/training/certification/kcna/',
        category: 'Cloud',
      },
      {
        id: 'problem-solving',
        title: 'Problem Solving Certified-Basic',
        issuer: 'HackerRank',
        year: '2021',
        summary: 'Rigorous algorithmic problem solving with focus on optimisation and clean implementation.',
        badgeImage: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219877/images_iknxyz.jpg',
        credentialUrl: 'https://shorturl.at/9SQfY',
        category: 'Problem Solving',
      },
      {
        id: 'problem-solving',
        title: 'Problem Solving Certified-Medium',
        issuer: 'HackerRank',
        year: '2021',
        summary: 'Rigorous algorithmic problem solving with focus on optimisation and clean implementation.',
        badgeImage: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219877/images_iknxyz.jpg',
        credentialUrl: 'https://shorturl.at/BVIEg',
        category: 'Problem Solving',
      },
    ] satisfies AchievementBadge[],
  },
  about: {
    headline: 'Python engineer delivering AI platforms that hold up in production',
    intro:
      'I translate fuzzy ideas into reliable AI-driven products—pairing pragmatic Python craftsmanship with evaluation-driven delivery so features make it to prod and stay there.',
    heroImage: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760285796/Firefly_extreme_close_up_of_a_digital_computer_futuristic_human_eye_detailed_pupil_laser_o_73970_i4rp8d.jpg',
    profile : {
      "tag" : "Profile Summary",
      "heading":  "My Go-To Python &amp; AI/ML Engineer",
      "summary": "Hi, I'm Abhay Manhas, a seasoned Python developer specializing in Python & AI/ML.With a background in Python platforms and bootstrapped AI startups, I help businesses automate processes, predict trends, and launch user-friendly web applications and helping to integrate the AI into their business.",
      "ending":" What sets me apart? Hands-on expertise across the Python ecosystem (Django and Flask for web, plus Scikit-learn and PyTorch for ML) paired with a results-driven mindset. Clients see outcomes like 30% faster insights or 2x user engagement. Ready to collaborate?"
    },
    tiles: [
      {
        title: 'Applied AI systems',
        description:
          'Retrieval augmented generation, Model Context Protocol, evaluation harnesses, and guardrails that keep LLM features grounded in business outcomes.',
      },
      {
        title: 'Resilient backends',
        description:
          'Async Django architectures, realtime messaging, and background pipelines that scale without surprises.',
      },
      {
        title: 'Cloud + operations',
        description:
          'Azure, Kubernetes, and observability stacks tuned for fast feedback loops and hands-off reliability.',
      },
      {
        title: 'Automation Workflows',
        description:
          'Performing actions, combining agents, reduce human intervention',
      },
    ],
    experience: [
      {
        role: 'Lead Python / AI Engineer',
        company: 'Freelance & Consulting',
        period: '2022 — Present',
        summary:
          'Partner with product leaders to ship AI-enabled platforms end-to-end, from discovery to production rollouts.',
        achievements: [
          'Designed a hybrid-cloud LLM gateway that trimmed cost per request by 35% while maintaining latency SLOs.',
          'Implemented a RAG service with semantic chunking, re-ranking, and automated evaluation reports for stakeholders.',
          "Trained basic neural networks to build prediction models for regression and classification tasks",
          'Built distributed Celery pipelines and WebSocket dashboards keeping ops teams informed in real time.',
        ],
        link: 'https://www.upwork.com/freelancers/~0109aadeddb63e7a39?mp_source=share',
      },
      {
        role: 'Senior Backend Engineer',
        company: 'Shubpy Solution Pvt. Ltd.',
        period: '2023 — Present',
        summary:
          'Led Python squads modernising legacy systems with event-driven patterns and cloud-native deployments.',
        achievements: [
          'Introduced observability instrumentation that reduced mean time to detect incidents by 45%.',
          'Migrated monolith workloads to Kubernetes with zero downtime releases.',
          "Handled project and team management, led development, and delivered efficient results within deadlines.",
          'Mentored engineers on code architecture,  async workflows, testing strategy, and AI feature integration.',
        ],
        link: 'https://shubpy.com/',
      },
      {
        role: 'Junior Backend Engineer',
        company: 'CNT Technologies',
        period: '2022 — 2023',
        summary: 'Learned and implemented Python standards to build seamless web experiences.',
        achievements: [
          'Built realtime chat application with Django, WebSockets, and async patterns.',
          'Utilised multithreading and multiprocessing to trim response latency.',
          "Mastered Python by solving a wide range of coding problems."
        ],
        link: 'https://www.cnttech.org/',
      },
    ] satisfies ExperienceItem[],
    values: [
      {
        title: 'Measure, then optimise',
        description: 'Anchor decisions in metrics—latency, accuracy, adoption—so teams debate facts, not guesses.',
      },
      {
        title: 'Ship responsibly',
        description: 'Guardrails, evaluations, and clear user messaging underpin every AI feature delivered.',
      },
      {
        title: 'Collaborate in the open',
        description: 'Async updates, transparent roadmaps, and tight feedback loops keep teams aligned.',
      },
    ] satisfies ValueStatement[],
  },
  contact: {
    title: 'Let’s build something reliable together',
    subtitle:
      'Whether you need to retrofit AI features into an existing product or launch a greenfield realtime platform, I can help map the path and ship the build.',
    backgroundImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    form: {
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Work email',
      messagePlaceholder: 'Project goals, timelines, or anything helpful…',
      submitText: 'Send message',
    },
  },
  gallery: {
    profile: {
      name: 'Abhay Manhas',
      tagline: 'Small snapshots from the life behind the commits.',
      image: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1758565569/display_aivyvw.png',
      highlight: 'Work off energy with technical pictures, encourage in-depth exploration',
      cta: 'View Technical Gallery',
    } satisfies GalleryHighlight,
    images: [
      {
        id: 'mountain-trail',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692120/Deep_Learning_Architecture_Diagram__by_ProjectPro_lw6ox6.webp',
        alt: 'Standing at the ridge watching sunrise spill over the hills',
        title: "Neuron's Communication",
        width: 1200,
        height: 1200,
        location: 'Digital world.',
        capturedAt: 'October 2024',
        description: 'Deep Learning.',
      },
      {
        id: 'city-evening',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692121/1719922267958_urkgga.gif',
        alt: 'Leaning on a railing overlooking city lights after dusk',
        title: 'Flow Chart',
        width: 1200,
        height: 900,
        location: 'Ai Classification',
        capturedAt: 'June 2024',
        description: 'Types of Learning and Networks',
      },
      {
        id: 'coffee-break',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692120/how-to-visualize-machine-learning-models-4_cmtmar.webp',
        alt: 'Pouring latte art in a sunlit kitchen nook',
        title: 'Transformer Explanation',
        width: 1200,
        height: 1500,
        location: 'online',
        capturedAt: 'January 2025',
        description: "Want to know what's under the hood?"
      },
      {
        id: 'book-lounge',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692120/iclh-diagram-batch-01-03-deepneuralnetwork_f3xu75.png',
        alt: 'Relaxing with a favourite book and headphones beside a window',
        title: 'Layer Architecture',
        width: 1200,
        height: 1500,
        location: 'Deep Learning',
        capturedAt: 'August 2024',
        description: 'A multi-step communication process between the input layer and the output layer',
      },
      {
        id: 'friends-laugh',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692120/1721922369347_bgg4hq.jpg',
        alt: 'Laughing with close friends over street food',
        title: 'Machine leaning',
        width: 1200,
        height: 900,
        location: 'AI&Ml',
        capturedAt: 'April 2024',
        description: 'Guide to getting started',
      },
      {
        id: 'cycle-trail',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692119/seo-hero-machine-learning-vs-ai_kls4c0_fhxeed.webp',
        alt: 'Taking a break beside the cycle on a forest trail',
        title: 'Era of AI',
        width: 1200,
        height: 1500,
        location: 'Tech',
        capturedAt: 'February 2025',
        description: 'World with AI systems.',
      },
    ] satisfies GalleryImage[],
  },
  logoLoop: {
    items: [
      { label: 'Python', acronym: 'Py', background: '#E0F7F9', foreground: '#0C3A49', accent: '#0FB6C4', url: 'https://www.python.org/' },
      { label: 'Django', acronym: 'Dj', background: '#E6F2EE', foreground: '#133C3B', accent: '#0FA3B1', url: 'https://www.djangoproject.com/' },
      { label: 'DRF', acronym: 'DR', background: '#E7F1FF', foreground: '#12305B', accent: '#3E8AF0', url: 'https://www.django-rest-framework.org/' },
      { label: 'FastAPI', acronym: 'FA', background: '#E4FBF6', foreground: '#04515D', accent: '#12B5A1', url: 'https://fastapi.tiangolo.com/' },
      { label: 'Azure', acronym: 'Az', background: '#E6F0FF', foreground: '#0E2A5C', accent: '#377DFF', url: 'https://azure.microsoft.com/' },
      { label: 'Kubernetes', acronym: 'Kb', background: '#E3EEFF', foreground: '#103063', accent: '#5F7BFF', url: 'https://kubernetes.io/' },
      { label: 'Redis', acronym: 'Re', background: '#FFEAE6', foreground: '#7A231A', accent: '#FF715B', url: 'https://redis.io/' },
      { label: 'PostgreSQL', acronym: 'Pg', background: '#E3EEF8', foreground: '#112E4C', accent: '#407BFF', url: 'https://www.postgresql.org/' },
      { label: 'OpenAI', acronym: 'AI', background: '#F3F1FF', foreground: '#2C2160', accent: '#7B6DFF', url: 'https://openai.com/' },
    ],
  },
  capabilities: [
    {
      id: 'python-core-engineering',
      title: 'Skilled in delivering professional services',
      description:
        'Expert in building and deploying production-grade backend and AI systems, with a focus on reliability, scalability, and business impact.',
      category: 'Backend',
      bullets: [
        "Production-ready web applications and high-performance APIs.",
        'Multilingual voice assistants, transcription, and enterprise Q&A chatbots grounded in proprietary data.',
        'Custom RAG systems, MCP servers, and seamless integration of AI into existing workflows.',
        "End-to-end model training, evaluation, and deployment using modern ML stacks",
        "Containerization (Docker) and orchestration (Kubernetes) for robust, scalable services.",
        "Server management, background processing, workflow automation, and image processing with CNNs",
        "Custom scripts and automation to streamline operations and reduce manual effort.",
      ],
      icon: 'Globe',
    },
  ] satisfies Capability[],
} as const

export type SiteContent = typeof content

export const site = content.branding
export const socials = content.socials
export const heroContent = content.hero
export const skillClusters = content.skills.categories
export const projectCases = content.projects.featured
export const certificationBadges = content.achievements.certifications
export const aboutContent = content.about
export const contactContent = content.contact
export const galleryContent = content.gallery
export const logoLoopContent = content.logoLoop
export const capabilitiesContent = content.capabilities
export const homeContent = content.home
