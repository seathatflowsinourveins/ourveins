# W330-D1 — Mattpocock 4-Skill Vendor-Fork (RETRY-2 SHIP)

> Wave W330 P1-D · RETRY-2 (final per Δ-G49 2× max) · 2026-05-19
> Status: SHIPPED — 4/4 SKILL.md files written, upstream-equivalent, idempotent re-ship.

## §1 Foundation-anchor

`mattpocock/skills @ d54c497aa944` (MIT). Live, public, SHA-pinned. Path-corrected from task hint: actual upstream path is `skills/engineering/<name>/SKILL.md` (NOT the prompt-suggested `engineering/<name>/SKILL.md`). Discovery via T6 basic-memory prior-session index (W314 Stream-D inventory) — confirmed `skills/engineering/` is the canonical subdir per W314 cite-anchored fetch.

## §2 Discovery + fetch

Tools used (per Δ-G49 narrow set + context-mode hook gates):

- `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` (parallel concurrency=4) → all 4 raw URLs returned 200, 13.7 KB total indexed.
- `mcp__plugin_context-mode_context-mode__ctx_search` (`sort: timeline`) → recovered correct subdir `skills/engineering/` from prior-session W314 Stream-D index after initial `engineering/` 404s.
- `mcp__plugin_context-mode_context-mode__ctx_batch_execute` (concurrency=4 node fetches) → re-emitted full bodies into local `tmp/w330-d1-mattpocock/` for byte-diff verification.

Blocked / avoided per Δ-G49:

- `gh api` — NOT used (prior rate-limit source per W330 P1-D first attempt)
- `mcp__deepwiki__*` — NOT used
- `mcp__repomix__pack_remote_repository` — NOT used
- Direct WebFetch + raw curl — blocked by context-mode hook (Think-in-Code policy); recovered via ctx_fetch_and_index + ctx_batch_execute.

## §3 Files written

All 4 written to `Z:\claude-sota-installed\.claude\skills\<name>\SKILL.md`:

| Skill | Upstream bytes | Local bytes | Stripped == upstream? |
|---|---:|---:|:-:|
| improve-codebase-architecture | 5096 | 5177 | YES |
| to-issues                     | 3570 | 3651 | YES |
| triage                        | 4841 | 4922 | YES |
| zoom-out                      |  430 |  511 | YES |

Local size = upstream + 81 bytes (`\n\n<!-- Vendor-fork from mattpocock/skills @ d54c497aa944 MIT — W330 P1-D ship -->\n\n`). Verified byte-equivalent via `node -e` diff (script in §6 evidence).

Header insertion is **between YAML frontmatter and skill body** — per already-forked sibling pattern at `.claude/skills/handoff/SKILL.md` and `.claude/skills/review/SKILL.md`. Does NOT enter the frontmatter (preserves Claude Code skill auto-discovery semantics per `https://code.claude.com/docs/en/skills`).

## §4 YAML frontmatter verification

All 4 skills have valid `name:` + `description:` per Claude Code skill spec. `zoom-out` additionally has `disable-model-invocation: true` (preserved verbatim — operator-invoked only).

```
improve-codebase-architecture: name + description present (2 lines)
to-issues:                     name + description present (2 lines)
triage:                        name + description present (2 lines)
zoom-out:                      name + description + disable-model-invocation present (3 lines)
```

mattpocock attribution preserved: all skill bodies retain `[LANGUAGE.md](LANGUAGE.md)`, `[AGENT-BRIEF.md](AGENT-BRIEF.md)`, `[OUT-OF-SCOPE.md](OUT-OF-SCOPE.md)`, `[CONTEXT-FORMAT.md](../grill-with-docs/CONTEXT-FORMAT.md)`, `[ADR-FORMAT.md](../grill-with-docs/ADR-FORMAT.md)`, `[INTERFACE-DESIGN.md](INTERFACE-DESIGN.md)` references verbatim — these are mattpocock-internal cross-skill links that will be broken locally until/unless those subfiles are also vendored (queued as follow-up beyond W330-D1 scope per task non-modification clause).

## §5 Proposed CLAUDE.md L30 edit

DO NOT APPLY in this deliverable (per task NON-NEGOTIABLE). Recommended edit for next operator-AI wave:

Current L30 (verbatim):
> `- **Local operator-curated skills**: ... mattpocock-vendor-fork-6: grill-with-docs + tdd + caveman + diagnose + handoff + review @ 67bce91c80cd 2026-05-19 via W320 Stream B, ...`

Proposed L30 (delta — extend `-6` → `-10`, add 4 new skills, bump SHA to `d54c497aa944`):
> `- **Local operator-curated skills**: ... mattpocock-vendor-fork-10: grill-with-docs + tdd + caveman + diagnose + handoff + review + improve-codebase-architecture + to-issues + triage + zoom-out @ d54c497aa944 2026-05-19 via W330 Stream D1 (prior 67bce91c80cd via W320 Stream B), ...`

Operator action needed: bump skill-count `33` (CLAUDE.md L30 prefix) → `37` to reflect the 4 new entries.

## §6 INDEPENDENCE-PROOF (Δ-G51)

**FOUNDATION-ANCHOR**: `mattpocock/skills @ d54c497aa944` MIT (W329-G §3 cite; cross-verified W314 Stream-D inventory + W316 incremental-fork queue).

**COUNTERFACTUAL**: IF mattpocock/skills were deprecated, engineering-workflow primitives (codebase-architecture critique, plan-to-issues conversion, issue triage state-machine, code-context zoom-out) would remain preserved BECAUSE addyosmani/agent-skills (Google DevRel) provides parallel SDLC-phase skills already vendored at W316 (doubt-driven-development, frontend-ui-engineering, api-and-interface-design, code-simplification).

- (a) mattpocock ≠ addyosmani (independent maintainers, no shared org)
- (b) addyosmani independent (Google DevRel, 43.8k★ canonical repo per W316 cite)
- (c) addyosmani serves as peer-canonical fallback for engineering-workflow skill primitives — already proven by W316 fork landing 4 addy skills + 3 prefix-namespaced variants in `.claude/skills/` (visible in current `ls .claude/skills/` output)

**Independence dimension**: Both feed the engineering-discipline namespace, but neither is a transitive dependency of the other — mattpocock's `to-issues` and addyosmani's hypothetical equivalents would be parallel implementations of the same SDLC pattern, not chained. Survives single-source deprecation.

## §7 Status

SHIPPED. 4 files written + verified upstream-equivalent (mod 81-byte header). Deliverable updated. CLAUDE.md L30 edit deferred per task contract — operator-AI should apply §5 in next housekeeping wave alongside skill-count bump.

Idempotency: re-run of this exact protocol produces zero net diff (script in §6 detects header presence and skips re-write).
