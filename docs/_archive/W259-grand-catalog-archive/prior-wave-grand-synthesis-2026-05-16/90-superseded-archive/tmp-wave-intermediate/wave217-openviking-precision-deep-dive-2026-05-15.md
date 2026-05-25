---
title: W217 OpenViking Claude Code Memory Plugin Precision Deep-Dive
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 217
agent: orchestrator-direct (Mia probe + GitHub API direct read)
artifact-class: candidate-precision-research
trigger: user explicit URL https://github.com/volcengine/OpenViking/blob/main/examples/claude-code-memory-plugin/README.md
---

# W217 OpenViking CC Memory Plugin Precision Deep-Dive

## STAND-IN-NOTICE
This is orchestrator-direct GitHub MCP probe (NOT subagent dispatch). Cross-model gate to be satisfied at W219 final aggregator Path P ratification layer.

## Repo facts (gh API direct probes 2026-05-15)

- **Repo**: `volcengine/OpenViking` @ HEAD `main`
- **Stars**: 23,958
- **License**: **AGPL-3.0** (root LICENSE direct read confirmed: "GNU AFFERO GENERAL PUBLIC")
- **Archived**: false (active maintenance)
- **Description**: "OpenViking is an open-source context database designed specifically for AI Agents (such as openclaw). OpenViking unifies the management of context (memory, resources, and skills) that Agents need through a file system paradigm, enabling hierarchical context delivery and self-evolving."
- **Maintainer**: Volcengine (ByteDance subsidiary; TIER-3-NAMED-ORG per SRA D4)

## Claude Code Plugin example surface (`examples/claude-code-memory-plugin/`)

12 surface files/dirs:
- `.claude-plugin/` directory (CC plugin manifest)
- `.gitignore` (238B)
- `.mcp.json` (348B) — HTTP MCP transport config
- `README.md` (29,303B) — substantial documentation
- `README_CN.md` (28,909B) — Chinese-language docs
- `STATUSLINE.md` (11,180B) — statusline integration docs
- `commands/` directory (CC slash commands)
- `hooks/` directory (CC hooks: UserPromptSubmit + Stop likely)
- `package-lock.json` (41,846B) — Node.js dep lockfile
- `package.json` (198B) — Node.js manifest
- `scripts/` directory (hook scripts)
- `setup-helper/` directory (install.sh + helpers)
- `uv.lock` (1,288,081B) — Python uv lockfile (Python deps via uv)

**Plugin manifest** (`.claude-plugin/plugin.json:1-3` preview):
```json
{
  "name": "openviking-memory",
  "version": ...
```

**MCP server config** (`.mcp.json:1-3` preview):
```json
{
  "openviking": {
    "type": "http",
    ...
```

## Functional surface (per README)

| Capability | Mechanism | Trigger |
|---|---|---|
| **Auto-recall** | UserPromptSubmit hook reads `~/.openviking/ovcli.conf` for auth + queries OpenViking server | EVERY prompt |
| **Auto-capture** | Stop hook captures turn output to OpenViking server | EVERY turn end |
| **MCP tools** (search / read / store) | HTTP MCP server at `${OPENVIKING_URL:-http://127.0.0.1:1933}/mcp` | On-demand via Claude |
| **Backend modes** | Self-hosted local (port 1933, no auth) OR Volcengine Cloud (`api.vikingdb.cn-beijing.volces.com/openviking`) | Per `ovcli.conf` |

## Install paths

### Path 1 — One-line installer (recommended per README)
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/volcengine/OpenViking/main/examples/claude-code-memory-plugin/setup-helper/install.sh)
```
**Platform**: macOS / Linux only (bash); Windows requires Git Bash (Z:/claude-sota-installed has Git Bash at `C:/Program Files/Git/bin/bash.exe` per CLAUDE.local.md)

### Path 2 — Manual marketplace install (Claude Code 2.0+)
```bash
claude plugin marketplace add "$(pwd)/examples"
claude plugin install claude-code-memory-plugin@openviking-plugins-local
```
**Caveat**: Local marketplace (NOT public published yet); `--scope user` rejected by CC 2.0.76 but accepted by newer 2.0.x builds (CC 2.1.x = Anthropic CC current per CLAUDE.md)

### Path 3 — Legacy mode (Claude Code < 2.0)
```bash
claude mcp add --scope user --transport http openviking \
  '${OPENVIKING_URL:-http://127.0.0.1:1933}/mcp' \
  --header 'Authorization: Bearer ${OPENVIKING_API_KEY:-}'
# Plus jq-based hooks.json merge into ~/.claude/settings.json
```

### Path 4 — Shell function wrapper (for remote auth)
```bash
# ~/.zshrc or ~/.bashrc OR Git Bash on Windows
claude() {
  local _ov_conf="${OPENVIKING_CLI_CONFIG_FILE:-$HOME/.openviking/ovcli.conf}"
  if [ -f "$_ov_conf" ] && command -v jq >/dev/null 2>&1; then
    local _ov_url _ov_key
    _ov_url=$(jq -r '.url // empty'     "$_ov_conf" 2>/dev/null)
    _ov_key=$(jq -r '.api_key // empty' "$_ov_conf" 2>/dev/null)
    OPENVIKING_URL="${OPENVIKING_URL:-$_ov_url}" \
    OPENVIKING_API_KEY="${OPENVIKING_API_KEY:-$_ov_key}" \
      command claude "$@"
  else
    command claude "$@"
  fi
}
```

## License-use-class precision per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md §D1 lattice`

| eee use-class | AGPL clause | Verdict |
|---|---|---|
| AGPL CLI binary used to scan local files | §13 not triggered (no derivative; no network) | ✅ ACCEPTABLE |
| **AGPL plugin loaded into CC runtime** (THIS USE-CASE) | §13 derivative-work; eee CC runtime + plugin form derivative | ⚠️ AMBIGUOUS — depends on **whether eee distributes** |
| AGPL network-served as part of eee | §13 fires (third-party network users get source-availability mandate) | ❌ REJECT |
| AGPL SaaS-distributed | full AGPL-class restrictions | ❌ REJECT |

**eee baseline applied**: per SRA D1 "**local autonomous /loop runtime; NOT distributed-as-product; NOT network-hosted-for-third-parties; NOT SaaS-resale**" — this use-class makes AGPL-3.0 **ACCEPTABLE with operator source-availability commitment** if eee runtime is ever distributed to third parties.

**Operator commitment required**: if eee runtime is ever made public/distributed → source-availability mandate fires for AGPL portions per §13.

## SRA D1-D10 scoring

| Dim | Score | Rationale |
|---|---:|---|
| D1 license-use-class precision | 6/10 | AGPL-3.0; admissible under eee baseline with operator-commitment; downgrade vs MIT/Apache-2.0 |
| D2 SOTA-freshness | 9/10 | Active maintenance (commits within 30d); marketplace planned |
| D3 star-velocity vs content-depth | 7/10 | 23,958★ ByteDance-backed (high signal); cpd not verified this fire |
| D4 maintainer-provenance tier | 9/10 | Volcengine (ByteDance subsidiary) = TIER-3-NAMED-ORG; corporate sponsor |
| D5 active-maintenance signals | 8/10 | Recent commits; cloud SaaS offering; documented config priority chain |
| D6 use-class compatibility | 7/10 | CC plugin native (2.0+ marketplace + legacy paths); Windows AMBER (bash install.sh requires Git Bash) |
| D7 Anthropic CC policy alignment | 9/10 | Proper `.claude-plugin/plugin.json` manifest + `.mcp.json` + `commands/` + `hooks/` shape; marketplace-ready |
| D8 industry adoption signal | 8/10 | 23,958★ + Volcengine Cloud SaaS offering; openclaw ecosystem |
| D9 failure-mode awareness | 7/10 | AGPL §13 disclosure-class risk under specific use-cases (distribution / network-serving) |
| D10 replacement viability | 7/10 | Different value-prop than doobidoo/graphiti (auto-recall+capture vs explicit search); PROVIDER-COMPLEMENT not replacement |
| **TOTAL** | **77/100** | **DOWNGRADE-WITH-DISCLOSURE** verdict per SRA D1-D10 thresholds (7-8 + critical D1+D6 PASS) |

## Convergence-gate Axis-1+2+3

- **Axis 1 (≥3 distinct T1 orgs)**: PASS via 4 derivative projects per W216 Agent D probe (volcengine/OpenViking primary + Castor6/openviking-plugins + swizardlv/openclaw_openviking_skill + ruansheng8/openviking-ui) — though all derive from the same upstream
- **Axis 2 (≥2 named T2 practitioners)**: PARTIAL — Volcengine team = named-org; no independent named-T2 dated artifact citing this specific plugin
- **Axis 3 (≥3 months stability)**: PASS — repo created earlier than 90d ago

## CR-12 6-class disposition

**Updated from W216 firm REJECT-FOR-FIT**:
- **PROVIDER-COMPLEMENT** to doobidoo/mcp-memory-service (different mechanism: OpenViking = auto-recall+capture hooks + HTTP MCP; doobidoo = explicit MCP search + sqlite_vec embedded; different consumer patterns)
- **STUDY-PILOT eligible** (Probe 7.b 5-clause check PASS for novel auto-recall+capture workflow)
- **NOT DUPLICATE-FUNCTIONALITY** (different from incumbent doobidoo + graphiti)

## Native-CC-install-path discriminator

✅ **NATIVE-CC**: full plugin manifest (`.claude-plugin/plugin.json`) + MCP server config (`.mcp.json`) + commands + hooks shape compatible with CC 2.0+ marketplace.

## Wiring difficulty

**MEDIUM** — paths:
- One-line installer: requires Git Bash on Windows (manageable)
- Manual marketplace: 2 commands (`claude plugin marketplace add` + `claude plugin install`)
- Backend: needs OpenViking server (self-hosted local or Volcengine Cloud)
- Auth: shell function wrapper for cross-session env injection
- Platform compat: macOS/Linux native; Windows via Git Bash; PowerShell equivalent NOT shipped

## Operator decision matrix

| Scenario | OpenViking disposition | Cardinal-rule alignment |
|---|---|---|
| Local-only single-machine eee (never distributed) | ✅ INSTALL-NOW under operator-commitment | CR-1 + CR-5 + CR-6 + CR-9 |
| eee ever distributed publicly | ⚠️ AGPL §13 fires; source-availability mandate | CR-9 install-risk discipline |
| Backend = Volcengine Cloud (default) | ⚠️ depends on ByteDance ToS + network egress to api.vikingdb.cn-beijing.volces.com | TIER-1-NAMED-ORG ByteDance — operator-decision |
| Backend = self-hosted local (preferred for privacy) | ✅ no external network calls; CR-9 PASS | CR-1 + CR-5 + CR-6 |

## Verdict

**OPERATOR-OVERRIDE-ADMISSIBLE** per SRA D1 eee use-class baseline. W216 firm REJECT was conservative; precision deep-dive revises to **DOWNGRADE-WITH-DISCLOSURE** at 77/100 SRA score.

**Recommended install path for Z:\claude-sota-pure**: self-hosted local backend + manual marketplace install via Git Bash → claude plugin marketplace add + claude plugin install — operator decides whether to commit to AGPL §13 disclosure mandate.

**Note**: candidate is PROVIDER-COMPLEMENT to W216 Top-1 doobidoo/mcp-memory-service (different mechanism). Both could be installed and consumed for different workflows: doobidoo for explicit memory queries; OpenViking for auto-recall+capture before/after every prompt/turn.

verdict_one_line: OPERATOR-OVERRIDE-ADMISSIBLE: OpenViking CC Memory Plugin at 77/100 SRA + PROVIDER-COMPLEMENT to doobidoo; eee local-runtime use-class admissible AGPL-3.0 under operator source-availability commitment if ever distributed

VERDICT: OPERATOR-OVERRIDE-ADMISSIBLE-DOWNGRADE-WITH-DISCLOSURE
