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
          <Typography variant="h2">알고고(로고자리)</Typography>
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
    // <Navbar className="" color="white" shadow={false} fullWidth>
    //   <div className="container flex items-center justify-between mx-auto">
    //     <div>
    //       <Typography color="blue-gray" className="pl-4 text-4xl font-bold">
    //         알고고(로고자리)
    //       </Typography>
    //       <div className="hidden pl-3 mt-4 lg:block">
    //         <NavList />
    //       </div>
    //     </div>
    //     <div />
    //     <div className="grid gap-4">
    //       <div className="items-center hidden gap-2 lg:flex">
    //         {/* <IconButton variant="text">
    //           <BellIcon className="w-5 h-5 text-gray-400" />
    //         </IconButton>
    //         <IconButton variant="text">
    //           <Squares2X2Icon className="w-5 h-5 text-gray-400" />
    //         </IconButton> */}

  //         {isLogin
  //           ? <ProfileMenu />
  //           : (
  //             <>
  //               <Button variant="text" className="text-sm font-medium" onClick={() => navigate('/login')}>로그인</Button>
  //               <Button variant="text" className="text-sm font-medium" onClick={() => navigate('/signup')}>회원가입</Button>
  //             </>
  //           )}
  //       </div>
  //       <div className="hidden h-10 w-60 lg:flex">
  //         {/* <Input icon={<i className="fas fa-search" />} label="Search" /> */}
  //       </div>
  //     </div>
  //     <IconButton
  //       size="sm"
  //       variant="text"
  //       onClick={handleOpen}
  //       className="inline-block ml-auto text-gray-900 lg:hidden"
  //     >
  //       {open ? (
  //         <XMarkIcon className="w-6 h-6" strokeWidth={2} />
  //       ) : (
  //         <Bars3Icon className="w-6 h-6" strokeWidth={2} />
  //       )}
  //     </IconButton>
  //   </div>
  //   <Collapse open={open}>
  //     <div className="pl-3">
  //       <NavList />
  //     </div>
  //     <div className="grid gap-4">
  //       <div className="flex items-center gap-2">
  //         <IconButton variant="text">
  //           <BellIcon className="w-5 h-5 text-gray-400" />
  //         </IconButton>
  //         <IconButton variant="text">
  //           <Squares2X2Icon className="w-5 h-5 text-gray-400" />
  //         </IconButton>
  //         <ProfileMenu />
  //         <Button variant="text">Log Out</Button>
  //       </div>
  //       <div className="flex pl-2 w-60">
  //         <Input icon={<i className="fas fa-search" />} label="Search" />
  //       </div>
  //     </div>
  //   </Collapse>
  // </Navbar>
  );
}
