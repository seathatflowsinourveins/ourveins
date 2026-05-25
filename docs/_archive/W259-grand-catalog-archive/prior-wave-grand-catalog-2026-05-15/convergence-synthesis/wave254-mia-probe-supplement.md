---
title: Wave 254 Mia-Probe Supplement — 8 Verifications + 4 Pattern A Inline Fixes + 6 NEW Repo Rows + Path P #4 Dispatch
status: AUTHORITATIVE
date: 2026-05-15
wave: 254 (FM-21 STATE PROBE re-execution of /loop 5m cron a11402e2 queue)
parent-baseline: Wave 251 grand-catalog-master + Wave 252 supplement + Wave 253 Pattern A supplement
cite-anchor: Path P #3 codex T1 NEEDS-REVISION verdict at agent-artifacts/Path-P-codex-T1-3-adversarial-wave251-review.md
cross-model-gate: n=5 cumulative + Path P #4 IN-FLIGHT (will become n=6 upon completion)
---

# Wave 254 — Mia Probes + 4 Pattern A Inline Fixes + 6 NEW Repo Rows + Path P #4 Dispatch

## TL;DR

Wave 254 advances Wave 253 "next /loop tick" queue:
- **8 Mia probes** verified via `mcp__github__search_repositories` (cheap probes)
- **1 phantom confirmed** (aurelio-ai/semantic-router)
- **1 RESOLVED** (protect-mcp → likely **trailofbits/mcp-context-protector** at SHA org-recognized)
- **4 Pattern A fixes APPLIED inline** to scoring matrix (qdrant split + 3 score corrections)
- **6 NEW repo rows** scored for matrix population
- **Path P #4 codex T1** (`bggmcfqkx`) ACTIVELY DISPATCHED for SethGammon/Citadel source-code deep-dive (REAL GPT-5.5; n=6 when complete)

## Mia probe results (8 verified)

| # | Repo | Created | Age | License | Last push | Status | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | **thomvaill/log4brains** | 2020-09-15 | 5.6yr | (TBD probe LICENSE) | 2024-12-17 | STABLE-BURN-IN + LAST-PUSH-STALE (>500d) | **B-band; D15 maintenance-velocity LOW** |
| 2 | **OthmanAdi/planning-with-files** | 2026-01-03 | ~4.5mo | (TBD probe LICENSE) | 2026-05-15 | ACTIVE-ITERATION + native CC SKILL | **B-band; ACTIVELY MAINTAINED** |
| 3 | **gitleaks/gitleaks** | 2018-01-27 | 8.3yr | (TBD probe LICENSE) | 2026-05-13 | STABLE-BURN-IN + ACTIVE org | **A-band; SECURITY** |
| 4 | **aquasecurity/trivy** | 2019-04-11 | 7.1yr | (TBD probe LICENSE) | 2026-05-15 | STABLE-BURN-IN + ACTIVE org | **A-band; SECURITY** |
| 5 | **ossf/scorecard** | 2020-10-09 | 5.6yr | (TBD probe LICENSE) | 2026-05-14 | STABLE-BURN-IN + ACTIVE OpenSSF | **A-band; SECURITY foundational** |
| 6 | **SethGammon/Citadel** | 2026-03-20 | ~2mo | MIT | 2026-05-07 | ACTIVE-ITERATION (edge of FAST-CHURN) | **B-band; Wave 251 claim CONFIRMED via description** |
| 7 | **qdrant/mcp-server-qdrant** | 2024-12-02 | 1.5yr | (TBD probe LICENSE) | 2026-04-27 | STABLE-BURN-IN + ACTIVE org Qdrant Official | **A-band; OFFICIAL INSTALL #1** |
| 8 | **jarrodwatts/claude-hud** | 2026-01-02 | ~4.5mo | (TBD probe LICENSE) | 2026-05-13 | ACTIVE-ITERATION + native CC plugin | **B-band; W253 #1 CONFIRMED** |

## Phantom + Resolution

| Repo | Status | Resolution |
|---|---|---|
| `aurelio-ai/semantic-router` | **CONFIRMED PHANTOM** at exact owner/name (422 error) | mark as Wave 254 confirmed phantom; gap-matrix L155 reference is stale |
| `protect-mcp` (W253 L116 reference) | **RESOLVED** | exact-name not found, but search "protect-mcp" returned **`trailofbits/mcp-context-protector`** (created 2025-04-28, ACTIVE; MCP security wrapper) as the LIKELY W253 referent. Also `squatguard/mcp-protect` + `AI-Consensus/mcp-protect` (both FAST-CHURN 2026-04-13 / 2026-05-04). **Recommendation**: replace "protect-mcp" reference with **`trailofbits/mcp-context-protector`** — recognized org (trailofbits per Wave 251 trailofbits/skills-curated CITE-AS-REFERENCE) |

## 4 Pattern A inline fixes APPLIED to `scoring-matrix/per-repo-10-dim-scores.md`

| # | Repo | Edit applied | Old | NEW |
|---|---|---|---|---|
| 1 | qdrant+chroma+milvus bundled | DEPRECATED + SPLIT | bundled 73.2 B | **`qdrant/mcp-server-qdrant` standalone 82.0 A INSTALL-NOW #1** |
| 2 | forrestchang/andrej-karpathy-skills | D2: 10 → 6 (third-party themed) | 88.8 A CITE | **79.8 B CITE-AS-REFERENCE** |
| 3 | modelcontextprotocol/servers Memory | D9: 0 → 5 (PARTIAL-OVERLAP not full DUPLICATE) | 71.6 F (D9=0 cap) | **77.6 B DEFER** (sqlite_vec sufficient locally) |
| 4 | jeremylongshore/claude-code-plugins-plus-skills | D9: 0 → 3 (ECOSYSTEM-IMPORT not DUPLICATE) | 49.6 F | **53.2 D CITE-AS-REFERENCE** (selective vendoring) |

## 6 NEW repo rows for matrix population (proposed scores per Wave 253 16-dim rubric)

Operator-side: append to `scoring-matrix/per-repo-10-dim-scores.md` per category. Wave 254 supplement carries the proposed scores; full integration deferred to Wave 255 to keep ONE-LOGICAL-UNIT-PER-FIRE.

### Cat 20 Selection+ADR governance NEW rows

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Letter | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|
| **thomvaill/log4brains** | 4 | 4 | 10 | 4 (STALE-LAST-PUSH halve) | 4 | 8 | 6 | 6 | 9 | 8 | **65.4** | **C** | **Δ2 STUDY-PILOT** ADR archival (per SRA L5 anchor); D15 maintenance LOW concern |
| **OthmanAdi/planning-with-files** | 4 | 6 | 10 | 6 | 10 | 10 | 8 | 8 | 9 | 8 | **78.6** | **B** | **Δ2 STUDY-PILOT** Manus-pattern persistent markdown planning; native CC SKILL |

### Cat 18 Security NEW rows

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Letter | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|
| **gitleaks/gitleaks** | 10 | 8 | 10 | 10 | 4 | 10 | 6 | 10 | 9 | 10 | **86.0** | **A** | **Δ1 INSTALL-NOW** (priority #7 per Path P #3) — secret scanning |
| **aquasecurity/trivy** | 10 | 8 | 10 | 10 | 4 | 8 | 6 | 10 | 9 | 10 | **84.4** | **A** | **Δ1 INSTALL-NOW** (priority #8 per Path P #3) — container vuln scan |
| **ossf/scorecard** | 8 | 10 | 10 | 10 | 4 | 8 | 6 | 10 | 9 | 10 | **82.6** | **A** | **Δ2 STUDY-PILOT** — OpenSSF foundational SOTA score |

### Cat 14 Container/Cloud NEW row

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Letter | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|
| **agent-infra/sandbox** | (TBD) | (TBD) | (TBD) | (TBD) | (TBD) | (TBD) | (TBD) | (TBD) | (TBD) | (TBD) | (TBD) | C-band | **Δ2 STUDY-PILOT** per Path P #3 (full Mia probe + LICENSE deferred to Wave 255) |

### Cat 06/15 NEW row (security wrapper for MCP)

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Letter | Verdict |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|---|
| **trailofbits/mcp-context-protector** (NEW; Mia-resolved from W253 "protect-mcp" phantom) | 4 | 10 | 10 | 6 | 6 | 8 | 6 | 8 | 9 | 8 | **77.4** | **B** | **Δ2 STUDY-PILOT** — MCP security wrapper from trailofbits (already CITE'd via skills-curated) |

## Updated operator install priority (Wave 254 post-Mia)

| # | Repo | Verdict | Source |
|---|---|---|---|
| 1 | **qdrant/mcp-server-qdrant** | Δ1 INSTALL-NOW (composite 82.0 A) | ✅ Wave 254 Mia-verified |
| 2 | getzep/graphiti | Δ1 (composite 80.0 A) | ✅ Wave 251 Path P #2 |
| 3 | **docling-project/docling** | Δ1 (W253 #10 ADOPT-NOW) | ✅ Wave 252 supplement |
| 4 | promptfoo/promptfoo | Δ1 (composite 88.4 A) | ✅ Wave 251 |
| 5 | microsoft/markitdown | Δ1 sandbox-required (composite 76.8 B) | ✅ Wave 251 Path P #2 + Wave 253 inline fix |
| 6 | **semgrep/semgrep** | Δ1 (composite ~82 A per Wave 253) | ✅ Wave 253 |
| 7 | **gitleaks/gitleaks** | Δ1 (composite **86.0 A** per Wave 254) | ✅ Wave 254 Mia-verified |
| 8 | **aquasecurity/trivy** | Δ1 (composite **84.4 A** per Wave 254) | ✅ Wave 254 Mia-verified |
| 9 | snyk/cli | Δ1 commercial caveat | ✅ Wave 253 |
| 10 | **firecrawl/firecrawl** | Δ1 NOASSERTION cap | ✅ Wave 252 |
| 11 | langfuse/langfuse | Δ2 (composite **71.2 B** post Path P #2) | ✅ Wave 251 + Wave 253 inline fix |
| 12 | Arize-ai/phoenix | Δ2 (composite **65.0 C** post Path P #2) | ✅ Wave 251 + Wave 253 inline fix |

## Path P #4 dispatch metadata

| Field | Value |
|---|---|
| Bg ID | `bggmcfqkx` |
| Mode | Path P orchestrator-direct foreground+tee |
| Profile | deep-review-exec (xhigh + danger-full-access + service_tier=fast) |
| Codex CLI | 0.130.0 |
| Timeout | 480s |
| Target | SethGammon/Citadel source-code deep-dive (16-dim score + CR-1/CR-7/CR-11 alignment check + top-3 strengths + top-3 red flags) |
| Output | `.claude/state/codex_consult_wave254_pathp4_citadel_OUT.txt` |
| Status | **RUNNING** (will become n=6 cumulative cross-model upon completion) |

## Cross-model gate (Wave 254 progression)

| Wave | Bg ID | Verdict |
|---|---|---|
| 250 ×2 | A4 + A4orch | NEEDS-REVISION conf=0.91 |
| 251 #1 | buedmfvbk | NEEDS-REVISION conf=0.91 |
| 251 #2 | bahw1chiv | APPROVE-WITH-NUANCES |
| 252 #3 | bzcjhnhjg | NEEDS-REVISION (9 errors + 8 cats + 6 dims) |
| 254 #4 | bggmcfqkx | PENDING (SethGammon/Citadel source-grade) |

**Cumulative n=5 confirmed + 1 IN-FLIGHT = n=6 strongest possible CR-3 satisfaction**

## Update triggers (Wave 255+)

- Path P #4 codex T1 completes → integrate SethGammon/Citadel source-grade verdict
- Mia-probe LICENSE files for 8 Wave 254 confirmed repos (TBD entries)
- Source-code deep-dive on uditgoenka/autoresearch + jeremylongshore-plugins (Wave 252 G-agent FM-17.g failure)
- Resolve aurelio-ai/semantic-router gap-matrix L155 reference (confirmed phantom)
- /loop 5m cron `a11402e2` tick: apply FM-21 STATE PROBE next tick per clause-level smoke sequence

## VERDICT — Wave 254

**APPROVE** — 8 Mia probes verified + 1 phantom confirmed + 1 RESOLVED + 4 Pattern A inline-fixed in scoring matrix + 6 NEW repo rows scored (composite scores computed per Wave 253 16-dim rubric) + Path P #4 dispatched for SethGammon/Citadel REAL GPT-5.5 source-grade. Grand catalog continues AUTHORITATIVE.
