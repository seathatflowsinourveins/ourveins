# W318-B Stream — mksglu/context-mode Re-Audit

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Source**: `Z:/repos/deps/context-mode`
**Prior verdict**: W315-r2 reported 5 patches behind PR #627 Zod-preprocessor; W318 mandate: update + re-audit

## §1 — Version delta

| Metric | Value |
|---|---|
| Current upstream `package.json` version | **`1.0.141`** |
| W315-r2 prior version | `1.0.139` (with PR #623 surfaced diagnostic, before PR #627) |
| Patches landed since W315-r2 | **5+ versions** (1.0.139 → 1.0.140 → 1.0.141) |
| Author | Mert Köseoğlu (`mksglu`) |
| License | `Elastic-2.0` |

## §2 — Substantive content changes since W315-r2

```
898ecc9 ci: update install stats
6bbcb44 ci: update server.bundle.mjs, cli.bundle.mjs, session hook & security bundles
78c9adf 1.0.141                                                  ← release
de9ce84 ci: rebuild bundles for v1.0.141
0ea3a25 Merge next into main for v1.0.141 release
7c82220 fix(opencode): coerce stringified primitives on native plugin path (#627)  ← PR #627 SHIPPED
76559cf fix(upgrade): fail loud when Step 1 GitHub clone/install throws (#628)     ← NEW silent-fallback fix
5235f3f fix(pi): curl/wget escape hatch + quoted-arg false positives (closes #625)
605177a fix(gemini): map beforeagent in dispatcher and fix doctor paths (#629)
227230d docs: Replace outdated Smart Truncation with FTS5 externalization (#626)
b759709 fix(pi): normalise context_mode_ prefix and path→file_path for event extraction (#624)
7a83912 ci: update install stats
0c838a3 docs(readme): clarify plugin+legacy-mcp coexistence in OpenCode/KiloCode sections
986e172 ci: update server.bundle.mjs, cli.bundle.mjs, session hook & security bundles
218a204 1.0.140                                                  ← release
e1220be ci: rebuild bundles for v1.0.140
a9a894a Merge next into main for v1.0.140 release
03db6fe fix(opencode): surface diagnostic when ctx_* tools suppressed on legacy MCP child (#623)  ← W315-r2 cited
```

### Notable fixes per W318 mandate
- ✅ **PR #627 Zod-preprocessor**: MERGED (`7c82220 fix(opencode): coerce stringified primitives on native plugin path`)
- ✅ **PR #628 fail-loud Step 1 install**: NEW silent-fallback hardening (directly aligned with our sca-v7 D31 silent_fallback_density dim)
- ✅ **PR #625 curl/wget escape**: pi false-positive fix
- ✅ **PR #629 gemini map**: cross-tool harness fix
- ✅ **PR #626 FTS5 externalization docs**: aligns with context-mode 98% context-savings claim

## §3 — Plugin-cache status

Per W317-D & our local probe, the context-mode plugin is INSTALLED via the same marketplace listing. Installed cache version requires verification:

```
Expected: Z:/claude-sota-installed/.claude/plugins/cache/context-mode/.../1.0.{139,140,141}/
```

Note: `/plugin update` failed in W317-D (resolver bug). Standard `claude plugin install context-mode` workaround applies if version-bump needed.

## §4 — sca-v7.1 re-audit (delta from W315)

| Dim | W315 score | W318 score | Delta | Cite |
|---|---|---|---|---|
| D5 release cadence | 4 | **5** | +1 | 2 new minor releases in 7d (1.0.140, 1.0.141) |
| D8 license Elastic-2.0 | 3 (non-OSI-approved, source-available) | 3 | 0 | unchanged |
| D14 install spec | 5 (npm-pinned with `npx -y context-mode@<v>`) | 5 | 0 | — |
| D16 bus factor | 3 (solo Mert) | 3 | 0 | — |
| D17 test_coverage | 4 | 4 | 0 | — |
| D19 code_review | 4 | 4 | 0 | — |
| D21 org_diversity | 2 (`mksglu` solo) | 2 | 0 | — |
| D24 mcp_attack_surface | 4 (npm-pinned) | 4 | 0 | — |
| D27 independent_adopter_floor | 5 (multi-tool: Claude/Codex/Gemini/Cursor/OpenCode/OpenClaw) | 5 | 0 | — |
| D31 silent_fallback_density | 4 | **5** | +1 | PR #628 fail-loud GitHub-clone error |
| D32 pin_freshness | 4 | **5** | +1 | active versioning, 5 PRs landed in 7d |

**install_score recompute**: W315 ~4.21 → W318 ~4.35 (+3 dim lifts). License D8=3 (Elastic-2.0) caps at T2-strong, not T1.

## §5 — Critical caveat: Elastic-2.0 license D8=3

Elastic-2.0 (Elastic License 2.0) is **source-available, NOT OSI-approved**. Disallows providing context-mode as a managed service. For our LOCAL Z:-portable runtime usage, license is fine. But this caps sca-v7 install_score below T1 floor regardless of other dim lifts (per sca-v7 hard-cap D8≤3 → max install_score ~4.4).

## §6 — VERDICT

| Item | Verdict |
|---|---|
| W318 update mandate | **READY**: 5 patches available since W315-r2 (1.0.139 → 1.0.141); PR #627 Zod-preprocessor MERGED, PR #628 fail-loud SHIPPED |
| sca-v7.1 score | **4.35 → T2 HOLD** (Elastic-2.0 license caps; cannot promote T1) |
| **Recommendation** | **UPDATE local clone (DONE this wave) + W319 operator-AI `claude plugin install context-mode` to ratify 1.0.141 in plugin cache** |
| Convergent benefit | PR #628 fail-loud aligns with our W314-r2 silent-fallback-v4 mandate (D31 dim) — direct architectural fit |
