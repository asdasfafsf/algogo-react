import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  await assert.rejects(
    access(new URL("../src/zustand/selector.ts", import.meta.url)),
    "The unused selector augmentation utility must remain removed",
  );

  const stores = [
    {
      module: "/src/zustand/ProblemScreenStore.ts",
      exportName: "useProblemScreenStore",
      stateKey: "selectedIndex",
      setValue: 1,
      expectedExports: ["default", "useProblemScreenStore"],
    },
    {
      module: "/src/zustand/CodeResultHeightStore.ts",
      exportName: "useCodeEditorHeightStore",
      stateKey: "codeEditorHeight",
      setValue: 640,
      expectedExports: ["useCodeEditorHeightStore"],
    },
    {
      module: "/src/zustand/ProblemWidthStore.ts",
      exportName: "useProblemWidthStore",
      stateKey: "problemWidth",
      setValue: 640,
      expectedExports: ["default", "useProblemWidthStore"],
    },
    {
      module: "/src/zustand/ExecuteResultListStore.ts",
      exportName: "useExecuteResultListStore",
      stateKey: "executeResultList",
      setValue: [],
      expectedExports: ["default", "useExecuteResultListStore"],
    },
  ];

  for (const definition of stores) {
    const module = await server.ssrLoadModule(definition.module);
    assert.deepEqual(Object.keys(module).sort(), definition.expectedExports);

    const store = module[definition.exportName];
    assert.equal(typeof store.getState, "function");
    assert.equal(typeof store.subscribe, "function");
    assert.equal(store.use, undefined);

    const state = store.getState();
    const setterName = `set${definition.stateKey[0].toUpperCase()}${definition.stateKey.slice(1)}`;
    state[setterName](definition.setValue);
    assert.deepEqual(
      store.getState()[definition.stateKey],
      definition.setValue,
    );
  }

  console.log("ALGOGO-141 direct Zustand store API tests passed");
} finally {
  await server.close();
}
