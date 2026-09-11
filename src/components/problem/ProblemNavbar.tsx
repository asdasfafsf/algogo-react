import useProblemUpdate from "@hook/problem/useProblemUpdate";
import { FileText, RefreshCw, Settings } from "lucide-react";
import useModal from "@plugins/modal/useModal";
import { IconButton } from "@components/Button/index";
import CodeEditorSettingsModal from "./CodeEditorSettingsModal";
import CompilerInfoModal from "./CompilerInfoModal";
import { Tooltip } from "../common";
import { Problem } from "@/type/Problem.type";

interface ProblemNavbarProps {
  problem?: Problem;
}
export default function ProblemNavbar({ problem }: ProblemNavbarProps) {
  const modal = useModal();
  const handleClickUpdate = useProblemUpdate(problem);

  return (
    <nav aria-label="문제 도구" className="flex shrink-0">
      <div className="flex items-center justify-end w-full h-full gap-0 p-0 px-2 text-white">
        <Tooltip
          className="bg-slate-500"
          content="문제 새로고침"
          placement="bottom"
        >
          <div className="flex items-center justify-center w-10 h-full">
            <IconButton
              aria-label="문제 새로고침"
              onClick={handleClickUpdate}
              className="text-white bg-gray-900 w-9 h-9"
            >
              <RefreshCw className="w-6 h-6 text-white" color="white" />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip
          className="bg-slate-500"
          content="컴파일러 정보"
          placement="bottom"
        >
          <div className="flex items-center justify-center w-10 h-full">
            <IconButton
              aria-label="컴파일러 정보"
              className="text-white bg-gray-900 w-9 h-9"
              onClick={() => {
                modal.push("CompilerInfo", CompilerInfoModal, {});
              }}
            >
              <FileText className="w-6 h-6 text-white" color="white" />
            </IconButton>
          </div>
        </Tooltip>

        <Tooltip className="bg-slate-500" content="설정" placement="bottom-end">
          <div className="flex items-center justify-center w-10 h-full">
            <IconButton
              aria-label="화면 설정"
              // ripple
              className="text-white bg-gray-900 w-9 h-9"
              onClick={async () => {
                modal.push("CODE_EDITOR_SETTINGS", CodeEditorSettingsModal, {});
              }}
            >
              <Settings className="w-6 h-6 text-white" color="white" />
            </IconButton>
          </div>
        </Tooltip>
      </div>
    </nav>
  );
}
