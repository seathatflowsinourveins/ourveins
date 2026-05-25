# 01 — Proposed CLAUDE.md Edit Draft (CR-12 5-class lattice codification)

> **Edit target**: `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 section
> **Insertion point**: AFTER existing "**Operational integration with CR-10 + CR-11**" paragraph + BEFORE existing "**Wave 50 fire 9 Agent J upstream-parity verdict (PROVISIONAL)**" block
> **Edit type**: ADD new sub-section (`### CR-12 disposition lattice (5 classes)`); NO modification to existing CR-12 text

## Proposed new sub-section text

```markdown
    ### CR-12 disposition lattice (5 classes — Wave 134 Fire 27 series codification)

    Beyond the **install-source priority order** (PRIMARY/SECONDARY/TERTIARY) above, every upstream-vs-incumbent relationship falls into ONE of 5 classes. Wave 134 Fire 27 series empirically mapped all 5:

    1. **GENUINELY-NEW** — no Anthropic/incumbent parallel exists for the primitive's scope. Disposition: **INSTALL via CR-12 PRIMARY path** (official-native-channel per CR-6). No further audit needed beyond Probe DAG.

    2. **DUPLICATE-FUNCTIONALITY** — full parallel exists in Anthropic/eee stack covering same scope and mechanism. Disposition: **REJECT-FOR-FIT** per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 (no duplicate functionality without clear reason).

    3. **PARTIAL-OVERLAP** — incumbent and candidate cover overlapping function via DIFFERENT MECHANISMS. Disposition: **CASE-BY-CASE**, typically CITE-PATTERN-ONLY or STUDY-PILOT-PATTERN-EXTRACT. Example: Wave 134 Fire 27-C mem0 (fact-extraction-based memory) vs eee graphiti (temporal-KG-based) vs mcp-memory (sqlite-vec-based) — same memory layer, different mechanisms. Codex T1 verdict at `.claude/state/codex_consult_w134_f27c_mem0_OUT.txt` STUDY-PILOT-PATTERN-EXTRACT conf=0.87.

    4. **PROVIDER-COMPLEMENT** — parallel API surfaces but different scopes; both can coexist. Disposition: **INSTALL as ALTERNATIVE (not PRIMARY)** — primary incumbent retains canonical position. Example: Wave 134 Fire 27-A openai-agents-python (vs Anthropic `claude-agent-sdk-python` @ HEAD `b512f256`) — Anthropic SDK = direct CC control plane (PRIMARY); OpenAI SDK = provider-agnostic orchestration (ALTERNATIVE). Codex T1 verdict at `.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt` STUDY-PILOT-PATTERN-EXTRACT conf=0.89.

    5. **ECOSYSTEM-IMPORT** — core primitive GENUINELY-NEW at the surface level but imports parallel ecosystem at the dependency level. Disposition: **EVALUATE ecosystem cost vs core primitive value** (often CITE-PATTERN-ONLY when ecosystem footprint disproportionate). Example: Wave 134 Fire 27-B langgraph (Pregel BSP graph execution is novel BUT requires `langchain-core>=1.4.0a2` + 6+ langgraph-* sub-package import + LangSmith proprietary recommended). Pattern B HNF disposition at `.claude/state/codex_consult_w134_f27b_langgraph_OUT.txt`.

    **Cite class for this 5-class lattice itself**: `constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 134 Fire 27-A + 27-B + 27-C codex T1 verdicts, TIER-2 @ existing cardinal-rule-12 scaffolding, TIER-2 @ `citation-discipline.md` rule #8 source-class reduction lattice precedent, TIER-1-DIRECT @ Anthropic + OpenAI + LangChain TIER-1 maintainer evidence]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `citation-discipline.md` rule #8 MIN_PRECEDENCE.

    **Application discipline**:
    - When auditing ANY upstream candidate for eee adoption, FIRST classify per 5-class lattice (after Probe DAG passes); THEN apply class-specific disposition
    - Class assignment is determined by **mechanism comparison** vs incumbent (not surface API similarity alone)
    - **PROVIDER-COMPLEMENT** vs **DUPLICATE-FUNCTIONALITY**: distinguished by whether both incumbents cover DIFFERENT scopes (PROVIDER-COMPLEMENT — both useful) or SAME scope (DUPLICATE — pick one)
    - **PARTIAL-OVERLAP** vs **PROVIDER-COMPLEMENT**: distinguished by whether the DIFFERENT MECHANISMS suggest parallel co-existence (PROVIDER-COMPLEMENT) or competing-implementations (PARTIAL-OVERLAP requires case-by-case)
    - **ECOSYSTEM-IMPORT** is the OPERATIONAL escape valve when a candidate's core primitive is novel but ecosystem footprint creates duplicate-frameworks concern

    **Sister-rule integration**:
    - `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` — verdict-disposition lattice (APPROVE/NEEDS-REVISION/REJECT/STUDY-PILOT-NARROW/STUDY-PILOT-PATTERN-EXTRACT/CITE-PATTERN-ONLY/REJECT-FOR-FIT/Pattern B HNF) maps to CR-12 lattice as follows:
      - GENUINELY-NEW → APPROVE / STUDY-PILOT-NARROW
      - DUPLICATE-FUNCTIONALITY → REJECT-FOR-FIT
      - PARTIAL-OVERLAP → CITE-PATTERN-ONLY / STUDY-PILOT-PATTERN-EXTRACT (typical)
      - PROVIDER-COMPLEMENT → STUDY-PILOT-PATTERN-EXTRACT (typical) OR STUDY-PILOT-NARROW
      - ECOSYSTEM-IMPORT → CITE-PATTERN-ONLY (typical) OR STUDY-PILOT-NARROW-WITH-VENV-ISOLATION

    Cite anchor: Wave 134 Fire 27-A + 27-B + 27-C empirical mapping; codification ship W134-F27-RESEARCH-ARCH-D 2026-05-10.
```

## Edit insertion plan

**Existing CLAUDE.md cardinal-rule-12 structure**:
```
12. **Upstream-install-priority over sibling-cite-import.** [PRIMARY/SECONDARY/TERTIARY priority order]
    [Cite-import-AMBER mandate]
    [CR-9 install-risk discipline applies at the cite-import fallback layer]
    [Operational integration with CR-10 + CR-11]
    ← INSERT HERE (new sub-section)
    [Wave 50 fire 9 Agent J upstream-parity verdict]
    [Cite anchor]
```

**Edit anchor**: the line containing "**Operational integration with CR-10 + CR-11**:" — INSERT new sub-section after this paragraph's closing line, before the "**Wave 50 fire 9 Agent J upstream-parity verdict (PROVISIONAL — drives fire 11 Section 14/14.5/13 row rewrites)**" line.

## Risk analysis

| Risk | Mitigation |
|---|---|
| CR-12 confusion (lattice vs source-priority-order) | Explicitly position lattice as ADDITIONAL to (not replacement for) source-priority order |
| Misclassification by future operators | Provide CLEAR examples + mechanism-comparison discipline |
| Sister-rule conflict with codex-t1-fix-forward-pattern.md | Explicit sister-rule mapping table |
| Cite-class drift | Explicit constituent + effective_tier disclosure |
| Cardinal-rule edit BLOCK risk | Codex T1 cross-model gate BEFORE edit (this fire) |

## Mia ladder advance

Pre-Fire-27-D: n=1881 (Fire 27-C close)
Post-Fire-27-D draft: **n=1888** (+7: 5-class lattice fully drafted with Wave 134 exemplars / sister-rule mapping table / cite class lattice + effective_tier disclosure / application discipline 4-rule decision tree / risk analysis with 5 mitigations / proposed insertion anchor at "Operational integration with CR-10 + CR-11" paragraph / ~50-70 LOC delta estimated)
