import { ProblemLevelChip } from '@components/Chip/index';
import { LinkIcon } from '@heroicons/react/24/solid';
import { Tooltip, Typography } from '@components/common/index';
import useProblemListTable from '@hook/problem-list/useProblemListTable';
import ProblemThSort from './ProblemListThSort';
import {
  PROBLEM_SORT_ANSWER_RATE_ASC,
  PROBLEM_SORT_ANSWER_RATE_DESC,
  PROBLEM_SORT_LEVEL_ASC,
  PROBLEM_SORT_LEVEL_DESC,
  PROBLEM_SORT_TITLE_ASC,
  PROBLEM_SORT_TITLE_DESC,
} from '../../constant/ProblemSort';
import ProblemListTableSkeleton from './ProblemListTableSkeleton';
import { Button } from '../Button';

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

  return (
    isFetching ? <ProblemListTableSkeleton />
      : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] table-fixed">
            <thead className="h-12 mb-12 border-b border-gray-300">
              <tr>
                <th className="w-16 pl-4 text-center">
                  <Typography weight="semibold" variant="medium">
                    상태
                  </Typography>
                </th>
                <ProblemThSort
                  onClick={(e) => handleClickProblemTh(e, '제목')}
                  className=" pl-12 min-w-[400px] w-full"
                  sort={problemSort === PROBLEM_SORT_TITLE_ASC
                    ? 1 : problemSort === PROBLEM_SORT_TITLE_DESC ? 2 : 0}
                >
                  제목
                </ProblemThSort>

                <ProblemThSort
                  onClick={(e) => handleClickProblemTh(e, '난이도')}
                  className={`pl-2 text-center w-36 ${problemHidden['난이도'] ? '!cursor-help' : ''} `}
                  sort={problemHidden['난이도'] === true
                    ? 0
                    : problemSort === PROBLEM_SORT_LEVEL_ASC
                      ? 1
                      : problemSort === PROBLEM_SORT_LEVEL_DESC
                        ? 2 : 0}
                >
                  난이도
                </ProblemThSort>
                <ProblemThSort
                  onClick={(e) => handleClickProblemTh(e, '정답률')}
                  className="w-32"
                  sort={problemSort === PROBLEM_SORT_ANSWER_RATE_ASC
                    ? 1 : problemSort === PROBLEM_SORT_ANSWER_RATE_DESC ? 2 : 0}
                >
                  정답률
                </ProblemThSort>
                <ProblemThSort
                  onClick={(e) => handleClickProblemTh(e, '제출')}
                  className="w-28"
                  sort={problemSort === 40 ? 1 : problemSort === 41 ? 2 : 0}
                >
                  제출
                </ProblemThSort>
                <th className="w-20">
                  <div className="flex items-center ">
                    <Typography className="text-left" weight="semibold" variant="medium">출처</Typography>
                  </div>
                </th>
              </tr>
            </thead>

            {problemList.length === 0
              ? (
                <tbody className="w-full">
                  <tr className="h-[720px] items-center justify-center">
                    <td colSpan={5} rowSpan={5} className="w-full h-full">
                      <div className="flex items-center justify-center w-full h-full">
                        <div>

                          <Typography
                            className="flex items-center justify-center"
                            weight="semilight"
                            color="gray"
                            variant="medium"
                          >
                            찾으시는 문제가 없나요? URL을 입력해 문제를 추가해보세요!
                          </Typography>
                          <div className="h-2" />
                          <div className="flex items-center justify-center">
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
                    </td>
                  </tr>
                </tbody>
              )

              : (
                <tbody className="w-full">
                  {problemList?.map((elem) => (
                    <tr
                      key={elem.uuid}
                      className="h-16 border-b border-gray-300"
                    >
                      <td className="flex items-center justify-center h-16 pl-4 ">
                        {/* <ProblemStateChip state={} value="" /> */}
                      </td>
                      <td
                        onClick={(e) => handleClickProblem(e, elem.uuid)}
                        className=" pl-12 min-w-[400px] cursor-pointer"
                      >
                        <Typography className="text-gray-700 " variant="medium" weight="semilight">
                          {elem.title}
                        </Typography>
                      </td>
                      <td className="">
                        <div className="flex items-center justify-left">
                          <ProblemLevelChip level={problemHidden['난이도'] ? '알 수 없음' : elem.levelText as unknown as ProblemLevel} />
                        </div>
                      </td>
                      <td>
                        <Typography className="text-gray-700 " variant="medium" weight="semilight">
                          {elem.answerRate}
                          {' '}
                          %
                        </Typography>
                      </td>
                      <td>
                        <Typography className="text-gray-700 " variant="medium" weight="semilight">
                          {elem.submitCount}
                        </Typography>
                      </td>
                      <td>
                        <Tooltip content="새 창에서 열기">
                          <LinkIcon
                            onClick={() => { window.open(elem.sourceUrl); }}
                            className="w-4 h-4 cursor-pointer"
                          />
                        </Tooltip>

                      </td>
                    </tr>
                  ))}
                </tbody>
              )}

          </table>
        </div>
      )

  );
}
