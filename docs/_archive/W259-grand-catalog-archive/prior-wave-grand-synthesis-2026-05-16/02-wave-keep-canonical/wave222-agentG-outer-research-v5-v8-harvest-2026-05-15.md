---
title: Wave 222 Agent G - Outer-Research Kits v5/v6/v7/v8 Catalog-Class Artifact Harvest
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 222
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: outer-research-v5-v8-harvest
predecessors: W220-agentC (v10-only) + W221-agentE (PHANTOM REFERENCE discipline)
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
orchestrator_note: phantom-reference conflict W221-E vs W222-G on chopratejas/headroom — escalate to Wave 224 Pattern D codex T1 resolution
---

# STAND-IN-NOTICE (first 5 lines)

STAND-IN per CLAUDE.local.md ENV (g) `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`; codex CLI not invoked; verdict is Sonnet stand-in only. Cross-model gate NOT structurally satisfied. Per `ahfv-codex-rescue-blind-spot.md §FM-09`: orchestrator MUST file 2nd-stage harness-fit-aware validation (Probe 4+5+6+7) BEFORE any ADOPT-NOW propagation. Sub-claim decomposition + Mia probe + FM-20 row 21 TARGET-runtime probe (claude-sota-pure ≠ claude-sota-installed) MUST apply before verdict propagation.

# Part 1 — Outer-Research Kit Inventory

## Kit version structure (Z:/claude-sota-installed/docs/outer research/kits/)

| Version | Status | Top-level files | Largest catalog file (KB) |
|---|---|---|---|
| **v5** | EXTRACTED | 25 files | ALL_IN_ONE 56.7K + SOTA_REPOS_FINAL_LIST 14.6K + REPOS_BY_CATEGORY 12.2K |
| **v6** | EXTRACTED | 26 files | REPOS_BY_CATEGORY 18.5K + SOTA_REPOS_FINAL_LIST 22.4K |
| **v7** | EXTRACTED (W222 from _archives/) | 22 files | ALL_IN_ONE 125.5K + REPOS_BY_CATEGORY 73.3K + SOTA_REPOS_FINAL_LIST 104.6K |
| **v8** | EXTRACTED (W222 from _archives/) | 21 files | ALL_IN_ONE 25.6K + REPO_METADATA 35.3K + SOTA_REPOS_FINAL_LIST 5.6K |

## Unique catalog files per version

| File | v5 | v6 | v7 | v8 |
|---|---|---|---|---|
| SOTA_REPOS_FINAL_LIST.md | 416 entries claimed | 232 unique grep-detected | 219 entries | 176 entries |
| REPOS_BY_CATEGORY.md | yes | yes (431 lines) | yes (73K largest) | yes (5.6K smallest) |
| CONVERGENCE_INSIGHTS_AND_ARCHITECTURE.md | yes (9-step diagram) | yes | yes | yes |
| INSTALLATION_ORDER_AND_DECISION_MATRIX.md | yes (9-step + decision matrix) | yes | yes | yes |
| TOKEN_OPTIMIZATION_ARCHITECTURE.md | yes (7 layers) | yes | yes | yes |
| MCP_SECURITY_AND_TOOLING.md | yes | yes | yes | yes |
| PARALLEL_GIT_WORKTREE_PLAYBOOK.md | yes | yes | yes | yes |
| CODEX_PLUGIN_CC_WORKFLOW.md | yes | yes | yes | yes |
| CLAUDE.md (kit operating rules) | 13-rule short | 26-rule | 9-rule | 18-rule |

## Cite-class for this harvest

`constituents=[TIER-2 @ outer-research kits v5/v6/v7/v8 user-curated content snapshots, TIER-3-LOCAL-OPERATOR-DERIVED @ W222 Agent G synthesis 2026-05-15 + W220-agentC v10 audit + W221-agentE PHANTOM REFERENCE discipline]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

The kits are **TIER-2 user-curated** (operator-assembled research snapshots, not TIER-1 upstream authority). Per cardinal-rule-1 + cardinal-rule-8: candidates surfaced here must be TIER-1-DIRECT re-verified at `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>` before any install-class adoption.

# Part 2 — SOTA_REPOS_FINAL_LIST Cross-Version Diff + PHANTOM-REFERENCE Audit

## High-priority candidate verification (PHANTOM-CHECK applied via mcp__github__search_repositories 2026-05-15)

| # | repo | EXISTS | stars | created | language | Cohort |
|---|---|---|---|---|---|---|
| 1 | mksglu/context-mode | YES | 14817 | 2026-02-23 | TypeScript | TOKEN-CONTEXT (installed) |
| 2 | chopratejas/headroom | YES (CONFLICT W221-E) | 1758 | 2026-01-07 | Python | TOKEN-CONTEXT (NEW) |
| 3 | fynnfluegge/agtx | YES | 1041 | 2026-02-08 | Rust | PARALLEL-OPERATOR (NEW) |
| 4 | nutthouse/tutti | YES | 35 | 2026-03-12 | Rust | low-star PILOT |
| 5 | yxwucq/CCUI | YES | 32 | 2026-03-16 | TypeScript | low-star PILOT |
| 6 | opensesh/KARIMO | YES | 177 | 2026-02-15 | Markdown | WORKFLOW-HARNESS (NEW) |
| 7 | SethGammon/Citadel | YES | 552 | 2026-03-20 | JavaScript | WORKFLOW-HARNESS (NEW) |
| 8 | bmad-code-org/BMAD-METHOD | YES | 47254 | 2025-04-13 | JavaScript | WORKFLOW-HARNESS (high-star) |
| 9 | eyaltoledano/claude-task-master | YES | 27150 | 2025-03-04 | JavaScript | WORKFLOW-HARNESS (high-star) |
| 10 | automazeio/ccpm | YES | 8110 | 2025-08-18 | Shell | WORKFLOW-HARNESS (high-star) |
| 11 | rtk-ai/rtk | YES | 48516 | 2026-01-22 | Rust | TOKEN-CONTEXT (installed) |
| 12 | ryoppippi/ccusage | YES | 14220 | 2025-05-29 | TypeScript | MEASUREMENT (verify) |
| 13 | smtg-ai/claude-squad | YES | 7482 | 2025-03-09 | Go | PARALLEL-OPERATOR (high-star) |
| 14 | zilliztech/claude-context | YES | 11131 | 2025-06-06 | TypeScript | TOKEN-CONTEXT (installed) |
| 15 | ComposioHQ/agent-orchestrator | YES | 7061 | 2026-02-13 | TypeScript | PARALLEL-OPERATOR (high-star) |
| 16 | intellectronica/ruler | YES | 2693 | 2025-05-20 | TypeScript | WORKFLOW-HARNESS |
| 17 | coleam00/context-engineering-intro | YES | 13321 | 2025-07-02 | Python | WORKFLOW-HARNESS (high-star) |
| 18 | Wirasm/PRPs-agentic-eng | YES | 2165 | 2025-06-21 | Python | WORKFLOW-HARNESS |
| 19 | matt1398/claude-devtools | YES | 3389 | 2026-02-07 | TypeScript | MEASUREMENT |
| 20 | safishamsi/graphify | YES | 48345 | 2026-04-03 | Python | CODE-INTEL (very high-star) |
| 21 | max-sixty/worktrunk | YES | 5085 | 2025-10-17 | Rust | PARALLEL-OPERATOR |
| 22 | fastmcp-me/mcp-ComputeGauge | **PHANTOM** | n/a | n/a | n/a | **EXCLUDE** |

**PHANTOM-REFERENCE catches**:
- **n=1 W222-G**: `fastmcp-me/mcp-ComputeGauge` cited in v5+v6+v7+v8 SOTA_REPOS_FINAL_LIST but returns total_count=0 on `mcp__github__search_repositories`. Per W221 Agent E discipline: EXCLUDE.
- **CONFLICT FROM W221-E**: `chopratejas/headroom` was flagged PHANTOM by W221-E (zero GitHub matches) but W222-G finds 1758★ Python created 2026-01-07. Possible causes: W221-E search-string mismatch (case-sensitivity/typo), repo recently created (W221-E search ran before 2026-05-15), or W221-E hallucination. **ORCHESTRATOR ESCALATION**: resolve via Wave 224 Pattern D codex T1 direct verification.

## Cross-version diff summary

### v7 elite-only entries demoted from v8 elite-quality

100 v7 entries did NOT make v8 (54% promotion rate). Includes guides/discovery references mostly. Notable promotion-failures: `Itachi-1824/claude-god-mode` (audit-required token claims), `Kilo-Org/kilocode` (alt coding-agent), `QwenLM/qwen-code`, `SuperClaude-Org/SuperClaude_Framework`, `efij/awesome-claude-code-security`.

### v8 additions NOT in v7 (34 new entries; elite-quality additions)

Notable: `safishamsi/graphify` (48k★ knowledge graph), `github/github-mcp-server`, `google/osv-scanner`, `snyk/agent-scan`, `humanlayer/humanlayer`, `mufeedvh/code2prompt`, `aidenybai/react-grab`, `kbwo/ccmanager`, `axeldelafosse/loop`, `troykelly/claude-skills`, `davila7/claude-code-templates`, `sharkdp/delta`, `LiorCohen/sdd`.

### v6-only DEMOTED candidates (49 entries; NEITHER in v7 nor v8)

Notable demoted: `gsd-build/get-shit-done`, `parcadei/Continuous-Claude-v3`, `pchalasani/claude-code-tools`, `qltysh/qlty`, `supermemoryai/claude-supermemory`, `thedotmack/claude-mem`, `Chachamaru127/claude-code-harness`, `GitGuardian/ggshield`, `penberg/swarm`. Per `convergence-gate.md` Axis-1+2+3: likely failed elite-quality predicates.

## Cross-kit CONVERGED set: 119 repos in v6 AND v7 AND v8

The 119-repo intersection forms the **HIGH-CONFIDENCE candidate baseline**. Foundation + core defaults convergence: anthropics/* + openai/codex + modelcontextprotocol/* + ryoppippi/ccusage + rtk-ai/rtk + mksglu/context-mode + oraios/serena + yamadashy/repomix + zilliztech/claude-context + bmad-code-org/BMAD-METHOD + eyaltoledano/claude-task-master + automazeio/ccpm + coleam00/context-engineering-intro + Wirasm/PRPs-agentic-eng + intellectronica/ruler + wshobson/agents + shanraisshan/claude-code-best-practice + affaan-m/everything-claude-code + opensesh/KARIMO + SethGammon/Citadel + agent-sh/agentsys + bdfinst/agentic-dev-team + ComposioHQ/agent-orchestrator + smtg-ai/claude-squad + superset-sh/superset + max-sixty/worktrunk + johannesjo/parallel-code + BloopAI/vibe-kanban + stravu/crystal + manaflow-ai/cmux + 89 more.

# Part 3 — REPOS_BY_CATEGORY + INSTALLATION_ORDER (Methodology Gap-Fill)

## v5 INSTALLATION_ORDER 9-step canonical sequence (4/4 cross-kit converged)

```
1. Native Claude Code setup: /usage, /context, short CLAUDE.md, git worktrees
2. Measurement: ccusage, statusline, claude-devtools if needed
3. Context admission: RTK, Context Mode, bash/log hooks
4. Code intelligence: Serena, Repomix, Claude Context, ast-grep
5. Workflow: BMAD or Task Master or CCPM; add PRP/RPI if useful
6. Parallel operator: /batch, claude --worktree, Claude Squad/CCManager/Kanban UI
7. Codex witness: codex-plugin-cc review/adversarial/rescue
8. CI/security: Claude Code Action, Semgrep, CodeQL, Gitleaks, Trivy
9. Memory: ADRs, rules, skills, repo maps; memory tools only after audit
```

## v5 Decision Matrix (USE-CASE → STACK; 4/4 converged)

```
Need lower token cost?           ccusage → RTK → Context Mode → Serena → Skills
Need large repo intelligence?    Serena → Claude Context → Repomix → Aider repo map
Need full product lifecycle?     BMAD → Task Master/CCPM → PRP/RPI
Need parallel execution?         claude --worktree → /batch → Claude Squad/CCManager/Kanban
Need independent review?         codex-plugin-cc → Codex GitHub review → Claude /security-review
Need security hardening?         permissions → hooks → Trail of Bits config → Semgrep/CodeQL/Gitleaks/Trivy
Need portable workflows?         AGENTS.md → Agent Skills → Superpowers → cc-thingz exports
```

## Gap analysis: v5 9-step install order vs claude-sota-installed manifest

| v5 step | claude-sota-installed status | Gap |
|---|---|---|
| 1. Native CC setup | INSTALLED (eee + CLAUDE.md + .gitignore) | None |
| 2. Measurement (ccusage / statusline) | ccusage CITE-ONLY in W213+ (install status unknown per fire scope); statusline UNKNOWN | **GAP: install ccusage + statusline** |
| 3. Context admission (RTK + Context Mode) | rtk INSTALLED (operator config) + context-mode INSTALLED (v1.0.124 latest) | None |
| 4. Code intel (Serena + Repomix + Claude Context + ast-grep) | repomix WIRED (MCP) + claude-context WIRED + ast-grep INSTALLED; Serena status UNKNOWN | **GAP: verify Serena install** |
| 5. Workflow (BMAD or Task Master or CCPM) | NOT-INSTALLED per W213-W221 catalogs | **GAP: install ONE of BMAD / claude-task-master / ccpm** |
| 6. Parallel operator (claude-squad / CCManager / Kanban) | `eee --worktree` WIRED; claude-squad / ccmanager NOT-INSTALLED | **GAP: install claude-squad** |
| 7. Codex witness (codex-plugin-cc) | codex-plugin-cc INSTALLED + WIRED (T1-T7 hooks per manifest §2) | None |
| 8. CI/security (Semgrep / CodeQL / Gitleaks / Trivy) | partial; per W214 trufflehog DEFER + gitleaks DEFER | **PARTIAL — review** |
| 9. Memory (ADRs/rules/skills) | extensive .claude/rules + .claude/skills (1556+ SKILL.md across plugins) | None |

# Part 4 — TOKEN_OPTIMIZATION + MCP_SECURITY (Beyond-W219+W221 Gaps)

## v5 TOKEN_OPTIMIZATION 7-layer architecture

```
0. Baseline measurement: /usage, ccusage, statusline
1. Always-on context minimization: short CLAUDE.md, short AGENTS.md
2. Context admission control: RTK, Context Mode, Headroom, ContextShield, jq/rg/fd policies
3. Semantic code retrieval: Serena, Claude Context, Repomix, ast-grep, tree-sitter, mgrep
4. Progressive disclosure: Skills, path rules, supporting files, task-specific docs
5. Context isolation: subagents, forked skills, background tasks
6. Filesystem isolation: git worktrees, containers, cloud sandboxes
7. Verification and memory: CI gates, ADRs, rules, skills, issue comments
```

## v5 "waste source -> best control" mapping (PORTABLE PATTERN)

| Waste source | Best control |
|---|---|
| Huge git diff | `git diff --stat`, RTK, focused hunks |
| Huge test logs | tail/grep/JUnit parser, Context Mode, PreToolUse hook |
| Huge browser/Playwright output | Context Mode |
| Repeated file reads | Serena, Claude Context, read ledger |
| Overgrown CLAUDE.md | Skills/rules/supporting files |
| Too many MCP tools | disable unused MCPs, prefer gh/aws/gcloud CLIs |
| Repeated architecture discovery | repo-map.md, ADRs, Task Master/CCPM state |
| Multi-agent duplication | worktree ownership + source-of-truth task graph |

## Gaps not yet in W221-E (toonify-mcp / claude-context-optimizer):

- **chopratejas/headroom (1.7k★)** — NEW Layer 2 token-context candidate cited in v5+v6+v7+v8 but not in W213-W221 catalogs. "Compress tool outputs, logs, files, and RAG chunks before they reach the LLM. 60-95% fewer tokens, same answers. Library, proxy, MCP server." Complementary to existing rtk + context-mode. Axis-3 STABLE-BURN-IN PASS at age >120d (created 2026-01-07). **CONFLICT W221-E**: W221-E said this is PHANTOM (zero matches), W222-G says it EXISTS. Resolve at Wave 224 Pattern D. **Recommendation**: STUDY-PILOT after Probe 4 plugin-namespace check against existing rtk/context-mode/repomix AND W224 conflict resolution.

## v5 MCP_SECURITY methodology (PATTERN-CLASS gaps)

### MCP-policy guidance (good vs CLI-preferred)

**Good MCP candidates**: semantic code retrieval / browser automation with bounded output / database schema inspection read-only / design tools with small extracted context / internal APIs with strict payload limits / memory systems with explicit retention policy.

**Prefer CLI for**: GitHub via `gh` / cloud ops via aws/gcloud/az / logs via grep/tail/jq / small deterministic shell tasks.

### MCP 8-question source-audit checklist

```
- Which tools does the MCP expose?
- Can it write files or execute commands?
- Can it access network or secrets?
- Does it return unbounded output?
- Does it persist data locally or remotely?
- Does it include prompt instructions in tool outputs?
- Does it run install/postinstall scripts?
- Does it have an allowlist/denylist?
```

### Security repos cited for evaluation

`InvariantLabs-ai/mcp-scan` / `MCP-Defender/MCP-Defender` / `lasso-security/claude-hooks` / `douglance/railguard` / `dwarvesf/claude-guardrails` / `yurukusa/cc-safe-setup` / `trailofbits/claude-code-config` / `snyk/agent-scan`.

**Pattern-class recommendation**: codify the **8-question MCP source-audit checklist** as `.claude/rules/mcp-source-audit-discipline.md` for claude-sota-pure. Methodology adapt-from-cite per cardinal-rule-8 (TIER-2 kit content -> TIER-3-LOCAL-COMPOSITION cite class).

# Part 5 — Cross-Kit Convergence Verdict Table

| Pattern / Repo | v5 | v6 | v7 | v8 | Convergence | Verdict |
|---|---|---|---|---|---|---|
| 9-step install order | YES | YES | YES | YES | 4/4 | **INSTALL-NOW pattern** for claude-sota-pure |
| Claude orchestrates / Codex reviews | YES | YES | YES | YES | 4/4 | Already in claude-sota-installed CR-3 |
| `claude --worktree` for parallel | YES | YES | YES | YES | 4/4 | Already wired via eee |
| Semantic retrieval before file-reads | YES | YES | YES | YES | 4/4 | Already wired (verify Serena) |
| Avoid full-log dumps; tail/grep/jq | YES | YES | YES | YES | 4/4 | Already in auto-compact-discipline Rank #1 |
| MCP 8-question source-audit | YES | YES | YES | YES | 4/4 | **CODIFY** as `.claude/rules/mcp-source-audit-discipline.md` |
| `rtk-ai/rtk` token compression | YES | YES | YES | YES | 4/4 | Already installed |
| `mksglu/context-mode` sandbox | YES | YES | YES | YES | 4/4 | Already installed (v1.0.124) |
| `yamadashy/repomix` pack/grep | YES | YES | YES | YES | 4/4 | Already wired (auto-compact-discipline Rank #2) |
| `zilliztech/claude-context` code RAG | YES | YES | YES | YES | 4/4 | Already wired |
| `oraios/serena` semantic retrieval | YES | YES | YES | YES | 4/4 | **VERIFY install** — GAP if absent |
| `ryoppippi/ccusage` | YES | YES | YES | YES | 4/4 | **VERIFY install** |
| BMAD-METHOD / claude-task-master / ccpm | YES | YES | YES | YES | 4/4 | **INSTALL-NOW GAP** |
| `intellectronica/ruler` cross-agent rules | YES | YES | YES | YES | 4/4 | **STUDY-PILOT** for claude-sota-pure |
| `smtg-ai/claude-squad` parallel TUI | YES | YES | YES | YES | 4/4 | **INSTALL-NOW GAP** |

## CONVERGED-PATTERN install recommendations (highest priority for claude-sota-pure)

**Priority 1 — install-class GAPS (4/4 convergence)**:
1. BMAD-METHOD (47k★) OR claude-task-master (27k★) OR ccpm (8k★) — workflow harness STEP 5
2. claude-squad (7.5k★) — parallel operator UI STEP 6
3. ccusage (14.2k★) + statusline — measurement stack STEP 2 (verify install status first)
4. oraios/serena — semantic retrieval STEP 4 (verify install status first)

**Priority 2 — cite-class CONVERGED-METHODOLOGY (4/4)**:
5. Adopt 9-step install order as `docs/install-order-discipline.md`
6. Codify MCP 8-question source-audit as `.claude/rules/mcp-source-audit-discipline.md`
7. Codify token-opt 7-layer as `.claude/rules/token-opt-7-layer-architecture.md`
8. Adopt "waste source -> best control" 8-entry mapping as command-policy skill

**Priority 3 — STUDY-PILOT candidates (3-4/4 convergence; require 2nd-stage validation)**:
9. fynnfluegge/agtx (1k★) — Rust blackboard for coding agents
10. chopratejas/headroom (1.7k★) — token compression library/proxy/MCP **CONFLICT W221-E PHANTOM-FLAG; resolve at W224**
11. opensesh/KARIMO (177★) — PRD-driven orchestration
12. SethGammon/Citadel (552★) — 4-tier routing /do with worktrees
13. ComposioHQ/agent-orchestrator (7k★) — distributed dashboard

**Priority 4 — DEMOTED CANDIDATES (in v6 only, NOT in v7/v8)**:
49 v6-only entries — likely failed elite-quality predicates. DEFER unless specific use-case justification.

**Priority 5 — PHANTOM (do NOT adopt)**:
`fastmcp-me/mcp-ComputeGauge` — does NOT exist on GitHub (PHANTOM-REFERENCE caught W222 Agent G).

# VERDICT

**STUDY-PILOT-CATALOG**: outer-research kits v5/v6/v7/v8 contain 119-repo cross-kit converged baseline + 9-step install order + token-opt 7-layer architecture + MCP 8-question source-audit checklist + use-case-to-stack decision matrix. **Highest-confidence install-class gaps for claude-sota-pure**: BMAD-METHOD / claude-task-master / ccpm (workflow harness STEP 5) + claude-squad (parallel operator STEP 6) + ccusage install-verify (STEP 2) + Serena install-verify (STEP 4). **Methodology gaps to codify as cite-class rules**: install-order 9-step + MCP 8-question audit + token-opt 7-layer architecture. **Phantom-reference catch**: `fastmcp-me/mcp-ComputeGauge` does NOT exist — exclude. **CONFLICT**: `chopratejas/headroom` W221-E PHANTOM vs W222-G EXISTS 1758★ — Wave 224 Pattern D resolution.

**FM-09 / FM-20 / Mia pre-apply gates**: this verdict is STAND-IN class per CLAUDE.local.md ENV (g) — orchestrator MUST apply 2nd-stage harness-fit-aware validation (Probe 4 plugin-namespace + Probe 5 mode-harness-shape + Probe 6 license/registry blockers + Probe 7 demand-gate) AND TARGET-runtime probe on `claude-sota-pure` (NOT claude-sota-installed) per FM-20 row 21 + Mia §Alternate-install-path probe discipline before any Pattern A apply per CR-12 disposition lattice.

**Top-3 INSTALL-NOW for claude-sota-pure** (subject to orchestrator 2nd-stage validation):
1. **BMAD-METHOD @ 47k★** — highest-star workflow harness with 4/4 cross-kit convergence
2. **claude-squad @ 7.5k★** — parallel operator UI complement to existing eee --worktree
3. **install-order-discipline.md** cite-class rule codifying v5 9-step install order

**Forward Top-5 (queue for follow-up fires)**:
- F1: probe Serena install status; if absent → install (4/4 convergence)
- F2: probe ccusage install status; if absent → install (4/4 convergence)
- F3: codify MCP source-audit 8-question checklist as `.claude/rules/mcp-source-audit-discipline.md`
- F4: codify token-opt 7-layer as `.claude/rules/token-opt-7-layer-architecture.md`
- F5: STUDY-PILOT headroom + agtx + KARIMO + Citadel (3-4/4 convergence each) via Probe DAG 1-7

**Cross-model gate**: NOT structurally satisfied (Sonnet stand-in). Orchestrator-side codex T1 Path P foreground+tee dispatch REQUIRED before any ADOPT-NOW propagation per `cross-model-consensus.md §"On codex unavailable"` recovery option (a) defer-queue.

---

## VERDICT (final-return line)

**STUDY-PILOT-CATALOG**: v5/v6/v7/v8 outer-research kits yield 119-repo cross-kit converged baseline + 4/4-convergent 9-step install order + 7-layer token-opt architecture + 8-question MCP source-audit checklist; **Top-3 INSTALL-NOW for claude-sota-pure**: BMAD-METHOD/47k★ workflow-harness + claude-squad/7.5k★ parallel-TUI + install-order-discipline.md cite-class rule; **PHANTOM-REFERENCE catch n=1**: `fastmcp-me/mcp-ComputeGauge` does not exist on GitHub; **CONFLICT n=1**: `chopratejas/headroom` W221-E PHANTOM vs W222-G EXISTS 1758★ — Wave 224 Pattern D resolution mandatory. STAND-IN class — orchestrator MUST apply 2nd-stage harness-fit-validation (Probe 4-7) + TARGET-runtime probe on claude-sota-pure + Mia decomposition before Pattern A apply.
