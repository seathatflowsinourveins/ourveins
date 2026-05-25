# Wave 105 Ship 2Y-stage1 — staging probe for stale-HEAD re-pin

## Origin

Wave 104 SRA-driven re-audit Sections A.6 + A.7 surfaced 2 stale local-clone HEADs:
- CCBP `Z:/repos/deps/claude-code-best-practice-shan` — local pinned at `64fffd53` (2026-05-02), upstream advanced to `48f2ceb` (2026-05-08; ~6 days fresher)
- codex `Z:/repos/deps/codex` — local pinned at `993e3f40` (2026-04-22), upstream advanced to `c579da41` (2026-05-08; ~16 days fresher)

CR-6 fresh-from-github discipline mandates pull from newest before install, but these are CITE-ANCHOR clones (TIER-1-DIRECT cite sources for cardinal rules + agents + manifest), NOT install-class. CR-6 anti-pattern at CLAUDE.md L78: "NEVER copy from `Z:/repos/deps/<repo>/` for installs (those may be stale per Marker Decay corollary)" — but cite-anchors at file:line + HEAD-SHA are immutable per `port-note-discipline.md §1`.

## Cite-anchor footprint inventory (Mia probe pre-edit)

```bash
grep -rn "64fffd53a7c6f8e2e0b1575fdd200b65cda04737" CLAUDE.md CLAUDE.local.md docs/ .claude/rules/ .claude/agents/ | wc -l
# 212 references

grep -rn "993e3f407ea8213f7d32cb9367ae7616b7e15b4a" CLAUDE.md CLAUDE.local.md docs/ .claude/rules/ .claude/agents/ | wc -l
# 20 references
```

Files with CCBP `64fffd53` cite anchors:
- CLAUDE.md (multiple cardinal-rule cites)
- CLAUDE.local.md (env block cite)
- docs/eee-launch-design-cliproxyapi.md
- docs/install-provenance.md
- docs/sota-installed-manifest.md
- docs/v64-child-artifact-lanes-convention.md
- docs/v64-noise-risk-classifier-convention.md
- docs/v64-stable-prefix-convention.md
- .claude/agents/architect.md
- .claude/agents/code-reviewer.md
- .claude/agents/debugger.md
- .claude/agents/sota-researcher.md
- .claude/agents/verifier.md
- (plus 20+ other rule files via inheritance from claude-sota sibling cite-import-AMBER)

## Critical CLAUDE.md cardinal-rule CCBP cites — verification at new HEAD `48f2ceb`

Spot-check 4 critical authorities; all RESOLVE CORRECTLY at new HEAD:

| CR | Cite (CLAUDE.md L#) | File:line at new HEAD | Verbatim match |
|----|---|---|----|
| CR-1 | `claude-memory.md:34-40 @ 48f2ceb` | "Ancestor Loading (UP the directory tree)" / lazy loading semantic | ✅ MATCHES old HEAD claim |
| CR-2 | `andrej-karpathy-skills/CLAUDE.md:7-61 @ 2c606141` | (separate repo; HEAD unchanged at `2c606141`) | ✅ NOT AFFECTED |
| CR-3 | `cross-model-workflow.md:1-48 @ 48f2ceb` | STEPS 1-4 + ASCII diagram | ✅ MATCHES old HEAD claim |
| CR-4 | `rpi-workflow.md:1-5 @ 48f2ceb` | "RPI = Research → Plan → Implement" + 3-phase pattern | ✅ MATCHES old HEAD claim |

**Conclusion**: cardinal-rule cites are STABLE across the upstream rebase. Migration is low-risk for the 4 critical authorities. Remaining 208 CCBP cites + 20 codex cites need spot-verification via codex T1 e2e per CR-3.

## Upstream HEAD evidence

```
=== CCBP local before fetch ===
64fffd53a7c6f8e2e0b1575fdd200b65cda04737 2026-05-02 16:56:40 +0500 karparthy added

=== CCBP upstream HEAD (after fetch) ===
48f2cebeb88b389b27231c418ceadb65baf813fd 2026-05-08 15:47:01 +0000 chore(agent-collections): append 2026-05-08 changelog entry
NOTE: forced-update rebase

=== codex local before fetch ===
993e3f407ea8213f7d32cb9367ae7616b7e15b4a 2026-04-22 23:36:15 -0700 Persist target default reasoning on model upgrade (#19085)

=== codex upstream HEAD (after fetch) ===
c579da41b16dc88b62d9cb2611f70ccdb7ac2735 2026-05-08 18:19:23 -0700 Move file watcher out of core (#21290)
```

## Disposition (forward-only per port-note-discipline §6)

**Ship 2Y-stage1 (THIS FIRE)**: STAGING ONLY — record upstream HEAD evidence + verify 4 critical cardinal-rule cites at new HEAD. NO cite-anchor SHA bumps applied. Local clone HEAD on disk now refreshed to upstream (via `git fetch` + `origin/main` advance), but eee files still reference old SHA pins.

**Ship 2Y-stage2 (FUTURE FIRE)**: actual cite-anchor migration:
- Per cite-anchor: re-verify file:line still resolves at new HEAD
- For drifted line numbers: apply Karpathy P3 surgical changes — minimal SHA bump per cite + line-number adjustment if drifted
- Per CR-3 + Ship 2X SRA cross-model T1 mandate: codex T1 e2e BEFORE commit (any cite-anchor SHA bump touches CR-1 authority surface)
- Per CR-9 install-risk: 2-round fix-forward expectation; budget per-fire ship

## Anti-patterns avoided this fire (per closed-loop-recursive-narrowing.md Outcome A)

- ❌ Bulk sed-replace SHA across 212+ cites without per-cite verification (port-note-discipline §1 line-offset-propagation drift class)
- ❌ Single-ship migration of all 212 cites (ONE-LOGICAL-UNIT-PER-FIRE violation)
- ❌ Skipping codex T1 (CR-3 violation; cardinal-rule cite-anchor changes are CR-1 authority modifications)

## CR compliance (Ship 2Y-stage1)

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-1-DIRECT spot-check 4 cardinal-rule authorities at new HEAD |
| CR-3 (cross-model T1 e2e) | ⚠️ DEFERRED | Stage1 is staging-only; T1 fires at Stage2 |
| CR-6 (fresh-from-github) | ✅ | Local clones now refreshed to upstream HEAD |
| CR-9 (install-risk) | ✅ | LOW for Stage1 (no cite SHA bumps); HIGH for Stage2 (212+ cites) |
| CR-10 (research-first) | ✅ | Wave 104 SRA-driven re-audit drove this staging |
| CR-11 (META-process) | ✅ | Mia pre-apply + per-cite verification before SHA bumps |

## Verification commands (post-fire)

```bash
git -C Z:/repos/deps/claude-code-best-practice-shan log -1 --format="%H %ci %s"
# 48f2cebeb88b389b27231c418ceadb65baf813fd 2026-05-08 15:47:01 +0000 chore(agent-collections): append 2026-05-08 changelog entry

git -C Z:/repos/deps/codex log -1 --format="%H %ci %s"
# c579da41b16dc88b62d9cb2611f70ccdb7ac2735 2026-05-08 18:19:23 -0700 Move file watcher out of core (#21290)

# Spot-verify any cite via:
git -C Z:/repos/deps/claude-code-best-practice-shan show 48f2ceb:<file> | sed -n 'N,Mp'
```

## Queue (post Ship 2Y-stage1)

- **Ship 2Y-stage2** (FUTURE FIRE): cite-anchor migration with codex T1 e2e
  - Sub-ship 2Y-stage2a: CLAUDE.md + CLAUDE.local.md cardinal-rule cites (highest priority; CR-1 authority surface)
  - Sub-ship 2Y-stage2b: .claude/agents/* cite-anchor migration (architect/code-reviewer/debugger/sota-researcher/verifier)
  - Sub-ship 2Y-stage2c: docs/ cite-anchor migration (manifest + provenance + design docs)
  - Sub-ship 2Y-stage2d: docs/outer research/ cite-anchor migration (lower priority; reference-only)

- **Ship 2N-batch3**: security-guidance plugin (path-portability investigation needed)
- **Ship 2Z**: forrestchang/andrej-karpathy-skills cite-anchor surgical disclosure-add
- **Ship 2L / 2B / 2C / 2M**: queue per Wave 104 outstanding

## Wave 105 — 25th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 104-2N-batch2 | `67620bd` | plugin-dev enable |
| 104-2N-batch2-prov | `ee65220` | Ship 2N-batch2 provenance entry |
| **105-2Y-stage1** | **`(this artifact)`** | **stale-HEAD staging probe (NO commit; staging-only)** |

## Update triggers

Re-evaluate Ship 2Y-stage2 when:
- Wave 105 agent fan-out returns (Agent A/B/C verdicts may surface additional cite-anchor work)
- New CCBP HEAD bumps before Stage2 fires (would require fresh staging probe)
- A 213th CCBP cite is added to eee that needs the new HEAD SHA inline (would force partial migration)
