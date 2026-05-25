# W258 Operator Handbook v1 — Apply the SOTA Architecture

> **2026-05-16** · Companion to `W258-final-synthesis-2026-05-16-v6.md`
> Goal: walk a busy operator through applying the v6 architecture in **≤90 minutes**, all reversible. Every step has a rollback line. Windows 11 PowerShell-correct.

---

## ⚡ 90-minute critical path

```
§1  Commit architecture deliverable           5 min
§2  Pin MCP versions (phoenix, ccusage)      10 min
§3  Expand secrets boundary (.claude/settings.json)  15 min
§4  Refresh AGENTS.md                         15 min
§5  Install 3 r41 picks                       15 min
§6  LiteLLM proxy setup (OPTIONAL)            15 min
§7  Promptfoo pilot on one flow               15 min
                                              ----------
                                              90 min total (≤75 without §6)
```

---

## §1 Commit the architecture deliverable (5 min)

```powershell
cd Z:\claude-sota-installed
git status                                          # confirm docs/architecture/ is the only major untracked addition
git add docs/architecture/
git commit -m "W258 final SOTA agent-runtime architecture v6 + 4 codex audits + 42-fork convergence data"
```

**Rollback:** `git reset HEAD~1`     (un-commits; files remain on disk)

---

## §2 Pin MCP versions (10 min)  — *closes r40 finding*

Two MCP servers are unpinned in `.mcp.json` and need explicit version pins per cardinal-rule-9 reversibility:

```powershell
# Backup first
Copy-Item .mcp.json .mcp.json.bak

# Open .mcp.json and locate the "phoenix" and "ccusage" entries.
# For "phoenix": add "version": "<the pip-installed version>" to args; or pin the npm/uvx ref.
# For "ccusage": same pattern + verify maintainer provenance per L0.5 cardinal-rule #6.

# Confirm currently-installed phoenix version:
pip show arize-phoenix 2>$null | Select-String "^Version"

# Confirm currently-installed ccusage version (if npm):
npm list -g | Select-String "ccusage"
```

**Rollback:** `Copy-Item .mcp.json.bak .mcp.json -Force`

---

## §3 Expand secrets boundary in `.claude/settings.json` (15 min) — *closes v6 L0.5*

Add the following paths to the `permissions.deny` array (operator currently has 7; v6 L0.5 adds 12+):

```jsonc
// In .claude/settings.json under "permissions.deny" append:
  "Read(./.aws/**)",
  "Read(./.azure/**)",
  "Read(./.gcloud/**)",
  "Read(./.kube/**)",
  "Read(./.ssh/**)",
  "Read(./.docker/config.json)",
  "Read(./.npmrc)",
  "Read(./.git-credentials)",
  "Read(./.codex/**)",
  "Read(./*.kdbx)",
  "Read(./*.tfstate)",
  "Read($env:USERPROFILE/AppData/Roaming/Microsoft/Windows/PowerShell/PSReadLine/ConsoleHost_history.txt)"
```

```powershell
Copy-Item .claude\settings.json .claude\settings.json.bak
# Apply the edits with your editor or via Edit tool, then validate JSON:
Get-Content .claude\settings.json | ConvertFrom-Json | Out-Null
echo "JSON valid: $($?)"
```

**Rollback:** `Copy-Item .claude\settings.json.bak .claude\settings.json -Force`

Also: **narrow** the Bash allowlist for `git clone` from blanket `https://github.com/*` to specific orgs (anthropics, openai, modelcontextprotocol, obra, getzep, BerriAI). And consider migrating `bypassPermissions: true` → **Claude Code auto mode** (Mar 25 2026, requires Max/Team/Enterprise/API — operator on Pro+Max ✓).

---

## §4 Refresh AGENTS.md (15 min) — *operator already has it at 15K*

```powershell
Copy-Item AGENTS.md AGENTS.md.bak

# Verify it references:
#   1. The W258 v6 architecture document path
#   2. AAIF (Linux Foundation Agentic AI Foundation, Dec 2025)
#   3. MCP spec 2025-11-25 + Streamable HTTP
#   4. Code with Claude 2026 (May 6) primitives: Managed Agents / Advisor / Tool search / Compaction API / Adaptive thinking / Claude Code auto mode
#   5. Repo names: claude-cookbooks / claude-quickstarts (NOT anthropic-cookbook / anthropic-quickstarts)
#   6. codex CLI 0.130.0 remote-control mode for cross-model gate
```

**Rollback:** `Copy-Item AGENTS.md.bak AGENTS.md -Force`

---

## §5 Install 3 r41 picks (15 min)

```powershell
# (a) obra/superpowers-chrome — Chrome auto-capture w/ Windows 11 verified
git clone https://github.com/obra/superpowers-chrome Z:\repos\deps\superpowers-chrome
# Follow its README for skill registration into Claude Code

# (b) obra/superpowers-lab — contains mcp-cli (on-demand MCP without permanent .mcp.json)
git clone https://github.com/obra/superpowers-lab Z:\repos\deps\superpowers-lab
# Operator-relevant subdir: superpowers-lab/mcp-cli
# This is the direct local-CC alternative to Tool search tool for reducing 12-MCP context burden.

# (c) Verify anthropics/skills covers pdf/docx/xlsx/pptx
git clone https://github.com/anthropics/skills Z:\repos\deps\anthropics-skills
Get-ChildItem Z:\repos\deps\anthropics-skills -Recurse -Filter "*.pdf*" | Select-Object -First 5
# If missing skills found, register them via /plugin install or skill-creator workflow
```

**Rollback:** `Remove-Item -Recurse -Force Z:\repos\deps\superpowers-chrome, Z:\repos\deps\superpowers-lab, Z:\repos\deps\anthropics-skills`

---

## §6 LiteLLM proxy setup (15 min) — *OPTIONAL; only for 5-tier cascade*

```powershell
# Install
pipx install litellm

# Use the validated YAML from .claude/state/W258r30_codex_followups.md §1
# (5-tier cascade: Haiku → Sonnet → Opus → GPT-5.5 → DeepSeek V4 escape-valve)
# Save as Z:\claude-sota-installed\.claude\litellm-cascade.yaml

# Start proxy
Start-Process -NoNewWindow litellm -ArgumentList "--config", ".claude/litellm-cascade.yaml", "--port", "4000"

# Switch Claude Code to route through it (reversible env switch):
$env:ANTHROPIC_BASE_URL = "http://localhost:4000"
# Restart eee for changes to take effect
```

**Rollback:** `Remove-Item Env:\ANTHROPIC_BASE_URL ; Stop-Process -Name litellm -ErrorAction SilentlyContinue`

---

## §7 Promptfoo pilot on one critical flow (15 min) — *closes evals-first 4-T2 convergence*

```powershell
npm install -g promptfoo

# Use the runnable config from .claude/state/W258r30_codex_followups.md §6
# Save as .claude/promptfooconfig.yaml (~30 LOC, 5 test cases, llm-rubric assertions)

# Run the pilot eval
promptfoo eval -c .claude\promptfooconfig.yaml --output .claude\state\promptfoo-baseline.json

# Wire into pre-commit / GitHub Actions if desired (per v6 §7 pattern)
```

**Rollback:** `npm uninstall -g promptfoo ; Remove-Item .claude\promptfooconfig.yaml -ErrorAction SilentlyContinue`

---

## ⏳ 90-day watchlist (no action this session)

```powershell
# (1) PostCompact hook PR on claude-agent-sdk-python — Compaction API → CC migration trigger
Start-Process "https://github.com/anthropics/claude-agent-sdk-python/pulls?q=is%3Aopen+postcompact"

# (2) MCP spec next-version SEPs: 1576 (token bloat), 1821 (dynamic tool search), 2268 (subtasks)
Start-Process "https://github.com/modelcontextprotocol/specification/pulls"

# (3) Tool search GA expansion to Claude Code local MCP layer
Start-Process "https://docs.claude.com/en/release-notes/overview"

# (4) Claude Code auto mode expanding to Pro plan
Start-Process "https://docs.claude.com/en/auto-mode-config"
```

Trigger criterion: if any of these lands GA → revisit v6 §4 L1 + §6 operator-fit fixes.

---

## 🛑 DO NOT DO — REJECT list from v6 §9

| DO NOT install | Reason |
|---|---|
| `multica-ai/multica` | Modified Apache-2.0 with SaaS+branding restrictions — not commercial-safe |
| `bmad-code-org/BMAD-METHOD` | 46k★ but heavy install collides with operator's 37 plugins |
| `eyaltoledano/claude-task-master` | Context-flood risk + multi-IDE-not-CC-native |
| `ruvnet/claude-flow` (ruflo) | Swarm pattern 0/3 axes + 0 production + 0 named-T2 |
| `microsoft/autogen` | Microsoft moved to maintenance; replaced by Agent Framework 1.0 |
| `langchain-ai/langchain` as runtime | Multiple public post-mortems |
| Devin standalone (Cognition) | Jan 2026 own pivot admits autonomy under-delivered |
| `RooCodeInc/Roo-Code` | Archived 2026-05-15 — use ZooCode fork or Cline |
| `stackblitz/bolt.new` (OSS) | 17 months stale; product is closed-source SaaS |
| `FoundationAgents/MetaGPT` | 4 months cooling at 68k stars |
| `daytonaio/daytona` | AGPL-3.0 license blocker |
| `Skyvern-AI/skyvern` | AGPL-3.0 license blocker |
| `OpenInterpreter/01` | AGPL-3.0 + voice not GUI (operator-fit) |
| `instructor-ai/instructor` / BAML / Mirascope | Anthropic native `output_config.format` is now SOTA |
| `microsoft/lmql` / TextGrad | 10-12 months stale |
| `outlines-dev/outlines` / `guidance-ai/guidance` | Logit-bias n/a on Claude API |
| `e2b-dev/mcp-server` | DEPRECATED per repo banner |
| `modelcontextprotocol/server-postgres` + `server-sqlite` | ARCHIVED — use Neon/Neo4j MCPs |
| Langfuse (at operator scale) | DRY with Phoenix; install only at >10 RPS / >3 concurrent CC |
| Durable-execution layer (Temporal/Inngest) | Over-built at solo+5-task scale; cron + ScheduleWakeup + JSON-state is right shape |
| Self-host inference (vLLM/SGLang) | 1000× below break-even; use DeepSeek V4 Anthropic-endpoint instead |

---

## 📚 Reference

- **Architecture (canonical):** `docs/architecture/W258-final-synthesis-2026-05-16-v6.md`
- **Convergence data (33 source files):** `docs/architecture/W258-multi-axis-convergence-2026-05-16/`
- **Codex audit trail:** `.claude/state/codex_consult_w258_{e2e,v3,v4,v5}_audit_OUT.txt` (4 audits)
- **r30 validated configs:** LiteLLM YAML + Promptfoo pilot config
- **r36 MCP spec 2025-11-25:** verify all 12 installed MCPs against deprecation list
- **r41 skills marketplace gap:** the 3 install picks above

If any step fails: each section has a 1-line rollback. The architecture is fully reversible; nothing here forces a one-way migration.
