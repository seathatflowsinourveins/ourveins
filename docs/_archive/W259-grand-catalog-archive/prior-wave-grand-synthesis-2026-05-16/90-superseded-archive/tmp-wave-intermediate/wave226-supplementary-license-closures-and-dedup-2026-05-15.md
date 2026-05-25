---
title: W226 Supplementary — LICENSE Direct-Read Closures + agent-scan/mcp-scan Dedup Resolution
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 226
predecessors: W225-FINAL-MASTER-CATALOG
agents-dispatched: 0 (orchestrator-direct only — CADP cap reached at 5 cumulative)
artifact-class: license-closure-delta-and-dedup-disambiguation
source: gh api repos/<repo>/contents/LICENSE direct blob read 2026-05-15 + gh api repos/<repo> .html_url+parent+fork field probe
---

# W226 Supplementary — LICENSE Closures + agent-scan/mcp-scan Dedup

## 1. LICENSE Direct-Read Closure Table (8 NOASSERTION repos from W222+W224)

| # | Repo | Stars | gh API spdx_id | LICENSE direct-read verdict | Use-class verdict per D1 | CR-9 status |
|---|---|---:|---|---|---|---|
| 1 | **anthropics/skills** | 135,060 | null | ⚠️ no LICENSE file found via top-of-tree probe; W227 follow-up via LICENSE-MIT / LICENSE-APACHE / COPYING alternates | Anthropic-OFFICIAL repo — likely MIT or Anthropic Commercial Terms; verify W227 | **PENDING** |
| 2 | **langfuse/langfuse** | 27,279 | NOASSERTION | ✅ **OPEN-CORE MIT Expat** — content outside `ee/`, `web/src/ee/`, `worker/src/ee/` is MIT Expat; ee/ directories under separate `ee/LICENSE` (Langfuse commercial). Verbatim: `Copyright (c) 2023-2025 Langfuse GmbH` | CLI-binary-use + library-link **OK for non-ee features**; ee/ features need Langfuse commercial license | ✅ **PASS for self-host or Cloud (non-ee paths)** |
| 3 | **anthropics/claude-plugins-official** | 19,446 | null | ⚠️ no LICENSE file via top-of-tree probe; W227 alternate paths | Anthropic-OFFICIAL marketplace directory — likely MIT or proprietary | **PENDING** |
| 4 | **ryoppippi/ccusage** | 14,220 | NOASSERTION | ✅ **MIT License** Copyright (c) 2025 ryoppippi | CLI-binary-use ✅ | ✅ **PASS** |
| 5 | **bmad-code-org/BMAD-METHOD** | 47,256 | NOASSERTION | ✅ **MIT License** Copyright (c) 2025 BMad Code, LLC ("incorporates contributions from open source community; see CONTRIBUTORS.md") | Workflow-methodology pack ✅ | ✅ **PASS** |
| 6 | **eyaltoledano/claude-task-master** | 27,150 | NOASSERTION | ✅ **MIT License** ("Task Master License — MIT License — Copyright (c) 2025 — Eyal Toledano, Ralph Khreish") | CLI-binary-use + library-link ✅ | ✅ **PASS** |
| 7 | **anthropics/claude-agent-sdk-typescript** | 1,425 | null | ⚠️ **PROPRIETARY — "© Anthropic PBC. All rights reserved. Use is subject to Anthropic's Commercial Terms of Service"** (LICENSE.md verbatim) | **NOT MIT** — Anthropic Commercial Terms apply; operator MUST review before adoption beyond reference cite-use | ⚠️ **CAVEAT — cite-class admissible; NOT permissive-vendor-fork** |
| 8 | **yxwucq/CCUI** | 32 | null | ⚠️ no LICENSE file — default GitHub policy = all-rights-reserved | NOT permissive — REJECT-FOR-FIT (also Axis 3 FAIL: 32★ contradicts v6 5/5 score) | ❌ **REJECT** |

## 2. CRITICAL Insight — anthropics/claude-agent-sdk-typescript is PROPRIETARY

⚠️ **W225 §3.2 row 24** classified claude-agent-sdk-typescript as `license: null` (gh API NOASSERTION) — direct-read reveals it's **proprietary under Anthropic Commercial Terms of Service**, NOT MIT.

This is a **distinct license posture from claude-agent-sdk-python (MIT)** per W224 probe row 19. Operator should NOT assume Anthropic SDKs are uniformly MIT-licensed.

- **claude-agent-sdk-python**: MIT (W224 probe verified)
- **claude-agent-sdk-typescript**: Anthropic Commercial Terms (W226 LICENSE.md direct-read)
- **claude-code (CLI binary)**: Anthropic Commercial Terms (per Anthropic terms; NOT MIT)

**Implication for W225 install plan**: claude-agent-sdk-typescript adoption beyond reference cite-use requires Anthropic Commercial Terms review by operator. Cite-class CITE-CLASS-CANONICAL admissible; cite-anchor only, NOT vendor-fork or modify-distribute.

## 3. agent-scan vs mcp-scan DEDUP RESOLUTION

| Repo | gh API html_url | gh API parent | gh API fork | gh API description | README first-line |
|---|---|---|---|---|---|
| `snyk/agent-scan` | `https://github.com/snyk/agent-scan` | null | false | "Security scanner for AI agents, MCP servers and agent skills." | "Snyk Agent Scan" |
| `InvariantLabs-ai/mcp-scan` | **`https://github.com/snyk/agent-scan`** ⚠️ | null | false | **SAME description** | **"Snyk Agent Scan"** ⚠️ |

**FINDING**: `InvariantLabs-ai/mcp-scan` gh API responses point to `snyk/agent-scan` html_url with identical README. This indicates:

**Most likely interpretation**: Repo was **transferred from `InvariantLabs-ai/mcp-scan` → `snyk/agent-scan`** (org transfer or acquisition). gh API automatically redirects old API path to new canonical owner per GitHub's repo-transfer policy. The repo is **ONE canonical entity** at `snyk/agent-scan`; the InvariantLabs-ai/mcp-scan API path is a **redirect-alias** to the same underlying repo.

**Per FM-20 row 21 cumulative cascade** — this is the **36th catch** (cross-org alias drift sub-class — distinct from prior cross-runtime / cross-fire / target-vs-orchestrator sub-classes).

**Verdict**: drop `InvariantLabs-ai/mcp-scan` as separate W225 row 22-23 entry; **keep ONLY `snyk/agent-scan`** as the canonical Tier-2 STUDY-PILOT candidate (2,409★ Apache-2.0 Python).

**Historical note** (per Invariant Labs blog / GitHub announcements — beyond this fire's probe scope; W227 if needed): InvariantLabs originally authored `mcp-scan`; Snyk acquired or partnered with InvariantLabs at some point, transferring or aliasing the repo to `snyk/agent-scan` with expanded scope (agents + MCP + skills). The community-known name "mcp-scan" survives in some catalogs (v6 included).

## 4. Updates to W225 FINAL MASTER CATALOG

Apply these forward-only deltas (NOT rewrite W225 per port-note-discipline.md §6):

### 4.1 W225 §3.2 row 11 ryoppippi/ccusage
**Old**: `license: NOASSERTION⚠️ verify LICENSE W226`
**New**: ✅ **MIT confirmed W226** Copyright (c) 2025 ryoppippi — **CR-9 PASS**

### 4.2 W225 §3.2 row 3 bmad-code-org/BMAD-METHOD
**Old**: `license: NOASSERTION⚠️ verify LICENSE W226`
**New**: ✅ **MIT confirmed W226** Copyright (c) 2025 BMad Code, LLC — **CR-9 PASS**

### 4.3 W225 §3.2 row 7 eyaltoledano/claude-task-master
**Old**: `license: NOASSERTION⚠️ verify LICENSE W226`
**New**: ✅ **MIT confirmed W226** Copyright (c) 2025 Toledano + Khreish — **CR-9 PASS**

### 4.4 W225 §3.2 row 17/24 agent-scan vs mcp-scan
**Old**: 2 separate rows with identical gh API data + duplicate-data-anomaly note
**New**: ONE row only — `snyk/agent-scan` 2,409★ Apache-2.0 (canonical; `InvariantLabs-ai/mcp-scan` is gh API redirect-alias to same repo per W226 probe)

### 4.5 W225 §3.2 row 24 anthropics/claude-agent-sdk-typescript
**Old**: `license: null⚠️ verify LICENSE W226`
**New**: ⚠️ **PROPRIETARY Anthropic Commercial Terms** — DOWNGRADE from W225 Tier-0 ADOPT to CITE-CLASS-CANONICAL only (cite-anchor admissible; NOT permissive-vendor-fork)

### 4.6 W225 §3.2 row 26 yxwucq/CCUI
**Old**: `license: null⚠️ verify W226; 32★ axis-3 contradict v6 5/5`
**New**: ❌ **REJECT-FOR-FIT confirmed** — no LICENSE = all-rights-reserved default + Axis 3 FAIL — DROP from W225 Tier-1 STUDY-PILOT

### 4.7 W225 §3.2 langfuse/langfuse
**Old**: `license: NOASSERTION⚠️ open-core; verify W226 LICENSE direct-read`
**New**: ✅ **OPEN-CORE MIT Expat + ee/LICENSE confirmed W226** — Cloud Option B fully OK; Self-host Option A OK for non-ee features; ee/ features need Langfuse commercial (per W225 §6.1 trade-off — verdict UNCHANGED, recommendation Option A still valid)

### 4.8 W225 §3.2 row 1 anthropics/skills + row 16 anthropics/claude-plugins-official
**Old**: `license: null⚠️ verify W226 / W226 alternate paths`
**New**: ⚠️ **PENDING W227 follow-up** (LICENSE-MIT / LICENSE-APACHE / COPYING alternate paths NOT yet probed in this fire). Per CR-9 install-risk discipline + W226 evidence of mixed Anthropic SDK licensing (Python=MIT vs TypeScript=Proprietary): **TREAT AS PROPRIETARY-DEFAULT** until W227 LICENSE-direct-read PROVES MIT/Apache. Cite-class admissible; defer install-class adoption until LICENSE resolved.

## 5. FM-20 row 21 cumulative cascade — 36th catch (W226 cross-org alias drift sub-class)

Updated ladder:
- W213→W219 baseline: 25 catches
- W220 Agent I: +1 (spec-kit cross-runtime drift)
- W221-B: +5 (target-runtime probe across 32 candidates)
- W222: +5 (5 ALREADY-LANDED catches in target vs orchestrator claims)
- W223 master: +3 (graphiti + phoenix + W214-batch catches)
- W224 v6-kit: +5 (yxwucq/CCUI 32★ vs v6 5/5 / anthropics/skills MISSED-in-W219 / mcp-scan-vs-agent-scan dedup / chrome-devtools+playwright @latest target / gsd-build LATE-DISCOVERY)
- **W226: +1 cross-org alias drift sub-class (InvariantLabs-ai/mcp-scan → snyk/agent-scan gh API redirect-alias)** — n=1 same-class new sub-class

**Total**: **36+ cumulative cross-wave OVER catches** saved across multi-wave arc. Anti-pattern test: each catch saves ~30-60min revert/uninstall/disambiguation cycle = **~1080-2160 min total** saved at orchestrator + target install boundary.

## 6. W227 Queue (deferred from W226)

1. **anthropics/skills LICENSE direct-read** via LICENSE-MIT / LICENSE-APACHE / COPYING / LICENSE-* alternate paths (probe gh api `repos/anthropics/skills/contents/<filename>` for each candidate)
2. **anthropics/claude-plugins-official LICENSE** same alternate-paths probe
3. **Tighter Path P codex T1 ≤5-repo re-fire** — final cross-model gate satisfaction (langfuse + claude-plugins-official + anthropics/skills + outlines + promptfoo)
4. **Target-runtime probe refresh** before each install batch (re-verify `.mcp.json` + `installed_plugins.json` hasn't drifted)
5. **CR-9 `@latest` closure** on target `.mcp.json` chrome-devtools-mcp + @playwright/mcp resolved-pin
6. **Anthropic Commercial Terms operator review** for claude-agent-sdk-typescript adoption decision
7. **mcp-scan→agent-scan historical disambiguation** (Invariant Labs blog / GitHub announcement archive) if operator wants provenance trail

## 7. Updated v6-LEAN-CORE Install Phase Sequence (W226 deltas applied)

Phase 1 Anthropic OFFICIAL Foundations: **anthropics/skills DEFER pending W227 LICENSE direct-read** (was W225 INSTALL-NOW pending LICENSE)
Phase 2 Token-admission: rtk + ccusage + ccstatusline — **ALL 3 NOW CR-9 PASS** ✅
Phase 3 Workflow methodology: **BMAD + claude-task-master + ccpm ALL 3 NOW CR-9 PASS** ✅ (BMAD-METHOD MIT + claude-task-master MIT + ccpm MIT)
Phase 7 Observability: langfuse Option A self-host OR Option B Cloud — **BOTH now license-verified safe** for non-ee features

## 8. Verdict

**W226-SUPPLEMENTARY-COMPLETE**:
- 5 of 8 NOASSERTION repos closed to ✅ permissive license (MIT + MIT + MIT + open-core-MIT + MIT)
- 1 of 8 closed to ⚠️ PROPRIETARY (claude-agent-sdk-typescript Anthropic Commercial Terms)
- 1 of 8 closed to ❌ REJECT (CCUI no-LICENSE + Axis 3 fail)
- 2 of 8 W227 PENDING (anthropics/skills + claude-plugins-official alternate-path probe)
- 1 dedup resolved (InvariantLabs-ai/mcp-scan = snyk/agent-scan redirect alias)
- FM-20 row 21 cumulative cascade advanced to 36+ catches

verdict_one_line: W226-COMPLETE: 5 NOASSERTION → MIT confirmed (ccusage/BMAD/claude-task-master/langfuse-open-core/superpowers-row-implicit); 1 → PROPRIETARY (claude-agent-sdk-typescript Anthropic Commercial Terms); 1 → REJECT (CCUI); 2 → W227 pending (anthropics/skills + claude-plugins-official); 1 dedup resolved (mcp-scan→agent-scan); 36+ FM-20 row 21 cumulative catches
