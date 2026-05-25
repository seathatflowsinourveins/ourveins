# W315-C Area 02 — Multi-Agent Orchestrators (Triangulated MCDA Matrix)

**Wave**: W315 · **Stream**: C · **Date**: 2026-05-19 · **Cohort**: Parallel-execution + multi-agent orchestration
**Methods**: WSM + Borda + ELECTRE I per `W315-C-MCDA-METHODOLOGY.md`

---

## §1 Cohort declaration

**Slot**: parallel-work primitive (subagents, agent-teams, DAG orchestration, swarms).

**Incumbent**:
- **wshobson/agents** `agent-teams@claude-code-workflows` v1.0.2 SHA `08ded5e` — installed, W312 T2 VENDOR-FORK status. Anthropic-canonical primitives: `Agent` tool (forked subagent), `TeamCreate`/`TaskCreate`/`SendMessage` (main-session-lead-only per by-design), `EnterWorktree` (per-session isolation), `claude --bg` (background sessions).

**Challengers** (W314-D + W313-D + W315 surfaced):
- **A. `yeshuibo/agentflow`** — DAG-graph orchestration (`fanout`/`merge`/`on_failure`) + cross-LLM (claude+codex+kimi). **Borda Cohort-2 winner W314-D (26 pts)**.
- **B. `affaann-m/claude-swarm`** — same operator as ECC; Director/Worker hierarchy + Opus Quality Gate + file-lock + JSONL replay.
- **C. `mohsen1/claude-code-orchestrator`** — Director/EM/Workers hierarchical pattern.
- **D. `dlorenc/multiclaude`** — tmux-MMORPG-style window-coord orchestration.
- **E. `OpenHands` (formerly OpenDevin)** — full devbox sandbox, autonomous codebase agent.
- **F. `daytonaio/daytona`** — devcontainer / sandbox manager (orchestration adjacent).

**SOTA bar**: 
- Native parallel-dispatch (≥2 agents in 1 message) — measurable via parallel_ratio telemetry (W312-D baseline 58.4%; target ≥0.7 per W269 mandate).
- W269 anti-silent-fallback compliance.
- CR-2-compliant (plugin-shipped hooks only; no project-owned hook bodies).
- Per Anthropic `https://code.claude.com/docs/en/sub-agents` + `https://docs.anthropic.com/en/docs/claude-code/hooks` canonical.

---

## §2 Multi-dimensional score matrix

| Candidate | D5 | D7 | D10 (vs agent-teams) | D13 | D14 | D17 | D24 | D28 | ★ | HF | △ | CR9 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **agent-teams** (incumbent) | 5 | 5 | 5 (self) | 4 | 5 | 4 | 5 | 5 | 5 (35k★) | **5** | 0 | 5 |
| **agentflow** (chall A) | 3 | 4 | **3** (DAG distinct) | 5 | 4 | 3 | 4 | 4 | 2 (200★) | 3 | 0 | 3 |
| **claude-swarm** (chall B) | 3 | 4 | 2 (Director-overlap) | 4 | 4 | 3 | 4 | 4 | 2 (500★) | 3 | 0 | 3 |
| **claude-orchestrator** (chall C) | 3 | 4 | 2 (Director-overlap) | 4 | 4 | 3 | 4 | 4 | 2 (400★) | 3 | 0 | 3 |
| **multiclaude** (chall D) | 3 | 4 | 2 (tmux-overlap) | 4 | 3 | 3 | 3 | 4 | 2 (150★) | 2 | 0 | 3 |
| **OpenHands** (chall E) | 4 | 5 | 2 (broader sandbox-scope) | 4 | 3 (devbox sandbox-coupled) | 4 | 3 (devbox isolation) | 4 | 5 (50k★) | 2 | 0 | 4 |
| **daytona** (chall F) | 4 | 5 | 2 (sandbox-adjacent) | 4 | 4 | 4 | 4 | 4 | 4 (12k★) | 2 | 0 | 4 |

**Notes on scoring**:
- `agent-teams` D10=5-self (NOT compared against itself); the column reads "duplication risk **vs** incumbent" — incumbent gets 5 by convention. Challengers score 2-3 here per axis-overlap analysis.
- `agentflow` D10=3 — genuinely distinct DAG primitives (`fanout`/`merge`/`on_failure`) not present in agent-teams.
- `claude-swarm` D10=2 — directly overlaps the agent-teams Lead/Worker pattern.
- `OpenHands` D10=2 — broader scope (full dev sandbox) so coverage overlaps but most users would NOT run agent-teams INSIDE OpenHands.
- `agent-teams` HF=5 (installed-pattern-equivalent — CC native `Agent`/`TeamCreate`/`SendMessage` primitives are the same family).

---

## §3 Method 1: WSM (sca-v7 install_score)

| Candidate | install_score | Hard-cap? | Tier |
|---|:-:|:-:|:-:|
| **agent-teams** | **4.66** | none | **T2 VENDOR-FORK (current, W312 UPGRADE)** |
| OpenHands | 4.05 | sandbox-couples too tightly — D14 reversibility cap | **T3 PATTERN-STUDY** (sandbox-adjacent reference, not orchestrator replacement) |
| daytona | 3.95 | D10 sandbox-adjacent | **T3 PATTERN-STUDY** |
| agentflow | 3.85 (cascade-degraded for T1 — W314-D | D5+D27 cascade-degraded | **T2 VENDOR-FORK additive** |
| claude-swarm | 3.65 | D10=2 overlap | **T3 PATTERN-STUDY** |
| claude-orchestrator | 3.55 | D10=2 + solo | **T3 PATTERN-STUDY** |
| multiclaude | 3.40 | D10=2 + D14 tmux-coupled | **T3 PATTERN-STUDY** |

**WSM ranking**: 1. agent-teams · 2. OpenHands · 3. daytona · 4. agentflow · 5. claude-swarm · 6. claude-orchestrator · 7. multiclaude.

---

## §4 Method 2: Borda Count

8 dims (D5, D7, D10, D13, D14, D17, D24, D28). N=7 candidates → top rank = 7 pts:

| Candidate | D5 | D7 | D10 | D13 | D14 | D17 | D24 | D28 | Borda Σ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **agent-teams** | 7 | 6.5 | 7 | 4 | 7 | 6.5 | 7 | 6.5 | **51.5** |
| **OpenHands** | 5.5 | 6.5 | 2 | 4 | 1.5 | 6.5 | 1.5 | 4 | **31.5** |
| **daytona** | 5.5 | 6.5 | 2 | 4 | 5.5 | 6.5 | 5.5 | 4 | **39.5** |
| **agentflow** | 2 | 3 | 6 | 7 | 5.5 | 2 | 5.5 | 4 | **35** |
| **claude-swarm** | 2 | 3 | 4 | 4 | 5.5 | 2 | 5.5 | 4 | **30** |
| **claude-orchestrator** | 2 | 3 | 4 | 4 | 5.5 | 2 | 5.5 | 4 | **30** |
| **multiclaude** | 2 | 3 | 4 | 4 | 1.5 | 2 | 1.5 | 4 | **22** |

**Borda ranking**: 1. agent-teams (51.5) · 2. daytona (39.5) · 3. agentflow (35) · 4. OpenHands (31.5) · 5. claude-swarm = claude-orchestrator (30 tied) · 7. multiclaude (22).

**Notable**: Borda lifts `daytona` ABOVE `OpenHands` (D24+D14 maintain favourable axes); WSM had OpenHands #2 on D5+D7 strength alone. **First sign of MCDA-method-disagreement** — but not at rank-1.

---

## §5 Method 3: ELECTRE I

Concordance + discordance (compressed view at top):

**Concordance**: agent-teams outranks every challenger with `C ≥ 0.81`. Challengers form a partial order below.

**Outranking** (`C ≥ 0.65, D ≤ 0.50`):
- agent-teams → ALL 6 challengers ✓
- daytona → claude-swarm, claude-orchestrator, multiclaude (C≥0.75, D≤0.25)
- OpenHands → multiclaude (C=0.69, D=0.50)
- agentflow → claude-swarm, claude-orchestrator, multiclaude (D13=5 carries it past tied D5/D7)
- claude-swarm ⇄ claude-orchestrator (mutual outranking — **incomparable**)

**Kernel** = **{agent-teams}** — clean singleton at top.
**Second tier**: {agentflow, daytona, OpenHands} pairwise-incomparable (each outranks different subsets).
**Bottom**: {multiclaude} dominated by all.

---

## §6 Triangulation summary

| Method | Rank-1 | Rank-2 | Rank-3 | Rank-4 |
|---|---|---|---|---|
| **WSM** | agent-teams | OpenHands | daytona | agentflow |
| **Borda** | agent-teams | daytona | agentflow | OpenHands |
| **ELECTRE I** | {agent-teams} | {agentflow, daytona, OpenHands} pairwise-incomparable | claude-swarm ⇄ claude-orchestrator | multiclaude |

**Disagreement detection**:
- **Rank-1**: agreement on `agent-teams` ✓
- **Rank-2-4**: SUBSTANTIVE DISAGREEMENT — WSM (OpenHands · daytona · agentflow) vs Borda (daytona · agentflow · OpenHands) vs ELECTRE (3-element incomparable cluster).
- **Per W315-C §5**: this is **HYBRID-ADOPT-eligible** — the 3 challengers each occupy distinct **axes**:
  - **agentflow** = DAG primitives axis (`fanout`/`merge`/`on_failure`) — orthogonal to agent-teams
  - **OpenHands** = full sandbox axis — orthogonal scope
  - **daytona** = devcontainer manager — orthogonal infrastructure

---

## §7 Cohort verdict — **KEEP-INCUMBENT (agent-teams) + HYBRID-ADOPT (agentflow DAG pattern)**

**Rank-1 unanimity** on `agent-teams` — the W312 UPGRADE-from-T3 to T2 holds; SHA `08ded5e` pinned per W314-D row #53; W289 silent-drift CLOSED.

**No SWITCH recommendation** — agent-teams' integration with Anthropic-canonical primitives (`Agent` tool, `EnterWorktree`, `TeamCreate`) gives it CR-2/CR-3 compliance no challenger can match without a fundamental architectural break.

**HYBRID-ADOPT for agentflow**:
- W314-D ranked it Cohort-2 winner (Borda 26 within W314-D's own narrower cohort).
- W315 broader cohort with OpenHands+daytona: still rank-2 by Borda; rank-3 by WSM.
- ELECTRE I incomparability at the 2nd tier confirms orthogonality with agent-teams.
- **Recommendation**: do NOT install agentflow as plugin (D10 risk + cascade-degraded D5/D27); extract DAG-primitive pattern as a **local-skill** `.claude/skills/agentflow-dag/SKILL.md` that wraps the existing `Agent` + `Task` primitives in a `fanout`/`merge`/`on_failure` decorator.

**Don't pursue further**:
- `OpenHands` — full sandbox is scope-mismatch; outside Anthropic Claude Code envelope.
- `claude-swarm` / `claude-orchestrator` / `multiclaude` — all direct agent-teams duplicates with D10=2 hard-cap.
- `daytona` — adjacent infrastructure layer, not orchestration replacement.

---

## §8 MCDA-disagreement finding flagged for sca-v7.1

This cohort is the **clearest case** of MCDA-method-disagreement in W315-C (3 different rank-2 candidates across 3 methods). Per `W315-C-MCDA-METHODOLOGY §5`:

> **Substantive disagreement** (≥2 ranks swap, OR rank-1 differs across methods): → sca-v7 D33 `quorum_unmet` AUTO-FIRES + codex GPT-5.5 mediation + verdict tier soft-demoted by 1 (T1 → T2 etc.) until mediation resolves.

**Applied**: each of the 3 second-tier candidates `agentflow / OpenHands / daytona` would auto-demote to T3 PATTERN-STUDY-eligible under sca-v7.1 strict-letter (rank-2 disagreement substantive). Codex mediation queued as W316-AI.

---

## §9 Multi-dim comparability table

| Candidate | ★ | HF | △ | CR9 | Live? | Specialty axis |
|---|:-:|:-:|:-:|:-:|:-:|---|
| **agent-teams** | 5 (35k★) | **5** (CC-native + plugin-shipped) | 0 | **5** (SHA-pinned) | ✓ T2 | Native subagent fork + Lead/Worker pattern |
| **OpenHands** | 5 (50k★) | 2 (web devbox; CC-incompatible env) | 0 | 4 | ✗ | Full autonomous codebase agent sandbox |
| **daytona** | 4 (12k★) | 2 (devcontainer manager; orthogonal infra) | 0 | 4 | ✗ | Sandbox lifecycle (parallel dev envs) |
| **agentflow** | 2 (200★) | 3 (skill/plugin extractable) | 0 | 3 | ✗ | DAG orchestration + cross-LLM bridging |
| **claude-swarm** | 2 (500★) | 3 | 0 | 3 | ✗ | Director/Worker hierarchy + Opus gates |
| **claude-orchestrator** | 2 (400★) | 3 | 0 | 3 | ✗ | Director/EM/Workers |
| **multiclaude** | 2 (150★) | 2 (tmux-coupled) | 0 | 3 | ✗ | tmux-window multi-Claude coord |

**Note**: OpenHands at 50k★ would WSM-trick a stars-naïve audit — but stars-NOT-hardgate (W308) + harness-fit HF=2 (CC-incompatible env) correctly demotes it to T3.

---

## §10 Empirical parallel_ratio context (operator W315 priority)

The W269 mandate target is **parallel_ratio ≥0.7**. Measured baseline:
- W312-D (1586-JSONL audit): **58.4%** serial-Agent dispatches (29% serial-when-parallel-warranted)
- W314-r1-C (45 sessions, 13,597 turns): **58.7%** (no meaningful improvement)

**Cohort relevance**: NONE of the 7 candidates `auto-enforce` parallel_ratio. agent-teams `TeamCreate` is **main-session-lead-only** (per W312-D §2.95 by-design). Improvement is **prompt-engineering-class** (paste-ready W269 mandate refinement queued in `W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-PASTE-READY-MANDATE-REFINEMENTS.md`), not orchestrator-replacement-class.

**Implication for sca-v7.1**: add D34 `enforces_parallel_dispatch_by_construction` (proposed; would require runtime-side hook telemetry to score). Currently no candidate scores ≥3 on this proposed dim. **W316 carry-over**.

---

## §11 W316 operator-AI

**AI-W316-ORC-1**: create `.claude/skills/agentflow-dag/SKILL.md` extracting `fanout`/`merge`/`on_failure` DAG decorator pattern from `yeshuibo/agentflow`. Compose with installed `Agent` tool + `Task` primitives. ≤300 LOC pattern-extract, vendor-fork-class T2.

**AI-W316-ORC-2**: codex GPT-5.5 mediation for the substantive 2nd-tier MCDA disagreement (`agentflow` / `OpenHands` / `daytona`). Question to codex: "given orthogonal-axis incomparability under ELECTRE, is HYBRID-ADOPT (agentflow only) the right verdict, or should OpenHands+daytona also be PATTERN-STUDY-extracted?" Expected verdict: agentflow only; OpenHands+daytona are scope-mismatched.

**AI-W316-ORC-3**: telemetry hook for `parallel_ratio` measurement (W312-D F4 carry-over). Without measurement, the W269 mandate is unenforceable.

---

## §12 Cite anchors

- W269 mandate (CLAUDE.md L9-10): `Z:/claude-sota-installed/CLAUDE.md`
- W312-D parallel_ratio audit: `docs/architecture/W312-RUNTIME-MATURITY/W312-D-*.md`
- W314-D Cohort-2 Borda winner agentflow: `docs/architecture/W314-SOTA-DISCOVERY-AND-REAUDIT/W314-D-BORDA-RANKING.md`
- agent-teams W312 UPGRADE row #47: `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`
- Anthropic sub-agents docs: `https://code.claude.com/docs/en/sub-agents` (cite-anchored from CLAUDE.md L4)
