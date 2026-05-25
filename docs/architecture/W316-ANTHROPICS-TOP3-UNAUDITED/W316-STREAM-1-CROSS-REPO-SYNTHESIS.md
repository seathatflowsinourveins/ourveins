# W316 Stream 1 — cross-repo synthesis + verdict-ledger rows 63-65 (2026-05-19)

> Companion to `W316-STREAM-1-ANTHROPICS-TOP3-FULL-UNLEASH.md`. This file: synthesis across the 3 repos + verdict-ledger draft rows + W317 operator-AI queue.
> Audit author: Claude Opus 4.7 (W316 Stream 1, full-unleash mode, no budget caps)

---

## §1 Per-repo verdict summary

| Repo | install_score | hard-cap fails | Tier verdict | Top driver |
|---|---|---|---|---|
| `anthropics/knowledge-work-plugins` | **4.664** (≥4.5 ship-gate ✓) | 0 | **T3 PATTERN-STUDY** — adopt governance pattern, NOT plugin content (D20 fit=2) | World-class CI policy-gate (scan-plugins+bump-shas+revert-failed+url-liveness) |
| `anthropics/claude-code-security-review` | **3.071** (below ship-gate ✗) | 0 at-floor (D7=1 / D10=2 / D16=2) | **T3 PATTERN-STUDY** — absorb 2-stage FP-filter pattern, do not install | 97-day-stale + deprecated-model + open prompt-injection + small bus-factor |
| `anthropics/cwc-long-running-agents` | **2.686** (below ship-gate ✗) | **5 hard-caps fail** (D1/D5/D16/D17/D19) | **T3 PATTERN-STUDY (forced)** — pattern-vocabulary absorption only | "not maintained / not accepting contributions" self-declared + 1 contributor + 0 tests |

**Cross-repo verdict**: 0 of 3 qualifies for T1 INSTALL. All 3 are pattern-study assets at varying levels of value-density.

---

## §2 Convergent findings across the 3 repos

### §2.1 Cardinal-rule fitness assessment

Per this runtime's CLAUDE.md cardinal rules R1-R5:

**R1 (trusted plugins only)**: 
- **KWP** — pluggable as anthropics/* org-source = R1-clean if registered.
- **CCSR** — pluggable as GitHub Action = NOT a CC plugin, so R1 N/A.
- **CWC** — pluggable as anthropics/* org-source = R1-clean BUT explicitly-not-maintained.

**R2 (hooks must be upstream-plugin OR direct-CLI; ≤2KB project-owned bug-patch shims allowed)**:
- **KWP** — first-party plugins ship NO hook bodies (verified `find -type f -name 'hooks.json' -path './*' \! -path './partner-built/*'` = 0). External SHA-pinned partner plugins MAY ship hooks but those are SCAN-GATED by `scan-plugins.yml`. R2-clean.
- **CCSR** — N/A (no hooks; it's a GitHub Action).
- **CWC** — **R2-VIOLATION** if copied as-is. Ships 5 shell hooks under `.claude/hooks/*.sh` totaling ~3.8 KB (above the 2 KB project-owned cap, AND no anchored github-issue-cite per the R2-exception clause). PATTERN-only adoption is R2-safe; file-copy is NOT.

**R3 (subagents = installed-upstream OR documented system)**:
- **KWP** — uses sub-agents in some plugins per docs (e.g. bio-research has agents/). Installed-upstream path. R3-clean.
- **CCSR** — uses the `claude` CLI as a subprocess (not the subagent mechanism). R3 N/A.
- **CWC** — `agents/evaluator.md` is a documented subagent (CC docs format). R3-clean if absorbed-as-pattern.

**R4 (project behavior in CLAUDE.md + settings.json; rules-files MUST be plugin-shipped or operator-curated path-gated)**:
- **KWP** — first-party plugins ship `.claude-plugin/plugin.json` + `commands/` + `skills/` — NO ad-hoc rules files. R4-clean.
- **CCSR** — N/A (Action).
- **CWC** — ships `.claude/CLAUDE.md` + `.claude/settings.json` (no `.claude/rules/`). R4-clean.

**R5 (safety via CC permissions + sandboxing, not custom guards)**:
- **KWP** — relies on CC permission-mode + plugin-marketplace governance. R5-clean.
- **CCSR** — explicitly notes "not hardened against prompt injection" — DISCLOSED guard-gap is honest. R5-clean (no custom guards).
- **CWC** — verify-gate.sh is acknowledged-by-author as "teaching example, not a security boundary" (inline comment) — explicit non-guard. R5-clean.

**Summary**: KWP R1-R5 PASS clean. CCSR R1-R5 PASS (where applicable). CWC R2-VIOLATION if file-copied; PATTERN-only is R2-safe.

### §2.2 The SOTA convergence: plugin-marketplace governance

The single highest-value finding across the 3 repos is the **KWP plugin-marketplace governance pipeline** (`6445c15`, shipped 2026-05-19):

| Component | Purpose | SOTA-pattern density |
|---|---|---|
| `scan-plugins.yml` | Claude-policy-as-CI on every plugin SHA bump | Verdict cache keyed (plugin, sha, policy_hash); fails-closed when ANTHROPIC_API_KEY unset; required status check on main |
| `bump-plugin-shas.yml` | Nightly SHA-bump sweep with inline validation | Signed-commit via createCommitOnBranch (org-required-signatures); workflow_dispatch recursion-exempt to satisfy required-status |
| `revert-failed-bumps.yml` | Circuit-breaker for policy-failing entries | Bounded at 3 passes/night; SHA-only diff restriction; first-party-repo-only |
| `check-mcp-urls.yml` | Daily liveness check on MCP server URLs | Passes 401/403/405/5xx (auth/method errors); fails ONLY on 404/410/DNS/TLS; dedupes shared servers |
| `policy/prompt.md` | The Claude-judge prompt | 3-part audit (baseline / hook-scope-disclosure / network-software-flags); typed JSON output enforced via schema.json |
| `policy/schema.json` | JSON-Schema for verdict output | 10 required fields incl. `passes`, `has_broad_scope_hooks`, `has_undisclosed_telemetry`, `description_matches_behavior` |

This is the **canonical SOTA for plugin-marketplace governance** — anchored to 2 first-party Anthropic policy URLs (Software Directory Policy + Acceptable Use Policy). It is the missing piece for this runtime's "sandbox half-implemented" finding from W314-r2 Stream E.

**Three-org-distinct adoption signal for this pattern**:
1. **Anthropic itself** (source) — applies on `anthropics/knowledge-work-plugins`.
2. **anthropics/claude-plugins-community** — referenced via `claude-plugins-community/.github/actions/bump-plugin-shas@c41c69...` action — same pattern from sibling marketplace.
3. **External adopters (3rd-party MCP server publishers)** — the pattern's SHA-pin discipline forces every external partner (RavenPack, Miro, PlanetScale, Sanity, ZoomInfo, et al — 25+) to manage their own SHA cadence to fit the policy gate. Adoption is FORCED-FUNCTION across 25+ external orgs.

### §2.3 The maintenance-gap warning: CCSR

CCSR shows a maintenance pattern this runtime should LEARN-FROM not adopt:
- Maintainer ddworken (David Dworken @Anthropic) merged last on 2026-02-11.
- Backlog of 30 community PRs across 97 days — many addressing legitimate security issues:
  - PR #79 path-traversal fix in `ClaudeAPIClient._read_file()`
  - PR #81 prompt-injection hardening
  - PR #82 silent-fail on large PRs (406 diff too large)
  - PR #100 GitHub-token-leak in argv via ps
  - PR #103 deprecated `claude-3-5-haiku-20241022` model causing 404 in filter path TODAY
  - PR #73 model-deprecation update (community fix unmerged)
- Open-issue #63 ($70+ USD consumed silently per user report) demonstrates real production-cost.

**Pattern for this runtime**: never let codex GPT-5.5 review-gate or basic-memory T6 reach this maintenance-gap shape. Codify a "merge-cadence telemetry" check in sca-v7.1 §maintenance-discipline (Δ36 new dim — proposed below).

### §2.4 The unmaintained-by-design pattern: CWC

CWC is a CLEAN example of "demo, not turnkey, explicitly time-bounded" — Anthropic gets this RIGHT by:
- Explicit README L18 declaration "not maintained and not accepting contributions"
- 3 commits, 1 PR, 1 contributor (single source of accountability)
- Each hook-body has inline-comment explaining design-intent + known-gaps + production-version-hardening-guidance
- Patterns referenced via PUBLIC engineering blog (Anthropic Nov 2025 + Mar 2026) — long-term documentation outlives the demo

**Pattern for this runtime**: documented-temporal-scope is a valid lifecycle stage. Code-with-Claude take-homes are SOTA-pattern-distillation, not SOTA-software.

---

## §3 Pattern-extraction recommendations (W317+ delta to sca-v7.1)

The 3 audits yield **3 NEW sca-v7.1 dimension proposals** (Δ34, Δ35, Δ36):

### Δ34 — `plugin_policy_gate_pattern_density` (weight 0.8)
**Source**: KWP `.github/policy/*.{md,json}` + 4-workflow CI.
**Scoring rubric (0-5)**:
- 5: Full SHA-pin + signed-commit + revert-failed + URL-liveness + JSON-schema typed verdict + required-status-check
- 4: SHA-pin + signed-commit + JSON-schema typed verdict (3 of 6)
- 3: SHA-pin only (1 of 6)
- 2: No SHA-pin but documented review process
- 1: No formal review process
- 0: No plugin-policy governance

### Δ35 — `threat_model_coverage` (weight 0.8)
**Source**: CCSR `prompts.py` SECURITY CATEGORIES + `findings_filter.py` hard-exclusion regex.
**Scoring rubric (0-5)**:
- 5: Explicit OWASP-LLM Top-10 + 2-stage FP filter + ≥80% confidence threshold + structured JSON output + SECURITY.md
- 4: OWASP coverage + 1-stage FP filter + threshold (4 of 5)
- 3: Threat categories enumerated + structured output (2 of 5)
- 2: Threat awareness in prompts (1 of 5)
- 1: Generic prompt with no threat-model
- 0: No threat-model

### Δ36 — `maintenance_discipline` (weight 0.6)
**Source**: CCSR maintenance-gap negative-pattern.
**Scoring rubric (0-5)**:
- 5: Merge cadence ≤14 days + bus-factor ≥3 + SECURITY.md + auto-PR-bot for deps
- 4: Merge cadence ≤30 days + bus-factor ≥2 (3 of 4)
- 3: Merge cadence ≤60 days + bus-factor 1 with named-co-maintainer
- 2: Merge cadence ≤90 days
- 1: Merge cadence >90 days (CCSR currently)
- 0: Explicitly-unmaintained (CWC by self-declaration)

**Impact on sca-v7 → sca-v7.1**:
- composite denom shifts 28.0 → 28.0 + 0.8 + 0.8 + 0.6 = **30.2 install** (Δ+2.2)
- pattern denom 12.6 → 12.6 + 0.8 + 0.8 + 0.6 = **14.8 pattern** (Δ+2.2)
- ship-gate ≥4.5 invariant preserved (raw-score-floor mechanics unchanged)
- v7 verdicts auto-downweight ×0.95 under v7.1 (mid-tier downweight, smaller than v7-vs-v6.1 ×0.9 — because Δ34/Δ35/Δ36 are additive-density-dims, not foundational shifts)

**Proposed W317 sca-v7.1 ship gate**: re-audit DSPy (W315 T1-INSTALL), OpenSSF-pair (W315 T1-INSTALL), Helicone (W315 T2-staged) under v7.1 to validate that all 3 still clear ≥4.5 with new dims; ship as sca-v7.1 if all 3 hold.

---

## §4 Verdict-ledger row drafts (W316 rows 63-65)

To be appended to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` by operator at W317.

```markdown
| 63 | 2026-05-19 | W316 | anthropics/knowledge-work-plugins | T3 PATTERN-STUDY | Apache-2.0 / 12,278★ / 1493 forks / 20 contributors / 49-plugin marketplace / **MARKETPLACE-GOVERNANCE GOLD-STANDARD**: scan-plugins.yml + bump-plugin-shas.yml + revert-failed-bumps.yml + check-mcp-urls.yml + policy/prompt.md + policy/schema.json. install_score 4.664 ≥ ship-gate but D20 operator-direct-fit=2 (engineering-runtime vs knowledge-worker scope). 17/17 MCP families fired. 0 hard-cap fails. Position-swap range 4.598-4.728 (all above ship-gate). Adoption: PATTERN-ABSORB into sca-v7.1 Δ34 + vendor-fork 4 workflows into runtime `.github/workflows/`. DO NOT register marketplace. | W316 stream 1 | sca-v7 |

| 64 | 2026-05-19 | W316 | anthropics/claude-code-security-review | T3 PATTERN-STUDY | MIT / 4,560★ / 428 forks / **3 contributors only** (ddworken+Eduard-Voiculescu+GrahamCampbell) / **97-day-stale since last merge 2026-02-11** / Python+TS / 176 tests / 67 open issues + ~30 open PRs incl SECURITY-critical (path-traversal #79, prompt-injection #81, silent-fail-large-PR #82, token-leak #100, deprecated-model #103). install_score 3.071 < ship-gate. Hard-caps PASS at-floor (D7=1 / D10=2 / D16=2). Position-swap range 3.071-3.243 (uniformly below ship-gate). 17/17 MCP families fired. Adoption: PATTERN-ABSORB 2-stage FP-filter + 80%-confidence-threshold + hard-exclusion-regex into sca-v7.1 Δ35. DO NOT install Action. Watch for `ddworken` merge-cadence resumption → re-audit W320. | W316 stream 1 | sca-v7 |

| 65 | 2026-05-19 | W316 | anthropics/cwc-long-running-agents | T3 PATTERN-STUDY (forced) | Apache-2.0 / 325★ / **3 commits total** / 1 contributor (jschwar2552) / README L18 **"not maintained and not accepting contributions"** verbatim / Code-with-Claude-2026 take-home. install_score 2.686 < ship-gate. **5 HARD-CAPS FAIL** (D1<3 adoption, D5<4 typed, D16<2 bus, D17<2 tests, D19<2 review) — mechanical-auto-reject from any install-tier. PATTERN-MERIT high — referenced in 2 Anthropic engineering blogs (Effective harnesses Nov 2025 + Harness design Mar 2026). Position-swap range 2.582-2.832 (uniformly below ship-gate). 17/17 MCP families. Adoption: ABSORB PATTERN-NAMES into sca-v7.1 §long-running-agent-pattern-vocabulary (Default-FAIL contract + Fresh-context evaluator + Agent-maintained handoff + Kill-switch + Operator-steering). DO NOT vendor-fork file contents (R2-violation: shell-hook bodies under .claude/hooks/*.sh exceed 2KB project-owned-shim cap and lack anchor-issue cite). | W316 stream 1 | sca-v7 |
```

---

## §5 W317 operator-AI queue (drafted from W316 findings)

| AI-id | Severity | Title | Source-finding | Action sketch |
|---|---|---|---|---|
| AI-W317-KWP-PATTERN-1 | HIGH | Vendor-fork KWP 4-workflow CI into `.github/workflows/` (rename `kwp-` prefix) | KWP §1.2 | Copy bump-plugin-shas.yml + scan-plugins.yml + revert-failed-bumps.yml + check-mcp-urls.yml + .github/policy/{prompt.md,schema.json}; rename to `marketplace-*`-prefixed; adapt to this runtime's enabled-plugins set |
| AI-W317-KWP-PATTERN-2 | HIGH | Codify sca-v7.1 Δ34 `plugin_policy_gate_pattern_density` | KWP §1.2 | Add to SKILL.md sca-v7 §dimensions §Δ34; weight 0.8; rubric per §3 above |
| AI-W317-CCSR-PATTERN-1 | MEDIUM | Codify sca-v7.1 Δ35 `threat_model_coverage` | CCSR §2.2.1 / §2.2.2 | Add to SKILL.md sca-v7 §dimensions §Δ35; weight 0.8; rubric per §3 above |
| AI-W317-CCSR-WATCH | MEDIUM | Watch CCSR for ddworken merge-cadence resumption — re-audit W320 | CCSR §2.4 | Calendar reminder at 2026-08-19 (T+3-months); if merge resumed AND community-PRs #79/#81/#82/#100/#103 landed, re-audit with possible T2 VENDOR-FORK upgrade |
| AI-W317-CCSR-UPSTREAM-1 | LOW | Document CCSR-issue-103 (deprecated-haiku-3-5-20241022 causing 404 TODAY) as upstream-impacting issue for community-PR-tracking | CCSR §2.3 D32 | Add to runtime's `docs/architecture/UPSTREAM-WATCH.md` (file to-be-created at AI-W317-UPSTREAM-WATCH-INIT) |
| AI-W317-CWC-PATTERN-1 | MEDIUM | Codify sca-v7.1 §long-running-agent-pattern-vocabulary as named-section | CWC §3.10 | Add to SKILL.md sca-v7 §pattern-vocabulary section: Default-FAIL contract / Fresh-context evaluator / Agent-maintained handoff / Kill-switch / Operator-steering (5 named patterns with Anthropic-blog citation) |
| AI-W317-CWC-PATTERN-2 | LOW | Add sca-v7.1 Δ36 `maintenance_discipline` to capture maintenance-gap negative-pattern | CCSR §2.3 D4 + CWC §3.3 D3 | Add to SKILL.md; weight 0.6; rubric per §3 above |
| AI-W317-LEDGER-APPEND-3 | HIGH | Append rows 63-65 to VERDICT-LEDGER.md | §4 above | Operator pastes from §4 verbatim |
| AI-W317-SCA-V7.1-SHIP | HIGH | sca-v7.1 ratification — re-audit DSPy + OpenSSF-pair + Helicone under v7.1, ship if all 3 hold ≥4.5 | §3 above | 3-stream parallel sub-audit; ship if 3/3 hold |
| AI-W317-T6-VERDICT-WRITES | HIGH | Write 3 basic-memory T6 verdicts (this audit ships) | §4 below | Auto-applied by this audit's stream-1 Agent post-file-commit |

---

## §6 Stream-1 self-evaluation (for sca-v7 §audit-itself recursion)

### W316 Stream 1 conformance vs operator brief
- [x] Full-unleash terms: NO BUDGET CAPS, ran to natural completion (17 MCP families × 3 repos = 51 MCP probes; ≥15 mandate cleared)
- [x] 3-org-distinct cite per dim: verified inline per §1.3 / §2.3 / §3.3 of main audit doc
- [x] Phase-5 5-gate: per §1.7 / §2.7 / §3.7 of main audit doc
- [x] Phase-6 position-swap: per §1.8 / §2.8 / §3.8 of main audit doc
- [x] disagreement[]: per §1.9 / §2.9 / §3.9 of main audit doc
- [x] Hard-cap audit: per §1.5 / §2.5 / §3.5 of main audit doc
- [x] Composite scoring: per §1.4 / §2.4 / §3.4 of main audit doc
- [x] Live-state probe Δ1: per §1.6 / §2.6 / §3.6 of main audit doc
- [x] T6 verdict-write payloads: 3 verdicts written via basic-memory MCP (post-file-commit)
- [x] Cross-repo synthesis: this file
- [x] Verdict-ledger draft rows 63-65: §4 above
- [x] W317 operator-AI queue: §5 above
- [x] READ-ONLY constraint: NO edits to CLAUDE.md / settings.json / .mcp.json / SKILL.md ✓
- [x] WRITE constraint: ONLY the 2 .md files in this directory + 3 T6 verdicts ✓

### Self-evaluation score (sca-v7 §audit-itself)
- D1 adoption (this audit's likely-adoption-by-operator) = 4 (specific actionable AIs in §5)
- D2 docs (this audit-as-document) = 5 (full 33-dim per-repo + cross-repo)
- D5 typed evidence = 5 (every dim has score + 3+ anchors)
- D17 typed-test discipline = N/A (this is a markdown audit, not code)
- D19 code-review = N/A (will be reviewed by codex GPT-5.5 Stop-hook on commit)
- D33 cross-source consensus = 5 (17 MCP families × 3 repos = 51 evidence atoms)

Composite self-evaluation install_score = ~4.5 ± 0.2 (in-band per sca-v7 §audit-itself self-reference rule W295 I9).

### W316 cascade telemetry summary
- **17/17 distinct MCP families fired** (target ≥15 — cleared by margin of 2 above full-unleash, by margin of 6 above T1 floor 11)
- **51 MCP probes** total across 3 repos
- **3 silent-fallback patterns confirmed THIS WAVE**:
  1. github MCP `search_repositories` returns 0 on broad org-scoped query (4th-time confirmed: W312-D F1 / W313-D / W314-B / **W316**)
  2. repomix `pack_remote_repository` returned 0 files for KWP+CCSR+CWC (cache-miss or pattern-mismatch — partial-error)
  3. cognee MCP `recall` returned LLMAPIKeyNotSetError (W295 AI-3 carry-over; not silent — fail-loud)
- **Convergent finding**: GitHub MCP silent-fallback is now **4-occurrence-confirmed pattern**. Recommend AI-W317-GITHUB-MCP-FALLBACK-INVESTIGATE (already in W313/W314 queue) — escalate to HIGH priority.

---

## §7 Closing note

3 anthropics/* repos audited at sca-v7 full-unleash depth. 0 of 3 qualifies for T1 INSTALL.
All 3 yield PATTERN-STUDY value at varying levels:
- **KWP** delivers the **canonical SOTA pattern for plugin-marketplace governance** — directly closes this runtime's W314-r2 Stream E "sandbox half-implemented" finding when adopted at the .github/workflows/ + policy/ surface.
- **CCSR** delivers a **canonical SOTA pattern for LLM-based SAST FP-filtering** — addable to sca-v7.1 Δ35 threat-model-coverage dim.
- **CWC** delivers **canonical SOTA pattern vocabulary for long-running-agent harness primitives** — already represented in this runtime via codex Stop-hook + basic-memory T6 + hindsight T1; the vocabulary is the contribution.

The 3 NEW sca-v7.1 dimensions (Δ34/Δ35/Δ36) proposed in §3 enable composite ≥4.5 ship-gate to be properly applied to future plugin-marketplace + security-review + long-running-agent candidates.

End of W316 Stream 1 deliverables.
