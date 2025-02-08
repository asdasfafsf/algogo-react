import { LogoWithText } from '@components/common';
import { useNavigate } from 'react-router-dom';
import useMeStore from '@zustand/MeStore';

import { ProfileMenu } from '@components/Dropdown/index';

import { Button } from '@components/Button';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import HeaderMenu from './HeaderMenu';

export default function Header() {
  const navigate = useNavigate();
  const me = useMeStore((state) => state.me);
  const logout = useMeStore((state) => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const memuItemList = [
    {
      title: '문제',
      subTitle: '문제 풀기',
      pathList: ['/problem', '/'],
      subMenuList: [
        { title: '전체 문제', pathList: ['/problem', '/'], canAccess: true },
        { title: '오늘의 문제(준비중)', pathList: ['/problem/today'], canAccess: false },
      ],
    },
  ];

  return (
    <header className="sticky top-0 w-full bg-white z-20">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8 h-full">
            <LogoWithText size="small" />
            <div className="w-6" />
            {/* Desktop Menu */}
            <div className="relative h-full hidden md:flex items-center">
              {memuItemList.map((item) => (
                <HeaderMenu key={item.title} menuItem={item} />
              ))}
            </div>
          </div>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <div
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Bars3Icon className="w-6 h-6" />
            </div>

            {/* Auth Buttons / Profile Menu */}
            <div className="hidden md:flex items-center gap-2">
              {me === null ? (
                <>
                  <Button variant="text" onClick={() => navigate('/login')}>
                    로그인
                  </Button>
                  <Button onClick={() => navigate('/signup')}>
                    회원가입
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <ProfileMenu me={me} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="container max-w-screen-xl mx-auto p-4">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-end mb-6">
                <div
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Bars3Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-6">
                {memuItemList.map((item) => (
                  <div key={item.title} className="py-2">
                    <div className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </div>
                    <div className="space-y-3">
                      {item.subMenuList?.map((subItem) => (
                        <div
                          key={subItem.title}
                          className={`pl-4 py-3 ${
                            subItem.canAccess
                              ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 cursor-pointer'
                              : 'text-gray-400 cursor-not-allowed'
                          } rounded-lg transition-colors`}
                          onClick={() => {
                            if (subItem.canAccess) {
                              navigate(subItem.pathList[0]);
                              setIsMobileMenuOpen(false);
                            }
                          }}
                        >
                          {subItem.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* 회원 섹션 */}
                <div className="py-2">
                  <div className="text-xl font-semibold text-gray-900 mb-3">
                    회원
                  </div>
                  <div className="space-y-3">
                    {me === null ? (
                      <>
                        <div
                          className="pl-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                          onClick={() => {
                            navigate('/login');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          로그인
                        </div>
                        <div
                          className="pl-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                          onClick={() => {
                            navigate('/signup');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          회원가입
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="pl-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                          onClick={() => {
                            navigate('/me');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          마이페이지
                        </div>
                        <div
                          className="pl-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                          onClick={() => {
                            logout();
                            // TODO: 로그 아웃 로직 추가 필요
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          로그아웃
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
