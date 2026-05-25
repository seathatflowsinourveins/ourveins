# W335 SOTA-Convergence-Max UNLEASHED — paste-ready predicate

**Paste the block below (between triple-backticks) as a REGULAR MESSAGE in a fresh CC session opened in Z:\claude-sota-installed-W335. NOT /goal slash command (7843 chars > 4000-char limit).**

Codex GPT-5.5 round-1 substance-APPROVED (per W333-W334 6+4 round trajectory learnings pre-applied). 4 cosmetic gaps for receiving session to iterate during execution.

---

```
W335 SOTA-Convergence-Max UNLEASHED. Worktree: Z:/claude-sota-installed-W335. Branch: goal/W335-sota-convergence. PreCond already-executed: main pulled to 82dc906; W335 worktree LIVE; W333 worktree REMOVED; 5 services LIVE; 7 env vars SET; all 18 W334 SOTA plugins ENABLED on main.

=== ARCHITECTURAL TOKEN-EFFICIENCY (replaces blanket K-call caps) ===
- ENABLE_PROMPT_CACHING_1H=1 already set (settings.json:19). Re-verify on session-start.
- Per-task budget driven by task DAG fan-out + repomix-pack chunked retrieval, NOT static K/M caps.
- All large outputs via mcp__plugin_context-mode__ctx_batch_execute / ctx_fetch_and_index (RAG-style).
- Code reads via mcp__repomix__pack_codebase + grep_repomix_output (tree-sitter compression ~70%).
- Cross-model handoffs use markdown-essentials-only (strip ANSI/UI noise).

=== GPT-5.5 MAX-PERMISSION + E2E PRE-COMMIT MANDATE ===
- codex-companion.mjs task --effort high on every diff before commit (PATTERN-STUDY: yes [obs 2026-05-20] per https://docs.anthropic.com/en/docs/claude-code/sub-agents 2026-05-19 model-precedence).
- codex MCP access: filesystem read via Read tool; github via mcp__plugin_everything-claude-code_github (post-W333-P0-d); deepwiki via mcp__deepwiki; repomix via mcp__repomix; perplexity via mcp__perplexity; ecosyste.ms via WebFetch reroute (post-W333-P0-c codify).
- codex authority: WriteFile/Edit forbidden (Claude owns writes); Read+Bash-read-only+all-MCPs PERMITTED.
- Stop-hook fires codex review automatically post-edit (already wired per .claude/settings.json hooks.Stop).
- Per cardinal rule #6 verify-before-claim: ZERO commits without codex r1 PASS recorded in commit msg trailer.

=== P0 IMMEDIATE (zero-risk highest-leverage; no install) ===
P0-1 PATTERN-STUDY: yes [obs 2026-05-20]. Clone lastmile-ai/mcp-agent (8.2k★ obs 2026-05-19 https://github.com/lastmile-ai/mcp-agent MIT obs 2026-05-19) — Anthropic Building-Effective-Agents canonical impl per https://www.anthropic.com/research/built-multi-agent-research-system (Anthropic 2024-12). Extract patterns into local skill .claude/skills/mcp-agent-patterns/SKILL.md (≤8-trigger description per https://code.claude.com/docs/en/skills 2026-05-19): (a) Router (intent-classify → handler-dispatch); (b) Evaluator-Optimizer (critic-refine loop); (c) MCPAggregator (multi-MCP unified tool surface); (d) ParallelLLM (fan-out + reduce); (e) Orchestrator (planner→workers→synthesizer). Each pattern documented as one section + 3-line code-citation + reuse-example. Commit + codex-r1 review before push.

P0-2 PER-SKILL-CARDINALITY-AUDIT (operator-correction lesson FM-class: CARDINALITY-VS-QUALITY-CONFLATION; NOT mass-disable). PATTERN-STUDY: no [observed 2026-05-20]; CR-1 maintainer-audit + CR-2 hook-body audit per https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final 2023-09. Per-skill audit alirezarezvani-bundled engineering-skills (32 sub) + engineering-advanced-skills (40 sub): for each SKILL.md description field, count distinct trigger-phrases; flag specific >8-trigger violations to tmp/W335-audit/cardinality-audit.csv (skill_path, trigger_count, violation_severity); choose per-skill operator-curate override layer OR upstream PR to alirezarezvani; KEEP quality skills enabled.

=== P1 SHIP (codex-r1-gated before commit) ===
P1-1 sca-v14 CODIFY: PATTERN-STUDY: no [obs 2026-05-20]. SKILL.md 13-edit plan: +D73 multi_source_first_discovery_diversity_score (W_install 0.7; cites https://repos.ecosyste.ms/docs + https://cloud.google.com/bigquery/public-data/github + https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure/2_5); +D74 mcp_family_attribution_completeness (W_install 0.5; W3C PROV-DM + NIST SP 800-218 PW.7 + ISO/IEC 25010 §4.2.7); +D75 codex_round_cost_efficiency_ratio (W_install 0.3; Zheng+ arXiv 2306.05685 MT-Bench + JudgeLM arXiv 2310.17631); pattern_density_score = (citation_volume_normalized + arxiv_citations + perplexity_hits_30d) / age_months REPLACES D12 stars-only sub-signal (OSSF Criticality Score + Semantic Scholar API + ACL Anthology). composite_denom_install 42.5→44.0. Install verdict-llm@0.2.7 MIT https://github.com/haizelabs/verdict (Haize Labs Inc obs 2026-05-20); wire Unit(model="gpt-5.5")→Layer([codex_round],repeat=adaptive_N)→Block(>>MaxPoolUnit) per haizelabs/verdict Pipeline primitive.

P1-2 PLUGIN UPGRADES paired: PATTERN-STUDY: no [obs 2026-05-20]. (a) context-mode v1.0.141→v1.0.144 (mksglu PR#636 push 2026-05-19 https://github.com/mksglu/context-mode/pull/636) Windows-path-quoting LOW risk; (b) GitNexus v1.3.6→803f0bed (abhigyanpatwari push 2026-05-19 PRs #1690 #1694 https://github.com/abhigyanpatwari/GitNexus) Windows-binding fixes LOW risk. Cache-delete + fresh-install per https://code.claude.com/docs/en/plugins (Anthropic 2026-05-19); pre-tag pre-W335-plugin-upgrade.

P1-3 ECC UPGRADE codex-r2-gated: PATTERN-STUDY: no [obs 2026-05-20]; MED-risk 18-commit/44-file drift. v2.0.0-rc.1→30f60710 (affaan-m obs 2026-05-19 https://github.com/affaan-m/everything-claude-code). Fetch diff via gh api repos/affaan-m/everything-claude-code/compare/8148340...30f6071 --jq '.files[].filename' | head -50; embed in codex task --effort high prompt; await round-2 APPROVE; ONLY then cache-delete + fresh-install; pre-tag pre-W335-ecc-upgrade per SLSA v1.0 https://slsa.dev/spec/v1.0/ (OpenSSF 2023-08).

P1-4 FRESH-ADOPT (Stream B vetted obs 2026-05-19): (a) PATTERN-STUDY: no — parcadei/Continuous-Claude-v3 T1 https://github.com/parcadei/Continuous-Claude-v3 (3.8k★ obs 2026-05-19 MIT obs 2026-05-19) context-mgmt-ledgers + isolated-context agent orchestration. CR-1 maintainer-trust audit (signed releases? SLSA-L3? Sigstore? npm provenance?) + CR-2 hook-body audit (≤2KB ceiling) BEFORE install per https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final 2023-09. If audit-PASS: install via /plugin install + post-/reload-plugins verify per https://code.claude.com/docs/en/plugins 2026-05-19. (b) PATTERN-STUDY: yes — dlorenc/multiclaude T2-CHERRY https://github.com/dlorenc/multiclaude (227 commits obs 2026-05-19 MIT obs 2026-05-19) Brownian-ratchet + fork-auto-detect + 6-agents; dlorenc=Sigstore co-author ex-Google-trust per https://docs.sigstore.dev/ (Sigstore-project 2022-10). Extract pattern only; no install cost.

=== P2 EXTEND (codex-r1-gated before commit) ===
P2-1 INSIGHTS COMPLETION: PATTERN-STUDY: no [obs 2026-05-20]. Ship tools/claude-analytics-fetch.mjs (≤80 LOC) querying Anthropic Analytics API GET /v1/organizations/usage_report/claude_code per https://docs.anthropic.com/en/manage-claude/claude-code-analytics-api (Anthropic launched 2025-09-10) with x-api-key Admin API key + anthropic-version 2023-06-01; JSON-stdout for piping; SAFE-DEFER OTEL_LOG_RAW_API_BODIES per OWASP A09:2021 https://owasp.org/Top10/A09_2021/ (OWASP 2021-09-24) pending PII audit.

P2-2 FQN SUBAGENT_TYPE ADDENDUM: PATTERN-STUDY: no [obs 2026-05-20]. CLAUDE.md ≤10 LOC budget addendum: mandate `<plugin>:<name>` form for any subagent_type referenced in /goal predicates; cite https://docs.anthropic.com/en/docs/claude-code/sub-agents (Anthropic 2026-05-19).

P2-3 RESEARCH-ARCH MULTI-ANGLE: PATTERN-STUDY: no [obs 2026-05-20]. sca-v14 §1.5 Stage-0.5 codify: mandatory perplexity-MCP + ecosyste.ms https://repos.ecosyste.ms/docs probe BEFORE Stage-1 Phase 1; target ≥30% top-10 first-discovered non-github per NIST AI 600-1 MEASURE-2.5 https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure/2_5; close popularity-bias surface per https://github.com/ossf/criticality_score (OpenSSF/Linux Foundation 2023+).

P2-4 GITNEXUS DECISION (operator-sign 3-path): PATTERN-STUDY: no [obs 2026-05-20]. REMOVE marketplace + installed_plugins entries (SOTA-default for disabled-state coherence) OR PIN gitnexus@1.6.5 standalone OR PLUGIN-ENABLE gitnexus@gitnexus-marketplace. Per configuration-pinning per NIST SP 800-53 CM-8 https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final (NIST 2023-09).

P2-5 CLAUDE.local.md (f5) Langfuse OTEL Authorization-Basic header paste: PATTERN-STUDY: no [obs 2026-05-20]. Operator-only (deny-listed for orchestrator); closes GAP-3 (Langfuse auth header) per https://langfuse.com/docs/integrations/opentelemetry/get-started (Langfuse 2024+); insights wire-up progression 14%→57%.

P2-6 AWESOME-LIST CROSS-DISCOVERY: PATTERN-STUDY: yes [obs 2026-05-20]. WebFetch (rerouted via ctx_fetch_and_index) https://github.com/hesreallyhim/awesome-claude-code/blob/main/README.md (hesreallyhim obs 2026-05-19) + cross-reference top entries vs current install set; surface ≥5 NEW T2-CHERRY candidates not yet in this runtime's verdict-ledger; apply sca-v14 with D73 demonstrated.

=== MANDATES (UNLEASHED) ===
- 4-stream Agent fan-out (general-purpose + allowlist-validate via tools/preagent-subagent-validator.mjs).
- Per-task budget DRIVEN BY TASK DAG (not blanket K-call cap). Token-efficiency via prompt-caching + ctx-batch-execute + repomix-chunked-ingest + markdown-essentials handoff. ENABLE_PROMPT_CACHING_1H=1 verified.
- Skeleton-first per Δ-PDM-1; checkpoint-resume per Δ-PDM-3; F5 non-empty-final-message detection.
- codex GPT-5.5 max-permission EVERY commit: `codex task --effort high` with full repo read + MCP-tool access; commit-msg trailer MUST contain `Codex-Verdict: APPROVE` line OR commit BLOCKED.
- Cross-model authority: codex GPT-5.5 = ADVERSARIAL-AUTHORITY; Ollama qwen3-coder:30b-a3b-q4_K_M = cheap-triage; Sonnet 4.6 = tie-breaker.
- Pareto-frontier on (urgency, effort, harness-fit, blast-radius); exclude dominated.
- Orchestrator-Worker MANDATES: every worker non-empty final_message OR NO-FINDINGS sentinel; re-dispatch once on empty; orchestrator BLOCKS on second empty.
- self_invented_count=0 invariant preserved.
- CLAUDE.md body ≤50 LOC discipline + CR-9 npx-pinned per https://docs.npmjs.com/generating-provenance-statements 2023-04.

CHALLENGER-REORDER: PATTERN-STUDY: yes [obs 2026-05-20]. lastmile-ai/mcp-agent adoption demotes manual Router/Evaluator/MCPAggregator/Orchestrator pattern-build effort (P0-1 wins; P1-3 ECC-codex-r2 stays). gepa-ai/gepa (ICLR 2026 Oral; arXiv 2507.19457 NeurIPS 2025) adoption defers pattern_density manual-tune. verdict-llm wiring at P1-1 demotes prose-codex aggregation (codex_ensemble Layer replaces narrative round-N synthesis).

INVERSE-TEST (vs Anthropic minimal-install baseline https://code.claude.com/docs/en/installation 2026-05-19): per-item annotation: P0-1 SURVIVES (universal pattern study); P0-2 SURVIVES (universal cardinality discipline); P1-1 SURVIVES (universal rubric); P1-2 ARCH-INSTANCE (requires installed plugins); P1-3 ARCH-INSTANCE (requires ECC installed); P1-4-a ARCH-INSTANCE (requires plugin install); P1-4-b SURVIVES (pattern-only); P2-1 SURVIVES (universal API call); P2-2 SURVIVES (universal addendum); P2-3 SURVIVES (universal methodology); P2-4 ARCH-INSTANCE (requires gitnexus marketplace); P2-5 ARCH-INSTANCE (requires langfuse stack); P2-6 SURVIVES (universal awesome-list discovery). Total: 8 SURVIVE structurally; 5 ARCH-INSTANCE drop.

SHIP CONTRACT: conv-commit + codex-r1 mandatory; CI/CD via PR + codex full-diff adversarial review; wave-close synthesis docs/architecture/W335-SOTA-CONVERGENCE-MAX/{WAVE-CLOSURE,VERDICT-LEDGER}.md per ops-rhythm; T6 basic-memory opt-in per sca-v13 §7 secret-redaction gate.

STOP-GATES (ALL must hold before wave-ship):
1. Prior-wave PRs fully merged to main (verify via gh pr list --state merged) — DONE 2026-05-20.
2. mcp-agent-patterns skill ≤8-trigger description compliance verified.
3. codex-r1 APPROVE recorded in EVERY commit msg trailer (Codex-Verdict: APPROVE line).
4. gitleaks pre-push clean.
5. self_invented_count=0 preserved.
6. CLAUDE.md body ≤50 LOC.
7. sca-v14 SKILL.md LOC ≤sca-v13 LOC (compress lineage section).
8. W335-PR first-CI green (ci.yml + code-quality.yml + codex-review.yml exercising; codex-review auto-skips per OPENAI_API_KEY_AVAILABLE=false).
9. Per-skill cardinality-audit COMPLETE (no mass-disable regression).
10. langfuse 30d trace-count ≥50 (baseline 3 at prior probe; recovery LIVE per W333-P0-b).
11. Anthropic Analytics API smoke-fetch returns non-error.
12. Awesome-list cross-discovery surfaces ≥5 NEW candidates (P2-6).
```
