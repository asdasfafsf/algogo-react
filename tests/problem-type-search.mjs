import assert from "node:assert/strict";
import test from "node:test";

import {
  extractHangulInitials,
  filterProblemTypesBySearch,
  matchesProblemTypeSearch,
  normalizeProblemTypeSearch,
} from "../src/domain/problems/problemTypeSearch.ts";

test("검색어의 Unicode 표현, 앞뒤 공백, 영문 대소문자를 정규화한다", () => {
  assert.equal(normalizeProblemTypeSearch("  KMP  "), "kmp");
  assert.equal(normalizeProblemTypeSearch("  그래프  "), "그래프");
  assert.equal(normalizeProblemTypeSearch(" \n\t "), "");
});

test("한글 완성형 음절에서 19개 초성을 정확히 추출한다", () => {
  assert.equal(
    extractHangulInitials("가까나다따라마바빠사싸아자짜차카타파하"),
    "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",
  );
  assert.equal(extractHangulInitials("ㄱ Graph 2"), "ㄱ Graph 2");
});

test("초성과 초성 사이 공백으로 문제 유형을 찾는다", () => {
  assert.equal(
    matchesProblemTypeSearch("다이나믹 프로그래밍", "ㄷㅇㄴㅁ"),
    true,
  );
  assert.equal(matchesProblemTypeSearch("그래프 탐색", "ㄱㄹㅍㅌㅅ"), true);
  assert.equal(matchesProblemTypeSearch("그래프 탐색", " ㄱ ㄹㅍ ㅌㅅ "), true);
  assert.equal(matchesProblemTypeSearch("그래프 탐색", "ㄱㅍㅌㅅ"), false);
});

test("완성형 한글, 영문, 숫자, 공백 부분 문자열 검색을 보존한다", () => {
  assert.equal(
    matchesProblemTypeSearch("다이나믹 프로그래밍", "이나믹 프로"),
    true,
  );
  assert.equal(
    matchesProblemTypeSearch("Heavy-Light 분할", "HEAVY-LIGHT"),
    true,
  );
  assert.equal(
    matchesProblemTypeSearch("0-1 너비 우선 탐색", "0-1 너비"),
    true,
  );
  assert.equal(matchesProblemTypeSearch("이분 그래프", "이나"), false);
});

test("초성과 완성형, 영문, 숫자가 섞인 연속 입력을 처리한다", () => {
  assert.equal(
    matchesProblemTypeSearch("다이나믹 프로그래밍", "다이ㄴㅁ ㅍㄹ"),
    true,
  );
  assert.equal(
    matchesProblemTypeSearch("KMP 알고리즘 2", "kmp ㅇㄱㄹㅈ 2"),
    true,
  );
  assert.equal(
    matchesProblemTypeSearch("KMP 알고리즘 2", "kmp ㄱㄹㅈ 2"),
    false,
  );
});

test("빈 검색어는 전체 목록을 새 배열로 반환하고 원본을 변경하지 않는다", () => {
  const problemTypes = Object.freeze([
    Object.freeze({ name: "다이나믹 프로그래밍", value: "dp" }),
    Object.freeze({ name: "그래프 탐색", value: "graph" }),
  ]);

  const allProblemTypes = filterProblemTypesBySearch(problemTypes, "  ");
  const filteredProblemTypes = filterProblemTypesBySearch(
    problemTypes,
    "ㄱㄹㅍㅌㅅ",
  );

  assert.notEqual(allProblemTypes, problemTypes);
  assert.deepEqual(allProblemTypes, problemTypes);
  assert.deepEqual(filteredProblemTypes, [problemTypes[1]]);
  assert.equal(problemTypes[0].name, "다이나믹 프로그래밍");
});

test("단독 모음과 완성형이 아닌 겹받침은 초성으로 확장하지 않는다", () => {
  assert.equal(matchesProblemTypeSearch("그래프 탐색", "ㅏ"), false);
  assert.equal(matchesProblemTypeSearch("그래프 탐색", "ㄳ"), false);
});
