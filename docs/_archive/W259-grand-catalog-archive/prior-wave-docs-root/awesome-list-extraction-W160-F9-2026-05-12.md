# Awesome-list cite extraction — Wave 160 Fire 9 (2026-05-12)

> **Status**: **STAND-IN-DRAFT** — Fire 9 of 12-fire mega-wave per `.claude/plans/fluttering-wandering-pond.md`. **NOT AUTHORITATIVE** for downstream Fire 11 ship decisions. AUTHORITATIVE label deferred to Fire 11 convergence ship after cross-model gate completes.
>
> **Downstream-consumer contract**: Fires 6 (deepwiki-open install) + Fire 7 (plugin-namespace audit) + Fire 11 (convergence ship) MAY use this document for **install-candidate-identification + cite-class candidates ONLY**. Treat the ranking + cross-reference cite as gap-identification signal, NOT canonical adoption verdict until Fire 11 cross-model gate landing.
>
> **Cite class** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
> `constituents=[TIER-2 @ Z:/repos/deps/awesome-claude-plugins/README.md @ 765d795 (top-100 CC plugins ranked by stars; curated by quemsah), TIER-2 @ Z:/repos/deps/awesome-python/README.md @ 5f725c2 (curated by vinta), TIER-2 @ Z:/repos/deps/awesome-llm-apps/README.md @ 844cda7 (curated by Shubhamsaboo), TIER-2 @ Z:/repos/deps/awesome-claude-code/README.md @ 614f102 (curated by hesreallyhim — README "Update in progress" / Table of Contents=TODO), TIER-3-LOCAL-OPERATOR-DERIVED @ orchestrator-direct probe 2026-05-12 cross-reference]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE (sibling/community awesome-list is TIER-2 user-curated, NOT TIER-1 upstream-authority).

---

## §1 Methodology (FM-17.502 fallback to Path P)

Phase 1 Explore agent dispatch for Fire 9 was foreclosed by 5 prior FM-17.502 failures same-arc (per Fire 1 STAND-IN-NOTICE). Pivoted to orchestrator-direct probes:
- `cat Z:/repos/deps/<awesome-list>/README.md | grep -E "categories"` + targeted section reads
- `cat .claude/plugins/marketplaces/ | ls` for install-state cross-reference
- HEAD SHA pinned via `git -C Z:/repos/deps/<name> rev-parse --short HEAD` 2026-05-12

This document = HONEST-NON-FINDING per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` for the agent-dispatch axis (FM-17.502 systemic); per CR-12 SECONDARY cite-anchor path the awesome-list READMEs ARE the authoritative cite source.

---

## §2 awesome-claude-plugins (quemsah/awesome-claude-plugins @ HEAD `765d795`) — TOP-100 ranking

Curated top-100 CC plugins by GitHub stars (auto-updated 2026-05-09 per README; 16183 total repositories indexed). Top-25 cross-referenced with current install state:

| # | Repo | Stars | Already in this runtime? | Disposition |
|---|---|---:|---|---|
| 1 | `obra/superpowers` | 183K | ✅ `claude-plugins-official:superpowers` plugin enabled | NO ACTION (CR-12 PRIMARY satisfied) |
| 2 | `affaan-m/everything-claude-code` | 176K | ✅ `everything-claude-code` marketplace + plugin enabled | NO ACTION (CR-12 PRIMARY satisfied) |
| 3 | `f/prompts.chat` (fka Awesome ChatGPT Prompts) | 162K | ❌ NOT-INSTALLED | CITE-CLASS candidate (prompt library; NOT a CC plugin per README) |
| 4 | `vercel/next.js` | 139K | ❌ N/A (React framework, not CC plugin) | SKIP — false-positive in awesome-claude-plugins ranking |
| 5 | `anthropics/skills` | 130K | ✅ `anthropic-agent-skills` marketplace installed | NO ACTION (CR-12 PRIMARY satisfied) |
| 6 | `anthropics/claude-code` | 121K | ✅ CC binary 2.1.139 installed | NO ACTION (this IS the runtime) |
| 7 | `forrestchang/andrej-karpathy-skills` | 121K | ⚠️ DEPS PRESENT (`Z:/repos/deps/andrej-karpathy-skills/`), 1 SKILL.md present; NOT-INSTALLED-AS-PLUGIN | **STUDY-PILOT candidate** for plugin install per CR-12 PRIMARY |
| 8 | `nextlevelbuilder/ui-ux-pro-max-skill` | 76K | ❌ NOT-INSTALLED | **INSTALL candidate** (frontend/design skill); axis-1+2+3 verify required |
| 9 | `thedotmack/claude-mem` | 74K | ❌ NOT-INSTALLED | **STUDY-PILOT candidate** (memory tool; sister to sibling Wave 134 Fire 27-C mem0 STUDY-PILOT-PATTERN-EXTRACT verdict per MEMORY.md tail) |
| 10 | `multica-ai/andrej-karpathy-skills` | 59K | ⚠️ DUPLICATE of #7 | SKIP (likely same author or fork) |
| 11 | `JuliusBrussee/caveman` | 57K | ❌ NOT-INSTALLED | **STUDY-PILOT candidate** ("Claude Code skill that cuts 65% of tokens by talking like caveman"; token-efficiency layer) |
| 12 | `mem0ai/mem0` | 55K | ❌ NOT-INSTALLED but sibling Wave 134 Fire 27-C verdict STUDY-PILOT-PATTERN-EXTRACT conf=0.87 | **STUDY-PILOT-PATTERN-EXTRACT** (sibling already classified; respect prior verdict per CR-11 META-process SOTA discipline) |
| 13 | `upstash/context7` | 55K | ✅ `mcp__context7__*` MCP wired in `.mcp.json` | NO ACTION (CR-12 PRIMARY satisfied via MCP) |
| 14 | `MemPalace/mempalace` | 52K | ❌ NOT-INSTALLED | **STUDY-PILOT candidate** (AI memory system; sister to mem0/claude-mem) |
| 15 | `ruvnet/ruflo` | 47K | ❌ NOT-INSTALLED | **CITE-CLASS candidate** (claims "leading agent orchestration platform"; needs convergence-gate Axis-1 verify) |
| 16 | `bmad-code-org/BMAD-METHOD` | 47K | ❌ NOT-INSTALLED | **CITE-CLASS candidate** (development methodology) |
| 17 | `slidevjs/slidev` | 46K | ❌ N/A (presentation tool, not CC plugin) | SKIP — false-positive |
| 18 | `santifer/career-ops` | 44K | ❌ NOT-INSTALLED | SKIP (career-specific niche; not general SOTA) |
| 19 | `payloadcms/payload` | 42K | ❌ N/A (CMS framework) | SKIP — false-positive |
| 20 | `milla-jovovich/mempalace` | 41K | ⚠️ DUPLICATE of #14 | SKIP |
| 21 | `ChromeDevTools/chrome-devtools-mcp` | 39K | ✅ `chrome-devtools` MCP wired in `.mcp.json` | NO ACTION (CR-12 PRIMARY satisfied via MCP) |
| 22 | `abhigyanpatwari/GitNexus` | 37K | ✅ `gitnexus` MCP wired in `.mcp.json` | NO ACTION (CR-12 PRIMARY satisfied via MCP; Fire 10 deep-probe pending) |
| 23 | `sickn33/antigravity-awesome-skills` | 37K | ❌ NOT-INSTALLED | **STUDY-PILOT candidate** ("1,400+ agentic skills" bundle for CC + Cursor + Codex + Gemini CLI + Antigravity; convergence-gate Axis-1 verify required given multi-tool scope) |
| 24 | `addyosmani/agent-skills` | 35K | ✅ `addy-agent-skills` marketplace installed (Addy Osmani / Google Chrome team) | NO ACTION (CR-12 PRIMARY satisfied) |
| 25 | (next deferred — bounded probe scope) | | | |

**Cross-reference summary (top-25)**:
- ✅ Already installed/wired: **8** (superpowers, everything-claude-code, anthropic-skills, claude-code binary, context7, chrome-devtools, GitNexus, addy-agent-skills)
- ❌ NOT in this runtime + RECOMMENDED for follow-up: **5** install/study-pilot candidates (andrej-karpathy-skills as plugin, ui-ux-pro-max-skill, claude-mem, caveman, antigravity-awesome-skills)
- ⚠️ STUDY-PILOT-PATTERN-EXTRACT already classified by sibling: **2** (mem0 per Wave 134 Fire 27-C; mempalace as variant)
- 🚫 Cite-class only (non-plugin or false-positive): **5** (prompts.chat, next.js, slidev, payload, career-ops)
- 🔄 DUPLICATE entries: **3** (#10 multica-ai/karpathy-skills, #20 milla-jovovich/mempalace, etc.)

---

## §3 awesome-python (vinta/awesome-python @ HEAD `5f725c2`) — AI + Agents section

**Section §"AI and Agents"** (README L130-194) categorical breakdown:

| Sub-category | Candidates relevant to claude-sota-installed | Disposition |
|---|---|---|
| Agent Skills | `vintasoftware/django-ai-plugins`, `getsentry/skills`, `trailofbits/skills` (already cited in `docs/sota-installed-manifest.md §Section 12` as PROBE-PENDING per Wave 50 fire 2) | **CR-12 PROBE-PENDING** queue (already known) |
| Orchestration | `ag2ai/ag2`, `microsoft/autogen`, `crewAIInc/crewAI`, `stanfordnlp/dspy`, `langchain-ai/langchain`, `openai/openai-agents-python`, `pydantic/pydantic-ai` | **All CITE-CLASS-CANONICAL** per CR-12 (per Wave 134 Fire 27 series classification — these are alternative agent frameworks vs Anthropic SDK PRIMARY) |
| Data Layer | `mem0ai/mem0` (cross-ref to §2 #12; STUDY-PILOT-PATTERN-EXTRACT per Wave 134 Fire 27-C), `run-llama/llama_index`, `567-labs/instructor` | mem0 already classified; llama-index + instructor are LIBRARY-CLASS (not install-class for CC runtime) |
| Pre-trained Models | `huggingface/transformers`, `vllm-project/vllm`, `sgl-project/sglang`, `huggingface/diffusers`, `ml-explore/mlx-lm`, `unslothai/unsloth` | **N/A — LIBRARY-CLASS** (not CC primitive scope) |
| Speech | `openai/whisper`, `microsoft/VibeVoice`, `OpenBMB/VoxCPM` | **N/A — LIBRARY-CLASS** |

**Headline finding**: awesome-python AI/Agents section overlaps significantly with sibling-classified CR-12 lattice (Wave 134 Fire 27 series). No NEW install-class candidates emerged from awesome-python that aren't already in the manifest or REJECTED-POST-PROBE per CR-12 CITE-CLASS-CANONICAL classification.

---

## §4 awesome-llm-apps (Shubhamsaboo/awesome-llm-apps @ HEAD `844cda7`) — agent app library

Categorical breakdown (README L125+):

| Sub-category | Class | Disposition for claude-sota-installed |
|---|---|---|
| 🌱 Starter AI Agents (12 examples) | EXAMPLE-CLASS (single-file demo agents) | **NOT applicable** — these are LLM app examples, not CC primitives |
| 🚀 Advanced AI Agents (~25 examples) | EXAMPLE-CLASS (multi-step reasoning demos) | **NOT applicable** — same |
| 🎮 Autonomous Game-Playing Agents (3) | EXAMPLE-CLASS | **NOT applicable** |
| 🤝 Multi-agent Teams (~13 examples) | EXAMPLE-CLASS (CrewAI / AutoGen demos) | **NOT applicable** — sibling has classified CrewAI/AutoGen as CITE-CLASS-CANONICAL per Wave 134 Fire 27 series |
| 🗣️ Voice AI Agents (5) | EXAMPLE-CLASS (real-time voice) | **NOT applicable** |
| ♾️ MCP AI Agents | EXAMPLE-CLASS (MCP integration demos) | Sample for MCP integration patterns; CITE-CLASS-ONLY |
| 📀 RAG | EXAMPLE-CLASS | **NOT applicable** — RAG primitive is `memory` MCP + `context7` MCP in this runtime |
| 🧩 Awesome Agent Skills (sub-list) | CITE-CLASS pointer | Re-routes to other awesome-lists; nothing new |
| 💾 LLM Apps with Memory Tutorials | EXAMPLE-CLASS | **NOT applicable** |
| 💬 Chat with X Tutorials | EXAMPLE-CLASS | **NOT applicable** |

**Headline finding**: awesome-llm-apps is a TUTORIAL/EXAMPLE library, not a SOTA primitive catalog for the CC runtime. Useful for cite-class reference if/when building Python LLM apps, but NOT a source of install-class candidates for the claude-sota-installed runtime architecture.

---

## §5 awesome-claude-code (hesreallyhim/awesome-claude-code @ HEAD `614f102`)

**README status**: "Update in progress" — Table of Contents is `I. TODO` (per direct README read 2026-05-12).

**Headline finding**: This catalog is currently in transition (curator reorganizing). Cannot extract candidates yet. CITE-CLASS-ONLY reference; re-audit when README ships post-update.

---

## §6 Top-5 install candidates ranked for follow-up fires

Based on §2-§5 analysis, top-5 install candidates for Fire 7 + Fire 11 + future install fires:

| Rank | Repo | Stars | Class | Justification |
|---|---|---:|---|---|
| 1 | `sickn33/antigravity-awesome-skills` | 37K | STUDY-PILOT | 1,400+ agentic skills bundle; multi-tool (CC + Cursor + Codex + Gemini CLI + Antigravity); axis-1+2+3 convergence-gate verify required pre-install |
| 2 | `forrestchang/andrej-karpathy-skills` (as PLUGIN) | 121K | STUDY-PILOT | Already DEPS PRESENT at `Z:/repos/deps/andrej-karpathy-skills/`; promote from cite-reference to plugin install; sibling Karpathy 4 principles cite already in this runtime's rule system |
| 3 | `nextlevelbuilder/ui-ux-pro-max-skill` | 76K | STUDY-PILOT | Frontend/design skill; complements existing `frontend-design` plugin; axis-1+2+3 verify |
| 4 | `thedotmack/claude-mem` | 74K | STUDY-PILOT | Memory tool sister to mem0 (Wave 134 Fire 27-C STUDY-PILOT-PATTERN-EXTRACT); evaluate against current memory stack (graphiti + mcp-memory + sqlite_vec) |
| 5 | `JuliusBrussee/caveman` | 57K | STUDY-PILOT-LIGHT | Token-saving skill ("65% reduction"); compounds with cardinal-rule-7 graduated-unleash discipline |

Each STUDY-PILOT candidate requires Probe DAG P1-P6 per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` BEFORE install.

---

## §7 Top-5 SKIP rationale (false-positives + cite-only)

| Candidate | SKIP rationale |
|---|---|
| `f/prompts.chat` (162K) | Prompt library (not CC plugin); CITE-CLASS-ONLY |
| `vercel/next.js` (139K) | React framework (not CC plugin); false-positive in awesome-claude-plugins ranking algorithm |
| `slidevjs/slidev` (46K) | Presentation tool (not CC plugin); false-positive |
| `payloadcms/payload` (42K) | CMS framework (not CC plugin); false-positive |
| `santifer/career-ops` (44K) | Career-specific niche; not general SOTA primitive |

Plus 3 DUPLICATE entries in top-25 (e.g., multica-ai/andrej-karpathy-skills is fork of forrestchang's) — counted only once.

---

## §8 Forward direction (post-Fire-9)

- Fire 6 (deepwiki-open install) — uses §2 #21 ChromeDevTools-MCP as analog model (MCP-class install)
- Fire 7 (plugin-namespace audit) — uses §2 cross-reference table to identify NOT-INSTALLED candidates vs DUPLICATE-FUNCTIONALITY locals
- Fire 11 (convergence ship) — synthesizes §6 top-5 candidate ranking into install-priority queue per CR-12 PRIMARY
- Fire 12 (audit %) — re-counts manifest §Section 12 deep-probe queue + Section 14.5 cite-import-AMBER after §6 candidates probed

---

## §9 Cross-references

- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probes P1-P6 — every STUDY-PILOT candidate above gets this audit before install
- `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 1+2+3 — fresh-paint anti-pattern catch + STRONG-PROVENANCE-EXPRESS predicate
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — cite-class lattice (Tier-2 awesome-lists ARE cite-source, NOT TIER-1 upstream-authority)
- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 6-class lattice — disposition of each candidate per (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL)
- `docs/audit-refresh-W160-F1-2026-05-12.md` — Fire 1 baseline audit (STAND-IN-DRAFT)
- `docs/sota-installed-manifest.md §Section 12` — Wave 47 grand catalog top-15 deep-probe queue (overlaps with §6)
- `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_*.md` — sibling Wave 134 Fire 27 mem0 + langgraph + openai-agents-python verdicts (informs §6 ranking)

---

## §10 Provenance

- **Fire 9 dispatch**: 2026-05-12 post-Fire-1 close (T3 APPROVE on `6936a141` per Outcome A monotone-decline)
- **Empirical probes**: orchestrator-direct `cat`/`grep`/`head`/`ls` (Path P analog per FM-17.502 systemic failure context per Fire 1 STAND-IN-NOTICE)
- **Plan file**: `.claude/plans/fluttering-wandering-pond.md` Fire 9
- **Input awesome-list SHAs**: as cited in §2-§5 per individual repo HEAD
- **Output deliverable**: this file (`docs/awesome-list-extraction-W160-F9-2026-05-12.md`)
