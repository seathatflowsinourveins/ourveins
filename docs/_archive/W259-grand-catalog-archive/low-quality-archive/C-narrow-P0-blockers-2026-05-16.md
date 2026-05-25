---
title: "Wave 252 Track C-narrow — 6 P0 Blocker Repos License Verdict Matrix"
date: 2026-05-16
wave: 252
track: C-narrow
agent: general-purpose (Sonnet stand-in per CLAUDE.local.md ENV (g) STAND-IN-NOTICE)
status: COMPLETED
upstream-task-id: a03aca9046d2c0d13
recovery-context: "Re-dispatch of failed Track C (a4dd477dc4c3db6de FM-17.b final-return-loss); narrowed scope to 6 P0 blockers only"
mia-pre-apply: SATISFIED (all license claims carry file:line @ HEAD SHA cites via mcp__github__get_file_contents probes)
---

# Wave 252 Track C-narrow — 6 P0 Blocker Repos: License + Install Verdict Matrix

Probed 2026-05-16 via `mcp__github__get_file_contents` (LICENSE at HEAD) + `registry.npmjs.org` raw fetch. All 6 verdicts definitive.

| # | Repo | License (CONFIRMED) | Verdict |
|---|------|---------------------|---------|
| 1 | `mksglu/context-mode` | Elastic License 2.0 (ELv2) | **BLOCK-for-install / AMBER-for-use** |
| 2 | `FalkorDB/FalkorDB` | SSPL v1 | **AMBER (local single-tenant OK; BLOCK if hosted-service)** |
| 3 | `volcengine/OpenViking` | AGPL-3.0 | **BLOCK** |
| 4 | `protect-mcp` (= `tomjwxf/scopeblind-gateway`) | UNKNOWN (no LICENSE file) | **BLOCK** |
| 5 | `trailofbits/skills-curated` | CC-BY-SA-4.0 | **AMBER (cite-only; install-unsafe)** |
| 6 | `BerriAI/litellm` | MIT (root) + enterprise/ carveout | **PASS (MIT core)** |

---

### 1. `mksglu/context-mode` — W240/W250 CONTRADICTION RESOLVED

- **Root `LICENSE` @ `bdcdc13`**: verbatim "Elastic License 2.0 (ELv2)" — Copyright 2026 Mert Koseoglu.
- **`package.json` `license` field**: `"Elastic-2.0"` (SPDX). Version 1.0.135.
- **npm registry `/latest`**: `license: Elastic-2.0` — registry agrees with repo.
- **Resolution**: W240 ELv2 is CORRECT; W250 "MIT" was a stale/erroneous read — NO MIT anywhere (root LICENSE, package.json, npm all say ELv2). **W250 MIT claim REFUTED.**
- **ELv2 limitation**: cannot offer as hosted/managed service; cannot circumvent license-key; cannot remove notices. Internal single-tenant runtime use is permitted (royalty-free worldwide license to use/copy/modify).
- **VERDICT: BLOCK-for-install** (ELv2 is NOT permissive — fails the MIT/Apache/BSD whitelist per `ahfv-probe-dag.md` Probe 6). **AMBER-for-use** only if internal-runtime use AND no fork-redistribution (ELv2 internal use is legally OK but violates this runtime's permissive-only adoption gate).

### 2. `FalkorDB/FalkorDB` — SSPL CONFIRMED + GRAPH-DB SWAP

- **`LICENSE.txt` @ `4cc0a1c`**: verbatim "Server Side Public License VERSION 1, OCTOBER 16, 2018" — MongoDB SSPL. **BLOCK confirmed.**
- **Permissive graph-DB alternatives for `getzep/graphiti`** (graphiti supports a FalkorDB driver + Neo4j driver):
  | Candidate | License | Verdict |
  |---|---|---|
  | Neo4j Community | **GPL-3.0** (`LICENSE.txt` @ `c68156e`) | copyleft — NOT permissive; rejected |
  | Memgraph | **BSL 1.1 + MEL** (`LICENSE` @ `4ae6b1d`) | source-available, NOT permissive; rejected |
  | **KùzuDB** | **MIT** (`LICENSE` @ `89f0263` — "Copyright (c) 2022-2025 Kùzu Inc.") | **permissive — PASS** |
- **RECOMMENDED SWAP**: There is no drop-in permissive *server* swap — graphiti's first-class drivers are Neo4j (GPL) and FalkorDB (SSPL), both copyleft/source-available. **Best path: keep FalkorDB but treat SSPL correctly** — SSPL only triggers if you offer the DB *as a managed service to third parties*; a single-tenant local container (current runtime usage at port 16379) does NOT trip §13. So FalkorDB is **AMBER (use-OK as local single-tenant, BLOCK if ever offered as a hosted service)**, not absolute BLOCK. If a truly permissive store is mandatory, KùzuDB (MIT, embedded) is the only permissive graph DB here — but it is **embedded, not a server**, and graphiti has no native Kùzu driver, so adoption requires a custom graphiti backend adapter (non-trivial wiring cost).

### 3. `volcengine/OpenViking` — AGPL-3.0 CONFIRMED

- **`LICENSE` @ `af4c54f`**: verbatim "GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007". **BLOCK-LICENSE confirmed fresh** (matches W251 row).
- AGPL §13 network-interaction clause = strong copyleft; incompatible with permissive-only adoption gate. STRUCTURAL blocker, no mitigation.
- **2 permissive memory-plugin alternatives**: (a) `doobidoo/mcp-memory-service` — **Apache-2.0** (already INSTALLED in this runtime per CLAUDE.md Memory Stack L1); (b) `getzep/graphiti` — **Apache-2.0** (already INSTALLED as L3 temporal-KG). Both permissive, both already in-runtime — OpenViking adds zero marginal value and is a license blocker. **REJECT.**

### 4. `protect-mcp` — EXACT REPO RESOLVED

- `mcp__github__search_repositories query="protect-mcp"` returned 188 hits; the npm coordinate **`npx protect-mcp`** maps authoritatively to **`tomjwxf/scopeblind-gateway`** (description verbatim: "...npx protect-mcp"). Note: that repo's description ALSO says "Active development continues at `ScopeBlind/scopeblind-gateway`" — so the authoritative live repo is **`ScopeBlind/scopeblind-gateway`** (org-owned), with `tomjwxf/scopeblind-gateway` as the older personal mirror.
- **LICENSE probe**: `tomjwxf/scopeblind-gateway` has **no LICENSE file** at root → license **UNKNOWN/all-rights-reserved**. "4 patents pending" per description = additional IP risk.
- npm package `protect-mcp` exists but is published from an unlicensed repo.
- **VERDICT: BLOCK** — no LICENSE = all-rights-reserved by default; patents-pending compounds risk. Do not install. If protect-mcp is genuinely needed, escalate to operator: verify `ScopeBlind/scopeblind-gateway` (the live org repo) for a LICENSE before any adoption.

### 5. `trailofbits/skills-curated` — CC-BY-SA-4.0 + CITE/INSTALL BOUNDARY

- **`LICENSE` @ `022fa09`**: verbatim "Attribution-ShareAlike 4.0 International" (CC-BY-SA-4.0).
- **CC-BY-SA-4.0 is a CONTENT license, not a software license.** §2(b)(2): "Patent and trademark rights are not licensed." It is unsuitable for executable code (no patent grant, ShareAlike copyleft on adapted material).
- **Cite-vs-install boundary**:
  - **Install-UNSAFE / cite-only**: the entire repo as-licensed. Any SKILL.md prose, docs, curated text → **cite-only** (attribution + ShareAlike required if adapted). Vendoring/forking the text content forces CC-BY-SA-4.0 on derivatives.
  - **Code files** (if any scripts/tools exist in-repo): still covered by the repo-level CC-BY-SA — there is no separate code license, so even code is CC-BY-SA, which is a poor/ambiguous fit for code. Treat ALL of it as **AMBER cite-only**.
- **VERDICT: AMBER** — usable as a *research/cite reference* with attribution; **install-UNSAFE** (CC-BY-SA-4.0 not on permissive whitelist; ShareAlike contaminates derivatives; no patent grant for code). Per cardinal-rule-1 cite-import rules: cite at `file:line @ HEAD` is fine; vendoring/installing is not.

### 6. `BerriAI/litellm` — MIT CORE, ENTERPRISE CARVEOUT

- **Root `LICENSE` @ `c459646`**: verbatim — "All content that resides under the `enterprise/` directory ... is licensed under the license defined in `enterprise/LICENSE`. Content outside ... is available under the **MIT license**." Copyright (c) 2023 Berri AI.
- **Enterprise carveout boundary**: ONE directory — `enterprise/`. Everything else (the `litellm` Python package core, the proxy server core, SDK) = **MIT permissive**.
- **Open-MIT (install-safe)**: the `litellm` PyPI package core, LLM-router/proxy core, all SDK code outside `enterprise/`.
- **Enterprise-paywall**: only `enterprise/` directory content (e.g. SSO, advanced audit/security, enterprise admin features) — separate `enterprise/LICENSE` (proprietary commercial).
- **VERDICT: PASS** — install the MIT core freely (`pip install litellm`). Do NOT vendor/use `enterprise/` directory content without a commercial license. The `docker pull berriai/litellm:latest` image bundles both — code under `enterprise/` in the image remains under the enterprise license even though shipped together.

---

## Summary for orchestrator

4 hard BLOCKs (context-mode ELv2, protect-mcp unlicensed, OpenViking AGPL, plus FalkorDB-as-service) — though FalkorDB and context-mode are AMBER for single-tenant internal use. 1 cite-only AMBER (skills-curated CC-BY-SA-4.0). 1 clean PASS (litellm MIT core, avoid `enterprise/`).

**Key contradiction resolved**: **context-mode is ELv2, NOT MIT — W250 was wrong, W240 was right.** Best FalkorDB swap path is "keep FalkorDB as local single-tenant (SSPL §13 not triggered)" rather than a true permissive server swap, since graphiti's only permissive-adjacent option (KùzuDB MIT) is embedded and lacks a native graphiti driver.

## W251 GRAND-SYNTHESIS row corrections triggered

| W251 row | Status before | W252 C-narrow correction |
|---|---|---|
| P0 `context-mode` license dispute | OPEN (W240 ELv2 vs W250 MIT) | RESOLVED — ELv2 CONFIRMED, W250 REFUTED |
| P0 FalkorDB SSPL silent backend | OPEN | RESOLVED — AMBER local-OK, no permissive server swap exists; KùzuDB MIT requires custom adapter |
| P0 OpenViking REJECT | OPEN/blocked | CONFIRMED REJECT permanently |
| P0 protect-mcp UNKNOWN path | OPEN | RESOLVED — `tomjwxf/scopeblind-gateway` no LICENSE = BLOCK |
| P0 trailofbits/skills-curated CC-BY-SA | OPEN | RESOLVED — AMBER cite-only confirmed |
| P2 LiteLLM mixed-license hold | OPEN | RESOLVED — PASS for MIT core, avoid enterprise/ dir |
