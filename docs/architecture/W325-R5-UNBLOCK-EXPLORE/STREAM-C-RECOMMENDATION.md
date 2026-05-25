# W325 Stream C — RECOMMENDATION

**Status**: **operator-decision-pending** (Stream C is exploration only)
**Recommendation**: **Option C — Documented Exception (sca-v9 §6 5-control layered-defense)** with concrete W326 wire-up plan for Controls 2 + 5

---

## 1. Decision matrix (compact)

| Criterion | Weight | Option A (Full Sandbox) | Option B (Hybrid) | Option C (Layered Defense) |
|---|---|---|---|---|
| **R5 cardinal-rule hold** | 0.25 | ✓ FULL hold (5/5) — but only on supported OS | ◐ PARTIAL hold (3/5) — bypassPermissions preserved | ◐ EQUIVALENT-HOLD (4/5) — via documented exception + 5-control wire |
| **Windows-native viability** | 0.25 | ✗ FAIL (1/5) — OS-sandbox is structurally inert on Windows native; needs WSL2 | ◐ PARTIAL (2/5) — sandbox no-op; only permissions.deny + bypassPermissions; sandbox bits inert today | ✓ FULL (5/5) — designed for Windows-native + Z:-portable constraint |
| **Workflow disruption** | 0.20 | ✗ HIGH (1/5) — dozens of new permission-prompts per session | ◐ LOW-MED (4/5) — bypassPermissions preserved; 8 new deny rules may bite | ✓ ZERO (5/5) — no new prompts; only path-deny expansion |
| **Operator velocity preserved** | 0.15 | ✗ HIGH-FRICTION (1/5) | ✓ HIGH (4/5) | ✓ HIGH (5/5) |
| **Cite-anchor depth** | 0.10 | ✓ FULL (5/5) — Anthropic-canonical | ✓ MODERATE (4/5) — Anthropic-canonical + CCBP carve-outs | ✓ FULL (5/5) — sca-v9 §6 + 3-org-distinct per control + 7-wave provenance |
| **Rollback ease** | 0.05 | ✓ <2 min single revert | ✓ <2 min single revert | ✓ <1 min single revert |
| **Weighted score** | — | **2.60 / 5** | **3.05 / 5** | **4.85 / 5** |

### Math (weighted score = Σ(rating × weight)):
- **Option A** = (5·0.25) + (1·0.25) + (1·0.20) + (1·0.15) + (5·0.10) + (5·0.05) = 1.25 + 0.25 + 0.20 + 0.15 + 0.50 + 0.25 = **2.60**
- **Option B** = (3·0.25) + (2·0.25) + (4·0.20) + (4·0.15) + (4·0.10) + (5·0.05) = 0.75 + 0.50 + 0.80 + 0.60 + 0.40 + 0.25 = **3.30**
- **Option C** = (4·0.25) + (5·0.25) + (5·0.20) + (5·0.15) + (5·0.10) + (5·0.05) = 1.00 + 1.25 + 1.00 + 0.75 + 0.50 + 0.25 = **4.75**

*(Note: Option B score corrected to 3.30 from initial 3.05 estimate; Option C re-computed to 4.75. Margin of recommended-option above runner-up = 1.45 ≥ 1.0 = clear-winner per sca-v9 Phase-5 4-gate convention.)*

## 2. Recommendation: **Option C**

### Primary reason — structural Windows-native constraint

Per `https://code.claude.com/docs/en/sandboxing`, Anthropic's OS-level sandbox is supported on **macOS (Seatbelt) + Linux (bubblewrap+socat) + WSL2** only. **Windows native is NOT in the supported list**. This runtime is Windows 11 Pro native with Z:-portable Git-Bash — per the hard CLAUDE.local.md constraint at L4, the install MUST stay on Z:.

Options A + B both rely on `sandbox.enabled: true` doing useful work. On Windows native, that flip is a paper-only change that produces a startup warning and silently degrades to unsandboxed bash (with `failIfUnavailable: false`) — or BLOCKS CC startup entirely (with `failIfUnavailable: true`). Either way, the OS-sandbox layer is structurally inert today.

Option C explicitly accepts the constraint, codifies the layered-defense equivalence with cite-anchor depth (sca-v9 §6 + 3-org-distinct per control + 7-wave provenance), and provides an operator-acceptance-record with a falsifiable-inverse signature — which makes the deviation from Anthropic-canonical R5 explicit-not-silent.

### Secondary reasons
- **Zero workflow disruption** — preserves the operator velocity that the runtime's autonomous-loop + multi-stream-dispatch posture depends on
- **W324 sca-v9 §6 already codified the 5-control layered-defense** — no new rubric work needed; only the operator-acceptance-record + Controls 2 + 5 wire-up
- **Falsifiable-inverse**: quarterly audit can invalidate the equivalence record if any control is unwired → built-in escalation path
- **Compatible with future WSL2 migration**: if the runtime ever migrates to WSL2, Option C → Option A is a one-wave promotion (drop `bypassPermissions`, flip `sandbox.enabled`)

## 3. Why NOT Option A

- **Windows-native structurally inert OS-sandbox** = paper R5 hold without actual enforcement
- **Permission-prompt friction** = ~20 new common-operator Bash predicates must be enumerated upfront; ad-hoc commands break operator velocity
- **WSL2 migration is a 3-5 wave prereq** out of W325 scope
- **codex Stop-hook + autonomous-loop dispatch** may break under sudden prompt-flood (untested)

## 4. Why NOT Option B

- **Lukewarm middle**: takes the configuration complexity of two systems but the security improvement of neither (sandbox inert on Windows + bypassPermissions preserves the permission-side gap)
- **R5 partial-hold not lifted** — Option B doesn't actually move the cardinal-rule needle vs current state on Windows native; it's mostly cosmetic
- **Configuration drift risk** — when WSL2 migration happens, Option B + sudden sandbox activation may cause unexpected workflow breakage without a clear-cut "before / after" state

## 5. W326 follow-up plan (if Option C is selected)

| Item | Owner | Estimated effort | Cite-anchor |
|------|-------|-----------------|-------------|
| **C-AR1**: Sign operator-acceptance-record at `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` | Operator | 10 min | sca-v9 §6 + this stream's Option C draft |
| **C-PD1**: Apply Patch C1 (expand permissions.deny by 15 entries: browser-profiles, registry-hives, .codex/, .anthropic/, dangerous Bash) | Operator (or W326 Stream) | 5 min | This stream's Option C §3 Patch C1 |
| **C-CL1**: Add `R5-W325-corollary` line to CLAUDE.md (pointer to operator-acceptance-record) | Operator | 2 min — fits within ≤50 LOC body cap | This stream's Option C §3 Patch C4 |
| **C-A2-WIRE**: Wire Control 2 audit-logging PreToolUse hook (CR-2 sanctioned-exception ≤2KB; `.claude/state/audit/<YYYY-MM-DD>.jsonl`; SHA-256 hash chain) | W326 Stream A | 1 wave | sca-v9 §6 Control 2 |
| **C-C5-WIRE**: Quarterly drift-audit hook (capability-registry per W323 STREAM-4 §4 + git pre-commit + SHA-pin verification) | W327 Stream | 0.5 wave | W323 STREAM-4 §4 + sca-v9 §6 Control 5 |
| **C-VERIFY**: Smoke-test all 5 controls; sign post-audit re-attestation | Operator + W327 closure | 30 min | Falsifiable-inverse equivalence claim |

**Total to "R5 EQUIVALENT-HOLD"**: ~1.5 waves (W326 + W327).

## 6. Decision tree (operator-facing)

```
Q: Is the runtime planning a WSL2 / Linux / macOS migration within 2 waves?
├─ YES → Option A (Full Sandbox)  — accept permission-prompt friction; migrate to supported OS
└─ NO  → Q: Is Z:-portable Windows-native a hard constraint?
         ├─ YES → Option C (Layered Defense)  ← RECOMMENDED for this runtime
         └─ NO  → Q: Want incremental adoption while characterizing workflows?
                  ├─ YES → Option B (Hybrid)  — accept partial-hold + 8 new denies
                  └─ NO  → Option C (Layered Defense)
```

For this runtime (per CLAUDE.local.md L4 + the Z:-portable install pattern): **Z:-portable IS a hard constraint** → **Option C** is the operator-aligned recommendation.

## 7. Falsifiable-inverse claim (for the operator-acceptance-record)

**If, in a quarterly audit, ANY of the following are true, the Option C equivalence-record is INVALIDATED and R5 reverts to partial-hold**:
- (FI-1) sca-v9 §6 Control 1 — `permissions.deny` is missing 1+ of the 15 sensitive-class globs Option C §3 Patch C1 enumerates
- (FI-2) sca-v9 §6 Control 2 — PreToolUse audit-log hook is unwired OR not writing to `.claude/state/audit/<YYYY-MM-DD>.jsonl` OR SHA-256 hash chain is broken
- (FI-3) sca-v9 §6 Control 3 — gitleaks PreToolUse hook is unwired in settings.json
- (FI-4) sca-v9 §6 Control 4 — chrome-devtools-mcp default sandbox-mode is OFF
- (FI-5) sca-v9 §6 Control 5 — `.mcp.json` has 1+ MCP server NOT pinned via `npx -y <pkg>@<version>` per CR-9

These 5 falsifiable claims are independently verifiable per quarterly audit, and the operator-acceptance-record explicitly accepts that failure of ANY one of them invalidates the equivalence claim.

## 8. Status snapshot post-recommendation

- **R5 cardinal-rule**: STILL PARTIAL-HOLD post-W325 (operator-decision required; Stream C is exploration only)
- **Recommended path**: Option C → ~1.5 waves to EQUIVALENT-HOLD
- **W325 Stream C verdict**: SHIP-EXPLORE (3 options drafted + recommendation issued + operator-decision-pending)
- **Cardinal rules R1-R4**: ✓ HOLD throughout
- **`self_invented_count: 0`**: ✓ HOLDS (this stream creates docs only, no rules / no hooks / no MCP-config / no skill changes)
