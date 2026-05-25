# W304 — Incumbent-Replacement Convergence + 2026-May SOTA Fresh Discovery + GPT-5.5 Unleashed Integration

> **Wave**: W304
> **Branch**: `sota-converge-w295` (current HEAD `392328c` post-W301-install)
> **Predecessors**: W301 (shipped + 1 operator-action executed) · W302 (side-channel: serena KEEP-IMPROVED + Kuzu→LadybugDB + OpenRAG NO-INSTALL) · W303 (side-channel: coverage gap) · W301.E (side-channel: local-model + system-monitor SOTA sweep)
> **Started**: 2026-05-18
> **Rubric**: sca-v5 (active); sca-v6 designed in W301-D but DESIGN-ONLY pending operator §7
> **Operator mandate (verbatim)**:
> > "audit your architecture and monitor system status... using convergence sota insights challenge your current architecture itself and rules, NO BIASES. INTEGRATE SOTA RESEARCH WITH GPT5.5 UNLEASH AND RESEARCH DEPTH AND QUALITY MAXIMIZE... deep audit every dimensions and details... using the advanced improved research architecture re-audit your architecture from all dimensions, with next priority, system sota cleanness, agent orchestration, subagent tools use optimization including gpt5.5 tools usage as subagents or adversary review... what should be the next priority? which current repos adaption can be replaced by more sota repos? at newest ai landscape in 2026 MAY, no stale 2024 or even 2025 references as ai ecosystem shifing very fast, more actively maintenance high star community repos or org sdks repos sota active with muti dimension convergence consensus repos? find any setting or repos that can be replaced by better repos or pattern... gpt5.5 unleashed and sota adversary review."

## §0 TL;DR

W304 closes the operator's "next priority + incumbent-replacement + 2026-May freshness + GPT-5.5 unleashed" asks via 3 parallel streams + synthesis. Filter mandate: ≥2026-04-01 commit/release/paper dates for "fresh" claims; multi-MCP cascade per sca-v5; codex GPT-5.5 e2e gate.

## §1 Stream definitions

### Stream A — Incumbent-replacement convergence scan + W302/W303/W301.E side-channel digest

- **Owner**: `agent-A-incumbent-replacement`
- **Owned file**: `docs/architecture/W304-INCUMBENT-REPLACEMENT-AND-GPT55-UNLEASHED/W304-STREAM-A-INCUMBENT-REPLACEMENT.md`
- **Part 1 — read-only side-channel digest**: Read W302/W303/W301.E commits (`497cd88` + `c9a940b` per `git log`) + their corresponding wave-dir files (`docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/` and `W303-COVERAGE-GAP-AND-OPENRAG/`); summarize what they shipped (≤200 lines). Identify operator-action items they introduced.
- **Part 2 — incumbent-replacement scan**: For EACH of the 8 active T1 INSTALL ledger rows (rows 1, 2, 3, 12, 13, 14, 15, 16 — plus row 19 anthropics/skills just installed, total 9), search 2026-May-only SOTA for potential replacements:
  - Use github search with `pushed:>2026-04-01` filter for actively-maintained alternatives.
  - Use exa with semantic search "2026 May SOTA <capability>".
  - For each incumbent, return: (a) ≥1 challenger candidate with date-of-last-activity ≥2026-04-01, (b) preliminary sca-v5 lite scorecard vs incumbent, (c) replace / keep / hybrid verdict.
  - Specific incumbents to challenge: `OthmanAdi/planning-with-files` (T1 INSTALL but Phase-5 evidence pending — does a 2026-May challenger surface that closes the Phase-5 gap?); `anthropics/claude-agent-sdk-python`; `github/spec-kit`; `astral-sh/uv`; `oraios/serena` (W302 KEEP-IMPROVED — verify); `mem0ai/mem0` (NOT YET installed; should it be?); `anthropics/skills` (just installed).
- **Anti-bias guards**: stars NOT a hardgate; ≥3 candidates <500★ in your discovery set; ≥3 outside-USA orgs.
- **Deliverable**: ≤500 lines. Side-channel digest §1 + incumbent-replacement scan §2 with 9 verdicts.

### Stream B — 2026-May fresh SOTA discovery (multi-MCP cascade with freshness filter)

- **Owner**: `agent-B-fresh-discovery`
- **Owned file**: `docs/architecture/W304-INCUMBENT-REPLACEMENT-AND-GPT55-UNLEASHED/W304-STREAM-B-2026-MAY-FRESH-SOTA.md`
- **Mandate**: ≥10 NEW candidates outside ALL prior wave ledgers (W288/W291/W293/W295/W296/W298/W299/W300/W301), filtered by date-of-last-activity ≥2026-04-01 (last 6 weeks). Discovery via:
  - github search `sort:updated stars:>=10 pushed:>2026-04-01 <capability>`
  - exa semantic search "2026 May SOTA <capability>"
  - deepwiki ask_question for verification on top-3
  - perplexity (if installed; else WebSearch with `site:github.com after:2026-04-01`)
  - context7 resolve-library-id for canonical-docs presence
- **5 axes** (each ≥2 candidates):
  1. Agent orchestration frameworks (2026 May)
  2. Memory architectures (post-Letta/Cognee/Mem0; 2026 May)
  3. Research/discovery agents (post-Open-Deep-Research; 2026 May)
  4. Code-quality/audit tools (post-pyright/ruff; 2026 May)
  5. GPT-5.5 / LLM-as-judge harnesses (2026 May)
- **Anti-bias**: ≥3 <500★ + ≥3 outside-USA orgs; ≥1-per-top-10 from EACH MCP family fired.
- **Deliverable**: ≤500 lines. 10 NEW candidate cards + Top-5 ranked + anti-bias compliance table.

### Stream C — GPT-5.5 unleashed integration design + smoke-test

- **Owner**: `agent-C-gpt55-integration`
- **Owned file**: `docs/architecture/W304-INCUMBENT-REPLACEMENT-AND-GPT55-UNLEASHED/W304-STREAM-C-GPT55-UNLEASHED.md`
- **Mandate** (3 integration patterns):
  1. **GPT-5.5 as research-discovery subagent** — design: spawn `codex:codex-rescue` (the GPT-5.5 wrapper) in DISCOVERY mode (vs adversarial-review mode) for cross-model SOTA discovery. Codex hits 2026-May web search + returns candidates. Verify via 1 live smoke: dispatch codex-rescue with "find 3 fresh 2026-May SOTA repos for <capability X>" and validate output quality.
  2. **GPT-5.5 multi-judge ensemble at Phase-6** (per W301-D D-v6-1 SHIP-W302) — design protocol: 3 codex invocations with persona × evidence-order rotation; majority verdict; CI over verdict variance. Smoke-test: pick 1 existing ledger row (e.g. `mem0ai/mem0` T1-INSTALL-with-caveat row 16), fire 3-judge ensemble, verify reproducibility.
  3. **GPT-5.5 as stream-level adversarial reviewer** (vs current session-end-only) — design: hook codex-rescue at PostToolUse:Write for streams D/E (architecture-modifying streams) to provide mid-stream adversarial feedback. Cost-impact analysis.
- **Constraints**: integration patterns MUST be cardinal-rule-2-compliant (no self-invented hooks; only documented Anthropic CC hook surface + codex plugin commands).
- **Deliverable**: ≤500 lines. 3 integration designs + 1 live smoke-test transcript + cost-impact table.

## §2 Synthesis (orchestrator-owned)

After all 3 streams report:
1. Read each stream's deliverable.
2. Synthesise `W304-SYNTHESIS-2026-05-18.md` answering operator's "what should be the next priority?" question explicitly, with:
   - Top-3 incumbent-replacement candidates ranked by impact × effort.
   - Top-3 NEW SOTA candidates (2026-May fresh) for W305 full audit.
   - GPT-5.5 unleashed roadmap: which integration pattern to ship first, dependency chain.
   - W301 operator-action queue status (3 HIGH + 3 MEDIUM remaining); recommend execution order.
   - sca-v6 ship-readiness check post-W302+W303+W301.E (does the side-channel work address any v6 deltas?).
3. Apply ≤2 small in-tree fixes if Stream A/B surface them.
4. Dispatch codex GPT-5.5 e2e gate (codex:codex-rescue async).
5. Commit on APPROVE / REVISE-MEDIUM (per W288/W289 precedent).

## §3 Cardinal-rule invariants — must hold post-wave

- CLAUDE.md ≤ 50 LOC; settings.json ≤ 15 KB; ≤ 3 worktrees
- `self_invented_count: 0`
- T6 basic-memory + VERDICT-LEDGER.md ledger contract (sca-v5 3-target)
- codex `reviewGateEnabled: true`
- 6-tier memory contract unchanged (T1 + T2-split + T3 + T4-RETIRED + T5 + T6)

## §4 Anti-bias mandate enforcement (W304)

- **Freshness filter**: only references with date ≥2026-04-01 count as "fresh evidence"; older refs are CITE-ONLY context.
- **Stars-not-hardgate**: enforced via sca-v5 D12 cap at 3 when stars-only; D6 Bayesian author-prior.
- **MCP-family ≥1-per-top-10**: enforced in Stream B top-10 ranking.
- **No-biases**: all 3 streams subject to codex GPT-5.5 adversarial review at synthesis time.
