import { Typography } from '@components/common';
import { Button } from '@components/Button';
import { memo } from 'react';

interface Activity {
  action: string;
  problem: string;
  time: string;
}

interface RecentActivityProps {
  activities?: Activity[];
}

export const RecentActivity = memo(({ activities }: RecentActivityProps) => {
//   const defaultActivities: Activity[] = [
//     { action: '문제 해결', problem: '백준 1234번', time: '2시간 전' },
//     { action: '문제 시도', problem: 'Codeforces 567A', time: '5시간 전' },
//     { action: '문제 해결', problem: '프로그래머스 Level 2', time: '1일 전' },
//     { action: '문제 해결', problem: 'LeetCode Easy', time: '2일 전' },
//   ];

  const displayActivities = activities || [];

  // 활동 내역이 없는 경우 빈 상태 표시
  if (!displayActivities || displayActivities.length === 0) {
    return (
      <div className="transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
        <div className="flex flex-col items-center justify-center p-12 text-center">
          {/* 빈 상태 아이콘 */}
          <div className="flex items-center justify-center w-20 h-20 mb-6 bg-gray-100 rounded-full">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>

          {/* 메시지 */}
          <Typography variant="h4" weight="bold" className="mb-3 text-gray-900">
            아직 활동 내역이 없어요
          </Typography>
          <Typography variant="medium" weight="regular" className="max-w-md mb-8 text-gray-500">
            첫 번째 문제를 해결하고 활동을 시작해보세요!
            <br />
            꾸준한 활동으로 실력을 키워나갈 수 있습니다.
          </Typography>

          {/* 액션 버튼
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="filled" color="blue" size="medium" className="font-medium">
              문제 풀러 가기
            </Button>
            <Button variant="outlined" color="gray" size="medium" className="font-medium">
              문제집 둘러보기
            </Button>
          </div> */}

          {/* 추가 안내 */}
          <div className="flex items-center gap-2 mt-8 text-sm text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <Typography variant="small" weight="regular" className="text-gray-400">
              문제를 해결하면 이곳에 활동 기록이 표시됩니다
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  // 활동 내역이 있는 경우 기존 UI 표시
  return (
    <div className="transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
      <div className="p-8">
        <Typography variant="h4" weight="bold" className="mb-8 text-gray-900">
          최근 활동
        </Typography>

        <div className="space-y-4">
          {displayActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 transition-colors rounded-xl hover:bg-gray-50">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="flex-1">
                <Typography variant="medium" weight="semibold" className="text-gray-900">
                  {activity.action}
                </Typography>
                <Typography variant="small" weight="regular" className="text-gray-600">
                  {activity.problem}
                </Typography>
              </div>
              <Typography variant="small" weight="regular" className="text-gray-400">
                {activity.time}
              </Typography>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="text" color="blue" size="small" className="font-medium">
            모든 활동 보기
          </Button>
        </div>
      </div>
    </div>
  );
});

export default RecentActivity;
