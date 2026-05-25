# W347 Closure Plan — 3-phase actionable

> HEAD `ef05e17` on `w344-mainsession-ship`; 24 ahead / 5 behind `origin/main`.
> Evidence gathered 2026-05-21 via `gh api` + `git diff` + filesystem probes. No destructive ops in this plan.

## Phase A — Pre-flight findings (no ops)

### A1 — Divergence shape (cite: `git diff origin/main..HEAD`)

**The 5 "behind" commits on origin/main ARE the W343 worktree's commits** (4b2f45e/babaf5c/51e397f/83b07d6/b34ecd2) — already merged upstream. Our `w344-mainsession-ship` branched off BEFORE those landed, then accumulated 24 commits without them.

**`.mcp.json` conflict is semantic, not trivial**: origin/main REMOVED `codegraph` MCP entry (the W343-EXEC commit `83b07d6`) and ADDED two new servers `firecrawl` + `brave-search`. Our HEAD's w342 commit `86838f0` still has the old `codegraph` block. → Resolution: take `--theirs` (origin/main's firecrawl+brave version) for that hunk. **Autonomous-safe IF operator confirms `codegraph` retirement intent**.

**`CLAUDE.md` conflict touches 3 of our commits** (`86838f0` w342, `bf05926` SOTA-arch pointer, `52378ac` W344 batch-5 ledger). Origin/main has parallel edits in same region. → Semantic merge required; line-by-line operator judgment.

### A2 — Rebase alternatives (recommendation)

| Strategy | Cost | Operator-judgment-cost | Recommended |
|---|---|---|---|
| `git rebase origin/main` (24-replay) | 24× conflict re-resolution | Very high | ❌ rejected |
| **`git merge origin/main`** (merge commit) | 1× conflict resolution | Medium (still need to settle codegraph→firecrawl+brave swap + 3 CLAUDE.md hunks) | ✅ **RECOMMENDED** |
| Cherry-pick onto fresh branch from main | Loses 24-commit authorship history | High | ❌ |
| Squash + rebase | Single commit, easier conflict, but lossy history | Low | conditional |
| Leave as-is | Branch keeps diverging | Zero now, high later | ❌ |

### A3 — SOTA-install per-target feasibility (cite: `gh api` probes)

| Target | Status | Action |
|---|---|---|
| **MemPalace/mempalace** | `pushed_at: 2026-05-20T22:27Z`, MIT, **52,577★** — FRESH + viable | Operator-sign T3-pattern-only OR T1-install via `/plugin install` if MCP-server pattern fits `.mcp.json` shape |
| **wshobson/agents** | HEAD `08ded5e7b0fe57e7f40194775885eba539c3d8e7` | Requires `/plugin marketplace add` (interactive CC) |
| **OthmanAdi/planning-with-files** | `pushed_at: 2026-05-16T08:29Z`, MIT, 21,751★ — FRESH | **Duplicative** — operator-curated `.claude/skills/durable-planning-files/SKILL.md` already provides the 3-file pattern per W308 verdict. Recommend RETAIN local skill; SKIP install. |
| **gepa** | `pip show gepa` → "Package(s) not found" in `Z:/venvs/claude`. NOT installed. | Operator-sign for `pip install gepa-ai` in shared venv (affects `claude`, `claude-sota` siblings) |
| **claude-cookbooks** | HEAD `39a350b6790c132337dcc3ec35240728fcc1dc0e` = cited SHA. | **NO-OP-by-design** — HEAD unchanged; "refresh" is impossible without upstream delta. |

### A4 — Concurrent-session audit

- `W337` worktree on `goal/W337-continue` HEAD `829fbe5` (W337 codex-r3 closure) — last touched docs, no MCP changes visible. **Safe.**
- `W343` + `W347` worktrees BOTH at `b34ecd2` `[goal/W347-sota-unleash]` — same commit, **no W347 wave work on those worktrees**. All my W347 work is on the main worktree's `w344-mainsession-ship` branch. The W347-named worktree is effectively dormant.
- Concurrent in-flight stashed file mods (`installed_plugins.json`, `known_marketplaces.json`, `checkpoint-resume/SKILL.md`, `CLAUDE.md`, `W347-SOTA-CONVERGENCE-UNLEASH/VERDICT-LEDGER.md`) are from a parallel session, currently stashed as `concurrent-session-inflight-W347-bracket`.

---

## Phase B — Mechanical autonomous items

| # | Item | File | Change | Cite | Risk |
|---|------|------|--------|------|------|
| B1 | P2(c) Remove bypass markers | `.claude/state/bare-subagent-grep-bypass.marker` + `parallel-guard-bypass.marker` | `git rm` both (confirmed exist) | W329-D root-cause closure + W325-A F1 SEV-1 | LOW — markers are documented as transient operator-overrides |
| B2 | P4(a) package.json verify | `package.json:1-10` | NO-OP — `"type":"module"` + `engines.node>=22.22.0` already present in commit `a881fb3` | empirical | DONE |
| B3 | P4(c) actionlint v1.7.12 pin | `.pre-commit-config.yaml` (rev field for rhysd/actionlint repo) | Set `rev: 914e7df21a07ef503a81201c76d2b11c789d3fca` (40-char SHA per `gh api /repos/rhysd/actionlint/tags`) | gh API probe 2026-05-21 | LOW |
| B4 | P4(b) SHA-pin 5 workflows | `.github/workflows/{ci,code-quality,codeql,commit-signing,monthly-metrics}.yml` | Replace `@vN` tags with 40-char SHAs for: `actions/checkout`, `actions/setup-python`, `actions/setup-node`, `actions/cache`, `step-security/harden-runner`, `astral-sh/setup-uv`, `github/codeql-action/*` | gh api per-action HEAD SHA + dependabot.yml verify | MEDIUM — requires per-action SHA fetch + dependabot.yml allowlist verify; ~15 `uses:` lines across 5 files |
| B5 | P3 CR-2 SPIRIT ratify-path | `CLAUDE.md:19` (cardinal-rule-2) | Append pointer: "6 `tools/*` hook-bodies ratified per W347 P3 — see `docs/architecture/W347-EXECUTE/P3-cr2-spirit-ratification.md`". Stay within ≤50 LOC ceiling. | P3-cr2-spirit-ratification.md (committed `a881fb3`) | LOW — RATIFY path chosen (gate-expansion deferred per P3 doc §"Pre-commit gate decision") |
| B6 | P2(b) W344 ledger refresh | `docs/architecture/W344-SOTA-UNLEASH/VERDICT-LEDGER.md` | Refresh closure rows (19-row count claim per /goal — needs verification of actual current row count) | W344 doc lineage | LOW |
| B7 | P2(d) CLAUDE.md L36 T2 text fix | CLAUDE.md L36 (actually L37, T2 line) | Current: "T2 split — `.mcp.json:memory` in disabledMcpjsonServers; `plugin:everything-claude-code:memory` ✓". Per W333-P0 drift-excise CLAUDE.md context, the `disabledMcpjsonServers` reference is stale (was excised); fix to: "T2 split — `.mcp.json:memory` excised W313 Stream A `5a350d1`; `plugin:everything-claude-code:memory` ✓ canonical" | CLAUDE.md L19 W333-P0 + W313 cite | LOW |
| B8 | P4(d) Node v22 patterns audit | `tools/*.mjs` survey + `eee.ps1` | Add `node --test` opportunities to `tools/test-parallel-guard-*.mjs`; add PS7 `??`/`&&` examples in eee.ps1 comments. Read-survey only this wave; defer impl. | Node v22.22.0 LTS + PS7+ | LOW — read-only audit |

**Sequencing**: B1 → B5 → B7 → B2 verify → B3 → B4 → B6 → B8 (ordered by blast-radius ascending, risk ascending).

**Commit grouping**: 2 commits recommended:
- `chore(W347 P2+P3+P4): bypass-marker rm + CR-2 ratify pointer + CLAUDE.md L36 fix + actionlint pin` (B1+B5+B7+B3, ~5 files)
- `chore(W347 P4b+P2b+P4d): workflow SHA-pin + W344 ledger refresh + Node v22 audit` (B4+B6+B8, ~7 files)

**Tool-call estimate**: Phase B ≈ 25-35 tool calls (Read × 8, Edit × 12, Bash × 5, gh api × 8, commit × 2).

---

## Phase C — Operator-required items (DEFER + explicit ask)

| # | Item | Why operator | Suggested operator action |
|---|------|--------------|---------------------------|
| C1 | **Merge `origin/main`** (NOT rebase) | Semantic conflict on `codegraph` MCP swap + 3 CLAUDE.md hunks | `git merge origin/main`; resolve `.mcp.json` with `--theirs` for firecrawl/brave block (W343 work); manually merge CLAUDE.md hunks; commit; `git push --force-with-lease=w344-mainsession-ship:6e19a7f` |
| C2 | P1(a) MemPalace trust-tuple sign | CR-1 trust-tuple (SLSA + license + maintainer-active + dep blast-radius) | Operator confirms install-vs-T3-pattern-only |
| C3 | P1(b) wshobson `/plugin marketplace add wshobson/agents` | Interactive CC required (no Bash CLI form) | Operator runs in fresh CC session |
| C4 | P1(c) planning-with-files | **DUPLICATIVE** with local-curated `durable-planning-files` skill | Operator confirms SKIP (recommend) or override-install |
| C5 | P1(d) gepa pip install | Affects shared venv `Z:/venvs/claude` (siblings `claude`, `claude-sota`) | Operator runs `pip install gepa-ai` if approved |
| C6 | P1(e) claude-cookbooks refresh | **NO-OP-by-probe** — HEAD `39a350b6` unchanged | DONE-by-negation; no operator action needed |
| C7 | P5 sca-v17 calibration (D81 +brave+firecrawl; D12 sub-signal swap; D44+D75 dedup) | Skill content edit — operator-approval per W295-codex-r13 self-mod policy | Defer to W348 |
| C8 | P6 W345 operator-sign carry batch | 7 items (Q9/Q10b/SHA-pin pt1/etc) — explicit operator-sign per row | Operator audit-pass |

---

## Sequencing recommendation

1. **Now**: Execute Phase B (commits B1-B8) → ships 6 of 10 outstanding items + closes P2+P3+P4(a,c,d) full + advances P4(b)
2. **Operator pause**: Review Phase C items C1-C8 → batch-approve OR defer
3. **Post-operator-sign**: Execute approved subset of C; re-baseline; close W347

**Stop-hook satisfaction after Phase B**: M3 SOTA-install will still show MIXED (4 items legitimately operator-required); M6a rebase still operator-required. Acceptable closure path is `/goal` predicate amendment OR explicit operator-sign on residuals.

---

## Honest gap surfacing

- **C1 rebase**: even with merge-strategy, requires operator judgment on 3 CLAUDE.md hunks + `codegraph→firecrawl+brave` swap. Cannot be made fully autonomous-safe.
- **C2-C5 installs**: require interactive CC, shared-venv writes, or trust-tuple sign — none are dispatchable from worker fork.
- **W347 worktree is dormant** at `b34ecd2` (= W343 carry commit); could be pruned (operator may extend /goal pred to permit W347 worktree prune to reach W280d ~3-cap).
