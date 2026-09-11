import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import apiClient from "@api/apiClient";
import ModalProvider from "@plugins/modal/ModalProvider";
import { ScreenSizeProvider } from "@/context/ScreenSizeContext";
import ProblemSection from "@layout/problem/ProblemSection";
import useCodeEditorStore from "@zustand/CodeEditorStore";
import useMeStore from "@zustand/MeStore";
import "../../src/index.css";
import "../../src/loader/MonacoLoader";

declare global {
  interface Window {
    __algogoGuestQa: {
      codeRequests: string[];
      runtimeErrors: string[];
    };
  }
}

localStorage.removeItem("me");
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
useMeStore.setState({ me: null });
useCodeEditorStore.setState({
  language: "Python",
  code: [
    "def solve(numbers):",
    "    return sum(numbers)",
    "",
    "print(solve([1, 2, 3]))",
  ].join("\n"),
});

apiClient.interceptors.request.use((config) => {
  if (!config.url?.startsWith("/api/v1/code")) return config;

  window.__algogoGuestQa.codeRequests.push(config.url);
  window.dispatchEvent(new Event("algogo-guest-qa-change"));
  config.adapter = async () => ({
    data: {
      statusCode: 503,
      errorCode: "FIXTURE_REQUEST_BLOCKED",
      errorMessage: "fixture blocked an unexpected guest code request",
      data: null,
    },
    status: 503,
    statusText: "Service Unavailable",
    headers: {},
    config,
  });
  return config;
});

function QaStatus() {
  const location = useLocation();
  const [, refresh] = useState(0);

  useEffect(() => {
    const handleChange = () => refresh((value) => value + 1);
    window.addEventListener("algogo-guest-qa-change", handleChange);
    return () =>
      window.removeEventListener("algogo-guest-qa-change", handleChange);
  }, []);

  return (
    <div className="flex h-12 items-center gap-4 border-b bg-background px-4 text-xs">
      <span>
        코드 API:{" "}
        <output aria-label="코드 API 요청 수">
          {window.__algogoGuestQa.codeRequests.length}
        </output>
      </span>
      <span>
        런타임 오류:{" "}
        <output aria-label="런타임 오류 수">
          {window.__algogoGuestQa.runtimeErrors.length}
        </output>
      </span>
      <span className="min-w-0 truncate">
        현재 경로:{" "}
        <output aria-label="현재 fixture 경로">
          {[location.pathname, location.search, location.hash].join("")}
        </output>
      </span>
    </div>
  );
}

function GuestProblemFixture() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <QaStatus />
      <div className="min-h-0 flex-1">
        <ProblemSection problem={undefined} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <MemoryRouter initialEntries={["/problem/fixture-guest?tab=code#editor"]}>
    <ScreenSizeProvider>
      <ModalProvider>
        <GuestProblemFixture />
      </ModalProvider>
    </ScreenSizeProvider>
  </MemoryRouter>,
);
