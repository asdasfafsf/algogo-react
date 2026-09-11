import { Button } from "@/components/ui/button";
import PageState from "@/components/page-state/PageState";

interface ErrorFallbackProps {
  onBack: () => void;
  onHome: () => void;
}

export default function ErrorFallback({ onBack, onHome }: ErrorFallbackProps) {
  return (
    <PageState
      fullScreen
      title="잠시 문제가 생겼어요"
      description="잠시 후 다시 시도해 주세요."
    >
      <Button
        variant="outline"
        className="active:translate-y-px"
        onClick={onBack}
      >
        이전으로
      </Button>
      <Button className="active:translate-y-px" onClick={onHome}>
        문제 목록으로
      </Button>
    </PageState>
  );
}
