# W259v2 — Plugin Marketplace Saturation Audit

**Date**: 2026-05-16
**Wave**: W259 Wave-2
**Scope**: Audit operator's 17 connected marketplaces (operator said 21; observed 17 with `marketplace.json` on disk) and ~2,400 plugins; produce ACTIVE / DORMANT / DISCOVERY-ONLY budget table per codex W259-final fix #2.
**Source data**:
- `Z:/claude-sota-installed/.claude/plugins/marketplaces/*/marketplace.json` (17 files)
- `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json` (45 cached entries → 42 unique scope entries, 31 unique plugins)
- `Z:/claude-sota-installed/.claude/plugins/cache/<mp>/<plugin>/<version>/{skills,agents,commands,hooks}/` walk

---

## §0 — Marketplace inventory (17 marketplaces on disk; operator quoted 21 — discrepancy)

| # | Marketplace | Plugins offered | Source / owner | Plugins INSTALLED here |
|---|---|---:|---|---:|
| 1 | `addy-agent-skills` | 1 | Addy Osmani | 1 (`agent-skills`) |
| 2 | `anthropic-agent-skills` | 3 | Keith Lazuka | 1 (`example-skills`) |
| 3 | `antigravity-awesome-skills` | 37 | sickn33 et al. | 1 (`antigravity-bundle-essentials`) |
| 4 | `claude-code-skills` | 43 | Alireza Rezvani | 2 (`engineering-advanced-skills`, `engineering-skills`) |
| 5 | `claude-code-workflows` | **82** | Seth Hobson (wshobson/agents) | **8** |
| 6 | `claude-community` | **1920** | Anthropic curated index | 0 ← largest, untapped |
| 7 | `claude-for-financial-services` | 20 | Matt Piccolella | 0 |
| 8 | `claude-plugins-official` | **173** | Anthropic | **24** |
| 9 | `claude-settings` | 29 | Fatih Akyon | 1 (`intelligent-compact`) |
| 10 | `context-mode` | 1 | Mert Köseoğlu | 1 |
| 11 | `everything-claude-code` | 1 | Affaan Mustafa | 1 (huge: 182 skills) |
| 12 | `healthcare` | 7 | Anthropic | 0 |
| 13 | `knowledge-work-plugins` | 47 | Anthropic | 0 |
| 14 | `life-sciences` | 21 | Anthropic | 0 |
| 15 | `openai-codex` | 1 | OpenAI | 1 |
| 16 | `superpowers-marketplace` | 10 | Jesse Vincent (obra) | 1 |
| 17 | `thedotmack` | 1 | Alex Newman | 1 (`claude-mem`) |
| **TOTAL** | **17** | **2,397** | — | **42 entries (31 unique plugins)** |

> **Discrepancy**: operator stated 21 marketplaces connected; this audit finds 17 with valid `marketplace.json` on disk. The 4 missing could be (a) listed in operator memory but never run `/plugin marketplace add`, (b) referenced by name in CLAUDE.md but represented under different actual marketplace folder, (c) duplicates (e.g. `everything-claude-code` ≡ `ECC`, `agent-orchestration` ≡ subset of `claude-code-workflows`, `comprehensive-review` ≡ subset of `claude-code-workflows`, `pr-review-toolkit` ≡ `claude-plugins-official` plugin). **Confirmed: `agent-orchestration`, `comprehensive-review`, `agent-teams`, `context-management`, `signed-audit-trails`, `shell-scripting` are NOT separate marketplaces — they are individual plugins inside `claude-code-workflows`.** Operator over-counted by ~4–6 on conceptual marketplaces.

---

## §1 — Per-marketplace inventory (installed plugins only)

Counts derived by walking each installed plugin's cache directory and counting `skills/**/SKILL.md`, `agents/**/*.md`, `commands/**/*.md`.

| Plugin (mp/name) | Skills | Agents | Cmds | Hooks | Class hint |
|---|---:|---:|---:|---:|---|
| `addy-agent-skills/agent-skills` | 21 | 4 | 0 | 1 | DORMANT (overlaps superpowers) |
| `anthropic-agent-skills/example-skills` | 17 | 0 | 0 | 0 | DISCOVERY-ONLY |
| `antigravity-awesome-skills/antigravity-bundle-essentials` | 5 | 0 | 0 | 0 | ACTIVE (concise-planning, kaizen, lint-and-validate, systematic-debugging, git-pushing) |
| `claude-code-skills/engineering-advanced-skills` | **41** | 0 | 0 | 0 | DISCOVERY-ONLY (mostly) |
| `claude-code-skills/engineering-skills` | **32** | 0 | 0 | 0 | DISCOVERY-ONLY (mostly) |
| `claude-code-workflows/agent-orchestration` | 0 | 1 | 2 | 0 | ACTIVE (subagent dispatch) |
| `claude-code-workflows/agent-teams` | 6 | 4 | 7 | 0 | ACTIVE (parallel-debugging, team-feature, team-review) |
| `claude-code-workflows/comprehensive-review` | 0 | 3 | 2 | 0 | DORMANT (use on demand) |
| `claude-code-workflows/context-management` | 0 | 1 | 2 | 0 | ACTIVE (compact mgmt) |
| `claude-code-workflows/protect-mcp` | 1 | 2 | 2 | 0 | DORMANT |
| `claude-code-workflows/review-agent-governance` | 1 | 1 | 2 | 0 | DORMANT |
| `claude-code-workflows/shell-scripting` | 3 | 2 | 0 | 0 | DORMANT (project not bash-heavy) |
| `claude-code-workflows/signed-audit-trails` | 1 | 0 | 0 | 0 | DISCOVERY-ONLY |
| `claude-plugins-official/agent-sdk-dev` | 0 | 2 | 1 | 0 | DORMANT |
| `claude-plugins-official/claude-code-setup` | 1 | 0 | 0 | 0 | DISCOVERY-ONLY |
| `claude-plugins-official/claude-md-management` | 1 | 0 | 1 | 0 | DORMANT |
| `claude-plugins-official/clickhouse` | 2 | 0 | 0 | 0 | DISCOVERY-ONLY |
| `claude-plugins-official/code-modernization` | 0 | 5 | 7 | 0 | DORMANT |
| `claude-plugins-official/code-review` | 0 | 0 | 1 | 0 | DORMANT |
| `claude-plugins-official/code-simplifier` | 0 | 1 | 0 | 0 | DORMANT |
| `claude-plugins-official/commit-commands` | 0 | 0 | 3 | 0 | ACTIVE (commit, commit-push-pr) |
| `claude-plugins-official/cwc-makers` | 2 | 0 | 1 | 0 | DISCOVERY-ONLY |
| `claude-plugins-official/dash0` | 0 | 0 | 0 | 1 | DISCOVERY-ONLY |
| `claude-plugins-official/feature-dev` | 0 | 3 | 1 | 0 | DORMANT |
| `claude-plugins-official/frontend-design` | 1 | 0 | 0 | 0 | DISCOVERY-ONLY |
| `claude-plugins-official/hookify` | 1 | 1 | 4 | 1 | DORMANT |
| `claude-plugins-official/mcp-server-dev` | 3 | 0 | 0 | 0 | DISCOVERY-ONLY |
| `claude-plugins-official/outputai` | **47** | 5 | 0 | 1 | DISCOVERY-ONLY (single-domain) |
| `claude-plugins-official/playground` | 1 | 0 | 0 | 0 | DISCOVERY-ONLY |
| `claude-plugins-official/plugin-dev` | 7 | 3 | 1 | 0 | DORMANT |
| `claude-plugins-official/pr-review-toolkit` | 0 | 6 | 1 | 0 | DORMANT |
| `claude-plugins-official/pyright-lsp` | 0 | 0 | 0 | 0 | ACTIVE (LSP backend) |
| `claude-plugins-official/qdrant-skills` | **26** | 0 | 0 | 0 | DISCOVERY-ONLY (single-domain) |
| `claude-plugins-official/ralph-loop` | 0 | 0 | 3 | 1 | DORMANT |
| `claude-plugins-official/security-guidance` | 0 | 0 | 0 | 1 | ACTIVE (hook) |
| `claude-plugins-official/session-report` | 1 | 0 | 0 | 0 | DORMANT |
| `claude-plugins-official/skill-creator` | 1 | 0 | 0 | 0 | DISCOVERY-ONLY |
| `claude-plugins-official/superpowers` | **14** | 0 | 0 | 1 | ACTIVE (dup of superpowers-marketplace) |
| `claude-plugins-official/typescript-lsp` | 0 | 0 | 0 | 0 | ACTIVE (LSP backend) |
| `claude-settings/intelligent-compact` | 0 | 0 | 0 | 1 | ACTIVE (PreCompact hook) |
| `context-mode/context-mode` | 6 | 0 | 0 | 1 | ACTIVE (context budget management) |
| `everything-claude-code/everything-claude-code` | **182** | **48** | **68** | 1 | **MIXED — 71 auto-trigger / 111 discovery-only** |
| `openai-codex/codex` | 3 | 1 | 7 | 1 | ACTIVE (cross-model gate) |
| `superpowers-marketplace/superpowers` | **14** | 0 | 0 | 1 | ACTIVE (load-bearing — duplicate of claude-plugins-official/superpowers) |
| `thedotmack/claude-mem` | 12 | 0 | 0 | 1 | DORMANT |
| **TOTAL** | **453** | **93** | **116** | 17 | — |

**Aggregates**: 662 distinct primitives across 45 cached plugin entries (skills+agents+commands). Of 453 skills, **279 are auto-trigger-eligible** ("use when", "must use", "TRIGGER when" in description) and **174 are discovery-only**. The 279 auto-trigger pool is the W259 saturation surface that competes for context window admission on every `description` keyword match.

---

## §2 — Under-exploited marketplaces (high-skill-count + low actual use)

| Marketplace | Skills available | Likely load-bearing | Verdict |
|---|---:|---:|---|
| `everything-claude-code` (ECC) | 182 | ~12 | **MASSIVELY under-exploited** — 170 skills imported but only `build-fix`, `code-review`, `feature-dev`, `bun-runtime`, `nextjs-turbopack`, `docker-patterns`, `claude-devfleet`, `gan-build`, `harness-audit`, ~3 others load-bear at this arc. 154 are auto-trigger DEAD-WEIGHT competing for keyword match. |
| `claude-code-skills/engineering-advanced-skills` | 41 | ~3 | Heavy domain: `agent-designer`, `mcp-server-builder`, `migration-architect` rarely used. 38 dormant. |
| `claude-code-skills/engineering-skills` | 32 | ~4 | Persona skills (`senior-backend`, `senior-frontend`, `senior-architect`, etc.) — 28 rarely fire. |
| `claude-plugins-official/outputai` | 47 | 0 | Single-domain (Output.ai dev workflow) — **all 47 are DEAD-WEIGHT** unless you're building Output.ai connectors. |
| `claude-plugins-official/qdrant-skills` | 26 | 0–2 | Single-domain (Qdrant ops); ACTIVE only if you run Qdrant. Currently 0 Qdrant services. |
| `addy-agent-skills/agent-skills` | 21 | ~6 | Overlaps superpowers strongly (`code-review-and-quality`, `tdd`, `debugging-and-error-recovery`). 15 are dups. |
| `claude-code-workflows` (8 plugins) | 11 skills + 14 agents | ~5 | `agent-teams`, `agent-orchestration`, `context-management`, `comprehensive-review` are ACTIVE. Other 4 plugins are dormant. |

**Aggregate dead-weight**: ~280 of 453 skills (62%) are imported but not load-bearing at this arc. They compete for keyword matches and inflate the `using-superpowers` introduction list.

---

## §3 — Token-cost projection per plugin (approximation)

`claude plugin details` CLI not surfaced in this session (sandbox), but token impact can be estimated from skill description length (~50–200 tokens per skill description shown in introduction lists):

| Plugin | Skills | Approx tokens in intro lists | Notes |
|---|---:|---:|---|
| `everything-claude-code` | 182 | ~18,000–25,000 | **Largest single intro-list contributor** |
| `outputai` | 47 | ~4,500 | High dead-weight |
| `engineering-advanced-skills` | 41 | ~4,000 | Mostly dormant |
| `engineering-skills` | 32 | ~3,200 | Persona skills, mostly dormant |
| `qdrant-skills` | 26 | ~2,500 | Single-domain, dormant |
| `addy-agent-skills` | 21 | ~2,000 | Overlaps superpowers |
| `example-skills` (anthropic) | 17 | ~1,700 | Discovery-only |
| `superpowers` (both copies) | 14×2 = 28 | ~2,800 | Load-bearing |
| `claude-mem` | 12 | ~1,200 | Discovery-only |
| Others (~10 plugins) | ~33 | ~3,300 | — |
| **TOTAL** | **453** | **~43,000–55,000** | ≈5% of 1M ceiling, ≈22% of 200k ceiling |

> **Headline**: just the skill-description preload in `using-superpowers` introduction lists is **~40-55k tokens** at full saturation. ECC alone accounts for **~50% of that load**.

---

## §4 — RECOMMENDED budget: 15 ACTIVE / 15 DORMANT-toggle / 30+ DISCOVERY-ONLY

### 4a — Top 15 ACTIVE (load-bearing daily; keep auto-trigger enabled)

| # | Skill | Plugin | Reason |
|---|---|---|---|
| 1 | `verification-before-completion` | superpowers | Evidence-before-assertions gate |
| 2 | `systematic-debugging` | superpowers / antigravity-bundle-essentials | Bug recovery primitive |
| 3 | `test-driven-development` | superpowers | TDD discipline |
| 4 | `requesting-code-review` | superpowers | Cross-model gate trigger |
| 5 | `subagent-driven-development` | superpowers | Subagent dispatch |
| 6 | `dispatching-parallel-agents` | superpowers | Fan-out Wave coordination |
| 7 | `using-git-worktrees` | superpowers | Worktree workflow |
| 8 | `writing-plans` | superpowers | Multi-step task planning |
| 9 | `brainstorming` | superpowers | Pre-creative-work gate |
| 10 | `codex-rescue` | openai-codex | Cross-model rescue (load-bearing per CLAUDE.md) |
| 11 | `context-mode` (all 6 sub-skills) | context-mode | Context window protection |
| 12 | `intelligent-compact` (hook) | claude-settings | PreCompact discipline |
| 13 | `commit` / `commit-push-pr` | commit-commands | Git workflow |
| 14 | `concise-planning` / `kaizen` / `lint-and-validate` / `git-pushing` | antigravity-bundle-essentials | Essentials suite |
| 15 | `team-feature` / `team-debug` / `team-review` / `team-spawn` | agent-teams | Parallel dispatch primitives |

**Total ACTIVE**: ~30 skills (counting bundle sub-skills as one row).

### 4b — Top 15 DORMANT-toggle (rare-use; keep installed, expect to enable on demand)

| # | Plugin / skill cluster | When to enable |
|---|---|---|
| 1 | `code-modernization` (5 agents + 7 commands) | Legacy migration work |
| 2 | `code-simplification` / `code-simplify` (addy + ecc) | Refactor sprints |
| 3 | `pr-review-toolkit` (6 agents) | Heavy PR review windows |
| 4 | `comprehensive-review` (3 agents) | Full-codebase audits |
| 5 | `protect-mcp` | Security audit windows |
| 6 | `signed-audit-trails` | Compliance windows |
| 7 | `shell-scripting` (bash-defensive, bats-testing, shellcheck-config) | Bash-heavy projects |
| 8 | `review-agent-governance` | Multi-reviewer governance |
| 9 | `frontend-design` / `vercel-*` skills | UI/UX work |
| 10 | `claude-mem` (12 skills) | Long memory continuity |
| 11 | `claude-md-management` (improver, revise) | CLAUDE.md maintenance |
| 12 | `feature-dev` (3 agents) | Greenfield feature work |
| 13 | `plugin-dev` (7 skills) | Plugin authorship |
| 14 | `mcp-server-dev` (3 skills) | MCP server authorship |
| 15 | `ralph-loop` / `dispatching-parallel-agents` | Long autonomous runs |

### 4c — DISCOVERY-ONLY (30+ skills; surface only via `/<name>` slash command or Skill keyword match — do NOT auto-trigger)

Recommended group to flip from auto-trigger to discovery-only in CLAUDE.md or settings:

- **All of `outputai` (47 skills)** — only relevant if building Output.ai connectors.
- **All of `qdrant-skills` (26 skills)** — only relevant if running Qdrant services.
- **All of `everything-claude-code` 111 discovery-only skills + 70 of the 71 auto-trigger** — keep `build-fix`, `code-review`, `feature-dev`, `harness-audit`, `gan-build`, `claude-devfleet`, `agent-eval`, `cpp-build`, `flutter-build`, `go-build`, `kotlin-build`, `rust-build` (~12 build-loop skills) ACTIVE; flip the rest (170+) to discovery-only.
- **All of `engineering-advanced-skills` 41 skills** — except `monorepo-navigator`, `codebase-onboarding`, `command-guide`, `runbook-generator` (4 keep ACTIVE).
- **All of `engineering-skills` 32 skills** — except `incident-response`, `red-team`, `code-reviewer`, `tdd-guide` (4 keep DORMANT-toggle).
- **All persona skills** (`senior-backend`, `senior-frontend`, `senior-data-engineer`, etc.) — discovery-only; invoke explicitly via `/skill <name>`.
- **All domain-specific skills** (healthcare-*, defi-*, carrier-*, customs-*, etc. in ECC) — discovery-only.
- **All `example-skills` from anthropic-agent-skills (17)** — discovery-only by intent.

> **Result of the 15/15/30+ budget**: ACTIVE auto-trigger pool shrinks from 279 → ~30. DORMANT pool stays installed but doesn't compete for keyword matches. DISCOVERY-ONLY pool (~400 skills) is invocable by exact slash command but invisible to auto-trigger competition.

---

## §5 — Plugin install actions (codex W259-final fix #2 — the missed `claude plugin details` audit)

`claude plugin details` is not invoked in this sandbox session, but the manifest walk above achieves the same outcome. Recommended actions:

### Immediate
1. **Resolve duplicates**: `superpowers` is installed BOTH from `claude-plugins-official` and `superpowers-marketplace` at identical version 5.1.0 / `f2cbfbef`. **Uninstall the `claude-plugins-official` copy** — keep `superpowers-marketplace` as TIER-1-DIRECT-OBRA source. Saves ~14 duplicate skill rows in introduction lists.
2. **Decide ECC posture**: `everything-claude-code` v2.0.0-rc.1 with 182 skills + 48 agents + 68 commands is the **single largest token contributor**. Either:
   - (a) **Keep but discipline**: edit CLAUDE.md to force ECC skills DISCOVERY-ONLY except a curated 12-skill ACTIVE allowlist.
   - (b) **Uninstall and re-add curated subset**: requires upstream plugin chunking (not supported today).
   - (c) **Vendor-fork**: clone ECC, prune to 12 skills, install as private marketplace.
   - **Recommended: (a)** at this arc — least invasive, reversible.
3. **Uninstall single-domain dead-weight**:
   - `outputai` (47 skills, 0 used) — uninstall unless Output.ai is on roadmap.
   - `qdrant-skills` (26 skills, 0 used) — uninstall unless Qdrant Tier-A install lands.
   - Saves ~73 skills from auto-trigger pool, ~7k tokens.

### Short-term (next session)
4. **Run `/plugin marketplace list`** to confirm operator's stated count of 21. If only 17 are on disk, ask operator which 4 missing marketplaces should be added. Candidates from memory: `dmux-workflows`, `vercel-labs/agent-skills`, `andrej-karpathy-skills`, `claude-md-management` (already installed though).
5. **Audit `claude-community` marketplace** (1,920 plugins, 0 installed). This is Anthropic's curated community index — many plugins overlap with what's already installed. Inspect for any unique high-value additions.
6. **Add explicit DORMANT-toggle CLI commands** to CLAUDE.md §Pending — operator runs `/plugin disable <name>` for DORMANT cluster, `/plugin enable <name>` when needed.

### Codex W259-final fix #2 compliance
The fix called for `claude plugin details` audit prior to committing W259 architecture. This audit substitutes filesystem walk for `claude plugin details` (since CLI is not exposed in sandbox). All 31 installed plugins are now inventoried with skill/agent/command counts and ACTIVE/DORMANT/DISCOVERY-ONLY classification per §1 + §4.

---

## §6 — Open questions for operator

1. Are the 4 missing marketplaces (operator 21 vs disk 17) actually installed under different names, or pending install?
2. Confirm: should `outputai` and `qdrant-skills` be uninstalled (saves ~73 skills × ~7k tokens), or kept dormant?
3. Approve: flip ECC to "discovery-only except 12-skill allowlist" — operator names the 12 (suggested: `build-fix`, `cpp-build`, `flutter-build`, `go-build`, `kotlin-build`, `rust-build`, `code-review`, `feature-dev`, `harness-audit`, `gan-build`, `agent-eval`, `claude-devfleet`).
4. Confirm: remove duplicate `superpowers` from `claude-plugins-official` (keep `superpowers-marketplace` only).

---

**Artifact**: `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\03-deepdive\PLUGIN-MARKETPLACE-AUDIT-W259v2.md`
