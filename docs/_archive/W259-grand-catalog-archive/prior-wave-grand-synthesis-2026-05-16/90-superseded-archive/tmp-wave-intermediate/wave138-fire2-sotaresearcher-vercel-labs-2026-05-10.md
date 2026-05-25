---
title: Wave 138 Fire 2 — Reverse-Mia probe vercel-labs/agent-skills license verification
status: AUTHORITATIVE
date: 2026-05-10
agent: sota-researcher
wave: 138
fire: 2
parent_catch: Wave 137 Fire 2 Mia OVER #158
agentId: a234e177dd5ede07b
---

# Wave 138 Fire 2 — Reverse-Mia probe `vercel-labs/agent-skills` (default branch HEAD)

## Mission

Confirm or refute Wave 137 Fire 2 Mia OVER #158 catch on Voice 2's mattpocock-research
sub-finding (Wave 133 Fire 1 prior verdict ADOPT-NOW for `vercel-labs/agent-skills`):
- gh API `license` field returned `null` (NO spdx_id)
- No LICENSE file at root
- README claim "MIT" only — unsupported by file evidence

## Probe DAG (executed cheapest-first per CADP)

### Probe 1 — GitHub API repo metadata [VERIFIED 2026-05-10]

`gh api repos/vercel-labs/agent-skills` returned:

| Field | Value |
|---|---|
| `full_name` | `vercel-labs/agent-skills` |
| `id` | 1112540808 |
| `description` | `Vercel's official collection of agent skills` |
| `default_branch` | `main` |
| `created_at` | `2025-12-08T19:10:06Z` |
| `pushed_at` | `2026-05-07T17:02:55Z` |
| `updated_at` | `2026-05-10T18:13:37Z` |
| `stargazers_count` | 26368 |
| `forks_count` | 2400 |
| `open_issues_count` | 140 |
| `archived` | false |
| `disabled` | false |
| **`license`** | **`null`** |
| `organization.login` | `vercel-labs` |
| `organization.type` | `Organization` |
| `homepage` | `https://skills.sh/vercel-labs/agent-skills` |

**Critical finding**: `license: null` — GitHub's license-detection (relies on
`licensee/licensee` per docs) returned NULL. No SPDX ID assigned.

### Probe 2 — LICENSE file existence at root [VERIFIED 2026-05-10]

Tested 4 canonical filename variants via `gh api repos/.../contents/<name>`:

| Path | HTTP status | Result |
|---|---|---|
| `LICENSE` | 404 | NOT FOUND |
| `LICENSE.md` | 404 | NOT FOUND |
| `LICENSE.txt` | 404 | NOT FOUND |
| `COPYING` | 404 | NOT FOUND |

Cross-confirmed via root directory listing
`gh api repos/vercel-labs/agent-skills/contents/`:

```
.github/         (dir)
.gitignore       (file)
AGENTS.md        (file)
CLAUDE.md        (file)
README.md        (file)
packages/        (dir)
skills/          (dir)
```

**ZERO LICENSE-class file present at root.** Confirmed exhaustive listing.

### Probe 3 — README.md license claim [VERIFIED 2026-05-10]

`gh api repos/vercel-labs/agent-skills/contents/README.md`:
- Path: `README.md`
- Blob SHA: `7fcc6c1795ec29490970df2ba87cdadce3a5424a`
- Size: 5766 bytes
- HTML URL: https://github.com/vercel-labs/agent-skills/blob/main/README.md

Base64-decoded grep for license tokens returned 2 hits:
- L187: `## License`
- L189: `MIT`

Verbatim section (L185-189):
```
## License

MIT
```

**README claim "MIT" present BUT not backed by LICENSE file at root.**

### Probe 5 — Recent 20 commits since Wave 137 Fire 2 (2026-05-08) [VERIFIED 2026-05-10]

`gh api 'repos/vercel-labs/agent-skills/commits?per_page=20'`:

| SHA | Date | Subject |
|---|---|---|
| `b9c8ee06` | 2026-05-05T21:16:44Z | Update-README ← HEAD |
| `ce3e64e4` | 2026-04-17T04:17:46Z | Merge PR #231 vercel-cli-sp-awareness |
| `77a6a148` | 2026-04-16T23:35:50Z | vercel-cli-with-tokens fix bugs |
| ... (17 more, all skill content / merges, no license-related) | | |

**No LICENSE file added in last 20 commits.** HEAD `b9c8ee06` (2026-05-05) predates
Wave 137 Fire 2 catch (2026-05-08) by 3 days — no remediation since.

## Wave 137 Fire 2 catch verification

**CONFIRMED.** Voice 2's Wave 137 Fire 2 Mia OVER #158 catch is empirically validated:

| Wave 137 Fire 2 claim | Wave 138 Fire 2 fresh probe | Status |
|---|---|---|
| gh API `license` field returns `null` (NO spdx_id) | Probe 1 confirms `"license":null` | CONFIRMED |
| No LICENSE file exists at root | Probe 2 + root dir listing confirm 4/4 canonical names 404 | CONFIRMED |
| README claim "MIT" only — unsupported | Probe 3 confirms README L189 "MIT" + Probe 2 confirms NO LICENSE file | CONFIRMED |

## Cite-class lattice analysis (per CR-1+8)

Per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-1 cite-class lattice:
- TIER-1-DIRECT requires verified upstream cite at file:line + HEAD SHA
- README claim alone (`MIT` token in L189) is INSUFFICIENT for license verification
  per the canonical convergence-gate Probe 6 mechanism (LICENSE file read at upstream root)
  cited at `Z:/claude-sota-installed/.claude/rules/agent-harness-fit-verification.md` Probe 6

Per `Z:/claude-sota-installed/.claude/rules/citation-discipline.md` rule #6:
- `[UNKNOWN]/conflicting` license status MUST be marked when README claim conflicts
  with absence of authoritative LICENSE file

## Mia self-check on own return (Wave 137 Fire 2 #158 sub-class defense)

- Probe 1 license=null: TIER-1-DIRECT via gh API JSON [VERIFIED via stdout capture]
- Probe 2 LICENSE 404 ×4: TIER-1-DIRECT via gh API HTTP status [VERIFIED]
- Probe 3 README L189 "MIT": TIER-1-DIRECT via base64 decode + grep [VERIFIED, blob SHA pinned]
- Probe 5 commit history: TIER-1-DIRECT via gh API jq slice [VERIFIED]
- No claim is INFERRED or UNKNOWN — all 4 probes return concrete file evidence

## Disposition

**REJECT-FOR-FIT for INSTALL-class adoption** per cardinal-rule-9 install-risk discipline:
- Probe 6 direct-file/registry blocker FAILED (no LICENSE file at root)
- License is `[UNKNOWN]/conflicting` — README claims MIT but unsupported by file evidence
- Vercel-labs is structurally sound org (26.4k★, active maintenance, official Vercel collection)
  but install-eligibility requires LICENSE file at root for legal-class clarity
- Per `kiss-dry-yagni.md` Must-Never #4 + cardinal-rule-1+8: do NOT install without
  verifiable license

**DOWNGRADE-TO-CITE-ONLY-NOT-INSTALL**: discovery-cite admissible per Wave 137 Fire 2
disposition (sister to vinta/awesome-python REMOTE-ONLY discovery-cite pattern at
`Z:/claude-sota-installed/.claude/rules/research-protocol.md`):
- Repo MAY be cited as discovery surface (e.g., "Vercel's official skills collection")
- Skill content MAY be referenced at file:line + HEAD SHA per cardinal-rule-1
- INSTALL-class adoption (npx skills add, fork-modify, vendoring into `.claude/skills/`)
  is BLOCKED until upstream ships LICENSE file at root

## VERDICT

- **AXIS-LICENSE**: **DOWNGRADE** (no LICENSE at root, README MIT claim L189 only — Probe 6 blocker per `agent-harness-fit-verification.md` direct-file probe)
- **Cite trail**:
  - gh API `repos/vercel-labs/agent-skills`: `"license":null` (Probe 1)
  - 4 LICENSE filename variants HTTP 404 via `gh api repos/.../contents/<name>` (Probe 2)
  - Root dir listing: 5 files + 2 dirs, NONE LICENSE-class (Probe 2 cross-confirm)
  - README.md blob SHA `7fcc6c1795ec29490970df2ba87cdadce3a5424a` L187-L189 "## License\n\nMIT" (Probe 3)
  - 20 recent commits HEAD `b9c8ee06` 2026-05-05 — no LICENSE additions (Probe 5)
- **Recommendation**: **DOWNGRADE-TO-UNKNOWN-LICENSE-CITE-ONLY-NOT-INSTALL**
- **Wave 137 Fire 2 catch**: **CONFIRMED** — all 3 sub-claims (license=null + no LICENSE file + README MIT only) empirically validated via fresh 2026-05-10 direct probe
