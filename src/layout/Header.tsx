import React from 'react';
import {
  Typography,
  Button,
} from '@material-tailwind/react';

import { useNavigate } from 'react-router-dom';
import NavbarItem from '../atom/NavbarItem';
import Navbar from '../atom/Navbar';
import NavbarSubItem from '../atom/NavbarSubItem';
import Line from '../atom/Line';
import ProfileMenu from '../molecule/ProfileMenu';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [isLogin] = React.useState(true);
  const handleOpen = () => setOpen((cur) => !cur);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);

  return (
    <header className="w-screen">
      <div className="flex items-center justify-center pt-4">
        <div className="container flex items-center justify-between h-12 p-4">
          <div className="flex items-center gap-1">
            {/* <img
              className="w-12 h-12"
              alt="Logo"
              src="/Logo.webp"
            /> */}
            <Typography
              style={{
                fontFamily: 'WavvePADO-Regular',
              }}
              className="relative top-1"
              variant="h2"
            >
              알고고
            </Typography>
          </div>
          <div className="flex items-center h-full gap">
            {!isLogin
              ? (
                <>
                  <Button
                    variant="text"
                    className="text-sm font-medium"
                    onClick={() => navigate('/login')}
                  >
                    로그인
                  </Button>
                  <Button
                    variant="text"
                    className="text-sm font-medium"
                    onClick={() => navigate('/signup')}
                  >
                    회원가입
                  </Button>
                </>
              )
              : <ProfileMenu />}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Navbar>
          <NavbarItem
            onClick={() => {}}
            value="문제"
            isSelected
          >
            <NavbarSubItem isSelected value="모든 문제" to="/" />
            <NavbarSubItem isSelected={false} value="출제하기" to="/" />
          </NavbarItem>
        </Navbar>
      </div>
      <Line />
    </header>
  );
}
