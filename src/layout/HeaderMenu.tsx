import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type HeaderMenuItem = {
  title: string;
  subTitle: string;
  pathList: string[];
  subMenuList: { title: string; pathList: string[]; canAccess: boolean }[];
};
export default function HeaderMenu({ menuItem }: { menuItem: HeaderMenuItem }) {
  const { pathname } = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="my-auto gap-2">
          {menuItem.title}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>{menuItem.subTitle}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItem.subMenuList.map((item) =>
          item.canAccess ? (
            <DropdownMenuItem key={item.title} asChild>
              <Link
                to={item.pathList[0]}
                aria-current={
                  item.pathList.includes(pathname) ? "page" : undefined
                }
              >
                {item.title}
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem key={item.title} disabled>
              {item.title}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
