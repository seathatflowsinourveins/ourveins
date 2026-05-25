# W156 F1 V3 Adversarial Review — Tier 1a codex T1-T7 Hooks

## Verdict

VERDICT: F1-BLOCK

confidence: 0.90

fm09_recursive_catch_triggered: true

v2_was_overclaimed: v2_not_landed

a8_risk_class: HIGH

fm02_race_defense_check: GAPS

revert_precedent_check: FOUND_PRECEDENTS

## Artifact Checks

V1 artifact:

`Z:/claude-sota-installed/tmp/wave156-f1-V1-sota-researcher-tier1a-hooks-2026-05-12.md`

Status: missing.

V2 OUT artifact:

`Z:/claude-sota-installed/.claude/state/codex_consult_w156_f1_tier1a_v2_OUT.txt`

Status: missing.

Prompt artifact:

`Z:/claude-sota-installed/.claude/state/codex_consult_w156_f1_tier1a_v3.txt`

Status: created with `v1_available=false` and `v2_not_landed=true`.

Output artifact:

`Z:/claude-sota-installed/.claude/state/codex_consult_w156_f1_tier1a_v3_OUT.txt`

Status: created; 13,419 lines.

## Cross-Model Gate Satisfaction

Path P codex exec ran to completion after two environment corrections.

Initial failure 1: PowerShell rejected POSIX `<` stdin redirection.

Initial failure 2: default `CODEX_HOME` hit an access-denied arg0 temp path under `Z:/claude-sota-installed-state/.codex/tmp/arg0`.

Initial failure 3: repo-local temporary `CODEX_HOME` passed startup but Codex websocket TLS failed because the process could not read the Windows current-user certificate store.

Successful run used:

`CODEX_HOME=Z:/claude-sota-installed/tmp/codex-home-w156-v3`

`TMP=Z:/claude-sota-installed/tmp`

`TEMP=Z:/claude-sota-installed/tmp`

`CODEX_CA_CERTIFICATE=C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crt`

Command shape:

`Get-Content .claude/state/codex_consult_w156_f1_tier1a_v3.txt -Raw | codex exec --ephemeral -p deep-review-exec --skip-git-repo-check --color never | Tee-Object .claude/state/codex_consult_w156_f1_tier1a_v3_OUT.txt`

Gate status: satisfied by real `codex exec` using profile `deep-review-exec`, model `gpt-5.5`, reasoning `xhigh`, approval `never`, sandbox `danger-full-access`.

## Saved-Ship Catches

1. Probe 4 / P1:

Plugin namespace was not proven clean: openai-codex is enabled and already supplies SessionStart/SessionEnd/Stop hooks, while `.claude/settings.json` also wires `stop-review-gate-hook.mjs` directly with a different timeout; adding/importing stop-review behavior risks duplicate Stop review loops.

2. Probe 5 / P1:

Runtime lifecycle shape is not captured by the missing plan: actual settings use PreToolUse T1 sync timeout=5, T5 async timeout=5, T2 sync timeout=180, PostToolUse T3/T4 async timeout=30, Stop sync timeout=300, and no asyncRewake evidence.

3. Probe 6 / P1:

Direct-file verification is incomplete: of the six observability scripts, only `codex_review_queue.py` is byte-identical to sibling; five installed copies differ by hash and require explicit content-delta proof before status promotion.

4. Probe 6 / P1:

Sibling source pin is not HEAD-clean: sibling HEAD is `034e8c1e5b1593d71fbe21ddae9eb53570ecdab0`, but installed headers cite per-file older touching commits such as `66ad862`, `35fec739`, and `258a40b`; manifest still has `<SHA-PENDING>` for the T1 bridge row.

5. Probe 7 / P2:

Demand is not fully established as an install gap: the runtime already has codex T1/T2/T5/postcommit/prepush/stuck/trace hooks physically wired, and CR-3 is also operating via foreground+tee Phase-1 bootstrap; F1 is mainly manifest/provenance closure unless a specific missing hook is named.

6. Mia / P1:

V1 and V2 artifacts are absent, so there is no evidence that cited line anchors were freshly probed against sibling HEAD or that V2 independently verified rather than echoed V1 prescriptions.

7. CR-9 / P1:

REVERT-AND-REMOVE precedent exists in sibling codex hook history: `36f8267` runner_crash consumer and `ba04d86` BYPASS+REASON surface. F1 cannot claim clean revert history.

8. CR-9 / P1:

Two-round fix-forward budget and per-row copy-time full SHA disclosure are not evidenced in the missing W156 plan/verdict; manifest rows 242-243 remain PLANNED rather than four-evidence-cell installed rows.

9. FM-02 / P2:

Atomic narrow `--only` defense is not demonstrated for W156 F1; current worktree has an unrelated dirty manifest edit for `fm17d_stall_detector.py`, so a Tier 1a hook ship must isolate files before commit.

10. CR-8 / P1:

Cite-class lattice is incomplete for the Tier 1a manifest rows: cite-import-AMBER rows do not explicitly state constituents plus `effective_tier=TIER-3-LOCAL-COMPOSITION`; row 242 still contains `<SHA-PENDING-AT-EXECUTION>`.

## JSON Verdict

```json
{
  "verdict": "F1-BLOCK",
  "confidence": 0.9,
  "fm09_recursive_catch_triggered": true,
  "v2_was_overclaimed": "v2_not_landed",
  "saved_ship_catches": [
    {
      "category": "Probe 4",
      "finding": "Plugin namespace was not proven clean: openai-codex is enabled and already supplies SessionStart/SessionEnd/Stop hooks, while .claude/settings.json also wires stop-review-gate-hook.mjs directly with a different timeout; adding/importing stop-review behavior risks duplicate Stop review loops.",
      "severity": "P1"
    },
    {
      "category": "Probe 5",
      "finding": "Runtime lifecycle shape is not captured by the missing plan: actual settings use PreToolUse T1 sync timeout=5, T5 async timeout=5, T2 sync timeout=180, PostToolUse T3/T4 async timeout=30, Stop sync timeout=300, and no asyncRewake evidence.",
      "severity": "P1"
    },
    {
      "category": "Probe 6",
      "finding": "Direct-file verification is incomplete: of the six observability scripts, only codex_review_queue.py is byte-identical to sibling; five installed copies differ by hash and require explicit content-delta proof before status promotion.",
      "severity": "P1"
    },
    {
      "category": "Probe 6",
      "finding": "Sibling source pin is not HEAD-clean: sibling HEAD is 034e8c1e5b1593d71fbe21ddae9eb53570ecdab0, but installed headers cite per-file older touching commits such as 66ad862, 35fec739, and 258a40b; manifest still has <SHA-PENDING> for the T1 bridge row.",
      "severity": "P1"
    },
    {
      "category": "Probe 7",
      "finding": "Demand is not fully established as an install gap: the runtime already has codex T1/T2/T5/postcommit/prepush/stuck/trace hooks physically wired, and CR-3 is also operating via foreground+tee Phase-1 bootstrap; F1 is mainly manifest/provenance closure unless a specific missing hook is named.",
      "severity": "P2"
    },
    {
      "category": "Mia",
      "finding": "V1 and V2 artifacts are absent, so there is no evidence that cited line anchors were freshly probed against sibling HEAD or that V2 independently verified rather than echoed V1 prescriptions.",
      "severity": "P1"
    },
    {
      "category": "CR-9",
      "finding": "REVERT-AND-REMOVE precedent exists in sibling codex hook history: 36f8267 runner_crash consumer and ba04d86 BYPASS+REASON surface. F1 cannot claim clean revert history.",
      "severity": "P1"
    },
    {
      "category": "CR-9",
      "finding": "Two-round fix-forward budget and per-row copy-time full SHA disclosure are not evidenced in the missing W156 plan/verdict; manifest rows 242-243 remain PLANNED rather than four-evidence-cell installed rows.",
      "severity": "P1"
    },
    {
      "category": "FM-02",
      "finding": "Atomic narrow --only defense is not demonstrated for W156 F1; current worktree has an unrelated dirty manifest edit for fm17d_stall_detector.py, so a Tier 1a hook ship must isolate files before commit.",
      "severity": "P2"
    },
    {
      "category": "CR-8",
      "finding": "Cite-class lattice is incomplete for the Tier 1a manifest rows: cite-import-AMBER rows do not explicitly state constituents=[...] plus effective_tier=TIER-3-LOCAL-COMPOSITION; row 242 still contains <SHA-PENDING-AT-EXECUTION>.",
      "severity": "P1"
    }
  ],
  "a8_risk_class": "HIGH",
  "fm02_race_defense_check": "GAPS",
  "revert_precedent_check": "FOUND_PRECEDENTS"
}
```

## Forward Direction

Do not ship W156 F1 Tier 1a status promotion as-is.

First close the missing-evidence gap: either regenerate V1/V2 or explicitly mark the V3 run as the authoritative T1 gate and document why V1/V2 were absent.

Before any install/status flip, run a narrow file-by-file verification pass:

1. Enumerate the exact Tier 1a files in scope.

2. Pin sibling HEAD SHA and per-file copy/source SHA at copy time.

3. Hash-compare installed copies against sibling sources.

4. For every non-identical copy, document the content delta and path rewrite reason.

5. Re-check plugin namespace overlap against enabled `openai-codex`, `everything-claude-code`, and `addy-agent-skills` surfaces.

6. Re-check `.claude/settings.json` hook lifecycle shape: event, matcher, sync/async, timeout, and any asyncRewake expectation.

7. Record REVERT precedent as FOUND, not CLEAN.

8. Keep the commit narrow with `git commit -o -- <only W156 files>` or equivalent isolation because an unrelated manifest edit is currently dirty.

Ship direction: F1-BLOCK until the above evidence cells are present; likely downgrade from "install hooks" to "manifest/provenance closure plus direct-file delta audit" unless a specific missing hook is identified.
