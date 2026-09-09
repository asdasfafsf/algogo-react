import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DEFAULT_PROBLEM_PAGE,
  buildProblemContentTable,
  buildProblemListRequest,
  calculateMaxPage,
  canNavigateToNextDay,
  changeProblemPage,
  formatUtcMidnightCountdown,
  isSameCalendarDay,
  millisecondsUntilNextUtcMidnight,
  nextDayOffset,
  nextProblemSort,
  nextTodayProblemIndex,
  parseTodayProblemDay,
  previousDayOffset,
  previousTodayProblemIndex,
  removeProblemFilter,
  replaceProblemFilters,
  roundedTodayProblemProgress,
  todayProblemProgress,
} from '../src/domain/problems/index.ts';

const testDirectory = dirname(fileURLToPath(import.meta.url));

test('선택된 필터를 기존 API 요청 계약으로 변환한다', () => {
  const request = buildProblemListRequest(
    { pageNo: 3, pageSize: 20 },
    [
      { type: '난이도', name: '브론즈', value: '0', isSelected: true },
      { type: '난이도', name: '실버', value: '5', isSelected: false },
      { type: '유형', name: '정렬', value: '정렬', isSelected: true },
      { type: '상태', name: '맞힌 문제', value: 'SOLVED', isSelected: true },
    ],
    21,
    '부분 문자열',
  );

  assert.deepEqual(request, {
    pageNo: 3,
    pageSize: 20,
    levelList: [0],
    typeList: ['정렬'],
    states: ['SOLVED'],
    sort: 21,
    title: '부분 문자열',
  });
});

test('페이지와 정렬 전이 규칙을 보존한다', () => {
  assert.equal(calculateMaxPage(41, 20), 3);
  assert.equal(calculateMaxPage(0, 20), 0);
  assert.deepEqual(changeProblemPage(DEFAULT_PROBLEM_PAGE, 2, 3), {
    pageNo: 2,
    pageSize: 20,
  });
  assert.equal(
    changeProblemPage(DEFAULT_PROBLEM_PAGE, 4, 3),
    DEFAULT_PROBLEM_PAGE,
  );
  assert.equal(nextProblemSort(0, '제목'), 10);
  assert.equal(nextProblemSort(10, '제목'), 11);
  assert.equal(nextProblemSort(11, '제목'), 0);
  assert.equal(nextProblemSort(20, '제목'), 10);
});

test('필터 제거와 유형별 선택 반영 순서를 보존한다', () => {
  const initial = [
    { type: '상태', name: '맞힌 문제', value: 'SOLVED', isSelected: true },
    { type: '유형', name: '정렬', value: '정렬', isSelected: true },
  ];
  assert.deepEqual(removeProblemFilter(initial, 0), [initial[1]]);
  assert.deepEqual(
    replaceProblemFilters(initial, '유형', [
      { name: '정렬', value: '정렬', isSelected: false },
      { name: '구현', value: '구현', isSelected: true },
    ]),
    [
      initial[0],
      { type: '유형', name: '구현', value: '구현', isSelected: true },
    ],
  );
});

test('오늘의 문제 날짜 이동, 순환, 진행률 규칙을 계산한다', () => {
  assert.equal(parseTodayProblemDay(null), 0);
  assert.equal(parseTodayProblemDay('-2'), -2);
  assert.equal(canNavigateToNextDay(-1), true);
  assert.equal(canNavigateToNextDay(0), false);
  assert.equal(previousDayOffset(-2), -3);
  assert.equal(nextDayOffset(-2), -1);
  assert.equal(nextDayOffset(0), 0);
  assert.equal(nextTodayProblemIndex(3, 4), 0);
  assert.equal(previousTodayProblemIndex(0, 4), 3);
  assert.equal(todayProblemProgress(1, 4), 50);
  assert.equal(roundedTodayProblemProgress(0, 3), 33);
});

test('UTC 자정까지 남은 시간은 호출자가 전달한 시각만 사용한다', () => {
  assert.equal(millisecondsUntilNextUtcMidnight(0), 86_400_000);
  assert.equal(millisecondsUntilNextUtcMidnight(86_399_000), 1_000);
  assert.equal(formatUtcMidnightCountdown(3_661_000), '01:01:01');
});

test('문제 상세의 날짜 비교와 표 모델을 순수하게 계산한다', () => {
  assert.equal(
    isSameCalendarDay(
      { year: 2026, month: 8, date: 10 },
      { year: 2026, month: 8, date: 10 },
    ),
    true,
  );
  const cells = [
    { rowIndex: 2, columnIndex: 0, content: 'later row' },
    { rowIndex: 1, columnIndex: 1, content: 'b' },
    { rowIndex: 0, columnIndex: 1, content: 'B' },
    { rowIndex: 1, columnIndex: 0, content: 'a' },
    { rowIndex: 0, columnIndex: 0, content: 'A' },
  ];
  assert.deepEqual(buildProblemContentTable(cells), {
    headers: [cells[4], cells[2]],
    rows: [[cells[3], cells[1]], [cells[0]]],
  });
  assert.deepEqual(
    cells.map(cell => cell.content),
    ['later row', 'b', 'B', 'a', 'A'],
  );
});

test('문제 도메인은 UI와 I/O 라이브러리에 의존하지 않는다', async () => {
  const domainDirectory = resolve(testDirectory, '../src/domain/problems');
  const sourceFiles = (await readdir(domainDirectory)).filter(file =>
    file.endsWith('.ts'),
  );
  const forbiddenImports =
    /from\s+["'](?:react|zustand|axios|@api\/|@zustand\/)/;

  for (const sourceFile of sourceFiles) {
    const source = await readFile(resolve(domainDirectory, sourceFile), 'utf8');
    assert.doesNotMatch(source, forbiddenImports, sourceFile);
    assert.doesNotMatch(
      source,
      /\b(?:window|document|localStorage|sessionStorage)\b/,
      sourceFile,
    );
    assert.doesNotMatch(source, /new Date\s*\(\s*\)/, sourceFile);
  }
});
