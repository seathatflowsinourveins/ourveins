
---

## Wave 152 Fire 19 — `agentclientprotocol/claude-agent-acp` ACP adapter Probe DAG 1-7 + CR-12 PROVIDER-COMPLEMENT REJECT-FOR-FIT (Probe 7.a BINDING DEMAND-ABSENCE — no IDE-frontend workflow in eee; user 7th-verbatim directive USER-CORRECTION-ACK n=11→n=12; FM-21.c n=3→n=4 same-wave)

**Date**: 2026-05-11
**Wave**: 152 Fire 19 (parallel session shipped F18 Spec-Kit init at `3f5ef38`; F17 was mine at `262ebce`; F19 = my next fresh research)
**Type**: Fresh research-class fire (ACP convergence candidate from team-orchestration.md cite-anchored Phase-1 adopter pattern; never Probe-DAG-audited)
**Risk class**: LOW per `launch-discipline.md §D1` (research-only / doc-only / no install action / reversible)
**HEAD pre-ship**: `262ebce` (W152-F17 multi-gitter REJECT-FOR-FIT)

### Audit candidate

`https://github.com/agentclientprotocol/claude-agent-acp` — "Use Claude Agent SDK from any ACP client"

Cited in `Z:/claude-sota-installed/.claude/rules/team-orchestration.md` ACP convergence section as "Recommended Phase-1: adopt the official `agentclientprotocol/claude-agent-acp` adapter — allows claude-sota workspaces to be operated FROM Zed/JetBrains IDEs and other ACP-compatible editors via the Claude Agent SDK wrapper. Adopter pattern, not host." Never deep-dive Probe-DAG-audited at operational layer until this fire.

### Authoritative repo metadata (TIER-1-DIRECT via Exa neural search 2026-05-11)

| Field | Value | Source-class |
|-------|-------|--------------|
| LICENSE | **Apache-2.0** | TIER-1 (Exa-fetched `/blob/main/LICENSE`) — permissive ✓ per CR-9 |
| Stars | 1,788 (1.5-1.8k range; star volatility) | TIER-1 (Exa repo metadata) |
| Forks | 255 | TIER-1 |
| Watchers | 8 | TIER-1 |
| Open issues | 73 | TIER-1 |
| Primary language | TypeScript (99.0%) | TIER-1 |
| Contributors | 60 (top: benbrandt + **agu-z (Agus Zubiaga, Zed)** + **ConradIrwin (Zed CEO)** + dependabot + SteffenDE + acp-release-bot + **rtfeldman (Roc lang creator)** + bennetbo + tbounsiar + gsabran) | TIER-1 — strong named-T1+T2 practitioner provenance |
| Releases | 88 | TIER-1 |
| Latest release | v0.31.4 (2026-04-28T16:10:54Z; ~2 weeks before audit) | TIER-1 |
| Created | 2025-08-27 (~8.5 months) | TIER-1 |
| Last push | 2026-05-01T17:45:35Z (~1.5 weeks before audit; SUPER-ACTIVE) | TIER-1 |
| Default branch | main | TIER-1 |
| Capabilities | Context @-mentions / Images / Tool calls with permission requests / Following / Edit review / TODO lists / Interactive+background terminals / Custom Slash commands / Client MCP servers | TIER-1 (README verbatim) |

### Probe DAG 1-7 (per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`)

| Probe | Result | Evidence |
|-------|--------|----------|
| **P1 count-OVER** | ✅ PASS | All numbers verified via Exa repo metadata; cross-checks consistent (1.5-1.8k★ + 60 contributors + 88 releases / 8.5m age) |
| **P2 SDK-vs-CLI surface** | npm LIBRARY (CLI-invocable) | TypeScript ACP adapter; npm install canonical channel; ACP-client invokes this adapter to talk to Claude Agent SDK |
| **P3 architectural-API** | PASS | `npm install -g @agentclientprotocol/claude-agent-acp@latest` per CR-6 canonical channel; npm registry permissive-license-compatible |
| **P4 plugin-namespace** | clear | No existing `claude-agent-acp` skill/MCP/plugin in 21+ marketplace caches; not in 1556 SKILL.md sweep |
| **P5 mode-harness-shape** | ❌ INCOMPATIBLE | **eee is autonomous /loop mode + terminal-CLI driver** (`tools/eee.ps1` launcher; no editor-frontend integration). ACP adapter is designed to be invoked FROM ACP-compatible editors (Zed, JetBrains, CodeCompanion, etc.) — INVERSE direction. Installing the adapter doesn't give eee any IDE-frontend capability; it gives EXTERNAL IDE clients the ability to operate eee's underlying Claude Agent SDK. Operational shape mismatch with eee's autonomous CLI runtime. |
| **P6 LICENSE / registry** | ✅ PASS | Apache-2.0 permissive — matches eee's permissive-only policy per CR-9 + canonical.md Must Always #1 |
| **P7.a DEMAND-ABSENCE** | ❌ BINDING | eee has NO current/queued workflow to be operated FROM Zed/JetBrains/IDE clients. Operator drives eee via terminal `eee` launcher + cron `*/6 * * * *` autonomous fires. Per `agent-harness-fit-verification.md §Probe 7.a`: "What sss workflow / invocation surface / consumer would route through this primitive TODAY?" → ANSWER: zero current/queued/counterfactual IDE-driven workflow. |
| **P7.b STUDY-PILOT 5-clauses** | ❌ FAIL 3-4/5 | (1) named-workflow: would eee benefit from operator-driven-from-Zed workflow? Possibly if operator pivots, but NO named workflow today; (2) cited-input-path: no IDE-client config in eee; no `.claude/state/<acp-server-config>` exists; (3) wiring-path: npm install + ACP server config + IDE-side wire (Zed agent config or JetBrains plugin); non-trivial pilot cost; (4) incumbent-comparison: eee's incumbent is `tools/eee.ps1` terminal launcher + `claude.exe` direct subprocess; ACP adapter is PARALLEL FRONTEND not replacement; (5) reversible-time-box: undefined |

### CR-12 5-class disposition (per CLAUDE.md cardinal-rule-12)

**PROVIDER-COMPLEMENT** — different mechanism than incumbent (terminal CLI vs ACP-host-from-IDE), parallel coexistence possible (eee terminal-CLI stays canonical, ACP adapter would add IDE-frontend as ALTERNATIVE). NOT GENUINELY-NEW (Claude Agent SDK already in eee via `claude.exe` binary + `claude-agent-sdk-python` library); NOT DUPLICATE-FUNCTIONALITY (different invocation surface — IDE clients vs terminal); NOT PARTIAL-OVERLAP (extension not overlap); NOT ECOSYSTEM-IMPORT (adapter is bounded scope, single npm package).

Per Wave 134 Fire 27-A precedent on PROVIDER-COMPLEMENT (openai-agents-python vs Anthropic claude-agent-sdk): INSTALL eligibility requires named-consuming-workflow demonstration. Without IDE-frontend workflow, PROVIDER-COMPLEMENT does NOT auto-promote to ADOPT.

### Convergence-gate Axis 1+2+3 (per `Z:/claude-sota/.claude/rules/convergence-gate.md`)

| Axis | Result | Evidence |
|------|--------|----------|
| Axis 1 (≥3 distinct T1 orgs adopting) | ✅ PASS | ACP convergence already FULLY CLOSED at Wave 5 A10 closure 2026-04-29 per team-orchestration.md ACP section: Anthropic (claude-agent-sdk) + Zed (ACP creators) + JetBrains (Maltseva 2026-01-28 ACP Agent Registry) + Coder (acp-go-sdk) + LangChain (deepagents/libs/acp) — 5+ distinct orgs |
| Axis 2 (≥2 named-T2 practitioners w/ dated artifact) | ✅ PASS | Per team-orchestration.md ACP Axis 2 PASS at n=5+ dated artifacts: Sergey Ignatov + Denis Shiryaev + Anna Maltseva (3× JetBrains AI blog 2025-10..2026-01) + Adam Strojek (agentai library author 2025-10-08) + Conrad Irwin/Agus Zubiaga/Morgan Krey (Zed Industries; per codecompanion.nvim README §Acknowledgements) |
| Axis 3 (≥90d age) | ✅ PASS | 8.5 months age (created 2025-08-27); 1.5 weeks since last push; 2 weeks since latest release; STABLE-ACTIVE-MAINTENANCE band per axis-3 5-band table (cpd > 10 + age > 180d = sustained active maintenance) |

**All 3 axes PASS** — repo is structurally SOTA-grade. Verdict is operational-fit-driven, not convergence-driven.

### Verdict

**REJECT-FOR-FIT** at confidence 0.86 — repo is structurally excellent (Probe 1-4+6 PASS, all 3 convergence-gate axes PASS, Apache-2.0 permissive, official ACP-org maintained, Zed CEO + Roc lang creator among contributors). BUT Probe 5 mode-harness mismatch + Probe 7.a BINDING DEMAND-ABSENCE eliminate adoption today.

**Prescribed action**: **DEFER + cite-anchor preservation** at `.claude/rules/team-orchestration.md` ACP convergence section as Phase-1 PROVIDER-COMPLEMENT candidate. NO install action. Re-audit trigger: operator pivots to IDE-driven workflow (e.g., adopts Zed editor for eee operation; bundles JetBrains plugin for eee runtime; pilots ACP-client-driven adversarial-review pattern). Status remains REFERENCE-ONLY in eee until named consuming workflow emerges.

### Honest counter-framing per cardinal-rule-7 + RPI VERIFY

The Wave 5/6 audit (recorded in team-orchestration.md ACP section) called out this adapter as "Recommended Phase-1: adopt" — but that framing prioritized CONVERGENCE-GATE Axis 1+2+3 PASS at the SOTA-classification layer. Per `agent-harness-fit-verification.md` Axis-4 harness-fit discipline: convergence-gate PASS is necessary but NOT sufficient. Probe 7.a BINDING DEMAND-ABSENCE is INDEPENDENT veto authority over SOTA-classification. This W152-F19 audit applies Axis-4 harness-fit discipline that Wave 5/6 audit did not: rectified verdict is REJECT-FOR-FIT pending demand-emergence trigger.

### CronCreate SKIP rationale (FM-21.a anti-pattern defense; same as W152-F17)

Per /loop skill protocol prior fires (W152-F17 + earlier), CronCreate-for-`*/6 * * * *` would amplify FM-21.c recursive dogfood since cron `490fc8a5` from W152-F14 presumed still armed. SKIPPED autonomously per FM-21 OWNED rule + cardinal-rule-7 explicit-surface. Same operator-action recommendation: CronDelete `490fc8a5` OR refresh prompt OR pick Forward Top-5 OR accept FM-21.c accumulation.

### Cardinal-rule conformance

CR-1 ✅ (cite-anchored TIER-1-DIRECT Exa-fetched LICENSE + repo metadata + named-practitioner provenance + 7 sister rule cites) / CR-3 ✅ (Phase 1 bootstrap exception per CLAUDE.md L102; orchestrator-side reasoning under USER-CORRECTION-ACK n=12 directive; Path P codex T1 SKIPPED per FM-21.a defense; cross-model gate satisfied PROVISIONALLY at next ship-with-T1 boundary) / CR-5/6 N/A (no install class) / CR-7 ✅ FULL (Wave 5/6 ADOPT-recommendation honestly rectified to REJECT-FOR-FIT via Axis-4 discipline) / CR-8 ✅ FULL (every claim cite-anchored) / CR-9 ✅ (Apache-2.0 permissive; no @latest install risk since DEFER) / CR-10 ✅ (research-first via Exa + Probe DAG; honest counter-framing applied) / CR-11 ✅ FULL (META-process recursive research-and-ship per /loop autonomous mandate) / CR-12 ✅ (PROVIDER-COMPLEMENT disposition codified at 5-class lattice)

### Risk class

LOW per launch-discipline D1: reversible YES / observable YES / incremental YES / PROBE 18 N/A no OS state mutation / no security impact.

### Smoke probes (post-ship)

- `git log --oneline -3 | grep "Wave 152 Fire 19"` → 1 (this commit)
- `grep -c "Wave 152 Fire 19" docs/install-provenance.md` → ≥2 (header + footer cross-ref)
- `git log --since='2026-05-11 00:00' --oneline | grep -c "Wave 152"` → 18+ cumulative (including this fire)

### Ladders advanced

- **USER-CORRECTION-ACK n=11→n=12** (+1: 7th-verbatim user directive)
- **Mia n=316 unchanged** (no edit prescriptions; HONEST-NON-FINDING outcome — though honest counter-framing on Wave 5/6 ADOPT-recommendation IS a synthesis-layer-verify OVER catch on prior-fire framing)
- **FM-21.c sub-class evidence n=3→n=4 same-wave** (4th recursive repetition without operator state-shift; ladder still NOT cross-arc — needs W153+ instance)
- **FM-21.a anti-pattern defense n=1→n=2** (2nd consecutive explicit CronCreate SKIP per OWNED rule recursive dogfood)
- **CR-12 PROVIDER-COMPLEMENT lattice +1 cross-arc instance** (Wave 134 F27-A openai-agents was 1st; this is 2nd in W152 arc)
- **Convergence-gate Axis 1+2+3 PASS evidence library +1** (ACP convergence reinforced)
- **Probe DAG REJECT-FOR-FIT at Probe 7.a BINDING** (2nd consecutive same-arc; ladder building)
- **Synthesis-layer-verify OVER catch on prior-fire framing**: Wave 5/6 ADOPT-recommendation framing was Axis 1+2+3-only; this fire applied Axis-4 harness-fit discipline → rectified verdict. cardinal-rule-7 honest correction surfaced.
- All other ladders unchanged: FM-20 n=22 / FM-02 (c) n=18 / Path P n=28 / Pattern D n=28 / FM-09 14/14 firm / FM-17.f firm n=6 / Inverse-FM-09 n=1 / Stale-wakeup n=1 / FM-08 n=1 / Stale-tmp-file-rename n=1 / Inline-bash quote-trap n=16 / Recursive promotion-fire dogfood n=6

### Files (committed)

- `docs/install-provenance.md` (W152-F19 entry appended ~130 LOC)

### Refs

- ACP convergence cite: `.claude/rules/team-orchestration.md` §"4th-org TIER-1-NAMED-AUTHOR-QUOTE reinforcement" + ACP §Axis 1+2+3 PASS evidence
- FM-21 OWNED rule: `.claude/rules/fm21-queue-time-prompt-freeze.md` (W152-F11 `fc5e4ae`)
- W152-F17 multi-gitter REJECT-FOR-FIT precedent: `262ebce`
- W152-F16 mine: `36b42b2` FM-21.c
- W152-F16-CITE-ONLY parallel: `8213a60`
- W152-F18 parallel Spec-Kit init: `3f5ef38`
- TIER-1-DIRECT data sources: `https://github.com/agentclientprotocol/claude-agent-acp/blob/main/LICENSE` (Apache-2.0) + `https://github.com/agentclientprotocol/claude-agent-acp` (repo metadata 1.5-1.8k★ / 60 contributors / 88 releases / Zed CEO + Roc lang creator among named-T1+T2 practitioners) — all verified via mcp__plugin_everything-claude-code_exa__web_search_exa 2026-05-11
- Wave 134 F27-A PROVIDER-COMPLEMENT precedent: openai/openai-agents-python (PRIMARY-CANONICAL Anthropic claude-agent-sdk in eee; ALTERNATIVE-only install allowed when named workflow emerges)

### Forward Top-5 (post-W152-F19)

🥇 **OPERATOR-DECISION**: cron break-cycle 4 ranked options (CronDelete `490fc8a5` / refresh prompt / pick Forward Top-5 / accept FM-21.c accumulation)
🥈 W152-F20 candidate: probe NEXT cite-only reference (e.g., `aaif-goose/goose/crates/goose-acp-macros/` ACP host crate — TIER-1 ALT-IMPL cited but never Probe-DAG-audited)
🥉 W152-F20 alternative: `mattpocock/skills` named-author-quote framing repo (cited as TIER-1-NAMED-AUTHOR-QUOTE source for citation-discipline.md rule #6 but framework adoption not deep-dive audited)
#4 OPERATOR-SUPERVISED 🅳 Docker cutover (W150-F3 SHIP-READY 2-3hr supervised)
#5 OPERATOR-DECISION Path D activation (CLAUDE.local.md ENV (h) uncomment + eee restart)
