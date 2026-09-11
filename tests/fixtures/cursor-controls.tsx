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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Toggle } from "@components/ui/toggle";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@components/ui/sheet";
import "../../src/index.css";

const expectedCursors = {
  button: "pointer",
  link: "pointer",
  roleButton: "pointer",
  row: "pointer",
  checkbox: "pointer",
  checkboxLabel: "pointer",
  disabledCheckbox: "not-allowed",
  disabledCheckboxLabel: "not-allowed",
  selectTrigger: "pointer",
  textInput: "text",
  textarea: "text",
  contentEditable: "text",
  disabledButton: "not-allowed",
  activeTab: "pointer",
  disabledTab: "not-allowed",
  activeToggle: "pointer",
  disabledToggle: "not-allowed",
  disabledSelectTrigger: "not-allowed",
} as const;

const expectedPointerEvents = {
  disabledButton: "auto",
  disabledTab: "auto",
  disabledToggle: "auto",
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
      const pointerEventMismatches = Object.entries(
        expectedPointerEvents,
      ).flatMap(([id, expected]) => {
        const element = document.getElementById(id);
        const actual = element
          ? window.getComputedStyle(element).pointerEvents
          : "없음";
        return actual === expected ? [] : `${id}: pointer-events ${actual}`;
      });
      setMessage(
        mismatches.length + pointerEventMismatches.length === 0
          ? "모든 기본 커서 규칙이 적용되었습니다."
          : `커서 확인 실패 - ${[...mismatches, ...pointerEventMismatches].join(
              ", ",
            )}`,
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <output aria-live="polite">{message}</output>;
}

function CursorControlsFixture() {
  const [selected, setSelected] = useState("one");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

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
            비활성 기본 버튼
          </Button>
          <Button id="disabledButtonDestructive" disabled variant="destructive">
            비활성 destructive 버튼
          </Button>
          <Button id="disabledButtonOutline" disabled variant="outline">
            비활성 outline 버튼
          </Button>
          <Button id="disabledButtonSecondary" disabled variant="secondary">
            비활성 secondary 버튼
          </Button>
          <Button id="disabledButtonGhost" disabled variant="ghost">
            비활성 ghost 버튼
          </Button>
          <Button id="disabledButtonLink" disabled variant="link">
            비활성 link 버튼
          </Button>
          <label
            id="checkboxLabel"
            className="inline-flex cursor-pointer items-center gap-2"
            htmlFor="checkbox"
          >
            <Checkbox id="checkbox" aria-label="선택" />
            <span>선택</span>
          </label>
          <label
            id="disabledCheckboxLabel"
            className="inline-flex cursor-not-allowed items-center gap-2 opacity-50"
            htmlFor="disabledCheckbox"
          >
            <Checkbox
              id="disabledCheckbox"
              aria-label="선택된 비활성 체크박스"
              checked
              disabled
            />
            <span>선택된 비활성 체크박스</span>
          </label>
          <Toggle id="activeToggle" aria-label="활성 토글">
            활성 토글
          </Toggle>
          <Toggle id="disabledToggle" disabled aria-label="비활성 토글">
            비활성 토글
          </Toggle>
          <Toggle
            id="disabledTogglePressed"
            defaultPressed
            disabled
            aria-label="선택된 비활성 토글"
          >
            선택된 비활성 토글
          </Toggle>
          <Toggle
            id="disabledToggleOutline"
            disabled
            variant="outline"
            aria-label="비활성 outline 토글"
          >
            비활성 outline 토글
          </Toggle>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger id="activeTab" value="active">
              활성 탭
            </TabsTrigger>
            <TabsTrigger id="disabledTab" value="disabled" disabled>
              비활성 탭
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">활성 탭 내용</TabsContent>
        </Tabs>

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
          <DropdownMenu>
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
          <Select disabled value="disabled">
            <SelectTrigger
              id="disabledSelectTrigger"
              className="w-40"
              aria-label="비활성 선택 메뉴"
            >
              <SelectValue />
            </SelectTrigger>
          </Select>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setDialogOpen(true)}>
            대화상자 다시 열기
          </Button>
          <Button onClick={() => setSheetOpen(true)}>시트 다시 열기</Button>
          <output aria-live="polite">
            대화상자: {dialogOpen ? "열림" : "닫힘"}, 시트:{" "}
            {sheetOpen ? "열림" : "닫힘"}
          </output>
        </div>
        <CursorReport />
      </section>

      <Dialog modal={false} open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-80" showCloseButton={false}>
          <DialogTitle>asChild 대화상자 닫기</DialogTitle>
          <div className="flex gap-3">
            <DialogClose asChild>
              <a id="dialogCloseLink" href="#active-dialog-close">
                활성 링크 닫기
              </a>
            </DialogClose>
            <DialogClose asChild>
              <a
                id="disabledDialogCloseLink"
                href="#disabled-dialog-close"
                aria-disabled="true"
                onClick={(event) => event.preventDefault()}
              >
                비활성 링크 닫기
              </a>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet modal={false} open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-80">
          <SheetTitle>asChild 시트 닫기</SheetTitle>
          <div className="mt-4 flex gap-3">
            <SheetClose asChild>
              <a id="sheetCloseLink" href="#active-sheet-close">
                활성 링크 닫기
              </a>
            </SheetClose>
            <SheetClose asChild>
              <a
                id="disabledSheetCloseLink"
                href="#disabled-sheet-close"
                aria-disabled="true"
                onClick={(event) => event.preventDefault()}
              >
                비활성 링크 닫기
              </a>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CursorControlsFixture />
  </StrictMode>,
);
