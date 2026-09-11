import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const removedPaths = [
  "src/components/Button/Button.tsx",
  "src/components/Button/IconButton.tsx",
  "src/components/Button/TooltipIconButton.tsx",
  "src/components/Button/index.ts",
  "src/components/Checkbox/Checkbox.tsx",
  "src/components/Checkbox/index.ts",
  "src/components/Input/input.tsx",
  "src/components/Input/index.ts",
  "src/components/Chip/Chip.tsx",
  "src/components/Chip/ChipWithSelected.tsx",
  "src/components/Chip/ProblemDifficultyChip.tsx",
  "src/components/common/BreadCrumbs.tsx",
  "src/components/common/FadeInSection.tsx",
  "src/components/common/Line.tsx",
  "src/components/common/Logo.tsx",
  "src/components/common/LogoWithText.tsx",
  "src/components/common/MathJaxNode.tsx",
  "src/components/common/ProfilePhoto.tsx",
  "src/components/common/Textarea.tsx",
  "src/components/common/Toggle.tsx",
  "src/components/common/Tooltip.tsx",
  "src/components/common/TranslucentOverlay.tsx",
  "src/components/common/Typography.tsx",
];

for (const path of removedPaths) {
  await assert.rejects(
    access(new URL(path, root)),
    `${path} must remain removed`,
  );
}

const [
  commonIndex,
  chipIndex,
  packageJson,
  profileMenu,
  inputOutputList,
  header,
  problemContent,
] = await Promise.all([
  read("src/components/common/index.ts"),
  read("src/components/Chip/index.ts"),
  read("package.json"),
  read("src/components/Dropdown/ProfileMenu.tsx"),
  read("src/components/problem/ProblemInputOutputList.tsx"),
  read("src/layout/Header.tsx"),
  read("src/components/problem/ProblemContent.tsx"),
]);

assert.match(commonIndex, /export \{ Avatar, ClipboardWithTooltip \}/);
assert.doesNotMatch(
  commonIndex,
  /\b(?:Breadcrumbs|Line|Logo|MathJaxNode|ProfilePhoto|Textarea|Tooltip|Typography)\b/,
);
assert.match(chipIndex, /ProblemCategoryChip/);
assert.match(chipIndex, /ProblemLevelChip/);
assert.match(chipIndex, /ProblemStateChip/);
assert.doesNotMatch(chipIndex, /ChipWithSelected|from "\.\/Chip"/);

assert.match(profileMenu, /import \{ Avatar \} from "@components\/common"/);
assert.match(inputOutputList, /ClipboardWithTooltip/);
assert.match(header, /import Logo from "@components\/brand\/Logo"/);
assert.match(
  problemContent,
  /import \{ MathJax \} from ['"]better-react-mathjax['"]/,
);

const dependencies = JSON.parse(packageJson).dependencies;
assert.equal(dependencies["react-tooltip"], undefined);
assert.ok(dependencies["@radix-ui/react-tooltip"]);

console.log("ALGOGO-129 legacy UI cleanup regression tests passed");
