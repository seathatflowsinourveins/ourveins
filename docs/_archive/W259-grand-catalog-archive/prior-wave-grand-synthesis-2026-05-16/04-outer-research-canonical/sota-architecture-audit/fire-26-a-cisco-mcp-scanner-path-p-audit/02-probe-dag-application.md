# 02 — Probe DAG 1-7 Application to cisco-ai-defense/mcp-scanner

> **Cite anchor**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
> **Cross-model gate**: Path P codex T1 verdict STUDY-PILOT-NARROW conf=0.91 (8/8 PASS-direction — STRONGEST positive in series)

## Probe DAG verdicts (8/8 PASS-direction — STRONGEST in Wave 134)

### Probe 1 — count-OVER

| Evidence | Verdict |
|---|---|
| README claims 3 engines + 8 analyzers + 11 subcommands + 10+ languages + 12 attack vectors | PASS — all verifiable, no fabrication |
| codex T1 verified live via GitHub + PyPI | Row-2 PASS |

**Codex T1**: P1 = PASS ✅ (with row2_fabrication_test=PASS)

### Probe 2 — SDK-vs-CLI surface

| Evidence | Verdict |
|---|---|
| CLI tool: `mcp-scanner` + `mcp-scanner-api` | PASS |
| Python SDK: `from mcpscanner import Config, Scanner` | PASS |
| REST API server mode | PASS |
| Static offline mode (CI/CD) | PASS |

**Codex T1**: P2 = PASS ✅

### Probe 3 — architectural-API

| Evidence | Verdict |
|---|---|
| LLM backend: LiteLLM-based — multi-provider (Anthropic/OpenAI/Bedrock/local) | PASS |
| Vendor-neutral by design | PASS |
| No proprietary Anthropic-API or OpenAI-API lock-in | PASS |

**Codex T1**: P3 = PASS ✅

### Probe 4 — plugin-namespace

| Evidence | Verdict |
|---|---|
| `cisco-ai-mcp-scanner` PyPI package — unique namespace | PASS |
| `mcp-scanner` CLI command — no collision with eee primitives | PASS |
| Module name `mcpscanner` — no collision | PASS |
| Already pip-installed in `Z:/venvs/claude` — no namespace conflict surfaced | PASS |

**Codex T1**: P4 = PASS ✅ — no DUPLICATE-functionality with eee's 26 Python hooks
(those guard shell/destructive/secret/commit risks; mcp-scanner inspects MCP tools/prompts/
resources/instructions/configs/server-source — DIFFERENT scope)

### Probe 5 — mode-harness-shape

| Evidence | Verdict |
|---|---|
| Multiple modes (CLI / REST / SDK / static offline) — autonomous-compatible | PASS |
| Static mode designed for CI/CD pipelines + air-gapped environments | PASS |
| No HARD-GATE interactive user-presence required | PASS |
| No PM-loop / feature-shipping workflow assumption | PASS |

**Codex T1**: P5 = PASS ✅

### Probe 6 — direct-file/registry blockers

| Evidence | Verdict |
|---|---|
| LICENSE = Apache-2.0 PURE | PASS |
| Cisco TIER-1-OFFICIAL named-org maintainer | PASS |
| Active last push 2026-05-08 (~2 days ago) | PASS |
| PyPI canonical package with Trusted Publishing | PASS |
| **CAVEAT**: PyPI 4.6.0 lags main by 7 commits (includes symlink-escape security fix) | PASS-with-caveat |
| Active Discord community | PASS |
| Multi-kit convergence v40+v53+v54+v55+v61 (5 kits) | PASS-with-STRONGEST-endorsement |

**Codex T1**: P6 = PASS ✅ (with supply-chain caveat: prefer SHA-pinned install for behavioral/VirusTotal)

### Probe 7.a — demand-absence

| Evidence | Verdict |
|---|---|
| eee has 23 MCP servers in `.mcp.json` | DEMAND-PRESENT |
| Currently ZERO security scanning of MCP server tool definitions | DEMAND-PRESENT |
| Existing 26 Python hooks guard shell/destructive/secret/commit BUT NOT MCP protocol metadata | DEMAND-PRESENT |
| safety_guard.py + agent_plan_readonly_bash_guard.py are NARROW catastrophic-pattern blockers | DEMAND-PRESENT |
| Fire 23 P0 "21-plugin token-budget" UNVERIFIED caveat — related demand for MCP-surface auditing | DEMAND-PRESENT |

**Codex T1**: P7a = PASS ✅ — verbatim "eee has 23 MCP servers + NO security scanning = demand PRESENT"

### Probe 7.b — demand-creates-new-workflow ELIGIBILITY

| Clause | Status |
|---|---|
| (1) Named operational use case | ✅ MET — Pre-install MCP admission scan + periodic audit + CI/CD gate + pre-commit hook |
| (2) Cited local input source path | ✅ MET — `Z:/claude-sota-installed/.mcp.json` + 23 MCP server stdio commands |
| (3) Wiring path | ✅ MET — `uv tool install` + integrate into existing 26-Python hooks suite OR run as periodic audit script |
| (4) Incumbent comparison | ✅ MET — 26 Python hooks guard different scope (shell/secret/destructive); MCP-protocol scanning is GENUINELY NEW |
| (5) Reversible time-box | ✅ MET — codex T1 prescribed 30-day pilot with explicit success criteria: low-latency, low-noise, ≥1 actionable MCP risk class catch |

**Codex T1**: P7b = ELIGIBLE ✅ (FIRST FULL 5/5 5-clause PASS in entire Wave 134 series)

## Aggregate Probe DAG verdict (8/8 PASS-direction)

| Probe | Verdict |
|---|---|
| P1 count-OVER | PASS |
| P2 SDK-vs-CLI | PASS |
| P3 arch-API | PASS |
| P4 plugin-namespace | PASS |
| P5 mode-harness | PASS |
| P6 blockers | PASS (with supply-chain SHA-pin caveat) |
| P7a demand-absence | PASS (demand PRESENT) |
| P7b demand-creates | ELIGIBLE (5/5 clauses MET) |

**Score: 8 PASS + 0 FAIL** — STRONGEST Probe DAG in entire Wave 134 NEW-candidate audit series.

## Verdict shape: STUDY-PILOT-NARROW @ conf=0.91 (cleanest positive)

Despite 8/8 PASS, codex T1 returned STUDY-PILOT-NARROW (not full APPROVE) because:

1. **PyPI 4.6.0 lags main 7 commits** — includes symlink-escape security fix; prefer SHA-pinned install if behavioral/VirusTotal scope active
2. **Pilot-then-promote discipline** — measure for 30 days before full APPROVE
3. **Apache-2.0 NOTICE caveat** — preserve patent grant + license notices per redistribution policy

## Orchestrator-codex probe convergence: 8/8 PERFECT + 1 codex-precision (Mia OVER catch)

| Probe | Orchestrator | Codex T1 | Convergence |
|---|---|---|---|
| P1 | PASS | PASS | CONVERGENT |
| P2 | PASS | PASS | CONVERGENT |
| P3 | PASS | PASS | CONVERGENT |
| P4 | PASS | PASS | CONVERGENT |
| P5 | PASS | PASS | CONVERGENT |
| P6 | PASS | PASS | CONVERGENT |
| P7a | PASS | PASS | CONVERGENT |
| P7b | ELIGIBLE | ELIGIBLE | CONVERGENT |

**+1 codex precision (Mia OVER catch)**: orchestrator pre-codex marked candidate as "NOT installed"; codex T1 live probe confirmed `cisco-ai-mcp-scanner v4.6.0` ALREADY pip-installed in `Z:/venvs/claude`. Orchestrator OVER refuted by codex live verification.

**Orchestrator-side Mia ladder advance**: this is the 2nd Mia OVER pre-codex caught by codex T1 in Wave 134 Fire 24+26 series (1st was Fire 24-D Agent OS hard-coded path P4 nuance).

## Verdict shape distribution (Wave 134 Fire 24+25+26 series)

| Verdict | Count | Subjects | Confidence |
|---|---|---|---|
| REJECT-FOR-FIT | 2 | BMAD + Claude Memory Bank | 0.92, 0.94 |
| CITE-PATTERN-ONLY | 2 | CCPM + Task Master | 0.90, 0.92 |
| STUDY-PILOT-NARROW | **2** | **Agent OS v3 + Cisco mcp-scanner** | 0.87, **0.91** |
| Pattern B HNF | 1 | Fire 25 discovery wave | n/a (trace-mined) |
| APPROVE | 0 | — | — |

cisco-ai-defense/mcp-scanner is the **2nd STUDY-PILOT-NARROW candidate** + **HIGHEST confidence among positive verdicts** (0.91 vs Agent OS v3's 0.87).

## Mia ladder advance

n=1660 → n=1666 (+6: Probe DAG 8/8 PASS-direction / FIRST FULL P7b 5/5 ELIGIBLE / codex Mia OVER catch (already-installed) / cohort tracking 2nd STUDY-PILOT-NARROW / verdict shape distribution update / Wave 134 NEW-candidate audit ranking)
