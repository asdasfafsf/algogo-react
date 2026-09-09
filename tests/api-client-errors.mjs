import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import axios from '../node_modules/axios/index.js';
import { createServer } from '../node_modules/vite/dist/node/index.js';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const storage = new Map();

globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
};
globalThis.window = { location: { href: '', pathname: '/problems' } };

const server = await createServer({
  root: projectRoot,
  plugins: [
    {
      name: 'mock-modal-provider',
      enforce: 'pre',
      resolveId(id) {
        return id.includes('plugins/modal/ModalProvider') ? '\0mock-modal-provider' : undefined;
      },
      load(id) {
        return id === '\0mock-modal-provider' ? 'export const showAlert = undefined;' : undefined;
      },
    },
  ],
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const [{ default: apiClient }, { useProblemListStore }] = await Promise.all([
    server.ssrLoadModule('/src/api/apiClient.ts'),
    server.ssrLoadModule('/src/zustand/ProblemListStore.ts'),
  ]);

  const expectOriginalRejection = async (error) => {
    apiClient.defaults.adapter = async () => Promise.reject(error);
    await assert.rejects(apiClient.get('/test'), (received) => received === error);
  };

  const networkError = Object.assign(new Error('Network Error'), { config: {} });
  await expectOriginalRejection(networkError);

  const serverError = Object.assign(new Error('Server Error'), {
    config: {},
    response: { status: 500, data: { statusCode: 500 } },
  });
  await expectOriginalRejection(serverError);

  storage.clear();
  const noRefreshError = Object.assign(new Error('Expired'), {
    config: {},
    response: { status: 401, data: { statusCode: 401, errorCode: 'JWT_EXPIRED' } },
  });
  await expectOriginalRejection(noRefreshError);

  storage.set('refreshToken', 'old-refresh');
  const originalPost = axios.post;
  axios.post = async () => ({
    data: { data: { accessToken: 'new-access', refreshToken: 'new-refresh' } },
  });
  let attempts = 0;
  apiClient.defaults.adapter = async (config) => {
    attempts += 1;
    if (attempts === 1) {
      return Promise.reject(
        Object.assign(new Error('Expired'), {
          config,
          response: { status: 401, data: { statusCode: 401, errorCode: 'JWT_EXPIRED' } },
        }),
      );
    }
    return { data: { ok: true }, status: 200, statusText: 'OK', headers: {}, config };
  };
  const refreshed = await apiClient.get('/test');
  assert.deepEqual(refreshed.data, { ok: true });
  assert.equal(storage.get('accessToken'), 'new-access');
  assert.equal(storage.get('refreshToken'), 'new-refresh');
  axios.post = originalPost;

  apiClient.defaults.adapter = async (config) => ({
    data: { ok: true },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  });
  const success = await apiClient.get('/test');
  assert.deepEqual(success.data, { ok: true });

  storage.clear();
  apiClient.defaults.adapter = async () => Promise.reject(networkError);
  useProblemListStore.setState({ isFetching: true });
  await assert.rejects(
    useProblemListStore.getState().fetchProblemList({ pageNo: 1, pageSize: 20 }, []),
    (received) => received === networkError,
  );
  assert.equal(useProblemListStore.getState().isFetching, false);

  console.log('ALGOGO-75 API error regression tests passed');
} finally {
  await server.close();
}
