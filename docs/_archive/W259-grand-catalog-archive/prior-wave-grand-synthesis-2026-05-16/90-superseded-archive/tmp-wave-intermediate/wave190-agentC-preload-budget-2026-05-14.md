# Wave 190 Agent C Preload Budget Review

STAND-IN-NOTICE: Requested REAL GPT-5.5 bridge dispatch via
`codex exec --skip-git-repo-check --color never -m gpt-5.5` was attempted twice.
Both attempts failed before model dispatch:

```text
Error: failed to initialize in-process app-server client: Access is denied. (os error 5)
```

Therefore this artifact is a fallback synthesis from local probes, not a real
GPT-5.5 adversarial verdict. Per user instruction, final verdict is BLOCK.

## D1 - Taxonomy Review

Target taxonomy:

- TIER-1: install-class
- TIER-2: cite-adapted resolves
- TIER-3a: novel-with-documented-rationale
- TIER-3b: novel-WITHOUT-rationale

Adversarial finding: the taxonomy is directionally useful, but too coarse for an
automated hook classifier because it conflates provenance, freshness, and
substantive adaptation quality.

False-positive risk: cite marker presence is not enough. A hook can contain
`TIER-1`, `SOTA`, `[VERIFIED]`, a URL, or a HEAD SHA while still failing the
actual standard:

- the cite may point to README prose rather than the operative implementation;
- the cited source may describe a different harness shape;
- the local hook may implement extra behavior not present in the cited source;
- the cite may be decorative and not map to a specific local decision;
- `[VERIFIED]` can prove a source existed, not that the local adaptation follows it.

False-negative risk: genuine SOTA-sourced hooks can look novel when cite anchors
go stale or move. A renamed upstream file, changed HEAD, line drift, vendored
artifact, or parent rule split can make a valid implementation fail a naive
marker/line resolver even though the mechanism was originally sourced correctly.

Recommended refinement:

1. Split provenance from evidence quality:
   `origin_class` = install / vendored / cite-adapted / local-composition / novel.
   `evidence_status` = resolved-fresh / resolved-stale / unresolved / absent.
   `adaptation_delta` = mechanical-copy / parameterized / semantic-adaptation /
   behavior-extension.
2. Promote TIER-2 only when the cited source resolves to a specific file:line at
   a pinned revision and the local hook decision can be mapped to that cite.
3. Add `TIER-2S stale-but-plausible` for stale cites that resolve by file history
   or adjacent current code. This should warn and require refresh, not demote
   straight to novel.
4. Add `TIER-2D decorative-cite` for cite markers that resolve but do not support
   the implemented behavior. This should fail if used as a shipping gate.
5. Keep TIER-3a only for documented genuine gaps with explicit rationale,
   non-finding evidence, and reevaluation trigger.
6. Treat TIER-3b as BLOCK for architectural hooks unless the hook is disabled,
   quarantined, or purely diagnostic with no enforcement effect.
7. Require hooks to emit classification fields mechanically:
   `origin_class`, `source_uri`, `source_rev`, `source_lines`,
   `source_resolves`, `adaptation_delta`, `rationale_uri`, `freshness_checked_at`.

## D2 - Session-Preload Audit

CCBP source checked:
`Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD f8468e871ed372f2807aa9d3ca7ca91eca7db422`.
Those lines distinguish immediate ancestor `CLAUDE.md` loading from lazy
descendant loading. Repo adaptation in `CLAUDE.md:74` states the local convention:
rule files without `paths:` are always loaded; conditional files with `paths:`
are lazy/scoped.

Probe method:

```powershell
$files = Get-ChildItem .claude/rules -Filter *.md
$rows = foreach ($f in $files) {
  $hasPaths = Select-String -LiteralPath $f.FullName -Pattern '^paths:' -Quiet
  [pscustomobject]@{ file=$f.Name; load_class=if($hasPaths){'lazy'}else{'always'} }
}
$rows | Group-Object load_class
```

Result:

- total_rules: 64
- always_load: 3
- lazy_load: 61
- reducible_pct: 95.3125%

Always-loaded rules:

- `cardinal-rule-8-full-sota-content.md`
- `fm21-queue-time-prompt-freeze.md`
- `named-failure-modes.md`

Lazy/scoped rules:

- `advanced-agent-team-standing-directive.md`
- `agent-harness-fit-verification.md`
- `ahfv-codex-rescue-blind-spot.md`
- `ahfv-probe-dag.md`
- `ahfv-seven-sub-classes.md`
- `audit-action-loop.md`
- `auto-compact-discipline.md`
- `canonical.md`
- `cardinal-rule-11-meta-process-sota.md`
- `cardinal-rule-12-upstream-install-priority.md`
- `cardinal-rule-7-graduated-unleash.md`
- `citation-discipline.md`
- `closed-loop-recursive-narrowing.md`
- `cmc-env-funneled-disclosure.md`
- `cmc-t1-t7-lifecycle.md`
- `cmc-verdict-shapes.md`
- `codex-t1-auto-wedge-recovery.md`
- `codex-t1-fix-forward-pattern.md`
- `codex-t1-pattern-b-forward-discipline.md`
- `codex-t1-system-meta-review-fallback.md`
- `codification-threshold.md`
- `convergence-gate.md`
- `coordination.md`
- `cross-model-consensus.md`
- `ctff-mechanical-mirror.md`
- `ctff-pattern-a.md`
- `ctff-pattern-b-and-t1-ops.md`
- `ctff-patterns-cd.md`
- `deprecation-discipline.md`
- `evidence-policy.md`
- `fm17-subagent-fleet-depletion.md`
- `fm19-readonly-guard-sidestep.md`
- `fm20-path-drift-cascade.md`
- `fm22-bridge-mode-refuse-as-injection-subclass.md`
- `git-cli-grammar-discipline.md`
- `karpathy-adapted.md`
- `kiss-dry-yagni.md`
- `launch-discipline.md`
- `layered-gates-architecture.md`
- `lga-async-rewake.md`
- `lga-five-layers.md`
- `lga-worktree-prereq.md`
- `mcp-disconnect-recovery.md`
- `mia-pre-apply.md`
- `multi-perspective-subagents.md`
- `multi-source-discovery-breadth-discipline.md`
- `parallel-agent-wave.md`
- `parallel-session-worktree-isolation.md`
- `parallel-sessions.md`
- `port-note-discipline.md`
- `research-protocol.md`
- `sessionstart-preload-discipline.md`
- `skill-orchestration-discipline.md`
- `sota-pin-discipline.md`
- `sota-research-architecture.md`
- `synthesis-layer-verify.md`
- `team-orch-experimental-teams.md`
- `team-orch-frameworks.md`
- `team-orch-patterns.md`
- `team-orch-state-spawning.md`
- `team-orchestration.md`

Audit verdict: current practice is mostly aligned with SOTA preload discipline:
keep root/global invariants tiny and move operational detail behind lazy triggers.
However, two always-loaded rules should be challenged:

- `cardinal-rule-8-full-sota-content.md` plausibly deserves always-load because
  it is universal content governance.
- `named-failure-modes.md` may deserve always-load only if it is a compact router.
  If it contains operational bodies, split into a tiny always router plus lazy
  owner files.
- `fm21-queue-time-prompt-freeze.md` should justify always-load. If it is only
  relevant to queued subagent/codex dispatch, add `paths:` triggers.

Recommended preload practice:

- Always load only root `CLAUDE.md`, universal governance, and compact routers.
- Put all procedure bodies behind `paths:` or descendant `CLAUDE.md` files.
- Prefer pointer-index rules that summarize and route; keep details in child rules.
- Maintain a CI/audit check: any `.claude/rules/*.md` without `paths:` must be in
  an allowlist with a one-line rationale.

## D3 - Post-/Compact Context-Budget Measurement Recipe

Goal: measure context percentage before and after compaction repeatably. Exact
provider-visible token count may not be exposed in local transcript files, so use
three layers: exact when CLI telemetry exposes it, tokenizer estimate otherwise,
and byte-size proxy as a fallback.

Step 1: identify the active/newest session JSONL.

```powershell
$session = Get-ChildItem Z:/claude-sota-installed-state -Recurse -Filter *.jsonl |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1
$session.FullName
```

Step 2: capture pre-compact byte proxy.

```powershell
$pre = Get-Item -LiteralPath $session.FullName
[pscustomobject]@{
  phase = 'pre'
  path = $pre.FullName
  bytes = $pre.Length
  mtime = $pre.LastWriteTime
} | ConvertTo-Json -Compress
```

Step 3: extract transcript text for tokenizer measurement.

```powershell
$raw = Get-Content -LiteralPath $session.FullName -Raw
$raw | Set-Content -LiteralPath tmp/session-precompact.jsonl
```

If `npx` and a tokenizer package are available, estimate tokens:

```powershell
npx --yes gpt-tokenizer-cli encode --model gpt-4o --count tmp/session-precompact.jsonl
```

If that package is unavailable, use byte proxy:

```powershell
$bytes = (Get-Item tmp/session-precompact.jsonl).Length
$estimated_tokens = [math]::Ceiling($bytes / 4)
$estimated_tokens
```

Step 4: run the actual compact operation in Claude Code, then immediately repeat
Steps 1-3 into `tmp/session-postcompact.jsonl`.

```powershell
$postSession = Get-ChildItem Z:/claude-sota-installed-state -Recurse -Filter *.jsonl |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1
Copy-Item -LiteralPath $postSession.FullName -Destination tmp/session-postcompact.jsonl
```

Step 5: normalize percentage against the effective model context limit.

```powershell
$contextLimit = 1000000
$preTokens = [math]::Ceiling((Get-Item tmp/session-precompact.jsonl).Length / 4)
$postTokens = [math]::Ceiling((Get-Item tmp/session-postcompact.jsonl).Length / 4)
[pscustomobject]@{
  pre_tokens_est = $preTokens
  post_tokens_est = $postTokens
  pre_pct = [math]::Round(100 * $preTokens / $contextLimit, 2)
  post_pct = [math]::Round(100 * $postTokens / $contextLimit, 2)
  recovered_pct_points = [math]::Round(100 * ($preTokens - $postTokens) / $contextLimit, 2)
} | ConvertTo-Json -Compress
```

Step 6: corroborate with local tools when available.

```powershell
rtk gain
rtk cc-economics
ccusage daily
repomix --version
```

Interpretation:

- `pre_pct` and `post_pct` are comparable only when the same context limit and
  same tokenizer/proxy are used.
- byte/4 is a rough estimate, not an authoritative model-token count.
- If Claude/Codex telemetry exposes `input_tokens`, `cached_input_tokens`, or
  context-window percentage in the JSONL, prefer those fields over byte proxy.
- Store the command output next to the artifact for before/after auditability.

## JSON Verdict

```json
{
  "verdict": "BLOCK",
  "confidence": 0.78,
  "taxonomy_refinements": [
    "Separate origin_class, evidence_status, and adaptation_delta instead of using a single tier label.",
    "Add TIER-2S for stale-but-plausible SOTA cites requiring refresh rather than immediate demotion.",
    "Add TIER-2D for decorative cites that resolve but do not substantively support the hook behavior.",
    "Require mechanical fields: source_uri, source_rev, source_lines, source_resolves, adaptation_delta, rationale_uri, freshness_checked_at.",
    "Treat TIER-3b enforcement hooks as BLOCK unless disabled or diagnostic-only."
  ],
  "preload_audit": {
    "total_rules": 64,
    "always_load": 3,
    "lazy_load": 61,
    "reducible_pct": 95.3125,
    "always_loaded_files": [
      "cardinal-rule-8-full-sota-content.md",
      "fm21-queue-time-prompt-freeze.md",
      "named-failure-modes.md"
    ]
  },
  "preload_practice": "Mostly aligned: 61/64 rules are scoped by paths. Keep only universal governance and compact routers always-loaded; require an allowlist/rationale for every no-paths rule; challenge fm21 unless it is truly session-global.",
  "budget_measurement_recipe": "Capture newest session JSONL before compact, estimate tokens with tokenizer if available or byte/4 proxy, compact, capture newest session JSONL again, compute pre_pct and post_pct against the effective contextLimit, and corroborate with rtk/ccusage/repomix telemetry where available.",
  "prescribed_edits": [
    {
      "file": ".claude/rules/fm21-queue-time-prompt-freeze.md",
      "action": "Add paths frontmatter or document why this failure mode must be always-loaded."
    },
    {
      "file": ".claude/rules/named-failure-modes.md",
      "action": "Ensure it remains a compact router; move any operational body to lazy owner rules."
    },
    {
      "file": ".claude/rules/cardinal-rule-8-full-sota-content.md",
      "action": "Keep no-paths always-load status only if universal invariant rationale remains explicit."
    },
    {
      "file": "hook classification docs/scripts",
      "action": "Replace marker-only tier detection with origin/evidence/adaptation/freshness fields."
    }
  ],
  "bridge_mode_status": {
    "requested": "REAL GPT-5.5 via codex exec --skip-git-repo-check --color never foreground dispatch",
    "attempted": true,
    "succeeded": false,
    "failure": "codex exec failed before model dispatch: failed to initialize in-process app-server client: Access is denied. (os error 5)",
    "stand_in_notice": true
  }
}
```
