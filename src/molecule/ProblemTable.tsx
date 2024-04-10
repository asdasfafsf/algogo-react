/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  Chip,
  Input,
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
} from '@material-tailwind/react';

import { LinkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ProblemLevelChip from '../atom/ProblemLevelChip';

const TABLE_HEAD = ['상태', '제목', '난이도', '정답률', '제출', '출처'];
const problems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1, 1].map((elem) => ({
  state: Math.floor((Math.random() * 100) % 2),
  title: '저는 문제입니다아아아아아아아아아아아아아아',
  grade: `브론즈${(elem % 5) + 1}`,
  rate: '88.88',
  submitCount: (Math.random() * 10000).toFixed(0),
  source: 'https://acimpc.net/problem/3455',
}));
export default function ProblemTable() {
  const [isOpenGrade, setOpenGrade] = useState(true);

  return (
    <section className="container mt-8">
      <Card className="w-full h-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="flex flex-wrap justify-between gap-4 p-4 mb-4 rounded-none"
        >
          <div className="flex items-center justify-center">
            <Typography variant="h5" color="blue-gray">
              모든 문제
            </Typography>
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
        </CardHeader>
        <CardBody className="!overflow-scroll !p-0">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
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
              {problems.map(({
                state, source, title, grade, rate, submitCount,
              }) => (
                <tr key={title}>
                  <td className="w-12 p-4 border-b border-gray-300">
                    {state === 0
                      ? (

                        <Chip
                          className="w-11"
                          color="red"
                          variant="ghost"
                          value="실패"
                        />
                      ) : state === 1
                        ? (
                          <Chip
                            className="w-11"
                            color="green"
                            variant="ghost"
                            value="성공"
                          />
                        )
                        : (
                          <Chip
                            className="w-11"
                            color="green"
                            variant="ghost"
                            value="미제출"
                          />
                        )}
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
                    <div className=" flex items-center h-full">
                      <ProblemLevelChip
                        className=" text-white"
                        level={`${isOpenGrade ? grade as ProblemLevel : '알 수 없음'}`}
                      />
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-300">
                    <Typography
                      className="!font-medium"
                      variant="small"
                    >
                      {`${rate} %`}
                    </Typography>

                  </td>
                  <td className="p-4 border-b border-gray-300">
                    <Typography
                      className="!font-medium"
                      variant="small"
                    >
                      {`${submitCount}`}
                    </Typography>

                  </td>
                  <td key={source}className="p-4 border-b border-gray-300">
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
