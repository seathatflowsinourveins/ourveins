# EVAL-1 — MAX-DEPTH Deep-Resolution (W259-v16 coverage-audit gaps)

> Layer: **eval / observability**. Three coverage-audit gap repos deep-dived to definitive,
> evidence-backed resolutions. Each repo's W259-v16 QUICK disposition
> (`05-scoring/MASTER-SCORING-MATRIX-W259.md §5`, mirrored in
> `08-coverage-audit-W259v16/EVAL-OBSERVABILITY-COVERAGE.md`) is **confirmed or revised**
> against primary source (GitHub tree + file contents, DeepWiki architecture, repomix).
>
> **Method**: every claim below is sourced from the repo's own files — `plugin.json`,
> `LICENSE`/`LICENSE.txt`, `pyproject.toml`, command/agent markdown, the deterministic
> `.mjs` tools, GitHub commit history + release metadata. README marketing claims are
> NOT taken at face value.
>
> **Runtime-fit baseline**: Windows 11 Z:-portable single-operator Claude Code runtime.
> Eval/observability layer is already LIVE — `harness/eval_harness.py` runs real
> `inspect_ai` + `promptfoo` lanes; `Phoenix` is installed for tracing. A new eval/obs
> repo earns INSTALL-NOW **only** if it fills a hole that stack does not.
>
> Audit date: 2026-05-16. No git commit performed (per task constraints).

---

## Resolution summary (one line per repo)

| Repo | W259-v16 QUICK call | DEEP resolution | Δ |
|---|---|---|---|
| `Not-Diamond/self-care` | T2-pilot or T3 cite-pattern (maint-frozen) | **CITE-PATTERN** (study the 14-detector trace-eval rubric set) + **WATCH** | narrowed — no INSTALL surprise |
| `raga-ai-hub/RagaAI-Catalyst` | "scored T2 row" omission | **REJECT** | hardened — strictly worse than incumbent Phoenix |
| `Kiln-AI/Kiln` | named LAYER-C candidate / pilot note | **STUDY-PILOT** (optional) → default **WATCH** | confirmed minor-gap; not INSTALL |

**Headline**: No INSTALL-grade surprise. The native-CC eval pathway flagged by the
coverage audit (`self-care`) is **real but maintenance-frozen AND structurally blocked**
on this runtime's trace shape — it resolves to CITE-PATTERN, not INSTALL. The installed
`inspect_ai` + `promptfoo` + `Phoenix` stack remains the correct eval/obs layer; all three
gap repos are catalog-completeness items, not architecture corrections.

---

## 1. `Not-Diamond/self-care` — the native-CC eval gap (deepest dive)

### 1.1 Identity / metadata (GitHub API, verified)

- **Exact slug**: `Not-Diamond/self-care` (resolved via GitHub search — single exact match;
  org `Not-Diamond` id 136373660, the Not Diamond LLM-routing company).
- **Stars**: 24. **Forks**: 0. **Open issues**: 0. **Language**: JavaScript. **Size**: 156 KB.
- **License**: **MIT** — confirmed in `plugin.json` (`"license": "MIT"`) and a present `LICENSE`
  file (1074 bytes, standard MIT). Repo `license.spdx_id` = `MIT`.
- **Created**: 2026-04-06. **Last push**: **2026-04-16**. **Latest release**: **v0.0.17**
  (`plugin.json` `"version": "0.0.17"`; release commit dated 2026-04-10).
- Topics: `agent-evaluation`, `ai-agents`, `claude-code`, `llm`, `observability`,
  `opentelemetry`, `plugin`, `tracing`.

### 1.2 Maintenance status — CONFIRMED FROZEN (primary-source, two independent signals)

1. **`README.md` verbatim** (the repo's own words):
   > "Self-Care is publicly available to use and explore, but **it is not in active
   > development**. We will review bug reports and small fixes as time permits, but
   > **we are not actively accepting feature work or maintaining a public roadmap**."
2. **Commit history** (`list_commits`, all 15 most-recent): the entire substantive history
   is 2026-04-06 → 2026-04-16 (10 days). Releases v0.0.7→v0.0.17 were all auto-synced from
   an internal repo on 2026-04-07/08/10; the last three commits (Apr 15-16) are README/
   CONTRIBUTING copy edits only. **Zero code activity since 2026-04-16** (≈1 month at audit).

This is a deliberate, declared archival posture — not abandonment, but explicitly frozen.

### 1.3 Native-CC pathway — CONFIRMED present, and unusually deep

`self-care` is a **genuine, real Claude Code plugin** — verified in the tree:

- **`.claude-plugin/plugin.json`** — valid CC plugin manifest (name, version, description,
  author, license, keywords). **`.claude-plugin/marketplace.json`** present — so the repo is
  also its own marketplace. Install: `/plugin marketplace add Not-Diamond/self-care` then
  `/plugin install self-care@self-care`.
- **`commands/`** — 9 user-facing slash commands as `.md` files with `allowed-tools`
  frontmatter: `run.md` (28.9 KB — the 6-stage pipeline), `validate.md`, `review.md`,
  `init.md`, `config.md`, `context.md`, `autosync-enable/disable/status.md`, `help.md`,
  plus `analyze.md` + `autosync-tick.md`.
- **`agents/`** — sub-agents (`trace-analyzer.md` 16.5 KB orchestrator, `context-refiner.md`
  remediation agent) + **`agents/skills/`** (12 interpretive LLM-as-Judge detector skills as
  `.md` + `report-generator.md`) + **`agents/tools/`** (6 deterministic Node `.mjs` tools) +
  **`agents/instructions/`** (reconciliation / description-quality guidelines).
- This is a **fully native CC plugin architecture** — commands + agents + skills + tools,
  no MCP server, no external daemon. It is the only L4 repo in the W259 catalog that ships
  as a first-class CC plugin.

**Does it ingest Claude Code's OWN session JSONL?** — verified YES, with a hard caveat.
The deterministic parser `agents/tools/validate-trace.mjs` has a `detectFormat()` that
recognizes a `"claude-code"` format: a JSON/JSONL array whose entries carry a string
`type` plus any of `message`/`tool`/`result`/`sessionId`/`timestamp`. `validateClaudeCode()`
extracts `sessionId` + `eventTypes`. `run.md` Stage 0b accepts a local trace path directly
(`/self-care:run path/to/trace.json`). So in principle `self-care` can analyse a CC session
transcript from `Z:/claude-sota-installed-state/.claude/projects/*.jsonl`.

**THE BLOCKER (decisive, source-verified)** — `validate-trace.mjs`, end of file:
```js
if (result.valid && result.metadata && !result.metadata.systemPromptDetected) {
  result.valid = false;
  result.errors.push(
    "No system prompt found — Self-Care requires a system prompt in the trace to evaluate cases");
}
```
Validation **HARD-FAILS** (exit 1, pipeline stops at Stage 1) if no system prompt is found
in the trace. `detectSystemPrompt()` looks for OTEL `llm.system_prompt` attrs, OpenAI
`role:system`, LangChain `type:system`, Codex `base_instructions`, etc. **Claude Code's
session JSONL transcripts do not embed the orchestrator system prompt** as a discrete
record — so a raw CC session file fails strict validation. There is a `flexible-validator`
LLM fallback, but it is gated behind an `AskUserQuestion` prompt and is best-effort.
**Net: the "ingests CC trace JSON" claim is technically true but operationally fragile for
this runtime's actual transcript shape.** `self-care` is really built for *agent-product*
traces exported from LangSmith / LangFuse / OTEL — not for self-analysis of a CC dev session.

### 1.4 Source-verified capabilities

- **14 detectors** (2 deterministic `.mjs`: `tool-failure`, `step-repetition`; 3 with
  deterministic pre-checks: `missed-action`, `premature-termination`, `goal-drift`; the
  remaining via LLM-as-Judge skill agents): context-utilization, reasoning-action-mismatch,
  instruction-following, grounding (hallucination), persona-adherence,
  contradictory-instructions, missing-context, ambiguous-instructions, guardrail-violation.
- **6-stage pipeline** (`run.md`): validate → analyze (parallel skill-agent fan-out via
  Task tool) → report → finding review (per-finding `AskUserQuestion` human triage) →
  categorized output (auto-remediable vs manual-review) → optional feedback telemetry.
- **Persistent per-trace memory** — `.self-care/memory/<trace_hash>.jsonl` tracks
  recurring/resolved cases across runs (content-hash keyed).
- **Auto-remediation** — `context-refiner` agent locates the relevant project file
  (system prompt / tool description / context doc) and computes a minimal diff to fix the
  *root cause* (two-phase preview→apply).
- **Continuous monitoring** — `autosync` polls LangSmith/LangFuse on a schedule via CC
  scheduled tasks (`autosync.mjs`, 54 KB).
- **Trace sources**: LangSmith (`LANGSMITH_API_KEY`), LangFuse (`LANGFUSE_PUBLIC_KEY` +
  `LANGFUSE_SECRET_KEY`), or a local OTEL/Claude-Code JSON file.

### 1.5 Windows compatibility — partial / unverified

- The deterministic tools are Node `.mjs` (`node ...mjs`) — cross-platform; `validate-trace.mjs`
  uses only `node:fs`. **OK on Windows.**
- **Risk**: `trace-analyzer.md` instructs the agent to use POSIX Bash for `shasum -a 256`,
  `grep -o ... | sort | uniq -c`, `mkdir -p`, `date -u +...`; `run.md` Stage 6 uses
  `cat ... | jq`; `scripts/check-env.sh` is `#!/usr/bin/env bash` with `set -euo pipefail`.
  This runtime *does* have Git Bash wired (`CLAUDE_CODE_GIT_BASH_PATH`), so these resolve —
  but `shasum`/`jq` must be on PATH inside that Bash. **Not a clean Windows-native plugin;
  it assumes a Unix-y shell.** No Windows CI; the project is frozen so this will not be fixed.

### 1.6 Duplication vs installed stack

- Overlaps **`inspect_ai`** conceptually (both are eval frameworks) but the *unit of
  analysis differs*: `inspect_ai` evaluates a model/task against a dataset; `self-care`
  post-hoc *audits a single agent trace* for behavioural failure modes. Complementary, not
  identical.
- Overlaps **`Phoenix`** on trace ingestion — but Phoenix is live trace observability;
  `self-care` is offline batch trace *triage* with LLM judges.
- The genuinely novel asset is the **14-detector rubric library** — each
  `agents/skills/check-*.md` is a self-contained LLM-as-Judge rubric (observation → criteria
  → counter-evidence → binary verdict) for one agent failure mode. That rubric set is the
  reusable, model-agnostic IP.

### 1.7 DEFINITIVE RESOLUTION — `self-care`: **CITE-PATTERN** (+ WATCH)

**NOT INSTALL-NOW.** Three independent disqualifiers, each source-verified:

1. **Maintenance-frozen by the maintainer's own declaration** — installing a frozen plugin
   into a long-arc runtime violates the freshness/velocity discipline the W259 catalog
   applies elsewhere (cf. the SKIP-stale calls on RouteLLM, openai/evals).
2. **The native-CC pathway is structurally blocked for this runtime** — strict validation
   hard-fails on a raw CC session JSONL (no embedded system prompt). The plugin is built for
   LangSmith/LangFuse *agent-product* traces; this runtime has neither.
3. **No hole to fill** — this is a single-operator dev runtime, not a monitored agent
   product. There are no production agent traces to triage. `inspect_ai` + `promptfoo`
   already cover model/task eval; `Phoenix` covers live tracing.

**Resolution = CITE-PATTERN.** The high-value, durable artifact is the **14-detector
LLM-as-Judge rubric set** (`agents/skills/check-*.md`) plus the deterministic-precheck →
LLM-judge two-tier pattern and the `description-guidelines.md` "explain to a business
expert" output convention. If a future wave builds a CC-session self-audit lane in
`harness/`, those rubrics are the reference design — adopt the *pattern*, not the package.

**Secondary = WATCH** — if Not Diamond ever un-freezes the repo AND adds first-class CC
session-JSONL support (system-prompt-optional validation), re-evaluate for STUDY-PILOT.
Low probability given the explicit "not in active development" stance.

**FLAG**: this is the gap the coverage audit singled out as "the one eval gap with a
genuine native-CC pathway." Deep-dive verdict: the native-CC pathway is **real but
hollow for this runtime** — frozen + system-prompt-gated. It is a CITE-PATTERN, **not the
INSTALL-grade surprise the framing invited.** No loud INSTALL flag.

---

## 2. `raga-ai-hub/RagaAI-Catalyst` — high-star LLM-obs/eval SDK

### 2.1 Identity / metadata (GitHub API, verified)

- **Slug**: `raga-ai-hub/RagaAI-Catalyst`. **Stars**: 16,162 (out-stars catalogued DeepEval
  at 15.5k — the coverage audit's "highest-star uncatalogued L4 repo" is accurate).
- **Forks**: 3,607. **License**: **Apache-2.0** (repo `license.spdx_id`). **Language**: Python.
- **Created**: 2024-08-26. Repo `pushed_at`: 2026-02-11 — **BUT** `list_commits` on `main`
  shows the newest *code commit* is `ab678933` dated **2025-05-16** ("v2.1.7.4"). The later
  `pushed_at` reflects a non-code ref push (tag/branch), not development.
- **Effective maintenance**: latest substantive release `v2.1.7.4`, **~1 year stale** at
  audit. The project is effectively dormant.

### 2.2 Architecture — SaaS-coupled by design (DeepWiki, verified)

DeepWiki (grounded in the repo's own wiki/Overview): RagaAI-Catalyst is a **client-server
Python SDK**. The `RagaACatalyst` class **requires a hosted RagaAI Platform account** —
you must obtain `access_key` + `secret_key` from the `catalyst.raga.ai` dashboard; the SDK
authenticates against `https://catalyst.raga.ai/api` and **uploads traces, metrics, and code
snapshots to the RagaAI Platform** for analysis. The dashboard/analytics are the product;
the OSS package is the uploader client.

- **Native-CC pathway**: **NONE.** No `.claude-plugin/`, no MCP server, no CLI — DeepWiki
  confirms "the term 'MCP server' does not appear in the codebase" and there is no Claude
  Code plugin. Interaction is purely the Python SDK.
- **Capabilities**: `Tracer` (auto-instrumentation for LangChain / LlamaIndex / CrewAI /
  LangGraph / SmolAgents / Haystack), `Dataset`, `Evaluation` (Faithfulness, Hallucination,
  Context Relevancy metrics — but computed server-side on the platform), `PromptManager`,
  `SyntheticDataGeneration`, `GuardrailsManager`, `RedTeaming`.

### 2.3 Windows compatibility

Pure-Python SDK (`pip install ragaai-catalyst`) — nominally Windows-runnable. Moot: the SDK
is inert without a `catalyst.raga.ai` SaaS account, which this runtime will not provision.

### 2.4 Duplication vs installed stack

**Total functional overlap with `Phoenix`** (already installed) on tracing — and Phoenix is
*strictly better-fit*: Phoenix runs locally/self-hosted with no mandatory SaaS account or
API key. RagaAI-Catalyst's eval metrics overlap DeepEval / Ragas (both already catalogued).
RagaAI-Catalyst adds nothing the installed stack lacks, and adds a hard external dependency.

### 2.5 DEFINITIVE RESOLUTION — `RagaAI-Catalyst`: **REJECT**

**Revises the W259-v16 QUICK call** (which proposed a "scored T2 row" as a
catalog-completeness fix). It still merits a *catalog row* for completeness — but the row's
verdict is unambiguous **REJECT**, on three source-verified grounds:

1. **Mandatory SaaS coupling** — non-functional without a hosted `catalyst.raga.ai` account
   + API keys; trace data is uploaded off-box. Disqualifying for a local single-operator
   runtime, and a data-egress concern.
2. **Dormant** — newest code commit 2025-05-16, ~1 year stale. Fails the freshness bar.
3. **Strictly dominated** — Phoenix already delivers the local tracing role with no SaaS
   dependency; DeepEval/Ragas cover the eval metrics. Zero unfilled hole.

The 16.2k stars are real but reflect the hosted *product's* reach, not OSS-package fitness
for an offline CC harness. **No install, no pilot.** Catalog disposition: scored row,
verdict REJECT (SaaS-coupled + dormant + dominated-by-Phoenix).

---

## 3. `Kiln-AI/Kiln` — eval + dataset + RAG workbench

### 3.1 Identity / metadata (GitHub API, verified)

- **Slug**: `Kiln-AI/Kiln`. **Stars**: 4,833. **Forks**: 366. **Language**: Python.
- **License**: **NOT plain MIT** — repo `license` = `"other" / NOASSERTION`. Verified from
  `LICENSE.txt`: the repo is **split-licensed** —
  - `/libs/core` (`kiln-ai`) and `/libs/server` (`kiln-server`): **MIT** (confirmed in
    `libs/core/pyproject.toml` classifier `License :: OSI Approved :: MIT License`);
  - `/app` (desktop application): **proprietary "Kiln AI Desktop EULA"** — source-available,
    free for personal use, "larger for-profit companies may require a license in the future";
  - "Kiln" name/logos are trademarks of Chesterfield Laboratories Inc.
  **The task brief's "MIT" is only correct for the Python library, not the repo as a whole.**
- **Created**: 2024-07-23. **Last push**: 2026-05-15 (day before audit). **Latest release**:
  **v1.0.2** (`Kiln Desktop - v1.0`), published 2026-05-11 — "after 6,562 commits". **Highly
  active, mature.**
- `kiln-ai` PyPI package: **v1.0.0**, `requires-python >=3.10` (3.10-3.13). CLI entrypoint
  `kiln_ai = "kiln_ai.cli:app"` (Typer). Depends on `mcp[cli]>=1.10.1`, `litellm`,
  `llama-index`, `lancedb`.

### 3.2 Capabilities — source-verified (DeepWiki + pyproject + release notes)

- **Three-tier architecture**: `kiln-ai` (MIT Python core lib) / `kiln-server` (MIT FastAPI
  REST server) / desktop app (EULA Svelte GUI). Same Git-compatible JSON project files
  across all three — no lock-in.
- **Evals**: LLM-as-Judge + G-Eval, run **fully programmatically** from Python without the
  desktop app. Verified API: `Eval` + `EvalConfig` + `EvalOutputScore` datamodels;
  `EvalRunner` orchestrates `eval_configs` × `run_configs`; `GEval.run_eval` invokes the
  judge model. Frozen golden test sets, human ratings, AI Eval Builder.
- **Also**: RAG, Tools & MCP, synthetic data generation, fine-tuning, prompt auto-optimize
  against evals, 190+ models across providers (cloud or fully local via Ollama).
- **`kiln_mcp` MCP server** — CRITICAL nuance, source-verified: it exposes a Kiln project's
  *task / RAG / search tools* to MCP clients (stdio / SSE / streamable-http transports). It
  does **NOT** expose eval-running as an MCP tool (DeepWiki, confirmed twice: "the `kiln_mcp`
  server appears to expose project search tools and not eval-running"). So a Claude Code
  orchestrator connecting to `kiln_mcp` would get Kiln *task tools*, not an eval lane.

### 3.3 Windows compatibility — CONFIRMED strong

- `kiln-ai` is pure-Python 3.10-3.13 (`pip install kiln-ai`) — Windows-native.
- The desktop app ships a real **`Kiln.Windows.zip`** release asset (v1.0.2, 38 downloads)
  built via `WinInnoSetup.iss`. Repo topics explicitly include `windows`.
- This is the **best Windows-fit of the three gap repos** — a genuine fit-bonus for a
  Z:-portable Windows runtime.

### 3.4 Duplication vs installed stack

- Kiln's eval engine **overlaps `inspect_ai` + `promptfoo`** — all three do LLM-as-Judge /
  scored eval. But Kiln evals are bound to **Kiln's own project-file dataset model**
  (`Project`/`Task`/`TaskRun`/`Eval` JSON tree). Adopting Kiln evals means adopting Kiln's
  data model — a *parallel ecosystem* beside `harness/eval_harness.py`, not a drop-in.
- Kiln's real differentiators vs the installed stack are the **GUI workbench** (for
  PM/SME/non-engineer collaboration) and the **synthetic-data-generation + prompt-auto-
  optimize** features — neither is an eval-lane gap; both are out of scope for a
  single-operator headless runtime.

### 3.5 DEFINITIVE RESOLUTION — `Kiln-AI/Kiln`: **STUDY-PILOT (optional) → default WATCH**

**Confirms the W259-v16 QUICK call** ("minor gap; named LAYER-C candidate; worth a pilot
note") with hardened evidence. **NOT INSTALL-NOW:**

1. **No unfilled eval hole** — `inspect_ai` + `promptfoo` already provide programmatic
   LLM-as-Judge eval. Kiln's eval engine is equivalent-class, and worse-coupled (requires
   adopting Kiln's project-file data model).
2. **`kiln_mcp` does not expose evals** — the one native-integration surface (MCP server)
   exposes Kiln *task tools*, not an eval lane, so there is no clean "wire Kiln evals into
   CC via MCP" path.
3. **The desktop GUI is the actual product** (and EULA-licensed) — its team-collaboration /
   synthetic-data / auto-optimize value does not map onto a headless single-operator runtime.

**Positives that keep it above REJECT**: MIT core library, very active (v1.0.2,
2026-05-11), mature (6,562 commits), genuine Windows-native build, MCP-aware, fully-local
capable (Ollama). Better-than-average fit — but fit-bonus without a hole to fill.

**Resolution = STUDY-PILOT, operator-optional.** If a future wave wants synthetic eval
**dataset generation** (Kiln's synthetic-data + golden-dataset tooling is genuinely strong
and not duplicated by inspect_ai/promptfoo), `pip install kiln-ai` and pilot the
`kiln-ai` library *headlessly* (never the EULA desktop app) as a dataset-builder feeding
the existing `harness/` lanes. Absent that explicit need, **default disposition = WATCH** —
track releases; re-pilot only on a concrete synthetic-dataset requirement. Catalog
disposition: named LAYER-C candidate, STUDY-PILOT-gated on synthetic-data demand.

---

## 4. Cross-cutting conclusion

| Dimension | `self-care` | `RagaAI-Catalyst` | `Kiln` |
|---|---|---|---|
| License (verified) | MIT | Apache-2.0 | **split**: MIT lib / proprietary-EULA app |
| Native-CC pathway | CC plugin (real) — but trace-gated | none | `kiln_mcp` (task tools, **not** evals) |
| Maintenance | **frozen** (declared, Apr-2026) | **dormant** (~1yr stale) | **active** (v1.0.2 May-2026) |
| Windows-compat | partial (assumes Unix shell) | moot (SaaS-bound) | **strong** (native build) |
| Duplicates installed stack | partial (vs Phoenix/inspect_ai) | **total** (vs Phoenix) | **yes** (vs inspect_ai/promptfoo) |
| **Resolution** | **CITE-PATTERN** + WATCH | **REJECT** | **STUDY-PILOT (opt) → WATCH** |

**No INSTALL-NOW among the three.** The installed `inspect_ai` + `promptfoo` + `Phoenix`
eval/observability layer needs no addition from this gap set — confirmed against primary
source. The W259-v16 coverage audit's core conclusion ("L4-Eval/Obs is one of the
best-covered layers; the gaps are catalog-completeness omissions, not architecture errors")
**survives the max-depth dive intact.**

The single revision worth recording: `RagaAI-Catalyst` should be entered in the catalog
with an explicit **REJECT** verdict (SaaS-coupled + dormant + Phoenix-dominated), not left
as a neutral "scored T2 row" — its 16.2k stars otherwise risk being mistaken for an
adoption signal.

The `self-care` framing ("the one eval gap with a genuine native-CC pathway") is honoured:
the pathway is real (it ships as a true CC plugin) — but deep-dive proves it **hollow for
this runtime** (frozen + system-prompt-gated validation that a raw CC session JSONL fails).
It is a **CITE-PATTERN** for its 14-detector LLM-as-Judge rubric library — explicitly **not
the INSTALL-grade surprise the task framing invited.**
