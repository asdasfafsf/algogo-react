import Typography from '@material-tailwind/react/components/Typography';
import Line from '../atom/Line';
import ClipboardWithTooltip from '../atom/ClipboardWithTooltip';

export default function ProblemSidebar() {
  const sample = '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1 1 1 1 1\n끝';
  return (
    // eslint-disable-next-line react/style-prop-object
    <aside
      className="max-w-[500px] w-[500px] px-5 py-10 overflow-y-scroll h-screen"
    >
      <Typography variant="h5">문제이름</Typography>
      <Line className="my-4" />

      <Typography variant="small" className="font-medium">
        포물선의 방정식을 구할 지 물어보고
      </Typography>
      <Typography variant="small" className="font-medium">
        예를 선택한다면 초점을 입력받고 방적식을 출력하게 한다.
      </Typography>
      <Typography variant="small" className="font-medium">
        아니오를 선택 시 프로그램을 종료한다는 문구를 출력한다
      </Typography>

      <Line className="my-4 opacity-0" />
      <Typography variant="h6">입출력 예시</Typography>
      <Line className="my-2" />
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
    </aside>
  );
}
