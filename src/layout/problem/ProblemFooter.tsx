import { BookOpen, Code2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROBLEM_FOOTER_HEIGHT } from "@constant/Size";
import { useScreenSize } from "@/context/ScreenSizeContext";
import { useProblemScreenStore } from "@zustand/ProblemScreenStore";
const sections = [
  { label: "문제", icon: BookOpen },
  { label: "코드", icon: Code2 },
  { label: "실행 결과", icon: Terminal },
];
export default function ProblemFooter() {
  const { isMobile } = useScreenSize();
  const selectedIndex = useProblemScreenStore((s) => s.selectedIndex);
  const setSelectedIndex = useProblemScreenStore((s) => s.setSelectedIndex);
  return (
    <footer
      style={{ height: PROBLEM_FOOTER_HEIGHT }}
      className="shrink-0 border-b border-border bg-background"
    >
      {isMobile && (
        <nav
          aria-label="풀이 화면 전환"
          className="grid h-full w-full grid-cols-3"
        >
          {sections.map(({ label, icon: Icon }, index) => (
            <Button
              key={label}
              variant="ghost"
              className={`h-full gap-1.5 rounded-none border-b-2 text-xs ${selectedIndex === index ? "border-primary bg-primary/5 text-foreground" : "border-transparent text-muted-foreground"}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <Icon className="size-4" />
              {label}
            </Button>
          ))}
        </nav>
      )}
    </footer>
  );
}
