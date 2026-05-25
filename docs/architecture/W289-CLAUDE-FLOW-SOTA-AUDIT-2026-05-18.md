# W289 — `ruvnet/claude-flow` (aka `ruflo`) — Full v3 SOTA Audit

> **Verdict: T4 CITE-ONLY** · `install_score = 2.596 / 5.0` · `pattern_score = 2.718 / 5.0` · Rubric: **sca-v3** · Decided 2026-05-18 · Decided by sota-convergence-audit v3.
> Supersedes the W288 deepwiki-only harness-fit=5/5 score; full 14-dim rubric flips the verdict.

## §1 Source families (≥4 distinct — STOP gate passed)

| # | Family · Tool | Key findings |
|---|---|---|
| 1 | DeepWiki · `ask_question` ×6 | 119 V3 MCP tools, daemon-worker arch, 4-tier memory, SONA, `.claude/helpers/*.cjs` self-invented hooks, no uninstall |
| 2 | GitHub commits + releases | repo rebranded `claude-flow`→`ruflo`; 10 commits 2026-05-15→16; alpha.27→alpha.44 in 14 days; solo author `ruv@ruv.net`=`Reuven cohen@ruv-mac-mini.local` |
| 3 | GitHub `get_file_contents` ×5 | LICENSE=MIT, `package.json:1` v3.7.0-alpha.44 with 20+ `overrides{}`, SECURITY.md, `.claude/settings.json` 8 hook stages, `.claude-plugin/marketplace.json` 32 plugins |
| 4 | Context7 · resolve-library-id | `/ruvnet/claude-code-flow` (bench 11.5 / 4303 snippets) — author-canonical only |

**HONEST-NON-FINDING**: `mcp__repomix__pack_remote_repository` returned 0 files for both repo names; v3 monorepo layout did not match include patterns. Mitigated by Family-3.

## §2 14-dim rubric scoring (anchor citations)

| Dim | Score | Wi_install | Wi_pattern | Anchor |
|---|---|---|---|---|
| D1 license_compatibility | **5** | 1.5 | — | `LICENSE` SHA `5c4718198` — MIT permissive |
| D2 capability_uniqueness | **3** | 0.9 | 1.4 | Federation/SONA/swarm-consensus novel; agent-teams + memory + /loop already installed (overlap ~60%) |
| D3 harness_fit | **2** | 1.3 | — | `.claude/settings.json:60-90` routes 8 hook stages to self-invented `node .claude/helpers/hook-handler.cjs` — violates this runtime's cardinal-rule-2 ("hooks = upstream plugin hooks OR direct CLI"). Windows-portable via `process.platform==='win32'` shim; but `init` overwrites host `CLAUDE.md` |
| D4 claude_code_runtime_pathway_support | **5** | 1.3 | — | All 5 CC surfaces: plugin (`.claude-plugin/plugin.json:1`), skills, agents (`.claude/agents`), hooks (`settings.json:hooks{}`), MCP (`mcpServers.claude-flow`) |
| D5 typed_evidence_diversity | **2** | 1.0 | 1.0 | benchmark + code-reading present but all author-authored; **ZERO independent practitioner field reports** (DeepWiki: "no third-party org [...] other than RuvNet"). 2-of-3 typed → score 2; **hard-cap fires** |
| D6 authority_weight | **2** | 0.9 | 0.8 | Bayesian: α_anthropic=0, β_known_partner=0 (no prior ADOPT ledger entry for ruvnet), γ_long_running_repo=+1 (2024-2026 activity), δ=0 → prior `+1`; D6=2 |
| D7 maintenance_velocity_balanced | **2** | 1.0 | — | EXTREME churn: alpha.27→alpha.44 in 14 days (17 versions); 8+ commits on 2026-05-16; solo bus-factor; contract-regressions monthly (#1825/#1880/#1944/#2015/#2019/#2021/#2022). Rubric §201 anchor: "high churn solo-maintained ≠ 5" |
| D8 benchmark_deltas | **2** | 1.0 | 0.9 | All numbers (84.8% SWE-Bench, 2.8-4.4× speed, 67% memory, 98.7% token reduction) author-claimed; no W287 P1a measured signal; no third-party SWE-Bench reproduction; capped at 2 per anti-pattern "No-eval-harness for benchmarkable surface" |
| D9 failure_mode_disclosure | **3** | 0.7 | 0.8 | `SECURITY.md` (good policy, 48h ack/30d fix), CVE registry, AIDefence module; no RUNBOOK.md; ADR-060 references known remaining bugs |
| D10 duplication_against_installed | **2** | 1.1 | — | massive overlap: `ruflo-swarm`≈`agent-teams`+`superpowers:dispatching-parallel-agents`; 4-tier memory≈our 6-tier; `ruflo-autopilot`≈`everything-claude-code:loop-start`+`autonomous-loops`; 32 plugins overlap our 62. Federation/SONA/consensus = marginal lift → **D10=2 BOUNDARY does NOT auto-REJECT** per §3.5 |
| D11 context_budget_cost | **1** | 0.8 | — | `.claude/settings.json:3` comment: "367 SKILL.md files [...] bumping to 6%" — catastrophic preload; 119 MCP tools; overwrites host CLAUDE.md |
| D12 community_signal_distribution | **4** | — | 0.7 | npm dm/ badges, GitHub stars, Agentics Foundation Discord, hosted UIs flo.ruv.io + goal.ruv.io, ruFlo Summit Budapest 2026-06 → 4+ channels |
| D13 pattern_extractability | **3** | — | 1.5 | `@claude-flow/memory|security|embeddings` ship standalone-use recipes (commit `ca0a6fa5c`); federation in ADR-111. Monorepo deeply coupled to RuVector/AgentDB native bins; `@ruvector/sona@0.1.6` empty-publish (#2022) blocks neural lift |
| D14 reversible_pilotability | **1** | 1.1 | — | NO `ruflo uninstall`; `init` writes `.claude/`, `.claude-flow/{data,logs,sessions,hooks}`, `~/.claude/statusline-command.sh`, `memory/`, `coordination/`, `.roomodes`, `.roo/`, overwrites `CLAUDE.md`, injects 3 MCP servers globally. **Hard-cap fires** |
| D15 supply_chain_safety | **2** | 1.0 | — | `package.json:overrides{}` 20+ pins fighting upstream (hono/undici/tar/picomatch/protobufjs/uuid); `@ruvector/sona@0.1.6` empty-publish broke installs (#2022); `agentic-flow` 403s on hardened registries (#1949); no OpenSSF Scorecard, no SBOM, signed releases "planned" |

## §3 Composite arithmetic

```
install_score = Σ (Di × Wi_install) / 13.6
              = (5×1.5 + 3×0.9 + 2×1.3 + 5×1.3 + 2×1.0 + 2×0.9 + 2×1.0 + 2×1.0
                + 3×0.7 + 2×1.1 + 1×0.8 + 1×1.1 + 2×1.0) / 13.6
              = 35.30 / 13.6
              = 2.596
pattern_score = Σ (Di × Wi_pattern) / 7.1
              = (3×1.4 + 2×1.0 + 2×0.8 + 2×0.9 + 3×0.8 + 4×0.7 + 3×1.5) / 7.1
              = 19.30 / 7.1
              = 2.718
```

## §4 Hard-cap check (per rubric §1.1)

| Cap | Trigger | Result |
|---|---|---|
| D1<3 license | score=5 | not breached |
| D3<2 harness_fit | score=2 (BOUNDARY) | not breached |
| D5<4 typed_evidence | score=2 | **BREACHED → INSTALL blocked** |
| D7<2 velocity | score=2 (BOUNDARY) | not breached |
| D10≤2 duplication | score=2 | **BOUNDARY** — soft-gate triggers (pattern improvements exist) |
| D14<3 reversibility | score=1 | **BREACHED → INSTALL blocked** |
| D15<2 supply chain | score=2 (BOUNDARY) | not breached |
| Universal REJECT D7≤1, D10≤2 AND no-pattern, D15≤1 | D10=2 BUT federation+SONA+swarm-consensus are marginal patterns | not REJECT (soft-gate down per §3.6) |

## §5 Typed-evidence diversity (≥3 organizationally distinct)

- **BENCHMARK**: SWE-Bench 84.8%, 2.8-4.4× speed, 98.7% token reduction (`README.md` "Numerical Benchmark Deltas" + DeepWiki summary) — **self-authored only**
- **CODE READING**: `v3/@claude-flow/cli/src/mcp-tools/browser-session-tools.ts` (called out in commit `e4bd9bbcb`), `@claude-flow/memory/controller-registry.ts` (commit `e4bd9bbcb`), `.claude/helpers/hook-handler.cjs` (DeepWiki + `.claude/settings.json:60-90`), `package.json:1` v3.7.0-alpha.44
- **PRACTITIONER FIELD REPORT**: **HONEST-NON-FINDING** — DeepWiki confirmed "no documentation of third-party organizations [...] other than RuvNet". 3rd typed category MISSING. Org-diversity: ruvnet (canonical), Anthropic (vendor only via `@anthropic-ai/claude-code` SDK), Cognitum.One (same author, ruv.io). Effective org count = 1. **D5 hard-cap correctly fires**.

## §6 Verdict — T4 CITE-ONLY

Soft-gate routing per §3.5:

- `install_score 2.596 < 3.0` → T1 INSTALL + T2 VENDOR-FORK blocked
- `pattern_score 2.718 < 3.5` AND D2=3<4 → T3 PATTERN-STUDY blocked
- `D7=2 > 1` AND `D10=2 has marginal patterns to lift` AND `D15=2 > 1` AND no persona BLOCK → universal REJECT triggers do NOT fire
- D6=2 < 4 AND D12=4 ≥ 4 — D12 raises into T4 per §3.4 ("OR `pattern_score < 3.5` but `D12 community_signal ≥ 3` AND author is named-T2")

**Final tier: T4 CITE-ONLY** — reference in `VERDICT-LEDGER.md`, do NOT install, do NOT extract patterns this wave. Citing federation+SONA+swarm-consensus as architectural reference points worth tracking; re-litigate when (a) third-party practitioner field reports surface OR (b) repo achieves D7≥4 via multi-contributor cadence OR (c) `ruflo uninstall` lands raising D14.

No rollback plan required (T4). No `divergence_files` (T4). No `pattern_doc_path` (T4).

## §7 Graphiti ledger episode JSON

```json
{
  "name": "adoption-verdict-W289-ruvnet-claude-flow",
  "episode_body": {
    "candidate": "ruvnet/claude-flow",
    "verdict": "CITE-ONLY",
    "wave": "W289",
    "decided_at": "2026-05-18T00:00:00Z",
    "decided_by": "sota-convergence-audit + codex-stop-hook",
    "rule_version": "sca-v3",
    "sources_typed": {
      "benchmark": [{"name": "SWE-Bench 84.8% claim", "url": "https://github.com/ruvnet/ruflo/blob/main/README.md", "self_authored": true}],
      "code_reading": [
        {"path": ".claude/settings.json:60-90", "sha": "24c04cbbd37c5c3a9232fbcbc2b0693ca1f30714", "finding": "self-invented .claude/helpers/hook-handler.cjs dispatcher across 8 hook stages"},
        {"path": "package.json:1", "sha": "530ecd519f3bf418f02d474c0e6d9393aac8bdec", "finding": "v3.7.0-alpha.44, 20+ overrides{} pinning"},
        {"path": ".claude-plugin/marketplace.json:1", "sha": "ab52d5a5621992f22b04fbb07829f1c20b566614", "finding": "32 plugins, massive overlap vs 62 installed"}
      ],
      "practitioner_report": [{"finding": "HONEST-NON-FINDING — no independent named-org field report (DeepWiki confirmed)"}],
      "D5": {"disagreement": []}
    },
    "rubric_scores": {
      "D1_license": 5, "D2_uniqueness": 3, "D3_harness_fit": 2, "D4_cc_pathway": 5,
      "D5_typed_evidence": 2, "D6_authority": 2, "D7_velocity_balanced": 2,
      "D8_benchmark_deltas": 2, "D9_failure_modes": 3, "D10_duplication": 2,
      "D11_context_cost": 1, "D12_community_distribution": 4,
      "D13_pattern_extractability": 3, "D14_reversibility": 1, "D15_supply_chain": 2,
      "install_score": 2.596, "pattern_score": 2.718,
      "hard_cap_breaches": ["D5", "D14"]
    },
    "adversarial_review": {"security": "DEFERRED-stream-A-solo", "architect": "DEFERRED-stream-A-solo", "code_reviewer": "DEFERRED-stream-A-solo", "codex_gate": "DEFERRED-synthesis-wave"},
    "rollback_plan": null,
    "divergence_files": null,
    "pattern_doc_path": null,
    "reverification_due": "2026-08-18T00:00:00Z",
    "status": "ACTIVE",
    "supersedes": "W288-deepwiki-summary-harness-fit-5-of-5"
  },
  "source": "json",
  "group_id": "adoption-decisions"
}
```
