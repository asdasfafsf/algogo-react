import useCodeControlPanel from "@hook/useCodeControlPanel";
import { Button } from "@/components/ui/button";
import { FileText, RotateCcw, Settings } from "lucide-react";
import useModal from "@plugins/modal/useModal";
import LanguageDropdown from "./LanguageDropdown";
import CodeTemplateDropdown from "./CodeTemplateDropdown";
import CodeEditorSettingsModal from "./CodeEditorSettingsModal";
import CompilerInfoModal from "./CompilerInfoModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CodeControlPanel({
  isPending,
}: {
  isPending: boolean;
}) {
  const { handleClickReset } = useCodeControlPanel();
  const modal = useModal();

  return (
    <div className="flex h-11 w-full shrink-0 items-center justify-between gap-3 overflow-x-auto border-b border-border bg-background px-3">
      <div className="flex min-w-max items-center gap-2">
        <LanguageDropdown />
        <CodeTemplateDropdown />
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
                aria-label="컴파일러 정보"
                onClick={() =>
                  modal.push("CompilerInfo", CompilerInfoModal, {})
                }
              >
                <FileText aria-hidden="true" className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">컴파일러 정보</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
                aria-label="화면 설정"
                onClick={() =>
                  modal.push(
                    "CODE_EDITOR_SETTINGS",
                    CodeEditorSettingsModal,
                    {},
                  )
                }
              >
                <Settings aria-hidden="true" className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">화면 설정</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex min-w-max items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={handleClickReset}
          className="h-8 cursor-pointer px-2 text-xs disabled:cursor-not-allowed"
        >
          <RotateCcw />
          초기화
        </Button>
      </div>
    </div>
  );
}
