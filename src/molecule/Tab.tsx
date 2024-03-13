import TabHeader from '../atom/TabHeader';
import TabBody from '../atom/TabBody';

export default function Tab() {
  return (
    <div className="h-full bg-gray-900 overflow-hidden">
      <TabHeader
        selectedIndex={0}
        headerList={['입력', '출력 결과', '테스트 케이스']}
        handleClick={() => {}}
      />
      <TabBody />
    </div>
  );
}
