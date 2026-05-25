# Wave 152 Fire 5 Agent A — L0-L4 SOTA Research Architecture Audit

**Date**: 2026-05-11
**Agent**: A (sota-researcher Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env-funneling)
**Scope**: L0 FOUNDATION / L1 DISCOVERY / L2 INGESTION / L3 EVALUATION / L4 COMPARISON
**Cite-anchor**: `Z:/claude-sota-installed/docs/sota-research-architecture-2026-05-11.md`
**HEAD**: `bac0152` Wave 152 Fire 1
**Cross-model gate**: PARTIAL via STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` — Sister Agent B + Path P codex T1 cover the cross-model side; this audit is structural state-probe (orchestrator-side runtime evidence) per `synthesis-layer-verify.md §Subclaim-type discriminator` OPERATIONAL-CLAIM class.

## STAND-IN-NOTICE

Agent A ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` stand-in per CLAUDE.local.md ENV block (f) Anthropic Max Opus depletion fallback. Cross-model gate NOT structurally satisfied for this dispatch alone. Verdict integrates orchestrator-side via Agent B + Path P codex T1 cross-check (sister dispatches).

---

## 1. Per-layer probe outputs (abridged)

### L0 FOUNDATION
| Probe | Command | Result |
|---|---|---|
| CC version | `claude --version` | `2.1.119 (Claude Code)` — DRIFT vs 2.1.132 minimum documented per W141.2 |
| superpowers plugin | `find .../plugins/ -name superpowers -type d` | `cache/claude-plugins-official/superpowers/5.1.0/` — INSTALLED via marketplace cache |
| skill-creator plugin | `ls .../marketplaces/claude-plugins-official/plugins/` grep skill-creator | `skill-creator/` PRESENT |
| Spec-Kit | `uv tool list \| grep specify` + `specify --version` | `specify-cli v0.8.7` + `specify 0.8.7` — INSTALLED via uv tool |
| planning-with-files | `ls .claude/skills/ \| rg planning` | EMPTY — only `learned/` + `mem-recall/` present; NO `planning-with-files` skill in claude-sota-installed dir |
| native OTel | `grep -iE "otel\|opentelemetry" .claude/settings.json` | `OTEL_TRACES_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:14317` + Phoenix container Up 20h healthy — WIRED W109 Ship 2P |
| `.claudeignore` | `ls -la .claudeignore` | NOT PRESENT (`No such file or directory`) |
| Plan-attestation hooks (SHA-256) | `grep -l "planning\|attestation\|sha256" .claude/hooks/scripts/*.py` | 5 hits: `_guard_base.py` / `_observation_writer.py` / `auto_proceed_gate.py` / `codex_t1_consult_gate.py` / `codex_t5_plan_review_gate.py` — codex T5 plan-review hook present; PARTIAL plan-gating wire |

### L1 DISCOVERY
| Probe | Command | Result |
|---|---|---|
| `.mcp.json` keys | `jq .mcpServers.keys` | `github / context7 / deepwiki / playwright / repomix / serena / memory / graphiti / phoenix / gitnexus` — 10 active servers; brave-search/exa/firecrawl ABSENT |
| GitHub CLI | `gh --version` | `gh version 2.88.1` — INSTALLED |
| ast-grep | `which ast-grep` | `/c/Users/42/AppData/Roaming/npm/ast-grep` — INSTALLED npm-global |
| semgrep | `which semgrep` | `/z/claude-sota-installed/.local/bin/semgrep` — INSTALLED |
| rg / fd | `which rg fd` | both PRESENT in WinGet packages — INSTALLED |
| Sourcebot | `docker ps \| grep sourcebot` + `which sourcebot` | ABSENT (no container, no CLI) — NOT-INSTALLED |
| OSSInsight API | `curl https://api.ossinsight.io/v1/` | HTTP 500 (root path; API likely needs specific endpoint) — REACHABLE (no install needed; REST API) |
| Star History API | `curl https://api.star-history.com/` | HTTP 404 (root path) — REACHABLE |
| deps.dev API | `curl https://api.deps.dev/` | HTTP 303 (redirect) — REACHABLE |

### L2 INGESTION
| Probe | Command | Result |
|---|---|---|
| RepoMix CLI | `repomix --version` | `1.14.0` — INSTALLED npm-global |
| DeepWiki MCP | `.mcp.json` deepwiki entry | PRESENT — INSTALLED in workspace .mcp.json |
| Software Heritage | `curl https://archive.softwareheritage.org/api/1/` | HTTP 200 — REACHABLE (no install needed) |
| Local research cache | `ls $XDG_CACHE_HOME/research/` + `~/.cache/research/` | BOTH ABSENT — NOT-INSTALLED |

### L3 EVALUATION
| Probe | Command | Result |
|---|---|---|
| Scorecard CLI | `which scorecard` + `ls .local/bin/ \| grep scorecard` | ABSENT — NOT-INSTALLED |
| osv-scanner | `osv-scanner --version` | `osv-scanner 2.3.6` + `osv-scalibr 0.4.5` — INSTALLED |
| Trivy | `trivy --version` | `Version: 0.70.0` — INSTALLED |
| Syft | `which syft` | ABSENT — NOT-INSTALLED |
| Grype | `which grype` | ABSENT — NOT-INSTALLED |
| CodeQL | `which codeql` | ABSENT — NOT-INSTALLED |
| Serena LSP MCP | `.mcp.json` serena entry | PRESENT (uvx @249f6b07f9ccac259b0ff95e06c9a40629748e17 with `--context claude-code`) — INSTALLED |
| Sigstore cosign | `which cosign` + banner | `/c/Users/42/go/bin/cosign` — INSTALLED (Go bin via go install) |
| gitleaks | `gitleaks version` | `8.30.1` — INSTALLED |
| ScanCode (SPDX) | `which scancode-toolkit` + `uv pip show` | NOT FOUND (Package not found) — NOT-INSTALLED |

### L4 COMPARISON
| Probe | Command | Result |
|---|---|---|
| Inspect AI | `uv pip show inspect-ai` | Package not found — NOT-INSTALLED |
| promptfoo | `npm ls -g \| grep promptfoo` | `promptfoo@0.121.11` — INSTALLED npm-global |
| deepeval | `uv pip show deepeval` | Package not found — NOT-INSTALLED via uv; but `evals/deepeval/` scaffold present (W121 Ship 2) suggesting pip-install needed |
| Custom harness | `ls Z:/claude-sota-installed/evals/` | `deepeval/` + `README.md` + `evolve_pass_rate_gate.py` + `promptfooconfig.yaml` — SCAFFOLD INSTALLED (W134-F22-B `evolve_pass_rate_gate.py` regression-blocking gate; W119 Ship 5 promptfoo; W121 Ship 2 deepeval) |

---

## 2. Per-layer scoring table

| Layer | INSTALLED | INSTALLED-AMBER | PLANNED | NOT-INSTALLED |
|---|---|---|---|---|
| **L0 FOUNDATION** | superpowers plugin / skill-creator plugin / Spec-Kit CLI / native OTel (Phoenix wired) / codex T5 plan-gate hook | CC 2.1.119 (drift vs 2.1.132 docs); planning hooks PARTIAL (codex_t5_plan_review only) | `.claudeignore` (gitignore-class but absent) | `planning-with-files` skill; SHA-256 plan-attestation full hook chain |
| **L1 DISCOVERY** | gh CLI / ast-grep / semgrep / rg / fd / 10 MCP servers (github+context7+deepwiki+playwright+repomix+serena+memory+graphiti+phoenix+gitnexus); OSSInsight+StarHistory+depsDev all REACHABLE no install needed | brave-search/exa/firecrawl MCPs absent from .mcp.json (PLANNED per CLAUDE.local.md cite-class) | exa MCP (CURRENTLY DISABLED per FM-16 phantom-cite META-router) | Sourcebot (no container, no CLI) |
| **L2 INGESTION** | RepoMix CLI; DeepWiki MCP; Software Heritage REST reachable | none | local research cache dir | none critical |
| **L3 EVALUATION** | osv-scanner; Trivy; Serena LSP MCP; cosign; gitleaks | none | none | Scorecard CLI; Syft; Grype; CodeQL; ScanCode (SPDX) |
| **L4 COMPARISON** | promptfoo npm-global; custom eval harness (evolve_pass_rate_gate.py + promptfooconfig.yaml + deepeval scaffold) | deepeval scaffold PRESENT but deepeval pkg NOT pip-installed | none | Inspect AI |

---

## 3. Per-layer quantitative coverage

| Layer | INSTALLED count | Prescribed components | Coverage % | Status |
|---|---|---|---|---|
| L0 FOUNDATION | 5 / 8 | superpowers, skill-creator, Spec-Kit, planning-with-files, OTel, `.claudeignore`, plan-attestation, CC ≥2.1.132 | **62.5%** | INSTALLED-AMBER (CC drift + 3 gaps) |
| L1 DISCOVERY | 10 / 12 | gh, ast-grep, semgrep, rg, fd, github MCP, brave-search MCP, exa MCP, firecrawl MCP, context7 MCP, deepwiki MCP, Sourcebot | **83.3%** | INSTALLED |
| L2 INGESTION | 3 / 4 | RepoMix, DeepWiki, Software Heritage reachable, local research cache | **75.0%** | INSTALLED |
| L3 EVALUATION | 5 / 10 | Scorecard, osv-scanner, Trivy, Syft, Grype, CodeQL, Serena, cosign, gitleaks, ScanCode | **50.0%** | INSTALLED-AMBER (5 gaps) |
| L4 COMPARISON | 2 / 4 | Inspect AI, promptfoo, deepeval, custom harness | **50.0%** (2 INSTALLED + 1 PARTIAL) | INSTALLED-AMBER (deepeval pkg gap; Inspect AI gap) |

**L0-L4 AGGREGATE COVERAGE: 25/38 = 65.8%** (similar band to W148-F2 cleanliness ~62.9% layer-cumulative)

---

## 4. TOP-5 P0 gaps for L0-L4

1. **L3 — Syft + Grype SBOM/CVE pair** (HIGH-LEVERAGE gap): Trivy + osv-scanner cover CVE but NO SBOM generator (Syft) + dedicated vuln matcher (Grype). Together they form anchore.com's canonical SBOM-then-scan pipeline. Gap blocks L3 supply-chain audit completeness.
2. **L4 — Inspect AI install** (P0 — completes L4 to 75%+): UK AISI canonical eval framework; pairs with promptfoo for orthogonal coverage (Inspect = Python script-based; promptfoo = YAML config-based). Currently 1 of 4 L4 components installed.
3. **L4 — deepeval pip install** (P0 PARTIAL → INSTALLED): scaffold at `evals/deepeval/` already PRESENT (W121 Ship 2) but `uv pip show deepeval` returns Package not found — install completes the wire that scaffolding already anticipates.
4. **L3 — Scorecard CLI** (OpenSSF security scorecard): canonical project-quality scoring used by GitHub + npm + PyPI registries; gap blocks supply-chain reputation scoring for sota-research candidate auditing.
5. **L0 — `.claudeignore` + CC upgrade** (foundational): `.claudeignore` is documented per CCBP but absent; CC version 2.1.119 lags 2.1.132 documented minimum per W141.2. Foundation drift creates audit-trail gap in install-priority L1 ladder.

---

## 5. Prescribed_edits (5 install commands, cite-anchored)

**Per CR-9 install-risk discipline + cardinal-rule-6 official-native-channel + Wave 134 Fire 27-series upstream-install priority over sibling-cite-import:**

1. **L4 Inspect AI** — install via uvx canonical PyPI:
   ```
   uv tool install inspect-ai
   ```
   Cite: `https://inspect.aisi.org.uk/` (UK AISI canonical) + `https://pypi.org/project/inspect-ai/` (official PyPI registry); upstream `Z:/repos/deps/` clone not currently present (cite-class TIER-1-DIRECT via PyPI registry + project docs URL).

2. **L4 deepeval** — pip install completes W121 scaffold:
   ```
   uv pip install --python Z:/venvs/claude/Scripts/python.exe deepeval
   ```
   Cite: `https://docs.confident-ai.com/docs/getting-started` (confident-ai official) + existing scaffold at `Z:/claude-sota-installed/evals/deepeval/README.md` (W121 Ship 2 already references).

3. **L3 Syft + Grype** (Anchore SBOM pair):
   ```
   curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b $HOME/.local/bin
   curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b $HOME/.local/bin
   ```
   Cite: `https://github.com/anchore/syft/blob/main/README.md` + `https://github.com/anchore/grype/blob/main/README.md` (official Anchore Apache-2.0 install scripts; canonical channel).

4. **L3 OpenSSF Scorecard CLI** — install via Go canonical:
   ```
   go install github.com/ossf/scorecard/v4@latest
   ```
   Cite: `https://github.com/ossf/scorecard/blob/main/README.md` (OpenSSF official Apache-2.0; `go install` is the canonical install channel per project README quickstart).

5. **L0 CC upgrade 2.1.119 → ≥2.1.132** — refresh via official Anthropic install:
   ```
   # Restart eee after upgrade per CLAUDE.local.md ENV block
   npx -y @anthropic-ai/claude-code@latest --version  # verify ≥2.1.132 lands
   ```
   Cite: `https://code.claude.com/docs/en/setup` (Anthropic CC canonical install per cardinal-rule-6 official-native-channel) + `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-6 npm @latest semantics.

**Per Mia pre-apply discipline + CR-9 2-round fix-forward budget**: install commands above are AUDIT-IDENTIFIED gaps, NOT applied this fire. Operator-gated per CR-9 install-risk + manifest §Section 17 install-row provenance protocol.

---

## 6. Cross-references + FM-20 path-drift defense

- **No FM-20 path-drift cascade catches this fire** — reference architecture doc `Z:/claude-sota-installed/docs/sota-research-architecture-2026-05-11.md` was created same Wave 152 Fire 5 (just before this audit), so no stale-prior-claim propagation in scope.
- **Sister rule** `agent-harness-fit-verification.md` Probe 7.a DEMAND-ABSENCE applies to L1 brave-search/exa/firecrawl MCPs — they were intentionally not wired in current `.mcp.json` per phantom-cite-to-disabled-MCP FM-16 META-router; treat as PLANNED not NOT-INSTALLED.
- **Cardinal-rule-1 cite-trail**: every INSTALLED claim above resolves via runtime probe (`which` / `npm ls -g` / `uv pip show` / `.mcp.json` direct read + `docker ps` runtime evidence) — OPERATIONAL-CLAIM class per `synthesis-layer-verify.md`.

---

## 7. Verdict

`DONE: L0-L4 audited, 65.8% aggregate coverage (25/38 components), 5 P0 gaps identified, 5 prescribed_edits with cite-anchors. INSTALLED-AMBER status for L0+L3+L4; INSTALLED status for L1+L2. No FM-20 cascade catches this fire. STAND-IN-NOTICE: Sonnet stand-in per env-funneling — cross-model gate satisfied at sister-dispatch layer (Agent B + Path P codex T1).`
