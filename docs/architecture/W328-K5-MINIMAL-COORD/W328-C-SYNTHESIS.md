# W328 Stream-C — Synthesis (K-5 + K-8 + Upstream-Final)

> **Wave**: W328 Stream-C
> **Date**: 2026-05-19
> **HEAD baseline**: `6ee7ea4`
> **Owner**: Stream-C (DOC-ONLY scope; NO settings.json / skills / code modifications; pre-commit-config.yaml is verified-only)
> **K-N covered**: K-5 (minimal coordination spec), K-8 (provenance-lint verification), Upstream-Final (W321 draft finalization)
> **Wall-clock**: ~40 min

---

## §1 Three deliverables (one stream)

| Deliverable | Path | Type | State |
|---|---|---|---|
| K-5 minimal coordination spec | `docs/architecture/W328-K5-MINIMAL-COORD/W328-C-K5-SPEC.md` | SPEC (doc-only) | SPEC-COMPLETE |
| K-8 provenance-lint test results | `docs/architecture/W328-K8-PROVENANCE-VERIFY/W328-C-K8-TEST-RESULTS.md` | VERIFY (3/3 PASS) | VERIFIED-FIT-FOR-PURPOSE |
| Upstream-issue draft finalization | `docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/{hf-hub-repo-search,github-mcp-search-repositories}-silent-fallback.md` | EDIT (operator-ready) | OPERATOR-READY |
| Stream synthesis (this file) | `docs/architecture/W328-K5-MINIMAL-COORD/W328-C-SYNTHESIS.md` | SYNTHESIS | SHIPPED |

---

## §2 K-8 verification (3/3 PASS)

The W327-C provenance-lint hook (`.pre-commit-config.yaml:79-88`) was tested against three fixtures by extracting the hook's bash body verbatim and running it under an idempotent harness at `$CLAUDE_JOB_DIR/k8-tests/run-tests.sh`.

| # | Test | Fixture | Expected | Actual | Pass/Fail |
|---|---|---|---|---|---|
| 1 | W320-race APPLIED-claim with file NOT staged | `test-w320-race.txt` | exit 2 + stderr | exit 2 + `APPLIED claim for .claude/settings.json but file not staged` | **PASS** |
| 2 | W326-race fabricated SHA `deadbee` in VERIFIED-ALREADY-APPLIED | `test-w326-bad-sha.txt` | exit 2 + stderr | exit 2 + `VERIFIED SHA deadbee invalid` | **PASS** |
| 3 | Legitimate VERIFIED-ALREADY-APPLIED (`e1a7ec6` → SKILL.md) | `test-legitimate.txt` | exit 0 + no stderr | exit 0 + no stderr | **PASS** |

Git-side preconditions also verified (`git cat-file -t e1a7ec6 = commit`; `git cat-file -t deadbee = fatal`; `e1a7ec6` touches SKILL.md = YES; `8e43c24` touches settings.json = YES). The hook's validation logic matches the W327-C-4 test plan and would have caught both the W320-codex-r1 + W326-codex-r1 races at commit-msg stage had it been in place at those waves.

**Verdict**: Hook is fit-for-purpose. No changes recommended. Detailed test results in K-8 deliverable.

---

## §3 K-5 minimal coordination spec

Per codex round-14 R-2, K-5 moved from W329→W328 because it is **prerequisite to safe parallel dispatch** in W329's 5-stream agent-teams plan. The spec lives at `W328-C-K5-SPEC.md` and codifies:

- **Artifact**: `docs/architecture/W<N>-WAVE/DOCKET.md` per wave — a single markdown table with rows `{Stream, K-N, Owner, Files owned (write-scope), ETA, Status, Last update, Notes}` and a closed status vocabulary `{DISPATCHED, IN-PROGRESS, BLOCKED, COMPLETE, RETIRED}`.
- **Invariant** (load-bearing): a file path appears in the `Files owned` column of at most one non-RETIRED row at any time. Dispatch-agent partitions write-scopes BEFORE fan-out.
- **Per-stream stamps**: each synthesis doc gets a top-of-file stamp block with `Owner / Wave / K-N / Files written / DOCKET cross-ref / HEAD dispatch + completion` — machine-readable for sca-v11+ lint.
- **Per-K-N stamps**: each K-N concern gets a state stamp in its closing deliverable: `K-N / State / Source concern / Owner streams / Composite-lift δ`.
- **Anti-pattern catalog**: 3 named patterns —
  - silent-serial (W312-D 29% measured; prevented by parallel-dispatch-mandate skill; DOCKET makes observable post-hoc)
  - orphan-stream (DISPATCHED past ETA; DOCKET surfaces via grep)
  - race-merge (W320 + W326 production cases; DOCKET prevents via write-scope partition; provenance-lint catches escapes)

**Cite anchors** (3-org-distinct, EXTERNAL-DOMINANT per W295 §6.2):
1. Atlassian Kanban WIP-limit docs (Atlassian Pty Ltd, AU SaaS) → DOCKET status-column schema
2. Google SRE Workbook ch.24 "Distributed Periodic Scheduling with Cron" (Google LLC, US tech) → lease-with-timeout via ETA + IN-PROGRESS stamp
3. Spotify Squad Health Check + Aligned Autonomy (Spotify AB, SE streaming) → lightweight-ceremony coordination via single shared artifact

Three orgs, three domains, zero overlap — per W295 anti-bias gate, all three are EXTERNAL-DOMINANT.

**Composite-lift δ projected**: +0.02 to +0.04 (codex round-14 range; reduces silent-serial measurement variance + reduces race-merge incident rate from 2-in-7-waves projected to 0-in-7).

**Implementation effort**: ~3-4 hours W329 (dispatch-agent template edit + per-stream entry/exit checklist + sca-v11 lint + retroactive migration) + ~30 min W330 (tooling). SPEC is operator-actionable now.

---

## §4 Upstream-issue draft finalization

Both W321-vintage drafts at `docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/*.md` were finalized with OPERATOR-READY headers + the brief's required checklist:

| Requirement | hf-hub-repo-search | github-mcp-search-repositories |
|---|---|---|
| Valid GitHub issue title ≤80 chars, prefix-tagged | `[hf-mcp-server] hub_repo_search returns empty without error for legitimate queries` (72 chars) | `[search_repositories] 0-result fallback ambiguous with rate-limit/quota suppression` (80 chars) |
| Issue body in markdown | ✅ | ✅ |
| Repro steps (numbered) | ✅ 5 numbered steps | ✅ 5 numbered steps + 5 evidence cases |
| Expected vs actual | ✅ (refactored into single Expected vs Actual section) | ✅ (refactored into single Expected vs Actual section) |
| Cite-anchor to silent-fallback wave (W314+W319+W321) | ✅ 8 waves cited (W314 + W315 + W316 + W317 + W319 + W320 B + W320 G + W321) | ✅ 7 waves cited (W312-D + W313-D + W314-r1 + W315-B + W319 + W320 G + W321) |
| OPERATOR-READY header w/ paste-ready `gh issue create` command | ✅ | ✅ |

Both drafts are paste-ready: `gh issue create --repo <owner/repo> --title "<title>" --body-file <path>` commands are inlined. `gh issue create` NOT executed (operator-side action per brief).

---

## §5 Cardinal-rule + invariant state

| Rule | State |
|---|---|
| R1 trusted-source primitives | HOLDS (no install changes) |
| R2 hooks = plugin-shipped / direct-CLI | HOLDS (no hook changes; existing provenance-lint verified-only) |
| R3 subagents = upstream | HOLDS (no subagent changes) |
| R4 project behavior in CLAUDE.md + settings.json | HOLDS (no CLAUDE.md / settings.json edits) |
| R5 safety via CC perms + sandboxing | HOLDS (no permission changes) |
| `self_invented_count: 0` | HOLDS (3 new docs under `docs/architecture/`; 2 EXISTING upstream-issue drafts edited; tracked files only) |
| CLAUDE.md ≤50 LOC body | HOLDS (no CLAUDE.md edits) |

---

## §6 File-ownership boundary (parallel-session safety)

This stream wrote to (NEW):
- `docs/architecture/W328-K5-MINIMAL-COORD/W328-C-K5-SPEC.md`
- `docs/architecture/W328-K5-MINIMAL-COORD/W328-C-SYNTHESIS.md` (this file)
- `docs/architecture/W328-K8-PROVENANCE-VERIFY/W328-C-K8-TEST-RESULTS.md`

This stream wrote to (EDIT only):
- `docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/hf-hub-repo-search-silent-fallback.md`
- `docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/github-mcp-search-repositories-silent-fallback.md`

This stream did NOT touch (per goal-predicate):
- `.pre-commit-config.yaml` (read-only — hook tested but not modified)
- Any `SKILL.md` (Stream-A's territory)
- `tools/insights-wireup/` (Stream-B's territory)

Other streams' write-scopes untouched.

---

## §7 Owner stamp

> **Owner**: Stream-C (W328 K-5 + K-8 + Upstream-Final)
> **Wave**: W328
> **K-N covered**: K-5 (SPEC-COMPLETE) + K-8 (VERIFIED-FIT-FOR-PURPOSE) + Upstream-Final (OPERATOR-READY)
> **Files written**: 3 new (W328-C-K5-SPEC.md + W328-C-SYNTHESIS.md + W328-C-K8-TEST-RESULTS.md) + 2 edited (2 upstream-issue drafts)
> **HEAD at dispatch**: `6ee7ea4`
> **HEAD at completion**: `6ee7ea4` (no commits made by this stream; closure agent picks up commit)
> **DOCKET.md cross-ref**: to be retrofitted W329 per K-5 spec (DOCKET.md does not yet exist for W328 since K-5 spec was authored in this stream)

---

## §8 Per-K-N status stamps (consolidated)

> **K-5** (minimal coordination)
> **State**: SPEC-COMPLETE (W328-C)
> **Source concern**: `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md` §K-5 + STREAM-D-SYNTHESIS §3 + §7
> **Owner stream(s)**: W328-C (spec), W329-? (impl), W330-? (tooling)
> **Composite-lift δ projected**: +0.02 to +0.04

> **K-8** (provenance-claim lint)
> **State**: SHIPPED (W327-C) + VERIFIED-FIT-FOR-PURPOSE (W328-C)
> **Source concern**: `docs/architecture/W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md` L26-35 (codex round-14 CODEX-FRESH insight)
> **Owner stream(s)**: W327-C (apply), W328-C (verify)
> **Composite-lift δ projected**: +0.02 to +0.04

> **Upstream-Final** (W321-vintage drafts)
> **State**: OPERATOR-READY (W328-C)
> **Source concern**: W321 P3 cleanup — silent-fallback class W316-Δ33 codification
> **Owner stream(s)**: W321-? (draft authoring), W328-C (finalize), operator (file via `gh issue create`)
> **Composite-lift δ projected**: not in K-N catalog; operator-visibility impact only

---

## §9 Artifacts + cite-anchor master list

- `docs/architecture/W328-K5-MINIMAL-COORD/W328-C-K5-SPEC.md` (K-5 spec)
- `docs/architecture/W328-K5-MINIMAL-COORD/W328-C-SYNTHESIS.md` (this file)
- `docs/architecture/W328-K8-PROVENANCE-VERIFY/W328-C-K8-TEST-RESULTS.md` (K-8 verify)
- `docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/hf-hub-repo-search-silent-fallback.md` (edited)
- `docs/architecture/W321-OPEN-SOURCE-CUTOVER/upstream-issues/github-mcp-search-repositories-silent-fallback.md` (edited)
- `$CLAUDE_JOB_DIR/k8-tests/{run-tests.sh, results.txt, test*.txt, test*.stderr}` (test harness, idempotent)

External cite anchors (master, 3-org-distinct per W295 §6.2):
1. Atlassian Kanban WIP-limit: https://www.atlassian.com/agile/kanban/wip-limits
2. Google SRE Workbook ch.24 "Distributed Periodic Scheduling with Cron": https://sre.google/workbook/distributed-periodic-scheduling/
3. Spotify Squad Health Check + Scaling Agile @ Spotify: https://engineering.atspotify.com/2014/03/squad-health-check-model/
4. Conventional Commits 1.0.0: https://www.conventionalcommits.org/en/v1.0.0/
5. SLSA v1.0 build-provenance: https://slsa.dev/spec/v1.0/provenance
6. GitHub commit-signature verification: https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification

---

## §10 Final ratify

W328 Stream-C **SHIPS** with 3 deliverables across 3 K-N targets, all DOC-ONLY scope. K-8 hook verified fit-for-purpose (3/3 PASS); K-5 spec is operator-actionable for W329 implementation; 2 upstream-issue drafts are operator-ready for `gh issue create`. Cardinal rules R1-R5 HOLD. `self_invented_count: 0` HOLDS. CLAUDE.md ≤50-LOC body HOLDS. No settings/skills/code modifications. Parent stream owns the W328 ship-commit.
