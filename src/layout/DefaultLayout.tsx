import type { ReactNode } from "react";
import Header from "./Header";
import Section from "./Section";
import { LandingFooter } from "./landing";
export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Section>{children}</Section>
      </main>
      <LandingFooter />
    </div>
  );
}
