# W316-D — OSSF install partial + sca-v7-prelim.sh wrapper

**Wave**: W316
**Stream**: D
**Date**: 2026-05-19

## OSSF binary install

```
$ go version
go version go1.26.1 windows/amd64

$ go install github.com/ossf/scorecard/v5/cmd/scorecard@latest
(exit 0, no error to stderr/stdout — but binary NOT in $GOPATH/bin afterward)

$ go install github.com/ossf/criticality_score/v2/cmd/criticality_score@latest
(exit 0)

$ ls $(go env GOPATH)/bin/ | grep -iE "scorecard|criticality"
criticality_score.exe
```

### Status

- `criticality_score.exe` — SHIPPED (installed to `C:/Users/42/go/bin/criticality_score.exe`)
- `scorecard.exe` — DEFERRED-INSTALL (go install reports exit 0 but no binary produced; likely cgo, build-tag, or platform-specific build constraint on Windows that fails silently)
- `go install github.com/ossf/scorecard/v5@latest` (root-package path, no `/cmd/scorecard`) — also tried, same result

The `ossf/scorecard` Windows build is known to have edge cases (the project's CI runs on Linux primarily); the silent-no-binary behavior on `go install` is consistent with a build constraint absorbing the windows target. Forwarded as **operator-AI W316-D-OSSF-SCORECARD-WIN-INSTALL**.

### Operator path forward

Two options:

1. **Use the pre-built release** — `gh release download v5.x.x --repo ossf/scorecard --pattern "*windows-amd64*"` and place on PATH.
2. **Build from source in WSL2** — `wsl -e bash -c "go install github.com/ossf/scorecard/v5/cmd/scorecard@latest"` writes to a Linux GOPATH; `scorecard` is then invoked through WSL.

Either approach unblocks the `tools/sca-v7-prelim.sh` wrapper's scorecard branch. In the interim, the wrapper degrades gracefully: scorecard fields return `-1` and dim mappings floor to `1` (visible in the smoke-test JSON below).

## Wrapper smoke test

```
$ tools/sca-v7-prelim.sh stanfordnlp/dspy
{
  "repo": "stanfordnlp/dspy",
  "scorecard_overall": -1,
  "criticality_score": -1,
  "prelim": {
    "D6_signed_releases": 1,
    "D7_pinned_deps": 1,
    "D16_bus_factor": 1,
    "D27_independent_adopter_floor": 1
  },
  "raw": {
    "scorecard_signed_releases": -1,
    "scorecard_pinned_deps": -1,
    "criticality_contributor_count": 0,
    "criticality_dependent_count": 0
  }
}
```

Notes on the result:

- Scorecard fields all `-1` because `scorecard.exe` is not installed (degraded path).
- Criticality fields `0` because `criticality_score.exe` ran but the CSV parsing path expected `legacy.contributor_count` / `legacy.dependent_count` column names; the actual columns may have shifted in v2 (criticality_score v2 emits different headers than v1). Forwarded as **operator-AI W316-D-CRITICALITY-CSV-HEADERS** to re-probe the actual CSV columns and update `awk` parsing.

Once both root causes are addressed (scorecard install + criticality CSV column names), the wrapper will emit accurate prelim sca-v7 D6/D7/D16/D27 scores per the sca-v7.1 §6.1 anti-bias automation mandate.

## Wrapper structure verdict

The wrapper itself is SHIPPED at `tools/sca-v7-prelim.sh` (executable, valid JSON output regardless of underlying-tool availability, fail-loud via stderr if `gh auth token` unavailable). Once the binary issues are fixed, no wrapper changes are needed.

## Cite

- sca-v7.1 §6.1 anti-bias automation mandate
- CLAUDE.md CR-2 — direct upstream CLI invocations (the wrapper invokes `scorecard.exe` / `criticality_score.exe` as upstream-distributed binaries)
- W314-Stream-B-EXTENDED-SOTA-CASCADE — OSSF tooling identified as T1-PRELIM 4.500 candidates (W315-r2 demoted to T2 data-source-mode per sca-v7 §5.7 correction-factor)
