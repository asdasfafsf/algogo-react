import { Input } from "@/components/ui/input";

interface CodeEditorTabSizerProps {
  tabSize: number;
  handleChange: (
    _: React.ChangeEvent<HTMLInputElement>,
  ) => void | Promise<void>;
}

export default function CodeEditorTabSizer({
  tabSize,
  handleChange,
}: CodeEditorTabSizerProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="editor-tab-size" className="w-20 text-sm font-semibold">
        탭 사이즈
      </label>
      <div>
        <Input
          id="editor-tab-size"
          aria-label="탭 사이즈"
          type="number"
          min={1}
          max={50}
          className="h-10 w-32"
          value={tabSize}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}
