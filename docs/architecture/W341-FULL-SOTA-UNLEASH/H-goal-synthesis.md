# W341-FULL-SOTA-UNLEASH — /goal predicate synthesis

**Wave**: W341 | **Date**: 2026-05-20 | **Streams shipped**: A/B/C/D/E/F/G (7 of 7) | **Synthesis stage**: closure

---

## §1 Cross-stream consolidated findings (root-cause convergence)

The dominant FM-class across **5 of 7 streams** is **"codified-but-not-fired"** — the architecture is comprehensive on paper but enforcement gates are inactive. This matches the W325-A F1 SEV-1 baseline (parallel_ratio 0.0038→0.0031 worse) and explains the operator's "silent-fallback feeling".

| Stream | Headline | Severity |
|---|---|---|
| A | `loader:1386` HISTORICAL; self-invent CLEAN; **2× phantom plugin enables** (clickhouse + outputai silent-disabled) | P0 |
| B | 10-repo verdict: codegraph T1-CONDITIONAL pilot; license blockers on mksglu+abhigyanpatwari; alirezarezvani RETIRE-HELD | P0/P2 |
| C | 13 LIVE MCPs SOTA-pinned; **D73 + position-swap codified-but-not-fired**; 5 SOTA-MCP gaps | P0 SEV-1/SEV-2 |
| D | Insights INSTALLED-BUT-UNUSED (operational fix); CCBP local 5 commits stale; cookbook patterns FULLY adopted | P1 |
| E | **parallel_ratio 0.0031 SEV-1 PERSISTS**; MULTI_STREAM_RE regex too narrow; 1st-violation advisory ladder | P0 SEV-1 |
| F | `.mcp.json` SOTA-CLEAN (14/14 pinned); shell hygiene HOLDS; **markitdown MISSING** (sca-v15 Δ51 dep) | P0 |
| G | GitNexus T3 RETIRE-AFFIRMED (PolyForm-NC); codegraph T1-CONDITIONAL; Insights fragmented but ENABLED | P0/P1 |

---

## §2 Pareto-frontier P0 ranking (Δ-G50, 4-axis MCDA)

Axes: urgency (H/M/L higher=worse), effort (L/M/H lower=better), harness-fit (0-1 higher=better), blast-radius (L/M/H lower=better).

| ID | Action | urg | eff | fit | blast | Frontier |
|---|---|---|---|---|---|---|
| P0.1 | Broaden `MULTI_STREAM_RE` + lower binding threshold (tools/preagent-parallel-guard.mjs:42-43) | H | L | 1.0 | M | ★ |
| P0.2 | `pip install markitdown` (sca-v15 §1 Δ51 dep) | H | L | 1.0 | L | ★ |
| P0.3 | Resolve clickhouse + outputai phantom plugin enables | H | L | 1.0 | L | ★ |
| P0.4 | PreToolUse hook D73 SHIP-BLOCK gate (≥2 non-github first-discoveries on T1) | H | M | 0.9 | M | ★ |
| P0.5 | Position-swap Stop-hook on T1 verdicts (mechanize Phase-6) | H | M | 0.9 | M | ★ |
| P1.1 | Install firecrawl-mcp@1.12.0 + brave-search-mcp@2.0.82 (research-arch diversity) | M | L | 0.9 | L | ★ |
| P1.2 | Wire /insights + /recap + /ctx-insight into wave-close ritual | M | L | 1.0 | L | ★ |
| P1.3 | Ship 3 new CI workflows (monthly-metrics, supply-chain-watch, session-jsonl-archive) | M | M | 1.0 | L | ★ |
| P1.4 | Allowlist `generated_at` + `source_commit_sha` + `schema_version` | M | L | 1.0 | L | ★ |
| P1.5 | CI grep blocking 13 colliding bare `subagent_type` names | M | L | 1.0 | L | ★ |
| P1.6 | npm audit pre-commit hook (nodebestpractices rule-7) | M | L | 1.0 | L | ★ |
| P2.1 | codegraph 24h staging-pilot (operator-decision) | M | M | 0.9 | M | dom-by-P0.4 |
| P2.2 | arxiv-mcp install via `uv tool` (Apache-2.0) | M | M | 0.8 | L | dom-by-P1.1 |
| P2.3 | Pull CCBP upstream (5 commits stale) + refresh CLAUDE.md cite SHA | M | L | 1.0 | L | ★ |

---

## §3 Anti-bias inverse-test (§5 of skill)

- ≥6 source families consulted? **YES** (gh-api/MCP, deepwiki, repomix, ctx_fetch_and_index, Bash CLI probes, perplexity-equivalent via WebSearch fallback)
- ≥1 challenger candidate? **YES** — colbymchenry/codegraph would CHALLENGE local-cypher-codebase + serena-symbol-graph incumbents; firecrawl/brave-search CHALLENGE github-popularity-bias in Phase-1 cascade
- Inverse test PASS? **YES** — P0.1 parallel_ratio fix is architecture-agnostic; P0.2 markitdown is foundationally required; P0.4/P0.5 mechanization holds under any rubric weights
- HONEST-NON-FINDING risk? **LOW** — both confirmatory + challenger candidates surfaced

---

## §4 Paste-ready /goal predicate (≤3800 chars)

```
/goal W341-EXECUTE — close-out SOTA-unleash audit (7 streams A-G shipped to docs/architecture/W341-FULL-SOTA-UNLEASH/). Branch: w341-execute on git worktree. Agent-team REQUIRED for ≥2 P0 streams (W269 + Δ-G49 Orchestrator-Worker MANDATES). Root cause SEV-1 = codified-but-not-fired enforcement gates (5 of 7 streams converge).

P0 SHIP-BLOCKERS (frontier-ranked, close THIS wave):
P0.1 Broaden tools/preagent-parallel-guard.mjs:42-43 MULTI_STREAM_RE regex + lower binding threshold 2nd→1st violation. Re-measure parallel_ratio via tools/parallel-ratio-telemetry.mjs. Target floor ≥0.30, ideal ≥0.70 (current 0.0031 SEV-1). Cite Stream-E §1+§2 + W325-A F1.
P0.2 `pip install markitdown` (sca-v15 §1 Δ51 probe-record pipeline dep). Verify via `markitdown --version`. Cite Stream-F §5 P0-2.
P0.3 Resolve phantom plugin enables: clickhouse@claude-plugins-official + outputai@claude-plugins-official enabled=true in settings.json but absent from installed_plugins.json. Execute `/plugin uninstall` then `/plugin install` cycle OR flip enabled=false. Cite Stream-A §2.
P0.4 Wire PreToolUse hook D73 SHIP-BLOCK gate (T1 verdicts MUST cite ≥2 non-github first-discoveries — sca-v15 I10). Cite Stream-C §7 P0-C4.
P0.5 Wire Stop-hook position-swap on T1 verdicts (mechanize sca-v15 Phase-6 round-1+round-2 ordering swap). Cite Stream-C §7 P0-C5 + sca-v15 §10.

P1 (close W342 or sooner):
P1.1 Install firecrawl-mcp@1.12.0 (MIT) + brave-search-mcp@2.0.82 — research-arch diversity. Cite Stream-C G1/G2.
P1.2 Wire /insights + /recap + /context-mode:ctx-insight into wave-close ritual (Insights gap is OPERATIONAL not WIRING). Cite Stream-D §2.
P1.3 Ship 3 new .github/workflows: monthly-metrics.yml + supply-chain-watch.yml + session-jsonl-archive.yml. Cite Stream-D §5.
P1.4 Add generated_at + source_commit_sha + schema_version to .claude/state/subagent-type-allowlist.json (regen via tools/build-subagent-allowlist.mjs --regenerate). Cite Stream-A §4 + Stream-E §3.
P1.5 Add pre-commit CI grep blocking 13 colliding bare subagent_type names per W340 F4. Cite Stream-E §4.
P1.6 npm audit pre-commit hook (nodebestpractices rule-7). Cite Stream-F §1.

P2 (W342+ docket):
P2.1 codegraph 24h staging-pilot — operator decision: pilot/skip. T1-CONDITIONAL pending SLSA-L3 + npm-deps audit + 24h soak. Cite Stream-B T1-PROV + Stream-G §2.
P2.2 arxiv-mcp-server install via `uv tool` (Apache-2.0). Cite Stream-C G4.
P2.3 Pull CCBP upstream (local 5 commits stale at f28c2da → upstream a28cd96b) + refresh CLAUDE.md cite SHA. Cite Stream-D §1.
P2.4 mattpocock vendor-fork SHA-drift refresh (d54c497a → HEAD b8be62ff). Cite Stream-B §4.
P2.5 RETIRE alirezarezvani/claude-skills (313→48 description fabrication HOLDS per W330 axis-2). Cite Stream-B T4.

MANDATES (Δ-G49 Orchestrator-Worker):
- Each worker returns non-empty final-msg OR explicit NO-FINDINGS sentinel; empty=fail-CLOSED OrchestrationError.
- Re-dispatch ≤2× with stricter format reminder; escalate operator on 2nd empty.
- W269: ≥2 Agent calls in 1 message for multi-stream work; parallel_ratio ≥0.30 floor.
- Codex GPT-5.5 Phase-6 task --effort high on closure-synthesis BEFORE commit. APPROVE required.
- Cardinal-rules 1/2/3/4/5/6 hold; self_invented_count=0 invariant.
- Secret-redaction gate before any T6 basic-memory write (per W295-codex-r13).
- Every install: SLSA/Sigstore/license verify + transitive `npm ls`/`pip check` clean.

REPORT/SHIP:
- Each P0/P1 closure writes row to docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md + T6 basic-memory.
- Re-measure parallel_ratio after P0.1. Re-run /doctor expect 0 errors.
- Conventional commit: `feat(w341): SOTA-unleash close-out — parallel-guard regex + D73/Phase-6 mechanization + markitdown + Insights wave-close`.
- Cross-model gate session-end auto-fire (openai-codex/1.0.4 Stop hook, 900s timeout).

STOP: CLAUDE.md ≤50 LOC pointer-only invariant. No --no-verify. No silent fallback. Carry-forward to W342 requires explicit dwell-class annotation per ops-rhythm SKILL.md §1.1.
```

**Char count**: ~3680 of 3800 ceiling.

---

## §5 Architecture summary (operator-facing)

**Runtime layers** (from this audit):

```
┌─ Layer 0: Host OS ───────────────────────────────────────────┐
│  Windows 11 Pro · PowerShell 7.6.1 + Git Bash 5.x            │
│  Node 22.22.0 LTS · npm 11.9.0 · Python 3.13 (venv:Z:/venvs) │
│  Docker 29.4.3 · uvx 0.10.3 · ruff 0.15.13 · gitleaks        │
└──────────────────────────────────────────────────────────────┘
┌─ Layer 1: CC harness (anthropics/claude-code @ cc898dc3) ────┐
│  Slash: /branch /model /plan /compact /clear /resume /export │
│         /skills /agents /plugins /insights /recap /fork      │
│  Env: CLAUDE_CODE_FORK_SUBAGENT=1 · EXPERIMENTAL_AGENT_TEAMS │
│  Sandbox: Windows-native structurally-inert; R5 5-control    │
│           layered-defense (deny+audit+gitleaks+egress+drift) │
└──────────────────────────────────────────────────────────────┘
┌─ Layer 2: Plugins (57 enabled · 82 skills · 76 agents) ──────┐
│  CCBP-canonical · everything-claude-code · agent-teams       │
│  superpowers · andrej-karpathy-skills · addy-agent-skills    │
│  wshobson/agents · claude-plugins-official · codex (gpt-5.5) │
│  context-mode (mksglu) · serena (lsp) · output-ai            │
│  + 50 operator-curated local skills @ .claude/skills/*       │
└──────────────────────────────────────────────────────────────┘
┌─ Layer 3: MCP servers (14 in .mcp.json, all CR-9 pinned) ────┐
│  Research: deepwiki · perplexity · tavily · exa · hf · github│
│  KG/Code: serena · repomix · cognee · langfuse · basic-memory│
│  Browser: chrome-devtools · playwright                       │
│  Context: context-mode (ctx-search/execute/insight)          │
│  Gap (W341 P1): firecrawl · brave-search · arxiv-mcp         │
└──────────────────────────────────────────────────────────────┘
┌─ Layer 4: Hooks (19 active, all upstream-plugin or CLI) ─────┐
│  PreToolUse: parallel-guard · subagent-validator · gitleaks  │
│              context-mode router                             │
│  PostToolUse: trivy fs (advisory) · context-mode index       │
│  Stop: codex-review-gate (openai-codex/1.0.4)                │
│  SessionStart: context-mode bootstrap                        │
└──────────────────────────────────────────────────────────────┘
┌─ Layer 5: Memory (T1 retired; T6 canonical-primary) ─────────┐
│  T6 basic-memory (uvx-pinned) — verdicts, learnings, recall  │
│  T2-split: everything-claude-code:memory KG fallback         │
│  T3 cognee (NSSM :8000) — graph-rag                          │
│  T5 langfuse v3.160.0 (HTTP :3000) — observability           │
└──────────────────────────────────────────────────────────────┘
┌─ Layer 6: SOTA discipline (sca-v15, 80 dims, 5 phases) ──────┐
│  Phase 1 multi-MCP cascade · Phase 2 triangulation           │
│  Phase 3 anti-bias · Phase 4 weighted-sum · Phase 5 5-gate   │
│  Phase 6 codex GPT-5.5 position-swap · D-EMP HARD GATE       │
│  D76-D80 W340 (empty-msg+fail-CLOSED+budget+typed+independence)│
└──────────────────────────────────────────────────────────────┘
```

**SOTA repo rank-board** (top from Stream B):

1. anthropics/claude-cookbooks — T0 cite-only canonical (cookbook orchestrator patterns FULLY adopted)
2. wshobson/agents — T1 INSTALLED (comprehensive-review · context-management · agent-teams)
3. addyosmani/agent-skills (5-skill vendor-fork @ f17c6e88) — T1 INSTALLED
4. mattpocock/skills (10-skill vendor-fork @ d54c497a) — T1 INSTALLED (SHA-drift refresh P2.4)
5. OthmanAdi/planning-with-files — T1 INSTALLED (durable-planning-files + plan-*)
6. colbymchenry/codegraph — **T1-CONDITIONAL** (24h pilot W342)
7. mksglu/context-mode — T1-PROVISIONAL (Elastic 2.0 license-capped — pattern-only at hosted-redistribution)
8. abhigyanpatwari/GitNexus — **T3 PATTERN-STUDY** (PolyForm-NC blocker; local-cypher-codebase + serena cover)
9. HKUDS/CLI-Anything — T2-CHERRY (scope-mismatch)
10. alirezarezvani/claude-skills — **T4 RETIRE-HELD** (313→48 fabrication; W330 axis-2 holds)

---

## §6 Insights feature audit (operator's explicit Q)

**Anthropic-native Insights dashboard** (`claude.ai/analytics/claude-code`) is **server-side Team/Enterprise-only** — NOT applicable to this single-operator Z:-portable runtime. Local-equivalent surfaces:

| Surface | Tool | Status | Use case |
|---|---|---|---|
| `/insights` (slash) | CC built-in | INSTALLED | session-level inline summary |
| `/recap` (slash) | CC built-in | INSTALLED | last-N-turns recap |
| `/context-mode:ctx-insight` | context-mode plugin | INSTALLED (browser :4747) | tool-usage, parallel_ratio, errors, project-focus |
| `ccusage MCP` | mcp__ccusage__* | INSTALLED | programmatic per-block tokens + cost + burn-rate (verified: `costPerHour: 199.84`) |
| `session-report` skill | .claude/skills/session-report | INSTALLED | one-shot HTML retro |
| OTel → Langfuse T5 | Langfuse v3.160.0 :3000 | LIVE | observability — DEFER full wiring to W342+ |

**Gap is OPERATIONAL not WIRING** (Stream D §2). Recommended canonical: `/ctx-insight` for browser-dashboard exploration + `ccusage` for programmatic cost/burn-rate.

---

## §7 Next steps + execution plan

**Phase 1 (this session, ≤30 min)** — Execute autonomous P0/P1 with low blast-radius:
- P0.1 broaden MULTI_STREAM_RE regex (local file edit, reversible)
- P0.2 `pip install markitdown` (env install, low risk)
- P1.4 allowlist regen via existing tool

**Phase 2 (operator sign required)**:
- P0.3 phantom plugin uninstall/reinstall cycle (operator confirm — modifies plugin state)
- P0.4 + P0.5 hook additions (operator confirm — modifies `.claude/settings.json` hooks)
- P1.1 firecrawl + brave-search install (operator confirm — adds MCP servers)

**Phase 3 (W342)** — P1.3 CI workflows · P1.2 wave-close ritual · P2.1 codegraph pilot decision.

**Phase 6 codex gate**: auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37` timeout 900s on closure-synthesis.
