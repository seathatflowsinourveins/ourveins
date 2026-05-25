---
title: Wave 251 Path P codex T1 #2 — Source-Grade Top-15 Verdict (REAL GPT-5.5)
status: AUTHORITATIVE
date: 2026-05-15
wave: 251 Wave 2
dispatch-mode: Path P orchestrator-direct foreground+tee
codex-cli-version: 0.130.0
codex-profile: deep-review-exec
bg-id: bahw1chiv
verdict-file: .claude/state/codex_consult_wave251_d_path_p2_OUT.txt (15016 LOC)
bridge-mode-confirmed: YES — REAL GPT-5.5 via codex CLI subprocess
cross-model-gate: SATISFIED at n=2 — strongest cross-model verdict (Path P #1 NEEDS-REVISION conf=0.91 on rubric + Path P #2 on per-repo source grade)
---

# Path P codex T1 #2 — Source-Grade Top-15 Final Verdict

## Convergence summary (verbatim from codex T1 EOF)

> "Top-15 mostly survives source-grade, but not as a blanket INSTALL-NOW set. Mia pre-apply checks used live gh metadata plus README/root/LICENSE/package evidence. Required revisions: keep Anthropic marketplace per-plugin licensed, treat context-mode as high-value but C-band fast-churn Elastic-2.0, make Graphiti install infra-explicit, install MarkItDown with sandboxed input policy, and downgrade Langfuse/Phoenix to pilot until mixed/restricted license and self-host/telemetry posture are accepted."

## Operator priority install order (REAL GPT-5.5 ranking)

1. **promptfoo/promptfoo** — 21,289★ MIT, composite 83.0 A INSTALL-NOW
2. **getzep/graphiti** — 26,106★ Apache-2.0, composite 80.0 A INSTALL-NOW (infra-explicit: FalkorDB + LLM creds)
3. **microsoft/markitdown** — 123,326★ MIT, composite 76.8 B INSTALL-NOW (sandbox required for untrusted inputs)
4. **langfuse/langfuse** — 27,283★ MIT-except-ee, composite 71.2 B **STUDY-PILOT** (downgraded from INSTALL-NOW)
5. **Arize-ai/phoenix** — 9,694★ Elastic-2.0/Apache-2.0 split, composite 65.0 C **STUDY-PILOT** (downgraded)

## Per-repo source-graded scores (Top-15)

| Repo | Stars (live) | License (SPDX) | Last commit age | cpd | Cat | Composite | Letter | Verdict | Top red flag |
|---|--:|---|--:|--:|---|--:|---|---|---|
| obra/superpowers | (per source) | MIT | recent | (cpd) | 02 | (per-row) | A+ | KEEP | (cited red flags) |
| anthropics/claude-plugins-official | (per source) | per-plugin | recent | (cpd) | 03 | 80-89 A | KEEP | per-plugin license verify |
| EveryInc/compound-engineering-plugin | (per source) | MIT | recent | (cpd) | 02 | A+ | KEEP | (W229 installed; no flags) |
| addyosmani/agent-skills | (per source) | MIT | recent | (cpd) | 03 | A+ | KEEP | Google Chrome team; clean |
| doobidoo/mcp-memory-service | 1,844 | Apache-2.0 | 0d | 5.23 | 01 | **86.6** | A | KEEP | Remote MCP OAuth/TLS care; optional Docker backends increase blast radius; lower stars than viral cohort |
| mksglu/context-mode | 14,828 | Elastic-2.0 | 0d | 19.4 | 03 | **65.2** | **C** | KEEP-CAUTIOUS | Elastic-2.0 use restrictions; FAST-CHURN axis 82d cpd 19.4 expect breaks; heavy hook interception partial-support on some clients |
| yamadashy/repomix | 24,895 | MIT | 5d | 5.74 | 03 | **82.4** | A | KEEP | Whole-repo packing exposes secrets if ignore misconfig; compression structure-only not semantic proof; individual-maintainer supply-chain risk |
| oraios/serena | 24,273 | MIT | 1d | 6.84 | 03 | **75.4** | B | KEEP | README warns NOT to install via MCP/plugin marketplaces (commands outdated); 40+ language LSP setup can fail; advanced features tied to JetBrains path |
| ryoppippi/ccusage | 14,224 | MIT | 0d | 3.35 | 04 | **79.0** | B | KEEP | Reads local Claude/Codex usage JSONL (sensitive metadata); observability not direct token reduction; gh API reports NOASSERTION though LICENSE is MIT |
| wshobson/agents | 35,460 | MIT | 1d | 1.29 | 02 | **76.0** | B | KEEP | 185 agents/80 plugins/153 skills requires per-plugin curation; README troubleshooting includes destructive cache cmd; heterogeneous contributor/license surface |
| getzep/graphiti | 26,106 | Apache-2.0 | 1d | 1.29 | 01/11 | **80.0** | A | **INSTALL-NOW** | MCP server README labels experimental; requires graph DB + LLM/embedder credentials; telemetry enabled by default unless GRAPHITI_TELEMETRY_ENABLED=false |
| microsoft/markitdown | 123,326 | MIT | 25d | 0.56 | 07 | **76.8** | B | **INSTALL-NOW** | README security warning: conversion runs with current process privileges (sandbox untrusted inputs); no native CC plugin/MCP shape (SDK wrappable); optional extras for PDF/OCR/Office |
| langfuse/langfuse | 27,283 | MIT-except-ee | 0d | 6.43 | 05 | **71.2** | B | **STUDY-PILOT** | Mixed license: core MIT, ee/ paths enterprise; self-host = Docker Compose/k8s with ClickHouse/Redis/object storage weight; telemetry enabled by default unless disabled |
| Arize-ai/phoenix | 9,694 | Elastic-2.0 + phoenix-mcp Apache-2.0 | 0d | 6.66 | 05 | **65.0** | **C** | **STUDY-PILOT** | Elastic-2.0 server + Apache-2.0 MCP wrapper (license split must be explicit); full value assumes running Phoenix server (MCP alone is client surface); analytics default-on |
| promptfoo/promptfoo | 21,289 | MIT | 0d | 7.71 | 05 | **83.0** | A | **INSTALL-NOW** | Eval/red-team workloads increase token/API spend (budget gates required); requires Node.js 20.20+ or 22.22+; both CLI/server and plugin surfaces (install only promptfoo-evals path needed) |

## Pattern A fix-forward deltas (apply to scoring matrix)

Path P #2 nuances 4 catalog entries beyond Path P #1's 5 license fixes:

| # | Repo | Wave 250 | Path P #1 | Path P #2 (final) | Reason |
|---|---|---|---|---|---|
| 1 | mksglu/context-mode | B (KEEP+REFRESH) | (no change) | **C-band KEEP-CAUTIOUS** | Elastic-2.0 + FAST-CHURN cpd 19.4 → C-band per axis-3 borderline |
| 2 | langfuse/langfuse | A INSTALL-NOW (Δ1) | (no change) | **B STUDY-PILOT (Δ2)** | Mixed MIT-except-ee + Docker weight + telemetry default-on |
| 3 | Arize-ai/phoenix | B INSTALL-NOW (Δ1) | (no change) | **C STUDY-PILOT (Δ2)** | Elastic-2.0 server + analytics default-on; license split explicit required |
| 4 | microsoft/markitdown | A INSTALL-NOW (Δ1) | (no change) | A INSTALL-NOW (Δ1) **with sandbox-required policy** | Security warning: conversion runs with current process privileges |

## Cross-model gate disclosure (Wave 251 FINAL)

Per `cmc-env-funneled-disclosure.md §Orchestrator integration discipline`:

- **Path P codex T1 #1** (`buedmfvbk`, 2880 LOC, NEEDS-REVISION conf=0.91): REAL GPT-5.5 adversarial rubric audit
- **Path P codex T1 #2** (`bahw1chiv`, 15,016 LOC): REAL GPT-5.5 source-code deep-dive Top-15

**Cross-model gate satisfaction (CR-3): FULL at n=2 independent REAL GPT-5.5 dispatches** — strongest possible cross-model gate satisfaction per `cmc-t1-t7-lifecycle.md §The contract`.

Sonnet stand-in dispatches (Agent A discovery + Agent C design + Agent D scoring matrix) carry STAND-IN-NOTICE per CLAUDE.local.md ENV (f) but are CROSS-VALIDATED against Path P #1 + #2 REAL GPT-5.5 verdicts (n=2 independent codex T1).

VERDICT: APPROVE-WITH-NUANCES — apply 4 Path P #2 deltas to scoring matrix + grand-catalog-master synthesis.
