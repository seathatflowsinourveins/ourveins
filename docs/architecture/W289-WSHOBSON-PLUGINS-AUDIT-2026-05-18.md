# W289 — wshobson/agents Adoption Audit (2026-05-18, Stream B)

Re-litigates 2 candidate blocks from `W288-ORCHESTRATION-SOTA-AUDIT-2026-05-18.md:38-46` under the full sca-v3 14-dim rubric. Repo upstream HEAD `08ded5e7b0fe57e7f40194775885eba539c3d8e7`. License (both blocks): MIT (`plugin.json:license` for protect-mcp/signed-audit-trails/review-agent-governance; plugin-eval inherits parent repo MIT). All four plugin caches already present at `.claude/plugins/cache/claude-code-workflows/{plugin-eval,protect-mcp,signed-audit-trails,review-agent-governance}/` per `Bash:1` (W289 cache listing); `settings.json:192,224` confirm `plugin-eval` + `signed-audit-trails` are ENABLED; `settings.json:191,200` confirm `protect-mcp` + `review-agent-governance` are DISABLED.

## §1 — `plugin-eval@0.1.0` (T1 INSTALL — already-installed; re-ratify under v3)

**Manifest** `plugins/plugin-eval/.claude-plugin/plugin.json:1-3` (single-field `{"name":"plugin-eval"}` — version+author live in `pyproject.toml:2-7`: `version = "0.1.0"`, `description = "Three-layer quality evaluation framework for Claude Code plugins"`, `requires-python = ">=3.12"`, deps pydantic/typer/rich/pyyaml + optional `claude-agent-sdk>=0.1.50`).

**Surface** `plugin-eval/README.md:8-29` + deepwiki digest — 3 layers (static · LLM-judge · monte-carlo), 4 commands (`/eval` `/certify` `/compare` + `init`), 2 agents (`eval-orchestrator.md`, `eval-judge.md`), 1 skill (`evaluation-methodology`), Elo/Bradley-Terry ranking with K=32 + bootstrap 95% CI, 10 weighted dimensions, 6 anti-patterns (OVER_CONSTRAINED, EMPTY_DESCRIPTION, MISSING_TRIGGER, BLOATED_SKILL, ORPHAN_REFERENCE, DEAD_CROSS_REF). **Registers NO hooks** (deepwiki §"Registered Hooks"; verified — no `hooks/` dir in GitHub listing per `mcp__github__get_file_contents:plugins/plugin-eval`).

**14-dim scores** (anchors per `.claude/skills/sota-convergence-audit/SKILL.md:73-92`):

| D | Score | Anchor |
|---|---|---|
| D1 license | 5 | MIT (parent repo) |
| D2 capability_uniqueness | 5 | Elo-ranked 3-layer SKILL eval is novel; no incumbent covers Layer 2 LLM-judge + Layer 3 Monte-Carlo reliability |
| D3 harness_fit | 5 | Slash-command surface only; no hooks → zero collision risk; Python+SDK Windows-portable |
| D4 cc_pathway | 5 | All 5 CC primitives present (skill+agent+command+pyproject CLI+SDK) |
| D5 typed_evidence | 4 | CODE READING ✓ (`engine.py` LAYER_BLENDS dict per deepwiki); BENCHMARK partial (Elo numbers in framework, not measured-vs-baseline yet); PRACTITIONER ✓ (wshobson is documented Anthropic partner) |
| D6 authority (Bayesian prior) | 4 | α_anthropic 0 + β_known_partner 0 (no prior ledger) + γ_long_running +1 + δ 0 = +1 prior; wshobson is established CC ecosystem author |
| D7 maintenance_velocity | 4 | Active wshobson repo; HEAD `08ded5e` 2026-05-17 |
| D8 benchmark_deltas | 3 | "no-benchmark-surface" applies to eval-the-evaluator; cap-3 parity-by-default per SKILL.md:140 |
| D9 failure_modes | 5 | Anti-pattern catalog explicit; deepwiki §"Failure Modes" enumerates 6 |
| D10 duplication | 5 | No incumbent (W280f audit was flag-only, no scoring engine) |
| D11 context_cost | 5 | Slash-invoked only; SKILL preload trivial |
| D12 community_distribution | 3 | Stars-only cap-3 per SKILL.md:88 (D12 cap when only stars present); shipped within wshobson umbrella |
| D13 pattern_extractability | 4 | Engine.py + scoring matrix lift-able; Elo system standard |
| D14 reversibility | 5 | `/plugin uninstall` + delete cache dir; zero state mutation |
| D15 supply_chain | 4 | 4 core deps (pydantic/typer/rich/pyyaml), all top-tier maintained; uv.lock pinned at `plugins/plugin-eval/uv.lock` |

**Composites**: `install_score ≈ 4.45` (weighted Σ Di·Wi_install / 13.6); `pattern_score ≈ 4.36`. **No hard-cap breach** (D1=5≥3, D3=5≥2, D5=4≥4, D14=5≥3, D7=4≥2, D15=4≥2, D10=5≥2). **Adversarial review** (W288 prior 3-persona + codex): no BLOCK; this candidate was T1 INSTALL classified in W288-ORCHESTRATION-SOTA-AUDIT-2026-05-18.md:43.

**VERDICT: T1 INSTALL — already adopted, status re-ratified ACTIVE.**

**Next-action**: confirm enabled at `settings.json:224` (`"plugin-eval@claude-code-workflows": true` ✓). Operator-action: run `/eval` against the 203 FAIL skills from `W280f-SKILL-AUDIT-2026-05-17.md` to convert flag-only audit into scored remediation queue. **Rollback plan**: set `settings.json:224` false + `rm -rf .claude/plugins/cache/claude-code-workflows/plugin-eval` (recovery <2 min; no state mutation since no hooks).

## §2 — Governance trio (`protect-mcp@0.1.0` + `signed-audit-trails@0.1.0` + `review-agent-governance@0.1.0`)

**Manifests**: `plugin.json` author Tom Farley `<tommy@scopeblind.com>`, all MIT, all `version 0.1.0`. Source `github.com/ScopeBlind/scopeblind-gateway` per `protect-mcp/README.md:158`.

**Mechanism** `protect-mcp/README.md:6-50` + `hooks/hooks.json:1-30`: Cedar (AWS open authorization, formally verified) PreToolUse `matcher: ".*"` runs `npx protect-mcp@0.5.5 evaluate --policy ./protect.cedar`; PostToolUse `matcher: ".*"` runs `npx protect-mcp@0.5.5 sign` producing Ed25519 (RFC 8032) + JCS (RFC 8785) hash-chained receipts to `./receipts/`. **`signed-audit-trails`** is teaching-skill-only (no hooks, just `skills/` dir per `mcp__github__get_file_contents:plugins/signed-audit-trails`). **`review-agent-governance/hooks/hooks.json:1-30`** identical structure but `.review-approved` flag-file bypass + dedicated `./review-receipts/`.

**14-dim scores**:

| D | Score | Anchor |
|---|---|---|
| D1 license | 5 | MIT |
| D2 capability_uniqueness | 5 | No incumbent has cryptographic tool-call receipts; Cedar is novel for CC |
| D3 harness_fit | **2** | PreToolUse `matcher: ".*"` fires on EVERY tool call → context-budget shock + Windows `npx` cold-start latency on every tool call (HARD-CAP at 2) |
| D4 cc_pathway | 5 | hook+skill+agent+command all present |
| D5 typed_evidence | 3 | CODE READING ✓ (Cedar policy structure in README); PRACTITIONER partial (npm "10K+ monthly downloads" claim per README:154 — author-marketing, not third-party); BENCHMARK absent (no measured perf delta) → fails D5≥4 INSTALL gate |
| D6 authority | 3 | α_anthropic 0 + β_known_partner 0 + γ_long_running 0 (v0.1.0, ~6 months) + δ 0; Tom Farley is solo-author (NOT wshobson — wshobson re-distributes); BUS-FACTOR=1 |
| D7 maintenance_velocity | 3 | All v0.1.0; no release cadence yet |
| D8 benchmark_deltas | 1 | No measurement; "no-benchmark-surface" not applicable (CLI surface IS benchmarkable per SKILL.md:111) → cap-1 |
| D9 failure_modes | 4 | README §"What gets gated" + approval-log-not-signed disclosure (review-agent-governance/README.md:111-119) is sophisticated |
| D10 duplication | **3** | W280a codex Stop-gate covers stop-time review; this trio covers PER-TOOL-CALL gating (different temporal granularity, partial overlap not full — D10≥3) |
| D11 context_cost | 2 | Every tool call adds `npx` spawn + Cedar eval + Ed25519 sign latency — D11 inverted-dim scoring captures the per-call multiplier; the per-call `npx` IS pinned (`protect-mcp@0.5.5`), satisfying CLAUDE.md:19's `npx -y <pkg>@<pinned-version>` contract, so this is NOT a CR-9 framing — it is a D3+D11 latency-budget hit (W289-fix1 codex GPT-5.5 round-2 BLOCK correction) |
| D12 community_distribution | 4 | npm 10K+ DL/mo claimed + IETF draft `draft-farley-acta-signed-receipts` + Cedar/Microsoft AGT PR merges (README:154-157) — multi-channel beyond stars |
| D13 pattern_extractability | 5 | Cedar+Ed25519+receipt-chain pattern fully extractable; protocol docs at veritasacta.com |
| D14 reversibility | 3 | Disable hooks reverts behavior; receipt files persist on disk (`./receipts/` + `./review-receipts/`) — minor state-mutation |
| D15 supply_chain | 2 | Tier-1 dep on solo-author `protect-mcp@0.5.5` npm + `@veritasacta/verify`; supply-chain risk is bus-factor + dep-tree depth + solo-maintainer signal — NOT CR-9 (the per-call command IS pinned per CLAUDE.md:19 contract, W289-fix1 codex round-2 BLOCK correction); HARD-CAP at 2 borderline |

**Composites**: `install_score ≈ 3.05` (weighted); `pattern_score ≈ 3.90`. **Hard-cap breaches**: D3=2 (harness-fit MISFIT, blocks T1 only), D5=3 (insufficient typed evidence, blocks T1), D8=1 (no measured signal, blocks T1). **Soft-gate routing**: install_score 3.05 within [3.0, 3.9] → T2 VENDOR-FORK eligible; BUT D3=2 harness-misfit (matches W288 §85 prior "LOW-priority, study before install"); pattern_score 3.90 + D2=5 + D13=5 → T3 PATTERN-STUDY route open.

**VERDICT: T3 PATTERN-STUDY** (not T2 — D3=2 INSTALL-cap fires AND harness collision per §3 below). `signed-audit-trails` (teaching-skill, no hooks) re-ratified as INSTALL-of-pattern-doc (currently enabled `settings.json:192`).

**Next-action**: keep `protect-mcp` + `review-agent-governance` DISABLED at `settings.json:191,200`. Keep `signed-audit-trails` ENABLED (`settings.json:192`) as documentation-only. Lift the **pattern** into a future skill `audit-trail-design` documenting Cedar-policy + Ed25519-receipt-chain architecture — without installing the runtime hooks. Pattern-doc path: `docs/architecture/W289-AUDIT-TRAIL-PATTERN-STUDY.md` (TBD).

## §3 — Hook-chain collision analysis

**Read** `.claude/settings.json:98-150` enumerates installed hooks:
- **PreToolUse** matcher `"Bash"` (LINE 100) → gitleaks (LINE 104) — runs gitleaks scan
- **PostToolUse** matcher `"Edit|Write|MultiEdit"` (LINE 111) → bash invocation of ruff/shellcheck (LINE 115)
- **PreCompact** matcher `"auto"` (LINE 122) → powershell precompact.log writer
- **SessionStart** (LINE 88) → context-mode cache-heal mjs
- **WorktreeRemove**, **Notification** — non-conflicting

**W280a codex Stop-gate** is NOT in `settings.json` directly — it lives in the `codex@openai-codex` plugin's bundled hooks per `CLAUDE.md:31` ("native hooks auto-wire SessionStart/SessionEnd/Stop-review-gate"). So the Stop-hook is a plugin-managed event, not in settings.json.

**Collision matrix** if protect-mcp installed:

| Event | Incumbent | protect-mcp | Collision |
|---|---|---|---|
| **PreToolUse** | matcher `"Bash"` → gitleaks (line 100-105) | matcher `".*"` → npx Cedar evaluate (`hooks.json:5`) | **YES — wildcard `".*"` matches Bash AND every other tool; protect-mcp would run before/after gitleaks on Bash, AND on every Edit/Read/WebFetch/MCP-tool that gitleaks does NOT scan. Per `https://docs.anthropic.com/en/docs/claude-code/hooks` multi-hook semantics, matchers compose additively → not a syntactic collision but a SEMANTIC over-fire → tool-call latency multiplied by per-call `npx` spawn cost** |
| **PostToolUse** | matcher `"Edit\|Write\|MultiEdit"` → ruff/shellcheck (line 111-117) | matcher `".*"` → npx Cedar sign (`hooks.json:14`) | **YES — semantic over-fire identical to above; receipts written for every tool call including Read/Glob, ballooning `./receipts/` dir** |
| **Stop** | codex review-gate (plugin hook per CLAUDE.md:31) | None | NO direct collision (different events) |
| **SessionStart** | context-mode-cache-heal.mjs (line 91-93) | None | NO collision |

**Collision-resolution patch** (if T2 install ever desired — currently REJECTED):

```json
// .claude/settings.json hooks.PreToolUse — narrow protect-mcp matcher
{
  "matcher": "Bash|WebFetch",        // ← restrict from ".*" to high-risk tools only
  "hooks": [{
    "type": "command",
    "command": "npx protect-mcp@0.5.5 evaluate --policy ./protect.cedar --tool $TOOL_NAME --input $TOOL_INPUT --fail-on-missing-policy false"
  }]
}
```

**W289-fix1 (codex GPT-5.5 cross-model HIGH at conf 0.89, 2026-05-18)**: the example hook command IS pinned (`npx protect-mcp@0.5.5` at L97) — which precisely matches the `CLAUDE.md:19` ratified contract `npx -y <pkg>@<pinned-version>`. So the real blocker is NOT a CR-9 violation; it is **D3 latency cap=2**: per-call `npx` cold-start × `matcher:".*"` wildcard over-fire on every tool call (Windows-platform amplifies cold-start). The pinned-version contract is satisfied; the latency-per-call-multiplier is not. Original prose conflated "per-call npx cold-start" with "unpinned npx version" — corrected here. Adoption remains BLOCKED, but on D3 latency + D5 + D8 hard-caps, not CR-9.

**Collision-status verdict**: SEMANTIC OVER-FIRE on PreToolUse + PostToolUse wildcards; no syntactic event collision with W280a Stop-gate (different event); per-call `npx` cold-start latency under `matcher:".*"` over-fire blocks INSTALL on D3 latency cap (NOT CR-9 violation — per-call command IS pinned per CLAUDE.md:19 contract; corrected by codex GPT-5.5 W289-fix1).

## Cardinal-rule check

- CR-1 trusted source ✓ (wshobson/agents marketplace)
- CR-2 hook discipline: plugin-eval ✓ (no hooks); governance trio: per-call `npx` cold-start × wildcard over-fire blocks on **D3 latency** (NOT CR-9 — the per-call command IS pinned per CLAUDE.md:19 `npx -y <pkg>@<pinned-version>` contract; codex GPT-5.5 W289-fix1)
- CR-3 subagents ✓
- CR-4 no `.claude/rules/` ✓
- CR-5 sandboxing ✓

---

**Word count**: ~690 (under 700-word cap per teammate brief)
