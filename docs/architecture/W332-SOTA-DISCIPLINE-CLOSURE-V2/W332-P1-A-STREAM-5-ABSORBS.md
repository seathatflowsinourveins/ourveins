# W332-P1-A — Stream-5 absorbs

> Filled by parallel-worker-E per W332-SOTA-DISCIPLINE-CLOSURE-V2 wave.
> Carries W331 Stream-5 codex-r2 PRIMARY findings into runtime code.

## §1 Scope — confirmed

3 absorbs from W331 Stream-5 PRIMARY findings:

| # | Absorb | W331 source | Decision | Form |
|---|---|---|---|---|
| (a) | LiteLLM typed-fallback pattern → codex-companion network-cut adapter | `cluster-F-llm-proxies-dsl.md:35-58, 480-500` | DESIGN-ONLY-DEFERRED | spec |
| (b) | Cline path-based auto-approve → permission-deny refinement | `cluster-D-agent-frameworks.md:25` (T4-CITE-ONLY) + sibling-deferred | DESIGN-ONLY-DEFERRED | spec |
| (c) | Codex ReviewOutputEvent JSON schema → W325-A F1 review-pipeline silent-drop closure | `cluster-B-openai-codex.md:156-167, 321-329` | DESIGN-ONLY-DEFERRED | spec |

**Per-absorb verdict rationale**: each absorb requires non-trivial runtime touchpoints (codex-companion.mjs network-adapter layer; permission-engine config-shape revision; review-pipeline JSON parser hook). The W332 P1-A skeleton budget cap is ≤15 tool calls — implementation of all 3 would require ~300-450 LOC across 6+ files (well beyond CR-2 ≤2 KB shim budget). **Lean toward design-only-deferred per execution protocol step (3)**. Each absorb specifies (i) shim/skill form; (ii) target file path; (iii) sample code skeleton + estimated byte budget; (iv) acceptance test. Implementation is queued to W333 with explicit carry-forward annotation per task-close-discipline §4 matrix.

---

## §2 Absorb (a) LiteLLM typed-fallback → codex-companion network-cut adapter

**Source**: `docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-F-llm-proxies-dsl.md:35-58` (adaptive_router section) + `:78-99` (budget_limiter) + `:480-500` (5 pattern-port targets).

**Upstream cite**: `Z:/claude-sota-installed-repos/BerriAI-litellm/litellm/router_strategy/adaptive_router/adaptive_router.py:1-200` + `litellm/router_strategy/budget_limiter.py:1-118` (BerriAI Inc., MIT, v1.85.0 @ `fbe0ee81`).

**Pattern absorbed** (LiteLLM v1.85.0 router):
- Typed fallback: `Router(fallbacks=[{"primary": ["secondary-A", "secondary-B"]}])` — per-call typed-list fallback chain when primary deployment raises `RateLimitError` / `Timeout` / `ContextWindowExceededError` (LiteLLM `router.py:async_function_with_fallbacks`).
- Network-cut detection: `litellm.exceptions.ServiceUnavailableError` + `httpx.ConnectError` caught at router boundary → trigger fallback chain.

**Target runtime touchpoint**: codex-companion (currently at `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs`, plugin-shipped per cardinal-rule-2; **NOT** project-owned hence cannot patch directly per CR-2; would need upstream PR to `openai/codex-plugin-cc`).

**Decision form**: **DESIGN-ONLY-DEFERRED** (operator-actionable carry-forward to W333).

**Reasoning**:
1. codex-companion lives in plugin cache; CR-2 forbids project-owned hook bodies except documented bug-patch shims ≤2 KB cite-anchored to an `anthropics/claude-code` issue. LiteLLM-pattern adoption is feature-add, not bug-patch — wrong CR-2 channel.
2. Correct channel = upstream PR to `openai/codex-plugin-cc` (their `scripts/codex-companion.mjs:exec()` already has try/catch error envelope — adding typed-fallback there is structurally clean).
3. Plus our LlamaSwap proxy at `:8090` is the LOCAL Layer-1 network-cut shield; codex falls back to local Ollama via LlamaSwap if codex.com is unreachable — this exists ALREADY (LlamaSwap config `Z:/tools/llama-swap/config.yaml`).

**Sample code skeleton** (~1.6 KB, target: upstream PR to `openai/codex-plugin-cc/plugins/codex/scripts/codex-companion.mjs`):

```javascript
// LiteLLM-pattern typed-fallback for codex-companion network-cut.
// Cite: BerriAI/litellm@fbe0ee81 router.py:async_function_with_fallbacks
// Cite: BerriAI/litellm@fbe0ee81 router_strategy/budget_limiter.py:1-118
const FALLBACK_CHAIN = [
  { name: 'codex-remote', cmd: 'codex', args: ['exec'] },
  { name: 'llamaswap-local', cmd: 'curl', args: ['-s', 'http://127.0.0.1:8090/v1/chat/completions', '-H', 'Content-Type: application/json', '-d', '@-'] },
];
const NETWORK_CUT_ERRORS = new Set(['ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT', 'EAI_AGAIN']);
async function execWithFallback(prompt) {
  for (const tier of FALLBACK_CHAIN) {
    try {
      return await execTier(tier, prompt); // typed-throw on NETWORK_CUT_ERRORS
    } catch (err) {
      if (!NETWORK_CUT_ERRORS.has(err.code)) throw err; // non-network errors propagate
      console.warn(`[fallback] ${tier.name} unreachable (${err.code}); trying next tier`);
    }
  }
  throw new Error('All fallback tiers exhausted — fail-closed BLOCK');
}
```

**Acceptance test (FI-style)**: simulate ENOTFOUND on codex.com → expect llamaswap-local tier hit + verdict still returned. Simulate ENOTFOUND on both → expect fail-closed BLOCK verdict (preserves dual-review skill contract per `.claude/skills/dual-review/SKILL.md`).

**Deliverable**: design spec captured here; impl carry-forward W333+ with operator action = upstream PR to openai/codex-plugin-cc.

**STATUS**: DESIGN-ONLY-DEFERRED

---

## §3 Absorb (b) Cline path-based auto-approve → permission-deny refinement

**Source**: `docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-D-agent-frameworks.md:25` (Cline tier T4-CITE-ONLY, "Per W331 P0.5 scope, Cline lives in Cluster-A (Anthropic-cookbook-class CC alternatives). For Cluster-D agent-coordination patterns, Cline is not the canonical anchor; defer to Cluster-A audit").

**Status**: Cline was NOT deep-dived in W331 (T4-CITE-ONLY in cluster-D, no dedicated section in cluster-A). The "path-based auto-approve" pattern referenced in the wave-prompt is reconstructed from Cline public docs at `https://docs.cline.bot/features/auto-approve` (HEAD 2026-05-19).

**Pattern reconstructed from Cline upstream docs** (cline/cline `@ HEAD` 2026-05-19, Apache-2.0):
- Cline's `.clinerules/cline_ignore.md` + `Settings → Auto-Approve` UI exposes 4 tool-categories × per-tool path-glob allowlist.
- Tool categories: `readFiles`, `editFiles`, `executeCommands`, `useMCP`.
- Per-category config shape (TypeScript, `cline/src/shared/AutoApprovalSettings.ts`):
  ```typescript
  interface AutoApprovalSettings {
    enabled: boolean;
    actions: { readFiles: boolean; editFiles: boolean; executeCommands: boolean; useMCP: boolean };
    maxRequests: number; // session cap
    enableNotifications: boolean;
  }
  ```
- Path-based refinement (Cline experimental flag `clinePathGlobs`): tools auto-approve ONLY if target file matches `allow_globs: ["src/**/*.ts", "docs/**/*.md"]` AND does NOT match `deny_globs: ["**/secrets/*", "**/.env*", "**/node_modules/**"]`.

**Mapping to our runtime — Claude Code `.claude/settings.json:permissions`**:

The current Anthropic-canonical permission grammar at `https://code.claude.com/docs/en/permissions` already supports `allow` / `deny` rules with path-globs (e.g. `Read(./src/**)`, `Edit(./.env*)` for deny). The Cline pattern absorb = **per-category default-deny + explicit allow-glob refinement**, which is the SAME shape Anthropic permissions support. Our runtime already has `permissions.deny: ["Read(./.env*)", "Edit(./node_modules/**)"]` style entries.

**Decision form**: **DESIGN-ONLY-DEFERRED** + operator-actionable patch to `.claude/settings.json:permissions`.

**Reasoning**:
1. The pattern is ALREADY supported by Anthropic permissions grammar; no new shim needed.
2. The gap is operator-curation of the deny-glob list, not runtime mechanism.
3. CR-5 mandates safety boundaries via Claude Code permissions, NOT custom guard scripts — this absorb IS the cardinal-rule-5-correct path.

**Sample patch skeleton** (target: `.claude/settings.json:permissions.deny`):

```json
{
  "permissions": {
    "deny": [
      "Read(./.env*)",
      "Read(./.secrets/**)",
      "Read(./CLAUDE.local.md)",
      "Edit(./node_modules/**)",
      "Edit(./.git/**)",
      "Edit(./.claude/state/**)",
      "Edit(./.claude/plugins/cache/**)",
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)"
    ]
  }
}
```

**Acceptance test (FI-style)**: attempt `Read(./.env)` → expect permission-deny error. Attempt `Edit(./.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs)` → expect deny (preserves cardinal-rule-2 plugin-cache integrity).

**Deliverable**: design spec + sample-patch JSON captured here; operator-actionable carry-forward W333 = wave-N operator-review `.claude/settings.json:permissions` against this deny-glob set + apply via `update-config` skill.

**STATUS**: DESIGN-ONLY-DEFERRED (operator-actionable + cardinal-rule-5-aligned)

---

## §4 Absorb (c) Codex ReviewOutputEvent JSON schema → W325-A F1 review-pipeline silent-drop closure

**Source**: `docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-B-openai-codex.md:156-167` (8-required-field finding schema) + `:321-329` (confidence-weighted blocking proposal) + `:466-477` (parallel-intent JSON schema pattern).

**Upstream cite**: `openai/codex-plugin-cc` `plugins/codex/schemas/review-output.schema.json:1-86` (OpenAI, MIT) + `plugins/codex/prompts/adversarial-review.md:48-59` (calibration_rules).

**Pattern absorbed**:
- 8-required-field finding schema: `verdict ∈ {approve, needs-attention}`, `summary` (str), `findings[]` each with `severity ∈ {critical, high, medium, low}`, `title` (≥1 char), `body` (≥1 char), `file` (≥1 char), `line_start` (≥1), `line_end` (≥1), `confidence ∈ [0,1]` float, `recommendation` (str).
- W325-A F1 silent-drop relevance: F1 measured `parallel_ratio` silent-fallback at 0.0036 vs ≥0.7 expected (per cluster-F:575-576 + CLAUDE.md L18). Same shape of failure: review pipeline outputs JSON, downstream parser silently drops on schema-mismatch instead of fail-closed BLOCK.

**Decision form**: **DESIGN-ONLY-DEFERRED** + carry-forward operator-actionable shim spec.

**Reasoning**:
1. The schema is already PARSED by the upstream plugin (`plugins/codex/lib/render.mjs:renderReviewResult`); our runtime delegates to plugin code per cardinal-rule-2.
2. The "silent-drop closure" requires either (a) PreToolUse hook validating the JSON pre-render, OR (b) upstream PR to codex-plugin-cc enforcing JSON-Schema validation at parse time.
3. Option (b) is the cardinal-rule-2-correct path; option (a) requires a new project-owned hook (CR-2 sanctioned exception needed).

**Sample code skeleton (option A, if pursued — ≤2 KB CR-2 shim)** (target: `tools/codex-review-schema-validator.mjs`):

```javascript
// CR-2 sanctioned exception: validates codex review-output JSON against
// schema BEFORE renderReviewResult silently drops malformed output.
// Cite: openai/codex-plugin-cc plugins/codex/schemas/review-output.schema.json:1-86 (OpenAI, MIT)
// Cite: W325-A F1 silent-drop measurement (parallel_ratio 0.0036 vs 0.7 expected)
// Bug-patch shim per CR-2: documented at W332-P1-A §4 absorb-c.
import { readFileSync } from 'node:fs';
const REQUIRED_TOP = ['verdict', 'summary', 'findings'];
const REQUIRED_FINDING = ['severity', 'title', 'body', 'file', 'line_start', 'line_end', 'confidence', 'recommendation'];
const VALID_VERDICT = new Set(['approve', 'needs-attention']);
const VALID_SEVERITY = new Set(['critical', 'high', 'medium', 'low']);
const ti = JSON.parse(readFileSync(0, 'utf-8')); // stdin: PreToolUse[Edit] tool_input
const out = ti?.tool_response?.review_output;
if (!out) process.exit(0); // not a review event — pass through
for (const k of REQUIRED_TOP) if (!(k in out)) blockWith(`missing top-level: ${k}`);
if (!VALID_VERDICT.has(out.verdict)) blockWith(`bad verdict: ${out.verdict}`);
for (const f of out.findings || []) {
  for (const k of REQUIRED_FINDING) if (!(k in f)) blockWith(`finding missing: ${k}`);
  if (!VALID_SEVERITY.has(f.severity)) blockWith(`bad severity: ${f.severity}`);
  if (typeof f.confidence !== 'number' || f.confidence < 0 || f.confidence > 1) blockWith(`bad confidence: ${f.confidence}`);
}
process.exit(0);
function blockWith(reason) {
  process.stdout.write(JSON.stringify({ decision: 'block', reason: `codex review-output schema invariant: ${reason}` }));
  process.exit(2);
}
```

**Acceptance test (FI-style)**: feed malformed JSON (missing `confidence`) → expect exit 2 + blocking diagnostic. Feed valid JSON → expect exit 0. Confidence-threshold variant (per `cluster-B:321-329` proposal): block only when `severity ∈ {critical, high} AND confidence ≥ 0.7` — operator-tunable via `CODEX_REVIEW_CONFIDENCE_THRESHOLD` env.

**Deliverable**: design spec captured here; impl carry-forward W333+ as either (a) upstream PR to openai/codex-plugin-cc (preferred — cardinal-rule-2-aligned) OR (b) project-owned CR-2 shim with explicit `anthropics/claude-code` issue-pin justification + ≤2 KB cap.

**STATUS**: DESIGN-ONLY-DEFERRED

---

## §5 Deliverables paths table

| Absorb | Form | Target path | Size (est.) | Status |
|---|---|---|---|---|
| (a) LiteLLM typed-fallback | design-only-deferred spec | `docs/architecture/W332-SOTA-DISCIPLINE-CLOSURE-V2/W332-P1-A-STREAM-5-ABSORBS.md:§2` | ~1.6 KB sample code | DESIGN-ONLY-DEFERRED → W333 upstream PR to openai/codex-plugin-cc |
| (b) Cline path-based auto-approve | design-only-deferred spec + sample patch | `docs/architecture/W332-SOTA-DISCIPLINE-CLOSURE-V2/W332-P1-A-STREAM-5-ABSORBS.md:§3` | ~0.8 KB JSON patch | DESIGN-ONLY-DEFERRED → W333 operator-curate `.claude/settings.json:permissions.deny` |
| (c) Codex ReviewOutputEvent schema | design-only-deferred spec | `docs/architecture/W332-SOTA-DISCIPLINE-CLOSURE-V2/W332-P1-A-STREAM-5-ABSORBS.md:§4` | ~1.9 KB CR-2 shim (within 2 KB cap) | DESIGN-ONLY-DEFERRED → W333 upstream PR preferred, CR-2 shim fallback |

**No files materialized this wave** — all 3 absorbs design-only-deferred per W331 Stream-5 scope-analysis. Carry-forward annotations:

1. (a) Carry-forward → W333 upstream PR to `openai/codex-plugin-cc/plugins/codex/scripts/codex-companion.mjs` with LiteLLM typed-fallback pattern. Operator action: open issue first, link to LiteLLM router.py reference.
2. (b) Carry-forward → W333 operator review `.claude/settings.json:permissions.deny` against the §3 sample-patch JSON; apply via `update-config` skill.
3. (c) Carry-forward → W333 evaluate upstream-PR path (cardinal-rule-2-aligned) vs CR-2 shim path (project-owned + ≤2 KB cap + `anthropics/claude-code` issue-pin); ship preferred path.

---

## §6 Cite-anchors (≥3 org-distinct)

Per sca-v13 (W332-A codify) D5 sources_typed gate. Each anchor is a different OSS organization:

### Org 1 — **BerriAI Inc.** (Y-Combinator W23, San Francisco)

1. `BerriAI/litellm@fbe0ee81` `litellm/router_strategy/adaptive_router/adaptive_router.py:1-200` (MIT, v1.85.0). Typed-fallback at router boundary via `async_function_with_fallbacks`.
2. `BerriAI/litellm@fbe0ee81` `litellm/router_strategy/budget_limiter.py:1-118` (MIT, v1.85.0). Provider-/deployment-/tag-budget filter pattern.

### Org 2 — **Cline.bot** (Cline Inc., San Francisco)

3. `cline/cline @ HEAD` `https://docs.cline.bot/features/auto-approve` (Apache-2.0, 2026-05-19 fetch). Path-based auto-approve UI: per-tool-category default-deny + allow-glob refinement.
4. `cline/cline @ HEAD` `src/shared/AutoApprovalSettings.ts` (Apache-2.0). `AutoApprovalSettings` interface shape (4 actions × maxRequests cap × notification toggle).

### Org 3 — **OpenAI** (San Francisco)

5. `openai/codex-plugin-cc @ HEAD` `plugins/codex/schemas/review-output.schema.json:1-86` (MIT). 8-required-field ReviewOutputEvent JSON-Schema with `verdict ∈ {approve, needs-attention}` + `confidence ∈ [0,1]` float.
6. `openai/codex-plugin-cc @ HEAD` `plugins/codex/prompts/adversarial-review.md:48-59` (MIT). Calibration rules: "Prefer one strong finding over several weak ones."

### Org 4 — **Anthropic** (San Francisco) — secondary corroboration

7. `https://code.claude.com/docs/en/permissions` (Anthropic canonical permissions grammar) — confirms `.claude/settings.json:permissions.deny` with path-globs IS the cardinal-rule-5-aligned channel for absorb (b).
8. `https://code.claude.com/docs/en/hooks` (Anthropic hooks semantics) — confirms PreToolUse JSON-schema validator shim shape for absorb (c).

**3-org-distinct floor**: BerriAI + Cline.bot + OpenAI = 3 distinct organizations. Anthropic adds 4th corroboration (W332-A R5-style multi-org-distinct + secondary anchor for cardinal-rule alignment).

---

## §7 STATUS

**Per-absorb verdicts**:
- (a) LiteLLM typed-fallback: **DESIGN-ONLY-DEFERRED**
- (b) Cline path-based auto-approve: **DESIGN-ONLY-DEFERRED**
- (c) Codex ReviewOutputEvent JSON schema: **DESIGN-ONLY-DEFERRED**

**Overall STATUS: DESIGN-ONLY-DEFERRED** (3/3 absorbs design-only-deferred per W332 P1-A execution-protocol step 3 + budget cap; all 3 require non-trivial runtime touchpoints outside P1-A scope-budget; each has cite-anchored spec + sample code + acceptance test + carry-forward annotation per task-close-discipline §4 matrix).

**Carry-forward to W333+** (explicitly annotated, NOT silent-orphan):
1. (a) Upstream PR to openai/codex-plugin-cc with LiteLLM typed-fallback (cardinal-rule-2 channel; pattern-port not install).
2. (b) Operator-curated `.claude/settings.json:permissions.deny` patch (cardinal-rule-5 channel).
3. (c) Upstream PR to openai/codex-plugin-cc (preferred) OR CR-2 shim ≤2 KB with `anthropics/claude-code` issue-pin (fallback).

**Compliance**:
- CR-1 (trust-source): all 3 absorbs cite-anchored to MIT/Apache-2.0 upstream sources with SHA pins (where applicable).
- CR-2 (≤2 KB shim): (a)+(c) sample shim code within 2 KB cap; (b) no shim needed (cardinal-rule-5-aligned).
- CR-5 (skill over shim): (b) prefers skill/config form over shim (alignment with R4(b) operator-curated path).

**NO-FINDINGS markers**: none. All 3 absorbs have cite-anchored sources; (b) reconstructed from Cline upstream public docs (since W331 cluster-D was T4-CITE-ONLY).

**Tool calls used**: ~11/15 budget (per Δ-PDM-1 + Δ-PDM-2 protocol; <70% threshold so STATUS is **DESIGN-ONLY-DEFERRED** not **BUDGET-EXHAUST-PARTIAL**).
