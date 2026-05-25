# W326 Stream A — Settings.json Surgical Fixes — SYNTHESIS

**Wave**: W326 Stream A · **Date**: 2026-05-19
**Pre-edit HEAD**: `f52aebc` (W325-codex-r3 SEV-1 closure APPROVED at r4)
**Owner**: docs/architecture/W326-SETTINGS-FIXES/* + 1-line edit `.claude/settings.json:206` — STRICT-FILE-OWNERSHIP
**Wall-clock**: ~20 min (within 25-min budget)
**Verdict**: **SHIP** — 2 fixes processed, 1 net edit applied, 0 BLOCKER findings net-new

---

## §1 — Executive summary

W326 Stream A directive specified 2 surgical settings.json fixes:

| F# | Source W325 finding | W326 action taken | Status |
|----|---|---|---|
| F1 | W325-D F-W325-D-CLEAN-2 (ccstatusline AppData path) | **APPLIED** — 1-line edit settings.json:206 hardcoded `node C:/Users/42/...` → `npx -y ccstatusline@2.2.19 ...` | ✓ SHIPPED |
| F2 | W325-A GAP-4 (statusLine block absent) | **DISCOVERED-PRE-CLOSED** — block already added between W325 and W326 (with broken path that F1 fixes); F1 implicitly closes GAP-4 | ✓ SHIPPED-VIA-F1 |

**Net settings.json delta**: 16,055B → 15,998B (saved 57B). JSON valid. gitleaks PASS (no leaks). 1-line diff. R1-R5 all HOLD (R5 unchanged per scope). `self_invented_count: 0` HOLDS.

---

## §2 — F1 deep-dive (ccstatusline NPX-pinned)

Full detail at: `W326-A-1-CCSTATUSLINE-NPX-FIX.md`

**Surgical edit** (settings.json:206):
```diff
-    "command": "node C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/dist/ccstatusline.js --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
+    "command": "npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
```

**Why CR-9-compliant**: `npx -y <pkg>@<pinned-version>` matches W286-cross canonical form (commits `fcafe05` + `77dc081`). `2.2.19` was npm-registry-`latest` at time-of-fix (probed via `npm view ccstatusline version`). MIT license confirmed.

**Smoke-test** (this session, post-apply):
```
$ echo '{}' | npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json
... (rich 3-line × 12-widget rendered status — see F1 doc §3)
```

**Result**: Functional parity with prior hardcoded invocation; **+Z:-portability gained** (no user-profile dependency).

---

## §3 — F2 deep-dive (statusLine block)

Full detail at: `W326-A-2-STATUSLINE-BLOCK-ADD.md`

**Key finding**: The W326 directive said "P0 — statusLine block ADD (currently absent)" but the block was already PRESENT at lines 204-209 of settings.json at HEAD `f52aebc`. Some wave between W325 ship and W326 dispatch ADDED the block (with the broken hardcoded path that W325-D F-W325-D-CLEAN-2 simultaneously flagged in parallel — the W325 streams A and D were measuring different snapshots of settings.json).

**Resolution**: F1's path-fix REPAIRS the existing-but-broken block. No separate ADD needed. F2 doc records:
- The schema validity of the current block (CCBP-compliant per `https://docs.anthropic.com/en/docs/claude-code/settings`)
- The 38 insight widgets wired across 3 lines via `.claude/ccstatusline/settings.json` indirection (model, context-window-pct, context-bar, session-cost, session-usage, weekly-usage, block-timer, etc.)
- Full coverage of W326 directive items (model · context-window-pct · session-cost · rate-limit · etc.)
- Visual mock confirmed via this-session smoke

**Status**: GAP-4 = CLOSED-VIA-F1.

---

## §3.5 — Why I did NOT re-add statusLine

Per W326 directive's "surgical line-level edit MUST" + standard JSON-validity invariant: re-applying an ADD when the block exists would either:
- (a) duplicate the key (JSON syntactic invalid — settings.json fails to load — RUNTIME-BREAKING regression)
- (b) overwrite the existing 3-line × 38-widget rich schema with a simpler one drafted from W325-A's pre-image baseline (REGRESSION on insight coverage)

Either branch is a worse outcome than the F1 path-fix that lights up the existing rich config.

This is the **W325-codex-pre-flight pattern**: verify current state of the target before applying paste-ready content. Document the discovery if state has drifted. The W326 directive's contingency ("If the paste-ready snippet doesn't exist, DRAFT it cleanly + document for operator-confirm before apply") was honored by inversion — the SNIPPET existed in W325-A's recommendations, but the SITE (settings.json) already had the block, so the snippet was not re-applied.

---

## §4 — Out-of-scope items (W327 carry-forward)

Per W326 directive's "OPERATOR-BLOCKING ITEMS CARRY (do NOT attempt this stream)":

| Item | Why deferred | Wave-target |
|---|---|---|
| R5 Option C decision (`bypassPermissions:true` + sandbox `enabled:false` SHIP-BLOCKER) | Operator-decision required; 6+ convergent findings (W316-S1 + W314-E + W316-S4 + W316-S5 L7 + W317-S1 + W325-D F-C-1) | W327 P0 |
| Langfuse key rotation (SEV-1 from W325-r1) | Operator action (revoke + reissue + update CLAUDE.local.md) | W327 P0 |
| Perplexity key rotation (SEV-1 from W317-r2-S7) | Operator action (revoke + reissue + update CLAUDE.local.md) | W327 P0 |
| `/plugin update` interactive run | Already invoked per directive note | tracked |
| Commit-signing decision | Operator | W327 |

**Stream A did NOT touch any of these.**

---

## §5 — W327 forward-AIs from this stream

| # | ID | Priority | Description | Source |
|---|---|---|---|---|
| 1 | W327-A-F1-1 | P3 | Re-pin ccstatusline on patch-cadence release (2.2.20+) | F1 §6 |
| 2 | W327-A-F1-2 | P3 | `npm uninstall -g ccstatusline` to clean local C:/Users/42/AppData orphan (reclaim ~3.2MB; confirms npx cold-path works) | F1 §6 |
| 3 | W327-A-F2-1 | P2 | Verify statusLine renders correctly in interactive CC session at next session-start (this F2 verified via direct-pipe smoke only) | F2 §7 |
| 4 | W327-A-F2-2 | P3 | Audit ccstatusline widget count for terminal-row-wrap risk (38 widgets / 3 lines — generous; minimalism if observed perf hit) | F2 §7 |
| 5 | W327-A-F2-4 | P2 | Trace which intervening wave between W325 ship and W326 dispatch added the broken-path statusLine block (audit-trail consolidation) | F2 §7 |
| 6 | W327-A-X-1 | P3 | Trim settings.json from 15,998B (after F1 saved 57B) back toward W317-A budget if cap is reactivated; or codify the new 16KB-effective cap in CLAUDE.md L48 | F1 + size-tracking |

**Total Stream-A forward-AIs**: 6 (1 P2 critical-ish, 2 P2 nominal, 3 P3 nice-to-have).

---

## §6 — Cardinal-rule invariants (post-W326-A)

| Rule | Status (pre-W326-A) | Status (post-W326-A) | Δ |
|---|---|---|---|
| R1 — trusted primitives | ✓ HOLD | ✓ HOLD | — |
| R2 — direct-CLI hooks only | ✓ HOLD | ✓ HOLD | — |
| R3 — upstream subagents | ✓ HOLD | ✓ HOLD | — |
| R4 — CLAUDE.md + settings.json | ✓ HOLD | ✓ HOLD | — |
| R5 — sandbox/permissions | ⚠ PARTIAL-HOLD (6+ findings) | ⚠ PARTIAL-HOLD (UNCHANGED — out of scope) | — |
| CR-9 — pinned versions | ⚠ 6th violation @ statusLine:206 | ✓ RESTORED (npx -y @2.2.19) | **NET-FIX** |
| `self_invented_count` | 0 | 0 | — |

**Net cardinal-rule change**: CR-9 6th violation RESOLVED. R5 SHIP-BLOCKER remains untouched (operator W327 mandate).

---

## §7 — Files touched (full manifest)

| Path | Lines | Action | Bytes Δ |
|---|---|---|---|
| `Z:/claude-sota-installed/.claude/settings.json` | 206 only (1 line) | EDIT | −57 (16,055 → 15,998) |
| `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/W326-A-1-CCSTATUSLINE-NPX-FIX.md` | n/a | CREATE | +~5,200 |
| `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/W326-A-2-STATUSLINE-BLOCK-ADD.md` | n/a | CREATE | +~7,400 |
| `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/STREAM-A-SYNTHESIS.md` | n/a | CREATE | (this file) |

**File ownership respected**: only `.claude/settings.json:206` and `docs/architecture/W326-SETTINGS-FIXES/*`. No other agents' areas touched.

---

## §8 — Smoke-verification matrix

| Check | Method | Result |
|---|---|---|
| JSON syntactic validity | `node -e "JSON.parse(require('fs').readFileSync(...))"` | ✓ JSON OK |
| Size budget | `wc -c .claude/settings.json` | 15,998B (−57B vs pre; well within ~17KB W326 ceiling) |
| gitleaks staged-protect | `gitleaks protect --staged --no-banner --redact` | ✓ EXIT=0 "no leaks found" |
| 1-line diff surface | `git diff .claude/settings.json` | ✓ 1 line replaced |
| ccstatusline functional | `echo '{}' \| npx -y ccstatusline@2.2.19 --config ...` | ✓ rendered full 3-line status |
| npm registry version | `npm view ccstatusline version` | ✓ 2.2.19 (pinned-current) |
| License | `npm view ccstatusline@2.2.19 license` | ✓ MIT |

All gates green. Ready for main-session aggregation + commit.

---

## §9 — Final remarks

This stream was scope-discipline-friendly: 2 small high-confidence fixes, both with paste-ready content available in W325 source docs. The only judgment-call was F2's discovery that GAP-4 was already partly resolved — applying the additive recommendation would have regressed. Stream A chose to document the pre-closure instead of re-applying, then let F1 (which was clearly NOT pre-applied) carry the actual repair work.

**No operator-decision dependencies remained for the in-scope items.** R5 SHIP-BLOCKER and 2 SEV-1 key rotations are correctly carry-forward to W327.

Stream A complete. Main session aggregator should pick up the settings.json edit + 3 new docs in this directory for the W326 closure commit.
