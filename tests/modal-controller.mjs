import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: ModalController } = await server.ssrLoadModule(
    "/src/plugins/modal/ModalController.ts",
  );
  let flag = 0;
  const controller = new ModalController([
    flag,
    (update) => {
      flag = typeof update === "function" ? update(flag) : update;
    },
  ]);
  const DummyModal = () => null;

  const firstResult = controller.push("Alert", DummyModal, { label: "first" });
  const secondResult = controller.push("Alert", DummyModal, {
    label: "second",
  });
  const [first] = controller.list();

  assert.equal(controller.list().length, 1);
  controller.commitRender(flag);
  const second = controller.list()[1];

  assert.notEqual(first.id, second.id);
  assert.equal(first.key, "Alert");
  assert.equal(second.key, "Alert");

  second.element.props.resolve("second");
  assert.equal(await secondResult, "second");
  assert.deepEqual(
    controller.list().map(({ id }) => id),
    [first.id],
  );

  second.element.props.resolve("ignored");
  assert.deepEqual(
    controller.list().map(({ id }) => id),
    [first.id],
  );

  first.element.props.resolve("first");
  assert.equal(await firstResult, "first");
  assert.deepEqual(controller.list(), []);
  controller.commitRender(flag);

  const loading = controller.open("loading-modal", DummyModal, {});
  assert.equal(controller.list()[0].id, loading.id);
  loading.resolve(undefined);
  assert.equal(await loading.result, undefined);
  assert.deepEqual(controller.list(), []);

  let pendingFlag = 0;
  const pendingController = new ModalController([
    pendingFlag,
    (update) => {
      pendingFlag = typeof update === "function" ? update(pendingFlag) : update;
    },
  ]);
  const blocker = pendingController.open("Alert", DummyModal, {});
  const pendingLoading = pendingController.open(
    "loading-modal",
    DummyModal,
    {},
  );

  assert.deepEqual(
    pendingController.list().map(({ id }) => id),
    [blocker.id],
  );
  pendingLoading.resolve(undefined);
  assert.equal(await pendingLoading.result, undefined);
  pendingController.commitRender(pendingFlag);
  assert.deepEqual(
    pendingController.list().map(({ id }) => id),
    [blocker.id],
  );
  blocker.resolve(undefined);
  await blocker.result;

  let strictModeFlag = 0;
  const strictModeController = new ModalController([
    strictModeFlag,
    (update) => {
      strictModeFlag =
        typeof update === "function" ? update(strictModeFlag) : update;
    },
  ]);
  const strictModeFirst = strictModeController.open("Alert", DummyModal, {});
  const strictModeSecond = strictModeController.open("Alert", DummyModal, {});
  const strictModeThird = strictModeController.open("Alert", DummyModal, {});
  const firstRenderVersion = strictModeFlag;

  strictModeController.commitRender(firstRenderVersion);
  assert.deepEqual(
    strictModeController.list().map(({ id }) => id),
    [strictModeFirst.id, strictModeSecond.id],
  );
  strictModeController.commitRender(firstRenderVersion);
  assert.deepEqual(
    strictModeController.list().map(({ id }) => id),
    [strictModeFirst.id, strictModeSecond.id],
  );
  strictModeController.commitRender(strictModeFlag);
  assert.deepEqual(
    strictModeController.list().map(({ id }) => id),
    [strictModeFirst.id, strictModeSecond.id, strictModeThird.id],
  );

  strictModeThird.resolve(undefined);
  strictModeSecond.resolve(undefined);
  strictModeFirst.resolve(undefined);
  await Promise.all([
    strictModeFirst.result,
    strictModeSecond.result,
    strictModeThird.result,
  ]);

  console.log("ALGOGO-100 modal controller tests passed");
} finally {
  await server.close();
}
