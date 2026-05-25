---
title: Wave 83 Token-Efficiency Gap Analysis
agent: codex-rescue BRIDGE-MODE (real GPT-5.5)
verdict_origin: BRIDGE-MODE real GPT-5.5 via codex CLI
date: 2026-05-08
status: HISTORICAL-DRAFT
---

## §1 V40-V65 Kits Findings

- Directory audit: present v40-v48, v52-v64; absent v49,v50,v51,v65.
- V63 README.md:64 "Subagents = context isolation"; README.md:67 routes Opus to deep subagent.
- V63 MANIFEST.md:78 mksglu/context-mode (already installed); MANIFEST.md:84 alexgreensh/token-optimizer; MANIFEST.md:86 zilliztech/claude-context. No new architectural primitive.
- V65: HONEST-NON-FINDING; directory does not exist.
- Verdict: HONEST-NON-FINDING. V63 wave-incremental; no new token-dedup/message-pruning/subagent-amortization primitive beyond V64/Wave 79.

## §2 GitHub Gap Repos

- BerriAI/litellm: 46k stars, license other, created 2023-07-27, HEAD SHA 6ff668c. TIER-B STUDY-PILOT; not direct Claude Code token compaction primitive.
- Portkey-AI/gateway: 11.6k stars, MIT, created 2023-08-23, HEAD SHA 351692f. TIER-B STUDY-PILOT; duplicates proxy surfaces already partially installed.
- vercel/ai: 24.1k stars, license present, created 2023-05-23, HEAD SHA 1043274. TIER-C REJECT; app SDK not Claude Code runtime primitive.
- flightlesstux/prompt-caching: 99 stars, MIT. README: Claude Code already handles its own API caching. TIER-C REJECT.

## §3 Anthropic-Canonical Primitives Audit

- SET: ENABLE_PROMPT_CACHING_1H at eee.ps1:70 AND .claude/settings.json:31
- SET: CLAUDE_CODE_FORK_SUBAGENT at .claude/settings.json:8; eee.ps1:60
- SET: CLAUDE_CODE_ATTRIBUTION_HEADER=0, CLAUDE_CODE_ENABLE_AWAY_SUMMARY, CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING, CLAUDE_CODE_USE_POWERSHELL_TOOL, CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS at .claude/settings.json:24-30
- SET: core portable env CLAUDE.local.md:28-32; session JSONL path CLAUDE.local.md:48; project-dir eee.ps1:125
- ABSENT: Anthropic Message Batches API. Canonical 50% cost reduction for async bulk work per https://platform.claude.com/docs/en/build-with-claude/batch-processing lines 161-177. No local batch API usage found.
- ABSENT: structured-output API (output_config.format per https://platform.claude.com/docs/en/build-with-claude/structured-outputs lines 163-172, 214-229).
- ABSENT: agent_transcript_path JSONL mining hook; SubagentStop empty at .claude/settings.json:218.
- ABSENT from eee.ps1 per https://code.claude.com/docs/en/env-vars lines 143-168: CLAUDE_CODE_AUTO_COMPACT_WINDOW, CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS, CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY; not ADOPT-NOW without workload evidence.

## §4 PRESCRIPTION (ranked)

TIER-A ADOPT-NOW: None.

TIER-B STUDY-PILOT:
- Anthropic batch API for offline eval waves (50pct cost reduction, https://platform.claude.com/docs/en/build-with-claude/batch-processing lines 174-177)
- Structured-output schemas; cache caveat at https://platform.claude.com/docs/en/build-with-claude/structured-outputs lines 428-445
- Transcript JSONL mining hook via CLAUDE_CODE_PROJECT_DIR

TIER-C REJECT:
- flightlesstux/prompt-caching, vercel/ai as runtime, capacity-score/cache-affinity lease

## §5 Multi-Agent Fan-Out Token Amortization

- Canonical finding: cache entries for concurrent requests only available after the first response begins.
  Validates cache-warm barrier design, NOT true simultaneous N-child amortization.
  Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching lines 413-414.
- Cache mechanics require identical prefixes + prior writes (lines 355-358, 371-383).
- Local: eee.ps1:75 already sets EEE_FLEET_CACHE_WARM_BARRIER=1.
- HONEST-NON-FINDING: no verified repo or Anthropic primitive for true N-child simultaneous
  shared-prefix cache reuse. Canonical stand-in: serialized first-response cache warm, then fan-out.

PRESCRIPTION: Do not install a new repo; harden existing cache-warm barrier + transcript mining.

VERDICT: HONEST-NON-FINDING
