import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [{ problemNavGroup, preparedNavItems }, headerMenu, header] =
    await Promise.all([
      server.ssrLoadModule("/src/config/nav.ts"),
      readFile(
        new URL("../src/layout/HeaderMenu.tsx", import.meta.url),
        "utf8",
      ),
      readFile(new URL("../src/layout/Header.tsx", import.meta.url), "utf8"),
    ]);

  assert.deepEqual(
    problemNavGroup.items.map(({ title, href, disabled = false }) => ({
      title,
      href,
      disabled,
    })),
    [
      { title: "모든 문제", href: "/", disabled: false },
      { title: "오늘의 문제", href: "/problem/today", disabled: false },
      { title: "유형별 문제", href: "/problem/type", disabled: true },
    ],
  );
  assert.deepEqual(preparedNavItems, ["대회", "랭킹", "커뮤니티"]);
  assert.match(headerMenu, /<NavigationMenu aria-label="주 메뉴">/);
  assert.match(headerMenu, /preparedItems = \[\]/);
  assert.match(headerMenu, /<PreparedNavItem label=\{item\} \/>/);
  assert.doesNotMatch(header, /aria-label="주 메뉴"/);
  assert.match(headerMenu, /grid w-\[600px\] grid-cols-2 gap-3 p-4/);
  assert.match(headerMenu, /aria-current=\{active \? "page" : undefined\}/);
  assert.match(headerMenu, /aria-disabled="true"/);
  assert.match(headerMenu, /focus-visible:ring-2/);
  assert.match(header, /w-\[min\(20rem,calc\(100vw-1rem\)\)\]/);
  assert.match(header, /aria-label="모바일 메뉴"/);
  assert.match(header, /<SheetClose key=\{item.title\} asChild>/);

  console.log("ALGOGO-145 header navigation tests passed");
} finally {
  await server.close();
}
