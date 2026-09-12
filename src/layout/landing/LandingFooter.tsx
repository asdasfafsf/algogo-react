import { Link } from "react-router-dom";
import Logo from "@components/brand/Logo";

const footerNavigation = [
  {
    title: "문제",
    links: [
      { label: "전체 문제", href: "/problem" },
      { label: "오늘의 문제", href: "/problem/today" },
    ],
  },
  {
    title: "서비스",
    links: [{ label: "서비스 소개", href: "/landing" }],
  },
] as const;

const linkClassName =
  "inline-flex min-h-9 w-fit cursor-pointer items-center rounded-sm text-sm text-muted-foreground underline decoration-transparent underline-offset-4 outline-none transition-colors hover:text-foreground hover:decoration-current focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:text-primary";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/35">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 md:gap-x-12 md:py-14">
          <div className="col-span-2 min-w-0">
            <Link
              to="/"
              className="inline-flex w-fit shrink-0 cursor-pointer rounded-sm outline-none transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-60"
              aria-label="알고고 홈"
            >
              <Logo size="sm" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              알고리즘 문제를 한곳에서 찾고 풀어보세요.
            </p>
          </div>

          {footerNavigation.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="text-sm font-semibold text-foreground">
                {section.title}
              </h2>
              <ul className="mt-3 space-y-1">
                {section.links.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className={linkClassName}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex min-h-14 items-center border-t border-border py-3">
          <small className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Algogo. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
