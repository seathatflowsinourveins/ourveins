# W255 — CLEANUP RUNBOOK: re-architect `claude-sota-installed` to ZERO self-invent

**Date**: 2026-05-15
**Target**: `Z:\claude-sota-installed` (the runtime this session runs in) — operator-confirmed via AskUserQuestion 2026-05-15.
**Goal**: strip the self-invented behavioral layer, replace with SOTA installs per the W254 design, so `claude-sota-installed` matches the clean architecture `claude-sota-pure` already has.
**Source design**: `W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md` (codex GPT-5.5 ratified, conf=0.88).
**Model target shape**: `Z:\claude-sota-pure\CLAUDE.md` (pointer-only ≤50 LOC) + `Z:\claude-sota-pure\.claude\` (no `rules/`, no `hooks/scripts/*.py`).

---

## §0 Measured current state (probed 2026-05-15)

| Surface | Count | Action |
|---|---|---|
| `.claude/rules/*.md` (self-invented) | **64 files** | DELETE all (per W254 §1: 7 clusters REPLACE, 5 DROP, 2 THIN) |
| `.claude/hooks/scripts/*.py` (self-invented) | **33 files** | DELETE all (per W254 §2: 3 clusters REPLACE, 2 DROP, 1 KEEP-thin-wrapper, 1 THIN) |
| `settings.json` `"command"` hook entries | **110** | REWIRE → only plugin-hook refs + direct upstream-CLI commands |
| Working-tree untracked/modified | **839 items** | PRE-FLIGHT cleanup required — NOT a safe revert baseline |
| Last commit | `5152bd0` session checkpoint 22:09 | — |

---

## §1 SAFETY PRECONDITIONS — why this must NOT run from the current session

1. **Engine-swap-while-driving**: deleting `.claude/rules/` + `.claude/hooks/scripts/` removes artifacts that shape *this very session's* behavior + gate its tool calls. The swap must happen between sessions, not within one.
2. **No clean revert baseline**: 839 untracked items (incl. unexplained random-named files like `006in8dz`) — a sweeping `git rm` now would be unauditable + unrevertable. The tree must be cleaned + committed first.
3. **Install-before-delete ordering**: the SOTA behavioral layer must be installed + verified BEFORE the self-invented one is removed, so the runtime always has *a* behavioral layer.
4. **`/plugin install` is interactive**: marketplace-add + plugin-install are operator-driven CLI commands; they cannot be fired from a tool call.

**Therefore**: run this runbook from a **fresh `claude-sota-installed` session** against a **clean git baseline**, phase by phase, with a git commit between phases (each phase independently `git revert`-able).

---

## §2 PRE-FLIGHT — establish clean baseline

```bash
cd /z/claude-sota-installed
# 1. Investigate the random-named files before touching them (may be scratch OR session state)
git status --short | grep -E '^\?\? [0-9a-z_]{8}$' | head
#   → if confirmed scratch: add to .gitignore or rm; if session state: leave
# 2. Commit the W252-255 research deliverables (the docs/outer research/ artifacts)
git add "docs/outer research/research-wave-2026-05-15/02-wave252-fresh-2026-05-16" \
        "docs/outer research/research-wave-2026-05-15/03-wave253-deepdive-2026-05-15" \
        "docs/outer research/research-wave-2026-05-15/04-wave254-behavioral-layer-2026-05-15"
git commit -m "docs(research): W252-255 SOTA research + behavioral-layer architecture"
# 3. Confirm a clean-enough tree, tag the revert point
git tag pre-W255-cleanup
```

---

## §3 PHASE A — install the SOTA behavioral layer (W254 §3) — INSTALL BEFORE DELETE

Per cardinal-rule-6 (fresh-from-GitHub, official-native-channel). **Resolve the W254 §6 `[verify]` flags FIRST** (fresh GitHub probe):
- superpowers install path (`/plugin marketplace add obra/superpowers` vs skill-vendor) — VERIFY
- karpathy-skills owner coordinate (`forrestchang` vs `multica-ai`) — VERIFY
- codex-plugin-cc marketplace URL — RESOLVE

Then install:
```
# Plugins (marketplace-add then install — operator runs interactively)
/plugin marketplace add <verified-superpowers-coordinate>
/plugin marketplace add <verified-karpathy-skills-coordinate>
/plugin marketplace add <verified-codex-plugin-cc-coordinate>
/plugin install superpowers@<marketplace>
/plugin install andrej-karpathy-skills@<marketplace>
/plugin install codex@openai-codex
/plugin install agent-skills@addy-agent-skills
/plugin install context-mode@<marketplace>
/plugin install intelligent-compact@<marketplace>
# Selected official plugins
/plugin install <selected>@claude-plugins-official
# CLI tools (system-level, native-channel)
# gitleaks, ruff, pyright, shellcheck — install per upstream if absent
```
**Behavioral skills that must be active post-install** (W254 §3): superpowers verification-before-completion / test-driven-development / systematic-debugging / brainstorming / writing-plans / requesting-code-review / subagent-driven-development / dispatching-parallel-agents / using-git-worktrees · karpathy-guidelines · addy source-driven-development · wshobson comprehensive-review / context-management / agent-teams.

`git commit -m "feat(install): W255 Phase A — SOTA behavioral layer installed"`

---

## §4 PHASE B — rewire `settings.json` hooks

Replace the 110 self-invented hook commands. The ONLY hooks that survive (W254 §2):
- **codex-plugin-cc native review hooks** (replaces 6 codex T1-T7 Python gates) — auto-wired by the codex plugin
- **PreCompact**: intelligent-compact + context-mode + ECC memory-persistence hooks — auto-wired by those plugins
- **Linter hooks** (KEEP-AS-THIN-WRAPPER): `settings.json` PostToolUse commands invoking `ruff` / `pyright` / `pyrefly` / `shellcheck` upstream CLIs **directly** — zero local Python guard logic
- **Secret scan**: `gitleaks protect --staged --redact` as a direct CLI hook command
- **DELETE all wiring** for: the 12 audit hooks, telemetry observers, safety_guard / agent_plan_readonly_bash_guard / agent_spawn_gate, the 3 PreCompact Python scripts, _secret_redactor

`git commit -m "feat(settings): W255 Phase B — settings.json rewired to upstream hooks only"`

---

## §5 PHASE C — delete the self-invented rules + hooks

```bash
cd /z/claude-sota-installed
git rm -r .claude/rules                          # 64 self-invented rule files
git rm .claude/hooks/scripts/*.py                # 33 self-invented hook scripts
# keep .claude/hooks/ dir only if it now holds upstream-plugin hook refs
git commit -m "refactor(behavioral-layer): W255 Phase C — delete 64 self-invented rules + 33 hook scripts (ZERO SELF INVENT per W254)"
```
Post-condition: `.claude/rules/` gone, `.claude/hooks/scripts/` empty of `.py`.

---

## §6 PHASE D — CLAUDE.md → pointer-only ≤50 LOC

Rewrite `CLAUDE.md` modeled on `Z:\claude-sota-pure\CLAUDE.md` (pointer-only root memory). Body ≤50 LOC. Content = the **5 W254 cardinal rules**, each cite-anchored to an Anthropic docs URL:
1. Install behavioral primitives only from trusted plugins/skills/agents — `code.claude.com/docs/en/plugins`
2. Hooks = upstream plugin hooks OR direct upstream CLI invocations only — `docs.anthropic.com/en/docs/claude-code/hooks`
3. Subagents = installed upstream agents OR documented subagent system — `docs.anthropic.com/en/docs/claude-code/sub-agents`
4. Project behavior in CLAUDE.md + settings, NOT `.claude/rules/*.md` — `docs.anthropic.com/en/docs/claude-code/settings`
5. Safety via CC permissions + sandboxing, NOT custom guard scripts — `docs.anthropic.com/en/docs/claude-code/settings`

Strip the cardinal-rule-1..12 block, the Memory-Stack/Hard-Rules/Architecture prose → all of it is now plugin-loaded-skill discipline. CLAUDE.local.md keeps the env block only.

`git commit -m "docs(CLAUDE.md): W255 Phase D — pointer-only root memory, behavioral discipline = installed skills"`

---

## §7 PHASE E — verify + close

```bash
# Self-invent count MUST be zero
test ! -d .claude/rules && echo "rules/ GONE ✓"
test -z "$(find .claude/hooks/scripts -name '*.py' 2>/dev/null)" && echo "hook scripts GONE ✓"
# Every settings.json hook command traces to a plugin or upstream CLI
grep '"command"' .claude/settings.json   # manual review: 0 references to .claude/hooks/scripts/*.py
# Behavioral skills load
/context   # confirm superpowers/karpathy/addy skills present
git tag W255-cleanup-complete
```

**Acceptance**: `.claude/rules/` absent · `.claude/hooks/scripts/*.py` absent · `settings.json` references zero self-invented scripts · CLAUDE.md ≤50 LOC · behavioral discipline = installed SOTA skills only · `self_invented_count: 0`.

---

## §8 Carry-forward risks

1. **W254 §6 `[verify]` install coordinates** — superpowers / karpathy-skills owner / codex-plugin-cc marketplace must be GitHub-probe-verified before Phase A (cardinal-rule-9 install-risk).
2. **wshobson Conductor HARD-GATE** — prior waves flagged interactive-setup HARD-GATE; install only the non-gated wshobson sub-plugins (comprehensive-review / context-management / agent-teams), per-plugin Probe-5 first.
3. **839-item working tree** — the random-named files MUST be triaged in Pre-flight; do not `git rm` blind.
4. **codex T1-T7 coverage gap** — `claude-sota-pure`'s CLAUDE.md notes codex plugin auto-wires only SessionStart/SessionEnd/Stop; T1-T5 are a documented GAP filled by `/codex:review` commands. The same gap applies here after Phase A — cross-model review becomes command-driven, not hook-gated.
5. **Self-review honesty** — superpowers is W253-graded D (fresh-paint); use hand-picked individual skills, each Axis-3-checked at install.

---

**VERDICT: RUNBOOK-READY.** This is the executable cleanup, not a research plan: 5 phases, each git-checkpointed and revertable, that take `claude-sota-installed` from 64 rules + 33 hooks + 110 hook-wirings to `self_invented_count: 0`. It must run from a fresh session on a clean baseline (§1). The W254 design + this runbook together fully satisfy "ZERO SELF INVENT HOOKS AND RULES — REPLACED BY SOTA REPOS" for `claude-sota-installed`.
