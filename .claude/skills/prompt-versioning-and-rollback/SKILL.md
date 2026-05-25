---
name: prompt-versioning-and-rollback
description: |
  Use when a prompt template, skill description, or agent system-prompt is about to be edited
  AND it has been in production use long enough that a rollback may be needed if the new version
  regresses quality. Implements the Anthropic Skills System versioning + rollback pattern: every
  edit creates a new version-stamped copy (epoch-timestamp filename); production reads the
  highest-numbered version unless an explicit pin file points elsewhere; rollback = move the
  pin file to an older version. Triggers on "version this prompt", "rollback the prompt",
  "promote prompt version", "pin prompt to version N", "prompt regression — revert", or any
  edit to a SKILL.md / agent system-prompt where the operator wants version-safety. Distinct
  from `git` revert (which loses the new attempt entirely) — this skill keeps BOTH versions
  retrievable. Distinct from `checkpoint-resume` (machine-state snapshot for resume-after-kill)
  — this skill is for prompt-template lineage. Distinct from generic ADR discipline — this
  skill is the file-system mechanism, not the decision record.

  ANCHORS (3-org-distinct):
  - Anthropic: claude-cookbooks Skills System custom-skill versioning (epoch-timestamp version
    IDs, version-pinning request parameter, rollback = select older version).
  - Microsoft: semantic-kernel `PromptTemplateConfig` + `Plugin.Versioning` (named plugin
    versions with manifest-pinning to a specific version).
  - assafelovic/gpt-researcher: `config/variables/` versioned prompt-variable sets +
    config-overlay precedence (newer config overrides older but older is retrievable).
---

# prompt-versioning-and-rollback

## File layout

```
.claude/skills/<name>/
  SKILL.md                  # current symlink-or-pin target
  versions/
    SKILL.<epoch>.md        # each historical version
    SKILL.<epoch+1>.md
  PIN                       # optional one-line file naming the active version
```

## Operations

| Op | Effect |
|---|---|
| Promote draft → new version | copy `SKILL.md.draft` → `versions/SKILL.<now-epoch>.md`; update PIN |
| Rollback | edit PIN to name an older version; `SKILL.md` is regenerated from pinned version |
| Diff versions | `diff versions/SKILL.<a>.md versions/SKILL.<b>.md` |
| List | `ls -t versions/ | head` |

## Anti-patterns

- Do NOT edit `SKILL.md` directly — always promote a draft to a new version.
- Do NOT delete old versions — disk is cheap; rollback safety is expensive.
- Do NOT skip PIN — the symlink-or-pin file IS the production selector.

## Verify-before-claim

Version-promotion claim MUST cite: new version file path + PIN content + a `diff` against the
previous version showing the intended change set.
