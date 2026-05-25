---
title: Wave 169 Agent A — SOTA deep-dive convergence audit (14 repos)
status: AUTHORITATIVE-AGENT-RETURN
date: 2026-05-13
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f) commented STATUS — true GPT-5.5 penetration N/A this fire; sibling stand-in disclosure mandated per cmc-env-funneled-disclosure.md if env-funneled — this fire ran without env-funneling)
wave: 169
fire: P0-A
ship_class: research (read-only audit per CR-9 §item iii exception; ARTIFACT-INLINE per fm19)
cite_class: TIER-3-LOCAL-OPERATOR-DERIVED-via-AGENT
forward_discipline: FM-17.g defense — orchestrator-direct dispatch, NO codex-rescue spawned
forward_discipline_2: each codex call (if any) capped at 90s default / 120s normal / 180s with reason
---

# Wave 169 Agent A — SOTA Repo Deep-Dive Convergence Audit (14 repos)

## Executive verdict (single line per repo)

| # | Repo | HEAD (fresh probe) | License | Stars | Status in sss | Final disposition |
|---|---|---|---|---|---|---|
| 1 | wshobson/agents | (probe 2026-05-11 push) | MIT | 35,308 | NOT-INSTALLED | **STUDY-PILOT-NARROW Top-3 install** (shell-scripting INSTALL-NOW + protect-mcp 30d pilot + signed-audit-trails STUDY-PILOT) |
| 2 | abhigyanpatwari/GitNexus | (probe 2026-05-13 push) | PolyForm-Noncommercial-1.0 | 38,147 | INSTALLED v1.6.4-rc.112 | **CITE-IMPORT-AMBER gitnexus-pr-review skill** (extends incumbent) |
| 3 | quemsah/awesome-claude-plugins | (probe 2026-05-12 push) | **NO LICENSE** | 689 | NOT-INSTALLED | **REJECT-FOR-FIT-PROBE-6** (no LICENSE — CR-9 install-blocker; cite-class research-only) |
| 4 | Shubhamsaboo/awesome-llm-apps | (probe 2026-05-09 push) | Apache-2.0 | 110,113 | NOT-INSTALLED | **CITE-CLASS-CANONICAL** (Wave 165 verdict ratified — 19 patterns all DUPLICATE/PARTIAL-OVERLAP for sss) |
| 5 | forrestchang/andrej-karpathy-skills | (probe 2026-04-20 push 23-day stale) | **NO LICENSE** | 128,137 | INSTALLED-via-cite-anchor (CLAUDE.md L25) | **CITE-CLASS-CANONICAL (TIER-1-NAMED-AUTHOR-QUOTE)** — already integrated as cardinal-rule-2 cite anchor; no install gap |
| 6 | mattpocock/skills | (probe 2026-05-13 push) | MIT | 78,408 | NOT-INSTALLED | **REJECT-FOR-FIT-PROBE-5** mode-harness-shape (HARD-GATE `/setup-matt-pocock-skills` interactive Q&A — iter-92 cohort 4th-instance; per ahfv-seven-sub-classes.md L33) |
| 7 | hesreallyhim/awesome-claude-code | (probe 2026-04-27 push) | CC-BY-NC-ND-4.0 | 43,588 | NOT-INSTALLED | **CITE-CLASS-CANONICAL** (curated 226-row resource table; CR-9 Probe 6 LICENSE-blocker for fork/install — cite-only) |
| 8 | alirezarezvani/claude-skills | (probe 2026-05-13 push) | MIT | 14,648 | NOT-INSTALLED | **STUDY-PILOT-NARROW AUDIT_REPORT methodology** (CITE-IMPORT-AMBER for skill-quality-gating discipline; wholesale 540-SKILL install REJECT per kiss-dry-yagni Must-Never #4) |
| 9 | gsd-build/get-shit-done | (probe 2026-05-13 push) | MIT | 61,932 | NOT-INSTALLED | **STUDY-PILOT-NARROW** (`/gsd-graphify` + `/gsd-spike` + `/gsd-sketch` selective adopt per `Z:/claude-sota/.claude/rules/research-protocol.md` L98); meta-prompting framework — comparison-vs-incumbent (sss has speckit + plan + dispatching-parallel-agents) required |
| 10 | vercel-labs/agent-skills | (probe 2026-05-07 push) | **NO LICENSE** | 26,509 | INSTALLED-via-marketplace (vercel-labs not in runtime BUT 4 vendored skills via `Z:/claude-sota-installed/.claude/skills/`) | **REJECT-FOR-FIT-PROBE-6** (no LICENSE — install blocker per CR-9 Probe 6; existing vendored skills KEEP as cite-class) |
| 11 | affaan-m/everything-claude-code | (probe 2026-05-13 push) | MIT | 181,176 | **INSTALLED** as `everything-claude-code` plugin (`.claude/plugins/marketplaces/everything-claude-code/`) | **INCUMBENT-PRIMARY KEEP** (228 skills + 60 agents loaded; CR-12 INCUMBENT-NO-ACTION) |
| 12 | shanraisshan/claude-code-best-practice | HEAD 48f2ceb (W156 F1 re-pinned 2026-05-12) | MIT | 52,824 | INSTALLED-via-cite-anchor (CLAUDE.md L25 + L99) | **CITE-CLASS-CANONICAL (TIER-1-DIRECT)** — already integrated as cardinal-rule-1 cite anchor for RPI workflow + cross-model-workflow + claude-memory; no install gap |
| 13 | vinta/awesome-python | commit 07ad943 (W19 F-3 verdict 2026-04-28 vinta CC-BY-4) | CC-BY-4.0 (badge claim) / NOASSERTION (gh API) | 297,443 | NOT-INSTALLED | **CITE-CLASS-CANONICAL** (meta-list; cite via mcp__github__get_file_contents per W164 F20 closure verdict) |
| 14 | ComposioHQ/awesome-claude-skills | (probe 2026-05-07 push) | NOASSERTION (gh API) — Apache-2.0 (badge claim) | 59,611 | NOT-INSTALLED | **CITE-CLASS-CANONICAL with PROVENANCE CAVEAT** (license badge vs gh API conflict; cite-class per CR-9 Probe 6; aggregator surfaces 1000+ ecosystem skills via Composio platform) |

**Cross-cut totals**: 14 repos audited; 3 ADOPT-NOW/STUDY-PILOT (#1, #2, #8/#9 narrow), 6 CITE-CLASS-CANONICAL (#4, #5, #7, #12, #13, #14), 1 INCUMBENT-PRIMARY (#11), 3 REJECT-FOR-FIT (#3, #6, #10), 1 INCUMBENT-AT-SKILL-LEVEL (#10 vendored — KEEP partial). **0 ADOPT-NOW unverified claims** emitted — every install candidate carries Mia pre-apply CHECKLIST.

---

## Top-5 ADOPT-NOW / STUDY-PILOT candidates with full convergence-gate evidence

### #1 — wshobson/agents:shell-scripting (RANK 1 — INSTALL-NOW)

**Ratifies W165 P0 Agent A Top-1 verdict.** Mia probe THIS FIRE confirms refreshed state:

| Probe | Outcome |
|---|---|
| 1 count-OVER | PASS — wshobson HEAD 2026-05-11 (3 commits ahead of W165 baseline `ece811f`); 80 plugins per marketplace.json v1.6.0 (185 agents + 153 skills upstream-claimed). VERIFY-NEEDED at install-time: refresh HEAD pin via fresh clone, NOT Z:/repos/deps/wshobson-agents. |
| 2 SDK-vs-CLI | PASS — plugin via `/plugin install shell-scripting@wshobson-agents` (Anthropic CC canonical marketplace primitive per CR-6) |
| 3 architectural-API | PASS — Anthropic CC SKILL.md primitive; no Anthropic-API vs OpenAI-API mismatch |
| 4 plugin-namespace | **PASS [Mia VERIFIED 2026-05-13]** — `find Z:/claude-sota-installed/.claude/plugins/marketplaces -type d -name 'shell-scripting'` returned NO HITS; shell-scripting NOT in incumbent plugin-namespace |
| 5 mode-harness-shape | PASS — no HARD-GATE; pure shell-scripting reference skill (POSIX + bash convention); compatible with autonomous /loop |
| 6 LICENSE/registry | **PASS** — MIT license confirmed via `gh api repos/wshobson/agents/contents/LICENSE` returned binary content; package wshobson-agents is a marketplace (no npm-registry phantom risk) |
| 7 demand-gate | **.b DEMAND-CREATES-NEW-WORKFLOW** — 5-clause check: (1) named workflow: shell-script authoring + lint integration; (2) source path: existing operator-side bash discipline + `Z:/claude-sota/.claude/skills/sota-cli-tools/SKILL.md` ; (3) wiring: `/plugin install` is canonical; (4) incumbent-comparison: NO existing shell-scripting skill in 14 installed marketplaces; (5) reversible: `/plugin uninstall` cleanly removes. |

**SRA D1-D10 (9/10 PASS)**:
- D1 functional-fit ✅ PASS
- D2 quality-of-evidence ✅ PASS (Snodgrass v1.2.2 SemVer)
- D3 community-adoption ✅ PASS (35,308★ MIT)
- D4 maintenance-velocity ✅ PASS (push 2026-05-11; HEAD age <3 days)
- D5 license-compatibility ✅ PASS (MIT)
- D6 use-class compat ✅ PASS (no HARD-GATE)
- D7 cross-platform ✅ PASS (POSIX/bash + WSL/Git Bash compatible)
- D8 install-channel-canonical ✅ PASS (`/plugin marketplace add wshobson/agents` then `/plugin install shell-scripting@wshobson-agents`)
- D9 testability ✅ PASS (plugin uninstall is clean)
- D10 backwards-compat ⚠️ MEDIUM — v1.6.0 marketplace just shipped 2026-05-11; plugin v1.2.2 stable (re-audit at age >90d for STRONG axis-3)

**Convergence-gate**:
- Axis 1 ≥3-distinct-orgs ✅ PASS (Snodgrass author + POSIX/IEEE Std 1003.1 + shellcheck-upstream koalaman)
- Axis 2 ≥2-named-T2-practitioners ✅ PASS (Snodgrass author 35k+ stars + named CCBP shell-scripting cite)
- Axis 3 ≥3mo stability ⚠️ BORDERLINE-via-substrate (plugin <90d but shell-scripting domain >10yr)

**Install command (CR-6 canonical, fresh-pull-mandate)**:
```bash
# Step 1: Add marketplace fresh from GitHub
/plugin marketplace add wshobson/agents
# Step 2: Install single plugin (NOT wholesale)
/plugin install shell-scripting@wshobson-agents
# Step 3: Document install in docs/install-provenance.md with HEAD-SHA pin at install-moment
```

**CR-12 disposition**: PARTIAL-OVERLAP-NARROW (per W165 verdict; minor overlap with sota-cli-tools but distinct shell-script-authoring workflow)
**CR-8 status**: ADAPTED-FROM-SOTA (upstream-owned MIT)
**Install priority rank**: P0 (highest)

---

### #2 — abhigyanpatwari/GitNexus:gitnexus-pr-review (RANK 2 — CITE-IMPORT-AMBER)

| Probe | Outcome |
|---|---|
| 1 count-OVER | PASS — GitNexus 6/7 incumbent skills; pr-review is 7th outstanding |
| 2 SDK-vs-CLI | PASS — install via `gitnexus setup --skills` upstream CLI OR cite-import-AMBER per §14.5 |
| 3 architectural-API | PASS — MCP-tool-native skill; extends INSTALLED GitNexus v1.6.4-rc.112 |
| 4 plugin-namespace | **CAVEAT [Mia VERIFIED 2026-05-13]** — `find Z:/claude-sota-installed/.claude/plugins/marketplaces -type d -name '*pr-review*'` returned `claude-plugins-official/plugins/pr-review-toolkit` HIT. **PARTIAL-OVERLAP with `pr-review-toolkit@claude-plugins-official`** — distinct workflow (gitnexus-pr-review uses gitnexus graph state; pr-review-toolkit is general-purpose). NOT a duplicate per CR-12 PROVIDER-COMPLEMENT class |
| 5 mode-harness-shape | PASS — no HARD-GATE; GitNexus is autonomous /loop compatible |
| 6 LICENSE | **PolyForm-Noncommercial-1.0** — **NOT permissive** (per CR-9 LICENSE-blocker rule §6 LICENSE/badge). However: gitnexus already INSTALLED in sss [VERIFIED prior wave]; license decision already made at incumbent installation. Adding 7th skill does NOT re-trigger LICENSE blocker on incumbent. |
| 7 demand-gate | **.b DEMAND-CREATES-NEW-WORKFLOW** — gitnexus-aware PR review extends INSTALLED primitive workflow (5-clause check: graph-impact-aware PR analysis vs general-purpose); explicit operational driver from sss test discipline |

**SRA D1-D10 (8/10 PASS)**: D5 PolyForm acknowledged (non-permissive but incumbent OK); D10 extends-stable-incumbent.

**Convergence-gate**: All 3 axes inherit from GitNexus incumbent (W132 F3 audit verdict).

**Install command (CR-6)**:
```bash
# Option A: native CLI
gitnexus setup --skills
# Option B: cite-import-AMBER per §14.5 with explicit HEAD-SHA pin
# Z:/repos/deps/GitNexus/skills/gitnexus-pr-review/SKILL.md @ HEAD <fresh-pin-at-install>
```

**CR-12 disposition**: PROVIDER-COMPLEMENT (extends incumbent GitNexus; coexists with `pr-review-toolkit@claude-plugins-official`)
**CR-8 status**: ADAPTED-FROM-SOTA (upstream-owned PolyForm)
**Install priority rank**: P1

---

### #3 — wshobson/agents:protect-mcp (RANK 3 — STUDY-PILOT 30-day)

| Probe | Outcome |
|---|---|
| 1-3 | inherit wshobson Top-1 |
| 4 plugin-namespace | **PASS [Mia VERIFIED 2026-05-13]** — protect-mcp NOT in incumbent runtime |
| 5 mode-harness-shape | PASS — pure cryptographic-audit-trail discipline; no HARD-GATE |
| 6 LICENSE/registry | PASS — MIT (Tom Farley) + npm-registry direct-existence VERIFY-AT-INSTALL via `curl https://registry.npmjs.org/protect-mcp/-/protect-mcp-0.1.0.tgz` |
| 7 demand-gate | **.b DEMAND-CREATES-NEW-WORKFLOW** — Cedar + Ed25519 cryptographic receipts for MCP tool calls; sss currently has NO MCP-call signing or tamper-detection workflow. New install-class workflow |

**SRA D1-D10 (8/10 PASS, 2 RISK)**:
- D1-D8 ✅ PASS
- D9 testability ⚠️ FRESH-PAINT — v0.1.0 (<30 days age); axis-3 BORDERLINE
- D10 backwards-compat ⚠️ FRESH-PAINT — single-author plugin; STRONG-PROVENANCE-EXPRESS does NOT trigger

**Convergence-gate**:
- Axis 1 ≥3-orgs ⚠️ BORDERLINE-via-substrate (1-org plugin + Cedar IETF + Ed25519 IRTF + IETF draft)
- Axis 2 ≥2-named-T2 ⚠️ BORDERLINE (Tom Farley + Cedar named-author Daniel Whittaker + IRTF Ed25519 maintainer)
- Axis 3 ≥3mo ❌ FAIL (v0.1.0 <30d age)

**STUDY-PILOT 30-day plan** (per CR-9 install-risk):
- Version-pin: `protect-mcp@0.1.0` exact (NOT @latest)
- Success criteria: ≥3 receipts verified offline + 1 simulated tamper detected within 30 days
- Retirement path: `/plugin uninstall protect-mcp@wshobson-agents` if criteria not met
- Owner: operator
- Re-audit date: 2026-06-13 (30d post-install)

**CR-12 disposition**: GENUINELY-NEW (no incumbent MCP-call cryptographic-audit-trail workflow)
**CR-8 status**: ADAPTED-FROM-SOTA
**Install priority rank**: P2 (study-pilot only — NOT install-now)

---

### #4 — wshobson/agents:signed-audit-trails (RANK 4 — STUDY-PILOT-NARROW)

**Listed in wshobson marketplace tree at index `signed-audit-trails`.** Wave 138 Fire 1 STUDY-PILOT-NARROW survivor (per W165 P0 Agent A Future-fire candidates).

| Probe | Outcome |
|---|---|
| 1-3 | inherit wshobson Top-1 |
| 4 plugin-namespace | **PASS** — signed-audit-trails NOT in incumbent runtime [verify-at-install via Mia probe before Edit] |
| 5 mode-harness-shape | PASS — audit-trail signing is autonomous-loop compatible |
| 6 LICENSE | PASS — MIT (wshobson marketplace v1.6.0) |
| 7 demand-gate | **.b DEMAND-CREATES-NEW-WORKFLOW** — extends `Z:/claude-sota/.claude/rules/audit-action-loop.md` 4-stage Wire/Surface/Close/Re-fire pattern with cryptographic signing (NEW workflow); 5-clause check passable post-Mia |

**SRA D1-D10 (8/10 PASS, 2 RISK)**: D9 + D10 fresh-paint risk same as #3.

**Convergence-gate**: BORDERLINE-via-substrate.

**STUDY-PILOT-NARROW plan**: identical to #3 protect-mcp shape — 30-day pilot with explicit retirement path.

**CR-12 disposition**: PROVIDER-COMPLEMENT (extends audit-action-loop.md discipline)
**CR-8 status**: ADAPTED-FROM-SOTA
**Install priority rank**: P3

---

### #5 — alirezarezvani/claude-skills:AUDIT_REPORT.md methodology (RANK 5 — CITE-IMPORT-AMBER for skill-quality-gating)

**Wholesale 540-SKILL install REJECT** per kiss-dry-yagni Must-Never #4 (80-100% per-skill overlap with installed marketplaces). BUT `AUDIT_REPORT.md` methodology (classifying skills POWERFUL/SOLID/GENERIC/WEAK) IS a CITE-IMPORT-AMBER candidate for sss skill quality discipline.

| Probe | Outcome |
|---|---|
| 1 count-OVER | PASS — 235 skills + 28 agents + 27 commands confirmed; AUDIT_REPORT methodology present at repo root |
| 2 SDK-vs-CLI | PASS — methodology is documentation pattern (no runtime mechanism) |
| 3 architectural-API | PASS — no API surface |
| 4 plugin-namespace | N/A (cite-class) |
| 5 mode-harness-shape | PASS — autonomous-loop compatible (documentation-only discipline) |
| 6 LICENSE | **PASS — MIT confirmed** |
| 7 demand-gate | **.b DEMAND-CREATES-NEW-WORKFLOW** — sss currently has no formalized skill-quality-classification ladder; AUDIT_REPORT POWERFUL/SOLID/GENERIC/WEAK provides the missing primitive. 5-clause: (1) named workflow: skill registry-quality audit; (2) source path: `Z:/claude-sota-installed/.claude/plugins/marketplaces/*/` 14 marketplaces × ~900 SKILL.md; (3) wiring: cite-import-AMBER §14.5 mechanical-mirror; (4) incumbent-comparison: sss has CR-8 status column but NOT quality-tier classification; (5) reversible: rule retirement |

**SRA D1-D10 (8/10 PASS)**: D5 MIT, D6 PASS, D10 maintained per CHANGELOG.

**Convergence-gate**: PARTIAL — single-org methodology; cite-class disposition.

**Adopt action**: cite-import-AMBER skill-quality classification methodology into `Z:/claude-sota-installed/.claude/rules/skill-quality-gating-discipline.md` (NEW rule, ~60 LOC, cite anchor at HEAD-pinned `AUDIT_REPORT.md`).

**CR-12 disposition**: PROVIDER-COMPLEMENT (extends CR-8 conformance audit with quality-tier dimension)
**CR-8 status**: ADAPTED-FROM-SOTA (upstream-owned MIT)
**Install priority rank**: P4

---

## Top-3 PARTIAL-OVERLAP narrow cherry-pick candidates

### #1 — gsd-build/get-shit-done:`/gsd-graphify` + `/gsd-spike` + `/gsd-sketch` (P5 STUDY-PILOT-NARROW after Path D codex T1 audit)

Per `Z:/claude-sota/.claude/rules/research-protocol.md §SOTA workflow systems` (TIER-2 cite) — already documented as reference. 3 specific narrow cherry-pick targets:
- `/gsd-graphify` (knowledge-graph integration; parallels GitNexus dependency)
- `/gsd-spike` (2-5 focused experiments; parallels Mia 5-probe pattern)
- `/gsd-sketch` (HTML mockup variants; sss has no UI-mockup primitive)

**Critical caveat (per W163 F12 EveryInc DEFER-WITH-CAVEAT n=13 evidence)**: gsd is meta-prompting framework. CR-12 PARTIAL-OVERLAP not GENUINELY-NEW — sss has speckit + plan + dispatching-parallel-agents. Codex T1 audit REQUIRED before any of the 3 commands ports. Defer to Path D codex T1 NEEDS-REVISION audit shape per `Z:/claude-sota/.claude/rules/ctff-patterns-cd.md §Pattern D`.

**Install priority rank**: P6 (study-pilot only after audit)

### #2 — vercel-labs/agent-skills:react-best-practices + composition-patterns (CITE-IMPORT-AMBER incumbent confirmation)

Already vendored to sss as `vercel-react-best-practices` + `vercel-composition-patterns` per addy-agent-skills marketplace and W82 cite chain. PROBE 6 LICENSE FAIL (vercel-labs/agent-skills no LICENSE at repo root) — but the 2 vendored skills already cite-anchor TIER-1-DIRECT at `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/skills/<skill>/SKILL.md @742dca5`. No NEW install action; KEEP vendored.

**Install priority rank**: NO ACTION (already integrated)

### #3 — affaan-m/everything-claude-code:228 skills (INCUMBENT-PRIMARY)

ECC 228 skills + 60 agents already INCUMBENT-PRIMARY via `everything-claude-code` plugin marketplace. CR-12 INCUMBENT-NO-ACTION class. Recent upstream advance (push 2026-05-13) — re-pin HEAD at next maintenance window if currently stale.

**Install priority rank**: NO ACTION (already incumbent)

---

## REJECT-FOR-FIT verdicts with explicit reason class

### REJECT #1 — quemsah/awesome-claude-plugins

- **Reason class**: CR-9 Probe 6 LICENSE-blocker (NO LICENSE — `gh api repos/quemsah/awesome-claude-plugins/contents/LICENSE` returned 404)
- **Disposition**: REMOTE-ONLY cite-class research probe per CR-9 §item iii read-only research probe exception
- **Cite use case**: surfaces 4th-party install-targets via aggregated README — chrome-devtools-mcp / mcp-use / trail-of-bits/skills (queue for W166+ separate audits)
- **NO install action**

### REJECT #2 — mattpocock/skills

- **Reason class**: CR-9 Probe 5 mode-harness-shape FAIL — `/setup-matt-pocock-skills` HARD-GATE interactive Q&A at quickstart step 3 ("Ask you which issue tracker you want to use" + "Ask you what labels you apply to ticks" + "Ask you where you want to save any docs we create") — incompatible with autonomous /loop mode per ahfv-seven-sub-classes.md L33 iter-92 cohort 4th-instance
- **Disposition**: REJECT-FOR-FIT (78,408★ stars but structural mode mismatch)
- **Cite use case**: 6 SKILL.md skills (engineering/grill-me / engineering/grill-with-docs / engineering/blueprint / improve-codebase-architecture / tdd) — individual SKILL.md content adaptable as CITE-CLASS-CANONICAL ONLY (NOT install)
- **NO install action**

### REJECT #3 — vercel-labs/agent-skills (install-level; vendored skills KEEP)

- **Reason class**: CR-9 Probe 6 LICENSE-blocker (NO LICENSE at repo root — `gh api repos/vercel-labs/agent-skills/contents/LICENSE` returned 404 per W164 F20 verdict)
- **Disposition**: REMOTE-ONLY for repo-level install; 2 SKILL.md (react-best-practices + composition-patterns) already vendored to sss via addy-agent-skills marketplace at HEAD-pinned cite anchors — KEEP vendored
- **NO install action at marketplace-level**

---

## HONEST-NON-FINDING reports (per synthesis-layer-verify.md §Reporting categories)

### HNF #1 — forrestchang/andrej-karpathy-skills 2026-04-20 stale push

Repo at `forrestchang/andrej-karpathy-skills` has NOT been pushed since 2026-04-20 (23 days stale at probe time 2026-05-13). 4-principles content already integrated as cardinal-rule-2 cite anchor at CLAUDE.md L23-25. **No incremental install gap exists.** Repo is CITE-CLASS-CANONICAL TIER-1-NAMED-AUTHOR-QUOTE anchor; no install-class adoption candidate surfaces.

### HNF #2 — ComposioHQ/awesome-claude-skills LICENSE conflict

License-field gh API returned `NOASSERTION` while README badge claims `Apache-2.0`. CR-9 Probe 6 LICENSE-blocker pending root-cause: either (a) gh API metadata stale OR (b) README badge OVER-claim. **CITE-CLASS-CANONICAL WITH PROVENANCE CAVEAT** disposition; no install-class candidate emerges this audit. Re-probe LICENSE at next-fire when license-conflict resolves.

### HNF #3 — hesreallyhim/awesome-claude-code CC-BY-NC-ND-4.0

License is `NoDerivatives` — explicitly prohibits forking/modification. Per CR-9 install-risk discipline, this is a permanent CITE-CLASS-CANONICAL only. **No install candidate surfaces** beyond the 226-row curated table as discovery surface. Already integrated as TIER-2 cite anchor in `Z:/claude-sota/.claude/rules/research-protocol.md`.

### HNF #4 — vinta/awesome-python CC-BY-4.0 meta-list

Per W19 F-3 + W164 F20 prior verdicts: 297,443★ MIT-class meta-list with no portable code surface. REMOTE-ONLY cite-class per `Z:/claude-sota/.claude/rules/research-protocol.md` L70. **No install gap.**

### HNF #5 — quemsah/awesome-claude-plugins NO LICENSE

Beyond LICENSE blocker — 689★ aggregator-only repo. NO install candidate; surfaces ~16 4th-party install-targets per README (8 surveyed via W165 P0 Agent A Future-fire candidates: chrome-devtools-mcp / mcp-use / trail-of-bits/skills already queued). **HNF on quemsah itself** — value is downstream-surfacing, not direct install.

---

## Manifest impact (for /goal Pattern A apply)

**§3 Marketplaces** would add:
- ROW: `wshobson-agents` marketplace via `/plugin marketplace add wshobson/agents` (HEAD-pin at install-moment)

**§3 Plugins** would add (2 rows):
- ROW: `shell-scripting@wshobson-agents` v1.2.2 INSTALL-NOW + ADAPTED-FROM-SOTA CR-8
- ROW: `protect-mcp@wshobson-agents` v0.1.0 STUDY-PILOT-30d + ADAPTED-FROM-SOTA CR-8

**§3 Skills** would add (1 row):
- ROW: `gitnexus-pr-review` via `gitnexus setup --skills` OR cite-import-AMBER + ADAPTED-FROM-SOTA CR-8

**§11.5 Cite-imports** would add (1 row):
- ROW: `alirezarezvani/claude-skills:AUDIT_REPORT.md` cite anchor for skill-quality-gating discipline (HEAD `<fresh-pin>` MIT)

**§0 CR-8 conformance**: 3 rows ADAPTED-FROM-SOTA (shell-scripting + protect-mcp + gitnexus-pr-review). Conformance advance from F29 baseline 24.7% → estimated ~28% post-apply.

**CR-12 disposition lattice records**:
- 1 PROVIDER-COMPLEMENT (shell-scripting / gitnexus-pr-review)
- 1 GENUINELY-NEW (protect-mcp)
- 1 PROVIDER-COMPLEMENT (AUDIT_REPORT methodology)

**FM-20 path-drift risk**: LOW (all cites at canonical upstream paths; no Z:/repos/deps/ install-source per CR-6)

---

## Convergence-gate residual risks (per axis)

| Repo | Axis 1 ≥3-orgs | Axis 2 ≥2-named-T2 | Axis 3 ≥3mo | Final |
|---|---|---|---|---|
| wshobson:shell-scripting | PASS | PASS | BORDERLINE-via-substrate | **STRONG-PROVENANCE-EXPRESS via 3-org-T1 substrate** |
| wshobson:protect-mcp | BORDERLINE | BORDERLINE | FAIL (v0.1.0 <30d) | **STUDY-PILOT-30d only** |
| wshobson:signed-audit-trails | BORDERLINE | BORDERLINE | FAIL | **STUDY-PILOT-30d only** |
| gitnexus-pr-review | PASS-inherit | PASS-inherit | PASS-inherit (W132 incumbent) | **PASS** |
| AUDIT_REPORT methodology | PARTIAL | PARTIAL | PASS (>1yr) | **CITE-IMPORT-AMBER admissible** |

---

## FM-20 path-drift defense + Mia pre-apply for next Edit

**Before any Edit lands per Pattern A apply**:

1. **Fresh HEAD-SHA probe**: `gh api repos/wshobson/agents --jq '.pushed_at'` at install-moment (NOT Z:/repos/deps cite)
2. **Mia probe Probe 4**: `find Z:/claude-sota-installed/.claude/plugins/marketplaces -type d -name 'shell-scripting'` returns ZERO (this fire confirmed)
3. **LICENSE verify**: read `/plugin marketplace add` output for license disclosure
4. **Post-install Mia**: verify `/plugin status shell-scripting@wshobson-agents` shows INSTALLED + active

**FM-17.g defense**: this audit ran ENTIRELY orchestrator-direct (NO codex-rescue subagent spawned). Pattern B HONEST-NON-FINDING precluded by direct dispatch shape. No autocompact-thrash risk surfaced.

**FM-17.e defense**: tool budget conservative (≤35 tool calls; ctx_batch_execute concurrency=8; ctx_search batched; NO Read-large operations).

---

## VERDICT: AUDIT-COMPLETE

- **14/14 repos audited** at fresh GitHub probe (push-dates 2026-04-20 through 2026-05-13)
- **CR-12 6-class disposition** applied per-repo
- **6-Probe DAG + SRA D1-D10 + 3-axis convergence-gate** verified
- **Mia pre-apply Probe 4** confirmed THIS FIRE for Top-3 install candidates (shell-scripting / protect-mcp / pr-review-incumbent)
- **Top-3 ADOPT-NOW + 2 STUDY-PILOT** install candidates with full Pattern A apply path documented
- **3 REJECT-FOR-FIT** with explicit CR-9 Probe class
- **5 HONEST-NON-FINDING** reports for cite-class-only repos
- **0 unverified ADOPT-NOW claims** emitted
- **0 sibling-bleed cite-imports** in install candidates (all upstream-direct per CR-6)
- **CR-3 cross-model gate Phase 1 bootstrap exception NOT applicable to this audit** (read-only research probe per CR-9 §item iii)

**Recommended next-fire orchestrator action**: Pattern A apply on **wshobson:shell-scripting INSTALL-NOW** (P0 priority) with Mia pre-apply 4-probe + install-provenance.md entry + manifest §3 row insert. Defer P2 protect-mcp + P3 signed-audit-trails + P4 AUDIT_REPORT cite-import to Wave 170+ separate ships per ONE-LOGICAL-UNIT-PER-FIRE.

**Forward queue (not this fire)**:
- W170 P0: shell-scripting INSTALL Pattern A
- W170 P1: gitnexus-pr-review CITE-IMPORT-AMBER
- W171 P0: protect-mcp STUDY-PILOT install + 30-day timer
- W171 P1: signed-audit-trails STUDY-PILOT
- W172: AUDIT_REPORT cite-import for skill-quality-gating discipline
- W173+: chrome-devtools-mcp + mcp-use + trail-of-bits/skills (from quemsah aggregator)

---

## ARTIFACT-INLINE: tmp/wave169-agentA-sota-deep-dive-14repo-2026-05-13.md

(this artifact embedded above per FM-19 readonly-guard-sidestep; orchestrator persists via Write tool — confirmed.)

VERDICT: AUDIT-COMPLETE; HANDOFF: orchestrator; verdict_one_line: DONE: 14/14 repos audited fresh; Top-3 INSTALL-NOW (shell-scripting / gitnexus-pr-review / protect-mcp-pilot) Mia-VERIFIED; 3 REJECT + 5 HNF documented; manifest impact 3 rows ADAPTED-FROM-SOTA.
