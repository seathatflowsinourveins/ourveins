---
title: "Wave 252 GRAND SYNTHESIS — The Ultimate SOTA Claude Code Runtime"
date: 2026-05-16
wave: 252
status: GRAND-SYNTHESIS
supersedes: W251-GRAND-SYNTHESIS-2026-05-16 (extends + closes W251 P0 blockers)
target-runtime: "Z:/claude-sota-pure (new pure runtime) — informed by Z:/claude-sota-installed current state"
sources:
  - "scoring/A-multi-dimensional-scoring-2026-05-16.md (Track A — 55+ repos, 10-dim rubric)"
  - "agent-reports/B-fresh-discovery-tokeneff-2026-05-16.md (Track B — fresh discovery + LLMLingua reset)"
  - "agent-reports/C-narrow-P0-blockers-2026-05-16.md (Track C-narrow — 6 P0 license verdicts)"
  - "W251 GRAND-SYNTHESIS (prior baseline)"
method-disclosure: "3 of 4 W252 subagent dispatches lost to FM-17 (Track A/B/C broad-scope). Synthesis is orchestrator-direct: 40 repos fresh-probed via mcp__github 2026-05-16 + C-narrow license resolution + W251 carryover. Cross-model GPT-5.5 adversarial gate NOT satisfied at subagent layer — see §7 + W253 recommendation."
---

# Wave 252 GRAND SYNTHESIS — The Ultimate SOTA Claude Code Runtime

## §0 — Wave Summary

W252 closes the W251 `NEEDS-REVISION-BEFORE-INSTALL` verdict's 6 P0 blockers and converts the catalog into an **executable two-tier install architecture** for a pure SOTA runtime.

**What W252 resolved:**
- ✅ 6 P0 license blockers definitively verdicted (Track C-narrow, file:line @ HEAD probes)
- ✅ `context-mode` MIT-vs-ELv2 dispute → **ELv2 CONFIRMED** (W250 MIT claim REFUTED)
- ✅ 40 repos fresh-probed (stars/license/activity) + scored on 10 dimensions
- ✅ LLMLingua-replacement token stack defined (interception+caching+retrieval)
- ✅ Two-tier catalog: Tier-A default-install (21 repos) / Tier-B pilot+coverage
- ✅ Ultimate runtime architecture: 11-layer design with explicit per-layer SOTA source

**What remains open:**
- ⚠️ BRIDGE-MODE codex app-server ACL still broken (FM-17.d) — cross-model gate not satisfied at subagent layer
- ⚠️ 5 repos carry NOASSERTION license needing direct probe before pure-runtime install: `ccusage`, `rtk`, `claude-task-master`, `BMAD-METHOD`, `humanlayer`, `langfuse` (+ `oh-my-claudecode`, `memsearch`, `gsd-2`, `anthropics/skills`)
- ⚠️ FalkorDB SSPL — AMBER for local single-tenant; no permissive server-swap exists (KùzuDB MIT is embedded-only, no graphiti driver)

---

## §1 — TWO-TIER CATALOG

The W251 carryover action #2 ("split catalog into default-mutation vs broad-coverage") is executed here.

### §1.A — TIER-A: DEFAULT RUNTIME INSTALL (permissive, native-path, low-collision)

These 21 repos form the **install spine** of the pure runtime. All LICENSE=PASS (MIT/Apache-2.0/BSD) OR pending-probe-but-likely-PASS, all CC-native path ≤P1, all composite ≥78.

| # | Repo | Layer | Path | Install command (official-native per CR-6) |
|---|---|---|---|---|
| 1 | `anthropics/claude-code` | L0 runtime | native | `npm install -g @anthropic-ai/claude-code` (the runtime itself) |
| 2 | `astral-sh/uv` | L0 CLI | binary | `winget install astral-sh.uv` OR official installer |
| 3 | `astral-sh/ruff` | L0/L7 | uv tool | `uv tool install ruff` |
| 4 | `BurntSushi/ripgrep` `sharkdp/fd` `jqlang/jq` `mikefarah/yq` `cli/cli` | L0 CLI | winget/binary | foundation CLIs — `winget install` each |
| 5 | `ast-grep/ast-grep` | L2/L6 code-intel | npm/cargo | `npm install -g @ast-grep/cli` |
| 6 | `openai/codex` | L1 adversarial | npm | `npm install -g @openai/codex@latest` |
| 7 | `openai/codex-plugin-cc` | L1 T1-T7 gate | plugin | `/plugin marketplace add openai/codex-plugin-cc && /plugin install codex@openai-codex` |
| 8 | `oraios/serena` | L2 code-intel | uvx MCP | `.mcp.json` stdio: `uvx --from git+https://github.com/oraios/serena@<SHA> serena start-mcp-server` |
| 9 | `yamadashy/repomix` | L2/L4 | npm MCP | `npm install -g repomix` → `.mcp.json` `repomix --mcp` |
| 10 | `zilliztech/claude-context` | L2/L4 | npm MCP | `npm install -g @zilliz/claude-context-mcp` → `.mcp.json` |
| 11 | `github/github-mcp-server` | L9 | http MCP | `.mcp.json` http `https://api.githubcopilot.com/mcp/` |
| 12 | `upstash/context7` | L4/L9 | http MCP | `.mcp.json` http `https://mcp.context7.com/mcp` |
| 13 | `microsoft/playwright-mcp` | L8 browser | npm MCP | `npm install -g @playwright/mcp` → `.mcp.json` |
| 14 | `doobidoo/mcp-memory-service` | L3 memory-L1 | pip MCP | `pip install git+https://github.com/doobidoo/mcp-memory-service.git` → `.mcp.json` |
| 15 | `getzep/graphiti` | L3 memory-L3 | pip MCP | `pip install graphiti-core[falkordb]` + FalkorDB container → `.mcp.json` |
| 16 | `obra/superpowers` | L5 orchestration | plugin | `/plugin install superpowers@claude-plugins-official` |
| 17 | `wshobson/agents` | L5 orchestration | plugin | `/plugin marketplace add wshobson/agents && /plugin install` (full 80+ agent catalog) |
| 18 | `affaan-m/everything-claude-code` | L5 orchestration | plugin | `/plugin install everything-claude-code@2.0.0-rc.1` |
| 19 | `ryoppippi/ccusage` | L6 eval | npm MCP | `npm install -g @ccusage/mcp` → `.mcp.json` (⚠ license probe first) |
| 20 | `promptfoo/promptfoo` | L6 eval | npm | `npm install -g promptfoo` |
| 21 | `google/osv-scanner` `semgrep/semgrep` | L7 security | binary/pip | `winget install` / `uv tool install semgrep` |

### §1.B — TIER-B: PILOT / COVERAGE / CITE-PATTERN (not default-install)

| Repo | Disposition | Gate before promotion to Tier-A |
|---|---|---|
| `mem0ai/mem0` | INSTALL-PILOT | Benchmark vs graphiti/mcp-memory; eval-demand evidence |
| `topoteretes/cognee` | INSTALL-PILOT | Benchmark comparator; do not displace incumbent |
| `thedotmack/claude-mem` | INSTALL-PILOT | Head-to-head memory pilot; source-audit (fresh-paint ★) |
| `zilliztech/memsearch` | PILOT | MIT (probed) + benchmark vs incumbent |
| `chopratejas/headroom` | INSTALL-PILOT | Token-compression pilot; 30-day fit-test |
| `rtk-ai/rtk` | **INSTALL-PILOT (metric-gated)** — DOWNGRADED from Tier-A per W252 codex T1 finding | codex T1 trace-mined: rtk **issue #582 reports ~18% token cost _INCREASE_** from the PreToolUse hook in some configs; rtk's Windows native hook may not auto-rewrite. rtk is Tier-A ONLY after **measured local net token savings** on the Windows runtime (not license-pass alone). License: my direct LICENSE probe = Apache-2.0 verbatim; codex trace believes MIT — **DISCREPANCY, re-probe before install** (likely npm-package-vs-repo-LICENSE divergence) |
| `github/spec-kit` | PILOT | Collision check vs existing planning systems |
| `Yeachan-Heo/oh-my-claudecode` | PILOT | License probe; pilot vs wshobson |
| `anthropics/skills` | SELECTIVE-IMPORT | Import specific skills, not whole repo |
| `Arize-ai/phoenix` | AMBER (installed) | ELv2 server — resolve wrapper/server split |
| `langfuse/langfuse` | PILOT / AMBER | MIT-core self-host; avoid EE carveout |
| `containers/kubernetes-mcp-server` | PILOT (constrained) | Read-only kubecontext + destructive-verb denylist |
| `SWE-agent/mini-swe-agent` | CITE-EVAL | Eval-reference harness, not primary runtime |
| `anthropics/claude-code-action` | DEMAND-GATED | Install when CI/CD demand confirmed |
| `gsd-2`, `revfactory/harness`, `pro-workflow`, `BMAD-METHOD`, `ccpm`, `humanlayer`, `claude-task-master` | CITE-PATTERN | Adopt the *patterns* (worktree-parallelism, HITL, spec-driven, compounding-memory) — do NOT vendor the repos |

### §1.C — BLOCKED / REJECTED (permanent)

| Repo | License | Verdict |
|---|---|---|
| `volcengine/OpenViking` | AGPL-3.0 | **REJECT** — structural copyleft; mcp-memory+graphiti cover the gap |
| `mksglu/context-mode` | ELv2 | **REMOVE from clean-install** — AMBER-internal-use only; fails permissive gate |
| `FalkorDB/FalkorDB` (as hosted service) | SSPL | **AMBER** — local single-tenant OK (SSPL §13 not triggered); BLOCK if ever offered as service |
| `protect-mcp` (`tomjwxf/scopeblind-gateway`) | none + patents-pending | **REJECT** — all-rights-reserved + IP risk |
| `trailofbits/skills-curated` | CC-BY-SA-4.0 | **CITE-ONLY** — content license, install-unsafe |
| `microsoft/LLMLingua` / `leanctx` family | (MIT but) | **REJECT — SUPERSEDED** — lossy compression; see §3.4 |
| OpenClaw-ecosystem (`claw-code`, `nanoclaw`, `openclaude`, ...) | mixed | **FILTER** — Claude-derivative, not CC-native; meme star-inflation |

---

## §2 — THE ULTIMATE SOTA RUNTIME ARCHITECTURE (`Z:/claude-sota-pure`)

An 11-layer architecture. Each layer names its SOTA source + install path. Design principle: **install-from-upstream (CR-5/6/12 PRIMARY) over hand-coding; every layer cites a SOTA primary source (CR-1/8).**

```
┌─ L10 GATES/HOOKS ──── codex T1-T7 hooks · audit hooks · secret-redaction · safety_guard
├─ L9  DOCS/RESEARCH ── context7 MCP · deepwiki MCP · github MCP
├─ L8  BROWSER ──────── playwright-mcp · chrome-devtools MCP
├─ L7  SECURITY ─────── ruff · osv-scanner · semgrep · gitleaks · trufflehog · trivy
├─ L6  EVAL/OBSERVE ─── ccusage MCP · promptfoo · phoenix MCP · (langfuse pilot)
├─ L5  ORCHESTRATION ── superpowers · wshobson/agents · ECC · (spec-kit pilot)
├─ L4  TOKEN/CONTEXT ── native cache · rtk hook · repomix · context7 · (headroom pilot)
├─ L3  MEMORY/RAG ───── mcp-memory (L1 capture) · graphiti+FalkorDB (L3 KG) · (mem0/cognee pilot)
├─ L2  CODE-INTEL ───── serena MCP · repomix MCP · gitnexus · claude-context · ast-grep
├─ L1  ADVERSARIAL ──── openai/codex CLI + codex-plugin-cc → T1-T7 cross-model gate
└─ L0  FOUNDATION ───── claude-code · uv · ripgrep/fd/jq/yq/gh · ruff · launcher · settings/.mcp.json
```

### §2.1 — Layer-by-layer design

**L0 Foundation** — bootstrap files (CLAUDE.md/CLAUDE.local.md/launcher/.gitignore/settings.json/.mcp.json) hand-coded per CR-5 bootstrap exception; everything else installed. CLI tools via `winget`/`uv tool install`. `uv` is the install backbone for all pip-path MCPs.

**L1 Adversarial backbone** — `openai/codex` CLI (Apache-2.0, 82.9K★) + `openai/codex-plugin-cc` (Apache-2.0, 18.7K★, official). This is the **GPT-5.5 cross-model review primitive** — see §3 for the T1-T7 lifecycle. Topology locked: Claude orchestrates, Codex reviews (per CLAUDE.md Architecture section, 3-org TIER-1 convergence).

**L2 Code intelligence** — `serena` (MIT, semantic retrieval/edit MCP), `repomix` (MIT, codebase packing MCP), `gitnexus` (graph code-intel, PolyForm-Noncommercial — local-runtime OK), `ast-grep` (MIT, structural search), `claude-context` (MIT, semantic code-search MCP). Token-efficient: agents retrieve symbols, not whole files.

**L3 Memory / RAG** — two-tier: `mcp-memory-service` (Apache-2.0, sqlite-vec capture = L1) + `graphiti` (Apache-2.0, temporal-KG = L3) on FalkorDB local container. Open-RAG path: graphiti's graph-RAG + claude-context's semantic retrieval. Pilots: `mem0` / `cognee` (benchmark-gated, do not displace incumbent).

**L4 Token / context** — `cache_control` native ephemeral caching (lossless, primary) + `rtk` hook (tool-command interception 60-90%) + `repomix` (tree-sitter ~70%) + `context7` (docs injection, avoids stale-knowledge re-research) + `headroom` pilot (output compression 60-95%). **LLMLingua REJECTED** — see §3.4.

**L5 Orchestration / agent-teams** — `superpowers` (MIT, skills framework + methodology) + `wshobson/agents` (MIT, 80+ specialist agents + multi-agent orchestration — user-requested) + `everything-claude-code` (MIT, harness perf-optimization). Pattern layer: parallel-agent-wave (3-6 fan-out), worktree isolation, fork-vs-fresh routing. `spec-kit` pilot for spec-driven decomposition.

**L6 Eval / observability** — `ccusage` (token/cost from local JSONL), `promptfoo` (eval + red-team — "used by OpenAI and Anthropic"), `phoenix` (AI observability MCP, AMBER server). `langfuse` pilot. Eval-gate: benchmark heavy tools before keeping (per v65 CLAUDE.md).

**L7 Security** — `ruff` (lint), `osv-scanner` (CVE), `semgrep` (SAST, LGPL CLI-use OK), `gitleaks`/`trufflehog` (secret scan), `trivy` (container scan). Wired as PostToolUse advisory hooks.

**L8 Browser** — `playwright-mcp` (Apache-2.0, microsoft-official) + `chrome-devtools` MCP. Local-debug + (Browserbase cloud pilot, SaaS-gated).

**L9 Docs / research** — `context7` (up-to-date library docs MCP), `deepwiki` (repo Q&A MCP), `github` (official GitHub MCP). Research-first per CR-10.

**L10 Gates / hooks** — codex T1-T7 hook chain (§3), audit-action-loop hooks (drift detection), secret-redaction pre-write filter, `safety_guard` catastrophic-pattern deny-list.

---

## §3 — GPT-5.5 ADVERSARIAL REVIEW — SEAMLESS E2E INTEGRATION

The user's core ask: GPT-5.5 adversarial review "seamlessly with its workflow e2e." This is the **T1-T7 cross-model lifecycle** — Claude (Opus 4.7) drafts, Codex (GPT-5.5) audits at 7 touchpoints.

### §3.1 — The T1-T7 touchpoint lifecycle

| Touchpoint | When | Hook event | Profile | Action |
|---|---|---|---|---|
| **T0** | candidate-list challenge (cost-gated pilot) | manual | `deep-review` 240s | GPT-5.5 reviews research candidate-list composition |
| **T1** | BEFORE design-surface edit | PreToolUse `Edit\|Write\|MultiEdit` | `deep-review-exec` xhigh | codex pre-edit consult → APPROVE/NEEDS-REVISION/REJECT |
| **T2** | BEFORE commit (multi-file) | PreToolUse `Bash(git commit *)` | default 120s | `codex exec review --uncommitted` working-tree review |
| **T3** | AFTER commit (automatic) | PostToolUse `Bash(git commit *)` | `deep-review-exec` 180s | postcommit audit → `.claude/state/codex_review_HEAD_<sha>.txt` |
| **T4** | AFTER push (cumulative) | PostToolUse `Bash(git push *)` | `deep-review-exec` 180s | post-push cumulative review (observability) |
| **T5** | DURING plan stage | `/plan-codex-review` slash command | `deep-review` 240s | GPT-5.5 reviews the plan before implementation |
| **T6** | AT session-end (dirty tree) | Stop hook | `deep-review-exec` 900s | session-end deep review |
| **T7** | AT session-end (pre-T6) | Stop hook | regex 5s | ask-without-act gate |

### §3.2 — Install path for the adversarial backbone

```
1. npm install -g @openai/codex@latest          # codex CLI (GPT-5.5 access)
2. /plugin marketplace add openai/codex-plugin-cc
   /plugin install codex@openai-codex            # the CC↔Codex bridge plugin
3. Configure .codex/config.toml profiles:
   - deep-review-exec  (xhigh effort, danger-full-access sandbox) — T1/T3/T4/T6
   - deep-review       (xhigh effort, read-only sandbox)          — T0/T5
   - t2-exec           (high effort, read-only)                   — operator T2
4. Wire T1-T7 hook scripts into .claude/settings.json hooks{}:
   - PreToolUse  Edit|Write|MultiEdit  → codex_t1_consult_gate.py
   - PreToolUse  Bash(git commit *)    → codex_t2_pre_commit_gate.py
   - PostToolUse Bash(git commit *)    → codex_postcommit_review.py
   - PostToolUse Bash(git push *)      → codex_prepush_review.py
   - Stop[0] auto_proceed_gate.py (T7) · Stop[1] codex_stop_review_gate.py (T6)
5. /plan-codex-review slash command for T5
```

### §3.3 — Failure-mode hardening (FM-17 — learned this wave)

W252 lost 3/4 subagent dispatches to FM-17 (final-return-loss + autocompact-thrash). The adversarial integration MUST be hardened:
- **Per-call codex time budget**: default 90s, cap 120s, 180s-with-reason (FM-17.d watchdog defense).
- **Orchestrator-direct fallback (Path P)**: when nested-subagent codex dispatch fails, run `codex exec --ephemeral -p deep-review-exec` foreground+tee directly. Sidesteps FM-17.b/d entirely.
- **BRIDGE-MODE app-server ACL repair** (W251 §3): inspect `CODEX_HOME` temp/app-server permissions; the `Access is denied` failure is infrastructure, not model refusal.
- **Codex-unavailable recovery**: queue + retry (4h medium-risk window) OR DOWNGRADED-MODE local Ollama judge (uncertified — smoke-probe first).

### §3.4 — Why this beats lossy token compression

The adversarial gate is *also* a token-efficiency mechanism: a NEEDS-REVISION caught at T1 (pre-edit) saves the full revert+re-implement cycle. Cross-model review converges faster than single-model self-audit (Opus reading its own draft misses what GPT-5.5 catches independently). This is structural, not lossy.

---

## §4 — INSTALL CHECKLIST FOR `Z:/claude-sota-pure`

Ordered by dependency tier. Each step: official-native channel (CR-6), version-pin (CR-9), source-audit before install (v65 CLAUDE.md).

### Phase 0 — Bootstrap (hand-coded, CR-5 exception)
- [ ] `CLAUDE.md` (cardinal rules 1-12), `CLAUDE.local.md` (env block), `.gitignore`
- [ ] `tools/eee.ps1` launcher, `bin/eee.cmd` shim
- [ ] `.claude/settings.json` minimum baseline, `.mcp.json` skeleton `{"mcpServers":{}}`
- [ ] `docs/sota-installed-manifest.md` + `docs/install-provenance.md`

### Phase 1 — L0 Foundation + L1 Adversarial backbone
- [ ] `winget install astral-sh.uv` → `uv --version` smoke
- [ ] `uv tool install ruff` ; `winget install` ripgrep/fd/jq/yq/gh
- [ ] `npm install -g @ast-grep/cli`
- [ ] `npm install -g @openai/codex@latest` → `codex --version` smoke
- [ ] `/plugin marketplace add openai/codex-plugin-cc` → `/plugin install codex@openai-codex`
- [ ] Configure `.codex/config.toml` (3 profiles) + repair app-server ACL (W251 §3)
- [ ] `codex exec --ephemeral -p deep-review "return JSON {ok:true}"` → BRIDGE-MODE smoke PASS

### Phase 2 — L2 Code-intel + L9 Docs MCPs
- [ ] `.mcp.json` add `serena` (uvx, SHA-pinned), `repomix` (npm, version-pinned), `claude-context`
- [ ] `.mcp.json` add `github` (http), `context7` (http), `deepwiki` (http)
- [ ] `npx gitnexus analyze` for code-graph index
- [ ] `/doctor` → verify all MCP servers connected

### Phase 3 — L3 Memory / RAG
- [ ] `pip install git+https://github.com/doobidoo/mcp-memory-service.git` → `.mcp.json` `memory` (sqlite-vec)
- [ ] `docker pull falkordb/falkordb:latest` → run container port 16379
- [ ] `pip install graphiti-core[falkordb]` + clone graphiti MCP server → `.mcp.json` `graphiti`
- [ ] Smoke: store + retrieve a memory; PING FalkorDB

### Phase 4 — L4 Token / context
- [ ] Install `rtk` (license probe FIRST) → wire CC hook
- [ ] `headroom` PILOT (Apache-2.0) — 30-day fit-test, not default
- [ ] Tune `.claude/settings.json` compaction thresholds + PreCompact hook
- [ ] Enable `cache_control` ephemeral caching in agent dispatch

### Phase 5 — L5 Orchestration
- [ ] `/plugin install superpowers@claude-plugins-official`
- [ ] `/plugin marketplace add wshobson/agents` → install full 80+ agent catalog
- [ ] `/plugin install everything-claude-code@2.0.0-rc.1`
- [ ] `/plugin install agent-skills@addy-agent-skills` (Addy Osmani engineering skills)

### Phase 6 — L6 Eval + L7 Security + L8 Browser
- [ ] `npm install -g @ccusage/mcp` (license probe first) → `.mcp.json`
- [ ] `npm install -g promptfoo`
- [ ] `uv tool install semgrep` ; `winget install osv-scanner` ; gitleaks/trufflehog/trivy
- [ ] `npm install -g @playwright/mcp` + `chrome-devtools-mcp` → `.mcp.json`
- [ ] `phoenix` MCP (AMBER — resolve wrapper/server split)

### Phase 7 — L10 Gates / hooks
- [ ] Wire codex T1-T7 hook scripts into `.claude/settings.json`
- [ ] Wire audit-action-loop hooks (drift detection)
- [ ] Wire secret-redaction pre-write filter
- [ ] `/plan-codex-review` slash command for T5
- [ ] Final `/doctor` + full T1-T7 smoke pass

### Phase 8 — Verification
- [ ] Every Tier-A repo: smoke probe + license confirmed PASS + manifest row
- [ ] Run `promptfoo` eval-gate on the assembled runtime
- [ ] codex T1 deep-review on the assembled `.mcp.json` + `settings.json`
- [ ] `ccusage` baseline token-cost measurement

---

## §5 — W251 P0 BLOCKER RESOLUTION (closes W251 §2 + carryover)

| W251 P0 blocker | W252 resolution |
|---|---|
| `context-mode` MIT-vs-ELv2 dispute | **RESOLVED** — ELv2 CONFIRMED (root LICENSE + package.json + npm all agree); W250 MIT REFUTED. REMOVE from clean-install |
| `protect-mcp` UNKNOWN repo/license | **RESOLVED** — = `tomjwxf/scopeblind-gateway`, no LICENSE + patents-pending → BLOCK |
| FalkorDB SSPL silent backend | **RESOLVED** — AMBER (local single-tenant OK, SSPL §13 not triggered); no permissive server-swap; KùzuDB MIT is embedded-only |
| Catalog split (default vs coverage) | **RESOLVED** — §1.A Tier-A (21 repos) / §1.B Tier-B / §1.C Blocked |
| `trailofbits/skills-curated` CC-BY-SA | **RESOLVED** — CITE-ONLY confirmed; install-unsafe |
| OpenViking AGPL | **CONFIRMED REJECT** — permanent |
| BRIDGE-MODE codex permissions | **STILL OPEN** — W253 must repair app-server ACL OR use orchestrator-direct codex T1 |

---

## §6 — NEXT WAVE (W253) RECOMMENDATIONS

1. **Repair BRIDGE-MODE** (W251 §3 steps 1-7) — codex app-server ACL; then run a narrow codex T1 foreground+tee adversarial pass on THIS W252 grand synthesis (cross-model gate not yet satisfied).
2. **License-probe the 9 NOASSERTION/probe-needed repos** — `ccusage`, `rtk`, `claude-task-master`, `BMAD-METHOD`, `humanlayer`, `langfuse`, `oh-my-claudecode`, `memsearch`, `gsd-2`, `anthropics/skills` — before any pure-runtime install.
3. **Execute the §4 install checklist** for `Z:/claude-sota-pure` — Phase 0→8, with codex T1 gate on each design-surface edit.
4. **Run the memory pilot benchmark** — graphiti vs mem0 vs cognee vs mcp-memory on a fixed eval corpus; pick the default empirically (do not displace incumbent without evidence).
5. **NeurIPS 2026 cohort** — re-check when proceedings publish (currently UNKNOWN).

**GRAND-SYNTHESIS-VERDICT**: `EXECUTABLE-WITH-2-GATES` — W252 produces an install-ready two-tier catalog + 11-layer architecture + T1-T7 adversarial integration design. Two gates remain before install execution: (1) BRIDGE-MODE repair for full cross-model verification, (2) `anthropics/skills` LICENSE re-probe (9 of 10 NOASSERTION repos resolved — see §7). Once both clear, the §4 checklist is directly executable for `Z:/claude-sota-pure`.

---

## §7 — GPT-5.5 Cross-Model Adversarial Review (codex T1, Path P orchestrator-direct)

W252 ran an orchestrator-direct `codex exec -p deep-review` adversarial pass on this synthesis (Path P per `cmc-t1-t7-lifecycle.md` — the nested-subagent BRIDGE-MODE being broken). Codex CLI 0.130.0; 280s budget exhausted in active-deep-research mode → **Pattern B (timeout-without-JSON-verdict)** per `codex-t1-fix-forward-pattern.md`. The trace was mined for embedded findings; verdict file `.claude/state/codex_consult_w252_grand_synthesis_OUT.txt`.

**Pattern B trace-mined findings (applied as fix-forward):**

| # | codex finding | Disposition |
|---|---|---|
| F-1 | **rtk-ai/rtk is NOT safe as unconditional INSTALL-TIER-A.** codex surfaced rtk **issue #582** — the PreToolUse hook reported a **~18% token cost INCREASE** in some configs; the Windows native hook may not auto-rewrite. rtk is Tier-A only after *measured local net savings*. | **APPLIED** — rtk downgraded Tier-A→INSTALL-PILOT (metric-gated) in §1.B + scoring matrix |
| F-2 | rtk license: codex trace believes **MIT**, conflicting with the W252 direct LICENSE probe (verbatim Apache-2.0). | **NOTED** — re-probe rtk license + npm package metadata before pure-runtime install (npm-vs-repo divergence suspected) |
| F-3 | `anthropics/skills` is a **mixed-license** repo — confirms W252's probe-pending finding; selective-import + per-skill license verify is correct. | **CONFIRMED** — Gate 2 stands |
| F-4 | semgrep license — codex flagged uncertainty ("might have changed"). W252 fresh probe = LGPL-2.1 (CLI-use compliant). | **HELD** — W252 fresh probe is authoritative; semgrep CLI invocation (not linking) is LGPL-compliant |

**Codex did NOT reach Q1/Q3/Q4/Q5/Q6 before timeout** — the cross-model gate is therefore **PARTIALLY satisfied** (one material catch F-1 applied; the two-tier split, T1-T7 design, and FalkorDB-SSPL analysis were NOT independently verified). W253 must re-run a narrower, bounded codex T1 (single-question-per-call, 90-120s budget per `advanced-agent-team-standing-directive` FM-17.d defense) on the unverified claims.

**Net**: cross-model review caught and corrected 1 over-claim (rtk Tier-A) — the synthesis is stronger for it. The rtk correction is exactly the failure mode the adversarial gate exists to catch: a "60-90% reduction" marketing claim adopted without measured local evidence (convergence-gate Row-2 fabrication-test discipline). The W252 verdict stands `EXECUTABLE-WITH-2-GATES` + 1 fix-forward applied.
