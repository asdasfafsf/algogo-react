import {
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@components/common";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import useMeStore from "@zustand/MeStore";

interface ProfileMenuProps {
  me: Me;
}

export default function ProfileMenu({ me }: ProfileMenuProps) {
  const navigate = useNavigate();
  const logout = useMeStore((state) => state.logout);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-0"
          aria-label="프로필 메뉴 열기"
        >
          <Avatar
            variant="circular"
            size="medium"
            alt="User"
            src={
              me.profilePhoto ||
              "https://docs.material-tailwind.com/img/face-2.jpg"
            }
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onSelect={() => navigate("/me")}>
          <UserCircleIcon className="size-5" />
          마이페이지
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => logout()}>
          <ArrowRightStartOnRectangleIcon className="size-5" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
