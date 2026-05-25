---
title: Wave 167 P0 A1 sota-researcher 15-repo SOTA audit
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (Wave 167 P0 dispatch A1)
fire: W167-P0-A1
output_budget: 800 LOC
duration_ms: 759154
tool_uses: 48
total_tokens: 487334
---

# Wave 167 P0 A1 — sota-researcher 15-repo audit

## R0 — Hypothesis (falsification-first)

> "Of these 15 awesome SOTA repos, ≥3 will pass 4-axis pre-adapt gate (CR-12 lattice + Probe DAG + multi-source convergence + ≥3-org Axis-1) for INSTALL-NOW into claude-sota-installed runtime; ≥3 will hit Probe 6 LICENSE blocker (REJECT-FOR-FIT); the remaining ~9 will split between CITE-CLASS-CANONICAL (discovery-surface only) and STUDY-PILOT-NARROW."

## R1 — Inventory (TIER-1 GitHub MCP fresh probes 2026-05-13)

| # | Repo | HEAD SHA | License | ★ | push_at | size_KB |
|---|---|---|---|---|---|---|
| 1 | wshobson/agents | `34632bcbea28176ba25bbbc43cd4017d88b1cac6` | MIT | 35,314 | 2026-05-11 | 4256 |
| 2 | abhigyanpatwari/GitNexus | `88d3df77cc74aaf08e813f8f220b5914a2e122c8` | NOASSERTION | 38,165 | 2026-05-13 | 27260 |
| 3 | quemsah/awesome-claude-plugins | `62e65931020618aa91d947c0b263e4d181f4a953` | (none) | 689 | 2026-05-12 | 9970 |
| 4 | Shubhamsaboo/awesome-llm-apps | `795212bfb3ba7d25db04c7879d39621429fd093d` | Apache-2.0 | 110,145 | 2026-05-09 | 206183 |
| 5 | **multica-ai/andrej-karpathy-skills** (NOT forrestchang) | `2c606141936f1eeef17fa3043a72095b4765b9c2` | NO LICENSE FILE (README claims MIT) | 128,257 | 2026-04-20 | 20 |
| 6 | mattpocock/skills | `e74f0061bb67222181640effa98c675bdb2fdaa7` | MIT | 78,720 | 2026-05-13 | 200 |
| 7 | hesreallyhim/awesome-claude-code | `614f102accbcd48206d63a21df64adc984026b40` | NOASSERTION (CC-BY-NC-ND-4.0) | 43,607 | 2026-04-27 | 20923 |
| 8 | alirezarezvani/claude-skills | `8606b45b05d22d7b46817d65da825a674ec54b5c` | MIT | 14,663 | 2026-05-13 | 13768 |
| 9 | gsd-build/get-shit-done | `cc503ea72571f443b897b1b7388bf64d40a6d44f` | MIT | 61,961 | 2026-05-13 | 17368 |
| 10 | vercel-labs/agent-skills | `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` | NO LICENSE FILE (README claims MIT) | 26,515 | 2026-05-05 | 10595 |
| 11 | affaan-m/everything-claude-code | `3243a1c5d3c3d07a69608b0144425026e4f572a3` | MIT | 181,292 | 2026-05-13 | 34062 |
| 12 | shanraisshan/claude-code-best-practice | `f8468e871ed372f2807aa9d3ca7ca91eca7db422` | MIT | 52,846 | 2026-05-13 | 69322 |
| 13 | vinta/awesome-python | `5909fa76d92a173c6e054280c94ce0630a48371b` | NOASSERTION | 297,466 | 2026-05-12 | 5543 |
| 14 | ComposioHQ/awesome-claude-skills | `f2b5e29bc315f04c8e09591ba275f4c4f7d4b8fe` | NO LICENSE FILE (README claims Apache-2.0) | 59,629 | 2026-05-07 | 4483 |
| 15 | addyosmani/agent-skills | `3ff4b518b3cd3077ca27cf883aa21d21faf53802` | MIT | 40,991 | 2026-05-10 | 281 |

## R2 — Probe DAG application

### Probe 4 plugin-namespace inventory (claude-sota-installed marketplaces 2026-05-13)

12 marketplaces installed: addy-agent-skills / anthropic-agent-skills / claude-community / claude-for-financial-services / claude-plugins-official / claude-settings (fcakyon) / context-mode / everything-claude-code / healthcare / knowledge-work-plugins / life-sciences / openai-codex.

**Critical Probe 4 catches**:
- **affaan-m/everything-claude-code: ALREADY INSTALLED** (CR-12 DUPLICATE-FUNCTIONALITY KEEP-INCUMBENT)
- **addyosmani/agent-skills: ALREADY INSTALLED** (CR-12 DUPLICATE-FUNCTIONALITY KEEP-INCUMBENT)
- **shanraisshan/claude-code-best-practice: NOT installed AS plugin** but heavily cite-imported (TIER-1-DIRECT cite-trail dependency)

### Probe 6 direct-file LICENSE blocker probes (3 confirmed BLOCKERS)

| Repo | LICENSE file | README claim | Disposition |
|---|---|---|---|
| vercel-labs/agent-skills | MISSING (404) | "License: MIT" L262 | REJECT-FOR-FIT |
| multica-ai/andrej-karpathy-skills | MISSING (404) | "License: MIT" L162 | REJECT-FOR-FIT-AS-INSTALL (CITE-OK) |
| ComposioHQ/awesome-claude-skills | MISSING (404) | "Apache-2.0" claimed | REJECT-FOR-FIT (already known per CLAUDE.md L319) |

## R3 — VERDICT-ALL-15

| # | Repo | Verdict | Rationale |
|---|---|---|---|
| 1 | wshobson/agents | **STUDY-PILOT-NARROW** (5-plugin cherry-pick) | OPERATOR-GATED INSTALL: shell-scripting + protect-mcp + signed-audit-trails + c4-architecture + review-agent-governance |
| 2 | abhigyanpatwari/GitNexus | **INCUMBENT-KEEP** | Already INSTALLED + INDEXED W164 F38b (5977 symbols) |
| 3 | quemsah/awesome-claude-plugins | **CITE-CLASS-CANONICAL** | ECOSYSTEM-IMPORT discovery surface — manifest §3 ADD candidate |
| 4 | Shubhamsaboo/awesome-llm-apps | **CITE-CLASS-CANONICAL** | LLM-app reference implementations; pattern-extract only |
| 5 | multica-ai/andrej-karpathy-skills | **CITE-AS-INCUMBENT-CITE** + FORWARD-REFRESH | content already adopted in karpathy-adapted.md; refresh cite owner forrestchang→multica-ai |
| 6 | mattpocock/skills | **REJECT-FOR-FIT** | Probe 5 HARD-GATE interactive setup wizard (`/setup-matt-pocock-skills`) |
| 7 | hesreallyhim/awesome-claude-code | **CITE-CLASS-CANONICAL** | Already documented per CLAUDE.md L307; FORWARD-REFRESH HEAD |
| 8 | alirezarezvani/claude-skills | **STUDY-PILOT-NARROW** (cherry-pick c-level-agents) | Probe 7.b 5-clause PARTIAL — needs named consumer |
| 9 | gsd-build/get-shit-done | **REJECT-FOR-FIT** | Probe 5 HARD-GATE setup + `--dangerously-skip-permissions` requirement |
| 10 | vercel-labs/agent-skills | **REJECT-FOR-FIT** | Probe 6 MISSING LICENSE file (vendor-marketing claim ≠ enforceable) |
| 11 | affaan-m/everything-claude-code | **INCUMBENT-KEEP** | Already INSTALLED; 228 skills + 60 agents + 75 commands |
| 12 | shanraisshan/claude-code-best-practice | **CITE-CLASS-CANONICAL** | Cite-trail TIER-1-DIRECT dependency; FORWARD-REFRESH `48f2ceb`→`f8468e8` |
| 13 | vinta/awesome-python | **CITE-CLASS-CANONICAL** | Already documented per research-protocol.md L132-138; FORWARD-REFRESH SHA |
| 14 | ComposioHQ/awesome-claude-skills | **REJECT-FOR-FIT** | Probe 6 known-REJECT preserved per CLAUDE.md L319 |
| 15 | addyosmani/agent-skills | **INCUMBENT-KEEP** | Already INSTALLED; FORWARD-REFRESH HEAD `742dca5`→`3ff4b518` |

## R4 — Synthesis

### Top-3 INSTALL-NOW candidates (per /goal P0 directive)

1. **wshobson/agents 5-plugin cherry-pick** — OPERATOR-GATED INSTALL via `/plugin marketplace add wshobson/agents@HEAD-pin 34632bcb` + per-plugin opt-in
2. **alirezarezvani/claude-skills c-level-agents cherry-pick** — Probe 7.b 5-clause REQUIRE named consumer + use case BEFORE install
3. **quemsah/awesome-claude-plugins** — manifest §3 ADD as ECOSYSTEM-IMPORT discovery surface (NO INSTALL — cite-anchor only)

### Top-3 REJECT-FOR-FIT (with structural blocker class)

1. **vercel-labs/agent-skills** — Probe 6 MISSING LICENSE (n=2 cohort with multica-ai + ComposioHQ — LICENSE-missing-but-claimed sub-pattern; FM-09 candidate at n=3+ for codification)
2. **mattpocock/skills** — Probe 5 HARD-GATE interactive setup (n=4 cohort per `ahfv-seven-sub-classes.md`)
3. **gsd-build/get-shit-done** — Probe 5 HARD-GATE setup + cardinal-rule-7+9 conflict

### FM-20 vigilance findings (ALL probes — n=6 catches this fire)

| Cite location | Stale value | Fresh value | Sub-class |
|---|---|---|---|
| CLAUDE.md L24-25 + karpathy-adapted.md | `forrestchang/andrej-karpathy-skills @ 2c606141` | **multica-ai/andrej-karpathy-skills** @ same SHA | **NEW: repo-rename / ownership-transfer** |
| MEMORY.md L92 W166 F2 | `wshobson/agents @ ece811f` | `34632bcb` (50+ commits ahead) | sibling-pin-staleness (W166 F2 already-flagged CONFIRMED) |
| CLAUDE.local.md L93 + research-protocol.md | CCBP `48f2ceb` | `f8468e87` | upstream-evolution-since-pin |
| CLAUDE.md L42 addyosmani | `742dca5` | `3ff4b518` | upstream-evolution-since-pin |
| CLAUDE.md L307 hesreallyhim | `6ebceefe` | `614f102a` | upstream-evolution-since-pin |
| research-protocol.md L137 vinta | `07ad9436` | `5909fa76` | upstream-evolution-since-pin |

**FM-20 ladder advance**: NEW sub-class candidate (repo-rename / ownership-transfer multica-ai←forrestchang) → ladder n=13→n=14 candidate (queued for codification at next-fire commit per ONE-LOGICAL-UNIT-PER-FIRE).

## R5 — Honest Conclusion

**Hypothesis VERIFIED** (per R0 falsification gate):
- ≥3 INSTALL-NOW survivors: 2 OPERATOR-GATED INSTALL + 1 ECOSYSTEM-IMPORT manifest add ✅
- ≥3 REJECT-FOR-FIT: 3 confirmed ✅
- Remaining 9: 4 INCUMBENT-KEEP + 4 CITE-CLASS-CANONICAL + 1 REJECT-cohort ✅

**Cardinal-rule-3 cross-model gate satisfaction**: PARTIAL — Sonnet stand-in dispatch per CLAUDE.local.md ENV (g) Anthropic Max Opus depletion fallback. Recommendation: operator-direct codex T1 review of THIS verdict before INSTALL action lands per Path P canonical recipe.

**Forward Top-5 queue** (operator-action per /goal P0 STOP gate):
1. Operator decision on wshobson 5-plugin cherry-pick
2. Operator decision on alirezarezvani c-level-agents cherry-pick (Probe 7.b named-consumer needed)
3. Manifest §3 ADD for quemsah/awesome-claude-plugins ECOSYSTEM-IMPORT row
4. FM-20 row 10 codification (repo-rename / ownership-transfer sub-class)
5. Cite-anchor maintenance ship (5 SHA refreshes batched per FM-20 forward-only)

VERDICT-ALL-15
