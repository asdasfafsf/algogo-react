import { ChevronDown, Plus, Pencil } from "lucide-react";
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
    toggleOpen,
    templateList,
    title,
    handleChangeTemplate,
    handleEditTemplate,
    handleAddTemplate,
  } = useCodeTemplateDropdown(CodeTemplateAddModal);
  const displayedTitle =
    templateList.find((item) => item.uuid === title)?.name ?? title;
  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        if (next !== open) toggleOpen();
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-36 justify-between gap-2 border-white/15 bg-gray-900 text-gray-100 hover:bg-gray-800"
          aria-label="코드 템플릿"
        >
          <span className="truncate">{displayedTitle}</span>
          <ChevronDown className="size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark w-60" align="start">
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
                void handleEditTemplate(item.uuid);
              }}
            >
              <Pencil className="size-4" />
            </DropdownMenuItem>
          </div>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleAddTemplate}>
          <Plus className="size-4" />
          추가하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
