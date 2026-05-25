# W259-v15 — Gap-Resolution Execution Log

> 2026-05-16 · execution pass · corrects stale W259-v13 findings against **verified live state**.
> `effective_tier=TIER-3-LOCAL-COMPOSITION`. Companion: `../03-deepdive/SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md`.

## §1 — Live state verified (corrects W259-v13 Part1)

W259-v13 Part1 reported the L0.5 Security layer as *"weakest — 0/5 installed, only semgrep present"*; the gap master listed `G1 pip install pre-commit` as the highest-ROI next action. **Both are stale.** Verified 2026-05-16 (`Get-Command` + `--version`):

| Tool | W259-v13 claim | Verified 2026-05-16 |
|---|---|---|
| gitleaks | not installed | **8.30.1** — `.local\bin` |
| trivy | not installed | **0.70.0** — `.local\bin` |
| pre-commit | not installed | **4.6.0** — `.local\bin` |
| ruff | — | **0.15.13** — `.local\bin` |
| shellcheck | not installed | present — WinGet Links |
| semgrep | only one present | present — `.local\bin` |
| actionlint | — | **v1.7.12** |

L0.5 is **7/7 installed**, not 0/5 — installed since the W259-v13 audit. `.pre-commit-config.yaml` already exists (W135-authored, codex-reviewed `b3bdjahr8` conf=0.94): `gitleaks-system` + `ruff-check` + `ruff-format` + `actionlint-system`, with a tuned `exclude` block.

## §2 — The real gap, RESOLVED: pre-commit hook wired

The gap was never *"install pre-commit"* — it was that the **git hook was never wired**. `.git/hooks/pre-commit` did not exist.

Root cause: `core.hooksPath` was set (redundantly) to `.git/hooks` — the *default* location — which makes `pre-commit install` "cowardly refuse". `core.hooksPath` pointing at the default is behaviorally a no-op, so clearing it is safe (the existing `prepare-commit-msg` hook in that same dir is unaffected).

Fix applied: `core.hooksPath` cleared → `pre-commit install` → **`.git/hooks/pre-commit` wired** (681 bytes, verified). The commit-time chain (gitleaks + ruff + actionlint) is now active — this commit is its first exercise.

Separately, the `.claude/settings.json` W259-v8 hooks (PreToolUse `gitleaks protect`, PostToolUse `ruff`/`shellcheck`) invoke binaries W259-v13 reported "missing → inert" — all are now verified installed (§1), so those hooks are **no longer inert**.

## §3 — Memory layer reconciled — Hindsight is NOT a gap-fill

Gap master `G4` said *"install Hindsight (memory PRIMARY)"*. Verified `.mcp.json` live state — memory is **already covered by two systems**:
- **`memory`** MCP — functional; `sqlite_vec` backend (`Z:/claude-sota-installed-state/.mcp-memory/memory.db`); rich toolset (search / store / harvest / quality / conflicts / resolve / graph / ingest + mistake-notes).
- **`graphiti`** MCP — wired temporal-KG; FalkorDB `:16379` **OPEN**, Ollama embedder `:11700` **CLOSED** (per `.mcp.json` `_comments.w259v9_u10` audit) → ingest degraded.

**Decision: Hindsight is not auto-installed.** A third full memory engine = W259 **D20 duplication-against-installed**. Hindsight's genuinely-distinct capability is *cross-subagent shared memory* — a real feature, but a deliberate architecture choice, not a gap-fill. The actual memory gap is **graphiti's down Ollama backend** — restoring it (start Ollama `:11700`, `ollama pull qwen3-embedding:0.6b`) recovers the temporal tier at lower risk than bolting on a 3rd engine. Both are operator-decisions (§5).

## §4 — GitNexus deep-dive

`abhigyanpatwari/GitNexus` — the one named community repo the W259-v14 community-repo pass missed (added to the operator's named-repo list after that agent was dispatched). Deep-dived (repomix + deepwiki + GitHub MCP + live-MCP reconciliation) and 23-dimension scored in companion `../03-deepdive/SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md`.

Reconciliation note: `gitnexus` is **already an installed MCP** in this runtime (L0.9 META-RUNTIME-GRAPH layer) — `.mcp.json` `mcpServers.gitnexus` → `gitnexus mcp`, pinned `1.6.4-rc.112`, license PolyForm-Noncommercial-1.0.0 (local-runtime non-commercial use OK per SRA D1 use-class lattice). The deep-dive verdict + score row is in the companion file.

## §5 — Fleet concurrency + residual operator-decisions

**Observed:** concurrent fleet activity on this repo during this session — branch (`w194-glob-narrow`→`main`), `core.hooksPath` (set→unset), and the working index (untracked cruft cleaned, `.gitignore` staged) all changed *between this agent's own tool calls*; `docs/fleet-manifest-2026-05-16T*.md` corroborate a multi-session fleet. This agent therefore commits **narrowly** (explicit pathspecs, never `git add -A`) to avoid colliding with sibling commits, and left branch-pruning + the untracked-cruft `.gitignore` sweep to the fleet (already done).

**Residual operator-decisions** (each touches shared infrastructure / 3rd-party state — not autonomously executed):
- **O1** — start Ollama on `:11700` + `ollama pull qwen3-embedding:0.6b` → restores graphiti temporal-KG ingest.
- **Hindsight** — install only as a deliberate 3rd memory system, if cross-subagent shared memory is wanted.
- **U2** — `defaultMode` `bypassPermissions`→`auto` (safety posture; intentionally unchanged).
