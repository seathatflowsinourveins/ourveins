# W300 Codex R1 Adversarial Review — 2026-05-18

## Overall verdict: REVISE

## Finding counts by severity

| CRITICAL | HIGH | MEDIUM | LOW |
|---:|---:|---:|---:|
| 0 | 2 | 1 | 1 |

## Findings

| # | Severity | File | Line-range | Finding | Proposed-fix | True-bug-prob |
|---:|---|---|---|---|---|---:|
| 1 | HIGH | `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` | 99-113 | The appended Stream D summary says compliance moved to `42% (8/19)` and that 11 historical rows remain without T6 files. The ledger has rows #1-#18 only, and filesystem listing shows row #1 plus the 7 new W300 backfills have T6 files, so the correct math is `8/18 = 44.4%`, with 10 remaining rows lacking T6 files (#2-#11). | Change line 113 to `44.4% (8/18 post-W300)` and `remaining 10 historical rows (#2-#11)`. This aligns the ledger with Stream D lines 124-128 and synthesis lines 25, 80-82. | 0.99 |
| 2 | HIGH | `docs/architecture/W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-STREAM-B-MEMORY-LAYER-COMPARISON.md` | 15-20, 69-72, 91-93, 199-202, 294-309 | Stream B's TL;DR reports stale Top-3 alternative scores: mem0 `~3.85`, hindsight `~3.80`, and mcp-memory-service `~3.55`. The same file's arithmetic and matrix report hindsight `4.56`, mem0 `4.27`, and mcp-memory-service `3.66`. This is a score inconsistency in the stream input, even though the synthesis uses the corrected values. | Update the TL;DR Top-3 row to match the matrix: hindsight `4.56` (already T1 incumbent, wrong niche), mem0 `4.27`, and mcp-memory-service `3.66`; explicitly label them lite-scores. | 0.97 |
| 3 | MEDIUM | `docs/architecture/W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-STREAM-C-BROADER-MEMORY-SOTA-DISCOVERY.md`; `docs/architecture/W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-AUDIT-2026-05-18.md` | Stream C 30-35, 512-522; synthesis 15, 38 | The "Top-5 overall" lists are inconsistent. Stream C TL;DR lists Memori, supermemory, ShinkaEvolve, honcho, haystack; the later ranked table lists Memori, memsearch, supermemory, hampsterx, dspy as the top five by lite install_score; the synthesis lists Memori, memsearch, supermemory, ShinkaEvolve, honcho. | Rename these as different lists if intentional, e.g. `Top-5 memory/operator-action candidates` vs `Top-5 by lite install_score`, or make all three tables use the same ordering rule. | 0.84 |
| 4 | LOW | `docs/architecture/W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-AUDIT-2026-05-18.md`; `docs/architecture/W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-STREAM-A-BASIC-MEMORY-SCA-V5-AUDIT.md`; `.claude/skills/sota-convergence-audit/SKILL.md` | synthesis 15, 36, 88; Stream A 5, 609-635; SKILL 179-224 | The deliverables repeatedly call sca-v5 an `18-dim` rubric, but the live SKILL says total dimension count is 20, with 19 install-relevant dims and install denominator 19.3. Stream A's actual arithmetic correctly uses 19 install-relevant rows, so this is terminology drift rather than a scoring bug. | Replace `18-dim` with `20-dim sca-v5 / 19 install-relevant dims` where the W300 docs describe the rubric. | 0.90 |

## Verification notes

Arithmetic spot-check for Stream A: sampled contributions are D1 `3*1.5=4.5`, D3 `5*1.3=6.5`, D6 `3*0.9=2.7`, D14 `5*1.1=5.5`, D16 `2*1.0=2.0`; sample subtotal `21.2`. Full Stream A sum is `73.600 / 19.3 = 3.813`, matching the claimed `3.81`.

Cap boundary check: SKILL.md lines 390-398 define `D < N` as strict-less-than and list `D16 < 2` as the T1+T2 cap. Stream A lines 432-451 and 667-689 read `D16=2` as at-not-below the cap, which is correct.

Downweight check: SKILL.md lines 563-568 say `rule_version="sca-v3.1"` auto-downweights `0.85x` when sca-v5 is active. W295 `4.16 * 0.85 = 3.536`, rounded to `3.54`, so the W300 downweighted baseline is correct.

T6 verdict files found and W-prefix-glob matched: `W295-all-hands-ai-openhands.md`, `W295-daytonaio-daytona.md`, `W296-anthropics-claude-agent-sdk-python.md`, `W296-astral-sh-uv.md`, `W296-github-spec-kit.md`, `W296-mem0ai-mem0.md`, `W296-oraios-serena.md`.

Ledger rows #12-#18 found at VERDICT-LEDGER.md lines 105-111: `anthropics/claude-agent-sdk-python`, `github/spec-kit`, `astral-sh/uv`, `oraios/serena`, `mem0ai/mem0`, `daytonaio/daytona`, `All-Hands-AI/OpenHands`.

Endpoint drift check: SKILL.md line 513 still says `POST :9077/episodes`; Stream D lines 85-93 record the runtime-discovered endpoint as `/v1/default/banks/{bank_id}/memories`. The synthesis correctly carries this forward as a W301 action.

## Biggest concern

The primary synthesis answer to "is basic-memory really good?" is directionally ratified: yes, conditionally, with hardening and T2 recalibration. The revise verdict is driven by stale arithmetic/summary text in artifacts that are meant to be canonical operator references.

## Verdict justification

No CRITICAL false claim or cardinal-rule breach was found. Stream A's sca-v5 score, D16 cap handling, and W295 downweight arithmetic check out. Stream B's HARDEN-BASIC-MEMORY recommendation is defensible because the head-to-head matrix supports the D3+D4+D14 moat claim, but its TL;DR scores must be corrected to match its own matrix. Stream D executed the seven requested T6 files and ledger rows, but the ledger's appended compliance summary has the wrong denominator and remaining-row count. Therefore the right verdict is REVISE, not BLOCK.
