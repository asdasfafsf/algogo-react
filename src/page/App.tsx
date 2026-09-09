import { DefaultLayout } from "@layout/index";
import { MainCarousel } from "@components/Carousel";
import ProblemListCard from "@components/problem-list/ProblemListCard";
import { useEffect } from "react";
import { TrainingSection } from "@components/Training/TrainingSection";
import {
  EDITOR_CLEANUP_INTERVAL_MS,
  isEditorCleanupDue,
  isStoredCodeStale,
} from "@/domain/editor/persistence";

function App() {
  useEffect(() => {
    const CLEANUP_KEY = "last-cleanup-time";
    const cleanupOldCodes = () => {
      const lastCleanup = localStorage.getItem(CLEANUP_KEY);
      const now = new Date().getTime();

      if (isEditorCleanupDue(now, lastCleanup ? Number(lastCleanup) : null)) {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("code-")) {
            try {
              const data = JSON.parse(localStorage.getItem(key) || "");
              const updatedAt = new Date(data.updatedAt);

              if (isStoredCodeStale(now, updatedAt.getTime())) {
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
    const cleanup = setInterval(cleanupOldCodes, EDITOR_CLEANUP_INTERVAL_MS);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <DefaultLayout>
      <div className="my-8">
        <MainCarousel />
        <div className="h-8" />
        <TrainingSection />
        <div className="h-8" />
        <ProblemListCard />
      </div>
    </DefaultLayout>
  );
}

export default App;
