import { useRef } from "react";
import { Camera, Loader2, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
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
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex-row items-center justify-between gap-4 space-y-0 p-6 pb-4 sm:p-8 sm:pb-4">
        <div>
          <CardTitle className="font-display text-xl font-bold sm:text-2xl">
            {isEditMode ? "프로필 편집" : "내 프로필"}
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {isEditMode
              ? "이름과 프로필 이미지를 수정할 수 있습니다."
              : "이름과 프로필 이미지를 관리하세요."}
          </p>
        </div>

        {isEditMode ? (
          <div className="flex shrink-0 gap-2">
            <Button
              variant="outline"
              disabled={isSaving}
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              disabled={isSaving || !name.trim()}
              onClick={() => void handleSave()}
            >
              {isSaving && <Loader2 className="animate-spin" />}
              {isSaving ? "저장 중" : "저장"}
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={handleEditMode}>
            <Pencil />
            프로필 편집
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6 pt-2 sm:p-8 sm:pt-2">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative shrink-0">
            <Avatar className="size-24 border border-border sm:size-28">
              <AvatarImage src={image} alt={`${me.name} 프로필`} />
              <AvatarFallback className="bg-muted text-2xl font-bold">
                {fallback}
              </AvatarFallback>
            </Avatar>
            {isEditMode && (
              <>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 size-9 rounded-full border border-border"
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
              <div className="space-y-2">
                <h2 className="break-words font-display text-2xl font-bold tracking-tight">
                  {me.name}
                </h2>
                <p className="break-all text-sm text-muted-foreground">
                  {me.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
