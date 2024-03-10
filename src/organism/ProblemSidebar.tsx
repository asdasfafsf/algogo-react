/* eslint-disable-next-line */
import EnterIcon from '/public/assets/enter.svg?react';
/* eslint-disable-next-line */
import SpaceIcon from '/public/assets/space.svg?react';
import Typography from '@material-tailwind/react/components/Typography';
import Line from '../atom/Line';
import ClipboardWithTooltip from '../atom/ClipboardWithTooltip';
import ProblemImage from '../atom/ProblemImage';
import ProblemCategoryViewer from '../molecule/ProblemCategoryViewer';

export default function ProblemSidebar() {
  const sample = '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1 1 1 1 1\n끝';
  const categoryList: ProblemCategory[] = ['구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현', '구현'];
  return (
    <aside
      className="px-5 py-8 overflow-y-auto w-[500px] h-[calc(100vh-48px)]"
    >
      <Typography variant="h5">포물선의 방정식</Typography>
      <Line className="my-2" />

      <div className="h-4 my-2">
        <div className="flex flex-wrap items-center gap-4 jus">
          <div className="flex flex-wrap items-center">
            <Typography variant="small" className="font-bold">제출 : </Typography>
              &nbsp;
            <Typography variant="small">6554231</Typography>
          </div>
          <div className="flex flex-wrap items-center">
            <Typography variant="small" className="font-bold">정답률 : </Typography>
            &nbsp;
            <Typography variant="small">33.12%</Typography>
          </div>
        </div>
      </div>

      <ProblemCategoryViewer initialState={categoryList.length === 0 ? 'none' : 'hide'} categoryList={categoryList} />

      <Typography variant="small" className="font-medium">
        포물선의 방정식을 구할 지 물어보고
      </Typography>
      <Typography variant="small" className="font-medium">
        예를 선택한다면 초점을 입력받고 방적식을 출력하게 한다.
      </Typography>
      <Typography variant="small" className="font-medium">
        아니오를 선택 시 프로그램을 종료한다는 문구를 출력한다
      </Typography>

      <ProblemImage src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/upload/201003/dfcmhrjj_142c3w76qg8_b.jpg" alt="테스트1" />

      <Typography variant="small" className="font-medium">
        위와 같을 경우에는 아무렇게나 출력한다 아몰랑ㅇㅇㅇㅇㅇ 길게쓰면 어떻게되나요??아몰랑ㅇㅇㅇㅇㅇ 길게쓰면 어떻게되나요??아몰랑ㅇㅇㅇㅇㅇ 길게쓰면 어떻게되나요??아몰랑ㅇㅇㅇㅇㅇ 길게쓰면 어떻게되나요??아몰랑ㅇㅇㅇㅇㅇ 길게쓰면 어떻게되나요??아몰랑ㅇㅇㅇㅇㅇ 길게쓰면 어떻게되나요??
      </Typography>

      <Line className="my-4 opacity-0" />
      <Typography variant="h6">입출력 예시</Typography>
      <Line className="mt-2 mb-4" />

      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-black rounded-sm text-blue-500 h-6 w-6">
            <EnterIcon />
          </div>
              &nbsp;
          <Typography variant="small" className="font-medium">: 다음 줄</Typography>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-black rounded-sm text-blue-500 h-6 w-6">
            <SpaceIcon />
          </div>
              &nbsp;
          <Typography variant="small" className="font-medium">: 스페이스</Typography>
        </div>
      </div>
      <Line className="my-4 opacity-0" />

      <Typography variant="small" className="font-bold pt-2">예시1</Typography>
      <Typography variant="small" className="font-medium">입력</Typography>
      <ClipboardWithTooltip content="1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5" />
      <Typography variant="small" className="font-medium">출력</Typography>
      <ClipboardWithTooltip content={sample} />

      <Typography variant="small" className="font-bold pt-2">예시2</Typography>
      <Typography variant="small" className="font-medium">입력</Typography>
      <ClipboardWithTooltip content="1 2 3 4" />
      <Typography variant="small" className="font-medium">출력</Typography>
      <ClipboardWithTooltip content="1 2 3 4" />

      <Typography variant="small" className="font-bold pt-2">예시3</Typography>
      <Typography variant="small" className="font-medium">입력</Typography>
      <ClipboardWithTooltip content="1 2 3 4" />
      <Typography variant="small" className="font-medium">출력</Typography>
      <ClipboardWithTooltip content="1 2 3 4" />

      <Line className="my-4 opacity-0" />
      <Typography variant="h6">출처</Typography>
      <Line className="my-2" />
    </aside>
  );
}
