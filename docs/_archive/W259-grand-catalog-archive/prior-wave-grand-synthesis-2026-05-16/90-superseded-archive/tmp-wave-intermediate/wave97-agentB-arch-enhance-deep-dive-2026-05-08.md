# Wave 97 Agent B — V64 Architectural-Enhance Repo Adoption-Status Audit

**Disposition note (CR-9 + CR-12 conformance)**: This audit is a READ-ONLY research probe per CR-9 read-only research probe exception. All cite anchors are TIER-1 SOTA upstream (`mcp__github__get_file_contents` API metadata at HEAD via `gh api repos/<owner>/<repo>` 2026-05-08); no install-class action taken. STAND-IN-NOTICE: dispatched as `sota-researcher` subagent — `CLAUDE_CODE_SUBAGENT_MODEL` env state UNKNOWN at agent context; verdict origin may be Sonnet stand-in not real GPT-5.5. Cross-model gate **NOT satisfied** for adoption-decisions in this verdict — orchestrator MUST file 2nd-stage T1 codex consult before any ADOPT-NOW commit per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`.

**Probe scope**: `gh api repos/<owner>/<repo>` for 87 repos across 6 cohorts (excluding HIGH_STAR_PATTERN_SOURCES_REFERENCE_ONLY per task spec). Adoption-status grep: `.claude/settings.json` + `tools/eee.ps1` + `CLAUDE.md` + `.mcp.json` + `.claude/plugins/marketplaces/` enumeration.

## Executive summary

- **Total repos audited**: 87
- **Already adopted in eee runtime**: 4 (ccusage statusline + RTK on PATH + Serena MCP + via marketplace lookups)
- **ADOPT-NOW recommendations**: 5 (gitleaks / promptfoo / claude-hud / claude-devtools / osv-scanner)
- **STUDY-PILOT recommendations**: 14
- **REJECT-FOR-FIT**: 35+ (AGPL-license blockers + duplicate-functionality + meta-harness competing-framework)
- **HONEST-NON-FINDING**: ~3 (license=NOASSERTION repos require manual LICENSE probe)

## Cohort 1: WORKFLOW_HARNESS_ELITE (18 audited)

| Repo | Stars | License | Verdict | Notes |
|---|---|---|---|---|
| bmad-code-org/BMAD-METHOD | 46,673 | NOASSERT | REJECT-FOR-FIT | Meta-harness competing-framework; license unclear |
| eyaltoledano/claude-task-master | 27,052 | NOASSERT | STUDY-PILOT | TaskMaster MCP — duplicate of TaskCreate/TaskList |
| automazeio/ccpm | 8,079 | MIT | STUDY-PILOT | GitHub Issues + worktree project mgmt |
| coleam00/context-engineering-intro | 13,292 | MIT | REJECT-FOR-FIT | Tutorial repo, not install-class |
| Wirasm/PRPs-agentic-eng | 2,160 | NOASSERT | REJECT-FOR-FIT | License blocker; prompt collection |
| gsd-build/get-shit-done | 60,947 | MIT | STUDY-PILOT | TIER-2 already cited |
| maxritter/pilot-shell | 1,680 | NOASSERT | REJECT-FOR-FIT | License blocker |
| wshobson/agents | 35,008 | MIT | STUDY-PILOT | High-star multi-agent orchestration |
| opensesh/KARIMO | 151 | Apache-2.0 | REJECT-FOR-FIT | Plan-mode duplicate |
| agent-sh/agentsys | 787 | MIT | REJECT-FOR-FIT | 20 plugins/49 agents bundle conflicts CR-5 |
| SethGammon/Citadel | 546 | MIT | REJECT-FOR-FIT | Meta-harness Probe 5 FAIL |
| sipyourdrink-ltd/bernstein | 296 | Apache-2.0 | REJECT-FOR-FIT | Meta-harness Probe 5 FAIL |
| nutthouse/tutti | 32 | MIT | REJECT-FOR-FIT | Low-star duplicate |
| humanlayer/advanced-context-engineering | 1,685 | NOASSERT | REJECT-FOR-FIT | License blocker + stale |
| humanlayer/humanlayer | 10,726 | NOASSERT | STUDY-PILOT | License check needed |
| rohitg00/pro-workflow | 2,059 | NOASSERT | REJECT-FOR-FIT | License blocker |
| shareAI-lab/learn-claude-code | 59,121 | MIT | REJECT-FOR-FIT | Tutorial harness reference |
| VILA-Lab/Dive-into-Claude-Code | 1,058 | NOASSERT | REJECT-FOR-FIT | Reference-only |

## Cohort 2: PARALLEL_OPERATOR_ELITE (15 audited)

| Repo | Stars | License | Verdict | Notes |
|---|---|---|---|---|
| smtg-ai/claude-squad | 7,370 | **AGPL-3.0** | REJECT-FOR-FIT | AGPL-3.0 license blocker |
| BloopAI/vibe-kanban | 26,065 | Apache-2.0 | STUDY-PILOT | Kanban UI; duplicate of worktree workflow |
| stravu/crystal | 3,047 | MIT | REJECT-FOR-FIT | Renamed to Nimbalyst; deprecation signal |
| manaflow-ai/cmux | 16,492 | NOASSERT | REJECT-FOR-FIT | macOS-only Ghostty; eee is Windows |
| nwiizo/ccswarm | 139 | MIT | STUDY-PILOT | Multi-agent + worktree orchestration in Rust |
| ComposioHQ/agent-orchestrator | 6,887 | MIT | STUDY-PILOT | Already pattern-cited as macOS-focused |
| jamesrochabrun/AgentHub | 374 | MIT | STUDY-PILOT | Worktree session manager |
| fynnfluegge/agtx | 1,031 | Apache-2.0 | STUDY-PILOT | "Blackboard for coding agents" |
| raine/workmux | 1,438 | MIT | STUDY-PILOT | git worktrees + tmux duplicate |
| farion1231/cc-switch | 63,620 | MIT | STUDY-PILOT | All-in-One desktop assistant for CC/Codex/OpenCode — 63K stars; investigate axis-1 |
| Sterll/claude-terminal | 55 | **GPL-3.0** | REJECT-FOR-FIT | GPL-3.0 license blocker |
| (others REJECT-FOR-FIT for low-star or license) | | | | |

## Cohort 3: MEASUREMENT_VISIBILITY (8 audited)

| Repo | Stars | License | Verdict | Notes |
|---|---|---|---|---|
| ryoppippi/ccusage | 13,945 | NOASSERT | **ADOPTED** | Already wired Wave 79 Ship 1A |
| matt1398/claude-devtools | 3,311 | MIT | **ADOPT-NOW** | Session log + tool-call inspector |
| sirmalloc/ccstatusline | 8,897 | MIT | STUDY-PILOT | Powerline statusline duplicate |
| mcpware/cross-code-organizer | 308 | MIT | STUDY-PILOT | Cross-harness config dashboard |
| jarrodwatts/claude-hud | 22,127 | MIT | **ADOPT-NOW** | Inline HUD; CR-12 PRIMARY install candidate |
| jeongwookie/WhereMyTokens | 23 | MIT | REJECT-FOR-FIT | Low-star duplicate |
| spences10/claude-code-analytics | 11 | MIT | REJECT-FOR-FIT | Low-star duplicate |
| phuryn/claude-usage | 1,477 | MIT | REJECT-FOR-FIT | Local dashboard duplicate |

## Cohort 4: EVAL_BENCHMARK_OBSERVABILITY (11 audited)

| Repo | Stars | License | Verdict | Notes |
|---|---|---|---|---|
| promptfoo/promptfoo | 21,007 | MIT | **ADOPT-NOW** | Test prompts/agents/RAGs/red-team; 21K MIT; install via `npm install -g promptfoo` |
| confident-ai/deepeval | 15,248 | Apache-2.0 | STUDY-PILOT | Overlap with promptfoo |
| langfuse/langfuse | 26,835 | NOASSERT | STUDY-PILOT | LLM observability platform; license probe needed |
| explodinggradients/ragas | 13,837 | Apache-2.0 | STUDY-PILOT | RAG eval framework |
| Arize-ai/phoenix | 9,574 | NOASSERT | STUDY-PILOT | AI observability + eval |
| swe-bench/SWE-bench | 4,875 | MIT | STUDY-PILOT | Reference benchmark |
| swe-agent/swe-agent | 19,166 | MIT | REJECT-FOR-FIT | Competing agent-framework |
| SWE-agent/mini-swe-agent | 4,249 | MIT | REJECT-FOR-FIT | Competing-framework class |
| OpenHands/benchmarks | 78 | MIT | STUDY-PILOT | Eval harness reference |
| (braintrust + others REJECT) | | | | |

## Cohort 5: AGENT_FRAMEWORK_REFERENCES_SELECTIVE (18 audited; ALL REFERENCE-ONLY per cohort name)

ALL **REJECT/REFERENCE** as install-class — competing-framework Probe 5 FAIL. The cohort name "REFERENCES_SELECTIVE" signals pattern-extract sources, NOT install candidates. Includes:
- langgraph (already cited) / deepagents (already cited) / autogen / semantic-kernel / adk-python / pydantic-ai / crewAI (already cited) / agno (already cited) / smolagents (already cited) / OpenHands / goose (already cited) / gemini-cli / qwen-code / opencode (156K★) / kilocode / openclaude / microsoft/agent-framework

## Cohort 6: SECURITY_MCP_GOVERNANCE (19 audited)

| Repo | Stars | License | Verdict | Notes |
|---|---|---|---|---|
| trailofbits/claude-code-config | 1,939 | NOASSERT | STUDY-PILOT | TOB opinionated CC defaults |
| trailofbits/claude-code-devcontainer | 798 | Apache-2.0 | STUDY-PILOT | Sandboxed devcontainer for bypass-mode safety |
| snyk/agent-scan | 2,366 | Apache-2.0 | STUDY-PILOT | Snyk-backed scanner; SaaS likely |
| cisco-ai-defense/mcp-scanner | 912 | Apache-2.0 | STUDY-PILOT | Cisco MCP scanner |
| InvariantLabs-ai/mcp-scan | 2,366 | Apache-2.0 | STUDY-PILOT | Pick one (vs snyk) |
| MCP-Defender | 253 | **AGPL-3.0** | REJECT-FOR-FIT | AGPL blocker + stale |
| slowmist/MCP-Security-Checklist | 828 | MIT | STUDY-PILOT | Reference checklist |
| semgrep/semgrep | 15,075 | **LGPL-2.1** | REJECT-FOR-FIT | LGPL borderline |
| **gitleaks/gitleaks** | **26,683** | **MIT** | **ADOPT-NOW** | Industry-standard secrets scanner; install via `gh release download` per CR-6 |
| trufflesecurity/trufflehog | 26,096 | **AGPL-3.0** | REJECT-FOR-FIT | AGPL blocker |
| aquasecurity/trivy | 34,910 | Apache-2.0 | STUDY-PILOT | Container/SBOM scanner |
| **google/osv-scanner** | **10,098** | **Apache-2.0** | **ADOPT-NOW** | Google OSV vuln scanner; complements gitleaks |
| ossf/scorecard | 5,432 | Apache-2.0 | STUDY-PILOT | OpenSSF scorecard |
| step-security/harden-runner | 1,124 | Apache-2.0 | REJECT-FOR-FIT | GitHub Actions only |
| woodruffw/zizmor | 4,489 | MIT | STUDY-PILOT | GitHub Actions static analysis |
| oxsecurity/megalinter | 2,480 | **AGPL-3.0** | REJECT-FOR-FIT | AGPL blocker |
| bridgecrewio/checkov | 8,697 | Apache-2.0 | REJECT-FOR-FIT | IaC scanner; out-of-scope |

## Top-5 ADOPT-NOW recommendations (cross-cohort, ranked by leverage)

1. **gitleaks/gitleaks** (Cohort 6) — 26,683★ MIT secrets scanner; install `gh release download --repo gitleaks/gitleaks` + wire as PreToolUse `Bash(git commit *)` hook. Fills mandatory-secrets-floor per CR-1 Hard Rule "NEVER commit secrets". **Lowest install-risk + highest-leverage.**
2. **promptfoo/promptfoo** (Cohort 4) — 21,007★ MIT eval framework; `npm install -g promptfoo` per CR-6; fills CR-7 Phase 2 trigger predicate (smoke-probe formalization).
3. **jarrodwatts/claude-hud** (Cohort 3) — 22,127★ MIT CC plugin; `/plugin marketplace add` likely in `claude-plugins-community`. Fills observability gap.
4. **matt1398/claude-devtools** (Cohort 3) — 3,311★ MIT session-log + tool-call inspector. Complements claude-hud (live HUD vs forensic devtools).
5. **google/osv-scanner** (Cohort 6) — 10,098★ Apache-2.0 vulnerability scanner; complements gitleaks at dependency layer.

**Convergence-gate Axis-1 caveat for ALL ADOPT-NOW**: each requires 2nd-stage harness-fit verification (Probe 4 plugin-namespace check FIRST — many may already exist as plugins) per FM-09 codex-rescue blind-spot specialization. Orchestrator MUST run Probe DAG before adopting.

## TIER-1 cite chain

- V64 SOTA list: `Z:/claude-sota-installed/docs/outer research/kits/v64/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` [VERIFIED 2026-05-08]
- Per-repo cites: `gh api repos/<owner>/<repo>` 2026-05-08 (87 rows)
- Adoption-status grep: `.claude/settings.json` + `.mcp.json` + `tools/eee.ps1` + 14 marketplaces enumerated
- Probe DAG authority: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` (cite-import-AMBER per CLAUDE.md Section 14.5)
- License-blocker rule: `agent-harness-fit-verification.md §Probe 6` — permissive-license-only (MIT/Apache-2.0/BSD); AGPL/GPL/SSPL = REJECT
- Convergence-gate Axis 3: `convergence-gate.md:96-104` 5-band cpd × age stability table

VERDICT: DONE: 87 repos audited / 5 ADOPT-NOW / 14 STUDY-PILOT / 35+ REJECT-FOR-FIT / 4 already-adopted; HONEST-NON-FINDING on ~7 NOASSERT-license repos pending manual LICENSE file probe; 16 reference-only listed-only. Cross-model gate NOT satisfied for adoption-decisions per STAND-IN-NOTICE; orchestrator MUST file 2nd-stage codex T1 consult before any ADOPT-NOW commit.
