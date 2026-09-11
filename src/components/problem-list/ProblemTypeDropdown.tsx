import React, { useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search, Tag, X } from "lucide-react";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import useProblemTypeDropdown from "@hook/problem-list/useProblemTypeDropdown";
import { cn } from "@lib/utils";
import { filterProblemTypesBySearch } from "@/domain/problems";

function ProblemTypeDropdown() {
  const {
    isOpen,
    problemTypeList,
    appliedSelectedCount,
    handleSelect,
    handleSelectAll,
    handleReset,
    handleOk,
    handleOpenChange,
  } = useProblemTypeDropdown();
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const draftSelectedCount = problemTypeList.filter(
    ({ isSelected }) => isSelected,
  ).length;
  const visibleProblemTypes = useMemo(
    () => filterProblemTypesBySearch(problemTypeList, search),
    [problemTypeList, search],
  );
  const selectedVisibleCount = visibleProblemTypes.filter(
    ({ isSelected }) => isSelected,
  ).length;
  const visibleSelectionState =
    visibleProblemTypes.length > 0 &&
    selectedVisibleCount === visibleProblemTypes.length
      ? true
      : selectedVisibleCount > 0
        ? "indeterminate"
        : false;

  const onOpenChange = (nextOpen: boolean) => {
    handleOpenChange(nextOpen);
    if (!nextOpen) {
      setSearch("");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 w-full justify-between gap-2 px-4 transition-all duration-200 sm:w-[200px]",
            "hover:border-foreground/30 hover:bg-accent/60 active:bg-accent",
            appliedSelectedCount > 0
              ? "border-primary/50 bg-primary/5 text-foreground shadow-sm hover:border-primary/70 hover:bg-primary/10 active:bg-primary/15"
              : "bg-background",
          )}
          aria-label={
            appliedSelectedCount > 0
              ? `유형 필터, ${appliedSelectedCount}개 선택됨`
              : "유형 필터"
          }
        >
          <span className="flex min-w-0 items-center gap-2">
            <Tag
              aria-hidden
              className={cn(
                "size-4 shrink-0 transition-colors",
                appliedSelectedCount > 0 ? "text-primary" : "opacity-50",
              )}
            />
            <span className="truncate text-sm font-medium">
              {appliedSelectedCount > 0
                ? `유형 (${appliedSelectedCount})`
                : "유형"}
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
        className="flex max-h-[min(520px,var(--radix-popover-content-available-height))] w-[min(320px,calc(100vw-2rem))] flex-col overflow-hidden border-border/60 p-0 shadow-lg"
        aria-label="유형 선택"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          searchInputRef.current?.focus();
        }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              유형 선택
            </span>
            {draftSelectedCount > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium tabular-nums text-primary">
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

        <div className="shrink-0 border-b border-border/40 px-3 py-2">
          <div className="relative">
            <Search
              aria-hidden
              className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60"
            />
            <input
              ref={searchInputRef}
              type="search"
              aria-label="유형 검색"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="유형 또는 초성 검색..."
              className="h-8 w-full rounded-md border border-border/50 bg-muted/40 pl-8 pr-8 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 hover:border-foreground/25 focus:border-ring focus:ring-1 focus:ring-ring"
            />
            {search && (
              <button
                type="button"
                aria-label="검색어 지우기"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-muted/80"
              >
                <X aria-hidden className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-2">
          {visibleProblemTypes.length > 0 ? (
            <>
              <label className="flex min-h-10 shrink-0 cursor-pointer items-center gap-3 rounded-md border-b border-border/40 px-2 text-sm font-medium transition-colors hover:bg-accent/50 active:bg-accent/70">
                <Checkbox
                  checked={visibleSelectionState}
                  onCheckedChange={() =>
                    handleSelectAll(
                      visibleProblemTypes.map(({ value }) => value),
                    )
                  }
                  aria-label={search ? "검색 결과 전체 선택" : "유형 전체 선택"}
                  className="hover:border-foreground/40 active:bg-muted"
                />
                <span>{search ? "검색 결과 전체" : "전체 선택"}</span>
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  {selectedVisibleCount}/{visibleProblemTypes.length}
                </span>
              </label>
              <div
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain pt-1"
                role="group"
                aria-label="문제 유형"
              >
                {visibleProblemTypes.map(({ isSelected, name, value }) => (
                  <button
                    key={value}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => handleSelect(value)}
                    className={cn(
                      "flex min-h-9 w-full items-center gap-3 rounded-md px-2 text-left text-xs transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                      isSelected
                        ? "bg-primary/10 font-medium text-foreground hover:bg-primary/15 active:bg-primary/20"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground active:bg-accent/70",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background",
                      )}
                    >
                      {isSelected && <Check className="size-3.5" />}
                    </span>
                    <span className="truncate">{name}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="grid min-h-36 place-items-center px-4 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-end border-t border-border/40 bg-popover px-4 py-3">
          <Button
            size="sm"
            onClick={(event) => {
              handleOk(event);
              setSearch("");
            }}
            className="h-8 px-4 text-xs active:bg-primary/80"
          >
            적용
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(ProblemTypeDropdown);
