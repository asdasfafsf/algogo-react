import { Loader2 } from "lucide-react";
import Logo from "@components/brand/Logo";

export default function OAuthCallbackStatus({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-6 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <Logo size="sm" className="text-primary" />
        <section
          className="border-y border-border py-8 text-left"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <Loader2
              className="mt-0.5 size-5 shrink-0 animate-spin text-primary"
              aria-hidden="true"
            />
            <div>
              <h1 className="font-display text-xl font-bold">{title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
