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
import { useState } from 'react';
import ProblemLevelChip from '../atom/ProblemLevelChip';
import ProblemStateChip from '../atom/ProblemStateChip';
import ProblemTypeDropdown from '../organism/ProblemTypeDropdown';
import useProblemTable from '../hook/useProblemTable';
import ProblemLevelDropdown from '../organism/ProblemLevelDropdown';
import ChipWithSelected from '../atom/ChipWithSelected';
import ProblemStateDropdown from './ProblemStateDropdown';
import useProblemTableFilterStore from '../zustand/ProblemTableFilterStore';
import ProblemTableFilter from './ProblemTableFilter';
import Pagebar from '../atom/Pagebar';

export default function ProblemTable() {
  const problemTableHeaders = ['상태', '제목', '난이도', '정답률', '제출', '출처'];
  const [isOpenGrade, setOpenGrade] = useState(true);

  const { problemOptionList, setProblemOptionList } = useProblemTableFilterStore((state) => state);
  const [problemList] = useProblemTable();

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
                <ProblemTypeDropdown />
                <ProblemLevelDropdown />
                <ProblemStateDropdown />
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
            <ProblemTableFilter />

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
        <CardFooter className="flex items-center justify-center">
          <Pagebar
            currentPage={11}
            displayedPageRange={10}
            handleChangePage={() => {}}
          />
        </CardFooter>
      </Card>
    </section>
  );
}
