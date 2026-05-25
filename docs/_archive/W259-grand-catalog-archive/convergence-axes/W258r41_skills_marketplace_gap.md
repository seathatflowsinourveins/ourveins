# W258r41 — Skills Marketplace Gap Audit (2026-05-16)

**Verdict: PARTIAL-GAP — 3 confirmed install picks + 1 conditional + verification needed on subset coverage** (confidence 0.83).

## §1 Skills marketplaces inventoried (8)

| Marketplace | URL | Status | Operator has? |
|---|---|---|---|
| anthropics/skills | github.com/anthropics/skills | OFFICIAL — pdf/docx/xlsx/pptx/mcp-builder/artifacts-builder/webapp-testing/skill-creator/template-skill | Partial (via `example-skills@anthropic-agent-skills`, `skill-creator@claude-plugins-official`) |
| anthropics/claude-plugins-official | github.com/anthropics/claude-plugins-official | OFFICIAL plugin directory | YES (operator has 14+ from this) |
| obra/superpowers | github.com/obra/superpowers | TIER-2 named author | YES (`superpowers@claude-plugins-official` + `superpowers-marketplace`) |
| obra/superpowers-skills | github.com/obra/superpowers-skills | obra community skills | Likely YES (via superpowers plugin) |
| **obra/superpowers-lab** | github.com/obra/superpowers-lab | obra EXPERIMENTAL skills | **NO — gap** |
| **obra/superpowers-chrome** | github.com/obra/superpowers-chrome | obra Chrome DevTools plugin | **NO — gap** |
| wshobson/agents | github.com/wshobson/agents | wshobson multi-agent | Indirect via `claude-code-workflows` plugins |
| karanb192/awesome-claude-skills | curated 50+ skills | TIER-3 curator | (catalog — not install) |

No official `anthropics/claude-skills` repo exists. Skills ship via `anthropics/skills` (now likely under `claude-cookbooks`/`claude-quickstarts` per r39 rename) and `anthropics/claude-plugins-official`.

## §2 GENUINELY-MISSED skills with ≥2-axis convergence

| Skill | Source | Role | Value-add vs operator stack | Install |
|---|---|---|---|---|
| **`obra/superpowers-chrome`** | TIER-2 obra | Browser plugin | Distinct from chrome-devtools-MCP + Playwright-MCP — auto-capture HTML/MD/screenshot/DOM-summary in single tool, **explicit Windows 11 verification badge**, zero-deps, 17-cmd CLI. Closes gap of MCP-vs-skill duplication. | `/plugin install superpowers-chrome@superpowers-marketplace` |
| **`obra/superpowers-lab/windows-vm`** | TIER-2 obra experimental | Windows VM provisioning | Operator runs Windows 11 Z:-portable — Docker+KVM Windows VM for testing/cross-platform validation, automated OpenSSH+Node+CC install inside VM | clone superpowers-lab; uses `windows-vm` skill |
| **`obra/superpowers-lab/mcp-cli`** | TIER-2 obra experimental | On-demand MCP | Invoke MCP servers WITHOUT permanent .mcp.json entry — reduces context burden of operator's 12 MCPs by allowing exploratory/one-off usage | clone superpowers-lab; uses `mcp-cli` skill |
| **`anthropics/skills` — pdf/docx/xlsx/pptx** | TIER-1 Anthropic-OFFICIAL | Document processing | If operator's `example-skills` subset doesn't include these, they're high-value Anthropic-official document skills with `code_execution_20250825` integration | clone from `anthropics/skills` |

## §3 Operator's well-covered axes (no action)

- TDD / debugging / git-worktrees / brainstorming / writing-plans / requesting-code-review / subagent-driven-development → covered via `superpowers@claude-plugins-official`
- Multi-agent orchestration / parallel-reviewer / sectioning / context-management → covered via `agent-teams` + `agent-orchestration` + `comprehensive-review` plugins
- Plan/spec authoring / feature-dev / code-simplification / code-review / pr-review-toolkit → covered via dedicated plugins
- Frontend design / shell-scripting / commit-commands / session-report → covered

## §4 Top-3 install recommendations (by value × effort)

1. **`obra/superpowers-chrome`** (highest leverage — Windows-verified, distinct shape from operator's existing chrome MCPs, auto-capture is a true productivity unlock not in current stack)
2. **`obra/superpowers-lab/mcp-cli`** (reduces operator's 12-MCP context burden via on-demand pattern — direct r33 "Tool search" alternative for local CC use)
3. **Verify `anthropics/skills` pdf/docx/xlsx/pptx coverage** in operator's existing `example-skills@anthropic-agent-skills` plugin — if subset missing, clone directly (Anthropic-OFFICIAL document processing skills)

**Out-of-scope flag:** karanb192's list (and similar awesome-curators) name 50+ skills but ~80% are sourced from obra/superpowers or anthropics/skills — operator's coverage is mostly via those upstream plugins, not the curator lists themselves.

Confidence 0.83. Sources: github.com/anthropics/claude-plugins-official + github.com/obra/superpowers{,-skills,-lab,-chrome,-marketplace} + github.com/karanb192/awesome-claude-skills + github.com/wshobson/agents.
