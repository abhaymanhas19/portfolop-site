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
  id: 'backend' | 'aiml' | 'devops' | 'pipelines' | 'serverless' | 'azure'
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
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
        accent: 'from-[#8ED9FF] via-[#C7B2FF] to-[#FFD1B3]/80',
        tint: 'bg-cyan-500/10',
        skills: [
          { name: 'Python', level: 95, highlight: 'AsyncIO, typing, profiling' },
          { name: 'Django + DRF', level: 92, highlight: 'Schema-first APIs, multi-tenant auth' },
          { name: 'Django Channels', level: 88, highlight: 'Realtime dashboards & collab suites' },
          { name: 'Asynchronous Programming', level: 90, highlight: 'Asycnio' },
          { name: 'Celery & Redis & RabbitMQ', level: 90, highlight: 'Task orchestration & monitoring' },
          { name: 'PostgreSQL', level: 86, highlight: 'Query tuning & migration strategy' },
        ],
      },
      {
        id: 'aiml',
        label: 'AI & ML Systems',
        icon: 'BrainCircuit',
        summary: 'Applied ML stacks that pair evaluation harnesses with resilient serving for copilots, chatbots, and document intelligence.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        accent: 'from-emerald-100 via-teal-100 to-white',
        tint: 'bg-teal-500/10',
        skills: [
          { name: 'PyTorch', level: 82, highlight: 'Fine-tuning & experimentation' },
          { name: 'Scikit Learn', level: 75, highlight: 'Fine-tuning & experimentation' },
          { name: 'RAG Pipelines', level: 91, highlight: 'Hybrid search, reranking, evaluation' },
          { name: 'LLM APIs (OpenAI, Azure, Gemini)', level: 89, highlight: 'Cost-aware orchestration' },
          { name: 'AI Unified Platforms (openrouter , langchain)', level: 84, highlight: 'Tooling & guardrails' },
          { name: 'Model Evaluation', level: 88, highlight: 'Offline + automated reporting' },
        ],
      },
      {
        id: 'devops',
        label: 'Cloud & DevOps',
        icon: 'Cloud',
        summary: 'Container-native platforms with observability baked in so releases stay repeatable and rollbacks become rare.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        accent: 'from-sky-100 via-blue-100 to-white',
        tint: 'bg-blue-500/10',
        skills: [
          { name: 'Docker & Compose', level: 90, highlight: 'Local parity & developer experience' },
          { name: 'Kubernetes (AKS)', level: 84, highlight: 'Scalable workloads & GitOps' },
          { name: 'GitHub + Azure DevOps', level: 88, highlight: 'CI/CD pipelines & environments' },
          { name: 'Prometheus & Grafana', level: 80, highlight: 'Dashboards, tracing, alert fatigue fixes' },
        ],
      },
      {
        id: 'serverless',
        label: 'Serverless Computing',
        icon: 'Cpu',
        summary: 'Lean functions for bursty workloads, bridging LLM APIs and core services without over-provisioning.',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
        accent: 'from-amber-100 via-orange-100 to-white',
        tint: 'bg-amber-500/10',
        skills: [
          { name: 'Azure Functions', level: 85, highlight: 'Event triggers & bindings' },
          { name: 'AWS Lambda', level: 76, highlight: 'Python runtimes & Powertools' },
          { name: 'Cloudflare Workers', level: 70, highlight: 'Edge inference & caching' },
        ],
      },
      {
        id: 'azure',
        label: 'Azure Ecosystem',
        icon: 'Layers',
        summary: 'Azure-first architectures spanning compute, messaging, storage, and AI tooling.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        accent: 'from-blue-100 via-cyan-100 to-white',
        tint: 'bg-cyan-500/10',
        skills: [
          { name: 'Azure Kubernetes Service', level: 84, highlight: 'Cluster ops & scaling' },
          { name: 'Azure OpenAI', level: 88, highlight: 'Model deployment & safety' },
          { name: 'Azure Storage & CosmosDB', level: 78, highlight: 'Multi-region data' },
          { name: 'Azure Monitor', level: 82, highlight: 'Dashboards & Log Analytics' },
        ],
      },
      {
        id: 'pipelines',
        label: 'Processing Pipelines',
        icon: 'Workflow',
        summary: 'Data ingestion and transformation pipelines feeding realtime analytics and training workflows.',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
        accent: 'from-[#8ED9FF] via-[#C7B2FF] to-[#FFD1B3]',
        tint: 'bg-indigo-500/10',
        skills: [
          { name: 'ETL (Pandas, Dask)', level: 86, highlight: 'Large dataset wrangling' },
          { name: 'Streaming (Kafka, RabbitMQ)', level: 80, highlight: 'Event-driven insights' },
          { name: 'Data Quality Checks', level: 82, highlight: 'Great Expectations / custom tools' },
          { name: 'Workflow Orchestration', level: 78, highlight: 'Celery, Temporal patterns' },
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
        backdrop: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
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
        backdrop: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
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
        backdrop: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80',
        demo: 'https://ailyze.com/ai-chatbot',
        category: 'AI Platform',
      },
    ] satisfies ProjectCase[],
  },
  achievements: {
    certifications: [
      {
        id: 'crewai',
        title: 'CrewAI Certified',
        issuer: 'CrewAI',
        year: '2025',
        summary: 'Operational playbooks for multi-agent AI architectures with context-aware routing.',
        badgeImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        credentialUrl: 'https://shorturl.at/tKln2',
        category: 'AI/ML',
      },
      {
        id: 'python-hackerrank',
        title: 'Python Certified',
        issuer: 'HackerRank',
        year: '2022',
        summary: 'Validated advanced Python knowledge with focus on performance and clean design.',
        badgeImage: 'https://images.unsplash.com/photo-1584697964194-2514c0dba0b7?auto=format&fit=crop&w=1200&q=80',
        credentialUrl: 'https://shorturl.at/xSlfD',
        category: 'Backend',
      },
      {
        id: 'kcna',
        title: 'KCNA — Kubernetes & Cloud Native Associate',
        issuer: 'Cloud Native Computing Foundation',
        year: '2024',
        summary: 'Core Kubernetes concepts, observability, and security fundamentals for cloud-native delivery.',
        badgeImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        credentialUrl: 'https://www.cncf.io/training/certification/kcna/',
        category: 'Cloud',
      },
      {
        id: 'problem-solving',
        title: 'Problem Solving Certified-Basic',
        issuer: 'HackerRank',
        year: '2021',
        summary: 'Rigorous algorithmic problem solving with focus on optimisation and clean implementation.',
        badgeImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        credentialUrl: 'https://shorturl.at/9SQfY',
        category: 'Problem Solving',
      },
      {
        id: 'problem-solving',
        title: 'Problem Solving Certified-Medium',
        issuer: 'HackerRank',
        year: '2021',
        summary: 'Rigorous algorithmic problem solving with focus on optimisation and clean implementation.',
        badgeImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
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
    tiles: [
      {
        title: 'Applied AI systems',
        description:
          'Retrieval augmented generation, evaluation harnesses, and guardrails that keep LLM features grounded in business outcomes.',
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
          'Mentored engineers on async workflows, testing strategy, and AI feature integration.',
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
      highlight: 'Weekend hikes, sunrise coffee rituals, and candid moments with the people who keep me grounded.',
      cta: 'View Image Gallery',
    } satisfies GalleryHighlight,
    images: [
      {
        id: 'mountain-trail',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760293028/generated-image_zqbcum.png',
        alt: 'Standing at the ridge watching sunrise spill over the hills',
        title: 'First Light',
        width: 1200,
        height: 1200,
        location: 'Digital world.',
        capturedAt: 'October 2024',
        description: 'Deep Learning.',
      },
      {
        id: 'city-evening',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760293020/download_4_enpbfz.jpg',
        alt: 'Leaning on a railing overlooking city lights after dusk',
        title: 'Golden Hour Rewind',
        width: 1200,
        height: 900,
        location: 'Chandigarh',
        capturedAt: 'June 2024',
        description: 'Cooling down after a run—with the playlist still in my ears and the skyline glowing.',
      },
      {
        id: 'coffee-break',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760293018/download_5_gqzwrd.jpg',
        alt: 'Pouring latte art in a sunlit kitchen nook',
        title: 'Sunday Ritual',
        width: 1200,
        height: 1500,
        location: 'Home base',
        capturedAt: 'January 2025',
        description: 'Code with nature.',
      },
      {
        id: 'book-lounge',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760285796/Firefly_extreme_close_up_of_a_digital_computer_futuristic_human_eye_detailed_pupil_laser_o_73970_i4rp8d.jpg',
        alt: 'Relaxing with a favourite book and headphones beside a window',
        title: 'Quiet Chapters',
        width: 1200,
        height: 1500,
        location: 'Home library',
        capturedAt: 'August 2024',
        description: 'Digital computer futuristic  human eye, detailed pupil laser,.',
      },
      {
        id: 'friends-laugh',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760293020/download_2_tsicr5.jpg',
        alt: 'Laughing with close friends over street food',
        title: 'Laugh Lines',
        width: 1200,
        height: 900,
        location: 'Sector 17, Chandigarh',
        capturedAt: 'April 2024',
        description: 'Era of AI.',
      },
      {
        id: 'cycle-trail',
        src: 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1760293020/download_1_jvbjzt.jpg',
        alt: 'Taking a break beside the cycle on a forest trail',
        title: 'Trail Pause',
        width: 1200,
        height: 1500,
        location: 'Siswan Forest',
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
      title: 'Core Python Engineering & Automation',
      description:
        'Designing and optimising foundational Python scripts and data services for robust, efficient system operations—essential for ETL and MLOps readiness.',
      category: 'Backend',
      bullets: [
        'Advanced data ETL pipelines using Pandas and Dask.',
        'Automated system monitoring and health-check scripts.',
        'Bespoke web scraping and data extraction tooling.',
        'Utility CLI tools and modular libraries in Python.',
      ],
      icon: 'Globe',
    },
    {
      id: 'production-apis',
      title: 'Production-Grade APIs & Web Services',
      description:
        'Building scalable, high-availability web applications and microservices using Django and DRF to serve models, process large data volumes, and ship complex functionality.',
      category: 'Backend',
      bullets: [
        'Scalable DRF REST APIs for model serving and realtime inference.',
        'End-to-end LLM interfaces for content and code generation.',
        'Image processing applications leveraging CNN models.',
        'Custom ecommerce and analytics dashboards.',
      ],
      icon: 'Globe',
    },
    {
      id: 'generative-copilots',
      title: 'Generative AI & Conversational Agents',
      description:
        'Deploying intelligent LLM-backed systems for realtime customer engagement, knowledge retrieval, and automating human-in-the-loop workflows across languages.',
      category: 'AI/ML',
      bullets: [
        'Custom retrieval-augmented generation (RAG) systems.',
        'Multilingual voice assistants and transcription features.',
        'Enterprise Q&A chatbots grounded in proprietary data.',
        'Proactive, context-aware virtual assistants.',
      ],
      icon: 'MessageSquare',
    },
    {
      id: 'scalable-architecture',
      title: 'Scalable Architecture & Deployments',
      description:
        'Engineering resilient backend systems by integrating queues, caching, and serverless workloads to ensure high availability for machine learning services.',
      category: 'Cloud',
      bullets: [
        'Distributed asynchronous task queues with Celery/RabbitMQ/Redis.',
        'Serverless Python services via Azure Functions and AWS Lambda.',
        'Caching strategies with Redis for low-latency APIs.',
        'Containerisation (Docker) and orchestration (Kubernetes).',
      ],
      icon: 'Globe',
    },
    {
      id: 'predictive-analytics',
      title: 'Predictive Analytics & Anomaly Detection',
      description:
        'Creating data science pipelines for forecasting, risk scoring, and anomaly detection that drive strategic decisions and operational efficiency.',
      category: 'AI/ML',
      bullets: [
        'Financial time-series forecasting models.',
        'Automated trend-detection and early-warning systems.',
        'Advanced classification and clustering for segmentation.',
        'Survey and interview analysis for rapid insights.',
      ],
      icon: 'LineChart',
    },
    {
      id: 'experience-optimisation',
      title: 'Personalisation & Experience Optimisation',
      description:
        'Developing recommendation engines, dynamic pricing, and secure transaction workflows to boost engagement while reducing risk.',
      category: 'Product Growth',
      bullets: [
        'Collaborative filtering recommendation systems.',
        'ML-driven fraud and risk checks.',
        'Dynamic booking and scheduling optimisation.',
        'Customer lifetime value (CLV) predictive modelling.',
      ],
      icon: 'Sparkles',
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
