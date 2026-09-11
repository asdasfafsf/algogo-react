import { useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@components/brand/Logo";
import { ProfileMenu } from "@components/Dropdown";
import ThemeToggle from "@components/ThemeToggle";
import { Button } from "@components/ui/button";
import { preparedNavItems, problemNavGroup } from "@/config/nav";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { cn } from "@lib/utils";
import useMeStore from "@zustand/MeStore";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const me = useMeStore((state) => state.me);
  const logout = useMeStore((state) => state.logout);
  const [open, setOpen] = useState(false);

  const navigateAndClose = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-65"
          aria-label="알고고 홈"
        >
          <Logo size="sm" />
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <HeaderMenu
            menuItem={problemNavGroup}
            preparedItems={preparedNavItems}
          />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {me ? (
            <ProfileMenu me={me} />
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground active:bg-accent/80"
                onClick={() => navigate("/login")}
              >
                로그인
              </Button>
              <Button
                size="sm"
                className="rounded-full px-6 font-semibold shadow-sm transition-shadow hover:shadow-md active:bg-primary/80"
                onClick={() => navigate("/signup")}
              >
                시작하기
              </Button>
            </>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="메뉴 열기"
                className="active:bg-accent/80"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(20rem,calc(100vw-1rem))] flex-col p-0"
            >
              <div className="border-b px-5 py-4">
                <SheetHeader className="text-left">
                  <SheetTitle className="sr-only">주 메뉴</SheetTitle>
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className="w-fit rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-65"
                      aria-label="알고고 홈"
                    >
                      <Logo size="sm" />
                    </Link>
                  </SheetClose>
                </SheetHeader>
              </div>
              <nav
                aria-label="모바일 메뉴"
                className="flex-1 overflow-y-auto px-5 py-6"
              >
                <section aria-labelledby="mobile-problem-menu">
                  <p
                    id="mobile-problem-menu"
                    className="px-3 text-xs font-semibold text-muted-foreground"
                  >
                    문제
                  </p>
                  <div className="mt-2 flex flex-col gap-1">
                    {problemNavGroup.items.map((item) =>
                      !item.disabled ? (
                        <SheetClose key={item.title} asChild>
                          <Link
                            to={item.href}
                            aria-current={
                              item.href === "/"
                                ? pathname === "/"
                                  ? "page"
                                  : undefined
                                : pathname.startsWith(item.href)
                                  ? "page"
                                  : undefined
                            }
                            className={cn(
                              "group flex min-h-12 items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring active:bg-accent/80",
                              (item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href)) &&
                                "bg-accent text-accent-foreground",
                            )}
                          >
                            <span>
                              <span className="block">{item.title}</span>
                              <span className="mt-0.5 block text-xs font-normal text-muted-foreground group-hover:text-accent-foreground">
                                {item.description}
                              </span>
                            </span>
                            <ChevronRight
                              aria-hidden="true"
                              className="size-4 shrink-0 text-muted-foreground/70 transition-transform group-hover:translate-x-0.5"
                            />
                          </Link>
                        </SheetClose>
                      ) : (
                        <span
                          key={item.title}
                          aria-disabled="true"
                          className="flex min-h-12 cursor-not-allowed items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted-foreground/55"
                        >
                          <span>
                            <span className="block font-medium">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-xs">
                              {item.description}
                            </span>
                          </span>
                          <span className="text-xs">준비 중</span>
                        </span>
                      ),
                    )}
                  </div>
                </section>
                <section
                  aria-labelledby="mobile-prepared-menu"
                  className="mt-7 border-t pt-6"
                >
                  <p
                    id="mobile-prepared-menu"
                    className="px-3 text-xs font-semibold text-muted-foreground"
                  >
                    다른 메뉴
                  </p>
                  <div className="mt-2 flex flex-col">
                    {preparedNavItems.map((item) => (
                      <span
                        key={item}
                        aria-disabled="true"
                        title="준비 중"
                        className="flex min-h-11 cursor-not-allowed items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground/55"
                      >
                        {item}
                        <span className="text-xs font-normal">준비 중</span>
                      </span>
                    ))}
                  </div>
                </section>
              </nav>
              <div className="mt-auto border-t bg-muted/30 p-5">
                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>화면 테마</span>
                  <ThemeToggle />
                </div>
                {me ? (
                  <div className="grid gap-3">
                    <Button
                      variant="outline"
                      className="active:bg-accent/80"
                      onClick={() => navigateAndClose("/me")}
                    >
                      마이페이지
                    </Button>
                    <Button
                      variant="ghost"
                      className="active:bg-accent/80"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                    >
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="active:bg-accent/80"
                      onClick={() => navigateAndClose("/login")}
                    >
                      로그인
                    </Button>
                    <Button
                      size="lg"
                      className="active:bg-primary/80"
                      onClick={() => navigateAndClose("/signup")}
                    >
                      시작하기
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
