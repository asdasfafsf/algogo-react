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
    <>
      <header className="fixed top-0 z-20 w-full bg-white">
        <div className="container max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Nav */}
            <div className="flex items-center h-full gap-8">
              <LogoWithText size="medium" />
              <div className="w-6" />
              {/* Desktop Menu */}
              <div className="relative items-center hidden h-full md:flex">
                {memuItemList.map((item) => (
                  <HeaderMenu key={item.title} menuItem={item} />
                ))}
              </div>
            </div>

            {/* Right: Auth buttons */}
            <div className="flex items-center gap-2">
              {/* Mobile Menu Button */}
              <div
                className="p-2 transition-colors rounded-full cursor-pointer md:hidden hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Bars3Icon className="w-6 h-6" />
              </div>

              {/* Auth Buttons / Profile Menu */}
              <div className="items-center hidden gap-2 md:flex">
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
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="container max-w-screen-xl p-4 mx-auto">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-end mb-6">
                <div
                  className="p-2 transition-colors rounded-full cursor-pointer hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Bars3Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-6">
                {memuItemList.map((item) => (
                  <div key={item.title} className="py-2">
                    <div className="mb-3 text-xl font-semibold text-gray-900">
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
                  <div className="mb-3 text-xl font-semibold text-gray-900">
                    회원
                  </div>
                  <div className="space-y-3">
                    {me === null ? (
                      <>
                        <div
                          className="py-3 pl-4 text-gray-600 transition-colors rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-50"
                          onClick={() => {
                            navigate('/login');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          로그인
                        </div>
                        <div
                          className="py-3 pl-4 text-gray-600 transition-colors rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-50"
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
                          className="py-3 pl-4 text-gray-600 transition-colors rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-50"
                          onClick={() => {
                            navigate('/me');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          마이페이지
                        </div>
                        <div
                          className="py-3 pl-4 text-gray-600 transition-colors rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-50"
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
      <div className="relative h-16 bg-gray-100" />
    </>
  );
}
