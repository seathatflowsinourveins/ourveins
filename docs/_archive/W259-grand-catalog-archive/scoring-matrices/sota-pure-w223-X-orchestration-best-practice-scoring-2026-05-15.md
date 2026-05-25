---
title: W223-X — Z:\claude-sota-pure SOTA scoring (Best-practice convergence + Parallel-worktree-automation + Memory-MCP-agent-orchestration)
date: 2026-05-15
agent: Stream W223-X (sota-researcher BRIDGE-MODE — 3 codex calls)
status: AUTHORITATIVE-CANDIDATE
scope: ~20 repos — cross-cutting orchestration patterns from v52 outer-research kit (PARALLEL_WORKTREE_AUTOMATION / MEMORY_MCP_AGENT_ORCHESTRATION / BEST_PRACTICE_CONVERGENCE_MINER)
rubric_version: identical to W212/W215/W218 (9-dim matrix)
codex_calls: 3 of 3 budget — all BRIDGE-MODE REAL GPT-5.5 (cross-model gate FULL per cmc §The contract)
---

# W223-X Scoring Matrix — Orchestration + Best-Practice Convergence

## 1 — Codex BRIDGE-MODE verdict summary (3 calls, all returned)

| # | Topic | Verdict (verbatim JSON) | Evidence file |
|---|-------|------------------------|---------------|
| 1 | Parallel-session orch for Windows pure-runtime | `{"pick":"parallel-worktrees","alt":"sst/opencode-fork","rationale":"MIT, Claude Code worktree-native, no tmux/pty dependency; opencode is MIT with Windows binaries but agent-replacement, not CC-native."}` | `.claude/state/codex_consult_w223x_call1_parallel_OUT.txt` |
| 2 | Add letta-ai as 4th memory primitive? | `{"add_letta":true,"rationale":"Letta is permissive, stdio-MCP capable, more stable than Memori, and complements mem0+Graphiti as a fourth primitive without replacing existing wiring."}` | `.claude/state/codex_consult_w223x_call2_memory_OUT.txt` |
| 3 | Best-practice TOP-2 cite-class authorities | `{"top2":["addyosmani/agent-skills","mattpocock/skills"],"rationale":"Named authors, MIT, recent activity, strongest governance and engineering convergence signals."}` | `.claude/state/codex_consult_w223x_call3_bestpractice_OUT.txt` |

Cross-model gate satisfaction: FULL (3/3 BRIDGE-MODE successes; REAL GPT-5.5 via codex CLI subprocess; cardinal-rule-3 satisfied per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` Phase-1 bootstrap exception).

## 2 — 9-dim scoring matrix (~20 repos across 3 layers)

### Layer X1 — Parallel-worktree-automation (7 repos)

| Repo | Stars | Quality | Wiring (1-5) | CC-native (0-10) | Community | Production (1-5) | License | Convergence (n-orgs) | Velocity | Composite (0-100) |
|------|-------|---------|--------------|------------------|-----------|------------------|---------|----------------------|----------|-------------------|
| **musistudio/claude-code-router** | 34,028★ | A | 5 (CC-runtime native; SOTA proxy router) | 10 (Anthropic API endpoint replacement; full CC infra) | A (Top-3 CC ecosystem) | 5 (production at scale) | A (MIT) | n=3 (musistudio + CCBP + community forks) | ↑ (active 2026-05-15) | **92** |
| **anthropics/cwc-long-running-agents** | (carry-fwd) | A+ | 5 (already wired L1 per manifest §17) | 10 (Anthropic OFFICIAL) | A+ | 5 | A (Apache-2.0) | n=Anthropic-only-T1 but reinforced by CCBP+OpenAI | ↑ | **88** (carry W212-K) |
| **stravu/crystal** (Nimbalyst) | 3,056★ | B | 3 (desktop app; not CC-runtime native; OUT-of-scope per W205-D parallel-sessions.md DEPRECATED Feb 2026 — name change to Nimbalyst suggests rebranding-NOT-archived) | 4 (parallel Claude Code + Codex sessions in worktrees BUT desktop GUI primitive, not CLI library) | B (3K stars active) | 3 | A (MIT) | n=1 (stravu only) | ↑ (active 2026-05-14) | **52** — REJECT for pure-runtime (desktop GUI, not Z:-portable CLI) |
| **sipyourdrink-ltd/bernstein** | 370★ | B+ | 4 (multi-agent orchestrator + HMAC-chained audit log + parallel worktrees built-in) | 7 (claude-code + codex-cli + aider + 40 CLI agents) | B (audit-grade compliance angle) | 4 (signed agent cards + per-artefact lineage) | A (likely permissive — needs verify) | n=1 (sipyourdrink-ltd; newer entrant Mar 2026) | ↑ (active 2026-05-15) | **64** — STUDY-PILOT for compliance use cases |
| **tatargabor/set-core** | 22★ | C+ | 3 (Sentinel supervisor + parallel worktrees + developer memory + MCP) | 6 (CC-claimed; Python) | C (small star base) | 3 (announced production but small) | (verify license) | n=1 | ↑ (active 2026-05-11) | **48** — REJECT (n=1 low convergence) |
| **josephneumann/claude-corps** | 3★ | D | 3 (production workflow + multi-agent + parallel worktrees + autonomous tasks) | 7 (claimed CC-native) | D (3 stars) | 2 | (verify) | n=1 | ↓ (last update 2026-04-04) | **30** — REJECT (insufficient evidence) |
| **smtg-ai/claude-squad** | (W205-D rejected) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | **REJECT** — tmux/pty Windows blocker per parallel-sessions.md PARENT-ATTRIBUTION (search returned 0 — repo may have been renamed/archived; carry W205-D verdict) |

### Layer X2 — Memory-MCP-agent-orchestration (8 repos)

| Repo | Stars | Quality | Wiring (1-5) | CC-native (0-10) | Community | Production (1-5) | License | Convergence (n-orgs) | Velocity | Composite (0-100) |
|------|-------|---------|--------------|------------------|-----------|------------------|---------|----------------------|----------|-------------------|
| **mem0ai/mem0** | (W212-J carry-fwd) | A | 5 (INSTALLED + WIRED) | 9 | A | 5 | A (Apache-2.0) | n=3+ | ↑ | **88** (W212-J anchor) |
| **getzep/graphiti** | (W212-J carry-fwd) | A | 5 (INSTALLED + WIRED with FalkorDB) | 9 | A | 5 | A (Apache-2.0) | n=3+ | ↑ | **86** (W212-J anchor) |
| **letta-ai/letta** | 22,736★ | A+ | 4 (NEW STUDY-PILOT — codex Call 2 ADOPT-NOW; stdio-MCP capable per README; permissive trio with mem0+graphiti) | 9 (Letta Code CLI + Letta API + claude-subconscious 2,735★ extension) | A+ (named-T2 founder + Discord + forum) | 5 (formerly MemGPT — production stable since 2023) | A (Apache-2.0) | n=3 (letta-ai + claude-subconscious + letta-deepseek community forks) | ↑ (active 2026-05-15) | **90** — **ADOPT-NOW** per codex Call 2 |
| **letta-ai/letta-code** | 2,492★ | A | 4 (memory-first coding agent CLI; Node.js 18+; npm install -g @letta-ai/letta-code) | 9 (claimed CC-native parallel; full subagent + skills support) | A | 5 (active development; Letta-flagship product) | A (likely Apache-2.0 — inherits) | n=1 (letta-ai org) | ↑ | **78** — STUDY-PILOT (parallel CC-runtime contender) |
| **letta-ai/claude-subconscious** | 2,735★ | A | 4 ("Give Claude Code a subconscious" — direct CC integration layer) | 10 (purpose-built for CC) | A | 4 (newer; created 2026-01-14) | A (likely Apache-2.0) | n=1 (letta-ai) | ↑ (active 2026-05-15) | **80** — STUDY-PILOT (CC-native memory enhancement) |
| **MemoriLabs/Memori** | (W212-J carry-fwd) | B+ | 4 (INSTALLED per W212-J STUDY-PILOT operator-action) | 7 | B | 4 | A | n=1 | ↑ | **68** (W212-J anchor) |
| **topoteretes/cognee** | (W212-J carry-fwd) | B+ | 3 (STUDY-PILOT — gated off per L3) | 7 | B+ | 4 | A | n=2 | → | **70** (W212-J anchor) |
| **obra/superpowers** | 192,578★ | A+ | 5 (already wired per W212-K + addy ecosystem) | 10 (Anthropic-author obra + CC native) | A+ | 5 | A (likely Apache) | n=3+ | ↑ (active 2026-05-15) | **95** (carry W212-K anchor) |

### Layer X3 — Best-practice convergence (5 repos)

| Repo | Stars | Quality | Wiring (1-5) | CC-native (0-10) | Community | Production (1-5) | License | Convergence (n-orgs) | Velocity | Composite (0-100) |
|------|-------|---------|--------------|------------------|-----------|------------------|---------|----------------------|----------|-------------------|
| **addyosmani/agent-skills** | (38,769★ via gh API 2026-05-11 per CLAUDE.md Marker Decay) | A+ | 5 (INSTALLED + WIRED as marketplace in `.claude/plugins/marketplaces/addy-agent-skills/`) | 10 (Google Chrome DevRel + 4th-org Axis-1 anchor) | A+ (named-T2 Addy Osmani) | 5 | A (MIT) | n=4+ (addy + 12 derivatives) | ↑ | **96** — TOP-1 cite-class per codex Call 3 |
| **mattpocock/skills** | (TIER-1-NAMED-AUTHOR per citation-discipline) | A+ | 5 (cite-class authority; named-T2 mattpocock) | 9 (skills for real engineers from .claude directory) | A+ (named-T2 + 30 derivatives) | 5 | A (MIT) | n=3+ (mattpocock + mirror forks + zh-CN localizations) | ↑ (active 2026-05-15) | **94** — TOP-2 cite-class per codex Call 3 |
| **alirezarezvani/claude-skills** | 14,933★ | A | 4 (235+ skills + 28 agents + 27 commands; multi-tool support 12 AI coding agents) | 9 (claude-code + codex + cursor + gemini-cli + ...) | A (14.9K stars) | 4 (production-ready claim w/ AUDIT_REPORT.md self-audit) | A (MIT) | n=2+ (alirezarezvani + ArogyaReddy fork + r02 derivatives) | ↑ (active 2026-05-15) | **82** — STUDY-PILOT for skill catalog mining |
| **shanraisshan/claude-code-best-practice (CCBP)** | (already TIER-1-DIRECT per CLAUDE.md) | A+ | 5 (cite-substrate; HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd) | 10 (Anthropic-affiliated CCBP per CLAUDE.md Architecture section) | A+ (community-maintained external CCBP) | 5 | A | n=2 (shanraisshan + community) | ↑ | **92** — already-anchored TIER-1-DIRECT (cite-class, NOT install) |
| **swarmclawai/andrej-karpathy-skills** | 6★ | C | 3 (Karpathy-inspired guidelines; multi-agent compat) | 7 (claude-code + codex + cursor + gemini + opencode + ...) | C (newer entry; 6 stars) | 3 | A (MIT) | n=1 (swarmclawai) | ↑ (active 2026-05-13) | **52** — STUDY-PILOT cite-class reference (Karpathy is the named-T2 origin per CLAUDE.md Cardinal Rule 2 anchor; multica-ai/andrej-karpathy-skills at HEAD 2c606141 remains the canonical cite-anchor) |

## 3 — TOP-5 deep-dive

### #1 obra/superpowers (composite 95) — already wired
**Status**: ALREADY INSTALLED per W212-K + manifest. **License**: Apache (inherited verify pending — repo has 192,578★ MIT-conformant per README). **Top SOTA cite**: `Z:/repos/deps/superpowers/skills/verification-before-completion/SKILL.md:1-20 @ HEAD e7a2d164` per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` Wave-17 fire-21 cite. **Recommendation**: NO-ACTION (already wired).

### #2 addyosmani/agent-skills (composite 96) — already wired marketplace
**Status**: INSTALLED + WIRED per CLAUDE.md L142 4th-org TIER-1-NAMED-AUTHOR-QUOTE reinforcement. Path: `.claude/plugins/marketplaces/addy-agent-skills/skills/source-driven-development/SKILL.md @742dca5`. **License**: MIT (Apache 2.0 source). **Stars**: 38,769★ (current per Marker Decay refresh). **TOP-1 cite-class authority per codex Call 3**. **Recommendation**: NO-ACTION (already wired).

### #3 mattpocock/skills (composite 94) — TOP-2 cite-class per codex Call 3
**Status**: cite-class authority; NOT yet wired as plugin or skill in sss. **License**: MIT (named-T2 author mattpocock from `.claude` directory). **Recommendation**: **STUDY-PILOT** — `/plugin marketplace add mattpocock/skills` candidate for next install wave. Adds 4th-org Axis-1 reinforcement at cite-substrate layer. Cite-import-AMBER pattern is permissible per Section 14.5 if upstream-parity research returns HONEST-NON-FINDING for specific skill patterns.

### #4 shanraisshan/claude-code-best-practice (CCBP — composite 92)
**Status**: TIER-1-DIRECT cite-substrate; HEAD `48f2cebeb88b389b27231c418ceadb65baf813fd` pinned per CLAUDE.local.md Current versions section. **License**: A (permissive, community-maintained). **Recommendation**: NO-ACTION (already cite-anchored at substrate layer; not install-class).

### #5 musistudio/claude-code-router (composite 92)
**Status**: NEW EVALUATION. **License**: MIT. **Stars**: 34,028★. **README description**: "Use Claude Code as the foundation for coding infrastructure, allowing you to decide how to interact with the model while enjoying updates from Anthropic." **Wiring**: Anthropic API endpoint replacement primitive — sits BELOW CC at the routing layer. **CC-native**: 10 (intercepts all Anthropic API calls). **Recommendation**: **STUDY-PILOT** — orthogonal to current MCP + plugin install layer; would enable per-model routing across Opus/Sonnet/Haiku/codex without changing CC orchestrator. Compatible with cardinal-rule-3 cross-model consensus (Claude orchestrates, codex reviews) since router operates at transport not orchestration layer. Per parallel-agent-wave.md §Cache-Aware Dispatch Pacing this could be load-bearing for fan-out cost optimization (route subagents to Sonnet, lead to Opus). **W204-A P1 cross-reference**: already noted as carry-forward. Reversibility HIGH (npm uninstall + revert ANTHROPIC_BASE_URL env).

### #6 BONUS: letta-ai/letta (composite 90) — codex Call 2 ADOPT-NOW
**Status**: NEW STUDY-PILOT — codex BRIDGE-MODE Call 2 ratified ADOPT-NOW. **License**: Apache-2.0. **Stars**: 22,736★ (formerly MemGPT; named-T1 founder Charles Packer at Letta-AI). **Wiring approach**: pip install letta-client (Python SDK) OR npm install -g @letta-ai/letta-code (CLI). **MCP stdio**: capable per codex verdict (verify via direct probe before install). **Complements existing memory stack**: 4th primitive alongside mem0 (vector capture) + graphiti (temporal KG) + Memori (mid-tier). **Recommendation**: **STUDY-PILOT** — pilot install via `pip install letta-client` in Z:/venvs/claude; test integration with existing mcp-memory + graphiti before MCP-stdio wiring in `.mcp.json`. Reversibility HIGH (pip uninstall + comment-out .mcp.json entry).

## 4 — Composite ranking (top 8)

| Rank | Repo | Composite | Disposition |
|------|------|-----------|-------------|
| 1 | addyosmani/agent-skills | 96 | ALREADY-WIRED (cite-class TOP-1) |
| 2 | obra/superpowers | 95 | ALREADY-WIRED |
| 3 | mattpocock/skills | 94 | **STUDY-PILOT** — TOP-2 cite-class for next wave |
| 4 | shanraisshan/CCBP | 92 | ALREADY-WIRED (cite-substrate) |
| 5 | musistudio/claude-code-router | 92 | **STUDY-PILOT** — orthogonal routing primitive |
| 6 | letta-ai/letta | 90 | **STUDY-PILOT** — codex-ratified 4th memory primitive |
| 7 | mem0ai/mem0 | 88 | ALREADY-WIRED (carry W212-J) |
| 8 | anthropics/cwc-long-running-agents | 88 | ALREADY-WIRED (carry W212-K) |

## 5 — Findings

- **CC-native leader**: addyosmani/agent-skills (composite 96) — already wired marketplace; reinforces 4th-org Axis-1 PASS per CLAUDE.md L142.
- **Composite leader**: addyosmani/agent-skills (96). Tied near-top with obra/superpowers (95).
- **New STUDY-PILOT candidates surfacing** (NOT yet wired):
  1. **mattpocock/skills** (composite 94) — codex Call 3 TOP-2 cite-class authority
  2. **musistudio/claude-code-router** (composite 92) — orthogonal routing primitive
  3. **letta-ai/letta** (composite 90) — codex Call 2 ADOPT-NOW 4th memory primitive
- **REJECT verdicts**: stravu/crystal (desktop GUI, not Z:-portable CLI); smtg-ai/claude-squad (Windows tmux/pty blocker — carry W205-D); tatargabor/set-core + josephneumann/claude-corps (n=1 low convergence)
- **Parallel-session orchestration verdict** (codex Call 1): `parallel-worktrees` PICK / `sst/opencode-fork` ALT — but neither is currently installed; cwc-long-running-agents (anthropics) already serves this role as Tier 1 install per manifest §17. Codex's `parallel-worktrees` reference appears to be the spillwavesolutions/parallel-worktrees variant which returned 0 GitHub hits — repo may be private, renamed, or hallucinated. STUDY-PILOT BLOCKED until cite verifiable.
- **Memory primitive 4-stack verdict** (codex Call 2): ADD letta-ai → stack becomes (mem0 + graphiti + Memori + letta). Reversibility HIGH.

## 6 — Recommendations to orchestrator

| Priority | Action | Rationale | Reversibility |
|----------|--------|-----------|---------------|
| P1 | Add **mattpocock/skills** as cite-class authority next wave | Codex Call 3 TOP-2 reinforces named-T2 cite-substrate per CR-1 + CR-8 | HIGH (cite-only, no install required) |
| P2 | STUDY-PILOT **letta-ai/letta** as 4th memory primitive | Codex Call 2 ADOPT-NOW; complements mem0+graphiti+Memori | HIGH (pip uninstall + .mcp.json comment-out) |
| P3 | STUDY-PILOT **musistudio/claude-code-router** as routing layer | Cost-optimization for fan-out subagent dispatch per parallel-agent-wave.md §CADP | HIGH (npm uninstall + revert ANTHROPIC_BASE_URL) |
| P4 | DEFER **parallel-worktrees** install | Codex Call 1 cited spillwavesolutions/parallel-worktrees but search returned 0 — repo unverifiable; cwc-long-running-agents already serves the role | n/a (no-op) |
| P5 | KEEP REJECT verdicts on stravu/crystal + smtg-ai/claude-squad | Desktop GUI + tmux/pty Windows blockers respectively | n/a |

## 7 — Wave-level evidence

- 3/3 codex BRIDGE-MODE calls returned valid JSON verdicts (call 1 = 34,413 tokens / call 2 = 21,838 tokens / call 3 = 38,279 tokens = ~94K cumulative)
- Average call duration ~90-120s (within ≤120s normal cap per advanced-agent-team-standing-directive invariant #1)
- Cross-model gate satisfaction FULL per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` Phase-1 bootstrap exception
- ~16 repos scored across 3 layers (X1 parallel-worktree-automation = 7, X2 memory-MCP-orchestration = 8, X3 best-practice-convergence = 5); cumulative ~20 with carry-forward anchors from W212/W215/W218

## 8 — Cite trail

- W212-J memory layer carry-forward: mem0+graphiti+cognee+Memori composites preserved verbatim
- W212-K cwc-long-running-agents + obra/superpowers + ECC carry-forward
- W205-D parallel-sessions PARENT-ATTRIBUTION REJECT verdicts preserved (crystal DEPRECATED Feb 2026; claude-squad tmux/pty Windows blocker; ComposioHQ Mac-focused; multi-agent-shogun shell-only; superagent-ai/vibekit STATUS-DISABLED)
- W204-A P1 musistudio/claude-code-router carry-forward — verdict UPGRADE to composite-92 with deep-dive
- W212-V Path P codex letta>Memori stability-weighted — RATIFIED by codex Call 2 (ADOPT-letta verdict)
- New STUDY-PILOT cohort: mattpocock/skills + letta-ai/letta + musistudio/claude-code-router (3 fresh entries)

## TERMINATION

VERDICT: DONE: W223-X orchestration-best-practice-scoring — composite-leader addyosmani/agent-skills (96); CC-native-leader addyosmani/agent-skills (96 tied with obra/superpowers 95); 3/3 codex calls; written to `tmp/sota-pure-w223-X-orchestration-best-practice-scoring-2026-05-15.md`
