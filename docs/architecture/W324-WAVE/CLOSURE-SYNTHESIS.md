# W324 META-FOUNDATION — CLOSURE SYNTHESIS

**Ship-date**: 2026-05-19
**codex gate**: r1-r10 REVISE → **r11 APPROVE** (operator-extended; 19/19 repos 2026-May verified)
**Falsifiable-inverse template**: codex r11 ratified per-P-block counterfactuals (anchors in tmp/w324-ranking-r11.txt)
**Dispatch discipline**: W269/W312-D 4-Agent/1-msg parallel-ratio **1.000** for primary P0-P3 ship batch

## Ship-gate verification

| Gate | Status | Evidence |
|---|---|---|
| Regression `node --test tools/test-msys-norm.mjs` | ✓ **42/42 PASS** | exit 0, 7 suites, 0 fail |
| ruff `harness/eval_harness.py + tools/` | ✓ **CLEAN** | "All checks passed!" exit 0 |
| pyright `harness/eval_harness.py` | ✓ **0/0/0** | 0 errors / 0 warnings / 0 informations |
| `self_invented_count: 0` invariant | ✓ **HOLDS** | rules-dir ABSENT + hooks/scripts ABSENT; only 1656B R2-shim `context-mode-cache-heal.mjs` |
| CLAUDE.md ≤50 LOC body | ✓ HOLDS | 40 body lines + appendix |
| Cardinal rules R1-R4 | ✓ HOLD | trusted-source primitives + direct-CLI hooks + upstream subagents + project-behavior-in-CLAUDE.md |
| Cardinal rule R5 | ⚠ PARTIAL-HOLD carry-forward | `bypassPermissions:true` 7-wave SHIP-BLOCKER convergent (W316-S1 + W314-E + W316-S4 + W316-S5-L7 + W317-S1 + W319-D + W324) — sca-v9 §6 R5 5-control layered-defense codified; operator-decision pending W325 |

## P0-P8 dispositions

### P0 — anthropics/skills@690f15ca ANTI-SELF-INVENT HOUSEKEEPING ✓ SHIPPED
**Agent A** ran in parallel with B/C/D; clean file-ownership boundary.

**Repaired**:
- `.claude/skills/learned/SKILL.md` — was empty dir; created minimal valid skill (YAML + body + cite-anchor anthropics/skills@690f15ca)
- `.claude/skills/gitnexus/SKILL.md` — was discoverability-broken (no parent index over 7-skill namespace); created umbrella router indexing guide/cli/exploring/impact-analysis/debugging/refactoring/pr-review children

**Archived** (`git mv` preserves history; reversible):
- `.claude/skills/interview-me/` → `_archived/W324-deprecated/interview-me/`
- 4× `addyosmani-*` prefix-dups → `_archived/W324-deprecated/` (each verified true-dup of canonical non-prefixed variant)

**Verified**:
- `goal-prompt-synthesis/SKILL.md`: **348 LOC** ≤500-cap (margin 152) ✓
- `self_invented_count: 0` ✓
- R2-exception shim sole content: `.claude/hooks/context-mode-cache-heal.mjs` 1656B ≤2KB (cite-anchored to anthropics/claude-code#46915)

### P1 — sca-v9 SHIP D35+D38+D39+D40+D41 + R5 5-control ✓ SHIPPED
**Agent B** rewrote rubric inline.

**Archive**: `.claude/skills/_archived/W324-pre-sca-v9/SKILL-sca-v8.1-partial.md` (sha1 `f6716593`; 1629 LOC; 227,282 B; full git rename history preserved)

**New sca-v9 SKILL.md**: 338 LOC (post-format; ~79% compression vs 1629; well under 1200 cap; sha1 `d391c50d` at write-time)

**Dimension coverage** (40 total): D1-D34 + D-EMP + D35 + D38-D41 (D36/D37 META-DIMs preserved at W=0.0)
- **D35** `cc_pathway_support` — primitive surfaces (skill/agent/hook/MCP/plugin/command)
- **D38** `mcp_integration_native` — MCP spec 2025-06-18 + createSdkMcpServer compat
- **D39** `opus_4_7_compat` — 1M-context + alwaysThinkingEnabled + effortLevel-aware
- **D40** `local_runtime_z_portable` — Z:-portable install fit
- **D41** `autonomous_loop_compat` — Stop-hook + `claude --bg` integration

**R5 5-control layered-defense** (§6):
1. **Deny-default permissions** (NIST 800-53 AC-3(3) + OWASP A01 + MS Zero-Trust)
2. **Audit logging** (NIST 800-53 AU-2 + OWASP A09 + CIS CSC-8)
3. **Secret redaction** (OWASP A02 + NIST 800-53 SC-28 + gitleaks)
4. **Egress policy** (NIST 800-53 SC-7 + OWASP A10 + CNCF NetworkPolicy)
5. **Drift detection** (NIST 800-53 CM-8 + OWASP A06 + SLSA v1.0 L3)

**Composite denom**: install 28.7→**33.7** (+D-EMP 1.0 + D35-D41 5.0); pattern 12.9→**14.5** (+D-EMP 0.5 + D35-D41 1.1)

**Cite-anchor discipline**: 3-org-distinct anchors per dim (OWASP / NIST / W3C / Anthropic / Microsoft / Google-SRE / OpenSSF / CNCF / SLSA / freedesktop.org / OpenAI / MCP-WG / wshobson); 0 fabricated URLs.

### P2 — anthropic-sdk-python@28cdc336 THREE ADOPT-NOW ✓ SHIPPED
**Agent C** added 3 opt-in features in `harness/eval_harness.py`:

- **`--cache-1h`** (`_w324_apply_cache_1h` + `_w324_log_cache_usage`): 1h prompt-caching beta-header + `cache_control={"type":"ephemeral","ttl":"1h"}` on system+user blocks; cite https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
- **`--batch`** (`_w324_run_via_batch`): `client.messages.batches.create([...])` with exponential-backoff polling; cite https://docs.anthropic.com/en/docs/build-with-claude/batch-processing
- **`--structured <schema>`** (`_w324_apply_structured` + `_w324_validate_structured`): JSON-schema-validated response_format; jsonschema-primary + pydantic.TypeAdapter-fallback; cite https://docs.anthropic.com/en/docs/build-with-claude/structured-outputs

**LOC delta**: 1878 → **2258** (+380, all additive, gracefully-degrading on older SDK versions)

**Lint**: ruff exit 0 + pyright **0/0/0** new errors

**W325 carryover**: harness has no current direct `anthropic.Anthropic().messages.create()` call site (existing flow through claude_agent_sdk.query + inspect_ai.eval + promptfoo CLI); 3 helpers + module-global `W324_FEATURES` dict ready for direct-API promotion via `advisor_pilot_stub`.

### P3 — Node-22 node:test + MCP SDK pattern ✓ SHIPPED
**Agent D** migrated `tools/test-msys-norm.mjs`:

- **Pre**: 147 LOC, 42 handcrafted tests, console.log "ok N" pattern
- **Post**: 148 LOC, **42 tests in 7 suites** (1 outer describe edges + 1 outer describe regression + 5 nested env-shape suites)
- **node:test API**: `describe` / `test` / `before` from `node:test` + `node:assert/strict`

**Triple-invocation verified**:
1. `node --test tools/test-msys-norm.mjs` → 42 pass / 0 fail / exit 0
2. `node --test --test-reporter=spec ...` → 42 green check-marks / exit 0
3. `node tools/test-msys-norm.mjs` (bare, no --test) → top-level auto-run / 42 pass / exit 0

**Bonus**: `tools/mcp-eval-stub.mjs` 33 LOC pattern-stub demonstrating `createSdkMcpServer` from `@anthropic-ai/claude-agent-sdk` (REFERENCE-ONLY; not wired; ≤50 cap)

### P4 — wshobson/agents@08ded5e7/plugins/git-pr-workflows ◐ PARTIAL
**commitlint half ✓**:
- `@commitlint/cli@21.0.1` ≥17 numeric floor (verified `npm view`)
- `commitlint.config.js` PRESENT (2081B; extends `@commitlint/config-conventional`; 13 types incl `ship`+`wip`)

**Plugin install STAGED**: paste-ready at `P4-GIT-PR-WORKFLOWS-INSTALL.md` (CC `/plugin install` is interactive — operator runs `/plugin install git-pr-workflows@claude-code-workflows`)

**flock(2) SessionStart bare-resume detect**: DEFERRED W325 (Windows POSIX flock requires WSL2 or msys64 dep)

### P5 — Tavily + Exa MCP ✓ SHIPPED (env-pending)
**`.mcp.json` additions** (after `playwright`, before closing `mcpServers` brace):
- `tavily` → `npx -y tavily-mcp@0.2.19` with `${TAVILY_API_KEY}` env-interp
- `exa` → `npx -y exa-mcp-server@3.2.1` with `${EXA_API_KEY}` env-interp

Both versions ≥0.1 floor (verified `npm view`); CR-9 version-pin compliant.

**CLAUDE.local.md env**: TAVILY/EXA marker block APPENDED (gitignored; operator populates real keys per W317-r2 perplexity precedent).

### P6 — jdx/mise@a52390df + compose-spec.io ✓ SHIPPED
**Probed state**:
- `mise` PRESENT at `Z:\claude-sota-installed\.local\bin\mise.exe` — version **2026.5.3** ≥calver-2024 floor ✓ (advisory 2026.5.12 patch available)
- `docker compose` PRESENT — **5.1.3** ≥2 floor ✓
- `lazygit` PRESENT via winget
- `docker ps`: **observability stack running** (langfuse-web + langfuse-worker + grafana + phoenix + prometheus all healthy via `Z:\claude\observability\docker-compose.yml`)

**Project mise.toml CREATED** (Z:\claude-sota-installed\mise.toml; pins node@22 / python@3.13 / go@1.26 / uv@latest / gh@latest / lazygit@latest; `legacy_version_file: true` for .nvmrc/.python-version back-compat)

**No project-root docker-compose.yml needed**: langfuse + cognee + phoenix are externally-managed (cognee via NSSM CogneeMCP; langfuse + phoenix via the parent `Z:\claude\observability\docker-compose.yml`). Adding a duplicate compose file would create dual-management drift.

### P7 — GitNexus@803f0bed + planning-with-files@d27008f3 ◐ PARTIAL
**GitNexus**: CONDITIONAL — currently `enabledPlugins.gitnexus@gitnexus-marketplace: false`; PolyForm-NC operator-gate per goal directive. README L128 PreToolUse auto-graph-enrichment is the UNIQUE capability vs grep+serena. Operator-decision required for ENABLE (license commitment).

**planning-with-files sidecar SHA-256**: ✓ SHIPPED via `tools/planning-attest.ps1`:
- ≤2KB (1.0KB actual; well under cap)
- Cite-anchored: OthmanAdi/planning-with-files@d27008f3 + in-toto vendor-neutral attestation falsifiable-inverse
- Usage: `.\tools\planning-attest.ps1 -Sign task_plan.md` (creates `task_plan.md.sha256`) + `-Verify` (compares hash, exit 3 on drift)
- Placement under `tools/` (not `.claude/hooks/`): cardinal-rule-2 compliant since not a hook body
- Operator-invocable; not auto-fired (no PreToolUse wiring this wave)

### P8 — slsa-verifier + signed-audit-trails ✓ SHIPPED (advisory)
**signed-audit-trails ✓ DISABLED**: `.claude/settings.json:enabledPlugins.signed-audit-trails@claude-code-workflows: true → false` — pre-state was "false-assurance" condition (plugin loaded, no PostToolUse Ed25519 hook wired). Now: no false claim made. Re-WIRE path documented in `P8-SLSA-VERIFIER-AND-SIGNED-AUDIT-DECISION.md`.

**slsa-verifier STAGED** (advisory-first; not auto-installed): paste-ready `go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@v2.7.0` for operator. Falsifiable-inverse: in-toto + cosign + `gh attestation verify` (3 independent vendors per W324 r11 ratified).

## Carryover to W325

- **P4 plugin install**: operator interactive `/plugin install git-pr-workflows@claude-code-workflows`
- **P4 flock(2)**: SessionStart bare-resume detect on Windows (WSL2 or msys64 path)
- **P5 env keys**: TAVILY_API_KEY + EXA_API_KEY values (CLAUDE.local.md, gitignored)
- **P7 GitNexus**: PolyForm-NC license operator-gate decision
- **P8 slsa-verifier**: operator go install + PreToolUse advisory wiring
- **R5 cardinal-rule** carry-forward: `bypassPermissions:true` + sandbox `enabled:false` 7-wave SHIP-BLOCKER (operator-decision; sca-v9 §6 5-control codified)
- **W317 STREAM-E**: 4 upstream PRs (operator GH-account)
- **W320 P5**: shell defensive long-tail (16 HIGH × 12 .ps1; bash-pro agent staged)
- **W320 P7**: CLAUDE.md cite-corrections (OllamaServe + LlamaSwap docs)
- **anthropic-SDK W325**: 3-helper integration with direct-API call site once advisor_pilot_stub promotes to live

## Parallel-dispatch metrics (W269/W312-D)

This wave: **4 Agent calls in 1 assistant message** for P0-P3 primary ship batch.
- parallel_ratio (this dispatch) = 4/4 = **1.000**
- target ≥0.7: ✓ PASS
- ship-batch file-ownership boundaries: cleanly non-overlapping (A: skills/ non-rubric; B: skills/sota-convergence-audit/; C: harness/eval_harness.py; D: tools/test-msys-norm.mjs + tools/mcp-eval-stub.mjs)
- 0 file-conflict races observed

## codex GPT-5.5 cross-model gate

W324 codex r1-r10 REVISE → **r11 APPROVE** already achieved (W295 §6.2 ratification on the PLAN). Plugin-native Stop-hook auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37 stop-review-gate-hook.mjs` (900s timeout) on the APPLY commit; this synthesis represents the application of the codex-r11-APPROVE'd plan.

## Net delta this wave

- 5 new files: `mise.toml` + `tools/planning-attest.ps1` + `tools/mcp-eval-stub.mjs` + 3 W324-WAVE docs
- 2 modified files: `.mcp.json` (P5 +14 lines) + `.claude/settings.json` (signed-audit-trails false; P5/P8 path)
- 1 modified: `harness/eval_harness.py` (+380 LOC additive)
- 1 modified: `tools/test-msys-norm.mjs` (147→148 LOC; rewritten to node:test format)
- 5 archives (`git mv`): 4× addyosmani-* prefix-dups + interview-me → `.claude/skills/_archived/W324-deprecated/`
- 1 archive (`git mv`): sota-convergence-audit/SKILL.md (sca-v8.1-partial 1629 LOC) → `.claude/skills/_archived/W324-pre-sca-v9/`
- 1 rewrite: `.claude/skills/sota-convergence-audit/SKILL.md` (now sca-v9; 338 LOC)
- 2 repairs: `.claude/skills/{learned,gitnexus}/SKILL.md`

## STOP-condition compliance

- ✓ self_invented_count: 0
- ✓ preload respected (CLAUDE.md ≤50 LOC body)
- ✓ regression `node --test tools/test-msys-norm.mjs` 42/42 PASS
- ✓ codex r11 APPROVE (gate; pre-application)
- ✓ 2026-May freshness re-verified at apply time (sca-v9 dim anchors + planning-attest cite + slsa-verifier @v2.7.0)
