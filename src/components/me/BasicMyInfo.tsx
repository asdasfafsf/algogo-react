import { Card } from '@components/Card/index';
import { Typography, ProfilePhoto } from '@components/common/index';
import { Input } from '@components/Input/index';
import useMyInfo from '@hook/me/useMyInfo';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function BasicMyInfo() {
  const {
    me,
    isEditMode,
    image,
    handleEditMode,
    handleSave,
    handleCancel,
    name,
    handleChangeName,
    handleChangeProfilePhoto,
  } = useMyInfo();

  return (
    <div className="relative">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60" />

      <Card className="relative overflow-hidden border-0 rounded-full shadow-2xl bg-white/80 backdrop-blur-sm">
        {isEditMode ? (
          <div className="p-10">
            {/* 편집 모드 헤더 */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <Typography variant="h4" weight="bold" className="mb-1 text-gray-900">
                  프로필 편집
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  나만의 프로필을 완성해보세요
                </Typography>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="p-3 text-gray-600 transition-all duration-200 bg-gray-100 rounded-full hover:text-gray-800 hover:bg-gray-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="p-3 text-white transition-all duration-200 bg-blue-500 rounded-full hover:bg-blue-600"
                >
                  <CheckIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
              {/* 프로필 사진 섹션 */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute transition duration-300 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 blur group-hover:opacity-40" />
                  <div className="relative">
                    <ProfilePhoto
                      handleChange={handleChangeProfilePhoto}
                      src={image}
                      isEditable
                      size="large"
                      className="transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* 정보 입력 섹션 */}
              <div className="flex-1 space-y-8">
                <div className="space-y-6">
                  <div className="group">
                    <label className="block mb-3 text-xs font-semibold text-gray-700">
                      이름
                    </label>
                    <div className="relative">
                      <Input
                        onChange={handleChangeName}
                        value={name}
                        className="w-full h-12 px-4 text-sm transition-all duration-200 bg-white border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-0"
                        placeholder="이름을 입력하세요"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block mb-3 text-xs font-semibold text-gray-700">
                      이메일
                    </label>
                    <div className="relative">
                      <Input
                        disabled
                        value={me?.email}
                        className="w-full h-12 px-4 text-sm border-2 border-gray-200 rounded-full cursor-not-allowed bg-gray-50"
                      />
                      <div className="absolute transform -translate-y-1/2 right-4 top-1/2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      </div>
                    </div>
                    <Typography variant="small" className="flex items-center gap-1 mt-2 text-gray-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      가입 시 등록된 이메일입니다
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10">
            {/* 프로필 표시 모드 */}
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
              {/* 프로필 사진 */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute rounded-full -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 blur opacity-20" />
                  <div className="relative">
                    <ProfilePhoto
                      src={image}
                      isEditable={false}
                      size="large"
                    />

                  </div>
                </div>
              </div>

              {/* 프로필 정보 */}
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <div>
                  <Typography variant="h4" weight="bold" className="mb-2 text-gray-900">
                    {me?.name || '이름 없음'}
                  </Typography>
                  <Typography variant="medium" className="mb-4 text-gray-600">
                    {me?.email || '이메일 정보가 없습니다'}
                  </Typography>
                  {me?.email && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <Typography variant="small" className="font-medium text-gray-600">
                        인증된 계정
                      </Typography>
                    </div>
                  )}
                </div>

                {/* 통계 정보 */}
                <div className="flex flex-wrap gap-8 pt-6">
                  <div className="text-center">
                    <Typography variant="h5" weight="bold" className="text-blue-600">
                      0
                    </Typography>
                    <Typography variant="small" className="text-gray-500">
                      해결한 문제
                    </Typography>
                  </div>
                  <div className="text-center">
                    <Typography variant="h5" weight="bold" className="text-indigo-600">
                      0
                    </Typography>
                    <Typography variant="small" className="text-gray-500">
                      연속 일수
                    </Typography>
                  </div>
                </div>
              </div>

              {/* 편집 버튼 */}
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={handleEditMode}
                  className="px-6 py-3 text-sm font-semibold text-white transition-all duration-200 bg-blue-500 rounded-full hover:bg-blue-600"
                >
                  <div className="flex items-center gap-2">
                    <PencilIcon className="w-4 h-4" />
                    <span>편집</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
