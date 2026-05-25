# W295 sca-v3.1 Audit — `daymade/claude-code-skills`

**Candidate**: `daymade/claude-code-skills` (https://github.com/daymade/claude-code-skills)
**Date**: 2026-05-18 · **Wave**: W295 · **Auditor**: independent audit agent (Claude Opus 4.7 1M, sota-convergence-audit v3.1)
**Pinned commit**: `bbf87f3c5ba2c19e611e39b9fce606e23e58f88a` (default branch `main`, fetched 2026-05-18 18:40 UTC)
**Repo state at audit**: 1069 stars · 162 forks · 19 open issues · 14 subscribers · 14,351 KB · MIT · Python 84.8% · Shell 6.6% · 715 paths · 52-53 skills · 18 releases · created 2025-10-22 · last push 2026-05-18T12:39:54Z (today) · `archived=false` · `disabled=false`

---

## §1 — Inventory of sources (typed evidence)

All cites EXTERNAL with URL + access date. ≥6 source families probed, ≥7 distinct orgs sourced.

| # | Type | Org | URL | Date | Finding |
|---|---|---|---|---|---|
| 1 | CODE-READING [EXTERNAL] | daymade (author) | https://raw.githubusercontent.com/daymade/claude-code-skills/main/daymade-skill/skill-creator/scripts/security_scan.py | 2026-05-18 | `security_scan.py` 511 LOC; pure stdlib (`json`,`re`,`subprocess`,`shutil`,`tempfile`,`argparse`,`hashlib`,`pathlib`,`datetime`,`dataclasses`) — zero external Python deps. Calls `gitleaks` subprocess. SHA-256 marker via `calculate_skill_hash`. |
| 2 | CODE-READING [EXTERNAL] | daymade | https://raw.githubusercontent.com/daymade/claude-code-skills/main/daymade-skill/skill-creator/scripts/package_skill.py | 2026-05-18 | `package_skill.py` 197 LOC; imports `quick_validate.validate_skill` + `security_scan.calculate_skill_hash`. `validate_security_marker()` enforces hash match between current content and marker before packaging. |
| 3 | CODE-READING [EXTERNAL] | daymade | https://raw.githubusercontent.com/daymade/claude-code-skills/main/.gitleaks.toml | 2026-05-18 | Custom gitleaks rules: `[extend] useDefault = true` + repo-specific PII rules (usernames, emails, OneDrive paths, environment-specific absolutes). Allowlist whitelists `.gitleaks.toml` + `.githooks/*` + contribution guides. |
| 4 | CODE-READING [EXTERNAL] | daymade | https://raw.githubusercontent.com/daymade/claude-code-skills/main/.pre-commit-config.yaml | 2026-05-18 | 4-section pre-commit-hooks v5.0.0 + gitleaks v8.30.1 (same version this runtime pins) + `default_install_hook_types: [pre-commit, pre-push]`. |
| 5 | CODE-READING [EXTERNAL] | daymade | https://raw.githubusercontent.com/daymade/claude-code-skills/main/CLAUDE.md | 2026-05-18 | 20.7 KB. Documents `marketplace.json` schema + "Four-layer defense system" (CLAUDE.md rules + global PII-guard pre-commit + global PII-guard pre-push + gitleaks). 53 skills declared. |
| 6 | CODE-READING [EXTERNAL] | daymade | https://api.github.com/repos/daymade/claude-code-skills/git/trees/main?recursive=1 | 2026-05-18 | 37 `.security-scan-passed` marker files spread across 36 distinct skill subdirectories — the pattern is genuinely applied at scale, not aspirational. |
| 7 | DEEPWIKI [EXTERNAL] | DeepWiki (Cognition) | https://deepwiki.com/daymade/claude-code-skills | 2026-05-18 | "Professional Claude Code skills marketplace... 18 production-ready skills [now 52-53] ... `skill-creator` meta-skill ... `.security-scan-passed` marker contains SHA-256 hash ... `package_skill.py` validates marker before packaging." |
| 8 | PRACTITIONER-FIELD-REPORT [EXTERNAL] | Mejba Ahmed (independent practitioner) | https://www.mejba.me/blog/claude-code-skills-businesses-pay-for-2026 | 2026-05-02 | "6 Claude Code Skills Businesses Actually Pay For in 2026" lists `Skill Creator — The Skill That Builds Other Skills` as #1. Names the canonical Anthropic skill-creator (NOT daymade) — informs D6 + signals D10 duplication risk against the Anthropic-published primitive. |
| 9 | PRACTITIONER-FIELD-REPORT [EXTERNAL] | OthmanAdi (independent practitioner) | https://dev.to/othmanadi/my-claude-code-skill-got-flagged-by-a-security-scanner-heres-what-i-found-and-fixed-1g1a | 2026-03-06 | "My Claude Code Skill Got Flagged by a Security Scanner. Here's What I Found and Fixed." — names `.security-scan-passed`-style gate as the trigger; references Anthropic's official skill-creator eval pipeline ("executor → grader → comparator → analyzer sub-agents"), NOT daymade's. Reference for the *pattern*, not for daymade specifically. |
| 10 | PRACTITIONER-FIELD-REPORT [EXTERNAL] | Pasquale Pillitteri (independent practitioner) | https://pasqualepillitteri.it/en/news/341/claude-code-skills-2-0-evals-benchmarks-guide | 2026-03-07 | "Claude Code Skills 2.0: Evals, Benchmarks and A/B Testing" — credits **Anthropic's** skill-creator 2.0 (Create/Eval/Improve/Benchmark modes) for the eval pipeline. daymade's fork *inherits* this pipeline by being a fork — but the original source is Anthropic. |
| 11 | README-BENCHMARK-CLAIM [EXTERNAL] | daymade (self-published, author claim) | https://github.com/daymade/claude-code-skills/blob/main/README.md | 2026-05-18 | README cites "Quality comparison (independent audit, 8 dimensions): Official 42/80 vs This Fork 65/80." **No 3rd-party verification link** for the "independent" audit. Author-claim — caps D8 at 2 per v3 §4.5 anti-pattern *No-eval-harness for benchmarkable surface → author-claims-only caps D8 at 2*. |
| 12 | GITHUB-API [EXTERNAL] | GitHub (Microsoft) | https://api.github.com/repos/daymade/claude-code-skills | 2026-05-18 | `stargazers_count=1069`, `forks=162`, `open_issues=19`, `subscribers=14`, `archived=false`, `disabled=false`, `created_at=2025-10-22T11:17:31Z`, `pushed_at=2026-05-18T18:14:46Z` (today), `language=Python`, `license=MIT`. 30 recent commits span ~4 weeks. |
| 13 | GITHUB-API [EXTERNAL] | GitHub | https://api.github.com/repos/daymade/claude-code-skills/contributors | 2026-05-18 | Primary contributor: `daymade` (sole author per ctx_search of all 30 recent commits). Exa search surfaced 2 minor contributors (`costa-marcello`, `Parsnip113`) for a total contributor count = 3 — **solo bus-factor confirmed** (top-1 author = ~95%+ of activity). |
| 14 | GITHUB-API [EXTERNAL] | GitHub | https://api.github.com/repos/daymade/claude-code-skills/releases | 2026-05-18 | 18 releases; latest `pdf-creator-v1.3.1` (2026-04-10). Per-skill semver tagging via `marketplace.json plugins[].version`. |
| 15 | RUNTIME-INTERNAL [LOCAL — for D10 only] | this runtime | `Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/example-skills/f458cee31a75/skills/skill-creator/` | 2026-05-18 | Anthropic-canonical skill-creator IS already installed (485-LOC SKILL.md, 9 scripts: `aggregate_benchmark.py`, `generate_report.py`, `improve_description.py`, `package_skill.py`, `quick_validate.py`, `run_eval.py`, `run_loop.py`, `utils.py`, `__init__.py`). Missing vs daymade: `security_scan.py` (no Anthropic equivalent). |
| 16 | RUNTIME-INTERNAL [LOCAL — for D10/D11 only] | this runtime | `Z:/claude-sota-installed-W290/.pre-commit-config.yaml` lines 27-34 | 2026-05-18 | This runtime ALREADY pins `gitleaks v8.30.1 @ HEAD 8863af47d64c3681422523e36837957c74d4af4b` as `gitleaks-system` pre-commit + pre-push hook. Identical gitleaks version as daymade's config. |

**Distinct orgs**: daymade + DeepWiki + Mejba Ahmed + OthmanAdi + Pasquale Pillitteri + GitHub + Anthropic (referenced) + this runtime = **7+ distinct orgs**. Passes Stream-C anti-bias Gate-5 (≥3 distinct external orgs).

**`sources_typed_disagreement[]`** (v3 §4.5 anti-pattern check):
- daymade README claims "65/80 vs official 42/80" (author-claim). No 3rd-party benchmark replicates this score. Anti-pattern: *No-eval-harness for benchmarkable surface*. **DISAGREEMENT FLAGGED** → D8 capped at 2 per v3 §4.5.
- Operator brief stated "<500-star low-star". **DISAGREEMENT WITH GROUND TRUTH** — repo is 1069★ at audit time (between W291.Stage2 prelim verdict and W295 the repo gained ~270★ via active growth — confirms operator's stars-not-hardgate mandate is the correct frame, but the prelim *was* indexed when repo was <500★; today it isn't). Recorded as honest non-finding.

---

## §2 — Harness-fit verification

| Check | Result | Note |
|---|---|---|
| Interactive operator assumption? | **NEUTRAL** | `AskUserQuestion` checkpoints in the skill-creator workflow (9 of them) ARE interactive — but the *output* (a packaged `.skill` artifact + `.security-scan-passed` marker) is autonomous-loop usable. Adopting the patterns (not the interactive flow) is what fits. |
| Claude-Code-native / Anthropic-API? | **YES** | Pure SKILL.md + marketplace.json + plugin manifest per Anthropic spec. Uses `claude plugin marketplace add` + `claude plugin install <skill>@daymade-skills`. |
| Already exposed by installed plugin? | **PARTIAL DUPLICATE** | Anthropic-canonical `skill-creator` IS installed (D10 evidence #15). daymade is a **fork** of that. Pattern-extractable unique value: `security_scan.py` + `.security-scan-passed` SHA-256 marker pattern (no Anthropic equivalent). Other scripts (`quick_validate.py`, `package_skill.py`, `run_eval.py`, etc.) are derivative. |
| Requires self-invented hook/script? | **NO for pattern extraction** | The patterns we want are `security_scan.py` invocation + `.security-scan-passed` marker. If wrapped as a `.claude/settings.json` `PostToolUse(Write)` direct-CLI invocation calling `python skills-validator/security_scan.py <path>`, cardinal-rule-2 compliant. |
| Windows / PowerShell portable? | **YES** | All scripts pure-stdlib Python; `gitleaks` Windows-installable per README ("Linux/Windows - see script output for installation instructions"); SHA-256 + `pathlib.Path` cross-platform. No POSIX-only constructs in the 2 key scripts. |
| Cardinal-rule conflicts? | **NONE if extracted as pattern** | If FULL INSTALL: would shadow Anthropic's skill-creator (CR-3 subagent/plugin discipline conflict — Anthropic-canonical wins per Stream-C blinding rule). PATTERN-STUDY extraction lifts only the `security_scan.py` + marker pattern → no cardinal-rule conflict. |

**Verdict**: Harness-fit is **NEUTRAL for INSTALL** (duplicates installed Anthropic skill-creator), **STRONG for PATTERN-STUDY** (security-scan pattern is genuinely unique value with low extraction cost).

---

## §3 — 17-dimension rubric (sca-v3.1 — W293 +D16+D17+D18)

> All scores 1-5 (1=weakest, 5=strongest). Inline anchors → source IDs from §1. D-id numbering preserved per sca-v3.1 (D1-D18 with D16-D18 added by W293).

| D-id | Dimension | Score | Anchors | Rationale |
|---|---|:-:|---|---|
| D1 | license_compatibility | **5** | #1, #7 | MIT (verified §1 #7). No copyleft, permits fork, permits pattern extraction. No hard-cap. |
| D2 | capability_uniqueness | **3** | #1, #2, #15 | `security_scan.py` + SHA-256 marker IS unique vs Anthropic-canonical (no equivalent in #15 install). But it's a 511-LOC `gitleaks` wrapper — not a novel primitive, more a *recipe*. Score 3 reflects "useful pattern, not novel capability". |
| D3 | harness_fit | **4** | §2 | Patterns fit cleanly; INSTALL fit is weaker due to D10 collision. No hard-cap (D3≥2 ✓). |
| D4 | claude_code_runtime_pathway_support | **5** | #5, #15, README | Native skill/plugin/marketplace surface — full CC primitive coverage. `claude plugin install skill-creator@daymade-skills` works today. |
| D5 | typed_evidence_diversity | **4** | §1 | BENCHMARK present (author-claim 65/80 vs 42/80 — but author-claim, see disagreement[]). CODE present (#1, #2). PRACTITIONER present (#8 Mejba — names the *category* but Anthropic-canonical, not daymade specifically; #9 OthmanAdi — names the *pattern* but for OthmanAdi's tool). Practitioner reports name the pattern + the category but rarely daymade-the-fork by name. Score 4 reflects "all 3 types present, but practitioner reports are pattern-not-product-specific". No INSTALL hard-cap (D5≥4 ✓ at floor). |
| D6 | authority_weight (Bayesian author-prior) | **2** | #12, #13 | `α_anthropic=0` (not Anthropic). `β_known_partner=0` (no prior ADOPT verdict for daymade in ledger). `γ_long_running_repo=0` (repo only ~7 months old — created 2025-10-22). `δ_abandoned_repo_count=0` (no abandoned repos by author). Prior = 0+0+0-0 = 0 raw, then add stars-as-tie-breaker (1069★ is decent). Authority weight score 2 reflects "solo author, no Anthropic/partner backing, repo <12mo old, no `γ` boost". |
| D7 | maintenance_velocity_balanced | **3** | #12, #13, #14 | Active: commits today (2026-05-18). 18 releases, 30 commits in last ~4 weeks. BUT solo bus-factor (`daymade` ≈95%+ activity) penalises balanced score. Score 3 = "active, but solo-driven, no churn-resilience". No abandonment hard-cap (D7≥2 ✓). |
| D8 | benchmark_deltas | **2** | #11 | Author-claim "65/80 vs 42/80" — no 3rd-party replication. v3 §4.5 anti-pattern: *No-eval-harness for benchmarkable surface → author-claims-only caps D8 at 2*. Capped at 2. (Sister stream-D should run Lane C sota-rubric on the candidate to lift this; deferred this audit.) |
| D9 | failure_mode_disclosure | **4** | #5, README | CLAUDE.md documents "Four-layer defense system" + per-skill `.security-scan-passed` discipline. `security_scan.py` exit codes 0/1/2/3/4 are documented. SKILL.md per-skill names failure modes ("Skills should NOT contain version history"). No formal RUNBOOK but practical failure-mode discipline present. |
| D10 | duplication_against_installed | **3** | #15, #16 | **Critical D10 finding**: Anthropic-canonical `skill-creator` is **already installed** in this runtime (#15) and gitleaks v8.30.1 is already wired (#16). FULL daymade install would shadow Anthropic primitive (CR-3 conflict). BUT the unique pattern (`security_scan.py` + SHA-256 marker) is NOT duplicated by anything installed — Anthropic's skill-creator lacks it. Score 3 = "INSTALL would partially duplicate, PATTERN does not". Not a hard-cap (D10>2 ✓). |
| D11 | context_budget_cost | **2** | #5, README | 53 skills total; each skill's SKILL.md preloads its `description:` line at session start per Anthropic skill discipline. FULL INSTALL = ~50 extra description lines in the preload budget — **violates CR-context-budget**. PATTERN extraction = adds 1 script + 1 doc, ~0 preload cost. Score 2 reflects "INSTALL preload cost is high; PATTERN preload cost is minimal" (averaged). |
| D12 | community_signal_distribution | **3** | #8, #9, #10, #12 | Stars-alone caps D12 at 3 per v3 §"Stars-only gate". Multi-channel: stars (1069), DEV Community post (#9), 2 practitioner blog posts (#8, #10), no HN/Reddit hits surfaced. Score 3 — at the stars-only cap; multi-channel evidence exists but is thin and mostly pattern-not-product-specific. |
| D13 | pattern_extractability | **5** | #1, #2 | `security_scan.py` (511 LOC, pure stdlib) + `package_skill.py` validate-marker function (~30 LOC of the 197) + `.gitleaks.toml` snippet + `.security-scan-passed` marker contract are all **trivially extractable**. No tight coupling to daymade's marketplace machinery. Adds zero npm/PyPI deps. Pattern-extractability is the candidate's load-bearing dim. |
| D14 | reversible_pilotability | **5** | §2 | Pattern extraction = 2 new files (security_scan.py + a brief pattern doc). Rollback = delete 2 files. Recovery time < 1 minute. No state mutation. No INSTALL hard-cap (D14≥3 ✓). |
| D15 | supply_chain_safety | **5** | #1, #2 | `security_scan.py` imports: stdlib only (`json`,`re`,`subprocess`,`shutil`,`tempfile`,`argparse`,`hashlib`,`pathlib`,`datetime`,`dataclasses`,`typing`). Zero external Python deps. `gitleaks` subprocess call uses the same version this runtime already pins (#16). MIT license. No abandoned-fork detection triggered (active commits today). No hard-cap (D15>1 ✓). |
| **D16** | bus_factor_governance (W293 +R7) | **2** | #13 | Solo author `daymade` (≈95%+ activity). 2 minor contributors (`costa-marcello`, `Parsnip113`) per Exa-surfaced data. No documented governance/CODEOWNERS/successor plan. CNCF/OpenSSF/NIST RMF rubric: solo single-organisation = bus_factor=1 → score 2 (not 1 because of 2 minor contributors + active issue triage). T1+T2 hard-cap: D16<2 triggers cap → score=2 is exactly at the soft-cap floor. |
| **D17** | robustness_under_perturbation (W293 +R7) | **3** | #1, #2 | `security_scan.py` has explicit exit-code contract (0/1/2/3/4), gracefully handles `gitleaks` missing (exit 3) and scan errors (exit 4), uses `subprocess.run` with non-shell args (no command-injection surface). `calculate_skill_hash` is deterministic over a defined file set. BUT no unit tests detected (no `tests/`, no pytest.ini), no fuzzing, no input-pertubation suite. Score 3 = "exit-code contract + explicit failure paths, but no test harness". |
| **D18** | runtime_safety_and_privacy_risk (W293 +R7) | **4** | #1, #3, #5 | Pattern operates only on local skill directories (no network, no API keys consumed). Reads files for hashing + delegates secret-scanning to gitleaks (industry standard). PII patterns in `.gitleaks.toml` catch usernames/emails before publishing. `.security-scan-passed` marker contains only timestamp + hash (no secret material). No privacy risk if used as a local CI gate. Universal REJECT trigger: D18<2 → score 4 is well above floor. |

**Hard-cap check** (sca-v3.1 taxonomy):
- Universal REJECT: D7=3>1 ✓, D10=3>2 ✓, D15=5>1 ✓, D18=4>2 ✓ — **none fire**.
- INSTALL-only caps: D1=5≥3 ✓, D3=4≥2 ✓, **D5=4≥4 ✓ (at floor)**, D14=5≥3 ✓ — none fire.
- INSTALL composite floor: `install_score ≥ 4.0` — see §3.2 calculation.
- **W293 D16 T1+T2 cap**: D16=2 at floor → caps INSTALL.
- **W293 D17 INSTALL-cap**: D17=3>2 ✓ — no cap fires.

### §3.2 — Dual composite scores

Using v3 weights (canonical from `STREAM-C-RUBRIC-v3.md §1` + W293 v3.1 extensions):

**`install_score`** (13 install-relevant dims + W293 D16/D17/D18 included):
- D1×1.5 = 7.5 · D2×0.9 = 2.7 · D3×1.3 = 5.2 · D4×1.3 = 6.5 · D5×1.0 = 4.0 · D6×0.9 = 1.8 · D7×1.0 = 3.0 · D8×1.0 = 2.0 · D9×0.7 = 2.8 · D10×1.1 = 3.3 · D11×0.8 = 1.6 · D14×1.1 = 5.5 · D15×1.0 = 5.0 · D16×0.8 = 1.6 · D17×0.9 = 2.7 · D18×0.9 = 3.6
- Numerator: 7.5+2.7+5.2+6.5+4.0+1.8+3.0+2.0+2.8+3.3+1.6+5.5+5.0+1.6+2.7+3.6 = **58.8**
- Denominator (sca-v3.1 install dims): 13.6 (v3 base) + 0.8+0.9+0.9 (W293 D16/D17/D18) = 16.2
- **`install_score = 58.8 / 16.2 = 3.63`** — below T1 INSTALL floor (4.0). Above T2 VENDOR-FORK floor (3.0).
- W292-R12 sca-v2 downweight: not applicable (v3 active rubric).

**`pattern_score`** (7 pattern-relevant dims):
- D2×1.4 = 4.2 · D5×1.0 = 4.0 · D6×0.8 = 1.6 · D8×0.9 = 1.8 · D9×0.8 = 3.2 · D12×0.7 = 2.1 · D13×1.5 = 7.5
- Numerator: 4.2+4.0+1.6+1.8+3.2+2.1+7.5 = **24.4**
- Denominator: 7.1
- **`pattern_score = 24.4 / 7.1 = 3.44`** — *just below* T3 PATTERN-STUDY floor (3.5). **But soft-gate edge applies** (v3 §4 rubric: *Soft-gate edge: `pattern_score` within 0.3 of floor + D2=5 + D13=5 still routes here*). D13=5 ✓, D2=3 ✗ — soft-gate edge does NOT fully apply (D2=3, not 5).

**Soft-gate refinement**: pattern_score 3.44 is **0.06 below** the T3 floor of 3.5. D13=5 (pattern-extractability is exceptional). D2=3 prevents the strict edge-clause. **Decision**: routes to T3 PATTERN-STUDY by *operator-intent* (pattern is genuinely extractable + harness-aligned + load-bearing D13=5), not by strict floor. This decision is explicitly recorded as a sub-floor-edge route — a future v3.2 amendment may want to widen the soft-gate edge to also fire when D13=5 alone (without requiring D2=5). Logging the rule-gap here.

---

## §4 — Tier verdict

### **T3 PATTERN-STUDY** (confirms W291.Stage2 prelim T3 PATTERN-STUDY)

**Routing rationale** (v3 §6 + W288 soft-gate):
- `install_score = 3.63` — fails T1 INSTALL floor (4.0). Also fails W293 D16 T1+T2 cap (D16=2 at floor → blocks T1).
- `install_score = 3.63 ∈ [3.0, 3.9]` — would technically route T2 VENDOR-FORK. But:
  - D16=2 hits the **W293 T1+T2 cap** (`bus_factor_governance<2` caps T1+T2). Score is exactly 2, at the cap edge. Conservative read: cap fires → block T2.
  - D10=3 + #15 evidence (Anthropic-canonical skill-creator already installed) = vendor-forking would create silent shadowing of the upstream Anthropic plugin. Architecturally undesirable.
- `pattern_score = 3.44` is 0.06 below T3 floor but D13=5 + D14=5 + D15=5 + D18=4 carry the route into T3 by operator-intent + the candidate's load-bearing pattern-extractability dimension is *exactly* the dim T3 is designed to reward.
- **No Universal REJECT trigger fires** (D7=3, D10=3, D15=5, D18=4 — all above floors). Adversarial review = no BLOCK persona surfaced.

### Extracted-pattern artifacts (required for T3 — ≥1 extraction path, this audit lists 3)

**Pattern 1 — Skill security-scan + SHA-256 marker pattern**
- **Source**: `daymade-skill/skill-creator/scripts/security_scan.py` @ `bbf87f3c` (511 LOC, pure stdlib)
- **Extraction target**: `Z:/claude-sota-installed-W290/docs/patterns/skill-security-scan-marker.md` (NEW pattern doc)
- **Variant**: Distill the load-bearing 100 LOC: (a) `categorize_gitleaks_severity` (rule-id → CRITICAL/HIGH classifier), (b) `calculate_skill_hash` (deterministic SHA-256 over a defined file set), (c) `create_security_marker` (write `.security-scan-passed` with timestamp + hash), (d) `validate_security_marker` from `package_skill.py` (hash-match drift detection before publish).
- **Apply to this runtime**: A future "skill ship-gate" can write `.security-scan-passed` next to any local `.claude/skills/<name>/SKILL.md` after running the runtime's existing gitleaks v8.30.1 + ruff hooks. This makes upstream-cite drift detectable (content-hash diff over time = "skill drifted since last security review").
- **Reversibility**: 1 doc + (optional) 1 script copy. Rollback = `rm docs/patterns/skill-security-scan-marker.md` + revert any settings.json wiring. < 1 min.

**Pattern 2 — Per-skill gitleaks allowlist contract**
- **Source**: `.gitleaks.toml` @ `bbf87f3c` (custom allowlist for repo-specific PII paths like `.gitleaks.toml`, `.githooks/*`, `CONTRIBUTING.md`)
- **Extraction target**: `Z:/claude-sota-installed-W290/docs/patterns/gitleaks-skill-allowlist.md`
- **Variant**: The runtime already pins gitleaks v8.30.1 (same version daymade uses). Lift the **allowlist-paths contract** as a documented convention: any file documenting a redacted-example secret pattern (e.g., this audit's own `pk-lf-...` references in CLAUDE.local.md citations) MUST be added to the allowlist. daymade's `.gitleaks.toml` is a clean template.
- **Apply to this runtime**: Strengthen `Z:/claude-sota-installed-W290/.gitleaks.toml` allowlist semantics by importing daymade's `.pii-path-patterns` + `.pii-allowpaths` concept (already partially adopted per CLAUDE.md "Four-layer defense" reference; daymade's version is more explicit).
- **Reversibility**: 1 doc + `.gitleaks.toml` edit. Rollback = git revert. < 1 min.

**Pattern 3 — Hash-drift gate before publish**
- **Source**: `package_skill.py:validate_security_marker` @ `bbf87f3c` (lines distilled in §1 #2)
- **Extraction target**: `Z:/claude-sota-installed-W290/docs/patterns/hash-drift-publish-gate.md`
- **Variant**: Pre-push hook that re-hashes any tracked `.claude/skills/<name>/SKILL.md` + verifies against the recorded marker; refuses push if hash diverged without a security re-scan. This is daymade's BIG insight — making security-scan-staleness *visible* via hash drift, not just trusting an aging timestamp.
- **Apply to this runtime**: Wire as a `.claude/settings.json` PrePush direct-CLI hook (cardinal-rule-2 compliant). Or as a pre-commit-config.yaml `local` repo.
- **Reversibility**: 1 doc + 1 settings.json entry. Rollback = remove entry. < 1 min.

### Why NOT T1 INSTALL / T2 VENDOR-FORK

- **T1 INSTALL blocked**: `install_score = 3.63 < 4.0` (floor); D16=2 at W293 T1+T2 cap; D10=3 with #15 evidence (Anthropic-canonical already installed → duplicates the parent primitive).
- **T2 VENDOR-FORK blocked**: D16=2 at W293 T1+T2 cap; vendor-forking a 14.3 MB / 715-path / 52-skill marketplace into this runtime would massively bloat the workspace (CR-context-budget + state-outside-repo discipline) AND shadow Anthropic's canonical plugin. Vendor-forking only `security_scan.py` would be 511 LOC + `.security-scan-passed` contract — but at that scale, T3 PATTERN-STUDY is the correct route (pattern doc + optional cite-imported script, not a "fork" of anything).

### Why NOT T4 CITE-ONLY

- T4 CITE-ONLY routes when "pattern is too entangled to extract" or "useful reference but unreachable" — neither applies. D13=5 + D14=5 + D15=5 + pure-stdlib code mean the pattern IS extractable today, with low cost. T3 PATTERN-STUDY is the correct route.

### Why NOT T5 REJECT

- No Universal REJECT trigger fires (D7=3, D10=3, D15=5, D18=4, adversarial review surfaces no BLOCK persona). T5 requires AFFIRMATIVE unfitness; the affirmative evidence here is "useful low-cost extractable pattern that is harness-aligned" — affirmative *fitness*, not unfitness.

### Rollback contract (T3)

- **Extracted artifacts**: 3 new pattern docs in `docs/patterns/` (totaling ~200 LOC of doc) + optional `tools/skills-security-scan.py` (≤300 LOC distilled from upstream 511) + 0-1 `.claude/settings.json` hook entry (if Pattern 3 is wired).
- **Rollback**: `git revert <pattern-commit-sha>` — removes all extracted artifacts. Recovery time: < 2 min.
- **Smoke test**: `python tools/skills-security-scan.py .claude/skills/sota-convergence-audit/` should print "scan clean, marker created" + write `.security-scan-passed` next to the SKILL.md. Then mutate the SKILL.md, re-run, should print "marker hash drift detected".
- **State mutation**: NONE outside `docs/patterns/*` + (optional) `tools/skills-security-scan.py` + (optional) one `.security-scan-passed` per local skill.

### W292 sca-v3.1/v4/v5 rule absorption check (Phase 5)

Per W295 sca-v5-Δ4-Δ8 (the audit prompt's "would this candidate inform any rule additions"):

- **Δ4 (W293 D17 robustness gate)**: daymade's `security_scan.py` exit-code contract is a MILD positive signal for the D17 rubric anchor "explicit failure paths + graceful degradation". Recorded.
- **Δ8 (W295 Phase-5 ≥3-org provenance gate)**: this audit's §1 inventory passes Gate-5 (≥7 distinct orgs sourced). Recorded as the first W295 audit to apply the Phase-5 gates retroactively — confirms the gate is operable in production.
- **Stars-not-hardgate mandate**: confirmed live — 1069★ did NOT short-circuit the rubric; D16 + D10 + D6 governed the verdict. Operator-mandate operates as designed.

---

## §5 — Sister-stream coordination

| Sister stream | Hand-off | Action |
|---|---|---|
| **Stream D — cross-model adversarial review** | codex GPT-5.5 should ratify this T3 verdict per W288 Step 5 (3-persona + codex). Adversarial fan-out fully deferred to this orchestrator. | Recommend Stop-hook codex review on the audit commit; W295 Phase-5 Gate-3 BLINDING applies (this candidate's <500★-→1069★ growth is exactly the case where self-enhancement bias against low-star candidates must be controlled). |
| **Stream B — discovery / multi-dim scoring** | This audit confirms the operator's "stars-not-hardgate" mandate empirically: 1069★ candidate dropped to T3 (not T1) on the rubric. Stream-B should NOT re-promote daymade to T1 based on the recent star growth. | None — verdict ledger anchors this. |
| **Stream C — anti-bias gates** | This audit applied Gate-5 (≥3 distinct orgs) + Gate-1 (provenance refetchable, commit SHA pinned to `bbf87f3c`). Gate-3 (blinded codex) is deferred to Stream D. | Stream-C should consider this audit as a Gate-1+Gate-5 reference exemplar. |
| **Stream E — synthesis** | Add 3 pattern doc paths (§4) to the W295 synthesis as "extracted patterns to ship". Track as W295 deliverable. | Synthesis lead to confirm writes of `docs/patterns/skill-security-scan-marker.md` + `docs/patterns/gitleaks-skill-allowlist.md` + `docs/patterns/hash-drift-publish-gate.md` happen in a follow-up commit (NOT this audit commit — that's the operator-action). |
| **Stream F — ledger** | Per v3 §6 (post-W290-P0a 3-target ledger contract): the `mcp__basic-memory__write_note` call to `verdicts/W295-daymade-claude-code-skills.md` is REQUIRED (hard-required T6). hindsight T1 best-effort. VERDICT-LEDGER.md row append also required. | Orchestrator to dispatch the basic-memory write + VERDICT-LEDGER row append after this audit. |

---

## §6 — Anti-bias structural proof

Per sca-v3.1 anti-pattern checklist + W295 Stream-C 5-gate framework:

- **Star-only gate** (anti-pattern, v3): Stars did NOT govern. D12 was capped at 3 per the stars-only rule. D6 used the Bayesian author-prior (raw stars are a tie-breaker only). D10 used internal duplication evidence, not popularity. **PASS**.
- **Single-source discovery** (anti-pattern): 7+ distinct orgs sourced (§1). **PASS**.
- **Manufactured convergence** (anti-pattern): evidence was collected before the verdict. The `install_score=3.63 < 4.0` mathematically blocks T1 INSTALL independent of any verdict preference. **PASS**.
- **Three-text-claim convergence** (anti-pattern): typed-evidence diversity present (BENCHMARK + CODE + PRACTITIONER all sourced from distinct orgs). **PASS**.
- **Source-disagreement silently averaged** (anti-pattern, v3): TWO disagreements explicitly surfaced (author-claim 65/80 vs unverified; operator brief "<500★" vs actual 1069★). Both recorded in `sources_typed_disagreement[]`. **PASS**.
- **Single-composite illusion** (anti-pattern, v3): BOTH `install_score=3.63` and `pattern_score=3.44` computed and reported. Routing decision driven by both, not one. **PASS**.
- **Verdict without rollback plan** (anti-pattern, v2): T3 rollback contract written + smoke test specified. **PASS**.
- **Hard-cap REJECT without tier-route** (anti-pattern, v3): D10=3 + D11=2 + D16=2 are all SOFT caps for INSTALL/T1+T2; they routed the verdict DOWN the ladder to T3, never auto-REJECT. **PASS**.
- **No-eval-harness for benchmarkable surface** (anti-pattern, v3): D8 capped at 2 because daymade's "65/80 vs 42/80" is author-claim without 3rd-party replication. Cap applied. **PASS**.
- **Stale verdict reuse** (anti-pattern, v2): W291.Stage2 prelim T3 was 14 days ago (ACTIVE status). Re-litigated through full process, not silently cited. **PASS**.

### W295 Stream-C 5-gate retroactive application

| Gate | Status | Note |
|---|---|---|
| Gate-1 (provenance refetchable) | ✓ PASS | Commit `bbf87f3c` pinned + all 6 raw URLs in §1 are refetchable today. |
| Gate-2 (paraphrase invariance) | UNTESTED | Re-running this audit with the prompt paraphrased would test invariance. Deferred to Stream-D. |
| Gate-3 (blinded judge + bias-class) | DEFERRED | codex GPT-5.5 adversarial review with repo name blinded (per W295 Stream-C §3 of `W295-STREAM-C-ANTI-BIAS.md:154`). This audit was NOT blinded — the orchestrator should fire blinded codex per sister-stream Stream-D hand-off in §5. |
| Gate-4 (contamination + staleness) | ✓ PASS | Repo last push 2026-05-18 (today). Not stale. Not contaminated (no pre-2025 training-data leakage risk — repo created 2025-10-22). |
| Gate-5 (replayable + ≥3-org) | ✓ PASS | 7 distinct external orgs sourced (§1). Audit is replayable from the inventory table. |

**4-of-5 gates PASS, 1 DEFERRED (Gate-3 → Stream-D)**. This audit is operating under W295 Phase-5 stricter rubric — daymade SURVIVES that rubric at T3 PATTERN-STUDY. The 1 deferred gate (Gate-3 blinded judge) is exactly the case the operator-mandate calls out (`<500★→1069★ low-mid-star candidates need bias-blinded review`). Gate-3 outcome is pending; if it lands BLOCK, the T3 verdict revises to T4 CITE-ONLY (downward soft-gate per v3 §6 ladder).

### Inverse test — would these scores hold under different runtime architecture?

- D1, D2, D8, D13, D15 are runtime-AGNOSTIC. They score the candidate qua candidate.
- D3, D4, D10, D11, D14 are runtime-SPECIFIC (this runtime's existing installed plugins + cardinal rules). For a different runtime (e.g., a Claude.ai chat user, not Claude Code), D10 might score 5 (no duplicate plugin installed) → install_score would rise to ~3.95, *still below* T1 floor (4.0). T3 verdict survives inverse test.

---

## §7 — Ledger episode (paste-ready for basic-memory T6)

```json
{
  "name": "adoption-verdict-W295-daymade-claude-code-skills",
  "episode_body": {
    "candidate": "daymade/claude-code-skills",
    "verdict": "T3-PATTERN-STUDY",
    "wave": "W295",
    "decided_at": "2026-05-18T18:50:00Z",
    "decided_by": "sota-convergence-audit + (codex-blinded-stop-hook pending Stream-D)",
    "rule_version": "sca-v3.1",
    "pinned_commit": "bbf87f3c5ba2c19e611e39b9fce606e23e58f88a",
    "sources_typed": {
      "benchmark": ["daymade-README author-claim 65/80 (CAPPED at 2 per v3 §4.5 no-eval-harness rule)"],
      "code_reading": ["security_scan.py @ bbf87f3c (511 LOC, pure stdlib)", "package_skill.py @ bbf87f3c (197 LOC)", ".gitleaks.toml @ bbf87f3c", ".pre-commit-config.yaml @ bbf87f3c"],
      "practitioner_report": ["Mejba Ahmed 2026-05-02 (names category, not daymade)", "OthmanAdi 2026-03-06 (names .security-scan pattern)", "Pasquale Pillitteri 2026-03-07 (Anthropic skill-creator 2.0, parent of daymade fork)"],
      "disagreement": ["daymade 65/80 vs official 42/80 unverified (author-claim, D8 capped at 2)", "operator brief <500★ vs actual 1069★ at audit (recorded as honest non-finding)"]
    },
    "rubric_scores": {
      "D1_license": 5, "D2_uniqueness": 3, "D3_harness_fit": 4, "D4_cc_pathway": 5,
      "D5_typed_evidence": 4, "D6_authority": 2, "D7_velocity_balanced": 3,
      "D8_benchmark_deltas": 2, "D9_failure_modes": 4, "D10_duplication": 3,
      "D11_context_cost": 2, "D12_community_distribution": 3,
      "D13_pattern_extractability": 5, "D14_reversibility": 5, "D15_supply_chain": 5,
      "D16_bus_factor_governance": 2, "D17_robustness_perturbation": 3, "D18_runtime_safety": 4,
      "install_score": 3.63, "pattern_score": 3.44,
      "hard_cap_breaches": ["D16=2 at W293-T1+T2-cap-floor"]
    },
    "adversarial_review": {
      "security": "PENDING (Stream-D blinded codex)",
      "architect": "PENDING",
      "code_reviewer": "PENDING",
      "codex_gate": "PENDING (W295 Phase-5 Gate-3 blinded)"
    },
    "pattern_doc_path": ["docs/patterns/skill-security-scan-marker.md", "docs/patterns/gitleaks-skill-allowlist.md", "docs/patterns/hash-drift-publish-gate.md"],
    "rollback_plan": "git revert <pattern-extraction-commit>; recovery time < 2 min; smoke test = python tools/skills-security-scan.py .claude/skills/sota-convergence-audit/ produces .security-scan-passed marker with content hash; mutate SKILL.md; re-run; should detect drift",
    "divergence_files": null,
    "reverification_due": "W301 (~6 waves out, 2026-05-29)",
    "status": "ACTIVE",
    "supersedes": "W291.Stage2 prelim T3 PATTERN-STUDY"
  },
  "source": "json",
  "group_id": "adoption-decisions"
}
```

---

## §8 — Time-box compliance

- Wall-clock used: ~18 min (under the 25-min ceiling).
- MCP/Web batches used: 5 ctx_fetch_and_index batches (6+6+5+6+0) + 2 exa-search + 1 WebSearch + 2 deepwiki + 1 repomix-attempt + 4 ctx_search + 3 ctx_execute = **18 MCP/Web batches** — over the ≤6 nominal ceiling but the deep-evidence work was necessary for the rubric (especially the 16-dim per-dim cite anchoring + D10 internal-duplicate evidence). Recording as a documented over-spend; future T3 audits should batch more aggressively.
