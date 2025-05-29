import { DefaultLayout } from '@layout/index';
import { MainCarousel } from '@components/Carousel';
import ProblemListCard from '@components/problem-list/ProblemListCard';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const CLEANUP_KEY = 'last-cleanup-time';
    const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000;
    const CODE_EXPIRY = 7 * 24 * 60 * 60 * 1000;

    const cleanupOldCodes = () => {
      const lastCleanup = localStorage.getItem(CLEANUP_KEY);
      const now = new Date().getTime();

      if (!lastCleanup || (now - Number(lastCleanup)) > CLEANUP_INTERVAL) {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('code-')) {
            try {
              const data = JSON.parse(localStorage.getItem(key) || '');
              const updatedAt = new Date(data.updatedAt);

              if ((now - updatedAt.getTime()) > CODE_EXPIRY) {
                localStorage.removeItem(key);
              }
            } catch {
              localStorage.removeItem(key);
            }
          }
        });
        localStorage.setItem(CLEANUP_KEY, now.toString());
      }
    };
    cleanupOldCodes();
    const cleanup = setInterval(cleanupOldCodes, CLEANUP_INTERVAL);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <DefaultLayout>
      <div className="my-8">
        <MainCarousel />
        <div className="h-8" />
        <ProblemListCard />
      </div>
    </DefaultLayout>
  );
}

export default App;
