export type SocialLink = { label: 'GitHub' | 'LinkedIn' | 'Instagram'; url: string };
export type SiteInfo = { NAME: string; ROLE: string; TAGLINE: string; LOCATION: string; CONTACT_EMAIL: string; SOCIAL: SocialLink[]; RESUME_PDF_PATH: string; };
export const site: SiteInfo = {
  NAME: 'Abhay Manhas',
  ROLE: 'Python & AI/ML Engineer',
  TAGLINE: 'Building AI-first backends with Python, RAG, and realtime systems.',
  LOCATION: 'Pathankot, Punjab, India',
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'abhayramgarhia19@outlook.com',
  SOCIAL: [ { label: 'GitHub', url: 'https://github.com/abhaymanhas19' }, { label: 'LinkedIn', url: 'https://www.linkedin.com/in/abhaymanhas19' }, { label: 'Instagram', url: 'https://www.instagram.com/abhaymanhas19' } ],
  RESUME_PDF_PATH: import.meta.env.VITE_RESUME_PATH || '/resume.pdf'
};
