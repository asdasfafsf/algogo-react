import { useEffect } from 'react';
import { DefaultLayout } from '@layout/index';
import useMeStore from '@zustand/MeStore';
import { MainCarousel } from '@components/Carousel';
import ProblemListCard from '@components/problem-list/ProblemListCard';

function App() {
  return (
    <DefaultLayout>
      <div className="my-8">
        <MainCarousel />
        <div className="h-8" />
        <ProblemListCard />
      </div>
    </DefaultLayout>
  );
}

export default App;
