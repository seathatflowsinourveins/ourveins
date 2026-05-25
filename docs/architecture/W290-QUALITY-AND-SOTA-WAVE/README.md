# W290 — Architecture Quality + Next-Wave SOTA Discovery (2026-05-18)

> **Wave**: W290 builds on W288 (research-arch v2 ship, sca-v3) + W289 (gap-closure for orchestration audit).
> **Trigger**: operator hindsight (2026-05-18 14:19) — "deep SOTA-quality audit to find real bugs in the current architecture using pyright, shellcheck, and gitleaks, audit the research-architecture, ingest top SOTA repos, and evolve the convergence-method."
> **Mandate (re-stated by operator)**: stars-not-a-hardgate · multi-tier decision-depth · multi-angle research convergence · ingest SOTA repos with deepwiki+repomix · evolve the convergence-method beyond sca-v3.

## Streams

- `F1-CODE-QUALITY-AUDIT.md` — pyright + ruff scan on real Python files. Real bugs, not theory.
- `F2-SECURITY-AUDIT.md` — gitleaks full-tree + npm audit + pip-audit. Affirmative-evidence security findings.
- `F3-SOTA-DISCOVERY-W290.md` — next-wave SOTA repo discovery beyond W288 Stream B's 42 candidates. Multi-MCP fan-out (deepwiki + ctx_fetch + WebSearch since github MCP is down).
- `F4-CONVERGENCE-METHOD-V4.md` — sca-v3 → sca-v4 evolution proposal. What's missing in v3, what to add, when to ship v4.

## Synthesis (post-stream)

- `W290-MASTER.md` — executive synthesis stitching F1-F4.
- `W290-VERDICT-LEDGER-DELTA.md` — new verdicts produced this wave + bugs filed.

## Cardinal-rule conformance

- CR-1 trusted plugins/skills/agents · CR-2 no self-invent hooks/scripts · CR-3 documented subagents · CR-4 CLAUDE.md+settings only · CR-5 permissions/sandbox.
