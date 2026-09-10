import { Fragment } from "react";

export function TodayProblemSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse pb-6 pt-8 text-center sm:pb-8 sm:pt-10">
        <div className="flex justify-center">
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded bg-muted" />
            <div className="h-3.5 w-16 rounded bg-muted" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-3 sm:mt-3.5 sm:gap-4">
          <div className="size-9 rounded-md bg-muted" />
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-8 w-40 rounded bg-muted sm:w-48" />
            <div className="h-3 w-12 rounded bg-muted" />
          </div>
          <div className="size-9 rounded-md bg-muted" />
        </div>
        <div className="mt-3.5 flex justify-center sm:mt-4">
          <div className="h-3.5 w-44 rounded bg-muted" />
        </div>
        <div className="mt-4 flex justify-center sm:mt-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Fragment key={index}>
              {index > 0 && <div className="h-px w-5 bg-muted sm:w-7" />}
              <div className="size-8 rounded-full bg-muted sm:size-9" />
            </Fragment>
          ))}
        </div>
      </div>

      <div className="animate-pulse rounded-lg border border-primary/10 bg-card px-5 py-4 shadow-sm sm:px-6 sm:py-5">
        <div className="flex items-baseline gap-2">
          <div className="h-4 w-5 rounded bg-muted" />
          <div className="h-5 w-48 rounded bg-muted" />
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-12 rounded-full bg-muted" />
        </div>
        <div className="mt-3 h-4 w-full max-w-md rounded bg-muted" />
        <div className="mt-3 flex items-center gap-1.5">
          <div className="h-3.5 w-20 rounded bg-muted" />
          <div className="h-3.5 w-16 rounded bg-muted" />
        </div>
      </div>

      <div>
        <div className="mb-2 ml-3 h-3 w-16 rounded bg-muted" />
        <div className="rounded-lg border border-border/50 p-1.5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 px-3 py-3">
              <div className="size-4 rounded-full bg-muted" />
              <div className="h-3.5 w-5 rounded bg-muted" />
              <div className="h-4 flex-1 rounded bg-muted" />
              <div className="h-5 w-14 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
