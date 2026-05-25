#!/usr/bin/env bash
# tools/gh-search-rest.sh — GitHub Search REST API fallback wrapper.
#
# Purpose: REST-based fallback for `mcp__plugin_everything-claude-code_github__search_repositories`,
#          which silently returns 0 hits on well-formed queries (W312-D F1 + W313-D + W314-B
#          convergent — confirmed 3+ waves).
#
# Trigger condition: when the MCP search returns 0 hits on a query expected to yield results
#          (e.g., a repo you know exists), invoke this Stage-1 fallback BEFORE declaring
#          negative-cascade.
#
# Usage:
#   tools/gh-search-rest.sh "<query>"
#
# Examples:
#   tools/gh-search-rest.sh "stanfordnlp/dspy"             # expect 1+ hits
#   tools/gh-search-rest.sh "ossf scorecard language:go"   # qualifiers OK
#   tools/gh-search-rest.sh "yeshuibo/agentflow"           # expect 0 hits (test negative)
#
# Output: JSON to stdout — full GitHub Search API response (items + total_count).
#         Suitable for piping to jq for downstream parsing.
#
# Requires: gh CLI v2+ authenticated (`gh auth status`).
#
# Cardinal-rule compliance: cite-anchored to CLAUDE.md silent-fallback discipline + Anthropic
#   permissions/sandbox per `https://docs.anthropic.com/en/docs/claude-code/settings` (CR-5).

# W326-F F-B1: -Eeuo (capital E propagates ERR trap into functions/subshells +
# command-substitutions per Bash man-page); ERR trap surfaces silent failures.
set -Eeuo pipefail
# shellcheck disable=SC2154  # `rc` is assigned via $? inside the single-quoted trap body
trap 'rc=$?; echo "ERR: $0 line $LINENO exited $rc (cmd: ${BASH_COMMAND})" >&2' ERR

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <query>" >&2
  echo "       Wraps GitHub Search REST API for the silent-fallback MCP case." >&2
  exit 2
fi

QUERY="$1"

# gh's --raw-field URL-encodes the query value safely; --method GET forces query-string semantics.
gh api -X GET \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  --raw-field "q=${QUERY}" \
  --raw-field "per_page=20" \
  /search/repositories
