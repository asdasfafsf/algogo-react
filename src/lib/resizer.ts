export const MIN_PROBLEM_WIDTH = 100;
export const MIN_WORKSPACE_WIDTH = 100;
export const MIN_EDITOR_HEIGHT = 50;
export const MIN_RESULT_HEIGHT = 200;
export const RESIZER_KEYBOARD_STEP = 20;

type ResizeBodyStyle = Pick<
  CSSStyleDeclaration,
  "cursor" | "pointerEvents" | "userSelect"
>;

export function snapshotResizeBodyStyle(style: ResizeBodyStyle) {
  return {
    userSelect: style.userSelect,
    pointerEvents: style.pointerEvents,
    cursor: style.cursor,
  };
}

export function restoreResizeBodyStyle(
  style: ResizeBodyStyle,
  snapshot: ReturnType<typeof snapshotResizeBodyStyle>,
) {
  style.userSelect = snapshot.userSelect;
  style.pointerEvents = snapshot.pointerEvents;
  style.cursor = snapshot.cursor;
}

export function isPrimaryResizePointer({
  button,
  isPrimary,
}: Pick<PointerEvent, "button" | "isPrimary">) {
  return button === 0 && isPrimary;
}

type TargetWithClosest = EventTarget & {
  closest: (selector: string) => Element | null;
};

function hasClosest(target: EventTarget | null): target is TargetWithClosest {
  return (
    typeof target === "object" &&
    target !== null &&
    "closest" in target &&
    typeof (target as { closest?: unknown }).closest === "function"
  );
}

export function isResizeControlTarget(target: EventTarget | null) {
  return hasClosest(target) && target.closest("button") !== null;
}

export function clampProblemWidth(width: number, viewportWidth: number) {
  return Math.min(
    Math.max(width, MIN_PROBLEM_WIDTH),
    Math.max(MIN_PROBLEM_WIDTH, viewportWidth - MIN_WORKSPACE_WIDTH),
  );
}

export function clampEditorHeight(height: number, viewportHeight: number) {
  return Math.min(
    Math.max(height, MIN_EDITOR_HEIGHT),
    Math.max(MIN_EDITOR_HEIGHT, viewportHeight - MIN_RESULT_HEIGHT),
  );
}

export function getViewportWidth() {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}

export function getViewportHeight() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
}
