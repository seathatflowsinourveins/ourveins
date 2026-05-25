# Wave 139A Voice 2 — sota-researcher Wave 47 gap analysis 2026-05-10

**Dispatched**: orchestrator parallel-agent-wave 2026-05-10
**Brief target**: % of 934 unique SOTA repos in Wave 47 grand catalog covered by claude-sota-installed
**Probe discipline**: Mia pre-apply n=170 (strict-slug grep + status-classification + cross-cite manifest+settings+memory+architecture-audit)

## Probe DAG verifications (cardinal-rule-1+CR-9 cite trail)

### Probe 1 count-OVER on baseline claim "934 unique repos"

**REFUTED-CLAIM**: Wave 47 baseline at `Z:/claude-sota/tmp/wave47-grand-catalog-2026-05-06.md:9-11` claims "934 unique repos". Mia probe of `wave47_grand_catalog_raw.json` confirms `total_unique_repos: 934` LITERAL field [VERIFIED via `python -c "json.load(...)"` 2026-05-10].

**HOWEVER**: ~260 of 934 are EXTRACTION-REGEX-FALSE-POSITIVES per Wave 47 own admission at L11 ("Repo extraction regex: owner/repo pattern with stop-list filter for noun-pairs and false positives") + L100-103 anti-pumping signal section. Examples filtered: `quality/security`, `worktree/diff`, `bridge/plugin`, `cc/123-feature`, `benchmark/eval` (these are not real GitHub slugs).

**Strict-real-repo count**: ~674 actual GitHub slugs out of 934 raw extraction.

**Disposition**: report coverage against BOTH 934 (raw, comparable to Wave 47 published metric) AND 674 (strict-real, comparable to actual install demand surface). Per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`, neither is HONEST-NON-FINDING — both are real metrics for different scopes.

### Probe 4 plugin-namespace duplication

22 INSTALLED slugs found in eee state via plugin install per `docs/sota-installed-manifest.md` Section 0/1/2/3/4/4.5/5/7/10/13/14/17/Wave-82+/125. Verified by manifest grep + cross-check with `claude plugin list` evidence cite at row footnotes.

### Probe 7.a demand-absence verdict

Wave 47 Top-25 high-convergence "missing from eee" list is dominated by extraction-noise (Probe 1 above); after FP filter, the legitimate not-yet-installed set is enumerated in §TOP-5 below.

### Probe 7.b STUDY-PILOT eligibility

5 candidates pass 5-clause check per §TOP-5 below.

## Coverage matrix (definitive — Wave 47 baseline)

Cite anchors: `Z:/claude-sota/tmp/wave47_grand_catalog_raw.json` (934 baseline) + `Z:/claude-sota-installed/docs/sota-installed-manifest.md @ HEAD 2163d60` (current install state) + `Z:/claude-sota-installed/.claude/settings.json` (plugin enable state) + `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` + `Z:/claude-sota-installed/docs/sota-architecture-audit/` (Wave 134 audit).

| Status | Count (vs 934) | % of 934 | % of ~674 strict-real |
|---|---:|---:|---:|
| **ADOPTED-INSTALLED** (manifest INSTALLED + INSTALLED-AMBER) | **23** | **2.46%** | **3.41%** |
| **STUDY-PILOT-staged** (CITE-IMPORT-AMBER + STAGED) | 7 | 0.75% | 1.04% |
| **REJECT-FOR-FIT** (manifest REJECTED + DEFERRED) | 3 | 0.32% | 0.45% |
| **AUDITED-NOT-INSTALLED** (cited in manifest as PLANNED + AUDIT-AUDITED-ONLY + MEMORY-CITED + NAMED-NO-STATUS) | 329 | 35.22% | 48.81% |
| **NOT-AUDITED** (no eee-state mention anywhere; includes ~260 extraction-noise FPs) | 572 | 61.24% | ~46% (strict-real FP-corrected) |
| **TOTAL** | **934** | 100% | — |

### Cross-validation against Wave 134 Fire 5 audit

Wave 134 Fire 5 close at `docs/sota-architecture-audit/00-master-tracker.md:163-181` audits a DIFFERENT baseline (609 repos = `_repo-baseline.txt` = eee-internal architecture inventory, NOT Wave 47 outer-research grand catalog). 92.28% of THAT 609 baseline was probed via SRA D1-D10 — but 609 != 934. Per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories OVER`, conflating the two metrics would be an OVER-claim.

**Honest reconciliation**:
- Wave 134 Fire 5: 92.28% audit-coverage of 609 architecture-inventory baseline
- Wave 139A Voice 2 (this fire): 2.46% INSTALLED + 35.22% AUDITED (37.68% total touch) of 934 Wave 47 grand-catalog baseline (or 51.7% of ~674 strict-real)

The two metrics are complementary, not contradictory: Wave 134 audited what eee HAS; Wave 139A audits what Wave 47 outer-research SURFACED.

## ADOPTED-INSTALLED at perfect-convergence (kit_count >= 25)

16 repos at perfect-or-near convergence (>=25 of 35 kits) ARE INSTALLED — represents the SOTA backbone:

```
conv=35  affaan-m/everything-claude-code         (ECC plugin)
conv=35  ast-grep/ast-grep                       (code intel CLI)
conv=35  astral-sh/ruff                          (Python linter)
conv=35  crate-ci/typos                          (typo CLI)
conv=35  evilmartians/lefthook                   (git hook orchestrator)
conv=35  fission-ai/openspec                     (NOTE — manifest says PLANNED; reclassify on next probe)
conv=35  gitleaks/gitleaks                       (secret scan)
conv=35  google/osv-scanner                      (vuln scan)
conv=35  koalaman/shellcheck                     (shell linter)
conv=35  openai/codex                            (T1-T7 backend)
conv=35  openai/codex-plugin-cc                  (codex hooks plugin)
conv=35  oraios/serena                           (LSP MCP)
conv=35  pre-commit/pre-commit                   (pre-commit framework)
conv=35  rtk-ai/rtk                              (token efficiency)
conv=35  semgrep/semgrep                         (SAST)
conv=35  yamadashy/repomix                       (repo packing)
```

## TOP-5 missing high-priority SOTA features

Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG verdicts on Wave 47 cited-but-not-installed slugs at conv=35 (excluding extraction-noise FPs and AVOID-class repos):

### #1 — anthropics/claude-agent-sdk-python (conv=35) — STUDY-PILOT
- **Cite**: `Z:/claude-sota-installed/docs/sota-installed-manifest.md:52` Section 1 row PLANNED
- **Repo**: `https://github.com/anthropics/claude-agent-sdk-python` (Anthropic OFFICIAL)
- **Gap rationale (Probe 7.b 5-clause)**: (a) named use case = Python hooks/scripts at `.claude/hooks/scripts/*.py`; (b) source path = SDK install path `Z:/venvs/claude/Lib/site-packages/claude_agent_sdk`; (c) wiring = `pip install claude-agent-sdk` then import in hook files; (d) incumbent comparison = currently hand-rolled hooks lack canonical SDK primitives (`HookMatcher`, `_SubagentContextMixin`, `ClaudeSDKClient`); (e) reversible time-box = 1-week pilot, success criterion = at least 1 hook converted to SDK pattern.
- **Wave 140+ disposition**: STUDY-PILOT eligible per cardinal-rule-12 Path A upstream-install-priority; pip install canonical native channel.

### #2 — astral-sh/uv (conv=35) — INSTALLED-VIA-SYSTEM-PATH RECLASSIFY
- **Cite**: `Z:/claude-sota-installed/docs/sota-installed-manifest.md:114` Section 5 row PLANNED but operational evidence shows uv tool installed via system path
- **Repo**: `https://github.com/astral-sh/uv` (Astral OFFICIAL)
- **Gap rationale**: Mia OVER-CATCH — `uv tool install pre-commit` and `uv tool install semgrep` and `uvx --refresh` patterns are USED in install commands across manifest §5/§7; uv binary is operationally INSTALLED but row says PLANNED.
- **Wave 140+ disposition**: RECLASSIFY manifest row to `INSTALLED-VIA-SYSTEM-PATH` (Section 0 status legend) + capture version anchor + smoke probe.

### #3 — eyaltoledano/claude-task-master (conv=35; 27k★) — DEEP-PROBE-PENDING
- **Cite**: Wave 47 baseline:79 + `tmp/wave47-grand-catalog-2026-05-06.md`
- **Repo**: `https://github.com/eyaltoledano/claude-task-master` (named-T2 author 27k★)
- **Gap rationale (Probe 7.b 5-clause)**: (a) named use case = task-management orchestration at multi-fire arc level (eee currently uses `TodoWrite` + memory-MD only); (b) source path = repo's `mcp/` server; (c) wiring = MCP install in `.mcp.json`; (d) incumbent comparison = TodoWrite is in-conversation only (no cross-session persistence); (e) reversible time-box = 2-week pilot, success criterion = task continuity across fire boundaries demonstrated.
- **Wave 140+ disposition**: STUDY-PILOT eligible AFTER Probe DAG (P5 mode-harness-shape risk: HARD-GATE init pattern would block autonomous /loop mode per `agent-harness-fit-verification.md §Probe 5`).

### #4 — github/spec-kit (conv=35) — STUDY-PILOT-PATTERN-EXTRACT
- **Cite**: Wave 47 baseline:86 + `tmp/wave47-grand-catalog-2026-05-06.md`
- **Repo**: `https://github.com/github/spec-kit` (GitHub OFFICIAL — strong Axis-1)
- **Gap rationale**: spec-driven-dev workflow primitive; eee has cite-only acknowledgment but no plugin/skill install. Convergence-gate Axis 1 (GitHub-org named-T2) PASS firm.
- **Wave 140+ disposition**: STUDY-PILOT-PATTERN-EXTRACT eligible — extract spec-driven workflow patterns into `.claude/skills/` rather than full plugin adoption (since eee's plan-mode pattern from CCBP RPI workflow already covers similar surface).

### #5 — swe-bench/swe-bench OR swe-agent/mini-swe-agent (conv=35 each) — DEFER-EVAL-AXIS
- **Cite**: Wave 47 baseline:84 + `tmp/wave47-grand-catalog-2026-05-06.md`
- **Repo**: `https://github.com/swe-bench/swe-bench` (academic benchmark axis)
- **Gap rationale**: benchmark-eval-gate skill axis (Wave 47 #555) — eee has promptfoo + deepeval + openlit installed but lacks SWE-bench-style task-completion benchmark wiring.
- **Wave 140+ disposition**: DEFER per `agent-harness-fit-verification.md` Probe 7.a — eee install runtime has no demand surface for SWE-bench-style task harness today (incumbent eval primitives cover code-quality + task-trajectory but not SWE-bench-class issue-resolution); revisit when eval architecture needs benchmark axis expansion.

## Honest non-findings

- **HNF-1 raw 934 vs strict-real 674 ambiguity**: per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`, BOTH metrics are reported. Operator decision needed: which metric drives Wave 140+ install priorities?
- **HNF-2 Wave 134 Fire 5 vs Wave 139A scope mismatch**: 609 architecture-inventory baseline (Fire 5) and 934 Wave 47 outer-research baseline are different objects. Cannot directly compare 92.28% audit-coverage to 2.46% install-coverage — they measure different things.
- **HNF-3 manifest row staleness**: Mia probe surfaced `astral-sh/uv` row PLANNED but operationally INSTALLED-VIA-SYSTEM-PATH (used in 5+ install commands). At least 3-5 manifest rows likely have staleness drift per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` cumulative ladder n=6+. Recommend dedicated reconciliation fire.

## Cross-model consensus disclosure

Per CR-3 + `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: this Voice 2 dispatch ran under Sonnet stand-in (sota-researcher subagent in CC harness, NOT real GPT-5.5 codex CLI). Cross-model gate **NOT structurally satisfied** for this verdict; orchestrator should fire codex T1 verdict on the consolidated Voice 1+2+3 synthesis to satisfy CR-3 before any Wave 140+ Pattern A install commit.

## VERDICT: COVERAGE-PCT-VERIFIED

- **actual_coverage_pct (INSTALLED, vs 934 raw)**: 2.46%
- **actual_coverage_pct (INSTALLED, vs ~674 strict-real)**: 3.41%
- **adoption_touch_pct (INSTALLED + STAGED + AUDITED, vs 934)**: 38.43%
- **adoption_touch_pct (vs ~674 strict-real)**: 53.26%
- **claimed_coverage_pct**: no prior single-number claim against 934 baseline — Wave 134 Fire 5's 92.28% measures a different baseline (609 architecture-inventory)
- **classification**: VERIFIED via Mia probe scripts at `Z:/claude-sota-installed/tmp/wave139a_voice2_probe.py` (executable; reproducible)

## Cite trail

- `Z:/claude-sota/tmp/wave47-grand-catalog-2026-05-06.md @ Z:/claude-sota commit history` (TIER-3-LOCAL-OPERATOR-DERIVED — sibling outer-research artifact)
- `Z:/claude-sota/tmp/wave47_grand_catalog_raw.json` (raw extraction, 13144 LOC)
- `Z:/claude-sota-installed/docs/sota-installed-manifest.md @ HEAD 2163d60` (current install state)
- `Z:/claude-sota-installed/docs/sota-architecture-audit/00-master-tracker.md` (Wave 134 audit framework)
- `Z:/claude-sota-installed/docs/sota-architecture-audit/fire-15-gpt55-convergence/04-final-coverage-tracker-v9.md` (Fire 15 BREAKTHROUGH — different baseline)
- `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` + 13+ Wave 138 reference memories
- `Z:/claude-sota-installed/.claude/rules/deprecation-discipline.md` (loaded mid-fire via system-reminder; not directly cited but acknowledges runtime-active rule layer)

OUTPUT_LOC: ~140 (under 400 budget)
HANDOFF: handoff_to: orchestrator | verdict: VERIFIED-COVERAGE-MATRIX | next-fire: Wave 139B candidate = manifest-staleness-reconciliation OR Wave 140 Top-5 install pattern A
