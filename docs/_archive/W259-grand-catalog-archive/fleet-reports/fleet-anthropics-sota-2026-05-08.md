# Fleet Probe — anthropics/* SOTA Repos (2026-05-08)

> Cardinal-rule conformance: CR-1 (TIER-1-DIRECT cites only), CR-5 (install-priority), CR-6 (official native channels), CR-9 (version-pin), CR-12 (upstream-install-priority).
> Probes: `gh api repos/anthropics/<repo>/...` 2026-05-08.

## 1. Anthropics SOTA repo table

| # | Repo | Latest tag / HEAD SHA | Pub-date / pushed-at | Install command (CR-6 native channel) | Size | What it ships | Runtime status |
|---|---|---|---|---|---|---|---|
| 1 | `anthropics/claude-code` | `v2.1.133` | 2026-05-07 23:49 UTC | `irm https://claude.ai/install.ps1 \| iex` (Win-PS canonical) | 27.6 MB | CLI binary `claude.exe` — agentic coding tool | NOT-INSTALLED-NATIVELY (parent fallback at `Z:\claude\.local\bin\`); settings pinned `2.1.132` so latest passes |
| 2 | `anthropics/claude-agent-sdk-python` | `v0.1.77` | 2026-05-08 00:04 UTC | `pip install --upgrade claude-agent-sdk` (PyPI official) | 1.5 MB | Python Agent SDK | NOT-INSTALLED |
| 3 | `anthropics/claude-agent-sdk-typescript` | `v0.2.133` | 2026-05-07 23:49 UTC | `npm install -g @anthropic-ai/claude-agent-sdk@latest` | 0.16 MB | TS Agent SDK (npm `0.2.133`) | NOT-INSTALLED |
| 4 | `anthropics/claude-plugins-official` | HEAD `76b35e91` | 2026-05-07 22:34 UTC | `/plugin marketplace add anthropics/claude-plugins-official` then `/plugin install <name>@claude-plugins-official` | 3.8 MB | Marketplace (35+ plugins incl. superpowers, agent-sdk-dev, ralph-loop, frontend-design, hookify, skill-creator) | INSTALLED (`superpowers@5.1.0`); 30+ other plugins NOT-INSTALLED |
| 5 | `anthropics/skills` | HEAD `d211d437` (no tagged releases) | 2026-05-06 16:05 UTC | `git clone --depth 1 https://github.com/anthropics/skills.git Z:/claude-sota-installed/.claude/skills-anthropics` (CR-6 fresh clone) | 3.7 MB | Public Agent Skills catalog (Claude.ai consumer skills) | NOT-INSTALLED |
| 6 | `anthropics/cwc-long-running-agents` | HEAD `ffd563d6` (no releases) | 2026-05-06 00:01 UTC | `git clone --depth 1 https://github.com/anthropics/cwc-long-running-agents.git` then `cp -r claude-code-config/.claude/* .claude/` | 14 KB | 5 harness primitives + reference plugins (event demo; cherry-pick) | NOT-INSTALLED |
| 7 | `anthropics/anthropic-cookbook` | HEAD `93a262f1` (= redirect to `claude-cookbooks`) | 2026-05-06 18:34 UTC | `git clone --depth 1 https://github.com/anthropics/claude-cookbooks.git Z:/repos/deps/claude-cookbooks` (CITE-REFERENCE-ONLY) | 207 MB | Notebooks: extended-thinking / patterns / agents / prompt caching | CITE-REFERENCE only |
| 8 | `anthropics/courses` | HEAD `f4dbb137` | 2025-11-13 (stale 6mo) | `git clone --depth 1 https://github.com/anthropics/courses.git` (cite-reference) | n/a | Course material; not install-class | CITE-REFERENCE only |
| 9 | `anthropics/agent-sdk-dev` | n/a (DOES NOT EXIST AS STANDALONE REPO) | n/a | Lives inside `claude-plugins-official/plugins/agent-sdk-dev/` — `/plugin install agent-sdk-dev@claude-plugins-official` | n/a | Agent-SDK scaffolding plugin | NOT-INSTALLED |
| 10 | `anthropics/ralph-loop` | n/a (DOES NOT EXIST AS STANDALONE REPO) | n/a | Lives inside `claude-plugins-official/plugins/ralph-loop/` — `/plugin install ralph-loop@claude-plugins-official` | n/a | Unattended outer loop primitive | NOT-INSTALLED |
| 11 | `anthropics/frontend-design` | n/a (DOES NOT EXIST AS STANDALONE REPO) | n/a | Lives inside `claude-plugins-official/plugins/frontend-design/` — `/plugin install frontend-design@claude-plugins-official` | n/a | Subjective-quality grading rubrics | NOT-INSTALLED |
| 12 | `anthropics/dxt` | `v1.7.0` | 2026-05-06 15:52 UTC | `npm install -g @anthropic-ai/dxt@latest` | n/a | Desktop Extensions packaging (`.dxt`) | NOT-INSTALLED (Claude Desktop only — out-of-scope for CC runtime) |

### Bonus discoveries (search `org:anthropics pushed:>2026-04-01`)

| # | Repo | HEAD / tag | Install | Notes |
|---|---|---|---|---|
| B1 | `anthropics/anthropic-cli` | `v1.7.0` 2026-05-06 | `npm install -g @anthropic-ai/cli@latest` | CLI for Claude API (distinct from `claude-code`) — useful for direct API scripting |
| B2 | `anthropics/knowledge-work-plugins` | HEAD `9789ea78` 2026-04-30 | `/plugin marketplace add anthropics/knowledge-work-plugins` | Plugins for Claude Cowork (knowledge worker focus) |
| B3 | `anthropics/claude-plugins-community` | HEAD updated 2026-05-07 | `/plugin marketplace add anthropics/claude-plugins-community` | Read-only mirror; submit at clau.de/plugin-directory-submission |
| B4 | `anthropics/anthropic-sdk-python/go/typescript/java/csharp/ruby/php` | All updated 2026-05-06/07 | per-language SDK installs (`pip`/`go get`/`npm`/`mvn`/`dotnet add`/`gem`) | API SDKs — not runtime hardening; cite-reference unless app requires |
| B5 | `anthropics/claude-code-action` | 2026-05-07 | GitHub Action — `uses: anthropics/claude-code-action@v<latest>` | CI/CD only; runtime uses CLI |
| B6 | `anthropics/cwc-workshops` | 2026-05-07 | clone for examples | Workshop reference material |
| B7 | `anthropics/riv2025-long-horizon-coding-agent-demo` | 2026-05-07 | clone for reference | Demo of long-horizon agent patterns |
| B8 | `anthropics/financial-services` / `life-sciences` | 2026-05-07 / 2026-04-28 | domain marketplaces (life-sciences hosts an MCP marketplace) | Domain-specific; install only if relevant |

## 2. Stale-vs-latest delta + per-repo upgrade commands

| Component | Current runtime | Latest upstream | Delta | Upgrade command |
|---|---|---|---|---|
| `claude.exe` (native) | NOT-INSTALLED-NATIVELY (parent fallback `Z:\claude\.local\bin\claude.exe`); `minimumVersion: 2.1.132` | `v2.1.133` (2026-05-07) | +1 patch / native gap | See §4 — install via `irm https://claude.ai/install.ps1 \| iex` |
| `superpowers` plugin | `5.1.0` | HEAD `76b35e91` (re-fetch market) | Re-probe `marketplace.json` | `/plugin marketplace update claude-plugins-official` then `/plugin upgrade superpowers@claude-plugins-official` |
| `codex@openai-codex` plugin | `1.0.4` | (out of scope — openai org) | n/a | n/a |
| `everything-claude-code` plugin | `2.0.0-rc.1` | (out of scope — community org) | n/a | n/a |
| `claude-agent-sdk-python` | NOT-INSTALLED | `v0.1.77` (npm/pypi) | install gap | `pip install claude-agent-sdk==0.1.77` (CR-9 pin) |
| `claude-agent-sdk-typescript` | NOT-INSTALLED | `v0.2.133` (npm) | install gap | `npm install -g @anthropic-ai/claude-agent-sdk@0.2.133` |
| `cwc-long-running-agents` primitives | NOT-INSTALLED | HEAD `ffd563d6` | install gap | `git clone --depth 1 https://github.com/anthropics/cwc-long-running-agents.git Z:/repos/deps/cwc-long-running-agents` then per-primitive cherry-pick into `.claude/` |
| `agent-sdk-dev` plugin | NOT-INSTALLED | HEAD via marketplace | install gap | `/plugin install agent-sdk-dev@claude-plugins-official` |
| `ralph-loop` plugin | NOT-INSTALLED | HEAD via marketplace | install gap | `/plugin install ralph-loop@claude-plugins-official` |
| `frontend-design` plugin | NOT-INSTALLED | HEAD via marketplace | install gap | `/plugin install frontend-design@claude-plugins-official` |

## 3. Top-5 install priority

| # | Action | Justification (one-line) |
|---|---|---|
| 1 | Native `claude.exe` install at `Z:\claude-sota-installed\.local\bin\claude.exe` via `irm https://claude.ai/install.ps1 \| iex` | Eliminates parent-fallback (eee.ps1 T0.1 currently hard-fails); enables auto-update from canonical channel per CR-5 + CR-6. |
| 2 | `/plugin install agent-sdk-dev@claude-plugins-official` + `ralph-loop` + `frontend-design` | Anthropic-OFFICIAL marketplace already enabled; these are the 3 cwc reference plugins explicitly cited in `cwc-long-running-agents/README.md` (blob `e407c533`) — direct CR-1 SOTA fulfillment. |
| 3 | Cherry-pick `cwc-long-running-agents/claude-code-config/.claude/*` into runtime | 5 install-class primitives (Default-FAIL hooks, evaluator subagent, PROGRESS handoff, kill-switch, steer) — direct codification of Nov 2025 + Mar 2026 Anthropic harness papers. |
| 4 | `npm install -g @anthropic-ai/claude-agent-sdk@0.2.133` and/or `pip install claude-agent-sdk==0.1.77` | Required for any `--agent <name>` callouts beyond CC builtin subagents; matches cwc README `evaluator` invocation pattern. |
| 5 | `/plugin install hookify@claude-plugins-official` + `skill-creator@claude-plugins-official` | Hookify provides Anthropic-canonical `PreToolUse`/`Stop` rule machinery; skill-creator scaffolds new SKILL.md files matching anthropics/skills layout. |

## 4. Native claude.exe install — exact elevated PowerShell sequence

Per `https://code.claude.com/docs/en/setup` "Native Install (Recommended)" tab + "Set up on Windows / Option 1 Native Windows with Git Bash":

```powershell
# Run from a fresh elevated PowerShell session (Win+X -> "Terminal (Admin)").
# CR-6 official native channel; auto-updates in background per docs.

# (a) HOME isolation BEFORE invoking installer so binary lands at Z:\claude-sota-installed\.local\bin\
$env:USERPROFILE = 'Z:\claude-sota-installed'
$env:HOME        = 'Z:\claude-sota-installed'
$env:HOMEDRIVE   = 'Z:'
$env:HOMEPATH    = '\claude-sota-installed'

# (b) Canonical install — pulls latest (currently v2.1.133, 2026-05-07).
# CR-9 @latest-acknowledged: docs state "Native installations automatically update in the background to keep you on the latest version."
irm https://claude.ai/install.ps1 | iex

# (c) Verify install location + version
Test-Path 'Z:\claude-sota-installed\.local\bin\claude.exe'   # expect: True
& 'Z:\claude-sota-installed\.local\bin\claude.exe' --version  # expect: 2.1.133 (or newer)
& 'Z:\claude-sota-installed\.local\bin\claude.exe' doctor

# (d) Pin version-floor in settings.json so 'stable' channel doesn't downgrade
# (already pinned at 2.1.132 per current runtime; bump to 2.1.133 after install verifies)
```

**Alternative B (winget)** — `winget install Anthropic.ClaudeCode` — does NOT respect `$env:USERPROFILE` redirect (installs to system path); auto-updates DISABLED; not recommended for Z:-portable runtime.

**Alternative C (gh release download)** — `gh release download v2.1.133 --repo anthropics/claude-code --pattern claude-win32-x64.zip` then manual extraction; loses background auto-update; not recommended unless reproducible-build pin needed.

## 5. cwc-long-running-agents — 5 primitives + 3 reference plugins

All cites pinned at HEAD `ffd563d668a97a38d4aa092bf0d5b1507c046629` (2026-05-06).

### 5 install-class primitives

| # | Primitive | File | Blob SHA | What it codifies |
|---|---|---|---|---|
| P1 | Default-FAIL contract (track-read) | `claude-code-config/.claude/hooks/track-read.sh` | `f510382f6486593c64019bf251ff8f8312689608` | PreToolUse marker — Read-tool calls on evidence files (screenshots/console-logs/result-files) are recorded, used by verify-gate as gate. |
| P2 | Default-FAIL contract (verify-gate) | `claude-code-config/.claude/hooks/verify-gate.sh` | `ee8e1131260206c658fcca34f36a230379d14267` | PreToolUse on Write — denies writes to `test-results.json` unless evidence-read recorded; `passes: false` until proven otherwise. |
| P3 | Fresh-context evaluator | `claude-code-config/.claude/agents/evaluator.md` | `d702d3cbdd08f8c7756eed0ef31dc4ef636f6bb5` | Subagent with NO Write/Edit tools; reviews diff + screenshots; returns PASS or NEEDS_WORK. Invoke `claude --agent evaluator -p "..."`. |
| P4 | Agent-maintained handoff (CLAUDE.md + commit-on-stop) | `claude-code-config/.claude/CLAUDE.md` (`1feb1054...`) + `claude-code-config/.claude/hooks/commit-on-stop.sh` (`282d8f3486372386112b3a8988e1a2f38ecd3037`) | Handoff convention plus `Stop` hook backstop that `git add` + `commit`s uncommitted work at session end. PROGRESS.md re-read on every restart. |
| P5a | Kill-switch | `claude-code-config/.claude/hooks/kill-switch.sh` | `76bc8c589fa5c9b54051f0ff4da1f64d6d68ee19` | Operator control — halts every tool call while `AGENT_STOP` file exists at project root. |
| P5b | Steer mid-run | `claude-code-config/.claude/hooks/steer.sh` | `2dc453a7a4d589024e10cd009487bbfa0b0fde32` | Surfaces `STEER.md` contents to agent once and clears it; mid-run redirect without restart. |
| (settings) | Settings wiring | `claude-code-config/.claude/settings.json` | `2bbd6a857096155136a3cfc31a871184e4d12e34` | Hook → script wiring (PreToolUse/Stop matchers). |

### 3 reference plugins (per cwc README "Going further" + "If you're on the Agent SDK")

| # | Plugin | Path inside `anthropics/claude-plugins-official` | Install command | What it adds |
|---|---|---|---|---|
| RP1 | `agent-sdk-dev` | `plugins/agent-sdk-dev/` | `/plugin install agent-sdk-dev@claude-plugins-official` | Scaffolds Agent SDK projects from inside CC; build agents implementing cwc primitives. |
| RP2 | `ralph-loop` | `plugins/ralph-loop/` | `/plugin install ralph-loop@claude-plugins-official` | Outer/unattended loop — caps session length, picks next feature, builds, evaluates, resets. Closes the loop above the in-session primitives. |
| RP3 | `frontend-design` | `plugins/frontend-design/` | `/plugin install frontend-design@claude-plugins-official` | Grading rubrics (functionality / design / craft / originality) with few-shot examples instead of binary pass/fail; subjective-quality grading. |

Marketplace manifest: `anthropics/claude-plugins-official/.claude-plugin/marketplace.json` HEAD `76b35e91` — 35+ plugins total; the 3 above are the cwc-explicit set.

## 6. HONEST-NON-FINDING list

- `anthropics/agent-sdk-dev` — does NOT exist as standalone repo; lives at `anthropics/claude-plugins-official/plugins/agent-sdk-dev/`. Install path is the plugin marketplace, not a separate repo clone.
- `anthropics/ralph-loop` — does NOT exist as standalone repo; lives at `anthropics/claude-plugins-official/plugins/ralph-loop/`.
- `anthropics/frontend-design` — does NOT exist as standalone repo; lives at `anthropics/claude-plugins-official/plugins/frontend-design/`.
- `anthropics/cwc-long-running-agents` — has NO tagged releases (404 on `/releases/latest`); install only via `git clone` against HEAD or specific commit SHA. README explicitly states "event demo; not maintained and not accepting contributions" — pin to HEAD `ffd563d6` and treat as cite-frozen.
- `anthropics/skills` — has NO tagged releases (404 on `/releases/latest`); HEAD-only consumption, also focused on Claude.ai consumer skills (PDF/PPTX/etc.) rather than CC runtime hardening.
- `anthropics/courses` — last pushed 2025-11-13 (stale 6 months); cite-reference only.
- `anthropics/anthropic-cookbook` — redirects to `anthropics/claude-cookbooks` (same HEAD SHA `93a262f1`); use `claude-cookbooks` as canonical name.

---

## Cite anchors (TIER-1-DIRECT)

- `anthropics/cwc-long-running-agents/README.md` blob `e407c533915fad4644b8f7d1c430a91d6ae96eed` (2026-05-06) — primitive enumeration + reference plugin set
- `anthropics/cwc-long-running-agents` HEAD `ffd563d668a97a38d4aa092bf0d5b1507c046629` (2026-05-06) — primitive blob SHAs above
- `anthropics/claude-code` release `v2.1.133` HEAD `6cd790cd21d21335b8f968301da710bfdc0d9f88` (2026-05-07) — Win zip asset `claude-win32-x64.zip` SHA listed in `SHASUMS256.txt`
- `anthropics/claude-plugins-official` HEAD `76b35e91d1c99c090b1a08dade53bcc5e352c1b2` (2026-05-07) — marketplace manifest at `.claude-plugin/marketplace.json`
- `anthropics/claude-agent-sdk-python` release `v0.1.77` (2026-05-08)
- `anthropics/claude-agent-sdk-typescript` release `v0.2.133` (2026-05-07) — npm `@anthropic-ai/claude-agent-sdk@0.2.133`
- `https://code.claude.com/docs/en/setup` — Windows native install canonical command; `irm https://claude.ai/install.ps1 \| iex`; respects `$env:USERPROFILE` for `\.local\bin\claude.exe` placement; auto-update enabled by default
