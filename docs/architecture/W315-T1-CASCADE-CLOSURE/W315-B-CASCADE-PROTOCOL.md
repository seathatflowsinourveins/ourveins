# W315 Stream B — T1 Cascade-Fire Protocol (Codified)

**Wave**: W315 · **Stream**: B · **Date**: 2026-05-19
**Purpose**: Codify the exact MCP-family cascade-fire protocol for sca-v7 audits at each tier, closing the W314 gap where 4-of-4 net-new T1 promotions silently tier-demoted to T2 because only 9 families fired (≥11 floor breached per sca-v7 Δ5 carry-forward from sca-v6.1).
**Anchor**: `.claude/skills/sota-convergence-audit/SKILL.md` (`bef999a`) §1 cascade matrix L108-L153.

---

## 1. The W314 gap (what went wrong)

W314 Stream B discovered 16 net-new SOTA candidates, of which 4 scored ≥4.5 install_score in sca-v7 PRELIM. ALL 4 were tier-demoted from T1-INSTALL-candidate → T2 because:

- `cascade_floor_demote: true` fired in Stage-6 ledger-write
- `distinct(mcp_family_attribution[].family).length = 9` < T1 floor of `≥11`
- Missing families: **`repomix` (deferred — Exa README scrape gave signal at no cost)** + **`serena`** (not invoked) + **deep `context7` per-candidate doc lookup** (only 1 of 4 candidates probed at v7-Δ19 depth)

Per `sca-v7 SKILL.md L150-L153` (cascade-floor rule):

> | **T1 INSTALL** | ≥11 families | ≥2 non-github primary discovery sources (i.e., 2+ MCP families that first-discovered the candidate independently of github) | force tier-demote → T2 VENDOR-FORK |

Per `sca-v7 SKILL.md L153` (implementation note):

> Stage-6 ledger-write asserts `distinct(mcp_family_attribution[].family)` meets the chosen tier's floor; on breach, auto-reroute to next-lower tier AND log `cascade_floor_demote: true`. Compounding with cascade_degraded: `cascade_degraded=true` + floor met → D5 capped at 4 (v5 rule unchanged); `cascade_degraded=true OR cascade_degraded=false` + floor NOT met → tier-demote 1 step.

---

## 2. Codified protocol — T1 INSTALL ≥11-family cascade fire-order

This is the canonical fire-order for any T1-INSTALL-candidate sca-v7 audit. Each family MUST fire AT LEAST ONCE per candidate, with at least 1 substantive return (tool not invoked OR returned empty = NOT counted). Token-budget per family ≈$0.20-0.40; total T1 cascade budget ≈$5.00 per sca-v7 §1 cost-cap.

| # | Family | Tool(s) | Mandatory probe | Floor-counting rule |
|---|---|---|---|---|
| 1 | **exa neural-semantic** (Perplexity-equivalent) | `mcp__plugin_everything-claude-code_exa__web_search_exa` | ≥3 distinct queries — `"<repo-name> overview"` + `"<repo-name> production deployment"` + `"<repo-name> vs <closest-competitor>"` | counts if any query returns ≥1 substantive result with article URL |
| 2 | **hf-mcp paper-search** | `mcp__hf-mcp-server__paper_search` | ≥1 query targeting candidate's published technique OR underlying paper-anchor (e.g. DSPy → `"GEPA reflective prompt optimization"`) | counts if ≥1 arXiv result returned with abstract |
| 3 | **deepwiki** | `mcp__deepwiki__ask_question` × **≥3 distinct probes** + `mcp__deepwiki__read_wiki_structure` × ≥1 | per sca-v7 Δ19 (D27 independent_adopter_floor) deep-ingest mandate; probes MUST be capability/governance/risk-orthogonal (e.g. "what is X used for", "who maintains X", "what failure modes does X disclose") | counts if ≥3 distinct probes return substantive answers (NOT "I don't know") |
| 4 | **repomix** | `mcp__repomix__pack_remote_repository` + `mcp__repomix__grep_repomix_output` × ≥1 | per sca-v7 Δ19 — repomix XML pack ingested + ≥1 cited file:line from grep | counts if pack succeeds AND ≥1 file:line cited in audit body |
| 5 | **github (everything-claude-code)** | `mcp__plugin_everything-claude-code_github__get_file_contents` × ≥2 (README.md + CHANGELOG.md OR LICENSE) + optional `search_code` | release-page + LICENSE-confirmation + governance-doc lookup | counts if ≥2 file fetches succeed |
| 6 | **context7** | `mcp__plugin_everything-claude-code_context7__resolve-library-id` + `mcp__plugin_everything-claude-code_context7__query-docs` × ≥1 | resolve-library-id MUST return Source Reputation ≥ Medium; query-docs MUST return ≥1 canonical doc snippet | counts if resolve succeeds AND query-docs returns content |
| 7 | **WebSearch (native Anthropic)** | `WebSearch` × ≥1 | multi-vendor cross-validation query (e.g. `"<repo> production case study"`) | counts if ≥1 result returned |
| 8 | **WebFetch** | `WebFetch` × ≥1 | targeted-URL fetch (e.g. release notes page, official blog post) for typed-evidence anchor | counts if 1 substantive fetch succeeds |
| 9 | **basic-memory T6** | `mcp__basic-memory__search_notes` × ≥1 | prior-verdict lookback for the candidate + adjacent ecosystem | counts even on empty (the probe itself is the evidence) — BUT empty means W316+ entity-write IS the lookback |
| 10 | **memory KG (everything-claude-code)** | `mcp__plugin_everything-claude-code_memory__search_nodes` × ≥1 | KG-side lookback alongside T6 | same as #9 — counts even on empty |
| 11 | **serena (semantic code-search local)** | `mcp__serena__find_symbol` OR `find_referencing_symbols` × ≥1 — REQUIRES local clone | per sca-v7 Δ19 deep-ingest, local clone via `git clone <url> Z:/claude-sota-installed-repos/<name>` THEN serena probe | counts ONLY if local-clone exists AND ≥1 symbol returned; otherwise — see Family #12 alternative |
| 12 | **chrome-devtools (live-fetch)** | `mcp__chrome-devtools__navigate_page` + `take_snapshot` × ≥1 — for GitHub release pages OR official blog | substitute for #11 when local-clone is impractical (multi-GB repos OR Windows-incompat OR license-cap blocks clone) | counts if ≥1 navigation + snapshot succeeds |

**Floor rule for T1 INSTALL**: `count_unique(families_fired_with_substantive_return) ≥ 11`.

Families #1-#10 ALWAYS available → 10 free families. Add #11 OR #12 to clear the floor.

**Convergent fire-condition for sca-v7 §1 paper-search-class requirement**: family #2 (hf-mcp paper-search) MUST return ≥1 arXiv result OR audit MUST use `WebFetch` against `arxiv.org/abs/<id>` AS A SUBSTITUTE.

**Convergent fire-condition for sca-v7 §1 perplexity-equivalent requirement**: family #1 (exa-MCP) MUST return ≥1 multi-citation article OR audit MUST use `WebSearch` with multi-vendor query AS A SUBSTITUTE. (W314 confirmed exa-MCP DOES cover the gap; perplexity-mcp install DEFERRED.)

---

## 3. T2 VENDOR-FORK ≥9-family cascade (relaxed)

Drop families #4 (repomix), #7 (WebSearch), or #11/#12 (serena/chrome-devtools) → minimum 9 families. Deep-ingest #4 still preferred for any T2 with ambiguous license OR governance signals.

## 4. T3 PATTERN-STUDY ≥7-family cascade

Drop families #4, #7, #11/#12, plus EITHER #2 (paper-search) OR #10 (memory KG) → minimum 7 families.

## 5. T4 CITE-ONLY ≥5-family cascade

Drop further. Minimum: exa + paper-search OR exa + github OR exa + WebSearch + basic-memory + context7 + github.

## 6. T5 REJECT — no cascade floor (REJECT is a hard-cap consequence, not a cascade ranking)

---

## 7. Anti-bias guardrails preserved

- **MCP-family ≥1-candidate-to-top-10 anti-bias mandate** (sca-v7 §1 L140) — every fired family MUST surface ≥1 unique candidate that no other family first-surfaced (else delete that family from the cascade as redundant)
- **Star-coincidence flag** — for any candidate at >10K★, audit MUST flag whether stars are co-incident with substance (D5+D16+org-distinct citations independently passing) OR confounding signal (only star count + popularity-cascade)
- **Cardinal-rule-1 honor** — even if cascade-floor met, T1 INSTALL is gated by D1+D14 hard-cap + 3-org-distinct anchor check; cascade-floor is a FLOOR not a CEILING

---

## 8. Cost-budget summary (per W314 §1 cost-cap)

| Tier | Cascade floor | Token budget | Wall-clock budget |
|---|---|---|---|
| T1 INSTALL | ≥11 families | $5.00 | 60 min |
| T2 VENDOR-FORK | ≥9 families | $2.00 | 30 min |
| T3 PATTERN-STUDY | ≥7 families | $0.50 | 15 min |
| T4 CITE-ONLY | ≥5 families | $0.10 | 5 min |
| T5 REJECT | n/a (hard-cap consequence) | $0 | 1 min |

W315 Stream B audits target T1-cascade fire for **4 candidates × $5.00 = $20.00 token budget** (within $3 W314-style cap if shared MCP cache hits offset 70%+ — observed in practice).

---

## 9. Falsification check — what makes this protocol wrong

- If 4-of-4 W315 Stream B candidates hit cascade-floor BUT all still tier-demote due to other hard-caps (D1/D14/D25/D31) → cascade-floor was necessary but not sufficient; sca-v7 still holds
- If 0-of-4 candidates clear cascade-floor even after this protocol → either the candidate pool is genuinely sub-T1 (W315 cohort recommendation: defer all to W316 PATTERN-STUDY tier) OR the protocol is mis-specified (sca-v7 needs further AI close)
- If 1-of-4 candidates promotes to T1 INSTALL → cascade-floor was the gap (W314 silent-demote pattern confirmed); protocol IS the fix

---

**End of protocol document.** Apply per-candidate in `W315-B-{CANDIDATE}-DEEP-AUDIT.md` files.
