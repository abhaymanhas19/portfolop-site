export type SkillDomain = {
  domain: string
  icon: string
  skills: string[]
  description?: string
}
export const skills: SkillDomain[] = [
  {
    domain: 'Backend (Python)',
    icon: 'ServerCog',
    skills: [
      'Python',
      'Django',
      'DRF',
      'Django Channels',
      'Celery',
      'Asyncio',
      'Asynchronous Programming',
      'Task Queues (Celery/RabbitMQ)',
      'Multithreading & Multiprocessing',
      'PostgreSQL',
      'Redis'
    ],
    description: 'Designing robust REST + realtime APIs, orchestrating asynchronous workloads, and tuning data stores for high-throughput systems.'
  },
  {
    domain: 'AI & ML',
    icon: 'BrainCircuit',
    skills: [
      'RAG',
      'NLP',
      'Semantic Search',
      'PyTorch',
      'Neural Networks',
      'CNNs',
      'RNNs',
      'Transformers',
      'Scikit-learn',
      'Evaluation',
      'OpenAI/Gemini/Azure'
    ],
    description: 'Shipping applied AI systems—from neural-network experimentation in PyTorch to optimized RAG pipelines and rigorous evaluation harnesses.'
  },
  {
    domain: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      'Azure',
      'Azure Functions (Serverless)',
      'AKS',
      'Kubernetes',
      'Kubernetes Clusters',
      'RabbitMQ Clusters',
      'Docker',
      'CI/CD (Azure DevOps)'
    ],
    description: 'Deploying containerized services and serverless workloads to Azure, managing resilient Kubernetes & RabbitMQ clusters, and automating CI/CD.'
  },
  {
    domain: 'Messaging & Events',
    icon: 'MessageSquare',
    skills: ['Microservices', 'Event-Driven', 'RabbitMQ', 'MapReduce Patterns'],
    description: 'Building fault-tolerant event-driven flows that keep distributed systems responsive and traceable.'
  },
  {
    domain: 'Observability',
    icon: 'Gauge',
    skills: ['Prometheus', 'Grafana', 'Flower'],
    description: 'Instrumenting services with meaningful metrics, dashboards, and alerts to stay ahead of production issues.'
  },
  {
    domain: 'Testing',
    icon: 'FlaskConical',
    skills: ['Pytest', 'Unit/Integration', 'Mocking'],
    description: 'Guarding releases with unit, integration, and contract tests to maintain confidence as systems evolve.'
  }
];
