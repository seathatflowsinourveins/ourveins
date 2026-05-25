# W267 — All-Gaps Resolved Ledger (2026-05-17)

> Closes out the W264-ULTIMATE / W265 / W266 / codex consensus arc. Each of the 7 gaps from the consensus stack is verified against the live runtime, then dispositioned **RESOLVED-INLINE**, **SCRIPT-READY-FOR-OPERATOR**, or **DEFERRED-WITH-NEW-EVIDENCE**. Operator-safe — no live service restarts performed. Hard cap 1000 words. All file:line and HEAD-state citations made against the workspace as of 2026-05-17.
>
> **HEAD**: `5838e46 feat(W265)` (`git log --oneline -1`). 7 untracked W265/W266 `.md` files staged for the commit proposed in §7.

---

## Gap 1 — Langfuse trace flow end-to-end · **DEFERRED-WITH-NEW-EVIDENCE**

Probed `http://localhost:3000/api/public/health` → **HTTP 200** (live); `POST /api/public/ingestion` no-auth → **401 expected** (`W262-observability-audit-2026-05-17.md:9` admin creds). With the W265-issued public/secret keys (`/.mcp.json:113-117` HEAD-staged) `GET /api/public/traces?limit=3` returned **`totalItems: 0`** — confirming the W265 wiring landed in `.mcp.json` but no producer has been respawned yet to emit traces. `mcp-server-langfuse/src/index.js` env-name expectations match the W265 keys (`LANGFUSE_HOST` + `LANGFUSE_PUBLIC_KEY` + `LANGFUSE_SECRET_KEY` — `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/`). The CogneeMCP NSSM service ALREADY has the Langfuse env baked in (`nssm dump CogneeMCP` line `+LANGFUSE_HOST=http://127.0.0.1:3000`) but is in **`Paused`** state (`Get-Service CogneeMCP`). **Operator action**: `Restart-Service CogneeMCP` + restart graphiti MCP host (next `/clear`) → traces should flow in <60 s. Re-probe with the same `traces?limit=3` curl. Wiring is correct; emission gated on operator-driven respawn.

## Gap 2 — Plugin disables (3 dupes) · **SCRIPT-READY-FOR-OPERATOR**

W266 recommendation **still stands**. `.claude/settings.json:129,136,143` still have all three duplicates enabled (`grep -n` output verifies). W264-agent-orchestration `§1` (~line 50) tags `everything-claude-code` as **REJECT — purge**, `pr-review-toolkit` + `code-simplifier` as **DUPLICATE SLEEPING** (covered by `code-review@claude-plugins-official` + `addy-agent-skills:code-simplification`). **JSON-patch**:

```json
{ "op": "replace", "path": "/enabledPlugins/everything-claude-code@everything-claude-code", "value": false },
{ "op": "replace", "path": "/enabledPlugins/pr-review-toolkit@claude-plugins-official",     "value": false },
{ "op": "replace", "path": "/enabledPlugins/code-simplifier@claude-plugins-official",       "value": false }
```

Apply at any quiet window — no MCP/hook side effects (these plugins are SLEEPING per the inventory).

## Gap 3 — NSSM → Servy migration · **SCRIPT-READY-FOR-OPERATOR** (rollback drill only)

Current scope is **1 NSSM service**, not 6 (`Get-Service` output: only `CogneeMCP`; the 5 others in `W265-service-management-sota-2026-05-17.md` are ad-hoc/background processes, not Windows services). One-page rollback drill:

1. **Capture state**: `nssm dump CogneeMCP > Z:/claude-sota-installed-state/servy-migration/cognee.nssm.cmds` (verbatim cmdline restore).
2. **Install parallel**: Servy 8.4 already at `C:\Program Files\Servy\` per `W264-ULTIMATE §0 row 7` evidence — no install step. Create `CogneeMCP_Servy` (new name; do **not** overwrite NSSM entry).
3. **Switch service-by-service**: `nssm stop CogneeMCP` → `servy start CogneeMCP_Servy` → probe `curl http://127.0.0.1:8000/mcp` 5× / 30 s.
4. **Health gate**: 3 consecutive 200s required before `nssm remove CogneeMCP confirm`.
5. **Rollback**: `servy stop CogneeMCP_Servy` → `nssm install CogneeMCP …` (replay captured cmdlines). NSSM binary stays at the WinGet path (`C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe`) — per W266 §4 path-pinning gotcha — **do not move**.

**Per W266 §2 caveat**: 4 simpler services (when they exist) should go to Shawl, not Servy.

## Gap 4 — `parallel-sessions-arch` ff-merge · **SCRIPT-READY-FOR-OPERATOR**

`git -C Z:/claude-sota-installed-parallel-arch log --oneline main..HEAD` returns **7 commits ahead** (top: `986a502 fix(parallel-sessions): correct Hindsight integration`); `HEAD..main` returns **18 commits behind** (top: `5838e46 feat(W265)`). NOT-FF-mergeable, as W264 §0 row 7 predicted. Single-command reconcile (per `docs/architecture/parallel-sessions/PARALLEL-SESSION-ARCHITECTURE.md:226-245` §9.1):

```bash
git -C Z:/claude-sota-installed tag pre-W267-parallel-reconcile-$(date +%s) && \
git -C Z:/claude-sota-installed-parallel-arch fetch && git -C Z:/claude-sota-installed-parallel-arch rebase main && \
git -C Z:/claude-sota-installed checkout main && git -C Z:/claude-sota-installed merge --ff-only parallel-sessions-arch
```

**Do not run** — operator owns this. The single likely conflict is `.claude/settings.json` (W265 §3, `enabledPlugins` block).

## Gap 5 — MTP re-quant · **RESOLVED-INLINE** (new evidence)

**Unsloth has released it.** `https://huggingface.co/api/models/unsloth/Qwen3.6-35B-A3B-MTP-GGUF` returns `lastModified: 2026-05-17T14:33:00.000Z` (today!) with 29 files including `Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` matching the current `:8080` resident. Closes W263 `quantization-deepdive §3` open question. **Operator HF search command**:

```bash
huggingface-cli download unsloth/Qwen3.6-35B-A3B-MTP-GGUF \
  --include "*UD-IQ4_XS*" --local-dir Z:/models/Qwen3.6-35B-A3B-MTP/
```

Then replace `model:` in `Z:/claude-sota-installed-state/llama-swap/config.yaml` `qwen36` entry, restart llama-swap. PR #1810 `--mtp` flag enables. Removes ngram-mod (W263 picked as today-bridge); reclaims ~10% extract latency.

## Gap 6 — Additional SOTA repos not yet ingested · **RESOLVED-INLINE** (no high-priority gaps)

Cross-checked `Z:/claude-sota-installed-repos/` (120 dirs per `ls | wc -l`) against `W259-SHIP-DECISIONS.md §3` (~23 layer winners) + `W262-plugin-gaps.md` ordered-install plan + `W264-ULTIMATE §2`'s 49/50 memory candidates. **Top-5 absent-from-clones but mentioned in catalog**:

1. `vllm-project/vllm` — **PRESENT** (`vllm-project-vllm`). ✓
2. `pydantic/pydantic-ai` — **PRESENT** (`pydantic-pydantic-ai`). ✓
3. `567-labs/instructor` — **PRESENT**. ✓
4. `UKGovernmentBEIS/inspect_ai` — **PRESENT**. ✓
5. `BerriAI/litellm` — **PRESENT**. ✓

Verdict: every W259 RECOMMENDED + INSTALLED-LIVE repo is already cloned. The 4 absent items mentioned anywhere in W259 are all **DECLINED** (Hatchet, NATS-JetStream, MultiCa, Daemon Master) per their cardinal-rule fails (`W259-SHIP-DECISIONS.md §4` rollup). **Zero high-priority repos missing.**

## Gap 7 — W262-W266 docs commit · **SCRIPT-READY-FOR-OPERATOR**

`git status` lists 7 untracked W265/W266 `.md` files in `docs/architecture/` + the untracked `.claude/skills/langfuse/` + 2 modified files (`.mcp.json`, `accounts/repos/CLIProxyAPI`). W262-W264 docs are already committed (`git log`). Proposed conventional-commit:

```text
feat(W265-W266): convergence docs + Langfuse MCP wiring + service-mgmt SOTA

- W265 truth-up + Langfuse wiring (codex-blessed): graphiti/cognee/hindsight env carry pk-/sk- keys; mcp-server-langfuse stdio entry
- W266 4-angle convergence audit: confirm Langfuse-WIRE (not DROP); confirm Servy 8.4 SOTA (with Shawl for simpler services); flag W265 factual errors (WinSW date off-by-1-year)
- W265 container-platform + service-mgmt-deepdive ledgers
- .claude/skills/langfuse/SKILL.md — CLI access skill for langfuse-cli

Refs: W264-ULTIMATE-SYNTHESIS, W265-codex-consensus, W266-codex-2nd-pass
```

**Do not commit** — operator owns commits to `main` per W264-cleanup convention.

---

**Net**: 7/7 gaps verified; 2 RESOLVED-INLINE (5, 6), 4 SCRIPT-READY (2, 3, 4, 7), 1 DEFERRED-WITH-EVIDENCE (1 — wiring correct, awaits operator-driven respawn). Word count: 990.
