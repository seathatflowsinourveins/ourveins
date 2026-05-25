# W335 P2-6 — Awesome-List Cross-Discovery Report

**Wave**: W335 (P2-6 research-only, no writes)
**Date**: 2026-05-20
**Source**: `hesreallyhim/awesome-claude-code` @ main `614f102a`
**Canonical data file**: `THE_RESOURCES_TABLE.csv` (226 records, 197 active+GitHub, 133 CR-1-license-compatible)
**Mandate**: Surface ≥5 NEW T2-CHERRY candidates NOT in current install set
**Trust gate**: CR-1 trust-tuple (license MIT/Apache/BSD/ISC/MPL + maintainer identity + commit freshness + dep blast-radius)
**Output**: research-only; DO NOT install
**Subagent**: `aece7a4fc80f8bdab` (completion notification 2026-05-20 ~01:36; 9 tool calls / 22k tokens / 470s duration)

---

## §1 Awesome-list Inventory by Category

Source pivot: README.md was a placeholder pointing at `THE_RESOURCES_TABLE.csv` which is the canonical data file maintained by `hesreallyhim/awesome-claude-code` (BSD-3-Clause). 226 records spanning 197 active+GitHub repos; 133 satisfy CR-1 license filter (MIT / Apache-2.0 / BSD-3-Clause / ISC / MPL / Unlicense).

Top-level categories observed: skills, hooks, agents, MCP servers, statuslines, monitoring/tooling, prompt-engineering systems, governance/policy, dashboards.

---

## §2 Cross-Reference vs Current Install Set

W335 baseline (~64 plugins + ~46 local skills sampled):

- **Plugins (`.claude/plugins/cache/`)**: codex@openai-codex, everything-claude-code, pyright-lsp, typescript-lsp, outputai, hindsight-memory, mcp-memory-service, ralph-loop, review-agent-governance, self-improving-agent, superpowers, agent-teams, engineering-skills, engineering-advanced-skills, addyosmani-agent-skills, claude-plugins-official, anthropics-claude-cookbooks, anthropics-claude-plugins-official, mattpocock-vendor-fork-10 (sample)
- **Pattern-study (T3)**: lastmile-ai/mcp-agent (W335 P0-1)
- **Vendor-fork skills (`.claude/skills/`)**: addyosmani-{doubt-driven-development, frontend-ui-engineering, api-and-interface-design, incremental-implementation, performance-optimization, security-and-hardening, spec-driven-development}, mattpocock 10-skill bundle, citations-agent, dispatching-parallel-agents-w321-fork

Already-installed overlap with awesome-claude-code: **2 of 226** (`obra/superpowers`, `basicmachines-co/basic-memory`). Low overlap because the awesome-list catalogs different repos than the W335 SOTA grand catalog (mostly community-contributed third-party plugins, not Anthropic-shipped primitives).

NOT-installed candidates: **195 of 226**.

---

## §3 NEW Candidate Shortlist (11 — exceeds ≥5 mandate by 120%)

| # | Score | Tier | Repo | License | Gap filled |
|--:|--:|:--|:--|:--|:--|
| 1 | 9 | **T2-CHERRY** | `tombii/better-ccflare` | MIT | token/cost-usage dashboard |
| 2 | 9 | **T2-CHERRY** | `maciek-roboblog/claude-code-usage-monitor` | MIT | realtime token monitor (synergy w/ W325 parallel_ratio telemetry) |
| 3 | 9 | **T2-CHERRY** | `sirmalloc/ccstatusline` | MIT | statusline (zero installed currently) |
| 4 | 9 | **T2-CHERRY** | `agent-sh/agnix` | MIT | CLAUDE.md/SKILL.md linter (closes W331 axis-1 #6 per-skill trigger audit) |
| 5 | 9 | **T2-CHERRY** | `nulone/claude-rules-doctor` | MIT | `.claude/rules/` dead-file detector (W308 reversal observability) |
| 6 | 9 | **T2-CHERRY** | `vaporif/parry` | Apache-2.0 | prompt-injection scanner ruleset |
| 7 | 8 | **T2-CHERRY** | `pchalasani/claude-code-tools` | MIT | session-continuity / compaction avoidance |
| 8 | 8 | **T2-CHERRY** | `aannoo/claude-hook-comms` (HCOM) | MIT | subagent IPC channel (W312-D synergy) |
| 9 | 8 | **T2-CHERRY** | `gowaylee/cchooks` | MIT | typed Python hooks SDK |
| 10 | 8 | **T3** | `piebald-ai/claude-code-system-prompts` | Unlicense | ground-truth CC system prompt (study only; no executable surface) |
| 11 | 8 | **T2-CHERRY** | `automazeio/ccpm` | MIT | epics+tasks PM workflow |

All MIT / Apache-2.0 / Unlicense — CR-1 license compatible. Each T2-CHERRY candidate has a documented single-file pattern-extract target (NOT a full clone) per sca-v13 §9 T2-CHERRY semantics. T3 entries are pattern-study only.

---

## §4 Per-Candidate Tier-Route Preview (sca-v13 §9)

Tier definitions:
- **T1 INSTALL**: full plugin install via `/plugin install`; runtime addition
- **T2 VENDOR-FORK**: operator-curated install under `.claude/`; full source vendored
- **T2-CHERRY**: pattern-only adoption (vendor-fork specific files only, prefix-namespaced)
- **T3 PATTERN-STUDY**: read-only learn-from-source; no install
- **T4 CITE-ONLY**: reference in docs; no code import
- **T5 REJECT**: rationale-documented

Per-candidate rationale:

1. **better-ccflare** — T2-CHERRY: extract token-usage dashboard component as `.claude/skills/sample-cost-dashboard/` template; pairs with `tools/claude-analytics-fetch.mjs` (P2-1) for full-stack cost observability.
2. **claude-code-usage-monitor** — T2-CHERRY: pattern-only adopt the live token meter; cite parallel-ratio synergy with `tools/parallel-ratio-telemetry.mjs` (W325-A).
3. **ccstatusline** — T2-CHERRY: zero statuslines currently installed; first statusline pattern lands here as `.claude/ccstatusline/<name>.mjs` cherry. Note already-present `agents/ccstatusline` dir from prior install.
4. **agnix** — T2-CHERRY: SKILL.md linter closes W331 axis-1 #6 (per-skill cardinality discipline); pairs with P0-2 audit report findings.
5. **claude-rules-doctor** — T2-CHERRY: `.claude/rules/` dead-file detector; relevant per W308 reversal where Anthropic re-blessed `.claude/rules/` as canonical.
6. **parry** — T2-CHERRY: prompt-injection ruleset; pattern-only adopt the rule library, NOT the agent wrapper.
7. **claude-code-tools (pchalasani)** — T2-CHERRY: session-continuity primitives; specific compaction-avoidance helpers.
8. **claude-hook-comms (HCOM)** — T2-CHERRY: subagent IPC channel — closes W312-D inter-agent comms gap.
9. **cchooks (gowaylee)** — T2-CHERRY: typed Python hooks SDK; pattern-only adopt the type definitions.
10. **claude-code-system-prompts (piebald-ai)** — T3 PATTERN-STUDY: ground-truth Claude Code system prompt extraction; study only, no executable surface.
11. **ccpm (automazeio)** — T2-CHERRY: epics+tasks PM workflow pattern; pairs with TaskCreate/TaskList native primitives.

**Recommended next-wave order** (per Pareto-frontier on urgency × effort × harness-fit × blast-radius per CLAUDE.md Δ-G50):
1. agnix (W331 axis-1 #6 closure — highest leverage)
2. claude-rules-doctor (W308 reversal observability)
3. claude-hook-comms (W312-D inter-agent comms)
4. ccstatusline (statusline coverage gap)
5. parry (security ruleset coverage)
6. piebald-ai system-prompts (low-effort pattern-study)
7-11: remaining candidates per operator priority

---

## §5 Methodology + Cite-Anchors

**Fetch**: `curl -sS https://raw.githubusercontent.com/hesreallyhim/awesome-claude-code/main/THE_RESOURCES_TABLE.csv` (via context-mode / ctx_batch_execute reroute per W333-C Gap-1).

**Filter pipeline** (subagent reported):
1. CSV parse → 226 rows
2. Active + GitHub-hosted → 197 rows
3. CR-1 license filter (MIT/Apache-2.0/BSD/ISC/MPL/Unlicense) → 133 rows
4. Cross-reference vs install set (plugins + local skills) → 195 not-installed
5. Quality scoring (stars + recency + maintainer + pattern-fit) → top-25
6. Tier-route per sca-v13 §9 (T2-CHERRY preferred per mandate) → 11 shortlisted
7. Pareto-frontier ordering for next-wave priority

**3-org-distinct cite-anchors**:
1. `hesreallyhim/awesome-claude-code` @ `614f102a` `THE_RESOURCES_TABLE.csv` (BSD-3-Clause) — canonical data source
2. `https://code.claude.com/docs/en/skills` (Anthropic PBC) — T2-CHERRY operator-curated semantics
3. `https://slsa.dev/spec/v1.0` (OpenSSF/Linux Foundation) — supply-chain CR-1 maintainer-identity discipline
4. (supplementary) `https://opensource.org/licenses` (OSI) — license compatibility per CR-1

**Read-only invariant**: zero installs, zero `.claude/` mutations, zero plugin registrations. Sidecar data in `/tmp/` (sandboxed, not committed).

**Provenance**: subagent `aece7a4fc80f8bdab` budget 9/15 tool calls + 22k/80k tokens (well under 70% threshold per Δ-PDM-2). Skeleton-first per Δ-PDM-1 honoured.

**Carry-forward queue**: W336 install sequence per §4 recommended order. Each T2-CHERRY candidate requires sca-v13 phase 1-5 vetting BEFORE adoption (existence-probe → cross-source triangulation → anti-bias gate → weighted-sum scoring → 5-gate validation).

---
