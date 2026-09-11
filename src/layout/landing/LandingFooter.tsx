import { Link } from "react-router-dom";
import Logo from "@components/brand/Logo";

const readyLinks = [
  { label: "문제", href: "/" },
  { label: "오늘의 문제", href: "/problem/today" },
] as const;

const linkClassName =
  "-mx-1 inline-flex min-h-8 cursor-pointer items-center rounded px-1 font-medium text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:text-primary";

export default function LandingFooter() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:gap-6 lg:px-8">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Link
            to="/"
            className="inline-flex w-fit shrink-0 cursor-pointer rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-65"
            aria-label="알고고 홈"
          >
            <Logo size="sm" />
          </Link>
          <p className="max-w-md text-sm leading-5 text-muted-foreground">
            여러 온라인 저지의 문제를 한 곳에서 찾아 풀어보세요.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm md:ml-auto md:flex-nowrap md:justify-end">
          <nav aria-label="하단 메뉴">
            <ul className="flex items-center gap-x-5">
              {readyLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden className="hidden h-3.5 w-px bg-border sm:block" />
          <small className="whitespace-nowrap text-xs text-muted-foreground">
            © {new Date().getFullYear()} Algogo
          </small>
        </div>
      </div>
    </footer>
  );
}
