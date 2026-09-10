import { GripHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useCodeEditorResizer from "@hook/useCodeEditorResizer";
export default function CodeEditorResizer() {
  const [codeEditorHeight, handleMouseDown, handleKeyDown] =
    useCodeEditorResizer();
  return (
    <Separator
      decorative={false}
      aria-label="코드와 결과 패널 크기 조절"
      aria-valuemin={50}
      aria-valuemax={Math.max(50, window.innerHeight - 200)}
      aria-valuenow={codeEditorHeight}
      aria-valuetext={`코드 편집기 높이 ${codeEditorHeight}px`}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      className="group hidden h-2.5 w-full cursor-row-resize items-center justify-center bg-border/70 outline-none hover:bg-primary/30 focus-visible:bg-primary/30 focus-visible:ring-2 focus-visible:ring-ring md:flex"
    >
      <GripHorizontal className="size-3 text-muted-foreground group-hover:text-primary" />
    </Separator>
  );
}
