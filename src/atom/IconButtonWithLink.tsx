import { IconButton, IconButtonProps } from '@material-tailwind/react';

interface IconButtonWithLinkProps extends IconButtonProps {
  to: string;
}

export default function IconButtonWithLink(props: IconButtonWithLinkProps) {
  const { to } = props;
  const iconButtonProps = props as IconButtonProps;
  return <IconButton children={undefined} />;
}
