---
title: Wave 251 Path P codex T1 Adversarial Audit — REAL GPT-5.5 Verdict
status: AUTHORITATIVE
date: 2026-05-15
wave: 251
dispatch-mode: Path P orchestrator-direct foreground+tee (bypass FM-17.g subagent prompt-too-large)
codex-cli-version: 0.130.0
codex-profile: deep-review-exec
bg-id: buedmfvbk
verdict-file: .claude/state/codex_consult_wave251_b_path_p_OUT.txt (2880 LOC, 282KB)
bridge-mode-confirmed: YES — REAL GPT-5.5 via codex CLI subprocess
cross-model-gate: SATISFIED — orchestrator-direct codex T1 verdict on file
---

# Wave 251 — Path P Codex T1 Adversarial Audit (REAL GPT-5.5)

## Dispatch metadata

- **Mode**: Path P orchestrator-direct foreground+tee per `ctff-patterns-cd.md §Pattern D` (DEFAULT-profile foreground+tee recovery for Pattern B HNF)
- **Reason for Path P**: codex-rescue subagent Agent B failed with FM-17.g signature (1 tool_use / 2 tokens / 138s wall-clock / "Prompt is too long") — n=4 cumulative same-class evidence (W166/W167/W168/W251)
- **Profile**: `deep-review-exec` (xhigh effort + danger-full-access + service_tier=fast)
- **Wall-clock**: ~10 minutes (282KB output, executed PyPI + GitHub probes substantively)
- **CODEX_HOME**: `Z:\claude-sota-installed-state\.codex` (Windows-format path required after Git Bash translation failed initial attempt)

## Verdict (verbatim from /tmp/codex_consult_wave251_b_path_p_OUT.txt EOF)

```json
{
  "verdict": "NEEDS-REVISION",
  "conf": 0.91
}
```

## TOP-5 scoring errors (Pattern A fix-forward queue)

| # | Wave 250 line | Repo | Error | Fix |
|---|---|---|---|---|
| 1 | L94 | `anthropics/skills` | Marked INSTALL-NOW (Δ1) while license is NOASSERTION and root license file was NOT present in direct GitHub probe. Probe 6 license gate NOT satisfied. | Downgrade to **DEFER/HNF** until direct permissive license / SPDX exception verified; only then restore INSTALL-NOW. |
| 2 | L101 | `trailofbits/skills-curated` | Marked INSTALL-NOW despite CC-BY-SA-4.0. Share-alike CC content is NOT in the MIT/Apache/BSD permissive install whitelist. | Change to **CITE-AS-REFERENCE** or DEFER-LICENSE-REVIEW; install only if per-skill license allows vendoring/use. |
| 3 | L67 | `VikParuchuri/marker` | GPL-3.0 repo marked STUDY-PILOT for install/use. Probe 6 says GPLv3 is a structural license blocker for adoption. | Change verdict to **REJECT-FOR-INSTALL / CITE-AS-REFERENCE**; keep markitdown as permissive parser install path. |
| 4 | L111 | `NeoLabHQ/context-engineering-kit` | GPL-3.0 labeled "cite-OK install-OK" + STUDY-PILOT. Directly conflicts Probe 6 permissive-only policy. | Change to **CITE-AS-REFERENCE only**; isolate paper-derived ideas without code import; install verdict should be REJECT. |
| 5 | L106 | `smtg-ai/claude-squad` | Catalog says MIT, but direct GitHub license probe returns **AGPL-3.0**. Axis PASS PASS PASS also conflicts with stated Windows blocker. | Set license to AGPL-3.0; add Probe 6 license blocker; downgrade Axis to reflect Windows/portable-runtime failure. |

## Additional dimensions for comprehensive scoring (5 NEW, harmonized with Agent C 10-dim rubric)

| # | Name | Measurement | Data source | Weight band | Maps to |
|---|---|---|---|---|---|
| 1 | **token_efficiency_impact** | Percent token / cost reduction on reproducible local benchmark vs baseline | rtk/codex session logs, upstream benchmark fixtures, local replay before/after | 0-10 | Agent C **D7** ✅ |
| 2 | **cross_platform_compat** | Windows/macOS/Linux PASS/PARTIAL/FAIL; Z:-portable Windows weighted highest | CI matrix, README install docs, local Windows smoke test, issue tracker blockers | 0-10 | Agent C **D10** ✅ |
| 3 | **dependency_footprint** | Install size + runtime services: package MB, Docker images, DBs, GPU/native build deps | npm/PyPI/cargo metadata, lockfiles, Docker manifests, local install dry-run | 0-10 | **NEW — to add as D11** |
| 4 | **security_posture** | Security policy, signed releases/SBOM, known CVEs, audit results, secret-handling | GitHub Security tab, OSV/GHSA, npm audit/pip-audit, release artifacts | 0-10 | **NEW — to add as D12** |
| 5 | **install_reversibility** | How cleanly install can be undone without persistent state drift | install plan, files touched, package manager uninstall, Docker volumes, DB migrations | 0-10 | **NEW — to add as D13** (or merge into D6 as sub-dim) |

**Harmonization note**: Path P codex's first 2 dims (token_efficiency_impact + cross_platform_compat) already exist in Agent C's rubric (D7 + D10). 3 NEW dims (dependency_footprint + security_posture + install_reversibility) — propose adding to expand rubric from 10 → 13 dims, OR fold into existing dims:
- `dependency_footprint` → merge into **D6 install difficulty** (currently combined with reversibility)
- `security_posture` → **NEW D11** with weight 4-6 (deducted from D1 stars over-weight if needed)
- `install_reversibility` → already part of **D6** measurement

**Decision pending Wave 2 sensitivity check**: keep 10-dim rubric with D6 enhanced (install + reversibility + footprint as sub-measurements) + add D11 security_posture = **11-dim final**.

## Per-dimension grade thresholds (12 dimensions × A+/A/B/C/D/F = 72 bands verbatim)

### Stars
| Letter | Threshold |
|---|---|
| A+ | >50000 |
| A | 10000-50000 |
| B | 1000-10000 |
| C | 100-1000 |
| D | <100 |
| F | phantom or exact repo not found |

### License
| Letter | Threshold |
|---|---|
| A+ | MIT/Apache-2.0/BSD/ISC with direct root license |
| A | permissive per-plugin license verified |
| B | Elastic-2.0/BSL/source-available with allowed internal use |
| C | cite-only CC-BY or CC-BY-NC-ND/no install |
| D | GPL/LGPL/CC-BY-SA requires isolation or cite-only |
| F | AGPL/SSPL/proprietary/NOASSERTION for install |

### Axis 1+2+3 (composite)
| Letter | Threshold |
|---|---|
| A+ | triple PASS with ≥3 independent source families and direct probes |
| A | triple PASS with ≥2 distinct orgs plus direct file/registry probe |
| B | 2 PASS + 1 PARTIAL |
| C | 1 PASS + partial evidence |
| D | any FAIL or missing evidence |
| F | fabricated, contradicted, or phantom |

### CR-12 disposition
| Letter | Threshold |
|---|---|
| A+ | GENUINELY-NEW and non-duplicative live workflow |
| A | CITE-CLASS-CANONICAL |
| B | PROVIDER-COMPLEMENT |
| C | PARTIAL-OVERLAP or bounded STUDY-PILOT |
| D | DUPLICATE-FUNCTIONALITY but cite-useful |
| F | duplicate installed artifact, out-of-scope, or blocked install |

### SRA D1/D6
| Letter | Threshold |
|---|---|
| A+ | PASS PASS with direct adversarial probes |
| A | PASS PASS inferred from strong provenance |
| B | PASS PARTIAL with mitigation |
| C | PARTIAL PARTIAL or unmitigated partial |
| D | any FAIL with non-install verdict |
| F | FAIL but still marked install/adopt |

### Native CC tier
| Letter | Threshold |
|---|---|
| A+ | official Claude-native plugin/skill plus native MCP |
| A | native Claude Code plugin/skill |
| B | native MCP |
| C | SDK/hook wrapper |
| D | CLI/indirect integration |
| F | app/meta-harness only, no native path, or phantom |

### Wired difficulty
| Letter | Threshold |
|---|---|
| A+ | 1/5 already installed and no new state |
| A | 1/5 one reversible command |
| B | 2/5 config/env only |
| C | 3/5 Docker or single local service |
| D | 4/5 DB/GPU/multi-service/migration |
| F | 5/5 unsafe, irreversible, license-blocked, or impossible |

### Token efficiency impact
| Letter | Threshold |
|---|---|
| A+ | ≥90% local measured reduction |
| A | 70-90% measured |
| B | 40-70% measured |
| C | 10-40% measured |
| D | claimed but not reproduced |
| F | negative impact or unsafe lossy behavior |

### Cross-platform compat
| Letter | Threshold |
|---|---|
| A+ | passes Windows/macOS/Linux CI plus local Z: smoke test |
| A | three OS documented |
| B | two OS or Windows with caveats |
| C | one OS only |
| D | known target-OS bug |
| F | target OS unsupported |

### Dependency footprint
| Letter | Threshold |
|---|---|
| A+ | no new deps or built-in primitive |
| A | ≤50MB and no daemon |
| B | 50-250MB or one runtime |
| C | 250MB-1GB or one Docker service |
| D | >1GB, GPU, native toolchain, or multi-service |
| F | unbuildable, opaque, or proprietary runtime |

### Security posture
| Letter | Threshold |
|---|---|
| A+ | signed releases/SBOM/security policy/clean OSV |
| A | security policy and clean advisories |
| B | clean advisories but unsigned |
| C | unknown posture or stale audit |
| D | active CVEs or no policy on high-risk code |
| F | malware, exposed secrets, or supply-chain compromise |

### Install reversibility
| Letter | Threshold |
|---|---|
| A+ | no install or one config line revert |
| A | one command uninstall |
| B | remove package plus config |
| C | manual env/Docker volume cleanup |
| D | DB migrations or multi-service teardown |
| F | irreversible, unsafe, or unknown |

## Phantom candidates flagged (4 — Wave 2 Mia probe required)

| Repo | Reason | Recommended next action |
|---|---|---|
| `lunary-ai/lunary` | search query returned "not exist or no permission" | `mcp__github__search_repositories` direct probe; if 404 → confirmed phantom |
| `braintrustdata/braintrust` | exact `repo:braintrustdata/braintrust` query failed | direct probe; may exist under different owner |
| `0xhimanshu/governor` | mentioned in Wave 250 §4 as AUDIT_REQUIRED; search failed | direct probe; likely phantom OR archived |
| `jia-gao/leanctx` | listed in Wave 250 §3 with axis-3 fail; PyPI exists (v0.3.1 MIT) but GitHub repo may be different owner | reconcile PyPI name vs GitHub owner |

## Pattern A fix-forward queue (per `codex-t1-fix-forward-pattern.md §Pattern A`)

1. ✅ **Persist this verdict** (DONE — this file)
2. **Apply 5 license corrections to Wave 250 catalog** (queued for Wave 2 synthesis):
   - L94 anthropics/skills: INSTALL-NOW (Δ1) → DEFER-HNF until license SPDX verified
   - L101 trailofbits/skills-curated: INSTALL-NOW (Δ1) → CITE-AS-REFERENCE (CC-BY-SA-4.0 not permissive)
   - L67 VikParuchuri/marker: STUDY-PILOT (Δ2) → REJECT-FOR-INSTALL (GPL-3.0)
   - L111 NeoLabHQ/context-engineering-kit: STUDY-PILOT (Δ2) → CITE-AS-REFERENCE (GPL-3.0)
   - L106 smtg-ai/claude-squad: MIT → AGPL-3.0 + Windows blocker
3. **Mia-probe 4 phantom candidates** before re-scoring
4. **Add D11 security_posture** to rubric; fold dependency_footprint + install_reversibility into D6 measurement enhanced
5. **Re-score all 60+ repos** with corrected licenses + new D11 dim in Wave 2

## Cross-model gate disclosure (Wave 251)

Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §Orchestrator integration discipline`:

- **Path P codex T1** dispatched as orchestrator-direct foreground+tee (NOT subagent stand-in)
- BRIDGE-MODE confirmed: REAL GPT-5.5 via codex CLI 0.130.0 subprocess
- Stand-in penetration: 0% (Path P bypasses CLAUDE_CODE_SUBAGENT_MODEL env entirely)
- Cross-model gate satisfaction: **FULL** (n=1 independent REAL GPT-5.5 verdict at conf=0.91)

VERDICT: NEEDS-REVISION conf=0.91 — apply 5 Pattern A fix-forwards + add D11 + Mia-probe 4 phantoms in Wave 2.
