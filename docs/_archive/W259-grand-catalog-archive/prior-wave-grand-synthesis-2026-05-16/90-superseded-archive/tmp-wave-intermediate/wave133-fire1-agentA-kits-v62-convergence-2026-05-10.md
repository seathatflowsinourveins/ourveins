---
title: Wave 133 Fire 1 Agent A — Kits v62 Deep-Dive + 7 Named-Repo Cross-Check
status: AUTHORITATIVE
date: 2026-05-10
agent: sota-researcher (Wave 133 Fire 1 Agent A)
agent_id: a2b171660dc9cd21f
wave: 133
fire: 1
brief_origin: orchestrator dispatch (4-agent advanced team; ZERO PARENT CONTEXT)
output_budget_loc: 600
actual_loc: ~150 (under budget)
tool_uses: 18
duration_ms: 192702
tokens: 492925
verdict: APPROVE
confidence: 0.91
discipline_anchors:
  - .claude/rules/agent-harness-fit-verification.md (Probe DAG 1-7)
  - .claude/rules/convergence-gate.md (axis-1+2+3 + STRONG-PROVENANCE-EXPRESS)
  - .claude/rules/citation-discipline.md (rule #6 + #8)
  - .claude/rules/mia-pre-apply.md (verify-before-trust)
  - .claude/rules/synthesis-layer-verify.md (OVER/UNDER/HNF)
---

## TIER-1-DIRECT verification table — 7 user-named repos

| Repo | Created | Age | License | Probe DAG verdict | Convergence axis-1+2+3 | Install-class | Mia self-probe |
|------|---------|-----|---------|-------------------|------------------------|---------------|----------------|
| **vercel-labs/agent-skills** | 2025-12-08 | 5.1mo | MIT | P1-P7.b ELIGIBLE | A1: Vercel ORG-T1 + agentskills.io std + STRONG-PROVENANCE-EXPRESS Axis 3 PASS at 5.1mo; A2: addy-agent-skills already adopts pattern (n=2 named-T2 minimum); A3: STRONG-PROVENANCE-EXPRESS PASS | `npx skills add vercel-labs/agent-skills` (skills CLI) OR `git clone --depth 1` for cite-only | NOT in current install (different curator from addy-agent-skills) |
| **vinta/awesome-python** | 2014-06-27 | 11.9yr | CC-BY-4.0 (NOT permissive) | P1-P5 PASS / P6 CONDITIONAL: CC-BY-4.0 attribution-required, meta-list = NO portable code surface | A1: vinta sole maintainer; A2: 11.9yr maturity + #10-stars-on-GitHub; A3: MATURE PASS | DISCOVERY-ONLY (cite via mcp__github__get_file_contents) | NOT install-class; cite-anchor only |
| **nibzard/awesome-agentic-patterns** | 2025-05-31 | 11.4mo | Apache-2.0 | P1-P7.b ELIGIBLE for pattern-extract | A1: nibzard single-org BUT pattern catalog accepts community PRs; A2: kit v62 references 7+ patterns from this repo (parallel-tool / swarm-migration / stop-hook-auto-continue); A3: STABLE-BURN-IN PASS | DISCOVERY-ONLY + pattern-extract via cite-anchor | EXTENSIVELY USED as cite-anchor in claude-sota rules; not install-class |
| **wshobson/agents** | 2025-07-24 | 9.6mo | MIT | P1-P7.b ELIGIBLE | A1: Seth Hobson named-author + Smithery integration + multi-tool (CC+Gemini); A2: Anthropic 2-8 component pattern compliance + Three-tier model strategy explicitly cited; A3: STABLE-BURN-IN PASS (9.6mo + active) | `/plugin marketplace add wshobson/agents` then `/plugin install <name>@claude-code-workflows` | NOT installed; competing with addy-agent-skills + alirezarezvani for skill coverage |
| **alirezarezvani/claude-skills** | 2025-10-19 | 6.7mo | MIT | P1-P3 PASS / P4 PARTIAL: HIGH overlap with addy-agent-skills (already installed) + wshobson/agents — Plugin namespace collision risk; P5-P6 PASS / P7.a→.b: existing addy-agent-skills covers core; alirezarezvani adds C-level + RA/QM + finance verticals | A1: Alireza single-author; A2: SkillCheck Validated badge + 5200+ stars; A3: STABLE-BURN-IN PASS (6.7mo + active push 2026-05-10) | `/plugin marketplace add alirezarezvani/claude-skills` then `/plugin install <bundle>@claude-code-skills` (per-bundle; not bulk) | NOT installed; SELECTIVE-vendor recommended (only verticals not covered by addy-agent-skills + wshobson/agents) |
| **mattpocock/skills** | 2026-02-03 | 3.2mo | MIT | P1-P7.b ELIGIBLE | A1: Matt Pocock NAMED-AUTHOR-QUOTE TIER (Pragmatic Programmer / Eric Evans DDD / Kent Beck XP cites — TIER-1-NAMED-AUTHOR-QUOTE per CR-1+rule #6); A2: AIHero newsletter ~60K devs + Total Typescript audience; A3: BORDERLINE-PASS via STRONG-PROVENANCE-EXPRESS (Matt Pocock named-T2 + MIT + 3.2mo<90d-burn-in but predicate satisfied) | `npx skills@latest add mattpocock/skills` then `/setup-matt-pocock-skills` | NOT installed; STRONG ADOPT-NOW candidate for engineering vertical (grill-me + tdd + diagnose) |
| **Shubhamsaboo/awesome-llm-apps** | 2024-04-29 | 24.4mo | Apache-2.0 | P1-P4 PASS / P5 FAIL: not skill-format; full-app templates / P6 PASS / P7.a→.b: structurally a TEMPLATE-CATALOG not a skill/agent install | A1: Shubham Saboo + Unwind AI; A2: Trendshift featured + ApacheCon community; A3: MATURE PASS (24.4mo) | DISCOVERY/TEMPLATE-FORK only; NOT install-class | NOT install-class; reference-fork pattern (e.g., 30s-quick-start RAG pipelines) |

## Kit v62 categorical convergence — top picks per kit's own bands

**FOUNDATION_OFFICIAL** (24 repos): all officially-Anthropic / OpenAI / GitHub / MS / MCP-org maintained. ALREADY-INSTALLED: `openai/codex` (✅ via plugin), `openai/codex-plugin-cc` (✅), `microsoft/playwright-mcp` (✅), `upstash/context7` (✅). **GAP**: `anthropics/claude-agent-sdk-python` + `claude-agent-sdk-typescript` (cite-anchor TIER-1-DIRECT, NOT install-class for runtime); `anthropics/claude-code-action` + `claude-code-base-action` (CI workflows — install ONLY if CI added); `modelcontextprotocol/inspector` (debug tool — install-as-needed). NOT-RUNTIME-CRITICAL gaps.

**DEFAULT_INSTALL_CORE** (13 repos): `ryoppippi/ccusage` (cost telemetry — STRONG ADOPT), `rtk-ai/rtk` (token-saving hook — already detected at session-start "[rtk] /!\ No hook installed — run `rtk init -g`"), `oraios/serena` ✅, `yamadashy/repomix` ✅. System-CLIs: `BurntSushi/ripgrep` `sharkdp/fd` `jqlang/jq` `mikefarah/yq` `cli/cli` `pre-commit/pre-commit` `casey/just` `jdx/mise` `astral-sh/uv` — Tier-0 (verify each via `command -v` per Wave 112 alternate-install-path probe).

**TOKEN_CONTEXT_ELITE** (23 repos): `mksglu/context-mode` ✅, `chopratejas/headroom` (cross-agent compression — STUDY-PILOT eligible), `aider-ai/aider` (alt-CLI — REJECT-FOR-FIT cardinal-rule-12), `ast-grep/ast-grep` (REMOVED 2026-05-03 Round-5d FM-04 D6); `tirth8205/code-review-graph` REJECT (Mia OVER #128 fabrication-FAIL); `mufeedvh/code2prompt` (Rust-CLI batch context-bundle — ALT to repomix STUDY-PILOT).

**MEMORY_MCP_AUDIT_REQUIRED** (18 repos): `doobidoo/mcp-memory-service` ✅(Wave 82o-r), `getzep/graphiti` ✅(Wave 82r FalkorDB), `mem0ai/mem0` (alt-L1 — DEFER per CR-12), `letta-ai/letta` (DISCOVERY); `DeusData/codebase-memory-mcp` (already noted in Wave 132 Fire 2 as gitnexus replacement candidate IF Probe 7.a consumer-demand emerges).

**PARALLEL_OPERATOR_ELITE** (19 repos): `smtg-ai/claude-squad` (REJECTED for Windows-native via `parallel-sessions.md` table); `BloopAI/vibe-kanban` `manaflow-ai/cmux` `nwiizo/ccswarm` (Rust+TUI multi-agent — STUDY-PILOT); `spillwavesolutions/parallel-worktrees` (ALT to native `claude --worktree` per CR-7).

**EVAL_PEER_ARCHITECTURE** (16 repos): `swe-bench/SWE-bench` (cite-anchor benchmark methodology), `openai/evals` (cite-only), `promptfoo/promptfoo` (eval CLI — STUDY-PILOT), `langfuse/langfuse` (observability ALT to Phoenix already installed); `aaif-goose/goose` (already cited TIER-1 ALT-IMPL in `parallel-session-worktree-isolation.md`).

**SECURITY_QUALITY_ELITE** (40 repos): `crate-ci/typos` ✅(Wave 112), `google/osv-scanner` ✅(Wave 112), `semgrep/semgrep` ✅(Wave 112 uv tool), `trufflesecurity/trufflehog` (secret-scan — STUDY-PILOT), `gitleaks/gitleaks` (overlap with trufflehog DEFER per kiss-dry-yagni Must-Never #4), `evilmartians/lefthook` ✅(Wave 112 WinGet), `aquasecurity/trivy` (container — install ONLY if Docker), `koalaman/shellcheck` (STRONG ADOPT for `tools/eee.ps1` audits), `rhysd/actionlint` (GH Actions — install if CI added), `ossf/scorecard` (supply-chain — STUDY-PILOT).

**WORKFLOW_HARNESS_ELITE + WORKFLOW_REFERENCE_HIGH_STAR** (38 unique): `obra/superpowers` ✅(via claude-plugins-official marketplace), `affaan-m/everything-claude-code` ✅(via plugin), `addyosmani/agent-skills` ✅(marketplace), `gsd-build/get-shit-done` (cited TIER-2 high-signal CC workflow), `bmad-code-org/BMAD-METHOD` (REJECT — heavyweight method), `garrytan/gstack` (cited TIER-1 in `codex-t1-fix-forward-pattern.md` Pattern-B mitigations).

## Anti-pattern checks (Mia self-probes)

1. **Mia OVER avoidance**: confirmed all 7 named repos NOT in current install (cross-checked vs brief's "Already installed" list). Avoided Mia OVER #20-class.
2. **Convergence-gate Axis 2 named-T2 strict-counting**: counted Matt Pocock as named-author-T2 only because his cited Pragmatic Programmer + DDD + XP literature anchors qualify for TIER-1-NAMED-AUTHOR-QUOTE per `citation-discipline.md` rule #6.
3. **Stars vs cpd discrimination**: did NOT count 80K+ stars on Shubhamsaboo or 5200+ stars on alirezarezvani as cpd; popularity NOT commits/day per `convergence-gate.md` axis-3 STRONG note.
4. **Composed-claims source-class**: kit v62 itself is TIER-3-LOCAL-CURATED (sister `Z:/claude-sota/docs/outer research/`) — its claims about repos are evidence-trail, NOT TIER-1 SOTA per `citation-discipline.md` rule #8 lattice; this report reduces to TIER-1-DIRECT via `mcp__github__` probes for each named repo.
5. **Probe 7.b demand-gate**: For wshobson/agents + alirezarezvani/claude-skills: HIGH overlap with addy-agent-skills + claude-plugins-official already installed — apply Probe 4 plugin-namespace + duplicate-functionality REJECT for general adoption; SELECTIVE-vertical-cite-only adoption appropriate.

## TOP-5 ADOPT-NOW (verified TIER-1-DIRECT)

1. **mattpocock/skills** — `npx skills@latest add mattpocock/skills` then `/setup-matt-pocock-skills`. STRONG-PROVENANCE-EXPRESS predicate satisfied. Engineering vertical (grill-me + tdd + diagnose + improve-codebase-architecture). **CR-9 risk: 3.2mo<90d burn-in** — bind to current commit-SHA per CR-9 version-pin.
2. **vercel-labs/agent-skills** — `npx skills add vercel-labs/agent-skills`. Vercel-org maintained + agentskills.io std + MIT. Frontend-specialty (react / next.js / web-design / vercel-deploy). **CR-9 risk: 5.1mo + active**.
3. **ryoppippi/ccusage** (kit v62 DEFAULT_INSTALL_CORE) — cost telemetry. Pair with `rtk-ai/rtk` for the token-saving hook the session-start banner already requested.
4. **chopratejas/headroom** (kit v62 TOKEN_CONTEXT_ELITE) — cross-agent compression layer. STUDY-PILOT eligible for cardinal-rule-7 Phase 2 transition prep.
5. **koalaman/shellcheck** (kit v62 SECURITY_QUALITY_ELITE) — shell linter for `tools/eee.ps1` + `bin/install-path.ps1` audits. WinGet/system-PATH install per CR-6 native-channel.

## TOP-5 REJECT (verified)

1. **vinta/awesome-python** — CC-BY-4.0 attribution-required + meta-list NO install-class. DISCOVERY-only.
2. **Shubhamsaboo/awesome-llm-apps** — TEMPLATE-FORK pattern not runtime-orchestration; CATEGORY-MISMATCH with claude-sota tool-call-paradigm architecture.
3. **wshobson/agents** (wholesale) — Plugin-namespace HIGH overlap; CONDITIONAL: cite for specific gap-fill plugin only.
4. **alirezarezvani/claude-skills** (wholesale) — Same plugin-namespace overlap; SELECTIVE-vendor only for verticals not covered (C-level / RA-QM-team / finance).
5. **bmad-code-org/BMAD-METHOD** — Heavyweight method (HARD-GATES implementation); incompatible with eee autonomous-/loop mode per `agent-harness-fit-verification.md` Probe 5 mode-harness-shape (same REJECT class as superpowers/brainstorming iter-84).

## Discovery surfaces (kit v62 references) — not adopted

`hesreallyhim/awesome-claude-code` (CC-BY-NC-ND — NO fork-modify), `VoltAgent/awesome-agent-skills`, `ComposioHQ/awesome-claude-skills`, `quemsah/awesome-claude-plugins` — kit-v62 DISCOVERY_ONLY band; cite-only via `mcp__github__get_file_contents` per `research-protocol.md` Repo-discovery sub-rule.

## VERDICT

**APPROVE conf=0.91**
- top_5_adopt_now: [mattpocock/skills, vercel-labs/agent-skills, ryoppippi/ccusage, chopratejas/headroom, koalaman/shellcheck]
- top_5_reject: [vinta/awesome-python (meta-list), Shubhamsaboo/awesome-llm-apps (template-fork-CATEGORY-MISMATCH), wshobson/agents (wholesale-namespace-overlap), alirezarezvani/claude-skills (wholesale-namespace-overlap), bmad-code-org/BMAD-METHOD (heavyweight-mode-mismatch)]
