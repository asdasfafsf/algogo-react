import { useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Main from '../template/Main';
import useMeStore from '../zustand/MeStore';

function App() {
  const { fetchMe } = useMeStore(({ fetchMe }) => ({ fetchMe }));
  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <DefaultLayout>
      <Main />
    </DefaultLayout>
  );
}

export default App;
