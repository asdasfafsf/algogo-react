import { Button } from '@components/Button/index';
import { Line, LogoWithText } from '@components/common';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarItem, NavbarSubItem } from '@components/Navbar/index';
import useMeStore from '@zustand/MeStore';

import { ProfileMenu } from '@components/Dropdown/index';

export default function Header() {
  const navigate = useNavigate();
  const meStore = useMeStore(({ me }) => ({ me }));
  const { me } = meStore;

  return (
    <header className="w-full">
      <div className="flex items-center justify-center w-full pt-4">
        <div className="container flex items-center justify-between h-12 max-w-screen-xl">
          <LogoWithText size="medium" />
          <div className="flex items-center h-full gap">
            {
                me === null ? (
                  <>
                    <Button
                      variant="text"
                      className="!text-sm font-medium"
                      onClick={() => navigate('/login')}
                    >
                      로그인
                    </Button>
                    <Button
                      variant="text"
                      className="!text-sm font-medium"
                      onClick={() => navigate('/signup')}
                    >
                      회원가입
                    </Button>
                  </>
                )
                  : <ProfileMenu me={me as Me} />
              }
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Navbar>
          <NavbarItem
            onClick={() => {}}
            value="문제"
            isSelected
          >
            <>
              <NavbarSubItem isSelected value="모든 문제" to="/" />
              {/* <NavbarSubItem isSelected={false} value="출제하기" to="/" /> */}
            </>

          </NavbarItem>
        </Navbar>
      </div>
      <Line />
    </header>
  );
}
