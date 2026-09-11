import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
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
            <p className="font-display text-lg font-semibold">
              내 정보를 확인하고 있어요
            </p>
          </div>
        )}

        {visibleStatus === "guest" && (
          <section className="mx-auto max-w-xl border-y border-border py-14 text-center sm:py-16">
            <h1 className="font-display text-2xl font-bold">
              로그인이 필요해요
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              내 정보와 연결한 계정은 로그인한 뒤 볼 수 있어요.
            </p>
            <Button asChild size="lg" className="mt-8 active:translate-y-px">
              <Link to="/login?destination=%2Fme">로그인</Link>
            </Button>
          </section>
        )}

        {visibleStatus === "error" && (
          <section className="mx-auto max-w-xl border-y border-border py-14 text-center sm:py-16">
            <h1 className="font-display text-2xl font-bold">
              내 정보를 불러오지 못했어요
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              잠시 후 다시 시도하거나 로그인해 주세요.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                variant="outline"
                size="lg"
                className="active:translate-y-px"
                onClick={() => void loadProfile()}
              >
                <RefreshCw />
                다시 시도
              </Button>
              <Button asChild size="lg" className="active:translate-y-px">
                <Link to="/login?destination=%2Fme">로그인</Link>
              </Button>
            </div>
          </section>
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
