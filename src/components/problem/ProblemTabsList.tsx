import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const unavailableTabs = [
  { value: "solution", label: "풀이" },
  { value: "submission", label: "제출 내역" },
] as const;

export default function ProblemTabsList() {
  return (
    <TabsList className="h-auto w-full shrink-0 justify-start overflow-x-auto rounded-none border-b border-border/60 bg-transparent p-0">
      <TabsTrigger
        value="description"
        className="rounded-none border-b-2 border-transparent px-5 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
      >
        문제
      </TabsTrigger>
      {unavailableTabs.map(({ value, label }) => (
        <TabsTrigger
          key={value}
          value={value}
          disabled
          aria-label={`${label}, 준비 중`}
          title={`${label} 기능을 준비하고 있습니다`}
          className="gap-1.5 rounded-none px-4 py-2.5 disabled:opacity-70"
        >
          <span>{label}</span>
          <span
            aria-hidden="true"
            className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground"
          >
            준비 중
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
