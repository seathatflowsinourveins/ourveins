# W319 Stream D — Runtime Cleanness v7 Synthesis

**Date**: 2026-05-19
**Stream owner**: Stream D of W319 SOTA-unleash 4-stream parallel sweep
**Scope (strict)**: `docs/architecture/W319-RUNTIME-CLEANNESS-V7/*`
**Method**: empirical probes (NSSM, Docker, TCP, HTTP MCP handshakes, `git ls-remote`, file Read) + grep regex sweep + cross-cite SHA reconciliation
**Outputs** (this directory):
- `STREAM-D-SILENT-FALLBACK-V7.md` (11 hook commands + 4 tool-script clusters + 3 SKILL bash cites audited)
- `STREAM-D-STALE-REFS.md` (8 stale-reference findings)
- `STREAM-D-SERVICE-HEALTH.md` (NSSM + Docker + ports + MCP handshakes + GPU)
- `STREAM-D-CLI-AND-MCP.md` (11 CLI versions + 13 MCP servers)
- `STREAM-D-ECOSYSTEM.md` (gitignore + pre-commit + commitlint + docker info + worktrees)

---

## §1. Headline verdict

**Runtime cleanness HOLDS at v7**. The five W314-r2 silent-fallback fixes (gitleaks `|| exit 2`, ruff `exit $rc`, WorktreeRemove diagnostic, cache-heal `exit 1`, plus W318 trivy `PIPESTATUS[0]`) are **all VERIFIED LIVE** in `.claude/settings.json` HEAD `d8e9a02`. **0 fix-regression**. **0 new HIGH silent-fallback** in hook channel. Service health is **+3 over W317-r2** baseline (grafana + prometheus + nvidia-gpu-exporter recovered) with **0 regression** and **1 NEW undocumented service** (BasicMemoryHTTP NSSM on :8765).

Eight cite-drift findings (1 HIGH + 5 MED + 2 LOW) accumulated since W315-r2. These are administrative noise (cite-SHA refresh, stale historic targets, doc invariant lines) — they do not affect runtime behavior but should clear at W320 to maintain CLAUDE.md as ground-truth.

**No SEV-1 leaks observed in this stream's outputs**. The W317-r2 SEV-1 perplexity API key leak remains an OPEN operator-AI (W317-r2-SEV1-1 ROTATE). The key is still present in process env (53 chars; not echoed in any W319 artifact).

---

## §2. Ranked findings (HIGH first, then MED, LOW; all collated cross-doc)

### HIGH (1)

**STALE-D-4 HIGH** — Phantom ECC target SHA `f3cd00625222` still cited in CLAUDE.md  
- W316-D + W317-D-PLUGIN-UPDATE-STATUS deferred this update to operator
- W317-r2 S1 codex-confirmed: "operator W316 target `f3cd00625222` NOT FOUND in upstream history — fresh HEAD correct per W270 CR-1 corollary"
- CLAUDE.md still references the phantom target in W316/W317 status appendices
- **Fix**: cite-refresh `f3cd00625222` → upstream HEAD `98bd517451` (verified live this Stream)

### MEDIUM (10)

**MED-1** — PreCompact log-append silent-fallback (`.claude/settings.json:154`)  
- `Add-Content ... -ErrorAction SilentlyContinue; exit 0` — log-write failures silently dropped
- Carry-forward from W314-r2 F-8 (deferred); fix-pattern paste-ready (see STREAM-D-SILENT-FALLBACK-V7.md §1 MED-1)

**STALE-D-1 MED** — settings.json size invariant falsified  
- Actual 15,964 bytes; CLAUDE.md invariant claims 15,351 ≤ 15,360
- Root cause likely W317-S3 sandbox+worktree blocks + W320 env-mirror accumulated
- **Fix**: either trim settings.json by 600 B OR rationalize cap up to next p2 (16,384)

**STALE-D-2 MED** — CCBP cite SHA drift  
- L3 cites `48f2ceb`; local HEAD `48798ca`; upstream HEAD `9624c4ac`
- CCBP repo is `shanraisshan/claude-code-best-practice` per W314-r2 owner-rename
- **Fix**: cite-refresh L3 SHA

**STALE-D-3 MED** — ECC plugin SHA drift  
- Installed plugin gitCommitSha `8148340a`; local /z/repos/deps HEAD `b62f8075`; upstream `98bd517451`
- **Fix**: `/plugin update everything-claude-code@everything-claude-code` (carry-forward W316-D + W317-D)

**STALE-D-5 MED** — mattpocock-vendor-fork-4 deps dir missing  
- CLAUDE.md L30 references `mattpocock-vendor-fork-4` path; actual dir is `mattpocock-skills`
- Upstream `github.com/mattpocock/agent-skills` returns 404 (repo renamed/moved)
- Local skill files (grill-with-docs, tdd, caveman, diagnose) at `.claude/skills/` ARE intact
- **Fix**: update CLAUDE.md L30 cite to either `mattpocock-skills` (local dir name) OR remove the source pointer + note "vendor-fork-of-record at .claude/skills/{...}"

**STALE-D-7 MED** — W320 env-mirror in CLAUDE.local.md vs subagent shell  
- CLAUDE.local.md `(f3)` block claims authoritative-copy of CLAUDE_PLUGIN_DATA etc. in settings.json:env
- Empirical: settings.json:48-53 has the values, but Stream D shell process env is EMPTY for all 6 vars
- Diagnosis: settings.json env-injection scope unclear (CC-main? forked subagent? ctx-mode shells?)
- **Fix**: root-cause the env-propagation gap OR remove the W320 mirror from CLAUDE.local.md

**STALE-D-9 MED** — langfuse MCP CR-9 violation (Z:-baked abs node path)  
- `.mcp.json:52-53` uses `node + Z:/claude-sota-installed-repos/langfuse/...build/index.js`
- Inverse of W286-cross rollback applied to 4 other MCPs (playwright/chrome-devtools/repomix/phoenix)
- No documented exemption rationale in `_comments` blocks
- **Fix**: either publish `mcp-server-langfuse` to npm + repin OR document exemption in `_comments.langfuse_w265_pin_exemption`

**CLI-3 MED** — `claude doctor` regression  
- Was EXIT=124 hang (W312-A.2 / W316-S4 5th-wave); now EXIT=0 silent (LINES=0)
- Different failure mode; either is broken
- **Fix**: file upstream issue at anthropics/claude-code (carry W316-S4 W317-AI; if not filed, file now)

**MCP-1 MED** — gitnexus MCP `gitnexus mcp` invocation  
- `.mcp.json:36-40` relies on npm-global gitnexus install (not `npx -y gitnexus@v1.6.4-rc.112 mcp`)
- Fresh-clone failure: MCP dead until operator runs install separately
- **Fix**: migrate to `npx -y gitnexus@1.6.4-rc.112 mcp` form

**SH-1 MED** — Undocumented `BasicMemoryHTTP` NSSM service  
- New since CLAUDE.md last update — NSSM service Running, :8765 OPEN, MCP-compliant
- Dual-channel with `.mcp.json` uvx-stdio basic-memory entry
- Wastes a slot if redundant (always-on HTTP server)
- **Fix**: investigate dual-channel rationale; consolidate if redundant OR document the architectural choice

### LOW (10)

**STALE-D-6 LOW** — CLAUDE.md L47 references W300-AI-1 "memory MCP in disabledMcpjsonServers"; actual `.mcp.json:94` shows empty array (block was deleted, not disabled). Cite-refresh.

**STALE-D-8 LOW** — `/z/z/` phantom dir remnant from W317-FULL-MSYS-FIX-WAVE. Empty dir + `claude → /z/claude` symlink. Bait for path-mangle (proven via this Stream D's ctx_execute_file failure). **Fix**: `Remove-Item Z:\z -Recurse -Force`

**SH-2 LOW** — CLAUDE.md "OllamaServe idle/0-models" stale — empirical 2 models loaded

**CLI-1 LOW** — codex 0.130.0 → 0.131.0 drift (1 patch behind)

**CLI-2 LOW** — Python 3.13 → 3.14.3 drift in CLAUDE.local.md note

**MCP-4 LOW** — context-mode v1.0.136 → v1.0.141 upgrade pending (operator-AI carry)

**MCP-5 LOW** — ECC plugin update pending (carry-forward STALE-D-3)

**ECO-4 LOW** — Docker MCP plugin v0.42.0 — evaluate for MCP-protocol surface

**ECO-6 LOW** — W287 worktree branch `goal/W287-reconcile` likely stale; verify need

**ECO-7 LOW** — `.mcp-memory-service/` empty residue dir at repo root; cleanup

---

## §3. W320 operator-AIs (≤15 prioritized)

### P0 — Cardinal-rule discipline / SEV-1 carry-forwards (3)

1. **W320-P0-1**: **PERPLEXITY API KEY ROTATION** (W317-r2-SEV1-1 STILL OPEN). Key was leaked in W317-r2 S7 line 124 (operator redacted inline). Key is still PRESENT in process env. Rotate at perplexity.com/settings/api + update CLAUDE.local.md sidecar.
2. **W320-P0-2**: **R5 SHIP-BLOCKER carry** (5+ wave finding now 6+ — W316-S1, W314 Stream E, W316-S4, W316-S5 L7, W317-S1, W319 Stream D §1 settings.json:92 + L415). `permissions.defaultMode:"bypassPermissions"` + `sandbox.enabled:false` + `allowUnsandboxedCommands:true` + `skipDangerousModePermissionPrompt:true`. Operator decision needed: (a) accept and document explicitly; (b) enable sandbox per CCBP `claude-settings.md:446-461`; (c) tighten defaultMode to `acceptEdits` or `confirm`.
3. **W320-P0-3**: **STALE-D-4 HIGH** — purge phantom ECC target `f3cd00625222` from CLAUDE.md (replace with upstream HEAD `98bd517451`).

### P1 — Silent-fallback hardening + cite-refresh (5)

4. **W320-P1-1**: Apply MED-1 PreCompact log-append fix — `try { Add-Content -ErrorAction Stop } catch { Write-Error ... }; exit 0` (≤500 char CR-2 compliant, paste-ready in STREAM-D-SILENT-FALLBACK-V7.md §1 MED-1).
5. **W320-P1-2**: STALE-D-7 — root-cause W320 env-mirror gap (CLAUDE_PLUGIN_DATA etc. empty in subagent shell). Either fix propagation OR remove the CLAUDE.local.md `(f3)` block.
6. **W320-P1-3**: STALE-D-9 + MCP-2 — resolve langfuse MCP Z:-baked path. Publish to npm OR document exemption in `_comments.langfuse_w265_pin_exemption`.
7. **W320-P1-4**: STALE-D-2 + STALE-D-3 — cite-refresh CLAUDE.md L3 CCBP `48f2ceb`→`48798ca` (local) or `9624c4ac` (upstream); refresh ECC SHA `8148340a`→`b62f8075`/`98bd517451`.
8. **W320-P1-5**: CLI-3 — file upstream `claude doctor` regression report at github.com/anthropics/claude-code (W316-S4 AI carry).

### P2 — Service consolidation + plugin updates (4)

9. **W320-P2-1**: SH-1 — investigate dual basic-memory channel (uvx stdio in `.mcp.json` + NSSM `BasicMemoryHTTP` on :8765). Consolidate if redundant or document architectural rationale.
10. **W320-P2-2**: MCP-4 — run `/ctx-upgrade` to advance context-mode plugin 1.0.136 → 1.0.141.
11. **W320-P2-3**: MCP-5 + STALE-D-3 — `/plugin update everything-claude-code@everything-claude-code` to refresh installed plugin SHA toward upstream.
12. **W320-P2-4**: MCP-1 — migrate gitnexus MCP invocation `gitnexus mcp` → `npx -y gitnexus@1.6.4-rc.112 mcp` for fresh-clone-safety.

### P3 — Cosmetic / hygiene (3)

13. **W320-P3-1**: STALE-D-1 — reconcile settings.json size invariant (actual 15,964 vs claimed 15,360 cap). Either trim or update cap.
14. **W320-P3-2**: STALE-D-8 + ECO-7 — phantom dir cleanup: `Remove-Item Z:\z -Recurse -Force` + `rmdir .mcp-memory-service` at repo root.
15. **W320-P3-3**: STALE-D-5 + SH-2 + CLI-1 + CLI-2 — cite-refresh batch: (a) CLAUDE.md L30 fix mattpocock-vendor-fork-4 path; (b) update "OllamaServe idle/0-models" → "2 models loaded"; (c) `npm install -g @openai/codex@0.131.0`; (d) update CLAUDE.local.md "Python 3.13" → "3.14.3".

---

## §4. What Stream D verified (positive findings)

| Item | Status |
|------|--------|
| W314-r2 gitleaks `\|\| exit 2` fix (F-1) | ✓ LIVE settings.json:112 |
| W314-r2 trivy → W318 F-V6-1 `PIPESTATUS[0]` fix | ✓ LIVE settings.json:116 |
| W314-r2 ruff/shellcheck rc-propagation (F-3) | ✓ LIVE settings.json:143 |
| W314-r2 cache-heal `exit 1` on top-catch (F-6) | ✓ LIVE context-mode-cache-heal.mjs:28 |
| W314-r2 WorktreeRemove diagnostic (F-9) | ✓ LIVE settings.json:164 |
| W317-A Δ34 supersession-lint advisory mode | ✓ LIVE settings.json:131 |
| W295 graphiti retired (`disabledMcpjsonServers: []`) | ✓ CONFIRMED `.mcp.json:94` |
| W295 FalkorDB :16379 STOPPED-by-design | ✓ port CLOSED |
| W316-S6 Hindsight :9077 retired | ✓ port CLOSED |
| W316-r2 chrome-devtools-mcp @0.26.0 → @1.0.1 | ✓ pinned `.mcp.json:24` |
| W317-S7 perplexity MCP @0.9.0 + env-interpolation | ✓ pinned `.mcp.json:77`; key 53-char env-present |
| W317-FULL-MSYS-FIX-WAVE normalizeMsysPath | ✓ functional (no doubled `\z\` in hook execution) |
| W313 graphiti `.mcp.json` excision commit `5a350d1` | ✓ no graphiti entry in mcpServers |
| Cardinal rules R1-R4 | ✓ HOLD |
| Cardinal rule R5 | ⚠ PARTIAL-HOLD (carry-forward W320-P0-2) |
| `self_invented_count: 0` invariant | ✓ HOLD (5 addyosmani + 4 mattpocock are operator-curated vendor-forks per CR-4) |
| CLAUDE.md body ≤50 LOC | ✓ HOLD (~49 LOC per W317-A) |
| 13/14 services healthy (NSSM + Docker) | ✓ +3 over W317-r2 baseline |
| 17/17 expected-OPEN ports OPEN | ✓ 100% match |
| 5/5 expected-CLOSED ports CLOSED | ✓ 100% match |
| Cognee 1.26.0 MCP handshake | ✓ live `serverInfo` returned |
| Langfuse 3.170.0 health 200 | ✓ live |
| LlamaSwap :8090 /v1/models 200 in 2.6ms | ✓ live |
| OllamaServe 2 models loaded (qwen3-coder + qwen3-embedding) | ✓ live |
| Cardinal-rule-2 invariants (no `\|\| true` swallowing in hooks) | ✓ HOLDS |
| `.claude/hooks/context-mode-cache-heal.mjs` ≤2KB sanctioned exception | ✓ 1,656 B (W314-r2 hardened) |
| `.mcp.json` 10/13 servers CR-9 compliant (npx/uvx with @pin) | ✓ (3 risks tracked: gitnexus + langfuse + memory-deleted-not-disabled) |

---

## §5. Comparison to prior wave baselines

| Metric | W315-r2 (E) | W316-r2 (S6) | W317-r2 (S6) | **W319 Stream D** |
|--------|-------------|--------------|--------------|---------------------|
| Services healthy / total | 7/10 | 8/10 | 8/10 + Langfuse-recovering | **13/14** |
| Silent-fallback fixes verified live | 4/4 | 5/5 | 5/5 | **5/5** |
| New HIGH findings | 0 | 0 | 0 | **0** |
| Stale-cite findings | 17 (Stream B) | 6 (S3) | n/a | **8** |
| MCP CR-9 violations | 0 | 0 | 1 (langfuse) | **3** (gitnexus + langfuse + minor) |
| W314-r2 fix regressions | n/a | 0 | 0 | **0** |
| Cardinal-rule R5 status | OPEN | OPEN | PARTIAL-HOLD | **PARTIAL-HOLD** (6+ findings now) |

**Trend**: silent-fallback hardening HOLDS; cite-drift accumulating (operator-AI deferrals stack up); service health IMPROVING; R5 sandbox/bypassPermissions remains the single multi-wave SHIP-BLOCKER carrying forward.

---

## §6. Recommendation

Stream D recommends operator schedule a **W320 housekeeping wave** that focuses ON nothing but the 15 operator-AIs above (in priority order). No new feature work, no new SOTA audits — just close the deferred backlog. The runtime is in **good shape on functional behavior** (services up, fixes in place, no regressions) but the **administrative ground-truth in CLAUDE.md drifts cycle-over-cycle** because each new wave's S{N} stream defers cite-refreshes to "W{N+1} operator" — which has now compounded 8 times.

The **W320-P0-2 R5 SHIP-BLOCKER** is the only finding that materially affects future ship gates. The other 14 AIs are 15-90 minute closures total.

---

**End STREAM-D-SYNTHESIS.md — W319 Stream D complete.**
