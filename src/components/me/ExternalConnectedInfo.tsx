import { Typography } from '@components/common';
import { useState } from 'react';
import useConfirmModal from '@hook/useConfirmModal';
import useAlertModal from '@hook/useAlertModal';
import ExternalSiteCard from './ExternalSiteCard';

export default function ExternalConnectedInfo() {
  // 외부 사이트 계정 연동 상태 관리
  const [externalAccounts, setExternalAccounts] = useState({
    baekjoon: { id: '', isConnected: false },
    codeforces: { id: '', isConnected: false },
  });

  const [confirm] = useConfirmModal();
  const [alert] = useAlertModal();

  // 외부 사이트 계정 연동/해제 핸들러
  const handleExternalDisconnect = async (siteKey: string) => {
    const result = await confirm(`${siteKey} 계정 연동을 해제하시겠습니까?`);
    if (result) {
      // TODO: API 호출로 실제 연동 해제 처리
      setExternalAccounts((prev) => ({
        ...prev,
        [siteKey]: { id: '', isConnected: false },
      }));

      await alert(`${siteKey} 계정 연동이 해제되었습니다.`);
    }
  };

  // 외부 사이트 정보
  const externalSites = [
    {
      key: 'baekjoon',
      name: '백준 Online Judge',
      description: '백준에서 해결한 문제들을 가져옵니다',
      color: 'bg-gradient-to-r from-blue-600 to-blue-700',
      icon: '🏆',
      siteUrl: 'https://www.acmicpc.net',
      isComingSoon: true,
    },
    {
      key: 'codeforces',
      name: 'Codeforces',
      description: 'Codeforces에서 해결한 문제들을 가져옵니다',
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      icon: '🚀',
      siteUrl: 'https://codeforces.com',
      isComingSoon: true,
    },
  ];

  return (
    <div className="transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-md">
      <div className="p-8">
        <div className="mb-8">
          <Typography variant="h4" weight="bold" className="mb-2 text-gray-900">
            외부 사이트 계정 연동
          </Typography>
          <Typography variant="medium" weight="regular" className="text-gray-600">
            코딩 테스트 사이트의 계정을 연동하여 풀이 기록을 가져오세요
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {externalSites.map((site) => {
            const account = externalAccounts[site.key as keyof typeof externalAccounts];
            return (
              <ExternalSiteCard
                key={site.key}
                siteKey={site.key}
                name={site.name}
                description={site.description}
                color={site.color}
                icon={site.icon}
                isConnected={account.isConnected}
                connectedId={account.id}
                isComingSoon={site.isComingSoon}
                siteUrl={site.siteUrl}
                onDisconnect={handleExternalDisconnect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
