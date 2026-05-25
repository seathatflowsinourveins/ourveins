# W259 — Gap-Resolution Playbook (post-restart e2e + remaining items)

> **Date**: 2026-05-16 (post-restart e2e) | **Status**: e2e PASS — runtime unleashed. Remaining gaps below are operator-judgment (each modifies shared/safety-posture state).
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION`.

## §0 — Post-restart e2e verification (this session)

The session restart picked up the W259-v8/v9/v10 unleashed config — verified:

| Check | Result |
|---|---|
| Git | 12 W259 commits, `main`==`HEAD`==`304f821`, 1 worktree / 2 branches, clean |
| settings.json hooks | LIVE — `SessionStart` / `PreToolUse` / `PostToolUse` / `WorktreeRemove` (4 events) |
| Output style | LIVE — `Proactive` |
| Agent-SDK harness | `harness/eval_harness.py` py_compile PASS + `--mode aggregate-demo` SELF-CHECK PASS |
| MCP servers | 18 connected (github / context7 / exa / deepwiki / memory / playwright / sequential-thinking / context-mode / chrome-devtools / repomix / serena / **graphiti** / phoenix / gitnexus / ...) |
| W259 catalog | 6,958 files intact |

## §1 — Gaps RESOLVED this session

- **U8 — claude binary update → RESOLVED**. `claude --version` = **2.1.143** (≥2.1.142 target). The operator's restart-cycle `claude update` closed it. `claude plugin details` per-session token-cost tooling is now available for the W259 T0.0 plugin-budget audit.
- **cognee dangling MCP entry → RESOLVED**. W259-v8 added `cognee` to `.mcp.json` as `type:http` → `http://127.0.0.1:8000/mcp` — config-ahead-of-deployment. e2e found: cognee is NOT pip-installed AND no server runs on :8000, so the entry **failed every session-start health check** (absent from `claude mcp list`). **Removed** the dangling entry (`.mcp.json` → 12 valid servers). This is an e2e-driven correction of W259-v8's over-eager config-ahead, not thrash — the entry should not exist until its server does. Re-add path in §2.

## §2 — Remaining gaps — operator-judgment (SOTA-cited commands)

Each item modifies shared-state or safety-posture — they need operator eyes, not autonomous execution.

### Gap A — cognee cold-tier bridge (deliberate re-add)
**SOTA ref**: `03-deepdive/COGNEE-INTEGRATION-CLAUDE-W259v6.md` §3 + `MEMORY-LAYER-RECONCILED-W259v4.md` §5. cognee 1.1.0 is pip-available.
**Why operator-judgment**: cognee is a HEAVY install into `Z:\venvs\claude` — a venv **shared across 3 runtimes** (claude-sota-installed + claude-sota + claude per CLAUDE.local.md). A heavy shared-venv mutation affects sibling runtimes.
**Also**: `graphiti` is ALREADY live as the FalkorDB cold-tier KG (`claude mcp list` confirms). Adding cognee (Kuzu-backed doc-GraphRAG) is a *complement*, not a replacement — decide if the second graph engine earns its keep (W259 D20 duplication-against-installed).
**Re-add (if adopting)** — self-starting stdio, NOT the broken `uvx`/babysit-http:
```bash
Z:/venvs/claude/Scripts/python.exe -m pip install cognee
# then .mcp.json mcpServers.cognee:
#   { "type":"stdio", "command":"Z:/venvs/claude/Scripts/python.exe", "args":["-m","cognee.api.mcp"] }
# (mirrors how graphiti self-starts as stdio — CC manages the process; no port :8000 babysit-server)
```
Verify exact cognee-mcp stdio entrypoint against `cognee` 1.1.0 package metadata before wiring.

### Gap B — hindsight memory PRIMARY install
**SOTA ref**: `03-deepdive/MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md` — `vectorize-io/hindsight` is the corrected L1.5 PRIMARY because it is the **only memory engine with a full native-CC plugin** (hooks + MCP + skill), MIT-licensed, Windows-verified, zero-cloud, already installed — INTEGRATION, not benchmark. Its 94.6% LongMemEval is `[SELF-REPORTED]` like every memory engine's (no engine has an independently-reproduced number; VA-Tech/WaPo are co-authors of hindsight's arXiv 2512.12818, NOT independent reproducers — the prior "independently reproduced" claim is FALSE).
**Why operator-judgment**: `claude plugin install` mutates this session's plugin set. CR-3 gate: codex Path-P review before `.mcp.json` commit.
```bash
claude plugin marketplace add vectorize-io/hindsight-memory
claude plugin install hindsight-memory@vectorize-io/hindsight-memory
```
Reversible: `claude plugin uninstall hindsight-memory`.

### Gap C — U2 permission-mode flip (`bypassPermissions` → `auto`)
**SOTA ref**: `CC-DIMENSIONS-UNLEASHED-W259v7.md` D7+D26 + **W259-v12 official-docs audit F1**.
**W259-v12 F1 correction**: `defaultMode: "auto"` IS a valid, honored value per official `docs.anthropic.com/en/docs/claude-code/settings` §Permission settings — the earlier "broken" claim was WRONG. Two valid mechanisms:
```jsonc
// Option 1 — settings.json (user-scope or .claude/settings.local.json — NOT shared project settings):
{ "permissions": { "defaultMode": "auto" } }
// Option 2 — launcher flag (W259-v8 wired the eee.ps1 opt-in):
//   $env:EEE_PERMISSION_MODE = 'auto'   (set before eee relaunch)
```
Note: the separate `autoMode` classifier-tuning **object** IS anti-injection-blocked from *shared* project settings — put any `autoMode` tuning in user-scope or project-local settings.
**Why still operator-judgment**: changes the runtime's SAFETY POSTURE — `auto` re-introduces permission prompts that can stall unattended `/loop` waves. The deferral is correct; only the *mechanism* guidance was corrected.
Verify after: routine ops near-zero prompts; one destructive op triggers a block.

### Gap D — W259 T0.0 plugin-budget audit (now unblocked)
**SOTA ref**: `CC-DIMENSIONS-UNLEASHED-W259v7.md` §4 U8 + `PLUGIN-MARKETPLACE-AUDIT-W259v2.md` (62% of installed skills dead-weight). The `claude plugin details` per-session token-cost tool is available now (binary 2.1.143).
```bash
claude plugin details   # per-plugin token cost → classify ACTIVE / DORMANT / DISCOVERY-ONLY
# target: ≤15 ACTIVE; encode in settings.json enabledPlugins; flip ECC to discovery-only
```

## §3 — Housekeeping done this session

- W259-v8/v9/v10 `.bak` revert-sources removed (changes committed + restart-confirmed; git holds full history; `git revert` is the revert path now). Pre-W259 backups (`settings.json.pre-W255-bak`) left untouched — not this arc's.

## §4 — Verdict

**The W259 arc is e2e-VERIFIED and the runtime is unleashed.** All 4 P0 + P1 unleash actions that could be safely auto-applied are live and confirmed post-restart. The 4 remaining gaps (A-D) are genuine operator-judgment calls — each modifies a shared venv, safety posture, or session plugin state — with exact SOTA-cited commands above. No autonomous action remains that does not cross the shared-state/safety boundary.
