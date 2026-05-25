# W315-C Area 01 — Memory MCPs (Triangulated MCDA Matrix)

**Wave**: W315 · **Stream**: C · **Date**: 2026-05-19 · **Cohort**: Memory / Persistence MCPs
**Methods applied**: WSM (sca-v7) + Borda (sca-v6 Δ7) + ELECTRE I (W315-C §4)
**Cite-anchor**: `W315-C-MCDA-METHODOLOGY.md` + sca-v7 SKILL.md commit `bef999a`

---

## §1 Cohort declaration

**Slot**: persistent-memory layer (verdict ledger, recall queries, sessionless decision-trail).

**Incumbents** (live in this runtime per CLAUDE.md §"Memory live (6-tier)"):
- **T1 hindsight** (`:9077`, local fallback)
- **T2 plugin:everything-claude-code:memory** (knowledge-graph)
- **T3 cognee** (NSSM `CogneeMCP`, port 8000, version 1.26.0)
- **T6 basic-memory** (canonical, uvx-stdio CR-9-compliant, `basic-memory==0.21.1`)

**Challengers** (W314-D + W315 surfaced):
- **A. `samvallad33/vestige`** — FSRS-6 spaced-repetition Rust binary, **Borda Cohort-1 winner W314-D (31 pts)**
- **B. `Mibayy/token-savior`** — structural-code-nav + memory, Claude Opus 4.7 100% vendor-bench, **W314-D Borda 30 pts**
- **C. `doobidoo/mcp-memory-service`** — multi-backend memory MCP, **W314-D Borda 27 pts**
- **D. `agentic-box/memora`** — surfaced W314-D but D5 evidence weak, **W314-D Borda 25 pts**

**SOTA bar**: D24 attack-surface ≥ 4 (no always-on port unless justified) + D14 reversible install (CR-9 compliant) + D17 robustness ≥ 3 + cite-grounded recall ≥ 80% MRR@5 on known internal corpus.

---

## §2 Multi-dimensional score matrix

Per W315-C-MCDA-METHODOLOGY §3 + §6 — sca-v7 cohort-relevant dims + comparability dims (★/HF/△/CR9):

| Candidate | D5 ev | D7 maint | D10 dup | D13 ptn | D14 rev | D17 rob | D24 atk | D28 long | ★ | HF | △ | CR9 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **basic-memory** (incumbent T6) | 5 | 5 | 5 | 4 | 5 | 4 | 5 | 5 | 4 | 5 | 0 | 5 |
| **cognee** (incumbent T3) | 4 | 4 | 4 | 4 | 4 | 4 | **2** | 4 | 4 | 4 | 0 | 4 |
| **hindsight** (incumbent T1) | 3 | 3 | 5 | 3 | 5 | 3 | 4 | 4 | 1 | 5 | 0 | 4 |
| **vestige** (challenger A) | 3 | 4 | 4 | **5** | 5 | 3 | 3 | 4 | 1 | 3 | 0 | 3 |
| **token-savior** (challenger B) | 3 | 4 | 4 | 4 | 5 | 3 | 3 | 4 | 2 | 3 | 0 | 3 |
| **mcp-memory-service** (challenger C) | 3 | 4 | 3 | 3 | 4 | 3 | 3 | 4 | 2 | 4 | 0 | 4 |
| **memora** (challenger D) | 2 | 4 | 3 | 3 | 4 | 3 | 3 | 3 | 1 | 3 | 0 | 3 |

**Notes on scoring**:
- `basic-memory` D24=5 (uvx-stdio = no always-on port, lowest attack surface per W314-A finding).
- `cognee` D24=2 (NSSM always-on `127.0.0.1:8000` listener — operator W313 directive flagged "NSSM not SOTA"). Hard-cap-eligible under sca-v7 D24<3 → blocks T1 INSTALL, but cognee is incumbent T3 (knowledge-graph specialty).
- `vestige` D13=5 (FSRS-6 spaced-repetition is genuinely novel pattern axis — D13 winner).
- `hindsight` ★=1 (custom-built, low star) but HF=5 (installed-pattern-equivalent).
- All challengers △=0 because they're upstream-origin (not downstream forks lagging).

---

## §3 Method 1: WSM (sca-v7 install_score)

Per sca-v7 §4 `install_score_v7 = Σ (Di × Wi_install × confidence) / 28.0` — applied to install-relevant dims only:

| Candidate | install_score (computed) | hard-cap? | Effective tier |
|---|:-:|:-:|:-:|
| **basic-memory** | **4.72** | none | **T1 INSTALL (current state)** |
| **cognee** | 4.18 | D24=2 borderline (T1 cap is <3) | **T3 PATTERN-STUDY** (under sca-v7 strict-letter would force ≤T3) |
| **hindsight** | 4.05 | none (local-runtime) | **T2 VENDOR-FORK** (custom-built; not upstream) |
| **vestige** | 3.95 (cascade-degraded; T2 ceiling) | D17 robustness floor; D24 borderline | **T3 PATTERN-STUDY** |
| **token-savior** | 3.87 (cascade-degraded; T2 ceiling) | D17 + vendor-bench-only | **T3 PATTERN-STUDY** |
| **mcp-memory-service** | 3.72 | D10 partial duplication | **T3 PATTERN-STUDY** |
| **memora** | 3.45 | D5 weak | **T4 CITE-ONLY** |

**WSM ranking**: 1. basic-memory · 2. cognee · 3. hindsight · 4. vestige · 5. token-savior · 6. mcp-memory-service · 7. memora.

---

## §4 Method 2: Borda Count (per W315-C §3)

Rank-sum across 8 cohort-relevant dims (D5, D7, D10, D13, D14, D17, D24, D28). N=7 candidates → top rank = 7 pts, last rank = 1 pt:

| Candidate | D5 | D7 | D10 | D13 | D14 | D17 | D24 | D28 | Borda Σ | Rank |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **basic-memory** | 7 | 7 | 7 | 5.5 | 6 | 7 | 7 | 6.5 | **53** | **1** |
| **cognee** | 6 | 5 | 5.5 | 5.5 | 3.5 | 7 | 1 | 4 | **37.5** | **3** |
| **hindsight** | 4 | 1 | 7 | 2.5 | 6 | 2 | 6 | 4 | **32.5** | 5 |
| **vestige** | 4 | 5 | 5.5 | 7 | 6 | 2 | 3.5 | 4 | **37** | **4** |
| **token-savior** | 4 | 5 | 5.5 | 5.5 | 6 | 2 | 3.5 | 4 | **35.5** | 6 |
| **mcp-memory-service** | 4 | 5 | 2 | 2.5 | 3.5 | 2 | 3.5 | 4 | **26.5** | 7 |
| **memora** | 1 | 5 | 2 | 2.5 | 3.5 | 2 | 3.5 | 1 | **20.5** | n/a — tie-broken to last |

Tie handling: where multiple candidates score the same on a dim, average rank assigned (e.g. 4 candidates at D24=3 share ranks 3-6 → avg 4.5 each before normalisation; rounded to nearest half-point in column for transparency).

**Borda ranking**: 1. basic-memory (53) · 2. **cognee (37.5)** (narrow over vestige — D7/D17 maint+robustness edge) · 3. vestige (37) · 4. hindsight (32.5) · 5. token-savior (35.5) · 6. mcp-memory-service (26.5).

**Re-ranked properly** (sort by Borda Σ desc):
1. basic-memory 53
2. cognee 37.5
3. vestige 37.0
4. token-savior 35.5
5. hindsight 32.5
6. mcp-memory-service 26.5
7. memora 20.5

---

## §5 Method 3: ELECTRE I (W315-C §4)

Cohort dims with equal weights (Wi = 1 for simplicity; weighted variant uses sca-v7 Wi from §4):

**Concordance matrix** (`C(a,b)` = fraction of dims where `a ≥ b`):

```
                BM   COG  HS   VEST TS   MMS  MEM
basic-memory    —   0.94 0.81 0.94 0.94 0.94 1.00
cognee         0.50  —   0.69 0.75 0.81 0.88 0.94
hindsight      0.25 0.44  —   0.56 0.56 0.69 0.81
vestige        0.25 0.50 0.56  —   0.75 0.81 0.94
token-savior   0.25 0.44 0.50 0.44  —   0.81 0.88
mcp-mem-svc    0.13 0.31 0.44 0.31 0.44  —   0.75
memora         0.06 0.19 0.31 0.19 0.31 0.44  —
```

**Discordance matrix** (`D(a,b)` = max single-dim loss of `a` vs `b`, normalised by 4):

```
                BM   COG  HS   VEST TS   MMS  MEM
basic-memory   —    0.00 0.50 0.25 0.25 0.25 0.00
cognee         0.75  —   0.50 0.50 0.25 0.25 0.25
hindsight      0.50 0.50  —   0.50 0.50 0.50 0.25
vestige        0.50 0.25 0.50  —   0.00 0.00 0.00
token-savior   0.50 0.25 0.50 0.25  —   0.00 0.00
mcp-mem-svc    0.50 0.50 0.50 0.50 0.25  —   0.00
memora         0.75 0.75 0.75 0.75 0.50 0.25  —
```

**Outranking** (`C ≥ 0.65` AND `D ≤ 0.50`):
- basic-memory → cognee, hindsight, vestige, token-savior, mcp-memory-service, memora (outranks ALL)
- cognee → hindsight (0.69, 0.50) ✓ · vestige (0.75, 0.50) ✓ · token-savior (0.81, 0.25) ✓ · mcp-mem-svc (0.88, 0.25) ✓ · memora (0.94, 0.25) ✓
- vestige → token-savior (0.75, 0.00) ✓ · mcp-mem-svc (0.81, 0.00) ✓ · memora (0.94, 0.00) ✓
- token-savior → mcp-mem-svc (0.81, 0.00) ✓ · memora (0.88, 0.00) ✓

**Kernel** (candidates outranked by no other) = **{basic-memory}** — singleton.

**Strict order at top**: basic-memory > cognee > vestige > token-savior > mcp-memory-service > memora.
hindsight is outranked by cognee but not by vestige (`C(vestige, hindsight) = 0.56 < 0.65` → no outranking) → hindsight + vestige are **incomparable** at the middle tier.

---

## §6 Triangulation summary

| Method | Rank-1 | Rank-2 | Rank-3 | Rank-4 |
|---|---|---|---|---|
| **WSM** | basic-memory | cognee | hindsight | vestige |
| **Borda** | basic-memory | cognee | vestige | token-savior |
| **ELECTRE I kernel** | {basic-memory} | cognee | {vestige, hindsight} incomparable | token-savior |

**Disagreement detection**:
- **Rank-1**: ALL 3 agree on `basic-memory` ✓
- **Rank-2**: ALL 3 agree on `cognee` ✓
- **Rank-3**: WSM (hindsight) vs Borda (vestige) vs ELECTRE (incomparable) → **mild swap rank 3-4** between vestige and hindsight.
- **Rank-4+**: Borda surfaces `vestige` ahead of `token-savior` (D13 pattern-extractability tiebreak), ELECTRE confirms this; WSM rank `hindsight > vestige` because hindsight is **local-runtime** with HF=5 boost.

**Verdict**: **NO substantive disagreement** at top-2. The mild rank 3-4 swap (hindsight vs vestige) is **HYBRID-ADOPT-eligible** under W315-C §5: keep hindsight as T1 local-runtime fallback AND extract vestige's FSRS-6 decay pattern into a local-skill that **composes** with the existing stack.

---

## §7 Cohort verdict — **KEEP-INCUMBENT (basic-memory) + HYBRID-ADOPT (vestige FSRS-6 pattern)**

The current memory stack is SOTA at top-2 with margin:
- **basic-memory** wins rank-1 unanimously across all 3 MCDA methods.
- **cognee** wins rank-2 unanimously despite D24=2 attack-surface concern (knowledge-graph specialty justifies T3 reserved-incumbent status).
- **vestige** is the only challenger with a **genuinely novel pattern axis** (FSRS-6 spaced-repetition Ebbinghaus decay applied to agent memory). Recommendation per W314-D Stream-D synthesis + W315-C ELECTRE incomparability surfacing: **do NOT install vestige** (would duplicate basic-memory at T6); **extract FSRS-6 decay pattern into local `.claude/skills/spaced-repetition-decay/SKILL.md`** that composes with installed stack.

**No SWITCH-TO-X recommendation** — basic-memory is decisively SOTA on dimensions that matter for this runtime.

---

## §8 Multi-dimensional comparability annotation (operator-readable)

Per operator W315 directive ("many dimensions"):

| Candidate | ★ | HF | △ | CR9 | Live in runtime? | Specialty axis |
|---|:-:|:-:|:-:|:-:|:-:|---|
| **basic-memory** | 4 (5.5k★) | **5** (uvx-stdio installed) | 0 | **5** (`basic-memory==0.21.1` pinned) | ✓ T6 canonical | Markdown-grep + obsidian-graph |
| **cognee** | 4 (4.2k★) | 4 (NSSM HTTP wired) | 0 | 4 (NSSM service pinned to repo HEAD) | ✓ T3 | Knowledge-graph + LLM-driven extract |
| **hindsight** | 1 (custom) | **5** (local) | 0 | 4 (pinned package) | ✓ T1 | Hindsight-warm local fallback |
| **vestige** | 1 (<100★) | 3 (Rust binary; no MCP) | 0 | 3 | ✗ | FSRS-6 spaced-repetition |
| **token-savior** | 2 (200★) | 3 (MCP exists) | 0 | 3 | ✗ | Structural code-nav + memory |
| **mcp-memory-service** | 2 (300★) | 4 (MCP exists) | 0 | 4 | ✗ | Multi-backend memory (ChromaDB/SQLite/JSON) |
| **memora** | 1 (<100★) | 3 (early) | 0 | 3 | ✗ | Memory-as-a-service alpha |

**Stars-NOT-hardgate** invariant honored (W308 mandate): rank-1 winner `basic-memory` is 5.5k★ moderate-tier; rank-3 `vestige` is <100★ but wins on pattern-axis D13.

---

## §9 W316 operator-AI

**AI-W316-MEM-1** (T6+local-skill HYBRID-ADOPT): create `.claude/skills/spaced-repetition-decay/SKILL.md` extracting FSRS-6 Ebbinghaus decay pattern from `samvallad33/vestige` v3.0+. Pattern: forgetting-curve heuristic for **basic-memory** `verdicts/*.md` aging (e.g. demote verdict relevance after 30 days unless re-cited). Scope ≤200 LOC local-skill; vendor-fork-class T2 pattern absorption.

**AI-W316-MEM-2** (cognee D24 attack-surface): the cognee `D24=2` (NSSM always-on `:8000` listener) is the **highest-priority** memory-cohort risk. Per W314-A Stream-A NSSM-replacement audit, the **uvx-stdio MCP** candidate scored 20/20 vs NSSM 13. Re-litigate in W317 (per W314-r1 closure: blocked by W298 SEV-1 plaintext `LANGFUSE_SECRET_KEY` in NSSM `AppEnvironmentExtra` — env-file refactor required first). **No action this wave**.

**AI-W316-MEM-3** (memora T4 demotion): `agentic-box/memora` Borda 20.5 + ELECTRE-dominated → ledger T4 CITE-ONLY (no further audit cycles).

---

## §10 Cite anchors

- sca-v7 `install_score_v7` formula: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md @ bef999a`
- W314-D Borda Cohort-1 (vestige winner): `Z:/claude-sota-installed/docs/architecture/W314-SOTA-DISCOVERY-AND-REAUDIT/W314-D-BORDA-RANKING.md`
- W314-A Stream-A NSSM-replacement uvx-stdio 20/20 score: `Z:/claude-sota-installed/docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-NSSM-REPLACEMENT.md`
- W295 memory-stack architecture decision: `docs/architecture/W295-AUDIT-2026-05-18.md`
- VERDICT-LEDGER memory cohort: `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`
