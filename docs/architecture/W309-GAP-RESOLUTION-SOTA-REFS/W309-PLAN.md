# W309 — Gap Resolution via SOTA-Reference Convergence

> **Wave**: W309
> **Branch**: `sota-converge-w295` (HEAD `54d926d` post-W308-codex-r2-APPROVE)
> **Predecessors**: W308 (4 streams EXECUTE-AND-ROTATE) · operator authorized "gap resolute all with convergence sota references"
> **Started**: 2026-05-19
> **Mandate**: every stream MUST cite ≥3 organizationally-distinct SOTA-references per W292 EVOLVE pattern + sca-v5 §5.5 Phase-5 5-gate

## §0 TL;DR

4 parallel streams closing 4 specific carry-forward HIGH operator-action items autonomously (no UI rotation; no operator-only ops). Each stream cite-anchors ≥3 SOTA refs.

## §1 Stream definitions

### Stream A — OthmanAdi/planning-with-files Phase-5 audit (closes 9-wave-pending HIGH)

- **Owner**: `agent-A-othmanadi-phase5`
- **Owned file**: `docs/architecture/W309-GAP-RESOLUTION-SOTA-REFS/W309-STREAM-A-OTHMANADI-PHASE5-AUDIT.md`
- **Mandate**: Per sca-v5 §5.5 Phase-5 5-gate framework, audit the `OthmanAdi/planning-with-files` T1 INSTALL verdict (row 3 W291.Stage2; settings.json:232=true; pending 9 waves). Produce Phase-5 gate-pass evidence OR recommend deactivation.
- **Gates to evaluate**:
  - Gate-1 provenance re-fetch (KILT-grade) — re-fetch the W291.Stage2 cite URLs; verify they resolve + snippets support claims
  - Gate-2 paraphrase-invariance (HELM-grade) — re-pose typed-evidence claims in 3 paraphrases; verify holds
  - Gate-3 adversarial-blinded judge (MT-Bench-grade) — re-fire 3-persona under blinded protocol (no slug/author/star metadata); check verdict-shift
  - Gate-4 contamination + staleness (SWE-bench-grade) — was the candidate's claimed benchmark contaminated with public-eval data?
  - Gate-5 replayable + ≥3-org diversity (BIG-bench + lm-eval-harness) — verify typed-evidence orgs are ≥3 organizationally-distinct + replayable
- **SOTA-refs to cite**: KILT benchmark + HELM Robustness + MT-Bench §2.3 + SWE-bench Verified + BIG-bench + lm-eval-harness + AlpacaEval LCAE
- **Deliverable**: ≤500 LOC. Phase-5 5-gate per-gate verdict + composite verdict (RATIFY-T1 / DOWNGRADE-T2 / DEACTIVATE / RE-LITIGATE-W310).

### Stream B — Phoenix MCP entry cleanup (autonomous; OTLP already repointed)

- **Owner**: `agent-B-phoenix-cleanup`
- **Owned files**:
  - `.mcp.json` (EDIT — remove phoenix entry OR mark as commented-disabled)
  - `docs/architecture/W309-GAP-RESOLUTION-SOTA-REFS/W309-STREAM-B-PHOENIX-CLEANUP.md` (NEW)
- **Mandate**: Per side-channel `baab2df` repointing OTLP `:16006 → :3000` Langfuse OTel-receiver, the Phoenix MCP entry at `.mcp.json:103-107` no longer has a live backend. Audit + clean.
- **Investigation steps**:
  1. Verify `.mcp.json:103-107` phoenix entry exists + current state
  2. Probe `127.0.0.1:16006` — confirm CLOSED
  3. Search recent waves for any tool-call to `mcp__phoenix__*` — if zero usage in last 3 waves, removal is safe
  4. Check `settings.json:disabledMcpjsonServers` for phoenix (may already be added)
- **Action options**:
  - **A**: Remove phoenix entry from `.mcp.json` entirely (cleanest; reversible via `git revert`)
  - **B**: Add `"phoenix"` to `settings.json:disabledMcpjsonServers` (less destructive; preserves entry for inspection)
  - **C**: Leave as-is + document in W309-STREAM-B (defer)
- **SOTA-refs**: Anthropic MCP spec `.mcp.json` schema + OpenTelemetry OTLP HTTP exporter contract
- **Deliverable**: ≤200 LOC design doc with chosen action + rollback + smoke (post-action: `mcp__phoenix__*` should be removed from tool surface on next session reload).

### Stream C — CLAUDE.md R2 broadening APPLY (executes Stream D W308 surface-only diff)

- **Owner**: `agent-C-claude-md-r2-apply`
- **Owned files**:
  - `CLAUDE.md` (EDIT — apply R2 broadening diff per W308 Stream D)
  - `docs/architecture/W309-GAP-RESOLUTION-SOTA-REFS/W309-STREAM-C-CLAUDE-MD-R2-APPLIED.md` (NEW)
- **Mandate**: Apply the R2 broadening diff drafted in `W308-STREAM-D-CLAUDE-MD-PENDING.md §2`. Resolve `#46915` placeholder via Anthropic claude-code GitHub research.
- **Steps**:
  1. Read CLAUDE.md current state (should be 43 LOC)
  2. Read W308-STREAM-D-CLAUDE-MD-PENDING.md §2 diff
  3. Resolve #46915 placeholder: search `https://github.com/anthropics/claude-code/issues` for the actual issue that context-mode-cache-heal.mjs patches. If specific issue # not findable, use a generic citation OR mark as "internal context-mode plugin bug" without specific issue #.
  4. Apply the R2 broadening Edit to CLAUDE.md
  5. Verify CLAUDE.md LOC ≤50 post-apply (estimated ~45-46)
  6. Run cardinal-rule conformance grep on new R2 text (no R2 self-contradiction)
  7. Smoke: `wc -l CLAUDE.md` + JSON-syntax-validate (n/a; .md file) + cardinal-rule taxonomy preserved
- **Constraints**:
  - R2 EDIT only — do NOT modify R1/R3/R4 (already reversed)/R5
  - CLAUDE.md LOC cap ≤50 (currently 43; new R2 adds ~3 LOC; should stay ≤46)
- **SOTA-refs**: Anthropic CC settings docs + W286-arc-P0C CR-9 + OpenSSF Scorecard supply-chain pattern
- **Deliverable**: ≤200 LOC design doc with applied diff + LOC count + cardinal-rule conformance grep evidence.

### Stream D — Lane-D HuggingFace dataset loader skeleton (extends W308 Stream C)

- **Owner**: `agent-D-lane-d-hf-loader`
- **Owned files**:
  - `harness/adapters/memory_recall/_longmemeval_loader.py` (NEW — HuggingFace LongMemEval dataset loader skeleton)
  - `harness/adapters/memory_recall/mem0.py` (EDIT — extend `_run_longmemeval` to call loader)
  - `harness/adapters/memory_recall/alma_memory.py` (EDIT — same)
  - `harness/adapters/memory_recall/agentmemory.py` (EDIT — same, with JSON-fixture shortcut per W305 §0.bis Cal-3)
  - `docs/architecture/W309-GAP-RESOLUTION-SOTA-REFS/W309-STREAM-D-HF-LOADER.md` (NEW)
- **Mandate**: Implement the `_longmemeval_loader` module that loads HuggingFace `letta-ai/LongMemEval` dataset (or operator-configurable HF dataset slug) with caching to `Z:/claude-sota-installed-state/lane-d-cache/`. Extend the 3 adapters' `_run_longmemeval` to call the loader instead of raising NotImplementedError.
- **Loader interface**:
  ```python
  def load_longmemeval_split(
      split: str = "test",
      sample_size: int = 10,
      cache_dir: str = "Z:/claude-sota-installed-state/lane-d-cache",
      dry_run: bool = False,
  ) -> list[dict[str, Any]]:
      """Load LongMemEval queries from HuggingFace.
      
      Returns: list of dicts with keys: query_id, query, gold_relevant_ids, context_passages.
      
      For dry_run=True: returns 3 deterministic mock queries (no HF download).
      For dry_run=False: requires `datasets` package + network; raises clear ImportError if not installed.
      """
  ```
- **Adapter integration**:
  - mem0: `_run_longmemeval` calls `load_longmemeval_split()` then loops: `m.add()` each context + `m.search(query)` then compute R@5 against gold_relevant_ids
  - alma: same pattern with `a.learn() + a.retrieve()`
  - agentmemory: PREFERRED shortcut — read pre-computed JSON fixtures from `https://raw.githubusercontent.com/rohitg00/agentmemory/main/benchmark/data/longmemeval_results_bm25.json` (302 KB) instead of re-running benchmark; ~$0 cost
- **SOTA-refs**: HuggingFace `datasets` library + Letta Leaderboard methodology + LongMemEval paper + MTEB benchmark conventions
- **Deliverable**: ≤300 LOC loader + ≤30 LOC additions per adapter + ≤200 LOC design doc. Smoke: `python harness/eval_harness.py --mode memory-recall-lane --candidate mem0ai/mem0 --memory-corpus longmemeval --memory-sample-size 10 --wave 309 --dry-run` should exit 0 with skeleton fixture (no HF download).

## §2 Cardinal-rule invariants — must hold post-wave

- CLAUDE.md ≤50 LOC (currently 43; Stream C will land at ~45-46)
- settings.json ≤15 KB (currently 14.32 KB)
- `self_invented_count: 0`
- 6-tier memory unchanged
- T6 basic-memory + VERDICT-LEDGER 3-target contract preserved

## §3 Synthesis + codex gate

After all 4 streams complete:
1. Parent reads each stream deliverable
2. Parent writes `W309-SYNTHESIS-2026-05-19.md`
3. Append VERDICT-LEDGER row for Stream A Phase-5 verdict (if RATIFY-T1 or DOWNGRADE-T2 or DEACTIVATE)
4. T6 basic-memory write for Stream A verdict
5. Dispatch codex GPT-5.5 e2e gate via codex:codex-rescue
6. Address HIGH inline; MEDIUM defer per W288/W289 precedent
