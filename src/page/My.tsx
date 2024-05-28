import ProfilePhoto from '../atom/ProfilePhoto';
import DefaultLayout from '../layout/DefaultLayout';
import Main from '../template/Main';

function My() {
  return (
    <DefaultLayout>
      <div className="min-h-[calc(100vh-300px)] w-full py-4 flex flex-col items-center">
        <div className="w-full h-full p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-start gap-8">
            <ProfilePhoto />
            <div className="flex items-center h-full">
              <div>
                <div className="w-full h-full mb-4">
                  <h2 className="text-2xl font-semibold">이름</h2>
                  <p className="text-gray-600">한원근</p>
                </div>
                <div className="w-full h-full mb-4">
                  <h2 className="text-2xl font-semibold">이메일</h2>
                  <p className="text-gray-600">asdasfafsf@naver.com</p>
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
