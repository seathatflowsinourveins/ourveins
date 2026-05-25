# WITHDRAWN-USER-ERROR — Upstream Issue Draft (DO NOT FILE)

> **WITHDRAWN 2026-05-19 (W328 Stream-1)**: This draft is **withdrawn as USER-ERROR-CONFIRMED**. Do NOT file with HuggingFace. Body preserved verbatim below for audit trail only.
>
> **Root cause**: `hub_repo_search.query` is a **substring match on repo IDs only** — not full-text search, not tokenized AND. Multi-word queries like `"claude code mcp agent harness"` correctly return empty because no repo ID contains that exact 5-word substring. This is documented behavior per `https://huggingface.co/docs/huggingface_hub/package_reference/hf_api` docstring `"A string that will be contained in the returned model ids."` and confirmed by `mcp__deepwiki__ask_question` on `huggingface/huggingface_hub` source-code-grounded answer.
>
> **Live empirical proof (W328 Stream-1 reproduction)**: `query="dspy"` (single token) -> 15 results; `filters=["mcp-server"]` (tag, no query) -> 5 trending MCP-server spaces. The tool works correctly when used correctly.
>
> **Correct usage**: see `Z:/claude-sota-installed/docs/architecture/W328-HF-USAGE-CORRECTION/CORRECT-USAGE.md`.
>
> **Original W321 framing of "silent fallback" was operator-misuse**, not upstream defect. Operator pushback validated: 1000s-of-hammered-by-users mature upstream -> bug-on-our-side hypothesis was correct.
>
> --- ORIGINAL DRAFT BELOW (NOT TO BE FILED, kept for audit trail) ---
>
> ~~**OPERATOR-READY** (W328 Stream-C finalization 2026-05-19): run `gh issue create --repo huggingface/huggingface_hub --title "[hf-mcp-server] hub_repo_search returns empty without error for legitimate queries" --body-file Z:/claude-sota-installed/docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/hf-hub-repo-search-silent-fallback.md` to file. Verify repo target first: `huggingface/huggingface_hub` is the primary; if maintainers redirect to a separate `huggingface/hf-mcp-server` repo, re-target via `--repo huggingface/hf-mcp-server`.~~
>
> Repository: `huggingface/huggingface_hub` (primary) or `huggingface/hf-mcp-server` (if separate)
> Filing path: `gh issue create --repo <owner/repo> --title "<title>" --body-file <this file>`
> Wave context: W321 P3 cleanup; closes 7-wave silent-fallback pattern (W314 + W315 + W316 + W317 + W319 + W320 Stream B + W320 Stream G + W320 deeper + W321).
> Cite-anchor classification: SILENT-FALLBACK class per W316-Δ33 codification + W319 cite-refresh chain + W321 cutover-decision.

## Title (≤80 chars, prefix-tagged)

`[hf-mcp-server] hub_repo_search returns empty without error for legitimate queries`

(72 chars; prefix `[hf-mcp-server]` tags the affected component for triage.)

## Summary

The `hub_repo_search` endpoint (via MCP server `hf-mcp-server`) returns an empty result set for queries that should return matches, with no error, no rate-limit warning, no quota message. Convergence-cross-checked against Exa neural-search + WebFetch direct-to-huggingface.co/models confirms candidates exist that `hub_repo_search` does not surface.

## Affected version + environment

- MCP server: `hf-mcp-server` via npx (latest pin)
- Node: v22.x
- Platform: Windows 11 Pro / Z:-portable Claude Code runtime
- Auth state: unauthenticated (no HF_TOKEN set per documented rate-limit guidance)

## Reproduction (7-wave-confirmed, numbered steps)

1. Configure the `hf-mcp-server` MCP entry per `https://hf.co/settings/mcp/` guidance (anonymous mode, no `HF_TOKEN`).
2. Issue the `hub_repo_search` MCP tool-call with one of the following queries:
   - `"deep research agent"`
   - `"DSPy"`
   - `"research orchestrator"`
   - `"autonomous research"`
   - `"academia mcp"`
3. Observe the response: empty result array, no error, no rate-limit warning, no quota message.
4. Cross-source verify the same query against three independent surfaces:
   - Exa `web_search_exa` for `<query>` — returns 10+ matching repos.
   - `WebFetch https://huggingface.co/models?search=<query>` — returns matching repos visible in browser-equivalent rendering.
   - Direct `gh api /search/repositories?q=<slug>` — returns matching repos.
5. Confirm divergence: the MCP tool surface returns 0 results while three independent surfaces confirm 10+ matches exist.

Repro reliability: reproduced across 7 consecutive waves (W314 + W315 + W316 + W317 + W319 + W320 Stream B + W320 Stream G + W321) over multiple weeks. Not a transient state.

## Expected vs Actual

**Expected**: `hub_repo_search` should EITHER:
(a) return matching results (preferred), OR
(b) raise an explicit error indicating rate-limit / quota / auth-required when applicable.

NEVER silently return 0 results when matches exist.

**Actual**: returns an empty result array with no error, no rate-limit signal, no auth-required signal, no quota signal, no telemetry hint that anything was suppressed. The MCP response is structurally identical to a legitimate "0 matches" response for a query that genuinely has no matches.

**Impact severity**: client-side LLM agents cannot distinguish "no results exist" from "results suppressed / rate-limited / error-eaten" — leading to false-negative recommendations downstream.

## Why this matters

Silent 0-result patterns in research-MCP clients cause:
- LLM agents to assume "no candidates exist" → false-negative recommendations
- Downstream tier-routing (T1/T2/T5 reject) to incorrectly classify legitimate candidates as non-existent
- 7-wave convergent evidence across an operator-facing autonomous-research runtime

This is a class of "silent fallback" failure mode (per W316-Δ33 codification) where the client cannot distinguish "no results" from "results suppressed / rate-limited / error-eaten".

## Suggested fix

1. Raise explicit error on rate-limit / quota-exhausted state
2. Surface auth-required messaging when no HF_TOKEN and quota throttled
3. Consider parity with the on-site search UI behavior (same query → same results)

## Related

- HF MCP server source: https://github.com/huggingface/hf-mcp-server (verify path; may be a sub-repo of huggingface_hub)
- Documented anonymous-rate-limit guidance: https://huggingface.co/settings/mcp/
- Convergent silent-fallback class codified at: `https://github.com/.../sota-convergence-audit` (sca-v9 §1 Δ33 Stage-0 existence-probe pattern) — internal SOP that mitigates this class downstream.

## Cite-anchor: silent-fallback wave history

Reproduced + observed across these wave records (operator-internal, evidence-only):
- W314 (initial observation, cited at `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md`)
- W315, W316, W317 (replication confirmation)
- W319 (cite-refresh + cross-model audit catch)
- W320 Stream B + W320 Stream G (twin-stream parallel reproduction)
- W321 (cutover decision — pattern stable enough to file upstream)

Silent-fallback class codified at `docs/architecture/W316-WAVE/Δ33-SILENT-FALLBACK-CODIFICATION.md` (operator-internal).

## Operator action

File via `gh issue create --repo huggingface/huggingface_hub --title "[hf-mcp-server] hub_repo_search returns empty without error for legitimate queries" --body-file Z:/claude-sota-installed/docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/hf-hub-repo-search-silent-fallback.md`. If maintainers redirect to `huggingface/hf-mcp-server` repo, re-target the `--repo` flag. Track for upstream response. If no fix in W324+, codify rotation-to-Exa-neural as canonical W321 §6.7 fallback pattern.
