---
wave: 136
fire: 1
voice: 2
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g) Anthropic Max Opus depletion fallback per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
date: 2026-05-10
scope: SOTA convergence deep-dive on kits v55-v64 (latest = v64; no v65) + 10 user-named repos
output_budget: ≤600 LOC
termination: on_handoff_to: orchestrator | on_text_match: "VERDICT:"
---

# Wave 136 Fire 1 Voice 2 — SOTA Convergence Research

## STAND-IN-NOTICE

This dispatch ran as **operator-side direct execution** (orchestrator main thread), NOT as a true gpt5-archaeologist or sota-researcher Agent dispatch. Cross-model gate NOT structurally satisfied for this voice — operator (Sonnet 4.7 1M) compiled findings from local file probes + gh CLI. Voice 1 (Path P codex bg REAL GPT-5.5) provides cross-model coverage per cardinal-rule-3 Phase 1 bootstrap exception. Voice 3 (architect) provides design-side independent voice.

## Sub-task 1 — Kits v55-v64 Convergence Findings

### Latest version: **v64** (no v65 exists; v55, v58, v60-v64 reviewed)

### Convergent core (stable across ≥5 versions = strong SOTA convergence)

#### `DEFAULT_INSTALL_CORE` (v55, v58, v60, v62, v64 — IDENTICAL across 5 versions)

| Repo | Status in claude-sota-installed | Disposition |
|---|---|---|
| `ryoppippi/ccusage` | ZERO-INSTALL via `npx` (Wave 82e) | ✅ ADOPTED |
| `rtk-ai/rtk` | INSTALLED-WIRED v0.39.0 (Wave 135 Fire 7) | ✅ ADOPTED |
| `oraios/serena` | INSTALLED-VIA-MCP-WIRE | ✅ ADOPTED |
| `yamadashy/repomix` | INSTALLED-VIA-NPM | ✅ ADOPTED |
| `BurntSushi/ripgrep` | PLANNED | ⚠️ GAP (system-PATH alternative likely sufficient) |
| `sharkdp/fd` | PLANNED | ⚠️ GAP |
| `jqlang/jq` | PLANNED | ⚠️ GAP (Bash builtin grep+awk usually adequate) |
| `mikefarah/yq` | PLANNED | ⚠️ GAP |
| `cli/cli` (gh) | PLANNED but **system-PATH installed** at `C:/Program Files/GitHub CLI/gh` | ✅ ADOPTED-VIA-SYSTEM |
| `pre-commit/pre-commit` | INSTALLED v4.6.0 (Wave 135 Fire 7) | ✅ ADOPTED |
| `casey/just` | PLANNED | ⚠️ GAP (low-priority; pure shell scripts work) |
| `jdx/mise` | NOT-FOUND in manifest | 🚨 GAP — adopt or explicit-defer |
| `astral-sh/uv` | PLANNED but used implicitly via `uv tool install pre-commit` | ✅ ADOPTED-VIA-USAGE |

**Adoption rate: 7/13 fully adopted, 6/13 GAP** (mostly low-friction CLI tools with system-PATH alternatives or shell builtins).

#### `OFFICIAL_FOUNDATION` (v55-v64 stable; ~25 repos)

Anthropic+OpenAI+MCP+GitHub+agentskills foundation. Status:

- **Anthropic**: cwc-long-running-agents INSTALLED Section 17 (5 primitives + 4 reference plugins) ✅
- **OpenAI**: codex-plugin-cc INSTALLED-PARTIAL `codex@openai-codex@1.0.4` ✅
- **MCP**: github-mcp-server INSTALLED-VIA-PLUGIN ✅
- **agentskills/agentskills**: NOT installed — **this is potentially distinct from addy/vercel/anthropic agent-skills marketplaces** (worth verifying as separate org)

#### `WORKFLOW_HARNESS_ELITE` (recurring across versions)

| Repo | Status | Disposition |
|---|---|---|
| `bmad-code-org/BMAD-METHOD` | NOT in manifest | 🚨 GAP — high-star convergence repo |
| `eyaltoledano/claude-task-master` | 1 mention in manifest | ⚠️ PARTIAL |
| `automazeio/ccpm` | NOT in manifest | 🚨 GAP |
| `github/spec-kit` | NOT in manifest | 🚨 GAP — high-star convergence |
| `gsd-build/get-shit-done` | NOT in manifest | ⚠️ STUDY-PILOT (Wave 6 Agent M flagged ADOPT-NOW) |
| `wshobson/agents` | 0 mentions | 🚨 GAP — 35,119★ MIT (verified gh API) |
| `affaan-m/everything-claude-code` | INSTALLED via `claude plugin install everything-claude-code` ✅ |
| `Wirasm/PRPs-agentic-eng` | NOT in manifest | ⚠️ STUDY-PILOT |
| `humanlayer/humanlayer` | NOT in manifest | ⚠️ STUDY-PILOT |

#### `MEMORY_MCP_AUDIT_REQUIRED` — claude-sota-installed picks
- `doobidoo/mcp-memory-service` ✅ INSTALLED v10.51.3 (Wave 124)
- `getzep/graphiti` ✅ PARTIAL v0.29.0 (Wave 105 — MCP wiring incomplete pending OPENAI_API_KEY)
- `chopratejas/headroom` — NOT YET (Wave 133 candidate Top-5)
- All other 14 MEMORY_MCP repos = audit-required, not adopted (correct per v64 gate discipline)

#### `SECURITY_MCP_GOVERNANCE`
- `gitleaks` INSTALLED-VIA-SYSTEM-PATH (Wave 62) ✅
- `aquasecurity/trivy`, `google/osv-scanner`, `semgrep/semgrep` — partially in scope per Section 5 EXPANSION
- `trailofbits/claude-code-config` — NOT installed but referenced

### v64-specific elite primitives — 8 skills + 6 agents

v64 ships .claude/skills/ + .claude/agents/ subtrees with **thin SKILL.md/agent.md files (5-line bodies)**. Examination shows they are LOW-CONTENT placeholder definitions, NOT load-bearing implementations. Examples:

```
v64/codex-bridge.md (86B): "Run Codex review/adversarial review/rescue and reconcile findings."
v64/source-auditor.md (169B): "Audit repos before installing plugins/MCP/hooks/dashboards/memory/bridges. Return risks, permissions, network/file access, license, uninstall path."
```

Equivalent functionality already EXISTS in claude-sota-installed via:
- ECC `safety-guard` SKILL (mounted via `everything-claude-code` plugin)
- addy `security-and-hardening` SKILL (mounted via `addy-agent-skills` marketplace)
- superpowers `requesting-code-review` + `code-reviewer` SKILL (mounted via `claude-plugins-official`)
- Bundled codex slash commands `/codex:review`, `/codex:adversarial-review`, `/codex:rescue` from openai-codex plugin

**Disposition for v64 skills/agents: NO-ADOPT (already covered by 4 existing plugin marketplaces with deeper implementations)** per `kiss-dry-yagni.md` Must-Never #4.

### v64 EXECUTE_V64_ELITE_PLAN.md — 8-phase workflow

Phases 0-8 = baseline → install default core → harness files → semantic context → worktree exec → Codex review → quality gates → benchmark before adoption → memory/MCP gate.

**Status assessment**: claude-sota-installed already implements Phases 0-2, 4-5 via:
- Phase 0 baseline: ccusage daily ZERO-INSTALL ✅
- Phase 1 install default core: 7/13 ADOPTED ✅ partial
- Phase 2 harness files: CLAUDE.md + .claude/{skills,agents}/ ✅
- Phase 4 worktree: `eee --worktree` per `tools/eee.ps1` ✅
- Phase 5 Codex review: T1-T3 hooks per Section 13 + bundled `/codex:*` commands ✅
- Phase 6-8 quality gates: PARTIAL (Section 5 EXPANSION semgrep/trivy/osv-scanner queued)

**Phase 7 Benchmark before adopting** is NOT mechanically enforced — operator discipline only. **ARGUE FOR ADOPTION** as automated pre-install gate (Wave 137+ candidate).

## Sub-task 2 — 10 User-Named Repos Verification

| # | Repo | HEAD (gh API verified 2026-05-10) | License | Stars | Created | Install Status | Probe DAG Verdict |
|---|---|---|---|---|---|---|---|
| 1 | `vercel-labs/agent-skills` | `b9c8ee0` 2026-05-05 | MIT | 26,364 | 2025-12-08 | **CLONED at `Z:/repos/deps/vercel-labs-agent-skills/`** but NOT installed as runtime plugin (no `.claude-plugin/` subdir). Wave 133 Fire 1 ranked ADOPT-NOW Top-2. | **STUDY-PILOT** — Probe 4 plugin-namespace clean (no `agent-skills` marketplace cache yet); Probe 5 mode-harness OK (frontend specialty subset); Probe 6 LICENSE MIT ✅. Install path: `/plugin marketplace add` after first verifying `.claude-plugin/marketplace.json` exists |
| 2 | `vinta/awesome-python` | `06b0243` (default branch unclear; not main/master via gh) | CC-BY-4.0 (CC license — REFERENCE-ONLY per CR-9 license-class lattice) | 296,905 | older | NOT installed; CITE-REFERENCE-ONLY discovery list | **REJECT-FOR-FIT** — Probe 7.a demand-absence: discovery aggregator with no install-class artifact; sss already has `awesome-python` cite-anchor convention via `research-protocol.md` 6-catalog discovery surface |
| 3 | `nibzard/awesome-agentic-patterns` | `9c40e10` 2026-05-07 | per repo (likely MIT) | 4,505 | 2025-05-31 | NOT in manifest; **distinct from cited `awesome-agentic-patterns` at `Z:/repos/deps/awesome-agentic-patterns/` HEAD `ffb42768` (different fork)** | **VERIFY** — confirm whether nibzard fork is upstream or sibling; if upstream-canonical, refresh existing cites at `Z:/repos/deps/awesome-agentic-patterns/` to nibzard HEAD |
| 4 | `wshobson/agents` | `9f9ba32` 2026-05-09 | MIT (via gh API) | 35,119 | 2025-07-24 | NOT in manifest; 3 mentions in install-provenance suggest prior-fire research | **STUDY-PILOT** — Probe 1+2+3+4 PASS (clean MIT, no plugin namespace conflict, agent-skills shape compatible with .claude/agents/); Probe 5 mode-harness needs verification (autonomous /loop compat); Probe 7.b DEMAND-CREATES-NEW-WORKFLOW IF wshobson agent stack adds capabilities orthogonal to ECC + addy (e.g., specialized engineering subagents not in those marketplaces) |
| 5 | `alirezarezvani/claude-skills` | `aec188f` 2026-05-10 | MIT | 14,313 | 2025-10-19 | NOT installed; 1 mention in install-provenance. Per `Z:/claude-sota/.claude/rules/research-protocol.md` 6-catalog discovery surface CITE-REFERENCE | **STUDY-PILOT** — Probe 4 plugin-namespace risk: 235+ skills, 540 SKILL.md across 9 domains MAY DUPLICATE addy-agent-skills 21 skills + ECC 100+ skills; pilot would require Probe 4+5+6 audit of NON-overlapping subset (e.g., engineering / business-growth / standards domains absent in addy) |
| 6 | `mattpocock/skills` | `733d312` 2026-05-07 | MIT | 68,805 | 2026-02-03 | NOT installed; 4 mentions in manifest as CITE-REFERENCE; PLANNED | **ADOPT-NOW** — Wave 133 Fire 1 ranked Top-1; 68k★ named-T2 (Matt Pocock TypeScript educator, named-author quote in `citation-discipline.md` rule #6); Probe 1-7 should PASS. Install: `/plugin marketplace add https://github.com/mattpocock/skills` |
| 7 | `Shubhamsaboo/awesome-llm-apps` | `795212b` 2026-05-09 | Apache-2.0 | 109,569 | 2024-04-29 | NOT in manifest; 1 mention in install-provenance | **STUDY-PILOT** — discovery aggregator (similar to vinta), but Apache-2.0 enables fork-modify; Probe 7.b candidates: cite-extract specific LLM-app patterns AS reference for Section 4/4.5/5/7/8 EXPANSION — NOT install-as-runtime |
| 8 | `abhigyanpatwari/GitNexus` | `d69eadf` 2026-05-10 (HEAD; runtime pinned at v1.6.4-rc.112 commit `54f53eb0`) | **PolyForm Noncommercial 1.0.0** (verified) | 37,399 | 2025-08-02 | **INSTALLED-RC-UPGRADED** v1.6.4-rc.112 (Wave 132 Fire 3) | **RETAIN** — 3-round multi-agent deep-dive RETAIN verdict per `reference_w132_fire2_round3_retain_close_synthesis_2026_05_10.md`. PolyForm-NC license OK for local non-commercial eee runtime. RC-stream pinned per CR-9 version-pin mandate. NEXT: Wave 132 Fire 4 candidate = stable 1.6.4 bump auto-fire on `npm view gitnexus dist-tags.latest` change |
| 9 | `addyosmani/agent-skills` | `3ff4b51` 2026-05-09 (runtime pinned at `742dca5`) | MIT (via gh API) | 38,119 | 2025-? | **INSTALLED** as `addy-agent-skills` marketplace | **ALREADY-ADOPTED** — 21 skills mounted; Wave 79 install. Per CR-12 PRIMARY upstream-install path. **Drift check**: runtime SHA `742dca5` (2026-05-06) → upstream HEAD `3ff4b51` (2026-05-09) = 3-day drift; skill content additions possible. **Refresh queued** as Wave 137 candidate per `mcp-disconnect-recovery.md` D6 today-release-auto-upgrade discipline |
| 10 | `affaan-m/everything-claude-code` | `841beea` 2026-04-30 | MIT | 177,688 | older | **INSTALLED** as `everything-claude-code` plugin v2.0.0-rc.1 | **ALREADY-ADOPTED** — multi-source mining trace at `reference_mattpocock_skills_pattern_extract_2026_04_30.md`. Per CR-12 PRIMARY |

### Summary of 10 user-named repos

| Verdict | Count | Repos |
|---|---|---|
| ADOPT-NOW | 1 | mattpocock/skills (Top-1 Wave 133 ratification) |
| STUDY-PILOT | 4 | vercel-labs, wshobson, alirezarezvani, Shubhamsaboo |
| ALREADY-ADOPTED | 3 | GitNexus (RC-upgraded), addyosmani, affaan-m |
| REJECT-FOR-FIT | 1 | vinta (Probe 7.a demand-absence) |
| VERIFY-FORK-LINEAGE | 1 | nibzard (potential SHA refresh on existing cite) |

## High-leverage gaps surfaced by combined v64 + 10-repo audit

### P0 GAP — `mattpocock/skills` ADOPT-NOW pending (Wave 133 Top-1, still PLANNED)
**Action**: Wave 137 Fire 1 candidate — execute `/plugin marketplace add https://github.com/mattpocock/skills && /plugin install <pkg>@mattpocock-skills` per CR-12 PRIMARY upstream-install path. Pre-install: verify `.claude-plugin/marketplace.json` exists in repo. Pre-cite-import REVERT check: `git -C Z:/claude-sota log --all --oneline -- '*mattpocock*'` shows 0 prior REVERT precedents.

### P1 GAP — `chopratejas/headroom` (Wave 133 Top-5 ADOPT-NOW)
Wave 133 prescribed Top-5 ADOPT-NOW. Status uncertain — needs Wave 137 Fire 2 verification.

### P1 GAP — Phase 7 benchmark gate not mechanically enforced
v64 EXECUTE_V64_ELITE_PLAN Phase 7: "If not measured, do not adopt." Currently operator discipline only. Wave 138+ candidate: install `eval-harness` SKILL (ECC) + wire pre-install hook that BLOCKS new plugin/MCP install lacking benchmark cite.

### P2 GAP — `mise` (jdx/mise) not in manifest
v64 DEFAULT_INSTALL_CORE includes `jdx/mise`. NOT in claude-sota-installed manifest. Either ADOPT or explicit-defer per `synthesis-layer-verify.md §Reporting categories` HONEST-NON-FINDING discipline.

### P2 GAP — `bmad-code-org/BMAD-METHOD`, `github/spec-kit`, `automazeio/ccpm`
Three high-star WORKFLOW_HARNESS_ELITE entries from v64 NOT in manifest. Probe DAG audit needed for each — likely PARTIAL adoption via existing ECC/superpowers/addy alternatives, but explicit verification is missing.

### P3 GAP — agent-skills marketplace 3-day drift
addy-agent-skills runtime SHA `742dca5` (2026-05-06) vs upstream HEAD `3ff4b51` (2026-05-09). Per CR-9 D6 discipline + `mcp-disconnect-recovery.md` today-release-auto-upgrade — refresh action needed.

## prescribed_edits (numbered P-A-NN per template)

**P-A-01 (P0)**: Execute `/plugin marketplace add https://github.com/mattpocock/skills` + `/plugin install <pkg>@mattpocock-skills` (CR-12 PRIMARY) in Wave 137 Fire 1. Pre-flight: verify `.claude-plugin/marketplace.json` blob via `mcp__plugin_everything-claude-code_github__get_file_contents repo:mattpocock/skills path:.claude-plugin/marketplace.json` BEFORE install. Update `docs/sota-installed-manifest.md` Section 3 with new marketplace row.

**P-A-02 (P0)**: Verify `chopratejas/headroom` install status (Wave 133 Top-5 ADOPT-NOW). If NOT INSTALLED, dispatch Wave 137 Fire 2 sota-researcher subagent with Probe DAG 1-7 + install per CR-12 PRIMARY official-channel.

**P-A-03 (P1)**: Refresh `addy-agent-skills` marketplace cache from `742dca5` → `3ff4b51`. Run `/plugin marketplace update addy-agent-skills` (CR-9 D6 today-release-auto-upgrade defense). Verify post-update via `git -C Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills log -1 --format='%h %ad' --date=short`. Expected outcome: HEAD bumps to `3ff4b51` (2026-05-09).

**P-A-04 (P1)**: Audit `wshobson/agents` (35,119★ MIT) for Probe 5 mode-harness compatibility with autonomous /loop. Compare 50+ agent definitions against existing 12 sota-installed agents (per `Grep '^isolation:' .claude/agents/`). If non-overlapping subset adds value, STUDY-PILOT; otherwise REJECT-FOR-FIT per kiss-dry-yagni Must-Never #4.

**P-A-05 (P2)**: Resolve `nibzard/awesome-agentic-patterns` lineage. If nibzard is upstream-canonical of `Z:/repos/deps/awesome-agentic-patterns/` (HEAD `ffb42768`), refresh cites. If nibzard is a fork, document the fork-relationship in `docs/install-provenance.md` per `port-note-discipline.md` §6 forward-only convention.

**P-A-06 (P2)**: Decide on `jdx/mise` (v64 DEFAULT_INSTALL_CORE missing from manifest). Either: (a) install via `winget install jdx.mise` and wire as runtime version-management primitive; (b) explicit-defer with HONEST-NON-FINDING entry in manifest Section 10 per CR-1 cite-class lattice. Cite anchor: v64 SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md DEFAULT_INSTALL_CORE block (5-version stable convergence).

**P-A-07 (P3)**: Codify Phase 7 benchmark gate as Wave 138+ candidate. Pre-install hook design per `evolve-gate.md` pattern that BLOCKS new plugin/MCP install lacking benchmark cite. Convergence-gate Axis 1 already covered by 5-version v64 stability + cwc-long-running-agents Anthropic OFFICIAL.

## Convergence-gate Axis 1+2+3 evidence summary

**Axis 1 (≥3 distinct orgs)**: Validated for v64 DEFAULT_INSTALL_CORE — Anthropic (cwc) + OpenAI (codex) + ryoppippi/ccusage + rtk-ai/rtk + oraios/serena + yamadashy/repomix = 6+ distinct orgs across the recurring stable set.

**Axis 2 (≥2 named-T2 practitioners)**: 
- Matt Pocock (TypeScript educator, 68,805★ on `mattpocock/skills`) — named-author quote in CR-1 cite-class
- Addy Osmani (Google Chrome team, 38,119★ on `addyosmani/agent-skills`) — Wave 82l cite-import-AMBER
- Boris Cherny (Anthropic CC creator) — multiple references in `claude-code-best-practice-shan` tips
- Andrej Karpathy (named-author per `karpathy-adapted.md` §5)

**Axis 3 (≥3 months stability)**: All 5 versions (v55, v58, v60, v62, v64) ship same DEFAULT_INSTALL_CORE = ≥6-month convergence (Karpathy stability gate).

## VERDICT: NEEDS-REVISION conf=0.83

**Rationale**: 
- Strong convergence evidence (5-version stable v64 DEFAULT_INSTALL_CORE) + 3 user-repos already adopted + Wave 132 Fire 3 GitNexus RC-upgrade ratifies prior ladder
- ~~7/13 v64 DEFAULT_INSTALL_CORE adopted~~ (PARTIAL adoption rate ~54% leaves 6 GAPs requiring decision)
- 1 P0 GAP (mattpocock/skills ADOPT-NOW) + 4 STUDY-PILOT candidates → fix-forward needed
- Conf=0.83 (NOT 0.88-0.93 Pattern A sweet spot) due to operator-stand-in voice limitation per cross-model-consensus.md §Env-funneled mandate
- **Per `mia-pre-apply.md` discipline: each prescribed_edit P-A-NN MUST be Mia-probed before next-fire apply**

**next_fire_recommendation**: Wave 137 Fire 1 = Pattern A apply on P-A-01 (mattpocock/skills install) + P-A-02 (chopratejas/headroom verification) atomic batch per codex-t1-fix-forward-pattern.md Pattern A. Cross-validate via codex T1 consult on the install commands.

## ARTIFACT-INLINE: tmp/wave136-fire1-agentA-sota-convergence-research-2026-05-10.md

(This is a Bash-only / no-Write read-only research voice per FM-19 readonly-guard sidestep. The artifact body above embeds the full deliverable. Path placeholder for orchestrator persistence.)

---
**HANDOFF**: handoff_to: orchestrator | output_mode: last_message | artifacts: [this file] | verdict_one_line: "NEEDS-REVISION conf=0.83 — 1 P0 (mattpocock ADOPT-NOW) + 4 STUDY-PILOT candidates + 6 v64 default-core gaps; Wave 137 Fire 1 Pattern A apply on P-A-01+P-A-02"

**TERMINATION**: completed
