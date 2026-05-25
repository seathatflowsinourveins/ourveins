# Wave 155 F15-F27 Cumulative Synthesis — Percentage Audited Honest Answer

**Date**: 2026-05-12
**Scope**: F15-F27 audit-deepening sequence (13 manifest rows shipped across 4 tiers)
**Ship**: F28 cumulative synthesis report — V2 APPROVE conf=0.91 + V3 F28-NEEDED-LIGHT conf=0.91 PARALLEL convergence
**Cite**: `.claude/state/codex_consult_w155_f28_cumulative_synthesis_v2_OUT.txt` + `..._v3_adversarial_OUT.txt`

---

## TL;DR — Operator's Standing Percentage-Audited Question

The cron prompt asks for "percentage audited" + "percentage definitive SOTA reviewed" every 5min. Honest answer per V3 PROVEN-vs-INFERRED naming discipline + cardinal-rule-7 reporting:

| Metric | Honest Answer | Caveat |
|---|---|---|
| **Raw manifest-row audit coverage** | **~4.6%** (13 of ~282 rows) | Only the F15-F27 deepening lane; not a global architecture-audited percentage |
| **Within-slice documentation coverage** | **100%** of F15-F27 selected 13 rows | DO NOT report this as global |
| **CR-7 Phase 2 predicate (f) smoke-PASS** | **0% globally satisfied** | No single row reaches full smoke-PASS per cardinal-rule-7 |
| **Definitive SOTA reviewed (live/behavioral proof)** | **PARTIAL** — only F14 codex T1-T7 + F25/F26/F27 HTTP-MCP handshake families | F15-F24 are mostly install/wire/static-state evidence |

V3 verbatim catch: "Do not equate documented evidence cells with install-verified, smoke-PASS, predicate-(f)-SATISFIED, or definitive SOTA review."

---

## Tier Completion Matrix (F15-F27 cumulative)

| Section | Rows documented | Rows planned | Status |
|---|---|---|---|
| **§Section 4 — Memory MCPs** | L1+L2+L3 (3/3) | — | **COMPLETE** for selected ladder |
| §Section 4.5 — Memory backing-services | L1+L2+L3 (3/4) | L4 Docker Desktop | **PARTIAL** |
| **§Section 7 — Code intelligence** | L1+L2+L3 (3/3) | — | **COMPLETE** for selected ladder |
| §Section 8 — Search+Research MCPs | L4+L5+L7 (3/7) | L1 Exa, L2 Perplexity, L3 Firecrawl, L6 arXiv | **PARTIAL** |

Per V3: "four tiers documented with unresolved PLANNED cells" (NOT "four tiers closed").

---

## Evidence Shape Class Distribution (F15-F27)

**7 evidence shape classes STABLE across F14-F27** — V3 F21+F22+F23+F24+F25+F26 TAXONOMY DISCIPLINE **SEPTUPLE-AFFIRMED** (no new 8th class introduced; only REFINED SUBTYPES + V3 distinctions).

Evidence strength gradient (weakest → strongest):

```
PLANNED
  < BINARY-INSTALLED-NO-PROCESS-NO-WIRE (F20)
  < IMAGE-STAGED-DAEMON-DOWN-NOT-WIRED (F16)
  < WIRED-DAEMON-DOWN-PRIOR-SMOKE-PARTIAL-NOW-OFFLINE (F17)
  < INFERRED-LIVE-VIA-DB-MTIME (F15)
  < ON-DEMAND-STDIO-WIRED-* + filesystem-state (F22+F23+F24)
  < HTTP-API-LIVE-POINT-IN-TIME (F19)
  < REMOTE-HTTP-MCP-HANDSHAKE-PROVEN no-auth (F25)
  < HTTP-MCP-HANDSHAKE-PROVEN-AUTH-CONFIGURED (F26 INFERRED)
  < HTTP-MCP-HANDSHAKE-PROVEN-AUTH-FLOW-PROVEN (F27 PROVEN)
  < LIVE-RUNTIME-ACTIVE-PROVEN (F14 — recurring JSONL audit trails)
```

---

## Per-Fire Evidence Cell Summary

| Fire | Tier-Row | Status | Evidence Class | V3 SAVED-SHIP Count |
|---|---|---|---|---|
| F15 | §4 L1 mcp-memory | INFERRED-LIVE-VIA-DB-MTIME | filesystem-state-mutation | 7 |
| F16 | §4 L2 Qdrant | IMAGE-STAGED-DAEMON-DOWN-NOT-WIRED | IMAGE-STAGED-NO-RUNTIME | 7 |
| F17 | §4 L3 Graphiti | WIRED-DAEMON-DOWN-PRIOR-SMOKE-PARTIAL-NOW-OFFLINE | 4th class | 5 |
| **F18** | **§4.5 L1 LiteLLM** | **RETRACTED** (MIS-ATTRIBUTED — was actually Ollama) | NATIVE-RUNTIME-HTTP-API-LIVE-POINT-IN-TIME | 7 (caught BRIEF errors) |
| F19 | §4.5 L3 Ollama | HTTP-API-LIVE-POINT-IN-TIME-NO-MODELS-LOADED | SUBTYPE of F18 5th class | 6 |
| **F20** | §4.5 L1 LiteLLM | BINARY-INSTALLED-NO-PROCESS-NO-WIRE | **NEW 7th class** + **F18 RETROACTIVE CORRECTION** | 7 |
| F21 | §4.5 L2 FalkorDB | BACKEND-INDIRECT-PRIOR-SMOKE-NOW-OFFLINE-NOT-DIRECT-WIRED | REFINED SUBTYPE of F17 | 7 |
| F22 | §7 L3 Repomix | ON-DEMAND-STDIO-WIRED-CLI-RESPONDING-NO-LIVE-AUDIT | REFINED SUBTYPE per F21 discipline | 7 |
| F23 | §7 L2 Serena | ON-DEMAND-STDIO-WIRED-SHA-PINNED-UVX-CACHE-NO-LIVE-AUDIT | REFINED SUBTYPE triple-affirmed | 10 |
| F24 | §7 L1 GitNexus | DIRECT-BINARY-STDIO-WIRED-CLI-RESPONDING-FILESYSTEM-STATE-MUTATED-NOT-INDEXED-NO-LIVE-AUDIT | REFINED SUBTYPE quadruple-affirmed + "negative capability qualifier" | 7 |
| F25 | §8 L5 DeepWiki | REMOTE-HTTP-MCP-INITIALIZE-HANDSHAKE-PROVEN | REFINED SUBTYPE quintuple-affirmed | 7 |
| F26 | §8 L4 Context7 | HTTP-MCP-HANDSHAKE-PROVEN-AUTH-CONFIGURED | REFINED SUBTYPE sextuple-affirmed + "AUTH-CONFIGURED-NOT-AUTH-GATED" naming | 9 |
| **F27** | §8 L7 GitHub MCP | **HTTP-MCP-HANDSHAKE-PROVEN-AUTH-FLOW-PROVEN** | REFINED SUBTYPE septuple-affirmed + "AUTH-FLOW-PROVEN-vs-TOOL-CALL-PROVEN" distinction | 10 |

Total: V3 SAVED-SHIP catches across F15-F27 = **97 V2 overclaims** caught (avg ~7.5 per fire).

---

## F18 OVER-Claim Retroactive Correction (Cardinal-Rule-7 Honest Disclosure)

Per V3 catch: **F18 ship `b499055` MUST be disclosed as corrected by F20, not silently normalized.**

- **F18** (commit `b499055`): Claimed §Section 4.5 L1 LiteLLM is NATIVE-RUNTIME-HTTP-API-LIVE-POINT-IN-TIME based on port 11700 evidence
- **F19 STATE PROBE**: revealed port 11700 listener is actually OLLAMA PID 45628 (NOT LiteLLM)
- **F19** (commit `67082bc`): inline-disclosed F18 OVER-claim + queued F-future L1 LiteLLM retroactive correction
- **F20** (commit `e72999a`): RETROACTIVELY CORRECTED L1 LiteLLM row to BINARY-INSTALLED-NO-PROCESS-NO-WIRE (6 F18 OVER-claims explicitly RETRACTED inline)
- **F18 commit body NOT rewritten** per `port-note-discipline.md §6` forward-only mandate
- **3rd-order FM-20 path-drift cascade FULL CLOSURE** documented: BRIEF→V2 F18→V3 F18 caught BRIEF but inherited→F19 PROBE→F20 retroactively corrected

---

## V3 Critical Discipline Catches Introduced (F21-F27)

Multiple V3 catches established new operator discipline precedents:

1. **F21 TAXONOMY DISCIPLINE** — REFINED SUBTYPE beats new evidence shape class when verification primitive is identical
2. **F22 PRECEDENT APPLICATION** — V3 catches V2 "new class" proposal twice consecutive
3. **F23 TRIPLE-AFFIRMED PRECEDENT** — V3 catches V2 "new class" proposal three times consecutive
4. **F24 "NEGATIVE CAPABILITY QUALIFIER"** — NOT-INDEXED is a negative capability: server can be installed/wired while graph data is empty
5. **F25 QUINTUPLE-AFFIRMED + FIRST POSITIVE HANDSHAKE** — first MCP-protocol-aware handshake-proven evidence
6. **F26 SEXTUPLE-AFFIRMED + V3 NAMING CATCH** — AUTH-CONFIGURED-NOT-AUTH-GATED (proven: env+wire present; inferred: where auth operates)
7. **F27 SEPTUPLE-AFFIRMED + AUTH-FLOW-PROVEN-vs-TOOL-CALL-PROVEN distinction** — handshake-level auth-gate PROVEN; tool-call success still UNPROVEN

---

## CR-7 Phase 2 Trigger Predicate (f) Status

**Globally NOT-SATISFIED.** Per cardinal-rule-7 honest reporting:

- 13 rows documented at varying PARTIAL-OF-PARTIAL strengths
- No single F15-F27 row reaches full smoke-PASS sufficient for predicate (f) closure
- Sister predicates (a/b/c/d/e) also not all SATISFIED globally
- Even if all 6 predicates SATISFIED simultaneously, **operator-decision-required** gate per CR-7 — Phase 2 transition does NOT auto-fire

---

## FM Defense Cumulative (F15-F27)

| FM | Count | Detail |
|---|---|---|
| **FM-09 V3 ADVERSARIAL** | **50/50 firm** (33 consecutive arcs; **25 cross-arc RECURSIVE — 5 W154 + 20 W155**) | V3 caught V2 overclaims in **100% of F15-F27 fires** |
| FM-02 (b)+(c) | atomic narrow `--only` per ship | All 13 ships atomic single-file |
| FM-02 (c) FILENAME-LAYER ABSORPTION | 1 instance (F20) | parallel session `wave155-f20-commit-msg.txt` for different logical unit; distinct filename `wave155-f20-litellm-correction-commit-msg.txt` |
| FM-15 git CLI grammar | 0 instances | options-before-`--` discipline held |
| FM-17.f orchestrator-direct V2+V3 | All 13 fires | NO subagent fan-out; CR-3 gate FULLY satisfied via REAL GPT-5.5 codex CLI 0.130.0 |
| FM-20 path-drift cascade defense | **21 in W155** | Including 3rd-order cascade FULL CLOSURE (F18 BRIEF→F19 PROBE→F20 CORRECT) |
| FM-21.a CronCreate `81bd1a59` | Stable | Single-instance verified via STATE PROBE every fire |
| Marker Decay corollary | **12 W155 instances** | Per-fire stale-claim corrections (Wave 62 / Wave 132 / Wave 141 / Wave 142 cites narrowed historical-only) |
| Inline-bash quote-trap | n=30 (unchanged) | PowerShell pivot retained throughout |

---

## Path P + CR-3 Cumulative Ladders

- **Path P n=84** (V2+V3 PARALLEL via Z-resident codex.cmd Get-Content pipe pattern; 39 dispatches across 13 fires)
- **Pattern D n=84** (same)
- **CR-3 non-Phase-1-bootstrap n=37** (every fire FULLY SATISFIED cross-model gate via REAL GPT-5.5)
- **Mia n=356** (cumulative pre-apply discipline)

---

## Anti-Pattern Warnings (V3 verbatim)

1. Do NOT answer operator with only 100% of selected rows; that hides the ~4.6% global denominator
2. Do NOT collapse documented + installed + wired + handshake-proven + live-audited + smoke-PASS into one word: "audited"
3. Do NOT say "definitive SOTA reviewed" implies definitive runtime capability
4. Do NOT upgrade F25-F27 handshakes into tool-call success unless tool-call evidence exists
5. Do NOT introduce 8th evidence class for F21-F27 unless genuinely new evidence shape appears
6. Do NOT count PLANNED rows as audited
7. Do NOT treat config-only / daemon-down / inferred / prior-smoke-now-offline evidence as smoke-PASS
8. Do NOT rewrite historical F18 commit body `b499055`; keep correction forward-only per `port-note-discipline.md §6`
9. Do NOT include tmp/ output; ship to docs/ per USER-CORRECTION-ACK n=29 operator signal `32ad989`
10. Do NOT inflate architecture-wide percentages from narrow F15-F27 deepening lane

---

## Forward-Future Logical Units (Operator-Decision-Required per cycle-300)

- F-future: §Section 4.5 L4 Docker Desktop row mutation (PLANNED — winget install operator-decision)
- F-future: §Section 8 L1 Exa + L2 Perplexity + L3 Firecrawl + L6 arXiv installs (PLANNED status)
- F-future: GitHub MCP authenticated tool-call probe (operator-mediated via Claude Code `mcp__github__*`)
- F-future: Context7 authenticated tool-call probe
- F-future: DeepWiki `read_wiki_structure`/`read_wiki_contents` tool-call probe
- F-future: §Section 7 row JSONL audit-log additions (would upgrade to LIVE-RUNTIME-ACTIVE-PROVEN)
- F-future: Docker daemon restart → FalkorDB container restart → Wave 142 must-pass live-session probe
- F-future: Phase 2 transition operator-decision (even all 6 predicates SATISFIED requires explicit operator approval per CR-7)

---

## Cardinal-Rule Conformance (F15-F27 cumulative)

- **CR-1**: All 13 fires + F28 cite V2+V3 verdict files (TIER-1-DIRECT)
- **CR-3**: 37x non-Phase-1-bootstrap (cross-model gate FULLY SATISFIED across all fires)
- **CR-5**: install-priority closure (manifest evidence-cell extensions only; no hand-coded artifacts)
- **CR-7**: REPORT before route-around — F18 OVER-claim retroactively corrected; 12 Marker Decay corrections; honest PROVEN-vs-INFERRED-vs-CONFIG-vs-PLANNED naming
- **CR-8**: TIER-3-LOCAL-COMPOSITION for all 13 fires + F28
- **CR-9**: MEDIUM/LOW risk per V3 elevation; CR-9 sibling-bleed (F21→F22 REFUTED→F23 forward-documented); SHA-pin drift INTENTIONAL D6 defense (F23)
- **CR-10**: research-first (V2+V3 BEFORE Edit + smoke-probes BEFORE+AFTER + STATE PROBE per FM-21.b)
- **CR-11**: META-process SOTA (V3 SEPTUPLE-AFFIRMED TAXONOMY DISCIPLINE demonstrates META-discipline learning)

---

## Cite Trail

V2+V3 verdict files for all 13 fires + F28 at `.claude/state/codex_consult_w155_f{15..28}_*_OUT.txt`. Commit SHAs: F15 `3ce02f7` / F16 `59d9774` / F17 `c2e3219` / F18 `b499055` (RETRACTED) / F19 `67082bc` / F20 `e72999a` / F21 `5315187` / F22 `3a63290` / F23 `85055a8` / F24 `d8c9028` / F25 `84e346e` / F26 `5ef33ee` / F27 `149e28d`.

---

**Risk class**: MEDIUM (V3 elevation per percentage-inflation defense). **Disposition**: Honest cumulative synthesis preserving evidence-strength gradient and predicate-(f) NOT-SATISFIED status. Operator answer: **~4.6% global manifest-row-documented coverage; 0% predicate-(f) smoke-PASS; tier completion: §4+§7 COMPLETE for selected ladder, §4.5+§8 PARTIAL.**
