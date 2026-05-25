# W335 Comprehensive SOTA Prompt — paste-ready for fresh CC session

**Open a fresh CC session in `Z:\claude-sota-installed-W335` via `eee` (auto-detects worktree per commit 3f9a9df). Paste the block below (between triple-backticks) as a REGULAR MESSAGE.** Not `/goal` slash — predicate exceeds 4000-char limit.

---

```
W335 SOTA-Convergence-Max UNLEASHED — receiving session executes per this directive.

=== SESSION CONTEXT (pre-state, verified 2026-05-20) ===
You are in worktree `Z:/claude-sota-installed-W335` on branch `goal/W335-sota-convergence`. All preflights are DONE:
- Main worktree pulled to commit `e4e29ae` (8 W333+W334+W335-P0 commits on main); W333 worktree REMOVED; W335 worktree LIVE.
- 5 services LIVE: langfuse :3000 + cognee :8000 + llamaswap :8090 + ollama :16700 + clickhouse :18123.
- 7 env vars SET: OPENAI_API_KEY (164) + LANGFUSE_PUBLIC_KEY/SECRET_KEY (42 each) + GITHUB_TOKEN (93) + PERPLEXITY_API_KEY (53) + TAVILY_API_KEY (59) + EXA_API_KEY (36).
- 18 SOTA plugins ENABLED per W334 deep-audit (clickhouse, kubernetes-operator, chaos-engineering, slo-architect, feature-flags-architect, self-improving-agent, autoresearch-agent, agenthub, llm-wiki, claude-mem, qa-orchestra, review-agent-governance, protect-mcp, signed-audit-trails, hookify, intelligent-compact, cwc-makers, outputai).
- 4 kept-disabled with rationale: qdrant-skills (no Qdrant) + hindsight-memory (W317-S1 retired) + gitnexus@gitnexus-marketplace (operator-pending) + superpowers@superpowers-marketplace (dup).
- CI codex-review.yml auto-skips when `vars.OPENAI_API_KEY_AVAILABLE != 'true'` (current=false; ChatGPT Pro canonical for local codex).
- eee.ps1 worktree-aware: `cd <worktree> && eee` auto-pins workspace per commit 3f9a9df.

=== HARD GATE: Codex-Verdict trailer (NEW; commit e4e29ae) ===
Per https://git-scm.com/docs/githooks#_commit_msg + https://docs.anthropic.com/en/docs/claude-code/sub-agents, EVERY commit must contain `Codex-Verdict: APPROVE` (post codex r1 review) OR `Codex-Verdict: BOOTSTRAP` (bootstrap one-time) trailer line, else commit BLOCKED at pre-commit-msg stage by tools/codex-trailer-gate.mjs. Escape hatch: `$env:CODEX_TRAILER_GATE_DISABLE=1` (CR-5 condition-(b) sanctioned; operator-only).

Per-commit workflow:
1. Stage diff: `git add <paths>`
2. Fire codex review: `node $env:CLAUDE_PLUGIN_ROOT/openai-codex/codex/1.0.4/scripts/codex-companion.mjs task --effort high "Review the staged diff: $(git diff --cached)"`
3. If codex returns VERDICT: APPROVE → commit with trailer:
   ```
   git commit -m "fix(scope): summary

   Body text.

   Codex-Verdict: APPROVE"
   ```
4. If REVISE/BLOCK → address findings, re-stage, re-fire codex, repeat.

=== ARCHITECTURAL TOKEN-EFFICIENCY (per-task DAG budget, NOT blanket K-cap) ===
- ENABLE_PROMPT_CACHING_1H=1 verified in settings.json:19 (1-hour cache TTL ≈ 12× reuse vs 5-min default).
- Large outputs via mcp__plugin_context-mode__ctx_batch_execute / ctx_fetch_and_index (RAG-style).
- Code reads via mcp__repomix__pack_codebase + grep_repomix_output (tree-sitter compression ~70%).
- Cross-model handoffs use markdown-essentials-only (strip ANSI/UI noise).
- Per-task budget determined by task DAG fan-out, NOT static K/M caps.

=== CODEX MCP SCOPE (codex e2e Gate-4 partial — needs receiving-session enforcement) ===
codex GPT-5.5 authority during pre-commit review:
- PERMITTED: Read tool + Bash (read-only) + all MCPs (filesystem read via Read; github via mcp__plugin_everything-claude-code_github; deepwiki via mcp__deepwiki; repomix via mcp__repomix; perplexity via mcp__perplexity; ecosyste.ms via WebFetch reroute; basic-memory via mcp__basic-memory; hf-mcp via mcp__hf-mcp-server; cognee via mcp__cognee; langfuse via mcp__langfuse; chrome-devtools via mcp__chrome-devtools; exa+tavily via respective MCPs).
- FORBIDDEN: WriteFile/Edit (Claude orchestrator owns writes); destructive Bash (rm -rf, git push --force, drop database); operator-confirmed-only ops (PR merge, secret-set).
- W335 follow-up (operator action queued): mechanical MCP-allowlist enforcement in codex-companion config (currently advisory per codex r1 review).

=== W335 PRIORITY EXECUTION (10 P-blocks per docs/architecture/W335-SOTA-CONVERGENCE-MAX/PREDICATE.md) ===

P0-1 IMMEDIATE: PATTERN-STUDY mcp-agent (zero-risk, highest-leverage). Clone lastmile-ai/mcp-agent (8.2k★ obs 2026-05-19 MIT). Extract Router + Evaluator-Optimizer + MCPAggregator + ParallelLLM + Orchestrator patterns into .claude/skills/mcp-agent-patterns/SKILL.md (≤8-trigger description). Commit + codex-r1.

P0-2 PER-SKILL CARDINALITY AUDIT: per W334 operator-correction lesson (CARDINALITY-VS-QUALITY-CONFLATION FM-class). NOT mass-disable. Per-skill audit engineering-skills (32) + engineering-advanced-skills (40) bundles; flag specific >8-trigger violations to tmp/W335-audit/cardinality-audit.csv. Operator-curate override OR upstream PR. KEEP quality skills enabled.

P1-1 sca-v14 CODIFY: 13-edit SKILL.md plan: +D73 multi_source_first_discovery_diversity 0.7 + D74 mcp_family_attribution_completeness 0.5 + D75 codex_round_cost_efficiency_ratio 0.3 + pattern_density REPLACING D12 stars-only. denom 42.5→44.0. Install verdict-llm@0.2.7 MIT https://github.com/haizelabs/verdict; wire Unit→Layer→Block per Zheng+ arXiv 2306.05685 + JudgeLM arXiv 2310.17631.

P1-2 PLUGIN UPGRADES paired: (a) context-mode v1.0.141→v1.0.144 PR#636 LOW (Windows path-quoting fix); (b) GitNexus v1.3.6→803f0bed LOW (Windows fixes #1690+#1694). Cache-delete + fresh-install per https://code.claude.com/docs/en/plugins.

P1-3 ECC UPGRADE codex-r2-gated: v2.0.0-rc.1→30f60710 (18-commit/44-file MED-risk drift). Fetch diff; codex task --effort high embedded; await APPROVE; pre-tag pre-W335-ecc.

P1-4 FRESH-ADOPT: (a) parcadei/Continuous-Claude-v3 T1 3.8k★ MIT — context-mgmt-ledgers; CR-1 maintainer audit (signed releases? SLSA-L3? Sigstore?) + CR-2 hook-body audit BEFORE install per NIST CM-8; (b) dlorenc/multiclaude T2-CHERRY pattern-only — Brownian-ratchet (Sigstore co-author trust).

P2-1 INSIGHTS: ship tools/claude-analytics-fetch.mjs (≤80 LOC) querying Anthropic Analytics API GET /v1/organizations/usage_report/claude_code per https://docs.anthropic.com/en/manage-claude/claude-code-analytics-api (launched 2025-09-10) with x-api-key Admin API key + anthropic-version 2023-06-01.

P2-2 FQN SUBAGENT_TYPE addendum: CLAUDE.md ≤10 LOC mandate `<plugin>:<name>` form (cite https://docs.anthropic.com/en/docs/claude-code/sub-agents).

P2-3 RESEARCH-ARCH multi-angle: sca-v14 §1.5 Stage-0.5 codify mandatory perplexity + ecosyste.ms probe BEFORE Stage-1 Phase 1; target ≥30% top-10 non-github first-discovered per NIST AI 600-1 MEASURE-2.5.

P2-4 GITNEXUS DECISION (operator-sign 3-path): REMOVE marketplace + installed_plugins entries OR PIN @1.6.5 OR PLUGIN-ENABLE.

P2-5 CLAUDE.local.md (f5) Langfuse OTEL Authorization-Basic header paste (operator-only; deny-listed).

P2-6 AWESOME-LIST CROSS-DISCOVERY: WebFetch (rerouted via ctx_fetch_and_index) https://github.com/hesreallyhim/awesome-claude-code/blob/main/README.md cross-reference vs current install set; surface ≥5 NEW T2-CHERRY.

=== MANDATES (UNLEASHED) ===
- 4-stream Agent fan-out (general-purpose + allowlist-validate via tools/preagent-subagent-validator.mjs).
- Skeleton-first per Δ-PDM-1 (research-heavy workers write skeleton BEFORE any research tool call).
- Checkpoint-resume per Δ-PDM-3 (mid-flight stream-error → resume not re-do).
- F5 non-empty-final-message detection (re-dispatch once on empty; orchestrator BLOCKS on 2nd empty).
- codex r1 EVERY P0/P1 diff + Codex-Verdict: APPROVE trailer mandatory.
- Cross-model authority: codex GPT-5.5 = ADVERSARIAL-AUTHORITY; Ollama qwen3-coder = cheap-triage; Sonnet 4.6 = tie-breaker (W331 P0.7 FRONTIER-PEER POLICY).
- Pareto-frontier (Δ-G50) on (urgency, effort, harness-fit, blast-radius); exclude dominated.
- self_invented_count=0 invariant; CLAUDE.md body ≤50 LOC; W286-arc-P0C CR-9 npx-pinned.
- W334 lesson: cardinality-vs-quality CONFLATION FM-class — don't mass-disable; per-skill audit instead.

=== INVERSE-TEST (vs Anthropic minimal-install https://code.claude.com/docs/en/installation 2026-05-19) ===
8 of 13 SURVIVE structurally: P0-1 mcp-agent-pattern + P0-2 cardinality-discipline + P1-1 sca-v14 + P1-4-b multiclaude-pattern + P2-1 insights-API + P2-2 FQN-addendum + P2-3 research-arch + P2-6 awesome-list. 5 ARCH-INSTANCE drop on minimal: P1-2 plugin-upgrades + P1-3 ECC + P1-4-a parcadei-install + P2-4 gitnexus + P2-5 langfuse-auth.

=== CHALLENGER REORDER ===
lastmile-ai/mcp-agent adoption demotes manual Router/Evaluator/MCPAggregator/Orchestrator pattern-build (P0-1 wins). gepa-ai/gepa (ICLR 2026 Oral; arXiv 2507.19457) adoption defers pattern_density manual-tune. verdict-llm wiring at P1-1 demotes prose-codex aggregation.

=== SHIP CONTRACT ===
- conv-commit per https://www.conventionalcommits.org/en/v1.0.0/.
- codex-r1 + Codex-Verdict: APPROVE trailer MANDATORY per commit (W335 P0 trailer gate enforced).
- CI/CD via PR; codex-review.yml auto-skips per OPENAI_API_KEY_AVAILABLE=false (intentional; local-codex canonical).
- Wave-close synthesis at docs/architecture/W335-SOTA-CONVERGENCE-MAX/{WAVE-CLOSURE,VERDICT-LEDGER}.md.
- T6 basic-memory opt-in per sca-v13 §7 secret-redaction gate (default: skip).

=== STOP-GATES (ALL must hold before wave-ship) ===
1. All prior-wave PRs merged to main (verify gh pr list --state merged; current=PR#1+#16+#17 + 3 direct main commits).
2. mcp-agent-patterns skill ≤8-trigger description compliance verified.
3. EVERY commit msg trailer Codex-Verdict: APPROVE recorded (enforced by tools/codex-trailer-gate.mjs).
4. gitleaks pre-push clean.
5. self_invented_count=0 preserved.
6. CLAUDE.md body ≤50 LOC.
7. sca-v14 SKILL.md LOC ≤sca-v13 LOC.
8. W335-PR first-CI green (codex-review auto-skips per repo var).
9. Per-skill cardinality-audit COMPLETE (no mass-disable regression per W334 lesson).
10. langfuse 30d trace-count ≥50 (baseline 3 at prior probe).
11. Anthropic Analytics API smoke-fetch returns non-error.
12. Awesome-list cross-discovery surfaces ≥5 NEW candidates.
13. MCP-allowlist mechanical enforcement codified (codex e2e Gate-4 closure).

=== FIRST ACTION ===
Verify the current state via:
  git log --oneline -10
  git worktree list
  gh pr list --state merged --limit 5
  netstat -ano | findstr ':3000\|:8000\|:8090\|:16700\|:18123' | head -10
  Get-ChildItem $env:CLAUDE_PLUGIN_DATA -ErrorAction SilentlyContinue | Select Name

Then start P0-1: clone lastmile-ai/mcp-agent + extract patterns per the directive above. Per-commit codex r1 + trailer.
```

---

## Provenance + meta

- **Codex GPT-5.5 e2e review verdict on prior W335 UNLEASHED**: round-1 substance-APPROVED (5 gates pass: SOTA defensible, per-task DAG sound, prompt-cache/ctx-batch/repomix sound, eee patch backwards-compatible, W333+W334+W335 lineage coherent); round-1 BLOCKED on Gate-3 (commit-msg trailer enforcement). **Gate-3 NOW CLOSED via commit `e4e29ae`** (tools/codex-trailer-gate.mjs + .pre-commit-config.yaml hook). Gate-4 partial (MCP-allowlist mechanical enforcement is W335 receiving-session deliverable).
- **Source families consulted (19 distinct external orgs across W333+W334+W335)**: Anthropic PBC, claude-cookbooks repo, mksglu, abhigyanpatwari, affaan-m, assafelovic/Tavily, Haize Labs, gepa-ai, GitHub Inc/Microsoft, lastmile-ai, parcadei, dlorenc, OWASP, ISO/IEC, NIST, CNCF/OpenTelemetry, OpenSSF/Linux Foundation, Langfuse GmbH, npm Inc, Sigstore-project.
- **Pareto-frontier (Δ-G50)**: P0(2) | P1(4) | P2(6). 8 SURVIVE-STRUCTURAL inverse test; 5 ARCH-INSTANCE drop.
- **Triadic decomposition (Δ-G47)**: Planner = orchestrator | Researcher = W333+W334 5+4 streams | Reporter = this PREDICATE.md + COMPREHENSIVE-PROMPT.md.
- **Bootstrap-trailer use**: this prompt was authored after commit `e4e29ae` which used `Codex-Verdict: BOOTSTRAP`. All future receiving-session commits MUST use `Codex-Verdict: APPROVE` after firing codex r1 review.

## How to use

1. **In fresh CC session opened in W335 worktree**: paste the ENTIRE BLOCK between triple-backticks above as a regular message (NOT `/goal` slash; >4000 chars).
2. **Receiving session**: auto-fires `goal-prompt-synthesis` + `parallel-dispatch-mandate` + `sota-convergence-audit` per `description:` match; reads context; starts P0-1.
3. **Per-commit**: fire codex r1 via `codex task --effort high` → append `Codex-Verdict: APPROVE` trailer → commit (else BLOCKED by tools/codex-trailer-gate.mjs).
4. **Wave-close**: write WAVE-CLOSURE.md + VERDICT-LEDGER.md to `docs/architecture/W335-SOTA-CONVERGENCE-MAX/`; open PR; merge via `gh pr merge --rebase`.

This prompt is the comprehensive paste-ready handoff. All preflights settled. Codex-Verdict trailer gate enforces the e2e review mandate mechanically. Receiving session has full context to execute W335 SOTA-Convergence-Max.
