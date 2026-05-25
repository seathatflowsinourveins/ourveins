# Claude Code CLI Execution Plan — SOTA Architecture Cleanup + Convergence Audit

**Target runtime**: `Z:/claude-sota-installed/`
**Plan date**: 2026-05-12
**Plan path**: `tmp/sota-cli-execution-plan-2026-05-12.md` (gitignored)
**Predecessor work**: W155 F47-F63 OCTODECIM drift-closure arc COMPLETE; cron `81bd1a59` /loop active
**Dispatcher**: orchestrator turn in conversation 4640e21d-8643-4b9d-8e4b-481b34471044

---

## Operator handoff

Hand this plan to a **fresh Claude Code CLI session** (e.g., new `eee` terminal). The runner reads this file end-to-end FIRST, then executes phases 0→7 sequentially with **Iron Law verification gates** between each phase. Each phase outputs a report under `tmp/phaseN-<topic>-<timestamp>.md` so the operator can audit progress.

**Pre-execution acknowledgement** (runner echoes BEFORE Phase 0):
- "I have read Sections 0 (constraints) + 9 (cite trail) + 10-13 (appendices) in full."
- "I will honor Iron Law verification-before-completion at every phase transition."
- "I will use FM-02 (b)+(c) atomic narrow commits and FM-15 git CLI grammar throughout."
- "I will REPORT errors before routing around them per cardinal-rule-7."

---

## 0. Mandatory pre-flight constraints (READ FIRST)

### 0.1 Iron Law — verification-before-completion
Per `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/<sha>/skills/verification-before-completion/SKILL.md`: **NO completion claims without fresh verification evidence.** Every state assertion gated by a probe. Reading session-summary captures does NOT count as verification — re-probe live.

### 0.2 FM-02 (b)+(c) parallel-session destructive race defense
Per `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md`:
- Use `git commit --only -F <msg-file> -- <pathspec>` (NOT `git commit -a`)
- Atomic narrow: `git add -- <paths> && git commit -o -F <msg> -- <paths>`
- **NEVER `git add --only`** — invalid syntax (W156 F3 SAVED-SHIP catch #1)
- Pathspec-limited add+commit MANDATORY when tree has unrelated untracked files

### 0.3 FM-15 git CLI grammar invariant
Per `Z:/claude-sota/.claude/rules/git-cli-grammar-discipline.md`:
- ALL options BEFORE `--` separator
- `git commit -o -F tmp/msg.txt -- <path>` (correct)
- NOT `git commit -- <path> -F tmp/msg.txt` (wrong; `-F` treated as pathspec)

### 0.4 Cardinal-rule-7 REPORT before routing around
- Surface errors via stderr / commit body / iter-close report
- Silent fallback is the worst failure class
- Disclose error class + recovery applied

### 0.5 NEVER use `--no-verify` or `--force` (without consultation)
- Fix the hook, don't bypass it
- If T1/T2/T3/T6 fires, integrate verdict per Pattern A or HNF per Pattern B
- Blanket `git worktree remove --force` is UNSAFE — per W156 F3 catch #5

### 0.6 W156 F3 SAVED-SHIP catches (mandatory pre-flight)
Six P1+P2 catches that REFUTED a proposed mass cite-import-AMBER ratification ship:
1. **FM-02 P1**: `git add --only` is INVALID syntax
2. **FM-02 P1**: dirty tree → pathspec-limited add+commit
3. **CR-9 P1**: per-file sibling-path classify before cite-import (cite-anchor vs runtime-dependency vs read-only-research)
4. **CR-12 P1**: NO blanket TIER-3-LOCAL-COMPOSITION batch-upgrade to PRIMARY
5. **FM-02 P1**: NO blanket `git worktree remove --force` (≥1 live PID locks)
6. **CR-7 P2**: F3 MCP wire vs Section 14/14.5 priority

### 0.7 Skill discipline — 1% rule (mandatory)
Per `using-superpowers` meta-skill: invoke any skill that might apply BEFORE response or action. The 4-skill stack auto-fires:
- `using-superpowers` (1% rule + Skill Priority order)
- `using-agent-skills` (21 addy phase skills surfacing)
- `skill-comply` (post-invocation verification)
- `skill-creator` (new skill authoring)

For each phase, invoke domain skill BEFORE action:
- Planning → `superpowers:writing-plans` or `addy-agent-skills:planning-and-task-breakdown`
- Debugging → `superpowers:systematic-debugging` or `addy-agent-skills:debugging-and-error-recovery`
- Verification → `superpowers:verification-before-completion`
- Code review → `addy-agent-skills:code-review-and-quality` or `superpowers:requesting-code-review`

### 0.8 Cross-model consensus mandate (CR-3)
Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md`:
- T1 codex consult BEFORE design-surface edit
- T2 before commit on multi-file changes
- Path P recipe: `codex exec --skip-git-repo-check --color never < prompt.txt 2>&1 | Tee-Object -FilePath out.txt`
- Profile: `deep-review-exec` for substantive audits (xhigh effort)

### 0.9 META-process SOTA discipline (CR-11)
The build-the-runtime PROCESS itself is gated by SOTA practice. Every meta-step:
- Cite TIER-1-DIRECT source per CR-1
- Mia pre-apply on every prescription
- FM-20 path-drift cascade defense at synthesis-vs-brief hops
- Audit-action-loop Wire/Surface/Close/Re-fire

### 0.10 FM-21 STATE PROBE — clause-level smoke before Phase 0 (W156 codex T1 prescription #4)

Per `Z:/claude-sota/.claude/rules/fm21-queue-time-prompt-freeze.md` Recovery #2 STATE PROBE clause-level smoke sequence: before executing Phase 0, the runner MUST re-probe HEAD + clause applicability — if doctrine/ship/refutation landed between queue-time (when this plan was authored / cron `81bd1a59` `ead1ac67` armed) and fire-time, omit stale clauses; if still applicable, proceed.

```powershell
# Run from $root = 'Z:\claude-sota-installed' BEFORE Phase 0 probes

# (1) HEAD probe — detect post-queue-time HEAD shifts
& git -C $root log -5 --oneline
# Match: did the queued plan body assume a specific HEAD that has since shifted?
# If shifted, re-evaluate Phase 1/2/3 cleanup targets — they may already be addressed.

# (2) Working tree drift — detect parallel-session activity
& git -C $root status --short
# If dirty count >0 AND files match Phase 1/2/3 cleanup targets, FM-02 (b)+(c) race risk;
# narrow to `--only -- <pathspec>` per cardinal CLAUDE.md Hard Rules + FM-15 grammar.

# (3) Decision-keyword targeted rg — verify each queued plan clause's current applicability
& rg -n "Wave 156|F47-F63|OCTODECIM|W156 F3|cite-import-AMBER|@ 64fffd53" `
    "$root/docs/sota-installed-manifest.md" `
    "$root/docs/install-provenance.md" `
    "$root/CLAUDE.md" `
    "$root/CLAUDE.local.md" 2>$null | Select-Object -First 30

# (4) Per-clause classification — for EACH directive in the queued prompt body:
#     - shipped     → state-probe HEAD/git log/manifest confirms work landed → OMIT clause
#     - refuted     → codex T1/T2/T3 verdict + commit body documents refutation → OMIT + cite refutation
#     - still-current → no evidence of shipped/refuted → EXECUTE clause
#     - partial     → some sub-clauses shipped/refuted, others still-current → EXECUTE applicable sub-clauses + document stale sub-clauses
#
# Specifically for THIS plan:
#   - Phase 1 cleanup → check if 28+10 untracked / 36 worktrees / stale refs already triaged
#   - Phase 2 SOTA audit → check if W156 codex T1 already covered the requested dimensions
#   - Phase 3 SOTA comparison → check if SRA D1-D10 audit fires already shipped
#   - Phase 4 install → check if /plugin install / npm install / git clone targets already in `docs/install-provenance.md`
#   - Phase 5 GPT-5.5 audit → check if `b32yaijur` or equivalent codex T1 already satisfies cross-model gate
#   - Phase 6 ship → check if commits per cycle-300 already landed
#   - Phase 7 progress → check if `docs/sota-installed-manifest.md` already updated

# (5) FINAL DECISION before Phase 0:
#   - ALL clauses shipped/refuted → END loop per `/loop` STEP 5; omit next ScheduleWakeup; report to operator
#   - ANY clauses still-current → execute applicable + next ScheduleWakeup with FRESH prompt matching current state
#   - NEVER re-execute stale prompt without clause-level state-probe override
```

**Anti-pattern**: skip §0.10 and execute Phase 0 directly. Refuted by FM-21 OWNED rule §Anti-patterns: "treat stale ScheduleWakeup fire as user-message". Cron `81bd1a59` (5m) and `ead1ac67` (10m) are queued-prompt-freeze candidates; their bodies were captured at create-time and replay verbatim each tick — clause-level state probe is the only defense.

---

## 1. Phase 0 — Live-probe baseline

**Goal**: capture runtime state via FRESH probes BEFORE any modification. Iron Law gate.

```powershell
# Working directory: Z:/claude-sota-installed/
$ts = Get-Date -Format 'yyyyMMddHHmmss'
$baselineFile = "tmp/phase0-baseline-$ts.md"

# Probes 1-6 (fresh, not session-summary-derived)

# 1.1 HEAD probe
$head = & git -C 'Z:/claude-sota-installed' rev-parse HEAD
$headOneline = & git -C 'Z:/claude-sota-installed' log -1 --oneline

# 1.2 Working tree status (narrow)
$dirtyCount = (& git -C 'Z:/claude-sota-installed' status --short | Measure-Object -Line).Lines

# 1.3 Codex PID inventory
$codexPids = Get-Process -Name codex -ErrorAction SilentlyContinue |
    Select-Object Id, StartTime, CPU

# 1.4 Locked-worktree count
$wtDir = 'Z:/claude-sota-installed/.git/worktrees'
$wtCount = if (Test-Path $wtDir) {
    (Get-ChildItem $wtDir -Directory | Measure-Object).Count
} else { 0 }

# 1.5 Manifest stat
$manifest = Get-Item 'Z:/claude-sota-installed/docs/sota-installed-manifest.md'

# 1.6 Stale index.lock check
$lock = Get-Item 'Z:/claude-sota-installed/.git/index.lock' -ErrorAction SilentlyContinue

# Write baseline report
$report = @"
# Phase 0 baseline — $ts

## HEAD
- SHA: $head
- Oneline: $headOneline

## Working tree
- Dirty count: $dirtyCount

## Codex PIDs
$($codexPids | Format-Table | Out-String)

## Locked worktrees
- Count: $wtCount (expected ~36 per session-summary; verify live)

## Manifest
- Path: $($manifest.FullName)
- Size: $($manifest.Length) bytes
- LastWrite: $($manifest.LastWriteTime)

## index.lock
$(if ($lock) { "EXISTS: Length=$($lock.Length) Age=$([math]::Round(((Get-Date) - $lock.LastWriteTime).TotalMinutes,1))min" } else { "ABSENT (clean)" })
"@
$report | Out-File -FilePath $baselineFile -Encoding utf8
```

**Verification gate**: Phase 1 only proceeds AFTER `tmp/phase0-baseline-<ts>.md` written + reviewed by runner.

---

## 2. Phase 1 — Cleanup stale references

**Goal**: clear stale state that blocks subsequent SOTA install. Per W156 F3 catch #5, NO blanket destructive operations.

### 2.1 Stale codex PID triage
Identify wedged workers (low CPU + old start time):

```powershell
$now = Get-Date
$wedgedCandidates = Get-Process -Name codex -ErrorAction SilentlyContinue | Where-Object {
    ($now - $_.StartTime).TotalMinutes -gt 60 -and $_.CPU -lt 30
} | ForEach-Object {
    [PSCustomObject]@{
        Id = $_.Id
        StartTime = $_.StartTime
        AgeMinutes = [math]::Round(($now - $_.StartTime).TotalMinutes, 1)
        CPU = $_.CPU
        WorkingSet_MB = [math]::Round($_.WorkingSet64 / 1MB, 1)
    }
}
$wedgedCandidates | Export-Csv "tmp/phase1-codex-wedged-$ts.csv" -NoTypeInformation
```

**Operator-decision gate**: do NOT auto-kill. Operator inspects the CSV and confirms kill-list. Per cardinal-rule-7: REPORT first, route around only with operator approval.

### 2.2 Stale index.lock recovery (conditional)
Per `parallel-session-worktree-isolation.md` §Sub-class (b):
- Removable IF: Length=0 AND LastWriteTime > 5min ago AND no active git process

```powershell
if ($lock -and $lock.Length -eq 0) {
    $ageMin = ((Get-Date) - $lock.LastWriteTime).TotalMinutes
    if ($ageMin -gt 5) {
        Write-Host "REMOVABLE: index.lock 0 bytes age=$([math]::Round($ageMin,1))min"
        # Confirm no active git: probe for git.exe with recent activity
        $activeGit = Get-Process -Name git -ErrorAction SilentlyContinue |
            Where-Object { ((Get-Date) - $_.StartTime).TotalMinutes -lt 1 }
        if (-not $activeGit) {
            Remove-Item $lock.FullName -Force
            Write-Host "REMOVED: index.lock"
        } else {
            Write-Host "DEFERRED: active git process detected; manual review"
        }
    } else {
        Write-Host "RECENT: index.lock age=$([math]::Round($ageMin,1))min; assume live commit; SKIP"
    }
}
```

### 2.3 Locked-worktree per-worktree triage (W156 F3 catch #5)
36 locked worktrees expected (4-day accumulation 2026-05-09 → 2026-05-12). Per W156 F3 SAVED-SHIP catch: **NO blanket force-removal**.

```powershell
$triageFile = "tmp/phase1-worktrees-triage-$ts.csv"
$rows = @()
Get-ChildItem 'Z:/claude-sota-installed/.git/worktrees' -Directory | ForEach-Object {
    $wt = $_
    $gitdir = $wt.FullName
    $lockfile = Join-Path $gitdir 'locked'
    $hasLock = Test-Path $lockfile
    $headfile = Join-Path $gitdir 'HEAD'
    $head = if (Test-Path $headfile) { (Get-Content $headfile -Raw).Trim() } else { '<missing>' }
    $lockReason = if ($hasLock) { (Get-Content $lockfile -Raw).Trim() } else { '' }
    $ageDays = [math]::Round(((Get-Date) - $wt.LastWriteTime).TotalDays, 1)
    $rows += [PSCustomObject]@{
        Name = $wt.Name
        Locked = $hasLock
        HEAD = $head
        LockReason = $lockReason
        AgeDays = $ageDays
        Disposition = '<pending operator review>'
    }
}
$rows | Export-Csv $triageFile -NoTypeInformation
```

**Triage decision matrix** (operator marks Disposition column):
- Locked + branch unmerged → KEEP
- Locked + branch merged + reason "in use" + live PID → INVESTIGATE
- Locked + branch merged + no live PID → REMOVABLE (operator confirms per-worktree)
- Unlocked + tree dirty → COMMIT or STASH first
- Unlocked + clean → SAFE TO REMOVE

Removal command (per worktree, after operator approval):
```powershell
& git -C 'Z:/claude-sota-installed' worktree remove '<worktree-path>'
# NOT --force unless explicit operator approval per W156 F3 catch
```

### 2.4 Tracked vs untracked `.claude/` inventory
Capture inventory of all `.claude/{rules,agents,skills,commands,hooks/scripts}/` files:

```powershell
$invFile = "tmp/phase1-dotclaude-inventory-$ts.csv"
$invRows = @()
foreach ($subdir in 'rules', 'agents', 'skills', 'commands', 'hooks/scripts') {
    $base = "Z:/claude-sota-installed/.claude/$subdir"
    if (-not (Test-Path $base)) { continue }
    Get-ChildItem $base -File -Recurse | ForEach-Object {
        $relpath = $_.FullName.Replace('Z:/claude-sota-installed/', '').Replace('\','/')
        & git -C 'Z:/claude-sota-installed' ls-files --error-unmatch $relpath 2>$null
        $tracked = ($LASTEXITCODE -eq 0)
        # Probe for Wave 62 fire 8 or Wave 15 PORT frontmatter
        $head100 = Get-Content $_.FullName -Head 30 -Raw
        $hasW62 = $head100 -match 'Wave 62 fire 8'
        $hasW15 = $head100 -match 'WAVE 15 PORT'
        $invRows += [PSCustomObject]@{
            Path = $relpath
            Tracked = $tracked
            Size = $_.Length
            LastWrite = $_.LastWriteTime
            W62_FrontMatter = $hasW62
            W15_PORT = $hasW15
        }
    }
}
$invRows | Export-Csv $invFile -NoTypeInformation
```

**Cleanup policy**:
- Tracked + obsolete cite-anchor → Phase 5 SHA refresh (do NOT delete)
- Untracked + Wave 62 / Wave 15 frontmatter → **legitimate cite-import-AMBER (KEEP)**
- Untracked + no provenance frontmatter → AUDIT (potential stale)
- Tracked + missing-on-disk → re-clone from upstream OR mark for removal

### 2.5 Phase 1 completion report
Append to `docs/install-provenance.md` (atomic narrow FM-02 (c) commit):
```powershell
$msgFile = "tmp/phase1-provenance-msg-$ts.txt"
@"
docs(provenance): Phase 1 cleanup report $ts

Wedged codex PIDs: $($wedgedCandidates.Count)
Stale index.lock: $(if ($lock) { 'recovered' } else { 'clean' })
Locked worktrees: $wtCount (triage CSV: tmp/phase1-worktrees-triage-$ts.csv)
.claude inventory: $($invRows.Count) files (CSV: tmp/phase1-dotclaude-inventory-$ts.csv)
"@ | Out-File -FilePath $msgFile -Encoding utf8 -NoNewline

& git -C 'Z:/claude-sota-installed' add -- 'docs/install-provenance.md'
& git -C 'Z:/claude-sota-installed' commit --only -F $msgFile -- 'docs/install-provenance.md'
```

---

## 3. Phase 2 — Audit current architecture

**Goal**: measure AUTHORITATIVE coverage % and SOTA-verified %. Per F-arc OCTODECIM end-state: ~18.1% (50/276 rows); re-measure live.

### 3.1 Section-by-section verdict probe
Read `docs/sota-installed-manifest.md` end-to-end. Per Section (0-17), classify each row:

```bash
# Total row count + INSTALLED count
total=$(grep -cE '^\| [A-Z0-9]' Z:/claude-sota-installed/docs/sota-installed-manifest.md)
installed=$(grep -cE '\| INSTALLED ' Z:/claude-sota-installed/docs/sota-installed-manifest.md)
amber=$(grep -cE '\| INSTALLED-AMBER ' Z:/claude-sota-installed/docs/sota-installed-manifest.md)
staged=$(grep -cE '\| STAGED ' Z:/claude-sota-installed/docs/sota-installed-manifest.md)
planned=$(grep -cE '\| PLANNED ' Z:/claude-sota-installed/docs/sota-installed-manifest.md)

echo "Total rows: $total"
echo "INSTALLED: $installed ($(echo "scale=1; $installed*100/$total" | bc)%)"
echo "INSTALLED-AMBER: $amber"
echo "STAGED: $staged"
echo "PLANNED: $planned"
```

### 3.2 Per-section verdict table
Output to `tmp/phase2-section-verdict-$ts.md` (template):

| Section | Rows | INSTALLED | AMBER | STAGED | PLANNED | NOT-IN-SCOPE | % AUTHORITATIVE |
|---|---|---|---|---|---|---|---|
| 0 — Bootstrap | TBD | TBD | TBD | TBD | TBD | TBD | TBD% |
| 1 — CC binary | TBD | ... | | | | | |
| 2 — codex T1-T7 hooks | TBD | ... | | | | | |
| 3 — Plugins (5 marketplaces) | TBD | ... | | | | | |
| 4 — Memory MCPs L1 | TBD | ... | | | | | |
| 4.5 — Memory MCPs L2/L3 | TBD | ... | | | | | |
| 5 — Code intel MCPs | TBD | ... | | | | | |
| 5.5 — Quality + commits | TBD | ... | | | | | |
| 7 — GitNexus | TBD | ... | | | | | |
| 8 — Research MCPs | TBD | ... | | | | | |
| 10 — CLI tools | TBD | ... | | | | | |
| 11 — Plugins (cont) | TBD | ... | | | | | |
| 11.5 — Rules | TBD | ... | | | | | |
| 13 — Hooks | TBD | ... | | | | | |
| 14 — Agents | TBD | ... | | | | | |
| 14.5 — Skills | TBD | ... | | | | | |
| 15 — Eval/observability | TBD | ... | | | | | |
| 16 — Official MCPs/SDKs | TBD | ... | | | | | |
| 17 — Long-running agents (cwc) | TBD | ... | | | | | |

### 3.3 Cite-anchor SHA freshness audit
Per cardinal-rule-6 + Marker Decay corollary:

```bash
declare -A pinned_shas
pinned_shas[everything-claude-code]="<from manifest header>"
pinned_shas[claude-code-best-practice-shan]="64fffd53"
pinned_shas[superpowers]="<from manifest>"
pinned_shas[andrej-karpathy-skills]="<from manifest>"
pinned_shas[mattpocock-skills]="<from manifest>"

for repo in "${!pinned_shas[@]}"; do
    pinned="${pinned_shas[$repo]}"
    if [ -d "Z:/repos/deps/$repo" ]; then
        cd "Z:/repos/deps/$repo"
        # Refresh first per CR-6
        git fetch origin 2>/dev/null
        live=$(git rev-parse origin/main 2>/dev/null || git rev-parse origin/master 2>/dev/null)
        if [ "$pinned" = "$live" ]; then
            echo "$repo: FRESH ($pinned)"
        else
            echo "$repo: STALE (pinned=$pinned live=$live)"
        fi
    else
        echo "$repo: MISSING in Z:/repos/deps/"
    fi
done
```

**Output**: `tmp/phase2-cite-anchor-freshness-$ts.md` with per-repo FRESH/STALE/MISSING.

### 3.4 F-arc OCTODECIM closure verification
Per session-summary: F47-F63 OCTODECIM 18-fire arc COMPLETE. Verify via manifest blockquote inventory:

```bash
grep -cE '> \*\*W155 F[0-9]+ ' Z:/claude-sota-installed/docs/sota-installed-manifest.md
# Expected: 17 forward-correction blockquotes (F47-F63 OCTODECIM)
```

### 3.5 Phase 2 completion report
Write `tmp/phase2-audit-$ts.md` aggregating:
- Total rows + INSTALLED% (AUTHORITATIVE coverage)
- Per-section verdict table
- Cite-anchor SHA freshness delta
- F-arc OCTODECIM closure status
- Recommendation: next-section to focus Phase 3 audit on

---

## 4. Phase 3 — Compare vs SOTA repos line-by-line

**Goal**: ECC + CCBP + 12+ awesome lists deep-dive line-by-line per cardinal-rule-1.

### 4.1 ECC (everything-claude-code) refresh + compare

```bash
# CR-6 pull from newest
cd Z:/repos/deps/everything-claude-code
old_head=$(git rev-parse HEAD)
git fetch origin
new_head=$(git rev-parse origin/main)
if [ "$old_head" != "$new_head" ]; then
    git pull origin main
    echo "ECC HEAD bumped: $old_head → $new_head"
else
    echo "ECC HEAD unchanged: $new_head"
fi

# Inventory ECC primitives
ls -la skills/ agents/ commands/ rules/ hooks/scripts/ 2>/dev/null | \
    tee "tmp/phase3-ecc-inventory-$ts.txt"

# Per skill, check existence in claude-sota-installed
for skill in $(ls skills/ 2>/dev/null); do
    if [ -d "Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/*/skills/$skill" ]; then
        echo "INSTALLED: ECC/$skill"
    elif [ -d "Z:/claude-sota-installed/.claude/skills/$skill" ]; then
        echo "VENDORED: $skill (in .claude/skills/)"
    else
        echo "MISSING: ECC/$skill"
    fi
done > "tmp/phase3-ecc-skill-delta-$ts.txt"
```

### 4.2 CCBP (claude-code-best-practice-shan) refresh + cite-anchor delta

```bash
cd Z:/repos/deps/claude-code-best-practice-shan
old_head=$(git rev-parse HEAD)
git fetch origin
new_head=$(git rev-parse origin/main)
if [ "$old_head" != "$new_head" ]; then
    git pull origin main
    echo "CCBP HEAD bumped: $old_head → $new_head"
fi

# Per cited file, compare blob SHA between pinned cite and live HEAD
declare -A cited_files
cited_files["best-practice/claude-memory.md"]="34-40"
cited_files["best-practice/claude-settings.md"]="251"
cited_files["best-practice/claude-skills.md"]="48"
cited_files["best-practice/claude-subagents.md"]="32-34"
cited_files["development-workflows/cross-model-workflow/cross-model-workflow.md"]="1-48"
cited_files["development-workflows/rpi/rpi-workflow.md"]="1-5"
cited_files["tips/claude-boris-6-tips-16-apr-26.md"]="93-109"

for f in "${!cited_files[@]}"; do
    lines="${cited_files[$f]}"
    pinned_blob=$(git show 64fffd53:$f 2>/dev/null | sed -n "${lines}p" | sha256sum | head -c 16)
    live_blob=$(git show HEAD:$f 2>/dev/null | sed -n "${lines}p" | sha256sum | head -c 16)
    if [ "$pinned_blob" = "$live_blob" ]; then
        echo "$f:$lines: STABLE"
    else
        echo "$f:$lines: DRIFT pinned=$pinned_blob live=$live_blob"
    fi
done > "tmp/phase3-ccbp-cite-anchor-delta-$ts.txt"
```

### 4.3 12+ awesome lists comparison
Per repo in user's directive, fire a sota-researcher subagent (if available) OR direct Probe DAG dispatch:

```
Repo list (cardinal-rule-1 cite anchors at file:line + HEAD SHA expected per audit):
- https://github.com/affaan-m/everything-claude-code (ECC — already covered in 4.1)
- https://github.com/shanraisshan/claude-code-best-practice (CCBP — already covered in 4.2)
- https://github.com/AsyncFuncAI/deepwiki-open
- https://github.com/nibzard/awesome-agentic-patterns
- https://github.com/vinta/awesome-python
- https://github.com/wshobson/agents
- https://github.com/abhigyanpatwari/GitNexus
- https://github.com/quemsah/awesome-claude-plugins
- https://github.com/Shubhamsaboo/awesome-llm-apps
- https://github.com/forrestchang/andrej-karpathy-skills
- https://github.com/mattpocock/skills
- https://github.com/hesreallyhim/awesome-claude-code
- https://github.com/alirezarezvani/claude-skills
- https://github.com/gsd-build/get-shit-done
- https://github.com/vercel-labs/agent-skills
```

Per repo:

```bash
repo_url="$1"
repo_name=$(basename "$repo_url")
dest="Z:/repos/deps/$repo_name"

# CR-6 fresh clone OR fetch
if [ -d "$dest" ]; then
    cd "$dest"
    git fetch origin && git reset --hard origin/main 2>/dev/null || git reset --hard origin/master
else
    git clone --depth 1 "$repo_url.git" "$dest"
fi

# Probe DAG (per Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md)
# P1 LICENSE
license=$(head -5 "$dest/LICENSE" 2>/dev/null | head -1)
echo "P1 LICENSE: $license"

# P2 registry-existence (npm/PyPI/cargo per package type)
# (manual per repo — check package.json/pyproject.toml/Cargo.toml)

# P3 plugin-namespace check (claude-sota local plugin namespace)
grep -r "$repo_name" Z:/claude-sota-installed/.claude/plugins/marketplaces/*.json 2>/dev/null | head

# P4 GraphQL stars + bands (via gh CLI)
stars=$(gh api "repos/$(basename $(dirname $repo_url))/$repo_name" --jq '.stargazers_count')
echo "P4 stars: $stars"

# P5 README frontmatter scan
head -50 "$dest/README.md" 2>/dev/null

# P6 deep audit (per repo's main primitive)
# (manual per repo)
```

**Per-repo verdict**: ADOPT / STUDY-PILOT / STUDY-PILOT-PATTERN-EXTRACT / REJECT-FOR-FIT / CITE-PATTERN-ONLY / HONEST-NON-FINDING

**Output**: `tmp/phase3-sota-<repo>-$ts.md` per repo.

### 4.4 Sister claude-sota delta probe
```bash
cd Z:/claude-sota
git log --since '2026-05-07' --oneline -- .claude/rules/ .claude/agents/ .claude/skills/ .claude/commands/ .claude/hooks/
```
Identify sibling additions since last Wave 62 fire 8 cite-import (2026-05-07). Flag candidates for new cite-import-AMBER per Section 14.5 (**HONEST-NON-FINDING gated** per CR-12 TERTIARY).

### 4.5 Phase 3 completion report
Write `tmp/phase3-sota-comparison-$ts.md` aggregating:
- ECC inventory + skill delta
- CCBP cite-anchor SHA delta
- Per-repo Probe DAG verdict (15 repos)
- Sister claude-sota since-2026-05-07 delta
- Recommended new cite-imports for Phase 4 (HONEST-NON-FINDING evidence + per-file path-rewrite plan)

---

## 5. Phase 4 — Install SOTA via official channels

**Goal**: install missing SOTA primitives identified in Phase 3 via cardinal-rule-6 official-native-channel.

### 5.1 Pre-cite-import REVERT check (CR-9 mandatory)
Per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9:

```bash
# Per sibling-cite-import candidate, probe sibling history
for path in <candidate-paths>; do
    echo "=== $path ==="
    git -C Z:/claude-sota log --all --oneline -- "$path" | head -20
done

# 3 known REVERT-AND-REMOVE precedents — do NOT re-install:
# - bash_command_allowlist.py
# - fleet_health_start.py
# - permission_request_auto_approve.py
```

### 5.2 Sibling-bleed defense (CR-9)
For any install-class cite-import containing `Z:/claude-sota/` paths or sibling env values:
- Path-rewrite to `Z:/claude-sota-installed/` BEFORE install (search-and-replace)
- Validate `additionalDirectory` entries point to correct workspace
- Verify `CLAUDE_CODE_PROJECT_DIR` references this runtime, not sibling

```powershell
# Pre-install path-rewrite probe
$candidate = '<source-path>'
$content = Get-Content $candidate -Raw
$siblingRefs = ($content | Select-String -Pattern 'Z:/claude-sota/' -AllMatches).Matches.Count
if ($siblingRefs -gt 0) {
    Write-Host "REWRITE-NEEDED: $candidate has $siblingRefs sibling refs"
    # Per CR-9: classify each occurrence (cite-anchor vs runtime-dependency vs read-only-research)
    # Manual review required before path-rewrite
}
```

### 5.3 Install order (Tier 0 → Tier 5 per CR-7 graduated unleash)

**Tier 0 (CLI tools — Section 10)**:
```powershell
# CR-6 pull from newest
npm install -g @anthropic-ai/claude-code@latest
$ccVersion = & claude --version
Write-Host "CC binary: $ccVersion"

# CR-9 version-pin discipline: capture installed version for D6 protection
@"
{"claude-code": "$ccVersion", "installed_at": "$ts"}
"@ | Out-File "tmp/phase4-version-pins-$ts.json"
```

**Tier 1a (codex CLI + T1-T7 hooks — Section 2)**:
```bash
# Plugin install via Anthropic-native /plugin command
# Run inside CC session:
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex

# Smoke probe per Section 2 row's expected outcome
codex --version
codex exec --skip-git-repo-check --color never < /dev/null  # baseline ping
```

**Tier 1b (sota-researcher agent — Section 14)**:
```bash
# Check upstream parity FIRST (CR-12 PRIMARY → SECONDARY → TERTIARY path)
# If upstream has equivalent: install via upstream
# Else if read-only cite-anchor at file:line: cite per CR-12 SECONDARY
# Else if no upstream parity: cite-import per CR-12 TERTIARY + HONEST-NON-FINDING gate

# For sota-researcher: cite-import per Wave 15 PORT convention
# Source: Z:/claude-sota/.claude/agents/sota-researcher.md
src='Z:/claude-sota/.claude/agents/sota-researcher.md'
dst='Z:/claude-sota-installed/.claude/agents/sota-researcher.md'

# Pre-cite-import REVERT check (CR-9)
git -C Z:/claude-sota log --all --oneline -- .claude/agents/sota-researcher.md

# Path-rewrite + add Wave 15 PORT frontmatter
# (manual — preserve content, only rewrite paths + add provenance)
```

**Tier 1c (safety_guard.py hook — Section 13)**:
```bash
# Hook install via ECC plugin (preferred — CR-12 PRIMARY)
/plugin install everything-claude-code

# Smoke probe: hook fires on known catastrophic pattern
# (deliberately trigger a deny case via test command — operator-confirmed)
```

**Tier 2 (Memory MCPs L1/L2/L3 + Research MCPs + Code intel)**:
```bash
# L1 capture (mcp-memory-service)
pip install --upgrade git+https://github.com/doobidoo/mcp-memory-service.git

# L3 temporal-KG (graphiti)
pip install --upgrade graphiti-core[falkordb]

# Docker dependencies
docker pull qdrant/qdrant:latest
docker pull falkordb/falkordb:latest

# Update .mcp.json with version pins (CR-9 D6 protection)
# Smoke probe per MCP: see Section 4/4.5/8 expected outcomes
```

**Tier 3-5 (Section 5 + 5.5 + 11 + 15 + 16 + remaining)**:
DEFER until Tier 0-2 INSTALLED + smoke-probe PASS per CR-7 Phase 2 trigger predicates.

### 5.4 D6 today-release-auto-upgrade discipline
Per `Z:/claude-sota/.claude/rules/mcp-disconnect-recovery.md` FM-03 D6:
- Each `@latest` install → version-pin in `.mcp.json` after success
- If breaking change observed within 24h → pin to last-known-good
- File upstream issue for the breaking change
- Mark INSTALLED-AMBER in manifest with version + date

### 5.5 Phase 4 completion report
Append to `docs/install-provenance.md` under `### Phase 4 SOTA Install — $ts` with per-row:
- Install command + version installed
- Smoke-probe outcome
- Pre-cite-import REVERT check status
- Sibling-bleed rewrite status
- CR-9 version-pin entry

Atomic narrow FM-02 (c) commit:
```powershell
& git -C 'Z:/claude-sota-installed' add -- '.mcp.json' 'docs/install-provenance.md' 'docs/sota-installed-manifest.md'
& git -C 'Z:/claude-sota-installed' commit --only -F "tmp/phase4-msg-$ts.txt" -- '.mcp.json' 'docs/install-provenance.md' 'docs/sota-installed-manifest.md'
```

---

## 6. Phase 5 — GPT-5.5 convergence audit

**Goal**: fire codex T1 deep-review-exec on each architectural dimension per CR-3.

### 6.1 Path P recipe (per cross-model-consensus.md §"Profile selection rule")

```powershell
# Per dimension, dispatch codex T1
$dim = 'N'
$dimName = '<dimension-name>'

# Build consult prompt
@"
CLAIM: <dimension-$dim audit claim>
CONTEXT:
  - Phase 0 baseline: tmp/phase0-baseline-$ts.md
  - Phase 2 audit: tmp/phase2-audit-$ts.md
  - Phase 3 SOTA comparison: tmp/phase3-sota-comparison-$ts.md
  - Phase 4 install report: docs/install-provenance.md last entry

AXES TO AUDIT:
  - Axis 1: SOTA-status (T1 sources from ≥3 distinct orgs per convergence-gate)
  - Axis 2: T2 practitioners (named with dated artifact)
  - Axis 3: Stability (age + cpd × 5-band per convergence-gate Axis-3)

PROPOSED EDIT (if applicable):
<edit spec or 'NONE — verdict-only audit'>

OUTPUT SCHEMA:
  JSON-strict at EOF with: {
    "verdict": "APPROVE" | "NEEDS-REVISION" | "REJECT",
    "confidence": 0.00-1.00,
    "axis1_probe_state": "PASS" | "PARTIAL" | "FAIL",
    "axis2_cite_class": "PASS" | "PARTIAL" | "FAIL",
    "axis3_scope_discipline": "PASS" | "PARTIAL" | "FAIL",
    "prescribed_edits": [...],
    "fm09_recursive_catch_triggered": "YES" | "NO",
    "ship_readiness": "READY-AS-PROPOSED" | "READY-WITH-EDITS" | "BLOCKED"
  }

DISCIPLINE:
  - Verify file:line cite anchors against actual file content (cite-class verbatim verify)
  - Mia pre-apply on each prescription (probe each sub-claim independently)
  - HONEST-NON-FINDING is valid output (per synthesis-layer-verify.md)
"@ | Out-File -FilePath "Z:/claude-sota-installed/.claude/state/codex_consult_arch_audit_dim$dim.txt" -Encoding utf8 -NoNewline

# Foreground+tee per Wave 51+ Path P (REAL GPT-5.5 v0.130.0)
& codex exec --skip-git-repo-check --color never -p deep-review-exec `
    < "Z:/claude-sota-installed/.claude/state/codex_consult_arch_audit_dim$dim.txt" `
    2>&1 | Tee-Object -FilePath "Z:/claude-sota-installed/.claude/state/codex_consult_arch_audit_dim${dim}_OUT.txt"
```

### 6.2 Per-dimension audit dimensions (SRA D1-D10)
Per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md`:

| Dim | Axis | Probe shape |
|---|---|---|
| D1 | SOTA-status | T1 sources from ≥3 distinct orgs (Anthropic + shanraisshan + OpenAI = current 3-org base) |
| D2 | T2 practitioners | ≥2 named-author dated artifact (Karpathy + Boris Cherny + Addy Osmani + Hunt+Thomas as 4th-org named-T2) |
| D3 | Stability | Age + cpd × 5-band (STRONG-PROVENANCE-EXPRESS predicate if applicable) |
| D4 | Convergence | 3-axis PASS for all installed primitives |
| D5 | Mode-harness-shape | Probe 5 — autonomous /loop compatibility |
| D6 | License + provenance | Probe 6 — permissive license whitelist (MIT/Apache-2.0/BSD) |
| D7 | Demand-gate | Probe 7.a/.b — operator workflow consumer named |
| D8 | Plugin-namespace | Probe 4 — no duplicate-functionality per kiss-dry-yagni |
| D9 | Architectural-API | Probe 3 — API ecosystem match (Anthropic vs OpenAI vs vendor-neutral) |
| D10 | SDK-vs-CLI | Probe 2 — invocation surface matches harness mode |

Fire D1 through D10 in sequence (NOT parallel — codex pool capacity per `parallel-agent-wave.md §CADP rule 5`).

### 6.3 Verdict integration per Pattern A or Pattern B
Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md`:

```bash
# Read verdict — EOF FIRST per feedback_codex_t1_verdict_reading_discipline.md
out_file="Z:/claude-sota-installed/.claude/state/codex_consult_arch_audit_dim${dim}_OUT.txt"
wc -l "$out_file"
grep -nE 'VERDICT:|^F-[0-9]|conf=|confidence|APPROVE|NEEDS-REVISION|REJECT|severity' "$out_file" | tail -20
tail -200 "$out_file"
```

- **APPROVE conf ≥0.90** → ship as-proposed
- **NEEDS-REVISION conf 0.88-0.93** → Pattern A apply ALL prescribed_edits in SINGLE atomic commit
- **REJECT or conf <0.85** → STOP, escalate to operator
- **Timeout (no terminal JSON)** → Pattern B HONEST-NON-FINDING, ship-as-designed per prior research; T2/T3 closes gap at commit-time

### 6.4 Mia pre-apply on each prescription (mandatory)
Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`:

```bash
# For each prescription in NEEDS-REVISION:
# 1. Decompose into sub-claims (UPSTREAM-CLAIM / OPERATIONAL-CLAIM / CATEGORY-CLAIM)
# 2. Probe each sub-claim INDEPENDENTLY:
#    - File-existence: Glob or ls
#    - Line-content: Read <path>:<lines> or Grep
#    - Wire-status: Grep <hook> .claude/settings.json
#    - SHAPE-CLAIM: schema validate
# 3. Drop sub-claims that fail verification (classify as OVER per synthesis-layer-verify §Reporting categories)
# 4. Apply only surviving sub-claims in atomic commit
```

### 6.5 Phase 5 completion report
Write `tmp/phase5-codex-audit-$ts.md` per dimension:
- Verdict + confidence
- Axis 1/2/3 probe state
- prescribed_edits applied / dropped (Mia OVER classification)
- ship_readiness
- ladder advances (Mia n=X → n=Y; FM-09 cross-arc; Path P)

---

## 7. Phase 6 — Ship with consensus

**Goal**: atomic commits per FM-02 (b)+(c) defense + manifest updates + provenance log.

### 7.1 Per-commit discipline (FM-02 + FM-15 + cardinal-rule-7)
For each ship:

```powershell
# 1. Write commit message to tmp/ (atomic; FM-02 (c) defense via narrow scope)
$msgFile = "tmp/ship-msg-$shipN-$ts.txt"
@"
<prefix>(<scope>): <subject>

<body with verdict-on-file cite + cardinal-rule conformance + ladder advance>
"@ | Out-File -FilePath $msgFile -Encoding utf8 -NoNewline

# 2. Atomic narrow commit (FM-02 (c) + FM-15 grammar)
& git -C 'Z:/claude-sota-installed' add -- '<file1>' '<file2>'
& git -C 'Z:/claude-sota-installed' commit --only -F $msgFile -- '<file1>' '<file2>'

# 3. Verify ship landed (Iron Law)
$head = & git -C 'Z:/claude-sota-installed' log -1 --oneline
Write-Host "SHIPPED: $head"
```

### 7.2 W156 F3 pre-flight constraints (mandatory)
Before each ship:
- [ ] `git status --short` → empty OR pathspec-limited (FM-02 (b))
- [ ] No active codex worker on conflicting file
- [ ] No stale `index.lock` (unless this commit creates it)
- [ ] Iron Law fresh probe for each cite-anchor
- [ ] FM-02 (c) atomic narrow `--only -F msg.txt -- <paths>` form
- [ ] FM-15 grammar: option `-F` BEFORE `--`
- [ ] Cardinal-rule-7 REPORT inline disclosed (in commit body)

### 7.3 Manifest row updates
For each row that flipped state (PLANNED → INSTALLED, etc.):

```markdown
# Edit docs/sota-installed-manifest.md
# - Update status column (PLANNED → INSTALLED)
# - Cite verdict-on-file path in Smoke Probe column
# - Add cite-anchor SHA refresh if applicable
# - Append F-correction blockquote if status flipped post-prior-claim
```

### 7.4 Provenance log appends
For each ship, append to `docs/install-provenance.md`:

```markdown
### Phase <N> — <ship-name> — <timestamp>
- **Commit**: <SHA>
- **Files**: <list>
- **Verdict-on-file**: `.claude/state/codex_consult_<topic>_OUT.txt`
- **Cardinal-rule conformance**: CR-1 + CR-3 + CR-7 + CR-8 + CR-11
- **Ladder advance**:
  - Mia: n=X → n=Y
  - FM-09 cross-arc: n=A → n=B (if applicable)
  - Path P: n=P → n=Q
- **Iron Law verification**: <probe-trail>
```

---

## 8. Phase 7 — Progress tracking + cron continuation

**Goal**: measure progress, codify META-disciplines, plan next cron arc.

### 8.1 Audit-coverage % advance
Compare Phase 2 baseline vs Phase 6 post-ship:

```bash
# Recompute AUTHORITATIVE %
total=$(grep -cE '^\| [A-Z0-9]' Z:/claude-sota-installed/docs/sota-installed-manifest.md)
installed=$(grep -cE '\| INSTALLED ' Z:/claude-sota-installed/docs/sota-installed-manifest.md)
new_pct=$(echo "scale=2; $installed*100/$total" | bc)

old_pct=18.1  # Per session-summary baseline
delta=$(echo "scale=2; $new_pct - $old_pct" | bc)

echo "AUTHORITATIVE %: $old_pct → $new_pct (Δ +$delta)"
echo "Target: +5-10% per arc"
```

### 8.2 META-discipline codification (HIGHLY URGENT)
Per F-arc end-state: ~177 META-disciplines tracked (21 SAT + 156 candidates).
Per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322:

```bash
# Promote candidates at n=3+ self-observed → formal rule files
# Target: reduce candidate-stack from 156 → <120 in next 3 arcs

# Per candidate at n≥3, write formal rule file under .claude/rules/
# (cite-import-AMBER if from sibling; native if new)
```

### 8.3 cron arc continuation
- Update `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` with this fire's findings
- Schedule next /loop tick continuation
- If F-arc identified, propagate to F64+ tracker
- W156 cross-session synchronization (read W156 F3+ verdicts from parallel session)

### 8.4 Operator-facing summary
Write `tmp/cli-execution-summary-$ts.md` with:
- Phase 0-7 completion status (✅ / ⚠️ / ❌)
- AUTHORITATIVE % delta + per-section gains
- New cite-imports added (with HONEST-NON-FINDING evidence trail)
- Ships landed (commit SHAs + files + ladder advances)
- Outstanding F-future candidates (queued for next arc)
- Recommended operator-decision:
  - Docker start? (resolves CR-7 Phase 2 predicate (f))
  - Next cron arc continue?
  - META-discipline formal codification batch?
  - CITE-ANCHOR SHA refresh for cited deps?

---

## 9. Cite trail (TIER-1-DIRECT anchors)

All cited rules are TIER-1-DIRECT to Anthropic CC docs OR sibling cite-import-AMBER per CR-12 TERTIARY. Per cardinal-rule-1:

**Anthropic CC official docs**:
- `https://code.claude.com/docs/en/sub-agents` (subagent model precedence + permission modes)
- `https://code.claude.com/docs/en/hooks` (PreToolUse / PostToolUse / Stop hook contract)
- `https://code.claude.com/docs/en/settings` (permission-mode enum)
- `https://code.claude.com/docs/en/env-vars` (env-var enumeration)
- `https://code.claude.com/docs/en/model-config` (extended context)
- `https://code.claude.com/docs/en/scheduled-tasks` (CronCreate / ScheduleWakeup)

**CCBP (org #2 of convergence-gate Axis-1 triple)**:
- `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 64fffd53`
- `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ HEAD 64fffd53`
- `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/rpi/rpi-workflow.md:1-5 @ HEAD 64fffd53`

**OpenAI codex (org #3 of convergence-gate Axis-1 triple)**:
- `Z:/repos/deps/codex/codex-rs/git-utils/src/info.rs:618-654 @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a`

**Addy Osmani (org #4 named-author convergence-gate Axis-1)**:
- `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/skills/source-driven-development/SKILL.md @ 742dca5`

**Anthropic cwc-long-running-agents (Anthropic Wave 6)**:
- `Z:/claude-sota-installed/.local/cwc/track-read.sh` + `verify-gate.sh` + `kill-switch.sh` + `steer.sh` + `commit-on-stop.sh` (5 install-class primitives)

**Sibling claude-sota cite-import-AMBER per Section 14.5** (TIER-3-LOCAL-COMPOSITION):
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md`
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` (Pattern A + B + C + D)
- `Z:/claude-sota/.claude/rules/mia-pre-apply.md`
- `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md`
- `Z:/claude-sota/.claude/rules/git-cli-grammar-discipline.md`
- `Z:/claude-sota/.claude/rules/mcp-disconnect-recovery.md`
- `Z:/claude-sota/.claude/rules/convergence-gate.md`
- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`
- `Z:/claude-sota/.claude/rules/codification-threshold.md`
- `Z:/claude-sota/.claude/rules/named-failure-modes.md` (FM-01 through FM-21)
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` (FM-17.a-f sub-classes)
- `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md`
- `Z:/claude-sota/.claude/rules/audit-action-loop.md`
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md`
- `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md`
- `Z:/claude-sota/.claude/rules/citation-discipline.md` (rule #8 source-class reduction lattice)
- `Z:/claude-sota/.claude/rules/port-note-discipline.md` (§6 forward-only mandate)
- `Z:/claude-sota/.claude/rules/research-protocol.md` (RECALL → INVESTIGATE → VERIFY)
- `Z:/claude-sota/.claude/rules/canonical.md` (Must-Always / Must-Never)
- `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` (Must-Never #4)
- `Z:/claude-sota/.claude/rules/karpathy-adapted.md` (P1-P5)
- `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md`
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md` (§CADP rule 5)
- `Z:/claude-sota/.claude/rules/team-orchestration.md`
- `Z:/claude-sota/.claude/rules/sota-pin-discipline.md`
- `Z:/claude-sota/.claude/rules/evidence-policy.md` (Marker Decay corollary)

---

## 10. Appendix A — Failure mode (FM-N) defense quick reference

| FM | Defense | Trigger |
|---|---|---|
| FM-01 | T2 EARLY-HANG → trace-mine + Pattern B HNF | codex T2 hangs at gitnexus/detect_changes |
| FM-02 (b) | Atomic narrow add+commit | parallel session staging-index race |
| FM-02 (c) | `git commit --only -F msg -- <path>` | parallel session commit-layer absorption |
| FM-03 | Classify D1-D6 + per-domain recovery | MCP server mid-session disconnect |
| FM-04 | HONEST-NON-FINDING + ship-target audit | Stale auto-recall sentinel |
| FM-05 | Retroactive T1 + integrate before commit | CATEGORY-CLAIM drift |
| FM-09 | 2-stage harness-fit verifier | Codex-rescue ADOPT-NOW without Probe 4-7 |
| FM-14 | tmp/+mv-T bypass | AUTO-T1 wedge on design-surface |
| FM-15 | Option-before-`--` separator | Git CLI grammar option-after-`--` |
| FM-17.a-f | Pre-fleet-probe + STAND-IN-NOTICE + Path P fallback | Subagent fleet-depletion |
| FM-19 | ARTIFACT-INLINE mandate in brief | Readonly-guard sidestep |
| FM-20 | Mia-probe per sub-claim at synthesis-vs-brief | Path-drift cascade |
| FM-21 | STATE PROBE before stale-wakeup execution | Queue-time-prompt-freeze |

---

## 11. Appendix B — Iron Law verification gates

At every phase transition, verify with FRESH probe:
1. HEAD probe (`git rev-parse HEAD`)
2. Working tree status (`git status --short | Measure-Object -Line`)
3. Codex PID inventory (`Get-Process -Name codex`)
4. Locked-worktree count
5. Manifest stat (Length + LastWriteTime)
6. Active codex consult OUT files (modification timestamp + size)

If any probe contradicts expected state → **STOP, REPORT, REASSESS**. Per cardinal-rule-7 + Iron Law: silence is not success.

---

## 12. Appendix C — Cardinal-rule conformance hooks

Per ship, the commit body must demonstrate conformance to applicable cardinal rules:

- **CR-1**: TIER-1-DIRECT cite anchor (`file:line @ HEAD <SHA>`) for every design claim
- **CR-2**: Karpathy 4 principles (uncertainty + minimum code + surgical + success criteria)
- **CR-3**: T1 codex consult BEFORE design-surface edit; T2 BEFORE commit (Phase 1 bootstrap exception: orchestrator-direct `codex exec` foreground+tee satisfies if Tier 1a NOT-yet-INSTALLED)
- **CR-5**: Install-priority over hand-coding (no novel content of any class)
- **CR-6**: Pull from newest @ install time (NOT from `Z:/repos/deps/` per Marker Decay)
- **CR-7**: Graduated unleash gate predicates testable (Phase 1 → 2 → 3 transitions)
- **CR-8**: Full-SOTA-content invariant (every code-or-reference adapts SOTA at file:line + HEAD SHA)
- **CR-9**: Install-risk discipline (version-pin + 2-round fix-forward + pre-cite-import REVERT + sibling-bleed defense)
- **CR-10**: Research-first-then-install (build/error/unknown → sota-researcher BEFORE remediation)
- **CR-11**: META-process SOTA discipline (build-process itself is SOTA-cited)
- **CR-12**: Upstream-install-priority over sibling-cite-import (HONEST-NON-FINDING gated; 6-class lattice: GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL)

---

## 13. Appendix D — 4-skill stack invocation

The CLI runner MUST honor the 4-skill stack throughout execution:

| # | Skill | Auto-fires | Role |
|---|---|---|---|
| 1 | `using-superpowers` | YES | 1% rule + Skill Priority + Red Flags table |
| 2 | `using-agent-skills` | YES | Surfaces 21 addy phase skills via description-matching |
| 3 | `skill-comply` | NO (post-invocation) | Verifies skill use was correct + complete |
| 4 | `skill-creator` | NO (on demand) | Authoring new skills (draft → eval → benchmark → optimize description) |

For each phase, invoke relevant domain skill BEFORE action:

| Phase | Recommended skill |
|---|---|
| Phase 0 (probe) | `superpowers:verification-before-completion` (Iron Law gate) |
| Phase 1 (cleanup) | `addy-agent-skills:debugging-and-error-recovery` |
| Phase 2 (audit) | `addy-agent-skills:code-review-and-quality` + `everything-claude-code:silent-failure-hunter` |
| Phase 3 (compare) | `everything-claude-code:deep-research` + `addy-agent-skills:context-engineering` |
| Phase 4 (install) | `addy-agent-skills:ci-cd-and-automation` + `addy-agent-skills:deprecation-and-migration` |
| Phase 5 (codex audit) | `superpowers:requesting-code-review` (adversarial) |
| Phase 6 (ship) | `addy-agent-skills:git-workflow-and-versioning` + `addy-agent-skills:incremental-implementation` |
| Phase 7 (tracking) | `addy-agent-skills:documentation-and-adrs` |

---

## 14. Appendix E — Standing directive integration

Per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (Wave 24-D OWNED at n=3 user-trigger): every non-trivial fire in this plan SHOULD spawn a 3-5 agent team via GPT-5.5 BRIDGE-MODE.

**Phase-by-phase team spawn guidance** (when CR-9 + parallel-agent-wave §CADP rule 5 cleared):

| Phase | Team composition | OUTPUT_BUDGET |
|---|---|---|
| Phase 2 (audit) | sota-researcher (probe DAG) + architect (gap design) + gpt5-archaeologist (legacy decisions) | 600 LOC each |
| Phase 3 (compare) | 3× sota-researcher (parallel: ECC / CCBP / 12-awesome-lists) + 1× architect (synthesis) | 800 LOC each |
| Phase 4 (install) | architect (install design) + gpt5-reviewer (adversarial review) + codex-rescue (long-running install BRIDGE) | 500 LOC each |
| Phase 5 (codex audit) | NA — orchestrator-direct codex exec foreground+tee per CR-3 Phase 1 exception |
| Phase 6 (ship) | code-reviewer (pre-commit) + verifier (post-commit smoke) | 300 LOC each |

**CADP pre-dispatch probe** (mandatory before any 3+ agent fan-out):
```powershell
# Per parallel-agent-wave.md §CADP rule 5
python Z:/claude/ccc/tools/status.py | Select-String 'Session' | Select-Object -First 10
# Require ≥3 accounts showing "Session 🟢 <50%" before dispatch
```

---

## 15. Appendix F — Brief template for spawned agents

Per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md`:

```
Agent <X> — <subagent-type>
  task: <specific task per phase>
  brief cites:
    - Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>
    - code.claude.com/docs/en/<topic>
    - Z:/claude-sota-installed/CLAUDE.md cardinal-rule-<N>
  output: tmp/phase<N>-agent<X>-<topic>-<date>.md (ARTIFACT-INLINE if read-only)
  OUTPUT_BUDGET: <N> LOC (per phase table above)
  TERMINATION:
    on_handoff_to: orchestrator
    max_turns: 20
    terminationCondition: on_token_budget_exceeded:200000

  Per-call codex time-budget mandate (FM-17.d defense):
    - Default: 90s
    - Normal cap: 120s
    - 180s only with explicit reason

  Mandatory inputs to consume:
    - Phase 0 baseline
    - Prior phase reports (tmp/phase<N-1>-*.md)
    - Relevant SOTA repo at file:line + HEAD SHA

  Mandatory output structure:
    1. EXECUTIVE SUMMARY (≤200 words)
    2. FINDINGS (per axis / per probe)
    3. CITE-TRAIL (TIER-1-DIRECT anchors)
    4. RECOMMENDED PATTERN A / PATTERN B / HONEST-NON-FINDING
    5. ARTIFACT-INLINE (full report body)
```

---

## END OF PLAN

**Estimated execution time**: 8-16 hours of CC CLI session time across multiple cron arcs.

**Recommended operator dispatch sequence**:
1. Hand this plan to fresh `eee` session
2. Runner reads sections 0 + 9 + 10-15 FIRST
3. Runner executes Phase 0 (baseline) + reports via `tmp/phase0-baseline-<ts>.md`
4. Operator reviews baseline, approves Phase 1
5. Each subsequent phase requires operator approval after previous phase report
6. Final summary in `tmp/cli-execution-summary-<ts>.md` drives next-arc planning

**Convergence-consensus ship discipline**: every architectural ship (Phase 4 + 6) requires codex T1 NEEDS-REVISION conf 0.88-0.93 + Pattern A apply OR APPROVE conf ≥0.90, with Mia pre-apply per `mia-pre-apply.md` on every prescription.

**Progress tracking targets** (per arc):
- AUTHORITATIVE coverage: +5-10%
- META-disciplines codified: 5-10 candidates → formal rules
- Cite-anchor SHAs refreshed: per repo bumped HEAD
- New cite-imports: per Section 14.5 HONEST-NON-FINDING evidence

**Cardinal-rule conformance verified**: CR-1 (TIER-1-DIRECT cite trail), CR-3 (codex T1+T2 per ship), CR-7 (graduated unleash testable predicates), CR-8 (full-SOTA-content), CR-9 (install-risk discipline), CR-10 (research-first), CR-11 (META-process SOTA), CR-12 (upstream-priority + 6-class lattice).
