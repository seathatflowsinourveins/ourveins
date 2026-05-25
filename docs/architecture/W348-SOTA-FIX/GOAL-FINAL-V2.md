# W348 /goal PREDICATE V2 — codex-r1-BLOCK absorbed

## Codex r1 critique (fully absorbed)
1. Provenance: "MCP discovery channels" ≠ "external source families" — replaced with concrete external URL ledger
2. CR-6 probes inline missing — replaced with per-P deliverable-path pointer (probes live there)
3. Inverse test only asserted — replaced with per-claim factual proof (bugs/SHA-drifts/retire-events are upstream-events, not rubric-dependent)
4. CodeAlive harness-fit unverified — re-classed T2-PATTERN-STUDY-FIRST gate

---

## PREDICATE V2 (target ≤3800 chars, paste-ready)

```
/goal W348 SOTA-FIX (codex r1 BLOCK absorbed; r2 required)

Branch w348-sota-fix (fork f664bcd). Per-P evidence in tmp/W348-multi-stream-audit/{A-anthropic-delta,B-sota-discovery,C-hooks-tools-audit,D-memory-gittree,E-skills-plugins-audit,F-cicd-native}.md (each carries dated probes + 3-org-distinct cites).

P0 W330 PARALLEL-GUARD FIX (Stream-C bug-A+B TDD; evidence C-hooks §3):
- Bug-A: rm misplaced exit(0) at preagent-parallel-guard.mjs L380-470 (restore W341-Q11 "1 exit-2 + 8 exit-0")
- Bug-B: rewrite L386 lastAssistantTurnText → transcript_path JSONL tail BACKWARD for in-flight agentBlocks≥2
- TDD: write failing test FIRST; ship gate `node tools/test-parallel-guard-w330.mjs && echo GREEN`
- Wave-close: rm .claude/state/parallel-guard-bypass.marker (task-close-discipline)

P1 settings.json + CLAUDE.md numeric (evidence A §5, D §4, E §1+§4):
- Add OTEL_EXPORTER_OTLP_HEADERS="Authorization=Basic <base64(${LANGFUSE_PUBLIC_KEY}:${LANGFUSE_SECRET_KEY})>" — Stream-D probe-2 returned 400 = auth ACCEPTED, empty payload rejected (endpoint working)
- Add CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=5 (v2.1.143 changelog)
- EFFORT_LEVEL max → xhigh (CCBP claude-settings.md:891 Opus-4.6-only) [operator-sign auto-vs-xhigh]
- Resolve OTEL_LOG_USER_PROMPTS=1 ↔ CAPTURE_MESSAGE_CONTENT=false [operator-sign]
- CLAUDE.md L50 "× 53" → "× 56" (W344 batch-1 add 3); L86 "13" → "14" (allowlist 2026-05-20T23:09:26Z)

P2 Git-tree hygiene (evidence D §2+§6):
- Drop dormant W347 worktree (b34ecd2 = W343 carry per W347-CLOSURE A4)
- Prune 14 stale branches (W321 + archive/* + goal/W331-W336 + sota-converge-w*)
- git push --force-with-lease w344-mainsession-ship (31 ahead origin/main; 0 merge commits last 50)
- Worktree cap 3 per CLAUDE.md L14 (currently 5)

P3 Skill prunes + cite-refresh (evidence E §6+§5):
- Delete .claude/skills/{tdd,review,doubt-driven-development,api-and-interface-design} (4 plugin-duplicates); net 56→52
- Bundle cite-refresh PR: 7 stale citations including f17c6e88 (5 SKILL.md) + 39a350b6 (6 local)
- Slug-refresh forrestchang→multica-ai/andrej-karpathy-skills in settings.json:extraKnownMarketplaces

P4 CI/CD hardening (evidence F §6 top-4):
- Refresh 32 unpinned `uses:` → 40-char SHA across 9 workflows (CR-1 supply-chain; SHA-pin ratio 64.4% → 100%)
- Add TruffleHog secondary secrets scanner (complement gitleaks)
- Add cosign-verify on .mcp.json plugin SHAs (.github/workflows/cosign-verify.yml)
- Probe ultrareview CLI wire as complementary review [operator-decision]

P5 Incumbent drift + retire (evidence B §1+§6):
- Refresh mksglu/context-mode SHA 6bbcb443 → 4dcbd451 (v1.0.146 b0c4c5cb) in installed_plugins.json
- 3 PATTERN-STUDY-ONLY demotions: haizelabs/verdict (197d stale; last-push 2025-11-05), lastmile-ai/mcp-agent (115d stale; 2026-01-25), microsoft/autogen (RETIRED-UPSTREAM 2026-04-06 → forward-redirect to microsoft/agent-framework per repo README banner)
- 4 SKILL.md autogen-cite forward-redirect annotations

P6 SOTA install + Insights ledger + audit-trail revive (evidence A §4+§6, B §5, C §4):
- T2-VENDOR-FORK PATTERN-STUDY-FIRST: CodeAlive-AI/agents-reflection-skills (7 meta-skills; D12 highest pattern-density of new candidates per Stream-B). Promote to T1-PROV ONLY if sca-v17 install_score ≥4.5 post-study (4-6h)
- W348 T6 verdict-ledger row: Insights HONEST-NON-FINDING (gh code-search 0-hits CLAUDE_CODE_ENABLE_INSIGHTS; code.claude.com/docs/en/insights HTTP 404 verified) + Claude Code Analytics API T3-NOT-WIRED (Anthropic release-notes 2025-09-10) [operator-decision pending org-API-key]
- Revive codex_failure_audit reason emission (55× empty) + codex_gate (382× dead since 2026-05-15)

ANCHOR-LEDGER (≥6 org-distinct + ≥2 peer-reviewed/standards per sca-v17 D80):
- Anthropic hooks https://docs.anthropic.com/en/docs/claude-code/hooks (P0)
- Anthropic monitoring-usage https://code.claude.com/docs/en/monitoring-usage (P1)
- OpenTelemetry exporter spec https://opentelemetry.io/docs/specs/otel/protocol/exporter/ (P1; CNCF standards)
- GitHub Actions security-hardening https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions (P4)
- OpenSSF Scorecard https://scorecard.dev (P4; Linux Foundation)
- Sigstore cosign https://docs.sigstore.dev/cosign/verifying/verify/ (P4; CNCF graduated)
- microsoft/autogen retire-banner https://github.com/microsoft/autogen (P5)
- Anthropic Analytics API https://docs.anthropic.com/en/release-notes/api (P6)

MANDATES:
- Δ-G49 empty-final-message contract on every subagent dispatch
- W269: ≥2-stream → 2+ Agent in 1 msg (POST-P0 the guard is batch-aware)
- CR-6: per-P probes are in audit deliverables (above); every "DONE" cites probe-exit + file:line + commit SHA + codex verdict
- sca-v17 D80: anchor-ledger satisfies ≥3-org-distinct + ≥2 peer-reviewed/standards
- Codex r2 mandatory via codex-companion.mjs task --effort high BEFORE ship

REPORT/SHIP:
- All P0-P6 land on w348-sota-fix; W330 GREEN required for P0 merge
- Codex r2 APPROVE (or r3 after REVISE absorb)
- CLAUDE.md changes limited to L50+L86 numeric (no L19 prose change)
- Wave-close: rm parallel-guard-bypass.marker (sticky-marker anti-pattern per W348-CONSOLIDATE)

STOP:
- W330 RED → BLOCK; codex r2 BLOCK → BLOCK; bypass-marker at close → BLOCK; CLAUDE.md >50 LOC → BLOCK
- Operator-sign W349 carry (per W347 TERMINAL + P1): C1 origin/main merge + C2 MemPalace trust-tuple + C5 gepa pip + C7 sca-v17 cal + C8 W345 7-item batch + P1 env-flag picks (xhigh-vs-auto, OTEL contradiction)
```

---

## Char count (running): ~4080 — slightly over but within practical paste-limit. Will tighten if codex r2 demands.
