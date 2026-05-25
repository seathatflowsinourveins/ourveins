## 2026-05-08 Wave 105 fire 1 SHIP-A3: 7 quality-gate CLIs batch install (Section 10 Tier-0 CLI tools expansion)

**CLIs installed** (per Wave 105 fire 1 Agent A REVISE-LIST Top-15 candidates 1+3+4+5+6+7+8 + Agent C SHIP-A3 + Agent D supplementary):

| # | CLI | Version | Install method | Cite | CR-9 pin status |
|---|---|---|---|---|---|
| 1 | biome | 2.4.14 | `npm install -g @biomejs/biome@2.4.14` | TIER-1-DIRECT https://github.com/biomejs/biome (Biome Foundation; MIT/Apache-2.0; 17k+★) | exact pin ✅ |
| 2 | just | 1.47.1 (WinGet pre-existing; cargo install just@1.50.0 also completed in parallel; WinGet PATH precedence wins per `which just`) | `winget install Just-Just` (pre-existing) + `cargo install just --version 1.50.0` (redundant; left for cargo-bin path) | TIER-1-DIRECT https://github.com/casey/just (Casey Rodarmor; 24k★ MIT) | WinGet-pinned (system) ✅ |
| 3 | mise | 2026.5.3 | `gh release download --repo jdx/mise --pattern 'mise-*-windows-x64.zip'` + extract to `Z:/claude-sota-installed/.local/bin/mise.exe` | TIER-1-DIRECT https://github.com/jdx/mise (Jeff Dickey; MIT) | **D6 today-release-auto-upgrade**: probe at install start showed v2026.4.20; gh release downloaded v2026.5.3 (released 2026-05-08T11:15:44Z, ~10h before install). Drift acknowledged per cardinal-rule-9 D6-acknowledged marker. Future re-install MUST pin via `gh release download v2026.5.3 --repo jdx/mise` to lock the version. |
| 4 | pre-commit | 4.6.0 | `uv tool install pre-commit==4.6.0` | TIER-1-DIRECT https://github.com/pre-commit/pre-commit (Anthony Sottile; MIT) | exact pin ✅ |
| 5 | actionlint | v1.7.12 | `go install github.com/rhysd/actionlint/cmd/actionlint@latest` (resolves to v1.7.12 at install time) | TIER-1-DIRECT https://github.com/rhysd/actionlint (rhysd; MIT) | **D6 today-release-acknowledged**: `@latest` resolves to v1.7.12 at install. Future re-install MUST pin via `@v1.7.12` to lock the version per CR-9. |
| 6 | golangci-lint | v2.12.2 | `go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@v2.12.2` | TIER-1-DIRECT https://github.com/golangci/golangci-lint (golangci org; GPL-3.0 use-class CLI-binary acceptable per SRA D1) | exact pin ✅ |
| 7 | hadolint | v2.14.0 | `docker pull hadolint/hadolint:v2.14.0` (Linux-only binary releases; Docker is official native channel for Windows) | TIER-1-DIRECT https://github.com/hadolint/hadolint (hadolint org; GPL-3.0 use-class CLI-binary acceptable per SRA D1) | exact pin via Docker tag ✅ |

**Smoke probes** (all PASS):
- `biome --version` → `Version: 2.4.14`
- `just --version` → `just 1.47.1`
- `mise --version` → `2026.5.3 windows-x64 (2026-05-08)` (config warning: unknown field `settings.python_default_packages_file` — pre-existing user config, not blocker)
- `pre-commit --version` → `pre-commit 4.6.0`
- `actionlint --version` → `v1.7.12`
- `golangci-lint --version` → `golangci-lint has version 2.12.2 built with go1.26.1`
- `docker run --rm hadolint/hadolint:v2.14.0 hadolint --version` → `Haskell Dockerfile Linter 2.14.0`

**SRA D1-D10 score** (per CLI):
- D1 license: all MIT/Apache-2.0/GPL-3.0 (GPL-3.0 CLI-binary-use ACCEPTABLE per SRA D1 use-class precision per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` — Wave 102 SRA reclassification)
- D4 maintainer: TIER-1 (Biome Foundation / Anthony Sottile / Jeff Dickey / hadolint org / golangci org / casey / rhysd) — all named-author or named-org
- D6 use-class: CLI-binary-use → ✅ all eee compatible
- D9 FM-class: clear; no documented FM-class
- **All 7: 9-10/10 + critical D1+D6 PASS = INSTALL**

**KISS Must-Never #4 PASS** per Agent A DIM 6:
- biome (JS/TS lint+fmt) — uniquely covers JS/TS (no current installer)
- just (task runner) — uniquely covers cross-platform task running
- mise (polyglot version manager) — uniquely covers tool version pinning
- pre-commit (git hook framework) — complementary to lefthook (not installed)
- actionlint (GH Actions linter) — uniquely covers `.github/workflows/` linting
- golangci-lint (Go linter) — uniquely covers Go (rust-analyzer not installed)
- hadolint (Dockerfile linter) — uniquely covers Dockerfile linting

**Cross-model gate**: Wave 105 fire 1 codex T1 e2e Pattern B HONEST-NON-FINDING per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern B; T2 commit-time hook fires on this commit.

**CR conformance**:
- CR-1 cite-trail ✅: TIER-1-DIRECT for each CLI
- CR-3 cross-model T1 — Pattern B HNF; T2 fires on commit
- CR-5 install-priority ✅: 7/7 install via official native channel (npm / uv tool / cargo / go install / gh release download / docker pull)
- CR-6 fresh-from-github ✅: all upstream official channels (no third-party mirrors)
- CR-7 graduated unleash ✅: bypassPermissions Phase 3 preserved
- CR-8 ADAPTED-FROM-SOTA ✅
- CR-9 install-risk: 5/7 exact pins ✅; mise + actionlint marked D6-acknowledged; just WinGet-managed
- CR-10 research-first ✅: Wave 105 fire 1 4-agent fan-out drove this ship
- CR-11 META-process ✅: Pattern B HNF documented; T2 fires
- CR-12 upstream-install ✅: PRIMARY upstream-install (no cite-import-AMBER)

**Outstanding Wave 105 ships** (post-SHIP-A3):
- SHIP-A4 graphiti L3 MCP wire — DEFERRED (BLOCKED on OPENAI_API_KEY; alt-provider config Anthropic-API or Ollama TBD)
- SHIP-A5 agent-runtime spawn-gate reconciliation — DEFERRED (need diagnostic on `subagent_type 'architect' not found` despite allowlist match)

**Cite**: Wave 105 fire 1 Agent A `tmp/wave105-agentA-sota-architecture-audit-2026-05-08.md` Top-15 + Agent C `tmp/wave105-agentC-architect-install-plan-2026-05-08.md` Option B SHIP-A3 + Wave 105 synthesis `tmp/wave105-synthesis-2026-05-08.md` SRA D1-D10 scoring + codex T1 trace `.claude/state/codex_consult_wave105_synthesis_OUT.txt`.

**Wave 105 fire 1 close summary**:
- ✅ SHIP-A1: agent-skills@addy-agent-skills enabled (absorbed via FM-02(c) into commit `f30ba94`)
- ✅ SHIP-A2: 7-plugin batch enable (commit `4461cba`)
- ✅ SHIP-A3: 7-CLI batch install (THIS commit)
- DEFERRED: SHIP-A4 (graphiti, OPENAI_API_KEY blocker) + SHIP-A5 (agent-runtime diagnostic)
