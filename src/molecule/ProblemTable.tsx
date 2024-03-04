/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  Chip,
  Avatar,
  Input,
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';

import { MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const TABLE_ROW = [
  {
    img: 'https://www.material-tailwind.com/image/avatar1.jpg',
    name: 'Emma Roberts',
    detail: 'emma@mail.com',
    role: 'Manager',
    position: 'Organization',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar2.jpg',
    name: 'Marcel Glock',
    detail: 'marcel@mail.com',
    role: 'Executive',
    position: 'Projects',
    online: false,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar4.jpg',
    name: 'Misha Stam',
    detail: 'misha@mail.com',
    role: 'Social Media',
    position: 'Projects',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar5.jpg',
    name: 'Lucian Eurel',
    detail: 'lucian@mail.com',
    role: 'Programator',
    position: 'Developer',
    online: false,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar6.jpg',
    name: 'Linde Michele',
    detail: 'linde@mail.com',
    role: 'Manager',
    position: 'Organization',
    online: false,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar3.jpg',
    name: 'Georg Joshiash',
    detail: 'georg@mail.com',
    role: 'Designer',
    position: 'Projects',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar3.jpg',
    name: 'Georg Joshiash',
    detail: 'georg@mail.com',
    role: 'Designer',
    position: 'Projects',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar3.jpg',
    name: 'Georg Joshiash',
    detail: 'georg@mail.com',
    role: 'Designer',
    position: 'Projects',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar3.jpg',
    name: 'Georg Joshiash',
    detail: 'georg@mail.com',
    role: 'Designer',
    position: 'Projects',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar3.jpg',
    name: 'Georg Joshiash',
    detail: 'georg@mail.com',
    role: 'Designer',
    position: 'Projects',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar3.jpg',
    name: 'Georg Joshiash',
    detail: 'georg@mail.com',
    role: 'Designer',
    position: 'Projects',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://www.material-tailwind.com/image/avatar3.jpg',
    name: 'Georg Joshiash',
    detail: 'georg@mail.com',
    role: 'Designer',
    position: 'Projects',
    online: true,
    date: '23/04/18',
  },
];

const TABLE_HEAD = ['제목', '난이도', '상태', '유형', '출처'];

export default function ProblemTable() {
  return (
    <section className="container mt-8">
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div className="flex items-center justify-center">
            <Typography variant="h5" color="blue-gray">
              모든 문제
            </Typography>
            {/* <Typography
              variant="small"
              className="text-gray-600 font-normal"
            >
              원하는 문제를 선택해서 푸세요!(멘트 추천좀)
            </Typography> */}
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="제목"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            {/* <Button className="md:max-w-fit w-full">add member</Button> */}
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll !p-0">
          <table className="w-full min-w-max table-auto text-left">
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
              {TABLE_ROW.map(
                ({
                  img,
                  name,
                  detail,
                  role,
                  position,
                  online,
                  date,
                }) => {
                  const classes = '!p-4 border-b border-gray-300';
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={name} size="md" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="!font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              className="!font-normal text-gray-600"
                            >
                              {detail}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="!font-semibold"
                          >
                            {role}
                          </Typography>
                          <Typography
                            variant="small"
                            className="!font-normal text-gray-600"
                          >
                            {position}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={online ? 'online' : 'offline'}
                            color={online ? 'green' : 'gray'}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className="text-right p-4 border-b border-gray-300">
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="w-4 h-4 text-gray-400" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex justify-between items-center">
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
              <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
              prev
            </Button>
            <Button
              variant="outlined"
              className="flex items-center gap-1"
            >
              next
              <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
