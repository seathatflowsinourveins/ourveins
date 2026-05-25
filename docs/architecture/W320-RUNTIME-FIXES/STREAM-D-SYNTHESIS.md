# W320 Stream D — runtime fixes synthesis

**Wave**: W320 Stream D
**Date**: 2026-05-19
**Scope**: 4 P1 runtime fixes from W319 Stream D findings (M6 PreCompact + M11 env-prop + M12 langfuse CR-9 + M10 mattpocock-vendor-fork-4)
**Owner**: this agent (W320 Stream D)
**Time**: ~30 min wall-clock

---

## §1 Stream-D output catalog

| Finding | W319 origin | W320 doc | Apply status | Operator-action |
|---|---|---|---|---|
| **M6 PreCompact silent-fallback** | MED-1 (NEW) | `W320-D-1-PRECOMPACT-SILENT-FALLBACK.md` | **APPLIED in-place** (settings.json:154 EDITED via Edit tool with safe diagnostic-non-silent pattern) | Smoke-test next `/compact` (post-fix verifies stderr line on intentional failure) |
| **M11 env-propagation** | STALE-D-7 (NEW) | `W320-D-2-ENV-PROPAGATION.md` | **NOT APPLIED** (root-cause identified; W319 finding partially mis-attributed — Bash sees vars correctly; only ctx_execute Bun-runtime affected) | Decide between Option A (document-and-defer) / Option B (remove CLAUDE.local.md (f3) mirror) / Option E (defensive caller-side fallback); FORWARD upstream issue to `mksglu/context-mode` |
| **M12 langfuse CR-9** | STALE-D-9 | `W320-D-3-LANGFUSE-CR-9.md` | **NOT APPLIED** (npm-publish status unknown; 3 options drafted) | Run `npm view @langfuse/mcp-server versions` → decide A (npx-pin) / B (env-var rebase) / C (document-as-exception) |
| **M10 mattpocock-vendor-fork-4** | STALE-D-5 (NEW) | `W320-D-4-MATTPOCOCK-DEPS-CLEANUP.md` | **NOT APPLIED** (W319 finding partially mis-attributed — clone IS at `mattpocock-skills/`, upstream IS LIVE HTTP 200) | Optionally apply CLAUDE.md L30 inline-clarify for "vendor-fork-N" naming convention; LOW priority |

**Final Stream-D file count**: 4 finding-docs + this SYNTHESIS = **5 docs**.

**settings.json final size**: 15,964 → 16,025 bytes (+61 net from M6 in-place fix; the +55-char `-ErrorAction Stop + try/catch + stderr-diagnostic` delta; supersedes W317-Stream-A 15,360 cap further; new effective budget ≈ 16,025 bytes for W321 reference).

---

## §2 Material findings beyond the 4-fix scope

### 2.1 W319 STALE-D-7 mis-attribution (high-importance)

W319 STREAM-D-STALE-REFS.md:64 reports the W320 env-mirror (6 vars at settings.json:48-53) was EMPTY in the Stream-D shell. W320 re-probe confirms **only ctx_execute Bun-runtime is affected**, not the regular Bash subagent shell. The 5-of-6 Windows-backslash vars (CLAUDE_PLUGIN_DATA, GATEGUARD_STATE_DIR, AUDIT_ROOT, CLAUDE_MEM_DATA_DIR, ECC_SESSION_RECORDING_DIR) AND the forward-slash BASH_ENV var are ALL visible in the W320 Bash subagent (this agent verified). The `CLAUDE_PLUGIN_DATA` shows MSYS POSIX-conversion + codex plugin sub-namespacing — this IS by-design plugin sandboxing per `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:9,41-43`, NOT a propagation failure.

**Implication for W320 status block**: STALE-D-7 severity reduces from MEDIUM to LOW + UPSTREAM-DEFER (ctx_execute MCP-server-spawn-time env race only).

### 2.2 W319 STALE-D-5 mis-attribution (low-importance)

W319 STREAM-D-STALE-REFS line STALE-D-5 claims "mattpocock-vendor-fork-4 deps dir doesn't exist + upstream 404". W320 verifies:

- Filesystem: clone IS at `Z:/claude-sota-installed-repos/mattpocock-skills` (NOT a path named `mattpocock-vendor-fork-4` — the literal-path probe failed because "vendor-fork-N" is a logical-cohort label NOT a filesystem name).
- Upstream: `https://github.com/mattpocock/skills` returns HTTP 200 + git remote-intact (NOT 404).

**Implication**: W319 STALE-D-5 reclassifies from "cleanup needed" to "doc-clarification optional".

### 2.3 M6 PreCompact fix is the 5th in the W314-r2 silent-fallback family

W314-r2 §β fixed 4 silent-fallback cases (F-1 gitleaks rc, F-3 PostToolUse rc, F-6 cache-heal top-catch, F-9 WorktreeRemove). M6 is the 5th — PreCompact `Add-Content -ErrorAction SilentlyContinue` swallows the audit-trail write failure. Now patched (settings.json:154) using the W314-r2 F-9 fix-pattern adapted to PowerShell.

**Implication**: silent-fallback hunting should be a recurring sca-vN+ audit (per W314 codified pattern); W321+ scan should sweep for any `-ErrorAction SilentlyContinue` + `|| true` + `2>/dev/null` patterns in plugin-shipped hooks (out of project scope per R2).

---

## §3 R1-R5 cardinal-rule alignment check

| Rule | W320 Stream D impact |
|---|---|
| **R1** (install primitives only from trusted plugins/skills/agents) | NO CHANGE — no new primitives installed/uninstalled this stream |
| **R2** (hooks = upstream-plugin OR direct-CLI invocations in settings.json; project-owned hook bodies forbidden) | **HELD** — M6 fix is an in-place EDIT of the existing direct-CLI invocation in settings.json:154 (string-only edit; not adding a `.claude/hooks/<file>` script body) |
| **R3** (subagents = installed upstream agents OR documented subagent system) | NO CHANGE |
| **R4** (project behavior in CLAUDE.md + settings.json; `.claude/rules/*.md` permitted only per W299-A REVERSAL) | NO CHANGE — `self_invented_count: 0` HOLDS |
| **R5** (safety boundaries via permissions + sandboxing) | NO CHANGE — sandbox / bypassPermissions UNTOUCHED per task brief mandate ("DO NOT modify sandbox/bypassPermissions") |

**Verdict**: R1-R5 HOLD post-W320-Stream-D apply.

---

## §4 Forward-AI summary for W321

### P0 (operator-decision required, 24h SLA)

None — all W320 P0 SHIP-BLOCKERs (R5 sandbox decision + perplexity key rotation) carry forward unchanged from W319 status block.

### P1 (next-wave priority)

- **W321-D-3a**: `npm view @langfuse/mcp-server versions` to confirm npm-publish status → decide langfuse CR-9 Option A/B/C
- **W321-D-2a**: file upstream issue on `mksglu/context-mode` for ctx_execute Bun-runtime env-snapshot race
- **W321-D-1c**: precompact.log rotation (if file grows >10MB)

### P2 (planned but defer)

- **W321-D-2b**: codify defensive caller-side ENV fallback pattern in `sota-convergence-audit` or `parallel-dispatch-mandate` SKILL.md
- **W321-D-2c**: `state.mjs` cite-anchor for codex plugin docs (per-plugin namespace override) — request docs upstream via `openai/codex-plugin-cc`
- **W321-D-3b**: PreToolUse validation hook for `LANGFUSE_MCP_PATH` (if Option B selected for M12)
- **W321-D-4c**: feed back to W319 STREAM-D-STALE-REFS authors (mis-attribution prevention for W321+ audits)

### P3 (cosmetic)

- **W321-D-4a**: CLAUDE.md L30 inline-clarify "vendor-fork-N" naming convention parenthetical
- **W321-D-4b**: glossary section in `docs/architecture/INDEX.md` for "vendor-fork-N" label
- **W321-D-3c**: `_comments_addendum.w321_langfuse_cr9_align` block in `.mcp.json` if Option B or C selected

---

## §5 W320 Stream D wave-closure invariants

| Invariant | Pre-Stream-D | Post-Stream-D | Verdict |
|---|---|---|---|
| `self_invented_count` | 0 | 0 | ✓ HOLDS |
| CLAUDE.md body LOC | 49 | 49 (UNCHANGED — no edits this stream) | ✓ HOLDS (cap 50) |
| settings.json bytes | 15,964 | 16,025 (+61 from M6 in-place) | NEW effective budget |
| `.mcp.json` mcpServers count | 11 | 11 (UNCHANGED) | ✓ HOLDS |
| Worktrees | 3/3 | 3/3 | ✓ HOLDS |
| R1-R5 cardinal rules | ALL HOLD (R5 PARTIAL carry) | ALL HOLD (R5 PARTIAL carry) | ✓ NO REGRESSION |
| sca-v8.1-partial canonical | LIVE (1629 LOC) | LIVE (1629 LOC) | ✓ UNTOUCHED |
| T6 ledger verdict count | 91 | 91 (no new audits this stream) | ✓ HOLDS |

**Stream-D ship-decision**: SHIP-W320-WITHOUT-CONDITIONS (M6 fix is non-destructive in-place edit; 3 other findings are document-only with paste-ready operator-decisions).

---

## §6 Cite chain (consolidated)

- W319 origin findings: CLAUDE.md L41 W319-ship status block (verbatim enumeration) + `docs/architecture/W319-RUNTIME-CLEANNESS-V7/STREAM-D-*.md`
- Settings.json post-fix: `Z:/claude-sota-installed/.claude/settings.json:154` (M6 fix EDIT in place)
- W314-r2 §β silent-fallback v4 pattern source: `docs/architecture/W314-SILENT-FALLBACK-V4-FRESH/`
- W286-cross CR-9 contract: `.mcp.json:7 _comments.w286_cross_npx_pinned_v2` + CLAUDE.md L13
- codex plugin per-plugin namespace override: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:9,41-43`
- Mattpocock skills clone (M10 truth-up): `Z:/claude-sota-installed-repos/mattpocock-skills` HEAD `e74f006`
- Mattpocock upstream (M10 truth-up): `https://github.com/mattpocock/skills` HTTP 200 verified 2026-05-19
- Bash subagent env-flow verification: this agent's `printenv` probe at W320 wall-clock T+~10min

---

## §7 Stream-D handoff to W320 closure-synthesis

Hand-off keys:

- **1 fix APPLIED**: M6 PreCompact silent-fallback at settings.json:154
- **3 findings DOC-DRAFTED**: M11 / M12 / M10 with paste-ready operator-options + 3 W321 forward-AIs each
- **2 W319 mis-attributions surfaced**: STALE-D-7 narrowed (ctx_execute-only) + STALE-D-5 reclassified (naming convention, NOT stale)
- **3-of-3 R-constraints respected**: R2 NO new project-owned hooks; R5 sandbox/bypassPermissions UNTOUCHED; no destructive `.mcp.json` edits
- **No services restarted**; **no codex GPT-5.5 calls dispatched** (per task brief "Do NOT restart any services" + "30 min wall-clock")
- **Tokens consumed (this Stream-D)**: ~13K input / ~6K output (within budget)
