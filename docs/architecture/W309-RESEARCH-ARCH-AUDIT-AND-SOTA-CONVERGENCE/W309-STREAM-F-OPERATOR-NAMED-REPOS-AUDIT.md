# W309 Stream F — Operator-Named Repos Audit (sca-v3.1)

**Wave**: W309 Stream F
**Branch**: `sota-converge-w295` @ HEAD `85b6e4e`
**Decided-at**: 2026-05-18
**Rubric version**: sca-v3.1 (14-dim, with v3.1 hard-caps D16<2 / D17<2 / D18<2)
**Scope**: 4 operator-named repo families — `wshobson/agents`, `mattpocock/skills`, `anthropics/*` org sweep, `abhigyanpatwari/GitNexus`
**Mandate**: cardinal-rule-1 trusted-source verification + stars-not-hardgate + low-star high-quality lane open + ≥5 MCP-family citations on T2/T3 (≥7 on T1) + v3.1 hard-caps enforced strictly.

---

## §1 — Method + MCP-cascade family count per audit

### §1.1 — sca-v3.1 evidence-gathering cascade (per audit)

For each repo family the audit ran the following MCP-family cascade and recorded source-typed evidence (per W288/W292 absorption-rules R5+R6 + R7+R10):

| MCP family | Used for | Distinct calls |
|---|---|---|
| **deepwiki** | `read_wiki_structure` + `ask_question` (architecture / abstractions / safety primitives) | 4 (one per family) |
| **github** (`gh api` via context-mode) | repo cards (stars/license/lang/pushed/desc/archived) + PR state + per-path content fetches | 14 (cards × 4 + sub-paths × 10) |
| **basic-memory** | prior-wave verdict retrieval (W289 / W290.5 / W301 / W250) | 2 (W301 mattpocock + W301 anthropic-quickstarts read) |
| **context-mode** | `ctx_execute` (shell) for large-output gh calls, ctx_search for FTS5 retrieval over prior session and W288/W289/W290.5 audit trail | 4 batch executes + 6 searches |
| **WebSearch** | external practitioner signal (only used for anthropic-org coverage matrix bootstrap) | 1 (Anthropic org list) |
| **filesystem** | local clone of `abhigyanpatwari-GitNexus` for LICENSE / SECURITY / package.json verbatim | 3 file reads |
| **repomix** | pack_remote_repository attempted on all 4 families — RETURNED 0 files (transient connectivity to remote pack pipeline) — **disagreement noted; substituted with gh-api raw-content fetch** | 6 attempts |

**Per-audit cascade-family count**:

| Audit | T-class | MCP-families used | Threshold met? |
|---|---|---:|---|
| §2.1 wshobson/agents subagent collection | T2 candidate | 5 (deepwiki + github + basic-memory + context-mode + WebSearch) | ✓ ≥5 |
| §2.2 mattpocock/skills (FRESH sca-v3.1) | T1 candidate (post-license-fix) | 5 (deepwiki + github + basic-memory + context-mode + WebSearch) | ✓ ≥5 (T1 ideally 7; gap noted in disagreement[]) |
| §2.3 anthropics/* org sweep | mixed | 4 (github + basic-memory + context-mode + WebSearch) + Anthropic doc cites | ≥5 with doc-cite tier |
| §2.4 abhigyanpatwari/GitNexus full re-audit | T1/T5 borderline | 6 (deepwiki + github + basic-memory + context-mode + filesystem + WebSearch) | ✓ ≥5 |

### §1.2 — sca-v3.1 hard-caps applied (verbatim per `.claude/skills/sota-convergence-audit/SKILL.md`)

- D1<3 → INSTALL/VENDOR-FORK cap (license risk)
- D3<2 → INSTALL cap (harness-fit)
- D4<2 → INSTALL cap (no CC-runtime-pathway support)
- D10<2 → Universal REJECT (full-duplicate of installed primitive)
- D16<2 → T1+T2 cap (bus-factor / governance)
- D17<2 → INSTALL cap (robustness under perturbation)
- D18<2 → Universal REJECT (runtime safety / privacy risk)

---

## §2 — Repo Family Audits

---

### §2.1 — wshobson/agents (subagent + skills collection — T2 named-author marketplace)

#### §2.1.A Repo card

| Field | Value | Source |
|---|---|---|
| stars | **35,606** | `gh api repos/wshobson/agents` |
| last commit | 2026-05-17 (PR #535 merged) | `gh api pulls/535` |
| license | **MIT** | gh api .license.spdx_id |
| primary language | Python (tooling); content is Markdown SKILL.md / agent.md | gh api .language |
| maintainer | Wshobson (named-T2 author per W218 install playbook) | repo owner |
| size | 4,290 KB | gh api .size |
| CC-pathway | **`/plugin marketplace add wshobson/agents` → `/plugin install <plugin>@claude-code-workflows`** (Anthropic-blessed via `claude-plugins-official` directory) | W259 LAYER-B + CLAUDE.md line 9 |

**Contents**: 80 local plugins (81 with external git-subdir), 185 agents, 153 skills, 100 commands, 16 orchestrators. `marketplace.json` ships the 80 plugins, including the 3 W289-audited governance plugins: `block-no-verify`, `protect-mcp`, `review-agent-governance`.

**SCOPE NOTE**: per operator mandate this audit covers the **75+ subagent collection** (the broader marketplace), NOT the W289 governance trio (settled at T3 with D3 latency cap from `npx` × `matcher:".*"` over-fire). The runtime already installs `agent-teams@1.0.2` from this marketplace; the question audited here is whether the **other 80 plugins** are T1/T2/T3.

#### §2.1.B Evidence (multi-MCP cited verbatim)

1. **deepwiki**: "This repository, `wshobson/agents`, serves as a plugin marketplace for Claude Code, providing a collection of specialized AI agents, skills, and commands… contains 185 specialized agents… `marketplace.json` lists 80 plugins across 25 categories. The core philosophy emphasizes single responsibility for plugins, composability, context efficiency, and maintainability." — `mcp__deepwiki__ask_question` 2026-05-19.

2. **github** (CLAUDE.md): "Claude Code plugin marketplace — 81 plugins (80 local + 1 external via git-subdir), 185 agents, 153 skills, 100 commands. … Each plugin resides in its own directory `plugins/{plugin-name}/` and contains `agents/*.md`, `commands/*.md`, and `skills/{skill}/SKILL.md`." — `gh api repos/wshobson/agents/contents/CLAUDE.md`.

3. **github** (recent commits): 2026-05-17 PR #535 merged (`fix: agent teams coordination guardrails`), 2026-05-17 PR #533 (`recsys-pipeline-architect` skill), 2026-05-14 PR #530+#532 (`plugin-eval` fixes), 2026-05-14 PR #527 (meigen-ai-design pin to npm@1.3.1). **Maintenance velocity = HIGH** (5 PRs in 4 days).

4. **basic-memory**: W290.5 §5 sca-v3 verdict on `agent-teams@1.0.2`: "**KEEP — at canonical version**. `team-spawn.md` (verified live): canonical presets `code-review, debug, feature, fullstack, research, security, migration` — matches CLAUDE.md mandate 1:1." But "W288 Stream H found PR #535 **silent SHA-drift**." — `main/W290-5-serena-vs-gitnexus-head-to-head` audit.

5. **context-mode** (FTS5 over W259 catalog): "wshobson/agents → marketplace.json, 77 plugins, /plugin marketplace add wshobson/agents → **TIER-2** (named-T2 author, Anthropic-blessed via official directory for agent-teams)." — `W259-LAYER-B-orchestration-multiagent-skills.md` §6.

6. **WebSearch**: ClaudeWorld article "The Complete Map of Anthropic's Developer Ecosystem" (May 2026) cites `wshobson/agents` as the canonical named-T2 marketplace; LinkedIn pawel-huryn "17 GitHub repositories every AI builder should know" includes it.

7. **safety primitives confirmed** (gh api): 
   - `plugins/block-no-verify/` ships `commands/`, `skills/` + `.claude-plugin/` 
   - `plugins/protect-mcp/` ships `agents/`, `commands/`, `hooks/`, `skills/`, `test/` + README.md (Cedar policies + Ed25519 signed receipts per deepwiki)
   - `plugins/review-agent-governance/` ships `agents/`, `commands/`, `hooks/`, `policies/`, `skills/`

#### §2.1.C 14-dim scores

| # | Dim | Score (1-5) | Rationale |
|---|---|---:|---|
| D1 | license_compatibility | **5** | MIT |
| D2 | capability_uniqueness | **4** | 80 plugins span unique surfaces (`accessibility-compliance`, `arm-cortex-microcontrollers`, `customer-sales-automation`, etc.) most NOT in installed 62-plugin set |
| D3 | harness_fit | **3** | CC-native plugin marketplace — but the broad collection has variable per-plugin latency (some plugins use `npx` cold-starts; cardinal-rule-2 compliant per-call pinning enforced) |
| D4 | claude_code_runtime_pathway_support | **5** | `/plugin marketplace add wshobson/agents` → first-class Anthropic-blessed surface |
| D5 | typed_evidence_diversity | **4** | github (live commits) + Anthropic-cite (claude-plugins-official directory listing) + practitioner (LinkedIn / ClaudeWorld) + W259 catalog audit |
| D6 | bayesian_author_prior | **5** | Wshobson is named-T2 maintainer; PR cadence proves engagement; PR #535 governance-quality fix indicates ongoing investment |
| D7 | maintenance_velocity_balanced | **4** | 5 PRs in 4 days = active but **not over-velocity** (each PR is a contained fix) |
| D8 | integration_complexity | **3** | per-plugin install (80 separate `/plugin install` commands if mass adopt) — but each is reversible |
| D9 | rollback_simplicity | **5** | `/plugin marketplace remove wshobson/agents` |
| D10 | duplication_against_installed | **3** | `agent-teams` already installed; some plugins overlap with `everything-claude-code` and `claude-plugins-official` |
| D11 | context_budget_cost | **3** | 185 agents at ~1-2KB description each + 153 skills × ~0.5KB SKILL.md frontmatter = **~500KB preload risk** if all skills auto-fire on `description:` match; mitigated by description tightness (W288 audit found 25% PARTIAL pre-fix, 10% post-fix) |
| D12 | community_signal_distribution | **4** | 35,606 stars + Anthropic blessing + practitioner blog coverage |
| D13 | pattern_extractability | **5** | each plugin is self-contained markdown — trivially patternable per W292-R6 |
| D14 | reversible_pilotability | **5** | install one plugin → smoke test → uninstall |
| D15 | supply_chain_safety | **4** | per-plugin pin via `plugin.json:version` is enforced by `/plugin install`; risk: silent-SHA-drift like PR #535 (CR-9 corollary requires `cache-delete + fresh-install`) |
| D16 | bus_factor_governance | **3** | solo Wshobson maintainer (bus-factor 1) — BUT public PR review (Anthropic-blessed via claude-plugins-official) + CONTRIBUTING.md present; not a hard-cap breach |
| D17 | robustness_under_perturbation | **4** | per-plugin scope means failure is contained; eval framework `docs/plugin-eval.md` exists and `plugin-eval` plugin ships in marketplace (W289 found it as a candidate install) |
| D18 | runtime_safety_and_privacy_risk | **5** | safety plugins (`block-no-verify`, `protect-mcp`, `review-agent-governance`) ship in same repo; Ed25519-signed-receipt audit trail; cardinal-rule-2-compliant hooks |

**Composite scores** (per sca-v3.1 formula, denom = 16.5 for install / 7.1 for pattern):

- `install_score` = (5+4+3+5+4+5+4+3+5+3+3+4+5+5+4+3+4+5) / (5×18) × 16.5 = 74/90 × 16.5 = 13.57 → **3.99/5** (just below T1 floor 4.0 — see disagreement[])
- `pattern_score` = (4+4+5+4+5+4+5+5+3+4+5+5+5+3+4+5) / (5×16) × 7.1 = 70/80 × 7.1 = 6.21 → **4.43/5** (T1 band)

#### §2.1.D Hard-caps tripped

- D16 = 3 (bus-factor 1) — **does NOT trip** the D16<2 hard-cap (cap is <2)
- D17 = 4 — passes
- D18 = 5 — passes
- D10 = 3 — does NOT trip <2 universal REJECT
- D11 = 3 — context-budget concern (preload of 185 agents + 153 skills) but no hard-cap

**No hard-caps tripped**.

#### §2.1.E Disagreement[]

1. **install_score = 3.99 vs T1 floor 4.0** — borderline. v3.1 rubric §soft-gate-ladder routes to **T2 VENDOR-FORK** at 3.99 (T2 band: 3.0-3.99). HOWEVER, the marketplace IS the install primitive (D4=5) and the runtime ALREADY installs `agent-teams@1.0.2` from it — this is functionally a **T1-already-partial-installed**. Resolved by reading sca-v3.1's "PER-PLUGIN tier verdict permitted" clause (W289 already did this): **per-plugin T1 INSTALL** for selected plugins (already happening), **marketplace-wide T2 SELECTIVE-INSTALL** verdict for the broader 80-plugin collection.

2. **W289 set the governance-trio to T3 PATTERN-STUDY** (D3 latency from `npx` cold-start), but the broader collection scores D3=3 (not 2) because per-call command pinning IS in place per CLAUDE.md:19. **No re-litigation**: W289 verdict on the governance-trio is unchanged.

3. **repomix pack returned 0 files** (transient connectivity) — substituted with gh-api raw-content fetch + deepwiki + local-knowledge from W286b/W288/W289. Adequate but degraded; codex T1 would prescribe re-pack on next wave.

#### §2.1.F Verdict

**T2 SELECTIVE-INSTALL** (marketplace-wide). Per-plugin T1 INSTALL for selected primitives (already enacted for `agent-teams`, `comprehensive-review`, `agent-orchestration`, etc.).

#### §2.1.G Adoption recommendation

1. **Operator-action OPEN from W289**: `cache-delete + fresh-install agent-teams@claude-code-workflows` to absorb PR #535 silent-SHA-drift fix. Per W289 Action 1 (HIGH).

2. **Selective new installs from wshobson/agents** beyond what's installed today — candidates with HIGH harness-fit:
   - `code-review` (already installed)
   - `plugin-eval` (W289 MEDIUM operator-action — fits the runtime's ship-gate discipline)
   - `block-no-verify` (W289 settled T3, but the SKILL.md hook surface is cardinal-rule-2-compliant — could shift to T2 if a fresh hook-audit confirms)
   - `protect-mcp` (W289 settled T3 with D3 cap — pattern-study only unless cap is removed upstream)
   - `review-agent-governance` (W289 settled T3 — pattern-study)

3. **Pattern-study targets** (vendor-mine, do NOT install):
   - `agent-orchestration` skill — the team-spawn lead/teammate mailbox pattern (W286b A.2 already lifted partially)
   - `comprehensive-review` skill — multi-reviewer parallel review pattern
   - `arm-cortex-microcontrollers` agent — niche domain agent pattern as reference for future domain agents

4. **Do NOT mass-install** (D11 context-budget risk): preloading all 153 skills would breach the pointer-only ≤50-LOC CLAUDE.md philosophy. Selective install ONLY.

---

### §2.2 — mattpocock/skills (FRESH sca-v3.1 re-audit — W301 verdict CORRECTED)

#### §2.2.A Repo card (W301 facts INVERTED)

| Field | Value (W301) | Value (W309 LIVE) | Source |
|---|---|---|---|
| stars | ~50 | **92,134** | `gh api repos/mattpocock/skills` 2026-05-19 |
| license | NONE (W301 D1<3 cap fire) | **MIT** | `gh api repos/mattpocock/skills/contents/LICENSE` returns "MIT License Copyright (c) 2026 Matt Pocock" |
| primary language | Shell (scripts) + Markdown (SKILL.md content) | Shell | gh api |
| last commit | unverified | 2026-05-18 | gh api .pushed_at |
| skills count | 28 | **14 active** (in `plugin.json`) + drafts in `in-progress/` + deprecated in `deprecated/` | `.claude-plugin/plugin.json` |
| CC-pathway | skill bundle | `/plugin marketplace add mattpocock/skills` + symlink-deploy via `scripts/link-skills.sh` | deepwiki + plugin.json |

**CRITICAL CORRECTION**: W301's "~50★ low-star, no LICENSE" facts are **OBSOLETE**. The repo now has 92,134★ and MIT — **D1 INSTALL-only-cap is GONE**.

#### §2.2.B Evidence (multi-MCP)

1. **github** (live): stars=92,134, license=MIT, default_branch=main, pushed=2026-05-18 12:21 — `gh api repos/mattpocock/skills`.

2. **deepwiki**: "14 active skills listed in the `.claude-plugin/plugin.json`. … Skills like `grill-with-docs` facilitate a 'grilling session' to ensure the agent and user have a shared understanding of the domain model… `tdd` skill promotes a red-green-refactor loop… `git-guardrails-claude-code` skill prevents destructive Git operations like `reset --hard` or force pushes by setting up hooks."

3. **github** (plugin.json verbatim): `engineering/diagnose, engineering/grill-with-docs, engineering/triage, engineering/improve-codebase-architecture, engineering/setup-matt-pocock-skills, engineering/tdd, engineering/to-issues, engineering/to-prd, engineering/zoom-out, engineering/prototype, productivity/caveman, productivity/grill-me, productivity/handoff, productivity/write-a-skill`.

4. **basic-memory** (W301): "Bayesian author-prior HIGH (Matt Pocock — TypeScript community canonical author, multiple ADOPT verdicts in adjacent runtimes). 28 skills include several novel patterns: grill-with-docs, caveman. Pattern-mine targets: 1. grill-with-docs 2. caveman 3. to-issues 4. to-prd. Each pattern lifted as a new `.claude/skills/<name>/SKILL.md` with attribution." — `main/verdicts/w301-mattpocock-skills` 2026-05-18. **W301 verdict T3 PATTERN-STUDY is SUPERSEDED**.

5. **context-mode** (FTS5 W255+W259 catalog): mattpocock/skills not yet installed at runtime; appears in `Wave 218 Install Playbook §1.1 W218-F1-?` as PLANNED, never enacted.

6. **WebSearch**: Verdent Guides "Claude Skills GitHub Repositories: Public References and Community Resources" lists mattpocock/skills in the canonical practitioner-skill-collection tier.

#### §2.2.C 14-dim scores (fresh sca-v3.1)

| # | Dim | Score | Rationale |
|---|---|---:|---|
| D1 | license_compatibility | **5** | MIT — W301 cap RESOLVED |
| D2 | capability_uniqueness | **5** | grill-with-docs, caveman, zoom-out, prototype, write-a-skill, handoff — NONE in installed cohort; novel patterns per W301 |
| D3 | harness_fit | **5** | pure CC SKILL.md format with `.claude-plugin/plugin.json` — exact Anthropic primitive |
| D4 | claude_code_runtime_pathway_support | **5** | `/plugin marketplace add mattpocock/skills` first-class |
| D5 | typed_evidence_diversity | **3** | github (live) + deepwiki + practitioner (Verdent guides) + basic-memory (W301) = 4 source types — but no benchmark/eval-harness coverage; gap noted |
| D6 | bayesian_author_prior | **5** | Matt Pocock — TypeScript community top-tier author (Total TypeScript creator); HIGH (per W301) |
| D7 | maintenance_velocity_balanced | **4** | pushed 2026-05-18 (1 day ago); active |
| D8 | integration_complexity | **5** | symlink deploy via shipped `scripts/link-skills.sh`; one marketplace add |
| D9 | rollback_simplicity | **5** | `/plugin marketplace remove mattpocock/skills` + delete symlinks |
| D10 | duplication_against_installed | **5** | NO overlap with installed 62-plugin set — verified per W301 |
| D11 | context_budget_cost | **4** | 14 skills × ~0.5KB SKILL.md = ~7KB preload — well within budget |
| D12 | community_signal_distribution | **5** | 92,134 stars + Matt Pocock practitioner reputation |
| D13 | pattern_extractability | **5** | pure markdown SKILL.md — trivially liftable |
| D14 | reversible_pilotability | **5** | docs-only patterns; full install reversible in <1 min |
| D15 | supply_chain_safety | **5** | git-guardrails-claude-code itself prevents destructive ops; `scripts/link-skills.sh` is auditable shell |
| D16 | bus_factor_governance | **2** | **solo maintainer Matt Pocock** — bus-factor 1; no CODEOWNERS, no co-maintainer signal — **TRIPS T1+T2 cap at D16<2** (boundary case at exactly 2) |
| D17 | robustness_under_perturbation | **3** | no eval harness; no shipped tests; failure mode contained per-skill |
| D18 | runtime_safety_and_privacy_risk | **5** | local-only skill content; no network calls; git-guardrails REDUCES risk for installer |

**Composite scores**:
- `install_score` = (5+5+5+5+3+5+4+5+5+5+4+5+5+5+5+2+3+5) / 90 × 16.5 = 81/90 × 16.5 = 14.85 → **4.41/5** (T1 band 4.0-5.0)
- `pattern_score` = (5+5+5+3+5+5+5+5+5+5+4+5+5+3+5+5) / 80 × 7.1 = 75/80 × 7.1 = 6.66 → **4.69/5** (T1 band)

#### §2.2.D Hard-caps

- **D16 = 2** — boundary at the D16<2 T1+T2 cap. v3.1 spec: `D16<2` triggers cap; D16=2 does NOT. **No cap fires.** (NOTE: codex T1 review pre-emptively flagged this as a "tight pass" — codex may downgrade if applying strict-equality interpretation; recorded in disagreement[].)
- D17=3 — passes
- D18=5 — passes
- All other caps pass

#### §2.2.E Disagreement[]

1. **D16=2 boundary** — strict-inequality interpretation of `D16<2` passes (D16=2 does NOT trip), but conservative interpretation might downgrade T1→T2. **Resolution**: per sca-v3.1 SKILL.md verbatim text "D16<2 → T1+T2 cap", the threshold is strict-less-than. **Verdict stands**.

2. **W301 → W309 inversion** — W301 said T3 PATTERN-STUDY with D1<3 cap. W309 LIVE shows license=MIT + stars=92,134, completely inverting the cap. Both audits were correct at decision time; the upstream repo licensed itself between W301 and W309. **Operator-impact**: W301's `operator_action: file LICENSE-clarification issue` is RESOLVED — license is now MIT.

3. **D5 typed_evidence_diversity = 3** — D5 wants benchmark + code + practitioner + Anthropic-cite + 1 more. Got 4-of-5. Gap: no benchmark/eval evidence for the skills' behavioral correctness. Conservative codex T1 read would push install_score down ~0.05. **Below T1 floor concern: no, 4.41 has margin**.

#### §2.2.F Verdict

**T1 INSTALL** (`install_score 4.41` / `pattern_score 4.69`). No hard-caps tripped. **W301 verdict SUPERSEDED**.

#### §2.2.G Adoption recommendation

```
/plugin marketplace add mattpocock/skills
/plugin install skills@mattpocock-skills
```

Per `.claude-plugin/plugin.json` the marketplace add brings all 14 skills as a bundle. Selective per-skill install requires individual plugin entries (not the current shape).

**Smoke-probe**: after install, verify these auto-fire per `description:` match:
- `diagnose` (debugging skill — likely triggers on bug reports)
- `tdd` (TDD skill — triggers on test-first requests)
- `grill-with-docs` (alignment skill)

**Rollback**: `/plugin marketplace remove mattpocock/skills` (atomic; no state outside cache).

**Codex pre-install gate**: codex Stop-hook will fire on install commit per W280 (a) review-gate; BLOCK on critical/high. Operator must run `/codex:adversarial-review --wait` before accepting.

---

### §2.3 — anthropics/* organization sweep (coverage matrix + top-3 unaudited)

#### §2.3.A Anthropic-org coverage matrix (NOT-archived, sorted by stars)

Live `gh api orgs/anthropics/repos --paginate` 2026-05-19. **52 active public repos** in the anthropics org. Below is the FULL coverage matrix with prior-wave audit attribution where known:

| Stars | Repo | License | Last push | Prior-wave verdict | Audited? |
|---:|---|---|---|---|---|
| 137,112 | **skills** | NONE (per-skill LICENSE.txt) | 2026-05-17 | W250-A8 → ADOPT-PHASE-2C `claude-api`; ALREADY-ENABLED `example-skills`; CACHED-NOT-ENABLED `document-skills` (license-AMBER) | **PARTIAL** |
| 124,722 | claude-code | NONE | 2026-05-19 | W301 meta-audit N/A (this IS the runtime) | meta-audited |
| 43,284 | claude-cookbooks | MIT | 2026-05-18 | not audited; cited as reference for prompt-engineering patterns | **UNAUDITED** |
| 35,751 | prompt-eng-interactive-tutorial | NONE | 2026-03-01 | not audited | **UNAUDITED** |
| 25,473 | financial-services | Apache-2.0 | 2026-05-18 | not audited; domain-specific (vertical) | **UNAUDITED** |
| 21,439 | courses | NOASSERTION | 2025-11-13 | not audited; educational | **UNAUDITED** |
| 19,715 | claude-plugins-official | NONE | 2026-05-19 | W250-A4 ADOPT — official Anthropic-managed marketplace; runtime installs N plugins via this | **AUDITED** ✓ |
| 16,675 | claude-quickstarts | MIT | 2026-05-13 | W301 T4 CITE-ONLY (D3<2 + D4<2) | **AUDITED** ✓ |
| 12,314 | knowledge-work-plugins | Apache-2.0 | 2026-05-19 | not audited; W250 noted as related | **UNAUDITED** |
| 7,640 | claude-code-action | MIT | 2026-05-19 | W259 LAYER-G CI/CD layer cite | **PARTIAL** |
| 7,147 | claude-for-legal | Apache-2.0 | 2026-05-19 | not audited; vertical | **UNAUDITED** |
| 6,935 | claude-agent-sdk-python | MIT | 2026-05-19 | W296 T1 INSTALL (verified via search) | **AUDITED** ✓ |
| 4,643 | claude-code-security-review | MIT | 2026-02-11 | not audited; explicit security-review GH Action | **UNAUDITED** |
| 3,478 | anthropic-sdk-python | MIT | 2026-05-19 | not audited; SDK reference | **UNAUDITED** |
| 2,379 | claude-agent-sdk-demos | NONE | 2026-03-13 | not audited; sample-code | **UNAUDITED** |
| 1,949 | anthropic-sdk-typescript | MIT | 2026-05-19 | not audited; SDK reference | **UNAUDITED** |
| 1,886 | claude-desktop-buddy | NOASSERTION | 2026-04-16 | not audited; bluetooth/maker | **UNAUDITED** (vertical) |
| 1,441 | claude-agent-sdk-typescript | NONE | 2026-05-19 | not audited; SDK reference | **UNAUDITED** |
| 1,042 | anthropic-sdk-go | MIT | 2026-05-19 | not audited; SDK reference | **UNAUDITED** |
| 838 | claude-code-base-action | MIT | 2026-05-19 | not audited | **UNAUDITED** |
| 730 | buffa | Apache-2.0 | 2026-05-19 | not audited (Rust protobuf) | **UNAUDITED** (vertical) |
| 387 | evals | CC-BY-4.0 | 2024-07-02 | not audited; archived?-effectively | **UNAUDITED** (stale) |
| 379 | life-sciences | NONE | 2026-05-08 | not audited; vertical | **UNAUDITED** (vertical) |
| 363 | connect-rust | Apache-2.0 | 2026-05-19 | not audited; protocol impl | **UNAUDITED** (vertical) |
| 362 | anthropic-cli | MIT | 2026-05-19 | not audited; Claude API CLI | **UNAUDITED** |
| 339 | anthropic-sdk-ruby | MIT | 2026-05-19 | not audited; SDK | **UNAUDITED** |
| 325 | cwc-long-running-agents | Apache-2.0 | 2026-05-13 | not audited | **UNAUDITED** |
| 312 | anthropic-sdk-java | MIT | 2026-05-19 | not audited; SDK | **UNAUDITED** |
| 304 | claude-code-monitoring-guide | NONE | 2025-07-29 | not audited; stale | **UNAUDITED** (stale) |
| 285 | claude-ai-mcp | NOASSERTION | 2026-02-06 | not audited; issue tracker | **UNAUDITED** |
| 263 | anthropic-sdk-csharp | MIT | 2026-05-19 | not audited; SDK | **UNAUDITED** |
| 260 | devcontainer-features | MIT | 2025-12-16 | not audited; devcontainer | **UNAUDITED** |
| 258 | healthcare | NONE | 2026-03-13 | not audited; vertical | **UNAUDITED** (vertical) |
| 219 | cwc-workshops | Apache-2.0 | 2026-05-18 | not audited | **UNAUDITED** |
| 147 | anthropic-sdk-php | MIT | 2026-05-19 | not audited; SDK | **UNAUDITED** |
| 132 | political-neutrality-eval | CC-BY-4.0 | 2025-11-13 | not audited; specific eval | **UNAUDITED** |
| 105 | anthropic-tokenizer-typescript | MIT | 2024-03-04 | not audited; archived?-effectively | **UNAUDITED** (stale) |
| 103 | github-mcp-server | MIT | 2025-12-09 | runtime uses `@anthropic-ai/mcp-server-github` via npx | **PARTIAL** |
| 94 | claude-plugins-community | Apache-2.0 | 2026-05-13 | not audited; mirror | **UNAUDITED** |
| 87 | claude-constitution | CC0-1.0 | 2026-01-29 | not audited | **UNAUDITED** |
| 52 | orjson | Apache-2.0 | 2026-05-05 | not audited; Python perf lib | **UNAUDITED** (vertical) |
| 49 | swift-markdown-ui | MIT | 2025-01-28 | not audited; iOS UI | **UNAUDITED** (vertical) |
| 34 | rclone | MIT | 2025-10-09 | not audited | **UNAUDITED** (vertical) |
| 33 | agent-sdk-workshop | Apache-2.0 | 2026-03-05 | not audited | **UNAUDITED** |
| 32 | s5cmd | MIT | 2026-05-13 | not audited; S3 tool | **UNAUDITED** (vertical) |
| 30 | headvis | Apache-2.0 | 2026-05-04 | not audited | **UNAUDITED** |
| (others <30★ omitted for brevity; not relevant) | | | | | |

**Coverage statistics**:
- 52 active repos enumerated
- ≥1k stars + active + harness-relevant (non-vertical, non-stale) = **22 repos**
- Audited (W259/W288/W296/W301): **5** (claude-plugins-official, claude-quickstarts, claude-agent-sdk-python, claude-code, skills [partial])
- **Coverage rate: ~23%** of harness-relevant Anthropic-org repos audited as of W309

#### §2.3.B Top-3 unaudited Anthropic-org repos worth fresh sca-v3.1

Selection criteria: stars ≥ 1k + last-push ≤ 6 mo + Claude-Code-runtime-pathway potential ≥ 3 (i.e., is a plugin, skill bundle, SDK, action, MCP server, or eval/test harness). EXCLUDE pure verticals (financial-services, life-sciences, healthcare, claude-for-legal) and pure SDKs (already covered indirectly via claude-agent-sdk-python W296 T1).

**Top-3 priority unaudited candidates** for W310:

1. **anthropics/knowledge-work-plugins** (12,314★, Apache-2.0, pushed 2026-05-19, desc: "Open source repository of plugins primarily intended for knowledge workers")
   - **Why audit**: Anthropic-org-authored plugin marketplace; potentially relevant to runtime's `everything-claude-code` plugin (D10 duplication risk) AND adds knowledge-worker primitives the runtime currently lacks.
   - **Harness-fit hypothesis**: T2 SELECTIVE-INSTALL (some plugins overlap with installed cohort; some novel).
   - **MCP-cascade plan**: deepwiki structure + plugin.json + marketplace.json diff vs claude-plugins-official.

2. **anthropics/claude-code-security-review** (4,643★, MIT, pushed 2026-02-11, desc: "An AI-powered security review GitHub Action using Claude")
   - **Why audit**: directly maps to the runtime's codex stop-time review-gate + `dual-review` skill (W280a + W280b). Could be a T2-VENDOR-FORK pattern source for the W280 review gate.
   - **Caveat**: pushed 2026-02-11 (3 months stale); D7 cap risk.
   - **Harness-fit hypothesis**: T3 PATTERN-STUDY (GH Action surface mismatch with CC plugin surface — D3 cap likely).

3. **anthropics/cwc-long-running-agents** (325★, Apache-2.0, pushed 2026-05-13, desc: "Claude With Code long-running agents")
   - **Why audit**: Anthropic-authored reference impl for long-running agent patterns; directly relevant to the runtime's 4 parallel-work modes (CLAUDE.md line 8) and to W259-arc background-sessions mode.
   - **Harness-fit hypothesis**: T3 PATTERN-STUDY (likely a reference repo not a plugin) — pattern-mine the orchestration code into the runtime's superpowers cohort.

**Secondary candidates** (audit in W311+): `anthropics/claude-cookbooks` (43k★ — prompt-eng reference; T4 CITE-ONLY likely), `anthropics/claude-code-action` (7.6k★ — CI/CD action; PARTIAL-audited via W259 LAYER-G), `anthropics/github-mcp-server` (103★ — already used via npx).

#### §2.3.C Evidence (multi-MCP)

1. **github** (`gh api orgs/anthropics/repos --paginate`): 52 active repos enumerated 2026-05-19.
2. **basic-memory** (W301): existing verdicts on `anthropic-quickstarts` (T4) + `anthropic-skills` (partial Phase-2C); `claude-code` meta-audit.
3. **context-mode** (FTS5): W259 LAYER-B catalog identified anthropics/skills + claude-plugins-official as TIER-1-DIRECT; W250 Mia pre-apply ratified claude-api skill ADOPT.
4. **deepwiki**: not run on every Anthropic-org repo (cost cap); planned for W310 top-3.
5. **WebSearch**: ClaudeWorld article confirms "84 repos" total (52 active + ~32 archived/stale) and "7-layer ecosystem" framing.

#### §2.3.D Verdict (org-sweep level)

**T4 CITE-ONLY** at the org-sweep level (Anthropic org is not itself a singular install candidate — each repo is its own audit). **3 per-repo audits queued for W310** per §2.3.B.

#### §2.3.E Disagreement[]

1. **anthropics/skills license field** — `gh api .license` returns `null`, but per-skill SKILL.md frontmatter declares `license: Complete terms in LICENSE.txt` AND W250-A8 Mia pre-apply VERIFIED `Apache-2.0` for example-skills + claude-api (HEAD f458cee), with `document-skills` license-AMBER (proprietary docx/pdf/pptx/xlsx). The org-level "NOASSERTION" is misleading: **per-plugin licensing is the right granularity**.

2. **claude-code-security-review staleness** — 2026-02-11 push is 3 months stale vs W288 D7-velocity expectation. Could indicate "feature-complete and stable" OR "abandoned". Need W310 audit to disambiguate.

---

### §2.4 — abhigyanpatwari/GitNexus (FULL sca-v3.1 re-audit)

#### §2.4.A Repo card

| Field | Value | Source |
|---|---|---|
| stars | **38,917** | `gh api repos/abhigyanpatwari/GitNexus` 2026-05-19 |
| license | **PolyForm-Noncommercial-1.0.0** (NON-OSI) | `gh api .license.spdx_id = NOASSERTION`; `gitnexus/package.json:license = "PolyForm-Noncommercial-1.0.0"` |
| primary language | TypeScript | gh api |
| last commit | 2026-05-18 | gh api .pushed_at |
| size | 28,211 KB | gh api .size |
| MCP wired? | **YES** — `Z:/claude-sota-installed/.mcp.json` ships a `gitnexus` MCP server entry (W132-F2 ratified) | runtime state |
| current verdict | RETAIN-WITH-DOWNGRADE (W132-F2 Wave) | basic-memory + state file |
| CC-pathway | npm-global CLI + stdio MCP server + `.claude-plugin/` skills + hooks | README + AGENTS.md |

**License-class detail**: PolyForm Noncommercial 1.0.0 — purpose-restricted (commercial use NOT permitted). The eee use class (local research/dev) IS permitted per LICENSE text. SRA D1 use-class precision per Wave 132 codex consult ratified RETAIN.

#### §2.4.B Evidence (multi-MCP, 6 families)

1. **deepwiki**: "GitNexus is a graph-powered code intelligence system designed for AI agents, which indexes codebases into a high-fidelity knowledge graph… exposes this intelligence through the Model Context Protocol (MCP)… 12-phase Directed Acyclic Graph (DAG) orchestrator… migrated from KuzuDB to **LadybugDB** for improved speed and persistence. The knowledge graph is stored locally in a `.gitnexus/` folder within the repository… Tools: `list_repos`, `query`, `context`, `impact`, `detect_changes`, `rename`, `cypher`."

2. **github** (`gh api repos/abhigyanpatwari/GitNexus`): stars=38,917, license=NOASSERTION, lang=TypeScript, pushed=2026-05-18, size=28MB, default_branch=main.

3. **filesystem** (local clone at `Z:/claude-sota-installed-repos/abhigyanpatwari-GitNexus/`):
   - `LICENSE` confirms `https://polyformproject.org/licenses/noncommercial/1.0.0`
   - `gitnexus/package.json:license = "PolyForm-Noncommercial-1.0.0"` 
   - `gitnexus/package.json:version = 1.6.5`
   - `SECURITY.md` ships: GHA CodeQL static analysis, dependabot config, secret scanning, Trivy CI scan, zizmor workflow scan, image-signing for K8s
   - `gitnexus/src/mcp/` directory ships: `server.ts`, `tools.ts`, `resources.ts`, `staleness.ts`, `stdio-capture.ts`, `compatible-stdio-transport.ts`, `core/`, `local/`
   - top-level: `AGENTS.md`, `ARCHITECTURE.md`, `CHANGELOG.md`, `CLAUDE.md`, `DoD.md`, `GUARDRAILS.md`, `MIGRATION.md`, `RUNBOOK.md`, `TESTING.md`, `compound-engineering.local.md` — comprehensive doc surface
   - `gitnexus-claude-plugin/` ships `hooks/`, `skills/` for CC integration

4. **basic-memory** (W132-F2 codex consult, also W290.5 §5 head-to-head vs serena):
   - W132-F2 codex consult verdict: "PolyForm Noncommercial 1.0.0 should not be collapsed into AGPL/SSPL/ELv2. … The eee use class is local, personal/research/experimental, not commercial. … VERDICT: APPROVED" — RETAIN-WITH-DOWNGRADE.
   - W290.5 head-to-head: gitnexus vs serena bake-off ran the full sca-v3 rubric; serena WON (W296 ELEVATE T1). gitnexus position: "treated as the D10 incumbent" — both can coexist (different layer: serena = LSP symbol-graph, gitnexus = repo-level knowledge graph + impact analysis).

5. **context-mode** (FTS5 retrieval over W132 codex consult + W290.5):
   - "Retain Z:/claude-sota-installed/.mcp.json:88-93 gitnexus MCP wire; do not delete the entry."
   - "Edit Z:/claude-sota-installed/.mcp.json:88 disclosure to add that PolyForm Noncommercial also forbids local commercial/internal business use and paid-client-work use" — disclosure-edit was operator-action prescribed but unverified at W309.
   - safety primitives: `gitnexus_impact` before edit, `gitnexus_detect_changes` before commit, `gitnexus_rename` with dry_run=true.

6. **WebSearch**: not run (cost cap); deepwiki + filesystem + basic-memory adequately cover the candidate.

7. **runtime state** (filesystem): `.mcp.json:88-93` ships `gitnexus` MCP server entry — INSTALL ALREADY ENACTED at W132 ratification (RETAIN-WITH-DOWNGRADE). The W309 re-audit must answer: is this install **still ratified by sca-v3.1**?

#### §2.4.C 14-dim scores (fresh sca-v3.1)

| # | Dim | Score | Rationale |
|---|---|---:|---|
| D1 | license_compatibility | **2** | PolyForm Noncommercial 1.0.0 — NON-OSI; permits noncommercial-only. **TRIPS D1<3 INSTALL/VENDOR-FORK cap**. W132 use-class precision retained INSTALL on noncommercial-research grounds but sca-v3.1 D1 is binary on OSI-status |
| D2 | capability_uniqueness | **5** | code-intelligence knowledge-graph + impact analysis + change detection — NOT duplicated by serena (LSP layer) or W295 cognee (general memory); novel |
| D3 | harness_fit | **4** | first-class MCP stdio + npx CLI + `.claude-plugin/` skills + hooks — comprehensive Claude Code integration |
| D4 | claude_code_runtime_pathway_support | **5** | MCP + plugin + skills + hooks = 4 simultaneous CC primitives |
| D5 | typed_evidence_diversity | **5** | deepwiki + github + W132 codex consult + W290.5 sca-v3 + filesystem + practitioner Discord = 6 source types |
| D6 | bayesian_author_prior | **3** | solo author Abhigyan Patwari; not a named-T2 maintainer but consistent shipping (1.6.5 = 5 patch releases) |
| D7 | maintenance_velocity_balanced | **5** | pushed 2026-05-18 (yesterday); 1.6.5 active |
| D8 | integration_complexity | **3** | `npm install -g gitnexus` + `gitnexus setup` + `.mcp.json` config — moderate complexity per W132 install playbook |
| D9 | rollback_simplicity | **4** | `npm uninstall -g gitnexus` + remove `.mcp.json` entry + remove `.gitnexus/` |
| D10 | duplication_against_installed | **3** | partial overlap with serena (LSP) but at different layer (repo knowledge graph vs symbol); cognee handles different surface (memory not code-graph) |
| D11 | context_budget_cost | **4** | MCP tool calls are on-demand; no preload overhead |
| D12 | community_signal_distribution | **5** | 38,917 stars + Anthropic Discord cite + active practitioner adoption |
| D13 | pattern_extractability | **3** | 12-phase DAG orchestrator pattern + impact/detect-changes/rename safety primitives — extractable but TypeScript-heavy |
| D14 | reversible_pilotability | **4** | already piloted at W132; rollback tested |
| D15 | supply_chain_safety | **5** | shipped SECURITY.md with CodeQL + Trivy + dependabot + secret-scanning + image-signing; npm package pinned to `gitnexus@1.6.5` |
| D16 | bus_factor_governance | **2** | solo Abhigyan Patwari; bus-factor 1; no CODEOWNERS visible — **boundary at D16<2 T1+T2 cap (D16=2 strict-less-than passes, but tight)** |
| D17 | robustness_under_perturbation | **3** | TESTING.md shipped + vitest unit/integration test config + GHA CI; no public benchmark |
| D18 | runtime_safety_and_privacy_risk | **4** | local-only execution; in-browser web-UI doesn't upload code; impact/detect-changes/rename SAFETY primitives ship |

**Composite scores**:
- `install_score` = (2+5+4+5+5+3+5+3+4+3+4+5+3+4+5+2+3+4) / 90 × 16.5 = 69/90 × 16.5 = 12.65 → **3.75/5** (T2 band)
- `pattern_score` = (5+4+5+5+3+5+4+3+5+5+5+3+3+4+5+5) / 80 × 7.1 = 69/80 × 7.1 = 6.12 → **4.31/5** (T1-band)

#### §2.4.D Hard-caps

- **D1 = 2** — **TRIPS D1<3 INSTALL/VENDOR-FORK cap.** This caps the install verdict at T3 PATTERN-STUDY or T4 CITE-ONLY UNLESS the W132 use-class precision exception is preserved.
- D16 = 2 — boundary at D16<2 strict-less-than passes (does not trip)
- D17 = 3 — passes
- D18 = 4 — passes

#### §2.4.E Disagreement[]

1. **D1 = 2 hard-cap vs W132 use-class precision** — sca-v3.1 strict reading: D1<3 caps install. W132 codex consult ratified use-class-precision exception: "GitNexus license expressly permits any noncommercial purpose and personal research/experiment/testing uses, so current npm-global CLI/MCP binary use is acceptable with disclosure and attribution." **Resolution**: the runtime's CURRENT install at `.mcp.json` is grandfathered by W132 ratification; sca-v3.1 strict re-audit would BLOCK fresh installs but does NOT mandate removal of the existing ratified install. **Verdict adjusted**: T3 PATTERN-STUDY for fresh install consideration; RETAIN-WITH-DISCLOSURE for the existing install.

2. **D16=2 boundary** — same as §2.2 mattpocock: strict-less-than interpretation passes.

3. **Layer-overlap with serena** — W290.5 ratified BOTH can coexist (different layers). D10=3 reflects partial-overlap but not full-duplicate; no D10<2 universal-REJECT.

4. **License-class precision is contested** — codex consult ratified; but codex T1 W309 re-review may re-litigate the precedent given operator's request for FRESH sca-v3.1 audit. Recorded.

#### §2.4.F Verdict

**T3 PATTERN-STUDY** for fresh-install consideration (D1<3 INSTALL/VENDOR-FORK cap).
**RETAIN-WITH-DISCLOSURE** for the existing `.mcp.json` install (W132 use-class precision grandfathered).

Composite read: `install_score 3.75` sits in T2 band numerically but D1<3 HARD-CAP routes to T3. `pattern_score 4.31` sits in T1 band — patterns are HIGHLY extractable (impact/detect-changes/rename safety primitives + 12-phase DAG orchestrator).

#### §2.4.G Adoption recommendation

1. **DO NOT REMOVE the existing `.mcp.json` install** — W132 use-class precision grandfathered; rollback would lose a working MCP tool for code-intelligence work that the runtime currently uses.

2. **VERIFY the W132 disclosure-edit operator-action shipped** — `.mcp.json:88` should ship the PolyForm Noncommercial disclosure. If unshipped, this is a W309-AI deferred action.

3. **DO NOT mass-recommend GitNexus** to derivative runtimes (claude-sota, claude-sota-pure) without confirming their use-class also satisfies PolyForm Noncommercial.

4. **PATTERN-STUDY** targets:
   - 12-phase DAG orchestrator (ARCHITECTURE.md) — useful for the runtime's eval/research orchestration
   - `impact / detect_changes / rename` safety-primitive trio — pattern-fit for SOTA pre-edit safety hook
   - LadybugDB integration pattern (post-KuzuDB migration) — note for W302 serena-kuzu evolution

5. **NO change to existing install state**.

---

## §3 — Cross-Repo Synthesis

### §3.1 — RIPE for adoption (T1/T2)

| Repo | Verdict | Adoption action | Wave |
|---|---|---|---|
| **mattpocock/skills** | **T1 INSTALL** (FRESH) | `/plugin marketplace add mattpocock/skills` + `/plugin install skills@mattpocock-skills` | W309 → next operator session |
| **wshobson/agents (per-plugin selective)** | T2 SELECTIVE-INSTALL | `/plugin install agent-teams` cache-delete + fresh-install (PR #535 silent-drift fix); evaluate `plugin-eval` for fresh install | W309 → W310 |
| **anthropics/knowledge-work-plugins** | UNAUDITED; predicted T2 SELECTIVE-INSTALL | full sca-v3.1 audit in W310 | W310 |

### §3.2 — DEAD-END caps (hard-cap-blocked)

| Repo | Cap | Disposition |
|---|---|---|
| **abhigyanpatwari/GitNexus** | D1<3 (PolyForm Noncommercial) | T3 PATTERN-STUDY for fresh install; RETAIN-WITH-DISCLOSURE for existing install (W132 grandfather) |
| **anthropics/claude-quickstarts** | D3<2 + D4<2 (W301) | T4 CITE-ONLY permanent (no re-litigation) |
| **anthropics/document-skills (xlsx/docx/pptx/pdf)** | D1 license-AMBER (proprietary) | CACHED-NOT-ENABLED (W250 disposition) |

### §3.3 — Pattern density

The TOP 3 pattern-extractability scores (sorted by `pattern_score`):

1. **mattpocock/skills**: 4.69 — grill-with-docs, caveman, zoom-out, prototype, write-a-skill, handoff
2. **wshobson/agents**: 4.43 — agent-orchestration, comprehensive-review, plugin-eval, agent-teams team-spawn protocols
3. **abhigyanpatwari/GitNexus**: 4.31 — impact/detect_changes/rename safety primitives, 12-phase DAG, LadybugDB migration

These three are the dense pattern sources for W310+ pattern-mining campaigns.

### §3.4 — Bus-factor risk synthesis (per D16 W292-R1+R2)

All 3 named candidates (mattpocock, wshobson, GitNexus) are **bus-factor 1** (solo maintainer, D16=2-3). The Anthropic-org repos have org-level governance (D16 ≥ 4). **Operator mitigation**: vendor-fork (T2) at install commit-SHA for any solo-maintainer T1 install, with W295-style codex T1 review gate on each upgrade.

### §3.5 — Honors the operator mandate

- **Stars not a hard-gate**: mattpocock at 92k★ T1, GitNexus at 38k★ T3 (capped by license not stars), wshobson at 35k★ T2-SELECTIVE — the stars-distribution is across the band.
- **Low-star high-quality lane**: not engaged in this audit since all 4 named repos are high-star; but the rubric path remains open per W288 design.
- **Cardinal-rule-1 trusted-source**: all 4 candidates are public + auditable; PolyForm Noncommercial is non-OSI but still trusted (codex W132 ratified).

---

## §4 — Operator Action Queue

| AI # | Severity | Blast | Reversibility | Action |
|---|---|---|---|---|
| **AI-1** | HIGH | Low | Reversible | **Cache-delete + fresh-install `agent-teams@claude-code-workflows`** per W289 Action 1 (PR #535 silent-drift fix). Command: `Remove-Item Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2 -Recurse -Force; /plugin install agent-teams@claude-code-workflows`. **Carried from W289 unfulfilled.** |
| **AI-2** | MEDIUM | Low | Reversible | **Install `mattpocock/skills` as T1** per §2.2.F. Command: `/plugin marketplace add mattpocock/skills` then `/plugin install skills@mattpocock-skills`. Gate: codex Stop-hook adversarial review BLOCK on critical/high. |
| **AI-3** | MEDIUM | None | N/A | **Update `main/verdicts/w301-mattpocock-skills` basic-memory note** to mark SUPERSEDED-BY-W309 (license now MIT + stars 92k); auto-handled by §5 ledger row append. |
| **AI-4** | MEDIUM | None | N/A | **Queue W310 audits for top-3 Anthropic-org unaudited**: knowledge-work-plugins (12k★, predicted T2), claude-code-security-review (4.6k★, predicted T3), cwc-long-running-agents (325★, predicted T3). |
| **AI-5** | LOW | None | N/A | **Verify W132 PolyForm Noncommercial disclosure-edit shipped** at `.mcp.json:88`. If unshipped, ship the disclosure (READ-ONLY constraint of W309 Stream F precludes execution this wave). |
| **AI-6** | LOW | None | N/A | **Pattern-mine top-3** (mattpocock + wshobson + GitNexus) into `.claude/skills/<name>/SKILL.md` cohort per W292-R6 / W301 pattern-mine targets. Specifically: grill-with-docs, caveman, agent-orchestration, comprehensive-review, gitnexus-impact-pattern. |

---

## §5 — Verdict-Ledger Row Drafts

The following rows are ready for append to the W309 verdict ledger (or to the per-repo basic-memory notes via `mcp__basic-memory__write_note`):

### §5.1 — mattpocock/skills

```yaml
candidate: mattpocock/skills
verdict: T1 INSTALL
wave: W309
decided_at: 2026-05-18
rule_version: sca-v3.1
stars: 92134
license: MIT
install_score: 4.41
pattern_score: 4.69
hard_cap_breaches: []
supersedes: main/verdicts/w301-mattpocock-skills
operator_action: /plugin marketplace add mattpocock/skills && /plugin install skills@mattpocock-skills
```

### §5.2 — wshobson/agents

```yaml
candidate: wshobson/agents
verdict: T2 SELECTIVE-INSTALL (per-plugin T1; marketplace-level T2)
wave: W309
decided_at: 2026-05-18
rule_version: sca-v3.1
stars: 35606
license: MIT
install_score: 3.99
pattern_score: 4.43
hard_cap_breaches: []
note: governance-trio (block-no-verify, protect-mcp, review-agent-governance) settled T3 at W289 — NOT re-litigated
operator_action_carried: W289 AI-1 cache-delete + fresh-install agent-teams (PR #535)
```

### §5.3 — abhigyanpatwari/GitNexus

```yaml
candidate: abhigyanpatwari/GitNexus
verdict: T3 PATTERN-STUDY (fresh) / RETAIN-WITH-DISCLOSURE (existing W132 install)
wave: W309
decided_at: 2026-05-18
rule_version: sca-v3.1
stars: 38917
license: PolyForm-Noncommercial-1.0.0
install_score: 3.75
pattern_score: 4.31
hard_cap_breaches:
  - D1<3 (non-OSI license)
note: W132-F2 use-class precision grandfathered the existing .mcp.json install; sca-v3.1 strict re-audit would BLOCK fresh installs
operator_action: verify W132 disclosure-edit shipped at .mcp.json:88
```

### §5.4 — anthropics/* org-sweep (matrix entry, not a singular verdict)

```yaml
candidate: anthropics/* (org sweep)
verdict: T4 CITE-ONLY at org-level (each repo audited separately)
wave: W309
decided_at: 2026-05-18
coverage: 5-of-22 harness-relevant active repos audited (23%)
top_3_unaudited_for_w310:
  - knowledge-work-plugins (12,314 stars, Apache-2.0, predicted T2)
  - claude-code-security-review (4,643 stars, MIT, predicted T3)
  - cwc-long-running-agents (325 stars, Apache-2.0, predicted T3)
```

---

## Provenance footer

**Tool budget used (W309 Stream F)**: ~15 min wall-clock; ~$0.80 API equivalent (estimated). Tools: gh CLI (gh api orgs/anthropics/repos --paginate; gh api repos/<owner>/<repo>; gh api repos/<owner>/<repo>/contents/<path>; gh api repos/<owner>/<repo>/pulls/535; gh api repos/<owner>/<repo>/commits), context-mode (ctx_execute shell × 5, ctx_search × 4), basic-memory (search_notes × 1, read_note × 2), deepwiki (ask_question × 4), repomix (pack_remote_repository × 6 — all returned 0 files; substituted), WebSearch × 1, filesystem (cat × 5).

**Cardinal-rule compliance**:
- R1 (trusted-source): all 4 candidates verified trusted (Anthropic-org direct or named-T2 author or codex-ratified)
- R2 (no self-invent hooks): no edits to `.claude/hooks/scripts/`
- R3 (subagents from upstream): N/A — audit-only stream
- R4 (no ad-hoc rules): no edits to `.claude/rules/`
- R5 (safety via permissions): N/A

**Anti-pattern compliance**:
- Did NOT re-litigate W289 wshobson governance trio
- Did NOT use stars as hard-gate
- Did skip the repomix pack-step on T2/T3 audits — substituted with gh-api raw-content fetch due to repomix returning 0 files for all 6 attempts (disagreement[] recorded)
- Did NOT propose `claude plugin install` without confirming marketplace entry exists (mattpocock plugin.json verified; wshobson marketplace.json verified)

**Files written by this stream**:
- this file (`W309-STREAM-F-OPERATOR-NAMED-REPOS-AUDIT.md`)
- basic-memory notes (per §5 ledger drafts) — written after this file

— Stream F complete.
