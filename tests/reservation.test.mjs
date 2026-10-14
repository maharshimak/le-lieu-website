import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../app/api/reservation/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

for (const payload of [null, {}, { name: 'Synthetic', email: 'fixture@example.invalid' }, 'malformed', 'x'.repeat(50000)]) {
  test(`unconfigured booking fails closed for ${typeof payload}`, async () => {
    let read = false;
    const response = await POST({ json() { read = true; throw new Error('Body must not be read'); }, payload });
    assert.equal(response.status, 503);
    assert.equal(read, false);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    const result = await response.json();
    assert.match(result.error, /No booking was saved or sent/);
    assert.equal(result.ok, undefined);
  });
}
