import { Separator } from "@/components/ui/separator";
interface LineProps {
  className?: string;
  children?: React.ReactNode;
}
export default function Line({ className, children }: LineProps) {
  return <Separator className={className}>{children}</Separator>;
}
