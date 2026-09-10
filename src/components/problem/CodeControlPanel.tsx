import useCodeControlPanel from "@hook/useCodeControlPanel";
import useExecuteTestCase from "@hook/useExecuteTestCase";
import useExecute from "@hook/useExecute";
import { Button } from "@components/Button";
import useSubmit from "@hook/useSubmit";
import LanguageDropdown from "./LanguageDropdown";
import CodeTemplateDropdown from "./CodeTemplateDropdown";

export default function CodeControlPanel() {
  const { handleClickReset, handleClickAddTestCase } = useCodeControlPanel();

  const { state, handleTest } = useExecuteTestCase();
  const { handleExecute } = useExecute();
  const { handleSubmit } = useSubmit();

  return (
    <div className="dark flex h-12 w-full items-center overflow-x-auto border-b border-white/10 bg-gray-900 px-3 text-white">
      <div className="flex min-w-max flex-1 items-center justify-end gap-2">
        <LanguageDropdown />
        <CodeTemplateDropdown />
        <div className="flex items-center gap-1.5 ml-2">
          <Button
            onClick={handleClickReset}
            disabled={state === "PENDING"}
            className={
              state === "PENDING" ? "bg-gray-600 cursor-not-allowed" : ""
            }
            color="white"
            variant="text"
            size="small"
          >
            초기화
          </Button>
          <Button
            disabled={state === "PENDING"}
            className={
              state === "PENDING" ? "bg-gray-600 cursor-not-allowed" : ""
            }
            color="white"
            variant="outlined"
            size="small"
            onClick={handleExecute}
          >
            실행
          </Button>
          <Button
            disabled={state === "PENDING"}
            className={
              state === "PENDING" ? "bg-gray-600 cursor-not-allowed" : ""
            }
            size="small"
            color="white"
            variant="text"
            onClick={handleClickAddTestCase}
          >
            테스트 케이스 추가
          </Button>

          <Button
            disabled={state === "PENDING"}
            className={`${state === "PENDING" ? "bg-gray-600 cursor-not-allowed" : ""}`}
            color="white"
            variant="text"
            size="small"
            onClick={handleTest}
          >
            테스트
          </Button>

          <Button
            disabled={state === "PENDING"}
            className={
              state === "PENDING" ? "bg-gray-600 cursor-not-allowed" : ""
            }
            color="blue"
            size="small"
            onClick={handleSubmit}
          >
            제출
          </Button>
        </div>
      </div>
    </div>
  );
}
