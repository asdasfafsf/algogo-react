import React from "react";
import { ChevronDown, Signal, X } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import useProblemLevelDropdown from "@hook/problem-list/useProblemLevelDropdown";
import { getProblemLevelRank } from "@/domain/problems/problemLevelSelection";
import { cn } from "@lib/utils";

const TIERS = [
  {
    key: "bronze",
    label: "브론즈",
    values: ["5", "4", "3", "2", "1"],
    color: "text-tier-bronze",
    background: "bg-tier-bronze/20",
    activeBackground: "bg-tier-bronze/30",
  },
  {
    key: "silver",
    label: "실버",
    values: ["10", "9", "8", "7", "6"],
    color: "text-tier-silver",
    background: "bg-tier-silver/20",
    activeBackground: "bg-tier-silver/30",
  },
  {
    key: "gold",
    label: "골드",
    values: ["15", "14", "13", "12", "11"],
    color: "text-tier-gold",
    background: "bg-tier-gold/20",
    activeBackground: "bg-tier-gold/30",
  },
  {
    key: "platinum",
    label: "플래티넘",
    values: ["20", "19", "18", "17", "16"],
    color: "text-tier-platinum",
    background: "bg-tier-platinum/20",
    activeBackground: "bg-tier-platinum/30",
  },
  {
    key: "diamond",
    label: "다이아",
    values: ["25", "24", "23", "22", "21"],
    color: "text-tier-diamond",
    background: "bg-tier-diamond/20",
    activeBackground: "bg-tier-diamond/30",
  },
  {
    key: "ruby",
    label: "루비",
    values: ["30", "29", "28", "27", "26"],
    color: "text-tier-ruby",
    background: "bg-tier-ruby/20",
    activeBackground: "bg-tier-ruby/30",
  },
] as const;

function ProblemLevelDropdown() {
  const {
    isOpen,
    problemLevelList,
    appliedSelectedCount,
    handleSelect,
    handleSelectTier,
    handleReset,
    handleOk,
    handleOpenChange,
  } = useProblemLevelDropdown();
  const draftSelectedCount = problemLevelList.filter(
    ({ isSelected }) => isSelected,
  ).length;
  const unknownOption = problemLevelList.find(({ value }) => value === "0");

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 w-full justify-between gap-2 rounded-md px-4 transition-all duration-200 sm:w-[200px]",
            "hover:border-foreground/30 hover:bg-accent/60 active:bg-accent",
            appliedSelectedCount > 0
              ? "border-tier-gold/50 bg-tier-gold/5 text-foreground shadow-sm hover:border-tier-gold/70 hover:bg-tier-gold/10 active:bg-tier-gold/15"
              : "bg-background",
          )}
          aria-label={
            appliedSelectedCount > 0
              ? `난이도 필터, ${appliedSelectedCount}개 선택됨`
              : "난이도 필터"
          }
        >
          <span className="flex min-w-0 items-center gap-2">
            <Signal
              aria-hidden
              className={cn(
                "size-4 shrink-0 transition-colors",
                appliedSelectedCount > 0 ? "text-tier-gold" : "opacity-50",
              )}
            />
            <span className="truncate text-sm font-medium">
              {appliedSelectedCount > 0
                ? `난이도 ${appliedSelectedCount}개`
                : "난이도"}
            </span>
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              "size-3.5 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
              appliedSelectedCount > 0 ? "opacity-70" : "opacity-40",
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="flex max-h-[min(560px,var(--radix-popover-content-available-height))] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden border-border/60 p-0 shadow-lg"
        aria-label="난이도 선택"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              난이도 선택
            </span>
            {draftSelectedCount > 0 && (
              <span className="rounded-full bg-tier-gold/10 px-2 py-0.5 text-xs font-medium tabular-nums text-tier-gold">
                {draftSelectedCount}
              </span>
            )}
          </div>
          {draftSelectedCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:bg-destructive/5 hover:text-destructive active:bg-destructive/10"
            >
              초기화
              <X aria-hidden className="size-3.5" />
            </Button>
          )}
        </div>

        <div className="overflow-y-auto p-3 sm:p-4">
          <div className="flex h-9 items-center">
            <button
              type="button"
              role="checkbox"
              aria-checked={unknownOption?.isSelected === true}
              aria-label="알 수 없음 난이도"
              onClick={() => handleSelect("0")}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                unknownOption?.isSelected
                  ? "border-foreground/20 bg-muted text-foreground shadow-sm hover:bg-muted/80 active:bg-muted"
                  : "border-border/40 bg-transparent text-muted-foreground/70 hover:border-border hover:bg-muted/30 hover:text-foreground active:bg-muted/60",
              )}
            >
              알 수 없음
            </button>
          </div>

          <div className="my-2 border-t border-border/40" />

          <div className="space-y-2">
            {TIERS.map((tier) => {
              const tierOptions = tier.values.map((value) => {
                const option = problemLevelList.find(
                  (problemLevel) => problemLevel.value === value,
                );
                return { value, isSelected: option?.isSelected === true };
              });
              const selectedTierCount = tierOptions.filter(
                ({ isSelected }) => isSelected,
              ).length;
              const isEntireTierSelected =
                selectedTierCount === tierOptions.length;
              const hasTierSelection = selectedTierCount > 0;
              const tierSelectionState = isEntireTierSelected
                ? true
                : hasTierSelection
                  ? "mixed"
                  : false;

              return (
                <div
                  key={tier.key}
                  role="group"
                  aria-label={`${tier.label} 난이도`}
                  className="flex h-9 items-center gap-2 sm:gap-3"
                >
                  <div className="flex w-12 shrink-0 items-center gap-1.5 sm:w-[60px] sm:gap-2">
                    <span
                      aria-hidden
                      className={cn(
                        "h-5 w-1 rounded-full transition-colors",
                        hasTierSelection
                          ? cn("bg-current", tier.color)
                          : "bg-muted-foreground/20",
                      )}
                    />
                    <span
                      className={cn(
                        "truncate text-xs transition-colors",
                        hasTierSelection
                          ? cn(tier.color, "font-semibold")
                          : "text-muted-foreground",
                      )}
                    >
                      {tier.label}
                    </span>
                  </div>

                  <div className="flex gap-1 sm:gap-1.5">
                    {tierOptions.map(({ value, isSelected }) => (
                      <button
                        key={value}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        aria-label={`${tier.label} ${getProblemLevelRank(value)}`}
                        onClick={() => handleSelect(value)}
                        className={cn(
                          "size-7 rounded-md border border-transparent text-[11px] font-bold transition-colors duration-200 sm:size-8 sm:text-xs",
                          "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                          isSelected
                            ? cn(
                                tier.activeBackground,
                                tier.color,
                                "border-current shadow-sm hover:brightness-95 active:brightness-90 dark:hover:brightness-110 dark:active:brightness-125",
                              )
                            : "bg-muted/40 text-muted-foreground/60 hover:bg-muted hover:text-foreground active:bg-muted/80",
                        )}
                      >
                        {getProblemLevelRank(value)}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={tierSelectionState}
                    aria-label={`${tier.label} 전체 선택`}
                    onClick={() => handleSelectTier(tier.values)}
                    className={cn(
                      "ml-auto shrink-0 rounded-md border border-transparent px-1.5 py-1 text-[11px] font-semibold transition-colors duration-200 sm:px-2.5 sm:text-xs",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isEntireTierSelected
                        ? cn(
                            tier.background,
                            tier.color,
                            "border-current hover:brightness-95 active:brightness-90 dark:hover:brightness-110 dark:active:brightness-125",
                          )
                        : hasTierSelection
                          ? cn(
                              tier.color,
                              "opacity-50 hover:bg-muted/40 hover:opacity-100 active:bg-muted/70",
                            )
                          : "text-muted-foreground/50 hover:bg-muted/50 hover:text-foreground active:bg-muted/80",
                    )}
                  >
                    전체
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end border-t border-border/40 bg-popover px-4 py-3">
          <Button
            size="sm"
            onClick={handleOk}
            className="h-8 px-4 text-xs active:bg-primary/80"
          >
            적용
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(ProblemLevelDropdown);
