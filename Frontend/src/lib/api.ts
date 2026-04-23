import { SiteContent } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function fetchPortfolioData(): Promise<SiteContent> {
  const response = await fetch(`${API_URL}/portfolio/`);
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio data');
  }
  return response.json();
}
