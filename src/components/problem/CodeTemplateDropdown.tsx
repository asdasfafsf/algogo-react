import { ChevronDown, Plus, Pencil } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import CodeTemplateAddModal from "./CodeTemplateAddModal";
import useCodeTemplateDropdown from "@hook/editor/useCodeTemplateDropdown";
export default function CodeTemplateDropdown() {
  const {
    open,
    handleOpenChange,
    templateList,
    title,
    handleChangeTemplate,
    handleEditTemplate,
    handleAddTemplate,
  } = useCodeTemplateDropdown(CodeTemplateAddModal);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pendingModalActionRef = useRef<null | (() => void)>(null);
  const modalTimerRef = useRef<number | null>(null);
  const displayedTitle =
    templateList.find((item) => item.uuid === title)?.name ?? title;

  useEffect(() => {
    return () => {
      if (modalTimerRef.current !== null) {
        window.clearTimeout(modalTimerRef.current);
      }
    };
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          size="sm"
          className="h-8 min-w-0 flex-1 justify-between gap-2 bg-background text-xs @[30rem]/editor-toolbar:w-28 @[30rem]/editor-toolbar:flex-none @[48rem]/editor-toolbar:w-36"
          aria-label="코드 템플릿"
        >
          <span className="truncate">{displayedTitle}</span>
          <ChevronDown className="size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        onCloseAutoFocus={(event) => {
          const openModal = pendingModalActionRef.current;
          if (!openModal) return;

          event.preventDefault();
          pendingModalActionRef.current = null;
          triggerRef.current?.focus();
          modalTimerRef.current = window.setTimeout(() => {
            modalTimerRef.current = null;
            openModal();
          });
        }}
      >
        <DropdownMenuLabel>저장한 템플릿</DropdownMenuLabel>
        {templateList.length === 0 && (
          <DropdownMenuItem disabled>저장한 템플릿이 없습니다</DropdownMenuItem>
        )}
        {templateList.map((item) => (
          <div key={item.uuid} className="flex items-center">
            <DropdownMenuItem
              className="min-w-0 flex-1"
              onSelect={() => {
                void handleChangeTemplate(item.uuid);
              }}
            >
              <span className="truncate">{item.name}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              aria-label={`${item.name} 수정`}
              className="shrink-0"
              onSelect={() => {
                pendingModalActionRef.current = () => {
                  void handleEditTemplate(item.uuid);
                };
              }}
            >
              <Pencil className="size-4" />
            </DropdownMenuItem>
          </div>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            pendingModalActionRef.current = handleAddTemplate;
          }}
        >
          <Plus className="size-4" />
          추가하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
