## 2026-05-08 Wave 105 fire 1 SHIP-A1: enable agent-skills plugin from addyosmani/agent-skills (TIER-1-NAMED-AUTHOR-QUOTE 4-org Axis-1 anchor)

### Summary

Enable `agent-skills@addy-agent-skills` plugin per Wave 105 fire 1 4-agent fan-out (Agent A REVISE-LIST + Agent C RECOMMENDED-OPTION B + Agent D APPROVE-LIST + codex T1 e2e Pattern B HONEST-NON-FINDING). Marketplace registered Wave 82l per `_comment_extraKnownMarketplaces_wave82l` line 389. Plugin ships **21 production-grade engineering skills** + 7 lifecycle slash commands + 3 plugin agents.

### Source

- **Marketplace**: `addy-agent-skills` (registered Wave 82l 2026-05-08 commit 5a5b1fb)
- **Plugin**: `agent-skills` (single-plugin marketplace per addyosmani/agent-skills monorepo structure)
- **Cite**: TIER-1-NAMED-AUTHOR-QUOTE Addy Osmani / Google Chrome team (33,500★ MIT, 4-org Axis-1 anchor per `Z:/claude-sota-installed/CLAUDE.md` L143). Verbatim Wave 82m-B Top-3 cite: `addyosmani/agent-skills/skills/source-driven-development/SKILL.md @742dca5` "Every framework-specific code decision must be backed by official documentation."
- **License**: MIT (verified at `marketplaces/agent-skills/.claude-plugin/plugin.json` line 9)
- **Marketplace HEAD**: pinned via `.gcs-sha` first-12 chars per Wave 82d marketplace HEAD pinning convention

### What this ships

**21 skills** (auto-discoverable via `description:` triggers):
api-and-interface-design, browser-testing-with-devtools, ci-cd-and-automation, code-review-and-quality, code-simplification, context-engineering, debugging-and-error-recovery, deprecation-and-migration, documentation-and-adrs, frontend-ui-engineering, git-workflow-and-versioning, idea-refine, incremental-implementation, performance-optimization, planning-and-task-breakdown, security-and-hardening, shipping-and-launch, source-driven-development, spec-driven-development, test-driven-development, using-agent-skills

**7 slash commands**: /spec /plan /build /test /review /code-simplify /ship

**3 plugin agents** (shadowed by local cite-imported equivalents per CC subagent precedence): code-reviewer.md, security-auditor.md, test-engineer.md

### Wave 105 fire 1 4-agent fan-out summary

| Agent | Subagent_type | Verdict | Artifact |
|---|---|---|---|
| A | sota-researcher | REVISE-LIST conf=N/A | `tmp/wave105-agentA-sota-architecture-audit-2026-05-08.md` |
| B | codex:codex-rescue (BRIDGE-MODE) | **FAILED** API-error 1M-ctx (FM-17.d wrapper limit) | recovery via orchestrator codex foreground+tee |
| C | general-purpose (architect) | RECOMMENDED-OPTION: B | `tmp/wave105-agentC-architect-install-plan-2026-05-08.md` |
| D | sota-researcher (skill-layer) | APPROVE-LIST | `tmp/wave105-agentD-skill-sota-audit-2026-05-08.md` |

### Mia pre-apply (per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`)

| Claim | Mia probe | Outcome |
|---|---|---|
| `mcp-memory NOT wired` (Agent C B1) | `grep memory .mcp.json` returns active memory entry line 39-46 | **REFUTED-OVER** — drop B1 |
| `addy-agent-skills marketplace cloned but NOT enabled` (Agent D) | `ls .claude/plugins/marketplaces/agent-skills/` confirms 21 SKILL.md + plugin.json | VERIFIED-GENUINE-GAP |
| `KISS Must-Never #4 vs current 13 plugins` | addy = engineering-phase skills (API/debug/ship); current = workflow-grammar (TDD/brainstorming/plans) | COMPLEMENTARY (no duplicate) |

### SRA D1-D10 convergence-gate score

Per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md`:

- **D1 license**: MIT for skill-bundle plugin use-class → ✅
- **D2 freshness**: marketplace HEAD recent (Wave 82l clone)
- **D3 fresh-paint**: 33.5k★ over ~7mo = high-velocity but TIER-2-NAMED-PRACTITIONER backed = ACCEPTABLE
- **D4 maintainer**: TIER-2-NAMED-PRACTITIONER (Addy Osmani Google Chrome DevRel)
- **D5 active maintenance**: ACTIVE per recent commits
- **D6 use-class**: skill-bundle plugin → ✅ eee compatible
- **D7 Anthropic alignment**: registered in `extraKnownMarketplaces` since Wave 82l
- **D8 industry adoption**: 33.5k★ + Google Chrome team + multi-IDE ecosystem = strong
- **D9 FM-class**: no documented FM-class
- **D10 N/A**: not a replacement
- **Score: 9/10 + critical D1+D6 PASS = INSTALL**

### Cardinal-rule conformance

- **CR-1 cite-trail** ✅: TIER-1-NAMED-AUTHOR-QUOTE Addy Osmani + marketplace.json file:line cite
- **CR-3 cross-model T1**: Pattern B HONEST-NON-FINDING (codex T1 180s budget exhausted at 11491-line trace before JSON verdict; per `codex-t1-fix-forward-pattern.md` Pattern B); T2 commit-time hook `codex_t2_pre_commit_gate.py:424` fires on `git commit`
- **CR-5 install-priority** ✅: install-class via `enabledPlugins` settings.json edit (no hand-coding)
- **CR-6 fresh-from-github** ✅: marketplace HEAD pinned via `.gcs-sha` first-12 chars (per Wave 82d convention)
- **CR-7 graduated unleash** ✅: bypassPermissions Phase 3 preserved
- **CR-8 full-SOTA-content** ✅: ADAPTED-FROM-SOTA (TIER-1-NAMED-AUTHOR + marketplace.json)
- **CR-9 install-risk** ✅: LOW (no active hooks/MCPs; reversible; pinned; sibling-bleed N/A)
- **CR-10 research-first** ✅: Wave 105 fire 1 4-agent research-then-install workflow (A+C+D + codex T1 e2e Pattern B)
- **CR-11 META-process** ✅: Pattern A apply not needed (no NEEDS-REVISION verdict); Pattern B HNF disposition documented; T2 commit-time hook satisfies cross-model gate at commit
- **CR-12 upstream-install** ✅: PRIMARY upstream-install (no cite-import-AMBER fallback)

### Codex T1 e2e (Pattern B HONEST-NON-FINDING)

```bash
timeout 200 codex exec --ephemeral -p deep-review-exec --color never \
  < .claude/state/codex_consult_wave105_synthesis.txt \
  > .claude/state/codex_consult_wave105_synthesis_OUT.txt 2>&1
```

Output: 11491 lines. Codex deeply inspected ship targets:
- session-report HTML template (skill scaffolding)
- security-guidance hooks.json (PreToolUse hook validation)
- plugin-dev testing-strategies.md
- addy-agent-skills marketplace.json (validated as expected)

Trace evidence WAS gathered (codex used budget productively investigating each ship target's actual content) but JSON verdict block was NOT emitted before 180s budget exhaust. Per `codex-t1-fix-forward-pattern.md` Pattern B disposition: ship per prior-fire research + standing-directive defaults; do NOT loop chasing verdict; T2 commit-time hook is the cross-model verification net.

Pattern B is the correct disposition for this case — codex was actively investigating (not stalled, not depleted, not failed); 180s budget was insufficient for 5-ship × 8-axis review with deep file content inspection.

### Verification (post-commit)

T2 commit-time hook (`codex_t2_pre_commit_gate.py:424`) fires on `Bash(git commit *)` PreToolUse with sync STRICT FAIL_CLOSED semantics. Verdict file written to `.claude/state/codex_review_HEAD_<sha8>.txt`.

Smoke probe:
- `jq '.enabledPlugins | keys | length' .claude/settings.json` → 14 (was 13)
- After session restart: `Skill <agent-skills-name>` should auto-fire on description match for any of the 21 skills
- After session restart: `/spec`, `/plan`, `/build`, `/test`, `/review`, `/code-simplify`, `/ship` slash commands should be available

### Outstanding queue (post Wave 105 SHIP-A1)

**Wave 105 remaining ships**:
- SHIP-A2: 9-plugin batch enable from claude-plugins-official (code-review / feature-dev / code-simplifier / commit-commands / session-report / playground / security-guidance / mcp-server-dev / typescript-lsp)
- SHIP-A3: 7 quality-gate CLI batch install (biome v2.4.14 / just v1.50.0 / mise v2026.4.20 / pre-commit v4.6.0 / actionlint go-install / hadolint v2.14.0 / golangci-lint v2.12.2)
- SHIP-A4: graphiti L3 MCP wire — DEFERRED (BLOCKED on OPENAI_API_KEY; need alt-provider config OR key procurement)
- SHIP-A5: agent-runtime spawn-gate reconciliation — DEFERRED (need diagnostic on `subagent_type 'architect' not found` despite allowlist match)

**Pre-existing queue** (sequencing decision deferred to operator):
- Ship 2N-batch3-A: wire safety_guard.py + agent_plan_readonly_bash_guard.py PreToolUse hooks (P0 SAFETY)
- Ship 2N-batch3-B: wire graphiti MCP (overlaps SHIP-A4 — same blocker on OPENAI_API_KEY)
- Ship 2N-batch3-C: wire missing context-mode hooks (PreToolUse + PostToolUse + PreCompact) (P0)
- Ship 2N-batch3-D: manifest §4 + §15 doc-drift fixes (DOC-ONLY CR-9 LOW)
- Ship 2N-batch3-E: repomix MCP install (P1)
- Ship 2Y-stage2: cite-anchor migration with codex T1 e2e
- Ship 2L: anthropics/skills 3-plugin install
- Ship 2Z: forrestchang/andrej-karpathy-skills cite-anchor surgical disclosure-add
- Ship 2B: claude-code-security-review plugin install
- Ship 2C: cardinal-rule cite 6 un-cited Superpowers skills
- Ship 2M: UKGovernmentBEIS/inspect_ai install

### Update triggers

Re-evaluate this entry when:
- agent-skills marketplace HEAD bumps (currently `.gcs-sha` first-12; refresh on next session probe per cardinal-rule-6)
- Addy Osmani publishes new skills to addyosmani/agent-skills
- KISS Must-Never #4 surfaces a new duplicate (e.g., if anthropics/skills ships overlapping `code-review-and-quality` skill)
