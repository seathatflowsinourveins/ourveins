# W328 — HF `hub_repo_search` Correct Usage Pattern (USER-ERROR-CONFIRMED)

> **Verdict (2026-05-19, W328 Stream-1)**: 7-wave "silent fallback" against `mcp__hf-mcp-server__hub_repo_search` is **USER-ERROR-CONFIRMED**. Operator pushback validated: mature upstream, the bug was on our side. Original W321 draft issue withdrawn (renamed with `WITHDRAWN-USER-ERROR-` prefix; preserved for audit trail).

## Root cause (one-liner)

`query` is a **substring match on repo IDs only** — not full-text search, not tokenized AND. Multi-word phrases like `"claude code mcp agent harness"` return empty because **no single repo ID contains that exact 5-word phrase as a substring** — this is documented behavior, not a bug.

## Source-level evidence

### Cite 1 — huggingface.co official docstring (`HfApi.list_models`)
> `search` (`str`, *optional*) : "A string that will be contained in the returned model ids."
> Source: `https://huggingface.co/docs/huggingface_hub/package_reference/hf_api` (via `mcp__hf-mcp-server__hf_doc_search` 2026-05-19)
> Example given: `api.list_models(search="bert")` — single token, no spaces

### Cite 2 — huggingface_hub Python library deepwiki (source-code-grounded)
> "The `search` parameter performs a single substring match. When you provide a multi-word string like `'claude code mcp agent harness'`, the API attempts to find repository IDs that contain this **entire string** as a substring. It does not perform a tokenized search or a logical AND operation on individual words."
> Source: `mcp__deepwiki__ask_question` on `huggingface/huggingface_hub` 2026-05-19
> Test suite confirmation: `test_list_models_search` asserts `"bert" in model.id.lower()`

### Cite 3 — Open LLM Leaderboard FAQ (separate-product confirmation of HF search semantics)
> The Hugging Face Open LLM Leaderboard explicitly distinguishes its **own** richer search (`;` for OR, `@architecture:` field prefix, regex) from the base hub search — implicitly confirming the base hub search has none of those features.
> Source: `https://huggingface.co/docs/leaderboards/open_llm_leaderboard/faq` (Searching for a model § )

### Cite 4 — Live empirical proof (W328 Stream-1 reproduction 2026-05-19)
| Query | Result | Diagnosis |
|---|---|---|
| `query="dspy"` (single token) | **15 results** | CORRECT pattern works |
| `query="deep research agent"` (3-token phrase) | **9 results** | Works ONLY because repo IDs literally contain that exact phrase (`Deep-research-agent`, `deep-research-ai-agent` after URL slugification) |
| `query="claude code mcp agent harness"` (5-token phrase) | 0 results | No repo ID contains the exact 5-word substring — **expected behavior** |
| `filters=["mcp-server"]` (no query, tag-based) | **5 trending MCP spaces** | The actual SOTA-discovery pattern |

## Correct usage patterns

### Pattern A — Single-token name search (KEYWORD discovery)
```jsonc
{
  "query": "dspy",                          // single token; will substring-match repo IDs
  "repo_types": ["model", "dataset", "space"],
  "limit": 20,
  "sort": "trendingScore"
}
```

### Pattern B — Tag-filtered listing (SOTA discovery; **PREFERRED for "find MCP servers"**)
```jsonc
{
  "repo_types": ["space"],
  "filters": ["mcp-server"],                // hub tag — matches repos tagged this way
  "sort": "trendingScore",
  "limit": 20
}
```

### Pattern C — Author-namespace listing (discover an org's repos)
```jsonc
{
  "author": "huggingface",
  "repo_types": ["model"],
  "sort": "downloads",
  "limit": 20
}
```

### Pattern D — Hyphenated multi-word (works IF a repo ID contains the exact slug)
```jsonc
{
  "query": "deep-research",                 // works: many repos literally named *deep-research*
  "repo_types": ["space"]
}
```

## ANTI-patterns (what NOT to do)

| Anti-pattern | Why it fails |
|---|---|
| `query="claude code mcp agent harness"` | No repo ID contains the exact 5-word substring (with spaces). |
| `query="research orchestrator agent framework"` | Free-text human-language phrase ≠ repo ID slug. |
| `query="autonomous research"` (expecting full-text card match) | `search` matches repo IDs only — NEVER card content. Use HF's full-site search UI or `paper_search` for content. |
| Treating empty result as "no results exist" | Empty just means "no repo ID contains your substring" — try shorter token, tag filter, or `paper_search` / `space_search`. |

## When to use which tool

| Need | Tool |
|---|---|
| Find repos by **name keyword** | `hub_repo_search` with single-token `query` |
| Find repos by **capability/tag** (MCP server, text-classification, etc.) | `hub_repo_search` with `filters=["<tag>"]` and NO `query` |
| Full-text search across model cards / papers | `paper_search` (academic) or `WebFetch huggingface.co/models?search=<phrase>` (UI parity) |
| Semantic discovery (non-HF) | `mcp__exa__web_search_exa` or `mcp__tavily__tavily_search` |
| Browse trending Spaces semantically | `mcp__hf-mcp-server__space_search` (separate tool, semantic) |

## Action items (W328 closure)

1. Original draft issue renamed: `hf-hub-repo-search-silent-fallback.md` → `WITHDRAWN-USER-ERROR-hf-hub-repo-search-silent-fallback.md`
2. Silent-fallback anchor docs at W314/W315/W321 should annotate F-W315-1 entry as **WITHDRAWN-USER-ERROR per W328**
3. Future HF discovery queries MUST use Pattern B (tag-filter) for SOTA-discovery class workloads, NOT free-text `query`
4. `sota-convergence-audit` Δ27/Δ33 silent-fallback codification keeps the **pattern** valid (silent-fallback class exists for GitHub-MCP and others) but removes `hub_repo_search` from the affected-tool list

## Cite-anchor (3-org-distinct minimum per W328 brief)

1. **huggingface.co** (HF official docs) — `https://huggingface.co/docs/huggingface_hub/package_reference/hf_api` docstring `"A string that will be contained in the returned model ids."`
2. **huggingface_hub Python lib source via deepwiki** — `test_list_models_search` asserts substring containment; explicit "does not perform a tokenized search or a logical AND operation"
3. **HF Open LLM Leaderboard FAQ** (separate HF product, separate doc) — explicitly distinguishes its richer search from base hub search, implicitly confirming base hub search is plain substring
4. **Operator W328 Stream-1 live empirical proof 2026-05-19** — single-token `"dspy"` returned 15 results; multi-word `"claude code mcp agent harness"` returned 0 — direct contract demonstration

## Wave footprint

- Created: 2026-05-19 (W328 Stream-1)
- Supersedes: W321 draft issue (now WITHDRAWN)
- Closes: 7-wave silent-fallback-against-hf-hub-repo-search narrative (W314 + W315 + W316 + W317 + W319 + W320-B + W320-G + W321)
- Preserves: GitHub-MCP silent-fallback claim (separate finding, NOT withdrawn here — W328 Stream-1 scope is HF only)
