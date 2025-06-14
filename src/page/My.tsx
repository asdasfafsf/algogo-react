import { Typography } from '@components/common';
import { Button } from '@components/Button';
import { OAuthConnectedInfo, ExternalConnectedInfo, ProfileCard } from '@components/me';
import ContributionGraph from '@components/me/ContributionGraph';
import { useState, useMemo } from 'react';
import DefaultLayout from '../layout/DefaultLayout';

function My() {
  const [profileData, setProfileData] = useState({
    displayName: '알고고 사용자',
    email: 'user@algogo.co.kr',
    bio: '코딩 테스트를 사랑하는 개발자입니다.',
    avatar: '',
  });

  const handleProfileSave = (newProfileData: typeof profileData) => {
    setProfileData(newProfileData);
    // TODO: API 호출로 프로필 업데이트
  };

  // 잔디 데이터 생성 (최근 365일)
  const contributionData = useMemo(() => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i -= 1) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const contributions = Math.floor(Math.random() * 5); // 0-4 랜덤 기여도
      data.push({
        date: date.toISOString().split('T')[0],
        count: contributions,
      });
    }
    return data;
  }, []); // 의존성 없음 - 한 번만 생성

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-8">

            {/* 프로필 카드 */}
            <ProfileCard
              profileData={profileData}
              onSave={handleProfileSave}
            />

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-6 transition-all duration-300 bg-white border border-gray-100 group rounded-2xl hover:shadow-lg hover:border-gray-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center transition-all duration-300 shadow-sm w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl group-hover:shadow-md">
                    <svg className="text-white w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <Typography variant="small" weight="regular" className="mb-1 text-gray-500">
                      해결한 문제
                    </Typography>
                    <Typography variant="h2" weight="bold" className="text-gray-900">
                      156
                    </Typography>
                    <Typography variant="small" weight="regular" className="text-emerald-600">
                      +12 이번 주
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="p-6 transition-all duration-300 bg-white border border-gray-100 group rounded-2xl hover:shadow-lg hover:border-gray-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center transition-all duration-300 shadow-sm w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl group-hover:shadow-md">
                    <svg className="text-white w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <Typography variant="small" weight="regular" className="mb-1 text-gray-500">
                      연속 활동
                    </Typography>
                    <Typography variant="h2" weight="bold" className="text-gray-900">
                      21일
                    </Typography>
                    <Typography variant="small" weight="regular" className="text-emerald-600">
                      최고 기록!
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="p-6 transition-all duration-300 bg-white border border-gray-100 group rounded-2xl hover:shadow-lg hover:border-gray-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center transition-all duration-300 shadow-sm w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl group-hover:shadow-md">
                    <svg className="text-white w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <Typography variant="small" weight="regular" className="mb-1 text-gray-500">
                      정답률
                    </Typography>
                    <Typography variant="h2" weight="bold" className="text-gray-900">
                      94%
                    </Typography>
                    <Typography variant="small" weight="regular" className="text-purple-600">
                      상위 5%
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="p-6 transition-all duration-300 bg-white border border-gray-100 group rounded-2xl hover:shadow-lg hover:border-gray-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center transition-all duration-300 shadow-sm w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl group-hover:shadow-md">
                    <svg className="text-white w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <Typography variant="small" weight="regular" className="mb-1 text-gray-500">
                      평균 시간
                    </Typography>
                    <Typography variant="h2" weight="bold" className="text-gray-900">
                      12분
                    </Typography>
                    <Typography variant="small" weight="regular" className="text-orange-600">
                      -2분 개선
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* 계정 연동 관리 */}
            <OAuthConnectedInfo />

            {/* 외부 사이트 계정 연동 */}
            <ExternalConnectedInfo />

            {/* 활동 기록 */}
            <ContributionGraph data={contributionData} />

            {/* 최근 활동 */}
            <div className="transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
              <div className="p-8">
                <Typography variant="h4" weight="bold" className="mb-8 text-gray-900">
                  최근 활동
                </Typography>

                <div className="space-y-4">
                  {[
                    { action: '문제 해결', problem: '백준 1234번', time: '2시간 전' },
                    { action: '문제 시도', problem: 'Codeforces 567A', time: '5시간 전' },
                    { action: '문제 해결', problem: '프로그래머스 Level 2', time: '1일 전' },
                    { action: '문제 해결', problem: 'LeetCode Easy', time: '2일 전' },
                  ].map((activity, index) => (
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

          </div>
        </div>

      </div>
    </DefaultLayout>
  );
}

export default My;
