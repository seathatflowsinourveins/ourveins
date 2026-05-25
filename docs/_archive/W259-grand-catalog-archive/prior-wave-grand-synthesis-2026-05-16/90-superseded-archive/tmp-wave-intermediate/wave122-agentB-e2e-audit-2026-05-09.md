# ARTIFACT-INLINE: tmp/wave122-agentB-e2e-audit-2026-05-09.md

STAND-IN-NOTICE: Sonnet-stand-in. BRIDGE-MODE was attempted with real `codex exec --ephemeral -p deep-review-exec` from `Z:\claude-sota-installed`; the CLI initialized as `OpenAI Codex v0.129.0`, `model: gpt-5.5`, `sandbox: danger-full-access`, but failed before terminal verdict on Windows certificate-store access: `no native root CA certificates found ... Access is denied` for `wss://chatgpt.com/backend-api/codex/responses`. Therefore this verdict is NOT a completed real-codex-CLI verdict.

VERDICT: NEEDS-REVISION conf=0.91

## Executive Finding

The runtime is operationally rich but not cleanly conformant to its own install-only architecture contract. The highest-risk gaps are deterministic version pinning in `.mcp.json`, CR-7 Phase-3 predicate overclaim, plugin-namespaced subagent blocking, and multiple hook scripts whose headers disclose sibling/local composition rather than upstream install-class origin.

## Findings

### P1 - MCP auto-upgrade and unpinned source risk

- `.mcp.json:22-25` wires `playwright` through `npx -y @playwright/mcp@latest`; this is an explicit D6 auto-upgrade risk under CLAUDE.md cardinal-rule-9 `.mcp.json` warning at `CLAUDE.md:90-91`.
- `.mcp.json:32-35` wires `serena` through `uvx --from git+https://github.com/oraios/serena` without a commit, tag, or version pin.
- `.mcp.json:81-84` wires `@arizeai/phoenix-mcp` without a version pin. It is not `@latest` textually, but `npx` without a version remains moving-target execution.

### P1 - CR-7 Phase 3 predicate is not satisfied even though settings are unleashed

- `.claude/settings.json:81` sets `permissions.defaultMode` to `bypassPermissions`, and `.claude/settings.json:8` sets `CLAUDE_CODE_FORK_SUBAGENT=1`.
- CLAUDE.md says Phase 3 requires Phase 2 complete plus Tier 3-5 completion, arc convergence, and zero open `INSTALLED-AMBER` rows before `bypassPermissions` (`CLAUDE.md:70-72`).
- Manifest evidence contradicts completion: codex hooks are `INSTALLED-PARTIAL` (`docs/sota-installed-manifest.md:58`), Graphiti is `PARTIAL` and says MCP wiring incomplete (`docs/sota-installed-manifest.md:92`), Docker/uv remain `PLANNED` (`docs/sota-installed-manifest.md:416-417`), and sota-researcher/research-first/Tier-2 research MCPs remain `PLANNED` (`docs/sota-installed-manifest.md:538-540`).

### P1 - `agent_spawn_gate.py` blocks plugin-namespaced ECC agents

- The built-in allowlist includes only `general-purpose`, `Explore`, `Plan`, `statusline-setup`, `claude-code-guide`, `codex:codex-rescue`, and `evaluator` (`.claude/hooks/scripts/agent_spawn_gate.py:68-76`).
- The dynamic expansion only enumerates local `agents/*.md` or `.claude/agents/*.md` stems (`.claude/hooks/scripts/agent_spawn_gate.py:94-110`).
- It does not enumerate plugin-cache agents and therefore does not permit names like `everything-claude-code:architect`, despite the header saying plugin-namespaced agents were added (`.claude/hooks/scripts/agent_spawn_gate.py:61-64`). This conflicts with the plugin/subagent architecture implied by CLAUDE.md CR-12 install priority (`CLAUDE.md:140-143`) and the top-3 plugin path (`CLAUDE.md:159`).

### P1 - Hook conformance fails install-priority purity

Top-level Python hook inventory is 20 scripts, not the requested 22: `_codex_plugin_root.py`, `_guard_base.py`, `_observation_writer.py`, `agent_plan_readonly_bash_guard.py`, `agent_spawn_gate.py`, `auto_proceed_gate.py`, `block_no_verify_guard.py`, `codex_gate.py`, `codex_postcommit_review.py`, `codex_prepush_review.py`, `codex_review_queue.py`, `codex_t1_consult_gate.py`, `codex_t2_pre_commit_gate.py`, `codex_t5_plan_review_gate.py`, `fm17d_stall_detector.py`, `gitleaks_pre_commit_gate.py`, `safety_guard.py`, `secret_scan_guard.py`, `subagent_stop_telemetry.py`, `utils.py`.

Conformance split:

- Clean or mostly clean TIER-1 header anchors: `_codex_plugin_root.py:1-4`, `_observation_writer.py:2-4`, `agent_spawn_gate.py:2-5`, `block_no_verify_guard.py:2-4`, `codex_postcommit_review.py:2-4`, `codex_prepush_review.py:2-4`, `codex_review_queue.py:2-5`, `codex_t1_consult_gate.py:1-8`, `codex_t2_pre_commit_gate.py:1-7`, `gitleaks_pre_commit_gate.py:2-3`, `secret_scan_guard.py:2-4`, `subagent_stop_telemetry.py:3-4`.
- Sibling/local composition disclosed in headers: `_guard_base.py:2-12`, `agent_plan_readonly_bash_guard.py:2-12`, `auto_proceed_gate.py:6-12`, `codex_gate.py:2-12`, `codex_t5_plan_review_gate.py:4-7`, `fm17d_stall_detector.py:9-12`, `safety_guard.py:2-11`, `utils.py:6-12`.
- CR-5/CR-12 concern: CLAUDE.md forbids hand-coded architectural primitives outside bootstrap (`CLAUDE.md:47`) and makes upstream install the primary source path (`CLAUDE.md:140-143`). The headers above honestly disclose TIER-3 sibling/local composition, so they should be carried as cite-import-AMBER exceptions with manifest rows and HNF evidence, not counted as TIER-1-DIRECT install-class hooks.

### P2 - Cross-model gate is wired but partially sibling-novel

- Presence/wiring passes for the requested three gates: T1 is wired at `.claude/settings.json:91-97`, T2 is wired at `.claude/settings.json:186-197`, and postcommit review is wired at `.claude/settings.json:206-223`.
- But the manifest explicitly says `codex@1.0.4` upstream hooks cover SessionStart/SessionEnd/Stop only and that PreToolUse T1 is sibling-novel (`docs/sota-installed-manifest.md:58`). This is acceptable only if documented as partial/cite-import, not as pure upstream install.

### P2 - Plugin install conformance mostly passes, with cache hygiene issues

- Enabled plugins pass in settings: `superpowers`, `codex`, `everything-claude-code`, `pyright-lsp`, `agent-sdk-dev`, `ralph-loop`, and `frontend-design` are enabled at `.claude/settings.json:315-322`.
- Versioned cache evidence passes for `superpowers@5.1.0` (`.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/.claude-plugin/plugin.json:2-10`), `codex@1.0.4` (`.claude/plugins/cache/openai-codex/codex/1.0.4/.claude-plugin/plugin.json:2-6`), `everything-claude-code@2.0.0-rc.1` (`.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude-plugin/plugin.json:2-10`), `ralph-loop@1.0.0`, and `pyright-lsp@1.0.0`.
- `agent-sdk-dev` and `frontend-design` have multiple `.in_use` hash cache entries, not a single active cache version. That is not necessarily a runtime break, but it weakens deterministic install auditability.

### P2 - Memory stack has manifest drift

- `.mcp.json` wires `memory` at `.mcp.json:38-44` and `graphiti` at `.mcp.json:47-69`.
- Manifest still says Graphiti MCP wiring is incomplete and `grep graphiti .mcp.json = 0` (`docs/sota-installed-manifest.md:92`), which is now stale against `.mcp.json`. The row needs forward correction with current smoke-probe status.

### P2 - Bootstrap table exists but has CR-8 exceptions and count ambiguity

- All 11 user-requested bootstrap files exist: `README.md`, `CLAUDE.md`, `CLAUDE.local.md`, `.gitignore`, `tools/eee.ps1`, `bin/eee.cmd`, `bin/install-path.ps1`, `.claude/settings.json`, `docs/sota-installed-manifest.md`, `docs/install-provenance.md`, and `docs/install-from-github-discipline.md`.
- Manifest Section 0 also includes `.mcp.json` as a bootstrap row (`docs/sota-installed-manifest.md:37`), making the actual Section 0 table 12 rows (`docs/sota-installed-manifest.md:32-43`).
- Not every row is `ADAPTED-FROM-SOTA`: `.mcp.json`, manifest, provenance, and `.gitignore` are `NOVEL-DOCUMENTED-EXCEPTION` (`docs/sota-installed-manifest.md:37-42`). That is documented, but it means the axis should not be reported as all-ADAPTED.

### P3 - Cardinal-rule citation lattice is mixed but mostly honest

- CR-1 carries TIER-1-DIRECT anchors to CCBP and Anthropic docs (`CLAUDE.md:21-23`).
- CR-3 carries TIER-1-DIRECT CCBP cross-model workflow (`CLAUDE.md:33-34`) but also a Phase-1 exception grounded in sibling/local process (`CLAUDE.md:37`).
- CR-7 cites official permission docs for Phase 3 (`CLAUDE.md:72`, `CLAUDE.md:77`) but its active settings state outruns manifest predicate evidence.
- CR-5 is based on a user directive, not an upstream TIER-1 source (`CLAUDE.md:47`); that is requirements provenance, not SOTA authority.

## Prescribed Edits - Pattern A Ranked

1. Pin MCP moving targets: replace `@playwright/mcp@latest` with a resolved version, replace unpinned `git+https://github.com/oraios/serena` with a commit/tag/version pin, and pin `@arizeai/phoenix-mcp`.
2. Fix `agent_spawn_gate.py` allowlist expansion to include plugin-namespaced agents from enabled plugin caches, including `everything-claude-code:architect`; add a small smoke probe for allowed/denied cases.
3. Reconcile CR-7: either downgrade `defaultMode` to the predicate-satisfied phase or update manifest rows with concrete smoke-probe evidence proving Tier 0/1a/1b/1c/2/3-5 completion and zero amber rows.
4. Add/repair manifest rows for every sibling/local hook exception, explicitly marking effective tier, HNF evidence, and CR-12 fallback status; do not describe them as TIER-1-DIRECT install-class if headers disclose TIER-3 composition.
5. Correct manifest drift for Graphiti now that `.mcp.json` has a `graphiti` entry; include current runtime smoke-probe result.
6. Normalize plugin cache state for hash-version official plugins or document why multiple `.in_use` entries are expected and harmless.
7. Clarify bootstrap count: either keep `.mcp.json` in Section 0 and say 12 bootstrap rows, or remove it from the “11 files” claim.

## Ship Sequence Recommendation

1. Ship MCP pinning first; it is the cleanest deterministic-risk closure.
2. Ship `agent_spawn_gate.py` plugin namespace support second; it removes a live capability contradiction.
3. Ship CR-7 predicate reconciliation third; decide whether this runtime is truly Phase 3 or temporarily unleashed by operator exception.
4. Ship hook provenance manifest cleanup fourth; this is documentation plus conformance framing, not a runtime behavior change.
5. Ship manifest drift/cache hygiene last; lower behavioral risk, but important for future audits.
