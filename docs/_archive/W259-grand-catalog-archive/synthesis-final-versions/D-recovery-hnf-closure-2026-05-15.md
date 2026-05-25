# Wave 253 Agent D — Browser/Sandbox/CICD/OTel Recovery + HNF Closure

**Agent**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV — STAND-IN-NOTICE: cross-model gate NOT structurally satisfied for this dispatch; verdict is Sonnet stand-in. Orchestrator must route adoption-class verdicts through codex T1 per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`).
**Recovers**: Wave 252 Agent B FM-17.b autocompact-thrash failure (4 axes: Browser-MCP / sandboxing / CI/CD / OTel).
**Date**: 2026-05-16. **Target runtime**: `Z:/claude-sota-pure/` (GSD-framework runtime — NOT bootstrap-only; see §2).
**Persisted by**: orchestrator (Wave 254 continuation arc, 2026-05-15) per FM-19 ARTIFACT-INLINE.

---

## §1 License probe table (closes Agent C HNF#1)

15 candidates probed via `gh api repos/<repo>/license --jq '.license.spdx_id'` 2026-05-16. **ALL 15 PASS permissive whitelist (MIT/Apache-2.0/BSD).** Zero REJECT.

| Repo | License | Verdict |
|---|---|---|
| abhisekjha/pith | MIT | PASS |
| 0xhimanshu/governor | MIT | PASS |
| claudioemmanuel/squeez | Apache-2.0 | PASS |
| jeongwookie/WhereMyTokens | MIT | PASS |
| luongnv89/context-stats | MIT | PASS |
| fynnfluegge/agtx | Apache-2.0 | PASS |
| nutthouse/tutti | MIT | PASS |
| the911fund/skill-of-skills | MIT | PASS |
| chopratejas/headroom | Apache-2.0 | PASS |
| iamtouchskyer/memex | MIT | PASS |
| VectifyAI/PageIndex | MIT | PASS |
| yichuan-w/LEANN | MIT | PASS |
| angelnicolasc/graymatter | MIT | PASS |
| mathomhaus/guild | Apache-2.0 | PASS |
| thedotmack/claude-mem | Apache-2.0 | PASS |

**Disposition**: license axis no longer blocks any of the 15. Probe DAG 1-5 + 7 (count-OVER / SDK-CLI / arch-API / plugin-namespace / mode-harness / demand-gate) still required per `ahfv-probe-dag.md` before any INSTALL verdict — license PASS != adoption PASS. CR-9 install-risk still applies.

---

## §2 TARGET-runtime inventory — `Z:/claude-sota-pure/` (closes Agent C HNF#3)

**CRITICAL FINDING — pure-runtime is NOT bootstrap-only.** It is a HEAVILY-built **GSD (`get-shit-done`) framework runtime** at Wave W229 (manifest §13). Probed via `ls`/`cat`/`git log` 2026-05-16. The grand synthesis MUST NOT re-install anything below — re-install = CR-5 install-priority violation + `kiss-dry-yagni` Must-Never #4 duplicate.

### ALREADY-INSTALLED inventory by layer

| Layer | Installed primitives | Cite |
|---|---|---|
| **L0 foundation** | `claude.exe` 218MB native (CC 2.1.142) + `sops.exe` 50MB | `Z:/claude-sota-pure/.local/bin/` |
| **L1 memory** | `mcp-memory-server` (sqlite_vec backend at `Z:/claude-sota-pure-state/.mcp-memory/memory.db`) | `.mcp.json` |
| **L2 RAG/vector** | hnswlib 0.8.0 + qdrant-client 1.17.0 + chonkie 1.5.4 + lancedb 0.26.1 + FlagEmbedding 1.4.0 + sentence-transformers 5.2.3 (pip) | PROGRESS W217/W225 |
| **L3 doc-AI** | docling 2.70.0 (IBM) + markitdown 0.0.2 (MS) | PROGRESS W225 |
| **L4 code-intel** | `gitnexus` MCP + `serena` MCP (uvx oraios/serena ide-assistant) + `repomix` MCP | `.mcp.json` |
| **L5 orchestration** | 34 GSD agents (`gsd-*.md`) + 71 GSD skills (`gsd-*/`) + `agent-teams@claude-code-workflows` + `agent-orchestration@claude-code-workflows` + `compound-engineering@compound-engineering-plugin` (3.8.2) | `.claude/{agents,skills}/` + installed_plugins.json |
| **L6 spec/TDD/review** | `tdd-workflows` + `comprehensive-review` + `code-review` + `pr-review-toolkit` + `debugging-toolkit` plugins | installed_plugins.json |
| **L7 observability** | `ccusage` MCP + langfuse SDK (W214 — Py 3.14 BLOCKED) + openinference (Apache swap, W211) + `garak` 0.15.0 (NVIDIA red-team, W220) | PROGRESS + `.mcp.json` |
| **L8 context/compact** | `intelligent-compact@claude-settings` + `context-mode@context-mode` (1.0.134) + `context-management@claude-code-workflows` + ECC pre-compact | installed_plugins.json |
| **L9 browser** | `chrome-devtools-mcp@latest` + `@playwright/mcp@latest` (BOTH wired in `.mcp.json`) | `.mcp.json` |
| **L9 sandbox** | 5 cwc hooks: `commit-on-stop.sh` / `kill-switch.sh` / `steer.sh` / `track-read.sh` / `verify-gate.sh` | `.claude/hooks/scripts/` |
| **L10 long-running** | `ralph-loop@claude-plugins-official` + `agent-sdk-dev` + cwc 5-primitive direct-clone at `.local/cwc/` (HEAD `ad107a974` — see GAP-1) | installed_plugins.json |
| **L11 security** | `security-guidance@claude-plugins-official` + `codeshield` 1.0.1 (Meta) + `garak` + `syft` 1.44.0 SBOM | PROGRESS W220/W217 |
| **MCP layer** | 16 MCP servers: memory / github / context7 / deepwiki / repomix / git / fetch / time / sequentialthinking / filesystem / gitnexus / chrome-devtools / playwright / serena / ccusage | `.mcp.json` |
| **Plugins** | 26 plugins across 10 marketplaces | installed_plugins.json |

### GAPS (genuinely empty / drift)

- **GAP-1 — cwc HEAD drift**: clone at `.local/cwc/` HEAD = `ad107a974bced5244f74dd283dbf2bfd3baee3a1` (committer date 2026-05-13) — AHEAD of manifest §1B cite `ffd563d668a97a38d4aa092bf0d5b1507c046629`. Manifest cite is STALE by N commits. Recommend refresh-cite in next manifest fix-forward (Pattern A; per `port-note-discipline.md §5` SHA-DRIFT class — non-blocking).
- **GAP-2 — no L7 OTel collector/exporter wired**: langfuse SDK installed but BLOCKED (Py 3.14 pydantic-v1). No active OTel collector. See §4.
- **GAP-3 — no CI/CD layer**: `.github/workflows/` does NOT exist (probe returned empty). See §6.
- **GAP-4 — no statusline plugin** (claudia-statusline deferred per PROGRESS W209 "Next" #11).
- **GAP-5 — no graphiti/temporal-KG wired**: PROGRESS "Next" #6 lists graphiti Docker install as PLANNED (Phase D — gated on FalkorDB SSPLv1-vs-Neo4j decision); NOT yet installed.

---

## §3 Browser-MCP ecosystem deep audit (recovers Agent B Axis 1)

7 candidates probed via `gh api repos/<repo>` (stars/license/pushed/created) 2026-05-16.

| Candidate | Stars | License | Created | Probe DAG verdict |
|---|---|---|---|---|
| **ChromeDevTools/chrome-devtools-mcp** | 39,719 | Apache-2.0 | 2025-09-11 | **ALREADY-INSTALLED** (`.mcp.json:chrome-devtools`). Probe 4 plugin-namespace FAIL-as-DUPLICATE if re-proposed. Official Google Chrome DevTools team. Axis-3 age 247d STABLE-BURN-IN. |
| **microsoft/playwright-mcp** | 32,564 | Apache-2.0 | 2025-03-21 | **ALREADY-INSTALLED** (`.mcp.json:playwright` = `@playwright/mcp`). Probe 4 DUPLICATE if re-proposed. Microsoft official. Axis-3 age 420d STABLE-BURN-IN. |
| **browser-use/browser-use** | 94,090 | MIT | 2024-10-31 | **STUDY-PILOT** — Python agent-browser library (NOT an MCP server natively). Probe 2 SDK-vs-CLI: it's a Python SDK, needs adapter to expose as MCP. Probe 7.a DEMAND: pure-runtime already has playwright+chrome-devtools MCPs covering browser-automation workflow — browser-use adds agent-level autonomy but NO current GSD workflow routes through it. REJECT-FOR-FIT.a unless a named agent-browser workflow surfaces. |
| **wxtsky/byob** | 121 | MIT | 2026-04-25 | **REJECT** — Axis-3 FAIL (age 21d, far below 90d burn-in). 121 stars is launch-spike territory. Single-author, no convergence. Re-audit after +90d. |
| **executeautomation/mcp-playwright** | 5,514 | MIT | 2024-12-03 | **REJECT-as-DUPLICATE** — third-party Playwright MCP; `microsoft/playwright-mcp` (official, already installed) supersedes. Probe 4 plugin-namespace + Probe 5 SUPERSEDED-BY-X. |
| **apify/actors-mcp-server** | 1,223 | MIT | 2025-01-02 | **STUDY-PILOT** — Apify Actors MCP (hosted scraping platform). Probe 7.b candidate ONLY if pure-runtime needs hosted-scraper workflow (none identified today). Vendor-platform dependency (Apify cloud account). Not a local primitive. DEFER. |
| **axe a11y MCP** (JustasMonkev/mcp-accessibility-scanner 48 / priyankark/a11y-mcp 43 / dequelabs/axe-mcp-server-public 4) | <50 all | mixed | 2026 | **REJECT** — all sub-50 stars, Axis-1 single-org each, Axis-3 likely-young. dequelabs official one has NOASSERTION license (REJECT). a11y-MCP layer is immature; no convergence. |

### §3 SOTA top-pick for pure-runtime L9 browser

**NO NEW INSTALL NEEDED.** Pure-runtime L9 browser layer is **ALREADY SATURATED** — `chrome-devtools-mcp` (39.7k) + `@playwright/mcp` (32.5k), both Apache-2.0, both official-org (Google + Microsoft), both STABLE-BURN-IN. This is the SOTA pairing. Verdict: **L9 browser layer COMPLETE — no candidate beats the incumbents.** browser-use (94k) is the only one with marginal value (agent-level browsing autonomy) but is a Python SDK not an MCP and fails Probe 7.a demand-gate. **HONEST-NON-FINDING for "new browser-MCP to install"** — incumbents win.

---

## §4 OTel gen-ai SemConv 2026-04+ (recovers Agent B Axis 4)

**KEY FINDING — OTel GenAI SemConv MOVED to a NEW repo.** `open-telemetry/semantic-conventions` `docs/gen-ai/gen-ai-agent-spans.md @ 317b57ad` verbatim: *"GenAI semantic conventions have moved to the OpenTelemetry GenAI semantic conventions repository. This page has moved and is no longer maintained in this repository."*

- **New repo**: `open-telemetry/semantic-conventions-genai` @ HEAD `494d44d5bcc915fe44c1f13184a12609d33cb8cc` — Apache-2.0, **39 stars, created 2026-05-05 (age 11d), 1 release** [VERIFIED 2026-05-16 via `gh api`].
- **CHANGELOG `@ 6f27b098` Unreleased section** (2026-05 active spec): adds `gen_ai.workflow.duration` metric (PR #126), `plan` operation for agent planning/task-decomposition spans (PR #97), `gen_ai.agent.name` sampling-relevance on `create_agent`/`invoke_agent` spans (PR #107). This is the live 2026-05 GenAI agent-span spec.
- **Axis-3 verdict**: the NEW repo FAILS convergence-gate Axis-3 (age 11d far below 90d burn-in). It is an org-migration not a fresh-paint repo, so the spec CONTENT is mature — but the repo is too young to cite as a STABLE source. **Cite the spec content via `open-telemetry/semantic-conventions-genai/CHANGELOG.md @ 494d44d5` as `[INFERRED-MIGRATION]`, NOT as a STABLE Axis-3 PASS.**

### Observability stack probe

| Stack | Stars | License | OTel-compat verdict |
|---|---|---|---|
| **comet-ml/opik** | 19,307 | **Apache-2.0** | **INSTALL-NOW top-pick** — permissive, OTel-native, named-org (Comet ML). Already W211-relevant (openinference Apache swap done). |
| traceloop/openllmetry | 7,112 | Apache-2.0 | **STUDY-PILOT #2** — OTel-native SDK, permissive, the canonical gen-ai-OTel auto-instrumentation lib. |
| Arize-ai/phoenix | 9,694 | **NOASSERTION** (ELv2 per prior W210 §9) | **REJECT** — Elastic-2.0 non-permissive (confirmed W210/W211 — openinference is the Apache swap; phoenix-core itself stays REJECT). |
| langfuse/langfuse | 27,283 | **NOASSERTION** (MIT-core + commercial EE) | **STUDY-PILOT-W-CAVEAT** — already W214-installed-but-BLOCKED (Py 3.14 pydantic-v1). License is MIT-core but mixed; pure-runtime already has the SDK partially in. |

### §4 SOTA top-2 for pure-runtime L7 observability

1. **comet-ml/opik (Apache-2.0, 19.3k)** — primary OTel-aligned observability stack. Permissive, OTel-native, aligns with 2026-05 SemConv-genai.
2. **traceloop/openllmetry (Apache-2.0, 7.1k)** — auto-instrumentation SDK; the canonical lib emitting OTel gen-ai spans per the new SemConv-genai spec. Pairs with opik as backend.

**Disposition**: pure-runtime L7 GAP-2 (no OTel collector) should be closed via opik + openllmetry — BOTH Apache-2.0, BOTH OTel-native. Avoid Phoenix (ELv2). Re-audit when SemConv-genai repo crosses 90d (~2026-08-03) for firm Axis-3.

---

## §5 Anthropic 2026-04 sandboxing — confirm (recovers Agent B Axis 2)

- **CC sandboxing docs page**: WebFetch BLOCKED by context-mode interceptor (env policy) — could not directly fetch `https://code.claude.com/docs/en/sandboxing`. Indirect evidence below.
- **cwc clone**: `.local/cwc/` HEAD `ad107a974` (2026-05-13) — AHEAD of cite `ffd563d6` (GAP-1). cwc README mentions "sandbox" exactly ONCE, verbatim: *"Hosted runtime — Anthropic hosts the loop, sandbox, and scheduling so you don't run any of this yourself — Claude Managed Agents."* No local sandbox primitive in cwc — cwc's sandbox = Anthropic-HOSTED Managed Agents (not a self-hostable primitive).
- **Agent-sandbox ecosystem (gh search `agent sandbox isolation claude`)**: `agentic-dev3o/sandbox-shell` 22 stars MIT (Jan 2026, immature) / `brooksomics/llm-rustyolo` 7 stars NOASSERTION (REJECT-license) / `us/den` 7 stars AGPL-3.0 (REJECT-license). `OpenCoworkAI/open-cowork` 1,329 stars MIT exists but is a full coworking platform, not a sandbox primitive.

### §5 verdict for pure-runtime L9 sandbox sub-layer

**CONFIRM Agent A finding — sandboxing ecosystem is THIN.** No INSTALL-NOW sandbox primitive exists:
- The self-hostable sandbox candidates are all <25 stars, single-author, OR non-permissive (AGPL/NOASSERTION) — all **REJECT** (Probe 6 license + Axis-3 fail).
- Anthropic's sandbox = HOSTED Managed Agents (not a local install primitive).
- **Pure-runtime already has the cwc 5-hook primitive (`kill-switch.sh` / `verify-gate.sh` / `track-read.sh` / `steer.sh` / `commit-on-stop.sh`)** which IS the SOTA self-hostable "guardrail" layer — NOT OS-level sandboxing but the documented Anthropic long-running-agent guardrail set.
- **HONEST-NON-FINDING for "new sandbox primitive to install"** — no SOTA self-hostable OS-sandbox exists; cwc hooks are the incumbent guardrail layer and remain the SOTA pick.

---

## §6 CI/CD demand-gate (recovers Agent B Axis 3)

- **TARGET-runtime probe**: `find Z:/claude-sota-pure/.github -type f` returned **EMPTY** — `.github/workflows/` does NOT exist in pure-runtime.
- **GSD framework**: pure-runtime IS a GSD (`get-shit-done`) framework runtime — GSD has `gsd-pr-branch` skill + `gsd-ship` skill, but NO GitHub Actions CI workflow surface.
- **No CI/CD demand surface**: pure-runtime is an agent-harness install runtime, not a software project with a build/test/deploy pipeline.

### §6 verdict

**CONFIRM Probe 7.a REJECT-DEMAND-ABSENCE** per `ahfv-probe-dag.md §Probe 7.a`. No CI/CD workflow exists in `Z:/claude-sota-pure` and none is queued. **REJECT-FOR-FIT.a (demand-absence)** — REJECT-decisive. Re-evaluate ONLY if pure-runtime grows a `.github/workflows/` dir or a software-project build surface.

---

## §7 HONEST-NON-FINDINGS

1. **HNF-1 — no new browser-MCP to install** (§3): `chrome-devtools-mcp` + `@playwright/mcp` already installed; both are the SOTA pair. L9 browser layer COMPLETE.
2. **HNF-2 — no new sandbox primitive to install** (§5): self-hostable OS-sandbox ecosystem is all <25 stars / non-permissive / immature. cwc 5-hook guardrail set is the incumbent SOTA. Anthropic sandbox = hosted-only.
3. **HNF-3 — CI/CD REJECT-demand-absence** (§6): no `.github/workflows/` in pure-runtime, no build/test/deploy pipeline → Probe 7.a REJECT-decisive.
4. **HNF-4 — OTel SemConv repo too young for Axis-3** (§4): `semantic-conventions-genai` is 11d old — spec content mature (org-migration) but repo cannot be cited as STABLE; mark cite `[INFERRED-MIGRATION]`.
5. **HNF-5 — cwc cite drift, non-blocking** (GAP-1): manifest cwc cite `ffd563d6` is stale vs clone HEAD `ad107a974`; SHA-DRIFT class.
6. **HNF-6 — license axis fully cleared** (§1): all 15 UNKNOWN-license candidates PASS permissive — license no longer a blocker; Probe DAG 1-7 still required before INSTALL verdict.

---

## §8 Disposition summary for grand synthesis

| Layer | Verdict | Action |
|---|---|---|
| L9 browser | **SATURATED** | No install — incumbents (chrome-devtools-mcp + playwright-mcp) win |
| L9 sandbox | **HONEST-NON-FINDING** | No install — cwc hooks are incumbent SOTA |
| L7 observability | **GAP-2 OPEN** | INSTALL opik (Apache-2.0) + openllmetry (Apache-2.0); REJECT Phoenix (ELv2) |
| CI/CD | **REJECT-demand-absence** | No install — Probe 7.a decisive |
| 15 license-UNKNOWN repos | **license PASS** | Probe DAG 1-7 still gates INSTALL — not auto-adopt |
| cwc cite | **SHA-DRIFT** | Manifest §1B fix-forward: `ffd563d6` -> `ad107a974` |

**Net new installs recommended for pure-runtime: 2** (opik + openllmetry, both Apache-2.0, L7 observability GAP-2 closure). All other axes = HONEST-NON-FINDING or incumbent-wins. Pure-runtime is at W229 maturity — saturation is the expected finding, not a research failure.

**Cross-model gate status**: PARTIAL — this is a Sonnet stand-in dispatch (STAND-IN-NOTICE). Orchestrator MUST route the §4 opik+openllmetry INSTALL-NOW verdict + §8 dispositions through codex T1 before any commit, per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` + `ahfv-codex-rescue-blind-spot.md §2-stage validation contract`. Probe DAG 1-7 + Phase 7 benchmark gate apply to all INSTALL verdicts.
