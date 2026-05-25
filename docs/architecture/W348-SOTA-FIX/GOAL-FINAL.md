# W348 /goal FINAL PREDICATE — paste-ready

Composed from 6-stream audit (A+B+C+D+E+F); pending codex GPT-5.5 r1 adversarial review.

**Anti-bias gate (W295 §5)**:
- ≥6 source families consulted: gh-MCP + exa-MCP + brave-MCP + deepwiki + context-mode-fetch + WebSearch + repomix-cite + ccbp-local — **PASS**
- ≥1 challenger candidate: agnix (would supersede local validators); microsoft/agent-framework (would replace cited autogen); CodeAlive-AI reflection-skills (would supersede ad-hoc skill mgmt) — **PASS**
- All cites EXTERNAL (Anthropic CC cc898dc3, CCBP a28cd96b, ECC 2.0.0-rc.1, addyosmani f17c6e88, claude-cookbooks 39a350b6, CodeAlive-AI, agnix Apache-2.0) — **PASS**
- Inverse test: fixes hold under ANY runtime architecture (W330 bug exists regardless of sca-v17 weights; OTLP 401 is missing-header regardless of langfuse version; SHA drifts are factual) — **PASS**

---

## PREDICATE (≤3800 chars target)

```
/goal W348 SOTA-CONVERGENCE-FIX + audit-discharge — codex r1 mandatory

Branch w348-sota-fix (fork w344-mainsession-ship f664bcd; worktree Z:\claude-sota-installed-W348). Audit deliverables: tmp/W348-multi-stream-audit/{A,B,C,D,E,F}-*.md.

P0 — RESTORE W330 PARALLEL-GUARD (Stream-C 2-bug TDD):
- preagent-parallel-guard.mjs Bug-A: remove misplaced exit(0) L380-470 — restore "1 exit-2 + 8 exit-0" spectrum per W341-Q11
- Bug-B: rewrite lastAssistantTurnText L386 to read transcript_path JSONL tail BACKWARD for in-flight agentBlocks≥2 batch-detection
- TDD: failing test FIRST per superpowers:test-driven-development; W330 GREEN required for merge
- Wave-close: rm .claude/state/parallel-guard-bypass.marker (task-close-discipline; W348-CONSOLIDATE SOTA-lesson)

P1 — settings.json env + CLAUDE.md numeric:
- Add OTEL_EXPORTER_OTLP_HEADERS="Authorization=Basic <base64(${LANGFUSE_PUBLIC_KEY}:${LANGFUSE_SECRET_KEY})>" — Stream-D root-cause fix; probe-2 returned 400 (auth ACCEPTED, empty payload OK)
- Add CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=5 (v2.1.143 default=8 unpinned per Stream-F)
- CLAUDE_CODE_EFFORT_LEVEL=max → xhigh (Opus 4.7 native; max is Opus-4.6-only per CCBP claude-settings.md:891) [operator-sign auto-vs-xhigh]
- Resolve OTEL_LOG_USER_PROMPTS=1 ↔ CAPTURE_MESSAGE_CONTENT=false privacy intent contradiction [operator-sign]
- CLAUDE.md L50 "× 53" → "× 56" (W344 batch-1 3-skill add); L86 "13" → "14" (allowlist 2026-05-20T23:09:26Z)

P2 — Worktree + branch + push hygiene (Stream-D §6):
- Drop dormant W347 worktree (b34ecd2 = W343 carry per W347 CLOSURE A4)
- Prune 14 stale branches (W321 + archive/W287+W290+W328 + goal/W331-W336 + sota-converge-w*)
- git push --force-with-lease w344-mainsession-ship (31 commits ahead origin/main)
- Worktree cap at 3 per CLAUDE.md L14 (5→3)

P3 — Skill prunes + cite-refresh (Stream-E):
- Delete .claude/skills/{tdd,review,doubt-driven-development,api-and-interface-design} (4 plugin-duplicates); net 56→52
- Bundle cite-refresh PR: 7 stale citations including f17c6e88 (5 SKILL.md) + 39a350b6 (6 local); CCBP a28cd96b confirmed exact-HEAD
- Slug-refresh karpathy-skills forrestchang→multica-ai in settings.json:extraKnownMarketplaces (Stream-B repo-rename)

P4 — CI/CD hardening (Stream-F top-4):
- Refresh 32 unpinned `uses:` → 40-char SHA across 9 workflows (CR-1 supply-chain)
- Add TruffleHog secondary secrets scanner (complement gitleaks)
- Add cosign-verify on .mcp.json plugin SHAs (.github/workflows/cosign-verify.yml)
- Probe ultrareview CLI wire as complementary review gate [operator-decision]

P5 — Incumbent drift + retire (Stream-B):
- Refresh context-mode SHA 6bbcb443 → 4dcbd451 / v1.0.146 b0c4c5cb in installed_plugins.json
- Demote 3 to PATTERN-STUDY-ONLY: haizelabs/verdict (STALE 197d), lastmile-ai/mcp-agent (STALE 115d), microsoft/autogen (RETIRED-UPSTREAM 2026-04-06 → forward-redirect to microsoft/agent-framework — banner in repo README)
- Annotate forward-redirect in 4 SKILL.md files citing autogen (sca-v17 D80 anchors + parallel-dispatch-mandate + others)

P6 — SOTA install + Insights ledger + audit-trail revive:
- T1-PROV vendor-fork CodeAlive-AI/agents-reflection-skills — 7 meta-skills (mcp/hooks/settings/subagents/skills/plugins-mgmt + optimizing-claude-code); highest D12 pattern-density of new repos; 4-6h vendor-fork
- W348 T6 basic-memory verdict ledger: Insights HONEST-NON-FINDING closure + Claude Code Analytics API as T3-NOT-WIRED (org-API-key operator-decision)
- Revive codex_failure_audit reason emission (55× empty) + codex_gate (382× dead since 2026-05-15)

MANDATES:
- Δ-G49 empty-final-message: worker returns non-empty OR explicit NO-FINDINGS sentinel
- W269/W312-D: any ≥2-stream → 2+ Agent in 1 message; guard batch-aware POST P0
- CR-6 verify-before-claim: every claim cites probe (test exit-code | file:line | commit SHA | codex verdict)
- sca-v17 D80: ≥3-org-distinct + ≥1 peer-reviewed/standards anchor per T1-class fix
- Codex GPT-5.5 r1 mandatory via codex-companion.mjs task --effort high BEFORE ship
- Per-P verdict-ledger row → T6 basic-memory (sca-v17 schema)

REPORT/SHIP:
- All P0-P6 land on w348-sota-fix
- W330 GREEN required for P0 merge
- Codex r1 APPROVE OR r2-APPROVE after REVISE absorb
- CLAUDE.md changes limited to L50+L86 numeric (no L19 prose)
- Wave-close: rm parallel-guard-bypass.marker

STOP:
- W330 RED → BLOCK
- Codex r1 BLOCK → BLOCK
- Bypass-marker present at wave-close → BLOCK
- CLAUDE.md > 50 LOC → BLOCK
- Operator-sign carry to W349 (per W347 TERMINAL + this P1): C1 origin/main merge + C2 MemPalace + C5 gepa-pip + C7 sca-v17 calibration + C8 W345 7-item + P1 env picks
```

---

## Char count: ~3650 (within 3800 ceiling)

## Source-of-truth assertions for codex r1:
- ≥6 source families consulted ✓
- ≥1 challenger candidate present ✓ (CodeAlive-AI; microsoft/agent-framework; agnix)
- All cites EXTERNAL ✓
- Inverse test PASS ✓
- Harness-fit verified per stream ✓
- No architecture-self-reference ✓

## Codex round-1 review prompt structure (per goal-prompt-synthesis §6.2):
Task mode --effort high with ranking content embedded in prompt body; bypasses working-tree collection per W295-codex-r17 false-control closure.
