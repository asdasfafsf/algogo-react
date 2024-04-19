/* eslint-disable react/jsx-no-useless-fragment */
interface NavbarProps {
  children?: React.ReactNode
}

export default function Navbar({ children = <></> }: NavbarProps) {
  return (
    <nav>
      <ul>
        {children}
      </ul>
    </nav>
  );
}
