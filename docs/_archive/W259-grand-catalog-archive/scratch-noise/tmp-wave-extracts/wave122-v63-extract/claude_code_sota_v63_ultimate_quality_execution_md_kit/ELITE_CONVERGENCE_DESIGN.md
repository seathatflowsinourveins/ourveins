# Elite convergence design

## Architecture

```text
issue/spec
  → planner
  → context capsule
  → worktree
  → implementation
  → focused tests
  → quality gates
  → Codex review
  → adversarial review for risky changes
  → CI
  → PR
  → ADR/skill update
```


# Core convergence

```text
Context admission > prompt engineering
Semantic retrieval > file dumping
Read-path compression > shell-output-only compression
Skills/rules > giant CLAUDE.md
Slash commands > repeated prompting
Hooks > hoping the model remembers
Subagents = context isolation
Worktrees = file isolation
Codex/GPT-class model = second-model witness
Opus-class model = deep architect/security/research subagent
Memory plugins = audit-required, not default
MCPs = selective, not global
Benchmarks/evals = proof, not vibes
Operator dashboards = multi-agent control plane
CLI quality gates > vibes
GitHub issues/PRs/ADRs = durable memory
```


## Default-vs-selective rule

Default installs must be simple, locally inspectable, and low-risk.

Selective tools must prove value by benchmark.

Audit-required tools must pass source audit before install.

Discovery-only tools are never installed directly.
