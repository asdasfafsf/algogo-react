import { ButtonProps } from '@material-tailwind/react';

interface ButtonWithLinkProps extends ButtonProps {
  to?: string
}

export default function ButtonWithLink(buttonWithProps: ButtonWithLinkProps) {
  const { to } = buttonWithProps;

  return <div>{to ?? 'to'}</div>;
}
