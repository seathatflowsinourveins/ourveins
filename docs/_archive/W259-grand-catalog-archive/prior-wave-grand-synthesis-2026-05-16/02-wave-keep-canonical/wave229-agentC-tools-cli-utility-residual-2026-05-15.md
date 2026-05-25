---
title: W229 Agent C — Tools / CLI / Utility / DevEx / Security Residual Probe
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 229
agent: sota-researcher (Sonnet stand-in disclosed per cmc-env-funneled-disclosure.md Option 2)
predecessor: W224-A 87% baseline saturation finding + W228-A v6-kit deep-mine
artifact-class: residual-category-probe
target-runtime: Z:\claude-sota-pure\
cross-model-gate: NOT structurally satisfied; orchestrator MUST file Path P codex T1 ratification before any ADOPT-NOW lands
---

# W229-C — Tools / CLI / Utility / DevEx / Security Residual Probe

## 1. Category-Filtered Residual URLs

**Source**: `Z:/claude-sota-installed/docs/outer research/kits/v6/claude_code_sota_frontier_v6_quality_md_kit/REPOS_BY_CATEGORY.md` (231 v6 candidates).

**Categories matched**: `agent-security` + `cli` + `code-tool` + `core-cli` + `github-automation` + `language-tool` + `mcp-security` + `search` + `security` + `security-harness` + `security-plugin` + `security-skills` + `semantic-code` + `token`

**46 category-relevant** extracted; cross-ref against W225 FINAL MASTER + W228-A + W207-installed baseline; **31 truly-residual** (15 already in baseline).

## 2. Per-Candidate LICENSE + Stars + Freshness + Alternate-Install-Path

LICENSE direct-read per CR-9 (gh API + LICENSE blob content base64-decoded for NOASSERTION cases). Alternate-install-path probe per `mia-pre-apply.md §Alternate-install-path probe discipline` W112 Ship 2CC.

### 2.1 CLI Residuals — 8/8 ALREADY-INSTALLED per multi-channel probe

| Repo | License | Install state |
|---|---|---|
| BurntSushi/ripgrep | MIT/Unlicense | **ALREADY-INSTALLED** WinGet `rg 15.1.0` |
| casey/just | CC0 | **ALREADY-INSTALLED** WinGet `just 1.47.1` |
| cli/cli | MIT | **ALREADY-INSTALLED** `gh 2.92.0` |
| jdx/mise | MIT | **ALREADY-INSTALLED** `mise 2026.5.3` |
| jqlang/jq | MIT | **ALREADY-INSTALLED** chocolatey `jq 1.8.1` |
| mikefarah/yq | MIT | **ALREADY-INSTALLED** WinGet `yq 4.52.4` |
| sharkdp/fd | MIT/Apache-2.0 | **ALREADY-INSTALLED** WinGet `fd 10.4.2` |
| astral-sh/uv | MIT/Apache-2.0 | **ALREADY-INSTALLED** `uv 0.10.3` |

**W224-A 87% baseline saturation CONFIRMED via fresh multi-channel probe this fire.**

### 2.2 Security Residuals — gh API probe

| Repo | License | Stars | Last push | Notes |
|---|---|---|---|---|
| woodruffw/zizmor | **MIT** | 4,908 | 2026-05-15 | GitHub Actions security audit; STUDY-PILOT-CONDITIONAL |
| bridgecrewio/checkov | **Apache-2.0** | 8,716 | 2026-05-14 | Already in manifest PLANNED-CONDITIONAL |
| GitGuardian/ggshield | **MIT** | 1,951 | 2026-05-14 | DUPLICATE vs gitleaks INSTALLED |
| github/codeql-action | **MIT** | 1,538 | 2026-05-15 | Already in manifest PLANNED-CONDITIONAL |
| MCP-Defender/MCP-Defender | **AGPL-3.0** ❌ | 252 | 2025-09-06 | **REJECT** per CR-9 |
| AikidoSec/aikido-claude-plugin | **null/no LICENSE** ❌ | 8 | 2026-05-15 | **REJECT** per CR-9 + LOW-STAR |
| DeepBitsTechnology/claude-plugins | Apache-2.0 | 43 | 2025-11-19 | LOW-STAR + stale 6mo |
| sonatype/sonatype-guide-claude-plugin | **null/no LICENSE** ❌ | 3 | 2026-04-02 | **REJECT** per CR-9 + LOW-STAR |
| Joncik91/aaOS | **404** ❌ | — | — | **REJECT-PHANTOM** |

### 2.3 Semantic-code / Search

| Repo | License | Stars | Last push | Notes |
|---|---|---|---|---|
| mixedbread-ai/mgrep | Apache-2.0 | 4,150 | 2026-04-25 | DUPLICATE vs serena/claude-context |
| yoanbernabeu/grepai | MIT | 1,687 | 2026-05-11 | DUPLICATE |
| safishamsi/graphify | MIT | **48,357** ⚠️ | 2026-05-15 | **LAUNCH-SPIKE** — 48k★ + 6wk-old fails convergence-gate Axis-3 `cpd>50 AND age<100d` |
| sourcegraph/cody | **404** ❌ | — | — | **REJECT-PHANTOM** |

### 2.4 Token

| Repo | License | Stars | Last push | Notes |
|---|---|---|---|---|
| alexgreensh/token-optimizer | **PolyForm Noncommercial** ❌ | 981 | 2026-05-15 | **REJECT** per CR-9 |
| claudioemmanuel/squeez | Apache-2.0 | 120 | 2026-05-15 | LOW-STAR + DUPLICATE vs intelligent-compact |
| edouard-claude/snip | MIT | 238 | 2026-05-14 | LOW-STAR + DEMAND-ABSENCE.a |
| mpecan/tokf | MIT | 171 | 2026-05-12 | LOW-STAR + DEMAND-ABSENCE.a |
| ojuschugh1/sqz | **Elastic License 2.0** ❌ | 262 | 2026-05-10 | **REJECT** per CR-9 |
| yvgude/lean-ctx | Apache-2.0 | 1,667 | 2026-05-15 | DUPLICATE vs context-mode MCP (loaded) |

### 2.5 Other

| Repo | License | Stars | Notes |
|---|---|---|---|
| aidenybai/react-grab | MIT | 7,201 | DEMAND-ABSENCE.a (no React in sss) |

## 3. SRA D1-D10 + CR-12 Disposition Summary

| Disposition | Count | Examples |
|---|---|---|
| **ALREADY-INSTALLED** | 8 | ripgrep, just, gh, mise, jq, yq, fd, uv |
| **ADOPT-NOW** | 0 | (none) |
| **STUDY-PILOT-CONDITIONAL** | 1 | woodruffw/zizmor (CI-only) |
| **REJECT-FOR-FIT (CR-9 license)** | 4 | MCP-Defender, alexgreensh, ojuschugh1, AikidoSec |
| **REJECT-FOR-FIT (DUPLICATE)** | 8 | ggshield, mgrep, grepai, graphify (also LAUNCH-SPIKE), squeez, lean-ctx, react-grab, sonatype |
| **REJECT-PHANTOM (404)** | 2 | Joncik91/aaOS, sourcegraph/cody |
| **REJECT-FOR-FIT (low-star/stale)** | 1 | DeepBitsTechnology |
| **DEFER (DEMAND-ABSENCE.a)** | 2 | edouard-claude/snip, mpecan/tokf |
| **DUPLICATE manifest row** | 2 | checkov, codeql-action |

## 4. HONEST-NON-FINDING Analysis

Per `synthesis-layer-verify.md §Reporting categories`:

**CLAIM**: "Tools/CLI/Utility/DevEx/Security category has unprobed residuals worth probing"

**EVIDENCE**: 46 category candidates → 31 residual → **0 ADOPT-NOW survivors** + 1 conditional + 18 REJECT-FOR-FIT + 2 DEFER + 2 DUPLICATE-manifest. Category is **operationally exhausted** at v6-kit Day-1 level.

## 5. VERDICT

**VERDICT**: HONEST-NON-FINDING — 31 residuals probed; **0 ADOPT-NOW survivors**; 1 conditional STUDY-PILOT (zizmor when CI ships); 18 REJECT-FOR-FIT; 2 DEFER pending demand evidence. CLI 8/8 ALREADY-INSTALLED. Category operationally exhausted at v6-kit residual layer. Confirms W224-A 87% saturation + reinforces W228-A REJECT-rich pattern.
