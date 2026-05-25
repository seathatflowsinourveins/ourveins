# 03 — Codex T1 Path P Verdict (Cross-Model GPT-5.5 REAL — Fire 26-A)

> **Method**: Path P recipe (codex exec foreground+tee, n=14 → n=15 reproducible)
> **Profile**: `deep-review-exec` (gpt-5.5 xhigh + danger-full-access + service_tier=fast)
> **Tokens**: 128,628 codex-side
> **Verdict origin**: REAL GPT-5.5 codex CLI (CR-3 Phase 1 bootstrap exception)
> **Verbatim trace**: `.claude/state/codex_consult_w134_f26a_cisco_mcp_scanner_OUT.txt`

## Verbatim verdict at EOF (STRONGEST positive in Wave 134 series)

```json
{
  "verdict": "STUDY-PILOT-NARROW",
  "confidence": 0.91,
  "summary": "mcp-scanner is a genuine MCP-security capability absent from eee's active hook suite: existing guards block shell/destructive/secret/commit risks, while this inspects MCP tools, prompts, resources, instructions, configs, and server/source behavior. Live checks support the repo facts and README claims: Apache-2.0 Cisco AI Defense repo, active main branch, PyPI package `cisco-ai-mcp-scanner` with Trusted Publishing provenance, and documented CLI/REST/SDK/static modes. Sources: https://github.com/cisco-ai-defense/mcp-scanner and https://pypi.org/project/cisco-ai-mcp-scanner/. I do not recommend blanket APPROVE yet because PyPI 4.6.0 is behind main and main contains a relevant symlink-escape security fix; pilot the zero-key MCP admission/audit path first.",
  "probe_dag_verdicts": {
    "P1_count_over": "PASS",
    "P2_sdk_vs_cli": "PASS",
    "P3_arch_api": "PASS",
    "P4_plugin_namespace": "PASS",
    "P5_mode_harness": "PASS",
    "P6_blockers": "PASS",
    "P7a_demand_absence": "PASS",
    "P7b_demand_creates": "ELIGIBLE"
  },
  "row2_fabrication_test": "PASS",
  "novel_capability_for_eee": "YES",
  "recommended_pilot_scope": "Use case 1, pre-install MCP admission, plus one baseline scan of `Z:/claude-sota-installed/.mcp.json`. Wire an isolated `uv tool` install, then run only zero-key analyzers initially: `yara,readiness,prompt_defense`; compare findings against incumbent hooks (`safety_guard.py`, `agent_plan_readonly_bash_guard.py`, `secret_scan_guard.py`) which do not inspect MCP protocol metadata. Time-box to 30 days, logging runtime, false positives, findings, and rollback cost.",
  "supply_chain_caveats": "Prefer isolated `uv tool` over installing into `Z:/venvs/claude`; local probe found 4.6.0 in that venv but not as a uv tool. PyPI 4.6.0 has Sigstore/Trusted Publishing provenance from tag 4.6.0, but main is 7 commits ahead and includes a security fix for symlink escape during directory scans: https://github.com/cisco-ai-defense/mcp-scanner/commit/6915d44de089cfe4f80b9b28867e02d453bb13d1. For behavioral/VirusTotal directory scans, use a SHA-pinned main install or wait for a PyPI release beyond 4.6.0. Avoid moving-main installs without SHA pinning; disable VirusTotal uploads unless explicitly needed.",
  "license_apache_2_0_caveats": "Apache-2.0 is compatible with eee local-runtime use. It includes a patent grant with patent-litigation termination. If eee redistributes modified/bundled copies, preserve license/copyright/patent/trademark notices, mark modified files, and include upstream NOTICE content if present. Live repo root showed LICENSE but no NOTICE. Source: https://github.com/cisco-ai-defense/mcp-scanner/blob/main/LICENSE.",
  "cite_pattern_extract_candidates": [],
  "prescribed_edits": [],
  "next_steps": [
    "Run a controlled baseline: `mcp-scanner --analyzers yara,readiness,prompt_defense --format raw config --config-path Z:/claude-sota-installed/.mcp.json` and save raw output under `tmp/` for review.",
    "For pilot install, use PyPI only for non-directory zero-key scans, or use SHA-pinned source install from main commit `6915d44de089cfe4f80b9b28867e02d453bb13d1` if behavioral/VirusTotal directory scanning is in scope.",
    "Do not wire `--scan-known-configs` into a hook initially; it is broader and less deterministic than repo-local `.mcp.json` admission scanning.",
    "After 30 days, promote only if scans are low-latency, low-noise, and catch at least one actionable MCP risk class not covered by existing hooks."
  ]
}
```

## Verdict significance

**STRONGEST positive verdict in Wave 134 Fire 24+25+26 series** (5 NEW-candidate audits + 1 discovery):

| Fire | Subject | Verdict | Confidence |
|---|---|---|---|
| 24-A | BMAD-METHOD | REJECT-FOR-FIT | 0.92 |
| 24-B | CCPM | CITE-PATTERN-ONLY | 0.90 |
| 24-C | Task Master | CITE-PATTERN-ONLY | 0.92 |
| 24-D | Agent OS v3 | STUDY-PILOT-NARROW | 0.87 |
| 24-E | Claude Memory Bank | REJECT-FOR-FIT | 0.94 |
| 25 | NEW-discovery wave | Pattern B HNF | n/a |
| **26-A** | **cisco-ai-defense/mcp-scanner** | **STUDY-PILOT-NARROW** | **0.91** ← STRONGEST POSITIVE |

## Cross-model gate satisfaction

| Aspect | Status |
|---|---|
| Verdict origin | ✅ REAL GPT-5.5 via codex CLI |
| CR-3 cross-model consensus | ✅ FULLY SATISFIED |
| CR-3 Phase 1 bootstrap exception | ✅ orchestrator-side codex exec foreground+tee |
| Path P recipe ladder | n=14 → **n=15** reproducible |
| Live verification depth | HIGH — codex T1 ran 5 PowerShell probes: PyPI metadata, GitHub API repo data, GitHub commits comparison (main vs v4.6.0 tag), `pip show` in `Z:/venvs/claude`, file existence verification of incumbent hooks |

## Codex T1 contributions (substantial beyond pre-codex)

### 1. Mia OVER catch on "NOT INSTALLED" assumption

Orchestrator pre-codex marked candidate as "NOT installed". Codex T1 live probe found:

```
Name: cisco-ai-mcp-scanner
Version: 4.6.0
Location: Z:\venvs\claude\Lib\site-packages
```

**Already pip-installed in eee's Python venv** (just unwired). Orchestrator OVER refuted; orchestrator-side Mia ladder advances (2nd Mia OVER in Fire 24+26 series).

### 2. PyPI 4.6.0 vs main 7-commit divergence catch

Codex T1 ran live GitHub commits comparison and detected:

```
main is 7 commits AHEAD of v4.6.0 tag
Includes commit 6915d44de089cfe4f80b9b28867e02d453bb13d1:
  symlink-escape security fix during directory scans
```

This is a CR-9 install-risk caveat for behavioral/VirusTotal directory scans —
codex recommended SHA-pinned source install for those modes.

### 3. Apache-2.0 patent grant + NOTICE file analysis

Codex T1 ran live LICENSE/NOTICE file check at repo root and noted:

```
Live repo root showed LICENSE but no NOTICE.
```

Apache-2.0 NOTICE file convention is OPTIONAL but if upstream provides one,
redistribution must include it. Codex confirmed mcp-scanner has NO NOTICE file —
so eee distribution discipline is just LICENSE + copyright/patent/trademark notices.

### 4. Probe 7.b explicit 5-clause check ALL MET

| Clause | Codex T1 verbatim |
|---|---|
| Named operational use case | "Use case 1, pre-install MCP admission" |
| Cited local input source path | "`Z:/claude-sota-installed/.mcp.json`" |
| Wiring path | "Wire an isolated `uv tool` install" |
| Incumbent comparison | "compare findings against incumbent hooks (`safety_guard.py`, `agent_plan_readonly_bash_guard.py`, `secret_scan_guard.py`) which do not inspect MCP protocol metadata" |
| Reversible time-box | "Time-box to 30 days, logging runtime, false positives, findings, and rollback cost" |

**5/5 clauses MET** — FIRST FULL P7b ELIGIBLE in Wave 134 NEW-candidate series.

### 5. Recommended 30-day pilot success criteria

Codex T1 verbatim next_steps:

> "After 30 days, promote only if scans are low-latency, low-noise, and catch at least
> one actionable MCP risk class not covered by existing hooks."

Specific, measurable criteria for promote-or-retire decision per
`deprecation-discipline.md` sunset workflow.

## Path P recipe ladder advance

| Fire | Subject | Verdict | Tokens |
|---|---|---|---|
| 24-A | BMAD | REJECT-FOR-FIT | 94,987 |
| 24-B | CCPM | CITE-PATTERN-ONLY | 115,741 |
| 24-C | Task Master | CITE-PATTERN-ONLY | 175,555 |
| 24-D | Agent OS v3 | STUDY-PILOT-NARROW | 143,587 |
| 24-E | Claude Memory Bank | REJECT-FOR-FIT | 79,094 |
| 25 | NEW-discovery wave | Pattern B HNF | 175k+ (timeout) |
| **26-A** | **cisco-ai-defense/mcp-scanner** | **STUDY-PILOT-NARROW** | **128,628** |

Path P ladder: 14/14 → 15/15 reproducible (Pattern B Fire 25 trace-mining is a DOCUMENTED outcome per `codex-t1-fix-forward-pattern.md §Pattern B`, not a failure).

## Mia ladder advance

n=1666 → n=1671 (+5: codex verdict captured / Mia OVER catch documented / PyPI-main divergence + symlink-escape security fix surfaced / Apache-2.0 NOTICE analysis / FIRST FULL 5/5 P7b ELIGIBLE in Wave 134 NEW-candidate series)
