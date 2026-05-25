# C-codex Bridge Adversarial Cross-Validation — W237/W250/W219 Catalogs

Date: 2026-05-16  
Target runtime: `Z:/claude-sota-pure`  
Verdict posture: adversarial; do not rubber-stamp the catalogs.

## Section 0 — BRIDGE-MODE Disclosure

[VERIFIED] This report was produced in the current Codex bridge session, not by spawning a nested `codex exec` subprocess. Command shapes used:

- `Get-Content ... | ForEach-Object { line:number }` to line-cite catalog and manifest files.
- `rg -n ...` for quick candidate extraction.
- `gh api repos/<owner>/<repo> --jq '{repo,stars,pushed_at,license,archived,default_branch}'` for live repo metadata.
- `gh api repos/<owner>/<repo>/license` with base64 decode of the returned `content` for actual LICENSE text spot checks.
- `gh api repos/<owner>/<repo>/contents/<path>` for marketplace/package/install-path artifact checks.
- `gh search repos 'topic:claude-code ...'`, `gh search repos 'topic:mcp-server ...'`, and `gh search repos 'topic:anthropic ...'` for hidden-gem discovery.
- `npm view <pkg> ...` was attempted for MCP entrypoint verification but hit local npm cache EPERM for many packages; treat those npm results as [UNKNOWN] except explicit E404 cases noted below.

Input status:

- [VERIFIED] W237 exists at `Z:/claude-sota-installed/tmp/wave237-CORRECTED-FINAL-SYNTHESIS-Pattern-A-fix-forward-2026-05-15.md` and declares 31 baseline ADOPT-NOW plus 3 conditional candidates at lines 33-40 and 189-194.
- [VERIFIED] The exact requested W250 short filenames are MISSING, but equivalent files exist under longer names: `wave250-A1-memory-rag-deep-2026-05-15.md`, `wave250-A2-orchestration-skills-2026-05-15.md`, and `wave250-A3-tokenopt-observability-ccpath-2026-05-15.md`.
- [VERIFIED] W219 glob matched `wave219-MASTER-SYNTHESIS-comprehensive-checklist-2026-05-15.md`; its Top-36 matrix is at lines 36-73.
- [VERIFIED] W208 checklist exists and discloses W208-A/B were zero-byte while W208-C was the only substantive return at lines 17-24 and no 2+ convergence could be claimed at lines 94-115.
- [VERIFIED] Pure manifest exists and shows a large PLANNED surface at lines 17-44, starter MCPs at lines 81-90, Anthropic-canonical MCPs at lines 93-103, CLI tools at lines 144-159, and many already INSTALLED W207 primitives at lines 170-218.

## Section 1 — Per-Axis Findings

### Axis 1 — Missed Candidates And Ceiling Challenge

[VERIFIED] The W237 ceiling is stated as 31 baseline + 3 conditional = 34 maximum at lines 189-194 and 223-225. [INFERRED] That ceiling is too low for 2026-Q2 because W237’s list is not a complete category taxonomy; it is a mixed install-order roster. W250 immediately adds or re-scores whole surfaces not in the W237 base roster: Anthropic native memory, thedotmack/claude-mem, mem0 pilot, supermemory, and vector MCP variants in A1 lines 51-147; orchestration marketplaces in A2 lines 75-167 and 169-228; token/observability stack in A3 lines 35-67 and 71-99.

[VERIFIED] At least 10 categories are underrepresented or missing as first-class categories in W237:

1. observability cost attribution beyond `ccusage`: W250 A3 includes `tokscale` and `ccusage` at lines 86-87 and recommends both at lines 95-97.
2. agent debug/tracing/OTel instrumentation: W250 A3 lists Phoenix, Langfuse, Logfire, Helicone, Opik, OpenLLMetry at lines 77-84.
3. prompt/eval red-team harnesses: W250 A3 promotes `promptfoo` at lines 84 and 91-95; W219 has promptfoo only as DEFER at line 64.
4. native Anthropic server-side context management: W250 A3’s five Anthropic-native primitives are lines 35-44; W237 has only indirect pins for token/code tools at lines 120-138.
5. native API memory tool: W250 A1 candidate 1 at lines 51-65; not in W237’s phase list except conditional memory-adjacent incumbents.
6. dedicated Claude Code memory plugins: W250 A1 promotes `thedotmack/claude-mem` at lines 137-147; absent from W237.
7. multi-tenant/RBAC/governance MCP policy: W237 lists protect-mcp at lines 112 and 143 but keeps source-audit pending; no full category coverage for authz, tenancy, signed receipts, or policy stores.
8. domain-specific vertical skills/plugins: W208 explicitly calls vertical Anthropic marketplaces for financial, healthcare, life-sciences, and knowledge-work STUDY-PILOT at lines 81-84; W237 does not categorize them.
9. specialized security-vetted skill marketplaces: W250 A2 recommends Trail of Bits at lines 225-228 and 280; W237 lacks it.
10. cross-runtime orchestration/federation: W250 A2 studies `ruflo` federation at lines 184-195; W237 mostly covers wshobson/Tom Farley governance items.

[INFERRED] A corrected ceiling should be 40-50 candidates if the goal is a 2026-Q2 adoption catalog, but only 25-35 should be default install candidates. The higher number belongs to catalog coverage, not default runtime mutation.

### Axis 2 — Staleness Check

[VERIFIED] Several W237 pins remain current: `wshobson/agents` W237 pin `112197c6` at line 120/117-119 matches live branch HEAD `112197c6...` via `gh api repos/wshobson/agents/commits/main`; `microsoft/acon` W237 line 126 matches live `d63f9ae...`; `ace-agent/ace` W237 line 128 matches live `4f679bef...`.

[VERIFIED] Some W237 version pins are stale or questionable versus live repository/package posture:

- W237 pins `mcp-memory-service` `10.51.3` at line 96; W250 A1 states `v10.57.3` at line 37 and live `gh api repos/doobidoo/mcp-memory-service` reports stars=1843, pushed_at=2026-05-15T20:35:10Z, license=Apache-2.0. Revalidate before pinning.
- W237 pins `graphiti-core` `0.29.0` at line 97; live `gh api repos/getzep/graphiti` reports stars=26106, pushed_at=2026-05-14T20:26:01Z, license=Apache-2.0. Version may still be acceptable, but HEAD is active.
- W237 pins `ripgrep` `14.1.1` at line 99 while pure manifest’s Wave-3 tooling says rg v15.1.0 at line 150. This is a direct target-manifest conflict.
- W237 pins `fd` `10.2.0` at line 100 while pure manifest says fd v10.4.2 at line 151.
- W237 pins `gh` `2.65.0` at line 107 while pure manifest says gh v2.92.0 at line 154.
- W237 pins `yq` `4.45.1` at line 109 while pure manifest says yq v4.53.2 at line 153.
- W237 pins `ast-grep` `0.42.0` at line 121 while pure manifest says ast-grep v0.42.2 at line 158.
- W237 pins `osv-scanner` `2.3.8` at line 124 while pure manifest installed `2.3.6` at line 211. This is either install drift or manifest lag.

[VERIFIED] Live metadata that requires revalidation before adoption:

| Candidate | W237 cite | Live gh output | Finding |
|---|---:|---|---|
| `protectai/llm-guard` | line 113 | stars=2954, pushed_at=2025-12-15T13:07:25Z, license=MIT | [VERIFIED] W237 already notes 5mo stale; still stale. |
| `microsoft/acon` | line 126 | stars=72, pushed_at=2025-10-14T08:12:20Z, license=MIT | [VERIFIED] Very low adoption; weak ADOPT-NOW. |
| `jia-gao/leanctx` | line 127 | stars=226, pushed_at=2026-05-04T04:14:46Z, license=MIT | [VERIFIED] young/low-star; W250 A3 rejects due LLMLingua-2 substrate at lines 54 and 67. |
| `ace-agent/ace` | line 128 | stars=1079, pushed_at=2026-04-21T23:26:06Z, license=Apache-2.0 | [VERIFIED] pin current but W237 itself labels STUDY-PILOT.b, not clean ADOPT-NOW. |
| `mksglu/context-mode` | W250 A3 line 49; pure manifest line 25 | live stars=14827, pushed_at=2026-05-15T14:24:31Z, root license NOASSERTION/ELv2 | [VERIFIED] license claim drift; see Axis 4. |

### Axis 3 — Convergence Challenges

[VERIFIED] W237 invokes STRONG-PROVENANCE-EXPRESS at lines 173-184 to promote Anthropic/GitHub official candidates. [INFERRED] This is acceptable only for official provenance, not for broad market convergence.

Weak convergence claims:

- [VERIFIED] W237 says W235-Y official-org maintainership is treated as T2-equivalent at lines 175-184. [INFERRED] That is not the same as 3 distinct downstream orgs. For `anthropics/claude-code-base-action` and `anthropics/claude-code-security-review`, official provenance is strong, but adoption convergence is not proven in the catalog lines.
- [VERIFIED] W250 A2 claims `anthropics/claude-plugins-official` Axis 1+2+3 PASS because "≥3 orgs use it; named-T2 = entire Anthropic team" at line 86. [INFERRED] The "entire Anthropic team" is not three distinct orgs and needs URLs or repo-dependent evidence.
- [VERIFIED] W250 A2 claims `obra/superpowers` triple-pass via Anthropic-official adopter + Codex official + Cursor adopter at line 101. [INFERRED] That may collapse into ecosystem compatibility rather than independent production adoption unless each adopter has dated 2026 URLs.
- [VERIFIED] W250 A2 claims `addyosmani/agent-skills` triple-pass via Google org + Anthropic-derivative adopters + 3 months burn-in at line 118. [INFERRED] "Anthropic-derivative adopters" is vague and should not count without named orgs and dated artifacts.
- [VERIFIED] W237’s F14 explicitly requires Ryan Snodgrass / cskwork / plugin-eval source-audits before Phase 4 install at lines 211-215. [INFERRED] Therefore W237 cannot treat the wshobson Top-3 as fully converged before F14 is closed.

### Axis 4 — License Re-Verify

[VERIFIED] Actual LICENSE-text probes found hard blockers or AMBER licenses:

| Repo | Catalog claim | Actual LICENSE probe | Disposition |
|---|---|---|---|
| `mksglu/context-mode` | W250 A3 says MIT via npm at line 49; pure manifest says Elastic-2.0 at line 25 | `gh api repos/mksglu/context-mode/license` path=`LICENSE`, spdx=NOASSERTION, text begins `Elastic License 2.0 (ELv2)` | [VERIFIED] W250 MIT claim is unsafe unless npm package is intentionally separately licensed; root repo is ELv2. |
| `Arize-ai/phoenix` | W250 A3 says server Elastic 2.0, MCP Apache at line 77 | `gh api repos/Arize-ai/phoenix/license` text begins `Elastic License 2.0 (ELv2)` | [VERIFIED] server adoption is license-AMBER; wrapper alone may be Apache. |
| `FalkorDB/FalkorDB` | W237 phase 1 installed at line 98 | `gh api repos/FalkorDB/FalkorDB/license` path=`LICENSE.txt`, text begins `Server Side Public License` | [VERIFIED] SSPL use-class acceptance required; do not silently default. |
| `volcengine/OpenViking` | W250 A1 rejects at lines 95-104 | `gh api repos/volcengine/OpenViking/license` text begins `GNU AFFERO GENERAL PUBLIC LICENSE` | [VERIFIED] W250 rejection is correct. |
| `Skyvern-AI/skyvern` | W219 rejects at lines 100-101 and W220 addendum line 227 | LICENSE is AGPL-3.0 | [VERIFIED] reject stands. |
| `mendableai/firecrawl` | W219 rejects at line 102 and W220 line 228 | LICENSE is AGPL-3.0 | [VERIFIED] reject stands. |
| `trufflesecurity/trufflehog` | W208 rejects at lines 63-70; W219 line 100 | LICENSE is AGPL-3.0 | [VERIFIED] reject stands. |
| `NeoLabHQ/context-engineering-kit` | W250 A2 study-pilot despite GPL at lines 199-210 | LICENSE is GPL-3.0 | [VERIFIED] install only with explicit GPL acceptance; cite-only safer. |
| `trailofbits/skills-curated` | W250 A2 install at lines 225-228/280 | LICENSE is CC-BY-SA-4.0 | [VERIFIED] not code-permissive MIT/Apache; install semantics need legal review. |
| `openai/skills` | W237 holds for unknown license at lines 183 and 206 | `gh api repos/openai/skills/license` failed; root contents show README only among license-like files | [VERIFIED] hold remains correct. |

### Axis 5 — Native Claude Code Path Verification

[VERIFIED] Marketplace path checks:

- `wshobson/agents/.claude-plugin/marketplace.json` exists, sha=`de21e812...`.
- `obra/superpowers/.claude-plugin/marketplace.json` exists, sha=`109bf72e...`.
- `addyosmani/agent-skills/.claude-plugin/marketplace.json` exists, sha=`9f153526...`.
- `EveryInc/compound-engineering-plugin/.claude-plugin/marketplace.json` exists, sha=`a74a8409...`.
- `trailofbits/skills-curated/.claude-plugin/marketplace.json` exists, sha=`50992172...`.
- `mksglu/context-mode/.claude-plugin/marketplace.json` exists, sha=`113b9729...`.
- `yamadashy/repomix/.claude-plugin/marketplace.json` exists, sha=`5b9b82e9...`.
- `thedotmack/claude-mem/.claude-plugin/marketplace.json` exists, sha=`ca4782e6...`.
- `ruvnet/ruflo/.claude-plugin/marketplace.json` exists, sha=`ab52d5a5...`.
- `gmickel/flow-next/.claude-plugin/marketplace.json` exists, sha=`cd19d1d0...`.
- `NeoLabHQ/context-engineering-kit/.claude-plugin/marketplace.json` exists, sha=`f1dae567...`.
- `chopratejas/headroom/.claude-plugin/marketplace.json` exists, sha=`d321c0a...`.

[VERIFIED] Phantom or weak install paths:

- `supermemoryai/supermemory/.claude-plugin/marketplace.json` does not exist via `gh api repos/supermemoryai/supermemory/contents/.claude-plugin/marketplace.json`; W250 A1 calls it Tier A marketplace plugin at lines 127-135. Treat as [REFUTED] until exact marketplace path is supplied.
- `TomFarley/protect-mcp` repository lookup failed via `gh api repos/TomFarley/protect-mcp`; W237 lines 112 and 143 use `protect-mcp` as ADOPT/phase candidate. [UNKNOWN] npm package may exist, but repo-cite is not verified.
- `@arizeai/phoenix-docs-mcp` returned npm E404 in this run; W250 A3 lists it at line 120. [REFUTED] package coordinate unless renamed.
- `logfire-mcp` returned npm E404 in this run; W250 A3 lists `logfire-mcp` at line 122. [REFUTED] package coordinate unless it is Python-only under another package name. `gh api repos/pydantic/logfire-mcp/contents/pyproject.toml` exists, sha=`7e1c9765...`, so the repo exists but npm coordinate is wrong.
- `@modelcontextprotocol/server-qdrant` returned npm E404; W219 already documents that as phantom at line 131. [VERIFIED] Use `uvx mcp-server-qdrant`.

[UNKNOWN] npm entrypoint verification for many packages was blocked by local npm cache EPERM, so this report does not certify bins for `@arizeai/phoenix-mcp`, `langfuse-mcp`, `@ccusage/mcp`, `promptfoo`, `context-mode`, `repomix`, `headroom`, or `protect-mcp`.

### Axis 6 — Pure-Runtime Fit

[VERIFIED] Pure manifest already PLANS many W250/W237 items: marketplaces at lines 21-26, plugin installs at lines 34-44, Anthropic skills at lines 61-63, starter MCPs at lines 85-90, canonical MCPs at lines 99-103, and CLI tools at lines 150-159. [INFERRED] Therefore a large part of W237/W250 is not NET-NEW for `claude-sota-pure`; it is target execution, version correction, or manifest cleanup.

Pure-fit challenges:

- [VERIFIED] W237 includes `graphiti` and `FalkorDB` at lines 97-98, but pure manifest already treats Graphiti as deferred initially at line 91 and later installs many memory/RAG packages at lines 178-185. [INFERRED] Keep Graphiti only if SSPL backend choice is explicitly accepted or alternative backend is chosen.
- [VERIFIED] W250 A2 recommends wshobson/agents install at lines 124-137 and 279; pure manifest already has wshobson marketplace PLANNED at lines 22 and plugin rows 38-39. [INFERRED] This is duplicate unless selecting new specific plugins not in manifest.
- [VERIFIED] W250 A3 recommends context-mode and repomix at lines 58-64; pure manifest already PLANS context-mode at line 40 and starter MCP repomix at line 89. [INFERRED] Need license acceptance and version correction, not new adoption.
- [VERIFIED] W250 A3 recommends ccusage at lines 95 and 113; W208 had already listed ccusage token telemetry MCP at lines 32 and 107. [INFERRED] Not net-new; confirm MCP package and statusline integration.
- [VERIFIED] W219 installed or planned multiple overlaps: mem0/ragas/chonkie/docling/gpt-researcher/lightrag/graphrag/tokencost at lines 178-185. [INFERRED] W250 A1’s mem0 and RAG rows should be benchmark pilots, not default installs.

### Axis 7 — Hidden Gems

[VERIFIED] `gh search repos 'topic:mcp-server stars:>=1000 pushed:>=2026-04-16' --sort stars --order desc --limit 20` returned several high-star active repos not fully represented as first-class candidates:

- `upstash/context7` stars=55389, pushed_at=2026-05-15T15:01:53Z. Pure manifest has hosted context7 starter at lines 85-86; W237 does not classify it as a major doc-context primitive.
- `github/github-mcp-server` stars=29867, pushed_at=2026-05-15T14:36:07Z. Pure manifest currently uses `@modelcontextprotocol/server-github` at line 87; compare official GitHub server as a superior alternative.
- `czlonkowski/n8n-mcp` stars=20903, pushed_at=2026-05-14T12:22:43Z. n8n license posture is problematic, but MCP server is a hidden integration candidate if operator accepts external service boundaries.
- `xpzouying/xiaohongshu-mcp` stars=13601, pushed_at=2026-05-15T04:46:51Z. Domain-specific MCP category missing; likely out-of-scope for pure default but proves vertical MCP coverage gap.
- `google-gemini/gemini-cli` stars=104071, pushed_at=2026-05-15T23:49:44Z. Cross-agent CLI is outside pure default, but catalog should explicitly classify as REJECT/DUPLICATE or bridge-tool.
- `ChromeDevTools/chrome-devtools-mcp` stars=39715, pushed_at=2026-05-15T16:00:30Z. W237 lists incumbent at line 137; should be elevated as browser-debug category.
- `oraios/serena` stars=24271, pushed_at=2026-05-14T21:54:25Z. W237 line 122 treats as incumbent; W250 A3 line 65 only STUDY-PILOT. It is a major code-intel primitive, not just token optimization.

[VERIFIED] `gh search repos 'topic:claude-code stars:>=1000 pushed:>=2026-04-16'` returned mostly noisy low-star results despite the query, but it did expose `stablyai/orca` stars=2553 pushed_at=2026-05-16T01:39:32Z and `Piebald-AI/tweakcc` stars=2016 pushed_at=2026-05-16T01:32:48Z. [UNKNOWN] Both need Probe 4/6/7 before any adoption.

## Section 2 — W237 ADOPT-NOW Drift Table

Rows needing re-validation before execution:

| W237 row/candidate | Catalog cite | Live evidence | Revalidation reason |
|---|---:|---|---|
| `mcp-memory-service` | line 96 | W250 A1 says v10.57.3 at line 37; live pushed 2026-05-15 | Pin likely stale (`10.51.3`). |
| `graphiti-core` | line 97 | live `getzep/graphiti` stars=26106, pushed_at=2026-05-14 | Active HEAD; verify latest package and backend. |
| `FalkorDB` | line 98 | LICENSE text = SSPL | License acceptance needed. |
| `ripgrep` | line 99 | pure manifest says v15.1.0 at line 150 | Version conflict. |
| `fd` | line 100 | pure manifest says v10.4.2 at line 151 | Version conflict. |
| `gh` | line 107 | pure manifest says v2.92.0 at line 154 | Version conflict. |
| `yq` | line 109 | pure manifest says v4.53.2 at line 153 | Version conflict. |
| `protect-mcp` | lines 112,143 | `gh api repos/TomFarley/protect-mcp` failed | Phantom/coordinate ambiguity. |
| `llm-guard` | line 113 | live pushed_at=2025-12-15 | Stale; scanner subset only. |
| `mksglu/context-mode` | W250 A3 line 49; pure manifest line 25 | root LICENSE ELv2 | W250 MIT claim contradicted by root license. |
| `microsoft/acon` | line 126 | stars=72, pushed_at=2025-10-14 | Too low-adoption for ADOPT-NOW without stronger demand. |
| `leanctx` | line 127 | W250 A3 rejects at lines 54 and 67 | Superseded by native Anthropic context stack. |
| `ace-agent/ace` | line 128 | W237 itself says STUDY-PILOT.b | Do not count in clean ADOPT-NOW. |
| `langfuse` | line 129 | root license says MIT except `ee/` | Needs compose pin + EE exclusion, not blanket MIT. |
| `mcp-server-langfuse` | line 131 | npm verification failed due local EPERM | Package/bin unresolved in this run. |
| `phoenix MCP` | line 132 | Phoenix root LICENSE ELv2; package path exists for phoenix-mcp | Server license AMBER; wrapper split must be documented. |
| `chrome-devtools-mcp` | line 137 | live stars=39715, pushed_at=2026-05-15 | Elevate category, verify exact package/version. |
| `elevenlabs-mcp` | line 138 | live pushed_at=2026-03-20 | SaaS/API-key service; verify demand and data boundary. |
| `ntfy-mcp` | line 141 | live `binwiederhier/ntfy` stars=30205, pushed_at=2026-05-13 | Need exact MCP package/source, not just ntfy server. |
| Anthropic/GitHub conditional trio | lines 181-184 | live stars: base-action=828, security-review=4613, gh-aw=4481 | Official provenance strong; adoption convergence not proven. |

## Section 3 — Missing-Candidate List

NET-NEW or underrepresented additions not cleanly covered by W237/W250 default list:

1. `github/github-mcp-server` — [VERIFIED] 29,867 stars, pushed 2026-05-15 via `gh search topic:mcp-server`; compare against `@modelcontextprotocol/server-github` in pure manifest line 87.
2. `upstash/context7` — [VERIFIED] 55,389 stars, pushed 2026-05-15; manifest has it at lines 85-86 but W237 underweights doc-context as category.
3. `thedotmack/claude-mem` — [VERIFIED] W250 A1 lines 137-147; marketplace exists; not in W237 base.
4. `chopratejas/headroom` — [VERIFIED] W250 A3 line 53; marketplace exists; needs license/package probe.
5. `junhoyeo/tokscale` — [VERIFIED] W250 A3 lines 86-87 and 97; missing as cost-tracking complement.
6. `Piebald-AI/tweakcc` — [UNKNOWN] hidden-gem search shows 2,016 stars, pushed 2026-05-16; needs full audit.
7. `stablyai/orca` — [UNKNOWN] hidden-gem search shows 2,553 stars, pushed 2026-05-16; needs full audit.
8. `github/gh-aw` — [VERIFIED] W237 conditional at line 184; should be a separate GitHub agentic-workflow category if adopted.
9. `trailofbits/skills-curated` — [VERIFIED] W250 A2 lines 225-228 and 280; license CC-BY-SA requires review but security-vetted skills category is missing.
10. `ChromeDevTools/chrome-devtools-mcp` — [VERIFIED] W237 line 137 lists incumbent, but search shows 39,715 stars; browser debug should be a top-level category.

## Section 4 — SUPERIOR-ALTERNATIVE List

| Existing row | Catalog cite | Better 2026 alternative | Rationale |
|---|---:|---|---|
| `microsoft/LLMLingua` / `leanctx` family | W250 A3 lines 54 and 67 | Anthropic native prompt caching + `clear_tool_uses` + `compact` + `clear_thinking` + `memory_20250818` | [VERIFIED] W250 A3 lines 35-44 explicitly supersede lossy compressors. |
| `@modelcontextprotocol/server-github` | pure manifest line 87 | `github/github-mcp-server` | [INFERRED] Official GitHub server is live/high-star; compare before locking old Anthropic package. |
| `FalkorDB` default backend for Graphiti | W237 line 98 | Neo4j/Kuzu/Postgres-backed or explicitly accepted backend | [VERIFIED] FalkorDB license is SSPL; pure runtime should avoid silent SSPL. |
| `mksglu/context-mode` as clean MIT plugin | W250 A3 line 49 | Keep only as ELv2-AMBER or prefer `repomix` + Anthropic native context stack | [VERIFIED] root license is ELv2; W250 MIT claim unsafe. |
| `protect-mcp` as ADOPT-NOW | W237 lines 112/143 | Hold for verified repo/package; consider GitHub OIDC/signed audit via official actions first | [VERIFIED] repo lookup failed; W237 itself requires source audit at lines 202 and 211-215. |
| `microsoft/acon` | W237 line 126 | `github/gh-aw` or wshobson/conductor for agent workflow | [VERIFIED] ACON has 72 stars and last push 2025-10-14; gh-aw has official GitHub provenance and 4,481 stars. |
| generic cost tracking via `ccusage` only | W237 line 130 | `ccusage` + `tokscale` + Langfuse trace cost attribution | [VERIFIED] W250 A3 lines 86-97 add cross-CLI and observability cost surfaces. |
| Phoenix as default observability server | W237 line 132 | Langfuse MIT-core + Phoenix MCP only if ELv2 accepted | [VERIFIED] Phoenix root license is ELv2; Langfuse root license text separates MIT core from `ee/`. |
| Anthropic official action candidates as ADOPT-NOW | W237 lines 181-184 | Treat as official cite/pilot until actual CI/CD demand exists | [VERIFIED] W237 itself says demand gate remains unresolved at lines 181-187. |
| Trail of Bits install | W250 A2 lines 225-228 | Cite/reference or selective import after CC-BY-SA review | [VERIFIED] root license CC-BY-SA-4.0; not a normal permissive plugin code license. |

## Section 5 — Adversarial VERDICT One-Line

VERDICT: NEEDS-REVISION — W237’s 31+3 ceiling is too narrow for catalog coverage but too loose for default install; multiple rows require license, version, convergence, and native-path revalidation before `claude-sota-pure` mutation, especially context-mode ELv2, FalkorDB SSPL, protect-mcp coordinate ambiguity, npm E404/MCP package drift, and weak "3 distinct orgs" convergence claims.
