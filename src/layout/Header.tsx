import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { LogoWithText } from "@components/common";
import { ProfileMenu } from "@components/Dropdown";
import useMeStore from "@zustand/MeStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  const navigate = useNavigate();
  const me = useMeStore((state) => state.me);
  const logout = useMeStore((state) => state.logout);
  const [open, setOpen] = useState(false);
  const menu = {
    title: "문제",
    subTitle: "문제 풀기",
    pathList: ["/problem", "/"],
    subMenuList: [
      { title: "전체 문제", pathList: ["/problem", "/"], canAccess: true },
      { title: "오늘의 문제", pathList: ["/problem/today"], canAccess: true },
      {
        title: "유형별 (준비중)",
        pathList: ["/problem/type"],
        canAccess: false,
      },
    ],
  };
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <div className="flex h-full items-center gap-10">
            <LogoWithText size="medium" />
            <nav aria-label="주 메뉴" className="hidden h-full md:flex">
              <HeaderMenu menuItem={menu} />
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              {me ? (
                <ProfileMenu me={me} />
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate("/login")}>
                    로그인
                  </Button>
                  <Button onClick={() => navigate("/signup")}>회원가입</Button>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="메뉴 열기"
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>
      <div className="h-16" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>알고고 메뉴</DialogTitle>
            <DialogDescription>
              문제를 탐색하고 계정을 관리하세요.
            </DialogDescription>
          </DialogHeader>
          <nav aria-label="모바일 메뉴" className="grid gap-2">
            {menu.subMenuList.map((item) =>
              item.canAccess ? (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="justify-start"
                  asChild
                >
                  <Link to={item.pathList[0]} onClick={() => setOpen(false)}>
                    {item.title}
                  </Link>
                </Button>
              ) : (
                <Button
                  key={item.title}
                  variant="ghost"
                  disabled
                  className="justify-start"
                >
                  {item.title}
                </Button>
              ),
            )}
            <div className="my-2 border-t" />
            {me ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/me");
                    setOpen(false);
                  }}
                >
                  마이페이지
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                >
                  로그인
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/signup");
                    setOpen(false);
                  }}
                >
                  회원가입
                </Button>
              </>
            )}
          </nav>
        </DialogContent>
      </Dialog>
    </>
  );
}
