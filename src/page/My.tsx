// import { Typography } from '@components/common';
import {
  OAuthConnectedInfo, ExternalConnectedInfo, BasicMyInfo,
} from '@components/me';
import ContributionGraph from '@components/me/ContributionGraph';
import StatsCards from '@components/me/StatsCards';
import RecentActivity from '@components/me/RecentActivity';
import DefaultLayout from '../layout/DefaultLayout';

function My() {
  // 잔디 데이터 생성 (최근 365일)
  const contributionData = [] as { date: string; count: number }[]; // 의존성 없음 - 한 번만 생성

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-8">

            {/* 프로필 카드 */}
            <BasicMyInfo />

            {/* 통계 카드 */}
            <StatsCards />

            {/* 계정 연동 관리 */}
            <OAuthConnectedInfo />

            {/* 외부 사이트 계정 연동 */}
            <ExternalConnectedInfo />

            {/* 활동 기록 */}
            <ContributionGraph data={contributionData} />

            {/* 최근 활동 */}
            <RecentActivity />

          </div>
        </div>

      </div>
    </DefaultLayout>
  );
}

export default My;
