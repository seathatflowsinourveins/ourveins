# W195 P0 SOTA Convergence Audit — 16 Repos Probe-DAG-1-7

**Agent**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f); **STAND-IN-NOTICE** per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` — cross-model gate NOT structurally satisfied at agent layer; orchestrator-side BRIDGE-MODE re-verification REQUIRED before install commit per CR-3 Phase 1 bootstrap exception) — 2026-05-14

---

## Executive Summary

### Mia-verified runtime state (BEFORE audit)
- **9/16 repos already INSTALLED** via plugin marketplace + cache: claude-plugins-official (Anthropic OFFICIAL), addy-agent-skills (Osmani 43 skills), everything-claude-code (ECC 455 skills RC), claude-code-workflows (wshobson partial 5/81 plugins), claude-code-skills (alirezarezvani engineering pods 542 SKILL.md), anthropic-agent-skills (18), antigravity-awesome-skills (5), context-mode (12), openai-codex (codex backend)
- **3/16 repos REMOTE-ONLY** (no local clone): quemsah/awesome-claude-plugins, Shubhamsaboo/awesome-llm-apps, addy-agent-skills repo (marketplace INSTALLED via cache)
- **4/16 with critical Probe failures**: mattpocock (Probe 5 HARD-GATE), awesome-claude-code (Probe 6 CC-BY-NC-ND), awesome-claude-skills (LICENSE [UNKNOWN]), vercel-labs (NO LICENSE)

### Per-axis verdict
- **Axis 1 (≥3 distinct T1 orgs)**: PASS — 16 distinct named-author/org maintainers
- **Axis 2 (≥2 named T2 with dated artifact)**: PASS — Karpathy, Boris Cherny (CCBP), Pocock, Osmani all carry TIER-1-NAMED-AUTHOR-QUOTE cites at active cardinal-rule anchors
- **Axis 3 (≥3 months stability)**: PASS for 14/16; gsd-build BORDERLINE (~5mo); vercel-labs BORDERLINE (~2mo)

### Top-3 ADOPT-NOW Ranked

| Rank | Repo | Plugin/Component | CR-12 disposition | Install command (CR-6 official-native-channel) |
|---|---|---|---|---|
| **#1** | wshobson/agents | `context-management` plugin v1.2.0 MIT | PARTIAL-OVERLAP (extends W187 5-plugin install with NEW context-persistence/restoration workflow; complements cwc-§17 PROGRESS.md handoff) | `claude plugin install context-management@claude-code-workflows` |
| **#2** | wshobson/agents | `agent-orchestration` plugin MIT | PARTIAL-OVERLAP (extends W187 agent-teams with dispatch+coordination command primitives) | `claude plugin install agent-orchestration@claude-code-workflows` |
| **#3** | wshobson/agents | `review-agent-governance` plugin MIT | PARTIAL-OVERLAP (extends W187 comprehensive-review with policy-enforcement layer; sister to cross-model-consensus.md T1-T7) | `claude plugin install review-agent-governance@claude-code-workflows` |

---

## Per-Repo Detail (16 repos)

### 1. wshobson/agents @ HEAD `ece811f` (LOCAL)
- License MIT ✅; 81 plugins / 184 agents / 150 skills (marketplace.json:11 v1.6.0)
- W187 INSTALLED: 5/81 (agent-teams + comprehensive-review + protect-mcp + shell-scripting + signed-audit-trails)
- P1 ✅ 81 verified via `ls plugins/ | wc -l`; P2 ✅ CLI; P3 ✅ Anthropic-API native; P4 ✅ marketplace enabled; P5 ✅ autonomous /loop; P6 ✅ MIT clean
- P7.b DEMAND-CREATES-NEW for context-management + agent-orchestration + review-agent-governance; 76 plugins remain .a DEMAND-ABSENCE
- **CR-12**: PARTIAL-OVERLAP — Top-3 gap-filling candidates GENUINE
- **Mia-VERIFIED**: 5/81 INSTALLED via cache; Top-3 plugins NOT YET in cache ✅ GENUINE-GAP

### 2. abhigyanpatwari/GitNexus @ HEAD `98addbd6` (LOCAL)
- License ✅; npm @1.6.4 INSTALLED W187; MCP server wired in `.mcp.json`
- All probes PASS; healthy via W164 F19 + W164 F38b (5977 symbols + 6396 relationships)
- **CR-12**: ECOSYSTEM-IMPORT — already INSTALLED, no further action
- **Mia-VERIFIED**: MCP active ✅

### 3. quemsah/awesome-claude-plugins (REMOTE-ONLY)
- License [UNKNOWN]; catalog (not install-class)
- P6 README-blob-pin drift risk per FM-20 rows 10-13 (live re-verify required)
- **CR-12**: CITE-CLASS-CANONICAL (codified W190 P3a Pattern A 5-edit)
- **Mia-VERIFIED**: W190 P3a codified per MEMORY.md L141 ✅

### 4. Shubhamsaboo/awesome-llm-apps (REMOTE-ONLY)
- License [UNKNOWN]; catalog
- P7.a DEMAND-ABSENCE — W182 Agent A REJECT-n=4-cohort per MEMORY.md L113
- **CR-12**: ECOSYSTEM-IMPORT cite-only; REJECT for install
- **Mia-VERIFIED**: W182 REJECT-FOR-FIT confirmed ✅

### 5. forrestchang/andrej-karpathy-skills @ HEAD `2c606141` (LOCAL)
- **NO LICENSE FILE**; README attributes to Karpathy public post (TIER-1-NAMED-AUTHOR-QUOTE class)
- 1 SKILL.md = 67 LOC CLAUDE.md authoritative source
- P5 ✅ autonomous compatible; P6 NO LICENSE → cite-only safer per CR-1
- **CR-12**: CITE-CLASS-CANONICAL — already cardinal cite-anchor at CLAUDE.md CR-2 L30-32
- **Mia-VERIFIED**: CR-2 cite-anchor ACTIVE ✅

### 6. mattpocock/skills @ HEAD `733d3128` (LOCAL)
- License MIT ✅; 27 SKILL.md
- **P5 HARD-GATE FAIL**: 3 skills carry `disable-model-invocation: true` (Grep verified at `skills/deprecated/ubiquitous-language/SKILL.md`, `skills/engineering/setup-matt-pocock-skills/SKILL.md`, `skills/engineering/zoom-out/SKILL.md`)
- **CR-12**: GENUINELY-NEW (novel primitives) + REJECT-FOR-FIT-HARD-GATE per manifest §3 row 2 (W156 F2 V1+V2 codified)
- **Mia-VERIFIED**: 3 hits confirmed ✅ REJECT preserved

### 7. hesreallyhim/awesome-claude-code @ HEAD `614f102` (LOCAL)
- **License CC-BY-NC-ND-4.0** (LICENSE line 1); cite-only catalog (226 rows per CLAUDE.md L162)
- **P6 LICENSE BLOCKER**: forbids fork-modify
- **CR-12**: CITE-CLASS-CANONICAL only; REJECT for install (license blocks)
- **Mia-VERIFIED**: research-protocol.md §"7-catalog discovery surface" cites cite-only ✅

### 8. alirezarezvani/claude-skills @ HEAD `7d493fe` (LOCAL)
- License MIT ✅; 542 SKILL.md actual (CLAUDE.md L155 claims 235 — discrepancy noted; engineering pods are subset)
- P4 ✅ ALREADY ENABLED: `engineering-skills@claude-code-skills` + `engineering-advanced-skills@claude-code-skills` enabled=true
- **CR-12**: ECOSYSTEM-IMPORT — 2 sub-plugins INSTALLED W187; 7 other domain pods (marketing/business-growth/c-level-advisor/etc.) remain .a DEMAND-ABSENCE
- **Mia-VERIFIED**: 2 plugins enabled=true ✅

### 9. gsd-build/get-shit-done @ HEAD `3aaed8f5` (LOCAL)
- License MIT ✅; npm `get-shit-done-cc@latest`; 58k★ TIER-2 high-confidence
- P2 ✅ npm CLI; P3 ✅ meta-prompting/vendor-neutral 14 runtimes; P5 ✅ autonomous compatible; `--minimal` install (~700 cold-start tokens)
- P7.b DEMAND-CREATES-NEW for context-rot mitigation; PARTIAL via W189 `gsd-context-monitor.js` cite-adoption
- **CR-12**: PARTIAL-OVERLAP — `posttooluse_context_monitor.js` ALREADY CITE-ADOPTED W189 (MEMORY.md L124); full install would duplicate cite-adopted patterns. **DEFER full install** pending FM-09 2-stage validation (n=5 same-arc base rate 100% codex-rescue blind-spot)
- **Mia-VERIFIED**: W189 cite-adoption recorded ✅; full install DEFERRED to STUDY-PILOT

### 10. vercel-labs/agent-skills @ HEAD `b9c8ee06` (LOCAL)
- **NO LICENSE FILE** (BORDERLINE fork-modify ambiguous)
- 7 SKILL.md + 1 packages dir (`react-best-practices-build`)
- **CR-12**: PARTIAL-OVERLAP — react-best-practices duplicates engineering-skills@alirezarezvani; composition patterns novel but no concrete sss workflow
- **Mia-VERIFIED**: W192 close-synthesis L132 records "R10 LICENSE-pending" DEFER ✅ CONTINUE-DEFER

### 11. affaan-m/everything-claude-code (ECC) @ HEAD `841beea4` (LOCAL — both repo paths IDENTICAL via diff)
- License MIT ✅; 455 SKILL.md per cache
- P4 ✅ `everything-claude-code@everything-claude-code` enabled=true (INSTALLED-ACTIVE manifest §3 row 4)
- CR-9 caveat: 2.0.0-rc.1 D6 today-release-auto-upgrade risk noted in manifest
- **CR-12**: ECOSYSTEM-IMPORT — INSTALLED-ACTIVE
- **Mia-VERIFIED**: enabledPlugins:true ✅

### 12. shanraisshan/claude-code-best-practice (CCBP) @ HEAD `48f2ceb` (LOCAL)
- License MIT ✅; documentation reference
- TIER-1-DIRECT cite-anchor across CR-1, CR-3, CR-4 + multiple `.claude/rules/*.md`
- **CR-12**: CITE-CLASS-CANONICAL — already canonical at cardinal-rules level
- **Mia-VERIFIED**: CLAUDE.md L7,L40,L48,L57 cite-anchors ACTIVE ✅

### 13. vinta/awesome-python @ HEAD `5f725c2` (LOCAL)
- License CC-BY-4.0 — cite-attribution permitted; catalog (Python ecosystem)
- **CR-12**: CITE-CLASS-CANONICAL — already cited at research-protocol.md §"Curated Python-ecosystem catalog"
- **Mia-VERIFIED**: cite-anchor active ✅

### 14. shareAI-lab/learn-claude-code @ HEAD `4b95969` (LOCAL)
- License MIT ✅; tutorial repo (English/中文/日本語)
- **CR-12**: CITE-CLASS-CANONICAL — W190 P2 memory-repo-verdict HNF preserved incumbent (MEMORY.md L127)
- **Mia-VERIFIED**: W190 P2 verdict HNF ✅

### 15. ComposioHQ/awesome-claude-skills @ HEAD `f2b5e29` (LOCAL)
- **NO LICENSE FILE** (README claims Apache-2.0; CLAUDE.md L196 records LICENSE [UNKNOWN] conflict)
- ~56.9k★ aggregator across 5 AI tool ecosystems
- P6 LICENSE conflict = cite-only until resolved
- **CR-12**: ECOSYSTEM-IMPORT cite-only; license-pending
- **Mia-VERIFIED**: research-protocol.md §"Curated MCP-server discovery catalog" + CLAUDE.md L194-196 already note CITE-REFERENCE-ONLY ✅

### 16. addy-agent-skills (Osmani) @ HEAD `742dca5` (marketplace INSTALLED)
- License MIT (Apache 2.0 source per CLAUDE.md L186); 43 SKILL.md per cache
- P4 ✅ `agent-skills@addy-agent-skills` enabled=true
- **CR-12**: ECOSYSTEM-IMPORT — INSTALLED-ACTIVE
- **Mia-VERIFIED**: enabledPlugins:true ✅

---

## VERDICT

### ADOPT-NOW (Top-3; pending operator confirmation + cross-model T1 BRIDGE-MODE re-verification per `cmc-t1-t7-lifecycle.md §The contract`)
1. **wshobson/context-management** — `claude plugin install context-management@claude-code-workflows`
2. **wshobson/agent-orchestration** — `claude plugin install agent-orchestration@claude-code-workflows`
3. **wshobson/review-agent-governance** — `claude plugin install review-agent-governance@claude-code-workflows`

### STUDY-PILOT-NARROW
- **gsd-build/get-shit-done** full install (currently cite-adapted partial W189; full install requires FM-09 2-stage + Probe 6 npm-existence + Probe 5 CLI smoke)
- **wshobson** debugging-toolkit / unit-testing / api-testing-observability + 73 other plugins — STUDY-PILOT per-plugin demand-driven

### REJECT-FOR-FIT
- **mattpocock/skills** — Probe 5 HARD-GATE FAIL (codified W156 F2 manifest §3 row 2)
- **hesreallyhim/awesome-claude-code** — Probe 6 LICENSE blocker (CC-BY-NC-ND-4.0)
- **awesome-claude-skills (ComposioHQ)** — LICENSE [UNKNOWN] cite-only
- **vinta/awesome-python** — REJECT install; ACCEPT CITE-CLASS-CANONICAL
- **Shubhamsaboo/awesome-llm-apps** — DEMAND-ABSENCE per W182

### CITE-CLASS-CANONICAL (already cite-anchored)
- forrestchang/andrej-karpathy-skills ✅ CR-2
- shanraisshan/claude-code-best-practice ✅ multi-CR
- vinta/awesome-python ✅ research-protocol.md
- hesreallyhim/awesome-claude-code ✅ research-protocol.md
- shareAI-lab/learn-claude-code ✅ MEMORY.md L127

### ECOSYSTEM-IMPORT (already INSTALLED)
- GitNexus ✅ W187 npm
- alirezarezvani engineering pod ✅ W187
- affaan-m ECC ✅ INSTALLED-ACTIVE
- addy-agent-skills ✅ INSTALLED-ACTIVE
- wshobson 5/81 plugins ✅ W187 partial — **76 remain available for STUDY-PILOT per-demand**

### Cross-model gate satisfaction (CR-3 Phase 1 bootstrap exception)
**STAND-IN-NOTICE**: this audit ran under Sonnet stand-in per CLAUDE.local.md ENV (f). Cross-model T1 verification by orchestrator-side `codex exec --ephemeral -p deep-review-exec` foreground+tee REQUIRED before Top-3 install commit per `cmc-t1-t7-lifecycle.md §Phase 1 bootstrap exception`.

### Mia pre-apply pre-commit verification (REQUIRED before any install Edit)
- Verify Top-3 NOT YET installed: `ls /z/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/ | grep -E "context-management|agent-orchestration|review-agent-governance"` should return 0 hits (currently confirmed: 5 dirs only = agent-teams + comprehensive-review + protect-mcp + shell-scripting + signed-audit-trails)
- CR-9 budget: 2-round fix-forward expectation per plugin install
- FM-02 defense: use `git commit --only -- <pathspec>` narrow form

---

## Cite Trail (TIER-1-DIRECT)
- `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:11` @ `ece811f` — 79 plugins v1.6.0 MIT Hobson
- `Z:/repos/deps/wshobson-agents/plugins/context-management/.claude-plugin/plugin.json` @ `ece811f` — v1.2.0 MIT
- `Z:/repos/deps/mattpocock-skills/skills/{engineering/setup-matt-pocock-skills,engineering/zoom-out,deprecated/ubiquitous-language}/SKILL.md` @ `733d3128` — 3 HARD-GATE hits
- `Z:/repos/deps/awesome-claude-code/LICENSE:1` @ `614f102` — CC-BY-NC-ND-4.0
- `Z:/claude-sota-installed/.claude/settings.json:enabledPlugins` — 38 plugins enabled true
- `Z:/claude-sota-installed/docs/sota-installed-manifest.md §3` — row-by-row INSTALLED status
- `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` L121-127 — W187/W189/W190 ramp

---

**VERDICT LINE**: ADOPT-NOW {wshobson/context-management, wshobson/agent-orchestration, wshobson/review-agent-governance} pending BRIDGE-MODE T1 verification / STUDY-PILOT {gsd-build/get-shit-done full install, 76 wshobson plugins per-demand} / REJECT-FOR-FIT {mattpocock HARD-GATE, awesome-claude-code license, awesome-claude-skills license, Shubhamsaboo demand-absence} / CITE-CLASS-CANONICAL {karpathy CR-2, CCBP cardinal, awesome-python, learn-claude-code, awesome-claude-code-discovery}
