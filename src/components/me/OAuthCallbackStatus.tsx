import { Loader2, ShieldCheck } from "lucide-react";
import Logo from "@components/brand/Logo";
import { Card, CardContent } from "@components/ui/card";

export default function OAuthCallbackStatus({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-background px-6 py-12">
      <div
        className="absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md space-y-6 text-center">
        <Logo size="sm" className="text-primary" />
        <Card
          className="border-border/60 shadow-lg"
          role="status"
          aria-live="polite"
        >
          <CardContent className="flex flex-col items-center p-10">
            <div className="relative flex size-16 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="size-7 text-primary" />
              <Loader2 className="absolute -inset-1 size-[4.5rem] animate-spin text-primary/40" />
            </div>
            <h1 className="mt-6 font-display text-xl font-bold">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
