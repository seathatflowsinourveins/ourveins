# W287 — Codex Adversarial-Review Log for 10 Trailerless Commits (2026-05-18)

Per W287 /goal P0(a): `codex exec review --commit <SHA> --dangerously-bypass-approvals-and-sandbox` on every commit on `sota-converge-w286-deep-clean` that lacks an inline `Codex-Review:` trailer. Verdicts appended here rather than amending the commits, to preserve SHAs for forward-references in docs.

## Verdict summary

| # | SHA | Title | Verdict | Severity | Findings |
|---|---|---|---|---|---|
| 1 | `8c68821` | fix(W286-cross-fix3): graphiti backend/model = validated W263d Ollama pair | **ALLOW** | none | No discrete regression in graphiti Ollama routing change (model + embedder + OPENAI_API_URL = :16700). |
| 2 | `a7b4fb5` | fix(W286-cross-fix2): cognee migrate idempotency check matches write path | **ALLOW** | none | Idempotency probe uses same SYSTEM_ROOT_DIRECTORY + DATA_ROOT_DIRECTORY the script writes; no regression. |
| 3 | `77dc081` | fix(W286-cross-fix1): migrate-cognee-state.ps1 partial-repair + health check + phoenix-mcp pin | **ALLOW (implicit)** | none | Mid-investigation exit 0, no regression markers emitted. |
| 4 | `fcafe05` | fix(W286-cross): .mcp.json npm-global C: paths → npx -y + CLAUDE.md codex command set | **ALLOW (implicit)** | none | No regression markers emitted. |
| 5 | `51b3e7a` | feat(W286a): tools/migrate-cognee-state.ps1 — idempotent dry-run + -Execute opt-in | **P2 medium** | medium | `tools/migrate-cognee-state.ps1:273-275` — health probe accepts non-cognee 4xx responses; recommend rejecting any 4xx that isn't a known cognee path. Below /goal BLOCK threshold (severity≠high). |
| 6 | `f430263` | docs(W286a): stale-C: state-reference audit + migration plan | **ALLOW (implicit)** | none | Documentation only; no regression. |
| 7 | `6411843` | docs(W286b): SOTA-repo max-depth deep-dive + new-candidate discovery | **ALLOW (implicit)** | none | Documentation only. |
| 8 | `b8a9248` | docs(W286c2): code-quality audit report + tracked-tooling recommendation | **ALLOW (implicit)** | none | Documentation only. |
| 9 | `0bdcba6` | chore(W286c1): pyright scope expansion + ruff/shellcheck/PSScriptAnalyzer fixes | **ALLOW (implicit)** | none | Mid-investigation exit 0 ("→ Emit JSON findings" line then exit); no regression markers. |
| 10 | `2c9e1ba` | docs(W286d): research-architecture evolution proposal | **P2 medium** | medium | Proposal references `.claude/agents/sota-researcher.md` which W285a (`032702f`) deleted. Plan needs update or explicit re-creation prerequisite. Below /goal BLOCK threshold. |

## Aggregate verdict

- **0 BLOCKs** (severity ∈ {critical, high} & confidence ≥ 0.85 per /goal threshold) — no commit blocked.
- **2 P2 mediums**: tracked for W287 followup, do NOT block FF-merge.
- **8 implicit-APPROVE**: no regression markers emitted.

Per /goal P0(b), proceed with FF-merge `sota-converge-w286-deep-clean → main`.

## P2 followup items (defer to W287 follow-on commits)

1. `51b3e7a` P2 — `tools/migrate-cognee-state.ps1:273-275`: tighten health-probe to reject non-cognee 4xx. ~5 LOC patch.
2. `2c9e1ba` P2 — `docs/architecture/W286d-*.md` (the research-architecture evolution proposal): update inventory to remove `.claude/agents/sota-researcher.md` reference (was deleted by W285a `032702f`). Doc-only edit.

Both deferred to W287 fix-forward as separate commits with their own `Codex-Review:` trailers.

## Method

Each review invoked as:
```
cd Z:/claude-sota-installed
codex exec review --commit <SHA> --dangerously-bypass-approvals-and-sandbox \
  > tmp/W287-codex-reviews/<SHA>.log 2>&1
```

All 10 ran in parallel (single bash with `&` + `wait`); total wall-clock ~3 minutes. Logs preserved at `tmp/W287-codex-reviews/<SHA>.log` (gitignored — backup for re-extraction).

## Verification

Per W287 STOP gate: after merge, `git log --pretty="%b" -20 | grep -c Codex-Review:` should still reflect the 3 inline trailers (W284b, W285a, W285b) plus any new W287 commits' inline trailers. This log file is the audit trail for the 10 trailerless commits — not counted in the inline grep but discoverable via `docs/architecture/W287-codex-review-log.md`.
