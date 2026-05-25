---
title: "Wave 252 — License Resolution for 10 NOASSERTION/Probe-Needed Repos"
date: 2026-05-16
wave: 252
method: "mcp__github__get_file_contents path=LICENSE @ HEAD — verbatim root LICENSE read"
status: COMPLETED (9/10 resolved; anthropics/skills LICENSE not at root — probe-pending)
---

# Wave 252 — License Resolution

W252 §6 recommendation #2 (license-probe the NOASSERTION repos) executed here. GitHub's `license` API field returned `NOASSERTION` for several repos NOT because they lack a license, but because the LICENSE file carries a non-standard addendum (Commons Clause, trademark notice, MIT-core+EE-split) that defeats GitHub's auto-classifier. Verbatim root LICENSE reads resolve all but one.

| Repo | GitHub API said | ACTUAL (root LICENSE @ HEAD) | Class | Verdict change |
|---|---|---|---|---|
| `ryoppippi/ccusage` | NOASSERTION | **MIT** (verbatim "MIT License", Copyright 2025 ryoppippi) | **PASS** | Clean — INSTALL-TIER-A confirmed (no longer "license probe pending") |
| `rtk-ai/rtk` | (search-only) | **Apache-2.0** (root LICENSE verbatim "Apache License Version 2.0", Copyright 2024 rtk-ai and rtk-ai Labs) — ⚠ codex T1 trace believes MIT; DISCREPANCY, re-probe npm package metadata | **PASS (root)** | License clean BUT disposition = **INSTALL-PILOT (metric-gated)**, NOT Tier-A — per W252 codex T1 F-1: rtk issue #582 reports ~18% token cost INCREASE from PreToolUse hook in some configs; Windows native hook may not auto-rewrite. Promote to Tier-A only after measured local net savings |
| `eyaltoledano/claude-task-master` | NOASSERTION | **MIT + Commons Clause v1.0** | **AMBER** | Commons Clause forbids "Sell the Software" (hosting/consulting/support-for-fee where value derives substantially from the software). Internal single-tenant runtime use = OK; commercial resale = BLOCK. NOT OSI-permissive. Stays ADAPT-PATTERN/internal-use |
| `bmad-code-org/BMAD-METHOD` | NOASSERTION | **MIT** (+ trademark notice on "BMad™" name only — does NOT restrict code) | **PASS** | License clean — trademark notice restricts the *name*, not the code. CR-12 disposition stays ADAPT-PATTERN (method-cite) but no license blocker |
| `humanlayer/humanlayer` | NOASSERTION | **Apache-2.0** (verbatim, Copyright 2024 humanlayer Authors) | **PASS** | Clean — license not a blocker; staleness (push 2026-03-07) is the only flag |
| `langfuse/langfuse` | NOASSERTION | **MIT "Expat" core + `ee/` carveout** (ee/, web/src/ee/, worker/src/ee/ under separate ee/LICENSE) | **PASS (core)** | Same pattern as litellm. MIT core install-safe; avoid `ee/` directories. PILOT stands |
| `Yeachan-Heo/oh-my-claudecode` | (search-only) | **MIT** (verbatim, Copyright 2025 Yeachan Heo) | **PASS** | Clean — PILOT confirmed (license not a blocker) |
| `zilliztech/memsearch` | (search-only) | **MIT** (verbatim, Copyright 2025 Zilliz Inc.) | **PASS** | Clean — PILOT confirmed |
| `gsd-build/gsd-2` | (search-only) | **MIT** (verbatim, Copyright 2026 Lex Christopherson) | **PASS** | Clean — CITE-PATTERN/PILOT confirmed |
| `anthropics/skills` | (no `license` field) | **LICENSE not at repo root** — probe returned "path does not exist" | **PROBE-PENDING** | Anthropics official repo; likely per-skill or LICENSE.md. Re-probe `LICENSE.md` / `LICENSE.txt` / per-directory before whole-repo import. SELECTIVE-IMPORT disposition unaffected (import specific skills + verify each) |

## Net effect on W252 catalog

- **rtk-ai/rtk** — license PASS (root LICENSE Apache-2.0) BUT disposition is **INSTALL-PILOT (metric-gated)**, NOT Tier-A. W252 codex T1 adversarial review (F-1) caught the over-claim: rtk issue #582 reports a ~18% token cost INCREASE from the PreToolUse hook in some configs; the Windows native hook may not auto-rewrite. rtk's "60-90% reduction" is a marketing claim NOT verified for this runtime — promote to Tier-A only after measured local net savings (convergence-gate Row-2 fabrication-test discipline). Also: re-probe rtk license — codex trace believes MIT, conflicting with the root-LICENSE Apache-2.0 read.
- **ccusage** confirmed clean MIT — INSTALL-TIER-A unconditional.
- **claude-task-master** is the only genuine AMBER — Commons Clause. Use the *pattern* (task decomposition), do not vendor for any runtime that might be commercially redistributed. Internal-use OK.
- **BMAD / humanlayer / oh-my-claudecode / memsearch / gsd-2 / langfuse-core** all PASS — license is not a blocker for any; their Tier-B/pilot/cite dispositions are driven by CR-12 disposition class (DUPLICATE/PARTIAL-OVERLAP) + staleness, not license.
- **anthropics/skills** — selective-import only; re-probe LICENSE location in W253.

**Permissive-license clean count**: of 10 probed, **8 PASS**, 1 AMBER (Commons Clause), 1 probe-pending. The Tier-A roster is license-clean.
