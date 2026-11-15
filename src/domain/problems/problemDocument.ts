export const DOCUMENT_TAGS = [
  "p",
  "div",
  "span",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "small",
  "sub",
  "sup",
  "br",
  "hr",
  "ul",
  "ol",
  "li",
  "pre",
  "code",
  "blockquote",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "a",
  "img",
  "figure",
  "figcaption",
] as const;
export type DocumentTag = (typeof DOCUMENT_TAGS)[number];
export type DocumentAttributes = {
  href?: string;
  src?: string;
  alt?: string;
  title?: string;
  colSpan?: number;
  rowSpan?: number;
  start?: number;
  width?: string;
  height?: string;
  align?: "left" | "center" | "right";
};
export type DocumentNode =
  | { type: "text"; text: string }
  | { type: "math"; tex: string; display: boolean }
  | {
      type: "element";
      tag: DocumentTag;
      attributes: DocumentAttributes;
      children: DocumentNode[];
    };
export type DocumentSection =
  | { kind: "content"; id: string; title: string; nodes: DocumentNode[] }
  | {
      kind: "sample";
      id: string;
      order: number;
      input: string;
      output: string;
      explanation: DocumentNode[];
    };
export type ProblemDocument = { schemaVersion: 1; sections: DocumentSection[] };

const TAGS: ReadonlySet<string> = new Set(DOCUMENT_TAGS);
const STRING_ATTRIBUTES = new Set(["href", "src", "alt", "title"]);
const DIMENSION = /^(?:\d{1,5}(?:\.\d+)?)(?:px|%)?$/;

export function isDocumentTag(value: unknown): value is DocumentTag {
  return typeof value === "string" && TAGS.has(value);
}

export function isDocumentUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAttributes(value: unknown): value is DocumentAttributes {
  if (!isRecord(value)) return false;
  return Object.entries(value).every(([key, item]) => {
    if (key === "href" || key === "src") return isDocumentUrl(item);
    if (STRING_ATTRIBUTES.has(key)) return typeof item === "string";
    if (key === "width" || key === "height")
      return typeof item === "string" && DIMENSION.test(item);
    if (key === "align")
      return item === "left" || item === "center" || item === "right";
    if (key === "colSpan" || key === "rowSpan" || key === "start") {
      return (
        typeof item === "number" &&
        Number.isSafeInteger(item) &&
        item >= 1 &&
        item <= 10000
      );
    }
    return false;
  });
}

/** Persisted documents and HTTP responses are validated before rendering. */
export function isProblemDocument(value: unknown): value is ProblemDocument {
  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    !Array.isArray(value.sections)
  )
    return false;
  let remaining = 100000;
  const nodes = (value: unknown, depth: number): value is DocumentNode[] => {
    if (depth > 64 || !Array.isArray(value)) return false;
    return value.every((node: unknown) => {
      if (--remaining < 0 || !isRecord(node)) return false;
      if (node.type === "text") return typeof node.text === "string";
      if (node.type === "math")
        return (
          typeof node.tex === "string" && typeof node.display === "boolean"
        );
      return (
        node.type === "element" &&
        isDocumentTag(node.tag) &&
        isAttributes(node.attributes) &&
        nodes(node.children, depth + 1)
      );
    });
  };
  const ids = new Set<string>();
  const orders = new Set<number>();
  return (
    value.sections.length <= 1000 &&
    value.sections.every((section: unknown) => {
      if (
        !isRecord(section) ||
        typeof section.id !== "string" ||
        !section.id ||
        ids.has(section.id)
      )
        return false;
      ids.add(section.id);
      if (section.kind === "content")
        return typeof section.title === "string" && nodes(section.nodes, 0);
      if (
        section.kind !== "sample" ||
        typeof section.order !== "number" ||
        !Number.isSafeInteger(section.order) ||
        section.order < 1 ||
        orders.has(section.order)
      )
        return false;
      orders.add(section.order);
      return (
        typeof section.input === "string" &&
        typeof section.output === "string" &&
        nodes(section.explanation, 0)
      );
    })
  );
}
