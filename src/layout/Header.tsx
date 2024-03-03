import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  Squares2X2Icon,
  BellIcon,
} from "@heroicons/react/24/solid";
import NavList from "../molecule/NavList";
import ProfileMenu from "../molecule/ProfileMenu";


export function NavbarWithIcons() {
  const [open, setOpen] = React.useState(false);
  const [isLogin, setLogin] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);

  return (
    <Navbar className='' color="white" shadow={false} fullWidth>
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Typography color="blue-gray" className="font-bold pl-4 text-4xl">
            알고고(로고자리)
          </Typography>
          <div className="hidden lg:block pl-3 mt-4">
            <NavList />
          </div>
        </div>
        <div></div>
        <div className="grid gap-4">
          <div className="lg:flex hidden items-center gap-2">
            {/* <IconButton variant="text">
              <BellIcon className="h-5 w-5 text-gray-400" />
            </IconButton>
            <IconButton variant="text">
              <Squares2X2Icon className="h-5 w-5 text-gray-400" />
            </IconButton> */}

            {isLogin 
            ? <ProfileMenu /> 
            : <>
              <Button variant="text" className="text-sm font-medium">로그인</Button>
              <Button variant="text" className="text-sm font-medium">회원가입</Button>
            </>}
          </div>
          <div className="w-60 lg:flex hidden h-10">
            {/* <Input icon={<i className="fas fa-search" />} label="Search" /> */}
          </div>
        </div>
        <IconButton
          size="sm"
          variant="text"
          onClick={handleOpen}
          className="ml-auto inline-block text-gray-900 lg:hidden"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="pl-3">
          <NavList />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <IconButton variant="text">
              <BellIcon className="h-5 w-5 text-gray-400" />
            </IconButton>
            <IconButton variant="text">
              <Squares2X2Icon className="h-5 w-5 text-gray-400" />
            </IconButton>
            <ProfileMenu />
            <Button variant="text">Log Out</Button>
          </div>
          <div className="w-60 flex pl-2">
            <Input icon={<i className="fas fa-search" />} label="Search" />
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarWithIcons;