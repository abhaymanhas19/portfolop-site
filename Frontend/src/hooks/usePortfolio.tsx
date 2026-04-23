import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from '../types';
import { fetchPortfolioData } from '../lib/api';

const PortfolioContext = createContext<SiteContent | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolioData()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen bg-[#030712] text-white">Loading portfolio...</div>;
  if (error) return <div className="flex items-center justify-center h-screen bg-[#030712] text-red-500">Error: {error}</div>;

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
