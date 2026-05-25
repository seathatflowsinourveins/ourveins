# W207 Agent F — Eval + Observability + Long-running + Sandbox catalog (zero-bias deep-dive)

**Date**: 2026-05-15 | **Agent**: sota-researcher (W207 fan-out)
**Methodology**: 5-phase protocol (R0 → R1 → R2 → R3 → R4 line-by-line cwc audit)
**Evidence tiers**: [VERIFIED] = read at file:line + HEAD SHA; [INFERRED] = catalog claim; [HONEST-NON-FINDING] = probed and absent

## R0 — Falsifiable hypothesis

"Each of 7 domain layers has ≥1 ADOPT-NOW-grade SOTA primitive that satisfies convergence-gate Axis 1+2+3 + Probe DAG 1-7 + license compatibility." Rejection: ≥1 layer returns HONEST-NON-FINDING.

---

## 1. Eval frameworks

| # | Repo | HEAD SHA | Version | License | VERDICT |
|---|------|----------|---------|---------|---------|
| 1 | UKGovernmentBEIS/inspect_ai | `5b4f3a6346f838dd9e7ca5f30af6c90bef7342ae` [VERIFIED] | setuptools-scm dynamic | MIT | **ADOPT-NOW** (UK AISI gov-grade) |
| 2 | confident-ai/deepeval | `99878bdefd93632dc1cd80319b163fca8acee6e6` [VERIFIED] | `4.0.0` [VERIFIED pyproject.toml:3] | `Apache-2.0` [VERIFIED pyproject.toml:6] | **ADOPT-NOW** |
| 3 | promptfoo/promptfoo | `3ac2b3305b05e9e1afca8b140939314028b4d3f7` [VERIFIED] | `0.121.11` [VERIFIED package.json:5] | `MIT` [VERIFIED package.json:6] | **ADOPT-NOW** (CLI eval + red-team) |
| 4 | openai/evals | NOT-CLONED [HNF] | n/a | MIT | **DEFER** (CR-6 fresh clone first) |
| 5 | microsoft/promptflow | clone present | TBD | MIT/Azure | **STUDY-PILOT-PATTERN-EXTRACT** (heavy Azure dep) |
| 6 | vectara hallucination-leaderboard | NOT-CLONED [HNF] | n/a | n/a | **CITE-ONLY** (eval target reference) |
| 7 | EleutherAI/lm-eval-harness | NOT-CLONED [HNF] | n/a | MIT | **DEFER** (CR-6 fresh clone) |
| 8 | langchain langsmith eval | proprietary | n/a | Proprietary | **REJECT-FOR-FIT** (P6 license-blocker) |
| 9 | anthropic-cookbook eval recipes | HEAD `33424c3eb476cd56379435be086ccc228af1050d` | n/a | Apache-2.0 | **ACCEPT-AS-CITE-REFERENCE** per CR-12 class 6 |

---

## 2. Observability + tracing

| # | Repo | HEAD SHA | Version | License | VERDICT |
|---|------|----------|---------|---------|---------|
| 1 | Arize-ai/phoenix | `419c3a06978abce8f611569228438929f8e7b995` [VERIFIED] | (project) | **`Elastic-2.0`** [VERIFIED pyproject.toml:6] — NOT in MIT/Apache/BSD whitelist | **STUDY-PILOT-NARROW** with license disclosure |
| 2 | langfuse/langfuse | `2466d4ce9bc33b24d6ae5c63cc32293555eec0c0` [VERIFIED] | `3.173.0` [VERIFIED package.json:3] | `MIT` [VERIFIED package.json:5] | **ADOPT-NOW** (backend dashboard) |
| 3 | comet-ml/opik | `26fd69b9cef7c14a74ef63ffbbb1964fb06d6428` [VERIFIED] | (project) | Apache-2.0 | **ADOPT-NOW** (alternative dashboard) |
| 4 | traceloop/openllmetry | `3735204aa063f4ef12b44395bff8351ac61c6136` [VERIFIED] | `traceloop-sdk 0.60.0` [VERIFIED pyproject.toml:4] | `Apache-2.0` [VERIFIED pyproject.toml:10] | **ADOPT-NOW (PRIMARY TRACING)** — vendor-neutral OTel; instruments Anthropic + OpenAI + Ollama + MCP + 30 vendors |
| 5 | dosco/openlit | `42ed9a783644aad9bc5f4ed06fb8350b29b044e3` [VERIFIED] | `1.42.0` [VERIFIED pyproject.toml:3] | `Apache-2.0` [VERIFIED pyproject.toml:6] | **ADOPT-NOW (ALTERNATIVE)** |
| 6 | helicone | clone present | n/a | MIT | **STUDY-PILOT-NARROW** per CR-12 class 4 PROVIDER-COMPLEMENT (overlaps LiteLLM + CLIProxyAPI) |
| 7-9 | Honeycomb / Datadog / New Relic | Proprietary SaaS | n/a | Proprietary | **REJECT-FOR-FIT** |
| 10 | Sentry AI | open-core BSL/MIT mix | n/a | mixed | **DEFER** |
| 11 | ccusage | per W206 base | n/a | per W206 | **ALREADY-INSTALLED** |

---

## 3. Long-running agent runtimes (incl. cwc DEEP)

| # | Repo | HEAD SHA | License | VERDICT |
|---|------|----------|---------|---------|
| 1 | **anthropics/cwc-long-running-agents** | `ffd563d668a97a38d4aa092bf0d5b1507c046629` [VERIFIED Z:/claude-sota-installed/.local/cwc/.git — Wave 62 fire 6 ahead of base catalog `ad107a97` by 2 commits] | `Apache-2.0` | **ALREADY-INSTALLED** + verified §8 deep-read below |
| 2 | Garry-Tan/gstack | clone present [VERIFIED Z:/repos/deps/gstack/codex/SKILL.md:1-60] | per upstream | **CITE-PATTERN-ONLY** (already cited in `codex-t1-fix-forward-pattern.md §Pattern-B mitigation patterns n=8`) |
| 3 | sst/opencode | clone present | per upstream | **STUDY-PILOT-PATTERN-EXTRACT** |
| 4 | microsoft/autogen | multi-package monorepo | MIT | **STUDY-PILOT-PATTERN-EXTRACT** (CR-12 class 4 PROVIDER-COMPLEMENT vs claude-agent-sdk-python PRIMARY); README verbatim "AutoGen is now in maintenance mode" |
| 5 | langchain-ai/langgraph | `langgraph 1.2.0a7` [VERIFIED pyproject.toml:8] | `MIT` [VERIFIED pyproject.toml:12] | **CITE-PATTERN-ONLY** per CR-12 class 5 ECOSYSTEM-IMPORT |
| 6 | crewAIInc/crewAI | workspace clone | LICENSE not probed | **STUDY-PILOT-PATTERN-EXTRACT** |
| 7 | mastra-ai/mastra | massive monorepo clone | per upstream | **CITE-PATTERN-ONLY** (referenced in team-orch-state-spawning.md §Step-Level Retry NOT SHIPPED) |
| 8 | agno-agi/agno | `agno 2.6.5` [VERIFIED pyproject.toml:3] | `Apache-2.0` [VERIFIED pyproject.toml:25] | **STUDY-PILOT-PATTERN-EXTRACT** |

---

## 4. Sandbox + safety primitives (Windows-host constraint)

| # | Primitive | VERDICT |
|---|-----------|---------|
| 1 | OpenAI Codex CLI sandbox (3-mode) | **ALREADY-INSTALLED** via codex-plugin-cc cite-import + `Z:/repos/deps/codex/docs/sandbox.md @ 9ddfda9d` |
| 2 | Anthropic CC `sandbox.bwrapPath` (v2.1.113+) | Linux+bwrap-dependent — **N/A on Windows host** |
| 3 | bubblewrap | Linux-only → **REJECT-FOR-FIT** |
| 4 | firejail | Linux SUID → **REJECT-FOR-FIT** |
| 5 | Docker container sandbox | container runtime available | **STUDY-PILOT-NARROW** per-agent isolation |
| 6 | gvisor | Linux/macOS only → **REJECT-FOR-FIT** |
| 7 | lima-vm | macOS-primary → **REJECT-FOR-FIT** |
| 8 | WSL2 isolation | Windows platform feature | **STUDY-PILOT-NARROW** alternative for Linux-native primitives |

**HONEST-NON-FINDING**: 4 Linux-native fine-grained sandboxes platform-blocked on Windows host. Hypothesis H1 sub-rejected.

---

## 5. Cron + scheduling + stop-hook patterns

| # | Primitive | VERDICT |
|---|-----------|---------|
| 1 | **ralph-loop plugin** | **ALREADY-INSTALLED** at `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/ralph-loop/` [VERIFIED 9 files] — see §8.B.1 |
| 2 | **cwc commit-on-stop.sh** | **ALREADY-INSTALLED** at `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh` [VERIFIED 17 LOC] — see §8.A.5 |
| 3 | awesome-agentic-patterns/stop-hook-auto-continue | status: `emerging`; authors Nikola Balic + Boris Cherny + Reflexion (NeurIPS 2023) + Self-Refine (ICLR 2023) | **CITE-PATTERN-ONLY** |
| 4 | awesome-agentic-patterns/lane-based-execution-queueing | per existing `parallel-sessions.md:73` | **CITE-PATTERN-ONLY** |
| 5 | `/loop` CC primitive (2.1.105 `/proactive` alias) | TIER-1 Anthropic CC built-in | **ALREADY-AVAILABLE** |

---

## 6. Local LLM proxy / routing

| # | Repo | HEAD SHA | Version | License | VERDICT |
|---|------|----------|---------|---------|---------|
| 1 | **BerriAI/litellm** | `934ecdca78daf7ec9514efd47df77bf7495c822d` [VERIFIED] | `1.84.0` [VERIFIED pyproject.toml:3] | `MIT` [VERIFIED pyproject.toml:7] | **ADOPT-NOW** |
| 2 | **CLIProxyAPI** | `v6.9.0` at `f81acd076087732a941627eda7ffae23120f10f1` [VERIFIED] | `v6.9.0` | LICENSE exists | **ALREADY-INSTALLED** per CLAUDE.local.md graphiti `OPENAI_API_URL=http://127.0.0.1:11700/v1` |
| 3 | lmstudio-ai | NOT-CLONED [HNF] | n/a | Electron-app proprietary-hybrid | **DEFER** (non-GitHub-native install per CR-6) |
| 4 | ollama/ollama | clone present | per upstream | MIT | **ALREADY-INSTALLED** per memory stack `:11700` |
| 5 | vllm-project/vllm | clone present | per upstream | Apache-2.0 | **STUDY-PILOT-NARROW** (overkill unless scale demands) |
| 6 | luigi/gh-luigi-claude-proxy | NOT-CLONED [HNF] | n/a | n/a | **DEFER** |

---

## 7. Defensive harness + safety hooks

| # | Primitive | VERDICT |
|---|-----------|---------|
| 1 | pre-commit/pre-commit | NOT-CLONED [HNF] | **STUDY-PILOT-NARROW** (orthogonal to CC hooks) |
| 2 | gitleaks/gitleaks | NOT-CLONED [HNF] | **ADOPT-NOW-CANDIDATE** (secret-scan; aligns with Hard Rule "NEVER commit secrets") |
| 3 | protect-mcp | NOT-CLONED [HNF] | **DEFER** (Phase 7 fabrication-test gate per `ahfv-probe-dag.md §Phase 7`) |
| 4 | signed-audit-trails | NOT-CLONED [HNF] | **DEFER** (same Phase 7 gate) |
| 5 | OWASP llm-top-10 | advisory only | **CITE-ONLY** |
| 6 | cwc kill-switch.sh + steer.sh + verify-gate.sh | **ALREADY-INSTALLED** | see §8.A |
| 7 | Anthropic CC `safety_guard.py` | per ECC cite-import per Section 14.5 | **ALREADY-INSTALLED** |

---

## 8. cwc-long-running-agents 5+3 deep-dive (R4 LINE-BY-LINE AUDIT)

### 8.A — 5 install-class hook primitives (Anthropic-OFFICIAL Apache-2.0)

Source HEAD: `ffd563d668a97a38d4aa092bf0d5b1507c046629` [VERIFIED]
Install location: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/`
Wire mechanism: `cp -r .claude /path/to/project/` + `chmod +x .claude/hooks/*.sh`

**settings.json composition** [VERIFIED L1-32]:
```
PreToolUse:
  matcher: "*"        → kill-switch.sh + steer.sh
  matcher: "Read"     → track-read.sh
  matcher: "Write|Edit" → verify-gate.sh
Stop:                 → commit-on-stop.sh
```

#### 8.A.1 — `track-read.sh` (Default-FAIL contract — read side) [VERIFIED 11 LOC]
- Purpose: Record evidence files (screenshots / console logs / result files) opened during session
- Filter [L8-10]: `case "$path" in *screenshots/*|*-console.txt|*-result.txt|*.png)`
- Integration: complements claude-sota-installed `.claude/state/*.jsonl` audit-action-loop

#### 8.A.2 — `verify-gate.sh` (Default-FAIL contract — write side) [VERIFIED 30 LOC]
- Purpose: Deny Write/Edit to results file unless evidence Read since last fire
- Emits `{"decision":"block","reason":"Cannot modify the results file..."}` if results target AND `.evidence-reads` log empty
- Consume-evidence semantic [L29]: `: > "$log"` on allowed write
- Known gaps [verbatim L7-12]: basename-only match, case-sensitive, any evidence unlocks any row, Bash sed/jq can rewrite unchecked

#### 8.A.3 — `kill-switch.sh` (Operator control — halt) [VERIFIED 9 LOC]
- Purpose: Halt every tool call while `./AGENT_STOP` exists
- Emits `{"decision":"block","reason":"Kill switch engaged..."}`
- Activation: `touch AGENT_STOP` to engage; `rm AGENT_STOP` to resume

#### 8.A.4 — `steer.sh` (Operator control — mid-run redirect) [VERIFIED 14 LOC]
- Purpose: Surface `./STEER.md` content to agent once and clear it
- Emits `{"decision":"block","reason":"OPERATOR STEERING: <content>\n\nPause what you were about to do, incorporate this guidance, then continue toward the feature goal."}` and truncates STEER.md
- Caveat [verbatim L7]: "convenience channel, not a trust boundary"

#### 8.A.5 — `commit-on-stop.sh` (Handoff backstop) [VERIFIED 17 LOC]
- Purpose: Commit tracked changes at session end via `git commit -am "session checkpoint: $(date '+%Y-%m-%d %H:%M')"`
- Discipline: `-am` tracked files only; agent expected to `git add` new files

#### 8.A.6 — `evaluator.md` (Fresh-context evaluator agent) [VERIFIED 26 LOC]
- Frontmatter: `tools: Read, Glob, Grep, Bash` (Bash for git diff only — hard read-only boundary)
- Discipline: distinct context window; verdict begins with bare `PASS` or `NEEDS_WORK` on its own line (regex-parseable)
- Anti-pattern guard [L18]: "Plausibility is not correctness"
- Invocation [L101]: `claude --agent evaluator -p "Review the diff and screenshots/ for feature N against its spec"`

#### 8.A.7 — `CLAUDE.md` (Long-running conventions) [VERIFIED 27 LOC]
- PROGRESS.md convention [L7]: 4-section (`## Done` / `## In progress` / `## Next` / `## Notes`); `git log --oneline -10` + smoke test on every restart
- Discipline: one-feature-at-a-time; proof-before-passing; commit-often (Stop hook backstop)

### 8.B — 3 reference plugins (cwc README "Going further" — ALREADY INSTALLED in marketplaces/)

#### 8.B.1 — `ralph-loop` plugin [VERIFIED 9 files]
- plugin.json [VERIFIED 10 LOC]: name `ralph-loop` v1.0.0 author Anthropic
- Command [VERIFIED commands/ralph-loop.md L3]: `/ralph-loop "PROMPT" [--max-iterations N] [--completion-promise TEXT]`
- Stop hook [VERIFIED hooks/stop-hook.sh 192 LOC]:
  - Reads state from `.claude/ralph-loop.local.md` frontmatter (iteration / max_iterations / completion_promise / session_id)
  - Session isolation [L27-35]: `state_session != hook_session → exit 0`
  - Extracts last assistant text via jq slurp of last 100 assistant lines [L91-114]
  - `<promise>TEXT</promise>` literal-match against `completion_promise` [L129-141]
  - Emits `{"decision":"block","reason":"<prompt>","systemMessage":"🔄 Ralph iteration N | To stop: output <promise>...</promise> (ONLY when statement is TRUE - do not lie to exit!)"}` [L181-188]
- Activation: already installed via `/plugin install ralph-loop@claude-plugins-official`

#### 8.B.2 — `agent-sdk-dev` plugin [VERIFIED 6 files]
- plugin.json [VERIFIED 9 LOC]: name `agent-sdk-dev` author Anthropic
- Contents: `agents/agent-sdk-verifier-py.md` + `agents/agent-sdk-verifier-ts.md` + `commands/new-sdk-app.md`
- Use case [cwc README L32]: "scaffold an SDK agent from inside Claude Code"

#### 8.B.3 — `frontend-design` plugin [VERIFIED 4 files]
- plugin.json [VERIFIED 9 LOC]: name `frontend-design` author Anthropic
- Contents: `skills/frontend-design/SKILL.md` (subjective-quality gradable approach)
- Use case [cwc README L93-94]: grading rubrics (functionality/design/craft/originality) + browser-verified evaluator path (Playwright MCP)

---

## 9. Convergence ranking

### Tier 1 — ADOPT-NOW immediate install

| # | Primitive | Domain | Install cmd (CR-6 official-native-channel) | Cite |
|---|-----------|--------|--------------------------------------------|------|
| 1 | inspect_ai | eval | `pip install inspect-ai` | HEAD `5b4f3a6346f838dd9e7ca5f30af6c90bef7342ae` |
| 2 | deepeval | eval | `pip install deepeval` | HEAD `99878bdefd93632dc1cd80319b163fca8acee6e6` v4.0.0 Apache-2.0 |
| 3 | promptfoo | eval+red-team | `npm install -g promptfoo@latest` | HEAD `3ac2b3305b05e9e1afca8b140939314028b4d3f7` v0.121.11 MIT |
| 4 | openllmetry/traceloop-sdk | obs primary tracing | `pip install traceloop-sdk` | HEAD `3735204aa063f4ef12b44395bff8351ac61c6136` v0.60.0 Apache-2.0 |
| 5 | langfuse | obs backend dashboard | Docker compose web+worker+postgres+clickhouse | HEAD `2466d4ce9bc33b24d6ae5c63cc32293555eec0c0` v3.173.0 MIT |
| 6 | litellm | LLM proxy | `pip install 'litellm[proxy]'` OR `docker pull berriai/litellm:latest` | HEAD `934ecdca78daf7ec9514efd47df77bf7495c822d` v1.84.0 MIT |
| 7 | gitleaks | safety secret-scan | `gh release download --repo gitleaks/gitleaks` | NOT-CLONED [HNF — TIER-1 well-known] |

### Tier 2 — ALREADY-INSTALLED

| # | Primitive | Verification |
|---|-----------|--------------|
| 1 | cwc 5 hooks + evaluator + CLAUDE.md | `Z:/claude-sota-installed/.local/cwc/` [VERIFIED] |
| 2 | ralph-loop plugin | `.../marketplaces/claude-plugins-official/plugins/ralph-loop/` [VERIFIED 9 files] |
| 3 | agent-sdk-dev plugin | `.../plugins/agent-sdk-dev/` [VERIFIED 6 files] |
| 4 | frontend-design plugin | `.../plugins/frontend-design/` [VERIFIED 4 files] |
| 5 | CLIProxyAPI v6.9.0 | tag `f81acd076087732a941627eda7ffae23120f10f1` [VERIFIED] |
| 6 | Ollama backend | at `:11700` per memory stack |
| 7 | OpenAI Codex CLI sandbox | via codex-plugin-cc per Section 14.5 |
| 8 | Anthropic CC safety_guard.py | via ECC per Section 14.5 |

### Tier 3 — STUDY-PILOT / CITE-PATTERN-ONLY (26 entries)

Arize Phoenix (Elastic-2.0 disclosure); Comet Opik (alternative to Langfuse); OpenLIT (alt to openllmetry); Helicone (CR-12 class 4); autogen / langgraph / crewAI / mastra / agno (CITE-PATTERN-ONLY); bubblewrap / firejail / gvisor / lima (REJECT Linux-only); awesome-agentic-patterns stop-hook (CITE); anthropic-cookbook (CR-12 class 6 CITE-CLASS-CANONICAL); promptflow (heavy Azure); Honeycomb/Datadog/NewRelic (REJECT proprietary); openai/evals + lm-eval-harness (DEFER CR-6 clone); vectara hallucination (CITE); LangSmith (REJECT proprietary); OWASP llm-top-10 (CITE advisory); protect-mcp + signed-audit-trails (DEFER Phase 7 gate)

---

## 10. Saturation diagnostic

**HONEST-NON-FINDINGS surfaced**:
1. Linux-native sandboxes platform-blocked (bubblewrap/firejail/gvisor/lima) — H1 sub-rejected; use Codex CLI sandbox + WSL2
2. openai/evals + lm-eval-harness NOT-CLONED in `Z:/repos/deps/` — CR-6 fresh clone required
3. lmstudio-ai non-GitHub-native install path — defer per CR-6
4. protect-mcp + signed-audit-trails — Phase 7 fabrication-test gate not run

**Domain saturation**:
- Eval: 3 ADOPT-NOW + 2 DEFER + 1 CITE-CLASS-CANONICAL → NOT-yet-saturated
- Observability: 4 ADOPT-NOW → SATURATED (recommend openllmetry PRIMARY + ONE backend)
- Long-running runtimes: cwc canonical; 6 CITE-PATTERN-ONLY backlog → SATURATED
- Sandbox: PARTIAL (Codex sandbox + cwc kill-switch + safety_guard installed)
- Cron/stop-hook: SATURATED (ralph-loop + cwc commit-on-stop + `/loop` + cite)
- LLM proxy: SATURATED (litellm + CLIProxyAPI + ollama; 2 of 3 installed)
- Defensive: PARTIAL (cwc operator-controls + Codex sandbox + safety_guard; gitleaks Tier-1 recommended)

---

## Honest Conclusion

**H1 NOT REJECTED for 6 of 7 domains** (eval / observability / long-running / cron / LLM-proxy / defensive). **PARTIALLY REJECTED for sandbox layer** (Linux-native fine-grained sandboxes platform-blocked; Codex CLI sandbox + WSL2 path workarounds).

**Cross-model gate satisfaction** (CR-3 strict reading):
- Phase 1 bootstrap exception applies — Tier 1a codex T1-T7 hooks may not yet be runtime-active
- Tier-1 installs in subsequent fires: codex T1 NEEDS-REVISION → Pattern A apply per `codex-t1-fix-forward-pattern.md` required before commit

**Wave 208+ candidate ships**:
1. Tier-1 install batch: inspect_ai + deepeval + promptfoo + traceloop-sdk + gitleaks (5; non-Docker first)
2. Tier-1 Docker batch: langfuse + litellm (heavy compose; defer)
3. CR-6 fresh-clone gap closure: openai/evals + lm-eval-harness
4. Phase 7 gate: protect-mcp + signed-audit-trails fabrication-test

[W207 Agent F persisted via orchestrator-side Write per FM-19 ARTIFACT-INLINE post-completion]
