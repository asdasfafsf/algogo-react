interface NavbarProps {
  children?: React.ReactNode
}

export default function Navbar({ children = '' }: NavbarProps) {
  return (
    <nav className="w-full">
        <ul className="w-full flex gap-2">
          {children}
        </ul>
    </nav>
  );
}
