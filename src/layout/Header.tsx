import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@components/brand/Logo";
import { ProfileMenu } from "@components/Dropdown";
import ThemeToggle from "@components/ThemeToggle";
import { Button } from "@components/ui/button";
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

const problemItems = [
  {
    title: "모든 문제",
    pathList: ["/"],
    canAccess: true,
  },
  {
    title: "오늘의 문제",
    pathList: ["/problem/today"],
    canAccess: true,
  },
  {
    title: "유형별 문제",
    pathList: ["/problem/type"],
    canAccess: false,
  },
] as const;

const preparedItems = ["대회", "랭킹", "커뮤니티"] as const;

const problemMenu = {
  title: "문제",
  pathList: ["/", "/problem"],
  subMenuList: [...problemItems],
};

function PreparedNavItem({ label }: { label: string }) {
  return (
    <span
      aria-disabled="true"
      aria-label={`${label}, 지금은 선택할 수 없음`}
      title="지금은 선택할 수 없음"
      className="inline-flex h-9 cursor-not-allowed items-center rounded-md px-3 text-sm font-medium text-muted-foreground/55"
    >
      {label}
    </span>
  );
}

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

        <nav
          aria-label="주 메뉴"
          className="hidden flex-1 justify-center md:flex"
        >
          <div className="flex items-center gap-1">
            <HeaderMenu menuItem={problemMenu} />
            {preparedItems.map((item) => (
              <PreparedNavItem key={item} label={item} />
            ))}
          </div>
        </nav>

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
            <SheetContent side="right" className="flex w-[300px] flex-col p-0">
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
                <div>
                  <p className="px-3 text-xs font-semibold text-muted-foreground">
                    문제
                  </p>
                  <div className="mt-2 flex flex-col gap-1">
                    {problemItems.map((item) =>
                      item.canAccess ? (
                        <SheetClose key={item.title} asChild>
                          <Link
                            to={item.pathList[0]}
                            aria-current={
                              item.pathList[0] === pathname ? "page" : undefined
                            }
                            className={cn(
                              "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring active:bg-accent/80",
                              item.pathList[0] === pathname &&
                                "bg-accent text-accent-foreground",
                            )}
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      ) : (
                        <span
                          key={item.title}
                          aria-disabled="true"
                          className="flex cursor-not-allowed items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted-foreground/55"
                        >
                          {item.title}
                          <span className="text-xs">곧</span>
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div className="mt-7 border-t pt-6">
                  <p className="px-3 text-xs font-semibold text-muted-foreground">
                    다른 메뉴
                  </p>
                  <div className="mt-2 flex flex-col">
                    {preparedItems.map((item) => (
                      <span
                        key={item}
                        aria-disabled="true"
                        title="곧 이용할 수 있어요"
                        className="flex cursor-not-allowed items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground/55"
                      >
                        {item}
                        <span className="text-xs font-normal">곧</span>
                      </span>
                    ))}
                  </div>
                </div>
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
