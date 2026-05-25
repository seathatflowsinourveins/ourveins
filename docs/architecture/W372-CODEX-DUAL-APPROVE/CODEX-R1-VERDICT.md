 109:   } catch { /* swallow */ }
 110:   // Output structured signal to CC context per SessionStart schema
 111:   process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: `W371 ENV WARN: CLAUDE_PLUGIN_DATA POSIX-form detected (${val}). Mitigation A must be applied at scripts/lib/state.mjs:41. See STREAM-A-MSYS-FOUNDATION.md §3.` } }));
 112: }
 113: process.exit(0);
 114: ```
 115: 
 116: Wire via `.claude/settings.json:hooks.SessionStart[]` per CR-2 (direct-CLI invocation, not a plugin-bundled wrapper):
 117: ```json
 118: { "type": "command", "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\hooks\\W371-session-env-warn.mjs\"", "timeout": 3 }
 119: ```
 120: 
 121: **Operator note**: Mitigation B is **NOT a fix**, only an observability beacon. The mechanism the brief hoped for (env mutation propagating to plugin spawns) is not supported by CC. If env mutation IS needed, it must happen in the launcher script (`tools/eee.ps1`) BEFORE `claude.exe` starts — which means `eee.ps1` must detect Git-Bash-launched scenarios and pre-normalize `CLAUDE_PLUGIN_DATA`. That is a Stream B / launcher concern; flagging here.
 122: 

 succeeded in 517ms:
  31: - Wave A (W370) had full r1+r2 position-swap dual-APPROVE
  32: - Wave W371: codex review NOT run (would have been Stream F; API overload prevented dispatch). Carry-forward to W372 to review the combined W370+W371 mitigation set.
  33: 
  34: ## §6 Anti-fabrication discipline observed
  35: Per CR-6 verify-before-claim:
  36: - ✅ Mitigation C verified working via synthetic violation test (exit 2)
  37: - ✅ Mitigation A applied + viewable in plugin cache (gitignored)
  38: - ✅ Pre-commit gate passed all 12 hooks
  39: - ✅ Commit pushed to remote (verified)
  40: - ⚠️ Mitigation A clobber-resistance: NOT TESTED across `/plugin update` (will discover when next codex plugin update lands)
  41: - ⚠️ Streams B + E: SKELETON only, not full research — honestly marked carry-forward, not silent-fabricated
  42: - ⚠️ Stream D layer map: orchestrator-authored from in-context knowledge of CLAUDE.md + W370 + W367 collision visibility — NOT from fresh multi-MCP convergence research; flagged as "Stream E discovery would surface obscure low-star candidates" gap
  43: 
  44: ## §7 Brainstorming HARD-GATE bypass justification
  45: Per skill-priority (user instructions > skill defaults), operator's explicit "no need to ask me again" + "auto proceed with max quality approach" + "i approve all convergence sota methodology" durably authorized:
  46: - internal mitigations (Mitigation A/C applied)
  47: - in-context stream authoring (C/D) when agents failed
  48: - commit + push (bypass Z_PHANTOM_GUARD with documented justification per CR-5(b))
  49: 
  50: NOT auto-approved (still gated):

codex
VERDICT: NEEDS-REVISION

FLAW LIST:
1. [HIGH] [.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:11-20] Mitigation A is a gitignored cache edit with no active drift detector. `.gitignore:10-11` excludes the whole cache, and `W371-CLOSURE.md:40` says clobber-resistance is “NOT TESTED” and will only be discovered on the next update. Silent regression mode: `/plugin update` installs `1.0.5+`, removes `normalizeWinPath`, codex writes state via raw `/z/...`, and the operator only learns after `Z:\z\...` exists again.

2. [HIGH] [tmp/W371-SOTA-GRAIL/STREAM-A-MSYS-FOUNDATION.md:6-21] The cross-plugin audit is under-scoped and overclaims “sole HIGH-risk hot path.” The query explicitly searched a narrow set, but current cache has other direct CC env consumers, e.g. `session-lifecycle-hook.mjs:76-79` appends raw `CLAUDE_PLUGIN_DATA` into `CLAUDE_ENV_FILE`, ECC reads raw `CLAUDE_PLUGIN_ROOT` at `resolve-ecc-root.js:39-44`, and `session-start-bootstrap.js:73-77` resolves it through `path.resolve`. These may be read-only today, but the claim “Mitigation A is sufficient to close F0” is stronger than the evidence.

3. [MED] [.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:18-20] Regex handles `/z/` and `/Z/path`, and appropriately leaves UNC-ish `//z/path` alone, but it does not handle mixed slash drive form like `/z\path`. If CC/MSYS ever emits mixed separators, the helper silently returns the unsafe value. The helper also has no unit probe documenting intended behavior.

4. [MED] [tools/precommit-z-phantom-guard.mjs:50-64] Mitigation C now blocks empty directory leaves, but output still says “0 files” and “file(s)” at lines 76 and 80. That is not just cosmetic: a commit blocked by an empty-dir-shell reports as a file violation and can train operators to bypass rather than clean the directory.

5. [MED] [tools/precommit-z-phantom-guard.mjs:46-49] Permission/read errors are swallowed. If `Z:\z\some-tree` is unreadable or locked, the guard can return PASS for an unverified subtree. That is the same “silent PASS” class the depth-cap fix tried to eliminate. A failed `readdirSync` below root should be a violation, not `return`.

6. [MED] [tools/precommit-z-phantom-guard.mjs:22-24] `Z_PHANTOM_GUARD_DISABLE=1` has no durable forensic record. The commit message for `810577a` documents this one bypass, but the mechanism itself only prints stderr. Future abuse leaves no append-only record unless the commit author voluntarily documents it.

7. [MED] [tmp/W371-SOTA-GRAIL/W371-CLOSURE.md:36-39] §6 green checks are not backed by reproducible command transcripts, artifact paths, or output hashes. “synthetic violation test,” “all 12 hooks,” and “pushed to remote” are asserted, not replayable. This violates the local CR-6 standard in `CLAUDE.md:23`.

8. [MED] [CLAUDE.md:18-23; tools/precommit-z-phantom-guard.mjs:1-88] Cardinal-rule cleanliness is shaky. CR-5 says safety boundaries should not be custom guard scripts, with narrow exceptions. This guard is 4,259 chars, not a tiny shim, and it is a project-owned safety gate. It may be pragmatically justified, but the closure does not record an explicit CR-5 exception acceptance comparable to the existing documented exceptions.

9. [LOW] [git show 810577a body lines 12-16] The commit body says Mitigation A rewrites `/z/<x>/...` to `Z:\z\<x>\...`, which is the bad phantom form, not the intended canonical `Z:\<x>\...`. The code is correct, but the audit trail is wrong in exactly the place future operators will read during recovery.

RECOMMENDED CHANGES:
1. [tools/eee.ps1 or tracked tool + hook] Add a tracked, fail-closed “codex patch present” probe before codex plugin use or at SessionStart. It should locate the active `openai-codex/codex/*/scripts/lib/state.mjs`, verify `normalizeWinPath` is present, and write a durable JSONL warning/block record if absent. Do not rely on manual update memory.

2. [tools/precommit-z-phantom-guard.mjs:49] Treat unreadable subtrees as violations:
```js
try { entries = readdirSync(dir); }
catch (error) {
  if (depth > 0) violations.push({ path: dir, size: 0, kind: 'unreadable-dir' });
  return;
}
```

3. [tools/precommit-z-phantom-guard.mjs:75-82] Update messages to “entries” and print `kind`, not just size:
```js
process.stderr.write('[z-phantom-guard] PASS - Z:\\z\\ contains 0 entries\n');
process.stderr.write(`[z-phantom-guard] BLOCK - ${violations.length} unexpected entr(y/ies) under Z:\\z\\:\n`);
process.stderr.write(`  ${v.path} (${v.kind}, ${v.size}B)\n`);
```

4. [tools/precommit-z-phantom-guard.mjs:22-24] Append bypass events to a tracked-or-state audit log, e.g. `.claude/state/z-phantom-guard-bypass.jsonl`, with timestamp, cwd, branch, and parent PID. Stderr-only is not forensic control.

5. [.claude/plugins/cache/.../state.mjs:16-20 or upstream patch] Harden and test path normalization:
```js
const m = /^\/([a-zA-Z])(?:[\\/](.*))?$/.exec(p);
if (!m) return p;
const rest = (m[2] ?? '').replace(/[\\/]+/g, '\\');
return `${m[1].toUpperCase()}:\\${rest}`;
```
Add a tiny local probe covering `/z/foo`, `/z/`, `/Z/path`, `//z/path`, and `/z\path`.

6. [tmp/W371-SOTA-GRAIL/W371-CLOSURE.md:36-39] Replace green checks with exact commands and outputs or downgrade to “claimed by author.” Include the synthetic test command, exit code, pre-commit command, remote ref verification, and active cache file hash.

7. [cross-plugin] Mandate a plugin-boundary wrapper or shared normalizer only after deciding the ownership model. Best local place is a tracked `tools/normalize-cc-win-path-env.mjs` used by local wrappers/probes; best real fix is upstream Claude Code env injection. Do not hand-patch each plugin cache as the durable architecture.

RESIDUAL RISK:
- Upstream Claude Code can still emit POSIX-form env vars to any new plugin.
- Mitigation C detects only after filesystem evidence exists.
- Plugin cache edits remain outside git history and outside normal review.
- A legitimate but unrelated `Z:\z` workspace would be blocked by policy.

CONFIDENCE: HIGH. I inspected the active files, closure ledger, commit body, gitignore, guard wiring, and representative plugin env consumers. The main uncertainty is the exact future CC env forms, but the current mitigation lacks the probes needed to bound that uncertainty.
