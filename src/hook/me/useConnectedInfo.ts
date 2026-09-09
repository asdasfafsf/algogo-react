import useMeStore from "@zustand/MeStore";
import { useCallback } from "react";
import useConfirmModal from "@hook/useConfirmModal";
import {
  createOAuthEntryUrl,
  disconnectConfirmation,
} from "@/domain/account/oauth";

export default function useConnectedInfo() {
  const { VITE_ENV } = import.meta.env;
  const me = useMeStore((state) => state.me);
  const [confirm] = useConfirmModal();
  const handleConnect = useCallback(
    async (_: unknown, provider: OAuthProvider) => {
      if (!me) {
        return;
      }

      const isOk = await confirm("연동하시겠습니까?");

      if (!isOk) {
        return;
      }

      window.location.href = createOAuthEntryUrl({
        environment: VITE_ENV,
        provider,
        destination: "/me",
        action: "connect",
      });
    },
    [me],
  );
  const handleDisconnect = useCallback(
    async (_: unknown, provider: OAuthProvider) => {
      const oauthList = me?.oauthList ?? [];
      const message = disconnectConfirmation(oauthList.length);
      const isOk = await confirm(message);

      if (!isOk) {
        return;
      }

      window.location.href = createOAuthEntryUrl({
        environment: VITE_ENV,
        provider,
        destination: "/me",
        action: "disconnect",
      });
    },
    [me],
  );

  return {
    me,
    handleConnect,
    handleDisconnect,
  };
}
