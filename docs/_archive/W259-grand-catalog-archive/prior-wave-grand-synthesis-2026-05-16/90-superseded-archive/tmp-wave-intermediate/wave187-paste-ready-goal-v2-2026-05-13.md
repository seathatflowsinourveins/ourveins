---
title: W187 paste-ready /goal v2 — compressed to <4000 char ceiling
status: AUTHORITATIVE
date: 2026-05-13
wave: 187
v: 2 (v1 overflowed 4524>4000 char cap)
inherits: W184-R2 + W185 + FM-20 n=17 + auto-compact-discipline.md
---

# Paste verbatim — fits 4000 char /goal ceiling

```
[W187] SOTA-AUDIT+HOOK-CLEAN+GPT5.5-CONVERGENCE per CLAUDE.md CR-1+3+5+6+7+8+9+10+11+12. INHERIT W184-R2 (38.9% hook audit-gap)+W185 OAuth 8/8+FM-20 n=17+auto-compact-discipline.md. Phase 1 CR-3 active.

ROOT: compact-remind CRIT 350k=35% on 1M Opus 4.7 (200k-era calibration); post-compact re-inflation 13% reclaim vs SOTA 50-60% (FM-20 row 15); hooks/rules/skills cite-class audit-% incomplete; non-SOTA refs rot runtime.

PARALLEL: branch=w187-rescue worktree-isolated. Live: graphiti :16379 + CPA :18317 v7.0.2 + mcp-memory sqlite_vec + ENV(i) commented W183 F1.

P0 HOOK CLEAN: audit EVERY .claude/hooks/scripts/*.py + settings.json hook entries vs TIER-1-DIRECT cite (Anthropic CC hooks docs / CCBP@48f2ceb / ECC@841beea / superpowers@e7a2d164). Inventory each SOTA-cited|NOVEL-EXCEPTION|REMOVE. Fix userpromptsubmit_compact_threshold.py 350k→780k Pattern A (ENV(j) deployed). Backup non-SOTA→.claude/hooks/_archived/2026-05-13/. Target ≥95%.

P1 3-AGENT CADP BRIDGE-MODE ≥2 (advanced-agent-team-standing-directive.md + parallel-agent-wave.md §CADP max-3):
- A sota-researcher: line-probe ≥10/14 repos: awesome-python, wshobson/agents, GitNexus, awesome-claude-plugins, awesome-llm-apps, andrej-karpathy-skills, mattpocock/skills, awesome-claude-code, alirezarezvani/claude-skills, gsd-build/get-shit-done, vercel-labs/agent-skills, ECC, CCBP, ComposioHQ/awesome-claude-skills. Probe-DAG 1-7 + convergence-gate Axis 1+2+3. ≥4 source families per multi-source-discovery-breadth-discipline.md. OUTPUT_BUDGET 600 LOC→tmp/w187-A-14repo-2026-05-13.md
- B codex-rescue BRIDGE-MODE REAL GPT-5.5: codex exec -p deep-review-exec xhigh; T1+T2+T3 on hooks/rules/skills; per-call 90s cap 120s (FM-17.d defense); cross-model FULL. Out: .claude/state/codex_consult_w187_*_OUT.txt
- C gpt5-archaeologist BRIDGE-MODE: sibling-archaeology REVERT check + bug-magnet + CR-9 install-risk; ARTIFACT-INLINE FM-19.

P2 SOTA AUTOCOMPACT+PRELOAD: ship PreCompact chain (intelligent-compact W164 F38a INSTALLED + ECC pre-compact + context-mode precompact.mjs priority A-F per auto-compact-discipline.md Rank #3.5). Ship SessionStart-preload hook injecting MEMORY.md L1-30 + last close-synthesis + active queue (target reclaim ≥50%). Install claude-mem ADOPT-NOW (W184 FQ-1) + gsd context-monitor (FQ-2).

P3 AUDIT-% CONFORMANCE: docs/w187-audit-conformance-2026-05-13.md table for hooks/rules/skills/agents/manifest §0 CR-8 (W183 F1 62.4%→target ≥90%). All ≥90% TIER-1 OR cite-import-AMBER per CR-12 TERTIARY.

STOP-GATE 8/8 pre-commit:
[1] P0 hooks 100% audited + compact-remind fix
[2] 3-agent CADP ≥2 BRIDGE-MODE ≥1 REAL GPT-5.5 verdict on file
[3] ≥10/14 SOTA repos line-probed ≥4 source families
[4] Mia pre-apply EVERY prescribed_edit (n=29+ ladder)
[5] cross-model FULL OR STAND-IN-NOTICE per cmc-env-funneled-disclosure.md
[6] graphiti add_memory + mcp-memory store_memory at close
[7] audit-% table + MEMORY.md ≤200 lines (Karpathy §5 Layer-2)
[8] PreCompact + SessionStart-preload hooks shipped TIER-1 cite

INVARIANTS:
- LOCAL .claude/rules/... NEVER Z:/claude-sota/... (feedback_no_sibling_claude_sota_cite_within_installed_runtime_2026_05_13.md)
- Pattern A single atomic commit at NEEDS-REVISION conf 0.88-0.93
- ctx_batch_execute for >20-line probes (Rank #1 ~98% savings)
- ARTIFACT-INLINE FM-19 for Bash-only agents
- OUTPUT_BUDGET + TERMINATION per spawn template
- FM-20 row 18+ codify at close

EXECUTE: Skill superpowers:using-superpowers → 3-agent CADP single-message dispatch → Pattern A atomic commit. Cite: W187 per CR-1+8+11+12.
```

# Char count

Body ~3500 chars; /goal-args wrapper ~50 chars overhead → total ~3550 chars (well under 4000 ceiling).

# Compression vs v1 (4524→~3550 chars)

- Dropped trailing detail in repo list (full org-prefix kept for top-3; rest short-name)
- Consolidated PARALLEL section to single line
- Collapsed AGENT brief descriptions to ≤2 lines each
- Removed redundant "INHERIT" elaboration
- INVARIANTS trimmed from 6 to 6 (same count but tighter phrasing)
- Removed P2 explicit "research+ship SOTA auto-compact:" preamble (implicit from section title)
- STOP-GATE descriptions trimmed (drop "ALL pre-commit" suffix; gate name implies it)

# Pre-flight before paste

1. ENV(j) live: `$env:CONTEXT_WINDOW_COMPACT_CRIT_TOKENS` → expect `780000`
2. CPA healthy: `curl http://127.0.0.1:18317/v1/messages` HTTP 200
3. Worktree: `git worktree add ../w187-rescue` if parallel isolation
