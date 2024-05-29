import NavItem from '../atom/NavItem';

export default function NavList() {
  return (
    <ul className="flex flex-col gap-3 mt-2 mb-4 lg:mb-0 lg:mt-1 lg:flex-row lg:items-center lg:gap-8">
      <NavItem isActive={false} label="문제" to="" />
    </ul>
  );
}
