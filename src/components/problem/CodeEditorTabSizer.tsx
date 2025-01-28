import { Typography } from '@components/common';
import { Input } from '@components/Input';

interface CodeEditorTabSizerProps {
  tabSize: number;
  handleChange: (_: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>
}

export default function CodeEditorTabSizer({ tabSize, handleChange }: CodeEditorTabSizerProps) {
  return (
    <div className="flex">
      <div className="flex w-20 py-2">
        <Typography
          weight="semibold"
          variant="medium"
        >
          탭 사이즈
        </Typography>
      </div>
      <div>
        <Input
          type="number"
          min={1}
          max={50}
          className="!w-32 h-10"
          value={tabSize}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}
