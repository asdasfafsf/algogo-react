import useMeStore from "@zustand/MeStore";
import { useCallback, useState } from "react";
import useConfirmModal from "@hook/useConfirmModal";
import {
  createOAuthEntryUrl,
  disconnectConfirmation,
} from "@/domain/account/oauth";

export default function useConnectedInfo() {
  const { VITE_ENV } = import.meta.env;
  const me = useMeStore((state) => state.me);
  const [confirm] = useConfirmModal();
  const [pendingAction, setPendingAction] = useState<{
    provider: OAuthProvider;
    action: "connect" | "disconnect";
  } | null>(null);
  const handleConnect = useCallback(
    async (_: unknown, provider: OAuthProvider) => {
      if (!me || pendingAction) return;

      const isOk = await confirm("연동하시겠습니까?");

      if (!isOk) {
        return;
      }

      setPendingAction({ provider, action: "connect" });
      window.location.href = createOAuthEntryUrl({
        environment: VITE_ENV,
        provider,
        destination: "/me",
        action: "connect",
      });
    },
    [confirm, me, pendingAction],
  );
  const handleDisconnect = useCallback(
    async (_: unknown, provider: OAuthProvider) => {
      if (!me || pendingAction) return;

      const oauthList = me?.oauthList ?? [];
      const message = disconnectConfirmation(oauthList.length);
      const isOk = await confirm(message);

      if (!isOk) {
        return;
      }

      setPendingAction({ provider, action: "disconnect" });
      window.location.href = createOAuthEntryUrl({
        environment: VITE_ENV,
        provider,
        destination: "/me",
        action: "disconnect",
      });
    },
    [confirm, me, pendingAction],
  );

  return {
    me,
    pendingAction,
    handleConnect,
    handleDisconnect,
  };
}
