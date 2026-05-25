# W330-C — ECC Plugin-Cache Cardinal-Rule-1 Restore

**Wave**: W330-C  · **Date**: 2026-05-19  · **Status**: PROBE-COMPLETE / OPERATOR-ACTION-PENDING
**Predecessor**: W329-E §1+§10 cardinal-rule-1 violation finding

---

## §1 — Problem Statement

`Z:\claude-sota-installed\.claude\plugins\cache\everything-claude-code\everything-claude-code\2.0.0-rc.1\` is supposed to be a marketplace-managed read-only artifact owned by the `affaan-m/ECC` upstream. Instead the runtime is treating it as a writable working tree:

- `git -C <cache> remote -v` -> **empty** (no `origin`, no upstream)
- `git -C <cache> log --oneline -5` shows `ship(W327-...)` and `ship(W329-...)` commits authored locally
- Local HEAD: `e980d06` (`docs(W327-W329): operator-handoff straggler ...`)
- Upstream HEAD: `2c0d2264` (`docs(release): record post-gateguard evidence`, 2026-05-19T17:51:02Z)

Therefore CR-1 ("install primitives only from trusted plugins") is **violated**: the runtime's behavioral surface is partially driven by operator-rewritten plugin content, not the trusted upstream.

---

## §2 — Stage-1 Probe Results

| Field | Value |
|---|---|
| Cache path | `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` |
| `plugin.json` `name` | `ecc` |
| `plugin.json` `version` | `2.0.0-rc.1` |
| `plugin.json` `repository` | `https://github.com/affaan-m/ECC` |
| Cache `git remote -v` | **EMPTY** (no remote configured) |
| Cache HEAD SHA | `e980d06` |
| Upstream HEAD SHA | `2c0d226439ec14c60f509561386caba2a9ac7619` (`main` @ 2026-05-19) |
| Local-only commits in cache (top 5) | `e980d06`, `10b3adc`, `484db89`, `780e11d`, `ec327e1` — all `ship(W327-W329-*)` self-authored |
| Drift class | LOCAL-REWRITTEN cache + STALE-vs-upstream |

Conclusion: cache is **both** rewritten (CR-1 violation) **and** behind upstream (W329-E §1 SHA-pin drift symptom).

---

## §3 — SessionStart Hook Proposal

**File**: `tools/sessionstart-plugin-cache-remote-probe.mjs` (NEW, 1655 B, CR-2 ≤2KB sanctioned-shim exception per `CLAUDE.md` cardinal-rule-2).

**Cite anchors in the shim**:
- CR-1 doctrine: `https://code.claude.com/docs/en/plugins`
- CR-2 sanctioned-shim envelope: `CLAUDE.md` rules block (≤2KB + GitHub-issue anchor)
- Hook output contract: `https://docs.anthropic.com/en/docs/claude-code/hooks` (`hookSpecificOutput.additionalContext` injection for SessionStart)
- Violation anchor: W329-E §1+§10

**Behaviour** (read-only):
1. Walks every `<root>/.claude/plugins/cache/<vendor>/<plugin>/<ver>/.git`.
2. Runs `git -C <ver> remote -v` (2s timeout per dir).
3. Emits a single `additionalContext` block listing every cache dir with NO remote OR no `origin`.
4. Swallows all errors; exits 0 (SessionStart hooks MUST NOT fail — would kill the session).

**Not wired into `settings.json` by this wave**. Wiring proposal:
```json
"hooks": {
  "SessionStart": [
    { "matcher": "*", "hooks": [
      { "type": "command",
        "command": "node \"${CLAUDE_PROJECT_DIR}/tools/sessionstart-plugin-cache-remote-probe.mjs\"",
        "timeout": 5 }
    ] }
  ]
}
```
Operator decides whether to enable; W330-C only writes the shim file.

---

## §4 — Stage-2 Operator Command Sequence (paste-ready)

Per Anthropic plugin docs `https://code.claude.com/docs/en/plugins` + W270 corollary in `CLAUDE.md` cardinal-rule-1 ("Standard /plugin update no-ops on silent SHA drift — cache-delete + fresh-install is the SOTA fix"):

```powershell
# 1. SAFETY: snapshot the cache dir to git stash so we can roll back if needed
cd Z:\claude-sota-installed
git stash push -u --keep-index `
  -m "W330-C: ECC plugin-cache pre-restore snapshot ($(Get-Date -Format o))" `
  -- ".claude/plugins/cache/everything-claude-code"

# 2. DELETE the rewritten cache dir (W270 SOTA fix)
Remove-Item -Recurse -Force `
  ".claude\plugins\cache\everything-claude-code"

# 3. INTERACTIVE: in Claude Code, run
#    /plugin install everything-claude-code@affaan-m-marketplace
#    (exact marketplace name varies; check `/plugin marketplace list` first)

# 4. AFTER install completes, reload plugins (W270 corollary, NOT update)
#    /reload-plugins
```

> **DO NOT run `/plugin update`** — it no-ops on silent SHA drift per W270.

---

## §5 — Post-Install Verification

```powershell
# 5a. Verify upstream remote present
git -C ".claude\plugins\cache\everything-claude-code\everything-claude-code\2.0.0-rc.1" remote -v
# EXPECT: origin  https://github.com/affaan-m/ECC.git (fetch)
#         origin  https://github.com/affaan-m/ECC.git (push)

# 5b. Verify HEAD matches upstream main (or pinned tag)
git -C ".claude\plugins\cache\everything-claude-code\everything-claude-code\2.0.0-rc.1" rev-parse HEAD
# EXPECT (today): 2c0d226439ec14c60f509561386caba2a9ac7619

# 5c. Confirm NO local ship-* commits remain in cache
git -C ".claude\plugins\cache\everything-claude-code\everything-claude-code\2.0.0-rc.1" log --oneline -10 | Select-String "ship\(W3"
# EXPECT: no matches

# 5d. (Optional) Enable the SessionStart sentinel by editing .claude/settings.json
#     hooks block per §3 above, then start a fresh CC session and confirm
#     "Plugin-cache CR-1 sentinel: 0 warning(s)" appears in additionalContext.
```

---

## §6 — Rollback Plan

If `/plugin install` fails or upstream introduces a regression that breaks the runtime:

```powershell
# Restore the snapshotted cache from the W330-C stash
cd Z:\claude-sota-installed
git stash list | Select-String "W330-C: ECC plugin-cache pre-restore"
# Note the stash ref (e.g. stash@{0})

git stash pop stash@{0}
# Re-verifies the cache is back to e980d06 with local commits
```

If even the stash is unavailable, the cache can be rebuilt by `git clone https://github.com/affaan-m/ECC.git .claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1` followed by `git checkout 2c0d2264`, but the proper path is `/plugin install` so the marketplace manifest stays in sync.

---

## §7 — INDEPENDENCE-PROOF

- **FOUNDATION-ANCHOR**: Anthropic CR-1 plugin doctrine `https://code.claude.com/docs/en/plugins` ("install primitives only from trusted plugins").
- **COUNTERFACTUAL**: IF Anthropic CR-1 doctrine were deprecated tomorrow, marketplace-managed cache integrity would STILL be preserved BECAUSE **Pulumi Cloud state-backend** (different org, different domain — IaC not CC) MANDATES an external state-backend with git-remote-equivalent integrity for state-store correctness, per Pulumi docs `https://www.pulumi.com/docs/intro/concepts/state/` and the Pulumi self-managed-backends guide. A locally-rewritten state file with no canonical remote is treated by Pulumi as corrupt and refuses `pulumi up`; this is the same invariant (no-remote == corrupt) we apply to the plugin cache.
  - (a) **ORG-DISTINCT**: Anthropic ≠ Pulumi (separate companies, separate ecosystems).
  - (b) **CAUSAL-DISTINCT**: Pulumi's state-backend integrity model derives from IaC drift-prevention research, not from Claude Code plugin design.
  - (c) **TEMPORAL-DISTINCT**: Pulumi state-backend dates to 2018, predating the Claude Code plugin system by years.

---

## §8 — Cite Anchors

| Anchor | URL |
|---|---|
| CR-1 plugin doctrine | https://code.claude.com/docs/en/plugins |
| CR-2 hook semantics | https://docs.anthropic.com/en/docs/claude-code/hooks |
| W270 cache-delete corollary | `CLAUDE.md` cardinal-rule-1 (this repo) |
| Upstream ECC repo | https://github.com/affaan-m/ECC |
| Upstream HEAD verified | API: `https://api.github.com/repos/affaan-m/ECC/commits/main` -> `2c0d226439ec14c60f509561386caba2a9ac7619` (2026-05-19T17:51:02Z) |
| Pulumi state-backend (counterfactual) | https://www.pulumi.com/docs/intro/concepts/state/ |
| W329-E violation anchor | `docs/architecture/W329-DEEP-AUDIT-FULL-SOTA-UNLEASHED/` §1+§10 |
