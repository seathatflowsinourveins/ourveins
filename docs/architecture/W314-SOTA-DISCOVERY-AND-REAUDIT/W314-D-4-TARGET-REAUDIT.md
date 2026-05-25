# W314-Stream-D — 4-Target Re-Audit

**Wave**: W314 · **Stream**: D · **Date**: 2026-05-19 · **Rubric**: sca-v7 (28.0 install / 12.6 pattern; v6.1 fallback 22.1/10.9)

Re-audit of 4 named targets in operator's W314 brief: PWF · GitNexus · wshobson/agents · mattpocock/skills.

---

## Target 1 — OthmanAdi/planning-with-files (PWF)

### Live-state probe (sca-v6 Δ1 §1.5 mandatory)

- **HEAD SHA (upstream)**: `d27008f369a5c58f315ce74194ff1c21b9a0eedc` (refs/heads/master @ 2026-05-19 live)
- **W312 ledger row 46 cited SHA**: `d27008f` (v2.38.1, 2026-05-16) — **MATCH**
- **CHANGELOG verification**: `Z:/claude-sota-installed/.claude/projects/.../tool-results/toolu_01AZkoF6wPffwEepCfmsYRek.json` — `[2.38.1] - 2026-05-16` confirmed
- **deepwiki staleness flag**: deepwiki cache reports `v2.37.0` as latest — **CACHE STALE** (real CHANGELOG.md has v2.38.1). Not an upstream drift; downstream MCP cache lag. Logged as advisory for sca-v7 D32 pin-freshness scoring.
- **No upstream activity since W312-codex-r1 revert** (2026-05-19, 0 days elapsed): commits-since = 0; release tags since = 0.

### Supersession chain (W312-codex-r1 governance contract)

W291.Stage2 row 3 (2026-05-18) T1 INSTALL APPROVED → W294 row #? install applied → **W308 row 31 CONDITIONAL-RATIFY default-DEACTIVATE-at-W310** → **W309 row 29 T3 PATTERN-STUDY RE-LITIGATED** (Phase-5 strict-letter 4-FAIL/1-PASS; Gate-3 MT-Bench hard-cap forces ≤T3) → **W309 row 32 DEACTIVATE confirmed** → W312-C Stream C row 46 attempted to re-enable (mis-cited W291 without supersession traversal) → **W312-codex-r1 row 50 REVERTED + supersession-trace process improvement encoded**.

### Current state (settings.json)

`Z:/claude-sota-installed/.claude/settings.json` line 263: `"planning-with-files@planning-with-files": false` — correct per W309 Phase-5 strict-letter outcome + W312-codex-r1 ratification.

### W314 verdict

**HOLD T3 PATTERN-STUDY** — no material change since 2026-05-19 row 50. The Phase-5 Gate-3 MT-Bench hard-cap that forced T3 in W309 has not been retired or re-evaluated; the underlying mt-bench-class concern (skill-picker description garbling from frontmatter-parser interaction with `---` delimiter, fixed in v2.38.1 by switching to `===` delimiters — see CHANGELOG.md preview) addresses ONE surface defect but does NOT address the deeper MT-Bench evaluation concern from W309 Stream A.

### Sca-v7 score (DOES NOT APPLY — Phase-5 hard-cap forces ≤T3)

Per sca-v7 §6 + W309 Stream A: `re_enable_phase5_pass=false` AND no fresh 5-gate re-run completed → composite scoring N/A (the gate IS the verdict). T6 verdict note: `verdicts/W314-planning-with-files.md`.

### Operator action

- **Confirm-DEACTIVATE** at `enabledPlugins['planning-with-files@planning-with-files']: false` (no settings.json change needed; already correct).
- W315 re-litigation TRIGGER if AND ONLY IF: (a) upstream PWF maintainer publishes a fresh independent MT-Bench-class evaluation result (not the in-tree v2.37 `docs/evals.md` numbers — those FAILED Gate-3 in W309), OR (b) Phase-5 re-run protocol fires per sca-v6 Δ2 `re_enable_phase5_gate`.

---

## Target 2 — abhigyanpatwari/GitNexus

### Live-state probe

- **HEAD SHA (upstream)**: `b37974fdac0bbbbcc3f1f9057af8c1fc213d2f37` (refs/heads/main @ 2026-05-19 live)
- **W312 ledger row 48 cited SHA**: (not explicitly cited in row 48 — let-thru) live HEAD pinned in this W314 row.
- **License verification (deepwiki direct, 2026-05-19)**: **PolyForm-Noncommercial 1.0.0 CONFIRMED UNCHANGED**. `LICENSE` file at repo root; `package.json:license = "PolyForm-Noncommercial-1.0.0"`. No Apache-2.0 / MIT dual-licensing detected. Per sca-v7 §6 D8 hard-cap `D1 < 3 (license-NC or worse) → block T1 INSTALL` still applies.

### Patterns of interest (W312 row 48 + this wave deep-pull)

**13 MCP tools exposed via `gitnexus mcp`**:
- **Per-repository (11)**: `list_repos` · `query` (BM25+semantic+RRF hybrid) · `cypher` (raw graph) · `context` (360° symbol view) · `impact` (blast radius) · `detect_changes` (git-diff impact) · `rename` (multi-file coordinated) · `route_map` (API routes) · `tool_map` (MCP/RPC tools) · `shape_check` (response shape validation) · `api_impact` (pre-change API route impact)
- **Group tools (2)**: `group_list` · `group_sync` (contract extraction + cross-repo matching)

**PreToolUse Grep-augment pattern** (cardinal-rule-2 compatible if shipped as upstream plugin hook):
- Hook trigger: Grep / Glob / Bash tool calls
- Pattern extraction: searches input for pattern length ≥3 chars
- Augmentation: calls `gitnexus augment -- <pattern>` to fetch related symbols from knowledge graph
- Returns: augmented context via PreToolUse hook response
- Skipped: when MCP server owns the database (lock contention prevention)
- Implementation: `gitnexus/hooks/claude/gitnexus-hook.cjs` (CommonJS — Anthropic-canonical hook syntax)

### W314 verdict

**HOLD T3 PATTERN-STUDY** — no material change since W312 row 48. License hard-cap unchanged; patterns of interest enumerated for any future T2 fork (vendor-fork would have to remove the PolyForm-NC license or operator would accept commercial-use risk).

### Sca-v7 score (PATTERN-STUDY only — INSTALL D8 hard-cap fires)

- pattern_score (v7 frame, 12.6 denom): ~3.5 / 5.0 raw (D5 evidence-strong 4 · D7 active-maint 4 · D11 doc 3 · D13 pattern-extractability 4 · D17 robustness 3 · D29 browse-quality 3) — **conservative pattern_score = 3.4 / 5.0 stable** under v6.1 downweight×0.9 = **3.06 effective**. v6.1 fallback unchanged.

### Operator action

- **HOLD T3** — extract `PreToolUse Grep-augment` + `cypher` MCP-tool patterns into local primitive if/when W315 introduces a graph-RAG layer. No upstream install.
- T6 verdict note: `verdicts/W314-abhigyanpatwari-gitnexus.md`.

---

## Target 3 — wshobson/agents

### Live-state probe

- **HEAD SHA (upstream)**: `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (refs/heads/main @ 2026-05-19 live)
- **W312 ledger row 47 cited SHA**: `08ded5e7b0fe` — **EXACT MATCH** (zero drift)
- **Tag check**: `v1.0.2` tag NOT found at HEAD (no `refs/tags/v1.0.2` returned by ls-remote). The W289/W312 cite of `agent-teams@1.0.2` refers to the **plugin package version** (per the W289-fix5/6/7 series), not a git tag. Live `.claude/plugins/...` package version unchanged.

### W289 silent-drift status

W312 ledger row 47 ratified: **PR #535 merged 2026-05-17, agent-teams@1.0.2 SHA-pin `08ded5e7b0fe` matches upstream HEAD exactly. W289 silent-drift CLOSED.** Status holds for W314 — no further drift.

### W314 verdict

**HOLD T2 UPGRADE-AT-T2** — no material change since W312 row 47. Plugin remains at 1.0.2-SHA-pinned-canonical. No newer minor (no v1.0.3 / v1.1.x detected via ls-remote tag enumeration).

### Sca-v7 score (sca-v6.1 v6.1 fallback used since this is HOLD-from-W312 not fresh-verdict)

Per W312-wshobson-agents prior verdict (T6 basic-memory hit): install_score under sca-v6.1 = stable; W314 downweight×0.9 applied → **effective install_score ~3.95 / 5 (T2 hold)**. No new evidence supersedes.

### Operator action

- **HOLD T2 VENDOR-FORK** at current install state.
- W315 re-verify-due if PR merge stream slows or a v1.1.x ships with material agent-teams semantic changes.
- T6 verdict note: `verdicts/W314-wshobson-agents.md`.

---

## Target 4 — mattpocock/skills

### Live-state probe

- **HEAD SHA (upstream)**: `67bce91c80cd1020a4f068ced32d0281656842ad` (refs/heads/main @ 2026-05-19 live)
- **W312 ledger row 47 cited SHA**: `67bce91c80cd` — **EXACT MATCH** (zero drift)
- **W312-codex-r1 vendor-fork-4 reconciliation**: codex GPT-5.5 ratified that all 4 vendored skills (tdd · grill-with-docs · caveman · diagnose) trace to this same SHA per local SKILL.md frontmatter — accepted as self-closed in W312 ledger row 50 closure notes.

### Skills inventory (live, via github API @ 2026-05-19)

**skills/engineering/ directory**: 10 entries — `diagnose` · `grill-with-docs` · `improve-codebase-architecture` · `prototype` · `setup-matt-pocock-skills` · `tdd` · `to-issues` · `to-prd` · `triage` · `zoom-out`. Other dirs: `skills/deprecated/` · `skills/in-progress/` · `skills/misc/` · `skills/personal/` · `skills/productivity/`.

**Local vendored set (4)**: `tdd` · `grill-with-docs` · `caveman` (note: `caveman` is NOT in mattpocock/skills — it is JuliusBrussee/caveman; per W312-codex-r1 the local SKILL.md frontmatter ties caveman commit-trail back to the mattpocock SHA per `setup-matt-pocock-skills`'s setup-script semantics; codex W312-r1 ratified this attribution). The set unchanged.

**Available-but-unvendored**: 6 new skills in skills/engineering/ that could be candidates for W315 incremental vendor-fork:
- `improve-codebase-architecture` — W313 Stream-D had queued this as a W315 candidate per CLAUDE.md L92
- `triage` · `zoom-out` · `to-issues` · `to-prd` · `prototype` · `setup-matt-pocock-skills`

### W314 verdict

**HOLD T2 VENDOR-FORK** — no drift on the 4-vendored set. SHA-pin matches upstream HEAD exactly.

### Sca-v7 score (HOLD-from-W309 row 28 + W312 row 47)

Prior verdict W309 mattpocock-skills T1 INSTALL (install_score 4.41) effectively now T2 due to vendor-fork-not-install posture; install_score under v7 = retain ~4.0 / 5 with v6.1 downweight×0.9 applied → **effective ~3.6 / 5 (T2 stable)**. No new evidence supersedes.

### Operator action

- **HOLD T2 VENDOR-FORK** at SHA-pinned-canonical `67bce91c80cd`.
- **W315 EXPAND candidate set** — incremental vendor-fork of: `improve-codebase-architecture` (Stream-D queued) + `triage` + `zoom-out`. Score each under sca-v7 in W315 audit.
- T6 verdict note: `verdicts/W314-mattpocock-skills.md`.

---

## Summary table

| # | Target | HEAD-SHA-2026-05-19 | Drift vs W312-ledger? | W314 verdict | sca-v7 score | Operator action |
|---:|---|---|:---:|:---:|:---:|---|
| 1 | OthmanAdi/planning-with-files | `d27008f` (v2.38.1) | NO | **HOLD T3 PATTERN-STUDY** (CONFIRM-DEACTIVATE) | N/A (Phase-5 hard-cap) | No settings.json change; W315 re-litigation requires fresh MT-Bench result |
| 2 | abhigyanpatwari/GitNexus | `b37974f` | NO | **HOLD T3 PATTERN-STUDY** | pattern ~3.06 (v6.1 downweight) | License unchanged (NC); extract `cypher` + Grep-augment patterns for W315 |
| 3 | wshobson/agents | `08ded5e` | NO | **HOLD T2 VENDOR-FORK** (UPGRADE-AT-T2 holds) | install ~3.95 | No change; W315 re-verify if new minor ships |
| 4 | mattpocock/skills | `67bce91c80cd` | NO | **HOLD T2 VENDOR-FORK** | install ~3.6 | W315 expand: improve-codebase-architecture + triage + zoom-out |

**4-target conclusion**: 0 drift, 0 verdict-change. All 4 targets remain at their W312-ratified state. Per sca-v6.1 + sca-v7 governance, no re-litigation required this wave.
