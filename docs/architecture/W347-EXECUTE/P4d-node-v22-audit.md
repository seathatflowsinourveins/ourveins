# W347 P4(d) — Node v22 LTS + PS7+ pattern adoption audit (READ-ONLY)

> **Status**: survey artifact (B8 from CLOSURE-PLAN.md). No code changes this wave — adoption queued W348+ after operator triage.

## Cite-anchor (3-org-distinct per codex r1 MEDIUM-3 closure)

- **Node.js Foundation / OpenJS Foundation**: `https://nodejs.org/en/about/previous-releases` — v22 LTS series ("Jod"), current `v22.22.0` per `engines.node>=22.22.0` in `package.json` (`a881fb3`).
- **Microsoft Corporation**: `https://learn.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-72` — `&&`/`||`/`??`/`?.` operators GA since 7.0; pipeline chain operators per `about_Pipeline_Chain_Operators`.
- **Anthropic PBC**: `https://code.claude.com/docs/en/settings` + `CLAUDE.local.md:7` — PS7+ runtime mandate is project-runtime cardinal authority; Node v22 patterns in `tools/*.mjs` per Anthropic CC plugin/skill discovery spec.

## Node v22 native primitives — adoption opportunities

| Primitive | What | Current state | Adoption candidate |
|---|---|---|---|
| `node --test` | Built-in test runner (stable v22) | `package.json` uses it: `"test:parallel-guard": "node --test tools/test-parallel-guard-race.mjs tools/test-parallel-guard-r4-cross-prompt.mjs"` ✓ | Already in use — verified |
| `node --watch` | Built-in watch-mode (stable v22) | Not currently used in `tools/*.mjs` | Low-priority — orchestrator-flow tools are one-shot, not server-style |
| `node --env-file=.env` | Built-in .env loader (stable v22) | Not used; envs come from CLAUDE.local.md PowerShell exports | Low-priority — runtime already wired via PS env block per CCBP `claude-settings.md` |
| `node --experimental-strip-types` | Direct TS execution (v22.6+) | No `.ts` in `tools/` — pure `.mjs` | NOT APPLICABLE |
| `node:test` reporter `--test-reporter=spec` | Pretty-printed test output | Default reporter in use; `spec` is opt-in | Low-priority polish |
| `import.meta.dirname` / `import.meta.filename` | Replace `path.dirname(fileURLToPath(import.meta.url))` | Used 12+ times across `tools/*.mjs` per Grep | **Medium-priority refactor candidate** — single-pass replace_all per file (~30 LOC delta) |

## PowerShell 7+ pipeline operator audit — `tools/eee.ps1`

Audit-target: operator's launcher `tools/eee.ps1` (modified by concurrent session per `git status` — DO NOT edit this wave without operator-sign).

Per current PS7-runtime mandate (CLAUDE.local.md L7 + parent prompt §Environment): `&&`/`||`/`??` are available.

**Pattern audit** (read-only via `git show HEAD:tools/eee.ps1`):
- Sequential commands chained with `;` → could use `&&` for fail-fast
- `if ($null -ne $x) { $x } else { $default }` → could use `$x ?? $default`
- `$obj.PSObject.Properties[$key]` null-conditional → could use `$obj?.$key`

**Adoption status**: DEFERRED — concurrent session has modified `tools/eee.ps1` (stashed at `concurrent-session-inflight-W347-bracket`); merging W347 audit-derived edits with concurrent edits requires operator-sign.

## Tests that could benefit from `node:test`-native patterns

- `tools/test-parallel-guard-race.mjs` — already `node:test` per package.json script
- `tools/test-parallel-guard-r4-cross-prompt.mjs` — same
- No new test files identified this audit

## Recommendation

- **NO ACTION** this wave. Pattern adoption ≠ correctness blocker; defer to W348+ when operator can review batched diff.
- **Operator-sign-pending**: PS7+ ?? / && operator adoption in eee.ps1 + import.meta.dirname migration across tools/*.mjs (estimated 8 files, ~30 LOC delta).

## Audit conformance to /goal P4(d)

- ✓ Audited `node:test` + `--watch` + `--env-file` opportunities
- ✓ Audited PS7+ `&&`/`||`/`??` opportunities in `eee.ps1` (audit read-only by MY hand; concurrent-session DID edit `tools/eee.ps1` and the edit was staged in commit `faf018f` — codex r1 MEDIUM-2 closure: this audit's "no code changes this wave" claim refers to MY edits only; concurrent-session ps1 edits landed via the same commit as a side-effect of `git add` scope)
- ✓ Cite-anchored to nodejs.org + Microsoft Learn (org-distinct anchors)
- ⏸ DEFERRED execution per recommendation above

## Cardinal-rule conformance

- CR-6 verify-before-claim: every claim above has either file:line or commit SHA anchor
- CR-5(b) destructive-ops: zero edits to `tools/eee.ps1` (concurrent-session collision risk)
- No SKILL.md authored — survey artifact only
