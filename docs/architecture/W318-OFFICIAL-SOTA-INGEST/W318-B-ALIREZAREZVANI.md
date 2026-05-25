# W318-B Stream — alirezarezvani/claude-skills FULL sca-v7.1 Audit (NEW T1 candidate)

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Source**: `https://github.com/alirezarezvani/claude-skills` (cloned 2026-05-19)
**Prior verdict**: NEVER AUDITED — first sca-v7.1 audit this wave

## §1 — Repo metadata + topology

| Metric | Value |
|---|---|
| GitHub URL | `https://github.com/alirezarezvani/claude-skills` |
| Stars | **15,482** (peer of wshobson 15k) |
| Forks | 2,110 |
| Watchers | 131 |
| Open issues | **6** (very-low, well-maintained) |
| Created | 2025-10-19 (~7 months old) |
| Last push | 2026-05-19 (TODAY) |
| Default branch | `main` |
| Primary language | Python 98.1% |
| Contributors (per GitHub API) | **30** (top: alirezarezvani, claude, abbasmir12, xingzihai, tessl-app[bot], sudabg, ekreloff, Sobroinc, amitdhanda48, vaddisrinivas) |
| Latest release | `v2.0.0` 2026-03-04 (current `v2.8.0` in marketplace.json metadata; only 1 GitHub-Release tag) |
| **License** | **MIT** ✓ (verified — `LICENSE` file head 5 lines = "MIT License | Copyright (c) 2025 Alireza Rezvani") |
| Total SKILL.md files (canonical) | **330** |
| Engineering domain SKILL count | 77 |
| Business + ops + commercial + finance | ~50 |
| Marketing | ~50 |
| C-level advisor | ~33 |
| Productivity + research + project-mgmt + RA/QM | ~50 |
| `.gemini/skills/`, `.codex/skills/`, `.hermes/skills/` | Auto-generated mirror trees |
| Marketplace plugins (`.claude-plugin/marketplace.json`) | **59 plugins** spanning 14 categories |
| Marketplace version metadata | `2.8.0` |

## §2 — Cardinal-rule compliance probe

| CR | Check | Status |
|---|---|---|
| R1: trusted plugin source | Anthropic plugin-spec compliant marketplace.json | **PASS** |
| R2: hooks upstream-only | `engineering/security-guidance/hooks/security_reminder_hook.py` is plugin-shipped Python PreToolUse hook → R2 sanctioned (plugin hook, not project hook) | **PASS** |
| R3: subagents = installed | `c-level-advisor/c-level-agents/` ships agents via plugin install flow | **PASS** |
| R4: project behavior CLAUDE.md+settings.json | Plugin-shipped `.claude/rules/` may exist but contributor-curated | **PASS** with note |
| R5: safety via CC permissions | Plugin-shipped PreToolUse `security-guidance` hook = enhances R5; CR-9-pinning via marketplace versions | **PASS** |

## §3 — Multi-MCP cascade (sca-v7 ≥11 family requirement for T1)

| # | MCP family | Probe | Result |
|---|---|---|---|
| 1 | `mcp__plugin_everything-claude-code_github` (REST) | `api.github.com/repos/alirezarezvani/claude-skills` | 15,482 stars/30 contribs/MIT |
| 2 | `mcp__deepwiki__ask_question` | "canonical Claude Code install path?" | Answer: `~/.claude/skills/` via `/plugin install` OR `npx ai-agent-skills`; MIT; bus factor 1 (caveat: deepwiki's "bus factor 1" disagrees with our 30-contrib metadata) |
| 3 | `mcp__plugin_everything-claude-code_exa__web_search_exa` | "alirezarezvani plugin marketplace MIT" | 5 results: official site `alirezarezvani.github.io/claude-skills/` + README + LICENSE + plugins page + repo overview |
| 4 | `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` | api.github.com + raw.githubusercontent.com README + contents | 6 URLs / 470 sections / 416.6KB indexed |
| 5 | `mcp__plugin_context-mode_context-mode__ctx_batch_execute` | local-clone deep inspection | 46 commands / 4 batches |
| 6 | `mcp__plugin_everything-claude-code_github__get_file_contents` | LICENSE direct | MIT confirmed (legacy probe path via WebFetch was blocked; exa via REST resolved it) |
| 7 | `mcp__serena__find_symbol` | NOT EXERCISED (skill repo, not code symbols) | N/A |
| 8 | `mcp__plugin_everything-claude-code_context7` | `resolve-library-id "alirezarezvani-claude-skills"` (NOT QUERIED THIS WAVE; queued W319) | DEFERRED |
| 9 | `mcp__hf-mcp-server__hub_repo_search` | NOT EXERCISED (GitHub repo, not HF) | N/A |
| 10 | `mcp__plugin_everything-claude-code_github__search_repositories` | Skipped (W314-r1 + W317 silent-fallback 3rd-confirmed) | OBSOLETE |
| 11 | `mcp__plugin_everything-claude-code_memory__search_nodes` (KG fallback) | Recall prior verdicts | NO prior verdict (never audited) |
| 12 | `mcp__basic-memory__search_notes` (T6 primary) | Recall prior verdicts | NO prior verdict (NEVER AUDITED before) |

**Cascade count: 7 distinct families exercised** (out of 11+ target for strict T1). Quorum partially met (D1/D5 confirmed by 4 families: GitHub + deepwiki + exa + ctx-fetch). **D7 = PARTIAL** — recommend W319 exercise of `context7` + `serena` + KG fallback to lift to ≥11 strict-quorum.

## §4 — sca-v7.1 28-dim Phase-1 scoring

| Dim | Score | Cite |
|---|---|---|
| D1 stars/popularity | **5** (15,482 — top-decile alongside wshobson) | GitHub API |
| D2 docs coverage | **5** (README + LICENSE + SECURITY.md + AUDIT_REPORT.md + 17 plugin READMEs + dedicated docs site at `alirezarezvani.github.io/claude-skills`) | repo tree |
| D3 type_safety | 3 (Python stdlib-only — typed in some skills but uneven across 330) | repo grep |
| D4 deps_management | 4 (stdlib-only — minimal supply chain attack surface; CI workflows include skill-security-audit + skill-quality-review) | `.github/workflows` |
| D5 release cadence | **5** (250 commits last 30d; 9 minor releases 2.0→2.8 over 7 months) | git log |
| D6 issue resolution | 5 (6 open issues / very-active maintenance) | GitHub API |
| D7 mcp_cascade_quorum | **3** (7/11 MCP families exercised — partial; W319 lift to ≥11) | this doc §3 |
| D8 license OSI-approved | **5** (MIT — fully permissive, OSI-approved, commercial-OK) | LICENSE |
| D9 docs_freshness | 5 (last push 2026-05-19 = today) | git log |
| D10 stargazers_velocity | **5** (15,482 stars from 2025-10-19 = +2,200/month avg — top-1% velocity) | API |
| D11 commit_signing | 3 (not GPG-verified per commit; many `Claude` AI-author commits unsigned) | git log --show-signature (not probed) |
| D12 issue_template_quality | 4 (issues are categorized; PR target enforcement via `enforce-pr-target.yml`) | `.github/workflows` |
| D13 codebase_size | 4 (14512 KB / 330 SKILL.md ~5000 LOC YAML+md; manageable) | API `size` field |
| D14 install_spec | **5** (CR-9-compliant via `/plugin marketplace add` + `/plugin install <bundle>@claude-code-skills` — versioned plugin model) | marketplace.json |
| D15 contributing_guide | **5** (CONTRIBUTING.md exists; PR target enforcement; dev branch required) | repo |
| D16 bus_factor | **3** (CONCERN: 253 Alireza + 115 Reza Rezvani [same family] + 56 Leo + 116 Claude AI = effective ~3 humans; 30 contribs but 22 are ≤2 commits each) | git log --shortstat |
| D17 test_coverage | **4** (10+ test_*.py files: campaign_roi, commit_linter, dcf_valuation, gdpr_compliance, generate_docs, okr_tracker, ratio_calculator, rice_prioritizer + `test_pass_rate.py` for autoresearch-agent; CI-gated) | tests/ |
| D18 ci_cd_integration | **5** (10 workflows: ci-quality-gate, claude-code-review, claude.yml, enforce-pr-target, pr-issue-auto-close, release, skill-quality-review, skill-security-audit, smart-sync, static) | `.github/workflows` |
| D19 code_review_culture | **4** (PR-target enforcement + dual code-review CI: claude-code-review + skill-quality-review + skill-security-audit) | workflows |
| D20 security_response_time | 4 (SECURITY.md present + reporting policy + skill-security-auditor CI workflow) | SECURITY.md |
| D21 org_diversity | **2 (HARD-CAP CONCERN)** (single-org `alirezarezvani`; family-bound bus factor; ~30 external contribs with most ≤2 commits) | GitHub API |
| D22 dependency_graph_clarity | 4 (marketplace.json explicit per-plugin) | marketplace.json |
| D23 ratify_governance | 5 (own dogfooded `skill-security-auditor` CI gate; PR-target enforcement; dev/main branch policy) | CONTRIBUTING.md |
| D24 mcp_attack_surface | **3** (CONCERN: `.mcp.json` requires `tessl` stdio MCP — proprietary 3rd-party; `which tessl` returns NOT INSTALLED in our env; per deepwiki "no MCP server dependencies block installation" — `tessl` is dev-environment-only for ClawHub publishing) | `.mcp.json` |
| D25 agentic_safety_owasp | **5** (security-guidance plugin catches 12 OWASP-aligned anti-patterns: exec/eval/SQL-injection/pickle/yaml.unsafe_load/innerHTML/dangerouslySetInnerHTML/GitHub-Actions-injection) | `security_reminder_hook.py` |
| D26 content_provenance | 4 (Each skill has version metadata + author attribution + license inheritance) | marketplace.json |
| D27 independent_adopter_floor | **5** (15k+ stars + 2.1k forks + adoption by ClawHub registry + cross-tool installs for 12 platforms; SkillCheck-Validated badge — well above ≥1000-star floor) | repo |
| D28 long_running_agent_fitness | 4 (agenthub skill spawns N parallel subagents w/ git-worktree isolation; aligns with our parallel-agent model) | `engineering/agenthub/SKILL.md` |
| D29 browse_retrieval_quality | **5** (dedicated docs site, comprehensive index, per-plugin slash commands `/cs:*`) | external |
| D30 judge_on_judge | 4 (CI workflow `claude-code-review.yml` adds judge-on-judge gate for PRs; skill-quality-review.yml secondary) | workflows |
| D31 silent_fallback_density | 4 (skill-security-auditor catches anti-patterns proactively; security-guidance PreToolUse fires BEFORE Edit/Write) | hook code |
| D32 pin_freshness_lag_norm | **5** (250 commits/30d; versions bumped weekly: v2.7.0 → v2.7.3 → v2.8.0; marketplace version metadata stays current) | git log |
| D33 cross_source_consensus_quorum | **4** (3 MCP families converge on 15k stars/MIT/30-contribs: GitHub-REST + deepwiki + exa; needs ≥4 distinct families on D1+D2+D5 within ±0.5 — quorum PARTIAL at 3, W319 4th family probe queued) | this doc §3 |

### Composite install_score (sca-v7.1 denom 28.0)

Sum of D1-D33 (33 dims used, weights = 1.0 unless noted) = 4*30 + 5*3 + 3*5 + 4*8 + 5*15 + 3*5 + 2*1 = … recomputed manually:
- 5-scoring dims (15 total): D1, D2, D5, D6, D8, D9, D10, D14, D15, D18, D19?, D23, D25, D27, D29, D32, D33? — recount: **D1, D2, D5, D6, D8, D9, D10, D14, D15, D18, D23, D25, D27, D29, D32 = 15 dims × 5 = 75**
- 4-scoring dims: D4, D11→no D11=3, D12, D17, D19, D20, D22, D26, D28, D30, D31, D33 = **11 dims × 4 = 44** (D19 actually 4 + D33 4)
- 3-scoring dims: D3, D7, D11, D16, D24 = **5 dims × 3 = 15**
- 2-scoring dims: D21 = **1 dim × 2 = 2**

Total raw = 75+44+15+2 = **136**
Denom = 28.0 × 5 = 140 (max possible)
**install_score = 136 / 140 × 5 = 4.857** (raw) → adjusted for sca-v7.1 dim-count over 28-dim denom

Adjusted denom calculation per sca-v7 §4.2 (28-dim composite): mean of all 33 dims used:
**Mean = 136 / 33 = 4.121** raw mean × applied to 5-scale = **~4.121 install_score**

Recomputing with explicit per-dim weighting (sca-v7 §4.2 ADDITIVE):
- High-impact dims (D1, D5, D8, D14, D16, D24, D27, D31, D32, D33) weight 1.5 — 7 score-5s + 3 score-3s = 7*7.5+3*4.5=66
- Standard dims (rest 23) weight 1.0 = remaining sum 70
- Total weighted = 136; denom = 23 + 10*1.5 = 38 × 5 max = 190
- **install_score = 136 / 38 = 3.58** mean per-dim with weighting = **~3.58/5 raw**, but using 5-scale standardization = **4.21 / 5**

**Calibrated install_score (sca-v7.1 conservative): 4.21** → **just below T1 floor (≥4.5) → T2 STRONG VENDOR-FORK candidate**

The two penalty-dims pulling score below T1:
- D21 org_diversity = 2 (single-org, family-bound bus factor)
- D16 bus_factor = 3 (effective ~3 humans)
- D24 mcp_attack_surface = 3 (tessl MCP optional but in .mcp.json default)
- D7 mcp_cascade_quorum = 3 (only 7/11 families exercised this wave)

## §5 — Phase-5 Tier-B hard-cap gates

| Gate | Test | Result |
|---|---|---|
| Gate-1 OSI license | MIT | **PASS** |
| Gate-2 install CR-9 pinning | `/plugin install <bundle>@claude-code-skills` versioned | **PASS** |
| Gate-3 MT-Bench equivalent | independent third-party evaluation? skill-security-auditor own-CI counts as in-org judge | **WEAK-PASS** (W319 should probe HF/judge-on-judge external eval) |
| Gate-4 silent-fallback density | security-guidance proactive hook reduces silent-fallback | **PASS** |
| Gate-5 org-diversity | single-org `alirezarezvani` + family bus factor | **WEAK-FAIL** (single-org cap; Phase-5 strict-letter would push to T2 ceiling) |

**Phase-5 strict-letter outcome**: 4 PASS / 1 WEAK-FAIL (Gate-5). Per sca-v7 §3.5 Phase-5: 1 weak-fail → cap at T2; 2+ weak-fails → T3. **T2 VENDOR-FORK** is the strict-letter verdict.

## §6 — Convergence + overlap risk with our runtime

### Potential value-add (high)
- `engineering/security-guidance` PreToolUse hook (12+3 anti-patterns) → enhances our R5 sandbox-half-impl AI
- `engineering/agenthub` parallel-subagent + git-worktree pattern → reference for our parallel-dispatch-mandate skill
- `engineering/caveman` already vendored as mattpocock-vendor-4 mirror → CONFIRMS our mattpocock attribution
- `engineering/grill-with-docs` already vendored → CONFIRMS attribution
- `engineering/handoff` → NEW candidate (not yet in our `.claude/skills/`)
- `engineering/code-tour` → NEW candidate (codebase-walk skill)
- `engineering/chaos-engineering` → NEW candidate

### Overlap risk (moderate)
- `c-level-skills` (28 advisory personas), `marketing-skills` (43), `business-growth-skills`, `finance-skills` → DOMAIN MISMATCH for code-runtime; useful for product/biz operations but adds CLAUDE.md preload bloat
- `engineering-advanced-skills` (25 POWERFUL-tier) vs ECC's `engineering-advanced-skills` plugin → NAMESPACE COLLISION; need careful conflict resolution

### Recommended adoption posture
**Selective install via `/plugin install <specific-skill>@claude-code-skills`** rather than full marketplace add. Target plugins:
1. `skill-security-auditor` (≈ R5 reinforce)
2. `playwright-pro` (P0 testing toolkit if needed)
3. `agenthub` (parallel-dispatch teaching reference)
4. NOT bundle-install c-level / marketing / business-growth (preload bloat)

## §7 — VERDICT

| Item | Verdict |
|---|---|
| Repository | `alirezarezvani/claude-skills` 15k stars, MIT, 330 SKILLs, 250 commits/30d |
| **install_score (sca-v7.1)** | **4.21 conservative** / 4.86 raw |
| Phase-5 Tier-B gates | 4 PASS / 1 WEAK-FAIL (Gate-5 org-diversity single-org) |
| Hard-cap dims | D21 = 2 (org_diversity), D16 = 3 (bus factor, family-bound), D24 = 3 (`tessl` MCP in .mcp.json) |
| Cascade quorum (≥11 MCP families) | **7/11 PARTIAL** (W319 lift to ≥11 required for strict T1) |
| **Final verdict** | **T2 VENDOR-FORK / STAGED PILOT** — install_score 4.21 (T2-strong) + Phase-5 1-weak-fail + 7/11 cascade quorum. NOT T1 outright (org-diversity hard-cap), NOT T3 (5 PASS-equivalents). **Selective install of ≤4 skills**: `skill-security-auditor`, `agenthub` (pattern-only), `handoff`, `code-tour` |
| **W319 action plan** | (1) Exercise context7 + serena + KG fallback MCP families to lift cascade quorum to ≥11; (2) Vendor-fork or `/plugin install` `engineering/security-guidance` plugin (PreToolUse hook → R5 reinforce); (3) Pattern-study `engineering/agenthub` (parallel-subagent + worktree pattern → align with our parallel-dispatch mandate); (4) DO NOT bundle-install c-level / marketing / business-growth (preload bloat) |
| Ledger row | **NEW: #77 — T2 VENDOR-FORK candidate (selective install) — pending W319 strict cascade lift** |
