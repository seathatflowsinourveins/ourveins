---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
argument-hint: "What will the next session be used for?"
---

> Vendored from `mattpocock/skills` @ `67bce91c80cd1020a4f068ced32d0281656842ad` (2026-05-18) via W320 Stream B per W319 Stream A H1 + Stream B B3 + W314-r2-AI-r2-4 vendor-fork queue.
>
> **Upstream**: https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md
> **License**: MIT (Copyright (c) 2026 Matt Pocock) — verified W320 Stream B 2026-05-19 against `Z:/repos/deps/mattpocock-skills/LICENSE`.
> **Cardinal-rule compliance**: cite-anchored to CLAUDE.md:30 (operator-curated skills, Anthropic-sanctioned per `https://code.claude.com/docs/en/skills`); CR-3 documented subagent / CR-4 operator-curated path.

Write a handoff document summarising the current conversation so a fresh agent can continue the work. Save it to a path produced by `mktemp -t handoff-XXXXXX.md` (read the file before you write to it).

Suggest the skills to be used, if any, by the next session.

Do not duplicate content already captured in other artifacts (PRDs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.
