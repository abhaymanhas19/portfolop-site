export type BuildCapability = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  icon: 'MessageSquare' | 'LineChart' | 'Sparkles' | 'Globe';
};

export const buildCapabilities: BuildCapability[] = [
  {
    id: 'communication-assistance',
    title: 'Communication & Assistance',
    description:
      'Conversational agents and copilots for customer support, knowledge base navigation, transcription, and proactive virtual assistance across channels.',
    bullets: [
      'Multi-channel chatbots tuned to knowledge bases and style guides.',
      'Voice assistants and realtime transcription for meetings or field ops.',
      'Automated triage and routing that escalates only when needed.',
    ],
    icon: 'MessageSquare',
  },
  {
    id: 'data-insights',
    title: 'Data & Insights',
    description:
      'Analytics, reporting, survey and research summarisation, and trend detection pipelines that surface the right metrics and narratives in real time.',
    bullets: [
      'Dashboards that translate telemetry into exec-ready narratives.',
      'Automated survey/questionnaire summarisation with bias checks.',
      'Demand forecasting and anomaly detection tuned to KPIs.',
    ],
    icon: 'LineChart',
  },
  {
    id: 'personalization-transactions',
    title: 'Personalization & Transactions',
    description:
      'Recommendation engines, booking flows, secure payment experiences, and fraud mitigation layers tuned to your business workflows.',
    bullets: [
      'Contextual recommendations across catalogues, content, or offers.',
      'Booking and scheduling flows with dynamic availability logic.',
      'Transaction monitoring, scoring, and fraud mitigation loops.',
    ],
    icon: 'Sparkles',
  },
  {
    id: 'everyday-services',
    title: 'Everyday Services',
    description:
      'Smart home orchestration, digital health companions, adaptive education platforms, and travel aides that streamline everyday decisions.',
    bullets: [
      'Home automations that coordinate devices and routines.',
      'Digital health trackers with personalised nudges and summaries.',
      'Learning and travel assistants that adapt to user context.',
    ],
    icon: 'Globe',
  },
];
