export type FocusArea = {
  title: string
  description: string
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  summary: string
  achievements: string[]
}

export type ValueStatement = {
  title: string
  description: string
}

export type Certification = {
  title: string
  issuer: string
  year: string
  description: string
  tags?: string[]
  credentialUrl?: string[]
}

export type ProfileContent = {
  about: {
    headline: string
    intro: string
    focusAreas: FocusArea[]
    experience: ExperienceItem[]
    values: ValueStatement[]
  }
  certifications: Certification[]
}

export const profile: ProfileContent = {
  about: {
    headline: 'Python engineer delivering AI platforms that hold up in production',
    intro:
      'I translate fuzzy ideas into reliable AI-driven products—pairing pragmatic Python craftsmanship with evaluation-driven delivery so features make it to prod and stay there.',
    focusAreas: [
      {
        title: 'Applied AI systems',
        description:
          'Retrieval augmented generation, evaluation harnesses, and guardrails that keep LLM features grounded in business outcomes.'
      },
      {
        title: 'Resilient backends',
        description:
          'Async Django architectures, realtime messaging, and background pipelines that scale without surprises.'
      },
      {
        title: 'Cloud + operations',
        description:
          'Azure, Kubernetes, and observability stacks tuned for fast feedback loops and hands-off reliability.'
      }
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
          'Built distributed Celery pipelines and WebSocket dashboards keeping ops teams informed in real time.'
        ]
      },
      {
        role: 'Senior Backend Engineer',
        company: 'Shubpy Solution private limited,Chandigarh',
        period: '2023 — present',
        summary:
          'Led Python squads modernising legacy systems with event-driven patterns and cloud-native deployments.',
        achievements: [
          'Introduced observability instrumentation that reduced mean time to detect incidents by 45%.',
          'Migrated monolith workloads to Kubernetes with zero downtime releases.',
          'Mentored engineers on async workflows, testing strategy, and AI feature integration.'
        ]
      },
      {
        role: 'Junior Backend Engineer',
        company: 'CNT Technologies,Chandigarh',
        period: '2022— 2023',
        summary:
          'Learned and implemented Python standards to build the seamless Websites.',
        achievements: [
          'Built real time chat application, Utilized technologies are Python,Django,Websockets and Async Programming.',
          'Utilized the concepts of Multithreading and Multiprocessing to reduce response latency.',
        ]
      }
    ],
    values: [
      {
        title: 'Measure, then optimise',
        description: 'I anchor decisions in metrics—latency, accuracy, adoption—so we debate facts, not guesses.'
      },
      {
        title: 'Ship responsibly',
        description: 'Guardrails, evaluations, and clear user messaging underpin every AI feature I deliver.'
      },
      {
        title: 'Collaborate in the open',
        description: 'Async updates, transparent roadmaps, and tight feedback loops keep teams aligned and moving fast.'
      }
    ]
  },
  certifications: [
    {
      title: 'CrewAI Certified',
      issuer: 'CrewAI - Leading Multi Agent platform',
      year: '2025',
      description: 'Delve into the operational methodologies governing multi-agent AI architectures, specifically elucidating inter-agent invocation protocols contingent upon dynamic task execution prerequisites ',
      tags: ['AI Agents', 'Streamline workflows'],
      credentialUrl: ["https://shorturl.at/tKln2"]
    },
    {
      title: 'Python Certified',
      issuer: 'HackerRank',
      year: '2022',
      description: 'Studied and Mastered Python Core Concepts, Understands the python Standards.',
      tags: ['Python', 'Basics of python'],
      credentialUrl: ["https://shorturl.at/xSlfD"]
    },
    {
      title: 'Web Development Certified',
      issuer: 'CNT Technologies',
      year: '2022',
      description: "Hands-on Web development design, Web Api's optimizations, and production deployment best practices.",
      tags: ['Python', 'Django',"DRF","Postgres"],
      credentialUrl:["https://rb.gy/n5e7fn"]
    },
    {
      title: 'Kubernetes and Cloud Native Associate (KCNA)',
      issuer: 'Cloud Native Computing Foundation',
      year: '2024',
      description: 'Core Kubernetes concepts, observability, and security fundamentals for cloud-native delivery.',
      tags: ['Kubernetes','Docker', 'Cloud Native'],
      credentialUrl: ['https://www.cncf.io/training/certification/kcna/']
    },
    {
      title: 'Problem Solving Certifed',
      issuer: 'HackerRank',
      year: '2020',
      description: 'Understand the problem, plan the solution using pseudocode or by breaking the problem into smaller parts, write the code, and then test and debug it rigorously',
      tags: ["Problem Solving","Critical Thinking"],
      credentialUrl:["https://shorturl.at/9SQfY","https://shorturl.at/2qlXU"]

    }
  ]
}
