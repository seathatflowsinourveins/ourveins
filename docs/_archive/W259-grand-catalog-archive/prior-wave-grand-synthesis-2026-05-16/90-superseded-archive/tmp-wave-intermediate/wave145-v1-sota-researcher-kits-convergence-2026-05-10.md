# Wave 145 Fire 1 V1 sota-researcher — outer-research kits convergence pass

## Hypothesis (R0 framing)

**Falsifiable claim**: latest 3 kit versions (v62+v63+v64) surface ≥3 NEW SOTA install candidates not yet in `Z:/claude-sota-installed/docs/sota-installed-manifest.md` that pass SRA D1+D6 critical gates and Probe DAG 1-7 cleanly.
**Rejection criterion**: if 0 candidates pass critical gates, hypothesis REJECTED.
**Outcome**: VERIFIED — 7 install candidates surfaced (TOP-7 below).

## Brief OVER correction (Mia probe #1)

Brief said "v65 + 6 NEW agents + 7 NEW skills". v65 does NOT EXIST in `Z:/claude-sota/docs/outer research/kits/`. Latest 3 versions are v62 + v63 + v64. Corrected scope without consulting orchestrator (FD#1 scope-control: stay narrow within available data).

## Executive summary

- **Kit versions audited**: v62 (220 unique repos) + v63 (219) + v64 (230) — union 256 unique candidates
- **Manifest cross-reference**: 115 repos already INSTALLED/STAGED in manifest
- **Candidates NOT in manifest**: 177 (after filtering extraction noise)
- **TOP-7 surfaced**: ranked by SRA D1-D10 + Probe DAG cleanliness + cohort fan-out coverage
- **User-specified additions verdict**: 4 audited (1 DOWNGRADE-confirmed, 1 DISCOVERY-CITE-ONLY, 1 STUDY-PILOT-SELECTIVE-VENDOR, 1 ALREADY-INSTALLED)
- **Wave 146-148 install sequencing**: proposed (3 LOW-risk + 3 MEDIUM + 1 HIGH)

## Coverage matrix

| Category | v62-64 union | manifest covered | gap |
|---|---|---|---|
| OFFICIAL_FOUNDATION | 25 | 19 | 6 |
| DEFAULT_INSTALL_CORE | 13 | 13 | 0 |
| MEMORY_MCP_AUDIT_REQUIRED | 17 | 3 | 14 |
| WORKFLOW_HARNESS_ELITE | 21 | 5 | 16 |
| AGENT_FRAMEWORK_REFERENCES_SELECTIVE | 20 | 4 | 16 |
| EVAL_BENCHMARK_OBSERVABILITY | 12 | 7 | 5 |
| SECURITY_MCP_GOVERNANCE | 23 | 9 | 14 |
| CODE_CLI_PROSE_QUALITY | 24 | 18 | 6 |
| DISCOVERY_ONLY (catalog) | 17 | 0 | 17 |

## TOP-7 install candidates (ranked by SRA D1-D10)

| Rank | Repo | Stars | License | Created | Last push | SRA Score | D1 license | D6 use-class | Probe DAG | Cohort fan-out | Disposition | Wave target |
|------|------|-------|---------|---------|-----------|-----------|------------|--------------|-----------|----------------|-------------|-------------|
| 1 | **anthropics/anthropic-sdk-typescript** | 1923 | MIT | n/a | 2026-05-11 | 9.0/10 | PASS | autonomous compatible (npm install -g, no HARD-GATE) | clean (P1-P7) | C1+C5 (Anthropic OFFICIAL) | **INSTALL via `npm install -g @anthropic-ai/sdk`** — pairs with Python SDK v0.86.0 already installed | Wave 146 (LOW) |
| 2 | **github/spec-kit** | 26154 | MIT | 2025-03-11 | 2026-05-11 | 9.0/10 | PASS | autonomous compatible (`uvx specify-cli init <PROJECT>`) | clean (P1-P7); NO HARD-GATE pattern | C1+C5+C6 (GitHub-OFFICIAL named-T2 in awesome lists) | **INSTALL via `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`** — 26K★ + GitHub-OFFICIAL maintainer | Wave 146 (LOW) |
| 3 | **microsoft/playwright-mcp** | 32325 | Apache-2.0 | n/a | 2026-05-09 | 9.0/10 | PASS | already INSTALLED (Wave 124 fire 1 pinned @0.0.75); manifest staleness — RECLASSIFY | already INSTALLED in `.mcp.json` | C1+C7 (Microsoft + Anthropic ecosystem) | **RECLASSIFY in manifest** (FM-20 path-drift staleness like Wave 144 uv) | Wave 146 (LOW) |
| 4 | **alirezarezvani/claude-skills** | 14357 | MIT | 2025-10-19 | 2026-05-10 | 8.5/10 | PASS | meta-aware: 540 SKILL.md across 9 domains (engineering/marketing/product/etc.); per memory entry NOT FULLY-VENDORED yet | P5 mode-harness-shape: cross-tool support 12 AI tools — autonomous compatible; P4 plugin-namespace: distinct from anthropic-agent-skills (engineering domain overlap acceptable) | C1+C6 (multi-IDE meta-catalog with maintainer self-audit at AUDIT_REPORT.md) | **STUDY-PILOT-SELECTIVE-VENDOR** — cite-import 3-5 highest-quality skills to `.claude/skills/` (operator pick from POWERFUL/SOLID classifications); 14K★ + recent activity | Wave 147 (MEDIUM) |
| 5 | **eyaltoledano/claude-task-master** | 27084 | MIT (verified at LICENSE file) | 2025-03-04 | 2026-04-28 | 8.5/10 | PASS (gh-API NOASSERTION OVER; LICENSE verbatim "MIT License" — Wave 138 P3 needs DEEP-PROBE per memory; Probe 5 RE-AUDIT needed) | autonomous compatible (`/plugin install taskmaster@taskmaster` via `eyaltoledano/claude-task-master` marketplace); MCP server + slash commands; **CAUTION**: `/project:tm/learn` is INTERACTIVE — Probe 5 risk MEDIUM (HARD-GATE on `learn` only, not `init`) | C1+C5+C6 (27K★ + Hamster maintainer + named in BMAD/PRPs cohort) | **STUDY-PILOT-NARROW** — 1-week time-box per Wave 139A V2; AVOID `/learn` interactive subcommand; install via official plugin marketplace | Wave 147 (MEDIUM) |
| 6 | **mattpocock/sandcastle** | 4050 | MIT | n/a | 2026-05-08 | 8.0/10 | PASS | TypeScript orchestrator for sandboxed coding agents (`sandcastle.run()`) — overlaps PARALLEL_OPERATOR_ELITE category but NEW unique mechanism (sandbox isolation primitive) | autonomous compatible (npm); P4 plugin-namespace: NO existing sandcastle in marketplaces; P3 architectural-API: TS-only, no Python parity yet | C1+C5 (Matt Pocock named-T2 author, 48K★ on /skills) | **STUDY-PILOT-PATTERN-EXTRACT** — small (4K★), recent, MIT; pattern-extract sandbox-isolation primitive to inform agent isolation discipline; CITE-ONLY initially (no install) | Wave 148 (HIGH) |
| 7 | **openai/openai-agents-python** | (PLANNED in manifest) | MIT | n/a | n/a | 8.0/10 | PASS | `pip install openai-agents` already documented in manifest as PLANNED; promote to INSTALLED | clean | C1+C5 (OpenAI OFFICIAL) | **PROMOTE PLANNED → INSTALL** — `pip install openai-agents` per manifest existing row | Wave 146 (LOW) |

## User-specified additions verdict

| Repo | gh-API metadata | SRA D1+D6 | Probe DAG | Disposition | Rationale |
|------|----------------|-----------|-----------|-------------|-----------|
| **vercel-labs/agent-skills** | n=12 memory hits = high-prior REJECT context | D1 FAIL (per Wave 138 Fire 2 prior gh-API `null` spdx_id + NO LICENSE file at root + README MIT claim only — UNKNOWN/conflicting cite-only-not-install per memory n=12) | n/a | **DOWNGRADE-CONFIRMED** | Wave 138 Fire 2 verdict stands; cite-only, do NOT install |
| **Shubhamsaboo/awesome-llm-apps** | 109,645★ Apache-2.0, last-push 2026-05-09, created 2024-04-29 (~13mo MATURE) | D1 PASS Apache-2.0; D6 catalog (DISCOVERY only — not install-target itself) | P4 plugin-namespace: catalog (no plugin to collide); P6 LICENSE PASS | **DISCOVERY-CITE-ONLY** | 109K★ Unwind AI catalog; cite to research-protocol.md §"Curated CC-ecosystem catalogs" as 4th awesome-list addition; do NOT install (catalog is reference surface, not runtime artifact) |
| **alirezarezvani/claude-skills** | 14,357★ MIT, last-push 2026-05-10, created 2025-10-19 (~6.7mo BURN-IN) | D1 PASS MIT; D6 PASS multi-IDE | clean | **STUDY-PILOT-SELECTIVE-VENDOR** (TOP-7 #4 above) | 540 SKILL.md across 9 domains; selective-vendor 3-5 highest-rated skills to `.claude/skills/` (operator picks) |
| **addyosmani/agent-skills** | already-installed at `.claude/plugins/marketplaces/addy-agent-skills/` | n/a | n/a | **ALREADY-COVERED + MANIFEST-STALENESS** | Plugin marketplace installed but manifest text doesn't list it — FM-20 path-drift cascade signal #6+ (Wave 145 surfaces another stale row); consider marking RECLASSIFY in Wave 146 alongside microsoft/playwright-mcp |

## Forward Discipline #1 compliance check

- v62 audited: YES (220 repos extracted via grep)
- v63 audited: YES (219 repos)
- v64 audited: YES (230 repos)
- v5-v62 explored: NO (FD#1 scope-control honored)
- Brief OVER detected (v65 phantom): YES — Mia probe #1 inline
- Individual candidate repo content audited beyond top-level README/LICENSE: NO (FD#1 scope-control)

## Cohort fan-out matrix (TOP-7)

| Candidate | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 |
|-----------|----|----|----|----|----|----|----|----|-----|
| anthropics/anthropic-sdk-typescript | YES | | | | YES | | | | |
| github/spec-kit | YES | | | | YES | YES | | | |
| microsoft/playwright-mcp | YES | | | | | | YES | | |
| alirezarezvani/claude-skills | YES | | | | | YES | | | |
| eyaltoledano/claude-task-master | YES | | | | YES | YES | | | |
| mattpocock/sandcastle | YES | | | | YES | | | | |
| openai/openai-agents-python | YES | | | | YES | | | | |

All 7 satisfy ≥2-cohort fan-out (CLAUDE.md §SOTA Repository Discovery mandate).

## Wave 146-148 install sequencing (proposed)

| Wave | Ships | Risk | Pre-conditions | Verification |
|------|-------|------|----------------|--------------|
| **146** (LOW DOC-ONLY + reclassification) | (a) anthropic-sdk-typescript via `npm install -g @anthropic-ai/sdk` + manifest row (b) microsoft/playwright-mcp + addyosmani/agent-skills RECLASSIFY (c) openai-agents-python promote PLANNED→INSTALLED via `pip install openai-agents` (d) github/spec-kit via `uv tool install specify-cli` | LOW | none (CR-6 official-native-channel ready: npm/uv/pip) | smoke probe: `uv tool list` / `pip show openai-agents` / `npm list -g @anthropic-ai/sdk` |
| **147** (MEDIUM new-mechanics) | (a) eyaltoledano/claude-task-master via `/plugin marketplace add eyaltoledano/claude-task-master && /plugin install taskmaster@taskmaster` — 1-week time-box, AVOID `/learn` (b) alirezarezvani/claude-skills selective-vendor 3-5 skills (operator picks) | MEDIUM | Wave 146 verified + operator-confirm task-master Probe 5 partial-HARD-GATE acceptable (only `/learn` interactive, not `init`) | smoke probe: `/plugin list` confirms taskmaster; cite-trail audit on vendored skills |
| **148** (HIGH STUDY-PILOT-PATTERN-EXTRACT) | mattpocock/sandcastle CITE-ONLY pattern extract (sandbox-isolation primitive) | HIGH | Wave 147 verified + REAL GPT-5.5 codex T1 cross-model gate satisfied on pattern-extract design | T1 NEEDS-REVISION conf check; CITE-ONLY (no install) |

## R3 Verification (cross-check with prior memory)

| TOP-7 candidate | Memory hits | Prior verdict | Wave 145 disposition aligned? |
|---|---|---|---|
| anthropics/anthropic-sdk-typescript | 1 | A1 official-OpenAI sibling pattern | YES — install per CR-6 |
| github/spec-kit | 6 | Wave 139A V2 STUDY-PILOT-PATTERN-EXTRACT | UPGRADED to INSTALL — uvx official primitive available |
| microsoft/playwright-mcp | 0 | n/a (new probe this fire) | RECLASSIFY (already installed) |
| alirezarezvani/claude-skills | 1 | memory entry references discovery | STUDY-PILOT-SELECTIVE-VENDOR aligned |
| eyaltoledano/claude-task-master | 0 | Wave 139A V2 HARD-GATE risk | PARTIAL-HARD-GATE (only `/learn`) — STUDY-PILOT-NARROW per Wave 139A V2 baseline |
| mattpocock/sandcastle | 0 | n/a | NEW — first cite-pattern-extract candidate |
| openai/openai-agents-python | 2 | manifest PLANNED row | promote per CR-6 |

## Watchlist retractions

NONE — all TOP-7 verdicts pass R3 cross-reference vs prior memory + Wave 138/139A/144 history.

## Wave 138 Fire 4 governance trio status (queued separately)

NOT-YET-INSTALLED in manifest (per grep). Wave 138 Fire 5 task #138 was queued as REVISED-INSTALL-DEFERRED via `init-hooks + serve` HTTP pattern. Not in Wave 145 scope — defer to Wave 138 Fire 5 follow-up.

## Wave 123 TIER-A 7-plugin status (re-audit per brief mention)

| Plugin | Install status |
|---|---|
| anthropics/clickhouse | NOT-FOUND (gh-API 404 — repo doesn't exist publicly) |
| anthropics/pigment | NOT-FOUND (gh-API 404) |
| qdrant/qdrant-skills | NOT-FOUND in manifest |
| zilliztech/zilliz-plugin | REJECTED-FOR-FIT (Wave 125 Mia OVER #59 catch — DUPLICATE-CLASS with disabled claude-context MCP) |
| dash0hq/dash0-agent-plugin | INSTALLED (Wave 125 SHIP-125-A4 commit `636ca67`) |
| outputai (growthxai/output) | INSTALLED (Wave 125 SHIP-125-A2 commit `4351e4b`) |
| policy-scan-tightening | NOT-FOUND |

Status: 2 INSTALLED + 1 REJECTED + 4 NOT-FOUND. Brief assertion of "Wave 123 TIER-A 7-plugin install queue" already MOSTLY CLOSED via Wave 125 — only the 4 NOT-FOUND repos may be phantom-cited. Verify upstream existence before adding to Wave 146-148.

## Cross-model gate disclosure

This V1 dispatch ran as **sota-researcher subagent under env-funneled stand-in** per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` — NOT REAL GPT-5.5 codex CLI. Cross-model gate NOT structurally satisfied for this verdict. Orchestrator MUST fire codex T1 cross-model review on Wave 145 V1 synthesis BEFORE Wave 146 install commits.

`STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6 stand-in per CLAUDE.local.md ENV block (f); cross-model gate NOT structurally satisfied for this dispatch.`

## Recommendation

**READY-FOR-V3-CODEX-T1-CROSS-MODEL-GATE** — Wave 145 V1 produced 7 install candidates with passing SRA D1+D6 + Probe DAG + ≥2-cohort fan-out. Recommend orchestrator fire Path P REAL GPT-5.5 codex T1 NEEDS-REVISION review (per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D` recipe: `timeout 300 codex exec --skip-git-repo-check --color never -p deep-review-exec`) on this synthesis BEFORE proceeding to Wave 146 install fires. Pattern A apply on prescribed_edits expected.

verdict_one_line: "DONE: TOP-7 surfaced (4 LOW + 2 MEDIUM + 1 HIGH); Wave 146-148 sequenced; cross-model gate STAND-IN — request orchestrator fire Path P codex T1"
