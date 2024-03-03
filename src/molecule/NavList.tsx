import NavItem from '../atom/NavItem';

export default function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-1 lg:flex-row lg:items-center lg:gap-8">
      <NavItem isActive={false} label="문제" to="" />
    </ul>
  );
}
