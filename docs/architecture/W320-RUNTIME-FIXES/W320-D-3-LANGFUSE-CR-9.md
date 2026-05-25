# W320-D-3 langfuse `.mcp.json:52` CR-9 align (M12 / STALE-D-9)

**Wave**: W320 Stream D P1
**Date**: 2026-05-19
**Origin**: W319 Stream D STREAM-D-STALE-REFS STALE-D-9
**Verdict**: **PASTE-READY-PATCH** drafted; **NOT auto-applied** (npm-publish status unverified; operator-decision required per task brief)

---

## §1 Current state — `.mcp.json:50-60` langfuse block

**File**: `Z:/claude-sota-installed/.mcp.json:50-60`

```jsonc
"langfuse": {
  "type": "stdio",
  "command": "node",
  "args": ["Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js"],
  "env": {
    "LANGFUSE_HOST": "${LANGFUSE_HOST}",
    "LANGFUSE_BASE_URL": "${LANGFUSE_HOST}",
    "LANGFUSE_PUBLIC_KEY": "${LANGFUSE_PUBLIC_KEY}",
    "LANGFUSE_SECRET_KEY": "${LANGFUSE_SECRET_KEY}"
  }
}
```

**Pattern in use**: direct-node abs-Z:-path — the W155 F13 native-node-migration pattern.

**Build artifact verified**: `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` (5,971 bytes, mtime 2026-05-17 12:55) — file exists.

---

## §2 Why this violates W286-cross CR-9 rollback

Per CLAUDE.md L13 cardinal-rule 2 corollary (W286-arc-P0C 2026-05-18 ratification):

> `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`); W155 F13 native-node migration RETIRED — CR-9 version-pin discipline wins over spawn-churn optimization.

Per `.mcp.json:7` `_comments.w286_cross_npx_pinned_v2` (verbatim, key cite):

> The W155 F13 `node C:/Users/42/AppData/Roaming/npm/node_modules/<pkg>/cli.js` form bakes the Windows user-profile path into tracked .mcp.json — fresh clone on another machine OR npm-relocate breaks all 4 MCPs deterministically. Replaced with `npx -y <pkg>@<exact-version>` (pinned versions: @playwright/mcp@0.0.75 line 37, chrome-devtools-mcp@0.26.0 line 42, repomix@1.14.0 line 47, @arizeai/phoenix-mcp@4.0.13 line 105).

**The langfuse block at `.mcp.json:50-60` was NOT migrated** in the W286-cross sweep — it predates W286 (added W265 per `.mcp.json:89` cite) and remained in the W155 F13 form. The path it bakes is more portable than the W155 F13 4-MCP set (`Z:/claude-sota-installed-repos/...` rather than `C:/Users/42/...`), but still:

| Risk axis | Current form | W286 form (npx-pinned) |
|---|---|---|
| Z:-portability (fresh clone on diff machine) | BROKEN (abs Z:-path) | INTACT (npm-cache-resolve) |
| Build artifact requires `npm install` + `npm run build` first | YES | NO (registry-installed) |
| Pinned version (D6 today-release-auto-upgrade) | N/A (custom build, NOT npm-published) | YES (`@<version>`) |
| Spawn-churn overhead | LOW (~0.1s) | MODERATE (~0.5-1s) |

---

## §3 Material complication — langfuse MCP-server is NOT npm-published

**Investigation**: `mcp-server-langfuse` is built from a directory inside the langfuse monorepo, not a standalone npm package. Per `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` mtime 2026-05-17 12:55 + parent directory layout — this is a **custom local build artifact**.

Verification needed (operator to confirm before applying CR-9 patch):

1. Check `npm view @langfuse/mcp-server` — does an official npm-published mcp-server-langfuse package exist?
2. If YES: confirm the npm-published version is functionally equivalent to the local build artifact (same tools / same MCP schema).
3. If NO: the W286 CR-9 contract has a "PRIMARY upstream-install" carveout — the local-build pattern may be the only valid form, and Z:-portability is unavoidable BUT the path should be re-rooted via an env-var.

**My W320 read**: most likely NOT npm-published as a top-level package. The W265 `.mcp.json:89` cite explicitly references "Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js" — suggesting a vendor-build pattern. The CR-9 align therefore depends on operator-decision: vendor-fork-build vs upstream-npm-publish vs documented-as-exception.

---

## §4 Three remediation options

### Option A: Verify + migrate to `npx -y <pkg>@<version>` (best CR-9 fit, blocked on npm-publish status)

If `@langfuse/mcp-server` (or similar) IS npm-published:

```jsonc
"langfuse": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@langfuse/mcp-server@<version>"],
  "env": {
    "LANGFUSE_HOST": "${LANGFUSE_HOST}",
    "LANGFUSE_BASE_URL": "${LANGFUSE_HOST}",
    "LANGFUSE_PUBLIC_KEY": "${LANGFUSE_PUBLIC_KEY}",
    "LANGFUSE_SECRET_KEY": "${LANGFUSE_SECRET_KEY}"
  }
}
```

**Blocked by**: need `npm view <pkg>` confirmation + decide between `@langfuse/mcp-server` (org-scope) vs `langfuse-mcp` (root-scope) vs the actual package name.
**Decision**: NOT auto-applied — operator runs `npm view @langfuse/mcp-server versions` to confirm.

### Option B: Env-var-based path (Z:-portability without npm-publish)

If npm-publish doesn't exist, re-root the abs path via an env var (CLAUDE.local.md exports `LANGFUSE_MCP_PATH`):

```jsonc
"langfuse": {
  "type": "stdio",
  "command": "node",
  "args": ["${LANGFUSE_MCP_PATH}/build/index.js"],
  "env": {
    "LANGFUSE_HOST": "${LANGFUSE_HOST}",
    "LANGFUSE_BASE_URL": "${LANGFUSE_HOST}",
    "LANGFUSE_PUBLIC_KEY": "${LANGFUSE_PUBLIC_KEY}",
    "LANGFUSE_SECRET_KEY": "${LANGFUSE_SECRET_KEY}"
  }
}
```

With CLAUDE.local.md `(b)` env block addition:

```powershell
$env:LANGFUSE_MCP_PATH = 'Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse'
```

**Pros**: Z:-portability restored (other machines override via their own CLAUDE.local.md); no npm-publish dependency.
**Cons**: introduces a new env var; if `LANGFUSE_MCP_PATH` unset, MCP server silent-fails on spawn (need PreToolUse validation hook).
**Decision**: VIABLE but more complex than Option A.

### Option C: Document-as-exception (W286-cross precedent)

Per W286-cross `_comments.w286_cross_npx_pinned_v2` precedent — codex round-1/2/3/4/5 flagged the npx-pinned-form as MEDIUM but the operator accepted it as a 0.5-1s startup latency trade-off. For langfuse, the inverse trade-off applies: keeping the W155 F13 form preserves the custom-build advantage but loses portability.

**Apply**: add a `_comments_addendum.w320_langfuse_local_build` block in `.mcp.json` documenting:

1. langfuse MCP-server is a local-build from the langfuse monorepo (`Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse`)
2. NO upstream npm-publish exists (operator-verified DATE)
3. Z:-portability is sacrificed for build-reproducibility — accepted trade-off
4. Reversibility: clone the langfuse monorepo on the target machine, run `npm install && npm run build`, then update `.mcp.json:52` arg path

**Pros**: zero behavioral change; minimal risk; explicit trade-off documentation.
**Cons**: doesn't resolve CR-9 violation — just acknowledges it.
**Decision**: SAFEST FALLBACK if Options A and B don't pan out.

---

## §5 Recommended path — operator-decision required

**This wave (W320)**: NOT auto-applied. Per task brief: "If safe-fix: write paste-ready .mcp.json langfuse block for operator (DO NOT auto-apply — .mcp.json changes risk runtime breakage if pkg version unknown)".

**Recommended operator-AI sequence** (W321 P1):

1. Run `npm view @langfuse/mcp-server versions 2>&1 | head -5` (W321-D-3a) to confirm npm-publish status.
2. If npm-published: apply Option A (pin to `@<latest-stable>`).
3. If not npm-published: apply Option B (env-var rebase) — adds Z:-portability AND keeps custom-build.
4. If both fail (rare — npm-publish exists but functionally diverged from local build): apply Option C documentation-as-exception.

---

## §6 Smoke test (post-apply, any option)

```powershell
# Verify MCP server starts + responds to initialize
Get-Process -Name node 2>$null | Where-Object { $_.CommandLine -match 'mcp-server-langfuse' }
# Expected: PID listed (CC restart spawns the MCP)
```

Verify in CC: tools `mcp__langfuse__get-prompt` + `mcp__langfuse__get-prompts` callable + return non-empty payload from the live `:3000` Langfuse.

---

## §7 Forward-AI (W321 candidates)

- **W321-D-3a (P1)**: `npm view @langfuse/mcp-server versions 2>&1 | head -5` + decide Option A/B/C per §5.
- **W321-D-3b (P2)**: if Option B selected, add PreToolUse validation hook checking `LANGFUSE_MCP_PATH` is set + path exists (silent-fallback prevention per W314-r2 §β + W320-D-1 pattern).
- **W321-D-3c (P3)**: cite-anchor + record decision in `.mcp.json _comments_addendum.w321_langfuse_cr9_align` block (mirror the W308 basic-memory uvx-pin precedent at `.mcp.json:91`).

---

## §8 Cite chain

- W319 Stream D STALE-D-9 origin: CLAUDE.md L41 W319 status block "STALE-D-9 langfuse MCP `.mcp.json:52` uses W155 F13 native-node abs-Z:-path pattern rolled back for 4 others (CR-9 partial-compliance)"
- W286-cross-v2 contract: `.mcp.json:7 _comments.w286_cross_npx_pinned_v2` + CLAUDE.md L13 (W286-arc-P0C 2026-05-18 ratification)
- W155 F13 original migration: `.mcp.json:6 _comments.w155_f13_native_node`
- W308 basic-memory uvx-pin precedent: `.mcp.json:91 _comments_addendum.w308_basic_memory_uvx_pin_2026_05_19`
- W265 langfuse install: `.mcp.json:89 _comments_addendum.w265_langfuse_2026_05_17`
- Build artifact verified: `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` (5,971 bytes, mtime 2026-05-17 12:55)
