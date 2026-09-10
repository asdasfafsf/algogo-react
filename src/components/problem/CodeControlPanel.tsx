import useCodeControlPanel from "@hook/useCodeControlPanel";
import { Button } from "@/components/ui/button";
import { FileText, RotateCcw, Settings } from "lucide-react";
import useModal from "@plugins/modal/useModal";
import LanguageDropdown from "./LanguageDropdown";
import CodeTemplateDropdown from "./CodeTemplateDropdown";
import CodeEditorSettingsModal from "./CodeEditorSettingsModal";
import CompilerInfoModal from "./CompilerInfoModal";

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
      </div>
      <div className="flex min-w-max items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={handleClickReset}
          className="h-8 px-2 text-xs"
          title="작성 중인 코드를 초기화합니다"
        >
          <RotateCcw />
          초기화
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label="컴파일러 정보"
          title="컴파일러 정보"
          onClick={() => modal.push("CompilerInfo", CompilerInfoModal, {})}
        >
          <FileText />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label="화면 설정"
          title="화면 설정"
          onClick={() =>
            modal.push("CODE_EDITOR_SETTINGS", CodeEditorSettingsModal, {})
          }
        >
          <Settings />
        </Button>
      </div>
    </div>
  );
}
