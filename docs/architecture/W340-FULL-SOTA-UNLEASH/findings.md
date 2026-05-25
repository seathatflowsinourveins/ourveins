# W340 Findings (accumulated)

> Populated by orchestrator post-agent-completion. Each agent writes its own deliverable doc; this file aggregates cross-agent themes + open questions.

## Cross-agent themes (TBD — populate after agents return)

- [ ] S1 (SOTA extension): N new candidates discovered? Any TIER-1 install recommendations?
- [ ] S2 (runtime health): Any drifted plugin SHAs requiring cache-delete + fresh-install?
- [ ] S3 (synthesis): sca-v14 D13-D17 diff ready for operator-sign?

## Open questions (orchestrator-staged)

- Q1: Should W338-CPA-ROUTER-SOTA-PATCHES dir be moved into a dedicated W338-CPA-ROUTER wave, or rolled into W340?
- Q2: If S2 finds MCP servers offline that CLAUDE.md claims are LIVE — surgical edit to CLAUDE.md memory state block?
- Q3: Fork anti-finding (Δ-G49) — does the empty-final-message-guard skill correctly catch the failure mode in re-test?

## Verification gates pending

- VG-1: Pre-commit gate fire test (S2 Part C) must pass before final commit
- VG-2: sca-v14 commit MUST be operator-signed before merge (per W339 P1b "REPORT-ONLY")
- VG-3: Any cache-delete + fresh-install action requires operator confirmation (CR-1 trust-tuple)
