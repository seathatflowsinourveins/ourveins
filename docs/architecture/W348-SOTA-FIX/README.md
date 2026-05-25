# W348-SOTA-FIX — Audit Deliverables + Rebase Coordination

> **Scope**: complementary to concurrent W348-CARRY-CLEANUP (see `../W348-PREDICATE/PREDICATE.md`). This wave handles W330 batch-detection + OTLP 401 + skills audit + CI/CD + SOTA discovery. The other handles W347 residuals + mattpocock SHA + W343 P3 atomic-write.
>
> **Status (2026-05-20)**: audit deliverables migrated from gitignored `tmp/` per operator decision. Branch creation deferred pending merge sequencing between sibling branches `w344-mainsession-ship@3e013b5` and `goal/W348-carry-cleanup@f5a47a5` (both forked from shared parent `faf018f`).

## Deliverables (11 files, 3-org-distinct cite-anchored)

| File | Stream | Bytes | Purpose |
|---|---|---|---|
| `A-anthropic-delta.md` | A | 15014 | Anthropic-docs delta since prior wave |
| `B-sota-discovery.md` | B | 17891 | SOTA repo discovery (incl. CodeAlive-AI/agents-reflection-skills T2-VENDOR-FORK candidate) |
| `C-hooks-tools-audit.md` | C | 20400 | Hooks + `tools/` audit (W330 parallel-guard bug-A/bug-B root-cause) |
| `D-memory-gittree.md` | D | 21848 | T1-T6 memory tier + git-tree audit (6-worktree finding, 5-stash review, 28-ahead origin/main) |
| `E-skills-plugins-audit.md` | E | 22662 | 56-skill inventory (4 plugin-duplicates flagged for delete) + 7 bundle cite-refreshes |
| `F-cicd-native.md` | F | 23763 | CI/CD hardening — 32 unpinned `uses:` SHA-pin to 100% + TruffleHog + cosign |
| `codex-r1-verdict.txt` | — | 2649 | Round-1 BLOCK (CNCF parent-org concern on anchor floor) |
| `codex-r2-verdict.txt` | — | 4208 | Round-2 APPROVE (NIST AI 600-1 anchor added → 3-org-distinct ledger satisfied) |
| `GOAL-DRAFT-V1.md` | — | 5845 | First-pass predicate (pre-codex-r1) |
| `GOAL-FINAL.md` | — | 6196 | Post-r1 revision (pre-r2 NIST anchor) |
| `GOAL-FINAL-V2.md` | — | 6305 | **PASTE-READY** predicate (codex r2 APPROVE, awaiting branch creation) |

## Rebase coordination plan (operator-signed 2026-05-20)

**Decision**: "Rebase W348-SOTA-FIX onto concurrent HEAD" — fork `w348-sota-fix` from the merge of `w344-mainsession-ship` + `goal/W348-carry-cleanup` rather than peer-fork off shared parent `faf018f`.

**Current sibling-branch geometry**:

```
faf018f (W347 P2b+P4d ledger + Node v22 audit)
   ├── 3e013b5  w344-mainsession-ship   "fix(W347 codex-r1): SHA correctness + trigger-audit + verify-before-claim"
   └── f5a47a5  goal/W348-carry-cleanup "chore(W348): close P0.1/P0.2/P0.4/P0.5 on isolated branch; carry P0.3"
                                        Codex-Verdict: APPROVE
```

**Sequencing** (operator action required for steps 2-3):

1. **DONE** (this commit): audit deliverables migrated to tracked tree.
2. **Operator step**: decide merge order — recommended `git checkout w344-mainsession-ship && git merge --no-ff goal/W348-carry-cleanup` (preserves both lineages with explicit merge commit, codex APPROVE on carry-cleanup retained in history).
3. **Operator step**: `git worktree add Z:/claude-sota-installed-W348-sota-fix -b w348-sota-fix HEAD` from the merged tip, then paste `GOAL-FINAL-V2.md` as the active `/goal` in that worktree.
4. **W348-SOTA-FIX session**: execute P0 (W330 GREEN gate) → P1-P6 in dependency order per predicate.

**Why not fork now from 3e013b5**: skipping the carry-cleanup merge would leave W347 P0.1/P0.2/P0.4/P0.5 closures out of W348-SOTA-FIX's base — every subsequent rebase would re-apply them as conflicts. Cheaper to land the merge first.

**Why not fork now from f5a47a5**: skipping HEAD's W347 codex-r1 fix would regress trigger-audit + verify-before-claim discipline that already shipped on `w344-mainsession-ship`.

## Anchor ledger (sca-v17 D80 ≥6 org-distinct + ≥2 standards)

Per W348-SOTA-FIX `GOAL-FINAL-V2.md`:

- Anthropic — `docs.anthropic.com/en/docs/claude-code/hooks` (vendor primary)
- Anthropic — `code.claude.com/docs/en/monitoring-usage` (vendor secondary)
- OpenTelemetry — `opentelemetry.io/docs/specs/otel/protocol/exporter/` (CNCF standard)
- GitHub — `docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions` (vendor)
- OpenSSF — `scorecard.dev` (Linux Foundation)
- Sigstore — `docs.sigstore.dev/cosign/verifying/verify/` (CNCF)
- Microsoft — `github.com/microsoft/autogen` (retirement notice → microsoft/agent-framework successor)
- NIST — AI 600-1 MEASURE-3.1 (US gov standard, non-CNCF closure per codex r2 residual)

8 distinct orgs; 4 standards bodies (OTel/OpenSSF/Sigstore/NIST). sca-v17 D80 floor satisfied.

## Cross-session memory

- T6 basic-memory: queue `mcp__basic-memory__write_note` with permalink `main/audits/w348-sota-fix-multi-stream` once branch lands.
- W324 verdict-ledger: per-wave ledger row to be filed at `docs/architecture/W348-SOTA-FIX/VERDICT-LEDGER.md` post-execution.
- T5 Langfuse: OTLP 401 fix in P1 should resurrect telemetry traces previously dropped (W347 P0 dwell item).

## STOP gates (from `GOAL-FINAL-V2.md`)

- W330 RED → BLOCK (P0 must turn GREEN before any P1-P6 work)
- codex BLOCK on any round → BLOCK
- bypass-marker present at wave-close → BLOCK
- CLAUDE.md >50 LOC → BLOCK (currently 50; allowed +1 per L50 L86 line-count update only)

## Pointers

- Concurrent wave's predicate: `../W348-PREDICATE/PREDICATE.md`
- Concurrent wave's worktree: `Z:/claude-sota-installed-W348-carry` on `goal/W348-carry-cleanup`
- Forward-look queued: `../W349-FULL-SOTA-UNLEASH/W349-PREDICATE.md` (6-stream audit-only; not yet executable)
- Active W348-SOTA-FIX worktree: **not yet created** (pending step 3 above)
