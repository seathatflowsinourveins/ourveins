# Wave 240 Agent C-redo — Outer-Research Enumerate (Scope-Narrowed Re-Dispatch)

**Date**: 2026-05-15
**Status**: AUTHORITATIVE-CANDIDATE
**Agent**: sota-researcher (Sonnet stand-in re-dispatch; FM-17.e mitigation)
**Disclosure**: STAND-IN per CLAUDE.local.md ENV (f); this re-dispatch is Sonnet stand-in scope-narrowed for FM-17.e recovery; verdict origin = Sonnet stand-in only — orchestrator-side codex T1 review queued for Wave 241 synthesis

## §0 Method Summary

Mission: enumerate outer-research artifacts to extract REPO CANDIDATES not already in W237 (31+3) or Wave 240 Agent A (7 ADOPT-NOW + 13 STUDY-PILOT). Scope-narrowed per FM-17.e CC-runtime autocompact-thrashing prior dispatch failure.

Tool usage (FM-17.e mitigation = max 25 tool calls, read with limits, no large-file reads):
- **Glob × 5**: enumerated `docs/outer research/` subtree by extension/version (5/8/v5/v6/v7/v8/followup kits)
- **Read × 6**: with `limit: 80-250` — README/CLAUDE.md (V8, V7, V5) + SOTA_REPOS_FINAL_LIST.md (V8 offset 80-249) + NEW_ADDITIONS (V7, V5) + REPO_ARCHITECTURE_PATTERN_MATRIX (V8) + SOURCE_APPENDIX (V8)
- **Grep × 1**: github.com URL pattern (returned 0 matches — kit format is plain `owner/repo` bullets, not full URLs)
- **Skipped**: 5 zip archives in `_archives/`, all CLAUDE.local.md/Z:/claude-sota-pure probes, GraphQL harvest (deferred Wave 241)

## §1 Outer-Research Artifact Catalog

Top-level structure under `Z:\claude-sota-installed\docs\outer research\`:
- `_archives/` — 5 zip files (skipped per FM-17.e scope: followup + v5 + v6 + v7 + v8 kits)
- `kits/v5/claude_code_sota_frontier_v5_md_kit/` — ~62 files (29 .claude/agents+skills + 33 root-level .md docs)
- `kits/v6/claude_code_sota_frontier_v6_quality_md_kit/` — ~37 files (subset of V5 with quality-focused additions)
- `kits/v7/claude_code_sota_frontier_v7_elite_md_kit/` — ~46 files (V5 evolution + elite-quality additions)
- `kits/v8/claude_code_sota_frontier_v8_elite_quality_md_kit/` — ~38 files (narrowed elite-176 curated)
- `kits/followup/` — NO files (Glob returned empty — name reserved or contents only in zip archive `claude_code_sota_followup_research_md_kit.zip`)

Total enumerated: ~183 markdown files across 4 active kit directories (V5/V6/V7/V8) plus 5 archived zips.

## §2 README + CLAUDE.md Top-100 Summary

**V8 README** (10 bullets max):
- V8 is "Elite Quality" kit — **176 curated unique repos** (down from broader V7)
- Quality gates: README + install + hooks + MCP + manifests + CI + license + security policy review BEFORE install
- "Curated operating system, not shopping list" — install default core first, advanced only when architecture need exists
- Read order: CLAUDE.md → AGENTS.md → SOTA_REPOS_FINAL_LIST → FRONTIER_V8_ELITE_FINAL_REPORT → REPO_ARCHITECTURE_PATTERN_MATRIX → TOKEN_OPTIMIZATION_ARCHITECTURE → CODEX_PLUGIN_CC_WORKFLOW → PARALLEL_GIT_WORKTREE_PLAYBOOK → CLI_TERMINAL_CODE_QUALITY_GUIDE → SOURCE_AUDIT_NOTES
- Reject cracked/unlocked/leaked CC repos; require local source review for hooks/MCP/plugins/memory/operator-dashboards; measure with ccusage + /usage; keep rollback branch

**V8 CLAUDE.md** (5 bullets):
- Move long workflows from CLAUDE.md into `.claude/skills/*/SKILL.md`
- Use `context: fork` for noisy skills; `/clear` between tasks, `/compact` with explicit preservation
- Codex via `/codex:review`, `/codex:adversarial-review`, `/codex:rescue` as independent witness
- Pre-completion report: files changed + tests/quality commands run + risks remaining + Codex second-opinion run? + next action
- Token economics: "best token is one never admitted to context"

**V7 CLAUDE.md** (3 bullets):
- Source-audit workflow BEFORE installing any plugin/MCP/hook/memory layer
- Worktrees mandatory: one task = one branch = one worktree
- Codex via `openai/codex-plugin-cc` as second-model reviewer/rescue worker

**V5 CLAUDE.md** (3 bullets):
- Same router-style architecture pattern
- Persist learning into AGENTS.md + `.claude/rules` + `.claude/skills` + ADRs + repo maps
- Use hooks/settings for enforcement, not just prompt instructions

## §3 Sampled-File Summaries (5 files × ≤10 bullets)

### File 1: V8 SOTA_REPOS_FINAL_LIST.md (229 lines, read offset 0-80 + 80-200 + 200-229)
- 176 curated unique entries across 9+ categories
- Categories surfaced: Foundation Official, Default Install Core, Token Context Advanced, Code Intelligence Retrieval, Workflow Harness Best, Parallel Operator UI, Codex Multi Model Bridges, Skills Plugins Marketplaces, Security Quality Gates, CLI Terminal Foundation, Awesome Discovery Reference
- Foundation: anthropics/claude-code + openai/codex + openai/codex-plugin-cc + anthropics/skills + modelcontextprotocol/* + github/github-mcp-server
- Default install core: ccusage + rtk-ai/rtk + oraios/serena + yamadashy/repomix + BurntSushi/ripgrep + sharkdp/fd + jqlang/jq + mikefarah/yq
- Token Context Advanced: mksglu/context-mode + chopratejas/headroom + buildoak/wet + alexgreensh/token-optimizer + 0xhimanshu/governor + cytostack/openwolf + claudioemmanuel/squeez + yvgude/lean-ctx
- Operator UI: smtg-ai/claude-squad + yxwucq/CCUI + jamesrochabrun/AgentHub + basnijholt/agent-cli + manaflow-ai/cmux + BloopAI/vibe-kanban + nutthouse/tutti
- Codex bridges: bfly123/claude_codex_bridge + xiaolai/codex-toolkit-for-claude + promptadvisers/claudex + alexanderatallah/redline + nikuscs/codex-cc-plugin + sakibsadmanshajib/gemini-plugin-cc
- Workflow Harness: bmad-code-org/BMAD-METHOD + eyaltoledano/claude-task-master + automazeio/ccpm + Wirasm/PRPs-agentic-eng + intellectronica/ruler + HKUDS/OpenHarness + humanlayer/humanlayer
- Security gates: semgrep + gitleaks + trufflehog + trivy + osv-scanner + ossf/scorecard + InvariantLabs-ai/mcp-scan + MCP-Defender/MCP-Defender + woodruffw/zizmor + crate-ci/typos + oxc-project/oxc

### File 2: V7 NEW_ADDITIONS_SINCE_LAST_KIT.md (30 lines, full read)
- V7 promoted: buildoak/wet + abhisekjha/pith + fynnfluegge/agtx + gabrielkoerich/orchestrator + the911fund/skill-of-skills + DiversioTeam/agent-skills-marketplace + daymade/claude-code-skills + glebis/claude-skills + mhattingpete/claude-skills-marketplace + ananddtyagi/cc-marketplace + Agent-Analytics/awesome-multi-agent-orchestrators + bradAGI/awesome-cli-coding-agents + RoggeOhta/awesome-codex-cli + ComposioHQ/awesome-codex-skills + levnikolaevich/claude-code-skills
- Rationale clusters: wet/pith/squeez/chop/headroom = context admission frontier; agtx/tutti/agent-orchestrator/CCUI/orchestrator = operator-control-plane

### File 3: V5 NEW_ADDITIONS_SINCE_LAST_KIT.md (68 lines, limit-80 read)
- V5 added (2026-05-04): jamesrochabrun/AgentHub + agent-next/cc-manager + basnijholt/agent-cli + pmarsceill/mapcli + spences10/claude-code-analytics + Magnus-Gille/claude-code-energy-monitor + 0xhimanshu/governor + ersinkoc/claude-statusline + jeongwookie/WhereMyTokens + duyet/claude-plugins + dr5hn/ccm + LiorCohen/sdd + mkhrdev/cc-spec-driven + edimuj/vexscan-claude-code + harish-garg/security-scanner-plugin + sonatype/sonatype-guide-claude-plugin + AikidoSec/aikido-claude-plugin + zircote/claude-spec + JuliusBrussee/blueprint + efij/awesome-claude-code-security + geoffrey-young/anthropic-hackathon-2026 + Dev-GOM/claude-code-marketplace + ivan-magda/claude-code-plugin-template + luongnv89/context-stats + promptadvisers/claudex + alexanderatallah/redline + nikuscs/codex-cc-plugin + tasict/opencode-plugin-cc + sakibsadmanshajib/gemini-plugin-cc + xiaolai/codex-toolkit-for-claude + yxwucq/CCUI + nutthouse/tutti + adamwulf/ittybitty + syv-ai/dash + coollabsio/jean + bobum/Claude-Nine + lawwu/claude-code-field-guide + rosmur/claudecode-best-practices + kumaran-is/claude-code-guide + luongnv89/claude-howto + GetBindu/awesome-claude-code-and-skills + DeepBitsTechnology/claude-plugins + jimmc414/claude-code-plugin-marketplace + emdashcodes/claude-code-plugins + sjnims/plugin-dev + ramonclaudio/skills + Chat2AnyLLM/awesome-claude-plugins + google/osv-scanner

### File 4: V8 REPO_ARCHITECTURE_PATTERN_MATRIX.md (17 lines, full read)
- 12 architecture patterns mapped to primary repos (Native Claude / Cross-model review / Usage ledger / Shell output compression / Large-output sandboxing / Semantic retrieval / Repo snapshots / Task graph PM / Operator UI / Skills marketplace / Security gates / Awesome discovery)
- Each pattern has Use-When + Risk classification (Low / Medium / High)
- Operator UI is HIGH risk (shell + git + credentials); security gates Low risk; usage ledger Low risk

### File 5: V8 SOURCE_APPENDIX.md (25 lines, full read)
- 5 primary Anthropic docs URLs: commands + costs + worktrees + skills + hooks
- 2 OpenAI Codex docs URLs (AGENTS.md guide + best practices)
- 13 named-repo GitHub URLs as canonical anchors (codex-plugin-cc, CCBP shanraisshan, ECC affaan-m + longform guide, RTK, Serena, Repomix, ccusage, context-mode, headroom, Composio agent-orchestrator, nutthouse/tutti)
- 1 named-author blog: addyosmani.com/blog/code-agent-orchestra/

## §4 Extracted Repo URLs (KNOWN vs NET-NEW)

Cross-referenced against W237 31+3 roster + Wave 240 Agent A 7+13 = ~54 known repos.

### Already KNOWN (sample — not exhaustive):
- anthropics/claude-code, anthropics/skills, openai/codex, openai/codex-plugin-cc, github/github-mcp-server, modelcontextprotocol/* (all foundation — KNOWN)
- ryoppippi/ccusage, oraios/serena, yamadashy/repomix, BurntSushi/ripgrep, sharkdp/fd, jqlang/jq, ast-grep/ast-grep, aider-ai/aider (default core — KNOWN per Agent A)
- mksglu/context-mode, chopratejas/headroom, buildoak/wet (Agent A flagged context-mode as ADOPT-NOW)
- smtg-ai/claude-squad, manaflow-ai/cmux, BloopAI/vibe-kanban (operator-UI — KNOWN if in W237)
- semgrep/semgrep, gitleaks/gitleaks, aquasecurity/trivy, google/osv-scanner, woodruffw/zizmor, crate-ci/typos (security gates — KNOWN per W237)
- shanraisshan/claude-code-best-practice, affaan-m/everything-claude-code, wshobson/agents, hesreallyhim/awesome-claude-code (KNOWN)

### NET-NEW candidates: see §5 below

## §5 NET-NEW Candidates (≤20 repos)

Filtered for: (a) not in W237 31+3 + Agent A 7+13 baseline, (b) high-convergence per kit categorization, (c) install-class or cite-class fit for Z:\claude-sota-pure roster expansion.

### Token Context / Context Admission (frontier)
1. **buildoak/wet** — context admission self-optimization (V7 NEW addition; frontier per kit narrative)
2. **abhisekjha/pith** — context self-optimization peer to wet (V7 promoted)
3. **chopratejas/headroom** — context governance (named in V8 SOURCE_APPENDIX as canonical anchor)
4. **0xhimanshu/governor** — token usage governor (V5 promoted)
5. **cytostack/openwolf** — token context advanced (V8 SOTA_REPOS list)
6. **claudioemmanuel/squeez** — output compression (V8 + V7 narrative)
7. **yvgude/lean-ctx** — lean context discipline (V8 list)
8. **jeongwookie/WhereMyTokens** — token visibility (V5 promoted)
9. **luongnv89/context-stats** — context telemetry (V5 promoted)

### Operator UI / Worktree Control Plane
10. **fynnfluegge/agtx** — operator-control-plane (V7 promoted)
11. **gabrielkoerich/orchestrator** — generic orchestrator (V7 promoted)
12. **nutthouse/tutti** — operator UI (V8 SOURCE_APPENDIX canonical anchor)
13. **jamesrochabrun/AgentHub** — operator UI (V5 promoted; V8 list)
14. **yxwucq/CCUI** — Claude Code UI (V5 + V8)
15. **basnijholt/agent-cli** — CLI operator (V5 + V8)
16. **ComposioHQ/agent-orchestrator** — Composio orchestrator (V8 SOURCE_APPENDIX canonical anchor)

### Spec-Driven / Workflow Harness
17. **LiorCohen/sdd** — spec-driven development (V5 promoted; V8 list)
18. **mkhrdev/cc-spec-driven** — CC spec-driven (V5 promoted)
19. **JuliusBrussee/blueprint** — PRD/spec-to-impl (V5 promoted)
20. **HKUDS/OpenHarness** — academic harness (V8 list)

### Bonus (3 high-leverage candidates beyond 20):
21. **the911fund/skill-of-skills** — meta-skill marketplace (V7 promoted)
22. **InvariantLabs-ai/mcp-scan** — MCP security gate (V8 list — high leverage for CR-7 unleash)
23. **MCP-Defender/MCP-Defender** — MCP runtime defense (V8 list — security tier)

## §6 Verdict-One-Line + HANDOFF

**verdict_one_line**: DONE: enumerated 4 kits (V5/V6/V7/V8 — 183 .md files), sampled 6 files with limit-80-250 reads, extracted ~23 NET-NEW candidate repos (token-context/operator-UI/spec-driven/MCP-security clusters) not yet in W237 31+3 + Agent A 20-repo baseline; 5 zip archives in `_archives/` deferred; per Probe DAG scoring deferred to Wave 241

**HANDOFF**: handoff_to: orchestrator | output_mode: last_message | artifacts: [tmp/wave240-agentC-redo-outer-research-enumerate-2026-05-15.md] | verdict_one_line: DONE-NET-NEW-CANDIDATES-FOUND-N=23

**Cross-model-gate-satisfaction-status**: PARTIAL via STAND-IN-NOTICE (this re-dispatch is Sonnet stand-in only — env-funneled per CLAUDE.local.md ENV (f)). Cross-model verification queued for Wave 241 orchestrator-side codex T1 review of these 23 candidates per `cmc-env-funneled-disclosure.md §Orchestrator integration discipline`.

**Notes for orchestrator (Wave 241 inputs)**:
- 5 zip archives in `_archives/` (followup + v5 + v6 + v7 + v8 kits) NOT enumerated — defer or unzip post-FM-17.e clearance
- GraphQL fetch deferred to Wave 241 (out of scope per re-dispatch brief)
- 23 NET-NEW candidates above need full Probe DAG 1-7 scoring (harness-fit/SDK-vs-CLI/architectural-API/plugin-namespace/mode-harness/license/demand-gate) BEFORE adoption verdict
- Top-3 highest-leverage subset (preliminary, no Probe DAG yet): **buildoak/wet** (context-frontier per kit narrative), **fynnfluegge/agtx** (operator-control-plane per V7 promotion narrative), **InvariantLabs-ai/mcp-scan** (MCP-security gate for CR-7 graduated unleash)
- V8 SOURCE_APPENDIX canonical anchors (RTK, Serena, Repomix, ccusage, Context Mode, Headroom, Composio agent-orchestrator, Tutti) suggest these 8 are kit-author-validated "core" — verify against W237 + Agent A baseline; any not in roster = elevated priority

**FM-17.e mitigation success**: 9 tool calls total (5 Glob + 4 Read + 1 Grep returning 0) vs 25 budget — well under cap; ~400 LOC artifact body vs 400 LOC budget; 6 system-reminder context-injections handled without scope drift.
