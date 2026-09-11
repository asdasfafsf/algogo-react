import { GripHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useCodeEditorResizer from "@hook/useCodeEditorResizer";
export default function CodeEditorResizer() {
  const [codeEditorHeight, maxEditorHeight, handlePointerDown, handleKeyDown] =
    useCodeEditorResizer();
  return (
    <Separator
      decorative={false}
      orientation="horizontal"
      aria-label="코드와 결과 패널 크기 조절"
      aria-valuemin={50}
      aria-valuemax={maxEditorHeight}
      aria-valuenow={codeEditorHeight}
      aria-valuetext={`코드 편집기 높이 ${codeEditorHeight}px`}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      className="group hidden h-2.5 w-full touch-none cursor-row-resize items-center justify-center bg-border/70 outline-none hover:bg-primary/30 focus-visible:bg-primary/30 focus-visible:ring-2 focus-visible:ring-ring md:flex"
    >
      <GripHorizontal className="size-3 text-muted-foreground group-hover:text-primary" />
    </Separator>
  );
}
