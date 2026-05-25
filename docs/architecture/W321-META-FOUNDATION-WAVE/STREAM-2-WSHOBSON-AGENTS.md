# W321 Stream 2 — wshobson/agents Deep Ingest + Activation Audit

**Date**: 2026-05-19
**Source**: wshobson/agents marketplace via DeepWiki + local cache compare
**Local installed**: 18 cached (15 enabled) of **54 published plugins** — adoption ratio ≈ 33%
**Versions**: agent-teams v1.0.2, agent-orchestration v1.2.1

## §1 — wshobson plugins NOT activated in this runtime (top-of-stack, high-value)

| Plugin | Status here | Adoption recommendation | Rationale |
|---|---|---|---|
| `git-pr-workflows` | NOT cached | **T1 INSTALL** | PR review automation; complements our cardinal-rule-2 codex Stop-hook gate |
| `c4-architecture` | NOT cached | **T1 INSTALL** | C4 architecture docs (context/container/component/code) — directly aligned with our `docs/architecture/Wxxx-*` wave discipline |
| `documentation-generation` | NOT cached | **T1 INSTALL** | OpenAPI + Mermaid + tutorial generators; missed force-multiplier for closure-synthesis docs |
| `cicd-automation` | NOT cached | **T2 PATTERN-STUDY** | GitHub Actions / GitLab CI templates; we have minimal CI today |
| `observability-monitoring` | NOT cached | **T2 PATTERN-STUDY** | SLO + dashboards; pairs with our Langfuse/OTel stack (W319-3 REC-3 wrapper) |
| `dependency-management` | NOT cached | **T2 PATTERN-STUDY** | Vuln-scan workflows; pairs with trivy/grype/cargo-audit installed this session |
| `error-debugging` + `error-diagnostics` | NOT cached | **T3 EVALUATE** | overlap with debugging-toolkit (already enabled) — check for non-redundant capabilities |
| `code-refactoring` | NOT cached | **T3 EVALUATE** | overlap with code-simplification (claude-plugins-official) already installed |
| `kubernetes-operations` + `cloud-infrastructure` + `deployment-*` | NOT cached | **T4 DOMAIN-N/A** | not relevant to single-host Z:-portable runtime |
| `meigen-ai-design` + `brand-landingpage` + `ui-design` | NOT cached | **T4 DOMAIN-N/A** | image/landing-page generation; out of scope |
| `dotnet-contribution` + `julia-development` + `arm-cortex-microcontrollers` + `game-development` + `payment-processing` + `blockchain-web3` + `quantitative-trading` | NOT cached | **T4 DOMAIN-N/A** | domain-specific, not orchestration-relevant |
| `qa-orchestra` | cached, **disabled** | T3 EVALUATE | 10-agent QA toolkit, external git-subdir; consider enable if QA load grows |
| `protect-mcp` | cached, **disabled** | T2 SECURITY-WIRE | Cedar policy + Ed25519 signed receipts; complements `signed-audit-trails` (already enabled) — needs PreToolUse + PostToolUse hooks wired (per Stream-2 §4 missed patterns below) |
| `review-agent-governance` | cached, **disabled** | T2 EVALUATE | requires `./.review-approved` flag + Cedar policy — overhead-vs-benefit decision |

## §2 — Silent-fallback patterns in agent-teams + agent-orchestration (the operator's flagged concern)

agent-teams is **EXPERIMENTAL** per upstream (requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; we have set ✓). Silent-fallback risks SHIPPED-AS-DESIGNED:

| # | Severity | File:Line | Pattern | Risk |
|---|---|---|---|---|
| F1 | HIGH | `agent-teams/1.0.2/commands/team-spawn.md:75-80` | Phase 2 "use the Agent tool" — **no error path documented for spawn failure**; if 1 of N Agent calls fails, the prompt has no abort/retry logic | Lead proceeds to Phase 3 TaskCreate against a partial team without knowing |
| F2 | HIGH | `agent-teams/1.0.2/agents/team-lead.md:79` | "Monitor — Check TaskList **periodically**" — period is undefined; no max-wait, no escalation timer | Dead teammate polled forever; user only notices via /team-status manual check |
| F3 | HIGH | `agent-teams/1.0.2/agents/team-lead.md:82` | "Shutdown — Send shutdown_request to each teammate, **wait for responses**" — no timeout on the wait | Hangs indefinitely if a teammate crashed mid-task (never responds to shutdown_request) |
| F4 | HIGH | `agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:159-160` | "A teammate is not responding to messages — **check the teammate's task status**" (manual) | No automated heartbeat or watchdog; if team-lead itself crashes, no fallback orchestrator exists — **single-point-of-failure architecture** |
| F5 | MEDIUM | `agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:174-175` | "Two teammates waiting on each other ... lead should send a stub" — **deadlock detection is operator/lead responsibility** | No automated cycle-detection; if lead misses it, silent infinite wait |
| F6 | MEDIUM | `agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:165-166` | Broadcasting routine updates "is a common anti-pattern" but **no mechanism prevents it** — only documented warning | Broadcast storm possible; N agents × N broadcasts = O(N²) message flood (resource waste, not data corruption) |
| F7 | MEDIUM | `agent-teams/1.0.2/commands/team-spawn.md:12-14` | "Verify CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 ... If not set, stop execution" — **does not verify the flag actually enables the feature** in this CC version | Stale-flag-but-feature-removed silent failure (mitigated this session: settings.json has it ✓) |
| F8 | LOW | `agent-orchestration/1.2.1/commands/multi-agent-optimize.md` | Single command for optimization; no documented degraded-mode | overlap with agent-teams; could conflict but no enforcement |

**Most-dangerous finding**: **F4 — team-lead single-point-of-failure**. The entire agent-teams architecture is centralized through the team-lead: monitoring, escalation, deadlock-breaking, shutdown-coordination all funnel through one agent. If the lead crashes mid-execution, NO documented fallback exists — teammates become orphans + their work is unreclaimed. Combined with F3 (no shutdown_request timeout), a crashed lead = silent orphaned teammates + state leak.

## §3 — Skills gap (wshobson skills not in our skill-fire set)

Our 31 local skills include several from wshobson plugins. wshobson agent-teams ships 6 skills — we have 4 fully matched. Two missing:

| Skill | Source | Already in our set? | Adoption |
|---|---|---|---|
| `team-composition-patterns` | agent-teams/1.0.2/skills/ | ✓ (via agent-teams plugin auto-load) | active |
| `multi-reviewer-patterns` | agent-teams/1.0.2/skills/ | ✓ | active |
| `parallel-debugging` | agent-teams/1.0.2/skills/ | ✓ | active |
| `task-coordination-strategies` | agent-teams/1.0.2/skills/ | ✓ | active |
| `parallel-feature-development` | agent-teams/1.0.2/skills/ | ✓ | active |
| `team-communication-protocols` | agent-teams/1.0.2/skills/ | ✓ | active (with F4-F6 silent-fallback risks per §2) |
| `signed-audit-trails-recipe` | signed-audit-trails/ | ✓ | active (cookbook only; hooks NOT wired — see §4) |
| `block-no-verify-hook` + `block-no-verify` skills | block-no-verify/ | ✓ | active (hook wired) |

**Verdict**: skill-fire set is complete for the plugins we have installed. The gap is in **plugins NOT installed** (§1), not in skills-from-installed-plugins.

## §4 — Settings.json hook patterns documented by wshobson but NOT applied here

| Pattern | Plugin | Recommended hook | Our settings.json | Action |
|---|---|---|---|---|
| `${REVIEW_APPROVAL_FLAG:-./.review-approved}` env default-fallback | review-agent-governance | PreToolUse on PR-write actions | **NOT present** (plugin disabled) | If we enable review-agent-governance, follow this pattern for our own external-visibility actions (publishing, PR creation) |
| Cedar policy file at `${REVIEW_GOVERNANCE_POLICY:-./review-governance.cedar}` | review-agent-governance | PreToolUse evaluates policy | **NOT present** | Operator decision: Cedar adds dependency; signed-audit-trails alternative covers most |
| Ed25519 signed receipts at `${REVIEW_GOVERNANCE_RECEIPTS:-./review-receipts/}` | review-agent-governance + protect-mcp | PostToolUse signs every tool call | **NOT present** (signed-audit-trails enabled but no PostToolUse Ed25519 sign) | T2 wire — pairs with cardinal-rule-2 codex Stop-hook for cryptographic audit trail |
| `${PROTECT_MCP_POLICY:-./protect.cedar}` PreToolUse | protect-mcp | every tool call evaluated against Cedar | **NOT present** (plugin disabled) | T3 evaluate — Cedar policy adds significant config surface |
| block-no-verify PreToolUse regex `grep -E '--no-verify|--no-gpg-sign'` | block-no-verify | block git bypass flags | **plugin enabled but not visible in our settings.json PreToolUse list** — needs verification | **AI-W321-2-block-no-verify-verify**: confirm hook is actually firing (plugin enabled ≠ hook wired) |

**Critical**: our `signed-audit-trails@claude-code-workflows` is ENABLED but the **cookbook-only nature of the skill means no actual hooks are wired** — we get the documentation but not the cryptographic audit trail. To realize the value, operator must wire PostToolUse Ed25519 signing hooks per the cookbook.

## Report-back

W321-2 finds **36 of 54 wshobson plugins NOT cached locally** (4 T1-install candidates: git-pr-workflows + c4-architecture + documentation-generation + signed-audit-trails-hooks-wire; 4 T2-pattern-study; rest domain-not-applicable or already-covered). **Most-dangerous silent-fallback** is `team-lead.md:82` shutdown-wait + `team-communication-protocols/SKILL.md:159` no-automated-watchdog combining into an architectural **single-point-of-failure** — if the lead crashes after spawning N teammates, every teammate becomes an orphan with no documented recovery path, and the operator only discovers this via manual `/team-status` polling. **Most-impactful unwired pattern**: `signed-audit-trails` plugin is enabled but the actual PostToolUse Ed25519-signing hooks are not in our settings.json — we have the recipe but no cryptographic audit trail; wiring this is a low-cost cardinal-rule-2-aligned hardening.

Out-of-scope flag: I did not enumerate every individual agent in the 54 plugins or commands beyond the agent-teams/agent-orchestration core surfaces; that's a follow-up wave if the operator promotes any T1 install to active.
