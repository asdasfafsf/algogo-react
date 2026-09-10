import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
export default function PageState({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
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
