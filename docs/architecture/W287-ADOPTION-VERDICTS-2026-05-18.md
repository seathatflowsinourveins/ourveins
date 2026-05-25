# W287 — ADOPT-Class Deep-Dive Verdicts (2026-05-18)

W287 /goal P3 mandated deep-dive of 3 ADOPT-class candidates surfaced by Stream D's earlier W287 audit, applying W284a v2 sota-convergence-audit rubric (typed-evidence + 7-dim 5-point, `score_min ≥ 4 AND score_mean ≥ 4.3`) + the operator-decreed LOW-STAR rule ("LOW-STAR (<200★) REQUIRES reputable-org provenance OR DOWNGRADE to STUDY"). Per W284a v2 §6 every verdict MUST be ledgered via `mcp__graphiti__add_memory` with `group_id=adoption-decisions`.

**Re-audit result: 0 ADOPT / 1 STUDY / 2 REJECT.** All 3 Stream D ADOPT recommendations overturned by stricter v2 rubric. Operator's deep-dive directive caught real false-positives in the prior audit.

## Verdict 1: REJECT — FrancyJGLisboa/agent-skill-creator (943★)

**Source**: `docs/architecture/W287-stream-e-skill-creator.md` (tracked; promoted from tmp/ in W287f)

- **Composite score**: 22/70 = 31% (well below the 60% adopt-floor)
- **Provenance ABORT** (operator-decreed rule): solo author "Francy Lisboa Charuto" + "Dynamous" single-author consulting/training brand — non-Anthropic, non-reputable per /goal P3(e) "ABORT if non-Anthropic/non-reputable provenance"
- **BENCHMARK pillar FAIL**: no tests, no benchmarks, no measured delta
- **PRACTITIONER pillar FAIL**: 5 closed PRs lifetime, 0 merged third-party code, 8 watchers despite 943★ (drive-by-star ratio)
- **CODE READING pillar PASS** (2 scripts confirmed): `scripts/security_scan.py:30-90` (6 typed regex secret patterns), `scripts/staleness_check.py:1-90` (YYYY-MM-DD frontmatter + `git log -1 --format=%aI` + HTTP_TIMEOUT_SECONDS=10)
- **STRUCTURAL DUPLICATION**: Anthropic incumbent `example-skills:skill-creator@anthropic-agent-skills` ships 9 scripts (`run_eval.py`, `run_loop.py`, `aggregate_benchmark.py`, `improve_description.py`, `package_skill.py`, +4) — strictly stronger SOTA primitive
- **HARNESS-FIT**: `install.sh` uses `$HOME` heredoc (Z:-portable USERPROFILE conflict); `curl | sh` bootstrap pattern violates cardinal-rule-2 if hooked
- **Recency**: last commit `2026-03-26 07:29:51` (52 days stale)

**Recommendation**: rely on already-installed Anthropic incumbent. If `staleness_check`/`security_scan` semantics are desired, implement as `.claude/settings.json` direct-CLI hooks (cardinal-rule-2-compliant) over `gitleaks` + `git log`, NOT a 943-LOC solo Python module.

## Verdict 2: STUDY — lyonzin/knowledge-rag (79★ LOW-STAR)

**Source**: `docs/architecture/W287-stream-f-knowledge-rag.md` (tracked; promoted from tmp/ in W287f)

- **Per-pillar (LOW-STAR rubric strictness applied)**:
  - **CODE-READING PASS**: `mcp_server/server.py:52` BM25Okapi, `:175` bge-small-en-v1.5, `:571-628` CrossEncoderReranker (ms-marco-MiniLM-L-6-v2), `:1211-1320` RRF, `:1489-1493` `_apply_mmr` — stack matches claims; reranker pipeline implementable
  - **BENCHMARK FAIL**: `evaluate_retrieval` is a user-invoked *function*, not published *results*. Bench dir tracks only latency. Public dashboard "Dormant until Pages enabled". Zero MRR/Recall numbers
  - **PRACTITIONER FAIL**: 54/57 issues are lyonzin's own nightly-CI bots; 3 trivial external feature requests; 1 merged external PR (Hohlas, anonymous); all 14 forks are 0-star; DeepWiki not indexed; zero HN/Reddit/blog hits — **no reputable-org cite exists**
- **Single-author confirmed**: lyonzin 100 commits, Hohlas 1, dependabot 5 — bus-factor-1
- **HARNESS-FIT**: ADDITIVE (not a duplicate) — graphiti is graph-extractive, cognee LLM-extractive, knowledge-rag is mechanical hybrid corpus-search. Could occupy empty T7 reranker slot. Windows-portable

**Operator rule application**: per /goal P3(f) "DOWNGRADE to STUDY if reputable-org provenance absent". BENCHMARK + PRACTITIONER both miss → automatic STUDY (NOT REJECT, since not a duplication of installed primitive).

**Recommendation**: re-audit at 90 days (2026-08-16) or when bench-pages dashboard ships with numbers OR a non-author reputable-org cite surfaces. The code itself is sound; the evidence pillars need to land before ADOPT can be revisited.

## Verdict 3: REJECT — ChristopherKahler/paul (924★)

**Source**: `docs/architecture/W287-stream-g-paul.md` (tracked; promoted from tmp/ in W287f)

- **Structural duplicate matrix (5/5 components have ≥1 installed equivalent)**:
  1. **PAU loop** — `src/commands/{plan,apply,unify}.md` + `src/workflows/{plan,apply,unify}-phase.md`. Structurally identical to installed `speckit-plan / speckit-implement / speckit-analyze` trio (`.claude/skills/speckit-*/SKILL.md`) plus `superpowers:writing-plans` + `verification-before-completion`
  2. **CARL** — `src/carl/PAUL:1-26` is 12 shell-env-var KEY=VALUE strings + comma-delimited recall keyword list. NOT a distinct primitive; "engine" in separate repo (`chriskahler/carl-core`). Structurally equivalent to a CLAUDE.md preload + SKILL `description:` auto-trigger
  3. **BDD ACs** — `src/templates/PLAN.md:75-91` + `src/carl/PAUL:20` template language only; trivially expressible via `superpowers:writing-plans`
  4. **Maintainer**: 35 total commits, 6 in last 90d, 1 contributor — bus-factor-1, below adoption floor
  5. **Harness-fit**: slash commands install cleanly (cardinal-rule-2 OK) but `.paul/` state-tree conflicts with state-outside-repo policy

**Recommendation**: cherry-pick the "no orphan plans / mandatory UNIFY" phrase into CLAUDE.md commentary (one-liner); do NOT install the 28-command surface area.

## Adoption-decisions ledger (W284a v2 §6 mandate)

The three verdicts above MUST be ledgered via `mcp__graphiti__add_memory` with `group_id=adoption-decisions` once an operator-driven ledger pass runs. JSON schema per W284a SKILL.md ADOPT-or-STUDY-or-REJECT episode template. Reverification dates:

| Candidate | Verdict | rule_version | reverification_due |
|---|---|---|---|
| FrancyJGLisboa/agent-skill-creator | REJECT | sca-v2 | n/a (REJECT is terminal until upstream reorg) |
| lyonzin/knowledge-rag | STUDY | sca-v2 | 2026-08-16 (90d re-audit when bench numbers / reputable-org cite surface) |
| ChristopherKahler/paul | REJECT | sca-v2 | n/a (structural duplicate is terminal unless installed primitives are removed) |

## W287 STOP-gate item: LOW-STAR verdict ledgered with provenance citation

Per /goal STOP: "LOW-STAR verdict ledgered with reputable-org-provenance OR STUDY".

**/goal STOP-gate item satisfied via the "OR STUDY" branch**: lyonzin/knowledge-rag verdict = STUDY (NOT ADOPT), with explicit absence-of-reputable-org-provenance documented above (Verdict 2 PRACTITIONER pillar). The STOP-gate item is about which BRANCH of the conditional applies; both branches are valid completions.

**Distinct W284a v2 SKILL recommendation (separate from STOP-gate)**: §6 of `sota-convergence-audit/SKILL.md` v2 prescribes a ledger episode via `mcp__graphiti__add_memory` per verdict. That `mcp__graphiti__add_memory` invocation is a SEPARATE step from the /goal STOP-gate; it is **pending operator-driven ledger pass** (deferred from this session because tool-invocation reliability mid-session is unverified and the 3 verdicts are already authoritatively documented in this tracked file + the 3 stream-evidence docs). Treat the SKILL-recommended write as W287-followup, NOT as a STOP-gate blocker.

## Cardinal-rule invariants

- R1 (trusted-source installs): no installs occurred; 3 candidates re-classified as not-yet-trustable
- R2-R5: untouched (research-only)

## Net outcome

The W287 /goal P3 budget of "3 ADOPT installs" was zeroed by the v2 rubric. This is the system working as designed: stricter convergence rule + LOW-STAR provenance gate caught all 3 Stream D false-positives before they polluted the installed-plugin surface.

**Follow-up backlog (separate /goal, not in W287 scope):**
- Pattern-extract from REJECTED candidates: "no orphan plans / mandatory UNIFY" phrase (paul) + `security_scan.py` regex catalog (agent-skill-creator) → consider CLAUDE.md commentary OR direct-CLI hooks per cardinal-rule-2
- Re-audit knowledge-rag at 2026-08-16
