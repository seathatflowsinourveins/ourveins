# W332 — Findings (append-only)

## 2026-05-19

### F1 — pre-wave state verified
- CLAUDE.md = 50 LOC (at ceiling; no header-line growth tolerated this wave)
- `.claude/settings.json` = 17,417 bytes (583 bytes headroom under 18 KB ceiling)
- `.claude/skills/sota-convergence-audit/SKILL.md` exists (sca-v12 target for v13 edit)
- 39 existing skills under `.claude/skills/` (no `citations-agent` · no `addyosmani-source-driven-development`)
- subagent-type-allowlist.json present (307 entries per W326 P0-A2)
- Git: clean tree, on `goal/W331-sota-convergence`, HEAD `38f4c30`

### F2 — SOT directories enumerated
- `docs/architecture/W329-DEEP-AUDIT-FULL-SOTA-UNLEASHED/` — 9 deliverables (README + A-H)
- `docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/` — 7 deliverables (A · A1 · B · C · D · D1 · H)
- `docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/` — 21 deliverables (codex-round 1/2/3 + 8 clusters + finalization)

### F3 — parallel-fan-out enabled
- W331-r3-P0.1 `tools/preagent-parallel-guard.mjs` UserPromptSubmit detector at HEAD (commit `38e0bca` referenced in goal)
- Δ-PDM-1 skeleton-first write protocol active
- Δ-PDM-2 per-agent budget cap: research-heavy K=15 / M=140k recommended for P0-* workers

### F4 — parallel-guard race-condition discovered (W332 finding)
- The early-exit at line 269 (`turnFireCount >= 2`) is race-vulnerable: parallel Agent calls in one assistant message all read counter file BEFORE any has writeCounter'd, so turnFireCount stays at 1
- Empirical: 4-Agent parallel dispatch → Call 1 passes (advisory ladder, count 0→1); Calls 2-4 race-read count=1, BLOCK at line 310
- Workaround: pre-write `multiStreamIntent: false` triggers line 296 early-exit
- W333+ root-fix candidate: file-lock or atomic CAS in counter read/write OR rely solely on UserPromptSubmit-set multiStreamIntent (which already exists as the dominant path)

### F5 — sca-v13 codified (P0-A APPLY)
- composite_denom_install: 39.8 → 42.5 (Δ +2.7) confirmed
- composite_denom_pattern: 17.3 → 18.9 (Δ +1.6) confirmed
- Bonus: arch-itself denom_install 32.9 → 34.3 (D67+D68+D72 measurable; D69/D70/D71 skip-N/A per W329-C §8.5)
- All 13 prior lineage entries preserved verbatim; new v12→v13 entry appended
- 7 organizationally-distinct anchor orgs: Anthropic PBC + Salesforce AI Research + UK AISI + Princeton/Northeastern + Tsinghua FIB + Stanford NLP + Nous Research (≥3-org-distinct floor exceeded 2x+)
