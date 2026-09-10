import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2, LogIn, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BasicMyInfo,
  ExternalConnectedInfo,
  OAuthConnectedInfo,
} from "@components/me";
import ContributionGraph from "@components/me/ContributionGraph";
import RecentActivity from "@components/me/RecentActivity";
import StatsCards from "@components/me/StatsCards";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import useMeStore from "@zustand/MeStore";
import DefaultLayout from "../layout/DefaultLayout";

type ProfileStatus = "checking" | "authenticated" | "guest" | "error";

function My() {
  const me = useMeStore((state) => state.me);
  const fetchMe = useMeStore((state) => state.fetchMe);
  const setMe = useMeStore((state) => state.setMe);
  const [status, setStatus] = useState<ProfileStatus>("checking");
  const hasLoaded = useRef(false);

  const loadProfile = useCallback(async () => {
    setStatus("checking");
    const hadStoredSession = Boolean(
      me ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("refreshToken") ||
      localStorage.getItem("me"),
    );
    const currentMe = await fetchMe();

    if (currentMe) {
      setStatus("authenticated");
      return;
    }

    setMe(null);
    setStatus(hadStoredSession ? "error" : "guest");
  }, [fetchMe, me, setMe]);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    void loadProfile();
  }, [loadProfile]);

  const visibleStatus = status === "authenticated" && !me ? "guest" : status;

  return (
    <DefaultLayout>
      <div className="mx-auto min-h-[60vh] max-w-5xl py-8 sm:py-12">
        {visibleStatus === "checking" && (
          <div
            className="flex min-h-80 flex-col items-center justify-center gap-4 text-center"
            role="status"
          >
            <Loader2 className="size-8 animate-spin text-primary" />
            <div>
              <p className="font-display text-lg font-semibold">
                프로필을 불러오는 중입니다
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                로그인 정보를 확인하고 있어요.
              </p>
            </div>
          </div>
        )}

        {visibleStatus === "guest" && (
          <Card className="mx-auto max-w-xl overflow-hidden border-border/60 shadow-lg">
            <div className="h-2 bg-linear-to-r from-primary via-blue-500 to-primary/60" />
            <CardContent className="flex flex-col items-center px-6 py-14 text-center sm:px-12">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
                <LogIn className="size-7 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold">
                로그인이 필요한 페이지입니다
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                로그인하면 프로필과 연결된 계정을 안전하게 관리할 수 있습니다.
              </p>
              <Button asChild size="lg" className="mt-8 rounded-full px-8">
                <Link to="/login?destination=%2Fme">로그인하고 돌아오기</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {visibleStatus === "error" && (
          <Card className="mx-auto max-w-xl overflow-hidden border-border/60 shadow-lg">
            <div className="h-2 bg-linear-to-r from-amber-500 via-orange-400 to-amber-500/60" />
            <CardContent className="flex flex-col items-center px-6 py-14 text-center sm:px-12">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-amber-500/10">
                <AlertCircle className="size-7 text-amber-600 dark:text-amber-300" />
              </div>
              <h1 className="font-display text-2xl font-bold">
                프로필을 불러오지 못했어요
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                잠시 후 다시 시도하거나 로그인 정보를 새로 확인해주세요.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => void loadProfile()}
                >
                  <RefreshCw />
                  다시 시도
                </Button>
                <Button asChild size="lg">
                  <Link to="/login?destination=%2Fme">다시 로그인</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {visibleStatus === "authenticated" && me && (
          <div className="space-y-8">
            <BasicMyInfo />
            <StatsCards />
            <ContributionGraph />
            <OAuthConnectedInfo />
            <ExternalConnectedInfo />
            <RecentActivity />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default My;
