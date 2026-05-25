# W309 — Research-Arch Audit + Silent-Fallback Hunt + Multi-Angle SOTA Convergence

**Status**: ACTIVE  
**Started**: 2026-05-19  
**Branch**: `sota-converge-w295` (continuing — at-cap on worktrees @ 3)  
**Predecessor**: W308 (definitive arch synthesis shipped commits `1682fbf`+`609cba0`+`d4ae0e7`; ledger rows 26-31)  
**Mandate**: Operator request "is our research architecture full sota? ... silent fallbacks, errors? stale references, terminial errors,everything that can be optimized for your runtime, the entire ecosystem, including cli tools, docker command and much more, set up all with sota practice. gap resolute all,with gpt5.5 e2e, questions your rules, and repos selection."

## Goal predicate

W309 ships iff:

1. **Architecture self-eval** — sca-v5 architecture-itself rescored under v5 5-gate + position-swap; pass2pass invariant intact OR mandate-driven sca-v6 deltas authored
2. **Silent-fallback inventory** — runtime audit covers: hooks (settings.json + plugin-shipped) · MCP servers (live ping per server) · agent-teams orchestration (TaskCreate/SendMessage flow) · CLI tools (codex, gh, docker, python venv) · pre-commit gate · codex Stop-hook gate
3. **Named-repo deep-dive verdicts** — 5 repos (planning-with-files re-litigation closure · GitNexus · wshobson/agents · mattpocock/skills · anthropics/* org sweep) with sca-v5 audits ratified into the VERDICT-LEDGER
4. **Multi-angle SOTA discovery breadth** — multi-MCP cascade fires the FULL coverage matrix from sca-v5 §1 (≥7 MCP families for T2/T3 audits): github + exa + WebSearch + context7 + deepwiki + repomix + paper-search + HF + perplexity-equiv + agent-fan-out
5. **sca-v6 design** — at minimum 3 evolution deltas authored (one per mandate): (a) cardinal-rule-10 live-state-probe (W307 mandate carried) · (b) governance flag `re_enable_phase5_gate` binding settings.json:enabledPlugins (W308 row #31 mandate) · (c) MCP-coverage-gap dim (D22) for cascade-breadth measurement
6. **GPT-5.5 cross-model E2E** — codex `/codex:adversarial-review --wait` fired on W309 synthesis commit; HIGH+ findings closed in round-2 before ship-cleared

## Stream decomposition (4 parallel; file-ownership isolation)

| Stream | Owner | Output | Tool budget cap |
|---|---|---|---|
| **A — Silent-fallback hunt** | `general-purpose` agent | `W309-STREAM-A-SILENT-FALLBACK-HUNT.md` | $1.50 (live MCP probes + CLI smoke + hooks audit) |
| **B — sca-v6 design** | `general-purpose` agent | `W309-STREAM-B-SCA-V6-DESIGN.md` | $1.00 (rubric inverse-benchmark + new dim proposals) |
| **C — Named-repo deep-dive** | `general-purpose` agent | `W309-STREAM-C-NAMED-REPO-DEEP-DIVES.md` | $2.50 (5 sca-v5 audits at T2-T3 tier cap) |
| **D — Multi-angle SOTA discovery** | `general-purpose` agent | `W309-STREAM-D-MULTI-ANGLE-DISCOVERY.md` | $1.50 (full cascade fan-out + meta-research repos) |

## File ownership (no overlap)

- **Stream A**: `W309-STREAM-A-SILENT-FALLBACK-HUNT.md` + read-only inspection of `.claude/settings.json`, `.mcp.json`, `tools/*.ps1`, harness/
- **Stream B**: `W309-STREAM-B-SCA-V6-DESIGN.md` + read-only inspection of `.claude/skills/sota-convergence-audit/SKILL.md`
- **Stream C**: `W309-STREAM-C-NAMED-REPO-DEEP-DIVES.md` + `verdicts/W309-*.md` (basic-memory T6 writes)
- **Stream D**: `W309-STREAM-D-MULTI-ANGLE-DISCOVERY.md` + may write candidate-card stubs to `W309-STREAM-D-CANDIDATE-CARDS/`

## Integration points

- **Stream A → Stream B**: any cardinal-rule violations or hook silent-fallback that surface should feed sca-v6 R-X mandate
- **Stream C → Stream D**: any "this repo cites Y" should surface Y as a Stream-D discovery candidate
- **All → synthesis**: `W309-SYNTHESIS.md` + ledger row appends

## Codex gate

After synthesis commit: `claude --bg -- /codex:adversarial-review --wait`. HIGH/CRITICAL findings BLOCK ship; MEDIUM advisory per W308 precedent.

## Anti-patterns to avoid (from W308 lessons)

- Don't re-claim Phase-5 gates passed for prior-wave verdicts when strict-letter audit shows otherwise (W308 row #31 lesson)
- Don't silently re-enable a primitive via commit-msg-zero-mention edit (W308 row #31 lesson — sca-v6 governance flag mandate)
- Don't trust docs-only claims when LIVE STATE PROBE would surface differently (W307 row #27 Portkey "named-but-not-deployed" lesson — sca-v6 cardinal-rule-10 amendment)
- Stars are NOT a hard-gate (operator mandate) — D12 caps at 3 when only stars; pattern_score floor with high D2+D13 routes to T3 even if install_score weak

## Worktree-cap discipline (CLAUDE.md W280d)

3 worktrees active (main + W287-reconcile + W290). At-cap. W309 runs IN-PLACE on `sota-converge-w295` — no new worktree.
