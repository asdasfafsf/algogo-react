import { Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import useConnectedInfo from "@hook/me/useConnectedInfo";
import OAuthCard from "./OAuthCard";

const oauthPlatforms = [
  {
    provider: "google" as OAuthProvider,
    name: "Google",
    icon: "/google-mark.png",
    description: "Google 계정으로 알고고에 로그인할 수 있습니다.",
  },
  {
    provider: "kakao" as OAuthProvider,
    name: "Kakao",
    icon: "/kakao_icon.png",
    description: "Kakao 계정으로 알고고에 로그인할 수 있습니다.",
  },
] as const;

export default function OAuthConnectedInfo() {
  const { me, pendingAction, handleDisconnect, handleConnect } =
    useConnectedInfo();

  if (!me) return null;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 font-display text-lg">
          <Link2 className="size-5 text-muted-foreground" />
          로그인 계정 연결
        </CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Google 또는 Kakao 계정을 연결해 로그인 방법을 관리하세요.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {oauthPlatforms.map((platform) => {
          const platformPending =
            pendingAction?.provider === platform.provider
              ? pendingAction.action
              : null;
          return (
            <OAuthCard
              key={platform.provider}
              {...platform}
              isConnected={me.oauthList.some(
                ({ provider }) => provider === platform.provider,
              )}
              pendingAction={platformPending}
              disabled={pendingAction !== null}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
