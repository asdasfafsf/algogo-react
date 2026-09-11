import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import Logo from "@components/brand/Logo";
import OAuthCallbackStatus from "@components/me/OAuthCallbackStatus";
import PageState from "@components/page-state/PageState";
import { Button } from "@components/ui/button";
import My from "@/page/My";
import useMeStore from "@zustand/MeStore";
import "../../src/index.css";

useMeStore.setState({
  me: null,
  fetchMe: async () => null,
});

function LocationOutput() {
  const { pathname, search } = useLocation();
  return (
    <output aria-label="현재 fixture 경로">{`${pathname}${search}`}</output>
  );
}

function PageStatesFixture() {
  const [retryCount, setRetryCount] = useState(0);

  return (
    <main className="mx-auto grid max-w-5xl gap-10 p-6 sm:p-10">
      <header className="flex items-center gap-2 border-b border-border pb-5">
        <Logo size="sm" />
        <h1 className="text-lg font-semibold">화면 상태 검증</h1>
      </header>

      <PageState
        title="찾는 페이지가 없어요"
        description="주소가 바뀌었거나 잘못 입력됐을 수 있어요."
        detail="확인용 안내 문장"
      >
        <Button
          variant="outline"
          className="active:translate-y-px"
          onClick={() => setRetryCount((count) => count + 1)}
        >
          이전으로
        </Button>
        <Button asChild className="active:translate-y-px">
          <a href="/problem">문제 목록으로</a>
        </Button>
      </PageState>
      <output aria-label="이전 동작 횟수">{retryCount}</output>

      <section className="border-t border-border pt-10">
        <OAuthCallbackStatus
          title="로그인을 마치고 있어요"
          description="잠시만 기다려 주세요. 곧 원래 보던 화면으로 돌아가요."
        />
      </section>

      <section className="border-t border-border pt-10">
        <h2 className="mb-4 text-lg font-semibold">비로그인 내 정보</h2>
        <My />
      </section>

      <section className="border-t border-border pt-6">
        <LocationOutput />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/fixture"]}>
      <PageStatesFixture />
    </MemoryRouter>
  </StrictMode>,
);
