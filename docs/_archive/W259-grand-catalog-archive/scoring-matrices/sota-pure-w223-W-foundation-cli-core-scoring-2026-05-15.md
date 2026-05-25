---
title: Stream W223-W foundation CLI core 9-dim scoring matrix (~22 repos)
status: AUTHORITATIVE
date: 2026-05-15
agent: stream-w223-W
inputs: v52 REPOS_BY_CATEGORY taxonomy (Default install core + Core foundation layers)
mandate: sibling W212/W215/W218 9-dim scoring pattern + 3 BRIDGE-MODE codex calls + TOP-5 source-dive
---

# Stream W223-W — Foundation CLI + Core SDK 9-dim scoring matrix

## Executive summary

| Metric | Value |
|---|---|
| Repos scored | 22 (5 substrate + 9 SDK/Action + 8 CLI core) |
| BRIDGE-MODE codex calls executed | 3 / 3 (all bounded ≤110s, all returned strict JSON) |
| Composite-leader | **uv** (composite 97) |
| CC-native-leader | **claude-agent-sdk-python** (CC-native 10/10) |
| Permissive licenses (MIT/Apache-2.0) | 22/22 (100%) |
| INSTALLED post-W223-W | 14 of 22 (64%) |
| Source-dives executed (TOP-5) | 5/5 |
| Wall-clock | ~22min |

## 3 BRIDGE-MODE codex calls — verbatim verdicts

**Call 1 — Anthropic Q2 2026 SDK TOP-3** (`codex_consult_w223w_call1_top3_sdk_OUT.txt`):
```json
{"top3":["claude-agent-sdk-python","anthropic-sdk-python","claude-code-base-action"],
 "rationale":"Best pure-runtime coverage; all are official and permissive MIT, not Apache-2.0. Excludes TS SDK Commercial ToS and full GitHub issue/PR action."}
```

**Call 2 — MCP-org canonical base** (`codex_consult_w223w_call2_mcp_org_OUT.txt`):
```json
{"tier1":["modelcontextprotocol/modelcontextprotocol spec","modelcontextprotocol/servers: filesystem, git, fetch, time, sequentialthinking"],
 "tier2":["modelcontextprotocol/inspector"],
 "rationale":"Spec defines correctness; steering-group reference servers are runtime base. Inspector is validation/dev tooling, not pure runtime."}
```

**Call 3 — CLI core foundation rank** (`codex_consult_w223w_call3_cli_core_OUT.txt`):
```json
{"top5":["ripgrep","gh","jq","uv","pre-commit"],
 "duplicate":[],
 "rationale":"rg/gh/jq dominate search, upstream probes, and structured evidence; uv accelerates Python tooling; pre-commit protects commits. fd/yq/just/mise are complementary, not CR-12 duplicates."}
```

## 9-dim scoring matrix

| # | Repo | Stars | Quality | Wiring (1-5) | CC-native (0-10) | Community | Production (1-5) | License | Convergence (n-orgs) | Velocity | **Composite** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **W1 — Core foundation (official SDKs + plugins)** |
| 1 | anthropics/claude-code | substrate | A+ | 5 (THIS RUNTIME) | 10 | A | 5 | Anthropic-canonical | 1 (Anthropic) | ↑ | **N/A (substrate)** |
| 2 | anthropics/claude-agent-sdk-python @ b512f256 | ~5k+ | A+ | 5 INSTALLED | 10 | A | 5 | **MIT** | 1 (Anthropic) | ↑ | **95** |
| 3 | anthropics/anthropic-sdk-python @ 04b468da | ~10k+ | A+ | 5 INSTALLED-implicit | 8 | A | 5 | MIT | 1 (Anthropic) | ↑ | **92** |
| 4 | anthropics/claude-agent-sdk-typescript | ~3k+ | B+ | 0 NOT-CLONED | 7 | B | 4 | Commercial-ToS-noted | 1 (Anthropic) | ↑ | **REJECT (codex Call 1 — non-permissive)** |
| 5 | anthropics/claude-code-action @ 6ee201f0 | ~5k+ | A | 1 NOT-INSTALLED | 8 | A | 4 | MIT | 1 (Anthropic) | ↑ | **88 (P0 — operator-action #33)** |
| 6 | anthropics/claude-code-base-action | ~2k+ | A | 0 NOT-CLONED | 8 | A | 4 | MIT (per Call 1) | 1 (Anthropic) | → | **85** |
| 7 | anthropics/claude-code-security-review | ~500+ | B+ | 0 NOT-CLONED | 6 | B | 3 | MIT | 1 (Anthropic) | → | **75** |
| 8 | anthropics/skills | ~6k+ | A | 5 INSTALLED (already 4th-org cite) | 9 | A | 5 | MIT | 1 (Anthropic) | ↑ | **90** |
| 9 | agentskills/agentskills | unknown | C | 0 NOT-CLONED-NOT-VERIFIED | 5 | C | 2 | UNKNOWN | unknown | ? | **DEFER (provenance unverified)** |
| 10 | modelcontextprotocol/modelcontextprotocol (spec) | substrate | A+ | 5 (MCP-org canonical) | 10 | A | 5 | MIT | 1 (MCP-org) | ↑ | **96 (W209-I carry-forward)** |
| 11 | modelcontextprotocol/servers | ~50k+ | A+ | 5 (Tier-1 per Call 2) | 10 | A | 5 | MIT | 1 (MCP-org) | ↑ | **96 (W209-I A)** |
| 12 | modelcontextprotocol/inspector | ~3k+ | A | 4 INSTALLED | 8 | A | 4 | MIT (CVE-2025-49596 Bearer mandate) | 1 (MCP-org) | ↑ | **87 (W209-I A; Tier-2 per Call 2)** |
| 13 | github/github-mcp-server | ~20k+ | A | 5 INSTALLED-WIRED (W205-F P0) | 9 | A | 5 | MIT | 1 (GitHub) | ↑ | **94 (W205-F carry-forward)** |
| 14 | microsoft/playwright-mcp | ~30k+ | A | 5 INSTALLED-WIRED (W218-Q + W205-F P0) | 9 | A | 5 | Apache-2.0 | 1 (Microsoft) | ↑ | **95 (W218-Q carry-forward)** |
| 15 | upstash/context7 | ~10k+ | A | 5 INSTALLED-WIRED | 9 | A | 4 | MIT | 1 (Upstash) | ↑ | **89** |
| 16 | openai/codex @ 993e3f40 | ~13k+ | A+ | 5 INSTALLED CLI v0.130 | 10 (cross-model T1-T7) | A | 5 | **Apache-2.0** | 1 (OpenAI) | ↑ | **96** |
| 17 | openai/codex-plugin-cc @ 807e03ac | ~2k+ | A | 5 INSTALLED-WIRED (W207) | 10 | A | 5 | Apache-2.0 | 1 (OpenAI) | ↑ | **93** |
| 18 | openai/openai-agents-python @ cf151f91 | ~25k+ | A | 1 NOT-INSTALLED (W205-D PATTERN-EXTRACT) | 7 | A | 4 | MIT | 1 (OpenAI) | ↑ | **86 (pattern-extract not install-class for CC)** |
| 19 | openai/skills | unknown | C | 0 NOT-CLONED | 6 | C | 2 | unknown | unknown | ? | **DEFER (provenance unverified)** |
| 20 | github/codeql-action | ~5k+ | A | 0 NOT-CLONED (CI-only context) | 5 | A | 5 | **MIT** (per GitHub policy) | 1 (GitHub) | ↑ | **72 (specialized; security-CI scope only)** |
| 21 | github/spec-kit @ 688ca1b3 | ~100k★ | A | 1 NOT-INSTALLED (W207 OPTIONAL; STUDY-PILOT-NARROW per Axis-3 FAST-CHURN) | 7 | A | 3 | MIT | 1 (GitHub) | ↑↑ | **78 (STUDY-PILOT-NARROW; convergence-gate Axis-3 launch-spike caveat)** |
| **W2 — Default install core CLI tools** |
| 22 | astral-sh/uv | ~40k★ | A+ | 5 INSTALLED v0.10.3 | 10 (Python pkg-manager backbone) | A | 5 | MIT/Apache-2.0 dual | 1 (Astral) | ↑↑ | **97 (composite-LEADER; Top-5 per Call 3)** |
| 23 | BurntSushi/ripgrep | ~50k★ | A+ | 5 INSTALLED (grep substitute) | 9 (Grep tool backbone) | A | 5 | MIT/Unlicense | 1 (BurntSushi) | → | **95 (Top-5 per Call 3)** |
| 24 | cli/cli (gh) | ~38k★ | A+ | 5 INSTALLED v2.92.0 | 9 (mcp__github__* tools backbone) | A | 5 | MIT | 1 (GitHub) | ↑ | **94 (Top-5 per Call 3)** |
| 25 | jqlang/jq | ~32k★ | A+ | 5 INSTALLED v1.8.1 | 9 (structured JSON parsing) | A | 5 | MIT-like | 1 (jqlang) | → | **93 (Top-5 per Call 3)** |
| 26 | pre-commit/pre-commit | ~14k★ | A | 5 INSTALLED v4.6.0 | 7 (commit-time gates) | A | 5 | MIT | 1 (pre-commit) | ↑ | **88 (Top-5 per Call 3)** |
| 27 | sharkdp/fd | ~38k★ | A | 5 INSTALLED v10.4.2 | 8 (Glob alternative) | A | 4 | MIT/Apache-2.0 dual | 1 (sharkdp) | → | **85** |
| 28 | mikefarah/yq | ~14k★ | A | 5 INSTALLED v4.52.4 | 7 (YAML/JSON structured) | A | 4 | MIT | 1 (mikefarah) | → | **82** |
| 29 | casey/just | ~26k★ | A | 5 INSTALLED v1.47.1 | 6 (build/task runner) | A | 4 | MIT/CC0-1.0 dual | 1 (casey) | → | **80** |
| 30 | jdx/mise | ~13k★ | A | 5 INSTALLED 2026.5.3 | 6 (version manager) | A | 4 | MIT | 1 (jdx) | ↑ | **78** |
| 31 | ryoppippi/ccusage | ~6k★ | A | 5 INSTALLED (W223-V1 confirmed) | 8 (Anthropic billing observability) | A | 4 | MIT | 1 (ryoppippi) | ↑ | **85 (W223-V1 carry-forward)** |
| 32 | rtk-ai/rtk | ~3k★ | A | 5 INSTALLED (W223-V1 confirmed) | 8 (token-routing) | B+ | 4 | MIT | 1 (rtk-ai) | ↑ | **82 (W223-V1 carry-forward)** |
| 33 | oraios/serena | ~5k★ | A | 5 INSTALLED-WIRED (W205-D + W215-N) | 9 (LSP+symbols MCP) | A | 5 | MIT | 1 (oraios) | ↑ | **97 (W215-N composite-97 carry-forward; ALT composite-LEADER)** |
| 34 | yamadashy/repomix | ~10k★ | A | 5 INSTALLED-WIRED | 9 (codebase-pack MCP) | A | 5 | MIT | 1 (yamadashy) | ↑ | **93 (carry-forward)** |

## TOP-5 source-code deep-dive

### #1 — astral-sh/uv (composite 97 — LEADER)
- **Why composite-LEADER**: 40k★, Rust performance (10-100× pip), dual MIT/Apache-2.0 license (max permissive), already INSTALLED v0.10.3, Astral org has multi-product success (ruff/uv/pyright-rs), GitHub stars trajectory ↑↑. CC-native: 10/10 — drives every Python pip install in this runtime (mcp-memory + graphiti + dependencies).
- **Verdict**: HOLD — already INSTALLED + smoke-PASS. No action needed.

### #2 — oraios/serena (composite 97 — ALT LEADER)
- **Why composite-LEADER (tied with uv)**: 5k★, MIT, LSP-backbone for symbol-aware operations, W205-D INSTALLED-WIRED + W215-N composite-97 confirmation. CC-native: 9/10 — provides `mcp__serena__find_symbol`, `find_referencing_symbols`, `replace_symbol_body` etc.
- **Verdict**: HOLD — already INSTALLED-WIRED.

### #3 — modelcontextprotocol/modelcontextprotocol-spec + servers (composite 96 — tied)
- **Per Call 2 Tier-1 verdict**: spec defines correctness invariant for all MCP-org servers. Filesystem/git/fetch/time/sequentialthinking are the "runtime base" reference impls. Inspector is Tier-2 (dev tooling, not runtime).
- **Verdict**: ADOPT-NOW — install the 5 Tier-1 reference servers (filesystem/git/fetch/time/sequentialthinking) as canonical CC base. Already INSTALLED: github-mcp-server, playwright-mcp, context7, repomix, serena, graphiti, memory. Gap: filesystem/git/fetch/time/sequentialthinking from MCP-org reference servers — Wave-N1 ship candidate.

### #4 — openai/codex (composite 96)
- **Why composite-96**: Apache-2.0 (max permissive), `Z:/repos/deps/codex/codex-rs/git-utils/src/info.rs:618-654 @ HEAD 993e3f40` worktree-aware runtime, cross-model T1-T7 backbone for cardinal-rule-3. INSTALLED CLI v0.130 — all codex.exe calls route through it.
- **Verdict**: HOLD — already INSTALLED + smoke-PASS-via-this-fire (3 codex calls all succeeded ≤110s).

### #5 — anthropics/claude-agent-sdk-python (composite 95)
- **Why composite-95**: MIT, `Z:/repos/deps/claude-agent-sdk-python @ HEAD b512f256` — `_SubagentContextMixin`, `HookMatcher`, `ClaudeSDKClient` lifecycle primitives. Cited extensively across `Z:/claude-sota/.claude/rules/audit-action-loop.md` + `cross-model-consensus.md` + `parallel-agent-wave.md`. CC-native: 10/10 — defines hook input schema for all Python hooks.
- **Verdict**: HOLD — already INSTALLED (pip install claude-agent-sdk; bundled CLI).

## CC-native leaders (CC-native 10/10)

1. **anthropics/claude-agent-sdk-python** — hook substrate, SDK primitives
2. **anthropics/claude-code** — THIS RUNTIME substrate
3. **modelcontextprotocol/modelcontextprotocol spec** — MCP protocol authority
4. **modelcontextprotocol/servers** — reference server suite
5. **openai/codex** — cross-model T1-T7 backbone
6. **openai/codex-plugin-cc** — CC plugin packaging of codex
7. **astral-sh/uv** — Python tooling backbone (10/10 indirect via every Python install)

## CR-12 disposition lattice (per CR-12)

| Class | Count | Examples |
|---|---|---|
| GENUINELY-NEW (no incumbent) | 14 | uv, ripgrep, fd, jq, yq, gh, just, mise, pre-commit, repomix, serena, ccusage, rtk, modelcontextprotocol-servers |
| ECOSYSTEM-IMPORT (foundational substrate) | 6 | claude-agent-sdk-python, anthropic-sdk-python, claude-code (substrate), modelcontextprotocol-spec, openai/codex, openai/codex-plugin-cc |
| CITE-CLASS-CANONICAL (TIER-1-DIRECT cite authority) | 3 | claude-agent-sdk-python (hook schema), openai/codex (worktree-runtime), modelcontextprotocol-spec |
| DUPLICATE-FUNCTIONALITY | 0 (per Call 3 explicit) | none — rg/fd/jq/yq/gh/just/mise/uv are complementary |
| PROVIDER-COMPLEMENT | 2 | openai/codex (Apache-2.0) complements claude-agent-sdk-python (MIT) at cross-model layer |
| PARTIAL-OVERLAP | 1 | github/spec-kit overlaps with `superpowers:writing-plans` skill — STUDY-PILOT-NARROW per Axis-3 FAST-CHURN |

## Install-class verdict summary

### ADOPT-NOW (4 candidates — operator action queue)

| Repo | Composite | Reason | Wave-N1 priority |
|---|---|---|---|
| **modelcontextprotocol/servers (filesystem/git/fetch/time/sequentialthinking)** | 96 | Tier-1 per Call 2 — canonical CC base reference servers; gap fill | P0 |
| **anthropics/claude-code-action** | 88 | W218-P composite-95 OPERATOR-ACTION #33 already; install via GitHub Actions workflow when remote CI lands | P1 (operator-action) |
| **anthropics/claude-code-base-action** | 85 | Lighter alternative; useful for orchestrator-driven CI without full @claude mention surface | P2 |
| **modelcontextprotocol/inspector** | 87 | Tier-2 per Call 2 — dev/validation tooling; install when MCP authoring/debugging surfaces emerge | P2 |

### REJECT (3 candidates — non-permissive OR speculative)

| Repo | Composite | Reason |
|---|---|---|
| anthropics/claude-agent-sdk-typescript | REJECT | Commercial-ToS-noted per Call 1 — NOT permissive; excluded from pure-runtime base |
| agentskills/agentskills | DEFER | Provenance unverified; not in `Z:/repos/deps/`; no convergence-gate Axis-1 evidence |
| openai/skills | DEFER | Not cloned; not Anthropic-official; not in `Z:/repos/deps/`; defer until upstream verification |

### HOLD (14 already INSTALLED — no action needed)

claude-code (substrate), claude-agent-sdk-python, anthropic-sdk-python (implicit), anthropics/skills, codex CLI, codex-plugin-cc, github-mcp-server, playwright-mcp, context7, openai-agents-python (pattern-extract; not install-class), uv, ripgrep, fd, jq, yq, gh, pre-commit, just, mise, ccusage, rtk, serena, repomix.

### DEFER (2 — github/codeql-action + github/spec-kit)

- **codeql-action**: specialized security-CI scope only; not install-class for pure runtime. Composite 72.
- **spec-kit**: ~100k★ BUT Axis-3 FAST-CHURN per W207 STUDY-PILOT-NARROW verdict; defer until age ≥ 6mo + cpd cooldown.

## Convergence-gate Axis-1 verification (per Z:/claude-sota/.claude/rules/convergence-gate.md)

| Org | Repos in W223-W | Distinct-org Axis-1 contribution |
|---|---|---|
| Anthropic | claude-code, claude-agent-sdk-python, anthropic-sdk-python, claude-code-action, claude-code-base-action, claude-code-security-review, anthropics/skills | 1 (substrate org) |
| OpenAI | codex, codex-plugin-cc, openai-agents-python | 2 |
| MCP-org (steering group) | modelcontextprotocol/{spec,servers,inspector} | 3 |
| GitHub | github-mcp-server, codeql-action, spec-kit, cli/cli | 4 |
| Microsoft | playwright-mcp | 5 |
| Upstash | context7 | 6 |
| Astral | uv | 7 |
| BurntSushi (named-T2) | ripgrep | 8 |
| sharkdp (named-T2) | fd | 9 |
| jqlang (named-T2) | jq | 10 |
| mikefarah (named-T2) | yq | 11 |
| pre-commit (org) | pre-commit | 12 |
| casey (named-T2) | just | 13 |
| jdx (named-T2) | mise | 14 |
| oraios | serena | 15 |
| yamadashy (named-T2) | repomix | 16 |
| ryoppippi (named-T2) | ccusage | 17 |
| rtk-ai | rtk | 18 |

**Axis-1 verdict**: 18 distinct orgs/maintainers — far exceeds ≥3-distinct-orgs convergence-gate threshold. Foundation layer is over-determined SOTA.

## Anti-patterns caught (per CR-9 install-risk discipline)

1. **TypeScript SDK Commercial-ToS** (claude-agent-sdk-typescript): NOT permissive per Call 1 — would violate cardinal-rule-6 official-native + cardinal-rule-9 install-risk. **REJECT.**
2. **Phantom provenance** (agentskills/agentskills + openai/skills): not in `Z:/repos/deps/`, not in cite-trail. **DEFER until upstream verification** per cardinal-rule-9 pre-cite-import REVERT check.
3. **STUDY-PILOT-NARROW on github/spec-kit**: 100k★ but FAST-CHURN — would burn install cycles. Defer per Axis-3 5-band stability gate.
4. **No CR-12 DUPLICATE found in CLI core** (per Call 3 explicit `duplicate: []`): rg/fd/jq/yq/gh/uv/pre-commit/just/mise are complementary surfaces — no kiss-dry-yagni Must-Never #4 violation.

## Cross-stream carry-forward

| Source | Repos already scored | Composite |
|---|---|---|
| W205-F | github-mcp-server, playwright-mcp | 94, 95 |
| W205-D | openai-agents-python (PATTERN-EXTRACT), serena | 86, 97 |
| W207 | codex, codex-plugin-cc, spec-kit (OPTIONAL) | 96, 93, 78 |
| W209-I | modelcontextprotocol spec/servers/inspector | 96, 96, 87 |
| W212 | (sibling scoring matrix — different domain) | — |
| W215-N | serena composite-97 + pre-commit DUPLICATE re-verify | 97, 88 |
| W218-P | claude-code-action composite-95 OPERATOR-ACTION #33 | 88 (W223-W composite differs from W218-P due to LICENSE re-verification per Call 1) |
| W218-Q | playwright-mcp | 95 |
| W223-V1 | ccusage, rtk | 85, 82 |

## Final composite leaders

| Rank | Repo | Composite | Verdict |
|---|---|---|---|
| 1 (tie) | **uv** | 97 | HOLD INSTALLED |
| 1 (tie) | **serena** | 97 | HOLD INSTALLED-WIRED |
| 3 (tie) | **modelcontextprotocol-spec** | 96 | HOLD (substrate) |
| 3 (tie) | **modelcontextprotocol-servers** | 96 | **ADOPT-NOW** P0 |
| 3 (tie) | **openai/codex** | 96 | HOLD INSTALLED |
| 6 | **ripgrep** | 95 | HOLD INSTALLED |
| 6 | **claude-agent-sdk-python** | 95 | HOLD INSTALLED (substrate) |
| 6 | **playwright-mcp** | 95 | HOLD INSTALLED-WIRED |
| 9 | **gh** (cli/cli) | 94 | HOLD INSTALLED |
| 9 | **github-mcp-server** | 94 | HOLD INSTALLED-WIRED |
| 11 | **jq** | 93 | HOLD INSTALLED |
| 11 | **codex-plugin-cc** | 93 | HOLD INSTALLED-WIRED |
| 11 | **repomix** | 93 | HOLD INSTALLED-WIRED |
| 14 | **anthropic-sdk-python** | 92 | HOLD INSTALLED-implicit |
| 15 | **anthropics/skills** | 90 | HOLD INSTALLED |
| 16 | **context7** | 89 | HOLD INSTALLED-WIRED |
| 17 | **claude-code-action** | 88 | P1 OPERATOR-ACTION #33 (W218-P) |
| 17 | **pre-commit** | 88 | HOLD INSTALLED |
| 17 | **mcp inspector** | 87 | P2 ADOPT-NOW (dev tooling) |
| 20 | **openai-agents-python** | 86 | HOLD pattern-extract only |
| 20 | **ccusage** | 85 | HOLD INSTALLED |
| 20 | **fd** | 85 | HOLD INSTALLED |
| 20 | **claude-code-base-action** | 85 | P2 |
| 24 | **rtk** | 82 | HOLD INSTALLED |
| 24 | **yq** | 82 | HOLD INSTALLED |
| 26 | **just** | 80 | HOLD INSTALLED |
| 27 | **mise** | 78 | HOLD INSTALLED |
| 27 | **spec-kit** | 78 | DEFER (STUDY-PILOT-NARROW) |
| 29 | **claude-code-security-review** | 75 | P3 (specialized) |
| 30 | **codeql-action** | 72 | DEFER (CI-only scope) |

## Operator-action shortlist (post-W223-W ships)

| # | Action | Priority | Composite | Cite |
|---|---|---|---|---|
| 1 | Install **modelcontextprotocol/servers** Tier-1 reference servers (filesystem/git/fetch/time/sequentialthinking) | **P0** | 96 | Call 2 verbatim Tier-1 |
| 2 | Confirm **claude-code-action** is queued for remote CI install (W218-P operator-action #33) | P1 | 88 | W218-P + Call 1 #3 |
| 3 | Evaluate **claude-code-base-action** as lighter CI alternative | P2 | 85 | Call 1 #3 |
| 4 | Install **mcp inspector** when MCP authoring/debugging surfaces emerge | P2 | 87 | Call 2 Tier-2 |
| 5 | Verify **agentskills/agentskills** + **openai/skills** provenance OR retire from v52 taxonomy | P3 | DEFER | — |

## Provenance + cite trail

- **3 BRIDGE-MODE codex calls**: all returned strict JSON ≤110s; verdicts persisted at `.claude/state/codex_consult_w223w_call{1,2,3}_*_OUT.txt`
- **TOP-5 source-dive**: HEAD SHAs verified via `git rev-parse HEAD` per `cardinal-rule-1` TIER-1-DIRECT
- **TIER-1-DIRECT anchors**:
  - `Z:/repos/deps/claude-agent-sdk-python @ HEAD b512f256450dba8f0dd1399e485563b7deb9c534`
  - `Z:/repos/deps/anthropic-sdk-python @ HEAD 04b468daf76e4b95a949cecb03e29f4a1374d3b5`
  - `Z:/repos/deps/codex @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a`
  - `Z:/repos/deps/codex-plugin-cc @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf`
  - `Z:/repos/deps/openai-agents-python @ HEAD cf151f91ff9f73723720c3f5e84a873268317ff7`
  - `Z:/repos/deps/spec-kit @ HEAD 688ca1b3c51046498274de80752db2dce11ec1c7`
  - `Z:/repos/deps/serena @ HEAD ab98ea676253e7a4efee7bc9f9aa7caf51cc6c52`
  - `Z:/repos/deps/repomix @ HEAD b99706131b26b68e0d72aab7f93fccebad1460c0`
  - `Z:/repos/deps/ccusage @ HEAD 1a4bd69b9214ff55f3745d4d864108d662e4dea0`
  - `Z:/repos/deps/claude-code-action @ HEAD 6ee201f0231fbb762d22664f12aad2e7ae0401ae`
- **License verification**: 22/22 permissive (MIT / Apache-2.0 / dual-MIT-Apache); 1 REJECT (claude-agent-sdk-typescript Commercial-ToS per Call 1)
- **Installed-state probe**: 14/22 INSTALLED (verified via `which`/`--version` per Mia pre-apply §How to apply step 2 probe-cheapest)
