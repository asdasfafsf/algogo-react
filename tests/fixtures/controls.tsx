import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { Checkbox } from "@components/Checkbox";
import { ProfileMenu } from "@components/Dropdown";
import ThemeToggle from "@components/ThemeToggle";
import ProblemLevelDropdown from "@components/problem-list/ProblemLevelDropdown";
import ProblemListLevelHiddenToggle from "@components/problem-list/ProblemListLevelHiddenToggle";
import ProblemStateDropdown from "@components/problem-list/ProblemStateDropdown";
import ProblemTypeDropdown from "@components/problem-list/ProblemTypeDropdown";
import CodeTemplateDropdown from "@components/problem/CodeTemplateDropdown";
import LanguageDropdown from "@components/problem/LanguageDropdown";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Progress } from "@components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import HeaderMenu from "@layout/HeaderMenu";
import apiClient from "@api/apiClient";
import ModalProvider from "@plugins/modal/ModalProvider";
import useCodeEditorStore from "@zustand/CodeEditorStore";
import useMeStore from "@zustand/MeStore";
import { useProblemTableFilterStore } from "@zustand/ProblemTableFilterStore";
import "../../src/index.css";
import "../../src/loader/MonacoLoader";

const sampleMe: Me = {
  uuid: "fixture-user",
  name: "샘플 사용자",
  profilePhoto: "",
  email: "fixture@example.invalid",
  socialList: [],
  oauthList: [],
};
const sampleTemplate: ResponseTemplate = {
  uuid: "fixture-template",
  name: "수정용 샘플",
  description: "서버 요청을 fixture adapter로 대체한 템플릿",
  language: "Python",
  content: "print('fixture template')",
  createdAt: new Date(0),
  updatedAt: new Date(0),
};

apiClient.interceptors.request.use((config) => {
  if (!config.url?.startsWith("/api/v1/code/template")) return config;

  config.adapter = async () => ({
    data:
      config.method === "get" &&
      config.url === `/api/v1/code/template/${sampleTemplate.uuid}`
        ? {
            statusCode: 200,
            errorCode: "",
            errorMessage: "",
            data: sampleTemplate,
          }
        : {
            statusCode: 503,
            errorCode: "FIXTURE_WRITE_BLOCKED",
            errorMessage: "fixture에서는 템플릿을 저장하지 않습니다.",
            data: null,
          },
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  });
  return config;
});

useMeStore.setState({ me: sampleMe });
useProblemTableFilterStore.setState({
  problemOptionList: [],
  problemHidden: { 난이도: false, 카테고리: false },
});
useCodeEditorStore.setState({
  language: "Python",
  code: "print('controls fixture')",
  templates: { defaultList: [], summaryList: [] },
});

function LocationStatus() {
  const { pathname } = useLocation();
  return <output aria-label="현재 fixture 경로">{pathname}</output>;
}

function MenuFixture() {
  const [selectionCount, setSelectionCount] = useState(0);

  return (
    <section className="grid gap-3 rounded-lg border p-4">
      <h2 className="font-semibold">DropdownMenu</h2>
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">기본 메뉴 열기</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>키보드 선택</DropdownMenuLabel>
            <DropdownMenuItem disabled>비활성 메뉴</DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setSelectionCount((count) => count + 1)}
            >
              활성 메뉴
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">메뉴 바깥 포커스 대상</Button>
      </div>
      <output aria-label="메뉴 선택 횟수">{selectionCount}</output>
    </section>
  );
}

function PopoverFixture() {
  const [open, setOpen] = useState(false);
  const [changeCount, setChangeCount] = useState(0);

  return (
    <section className="grid gap-3 rounded-lg border p-4">
      <h2 className="font-semibold">controlled Popover</h2>
      <div className="flex flex-wrap items-center gap-3">
        <Popover
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            setChangeCount((count) => count + 1);
          }}
        >
          <PopoverTrigger asChild>
            <Button variant="outline">제어 팝오버 열기</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p>Esc와 바깥 클릭으로 닫힘을 확인합니다.</p>
            <Button className="mt-3">팝오버 내부 버튼</Button>
          </PopoverContent>
        </Popover>
        <Button variant="outline">팝오버 바깥 포커스 대상</Button>
      </div>
      <output aria-label="팝오버 상태">
        {open ? "열림" : "닫힘"}, 변경 {changeCount}회
      </output>
    </section>
  );
}

function SelectFixture() {
  const [value, setValue] = useState("one");

  return (
    <section className="grid gap-3 rounded-lg border p-4">
      <h2 className="font-semibold">Select</h2>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger aria-label="검증 선택 메뉴" className="w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">첫 번째</SelectItem>
          <SelectItem value="disabled" disabled>
            비활성 선택지
          </SelectItem>
          <SelectItem value="three">세 번째</SelectItem>
        </SelectContent>
      </Select>
      <output aria-label="선택 값">{value}</output>
    </section>
  );
}

function CheckboxAndButtonFixture() {
  const [checked, setChecked] = useState(false);
  const [checkboxChanges, setCheckboxChanges] = useState(0);
  const [buttonActions, setButtonActions] = useState(0);
  const [formSubmits, setFormSubmits] = useState(0);

  return (
    <section className="grid gap-3 rounded-lg border p-4">
      <h2 className="font-semibold">Checkbox와 Button</h2>
      <Checkbox
        label="레이블로 토글"
        checked={checked}
        onCheckedChange={(nextChecked) => {
          setChecked(nextChecked);
          setCheckboxChanges((count) => count + 1);
        }}
      />
      <Checkbox label="선택된 비활성 체크박스" checked disabled />
      <output aria-label="체크박스 상태">
        {checked ? "선택" : "해제"}, 변경 {checkboxChanges}회
      </output>
      <form
        className="flex flex-wrap gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setFormSubmits((count) => count + 1);
        }}
      >
        <Button onClick={() => setButtonActions((count) => count + 1)}>
          기본 타입 동작
        </Button>
        <Button type="submit" variant="outline">
          명시적 제출
        </Button>
        <Button disabled onClick={() => setButtonActions((count) => count + 1)}>
          비활성 동작
        </Button>
      </form>
      <output aria-label="버튼 동작 횟수">
        동작 {buttonActions}회, 제출 {formSubmits}회
      </output>
    </section>
  );
}

function ProgressFixture() {
  const [value, setValue] = useState(40);

  return (
    <section className="grid gap-3 rounded-lg border p-4">
      <h2 className="font-semibold">Progress</h2>
      <Progress value={value} aria-label="fixture 진행률" />
      <div className="flex gap-3">
        <Button size="sm" variant="outline" onClick={() => setValue(0)}>
          0%
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue(75)}>
          75%
        </Button>
      </div>
      <output aria-label="진행률 값">{value}%</output>
    </section>
  );
}

function ActualConsumersFixture() {
  return (
    <section className="grid gap-5 rounded-lg border p-4">
      <h2 className="font-semibold">실제 메뉴와 필터 소비처</h2>
      <div className="flex flex-wrap items-center gap-3">
        <HeaderMenu
          menuItem={{
            title: "헤더 샘플",
            subTitle: "헤더 메뉴",
            pathList: ["/fixture"],
            subMenuList: [
              {
                title: "이동 가능한 항목",
                pathList: ["/fixture-target"],
                canAccess: true,
              },
              {
                title: "준비 중 항목",
                pathList: ["/disabled"],
                canAccess: false,
              },
            ],
          }}
        />
        <ThemeToggle />
        <ProfileMenu me={sampleMe} />
        <LanguageDropdown />
        <CodeTemplateDropdown />
        <Button
          variant="outline"
          onClick={() => {
            void useCodeEditorStore.getState().setTemplates({
              defaultList: [],
              summaryList: [sampleTemplate],
            });
          }}
        >
          수정용 템플릿 주입
        </Button>
      </div>
      <LocationStatus />
      <div className="flex flex-wrap items-center gap-3">
        <ProblemLevelDropdown />
        <ProblemTypeDropdown />
        <ProblemStateDropdown />
        <ProblemListLevelHiddenToggle />
      </div>
      <p className="text-sm text-muted-foreground">
        샘플 사용자와 로컬 store만 사용합니다. 템플릿 API는 fixture adapter가
        응답하며 저장 요청은 차단합니다. 로그아웃 동작은 검증 범위가 아닙니다.
      </p>
    </section>
  );
}

function ControlsFixture() {
  return (
    <main className="mx-auto grid max-w-4xl gap-5 p-8">
      <div>
        <h1 className="text-xl font-semibold">기본 컨트롤 검증</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          인증과 서버 저장 없이 실제 공용 컨트롤과 소비처를 확인합니다.
        </p>
      </div>
      <MenuFixture />
      <PopoverFixture />
      <SelectFixture />
      <CheckboxAndButtonFixture />
      <ProgressFixture />
      <ActualConsumersFixture />
      <Button variant="outline">페이지 끝 포커스 대상</Button>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/fixture"]}>
      <ModalProvider>
        <ControlsFixture />
      </ModalProvider>
    </MemoryRouter>
  </StrictMode>,
);
