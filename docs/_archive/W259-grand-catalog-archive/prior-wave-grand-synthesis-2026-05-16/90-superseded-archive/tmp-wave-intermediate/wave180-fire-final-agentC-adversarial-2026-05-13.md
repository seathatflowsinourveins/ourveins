# W180 Agent C Adversarial Review — CCC Fleet Accounts State + Recovery Plan

date: 2026-05-13 18:17 EDT
handoff_to: orchestrator
verdict_one_line: DONE: 5 lenses / 5 revised actions / 4 Mia catches / BRIDGE-MODE GPT-5.5 ATTEMPTED-BLOCKED

## Bridge-Mode Disclosure

Requested shape was `codex exec --ephemeral -p deep-review-exec --color never` foreground+tee, one call per lens, 90s default / 120s cap.

Execution result: all five lens calls plus one isolated-temp retry failed before model execution with:

`Error: failed to initialize in-process app-server client: Access is denied. (os error 5)`

Evidence files created:

- `.claude/state/codex_consult_w180_agentc_lens1_factual.txt`
- `.claude/state/codex_consult_w180_agentc_lens1_factual_OUT.txt`
- `.claude/state/codex_consult_w180_agentc_lens1_factual_retry_OUT.txt`
- `.claude/state/codex_consult_w180_agentc_lens2_engineering.txt`
- `.claude/state/codex_consult_w180_agentc_lens2_engineering_OUT.txt`
- `.claude/state/codex_consult_w180_agentc_lens3_security.txt`
- `.claude/state/codex_consult_w180_agentc_lens3_security_OUT.txt`
- `.claude/state/codex_consult_w180_agentc_lens4_consistency.txt`
- `.claude/state/codex_consult_w180_agentc_lens4_consistency_OUT.txt`
- `.claude/state/codex_consult_w180_agentc_lens5_redundancy.txt`
- `.claude/state/codex_consult_w180_agentc_lens5_redundancy_OUT.txt`

Cross-model gate satisfaction status: ATTEMPTED-BLOCKED, not satisfied by a live GPT-5.5 model verdict. This artifact is therefore an orchestrator-local adversarial synthesis over verified repo/live evidence, not a completed external Codex model review.

## Verified Current State

Live probe at 2026-05-13 18:17 EDT:

- `python Z:/claude/ccc/tools/status.py`: 7 active Claude accounts returned HTTP 429; `readingcodingandbeyond@gmail.com` returned HTTP 401 `[DIS]`; Gemini active; 7 total requests, 0 successes, 0.0% cache.
- `python Z:/claude/ccc/tools/fleet_report.py`: Requests=7, Success=0, Failed=7; cumulative log totals 4,634 messages, 4,475 ok, 11 auth-retry, 148 real errors; error breakdown 401=11, 429=47, 500=12, 502=2, 503=87.
- `Get-Content .claude/state/aperant_poller.jsonl -Tail 5`: last row still `2026-05-13T02:00:02.398098+00:00`; stale by ~16h17m at probe time.
- HTTP health: `:19801/health`, `:18317/healthz`, and `:8079/healthz` returned 200; `:8317/healthz` refused.
- `schtasks /Query` failed locally with `ERROR: The system cannot find the path specified`; the earlier W180 catalog remains the last file-backed scheduled-task evidence.

File-backed evidence:

- W180 F1 catalog captured the prior critical state and service inputs at `tmp/wave180-fire1-accounts-catalog-2026-05-13.md:9-15`.
- W180 F1 claimed 7 active HTTP 401 and one disabled account at `tmp/wave180-fire1-accounts-catalog-2026-05-13.md:23-34` and `:46-53`; this is now stale relative to the 18:17 live probe because active accounts now return HTTP 429.
- W180 F1 cumulative errors match the live fleet report at `tmp/wave180-fire1-accounts-catalog-2026-05-13.md:66-70`.
- W180 F1 marks aperant dead and JSONL stale at `tmp/wave180-fire1-accounts-catalog-2026-05-13.md:117-121`.
- Account runbook defines the account pool and priority fields at `docs/accounts/README.md:20-50`.
- Recovery runbook lists reauth, poller restart, cache, Haiku, and TTL steps at `docs/accounts/README.md:111-174`.
- `safe_reauth.py` snapshots/restores metadata around OAuth replacement at `Z:/claude/ccc/tools/safe_reauth.py:5-7` and `:35-57`; callback flow and verify path are at `:128-200`.
- `safe_reauth.py` command parser has no `--force-fresh` branch at `Z:/claude/ccc/tools/safe_reauth.py:204-217`.
- `reset_soonest_priority.py` states it is the sole writer, distinct from `balance.py`, at `Z:/claude/ccc/tools/reset_soonest_priority.py:1-12`; priority ladder and error priority are at `:53-55`.
- `reset_soonest_priority.py` skips disabled auths at `Z:/claude/ccc/tools/reset_soonest_priority.py:88-101` and PATCHes priority via management API at `:115-125`.
- `reset_soonest_priority.py` hard-demotes exhausted accounts at `Z:/claude/ccc/tools/reset_soonest_priority.py:153-170`.
- CLIProxyAPI reads priority and picks the highest available priority at `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:116-129` and `:220-250`; session affinity defaults to 1h at `:448-467`.
- CLIProxyAPI cools 401/402/403 failures for 30m at `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/conductor.go:2107-2124`.
- cnighswonger per-session quota/cache files and statusline guidance are at `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:283-339`; cache telemetry extraction is at `proxy/extensions/cache-telemetry.mjs:151-215`.

## Five-Lens Verdicts

| Lens | Verdict | Conf | Findings |
|---|---:|---:|---|
| 1. Factual | NEEDS-REVISION | 0.91 | Top-5 is directionally right but stale: active accounts are now 429, not 401; `--force-fresh` is not implemented; `:8317` remains wrong for live chain; schtasks evidence could not be reverified live. |
| 2. Senior engineer | NEEDS-REVISION | 0.88 | Reauth-all-first is no longer clean ROI while active accounts report 429. Highest ROI is restore observability, then selectively reauth only identities that still fail 401/403 after reset visibility. |
| 3. Security | NEEDS-REVISION | 0.86 | OAuth callback URL handling is sensitive; do not paste callback URLs into logs or artifacts. Snapshot files preserve metadata only, but auth file reads must never print tokens. Scheduler changes are low risk if command path is pinned. |
| 4. Consistency | NEEDS-REVISION | 0.90 | Must update claims from 401-cascade to 429-quota-cascade; use `:18317` not `:8317`; respect CR-6 by treating deps as cite anchors, not install sources; do not patch CLIProxyAPI source for TTL if config can do it. |
| 5. Redundancy | APPROVE-WITH-DEFERS | 0.84 | Reauth and poller restart are non-duplicate. TTL patch, Haiku routing, and new cache breakpoint work must be deferred until existing CLIProxyAPI/cnighswonger primitives show a post-recovery gap. |

## Mia Catches

| # | Catch | Impact | Correction |
|---:|---|---|---|
| 1 | W180/W167 active-account state says 401; live 18:17 state says 429 for all 7 active accounts. | Recovery ordering changes from pure reauth to quota/observability first. | Reclassify active cohort as quota/cooldown exhausted until fresh poller/usage proves auth failure. |
| 2 | `safe_reauth.py --force-fresh` is prescribed, but parser has no such flag. | Operator command would not do what plan says. | For disabled `readingcodingandbeyond`, use manual OAuth re-grant or extend script in a separate reviewed change. |
| 3 | Disabled account filename is `claude-zz-readingcodingandbeyond@gmail.com.json`; `auth_file_for(email)` resolves `claude-readingcodingandbeyond@gmail.com.json`. | Plain `safe_reauth.py reading...` cannot snapshot the disabled file as written. | Restore/rename under operator control or add explicit disabled-file handling before scripted reauth. |
| 4 | Plan says "Top-5" but lists 6 actions in the handoff. | Ambiguous priority queue. | Revised plan below has exactly 5 actions; Haiku routing moves to backlog. |

## Revised Top-5 Recovery Plan

| Priority | Action | Est. time | Risk class | Rationale |
|---:|---|---:|---|---|
| 1 | Restore aperant observability: restart `EEE-Aperant-Poller`, change schedule to every 5m, verify fresh JSONL row. | 5-10m | LOW | Current active-account failures are 429, so fresh 5h/7d utilization is needed before forcing OAuth churn. Reversible scheduler change. |
| 2 | Wait/probe next reset window and rerun `status.py` + `fleet_report.py`; only reauth accounts that return 401/403 after fresh usage visibility. | 10-20m plus reset wait | LOW | Avoids unnecessary OAuth rotations when current symptom is quota/cooldown. Uses existing status scripts. |
| 3 | Recover `readingcodingandbeyond@gmail.com` via manual full OAuth re-grant or a separate patch adding disabled-file/force-fresh support to `safe_reauth.py`. | 10-20m | MEDIUM | Disabled account is true auth state, but current script does not implement the prescribed flag and does not resolve the `zz-` file. |
| 4 | Selectively reauth any active Claude account still returning 401/403 after step 1-2, using `safe_reauth.py <email>` and not logging callback URLs/tokens. | ~5m/account | MEDIUM | Valid for actual auth expiry; less appropriate for current 429-only active cohort. |
| 5 | After at least one Claude account succeeds, tune token efficiency using existing primitives first: verify cnighswonger cache telemetry/statusline and config-level session-affinity TTL before source patches. | 30-60m | MEDIUM | Cache/TTL work is blocked while success=0; patching CLIProxyAPI source is higher blast radius than config. |

Backlog, not Top-5: Haiku 4.5 routing. It is a broader routing architecture change (~4h), valuable for cost but not a fleet recovery blocker.

## Comprehensive Accounts Diagram

Values marked `STALE` are from the last aperant JSONL rows at 2026-05-13T02:00:02 UTC or W180 catalog; active HTTP state is from the 18:17 live probe.

| # | email | state | plan_type | 5h_util% | 5h_reset | 7d_util% | 7d_reset | rotation_priority | recovery_action |
|---:|---|---|---|---:|---|---:|---|---:|---|
| 1 | aesthetic9c@gmail.com | HTTP 429 active | Anthropic Max OAuth | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | P10 | Do not force reauth first; restore poller, wait/probe reset, reauth only if 401/403 persists. |
| 2 | dreamweaverhoudini@gmail.com | HTTP 429 active | Anthropic Max OAuth | 75 STALE | 2026-05-13T03:30:00Z STALE/PAST | 90 STALE | 2026-05-18T15:00:00Z STALE | P10 | Likely near weekly/session pressure; fresh poller required; reauth only if auth failure persists. |
| 3 | mr.euphoriaincarnate@gmail.com | HTTP 429 active | Anthropic Max OAuth | 0 STALE | none STALE | 80 STALE | 2026-05-15T04:00:00Z STALE | P10 | Fresh usage probe; should rank high after quota clears if auth remains valid. |
| 4 | nalawowac@gmail.com | HTTP 429 active | Anthropic Max OAuth | 0 STALE | none STALE | 100 STALE | 2026-05-13T03:00:00Z STALE/PAST | P10 | Fresh probe critical; prior weekly exhausted reading is stale and reset should have passed. |
| 5 | zfan7@sva.edu | HTTP 429 active | Anthropic Max OAuth | 0 STALE | none STALE | 5 STALE | 2026-05-16T02:59:59Z STALE | P10 | Fresh probe; if valid, likely high headroom account after reset visibility. |
| 6 | readingcodingandbeyond@gmail.com | HTTP 401 [DIS] disabled | Anthropic Max OAuth | N/A | N/A | N/A | N/A | P10 | Manual full OAuth re-grant or script enhancement for `claude-zz-...` disabled file; no `--force-fresh` flag exists. |
| 7 | 739955940fc@gmail.com | HTTP 429 active | Anthropic Max OAuth | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | P10 live metadata | Fresh probe; prior P0 claim stale because live auth metadata now shows P10. |
| 8 | avantmanifest@gmail.com | HTTP 429 active | Anthropic Max OAuth | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | P10 live metadata | Fresh probe; prior P0 claim stale because live auth metadata now shows P10. |
| 9 | zfan7@sva.edu (Codex Pro) | ok STALE; not CCC Claude path | Codex Pro | 0 STALE | 2026-05-13T06:31:03Z STALE/PAST | 7 STALE | 2026-05-18T22:43:58Z STALE | N/A | Keep as separate OpenAI/Codex identity; do not mix into Claude OAuth recovery. |
| 10 | Gemini credential(s): `739955940fc@gmail.com` / `avantmanifest@gmail.com` auth files | active, disabled=False | Gemini | N/A | N/A | N/A | N/A | N/A | Alternative channel only; not exercised by `/loop` unless explicitly routed. |

## Security Notes

- Do not print `access_token`, `refresh_token`, OAuth callback URLs, management token, or auth JSON bodies in artifacts.
- `safe_reauth.py` prints OAuth URL and callback instructions; operator should use a private terminal and avoid teeing that flow into shared logs.
- Snapshot files under `.metadata_snapshots` should contain only preserved metadata per `PRESERVED_FIELDS`; verify before retaining long term.
- Scheduler recovery should pin command paths and working directories; avoid creating a second priority writer.
- The management API token should stay in environment/secret file only; `reset_soonest_priority.py` already requires `CCC_MGMT_TOKEN` rather than hardcoding it.

## Redundancy / Deferral Decisions

| Candidate | Decision | Reason |
|---|---|---|
| Reauth active accounts | DEFER-SELECTIVE | Current active symptom is 429, not 401; reauth only after fresh poller/status proves auth expiry. |
| Reauth disabled account | KEEP, but manual/script-fix | True disabled auth state; current script command is wrong. |
| Restart aperant poller | KEEP | Not duplicate; restores rate-limit visibility needed for routing. |
| Install 1h-cache breakpoints | DEFER | Existing cnighswonger telemetry/cache mechanics exist; success=0 blocks measuring benefit. |
| Haiku 4.5 routing | BACKLOG | Cost optimization, not recovery. Broader architecture blast radius. |
| Drop session-affinity TTL 1h->30m | DEFER-CONFIG-FIRST | CLIProxyAPI already has TTL config/source support; do not patch source until config path and post-reauth data justify it. |

## Handoff

Goal: adversarially review CCC fleet state, recovery plan, and account rotation diagram.

Files touched:

- `tmp/wave180-fire-final-agentC-adversarial-2026-05-13.md`
- `.claude/state/codex_consult_w180_agentc_lens{1..5}_*.txt` and failed OUT files

Commands run:

- `python Z:/claude/ccc/tools/status.py`
- `python Z:/claude/ccc/tools/fleet_report.py`
- `Get-Content .claude/state/aperant_poller.jsonl -Tail 5`
- health probes for `:19801`, `:18317`, `:8317`, `:8079`
- `codex exec --ephemeral -p deep-review-exec --color never` foreground+tee for 5 lens prompts plus one retry

Unresolved risks:

- No live GPT-5.5 model verdict due Codex CLI app-server access error.
- Scheduled-task state could not be reverified in this shell because `schtasks /Query` failed before returning task data.
- Active 429 cause needs fresh poller data; do not assume OAuth reauth fixes quota exhaustion.
