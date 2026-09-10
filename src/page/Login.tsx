import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { LogoWithText } from "@components/common";
import { Button as ShadcnButton } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { createOAuthEntryUrl } from "@/domain/account/oauth";

const { VITE_ENV } = import.meta.env;

interface LoginProps {
  name?: "로그인" | "회원가입";
}

export default function Login({ name = "로그인" }: LoginProps) {
  const params = new URLSearchParams(window.location.search);
  const destination = params.get("destination") || "";

  const navigate = useNavigate();
  const handleOAuth = async (
    _e: React.MouseEvent<HTMLButtonElement>,
    provider: "google" | "kakao" | "github",
  ) => {
    const url = createOAuthEntryUrl({
      environment: VITE_ENV,
      provider,
      destination,
    });

    window.location.href = url;
  };
  return (
    <section className="grid min-h-dvh place-items-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <LogoWithText size="medium" />
        </div>
        <Card className="gap-0 overflow-hidden border-border/80 p-0 shadow-sm">
          <CardHeader className="space-y-2 px-8 pt-8 text-center">
            <CardTitle className="text-2xl">{name}</CardTitle>
            <CardDescription>
              알고고에서 다음 문제를 이어가세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-8 pt-6">
            <ShadcnButton
              variant="outline"
              className="h-12 w-full gap-3"
              onClick={(e) => handleOAuth(e, "google")}
            >
              <img src="/google-mark.png" alt="" className="size-5" />
              구글로 시작하기
            </ShadcnButton>
            <ShadcnButton
              className="h-12 w-full gap-3 bg-kakao text-black hover:bg-kakao/85"
              onClick={(e) => handleOAuth(e, "kakao")}
            >
              <img src="/kakao_icon.png" alt="" className="size-5" />
              카카오로 시작하기
            </ShadcnButton>
            <div className="flex items-center gap-3 py-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">또는</span>
              <Separator className="flex-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <ShadcnButton variant="outline" onClick={() => navigate("/")}>
                처음으로
              </ShadcnButton>
              <ShadcnButton variant="ghost" onClick={() => navigate(-1)}>
                이전으로
              </ShadcnButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
