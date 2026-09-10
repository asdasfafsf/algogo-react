import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@lib/utils";
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="페이지 탐색"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";
interface PaginationLinkProps extends ButtonProps {
  isActive?: boolean;
}
function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "outline" : "ghost"}
      size="icon"
      className={cn("size-9", className)}
      {...props}
    />
  );
}
function PaginationPrevious(props: ButtonProps) {
  return (
    <Button variant="ghost" size="sm" aria-label="이전 페이지" {...props}>
      <ChevronLeft />
      이전
    </Button>
  );
}
function PaginationNext(props: ButtonProps) {
  return (
    <Button variant="ghost" size="sm" aria-label="다음 페이지" {...props}>
      다음
      <ChevronRight />
    </Button>
  );
}
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">더 많은 페이지</span>
    </span>
  );
}
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
