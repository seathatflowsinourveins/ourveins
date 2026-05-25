---
title: Wave 219 Agent A — P2 License Closure Direct LICENSE Probes
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in disclosed per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
cross-model-gate: NOT-STRUCTURALLY-SATISFIED — orchestrator MUST file W219 Path P codex T1 ratification before ADOPT-NOW prescription lands
dispatch-class: SUBAGENT-FORK (read-only research probe per CR-9 step 5 exemption)
output-budget: 500 LOC ceiling
---

# Wave 219 Agent A — P2 License Closure

## STAND-IN-NOTICE

Agent ran under `CLAUDE_CODE_SUBAGENT_MODEL` stand-in per `Z:/claude-sota/CLAUDE.local.md` ENV (f); codex CLI not invoked at this subagent layer; verdict is Sonnet stand-in only. Orchestrator MUST file W219 Path P codex T1 ratification per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §Recovery actions for orchestrator` before any ADOPT-NOW prescription based on this evidence lands in target runtime `Z:\claude-sota-pure\`.

Cross-model gate satisfaction = TIER-1-DIRECT cite anchors (`mcp__github__get_file_contents` blob results at HEAD SHA) verified at this layer; STRUCTURAL cross-model gate per CR-3 satisfied separately at orchestrator-level Path P codex foreground+tee dispatch.

## Section 1 — 11-row LICENSE-Direct-Read Closure Table

| # | Repo | LICENSE SPDX | Classification | Cite Anchor [VERIFIED 2026-05-15] | Recommend |
|---|---|---|---|---|---|
| 1 | `anthropics/cwc-long-running-agents` | **Apache-2.0** | PERMISSIVE-PASS | `mcp__github__get_file_contents anthropics/cwc-long-running-agents/LICENSE @ blob-SHA d645695673349e3947e8e5ae42332d0ac3164cd7` | ✅ **ADOPT-NOW**-eligible |
| 2 | `github/github-mcp-server` | **MIT** | PERMISSIVE-PASS | `mcp__github__get_file_contents github/github-mcp-server/LICENSE @ blob-SHA 9a9cc50d37ea399f7ccc2f14b6c6d4cc4de02efc` (Copyright (c) 2025 GitHub) | ✅ **ADOPT-NOW**-eligible |
| 3 | `anthropics/claude-code-security-review` | **MIT** | PERMISSIVE-PASS | `mcp__github__get_file_contents anthropics/claude-code-security-review/LICENSE @ blob-SHA aadec62f5cf87aae35a0423382bca6f2849abdb5` (Copyright (c) 2025 Anthropic) | ✅ **ADOPT-NOW**-eligible. **W218 INFERENCE CORRECTION**: prior INFERRED Apache-2.0 was WRONG; actual is MIT |
| 4 | `anthropics/claude-code-action` | **MIT** | PERMISSIVE-PASS | `mcp__github__get_file_contents anthropics/claude-code-action/LICENSE @ blob-SHA 3fa6a64e52f30d3ad836f98b3f0da6f4b6263bb8` (Copyright (c) 2025 Anthropic, PBC) | ✅ **ADOPT-NOW**-eligible. **W218 INFERENCE CORRECTION**: prior INFERRED Apache-2.0 was WRONG; actual is MIT |
| 5 | `awslabs/mcp` | **Apache-2.0** | PERMISSIVE-PASS | `mcp__github__get_file_contents awslabs/mcp/LICENSE @ blob-SHA 67db8588217f266eb561f75fae738656325deac9` | ✅ **ADOPT-NOW**-eligible |
| 6 | `grafana/mcp-grafana` | **Apache-2.0** | PERMISSIVE-PASS | `mcp__github__get_file_contents grafana/mcp-grafana/LICENSE @ blob-SHA 5a83bb01798d1f65b7ac174fae77323c79d1a5f3` (Copyright 2025 Grafana Labs) | ✅ **ADOPT-NOW**-eligible |
| 7 | `trailofbits/claude-code-devcontainer` | **Apache-2.0** | PERMISSIVE-PASS | `mcp__github__get_file_contents trailofbits/claude-code-devcontainer/LICENSE @ blob-SHA bd81383bbb1a846848394f0754603add844b6cd8` (Copyright 2025 Trail of Bits, Inc.) | ✅ **ADOPT-NOW**-eligible |
| 8 | `gsd-build/get-shit-done` | **MIT** | PERMISSIVE-PASS | `mcp__github__get_file_contents gsd-build/get-shit-done/LICENSE @ blob-SHA 33268753639eeabc2f1b25aff79a50359152968c` (Copyright (c) 2025 Lex Christopherson) | ✅ **ADOPT-NOW**-eligible. **W218 cite-import-AMBER** confirmed |
| 9 | `wshobson/agents` | **MIT** | PERMISSIVE-PASS | `mcp__github__get_file_contents wshobson/agents/LICENSE @ blob-SHA 326f0a55c96e672fedf9d807ca043c00df05ba0e` (Copyright (c) 2024 Seth Hobson) | ✅ **ADOPT-NOW**-eligible (covers all 80 marketplace plugins under wshobson/agents) |
| 10 | `cskwork/block-no-verify` | **HONEST-NON-FINDING — REPO PHANTOM** | BLOCKED (phantom repo) | `mcp__github__search_repositories owner=cskwork repo=block-no-verify` → 404; `mcp__github__get_file_contents cskwork/block-no-verify` → 404 Not Found | ⚠️ **W218 ATTRIBUTION ERROR**: candidate `cskwork/block-no-verify` does NOT EXIST. Two `block-no-verify` repos exist on GitHub: `tupe12334/block-no-verify` (MIT, 5★, TypeScript, mature; LICENSE blob `14fac913ccf80234b1848540089a3bbcb6e5283d`) + `guilhermesilveira/block-no-verify` (no LICENSE-verified, 1★, shell). **Recommend**: route ADOPT-NOW candidacy to `tupe12334/block-no-verify` (MIT verified) IF W218 use-case fits CLI tool to block `--no-verify`; otherwise DROP from list |
| 11 | "Tom Farley" 3 plugins (`protect-mcp` + `signed-audit-trails` + `review-agent-governance`) | **PARTIAL — 1 of 3 EXISTS** | **BLOCKED — phantom-2 + author-attribution error** | `tomjwxf/protect-mcp-plugin` exists (no root LICENSE; **README declares**: "License: MIT (protect-mcp), Apache-2.0 (verification layer)"; @ blob-SHA `5c15299a5cb42003c9ece791655c7b9e4ebfcf82`); `signed-audit-trails` + `review-agent-governance` repos do NOT exist under `tomjwxf` user (only 4 repos: `scopeblind-gateway`, `scopeblind-protect-skill` **ARCHIVED**, `acta`, `protect-mcp-plugin`) | ⚠️ **W218 ATTRIBUTION ERROR**: (a) Author is `tomjwxf` (Tom Farley GitHub handle ambiguity); (b) only 1 of 3 plugins EXISTS; (c) `signed-audit-trails` + `review-agent-governance` are PHANTOMS; (d) `scopeblind-protect-skill` is ARCHIVED upstream. **Recommend**: ADOPT-NOW only `tomjwxf/protect-mcp-plugin` (MIT per README; root LICENSE file MISSING → cite-class downgrade to README-declaration AMBER); DROP phantom-2 from W218 candidate set |

### Section 1 — License-direct-read summary

- **9 of 11 LICENSE-direct-verified** (rows 1-9): all PERMISSIVE-PASS (MIT 5/Apache-2.0 4)
- **2 of 11 ATTRIBUTION ERRORS** (rows 10-11): W218 candidate names misattributed to nonexistent users/repos; SOTA-substitutes identified for 1.5 of 2 (row 10 has `tupe12334/block-no-verify` substitute; row 11 has `tomjwxf/protect-mcp-plugin` partial substitute with README-only license declaration)

## Section 2 — 6-row Use-Class Adjudication Table

| # | Edge Case | LICENSE SPDX (verified) | Use-Class for claude-sota-pure | Operator-Override Path |
|---|---|---|---|---|
| 1 | **Arize-ai/phoenix** | **Elastic License 2.0 (ELv2)** [VERIFIED via blob `23d3aa7c871a4eb153186073e3d2b72d586f64be`] | **SOURCE-AVAILABLE-RESTRICTED** | ELv2 §Limitations: "You may not provide the software to third parties **as a hosted or managed service**". Use-class for claude-sota-pure: **INTERNAL OBSERVABILITY ONLY** (self-hosted local Phoenix container; user is the operator); ADMISSIBLE. **BLOCKED**: re-hosting as SaaS / multi-tenant managed service. **Operator-override-path**: install Phoenix as **local Docker container only** (`docker run -p 6006:6006 arizephoenix/phoenix:latest`); document in `docs/sota-installed-manifest.md` with explicit ELv2 self-hosted use-class acknowledgment per CR-9 install-risk discipline. **Alternative**: switch to Langfuse (MIT — Section 2 #2 below) if SaaS deployment ever contemplated |
| 2 | **langfuse/langfuse** | **MIT (main repo) + EE-LICENSE (ee/ directory periphery)** [VERIFIED via blob `3fb6fb5c510f11acbd56e6ab2ddf55dbea759a2d`] | **PERMISSIVE-PASS (main) + SOURCE-AVAILABLE-RESTRICTED (ee periphery)** | Root LICENSE explicitly: "Content outside of [ee/, web/src/ee/, worker/src/ee/] directories... is available under MIT Expat license". **Use-class for claude-sota-pure**: ADOPT-NOW main langfuse (MIT) for observability; DO NOT vendor or modify `ee/` periphery directories without consulting `ee/LICENSE` terms. **Operator-override-path**: install via Docker compose using upstream main image (excludes ee features by default unless EE license key applied) per https://langfuse.com/docs/deployment/self-host; deny `ee/` directory in any vendored copy |
| 3 | **getzep/graphiti + FalkorDB SSPL backend** | graphiti = **Apache-2.0** [VERIFIED `5feb0d9d299a1107adfa8331306b13cc0eff2d78`]; FalkorDB = **SSPL-1.0** [VERIFIED `ea3921393f6e67e6128cd5d76092c7ba73ac78ef`] | graphiti = PERMISSIVE-PASS; FalkorDB = **SOURCE-AVAILABLE-RESTRICTED** | **graphiti**: ADOPT-NOW (Apache-2.0). **FalkorDB SSPL-1.0**: SSPL §13 mandates: "If you make the functionality of the Program... available to third parties as a service, you must make the Service Source Code available... including, without limitation, management software, user interfaces, application program interfaces, automation software, monitoring software, backup software, storage software and hosting software". **Use-class for claude-sota-pure**: ADMISSIBLE as **local-only graph database container** (single-user, NOT third-party SaaS). **BLOCKED**: offering FalkorDB-backed graphiti as managed service / SaaS / multi-tenant deployment. **Operator-override-path**: install per current sibling pattern (`docker run -p 16379:6379 falkordb/falkordb:latest` local-only); document SSPL §13 service-class restriction in `docs/sota-installed-manifest.md`. **Alternative**: Neo4j Community Edition (GPL-3.0 + Commons Clause; similar single-org-use carve-out) OR PostgreSQL+pg_vector for vector-only without graph (no SSPL issue, MIT-class) |
| 4 | **volcengine/openviking** | **AGPL-3.0** [VERIFIED via blob `27268c8e4ad8c300f7665fe6b20875c580d05f4b`] | **STRONG-COPYLEFT-DOWNGRADE (operator-override admissible)** | AGPL §13 "Remote Network Interaction" mandates: source-disclosure if functionality is made available to third parties through computer network. **Use-class for claude-sota-pure**: **OPERATOR-OVERRIDE-ADMISSIBLE 77/100** (per W217 deep-dive precedent at sibling memory; cite via `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/reference_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md:52-64`). Single-user local deployment with no third-party network exposure does NOT trigger §13 disclosure. **BLOCKED**: any deployment exposing OpenViking via shared network endpoint. **Operator-override-path**: install local-only; deny network exposure; document in `docs/verified-avoid.md` AGPL-OPERATOR-OVERRIDE cohort + cite W217 precedent |
| 5 | **TruffleHog** | **AGPL-3.0** [VERIFIED via blob `d2bc34f9900abd088bfd0d914641ecf434aa5a52`] | **STRONG-COPYLEFT-CLI-CARVE-OUT-ADMISSIBLE** | AGPL §13 server-class disclosure applies to NETWORK-INTERACTIVE programs. **CLI-binary use-class is materially different**: when used as `trufflehog filesystem path/to/scan` or `trufflehog git file://...` invoked as a one-shot CLI process (no persistent server, no network interaction with users), AGPL §13 does NOT trigger. **Use-class for claude-sota-pure**: ADMISSIBLE as **pre-commit CLI scanner** (single invocation, single user, no network endpoint). **Sibling W214 evidence**: confirms CLI-binary carve-out via empirical adoption pattern in sibling runtime. **BLOCKED**: deploying TruffleHog as a server / web UI / shared scan endpoint exposing other users. **Operator-override-path**: install via `gh release download trufflesecurity/trufflehog` (CLI binary only); wire into pre-commit hook OR ad-hoc shell invocation; deny server-mode deployment |
| 6 | **abhigyanpatwari/GitNexus** | **PolyForm Noncommercial 1.0.0** [VERIFIED via blob `485af9b57b41e262e414d2791831f0d12823c6b4`] | **SOURCE-AVAILABLE-RESTRICTED (NONCOMMERCIAL-ONLY)** | PolyForm NC 1.0.0 §Noncommercial Purposes + §Personal Uses: admits "research, experiment, and testing for the benefit of public knowledge, personal study, private entertainment, hobby projects, amateur pursuits". **Use-class for claude-sota-pure**: ADMISSIBLE for personal/research/hobby use; **BLOCKED for any commercial use** (revenue-generating projects, paid SaaS, commercial consulting). **fm20-path-drift-cascade.md row 11 evidence confirmed**: license is Polyform Noncommercial (not previously assumed permissive). **Required Notice (per LICENSE)**: "Copyright Abhigyan Patwari (https://github.com/abhigyanpatwari/GitNexus)". **Operator-override-path**: (a) install for personal/research only with Required Notice preserved + commercial-use blocker documented; OR (b) DROP from candidate set if commercial use is contemplated. **CR-9 install-risk**: Polyform NC license CHANGED upstream per fm20 row 11 evidence — pre-install LICENSE re-verification mandatory per CR-9 step 4 |

## Section 3 — Updated W218 Finalist License Summary

### W218 finalist candidates with FLIPPED license status (re-classification needed)

| Candidate | W218 prior status | W219 verdict | Action |
|---|---|---|---|
| `anthropics/claude-code-security-review` | INFERRED Apache-2.0 | **MIT (VERIFIED)** | ✅ Update W218 master ledger; still PERMISSIVE-PASS — no use-class change |
| `anthropics/claude-code-action` | INFERRED Apache-2.0 | **MIT (VERIFIED)** | ✅ Update W218 master ledger; still PERMISSIVE-PASS — no use-class change |
| `cskwork/block-no-verify` | INFERRED (W218 list) | **PHANTOM — repo does not exist** | ⚠️ DROP from W218 finalist; SOTA-substitute `tupe12334/block-no-verify` (MIT) available as candidate if W218 use-case matches |
| "Tom Farley 3 plugins" | INFERRED (W218 list) | **PARTIAL — 1 of 3 exists; author handle ambiguity** | ⚠️ DROP `signed-audit-trails` + `review-agent-governance` (phantom); keep only `tomjwxf/protect-mcp-plugin` (MIT per README only; no root LICENSE → AMBER cite-class) |
| `getzep/graphiti` | INFERRED Apache-2.0 (already verified at sibling) | **Apache-2.0 (RE-CONFIRMED)** | ✅ ADOPT-NOW; FalkorDB SSPL backend documented as use-class-restricted dependency |

### W218 finalist candidates PASSING for claude-sota-pure baseline (PERMISSIVE-default)

✅ ALL 7 of 11 rows 1-7 + row 9 = **8 candidates PASS direct-verified for claude-sota-pure permissive baseline** (`cwc-long-running-agents` + `github-mcp-server` + `claude-code-security-review` + `claude-code-action` + `awslabs/mcp` + `mcp-grafana` + `claude-code-devcontainer` + `wshobson/agents`)

✅ 1 more PASS via cite-import-AMBER: `gsd-build/get-shit-done` (MIT verified, row 8)

### W218 finalist candidates requiring explicit operator-override acknowledgment

⚠️ **6 use-class edge cases require explicit operator-override decision before install** (PER CR-9 install-risk discipline):

1. **Arize-ai/phoenix** (ELv2) → local-only self-hosted OK; SaaS BLOCKED
2. **langfuse/langfuse** (MIT-core + EE-periphery) → main repo PASS; deny ee/ vendoring
3. **getzep/graphiti + FalkorDB** (Apache-2.0 + SSPL-1.0) → local-only OK; managed service BLOCKED
4. **volcengine/openviking** (AGPL-3.0) → local-only OK per W217 precedent (77/100); network-exposed BLOCKED
5. **TruffleHog** (AGPL-3.0) → CLI carve-out OK; server-mode BLOCKED
6. **GitNexus** (Polyform Noncommercial 1.0.0) → personal/research OK; commercial BLOCKED

### W218 finalist candidates BLOCKED with no override path for claude-sota-pure

- `cskwork/block-no-verify` (phantom — repo does not exist)
- `tomjwxf/signed-audit-trails` (phantom)
- `tomjwxf/review-agent-governance` (phantom)

### Cardinal-rule conformance disclosure

- **CR-1 cite-trail authority**: ✅ TIER-1-DIRECT cite anchors at file:line + HEAD blob-SHA (`mcp__github__get_file_contents` results)
- **CR-8 full-SOTA-content invariant**: ✅ all 13 verified license blobs sourced from upstream canonical repos (no novel content)
- **CR-9 install-risk discipline**: ✅ pre-cite-import REVERT check NOT triggered (no install commit landed at this dispatch); LICENSE blob-SHA pinning enables future Marker Decay tracking
- **CR-10 research-first**: ✅ research-then-install discipline — all license probes complete BEFORE any install-commit prescription propagated to target runtime
- **CR-12 upstream-install-priority**: ✅ all 13 verified candidates are PRIMARY upstream installs (NOT sibling-cite-import); 1 cite-import-AMBER documented (`gsd-build/get-shit-done` row 8)
- **W219 Multi-source-discovery-breadth carve-out**: ✅ per `multi-source-discovery-breadth-discipline.md §When NOT to apply` — targeted re-verification of NAMED candidates; single-source GitHub MCP suffices
- **FM-20 path-drift-cascade defense**: ✅ row 11 GitNexus Polyform NC 1.0.0 license shift CONFIRMED; row 5 GitHub MCP MIT @2025 (NOT 2024) CONFIRMED — README-blob-pin drift caught at this fire

### Cross-model gate disclosure (CR-3 strict reading)

- **Subagent-layer**: STAND-IN per ENV (f); cross-model gate NOT structurally satisfied
- **Orchestrator-layer**: per orchestrator dispatch /goal MANDATES section + `fm17-subagent-fleet-depletion.md §FM-17.d recovery`, this verdict's load-bearing claims (13 LICENSE direct-reads with blob-SHA cite anchors) MUST be ratified via W219 Path P codex T1 BRIDGE-MODE foreground+tee at orchestrator level BEFORE any ADOPT-NOW prescription based on this evidence propagates to install action in `Z:\claude-sota-pure\` per CR-3 strict reading + CR-9 step 2 (2-round fix-forward expectation for cite-import ships)

---

VERDICT: PARTIAL — 9-of-11-LICENSE-direct-verified-PASS + 2-attribution-errors-blocked + 6-use-class-edge-cases-adjudicated-with-operator-override-paths
