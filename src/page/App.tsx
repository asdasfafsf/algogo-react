import { useEffect } from 'react';
import { DefaultLayout } from '@layout/index';
import useMeStore from '@zustand/MeStore';
import { ProblemTable } from '@components/Table/index';
import { MainCarousel } from '@components/Carousel';

function App() {
  const { updateMe } = useMeStore(({ updateMe }) => ({ updateMe }));
  useEffect(() => {
    updateMe();
  }, []);

  return (
    <DefaultLayout>
      <div className="my-8">
        <MainCarousel />
        <div className="h-8" />
        <ProblemTable />
      </div>
    </DefaultLayout>
  );
}

export default App;
