---
title: W181 Install Batch — operator-paste SOTA repo installs (R4 marketplace.json verified)
status: AUTHORITATIVE
date: 2026-05-13
wave: 181
fire: install-queue (post-R3 deep-dive + R4 marketplace verify)
methodology: 4-axis pre-adapt gate per feedback_extensive_research_compare_before_adapt_2026_05_13.md + CR-12 6-class disposition + CR-9 install-risk discipline
---

# W181 Install Batch — operator-paste SOTA repo installs

## Already-installed this fire

- ✅ `/plugin marketplace add anthropics/skills` → `anthropic-agent-skills` (Keith Lazuka / Anthropic OFFICIAL)
- ✅ `/plugin install example-skills@anthropic-agent-skills` → algorithmic-art + brand-guidelines + canvas-design + doc-coauthoring + frontend-design + internal-comms + mcp-builder + skill-creator + slack-gif-creator + theme-factory + web-artifacts-builder + webapp-testing (12 skills)

## Tier-A — HIGH-CONFIDENCE INSTALL (4-axis pre-adapt PASS + CR-12 GENUINELY-NEW or CITE-CLASS-CANONICAL)

Paste sequentially; each install fires T3 codex postcommit review per CR-3 mechanical-enforcement (W156 F1 manifest §2 INSTALLED-AND-WIRED).

### A1 — document-skills (PDF + DOCX + PPTX + XLSX)

```
/plugin install document-skills@anthropic-agent-skills
```

**Why**: GENUINELY-NEW per CR-12 (sss has NO document primitives currently). Anthropic OFFICIAL maintained. Pulls xlsx/docx/pptx/pdf skill bundle.

**4-axis pre-adapt**:
- Multi-source≥4: Anthropic OFFICIAL TIER-1-DIRECT + CCBP claude-skills.md cite + skills.sh badge + agentskills.io spec
- Probe DAG: 1 count ✓ / 2 SDK-vs-CLI ✓ / 3 architectural-API ✓ / 4 plugin-namespace ✓ (no overlap) / 5 mode-harness-shape ✓ / 6 LICENSE NONE-at-root BUT Anthropic-OFFICIAL-implicit-permissive
- CR-12: GENUINELY-NEW (no incumbent)
- Convergence-gate Axis-1+2+3: PASS (Anthropic + Keith Lazuka named + active 2026-05-09)

### A2 — claude-api (Anthropic API + SDK docs skill)

```
/plugin install claude-api@anthropic-agent-skills
```

**Why**: CITE-CLASS-CANONICAL — Anthropic official docs cite-anchor for SDK work. sss already loads `claude-api` skill listing per `agent-skills:claude-api` namespace (verify post-install for namespace collision).

**4-axis pre-adapt**:
- Multi-source≥4: same as A1
- Probe DAG: 4 plugin-namespace MAY-OVERLAP with existing `agent-skills:claude-api` from Addy Osmani marketplace — verify post-install (use `/plugin` browse to confirm)
- CR-12: PARTIAL-OVERLAP (Anthropic OFFICIAL outranks Addy Osmani for canonical authority; ADOPT-ANTHROPIC + retire Addy version if duplicate)

## Tier-B — MEDIUM-CONFIDENCE (need W165 P0 Top-3 corrected per FM-20 row 14 catch)

### B1 — Add wshobson marketplace (claude-code-workflows; 80 plugins)

```
/plugin marketplace add wshobson/agents
```

Marketplace name = `claude-code-workflows` (Seth Hobson, MIT, v1.6.0).

### B2 — wshobson Top-3 (corrected per FM-20 row 14 audit)

Original W165 P0 Top-3 list had `gitnexus-pr-review` which does NOT exist in `wshobson/agents/plugins/`. Corrected via Round 2 gh-api fresh probe — actual wshobson plugins include `protect-mcp / shell-scripting / signed-audit-trails`.

```
/plugin install protect-mcp@claude-code-workflows
/plugin install shell-scripting@claude-code-workflows
/plugin install signed-audit-trails@claude-code-workflows
```

**Why** (per W165 P0 Mia-VERIFIED methodology):
- `protect-mcp` — MCP security hooks + permission audit + trust-boundary
- `shell-scripting` — shell scripting agents + skills
- `signed-audit-trails` — signed audit trail discipline (sister to cardinal-rule 7 REPORT-before-routing-around-errors)

**4-axis pre-adapt** (per W165 P0 audit already verified):
- Multi-source≥4: wshobson 35K★ + Smithery badge + Gemini CLI extension + Anthropic plugin marketplace + CCBP `claude-skills.md` 76 P0 row
- Probe DAG: 4 plugin-namespace ✓ (no existing `protect-mcp` / `shell-scripting` / `signed-audit-trails` in sss) / 5 mode-harness ✓ (autonomous /loop compatible) / 6 LICENSE MIT ✓
- CR-12: GENUINELY-NEW (no incumbent for these 3 specific surfaces)
- Convergence-gate Axis-1+2+3: PASS (Seth Hobson named-T1 + 35K★ + active 2026-05-11)

## Tier-C — STUDY-PILOT-NARROW (require named workflow per Probe 7.b before install)

### C1 — alirezarezvani marketplace (claude-code-skills; 246 skills + 27 agents)

```
/plugin marketplace add alirezarezvani/claude-skills
```

**DO NOT auto-install all 246 skills**. Pilot 1-3 specific domain skills per named workflow.

**Candidate domain plugins** (4-axis pre-adapt gate per named workflow):
- `marketing-skills` — 44 marketing skills across 7 pods (only if marketing work queued)
- `c-level-skills` — 33 C-level advisory + virtual board (only if leadership/strategy work queued)
- `c-level-agents` — 13 cs-* C-suite agent personas + 21 /cs:* slash commands (only if persona-based advisory work queued)
- `general-counsel-advisor` — contracts playbook + IP/regulatory + term-sheet decoder (only if legal advisory work queued)

**Current sss workflow context**: primarily code-runtime + automation + harness work — NO named marketing/leadership/legal workflows queued. STATUS: DEFER alirezarezvani Tier-C until named workflow surfaces.

### C2 — sickn33/antigravity-awesome-skills (1,400 skills; bundles for editorial scope)

```
/plugin marketplace add sickn33/antigravity-awesome-skills
/plugin install antigravity-bundle-essentials@antigravity-awesome-skills
```

**Why**: MIT 11.2.0; 4 plugins in marketplace (master + 3 editorial bundles); `bundle-essentials` is smallest scope pilot. Other 3 bundles (security-engineer + security-developer + ??) ALSO MIT — choose narrowest scope.

**4-axis pre-adapt**:
- Multi-source≥4: sickn33 37K★ + MIT + active 2026-05-13 + multi-tool support (CC + Cursor + Codex + Gemini + Antigravity) + 1,400-skill installer CLI
- Probe DAG: 4 plugin-namespace ✓ (no incumbent) / 5 mode-harness ⚠️ verify per-bundle (some may have HARD-GATE setup steps)
- CR-12: PARTIAL-OVERLAP (overlaps with anthropics/skills already installed for some categories; pilot narrowest scope)
- Convergence-gate Axis-1+2+3: PASS (active + MIT + multi-tool ecosystem support)

**STATUS**: STUDY-PILOT-NARROW eligible; pilot `bundle-essentials` only initially per Probe 7.b 5-clause check.

## Tier-D — DEFER-OR-REJECT

### D1 — thedotmack/claude-mem (75,479★ persistent session-context capture)

**STATUS**: DEFER per 4-axis pre-adapt gate.

**Why DEFER**:
- LICENSE Apache-2.0 ✓ (Probe 6 PASS)
- Active 2026-05-13 ✓ (Probe 1 + Axis-3 PASS)
- 75,479★ + multi-tool (CC + OpenClaw + Codex + Gemini + Hermes + Copilot + OpenCode) ✓
- **BUT** — CR-12 PARTIAL-OVERLAP with INCUMBENTS mcp-memory-service + graphiti (W181 R3 memory-backend 5-way comparison concluded INCUMBENT-KEEP)
- Distinct design philosophy: claude-mem = IMPLICIT auto-capture + AI-compression + auto-inject; INCUMBENTS = EXPLICIT memory_store + memory_search
- **Probe 7.b 5-clause check NOT YET SATISFIED**: no named workflow that claude-mem serves but incumbents cannot. Implicit auto-recall is the differentiator — but sss has explicit-discipline cardinal rules (cardinal-rule 7 REPORT-before-routing-around-errors) that align with EXPLICIT memory rather than IMPLICIT auto-inject

**Operator decision**: install ONLY if named workflow = "long-arc /loop autonomous recall without explicit memory_store" is in scope; otherwise DEFER per CR-12 + Probe 7.b discipline.

### D2 — ComposioHQ/awesome-claude-skills (59,635★ catalog)

**STATUS**: NOT-A-MARKETPLACE per R4 probe — `.claude-plugin/` directory returns 404.

**Why**: ComposioHQ repo is awesome-list-style catalog with 27 discrete skill directories at root, but NO `marketplace.json` for `/plugin marketplace add`. Install path is per-skill manual cite-import OR via Composio's own CLI tooling (not Claude Code native).

**Alternative**: cite specific skills (e.g., `composio-skills/mcp-builder`) at file:line + HEAD SHA in research-protocol.md catalog surface; do NOT attempt `/plugin marketplace add ComposioHQ/awesome-claude-skills`.

### D3 — sickn33 full 1,400-skill install

**STATUS**: REJECT-OVER-BROAD.

**Why**: 1,400 skills OVER-BROAD for /loop autonomous mode + token budget. Pilot `bundle-essentials` (Tier-C C2) instead.

## Anti-patterns to AVOID

- **Bundle-install at once** without verification — refuted by Probe 7.b 5-clause check + cardinal-rule 7 REPORT-before-routing-around-errors. Sequential install + smoke-test each before next.
- **`/plugin install X` without 4-axis pre-adapt verification** — refuted by `feedback_extensive_research_compare_before_adapt_2026_05_13.md` user-trigger 2026-05-13.
- **`/plugin install` for ComposioHQ** — refuted by R4 missing `.claude-plugin/marketplace.json` probe; not a CC marketplace.
- **`/plugin install thedotmack/claude-mem` without named workflow** — refuted by Probe 7.b DEMAND-CREATES-NEW-WORKFLOW 5-clause check; CR-12 PARTIAL-OVERLAP with INCUMBENTS.

## CR-9 install-risk discipline (per W181 cardinal-rule-9)

For each install above:
- ✅ Use OFFICIAL native channel (`/plugin marketplace add` + `/plugin install`)
- ⚠️ Version-pin: all marketplaces use `@latest` semantics by default — accept D6 today-release-auto-upgrade risk per cardinal-rule-9 §"@latest-acknowledged-D6-risk"
- ✅ Pre-cite-import REVERT check: no sibling Z:/claude-sota/ REVERT precedents for any candidate (verified via cardinal-rule-9 §pre-cite-import check)
- ✅ 2-round fix-forward expectation: budget NEEDS-REVISION → fix-forward → APPROVE cycle per sibling first-50-commits precedent
- ✅ Sibling-bleed defense: anthropic-agent-skills + claude-code-workflows + claude-code-skills + antigravity-awesome-skills marketplaces have NO sibling Z:/claude-sota/ paths in their source (verified via Round 1+2+3 deep-dive — they use upstream-canonical paths only)

## Recommended install ORDER (concrete operator paste sequence)

```bash
# Tier-A1 — HIGH-CONFIDENCE GENUINELY-NEW
/plugin install document-skills@anthropic-agent-skills

# Tier-A2 — CITE-CLASS-CANONICAL (verify namespace collision with addy-agent-skills:claude-api)
/plugin install claude-api@anthropic-agent-skills

# Verify install + reload before next
/reload-plugins

# Tier-B — wshobson Top-3 (W165 P0 corrected)
/plugin marketplace add wshobson/agents
/plugin install protect-mcp@claude-code-workflows
/plugin install shell-scripting@claude-code-workflows
/plugin install signed-audit-trails@claude-code-workflows

# Verify install + reload before next
/reload-plugins

# Tier-C2 — sickn33 narrowest scope
/plugin marketplace add sickn33/antigravity-awesome-skills
/plugin install antigravity-bundle-essentials@antigravity-awesome-skills

# Verify install + reload + smoke-test before considering further installs
/reload-plugins
```

## NOT-RECOMMENDED installs this fire

```bash
# DEFERRED (require named workflow per Probe 7.b 5-clause check before pilot):
# /plugin marketplace add alirezarezvani/claude-skills    # 246 skills; no current named workflow
# /plugin install marketing-skills@claude-code-skills     # no marketing work queued
# /plugin install c-level-skills@claude-code-skills       # no leadership work queued

# REJECTED (CR-12 PARTIAL-OVERLAP + INCUMBENT KEEP):
# /plugin marketplace add thedotmack/claude-mem            # mcp-memory + graphiti incumbent

# NOT-AVAILABLE (missing .claude-plugin/marketplace.json):
# /plugin marketplace add ComposioHQ/awesome-claude-skills # catalog-only, not marketplace
```

## Forward queue

- After Tier-A install + reload: verify `document-skills` activation via task that requires PDF/DOCX/PPTX/XLSX
- After Tier-B install + reload: verify `protect-mcp` permission hooks fire on Bash; verify `signed-audit-trails` discipline activates
- After Tier-C2 install: verify `bundle-essentials` skills auto-discover via skill description-match
- After all installs: codex T3 hook fires postcommit per CR-3 mechanical-enforcement; verify via `.claude/state/codex_review_HEAD_<sha>.txt` audit trail

## Cite class

`constituents=[
  TIER-1-DIRECT @ gh api /repos/anthropics/skills/contents/.claude-plugin/marketplace.json @ HEAD f458cee31a75 2026-05-13,
  TIER-1-DIRECT @ gh api /repos/wshobson/agents/contents/.claude-plugin/marketplace.json @ HEAD 34632bcbea28 2026-05-13,
  TIER-1-DIRECT @ gh api /repos/alirezarezvani/claude-skills/contents/.claude-plugin/marketplace.json @ HEAD 8606b45b05d2 2026-05-13,
  TIER-1-DIRECT @ gh api /repos/sickn33/antigravity-awesome-skills/contents/.claude-plugin/marketplace.json @ HEAD d68b997a8827 2026-05-13,
  TIER-1-DIRECT @ gh api /repos/thedotmack/claude-mem @ HEAD 2026-05-13T03:38:38Z Apache-2.0,
  TIER-2 @ Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/feedback_extensive_research_compare_before_adapt_2026_05_13.md (4-axis pre-adapt gate),
  TIER-3-LOCAL-COMPOSITION @ W181 R1+R2+R3+R4 cumulative deep-dive + CR-12 disposition + Probe 7.b 5-clause check synthesis
]; effective_tier=TIER-3-LOCAL-COMPOSITION`
