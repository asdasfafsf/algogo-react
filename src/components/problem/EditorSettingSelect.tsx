import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditorSettingSelectProps<T extends string | number> {
  label: string;
  value: T;
  options: readonly T[];
  onValueChange: (value: T) => void | Promise<void>;
}
export default function EditorSettingSelect<T extends string | number>({
  label,
  value,
  options,
  onValueChange,
}: EditorSettingSelectProps<T>) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-sm font-semibold">{label}</span>
      <Select
        value={String(value)}
        onValueChange={(next) => {
          const option = options.find((item) => String(item) === next);
          if (option !== undefined) void onValueChange(option);
        }}
      >
        <SelectTrigger aria-label={`에디터 ${label}`} className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={String(option)} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
