---
title: Wave 214 Architect Review — Adversarial Architectural Review of W213 P0 Install Plan
status: AUTHORITATIVE
date: 2026-05-15
wave: 214
agent: architect (master architect / comprehensive-review architect-review specialization)
artifact-class: adversarial-architectural-review
input: tmp/wave213-MASTER-SYNTHESIS-2026-05-15.md
output_budget: ≤400 LOC
---

## ARTIFACT-INLINE: tmp/wave214-architect-review-2026-05-15.md

# Wave 214 Architect Review — Adversarial Architectural Review of W213 P0 Install Plan

## STAND-IN-NOTICE (per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled disclosure mandate`)

Wave 214 architect dispatched as **Sonnet stand-in** under env-funneling per `CLAUDE.local.md` ENV (f) DEPRECATED path. Cross-model gate NOT structurally satisfied at agent layer. Per FM-09 2-stage validation contract: orchestrator-side Path P codex foreground+tee REQUIRED before any install commit boundary.

## Architectural-conformance probe results (≥3 rules audited)

| Rule | Probe outcome |
|---|---|
| `layered-gates-architecture.md §The 5 layers` | ✅ ECC governance-capture is Layer 3 PostToolUse async (preserves stack); wshobson comprehensive-review is Agent invocations (orthogonal layer) |
| `kiss-dry-yagni.md` Must-Never #4 | ❌ 4/21 P0 candidates are DUPLICATE-FUNCTIONALITY (superpowers selective-vendoring proposals already installed via plugin marketplace at 5.1.0) |
| `cardinal-rule-9-install-risk.md` | ⚠ 2 candidates `@latest`-exposed (firecrawl-mcp / playwright) — already npm-globally pinned per `.mcp.json` w155_f13_native_node comment; install commands in synthesis are STALE |
| `cardinal-rule-12-upstream-install-priority.md` | ⚠ Cross-agent conflict on microsoft/playwright-mcp NEEDS reconciliation |
| `fm20-path-drift-cascade.md` Rows 10-13 README-blob-pin-drift | ⚠ superpowers HEAD `f2cbfbef` confirmed via git rev-parse; 4 NEW skill files exist; BUT install path obsoletes vendoring entirely |
| `multi-source-discovery-breadth-discipline.md` ≥4 sources | ✅ W213 confirmed 5+ source families across agents P/Q/R |

## CRITICAL FINDING #1 — superpowers P0-E3/E4/E5/E6 are ALL DUPLICATE-FUNCTIONALITY

**SMOKING GUN — runtime probe directly refutes the synthesis claim**:

Probe `ls Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/` returned **14 skills already installed** including ALL FOUR candidates W213 P0 proposes to "selective-vendor":
- ✅ `dispatching-parallel-agents/SKILL.md` (P0-E5 proposed — DUPLICATE)
- ✅ `executing-plans/SKILL.md` (P0-E4 proposed — DUPLICATE)
- ✅ `finishing-a-development-branch/SKILL.md` (P0-E3 proposed — DUPLICATE)
- ✅ `using-git-worktrees/SKILL.md` (P0-E6 proposed — DUPLICATE)

System-reminder available-skills list confirms all 4 are ACTIVE plugin skills: `superpowers:dispatching-parallel-agents` / `superpowers:executing-plans` / `superpowers:finishing-a-development-branch` / `superpowers:using-git-worktrees`.

**Refutation per Probe 4 plugin-namespace** (per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md §Probe 4 plugin-namespace`): "if a candidate proposes vendoring an artifact from upstream: check plugin-loaded skill namespace FIRST. `<plugin>:<artifact>` exposed via plugin → DUPLICATE if vendored, REJECT per kiss-dry-yagni Must-Never #4". W213 synthesis section §"P0 superpowers selective-vendoring impact" claims "6 already vendored + 4 NEW = 10/14 = 71% adoption" — this is FALSE. The 4 are already plugin-loaded; selective-vendoring would duplicate functionality already accessible via `<Skill superpowers:executing-plans>` invocation.

**Sub-claim decomposition** (per `fm20-path-drift-cascade.md §How to apply`):
- "superpowers 4 new vendored skills available at HEAD `f2cbfbef`" → VERIFIED via gh API (HEAD matches `git rev-parse HEAD` output) ✅
- "should be selective-vendored per Section 14.5" → REFUTED ❌ (already plugin-installed at 5.1.0; vendoring is duplicate)

**Disposition per CR-12 6-class lattice**: classify as **DUPLICATE-FUNCTIONALITY** (existing plugin already provides skill); REJECT all 4 candidates from install batch.

## CRITICAL FINDING #2 — Most P0 CLI candidates are ALREADY INSTALLED

Multi-channel probe per `mia-pre-apply.md §Alternate-install-path probe discipline` revealed:

| Candidate | Already-installed path | Status |
|---|---|---|
| **P0-C1 ripgrep** | `/c/Users/42/AppData/Local/Microsoft/WinGet/Links/rg` | ✅ INSTALLED (WinGet) — DROP from batch |
| **P0-C2 fd** | `/c/Users/42/AppData/Local/Microsoft/WinGet/Links/fd` | ✅ INSTALLED (WinGet) — DROP |
| **P0-C3 bat** | WinGet Packages dir confirms `sharkdp.bat_*` | ✅ INSTALLED (WinGet) — DROP |
| **P0-C4 fzf** | WinGet Packages confirms `junegunn.fzf_*` | ✅ INSTALLED (WinGet) — DROP |
| **P0-D1 ast-grep CLI** | `C:/Users/42/AppData/Roaming/npm/ast-grep` | ✅ INSTALLED (npm-global) — DROP |
| **P0-D2 ruff** | `/z/claude-sota-installed/.local/bin/ruff` | ✅ INSTALLED (local bin) — DROP |
| **P0-G1 mise** | `/z/claude-sota-installed/.local/bin/mise` | ✅ INSTALLED (local bin) — DROP |
| **P0-G2 just** | `/c/Users/42/AppData/Local/Microsoft/WinGet/Links/just.exe` + cargo bin | ✅ INSTALLED (WinGet+cargo) — DROP |
| **P1-C5 zoxide** | WinGet Packages `ajeetdsouza.zoxide_*` | ✅ INSTALLED — DROP |
| **P1-C6 lazygit** | WinGet Packages `JesseDuffield.lazygit_*` | ✅ INSTALLED — DROP |
| **P1-C7 delta** | WinGet Packages `dandavison.delta_*` | ✅ INSTALLED — DROP |
| **P1-D3 pyright** | `C:/Users/42/AppData/Roaming/Python/Python314/Scripts/pyright` | ✅ INSTALLED — DROP |
| **P1-D4 biome** | `C:/Users/42/AppData/Roaming/npm/biome` | ✅ INSTALLED — DROP |
| **P1-L1 firecrawl-mcp** | `C:/Users/42/AppData/Roaming/npm/firecrawl-mcp` | ✅ INSTALLED (npm-global) — needs `.mcp.json` wire only |

**Refutation per `mia-pre-apply.md §Empirical evidence ladder`**: Wave 112 Ship A1+2CC archeology n=29→36 (115 MB shadow installs caught by 5/5 alternate-path probes). W213 synthesis violated this discipline — `command -v` was NOT executed during candidate evaluation. **14 of 21 P0 candidates (67%)** are already installed; install command lists in synthesis would create SHADOW installs.

## CRITICAL FINDING #3 — Cross-agent conflict resolution (microsoft/playwright-mcp)

Probe `grep -A 5 '"playwright"' .mcp.json` returned:
```json
"playwright": {
  "type": "stdio",
  "command": "node",
  "args": ["C:/Users/42/AppData/Roaming/npm/node_modules/@playwright/mcp/cli.js"]
}
```

Plus npm-global probe shows `playwright-mcp` already installed. **Agent P's REJECT verdict is CORRECT**; Agent R's ADOPT-NOW is REFUTED. Per `.mcp.json` `_comments.playwright_pin`: "Wave 124 fire 1 2026-05-09 — playwright pinned per codex T1 NEEDS-REVISION conf=0.91 P0 prescription (CR-9 fix). Was @latest (D6 today-release-auto-upgrade risk); now @0.0.75". Already INSTALLED + pinned + WIRED. P0-H1 DROPPED.

## CRITICAL FINDING #4 — Wiring-difficulty miscalibration (llama.cpp / vLLM / SGLang)

| Candidate | W213 grade | Reality (Windows-CUDA architectural assessment) |
|---|---|---|
| **P0-F1 llama.cpp** | "EASY" | **MEDIUM** minimum — CUDA toolkit (12.x) install + variant selection (CUDA / cuBLAS / OpenBLAS / CPU-only) + GPU runtime ABI compatibility verification + ggml binary format choice. NOT a `gh release download` one-liner. |
| **P1-F2 vLLM** | "MEDIUM" | **HARD on Windows** — vLLM is Linux-primary serving stack; Windows-native build is experimental at best. Docker requires WSL2 backend. Honest classification: HARD (Windows) or REQUIRES-WSL2. |
| **P1-F3 SGLang** | "MEDIUM" | **HARD on Windows** — same as vLLM. Linux-primary. |

**Refutation per `karpathy-adapted.md §1 Think Before Coding`**: "Don't assume. Surface tradeoffs." Synthesis grades hide Windows-platform reality.

## CRITICAL FINDING #5 — Install-order architectural sequencing

W213 synthesis does NOT specify install order. Per `cardinal-rule-7-graduated-unleash.md` Phase 1 install sequence, dependencies must install BEFORE dependents:

**Mandatory ordering** (when not-already-installed):
1. **mise** FIRST (toolchain version management — pip/cargo/npm targets)
2. **gh CLI** prerequisite (verified present at `/z/claude-sota-installed/.local/bin/gh` ✅) — already in PATH
3. **cargo** prerequisite (verified present at `/c/Users/42/.cargo/bin/cargo` ✅) — already in PATH
4. THEN pip-class (ruff/pytest/pyright/litellm/sglang/vllm) + cargo-class (ast-grep already npm-installed; just already winget) + npm-class (vitest/playwright-mcp/biome/firecrawl-mcp/wshobson-plugin)
5. THEN gh-release-class (gitleaks/trufflehog/sops/syft/grype/trivy/llama.cpp/ollama)
6. LAST plugin marketplace installs (wshobson comprehensive-review via `/plugin install`)

## CRITICAL FINDING #6 — Layer-stacking integrity

| Candidate | Hook layer per `lga-five-layers.md` | Stack-integrity impact |
|---|---|---|
| **P0-E1 ECC governance-capture.js** | Layer 3 PostToolUse async | ✅ PRESERVED (env flip only; no settings.json mod) |
| **P0-E2 wshobson comprehensive-review** | Layer 3 Agent invocations (not hook) | ✅ ORTHOGONAL (Agent tool dispatch; no hook stack mod) |

No layer-stacking violations from APPROVED candidates. The dropped duplicates (P0-E3/E4/E5/E6) would have added zero Layer-N impact since they're skills not hooks.

## VERDICT

**VERDICT: NEEDS-REVISION**: W213 install plan duplicates 4 superpowers skills + proposes 10+ already-installed CLIs as install candidates; ~67% drop rate post-Mia-pre-apply.

confidence: 0.94

prescribed_edits:

1. **DROP P0-E3 / P0-E4 / P0-E5 / P0-E6** (superpowers selective-vendoring) — all 4 ALREADY plugin-installed at 5.1.0 per probe of `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/`. Update synthesis §"P0 superpowers selective-vendoring impact" claim "10/14 = 71% adoption" — actually **14/14 = 100% adoption** via plugin install; vendoring entirely obsolete.

2. **DROP P0-C1/C2/C3/C4/D1/D2/G1/G2 + P1-C5/C6/C7/D3/D4/L1** (14 CLI/MCP install commands) — all confirmed ALREADY-INSTALLED via multi-channel probe (WinGet / cargo / npm-global / local-bin); install commands would shadow-install per Wave 112 Ship A1+2CC anti-pattern n=36. Mark in checklist as **ALREADY-INSTALLED-VERIFIED 2026-05-15** with channel cite; defer to retrofit-cite-only updates to manifest.

3. **DROP P0-H1 microsoft/playwright-mcp** — `mcp__playwright__*` already wired via `.mcp.json` (Wave 75 + Wave 124 pin @0.0.75). Agent P REJECT verdict is correct; Agent R ADOPT is REFUTED. Document conflict resolution in synthesis.

4. **DOWNGRADE wiring-difficulty calibration**:
   - P0-F1 llama.cpp: "EASY" → **MEDIUM** (CUDA toolkit + variant selection)
   - P1-F2 vLLM: "MEDIUM" → **HARD on Windows / REQUIRES-WSL2**
   - P1-F3 SGLang: "MEDIUM" → **HARD on Windows / REQUIRES-WSL2**

5. **CR-9 pin discipline** — all remaining `@latest` install commands in synthesis (P0-B2 vitest, P0-E2 wshobson, P1-B4 playwright lib, P1-F4 litellm, P1-F5 ollama) MUST carry version pin OR explicit `@latest-acknowledged-D6-risk` marker per CR-9 codification. Reject any install command without pin.

6. **Net P0 batch revised**: only **3 GENUINELY-NEW installs** remain after pre-apply filter:
   - P0-A1 gitleaks (gh-release; verify not in WinGet first)
   - P0-A2 trufflehog (gh-release; CR-9 license verify AGPL §13 CLI-binary-use)
   - P0-A3 sops (gh-release; EASY key-provider config)
   - P0-E1 ECC governance-capture (env flip; CR-9 trivial)
   - P0-E2 wshobson comprehensive-review plugin (verify Probe 4 plugin-namespace first; marketplace dir name `wshobson-agents` not yet present per `ls .claude/plugins/marketplaces/` returns 0 wshobson matches)
   - Plus P0-B1 pytest (verify `pip show pytest` first), P0-B2 vitest, P0-F1 llama.cpp (re-graded MEDIUM)
   - **Most realistic install batch**: ~7-8 genuine candidates, NOT 21.

7. **Path P codex foreground+tee verification** per W213 §"Path P plan" MUST FIRE on revised batch (not original 21 stale candidates) — re-fire codex T1 batches 1+2+3 with REVISED candidate list after prescriptions 1-6 applied. Without re-fire, codex T1 will verify stale install commands and produce false-positive APPROVE on shadow-install scenarios.

risk_flags:

| Candidate | Risk |
|---|---|
| P0-E3/E4/E5/E6 superpowers | **HIGH** — DUPLICATE-FUNCTIONALITY confirmed via runtime probe; vendoring would violate kiss-dry-yagni Must-Never #4 + waste install LOC |
| P0-C1-C4, D1-D2, G1-G2 CLIs | **HIGH** — Shadow-install risk; 115 MB+ wasted disk space per Wave 112 Ship A1+2CC precedent |
| P0-H1 microsoft/playwright-mcp | **HIGH** — Cross-agent conflict + already-wired confirms duplicate; install would corrupt existing `@0.0.75` pin |
| P0-F1 llama.cpp / P1-F2/F3 vLLM/SGLang | **MEDIUM** — Wiring-difficulty miscalibration may surprise operator with multi-hour install at "EASY" budget |
| P0-A1 gitleaks (gh-release) | **LOW** — verify not in WinGet first; if not, standard gh-release path |
| P0-A2 trufflehog | **MEDIUM** — AGPL §13 CLI-binary-use claim is INFERRED; verify against AGPL §13 verbatim + SPDX FAQ per FM-20 sub-claim decomposition |
| P0-A3 sops | **LOW** — MPL-2.0 clean license; standard gh-release |
| P0-B1/B2 pytest/vitest | **LOW** — `pip show pytest` + `npm ls -g vitest` probe first; if installed, retrofit-cite only |
| P0-E1 ECC governance-capture | **LOW** — env flip only; ECC already installed; trivial |
| P0-E2 wshobson plugin | **MEDIUM** — Probe 4 marketplace.json canonical name verify per Wave 146 Ship 3 V3 SAVED-SHIP precedent; verify marketplace dir name is `wshobson-agents` not `wshobson` before `/plugin install` |

VERDICT:
