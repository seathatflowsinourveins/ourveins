## 2026-05-08 Wave 105 fire 1 SHIP-A2: 7-plugin batch enable from claude-plugins-official

**Plugins enabled** (Anthropic OFFICIAL TIER-1 marketplace):
1. `code-review@claude-plugins-official` — multi-agent code review w/ confidence scoring (complementary to pr-review-toolkit + superpowers/requesting-code-review per kiss-dry-yagni Must-Never #4 PASS)
2. `feature-dev@claude-plugins-official` — feature dev workflow w/ codebase exploration + architecture agents
3. `code-simplifier@claude-plugins-official` — refactor agent for clarity/maintainability
4. `commit-commands@claude-plugins-official` — git commit/push/PR commands
5. `session-report@claude-plugins-official` — HTML session usage report (Karpathy §5 compounding-surface aligned)
6. `playground@claude-plugins-official` — interactive HTML playgrounds
7. `mcp-server-dev@claude-plugins-official` — MCP server design skills (CR-11 META-process)

**Trimmed from Agent D Top-9 → 7** (DEFERRED for cause):
- `security-guidance` — already DEFERRED per Wave 104 `_comment_wave104_ship2n_batch2`: hardcoded `/tmp/security-warnings-log.txt` cross-platform Windows-Git-Bash incompatibility + PreToolUse:Edit per-edit token cost. Tracked at task #46 batch3-A queue.
- `typescript-lsp` — DEFERRED out of caution: LSP daemon adds runtime daemon risk; defer until per-project use surfaces.

**SRA D1-D10 score**: 10/10 each + critical D1+D6 PASS = INSTALL. All Anthropic OFFICIAL Tier-1 maintainer + MIT/Apache-2.0 license + plugin use-class eee-compatible.

**KISS Must-Never #4 PASS** per Agent D DIM 1:
- code-review NOT duplicate of pr-review-toolkit (different scope)
- code-simplifier UNIQUE (no current refactor agent)
- commit-commands command-class NOT duplicate of superpowers/finishing-a-development-branch workflow-style
- mcp-server-dev NOT duplicate of plugin-dev (MCP-specific)
- All 7 ship agents/commands/skills — no plugin-level hooks/MCPs (CR-9 LOW)

**Cross-model gate**: Wave 105 fire 1 codex T1 e2e Pattern B HONEST-NON-FINDING per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern B; T2 commit-time hook fires on this commit.

**CR conformance**: CR-1 cite-trail ✅ (marketplace.json file:line + Agent A/C/D artifacts) | CR-3 cross-model T1 — Pattern B HNF, T2 fires on commit | CR-5 install-priority ✅ enabledPlugins block | CR-6 fresh-from-github ✅ marketplace HEAD pinned `.gcs-sha` | CR-7 graduated unleash ✅ Phase 3 preserved | CR-8 ADAPTED-FROM-SOTA ✅ | CR-9 install-risk LOW ✅ (no hooks/MCPs/daemons) | CR-10 research-first ✅ Wave 105 fire 1 4-agent fan-out | CR-11 META-process ✅ Pattern B HNF documented; T2 hook fires | CR-12 upstream-install ✅ PRIMARY upstream-install

**Plugin count**: 14 → 21 (+7).

**Cite**: marketplace.json @ `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/.claude-plugin/marketplace.json` + Wave 105 Agent D `tmp/wave105-agentD-skill-sota-audit-2026-05-08.md` DIM 1 (APPROVE-LIST) + Agent A `tmp/wave105-agentA-sota-architecture-audit-2026-05-08.md` (REVISE-LIST) + Agent C `tmp/wave105-agentC-architect-install-plan-2026-05-08.md` (RECOMMENDED-OPTION B) + synthesis `tmp/wave105-synthesis-2026-05-08.md`.

**Outstanding Wave 105 ships**:
- SHIP-A3: 7 quality-gate CLI batch install (biome v2.4.14 / just v1.50.0 / mise v2026.4.20 / pre-commit v4.6.0 / actionlint go-install / hadolint v2.14.0 / golangci-lint v2.12.2)
- SHIP-A4 graphiti MCP wire — DEFERRED (BLOCKED OPENAI_API_KEY)
- SHIP-A5 agent-runtime reconciliation — DEFERRED

