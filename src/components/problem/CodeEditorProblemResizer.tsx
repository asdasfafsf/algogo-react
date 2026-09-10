import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeEditorProblemResizerProps {
  handleSelect: (event: unknown, value: number) => void | Promise<void>;
  selectedIndex: number;
}
const FONT_SIZES = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];

export default function CodeEditorProblemResizer({
  selectedIndex,
  handleSelect,
}: CodeEditorProblemResizerProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-sm font-semibold">글자 크기</span>
      <Select
        value={String(FONT_SIZES[selectedIndex])}
        onValueChange={(value) => void handleSelect(undefined, Number(value))}
      >
        <SelectTrigger aria-label="문제 글자 크기" className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FONT_SIZES.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}%
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
