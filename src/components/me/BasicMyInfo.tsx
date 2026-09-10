import { useRef } from "react";
import { Camera, Check, Loader2, Pencil, ShieldCheck, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import useMyInfo from "@hook/me/useMyInfo";

export default function BasicMyInfo() {
  const {
    me,
    isEditMode,
    isSaving,
    image,
    handleEditMode,
    handleSave,
    handleCancel,
    name,
    handleChangeName,
    handleChangeProfilePhoto,
  } = useMyInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!me) return null;

  const fallback = me.name.trim().charAt(0).toUpperCase() || "A";
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        void handleChangeProfilePhoto(event, file, reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <Card className="relative overflow-hidden border-border/60 shadow-sm">
      <div className="h-2 bg-linear-to-r from-primary via-blue-500 to-primary/60" />
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-display text-xl font-bold sm:text-2xl">
              {isEditMode ? "프로필 편집" : "내 프로필"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isEditMode
                ? "표시할 이름과 프로필 이미지를 변경할 수 있습니다."
                : "계정 정보와 연결 상태를 관리하세요."}
            </p>
          </div>

          {isEditMode ? (
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="프로필 편집 취소"
                disabled={isSaving}
                onClick={handleCancel}
              >
                <X />
              </Button>
              <Button
                size="icon"
                aria-label="프로필 저장"
                disabled={isSaving || !name.trim()}
                onClick={() => void handleSave()}
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <Check />}
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={handleEditMode}>
              <Pencil />
              프로필 편집
            </Button>
          )}
        </div>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative shrink-0">
            <div className="rounded-full bg-linear-to-br from-primary via-blue-400 to-primary/40 p-[3px]">
              <Avatar className="size-24 border-2 border-background sm:size-28">
                <AvatarImage src={image} alt={`${me.name} 프로필`} />
                <AvatarFallback className="bg-muted text-2xl font-bold">
                  {fallback}
                </AvatarFallback>
              </Avatar>
            </div>
            {isEditMode && (
              <>
                <Button
                  type="button"
                  size="icon"
                  className="absolute bottom-0 right-0 size-9 rounded-full border-2 border-background"
                  aria-label="프로필 이미지 선택"
                  disabled={isSaving}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-label="프로필 이미지 파일"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-5 text-center sm:text-left">
            {isEditMode ? (
              <div className="grid gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="profile-name"
                    className="block text-sm font-medium"
                  >
                    이름
                  </label>
                  <Input
                    id="profile-name"
                    value={name}
                    maxLength={50}
                    autoComplete="name"
                    disabled={isSaving}
                    placeholder="이름을 입력하세요"
                    onChange={handleChangeName}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="profile-email"
                    className="block text-sm font-medium"
                  >
                    이메일
                  </label>
                  <Input
                    id="profile-email"
                    value={me.email}
                    disabled
                    className="min-w-0 text-ellipsis"
                  />
                  <p className="text-xs text-muted-foreground">
                    가입한 OAuth 계정의 이메일은 변경할 수 없습니다.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="break-words font-display text-2xl font-bold tracking-tight">
                  {me.name}
                </h2>
                <p className="break-all text-sm text-muted-foreground">
                  {me.email}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="size-4" />
                  로그인 확인된 계정
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
