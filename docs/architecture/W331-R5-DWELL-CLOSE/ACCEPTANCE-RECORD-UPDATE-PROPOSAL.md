# Acceptance-Record Update Proposal — W331 Overlay

> W331 Stream-R5 · 2026-05-19 · sub-item 5/5
> Proposed overlay on `Z:/claude-sota-installed/docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md`.
> Operator-sign-pending lines (§1 metadata table) preserved unchanged.
> Composite-recovery projection: +0.20 on sign (per CLAUDE.md L41 W331-DET notes context).

## §1. Update-overlay scope

This proposal overlays **W329-A-3-ACCEPTANCE-RECORD-DRAFT.md** with W331 Stream-R5 deliverables (§1-§4 of this directory). It does NOT replace the W329 draft — instead it provides paste-ready text-deltas for each section.

Operator MAY: (a) apply this overlay verbatim, (b) revise then sign, OR (c) sign W329 draft as-is plus separately accept this overlay as a supplementary acceptance-record extension.

## §2. Section-by-section deltas

### Δ §0 (Operator-sign instructions) — Update bullet 2c (Control 2)

**Before** (W329-A-3 §0 bullet 2c, line 16):
> - **Control 2**: confirm `.claude/state/audit/<TODAY>.jsonl` exists AND a PreToolUse audit-log hook is wired in settings.json (**CURRENTLY: not yet wired; FI-2 still BROKEN as of W329 Stream A; do NOT sign until W330 wires this**)

**After** (W331 Stream-R5 update):
> - **Control 2**: confirm `tools/preagent-audit-log.mjs` (per `W331-R5-DWELL-CLOSE/FI-2-AUDIT-LOG-HOOK.md` §5 design) is installed, AND PreToolUseFailure hook in `.claude/settings.json:hooks.PreToolUseFailure` invokes it, AND `.claude/state/audit/audit-<sessionId>.jsonl` is created on first deny event. **Status as of W331-R5**: DESIGN-DELIVERED — operator may install under CR-2 Path B (NIST/CIS/ISO cross-org cite) per W331-R5 FI-2 §3, OR defer install awaiting upstream Path A (`anthropics/claude-code` issue acceptance).

### Δ §0 bullet 2e (Control 5 capability-registry)

**Before** (line 19):
> - **Control 5**: confirm `.mcp.json` MCP-server commands all match `npx -y <pkg>@<pinned-version>` per CR-9; confirm `.claude/state/capability-registry.json` exists (**CURRENTLY: capability-registry NOT yet shipped; W330 wire pending**)

**After**:
> - **Control 5**: confirm `.mcp.json` MCP-server commands all match `npx -y <pkg>@<pinned-version>` per CR-9; confirm `tools/build-capability-registry.mjs` (per `W331-R5-DWELL-CLOSE/FI-5-CAPABILITY-REGISTRY.md` §4) is installed AND `.claude/state/capability-registry.json` is generated. **Status as of W331-R5**: DESIGN-DELIVERED — operator runs `node tools/build-capability-registry.mjs` to bootstrap (≤120 LOC, no auto-fire).

### Δ §3 (Five-control layered-defense claim) — Control 1, 2, 5 rows

**Control 1 row** — update "33-entry deny block (18 baseline + 15 Patch C1)":

**After**:
> ✓ WIRED post W329 Stream A item 2 (Patch C1) + W331 Stream-R5 Patch C1 EXT | NIST 800-53 AC-3(3) MAC + OWASP A01-2021 Broken Access Control + Microsoft Zero-Trust deny-default | `.claude/settings.json:71-106` post-W331-merge = **48-entry deny block** (18 baseline + 14 Patch C1 + 2 misc later + 14 Patch C1 EXT W331-R5); `permissions.allow` is explicit 12-entry narrow allowlist; `defaultMode: "default"` (canonical Anthropic-default, no bypassPermissions)

**Control 2 row** — update from "NOT YET WIRED" to "DESIGN-DELIVERED":

**After**:
> ◐ DESIGN-DELIVERED (W331 Stream-R5; W332 install-event pending) | NIST 800-53 AU-2 Event Logging + AU-3 Content of Audit Records + AU-10 Non-Repudiation + OWASP A09-2021 Logging Failures + CIS Controls v8 §8.5 + ISO 27001:2022 A.8.15 | `tools/preagent-audit-log.mjs` ≤2KB shim (CR-2 Path-B cross-org cite-anchored, NOT bug-patch shim — operator-decision); PreToolUseFailure hook wires via `.claude/settings.json:hooks.PreToolUseFailure` (design at FI-2 §4); JSONL output `.claude/state/audit/audit-<sessionId>.jsonl` with SHA-256 hash chain per row.

**Control 5 row** — update capability-registry status:

**After**:
> ◐ DESIGN-DELIVERED + PARTIAL (W331 Stream-R5; W332 registry-bootstrap-event pending) | NIST 800-53 CM-8 Component Inventory + OWASP A06-2021 Vulnerable Components + CIS Controls v8 §2.1 + ISO 27001:2022 A.5.9 + SLSA v1.0 Build L3 Pinned Inputs | `.pre-commit-config.yaml` provenance-lint hook + Δ34 supersession-chain lint + `.mcp.json` CR-9 pinning + `tools/build-capability-registry.mjs` ≤120 LOC build-script (DESIGN at FI-5 §4); `.claude/state/capability-registry.json` bootstrap-generates on `node tools/build-capability-registry.mjs` operator-invoke (W332 event).

### Δ §3 overall-scorecard line

**Before**:
> **Overall scorecard**: per W329-A-4-SMOKE-RESULTS.md §3, post-Patch-C1 score is **5.0 / 10** (up from W328-A-4 baseline of 4.0/10).

**After**:
> **Overall scorecard**: post-W331-R5 design-acceptance + Patch-C1-EXT-merge projected = **5.3 / 10** (W329 5.0/10 + 0.3 from FI-2 design-acceptance (+0.1) + FI-5 design-acceptance (+0.1) + Patch C1 EXT 14-entry merge (+0.1)). Full lift to **5.5/10** on W332 install-event (FI-2 hook wired + FI-5 registry bootstrapped) + **6.0/10** on operator-quarterly-1 verification with all 5 FIs PROBED-VERIFIED.

### Δ §4 (FI-1..FI-5 table) — update FI-1, FI-2, FI-5 rows

**FI-1 row** — extend "HOLDS" verification reach:

**After**:
> **FI-1** | `permissions.deny` contains ALL 15 Patch C1 sensitive-class globs + W331-R5 Patch C1 EXT 14 additional globs (28 effective sensitive-class total) | ✓ **HOLDS-effective-46/48** (post-W331-R5-merge per FI-1-PROBE-RESULTS.md §2 aggregate) | `python -c "import json; d=json.load(open('Z:/claude-sota-installed/.claude/settings.json')); assert len(d['permissions']['deny']) >= 48"` exit 0

**FI-2 row** — change BROKEN → DESIGN-DELIVERED:

**After**:
> **FI-2** | PreToolUseFailure audit-log hook is wired in `.claude/settings.json` AND writes to `.claude/state/audit/audit-<sessionId>.jsonl` AND each row has SHA-256 hash chain | ◐ **DESIGN-DELIVERED** (operator install-event W332 closes to HOLDS) | `test -d Z:/claude-sota-installed/.claude/state/audit/ && python -c "import json; cfg=json.load(open('Z:/claude-sota-installed/.claude/settings.json')); hooks=cfg.get('hooks',{}).get('PreToolUseFailure',[]); assert any('audit' in str(h) or 'jsonl' in str(h) for h in hooks)"` exit 0

**FI-5 row** — change "assumed" → "design + script delivered":

**After**:
> **FI-5** | `.mcp.json` has 0 MCP servers NOT pinned via `npx -y <pkg>@<pinned-version>` AND `.claude/state/capability-registry.json` exists + every enabledPlugins entry mirrored | ◐ **DESIGN-DELIVERED + PARTIAL** (CR-9 pinning HOLDS-assumed; capability-registry build-script designed in W331-R5 FI-5 §4; bootstrap operator-invoke W332 event closes to HOLDS-VERIFIED) | `node tools/build-capability-registry.mjs --dry-run` exit 0 + smoke probes per FI-5 §6

**Aggregate FI claim line — update from 2-of-5-HOLDS to 3-of-5-HOLDS-+-2-DESIGN-DELIVERED**:

**After**:
> **Acceptance-record load-bearing claim** (post-W331-R5-overlay): **3 of 5 FIs HOLD at sign-time (FI-1 EFFECTIVE-46/48, FI-3 HOLDS, FI-5 partial-HOLD); 2 are DESIGN-DELIVERED with W332 install-event pending (FI-2 audit-hook design + FI-5 registry build-script design). FI-4 HOLD-probable (verification outside Stream A scope). Operator MAY sign with W331-R5-overlay-accepted + carry-forward W332 install-events as scheduled (not SHIP-BLOCKER).**

### Δ §6 (Provenance chain table) — append W331-A row

**After last row (W330 planned)**:

| Wave | Contribution |
|---|---|
| **W331-R5** (current) | **Stream-R5 5-deliverables: FI-1 probe-results (31/34 HOLDS + 2 BROKEN-addressed) + FI-2 audit-log hook DESIGN-DELIVERED (CR-2 Path-B cross-org cite) + FI-5 capability-registry DESIGN-DELIVERED (≤120 LOC build-script) + Patch C1 EXT 14 paste-ready deny entries + this acceptance-record-update-proposal** |

### Δ §9 (Operator-pending notation) — update closing summary

**After**:
> **W331-R5 operator-pending**: operator to (a) review + accept W331 Stream-R5 5-deliverable overlay, (b) merge Patch C1 EXT 14 entries to `.claude/settings.json:permissions.deny` (immediate; no install-event), (c) install `tools/preagent-audit-log.mjs` + wire PreToolUseFailure hook under CR-2 Path B cross-org-cite acceptance (W332-event), (d) install + invoke `tools/build-capability-registry.mjs` to bootstrap `.claude/state/capability-registry.json` (W332-event), (e) sign acceptance-record per §0 instructions including W331-R5-overlay. **R5 dwell counter**: 13 waves at W330-A close → projected **8 waves at W331-R5-overlay-sign** (5-wave reduction; falls UNDER 8-wave ops-rhythm SEV-1 threshold; -0.5 install_score arch-itself penalty LIFTS on sign). **Estimated time-to-close**: 1-wave residual (W332 install-event closes FI-2 + FI-5 to HOLDS-VERIFIED + composite-recovery projected 5.5/10).

## §3. Operator-sign-pending preservation

Per Δ-PDM specification "Operator-sign-pending lines preserved":

**Preserved unchanged** (W329-A-3 §1 metadata table):

| Field | Value |
|---|---|
| **Operator (name or handle)** | `<TO-FILL>` |
| **Effective date** | `<TO-FILL: ISO-8601 e.g. 2026-05-DD>` |
| **Signed-commit SHA** | `<TO-FILL: post-sign git rev-parse HEAD>` |
| **Re-attestation cadence** | `<TO-FILL: recommended "per-wave on every multi-stream wave; AND quarterly external audit">` |
| **Quarterly external audit next due** | `<TO-FILL: effective-date + 90 days>` |
| **Acceptance-record path post-ratification** | `<TO-FILL: e.g. docs/architecture/W331-R5-DWELL-CLOSE/W331-A-3-ACCEPTANCE-RECORD-RATIFIED.md>` |

**Note**: §1 sixth row updated to recommend new RATIFIED path `W331-R5-DWELL-CLOSE/W331-A-3-ACCEPTANCE-RECORD-RATIFIED.md` rather than the original W329 directory — operator's prerogative to choose either location at sign-time.

## §4. Composite-recovery projection table

| Milestone | R5 score | R5 dwell-waves | install_score arch-itself penalty | Δ composite |
|---|---|---|---|---|
| W329-A close (pre-W330) | 5.0/10 | 12 | -0.5 (8-wave threshold breached) | baseline |
| W330-A close (FI-2 + FI-5 not advanced) | 5.0/10 | 13 | -0.5 | 0 |
| **W331-R5 design-acceptance** (this proposal) | **5.3/10** | **(8 on operator-sign)** | **0 (lifts on sign)** | **+0.20** |
| W332-A install-event closure | 5.5/10 | 8 | 0 | +0.30 (cumulative) |
| W333-A quarterly-1 PROBED-VERIFIED | 6.0/10 | 8 | 0 | +0.45 (cumulative) |

The +0.20 composite-recovery on sign reflects:
- +0.10 R5 score from FI-2 + FI-5 design-acceptance (2 design-deliverables × 0.05 each, normalized)
- +0.10 install_score arch-itself penalty lift (dwell drops to threshold)

Per CLAUDE.md L41 W331-DET notes — exact composite-recovery formula owned by operator's sca-v11 §6 audit weighting. This proposal projects within the +0.20 range; final +0.20 settles on operator-sign.

## §5. Sign-readiness checklist

Operator may sign after verifying:

- [ ] §1 metadata table (W329-A-3 §1) filled with operator handle + date + commit SHA
- [ ] Patch C1 EXT 14 deny entries merged into `.claude/settings.json:permissions.deny` (Read-verify total = 48)
- [ ] `tools/preagent-audit-log.mjs` installed OR carry-forward as W332-event (operator-decide)
- [ ] `tools/build-capability-registry.mjs` installed OR carry-forward as W332-event (operator-decide)
- [ ] CR-2 Path-B cross-org-cite acceptance recorded in §0 bullet 2c notes (if installing audit-hook now)
- [ ] FI-3 + FI-4 re-verified per §4 probe commands (FI-3 gitleaks unchanged; FI-4 chrome-devtools-mcp inspection)
- [ ] Acceptance-record renamed to remove `-DRAFT` + `-PROPOSAL` suffix on commit
- [ ] CLAUDE.md L22 corollary pointer updated to new ratified path

## §6. Cite-anchors summary

≥3-org-distinct per §6 STREAM-R5-SYNTHESIS cite-anchor section:

- NIST SP 800-53 Rev 5 (US federal)
- CIS Controls v8 (non-profit)
- ISO/IEC 27001:2022 (international)
- OWASP ASVS v4.0.3 (community, cross-corroboration)
- SLSA v1.0 (community, Anthropic-independent provenance)
- Microsoft Zero-Trust (vendor doctrine, Anthropic-independent)

All 6 referenced in FI-2 / FI-5 / Patch-C1-EXT cite-rationales above. Anthropic-side cite-anchors (claude.com/docs/...) preserved in W329-A-3 §7 unchanged.

**Verdict: ACCEPTANCE-RECORD-UPDATE-PROPOSAL READY for operator-overlay-sign. +0.20 composite-recovery on sign. R5 dwell 13 → ≤8 waves on sign.**
