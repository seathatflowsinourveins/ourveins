---
title: Wave 252 Track C-narrow - P0 License Blocker Resolution
status: AUTHORITATIVE
date: 2026-05-16
agent: codex-rescue STAND-IN
---

# Wave 252 Track C-narrow - P0 License Blocker Resolution

Scope held to the six Wave 251 blocked repos. License classification uses only root `LICENSE` direct raw GitHub checks with `main` first and `master` fallback where needed.

| # | Repo | Raw LICENSE result | License-text first-5-lines evidence | Classification | Action |
|---:|---|---|---|---|---|
| 1 | `mksglu/context-mode` | `https://raw.githubusercontent.com/mksglu/context-mode/main/LICENSE` exists | `Elastic License 2.0 (ELv2) Copyright 2026 Mert Koseoglu`; then ELv2 acceptance, copyright license, limitations, and patent sections start in the file. | REJECT | REJECT-LICENSE |
| 2 | `MemPalace/mempalace` | `https://raw.githubusercontent.com/MemPalace/mempalace/main/LICENSE` exists | `MIT License Copyright (c) 2026 MemPalace Contributors`; second line is the MIT warranty disclaimer. | MIT / PERMISSIVE-PASS | ADOPT-NOW |
| 3 | `ynulihao/AgentSkillOS` | `https://raw.githubusercontent.com/ynulihao/AgentSkillOS/main/LICENSE` absent; repo root listing has no `LICENSE` file. README badge says MIT, but that is not accepted by this track's rule. | `404: Not Found` / absent root license file. | UNKNOWN-FAIL | VERIFY-NEEDED |
| 4 | `FoundationAgents/AOrchestra` | `https://raw.githubusercontent.com/FoundationAgents/AOrchestra/main/LICENSE` exists | `Apache License Version 2.0, January 2004`; then Apache definitions for License, Licensor, Legal Entity, You/Your, and Source/Object forms. | Apache-2.0 / PERMISSIVE-PASS | ADOPT-NOW |
| 5 | `covibes/zeroshot` | `https://raw.githubusercontent.com/covibes/zeroshot/main/LICENSE` exists | `MIT License Copyright (c) 2025 Covibes`; second line is the MIT warranty disclaimer. | MIT / PERMISSIVE-PASS | ADOPT-NOW |
| 6 | `Enderfga/claw-orchestrator` | `https://raw.githubusercontent.com/Enderfga/claw-orchestrator/main/LICENSE` exists | `MIT License Copyright (c) 2024 enderfga`; second line is the MIT warranty disclaimer. | MIT / PERMISSIVE-PASS | ADOPT-NOW |

## Context-mode Alternative Recommendation

`mksglu/context-mode` remains blocked because ELv2 is non-permissive under this track's rules.

Nearest permissive replacement found: `AgusRdz/ctx` (`https://github.com/AgusRdz/ctx`).

Rationale:
- License: GitHub repo page identifies `ctx` as MIT licensed.
- Functional fit: `ctx` is explicitly built for Claude Code context preservation across compactions.
- Hook fit: README documents `PreCompact`, `PostCompact`, and `SessionStart` hook registration and snapshot restore behavior.
- Scope fit: closer to the required pre-compaction/context-continuity job than a generic memory system; it does not appear to be a full context-window budget policy engine, so classify as nearest permissive replacement, not a perfect fork.

Recommended action: STUDY-PILOT `AgusRdz/ctx` as the permissive substitute for the rejected ELv2 `context-mode`; do not adopt `context-mode`.

## Sources

- `mksglu/context-mode` raw LICENSE: https://raw.githubusercontent.com/mksglu/context-mode/main/LICENSE
- `MemPalace/mempalace` raw LICENSE: https://raw.githubusercontent.com/MemPalace/mempalace/main/LICENSE
- `ynulihao/AgentSkillOS` repo root: https://github.com/ynulihao/AgentSkillOS
- `FoundationAgents/AOrchestra` raw LICENSE: https://raw.githubusercontent.com/FoundationAgents/AOrchestra/main/LICENSE
- `covibes/zeroshot` raw LICENSE: https://raw.githubusercontent.com/covibes/zeroshot/main/LICENSE
- `Enderfga/claw-orchestrator` raw LICENSE: https://raw.githubusercontent.com/Enderfga/claw-orchestrator/main/LICENSE
- `AgusRdz/ctx` repo root: https://github.com/AgusRdz/ctx

VERDICT: 4/6 blockers cleared to ADOPT-NOW, 1/6 rejected for ELv2 with MIT alternative `AgusRdz/ctx` recommended for STUDY-PILOT, and 1/6 remains VERIFY-NEEDED because root `LICENSE` is absent despite an MIT README badge.
