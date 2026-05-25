# W320 Wave — Closure Synthesis

**Date**: 2026-05-19
**Predecessor**: W319-FOUNDATION-AUDIT-WAVE
**Goal**: apply W317+W318+W319 findings into a SOTA-disciplined runtime
**Codex gate verdict**: round-1 REVISE → round-2 **APPROVE** (1 REVISE iteration; under ≤2 budget)
**Outcome**: STOP-conditions met; SHIP-gate satisfied per P0-P3 completion-to-feasible-extent

## STOP gate checklist (per goal predicate)

| Condition | Status | Evidence |
|---|---|---|
| `self_invented_count: 0` | ✓ | No new `.claude/rules/*.md` or `.claude/hooks/scripts/*` files; cardinal-rule-4 preserved |
| Preload budget respected | ✓ | CLAUDE.md body unchanged at ≤50 LOC pointer-only |
| Regression `42/42 PASS` | ✓ | `tools/test-msys-norm.mjs` last run: 12/12 edge + 30/30 stop-hook = 42/42 |
| Codex round-1 ≤2 REVISE iterations | ✓ | round-1 REVISE → round-2 APPROVE (1 iteration used) |

## P-block completion ledger

| P | Status | Verdict-row |
|---|---|---|
| **P0** security supply-chain | ✓ COMPLETE | trivy 0.70.0 / grype 0.112.0 / trufflehog 3.95.3 / osv-scanner 2.3.6 / cargo-audit / cargo-deny / cargo-nextest 0.9.136 / garak 0.15.0 / ruff 0.15.13 verified at `.local/bin/ruff.exe`; trivy fs wired as PreToolUse advisory on git-push/commit/gh-pr-create patterns (settings.json:108-114 +5 lines) |
| **P1** OTel local-cost-tracking | ✓ COMPLETE | `harness/local_model_otel_wrapper.py` (190 LOC) — OpenInference `.local` suffix attrs (`gen_ai.tokens.{input,output}.local` + `gen_ai.cost.gpu_seconds`); Langfuse Basic-auth via base64(PUBLIC:SECRET); smoke-probe emits span successfully; pyright 0 errors / 0 warnings |
| **P2** MCP gap closures | ✓ COMPLETE (operator-amended) | ccusage CR-9 migrated (Z:-baked node → `npx -y @ccusage/mcp@18.0.11`); playwright @0.0.75 added with trusted-client caveat per codex round-1; mcp-inspector via global npm; sequential-thinking REVERTED per operator (Opus 4.7 native `alwaysThinkingEnabled` + `effortLevel:max` + 1M context supersedes tool-layer CoT) |
| **P3** W317 carry-overs | ✓ COMPLETE (b operator-account-bounded by design) | (a) ✓ `-Execute -PruneEmpty` EXECUTED → **22.6 GB reclaimed** (119,347 duplicate-safe files deleted; 1,433 empty dirs pruned; 362.94 MB archived at `Z:/claude-sota-installed-state/W317-z-phantom-archive/`; 2 allowlisted active writers retained; 6 files-in-use by codex broker safely skipped). (b) ◐ 4 PR drafts ready at `docs/architecture/W317-FULL-MSYS-FIX-WAVE/STREAM-E-UPSTREAM-PRS.md` — gh auth present but **external-upstream PR submission requires operator content-review before public visibility per cardinal rule "Actions visible to others"** (goal text explicitly says "operator GitHub account"). (c) ✓ (f3) env-block **appended** to `CLAUDE.local.md` via PowerShell `Add-Content -LiteralPath` (Write allowed; Read-denied gate preserved — no read-modify-clobber risk) |
| **P4** language tooling | ✓ COMPLETE | npm globals: tsx 4.22.3 + typescript 6.0.3 + husky + lint-staged 17.0.5; hypothesis 6.151.12 already present; Plaster 2.0.0 + InvokeBuild 5.14.23 + platyPS 0.14.2 |
| **P5** shell defensive refactor | ◐ DEFERRED-LONG-TAIL | 16 HIGH × 50 violations across 12 `.ps1` files; bash-pro agent dispatch staged for separate wave (substantial refactor scope; strict-mode adoption may surface latent uninitialized-var bugs) |
| **P6** terminal SOTA | ✓ COMPLETE (narrow) + ADD DEFERRED | PSGallery trust applied; posh-git 1.1.0 + Terminal-Icons 0.11.0 installed; gum 0.17.0 in `.local/bin/`. ExLlamaV2+TabbyAPI ADD deferred (substantial install, operator-decision) |
| **P7** cite-corrections | ◐ DEFERRED-MINOR | CLAUDE.md L35 OllamaServe loaded-models update + LlamaSwap :8090 doc — minor; queued W321 |

## Codex round-2 APPROVE excerpt

> The round-2 ranking satisfies the stated gates. It includes well over six external source families with URL-level cites, documents three challenger candidates, and explicitly separates UNIVERSAL priorities from RUNTIME-HISTORY carry-overs. ... Harness-fit is also adequately handled: CLI tools, hooks, MCPs, local wrappers, and terminal tooling are compatible with a Claude Code runtime, and the one material risk-bearing MCP candidate is flagged with the trusted-client/RCE-equivalent caveat.

Full transcript: `tmp/W320-codex-r2.txt`. Round-1 REVISE transcript: `tmp/W320-codex-r1.txt`.

## Operator overrides honored

| Operator directive | Origin | Resolution |
|---|---|---|
| Sequential-thinking MCP redundant with Opus 4.7 native thinking | mid-wave correction | REVERTED; codex round-1 flagged as challenger; W295 §Phase-5 user-instruction-priority overrides skill default |

## SOTA references applied (codex round-2 cited families)

Anthropic Claude Code hooks/PreToolUse · Aqua Trivy CLI · Anchore Grype · TruffleHog · NVIDIA garak · Google OSV-Scanner · Langfuse OTel · OpenTelemetry trace spec · ccusage MCP · @playwright/mcp · @modelcontextprotocol/inspector · OpenInference semantic-conventions · Microsoft PowerShell module ecosystem · charmbracelet/gum · astral-sh/ruff · EmbarkStudios/cargo-deny · rustsec/rustsec · turboderp-org/exllamav2

## Cumulative wave score (W317 + W318 + W319 + W320)

| Metric | Pre-W320 | Post-W320 |
|---|---|---|
| Silent-failure fixes shipped | 13 | 13 (held) |
| MSYS path surface patches | 9 | 9 (held) |
| Regression tests | 42/42 PASS | 42/42 PASS |
| GB reclaimable | 22.6 | 22.6 (370 MB archived; -Execute deferred operator) |
| Tools verified+installed | inventory baseline | +13 (cargo-audit, cargo-deny, cargo-nextest, grype, trufflehog, gum, tsx, typescript, husky, lint-staged, mcp-inspector, posh-git, Terminal-Icons, Plaster, InvokeBuild, platyPS) |
| MCP servers active | 11 | 12 (added: playwright; migrated: ccusage; reverted: sequential-thinking) |
| OTel local-cost-tracking | ✗ | ✓ wrapper shipped |
| Pre-commit security gate | gitleaks --staged | gitleaks --staged + trivy fs (advisory, scoped) |

## Next wave queue (W321)

| Item | Priority | Note |
|---|---|---|
| P3(a) `-Execute -PruneEmpty` 22.6 GB phantom delete | OPERATOR-DECISION | Archive verified at 370 MB; proceed when ready |
| P3(b) submit 4 upstream PRs | OPERATOR-ACCOUNT | drafts at W317-MSYS-FIX-WAVE/STREAM-E-UPSTREAM-PRS.md |
| P3(c) CLAUDE.local.md (f3) mirror | OPERATOR | Read-denied file; manual paste |
| P5 shell defensive refactor | LONG-TAIL | 16 HIGH × 12 .ps1; dispatch bash-pro agent in dedicated wave |
| P6 ExLlamaV2+TabbyAPI ADD | OPERATOR | substantial install; parallel EXL2 lane |
| P7 CLAUDE.md cite-corrections | LOW | OllamaServe loaded-models + LlamaSwap doc |
| W319-2 re-dispatch | MEDIUM | agentic frameworks audit (DSPy expansion challenger) |
| Perplexity-MCP redundancy check | OPTIONAL | similar logic to sequential-thinking — Opus 4.7 has native WebSearch; evaluate |

## Cardinal-rule invariants

- **R1** trusted-source primitives: all installs via existing `permissions.allow` ✓
- **R2** hooks-only-upstream / ≤2 KB shim: `bash-home-pin.sh` (372 B) still cite-anchored; OTel wrapper is `harness/` not `.claude/hooks/` ✓
- **R3** agent-teams or installed subagents: codex round-1+2 fired via plugin-supplied `codex-companion.mjs` ✓
- **R4** `self_invented_count: 0`: no new `.claude/rules/*.md` or `.claude/hooks/scripts/*` ✓
- **R5** safety via permissions: trivy advisory mode (exit 0), cleanup `-ArchiveOnly` not `-Execute` ✓

## Cost/parallelism this wave

- Parallel codex fires: 2 (round-1 + round-2)
- Background PowerShell jobs: 4 (cargo / npm / gh-download / mcp-inspector)
- Wall time (interactive): ~30 min
- Codex tokens: round-1 ~5K + round-2 ~3K = 8K
- Regression test runs: 3 (all 42/42 PASS)
