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
  credentialUrl?: string
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
        company: 'Product Labs',
        period: '2019 — 2022',
        summary:
          'Led Python squads modernising legacy systems with event-driven patterns and cloud-native deployments.',
        achievements: [
          'Introduced observability instrumentation that reduced mean time to detect incidents by 45%.',
          'Migrated monolith workloads to Kubernetes with zero downtime releases.',
          'Mentored engineers on async workflows, testing strategy, and AI feature integration.'
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
      title: 'Microsoft Certified: Azure AI Engineer Associate',
      issuer: 'Microsoft',
      year: '2023',
      description: 'Designing and deploying AI solutions on Azure—covering Cognitive Services, OpenAI, and responsible AI patterns.',
      tags: ['Azure AI', 'Responsible AI', 'OpenAI']
    },
    {
      title: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      year: '2022',
      description: 'Hands-on neural network design, model optimisation, and production deployment best practices.',
      tags: ['Deep Learning', 'Model Ops']
    },
    {
      title: 'Kubernetes and Cloud Native Associate (KCNA)',
      issuer: 'Cloud Native Computing Foundation',
      year: '2021',
      description: 'Core Kubernetes concepts, observability, and security fundamentals for cloud-native delivery.',
      tags: ['Kubernetes', 'Cloud Native'],
      credentialUrl: 'https://www.cncf.io/training/certification/kcna/'
    },
    {
      title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      year: '2020',
      description: 'Azure architectural foundations, governance, and cost management for scaled deployments.'
    }
  ]
}
