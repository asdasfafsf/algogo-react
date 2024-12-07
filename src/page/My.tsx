import { BasicMyInfo, ConnectedInfo } from '@components/me';
import { Typography } from '@components/common';
import DefaultLayout from '../layout/DefaultLayout';

function My() {
  return (
    <DefaultLayout>
      <div className="min-h-[calc(100vh-300px)] w-full py-4 flex flex-col">
        <Typography variant="h4" className="my-6">기본 정보</Typography>
        <BasicMyInfo />

        <Typography variant="h4" className="my-6">연동 정보</Typography>
        <ConnectedInfo />

      </div>
    </DefaultLayout>

  );
}

export default My;
