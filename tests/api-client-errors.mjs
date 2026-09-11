import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import axios from "../node_modules/axios/index.js";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const storage = new Map();

globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
};
globalThis.window = { location: { href: "", pathname: "/problems" } };

const server = await createServer({
  root: projectRoot,
  plugins: [
    {
      name: "mock-modal-provider",
      enforce: "pre",
      resolveId(id) {
        return id.includes("plugins/modal/ModalProvider")
          ? "\0mock-modal-provider"
          : undefined;
      },
      load(id) {
        return id === "\0mock-modal-provider"
          ? "export const showAlert = undefined;"
          : undefined;
      },
    },
  ],
  server: { middlewareMode: true },
  appType: "custom",
});

function createResponseError(config, statusCode, errorCode = "SERVER_ERROR") {
  return Object.assign(new Error(`HTTP ${statusCode}`), {
    config,
    response: { status: statusCode, data: { statusCode, errorCode } },
  });
}

async function waitFor(predicate, message) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  assert.fail(message);
}

try {
  const { default: apiClient } = await server.ssrLoadModule(
    "/src/api/apiClient.ts",
  );
  const originalPost = axios.post;

  try {
    const expectOriginalRejection = async (error) => {
      apiClient.defaults.adapter = async () => Promise.reject(error);
      await assert.rejects(
        apiClient.get("/test"),
        (received) => received === error,
      );
    };

    const networkError = Object.assign(new Error("Network Error"), {
      config: {},
    });
    await expectOriginalRejection(networkError);

    const serverError = createResponseError({}, 500);
    await expectOriginalRejection(serverError);

    storage.clear();
    const noRefreshError = createResponseError({}, 401, "JWT_EXPIRED");
    await expectOriginalRejection(noRefreshError);

    apiClient.defaults.adapter = async (config) => ({
      data: { ok: true },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });
    const success = await apiClient.get("/test");
    assert.deepEqual(success.data, { ok: true });

    storage.set("accessToken", "old-access");
    storage.set("refreshToken", "old-refresh");
    let refreshCalls = 0;
    let resolveRefresh;
    const refreshResponse = new Promise((resolve) => {
      resolveRefresh = resolve;
    });
    axios.post = async () => {
      refreshCalls += 1;
      return refreshResponse;
    };

    const requestAttempts = new Map();
    apiClient.defaults.adapter = async (config) => {
      const attempts = (requestAttempts.get(config.url) ?? 0) + 1;
      requestAttempts.set(config.url, attempts);

      if (attempts === 1) {
        return Promise.reject(createResponseError(config, 401, "JWT_EXPIRED"));
      }

      return Promise.reject(createResponseError(config, 500));
    };

    const firstRequest = apiClient.get("/first");
    const secondRequest = apiClient.get("/second");
    const firstRetry = assert.rejects(
      firstRequest,
      (error) => error.response?.status === 500,
    );
    const secondRetry = assert.rejects(
      secondRequest,
      (error) => error.response?.status === 500,
    );

    await waitFor(
      () => refreshCalls === 1 && requestAttempts.size === 2,
      "동시 만료 요청이 하나의 refresh를 기다리지 않았습니다.",
    );
    resolveRefresh({
      data: {
        data: { accessToken: "new-access", refreshToken: "new-refresh" },
      },
    });

    await Promise.all([firstRetry, secondRetry]);
    assert.equal(refreshCalls, 1);
    assert.equal(requestAttempts.get("/first"), 2);
    assert.equal(requestAttempts.get("/second"), 2);
    assert.equal(storage.get("accessToken"), "new-access");
    assert.equal(storage.get("refreshToken"), "new-refresh");
  } finally {
    axios.post = originalPost;
  }

  console.log("ALGOGO-75 API error regression tests passed");
} finally {
  await server.close();
}
