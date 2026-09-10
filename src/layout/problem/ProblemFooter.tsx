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
      className="dark flex w-full items-center justify-center border-t border-white/10 bg-[#090b12] text-gray-400"
    >
      {isMobile ? (
        <nav
          aria-label="풀이 화면 전환"
          className="grid h-full w-full grid-cols-3"
        >
          {sections.map(({ label, icon: Icon }, index) => (
            <Button
              key={label}
              variant="ghost"
              className={`h-full gap-2 rounded-none text-xs ${selectedIndex === index ? "bg-white/5 text-blue-300" : "text-gray-400"}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <Icon className="size-4" />
              {label}
            </Button>
          ))}
        </nav>
      ) : (
        <p className="text-[11px] tracking-wide">
          ALGOGO · 한 문제씩 쌓아가는 실력
        </p>
      )}
    </footer>
  );
}
