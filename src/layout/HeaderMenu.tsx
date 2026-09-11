import { Link, useLocation } from "react-router-dom";
import type { HeaderNavGroup } from "@/config/nav";
import { cn } from "@lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";

function isCurrentPath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

function PreparedNavItem({ label }: { label: string }) {
  return (
    <span
      aria-disabled="true"
      aria-label={`${label}, 준비 중`}
      title="준비 중"
      className="inline-flex h-9 cursor-not-allowed items-center rounded-md px-4 text-sm font-medium text-muted-foreground/55"
    >
      {label}
      <span className="sr-only"> 준비 중</span>
    </span>
  );
}

export default function HeaderMenu({
  menuItem,
  preparedItems = [],
}: {
  menuItem: HeaderNavGroup;
  preparedItems?: readonly string[];
}) {
  const { pathname } = useLocation();
  const isActive = menuItem.items.some(
    (item) => !item.disabled && isCurrentPath(pathname, item.href),
  );

  return (
    <NavigationMenu aria-label="주 메뉴">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-active={isActive || undefined}>
            {menuItem.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] grid-cols-2 gap-3 p-4">
              {menuItem.items.map((item) => {
                const active = isCurrentPath(pathname, item.href);

                if (item.disabled) {
                  return (
                    <li
                      key={item.title}
                      aria-disabled="true"
                      className="cursor-not-allowed rounded-lg p-3 text-muted-foreground/55"
                    >
                      <p className="text-sm font-medium leading-none">
                        {item.title}
                        <span className="sr-only"> 준비 중</span>
                      </p>
                      <p className="mt-1.5 text-sm leading-snug">
                        {item.description}
                      </p>
                    </li>
                  );
                }

                return (
                  <li key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block cursor-pointer rounded-lg p-3 outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-accent/80",
                          active && "bg-accent/70 text-accent-foreground",
                        )}
                      >
                        <p className="text-sm font-medium leading-none">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {preparedItems.map((item) => (
          <NavigationMenuItem key={item}>
            <PreparedNavItem label={item} />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
