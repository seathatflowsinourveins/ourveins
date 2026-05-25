# tools/

Operator-discretion utility scripts. None of these run automatically — they are invoked manually or by other waves.

## Inventory

| Script | Lang | Purpose | Wave |
|---|---|---|:---:|
| `awesome_list_deltagrep.py` | py | Find repos cited in awesome-lists but missing from the adoption-decisions ledger (v3.1 G7 point-revision). | W291 |
| `_eee_status_query.py` | py | Query EEE runtime status. | pre-W255 |
| `bootstrap-runtime.ps1` | ps1 | Idempotent runtime bootstrap (review-gate state + hindsight Windows shims). | W280b |
| `codex_verdict_normalizer.py` | py | Normalize codex GPT-5.x review JSON. | W286 |
| `eee.local.ps1` / `eee.ps1` | ps1 | Local launcher. | varies |
| `eee_install_cron_tasks.ps1` | ps1 | Install Windows scheduled tasks. | varies |
| `eee-admin-bootstrap.ps1` | ps1 | Admin-elevation bootstrap. | varies |
| `eee-backup.ps1` | ps1 | Workspace backup. | varies |
| `eee-status.ps1` | ps1 | Workspace status. | varies |
| `hindsight-queue-janitor.ps1` | ps1 | Hindsight queue cleanup. | W280b |
| `migrate-cognee-state.ps1` | ps1 | Migrate cognee state C: → Z: (operator-confirmed only). | W286 |
| `process_hygiene_audit.py` | py | Audit process state. | varies |
| `sota-reverify.ps1` | ps1 | Re-verify SOTA candidate. | W280 |
| `wave152-f1-netsh-pin.ps1` | ps1 | Netsh pin (historical fire). | W152 |

## awesome_list_deltagrep.py — usage

```bash
# dry-run (print to stdout)
python tools/awesome_list_deltagrep.py --dry-run

# write report to a file
python tools/awesome_list_deltagrep.py --out tmp/deltagrep-report.md

# use a custom config (JSON: {"lists": [[name, url], ...]})
python tools/awesome_list_deltagrep.py --config my-lists.json --out tmp/out.md
```

Stdlib-only (urllib + re); no new pip deps. Idempotent.

## See also

- `.claude/skills/sota-convergence-audit/SKILL.md` "References" — points to this dir.
- `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F4-CONVERGENCE-METHOD-V4.md` §3 G7 — design rationale.
- `docs/architecture/AGING-RELITIGATION-QUEUE.md` — sibling v3.1 G4 deliverable.
