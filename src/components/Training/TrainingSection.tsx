import { Typography } from '@components/common';
import { useNavigate } from 'react-router-dom';
import { TrainingCard } from './TrainingCard';

export function TrainingSection() {
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h5" className="mb-4">문제 풀이</Typography>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <TrainingCard
          title="오늘의 문제"
          description="매일 새로운 도전"
          iconUrl="https://cdn-icons-png.flaticon.com/512/2721/2721691.png"
          color="blue"
          status="active"
          onClick={() => {
            navigate('/problem/today');
          }}
        />
        <TrainingCard
          title="유형별"
          description="패턴별 학습"
          iconUrl="https://cdn-icons-png.flaticon.com/512/5262/5262593.png"
          color="purple"
          status="coming-soon"
          onClick={() => {
            navigate('/problem/type');
          }}
        />
        <TrainingCard
          title="준비중"
          description="곧 만나요"
          iconUrl="https://cdn-icons-png.flaticon.com/512/2972/2972531.png"
          color="gray"
          status="coming-soon"
        />
      </div>
    </div>

  );
}
