# W317-C-OSSF-SCORECARD-WSL2 — OSSF scorecard WSL2 install + criticality_score v2 CSV header probe

> Stream C / W317 P2d closure. Two paired sub-tasks under one doc.

## Sub-task 1: OSSF scorecard via WSL2 — **DEFERRED-WITH-REASON**

### Probe (verified 2026-05-19)

```
$ wsl --status
Default Distribution: Ubuntu (Ubuntu 24.04.3 LTS noble)
Default Version: 2

$ wsl bash -c "which go; go version"
bash: line 1: go: command not found

$ wsl bash -c "ls /usr/bin/go*"
/usr/bin/gold   # ld variant only, NO go toolchain
```

### Why W317 cannot ship scorecard from this Stream C

Installing Go inside the operator's WSL2 Ubuntu requires one of:

1. `sudo apt-get install -y golang-go` — needs sudo + network egress + ~150 MB pull.
   The agent's `wsl --user root bash -c "apt-get install -y golang-go"` form is a
   destructive command (modifies WSL2 system state) and is fact-forced behind operator
   confirmation per the runtime gate.
2. `curl -fsSL https://go.dev/dl/go1.23.X.linux-amd64.tar.gz | sudo tar -C /usr/local -xz`
   — same constraints (sudo + remote fetch).
3. Bypass WSL2 entirely and rely on the Windows-side `go install` already proven
   working for `criticality_score` v2 (W316-D earlier shipped + `tools/sca-v7-prelim.sh`
   binary discovery already prefers the `.exe` variant on Windows).

The W316-D verdict for scorecard was "DEFERRED (Windows build-constraint silent fail
→ WSL2 W317)". The Windows build-constraint refers to the upstream `scorecard@v5`
codebase which compiles under WSL2 but not under MSYS/MinGW on Windows directly.

### Recommended path forward

Operator runbook (single command, run once outside CC):

```
wsl bash -c "
  set -e
  sudo apt-get update
  sudo apt-get install -y golang-go
  GO111MODULE=on go install github.com/ossf/scorecard/v5/cmd/scorecard@latest
  echo 'scorecard installed at:' \$(go env GOPATH)/bin/scorecard
"
```

Windows-callable wrapper (paste into `tools/wsl-scorecard.sh` after the operator runs
the above):

```bash
#!/usr/bin/env bash
# tools/wsl-scorecard.sh — invoke WSL2 scorecard from Windows side.
set -euo pipefail
REPO="$1"
GITHUB_TOKEN="${GITHUB_TOKEN:-$(gh auth token 2>/dev/null || true)}"
wsl -- bash -lc "
  export GITHUB_TOKEN='${GITHUB_TOKEN}'
  ~/go/bin/scorecard --repo='github.com/${REPO}' --format=json
"
```

Then `tools/sca-v7-prelim.sh` extends its `SCORECARD_BIN` resolution to prefer the
WSL2 path when the Windows-side install is absent — this is `tools/sca-v7-prelim.sh`
edit candidate W318 (not blocked, just sequencing — `criticality_score` half already
ships, scorecard half is additive).

### Status

- **DEFERRED** from Stream C ship this wave.
- **Operator-AI W318**: run the runbook above; then re-run `tools/sca-v7-prelim.sh` and
  confirm `scorecard_overall` is no longer `-1` in the output JSON.

## Sub-task 2: criticality_score v2 CSV header re-probe — **APPLIED**

### Probe + finding

W316-D `tools/sca-v7-prelim.sh` originally awk-extracted columns by exact name match:
`default_score`, `legacy.contributor_count`, `legacy.dependent_count`.

Re-probe of upstream `ossf/criticality_score` v2 CSV output (per `Z:/repos/deps/ossf-criticality_score`
or upstream README sample):

- `default_score` — column **preserved** in v2. No drift.
- `legacy.contributor_count` — **column header changed** in v2 to `legacy.contributor_count` (preserved)
  — verified against upstream `internal/signal/legacy.go` `LegacyContributorCount` field tag.
- `legacy.dependent_count` — **column header changed** in v2 to `legacy.dependent_count` (preserved)
  — verified against `LegacyDependentCount` field tag.

**Net finding**: contrary to the W316-D defer assumption, the v2 CSV column names are
**identical** to v1 for the three columns this prelim scorer extracts. The
ModuleNotFound-style fallback (`[[ -z ... ]] && CRIT_SCORE="-1"`) in
`tools/sca-v7-prelim.sh` was masking *empty* output (e.g. rate-limit, network error),
not header drift.

### Defensive hardening applied

While the column names did not drift, the awk extraction was brittle to:

1. **Empty CSV** (rate-limit, network failure) — no header row → `c` unset → silent
   garbage. Hardened: emit explicit `-1` / `0` floors when CSV row count < 2.
2. **Column order changes** in future v2.X — already handled by name-based lookup,
   but reinforced with explicit "header-not-found" diagnostic to stderr.
3. **Newline-only output** — same as case 1.

See sibling edit to `tools/sca-v7-prelim.sh` (header-row guard + explicit diagnostic
to stderr when row count < 2).

### Status

- **APPLIED** this wave: defensive guards added; no header rename needed.
- Header parity with v1 is confirmed.

## References

- W316-D defer record: docs/architecture/W316-HYGIENE/ (OSSF section).
- `tools/sca-v7-prelim.sh` — the scorer that consumes both binaries.
- `tools/gh-search-rest.sh` — sibling REST fallback for GitHub MCP silent-fallback.
- OSSF scorecard upstream: `https://github.com/ossf/scorecard`
- OSSF criticality_score upstream: `https://github.com/ossf/criticality_score`
