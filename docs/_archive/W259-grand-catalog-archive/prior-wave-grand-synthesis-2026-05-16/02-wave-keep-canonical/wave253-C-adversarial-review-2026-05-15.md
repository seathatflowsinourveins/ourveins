# Wave 253 Agent C Adversarial Review - W251 GRAND-SYNTHESIS + W237 CATALOG-FINAL

As-of probe date: 2026-05-15/2026-05-16 UTC boundary. Inputs reviewed:
- Agent A audit path: `tmp/wave253-A-prior-research-audit-and-rubric-2026-05-15.md` was absent.
- Agent B discovery: `tmp/wave253-B-fresh-discovery-bridge-2026-05-15.md` was present and reviewed.
- Background Agent C partial output path existed but read as empty.

## ADVERSARIAL FINDINGS

1. **Axis 1 - LICENSE BLOCKERS missed.** Agent B promoted `firecrawl/firecrawl` as ADOPT-NOW with `license=NOASSERTION`, but live `gh api repos/firecrawl/firecrawl` reports `license=AGPL-3.0`, `pushed_at=2026-05-15T22:04:57Z`, `stars=120336`. This is a hard DEFER under the brief's AGPL/GPL/SSPL rule. B's D4=5 and Total=8.7 are invalid; D4 must be 0 and disposition must be DEFER.

2. **Axis 1 - license scoring pipeline is unreliable.** Several ADOPT-NOW rows were scored as `NOASSERTION` despite live GitHub metadata returning permissive licenses: `openai/openai-agents-python` MIT, `langchain-ai/deepagents` MIT, `openai/codex` Apache-2.0, `docling-project/docling` MIT, `ChromeDevTools/chrome-devtools-mcp` Apache-2.0, `oraios/serena` MIT, `yamadashy/repomix` MIT. This creates both false negatives and false positives; `firecrawl` proves the false-positive side is material.

3. **Axis 2 - STALE verdicts.** No ADOPT-NOW repo in B's top-13 appears stale by pushed_at >180d. The freshness failure is subtler: B equates high commit count with adoptability and does not require release/changelog review. `hesreallyhim/awesome-claude-code` was pushed 2026-04-27, within 180d, but it is an awesome-list/index, not an install primitive.

4. **Axis 3 - STAR inflation.** B did not promote <500-star repos as ADOPT-NOW, so the literal <500-star issue is not present. However, B allowed star-heavy aggregators to outrank installable runtime artifacts. `hesreallyhim/awesome-claude-code` and similar awesome lists should be discovery inputs only, regardless of stars.

5. **Axis 4 - NATIVE-CC-PATH absent or inflated.** B repeatedly assigns D5=10 to weak inferred paths. `openai/openai-agents-python` contains `.agents/skills`, not `.claude/` or a Claude Code plugin. `langchain-ai/deepagents` has `.mcp.json`, `AGENTS.md`, and examples, but not a proven pure-runtime install path. `docling-project/docling` is primarily a CLI/library and B's "CLI callable from CC hooks" is not a native CC path. These should be STUDY-PILOT until a manifest/plugin/MCP wiring plan is verified.

6. **Axis 5 - DUPLICATE FUNCTIONALITY under-scored.** `yamadashy/repomix`, `oraios/serena`, `anthropics/claude-plugins-official`, `openai/codex`, `ccusage`, `context7`, and Playwright-class MCPs are already installed or represented in the sss runtime manifest. B's ADOPT-NOW list should distinguish NEW-ADOPT from REFRESH/AUDIT/ALREADY-INSTALLED. As written, it risks reinstall churn and duplicate primitive drift.

7. **Axis 6 - LLMLingua contamination.** B correctly excluded LLMLingua and explicitly says so in the method and token-context notes. No contamination found.

8. **Axis 7 - volcengine/OpenViking.** B correctly DEFER'd `volcengine/OpenViking` despite strong stars/freshness/native Claude Code memory plugin evidence, because live metadata is AGPL-3.0. This was handled correctly.

9. **Axis 8 - missed 2026-May high-signal repos.** B missed multiple stronger native-CC surfaces:
   - `anthropics/skills`: 135192 stars, fresh 2026-05-15, `.claude-plugin` + `skills/**/SKILL.md`; official Anthropic skill marketplace surface. License metadata is null, so STUDY-PILOT/POLICY-REVIEW before adopt.
   - `obra/superpowers`: 192887 stars, MIT, fresh 2026-05-14, `.claude-plugin`, `.codex-plugin`, `.cursor-plugin`, `.opencode/plugins`, `skills/**`; already installed via `claude-plugins-official`, so REFRESH/AUDIT not net-new adopt.
   - `addyosmani/agent-skills`: 42108 stars, MIT, fresh 2026-05-14, `.claude-plugin`, `.claude/commands`, workflow skills; already manifest-discussed and should be REFRESH/STUDY-PILOT due duplicate-fit concerns.
   - `openai/codex-plugin-cc`: 18773 stars, Apache-2.0, pushed 2026-04-18, direct Claude Code plugin for Codex. B used `openai/codex` but missed the actual Claude Code plugin repo.
   - `anthropics/cwc-long-running-agents`: 317 stars, Apache-2.0, fresh 2026-05-13, direct `claude-code-config/.claude/{agents,hooks,settings.json}`. This is below 500 stars but has named-org official Anthropic justification and should be included as high-signal STUDY-PILOT/ADOPT-CANDIDATE depending duplicate analysis.
   - `modelcontextprotocol/registry`: 6816 stars, fresh 2026-05-14, MCP registry/publisher surface. Important for marketplace provenance even if not an install primitive.

10. **Axis 9 - D1-D10 scoring anomalies.** D4 is wrong for `firecrawl` and under-informative for many permissive repos. D5 is over-scored for "manual integration" and generic CLI use. D6/D10 are circular: repos get high convergence because B already inferred native fit. D2 caps at 100 commits/month, causing high-velocity ties and hiding quality/release cadence distinctions. D8 "autonomy" is assigned 9 to frameworks but 5 to operationally useful CLIs without a consistent rule.

11. **Axis 10 - ADOPT-NOW over-claims.** B's ADOPT-NOW threshold is too permissive. ADOPT-NOW should mean license-cleared, native install path verified, not already installed unless explicitly a refresh, and no unresolved permission-boundary risk. B often means "worth examining now", which is STUDY-PILOT.

12. **Input integrity issue.** Agent A was missing and background Agent C partial was empty. B's report itself includes `STAND-IN-NOTICE` for codex subprocess OS error 5, so the combined review corpus lacks an independent nested Codex verdict for B. Confidence should be DONE_WITH_CONCERNS, not clean DONE.

## ADOPT-NOW CHALLENGES

- `firecrawl/firecrawl`: **ADOPT-NOW -> DEFER.** Hard AGPL-3.0 blocker by live GitHub metadata.
- `openai/openai-agents-python`: **ADOPT-NOW -> STUDY-PILOT.** Strong MIT/OpenAI repo, but B's "Claude Code plugin/skill/command surface" is not verified; tree shows `.agents/skills`, not a Claude Code-native plugin.
- `langchain-ai/deepagents`: **ADOPT-NOW -> STUDY-PILOT.** MIT and fresh, but native CC path is example/config level, not a proven pure-runtime primitive.
- `yamadashy/repomix`: **ADOPT-NOW -> ALREADY-INSTALLED/REFRESH-AUDIT.** Good MIT primitive, but already in runtime token/code-intel layer; avoid duplicate adoption framing.
- `openai/codex`: **ADOPT-NOW -> ALREADY-INSTALLED/REFRESH-AUDIT for CLI; add `openai/codex-plugin-cc` as the native CC source.** B picked the broad CLI repo but missed the plugin repo.
- `anthropics/claude-plugins-official`: **ADOPT-NOW -> ALREADY-INSTALLED/REFRESH-AUDIT.** Existing manifest shows 18 enabled + 5 disabled plugins from this marketplace.
- `docling-project/docling`: **ADOPT-NOW -> STUDY-PILOT.** MIT and useful document ingestion, but CLI/library callable does not satisfy native CC path by itself.
- `ChromeDevTools/chrome-devtools-mcp`: **ADOPT-NOW -> STUDY-PILOT or REFRESH-AUDIT.** Apache-2.0 and native MCP path are strong, but B did not compare against already-installed Playwright/browser MCP coverage and permission boundaries.
- `oraios/serena`: **ADOPT-NOW -> ALREADY-INSTALLED/REFRESH-AUDIT.** Strong MIT MCP/code-intel primitive, already installed as part of the token-efficiency/code-intel layer.
- `hesreallyhim/awesome-claude-code`: **ADOPT-NOW -> DISCOVERY-ONLY.** Awesome list with NOASSERTION license metadata; not an install primitive.
- `wshobson/agents`: **ADOPT-NOW -> STUDY-PILOT.** MIT and native plugin layout found, but likely overlaps with ECC/official plugin agent surfaces; requires duplicate/functionality map before import.
- `alirezarezvani/claude-skills`: **ADOPT-NOW -> STUDY-PILOT.** MIT and has `.claude-plugin`/commands plus `.codex-plugin`, but third-party skill bundle should pass duplicate namespace and quality review before runtime import.
- `jarrodwatts/claude-hud`: **ADOPT-NOW -> STUDY-PILOT-HIGH.** MIT and native plugin files verified; still needs permission, hook, and UI/runtime blast-radius review before pure-runtime adoption.

## MISSED HIGH-SIGNAL REPOS

| Repo | Probe | Why It Matters | Recommended Disposition |
|---|---|---|---|
| `anthropics/skills` | 135192 stars, license null, pushed 2026-05-15, `.claude-plugin`, `skills/**/SKILL.md` | Official Anthropic skill corpus; stronger native CC signal than many B ADOPT rows | STUDY-PILOT/POLICY-REVIEW |
| `obra/superpowers` | 192887 stars, MIT, pushed 2026-05-14, `.claude-plugin`, `.codex-plugin`, skills | Cross-agent skill/plugin surface; already installed via official bundle | REFRESH/AUDIT |
| `addyosmani/agent-skills` | 42108 stars, MIT, pushed 2026-05-14, `.claude-plugin`, `.claude/commands` | Named-author workflow skills with direct CC layout | STUDY-PILOT or REFRESH after duplicate gate |
| `openai/codex-plugin-cc` | 18773 stars, Apache-2.0, pushed 2026-04-18 | The actual Claude Code plugin for Codex; better target than generic `openai/codex` for native CC | REFRESH/AUDIT |
| `anthropics/cwc-long-running-agents` | 317 stars, Apache-2.0, pushed 2026-05-13, `.claude` config/hooks/agents | Low-star but official Anthropic exception; directly relevant to long-running agent runtime arc | STUDY-PILOT-HIGH |
| `modelcontextprotocol/registry` | 6816 stars, NOASSERTION, pushed 2026-05-14 | MCP registry/provenance surface for future installs | STUDY-PILOT |
| `idosal/git-mcp` | 8081 stars, Apache-2.0, pushed 2026-05-08 | Git-to-MCP knowledge surface; may complement GitNexus/DeepWiki but needs duplicate review | STUDY-PILOT |

## VERDICT

verdict_one_line: DONE_WITH_CONCERNS: Agent B caught LLMLingua and OpenViking correctly, but missed a hard AGPL blocker on Firecrawl, over-scored inferred/native paths, failed to separate already-installed primitives from net-new adoption, and missed several stronger official/native Claude Code repositories.
