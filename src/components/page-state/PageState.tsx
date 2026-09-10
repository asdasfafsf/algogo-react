import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PageStateProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  variant?: "card" | "terminal";
  code?: string;
  command?: string;
  detail?: ReactNode;
}

export default function PageState({
  icon,
  title,
  description,
  children,
  variant = "card",
  code,
  command,
  detail,
}: PageStateProps) {
  if (variant === "terminal") {
    return (
      <div className="grid min-h-dvh place-items-center bg-background px-4 py-16">
        <div className="w-full max-w-lg text-center">
          <h1 className="sr-only">{title}</h1>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950 text-left shadow-2xl shadow-slate-950/15">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
              </div>
              <span className="ml-2 font-mono text-xs text-white/40">
                terminal
              </span>
            </div>
            <div className="space-y-3 p-5 font-mono text-sm leading-7">
              <p className="break-all">
                <span className="text-white/40">$ </span>
                <span className="text-white/65">{command}</span>
              </p>
              <div className="flex items-start gap-2 text-red-400">
                <span className="mt-0.5 shrink-0" aria-hidden>
                  {icon}
                </span>
                <p>
                  error{code ? `[${code}]` : ""}: {title}
                </p>
              </div>
              <p className="text-white/35">
                <span className="text-blue-400/70">--&gt;</span> {description}
              </p>
              {detail && (
                <div
                  className="rounded-md border border-red-400/15 bg-red-400/5 px-3 py-2 text-red-300/90"
                  role="alert"
                >
                  {detail}
                </div>
              )}
              <p className="text-white/35">
                <span className="text-white/55">help:</span> 홈으로 돌아가거나
                이전 페이지로 이동하세요.
              </p>
            </div>
          </div>
          {children && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[65dvh] place-items-center px-4 py-12">
      <Card className="w-full max-w-lg border-border/80 text-center shadow-none">
        <CardContent className="px-6 py-10 sm:px-10">
          <div className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl border bg-muted text-muted-foreground">
            {icon}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <div className="mt-3 text-sm leading-7 text-muted-foreground">
            {description}
          </div>
          {children && (
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
