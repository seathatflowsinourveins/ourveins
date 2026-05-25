# W328-A-2 — Option A/B/C Match Analysis (which R5-unblock path was actually shipped?)

**Wave**: W328 Stream A · **Date**: 2026-05-19 · **HEAD**: `2c48b1e`
**Inputs**: W325-C 3-option matrix + W327-D-1 K-1 Path 2A/2B remediation map + live `.claude/settings.json` state per W328-A-1

---

## §1. Three R5-unblock options under consideration

### Option A — Full Sandbox (W325-C recommended weight 2.60)

Per `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-A-FULL-SANDBOX.md` (10.5 KB):
- `permissions.defaultMode` → `"default"` (no bypassPermissions)
- `sandbox.enabled` → `true`
- `sandbox.failIfUnavailable` → `true`
- `sandbox.allowUnsandboxedCommands` → `false`
- Remove `npx`, `uvx` from `sandbox.excludedCommands`
- ~20 Bash predicate allowlist entries to preserve common workflow
- **Prereq**: WSL2 migration (3-5 wave effort) per `https://code.claude.com/docs/en/sandboxing` — Windows-native NOT in supported OS list
- R5 hold: FULL (5/5)
- Windows-native viability: FAIL (1/5)

### Option B — Hybrid (W325-C runner-up weight 3.30)

Per `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-B-HYBRID.md` (10.9 KB):
- Preserve `defaultMode: bypassPermissions`
- Preserve `sandbox.enabled: false`
- ADD ~8 new permissions.deny entries (subset of Option C Patch C1)
- No sandbox-block changes
- R5 hold: PARTIAL (3/5) — sandbox inert; bypass preserved
- Workflow disruption: LOW-MED (4/5)

### Option C — Documented Exception 5-control Layered Defense (W325-C recommended weight 4.75)

Per `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md` (14.2 KB):
- Preserve `defaultMode: bypassPermissions` (UNCHANGED)
- Preserve `sandbox.enabled: false` (UNCHANGED)
- EXPAND `permissions.deny` from 17 → 32 entries via Patch C1 (15 new entries: `.codex/`, `.anthropic/`, browser-profile dirs, registry-hives, dangerous Bash predicates, shortener WebFetch denies)
- Author + operator-sign `STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` with 5 falsifiable-inverse claims (FI-1 through FI-5)
- Add `R5-W325-corollary` pointer to CLAUDE.md
- Wire Control 2 audit-log hook (CR-2 ≤2KB sanctioned-exception)
- Wire Control 5 quarterly drift-audit hook
- R5 hold: EQUIVALENT (via documented exception) (4/5)
- Workflow disruption: ZERO (5/5)

---

## §2. W327-D K-1 Path 2A vs Path 2B

### Path 2A — RECLASSIFY (preserves Z:-portable Windows-native + autonomous-loop velocity)

Per W327-D-1 §2 lines 42-47:
1. Rename W325-C "EQUIVALENT-HOLD" → "R5-WINDOWS-NATIVE-ACCEPTED-RISK"
2. Author + operator-sign acceptance record with 5 falsifiable-inverse claims
3. Wire signed-audit-trails plugin attest
4. CLAUDE.md R5-W325-corollary line
5. Wire Control 2 audit-logging PreToolUse hook

**Effort**: S (1-wave) for steps 1-4 + M (3-wave) for step 5 + K-6 chain
**Composite-lift**: +0.350 (4.036 → 4.386)
**Functionally equivalent to**: Option C + W325-C wire-up plan

### Path 2B — TIGHTEN (apply Anthropic-canonical settings; accept workflow disruption)

Per W327-D-1 §2 lines 50-55:
1. `permissions.defaultMode` → `default`
2. `permissions.disableBypassPermissionsMode: "disable"` (managed setting)
3. `sandbox.failIfUnavailable: true`
4. `sandbox.allowUnsandboxedCommands: false`
5. Remove `npx`, `uvx` from `sandbox.excludedCommands`
6. **PLAN WSL2/devcontainer/VM migration (3-5 wave prereq)**

**Effort**: L (7-wave)
**Composite-lift**: +0.700 (4.036 → 4.736)
**Functionally equivalent to**: Option A

---

## §3. Live config decision-table (5×6 match matrix)

Six diagnostic fields × five options. ✓ = matches; ✗ = diverges; ◐ = partial.

| Field | Live (HEAD `2c48b1e`) | Option A | Option B | Option C | Path 2A | Path 2B |
|---|---|---|---|---|---|---|
| `defaultMode` | `"default"` | `"default"` ✓ | `"bypassPermissions"` ✗ | `"bypassPermissions"` ✗ | `"bypassPermissions"` ✗ | `"default"` ✓ |
| `sandbox.enabled` | `false` | `true` ✗ | `false` ✓ | `false` ✓ | `false` ✓ | `true` ✗ |
| `sandbox.failIfUnavailable` | `false` | `true` ✗ | `false` ✓ | `false` ✓ | `false` ✓ | `true` ✗ |
| `sandbox.allowUnsandboxedCommands` | `true` | `false` ✗ | `true` ✓ | `true` ✓ | `true` ✓ | `false` ✗ |
| `permissions.deny` entries | 17 | (allowlist-driven) | ~25 (subset) ◐ | 32 (Patch C1) ✗ | 32 (Patch C1) ✗ | 17 ✓ |
| Operator-acceptance-record | absent | n/a | n/a | REQUIRED ✗ | REQUIRED ✗ | n/a |

**Match score per option**:
- Option A: 1/6 fields match (defaultMode only)
- Option B: 4/6 fields match (sandbox.* + deny-count subset) — but defaultMode DIVERGES
- Option C: 3/6 fields match (sandbox.* only) — but defaultMode + deny-count + acceptance-record DIVERGE
- Path 2A: 3/6 fields match (sandbox.*) — but defaultMode + deny-count + acceptance-record DIVERGE
- Path 2B: 2/6 fields match (defaultMode + deny-count) — but sandbox.* DIVERGES + WSL2 not planned

**Closest match**: **Path 2B step 1 only** — partial-Path-2B (1 of 5 settings.json deltas applied; 4 sandbox-side knobs unchanged; WSL2 prereq not initiated).

**No clean match**: no option/path is fully shipped. Live config is a **HYBRID**: defaultMode-flipped (Path-2B/Option-A flavor) + sandbox-block-unchanged (Option-C/Path-2A flavor) + deny-list-unexpanded (neither Option-C nor Path-2A) + acceptance-record-absent (neither Option-C nor Path-2A).

---

## §4. Why the hybrid emerged (provenance reconstruction)

Per W327-r3 commit `2c48b1e` message verbatim (lines 21-28):

> "MAJOR POSITIVE OBSERVATION (NOT introduced by W327; emerged via parallel-session 6b4b0b4 sweep): .claude/settings.json:defaultMode = 'default' (NOT 'bypassPermissions'). **R5 8-wave SHIP-BLOCKER appears RESOLVED at config level** by parallel-session W327-equivalent work."

**Key signal**: the defaultMode flip was **NOT a deliberate W327 Stream output**. W327 Stream D scope was DOC-ONLY (remediation map authorship); the flip was **swept in by a parallel session** during the stash/restore cycle that pre-commit framework triggered in commit `6b4b0b4`. This means:

- The flip lacks the design discipline of a deliberately-shipped option (no Patch C1 deny-list expansion, no acceptance-record, no Control 2 wire-up, no CLAUDE.md corollary)
- The flip arrived in a commit whose **stated purpose** was 2 doc narrowing edits (STREAM-C-SYNTHESIS.md L11 + W327-C-5-APPLIED-OR-DOC-ONLY.md L129)
- The commit message at `6b4b0b4` does NOT mention the defaultMode change at all (only `2c48b1e` retroactively flags it as observed)

This is a **scope-violation pattern**: parallel-session work landed in a closure commit whose narrative did not describe it. W327-r3 explicitly acknowledges the scope-violation (commit msg lines 6-10): "Commit 6b4b0b4 was NOT closure-scoped: parallel-session work swept in".

---

## §5. Option identification verdict

**Shipped configuration**: **partial-Path-2B (step 1 of 5)** + **partial-Path-2A-but-only-defaultMode-flipped-not-the-other-Path-2A-items**.

This is **NEITHER**:
- Option A (Full Sandbox) — sandbox.enabled still false
- Option B (Hybrid) — defaultMode no longer bypassPermissions
- Option C (Documented Exception) — defaultMode flip contradicts Option C's UNCHANGED requirement
- Path 2A (Reclassify) — defaultMode flip contradicts Path 2A's preserve-bypassPermissions posture
- Path 2B (Tighten) — only step 1 of 5 settings.json deltas applied; sandbox knobs unchanged; WSL2 not planned

The shipped state is a **non-canonical hybrid** that introduces inconsistency:
- defaultMode says "we want canonical Anthropic-default permission flow" (Path 2B/Option A signal)
- sandbox.enabled=false + allowUnsandboxedCommands=true says "we're keeping the Windows-native pragmatic stance" (Path 2A/Option C signal)
- permissions.deny is the W325-baseline 17 entries (neither Option C's 32-entry Patch C1 expansion nor Option A's allowlist-heavy posture)

---

## §6. Implications for R5 cardinal-rule hold

**Anthropic-canonical R5** requires BOTH:
1. **Permissions** layer (deny-default + allowlist + explicit denies)
2. **Sandboxing** layer (OS-level filesystem + network isolation)

| Layer | Live state | R5 status |
|---|---|---|
| Permissions | `defaultMode: default` ✓ + 11 narrow allow ◐ + 17 deny (W325-baseline) ◐ | ◐ PARTIAL-IMPROVED |
| Sandboxing | `enabled: false` + `allowUnsandboxedCommands: true` ✗ | ✗ STILL INERT |

**Conclusion**: R5 is **PARTIAL-HOLD UPGRADED**, NOT FULL-HOLD as the W327-r3 commit message claimed.

The commit-message language "R5 NOW FULL-HOLD post defaultMode='default'" is an **OVERCLAIM**. Anthropic-canonical R5 requires both layers; only the permissions layer has been (partially) upgraded. The sandbox layer remains structurally inert on Windows-native (per Anthropic's sandbox doc — this is a known platform constraint, not a fixable bug), and the explicit `allowUnsandboxedCommands: true` is a latent danger for any future OS-migration.

---

## §7. Recommendation for W328+

Three viable forward paths (operator decision required):

### Path α — Complete Path 2B (canonical Anthropic R5 hold)

1. Apply steps 2-5 of W327-D-1 §2 Path 2B:
   - `permissions.disableBypassPermissionsMode: "disable"` (managed setting)
   - `sandbox.failIfUnavailable: true`
   - `sandbox.allowUnsandboxedCommands: false`
   - Remove `npx`, `uvx` from `sandbox.excludedCommands`
2. PLAN WSL2 migration (3-5 wave effort)
3. Expand `permissions.allow` by ~20 common-workflow Bash predicates (`Bash(git *)`, `Bash(ls *)`, `Bash(jq *)`, `Bash(rg *)`, `Bash(node *)`, etc.) to avoid prompt-flood
4. R5 hold: FULL post-WSL2-migration; PARTIAL-IMPROVED until then

**Effort**: 7-wave (WSL2 prereq) · **Composite-lift**: +0.700 (4.036 → 4.736)

### Path β — Complete Option C (documented exception with current Windows-native stance)

This requires **reverting the defaultMode flip** to preserve Option C's UNCHANGED defaultMode spec, then:
1. Apply Patch C1 deny-expansion (15 entries to `.claude/settings.json` permissions.deny)
2. Author + operator-sign `STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` with 5 FI-1-through-FI-5 claims
3. Add CLAUDE.md R5-W325-corollary pointer
4. Wire Control 2 audit-log hook (CR-2 ≤2KB sanctioned-exception)
5. Wire Control 5 quarterly drift-audit hook

**Effort**: 1.5-wave · **Composite-lift**: +0.350 (4.036 → 4.386)

### Path γ — Embrace the hybrid (document the W327-r3 emergent state as a NEW option-D)

1. Author `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-D-PARTIAL-HYBRID.md` codifying:
   - defaultMode: default (Path-2B step 1)
   - sandbox: unchanged (Option-C posture)
   - permissions.deny: still apply Patch C1 expansion (sca-v9 §6 Control 1 anchor)
   - operator-acceptance-record: still author with adapted falsifiable-inverse claims
   - Control 2 + 5 hooks: still wire
2. Re-run sca-v11 self-eval with Option-D as the codified state
3. R5 hold: PARTIAL-IMPROVED via Option-D documented hybrid

**Effort**: 2-wave · **Composite-lift**: +0.35 to +0.45 (4.036 → 4.39-4.49) — same as Option C lift since the additional defaultMode signal is bonus

---

## §8. Cite-anchors

- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-A-FULL-SANDBOX.md` (Option A spec)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-B-HYBRID.md` (Option B spec)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:35-91` (Option C Patch C1 + sandbox UNCHANGED + defaultMode UNCHANGED specs)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:25` (weighted score Option A=2.60, Option B=3.30, Option C=4.75)
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:42-55` (Path 2A vs Path 2B specs)
- `git log -1 --format=%B 2c48b1e` (W327-r3 commit message verbatim flagging emergent state)
- `git log -1 --format=%B 6b4b0b4` (W327-r2-amend commit message — does NOT mention defaultMode)
- `git diff 569080a 2c48b1e -- .claude/settings.json` (the actual flip diff)
- `https://code.claude.com/docs/en/sandboxing` (macOS/Linux/WSL2 supported; Windows-native NOT supported)
- `https://code.claude.com/docs/en/settings` (permissions + sandbox schema)
