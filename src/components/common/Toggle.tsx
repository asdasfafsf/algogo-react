import { Toggle as ShadcnToggle } from '@components/ui/toggle';

export default function Toggle({
  children,
  ...props
}: React.ComponentProps<typeof ShadcnToggle>) {
  return (
    <ShadcnToggle
      {...props}
    >
      {children}
    </ShadcnToggle>
  );
}
