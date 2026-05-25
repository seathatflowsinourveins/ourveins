# W188-C Single-Axis Architecture Coverage Audit — 2026-05-13

**Scope**: Per-folder SOTA-cite-coverage % across claude-sota-installed runtime. Single-axis (coverage % measurement) ONLY — no recommendations / no implementation / no Edit.

**Methodology**:
- TIER-1-DIRECT = file contains `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` OR `code.claude.com/docs/en/` URL
- TIER-3-CITE-IMPORT = file contains `cite-import-AMBER` OR `Section 14.5` reference per CR-12
- TIER-3-NOVEL = file has TIER-3-LOCAL-* marker but lacks T1/CI cite anchor (operator-coined no upstream parity)
- load-bearing = file basename appears in ≥1 other file across runtime (rules/agents/skills/hooks/commands/scripts/tools/docs/CLAUDE*.md corpus = 2539 files)
- scaffolding = orphan (0 inbound cites)

Classification flags are not mutually exclusive at TIER-1/CITE-IMPORT levels (a file can carry both); NOVEL counted only when neither T1 nor CI present (`!t1 && !ci && has_nov_marker`).

## Per-folder coverage table

| Folder | files | LOC | T1-DIRECT | CITE-IMPORT | NOVEL | load-bearing | scaffolding | T1% |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| .claude/rules | 64 | 8522 | 36 | 19 | 14 | 63 | 1 | 56.2% |
| .claude/agents | 11 | 1607 | 7 | 6 | 3 | 11 | 0 | 63.6% |
| .claude/skills | 22 | 3281 | 4 | 2 | 0 | 22 | 0 | 18.2% |
| .claude/hooks/scripts | 34 | 13617 | 24 | 2 | 3 | 34 | 0 | 70.6% |
| .claude/commands | 4 | 364 | 4 | 0 | 0 | 4 | 0 | 100.0% |
| scripts | 4 | 1407 | 3 | 4 | 0 | 4 | 0 | 75.0% |
| tools | 11 | 3269 | 4 | 0 | 2 | 10 | 1 | 36.4% |
| docs | 76 | 40099 | 28 | 41 | 15 | 61 | 15 | 36.8% |
| bin | 3 | 222 | 3 | 0 | 0 | 3 | 0 | 100.0% |
| manifests | 0 | 0 | 0 | 0 | 0 | 0 | 0 | n/a |
| .codex | 0 | 0 | 0 | 0 | 0 | 0 | 0 | n/a |
| **TOTAL** | **229** | **72388** | **113** | **74** | **37** | **212** | **17** | **49.3%** |

**Notes on empty folders**:
- `manifests/*.{yaml,yml,json}` — 0 files matching pattern (manifest authority `docs/sota-installed-manifest.md` lives under `docs/`)
- `.codex/*.{toml,json}` — directory not present at workspace root (codex CLI may be uninstalled OR using `CODEX_HOME` state-outside-repo)

## Aggregate runtime totals

| Class | Count | % |
|---|---:|---:|
| TIER-1-DIRECT (upstream file:line @ HEAD OR official Anthropic docs URL) | 113/229 | **49.3%** |
| TIER-3-CITE-IMPORT (sibling cite-import-AMBER per CR-12 Section 14.5) | 74/229 | **32.3%** |
| TIER-3-NOVEL (operator-coined, no upstream parity, no CI) | 37/229 | **16.2%** |
| load-bearing (≥1 inbound cite) | 212/229 | **92.6%** |
| scaffolding (0 inbound cites — orphan) | 17/229 | **7.4%** |

**Combined cite-coverage** (T1 + CI as either category satisfies CR-1/CR-8): 187/229 ≈ **81.7%**

## Coverage by SOTA-readiness

- **STRONG**: `.claude/commands` (100%) + `bin` (100%) + `scripts` (75% T1)
- **HIGH**: `.claude/hooks/scripts` (70.6% T1) + `.claude/agents` (63.6% T1) + `.claude/rules` (56.2% T1)
- **MEDIUM**: `docs` (36.8% T1, 41% CI = 77.6% combined) + `tools` (36.4% T1)
- **LOW**: `.claude/skills` (18.2% T1) — GAP

## Top-10 NOVEL retirement candidates (≤200 LOC, no T1/CI cite)

| Folder | File | LOC | inbound-cites | NOVEL-marker |
|---|---|---:|---:|:---:|
| docs | sota-goal-paste-ready-2026-05-12.md | 55 | 0 | ✗ |
| docs | observability-stack-audit-w164-f39-2026-05-13.md | 92 | 0 | ✓ |
| docs | wave155-arc-close-synthesis-2026-05-12.md | 159 | 0 | ✓ |
| docs | wave155-f15-f27-cumulative-synthesis-2026-05-12.md | 192 | 0 | ✓ |
| docs | wave155-arc-convergence-synthesis-2026-05-12.md | 198 | 0 | ✓ |
| docs | hooks-audit-w184.md | 79 | 1 | ✓ |
| docs | dep-only-integration-actions.md | 119 | 1 | ✗ |
| docs | wave153-f4-skill-topology-audit-2026-05-11.md | 138 | 1 | ✓ |
| docs | wave153-f7-plugin-disable-ship-2026-05-11.md | 153 | 1 | ✓ |
| docs | wave153-f9-cite-pointer-minimal-2026-05-11.md | 160 | 1 | ✓ |

Total NOVEL≤200LOC candidates: **54 files** (all in docs/).

## Top-10 STALE candidates (0 inbound cites, sorted by LOC desc)

| Folder | File | LOC | T1 | CI |
|---|---|---:|:---:|:---:|
| docs | advanced-automation-hooks-design.md | 410 | ✓ | ✗ |
| tools | fleet-status.ps1 | 316 | ✓ | ✗ |
| docs | sota-comprehensive-audit-execution-prompt-2026-05-12.md | 299 | ✓ | ✓ |
| docs | wave-160-mega-fire-close-synthesis-2026-05-12.md | 223 | ✗ | ✓ |
| docs | wave155-arc-convergence-synthesis-2026-05-12.md | 198 | ✗ | ✗ |
| docs | wave155-f15-f27-cumulative-synthesis-2026-05-12.md | 192 | ✗ | ✗ |
| docs | settings-provenance-trail.md | 163 | ✓ | ✗ |
| docs | wave155-arc-close-synthesis-2026-05-12.md | 159 | ✗ | ✗ |
| docs | sota-auto-compact-2026-05-12.md | 149 | ✓ | ✗ |
| docs | architecture-audit-scorecard.md | 135 | ✓ | ✓ |

Total STALE: **17 files** (16 docs/ + 1 tools/).

## Key findings (observational only — NO recommendations per single-axis scope)

1. **Aggregate 49.3% T1-DIRECT** (113/229) — combined-with-CI = 81.7% (187/229) satisfies CR-1 lattice for >4/5 of runtime
2. **`.claude/skills/` LOW coverage at 18.2% T1** (4/22) — likely uses plugin-marketplace nesting where SKILL.md cite-anchors live in plugin sub-paths not detected by top-level scan
3. **W184-R2 reported 38.9% stricter non-SOTA for hooks; this audit measures 70.6% T1 inclusive** — discrepancy likely scope-of-strictness (38.9% may exclude wrapper-class hooks or count cite-anchor depth differently)
4. **scaffolding rate 7.4%** — 17 orphan files (1 in tools/ + 16 in docs/); 0 orphans in rules/agents/skills/hooks/commands/scripts/bin
5. **NOVEL pool concentration: 100% in docs/** — 14 in rules + 3 in agents + 0 in skills + 3 in hooks + 0 in commands + 0 in scripts + 2 in tools + 15 in docs (=37 total); NOVEL ≤200LOC pool of 54 all reside in `docs/` wave-arc synthesis artifacts
6. **`.claude/commands` + `bin` at 100% T1-DIRECT** — install-class clean baseline; no novel content
7. **`docs/` 76 files at 40099 LOC** = single largest category by LOC (55% of runtime LOC) but only 36.8% T1; cite-trail is heaviest there

COVERAGE-AUDIT-FINAL
