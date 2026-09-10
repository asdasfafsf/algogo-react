import { DefaultLayout } from "@layout/index";
import { MainCarousel } from "@components/Carousel";
import ProblemListCard from "@components/problem-list/ProblemListCard";
import { useEffect } from "react";
import QuickNavStrip from "@components/home/QuickNavStrip";
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
      <div className="my-8 space-y-10">
        <MainCarousel />
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">빠른 탐색</h2>
          <QuickNavStrip />
        </section>
        <ProblemListCard />
      </div>
    </DefaultLayout>
  );
}

export default App;
