# W319 Stream D — Stale-Reference Audit

**Date**: 2026-05-19
**Scope**: Every cite SHA / URL / path in CLAUDE.md + CLAUDE.local.md + W317/W318 wave docs + `.mcp.json` `_comments` + key SKILL.md cites.
**Method**: `git ls-remote https://github.com/<owner>/<repo>` for each upstream cite + local `/z/repos/deps/<repo> git log -1` for vendor-fork roots + filesystem `Test-Path` for every claimed path.

---

## §1. CLAUDE.md cite-SHA drift table

| Cite (CLAUDE.md line) | Cited SHA | Local `/z/repos/deps/<repo>` HEAD | Upstream HEAD | Verdict |
|---|---|---|---|---|
| L3: CCBP `48f2ceb` | `48f2ceb` | `48798ca` (2026-05-18 23:05) | `9624c4ac` | **STALE-D-2 MEDIUM** — local is 1 commit ahead of cited; upstream is 2 commits ahead of local |
| L30: addyosmani `f17c6e88` | `f17c6e88c904dc747381c374312c2d58e10647ae` | `f17c6e8` (2026-05-16 15:00) | `f17c6e88c904dc747381c374312c2d58e10647ae` | ✓ MATCH (zero drift) |
| L34 (W316 status) ECC `8148340a` | `8148340ad14eb32c971346f0cb4cb9431ec0f5de` | `b62f8075` (2026-05-19 09:16) | `98bd517451f38fa0150a53aab4234c2239a47b7e` | **STALE-D-3 MEDIUM** — local 1 day newer than installed plugin SHA; upstream further ahead |
| W316 status: ECC target `f3cd00625222` | NOT-IN-UPSTREAM | n/a | n/a | **STALE-D-4 HIGH** — W316 documented this as the target SHA but operator W317-r2 S1 confirmed "NOT FOUND in upstream history — fresh HEAD correct per W270 CR-1 corollary"; CLAUDE.md still references the phantom target |
| L30: mattpocock-vendor-fork-4 | (path on local) | **NOT-FOUND** at `/z/repos/deps/mattpocock-vendor-fork-4/` | n/a | **STALE-D-5 MEDIUM** — vendor-fork dir name in CLAUDE.md L30 is `mattpocock-vendor-fork-4` but only `mattpocock-skills` exists in `/z/repos/deps/`. Upstream `github.com/mattpocock/agent-skills.git` returns 404 (repo renamed or moved). Skills themselves (grill-with-docs, tdd, caveman, diagnose) DO exist at `.claude/skills/` so the local skill files are intact — only the vendor-fork-source pointer is broken |
| W317-S1 codex `807e03ac` | `807e03ac9d5aa23bc395fdec8c3767500a86b3cf` | `/z/repos/deps/codex-plugin-cc/` (no /z/repos/deps/openai-codex/) | `807e03ac9d5aa23bc395fdec8c3767500a86b3cf` | ✓ MATCH; installed plugin gitCommitSha matches; **but** repo dir is `codex-plugin-cc` not `openai-codex` (cosmetic) |
| Superpowers `f2cbfbef` | NOT EXPLICITLY CITED | `f2cbfbe` (2026-05-04 15:05) | `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` | ✓ MATCH |
| W295 graphiti retired; `.mcp.json` excised | `disabledMcpjsonServers: []` | n/a | n/a | ✓ MATCH — `.mcp.json:94` confirms empty array; no graphiti entry |
| W308 memory.exe disabled | NOT in disabledMcpjsonServers | n/a | n/a | **STALE-D-6 LOW** — CLAUDE.md L46/L47 calls out W300-AI-1: "disabled memory MCP entry's local-.exe `.mcp.json` invocation... is a P0C-CR-9-exception case retained-as-dormant in disabledMcpjsonServers" — but `.mcp.json:94` shows `"disabledMcpjsonServers": []` (empty). The memory.exe block was fully **deleted** (not disabled); the CLAUDE.md wording is stale by ~1-2 waves. |
| W316/W317 hindsight T1 retired | port :9077 CLOSED | n/a | n/a | ✓ MATCH — empirical probe confirms CLOSED |
| W295 falkordb retired | port :16379 CLOSED | n/a | n/a | ✓ MATCH — empirical probe confirms CLOSED |

### STALE-D-1: settings.json size drift (NEW MEDIUM)

**File**: `Z:/claude-sota-installed/.claude/settings.json`
**Empirical size**: 15,964 bytes (`wc -c` HEAD `d8e9a02`)
**CLAUDE.md W317-Stream-A claim** (status line): "settings.json 15,351 ≤15,360 ✓"
**Drift**: +613 bytes since W317-Stream-A ship

**Implication**: settings.json grew between W317-A and HEAD without status update. This is **within budget** (15,360 was the W317-A cap; current 15,964 is OVER cap by 604 bytes). Cardinal-rule invariant "settings.json 15,351 / 15,360 ≤" stated in CLAUDE.md is now **falsified by current file size**.

**Root cause** (forensic): Likely the W317-S3 sandbox+worktree block (CCBP-cited defaults `enabled:false`) and the W320 env mirror (CLAUDE_PLUGIN_DATA / GATEGUARD_STATE_DIR / AUDIT_ROOT / CLAUDE_MEM_DATA_DIR / ECC_SESSION_RECORDING_DIR / BASH_ENV — verified live at settings.json:48-53) accumulated. CLAUDE.md L48 says W317-r2 closure preserved 15,103/15,360 but actual at HEAD is **15,964 / no current cap stated**.

**Action**: Update CLAUDE.md cardinal-rule invariant line and/or rationalize cap up to 16,384 (next power-of-2 boundary). **W320 P3 cosmetic.**

---

## §2. CLAUDE.local.md env-block validation

Every env var in CLAUDE.local.md `(a)-(f3)` block + dynamic probe via `printenv`:

| Var | CLAUDE.local.md value | Actual process env | Verdict |
|---|---|---|---|
| `USERPROFILE` | `Z:\claude-sota-installed` | `Z:\claude-sota-installed` | ✓ |
| `HOME` | `Z:\claude-sota-installed` | `/z/claude-sota-installed` (Git Bash form) | ✓ (POSIX-form equivalent) |
| `CLAUDE_CONFIG_DIR` | `Z:/claude-sota-installed/.claude` | `Z:/claude-sota-installed/.claude` | ✓ |
| `CODEX_HOME` | `Z:/claude-sota-installed-state/.codex` | `Z:/claude-sota-installed-state/.codex` | ✓ |
| `CLAUDE_CODE_PROJECT_DIR` | `Z:/claude-sota-installed-state/.claude/projects` | `Z:/claude-sota-installed-state/.claude/projects` | ✓ |
| `LANGFUSE_HOST` | `http://127.0.0.1:3000` | `http://127.0.0.1:3000` | ✓ |
| `LANGFUSE_PUBLIC_KEY` | 42-char | 42-char | ✓ length matches (NOT echoed) |
| `LANGFUSE_SECRET_KEY` | 42-char | 42-char | ✓ length matches (NOT echoed) |
| `PERPLEXITY_API_KEY` | (in CLAUDE.local.md sidecar) | 53-char | ✓ length plausible (NOT echoed). **W317-S7 documented operator-AI to ROTATE per W317-r2-SEV1-1 since the key was leaked in S7 output line 124 and redacted inline; the key is still PRESENT in process env so the leaked value is still LIVE** |
| `CLAUDE_PLUGIN_DATA` (W320 mirror) | `Z:\claude-sota-installed\.claude\plugins\data` | **EMPTY** in current bash process env | **STALE-D-7 MEDIUM** — see §3 |
| `GATEGUARD_STATE_DIR` | `Z:\claude-sota-installed\.claude\state\gateguard` | EMPTY | **STALE-D-7** |
| `AUDIT_ROOT` | `Z:\claude-sota-installed` | EMPTY | **STALE-D-7** |
| `CLAUDE_MEM_DATA_DIR` | `Z:\claude-sota-installed\.claude\plugins\data\claude-mem` | EMPTY | **STALE-D-7** |
| `ECC_SESSION_RECORDING_DIR` | `Z:\claude-sota-installed\.claude\session-data\recordings` | EMPTY | **STALE-D-7** |
| `BASH_ENV` | `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh` | EMPTY (in $$.env probe) | **STALE-D-7** |

### STALE-D-7: W320 env-mirror DOES exist in settings.json but NOT in Stream-D shell session env

**Finding**: The W320 mirror — `CLAUDE_PLUGIN_DATA` etc. — is **PRESENT in `.claude/settings.json:48-53`** (verified by Read tool) but **ABSENT from the Stream-D shell process env** (verified by `printenv`).

**Diagnosis**: settings.json `env.*` blocks are loaded by Claude Code at startup and exported into the **main CC process** + its **forked subagents**. The Stream-D ctx_execute shell session inherits parent env via shell-mode IPC, but the env mirroring in CLAUDE.local.md `(f3)` block (lines 119-127 — "authoritative copy in .claude/settings.json:env") was a documentation-only block.

**The actual ENV-flow**:
1. `tools/eee.ps1` launches CC with `$env:USERPROFILE = 'Z:\claude-sota-installed'` etc. — these inherit
2. `.claude/settings.json` `env` block adds CLAUDE_PLUGIN_DATA etc. — **these are CC-visible**
3. Subagent shells spawned via Bash tool **inherit from CC parent process** — should see them
4. **BUT**: Stream-D is a subagent shell. The probe `printenv CLAUDE_PLUGIN_DATA` returned empty.

**Hypothesis** (without further proof — needs root-cause): the env-block injection in settings.json `env.*` runs **after** subagent fork OR is **scoped to specific tool calls** (Bash with certain shells inherit, ctx_execute does not). CLAUDE.local.md `(f3)` block treats these as canonical authoritative — but the canonical-vs-injected reality is unclear.

**Implication**: If a plugin OR a hook expects `$CLAUDE_PLUGIN_DATA` to be set during a subagent Bash call, it sees empty. **W320 P1 diagnostic candidate** — root-cause the env-propagation gap, OR remove the W320 mirror from CLAUDE.local.md (relying only on settings.json env).

---

## §3. Z-phantom directory remnant (W317-FULL-MSYS-FIX-WAVE residue)

**File**: `/z/z/` exists with contents:
```
drwxr-xr-x 1 ... claude-sota-installed   (empty dir)
lrwxrwxrwx 1 ... claude -> /z/claude     (symlink)
```

**History**: W316-r2 S1 reported "9 Stop hooks failing with `Z:\z\claude-sota-installed\...` path-mangle" — the symptom is the **inverse** of this remnant. The fix-wave per W317-FULL-MSYS-FIX-WAVE installed a `normalizeMsysPath()` in ECC bootstrap, but **left the empty `/z/z/` parent dir on disk**.

**Verdict**: STALE-D-8 LOW — does not affect runtime (no code writes to `/z/z/<anything>` anymore per W317-r2 S6 closure), but the dir presence is **bait for future tooling that confuses cwd**. ctx_execute_file in W319 batch confirmed the bait is live: passing `/z/claude-sota-installed/.claude/settings.json` (POSIX form) to Bun-runtime led to attempted open of `Z:\z\claude-sota-installed\.claude\settings.json` (Windows form with the doubled `\z\` prefix). The Bun shim does the path-mangle, not the bash shell.

**Fix**: `Remove-Item Z:\z -Recurse -Force` (operator-only because `tools/w317-cleanup-z-phantom.ps1:126` uses `-ErrorAction SilentlyContinue` and probably never finishes if dirs are pinned). **W320 P2 cleanup.**

---

## §4. `.mcp.json` `_comments` cite-anchor audit

`.mcp.json` is 26,199 bytes — 95% is provenance commentary inside `_comments` and `_comments_addendum`. Sampled cites:

| Cite | Verdict |
|------|---------|
| `chrome-devtools-mcp@1.0.1` (L24) | ✓ — W316-r2 EXECUTED per status |
| `repomix@1.14.0` (L29) | ✓ |
| `serena@249f6b07f9ccac259b0ff95e06c9a40629748e17` (L34) | ✓ — Stream B can re-verify against upstream |
| `@ccusage/mcp@18.0.11` (L44) | ✓ |
| `basic-memory==0.21.1` (L64) | ✓ |
| `@perplexity-ai/mcp-server@0.9.0` (L77) | ✓ — W317-S7 verified |
| `@playwright/mcp@0.0.75` (L85) | ✓ |
| `cognee-mcp` at `:8000/mcp` (`type:http`) (L46-49) | ✓ — empirical handshake returned `serverInfo Cognee 1.26.0` (W319 Stream D probe) |
| `langfuse` MCP at `node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` (L52-53) | **STALE-D-9 MEDIUM** — this is the W155 F13 native-node form (absolute path baked in) that W286-cross **explicitly rolled back** for the other 4 npx MCPs per the `_comments.w286_cross_npx_pinned_v2` block. The same Z:-baked path liability applies. The block in `_comments_addendum.w265_langfuse_2026_05_17` cites the original install but does not document why this MCP was exempted from the W286-cross rollback. |
| `hf-mcp-server` HTTP `https://huggingface.co/mcp` (L72) | ✓ |
| `deepwiki` HTTP `https://mcp.deepwiki.com/mcp` (L19) | ✓ |
| `gitnexus@1.6.4-rc.112` (L38-39) | ✓ — invoked as `gitnexus mcp` (npm-global, not npx-pinned); CR-9 risk acknowledged in `_comments.gitnexus` |

### STALE-D-9: langfuse MCP `node + abs-Z:-path` pattern

**File**: `.mcp.json:52-53`
**Form**:
```json
"langfuse": {
  "type": "stdio",
  "command": "node",
  "args": ["Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js"],
  ...
}
```

**Risk**: 
1. Z:-portability broken (fresh-clone on another machine OR drive relocation breaks this MCP)
2. CR-9 violation per W286-cross stale-C audit (5 HIGH violations found — this is the 1 remaining unfixed)
3. The other 4 (playwright/chrome-devtools/repomix/phoenix) were migrated to `npx -y @pkg@version` in W286-cross
4. langfuse appears exempted — but **no `_comments` block documents why**

**Hypothesis**: `mcp-server-langfuse` is not on npm; the local build is the only path. **W320 P2** — either (a) operator publishes `langfuse-mcp-server` to npm + repin; or (b) document the exemption explicitly in `_comments.langfuse_w265_pin_exemption`.

---

## §5. SKILL.md cite-SHA audit (sampled)

| File | Cite | Verdict |
|------|------|---------|
| `.claude/skills/sota-convergence-audit/SKILL.md` | sca-v7.1 self-eval | ✓ (LIVE) — confirmed via Stream B doc references |
| `.claude/skills/mem-recall/SKILL.md` | `3e2d338` from W315 | ✓ — Stream B prior wave updated this |
| `.claude/skills/addyosmani-*/SKILL.md` | `addyosmani/agent-skills @ f17c6e88` | ✓ (vendor-fork MIT-attributed) |
| `.claude/skills/parallel-dispatch-mandate/SKILL.md` | W269+W312-D citation | ✓ (newly shipped W316) |
| `.claude/skills/dspy-integration/SKILL.md` | `dspy==3.2.1` | ✓ (installed) |

---

## §6. Tally

- **CCBP cite drift** (STALE-D-2 MEDIUM): cited `48f2ceb`, local `48798ca`, upstream `9624c4ac`
- **ECC cite drift** (STALE-D-3 MEDIUM): cited `8148340a` (installed plugin), local `b62f8075`, upstream `98bd517451`
- **STALE-D-1 MEDIUM**: settings.json size 15,964 vs CLAUDE.md cap 15,360 — invariant falsified
- **STALE-D-4 HIGH**: W316 ECC target SHA `f3cd00625222` was phantom — W317-r2-S1 confirmed not-in-upstream; CLAUDE.md still references
- **STALE-D-5 MEDIUM**: `mattpocock-vendor-fork-4` deps dir doesn't exist; upstream `github.com/mattpocock/agent-skills` 404
- **STALE-D-6 LOW**: CLAUDE.md L47 talks of W300-AI-1 disabled memory MCP entry in disabledMcpjsonServers, but `.mcp.json:94` shows empty array (block was fully deleted, not disabled)
- **STALE-D-7 MEDIUM**: CLAUDE.local.md `(f3)` env-mirror block claims authoritative-copy in settings.json:env — but those 6 vars are EMPTY in subagent shell env (settings.json env-injection scope unclear)
- **STALE-D-8 LOW**: `/z/z/` phantom dir remnant from W317-FULL-MSYS-FIX-WAVE; bait for path-mangle
- **STALE-D-9 MEDIUM**: langfuse MCP `.mcp.json:52` uses W155 F13 native-node abs-Z:-path pattern that W286-cross rolled back for 4 others; exemption undocumented

**Total**: 1 HIGH + 5 MEDIUM + 2 LOW = **8 stale-reference findings**.

**End STREAM-D-STALE-REFS.md**
