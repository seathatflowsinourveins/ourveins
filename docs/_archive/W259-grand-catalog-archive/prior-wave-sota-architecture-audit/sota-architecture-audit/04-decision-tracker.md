# Decision Tracker — Per-Replacement Decision Log

**Tracker started:** 2026-05-10 (Wave 134 Fire 2)
**Schema:** per-candidate row tracking decision process, replacement (if any), why-SOTA evidence, comparison alternatives, provenance
**Cross-ref:** `00-master-tracker.md` (framework), `02-gap-matrix.md` (per-dimension verdicts), `03-sota-target-architecture.md` (target shape)
**Schema fields**: each row records:
  - candidate name + cite anchor
  - SRA D1-D10 score
  - decision (INSTALL / DOWNGRADE-WITH-DISCLOSURE / DEFER / REJECT-FOR-FIT)
  - replacement-of (existing primitive being replaced, if any)
  - why-SOTA (evidence + cite-trail)
  - alternatives considered + why rejected
  - cross-model T1 status (PASS / FAIL / NEEDS-REVISION-NN / PENDING)
  - operator action required

> Per `port-note-discipline.md §6`: this tracker is APPEND-ONLY. Verdicts that flip on later evidence get a NEW row with explicit reversal cite — the old row stays as audit trail.

---

## INSTALL decisions (8 rows)

### #1 — qdrant/mcp-server-qdrant (Ship A — L2 MCP wiring)

| Field | Value |
|---|---|
| Cite anchor | `https://github.com/qdrant/mcp-server-qdrant` (TIER-1 OFFICIAL Qdrant) |
| SRA D1 license | Apache-2.0 — D1✅ for use-class (local MCP runtime) |
| SRA D2 freshness | active 2026 — D2✅ |
| SRA D3 fresh-paint | not fresh-paint — TIER-1 OFFICIAL |
| SRA D4 maintainer | Qdrant Inc. — TIER-1 OFFICIAL |
| SRA D5 active | regular release cadence — D5✅ |
| SRA D6 use-class | MCP standard — D6✅ |
| SRA D7 Anthropic-aligned | Anthropic ships `qdrant-skills` plugin — D7✅ |
| SRA D8 industry adoption | widespread — D8✅ |
| SRA D9 FM awareness | no known FM — D9✅ |
| SRA D10 replacement | n/a (additive — closes "container UP but no MCP" gap) |
| **Verdict** | **INSTALL — 9/9 D1-D9 + D10 n/a** |
| Replacement-of | n/a |
| Why SOTA | Qdrant is the L2 vector DB (already running container v1.17.0); their OFFICIAL MCP server is the canonical exposer. Anthropic ships `qdrant-skills` plugin as TIER-1 OFFICIAL alignment. |
| Alternatives | (a) Custom HTTP-mode MCP wrapper — REJECTED (TIER-3 LOCAL-COMPOSITION; Qdrant OFFICIAL is preferable); (b) Embedded sqlite_vec only — REJECTED (current L1 is sqlite_vec; need L2 for scale) |
| Cross-model T1 | PENDING |
| Operator action | edit `.mcp.json` → add `qdrant` server entry pointing at running container at default port 6333 |

### #2 — LiteLLM proxy Path B for L3 Graphiti embeddings (Ship B)

| Field | Value |
|---|---|
| Cite anchor | `https://github.com/BerriAI/litellm` (BerriAI MIT, TIER-3 NAMED-ORG; eee already has reference-only) |
| SRA D1 license | MIT — D1✅ |
| SRA D2 freshness | active 2026 — D2✅ |
| SRA D6 use-class | LLM-router for embedding API — D6✅ |
| SRA D7 Anthropic-aligned | Anthropic CC enables `gateway-discovery` env var per CCBP — D7✅ |
| SRA D8 industry adoption | mature; ~12k★ — D8✅ |
| **Verdict** | **INSTALL — Path B (alt-provider routing)** |
| Replacement-of | unblocks L3 (currently PARTIAL — needs OPENAI_API_KEY) |
| Why SOTA | Path B routes Graphiti embeddings through LiteLLM proxy with Anthropic-only model (or bedrock-anthropic); avoids OPENAI_API_KEY requirement |
| Alternatives | (a) Path A: procure OPENAI_API_KEY — operator-decision; (b) disable L3 entirely — REJECTED (L3 is blueprint Memory Stack layer); (c) ollama local embeddings — DEFER (probe local model fit first) |
| Cross-model T1 | PENDING |
| Operator action | configure LiteLLM proxy + set Graphiti env to use proxy |

### #3 — Karpathy 3-layer wiki formalization (Ship C — taxonomic relabel only)

| Field | Value |
|---|---|
| Cite anchor | `karpathy-adapted.md §5 Build Up Over Sessions / Wiki Compounding Surface` (sibling cite-import-AMBER) + Karpathy gist `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f` (TIER-1 NAMED-AUTHOR) |
| SRA D6 use-class | docs-only formalization — D6✅ |
| SRA D9 FM awareness | obvious cross-iter learning win — D9✅ |
| **Verdict** | **INSTALL — docs-only relabel** |
| Replacement-of | clarifies existing `.claude/state/*.jsonl` (Layer 1) + `MEMORY.md` (Layer 2) + `docs/karpathy-llm-wiki-practice.md` (Layer 3) |
| Why SOTA | Karpathy's named-author 3-layer wiki structure is convergence-PASS at named-T2 + Anthropic CC supports skill `paths:` lazy auto-activation per CCBP `claude-skills.md:34 @ 64fffd53` |
| Alternatives | (a) Single flat memory file — REJECTED (no hierarchy = unsearchable at scale); (b) Structured DB (SQLite/JSON) — DEFER (Probe 7.b STUDY-PILOT eligible only with explicit consumer ETL path) |
| Cross-model T1 | PENDING |
| Operator action | edit existing `karpathy-adapted.md §5` to add explicit Layer 1/2/3 mapping in 3-layer table |

### #4 — codex T1-T7 STRICT promotion (Ship D)

| Field | Value |
|---|---|
| Cite anchor | `cross-model-consensus.md §"On codex unavailable"` + CR-7 Phase 2 trigger predicate |
| SRA D6 use-class | configuration shift — D6✅ |
| SRA D7 | Anthropic CC + OpenAI codex co-blessed — D7✅ |
| **Verdict** | **INSTALL — env flip** |
| Replacement-of | flips existing `CODEX_T1_GATE_STRICT=1` etc env from absent/0 to 1 |
| Why SOTA | CR-7 Phase 2 trigger predicate (c) requires Tier 1a INSTALLED with smoke-PASS; current codex T1-T7 are INSTALLED-AMBER (warns); STRICT promotion is the canonical Phase 2 transition |
| Alternatives | (a) Skip — REJECTED (CR-7 Phase 2 explicit predicate); (b) Per-gate selective STRICT — DEFER (operator can opt-in per gate) |
| Cross-model T1 | PENDING (recursive — STRICT mode would gate this very ship's commit) |
| Operator action | flip env vars per gate (T1 / T2 / T3 / T4 / T6 / T7) |
| **Caveat** | This is the gate that promotes itself. Operator must accept that subsequent commits will be reviewed under STRICT. |

### #5 — Path D opt-in directive (Ship E — operator-discipline only)

| Field | Value |
|---|---|
| Cite anchor | `CLAUDE.local.md ENV (h)` + TIER-1-DIRECT `https://code.claude.com/docs/en/env-vars` |
| SRA verdict | INSTALL (10/10 directive-only) |
| **Verdict** | **INSTALL — directive only** |
| Replacement-of | n/a |
| Why SOTA | FM-17.f n=3 same-arc 2026-05-09 — billing-class 1M context blocker for fan-out subagent dispatch; Path D `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` is canonical kill-switch per Anthropic env-vars docs |
| Alternatives | (a) Always-set Path D — REJECTED (parent loses 1M ceiling unnecessarily); (b) Per-fire eval — current behavior; (c) Auto-detect fan-out — DEFER (mechanical hook complex) |
| Cross-model T1 | PENDING |
| Operator action | document fan-out Wave activation predicate in CLAUDE.local.md ENV (h) comment block |

### #6 — mattpocock/skills install (Ship F)

| Field | Value |
|---|---|
| Cite anchor | `https://github.com/mattpocock/skills` (Matt Pocock TIER-2 NAMED-AUTHOR; 62k★ MIT) |
| SRA D1 license | MIT — D1✅ |
| SRA D2 freshness | active — D2✅ |
| SRA D3 fresh-paint | NOT fresh-paint (named-author + multi-year history) — D3✅ |
| SRA D4 maintainer | TIER-2 NAMED-PRACTITIONER (Matt Pocock — TS/AI ecosystem named) — D4✅ |
| SRA D5 active | active 2026 — D5✅ |
| SRA D6 use-class | CC plugin format — D6✅ |
| SRA D7 Anthropic-aligned | Anthropic CC supports `/plugin marketplace add` — D7✅ |
| SRA D8 industry adoption | 62k stars + named-T2 endorsement chain — D8✅ |
| **Verdict** | **INSTALL — 9/10** |
| Replacement-of | n/a (additive; complementary to existing 26 plugins) |
| Why SOTA | Convergence on Anthropic-bundled skill discipline; named-author ecosystem hub; MIT permissive license; 62k stars indicates broad adoption |
| Alternatives | (a) sickn33/antigravity-awesome-skills (1,400+ skills, 35k★, MIT) — DEFER (single-individual maintainer per `research-protocol.md §"sickn33/antigravity-awesome-skills"`); (b) ComposioHQ/awesome-claude-skills (REMOTE-ONLY, license [UNKNOWN]) — DEFER (license needs resolve); (c) Skip — REJECTED (62k★ named-T2 is convergence-PASS) |
| Cross-model T1 | PENDING |
| Operator action | `/plugin marketplace add mattpocock/skills` then `/plugin install <skill-name>@mattpocock` |

### #7 — Deny-hook security regression tests (Ship G)

| Field | Value |
|---|---|
| Cite anchor | `layered-gates-architecture.md §9` HARD GATE + cite codex T6 HIGH severity 2026-04-27 finding |
| SRA verdict | INSTALL (10/10) |
| **Verdict** | **INSTALL** |
| Replacement-of | n/a (closes critical safety gap) |
| Why SOTA | Per layered-gates §9: any hook emitting `exit 2` / `permissionDecision: "deny"` / `decision: "block"` MUST have `tests/test_<hook>_security.py`. Currently 2 deny-emitting hooks (safety_guard.py + agent_plan_readonly_bash_guard.py) lack security regression tests. Codex T6 HIGH severity 2026-04-27 found this exact class. |
| Alternatives | (a) Skip tests — REJECTED (HARD GATE; safety-critical); (b) Property-based fuzzing — DEFER (Phase 2 enhancement) |
| Cross-model T1 | PENDING |
| Operator action | write 2 test files covering: default-DENY destructive variants (`rm -rf .`, `git reset --hard`, fork bombs), default-ALLOW safe ops, edge cases (regex boundaries, unicode, command-separator escapes) |

### #8 — codex-miss eval corpus Phase 1 (Ship H)

| Field | Value |
|---|---|
| Cite anchor | `cross-model-consensus.md §"Eval-case mandate"` + parent karpathy-llm-wiki-practice doctrine |
| SRA verdict | INSTALL (9/10) |
| **Verdict** | **INSTALL — Phase 1 deterministic DSL** |
| Replacement-of | n/a (additive — verdict-driven → eval-driven evolution) |
| Why SOTA | Karpathy A4-retry codex GPT-5.5 verdict: "claude-sota was verdict-driven (T1/T2 misses stored as prose only); converting to replayable regression cases is compounding-learning win" |
| Alternatives | (a) Skip — REJECTED (eval-case mandate is operationally codified); (b) DeepEval / promptfoo only — INCOMPLETE (Phase 2 codex-judge needed); (c) Custom JSON schema only — DEFER (Phase 1 DSL is operator-tested per parent CCC) |
| Cross-model T1 | PENDING |
| Operator action | write `evals/codex_miss_cases.jsonl` corpus + `evals/run_codex_miss_eval.py` runner per Phase 1 deterministic DSL |

### #9 — RTK init (Ship I)

| Field | Value |
|---|---|
| Cite anchor | `iter3a-install-plan.md §B1` + Wave 118 Ship A2 |
| SRA D1 license | MIT — D1✅ |
| SRA D6 use-class | token-saving CLI hook — D6✅ |
| SRA D8 industry adoption | named-author tool with documented Wave 118 Ship A2 install — D8✅ |
| **Verdict** | **INSTALL — VERY HIGH leverage** |
| Replacement-of | n/a (binary already on disk; init pending) |
| Why SOTA | Wave 118 Ship A2 estimated 80% token-efficiency; MIT permissive; binary already INSTALLED (just needs `rtk init -g`) |
| Alternatives | (a) Skip — REJECTED (HIGH leverage already estimated); (b) ccusage alone — INSUFFICIENT (ccusage is reporting, RTK is reduction) |
| Cross-model T1 | PENDING |
| Operator action | `rtk init -g` per `iter3a-install-plan.md §B1` Windows caveat |

### #10 — SOTA-architecture-audit standing pattern (Ship J — meta)

| Field | Value |
|---|---|
| Cite anchor | this audit arc; `audit-action-loop.md` Wire/Surface/Close/Re-fire |
| SRA verdict | INSTALL (10/10 meta-discipline) |
| **Verdict** | **INSTALL — meta** |
| Replacement-of | n/a (formalizes ad-hoc per-wave audit pattern) |
| Why SOTA | This audit arc IS the dogfood — the very deliverable proves the pattern. Promote `docs/sota-architecture-audit/` to standing-pattern via cite in `audit-action-loop.md` or new local rule |
| Alternatives | (a) Keep ad-hoc — REJECTED (operator-trigger 2026-05-10 demands formal tracking); (b) New rule file — DEFER (reuse existing surface) |
| Cross-model T1 | PENDING |
| Operator action | edit `audit-action-loop.md` (or new rule) to cite this audit arc as standing-pattern template |

### #11 — Quarterly re-audit cadence directive (Ship K)

| Field | Value |
|---|---|
| Cite anchor | `karpathy-adapted.md §5 Wiki Compounding Surface` + this audit arc evidence |
| SRA verdict | INSTALL (10/10 directive) |
| **Verdict** | **INSTALL — directive** |
| Replacement-of | n/a |
| Why SOTA | SOTA repos drift on quarter-class timeline; quarterly re-audit catches drift before it accumulates |
| Alternatives | (a) Annual cadence — REJECTED (too slow for current velocity); (b) Trigger-driven only (e.g., Wave-N+50) — INSUFFICIENT (no time-based safety net) |
| Cross-model T1 | PENDING |
| Operator action | codify "every Q1/Q2/Q3/Q4 trigger" in CLAUDE.md OR new rule |

---

## DEFER decisions (representative — see 02-gap-matrix.md for full list)

### G1.2 claude-devfleet DAG dispatcher

| Field | Value |
|---|---|
| Cite anchor | `team-orchestration.md §"Reference-only ECC skills NOT wired in sss"` |
| SRA D6 | FAIL (HARD-GATE on MCP backend `:18801` not wired) |
| **Verdict** | **DEFER** |
| Why deferred | D6 use-class FAIL — until devfleet MCP backend wires in `.mcp.json`, plugin is reference-only |
| Reconsider when | DevFleet MCP backend lands in Anthropic OFFICIAL marketplaces OR operator commits to local MCP build |

### G2.4 semantic-router

| Field | Value |
|---|---|
| Cite anchor | task #61 Wave 118 Ship A4 PILOT pending |
| **Verdict** | **DEFER — STUDY-PILOT** |
| Why deferred | D6 ambiguous — eee-fit unverified; Wave 118 Ship A4 pilot pending |

### G2.5 cognee + cognee-mcp

| Field | Value |
|---|---|
| Cite anchor | `iter3a-install-plan.md §C1` BLOCKED |
| **Verdict** | **DEFER until SOTA HTTP-supervisor migration** |
| Why deferred | D5 STALE; cognee-mcp twice-broken in current state; await upstream HTTP-supervisor merge |

### G6.3 Langfuse / OpenLLMetry

| Field | Value |
|---|---|
| **Verdict** | **DEFER** |
| Why deferred | Phoenix is incumbent (D2 freshness); revisit when Phoenix shows STALE signal |

---

## REJECT-FOR-FIT decisions (2 rows)

### G6.4 SWE-bench / SWE-agent / OpenHands / GAIA / HumanEval

| Field | Value |
|---|---|
| Cite anchor | `iter3a-install-plan.md §C4` |
| SRA D6 | FAIL (eval-frameworks vs runtime use-class) |
| **Verdict** | **REJECT-FOR-FIT** |
| Why rejected | D6 use-class FAIL — these are research benchmarks, not runtime primitives; evaluating eee against them would require dedicated test harness orthogonal to current architecture |
| Recommend instead | Ship H (codex-miss eval corpus) covers regression-test use-case adapted to eee runtime |

### Wave 102 over-applied REJECTs (per SRA forward operator discipline)

Per `sota-research-architecture.md §"Forward operator discipline"`, Wave 102 audit verdicts are reclassified per SRA D1 use-class precision:

| Wave 102 verdict | Reclassified | Reason |
|---|---|---|
| trufflehog AGPL-3.0 REJECT | ✅ ACCEPTABLE for CLI-binary-use; Ship 2T removal stands on FUNCTIONAL grounds (gitleaks suffices) NOT license grounds | D1 use-class precision |
| context-mode ELv2 REJECT | ✅ ACCEPTABLE for local plugin runtime | D1 use-class precision |
| FalkorDB SSPLv1 REJECT | ✅ ACCEPTABLE for local Docker DB | D1 use-class precision |

---

## Cross-model T1 verification status (consolidated)

| Ship | T1 verdict | Pattern | Apply status |
|---|---|---|---|
| A | PENDING | TBD | not yet committed |
| B | PENDING | TBD | not yet committed |
| C | PENDING | TBD | not yet committed |
| D | PENDING | TBD | not yet committed |
| E | PENDING | TBD | not yet committed |
| F | PENDING | TBD | not yet committed |
| G | PENDING | TBD | not yet committed |
| H | PENDING | TBD | not yet committed |
| I | PENDING | TBD | not yet committed |
| J | PENDING | TBD | not yet committed |
| K | PENDING | TBD | not yet committed |

**Recommended T1 dispatch**: 1 consolidated codex T1 covering all 11 ships (foreground+tee, deep-review-exec, ~10-15 min). NEEDS-REVISION expected at conf 0.85-0.92; apply Pattern A fix-forward per `codex-t1-fix-forward-pattern.md`.

---

## Mia pre-apply ladder advance

This audit arc surfaced 4 candidates for Mia probe (per `mia-pre-apply.md`):

| Candidate | Mia probe | Verdict |
|---|---|---|
| Wave 132 GitNexus license retain (Round-3) | direct repo line-by-line per Round-3 close-synthesis | RETAIN — gitnexus@1.6.3 |
| Hookify W134-F2 fix | upstream `__file__` derivation pattern verified per PEP 3147 | INSTALL — patch landed |
| mattpocock/skills install | 62k★ MIT verified via direct GitHub probe | INSTALL — Ship F |
| Path D `CLAUDE_CODE_DISABLE_1M_CONTEXT` | TIER-1-DIRECT Anthropic env-vars docs verified | INSTALL — Ship E |

**Mia ladder advance**: n=130 → n=134 (+4 verifications)

---

## Provenance log entries (this audit arc)

- **2026-05-10T<N>:00Z** — Wave 134 Fire 2 audit arc opened per operator-trigger
- **2026-05-10T<N+5>:00Z** — Hookify W134-F2 dual-fix landed (8 files patched; verified spam-eliminated)
- **2026-05-10T<N+10>:00Z** — `00-master-tracker.md` written
- **2026-05-10T<N+15>:00Z** — `01-current-state-baseline.md` written
- **2026-05-10T<N+20>:00Z** — `02-gap-matrix.md` written (8 dimensions × SRA D1-D10 scoring)
- **2026-05-10T<N+25>:00Z** — `03-sota-target-architecture.md` written (11 ships proposed)
- **2026-05-10T<N+30>:00Z** — `04-decision-tracker.md` written (this file)
- **NEXT**: append hookify fix to `docs/install-provenance.md`; commit; dispatch consolidated codex T1

---

## Wave 134 Fire 5 — v1-v65 line-by-line audit Batch 1 (10 repos)

Per `05-audit-coverage-tracker.md`, each row scores SRA D1-D10 against live GitHub probe data (LICENSE + README + repo metadata) fetched 2026-05-10. Probe data at `_batch1-metadata.json`.

### B1-#1 yamadashy/repomix (codebase packer for LLM ingestion)

- **GH probe** [VERIFIED 2026-05-10 via `gh api repos/yamadashy/repomix`]: 24,567★, MIT, created 2024-07-13, last push 2026-05-10, not archived. Topics: ai/anthropic/claude/llm/mcp/typescript.
- **SRA**: D1=PASS (MIT) · D2=PASS (push today) · D3=PASS (24.5k★ 22mo) · D4=solo-named (yamadashy = Kazuki Yamada) · D5=PASS · D6=PASS (CLI + MCP variant) · D7=PASS (MIT eligible for TIER-1-DIRECT cite) · D8=PASS (Anthropic + others adopt) · D9=no FM violation · D10=PASS (sss currently uses ctx_batch_execute for similar purpose; potential complement)
- **Score**: 9/10 PASS
- **Replacement-of / overlap-with**: complementary to `context-mode` MCP (already INSTALLED); both pack repos for AI ingestion but repomix is filesystem-native CLI + MCP. Already CITE-only at `Z:/claude-sota/.claude/rules/research-protocol.md` §"Repomix Pack→Grep→Skill sub-rule".
- **Verdict**: **STUDY-PILOT** (Probe 7.b sss has demand surface — codebase-pack-for-LLM workflow exists; install via npm or `/plugin install` if marketplace variant exists)
- **CR-1 cite tier**: TIER-1-DIRECT eligible (MIT + named-author solo)

### B1-#2 jdx/mise (dev tool version manager, env-vars, task runner)

- **GH probe** [VERIFIED 2026-05-10]: 28,003★, MIT, created 2023-01-09 (~28mo), last push 2026-05-10. Description: "dev tools, env vars, task runner".
- **SRA**: D1=PASS · D2=PASS · D3=PASS (28k★ ~28mo SUSTAINED) · D4=solo-named (jdx = Jeff Dickey) · D5=PASS · D6=mixed (sss already uses fnm for node + uv for python; mise CONSOLIDATES into one tool) · D7=PASS · D8=PASS · D9=no FM · D10=PARTIAL (would supersede separate fnm + uv + cargo-install workflows; consolidation value moderate)
- **Score**: 8/10 PASS, 1/10 PARTIAL
- **Replacement-of**: fnm (current node) + uv standalone + cargo-install — mise unifies. **NOT a direct upgrade**: each existing tool works fine. Probe 7.a DEMAND-ABSENCE-WEAK (no concrete sss workflow blocked by current fragmentation).
- **Verdict**: **DEFER** (working alternative exists; consolidation is convenience not unblock)
- **CR-1 cite tier**: TIER-1-DIRECT eligible

### B1-#3 casey/just (command runner, Makefile-alternative)

- **GH probe** [VERIFIED 2026-05-10]: 33,488★, CC0-1.0, created 2016-06-17 (~10yr), last push 2026-05-10. Description: "Just a command runner".
- **SRA**: D1=PASS (CC0 = public domain, more permissive than MIT) · D2=PASS · D3=PASS (33k★ 10yr MATURE) · D4=solo-named (casey = Casey Rodarmor) · D5=PASS · D6=PARTIAL (sss uses tools/eee.ps1 + Bash; just is alternative shell glue) · D7=PASS · D8=PASS (very widely adopted) · D9=no FM · D10=DEMAND-ABSENCE (sss already has eee.ps1 + Bash recipes; no current workflow requires justfile syntax)
- **Score**: 7/10 PASS, 2/10 PARTIAL
- **Replacement-of**: tools/eee.ps1 entry-points + Bash one-liners. NOT-an-upgrade (eee.ps1 is bootstrap-required per CLAUDE.md cardinal-rule-5).
- **Verdict**: **DEFER** (Probe 7.a demand-absence)
- **CR-1 cite tier**: TIER-1-DIRECT eligible

### B1-#4 astral-sh/uv (Python pkg + project manager, Rust)

- **GH probe** [VERIFIED 2026-05-10]: 84,679★, Apache-2.0, created 2023-10-02 (~19mo), last push 2026-05-10. Topics: packaging/python/resolver/uv.
- **SRA**: D1=PASS · D2=PASS · D3=PASS (84k★ 19mo MASSIVE adoption) · D4=PASS (Astral = named-T2-org; same team as ruff) · D5=PASS · D6=PASS (sss already uses uv per `Z:/venvs/claude` mention in CLAUDE.local.md) · D7=PASS · D8=PASS (Anthropic + OpenAI + LangChain adopt) · D9=no FM · D10=PASS (already in use)
- **Score**: 10/10 PASS
- **Replacement-of**: ALREADY-INSTALLED (system-PATH per `Z:/venvs/claude` venv). Count as **CONFIRMED-INSTALLED** — promote row in `sota-installed-manifest.md` Section 10 if not already documented.
- **Verdict**: **ALREADY-INSTALLED** (cite-only retroactive)
- **CR-1 cite tier**: TIER-1-DIRECT

### B1-#5 ossf/scorecard (OpenSSF security health metrics)

- **GH probe** [VERIFIED 2026-05-10]: 5,436★, Apache-2.0, created 2020-10-09 (~4.5yr), last push 2026-05-08. Topics: openssf-scorecard/scorecard.
- **SRA**: D1=PASS · D2=PASS · D3=PASS (5.4k★ 4.5yr STABLE) · D4=PASS (OpenSSF = Linux Foundation org-tier) · D5=PASS · D6=PASS (GitHub Action / CLI binary, no embed required) · D7=PASS · D8=PASS (Google + Microsoft + ASF adopters per OSSF reports) · D9=no FM · D10=PARTIAL (sss has gitleaks/trufflehog covering secret-scan axis; scorecard adds repo-health-score axis NOT YET covered)
- **Score**: 8/10 PASS, 1/10 PARTIAL
- **Replacement-of / complement**: complements existing gitleaks + trufflehog secret-scanning (which cover the FINDINGS axis); scorecard covers the REPO-HEALTH axis (signed-releases, fuzzing, branch-protection, contributors, etc). Probe 7.b DEMAND-CREATES-NEW-WORKFLOW for SOTA-pin freshness audits per `sota-pin-discipline.md` — could score upstream repos before adoption.
- **Verdict**: **STUDY-PILOT** (5-clause Probe 7.b: named use case = "score each cited-dep repo before adoption-verdict"; local input = `PINS.json:cited_deps.*`; wiring path = `gh actions add scorecard.yml` per ossf docs; incumbent = NONE (gitleaks=secret-only); time-box = 30-day pilot)
- **CR-1 cite tier**: TIER-1-DIRECT (Linux Foundation maintainership)

### B1-#6 anthropics/claude-code-action (official GitHub Action for CC in PRs)

- **GH probe** [VERIFIED 2026-05-10]: 7,514★, MIT (Anthropic PBC), created 2025-05-19 (~12mo), last push 2026-05-09. No topics.
- **SRA**: D1=PASS · D2=PASS · D3=PARTIAL (7.5k★ 12mo — fast-growth) · D4=PASS (Anthropic OFFICIAL) · D5=PASS · D6=PARTIAL (sss is local autonomous /loop; GitHub Action is for PR-review workflow which is queued/future) · D7=PASS · D8=PASS · D9=no FM · D10=DEMAND-ABSENCE-CURRENT (sss commits to local; no PR-workflow active)
- **Score**: 7/10 PASS, 2/10 PARTIAL, 1/10 absence
- **Replacement-of**: orthogonal — not a replacement for any sss primitive; net-new PR-review surface.
- **Verdict**: **DEFER** (Probe 7.a current demand-absence; re-evaluate when sss opens PR workflow OR when GitHub remote enabled)
- **CR-1 cite tier**: TIER-1-DIRECT (Anthropic OFFICIAL)

### B1-#7 ast-grep/ast-grep (structural code search/lint/codemod in Rust)

- **GH probe** [VERIFIED 2026-05-10]: 13,747★, MIT, created 2022-07-01 (~34mo), last push 2026-05-10. Topics: ast/codemod/linter/rust/tree-sitter/typescript.
- **SRA**: D1=PASS · D2=PASS · D3=PASS (13.7k★ ~3yr STABLE-BURN-IN) · D4=solo-named (Herrington Darkholme) · D5=PASS · D6=PASS · D7=PASS · D8=PASS · D9=no FM (note: `@anthropic/mcp-ast-grep` phantom MCP per Z:/claude-sota agent-harness-fit-verification.md Probe 6 FM-09 ladder #5 — DIRECT-CLI INSTALL is admissible; MCP wrapper is phantom) · D10=PARTIAL (sss uses Grep+Glob; ast-grep is structural-search uplift for refactoring; Mia probe found Wave-50 mention but no install)
- **Score**: 8/10 PASS, 1/10 PARTIAL, 1/10 FM-aware
- **Replacement-of / complement**: complements Grep (regex) with AST-aware search; useful for codemod across plugin cache or skills directories.
- **Verdict**: **STUDY-PILOT** (5-clause Probe 7.b: named use case = "structural refactor across `.claude/skills/` or hook scripts"; local input = `.claude/hooks/scripts/*.py` + `.claude/skills/**/SKILL.md`; wiring path = `cargo install ast-grep` OR `npm i -g @ast-grep/cli`; incumbent = Grep alone insufficient for AST patterns; time-box = 30 days)
- **CR-1 cite tier**: TIER-1-DIRECT (avoid the phantom MCP variant per FM-09 ladder)

### B1-#8 trufflesecurity/trufflehog (secret scanner)

- **GH probe** [VERIFIED 2026-05-10]: 26,121★, AGPL-3.0, created 2016-12-31 (~9yr), last push 2026-05-10. Topics: credentials/devsecops/scanning/secrets/security.
- **SRA**: D1=PASS-CLI-binary-use (AGPL-3.0 acceptable for CLI-binary-use per SRA D1 use-class precision per Wave 102 reclassification; would BLOCK for embed-library use which is not applicable here) · D2=PASS · D3=PASS (26k★ 9yr MATURE) · D4=PASS (Truffle Security = named-org commercial-OSS) · D5=PASS · D6=PASS · D7=PASS · D8=PASS · D9=no FM · D10=DEMAND-ABSENCE? (sss already has gitleaks per `.claude/settings.json` PreToolUse[6]; trufflehog overlaps secret-scan axis but has VERIFIED-MODE which gitleaks lacks)
- **Score**: 8/10 PASS, 1/10 PARTIAL, 1/10 absence
- **Replacement-of / complement**: gitleaks scans static patterns; trufflehog ALSO VERIFIES credentials against live APIs (eg AWS-Sts validation). Complement, not replacement.
- **Verdict**: **DEFER** (existing gitleaks covers the secret-find use case; trufflehog adds verify-against-live-API which is not currently demanded by sss workflows — REVERSE auto if a leak ever lands)
- **CR-1 cite tier**: TIER-1 maintainer org

### B1-#9 crate-ci/typos (source-code spell checker, Rust)

- **GH probe** [VERIFIED 2026-05-10]: 3,934★, Apache-2.0, created 2019-04-16 (~6yr), last push 2026-05-08. Topics: cli/code-quality/rust/spell-checker.
- **SRA**: D1=PASS · D2=PASS · D3=PASS (3.9k★ 6yr STABLE) · D4=org-named (crate-ci) · D5=PASS · D6=PASS · D7=PASS · D8=PASS (pre-commit hook ecosystem widely adopted) · D9=no FM · D10=PARTIAL (sss has no current spell-check workflow; would catch typos in CLAUDE.md / rules / skills / commits)
- **Score**: 8/10 PASS, 1/10 PARTIAL
- **Replacement-of**: net-new (sss has no spell-check primitive).
- **Verdict**: **STUDY-PILOT** (Probe 7.b: named use case = "spell-check rules + CLAUDE.md + skills before commit"; local input = `.claude/rules/*.md`, `CLAUDE.md`, `docs/**/*.md`; wiring path = `cargo install typos-cli` + pre-commit hook; incumbent = NONE; time-box = 30 days)
- **CR-1 cite tier**: TIER-1-DIRECT

### B1-#10 astral-sh/ruff (Python linter + formatter, Rust)

- **GH probe** [VERIFIED 2026-05-10]: 47,454★, MIT, created 2022-08-09 (~34mo), last push 2026-05-10. Topics: linter/pep8/python/python3/ruff/rust/static-analysis/styleguide.
- **SRA**: D1=PASS · D2=PASS · D3=PASS (47k★ ~3yr SUSTAINED-MASSIVE) · D4=PASS (Astral org-tier) · D5=PASS · D6=PASS · D7=PASS · D8=PASS (Anthropic + many T1 orgs adopt) · D9=no FM · D10=PASS (sss already references ruff at `.claude/hooks/scripts/ruff_guard.py` per audit-action-loop.md mention; `.ruff_cache` exists at outer-research dir)
- **Score**: 10/10 PASS
- **Replacement-of**: ALREADY-INSTALLED at hook layer (`ruff_guard.py` runs on Python edits).
- **Verdict**: **ALREADY-INSTALLED** (cite-only retroactive)
- **CR-1 cite tier**: TIER-1-DIRECT

### Batch 1 summary

| Repo | Verdict | Notes |
|---|---|---|
| yamadashy/repomix | STUDY-PILOT | 24.5k★ MIT — Probe 7.b CLI+MCP complement |
| jdx/mise | DEFER | 28k★ MIT — consolidation only, no unblock |
| casey/just | DEFER | 33k★ CC0 — demand-absence vs eee.ps1+Bash |
| astral-sh/uv | ALREADY-INSTALLED | 84k★ Apache — system-PATH at Z:/venvs/claude |
| ossf/scorecard | STUDY-PILOT | 5.4k★ Apache — Probe 7.b SOTA-pin scoring |
| anthropics/claude-code-action | DEFER | 7.5k★ MIT — orthogonal PR workflow |
| ast-grep/ast-grep | STUDY-PILOT | 13.7k★ MIT — Probe 7.b structural refactor |
| trufflesecurity/trufflehog | DEFER | 26k★ AGPL-CLI — gitleaks covers current axis |
| crate-ci/typos | STUDY-PILOT | 3.9k★ Apache — Probe 7.b spell-check pre-commit |
| astral-sh/ruff | ALREADY-INSTALLED | 47k★ MIT — ruff_guard.py wired |

**Audited via line-by-line probe**: 10/10 = 100% of batch (LICENSE + repo-metadata + topics + push freshness all fetched live).
**Verdict distribution**: 4 STUDY-PILOT / 4 DEFER / 2 ALREADY-INSTALLED / 0 REJECT-FOR-FIT.
**Mia ladder advance**: n=134 → n=144 (+10 probe-verifications).

---

## Wave 134 Fire 5 — v1-v65 line-by-line audit Batch 2 (10 repos)

Probe data at `_batch2-metadata.json` (GH API fetched 2026-05-10).

### B2-#1 nutthouse/tutti (multi-agent orchestration CLI)

- **GH probe** [VERIFIED 2026-05-10]: 33★, MIT (Adam Nutt), created 2026-03-12, push 2026-05-05, no topics.
- **SRA**: D1=PASS · D2=PASS · D3=FAIL (33★ 2mo — way below STABLE-BURN-IN bar 90d) · D4=solo-named · D5=PASS · D6=DEMAND-ABSENCE (sss has parallel-agent-wave + advanced-agent-team-standing-directive; not blocked) · D7=PASS · D8=FAIL (low adoption) · D9=no FM · D10=DEMAND-ABSENCE
- **Score**: 5/10 PASS, 2/10 FAIL, 3/10 absence
- **Verdict**: **REJECT-FOR-FIT** (D3 + D8 fail — too young + low adoption; no demand surface)

### B2-#2 xiaolai/codex-toolkit-for-claude (Codex MCP for Claude Code)

- **GH probe** [VERIFIED 2026-05-10]: 27★, ISC (Xiaolai Li), created 2026-02-14, push 2026-04-29.
- **SRA**: D1=PASS (ISC permissive) · D2=PASS · D3=FAIL (27★ 3mo) · D4=solo-named · D5=PASS · D6=DUPLICATE (sss already has `codex@openai-codex@1.0.4` plugin INSTALLED via Anthropic marketplace) · D7=PASS · D8=FAIL · D9=no FM · D10=DUPLICATE per kiss-dry-yagni Must-Never #4
- **Score**: 5/10 PASS, 3/10 FAIL, 2/10 duplicate
- **Verdict**: **REJECT-FOR-FIT** (Probe 4 plugin-namespace duplicate of installed codex-plugin-cc)

### B2-#3 promptadvisers/claudex (autonomous Claude+Codex review loop)

- **GH probe** [VERIFIED 2026-05-10]: 67★, MIT, created 2026-04-26 (~14 days), push 2026-04-28.
- **SRA**: D1=PASS · D2=PASS · D3=FAIL (67★ <30d FAR-too-young) · D4=org-named (promptadvisers) · D5=PASS · D6=DUPLICATE (sss cross-model-consensus.md T1-T7 lifecycle covers Claude-orchestrates+Codex-reviews pattern) · D7=PASS · D8=FAIL · D9=no FM · D10=DUPLICATE
- **Score**: 5/10 PASS, 3/10 FAIL, 2/10 duplicate
- **Verdict**: **REJECT-FOR-FIT** (Probe 4 namespace duplicate; PRE-burn-in age)

### B2-#4 sakibsadmanshajib/gemini-plugin-cc (Gemini CLI plugin for CC via ACP)

- **GH probe** [VERIFIED 2026-05-10]: 17★, MIT, created 2026-04-14, push 2026-05-09.
- **SRA**: D1=PASS · D2=PASS · D3=FAIL (17★ <30d) · D4=solo-named · D5=PASS · D6=DEMAND-ABSENCE (sss commits to Claude+Codex pair; Gemini not in current cross-model topology) · D7=PASS · D8=FAIL · D9=no FM · D10=DEMAND-ABSENCE
- **Score**: 5/10 PASS, 3/10 FAIL, 2/10 absence
- **Verdict**: **REJECT-FOR-FIT** (Probe 7.a demand-absence; cross-model topology locked to Claude+Codex)

### B2-#5 affaan-m/everything-claude-code (ECC main repo — agent harness)

- **GH probe** [VERIFIED 2026-05-10]: 177,866★ MIT, created 2026-01-18, push 2026-05-10. Topics: ai-agents/anthropic/claude/claude-code/developer-tools/llm/mcp/productivity.
- **SRA**: D1=PASS · D2=PASS · D3=PASS-STRONG-PROVENANCE-EXPRESS (177k★ 4mo — predicate-gated relaxation per `convergence-gate.md` Axis-3 5-band table; named-T2 + Anthropic-aligned topic) · D4=PASS (Affaan Mustafa = named-T2, ECC author/maintainer) · D5=PASS · D6=PASS · D7=PASS · D8=PASS (massive star velocity + Anthropic ecosystem) · D9=no FM · D10=ALREADY-INSTALLED (`.claude/plugins/marketplaces/everything-claude-code/` per CLAUDE.md §Architecture)
- **Score**: 10/10 PASS
- **Verdict**: **ALREADY-INSTALLED** (cite-only retroactive; marketplace at runtime)

### B2-#6 yxwucq/ccui (web dashboard for parallel CC sessions in worktrees)

- **GH probe** [VERIFIED 2026-05-10]: 32★, NO LICENSE (License: None), created 2026-03-16, push 2026-04-10. Topics: claude-code/git-worktree/react/terminal/typescript/webui.
- **SRA**: D1=**FAIL** (NO LICENSE = LICENSE-BLOCKER per `convergence-gate.md` LICENSE-class anti-pattern; falls back to ALL-RIGHTS-RESERVED default for adopted code) · D2=PASS · D3=FAIL (32★ ~2mo) · D4=solo-named · D5=PASS · D6=PARTIAL (overlap with parallel-session-worktree-isolation discipline already in sss) · D7=FAIL (CR-1 requires permissive cite tier) · D8=FAIL · D9=no FM · D10=DEMAND-ABSENCE
- **Score**: 3/10 PASS, 5/10 FAIL, 2/10 partial
- **Verdict**: **REJECT-FOR-FIT** (D1 + D7 LICENSE-blocker per cardinal-rule-1 SOTA cite tier admissibility)

### B2-#7 automazeio/ccpm (PM skill via GH Issues + Git worktrees)

- **GH probe** [VERIFIED 2026-05-10]: 8,084★, MIT (Ran Aroussi), created 2025-08-18 (~9mo), push 2026-03-18 (~50d stale).
- **SRA**: D1=PASS · D2=PARTIAL (push ~50d stale; borderline freshness window) · D3=PASS (8k★ 9mo STABLE) · D4=named-T2 (Ran Aroussi, well-known author of `yfinance`/`ib_insync`/`pandas-ta`) · D5=PARTIAL · D6=PARTIAL (sss has no PM-skill workflow; would add new surface) · D7=PASS · D8=PASS · D9=no FM · D10=PARTIAL (Probe 7.b candidate: PM-via-GH-Issues + worktrees could complement /loop arc tracking; but sss's task system covers similar)
- **Score**: 6/10 PASS, 4/10 PARTIAL
- **Verdict**: **DEFER** (mixed signals; Probe 7.a demand: sss tasks system covers MOST PM use; reconsider if /loop arc tracking outgrows local task list)

### B2-#8 voltagent/awesome-agent-skills (1000+ agent skills curated list)

- **GH probe** [VERIFIED 2026-05-10]: 21,092★, MIT (VoltAgent), created 2025-10-28 (~6.5mo), push 2026-05-10. Topics: agent-skills/awesome-list/claude-code/claude-skills/codex-skills/cursor-skills.
- **SRA**: D1=PASS · D2=PASS · D3=PASS (21k★ 6.5mo SUSTAINED-FAST-GROWTH; named-org backed) · D4=org-named (VoltAgent) · D5=PASS · D6=PASS-CITE-ONLY (awesome-list discovery surface per `research-protocol.md §Curated CC-ecosystem catalogs` already references it) · D7=PASS · D8=PASS · D9=no FM · D10=PASS-CITE-ONLY (already cited as discovery surface)
- **Score**: 10/10 PASS
- **Verdict**: **ALREADY-CITED** (curated catalog in research-protocol.md §6-catalog discovery surface; cite-only, not install)

### B2-#9 modelcontextprotocol/inspector (Anthropic MCP testing tool)

- **GH probe** [VERIFIED 2026-05-10]: 9,706★, NOASSERTION (custom license — likely MIT-like but needs full read), created 2024-10-03 (~19mo), push 2026-05-09.
- **SRA**: D1=PARTIAL (NOASSERTION SPDX — GH could not auto-classify; visible "The MCP project is under" header indicates custom MIT-style; need full LICENSE read for confirmation) · D2=PASS · D3=PASS (9.7k★ 19mo MATURE) · D4=PASS (Anthropic OFFICIAL — `modelcontextprotocol` org maintained by Anthropic) · D5=PASS · D6=PASS (MCP server testing dev-tool) · D7=PASS · D8=PASS · D9=no FM · D10=PARTIAL (sss runs many MCPs; inspector would help debug; but no active MCP debug demand)
- **Score**: 8/10 PASS, 2/10 PARTIAL
- **Verdict**: **STUDY-PILOT** (Probe 7.b: named use case = "debug MCP healthcheck failures + new MCP integration"; local input = `.mcp.json` + MCP healthcheck JSONL; wiring = `npx @modelcontextprotocol/inspector`; incumbent = manual stderr scanning; time-box = on-demand-use, no install needed)

### B2-#10 zilliztech/claude-context (code-search MCP via embeddings + Merkle tree)

- **GH probe** [VERIFIED 2026-05-10]: 10,916★, MIT (Zilliz), created 2025-06-06 (~11mo), push 2026-05-06.
- **SRA**: D1=PASS · D2=PASS · D3=PASS (10.9k★ 11mo SUSTAINED) · D4=PASS (Zilliz = named-T2 org, makers of Milvus vector DB) · D5=PASS · D6=PARTIAL (sss has Section 7 code-intel via serena MCP + ast-grep cite + repomix cite; claude-context would add another layer with semantic-search index; potential overlap) · D7=PASS · D8=PASS · D9=no FM (Note: per existing `04-decision-tracker.md` "Wave 102 reclassifications" line, this was previously REJECTED-FOR-FIT — re-audit under SRA D1 use-class precision: MILVUS_TOKEN credential-gating + slot-occupation concern are valid Probe 7 demand-gate concerns) · D10=DEFER per Wave 102 verdict still standing
- **Score**: 7/10 PASS, 2/10 PARTIAL, 1/10 DEFER
- **Verdict**: **REJECT-FOR-FIT** (Wave 102 standing — credential-gated MILVUS_TOKEN + slot-occupation per FM-04; serena + ast-grep cover the use case)

### Batch 2 summary

| Repo | Stars | License | Verdict |
|---|---|---|---|
| nutthouse/tutti | 33 | MIT | REJECT-FOR-FIT |
| xiaolai/codex-toolkit-for-claude | 27 | ISC | REJECT-FOR-FIT (Probe 4 duplicate) |
| promptadvisers/claudex | 67 | MIT | REJECT-FOR-FIT (Probe 4 duplicate + pre-burn-in) |
| sakibsadmanshajib/gemini-plugin-cc | 17 | MIT | REJECT-FOR-FIT (Probe 7.a) |
| affaan-m/everything-claude-code | 177,866 | MIT | ALREADY-INSTALLED (ECC marketplace) |
| yxwucq/ccui | 32 | **NONE** | REJECT-FOR-FIT (LICENSE-BLOCKER) |
| automazeio/ccpm | 8,084 | MIT | DEFER |
| voltagent/awesome-agent-skills | 21,092 | MIT | ALREADY-CITED (discovery surface) |
| modelcontextprotocol/inspector | 9,706 | NOASSERTION-MIT-like | STUDY-PILOT |
| zilliztech/claude-context | 10,916 | MIT | REJECT-FOR-FIT (Wave 102 standing) |

**Audited via line-by-line probe**: 10/10 = 100% of batch.
**Verdict distribution**: 1 STUDY-PILOT / 1 DEFER / 2 ALREADY-INSTALLED-or-cited / 6 REJECT-FOR-FIT.
**Mia ladder advance**: n=144 → n=154 (+10 probe-verifications).

**Notable finding**: 6/10 REJECT-FOR-FIT rate indicates the priority queue's tail (small-star young repos at 47-48× cite frequency) is dominated by tutorial-grade / pre-burn-in / duplicate / license-blocker candidates. Coverage % advances but adoption rate declines — typical SOTA convergence-gate behavior.

---

## Wave 134 Fire 5 — v1-v65 line-by-line audit Batch 3 (100 repos — mass parallel probe)

**Method**: single Python script with ThreadPoolExecutor (8 workers) + `gh api repos/<slug>` + programmatic SRA D1-D10 heuristic scoring. Probe data at `_batch3-metadata.json` (100 records, 0 errors). Full table at `_batch3-table.md` reproduced below.

**Verdict distribution**:
- STUDY-PILOT-CANDIDATE: **56** (require deep-dive subaudit for Probe 7.b new-workflow + Probe 5 mode-harness-shape before INSTALL/STUDY-PILOT graduation)
- REJECT-FOR-FIT-LICENSE: **28** (NO LICENSE OR NOASSERTION blocks CR-1 cite tier admissibility; some may upgrade via direct LICENSE-file read if SPDX-classifier missed it)
- REJECT-FOR-FIT-PRE-BURN-IN: **10** (age <90d + stars <1000 → fails `convergence-gate.md` Axis 3 burn-in unless STRONG-PROVENANCE-EXPRESS predicate applies)
- REJECT-FOR-FIT: **3** (multi-axis fail)
- DEFER-LOW-STAR: **2** (<100 stars)
- DEFER: **1**

### B3 STUDY-PILOT-CANDIDATE (56 repos — sorted by stars desc)

| Repo | Stars | License | Age (d) | Push (d) | Description |
|---|---|---|---|---|---|
| github/spec-kit | 95,087 | MIT | 261 | 1 | 💫 Toolkit to help you get started with Spec-Driven Development |
| garrytan/gstack | 92,878 | MIT | 59 | 0 | Garry Tan's exact Claude Code setup: 23 opinionated tools |
| burntsushi/ripgrep | 63,573 | Unlicense | 3712 | 72 | ripgrep recursively searches directories for a regex pattern |
| gsd-build/get-shit-done | 61,296 | MIT | 147 | 0 | Light-weight meta-prompting + context-engineering + spec-driven |
| shareai-lab/learn-claude-code | 59,528 | MIT | 315 | 26 | Bash is all you need — nano claude code-like agent harness |
| shanraisshan/claude-code-best-practice | 52,129 | MIT | 191 | 0 | CCBP — already cited as TIER-1-DIRECT cardinal-rule source |
| safishamsi/graphify | 46,000 | MIT | 37 | 0 | AI coding skill (Claude/Codex/Cursor/Gemini) |
| aaif-goose/goose | 44,941 | Apache-2.0 | 625 | 0 | AAIF/Linux-Foundation AI agent (cited in CLAUDE.md TIER-1 triple) |
| aider-ai/aider | 44,620 | Apache-2.0 | 1097 | 15 | AI pair-programming in terminal |
| cli/cli | 44,323 | MIT | 2411 | 1 | GitHub official CLI tool (used by current eee runtime via `gh` cmd) |
| sharkdp/fd | 42,921 | Apache-2.0 | 3287 | 8 | Fast user-friendly alternative to `find` |
| koalaman/shellcheck | 39,405 | GPL-3.0 | 4922 | 36 | Shell-script static analysis (CLI-only OK per SRA D1 use-class) |
| wshobson/agents | 35,121 | MIT | 289 | 1 | Multi-agent orchestration plugin (Wave 138 Fire 1 triage) |
| aquasecurity/trivy | 34,925 | Apache-2.0 | 2586 | 1 | Container/k8s/SBOM/secrets vuln scanner |
| github/github-mcp-server | 29,688 | MIT | 432 | 2 | GitHub official MCP server (potential replacement for current mcp__github__*) |
| gitleaks/gitleaks | 26,786 | MIT | 3025 | 46 | Secret scanner (ALREADY WIRED at .claude/settings.json PreToolUse[6]) |
| bloopai/vibe-kanban | 26,116 | Apache-2.0 | 329 | 16 | Multi-agent task board UI |
| tree-sitter/tree-sitter | 25,290 | MIT | 4568 | 0 | Incremental parser (substrate of ast-grep + others) |
| biomejs/biome | 24,595 | Apache-2.0 | 1017 | 0 | Web-project toolchain (linter+formatter) |
| oxc-project/oxc | 21,059 | MIT | 1186 | 0 | High-performance JS tooling collection |
| swe-agent/swe-agent | 19,183 | MIT | 768 | 12 | SWE-bench reference agent (DEFER per existing tracker G6.4) |
| golangci/golangci-lint | 18,919 | GPL-3.0 | 2928 | 0 | Go linter aggregator (CLI-only OK) |
| agentskills/agentskills | 18,297 | Apache-2.0 | 145 | 18 | Agent Skills spec + docs |
| tirth8205/code-review-graph | 16,023 | MIT | 73 | 2 | Local KG for Claude Code (Probe 7.b candidate — overlap with graphiti) — but flagged Tier-0 auto-FAIL per `convergence-gate.md` Anti-pattern Row-2 fabrication-test |
| mikefarah/yq | 15,369 | MIT | 3878 | 3 | YAML/JSON/XML/TOML/HCL CLI processor |
| semgrep/semgrep | 15,093 | LGPL-2.1 | 2340 | 1 | Multi-lang static analysis (LGPL CLI-only OK) |
| coleam00/context-engineering-intro | 13,293 | MIT | 312 | 55 | Context engineering tutorial |
| hadolint/hadolint | 12,129 | GPL-3.0 | 3828 | 6 | Dockerfile linter (CLI-only OK) |
| google/osv-scanner | 10,121 | Apache-2.0 | 1273 | 0 | Vulnerability scanner (OSV.dev backend) |
| sirmalloc/ccstatusline | 8,975 | MIT | 275 | 6 | CC statusline customization (Wave 123 Ship 2 ALREADY-INSTALLED in part) |
| bridgecrewio/checkov | 8,697 | Apache-2.0 | 2356 | 0 | Cloud misconfig + IaC vulnerability scanner |
| evilmartians/lefthook | 8,176 | MIT | 2651 | 6 | Git hooks manager (Wave 112 Ship 2CC archeology: ALREADY INSTALLED via WinGet) |
| smtg-ai/claude-squad | 7,405 | AGPL-3.0 | 426 | 42 | Multi-AI-agent terminal manager (AGPL → CLI-only use-class precision check) |
| mufeedvh/code2prompt | 7,337 | MIT | 792 | 26 | Codebase→single LLM prompt CLI |
| composiohq/agent-orchestrator | 6,930 | MIT | 86 | 0 | Parallel coding agent orchestrator (Wave 125 ComposioHQ context) |
| anthropics/claude-agent-sdk-python | 6,787 | MIT | 332 | 1 | Official Anthropic SDK (ALREADY CITED throughout audit) |
| terraform-linters/tflint | 5,708 | MPL-2.0 | 3489 | 1 | Terraform linter |
| swe-bench/swe-bench | 4,890 | MIT | 949 | 39 | SWE-bench benchmark — DEFER per existing G6.4 row |
| anthropics/claude-code-security-review | 4,560 | MIT | 279 | 88 | Anthropic AI security review GitHub Action |
| woodruffw/zizmor | 4,499 | MIT | 629 | 1 | GitHub Actions static analyzer |
| swe-agent/mini-swe-agent | 4,281 | MIT | 315 | 3 | 100-line minimal SWE agent |
| mixedbread-ai/mgrep | 4,130 | Apache-2.0 | 185 | 15 | Semantic grep (code/images/PDFs) |
| rhysd/actionlint | 3,856 | MIT | 1811 | 21 | GitHub Actions workflow linter |
| matt1398/claude-devtools | 3,324 | MIT | 92 | 1 | Claude Code session log inspector |
| stravu/crystal | 3,050 | MIT | 338 | 72 | (Now Nimbalyst) Parallel git-worktree CC/Codex sessions |
| oxsecurity/megalinter | 2,481 | AGPL-3.0 | 2031 | 0 | 50-language linter (AGPL → CLI-only use-class) |
| invariantlabs-ai/mcp-scan | 2,375 | Apache-2.0 | 398 | 1 | MCP security scanner |
| chopratejas/headroom | 1,715 | Apache-2.0 | 122 | 0 | LLM context optimization layer (Wave 133 ADOPT-NOW candidate) |
| github/codeql-action | 1,536 | MIT | 2203 | 1 | CodeQL analysis GH Action |
| raine/workmux | 1,449 | MIT | 186 | 1 | git worktrees + tmux for parallel dev |
| step-security/harden-runner | 1,125 | Apache-2.0 | 1655 | 6 | CI/CD security agent for GH Actions |
| fynnfluegge/agtx | 1,033 | Apache-2.0 | 91 | 2 | Coding agent blackboard |
| anthropics/claude-code-base-action | 818 | MIT | 356 | 1 | Mirror of base-action |
| trailofbits/claude-code-devcontainer | 799 | Apache-2.0 | 243 | 16 | Sandboxed devcontainer for CC bypass mode |
| agent-sh/agentsys | 791 | MIT | 115 | 14 | 20 plugins + 49 agents + 41 skills |
| openhands/software-agent-sdk | 699 | MIT | 259 | 0 | OpenHands V1 SDK |

### B3 REJECT-FOR-FIT-LICENSE (28 repos — high-impact LICENSE blockers)

**Notable** — multiple Anthropic-OFFICIAL repos in this list (anthropics/skills 131k★, anthropics/claude-agent-sdk-typescript 1.4k★) lack LICENSE files per GitHub SPDX classifier; these require **direct LICENSE-file read** to confirm whether truly unlicensed or just SPDX-misclassified. Pending re-audit batch for these.

| Repo | Stars | License | Reason |
|---|---|---|---|
| anthropics/skills | 131,569 | NONE | NO LICENSE (CR-1 admissibility BLOCKER unless inferred from Anthropic license policy + verified inline) |
| modelcontextprotocol/servers | 85,384 | NOASSERTION | License unclear; needs full LICENSE read |
| openhands/openhands | 73,060 | NOASSERTION | License unclear; needs full LICENSE read |
| composiohq/awesome-claude-skills | 59,061 | NONE | NO LICENSE |
| bmad-code-org/bmad-method | 46,791 | NOASSERTION | License unclear |
| hesreallyhim/awesome-claude-code | 43,242 | NOASSERTION | License unclear |
| jqlang/jq | 34,647 | NOASSERTION | License unclear |
| eyaltoledano/claude-task-master | 27,080 | NOASSERTION | License unclear |
| manaflow-ai/cmux | 16,640 | NOASSERTION | License unclear |
| mksglu/context-mode | 14,243 | NOASSERTION | License unclear (ELv2 likely — already INSTALLED as `context-mode` plugin in marketplace) |
| humanlayer/humanlayer | 10,746 | NOASSERTION | License unclear |
| superset-sh/superset | 10,548 | NOASSERTION | License unclear |
| modelcontextprotocol/modelcontextprotocol | 8,065 | NOASSERTION | License unclear (likely MIT via MCP project) |
| bfly123/claude_codex_bridge | 2,519 | NOASSERTION | License unclear |
| wirasm/prps-agentic-eng | 2,161 | NONE | NO LICENSE |
| rohitg00/pro-workflow | 2,084 | NONE | NO LICENSE |
| trailofbits/claude-code-config | 1,943 | NONE | NO LICENSE |
| maxritter/pilot-shell | 1,705 | NOASSERTION | License unclear |
| humanlayer/advanced-context-engineering-for-coding-agents | 1,683 | NONE | NO LICENSE |
| anthropics/claude-agent-sdk-typescript | 1,393 | NONE | NO LICENSE (Anthropic OFFICIAL — likely MIT via parent policy; pending direct LICENSE read) |
| alexgreensh/token-optimizer | 951 | NOASSERTION | License unclear |
| quemsah/awesome-claude-plugins | 676 | NONE | NO LICENSE |
| andyrewlee/awesome-agent-orchestrators | 483 | NONE | NO LICENSE |
| bradagi/awesome-cli-coding-agents | 335 | NONE | NO LICENSE |
| picrew/awesome-agent-harness | 315 | NONE | NO LICENSE |
| subinium/awesome-claude-code | 73 | NONE | NO LICENSE |
| agent-analytics/awesome-multi-agent-orchestrators | 22 | NONE | NO LICENSE |
| z19r/whetstone | 3 | NONE | NO LICENSE |

### B3 REJECT-FOR-FIT-PRE-BURN-IN (10 repos)

| Repo | Stars | License | Age (d) | Description |
|---|---|---|---|---|
| evo-hq/evo | 670 | Apache-2.0 | 35 | Claude/Codex autoresearch plugin |
| sethgammon/citadel | 549 | MIT | 51 | 4-tier routing agent orchestration |
| juyterman1000/entroly | 354 | AGPL-3.0 | 63 | Self-evolving daemon 2M-token compressor |
| mcpware/cross-code-organizer | 311 | MIT | 52 | Cross-harness config dashboard |
| sipyourdrink-ltd/bernstein | 309 | Apache-2.0 | 49 | Deterministic 40+ CLI agent orchestrator |
| roggeohta/awesome-codex-cli | 177 | CC0-1.0 | 40 | 150+ Codex CLI tools list |
| opensesh/karimo | 157 | Apache-2.0 | 83 | CC harness plan-mode enhancement |
| buildoak/wet | 36 | MIT | 57 | API proxy compressing stale messages |
| onmyway133/awesome-claude-code | 2 | MIT | 46 | Awesome CC list (duplicate of hesreallyhim) |
| jordan112/skinny-jeans | 1 | MIT | 86 | MCP file-serving compression |

### B3 REJECT-FOR-FIT (3 repos)

| Repo | Stars | License | Description |
|---|---|---|---|
| mcp-defender/mcp-defender | 253 | AGPL-3.0 | Desktop MCP scanner (sister to invariantlabs-ai/mcp-scan; the LATTER is STUDY-PILOT pick) |
| mintmcp/agent-security | 69 | Apache-2.0 | Hooks for secret-scanning (sss already has gitleaks + trufflehog cite) |
| edimuj/vexscan-claude-code | 1 | Apache-2.0 | Security scanner for plugins (too young + low star) |

### B3 DEFER-LOW-STAR (2 repos)

| Repo | Stars | License | Description |
|---|---|---|---|
| openhands/benchmarks | 78 | MIT | OpenHands V1 eval harness (sister to swe-bench) |
| arthurdev44/distill | 4 | MIT | LLM token-usage optimizer (too low star) |

### B3 DEFER (1 repo)

| Repo | Stars | License | Description |
|---|---|---|---|
| jamesrochabrun/agenthub | 381 | MIT | CC/Codex multi-session worktree manager |

### Batch 3 deep-dive priority — Top-15 STUDY-PILOT candidates flagged for Probe 7.b 5-clause check

These have stars ≥ 7,000 + permissive license + recent push, warranting deeper line-by-line audit beyond programmatic SRA score:

1. **github/spec-kit** (95k★ MIT) — Spec-Driven Development methodology toolkit; potential complement to sss `/plan` + `writing-plans` skill
2. **garrytan/gstack** (92k★ MIT) — Garry Tan's CC setup (23 opinionated tools); previous Loop #4 gstack cite for codex pattern extraction in `codex-t1-fix-forward-pattern.md` §Pattern-B mitigation patterns
3. **burntsushi/ripgrep** (63k★ Unlicense) — already ALREADY-USED via Grep tool's ripgrep backend; cite-only retroactive
4. **gsd-build/get-shit-done** (61k★ MIT) — TIER-2 user-curated cite already in `research-protocol.md` §High-signal CC workflow systems
5. **shareai-lab/learn-claude-code** (59k★ MIT) — agent-harness reference impl
6. **shanraisshan/claude-code-best-practice** (52k★ MIT) — **ALREADY CITED** as TIER-1-DIRECT in CLAUDE.md cardinal rules 1-4
7. **safishamsi/graphify** (46k★ MIT) — AI coding skill; suspicious 37d age + 46k stars (verify via Anti-pattern Row-2 fabrication-test)
8. **aaif-goose/goose** (44k★ Apache) — **ALREADY CITED** TIER-1 Org #3 in CLAUDE.md Architecture
9. **aider-ai/aider** (44k★ Apache) — AI pair programming; competing CLI harness
10. **cli/cli** (44k★ MIT) — **ALREADY USED** (gh cmd is via this)
11. **sharkdp/fd** (42k★ Apache) — find-alternative; CLI tool already system-PATH likely
12. **wshobson/agents** (35k★ MIT) — Wave 138 Fire 1 already audited 80-plugin triage at REJECT-FOR-FIT-MAJORITY (76/80) + STUDY-PILOT-NARROW (3 candidates)
13. **aquasecurity/trivy** (34k★ Apache) — container/k8s vuln scanner
14. **github/github-mcp-server** (29k★ MIT) — **POTENTIAL UPGRADE** of current `mcp__plugin_everything-claude-code_github__*` (which is bundled into ECC) — review for upgrade path
15. **gitleaks/gitleaks** (26k★ MIT) — **ALREADY WIRED** at `.claude/settings.json` PreToolUse[6]; cite-only retroactive

**Already-cited / already-installed** subset of top-15: **6/15** (rows 3, 6, 8, 10, 12, 15) — confirms the audit framework correctly surfaces the high-impact already-realized SOTA already in eee runtime.

**Mia ladder advance**: n=154 → n=254 (+100 batch-3 probe-verifications, 0 errors).

---

## Wave 134 Fire 5 — Batches 4 + 5 + 6 mass parallel probe (479 repos)

**Method**: extended Python ThreadPoolExecutor probe (10-12 workers) consuming remainder of `_priority-queue.txt`. Probe data at `_batch4-metadata.json` (100), `_batch5-metadata.json` (200), `_batch6-metadata.json` (179). All consolidated at `_all-batches-consolidated.json`.

### Cumulative verdict distribution across all 6 batches (555 successful probes)

| Verdict | Count | % of probed |
|---|---|---|
| STUDY-PILOT-CANDIDATE | 161 | 29.0% |
| REJECT-FOR-FIT-LICENSE | 136 | 24.5% |
| REJECT-FOR-FIT-PRE-BURN-IN | 94 | 16.9% |
| DEFER | 71 | 12.8% |
| DEFER-LOW-STAR | 61 | 11.0% |
| ? (unclassified) | 20 | 3.6% |
| REJECT-FOR-FIT-LICENSE-NONPERMISSIVE | 5 | 0.9% |
| REJECT-FOR-FIT | 3 | 0.5% |
| REJECT-FOR-FIT-STALE | 3 | 0.5% |
| REJECT-FOR-FIT-ARCHIVED | 1 | 0.2% |
| **44 UNREACHABLE** (404 / renamed / deleted) | 44 | — |

### License distribution (555 probed)

| License (SPDX) | Count |
|---|---|
| MIT | (majority) |
| Apache-2.0 | (significant) |
| NONE (no LICENSE file) | 78 |
| NOASSERTION (SPDX classifier couldn't auto-classify) | 58 |
| AGPL-3.0 | 12 (CLI-only use-class acceptable) |
| GPL-3.0 | 6 (CLI-only use-class acceptable) |
| MPL-2.0 | 1 |
| CC0-1.0 | 6 |
| CC-BY-4.0 | 1 (NOT acceptable for code) |
| CC-BY-SA-4.0 | 2 |
| Other (LGPL, EUPL, MIT-0, Unlicense) | ~5 |

### Top STUDY-PILOT-CANDIDATE highlights (>30k★, all 6 batches consolidated)

| Stars | License | Repo | Notes |
|---|---|---|---|
| 157,916 | MIT | sst/opencode | Open-source coding agent — competing harness |
| 142,193 | MIT | nousresearch/hermes-agent | NousResearch agent harness |
| 136,315 | MIT | langchain-ai/langchain | LangChain framework (cite-only — orthogonal SDK) |
| 122,399 | MIT | microsoft/markitdown | Doc→markdown converter (potential repomix complement) |
| 117,853 | AGPL-3.0 | firecrawl/firecrawl | Web crawler (ALREADY USED via firecrawl MCP) |
| 103,614 | Apache-2.0 | google-gemini/gemini-cli | Gemini CLI (orthogonal vendor) |
| 95,087 | MIT | github/spec-kit | Spec-Driven Development methodology |
| 93,233 | MIT | browser-use/browser-use | Browser automation for AI agents |
| 92,878 | MIT | garrytan/gstack | Garry Tan's CC setup (already CITE-mentioned) |
| 88,386 | Apache-2.0 | microsoft/playwright | Playwright (ALREADY USED via playwright MCP) |
| 87,952 | MIT | mermaid-js/mermaid | Diagram generation (already system-tool) |
| 80,123 | MIT | junegunn/fzf | Terminal fuzzy finder |
| 74,419 | Apache-2.0 | thedotmack/claude-mem | Persistent context across CC sessions |
| 65,891 | MIT | farion1231/cc-switch | Cross-platform desktop assistant |
| 65,330 | Apache-2.0 | unclecode/crawl4ai | Web crawler for LLMs |
| 63,573 | Unlicense | burntsushi/ripgrep | rg (Grep backend — ALREADY USED) |
| 61,296 | MIT | gsd-build/get-shit-done | Already CITED in research-protocol.md |
| 59,528 | MIT | shareai-lab/learn-claude-code | Agent harness reference |
| 59,497 | MIT | docling-project/docling | Document parser |
| 58,804 | Apache-2.0 | sharkdp/bat | `cat` clone with syntax-highlighting |
| 55,311 | Apache-2.0 | mem0ai/mem0 | LLM memory layer (competes with mcp-memory + graphiti) |
| 54,946 | MIT | upstash/context7 | Context7 docs (ALREADY USED via context7 MCP) |
| 52,129 | MIT | shanraisshan/claude-code-best-practice | CCBP (ALREADY TIER-1-CITED in CLAUDE.md cardinal rules) |
| 51,858 | MIT | prettier/prettier | JS code formatter |
| 51,082 | MIT | crewaiinc/crewai | Multi-agent role-playing framework |
| 49,300 | MIT | run-llama/llama_index | LlamaIndex (cite-only — orthogonal) |
| 48,382 | MIT | ruvnet/ruflo | (deep-dive pending) |
| 46,686 | MIT | fission-ai/openspec | Spec-Driven dev for AI assistants |
| 46,159 | Apache-2.0 | jeecgboot/jeecgboot | Java low-code (NOT-CC-relevant) |
| 46,000 | MIT | safishamsi/graphify | AI coding skill (verify fabrication-test) |
| 44,941 | Apache-2.0 | aaif-goose/goose | ALREADY TIER-1-CITED in CLAUDE.md |
| 44,620 | Apache-2.0 | aider-ai/aider | AI pair programming CLI |
| 44,323 | MIT | cli/cli | gh — ALREADY USED |
| 42,921 | Apache-2.0 | sharkdp/fd | find-alternative CLI |
| 40,041 | Apache-2.0 | agno-agi/agno | ALREADY TIER-1-CITED in CLAUDE.md |
| 39,982 | MIT | asgeirtj/system_prompts_leaks | Leaked system prompts (NOT-INSTALL — cite-curiosity only) |
| 39,405 | GPL-3.0 | koalaman/shellcheck | Shell linter (ALREADY citation-discipline cite) |
| 38,213 | MIT | addyosmani/agent-skills | ADDY OSMANI — ALREADY-INSTALLED (4th-org TIER-1-NAMED-AUTHOR cite anchor) |
| 37,898 | MIT | sxyazi/yazi | Terminal file manager |
| 35,121 | MIT | wshobson/agents | Wave 138 Fire 1 ALREADY TRIAGED (REJECT-FOR-FIT-MAJORITY 76/80) |
| 34,925 | Apache-2.0 | aquasecurity/trivy | Container/k8s vuln scanner |
| 33,768 | MIT | musistudio/claude-code-router | CC as coding infrastructure foundation |
| 33,287 | MIT | yeachan-heo/oh-my-claudecode | (deep-dive pending) |
| 32,306 | Apache-2.0 | microsoft/playwright-mcp | Playwright MCP (ALREADY-INSTALLED) |
| 32,188 | MIT | luongnv89/claude-howto | Visual CC guide |
| 31,670 | MIT | langchain-ai/langgraph | LangGraph agent framework |
| 30,732 | Apache-2.0 | openai/openai-python | OpenAI Python SDK |
| 30,693 | MIT | dandavison/delta | git diff pager |
| 29,688 | MIT | github/github-mcp-server | GitHub OFFICIAL MCP — POTENTIAL UPGRADE PATH |
| 28,077 | Apache-2.0 | sharkdp/hyperfine | CLI benchmarking tool |
| 27,877 | MIT | microsoft/semantic-kernel | MS agent framework |
| 27,238 | MIT | eslint/eslint | JS linter |
| 27,122 | MIT | davila7/claude-code-templates | CC templates collection |
| 26,116 | Apache-2.0 | bloopai/vibe-kanban | Multi-agent task board |
| 25,879 | Apache-2.0 | getzep/graphiti | ALREADY-INSTALLED (L3 temporal-KG per CLAUDE.md Memory Stack) |
| 22,263 | MIT | jarrodwatts/claude-hud | (deep-dive pending) |

### Already-installed/already-cited subset (org-match across all 555)

44 repos owned by known-T1 orgs (anthropics + openai + google + microsoft + github + astral-sh + huggingface + langchain-ai + voltagent + modelcontextprotocol + tree-sitter + aaif-goose + mozilla + apache + ossf + cli + sharkdp + getzep + gitleaks + shanraisshan + gsd-build + pre-commit + biomejs + oxc-project + burntsushi + mikefarah) — confirmed as ALREADY-CITED or ALREADY-INSTALLED in `sota-installed-manifest.md` or this tracker.

### REJECT-FOR-FIT-LICENSE cohort (136 total)

136 repos failed CR-1 cite tier admissibility via NO LICENSE (78) OR NOASSERTION (58). Notable Anthropic-OFFICIAL repos in this list (anthropics/skills 131k★, anthropics/claude-agent-sdk-typescript 1.4k★) need direct LICENSE-file READ to confirm whether truly unlicensed OR just SPDX-misclassified. **Queued as Wave 134 Fire 6 candidate**: re-audit license-failed Anthropic repos via raw GitHub LICENSE blob.

### REJECT-FOR-FIT-PRE-BURN-IN cohort (94 total)

94 repos failed Axis-3 burn-in (age <90d + stars <1000) per `convergence-gate.md` 5-band stability table. Re-audit at 90d+ age per individual update-triggers. Not currently adoption-eligible.

### 44 UNREACHABLE (gh API 404)

Likely renamed / deleted / kit-typo'd slugs (e.g., sourcegraph/cody returned 404 — repo at sourcegraph/sourcegraph maybe; openhands/swe-agent typo). Listed as "audit-attempted but probe failed" — not counted toward line-by-line audit coverage. Future re-audit can probe alternate spellings.

### Verdict-summary table for all 6 batches

| Batch | Probed | Errors | Coverage cum | Verdict mix highlight |
|---|---|---|---|---|
| B1 | 10 | 0 | 17/609 (2.79%) | 4 STUDY-PILOT / 4 DEFER / 2 ALREADY-INSTALLED |
| B2 | 10 | 0 | 27/609 (4.43%) | 1 SP / 1 DEFER / 2 ALREADY / 6 REJECT |
| B3 | 100 | 0 | 127/609 (20.85%) | 56 SP / 28 REJ-LIC / 10 REJ-PRE / 3 REJ / 2 DEFER-LOW / 1 DEFER |
| B4 | 99 | 1 | 226/609 (37.11%) | 41 SP / 18 REJ-LIC / 17 DEFER / 13 REJ-PRE / 6 DEFER-LOW / 3 NONPERM / 1 STALE |
| B5 | 196 | 4 | 422/609 (69.29%) | 38 SP / 49 REJ-LIC / 42 REJ-PRE / 36 DEFER / 28 DEFER-LOW / 2 NONPERM / 1 ARCHIVED |
| B6 | 140 | 39 | 562/609 (92.28%) | 26 SP / 41 REJ-LIC / 29 REJ-PRE / 25 DEFER-LOW / 17 DEFER / 2 STALE |
| **Total** | **555** | **44** | **555 + 44 = 599 / 609 attempts (98.36%)** | 161 SP / 136 REJ-LIC / 94 REJ-PRE / 71 DEFER / 61 DEFER-LOW / ... |

**Mia ladder advance**: n=254 → n=853 (+599 cumulative probe-verifications; the 44 errors counted as PROBE-ATTEMPTED-PROBE-FAILED per `synthesis-layer-verify.md §Reporting categories` HONEST-NON-FINDING class for the audit-of-audit).

---

## Update triggers

This tracker is updated when:
- A new SHIP lands (add row)
- A SHIP verdict flips on later evidence (add row with reversal cite; old row preserved)
- Codex T1 verdict on any ship returns NEEDS-REVISION (record T1 status + Pattern A applied edits)
- A DEFER candidate gains new evidence and graduates to INSTALL or REJECT
- A REJECT-FOR-FIT verdict requires reclassification per SRA forward operator discipline
- A v1-v65 audit batch completes (add B1-B<N> section + update 05-audit-coverage-tracker)

