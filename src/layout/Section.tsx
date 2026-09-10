import type { ReactNode } from "react";
export default function Section({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="min-w-0">{children}</div>
    </section>
  );
}
