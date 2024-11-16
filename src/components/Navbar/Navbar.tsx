interface NavbarProps {
  children?: React.ReactNode
}

export default function Navbar({ children = '' }: NavbarProps) {
  return (
    <nav className="w-full">
      <div className="items-center justify-center">

        <div className="container">
          <ul className="container flex w-full gap-2">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
}
