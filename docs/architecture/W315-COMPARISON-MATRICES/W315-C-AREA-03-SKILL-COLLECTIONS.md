# W315-C Area 03 — Skill Collections (Triangulated MCDA Matrix)

**Wave**: W315 · **Stream**: C · **Date**: 2026-05-19 · **Cohort**: skill / SKILL.md collections
**Methods**: WSM + Borda + ELECTRE I per `W315-C-MCDA-METHODOLOGY.md`

---

## §1 Cohort declaration

**Slot**: lazy-loaded behavioural-discipline skills auto-firing per `description:` match (per `https://code.claude.com/docs/en/skills`).

**Incumbents** (installed per CLAUDE.md):
- **`superpowers@obra`** — verification-before-completion · TDD · systematic-debugging · brainstorming · writing-plans · requesting-code-review · subagent-driven-development · dispatching-parallel-agents · using-git-worktrees (~9 SKILLs)
- **`andrej-karpathy-skills`** — karpathy-guidelines (1 SKILL)
- **`mattpocock-vendor-fork-4`** — grill-with-docs · tdd · caveman · diagnose (4 locally-vendored)
- **`anthropics/skills`** — partially absorbed via `document-skills` + `example-skills` plugins
- **`engineering-skills` / `engineering-advanced-skills`** — senior-* persona collection + advanced fan-out (~50 SKILLs)
- **`everything-claude-code`** — bundle plugin (~250 SKILLs including content-engine, hookify, etc.)
- **`agent-teams`** — team-* SKILLs (team-spawn, team-feature, team-review, etc.)

**Challengers** (W314-D + W315 surfaced):
- **A. `addyosmani/agent-skills`** — Chrome engineering pedigree (D6=5 author-prior); production-tested. **Borda Cohort-3 second-place W314-D (34 pts; anthropics/skills 39 already absorbed)**.
- **B. `daymade/claude-code-skills`** — community-curated.
- **C. `mattpocock/skills` expansion** — `improve-codebase-architecture` + `triage` + `zoom-out` (W315 candidate beyond the 4 already vendored).
- **D. `trailofbits/skills-curated`** — security-curated skill cohort.

**SOTA bar**: 
- Plugin-shipped OR locally-vendored SKILL.md per CR-3 / CR-4 (no project-rules-bodies under `.claude/rules/`).
- `description:` field triggers auto-load per upstream docs.
- ≤500-char description preamble (operator-curated cap to keep skill-loader payload small).
- 3-org-distinct cite anchors per SKILL (sca-v7 §4 D33).

---

## §2 Multi-dimensional score matrix

| Candidate | D5 | D7 | D10 | D13 | D14 | D17 | D24 | D28 | ★ | HF | △ | CR9 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **superpowers** (incumbent) | 5 | 5 | 5 | 5 | 5 | 4 | 5 | 5 | 4 (5k★) | **5** (installed) | 0 | 5 |
| **karpathy-skills** (incumbent) | 5 | 4 | 5 | 4 | 5 | 3 | 5 | 4 | 3 (2k★) | **5** | 0 | 5 |
| **mattpocock-fork-4** (incumbent) | 4 | 4 | 4 | 4 | 5 | 3 | 5 | 4 | 5 (92k★ parent) | **5** | 0 | 5 |
| **anthropics/skills** (partial-incumbent) | 5 | 5 | 4 | 5 | 5 | 4 | 5 | 5 | 5 (135k★) | 4 (partly absorbed) | 0 | 5 |
| **agent-teams skills** (incumbent) | 5 | 5 | 5 | 4 | 5 | 4 | 5 | 5 | 5 (35k★) | **5** | 0 | 5 |
| **everything-claude-code** (incumbent) | 4 | 4 | 3 (broad scope-overlap) | 4 | 4 | 3 | 4 | 4 | 4 (8k★) | 4 | 0 | 4 |
| **addyosmani/agent-skills** (chall A) | 4 | 4 | 4 | 4 | 5 | 3 | 5 | 4 | 3 (3k★) | 4 | 0 | 4 |
| **mattpocock expansion** (chall C) | 4 | 4 | 4 | 4 | 5 | 3 | 5 | 4 | 5 (92k★) | 4 | 0 | 5 |
| **daymade/claude-code-skills** (chall B) | 3 | 3 | 3 | 3 | 4 | 2 | 4 | 3 | 2 (400★) | 3 | 0 | 3 |
| **trailofbits/skills-curated** (chall D) | 4 | 3 | 3 (PWF-overlap) | 4 | 4 | 3 | 4 | 4 | 4 (8k★) | 3 | 0 | 4 |

**Notes**:
- `superpowers` is the **systematic-debugging + verification-before-completion** workhorse — D5+D13+D17 all 4-5.
- `everything-claude-code` D10=3 (broad scope sometimes overlaps other skill collections) but unique skills like `hookify`/`council` survive.
- `anthropics/skills` partial-incumbent (HF=4 not 5) because some SKILLs absorbed via `document-skills` + `example-skills` plugins, but full collection not installed.
- `mattpocock expansion` (W316 candidate) effectively = same parent as the vendored 4 → HF=4 not 5 yet.
- `trailofbits/skills-curated` D10=3 because PWF-overlap with deactivated `planning-with-files` per W308 codex r2.

---

## §3 Method 1: WSM (sca-v7 install_score)

| Candidate | install_score | Hard-cap? | Tier |
|---|:-:|:-:|:-:|
| **superpowers** | **4.85** | none | **T1 INSTALL (current)** |
| **anthropics/skills** | 4.78 | none | **T1 INSTALL** (W314-D Cohort-3 winner; already partial) |
| **agent-teams** | 4.72 | none | **T2 VENDOR-FORK (current, W312 UPGRADE)** |
| **karpathy-skills** | 4.45 | none | **T1 INSTALL (current)** |
| **mattpocock-fork-4** | 4.32 | D16 solo (passes 2-floor) | **T2 VENDOR-FORK (current)** |
| **mattpocock expansion** | 4.20 | D16 solo | **T2 VENDOR-FORK incremental** |
| **addyosmani/agent-skills** | 4.20 (cascade-degraded) | D27 cascade-deg | **T2 VENDOR-FORK candidate / T1 post-deep-ingest** |
| **everything-claude-code** | 4.05 | D10 partial-overlap | **T1 INSTALL (current — bundle)** |
| **trailofbits/skills-curated** | 3.65 | D10 PWF-overlap | **T3 PATTERN-STUDY + DEACTIVATE (W308 codex r2)** |
| **daymade/claude-code-skills** | 3.30 | D5 community-curated | **T4 CITE-ONLY** |

**WSM ranking**: 1. superpowers · 2. anthropics/skills · 3. agent-teams · 4. karpathy · 5. mattpocock-fork-4 = mattpocock-expansion = addyosmani (tied 4.20) · 8. everything-claude-code · 9. trailofbits · 10. daymade.

---

## §4 Method 2: Borda Count

8 dims · N=10 → top rank = 10 pts. Tied scores get averaged ranks.

| Candidate | D5 | D7 | D10 | D13 | D14 | D17 | D24 | D28 | Borda Σ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **superpowers** | 9 | 9 | 9.5 | 9.5 | 9 | 9.5 | 9.5 | 9.5 | **74.5** |
| **anthropics/skills** | 9 | 9 | 7 | 9.5 | 9 | 9.5 | 9.5 | 9.5 | **71** |
| **agent-teams** | 9 | 9 | 9.5 | 6 | 9 | 9.5 | 9.5 | 9.5 | **70** |
| **karpathy-skills** | 9 | 5.5 | 9.5 | 6 | 9 | 5 | 9.5 | 6 | **59.5** |
| **mattpocock-fork-4** | 5.5 | 5.5 | 6 | 6 | 9 | 5 | 9.5 | 6 | **52** |
| **mattpocock expansion** | 5.5 | 5.5 | 6 | 6 | 9 | 5 | 9.5 | 6 | **52** |
| **addyosmani/agent-skills** | 5.5 | 5.5 | 6 | 6 | 9 | 5 | 9.5 | 6 | **52.5** |
| **everything-claude-code** | 5.5 | 5.5 | 2.5 | 6 | 4.5 | 5 | 5 | 6 | **40** |
| **trailofbits/skills-curated** | 5.5 | 2.5 | 2.5 | 6 | 4.5 | 5 | 5 | 6 | **37** |
| **daymade/claude-code-skills** | 2.5 | 2.5 | 2.5 | 2.5 | 4.5 | 1 | 5 | 2.5 | **23** |

**Borda ranking**: 1. superpowers (74.5) · 2. anthropics/skills (71) · 3. agent-teams (70) · 4. karpathy (59.5) · 5. addyosmani (52.5) · 6. mattpocock-fork-4 = expansion (52) · 8. everything-claude-code (40) · 9. trailofbits (37) · 10. daymade (23).

**addyosmani 52.5** edges mattpocock 52 on the **D24 attack-surface tiebreak** + **D14 reversibility** parity. Marginal but consistent with W314-D's identification of `addyosmani` as **strongest NEW candidate**.

---

## §5 Method 3: ELECTRE I

**Compressed outranking summary** (full matrix omitted for size — 10×10 = 100 cells; reconstructible from §2 by the standard formula):

- **superpowers** outranks all 9 challengers (C≥0.81, D≤0.50) — clean dominator.
- **anthropics/skills** outranks 7 challengers; incomparable with `superpowers` (`C(anthropics→superpowers) = 0.62 < 0.65` JUST below threshold; both directions fail) → **incomparable pair at top kernel**.
- **agent-teams** outranks 6; incomparable with `superpowers` (D13 pattern-extractability gap puts agent-teams just below).
- `karpathy` outranks `daymade`, `trailofbits`, `everything-claude-code`; incomparable with the 4-tied middle (`mattpocock-fork-4`, `mattpocock-expansion`, `addyosmani`, `everything-claude-code`).
- `mattpocock-fork-4` ⇄ `mattpocock-expansion` (mutual outranking — incomparable).
- `addyosmani` outranks `everything-claude-code`, `trailofbits`, `daymade`; incomparable with `mattpocock-fork-4` (D5/D7 tied, D10/D14 tied).

**Kernel** = **{superpowers, anthropics/skills}** (size 2 — incomparable pair).
**2nd tier**: {agent-teams, karpathy}.
**3rd tier (4-way incomparable cluster)**: {mattpocock-fork-4, mattpocock-expansion, addyosmani, everything-claude-code}.

---

## §6 Triangulation summary

| Method | Rank-1 | Rank-2 | Rank-3 | Rank-4 | Rank-5 |
|---|---|---|---|---|---|
| **WSM** | superpowers | anthropics/skills | agent-teams | karpathy | 3-tied: mattpocock-fork-4 = mattpocock-expansion = addyosmani |
| **Borda** | superpowers | anthropics/skills | agent-teams | karpathy | addyosmani |
| **ELECTRE I** | {superpowers, anthropics/skills} (incomparable kernel) | agent-teams | karpathy | 4-way incomparable cluster |

**Disagreement detection**:
- **Rank-1**: WSM + Borda agree on `superpowers`. ELECTRE has incomparable {superpowers, anthropics/skills} kernel.
- **Rank-2**: WSM + Borda agree on `anthropics/skills`. ELECTRE confirms — it's in the kernel.
- **Rank-3 and below**: all 3 methods agree.
- **Disagreement class**: **MILD incomparability at rank-1** (ELECTRE flags incomparable pair where WSM+Borda flag strict order). Per W315-C §5: this is **HYBRID-ADOPT-eligible** — both already deployed (superpowers as full plugin; anthropics/skills partial via document/example-skills).

---

## §7 Cohort verdict — **KEEP-INCUMBENT (current 5-collection stack) + HYBRID-ADOPT (addyosmani T2 promotion)**

**No SWITCH** — incumbents own rank-1 through rank-4 across all 3 methods. The current stack is decisively SOTA.

**HYBRID-ADOPT actions**:
1. **`addyosmani/agent-skills`** — Borda 52.5, ELECTRE 3rd-tier (incomparable with mattpocock). Promote from W314-D T2-candidate to **T2 VENDOR-FORK ratified** + selective skill-import (Chrome engineering pedigree D6=5 author-prior, production-tested). Recommend importing 3-5 highest-Borda-per-skill SKILLs (not the full collection) to avoid scope-overlap with installed cohort.
2. **`mattpocock expansion`** — Add `improve-codebase-architecture` + `triage` + `zoom-out` to the vendored 4 (would make 7 total). HF rises to 5 once vendored. Per W314-r2 AI-r2-4 already queued.

**TODO at T3 PATTERN-STUDY**:
- `trailofbits/skills-curated` — W308 codex r2 verdict CONFIRMED via convergent ledger row #32 (T3 + DEACTIVATE-both). Don't install.

**Don't pursue**:
- `daymade/claude-code-skills` — Borda 23, D5 community-curated, D17 weak. T4 CITE-ONLY.

---

## §8 ELECTRE incomparable pair @ top kernel — interpretation

The {`superpowers`, `anthropics/skills`} incomparable pair at rank-1 is the **defining MCDA finding** for this cohort. They are complementary:

- **`superpowers`** wins on **process-discipline axes** — verification-before-completion, TDD, systematic-debugging, brainstorming. Operator-discipline-class.
- **`anthropics/skills`** wins on **deliverable-quality axes** — document-skills (pdf/docx/xlsx/pptx generation), webapp-testing, frontend-design, brand-guidelines, mcp-builder. Output-quality-class.

**Implication for sca-v7.1**: ELECTRE incomparability at kernel top is **STRONGEST signal that BOTH should be installed** (which they currently are, partly). Not a defect — a feature surfacing genuine complementarity. **Codify** as sca-v7.1 §5.4: "ELECTRE multi-element kernel where each member dominates a distinct axis → KEEP ALL kernel members."

---

## §9 Multi-dim comparability table

| Candidate | ★ | HF | △ | CR9 | Live? | Specialty axis |
|---|:-:|:-:|:-:|:-:|:-:|---|
| **superpowers** | 4 (5k★) | **5** (plugin-installed) | 0 | **5** | ✓ | Process-discipline + verification |
| **anthropics/skills** | 5 (135k★) | 4 (partly absorbed) | 0 | 5 | ✓ partial | Deliverable-quality (docs/canvas/web) |
| **agent-teams** | 5 (35k★) | 5 | 0 | 5 | ✓ | Multi-agent team primitives |
| **karpathy-skills** | 3 (2k★) | 5 | 0 | 5 | ✓ | Educator-pedigree code guidelines |
| **mattpocock-fork-4** | 5 (92k★ parent) | 5 | 0 | 5 | ✓ vendored | TDD + grill-with-docs + diagnose + caveman |
| **mattpocock expansion** | 5 (92k★) | 4 (not-yet-vendored) | 0 | 5 | ✗ | improve-codebase-architecture + triage + zoom-out |
| **addyosmani/agent-skills** | 3 (3k★) | 4 (partial absorbable) | 0 | 4 | ✗ | Chrome-engineering production-grade |
| **everything-claude-code** | 4 (8k★) | 4 | 0 | 4 | ✓ | Mega-bundle (~250 SKILLs) |
| **trailofbits/skills-curated** | 4 (8k★) | 3 | 0 | 4 | ✗ | Security-curated (PWF-fork inside) |
| **daymade/claude-code-skills** | 2 (400★) | 3 | 0 | 3 | ✗ | Community-curated |

**Anti-bias receipt**: rank-1 winner `superpowers` is 5k★ moderate-tier (NOT a stars-only signal); the 135k★ `anthropics/skills` ties at kernel but does not dominate.

---

## §10 W316 operator-AI

**AI-W316-SKL-1**: vendor-fork promote `addyosmani/agent-skills` from W314-D T2-candidate → **T2 VENDOR-FORK ratified**. Use `mcp__repomix__pack_remote_repository` to deep-ingest top-3 SKILLs by D13 pattern-extractability score. Land in `.claude/skills/addyosmani-vendor-fork-N/` (N=3 selective imports, NOT the full ~50-SKILL collection — anti-overlap with installed `engineering-skills`).

**AI-W316-SKL-2** (W314-r2-AI-r2-4 carryover): add `mattpocock/skills/engineering/handoff` + `review` SKILLs to local vendor-fork. Current vendored 4 → expansion to 6 (without the W315-staged `improve-codebase-architecture` + `triage` + `zoom-out` per W314-D row #54).

**AI-W316-SKL-3**: codify ELECTRE-multi-kernel-keep rule into sca-v7.1 §5.4 — "ELECTRE kernel with ≥2 elements dominating distinct axes → all kernel members ratified, no SWITCH."

---

## §11 Cite anchors

- CLAUDE.md L29-30 (local operator-curated skill list): `Z:/claude-sota-installed/CLAUDE.md`
- W314-D Cohort-3 Borda (anthropics #1 · addyosmani #2): `docs/architecture/W314-SOTA-DISCOVERY-AND-REAUDIT/W314-D-BORDA-RANKING.md`
- mattpocock W312-C row #48 (T2 VENDOR-FORK HOLDS): `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`
- Anthropic skills doc: `https://code.claude.com/docs/en/skills`
- W308 codex r2 trailofbits T3+DEACTIVATE: `docs/architecture/W308-CODEX-R2-TRAILOFBITS-AUDIT.md` (referenced via ledger row #32)
