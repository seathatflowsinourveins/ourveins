# W319 — Foundation Audit Wave

**Date launched**: 2026-05-19
**Trigger**: Operator directive — "expand your coverage to most comprehensive system level audit ... entire foundation ecosystem".
**Predecessor**: W318-FULL-UNLEASH-WAVE (closed).

## Wave structure (5 parallel streams; 5 Agent calls in 1 message — 100% parallel_ratio per W269/W312-D)

| Stream | Status | File | Headline finding |
|---|---|---|---|
| 1 | ✅ COMPLETE | `STREAM-1-LANG-COOKBOOKS.md` | **Correction**: Rust IS installed (parent W318 was wrong); Python ruff PATH-verify + hypothesis; Node tsx + husky + lint-staged + typescript-bare; Rust cargo-audit + cargo-deny + cargo-nextest; PS Plaster + InvokeBuild + platyPS |
| 2 | ✗ NO ARTIFACT | (missing) | Agent returned thin result ("loading WebFetch and writing report") but no file at wave dir — re-dispatch in W320 |
| 3 | ✅ COMPLETE | `STREAM-3-MODEL-OBSERVABILITY.md` | DON'T migrate IkLlama (Z:-portable Windows CUDA constraint); ADD ExLlamaV2+TabbyAPI as parallel lane; FIX local-model cost tracking via OTel custom attrs (REC-3); Helicone ai-gateway REJECT-RE-CONFIRMED; cite-corrections: OllamaServe NOT idle, LlamaSwap live-but-undocumented |
| 4 | ✅ COMPLETE | `STREAM-4-TERMINAL-SOTA.md` | **19/22 modern-unix already installed** (much higher than W318 Stream-3 estimated); narrow 3-item gap: PSGallery trust setting + posh-git + Terminal-Icons + gum |
| 5 | ✅ COMPLETE | `STREAM-5-AWESOME-MEGA.md` | **13 NET-NEW** items across 6 awesome-lists; top-5: modelcontextprotocol/inspector (closes 4-wave github silent-fallback!) + microsoft/playwright-mcp + rtk-ai/rtk + server-sequentialthinking + jdx/mise |

## Aggregated W319 findings (5 streams synthesized)

### Net-new installs (de-duplicated against W318-Stream-3 queue)

**Security supply-chain** (cross-W318/W319 convergence):
- `cargo-audit + cargo-deny + cargo-nextest` (Rust SOTA security — W319-1)
- `trivy + grype + trufflehog + osv-scanner` (W318-S3 + W319-1 confirm)

**Language toolchain hardening** (W319-1):
- Python: verify-or-install `ruff` (PostToolUse hook depends on it!) + `hypothesis`
- Node: `tsx` + `typescript` (bare global) + `husky` + `lint-staged`
- PowerShell: `Plaster` + `InvokeBuild` + `platyPS` (+ dedupe Pester 3.4.0 + PSReadLine 2.0.0)

**MCP server gap** (W319-5):
- `modelcontextprotocol/inspector` — **HIGH PRIORITY** — closes the 4-wave `github.search_repositories` silent-fallback class
- `microsoft/playwright-mcp` — a11y-structured browser automation superior to chrome-devtools-mcp
- `modelcontextprotocol/server-sequentialthinking` — official tool-layer CoT scaffolding

**Terminal SOTA** (W319-4):
- `Set-PSRepository PSGallery -InstallationPolicy Trusted` (zero-cost config)
- `Install-Module posh-git Terminal-Icons -Scope CurrentUser`
- `gh release download charmbracelet/gum` (interactive scripting)

**Observability fix** (W319-3 REC-3 — highest impact):
- Wire OTel custom attributes `gen_ai.tokens.{input,output}.local` + `gen_ai.cost.gpu_seconds` in Langfuse exporter (~30 min) — closes local-inference cost-attribution gap

**Model serving** (W319-3 REC-1):
- ADD ExLlamaV2 + TabbyAPI as parallel EXL2 lane (NOT replacement for IkLlama)

### Cite-corrections to CLAUDE.md / W315-r2 (W319-3 surfaced)

- Line 35: `OllamaServe :16700 ... idle/0-models` → **actually has `qwen3-coder:30b-a3b-q4_K_M` + `qwen3-embedding:0.6b` LOADED** per W319-3 probe
- Add LlamaSwap :8090 documentation (live-but-undocumented per W314-r2 finding + W319-3 confirm)

### Rejected re-litigations

- **Helicone ai-gateway**: REJECT-RE-CONFIRMED (W319-3) — duplicates W307 Portkey REJECT; cost-attribution justification dissolves once REC-3 OTel local-cost-tracking lands

## Cross-stream synthesis tables

### Total install queue (W317 + W318 + W319 de-duplicated)

| Category | W318-S3 (10) | W319-1 (lang) | W319-4 (term) | W319-5 (awesome) | Net-new W319 |
|---|---|---|---|---|---|
| Security | trivy, grype, garak, trufflehog, semgrep, osv-scanner | cargo-audit, cargo-deny | — | — | +2 |
| Language | — | ruff verify, hypothesis, tsx, typescript, husky, lint-staged, Plaster, InvokeBuild, platyPS, cargo-nextest, cargo-watch, cargo-edit | — | — | +12 |
| Ergonomic | act, just, shfmt, typos | (just dup), git-delta, du-dust, hyperfine, tokei, lazygit | gum | mise | +7 |
| MCP | — | — | — | inspector, playwright-mcp, sequentialthinking, rtk | +4 |
| PS modules | — | — | posh-git, Terminal-Icons | — | +2 |
| Config | — | — | PSGallery trust | — | +1 |
| **TOTAL** | **10** | **+12** | **+4** | **+5** | **+28 net-new** |

### Cardinal-rule invariants (preserved through wave)

- **R1**: All recommended installs use existing `permissions.allow` grants ✓
- **R2**: No new project-owned hook bodies; OTel custom-attrs go in already-wired Langfuse exporter config ✓
- **R3**: 5 Agent dispatches with `subagent_type=null` (forks, inherits context) ✓
- **R4**: `self_invented_count: 0` ✓
- **R5**: No new guard scripts; trivy/grype as PreToolUse via existing hook patterns ✓

## Operator-AIs forwarded to W320

| # | Action | Priority |
|---|---|---|
| W320-1 | Re-dispatch W319 Stream-2 (agentic frameworks) — agent produced no artifact | MEDIUM |
| W320-2 | Apply W319-3 REC-3 OTel local-cost-tracking custom attrs | HIGH |
| W320-3 | Install MCP inspector for github silent-fallback closure | HIGH |
| W320-4 | CLAUDE.md cite-corrections (OllamaServe loaded models + LlamaSwap docs) | LOW |
| W320-5 | Verify `ruff` PATH (PostToolUse hook silently misses lint otherwise) | HIGH |

## Wave docs (this directory)

- `INDEX.md` (this file) — wave structure + aggregated findings
- `STREAM-1-LANG-COOKBOOKS.md` (9 KB) — per-language tooling audit
- `STREAM-3-MODEL-OBSERVABILITY.md` (7 KB) — model + obs SOTA upgrade path
- `STREAM-4-TERMINAL-SOTA.md` (6 KB) — modern-unix + PS module audit
- `STREAM-5-AWESOME-MEGA.md` (10 KB) — 6-list cross-reference, 13 net-new items
- `CLOSURE-SYNTHESIS.md` — final synthesis + revised /goal predicate
