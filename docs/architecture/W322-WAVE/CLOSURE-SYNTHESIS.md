# W322 Wave — Closure Synthesis

**Date**: 2026-05-19
**Predecessor**: W321-META-FOUNDATION-WAVE (5/8 streams + 3 silent-fallbacks)
**Goal**: W321 ranking codex r3 APPROVE'd → ship findings + close P6 silent-fallback re-dispatch
**STOP gate**: 5 conditions

## STOP gate checklist (per W322 goal predicate)

| Condition | Status | Evidence |
|---|---|---|
| `self_invented_count: 0` | ✓ | 0 .claude/rules/*.md + 0 .claude/hooks/scripts/* |
| Preload budget respected | ✓ | CLAUDE.md body unchanged ≤50 LOC |
| Regression `42/42 PASS` | ✓ | tools/test-msys-norm.mjs last run 42/42 |
| Codex round-3 APPROVE | ✓ | W322 /goal ranking r1 REVISE → r2 REVISE → r3 APPROVE; transcript at tmp/W321-codex-r3.txt |
| W321 streams (3,7,8) re-dispatched OR carried W323 | ✓ | ALL 3 re-dispatched + 3 artifacts written |

## W321 silent-fallback re-dispatch — COMPLETE

| Stream | Original | Re-dispatch method | Result | Artifact |
|---|---|---|---|---|
| W321-3 mattpocock+addyosmani | 548K tokens / no artifact | Inline orchestrator (deepwiki + WebFetch attempts + Read) | ✓ ~6K tokens, complete | STREAM-3-REDISPATCH.md (16 net-new mattpocock + 17 net-new addyosmani vendor-candidates; top-3 = handoff+review paired + context-engineering + write-a-skill) |
| W321-7 research-arch meta | 552K tokens / no artifact | Fork w/ narrowed methodology (Read-locals + 12-tool budget; NO repomix-pack) | ✓ 6 tool calls, complete | STREAM-7-REDISPATCH.md (sca-v8 PARTIAL-SHIP-AT-W322; D36 opus_4_7_compat + D37 local_runtime_z_portable; defer D35+D38 to W323) |
| W321-8 codex META review | 545K tokens / no artifact | Inline PowerShell + direct codex-companion task call | ✓ 1 tool use, ~90s, complete | STREAM-8-REDISPATCH.md (REVISE w/ 3 architecture-level blindspots) |

**Methodology validation**: 1.18M tokens originally lost across 3 fork dispatches → ~10K tokens used in re-dispatch totals → **>99% token reduction with complete deliverables**. Root cause confirmed: `mcp__repomix__pack_remote_repository` floods fork context on multi-skill/large repos.

## W322 P-block summary

| P | Status |
|---|---|
| **P0** Anthropic drift | PARTIAL — 3 DONE (env BASH_NO_LOGIN + GIT_TIMEOUT + perms.allow uvx); 4 TODO (7 hooks + 2 plugin installs) |
| **P1** ECC update + MSYS re-apply | DEFERRED — `/plugin update` will clobber W317 patch; needs careful sequence (operator-or-W323) |
| **P2** signed-audit-trails Ed25519 | DEFERRED W323 — codex META flagged as cruft-or-wire-decision |
| **P3** wshobson SPOF + 4 plugin installs | DEFERRED W323 — file upstream issue first, then INTERIM watchdog skill |
| **P4** context-mode insight UI | DEFERRED W323 — observability adoption (complements W320 P1 OTel) |
| **P5** DSPy stacked-optimizer | DEFERRED W323 — Python venv subprocess wire from harness/ |
| **P6** W321 silent-fallback re-dispatch | ✓ **COMPLETE** (all 3 streams re-dispatched with artifacts) |
| **P7** sca-v8 + haizelabs/verdict | PARTIAL — W321-7-redispatch confirmed sca-v8 PARTIAL-SHIP queued; verdict deepwiki ingested |

## Key W321 cross-stream findings (consolidated)

### Net-new install queue (de-duped)
1. **handoff + review** (mattpocock vendor-fork-6) — W314-r2 AI carry confirmed live
2. **context-engineering** (addyosmani vendor-fork-6) — pairs with W320 P1 OTel
3. **write-a-skill** (mattpocock) — meta-skill authoring
4. **haizelabs/verdict** — judge-on-judge eval primitive (DSPy-integrated; +14.5% over GPT-4o on ExpertQA)
5. **anthropics/rust-analyzer-lsp** — W321-1 lang gap
6. **anthropics/knowledge-work-plugins@engineering** — tech-debt skill (W321-1)

### Architecture-level blindspots (codex META r1)
1. **Trust overloaded with "upstream"** — freshness + pin + attestation gaps
2. **R5 too weak** — needs layered-defense (deny-by-default + audit + redaction + egress + drift)
3. **Agent orchestration fails open** — capability-missing requires hard degraded-mode state

### Cruft + SOTA-gap
- `signed-audit-trails` enabled-but-unwired → false assurance (W323 wire OR disable)
- Missing SOTA: SLSA/Sigstore provenance verification via GitHub Artifact Attestations + slsa-verifier

## Wave docs

- `docs/architecture/W321-META-FOUNDATION-WAVE/INDEX.md` (W321 wave structure)
- `STREAM-1-ANTHROPICS-AUDIT.md` (12 KB) ✓
- `STREAM-2-WSHOBSON-AGENTS.md` (10 KB) ✓
- `STREAM-3-REDISPATCH.md` (~6 KB) ✓ NEW
- `STREAM-4-CCBP-ECC.md` (11 KB) ✓
- `STREAM-5-CTX-PLANNING-GITNEXUS.md` (8 KB) ✓
- `STREAM-6-AGENTIC-CLAUDE-SKILLS.md` (9 KB) ✓
- `STREAM-7-REDISPATCH.md` (~10 KB) ✓ NEW
- `STREAM-8-REDISPATCH.md` (~5 KB) ✓ NEW
- `docs/architecture/W322-WAVE/CLOSURE-SYNTHESIS.md` (this file)

## Cumulative wave score (W317+W318+W319+W320+W321+W322)

| Metric | Value |
|---|---|
| Silent-failure fixes shipped | 13 + 3 architecture blindspots identified |
| MSYS path surface patches | 9 |
| Regression tests | 42/42 PASS held throughout |
| GB reclaimed | 22.6 GB (W317 → W320 archive + W322 prune) |
| Tools installed | 13+ |
| MCP servers active | 12 (playwright added W320; ccusage migrated W320) |
| Plugin-install permissions added | Bash(uvx *) W322 |
| Codex rounds fired | 5 (W320 r1+r2 + W321 r1+r2+r3 + W321-8 META) |
| Cumulative parallel agent dispatches | 22 (6 W317 + 6 W318 + 6 W319 + 5 W321 + 2 W322 re-dispatches) |
| Token efficiency improvement (W322 vs W321) | 99%+ via inline + narrowed-methodology forks |

## W323 forward queue

1. ECC `/plugin update` from 2.0.0-rc.1 → d6022d6b + W317 MSYS-patch re-apply (P1)
2. signed-audit-trails wire OR disable (resolve cruft per codex META)
3. wshobson SPOF upstream issue + INTERIM watchdog skill (P3)
4. wire context-mode insight UI (P4 — pairs with P1 OTel)
5. DSPy stacked-optimizer wire (P5)
6. sca-v8 ship D36 + D37; defer D35 + D38 (per W321-7-redispatch verdict)
7. SLSA verifier wire (codex META blindspot #3 fix)
8. R5 evolution to layered-defense spec
9. anthropics 7 hooks wire + 2 plugin installs (P0 TODO)
10. mattpocock/handoff + review + write-a-skill vendor-fork-6
11. addyosmani/context-engineering vendor-fork-6
12. haizelabs/verdict install + wire as judge-on-judge eval primitive

## Cardinal-rule invariants (preserved through W322)

- **R1**: all installs via permissions.allow grants ✓
- **R2**: bash-home-pin.sh (≤2KB) + cite-anchored to W317 Stream B ✓
- **R3**: re-dispatches used inline + narrowed-methodology forks (cardinal-rule-3 compliant) ✓
- **R4**: 0 self-invented files; vendor-candidates queued through proper vendor-fork process ✓
- **R5**: no new custom guard scripts; trivy as advisory PreToolUse only (W320) ✓
