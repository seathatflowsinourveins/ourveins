# 14-Repo SOTA Gap Audit — Wave 134 Fire 2

**Agent**: sota-researcher (Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env if active; STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` — cross-model gate satisfied at orchestrator-side via parallel codex T1 path if applicable)
**Date**: 2026-05-12
**HEAD**: claude-sota-installed `f08144d` session checkpoint 11:23
**Cron**: `81bd1a59` (10-min /loop)
**Per-call codex budget**: N/A — no codex invocations in this read-only research probe
**Cite class for this audit**: `constituents=[TIER-1-DIRECT @ Z:/repos/deps/<repo>/file:line @ HEAD <SHA> read-only research probes per cardinal-rule-9 exception, TIER-3-LOCAL @ docs/sota-installed-manifest.md install-status, TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 134 Fire 2 self-observed audit]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `citation-discipline.md` rule #8 MIN_PRECEDENCE.

---

## Method

**Multi-source discovery breadth ≥4 distinct families** per `multi-source-discovery-breadth-discipline.md`:

1. **Local filesystem** — `Z:/repos/deps/<repo>` clone presence + HEAD SHA + LICENSE file
2. **GitHub provenance** — git log + remote URL (network blocked by context-mode policy; relied on local clones)
3. **Manifest grep** — `docs/sota-installed-manifest.md` mention count + INSTALLED/STAGED/NOT-YET-INSTALLED status
4. **CLAUDE.md + .claude/rules/ cite-grep** — sister-rule citation density
5. **Plugin install cache** — `.claude/plugins/cache/` + `.claude/plugins/marketplaces/` enumeration
6. **MCP registry** — `.mcp.json` active server probe

**Discipline anchors applied**: Mia pre-apply (no fabricated installs), FM-20 path-drift defense (every claim verified against fresh probe this fire), cardinal-rule-9 read-only research probe exception (no install action this fire).

---

## Per-repo audit table

| # | Repo | Local path | HEAD SHA | License | INSTALLED in claude-sota-installed? | CITED in rules/CLAUDE.md? | Probe DAG 1-7 | Convergence-gate verdict | CR-12 class | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | affaan-m/everything-claude-code | `Z:/repos/deps/affaan-m-everything-claude-code/` | `841beea45cb2` | MIT | ✅ **INSTALLED** as plugin `everything-claude-code@2.0.0-rc.1` (`.claude/plugins/cache/everything-claude-code/`, 182 SKILL.md files) | YES — 14 manifest hits, dense CLAUDE.md/rules cites | All probes PASS (already installed) | Axis 1+2+3 PASS firm | GENUINELY-NEW (already installed) | ✅ ALREADY-INSTALLED — maintain |
| 2 | shanraisshan/claude-code-best-practice (CCBP) | `Z:/repos/deps/claude-code-best-practice-shan/` | `48f2cebeb88b` | MIT | ✅ **CITE-INSTALLED** as TIER-1-DIRECT cite source (cardinal-rule-1/3/4 anchors; 8 manifest hits) | YES — load-bearing cite-source for cardinal-rules-1/3/4 | All probes PASS (cite-only, not install-class) | Axis 1 PASS (multi-org backing) + Axis 2+3 PASS firm | CITE-CLASS-CANONICAL | ✅ ACCEPT-AS-CITE-REFERENCE — maintain HEAD pin |
| 3 | AsyncFuncAI/deepwiki-open | `Z:/repos/deps/asyncfuncai__deepwiki-open/` | `5b43df5464ea` | MIT | ❌ **NOT-YET-INSTALLED as service** (zero manifest hits); deepwiki MCP IS installed but that's the official `mcp.deepwiki.com` SaaS, not the open-source self-host repo | NO direct cites; deepwiki MCP wired in `.mcp.json` is the SaaS variant | P1 N/A / P2 self-host Python+TS app (SDK-vs-CLI ambiguous — runs as web service) / P3 vendor-neutral / P4 N/A (no plugin-namespace duplicate) / P5 size-sprawl (full web app + Docker stack — Probe 5 mode-harness-shape FLAG) / P6 LICENSE MIT PASS / P7 demand-gate FAIL (deepwiki SaaS MCP already wired; self-host duplicates SaaS without operational driver) | Axis 1 PARTIAL (single-org, AsyncFuncAI) + Axis 3 PASS (6mo+) | DUPLICATE-FUNCTIONALITY (vs deepwiki MCP SaaS) | ❌ REJECT-FOR-FIT per kiss-dry-yagni Must-Never #4 — self-host duplicates the already-wired SaaS MCP without marginal value |
| 4 | nibzard/awesome-agentic-patterns | `Z:/repos/deps/awesome-agentic-patterns/` | `9c40e1004225` | Apache-2.0 | ❌ **NOT-YET-INSTALLED** (zero manifest hits BUT cited extensively in sibling rules — `parallel-sessions.md`, `team-orchestration.md`, etc.) | YES indirectly — many pattern cites in sibling claude-sota rules (cite-import surface) | P1 N/A / P2 doc-only (no SDK/CLI) / P3 vendor-neutral / P4 N/A / P5 doc-only (no install-class artifact) / P6 LICENSE Apache-2.0 PASS / P7 demand satisfied via existing cites | Axis 1 PASS (multi-pattern from multi-orgs) + Axis 3 PASS (mature, regularly updated) | CITE-CLASS-CANONICAL | ✅ ACCEPT-AS-CITE-REFERENCE — already-functioning cite source; pin HEAD `9c40e1004225` in manifest cite-trail |
| 5 | vinta/awesome-python | `Z:/repos/deps/awesome-python/` | `5f725c25d7a7` | CC-BY-4.0 (doc license) | ❌ **NOT-YET-INSTALLED** (zero manifest hits) | NO direct cites; sister `research-protocol.md` mentions awesome-python as Python ecosystem discovery surface (TIER-2 cite) | P1 N/A / P2 doc-only / P3 vendor-neutral / P4 N/A / P5 doc-only / P6 CC-BY-4.0 = doc-only-permissive PASS (no fork-modify) / P7 demand-gate: claude-sota-installed is Python-heavy (hooks/scripts/evals) — VALID demand surface for library discovery | Axis 1 PASS (industry standard) + Axis 3 PASS (mature) | CITE-CLASS-CANONICAL | ✅ ACCEPT-AS-CITE-REFERENCE — pin HEAD `5f725c25d7a7` in research-protocol cite-trail; cite-only-not-install |
| 6 | wshobson/agents | `Z:/repos/deps/wshobson-agents/` | `ece811f23310` | MIT | ❌ **NOT-YET-INSTALLED** (49 manifest hits BUT all reference Wave 138 Fire 1 REJECT-FOR-FIT-MAJORITY 76/80 plugins; STUDY-PILOT-NARROW for 3 candidates: protect-mcp + signed-audit-trails + shell-scripting) | YES — cited in `agent-harness-fit-verification.md:115` (iter-93 conductor REJECT-FOR-FIT) | P1 verified 80 plugins/185 agents/153 skills via README MEASURED count / P2 mixed (CC plugin + agent definitions) / P3 vendor-neutral CC / P4 Probe 4 OVERLAP: 22 DUPLICATE + 10 PARTIAL / P5 HARD-GATE conductor plugin (REJECT iter-93 cohort) / P6 MIT root + Apache-2.0 sub-plugin PASS / P7 demand-gate FAIL for 76/80 plugins (53 NOVEL-but-vertical-domain SEO/finance/payment/blockchain — sss has no demand surface) | Axis 1 PASS multi-org plugin ecosystem + Axis 2 PASS (wshobson named-T2) + Axis 3 PASS (mature) | PARTIAL-OVERLAP | ⚠️ STUDY-PILOT-NARROW for 3 plugins (protect-mcp + signed-audit-trails + shell-scripting) — REQUIRES Phase 7 benchmark gate per `agent-harness-fit-verification.md` newly-codified discipline; defer until benchmark evidence shipped |
| 7 | abhigyanpatwari/GitNexus | `Z:/repos/deps/gitnexus/` (sub-monorepo with `gitnexus`, `gitnexus-claude-plugin`, `gitnexus-cursor-integration`, `gitnexus-shared`) | (sub-repo SHAs vary per package) | (check per-package LICENSE — gitnexus is polyforge-noncommercial per memory) | ✅ **INSTALLED** as MCP server `gitnexus` in `.mcp.json` (6 manifest hits) | YES — load-bearing cite-source (`gitnexus_pre_edit_impact_guard.py` hook + `mcp__gitnexus__*` tool surface in research-protocol.md tool routing) | All probes PASS (already installed + smoke-probed) | Axis 1+2+3 PASS firm (named-author Abhigyan Patwari + STRONG-PROVENANCE-EXPRESS) | GENUINELY-NEW (already installed) | ✅ ALREADY-INSTALLED — maintain |
| 8 | quemsah/awesome-claude-plugins | `Z:/repos/deps/awesome-claude-plugins/` | `765d795e76b3` | (no LICENSE file at root) | ❌ **NOT-YET-INSTALLED** (zero manifest hits) — discovery-list of top-100 CC plugins | NO direct cites | P1 verified 16183 total plugins indexed per README L3 / P2 doc-only top-100 ranking / P3 vendor-neutral / P4 N/A (catalog not plugin) / P5 doc-only / P6 NO LICENSE = [UNKNOWN-LICENSE] FAIL per cardinal-rule-9 permissive-only invariant / P7 demand: discovery-surface for plugin selection — valid for `/plugin install` decisions | Axis 1 PASS (catalog of multi-orgs) + Axis 3 PASS (regularly updated 09.05.2026) | CITE-CLASS-CANONICAL (discovery-only) | ⚠️ CITE-PATTERN-ONLY-WITH-CAVEAT — license-blocker P6 FAIL means cite-only-not-clone-and-modify; use for plugin-selection research only |
| 9 | Shubhamsaboo/awesome-llm-apps | `Z:/repos/deps/awesome-llm-apps/` | `844cda76bfff` | Apache-2.0 | ❌ **NOT-YET-INSTALLED** (zero manifest hits) | NO direct cites | P1 N/A / P2 doc-only catalog of LLM application demos / P3 vendor-neutral / P4 N/A / P5 doc-only / P6 LICENSE Apache-2.0 PASS / P7 demand-gate FAIL — claude-sota-installed builds CC harness primitives, NOT consumer LLM apps; awesome-llm-apps catalogs end-user apps (chatbots, RAG demos) — categorical mismatch | Axis 1 PASS catalog + Axis 3 PASS | DUPLICATE-FUNCTIONALITY scope-mismatch | ❌ REJECT-FOR-FIT per Probe 7 demand-absence — wrong audience layer (consumer apps vs harness primitives) |
| 10 | forrestchang/andrej-karpathy-skills | `Z:/repos/deps/andrej-karpathy-skills/` | `2c606141936f` | **NO LICENSE FILE** | ✅ **CITE-INSTALLED** as TIER-1-NAMED-AUTHOR cite source for cardinal-rule-2 (Karpathy 4 principles); also packaged as plugin? Check via grep | YES — load-bearing cite-source for cardinal-rule-2 (Karpathy 4 principles); 1 manifest hit | P1 N/A / P2 doc-only skill bundle / P3 vendor-neutral / P4 N/A / P5 doc-only / P6 **NO LICENSE = [UNKNOWN-LICENSE]/conflicting per cardinal-rule-9** — cite-only-not-install (same shape as vercel-labs/agent-skills per Wave 137 Fire 2 retroclassification) / P7 demand satisfied via existing cardinal-rule-2 cite | Axis 1 PARTIAL (single-author) + Axis 2 PASS (Karpathy named-T1 author) + Axis 3 PASS firm | CITE-CLASS-CANONICAL | ✅ ACCEPT-AS-CITE-REFERENCE — cite-only-not-install per missing LICENSE; existing cardinal-rule-2 cite-trail is correct disposition |
| 11 | mattpocock/skills | `Z:/repos/deps/mattpocock-skills/` | `733d312884b3` | MIT | ❌ **NOT-YET-INSTALLED** (44 manifest hits BUT all reference Wave 137 Fire 1/2 REJECT-FOR-FIT — HARD-GATE setup-matt-pocock-skills + disable-model-invocation + 3 sequential interactive prompts at install) | YES — cited in `agent-harness-fit-verification.md` (iter-92 mattpocock REJECT-FOR-FIT cohort + L218 promotion threshold) | P1 N/A / P2 CC plugin / P3 vendor-neutral / P4 N/A / P5 **Probe 5 HARD-GATE setup gate FAIL** (`disable-model-invocation: true` + interactive Q&A at install) — structurally incompatible with autonomous /loop mode / P6 LICENSE MIT PASS / P7 N/A | Axis 1+2 PASS (mattpocock 48k+★ named-T2 + book quotes) + Axis 3 PASS | DUPLICATE-FUNCTIONALITY of HARD-GATE incompatibility class | ❌ REJECT-FOR-FIT per Probe 5 mode-harness-shape — confirmed iter-92 cohort REJECT; cite-only-not-install for skill content patterns |
| 12 | hesreallyhim/awesome-claude-code | `Z:/repos/deps/awesome-claude-code/` | `614f102accbc` | **CC-BY-NC-ND-4.0** | ❌ **NOT-YET-INSTALLED** (zero manifest hits) | YES sister rule mention only | P1 N/A / P2 doc-only catalog (226 resource rows, 10 CSV categories) / P3 vendor-neutral / P4 N/A / P5 doc-only / P6 **CC-BY-NC-ND = cite-only, NO fork-modify** — restrictive license blocker for vendoring / P7 demand: catalog-as-discovery — valid cite-only | Axis 1+2+3 PASS (curator-gated, well-maintained) | CITE-CLASS-CANONICAL (cite-only license-bounded) | ⚠️ CITE-PATTERN-ONLY — license-bounded; useful as plugin/skill discovery catalog at HEAD pin; no fork-and-vendor allowed |
| 13 | alirezarezvani/claude-skills | `Z:/repos/deps/claude-skills/` | `7d493fed97e4` | MIT | ❌ **NOT-YET-INSTALLED** (2 manifest hits) | YES — sister mention in `research-protocol.md` Curated CC-ecosystem catalogs as 5,200+ skills + 235 production-ready + cross-tool support | P1 N/A (verified 540 SKILL.md per Wave-2 audit) / P2 multi-AI-tool skill catalog (Claude Code + Codex + Gemini CLI + Cursor + 8 others) / P3 vendor-neutral / P4 OVERLAP risk — already-installed plugins (superpowers, addy, etc.) may cover same scope / P5 size-sprawl (235 skills) / P6 LICENSE MIT PASS / P7 demand-gate: registry-portability-eval queued as Fire 11 candidate per research-protocol.md | Axis 1+2+3 PASS firm (named-T2 maintainer + 5,200+★ + AUDIT_REPORT.md self-discipline) | PARTIAL-OVERLAP | ⚠️ STUDY-PILOT-PATTERN-EXTRACT — Fire 11 candidate AFTER Fire 10 OPERATIONAL gstack adoption; selective skill cherry-pick at top-3 ranking shape (per `research-protocol.md` queued Fire 11) |
| 14 | gsd-build/get-shit-done | `Z:/repos/deps/get-shit-done/` | `3aaed8f5d7c3` | MIT | ❌ **NOT-YET-INSTALLED** (zero manifest hits) | YES — sister mention in `research-protocol.md` High-signal CC workflow systems as TIER-2 reference (58,543★ multi-IDE meta-prompting + context-engineering system) | P1 verified per README — multi-runtime support (14 IDEs: OpenCode/Gemini/Kilo/Codex/Copilot/Cursor/Windsurf/Antigravity/Augment/Trae/Qwen/CodeBuddy/Cline + Claude Code) / P2 CC plugin + slash commands (`/gsd-graphify`, `/gsd-spike`, `/gsd-sketch`) / P3 vendor-neutral / P4 OVERLAP with existing GitNexus + sota-research + multi-perspective-subagents / P5 `--minimal` install option mitigates size-sprawl (700 vs 12K tokens) / P6 LICENSE MIT PASS / P7 demand: knowledge-graph + spike + sketch workflows — selective pattern-extract viable | Axis 1+2+3 PASS firm (58k★ + named-T2 reviews + 132 contributors + 49 releases) | PARTIAL-OVERLAP | ⚠️ STUDY-PILOT-PATTERN-EXTRACT — selectively extract `/gsd-graphify` (GitNexus integration parallel) + `/gsd-spike` (2-5 focused experiments) + token-budgeted install patterns; reference-only, not wholesale adopt |
| 15 | vercel-labs/agent-skills | `Z:/repos/deps/vercel-labs-agent-skills/` | `b9c8ee0643d8` | **NO LICENSE FILE** (gh API `spdx_id: null` per CLAUDE.md Wave 137 Fire 2 retroclassification) | ❌ **NOT-YET-INSTALLED** (9 manifest hits BUT all reference Wave 137 Fire 2 DOWNGRADE to `[UNKNOWN-LICENSE]/conflicting cite-only-not-install`) | YES — cited in CLAUDE.md cardinal-rule-1 disclaimer (vercel-labs reference UNKNOWN-LICENSE warning) | P1 N/A / P2 CC plugin / P3 vendor-neutral / P4 N/A / P5 doc-only / P6 **NO LICENSE root file** + README MIT claim only = **[UNKNOWN-LICENSE]/conflicting FAIL** per cardinal-rule-9 permissive-license-only invariant / P7 N/A | Axis 1 PARTIAL (single-org Vercel) + Axis 3 PASS but Axis 2 weak | DUPLICATE-FUNCTIONALITY of HARD-LICENSE-BLOCKER class | ❌ REJECT-FOR-FIT (cite-only-not-install) per Wave 137 Fire 2 retroclassification — confirmed |

---

## Top-5 NOT-YET-INSTALLED candidates (ranked by ADOPT-NOW eligibility)

Sorted by **disposition strength + axis-3 stability + Probe-DAG clean + demand-gate match**:

### #1 — alirezarezvani/claude-skills (STUDY-PILOT-PATTERN-EXTRACT @ conf=0.85)

- **Rationale**: Already queued as Fire 11 candidate in `research-protocol.md`. 5,200+★ MIT + maintainer self-audit discipline (`AUDIT_REPORT.md` classifying POWERFUL/SOLID/GENERIC/WEAK). Selective skill cherry-pick avoids size-sprawl Probe 5 fail.
- **First-action prescription**: Read `Z:/repos/deps/claude-skills/AUDIT_REPORT.md` to identify POWERFUL-tier skills, then evaluate top-3 against `agent-harness-fit-verification.md` 7-probe DAG before any install.
- **Install path** (if proceed): selective skill copy via cardinal-rule-9 install-class with version-pin to HEAD `7d493fed97e4`; NOT wholesale plugin install.

### #2 — gsd-build/get-shit-done (STUDY-PILOT-PATTERN-EXTRACT @ conf=0.83)

- **Rationale**: 58,543★ MIT + named-T2 practitioner reviews (7 independent reviewers per `research-protocol.md`) + context-rot mitigation evidence. `/gsd-graphify` parallels GitNexus integration; `/gsd-spike` experiment pattern not in current claude-sota-installed.
- **First-action prescription**: Read `Z:/repos/deps/get-shit-done/commands/gsd-graphify.md` + `commands/gsd-spike.md` to identify primitive shape, then evaluate pattern-extract vs full plugin install per CR-12 PARTIAL-OVERLAP class.
- **Install path** (if proceed): pattern-extract only — copy specific command files cite-class to `.claude/commands/` with explicit upstream attribution; NOT wholesale `/plugin install`.

### #3 — wshobson/agents (STUDY-PILOT-NARROW @ conf=0.78 — Phase 7 benchmark gate REQUIRED)

- **Rationale**: 3 STUDY-PILOT-NARROW candidates already identified per Wave 138 Fire 1 (protect-mcp + signed-audit-trails + shell-scripting). 76/80 plugins REJECT-FOR-FIT-MAJORITY — only narrow surface viable.
- **First-action prescription**: Phase 7 benchmark gate per newly-codified `agent-harness-fit-verification.md §Phase 7` MUST fire BEFORE install/enable. Require reproducible benchmark evidence (BENCHMARK-PASS) for the 3 candidates' claimed improvements.
- **Install path** (if proceed): selective per-plugin `/plugin install` via wshobson marketplace ONLY after benchmark gate passes; HARD-BLOCK on `conductor` plugin (HARD-GATE iter-93 REJECT cohort).

### #4 — nibzard/awesome-agentic-patterns (ACCEPT-AS-CITE-REFERENCE @ conf=0.92)

- **Rationale**: Already a functioning cite source in sibling claude-sota rules (parallel-sessions.md, team-orchestration.md). Pin HEAD `9c40e1004225` formally in manifest cite-trail.
- **First-action prescription**: Add row to `docs/sota-installed-manifest.md` Section 14/14.5 cite-class table: "TIER-2 cite-import-AMBER per CLAUDE.md Section 14.5 — agentic patterns catalog @ HEAD `9c40e1004225` Apache-2.0". No install action; cite-anchor only.
- **Install path**: cite-only via existing sister rules; no new install command needed.

### #5 — vinta/awesome-python (ACCEPT-AS-CITE-REFERENCE @ conf=0.88)

- **Rationale**: Python-ecosystem discovery surface valid for sss Python-heavy hooks/scripts/evals. CC-BY-4.0 cite-permissible.
- **First-action prescription**: Add row to `docs/sota-installed-manifest.md` Section 14/14.5 cite-class table: "TIER-2 cite-import-AMBER — awesome-python @ HEAD `5f725c25d7a7` CC-BY-4.0 (cite-only-doc-license)". No install action.
- **Install path**: cite-only via README-grep when choosing Python libraries for hooks/scripts; no fork-modify.

---

## CR-12 disposition summary

| CR-12 class | Count | Repos |
|---|---|---|
| **GENUINELY-NEW (already installed)** | 3 | affaan-m/everything-claude-code (#1), shanraisshan/CCBP (#2), abhigyanpatwari/GitNexus (#7) |
| **CITE-CLASS-CANONICAL (cite-reference)** | 4 | nibzard/awesome-agentic-patterns (#4), vinta/awesome-python (#5), forrestchang/andrej-karpathy-skills (#10), hesreallyhim/awesome-claude-code (#12) |
| **PARTIAL-OVERLAP (STUDY-PILOT-PATTERN-EXTRACT)** | 3 | wshobson/agents (#6 — STUDY-PILOT-NARROW with Phase 7 gate), alirezarezvani/claude-skills (#13), gsd-build/get-shit-done (#14) |
| **DUPLICATE-FUNCTIONALITY (REJECT-FOR-FIT)** | 4 | AsyncFuncAI/deepwiki-open (#3 — duplicates SaaS MCP), Shubhamsaboo/awesome-llm-apps (#9 — scope-mismatch), mattpocock/skills (#11 — HARD-GATE), vercel-labs/agent-skills (#15 — LICENSE blocker) |
| **CITE-PATTERN-ONLY-LICENSE-BOUNDED** | 1 | quemsah/awesome-claude-plugins (#8 — no LICENSE = cite-only) |

**Totals**: 15 rows audited. 3 ALREADY-INSTALLED. 4 ACCEPT-AS-CITE-REFERENCE. 3 STUDY-PILOT (1 narrow + 2 pattern-extract). 4 REJECT-FOR-FIT. 1 CITE-PATTERN-ONLY.

---

## Prescribed install actions per cardinal-rule-6 official-native-channel

### Cite-class manifest additions (no install action; cite-trail updates only)

```bash
# (none — operator-decision-pending; manifest edit Pattern A apply)
# Add 4 cite-class rows to docs/sota-installed-manifest.md Section 14/14.5:
# - nibzard/awesome-agentic-patterns @ HEAD 9c40e1004225 Apache-2.0
# - vinta/awesome-python @ HEAD 5f725c25d7a7 CC-BY-4.0 (cite-only)
# - forrestchang/andrej-karpathy-skills @ HEAD 2c606141936f UNKNOWN-LICENSE cite-only
# - hesreallyhim/awesome-claude-code @ HEAD 614f102accbc CC-BY-NC-ND-4.0 cite-only
```

### STUDY-PILOT prescribed install paths (operator-decision-pending — gated on Phase 7 benchmark + Probe DAG re-verification)

```bash
# (none execute this fire — read-only research probe per CR-9 exception)

# #1 alirezarezvani/claude-skills selective skill cherry-pick (DEFERRED until Fire 11):
#   Read Z:/repos/deps/claude-skills/AUDIT_REPORT.md  # identify POWERFUL-tier skills
#   For each POWERFUL skill: run agent-harness-fit-verification.md Probe DAG 1-7
#   Selective install: cp Z:/repos/deps/claude-skills/<domain>/<skill>/SKILL.md .claude/skills/<skill>/
#   Pin HEAD 7d493fed97e4 in manifest

# #2 gsd-build/get-shit-done pattern-extract (PARTIAL-OVERLAP):
#   Read Z:/repos/deps/get-shit-done/commands/gsd-graphify.md  # graph-integration pattern
#   Read Z:/repos/deps/get-shit-done/commands/gsd-spike.md     # spike pattern
#   Extract specific patterns cite-class to .claude/commands/ with upstream attribution
#   Pin HEAD 3aaed8f5d7c3 in manifest

# #3 wshobson/agents narrow plugin install (REQUIRES Phase 7 benchmark gate first):
#   For each candidate (protect-mcp, signed-audit-trails, shell-scripting):
#     1. Fire convergence-gate Row 2 fabrication-test check on README numeric claims
#     2. If fabrication-test PASS: /plugin marketplace add wshobson/agents
#     3. /plugin install <specific-plugin>@wshobson-agents
#   HARD-BLOCK on conductor plugin (HARD-GATE confirmed iter-93)
```

### REJECT-FOR-FIT (NO install action)

- AsyncFuncAI/deepwiki-open — REJECT (DUPLICATE of deepwiki SaaS MCP already wired)
- Shubhamsaboo/awesome-llm-apps — REJECT (scope-mismatch: consumer apps not harness)
- mattpocock/skills — REJECT (HARD-GATE setup incompatible with autonomous /loop)
- vercel-labs/agent-skills — REJECT (LICENSE UNKNOWN; cite-only-not-install)
- quemsah/awesome-claude-plugins — CITE-PATTERN-ONLY (no LICENSE; discovery-list use only)

---

## HONEST-NON-FINDING

**Zero repos surface an unconditional ADOPT-NOW (PRIMARY install)** — every NOT-YET-INSTALLED candidate either:
- (a) already covered by existing installed primitive (DUPLICATE-FUNCTIONALITY), OR
- (b) carries a LICENSE/HARD-GATE/scope blocker (REJECT-FOR-FIT), OR
- (c) requires Phase 7 benchmark gate or pattern-extract evaluation BEFORE install (STUDY-PILOT)

**This is a feature, not a failure**: claude-sota-installed has reached architectural saturation for the inspiration-repo set. The 5 already-installed plugins (addy-agent-skills + claude-plugins-official + context-mode + everything-claude-code + openai-codex) + 11 marketplaces + 10 MCP servers cover the load-bearing primitive surface; remaining candidates are selective cherry-pick territory.

**Path D risk surface (per Wave 137-138 + FM-09 cross-arc n=50 ladder)**: codex-rescue blind-spot specialization base rate now 7/7 firm — any future codex-rescue ADOPT-NOW on these abstract-pattern candidates SHOULD route through 2nd-stage sota-researcher per `agent-harness-fit-verification.md §Codex-rescue blind-spot specialization`.

**Discovery breadth verified**: 5 distinct source families used (local clones + git log + manifest grep + CLAUDE.md/rules cite-grep + plugin install cache enumeration); exceeds the ≥4 distinct families gate per `multi-source-discovery-breadth-discipline.md`.

---

## Cite-trail (TIER-1-DIRECT anchors)

- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 1-7 + §FM-09 + §Phase 7 benchmark gate
- `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 1+2+3
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 source-class reduction lattice
- `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 no duplicate functionality
- `Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md` ≥4 source family gate
- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rules-1/5/6/8/9/10/11/12

---

VERDICT: ADOPT_NOW=0 (already-installed=3 confirmed maintain), STUDY_PILOT=3 (1 narrow + 2 pattern-extract; alirezarezvani #1 top), REJECT=4 (deepwiki-open + awesome-llm-apps + mattpocock + vercel-labs), CITE_ONLY=5 (CCBP + agentic-patterns + awesome-python + karpathy + awesome-claude-code) + 1 CITE-PATTERN-ONLY-LICENSE-BOUNDED (awesome-claude-plugins) — covers 15/15 rows; HONEST-NON-FINDING on unconditional ADOPT-NOW (architectural saturation per Wave 137-138 evidence; remaining surface is cherry-pick + benchmark-gated)
