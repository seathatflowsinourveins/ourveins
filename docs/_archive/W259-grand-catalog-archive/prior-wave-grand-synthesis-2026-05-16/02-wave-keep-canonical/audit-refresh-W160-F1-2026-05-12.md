# SOTA-cleanliness audit refresh — Wave 160 Fire 1 (2026-05-12)

> **Status**: **STAND-IN-DRAFT** — Fire 1 deliverable of 12-fire mega-wave per `.claude/plans/fluttering-wandering-pond.md` (approved 2026-05-12 post-codification-fire close). **NOT AUTHORITATIVE** for downstream Fires 2-10 ship decisions. AUTHORITATIVE label deferred to Fire 11 convergence ship after cross-model gate completes per `codex-t1-fix-forward-pattern.md` Pattern A fix-forward on T3 `c0c0d8b7` NEEDS-ATTENTION conf=0.86 medium F-001 finding (verbatim recommendation: "downgrade the status to a non-authoritative draft/stand-in artifact that explicitly cannot drive follow-on fires").
>
> **Downstream-consumer contract**: Fires 2-10 MAY use this document for **gap-identification + direction-of-travel signal ONLY**. They MUST NOT treat this audit's gap ordering or % figure as canonical until Fire 11 cross-model gate landing produces a non-STAND-IN successor artifact. Fire 12 audit % re-computation supersedes this document's % figure.
>
> **Cite class** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
> `constituents=[TIER-1-DIRECT @ docs/sota-installed-manifest.md L33-46 (W146-F3 weight table — file-resident SOTA discipline), TIER-1-DIRECT @ Z:/claude-sota/.claude/rules/audit-action-loop.md (Wire/Surface/Close/Re-fire pattern), TIER-3-LOCAL-OPERATOR-DERIVED @ orchestrator-direct probe 2026-05-12]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.
>
> **STAND-IN-NOTICE** (per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`): Fire 1 Phase 1 explore-agent dispatch FAILED systemically (Agents `a94cb3f9d5d1058a7` + `a2ae242038457a2d4` both FM-17.502 provider 502 unknown-provider on claude-haiku-4-5, 0 tokens / 0 tool_uses / 175-181s duration). Pivoted to **orchestrator-direct Path P analog** per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17` recovery. Cross-model gate satisfaction status: PARTIAL — orchestrator-direct bounded read-only probes; Fire 11 convergence ship MUST satisfy CR-3 cross-model gate at that fire's commit time.

---

## §1 Methodology

**Probe basis**: token-instance count via `grep -cE` across full `docs/sota-installed-manifest.md` (389.8K Sections 0-19+).

**W146-F3 weighted % formula** (verbatim per manifest L33-46 SOTA-cleanliness scoring table):

| Class | Weight | Verbatim from L36-46 |
|---|---:|---|
| `INSTALLED` / `INSTALLED-VIA-SYSTEM-PATH` / `INSTALLED-ACTIVE` (+`INSTALLED-AMBER-WIRED-ACTIVE` per W155 F13 extension) | +1.0 | "Fully clean" |
| `INSTALLED-DORMANT` (W146-F3 NEW) | +0.5 | "Cleaner than PLANNED; deferred to wire-activation" |
| `INSTALLED-AMBER` | +0.5 (W146-F3) / 0 (Agent A verbatim) | "Installed primitive with deferred P2/P3" |
| `INSTALLED-PARTIAL` | +0.5 (W146-F3) / 0 (Agent A verbatim) | "Upstream substrate exists but wiring contract incomplete" |
| `CITE-IMPORT-AMBER` | 0 | "non-clean until upstream-parity-promoted" |
| `STAGED` / `STAGED-PENDING` / `PLANNED` / `DEFERRED-PENDING-FIX` | 0 | "Identified but not installed" |
| `CITE-ONLY` | +1.0 (separate denominator) | "Research-only; no install artifact" |
| `REJECTED-POST-PROBE` / `HISTORICAL-MACHINE-EXCLUDED` / `DEPRECATED` | excluded | "Not counted in denominator" |

**Method-shift disclosure** (per W146-F3 mandate "Method-change disclosure: ... disclose as W146-F3 refinement when re-computing % under this method, NOT Agent A verbatim"):

This audit uses **token-instance count** (each verbatim status-token mention in the manifest body increments the count). Agent A's W146-F1 baseline used **row-level classification** (each manifest row → single status → single weight). The two methods are NOT directly comparable; a row mentioning "PLANNED → STAGED → INSTALLED-AMBER" transition trace counts 3 tokens here but 1 row in Agent A's method. Delta vs W146-F1 baseline therefore reflects METHOD-SHIFT not necessarily regression.

**Reproducibility predicate** (per W146-F3): same input manifest + same method → same output %. This audit's input = `docs/sota-installed-manifest.md` HEAD `7cb64a06` (post-Pattern-A-fix-forward); method = token-instance count + W146-F3 weights.

---

## §2 Token counts (2026-05-12 probe; verified via `grep -cE`)

| Class | Token | Count |
|---|---|---:|
| FULLY-CLEAN | `INSTALLED` | 143 |
| FULLY-CLEAN | `INSTALLED-VIA-SYSTEM-PATH` | 23 |
| FULLY-CLEAN | `INSTALLED-ACTIVE` | 14 |
| FULLY-CLEAN | `INSTALLED-AMBER-WIRED-ACTIVE` | 3 |
| **FULLY-CLEAN TOTAL** | | **183** |
| HALF-CLEAN | `INSTALLED-AMBER` | 17 |
| HALF-CLEAN | `INSTALLED-DORMANT` | 15 |
| HALF-CLEAN | `INSTALLED-PARTIAL` | 3 |
| **HALF-CLEAN TOTAL** | | **35** |
| NOT-CLEAN | `STAGED` | 25 |
| NOT-CLEAN | `STAGED-PENDING` | 8 |
| NOT-CLEAN | `PLANNED` | 78 |
| NOT-CLEAN | `CITE-IMPORT-AMBER` | 15 |
| NOT-CLEAN | `DEFERRED-PENDING-FIX` | 3 |
| **NOT-CLEAN TOTAL** | | **129** |
| SEPARATE-DENOM | `CITE-ONLY` | 58 |
| EXCLUDED | `REJECTED-POST-PROBE` | 4 |
| EXCLUDED | `HISTORICAL-MACHINE-EXCLUDED` | 5 |
| EXCLUDED | `DEPRECATED` | 2 |
| **EXCLUDED TOTAL** | | **11** |

---

## §3 W146-F3 weighted % computation

**Numerator (weighted clean)**: 
  - 183 × 1.0 (fully-clean) + 35 × 0.5 (half-clean) = **200.5**

**Denominator (install-class counted)**: 
  - 183 + 35 + 129 = **347**

**W146-F3 weighted % (install-class)**: 
  - 200.5 / 347 = **57.78%**

**Separate denominator (research-only)**: 
  - CITE-ONLY: 58/58 = **100%** (no install required by design)

**Excluded from denominator**: 11 tokens (REJECTED-POST-PROBE + HISTORICAL-MACHINE-EXCLUDED + DEPRECATED)

---

## §4 Comparison to W146-F1 Agent A baseline

| Metric | W146-F1 (Agent A row-level) | W160-F1 (token-instance) | Delta |
|---|---|---|---|
| SOTA-cleanliness % | 61% (band 55-65%) | 57.78% | -3.22 pp |
| Method | row-level classification | token-instance count | METHOD-SHIFT |
| Reproducibility | (Agent A's row classification snapshot) | this fire's grep output | both reproducible against same input |

**Honest interpretation** (per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`):

- HONEST-NON-FINDING: The 57.78% figure is APPROXIMATE under token-instance method. A true row-level audit equivalent to Agent A's W146-F1 method would require manual row-by-row classification of every status mention. This was not done in Fire 1.
- The -3.22 pp delta does NOT indicate regression. It reflects method-shift between token-instance counting (over-counts rows with status transitions in body prose) and row-level classification (1 row = 1 status).
- Direction-of-travel signal: the high `PLANNED` count (78) confirms that many rows have install-pending status. The high `INSTALLED` count (143) confirms substantial install completion. These two together suggest the manifest IS in active mid-execution state — consistent with the Wave 50-160 active /loop arc.

---

## §5 Per-section breakdown (sampled high-token sections)

Section-level analysis was not fully decomposed in Fire 1 (out-of-scope for bounded read-only probe). However, manifest section boundaries are documented:

- **Section 0** (Bootstrap, L50): 12 hand-coded files per CR-5 — mostly INSTALLED at HEAD
- **Section 1+2** (CC host + Codex backend, L71-79): TIER-1 official-org installs
- **Section 3** (Plugin marketplaces, L86): 11 marketplaces installed; 27 plugins enabled (21 active + 6 disabled per `.claude/settings.json:enabledPlugins`)
- **Section 17** (cwc-long-running-agents, L102): 5 primitives + 3 reference plugins (Wave 62 fire 6 native install at `Z:/claude-sota-installed/.local/cwc/`)
- **Section 13** (Hooks, L252): 29 hook scripts at `.claude/hooks/scripts/*.py`; per W155 F8-F13 several rows recently flipped to `INSTALLED-AMBER-WIRED-ACTIVE`
- **Section 14** (Subagent definitions, L264): 11 agents at `.claude/agents/`; sota-researcher UNTRACKED-AT-HEAD per W155 F12
- **Section 14.5** (cite-import-AMBER, L395): 6+ STAGED-PENDING-SHA-CAPTURE rows per Agent J HNF evidence (Wave 50 fire 9)
- **Section 17.5+** (NEW per Agent A): Eval / Benchmark / Observability axis was MISSING from baseline
- **Section 18** (Research Architecture, L578): NEW per cardinal-rule-10 user-trigger 2026-05-06
- **Section 19** (DEP-ONLY Repo Operationalization, L709): NEW per Wave 134 Fire 5 2026-05-12

Full section-level decomposition is queued for Fire 12 close-synthesis (post-Fires-2-11 ship).

---

## §6 Highest-leverage gaps identified for Fires 2-12

Based on Fire 1 audit + plan file analysis:

| Gap | Sub-fires | Estimated % delta contribution |
|---|---|---:|
| 2 OPEN HIGH-severity T3 findings (auth-flag + plugin manifest provenance) | Fire 2 | +2-3 pp (closes CR-7 Phase 2 blockers) |
| 6 rule files >40K chars + CLAUDE.md 60.9K | Fire 3 (5 sub-fires) + Fire 4 | +1-2 pp (performance) |
| 178 stale-marker mentions across 23/26 rules | Fire 5 (N sub-fires) | +3-5 pp (cleanup; PARENT-ATTRIBUTION preserved) |
| 1 absent SOTA repo (deepwiki-open MIT 16278★) | Fire 6 | +1 pp (install gap closure) |
| Plugin-namespace duplicate-functionality candidates | Fire 7 | +2-3 pp (KISS Must-Never #4) |
| ECC + CCBP line-by-line audit findings | Fire 8 | +3-5 pp (TIER-1-DIRECT cite-trail refresh) |
| Awesome-list top-K candidate extraction | Fire 9 | +1-2 pp (new install/cite candidates) |
| GitNexus integration depth audit | Fire 10 | +0-1 pp (read-only verify) |
| Cumulative convergence ship | Fire 11 | (closes cross-model gate) |

**Projected post-W160 SOTA-cleanliness %** (W146-F3 method, token-instance basis): **65-75%** (mid-range estimate, contingent on Fires 2-11 execution + T3 verdicts).

---

## §7 W146-F3 method-disclosure mandates SATISFIED

Per W146-F3 method-disclosure mandate at manifest L34:

- ✅ (a) total rows counted: 347 install-class + 58 cite-only = 405 tokens (token-instance basis)
- ✅ (b) rows excluded: 11 (REJECTED-POST-PROBE + HISTORICAL-MACHINE-EXCLUDED + DEPRECATED)
- ✅ (c) per-class counts: documented in §2 table
- ✅ (d) computed weighted %: 57.78% (install-class) + 100% (cite-only separate denominator)
- ✅ (e) cite-class chain: documented in front-matter Cite class block
- ✅ Reproducibility predicate: same manifest + same `grep -cE` per-token + same W146-F3 weights → same output
- ✅ Method-change disclosure: token-instance method (NOT Agent A row-level); difference disclosed as METHOD-SHIFT not regression

---

## §8 Cross-references

- `Z:/claude-sota/.claude/rules/audit-action-loop.md` — Wire/Surface/Close/Re-fire (this is Wire → Surface stage of Wave 160 audit-action-loop)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A — Fire 11 convergence ship will apply per audit findings
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — HONEST-NON-FINDING applied to method-shift caveat
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17` — STAND-IN-NOTICE recovery for Phase 1 Explore agent FM-17.502 failures
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` — STAND-IN-NOTICE inline
- `docs/sota-installed-manifest.md` — primary input + audit target
- `.claude/plans/fluttering-wandering-pond.md` — 12-fire wave plan (Fire 1 is this deliverable)
- `docs/install-provenance.md` — Wave 160 entry will append at Fire 12 close-synthesis

---

## §9 Provenance

- **Fire 1 dispatch**: 2026-05-12 post-codification-fire close (commits `2f971597` + `7cb64a06`)
- **Empirical probes**: orchestrator-direct Bash/grep/find/git ls-files (Explore subagent dispatch failed FM-17.502 systemic; 5th + 6th same-arc cumulative per MEMORY.md tail)
- **Plan file**: `.claude/plans/fluttering-wandering-pond.md` (approved 2026-05-12)
- **Input manifest SHA**: `docs/sota-installed-manifest.md` at git HEAD `7cb64a06` (post-Pattern-A-fix-forward; absorbed via parallel-session checkpoint `c499b89` per FM-02 (c) recovery)
- **Output deliverable**: this file (`docs/audit-refresh-W160-F1-2026-05-12.md`)
- **MEMORY.md index entry**: ONE-line entry to be added per session-arc tracking discipline (sister artifact)

---

## §10 Forward direction (post-Fire-1)

Fire 1 closes (this file ships). Next action per plan:

- **Fire 2** (operator-decision-pending per Pre-Fire-2 gate): Close 2 OPEN HIGH-severity T3 findings. Operator confirms strategy for auth-enforcement flag remediation (3 options per T3 finding context) before Fire 2 dispatches.
- **Fires 3-10**: queued per plan ONE-LOGICAL-UNIT-PER-FIRE
- **Fire 11**: convergence ship with GPT-5.5 consensus (synthesis of Fires 1-10)
- **Fire 12**: audit % delta + close-synthesis (re-run this audit method post-Fires 2-11)
