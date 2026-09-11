import type { ReactNode } from "react";

interface PageStateProps {
  icon?: ReactNode;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  detail?: ReactNode;
  fullScreen?: boolean;
}

export default function PageState({
  icon,
  title,
  description,
  children,
  detail,
  fullScreen = false,
}: PageStateProps) {
  return (
    <section
      className={`grid place-items-center px-4 py-12 ${
        fullScreen ? "min-h-dvh" : "min-h-[65dvh]"
      }`}
    >
      <div className="w-full max-w-xl text-center">
        {icon && (
          <div
            className="mb-4 inline-flex size-9 items-center justify-center text-muted-foreground"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <div className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          {description}
        </div>
        {detail && (
          <p
            className="mx-auto mt-5 max-w-md border-l-2 border-destructive/60 pl-3 text-left text-sm leading-6 text-muted-foreground"
            role="alert"
          >
            {detail}
          </p>
        )}
        {children && (
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
