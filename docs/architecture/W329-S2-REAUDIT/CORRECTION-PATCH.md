# W329-S2-REAUDIT — Correction Patch for W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md

> Patch authored by W329-S2-REAUDIT subagent 2026-05-19. **NOT** applied directly — parent orchestrator must merge into `docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md` per task constraints.

## Patch summary

| Block | Action | Reason |
|---|---|---|
| Document header verdict (line 5) | DOWNGRADE | "USER-ERROR-CONFIRMED" is wrong; original hypothesis refuted by live API |
| TL;DR rule #3 (line 11) | DELETE | `repo:owner/name` IS valid for /search/repositories per github/docs + live API |
| "NOT valid" list (lines 51-55) | EDIT | Drop `repo:owner/name` and `owner:<owner>`; keep `path:` / `filename:` / `extension:` / `content:` (those ARE code-search only) |
| Pattern A justification (lines 59-71) | REWRITE | Justification changes from "search_repositories cannot do exact lookup" to "get_repository is cheaper + bypasses search rate-limit" |
| Pattern A2 (new, after Pattern A) | INSERT | Document `repo:owner/name` as legitimate search use-case |
| "Wave-by-wave re-analysis" (lines 127-136) | REWRITE | Drop "USER-ERROR-CONFIRMED" framing; mark root cause UNDETERMINED |
| Cite anchor #2 line 159 | EDIT | Fix the false claim that `repo:owner/name` is "code/issue search ONLY" |
| Add §X — new "What we got wrong in W328-S2" disclaimer | INSERT | Preserve W328-S2 audit trail with explicit retraction |

## Block-by-block patch

### Patch 1 — Document header (line 5)

**REMOVE**:
> **Verdict origin**: USER-ERROR-CONFIRMED. Operator queries used invalid qualifier syntax (`repo:owner/name`, `owner:<owner> <repo>`) against `/search/repositories`. Behavior was the documented GitHub Search API contract + correct github-mcp-server behavior — not an upstream bug.

**REPLACE WITH**:
> **Verdict origin (revised after W329-S2-REAUDIT 2026-05-19)**: ROOT CAUSE UNDETERMINED. The W328-S2 original premise that `repo:owner/name` and `owner:<value>` were invalid qualifiers against `/search/repositories` is REFUTED by the live API: all three of `repo:owner/name`, `owner:<value>`, `user:<value>` return HTTP 200 with valid `items` (proven by probes A-F in `W329-S2-REAUDIT/EVIDENCE.md` §E1; canonical github/docs cite in §E2). The original 0-result observations in W316/W319 most likely came from rate-limit budget exhaustion, token-scope mismatch, MCP server transformation, or stale cache — NOT from invalid qualifier syntax. A dedicated W330 follow-up is required to identify the actual cause.

### Patch 2 — TL;DR three rules (lines 7-11)

**REMOVE rule 3**:
> 3. **`repo:owner/name` is NOT a valid qualifier for `/search/repositories`** — it is for `/search/code` and `/search/issues` only.

**REPLACE rule 3 with**:
> 3. **`repo:owner/name` IS valid for `/search/repositories`** — github/docs lists it on the "Searching for repositories" page; the live API returns total_count=1 for an exact slug match. Use `get_repository` for exact-slug lookups regardless because it is cheaper (core rate-limit budget instead of search rate-limit budget, 5000/hr vs 30/min).

### Patch 3 — Qualifier reference, "Valid qualifiers" table (lines 32-50)

**ADD a row** to the Valid Qualifiers table:
```markdown
| `repo:` | `repo:facebook/react` | Exact-slug filter (returns the one matching repo, or none). Documented in github/docs as a repository-search qualifier. |
```

**ADD a footnote** to the table:
```markdown
> Note: `owner:<value>` (not in github/docs) is undocumented but functionally accepted by the live `/search/repositories` API as a synonym of `user:`/`org:` (proven by W329-S2-REAUDIT probes B and F). Prefer `user:` or `org:` for documented behaviour; do NOT reject queries that use `owner:` as invalid.
```

### Patch 4 — "NOT valid for /search/repositories" (lines 51-55)

**REMOVE**:
> - `repo:owner/name` — code/issue search only.
> - `owner:<owner>` — use `user:<owner>` or `org:<owner>` instead.

**KEEP** (these are genuinely code-search only):
> - `path:`, `filename:`, `extension:`, `content:` — code search only.

### Patch 5 — Pattern A justification (lines 59-71)

**REPLACE** the opening line "DO NOT use `search_repositories`. Use `get_repository`:" with:

> Use `get_repository` (not `search_repositories`) for exact-slug confirmation. Reasons:
> 1. **Rate-limit budget**: `get_repository` uses the core REST budget (5000/hr authenticated, 60/hr anonymous). `search_repositories` uses the much tighter search budget (30/min authenticated, 10/min anonymous). For high-frequency exact-slug probes, get_repository is the only sustainable path.
> 2. **Latency**: `get_repository` is a single direct DB lookup; `search_repositories` runs full-text search. Order-of-magnitude difference under load.
> 3. **Determinism**: `get_repository` returns 404 unambiguously for non-existent slugs; `search_repositories` returns 200 with total_count=0, which can also indicate rate-limit truncation or other transient causes.

### Patch 6 — New Pattern A2 (insert AFTER Pattern A, BEFORE Pattern B)

**INSERT**:
```markdown
### Pattern A2 — exact slug match via search (legitimate use-case)

When you specifically need search rate-limit budget (not core budget) — e.g. batched slug verification in a long-running pipeline — `repo:owner/name` IS valid:

```jsonc
{
  "tool": "search_repositories",
  "args": {
    "query": "repo:anthropics/claude-code",
    "perPage": 1
  }
}
```

Returns `total_count: 1` and `items[0].full_name == "anthropics/claude-code"` if the slug exists, `total_count: 0` if not. This pattern was the source of the W328-S2 misdiagnosis — the W328-S2 audit incorrectly believed this qualifier was invalid.
```

### Patch 7 — Wave-by-wave re-analysis (lines 127-136)

**REPLACE entire section** with:
```markdown
## Wave-by-wave re-analysis (W312-D → W321 — revised after W329-S2-REAUDIT)

The "false-negative" 4-of-5 cases were originally attributed to invalid qualifier syntax (`repo:owner/name` and `owner:<owner> <repo>`). That attribution is REFUTED by W329-S2-REAUDIT live-API probes — both qualifier forms work on /search/repositories. The actual root cause remains UNDETERMINED.

Highest-probability hypotheses (require W330-style follow-up to confirm):
1. **Rate-limit exhaustion** — search endpoint cap is 30/min authenticated, 10/min anonymous. W316/W319 sessions ran many sequential search calls, potentially exceeding budget. Under some conditions GitHub returns 200 with empty items rather than 403.
2. **Token-scope mismatch** — the MCP server's PAT may have lacked visibility scope at query time.
3. **MCP-server query transformation** — pass-through is the documented behaviour, but a transformation bug in github-mcp-server is not ruled out.
4. **Stale cache** — CDN or intermediary 200-with-stale-empty response.

The 1-of-5 "true-negative" (`yeshuibo/agentflow`) still appears to be genuine non-existence — exact correct behavior.

The mitigation pattern (Stage-0 existence-probe via `get_repository` from sca-v9 §1 Δ33) is STILL correct and SHOULD be retained — but for the reasons in Patch 5 above (rate-limit budget, latency, determinism), NOT because `repo:owner/name` is invalid.
```

### Patch 8 — Cite anchor #2 (line 159)

**REMOVE**:
> - `repo:owner/name` documented for code/issue search ONLY.

**REPLACE WITH**:
> - `repo:owner/name` documented for **repository search** (in the same qualifier table as `in:name`, `in:description`, `in:topics`, `in:readme`).
> - `user:<value>` and `org:<value>` documented as the canonical owner-restriction qualifiers.
> - `owner:<value>` not formally documented but functionally accepted by /search/repositories as a synonym of `user:`/`org:` (per W329-S2-REAUDIT live probes).

### Patch 9 — Insert new section before "Skill / doc updates required" (line 138)

**INSERT**:
```markdown
## What W328-S2 got wrong (W329-S2-REAUDIT retraction)

W328-S2 stated that `repo:owner/name` and `owner:<value>` were invalid qualifiers for `/search/repositories`. **Both claims are false.** Evidence:

1. github/docs "Searching for repositories" page lists `repo:owner/name` in the qualifier table for repository search (same table as `in:name`/`in:description`/`in:topics`/`in:readme`). The W328-S2 author conflated this with the code-search and issue-search qualifier docs.
2. Live API probes (`W329-S2-REAUDIT/EVIDENCE.md` §E1):
   - `repo:facebook/react` → HTTP 200, total_count=1
   - `owner:facebook` → HTTP 200, total_count=155
   - `user:facebook` → HTTP 200, total_count=155 (identical to owner:)
   - `org:facebook` → HTTP 200, total_count=155 (identical to owner:)
3. github/docs/rest/search/search.md explicitly groups `repo:`, `user:`, and `org:` together as the three supported owner/repo restriction qualifiers: *"your search will fail if your query includes `repo:`, `user:`, or `org:` qualifiers that request resources that you don't have access to"*.

The W328-S2 verdict of "USER-ERROR-CONFIRMED" is therefore retracted. Root cause of the original 0-result observations is UNDETERMINED pending W330-style investigation of rate-limit / token-scope / MCP-transformation / cache paths.

This retraction satisfies W329-C codex GPT-5.5 round-1 review Axis 3 FAIL feedback (2026-05-19).
```

## Patch application order

When applying:
1. Apply Patch 1 (header verdict downgrade) FIRST — this sets the tone.
2. Apply Patches 2, 3, 4, 6 (factual qualifier-validity corrections).
3. Apply Patches 5, 7 (pattern justification rewrites).
4. Apply Patches 8, 9 (cite-anchor correction + retraction section).

## Verification after patch

Run the same 7-probe matrix from `W329-S2-REAUDIT/EVIDENCE.md` §E1 after applying patches and confirm the patched cheatsheet's qualifier-validity claims now match the live API behaviour. If they don't, the patch was applied incorrectly.

## Files affected
- Patch target: `docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md`
- Optional downstream propagation (per W328-S2's own "Skill / doc updates required" table):
  - `.claude/skills/sota-convergence-audit/SKILL.md` §1 Δ33 — Stage-0 framing was already "right-tool not workaround"; verify wording matches Patch 5/7
  - `.claude/skills/goal-prompt-synthesis/SKILL.md` — if it cites W328-S2's invalid-qualifier list, update it
  - `docs/architecture/W283-stream2-research-arch.md`, `W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md`, `W288-RESEARCH-ARCH-v2/STREAM-D-INGEST-PIPELINE.md` — verify they don't carry forward the false "repo:owner/name is code-only" claim
