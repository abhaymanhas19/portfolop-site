export type BuildCapability = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  icon: 'MessageSquare' | 'LineChart' | 'Sparkles' | 'Globe';
};

export const buildCapabilities: BuildCapability[] = [
  {
    id: 'python-core-engineering',
    title: 'Core Python Engineering & Automation',
    description:
      'Designing and optimizing foundational **Python scripts and data handling services** for robust, efficient, and reliable system operations, crucial for ETL and MLOps preparedness.',
    bullets: [
      'Advanced Data ETL(Extract, Transform, Load) Pipelines using Pandas and Dask.',
      'Automated System Monitoring and Health Checks scripts.',
      'Bespoke Web Scraping and Data Extraction Tools.',
      'Building utility CLI tools and OOP-based libraries in Python.',
    ],
    icon: 'Globe',
  },
  {
    id: 'production-apis',
    title: 'Production-Grade API & Web Services',
    description:
      'Creating scalable, high-availability **web applications and microservices** using **Django and DRF** to serve models, process large data volumes, and deliver complex functionality to end-users.',
    bullets: [
      'Scalable DRF REST APIs for model serving and real-time inference.',
      'End-to-End LLM Interfaces for code or content generation.',
      'Image Processing applications using CNN models (object detection/tagging).',
      'Developing custom E-Commerce and Data Dashboard platforms.',
    ],
    icon: 'Globe',
  },
  {
    id: 'generative-copilots',
    title: 'Generative AI & Conversational Agents',
    description:
      'Designing and deploying intelligent **LLM-backed systems** for real-time customer engagement, knowledge retrieval, and automating human-in-the-loop workflows across multiple languages.',
    bullets: [
      'Custom Retrieval-Augmented Generation (RAG) systems.',
      'Multilingual Voice Assistants and Transcription features.',
      'Enterprise-level Q&A Chatbots grounded in proprietary data.',
      'Proactive and Context-Aware virtual assistants.',
    ],
    icon: 'MessageSquare',
  },
  {
    id: 'scalable-architecture',
    title: 'Scalable Architecture and Deployments',
    description:
      'Engineering robust, fault-tolerant backend systems by integrating message queues, caching layers, and serverless technology to ensure **high availability and scalability** for all machine learning services.',
    bullets: [
      'Distributed Asynchronous Task Queues using Celery/RabbitMQ/Redis.',
      'Deploying Python services via Serverless Functions (e.g., AWS Lambda,Azure fucntions) for cost efficiency.',
      'Implementing Caching Strategies with Redis for low-latency API performance.',
      'Containerization (Docker) and Orchestration(Kubernetes) for reproducible deployment.',
    ],
    icon: 'Globe',
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Modeling & Anomaly Detection',
    description:
      'Building robust data science pipelines for time-series forecasting, risk scoring, and **M/L-backed anomaly detection** that drives strategic decision-making and operational efficiency.',
    bullets: [
      'Financial Time-Series Forecasting models.',
      'Automated Trend Detection and early warning systems.',
      'Complex Classification/Clustering for market segmentation.',
      'Reports/Survey and Interview Script Analysis Systems.',
    ],
    icon: 'LineChart',
  },
  {
    id: 'user-optimization',
    title: 'Personalization & Experience Optimization',
    description:
      'Developing production-grade Recommendation Engines, dynamic pricing models, and secure transaction workflows to maximize user engagement and mitigate financial risk.',
    bullets: [
      'High-performance Recommendations Systems (Collaborative Filtering).',
      'Secure, ML-driven Fraud and Risk Checks.',
      'Dynamic Booking and Scheduling optimization systems.',
      'Customer Lifetime Value (CLV) predictive modeling.',
    ],
    icon: 'Sparkles',
  },
  
];
