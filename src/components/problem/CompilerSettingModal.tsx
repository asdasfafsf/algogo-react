import { Button } from "@/components/ui/button";
import {
  ModalBody,
  ModalFooter,
  ModalSurface,
} from "@/components/ui/modal-surface";
import type { ModalComponentProps } from "@plugins/modal/ModalController";

export default function CompilerSettingModal({
  resolve,
}: ModalComponentProps<boolean>) {
  return (
    <ModalSurface
      open={true}
      onOpenChange={(open) => {
        if (!open) resolve(false);
      }}
      title="컴파일러 설정"
      description="코드 실행에 사용할 컴파일러 환경을 관리합니다."
    >
      <ModalBody>
        <p className="text-sm leading-6 text-muted-foreground">
          현재 변경할 수 있는 컴파일러 설정이 없습니다.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => resolve(false)}>닫기</Button>
      </ModalFooter>
    </ModalSurface>
  );
}
