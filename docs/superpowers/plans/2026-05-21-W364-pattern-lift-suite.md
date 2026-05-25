# W364 — Pattern Lift Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Lift the 6 SOTA patterns from umbrella spec §5.2 into native skills/scripts: (1) `.gc_meta.json` tiered TTL GC; (2) `wait_agent` global-mailbox skill; (3) AGT observability-only telemetry; (4) daemon-token credential class; (5) issue-comment-as-mailbox skill; (6) 8-plugin SoC alignment doc.

**Architecture:** 6 independent deliverables (different files → parallel-dispatchable). Node 22 ESM for scripts (atomic-write reuses W363 `preagent-wave-lock-guard.mjs` pattern). New local skills follow CR-4 trigger discipline (≤8 distinct triggers, auto-fire rule stated, no >50% sibling overlap). All cost/budget primitives are observability-only per max-quality directive (§2) — NO kill-switch.

**Tech Stack:** Node 22 ESM, `node:test`, `mcp__ccusage__blocks` (observability), `mcp__basic-memory__*` (T6 mailbox), `gh` CLI (issue-comment mailbox), Composio AO `packages/core/src/types.ts` (8-slot reference from W362c §P0.2).

**Reference:** Umbrella spec `docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md` (r6 APPROVED, commit `c0249d1`). W363 wave-lock guard (commit `7bf1e73`) is the atomic-write reference impl. Research foundation: fork-1 (multica `.gc_meta.json`+`mdt_*`+Squad), fork-4 (philschmid `wait_agent`, MS AGT), W362c §P0.2 (Composio 8-slot types).

---

## File Structure

| # | File | Action | Responsibility | ~LOC |
|---|---|---|---|---|
| C1 | `tools/worktree-gc.mjs` + `tools/test/worktree-gc.test.mjs` | Create | Tiered TTL GC for sibling `*-W*` worktrees (24h done / 72h orphan / 12h artifact-only); non-destructive dry-run default; never `--force` on uncommitted | ~250 + ~150 |
| C2 | `.claude/skills/wait-agent/SKILL.md` | Create | Orchestrator dispatches N agents, does own work, polls `claude agents --json`, returns first-completed (philschmid `wait_agent`) | ~120 |
| C3 | `.claude/skills/agent-budget-discipline/SKILL.md` | Modify | Extend with AGT observability-only section (per-task/per-agent/org-monthly trace + Langfuse OTEL annotation, NO kill) | +~60 |
| C4 | `tools/daemon-token-mint.mjs` + `tools/test/daemon-token-mint.test.mjs` | Create | Per-bg-session scoped short-lived T6 write-token (multica `mdt_*`); HMAC-signed, TTL-bounded, scope-limited | ~200 + ~120 |
| C5 | `.claude/skills/issue-mailbox/SKILL.md` | Create | T6 basic-memory wave-thread + structured `@mention` semantics in commit/PR bodies (multica Squad-as-issue-comments) | ~110 |
| C6 | `docs/architecture/W364-8-PLUGIN-SOC-ALIGNMENT.md` | Create | Cite-anchored mapping of Composio AO 8-plugin SoC → eee.ps1 extension points; design reference for W366 wire-up | ~200 |

All 6 independent. CR-4 trigger discipline applies to C2/C5 (new skills); C3 extends existing skill.

---

## Task C1: `tools/worktree-gc.mjs` — tiered TTL GC + tests

**Files:** Create `tools/worktree-gc.mjs`, `tools/test/worktree-gc.test.mjs`

- [ ] **Step 1: Write failing tests**

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { classifyWorktree, sweep } from '../worktree-gc.mjs';

function fixture() { return mkdtempSync(join(tmpdir(), 'wt-gc-')); }

test('C1-T1: status=done + age>24h → remove decision', () => {
  const meta = { status: 'done', last_activity: new Date(Date.now() - 25*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'remove');
});
test('C1-T2: status=done + age<24h → keep', () => {
  const meta = { status: 'done', last_activity: new Date(Date.now() - 1*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'keep');
});
test('C1-T3: status=orphan + age>72h → remove', () => {
  const meta = { status: 'orphan', last_activity: new Date(Date.now() - 73*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'remove');
});
test('C1-T4: artifact-only + age>12h → prune-artifacts', () => {
  const meta = { status: 'active', artifact_only: true, last_activity: new Date(Date.now() - 13*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'prune-artifacts');
});
test('C1-T5: uncommitted changes → always SKIP regardless of age', () => {
  const meta = { status: 'done', uncommitted: true, last_activity: new Date(Date.now() - 100*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'skip');
  assert.match(classifyWorktree(meta).reason, /uncommitted/i);
});
test('C1-T6: sweep --dry-run never mutates', () => {
  const dir = fixture();
  mkdirSync(join(dir, '.gc-meta'), { recursive: true });
  writeFileSync(join(dir, '.gc-meta', 'W999.json'), JSON.stringify({ status: 'done', last_activity: '2020-01-01T00:00:00Z', worktree_path: dir }));
  const r = sweep({ metaDir: join(dir, '.gc-meta'), dryRun: true });
  assert.equal(r.mutated, false);
  assert.ok(r.decisions.length >= 1);
  rmSync(dir, { recursive: true });
});
```

- [ ] **Step 2:** Run `node --test tools/test/worktree-gc.test.mjs` — expect 6 FAIL.

- [ ] **Step 3: Implement `tools/worktree-gc.mjs`** with exports `classifyWorktree(meta)` + `sweep({metaDir, dryRun})`. Tiered TTL: `done`>24h→remove, `orphan`>72h→remove, `artifact_only`>12h→prune-artifacts, `uncommitted`→skip always. `sweep` default `dryRun:true`. NEVER calls `git worktree remove --force` on uncommitted. CLI: `node tools/worktree-gc.mjs [--execute] [--meta-dir <path>]` (default dry-run). Reuse W363 atomic-write shim pattern if writing `.gc_meta.json`.

- [ ] **Step 4:** Run tests — expect 6/6 PASS.

- [ ] **Step 5: Commit** `git add tools/worktree-gc.mjs tools/test/worktree-gc.test.mjs && git commit` with msg `feat(W364): worktree-gc tiered TTL GC (multica .gc_meta lift)` + `Codex-Verdict: BOOTSTRAP` trailer.

---

## Task C2: `.claude/skills/wait-agent/SKILL.md` — wait_agent mailbox skill

**Files:** Create `.claude/skills/wait-agent/SKILL.md`

- [ ] **Step 1: Write the skill** with CR-4-compliant frontmatter:

```markdown
---
name: wait-agent
description: Use when the orchestrator has dispatched 2+ background agents (Agent tool or `claude --bg`) and wants to continue its own work while waiting, then collect results on first-completion or N-of-M completion rather than blocking-wait-all. Triggers on "wait for agents", "wait_agent", "collect when ready", "first-completed", "non-blocking join", "poll agents", or after a multi-Agent dispatch where the orchestrator has independent work to do. Do NOT use for single-agent dispatch (just await the one notification) or when all results are strictly required before any progress (use blocking collection). Anchors philschmid subagent-patterns-2026 `wait_agent` global-mailbox + Anthropic claude-cookbooks orchestrator-workers async-join.
---

# wait-agent — non-blocking agent-completion mailbox
```

Body: explain the pattern — dispatch N agents in one message → orchestrator does own work → invoke this skill which polls `claude agents --json` (or checks harness notifications) every N seconds → returns first-completed (or N-of-M) → orchestrator synthesizes incrementally. Note the harness already notifies on completion (forks/subagents), so this skill is for the EXTERNAL-state case (`claude --bg` sessions, external CI). Cite W363 R2 `claude agents --json` (v2.1.145). State the auto-fire cardinal rule: fires only post-multi-Agent-dispatch when orchestrator has parallel work. ≤8 triggers, no overlap with `dispatching-parallel-agents` (that's pre-dispatch; this is post-dispatch join).

- [ ] **Step 2: Verify CR-4 trigger discipline** — `Grep` the description; count distinct trigger phrases (≤8); confirm it states the auto-fire rule + the NOT-use cases.

- [ ] **Step 3: Commit** `feat(W364): wait-agent mailbox skill (philschmid wait_agent lift)` + BOOTSTRAP trailer.

---

## Task C3: extend `.claude/skills/agent-budget-discipline/SKILL.md` — AGT observability

**Files:** Modify `.claude/skills/agent-budget-discipline/SKILL.md`

- [ ] **Step 1: Read** the existing skill to find insertion point + preserve frontmatter.

- [ ] **Step 2: Append an "AGT Observability (no kill — max-quality mode)" section** documenting: per-task/per-agent/org-monthly tracking via `mcp__ccusage__blocks`; Langfuse OTEL annotation event `agt.threshold.cross`; soft-info (50%) / soft-warn (100%) severities; explicit statement that NEITHER kills the session per umbrella spec §2 max-quality directive; operator-manual stop only (`ao stop` / `claude stop <id>`). Cite MS Agent Framework 1.0 AGT (the existing skill already anchors autogen→agent-framework). Do NOT change the frontmatter `description:` trigger set unless adding the observability use-case improves it (keep ≤8 triggers).

- [ ] **Step 3: Commit** `feat(W364): AGT observability-only section in agent-budget-discipline` + BOOTSTRAP trailer.

---

## Task C4: `tools/daemon-token-mint.mjs` — scoped write-token + tests

**Files:** Create `tools/daemon-token-mint.mjs`, `tools/test/daemon-token-mint.test.mjs`

- [ ] **Step 1: Write failing tests** covering: mint produces `dmt_<base64url>` token; token carries `{scope, wave, session_id, exp}`; `verify()` accepts valid + rejects expired (`exp` past) + rejects scope-mismatch + rejects tampered HMAC; HMAC uses a per-session secret from env `DAEMON_TOKEN_SECRET` (NOT hardcoded). ~6 tests.

- [ ] **Step 2:** Run — expect FAIL.

- [ ] **Step 3: Implement** `mint({scope, wave, sessionId, ttlSeconds})` → HMAC-SHA256-signed token via `node:crypto.createHmac`; `verify(token, {expectedScope})` → `{valid, reason, payload}`. Secret from `process.env.DAEMON_TOKEN_SECRET` (fail-closed if absent — throw, do NOT use a default secret). Token format `dmt_<base64url(payload)>.<base64url(hmac)>`. NO secret logging.

- [ ] **Step 4:** Run — expect PASS.

- [ ] **Step 5: Commit** `feat(W364): daemon-token-mint scoped write-token (multica mdt_* lift)` + BOOTSTRAP trailer.

Security note: this is a defense-in-depth scoping primitive, NOT a security boundary (CR-5: real boundaries are CC permissions). Token limits a bg-agent's T6 write blast-radius; it does not gate the filesystem.

---

## Task C5: `.claude/skills/issue-mailbox/SKILL.md` — issue-comment mailbox skill

**Files:** Create `.claude/skills/issue-mailbox/SKILL.md`

- [ ] **Step 1: Write the skill** with CR-4-compliant frontmatter:

```markdown
---
name: issue-mailbox
description: Use when coordinating multi-agent or multi-session work where a durable shared substrate (not ephemeral mailbox) is the right IPC channel — agents leave traces in T6 basic-memory wave-threads + structured `@mention` lines in commit/PR bodies, and peers read the substrate rather than receiving direct messages. Triggers on "issue mailbox", "stigmergic coordination", "shared blackboard", "@mention handoff", "wave-thread", "leave a trace for the next agent", or when SendMessage/agent-teams mailbox is unavailable but cross-session coordination is needed. Do NOT use for in-team real-time coordination (use agent-teams SendMessage) or single-agent work. Anchors multica Squad-as-issue-comments + Anthropic blackboard-pattern + 2026 stigmergic-coordination survey.
---

# issue-mailbox — stigmergy-via-shared-substrate coordination
```

Body: T6 basic-memory `main/wave-threads/W<n>` note as the blackboard; `@mention` convention in commit trailers (`Coord-Mention: @<agent-or-wave>`) + PR bodies; readers poll the wave-thread + grep recent commit trailers. Contrast with agent-teams SendMessage (real-time, in-team) vs this (durable, cross-session, async). Cite the 2026 taxonomy caveat: stigmergy ranks below hierarchical for production — use only when hierarchical mailbox unavailable. State auto-fire rule.

- [ ] **Step 2: Verify CR-4 discipline** (≤8 triggers, no >50% overlap with agent-teams skills or wait-agent).

- [ ] **Step 3: Commit** `feat(W364): issue-mailbox stigmergy skill (multica Squad lift)` + BOOTSTRAP trailer.

---

## Task C6: `docs/architecture/W364-8-PLUGIN-SOC-ALIGNMENT.md` — SoC alignment doc

**Files:** Create `docs/architecture/W364-8-PLUGIN-SOC-ALIGNMENT.md`

- [ ] **Step 1: Write the doc** mapping Composio AO's 8 plugin slots (Runtime / Agent / Workspace / Tracker / SCM / Notifier / Terminal / Lifecycle — from W362c §P0.2 `packages/core/src/types.ts`) to the runtime's existing extension points:
   - Runtime → eee.ps1 launch (process, native ConPTY)
   - Agent → subagent_type allowlist + codex (frontier-peer)
   - Workspace → eee.ps1 `--Wave` worktree-creation (W363)
   - Tracker → GitHub Issues + T6 wave-threads (C5)
   - SCM → git + pre-commit gates + codex Stop-gate
   - Notifier → Langfuse OTEL + ccusage observability (C3)
   - Terminal → `claude agents` view (native) + future Composio web (W366)
   - Lifecycle → wave-lock guard (W363) + worktree-gc (C1) + daemon-token (C4)
   This is the design reference for W366 Composio wire-up: shows which native primitives map to which AO slot, so the bridge (Path B) wires cleanly. NO code — pure architecture doc.

- [ ] **Step 2: Commit** `docs(W364): 8-plugin SoC alignment (Composio AO → native extension points)` + BOOTSTRAP trailer.

---

## Task C7: Integration + codex round-1 review + wave-close

- [ ] **Step 1: Run all new test suites** — `node --test tools/test/worktree-gc.test.mjs tools/test/daemon-token-mint.test.mjs` → expect all PASS. Re-run W363 suites to confirm no regression.

- [ ] **Step 2: Fire codex round-1 review** on the W364 deliverables (all 6 components) via `codex-companion.mjs task --effort high` — assess: CR-4 trigger discipline on new skills (C2/C5), CR-5 daemon-token-is-not-a-boundary clarity (C4), max-quality observability-only (C3), GC never-force-on-uncommitted (C1), SoC mapping correctness (C6). Fix BLOCK findings inline (≤2 rounds).

- [ ] **Step 3: On APPROVE:** update umbrella spec §8 W364 row → COMPLETE; write T6 verdict `main/verdicts/w364-pattern-lift-suite-verdict`; commit spec update with `Codex-Verdict: APPROVE`.

- [ ] **Step 4: Push** `git push origin w348-sota-fix-p5b` (fast-forward; verify 0-behind first per W363 wave-close lesson).

---

## Self-Review

**1. Spec coverage:** umbrella §5.2's 6 patterns → C1-C6. Covered.
**2. Placeholders:** test bodies + frontmatter + commit msgs concrete. No TBD.
**3. Type consistency:** `classifyWorktree`/`sweep` (C1), `mint`/`verify` (C4) named consistently across impl+tests.
**4. Risk:** 6 independent files → parallel-safe. CR-4 trigger audit on C2/C5 is the main quality gate. C4 daemon-token must fail-closed on absent secret (no default).
