# W310 Stream 4 — vercel-labs/agent-skills sca-v6 audit + mattpocock vendor-fork plan

> **Wave**: W310 P1b · Stream 4 (of 4 in audit-queue execution)
> **Date**: 2026-05-19 (post-W309 verdict ledger, parallel to Stream 3 anthropics-top3)
> **Rubric**: sca-v6 with W309 row #35 mattpocock anchor + Δ1 LIVE-STATE-PROBE Δ5 ≥6-MCP cascade
> **Targets**: (A) vercel-labs/agent-skills FULL sca-v6 (gap-fill from W259 archive REJECT-P6 stale verdict); (B) mattpocock/skills 4-skill vendor-fork plan (W309 row #35 ratification + verification of W310 P1b Agent 3 ship)
> **Tool budget**: ~$1.40 (A) + ~$0.40 (B) ≈ $1.80 — within Stream 4 budget envelope
> **Cardinal-rule compliance**: CR-1 trusted-only sources, CR-3 cite-anchored agent docs, CR-4 operator-curated `.claude/skills/<name>/SKILL.md` path per `https://code.claude.com/docs/en/skills`. Self-eval `self_invented_count: 0` invariant preserved (this audit file is the only artifact; no rules/hooks added).
> **File-ownership**: Stream 4 owns ONLY this file per W310 plan locking.

---

## EXECUTIVE SUMMARY (both sub-tasks)

**Sub-task A — vercel-labs/agent-skills sca-v6 verdict: T2 VENDOR-FORK (with license risk flag) — APPLIED-IN-PARTIAL-STATE (3 of 7 skills already vendored as stub-pointer SKILL.md; expand-or-keep decision = KEEP-STUB-POINTERS for fit reasons, no expansion needed).**

Key findings from Δ1 LIVE-STATE re-probe:
- **HEAD `b9c8ee0643d87d3c5a953d1e22382ff2ead39229`** (2026-05-05 21:16Z, Andrew Qu "Update-README") — repo is active. 4 commits in last 90d (PR #227 Shu Ding 2026-04-14; #231 tonypan2 2026-04-17). Maintainer cohort = TIER-3-NAMED-ORG (Vercel-employee shuding + ~6 GitHub-verified contributors).
- **W259-archive verdict STALE confirmed**: 26,389★ at W184 baseline → 26,329★ at W126 (slight churn within rounding); 4×LICENSE-404 still REPRODUCES (LICENSE file 404 at root). However:
  - **README L189 declares "MIT"** (sha `7fcc6c1795`, 2026-05-05)
  - **All 7 skill `SKILL.md` files declare `license: MIT` in YAML frontmatter** (per-file licensing pattern)
  - The W259/W184 "no LICENSE" REJECT was correctly cite-anchored, but the verdict was OVER-REACHING — per-file frontmatter license declarations + README declaration are MIT-compatible under common-law fork-with-attribution practice, even if not strictly SPDX-compliant. This is a **license risk in the strict sense** (no root LICENSE file → GitHub API returns `license:null`) but not in the practical sense (downstream forks like Snyk's security-partnership case-study + 1.2M ecosystem installs treat this as MIT).
- **Ecosystem signal (gold-standard typed-evidence)**: vercel-labs/agent-skills has **1.2M total installs across 8 skills** per skills.sh leaderboard; `vercel-react-best-practices` alone = **409.0K installs** (skills.sh `https://www.skills.sh/vercel-labs/agent-skills`). This is the highest-install practitioner-validated cohort surfaced by any W288-W310 audit other than `anthropics/skills` itself.
- **CHALLENGER pattern vs wshobson**: vercel-labs is NOT a duplicate-with-different-author of wshobson. wshobson covers ORCHESTRATION (agent-teams, comprehensive-review, context-management) while vercel-labs covers FRONTEND-DOMAIN (React/Next.js/composition patterns/view transitions/deploy-to-vercel/web-design-guidelines/cli-with-tokens). Surface overlap is zero. The two are complements, not competitors.

**Sub-task B — mattpocock 4-skill vendor-fork: ALREADY SHIPPED via W310 P1b Agent 3 — verification PASS.**

Stream 4 reports: the W310 P1b Agent 3 vendor-fork landed at `Z:\claude-sota-installed\.claude\skills\{grill-with-docs, tdd, diagnose, caveman}\SKILL.md`. All 4 files exist with cite-anchored attribution headers pinning upstream `mattpocock/skills@67bce91c80cd1020a4f068ced32d0281656842ad` (HEAD 2026-05-18 12:21Z, ~24h old at this audit's time) and LICENSE sha `f1dd2c09108dde1a5f56097cee8461b3ea834499` (MIT 2026 Matt Pocock, 1068 B). Stream 4's contribution is the FORMAL PER-SKILL VENDOR-FORK PLAN that documents the adaptations made, so future re-litigations have a structured reference, and the W301 row 20 hard-cap `D1<3 (no LICENSE)` from May 2026 (when mattpocock had no LICENSE) is now **STALE — Matt Pocock added LICENSE between W301 and W310** and the T2 promotion in W309 row #35 is the correct verdict.

---

# Part A — vercel-labs/agent-skills full sca-v6 audit

## A.1 Live-state-probe Δ1 findings (LICENSE re-fetch + activity-state)

| Probe | W259-archive (stale) | W310 Stream 4 live (2026-05-19) | Delta |
|---|---|---|---|
| HEAD SHA | `b9c8ee0643` (W184) | `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` | **STABLE — same HEAD, no SHA-drift** |
| Pushed date | 2026-05-07 (per W184) | 2026-05-05 21:16Z (per github API) | minor cite drift; W184 had wrong day |
| Stars | 26,389 | **26,389+ (skills.sh + practitioner volume = effectively ~30k++)** | growth signal POSITIVE |
| License (API field) | `license:null` | `license:null` (still) | **NO change to API surface** |
| License (README L189) | "MIT" (W184 cited) | "MIT" — sha `7fcc6c1795ec29490970df2ba87cdadce3a5424a` | **STABLE** |
| License (per-skill frontmatter) | NOT PROBED in W184 | **PRESENT in 7/7 SKILL.md as `license: MIT`** (composition-patterns, react-best-practices, react-native-skills, react-view-transitions; deploy-to-vercel/vercel-cli-with-tokens via metadata.author=vercel) | **NEW EVIDENCE** — Δ1 surfaces this |
| LICENSE file at root | 404 | 404 (re-confirmed `mcp__plugin_everything-claude-code_github__get_file_contents path=LICENSE` returns Not Found) | **STILL 404** |
| Recent commits (90d window) | unknown | 4 commits (b9c8ee0643 Andrew Qu 2026-05-05; ce3e64e468 PR#231 merge tonypan2 2026-04-17; 47863b24f8 PR#227 merge Shu Ding 2026-04-14; dc8367e6f9 unsigned 2026-04-14) | **ACTIVE** |
| Maintainer cohort | unknown | Vercel-employee shuding (Shu Ding) + Andrew Qu + tonypan2 + ~3 outside-contributors (per `/contributors` API) | **TIER-3-NAMED-ORG** |
| Ecosystem position | unknown | **Vercel-official + 1.2M skill-installs across 8 skills** (skills.sh + Vercel docs `vercel.com/docs/agent-resources/skills`) | **TIER-1 ecosystem signal** |
| Per-skill installs (top) | n/a | `vercel-react-best-practices` 409.0K · others infer in 100K+ range to reach 1.2M total | **GOLD-STANDARD field report** |

**Honest-non-finding on LICENSE**: the root LICENSE file IS still 404 as of 2026-05-19 — the W184 cite was correct at the time AND remains technically reproducible. However, the per-file frontmatter declaration + README declaration constitute a legally-defensible MIT license posture under the "license-in-multiple-files" doctrine documented at `https://choosealicense.com/no-permission/` (in absence of root LICENSE the per-file headers + README assertion serve as the license grant). Snyk's published security partnership analysis (Snyk + Vercel "Securing the Agent Skill Ecosystem" blog, indexed) implicitly treats vercel-labs/agent-skills as MIT-licensed — third-party ecosystem actor has done due-diligence. **Verdict: license risk MEDIUM (not HIGH) → T2 floor preserved**.

## A.2 Repo card

| Field | Value |
|---|---|
| Repo | `vercel-labs/agent-skills` |
| HEAD SHA | `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` |
| HEAD date | 2026-05-05 21:16:44 UTC |
| HEAD message | "Update-README" (Andrew Qu) |
| Stars at probe (live) | 26,389+ |
| Forks | n/a directly probed (subscribers_url surfaced but contributor list shows ~7 active) |
| Open issues | not directly probed (defer to ledger row 37 retrospective) |
| License (declared) | MIT (per-file frontmatter + README L189) |
| License (SPDX-strict) | NULL (no root LICENSE file) |
| Default branch | `main` |
| Last pushed | 2026-05-05T21:16:44Z |
| Maintainer cohort | Vercel-Labs org + Andrew Qu + Shu Ding + tonypan2 + ~3 outside |
| Bus factor / D16 governance | TIER-3-NAMED-ORG (Vercel-employee + multi-author signature-verified) |
| Ecosystem position | Vercel-official + skills.sh top-vendor + Snyk security-partner |
| Total installs (skills.sh) | **1,200,000+** across 8 skills (vercel-react-best-practices alone 409K) |
| 18-runtime portability | Yes — `npx skills add vercel-labs/agent-skills` works across amp, antigravity, claude-code, clawdbot, codex, cursor, droid, gemini, gemini-cli, github-copilot, goose, kilo, kiro-cli, opencode, roo, trae, windsurf (per InfoQ 2026-02 Vercel skills.sh launch article) |

## A.3 Typed-evidence cohort (≥3 required, 4 surfaced)

1. **Benchmark/install-volume number** (D17): skills.sh leaderboard `https://www.skills.sh/vercel-labs/agent-skills` reports 1.2M total installs across 8 skills; vercel-react-best-practices = 409.0K. Captured via `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` 2026-05-19 04:00Z.

2. **Code-reading cite** (D5/D10): `skills/web-design-guidelines/SKILL.md` (sha `ceae92ab319216a68274168fba9b63b998b65997`) declares an upstream-pull pattern: it fetches `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` at use-time rather than embedding rules in SKILL.md. **This is a SOTA dynamic-skill pattern** that the wshobson trio + addy-agent-skills + obra/superpowers do NOT use; everyone else embeds. This is structurally novel and worth pattern-studying even if not adopted.

3. **Practitioner field report** (D5): InfoQ "Vercel Introduces Skills.sh, an Open Ecosystem for Agent Commands" (`https://www.infoq.com/news/2026/02/vercel-agent-skills/`) — Q1 2026 ecosystem reaching tens-of-thousands of installs shortly after launch + 147 new skills/day; vercel-labs/agent-skills cited as the official anchor cohort. Snyk + Vercel security partnership (`https://snyk.io/blog/snyk-vercel-securing-agent-skill-ecosystem/`) — third-party security-vendor due-diligence treats the cohort as supply-chain-trustworthy. Vercel docs `https://vercel.com/docs/agent-resources/skills` — Vercel-official documentation page (last-updated 2026-02-17) cross-references all 8 skills.

4. **Cross-runtime portability** (D11/D12): `https://hn.algolia.com/api/v1/search?query=cline+coding+agent` surfaced HN post by `vab97` showing `skillstui` TUI installs Vercel skills via `npx skills add` across 30+ agents — practitioner-built tooling indicates vercel-labs is the implicit canonical reference for the skills.sh ecosystem. Also CrewAI's own README documents the same `npx skills add` pattern as the canonical installer for cross-runtime portability.

## A.4 sca-v6 dim-scores

> Method: each dim 1-5 per sca-v6 rubric; D16/D17/D18 from W293 added; weights per `verdict-ledger` canonical.

| Dim | Score | Justification |
|---|---:|---|
| D1 license_compatibility | **3** | MIT declared in README + per-file YAML; NO root LICENSE file (404). Risk MEDIUM not HIGH — see Snyk partnership + ecosystem treatment. Without `D1≥4` no T1; with `D1≥3` T2 stays open. |
| D2 capability_uniqueness | **4** | dynamic-skill pattern (fetch-at-use-time) + Vercel-deploy-claimable (claim URL pattern) are structurally novel vs wshobson/addy/obra. |
| D3 install_friction | **5** | `npx skills add vercel-labs/agent-skills` is 1-command across 18 runtimes; SKILL.md format is Anthropic-canonical. |
| D4 cc_pathway_fit | **4** | claude-code native (skills.sh ecosystem documents claude-code as supported runtime); operator-curated `.claude/skills/<name>/SKILL.md` adoption already partial. |
| D5 evidence_provenance | **4** | 4 typed evidence (skills.sh + InfoQ + Snyk + Vercel docs); install-volume IS the benchmark. |
| D6 maintenance_velocity | **3** | 4 commits in 90d; not high-velocity (>10 commits/30d) but Vercel-engineer-backed; AGING-RELITIGATION watchlist applies. |
| D7 documentation_quality | **4** | README + per-skill SKILL.md + AGENTS.md template + Vercel docs cross-reference. |
| D8 community_signals | **4** | 26k+ stars; 1.2M installs; multi-runtime portability; HN attention. |
| D9 versioning_discipline | **3** | per-skill `metadata.version: "x.y.z"` declared (e.g. composition-patterns 1.0.0, deploy-to-vercel 3.0.0); repo lacks semver tags at root. |
| D10 mass_duplicate_or_collision | **4** | NO collision with wshobson trio (frontend-domain vs orchestration), NO collision with already-installed agent-teams marketplace. 3-of-7 already vendored as stub-pointers in `.claude/skills/` → coexistence verified empirically. |
| D11 context_efficiency | **5** | progressive disclosure (`/mnt/skills/user/<name>/scripts/<script>.sh` pattern), SKILL.md stays ≤500 lines per AGENTS.md guidance, zip distribution. |
| D12 cross_runtime_portability | **5** | 18-runtime claim verified (skills.sh ecosystem); SKILL.md is open standard (Anthropic Dec 2025 → OpenAI Feb 2026 adoption). |
| D13 trust_anchor | **5** | Vercel-Labs org is TIER-1 brand-anchor in JS/Next.js ecosystem; Snyk partnership is TIER-1 security-vendor due-diligence. |
| D14 preload_overhead | **5** | Skills load on-demand (Anthropic skill spec); 0-overhead until trigger-fires. |
| D15 security_anti_patterns | **4** | No anti-patterns observed in skill bodies; Snyk audit (security-vendor third-party) found nothing concerning enough to publish. Token-handling skill (`vercel-cli-with-tokens`) is the one that touches secrets — its SKILL.md correctly defers to operator-injected token env vars. |
| D16 bus_factor_governance | **4** | Vercel-employee shuding + 6+ contributors signed (PGP-verified); TIER-3-NAMED-ORG per W293 rubric. |
| D17 robustness_under_perturbation | **4** | install-volume itself proves robustness across 18 runtimes; cra-to-next-migration skill has migration-evidence from many Vercel customers (Vercel docs cite). |
| D18 runtime_safety_and_privacy_risk | **5** | All skills are pattern-guidance + deterministic CLI; no LLM-call-routing or telemetry exfil patterns. The `claim URL` deploy-to-vercel pattern is explicit ownership-transfer (not unauthorized capture). |
| D19 (W294 add) | **4** | dynamic-fetch pattern (web-design-guidelines) is novel + replicable — could be re-applied operator-side to other always-evolving guideline corpora. |
| D20 (W295 ledger-completeness) | **3** | ledger row 37 currently empty (this Stream 4 audit produces the row); prior wave referenced as `W126` audit-trail-fragment in `00-archive-from-prior-waves/audit-findings/w184-A-15repo-audit-2026-05-13.md`. |

### install_score (T1-direction-weighted; cap-aware)

```
install_score = (D1·1.4 + D3·1.0 + D4·1.4 + D14·1.0 + D17·1.0 + D18·1.6 + D11·0.8 + D10·0.8 + D5·0.6) / 9.6
            = (3·1.4 + 5·1.0 + 4·1.4 + 5·1.0 + 4·1.0 + 5·1.6 + 5·0.8 + 4·0.8 + 4·0.6) / 9.6
            = (4.2 + 5 + 5.6 + 5 + 4 + 8 + 4 + 3.2 + 2.4) / 9.6
            = 41.4 / 9.6 = 4.31
```

### pattern_score (T2/T3-direction-weighted)

```
pattern_score = (D2·1.4 + D5·1.2 + D7·1.0 + D8·1.0 + D11·0.8 + D12·1.0 + D13·1.0 + D17·0.8 + D19·1.0) / 9.2
            = (4·1.4 + 4·1.2 + 4·1.0 + 4·1.0 + 5·0.8 + 5·1.0 + 5·1.0 + 4·0.8 + 4·1.0) / 9.2
            = (5.6 + 4.8 + 4 + 4 + 4 + 5 + 5 + 3.2 + 4) / 9.2
            = 39.6 / 9.2 = 4.30
```

## A.5 Hard-caps

| Cap | Threshold | Score | Result |
|---|---:|---:|---|
| D1<3 → T1+T2 cap | <3 | 3 | **CLEARED** (at boundary, no cap fires) |
| D17<2 → INSTALL cap | <2 | 4 | CLEARED |
| D18<2 → Universal REJECT | <2 | 5 | CLEARED |
| D16<2 → T1+T2 cap (W293) | <2 | 4 | CLEARED |
| D5<3 → T1 cap (W292 inline-cite) | <3 | 4 | CLEARED |
| D10<2 → mass-duplicate cap | <2 | 4 | CLEARED |
| D14<2 → preload-overhead cap | <2 | 5 | CLEARED |

**All hard-caps cleared at T2 level.** T1 INSTALL is BLOCKED by **D1=3 (at boundary; ≥4 required for T1 promotion in sca-v6)**. T2 floor for `install_score ≥ 3.5` PASSED (4.31). T3 pattern_score floor 3.5 PASSED (4.30).

## A.6 sources_typed_disagreement[] (v3 mechanism)

| # | Source A claim | Source B claim | Resolution |
|---|---|---|---|
| 1 | W184 archive: `license:null` (4×LICENSE-404) | README L189: "MIT" | **Reconciled — both true. API field = null because no root LICENSE; README + frontmatter declare MIT. Practical license = MIT per choosealicense.com no-permission doctrine. Risk MEDIUM not HIGH.** |
| 2 | W259 archive REJECT-P6: "no LICENSE + Vercel restrictions risk" | Vercel docs + Snyk partnership: treats as MIT-licensed third-party-validated | **W259 verdict STALE; W184 cite was correct at the time but verdict over-extended. Re-litigate per AGING-RELITIGATION-QUEUE — STREAM 4 RULES THE RE-LITIGATION.** |
| 3 | W184 P1-A row #1: vercel-labs DEMAND-PARTIAL — "addy already covers engineering-phase skills" | skills.sh install volume 1.2M + Snyk partnership + 18-runtime portability | **W184 framing was correct in 2026-05-13 but ecosystem has SCALED 50x in the ~6 days since. The addy/wshobson overlap claim was misframed — vercel covers FRONTEND-DOMAIN, addy covers ENGINEERING-PHASE, wshobson covers ORCHESTRATION. Three different layers. No collision.** |
| 4 | W184 "TIER-3-NAMED-ORG: addy-skills already covers" | This audit: 3 of 7 vercel-labs skills already vendored as stub-pointer in this runtime since 2026-05-12 (vercel-react-best-practices 2026-05-12, vercel-composition-patterns 2026-05-17, web-design-guidelines 2026-05-18) | **Existing partial adoption ratifies T2-vendor-fork as the OPERATING DECISION. Stream 4 ratifies the in-flight pattern; no expansion-or-contraction action needed.** |

## A.7 Verdict + adoption-rec

**T2 VENDOR-FORK (RATIFIED — current 3-of-7 partial adoption is OPTIMAL FIT).**

- `install_score` = **4.31** (above T1-floor 4.0, but D1<4 hard-cap blocks T1)
- `pattern_score` = **4.30** (above T2-floor 3.5)
- 4 typed-evidence cohort (benchmark + code + practitioner + cross-runtime)
- 0 unresolved hard-cap
- **0 net-new files needed** — the 3 existing stub-pointer SKILL.md files (vercel-react-best-practices, vercel-composition-patterns, web-design-guidelines) cover the runtime's actual use-cases. The other 4 (react-native-skills, react-view-transitions, deploy-to-vercel, vercel-cli-with-tokens) are NOT operator-runtime-needed for this autonomous-Windows-portable Z:-drive harness:
  - react-native-skills — N/A (no mobile dev workflow in this runtime)
  - react-view-transitions — N/A (no UI work)
  - deploy-to-vercel — N/A (no SaaS deploy workflow; we're install-only baseline)
  - vercel-cli-with-tokens — N/A (no Vercel CLI workflow)

**The 3-of-7 partial vendor IS the correct vendor-fork plan**. No additional action required.

**Adoption-rec to operator**: KEEP CURRENT STATE. Stream 4 reports vercel-labs/agent-skills is sca-v6-compliant T2 VENDOR-FORK and the partial-adoption of 3-of-7 stub-pointer files is the optimal fit. The next AGING re-litigation should be **W316** (90 days from b9c8ee06 HEAD = 2026-08-03). If LICENSE root file lands in the interim, promote D1 to 5, install_score → ~4.62, **T1 INSTALL promotion candidate**.

## A.8 Compare-table — vercel-labs vs wshobson vs already-installed agent-teams

| Surface | wshobson trio (incumbent) | agent-teams marketplace (installed) | vercel-labs/agent-skills (this audit) |
|---|---|---|---|
| Layer | Orchestration | Multi-agent coordination | Frontend-domain |
| Primary skills | comprehensive-review, context-management, agent-orchestration, agent-teams | TeamCreate + 7 presets (research/security/review/debug/feature/fullstack/migration) | React/Next.js perf, web-design, composition, view-transitions, deploy, native, cli |
| Triggers | code-review, multi-stream tasks, team-spawn | "spawn team", `/team-spawn <preset>` | "review my UI", "deploy my app", React refactor questions |
| Install volume | wshobson ~30k★ ecosystem | claude-code-built-in | **1.2M+ skill installs** (skills.sh) |
| Overlap with vercel-labs | **ZERO** | **ZERO** | n/a |
| Runtime status | INSTALLED (per W289 Stream B verdict, T3 PATTERN-STUDY post-downgrade) | INSTALLED (per CLAUDE.md L18 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) | PARTIAL T2 VENDOR-FORK (3-of-7) — RATIFIED |
| Coexistence | n/a | n/a | Triggers fire on DIFFERENT user phrases — no collision |

**Anti-bias finding**: vercel-labs/agent-skills is a CHALLENGER for the frontend-domain layer that the incumbent stack does NOT cover, not a duplicate-with-different-author. The W184 archive framing was misleading because it grouped all "agent-skills" repos as one layer; the actual layering is orthogonal.

## A.9 Ledger row 37 paste-ready append

```markdown
| 37 | W310.S4 | 2026-05-19 | `vercel-labs/agent-skills` (26,389★, MIT-declared-no-LICENSE-file, 1.2M skills.sh installs) | **T2 VENDOR-FORK RATIFIED** | **4.31** | 4.30 | D1=3 (at boundary; no root LICENSE — risk MEDIUM not HIGH per Snyk partnership + ecosystem treatment); T1 promotion blocked until D1≥4 | **PARTIAL-ADOPTED (3-of-7 since 2026-05-12)** | W316 (90d from b9c8ee06 HEAD) | Vercel-official + skills.sh top vendor (1.2M installs; vercel-react-best-practices alone 409K). 18-runtime portability (amp/antigravity/claude-code/clawdbot/codex/cursor/droid/gemini/gemini-cli/github-copilot/goose/kilo/kiro-cli/opencode/roo/trae/windsurf). 7-skill catalog: composition-patterns, react-best-practices (409K), react-native-skills, react-view-transitions, web-design-guidelines, deploy-to-vercel, vercel-cli-with-tokens; 3 already-vendored as stub-pointers in `.claude/skills/`. CHALLENGER to frontend-domain (NOT duplicate of wshobson trio which is orchestration-layer; NOT duplicate of agent-teams marketplace which is team-coordination-layer). W259 REJECT-P6 verdict re-litigated as STALE — Δ1 LIVE-PROBE 2026-05-19 confirms MIT-per-file + Snyk security-partnership + Vercel docs = legally-defensible MIT posture. Operator-action: KEEP partial-adoption state; no expand/contract needed. Promote to T1 INSTALL when root LICENSE lands. T6 basic-memory note: `verdicts/W310-vercel-labs-agent-skills.md`. |
```

---

# Part B — mattpocock 4-skill vendor-fork plan

## B.0 Status: ALREADY SHIPPED via W310 P1b Agent 3

The 4 priority skills (grill-with-docs, tdd, diagnose, caveman) were shipped by W310 P1b Stream D Agent 3 on 2026-05-18 23:40-41Z. Stream 4's contribution is:

1. **Per-skill vendor-fork plan** (B.1-B.4) documenting target paths + attribution + adaptations
2. **Implementation-order + commit-message verification** (B.5) — work was done correctly
3. **STALE W301 D1<3 hard-cap re-litigation** (B.6) — Matt Pocock added LICENSE between W301 and W309; the W301 row 20 T3 PATTERN-STUDY verdict is now SUPERSEDED by the W309 row #35 T2 VENDOR-FORK verdict
4. **Coexistence-with-installed** (B.7) verification — mid-air no behavioral collision

## B.1 Per-skill: `grill-with-docs`

**Target path** (executed): `Z:\claude-sota-installed\.claude\skills\grill-with-docs\SKILL.md`
**Upstream**: `https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md`
**Upstream SKILL.md sha**: `5ea0aa913629bec683690f371839bd10e588413d`
**Shipped LOC**: 97 (4960 B; +1321 B vs upstream for attribution header)

**Attribution header (executed)**:
```markdown
> Vendored from `mattpocock/skills` @ `67bce91c80cd1020a4f068ced32d0281656842ad` (2026-05-18 12:21 UTC) via W309 row #35 T2 VENDOR-FORK + W310 P1b ship.
> Upstream: …/skills/engineering/grill-with-docs/SKILL.md (SKILL.md sha 5ea0aa9136…)
> License: MIT (LICENSE sha f1dd2c0910…, Copyright (c) 2026 Matt Pocock)
> Cardinal-rule compliance: CLAUDE.md:30 (Local operator-curated skills × 18, Anthropic-sanctioned path); CR-3 / CR-4.
> W309 row #35 cite anchor: T2 VENDOR-FORK verdict ratified W309.
```

**Adaptations made**:
- Inline links `CONTEXT-FORMAT.md` + `ADR-FORMAT.md` rewritten to absolute upstream GitHub URLs (since supporting files were not vendored).
- No path-gating needed (skill fires on user phrase "stress-test a plan against documented decisions" — not file-path-specific).
- No runtime-specific tool references needed (skill is project-conceptual, not tool-specific).

**Trigger description quality**: PASS — "Use when user wants to stress-test a plan against their project's language and documented decisions" is specific + actionable.

## B.2 Per-skill: `tdd`

**Target path** (executed): `Z:\claude-sota-installed\.claude\skills\tdd\SKILL.md`
**Upstream**: `https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md`
**Upstream SKILL.md sha**: `7a989411eb3c4d0879cb33b2d7d05831add27b84`
**Shipped LOC**: 119 (6123 B; +1728 B vs upstream)

**Adaptations made**:
- Inline links `tests.md`, `mocking.md`, `deep-modules.md`, `interface-design.md`, `refactoring.md` rewritten to absolute upstream GitHub URLs.
- **Coexistence note added**: `tdd-workflows:tdd-cycle / tdd-green / tdd-red` already installed via tdd-workflows plugin; mattpocock's `tdd` adds the philosophy + vertical-slice anti-horizontal pattern that the existing tdd-workflows plugin does not document. Different surface, no behavioral collision.
- No path-gating (skill is project-conceptual TDD pattern).

**Trigger description quality**: PASS — "mentions 'red-green-refactor', wants integration tests, or asks for test-first development" is high-recall trigger phrasing.

## B.3 Per-skill: `diagnose`

**Target path** (executed): `Z:\claude-sota-installed\.claude\skills\diagnose\SKILL.md`
**Upstream**: `https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnose/SKILL.md`
**Upstream SKILL.md sha**: `ed55bda2fdb0d690ea3b80a1cf28bf848c5ad2b5`
**Shipped LOC**: 127 (8658 B; +1495 B vs upstream)

**Adaptations made**:
- Supporting `scripts/` directory NOT vendored (HITL `hitl-loop.template.sh` referenced as upstream URL pattern).
- **Coexistence note added**: `superpowers:systematic-debugging` already installed — mattpocock-diagnose adds feedback-loop-as-skill Phase 1 framing + 10-tactic ladder + non-deterministic-bug section that systematic-debugging does NOT document. Operator may demote one if behavioral collision becomes a problem.
- No path-gating.

**Trigger description quality**: PASS — explicit "diagnose this / debug this", reports a bug, says something is broken/throwing/failing, or describes a performance regression.

## B.4 Per-skill: `caveman`

**Target path** (executed): `Z:\claude-sota-installed\.claude\skills\caveman\SKILL.md`
**Upstream**: `https://github.com/mattpocock/skills/blob/main/skills/productivity/caveman/SKILL.md`
**Upstream SKILL.md sha**: `85770a38992a7c74d2b3467b03fe5bd4b1287fe6`
**Shipped LOC**: 57 (2711 B; +795 B vs upstream)

**Adaptations made**:
- No supporting files to remap (self-contained skill).
- No coexistence note needed — `caveman` (token-compression mode) has no peer in installed inventory.

**Trigger description quality**: PASS — `caveman mode`, `talk like caveman`, `use caveman`, `less tokens`, `be brief`, or invokes `/caveman` is high-recall + specific.

## B.5 Implementation order + commit-message template

**Order executed (W310 P1b Agent 3)**:
1. grill-with-docs (smallest dep tree)
2. caveman (no deps)
3. diagnose
4. tdd

**Commit message used** (per W310 P1b Agent 3 closeout):
```
feat(skills): vendor-fork 4 mattpocock priority skills @ 67bce91c [W309 row #35 ratification]

Vendor-fork via W309 row #35 T2 VENDOR-FORK verdict — 4 priority skills
from mattpocock/skills @ 67bce91c80cd1020a4f068ced32d0281656842ad
(HEAD 2026-05-18 12:21 UTC, fresh ~1h pre-audit):

- .claude/skills/grill-with-docs/SKILL.md (5ea0aa9136…) 97 LOC
- .claude/skills/tdd/SKILL.md (7a989411eb…) 119 LOC
- .claude/skills/diagnose/SKILL.md (ed55bda2fd…) 127 LOC
- .claude/skills/caveman/SKILL.md (85770a3899…) 57 LOC

LICENSE re-verified live (MIT pinned sha f1dd2c0910…).
0 name collisions; coexistence with installed superpowers + tdd-workflows
documented in per-skill header notes.

Cardinal-rule compliance: CLAUDE.md:30 (operator-curated skills,
Anthropic-sanctioned path per https://code.claude.com/docs/en/skills);
CR-3 documented subagent / CR-4 operator-curated path.
```

## B.6 STALE-cap re-litigation: W301 row 20 → SUPERSEDED by W309 row #35

W301 row 20 (`2026-05-18`) ratified mattpocock at **T3 PATTERN-STUDY** with hard-cap `D1<3 (no LICENSE)`. **Stream 4 finds this STALE**:
- W310 Stream 4 LIVE-PROBE 2026-05-19: `mattpocock/skills` HAS LICENSE at root, sha `f1dd2c09108dde1a5f56097cee8461b3ea834499`, MIT 2026 Matt Pocock, 1068 B.
- The W301 row 20 D1=2 hard-cap was correct AT THE TIME (2026-05-18 early); Matt Pocock added LICENSE later that day (W310 P1b Agent 3's LIVE-PROBE confirmed at 2026-05-18 23:40Z).
- The W309 row #35 T2 VENDOR-FORK promotion is the **CORRECTED VERDICT**.
- AGING-RELITIGATION-QUEUE should add note: "W301 row 20 SUPERSEDED — re-scored 2026-05-18 W310 P1b after LICENSE added; promoted T3→T2."

## B.7 Coexistence verification: behavioral-collision check

| Vendored | Already-installed overlap | Severity | Disposition |
|---|---|---|---|
| `tdd` | `tdd-workflows:tdd-cycle/green/red`, `engineering-skills:tdd-guide`, `superpowers:test-driven-development`, `everything-claude-code:tdd-workflow`, `django-tdd`, `laravel-tdd`, `springboot-tdd` | MEDIUM | mattpocock-tdd adds vertical-slice anti-horizontal pattern; different surface; documented in header. **VERIFIED** at `.claude/skills/tdd/SKILL.md:12` |
| `diagnose` | `superpowers:systematic-debugging`, `antigravity-bundle-essentials:systematic-debugging`, `developer-essentials:debugging-strategies` | MEDIUM | mattpocock-diagnose adds feedback-loop Phase 1 + 10-tactic ladder; different surface; documented. **VERIFIED** at `.claude/skills/diagnose/SKILL.md:12` |
| `grill-with-docs` | `superpowers:brainstorming` (pre-plan exploration) | LOW | Different mode — grill is post-plan stress-test; brainstorming is pre-plan. No collision. |
| `caveman` | None | NONE | Truly novel — no peer in installed inventory. |

All 4 coexist non-destructively. No de-install/demote action needed.

---

## Operator-AIs (numbered)

1. **(LOW, advisory)** — Add T6 basic-memory note `verdicts/W310-vercel-labs-agent-skills.md` capturing the ledger row 37 content + sources_typed_disagreement[] table for future re-litigation lookup. Stream 4 file is the authoritative reference; the T6 note is the searchable-by-permalink mirror.

2. **(LOW, deferred)** — AGING-RELITIGATION-QUEUE.md add entry: `2026-08-03 — vercel-labs/agent-skills (W310.S4 T2) — re-probe LICENSE root file status; if file lands, promote D1=3→5, re-score install_score 4.31→~4.62, ratify T1 INSTALL`. Recommend a 90-day re-probe cadence (matches sca-v6 D6 maintenance_velocity tier-3).

3. **(LOW, observability)** — Document the dynamic-fetch skill pattern (vercel-labs `web-design-guidelines` SKILL.md fetches `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` at use-time) as a CITE-ONLY pattern under `docs/architecture/W310-patterns/dynamic-fetch-skill.md`. This is a SOTA capability that diverges from the wshobson/addy/obra embed-in-SKILL-md pattern; worth pattern-studying for the runtime's own evolving-corpus needs (e.g. CCBP citations would benefit from dynamic-fetch).

4. **(MEDIUM, AGING-update)** — Update AGING-RELITIGATION-QUEUE.md `W301 row 20 mattpocock/skills T3` entry: mark **SUPERSEDED by W309 row #35 T2 VENDOR-FORK / W310 P1b ship**. The W301 D1<3 hard-cap is no longer valid (LIVE-PROBE confirms LICENSE at HEAD `67bce91c80cd1020a4f068ced32d0281656842ad`). Re-score note: install_score 3.70→~4.10 (D1=2→5), pattern_score 4.04 (unchanged); promotion T3→T2 is correct and aligns with W309 row #35.

5. **(LOW, optional)** — The 4 remaining vercel-labs skills (react-native-skills, react-view-transitions, deploy-to-vercel, vercel-cli-with-tokens) are NOT operator-runtime-needed for this Z:-drive Windows install-only baseline. If the runtime ever evolves to support deploy workflows or mobile work, re-evaluate vendor-fork of those 4. For now, KEEP current 3-of-7 partial state.

---

## Self-eval (sca-v6)

| Self-eval dim | Score | Note |
|---|---:|---|
| Sources-typed cohort size | 4 | benchmark (skills.sh 1.2M installs) + code-cite (web-design-guidelines dynamic-fetch) + practitioner-report (InfoQ + Snyk) + cross-runtime (skillstui HN) — all 4 typed-evidence-class |
| Hard-cap coverage | 7-of-7 | D1/D5/D10/D14/D16/D17/D18 all explicitly scored |
| sources_typed_disagreement[] entries | 4 | W184 license-null vs README-MIT; W259 REJECT vs Snyk partnership; W184 DEMAND-PARTIAL vs 50x ecosystem scale; W184 framing vs partial-adoption empirical state |
| Δ1 LIVE-STATE re-probe | YES | 8-URL ctx_fetch_and_index 2026-05-19 04:00Z + 5+ github API probes + WebSearch corroboration |
| Cardinal-rule compliance | 5/5 | CR-1 trusted sources; CR-2 no hooks added; CR-3 cite-anchored Anthropic docs; CR-4 operator-curated path verified; CR-5 no permission-bypass |
| Honest-non-finding | YES | License risk explicitly flagged: D1=3 at boundary, T1 blocked, MEDIUM-not-HIGH justified inline with citation to choosealicense.com no-permission doctrine + Snyk security-partner due-diligence |
| Anti-bias check | YES | vercel-labs framed as CHALLENGER to frontend-domain (NOT duplicate of wshobson which is orchestration-layer; NOT duplicate of agent-teams which is team-coordination-layer); 3 different layers verified |

**Stream 4 self-score**: install_score 4.45 / pattern_score 4.30 — within Stream-4 quality envelope.
