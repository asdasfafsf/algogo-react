import {
  oauthFailure,
  oauthSuccess,
  type OAuthCallbackOutcome,
  type OAuthFlow,
} from "../../domain/account/oauth";

interface OAuthResponse {
  errorCode: string;
  data?: { accessToken: string; refreshToken: string };
}

export interface OAuthCallbackDependencies {
  request: (provider: string, code: string) => Promise<OAuthResponse>;
  saveTokens?: (tokens: { accessToken: string; refreshToken: string }) => void;
  fetchMe?: () => Promise<{ oauthList: readonly unknown[] } | null>;
}

export const executeOAuthCallback = async ({
  flow,
  provider,
  code,
  destination,
  dependencies,
}: {
  flow: OAuthFlow;
  provider: string;
  code: string;
  destination: string;
  dependencies: OAuthCallbackDependencies;
}): Promise<OAuthCallbackOutcome> => {
  try {
    const response = await dependencies.request(provider, code);
    if (response.errorCode !== "0000") return oauthFailure(flow);

    if (flow === "login") {
      if (!response.data || !dependencies.saveTokens || !dependencies.fetchMe) {
        return oauthFailure(flow);
      }
      dependencies.saveTokens(response.data);
      await dependencies.fetchMe();
      return oauthSuccess(flow, destination);
    }

    if (flow === "disconnect") {
      if (!dependencies.fetchMe) return oauthFailure(flow);
      const me = await dependencies.fetchMe();
      return oauthSuccess(flow, destination, me?.oauthList.length);
    }

    return oauthSuccess(flow, destination);
  } catch {
    return oauthFailure(flow);
  }
};

export const executeLegacyOAuthCallback = async ({
  destination,
  fetchToken,
  fetchMe,
}: {
  destination: string;
  fetchToken: () => Promise<void>;
  fetchMe: () => Promise<unknown>;
}): Promise<
  | { type: "success"; destination: string }
  | { type: "failure"; destination: "/login" }
> => {
  try {
    await fetchToken();
    await fetchMe();
    return { type: "success", destination: destination || "/" };
  } catch {
    return { type: "failure", destination: "/login" };
  }
};
