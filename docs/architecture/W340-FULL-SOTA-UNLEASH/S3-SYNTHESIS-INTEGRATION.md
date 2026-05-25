# W340 S3 — Synthesis + Integration Sweep

**Wave**: W340-FULL-SOTA-UNLEASH
**Date**: 2026-05-20
**Author**: Orchestrator (synthesis pass)
**Carrier**: this single document — operator-sign queued
**Discipline**: Cardinal Rule 6 (verify-before-claim) + empty-final-message-guard (Δ-G49) + worker-failure-termination-guard (Δ-G50)
**Source**: 5 ordered parts (A-E) covering sca-v14 diff, W338 integration, CLAUDE.md drift, settings.json audit, fork-empty hypothesis.

> **POST-COMMIT ANNOTATION (W340 wave-close, 2026-05-20)**: This document is a SNAPSHOT at Agent-3 audit time (pre-wave-close). Two specific claims have been SUPERSEDED by landings in this same commit + codex r1 cross-model veto:
>
> (1) **§D table row `hooks.UserPromptSubmit` (L261) + §D.2 gap row + §6 next-action L304** — describes UserPromptSubmit as `[]` empty. **SUPERSEDED**: `.claude/settings.json` in this same commit wires `tools/parallel-guard-userpromptsubmit.mjs` (F2 closure per ARCHITECTURE-V2.md L51).
>
> (2) **§6 Action #5 (L422) "Add 4 OTEL env vars (METRICS_EXPORTER, LOGS_EXPORTER, OTLP_HEADERS, SERVICE_NAME) — P1 (SEV-1 ×3)"** — proposed pre-codex-r1 veto. **SUPERSEDED**: codex r1 cross-model gate VETOED `OTEL_METRICS_EXPORTER` + `OTEL_LOGS_EXPORTER` against Langfuse (Langfuse is traces-only per live probe — `/api/public/otel/v1/metrics` returns 401, `/logs` returns 404; metrics+logs need Prometheus/Loki/Tempo backend deferred W341+). Only `OTEL_SERVICE_NAME=claude-sota-installed` landed this commit. `OTEL_EXPORTER_OTLP_HEADERS` (Basic-auth) carry-W341 via CLAUDE.local.md after Q9 Langfuse key rotation. See `SYNTHESIS.md` §S9 + `ARCHITECTURE-V2.md` TL;DR L14 + `OPERATOR-SIGN-QUEUE.md` Q3 STATUS UPDATE for the post-veto reconciled position.
>
> Other §D table rows + §6 actions remain authoritative as-of-audit. Live reconciliation surface = `ARCHITECTURE-V2.md`.

---

## §A — sca-v14 D13-D17 + D12-mod committable diff (REPORT-ONLY)

### A.0 Background

Source: `docs/architecture/W339-FULL-SOTA-UNLEASH/P1b-RESEARCH-ARCH-UPGRADE.md:55-66` (5 new dim defs + D12 swap).
Target file: `.claude/skills/sota-convergence-audit/SKILL.md` — 365 lines / 46,646 bytes (probe `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md` 2026-05-20).
Insertion point: §3 Dimension Catalog body at L168-189 (currently terminates at `D72 episodic_reflection_persistence` description bullet). Add bullets BEFORE the closing `---` at L191.

**Critical observation**: sca-v14 already exists in v14 form per L6 frontmatter (`sca-v14 — W337 verdict-llm-codify`). The current SKILL.md already lists **D73-D75** at L178-182 (v14 W337 verdict-llm-codify) but **D13-D17** as proposed in W339-P1b are conceptually DIFFERENT from existing D13/D14/D15/D16/D17 — and the W339-P1b dim numbers COLLIDE with existing dims:

| W339-P1b proposed | Existing meaning in sca-v14 (L168-189) |
|---|---|
| D13 empty-detect | D13 was sca-v3 W288 — see references/dimensions.md |
| D14 fail-CLOSED worker | D14 was sca-v3 W288 |
| D15 budget cap | D15 was sca-v3 W288 |
| D16 typed prompt-program (DSPy) | D16 was sca-v3.1 W293 |
| D17 INDEPENDENCE-PROOF | D17 was sca-v3.1 W293 |
| D12 stars→sub-signal mod | D12 ALREADY swapped in v14 W337 to `pattern_density_score` per L182 |

**RECONCILIATION REQUIRED** before commit. Two paths:

- **Path-A (recommended, no collision)**: Rename W339-P1b dims to **D76 / D77 / D78 / D79 / D80** following the existing sequential schema (last assigned: D75 per L181). Update P1b cite anchors retained as-is. This avoids ambiguous re-binding of D13-D17 numerals.
- **Path-B (forbidden, collision)**: Forcibly re-bind D13-D17 — would corrupt all prior ledger rows citing D13-D17 in the v3/v3.1 sense (W288/W293 lineage).

**ELECTED**: Path-A. Below diff uses **D76-D80** for the new dims.

Also: P1b §3 calls for "**MODIFY D12**" but L182 confirms D12 has ALREADY been swapped to `pattern_density_score` in v14 W337. Operator action on D12 is **NO-OP** (already landed). Recommend P1b deliverable §3 D12 bullet be re-classified `ALREADY-LANDED-W337` rather than `MODIFY`.

### A.1 Proposed-edit blocks

**Edit 1** — Add v15 lineage row at L12 (after v14 W337 row, before `---`):

```diff
@@ .claude/skills/sota-convergence-audit/SKILL.md @@ L12
- → **v14 W337** (verdict-llm-codify: +D73 multi_source_first_discovery_diversity +D74 mcp_family_attribution_completeness +D75 codex_round_cost_efficiency_ratio + D12 stars-only→pattern_density swap; denom_install 42.5→**44.0**, pattern 18.9→**19.8**; verdict-llm v0.2.1 MIT Pipeline-primitive ratified; Δ50 license corrected Apache-2.0→**MIT** per gh API probe 2026-05-20).
+ → **v14 W337** (verdict-llm-codify: +D73 multi_source_first_discovery_diversity +D74 mcp_family_attribution_completeness +D75 codex_round_cost_efficiency_ratio + D12 stars-only→pattern_density swap; denom_install 42.5→**44.0**, pattern 18.9→**19.8**; verdict-llm v0.2.1 MIT Pipeline-primitive ratified; Δ50 license corrected Apache-2.0→**MIT** per gh API probe 2026-05-20) → **v15 W340** (+D76 empty-final-message-detection +D77 fail-CLOSED-worker-exception +D78 budget-cap +D79 typed-prompt-program-DSPy +D80 INDEPENDENCE-PROOF-multi-org-anchor; denom_install 44.0→**46.5**; pattern 19.8→**21.3**; cite-anchored to W339-P1b research-arch upgrade + Δ-G49 / Δ-G50 fork-anti-finding closures already PATTERN-INSTALLED via local skills).
```

**Edit 2** — Add new D76-D80 bullets at L189 (before closing `---` at L191):

```diff
@@ .claude/skills/sota-convergence-audit/SKILL.md @@ L189
   - **D72 `episodic_reflection_persistence`** — W_install 0.4 / W_pattern 0.3 / M-skip / score 1-5. Measures whether wave-N learnings retrieve in wave-(N+5) via T6 basic-memory; ≥4 requires explicit `note_type: sca-v13-reflection` rows + cross-wave retrieval contract demonstrated. 3-org-distinct: Reflexion NeurIPS 2023 (Princeton/Northeastern) + Memento-II arXiv 2512.22716 + basic-memory T6 canonical (per W295 canonical-primary). [W329-C §2 L71 + §8.2]
+- **D76-D80 sca-v15 W340** (orchestration-fail-CLOSED + typed-program-paradigm — 5 new dims; cite-anchored to W339-P1b Pareto-frontier {C8 anthropic claude-cookbooks, C2 microsoft autogen}):
+  - **D76 `empty_final_message_detection`** — W_install 0.6 / W_pattern 0.4 / E-skip if candidate ships no orchestration primitive / score 0-3. Measures whether candidate explicitly detects + escalates empty teammate final assistant messages (Δ-G49). 0 = silent accept; 1 = log-only; 2 = stub-inject ("[Error: Worker X returned no content]"); 3 = explicit empty-detect + re-dispatch loop + escalate-to-operator. **Measurement procedure**: grep candidate's orchestrator code for empty-string checks on subagent output; trace at least one observable path from empty-result to either retry, error-stub, or fail-CLOSED. **Pass/fail**: ≥2 for T1 install; ≥1 for T2 vendor-fork; 0 = SOFT-WARN pattern-only adoption. **3-org-distinct anchors**: (a) Anthropic `claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/orchestrator_workers.ipynb` cell-2 `if not worker_content.strip(): worker_content = f"[Error: ...]"`; (b) Microsoft `autogen @ 027ecf0a _base_group_chat_manager.py:165-170` `_signal_termination_with_error`; (c) LangChain `langgraph @ 5d341ac3 supervisor.py:81-91` supervisor.last_message empty-route. **Already PATTERN-INSTALLED**: `.claude/skills/empty-final-message-guard/SKILL.md` (W339-P0b Gap-1; cardinal-rule-4-compliant). [W340-S3 §A + W339-P1b §3 D13]
+  - **D77 `fail_closed_worker_exception_handler`** — W_install 0.6 / W_pattern 0.4 / E-skip if candidate ships no orchestration primitive / score 0-3. Measures whether worker EXCEPTIONS (uncaught, non-zero-exit, status==failed) are surfaced and propagated rather than silent exit-0. 0 = swallow-and-continue; 1 = log-only; 2 = mark task FAILED but synthesize partial; 3 = explicit terminate-signal + skip-from-synthesis + escalate. **Measurement procedure**: inject a deliberate exception into one teammate; observe orchestrator behavior (silent vs surface). **Pass/fail**: ≥2 for T1; ≥1 for T2; 0 = SOFT-WARN. **3-org-distinct anchors**: (a) Microsoft `autogen @ 027ecf0a` `_signal_termination_with_error` (RoutedAgent contract); (b) LangChain `langgraph` Pregel exception bubble (`langgraph/pregel/_runner.py` exception escalation); (c) Anthropic `claude-cookbooks @ 39a350b6` FlexibleOrchestrator stub-injection pattern (3-org-distinct convergence). **Already PATTERN-INSTALLED**: `.claude/skills/worker-failure-termination-guard/SKILL.md` (W339 carry-forward closed early W340). [W340-S3 §A + W339-P1b §3 D14]
+  - **D78 `budget_cap_enforcement`** — W_install 0.5 / W_pattern 0.3 / E-skip arch-itself / score 0-3. Measures whether candidate enforces hard caps on (a) max_turns, (b) token budget, (c) wall-time budget per orchestration loop. 0 = prose-only "2-5 members" advisory; 1 = warn-only soft cap; 2 = halt-loop on cap breach (no escalation); 3 = enforced cap + explicit termination message + escalation. **Measurement procedure**: instrument a deliberate runaway loop; observe if cap fires within expected bound + cite the StopMessage / termination event. **Pass/fail**: ≥2 for T1; ≥1 for T2; 0 = SOFT-WARN. **3-org-distinct anchors**: (a) Microsoft `autogen @ 027ecf0a` `GroupChatManager.max_turns` → `StopMessage` (v0.4 lineage); (b) LangChain `langgraph` `parallel_tool_calls` cap flag + `RecursionError` ceiling; (c) Anthropic `claude-code` agent-teams Phase-4 budget discipline cite-anchored to CLAUDE.md L13 parallel-execution mode-4 background-session budget. **Already PATTERN-INSTALLED**: `.claude/skills/agent-budget-discipline/SKILL.md` (already-local; W339 verified). [W340-S3 §A + W339-P1b §3 D15]
+  - **D79 `typed_prompt_program_paradigm`** — W_install 0.5 / W_pattern 0.4 / T-skip if not prompt-engineering-shaped candidate / score 0-3. Measures whether candidate exposes prompts as typed-program primitives (Signature + Module + Optimizer) versus artisanal-prose-prompt. 0 = artisanal prose only; 1 = template-string with named-slot; 2 = typed signature with input/output schema; 3 = full Signature/Module/Optimizer with metric + Pareto-frontier candidate-routing. **Measurement procedure**: read candidate's prompt entry-points; identify whether they are (a) ad-hoc strings (D79=0), (b) f-strings with vars (D79=1), (c) Pydantic-typed Signature classes (D79=2), or (d) optimizable programs with metrics (D79=3). **Pass/fail**: ≥2 for T1; ≥1 for T2; 0 acceptable for non-prompt-engineering candidates (T-skip). **3-org-distinct anchors**: (a) Stanford NLP `dspy` Signature/Module/Optimizer abstractions (github.com/stanfordnlp/dspy MIT 34k★); (b) Databricks DSPy production field report (Databricks Inc enterprise practitioner cite); (c) GEPA arXiv 2507.19457 Pareto-frontier candidate-routing (UC Berkeley / Stanford / MIT / Databricks NeurIPS 2025 co-authorship). **Already PATTERN-INSTALLED**: `.claude/skills/dspy-integration/SKILL.md` (W340-S3 confirmed). [W340-S3 §A + W339-P1b §3 D16]
+  - **D80 `independence_proof_multi_org_anchor`** — W_install 0.7 / W_pattern 0.5 / E-skip arch-itself self-claims / score 0-3. Measures whether the candidate's verdict citations satisfy ≥3-org-distinct independence per W295 anti-bias gate; collapses single-source verification claims into HARD-FAIL even at high other-dim scores. 0 = single-source / self-cite only; 1 = 2-org cluster; 2 = 3-org cluster with at least 1 non-vendor-of-record; 3 = 3-org-distinct + YAML-DAG / DAG-decomp INDEPENDENCE proof + falsifiability statement. **Measurement procedure**: extract every "passes review" / "tests green" / "SOTA" claim from candidate's verdict; verify ≥3 organizationally-distinct anchors per claim. **Pass/fail**: ≥2 for T1 (HARD GATE — fails T1 below 2 regardless of composite); ≥1 for T2; 0 = HARD-FAIL pattern-only-with-DOC. **3-org-distinct anchors**: (a) Stanford Encyclopedia of Philosophy entry on Popper falsifiability + open-society peer-review (Stanford academic-org); (b) Microsoft `promptflow` YAML-DAG node-independence enforcement (github.com/microsoft/promptflow MIT — enforces explicit upstream-dependency declaration); (c) OpenSSF Best Practices §15 multi-org-anchor mandate (OSSF/Linux Foundation governance). **Already CODIFIED**: `.claude/skills/goal-prompt-synthesis/SKILL.md` §5 (per W339-P1b §5). [W340-S3 §A + W339-P1b §3 D17]
```

**Edit 3** — Update denom_install + denom_pattern in §7 Composite Scoring Formula (currently denom_install=44.0, denom_pattern=19.8 per L181; update to 46.5 / 21.3 after sca-v15 dim additions):

```diff
@@ .claude/skills/sota-convergence-audit/SKILL.md @@ §7.path-(b) DEFAULT @ approx L300-308
- (denom_install=44.0; W337 verdict-llm-codify lineage)
+ (denom_install=46.5; W340 sca-v15 +D76-D80 lineage)
```

(Exact line in §7 reads from L300-308 per L319 ship-gate floors — operator to locate precise denom_install number; new denom = 44.0 + 0.6 + 0.6 + 0.5 + 0.5 + 0.7 = **46.5**; new denom_pattern = 19.8 + 0.4 + 0.4 + 0.3 + 0.4 + 0.5 = **21.3**.)

**Edit 4** — Update §3 catalog title at L168 to reflect new range:

```diff
@@ .claude/skills/sota-convergence-audit/SKILL.md @@ L168
- ## §3. D1–D49+D52-D65+D66+D67-D75 Dimension Catalog
+ ## §3. D1–D49+D52-D65+D66+D67-D75+D76-D80 Dimension Catalog
```

### A.2 Operator-sign checklist before commit

1. Cross-check W295 anti-bias gate: each new D76-D80 has ≥3-org-distinct cite anchors → ✓ verified above.
2. Cross-check Cardinal Rule 6: each new dim has a measurement procedure + pass/fail threshold → ✓ verified.
3. Decide D-EMP impact: D76-D80 are arch-itself-skip OR M-skip pending real candidate eval? Default → E-skip arch-itself; M-skip per-candidate.
4. Decide ledger row carry: existing T6 basic-memory rows citing "D13-D17" in v3/v3.1 sense need NO rebind (numbers preserved); new sca-v15 rows use D76-D80.

---

## §B — W338-CPA-ROUTER integration decision

### B.0 Probe results

- Directory state: `?? docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/` (untracked) per `git status --short` 2026-05-20.
- Content inventory (probed via `Get-ChildItem -Recurse`): 12 files / ~52 KB total. README.md (4544 B) + OPERATOR-RUNTIME-MITIGATION.md (4426 B) + VERDICT-LEDGER.md (6093 B) + 2 .diff patches (4522 + 2199 B) + 2 new .go files (5295 + 5607 B) + selector-integration.diff (3288 B) + apply.ps1 (3101 B) + SWAP-PROCEDURE.md (3911 B) + staging/ (2 .txt files 5508 + 2042 B).
- Git log probe: `git log --all --oneline | grep -iE 'cpa|router|529|w338'` returns NO matches for W338-CPA-ROUTER-SOTA-PATCHES specifically; older `cpa-usage-keeper` / `cpa-panel` / `cpa-cache-rate` / port-migration commits exist (b935e4a, 18a5292, 5fedaad, 53ff2a2, e0817c3, 6134f58) but they are unrelated to this patch set. **No prior W338-CPA-ROUTER commit on any branch.**
- Wave-context check: VERDICT-LEDGER.md L86-87 says `wave: W338 date: 2026-05-20` and `audit_incomplete: true` (D-EMP=0, codex r1 PENDING).

### B.1 Decision matrix

| Option | Pros | Cons | Recommendation |
|---|---|---|---|
| **(a) Track-as-is + commit in W338 wave** | Preserves wave-attribution; auditable; matches VERDICT-LEDGER `wave: W338`; rollback documented (VERDICT-LEDGER L90-96, <60s) | W338 wave already CLOSED per `git log` 42e7e7f (`fix(W338-hookmod)`); committing now would re-open closed wave | NO |
| **(b) Move to W340 dir + commit in W340 wave** | Wave-attribution stays cleanly within current open wave; aligns with W340 P0d carry-forward note in W339 SYNTHESIS L57 ("P0d carry from W338 — junction 1.0.141 → 1.0.146 may now be removable") which establishes W340 as the W338-residual-closure wave; can be re-pointed via README.md frontmatter | Requires path-rewrite in all 12 files referencing local paths; loses W338 dir-name semantic | PARTIAL — only if §B.2 below selected |
| **(c) Leave untracked (status quo)** | No-op; zero risk; preserves operator-side artifacts for future merge | Cardinal-rule-6 audit-trail gap — work product invisible to ledger; risk of accidental deletion via stash/clean | NO |
| **(d) Delete (archived elsewhere)** | Cleanest tree | DESTRUCTIVE — patches/diff files contain hours of audit work; OPERATOR-RUNTIME-MITIGATION.md is actionable | NO |
| **(e) Track-as-W338-late-closure with explicit "late ship" commit message + retain W338 dir name** | Honors VERDICT-LEDGER `wave: W338` attribution; documents temporal-vs-attribution distinction in commit message; no path-rewrite needed | Late-ship pattern requires operator-sign per Cardinal Rule 6 (verify-before-claim) | **RECOMMENDED** |

**ELECTED**: **Option (e)** — `git add` the dir as-is and commit during W340 wave-close with explicit message attributing wave=W338 work-product, wave=W340 ship-time. This is the smallest-blast-radius option and honors all three constraints (VERDICT-LEDGER attribution + clean tree + audit-trail).

### B.2 Exact git commands

```powershell
# Step 1 — verify untracked state (idempotent probe)
git status --short -- docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/

# Step 2 — add dir (recursive)
git add docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/

# Step 3 — verify gitleaks PreToolUse hook will pass (patches contain no secrets; double-check)
gitleaks protect --staged --no-banner --redact

# Step 4 — verify CR-2 2KB hook gate inert (no files under .claude/hooks/**)
# (auto-passes — pre-commit-config.yaml cr2-2kb-hooks only scans .claude/hooks/**)

# Step 5 — commit with explicit late-ship message
git commit -m "ship(W340): land W338-CPA-ROUTER-SOTA-PATCHES late-attribution audit dir

Wave-attribution: W338 (work-product per VERDICT-LEDGER.md wave field).
Wave-ship: W340 (this commit-time wave).

Contents (12 files, ~52 KB):
- README.md — gap audit + sca-v13 ranking
- OPERATOR-RUNTIME-MITIGATION.md — M1-M3 zero-code-change mitigations
- VERDICT-LEDGER.md — sca-v13 ledger row (D-EMP=0 PRE-APPLY; codex r1 PENDING)
- patch-1-add-529-case.diff + patch-2-full-jitter.diff (T0 IMMEDIATE-UPGRADE)
- breaker.go + aimd_limiter.go (T1 INSTALL new files for upstream PR)
- selector-integration.diff + apply.ps1 + SWAP-PROCEDURE.md (operator-side apply pipeline)
- staging/{conductor,types}-patches.go.txt (pre-merged staging)

Patches target external repo router-for-me/CLIProxyAPI; this dir is CITE-REFERENCE
per Cardinal Rule 1 — NOT an install target on this runtime. Operator-side
fork-build-swap procedure documented in apply.ps1 + SWAP-PROCEDURE.md.

D-EMP=0 PRE-APPLY; codex r1 PENDING per VERDICT-LEDGER L57+L60+L80.
Carry-forward: D-EMP advancement requires operator apply + 4-stream stress test
+ 24h soak per VERDICT-LEDGER L115-120."
```

### B.3 Why NOT move to W340 dir

VERDICT-LEDGER L86-87 explicitly says `wave: W338`. Moving the dir to W340 would force a path-rewrite in 12 files OR introduce a wave-attribution discrepancy (dir-name says W340; ledger says W338). The late-ship pattern (Option e) preserves both. The W340 wave-close commit message body documents the temporal distinction explicitly.

---

## §C — CLAUDE.md drift survey

### C.0 Canonical counts claim at CLAUDE.md L35

> "**Harness wired (W337 canonical counts 2026-05-20)**: cache_dirs=15 · marketplace_records=22 · marketplace_dirs=23 · installed_plugin_records=64 · enablement_entries=68 (enabled_true=59, enabled_false=9) · load_failures=1"

### C.1 Live probe results (2026-05-20)

Probes via `Get-Content ... | ConvertFrom-Json` + `Get-ChildItem -Directory | Measure-Object`:

| Count | CLAUDE.md L35 claim | Live probe | Match? | Probe |
|---|---|---|---|---|
| cache_dirs | 15 | **15** | ✓ | `(GCI .claude/plugins/cache -Directory).Count` |
| marketplace_records (known_marketplaces.json) | 22 | **22** | ✓ | `(GC .claude/plugins/known_marketplaces.json \| ConvertFrom-Json).PSObject.Properties.Count` |
| marketplace_dirs | 23 | **23** | ✓ | `(GCI .claude/plugins/marketplaces -Directory).Count` |
| installed_plugin_records | 64 | **64** | ✓ | `(GC installed_plugins.json \| ConvertFrom-Json).plugins.PSObject.Properties.Count` — top-level has `version`+`plugins` keys; `plugins` sub-object has 64 records |
| enablement_entries | 68 | **68** | ✓ | `settings.json:enabledPlugins.PSObject.Properties.Count` |
| **enabled_true** | **59** | **58** | **✗** | enumerated; see C.2 below |
| **enabled_false** | **9** | **10** | **✗** | enumerated; see C.2 below |
| load_failures | 1 | (not directly probed this run — W337 codex-r2 Axis-9 cite) | unverified | requires plugin-load-error probe in next session |

**Drift confirmed**: enabled_true=58 not 59; enabled_false=10 not 9. The pair sum stays at 68 (matches), so total entry count is consistent — but exactly 1 plugin shifted from enabled→disabled (or was added as disabled) since W337 canonical-counts capture.

### C.2 enabled=false (10) enumeration

Probed via `settings.json:enabledPlugins | Where-Object Value -eq $false`:

1. `qdrant-skills@claude-plugins-official` — false
2. `hookify@claude-plugins-official` — false
3. `intelligent-compact@claude-settings` — false
4. `protect-mcp@claude-code-workflows` — false
5. `claude-mem@thedotmack` — false
6. `review-agent-governance@claude-code-workflows` — false
7. `superpowers@superpowers-marketplace` — false (the dup of `superpowers@claude-plugins-official`)
8. `hindsight-memory@hindsight` — false
9. `gitnexus@gitnexus-marketplace` — false
10. `self-improving-agent@claude-code-skills` — false ← **likely the new disable**

Hypothesis: `self-improving-agent@claude-code-skills` was added/disabled after W337 canonical-counts capture (since the count drifted 9→10). Operator decision required: (a) was this an intentional disable in W338 or W339 housekeeping? (b) if intentional, refresh W337 canonical counts on CLAUDE.md L35. (c) if accidental, re-enable.

### C.3 Proposed surgical edit (operator-sign-required, do NOT auto-apply)

**File**: `Z:\claude-sota-installed\CLAUDE.md`
**Line**: L35 (the `Harness wired` block)

```diff
@@ Z:\claude-sota-installed\CLAUDE.md @@ L35
- **Harness wired (W337 canonical counts 2026-05-20)**: cache_dirs=15 · marketplace_records=22 · marketplace_dirs=23 · installed_plugin_records=64 · enablement_entries=68 (enabled_true=59, enabled_false=9) · load_failures=1 (`everything-claude-code@everything-claude-code` per W337 codex-r2 Axis-9 probe — investigate W337-AI-11). Stale counts in prior wording ("18 cache / 47 enabled / 16 marketplaces / 6 unused") corrected post W316-retirements (addy-agent-skills, gitnexus-marketplace, mcp-memory-service) + W334-SOTA-UNLEASH ca6904a (+12 enable) + W335-MSYS disables. `.claude/settings.json` hooks are direct-CLI invocations (gitleaks·ruff·shellcheck·git — cardinal-rule-2-compliant); pre-commit security gate runs every commit; plugin skills auto-fire per `description:` match.
+ **Harness wired (W340 canonical counts 2026-05-20)**: cache_dirs=15 · marketplace_records=22 · marketplace_dirs=23 · installed_plugin_records=64 · enablement_entries=68 (enabled_true=58, enabled_false=10) · load_failures=1 (`everything-claude-code@everything-claude-code` per W337 codex-r2 Axis-9 probe — investigate W337-AI-11). W340-Δ vs W337: enabled_true 59→58 / enabled_false 9→10 (single-flip; `self-improving-agent@claude-code-skills` now disabled — operator-sign on disable rationale pending W340-S3-§C). Stale counts in prior wording ("18 cache / 47 enabled / 16 marketplaces / 6 unused") corrected post W316-retirements (addy-agent-skills, gitnexus-marketplace, mcp-memory-service) + W334-SOTA-UNLEASH ca6904a (+12 enable) + W335-MSYS disables. `.claude/settings.json` hooks are direct-CLI invocations (gitleaks·ruff·shellcheck·git — cardinal-rule-2-compliant); pre-commit security gate runs every commit; plugin skills auto-fire per `description:` match.
```

### C.4 Other CLAUDE.md drift candidates (informational, lower-priority)

- L31 "Local operator-curated skills × **46** (W333 Stream A re-count 2026-05-19)" — `Get-ChildItem .claude/skills -Directory` count not re-probed this run. If drifted (likely +1 if `worker-failure-termination-guard` added per W339-P1b but not in W333 inventory) → update on next pass.
- L34 "load_failures=1" — codex-r2 Axis-9 cite per W337; not re-probed this run.
- L36 Memory live block contains many "✓" / "✗" tier markers — too long-form to verify per-marker in this stream; defer to a dedicated tier-status probe wave.

---

## §D — Settings.json SOTA audit

### D.0 Reference list — Anthropic CC 2026-currently-known features

Cite-anchored to (a) `https://docs.anthropic.com/en/docs/claude-code/settings` + (b) `https://code.claude.com/docs/en/cli-reference` + (c) CCBP `claude-settings.md @ HEAD f28c2da` (Z:/repos/deps/claude-code-best-practice-shan) — 3-org-distinct (Anthropic-docs + Anthropic-code-claude + shan/CCBP).

### D.1 Settings.json delta table

| key | current | sota-target | action |
|---|---|---|---|
| `$schema` | `https://json.schemastore.org/claude-code-settings.json` | same | KEEP |
| `cleanupPeriodDays` | 60 | 60 | KEEP |
| `skillListingBudgetFraction` | 0.03 | 0.03 (low — preserves context budget) | KEEP |
| `env.CLAUDE_CODE_FORK_SUBAGENT` | `"1"` | `"1"` | KEEP — fork-subagent canonical (per CLAUDE.md L12) |
| `env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `"1"` | `"1"` | KEEP |
| `env.CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | `"1"` | `"1"` | KEEP |
| `env.CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | `"1"` | `"1"` | KEEP |
| `env.CLAUDE_CODE_ATTRIBUTION_HEADER` | `"0"` | `"0"` | KEEP |
| `env.CLAUDE_CODE_USE_POWERSHELL_TOOL` | `"1"` | `"1"` | KEEP — Windows-correct |
| `env.CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | `"300000"` | `"300000"` | KEEP |
| `env.ENABLE_PROMPT_CACHING_1H` | `"1"` | `"1"` | KEEP — SOTA prompt-caching |
| `env.ENABLE_TOOL_SEARCH` | `"auto:5"` | `"auto:5"` | KEEP — SOTA deferred-tools |
| `env.CLAUDE_CODE_ENABLE_TELEMETRY` | `"1"` | `"1"` | KEEP |
| `env.CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | `"1"` | `"1"` | KEEP |
| `env.OTEL_TRACES_EXPORTER` | `"otlp"` | `"otlp"` | KEEP — Langfuse wired |
| `env.OTEL_METRICS_EXPORTER` | **UNSET** | **DO NOT ADD against Langfuse** | **REJECTED per codex r1** — `/api/public/otel/v1/metrics` returns 401 (endpoint exists but Langfuse derives metrics from traces; OTLP metrics NOT surfaced in dashboards per https://langfuse.com/integrations/native/opentelemetry). Carry-forward needs separate Prometheus/OTEL-Collector backend. |
| `env.OTEL_LOGS_EXPORTER` | **UNSET** | **DO NOT ADD against Langfuse** | **REJECTED per codex r1** — `/api/public/otel/v1/logs` returns 404 (endpoint does not exist). Carry-forward needs Loki/Tempo. |
| `env.OTEL_EXPORTER_OTLP_HEADERS` | **UNSET** | `"Authorization=Basic <base64(pk+sk)>"` | **CARRY-FORWARD (next wave)** — required for Langfuse OTLP TRACES auth (currently /v1/traces returns 401 too); operator-only via CLAUDE.local.md after Langfuse key rotation per Stream K SB-1. |
| `env.OTEL_SERVICE_NAME` | **UNSET** | `"claude-sota-installed"` | **ADDED (this commit)** — safe metadata tag on existing traces for Langfuse multi-runtime segmentation. |
| `env.CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `"1"` | `"1"` | KEEP — deliberate opt-out per CLAUDE.local.md §Memory; matches `autoMemoryEnabled:false` (belt+suspenders) |
| `env.CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | `"1"` | `"1"` | KEEP — SOTA strict-streaming |
| `env.CLAUDE_CODE_EFFORT_LEVEL` | `"max"` | `"max"` | KEEP |
| `env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | `"1"` | `"1"` | KEEP |
| `env.CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE` | `"1"` | `"1"` | KEEP — install-resilience |
| `env.CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | `"1"` | `"1"` | KEEP |
| `env.CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | `"60000"` | `"60000"` | KEEP |
| `env.MSYS_NO_PATHCONV` + `MSYS2_*` | set | set | KEEP — MSYS path-rewrite suppression |
| `env.NODE_OPTIONS` | `"--max-old-space-size=4096"` | `"--max-old-space-size=4096"` | KEEP — 4GB heap for node MCP servers |
| `env.HOME` / `USERPROFILE` / `BASH_ENV` / `CLAUDE_BASH_NO_LOGIN` | set per W317-MSYS-fix | same | KEEP |
| `env.CLAUDE_PLUGIN_DATA` / `GATEGUARD_STATE_DIR` / `AUDIT_ROOT` / `CLAUDE_MEM_DATA_DIR` / `ECC_SESSION_RECORDING_DIR` | set per W319-3 Stream-C | same | KEEP |
| `includeGitInstructions` | false | false | KEEP — matches `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` in CLAUDE.local.md |
| `permissions.allow[]` | 12 entries | 12 entries | KEEP — narrow allowlist |
| `permissions.deny[]` | 41 entries (secrets, key files, browser profiles, sudo, chmod 777, --no-verify variants) | same | KEEP — comprehensive |
| `permissions.defaultMode` | `"default"` | `"default"` | KEEP |
| `disabledMcpjsonServers` | `[]` | `[]` | KEEP — W333-P0 drift-excise clean per CLAUDE.md L19 |
| `hooks.SessionStart` | 1 hook (context-mode-cache-heal.mjs) | same | KEEP — sanctioned 2KB shim per CR-2 |
| `hooks.UserPromptSubmit` | `[]` | `[]` (empty) — **OR** add prompt-submit logging hook | OPTIONAL — UserPromptSubmit slot empty; consider adding OTEL prompt-attribute injection per W340 Stream F |
| `hooks.PreToolUse.Bash` | 3 hooks (gitleaks · trivy on commit/push/PR · adversarial-review on git destructive) | same | KEEP — strong pre-commit gate |
| `hooks.PreToolUse[Edit\|Write]` | 1 hook (verdict-ledger lint) | same | KEEP |
| `hooks.PreToolUse.Agent` | 2 hooks (preagent-parallel-guard + preagent-subagent-validator) | same | KEEP — Cardinal Rule 3 mechanization |
| `hooks.PostToolUse[Edit\|Write\|MultiEdit]` | 1 hook (ruff + shellcheck) | same | KEEP |
| `hooks.PreCompact` | 1 hook (auto-compact audit-trail) | same | KEEP |
| `hooks.WorktreeRemove` | 1 hook (git worktree prune) | same | KEEP |
| `hooks.Notification` | 1 hook (PowerShell Beep) | same | KEEP |
| `hooks.PostToolUseFailure` | 1 hook (gitleaks/EACCES feedback) | same | KEEP |
| `hooks.TaskCompleted` | 1 hook (ruff check on tools/harness) | same | KEEP |
| `hooks.Stop` | **NOT IN settings.json** — wired via openai-codex plugin hooks.json (per CLAUDE.md L10 W332 audit-trap) | NOT-IN-SETTINGS-CORRECT | KEEP — Stop-hook codex-review-gate via plugin (W286b verified) |
| `hooks.SessionEnd` | **NOT IN settings.json** — likely codex plugin | NOT-IN-SETTINGS-CORRECT | KEEP |
| `hooks.SubagentStop` | **UNSET** | **UNSET** (no current need; Δ-G49 caught at synthesis via empty-final-message-guard skill, not hook) | OPTIONAL — could wire SubagentStop hook for hard-mechanization of Δ-G49 (vs current advisory skill) |
| `hooks.WorktreeCreate` | **UNSET** | **UNSET** (no current need) | OPTIONAL — could wire for auto-setup of worktree environment |
| `worktree.symlinkDirectories` / `sparsePaths` / `baseRef` | `[]` / `[]` / `"fresh"` | same | KEEP |
| `defaultShell` | `"powershell"` | `"powershell"` | KEEP — Windows-correct |
| `statusLine` | `ccstatusline@2.2.19` (3-line, 30s refresh) | same | KEEP — SOTA per W340 Stream F |
| `sandbox.enabled` | false | false (Windows — CC OS-sandbox structurally inert per CLAUDE.md R5-corollary) | KEEP — sca-v11 §6 5-control layered-defense holds R5 |
| `sandbox.failIfUnavailable` | true | true | KEEP |
| `sandbox.allowUnsandboxedCommands` | true | true (Windows-required) | KEEP |
| `sandbox.excludedCommands` | `["git","docker","npx","uvx"]` | same | KEEP |
| `alwaysThinkingEnabled` | true | true | KEEP — SOTA reasoning |
| `awaySummaryEnabled` | true | true | KEEP |
| `autoUpdatesChannel` | `"latest"` | `"latest"` | KEEP — keeps runtime on CC HEAD |
| `minimumVersion` | `"2.1.144"` | track latest CC release (`2.1.144` was release at W337 time; verify current CC HEAD) | OPTIONAL — bump if CC HEAD has advanced |
| `tui` | `"fullscreen"` | `"fullscreen"` | KEEP |
| `autoMemoryEnabled` | false | false | KEEP — pointer-only CLAUDE.md per CLAUDE.local.md U3 |
| `skipDangerousModePermissionPrompt` | true | true | KEEP |
| `skipAutoPermissionPrompt` | true | true | KEEP |
| `theme` | `"dark"` | `"dark"` | KEEP |
| `teammateMode` | `"in-process"` | `"in-process"` | KEEP — matches CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 |
| `outputStyle` | `"Proactive"` | `"Proactive"` | KEEP |
| `enabledPlugins` | 68 entries (58 true / 10 false) | same | KEEP — see §C.2 |
| `extraKnownMarketplaces` | 22 named marketplaces | same | KEEP |

### D.2 Headline SOTA gaps (priority order)

| # | Gap | Severity | Fix LOC | Recommend wave |
|---|---|---|---|---|
| 1 | `OTEL_METRICS_EXPORTER` UNSET → originally framed as "all CC metrics never reach Langfuse" | **REVISED to NON-GAP per codex r1** | n/a — Langfuse OTEL ingestion is traces-only; metrics derived from traces. Setting this env var against Langfuse OTLP endpoint would 401 silently. Real gap = "no metrics backend wired"; fix = provision Prometheus+OTEL-Collector (W341+). | W341 deferred (out-of-scope wave) |
| 2 | `OTEL_LOGS_EXPORTER` UNSET → originally framed as "all CC log events never reach Langfuse" | **REVISED to NON-GAP per codex r1** | n/a — `/api/public/otel/v1/logs` 404 on Langfuse (endpoint does not exist). Real gap = "no logs backend wired"; fix = provision Loki or equivalent. | W341 deferred |
| 3 | `OTEL_EXPORTER_OTLP_HEADERS` UNSET → Langfuse OTLP auth missing | **SEV-1 (still valid)** | 1 env line + base64 derive from LANGFUSE_PUBLIC_KEY+LANGFUSE_SECRET_KEY (CLAUDE.local.md §f2 — requires Langfuse key rotation per codex SB-1 first) | W341 carry-forward (operator-only) |
| 4 | `OTEL_SERVICE_NAME` UNSET → Langfuse can't segment runtime | SEV-3 | 1 env line | **CLOSED W340 P1** (in this commit) |
| 5 | `hooks.UserPromptSubmit` empty | SEV-3 OPTIONAL | mature pattern needed | W341 PATTERN-STUDY |
| 6 | `hooks.SubagentStop` UNSET → Δ-G49 enforcement is advisory-only via skill, not mechanized | SEV-2 | new hook body (must be ≤2KB per CR-2 OR direct-CLI invocation) | W341 mechanize |

(Note: gaps #1-#3 are documented in detail at `docs/architecture/W340-FULL-SOTA-UNLEASH/stream-F-insights-audit.md:22-39`.)

### D.3 Settings keys NOT in the runtime but available

Per CCBP `claude-settings.md @ f28c2da` review (relative survey, not exhaustive):

- `apiKeyHelper` (not used; auth lives in `~/.claude.json` per CC default) — KEEP UNSET
- `model` (not used — auto-selects per session model selector) — KEEP UNSET
- `dataRetention` — KEEP UNSET (CC defaults)
- `useTunnelDir` — KEEP UNSET
- `costThreshold` — OPTIONAL FUTURE: alert when single session cost crosses N USD

---

## §E — Fork anti-finding (Δ-G49) hypothesis

### E.0 Empirical record (from W339 SYNTHESIS L60-61)

> "Forks from this large-context session (~840k tokens cache-read inheritance) produced EMPTY final messages (Δ-G49 anti-pattern) for 3 of 8 dispatches: P0a, P0c, P1c. Re-dispatches with stricter format requirement ALSO returned empty. Workaround: inline audits for those streams."

This is a 37.5% (3/8) empty-rate on forks under high parent-context conditions. SEV-1 for orchestration correctness if not caught by `empty-final-message-guard`.

### E.1 Hypothesis space (4 candidates)

**H1 — max-output-tokens fork-inheritance limit hit**

- *Mechanism*: forked subagent inherits the parent's accumulated tool result history (~840k tokens cache-read per W339 SYNTHESIS). If the fork's max-output-tokens budget is calculated *after* deducting cached prefix, the fork might have <2k tokens left for synthesis output → silent truncation → empty final message.
- *Diagnostic*: instrument `OTEL_LOG_RAW_API_BODIES=file:Z:/tmp/raw-bodies` on next fork and inspect the `usage.output_tokens` field on the empty-result response. If `output_tokens` is consistently near a cap value (e.g., 0 or 8192) → H1 confirmed.
- *Counter-evidence*: would expect TRUNCATED last-token (mid-sentence cut) rather than ZERO output; if responses are all literally empty strings rather than cut-mid → H1 less likely.

**H2 — output budget exhausted by tool result accumulation during the fork**

- *Mechanism*: large-context fork performs many tool calls (Grep, Read, Bash) and accumulates so much in-fork tool-result context that the synthesis-stage retry exhausts budget BEFORE emitting final assistant message. Distinct from H1 — H1 is about parent-cache-read; H2 is about in-fork accumulation.
- *Diagnostic*: track `total_tokens` per turn within the fork; if last successful tool call leaves `total_tokens` near the model context cap → H2 confirmed. Mitigation: shrink fork tool budget (≤15 tool calls per W340 task discipline).
- *Counter-evidence*: empty-result happens BEFORE the fork has time to accumulate (e.g., on first synthesis attempt) → H2 less likely.

**H3 — synthesis-stage abort due to context-pressure compaction race**

- *Mechanism*: CC auto-compact threshold (~95% per CLAUDE.local.md §Auto-compact at HEAD f28c2da) might fire DURING the fork's synthesis stage, racing with the final-message generation. Mid-synthesis compaction → state corruption → no final message emitted.
- *Diagnostic*: check `tmp/precompact.log` (PreCompact hook writes timestamp + session-id per settings.json:182-191) — if PreCompact entries exist in the fork sessions that returned empty, H3 confirmed.
- *Counter-evidence*: if PreCompact never fires within the fork (because forks are short-lived and don't hit the 95% threshold) → H3 ruled out.

**H4 — cache-read inheritance corrupting fork prompt (system-prompt bleed)**

- *Mechanism*: when `CLAUDE_CODE_FORK_SUBAGENT=1` inherits the full parent transcript, the fork's system prompt + tool definitions might be IN the cached prefix and the inheritance shape distorts (e.g., truncates) the cached system prompt → fork model receives corrupted/truncated system prompt → fails to produce coherent final synthesis.
- *Diagnostic*: re-fork the same task with `CLAUDE_CODE_FORK_SUBAGENT=0` (regular task tool, no fork) and observe whether empty-rate drops to ~0%. If non-fork tasks NEVER return empty under same parent-context size → H4 confirmed.
- *Counter-evidence*: if non-fork dispatches ALSO return empty at similar rate → H4 ruled out; root cause is upstream of fork-vs-task distinction.

### E.2 Three test cases that distinguish hypotheses

**TC-1 — Token-budget probe** (distinguishes H1 vs H2 vs others)

```
SETUP: Spawn fork from current 840k+ context session.
PROMPT: "Output exactly the string: 'PROBE-RECEIVED' and nothing else."
INSTRUMENT: Capture OTEL `usage.input_tokens`, `usage.output_tokens`, `usage.cache_read_tokens` from the response.
EXPECTED-H1: output_tokens == 0 (budget hit before any token emitted) — empty result
EXPECTED-H2: output_tokens > 0 but doesn't include "PROBE-RECEIVED" — partial (rules out H1; suggests H2 if many tool-result accumulations precede the synthesis)
EXPECTED-H3-H4: output_tokens contains "PROBE-RECEIVED" — both H1 and H2 ruled out for trivial tasks
INTERPRETATION: If empty under trivial prompt, H1 strongly suspected. If non-empty under trivial prompt but empty under heavy tool-use prompt, H2 strongly suspected.
```

**TC-2 — PreCompact race probe** (distinguishes H3 from others)

```
SETUP: Spawn fork from current 840k+ context session. Disable PreCompact temporarily by setting tmp/precompact.log to read-only.
PROMPT: Same multi-tool-call prompt that previously returned empty (e.g., reproduce P1c "ecosystem-audit" sequence from W339 SYNTHESIS L18).
INSTRUMENT: Re-check empty-rate post-tasks (need ≥5 trials).
EXPECTED-H3: empty-rate drops to ~0% when compaction is suppressed → H3 confirmed.
EXPECTED-OTHERS: empty-rate persists at ~37% → H3 ruled out.
INTERPRETATION: Carefully — this test ALSO requires monitoring whether the fork hits the compact threshold (if it doesn't, the test is inconclusive).
```

**TC-3 — Fork-vs-task probe** (distinguishes H4 from others)

```
SETUP: Run the SAME P0a/P0c/P1c failing prompts as W339 from current session, but in TWO modes:
       (a) with CLAUDE_CODE_FORK_SUBAGENT=1 (current default — known-failing)
       (b) with CLAUDE_CODE_FORK_SUBAGENT=0 (no fork, regular Task tool)
TRIALS: ≥5 each mode.
INSTRUMENT: empty-final-message-guard count of empty-result occurrences in each mode.
EXPECTED-H4: empty-rate ~37% in mode (a) vs ~0% in mode (b) → H4 confirmed (fork inheritance is the cause).
EXPECTED-OTHERS: empty-rate similar in both modes (~37% / ~37%) → H4 ruled out; cause is general large-context output budget issue.
INTERPRETATION: This is the most directly actionable test — if confirmed, mitigation is `CLAUDE_CODE_FORK_SUBAGENT=0` for high-parent-context sessions.
```

### E.3 Catcher reference

`.claude/skills/empty-final-message-guard/SKILL.md` (per W339-P0b Gap-1 + L60-61 SYNTHESIS):

- **Trigger**: auto-fires on "synthesize results", "collect findings", "merge teammate outputs", "subagent completed", "team-spawn", or any agent-completion notification (per skill description).
- **Enforcement**: empty-final-message → re-dispatch with stricter format reminder OR record OrchestrationError + escalate to operator.
- **Status**: PATTERN-INSTALLED — active for W340. Did not fire during W339 forks because the forks completed BEFORE the skill landed (closure happened mid-wave); now active for W340+.
- **Gap remaining**: skill is advisory (no hard mechanization). To convert to hard-gate, wire `hooks.SubagentStop` per §D.1 gap #6.

### E.4 Recommended next-action priority

| # | Action | Carrier | Cost |
|---|---|---|---|
| 1 | Run TC-3 (fork-vs-task probe) in W341 — highest signal for actionable mitigation | operator-side script | ~5 min eval |
| 2 | Run TC-1 (token-budget probe) in W341 — establishes whether output budget is the universal upstream issue | operator-side script | ~3 min eval |
| 3 | Run TC-2 (precompact race probe) in W341 — lowest priority unless TC-1 + TC-3 rule out H1/H2/H4 | operator-side script | ~10 min (requires read-only log) |
| 4 | If TC-1 or TC-3 confirms a hypothesis → file CC GitHub issue + propose `CLAUDE_CODE_FORK_OUTPUT_BUDGET_RESERVE_TOKENS` env var (analogous to existing reserve mechanisms) | operator-side action | external |
| 5 | Mechanize Δ-G49 via `hooks.SubagentStop` for hard-gate enforcement | settings.json edit | ~30 min |

---

## §6 — Concrete next-actions (file:line index)

| # | Action | File | Line | Owner | Priority |
|---|---|---|---|---|---|
| 1 | Apply Edit 1-4 of §A to sca-v14 SKILL.md to land sca-v15 (D76-D80 + lineage + denom + title) | `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md` | L12, L168, L189, ~L300 (denom_install) | operator-sign | P1 |
| 2 | `git add docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/` + commit per §B.2 late-attribution message | repo root | (12 files in dir) | operator | P1 |
| 3 | Apply Edit of §C.3 to CLAUDE.md L35 (enabled_true 59→58, enabled_false 9→10, add Δ note) | `Z:\claude-sota-installed\CLAUDE.md` | L35 | operator-sign | P1 |
| 4 | Decide rationale on `self-improving-agent@claude-code-skills` disable (intentional? if so, document; if not, re-enable) | `Z:\claude-sota-installed\.claude\settings.json` | L309 | operator | P2 |
| 5 | Add 4 OTEL env vars to settings.json (METRICS_EXPORTER, LOGS_EXPORTER, OTLP_HEADERS, SERVICE_NAME) per §D.2 gaps #1-#4 | `Z:\claude-sota-installed\.claude\settings.json` | env block L5-50 | operator | P1 (SEV-1 ×3) |
| 6 | Run TC-1 + TC-3 probes per §E.2 in W341 to disambiguate fork-empty hypothesis space | operator-side scripts | new | operator | P2 |
| 7 | Optionally mechanize Δ-G49 via `hooks.SubagentStop` per §D.2 gap #6 | `Z:\claude-sota-installed\.claude\settings.json` | hooks block | operator | P3 |
| 8 | Re-probe load_failures=1 (CLAUDE.md L35) to verify `everything-claude-code@everything-claude-code` still failing — investigate W337-AI-11 | runtime probe | new wave | operator | P2 |
| 9 | Update CLAUDE.md L31 skills-count if `worker-failure-termination-guard` added since W333 (was 46; now likely 47 per skill verified `Test-Path = True`) | `Z:\claude-sota-installed\CLAUDE.md` | L31 | operator-sign | P3 |

---

## Provenance

- W339 source artifacts:
  - `docs/architecture/W339-FULL-SOTA-UNLEASH/P1b-RESEARCH-ARCH-UPGRADE.md:55-66` (5 new dim defs)
  - `docs/architecture/W339-FULL-SOTA-UNLEASH/SYNTHESIS.md:14, L34-44, L60-61` (P0b verdict, sca-v14 dim table, fork anti-finding)
- W338 source artifacts:
  - `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/README.md`
  - `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/OPERATOR-RUNTIME-MITIGATION.md`
  - `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/VERDICT-LEDGER.md`
- Live probes (2026-05-20):
  - `git log --all --oneline | grep -iE 'cpa|router|529|w338'` → no W338-CPA commit on any branch
  - `git status --short` → `?? docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/` confirmed untracked
  - `Get-ChildItem .claude/plugins/cache -Directory | Measure` → 15
  - `Get-ChildItem .claude/plugins/marketplaces -Directory | Measure` → 23
  - `known_marketplaces.json` records → 22; `installed_plugins.json.plugins` records → 64
  - `settings.json.enabledPlugins` → 68 entries (58 true / 10 false) — drift vs CLAUDE.md L35 (59/9) confirmed
- sca-v14 SKILL.md current state: `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md` 365 lines / 46,646 bytes; v14 W337 lineage at L12; D73-D75 + D12-swap at L178-182
- Local skill verifications (Test-Path = True):
  - `.claude/skills/empty-final-message-guard/SKILL.md` (cardinal-rule-4-compliant)
  - `.claude/skills/worker-failure-termination-guard/SKILL.md`
  - `.claude/skills/agent-budget-discipline/SKILL.md`
  - `.claude/skills/dspy-integration/SKILL.md`
  - `.claude/skills/goal-prompt-synthesis/SKILL.md`

## NO-FINDINGS sentinels

NONE required — all five parts (A-E) returned substantive non-empty content per Δ-G49 anti-pattern contract.
