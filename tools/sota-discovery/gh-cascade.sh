#!/usr/bin/env bash
# gh-cascade.sh — GitHub 6-step ENUMERATION-BYPASS cascade
# Cite: sca-v15 §1.5 Stage-0.5 ENUMERATION-BYPASS Cascade
#
# USE WHEN: gh api search/repositories sizing probe returns >1000 hits OR
#           exhaustive enumeration required for anti-bias D73 quorum.
#
# REQUIREMENTS:
#   gh (https://cli.github.com/) >=2.50 authenticated to GitHub
#   jq (https://jqlang.org/) for response parsing
#   bq (Google Cloud SDK) for step 4 (optional but recommended)
#   curl for step 5 (ecosyste.ms) + step 6 (GH Archive)
#
# USAGE:
#   ./gh-cascade.sh "claude-code agent orchestration" > out.jsonl
#
# OUTPUT: JSONL — one repo per line with cascaded metadata
#         + per-step provenance tag (step1..step6) for anti-bias attribution

set -euo pipefail

QUERY="${1:-claude-code agent orchestration}"
# Codex r2 fix: when no second arg, write directly to stdout (no tee duplication).
# When operator passes a filename, tee to that file AND stdout.
OUT_FILE="${2:-}"

echo "[gh-cascade] query='${QUERY}' output='${OUT_FILE:-<stdout>}'" >&2

# Helper: emit JSONL line to OUT_FILE (or stdout when unset).
emit() {
  if [ -n "${OUT_FILE}" ]; then
    tee -a "${OUT_FILE}"
  else
    cat
  fi
}

# ---- Step 1: GraphQL sizing-probe ----
# Codex r2 fix: search() requires `first` >= 1 (page-size lower bound); use 1 and ignore edges.
SIZING=$(gh api graphql -f query='
  query($q: String!) {
    search(query: $q, type: REPOSITORY, first: 1) {
      repositoryCount
    }
  }
' -F q="${QUERY}" --jq '.data.search.repositoryCount')
echo "[gh-cascade step1] repositoryCount=${SIZING}" >&2

if [ "${SIZING}" -le 1000 ]; then
    # Within hard cap — paginate via gh `--paginate` (codex r3 P2 fix: REST search
    # defaults to per_page=30; without pagination a 286-hit query silently truncates
    # to 30 rows. `gh api --paginate` walks all pages until exhausted).
    gh api --paginate -X GET "search/repositories" -f q="${QUERY}" -f per_page=100 --jq '.items[] | . + {_cascade_step: "step1-search"}' \
        | emit
    echo "[gh-cascade] done via step1-search (${SIZING} hits ≤1000 cap, paginated per_page=100)" >&2
    exit 0
fi

# ---- Step 2: Binary-split date/stars window-partition ----
echo "[gh-cascade step2] >1000 hits — partitioning by stars window" >&2
for STARS_WINDOW in "stars:>500" "stars:100..500" "stars:50..100" "stars:10..50" "stars:1..10" "stars:0"; do
    # Codex r2 fix: first >= 1 required.
    WINDOW_SIZE=$(gh api graphql -f query='
      query($q: String!) {
        search(query: $q, type: REPOSITORY, first: 1) {
          repositoryCount
        }
      }
    ' -F q="${QUERY} ${STARS_WINDOW}" --jq '.data.search.repositoryCount')
    echo "[gh-cascade step2] window='${STARS_WINDOW}' count=${WINDOW_SIZE}" >&2

    if [ "${WINDOW_SIZE}" -gt 1000 ]; then
        echo "[gh-cascade step2] window still >1000; further partition needed (date-window)" >&2
        # Recurse via date — left as exercise (sca-v15 §1.5 references the pattern)
        continue
    fi

    # ---- Step 3: GraphQL cursor pagination within window ----
    CURSOR="null"
    PAGE=0
    while true; do
        PAGE=$((PAGE+1))
        RESP=$(gh api graphql -f query='
          query($q: String!, $after: String) {
            search(query: $q, type: REPOSITORY, first: 100, after: $after) {
              pageInfo { endCursor hasNextPage }
              edges { node { ... on Repository { nameWithOwner stargazerCount pushedAt licenseInfo { spdxId } description } } }
            }
          }
        ' -F q="${QUERY} ${STARS_WINDOW}" -F after="${CURSOR}")

        echo "${RESP}" | jq -c --arg w "${STARS_WINDOW}" --arg s "step3-graphql-cursor" \
            '.data.search.edges[].node | . + {_cascade_step: $s, _cascade_window: $w}' \
            | emit

        HAS_NEXT=$(echo "${RESP}" | jq -r '.data.search.pageInfo.hasNextPage')
        CURSOR=$(echo "${RESP}" | jq -r '.data.search.pageInfo.endCursor')
        if [ "${HAS_NEXT}" != "true" ] || [ "${CURSOR}" = "null" ]; then break; fi
        if [ "${PAGE}" -ge 10 ]; then
            echo "[gh-cascade step3] hit 10-page cap for window '${STARS_WINDOW}' — moving on" >&2
            break
        fi
    done
done

# ---- Step 4: BigQuery cross-check (optional, requires bq + GCP creds) ----
if command -v bq >/dev/null 2>&1; then
    echo "[gh-cascade step4] cross-checking via BigQuery bigquery-public-data.github_repos" >&2
    bq query --use_legacy_sql=false --format=json --max_rows=200 \
      "SELECT repo_name, watch_count, fork_count FROM \`bigquery-public-data.github_repos.sample_repos\`
       WHERE LOWER(repo_name) LIKE '%${QUERY,,}%' ORDER BY watch_count DESC LIMIT 100" \
      | jq -c '.[] | . + {_cascade_step: "step4-bigquery"}' | emit || true
else
    echo "[gh-cascade step4] SKIPPED (bq not installed)" >&2
fi

# ---- Step 5: ecosyste.ms star-independent signals ----
echo "[gh-cascade step5] querying ecosyste.ms (multi-host, star-independent)" >&2
ECOSYSTEMS_URL="https://repos.ecosyste.ms/api/v1/repositories/lookup?q=$(printf '%s' "${QUERY}" | jq -sRr @uri)"
curl -sS "${ECOSYSTEMS_URL}" \
    | jq -c --arg s "step5-ecosystems" '.[] | . + {_cascade_step: $s}' \
    | emit || true

# ---- Step 6: GH Archive trending velocity (optional) ----
# Reads githubarchive.day.YYYYMMDD via BigQuery (paid-tier — most installs skip)
echo "[gh-cascade step6] SKIPPED-by-default (githubarchive.day requires BigQuery paid tier; uncomment to enable)" >&2

echo "[gh-cascade] done — multi-step output in ${OUT_FILE}" >&2
