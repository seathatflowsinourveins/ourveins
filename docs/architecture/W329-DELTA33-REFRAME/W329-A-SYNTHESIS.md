# W329-A — Δ33 Reframe + Stage-0.5 ENUMERATION-BYPASS Synthesis

> **Owner**: W329 Stream-A (2026-05-19)
> **Scope**: apply downstream-debt corrections from W328 to `sota-convergence-audit/SKILL.md` per operator principle (2026-05-19): "mature repos = look at your own usage first; if rate-limited, use GraphQL / cursor / dataset-snapshot / BigQuery"
> **Closes**: W328-S1 (HF USER-ERROR-CONFIRMED) + W328-S2 (GH-MCP USER-ERROR-CONFIRMED) downstream debt against the sca-v* rubric

---

## §1. LOC delta on SKILL.md

| Metric | Pre-W329 (sca-v12) | Post-W329 (sca-v12.1) | Delta |
|---|---|---|---|
| SKILL.md LOC | 413 | 449 | +36 |
| `references/dimensions.md` LOC | 204 | 204 (untouched per brief) | 0 |
| `references/stage-0-bypass-cascade.md` LOC | (n/a) | 188 | +188 (NEW) |
| 500-LOC cap headroom | 87 | 51 | -36 |

Net: SKILL.md remains 51 LOC under the 500-LOC cap. Detail (paste-ready queries + rate-limit table) pushed to `references/stage-0-bypass-cascade.md` per CLAUDE.md cardinal pointer-only discipline.

---

## §2. Δ33 reframe — before/after one-liner

**BEFORE (sca-v12 §1)**:
> "Mandatory PRE-cascade gate. ... Closes 4-wave silent-fallback (W312-D F1 + W313-D + W314-r1 + W315-B `yeshuibo/agentflow`)."

**AFTER (sca-v12.1 §1)**:
> "v12.1 reframe (W329 per W328-S1+S2 USER-ERROR-CONFIRMED): the prior 5-wave 'GitHub-MCP / HF-MCP silent-fallback' narrative is WITHDRAWN — both MCPs behave per their documented API contracts. The failure was operator queries using invalid qualifiers, not upstream bugs. The Stage-0 multi-family probe pattern is RETAINED but reframed: **choose the right tool for the job.**"

### Probe table reshape (concrete)

- **Family 1 (was)**: `search_repositories <slug>` AND `__get_file_contents` — generic "one returns hit"
- **Family 1 (now)**: `get_repository {owner, repo}` — direct `GET /repos/{owner}/{repo}`; non-404 = exists. **Canonical Stage-0 probe per W328-S2.**
- **Family 2 (was)**: github-REST fallback `gh api /search/repositories?q=<slug>`
- **Family 2 (now)**: `__search_repositories` with explicit valid-qualifier whitelist (`topic:` / `language:` / `stars:` / `pushed:` / `created:` / `fork:` / `in:name` / `in:readme` / `user:` / `org:`) + explicit anti-pattern blacklist (`repo:owner/name`, `owner:<owner>`)
- **Family 4 (NEW)**: hf-MCP `hub_repo_search` with single-token `query` OR `filters: [<tag>]` discipline; multi-word free-text BLACKLISTED per W328-S1
- **Families 5-8**: deepwiki + WebFetch + repomix + serena — unchanged

The "right-tool-for-job mandate" subsection codifies the qualifier discipline and explicitly states: ANY anti-pattern usage → DO NOT count the 0-result as "silent fallback evidence"; that is a query-construction error, not an MCP defect.

---

## §3. Stage-0.5 cascade structure (one-line summary)

**§1.5 Stage-0.5 ENUMERATION-BYPASS Gate** fires when search-family is involved AND any of: (a) GraphQL sizing-probe returns `repositoryCount > 1000`; (b) HF exhaustive enumeration required; (c) D33 quorum cross-source corroboration required → mandates HF M5 DuckDB `cfahlgren1/hub-stats` parquet (primary) + M1 cursor-walk (delta) for HF, AND a 6-step GitHub cascade (GraphQL sizing → date/stars binary-split window-partition → cursor pagination per window → BigQuery `bigquery-public-data.github_repos` cross-validate → ecosyste.ms star-independent signals → GH Archive `githubarchive.day.*` trending velocity), with anti-bias mandate that ≥1 top-10 candidate be first-discovered by a non-MCP bypass method.

Paste-ready queries (GraphQL `EnumerateMCPServers` + DuckDB SQL + 2 BigQuery SQL templates) + rate-limit bucket → bypass-method mapping table live at `references/stage-0-bypass-cascade.md` (188 LOC).

---

## §4. references/stage-0-bypass-cascade.md structure

| Section | Content | LOC |
|---|---|---|
| §A Stage-0 EXISTENCE correct-usage | A.1 GitHub-MCP (4 patterns + anti-patterns) + A.2 HF-MCP (3 patterns + anti-patterns) | ~30 |
| §B Stage-0.5 ENUMERATION-BYPASS | B.1 HF M5 DuckDB SQL + `hf datasets sql` shortcut + M1 Python cursor walk; B.2 GH 6-step cascade with paste-ready GraphQL `EnumerateMCPServers` + 2 BigQuery SQL (sample_repos + githubarchive.day.*) | ~100 |
| §C Rate-limit bucket mapping | 7-bucket table (HF Hub APIs / HF Resolvers / HF Webhooks / GH REST core / GH REST search / GH GraphQL / BigQuery / ecosyste.ms) with quota + bypass-method-mapping | ~15 |
| §D 3-org-distinct cite anchors | Stage-0 EXISTENCE: 3 anchors (GitHub/Microsoft docs + HF Inc + github-mcp-server maintainers); Stage-0.5 BYPASS: 6 anchors (GitHub/Microsoft + Google Cloud + HF community-org + OSSF + ecosyste.ms + GitHub Community) | ~25 |

Total: 188 LOC (under 200-LOC reference cap).

---

## §5. 3-org-distinct cite count

### SKILL.md §1 (Stage-0 EXISTENCE correct-usage anchors)

| # | Anchor | Org |
|---|---|---|
| 1 | `docs.github.com/en/search-github/searching-on-github/searching-for-repositories` | GitHub / Microsoft |
| 2 | `huggingface.co/docs/huggingface_hub/package_reference/hf_api` | Hugging Face Inc |
| 3 | `github.com/github/github-mcp-server` `pkg/github/search.go` | github-mcp-server maintainers (deepwiki-verified org-distinct) |
| 4 (supp) | W328 internal-but-anchored deliverables (S1 + S2 + S3 + S4) | this runtime audit chain |

### SKILL.md §1.5 (Stage-0.5 BYPASS anchors)

| # | Anchor | Org |
|---|---|---|
| 1 | `docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` | GitHub / Microsoft |
| 2 | `cloud.google.com/bigquery/public-data/github` | Google Cloud / Alphabet |
| 3 | `huggingface.co/datasets/cfahlgren1/hub-stats` | HF community-org (distinct from huggingface main-org per W328-S3 §6) |
| 4 (supp) | `github.com/ossf/criticality_score/cmd/enumerate_github` | OSSF / Linux Foundation |
| 5 (supp) | `repos.ecosyste.ms/docs` + `blog.ecosyste.ms/2025/09/01/rate-limiting-the-right-way.html` | ecosyste.ms |
| 6 (supp) | GitHub Community Discussions `#64629`, `#109517` | GitHub Community (separate org-track from official docs) |

### references/stage-0-bypass-cascade.md §D

Same 9 organisations across the cascade (3+3 mandatory + 3 supplementary in each section).

### Δ33 reframe-section total

- §1: 3 mandatory + 1 supplementary (W328 S1-S4 deliverable chain) = 4 distinct orgs
- §1.5: 3 mandatory + 3 supplementary = 6 distinct orgs
- references/stage-0-bypass-cascade.md: 9 distinct orgs across both sections

**Aggregate**: 9 distinct cite-orgs (GitHub/Microsoft + Google Cloud + Hugging Face Inc + HF community-org `cfahlgren1` + github-mcp-server maintainers + OSSF/Linux Foundation + ecosyste.ms + GitHub Community + W328 internal-audit chain) — comfortably exceeds W295 I1 ≥3-org-distinct discipline per dim / per section.

---

## §6. Deferred items

| # | Item | Reason for deferral | Owner |
|---|---|---|---|
| 1 | Update `goal-prompt-synthesis` skill to adopt qualifier-discipline whitelist | Not in W329-A scope (W329 brief OWN-ONLY = SKILL.md + new ref + this synthesis dir) | future W329-B or W330 wave |
| 2 | Backfill `stage_0_5_enumeration_bypass: <method-id\|null>` field in existing sca-v12 verdict ledger rows | Optional per v12.1 lineage line; non-blocking for new verdicts | operator at next ledger sync |
| 3 | Update `docs/architecture/W283-stream2-research-arch.md` L90, `W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md` L146, `W288-RESEARCH-ARCH-v2/STREAM-D-INGEST-PIPELINE.md` Stage 1 with qualifier-discipline examples per W328-S2 §"Skill / doc updates required" | Architecture docs outside W329-A file-ownership envelope | future ARCH-docs sweep wave |
| 4 | Reword references in earlier waves (W312-D / W313-D / W314-r1 / W315-B) that cite "silent-fallback" as the canonical interpretation | Historical audit-trail; sca-v12.1 lineage line documents the WITHDRAWAL | preserve as-is per audit-trail discipline |
| 5 | Optional `D67 right_tool_qualifier_compliance` dim — score 0-5 on whether the candidate's first-discovery probe used correct-usage qualifiers (anti-pattern usage → 0; full whitelist compliance → 5) | Brief explicitly forbids new dims ("DO NOT add new dimensions (no D67+; this is REFRAME-only)") | future scoring-wave |

---

## §7. Diff inventory (file-level)

| File | Action | LOC change |
|---|---|---|
| `.claude/skills/sota-convergence-audit/SKILL.md` | Edit (header version + lineage line + §1 reframe + §1.5 NEW + v12.1 lineage row) | 413 → 449 (+36) |
| `.claude/skills/sota-convergence-audit/references/stage-0-bypass-cascade.md` | NEW | 0 → 188 (+188) |
| `.claude/skills/sota-convergence-audit/references/dimensions.md` | UNTOUCHED per brief | 0 |
| `docs/architecture/W329-DELTA33-REFRAME/W329-A-SYNTHESIS.md` | NEW (this file) | — |

---

## §8. Verification checklist

- [x] SKILL.md ≤500 LOC cap maintained (449 / 500 = 51 LOC headroom)
- [x] references/stage-0-bypass-cascade.md ≤200 LOC cap (188 / 200)
- [x] dimensions.md untouched
- [x] No new dimensions added (REFRAME-only per brief)
- [x] 3-org-distinct cites per scored dim (W295 I1) — §1 has 3+1 supplementary, §1.5 has 3+3 supplementary; references/ has 6 anchors total
- [x] Δ33 silent-fallback narrative WITHDRAWN per W328-S1/S2 USER-ERROR-CONFIRMED
- [x] "Right-tool-for-job" framing explicit per W329 brief
- [x] Stage-0.5 ENUMERATION-BYPASS gate created with HF M5 + GH 6-step cascade
- [x] Paste-ready queries (GraphQL `EnumerateMCPServers` + DuckDB SQL + 2 BigQuery SQL) in references/
- [x] Rate-limit bucket → bypass-method mapping table in references/
- [x] Cite-anchors include `docs.github.com` search-qualifiers page (external) + W328 S1/S2/S3/S4 internal deliverable chain
- [x] Pre-commit gitleaks-clean (no PAT/key/secret in any new file)

---

**END W329-A synthesis** — REFRAME-only wave; no denom/dim/skip-class change; sca-v12.1 ratified.
