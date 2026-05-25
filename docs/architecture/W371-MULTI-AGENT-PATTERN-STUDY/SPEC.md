# W371 — Multi-Agent Pattern-Study Pass (NO INSTALL) + Live-SWE-agent Investigation

**Wave:** W371
**Date:** 2026-05-22 (auto-executes on W370 APPROVE)
**Status:** SPEC-DRAFT
**Source:** W367 LAYER-MAP-CANONICAL.md §11 W371 entries + OD-12

## §0. Context

**L12 design choice (Stream A surprise #5):** Multi-agent frameworks (autogen/langgraph/agent-framework/crewai) are deliberately NOT installed as Python deps. CC agent-teams + sub-agents primitives win per CR-1. But the PATTERNS from these frameworks are valuable and should be lifted into local skills WITHOUT triggering install.

## §1. Acceptance bar (4 P3 items)

- [ ] **P3.1** Lift `langchain-ai/langgraph` patterns to local skill: BaseCheckpointSaver thread-id pattern, Pregel parallel-execution, HITL checkpoint interrupt
- [ ] **P3.2** Lift `microsoft/agent-framework` patterns to local skill: GroupChat + SelectorGroupChat + FunctionalTermination (autogen successor patterns)
- [ ] **P3.3** Investigate `Dicklesworthstone/mcp_agent_mail` for W325 multi-session coordination relevance (OD-9 surprise #3); if applicable, vendor-fork as `mcp-agent-mail` skill
- [ ] **P3.4** Deep-investigate `OpenAutoCoder/live-swe-agent` (~100-LOC scaffold @ 79.2% SWE-Bench Verified — D-surprise #1, OD-12): read scaffold, extract anti-bloat patterns, document as reference for own agent definitions

## §2. Components

| C# | Path | Action |
|----|------|--------|
| C1 | `.claude/skills/langgraph-patterns/SKILL.md` (NEW) | Pregel + checkpoint patterns lifted from langgraph |
| C2 | `.claude/skills/agent-framework-patterns/SKILL.md` (NEW) | GroupChat/Selector/Termination patterns |
| C3 | `.claude/skills/mcp-agent-mail/SKILL.md` (NEW conditional) | if mcp_agent_mail evaluated as adoptable |
| C4 | `docs/architecture/W371-MULTI-AGENT-PATTERN-STUDY/live-swe-agent-analysis.md` (NEW) | Live-SWE-agent deep-dive findings |
| C5 | `docs/architecture/W371-MULTI-AGENT-PATTERN-STUDY/CODEX-VERDICT.md` | codex r1→rN record |

## §3. Execution method

For each pattern-study target (P3.1-P3.3):
1. Use `mcp__deepwiki__read_wiki_contents` + `mcp__repomix__pack_remote_repository` to read the upstream repo
2. Extract the 3-5 most valuable patterns (those that solve real problems in CC orchestration)
3. Author SKILL.md with: pattern definition · code-anchor in upstream · CC-runtime adaptation · usage trigger description

For P3.4 Live-SWE-agent investigation:
1. Pack `OpenAutoCoder/live-swe-agent` via repomix
2. Read the ~100-LOC self-evolving scaffold
3. Document anti-bloat patterns: why this small scaffold beats heavyweight commercial agents
4. Apply lessons to existing local agent definitions (e.g., review if local agents are over-engineered)

## §4. Out of scope (W372+)

- W372: Anthropic-gap-filling cluster + OD-2/3/10/11 resolutions

## §5. References

- W367 LAYER-MAP-CANONICAL.md §3 L12 (multi-agent PATTERN-ONLY design)
- Stream G research-arch meta-patterns
- OD-12 (Live-SWE-agent investigation directive)
