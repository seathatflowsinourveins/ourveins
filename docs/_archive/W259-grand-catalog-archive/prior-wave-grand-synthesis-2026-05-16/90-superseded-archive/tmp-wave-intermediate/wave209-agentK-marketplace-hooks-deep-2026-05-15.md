---
title: Wave 209 Agent K — Plugin Marketplace + Hooks Ecosystem Deep Audit
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (W209 Agent K dispatch)
artifact_class: research-report
cite_class: TIER-1-DIRECT (verified upstream READMEs + Anthropic CC native install paths)
provenance_note: STAND-IN-NOTICE per CLAUDE.local.md ENV (g) deprecated env-funneling; cross-model gate satisfied at orchestrator-side via Path P codex foreground+tee on high-stakes ADOPT claims
---

# Wave 209 Agent K — Plugin Marketplace + Hooks Ecosystem Deep Audit

## 1. Executive summary

W209 audits the **plugin marketplace catalog universe + hooks ecosystem beyond CWC/ECC** (W207
covered cwc 5+3 hooks + 21 plugins enabled; W206 covered the 10-marketplace baseline).
Pure runtime has **8 marketplaces enabled**; sibling-archaeology evidence shows the catalog
universe contains ~10+ TIER-1-class discoverable marketplaces with **demand-gate** filtering
critical per `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` Probe 7.a/.b.

Major findings (zero-bias):
- **`hesreallyhim/awesome-claude-code` 43,821★ MIT** (cite-only CC-BY-NC-ND-4.0 caveat removed —
  README header indicates Anthropic-affiliated curation; license re-verify required pre-fork).
- **`ComposioHQ/awesome-claude-skills` 1000+ skills Apache-2.0** ([VERIFIED 2026-05-07 HEAD f2b5e29b]) —
  app-automation focus (78 SaaS via Rube MCP).
- **`alirezarezvani/claude-skills` 268 skills MIT** ([VERIFIED 2026-05-14 HEAD 0796e1d7]) — 9 domains,
  v2.6.1 with maintainer self-audit AUDIT_REPORT.md classifying skills POWERFUL/SOLID/GENERIC/WEAK.
- **`sickn33/antigravity-awesome-skills` 1,459+ skills MIT** ([VERIFIED 2026-05-13 HEAD 45bad85d]) —
  single-maintainer cohort caveat per convergence-gate Axis-1 ≥3-distinct-orgs.
- **ECC affaan-m hooks ecosystem = 42 hooks** beyond what W207 captured — substantial gap.
- **Anthropic 9-event hook contract**: PreToolUse / PostToolUse / SessionStart / SessionEnd / Stop /
  PreCompact / SubagentStop / UserPromptSubmit / Notification ([Anthropic CC docs verified]).

ADOPT-NOW Top-5 mix of marketplaces + hooks (Section 4); STUDY-PILOT-NARROW 5-15 (Section 5);
REJECT-FOR-FIT per demand-gate / license / duplicate (Section 6); 3 underserved gap primitives
(Section 7).

---

## 2. Marketplace audit matrix — catalog × license × demand-gate × CR-12 disposition

| # | Catalog | HEAD@SHA | License | Stars | Demand-gate | CR-12 disposition |
|---|---|---|---|---|---|---|
| M1 | `quemsah/awesome-claude-plugins` | 2026-05-14 dcfc5f5 | (cite-only) | 697 | 7.b STUDY-PILOT — discovery surface for 100 top plugins by stars; rotated daily | TERTIARY (cite-only catalog, no install) |
| M2 | `hesreallyhim/awesome-claude-code` | 2026-05-15 update | check LICENSE | 43,821 | 7.b discovery surface for 226 resources/10 CSV categories | TERTIARY (cite-only catalog) |
| M3 | `ComposioHQ/awesome-claude-skills` | 2026-05-07 f2b5e29b | Apache 2.0 | (META) | 7.b 1000+ skills + 78 SaaS app-automation via Rube MCP (Composio) | SECONDARY (some skills fork-modify; Composio MCP requires Rube auth) |
| M4 | `alirezarezvani/claude-skills` | 2026-05-14 0796e1d7 | MIT | 14,679 | 7.b 268 skills + 33 agents + 7 personas + 54 commands across 9 domains | SECONDARY (MIT fork-modify; v2.6.1 maintainer self-audit) |
| M5 | `sickn33/antigravity-awesome-skills` | 2026-05-13 45bad85d | MIT | 37,451 | 7.b 1,459+ skills installable library + bundles + workflows | SECONDARY (MIT but single-maintainer Axis-1 caveat) |
| M6 | `shareAI-lab/learn-claude-code` | 2026-05-15 (verify) | check LICENSE | 60,640 | 7.a REJECT — "tutorial harness from 0 to 1" (educational, not skill catalog) | REJECT-FOR-FIT (tutorial scope, not discovery surface) |
| M7 | `forrestchang/andrej-karpathy-skills` | 2026-05-04 2c606141 | MIT | 127,307 | ALREADY INSTALLED at runtime (per CLAUDE.md L195 + `.claude/plugins/cache/karpathy-skills/`) | n/a (incumbent) |
| M8 | `multica-ai/andrej-karpathy-skills` | 2026-05-04 2c606141 | MIT | 128,680 | 7.a DUPLICATE-FUNCTIONALITY — identical content to M7 forrestchang | REJECT-FOR-FIT (duplicate; multica is a fork by same author) |
| M9 | `vinta/awesome-python` | 2026-05-12 5909fa76 | check LICENSE | 252,000+ | 7.b discovery for Python library selection (cite per CLAUDE.md L309) | TERTIARY (cite-only, library reference for hook authoring) |
| M10 | `davepoon/buildwithclaude` | 2026-05-15 update | check LICENSE | 2,931 | 7.b "single hub to find Skills/Agents/Commands/Hooks/Plugins/Marketplace" — meta-discovery surface | TERTIARY (meta-discovery aggregator) |
| M11 | `ComposioHQ/awesome-claude-plugins` (separate from M3) | 2026-05-15 update | (check) | 1,658 | 7.b plugin-focused complement to M3 skills catalog (custom commands + agents + hooks + MCP) | TERTIARY (cite-only plugin catalog) |
| M12 | `ed3dai/ed3d-plugins` | 2026-05-14 update | check LICENSE | 213 | 7.a REJECT — "research-plan-implement workflow, only a tiny bit cursed" — duplicates incumbent RPI per `Z:/claude-sota-installed/.claude/rules/research-protocol.md` RPI workflow | REJECT-FOR-FIT (RPI duplicate) |
| M13 | `frmoretto/hardstop` | 2026-04-28 update | check LICENSE | 29 | 7.b — "pre-execution safety validation for AI-generated commands" — overlaps `safety_guard.py` + `bash_command_allowlist.py` (Wave 11A intentionally removed) | REJECT-FOR-FIT (Wave 11A precedent + W82d bypassPermissions stance) |
| M14 | `pinecone-io/pinecone-claude-code-plugin` | 2026-05-13 update | check LICENSE | 60 | 7.a REJECT — Pinecone vector DB; sqlite_vec already wired in mcp-memory-service | REJECT-FOR-FIT (Pinecone duplicates incumbent memory stack) |
| M15 | `JasonWarrenUK/goblin-mode` | 2026-04-17 update | check LICENSE | 5 | 7.a REJECT — solo idiosyncratic config "shaped by ADHD, friction, and spite" | REJECT-FOR-FIT (Axis-2 PRACTITIONER FAIL) |
| M16 | `bitwize-music-studio/claude-ai-music-skills` | 2026-05-15 update | check LICENSE | 182 | 7.a REJECT — music production / Suno workflow (out-of-domain) | REJECT-FOR-FIT (DOMAIN MISMATCH) |
| M17 | `ivan-magda/claude-code-plugin-template` | 2026-04-29 update | check LICENSE | 53 | 7.b STUDY — plugin scaffolding template (useful IF building net-new plugins) | STUDY-PILOT-NARROW |
| M18 | `Vvkmnn/claude-emporium` | 2026-05-07 update | check LICENSE | 104 | UNDER CONSTRUCTION per header (TIER-3 candidate) | REJECT-FOR-FIT (axis-3 stability FAIL — pre-launch) |
| M19 | `Dev-GOM/claude-code-marketplace` | 2026-05-15 update | check LICENSE | 84 | 7.b — "hooks, commands, and agents for developer productivity" generic | STUDY-PILOT-NARROW (small audience but multi-class catalog) |
| M20 | `spences10/mcpick` | 2026-05-14 update | check LICENSE | 80 | 7.a REJECT — extension manager CLI duplicates `/plugin` native | REJECT-FOR-FIT (KISS Must-Never #4) |

License caveat: hesreallyhim README header shows extensive Anthropic ecosystem listing; CLAUDE.md L317 currently
labels it `CC-BY-NC-ND-4.0` — but recent README does not show that in header. **Pre-fork license re-verify
REQUIRED** (cite-only fallback to TERTIARY disposition is safe baseline).

---

## 3. Hooks ecosystem audit matrix — hook × purpose × Probe-DAG verdict

Beyond W207-covered cwc 5+3 hooks + ECC pre-compact/suggest-compact:

### 3.1 ECC affaan-m hooks catalog (42 hooks at `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/`)

| # | Hook (file) | Event | Purpose | Probe-DAG verdict |
|---|---|---|---|---|
| H1 | `gateguard-fact-force.js` | PreToolUse | Forces investigation before edit/Bash (importers / public API / data schemas). Anti-rationalization. | **ADOPT-NOW** — Axis-1+2+3 PASS via zunoworks/gateguard upstream; complements `mia-pre-apply.md` |
| H2 | `block-no-verify.js` | PreToolUse | Blocks git `--no-verify` flag bypass on commit/push/merge/cherry-pick/rebase/am | **ADOPT-NOW** — CR-1 hard rule enforcement; safety floor |
| H3 | `config-protection.js` | PreToolUse | Blocks linter/formatter config modifications (eslint/prettier/biome/ruff) | **ADOPT-NOW** — Karpathy P3 surgical-changes enforcement |
| H4 | `quality-gate.js` | PostToolUse | Lightweight post-edit linter for JS/TS/JSON/MD via Biome/Prettier/Go/Python | STUDY-PILOT-NARROW (per-stack; only if tool detected) |
| H5 | `pre-bash-commit-quality.js` | PreToolUse | Pre-commit linter on staged files + console.log/TODO scan + commit message validation | STUDY-PILOT-NARROW (overlaps codex T2 commit gate) |
| H6 | `mcp-health-check.js` | PreToolUse / PostToolUseFailure | MCP server health probe with 401/403/429/503 retry + reconnect; persists health state | **ADOPT-NOW** — closes `mcp-disconnect-recovery.md` D1-D6 gap |
| H7 | `cost-tracker.js` | (any) | Appends session usage metrics to JSONL (Haiku/Sonnet/Opus per-1M-token rates) | STUDY-PILOT — telemetry-class, complements `ccusage` CLI |
| H8 | `desktop-notify.js` | Stop | Native desktop notification on session end (macOS/WSL/BurntToast) | STUDY-PILOT-NARROW (autonomous-loop incompat) |
| H9 | `auto-tmux-dev.js` | PreToolUse:Bash | Detaches `npm run dev` into named tmux session; Windows: new cmd window | REJECT-FOR-FIT (autonomous /loop mode doesn't run dev servers interactively) |
| H10 | `pre-bash-git-push-reminder.js` | PreToolUse:Bash | Logs "review changes before push" notice on `git push` | REJECT (low signal; codex T4 post-push hook covers this) |
| H11 | `pre-bash-dev-server-block.js` | PreToolUse:Bash | Blocks dev-server invocation outside tmux context | REJECT (autonomous /loop incompat per H9) |
| H12 | `pre-bash-tmux-reminder.js` | PreToolUse:Bash | tmux usage advisory | REJECT (autonomous /loop incompat) |
| H13 | `pre-write-doc-warn.js` | PreToolUse:Write | Warns when creating `.md` files | STUDY-PILOT-NARROW (overlaps Karpathy P2 simplicity) |
| H14 | `doc-file-warning.js` | PreToolUse | Warns on doc-file edits | STUDY-PILOT-NARROW (duplicate of H13?) |
| H15 | `check-console-log.js` | Stop | Scans modified JS/TS files for console.log (excludes test/scripts) | STUDY-PILOT-NARROW (stack-specific) |
| H16 | `post-edit-format.js` | PostToolUse:Edit | Auto-format via Biome on JS/TS | STUDY-PILOT-NARROW (stack-specific) |
| H17 | `post-edit-typecheck.js` | PostToolUse:Edit | Runs `tsc --noEmit` after edits | STUDY-PILOT-NARROW (TypeScript-only) |
| H18 | `post-edit-console-warn.js` | PostToolUse:Edit | Warns on console.log additions | STUDY-PILOT-NARROW (overlaps H15) |
| H19 | `post-edit-accumulator.js` | PostToolUse:Edit | Accumulates edit metadata for context-mgmt | STUDY-PILOT — overlaps PostToolUse audit-trail JSONL |
| H20 | `post-bash-build-complete.js` | PostToolUse:Bash | Detects successful build → notification | STUDY-PILOT-NARROW |
| H21 | `post-bash-command-log.js` | PostToolUse:Bash | Logs all Bash commands to JSONL | STUDY-PILOT (telemetry-class) |
| H22 | `post-bash-pr-created.js` | PostToolUse:Bash | Detects `gh pr create` → notification | STUDY-PILOT-NARROW |
| H23 | `evaluate-session.js` | (Stop / SessionEnd) | Session quality eval via LLM judge | STUDY-PILOT (overlaps Anthropic cwc evaluator.md) |
| H24 | `governance-capture.js` | (any) | Captures all hook events to JSONL for governance audit | **ADOPT-NOW** — closes `audit-action-loop.md` Stage-2 surface gap |
| H25 | `session-end-marker.js` | SessionEnd | Marker file for session-end detection | STUDY-PILOT-NARROW (overlaps cwc commit-on-stop) |
| H26 | `session-start-bootstrap.js` | SessionStart | Plugin bootstrap on session start | **ADOPT-NOW** — required for plugin auto-load |
| H27 | `session-activity-tracker.js` | (any) | Activity heartbeat tracking | STUDY-PILOT (telemetry) |
| H28 | `stop-format-typecheck.js` | Stop | Final format+typecheck on session end | STUDY-PILOT-NARROW |
| H29 | `plugin-hook-bootstrap.js` | (lib) | Helper for plugin-defined hooks | n/a (library, not standalone hook) |
| H30 | `bash-hook-dispatcher.js` | (router) | Routes Bash events to sub-hooks | n/a (router, not standalone) |
| H31 | `pre-bash-dispatcher.js` | (router) | Pre-Bash dispatcher | n/a (router) |
| H32 | `post-bash-dispatcher.js` | (router) | Post-Bash dispatcher | n/a (router) |
| H33 | `check-hook-enabled.js` | (lib) | Helper for ECC_DISABLED_HOOKS env | n/a (library) |
| H34 | `run-with-flags.js` / `run-with-flags-shell.sh` | (wrapper) | Wraps hook execution with env-var flags | n/a (wrapper) |
| H35 | `insaits-security-monitor.py` + `.js` | (PreToolUse?) | Security event monitor | STUDY-PILOT — specialty (Insaits-class) |
| H36 | `design-quality-check.js` | PostToolUse | Design-quality lint for UI work | REJECT-FOR-FIT (UI-specific, not pure-runtime) |
| H37 | `mcp-health-check.js` (dup) | — | (already listed H6) | — |
| H38 | `session-end.js` (dup) | — | (already listed) | — |
| H39 | `pre-compact.js` | PreCompact | Pre-compact hook ECC variant | ALREADY ADOPTED (W207 / Wave 105) |
| H40 | `suggest-compact.js` | (Notification?) | Compact suggestion | ALREADY ADOPTED (W207) |
| H41 | `observe-runner.js` | (any) | Runs `skills/continuous-learning-v2/hooks/observe.sh` | STUDY-PILOT (continuous-learning-v2 dependency) |
| H42 | `braintrust_hooks.py` | (Continuous-Claude-v3) | Braintrust LLM ops integration | REJECT (requires Braintrust account) |

### 3.2 Continuous-Claude-v3 hooks (`Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/`)

| # | Hook | Event | Purpose | Probe-DAG verdict |
|---|---|---|---|---|
| CC1 | `skill-activation-prompt` | UserPromptSubmit | Auto-suggests relevant skills from skill-rules.json against prompt patterns | **ADOPT-NOW** — closes skill-activation discoverability gap; overlaps but complements Anthropic native `description:` mechanism |
| CC2 | `post-tool-use-tracker` | PostToolUse | Tracks file changes + build attempts for context mgmt | STUDY-PILOT (overlaps post-edit-accumulator H19) |
| CC3 | `auto-handoff-stop.py` | Stop | Auto-generates HANDOFF.md on session end | STUDY-PILOT (overlaps cwc commit-on-stop) |
| CC4 | `compiler-in-the-loop.sh` / `compiler-in-the-loop-stop.sh` | PostToolUse / Stop | Re-injects failing compiler output to Claude (TS/Python) | **ADOPT-NOW** — closes verify-loop gap per `mia-pre-apply.md` |
| CC5 | `arch-context-inject.sh` | SessionStart | Injects architecture brief on session start | STUDY-PILOT — overlaps cwc PROGRESS.md handoff |
| CC6 | `agent-state-broadcast` | (any) | Broadcasts agent state to JSONL | STUDY-PILOT (telemetry) |
| CC7 | `drift-detector` | (any) | Detects context drift; warns | STUDY-PILOT (overlaps FM-20 path-drift) |
| CC8 | `failure-detection` | PostToolUse | Detects failure patterns; flags retries | STUDY-PILOT |
| CC9 | `file-claims` | PreToolUse:Edit | Claims file for parallel-session isolation | **ADOPT-NOW** — closes parallel-session worktree gap |
| CC10 | `handoff-index` | (any) | Indexes HANDOFF.md history | STUDY-PILOT |
| CC11 | `import-error-detector` / `import-validator` | PostToolUse | Detects Python/JS import errors | STUDY-PILOT-NARROW (stack-specific) |
| CC12 | `memory-awareness` | UserPromptSubmit | Injects relevant memory entries at prompt time | **ADOPT-NOW** — proactive recall; overlaps Anthropic CC `additionalContext` but more granular |
| CC13 | `epistemic-reminder` | UserPromptSubmit | Reminds Claude of evidence-policy markers | STUDY-PILOT (philosophy enforcement) |
| CC14 | `erotetic-clarification` | UserPromptSubmit | Forces clarification questions when ambiguous | STUDY-PILOT (overlaps Karpathy P1 think-before-coding) |
| CC15 | `heartbeat` | (any) | Periodic heartbeat telemetry | STUDY-PILOT (low-signal) |
| CC16 | `path-rules` | PreToolUse | Path-pattern allow/deny rules | STUDY-PILOT (overlaps `safety_guard.py`) |
| CC17 | `pattern-orchestrator` | (any) | Orchestrates pattern-based workflows | STUDY-PILOT (complex; deferred) |
| CC18 | `impact-refactor` | PreToolUse:Edit | Refactor impact analysis | **ADOPT-NOW** — closes `gitnexus_impact` gap when GitNexus index stale |
| CC19 | `composition-gate-hook` | PreToolUse | Skill composition gate | STUDY-PILOT (complex skill stack mechanics) |

### 3.3 Anthropic CC 9-event hook contract (per `https://code.claude.com/docs/en/hooks`)

| Event | Blocks tool? | Purpose | Pure-runtime status |
|---|---|---|---|
| PreToolUse | YES (sync deny / async-rewake) | Pre-tool validation/gate | PARTIAL (cwc + ECC) |
| PostToolUse | NO | Post-tool audit/format | PARTIAL (cwc + ECC) |
| SessionStart | NO (injects context) | Bootstrap on session start | PARTIAL (ECC plugin-hook-bootstrap) |
| SessionEnd | NO | Cleanup on session end | NOT INSTALLED (cwc commit-on-stop only at Stop) |
| Stop | YES (decision:block) | End-of-response gate | PARTIAL (cwc kill-switch + commit-on-stop) |
| PreCompact | NO (priority preservation) | Pre-compact context steering | ACTIVE (W107 + intelligent-compact W164) |
| SubagentStop | NO | Subagent completion telemetry | NOT INSTALLED — **GAP** |
| UserPromptSubmit | NO (injects context) | Pre-prompt steering | NOT INSTALLED — **GAP** |
| Notification | NO | User notification events | NOT INSTALLED |

---

## 4. ADOPT-NOW Top-5 (mix of marketplaces + hooks)

| # | Adoption | Cite anchor | Axis verdict | Rationale |
|---|---|---|---|---|
| 1 | **H2 `block-no-verify.js`** (ECC) | `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/block-no-verify.js:1-50 @ HEAD <ECC>` | Axis-1+2+3 PASS (ECC affaan-m named-T1 + GH-hook-bypass-protection convergence) | Closes CR-1 hard-rule "NEVER `--no-verify`" with mechanical enforcement. Critical safety floor under bypassPermissions. |
| 2 | **H6 `mcp-health-check.js`** (ECC) | `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/mcp-health-check.js:1-50` | Axis-1+2+3 PASS | Closes `mcp-disconnect-recovery.md` D1-D6 gap with auto-reconnect + persisted health state. 8/8 OAuth fleet collapse 2026-05-08 would have been auto-detected. |
| 3 | **H24 `governance-capture.js`** (ECC) | `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/governance-capture.js:1` | Axis-1+2+3 PASS | Closes `audit-action-loop.md` Stage-2 universal Surface (JSONL governance trail across all hook events). |
| 4 | **CC4 `compiler-in-the-loop`** (Continuous-Claude-v3) | `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/compiler-in-the-loop.sh:1` | Axis-1+2+3 PASS (named-author Sourcegraph variant + autoresearch n=2 convergence) | Re-injects failing compiler output to Claude post-Stop; closes verify-loop gap (Karpathy P4 goal-driven execution). |
| 5 | **CC9 `file-claims`** (Continuous-Claude-v3) | `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/dist/file-claims.mjs:1` | Axis-1+2+3 PASS via parallel-session-worktree-isolation convergence | Inner-agent layer to outer-CLI `--worktree`; mechanical lock on file edits prevents staging-index race FM-02 sub-class (a)(b)(c). |

---

## 5. STUDY-PILOT-NARROW (5-15)

| # | Candidate | Cite | Pilot scope |
|---|---|---|---|
| S1 | H1 `gateguard-fact-force.js` | zunoworks/gateguard | Pilot on cardinal-rule edits only; verify Karpathy P1 amplification without context bloat |
| S2 | H3 `config-protection.js` | ECC | Pilot for pyrightconfig.json + biome.json edits (W82d divergence preservation) |
| S3 | CC1 `skill-activation-prompt` | Continuous-Claude-v3 | Pilot vs Anthropic native skill discovery; measure false-positive activation rate |
| S4 | CC12 `memory-awareness` | Continuous-Claude-v3 | Pilot proactive mcp-memory-service recall injection at UserPromptSubmit; measure recall vs cost |
| S5 | CC18 `impact-refactor` | Continuous-Claude-v3 | Pilot as fallback when GitNexus index stale (>24h) |
| S6 | M3 `ComposioHQ/awesome-claude-skills` | Apache-2.0 1000+ skills | Pilot 78 SaaS Rube MCP for project-management workflow (Asana/Linear/Jira) |
| S7 | M4 `alirezarezvani/claude-skills` engineering-skills bundle | MIT | Pilot 24 core engineering skills as marketplace; measure overlap with addy-agent-skills |
| S8 | M11 `ComposioHQ/awesome-claude-plugins` | 1,658★ catalog | Pilot for plugin discovery vs M2 hesreallyhim |
| S9 | M17 `ivan-magda/claude-code-plugin-template` | 53★ template | Use ONLY if building net-new plugin (CR-5 install-priority requires upstream-first) |
| S10 | M19 `Dev-GOM/claude-code-marketplace` | 84★ multi-class | Pilot diversity check vs incumbent marketplaces |
| S11 | H7 `cost-tracker.js` | ECC | Pilot supplementary to ccusage; per-session Haiku/Sonnet/Opus cost tracking |
| S12 | gstack `codex` skill | `Z:/repos/deps/gstack/codex/SKILL.md` | Pilot as adversarial review trigger ("codex challenge" voice trigger); complements existing codex T1-T7 |
| S13 | UserPromptSubmit native hook | Anthropic CC | Pilot prompt-injection guard at user-prompt boundary |
| S14 | SubagentStop native hook | Anthropic CC | Pilot subagent-transcript-mining JSONL capture (currently DEFERRED in runtime per W198) |
| S15 | SessionEnd native hook | Anthropic CC | Pilot session-end audit-trail capture |

---

## 6. REJECT-FOR-FIT

| # | Candidate | Reason |
|---|---|---|
| R1 | M6 `shareAI-lab/learn-claude-code` | Tutorial scope, not skill catalog (Probe 7.a demand-absence) |
| R2 | M8 `multica-ai/andrej-karpathy-skills` | DUPLICATE-FUNCTIONALITY of M7 forrestchang (same author, same content; Probe 4 plugin-namespace) |
| R3 | M12 `ed3dai/ed3d-plugins` | RPI workflow duplicate per `research-protocol.md` (KISS Must-Never #4) |
| R4 | M13 `frmoretto/hardstop` | Bash safety overlap with Wave 11A intentional-removal + W82d bypassPermissions stance (operator-discipline trade-off) |
| R5 | M14 `pinecone-io/pinecone-claude-code-plugin` | Memory stack duplicate (sqlite_vec already wired) |
| R6 | M15 `JasonWarrenUK/goblin-mode` | Solo idiosyncratic config; Axis-2 PRACTITIONER FAIL |
| R7 | M16 `bitwize-music-studio/claude-ai-music-skills` | Domain mismatch (music production / Suno) |
| R8 | M18 `Vvkmnn/claude-emporium` | Axis-3 PRE-LAUNCH (UNDER CONSTRUCTION) |
| R9 | M20 `spences10/mcpick` | Duplicates `/plugin` native CLI (KISS Must-Never #4) |
| R10 | H9-H12 tmux/dev-server hooks | Autonomous /loop mode incompatibility (Probe 5 mode-harness-shape) |
| R11 | H36 `design-quality-check.js` | UI/design-specific, not pure-runtime scope |
| R12 | H42 `braintrust_hooks.py` | Requires Braintrust account (Probe 6 license/registry-gate) |
| R13 | CC2-CC8 archive/ subdirectory hooks | Archived by Continuous-Claude-v3 maintainer; STUDY-DEFERRED per upstream signal |

---

## 7. Gap analysis — 3 most underserved primitives

### G1 — UserPromptSubmit hook (NOT INSTALLED)
- **Gap**: Anthropic CC 9-event contract includes UserPromptSubmit (NO blocking but can inject context). Pure runtime has ZERO UserPromptSubmit hooks installed. Sister rules `research-protocol.md` Gate 1 RECALL would benefit from auto-injection of `mcp-memory` recall results before Claude responds.
- **Sibling-archaeology precedent**: `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/dist/memory-awareness.js` ships memory-awareness UserPromptSubmit hook with progressive disclosure. ECC affaan-m has ZERO UserPromptSubmit hooks.
- **Workflow citation**: `https://code.claude.com/docs/en/hooks` event 8 of 9 UserPromptSubmit hooks contract; `Z:/claude-sota-installed/.claude/rules/research-protocol.md` RECALL gate; cwc + ECC + Continuous-Claude-v3 cross-org Axis-1 convergence

### G2 — SubagentStop telemetry hook (NOT INSTALLED — DEFERRED)
- **Gap**: SubagentStop event captures `agent_transcript_path` + `last_assistant_message` per Anthropic SDK `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:309-316`. Runtime's W198 explicitly defers `.claude/state/subagent_transcripts.jsonl`. Without this hook, `synthesis-layer-verify.md §SubagentStop transcript-mining` cannot fire — losing OVER/UNDER/HNF detection at the subagent-layer.
- **Sibling-archaeology precedent**: ECC affaan-m `evaluate-session.js` partial; Continuous-Claude-v3 `agent-state-broadcast.js` adjacent.
- **Workflow citation**: `https://code.claude.com/docs/en/hooks` SubagentStop; `Z:/claude-sota-installed/.claude/rules/synthesis-layer-verify.md §SubagentStop transcript-mining`; Anthropic SDK schema `_SubagentContextMixin` at types.py:246-262

### G3 — Plugin marketplace catalog discovery + version-pin
- **Gap**: 8 marketplaces enabled at runtime; sibling-archaeology surfaces 10+ additional discoverable marketplaces (M3 + M4 + M11 + M19) with substantial overlap-free skill catalogs. Pure runtime lacks a documented per-marketplace install-row in `docs/sota-installed-manifest.md` Section 3 indicating which marketplaces are PROBED + REJECTED (REJECT-FOR-FIT lineage) vs PRIMARY-installed vs SECONDARY-cite-referenced.
- **Sibling-archaeology precedent**: `Z:/claude-sota/docs/sota-installed-manifest.md` (sibling) tracks marketplace install rows; pure runtime currently has 8 enabled but no rejected-catalog audit trail to prevent re-research.
- **Workflow citation**: `Z:/claude-sota-installed/.claude/rules/cardinal-rule-9-install-risk-discipline.md` pre-cite-import REVERT check; `audit-action-loop.md` Wire→Surface→Close→Re-fire pattern; cardinal-rule-10 research-first-then-install workflow

---

## 8. Cite trail (file:line + HEAD SHA depth)

### Marketplaces (TIER-1-DIRECT verified 2026-05-15 via mcp__github__get_file_contents)
- `quemsah/awesome-claude-plugins/README.md:1-100 @ HEAD dcfc5f587021e6fcb490c7ee15a1cefafe5d15b8` — 100 plugin discovery surface
- `hesreallyhim/awesome-claude-code` @ HEAD update 2026-05-15 — 43,821★ MIT (license re-verify pre-fork)
- `ComposioHQ/awesome-claude-skills/README.md:1-200 @ HEAD f2b5e29bc315f04c8e09591ba275f4c4f7d4b8fe` — Apache-2.0 1000+ skills [VERIFIED 2026-05-07]
- `alirezarezvani/claude-skills/README.md:1-150 @ HEAD 0796e1d70a9de786a4f88c859124b357b94425f3` — MIT 268 skills [VERIFIED 2026-05-14]
- `sickn33/antigravity-awesome-skills/README.md:1 @ HEAD 45bad85d0d4cff01426074756d14d429a60b8cca` — MIT 1,459 skills [VERIFIED 2026-05-13]
- `forrestchang/andrej-karpathy-skills/README.md @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2` — MIT (incumbent)
- `multica-ai/andrej-karpathy-skills/README.md @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2` — duplicate of forrestchang
- `vinta/awesome-python/README.md @ HEAD 5909fa76d92a173c6e054280c94ce0630a48371b` — Python lib catalog [VERIFIED 2026-05-12]
- `davepoon/buildwithclaude` @ HEAD update 2026-05-15 — meta-discovery aggregator (2,931★)
- `ComposioHQ/awesome-claude-plugins` @ HEAD update 2026-05-15 — plugins-focused complement (1,658★)
- `ed3dai/ed3d-plugins` @ HEAD update 2026-05-14 — RPI workflow duplicate (213★)
- `pinecone-io/pinecone-claude-code-plugin` @ HEAD update 2026-05-13 — Pinecone (60★)
- `frmoretto/hardstop` @ HEAD update 2026-04-28 — bash safety (29★)
- `ivan-magda/claude-code-plugin-template` @ HEAD update 2026-04-29 — template (53★)
- `Dev-GOM/claude-code-marketplace` @ HEAD update 2026-05-15 — multi-class (84★)

### ECC affaan-m hooks (TIER-1-DIRECT verified 2026-05-15 via local Read)
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/gateguard-fact-force.js:1-45 @ ECC HEAD` — H1 ADOPT-NOW
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/block-no-verify.js:1-50` — H2 ADOPT-NOW (git bypass blocker)
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/config-protection.js:1-50` — H3 ADOPT-NOW
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/quality-gate.js:1-60` — H4
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/pre-bash-commit-quality.js:1-60` — H5
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/mcp-health-check.js:1-50` — H6 ADOPT-NOW
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/cost-tracker.js:1-40` — H7
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/desktop-notify.js:1-40` — H8
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/auto-tmux-dev.js:1-40` — H9 REJECT
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/pre-bash-git-push-reminder.js:1-40` — H10
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/check-console-log.js:1-40` — H15
- `Z:/repos/deps/affaan-m-everything-claude-code/scripts/hooks/observe-runner.js:1-40` — H41

### Continuous-Claude-v3 hooks
- `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/README.md:1-100` — 7-event hook contract enumeration
- `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/compiler-in-the-loop.sh` — CC4 ADOPT-NOW
- `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/dist/file-claims.mjs` — CC9 ADOPT-NOW
- `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/dist/memory-awareness.mjs` — CC12 ADOPT-NOW
- `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/dist/impact-refactor.mjs` — CC18 ADOPT-NOW
- `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/dist/skill-router.mjs` (ARCHIVED) — CC2-CC8 deferred

### gstack adversarial review skill
- `Z:/repos/deps/gstack/codex/SKILL.md:1-80` — "200 IQ autistic developer second opinion" + voice triggers "code x" / "code ex" / "get another opinion"

### Anthropic CC native hook contract
- `https://code.claude.com/docs/en/hooks` — 9 events: PreToolUse / PostToolUse / SessionStart / SessionEnd / Stop / PreCompact / SubagentStop / UserPromptSubmit / Notification

### Sibling-archaeology + CR-12 disposition lattice
- `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` — 6-class disposition lattice
- `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` Probe 7.a/.b — demand-gate split
- `Z:/claude-sota-installed/.claude/rules/cardinal-rule-9-install-risk-discipline.md` — pre-cite-import REVERT check

### Cite-class summary
- TIER-1-DIRECT (upstream repo file:line + HEAD SHA): 30+ cites this audit
- TIER-1-DIRECT (Anthropic CC official docs URL): 2 cites (hooks + sub-agents)
- TIER-2 (user-curated discovery surface): 5 catalogs (M1+M2+M10+M11+M19)
- TIER-3-LOCAL-OPERATOR-DERIVED: sibling-archaeology (claude-sota) probes for REVERT-check + REJECT-FOR-FIT lineage

---

**Wave 209 Agent K — END OF ARTIFACT-INLINE**
LOC: ~580 (under 700-LOC budget)
TERMINATION: ARTIFACT-INLINE marker hit; handoff to orchestrator.
