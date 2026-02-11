export type BlogPost = {
  slug: string
  title: string
  category: string
  summary: string
  publishedAt: string
  readTime: string
  image: string
  body: string[]
  skills: string[]
}

export const blogs: BlogPost[] = [
  {
    slug: 'artifical-intelligence-evolution',
    title: 'What is Artificial Intelligence and how it evolved',
    category: 'AI Engineering',
    summary:
      'Evoluation of Artifical intellgence',
    publishedAt: 'January 28, 2026',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    body: [
      'Artificial intelligence (AI) is the capability of computational systems to perform tasks typically associated with human intelligence, such as learning, reasoning, problem-solving, perception, and decision-making.',
      'It is a field of research in computer science that develops and studies methods and software that enable machines to perceive their environment and use learning and intelligence to take actions that maximize their chances of achieving defined goals.',
      'Artificial intelligence was founded as an academic discipline in 1956, and the field went through multiple cycles of optimism throughout its history, followed by periods of disappointment and loss of funding, known as AI winters.Funding and interest vastly increased after 2012 when graphics processing units started being used to accelerate neural networks, and deep learning outperformed previous AI techniques. This growth accelerated further after 2017 with the transformer architecture. In the 2020s, an ongoing period of rapid progress in advanced generative AI became known as the AI boom. Generative AI ability to create and modify content has led to several unintended consequences and harms. Ethical concerns have been raised about AI long-term effects and potential existential risks, prompting discussions about regulatory policies to ensure the safety and benefits of the technology.',
      'The three main categories of AI are:',
      '  - Artificial Narrow Intelligence (ANI)',
      "  - Artificial General Intelligence (AGI)",
      "  - Artificial Super Intelligence (ASI)",
      "Some companies, such as OpenAI, Google DeepMind and Meta, aim to create artificial general intelligence (AGI) – AI that can complete virtually any cognitive task at least as well as a human"
    ],
    skills: ['AI'],
  },
]
