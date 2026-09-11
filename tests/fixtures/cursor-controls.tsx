import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Checkbox } from "@components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import "../../src/index.css";

const expectedCursors = {
  button: "pointer",
  link: "pointer",
  roleButton: "pointer",
  row: "pointer",
  checkbox: "pointer",
  menuItem: "pointer",
  disabledMenuItem: "not-allowed",
  selectTrigger: "pointer",
  textInput: "text",
  textarea: "text",
  contentEditable: "text",
  disabledButton: "not-allowed",
} as const;

function CursorReport() {
  const [message, setMessage] = useState("커서 규칙을 확인하는 중입니다.");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const mismatches = Object.entries(expectedCursors).flatMap(
        ([id, expected]) => {
          const element = document.getElementById(id);
          const actual = element
            ? window.getComputedStyle(element).cursor
            : "없음";
          return actual === expected ? [] : `${id}: ${actual}`;
        },
      );
      setMessage(
        mismatches.length === 0
          ? "모든 기본 커서 규칙이 적용되었습니다."
          : `커서 확인 실패 - ${mismatches.join(", ")}`,
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <output aria-live="polite">{message}</output>;
}

function CursorControlsFixture() {
  const [selected, setSelected] = useState("one");

  return (
    <main className="mx-auto grid max-w-3xl gap-5 p-8">
      <div>
        <h1 className="text-xl font-semibold">상호작용 커서 검증</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          클릭 가능한 요소와 편집 가능한 요소를 서로 다른 커서로 확인합니다.
        </p>
      </div>

      <section className="grid gap-4 rounded-lg border p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Button id="button">버튼</Button>
          <a
            id="link"
            href="#cursor-fixture"
            className="rounded-md border px-3 py-2"
          >
            링크
          </a>
          <div
            id="roleButton"
            role="button"
            tabIndex={0}
            className="rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => undefined}
          >
            역할 버튼
          </div>
          <Button id="disabledButton" disabled>
            비활성 버튼
          </Button>
          <Checkbox id="checkbox" aria-label="선택" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            id="textInput"
            type="text"
            className="rounded-md border px-3 py-2"
            placeholder="텍스트 입력"
          />
          <Textarea
            id="textarea"
            className="min-h-10"
            placeholder="여러 줄 입력"
          />
          <div
            id="contentEditable"
            contentEditable
            suppressContentEditableWarning
            className="rounded-md border px-3 py-2"
          >
            편집 가능한 내용
          </div>
        </div>

        <Table>
          <TableBody>
            <TableRow
              id="row"
              className="cursor-pointer"
              onClick={() => undefined}
            >
              <TableCell>클릭 가능한 문제 행</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex flex-wrap gap-3">
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">메뉴 트리거</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem id="menuItem">메뉴 항목</DropdownMenuItem>
              <DropdownMenuItem id="disabledMenuItem" disabled>
                비활성 메뉴 항목
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger
              id="selectTrigger"
              className="w-40"
              aria-label="선택 메뉴"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one">첫 번째</SelectItem>
              <SelectItem value="two">두 번째</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CursorReport />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CursorControlsFixture />
  </StrictMode>,
);
