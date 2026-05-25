---
name: gitnexus
description: Use when the operator says "gitnexus", "knowledge graph", "code graph", "cypher query", "impact analysis", "call graph", "refactoring impact", or asks how to use the GitNexus MCP — index into the 7-skill GitNexus namespace (guide / cli / exploring / impact-analysis / debugging / refactoring / pr-review).
---

<!-- Reference: anthropics/skills @ 690f15ca SKILL-AUTHORING-STANDARD.md (frontmatter contract). Parent index for the gitnexus skill namespace — child skills are TIER-1-DIRECT mirrors of Z:/repos/deps/gitnexus/gitnexus-claude-plugin/skills/* @ 98addbd6c4e7aff77b5c33242d08155afe94ed35 (W324 P0 namespace-index repair). -->

# gitnexus

Umbrella entry point for the GitNexus code-knowledge-graph skill family. Anthropic CC scans `*/SKILL.md` for description-match (per `https://code.claude.com/docs/en/skills`); this parent SKILL.md exists so that the bare keyword "gitnexus" surfaces a router rather than relying on Claude to guess which child skill fires.

## Child skills (route by intent)

| Child | Fires when |
|---|---|
| `gitnexus-guide` | "What GitNexus tools are available?", "How do I use GitNexus?", general MCP-tool / schema reference |
| `gitnexus-cli` | CLI command lookups, `gitnexus` shell invocations, project sync |
| `gitnexus-exploring` | Open-ended code exploration, "explore this codebase", call-graph walks |
| `gitnexus-impact-analysis` | "impact of changing X", blast-radius queries, downstream-caller enumeration |
| `gitnexus-debugging` | Bug triage via the graph — "who calls Y", "what depends on Z" |
| `gitnexus-refactoring` | Rename safety, signature-change impact, override fan-out |
| `gitnexus-pr-review` | PR-level review via the graph — diff-impact synthesis |

## When NOT to invoke this index

- The operator typed a specific child-skill trigger ("impact analysis", "PR review") — the child fires directly; the parent is only needed for the bare "gitnexus" keyword.
- The GitNexus MCP server is not running — fall back to the `local-cypher-codebase` skill (pure-tool fallback per W295).

## Provenance

W324 META-FOUNDATION P0 repair — created 2026-05-19. The 7 child skills already loaded correctly via Anthropic's `*/SKILL.md` glob; this parent SKILL.md adds discoverability for the umbrella "gitnexus" keyword. Cite-anchored to anthropics/skills @ 690f15ca SKILL-AUTHORING-STANDARD.md frontmatter contract + upstream gitnexus-claude-plugin @ 98addbd6.
