import { Link } from "react-router-dom";
import Logo from "@components/brand/Logo";

const readyLinks = [
  { label: "문제", href: "/" },
  { label: "오늘의 문제", href: "/problem/today" },
] as const;

const linkClassName =
  "rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:text-primary";

export default function LandingFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-65"
              aria-label="알고고 홈"
            >
              <Logo size="sm" />
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              여러 저지의 문제를 한 곳에서 찾고, 바로 풀어보세요.
            </p>
          </div>

          <div className="text-sm sm:self-center">
            <nav aria-label="하단 메뉴">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
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
        </div>

        <div className="mt-8 border-t pt-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Algogo</p>
        </div>
      </div>
    </footer>
  );
}
