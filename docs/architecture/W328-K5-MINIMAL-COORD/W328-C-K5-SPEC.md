# W328 Stream-C — K-5 Minimal Coordination Spec

> **Wave**: W328 Stream-C (K-5, sequenced earlier per codex round-14)
> **Date**: 2026-05-19
> **HEAD baseline**: `6ee7ea4`
> **Scope**: Spec the minimum-viable inter-stream coordination pattern that defeats the silent-serial / orphan-stream / race-merge anti-patterns observed at W320 and W326. NO settings/skills/code modifications — doc-only spec; W329+ implements.
> **Predecessor**: W327-D-4-SEQUENCED-W328-W330-PLAN.md (K-5 moved from W329→W328 per codex round-14 Axis 2 R-2).

---

## §1 Problem statement

Two production-witnessed race patterns motivated K-5:

1. **W320-codex-r1**: settings.json M6 PreCompact + PWF flip falsely claimed APPLIED in a child wave commit; the change actually landed in parallel-session W324 commit `8e43c24`. Streams were not coordinating ownership of `.claude/settings.json`.

2. **W326-codex-r1**: SKILL.md §7 math fix falsely claimed APPLIED in a child wave commit; the change actually landed in parallel-session W325 commit `e1a7ec6`. Streams were not coordinating ownership of `.claude/skills/sota-convergence-audit/SKILL.md`.

Both races share a structural cause: **no per-wave shared ledger of stream owner + ETA + status**, so two streams independently believed they owned a target file. The provenance-lint hook (W327-C, K-8) is **detective** — catches the race at commit. K-5 is **preventive** — surfaces the conflict before either stream begins writing.

The minimum-viable form is a docket-style markdown file per wave, written by the dispatch agent at fan-out, updated by each stream owner on entry / mid-stream / completion. No daemon, no IPC, no inter-process locks; just a single human-readable file each stream reads before writing.

---

## §2 Minimum-viable artifact: `DOCKET.md`

### §2.1 Location
```
docs/architecture/W<N>-WAVE/DOCKET.md
```

Where `<N>` is the wave number. (For waves that already use a more specific subdir naming like `W328-K5-MINIMAL-COORD`, the DOCKET.md lives at the wave-root `docs/architecture/W328-WAVE/DOCKET.md` — one per wave, not one per K-N.)

### §2.2 Schema (markdown table, append-only rows)

```markdown
# W<N> DOCKET (parallel-stream ownership ledger)

> **Wave**: W<N>
> **Dispatch HEAD**: <sha>
> **Stream count**: <n>
> **Owner of this docket**: dispatch-agent at fan-out; each stream owner updates own row.

| Stream | K-N | Owner | Files owned (write-scope) | ETA | Status | Last update | Notes |
|---|---|---|---|---|---|---|---|
| A | K-1 | Stream-A | `.claude/settings.json:env`, `tools/insights-wireup/` | 90m | DISPATCHED | 2026-05-19T14:00Z | — |
| B | K-2 | Stream-B | `tools/otel-wiring/` | 60m | DISPATCHED | 2026-05-19T14:00Z | — |
| C | K-5+K-8 | Stream-C | `docs/architecture/W328-K{5,8}-*/`, `docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/` | 50m | IN-PROGRESS | 2026-05-19T14:30Z | provenance-lint test all PASS |
| D | K-7 | Stream-D | `.claude/skills/ops-rhythm/SKILL.md` | 45m | DISPATCHED | 2026-05-19T14:00Z | — |
| E | K-NEW | Stream-E | `tools/wsl2-pivot-eval/` | 75m | DISPATCHED | 2026-05-19T14:00Z | — |
```

### §2.3 Status vocabulary (closed set)

- `DISPATCHED` — dispatch-agent has fired the stream; stream may not yet have started.
- `IN-PROGRESS` — stream owner has read DOCKET.md, claimed the row, started work.
- `BLOCKED <reason>` — stream cannot proceed; reason cite-anchored.
- `COMPLETE` — stream wrote synthesis doc + committed.
- `RETIRED <reason>` — stream cancelled before completion.

A stream MUST set `IN-PROGRESS` before its first Write/Edit to any file in its declared write-scope. A stream MUST set `COMPLETE` only after its final commit.

### §2.4 File-ownership rule (the load-bearing invariant)

A file path may appear in the `Files owned (write-scope)` column of **at most one** non-RETIRED row at any time. If two streams need to write the same file, the dispatch-agent MUST either:

(a) merge the two streams into one (`Stream A+B combined`),
(b) sequence them (one row `COMPLETE` before the other starts), or
(c) partition the file at a structural boundary (e.g. distinct keys in settings.json) and document the partition.

The provenance-lint hook (K-8) catches violations that escape this; K-5 prevents them.

### §2.5 Update semantics

- **Append-only for rows** — never delete a row; mark RETIRED if cancelled.
- **In-place updates for own row** — each stream owner updates Status + Last update + Notes column.
- **No global lock** — race on DOCKET.md edits is acceptable because each stream only mutates its own row; concurrent edits to different rows merge cleanly (`git merge --strategy=ours` / `--strategy-option=patience` works for table-row mutations).

---

## §3 Per-stream owner stamping

Each stream's final synthesis doc (`STREAM-<X>-SYNTHESIS.md` or equivalent) MUST contain a stamp block at the top:

```markdown
> **Owner**: Stream-<X> (<dispatch-agent-handle>)
> **Wave**: W<N>
> **K-N covered**: K-<...>
> **Files written**: <list, must match docket Files-owned column>
> **DOCKET.md cross-ref**: docs/architecture/W<N>-WAVE/DOCKET.md row Stream-<X>
> **HEAD at dispatch**: <sha>
> **HEAD at completion**: <sha>
```

This stamp is **machine-readable** (sca-v11+ can lint for stamp presence + DOCKET cross-ref consistency).

---

## §4 Per-K-N owner stamping

Independent of per-stream stamps, each K-N concern (per W326-D K-1 through K-8) gets a per-K-N stamp in the deliverable that closes it:

```markdown
> **K-N**: K-5 (minimal coordination)
> **State**: SPEC-COMPLETE (W328-C) / IMPL-PENDING (W329)
> **Source concern**: docs/architecture/W326-GPT55-DEEP-AUDIT/W326-D-...md §K-5
> **Owner stream(s)**: W328-C (spec), W329-? (impl)
> **Composite-lift δ projected**: +0.02 to +0.04 (codex round-14 range)
```

This lets the W331+ composite-score audit walk all 8 K-N stamps + read state + read owner + read lift, without needing to crawl an exploded multi-wave history.

---

## §5 Anti-pattern catalog

The three anti-patterns observed in production:

### §5.1 Silent-serial

**Definition**: dispatch-agent fires N streams in N separate assistant messages instead of N tool-calls in 1 message. Result: each stream executes serially even though they were dispatched as "parallel."

**Symptom**: W312-D audit measured 29% silent-fallback across 1586 JSONLs.

**Detection** (now): grep agent-team JSONL for two adjacent assistant turns each containing exactly 1 Agent tool-call within a wave session.

**Prevention** (K-5): the dispatch-agent's pre-dispatch checklist requires "2+ Agent calls in 1 message" — enforced by the `parallel-dispatch-mandate` skill auto-fire (W312-D). DOCKET.md does not directly prevent this but makes it observable post-hoc (compare DOCKET dispatch timestamp to JSONL timestamps).

### §5.2 Orphan-stream

**Definition**: a stream is dispatched but never lands a synthesis doc or commit. May be because the agent crashed, hit a tool-error, or simply lost track of its goal.

**Symptom**: DOCKET.md row stays at `DISPATCHED` past the ETA + grace window.

**Detection**: dispatch-agent (or operator) runs `grep DISPATCHED docs/architecture/W<N>-WAVE/DOCKET.md` after the wave's expected duration; any matches are orphan candidates.

**Prevention**: each stream owner sets `IN-PROGRESS` early (within first 5 min); long gap from DISPATCHED → IN-PROGRESS surfaces the orphan before it consumes the whole wave budget.

### §5.3 Race-merge

**Definition**: two streams independently write to the same file; whichever commits last wins; the first stream's commit either gets lost (if both wrote different content) or is silently duplicated (if both wrote similar content). The W320 and W326 production races are both race-merges.

**Symptom**: synthesis doc claims a file was APPLIED but `git log -p <file>` shows the change in a different parallel commit.

**Detection** (post-hoc): W327-C provenance-lint hook (K-8). Catches at commit-msg stage.

**Prevention** (K-5): DOCKET.md §2.4 file-ownership rule. The dispatch-agent commits to a single owner per file at dispatch time, so no two streams ever see the same file in their write-scope column.

---

## §6 Cite anchors (3-org-distinct, EXTERNAL-DOMINANT)

Per W295 §6.2 anti-bias gate. Three disjoint authoring organizations:

### §6.1 Atlassian Kanban WIP-limit + class-of-service docs (Atlassian Pty Ltd)

URL: https://www.atlassian.com/agile/kanban/wip-limits

Pattern borrowed: a single visual board (Kanban) where each column represents a workflow state and each card carries an owner + ETA + class-of-service. The DOCKET.md table is a degenerate-to-markdown Kanban board with five status columns (`DISPATCHED / IN-PROGRESS / BLOCKED / COMPLETE / RETIRED`). Atlassian's WIP-limit guidance maps to W295 ~3-parallel-session cognitive cap (CLAUDE.md §Parallel-session safety).

Org-distinct evidence: Atlassian is an Australian SaaS company; not a Linux Foundation member; not Google.

### §6.2 Google SRE Workbook chapter 24 ("Distributed Periodic Scheduling with Cron") (Google LLC)

URL: https://sre.google/workbook/distributed-periodic-scheduling/ (also published in print: O'Reilly 2018, ISBN 978-1492029502)

Pattern borrowed: leader-election + per-job locking + lease-with-timeout. K-5 minimal coordination uses a degenerate form: the dispatch-agent acts as the leader (writes the DOCKET row at fan-out, claiming the ownership), and each stream's `IN-PROGRESS` stamp acts as a self-renewed lease. ETAs are the equivalent of lease timeouts; missing the ETA surfaces an orphan-stream (§5.2).

Note (W327-D §11 cite mentioned ch.20 / ch.24): the cron coordination chapter is the canonical fit for the parallel-stream lease pattern. SRE Workbook ch.20 ("Managing Load") is about graceful degradation, not coordination — using ch.24 for K-5 spec.

Org-distinct evidence: Google LLC. Not Atlassian; not Spotify.

### §6.3 Spotify Guild Model + Squad Health Check (Spotify AB)

URL: https://engineering.atspotify.com/2014/03/squad-health-check-model/ (Spotify Engineering Blog) + Henrik Kniberg + Anders Ivarsson "Scaling Agile @ Spotify" whitepaper (2012).

Pattern borrowed: cross-squad coordination via lightweight ceremonies (chapter / guild) rather than heavyweight Gantt charts. K-5 DOCKET.md is the lightweight-ceremony analog: streams synchronize via a single shared artifact (the docket) rather than via a coordination daemon (heavyweight). Spotify's "Aligned Autonomy" principle maps to W269/W312-D parallel-dispatch mandate: streams have autonomy WITHIN their declared write-scope, but the dispatch-agent aligns the write-scopes BEFORE any stream begins.

Org-distinct evidence: Spotify AB, Swedish music streaming company. Not Atlassian; not Google.

### §6.4 Distinctness verification table

| Anchor | Authoring org | Domain | Used for |
|---|---|---|---|
| §6.1 | Atlassian Pty Ltd (AU SaaS) | Visual workflow boards | DOCKET.md status-column schema (§2.3) |
| §6.2 | Google LLC (US tech) | Distributed scheduling primitives | Lease-with-timeout via ETA + IN-PROGRESS stamp (§5.2) |
| §6.3 | Spotify AB (SE streaming) | Lightweight coordination ceremonies | Single-artifact-shared coordination vs daemon (§3 + §5.3) |

Three orgs, three domains, zero overlap. Per W295 §6.2: EXTERNAL-DOMINANT for all three.

---

## §7 Implementation effort (NOT this stream)

This stream produces the SPEC only. Implementation effort breakdown for W329+:

| Task | Effort | Wave |
|---|---|---|
| Dispatch-agent template prepends DOCKET.md write-step before first Agent call | S (~30 min) | W329 |
| Per-stream entry checklist: read DOCKET, set IN-PROGRESS, write own row | S (~15 min × N streams) | W329 |
| Per-stream exit checklist: stamp synthesis doc, set COMPLETE | S (~10 min × N streams) | W329 |
| sca-v11 lint pass: stamp presence + DOCKET cross-ref consistency | M (~60 min) | W329 |
| Migration of existing W326-A through W327-D synthesis docs to retroactively add stamps | M (~90 min, one-time) | W329 |
| Operator-facing tooling: `tools/docket/list-orphan-streams.ps1` (greps DOCKETs for past-ETA DISPATCHED rows) | S (~30 min) | W330 |

Total: ~3-4 hours W329 + ~30 min W330 tooling. Composite-lift δ projection per codex round-14: **+0.02 to +0.04** (NOT load-bearing but reduces silent-serial measurement variance + reduces race-merge incident rate from 2 in 7 waves to projected 0 in 7 waves).

---

## §8 Non-goals (explicit)

K-5 minimal coordination does **NOT**:

- Replace the `parallel-dispatch-mandate` skill (which prevents silent-serial — §5.1).
- Replace the provenance-lint hook (which catches race-merge at commit — §5.3 detection).
- Introduce a coordination daemon, message bus, or IPC.
- Require any settings.json change.
- Require any new MCP server or plugin.
- Lock files at the filesystem level.

K-5 is **minimal**: a single markdown file per wave, three required actions per stream (read at entry / stamp IN-PROGRESS / stamp COMPLETE), three anti-patterns named.

---

## §9 Why not more?

Codex round-14 R-2 explicitly noted: "K-5 minimal coordination should move from W329 to W328 because it is **prerequisite to safe parallel dispatch** in W329's larger 5-stream agent-teams plan." The temptation is to spec a full coordination protocol (leader election, lease-renewal, conflict detection daemon, etc.) — that is W330+ territory. For W328's needs, the docket-and-stamp pattern is sufficient because:

1. The race-merge anti-pattern (§5.3) is **the only** load-bearing failure mode (two production occurrences W320 + W326). Other anti-patterns are observable but not yet shipping-blockers.
2. The total stream count per wave is ≤5 (W327-D-4 §3); a 5-row markdown table is trivially human-readable.
3. The dispatch-agent already writes a synthesis doc; adding a docket-row write is a ~5-line addition to its template.
4. Migration cost is contained: existing waves keep working as-is; new waves opt in.

If W329 implementation surfaces a fourth anti-pattern, K-5-v2 can extend the spec. For now, minimal wins.

---

## §10 Status stamp for this spec

> **K-N**: K-5 (minimal coordination)
> **State**: SPEC-COMPLETE (W328-C)
> **Source concern**: docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md §K-5 + STREAM-D-SYNTHESIS.md §3 + §7
> **Owner stream(s)**: W328-C (spec), W329-? (impl), W330-? (tooling)
> **Composite-lift δ projected**: +0.02 to +0.04 (codex round-14 range)
> **Files written by this stream**: this spec + W328-C-SYNTHESIS.md + K-8 deliverable
> **DOCKET.md cross-ref**: docs/architecture/W328-WAVE/DOCKET.md row Stream-C (to be written when retrofit lands W329)
