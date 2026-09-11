export type HeaderNavItem = {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
};

export type HeaderNavGroup = {
  title: string;
  items: readonly HeaderNavItem[];
};

export const problemNavGroup = {
  title: "문제",
  items: [
    {
      title: "모든 문제",
      href: "/",
      description: "전체 알고리즘 문제를 살펴보세요.",
      disabled: false,
    },
    {
      title: "오늘의 문제",
      href: "/problem/today",
      description: "매일 새로 고른 문제로 꾸준히 연습해 보세요.",
      disabled: false,
    },
    {
      title: "유형별 문제",
      href: "/problem/type",
      description: "알고리즘 유형에 맞춰 문제를 모아볼 수 있어요.",
      disabled: true,
    },
  ],
} as const satisfies HeaderNavGroup;

export const preparedNavItems = ["대회", "랭킹", "커뮤니티"] as const;
