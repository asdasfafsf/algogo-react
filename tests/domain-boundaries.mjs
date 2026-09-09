import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = process.argv[2]
  ? path.resolve(process.argv[2])
  : fileURLToPath(new URL('..', import.meta.url));
const domain = path.join(root, 'src/domain');
const visited = new Set();
const failures = [];
const forbidden = new Set([
  'globalThis',
  'process',
  'console',
  'window',
  'document',
  'localStorage',
  'sessionStorage',
  'navigator',
  'fetch',
  'XMLHttpRequest',
  'setTimeout',
  'setInterval',
  'requestAnimationFrame',
]);
const aliases = { '@': 'src', '@constant': 'src/constant' };

function resolveImport(from, specifier) {
  let target;
  if (specifier.startsWith('.'))
    target = path.resolve(path.dirname(from), specifier);
  else {
    const alias = Object.keys(aliases).find(key =>
      specifier.startsWith(`${key}/`),
    );
    if (alias)
      target = path.join(
        root,
        aliases[alias],
        specifier.slice(alias.length + 1),
      );
  }
  if (!target) return null;
  for (const candidate of [
    target,
    `${target}.ts`,
    `${target}.tsx`,
    path.join(target, 'index.ts'),
  ]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile())
      return candidate;
  }
  return null;
}

function inspect(file) {
  if (visited.has(file)) return;
  visited.add(file);
  const text = fs.readFileSync(file, 'utf8');
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const fail = (node, message) =>
    failures.push(
      `${path.relative(root, file)}:${ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1} ${message}`,
    );
  function visit(node) {
    if (
      ts.isJsxElement(node) ||
      ts.isJsxSelfClosingElement(node) ||
      ts.isJsxFragment(node)
    )
      fail(node, 'UI markup belongs outside the domain');
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const specifier = node.moduleSpecifier.text;
      const resolved = resolveImport(file, specifier);
      if (!resolved)
        fail(node, `External or unresolved dependency: ${specifier}`);
      else inspect(resolved);
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword
    )
      fail(node, 'Dynamic imports require a boundary review');
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      ['require', 'Date'].includes(node.expression.text)
    )
      fail(node, 'Implicit runtime dependency or current time');
    if (ts.isIdentifier(node) && forbidden.has(node.text)) {
      const isProperty =
        ts.isPropertyAccessExpression(node.parent) && node.parent.name === node;
      const isPropertyName =
        (ts.isPropertyAssignment(node.parent) ||
          ts.isPropertySignature(node.parent)) &&
        node.parent.name === node;
      if (!isProperty && !isPropertyName)
        fail(node, `Browser/effect global: ${node.text}`);
    }
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression)
    ) {
      const name = node.expression.getText(ast);
      if (name === 'Date.now' || name === 'Math.random')
        fail(node, `Pass an explicit input instead of ${name}`);
    }
    if (
      ts.isNewExpression(node) &&
      node.expression.getText(ast) === 'Date' &&
      !node.arguments?.length
    )
      fail(node, 'Pass the current time explicitly');
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
function scan(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) scan(file);
    else if (/\.tsx?$/.test(item.name)) inspect(file);
  }
}
assert.ok(fs.existsSync(domain), 'Expected extracted domain modules');
scan(domain);
assert.ok(visited.size > 0, 'Expected at least one domain module');
assert.deepEqual(failures, [], failures.join('\n'));
console.log(
  `Domain dependency boundary checks passed (${visited.size} modules including transitive dependencies)`,
);
