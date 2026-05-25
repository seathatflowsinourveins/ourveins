#!/usr/bin/env bash
# apply-branch-protection.sh — W352 S7 — idempotent gh API applier
# Reads tools/branch-protection.json, applies to GitHub via gh api.
# Usage: ./tools/apply-branch-protection.sh [--dry-run]
#
# Operator-only: requires gh CLI authenticated + admin on repo.
# Rollback: gh api -X DELETE repos/<owner>/<repo>/branches/main/protection
set -euo pipefail

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

REPO="${BRANCH_PROTECTION_REPO:-seathatflowsinourveins/claude-sota-installed}"
BRANCH="${BRANCH_PROTECTION_BRANCH:-main}"
SPEC="$(dirname "$0")/branch-protection.json"

[ -f "${SPEC}" ] || { echo "ERROR: missing spec at ${SPEC}" >&2; exit 2; }
command -v jq >/dev/null 2>&1 || { echo "ERROR: jq not on PATH" >&2; exit 2; }
command -v gh >/dev/null 2>&1 || { echo "ERROR: gh CLI not on PATH" >&2; exit 2; }

# Strip schema/target/purpose metadata before sending to GitHub
BODY=$(jq -c '. | del(._schema, ._target, ._purpose)' "${SPEC}")

if [ "${DRY_RUN}" = "1" ]; then
  echo "DRY-RUN: would PUT repos/${REPO}/branches/${BRANCH}/protection with body:"
  echo "${BODY}" | jq .
  exit 0
fi

# Live apply
echo "Applying branch-protection to ${REPO}@${BRANCH} ..."
echo "${BODY}" | gh api -X PUT "repos/${REPO}/branches/${BRANCH}/protection" --input -

echo "OK: branch-protection applied to ${REPO}@${BRANCH}"
