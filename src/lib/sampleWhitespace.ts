export const SAMPLE_TAB_SIZE = 4;

export type SampleWhitespaceToken =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "space";
      trailing: boolean;
    }
  | {
      type: "tab";
      trailing: boolean;
      width: number;
    };

export interface SampleWhitespaceLine {
  number: number;
  tokens: SampleWhitespaceToken[];
  isEmpty: boolean;
  hasLineBreak: boolean;
}

interface SourceLine {
  value: string;
  hasLineBreak: boolean;
}

function splitLines(value: string): SourceLine[] {
  if (value.length === 0) {
    return [{ value: "", hasLineBreak: false }];
  }

  const lines: SourceLine[] = [];
  const lineBreakPattern = /\r\n|\r|\n/g;
  let lineStart = 0;
  let match: RegExpExecArray | null;

  while ((match = lineBreakPattern.exec(value)) !== null) {
    lines.push({
      value: value.slice(lineStart, match.index),
      hasLineBreak: true,
    });
    lineStart = match.index + match[0].length;
  }

  if (lineStart < value.length) {
    lines.push({ value: value.slice(lineStart), hasLineBreak: false });
  }

  return lines;
}

function tokenizeLine(value: string, tabSize: number): SampleWhitespaceToken[] {
  const trailingWhitespaceStart = value.search(/[ \t]+$/);
  const tokens: SampleWhitespaceToken[] = [];
  let text = "";
  let column = 0;

  const flushText = () => {
    if (!text) return;
    tokens.push({ type: "text", value: text });
    text = "";
  };

  let sourceOffset = 0;

  for (const character of value) {
    const isTrailing =
      trailingWhitespaceStart >= 0 && sourceOffset >= trailingWhitespaceStart;

    if (character === " ") {
      flushText();
      tokens.push({
        type: "space",
        trailing: isTrailing,
      });
      column += 1;
    } else if (character === "\t") {
      flushText();
      const width = tabSize - (column % tabSize);
      tokens.push({
        type: "tab",
        trailing: isTrailing,
        width,
      });
      column += width;
    } else {
      text += character;
      column += character.length;
    }

    sourceOffset += character.length;
  }

  flushText();
  return tokens;
}

export function analyzeSampleWhitespace(
  value: string,
  tabSize = SAMPLE_TAB_SIZE,
): SampleWhitespaceLine[] {
  if (!Number.isInteger(tabSize) || tabSize < 1) {
    throw new RangeError("tabSize must be a positive integer");
  }

  return splitLines(value).map((line, index) => ({
    number: index + 1,
    tokens: tokenizeLine(line.value, tabSize),
    isEmpty: line.value.length === 0,
    hasLineBreak: line.hasLineBreak,
  }));
}
