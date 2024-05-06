/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
  Tooltip,
} from '@material-tailwind/react';

import { LinkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';
import ProblemLevelChip from '../atom/ProblemLevelChip';
import ProblemStateChip from '../atom/ProblemStateChip';
import Dropdown from '../atom/Dropdown';
import ProblemTypeDropdown from '../organism/ProblemTypeDropdown';
import ProblemGradeDropdown from '../organism/ProblemGradeDropdown';
import defaultProblemOption from '../constant/ProblemOption';
import useConfirmModal from '../hook/useConfirmModal';

export default function ProblemTable() {
  const problemTableHeaders = ['상태', '제목', '난이도', '정답률', '제출', '출처'];
  const problems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1, 1].map((elem) => ({
    state: Math.floor((Math.random() * 100) % 2),
    title: '저는 문제입니다아아아아아아아아아아아아아아',
    grade: `다이아 ${(elem % 5) + 1}`,
    rate: '88.88',
    submitCount: (Math.random() * 10000).toFixed(0),
    source: 'https://acimpc.net/problem/3455',
  }));
  const [isOpenGrade, setOpenGrade] = useState(true);
  const [problemList, setProblemList] = useState(problems);
  const [optionList, setOptionList] = useState<ProblemOption[]>(defaultProblemOption);
  const [confirm] = useConfirmModal();

  return (
    <section className="container mt-8">
      <Card className="w-full h-full">
        <div
          className="flex flex-wrap justify-between gap-4 p-6 mb-4 rounded-none"
        >
          <div className="w-full">
            <div className="w-full h-12">
              <Typography variant="h5" color="blue-gray">
                모든 문제
              </Typography>
            </div>
            <div className="flex flex-wrap items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <ProblemTypeDropdown
                  optionList={optionList}
                  handleSelect={useCallback((e, index) => {
                    const newOptionList = [...optionList];
                    newOptionList[index].isSelected = !newOptionList[index].isSelected;
                    setOptionList(newOptionList);
                  }, [optionList])}
                />
                <ProblemGradeDropdown
                  optionList={optionList}
                  handleSelect={useCallback((e, value) => {
                    const newOptionList = [...optionList];
                    const index = newOptionList.findIndex((elem) => elem.value === value);

                    if (index === -1) {
                      return;
                    }
                    newOptionList[index].isSelected = !newOptionList[index].isSelected;
                    setOptionList(newOptionList);
                  }, [optionList])}
                  handleOk={async () => {}}
                  handleReset={async (e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    e.currentTarget.blur();
                    const isOk = await confirm('초기화 하시겠습니까?');

                    if (isOk === false) {
                      return;
                    }

                    const newOptionList = optionList.map((elem) => {
                      if (elem.type === '난이도') {
                        const isSelected = false;
                        return { ...elem, isSelected };
                      }
                      return elem;
                    });

                    setOptionList(newOptionList);
                  }}
                />
                <Dropdown value="상태">
                  <div>안녕</div>
                </Dropdown>
              </div>
              <div className="flex flex-wrap items-center w-full gap-4 shrink-0 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="제목"
                    icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                  />
                </div>
                <Button
                  className="w-full md:max-w-fit"
                >
                  검색
                </Button>
              </div>
            </div>

          </div>

        </div>
        <CardBody className="!overflow-scroll !p-0">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {problemTableHeaders.map((head) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 !p-6"
                  >
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {problemList.map(({
                state, source, title, grade, rate, submitCount,
              }) => (
                <tr key={title}>
                  <td className="w-12 p-4 border-b border-gray-300">
                    <ProblemStateChip className="w-11" state={state} value="" />

                  </td>
                  <td className="p-4 border-b border-gray-300 min-w-80">
                    <Typography
                      className="!font-medium"
                      variant="small"
                    >
                      {title}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-gray-300">
                    <div className="flex items-center h-full ">
                      <ProblemLevelChip
                        className="text-white "
                        level={`${isOpenGrade ? grade as ProblemLevel : '알 수 없음'}`}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    <Typography
                      className="!font-medium"
                      variant="small"
                    >
                      {`${rate} %`}
                    </Typography>

                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    <Typography
                      className="!font-medium"
                      variant="small"
                    >
                      {`${submitCount}`}
                    </Typography>

                  </td>
                  <td key={source}className="px-6 py-4 border-b border-gray-300">
                    <div className="flex items-center w-full h-full">
                      <Tooltip value="백준" content="백준">

                        <LinkIcon className="w-4 h-4" />
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <Typography variant="h6" color="blue-gray">
            Page 2
            {' '}
            <span className="font-normal text-gray-600">of 10</span>
          </Typography>
          <div className="flex gap-4">
            <Button
              variant="outlined"
              className="flex items-center gap-1"
            >
              <ChevronLeftIcon strokeWidth={3} className="w-3 h-3" />
              prev
            </Button>
            <Button
              variant="outlined"
              className="flex items-center gap-1"
            >
              next
              <ChevronRightIcon strokeWidth={3} className="w-3 h-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
