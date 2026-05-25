---
title: Wave 235 — Outer Research Deep-Dive: SOTA Candidates NOT in W220-W234 Catalog
status: AUTHORITATIVE
date: 2026-05-15
wave: 235
agent: agentY (sota-researcher subagent — Sonnet stand-in per CLAUDE.local.md ENV (g))
predecessors: W220-W234 cumulative catalog
artifact-class: outer-research-deep-dive-residual-gap-audit
---

## §1 Files read inventory

| # | File | Bytes | Scope |
|---|---|---:|---|
| 1 | docs/outer research/README.md | 25.9K | FULL — adoption-status v3-v52 + Cohort-7 REJECT |
| 2 | docs/outer research/wave52/WAVE52-ITER1B-FINAL-REPORT.md | 3.6K | FULL |
| 3 | docs/outer research/wave52/iter2b-advanced-unadopted.md | 24.7K | FULL — 10 unadopted patterns |
| 4 | docs/outer research/wave52/iter1b-convergence-map.md | 6.2K | FULL |
| 5 | docs/outer research/kits/v65/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md | 7.0K | FULL |
| 6 | docs/outer research/kits/v65/.../WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md | 0.6K | FULL |
| 7 | docs/outer research/kits/v65/.../CLAUDE.md | 0.8K | FULL |
| 8 | tmp/wave229-OPERATOR-EXECUTION-CATALOG | 16.3K | FULL baseline |
| 9 | tmp/wave234-CLOSE-SYNTHESIS | 13.8K | partial cross-check |

Discovery breadth: 5 source families (GitHub API + Z:/repos/deps + Anthropic CC docs + installed plugin marketplace cache + prior synthesis trail) — ≥4 SATISFIED per `multi-source-discovery-breadth-discipline.md`.

## §2 Critical FM-20 Row 21 cross-runtime catch — iter2b 8/10 OVER-CLAIMS

iter2b authored 2026-05-07 against SIBLING `Z:/claude-sota/`. Direct grep on THIS runtime's `.claude/settings.json` REFUTED 8/10 claims:

| # | iter2b candidate | iter2b (sibling 2026-05-07) | THIS RUNTIME [VERIFIED 2026-05-15] |
|---|---|---|---|
| 1 | `outputStyle: Explanatory` | "deprecated but set" | ✅ ALREADY-REMOVED |
| 2 | `ANTHROPIC_SMALL_FAST_MODEL` | "missing" | ✅ ALREADY-INSTALLED settings.json:12-15 |
| 3 | `--system-prompt-file` launcher | "missing" | ❌ **GENUINE-GAP** |
| 4 | `session-report` plugin | "missing" | ✅ ALREADY-INSTALLED settings.json:532 |
| 5 | `claude-md-management` plugin | "missing" | ✅ ALREADY-INSTALLED settings.json:522 |
| 6 | `agent-sdk-dev` plugin | "missing" | ✅ ALREADY-INSTALLED settings.json:518 |
| 7 | `OTEL_LOG_USER_PROMPTS` | "missing" | ✅ ALREADY-INSTALLED settings.json:32 |
| 7b | `OTEL_LOG_RAW_API_BODIES` | "missing, PII risk" | ❌ **GENUINE-GAP** (PII deferred) |
| 8 | `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` | "missing" | ✅ ALREADY-INSTALLED settings.json:21 |
| 9 | `SESSIONEND_HOOKS_TIMEOUT_MS=60000` | "missing" | ✅ ALREADY-INSTALLED settings.json:22 |
| 10 | `--max-budget-usd` + `session_stores` | "missing" | ❌ **GENUINE-GAP** |

**Net**: 8/10 OVER-CLAIMS caught via FM-20 row 21 cross-runtime probe. 3 GENUINE-GAPs remain (#3, #7b, #10).

## §3 4 NEW Anthropic/OpenAI/GitHub OFFICIAL candidates from v65

| # | Repo | Stars | License | Created | Status |
|---|---|---:|---|---|---|
| Δ-N1 | `anthropics/claude-code-base-action` | 828 | MIT | 2025-05-19 | NEW — base for W228-P Δ13 claude-code-action |
| Δ-N2 | `anthropics/claude-code-security-review` | 4612 | MIT | 2025-08-04 | NEW — LLM-driven security review (orthogonal to Trivy/bandit) |
| Δ-N3 | `openai/skills` | 19,183 | **UNKNOWN ❓** | 2025-11-25 | NEW — cross-org skills cite. **Probe 6 LICENSE pending direct-blob read** |
| Δ-N4 | `github/gh-aw` | 4,481 | MIT | 2025-08-12 | NEW — GitHub-OFFICIAL Agentic Workflows for gh CLI |

## §4 Convergence-gate + 10-dim grade per NEW candidate

| Candidate | License | Maintainer | Axis 2 | Axis 3 | Probe DAG | Demand | Risk | Cite | **Grade** |
|---|---|---|---|---|---|---|---|---|---|
| Δ-N1 claude-code-base-action | MIT ✅ | Anthropic-OFFICIAL | PARTIAL | STRONG-PROV-EXPRESS | PASS | .b ELIGIBLE | LOW | TIER-1-DIRECT | **B+** |
| Δ-N2 claude-code-security-review | MIT ✅ | Anthropic-OFFICIAL | PARTIAL | STRONG-PROV-EXPRESS | PASS | .b 5-clause OK | LOW | TIER-1-DIRECT | **A-** |
| Δ-N3 openai/skills | **UNKNOWN ❓** | OpenAI-OFFICIAL | PARTIAL | STRONG-PROV-EXPRESS | Probe 6 PENDING | namespace-review | **MED** | TIER-1-DIRECT | **C+ HOLD** |
| Δ-N4 github/gh-aw | MIT ✅ | GitHub-OFFICIAL | PARTIAL | STRONG-PROV-EXPRESS | PASS | .b NEW-WORKFLOW | LOW | TIER-1-DIRECT | **A-** |
| iter2b #3 --system-prompt-file | N/A | Anthropic CHANGELOG | PARTIAL | PASS | PASS | .b DECOUPLE | LOW-MED | TIER-1-DIRECT | **B+** |
| iter2b #7b OTEL_LOG_RAW_API_BODIES | N/A | Anthropic CHANGELOG | PARTIAL | PASS | PASS | .b NARROW | MED (PII) | TIER-1-DIRECT | **B narrow** |
| iter2b #10 --max-budget-usd | N/A | Anthropic CHANGELOG | PARTIAL | PASS | PASS | .b COST-CAP | LOW | TIER-1-DIRECT | **A-** |

## §5 CR-12 6-class disposition

| Candidate | CR-12 disposition | Rationale |
|---|---|---|
| Δ-N1 claude-code-base-action | **PROVIDER-COMPLEMENT** | Base infra for W228-P Δ13 claude-code-action |
| Δ-N2 claude-code-security-review | **PARTIAL-OVERLAP** | LLM-driven security distinct from Trivy/bandit/gitleaks SAST/SCA |
| Δ-N3 openai/skills | **HOLD** pending Probe 6 | Potential PARTIAL-OVERLAP w/ anthropics/skills if permissive |
| Δ-N4 github/gh-aw | **GENUINELY-NEW** | gh-CLI-driven agentic workflows distinct from CC subagents |
| #3 --system-prompt-file | **PROVIDER-COMPLEMENT** | Decouples persona from CLAUDE.md ancestor-walkup |
| #7b OTEL_LOG_RAW_API_BODIES | **PROVIDER-COMPLEMENT** | Depth dial within existing Langfuse pipeline |
| #10 --max-budget-usd | **GENUINELY-NEW** | No incumbent cost-cap in tools/eee.ps1 |

## §6 Top-3 STUDY-PILOT.b (NO ADOPT-NOW survives Axis-2 strict gate)

**Probe DAG survival rate**: 4/7 pass Probe 4+5+6+7.b. NONE reach ADOPT-NOW strict because Axis-2 named-T2 endorsement is PARTIAL (named-org maintainership but no independent dated-artifact T2).

Top-3 **STUDY-PILOT.b** (not ADOPT-NOW; demand-gated trial):

1. **Δ-N4 `github/gh-aw`** — Grade A-, GENUINELY-NEW. `gh extension install github/gh-aw`
2. **iter2b #10 `--max-budget-usd`** — Grade A-, GENUINELY-NEW. Wire in tools/eee.ps1 + cron .ps1
3. **Δ-N2 `claude-code-security-review`** — Grade A-, PARTIAL-OVERLAP. Wire via `.github/workflows/security.yml`

**HONEST-NON-FINDING for ADOPT-NOW**: outer research adds **ZERO new ADOPT-NOW** beyond W229/W231/W234. Confirms README `n=23 consecutive 0% ADOPT-NOW Cohort-7 REJECT-FOR-PROVENANCE` saturation pattern at v52.

## §7 Phantom-cite ladder advance n=34 → n=35

| # | Wave | Catch | Sub-class |
|---|---|---|---|
| 35 | W235 | iter2b 8/10 "missing in sibling" REFUTED as ALREADY-INSTALLED via direct .claude/settings.json grep | FM-20 row 21 cross-runtime |

No new GitHub repo phantoms — all 4 OFFICIAL repos verified non-phantom. Caveat: openai/skills license UNKNOWN pending Probe 6 LICENSE direct-blob read.

## §8 Already-covered confirmations (no-double-research proof)

**42+ v65 BEST-OF-BEST repos cross-confirmed in W229/W231/W234**:

anthropics/claude-code | anthropics/skills | openai/codex + codex-plugin-cc | anthropics/claude-cookbooks | claude-agent-sdk-python+typescript | anthropics/claude-code-action | github/github-mcp-server | github/spec-kit | github/codeql-action | ryoppippi/ccusage | yamadashy/repomix | obra/superpowers | shanraisshan/claude-code-best-practice | affaan-m/everything-claude-code | forrestchang/andrej-karpathy-skills | humanlayer/humanlayer | bmad-code-org/BMAD-METHOD | mattpocock/skills | addyosmani/agent-skills | wshobson/agents | topoteretes/cognee | microsoft/playwright-mcp→cli | langfuse + mcp-server-langfuse | promptfoo/promptfoo | aquasecurity/trivy | gitleaks/gitleaks | trufflesecurity/trufflehog | astral-sh/ruff+uv | crate-ci/typos | agentclientprotocol/python-sdk+claude-agent-acp | ripgrep+fd+bat | jq+yq+gh | pre-commit+just+mise | markitdown+docling+crawl4ai | firecrawl | context7 | serena | langgraph+deepagents | smolagents+openai-agents-python+agno | aaif-goose/goose | getzep/graphiti+FalkorDB | doobidoo/mcp-memory-service | openai/evals | swe-bench+swe-agent.

Outer research adds 4 NEW + 3 GENUINE-GAP = **7 NEW STUDY-PILOT.b**, **ZERO new ADOPT-NOW**.

## §9 STAND-IN-NOTICE

This agent ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` Sonnet stand-in. Cross-model gate NOT structurally satisfied — orchestrator MUST file FM-09 2-stage validation if recommending ADOPT-NOW. The 4 STUDY-PILOT.b recommendations are NOT ADOPT-NOW; FM-09 2-stage validation REQUIRED before any operator install of Δ-N1/Δ-N2/Δ-N4 or iter2b #3/#10.

verdict_one_line: HONEST-NON-FINDING-ON-NEW-ADOPT-NOW: 0/7 NEW candidates promoted to ADOPT-NOW; 4 Anthropic/OpenAI/GitHub-OFFICIAL repos surfaced (claude-code-base-action B+ + claude-code-security-review A- + openai/skills C+ HOLD-pending-Probe-6 + github/gh-aw A-) + 3 iter2b GENUINE-GAPs (--system-prompt-file B+ + OTEL_LOG_RAW_API_BODIES B-narrow + --max-budget-usd A-) all STUDY-PILOT.b demand-gated; FM-20 row 21 cross-runtime catch: 8/10 iter2b "missing in sibling" claims REFUTED as ALREADY-INSTALLED (n=35 phantom-cite ladder advance); 42+ v65 BEST-OF-BEST repos confirmed already in W229/W231/W234 (no-double-research proven); outer research validates n=23 Cohort-7 saturation + adds zero new ADOPT-NOW.
