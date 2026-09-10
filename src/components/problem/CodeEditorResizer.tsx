import { GripHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useCodeEditorResizer from "@hook/useCodeEditorResizer";
export default function CodeEditorResizer() {
  const handleMouseDown = useCodeEditorResizer()[1];
  return (
    <Separator
      decorative={false}
      aria-label="코드와 결과 패널 크기 조절"
      onMouseDown={handleMouseDown}
      className="group flex h-2.5 w-full cursor-row-resize items-center justify-center bg-gray-800 hover:bg-blue-600/40"
    >
      <GripHorizontal className="size-3 text-gray-500 group-hover:text-blue-300" />
    </Separator>
  );
}
