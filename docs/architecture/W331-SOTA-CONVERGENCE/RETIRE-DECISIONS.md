# W331 — Retire decisions (per /goal P0.5 mandate)

> Wave **W331** · 2026-05-19 · Explicit formal retire-decisions for /goal P0.5 "Retire alirezarezvani/claude-skills + mattpocock/skills" mandate.

## §1 `alirezarezvani/claude-skills` — RETIRE (Status: deferred, not installed)

**Decision**: RETIRE from W331+ SOTA-tracking scope.

**Rationale** (cite W330 codex axis-2 §3.2 + W331 Stream B verdict):
- Stream B (`B-sota-repos-ingestion.md`) deferred Stage-1 verdict per sca-v12.1 §1; full T-verdict was T3 or T5 requiring further description+overlap scan in a W331+ wave
- Codex r2 axis-2 §3.2 explicitly recommended retire: "Stream B defers Stage-1 verdict and Stream F classifies the 313-skill bundle as low-priority/cherry-pick-only, not a core SOTA tracking repo"
- Not currently installed in this runtime (per `.claude/plugins/installed_plugins.json` — no entry)
- No skills vendored locally from this source (`.claude/skills/` does not contain alirezarezvani-prefixed entries)

**Effect**:
- W331-r4 and onward: SOTA-tracking scope EXCLUDES `alirezarezvani/claude-skills`
- W331-LINE-BY-LINE/ deliverables do NOT include line-by-line ingest for this repo
- Future-wave audit (W332+): only revisit if operator-priority signal arrives + repo demonstrably advances >ACCEPTABLE-Q1 freshness threshold

**No git-action needed**: nothing to remove (not currently installed, no local vendor-fork)

## §2 `mattpocock/skills` — RETIRE (Status: vendor-forked 6 skills, mark as cherry-only)

**Decision**: RETIRE from W331+ SOTA-tracking scope. KEEP existing 6 vendor-forked skills (operator-curated cherry-fork per W320 Stream B precedent); they remain functional + cite-anchored.

**Rationale** (cite W330 codex axis-2 §3.2 + W331 Stream B verdict):
- Stream B (`B-sota-repos-ingestion.md`) noted installed at SHA `67bce91c80cd` (W320 vendor-fork) → upstream HEAD `d54c497a` (`/handoff` wording polish)
- Codex r2 axis-2 §3.2: "useful skill-quality reference, but current drift is only `/handoff` wording polish and it is not a runtime, orchestration, memory, or coding-agent SOTA surface"
- 6 vendored skills (grill-with-docs + tdd + caveman + diagnose + handoff + review per CLAUDE.md L30) remain in `.claude/skills/<name>/SKILL.md` as cherry-fork
- NO SOTA-track refresh (upstream drift is low-impact); cherry-fork at W320 SHA is the canonical install state

**Effect**:
- W331-r4 and onward: SOTA-tracking scope EXCLUDES `mattpocock/skills` upstream drift monitoring
- W332+ housekeeping wave MAY apply upstream wording-polish if explicit operator-priority signal; otherwise W320 vendor-fork is the canonical install state
- 6 vendored skills REMAIN active per cardinal-rule-4 (operator-curated skills per `https://code.claude.com/docs/en/skills`)

**No git-action needed**: vendored skills remain in `.claude/skills/`; no removal required

## §3 Provenance + cite-anchors

- /goal predicate P0.5: "Retire alirezarezvani/claude-skills + mattpocock/skills" (cite: `docs/architecture/W330-MEGA-AUDIT/GOAL-W331.md`)
- W330 codex r2 axis-2 §3.2 RETIRE recommendation (cite: `docs/architecture/W330-MEGA-AUDIT/CODEX-VERDICT-LEDGER.md`)
- W320 mattpocock vendor-fork precedent (cite: CLAUDE.md L30 + W320 Stream B)
- W331 Stream B B-sota-repos-ingestion.md (cite: `docs/architecture/W330-MEGA-AUDIT/B-sota-repos-ingestion.md`)
- W295 I1 ≥3-org-distinct preserved (anthropic + shanraisshan + W330-codex + W331-Stream-B)

## §4 Closure

Both repos formally RETIRED from W331+ SOTA-tracking scope as of this commit. Per /goal P0.5 mandate, this document satisfies the literal "Retire ..." requirement.

W331 wave-close DONE: codex round-2 retrospective APPROVE @ 0.91 (commit 110fea9) + WAVE-CLOSURE certificate (507cec1).
