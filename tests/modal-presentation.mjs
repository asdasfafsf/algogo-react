import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "../node_modules/vite/dist/node/index.js";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

function elementList(node, result = []) {
  if (Array.isArray(node)) {
    for (const child of node) elementList(child, result);
    return result;
  }
  if (!node || typeof node !== "object" || !("props" in node)) return result;

  result.push(node);
  elementList(node.props.children, result);
  return result;
}

function buttonWithText(tree, text) {
  const button = elementList(tree).find(
    (element) =>
      element.props.children === text &&
      typeof element.props.onClick === "function",
  );
  assert.ok(button, `button not found: ${text}`);
  return button;
}

try {
  const [
    { default: AlertModal },
    { default: ConfirmModal },
    { default: LoadingModal },
    { default: CompilerInfoModal },
  ] = await Promise.all([
    server.ssrLoadModule("/src/components/modal/AlertModal.tsx"),
    server.ssrLoadModule("/src/components/modal/ConfirmModal.tsx"),
    server.ssrLoadModule("/src/components/modal/LoadingModal.tsx"),
    server.ssrLoadModule("/src/components/problem/CompilerInfoModal.tsx"),
  ]);

  const alertResults = [];
  const alert = AlertModal({
    content: "안내",
    resolve: (value) => alertResults.push(value),
    reject: () => {},
  });
  alert.props.onOpenChange(false);
  buttonWithText(alert, "확인").props.onClick();
  assert.deepEqual(alertResults, [false, false]);

  const confirmResults = [];
  const confirm = ConfirmModal({
    content: "삭제할까요?",
    confirmText: "삭제",
    variant: "destructive",
    resolve: (value) => confirmResults.push(value),
    reject: () => {},
  });
  assert.equal(buttonWithText(confirm, "삭제").props.variant, "destructive");
  buttonWithText(confirm, "취소").props.onClick();
  buttonWithText(confirm, "삭제").props.onClick();
  confirm.props.onOpenChange(false);
  assert.deepEqual(confirmResults, [false, true, false]);

  for (const [Component, title, buttonText] of [
    [CompilerInfoModal, "컴파일러 정보", "확인"],
  ]) {
    const results = [];
    const tree = Component({
      resolve: (value) => results.push(value),
      reject: () => {},
    });
    assert.equal(tree.props.title, title);
    buttonWithText(tree, buttonText).props.onClick();
    tree.props.onOpenChange(false);
    assert.deepEqual(results, [false, false]);
  }

  const loading = LoadingModal({ message: "불러오는 중" });
  const loadingContent = elementList(loading).find(
    (element) => element.props.showCloseButton === false,
  );
  assert.ok(loadingContent);
  for (const handler of ["onEscapeKeyDown", "onPointerDownOutside"]) {
    let prevented = false;
    loadingContent.props[handler]({ preventDefault: () => (prevented = true) });
    assert.equal(prevented, true, `${handler} must keep loading modal open`);
  }

  console.log("ALGOGO-148 modal presentation tests passed");
} finally {
  await server.close();
}
