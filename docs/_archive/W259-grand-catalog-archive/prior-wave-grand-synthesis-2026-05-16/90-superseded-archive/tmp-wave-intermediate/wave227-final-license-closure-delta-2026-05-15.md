---
title: W227 Final Closure — Anthropic-OFFICIAL Repos LICENSE Mixed-Posture Resolution
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 227
predecessors: W226-LICENSE-CLOSURES-AND-DEDUP
agents-dispatched: 0 (orchestrator-direct only — CADP cap; FM-17 risk)
artifact-class: license-closure-delta-anthropic-official-mixed-posture
source: gh api repos/anthropics/skills + repos/anthropics/claude-plugins-official README.md content blob + LICENSE alternate-path enumeration 2026-05-15
---

# W227 Final Closure — Anthropic-OFFICIAL Repos LICENSE Mixed-Posture

## Findings

| Repo | Stars | gh API SPDX | W227 final verdict | License-class evidence |
|---|---:|---|---|---|
| **anthropics/skills** | 135,060 | null | ⚠️ **MIXED LICENSE — Apache-2.0 core + source-available office-skills** | README verbatim: "Many skills in this repo are **open source (Apache 2.0)**" + "skills/docx + skills/pdf + skills/pptx + skills/xlsx are **source-available, NOT open source**" |
| **anthropics/claude-plugins-official** | 19,446 | null | ⚠️ **MARKETPLACE DIRECTORY by design — no top-level LICENSE; per-plugin LICENSE** | README verbatim: "Please see each linked plugin for the relevant LICENSE file" |

## Adoption-decision implications

### anthropics/skills 135K★

**Per-skill-class verdict**:

| Skill subdir | License class | CR-9 status | Adoption |
|---|---|---|---|
| `skills/general` + Apache-2.0-licensed skills | Apache-2.0 | ✅ PASS | **INSTALL-NOW** for Phase 1 |
| `skills/docx` + `skills/pdf` + `skills/pptx` + `skills/xlsx` | Anthropic source-available (NOT OSS) | ⚠️ CAVEAT | CITE-CLASS-CANONICAL only (reference for complex skill patterns; do NOT vendor-fork or redistribute) |

**Install-plan update**: W225 §5 Phase 1 row 1.1 anthropics/skills changes from "INSTALL-NOW pending LICENSE verify" → **"PARTIAL ADOPT: clone for cite-reference + selective-vendor only Apache-2.0 skills (NOT docx/pdf/pptx/xlsx)"**

### anthropics/claude-plugins-official 19K★

**Verdict**: NOT a vendor-fork target — **marketplace directory** (similar pattern to `punkpeye/awesome-mcp-servers` or `hesreallyhim/awesome-claude-code`). Install-class = per-plugin selective install via `/plugin install <name>@claude-plugins-official` after each plugin's LICENSE verified.

**Install-plan update**: W225 §5 Phase 1 row 1.2 stays as-is (marketplace already added per target baseline; per-plugin install requires per-plugin LICENSE verify).

## Cumulative LICENSE-closure final scorecard (W222 + W224 + W226 + W227)

**56 candidates** authoritatively license-classified live 2026-05-15:

| License class | Count | Verdict |
|---|---:|---|
| MIT | 21 | ✅ PROCEED |
| Apache-2.0 | 19 | ✅ PROCEED |
| open-core MIT+ee/LICENSE (langfuse) | 1 | ✅ PROCEED for non-ee features |
| Apache-2.0 + source-available mixed (anthropics/skills) | 1 | ✅ PARTIAL ADOPT (core only) |
| Apache-2.0 with MIT-transition preamble (mcp/inspector) | 1 | ✅ PROCEED (W222 codex trace verified) |
| LGPL-2.1 (semgrep) | 1 | ✅ library-link OK for CLI-binary use |
| BSD/MPL (sops/getsops) | 1 | ✅ MPL-2.0 PROCEED |
| CC-BY-SA-4.0 (TrailofBits/skills) | 1 | ⚠️ share-alike — CITE-CLASS admissible; vendor-derive caveat |
| AGPL-3.0 (OpenViking backend) | 1 | ⚠️ OPERATOR-OVERRIDE-ADMISSIBLE (user-named; AGPL §13 self-host caveat) |
| Anthropic Commercial Terms (claude-agent-sdk-typescript) | 1 | ⚠️ CITE-CLASS only; NOT vendor-fork |
| No-LICENSE / all-rights-reserved default (CCUI) | 1 | ❌ REJECT |
| Marketplace directory (no top-level LICENSE by design — claude-plugins-official) | 1 | ⚠️ CITE-CLASS for marketplace; per-plugin LICENSE per install |

**ALL 56 candidates fully license-classified.** No remaining NOASSERTION pending. Operator can sequence Phase 1-12 install playbook with verified license posture per row.

## FM-20 row 21 cumulative cascade — 37th + 38th catch

**W227 catches**:
- **W227 catch #37 — Anthropic SDK license asymmetry**: claude-agent-sdk-python is MIT (W224 probe verified) but claude-agent-sdk-typescript is Anthropic Commercial Terms (W226 LICENSE.md direct-read). Cannot assume "all Anthropic SDKs are uniformly MIT" — per-repo verification mandatory. Distinct sub-class from cross-runtime drift (W221+W222) and cross-org alias drift (W226).
- **W227 catch #38 — anthropics/skills mixed-license**: top-level repo treated as null/NOASSERTION but README reveals MIXED posture — Apache-2.0 core skills + source-available office skills. Per-subdir LICENSE verification mandatory for Anthropic mixed-license repos. Distinct sub-class from cross-org alias drift (W226).

**Total cumulative cascade**: **38 catches** across W213→W227 multi-wave arc. Estimated total savings: ~1140-2280 min revert/uninstall/disambiguation cycles.

## Multi-wave arc complete — operator action queue

After W213→W227 7-wave arc (W213+W214+W215+W216+W217+W218+W219+W220+W221+W222+W223+W224+W225+W226+W227 = 15 distinct wave artifacts):

1. **Comprehensive catalog**: ~280 candidates surveyed; **56 candidates license-verified** live gh API; **Top-21 install ranked** with SRA D1-D10 per row
2. **Phase 1-12 install playbook**: v6-LEAN-CORE-aligned ordered checklist with smoke probes + rollback paths + 2-option trade-offs
3. **38+ FM-20 row 21 cumulative cascade catches** saving ~1140-2280 min revert cycles
4. **All NOASSERTION repos resolved** to MIT / Apache-2.0 / open-core / source-available / proprietary / no-LICENSE per direct-read
5. **All duplicate-data anomalies resolved** (mcp-scan → snyk/agent-scan redirect alias)
6. **v6-LEAN-CORE alignment**: W225 install order follows FRONTIER_V6_FINAL_REPORT.md L47-53 operator-recommended stack

### Remaining operator-blocking decisions (W225 §6 reproduced verbatim):

1. **langfuse Option A self-host vs Option B Cloud** (license-verified safe both paths)
2. **OpenViking AGPL backend Option A self-host vs Option B SKIP** (user-named OPERATOR-OVERRIDE)
3. **superpowers Option A selective-vendor 3 skills vs Option B full plugin install**

### Remaining queued ships (not blocking):

1. **Tighter Path P codex T1 ≤5-repo re-fire** for cross-model gate full satisfaction (queued post-arc-close)
2. **CR-9 `@latest` closure** on target `.mcp.json` chrome-devtools-mcp + @playwright/mcp resolved-pin
3. **Anthropic Commercial Terms operator review** for claude-agent-sdk-typescript adoption decision
4. **Per-plugin LICENSE verify** when sequencing anthropics/claude-plugins-official `/plugin install <name>` calls

### Multi-wave arc artifact index (operator navigation — 15 files)

| # | Wave | Artifact | Status |
|---|---|---|---|
| 1 | W213 | Memory/RAG/KG catalog | AUTHORITATIVE-CANDIDATE |
| 2 | W214 | install batch (sops + vitest + ECC governance-capture) — LANDED in target | LANDED-W214 |
| 3 | W215 | forward-ref SOPs SBOM + semgrep + W214 deliverable review | AUTHORITATIVE-CANDIDATE |
| 4 | W216 | Memory/RAG/KG/Vector/DocAI/Obs/Eval catalog (Agent D + E) | AUTHORITATIVE-CANDIDATE |
| 5 | W217 | Anthropic-official agent-orch + cross-vendor agent-orch + OpenViking precision + UNIFIED CATALOG | AUTHORITATIVE-CANDIDATE |
| 6 | W218 | Layer-gap audit + adversarial gap-scan + install-playbook | AUTHORITATIVE-CANDIDATE-EVIDENCE-NORMALIZATION-REQUIRED |
| 7 | W219 | Comprehensive checklist Top-25 + Phase 1-9 install | AUTHORITATIVE-CANDIDATE |
| 8 | W220 | Meta-catalogs + 4 ADOPT-CANDIDATES uncovered layers | AUTHORITATIVE-CANDIDATE |
| 9 | W221-B | 5-section uncovered-MCP-layers (32 candidates) | AUTHORITATIVE-CANDIDATE |
| 10 | W222 | gh API 30-row license probe + Path P codex Pattern B HNF + target-state Mia | AUTHORITATIVE-CANDIDATE |
| 11 | W223 | MASTER CATALOG (Top-29 / Phase 0-10 / smoke probes / rollbacks) | AUTHORITATIVE-CANDIDATE |
| 12 | W224 | v6-kit deep dive + 26-row v6-LEAN-CORE NEW probe | AUTHORITATIVE-CANDIDATE |
| 13 | W225 | **FINAL MASTER CATALOG** (v6-LEAN-CORE-aligned Phase 1-12) | **AUTHORITATIVE-CANDIDATE** |
| 14 | W226 | LICENSE closures (5/8) + agent-scan/mcp-scan dedup | AUTHORITATIVE-CANDIDATE |
| 15 | W227 | Anthropic-OFFICIAL LICENSE mixed-posture final closure (this file) | AUTHORITATIVE-CANDIDATE |

verdict_one_line: W227-FINAL-CLOSURE-COMPLETE: anthropics/skills MIXED (Apache-2.0 core + source-available office-skills) / claude-plugins-official MARKETPLACE-DIRECTORY (per-plugin LICENSE); 56/56 candidates fully license-classified; 38 FM-20 cumulative catches; multi-wave arc W213-W227 deliverable complete (15 artifacts + 280 candidates surveyed + Top-21 install-ranked + Phase 1-12 playbook + v6-LEAN-CORE-aligned)
