import React from "react";
import CodeControlPanel from "./CodeControlPanel";
import MonacoEditor from "./MonacoEditor";
import useExecute from "@hook/useExecute";
import useExecuteTestCase from "@hook/useExecuteTestCase";
import useSubmit from "@hook/useSubmit";
import useCodeControlPanel from "@hook/useCodeControlPanel";
import { Button } from "@/components/ui/button";
import { FlaskConical, Play, Send } from "lucide-react";

export function CodeEditor() {
  const { state, handleTest } = useExecuteTestCase();
  const { handleExecute } = useExecute();
  const { handleSubmit } = useSubmit();
  const { handleClickAddTestCase } = useCodeControlPanel();
  const isPending = state === "PENDING";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <CodeControlPanel isPending={isPending} />
      <div className="min-h-0 flex-1">
        <MonacoEditor />
      </div>
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 overflow-x-auto border-t border-border bg-background px-3">
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={handleClickAddTestCase}
          className="text-xs text-muted-foreground"
        >
          <FlaskConical />
          테스트 추가
        </Button>
        <div className="flex min-w-max items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={handleExecute}
            className="h-8 px-4 text-xs"
          >
            <Play />
            실행
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={handleTest}
            className="h-8 px-4 text-xs"
          >
            <FlaskConical />
            테스트
          </Button>
          <Button
            size="sm"
            disabled={isPending}
            onClick={handleSubmit}
            className="h-8 px-4 text-xs"
          >
            <Send />
            제출
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CodeEditor);
