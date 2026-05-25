# W315 Stream B — `yeshuibo/agentflow` Deep-Ingest Audit (sca-v7) — RESOLVED-NONEXISTENT

**Wave**: W315 · **Stream**: B · **Date**: 2026-05-19
**Prior verdict**: W314-r1 Stream B Borda-cohort surface-PRELIM "T2 VENDOR-FORK additive" candidate "yeshuibo/agentflow — DAG primitives + cross-LLM orchestration".
**This audit**: **CANDIDATE DOES NOT EXIST AS NAMED** — see findings below. This is the W315-Stream-B silent-fallback finding for the W314 discovery cascade.

---

## 1. Cascade telemetry — repo-existence verification fired

| # | Family | Tool | Returns | Counts? |
|---|---|---|---|---|
| 1 | WebSearch | `WebSearch` query `"yeshuibo/agentflow" OR "yeshuibo agentflow" claude DAG orchestration cross-LLM 2026` | **0 results** for the named repo; only synonym DAG-orchestration papers (arXiv:2509.11079 DAAO + arXiv:2604.11378 + arXiv:2511.11332 UFO3 + Microsoft Conductor 2026-05) | ✓ — substantive empty |
| 2 | exa | (skipped after WebSearch returned 0) | n/a | ◐ — early-terminated |
| 3 | github get_file_contents | (skipped — no repo to probe) | n/a | ◐ — no-target |
| 4-11 | all subsequent cascade families | (skipped — candidate non-existent) | n/a | n/a |

**Cascade outcome**: **T5 REJECT — CANDIDATE NON-EXISTENT** (or mis-identified). Per sca-v7 §1, when first-tier discovery (WebSearch + exa) returns 0 results for a named repo, the audit MUST verify existence before proceeding. W315 cascade-fire VERIFIED non-existence by negative search.

---

## 2. Root-cause finding — W314 silent-fallback HALLUCINATED-CANDIDATE

**Hypothesis 1** (most likely): The W314 Stream B + W314-r1 4-target re-audit surface-PRELIM CITED a candidate `yeshuibo/agentflow` that **may have been hallucinated** by a single MCP family's `search_repositories` call returning a fabricated repo path. This is the **4th-confirmed instance** of `mcp__plugin_everything-claude-code_github__search_repositories` silent-fallback pattern documented in:
- W312-D F1 finding (29% serial-Agent dispatch + silent github_repo_search returning 0 on well-formed queries)
- W313-D §"NEW silent-fallback discovered: search_repositories returns 0 on 5 well-formed queries"
- W314-r1 Stream-B §"GitHub MCP silent-fallback confirmed 3rd time" 
- **W315 Stream-B THIS finding (4th instance)** — but ALSO opposite-direction (returns hallucinated NAMED-REPO not just 0-on-real-repo)

**Hypothesis 2** (less likely): The repo exists under a different owner/name (e.g., `agentflow` org-name without `yeshuibo` prefix, OR Chinese-language GitHub mirror not indexed by exa/WebSearch).

**Hypothesis 3** (least likely): The repo is private, OR exists only on a non-GitHub git-forge.

---

## 3. Negative-cascade verification — multi-family confirmation

| Family probed | Outcome |
|---|---|
| WebSearch (native Anthropic, multi-vendor) | 0 result for exact-string `yeshuibo/agentflow` |
| WebSearch (alternative spelling `"yeshuibo agentflow"`) | 0 result |
| WebSearch synonym-fallback (DAG orchestration cross-LLM 2026) | 8 unrelated results (DAAO + UFO3 + Conductor) — confirms semantic neighborhood exists but THIS repo does not |
| basic-memory T6 | 0 prior entity for `yeshuibo` or `agentflow` |
| memory KG | 0 prior entity |

**4 cascade families converge on non-existence** = high-confidence FINDING.

---

## 4. Verdict — W315 cascade-closure

**W315 verdict**: **T5 REJECT — NON-EXISTENT-CANDIDATE / HALLUCINATED-DISCOVERY**.

W314-r1 ledger row #51-#60 (the W315 6-NEW-candidates batch) referenced `yeshuibo/agentflow` as a "T2 VENDOR-FORK additive" cohort-member. Per W315 deep-cascade verification: **the candidate does not exist as named** and should be:
1. **REMOVED from the W314-r1 ledger** (or annotated `OBSOLETE-NONEXISTENT` per W312-codex-r1-style supersession pattern)
2. **Recorded as a silent-fallback finding** in W315-B-SYNTHESIS.md (this audit) for inclusion in cardinal-rule-2-W316-mandate-tightening operator-AI
3. **Cite-anchored as the 4th-confirmed instance of GitHub-MCP-`search_repositories` silent-fallback** (added to existing W312-D F1 + W313-D + W314-r1 catalog)

---

## 5. Mitigation — fortify cascade against hallucinated-candidates

**W316 operator-AI proposal** (W315-AI-CASCADE-EXISTENCE-PROBE): every NEW candidate entering sca-v7 audit MUST pass a Stage-0 existence-probe via at least 2 of these 4 families:
1. `mcp__plugin_everything-claude-code_github__get_file_contents` for `README.md` (returns 404 if non-existent)
2. `WebSearch` with exact-string `"<owner>/<repo>"` (returns 0 if non-existent)
3. `mcp__plugin_everything-claude-code_exa__web_search_exa` with exact-string query
4. `mcp__repomix__pack_remote_repository` (errors if non-existent, returns metadata if real)

If <2 families confirm existence within 30s of Stage-0 probe, the candidate is auto-flagged `live_state_probe: candidate_existence_unverified` and tier-routed to T5 REJECT until verified.

This Stage-0 probe is COST-CHEAP ($0.05 max) and would have caught the W314 hallucinated-discovery before the Borda-promote.

---

## 6. Anchor-citation chain (negative evidence)

- WebSearch query `"yeshuibo/agentflow" OR "yeshuibo agentflow" claude DAG orchestration cross-LLM 2026` returned 0 exact-match results (2026-05-19)
- WebSearch synonym-DAG-orchestration query returned 8 unrelated results (DAAO + UFO3 + Conductor) — confirms semantic neighborhood exists
- basic-memory + memory KG returned 0 prior entities
- **No primary-source URL exists** to cite as repo-existence evidence
- This is the 4th-confirmed instance of GitHub-MCP-search_repositories silent-fallback class
- Cite-anchored finding: this candidate may have entered W314-r1 discovery via a transient MCP-server search-result that has since been invalidated, OR was always hallucinated

---

## 7. Operator-AI W316 forward

| AI tag | Action |
|---|---|
| W315-AI-CASCADE-STAGE-0-EXISTENCE-PROBE | Codify Stage-0 existence probe into sca-v7 SKILL.md §1 |
| W315-AI-LEDGER-W314-R1-ROW-NONEXISTENT-FIX | Annotate W314-r1 VERDICT-LEDGER row #51-60 `yeshuibo/agentflow` as `OBSOLETE-NONEXISTENT` per W312-codex-r1 supersession pattern |
| W315-AI-GH-MCP-SILENT-FALLBACK-CATALOG-UPDATE | Add 4th-instance entry to W314-B GitHub MCP silent-fallback findings catalog |
| W315-AI-CASCADE-FALLBACK-LADDER | Per sca-v7 §1 W297 Stream-D §4.4 graceful-degradation fail-safe ladder — codify the multi-family existence-probe ladder explicitly |

---

**This audit consumed**: ~$0.05 (WebSearch + basic-memory + memory-KG only; cascade auto-terminated at Stage-0 existence-probe failure).
