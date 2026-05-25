# W342 /goal predicate — full gap resolute, all SOTA practice

**Wave**: W342 | **Source**: W341 VERDICT-LEDGER + cross-stream P0/P1/P2 docket | **Ceiling**: 3800 char

## Pareto-frontier ranking (Δ-G50, 4-axis MCDA)

| ID | Action | urg | eff | fit | blast | Frontier |
|---|---|---|---|---|---|---|
| P0.3 | Phantom plugin enables (clickhouse + outputai) | H | L | 1.0 | M | ★ |
| P0.4 | PreToolUse hook D73 SHIP-BLOCK gate | H | M | 0.9 | M | ★ |
| P0.5 | Stop-hook position-swap on T1 verdicts | H | M | 0.9 | M | ★ |
| P0.A2 | Reconcile CLAUDE.md ECC load_failures=1 stale claim | M | L | 1.0 | L | ★ |
| P1.1 | firecrawl-mcp + brave-search-mcp install | M | L | 0.9 | L | ★ |
| P1.2 | /insights+/recap+/ctx-insight wave-close ritual | M | L | 1.0 | L | ★ |
| P1.3 | 3 new CI workflows (monthly-metrics+supply-chain-watch+session-jsonl-archive) | M | M | 1.0 | L | ★ |
| P1.5 | CI grep blocking 13 colliding bare subagent_type names | M | L | 1.0 | L | ★ |
| P1.6 | npm audit pre-commit hook | M | L | 1.0 | L | ★ |
| P2.1 | codegraph 24h staging-pilot | M | M | 0.9 | M | dom-by-P0.4 |
| P2.3 | CCBP upstream refresh (5 commits stale) | L | L | 1.0 | L | ★ |
| P2.5 | RETIRE alirezarezvani/claude-skills | L | L | 1.0 | L | ★ |

## Anti-bias inverse-test (§5)
- ≥6 external source families: gh-MCP + deepwiki + repomix + ctx_fetch_and_index + Bash CLI + WebFetch fallback ✓
- ≥1 challenger candidate: codegraph would CHALLENGE local-cypher-codebase + serena ✓
- Inverse test PASS: every priority is architecture-agnostic (parallel_ratio measurement holds under any rubric weights; D73 mechanization is cross-runtime SOTA per NIST AI 600-1) ✓

## Paste-ready /goal predicate (3760 char)

```
/goal W342-FULL-GAP-RESOLUTE — close W341 carry-forward P0/P1 + SOTA gap-resolution. Branch w342-execute on git worktree. AGENT-TEAM REQUIRED (W269 mandate: ≥2 Agent calls in 1 assistant message; orchestrator-worker per Δ-G49). Source-of-truth: docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md.

P0 SHIP-BLOCKERS (close THIS wave; fail-CLOSED on any incomplete):
P0.3 Resolve phantom plugin enables: clickhouse@claude-plugins-official + outputai@claude-plugins-official are enabled=true in .claude/settings.json but absent from installed_plugins.json. Execute `/plugin uninstall <name>` then `/plugin install <name>@<marketplace>` OR flip enabled=false in settings.json. Verify via /reload-plugins + /doctor=0-errors. Cite Stream-A §2.
P0.4 Wire PreToolUse[Agent] hook D73 SHIP-BLOCK gate: T1 verdicts MUST cite ≥2 non-github first-discoveries per sca-v15 I10. Create tools/preagent-d73-gate.mjs reading mcp_family_attribution[] from verdict ledger row; exit 2 on T1 with <2 non-github first-discoveries. Wire in .claude/settings.json. Cite Stream-C §7 P0-C4.
P0.5 Wire Stop-hook position-swap on T1 verdicts: mechanize sca-v15 Phase-6 round-1+round-2 ordering swap. Reuse openai-codex/1.0.4/hooks/hooks.json Stop pattern. Cite Stream-C §7 P0-C5 + sca-v15 §10.
P0.A2 Reconcile CLAUDE.md L98 `load_failures=1` vs `/doctor` ECC marketplace mismatch. Either fix marketplace metadata OR remove stale claim from CLAUDE.md. Cite Stream-A §7.

P1 (close W342 or W343):
P1.1 Install firecrawl-mcp@1.12.0 (MIT) + brave-search-mcp@2.0.82 — `.mcp.json` additions; CR-1 trust-tuple (SLSA + license + transitive npm audit). Cite Stream-C G1/G2.
P1.2 Wire /insights+/recap+/context-mode:ctx-insight into wave-close skill or runbook (Insights gap is OPERATIONAL not WIRING per Stream-D §2 + Stream-G §3).
P1.3 Ship 3 new .github/workflows: monthly-metrics.yml + supply-chain-watch.yml + session-jsonl-archive.yml per Stream-D §5 ECC ports.
P1.5 Add pre-commit grep blocking 13 colliding bare subagent_type names per W340 F4 + Stream-E §4.
P1.6 npm audit pre-commit hook (nodebestpractices rule-7) — Stream-F §1.

P2 (W343+ docket):
P2.1 codegraph 24h staging-pilot decision — T1-CONDITIONAL pending SLSA-L3 + npm-deps audit + 24h soak vs local-cypher-codebase.
P2.3 Pull CCBP upstream (5 commits stale f28c2da → a28cd96b); refresh CLAUDE.md L3 cite SHA.
P2.5 RETIRE alirezarezvani/claude-skills (313→48 fabrication W330 axis-2 holds).

EXECUTION TOPOLOGY (Δ-G49 Orchestrator-Worker, 4 streams parallel):
- Stream X1 (plugin): P0.3 + P0.A2
- Stream X2 (hooks): P0.4 + P0.5 + P1.5 + P1.6
- Stream X3 (MCP): P1.1 + P2.1-pilot
- Stream X4 (CI+governance): P1.3 + P1.2 + P2.3 + P2.5
Dispatch 4 Agent calls in ONE message. Each MUST return non-empty final-msg OR explicit NO-FINDINGS sentinel. Empty=OrchestrationError fail-CLOSED.

MANDATES:
- W269 ≥2 Agent calls/message; ratio target ≥0.30 floor.
- Codex GPT-5.5 Phase-6 task --effort high APPROVE required pre-commit (W335 trailer).
- Cardinal-rules 1/2/3/4/5/6 hold; self_invented_count=0.
- Secret-redaction gate before any T6 basic-memory persist (W295-codex-r13).
- Every install: SLSA/Sigstore/license verify + `npm ls`/`pip check`/`uv tool list` clean.
- Δ-DPA-1 skeleton-first-write; Δ-DPA-2 budget cap 140k/15 calls per worker.
- Δ-DPA-5 subagent_type FQN pre-flight via .claude/state/subagent-type-allowlist.json.
- Verify-before-claim (CR-6): every DONE claim cites file:line OR command stdout.

REPORT/SHIP:
- Each closure writes VERDICT-LEDGER row + T6 basic-memory.
- Re-measure parallel_ratio post-fixes; expect uptick from 0.0031 baseline.
- Re-run /doctor — expect 0 errors after P0.3 + P0.A2.
- Conventional commit: `feat(w342): full-gap-resolute close — P0.3-5 + P1.1-6 SOTA mechanization`.
- Update CLAUDE.md runtime state metrics + carry-forward delta if any P1/P2 deferred.

STOP: CLAUDE.md ≤50 LOC. No --no-verify. No silent fallback. Carry-forward to W343 requires explicit dwell-class annotation per ops-rhythm.
```

## Cross-stream cite anchors (sca-v15 I1 — 3-org-distinct per claim)

- D73 SHIP-BLOCK rationale: NIST AI 600-1 MEASURE-3.1 + OSSF Criticality Score + Anthropic claude-cookbooks `research_lead_agent.md`
- Phase-6 position-swap: Anthropic claude-cookbooks `orchestrator_workers.ipynb` + Zheng+ MT-Bench arXiv 2306.05685 + JudgeLM Wang+ arXiv 2310.17631
- Δ-G49 empty-msg detection: Anthropic claude-cookbooks @ 39a350b6 + Microsoft autogen `_signal_termination_with_error` + LangChain langgraph `supervisor.last_message`
- Δ-G50 Pareto MCDA: Valdecy/pyDecision + arXiv 2507.19457 GEPA + NIST AI 600-1 MEASURE-2.3
- CR-1 trust-tuple: SLSA v1.0 + CycloneDX SBOM + OSSF Scorecard

## Operator-action checklist (paste sequence)

1. Create branch + worktree: `git worktree add ../claude-sota-installed-w342 w342-execute`
2. cd into worktree
3. Paste the /goal predicate above as a fresh CC session prompt
4. Approve P0.3 destructive ops (plugin uninstall/reinstall) when prompted
5. Approve P0.4 + P0.5 settings.json hook additions when prompted
6. Approve P1.1 .mcp.json edits when prompted

## Persistence (opt-in per W295-codex-r13)

T6 basic-memory persistence is OPT-IN. To persist: say "persist this /goal to T6" — secret-redaction gate fires first.
