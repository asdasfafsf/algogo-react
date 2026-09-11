const HANGUL_SYLLABLE_START = 0xac00;
const HANGUL_SYLLABLE_END = 0xd7a3;
const HANGUL_INITIAL_INTERVAL = 21 * 28;
const COMPATIBILITY_CONSONANT_START = 0x3131;
const COMPATIBILITY_CONSONANT_END = 0x314e;
const HANGUL_INITIALS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

interface NamedProblemType {
  readonly name: string;
}

export function normalizeProblemTypeSearch(value: string): string {
  return value.normalize("NFC").trim().toLocaleLowerCase("ko-KR");
}

export function extractHangulInitials(value: string): string {
  return Array.from(value, (character) => {
    const codePoint = character.codePointAt(0);
    if (
      codePoint === undefined ||
      codePoint < HANGUL_SYLLABLE_START ||
      codePoint > HANGUL_SYLLABLE_END
    ) {
      return character;
    }

    const initialIndex = Math.floor(
      (codePoint - HANGUL_SYLLABLE_START) / HANGUL_INITIAL_INTERVAL,
    );
    return HANGUL_INITIALS[initialIndex];
  }).join("");
}

function isCompatibilityConsonant(character: string): boolean {
  const codePoint = character.codePointAt(0);
  return (
    codePoint !== undefined &&
    codePoint >= COMPATIBILITY_CONSONANT_START &&
    codePoint <= COMPATIBILITY_CONSONANT_END
  );
}

function removeWhitespace(value: string): string {
  return value.replace(/\s+/g, "");
}

function matchesInitialAwareSubstring(
  normalizedName: string,
  normalizedSearch: string,
): boolean {
  const searchCharacters = Array.from(removeWhitespace(normalizedSearch));
  const nameCharacters = Array.from(removeWhitespace(normalizedName));

  for (
    let startIndex = 0;
    startIndex <= nameCharacters.length - searchCharacters.length;
    startIndex += 1
  ) {
    const isMatch = searchCharacters.every((searchCharacter, offset) => {
      const nameCharacter = nameCharacters[startIndex + offset];
      if (!isCompatibilityConsonant(searchCharacter)) {
        return nameCharacter === searchCharacter;
      }

      return (
        nameCharacter === searchCharacter ||
        extractHangulInitials(nameCharacter) === searchCharacter
      );
    });

    if (isMatch) return true;
  }

  return false;
}

function matchesNormalizedProblemTypeSearch(
  normalizedName: string,
  normalizedSearch: string,
): boolean {
  if (normalizedSearch.length === 0) return true;
  if (normalizedName.includes(normalizedSearch)) return true;

  const compactSearch = removeWhitespace(normalizedSearch);
  return (
    Array.from(compactSearch).some(isCompatibilityConsonant) &&
    matchesInitialAwareSubstring(normalizedName, normalizedSearch)
  );
}

export function matchesProblemTypeSearch(
  name: string,
  search: string,
): boolean {
  return matchesNormalizedProblemTypeSearch(
    normalizeProblemTypeSearch(name),
    normalizeProblemTypeSearch(search),
  );
}

export function filterProblemTypesBySearch<T extends NamedProblemType>(
  problemTypes: readonly T[],
  search: string,
): T[] {
  const normalizedSearch = normalizeProblemTypeSearch(search);

  return problemTypes.filter(({ name }) =>
    matchesNormalizedProblemTypeSearch(
      normalizeProblemTypeSearch(name),
      normalizedSearch,
    ),
  );
}
