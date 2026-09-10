import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
  TableHead as ShadcnTableHead,
  TableBody as ShadcnTableBody,
  TableCell as ShadcnTableCell,
} from "@/components/ui/table";
import { Button as ShadcnButton } from "@/components/ui/button";
import { ProblemLevelChip, ProblemStateChip } from "@components/Chip/index";
import { LinkIcon } from "@heroicons/react/24/solid";
import { Tooltip, Typography } from "@components/common/index";
import useProblemListTable from "@hook/problem-list/useProblemListTable";
import ProblemThSort from "./ProblemListThSort";
import {
  PROBLEM_SORT_ANSWER_RATE_ASC,
  PROBLEM_SORT_ANSWER_RATE_DESC,
  PROBLEM_SORT_LEVEL_ASC,
  PROBLEM_SORT_LEVEL_DESC,
  PROBLEM_SORT_TITLE_ASC,
  PROBLEM_SORT_TITLE_DESC,
} from "../../constant/ProblemSort";
import ProblemListTableSkeleton from "./ProblemListTableSkeleton";
import { Button } from "../Button";

export default function ProblemListTable() {
  const {
    isSearching,
    isFetching,
    problemList,
    problemSort,
    problemHidden,
    handleClickProblem,
    handleClickProblemTh,
    handleClickProblemCollectModal,
  } = useProblemListTable();

  return isFetching ? (
    <ProblemListTableSkeleton />
  ) : (
    <div className="overflow-x-auto">
      <ShadcnTable className="w-full min-w-[800px] table-fixed">
        <ShadcnTableHeader className="mb-12 h-12 border-b border-gray-300">
          <ShadcnTableRow>
            <ShadcnTableHead className="pl-4 w-16 text-center">
              <Typography weight="semibold" variant="medium">
                상태
              </Typography>
            </ShadcnTableHead>
            <ProblemThSort
              onClick={(e) => handleClickProblemTh(e, "제목")}
              className=" pl-12 min-w-[400px] w-full"
              sort={
                problemSort === PROBLEM_SORT_TITLE_ASC
                  ? 1
                  : problemSort === PROBLEM_SORT_TITLE_DESC
                    ? 2
                    : 0
              }
            >
              제목
            </ProblemThSort>

            <ProblemThSort
              onClick={(e) => handleClickProblemTh(e, "난이도")}
              className={`pl-2 text-center w-36 ${problemHidden["난이도"] ? "cursor-help!" : ""} `}
              sort={
                problemSort === PROBLEM_SORT_LEVEL_ASC
                  ? 1
                  : problemSort === PROBLEM_SORT_LEVEL_DESC
                    ? 2
                    : 0
              }
            >
              난이도
            </ProblemThSort>
            <ProblemThSort
              onClick={(e) => handleClickProblemTh(e, "정답률")}
              className="w-32"
              sort={
                problemSort === PROBLEM_SORT_ANSWER_RATE_ASC
                  ? 1
                  : problemSort === PROBLEM_SORT_ANSWER_RATE_DESC
                    ? 2
                    : 0
              }
            >
              정답률
            </ProblemThSort>
            <ProblemThSort
              onClick={(e) => handleClickProblemTh(e, "제출")}
              className="w-28"
              sort={problemSort === 40 ? 1 : problemSort === 41 ? 2 : 0}
            >
              제출
            </ProblemThSort>
            <ShadcnTableHead className="w-20">
              <div className="flex items-center">
                <Typography
                  className="text-left"
                  weight="semibold"
                  variant="medium"
                >
                  출처
                </Typography>
              </div>
            </ShadcnTableHead>
          </ShadcnTableRow>
        </ShadcnTableHeader>

        {problemList.length === 0 ? (
          <ShadcnTableBody className="w-full">
            <ShadcnTableRow className="h-[720px] items-center justify-center">
              <ShadcnTableCell
                colSpan={6}
                rowSpan={5}
                className="w-full h-full"
              >
                <div className="flex justify-center items-center w-full h-full">
                  <div>
                    <Typography
                      className="flex justify-center items-center"
                      weight="semilight"
                      color="gray"
                      variant="medium"
                    >
                      찾으시는 문제가 없나요? URL을 입력해 문제를 추가해보세요!
                    </Typography>
                    <div className="h-2" />
                    <div className="flex justify-center items-center">
                      <Button
                        disabled={isSearching}
                        onClick={handleClickProblemCollectModal}
                        color="blue"
                      >
                        문제 추가하기
                      </Button>
                    </div>
                  </div>
                </div>
              </ShadcnTableCell>
            </ShadcnTableRow>
          </ShadcnTableBody>
        ) : (
          <ShadcnTableBody className="w-full">
            {problemList?.map((elem, index) => (
              <ShadcnTableRow
                key={elem.uuid}
                className={`h-16 ${index === problemList.length - 1 ? "border-b-0" : "border-b border-gray-300"}`}
              >
                <ShadcnTableCell>
                  <div className="flex justify-center items-center w-full">
                    <div className="flex justify-center items-center pl-4 w-full">
                      <ProblemStateChip
                        state={elem.state}
                        showNoneState={false}
                        showIcon={false}
                      />
                    </div>
                  </div>
                </ShadcnTableCell>
                <ShadcnTableCell className="pl-12 min-w-[400px]">
                  <ShadcnButton
                    variant="ghost"
                    className="h-auto w-full justify-start whitespace-normal p-0 text-left"
                    onClick={(e) => handleClickProblem(e, elem.uuid)}
                  >
                    <Typography
                      className="text-gray-700"
                      variant="medium"
                      weight="semilight"
                    >
                      {elem.title}
                    </Typography>
                  </ShadcnButton>
                </ShadcnTableCell>
                <ShadcnTableCell className="">
                  <div className="flex items-center justify-left">
                    <ProblemLevelChip
                      level={
                        problemHidden["난이도"]
                          ? "알 수 없음"
                          : (elem.levelText as unknown as ProblemLevel)
                      }
                    />
                  </div>
                </ShadcnTableCell>
                <ShadcnTableCell>
                  <Typography
                    className="text-gray-700"
                    variant="medium"
                    weight="semilight"
                  >
                    {elem.answerRate} %
                  </Typography>
                </ShadcnTableCell>
                <ShadcnTableCell>
                  <Typography
                    className="text-gray-700"
                    variant="medium"
                    weight="semilight"
                  >
                    {elem.submitCount}
                  </Typography>
                </ShadcnTableCell>
                <ShadcnTableCell>
                  <Tooltip content="새 창에서 열기">
                    <ShadcnButton
                      variant="ghost"
                      size="icon"
                      aria-label={`${elem.title} 출처 새 창에서 열기`}
                      onClick={() => {
                        window.open(elem.sourceUrl);
                      }}
                    >
                      <LinkIcon className="size-4" />
                    </ShadcnButton>
                  </Tooltip>
                </ShadcnTableCell>
              </ShadcnTableRow>
            ))}
          </ShadcnTableBody>
        )}
      </ShadcnTable>
    </div>
  );
}
