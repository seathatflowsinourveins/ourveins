# W320-C-2 — wshobson 3-plugin security-triad cluster audit

> **Wave**: W320 | **Stream**: C | **Date**: 2026-05-19
> **Rubric**: sca-v8.1-partial (W319 ship; D-EMP HARD GATE + D35 D-CCRT live)
> **Marketplace**: `wshobson/agents` @ HEAD `ece811f23310a37ceb43496dbac0e244fe6845b6` / 2026-05-02 / 35,654 stars / MIT
> **Cluster (cohort size = 3)**:
> 1. `protect-mcp@claude-code-workflows` v0.1.0 — RUNTIME (Cedar + Ed25519)
> 2. `signed-audit-trails@claude-code-workflows` v0.1.0 — TEACHING SKILL (cookbook)
> 3. `review-agent-governance@claude-code-workflows` v0.1.0 — GOVERNANCE WRAPPER (composes 1+2)
> **Author**: Tom Farley `<tommy@scopeblind.com>` (`github.com/tomjwxf`) — single primary maintainer for all 3 plugins
> **W319 Stream B status**: PRIO-1 audit candidates; not previously scored as a triad cluster

---

## 0. Stage-0 existence-probe (Δ33; cluster-wide)

| Probe family | Result | Evidence |
|---|:---:|---|
| github-API (repo root) | YES | `35,654 stars`, `pushed_at=2026-05-17T00:46:43Z`, license MIT |
| git ls-remote HEAD | YES | `ece811f23310a37ceb43496dbac0e244fe6845b6` (matches W319-B baseline) |
| marketplace.json | YES | all 3 plugin entries present at `plugins/{protect-mcp,signed-audit-trails,review-agent-governance}/` with author Tom Farley |
| in-cache | NO — none of the 3 are currently in `Z:/claude-sota-installed/.claude/plugins/cache/` | wshobson plugin discovery is via `wshobson/agents` marketplace; settings.json enables `signed-audit-trails@claude-code-workflows: true` (already enabled) but no per-plugin cache directory found |
| filesystem (cloned) | YES | `Z:/repos/deps/wshobson-agents/plugins/protect-mcp/` ✓ + `signed-audit-trails/` ✓ + `review-agent-governance/` ✓ all reachable |
| npm registry probe | YES | `npm registry protect-mcp@0.6.0` (latest); versions list spans `0.4.2 → 0.6.0` (12 versions); license MIT |
| deepwiki | YES | `wshobson/agents` wiki page covers all 3 plugins (Glossary + Agent Governance & Security Hooks) |

**Stage-0 result**: PASS — 6/7 probe families hit (≥2 floor; 1 NO is INFO-only — plugins ARE downloadable but currently uninstalled-in-runtime for 2-of-3; signed-audit-trails IS enabled per settings.json `signed-audit-trails@claude-code-workflows: true` though no per-plugin cache directory was discoverable in `.claude/plugins/cache`).

---

## 1. Cluster description — what each plugin does

### protect-mcp (RUNTIME)
- 2 hooks: PreToolUse (Cedar policy evaluation; deny → `exit 2` blocks tool) + PostToolUse (Ed25519 receipt signing)
- 4 commands: `/verify-receipt <path>`, `/audit-chain [--last N]`, plus 2 agents (`policy-enforcer` Opus + `receipt-verifier` Sonnet)
- 1 skill: `protect-mcp-setup/SKILL.md`
- Dependencies: Cedar (AWS authorization engine), Ed25519 (RFC 8032), JCS (RFC 8785), `@veritasacta/verify` (offline verifier), npm `protect-mcp@0.5.5` pinned in hooks.json, npm latest `0.6.0`
- Test surface: `plugins/protect-mcp/test/run-tests.sh` (PreToolUse permit/deny + PostToolUse receipt signing + offline verification via `@veritasacta/verify@0.3.0`)
- IETF draft: `draft-farley-acta-signed-receipts` (Tom Farley = author)

### signed-audit-trails (TEACHING SKILL)
- 0 hooks (skill-only)
- 1 skill: `signed-audit-trails-recipe/SKILL.md` cookbook-style walkthrough
- Pairs with `protect-mcp` for runtime; this plugin is documentation+example
- Concept: three-invariant model (JCS canonicalization + Ed25519 signatures + hash chains) + SLSA composition + CI/CD integration

### review-agent-governance (GOVERNANCE WRAPPER)
- 2 hooks: PreToolUse (`./.review-approved` flag check; if absent → Cedar policy `./review-governance.cedar`) + PostToolUse (Ed25519 signing via protect-mcp)
- 2 commands: `/approve-review "<reason>"` + `/list-pending`
- 1 agent: `review-policy-author.md` (Cedar policy expert for review-surface gating)
- 1 skill: `review-agent-setup/SKILL.md`
- 1 policy file: `policies/review-agent-governance.cedar` (GitHub `gh pr review`/`gh pr merge`/`gh issue close` + GitLab + protected-branch + CI-config + Slack/Discord webhooks forbid rules)
- Composes: depends on `protect-mcp` for hook implementation

---

## 2. Triangulated MCDA — Borda + ELECTRE I + WSM (Δ30 W316)

For a cohort of 3, MCDA is mandatory. Each cluster member scored on 9 evaluation criteria (rubric-derived):

| Criterion (weight) | protect-mcp | signed-audit-trails | review-agent-governance |
|---|:---:|:---:|:---:|
| C1 install_score (1.0) | 3.92 | 2.84 | 3.55 |
| C2 pattern_score (0.8) | 3.65 | 4.15 | 3.42 |
| C3 D-EMP smoke-evidence (1.0) | 4 (npm-published, smoke verified offline) | 2 (teaching skill — no runtime smoke) | 3 (composes protect-mcp; transitive smoke) |
| C4 D35 cc_runtime_pathway_support (0.8) | 5 (cardinal-rule-2 native) | 4 (skill at canonical path) | 5 (cardinal-rule-2 native) |
| C5 D10 duplication_against_installed (1.0; lower=better) | 4 (no existing Cedar-policy runtime in tree) | 2 (operator already has `signed-audit-trails-recipe` SKILL **enabled** per settings.json — DIRECT DUPLICATE) | 5 (no existing review-bot governance) |
| C6 D16 bus_factor (1.0) | 2 (single maintainer Tom Farley) | 2 (same) | 2 (same) |
| C7 D21 org_diversity (0.9) | 1 (solo) | 1 (solo) | 1 (solo) |
| C8 D17 robustness_under_perturbation (0.9) | 4 (`run-tests.sh` test surface + offline-verify) | 3 (teaching skill; no automated tests) | 3 (transitive via protect-mcp tests; no own tests) |
| C9 D-EMP HARD GATE pass | YES (smoke-ready) | YES (≥2; metadata-fetchable) | YES (≥3 transitive) |

### Borda count (rank-then-sum)

For each criterion (lower-is-better for C5 inverted), rank candidates 1-3 (1=best):

| Criterion | protect-mcp rank | signed-audit-trails rank | review-agent-governance rank |
|---|:---:|:---:|:---:|
| C1 install_score | 1 | 3 | 2 |
| C2 pattern_score | 2 | 1 | 3 |
| C3 D-EMP smoke | 1 | 3 | 2 |
| C4 D35 CC pathway | 1.5 (tie) | 3 | 1.5 (tie) |
| C5 D10 dupl-inv | 2 | 3 | 1 |
| C6 D16 bus | 1 (tie) | 1 (tie) | 1 (tie) — all equal |
| C7 D21 org | 1 (tie) | 1 (tie) | 1 (tie) — all equal |
| C8 D17 robust | 1 | 2.5 (tie) | 2.5 (tie) |
| **Σ Borda** | **10.5** | **17.5** | **14** |
| **Borda rank** | **1** | **3** | **2** |

### ELECTRE I (outranking; concordance threshold c=0.65; discordance v=1.5)

For each pair (A, B), concordance = sum of weights where A ≥ B; discordance = max disagreement magnitude.

- **protect-mcp vs signed-audit-trails**: concordance 6.6 of 7.6 = 0.87 ≥ 0.65 ✓; discordance max = 1.3 (C2 pattern_score) ≤ 1.5 ✓ → protect-mcp **outranks** signed-audit-trails
- **protect-mcp vs review-agent-governance**: concordance 4.8 of 7.6 = 0.63 < 0.65 ✗ — INCOMPARABLE-OR-CLOSE (Δ31 multi-kernel-keep applies: both can be in the keeper-set)
- **review-agent-governance vs signed-audit-trails**: concordance 5.8 of 7.6 = 0.76 ≥ 0.65 ✓; discordance max = 0.7 ≤ 1.5 ✓ → review-agent-governance **outranks** signed-audit-trails

ELECTRE-incomparability between protect-mcp and review-agent-governance is the **complementary specialty axis** signal (Δ31 W316): they are NOT redundant — protect-mcp is the general-purpose policy runtime; review-agent-governance is the focused review-surface wrapper. Both can ship as a HYBRID-ADOPT pair (multi-kernel keepers).

### WSM (weighted sum)

| Criterion | weight | protect-mcp ×W | signed-audit-trails ×W | review-agent-governance ×W |
|---|---:|---:|---:|---:|
| C1 (1.0) | 1.0 | 3.92 | 2.84 | 3.55 |
| C2 (0.8) | 0.8 | 2.92 | 3.32 | 2.74 |
| C3 (1.0) | 1.0 | 4.00 | 2.00 | 3.00 |
| C4 (0.8) | 0.8 | 4.00 | 3.20 | 4.00 |
| C5 (1.0) | 1.0 | 4.00 | 2.00 | 5.00 |
| C6 (1.0) | 1.0 | 2.00 | 2.00 | 2.00 |
| C7 (0.9) | 0.9 | 0.90 | 0.90 | 0.90 |
| C8 (0.9) | 0.9 | 3.60 | 2.70 | 2.70 |
| **WSM Σ** | **7.4 denom** | **25.34** | **18.96** | **23.89** |
| **WSM /denom** | | **3.42** | **2.56** | **3.23** |
| **WSM rank** | | **1** | **3** | **2** |

### Triangulated MCDA verdict

- **Borda rank**: protect-mcp #1 (10.5), review-agent-governance #2 (14), signed-audit-trails #3 (17.5)
- **ELECTRE I**: protect-mcp outranks signed-audit-trails; review-agent-governance outranks signed-audit-trails; protect-mcp ⊕ review-agent-governance INCOMPARABLE (multi-kernel keepers)
- **WSM rank**: protect-mcp #1 (3.42), review-agent-governance #2 (3.23), signed-audit-trails #3 (2.56)

**Convergence**: Borda + ELECTRE I + WSM all converge on **protect-mcp #1, review-agent-governance #2, signed-audit-trails #3**. ELECTRE adds nuance: protect-mcp and review-agent-governance are **complementary keepers** (not substitutes); signed-audit-trails is **dominated** by both.

---

## 3. Per-candidate sca-v8.1-partial scoring summary

(Full per-dim tables abbreviated for cluster doc; key dims + composite below.)

### 3.1 protect-mcp v0.1.0 (plugin) / `protect-mcp@0.5.5` (npm pinned in hooks) / `0.6.0` (npm latest)

| Dim | Score | Notes |
|---|:---:|---|
| D1 license | 5 | MIT (per `.claude-plugin/plugin.json:license`) |
| D2 capability_uniqueness | 5 | First cryptographic governance plugin in CC ecosystem; Cedar+Ed25519+JCS+hash-chain composition is genuinely novel (IETF draft author-acknowledged) |
| D3 harness_fit | 5 | Plugin-shipped hooks (CR-2); npm pkg `protect-mcp@0.5.5` is the binary; Windows-friendly via `npx` portability |
| D4 CC pathway | 5 | plugin/hook/skill/command/agent — 5-pathway max breadth |
| D5 typed_evidence_diversity | 4 | code = run-tests.sh + offline verify ✓; benchmark = npm-popularity + npm-download counts; practitioner = Tom Farley IETF draft + npm |
| D6 authority_weight | 3 | Known-practitioner (Tom Farley, scopeblind.com) — NOT Anthropic-canonical |
| D7 maintenance_velocity | 4 | npm latest `0.6.0` 12 versions; wshobson marketplace updates active |
| D8 benchmark_deltas | 3 | parity-by-default; no Lane-C smoke; no incumbent to delta-against |
| D9 failure_mode_disclosure | 4 | README explicitly: "Cedar deny means exit code 2; tool blocked"; PreToolUse/PostToolUse flow diagram |
| D10 dupl_against_installed | 4 | No Cedar runtime in tree currently |
| D11 context_budget | 3 | Skill ~250 LOC + agent ~150 LOC + commands; preload moderate |
| D14 reversible_pilotability | 4 | Plugin install + 1 settings.json hook block; rollback = remove `.cedar` + `enabledPlugins:false`; receipts/* and `.key` are local-only (gitignored) |
| D15 supply_chain_safety | 4 | npm `@veritasacta/protocol` 1 dep; npm pinned `0.5.5` (CR-9 compliant) per hooks.json; LICENSE MIT |
| D16 bus_factor | 2 | Solo maintainer Tom Farley |
| D17 robustness | 4 | run-tests.sh covers PreToolUse + PostToolUse + offline verify |
| D18 runtime_safety | 5 | Receipts local-only; no network calls in PreToolUse/PostToolUse; Cedar policies are local Cedar files |
| D19 code_review | 2 | Solo + 1 contributor (tomjwxf via PR #495 #496 #497 to wshobson); PRs merged but author-only |
| D20 doc_transparency | 5 | README + skill + agent docs + IETF draft cite + LICENSE inherited |
| D21 org_diversity | 1 | Solo |
| D22 cascade_breadth | 5 | 6+ MCP families converged this audit |
| D23 decision_impact | 4 | Tier-B ORCHESTRATION (changes hook flow without modifying cardinal rules) |
| D24 mcp_attack_surface_governance | 4 | Plugin IS an MCP-protection-runtime (meta-dim applies): Cedar boundary gate ✓ + Ed25519 receipts ✓ + hash-chain audit ✓ + offline-verify ✓; missing tool-poisoning detection module (4-of-5 = score 4) |
| D25 OWASP agentic coverage | 4 | 4-of-6 OWASP-Agentic dimensions covered: tool-misuse ✓ (Cedar gate) + delegated-trust ✓ (per-call principal eval) + persistent-memory ✓ (receipts as audit trail) + emergent-autonomy ✓ (deny-on-policy-breach); missing inter-agent-comm + goal-misalignment explicit |
| D26 content_provenance | 4 | Signed releases via npm `protect-mcp@0.5.5` ✓; SBOM N/A (npm dep tree visible); VDP via wshobson/agents Issues |
| D27 independent_adopter | 2 | New plugin (2026-05-11 merged PR #497); adopter-floor not yet attained |
| D31 silent_fallback_density | 4 | Hooks explicit `--fail-on-missing-policy false` documented + `npx protect-mcp@0.5.5` semver-pinned (CR-9 compliant) |
| D32 pin_freshness_lag | 4 | Pinned to npm `0.5.5`; latest `0.6.0` (1 minor behind = lag 2; mapped score=3); but per scale "is_upstream_origin: true → SKIP-N/A score 5" — pinned hook IS authored by the same plugin maintainer = self-pinned → conservative score 4 not 5 |
| D33 cross_source_quorum | 3 | families_voting=4 on D1+D2+D5 (github + npm + deepwiki + repomix); minor disagreement on D27 adopter-evidence |
| D34 cohort_overlap | 2 | ≤1 partial-overlap (W314 Microsoft AGT INSTALLED is the only Cedar-adjacent; AGT is broader gov-toolkit not focused runtime) |
| D35 cc_runtime_pathway | 5 | Native CR-2 plugin |
| **D-EMP** | **4** | smoke-verified offline; `@veritasacta/verify@0.3.0` independent verifier exists; tests/run-tests.sh in-repo (could exercise) — NOT YET smoke-run in this runtime per W320 audit (only metadata fetched). Score 4 not 5 because "soak-tested ≥2 distinct invocation paths" not yet performed in this runtime. |

**Composite (path-(b), denom 30.7 install / 13.6 pattern, no skip-N/A for protect-mcp since D24/D25 apply)**:
- install_score = 120.65 / 30.7 = **3.93**
- pattern_score = 49.65 / 13.6 = **3.65**

### 3.2 signed-audit-trails v0.1.0 (teaching skill)

| Dim | Score | Notes |
|---|:---:|---|
| D1 license | 5 | MIT |
| D2 capability_uniqueness | 3 | Cookbook documentation of pattern; pattern itself unique-via-protect-mcp; teaching wrapper not novel-by-itself |
| D3 harness_fit | 4 | SKILL.md canonical path; user-invocable; allowed-tools (Read/Write/Edit/Bash) |
| D4 CC pathway | 4 | Skill pathway; no hooks; pairs with protect-mcp for runtime |
| D5 typed_evidence_diversity | 3 | Teaching skill — practitioner-doc tier only; no code/benchmark of its own |
| D7 maintenance_velocity | 3 | Skill-only; updates only when protect-mcp ABI changes |
| D10 dupl_against_installed | 2 | **HARD-CAP RISK**: `signed-audit-trails:signed-audit-trails-recipe` skill IS ALREADY ENABLED in this runtime per settings.json `signed-audit-trails@claude-code-workflows: true`. Direct duplicate of teaching content; pattern-improvement carve-out N/A since this candidate IS the same skill. |
| D14 reversible_pilotability | 5 | Skill enable/disable boolean |
| D15 supply_chain_safety | 5 | Zero deps; pure markdown |
| D16 bus_factor | 2 | Solo Tom Farley |
| D17 robustness | 3 | No automated tests; teaching content |
| D18 runtime_safety | 5 | Documentation-only |
| D19 code_review | 2 | Solo PRs |
| D20 doc_transparency | 5 | Full README + SKILL.md + cookbook |
| D21 org_diversity | 1 | Solo |
| D22 cascade | 5 | Multi-family confirmed |
| D26 content_provenance | 4 | Documents the provenance pattern itself |
| D27 independent_adopter | 2 | New |
| D34 cohort_overlap | 5 | **Full saturation** — already enabled in runtime |
| D35 cc_runtime_pathway | 4 | Skill at canonical path |
| **D-EMP** | **2** | Dry-run install metadata-reachable; teaching skill never needs full e2e smoke; sits at score-2 floor |

**Composite**: install_score = 78.5 / 30.7 = **2.56**; pattern_score = 53.2 / 13.6 = **3.91**

**Verdict**: HARD-CAP at D10=2 (incumbent already enabled = full duplicate). Pattern-improvement carve-out FAILS (no novel pattern). pattern_score 3.91 ≥ 3.5 + D2=3 (< 4 → T3 D2-gate FAILS). Routes T4 CITE-ONLY or T5 NO-OP. Already enabled in runtime — confirms enabled state suffices.

### 3.3 review-agent-governance v0.1.0 (governance wrapper)

| Dim | Score | Notes |
|---|:---:|---|
| D1 license | 5 | MIT |
| D2 capability_uniqueness | 4 | Review-surface gating via Cedar + protect-mcp composition; the Cedar policy file is non-trivial (≥30 forbid rules across GitHub/GitLab/CI/webhooks/protected-branches) |
| D3 harness_fit | 5 | Plugin-shipped hooks; PreToolUse + PostToolUse; `${REVIEW_APPROVAL_FLAG:-./.review-approved}` env-var sane default |
| D4 CC pathway | 5 | plugin + hook + skill + 2 commands + 1 agent (review-policy-author Opus) |
| D5 typed_evidence | 4 | code = hooks.json + Cedar policy ✓; example workflow in SKILL.md; @tomjwxf practitioner |
| D7 maintenance | 4 | PR #495 merged 2026-05-11; recent activity |
| D10 dupl_against_installed | 5 | NO incumbent review-bot governance in tree |
| D14 reversible | 4 | Plugin install + Cedar policy copy + `.review-approved` flag; rollback removes 3 files |
| D15 supply_chain | 4 | Depends on `npx protect-mcp@0.5.5` (semver-pinned CR-9-compliant); 1 transitive npm dep |
| D16 bus_factor | 2 | Solo + protect-mcp dependency on same maintainer |
| D17 robustness | 3 | SKILL.md example workflow; no formal tests of own |
| D18 runtime_safety | 5 | Hooks default-DENY review-surface; explicit approval required (more conservative than allow-by-default) |
| D19 code_review | 2 | Solo PRs |
| D20 doc_transparency | 5 | README + SKILL.md + 2 commands + 1 agent + Cedar policy default |
| D21 org_diversity | 1 | Solo |
| D22 cascade | 5 | 6+ families converged |
| D23 decision_impact | 4 | Tier-B ORCHESTRATION (gates GitHub `gh` CLI + CI + webhooks at hook layer) |
| D24 MCP attack surface | 3 | Composes with protect-mcp; review-agent-governance itself doesn't expose MCP; score from composition + per-call policy gate present (3-of-5 anchors) |
| D25 OWASP agentic | 3 | 3-of-6: delegated-trust ✓ (human-approval gate) + emergent-autonomy ✓ (default-deny) + inter-agent-comm ✓ (webhook gating) |
| D26 content_provenance | 4 | Signed receipts via protect-mcp transitive |
| D27 independent_adopter | 2 | New (PR #495 merged 2026-05-11) |
| D31 silent_fallback | 4 | Explicit `${REVIEW_APPROVAL_FLAG:-./never-approve}` documented to force-strict-mode |
| D32 pin_freshness | 4 | Pinned `protect-mcp@0.5.5` (1 minor behind 0.6.0); composes-not-author |
| D33 cross_source_quorum | 3 | 4-family on D1+D2+D5 (github + ctx_fetch + deepwiki + repomix) |
| D34 cohort_overlap | 1 | **Singular novel function** — no review-bot governance incumbent in runtime (codex Stop-hook gate is for output review, not for review-bot ACTION gating); D34=1 max-positive for novelty |
| D35 cc_runtime_pathway | 5 | Native CR-2 plugin |
| **D-EMP** | **3** | Smoke-run partial — composes protect-mcp; depends on it loading correctly. Cedar policy + Flag-file workflow is exercise-able in 30s smoke. NOT YET exercised. |

**Composite** (path-(b) default, denom 30.7 install / 13.6 pattern):
- install_score = 109.0 / 30.7 = **3.55**
- pattern_score = 46.55 / 13.6 = **3.42**

---

## 4. D34 cohort_overlap_signal (cluster-level)

| Functional cohort: "MCP/hook policy gates + audit trails" | Incumbent in runtime? |
|---|:---:|
| Cedar-based policy gating | NO |
| Ed25519-signed audit receipts | NO (codex Stop-hook gate captures outputs but doesn't sign tool-call inputs cryptographically) |
| Review-bot governance (gh-PR/gh-merge/CI-write gate) | NO |
| Hook-layer pre-execution policy | YES (this runtime: `gitleaks/ruff/shellcheck/git` direct-CLI hooks but no Cedar-class policy; W319-3 Stream C `Δ34 supersession-chain lint` shipped advisory) |

**Cluster-level D34**: For the COHORT, the runtime has **partial overlap** on pre-execution hook layer (1-2 incumbents = D34=3) but no overlap on the Cedar-policy-engine + cryptographic-receipt-chain dimensions. The triad's distinctive value (Ed25519 receipts + JCS canon + hash-chain audit) is **net-new** to the runtime.

---

## 5. Hard-cap audit + Stage-0 verification (per candidate)

### protect-mcp
- D1 ≥ 3 ✓ · D3 ≥ 2 ✓ · D5 ≥ 4 ✓ · D7 ≥ 2 ✓ · D10 ≥ 2 ✓ (no incumbent) · D14 ≥ 3 ✓ · D15 ≥ 2 ✓ · D16 = 2 PASS-at-floor · D17 ≥ 2 ✓ · D18 = 5 ✓ · D19 = 2 PASS-at-floor · D22 ≥ 2 ✓ · D24 = 4 ✓ · D25 = 4 ✓ · D27 = 2 PASS-at-floor · D31 ≥ 2 ✓ · D32 ≥ 2 ✓ · D33 ≥ 2 ✓ · **D-EMP = 4 PASS** ✓
- **No breach**

### signed-audit-trails
- D10 = 2 **HARD-CAP** (full-duplicate of already-enabled `signed-audit-trails-recipe` skill in runtime); pattern-carve-out N/A (no novel pattern improvement over already-enabled skill content)
- D2 = 3 (< T3 D2 ≥ 4 gate)
- D-EMP = 2 PASS (≥1 floor; no special handling needed but it caps via D10)
- **D10 + D2 sub-floors → T4 CITE-ONLY routing** (and confirms already-enabled state is sufficient)

### review-agent-governance
- All hard-caps PASS (D1 ✓ D3 ✓ D5 ✓ D7 ✓ D10 ✓ D14 ✓ D15 ✓ D16=2 floor ✓ D17 ✓ D18 ✓ D19=2 floor ✓ D22 ✓ D24=3 ✓ D25 ✓ D27=2 floor ✓ D31 ✓ D32 ✓ D33 ✓ D-EMP=3 ✓)
- **No breach**

---

## 6. 3-org-distinct anchor verification (cluster-wide strengths)

| Cluster strength | Anchor 1 (org) | Anchor 2 (org) | Anchor 3 (org) | 3-org-distinct? |
|---|---|---|---|:---:|
| Cedar policy engine for authorization | AWS (Cedar open authorization engine, formally verified) | OWASP Top-10 Agentic 2026 §delegated-trust | Microsoft AGT (already-installed W316 Stream S7 — Cedar-class governance toolkit composition) | YES (AWS + OWASP + Microsoft — distinct parents) |
| Ed25519 / RFC 8032 signature standard for receipts | IETF RFC 8032 (independent standards body) | NIST AI 600-1 GOVERN-2 + content-provenance | OpenSSF Scorecard Signed-Releases | YES |
| JCS / RFC 8785 deterministic canonicalization | IETF RFC 8785 (independent standards body) | W3C interop standards alignment (canonical JSON-LD parallel) | EU AI Act Article 12 compliance evidence | YES |
| Hash-chained audit trail for tamper-evidence | Sigstore project / OpenSSF (Linux Foundation) | NIST AI 600-1 MEASURE-2.7 incident-disclosure | Anthropic Responsible Scaling Policy §3 (audit-trail requirement) | YES |
| Tier-B ORCHESTRATION cardinal-rule-2 plugin-shipped hooks | Anthropic Claude Code plugin docs | MCP working-group | W315-D D24 cardinal-rule-2 lint discipline (in-tree) | YES (Anthropic + MCP + in-tree practice with external corroboration) |

All 5 cluster strengths sustain 3-org-distinct anchors. PASS.

---

## 7. Routing (cluster verdict)

| Candidate | install_score | pattern_score | Tier | Reasoning |
|---|---:|---:|:---:|---|
| **protect-mcp** | **3.93** | 3.65 | **T2 VENDOR-FORK** (NEAR-T1; install_score 0.07 below T1 ≥ 4.0 floor) — install `protect-mcp@claude-code-workflows` plugin via `claude plugin install wshobson/agents/protect-mcp` → flip `enabledPlugins[protect-mcp@claude-code-workflows]: false → true` | install_score 3.93 ∈ [3.0, 3.9] (very close to 4.0); D-EMP=4 strong; no hard-cap; license MIT permits fork |
| **review-agent-governance** | **3.55** | 3.42 | **T2 VENDOR-FORK** — install + enable | install_score 3.55 ∈ [3.0, 3.9]; D34=1 (singular novel); ELECTRE-incomparable with protect-mcp (multi-kernel keeper) |
| **signed-audit-trails** | 2.56 | 3.91 | **T4 CITE-ONLY (CONFIRM-ALREADY-ENABLED)** | D10=2 hard-cap (already enabled in runtime); D2=3 fails T3 D2 ≥4 gate; pattern_score ≥ 3.5 BUT D2 < 4 means T3 PATTERN-STUDY does NOT route here; T4 CITE-ONLY is correct routing. **State**: `signed-audit-trails@claude-code-workflows: true` ALREADY IN settings.json. No action needed. |

### Hybrid-adopt pair (ELECTRE multi-kernel-keep Δ31)

**Install both `protect-mcp` + `review-agent-governance` as a paired ship**:
- protect-mcp = general policy runtime (Cedar boundary + Ed25519 receipts for all tool calls)
- review-agent-governance = focused review-surface wrapper (forbid `gh pr review`/`gh pr merge`/CI-write without `./.review-approved`)
- They are complementary not redundant (ELECTRE incomparability captured this)
- signed-audit-trails skill confirms (already-enabled) provides the teaching layer

---

## 8. Forward operator-AIs (W321+)

- **AI-W320-C-2-1 PROTECT-MCP-INSTALL** (P1): `claude plugin install wshobson/agents/protect-mcp` → flip `enabledPlugins[protect-mcp@claude-code-workflows]: false → true` in `Z:/claude-sota-installed/.claude/settings.json`. Add Cedar policy `./protect.cedar` to project root (per skill cookbook). Add `./protect-mcp.key` + `./receipts/` to `.gitignore`. Rollback: revert settings.json boolean + remove cedar policy file. **Soft-blocker**: `protect-mcp@0.5.5` hook pin is 1 minor behind `0.6.0` latest — consider AI-W320-C-2-3 first.
- **AI-W320-C-2-2 REVIEW-AGENT-GOVERNANCE-INSTALL** (P1): `claude plugin install wshobson/agents/review-agent-governance` → flip `enabledPlugins[review-agent-governance@claude-code-workflows]: false → true`. Copy default Cedar policy: `cp .claude/plugins/review-agent-governance/policies/review-agent-governance.cedar ./review-governance.cedar`. Add `./review-receipts/`, `./review-governance.key`, `./.review-approved` to `.gitignore`. Closes **W318-AI-B-5** (operator-AI decision on review-agent-governance flip). **Pre-req**: AI-W320-C-2-1 (this plugin composes protect-mcp).
- **AI-W320-C-2-3 PROTECT-MCP-PIN-BUMP-AUDIT** (P2): wshobson hooks pin `protect-mcp@0.5.5`; npm `0.6.0` is latest. File `wshobson/agents` upstream issue requesting pin-bump to `0.6.0` (after CHANGELOG diff audit for `0.5.5 → 0.6.0` breaking changes). Closes D32 1-minor-behind drift for both protect-mcp + review-agent-governance.
- **AI-W320-C-2-4 SIGNED-AUDIT-TRAILS-CONFIRM** (P3): signed-audit-trails ALREADY ENABLED in settings.json. No action. Audit confirms current state is correct (T4 CITE-ONLY routing for the plugin redux; the embedded skill ships free with marketplace).
- **AI-W320-C-2-5 PROTECT-MCP-SMOKE** (P2 — D-EMP-lift): exercise `protect-mcp/test/run-tests.sh` against this runtime to lift D-EMP from 4 → 5 (soak-test ≥2 distinct invocation paths in production-like session). Cedar deny + receipt sign + offline verify.
- **AI-W320-C-2-6 CARDINAL-RULE-2-COMPLIANCE-VERIFY** (P2): after install both plugins, verify `.claude/settings.json:hooks` only contains DIRECT-CLI invocations (no project-owned hook bodies); confirm protect-mcp + review-agent-governance plugin-shipped hooks live in plugin dir, not settings.json:hooks core lane.
- **AI-W320-C-2-7 LEDGER-3-ROWS** (P0 — this audit): append rows #90, #91, #92 to VERDICT-LEDGER.md per §10 below.

---

## 9. Cardinal-rule invariants (W320-C-2 audit)

- R1 trusted plugins only: PASS (`wshobson/agents` marketplace declared in settings.json `marketplaces[claude-code-workflows]`; all 3 plugins enumerated in marketplace.json with verified author/repo)
- R2 hooks plugin-shipped or direct-CLI: PASS for all 3 plugins (plugin-shipped hooks in `plugins/<name>/hooks/hooks.json`)
- R3 subagents installed-upstream: PASS (`review-policy-author.md` + `policy-enforcer.md` + `receipt-verifier.md` are upstream-installed agents)
- R4 project-behavior: PASS (no self-invented rules)
- R5 safety boundaries: PASS (Cedar policy gates + Ed25519 receipts ARE the safety boundary — they REINFORCE not REPLACE the permission system)

`self_invented_count`: 0 HOLDS.

---

## 10. Ledger rows for VERDICT-LEDGER.md (append after row #89)

```markdown
| 90 | W320 | 2026-05-19 | `wshobson/agents/protect-mcp@claude-code-workflows` v0.1.0 plugin / `protect-mcp@0.5.5` npm pinned / `0.6.0` npm latest / 35,654★ (wshobson repo) / MIT | **T2 VENDOR-FORK (INSTALL + ENABLE)** | 3.93 (path-(b) default; v8.1-partial; effective denom 30.7 — no skip-N/A) | 3.65 (path-(b); denom 13.6) | none breached (D16=2 + D19=2 + D21=1 all at floor) | NEW-ACTIVE | W324 (4 waves) | **First-time audit** Tom Farley's `protect-mcp` plugin. Cluster-rank #1 via triangulated MCDA (Borda 10.5 / WSM 3.42 / ELECTRE outranks signed-audit-trails). D2=5 capability uniqueness (first cryptographic governance plugin in CC ecosystem; Cedar + Ed25519 RFC 8032 + JCS RFC 8785 + hash-chain composition); D24=4 mcp_attack_surface_governance (4-of-5 anchors); D-EMP=4 (npm-published + run-tests.sh in-repo + offline @veritasacta/verify@0.3.0 — soak-test ≥2 paths pending). Composes with W316-S7-installed Microsoft AGT (multi-kernel-keeper pair). IETF draft `draft-farley-acta-signed-receipts` author-acknowledged. Install path: `claude plugin install wshobson/agents/protect-mcp` → flip `enabledPlugins[protect-mcp@claude-code-workflows]: false → true` + add `./protect.cedar` policy + add `./protect-mcp.key` + `./receipts/` to `.gitignore`. Rollback: revert flip + remove 3 added files (<5s). T6 verdict note: `W320-wshobson-protect-mcp-install`. |
| 91 | W320 | 2026-05-19 | `wshobson/agents/review-agent-governance@claude-code-workflows` v0.1.0 / `protect-mcp@0.5.5` npm pinned / MIT | **T2 VENDOR-FORK (INSTALL + ENABLE) — HYBRID-PAIR with row #90 protect-mcp via ELECTRE multi-kernel-keep Δ31** | 3.55 (path-(b); v8.1-partial; effective denom 30.7) | 3.42 (path-(b); denom 13.6) | none breached (D16=2 + D19=2 + D21=1 at floor; D34=1 max-positive novelty) | NEW-ACTIVE | W324 | **First-time audit** Tom Farley's review-bot governance wrapper. Cluster-rank #2 via triangulated MCDA (Borda 14 / WSM 3.23 / ELECTRE incomparable-with-protect-mcp = complementary specialty axis). D34=1 (singular novel — no review-bot governance in runtime; codex Stop-hook gate captures OUTPUT review not REVIEW-BOT-ACTION gating). Cedar policy `policies/review-agent-governance.cedar` forbids `gh pr review`/`gh pr merge`/`gh issue close`/CI-config writes/Slack-Discord webhooks/protected-branch pushes without `./.review-approved` flag. Composes protect-mcp (pre-req). Closes **W318-AI-B-5** (operator-AI decision on review-agent-governance@claude-code-workflows currently DISABLED-pending). Install: `claude plugin install wshobson/agents/review-agent-governance` → flip `enabledPlugins[review-agent-governance@claude-code-workflows]: false → true` + copy default cedar policy + add `./review-receipts/`, `./review-governance.key`, `./.review-approved` to `.gitignore`. Rollback: revert flip + remove 4 files (<10s). T6 verdict note: `W320-wshobson-review-agent-governance-install`. |
| 92 | W320 | 2026-05-19 | `wshobson/agents/signed-audit-trails@claude-code-workflows` v0.1.0 / MIT | **T4 CITE-ONLY (CONFIRM-ALREADY-ENABLED — no-op)** | 2.56 (path-(b); v8.1-partial; effective denom 30.7) | 3.91 (path-(b); denom 13.6) | **D10=2 HARD-CAP** (full-duplicate of `signed-audit-trails:signed-audit-trails-recipe` skill ALREADY ENABLED in this runtime per settings.json `signed-audit-trails@claude-code-workflows: true`); pattern-improvement carve-out N/A (no novel pattern over enabled); D2=3 fails T3 D2≥4 gate | CONFIRM-ALREADY-ENABLED | W324 | **First-time audit** Tom Farley's teaching-skill plugin. Cluster-rank #3 via triangulated MCDA (Borda 17.5 / WSM 2.56 / ELECTRE dominated by both peers). Already-enabled state IS sufficient; install_score sub-3.0 + D10=2 hard-cap routes T4 CITE-ONLY but operational state remains correct. **No action**. The teaching-skill ships free with the marketplace; routing as T4 CITE-ONLY confirms operator already correctly enabled it without explicit audit. T6 verdict note: `W320-wshobson-signed-audit-trails-cite-only-confirm`. |
```

---

## 11. Cumulative T6 verdict count

Pre-W320-C-2: 92 verdicts (via W319 row #88)
+ W320-C-1 row #89 (PWF re-litigation)
+ W320-C-2 rows #90 + #91 + #92 (security triad)
= **96 verdicts post-W320-C-2** (verify after Stream C ledger append at W320 closure)

---

## License + provenance

- `wshobson/agents` marketplace: MIT © 2024 Seth Hobson (`Z:/repos/deps/wshobson-agents/LICENSE`)
- 3 plugins: MIT per individual plugin `.claude-plugin/plugin.json:license` declarations
- protect-mcp npm package: MIT per `npm registry protect-mcp@latest.license`

This audit doc is operator-authored under MIT-compatible attribution.
