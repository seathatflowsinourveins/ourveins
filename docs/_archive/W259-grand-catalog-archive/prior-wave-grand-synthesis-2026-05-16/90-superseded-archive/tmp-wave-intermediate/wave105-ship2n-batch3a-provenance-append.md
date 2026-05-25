

## 2026-05-08 Wave 105 — Ship 2N-batch3-A: wire safety_guard.py PreToolUse:Bash hook (P0 SAFETY mechanical enforcement)

### Origin

Wave 105 Agent C (`adea003df2f012855`) feature-coverage audit P0-5 finding + Mia probe verified: settings.json L74 `_comment_allow` mentioned `safety_guard.py + agent_plan_readonly_bash_guard.py` as "safety floor preserved" but ZERO PreToolUse hook entries registered them as enforcing. Current `defaultMode: "bypassPermissions"` (per Wave 82d operator override during Anthropic-side classifier outage) lacked mechanical safety-floor enforcement.

CR-7 Phase 3 destination requires safety floor wired BEFORE bypassPermissions is operationally safe. This ship closes that load-bearing CR-7 gap.

### Codex T1 e2e (CR-3 + Ship 2X SRA cross-model T1 mandate)

T1 fired under fully-unleashed discipline (Wave 100 Ship 2P 2026-05-08 commit `b6dc7e5`) — NO `--sandbox=read-only` flag; profile default `danger-full-access`. Foreground+tee dispatch:

```bash
timeout 240 codex exec --ephemeral -p deep-review-exec --color never \
  < .claude/state/codex_consult_wave105_ship2n_batch3a_safety_hooks.txt \
  > .claude/state/codex_consult_wave105_ship2n_batch3a_safety_hooks_OUT.txt 2>&1
```

Verdict: **NEEDS-REVISION conf=0.96** with 5 prescribed_edits.

**Critical design-flaw catch by codex T1**: my initial proposal globally-wired `agent_plan_readonly_bash_guard.py` as Block[6][1] always-fire. Codex correctly identified this is NOT a generic gate — it's a positive-validator scoped to plan-mode subagents with policy enum (`readonly` / `codex-readonly` / `verifier`). Globally wiring would have BLOCKED normal operator Bash including `git commit` (interactive REPL block at L613 + heredoc/tee/redirect blocks per FM-19 disclosure).

Mia probe verified codex's claim by `Grep` against `.claude/agents/`: the script IS already correctly wired in 6 subagent frontmatter PreToolUse hooks:
- `architect.md:58` `--policy readonly`
- `code-reviewer.md:56` `--policy readonly`
- `debugger.md:21` (referenced)
- `gpt5-archaeologist.md:60` `--policy codex-readonly`
- `gpt5-reviewer.md:61` `--policy codex-readonly`
- `verifier.md:74` `--policy verifier`

### Pattern A apply (5 prescriptions integrated)

| # | Prescription | Status |
|---|---|---|
| P1 | Prepend safety_guard.py as Block[6][0], sync, timeout 5, always-fire matcher Bash | **APPLIED** |
| P2 | Do NOT add agent_plan_readonly_bash_guard.py to global PreToolUse:Bash; keep per-subagent frontmatter wiring | **APPLIED** (removed from this ship's scope) |
| P3 | If global shim added, comprehensive test matrix (non-subagent / git-commit pass / plan-readonly deny / verifier-allow / codex-readonly-allow / malformed fail-closed/fail-open) | **DEFERRED** (no global shim this fire) |
| P4 | Update _comment_allow to honestly state safety_guard at Block[6][0] mechanically enforced + agent_plan_readonly enforced via plan-agent frontmatter | **APPLIED** |
| P5 | Keep new safety hook sync, no async:true, no `if:` — full Bash visibility for catastrophic deny coverage | **APPLIED** |

### Smoke tests PASSED (verified pre-commit)

```bash
# Safe operations pass through:
echo '{"tool_name":"Bash","tool_input":{"command":"git commit -m \"safe\""}}' | python .claude/hooks/scripts/safety_guard.py
# → exit 0 (pass-through)

# Destructive patterns blocked with exit 2:
echo '{"tool_name":"Bash","tool_input":{"command":"rm -rf /"}}' | python .claude/hooks/scripts/safety_guard.py
# → [safety-guard] BLOCKED destructive pattern: rm -rf against root/home/wildcard/glob/cwd
# → exit 2

echo '{"tool_name":"Bash","tool_input":{"command":"git push --force"}}' | python .claude/hooks/scripts/safety_guard.py
# → [safety-guard] BLOCKED destructive pattern: git push --force (rewrites remote history)
# → exit 2

# Non-Bash tool calls correctly skipped:
echo '{"tool_name":"Edit","tool_input":{"file_path":"x.txt"}}' | python .claude/hooks/scripts/safety_guard.py
# → exit 0 (correctly skips non-Bash)
```

### Wire ordering (post-ship Block[6] matcher=Bash)

```
[0] safety_guard.py            (sync 5s always)  ← NEW Ship 2N-batch3-A
[1] block_no_verify_guard.py    (sync 5s always)
[2] gitleaks_pre_commit_gate.py (sync 10s if Bash(git commit *))
[3] gitleaks_pre_commit_gate.py (sync 10s if Bash(git -C * commit *))
[4] codex_t2_pre_commit_gate.py (sync 180s if Bash(git commit *))
[5] codex_t2_pre_commit_gate.py (sync 180s if Bash(git -C * commit *))
```

Fail-fast prioritization: 12-pattern catastrophic deny-list runs BEFORE narrower gates. If `rm -rf /` or fork bomb fires, NOTHING else runs.

### What safety_guard.py BLOCKS (12 destructive patterns)

`rm-rf` against root/home/wildcard/glob/cwd · `sudo rm` · `git push --force` (rewrites remote history) · `git reset --hard` (destroys uncommitted) · `git checkout .` (discards working tree) · `SQL DROP` · `TRUNCATE` · `docker prune` · `kubectl delete` · `chmod 777` · fork bomb `:(){:|:&};:` · `mkfs` · `dd` to disk

### CR-9 install-risk LOW-MEDIUM

- Touches PreToolUse hook chain — adds 1 hook at fail-fast position
- 2-round fix-forward expectation MET at first round (codex T1 NEEDS-REVISION → Pattern A apply → atomic commit)
- Script already cite-import-AMBER per CR-12 TERTIARY (Wave 14b commit; sibling SHA `32fbcb0d` HONEST-NON-FINDING-gated; Probe DAG P1-P6 PASS)
- Reversible via `git revert f30ba94`
- Zero sibling-bleed (script body verified clean against 6 sibling-pattern classes pre-port)
- Pre-cite-import REVERT check: NOT in any prior REVERT-AND-REMOVE list per `feedback_check_gitignore_before_porting.md` discipline

### CR compliance summary

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-3-LOCAL-COMPOSITION cite-import-AMBER per CR-12; sibling SHA pinned + Probe DAG P1-P6 PASS at Wave 14b |
| CR-3 (cross-model T1) | ✅ | codex T1 NEEDS-REVISION conf=0.96 fired BEFORE commit; Pattern A applied (5 prescriptions, 1 design-flaw caught + corrected) |
| CR-5 (install-priority) | ✅ | cite-import per CR-12 TERTIARY (sibling-derived; no upstream parity per Wave 14b HNF probe) |
| CR-7 (graduated unleash) | ✅ | closes Phase 3 safety floor mechanical-enforcement gap |
| CR-9 (install-risk) | ✅ | LOW-MEDIUM (PreToolUse chain change; reversible); 2-round fix-forward MET first round |
| CR-10 (research-first) | ✅ | Wave 105 Agent C P0-5 finding drove this ship |
| CR-11 (META-process) | ✅ | Mia pre-apply on codex T1 P1 design-flaw catch (verified 6 agent frontmatter wires by Grep before accepting) |

### FM-02 sub-class (c) COMMIT-LAYER ABSORPTION disclosure (per parallel-session-worktree-isolation.md)

The atomic commit `f30ba94` LANDED with intended scope (.claude/settings.json +9/-2 LOC = safety_guard.py wire + _comment_allow update) BUT the cwc commit-on-stop auto-checkpoint hook ALSO bundled `docs/install-provenance.md` (+123 LOC) containing prior-session SHIP-A1 provenance content (addy-agent-skills marketplace install — different ship).

This is **cwc bundled-drift FM** at n=6 cumulative (Wave 98 `00d1bde` + Wave 99 `72d257a` + Wave 100 `68169d9` + `20785c5` + `4e5dc95` + Wave 105 `f30ba94`). Ship 2Q throttle wrapper (commit `5cc1633`) does NOT block this case because LOC delta (123 LOC) > 50 LOC threshold.

**Outcome A ACCEPT-WITH-DOC** per `closed-loop-recursive-narrowing.md` § Disposition: semantic Ship 2N-batch3-A IS clean (settings.json +9/-2 LOC matches design); the bundled prior-session content is parallel work that landed via auto-checkpoint. THIS provenance entry (separate atomic commit) closes the audit trail.

### Verification (post-commit)

```bash
git -C Z:/claude-sota-installed log -1 --format="%H %s" f30ba94
# f30ba94511514acdad0100c2bf8fd152fdc5552b feat(hooks): Wave 105 Ship 2N-batch3-A — wire safety_guard.py PreToolUse:Bash hook (P0 SAFETY mechanical enforcement)

python -c "import json; s=json.load(open('.claude/settings.json')); b6=s['hooks']['PreToolUse'][6]; print([h.get('command','').split('/')[-1] for h in b6['hooks']])"
# ['safety_guard.py', 'block_no_verify_guard.py', 'gitleaks_pre_commit_gate.py', 'gitleaks_pre_commit_gate.py', 'codex_t2_pre_commit_gate.py', 'codex_t2_pre_commit_gate.py']
```

### Wave 105 — 27th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 104-2N-batch2 | `67620bd` | plugin-dev enable |
| 104-2N-batch2-prov | `ee65220` | Ship 2N-batch2 provenance |
| **105-2N-batch3-A** | **`f30ba94`** | **safety_guard.py wire (THIS SHIP)** |

### Outstanding queue (post Ship 2N-batch3-A)

- **Ship 2N-batch3-B** (P0 FEATURE): wire graphiti MCP in .mcp.json — BLOCKED on OPENAI_API_KEY procurement OR alt-provider config
- **Ship 2N-batch3-C** (P0 HOOKS): wire missing context-mode hooks (PreToolUse + PostToolUse + PreCompact)
- **Ship 2N-batch3-D** (DOC-DRIFT): manifest §4 + §15 doc-drift fixes (DOC-ONLY CR-9 LOW)
- **Ship 2N-batch3-E** (P1 NEW): repomix MCP install in .mcp.json
- **Ship 2P-pilot**: observability bench-pilot (operator decision: langfuse / phoenix / openlit)
- **Ship 2A-pilot**: rtk vs snip Bash-output-filter pilot (operator decision: WSL trade-off)
- **Ship 2Y-stage2**: cite-anchor migration with codex T1 e2e
- **Ship 2Z**: forrestchang/andrej-karpathy-skills cite-anchor surgical disclosure-add

### Update triggers

Re-evaluate this entry when:
- safety_guard.py upstream sibling SHA bumps (currently `32fbcb0d`; refresh on next session probe per cardinal-rule-6)
- A 13th destructive pattern needs adding to safety_guard.py deny-list
- agent_plan_readonly_bash_guard.py global-shim ship lands (would close P3 deferred prescription)
- A subagent class is added that doesn't reference agent_plan_readonly_bash_guard.py in frontmatter (would surface coverage gap)
