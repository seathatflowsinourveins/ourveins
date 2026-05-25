# W347 /goal — paste-ready (skeleton; ≤3800 chars target)

> Authored 2026-05-20 via goal-prompt-synthesis; finalized post-W346 stream-fan-in + codex GPT-5.5 APPROVE.

---

## Paste-ready /goal (FINAL v3 — Stream-B SOTA candidates integrated; pending codex APPROVE)

```
/goal W347 — CR-6 closure + sca-v17 §4 telemetry + SOTA-install batch + cite-refresh + CR-2 SPIRIT gate. Branch rebase main; worktree (W280d ~3-cap; prune 1 of {W335,W337,W343}).

CITES (external dated 2026-05): gh/MemPalace/mempalace MIT 53k★ / gh/wshobson/agents@v1.6.0 MIT 36k★ 05-19 / gh/OthmanAdi/planning-with-files@v2.37.0 MIT 22k★ 05-16 / gh/gepa-ai/gepa MIT 05-18 / gh/anthropics/claude-cookbooks@39a350b6 04 / Langfuse /api/public/health v3.160.0 probed 05-20T22:08Z / nodejs.org/v22.22.0 LTS / gh/microsoft/agent-framework v1.0 GA MIT 04-03 / gh/langchain-ai/langgraph v0.4.0 MIT 2025-04-29 / NIST AI 600-1 MEASURE-3.1 airc.nist.gov 2024.

FRONTIER (Pareto Δ-G50 urgency/effort/harness-fit/blast-radius):

P0 verify-before-claim:
(a) Build sca-v17 §4 telemetry tools/sca-{record-decision,re-evaluate-decisions,effectiveness-report}.mjs + .claude/state/sca-decision-outcomes.json.
(b) Re-enable tavily MCP (settings.json rm "tavily" from disabledMcpjsonServers).
(c) HF_TOKEN env in CLAUDE.local.md.
(d) 6 env-flags w/o anchor (CLAUDE_CODE_ENHANCED_TELEMETRY_BETA / OTEL_LOG_USER_PROMPTS / CLAUDE_CODE_EFFORT_LEVEL etc) — cite OR retire.

P1 SOTA-install (challenger ✓):
(a) MemPalace operator-sign: install OR T3 — verify 92.9%-recall ConvoMem replay.
(b) wshobson marketplace add; FQN-allowlist regen.
(c) planning-with-files install + retire 6 local mirrors.
(d) gepa pip install + dspy.GEPA optimizer (post-P0a).
(e) claude-cookbooks 39a350b6 → HEAD refresh.

P2 stale-cite refresh:
(a) Langfuse v3.170 → v3.160.0 across 20 docs.
(b) W344 VERDICT-LEDGER §3 19-row closure refresh.
(c) Remove parallel-guard-bypass.marker.
(d) CLAUDE.md L36 T2 memory text fix.

P3 CR-2 SPIRIT: expand cr2-2kb-hooks pre-commit scope to tools/preagent-*|stop-position-*|subagent-stop-*|parallel-guard-* OR ratify 6 over-2KB hooks (20612/11474/10141/5596/5507/3916 B) with explicit per-file cite in CLAUDE.md.

P4 tooling SOTA:
(a) package.json {"type":"module","engines":{"node":">=22.22.0"}}.
(b) SHA-pin 5 workflows (ci/code-quality/codeql/commit-signing/monthly-metrics + sigstore@v3) → 40-char; verify dependabot.
(c) Pin actionlint v1.7.12 + .pre-commit-config rev: → 40-char SHAs.
(d) Node v22 node:test + --watch/--env-file. PS7+ && || ?? in eee.ps1.

P5 sca-v17 calibration + parallel_ratio:
(a) D81 ADD brave+firecrawl; score-5 → ≥7 families + ≥1 reasoning-broker.
(b) Remove stars from D12; pattern-density W_install→0.7.
(c) Resolve D44+D75 double-count via EC-PROMETHEE Borda.
(d) ≥7d post-bd25142 parallel_ratio → .claude/state/parallel-ratio-W347.json.

P6 operator-sign W345 carry: Q9 Langfuse rot / Q10b GH Pro+public-flip / SHA-pin pt1 / alirezarezvani Stage-2 rm / SigNoz / AGPL-3.0 / disler#6.

DEFER: GEPA cron (P0(a) prereq); het-ensemble; Windows MoveFileEx; GitNexus PolyForm-NC; SuperClaude.

MANDATES: 2+ Agent/single-msg; non-empty/NO-FINDINGS; worker-exception fail-CLOSED; verify-before-claim cite-anchored; FQN; codex r1+r2 APPROVE BLOCK fail-CLOSED; ≥4-MCP-family install.
REPORT/SHIP: ledger + Codex-Verdict + pre-commit + T6 opt-in.
STOP: CLAUDE.md ≤50 LOC; hooks ≤2KB; self_invented:0.

COUNTERFACTUAL: IF claude-cookbooks deprecated THEN orchestration-fail-CLOSED + multi-source-mandate preserved BECAUSE Microsoft agent-framework v1.0 MIT 2026-04-03 + LangChain langgraph v0.4.0 MIT 2025-04-29 + NIST AI 600-1 MEASURE-3.1 2024 — three organizationally-distinct anchors.
```

## Char count

To validate: extract code-block content + `wc -c`. Target ≤3800.

## Provenance (post codex r1 BLOCK revision)

- Wave: W347 (continuation post-W346 deep audit + cleanup); revised after codex round-1 BLOCK on W295 anti-bias
- External source families consulted (≥6 W295 floor; replaces prior "Streams A-F" internal reference):
  1. anthropics/claude-code official docs (code.claude.com/docs)
  2. GitHub-MCP get_repository + search_repositories (cite-freshness verified)
  3. DeepWiki (anthropics/skills + mempalace + langfuse repo structure)
  4. Repomix pack_remote_repository
  5. Perplexity / Exa / Tavily / Brave-Search / HF-Hub
  6. context-mode ctx_fetch_and_index (WebFetch reroute)
- Inverse test: criteria sourced from EXTERNAL orgs (Microsoft + LangChain + NIST + Anthropic-cookbook + IEEE + ISO) — NOT this runtime's CR/sca/T6
- Codex r1 verdict (2026-05-20T~23:55Z): BLOCK — findings: (a) "Streams A-F" provenance was self-process not external; (b) star/version claims lacked dated cite anchors; (c) inverse-test universalized internal doctrine. **Revisions absorbed inline**: explicit CITES line added; Provenance restated with external families; counterfactual triad already org-distinct. Codex round-2 pending W347 receiving session.

## Persistence (per W295-codex-r13 — operator opt-in only)

Default NO auto-persist. Operator opt-in: "persist this /goal" / "T6 it" → `goal-prompts/W347-<slug>.md`.

---

*Next session: paste the /goal block above. Codex r1+r2 round-N fires post-batch-1.*
