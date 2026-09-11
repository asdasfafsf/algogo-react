import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { Button } from "@components/ui/button";
import Header from "@layout/Header";
import { LandingFooter, LandingHeader } from "@layout/landing";
import useMeStore from "@zustand/MeStore";
import "../../src/index.css";

const sampleMe: Me = {
  uuid: "layout-shell-user",
  name: "샘플 사용자",
  profilePhoto: "",
  email: "layout-shell@example.invalid",
  socialList: [],
  oauthList: [],
};

function FixtureControls({
  view,
  onViewChange,
}: {
  view: "app" | "landing";
  onViewChange: (view: "app" | "landing") => void;
}) {
  const me = useMeStore((state) => state.me);

  return (
    <section
      aria-label="fixture 제어"
      className="rounded-xl border bg-card p-5 shadow-sm"
    >
      <h2 className="text-sm font-semibold">검증 화면</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          variant={view === "app" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewChange("app")}
        >
          앱 셸
        </Button>
        <Button
          variant={view === "landing" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewChange("landing")}
        >
          랜딩 셸
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => useMeStore.getState().setMe(me ? null : sampleMe)}
        >
          {me ? "로그아웃 메뉴 보기" : "로그인 메뉴 보기"}
        </Button>
      </div>
    </section>
  );
}

function CurrentPath() {
  const { pathname } = useLocation();
  return (
    <p className="mt-4 text-sm text-muted-foreground">
      현재 경로: <output aria-label="현재 fixture 경로">{pathname}</output>
    </p>
  );
}

function LayoutShellFixture() {
  const [view, setView] = useState<"app" | "landing">("app");

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {view === "app" ? <Header /> : <LandingHeader />}
      <main className={view === "landing" ? "flex-1 pt-24" : "flex-1"}>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <FixtureControls view={view} onViewChange={setView} />
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              {view === "app" ? "앱 레이아웃" : "랜딩 레이아웃"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              실제 헤더와 푸터의 링크, 메뉴, 포커스 동작을 확인합니다.
            </p>
            <CurrentPath />
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/"]}>
      <LayoutShellFixture />
    </MemoryRouter>
  </StrictMode>,
);
