import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type HeaderMenuItem = {
  title: string;
  pathList: readonly string[];
  subMenuList: readonly {
    title: string;
    pathList: readonly string[];
    canAccess: boolean;
  }[];
};
export default function HeaderMenu({ menuItem }: { menuItem: HeaderMenuItem }) {
  const { pathname } = useLocation();
  const isActive = menuItem.pathList.some((path) =>
    path === "/" ? pathname === path : pathname.startsWith(path),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "my-auto h-9 gap-1 px-3 text-muted-foreground hover:text-foreground active:bg-accent/80 [&[data-state=open]>svg]:rotate-180",
            isActive && "bg-accent text-accent-foreground",
          )}
        >
          {menuItem.title}
          <ChevronDown aria-hidden className="size-3.5 transition-transform" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        {menuItem.subMenuList.map((item) =>
          item.canAccess ? (
            <DropdownMenuItem
              key={item.title}
              asChild
              className="cursor-pointer py-2 active:bg-accent/80"
            >
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
            <DropdownMenuItem
              key={item.title}
              disabled
              className="justify-between"
            >
              <span>{item.title}</span>
              <span className="text-xs font-normal">곧</span>
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
