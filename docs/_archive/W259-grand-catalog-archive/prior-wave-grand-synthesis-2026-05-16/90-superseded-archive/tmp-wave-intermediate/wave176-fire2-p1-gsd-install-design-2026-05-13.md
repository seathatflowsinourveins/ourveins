---
title: W176 Fire 2 P1 gsd 3-hook STUDY-PILOT install design + Mia pre-apply DAG
status: AUTHORITATIVE
date: 2026-05-13
wave: 176
fire: 2
priority: P1 STOP-2
team_size: 1 (orchestrator-direct; Mia pre-apply n=110 vs 3 prescriptions)
---

# W176 F2 — P1 gsd 3-hook STUDY-PILOT install design

## Source verification

- **gsd-build/get-shit-done** HEAD SHA `3aaed8f5d7c3492678b867e6687d42c88fe227e5` [VERIFIED 2026-05-13 via `git -C Z:/repos/deps/get-shit-done rev-parse HEAD`]
- License: MIT (per W174 P1(a) sota-researcher verdict)
- Hooks dir inventory (12 files): gsd-check-update.js + gsd-check-update-worker.js + gsd-context-monitor.js + gsd-phase-boundary.sh + **gsd-prompt-guard.js** + gsd-read-guard.js + **gsd-read-injection-scanner.js** + gsd-session-state.sh + gsd-statusline.js + gsd-update-banner.js + gsd-validate-commit.sh + gsd-workflow-guard.js

## Mia pre-apply Probe DAG (per mia-pre-apply.md n=110)

Each gsd hook verified against runtime state BEFORE write per `Z:/claude-sota-installed/.claude/rules/mia-pre-apply.md §How to apply`. Probe DAG (P4 plugin-namespace + P5 mode-harness-shape + P6 LICENSE + P7 demand-gate split) per `ahfv-probe-dag.md`.

### Probe DAG verdicts

| Hook | P4 plugin-namespace | P5 mode-harness-shape | P6 LICENSE | P7 demand-gate | CR-12 disposition | Verdict |
|---|---|---|---|---|---|---|
| **gsd-prompt-guard.js** | PASS (no duplicate) | **FAIL** — scans only `.planning/` files; this directory does NOT exist in claude-sota-installed (uses `.claude/`, `tmp/`, `docs/`, `tools/`) | PASS (MIT) | n/a (P5 fails first) | REJECT-FOR-FIT.P5 | **REJECT** |
| **gsd-read-injection-scanner.js** | PASS (no PostToolUse Read injection-scan equivalent in sss incumbent safety_guard.py — sibling has different scope) | PASS — Read tool is universal; built-in exclusion list (`.planning/`, `REVIEW.md`, `CHECKPOINT`, security docs, `.claude/hooks/`) is sss-compatible; can extend with sss-specific paths if needed | PASS (MIT) | **7.b PASS** — DEMAND-CREATES-NEW-WORKFLOW (novel summarisation-survival patterns NOT in incumbent + Read-tool injection defense scope NOT covered by safety_guard.py Bash deny-list) | PARTIAL-OVERLAP STUDY-PILOT-30d | **STUDY-PILOT INSTALL** |
| **gsd-context-monitor.js** | **FAIL** — duplicates incumbent stack: `userpromptsubmit_compact_threshold.py` (W175 P6 env-overridable WARN/HIGH/CRIT 350/500/600k) + `context_window_guard.py` PostToolUse + `context_window_statusline.sh` (sidecar writer); per kiss-dry-yagni Must-Never #4 no duplicate functionality | FAIL — depends on gsd-statusline.js writing `/tmp/claude-ctx-{session_id}.json` bridge file; sss already writes `.claude/state/context_window_sidecar.json` via its own statusline | PASS (MIT) | n/a | REJECT-DUPLICATE-FUNCTIONALITY | **REJECT** |

### Mia pre-apply Pattern A admissibility filter

Per `mia-pre-apply.md §How to apply` step 4: classify refuted prescriptions as **OVER** and drop. Apply only verified-surviving prescriptions atomically. P1 /goal spec assumed 3-of-3 install — Mia surfaces 2 OVER + 1 VERIFIED-GENUINE.

**Top-1 INSTALL design** (down from Top-3 in /goal P1):

### gsd-read-injection-scanner.js — STUDY-PILOT-30d install

**Target**: `Z:/claude-sota-installed/.claude/hooks/scripts/gsd_read_injection_scanner.js`
**Source SHA pin**: `3aaed8f5d7c3492678b867e6687d42c88fe227e5` (per CR-9 version-pin mandate)
**Hook event**: PostToolUse, matcher `Read`, mode async, exit 0 always (advisory only)
**License**: MIT (gsd LICENSE) — preserve copyright header inline

**18 detection patterns** (14 standard injection + 4 summarisation-survival; verbatim from source):
1. `/ignore\s+(all\s+)?previous\s+instructions/i`
2. `/ignore\s+(all\s+)?above\s+instructions/i`
3. `/disregard\s+(all\s+)?previous/i`
4. `/forget\s+(all\s+)?(your\s+)?instructions/i`
5. `/override\s+(system|previous)\s+(prompt|instructions)/i`
6. `/you\s+are\s+now\s+(?:a|an|the)\s+/i`
7. `/act\s+as\s+(?:a|an|the)\s+(?!plan|phase|wave)/i`
8. `/pretend\s+(?:you(?:'re| are)\s+|to\s+be\s+)/i`
9. `/from\s+now\s+on,?\s+you\s+(?:are|will|should|must)/i`
10. `/(?:print|output|reveal|show|display|repeat)\s+(?:your\s+)?(?:system\s+)?(?:prompt|instructions)/i`
11. `/<\/?(?:system|assistant|human)>/i`
12. `/\[SYSTEM\]/i`
13. `/\[INST\]/i`
14. `/<<\s*SYS\s*>>/i`
15. `/when\s+(?:summari[sz]ing|compressing|compacting),?\s+(?:retain|preserve|keep)\s+(?:this|these)/i` (summarisation)
16. `/this\s+(?:instruction|directive|rule)\s+is\s+(?:permanent|persistent|immutable)/i` (summarisation)
17. `/preserve\s+(?:these|this)\s+(?:rules?|instructions?|directives?)\s+(?:in|through|after|during)/i` (summarisation)
18. `/(?:retain|keep)\s+(?:this|these)\s+(?:in|through|after)\s+(?:summar|compress|compact)/i` (summarisation)

**sss path-rewrite required (CR-9 sibling-bleed defense)**: exclusion list must add sss-specific paths:
- `.claude/projects/` (session JSONL)
- `tmp/` (gitignored scratch)
- `docs/` (cite-anchor docs may contain injection-like strings legitimately)
- `Z:/repos/deps/` (upstream cite-anchor sources)

**Severity gate**: LOW (1–2 patterns matched) / HIGH (3+ patterns) — advisory stderr only, never block.

**Install ship**:
1. T1 codex pre-edit consult per `cross-model-consensus.md §contract` Phase 1 bootstrap exception via Path P foreground+tee
2. Read upstream source @3aaed8f5 → port verbatim to `.claude/hooks/scripts/gsd_read_injection_scanner.js`
3. Apply sss-specific exclusion list edits (4 paths above)
4. Register in `.claude/settings.json:hooks.PostToolUse[]` with matcher `Read`, async, timeout 5s
5. Smoke test via PROBE: pipe `{"tool_name":"Read","tool_input":{"file_path":"Z:/repos/deps/get-shit-done/hooks/gsd-read-injection-scanner.js"}}` → assert HIGH severity stderr (file itself contains all 14 injection patterns as regex)
6. T3 postcommit verdict expected APPROVE or NEEDS-REVISION (advisory hook, low blast radius)
7. STUDY-PILOT 30-day retire predicate: if 0 detections OR all detections false-positive → retire to `.claude/state/disabled-hooks.json`; if ≥1 genuine catch → promote to permanent

**Cite trail**:
- Source: `Z:/repos/deps/get-shit-done/hooks/gsd-read-injection-scanner.js @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5` [VERIFIED 2026-05-13]
- Probe DAG: `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` §Probe DAG
- Mia pre-apply: `Z:/claude-sota-installed/.claude/rules/mia-pre-apply.md` n=110 (advance from n=109)
- CR-9 install-risk: `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9 §version-pin mandate
- CR-12 disposition: `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` §PARTIAL-OVERLAP

## STOP gate W176 update

| # | STOP | Status |
|---|---|---|
| 1 | post-compact preload audit ≥70% restored | ✓ MET 80% (W176 F1) |
| 2 | gsd 3-hook STUDY-PILOT install | ⚠ DESIGN-COMPLETE (1 of 3 viable; 2 REJECT per Mia DAG); INSTALL ship queued |
| 3 | 11-repo wave-2 verdicts | ⏳ queued P2 |
| 4 | memory-backend convergence matrix | ⏳ queued P3 |
| 5 | audit-% ≥50% via 4-section Pattern A | ⏳ queued P4 |
| 6 | 3-T1 codex verdicts cumulative ≥6.0 | ⏳ queued P5 |
| 7 | 5-surface persist this fire | ⏳ pending W176 F2 close |
| 8 | FM-20 row 16+ codify | ✓ MET row 9 ladder advance (W176 F1) |

**Progress**: 2 of 8 STOP MET firm (P0+P7) + 1 PARTIAL (P1 design-only, install queued); 5 queued.

## Mia pre-apply ladder advance

n=109 → n=110 this fire. 3 prescriptions probed; 2 REFUTED-OVER (gsd-prompt-guard P5 mode-harness-shape + gsd-context-monitor P4 plugin-namespace) + 1 VERIFIED-GENUINE (gsd-read-injection-scanner P7.b STUDY-PILOT eligible). Bidirectional pattern preserved (catches OVER + validates GENUINE).

## Forward direction

- **Next fire candidate**: P5 cross-model T1 consult on this design (Path P codex exec foreground+tee with the design doc as input); on T1 APPROVE → ship the install per §Install ship steps 2-7
- OR continue P3 memory-backend convergence matrix design (independent, no install yet)
- DEFER P2 11-repo CADP 3-agent fan-out until /compact (~70k+ context cost for 3 BRIDGE-MODE subagents)
