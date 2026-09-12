import React from "react";
import CodeControlPanel from "./CodeControlPanel";
import MonacoEditor from "./MonacoEditor";
import useExecute from "@hook/useExecute";
import useExecuteTestCase from "@hook/useExecuteTestCase";
import useSubmit from "@hook/useSubmit";
import useCodeControlPanel from "@hook/useCodeControlPanel";
import useModal from "@plugins/modal/useModal";
import CodeEditorSettingsModal from "./CodeEditorSettingsModal";
import CompilerInfoModal from "./CompilerInfoModal";

export function CodeEditor() {
  const { state, handleTest } = useExecuteTestCase();
  const { handleExecute } = useExecute();
  const { handleSubmit } = useSubmit();
  const { handleClickReset } = useCodeControlPanel();
  const modal = useModal();
  const isPending = state === "CONNECTING" || state === "PENDING";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <CodeControlPanel
        isPending={isPending}
        onReset={handleClickReset}
        onExecute={handleExecute}
        onTest={handleTest}
        onSubmit={handleSubmit}
        onOpenCompilerInfo={() =>
          modal.push("CompilerInfo", CompilerInfoModal, {})
        }
        onOpenSettings={() =>
          modal.push("CODE_EDITOR_SETTINGS", CodeEditorSettingsModal, {})
        }
      />
      <div className="min-h-0 flex-1">
        <MonacoEditor />
      </div>
    </div>
  );
}

export default React.memo(CodeEditor);
