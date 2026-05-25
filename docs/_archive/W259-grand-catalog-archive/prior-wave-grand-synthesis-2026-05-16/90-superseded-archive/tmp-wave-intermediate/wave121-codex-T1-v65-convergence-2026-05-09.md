---
title: Wave 121 codex T1 BRIDGE-MODE foreground+tee — v65 SOTA convergence + Top-3 source-deep-dive
status: AUTHORITATIVE
date: 2026-05-09
agent: codex T1 BG bfltp9lts (REAL GPT-5.5)
verdict: APPROVE — Top-3 verified live; 1 NEW gap surfaced (codex CLI v0.130.0 drift)
---

# Wave 121 codex T1 verdict — REAL GPT-5.5 BRIDGE-MODE

## Verdict
**APPROVE** + 1 actionable correction

[VERIFIED via TIER-1 cite] The v65 Top-3 are still live and adoption-worthy, but implementation needs adjust: `openai/codex-plugin-cc` is already installed via the `openai-codex:` plugin cache, and `openai/codex` has moved from `0.129.0` to `0.130.0` since v65, so upgrade with CR-9 pinning and a smoke test.

## Top-3 Verified
From `kits/v65/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:5-10`:

| Repo | Live/Freshness | License | Ecosystem Fit | SRA Score | Adoption |
|---|---|---|---|---|---|
| `anthropics/claude-code` | ACTIVE pushed 2026-05-09 | Anthropic terms (local product use) | Exact CC runtime | 10/10 with D1 disclosure | ✅ APPROVE INSTALL-NOW (already at v2.1.138) |
| `openai/codex` | ACTIVE pushed 2026-05-09 | Apache-2.0 | Standalone CLI cross-model bridge | 10/10 | ✅ APPROVE — **PIN 0.130.0** (drift from manifest 0.129.0) |
| `openai/codex-plugin-cc` | ACTIVE per SRA D2 | Apache-2.0 | Native CC plugin | 9/10 | ✅ APPROVE — already installed at `.claude/plugins/cache/openai-codex/codex/1.0.4` |

## TIER-1-DIRECT cite anchors

**`anthropics/claude-code` HEAD `831608a360511febd4b10c77d4d03b47afda2f5b`**:
- `LICENSE.md:1` — Anthropic terms
- `README.md:13-44` — install/deprecated npm guidance
- `README.md:48-50` — official plugin bundle note
- `CHANGELOG.md:3-64` — post-v65 changelog (plugin/MCP/plan-mode fixes; marketplace UX `d` instead of `r`)

**`openai/codex` HEAD `0c70698e24e37cfdb2578cbeec0d981f656dc734`**:
- `LICENSE:1-3` — Apache-2.0
- `README.md:1-27` — CLI install + purpose
- `codex-cli/package.json:2-7` — package metadata
- `codex-rs/cli/Cargo.toml:1-10` — Rust CLI crate
- `codex-rs/app-server/README.md:200-224` — app-server plugin APIs marked "under-development"
- `codex-rs/app-server-daemon/README.md:1-15` + `src/lib.rs:151-160` — daemon experimental/Unix-only

**`openai/codex-plugin-cc` HEAD `807e03ac9d5aa23bc395fdec8c3767500a86b3cf`**:
- `LICENSE:1-3` — Apache-2.0
- `README.md:1-15` — Claude Code plugin purpose
- `README.md:22-34` — marketplace install
- `README.md:77-164` — review/rescue commands
- `.claude-plugin/marketplace.json:1-20` + `plugins/codex/.claude-plugin/plugin.json:1-8` — plugin metadata

## Breaking changes / drift since v65 publication (2026-05-07T20:34Z)

**`anthropics/claude-code`**:
- v2.1.138 latest observed
- Plugin/MCP/plan-mode fixes
- Marketplace UX change: removal key is now `d` instead of `r` (`CHANGELOG.md:3-64`)
- NPM install **explicitly deprecated** in favor of native installers
- Action: maintain native install path (already in place per Wave 118 autoupdate fix)

**`openai/codex`**:
- Stable advanced 0.129.0 → **0.130.0** after v65
- No explicit breaking-release banner
- App-server/plugin surface moving quickly (APIs marked "under-development")
- Daemon lifecycle experimental + Unix-only
- Action: **CR-9 MEDIUM risk** — pin 0.130.0 + smoke test before manifest update; treat app-server/remote-control/plugin APIs/daemon as MEDIUM until smoke-tested

**`openai/codex-plugin-cc`**:
- No commits or releases since v65 publication
- Main risk: compatibility with newer Codex CLI + preserving local Windows hook-path patch
- Action: do NOT re-vendor; upgrade only through official `openai-codex:` marketplace path

## Install LOC / Risk

| Repo | Source LOC delta | Risk | Notes |
|---|---|---|---|
| `anthropics/claude-code` | 0 (native installer) | LOW | Avoid deprecated npm path |
| `openai/codex` | 0 (npm/brew) | MEDIUM | Manifest references 0.129.0 while upstream stable is 0.130.0 |
| `openai/codex-plugin-cc` | 0 (already installed) | MEDIUM | 50 files / 6114 LOC at local cache; preserves Windows hook patch |

Upstream audit surfaces: codex (4354 files / 989480 LOC), codex-plugin-cc (61 files / 9591 LOC).

## Probe 4 Cache Check (per `agent-harness-fit-verification.md`)

- ✅ `openai/codex-plugin-cc` ALREADY at `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4` (plugin metadata + commands + skills + hooks + `codex-rescue`)
- ✅ `anthropics/claude-code` overlaps with `claude-plugins-official:` bundled plugin surfaces
- ❌ `openai/codex` is NOT a plugin-cache artifact — only supporting Codex bridge/plugin assets are cached

## Recommended Wave 122-126 plan integration

**Add NEW Wave 122 SHIP-122-E** — codex CLI v0.129.0 → v0.130.0 upgrade:
- Cite: codex T1 W121 verdict (this artifact)
- Install: `gh release download v0.130.0 --repo openai/codex --pattern '*windows*'` OR `npm install -g @openai/codex@0.130.0` per CR-6 official-native-channel
- Estimated LOC: ~50 (binary install + manifest §13 row update + smoke test)
- Risk: MEDIUM per codex T1 (app-server APIs under-development; daemon Unix-only — sss is Windows so daemon N/A)
- SRA D1-D10: D1 PASS (Apache-2.0) / D2 PASS (24h fresh) / D6 PASS (CLI binary; daemon N/A on Windows) / D9 MEDIUM
- Launch-discipline: REVERSIBLE (`npm install -g @openai/codex@0.129.0` rollback) / OBSERVABLE (smoke probe `codex --version`) / INCREMENTAL (single-binary swap)
- Cross-cutting: FM-17.f Path P codex T1 verdict satisfies cross-model gate per CR-3 Phase 1 bootstrap exception

## Key methodology insights from codex T1

1. **"Stars discover, do not decide" rule** per `kits/v65/.../HIGH_STAR_RESEARCH_METHODS.md:1-4,25-47` — convergence with `convergence-gate.md` Axis 1+2+3 PASS requirement
2. **MCP tools NOT exposed in this codex session** — codex used local kit files + plugin caches + `gh` + `git` + `npm` for verification (Path P self-sufficient via OS-level CLIs)
3. **App-server/plugin APIs marked "under-development"** in codex-rs — treat as MEDIUM CR-9 risk until smoke-tested
4. **Daemon Unix-only** at `codex-rs/app-server-daemon/src/lib.rs:151-160` — sss is Windows so daemon integration is non-applicable

## Honest disclosure (per codex AXIS-1 cite admissibility)

Codex did NOT have access to MCP tools (mcp__github__get_file_contents / mcp__deepwiki / mcp__repomix / mcp__context7 / mcp__exa / mcp__perplexity / mcp__serena) in this session. Verification was via OS-level tooling (gh/git/npm + local file reads). Cite-anchors at file:line + HEAD SHA depth still satisfy CR-1 lattice — verification proxy is OS CLI (TIER-1-LOCAL) instead of MCP (TIER-1-DIRECT) for the source-deep-dive layer.

For Wave 122+ codex T1 dispatches: explicitly grant MCP tool access in codex CLI flags OR pivot to Path P with mcp__ tools enabled at the orchestrator-side wrapper.

VERDICT: APPROVE + 1 actionable (codex CLI v0.130.0 upgrade) + Wave 122-126 plan integration ready.
