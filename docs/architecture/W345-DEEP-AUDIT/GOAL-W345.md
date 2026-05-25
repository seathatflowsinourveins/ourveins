# W345 /goal — paste-ready (≤3800 chars)

> **Authored**: 2026-05-20 via `goal-prompt-synthesis`. Sources: 4-stream audit (A=arch / B=2026-Q2 SOTA / C=verdict-ledger / D=META-AUDIT r3 retrieval) + verified live probes.
> **Carries**: W344-batch1-5-closure tag @ 52378ac (5/9 LANDED + codex r2 APPROVE).

---

## Paste-ready /goal

```
/goal W345 — Post-W344 wave-close. Audit: 18 open priorities + 9 operator-sign dwell-aged + 3 top SOTA candidates (MAF 1.0 / claude-cookbooks Managed Agents / inspect_ai+MAT arxiv 2603.18096) + Langfuse-extend T0 DISCONFIRMED (HTTP probe: /v1/logs=404 /v1/metrics=401 no-dashboard) + META-AUDIT r3 task phantom (never registered per Stream D). Branch: rebase main; worktree `Z:\claude-sota-installed-W345 W345` linear --force-with-lease --force-if-includes (W280d ~3-cap).

FRONTIER (Pareto §5.5):

P0 — OPERATOR-SIGN clearance batch (9 dwell-aged per Stream C):
(a) Q9 Langfuse rotation Step 1 UI@:3000 (dwell 5w SHIP-BLOCK); Steps 2-3 ready
(b) Q10b GitHub Pro / public-flip / accept (dwell 5w SHIP-BLOCK)
(c) P4(b) Part 1 SHA-pin `5a775b367a56d5bd118a224a811bba288150a563` vs `@v2.0.0` (dwell 3w ESCALATE)
(d) alirezarezvani Stage-2 marketplace-delete (dwell 8+w → -0.5 composite-arch penalty)
(e) P2 SigNoz Options A/B/C/D (W344 carry)
(f) Q-P6.1 AGPL-3.0 accept for Loki/Tempo/Mimir
(g) Q-P6.3 disler issue #6 +1 / silent

P1 — Telemetry-gap PIVOT (Langfuse-extend DISCONFIRMED): T2 Logfire OSS self-host docker-compose probe first (Q-P6.2 autonomous); if FAIL → T1 OTel-Collector+Grafana stack (needs Q-P6.1); else accept traces-only.

P2 — claude-cookbooks Managed Agents pattern-extraction (Stream B#2): vendor-fork Dreaming + Outcomes + Memory → new local skills. 3-org-distinct: claude-cookbooks + Anthropic + 1 prior-art per pattern.

P3 — SOTA cite-refresh batch (Stream B#1 surgical): agent-budget-discipline autogen v0.4 → microsoft/agent-framework v1.0 GA MIT 10.6k★ 2026-04-03; checkpoint-resume langgraph v0.x → v0.4 HITL.

P4 — inspect_ai SWE + MAT-contract vendor-fork (Stream B#3): extend harness/eval_harness.py inspect_ai lane (UKGovernmentBEIS MIT 2099★); vendor-fork arxiv 2603.18096 (Paduraru et al.) MAT per-step-contract → Δ-G49/G50/G51 governance.

P5 — Verdict-ledger drift cleanup (Stream C+D): drop META-AUDIT r3 task-mpekyy8q-1fic09 (Stream D: never registered, redundancy-gate covered by W344 r1+r2 APPROVE); close W340 F2/F3 + W342 CF-9/CF-11 IMPLICITLY-CLOSED; archive.

P6 — alirezarezvani Stage-2 prep autonomous-only: `rm -rf .claude/plugins/cache/claude-code-skills/` script + 7-day rollback gate doc + post-retire verification probe. Execute requires operator-sign (P0-d).

DEFER W346+: parallel_ratio 7d re-measure post bd25142; W342 CF-12; W343 R4 false-acquit; ECC load_failure dive; basic-memory path-drift; OPTIONAL re-dispatch META-AUDIT r3 with correct companion-call (low priority — r1+r2 cover).

MANDATES (W344 inherited):
- W269 parallel: 2+ Agent/msg; audit default 4-stream
- Δ-G49/G50/G51: non-empty OR NO-FINDINGS; exception→escalate; counterfactual per /goal
- CR-6 verify-before-claim; F5 ambiguity-WARN on 13 colliding bare names
- FQN `<plugin>:<agent>` (general-purpose lone bare)
- Cross-model gate W335: codex r1+r2 round-N; APPROVE required; BLOCK fail-CLOSED

REPORT/SHIP: sca-v15 §10 ledger; Codex-Verdict trailer (BOOTSTRAP pre-r1, APPROVE post); pre-commit 9-gate

STOP-gate: CLAUDE.md ≤50 LOC; .claude/hooks/ ≤2KB single shim; self_invented_count:0; CR-4

COUNTERFACTUAL (Δ-G51): IF claude-cookbooks Managed Agents deprecated THEN Dreaming/Outcomes/Memory pattern-extraction STILL preserved BECAUSE microsoft/agent-framework v1.0 GA (MIT Microsoft) + langgraph v0.4 (MIT LangChain) + inspect_ai (MIT UK Gov BEIS) independent triad covers handoff+checkpoint+governance. ORG/CAUSAL/TEMPORAL distinct.
```

## Char count

Validate: extract code-block content + `wc -c`. Target ≤3800.

## Provenance

- Wave: W345 (continuation post-W344)
- Sources ≥7: Streams A/B/C/D + live HTTP probes + W344-W340 ledger reconcile + codex r2 APPROVE + arxiv non-GH anti-bias
- Inverse test: PASS (criteria external — MAF 1.0 + claude-cookbooks + inspect_ai + arxiv 2603.18096)
- Triadic: Planner=synthesizer / Researcher=A+B+C+D parallel / Reporter=verdict-ledger reconciliation
- Stream D verdict on META-AUDIT r3 phantom: NEVER REGISTERED → r1+r2 APPROVE supersede

## Persistence

Per W295-codex-r13: NO auto-persist. Operator opt-in: "persist this /goal" / "T6 it" → `goal-prompts/W345-post-w344-continuation.md`.

---

*Next session OR continue here: paste the /goal block above. Codex r1+r2 round-N fires post-batch-1.*
