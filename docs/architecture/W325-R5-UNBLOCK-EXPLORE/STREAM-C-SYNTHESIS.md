# W325 Stream C — SYNTHESIS

**Wave**: W325 · **Stream**: C · **Type**: DOC-ONLY exploration · **Status**: SHIP-EXPLORE (3 options drafted + recommendation issued; operator-decision pending)
**Strict file ownership**: `docs/architecture/W325-R5-UNBLOCK-EXPLORE/*` only — no settings.json or other file mutations performed

---

## 1. Wave objective + outcome

**Objective** (from W325 Stream C tasking):
1. Read canonical references (Anthropic CC sandbox doc + CCBP `claude-settings.md` + sca-v9 §6 + W316-S1 + W314-E)
2. Draft 3 operator-decision options (NOT applied):
   - Option A: Fully enable sandbox + drop bypassPermissions
   - Option B: Hybrid (sandbox + per-permission-allowlist preserved)
   - Option C: Documented exception (sca-v9 §6 5-control as EQUIVALENT)
3. For each: paste-ready patch + smoke-test + rollback + risk-class + cite-anchor
4. Recommend best option + rationale
5. Write 6 output files

**Outcome**: ✓ ALL 5 sub-objectives met. 6 output files written under `docs/architecture/W325-R5-UNBLOCK-EXPLORE/`. Recommendation = **Option C** (layered-defense; documented exception). Operator-decision pending.

## 2. Output file inventory

| File | LOC | Purpose |
|------|-----|---------|
| `STREAM-C-R5-CONTEXT.md` | 124 | 7-wave SHIP-BLOCKER + sca-v9 §6 5-control + Anthropic CC doc inventory + Windows-native structural-constraint analysis |
| `STREAM-C-OPTION-A-FULL-SANDBOX.md` | 195 | Full-sandbox patches (Patch A1 permissions, Patch A2 sandbox); HIGH risk; cardinal R5 fully holds on supported OS |
| `STREAM-C-OPTION-B-HYBRID.md` | 178 | Hybrid patches (preserve bypassPermissions + flip sandbox.enabled); MED risk; partial R5 hold |
| `STREAM-C-OPTION-C-LAYERED-DEFENSE.md` | 196 | Layered-defense patches (expand permissions.deny only); LOW risk; equivalent-hold via documented exception |
| `STREAM-C-RECOMMENDATION.md` | 144 | Weighted decision matrix (4.85 / 3.30 / 2.60); operator-facing decision tree; W326 follow-up plan |
| `STREAM-C-SYNTHESIS.md` | this file | Wave-closure synthesis + operator-AI carry-forward |

**Total LOC**: ~1000+ across 6 docs.

## 3. Key findings (Stream C inquiry)

### 3.1 Windows-native structural-constraint is the dispositive fact
Per Anthropic CC sandbox doc, sandboxing is supported on **macOS Seatbelt + Linux bubblewrap + WSL2**. Windows native is **NOT in the list**. The CCBP `claude-settings.md` sandbox-block fields (`bwrapPath` / `socatPath`) are Linux/WSL2-specific.

This runtime is Windows 11 Pro native with Z:-portable Git-Bash (CLAUDE.local.md L4 hard constraint). **Options A + B both rely on `sandbox.enabled: true` doing useful work, but that flip is a paper-only change on Windows native** — either silently degrades to unsandboxed bash (with `failIfUnavailable: false`) or BLOCKS CC startup (with `failIfUnavailable: true`).

### 3.2 sca-v9 §6 5-control codification provides the equivalence claim
W324 P1 codified the 5-control layered-defense at `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:289-313` with 3-org-distinct anchors per control (NIST 800-53 + OWASP + Microsoft/Google/CIS/CNCF/SLSA/freedesktop.org/gitleaks). The codification is rubric-side; Option C operationalizes it via:
- Patch C1: 15-entry expansion of `permissions.deny` (browser-profiles, registry-hives, `.codex/`, `.anthropic/`, dangerous Bash predicates)
- Operator-acceptance-record (separate file, signed)
- W326 wire-up of Controls 2 (audit-log) + 5 (drift-audit) — currently partial

### 3.3 Falsifiable-inverse signature is the load-bearing primitive
Option C's claim that "5-control layered-defense is EQUIVALENT to OS-sandboxing" is only credible because it carries a falsifiable-inverse signature: 5 independently-verifiable claims (FI-1 through FI-5 per STREAM-C-RECOMMENDATION.md §7) that, if any one fails on quarterly audit, INVALIDATE the equivalence record and revert R5 to partial-hold. This is the in-toto / SLSA-style attestation pattern + the sca-v9 D-EMP empirical-viability discipline applied to cardinal-rule deviation.

### 3.4 The "Hybrid" Option B is a lukewarm middle
Option B combines the configuration complexity of two security layers (permissions + sandbox) but the security improvement of neither on Windows native (sandbox inert + bypassPermissions preserves the permission-side gap). Weighted score 3.30/5 falls below the recommended Option C's 4.85 by 1.55 (≥1.0 = clear-winner margin).

## 4. Cardinal-rule + invariant status

| Item | Status post-Stream C |
|------|---------------------|
| **R1** Install primitives only from trusted plugins/skills/agents | ✓ HOLDS (no installs performed) |
| **R2** Hooks may only be upstream-plugin OR direct upstream-CLI | ✓ HOLDS (no hook changes) |
| **R3** Subagents = installed upstream OR documented subagent system | ✓ HOLDS |
| **R4** Project behavior in CLAUDE.md + settings.json; no ad-hoc rules | ✓ HOLDS (no CLAUDE.md / settings.json edits this stream) |
| **R5** Safety boundaries via CC permissions + sandboxing | ◐ **STILL PARTIAL-HOLD** post-W325 (operator-decision pending; Stream C is exploration) |
| **`self_invented_count: 0`** | ✓ HOLDS (Stream C creates 6 docs, 0 hooks, 0 rules, 0 MCP changes, 0 skill changes) |
| **CLAUDE.md body ≤50 LOC** | ✓ HOLDS (no edits) |
| **settings.json ≤15,360 byte cap** | ✓ HOLDS (no edits) |
| **Strict file ownership** (docs/architecture/W325-R5-UNBLOCK-EXPLORE/*) | ✓ HOLDS |

## 5. Operator-AI carry-forward (Stream C → W326)

| AI | Description | Cite-anchor | Priority |
|----|-------------|-------------|----------|
| **W325-C-1** | Operator decides Option A / B / C (recommend C) | STREAM-C-RECOMMENDATION.md §2 + §6 | **P0** (gates all subsequent R5 work) |
| **W325-C-2** | If Option C: sign STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md (DRAFT in STREAM-C-OPTION-C §3 Patch C4) | sca-v9 §6 falsifiable-inverse | P1 (post-decision) |
| **W325-C-3** | If Option C: apply Patch C1 (15-entry permissions.deny expansion) to settings.json | STREAM-C-OPTION-C §3 Patch C1 | P1 |
| **W325-C-4** | If Option C: add `R5-W325-corollary` line to CLAUDE.md pointing to operator-acceptance-record | STREAM-C-OPTION-C §3 Patch C4 | P1 (must fit ≤50 LOC body) |
| **W325-C-5** | If Option C: wire Control 2 audit-logging PreToolUse hook (CR-2 sanctioned-exception ≤2KB; SHA-256 hash chain → `.claude/state/audit/<YYYY-MM-DD>.jsonl`) | sca-v9 §6 Control 2 + CR-2 exception class | P2 (W326 Stream A) |
| **W325-C-6** | If Option C: wire Control 5 quarterly drift-audit + capability-registry probe | W323 STREAM-4 §4 + sca-v9 §6 Control 5 | P2 (W327) |
| **W325-C-7** | If Option A: stage WSL2 migration prereq (3-5 wave path) | STREAM-C-OPTION-A §6+§8 | P3 (only if A selected) |
| **W325-C-8** | If Option B: characterize current Bash workflows hitting new deny rules; document trial-and-error tuning | STREAM-C-OPTION-B §5 | P3 (only if B selected) |
| **W325-C-9** | Cite-refresh Anthropic CC sandbox-doc + settings-doc SHAs quarterly (drift-audit) | sca-v9 §6 Control 5 + cite-anchor-freshness | P3 (recurring) |
| **W325-C-10** | Re-attest operator-acceptance-record every wave (if Option C selected); invalidate + escalate if FI-1..FI-5 fail | STREAM-C-RECOMMENDATION.md §7 | P3 (recurring) |

## 6. Parallel-dispatch metrics (W269 / W312-D compliance)

This stream was dispatched as part of W325 Stream C alongside other W325 streams (operator's parallel-dispatch context). Per W269 mandate + W312-D measurement, parallel_ratio is computed across the wave's Agent-call topology, not per-stream. Stream C records:
- **Stream C's intrinsic LLM calls within this thread**: 6 tool calls (1 WebFetch attempt + 2 ctx_fetch_and_index/search batches + 1 Read + 2 Grep + 1 Glob + 4 Write) — all serial because they have data dependencies (must read context before writing options; must read each option before recommendation; must read recommendation before synthesis).
- **No parallel fan-out within Stream C** is appropriate per `superpowers:dispatching-parallel-agents` since the 6 output docs have a strict sequential dependency chain.
- Stream C's parent dispatch counts toward the W325 wave parallel_ratio metric (computed by parent agent).

## 7. Cost + budget

- WebFetch attempts: 1 (blocked by context-mode preference) → re-routed to `ctx_fetch_and_index` (2 URLs in 1 call, 102.7 KB indexed, 23 sections)
- ctx_search calls: 4 (within the 8-per-window soft limit)
- Native Read/Write/Edit: ~10 calls
- Estimated context-mode FTS5-indexed-content footprint after stream-completion: ~150 KB indexed, ~5 KB returned to context

## 8. Closure assertion

**Stream C deliverable**: ✓ SHIPPED (6 docs, ~1000+ LOC, operator-decision-pending recommendation issued).

**R5 status post-W325 Stream C**: ◐ STILL PARTIAL-HOLD — Stream C is exploration only. Operator-decision required to move R5 to either:
- **FULL HOLD** via Option A (Windows-native blocking or WSL2 migration)
- **PARTIAL HOLD** via Option B (lukewarm middle)
- **EQUIVALENT-HOLD** via Option C (recommended; documented exception with cite-anchor depth + falsifiable-inverse)

**No destructive actions taken. No files outside `docs/architecture/W325-R5-UNBLOCK-EXPLORE/` modified. Cardinal rules R1-R5 + `self_invented_count: 0` all hold.**
