import { createElement, Fragment } from "react";
import type { ReactNode } from "react";
import type { DocumentNode } from "@/domain/problems/problemDocument";
import {
  isDocumentTag,
  isDocumentUrl,
} from "@/domain/problems/problemDocument";

function renderNode(node: DocumentNode): ReactNode {
  if (node.type === "text") return node.text;
  if (node.type === "math") {
    return node.display ? `\\[${node.tex}\\]` : `\\(${node.tex}\\)`;
  }
  if (!isDocumentTag(node.tag)) return null;
  const attrs = node.attributes;
  const children = node.children.map((child, index) => (
    <Fragment key={index}>{renderNode(child)}</Fragment>
  ));
  const style = {
    textAlign: attrs.align,
    width: attrs.width,
    height: attrs.height,
  };
  if (node.tag === "img") {
    if (!isDocumentUrl(attrs.src)) return null;
    return (
      <img
        src={attrs.src}
        alt={attrs.alt ?? ""}
        title={attrs.title}
        style={style}
        loading="lazy"
        className="max-w-full"
      />
    );
  }
  if (node.tag === "a") {
    return (
      <a
        href={isDocumentUrl(attrs.href) ? attrs.href : undefined}
        title={attrs.title}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  if (node.tag === "br" || node.tag === "hr") return createElement(node.tag);
  return createElement(
    node.tag,
    {
      title: attrs.title,
      style,
      ...(node.tag === "th" || node.tag === "td"
        ? { colSpan: attrs.colSpan, rowSpan: attrs.rowSpan }
        : {}),
      ...(node.tag === "ol" ? { start: attrs.start } : {}),
    },
    children,
  );
}

export default function ProblemDocumentNodes({
  nodes,
}: {
  nodes: DocumentNode[];
}) {
  return nodes.map((node, index) => (
    <Fragment key={index}>{renderNode(node)}</Fragment>
  ));
}
