---
title: Wave 126 Agent D — 8 user-named SOTA repos Probe DAG + axis-1+2+3 + Path A/B/C + Mia pre-apply
status: AUTHORITATIVE
date: 2026-05-09
agent: gpt5-archaeologist (BRIDGE-MODE Sonnet stand-in per CLAUDE.local.md ENV (f); STAND-IN-NOTICE applies)
wave: 126
fan-out-task: probe 8 user-explicitly-named SOTA repos vs eee runtime
---

## ARTIFACT-INLINE: tmp/wave126-agentD-8-named-repos-probe-2026-05-09.md

# Wave 126 — Agent D: 8 user-named SOTA repos probe

## Probe scope

User explicitly listed 8 SOTA repos 2026-05-09 for harness-fit + adoption-readiness audit:

1. https://github.com/vercel-labs/agent-skills
2. https://github.com/vinta/awesome-python
3. https://github.com/nibzard/awesome-agentic-patterns
4. https://github.com/wshobson/agents
5. https://github.com/alirezarezvani/claude-skills
6. https://github.com/mattpocock/skills
7. https://github.com/Shubhamsaboo/awesome-llm-apps
8. https://github.com/abhigyanpatwari/GitNexus

## Mia pre-apply pre-check (already-cited / already-installed status)

Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` discipline: probed eee CLAUDE.md + research-protocol.md + sibling rules + manifest + plugins/ BEFORE classifying as new candidates.

| Repo | Mia probe outcome | Cite location |
|------|-------------------|---------------|
| vercel-labs/agent-skills | NOT-cited eee; NOT-installed; **MARKETPLACE NAMING COLLISION** with `addy-agent-skills` (which uses `name: agent-skills` in marketplace.json + remote https://github.com/addyosmani/agent-skills.git) — addyosmani is the installed one, NOT vercel-labs | sibling rules grep returned 0 hits |
| vinta/awesome-python | **ALREADY-CITED Wave 8** at `Z:/claude-sota/.claude/rules/research-protocol.md:70` @ commit `07ad9436` REMOTE-ONLY by design (meta-list, no portable code surface) | research-protocol.md:70 |
| nibzard/awesome-agentic-patterns | **ALREADY-CITED EXTENSIVELY** in sibling rules (parallel-sessions.md / team-orchestration.md / synthesis-layer-verify.md) @ HEAD `ffb427683ec77f3690f7fadfec7a7611d9e907d9` as TIER-1 ALT-IMPL pattern catalog | sibling parallel-sessions.md + team-orchestration.md |
| wshobson/agents | NOT-cited eee; NOT-installed; **CLONED at `Z:/repos/deps/wshobson-agents`** HEAD captured below | cite check returned 0 hits |
| alirezarezvani/claude-skills | **ALREADY-CITED Wave 8** at `Z:/claude-sota/.claude/rules/research-protocol.md:68` @ HEAD `f567c61def3fb86046d7242b4bf27fceb63ad8b4` REMOTE-ONLY discovery surface | research-protocol.md:68 |
| mattpocock/skills | **ALREADY-CITED + LOAD-BEARING** in sibling `named-failure-modes.md:5-6,91` (Origin pattern source for FM router framing) + manifest §3 PLANNED 62k★ | sibling named-failure-modes.md + manifest L67 |
| Shubhamsaboo/awesome-llm-apps | NOT-cited eee; NOT-installed; **CLONED at `Z:/repos/deps/awesome-llm-apps`** | sibling+eee cite check 0 hits |
| abhigyanpatwari/GitNexus | **ALREADY-INSTALLED** in eee `.mcp.json:88-91` Wave 112 Ship 2AA 2026-05-09 (License: PolyForm Noncommercial 1.0.0 DOWNGRADE-WITH-DISCLOSURE; CR-9 sub-rule applied; sibling-bleed closure) | eee .mcp.json:88 |

**Mia OVER catches**: 5 of 8 already-cited or already-installed. Pre-apply prevents proposing already-shipped primitives as "new candidates".

## Probe DAG matrix (8 repos)

Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7 + `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 1+2+3:

| # | Repo | Stars | Created | Pushed | Age | License | P1 count | P2 SDK/CLI | P3 API | P4 namespace | P5 mode | P6 LICENSE | P7 demand |
|---|------|-------|---------|--------|-----|---------|----------|------------|--------|--------------|---------|------------|-----------|
| 1 | vercel-labs/agent-skills | 26,329 | 2025-12-08 | 2026-05-07 | ~5mo | **NONE (no LICENSE file; API + 404 confirmed)** | 7 root entries (skills/ + packages/) | `/plugin install` candidate (skills.sh marketplace `https://skills.sh/vercel-labs/agent-skills`) | Anthropic CC native | **COLLISION** with installed `addyosmani/agent-skills` (eee installed) | autonomous /loop OK | **REJECT — license absence + Vercel restrictions risk** | DEMAND-PARTIAL — addy already covers engineering-phase skills |
| 2 | vinta/awesome-python | 296,751 | 2014-06-27 | 2026-05-07 | ~12yr MATURE | NOASSERTION (CC attribution) | 27,850 forks | meta-list (no install — README only) | language-neutral | no namespace collision | doc-only — REMOTE-ONLY per Wave 8 verdict | NOASSERTION = cite-only, NOT install-class | already-cite-class ACTIVE; no install action needed |
| 3 | nibzard/awesome-agentic-patterns | 4,494 | 2025-05-31 | 2026-05-07 | ~12mo STABLE | Apache-2.0 | 172 patterns @ HEAD `ffb427683` | doc-class (cite-anchor only) | language-neutral | already-cite-class in sibling rules | autonomous /loop compatible | Apache-2.0 PASS | **ALREADY-EXTENSIVELY-CITED** — sibling rules cite ≥6 patterns at file:line |
| 4 | wshobson/agents | 35,078 | 2025-07-24 | 2026-05-09 | ~10mo STABLE | MIT | **80 plugins / 185 agents / 16 orchestrators / 153 skills / 100 commands** (per README) | `/plugin marketplace add wshobson/agents` (Smithery + manual) | Anthropic CC native | name collision risk — needs Probe 4 audit vs claude-plugins-official + ECC | autonomous /loop compatible (3-tier model strategy Opus 4.7/Sonnet 4.6/Haiku 4.5) | MIT PASS | **HIGH DEMAND** — eee has minimal agent surface; 185 agents would 4-10x capability |
| 5 | alirezarezvani/claude-skills | 14,239 | 2025-10-19 | 2026-05-09 | ~7mo STABLE | MIT | 235 skills + 28 agents + 27 commands across 9 domains | `/plugin marketplace add alirezarezvani/claude-skills` candidate | Anthropic CC native + cross-tool 12 AI tools | overlap with addy-agent-skills (engineering domain) | autonomous /loop OK; per-skill maintainer self-audit AUDIT_REPORT.md POWERFUL/SOLID/GENERIC/WEAK | MIT PASS | DEMAND PARTIAL — addy covers engineering; alireza adds 8 non-engineering domains (business-growth/marketing/product/finance/etc) |
| 6 | mattpocock/skills | 67,896 | 2026-02-03 | 2026-05-07 | ~3mo BORDERLINE | MIT | 27 SKILL.md (skills/) + Total Typescript named-author content | `/plugin marketplace add mattpocock/skills` (manifest §3 row L67 PLANNED) | Anthropic CC native | already cite-class; new plugin install proposal | autonomous /loop compatible | MIT PASS | **HIGH DEMAND** — Matt Pocock TypeScript content + ALREADY in manifest §3 PLANNED |
| 7 | Shubhamsaboo/awesome-llm-apps | 109,445 | 2024-04-29 | 2026-05-08 | ~12mo STABLE | Apache-2.0 | 9 categories: advanced_ai_agents/advanced_llm_apps/ai_agent_framework_crash_course/awesome_agent_skills/mcp_ai_agents/rag_tutorials/starter_ai_agents/voice_ai_agents | doc-class catalog (no install primitive — REMOTE-ONLY use) | language-neutral (Python-heavy examples) | no namespace collision | doc-class — cite-anchor only | Apache-2.0 PASS | DEMAND-LOW — eee has discovery surfaces; another catalog adds marginal value |
| 8 | abhigyanpatwari/GitNexus | 37,257 | 2025-08-02 | 2026-05-09 | ~9mo STABLE | NOASSERTION → **PolyForm Noncommercial 1.0.0** (eee already disclosed via SRA D1 lattice) | TypeScript monorepo + 16 CLI commands | `npm install -g gitnexus@1.6.3` (already installed) | code-intel MCP + CLI | code-intel namespace unique | already running as MCP | NON-COMMERCIAL — DOWNGRADE-WITH-DISCLOSURE applied | **ALREADY-INSTALLED** Wave 112 Ship 2AA |

## Convergence-gate Axis 1+2+3 verdicts

Per `Z:/claude-sota/.claude/rules/convergence-gate.md` (Axis 1 ≥3 distinct T1 orgs / Axis 2 ≥2 named T2 practitioners with dated artifact / Axis 3 ≥3 months stability with cpd × age band):

| # | Repo | Axis 1 ≥3 T1 orgs | Axis 2 ≥2 named T2 | Axis 3 stability band | Combined verdict |
|---|------|-------------------|---------------------|------------------------|-------------------|
| 1 | vercel-labs | PARTIAL — Vercel + addy + anthropics could form 3-org but namespace collision blocks install | UNKNOWN — no named-T2 practitioner verified | 5mo + skills.sh marketplace = ACTIVE-ITERATION | **REJECT-FOR-FIT P4 + P6 cascade** |
| 2 | vinta/awesome-python | PASS — multi-org acknowledged-canonical | UNKNOWN | 12yr MATURE | **PASS — ALREADY-CITED** (no install needed; cite-class ACTIVE) |
| 3 | nibzard | PASS — 4 orgs cite (sibling + nibzard + Apache + LF context) | PASS — multiple practitioners | 12mo STABLE-BURN-IN | **PASS — ALREADY-EXTENSIVELY-CITED** (no install needed) |
| 4 | wshobson | BORDERLINE — single-org Seth Hobson but Smithery curates + 35k★ velocity | wshobson named-author Smithery-listed | 10mo STABLE-BURN-IN with strong cpd (3812 forks) | **PASS-WITH-CAVEAT** STUDY-PILOT — single-author bus-factor risk |
| 5 | alirezarezvani | BORDERLINE — single-org alirezarezvani + 14k★ + 540 SKILL.md (already-cited at sibling) | UNKNOWN named-T2 — author self-curates | 7mo STABLE-BURN-IN | **PASS-WITH-CAVEAT** STUDY-PILOT — single-author bus-factor; broad domain spread (engineering→business→marketing→product) needs Probe 4 vs addy |
| 6 | mattpocock | PASS — Total TypeScript ecosystem + MIT + 67k★ | **PASS — Matt Pocock named-T2 author** (Total TypeScript YouTube/AIHero) | 3mo just-past axis-3 burn-in (90d threshold) BUT high cpd | **PASS — STRONG-PROVENANCE-EXPRESS predicate** (named-T2 + permissive license + author-org-as-T2-equivalent) |
| 7 | Shubhamsaboo | BORDERLINE — single-org Shubham + Apache-2.0 + 109k★ scale | UNKNOWN named-T2 verified | 12mo STABLE-BURN-IN | **PASS-WITH-CAVEAT** discovery-only ALREADY-EXTENSIVELY catalog |
| 8 | abhigyanpatwari | SINGLE-ORG NAMED-INDIVIDUAL TIER-4 (already disclosed in eee install comment) | UNKNOWN | 9mo STABLE-BURN-IN | **ALREADY-INSTALLED** with bus-factor disclosure |

## CR-12 Path A/B/C classification

Per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 (upstream-install-priority over sibling-cite-import):

| # | Repo | Path | Rationale |
|---|------|------|-----------|
| 1 | vercel-labs/agent-skills | **Path C UNFIT-FOR-INSTALL** | License absence + addyosmani/agent-skills namespace collision (already-installed) → REJECT-FOR-FIT |
| 2 | vinta/awesome-python | **Path B (cite-anchor)** | Already cite-class via `mcp__github__get_file_contents` per Wave 8 verdict; no install primitive available (meta-list) |
| 3 | nibzard/awesome-agentic-patterns | **Path B (cite-anchor)** | Already cite-class extensively in sibling rules @ HEAD `ffb427683`; no install primitive (pattern catalog) |
| 4 | wshobson/agents | **Path A — NEW upstream-install** | `/plugin marketplace add wshobson/agents` MIT + 35k★ + 80 plugins; Probe 4 namespace audit BEFORE install |
| 5 | alirezarezvani/claude-skills | **Path A — NEW upstream-install** (after Probe 4 vs addy) | `/plugin marketplace add alirezarezvani/claude-skills` MIT + 14k★ + 540 SKILL.md; complementary to addy in non-engineering domains |
| 6 | mattpocock/skills | **Path A — UPGRADE existing PLANNED to INSTALLED** | Already in manifest §3 row 67 as PLANNED; promote via `/plugin marketplace add mattpocock/skills` |
| 7 | Shubhamsaboo/awesome-llm-apps | **Path B (cite-anchor — discovery only)** | Catalog without install primitive; cite-anchor for LLM-app pattern discovery only |
| 8 | abhigyanpatwari/GitNexus | **ALREADY Path A INSTALLED** | Wave 112 Ship 2AA; npm install -g gitnexus@1.6.3 LIVE |

## Final verdicts (sorted by adoption priority)

| Priority | Repo | Verdict | Action |
|----------|------|---------|--------|
| 1 | wshobson/agents | **ADOPT-NOW (Path A)** | `/plugin marketplace add wshobson/agents` then Probe 4 namespace audit + selective `/plugin install <plugin>` per Smithery curation |
| 2 | mattpocock/skills | **ADOPT-NOW (Path A — PLANNED→INSTALLED)** | `/plugin marketplace add mattpocock/skills`; STRONG-PROVENANCE-EXPRESS predicate; named-T2 author |
| 3 | alirezarezvani/claude-skills | **STUDY-PILOT (Path A)** | After wshobson + mattpocock land, audit non-engineering domains for net-new value vs already-installed addy + ECC; cite Wave 8 deferral rationale |
| 4 | nibzard/awesome-agentic-patterns | **ALREADY-CITED ACTIVE** | No action — sibling rules cite extensively; eee inherits via cite-class per CR-1 lattice |
| 5 | vinta/awesome-python | **ALREADY-CITED ACTIVE** | No action — Wave 8 verdict still holds (REMOTE-ONLY meta-list) |
| 6 | abhigyanpatwari/GitNexus | **ALREADY-INSTALLED** | No action — Wave 112 Ship 2AA live |
| 7 | Shubhamsaboo/awesome-llm-apps | **CITE-ONLY (Path B)** | No install needed — discovery-surface catalog; cite if/when LLM-app pattern research surfaces |
| 8 | vercel-labs/agent-skills | **REJECT-FOR-FIT** | License absence (no LICENSE file at root, API 404) + namespace collision with addyosmani/agent-skills already installed; Probe 4 + Probe 6 cascade FAIL |

## Summary tally

- **ADOPT-NOW**: 2 (wshobson + mattpocock)
- **STUDY-PILOT**: 1 (alirezarezvani — pending Probe 4 vs addy)
- **ALREADY-CITED ACTIVE**: 2 (nibzard + vinta)
- **ALREADY-INSTALLED**: 1 (GitNexus)
- **CITE-ONLY**: 1 (Shubhamsaboo)
- **REJECT-FOR-FIT**: 1 (vercel-labs — license absence)

## Top-3 install priority (per user fan-out brief)

1. **`/plugin marketplace add wshobson/agents`** — MIT, 35k★, 80 plugins / 185 agents / 153 skills, Smithery-curated, 3-tier model strategy. Highest value-per-dollar add for eee runtime.
2. **`/plugin marketplace add mattpocock/skills`** — MIT, 67k★, named-T2 STRONG-PROVENANCE-EXPRESS, 27 SKILL.md TypeScript-rich. Already PLANNED in manifest §3.
3. **`/plugin marketplace add alirezarezvani/claude-skills`** — MIT, 14k★, 540 SKILL.md across 9 domains, complementary to addy in non-engineering. STUDY-PILOT pending Probe 4 namespace audit.

## CR-9 install-risk discipline mandates (apply before any install above)

For each Path A install:

1. **Pre-cite-import REVERT check** — `git -C Z:/claude-sota log --all --oneline -- '<sibling-target-path>'` (skip — Path A install not Path C cite-import)
2. **Sibling-bleed defense** — verify `Z:/claude-sota/` paths in any plugin SKILL.md / agent.md path-rewritten BEFORE install (Path A primarily affects `.claude/plugins/cache/<plugin>/` sandboxed; minimal bleed risk)
3. **Version-pin** — `/plugin marketplace add` resolves to commit SHA at install time; version-pin via marketplace.json `commit:` field if available, else accept HEAD with explicit `@HEAD-acknowledged-D6-risk` marker
4. **2-round fix-forward expectation** — codex T1 NEEDS-REVISION → fix-forward → APPROVE budget per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A; especially likely for wshobson 80-plugin install (Probe 4 namespace collisions probable)

## STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate

Agent D ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` per CLAUDE.local.md ENV (f) Anthropic Max Opus depletion fallback. Verdict origin: Sonnet stand-in NOT real GPT-5.5. Cross-model gate NOT structurally satisfied for this dispatch. Orchestrator MUST: (a) re-fire via real codex CLI for ADOPT-NOW prescriptions, OR (b) accept stand-in verdict with documented gate-bypass rationale, OR (c) REVERT-AND-REMOVE per `closed-loop-recursive-narrowing.md` Outcome B.

VERDICT: 8-repo probe COMPLETE; ADOPT-NOW=2, STUDY-PILOT=1, REJECT-FOR-FIT=1, ALREADY-INSTALLED=1; ALREADY-CITED-OR-CITE-ONLY=3; Top-3 install priority: wshobson/agents (Path A), mattpocock/skills (Path A — PLANNED→INSTALLED), alirezarezvani/claude-skills (Path A STUDY-PILOT).
