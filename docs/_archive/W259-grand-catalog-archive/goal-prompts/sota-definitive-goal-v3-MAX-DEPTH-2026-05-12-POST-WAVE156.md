# SOTA Definitive /goal v3 — MAX DEPTH FULL AUTOMATION (post-Wave-156)

**Version**: 3.0 (incorporates Wave 156 lessons + user directive 2026-05-12 PM: explicit 16-repo audit + docker/CLI unleashed + agent team orchestration deep-dive)
**Date**: 2026-05-12 17:00
**Cite class**: `constituents=[TIER-1-DIRECT @ 16 SOTA repos at HEAD SHAs (this section) + Anthropic CC sub-agents docs + CCBP claude-subagents.md + Anthropic CC hooks docs, TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 156 close evidence + 4 codex T1 verdicts + 5 T3 verdicts + 14 FM-02(c) absorption ladder + 415+ Mia pre-apply ladder, TIER-3-LOCAL-COMPOSITION @ Wave 156 plan + Section 7 terminal predicate + Section 13 Report Mandate + Wave 156 Agent B SOTA repos deep-dive 16-repo audit matrix]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Supersedes**: `tmp/sota-definitive-goal-MAX-DEPTH.md` (v1) + `tmp/sota-definitive-goal-v2-MAX-DEPTH-2026-05-12-POST-WAVE156.md` (v2)

---

## Section A — 16 SOTA Reference Repos: Audit Matrix + Adoption Status + Next-Action

Per Wave 156 Agent B sota-researcher deep-dive (`tmp/wave156-sota-repos-deep-dive-2026-05-12.md`, ~800 LOC, 89k tokens, 25 tool uses, sonnet override). User-directive listed 16 repos for line-by-line audit + adoption.

| # | Repo | HEAD SHA (PINNED) | License | Wave 156 Verdict | Current Adoption | Next-Action |
|---|------|-------------------|---------|------------------|------------------|-------------|
| 1 | **affaan-m/everything-claude-code (ECC)** | `841beea4` | MIT | **ADOPT-NOW** (165 skills) | ENABLED via plugin marketplace; 14 ECC skills DISABLED via ECC_DISABLED_HOOKS env | Audit DISABLED list per cardinal-rule-12 disposition lattice (DUPLICATE / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT); selectively re-enable per-row |
| 2 | **shanraisshan/CCBP** | `48f2ceb` | unknown | **STUDY-PILOT** (hooks-extract only) | TIER-1-DIRECT cite anchor across all cardinal rules + 39 rule files | Continue cite-anchor extraction; never install whole repo |
| 3 | **obra/superpowers** | `f2cbfbef` | MIT | **ADOPT-NOW** (8 of 14 remaining) | 6 of 14 selectively vendored (plan/debug/tdd/verification-before-completion/subagent-driven-development/requesting-code-review); installed via marketplace as `superpowers@claude-plugins-official` | Vendor remaining 8 (systematic-debugging/executing-plans/finishing-a-development-branch/receiving-code-review/using-superpowers; NOT brainstorming/writing-skills/dispatching-parallel-agents which are REJECT-FOR-FIT) |
| 4 | **AsyncFuncAI/deepwiki-open** | `5b43df54` | Apache-2.0 | **REJECT-FOR-FIT** (CITE-class only) | Used via mcp__deepwiki__ for Q&A on 50K+ public repos | Continue MCP usage; do NOT install whole repo |
| 5 | **nibzard/awesome-agentic-patterns** | `9c40e100` | Apache-2.0 | **STUDY-PILOT** (CITE-class) | Cited in parallel-sessions.md + team-orchestration.md (patterns extracted) | Continue cite-anchor extraction per pattern |
| 6 | **vinta/awesome-python** | `5909fa76` | CC-BY-4.0 | **REJECT-FOR-FIT** (CITE-class) | Discovery hint for Python library choices | Continue as discovery starting-point only |
| 7 | **wshobson/agents** | `ece811f2` | unknown | **STUDY-PILOT** (conductor extract) | wshobson-devops-troubleshooter + wshobson-security-auditor adopted as DEP-ONLY agents (Ship 2 promoted to 15 fields) | Audit remaining wshobson agents for selective vendoring; `conductor` plugin REJECT-FOR-FIT (HARD-GATE interactive Q&A setup incompatible with autonomous /loop) |
| 8 | **abhigyanpatwari/GitNexus** | `8083c39f` | unknown | **REJECT-FOR-FIT (MISIDENTIFIED — PHP tool not CC)** | NOT applicable | Drop from consideration |
| 9 | **quemsah/awesome-claude-plugins** | `62e65931` | unknown | **STUDY-PILOT** (index use) | Discovery index | Continue as Claude plugin discovery starting-point |
| 10 | **Shubhamsaboo/awesome-llm-apps** | `795212bf` | Apache-2.0 | **REJECT-FOR-FIT** (CITE-class) | Discovery only | Continue as LLM-app reference |
| 11 | **forrestchang/andrej-karpathy-skills** | `2c606141` | unknown | **ADOPT-NOW LOW priority** (already in karpathy-adapted.md 255L) | Cited in karpathy-adapted.md cardinal-rule-2 | Continue cite-anchor (karpathy-adapted.md is the operationalization) |
| 12 | **mattpocock/skills** | `f304057d` | unknown | **REJECT-FOR-FIT** (domain mismatch) | NOT applicable | Drop |
| 13 | **hesreallyhim/awesome-claude-code** | `614f102a` | **CC-BY-NC-ND-4.0** | **REJECT (license — no derivatives)** | NOT applicable | Drop (license-blocker per Probe 6) |
| 14 | **alirezarezvani/claude-skills** | `7d493fed` | unknown | **STUDY-PILOT** (format-adapt; 0 SKILL.md uses different structure) | Discovery only | Format-adapt if specific skill found valuable |
| 15 | **gsd-build/get-shit-done** | `3aaed8f5` | unknown | **STUDY-PILOT** (graphify + retrospective-canonical) | gsd-goal-verifier vendored as DEP-ONLY agent (Ship 2 promoted to 15 fields) | Selectively adopt `graphify` + `retrospective-canonical` patterns; full kit REJECT-FOR-FIT (HARD-GATE installer) |
| 16 | **vercel-labs/agent-skills** | `b9c8ee06` | unknown ([UNKNOWN-LICENSE]/conflicting per Wave 137 Fire 2 Mia OVER) | **ADOPT-NOW** (4 of 8 remaining) | 4 vercel skills vendored at `.claude/skills/vercel-*` | Vendor remaining 4 (deploy-to-vercel + react-native-skills + react-view-transitions + vercel-cli-with-tokens; STRONG-PROVENANCE-EXPRESS predicate satisfied) |

**Cohort coverage** (per CLAUDE.md §SOTA Repository Discovery 9-cohort menu):
- C1 GraphQL star+topic — covered via mcp__github__search_repositories
- C2 arxiv citation graph — covered via mcp__arxiv (when active)
- C3 HuggingFace models+datasets — covered via mcp__perplexity + exa
- C4 PapersWithCode benchmarks — covered via mcp__exa research mode
- C5 named-author blog/talk — covered via CCBP/Karpathy/Boris named-author cites
- C6 awesome-list catalogs — covered via 4 awesome-* repos above (#5/#9/#10/#13)
- C7 conference proceedings — covered via mcp__perplexity
- C8 trending feeds — covered via mcp__exa
- C9 stars-sorted-direct — covered via mcp__github__search_repositories sort=stars

**Top-10 Adoption Priority Queue** (Wave 156 Agent B):
1. ECC `autonomous-loops` (loop-architecture skill gap)
2. ECC `agent-harness-construction` (build vs verify gap)
3. ECC `canary-watch` (ONLY post-deploy monitoring primitive)
4. Vercel 4 remaining (deploy-to-vercel + react-native + view-transitions + cli-with-tokens)
5. ECC `content-hash-cache-pattern` (caching primitive gap)
6. CCBP hooks taxonomy 27+2 events (Setup/InstructionsLoaded/Elicitation/WorktreeSetup-Remove/SubagentStart-Stop/PreCompact-PostCompact/PermissionDenied — undocumented in eee)
7. ECC `mcp-server-patterns` (MCP build-side; complements client-recovery)
8. wshobson conductor (multi-session persistence; conditional on HARD-GATE removal)
9. ECC `prompt-optimizer` (low-friction)
10. GSD `graphify` + `retrospective-canonical` (STUDY-PILOT pattern-extract)

---

## Section B — GPT-5.5 Deep-Dive Convergence Consensus Workflow

**Mandate**: every architectural dimension audited by REAL GPT-5.5 via codex CLI (Path P foreground+tee). Per-dimension scoring + cite-class validation + Wave 156 progress + remaining gaps.

**12 architectural dimensions** to audit per GPT-5.5 deep-dive:

1. **Cardinal rules** (CR-0 through CR-12) — TIER-1-DIRECT conformance + per-rule cite trail
2. **Agents** (11 files) — CCBP 16-field frontmatter + cross-model gate hooks
3. **Skills** (13 local + 2468 marketplace) — origin: + sota-cite: validity
4. **Rules** (39 files) — TIER-1-DIRECT cite-anchor in first 10 lines
5. **Hooks** (19 wired + 6 latent) — T1-T7 cross-model gate operability + agent_id telemetry
6. **Commands** (4 sparse) — Anthropic CC docs conformance
7. **MCP servers** (11 active) — `.mcp.json` health + disabledMcpjsonServers state
8. **Plugins** (27 enabled) — marketplace install + auto-discovery
9. **Settings.json** (57.8k) — bloat reduction + de-duplication of legitimate cross-event wires
10. **Bootstrap files** (CLAUDE.md 62k / CLAUDE.local.md / eee.ps1 / .gitignore / settings.json) — cardinal-rule-5 only-hand-codable
11. **Tools/scripts** (.claude/hooks/scripts/*.py + scripts/*.py) — CR-9 install-risk discipline + per-hook agent_id telemetry
12. **Provenance** (docs/install-provenance.md 2.1MB / wave<N>-progress.jsonl / MEMORY.md) — append-only audit trail

**Per-dimension audit shape**:
```
Path P codex T1 dispatch:
  timeout 300 codex exec --skip-git-repo-check --color never \
    < .claude/state/codex_consult_dim<N>_<dimension>.txt 2>&1 | \
    tee .claude/state/codex_consult_dim<N>_<dimension>_OUT.txt

Verdict shape (JSON-strict at EOF):
{
  "dimension": "<name>",
  "audited_pct": <0-100>,
  "sota_reviewed_pct": <0-100>,
  "verdict": "APPROVE" | "NEEDS-REVISION" | "REJECT",
  "confidence": <0.0-1.0>,
  "primary_sources_cited": [<list of TIER-1-DIRECT cite anchors>],
  "gaps": [<list of identified gaps with sota-repo cross-ref>],
  "prescribed_edits": [<list of Pattern A edits if NEEDS-REVISION>],
  "sota_repo_alignment": {<repo>: <alignment_pct>}
}
```

**Convergence consensus**: dimension PASSES when codex T1 returns APPROVE conf≥0.85 AND audited_pct≥80% AND sota_reviewed_pct≥80% AND zero CRITICAL gaps.

**Architecture audit percentage tracker** (Section 9 progress mandate):

| Dimension | Audited % | SOTA-reviewed % | Verdict | Top gap |
|---|---|---|---|---|
| 1. Cardinal rules | 100% | 95% | APPROVE | CR-7 Phase 2 trigger predicates need testable verification scripts |
| 2. Agents | 100% | 90% | APPROVE | 7/11 not yet at 16-field full CCBP (TIER-A next-session ships) |
| 3. Skills | 100% (catalog) | 60% | NEEDS-REVISION | 14 ECC skills DISABLED need disposition-lattice audit |
| 4. Rules | 100% | 70% | NEEDS-REVISION | Files >40k (6 rules) need split per PATH D Ships 7-12 |
| 5. Hooks | 100% | 80% | NEEDS-REVISION | Hook agent_id telemetry at 31% (target ≥90%) |
| 6. Commands | 100% | 50% | NEEDS-REVISION | Only 4 commands (sparse); Anthropic-canonical 5 + plugin commands |
| 7. MCP servers | 100% | 100% | APPROVE | None |
| 8. Plugins | 100% | 100% | APPROVE | None |
| 9. Settings.json | 100% | 50% | NEEDS-REVISION | 57.8k bloat (17 _comment_* keys) — Ship 13 dedicated session |
| 10. Bootstrap files | 100% | 95% | APPROVE | CLAUDE.md 62k WARN — split per PATH D Ship 12 |
| 11. Tools/scripts | 80% | 70% | NEEDS-REVISION | Per-hook agent_id retrofit; sota_freshness_sweep.py FORWARD-REF unresolved |
| 12. Provenance | 100% | 100% | APPROVE | None |

**Overall architecture audit**: ~95% audited / ~80% SOTA-reviewed / 7 of 12 dimensions APPROVE / 5 dimensions NEEDS-REVISION (queued for next-wave ships).

---

## Section C — Cardinal Rules CR-0 through CR-12 (MANDATORY on every meta-step per CR-11)

Identical to Section 1 of v2 — see `tmp/sota-definitive-goal-v2-MAX-DEPTH-2026-05-12-POST-WAVE156.md` for full text.

Summary:
- **CR-1** cite at file:line + HEAD SHA on every Edit
- **CR-2** Karpathy 4 principles
- **CR-3** Cross-model consensus T1-T7 via REAL GPT-5.5
- **CR-4** Research-first RECALL/INVESTIGATE/VERIFY
- **CR-5** Install-priority over hand-coding
- **CR-6** Pull from newest GitHub + use OFFICIAL NATIVE CHANNEL
- **CR-7** Graduated unleash (Phase 1 default → Phase 2/3)
- **CR-8** Full-SOTA-content invariant
- **CR-9** Install-risk discipline (REVERT check + sibling-bleed defense + 2-round budget)
- **CR-10** Research-first-then-install on unknowns
- **CR-11** META-process SOTA discipline (every meta-step SOTA-cited)
- **CR-12** Upstream-install over sibling-cite (6-class disposition lattice)

---

## Section D — Docker / CLI / Terminal SOTA Command Unleashed Permission

Per user directive 2026-05-12: "sota premission to invoke all docker command, including restart, start and all sota command".

**Permission posture**: `defaultMode: bypassPermissions` per CLAUDE.local.md §ENV (current Wave 82d override) — provides unrestricted Bash/Docker/CLI execution.

**Docker SOTA command unleashed permission**:
- `docker ps` / `docker ps -a` — list containers
- `docker start <container>` / `docker stop <container>` / `docker restart <container>`
- `docker pull <image>:<tag>` (cardinal-rule-6 canonical install channel)
- `docker run -d --name <name> <image>` (deploy new services)
- `docker logs <container>` (observability)
- `docker exec -it <container> <cmd>` (shell into container)
- `docker compose up -d` / `docker compose down`
- `docker image prune` (cleanup)
- `docker network ls` / `docker volume ls`

**CLI / terminal SOTA commands unleashed**:
- `gh` (GitHub CLI): `gh api`, `gh repo`, `gh release download`, `gh issue`, `gh pr`, `gh search`, `gh extension`
- `npm`: `npm install -g <pkg>@latest`, `npm list -g`, `npm ls`, `npm cache verify`
- `pip`: `pip install`, `pip install git+https://github.com/<owner>/<repo>.git@<sha>`, `pip list`, `pip show`
- `uvx`: `uvx --refresh <pkg>`, `uvx --reinstall <pkg>`, `uvx tool list`
- `cargo`: `cargo install <crate>`, `cargo install --git <url>`
- `winget`: `winget install <pkg>` (Windows package manager)
- `git`: full git CLI + worktree + bisect + reflog + log search
- `codex`: REAL GPT-5.5 via codex CLI (DEFAULT + deep-review + deep-review-exec profiles)
- `pwsh` (PowerShell 7+): cmdlets + remote sessions

**SOTA tool inventory** (per `.claude/skills/sota-cli-tools/SKILL.md` Wave 11B operator reference):
- `rg` (ripgrep) — fast search
- `fd` (file finder) — fast file location
- `jq` / `jaq` — JSON processing
- `yq` — YAML processing
- `bat` — file viewing with syntax
- `eza` — modern ls
- `delta` — git diff viewer
- `gh` — GitHub CLI
- `ast-grep` — structural code search
- `glow` — markdown viewer
- `dust` — disk usage
- `procs` — modern ps
- `bottom` — modern top
- `lefthook` — git hooks manager
- `gitleaks` — secret scanner
- `trivy` — vulnerability scanner
- `semgrep` — code security
- `osv-scanner` — vulnerability database
- `typos` — typo finder

**Removed Wave 11A**: bash_command_allowlist.py (positive validator) — per `Z:/claude-sota-installed/.claude/rules/layered-gates-architecture.md §4.1` ACCEPTED SAFETY REGRESSION. Residual safety floor: `safety_guard.py` (catastrophic-pattern deny-list) + `agent_plan_readonly_bash_guard.py` (subagent plan-mode read-only enforcement).

---

## Section E — Agent Team Orchestration (per advanced-agent-team-standing-directive.md + superpowers ECC)

Per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` Wave 24-D OWNED at n=3 user-trigger.

**Mandatory invariants for non-trivial fires**:
1. **3-5 agent team** for non-trivial fires (architecture audit / SOTA convergence / token-eff investigation / cross-model verification / gap-resolution wave)
2. **≥2 agents in BRIDGE-MODE** (codex-rescue / gpt5-reviewer / gpt5-archaeologist) — REAL GPT-5.5 via codex CLI subprocess
3. **Brief cites SOTA repos at file:line depth** (Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA> OR official docs URL)
4. **Line-by-line SOTA repo audit** for adoption-class waves (Probe DAG 1-7 per agent-harness-fit-verification.md)
5. **Anthropic official docs as authority** (code.claude.com/docs/en/* TIER-1 LIVING-AUTHORITY)
6. **ARTIFACT-INLINE** per FM-19 for Bash-only / no-Write agents (architect / gpt5-reviewer / gpt5-archaeologist / code-reviewer)
7. **Mia pre-apply** on returned prescriptions (cheap-probe verification BEFORE Edit; n=415+ ladder)
8. **OUTPUT_BUDGET + TERMINATION** in every brief
9. **CADP cap** — max 3 concurrent (max 5 cumulative) per `parallel-agent-wave.md §Cache-Aware Dispatch Pacing` unless cache rate ≥50% verified via `python Z:/claude/ccc/tools/status.py`

**Spawn template** (paste into orchestrator turn):

```
Agent A — sota-researcher (Sonnet stand-in OR REAL GPT-5.5 via codex CLI)
  task: line-by-line audit of <kit/repo> + Probe DAG 1-7 vs eee state
  brief cites: Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA> + code.claude.com/docs/...
  output: tmp/wave<N>-agentA-<topic>-<date>.md (ARTIFACT-INLINE if read-only)
  OUTPUT_BUDGET: 400-600 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 20 | terminationCondition: on_token_budget_exceeded:200000

Agent B — codex-rescue (BRIDGE-MODE → REAL GPT-5.5)
  task: E2E deep dive on <axis>; cite Z:/repos/deps/ + official docs at file:line
  brief: explicit "ARTIFACT-INLINE: tmp/wave<N>-agentB-..." mandate per FM-19
        + per-call codex time-budget (default 90s / cap 120s / 180s with reason; FM-17.d defense)
  output: REAL GPT-5.5 verdict origin via codex CLI bg job
  OUTPUT_BUDGET: 600-1000 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 25 | terminationCondition: on_text_match: "VERDICT:" | on_subprocess_failure: 3

Agent C — gpt5-reviewer (BRIDGE-MODE → REAL GPT-5.5)
  task: adversarial review of <verdict>; what did Agent B miss?
  brief: explicit ARTIFACT-INLINE mandate per FM-19; per-call codex time-budget (default 90s / cap 120s / 180s with reason)
  model: sonnet (FM-17.g defense override)
  output: REAL GPT-5.5 cross-check verdict
  OUTPUT_BUDGET: 200-400 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 20 | terminationCondition: on_text_match: "VERDICT:" | on_tool_count_exceeded: 35

Agent D — gpt5-archaeologist (BRIDGE-MODE → REAL GPT-5.5)
  task: pre-edit hotspot/bus-factor/bug-magnet on <module-set>
  brief: explicit ARTIFACT-INLINE mandate per FM-19; per-call codex time-budget (default 90s / cap 120s / 180s with reason)
  model: sonnet (FM-17.g defense override)
  output: REAL GPT-5.5 risk-stratified findings
  OUTPUT_BUDGET: 300-500 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 20 | terminationCondition: on_text_match: "ARCHAEOLOGY:" | on_tool_count_exceeded: 30

Agent E — architect (Sonnet stand-in)
  task: ≥2-option trade-off design; cites SOTA primary at file:line
  brief: explicit ARTIFACT-INLINE mandate per FM-19
  output: design doc (orchestrator persists)
  OUTPUT_BUDGET: 300-500 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 15 | terminationCondition: on_text_match: "DESIGN:"
```

**Per-agent skill preload mandate** (per CCBP claude-subagents.md:32-34 + Ship 22+23 lessons):
- sota-researcher: skills [verification-before-completion, deep-research, source-driven-development] + mcpServers [repomix + perplexity + exa + firecrawl + deepwiki + context7 + github + graphiti]
- architect: skills [verification-before-completion, code-architect, agent-harness-construction] + mcpServers [repomix]
- code-reviewer: skills [verification-before-completion, requesting-code-review, code-review-and-quality, silent-failure-hunter] + mcpServers [context7, github, repomix]
- debugger: skills [systematic-debugging, debugging-and-error-recovery, agent-introspection-debugging] + mcpServers [repomix]
- evaluator: skills [verification-before-completion, requesting-code-review, code-review-and-quality] + mcpServers [repomix] (NO github per Ship 1.1 conservative-removal)
- gpt5-reviewer: skills [verification-before-completion, requesting-code-review, code-review-and-quality] + mcpServers [repomix] (NO github per Ship 22)
- gpt5-archaeologist: skills [verification-before-completion, debugging-and-error-recovery] + mcpServers [repomix]
- verifier: skills [verification-before-completion, code-review-and-quality] + mcpServers []
- gsd-goal-verifier: skills [verification-before-completion, debugging-and-error-recovery] + mcpServers [repomix]
- wshobson-devops-troubleshooter: skills [debugging-and-error-recovery, agentic-engineering] + mcpServers [repomix]
- wshobson-security-auditor: skills [security-and-hardening, verification-before-completion, safety-guard] + mcpServers [repomix]

**Spawn discipline** (per `parallel-agent-wave.md §Cache-Aware Dispatch Pacing`):
- Default max 3 concurrent (Phase 1 unverified cache)
- Max 5 cumulative per session arc without intervening `status.py` probe
- Before 6th+ dispatch: ≥3 accounts show `Session 🟢 <50%` via `python Z:/claude/ccc/tools/status.py`
- If pool starves: STOP, wait for resets, OR activate Sonnet fallback per CLAUDE.local.md ENV (g)

---

## Section F — REAL GPT-5.5 MAXIMUM utilization (identical to v2 Section 2)

**Path P canonical recipe**:
```bash
timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_<topic>.txt 2>&1 | \
  tee .claude/state/codex_consult_<topic>_OUT.txt
```

6 load-bearing parameters + per-call codex budget 90s/120s/180s. Verdict reading: `wc -l + tail -50` (EOF FIRST; never read first hit).

---

## Section G — Adversarial Review LENS 1+2+3+4+5+6 (identical to v2 Section 3)

LENS 1 codex T1 + LENS 2 gpt5-reviewer subagent + LENS 3 Mia pre-apply (n=415+) + LENS 4 FM-09 2-stage + LENS 5 gsd-goal-verifier + LENS 6 T3 mechanical.

---

## Section H — Quality Gates 1-11 fail-closed (identical to v2 Section 4)

1 pre-flight + 2 Edit-time hooks + 3 pre-commit T2 STRICT + 4 post-commit T3 + 5 post-push T4 + 6 plan-exit T5 + 7 session-end T6 + 8 T7 ask-without-act + 9 SubagentStop telemetry + 10 Iron Law verification-before-completion + 11 gsd-goal-verifier post-hoc.

---

## Section I — Native Install via canonical CR-6 channels (identical to v2 Section 5)

`/plugin install` + `npm install -g @latest` + `gh release download` + `git clone --depth 1` + `uvx --refresh` + `docker pull` + `cargo install`. NEVER copy from Z:/repos/deps/.

---

## Section J — Health Check Matrix Layer A-K (identical to v2 Section 6; every 5th iter)

A Plugins / B MCPs / C Hooks / D Agents / E Skills / F Settings / G Conformance / H Codex / J Git / K Memory. Run via ctx_batch_execute parallel probe.

---

## Section K — Terminal Predicate (Ships ordered by PRIORITY — v3 enriched per user audit-and-prioritize directive)

VERIFIED COMPLETE when ALL of:

### TIER-A: HIGH-PRIORITY (next session immediate)

- **(SA1) debugger.md 14→16 fields**: add skills + mcpServers (uniform additive matching Ship 22/23 pattern)
- **(SA2) architect.md 15→16 fields**: add 1 missing field
- **(SA3) code-reviewer.md 15→16 fields**: add 1 missing field
- **(SA4) `.claude/.claude.json` gitignore + remove tracked** (closes OPEN HIGH T3 `0346ebf4`)
- **(SA5) ECC autonomous-loops skill verification**: `[ -d .claude/plugins/cache/everything-claude-code/.../skills/autonomous-loops/ ]` AND verify auto-discoverable via `using-agent-skills` meta-skill
- **(SA6) ECC agent-harness-construction skill verification**: same pattern
- **(SA7) ECC canary-watch skill verification**: same pattern
- **(SA8) ECC content-hash-cache-pattern + mcp-server-patterns verification**: same pattern
- **(SA9) ECC prompt-optimizer skill verification**: same pattern
- **(SA10) Vercel 4 remaining skill installations**: `[ -d .claude/skills/vercel-deploy-to-vercel/ ]` + 3 others (deploy-to-vercel + react-native-skills + react-view-transitions + vercel-cli-with-tokens) — install via Vercel agent-skills marketplace per CR-6

### TIER-B: MEDIUM-PRIORITY (per-dimension audit fires)

- **(SB1) Ship 13 settings.json de-bloat**: 57.8k → <40k via 17 `_comment_*` keys moved to `docs/settings-changelog.md`
- **(SB2-7) PATH D file splits** (6 files >40k):
  - team-orchestration.md (84k) → parent + 5 children
  - cross-model-consensus.md (64k) → parent + 3 children
  - codex-t1-fix-forward-pattern.md (47k) → Pattern A/B/C/D files
  - layered-gates-architecture.md (42k) → 5-layers + asyncRewake + worktree-iso
  - agent-harness-fit-verification.md (42k) → 7 sub-classes + Probe-DAG
  - CLAUDE.md (62k) → cardinal-rules + bootstrap + skills-orchestration
- **(SB8) Hooks agent_id retrofit**: 9/29 hooks (31%) emit agent_id+agent_type → target ≥90% (26+/29) per `audit-action-loop.md §Hook telemetry contract`
- **(SB9) ECC 14 DISABLED hooks audit**: per `ECC_DISABLED_HOOKS` env list → cardinal-rule-12 disposition lattice per row
- **(SB10) Anthropic CC commands install**: install canonical bundled commands per `https://code.claude.com/docs/en/commands`
- **(SB11) fm17d_stall_detector.py SubagentStop schema fix**: re-enable after fixing 100% schema-rot (172/172 entries)
- **(SB12) sota_freshness_sweep.py install**: FORWARD-REF unresolved; install per cardinal-rule-5

### TIER-C: LOW-PRIORITY (cleanup + ceremony)

- **(SC1) tmp/ archive cleanup**: move stale tmp/wave*.md (>14d) → `docs/_archives/2026-05-12/`
- **(SC2) Ship 24 Iron Law verification gate**: gsd-goal-verifier post-hoc PASS + Section 13 Report Mandate

### Cross-cutting verification (every ship)

- Cross-model gate satisfaction (cardinal-rule-3): T1 + T2 + T3 fire per Section 8 continuous loop
- 8 conformance percentages re-measured per Section 9
- Provenance: docs/install-provenance.md + MEMORY.md + .claude/state/wave157-progress.jsonl entries

---

## Section L — Continuous Loop (per /goal autonomous iter — identical to v2 Section 8)

```
loop:
  1. read-state       (git log/status; HEAD age)
  2. health-check     (Layer A-K every 5th iter)
  3. context-probe    (/context all; manual /compact at 25-30%)
  4. compact-or-rewind (manual /compact OR /rewind; AUTOCOMPACT=60 backstop)
  5. research         (RECALL → INVESTIGATE → VERIFY)
  6. plan-one-bounded (next Ship per Section K priority)
  7. T1 codex consult (Path P foreground+tee; OR Pattern A iter-2 if T3 upstream)
  8. Mia pre-apply    (LENS 3: verify prescribed_edits against runtime state)
  9. Pattern A apply  (Edit/Write; SINGLE atomic apply)
  10. LENS 2 optional (gpt5-reviewer subagent for non-trivial design)
  11. PRE-COMMIT VERIFY (yaml.safe_load + smoke probes; Iron Law)
  12. ATOMIC COMMIT FAST [~30s window to beat FM-02(c) absorption n=14 firm]
  13. T2 commit-time  (sync 120s; Pattern B HNF on timeout)
  14. T3 postcommit   (async; Pattern A iter-2 if NEEDS-REVISION)
  15. progress-tracker (append wave157-progress.jsonl)
  16. context-probe   (again before next iter)
  17. compact-OR-loop (manual /compact if context >25-30%)
```

---

## Section M — Progress Tracking (Section 9 v3: 12 dimensions + 8 percentages)

**Per-iter echo**:

1. Agents 14+ fields: X/11 = Y%
2. Agents 15+ fields: X/11 = Y%
3. Agents 16-field full CCBP: X/11 = Y%
4. Agents PROVENANCE-ONLY qualifier: X/6 = Y%
5. Files >40k MD: count
6. CR-9 sibling-bleed agents+rules: X closed of Y
7. T3 NEEDS-REVISION 24h actionable: X
8. FM-02 (c) absorption ladder: n=N firm
9. Mia pre-apply ladder: n=N
10. 12-dimension architecture audit: APPROVE count / NEEDS-REVISION count / REJECT count
11. Hook agent_id telemetry: X/29 = Y%
12. ECC skill auto-discoverability: X/10 = Y% (Top-10 adoption priority)

---

## Section N — Auto-recovery on named failure modes (identical to v2 Section 10)

FM-02 (b)+(c) / FM-09 / FM-16 / FM-17.a-g / FM-19 / FM-20 / FM-21 + Pattern A apply / Outcome B revert / Pattern B HNF + CADP fleet-probe-fail.

---

## Section O — Provenance Mandate (identical to v2 Section 11)

Every ship writes:
- docs/install-provenance.md append
- .claude/projects/Z--claude-sota-installed/memory/MEMORY.md index line under 150 chars
- .claude/state/wave157-progress.jsonl per-ship JSON entry

---

## Section P — Anti-patterns (UPDATED with v3 catches from Wave 156)

All v2 anti-patterns PLUS:

- **Re-attempt deferred ships caught via Mia OVER** — refuted by Wave 156 Mia OVER catches (Ship 4 T6 already wired; Ship 5 local-judge state-stale; Ships 16-20 ECC already auto-discoverable). Per cardinal-rule-7: state-probe first; re-attempting deferred ships wastes effort.
- **Trust plan target without state probe** — refuted by Wave 156 4 Mia OVER instances. ALWAYS state-probe via ctx_batch_execute before designing edits.
- **Use Path P codex T1 with `-p deep-review-exec` flag** — refuted by codex-t1-pattern-b-forward-discipline.md §Path P recipe: DEFAULT profile (NO `-p` flag) routes via codex CLI default; `-p deep-review-exec` triggers Pattern B HNF on broad prompts.
- **Skip Mia pre-apply on uniform pattern application** — refuted by Wave 156 Ship 22 codex T1: even uniform patterns may have edge cases (github MCP write-tools); Mia probes EVERY claim.
- **Treat sibling claude-sota cite as install source** — refuted by CR-9 sibling-bleed defense + CR-12 upstream-install-priority: sibling is TIER-3-LOCAL-OPERATOR-DERIVED; install from upstream marketplace OR cite-import-AMBER only.
- **Vendor entire SOTA repo without selective adoption** — refuted by Wave 156 16-repo audit: 5 ADOPT-NOW + 5 STUDY-PILOT + 5 REJECT-FOR-FIT + 1 RE-IDENTIFIED. Vendor selectively per cardinal-rule-12 disposition lattice (GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL).

---

## Section Q — Report Mandate (identical to v2 Section 13)

13 items surfaced at /goal completion OR mid-arc checkpoint.

---

## Section R — Pre-state captured (post-Wave-156; identical to v2 Section 14)

Refer to v2 Section 0 + this v3 Section A audit matrix.

---

## Section S — Wave 156 lessons + v3 NEW lessons applied

All 10 v2 lessons PLUS:

11. **16-repo audit matrix is the canonical adoption source-of-truth** — Wave 156 Agent B sota-researcher line-by-line audit produced HEAD-SHA-pinned verdicts for all 16 user-listed repos. Reference matrix Section A for adoption decisions.

12. **12-dimension architecture audit drives ship priority** — current state: 7/12 APPROVE + 5/12 NEEDS-REVISION. The 5 NEEDS-REVISION dimensions (skills/rules/hooks/commands/settings) drive TIER-B ship priority.

13. **Docker/CLI unleashed permission applies under bypassPermissions Wave 82d override** — full docker + gh + npm + pip + uvx + cargo + winget + git + codex + pwsh unrestricted. Cardinal-rule-7 Phase 1 bootstrap exception until Tier 1a INSTALLED + arc-convergence predicate satisfied.

14. **Agent team orchestration per advanced-agent-team-standing-directive.md Wave 24-D** — 3-5 agent fan-out for non-trivial fires; ≥2 BRIDGE-MODE agents (codex-rescue/gpt5-reviewer/gpt5-archaeologist) with model:'sonnet' FM-17.g defense override.

15. **Per-agent skill preload mandate** (per CCBP claude-subagents.md:32-34 + Ship 22+23): explicit skills + mcpServers per agent role; conservative github MCP exclusion for read-only agents (Ship 1.1 precedent).

---

## OPERATOR PASTE-READY /goal COMMAND (v3)

```
/goal "Wave 157 FULL-SOTA terminal automation v3 (post-Wave-156 close; user-directive 2026-05-12 PM: 16-repo audit + docker/CLI unleashed + agent team orchestration + GPT-5.5 deep-dive convergence consensus + max-depth automation). READ AND EXECUTE Z:/claude-sota-installed/tmp/sota-definitive-goal-v3-MAX-DEPTH-2026-05-12-POST-WAVE156.md per its embedded Section K terminal predicate. MANDATORY: (1) Cardinal rules CR-0 through CR-12 on every meta-step per CR-11. (2) 16 SOTA repos audit matrix per Section A: ECC ADOPT-NOW (Top-10 priority queue: autonomous-loops + agent-harness-construction + canary-watch + content-hash-cache + mcp-server-patterns + prompt-optimizer) + superpowers 8 remaining vendor + Vercel 4 remaining + 5 REJECT-FOR-FIT (mattpocock/hesreallyhim CC-BY-NC-ND license/deepwiki-open/awesome-python/awesome-llm-apps) DROP from re-attempts. (3) GPT-5.5 deep-dive convergence consensus per Section B: 12 architectural dimensions audit (cardinal-rules/agents/skills/rules/hooks/commands/MCP/plugins/settings/bootstrap/tools/provenance); current 7/12 APPROVE + 5/12 NEEDS-REVISION; PATH B ships address NEEDS-REVISION dimensions; Path P codex exec foreground+tee DEFAULT profile per Section F (--skip-git-repo-check --color never + 300s timeout + ≤50 LOC focused prompt + JSON-at-EOF). (4) REAL GPT-5.5 MAXIMUM via Path P + BRIDGE-MODE gpt5-reviewer/gpt5-archaeologist/codex-rescue with model:'sonnet' override per FM-17.g; per-call budget 90s default / 120s cap / 180s reason. (5) Adversarial review LENS 1+2+3+4+5+6 per Section G on every non-trivial ship (codex T1 + gpt5-reviewer subagent + Mia pre-apply n=415+ + FM-09 2-stage + gsd-goal-verifier + T3 mechanical). (6) Agent team orchestration per Section E (3-5 agent fan-out; ≥2 BRIDGE-MODE; ARTIFACT-INLINE per FM-19; OUTPUT_BUDGET + TERMINATION; per-agent skill preload mandate). (7) Quality gates 1-11 fail-closed per Section H. (8) Native install via canonical CR-6 channels per Section I (plugin marketplace + npm/pip/uvx/docker/cargo/winget; NEVER copy from Z:/repos/deps/). (9) Health check matrix Layer A-K per Section J every 5th iter. (10) Docker/CLI/terminal SOTA command unleashed per Section D (docker ps/start/stop/restart/pull/logs/exec/compose; gh CLI; npm/pip/uvx/cargo/winget; git full; codex; pwsh; rg/fd/jq/yq/bat/eza/delta/ast-grep/glow/dust/procs/bottom/lefthook/gitleaks/trivy/semgrep/osv-scanner/typos). (11) Terminal predicate Section K — TIER-A immediate: SA1-3 debugger/architect/code-reviewer 14-15→16 fields + SA4 .claude/.claude.json gitignore + SA5-9 ECC 5 skills verification + SA10 Vercel 4 remaining installations. TIER-B medium: SB1 settings.json 58k→<40k (17 _comment_* keys move) + SB2-7 PATH D 6 file splits + SB8 hooks agent_id retrofit 31%→90% + SB9 ECC 14 DISABLED hooks audit + SB10 Anthropic CC commands install + SB11 fm17d_stall_detector schema fix + SB12 sota_freshness_sweep install. TIER-C low: SC1 tmp/ archive + SC2 Ship 24 Iron Law gate. (12) Continuous loop Section L per iter (read-state → health → context-probe → compact-or-rewind → research → plan-one-bounded → T1 → Mia → Pattern A → LENS 2 → PRE-COMMIT VERIFY → ATOMIC COMMIT FAST [within ~30s to beat FM-02(c) absorption n=14 firm] → T2 → T3 → progress-tracker → context-probe → compact-OR-loop). (13) Progress tracking Section M 12 dimensions + 8 percentages echoed every iter. (14) Auto-recovery Section N on FM-02/09/16/17.a-g/19/20/21 + T1 NEEDS-REVISION conf≥0.85 Pattern A apply / REJECT Outcome B revert / Pattern B HNF trace-mine + CADP fleet-probe-fail. (15) Provenance Section O to docs/install-provenance.md + MEMORY.md + .claude/state/wave157-progress.jsonl per ship. (16) Anti-patterns Section P fail-closed (UPDATED: do-not-re-attempt-deferred-ships-caught-via-Mia-OVER / state-probe-first-before-design / DEFAULT-codex-profile-not-deep-review-exec / Mia-pre-apply-on-uniform-patterns / sibling-NOT-install-source / selective-vendoring-per-disposition-lattice). (17) Report mandate Section Q at /goal completion (ship SHAs + verdict file paths + LENS results + 12-dim audit + 8 percentages + health-matrix + provenance + FM-17.g status + FM-02(c) ladder + Mia ladder + Pattern A iter-2 rounds + 16-repo audit matrix re-checked + next-wave recommendations). PRE-STATE: Wave 156 close complete; 8 ships delivered (5 atomic + 3 FM-02(c) absorbed; all semantically landed). Agent CCBP 11/11 at 14+ fields (100% from 55%); 4/11 at 16-field full (36%). T3 actionable: 0. FM-02(c) n=14 firm; Mia n=415+. FM-17.g defense active (model:'sonnet' on Agent dispatches). 4 deferred ships via Mia OVER (DO NOT re-attempt: 3b/4/5-6/16-20). 16-repo audit matrix at Section A pinned at HEAD SHAs. 12-dimension architecture audit: 7/12 APPROVE + 5/12 NEEDS-REVISION. Plan reference: .claude/plans/cryptic-shimmying-dewdrop.md + tmp/wave156-sota-repos-deep-dive-2026-05-12.md (Agent B). COMPACT DISCIPLINE: manual /compact at 25-30% with steered hint per coordination.md §12 + AUTOCOMPACT backstop env CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=60 last-resort. Estimated 4-8h for TIER-A; 12-24h for TIER-A+B; 24-36h for TIER-A+B+C with live elapsed/turns/tokens panel per CC 2.1.139+ /goal feature. Cite class: effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8."
```

---

## End of definitive v3 SOTA /goal prompt
