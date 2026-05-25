#!/bin/bash
# W350 Branch Consolidation — tag-and-delete 20 stale branches
#
# Per Fork B SOTA research (2026-05-20):
# - AWS guidance: delete branches > retention period (docs.aws.amazon.com/wellarchitected 2023)
# - Branches preserved as `archive/<branch-name>` tags (reversible via `git checkout -b <branch> archive/<branch>`)
# - Reduces 24+ branches → 4 active keepers (main, w348-sota-fix, w348, goal/W348-carry-cleanup) + W350 in-flight
#
# SAFETY:
# - TAG-FIRST: each branch tagged before deletion (history preserved)
# - PUSH SEPARATELY: tags pushed before deletes (ordering matters)
# - REMOTE-ONLY: this script does NOT delete local branches (operator can delete locally after)
# - DRY-RUN MODE: prefix with `DRY_RUN=1 bash BRANCH-CONSOLIDATION-SCRIPT.sh` to preview
#
# REVERSIBILITY:
# - `git checkout -b <branch> archive/<branch>` recovers any deleted branch
# - `git push origin :refs/tags/archive/<branch>` deletes the archive tag if desired
#
# CITE: Fork B Q3 at docs/architecture/W350-sota-git-tree-foundation/FORK-B-SOTA-GIT-PRACTICE-RESEARCH.md
# CITE: AWS Well-Architected DevOps Guidance §dl.scm.2-keep-feature-branches-short-lived

set -euo pipefail

STALE_BRANCHES=(
  # goal/* branches (post-merge cleanup wave dwellage)
  "goal/W331-sota-convergence"
  "goal/W333-sota-unleash"
  "goal/W334-sota-continue"
  "goal/W334-wave-closure"
  "goal/W335-sota-convergence"
  "goal/W336-continue"
  "goal/W337-continue"
  "goal/W343"
  "goal/W347-sota-unleash"

  # sota-converge-* (3 historical convergence branches)
  "sota-converge-w295"
  "sota-converge-w310"
  "sota-converge-w330"

  # archive/* (already-archived prefix; consolidate to tag form)
  "archive/W287-reconcile"
  "archive/W290-reconcile"
  "archive/W328-sota-unleash"

  # w<NNN>-* execute/mainsession branches
  "w342-execute"
  "w343-y1y2y3y4-mainsession"
  "w344-mainsession-ship"
  "w344-sota-unleash"

  # Misc
  "W321"
)

echo "W350 branch-consolidation: ${#STALE_BRANCHES[@]} branches queued for tag-and-delete"
echo "Mode: ${DRY_RUN:+DRY-RUN }${DRY_RUN:-LIVE-EXECUTE}"
echo

for B in "${STALE_BRANCHES[@]}"; do
  TAG_NAME="archive/${B}"

  # Verify branch exists on origin AND get the exact SHA (codex r1 MEDIUM fix —
  # `origin/${B}` may be stale or absent locally even if `ls-remote` finds it).
  REMOTE_SHA=$(git ls-remote --heads origin "refs/heads/${B}" 2>/dev/null | awk '{print $1}')
  if [ -z "${REMOTE_SHA}" ]; then
    echo "SKIP ${B} — not found on origin"
    continue
  fi

  # If archive tag already exists, check if it points at the SAME SHA as the
  # current branch tip. If equal, the tag-step is already done from a prior run
  # — skip to delete-step. If different, the branch has advanced since the tag
  # was created → abort + flag for manual remediation (codex r3 HIGH fix:
  # closes rerunnability gap where prior abort/failure stranded the branch).
  EXISTING_TAG_SHA=$(git ls-remote --tags origin "refs/tags/${TAG_NAME}" 2>/dev/null | awk '{print $1}')
  TAG_ALREADY_EXISTS=0
  if [ -n "${EXISTING_TAG_SHA}" ]; then
    if [ "${EXISTING_TAG_SHA}" = "${REMOTE_SHA}" ]; then
      TAG_ALREADY_EXISTS=1   # tag is current — resume to delete step
      echo "  i ${B} — archive tag exists at matching SHA ${REMOTE_SHA:0:7}; resuming to delete step"
    else
      echo "SKIP ${B} — archive tag exists at DIFFERENT SHA (tag=${EXISTING_TAG_SHA:0:7} branch=${REMOTE_SHA:0:7}); branch advanced since archive — manual remediation required"
      continue
    fi
  fi

  if [ -n "${DRY_RUN:-}" ]; then
    echo "DRY-RUN ${B} (sha=${REMOTE_SHA:0:7}) → would tag as ${TAG_NAME} + delete from origin"
  else
    echo "PROCESSING ${B} (sha=${REMOTE_SHA:0:7})..."

    if [ "${TAG_ALREADY_EXISTS}" -eq 0 ]; then
      # Step 1: Fetch the remote ref directly into a tag-anchor (atomic — does
      #         not depend on local remote-tracking ref freshness; codex r1
      #         MEDIUM fix). The fetch creates refs/tags/${TAG_NAME} locally.
      git fetch origin "${B}:refs/tags/${TAG_NAME}" 2>&1 | sed 's/^/  /'

      # Step 2: Push tag to origin
      git push origin "refs/tags/${TAG_NAME}" 2>&1 | sed 's/^/  /'
    fi

    # Step 3: Atomic SHA-leased delete (codex r2 HIGH fix — race-condition
    #         closure). Re-probe origin SHA immediately before delete; if it
    #         advanced since Step 1 the tag captured the OLD tip but the
    #         delete would lose the NEW commits. Abort + carry forward.
    CURRENT_SHA=$(git ls-remote --heads origin "refs/heads/${B}" 2>/dev/null | awk '{print $1}')
    if [ "${CURRENT_SHA}" != "${REMOTE_SHA}" ]; then
      echo "  ! ABORT ${B} — SHA drifted ${REMOTE_SHA:0:7}→${CURRENT_SHA:0:7} between Step 1 and Step 3; tag preserved, branch NOT deleted. Re-run script after fresh fetch."
      continue
    fi

    # Step 4: Force-with-lease delete (uses Git's atomic-CAS semantics — the
    #         delete only succeeds if origin's current SHA matches the lease).
    git push --force-with-lease="${B}:${REMOTE_SHA}" origin ":refs/heads/${B}" 2>&1 | sed 's/^/  /'

    echo "  ✓ ${B} archived as tag ${TAG_NAME} (sha ${REMOTE_SHA:0:7}) + atomically deleted from origin"
  fi
done

echo
echo "W350 branch-consolidation complete."
echo "Recovery: git checkout -b <branch> archive/<branch>"
echo "Remaining active branches expected: main, w348-sota-fix, w348, goal/W348-carry-cleanup, goal/W350-sota-git-tree-foundation"
