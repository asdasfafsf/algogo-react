import { Link } from "react-router-dom";
import Logo from "@components/brand/Logo";

const readyLinks = [
  { label: "문제", href: "/" },
  { label: "오늘의 문제", href: "/problem/today" },
] as const;

const linkClassName =
  "-mx-2 inline-flex min-h-10 cursor-pointer items-center rounded-md px-2 text-sm font-medium text-muted-foreground outline-none transition-[color,background-color,transform] hover:-translate-y-0.5 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0 active:bg-muted/80 active:text-primary";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border/80 bg-muted/25">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 py-9 sm:py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12">
          <div className="min-w-0">
            <Link
              to="/"
              className="inline-flex w-fit shrink-0 cursor-pointer rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-65"
              aria-label="알고고 홈"
            >
              <Logo size="sm" />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              여러 온라인 저지의 문제를 한 곳에서 찾아 풀어보세요.
            </p>
          </div>

          <nav
            aria-labelledby="footer-navigation-title"
            className="md:justify-self-end"
          >
            <h2
              id="footer-navigation-title"
              className="text-sm font-semibold text-foreground"
            >
              둘러보기
            </h2>
            <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 md:justify-end">
              {readyLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex min-h-12 items-center border-t border-border/80 py-3">
          <small className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Algogo
          </small>
        </div>
      </div>
    </footer>
  );
}
