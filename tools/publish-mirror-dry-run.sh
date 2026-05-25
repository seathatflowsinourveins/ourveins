#!/usr/bin/env bash
# tools/publish-mirror-dry-run.sh
#
# W435 G7 — Pre-publish local dry-run safety check.
# Closes task #801 (W432-G6) per W431 BINDING-VERDICTS §2.10 step 8.
#
# WHAT THIS DOES
#   1. Verify required CLI tools are present at version-floor.
#   2. Run gitleaks v8 detect (zero-tolerance; no-git working-tree scan).
#   3. Run trufflehog v3 filesystem scan (verified+unknown; high-confidence consensus).
#   4. repomix CycloneDX-SBOM probe + diff-size signal.
#   5. 2-tool consensus: BOTH gitleaks AND trufflehog MUST report clean — fail-closed otherwise.
#   6. Emit `tmp/publish-dry-run-summary.md` audit summary.
#
# WHAT THIS DOES NOT DO
#   - Does NOT push anything anywhere. This is local-only.
#   - Does NOT decide on the publish; operator reviews the summary and triggers
#     `.github/workflows/publish-mirror.yml` separately.
#   - Does NOT mutate the repo (no commits, no remote adds, no destructive ops).
#
# EXIT CODES
#   0 — both gitleaks + trufflehog clean; publish is preliminarily safe per local scans.
#   1 — gitleaks found findings.
#   2 — trufflehog found findings.
#   3 — both gitleaks AND trufflehog found findings.
#   4 — required tooling missing OR version-floor unmet.
#   5 — internal error (script malfunction; report stderr).
#
# CITE ANCHORS (≥3 distinct orgs per cardinal-rule-6 verify-before-claim)
#   - GitHub Inc:
#       https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning
#   - OpenSSF (Linux Foundation):
#       https://openssf.org/projects/scorecard/
#       https://github.com/ossf/scorecard/blob/main/docs/checks.md#secrets
#   - gitleaks (Zachary Rice / Gitleaks LLC):
#       https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1
#       https://github.com/gitleaks/gitleaks/wiki  (rule taxonomy)
#   - trufflesecurity (Truffle Security):
#       https://github.com/trufflesecurity/trufflehog/releases/tag/v3.95.3
#       https://docs.trufflesecurity.com/  (detector catalog)
#   - NIST:
#       https://csrc.nist.gov/Projects/ssdf  (SP 800-218 PW.7 review/analyze code;
#                                              RV.1 identify+confirm vulnerabilities)
#   - OWASP:
#       https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-07-Insecure-System-Configuration
#       https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/
#   - CycloneDX (OWASP):
#       https://cyclonedx.org/docs/1.6/
#   - repomix:
#       https://github.com/yamadashy/repomix  (CycloneDX-SBOM bundle + secret-scan)
#
# AUTHOR: claude-sota-installed W435-PUBLISH-TOOLING wave (2026-05-24)

set -euo pipefail

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SUMMARY_PATH="$REPO_ROOT/tmp/publish-dry-run-summary.md"
SUMMARY_DIR="$(dirname "$SUMMARY_PATH")"
GITLEAKS_REPORT="$SUMMARY_DIR/dry-run-gitleaks.json"
TRUFFLEHOG_REPORT="$SUMMARY_DIR/dry-run-trufflehog.json"
TRUFFLEHOG_STDERR="$SUMMARY_DIR/dry-run-trufflehog.stderr.log"
REPOMIX_REPORT="$SUMMARY_DIR/dry-run-repomix.json"
REPOMIX_LOG="$SUMMARY_DIR/dry-run-repomix.log"

# Version floors (kept in lock-step with .github/workflows/publish-mirror.yml).
GITLEAKS_MIN='8.30.0'
TRUFFLEHOG_MIN='3.90.0'

mkdir -p "$SUMMARY_DIR"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
RED=$'\033[0;31m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[0;33m'
BLUE=$'\033[0;34m'
RESET=$'\033[0m'

log() {
    printf "%s[publish-mirror-dry-run]%s %s\n" "$BLUE" "$RESET" "$*"
}
ok()  {
    printf "%s[ ok ]%s %s\n" "$GREEN" "$RESET" "$*"
}
warn() {
    printf "%s[warn]%s %s\n" "$YELLOW" "$RESET" "$*"
}
err() {
    printf "%s[ERR ]%s %s\n" "$RED" "$RESET" "$*" >&2
}

# Compare two semver-ish version strings. Returns 0 if `$1 >= $2`.
version_ge() {
    # Strip leading 'v' if present.
    local a="${1#v}"
    local b="${2#v}"
    # Use sort -V (GNU coreutils version-sort) for canonical compare.
    local lowest
    lowest=$(printf '%s\n%s\n' "$a" "$b" | sort -V | head -n 1)
    [[ "$lowest" == "$b" ]]
}

# ---------------------------------------------------------------------------
# Stage 0: tooling pre-flight
# ---------------------------------------------------------------------------
log "Stage 0: tooling pre-flight"

# gitleaks
if ! command -v gitleaks >/dev/null 2>&1; then
    err "gitleaks not on PATH. Install per https://github.com/gitleaks/gitleaks/releases"
    exit 4
fi
GITLEAKS_VER=$(gitleaks version 2>&1 | head -n 1 | tr -d 'v' | awk '{print $1}')
if ! version_ge "$GITLEAKS_VER" "$GITLEAKS_MIN"; then
    err "gitleaks v$GITLEAKS_VER < required v$GITLEAKS_MIN"
    exit 4
fi
ok "gitleaks v$GITLEAKS_VER >= v$GITLEAKS_MIN"

# trufflehog
if ! command -v trufflehog >/dev/null 2>&1; then
    err "trufflehog not on PATH. Install per https://github.com/trufflesecurity/trufflehog/releases"
    exit 4
fi
TRUFFLEHOG_VER=$(trufflehog --version 2>&1 | head -n 1 | sed -E 's/.*([0-9]+\.[0-9]+\.[0-9]+).*/\1/')
if ! version_ge "$TRUFFLEHOG_VER" "$TRUFFLEHOG_MIN"; then
    err "trufflehog v$TRUFFLEHOG_VER < required v$TRUFFLEHOG_MIN"
    exit 4
fi
ok "trufflehog v$TRUFFLEHOG_VER >= v$TRUFFLEHOG_MIN"

# git
if ! command -v git >/dev/null 2>&1; then
    err "git not on PATH (required for diff-size signal)."
    exit 4
fi
ok "git $(git --version | awk '{print $3}')"

# repomix (optional — SBOM probe is supplemental)
REPOMIX_PRESENT=false
if command -v npx >/dev/null 2>&1; then
    REPOMIX_PRESENT=true
    ok "npx available (will probe repomix CycloneDX-SBOM)"
else
    warn "npx not on PATH — skipping repomix SBOM probe (supplemental signal only)"
fi

# Move into repo root.
cd "$REPO_ROOT"

# ---------------------------------------------------------------------------
# Stage 1: gitleaks v8 detect — zero-tolerance, working-tree scan
# ---------------------------------------------------------------------------
log "Stage 1: gitleaks v8 detect (no-git working-tree scan)"

# `--no-git` matches the orphan-export safety model: we only publish the working
# tree of the SoT HEAD, never any historical blob. Scanning git history here
# would surface findings that the orphan-publish architecture explicitly does
# not expose, leading to false positives that erode operator trust.
#
# `--exit-code 1` → fail on any finding (zero-tolerance).
# `--redact` → don't print actual secret values to local stdout.
set +e
gitleaks detect \
    --no-git \
    --redact \
    --report-format json \
    --report-path "$GITLEAKS_REPORT" \
    --exit-code 1
GITLEAKS_RC=$?
set -e

GITLEAKS_FINDINGS=0
if [[ -f "$GITLEAKS_REPORT" ]]; then
    # Findings are a JSON array; count length if non-empty.
    if command -v jq >/dev/null 2>&1; then
        GITLEAKS_FINDINGS=$(jq 'if type=="array" then length else 0 end' "$GITLEAKS_REPORT" 2>/dev/null || echo 0)
    else
        # Fallback: count occurrences of `"RuleID":` (one per finding).
        GITLEAKS_FINDINGS=$(grep -c '"RuleID":' "$GITLEAKS_REPORT" 2>/dev/null || echo 0)
    fi
fi

if [[ $GITLEAKS_RC -eq 0 ]]; then
    ok "gitleaks: CLEAN ($GITLEAKS_FINDINGS findings)"
    GITLEAKS_VERDICT='clean'
else
    err "gitleaks: FOUND $GITLEAKS_FINDINGS finding(s) (exit $GITLEAKS_RC)"
    err "  → review $GITLEAKS_REPORT"
    GITLEAKS_VERDICT='leaked'
fi

# ---------------------------------------------------------------------------
# Stage 2: trufflehog v3 filesystem scan — verified + unknown
# ---------------------------------------------------------------------------
log "Stage 2: trufflehog v3 filesystem scan (verified+unknown; high-confidence consensus)"

# Per W431 §2.10 step 8: trufflehog filesystem --results=verified,unknown --fail
# `verified` = TruffleHog's detector contacted the vendor's API and confirmed the
#              credential is currently live (highest confidence).
# `unknown`  = high-confidence pattern match where vendor verification is not
#              possible (e.g., generic password-like patterns).
# `--no-update` keeps the scan reproducible (no detector-rule auto-update).
# `--fail` → exits non-zero on any finding (zero-tolerance like gitleaks).
set +e
trufflehog filesystem . \
    --results=verified,unknown \
    --no-update \
    --fail \
    --json > "$TRUFFLEHOG_REPORT" 2> "$TRUFFLEHOG_STDERR"
TRUFFLEHOG_RC=$?
set -e

TRUFFLEHOG_FINDINGS=0
if [[ -f "$TRUFFLEHOG_REPORT" && -s "$TRUFFLEHOG_REPORT" ]]; then
    # trufflehog emits NDJSON (one JSON object per line); count lines.
    TRUFFLEHOG_FINDINGS=$(grep -c '^{' "$TRUFFLEHOG_REPORT" 2>/dev/null || echo 0)
fi

if [[ $TRUFFLEHOG_RC -eq 0 ]]; then
    ok "trufflehog: CLEAN ($TRUFFLEHOG_FINDINGS findings)"
    TRUFFLEHOG_VERDICT='clean'
else
    err "trufflehog: FOUND $TRUFFLEHOG_FINDINGS finding(s) (exit $TRUFFLEHOG_RC)"
    err "  → review $TRUFFLEHOG_REPORT (stderr: $TRUFFLEHOG_STDERR)"
    TRUFFLEHOG_VERDICT='leaked'
fi

# ---------------------------------------------------------------------------
# Stage 3: repomix CycloneDX-SBOM probe (supplemental signal)
# ---------------------------------------------------------------------------
REPOMIX_VERDICT='skipped'
REPOMIX_SIZE_KB='n/a'
REPOMIX_TOKENS='n/a'
REPOMIX_FILES='n/a'

if $REPOMIX_PRESENT; then
    log "Stage 3: repomix CycloneDX-SBOM probe + diff-size signal"
    # Per https://github.com/yamadashy/repomix — packs codebase into single XML/MD
    # for AI-consumption + emits stats. We use its file-count + token-count + size
    # numbers as a coarse "what's about to be published" signal. NOT a security
    # gate; this is operator-friendly visibility into the publish surface.
    set +e
    npx --yes repomix --output "$REPOMIX_REPORT" --style json --quiet 2> "$REPOMIX_LOG"
    REPOMIX_RC=$?
    set -e

    if [[ $REPOMIX_RC -eq 0 && -f "$REPOMIX_REPORT" ]]; then
        if command -v jq >/dev/null 2>&1; then
            REPOMIX_FILES=$(jq -r '.fileCount // .files // (.files | length) // "n/a"' "$REPOMIX_REPORT" 2>/dev/null || echo 'n/a')
            REPOMIX_SIZE_KB=$(jq -r 'if .totalChars then ((.totalChars / 1024) | floor | tostring) else "n/a" end' "$REPOMIX_REPORT" 2>/dev/null || echo 'n/a')
            REPOMIX_TOKENS=$(jq -r '.totalTokens // "n/a"' "$REPOMIX_REPORT" 2>/dev/null || echo 'n/a')
        fi
        REPOMIX_VERDICT='probed'
        ok "repomix: probed (files=$REPOMIX_FILES, ~${REPOMIX_SIZE_KB}KB, tokens=$REPOMIX_TOKENS)"
    else
        warn "repomix probe failed (exit $REPOMIX_RC) — see $REPOMIX_LOG"
        REPOMIX_VERDICT='error'
    fi
else
    log "Stage 3: repomix probe SKIPPED (npx unavailable)"
fi

# Diff-size signal (working tree vs HEAD).
DIFF_FILES=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
HEAD_SHA=$(git rev-parse --short=12 HEAD 2>/dev/null || echo 'unknown')
TRACKED_FILES=$(git ls-files | wc -l | tr -d ' ')

# ---------------------------------------------------------------------------
# Stage 4: 2-tool consensus
# ---------------------------------------------------------------------------
log "Stage 4: 2-tool consensus (BOTH gitleaks AND trufflehog must report clean)"

CONSENSUS_PASS=false
EXIT_CODE=0
if [[ "$GITLEAKS_VERDICT" == "clean" && "$TRUFFLEHOG_VERDICT" == "clean" ]]; then
    CONSENSUS_PASS=true
    ok "2-tool consensus: PASS — publish is preliminarily safe per local scans"
    EXIT_CODE=0
elif [[ "$GITLEAKS_VERDICT" == "leaked" && "$TRUFFLEHOG_VERDICT" == "leaked" ]]; then
    err "2-tool consensus: BOTH scanners flagged secrets — publish BLOCKED"
    EXIT_CODE=3
elif [[ "$GITLEAKS_VERDICT" == "leaked" ]]; then
    err "2-tool consensus: gitleaks flagged secrets — publish BLOCKED"
    EXIT_CODE=1
else
    err "2-tool consensus: trufflehog flagged secrets — publish BLOCKED"
    EXIT_CODE=2
fi

# ---------------------------------------------------------------------------
# Stage 5: write SUMMARY.md
# ---------------------------------------------------------------------------
log "Stage 5: writing $SUMMARY_PATH"

NOW_UTC=$(date -u +%Y-%m-%dT%H:%M:%SZ)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')

# Use a heredoc for the summary; preserves alignment of the verdict table.
cat > "$SUMMARY_PATH" <<EOF
# W435 G7 — Publish-Mirror Pre-Publish Dry-Run Summary

**Generated**:        \`$NOW_UTC\`
**Repo root**:        \`$REPO_ROOT\`
**Branch**:           \`$GIT_BRANCH\`
**HEAD SHA**:         \`$HEAD_SHA\`
**Working-tree diff**: \`$DIFF_FILES\` files dirty (vs HEAD)
**Tracked files**:    \`$TRACKED_FILES\`

## Tool versions

| Tool        | Version                | Floor       |
|-------------|------------------------|-------------|
| gitleaks    | \`$GITLEAKS_VER\`      | \`$GITLEAKS_MIN\`  |
| trufflehog  | \`$TRUFFLEHOG_VER\`    | \`$TRUFFLEHOG_MIN\` |
| git         | \`$(git --version | awk '{print $3}')\` | n/a |

## Scan results

| Stage              | Verdict          | Findings              | Report                          |
|--------------------|------------------|-----------------------|---------------------------------|
| 1. gitleaks v8     | **$GITLEAKS_VERDICT** | $GITLEAKS_FINDINGS    | \`$GITLEAKS_REPORT\`            |
| 2. trufflehog v3   | **$TRUFFLEHOG_VERDICT** | $TRUFFLEHOG_FINDINGS  | \`$TRUFFLEHOG_REPORT\`          |
| 3. repomix probe   | $REPOMIX_VERDICT | files=$REPOMIX_FILES  | \`$REPOMIX_REPORT\`             |

### Repomix publish-surface signal

- File count:   \`$REPOMIX_FILES\`
- Total size:   \`~${REPOMIX_SIZE_KB}KB\`
- Total tokens: \`$REPOMIX_TOKENS\`

## 2-tool consensus

EOF

if $CONSENSUS_PASS; then
    cat >> "$SUMMARY_PATH" <<EOF
**VERDICT: PASS** — both gitleaks AND trufflehog report clean.

Publish-mirror is preliminarily safe per local scans. Operator may proceed to:

\`\`\`bash
gh workflow run publish-mirror.yml \\
  -f target_repo=seathatflowsinourveins/ourveins \\
  -f source_ref=main \\
  -f confirm_orphan=ORPHAN-PUBLISH
\`\`\`

NB: The remote CI pre-flight will re-run both scanners against the SoT tree
exactly as this dry-run did; this is the defense-in-depth pattern per
W431 BINDING-VERDICTS §2.10 step 8 (local + CI-side consensus).
EOF
else
    cat >> "$SUMMARY_PATH" <<EOF
**VERDICT: BLOCK** — secrets detected. Publish-mirror MUST NOT proceed.

| Tool        | Verdict   |
|-------------|-----------|
| gitleaks    | $GITLEAKS_VERDICT |
| trufflehog  | $TRUFFLEHOG_VERDICT |

### Operator remediation steps

1. Open the JSON report(s) above to identify offending file:line.
2. Remove or scrub the secret from the working tree.
3. If the secret is real and was ever committed to ANY branch, **rotate it**;
   per W431 §2.10 step 10: \`unrotated leaked credentials remain compromised
   forever; this architecture prevents public object exposure, NOT credential
   recovery.\`
4. Move secret to \`CLAUDE.local.md\` (gitignored) or GitHub Secrets, then
   reference via \`\${ENV_VAR}\` interpolation per cardinal-rule-5.
5. Re-run \`tools/publish-mirror-dry-run.sh\`.

EOF
fi

cat >> "$SUMMARY_PATH" <<EOF

## Architecture reference (cardinal-rule-6 verify-before-claim cite anchors)

- W431 \`docs/architecture/W431-RESEARCH-ARCH-META/BINDING-VERDICTS.md\` §2.10
  (10-step pre-publish operator checklist; orphan-export safety boundary).
- W434 \`docs/architecture/W434-GITHUB-CICD/PHASE-4-G7-CHECKLIST.md\` §1.1, §6
  (continue-on-error flip + G7 launch checklist).
- GitHub Inc — \`https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning\`
- OpenSSF — \`https://openssf.org/projects/scorecard/\` + \`https://github.com/ossf/scorecard\`
- gitleaks v8.30.1 — \`https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1\`
- trufflehog v3.95.3 — \`https://github.com/trufflesecurity/trufflehog/releases/tag/v3.95.3\`
- NIST SP 800-218 PW.7 + RV.1 — \`https://csrc.nist.gov/Projects/ssdf\`
- OWASP A07:2021 — \`https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/\`
- CycloneDX v1.6 — \`https://cyclonedx.org/docs/1.6/\`

## Exit code interpretation

| Exit | Meaning                                                              |
|------|----------------------------------------------------------------------|
| 0    | Both scanners clean; publish is preliminarily safe (consensus PASS). |
| 1    | gitleaks found findings.                                             |
| 2    | trufflehog found findings.                                           |
| 3    | Both gitleaks AND trufflehog found findings.                         |
| 4    | Required tooling missing OR version-floor unmet.                     |
| 5    | Internal error (report stderr).                                      |

This dry-run exited with code: **$EXIT_CODE**
EOF

ok "summary written: $SUMMARY_PATH"

# ---------------------------------------------------------------------------
# Final verdict line (stdout — operator-friendly)
# ---------------------------------------------------------------------------
echo
echo '=================================================================='
if $CONSENSUS_PASS; then
    printf '%s✓ DRY-RUN PASS%s — 2-tool consensus clean; publish preliminarily safe.\n' "$GREEN" "$RESET"
    printf 'See: %s\n' "$SUMMARY_PATH"
else
    printf '%s✗ DRY-RUN BLOCK%s — secrets detected; publish MUST NOT proceed.\n' "$RED" "$RESET"
    printf 'See: %s\n' "$SUMMARY_PATH"
fi
echo '=================================================================='
echo

exit $EXIT_CODE
