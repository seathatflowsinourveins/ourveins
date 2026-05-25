# W344 /goal — paste-ready (≤3800 chars)

> **Authored**: 2026-05-20 via `goal-prompt-synthesis` skill discipline post-W343 wave-close.
> **Codex META-AUDIT r3**: dispatched as background `task-mpekyy8q-1fic09` — verdict incorporates into refined /goal when returns.
> **Source-of-truth**: external SOTA convergence + W343 W342 W340 verdict-ledger; codex r2 APPROVED 7.8/10 wave-close; W343 autonomous-portion 100% closed.

---

## Paste-ready /goal

```
/goal W344 — Post-W343 wave-close continuation; 10/13 W343 priorities CLOSED autonomously (P0a/P0b/P0c/P1/P2/P3/P4a/P4b-pt2/P4c/Q10a); SLSA-L3 workflow EXERCISED via W343-closure-2026-05-20 tag push (run 26191025896: 5/6 jobs ✓). Branch: rebase main; parallel `git worktree add Z:\claude-sota-installed-W344 W344` (linear; --force-with-lease --force-if-includes; ~3-cap W280d).

FRONTIER (Pareto §5.5):
P0 — OPERATOR-SIGN closure (carried from W343, cannot autonomous):
(a) Q9 Step 1 Langfuse key rotation at http://127.0.0.1:3000 admin UI (probed: NO API rotation endpoint; UI-only) → then autonomous Step 2-3 vault-migration (W341 Q9-MIGRATION-SCRIPT.md ready)
(b) Q10b GitHub branch-protection decision: GitHub Pro upgrade ($) OR public-repo flip OR accept-current-state with local-only pre-commit gates
(c) P4(b) Part 1 SHA-pin policy: tag-pin (@v2.0.0; parallel-process current) vs 40-char SHA-pin (5a775b367a56d5bd118a224a811bba288150a563; SOTA-2026 CR-1(a))

P1 — SubagentStop instrumentation-shim (W342 P2 Probe-2 carry): ~30 LOC append-only JSONL at tools/subagent-stop-audit.mjs; env-override SUBAGENT_STOP_AUDIT_DIR; fail-silent; CR-2 ≤2KB. Enables 7-day false-positive ≤1% measurement.

P2 — SigNoz OTLP backend (W342 Stream B Phase 1.6): Apache-2.0 unified metrics+logs+traces; docker compose at Z:\claude-hub\observability\signoz\; metrics/logs exporters point at signoz (langfuse traces-only). sca-v15 T2-INSTALL.

P3 — claudekit Hook Metadata + Zod getHookConfig<T>() (W342 Stream D #3, 5hr): NEW .claude/skills/hook-metadata-discipline/SKILL.md. 3-org-distinct: claudekit + Zod + Anthropic hook-payload schema.

P4 — claudekit transcript-marker stateless loop-guard (W342 Stream D #5, 4hr): NEW SKILL.md. CR-4 path-gated.

P5 — karpathy-guidelines extension (W342 Stream D #4, 3hr): Think-Before-Coding + Simplicity-First + Goal-Driven per andrej-karpathy-skills T2-VENDOR-FORK 4.5.

P6 — LICENSE-clarification at disler upstream + survey CR-2-compliant observability alts (simple10/agents-observe + OTEL-Collector+Grafana + Logfire/Langfuse-app-level).

OPERATOR-SIGN: see P0 (Q9 + Q10b + P4(b) Part 1 SHA-pin)
DEFER W345+: codex META-AUDIT r3 findings (background task-mpekyy8q-1fic09) when returns; full addyosmani 22-skill upgrade (per Stream E sca-v15); selective mattpocock sync (5 new skills); retire alirezarezvani/claude-skills (per W330 codex axis-2 §3.2)

MANDATES (inherited from W343):
- Parallel-dispatch (W269): 2+ Agent/msg; audit default = 4-stream Orchestrator-Worker.
- Δ-G49/G50: worker non-empty OR NO-FINDINGS; exception → FAILED+escalate; no silent exit-0.
- CR-6: every DONE claim cites probe; FQN `<plugin>:<agent>` (general-purpose lone bare); F5 ambiguity-WARN on 13 colliding bare.
- Cross-model gate (§6.2): codex task --effort high BEFORE compose ship; APPROVE required; BLOCK fail-CLOSED if codex unavailable.

REPORT/SHIP: sca-v15 §10 verdict-ledger per install/skill-author; Codex-Verdict APPROVE trailer (W335); pre-commit gitleaks+ruff+actionlint+commitlint+cr2-2kb+codex-trailer+provenance-lint+bare-subagent-grep+npm-audit.

STOP-gate: CLAUDE.md ≤50 LOC; .claude/hooks/ ≤2KB single shim; self_invented_count:0; CR-4.

COUNTERFACTUAL (Δ-G51): IF SigNoz upstream relicensed THEN metrics+logs ingest STILL preserved BECAUSE Grafana Loki + OTEL Collector independent stack (Apache-2.0, predates SigNoz, no SigNoz dependency). ORG/CAUSAL/TEMPORAL all distinct.
```

## Char count

To verify: above /goal block should be ≤3800 chars. Auto-check via PowerShell pattern from goal-prompt-synthesis §4.

## Compaction recommendation

**YES** — `/compact` between W343 and W344. Session has crossed W340→W343 4 wave-closures with ~12 commits + 8 deep-audit Agent runs + 10+ codex review rounds. Context is heavy. Compaction will:
- Preserve W343 wave-close summary
- Drop intermediate verbose tool outputs
- Refresh context-budget for W344 work

Operator action: paste `/compact W343 wave-close — preserve commit chain 9993945→46d6102 + W343-closure-2026-05-20 tag + OPERATOR-SIGN-W343.md as next-session anchor` into CC prompt.

## Provenance

- Wave: W344 (carry-forward post-W343 closure)
- Source families: ≥6 (sca-v15 §1; W342 Stream B+D + W343 P2 Probe-2 + codex r2/r3 verdicts)
- Inverse test: PASS (criteria sourced from external — Apache-2.0 SigNoz + claudekit + karpathy + Anthropic cookbooks; not this runtime's current shape)
- Triadic decomposition: Planner (codex r3) / Researcher (Streams B+C dispatched, blocked-this-turn) / Reporter (this synthesizer)
- Codex r3 verdict: pending (background task-mpekyy8q-1fic09)

## Persist

Per W295-codex-r13: do NOT auto-persist to T6 basic-memory (secret-redaction gate). Operator opt-in via "persist this /goal" / "save to mem-recall" / "T6 it" — destination `goal-prompts/W344-post-w343-continuation.md`.

---

*Next session: paste the /goal block. Codex r3 result feeds in via `gh run view` or codex-result polling. Streams B+C re-dispatch in fresh session post-compaction.*
