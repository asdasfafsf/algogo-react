export type RosterNavigationKey = "ArrowDown" | "ArrowUp" | "Home" | "End";

export function getRosterNavigationIndex(
  currentIndex: number,
  itemCount: number,
  key: RosterNavigationKey,
): number | null {
  if (itemCount <= 0) return null;

  const normalizedIndex = ((currentIndex % itemCount) + itemCount) % itemCount;

  switch (key) {
    case "ArrowDown":
      return (normalizedIndex + 1) % itemCount;
    case "ArrowUp":
      return (normalizedIndex - 1 + itemCount) % itemCount;
    case "Home":
      return 0;
    case "End":
      return itemCount - 1;
  }
}
