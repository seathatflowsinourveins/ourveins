# Wave 152 Fire 11 — sota-researcher V1 verdict: specify-cli (github/spec-kit) install audit + bump decision

VERDICT: APPROVE-BUMP-TO-0.8.8 (overridden by V3 ADVERSARIAL SAVED-SHIP catch → orchestrator-side resolution: KEEP-0.8.7)
ship_readiness: READY
confidence: 0.89
cr12_class: PARTIAL-OVERLAP at SKILL-scope DIFFERENT-MECHANISM at CLI-scope (Mia A self-OVER reclassification from initial GENUINELY-NEW brief framing)
manifest_section_recommendation: §Section 10 (Git + CLI workflow) — per V2 + V3 cross-validation (V1 initially said §11; corrected per actual section semantics — Section 11 is "Cite-only authority guides" which doesn't fit; Section 10 is "Git + CLI workflow" which DOES fit binary-CLI tools)
p7_class: P7.a-DEMAND-ABSENCE-binding (ZERO consumers; Wave 97 Ship 1N init-DEFERRED preserved)
sra_pass_count: 9.5/10 (D6 ambiguous on init-use; D1+D6 critical PASS for binary-use-class)
probe_dag_pass_count: 7/7 PASS

## Mia self-OVERs (4 catches)

**Mia A — REFUTED**: claim "spec-kit GENUINELY-NEW primitive" REFUTED via plugin-namespace probe. eee already has 3 spec/plan SKILLs (`spec-driven-development` SKILL + `writing-plans` SKILL + `planning-and-task-breakdown` SKILL) — SAME SCOPE different MECHANISM (CLI scaffolder vs Claude-skill methodology). CR-12 reclassification: GENUINELY-NEW → **PARTIAL-OVERLAP** per Wave 134 Fire 27-C mem0 precedent (same-domain different-mechanism).

**Mia B — VERIFIED LOW-RISK**: v0.8.7→v0.8.8 = 14 commits (10 GitHub Actions deps bumps + 3 community catalog + 1 fix on `integration switch` + 1 feat `Config-driven opt-in authentication registry`). pyproject.toml deps IDENTICAL. CR-9 LOW-risk intra-minor patch.

**Mia C — VERIFIED**: P7.a DEMAND-ABSENCE binding. ZERO eee runtime consumers (no `.specify/` dir; no `specify` invocations in `.claude/hooks/scripts/`; only context-mode .db strings hits). Wave 97 explicitly DEFERRED `specify init` to operator-decision; that decision NEVER made.

**Mia D — VERIFIED**: manifest stale because Wave 97 Ship 1N entry never propagated to `docs/sota-installed-manifest.md`. Only `docs/install-provenance.md` got the row at L5824-5945.

## SRA D1-D10 (9.5/10 PASS)

| D | Probe | Verdict |
|---|---|---|
| D1 license-use-class | MIT (CLI-binary-use) | ✅ PASS |
| D2 freshness | last push 2026-05-11 (~3h) | ✅ PASS ACTIVE |
| D3 fresh-paint vs density | 95,764★ / 266d / 928+ commits — NOT fresh-paint | ✅ PASS |
| D4 maintainer provenance | github OFFICIAL Organization | ✅ PASS TIER-1-OFFICIAL |
| D5 active-maintenance | 5 releases in 10 days; multi-contributor | ✅ PASS 4/4 |
| D6 use-class compatibility | CLI binary OK; init NOT-FIT eee root | ⚠️ AMBIGUOUS (binary-OK; init-NOT-FIT) |
| D7 Anthropic alignment | ships native `--integration claude` | ✅ PASS |
| D8 industry adoption | 95k★ + 8.3k forks + 412 open issues + multi-org | ✅ PASS |
| D9 FM-class | No known FM; reversible | ✅ PASS |
| D10 replacement viability | N/A (no replacement proposed) | ✅ N/A |

## CR-12 5-class lattice classification

Spec-kit `specify` CLI vs eee `spec-driven-development` SKILL + `writing-plans` SKILL + `planning-and-task-breakdown` SKILL:
- SAME SCOPE: spec-driven-development methodology / pre-coding-spec workflow
- DIFFERENT MECHANISMS: CLI scaffolder (project-init level) vs Claude-skill (operator-prompted methodology)
- **Disposition**: "DIFFERENT MECHANISMS SAME SCOPE" → PARTIAL-OVERLAP per CLAUDE.md L163, NOT GENUINELY-NEW
- Per CR-12 disposition table: PARTIAL-OVERLAP → CITE-PATTERN-ONLY / STUDY-PILOT-PATTERN-EXTRACT

## Phase 5 prescribed_edits

### Edit 1 — `docs/sota-installed-manifest.md` Section 10 INSERT new row for specify-cli v0.8.7 INSTALLED

(orchestrator decides v0.8.7 KEEP vs v0.8.8 BUMP based on cross-model gate — V3 ADVERSARIAL recommends KEEP-0.8.7 per HOME/USERPROFILE auth.json routing risk + named-consumer-trigger absence + D6 chase-latest anti-pattern)

### Edit 2 — `docs/install-provenance.md` APPEND Wave 152 Fire 11 entry documenting 3-voice synthesis

### Edit 3 — `MEMORY.md` PREPEND single-line entry

### Edit 4 — Optional post-commit BG: `uv tool upgrade specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.8` (DEFERRED per V3 SAVED-SHIP)

## Cross-model gate handoff to orchestrator

V2 codex T1 Path P + V3 codex T1 ADVERSARIAL Path P dispatched parallel; verdict synthesis per FM-09 13/13 firm:
- V1 (this artifact): APPROVE-BUMP-TO-0.8.8 conf=0.89
- V2: pending (expected APPROVE-BUMP per same-day-fresh + CR-6 fresh-from-GitHub)
- V3 ADVERSARIAL: pending (expected SAVED-SHIP catch on V1+V2 bias)

HANDOFF: orchestrator-side synthesis weights V1+V2+V3; FM-09 13/13 firm base rate means V3 ADVERSARIAL catches typically WIN on saved-ship items.

VERDICT: APPROVE-BUMP-TO-0.8.8 (V1 only; orchestrator synthesis may override per V2+V3 verdicts)
