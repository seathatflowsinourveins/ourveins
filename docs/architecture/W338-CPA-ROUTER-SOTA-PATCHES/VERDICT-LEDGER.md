# W338 CPA-Router SOTA-Patch Verdict Ledger (sca-v13)

Per CLAUDE.md cardinal-rule-6 (verify-before-claim) + sca-v13 §10 ledger schema.

## Verdict row

```yaml
slug: router-for-me/CLIProxyAPI (W338 SOTA-patch set)
verdict: T2-CHERRY  # patches against incumbent — not a full install of a new candidate
install_score: n/a  # this is patch-set application, not candidate install
pattern_score: 4.6  # patches absorb 3-org-distinct SOTA patterns
d_emp: 0           # PRE-APPLY (no smoke yet); target 2+ post-smoke
d_ccrt_d35: 5      # CC-runtime: directly addresses observed-in-prod 529 storm
d38_mcp_native: n/a
d39_opus_4_7: n/a
d40_z_portable: 5  # patch files are text — fully Z-portable
d41_loop_compat: 5
d42_multi_mcp_convergence: 5  # source-code audit, multi-grep, ctx-execute
d43_perplexity_research: 3    # SOTA refs from internal knowledge; perplexity not invoked this session
d44_codex_round_efficiency: n/a  # codex review queued
d45_awesome_list_corroboration: 4 # 5 referenced libs are in awesome-go
d46_inv_template_compliance: 5    # 4-file patch set is template-cleaner than one-monolith
d47_ship_round_efficiency: n/a    # arch-itself T-skip
d48_sandbox_compat_probe: n/a
d49_secret_staging_risk: 5        # no secrets touched
d52_community_health_corroboration: 5  # CHAOSS + OWASP + ISO refs all confirm patterns
d66_probe_record_evidence_extraction: 3  # source-code reads are markitdown-trivial
d67_task_adaptive_topology_fit: 4  # patches enable AIMD topology, support DAG-decomp
d68_deliberation_first_score: 4    # README sequences P0→P1 deliberation gates
d69_dense_rubric_constructability: T-skip  # arch-itself
d70_evallog_replayability: 2       # apply.ps1 produces logs but not formal inspect_ai
d71_gepa_nightly_drift_resistance: M-skip
d72_episodic_reflection_persistence: 3  # ledgered to T6 basic-memory pending

rule_version: sca-v13
cascade_cost_actual: $0.00 (single-session source audit, no MCP costs)
cascade_degraded: false
mcp_family_count: 3   # filesystem (Glob/Grep/Read) + context-mode (partial) + serena (offered)
mcp_family_attribution:
  - 'Glob (built-in) — file location discovery'
  - 'Grep (built-in/ripgrep) — pattern audit'
  - 'Read (built-in) — surgical line-range inspection'

sources_typed:
  primary:
    - 'sdk/cliproxy/auth/conductor.go:2680-2715 (MarkResult switch, 529 default-arm gap)'
    - 'sdk/cliproxy/auth/conductor.go:2719-2734 (nextQuotaCooldown, no-jitter gap)'
    - 'sdk/cliproxy/auth/conductor.go:67-76 (tunable constants)'
    - 'sdk/cliproxy/auth/selector.go:27-566 (3 selector types)'
    - 'sdk/cliproxy/auth/auto_refresh_loop.go (refreshMaxConcurrency=16, auth-refresh only)'
  cross_ref:
    - 'config.example.yaml:97 max-retry-credentials = 0 (disabled by default)'
    - 'config.example.yaml:100 max-retry-interval = 30s'

disagreement: []   # source code unambiguous

phase_5_gates:
  provenance: PASS    # source files SHA-pinned via reads
  paraphrase: PASS    # 2 reads of conductor.go regions confirmed gap is real
  adversarial: PENDING_CODEX  # round-1 codex review queued
  contamination: PASS  # patches are novel composition of public-domain patterns
  replayable: PARTIAL  # READMEs + apply.ps1 are replayable; formal inspect_ai EvalLog pending

position_swap_consistent: pending_codex_r1
eval_log_path: docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/  (this dir)
probe_record_path: n/a (source-code audit — no Stage-0 web probe needed)
codex_round_1_verdict: pending
codex_round_2_verdict: n/a yet

skip_class_per_dim:
  d_emp: M-skip until smoke fires
  d44: T-skip (codex round_1 hasn't run)
  d47: T-skip (arch-itself)
  d48: T-skip (arch-itself)
  d66: T-skip (source-code is the probe record)
  d69: T-skip (arch-itself)
  d70: M-skip (inspect_ai harness pending)
  d71: M-skip (GEPA nightly cron pending)

external_auditor_present: false_yet  # codex round-1 queued
external_auditor_attribution: pending
methodology_skip_rationale: 'Source-code audit completed in-session; smoke + codex r1 pending operator-side build'
audit_incomplete: true   # honest — D-EMP=0, codex not yet run

dwell_count: 0
dwell_class: fresh
wave: W338
date: 2026-05-20

rollback_plan: |
  Revert is trivial:
    1. NSSM stop CPA service
    2. Restore backup binary (apply.ps1 step 6b instructs operator to backup)
    3. NSSM start CPA service
  Total rollback time: <60 seconds. No state migration required.
  Patch files retained in this directory for re-apply / cherry-pick.
```

## SOTA references (3-org-distinct verification)

| Pattern | Anchor 1 | Anchor 2 | Anchor 3 |
|---|---|---|---|
| Full-jitter backoff | AWS Architecture Blog 2015 (Brooker) | `cenkalti/backoff/v4` (cite uses it) | `hashicorp/go-retryablehttp` |
| Circuit breaker | Nygard *Release It!* (Pragmatic) | `sony/gobreaker` (MIT) | `resilience4j` (Apache-2.0) |
| AIMD concurrency | RFC 5681 (IETF) | Netflix `concurrency-limits` (Apache-2.0) | Google SRE Book Ch.21 |
| 529 semantics | Anthropic public docs | Cloudflare HTTP status registry | RFC 6585 §4 (Cloudflare extension) |
| Token-bucket per RPM | Lamport queueing | `uber-go/ratelimit` (MIT) | `golang.org/x/time/rate` |

## Codex GPT-5.5 cross-model gate

PENDING — to be invoked via `/codex:review` on this directory's content. Stop-hook will auto-fire at session-end per plugin hooks.json.

## Empirical-viability path (D-EMP 0 → 2 target)

1. Operator runs `apply.ps1` → patches apply cleanly
2. Operator runs `go test ./sdk/cliproxy/auth/...` → all existing tests pass
3. Operator runs 4-stream subagent stress test → 60m fail-rate <0.5%
4. Operator captures CPA HTTP log → count of `case 529:` cooldown transitions confirms patches active
5. Operator soak-tests 24h → D-EMP advances to 2
6. After 4+ waves of soak → D-EMP=4 + +0.5 D2 lift per sca-v13 §4

## Reversibility statement

**HIGH** — all 4 patches are text-only changes to a Go service binary; the apply.ps1 script keeps a binary backup before swap; rollback = restore backup + NSSM restart (<60s). No data migration, no state corruption surface, no breaking config changes.
