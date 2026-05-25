# Wave 254 — BEHAVIORAL-LAYER ARCHITECTURE for `Z:\claude-sota-pure`

**Date**: 2026-05-15
**Author**: Orchestrator (Opus 4.7) consolidating real-GPT-5.5 codex Path P verdict
**Mission**: design the behavioral layer (rules + hooks) of the pure runtime with **ZERO self-invented `.claude/rules/*.md` and ZERO self-invented hook logic** — every behavioral primitive SOTA-sourced, dropped as YAGNI, or thinned to a doc-anchored CLAUDE.md cardinal rule.
**Status**: **AUTHORITATIVE** — cross-model gate SATISFIED (real GPT-5.5 via codex CLI Path P, verdict `BEHAVIORAL-LAYER-DESIGNED conf=0.88`).
**Verdict file**: `.claude/state/codex_consult_w254_behavioral_layer_OUT.txt`

---

## §0 The directive + what it changes

User directive 2026-05-15: *"clean up your architecture, make sure all references all sota and native installed, directly wire, ZERO SELF INVENT HOOKS AND RULES, INCLUDING ALL THE RULES THAT DEFINE BEHAVIOR — THEY NEED TO BE REPLACED BY SOTA REPOS."*

Waves 252-253 catalogued the **install layer** (plugins / MCP servers / tools) but left the **behavioral layer** — `claude-sota-installed`'s ~50 `.claude/rules/*.md` files + ~53 `.claude/hooks/scripts/*.py` hook scripts — as carried-over self-invention. That is the deepest cardinal-rule-8 (full-SOTA-content) violation in the architecture: the rules that *define how the runtime behaves* were themselves hand-written TIER-3-LOCAL artifacts.

Wave 254 closes it. The pure runtime `Z:\claude-sota-pure` ships **zero hand-written behavioral rules and zero hand-written hook logic**. Behavioral discipline = installed SOTA skills + upstream plugin hooks + direct upstream CLI invocations + a 5-line cardinal-rule set cite-anchored to Anthropic docs.

---

## §1 Rule cluster verdicts (14 clusters)

Codex GPT-5.5 assigned each self-invented rule cluster one of: **REPLACE-WITH-SOTA** / **DROP-YAGNI** / **THIN-TO-CARDINAL**.

| Cluster | Self-invented rules | Verdict | SOTA replacement / disposition |
|---|---|---|---|
| **C1** governance canon | canonical.md, kiss-dry-yagni.md | REPLACE-WITH-SOTA | karpathy-guidelines skill + superpowers verification-before-completion/TDD/writing-plans — KISS/DRY/YAGNI ≡ Karpathy Simplicity-First + Surgical-Changes |
| **C2** Karpathy principles | karpathy-adapted.md | REPLACE-WITH-SOTA | `andrej-karpathy-skills` karpathy-guidelines (the upstream skill — local adaptation is redundant) |
| **C3** research discipline | research-protocol.md, convergence-gate.md | REPLACE-WITH-SOTA | `addyosmani/agent-skills` source-driven-development + superpowers brainstorming/writing-plans — drop bespoke convergence gates |
| **C4** evidence / citation | evidence-policy.md, citation-discipline.md, port-note-discipline.md | **DROP-YAGNI** | "Evidence labels, citation discipline, port-note discipline are scar tissue. A fresh runtime needs source-grounded work on demand, not global citation bureaucracy." source-driven-development covers it when needed |
| **C5** verification | synthesis-layer-verify.md, mia-pre-apply.md, agent-harness-fit-verification.md + ahfv-* | REPLACE-WITH-SOTA | superpowers verification-before-completion/TDD/systematic-debugging + CCBP RPI (read-only reference). "Local Mia/AHFV rule trees are overfitted — remove." |
| **C6** cross-model review | cross-model-consensus.md, cmc-*, codex-t1-fix-forward-pattern.md, ctff-*, codex-t1-auto-wedge-recovery.md, codex-t1-system-meta-review-fallback.md, codex-t1-pattern-b-forward-discipline.md | REPLACE-WITH-SOTA | `codex@openai-codex` plugin (codex-plugin-cc) + OpenAI Codex CLI + CCBP cross-model-workflow. Capability kept ONLY through upstream codex plugin native commands/hooks |
| **C7** agent orchestration | team-orchestration.md, team-orch-*, parallel-agent-wave.md, parallel-sessions.md, multi-perspective-subagents.md, coordination.md, advanced-agent-team-standing-directive.md | REPLACE-WITH-SOTA | superpowers subagent-driven-development/dispatching-parallel-agents/using-git-worktrees + wshobson agent-teams/comprehensive-review/context-management + anthropic-cookbook managed_agents. Drop local standing directives |
| **C8** hook architecture | layered-gates-architecture.md, lga-* | THIN-TO-CARDINAL | 1-line CLAUDE.md policy cite-anchored to Anthropic CC hooks docs — "only upstream plugin hooks or direct upstream CLI invocations" |
| **C9** meta-process scaffolding | codification-threshold.md, named-failure-modes.md, fm20-path-drift-cascade.md, audit-action-loop.md, closed-loop-recursive-narrowing.md, sota-pin-discipline.md | **DROP-YAGNI** | "Accumulated operational scar tissue. A pure runtime starts without them." |
| **C10** session / context | auto-compact-discipline.md, parallel-session-worktree-isolation.md | REPLACE-WITH-SOTA | `fcakyon/intelligent-compact` + `context-mode` + ECC memory-persistence/precompact hooks + superpowers using-git-worktrees |
| **C11** cardinal rules | cardinal-rule-7/8/11/12 (CLAUDE.md) | THIN-TO-CARDINAL | Thin source-anchored constraints in CLAUDE.md only, cite Anthropic settings/hooks/sub-agents/plugins docs. No cardinal-rule subfiles |
| **C12** codex env-funnel | cmc-env-funneled-disclosure.md | **DROP-YAGNI** | "Bespoke process machinery. Use upstream codex plugin/CLI behavior." |
| **C13** FM-recovery | fm17-subagent-fleet-depletion.md + FM catalog | **DROP-YAGNI** | "Failure-mode catalogs + fleet-depletion recovery are historical residue. Rely on imported orchestration skills + operator judgment." |
| **C14** (re-classification) | mis-grouped local rules | **DROP-YAGNI** | port-note → drops with C4/C9; auto-wedge → drops with C6; AHFV children → replaced by superpowers verification (C5) |

**Tally: 7 REPLACE-WITH-SOTA · 5 DROP-YAGNI · 2 THIN-TO-CARDINAL.** All ~50 self-invented `.claude/rules/*.md` files are eliminated.

---

## §2 Hook cluster verdicts (7 clusters)

| Cluster | Self-invented hooks | Verdict | SOTA replacement / disposition |
|---|---|---|---|
| **H1** codex T1-T7 gates | codex_t1_consult_gate / codex_t2_pre_commit_gate / codex_postcommit_review / codex_prepush_review / codex_stop_review_gate / auto_proceed_gate | REPLACE-WITH-SOTA-HOOK | `codex@openai-codex` plugin native hooks + slash commands. Delete all local T1-T7 Python scripts + auto-proceed gate + wedge-recovery hooks |
| **H2** linter guards | ruff_guard / pyright_guard / shellcheck_guard / pyrefly_guard | KEEP-AS-THIN-LINTER-WRAPPER | `settings.json` hook commands that invoke ruff / pyright / shellcheck / pyrefly upstream CLIs directly — **zero local Python guard logic** |
| **H3** audit hooks | claude_md_count_audit / cite_drift_audit / mcp_self_audit / cohort_coverage_audit / agent_frontmatter_audit / ~12 others | **DROP-YAGNI** | "Meta-process scaffolding. Replace with normal CI or explicit operator audits when a concrete project needs them." |
| **H4** PreCompact / context | precompact_hint_emitter / sessionstart_compact_hint_reader / posttooluse_context_monitor | REPLACE-WITH-SOTA-HOOK | `fcakyon/intelligent-compact` + `context-mode` + ECC memory-persistence PreCompact/SessionStart/Stop hooks — imported wholesale |
| **H5** safety hooks | safety_guard / agent_plan_readonly_bash_guard / agent_spawn_gate | THIN-TO-CARDINAL | Delete the scripts. Enforce safety through Claude Code permissions + sandboxing + settings + upstream plugin trust boundaries |
| **H6** telemetry observers | subagent_start_observer / subagent_stop_telemetry / subagent_transcript_mine / worktree_lifecycle_audit / others | **DROP-YAGNI** | "Not required for a fresh pure runtime; create hidden state/process risk." |
| **H7** secret redaction | _secret_redactor | REPLACE-WITH-SOTA-HOOK | `gitleaks` upstream CLI direct — `gitleaks protect --staged --redact` as a Claude hook command / git pre-commit. Delete custom redactor logic |

**Tally: 3 REPLACE-WITH-SOTA-HOOK · 2 DROP-YAGNI · 1 KEEP-THIN-WRAPPER · 1 THIN-TO-CARDINAL.** All ~53 self-invented hook *scripts* are eliminated; what survives is upstream plugin hooks + direct CLI invocations declared in `settings.json`.

---

## §3 The pure-runtime behavioral layer (`self_invented_count: 0`)

### Installed skills (14)
9× superpowers: verification-before-completion · test-driven-development · systematic-debugging · brainstorming · writing-plans · requesting-code-review · subagent-driven-development · dispatching-parallel-agents · using-git-worktrees
+ andrej-karpathy-skills `karpathy-guidelines`
+ addyosmani/agent-skills `source-driven-development`
+ 3× wshobson/agents: comprehensive-review · context-management · agent-teams

### Installed plugins (7)
anthropics/claude-plugins-official (selected official plugins) · obra/superpowers (if marketplace-available) · andrej-karpathy-skills · codex@openai-codex (codex-plugin-cc) · context-mode · fcakyon/intelligent-compact · everything-claude-code (selected memory/context hooks ONLY)

### Installed hooks (9 — all upstream-sourced)
codex-plugin-cc native review hooks · context-mode PreCompact hook · intelligent-compact PreCompact hook · ECC memory-persistence PreCompact/SessionStart/Stop hooks · gitleaks `protect --staged --redact` direct CLI hook · ruff / pyright / pyrefly / shellcheck direct CLI hooks (where the relevant language is present)

### Cardinal rules (5 — each cite-anchored to Anthropic docs, in CLAUDE.md only)
1. Install behavioral primitives only from trusted plugins/skills/agents — plugin structure/flow per `code.claude.com/docs/en/plugins`
2. Hooks may only be upstream plugin hooks OR direct upstream CLI invocations — semantics per `docs.anthropic.com/en/docs/claude-code/hooks`
3. Subagents must be installed upstream agents OR generated via the documented subagent system — per `docs.anthropic.com/en/docs/claude-code/sub-agents`
4. Project behavior belongs in CLAUDE.md + settings, NOT `.claude/rules/*.md` — per `docs.anthropic.com/en/docs/claude-code/settings`
5. Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts — per `docs.anthropic.com/en/docs/claude-code/settings`

**`self_invented_count: 0`** — no `.claude/rules/*.md`, no hand-written hook logic.

---

## §4 The DROP list — scar tissue eliminated (explicit)

These self-invented rules/hooks are **DELETED, not ported** to `Z:\claude-sota-pure` (codex DROP-YAGNI verdict — a fresh runtime never accreted the failures they document):

**Rules dropped**: evidence-policy.md · citation-discipline.md · port-note-discipline.md · codification-threshold.md · named-failure-modes.md · fm20-path-drift-cascade.md · fm17-subagent-fleet-depletion.md · audit-action-loop.md · closed-loop-recursive-narrowing.md · sota-pin-discipline.md · cmc-env-funneled-disclosure.md · codex-t1-auto-wedge-recovery.md · codex-t1-system-meta-review-fallback.md · codex-t1-pattern-b-forward-discipline.md · advanced-agent-team-standing-directive.md (the standing directive itself is dropped; orchestration comes from superpowers + wshobson skills)

**Hooks dropped**: all ~12 audit scripts (claude_md_count_audit / cite_drift_audit / mcp_self_audit / cohort_coverage_audit / agent_frontmatter_audit / tmp_md_inventory / process_hygiene_audit / repo_cite_existence_audit / mcp_overhead_audit / etc.) · all telemetry observers (subagent_start_observer / subagent_stop_telemetry / subagent_transcript_mine / worktree_lifecycle_audit) · safety_guard.py · agent_plan_readonly_bash_guard.py · agent_spawn_gate.py · _secret_redactor.py · the 6 codex T1-T7 Python gate scripts (replaced by codex-plugin-cc native hooks) · the 3 PreCompact Python scripts (replaced by intelligent-compact + context-mode + ECC hooks)

This is the literal answer to "ZERO SELF INVENT" — the meta-process scaffolding that took `claude-sota-installed` to ~50 rules + ~53 hooks does not exist in the pure runtime.

---

## §5 Honest gaps (3 — no SOTA equivalent, but not preserved)

| Function | Why no SOTA equivalent | Disposition |
|---|---|---|
| Mia pre-apply (cheap-probe verification + OVER/UNDER taxonomy) | No upstream repo implements that exact prescription-verification protocol | DROP as a rule; the useful core is covered by superpowers verification-before-completion + TDD |
| Agent-plan readonly-bash guard | No cited upstream plugin equivalent for this exact local policy | DROP custom hook logic; thin to CLAUDE.md/settings permissions + CC sandbox controls |
| Codex T1 auto-wedge recovery + Pattern B/HNF meta-protocol | The local recovery taxonomy is bespoke | DROP; keep only upstream codex review commands/hooks |

The honest finding: the 3 functions with genuinely no SOTA equivalent are **all still dropped** — none is load-bearing enough to justify reintroducing self-invention. This fully satisfies the directive.

---

## §6 Install-mechanism verification flags (Mia pre-apply — codex install commands need install-time verification)

Codex GPT-5.5 supplied install commands that are **plausible but unverified** — they MUST be confirmed against upstream at install time, not trusted blind:

- `npx skills add https://github.com/obra/superpowers --skill X` — superpowers' actual install path may be `/plugin marketplace add obra/superpowers` + `/plugin install`, OR a vendored-skill copy. **[verify at install]**
- `/plugin marketplace add forrestchang/andrej-karpathy-skills` — codex used owner `forrestchang`; Wave 253 + research-protocol cite the karpathy-skills repo under `multica-ai/andrej-karpathy-skills`. **Owner coordinate must be resolved before install** (cardinal-rule-6 fresh-from-GitHub).
- `<codex-plugin-cc-marketplace>` — codex left the marketplace coordinate as a placeholder; resolve the actual codex-plugin-cc marketplace URL.
- ECC "selected upstream memory/context hooks only" — the exact ECC hook files to import need per-file selection (not bulk ECC install).

These are install-time CR-9 (install-risk discipline) items, not blockers to the architecture verdict.

---

## §7 Integration into the `Z:\claude-sota-pure` architecture

Wave 254 SUPERSEDES the behavioral-layer placeholder in W252-EXT/W253. The complete pure-runtime architecture is now:

- **Install layer** (W252-EXT 15-layer + W253 graded): ~14 install picks (8 A-grade + 6 B-grade) — ollama / repomix / qdrant / sqlite-vec / markitdown / promptfoo / gitleaks / valkey / litellm / serena / doobidoo / graphiti / anthropic-cookbook / modelcontextprotocol-servers
- **Behavioral layer** (W254, this doc): 14 SOTA skills + 7 plugins + 9 upstream hooks + 5 doc-anchored cardinal rules — **zero self-invented**

`Z:\claude-sota-pure` `.claude/` directory shape:
```
.claude/
  settings.json        # hook commands = upstream-CLI invocations + plugin hook refs only
  agents/              # upstream-installed agents only (wshobson + claude-plugins-official + superpowers)
  skills/              # upstream-installed skills only (superpowers/karpathy/addy) — no hand-written SKILL.md
  plugins/             # marketplace-installed plugin cache
  rules/               # ⌀ EMPTY — zero self-invented rule files
  hooks/scripts/       # ⌀ EMPTY — zero self-invented hook logic
```
CLAUDE.md = 5 thin cardinal rules + the install manifest pointer. CLAUDE.local.md = env block only.

---

## §8 Next actions

1. ✅ DONE — Wave 254 behavioral-layer architecture designed + cross-model-ratified (codex GPT-5.5 conf=0.88)
2. **QUEUED** — resolve §6 install-mechanism `[verify]` flags (superpowers install path, karpathy-skills owner coordinate, codex-plugin-cc marketplace URL) via fresh GitHub probes
3. **QUEUED** — bootstrap `Z:\claude-sota-pure` Phase 0: CLAUDE.md (5 cardinal rules) + CLAUDE.local.md (env) + settings.json (upstream-hook commands only) + `.gitignore` + manifest + provenance — `.claude/rules/` and `.claude/hooks/scripts/` created EMPTY
4. **QUEUED** — Phase 1+ install per W253 §7 (install layer) + W254 §3 (behavioral layer) — every artifact upstream-sourced, directly wired
5. **QUEUED** — post-install audit: confirm `.claude/rules/` is empty + `.claude/hooks/scripts/` has zero self-invented `.py` + every hook in settings.json traces to an upstream plugin or CLI

**VERDICT: WAVE-254-BEHAVIORAL-LAYER-COMPLETE — AUTHORITATIVE.** The pure runtime `Z:\claude-sota-pure` behavioral layer is fully designed with `self_invented_count: 0`: 7 rule clusters REPLACED by SOTA skills, 5 DROPPED as YAGNI scar tissue, 2 THINNED to doc-anchored cardinal rules; 3 hook clusters REPLACED by upstream hooks, 2 DROPPED, 1 KEPT as thin CLI wrapper, 1 THINNED. The directive "ZERO SELF INVENT HOOKS AND RULES — REPLACED BY SOTA REPOS" is architecturally satisfied and cross-model-verified.

---

## §9 HONEST limitations

1. **Install-mechanism precision** — codex's `npx skills add` / `/plugin marketplace add` commands are plausible but not all verified against current upstream (§6). CR-9 install-time verification required.
2. **superpowers as a D-grade pick (W253)** — W253 graded obra/superpowers D (fresh-paint Axis-3 FAIL, 192k★/8.8mo). W254 still routes 9 behavioral skills through it. Reconciliation: W253's D-grade was for *bulk catalog adoption*; W254 uses **hand-picked individual skills** (verification / TDD / debugging — the mature, widely-cited ones), which is exactly W253's "HOLD except hand-picked skills" disposition. Consistent — but each picked skill needs its own Axis-3 check at install.
3. **ECC "selected hooks only"** — the exact ECC memory/context hook files to import are not yet enumerated; per-file selection is an install-time task.
4. **wshobson agent-teams / conductor HARD-GATE** — prior waves flagged wshobson Conductor's interactive-setup HARD-GATE (incompatible with autonomous mode). W254 routes context-management + comprehensive-review + agent-teams through wshobson; each sub-plugin needs the Probe-5 mode-harness check before install.
5. **No codex T1 re-review of THIS synthesis** — the codex W254 call WAS the cross-model design pass; a separate T1 review of this consolidation document is deferred (the consolidation introduces no claims beyond codex's verdict).
