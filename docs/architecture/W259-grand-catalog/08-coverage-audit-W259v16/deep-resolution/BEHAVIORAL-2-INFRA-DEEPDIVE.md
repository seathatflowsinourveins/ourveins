# W259-v16 Coverage-Audit Gap Resolution — MAX-DEPTH Deep-Dive

## Batch: BEHAVIORAL-2 + INFRA (4 repos)

> **Scope.** Deep-dive 4 W259-v16 coverage-audit gap repos to definitive, primary-source-backed
> resolutions. Each repo's QUICK disposition (from `08-coverage-audit-W259v16/MASTER-COVERAGE-SYNTHESIS-W259v16.md §`
> + `INFRA-SECURITY-GIT-ROUTING-COVERAGE.md` + `BEHAVIORAL-ECOSYSTEM-COVERAGE.md`) is here CONFIRMED or
> REVISED against the actual source tree, manifest files, LICENSE files, and repo metadata.
>
> **Method.** GitHub API (`mcp__github__get_file_contents` for plugin.json / SKILL.md / .mcp.json / LICENSE /
> README; `get_file_contents` directory listings for tree verification; `list_commits` + `list_releases` +
> `search_repositories` for maintenance velocity + license SPDX). Repomix `pack_remote_repository` was attempted
> first but returned 0-file packs for every repo (tool-environment default-branch quirk this session) — so all
> findings below are from direct GitHub-API file reads of pinned commit SHAs, NOT README marketing claims.
>
> **Runtime fit context.** Windows 11, Z:-portable Claude Code runtime, single operator, shared venv
> `Z:\venvs\claude`. Installed: 42 plugins (full behavioral set incl. `superpowers/writing-plans`,
> `skill-creator`); `pre-commit` security gate runs **gitleaks v8.30.1 + ruff v0.15.12 + actionlint v1.7.12**
> (verified live in `.pre-commit-config.yaml`); `LiteLLM` is the catalogued L1 router (recommended, not deployed).
>
> **Pinned commit SHAs (evidence anchors):**
> - `OthmanAdi/planning-with-files` @ `d27008f369a5c58f315ce74194ff1c21b9a0eedc`
> - `yusufkaraaslan/Skill_Seekers` @ `7e1b6d47207b6e4a1460eba88a42030998101aae`
> - `opengrep/opengrep` @ `8c90ff57a43873e4fe6e5a0c55aab148a736d12c`
> - `envoyproxy/ai-gateway` @ `7a303f931b00249a3062eb96c031e949af47c875`
>
> Date: 2026-05-16.

---

## Resolution summary table

| # | Repo | Quick disp. (W259-v16) | **MAX-DEPTH resolution** | Δ |
|---|------|------------------------|--------------------------|---|
| 1 | `OthmanAdi/planning-with-files` | CITE-PATTERN (overlaps writing-plans) | **CITE-PATTERN** (confirmed) — pattern documented; skill itself not installed (overlap + hook-shape friction) | = |
| 2 | `yusufkaraaslan/Skill_Seekers` | STUDY-PILOT / Low (peer to skill-creator) | **STUDY-PILOT** (confirmed, narrowed) — opt-in MCP for bulk docs→skill conversion; NOT auto-install | = |
| 3 | `opengrep/opengrep` | STUDY-PILOT (license-clean Semgrep fork) | **STUDY-PILOT → near-INSTALL** — REVISED UP. License-clean claim VERIFIED (LGPL-2.1). Windows-native single binary. Strong pre-commit-gate fit. See FLAG below. | ▲ |
| 4 | `envoyproxy/ai-gateway` | WATCH (CNCF entrant, K8s-tilt) | **WATCH** (confirmed, hardened) — Apache-2.0 CNCF; hard K8s + Envoy-Gateway dependency; zero solo-runtime fit | = |

**INSTALL-grade surprise flag:** repo #3 `opengrep/opengrep` deep-dives as the strongest of the four —
its only blocker to a clean INSTALL verdict is *adoption-process discipline* (it is a new SAST tool to add to
the `pre-commit` gate, not a plugin), not any technical or licensing defect. Flagged loudly in §3.

---

## 1. `OthmanAdi/planning-with-files` — persistent-markdown planning skill

### Source-verified capabilities

A **Claude Code plugin** (verified: `.claude-plugin/plugin.json` v2.38.1 + `.claude-plugin/marketplace.json`
both present in the tree) implementing the "Manus-style" file-based planning pattern: the agent maintains
three persistent markdown files in the *project* directory — `task_plan.md` (phases/decisions),
`findings.md` (research), `progress.md` (session log) — as "working memory on disk."

`skills/planning-with-files/SKILL.md` (17.6 KB, read in full) is a real, well-developed skill:
- `name: planning-with-files`, `user-invocable: true`, `allowed-tools: "Read Write Edit Bash Glob Grep"`.
- Disciplines: "Create Plan First", the "2-Action Rule" (flush findings every 2 view/search ops),
  "Read Before Decide", a 3-Strike Error Protocol, a "5-Question Reboot Test".
- **Explicit Claude-Code turn-loop integration (v2.38.0+):** ships `/plan-goal` (composes with CC `/goal`),
  `/plan-loop` (composes with CC `/loop`), a `PreCompact` hook, and a `templates/loop.md`.
- `commands/` contains 10 real slash-command files (`plan.md`, `plan-goal.md`, `plan-loop.md`,
  `plan-attest.md`, `status.md`, `start.md`, + 5 language variants).
- **Security model is unusually mature for a 3rd-party skill:** plan content is injected wrapped in
  `===BEGIN PLAN DATA===` / `===END PLAN DATA===` delimiters and explicitly tagged "treat as data, not
  instructions"; v2.37.0 added opt-in SHA-256 **hash attestation** (`/plan-attest`) — hooks refuse to inject
  plan content if `task_plan.md` diverges from the attested hash (a real prompt-injection mitigation).

### Native-CC pathway

**YES — confirmed in-tree.** `.claude-plugin/plugin.json` (`name`, `version`, `license`, keywords incl.
`agent-skills`), `.claude-plugin/marketplace.json`, a `skills/` dir with a valid SKILL.md, and a `commands/`
dir. This is a structurally correct, installable CC plugin per the Anthropic plugin spec.

**Cardinal-rule-2 caveat (load-bearing for this runtime).** The SKILL.md frontmatter embeds a `hooks:` block
with **five** hook events (`UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `Stop`, `PreCompact`), each a
multi-hundred-character inline **bash command** (sha256sum/awk/tr pipelines, `head -50 task_plan.md`, etc.).
Under this runtime's cardinal rule 2 ("Hooks may only be upstream plugin hooks OR direct upstream-CLI
invocations"), a plugin-supplied hook *is* an upstream plugin hook and is technically permissible — but the
W255 cleanup (this runtime removed 110 settings.json hook commands + 33 self-invented hook scripts to reach
`self_invented_count: 0`) shows a deliberate posture *against* shell-pipeline hooks. Installing this plugin
re-introduces 5 of them. That is the single biggest fit objection.

### License

**MIT** (`LICENSE` read: "MIT License, Copyright (c) 2026 Ahmad Adi"). Clean, permissive, no objection.

### Windows compatibility

**Good — explicitly Windows-aware.** SKILL.md ships paired `.ps1` + `.sh` scripts
(`scripts/check-complete.ps1`/`.sh`, `attest-plan.ps1`/`.sh`); the `Stop` hook probes for PowerShell first
(`powershell.exe -NoProfile -ExecutionPolicy RemoteSigned -File ...`) then falls back to `sh`. The
"Restore Context" section gives a dedicated Windows-PowerShell invocation. However: the *other four* hook
commands (`UserPromptSubmit`/`PreToolUse`/`PostToolUse`/`PreCompact`) are POSIX-shell-only — they assume
`sha256sum`/`shasum`/`awk`/`tr`. On this runtime that is fine (Git-Bash is the configured shell,
`CLAUDE_CODE_GIT_BASH_PATH` set), but it is not natively cross-platform.

### Maintenance velocity

**Very high.** `list_commits`: HEAD commit `d27008f3` dated **2026-05-16** (the *day before* this audit) —
a precise v2.38.1 fix (swapped plan-injection delimiter from `---` to `===` to avoid YAML doc-separator
collision in CC's skill loader); prior commits 2026-05-15. 21,419 stars. Active maintainer (`OthmanAdi`),
responsive to GitHub Discussions (#153). Healthy.

### Duplication vs installed stack

**Real overlap.** The runtime already has `superpowers/writing-plans` (installed, W254 behavioral set) and
its own native wave-doc / `docs/` discipline + CLAUDE.md pointer-memory architecture. `planning-with-files`
covers the *same job* (structured multi-step planning + progress tracking + post-`/clear` recovery). Its
distinctive deltas vs `writing-plans` are: (a) persistent **on-disk** files as the substrate (writing-plans
is more in-context), (b) the `PreCompact` flush hook, (c) the SHA-256 attestation anti-injection model.
Those are genuinely interesting *patterns* — but they are patterns, not a capability the runtime lacks.

### Definitive resolution: **CITE-PATTERN** (quick disposition CONFIRMED)

Evidence-backed rationale: a structurally valid, well-maintained, 21k-star CC plugin — but (1) capability
overlaps installed `writing-plans` + native wave-doc discipline; (2) installing it re-introduces 5 bash-
pipeline hooks the W255 cleanup deliberately eliminated; (3) the runtime's pointer-only `≤50 LOC` CLAUDE.md
+ explicit `@import` design is the *opposite* philosophy from auto-injecting `head -50 task_plan.md` on
every UserPromptSubmit. **Do not install.** **Do** record two patterns in the catalog's behavioral layer:
(a) **persistent-on-disk planning files** as agent working memory (the Manus pattern), and (b) the
**SHA-256 plan attestation** anti-prompt-injection technique — that second one is a genuinely novel,
citable security pattern worth noting next to the runtime's own hook discipline.

---

## 2. `yusufkaraaslan/Skill_Seekers` — docs/repos→AI-skill meta-tool

### Source-verified capabilities

A Python tool + **MCP server** that converts knowledge sources (documentation sites, GitHub repos, PDFs,
videos, codebases, OpenAPI/Jupyter/PPTX/etc.) into AI-ready *skills*, with automatic conflict detection.
Verified from `skills/skill-seekers/SKILL.md` (`name: skill-builder`) and the repo tree:
- The MCP server exposes (per SKILL.md) **35 tools**: scrapers (`scrape_docs`, `scrape_github`, `scrape_pdf`,
  `scrape_video`, `scrape_codebase`, `scrape_generic`), config management (`generate_config`,
  `validate_config`), post-processing (`enhance_skill`, `package_skill`, `upload_skill`, `install_skill`),
  and advanced (`detect_patterns`, `extract_test_examples`, `build_how_to_guides`, `split_config`, +
  vector-DB exporters `export_to_weaviate/chroma/faiss/qdrant`).
- Substantial Python project: `src/`, `api/`, `tests/`, `pyproject.toml`, `requirements.txt`, `uv.lock`
  (1.38 MB lockfile), `mypy.ini`, `codecov.yml`. Real test suite — HEAD commit message cites
  "3066 passed, 126 skipped, 0 failed (~14 min)". This is a maintained product, not a toy.
- Ships Docker (`Dockerfile`, `Dockerfile.mcp`, `docker-compose.yml`), `helm/` charts, `render.yaml` —
  i.e. it is also deployable as a hosted service (homepage `skillseekersweb.com`).

### Native-CC pathway

**YES (MCP) — confirmed in-tree.** `.mcp.json` at repo root:
```json
{ "mcpServers": { "skill-seekers": { "command": "python", "args": ["-m", "skill_seekers.mcp.server_fastmcp"] } } }
```
A stdio FastMCP server — the standard, cardinal-rule-compliant MCP integration path. There is also a
`.codex-plugin/plugin.json` (v3.5.0, declares `mcpServers: ./.mcp.json` + `skills: ./skills/`) and a
`.claude/mcp_config.example.json`. So the project ships an explicit MCP-server integration for Claude Code.
`skills/skill-seekers/SKILL.md` is a thin orchestration skill telling the agent how to drive the 35 MCP tools.

### License

**MIT** (`LICENSE` read: "MIT License, Copyright (c) 2025 [Your Name/Username]"). Permissive. Minor cosmetic
flaw — the copyright holder placeholder was never filled in — but legally MIT and non-blocking.

### Windows compatibility

**Adequate, not first-class.** The MCP server is `python -m ...` (cross-platform). Setup tooling is
POSIX-biased: `setup.sh` (21 KB), `setup_mcp.sh` (25 KB), `.dockerignore`, `docker-compose.yml` — no `.ps1`
installer. On this runtime the MCP server itself would run fine under the shared `Z:\venvs\claude` Python
(`requirements.txt`-installable), but the convenience setup scripts assume bash. The Docker path is the
cleaner Windows route. No hard Windows blocker; just no Windows-native polish.

### Maintenance velocity

**High.** HEAD `7e1b6d47` dated **2026-05-13** (a precise HTML-directory auto-detect fix, #382); v3.6.0
released 2026-05-03 with IBM-Bob target + GitHub-issue filtering + 7 unified-scraper fixes; visible
multi-contributor history; commits co-authored with "Claude Opus 4.7 (1M context)". 13,582 stars. Healthy
and actively developed.

### Duplication vs installed stack

**Adjacent overlap with installed `skill-creator`.** The runtime already has the `skill-creator` plugin
(authoring new skills interactively) + `mcp-builder` / `skill-development` plugin-dev skills. `Skill_Seekers`
is *more capable on one specific axis* the installed tools do not cover well: **bulk ingestion of an external
knowledge source** (a whole docs site / a PDF / a video transcript / a foreign repo) into a packaged skill,
plus design-pattern + test-example extraction + vector-DB export. `skill-creator` authors skills from the
operator's intent; `Skill_Seekers` *manufactures* skills from existing third-party documentation. Different
enough to be a recorded peer, overlapping enough that it is not a must-have.

### Definitive resolution: **STUDY-PILOT** (quick disposition CONFIRMED, narrowed)

Evidence-backed rationale: a genuinely capable, well-tested, actively-maintained MCP tool with a clean
cardinal-rule-compliant integration path — but its core job (docs→skill conversion) is adjacent to installed
`skill-creator`, and it is a *meta-tool* (you reach for it occasionally to build a skill, it is not an
always-on behavioral primitive). **Do not auto-install into the 42-plugin set.** Record it as a
**STUDY-PILOT**: a documented, on-demand option — if a future wave needs to convert a large external doc
corpus into a runtime skill (e.g. packaging a vendor SDK's docs), stand up the `skill-seekers` MCP server
from the shared venv for that task, then retire it. Note in the catalog as the bulk-ingestion peer to
`skill-creator`. Not a hard install; not a reject.

---

## 3. `opengrep/opengrep` — license-clean Semgrep fork (SAST engine)

### Source-verified capabilities

A static-analysis (SAST) engine — a fork of **Semgrep v1.100.0** — that finds security issues + code patterns
via semantic pattern matching. Verified from `README.md`, `OPENGREP.md` (full "Since the Fork" changelog, read
in full), `INSTALL.md`, repo tree, and `search_repositories` metadata:
- **Semgrep-rule-compatible**: "your existing rules and rulesets work unchanged"; emits standard JSON + SARIF
  (README shows a real SARIF sample with `"name": "Opengrep OSS"`).
- 30+ languages (Apex, Bash, C, C++, C#, Clojure, Dart, Dockerfile, Elixir, Go, Java, JS/TS/JSX/TSX, Kotlin,
  PHP, Python, Ruby, Rust, Scala, Solidity, Swift, Terraform, Visual Basic, YAML, generic, …).
- **Deltas vs Semgrep CE since the fork** (from `OPENGREP.md`): migrated to **OCaml 5.3.0** with multicore
  shared-memory parallelism; **native Windows support** (Semgrep's process-forking model "did not work on
  Windows"); languages Semgrep CE/Pro lack (Visual Basic, Apex, Elixir); `--taint-intrafile` cross-function
  taint analysis (Semgrep gates the equivalent `--pro-intrafile` behind a commercial licence); per-rule +
  dynamic timeouts; metavariable values + fingerprints in JSON/SARIF.
- **Self-contained binaries** built with Nuitka — *no Python install required* (departure from Semgrep's
  pip-wheel distribution); releases **Cosign-signed**.

### Native-CC pathway

**Direct-CLI — confirmed and cardinal-rule-2-compliant.** Opengrep is a standalone CLI (`opengrep scan -f
rules <path>`, `--sarif-output=`). It is not a plugin and does not need to be: under cardinal rule 2, a
direct upstream-CLI invocation in `.claude/settings.json` (or in the `pre-commit` gate) is exactly the
sanctioned hook shape — identical in form to the gitleaks / ruff / actionlint invocations already running.
The W259-v16 INFRA audit (`INFRA-SECURITY-GIT-ROUTING-COVERAGE.md:65,88`) also claims an official
`opengrep/skills` agent-skill repo exists; that is a *separate* repository and was not in scope for this
file's source dive — the in-tree pathway verified here is the **CLI**, which is sufficient.

### License

**LGPL-2.1 — VERIFIED, and this is the whole point of the repo.** Two independent confirmations:
(1) `LICENSE` file read in full = verbatim GNU Lesser General Public License v2.1; (2) GitHub
`search_repositories` metadata: `"license": { "key": "lgpl-2.1", "spdx_id": "LGPL-2.1" }`. README states it
plainly: *"Opengrep was created when Semgrep moved critical features behind a commercial licence."* Semgrep
CE relicensed away from a clean OSI license; Opengrep is the **OSI-approved, copyleft-but-permissive-for-CLI-
use** fork. For a SAST *binary invoked as a CLI* (not statically linked into distributed software), LGPL-2.1
imposes effectively no practical obligation on this runtime. The quick disposition's "license-clean" claim is
**fully substantiated**.

### Windows compatibility

**Excellent — first-class, and a deliberate fork feature.** `OPENGREP.md`: *"Added native support for
Windows"* — the OCaml-5 multicore rewrite explicitly replaced Semgrep's Windows-incompatible process-forking
model. The repo ships `install.ps1` (16.6 KB) and README gives a PowerShell one-liner
(`irm https://raw.githubusercontent.com/opengrep/opengrep/main/install.ps1 | iex`). Recent releases show
active Windows CI work (v1.20.0: "CI: Set CLCACHE_DIR for nuitka clcache on Windows"; "Fix Windows install:
Bundle charset_normalizer"; v1.21.0: "ci: match cygwin OSTYPE in build-wheels windows branch"). A
self-contained Nuitka binary with no Python dependency is the *ideal* shape for this Z:-portable Windows
runtime — installs to `~/.opengrep/cli/<version>` with a `latest` symlink.

### Maintenance velocity

**Strong and accelerating.** `search_repositories`: org `opengrep` (Organization account), `pushed_at`
**2026-05-13**, 2,557 stars, 210 forks, 83 open issues, not archived. `list_releases`: **roughly bi-weekly
cadence** — v1.21.0 (2026-05-11), v1.20.0 (2026-04-21), v1.19.0 (2026-04-09), v1.18.0 (2026-04-07),
v1.17.0 (2026-04-03). Multiple distinct contributors per release (`dimitris-m`, `maciejpirog`,
`corneliuhoffman`, + new contributors each cycle). README: backed by a **consortium of 10+ AppSec
organisations** (Aikido, Arnica, Amplify, Endor Labs, Jit, Kodem, Legit, Mobb, Orca Security, Phoenix
Security) — open governance, "contributions accepted on merit, not commercial interest." This is a
well-funded, multi-org-governed project, not a solo fork.

### Duplication vs installed stack — and the pre-commit-gate question

The runtime's `pre-commit` gate currently runs **gitleaks** (secret scanning) + **ruff** (Python lint/format)
+ **actionlint** (GitHub-Actions lint) — verified live in `.pre-commit-config.yaml`. **There is no SAST /
semantic-pattern scanner in the gate.** gitleaks finds *secrets*; ruff finds *Python style/lint*; neither
finds the vulnerability class Semgrep/Opengrep targets (injection sinks, taint flows, insecure API usage,
crypto misuse — across 30+ languages). So Opengrep does **not** duplicate anything installed; it fills a
genuine, currently-empty SAST slot. The W259 catalog picked Semgrep at "T2"; Opengrep is the license-clean,
community-governed drop-in for that exact capability — and given Semgrep CE's relicense, Opengrep is the
*correct* tool for the SAST slot.

### Definitive resolution: **STUDY-PILOT, revised UP toward INSTALL** — see flag

> ### >>> INSTALL-GRADE SURPRISE FLAG <<<
>
> **`opengrep/opengrep` is the strongest of the four repos in this batch and deep-dives as effectively
> INSTALL-grade.** Every hard gate passes cleanly:
> - **License:** LGPL-2.1, OSI-approved, verified from the LICENSE file + SPDX metadata — and license-cleanness
>   is the repo's entire reason to exist (it is the answer to Semgrep CE's relicense).
> - **CC pathway:** direct-CLI — *the same cardinal-rule-2-compliant shape* as the gitleaks/ruff/actionlint
>   hooks already in the gate. Zero new mechanism, zero self-invent.
> - **Windows:** native, deliberate, single self-contained Nuitka binary + `install.ps1` — ideal for this
>   Z:-portable Windows runtime.
> - **Maintenance:** bi-weekly releases, 10+-AppSec-org consortium governance, active Windows CI.
> - **Duplication:** none — it fills the *currently-empty SAST slot* in the `pre-commit` gate.
>
> The only reason this is written as **STUDY-PILOT** rather than a bare INSTALL-NOW is **adoption-process
> discipline**, not any defect: adding Opengrep means adding a *new security scanner to the commit gate*,
> which (a) changes commit latency for the operator, (b) needs a ruleset decision (the Opengrep/Semgrep
> registry rulesets vs a curated subset — a SAST scanner with a noisy ruleset produces false-positive
> fatigue and gets disabled), and (c) is a config change the operator should sign off on, consistent with
> cardinal rule 5 (install-priority) + the W255 posture of a deliberately minimal gate. This is not a
> "study whether it works" pilot — it demonstrably works — it is a "pilot the *ruleset + gate-latency* on
> this specific repo before committing the operator to it" pilot.
>
> **Recommended concrete next step (operator sign-off):** install the Opengrep CLI via `install.ps1`
> (`~/.opengrep/cli/`), add a `pre-commit` hook running `opengrep scan` with a *curated, low-false-positive*
> ruleset scoped to `harness/` + the runtime's Python, measure commit-latency delta on this repo for a
> week, then decide gate-vs-manual. Also: re-frame the W259 catalog's Semgrep row — "Semgrep CE relicensed
> Jan-2025 → Opengrep is the OSI-clean, multi-org-governed fork; pick Opengrep for the SAST slot."
> Estimated composite score ~80-84 (D1 LGPL-clean, D4 multi-org consortium, D15 Windows-native single-binary).

---

## 4. `envoyproxy/ai-gateway` — CNCF Envoy AI Gateway

### Source-verified capabilities

An open-source **AI gateway** built on **Envoy Gateway** (itself built on Envoy Proxy), for routing request
traffic from application clients to generative-AI services. Verified from `README.md` + repo tree:
- **Two-tier gateway pattern:** a "Tier One" centralized entry point (auth, top-level routing, global rate
  limiting) + a "Tier Two" gateway for fine-grained self-hosted-model access with **endpoint-picker support
  for LLM inference optimization**.
- Broad provider support: OpenAI, Azure OpenAI, Google Gemini, Vertex AI, AWS Bedrock, Mistral, Cohere, Groq,
  Together AI, DeepInfra, DeepSeek, Hunyuan, SambaNova, Grok, Tetrate Agent Router Service, Anthropic.
- Go project: `api/`, `cmd/`, `internal/`, `tests/`, `go.mod` (14.6 KB), `go.sum` (66 KB). It is a
  Kubernetes control-plane component — `manifests/` dir, `helm`-adjacent tooling, `.envoy-version` pin,
  CRD-style `api/`. The architecture is *inherently* a K8s deployment: it extends Envoy Gateway, which is a
  Kubernetes Gateway-API implementation.

### Native-CC pathway

**NONE — confirmed by exhaustion.** No `.claude-plugin/`, no `SKILL.md`, no `.mcp.json`, no `skills/` dir
anywhere in the tree. The only IDE-assistant artifact is a `.gemini/` directory (Gemini-CLI config) and a
standard `.github/`. ai-gateway is infrastructure software with no agent-skill / plugin / MCP surface. It is
consumed as a *deployed network component*, not as anything a Claude Code runtime loads.

### License

**Apache-2.0** (`LICENSE` is 11,357 bytes = the standard Apache-2.0 text; `.licenserc.yaml` present for
SPDX-header enforcement; envoyproxy/CNCF house license). Permissive, no objection — but license is moot
here because there is nothing to install into the runtime.

### Windows compatibility

**Not applicable in any practical sense.** It is a Go binary, so it *compiles* on Windows, but it is a
Kubernetes data-plane / control-plane component — it is meaningless to "run it on Windows" outside a K8s
cluster. The Z:-portable single-operator Windows runtime has no Kubernetes and no use for an Envoy-based
multi-tenant API gateway.

### Maintenance velocity

**Very high — but irrelevant to fit.** `list_commits`: HEAD `7a303f93` is a Dependabot Go-dependency bump
(2026-05-xx, bumping anthropic-sdk-go, aws-sdk-go-v2, openai-go, google genai, etc. — PR #2140, so 2000+ PRs).
CNCF/`envoyproxy` org, Envoy is a CNCF *graduated* project, weekly community meetings, `MAINTAINERS.md` +
`CODEOWNERS`. A serious, healthy project — it is simply not a Claude-Code-runtime artifact.

### Duplication vs installed stack

**Conceptual overlap with the catalogued `LiteLLM` L1 router, but a different deployment class.** The runtime
catalogs `LiteLLM` as the recommended L1 LLM router (not deployed). Both ai-gateway and LiteLLM do
multi-provider LLM routing — but LiteLLM runs as a lightweight local proxy / Python library (it *can* serve a
single-operator workstation), whereas ai-gateway is a Kubernetes-native, two-tier, multi-tenant gateway that
*requires* an Envoy Gateway deployment. For a single-operator non-K8s runtime, ai-gateway is categorically
the wrong tool; LiteLLM already occupies the routing slot and is the right shape.

### Definitive resolution: **WATCH** (quick disposition CONFIRMED, hardened)

Evidence-backed rationale: ai-gateway is a strong-org (CNCF/Envoy) project — which is exactly why the
coverage audit kept it on the radar despite low stars — but the deep-dive confirms an **absolute
non-fit** for this runtime: (1) zero native-CC pathway (no plugin/skill/MCP surface — verified by exhaustive
tree inspection); (2) a hard architectural dependency on Kubernetes + Envoy Gateway, which the single-
operator Z:-portable Windows runtime does not and will not have; (3) the routing capability it provides is
already better-matched by the catalogued `LiteLLM` for a non-K8s deployment. **Do not install. Do not pilot.**
Keep the **WATCH** disposition purely as a coverage-completeness entry in the catalog's LLM-routing-layer
table — it documents that the K8s-native AI-gateway category was evaluated and correctly excluded on
deployment-class grounds. The disposition would only ever flip if this runtime's architecture changed
fundamentally (e.g. became a multi-tenant K8s-hosted service), which is out of scope.

---

## Cross-batch notes

- **Repomix tool failure (transparency).** `mcp__repomix__pack_remote_repository` returned 0-file packs for
  all 4 repos this session (`totalFiles: 0` despite valid repos). Root cause appears to be a default-branch
  resolution quirk in the tool environment. All findings in this document are therefore sourced from direct
  `mcp__github__*` API reads of pinned commit SHAs (plugin manifests, SKILL.md, .mcp.json, LICENSE files read
  in full; directory trees enumerated; `list_commits`/`list_releases`/`search_repositories` for metadata).
  This is *stronger* evidence than a repomix pack for the questions asked (license type, manifest presence,
  hook shape) — every claim above is anchored to a specific file at a specific SHA.
- **One disposition revised:** `opengrep/opengrep` STUDY-PILOT → revised **up** toward INSTALL-grade (the
  only blocker is operator sign-off on a new commit-gate scanner + its ruleset, not any technical/license
  defect). The other three quick dispositions (CITE-PATTERN, STUDY-PILOT, WATCH) are **confirmed** by the
  deep-dive with no change.
- **Net adoption impact:** of 4 gap repos, **0 auto-installs**, **1 strong INSTALL candidate pending
  operator ruleset/gate sign-off** (opengrep), **2 documented on-demand/pattern entries** (planning-with-files
  as a cited pattern incl. its SHA-256 attestation technique; Skill_Seekers as a STUDY-PILOT bulk-ingestion
  peer to skill-creator), **1 coverage-only WATCH** (ai-gateway).
