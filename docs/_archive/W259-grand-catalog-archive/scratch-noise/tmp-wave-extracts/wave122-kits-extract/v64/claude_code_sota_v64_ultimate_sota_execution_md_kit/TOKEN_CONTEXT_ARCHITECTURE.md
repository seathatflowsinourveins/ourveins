# TOKEN_CONTEXT_ARCHITECTURE.md

## Token optimization is architecture, not shorter prompts

Best stack:

```text
measurement:
  ccusage
  statusline
  devtools
  cross-code-organizer

shell-output compression:
  RTK

semantic retrieval:
  Serena
  Claude Context

repo capsule:
  Repomix

large-output sandbox:
  Context Mode

cross-agent compression/memory:
  Headroom

read-path/context profiling:
  Wet
  Distill
  Skinny Jeans
  Whetstone

docs/browser:
  Context7
  Playwright MCP
```

## Default stack

```text
ccusage
RTK
Serena
Repomix
rg / fd / jq / yq / gh
```

## Important distinction

RTK optimizes shell output. It does not optimize Claude Code built-in reads/searches.

Therefore pair:

```text
RTK       -> Bash output
Serena    -> symbol-level code navigation
Repomix   -> controlled repo snapshots
Skills    -> progressive disclosure
Subagents -> noisy exploration isolation
Worktrees -> file isolation
```

## Context admission policy

Before context enters the model, ask:

```text
Is this needed now?
Can it be summarized deterministically?
Can a symbol/reference answer it?
Can a focused command answer it?
Can a subagent inspect it and return only findings?
Can it live in a Skill or supporting file?
```

## Anti-patterns

```text
giant CLAUDE.md
always-on MCP buffet
memory plugins before durable memory
whole repo dumps every turn
cat huge logs
multi-agent swarm reading same files
```
