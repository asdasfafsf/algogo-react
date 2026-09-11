import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import OAuthCard from "@components/me/OAuthCard";
import My from "@/page/My";
import ModalProvider from "@/plugins/modal/ModalProvider";
import { Button } from "@/components/ui/button";
import useMeStore from "@/zustand/MeStore";
import "../../src/index.css";

const loggedInUser: Me = {
  uuid: "fixture-user",
  name: "홍길동",
  profilePhoto:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%23dbeafe'/%3E%3C/svg%3E",
  email: "fixture@example.invalid",
  socialList: [{ provider: "github", content: "fixture-user" }],
  oauthList: [{ provider: "google" }],
};

type FixtureMode = "logged-in" | "save-failure" | "load-error";

function setFixtureSession(mode: FixtureMode) {
  if (mode === "load-error") {
    localStorage.setItem("accessToken", "fixture-token");
    useMeStore.setState({
      me: null,
      fetchMe: async () => null,
    });
    return;
  }

  localStorage.removeItem("accessToken");
  useMeStore.setState({
    me: loggedInUser,
    fetchMe: async () => loggedInUser,
    updateMe: async (request) => {
      if (mode === "save-failure") {
        return {
          statusCode: 503,
          errorCode: "DATABASE_TIMEOUT",
          errorMessage: "SQL timeout: profile-service.internal/fixture-user",
          data: null,
        };
      }
      const nextUser = {
        ...loggedInUser,
        name: request.name ?? loggedInUser.name,
        profilePhoto: request.file
          ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Ccircle cx='48' cy='48' r='48' fill='%2393c5fd'/%3E%3C/svg%3E"
          : loggedInUser.profilePhoto,
        socialList: request.socialList ?? loggedInUser.socialList,
      };
      useMeStore.setState({ me: nextUser });
      return {
        statusCode: 200,
        errorCode: "0000",
        errorMessage: "",
        data: nextUser,
      };
    },
  });
}

setFixtureSession("logged-in");

function MyProfileFixture() {
  const [mode, setMode] = useState<FixtureMode>("logged-in");
  const [pending, setPending] = useState(false);
  const currentMe = useMeStore((state) => state.me);

  const changeMode = (nextMode: FixtureMode) => {
    setFixtureSession(nextMode);
    setMode(nextMode);
  };

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-4 sm:p-8">
      <header className="space-y-3 border-b border-border pb-5">
        <h1 className="font-display text-xl font-bold">내 정보 fixture</h1>
        <div className="flex flex-wrap gap-2" aria-label="fixture 상태 전환">
          <Button variant="outline" onClick={() => changeMode("logged-in")}>
            저장 성공 상태
          </Button>
          <Button variant="outline" onClick={() => changeMode("save-failure")}>
            저장 실패 상태
          </Button>
          <Button variant="outline" onClick={() => changeMode("load-error")}>
            불러오기 오류
          </Button>
        </div>
      </header>

      <My key={mode} />

      <output
        aria-label="fixture 프로필 상태"
        className="block rounded border border-dashed border-border p-3 text-sm"
      >
        {currentMe
          ? `${currentMe.name} | 사진 ${currentMe.profilePhoto ? "보존" : "없음"} | 소셜 ${currentMe.socialList.map(({ provider }) => provider).join(", ")}`
          : "로그아웃 상태"}
      </output>

      <section className="space-y-3 border-t border-border pt-6">
        <div>
          <h2 className="font-display text-lg font-semibold">연결 대기 상태</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            OAuth 이동 직전 버튼 상태를 확인합니다.
          </p>
        </div>
        <OAuthCard
          provider="kakao"
          name="Kakao"
          icon="/kakao_icon.png"
          description="Kakao 계정을 연결해 로그인할 수 있습니다."
          isConnected={false}
          pendingAction={pending ? "connect" : null}
          disabled={pending}
          onConnect={() => setPending(true)}
          onDisconnect={() => undefined}
        />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/fixture/my-profile"]}>
      <ModalProvider>
        <MyProfileFixture />
      </ModalProvider>
    </MemoryRouter>
  </StrictMode>,
);
