import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { createServer } from '../node_modules/vite/dist/node/index.js';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { createExecuteSocketUrl } = await server.ssrLoadModule(
    '/src/domain/execute/socketUrl.ts',
  );

  test('개발 환경에서는 프론트 포트와 관계없이 로컬 API 소켓을 사용한다', () => {
    assert.equal(
      createExecuteSocketUrl('development', {
        protocol: 'http:',
        host: 'localhost:5175',
      }),
      'ws://localhost:3001',
    );
    assert.equal(
      createExecuteSocketUrl('development', {
        protocol: 'https:',
        host: 'dev.example.com',
      }),
      'ws://localhost:3001',
    );
  });

  test('운영 환경에서는 현재 호스트와 보안 소켓 프로토콜을 유지한다', () => {
    assert.equal(
      createExecuteSocketUrl('production', {
        protocol: 'https:',
        host: 'www.algogo.co.kr',
      }),
      'wss://www.algogo.co.kr',
    );
  });

  test('HTTP 운영 미리보기에서는 같은 호스트의 ws 주소를 사용한다', () => {
    assert.equal(
      createExecuteSocketUrl('preview', {
        protocol: 'http:',
        host: 'preview.algogo.co.kr:8080',
      }),
      'ws://preview.algogo.co.kr:8080',
    );
  });
} finally {
  await server.close();
}
