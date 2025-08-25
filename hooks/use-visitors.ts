import { useEffect, useState } from 'react';
import { trackVisitor, getThemeCounts, getUniqueVisitorsCount, getTotalVisitsCount, updateVisitorTheme, ThemeCounts } from '../lib/visitors';
import { useTheme } from 'next-themes';

export function useVisitors() {
  const [themeCounts, setThemeCounts] = useState<ThemeCounts>({ light: 0, dark: 0, system: 0, total: 0 });
  const [uniqueVisitors, setUniqueVisitors] = useState<number>(0);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  // Track visitor on mount
  useEffect(() => {
    if (theme) {
      trackVisitor(theme as 'light' | 'dark' | 'system');
    }
  }, [theme]);

  // Load visitor statistics
  useEffect(() => {
    async function loadStats() {
      try {
        setIsLoading(true);
        const [counts, unique, total] = await Promise.all([
          getThemeCounts(),
          getUniqueVisitorsCount(),
          getTotalVisitsCount()
        ]);
        
        setThemeCounts(counts);
        setUniqueVisitors(unique);
        setTotalVisits(total);
      } catch (error) {
        console.error('Error loading visitor stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  // Update theme when it changes
  useEffect(() => {
    if (theme) {
      updateVisitorTheme(theme as 'light' | 'dark' | 'system');
    }
  }, [theme]);

  const refreshStats = async () => {
    try {
      setIsLoading(true);
      const [counts, unique, total] = await Promise.all([
        getThemeCounts(),
        getUniqueVisitorsCount(),
        getTotalVisitsCount()
      ]);
      
      setThemeCounts(counts);
      setUniqueVisitors(unique);
      setTotalVisits(total);
    } catch (error) {
      console.error('Error refreshing visitor stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    themeCounts,
    uniqueVisitors,
    totalVisits,
    isLoading,
    refreshStats,
    trackVisitor,
    updateVisitorTheme
  };
}
