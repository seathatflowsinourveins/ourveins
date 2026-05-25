# W433-REF-E — CCBP SHA cite-refresh delta report

> **Wave**: W433-REF-E  
> **Date**: 2026-05-24  
> **Agent**: W433-REF-E (CLAUDE_SESSION_ID 0ba1d763-9909-4ba1-951d-63d550b8603e)  
> **Scope**: cite-refresh probe of `shanraisshan/claude-code-best-practice` (CCBP) HEAD anchored in CLAUDE.md L4  
> **Modifies files**: NONE outside this report (pure-additive, CLAUDE.md fix deferred to W432-DOC-DRIFT-2)

---

## 1. Summary

| Field | Value |
|---|---|
| Repo | `shanraisshan/claude-code-best-practice` |
| Old cite (CLAUDE.md L4) | `HEAD a28cd96b` |
| New live HEAD | `d30fb7ed0d2d77ecbf269cefdd58831f6f0a374f` (`d30fb7ed`) |
| Commit delta | **8 commits ahead, 0 behind** (status=ahead) |
| File path | `best-practice/claude-memory.md` |
| File still exists at new HEAD | YES |
| File content delta | **NO — SHA256 byte-identical** |
| L34-40 semantic equivalence | YES (governance discipline language unchanged) |
| Repo stars (current) | 54649 |
| Repo last pushed | 2026-05-24 15:47:35 UTC |
| Default branch | `main` |
| Recommended CLAUDE.md L4 update | Refresh SHA only — no semantic edit needed |
| Priority | LOW (pure cite-freshness; no content drift, no governance-language change) |

---

## 2. Probe methodology

### 2.1 GitHub API HEAD probe (Task 1)

```powershell
$info = gh api "repos/shanraisshan/claude-code-best-practice" --jq '{stars, pushed_at, default_branch}'
$headSha = gh api "repos/shanraisshan/claude-code-best-practice/commits/main" --jq '.sha'
# → stars=54649, pushed=2026-05-24 15:47:35, HEAD=d30fb7ed0d2d77ecbf269cefdd58831f6f0a374f
```

### 2.2 Commit-delta compute (Task 2)

```powershell
gh api "repos/shanraisshan/claude-code-best-practice/compare/a28cd96b...d30fb7ed"
# → ahead_by=8, behind_by=0, total_commits=8, status=ahead
```

### 2.3 8-commit changelog enumeration

| SHA | Date (UTC) | Message |
|---|---|---|
| `a4aeb74d` | 2026-05-21 15:47:57 | chore(agent-collections): scheduled refresh |
| `eadee94f` | 2026-05-21 15:48:01 | chore(agent-collections): scheduled refresh |
| `6625dc77` | 2026-05-22 15:46:04 | chore(agent-collections): scheduled refresh |
| `1d236d37` | 2026-05-22 15:46:09 | chore(agent-collections): scheduled refresh |
| `d1149210` | 2026-05-23 11:16:43 | Update README.md |
| `294b7047` | 2026-05-23 15:47:51 | chore(agent-collections): scheduled refresh |
| `7c49b2fe` | 2026-05-24 15:47:26 | chore(agent-collections): append 2026-05-24 changelog entry |
| `d30fb7ed` | 2026-05-24 15:47:31 | chore(agent-collections): scheduled refresh |

### 2.4 Aggregate file-change footprint across delta

```powershell
gh api ".../compare/a28cd96b...d30fb7ed" --jq '.files[]'
```

| File | Status | + | - | Δ |
|---|---|---|---|---|
| `README.md` | modified | 2 | 2 | 4 |
| `changelog/agent-collections/changelog.md` | modified | 45 | 0 | 45 |

**Critical finding**: `best-practice/claude-memory.md` (the file CLAUDE.md L4 cites) is NOT in the changed-files list — it is untouched across all 8 delta commits.

### 2.5 File-existence verification at new HEAD (Task 3)

```powershell
gh api "repos/shanraisshan/claude-code-best-practice/contents/best-practice/claude-memory.md?ref=d30fb7ed"
# → {"name":"claude-memory.md","path":"best-practice/claude-memory.md",
#    "sha":"a14765dc5bb92387fab3ac854e8eff4b418c30e7","size":5375,"type":"file"}
```

File exists at the canonical path with full blob SHA `a14765dc5bb92387fab3ac854e8eff4b418c30e7`.

### 2.6 Byte-level content-delta verification (Task 3)

Raw-text fetch (avoiding GitHub API base64 line-wrapping artifact that would inflate LOC 122→242):

```powershell
$c1 = (Invoke-WebRequest "raw.githubusercontent.com/.../a28cd96b/best-practice/claude-memory.md").Content
$c2 = (Invoke-WebRequest "raw.githubusercontent.com/.../d30fb7ed/best-practice/claude-memory.md").Content
# SHA256 old (a28cd96b): 72cbd41221ba74eee1320c91af45b8e070afecfc6350235b9051389d0a03d565
# SHA256 new (d30fb7ed): 72cbd41221ba74eee1320c91af45b8e070afecfc6350235b9051389d0a03d565
# Identical content: True
# Size old: 5305 bytes, Size new: 5305 bytes
```

**Result**: byte-for-byte identical file content between cited SHA and live HEAD.

---

## 3. L34-40 content snapshot (verify-before-claim evidence)

At new HEAD `d30fb7ed` via raw fetch:

```
L34: #### Ancestor Loading (UP the directory tree)
L35: 
L36: When you start Claude Code, it walks **upward** from your current working
     directory toward the filesystem root and loads every CLAUDE.md it finds
     along the way. These files are loaded **immediately at startup**.
L37: 
L38: #### Descendant Loading (DOWN the directory tree)
L39: 
L40: CLAUDE.md files in subdirectories below your current working directory are
     **NOT loaded at launch**. They are only included when Claude reads files
     in those subdirectories during your session. This is known as **lazy loading**.
```

This is exactly the governance language CLAUDE.md L4 quotes:
> "ancestor CLAUDE.md loads at session start; descendant CLAUDE.md lazy-load. This file is the only always-loaded memory."

Semantic equivalence: CONFIRMED.

---

## 4. W342 X4 cross-SHA chain extension

CLAUDE.md L4 currently records a content-stability chain:
> `1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b`

Per this probe, the chain extends content-stably:
> `1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b → d30fb7ed` (per W433-REF-E 2026-05-24, +8 commits all changelog/README-only, `best-practice/claude-memory.md` SHA256-stable @ `72cbd41221ba74eee1320c91af45b8e070afecfc6350235b9051389d0a03d565`)

---

## 5. Recommended CLAUDE.md L4 update text (PROPOSAL ONLY — implementation deferred)

**Current** (CLAUDE.md L4):
```
> Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD a28cd96b` [W342 Stream X4 2026-05-20 cite-refresh: HEAD advanced f28c2da → a28cd96b (changelog-only delta — 14 files / 193+ / 34-, content-stable per W314 §C cross-SHA chain 1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b)] —
```

**Proposed** (W433-REF-E):
```
> Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD d30fb7ed` [W433-REF-E 2026-05-24 cite-refresh: HEAD advanced a28cd96b → d30fb7ed (changelog-only delta — 2 files / 47+ / 2-, content-stable per W314 §C cross-SHA chain 1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b → d30fb7ed; best-practice/claude-memory.md SHA256-byte-identical 72cbd41221...50235b9051389d0a03d565)] —
```

**Diff summary**:
- Bump cite HEAD SHA: `a28cd96b` → `d30fb7ed`
- Replace W342 X4 attribution with W433-REF-E attribution
- Extend cross-SHA chain by 1 hop
- Replace "14 files / 193+ / 34-" with new delta "2 files / 47+ / 2-"
- Add explicit SHA256 byte-identity claim for the cited file

**NOTE per goal guardrail**: this report does NOT modify CLAUDE.md. Update is queued for W432-DOC-DRIFT-2 follow-up wave.

---

## 6. Material change items

NONE. This is a LOW-priority cite-refresh:
- File still exists at canonical path
- File content byte-identical (SHA256 stable)
- Governance discipline language at L34-40 unchanged
- All 8 delta commits modify only `README.md` (+2/-2) and `changelog/agent-collections/changelog.md` (+45)
- No re-validation of citing claims required

No HIGH-priority item to surface.

---

## 7. Citations (cite-floor ≥3-org-distinct per sca-v13)

1. **shanraisshan / CCBP** — upstream source repo at https://github.com/shanraisshan/claude-code-best-practice. HEAD probe at https://github.com/shanraisshan/claude-code-best-practice/commit/d30fb7ed0d2d77ecbf269cefdd58831f6f0a374f, raw fetch via https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/d30fb7ed0d2d77ecbf269cefdd58831f6f0a374f/best-practice/claude-memory.md, file at https://github.com/shanraisshan/claude-code-best-practice/blob/d30fb7ed/best-practice/claude-memory.md.
2. **GitHub** — git-history compare API at https://github.com/shanraisshan/claude-code-best-practice/compare/a28cd96b...d30fb7ed returning ahead_by=8, status=ahead, file-change list `[README.md, changelog/agent-collections/changelog.md]`. REST API docs at https://docs.github.com/en/rest/commits/commits.
3. **Anthropic** — CLAUDE.md memory-loading governance docs at https://docs.anthropic.com/en/docs/claude-code/memory (ancestor-load + descendant-lazy-load semantics — the topic CCBP `best-practice/claude-memory.md:34-40` documents and which CLAUDE.md L4 cites). Code-docs mirror at https://code.claude.com/docs/en/memory.
4. **OWASP** — A06:2021 Vulnerable+Outdated Components discipline at https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/ (governance basis for verify-before-claim citation freshness audit per CR-6).
5. **NIST** — SP 800-218 PW.7 (Review/Analyze Code) + RV.1 (Identify+Confirm Vulnerabilities Ongoing) at https://csrc.nist.gov/pubs/sp/800/218/final (cite-refresh provenance discipline source).
6. **W342 X4 internal** — prior cite-refresh artifact dated 2026-05-20 that established the cross-SHA chain `1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b` and the "content-stable" precedent for changelog-only delta types (cited in CLAUDE.md L4 inline).

**Cite-floor**: 5+ distinct external orgs (shanraisshan / github / anthropic / owasp / nist) plus W342 X4 internal — exceeds sca-v13 ≥3-org-distinct floor per https://github.com/anthropics/claude-code citations-agent SKILL.md:42-66.

---

## 8. Verification commands (verify-before-claim per CR-6)

Re-run on demand:

```powershell
# HEAD probe
gh api "repos/shanraisshan/claude-code-best-practice/commits/main" --jq '.sha'
# Expect: d30fb7ed0d2d77ecbf269cefdd58831f6f0a374f (or newer if drift since 2026-05-24)

# Delta-count
gh api "repos/shanraisshan/claude-code-best-practice/compare/a28cd96b...<new-HEAD>" --jq '.ahead_by'
# Expect: 8 (current) or higher

# File-existence
gh api "repos/shanraisshan/claude-code-best-practice/contents/best-practice/claude-memory.md?ref=<new-HEAD>" --jq '.size'
# Expect: 5375 (or larger; nonzero confirms file exists)

# SHA256 content-identity
$c = (Invoke-WebRequest "https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/<new-HEAD>/best-practice/claude-memory.md").Content
$h = [System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes($c)) | ForEach-Object { $_.ToString("x2") }
-join $h
# Expect (if still content-stable): 72cbd41221ba74eee1320c91af45b8e070afecfc6350235b9051389d0a03d565
```

---

## 9. Follow-up actions

- **W432-DOC-DRIFT-2** (separate wave): apply the §5 proposed CLAUDE.md L4 update text. Pre-condition: this report PR merged.
- **No other actions required** for W433-REF-E. The cite-refresh is complete + verified.
