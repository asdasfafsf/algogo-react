import { CheckCircle2, Loader2, Unlink } from "lucide-react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

interface OAuthCardProps {
  provider: OAuthProvider;
  name: string;
  icon: string;
  description: string;
  isConnected: boolean;
  pendingAction: "connect" | "disconnect" | null;
  disabled: boolean;
  onConnect: (e: React.MouseEvent, provider: OAuthProvider) => void;
  onDisconnect: (e: React.MouseEvent, provider: OAuthProvider) => void;
}

export default function OAuthCard({
  provider,
  name,
  icon,
  description,
  isConnected,
  pendingAction,
  disabled,
  onConnect,
  onDisconnect,
}: OAuthCardProps) {
  const isPending = pendingAction !== null;

  return (
    <Card className="border-border/60 bg-background shadow-none">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white shadow-xs">
            <img src={icon} alt="" className="size-7 object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display font-semibold">{name}</p>
            <div
              className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${
                isConnected
                  ? "text-emerald-600 dark:text-emerald-300"
                  : "text-muted-foreground"
              }`}
            >
              {isConnected ? (
                <CheckCircle2 className="size-3.5" />
              ) : (
                <span className="size-2 rounded-full bg-muted-foreground/40" />
              )}
              {isConnected ? "연결됨" : "연결되지 않음"}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {isConnected ? (
          <Button
            variant="outline"
            className="mt-5 w-full text-destructive hover:text-destructive"
            disabled={disabled}
            onClick={(event) => onDisconnect(event, provider)}
          >
            {isPending ? <Loader2 className="animate-spin" /> : <Unlink />}
            {isPending ? "연결 해제 중..." : "연결 해제"}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="mt-5 w-full"
            disabled={disabled}
            onClick={(event) => onConnect(event, provider)}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? "연결 중..." : "계정 연결"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
