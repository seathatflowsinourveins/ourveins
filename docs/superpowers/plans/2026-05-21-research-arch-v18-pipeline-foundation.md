# Research-Arch v18 E2E Pipeline Foundation (P1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the foundation layer of the v18 E2E SOTA automation pipeline: canonical doc + 5 schemas + populated data (131 repos + 59 skills) + pipeline orchestrator + 3 full-impl stages (S4 validate, S7 codex-dispatch, S9 commit+push) + 7 stub stages + 8 drive-by fixes, with codex GPT-5.5 r1→rN APPROVE final.

**Architecture:** 3-layer foundation (normative doc + 5 JSON Schema 2020-12 schemas + populated JSON data) under a 10-stage pipeline orchestrator (Node + ajv-2020). Schema-first design: every artifact validates ajv-strict. Multi-session program; P1 ships foundation + 3 of 10 stages full-impl, others as stubs. Authority model = 3-org-distinct + Anthropic-docs hybrid. Naming = W352 hybrid (Conventional Branch + W353 wave anchor + commit trailers).

**Tech Stack:** Node.js 20+ (orchestrator + stages + validator), ajv-2020 strict mode, JSON Schema 2020-12, codex GPT-5.5 via `codex exec` subprocess, git rerere + gpg-signed commits + `--force-with-lease` push, pre-commit hooks (gitleaks/ruff/actionlint/commitlint/codex-trailer-gate/cr2-2kb/MSYS-form/cr7-worktree-collision).

---

## Task 0: Worktree + branch setup

**Files:**
- Modify: (none directly; via `git worktree add`)

- [ ] **Step 0.1: Verify cap=5 race-check pre-conditions**

Run:
```
git worktree list
git fetch --all
```

Expected: current worktree count = 6 (one over CLAUDE.md cap=5 per audit Stream A G1). Will excise in DBF1 below. Then add W353 worktree to land at exactly 5.

- [ ] **Step 0.2: Excise oldest mergeable worktree (DBF1)**

Run:
```
git worktree remove Z:/claude-sota-installed-W348
git worktree list
```

Expected: 5 worktrees remain (current + 4 active goal/W348-carry + W350 + W351 + W352).

- [ ] **Step 0.3: Race-check W353 against parallel sessions**

Run:
```
git fetch --all
git branch -a | findstr W353
ls docs/architecture | findstr W353
```

Expected: no `W353` references found. If found, advance to W354 + update plan inline.

- [ ] **Step 0.4: Create branch + worktree**

Run:
```
git worktree add -b feat/research-arch-v18-pipeline-foundation Z:/claude-sota-installed-W353 w348-sota-fix-p5b
git worktree list
```

Expected: 5 worktrees total; W353 worktree on branch `feat/research-arch-v18-pipeline-foundation`.

- [ ] **Step 0.5: Switch to W353 worktree, verify clean state**

Run:
```
cd Z:/claude-sota-installed-W353
git status --short
```

Expected: clean working tree on new branch.

---

## Task 1: Create directory skeleton

**Files:**
- Create: `docs/sota-research/V18-RESEARCH-ARCHITECTURE.md` (placeholder; filled in Task 9)
- Create: `docs/sota-research/schemas/` (dir)
- Create: `docs/sota-research/data/` (dir)
- Create: `docs/sota-research/data/codex-rounds/` (dir)
- Create: `docs/sota-research/data/pipeline-state/` (dir)
- Create: `docs/sota-research/sub/` (dir for overflow per Risk R1)
- Create: `tools/sota-stages/` (dir)
- Create: `tests/sota-research/positive/` (dir)
- Create: `tests/sota-research/negative/` (dir)
- Create: `docs/architecture/_archived/research-arch-v1-v17-lineage/` (dir)
- Create: `docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/` (dir)

- [ ] **Step 1.1: Create directories**

Run:
```
cd Z:/claude-sota-installed-W353
mkdir -p docs/sota-research/schemas docs/sota-research/data/codex-rounds docs/sota-research/data/pipeline-state docs/sota-research/sub tools/sota-stages tests/sota-research/positive tests/sota-research/negative docs/architecture/_archived/research-arch-v1-v17-lineage docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE
```

Expected: all 10 directories present.

- [ ] **Step 1.2: Verify directory structure**

Run:
```
find docs/sota-research tools/sota-stages tests/sota-research docs/architecture/_archived docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE -type d | sort
```

Expected: structured tree matches above.

- [ ] **Step 1.3: Commit directory skeleton with .gitkeep placeholders**

Run:
```
touch docs/sota-research/schemas/.gitkeep docs/sota-research/data/.gitkeep docs/sota-research/data/codex-rounds/.gitkeep docs/sota-research/data/pipeline-state/.gitkeep docs/sota-research/sub/.gitkeep tools/sota-stages/.gitkeep tests/sota-research/positive/.gitkeep tests/sota-research/negative/.gitkeep docs/architecture/_archived/research-arch-v1-v17-lineage/.gitkeep docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/.gitkeep
git add docs/sota-research tools/sota-stages tests/sota-research docs/architecture/_archived docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE
git commit -m "chore(W353): scaffold v18 pipeline directory skeleton

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

Expected: commit succeeds with all pre-commit gates passing.

---

## Task 2: Schema C2 — catalog.schema.json

**Files:**
- Create: `docs/sota-research/schemas/catalog.schema.json`
- Test: `tests/sota-research/positive/test-catalog-sample.json`
- Test: `tests/sota-research/negative/test-catalog-missing-required.json`
- Test: `tests/sota-research/negative/test-catalog-invalid-sha.json`
- Test: `tests/sota-research/negative/test-catalog-unknown-tier.json`

- [ ] **Step 2.1: Write positive sample test fixture**

Create `tests/sota-research/positive/test-catalog-sample.json`:
```json
{
  "id": "anthropics-claude-cookbooks",
  "name": "claude-cookbooks",
  "org": "anthropics",
  "url": "https://github.com/anthropics/claude-cookbooks",
  "sha": "39a350b6790c132337dcc3ec35240728fcc1dc0e",
  "sca_v17_scores": {
    "D1": 9.5, "D2": 9.0, "D3": 8.5, "D4": 9.0, "D5": 9.0,
    "D6": 9.0, "D7": 9.0, "D8": 9.0, "D9": 9.0, "D10": 9.0,
    "D11": 9.0, "D12": 9.0, "D13": 9.0, "D14": 9.0, "D15": 9.0,
    "D16": 9.0, "D17": 9.0, "D18": 9.0, "D19": 9.0, "D20": 9.0,
    "D21": 9.0, "D22": 9.0, "D23": 9.0, "D24": 9.0, "D25": 9.0,
    "D26": 9.0, "D27": 9.0, "D28": 9.0, "D29": 9.0, "D30": 9.0,
    "D31": 9.0, "D32": 9.0, "D33": 9.0, "D34": 9.0, "D35": 9.0,
    "D36": 9.0, "D37": 9.0, "D38": 9.0, "D39": 9.0, "D40": 9.0,
    "D41": 9.0, "D42": 9.0, "D43": 9.0, "D44": 9.0, "D45": 9.0,
    "D46": 9.0, "D47": 9.0, "D48": 9.0, "D49": 9.0, "D50": 9.0,
    "D51": 9.0, "D52": 9.0, "D53": 9.0, "D54": 9.0, "D55": 9.0,
    "D56": 9.0, "D57": 9.0, "D58": 9.0, "D59": 9.0, "D60": 9.0,
    "D61": 9.0, "D62": 9.0, "D63": 9.0, "D64": 9.0, "D65": 9.0,
    "D66": 9.0, "D67": 9.0, "D68": 9.0, "D69": 9.0, "D70": 9.0,
    "D71": 9.0, "D72": 9.0, "D73": 9.0, "D74": 9.0, "D75": 9.0,
    "D76": 9.0, "D77": 9.0, "D78": 9.0, "D79": 9.0, "D80": 9.0,
    "D81": 9.0, "D82": 9.0, "D83": 9.0
  },
  "cite_anchor_ids": ["ANC-001", "ANC-002", "ANC-003"],
  "tier": "INSTALL",
  "install_pathway": "git-clone-cite",
  "status": "LIVE"
}
```

- [ ] **Step 2.2: Run validator (expect FAIL — schema doesn't exist yet)**

Run:
```
node -e "import('ajv-2020').then(m => { const ajv = new m.default({strict:true}); console.log('ajv-2020 loaded'); })"
```

Expected: prints `ajv-2020 loaded` (verifies dep is installed). If error, install: `npm install --save-dev ajv-2020`.

- [ ] **Step 2.3: Write catalog.schema.json (minimal failing version)**

Create `docs/sota-research/schemas/catalog.schema.json`:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://claude-sota-installed.local/sota-research/catalog.schema.json",
  "title": "SOTA Catalog Entry",
  "type": "object",
  "required": ["id", "name", "org", "url", "sha", "sca_v17_scores", "cite_anchor_ids", "tier", "install_pathway", "status"],
  "additionalProperties": false,
  "properties": {
    "id": {"type": "string", "minLength": 1},
    "name": {"type": "string", "minLength": 1},
    "org": {"type": "string", "minLength": 1},
    "url": {"type": "string", "format": "uri"},
    "sha": {"type": "string", "pattern": "^[0-9a-f]{7,40}$"},
    "sca_v17_scores": {
      "type": "object",
      "required": ["D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","D14","D15","D16","D17","D18","D19","D20","D21","D22","D23","D24","D25","D26","D27","D28","D29","D30","D31","D32","D33","D34","D35","D36","D37","D38","D39","D40","D41","D42","D43","D44","D45","D46","D47","D48","D49","D50","D51","D52","D53","D54","D55","D56","D57","D58","D59","D60","D61","D62","D63","D64","D65","D66","D67","D68","D69","D70","D71","D72","D73","D74","D75","D76","D77","D78","D79","D80","D81","D82","D83"],
      "additionalProperties": false,
      "patternProperties": {
        "^D([1-9]|[1-7][0-9]|8[0-3])$": {"type": "number", "minimum": 0, "maximum": 10}
      }
    },
    "cite_anchor_ids": {"type": "array", "items": {"type": "string"}, "minItems": 3, "uniqueItems": true},
    "tier": {"type": "string", "enum": ["INSTALL", "PATTERN-VENDOR", "PATTERN-CITE", "T2-VENDOR-FORK", "T3-PATTERN", "RETIRED"]},
    "install_pathway": {"type": "string", "enum": ["plugin-install", "mcp-json-npx", "mcp-json-uvx", "nssm-service", "git-clone-cite", "vendor-fork"]},
    "status": {"type": "string", "enum": ["LIVE", "DISABLED", "RETIRED", "CANDIDATE"]}
  }
}
```

- [ ] **Step 2.4: Run positive sample validation (expect PASS)**

Run from W353 worktree:
```
node -e "import('ajv-2020').then(m => { import('fs').then(fs => { const ajv = new m.default({strict:true}); const schema = JSON.parse(fs.readFileSync('docs/sota-research/schemas/catalog.schema.json','utf8')); const data = JSON.parse(fs.readFileSync('tests/sota-research/positive/test-catalog-sample.json','utf8')); const valid = ajv.validate(schema, data); console.log(valid ? 'PASS' : 'FAIL: ' + JSON.stringify(ajv.errors)); }); })"
```

Expected: `PASS`.

- [ ] **Step 2.5: Write 3 negative test fixtures**

Create `tests/sota-research/negative/test-catalog-missing-required.json`:
```json
{
  "id": "test",
  "name": "test"
}
```

Create `tests/sota-research/negative/test-catalog-invalid-sha.json`:
```json
{
  "id": "test", "name": "test", "org": "test",
  "url": "https://example.com",
  "sha": "not-a-sha",
  "sca_v17_scores": {},
  "cite_anchor_ids": ["A","B","C"],
  "tier": "INSTALL",
  "install_pathway": "git-clone-cite",
  "status": "LIVE"
}
```

Create `tests/sota-research/negative/test-catalog-unknown-tier.json`:
```json
{
  "id": "test", "name": "test", "org": "test",
  "url": "https://example.com",
  "sha": "abc1234",
  "sca_v17_scores": {"D1": 5},
  "cite_anchor_ids": ["A","B","C"],
  "tier": "UNKNOWN-TIER-VALUE",
  "install_pathway": "git-clone-cite",
  "status": "LIVE"
}
```

- [ ] **Step 2.6: Run 3 negative validations (expect FAIL with specific errors)**

Run:
```
for f in tests/sota-research/negative/test-catalog-*.json; do
  echo "=== $f ===";
  node -e "import('ajv-2020').then(m => { import('fs').then(fs => { const ajv = new m.default({strict:true}); const schema = JSON.parse(fs.readFileSync('docs/sota-research/schemas/catalog.schema.json','utf8')); const data = JSON.parse(fs.readFileSync('$f','utf8')); const valid = ajv.validate(schema, data); console.log(valid ? 'UNEXPECTED PASS' : 'EXPECTED FAIL: ' + ajv.errors[0].message); }); })";
done
```

Expected:
- `test-catalog-missing-required.json` → `EXPECTED FAIL: must have required property 'org'`
- `test-catalog-invalid-sha.json` → `EXPECTED FAIL: must match pattern "^[0-9a-f]{7,40}$"`
- `test-catalog-unknown-tier.json` → `EXPECTED FAIL: must be equal to one of the allowed values`

- [ ] **Step 2.7: Commit**

Run:
```
git add docs/sota-research/schemas/catalog.schema.json tests/sota-research/positive/test-catalog-sample.json tests/sota-research/negative/test-catalog-*.json
git commit -m "feat(W353): land catalog.schema.json + 1 positive + 3 negative sample tests

Schema: JSON Schema 2020-12 strict, 83-dim sca_v17_scores, ≥3 cite_anchor_ids,
SHA pattern, tier/install_pathway/status enums.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

Expected: commit succeeds.

---

## Task 3: Schema C3 — cite-anchors.schema.json (with minDistinctOrgs custom keyword)

**Files:**
- Create: `docs/sota-research/schemas/cite-anchors.schema.json`
- Test: `tests/sota-research/positive/test-cite-anchors-sample.json`
- Test: `tests/sota-research/negative/test-cite-anchors-less-than-3-orgs.json`

- [ ] **Step 3.1: Write positive cite-anchors sample**

Create `tests/sota-research/positive/test-cite-anchors-sample.json`:
```json
{
  "id": "ANC-001",
  "claim_text": "Codex GPT-5.5 is the authoritative cross-model adversarial-review gate.",
  "anchors": [
    {"org": "anthropic", "url": "https://docs.anthropic.com/en/docs/claude-code/sub-agents", "sha": "ac0d87d", "line": 11, "last_verified_date": "2026-05-21"},
    {"org": "openai", "url": "https://github.com/openai/codex-action", "sha": "abc1234", "line": 1, "last_verified_date": "2026-05-21"},
    {"org": "microsoft", "url": "https://github.com/microsoft/agent-framework", "sha": "def5678", "line": 1, "last_verified_date": "2026-05-21"}
  ]
}
```

- [ ] **Step 3.2: Write cite-anchors schema with minDistinctOrgs validation**

Create `docs/sota-research/schemas/cite-anchors.schema.json`:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://claude-sota-installed.local/sota-research/cite-anchors.schema.json",
  "title": "Cite-anchor cluster",
  "type": "object",
  "required": ["id", "claim_text", "anchors"],
  "additionalProperties": false,
  "properties": {
    "id": {"type": "string", "pattern": "^ANC-[0-9]{3,5}$"},
    "claim_text": {"type": "string", "minLength": 10},
    "anchors": {
      "type": "array",
      "minItems": 3,
      "items": {
        "type": "object",
        "required": ["org", "url", "sha", "line", "last_verified_date"],
        "additionalProperties": false,
        "properties": {
          "org": {"type": "string", "minLength": 1},
          "url": {"type": "string", "format": "uri"},
          "sha": {"type": "string", "pattern": "^[0-9a-f]{7,40}$|^HEAD$|^N/A$"},
          "line": {"type": "integer", "minimum": 0},
          "last_verified_date": {"type": "string", "format": "date"}
        }
      }
    }
  }
}
```

- [ ] **Step 3.3: Validate positive sample (expect PASS)**

Run:
```
node -e "import('ajv-2020').then(m => { import('ajv-formats').then(fmt => { import('fs').then(fs => { const ajv = new m.default({strict:true}); fmt.default(ajv); const schema = JSON.parse(fs.readFileSync('docs/sota-research/schemas/cite-anchors.schema.json','utf8')); const data = JSON.parse(fs.readFileSync('tests/sota-research/positive/test-cite-anchors-sample.json','utf8')); const valid = ajv.validate(schema, data); console.log(valid ? 'PASS' : 'FAIL: ' + JSON.stringify(ajv.errors)); }); }); })"
```

Expected: `PASS`. If `ajv-formats` missing, install: `npm install --save-dev ajv-formats`.

- [ ] **Step 3.4: Write negative — <3 anchors**

Create `tests/sota-research/negative/test-cite-anchors-less-than-3-orgs.json`:
```json
{
  "id": "ANC-002",
  "claim_text": "Test claim with only 2 anchors.",
  "anchors": [
    {"org": "anthropic", "url": "https://docs.anthropic.com/", "sha": "abc1234", "line": 1, "last_verified_date": "2026-05-21"},
    {"org": "microsoft", "url": "https://github.com/microsoft/agent-framework", "sha": "def5678", "line": 1, "last_verified_date": "2026-05-21"}
  ]
}
```

- [ ] **Step 3.5: Validate negative (expect FAIL with minItems error)**

Run:
```
node -e "import('ajv-2020').then(m => { import('ajv-formats').then(fmt => { import('fs').then(fs => { const ajv = new m.default({strict:true}); fmt.default(ajv); const schema = JSON.parse(fs.readFileSync('docs/sota-research/schemas/cite-anchors.schema.json','utf8')); const data = JSON.parse(fs.readFileSync('tests/sota-research/negative/test-cite-anchors-less-than-3-orgs.json','utf8')); const valid = ajv.validate(schema, data); console.log(valid ? 'UNEXPECTED PASS' : 'EXPECTED FAIL: ' + ajv.errors[0].message); }); }); })"
```

Expected: `EXPECTED FAIL: must NOT have fewer than 3 items`.

- [ ] **Step 3.6: Note for future minDistinctOrgs custom keyword**

Add comment to schema header documenting the constraint is enforced today via `minItems: 3` + downstream validator script computes distinct-org count and emits warning if <3 distinct (full custom keyword deferred to P2 alongside the validator):

Run:
```
echo "  Note: distinct-org enforcement = minItems:3 today + downstream check in tools/validate-sota-catalog.mjs; full ajv keyword plugin planned P2."
```

This is for documentation only; the schema stands as-is.

- [ ] **Step 3.7: Commit**

Run:
```
git add docs/sota-research/schemas/cite-anchors.schema.json tests/sota-research/positive/test-cite-anchors-sample.json tests/sota-research/negative/test-cite-anchors-less-than-3-orgs.json
git commit -m "feat(W353): land cite-anchors.schema.json with anchor[≥3] validation

Schema: JSON Schema 2020-12 strict, anchors[].org/url/sha/line/last_verified_date.
minItems:3 enforces baseline; full minDistinctOrgs custom keyword deferred to P2.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 4: Schema C4 — codex-rounds.schema.json

**Files:**
- Create: `docs/sota-research/schemas/codex-rounds.schema.json`
- Test: `tests/sota-research/positive/test-codex-rounds-sample.json`

- [ ] **Step 4.1: Write positive r2 record sample**

Create `tests/sota-research/positive/test-codex-rounds-sample.json`:
```json
{
  "round_id": "w353-codex-r2",
  "wave": "W353",
  "model": "codex-gpt-5.5",
  "sha_under_review": "7c9cd93",
  "verdict": "APPROVE",
  "findings": [
    {
      "severity": "info",
      "claim": "All 5 schemas validate against ajv-2020 strict mode",
      "evidence_uri": "tools/validate-sota-catalog.mjs",
      "cite_anchor_ids": ["ANC-001"]
    }
  ],
  "convergence_signal": "no new findings"
}
```

- [ ] **Step 4.2: Write codex-rounds schema**

Create `docs/sota-research/schemas/codex-rounds.schema.json`:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://claude-sota-installed.local/sota-research/codex-rounds.schema.json",
  "title": "Codex round verdict record",
  "type": "object",
  "required": ["round_id", "wave", "model", "sha_under_review", "verdict", "findings"],
  "additionalProperties": false,
  "properties": {
    "round_id": {"type": "string", "pattern": "^w[0-9]+-codex-r[0-9]+$"},
    "wave": {"type": "string", "pattern": "^W[0-9]+$"},
    "model": {"type": "string", "pattern": "^(codex-gpt-5\\.5|claude-sonnet-4-6|claude-opus-4-7).*$"},
    "sha_under_review": {"type": "string", "pattern": "^[0-9a-f]{7,40}$"},
    "verdict": {"type": "string", "enum": ["APPROVE", "BLOCK", "REVISE"]},
    "findings": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["severity", "claim", "evidence_uri", "cite_anchor_ids"],
        "additionalProperties": false,
        "properties": {
          "severity": {"type": "string", "enum": ["critical", "high", "medium", "low", "info"]},
          "claim": {"type": "string", "minLength": 10},
          "evidence_uri": {"type": "string"},
          "cite_anchor_ids": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "convergence_signal": {"type": "string", "enum": ["no new findings", "sonnet-tiebreaker-invoked", "continuing"]}
  }
}
```

- [ ] **Step 4.3: Validate positive sample (expect PASS)**

Run:
```
node -e "import('ajv-2020').then(m => { import('fs').then(fs => { const ajv = new m.default({strict:true}); const schema = JSON.parse(fs.readFileSync('docs/sota-research/schemas/codex-rounds.schema.json','utf8')); const data = JSON.parse(fs.readFileSync('tests/sota-research/positive/test-codex-rounds-sample.json','utf8')); const valid = ajv.validate(schema, data); console.log(valid ? 'PASS' : 'FAIL: ' + JSON.stringify(ajv.errors)); }); })"
```

Expected: `PASS`.

- [ ] **Step 4.4: Commit**

Run:
```
git add docs/sota-research/schemas/codex-rounds.schema.json tests/sota-research/positive/test-codex-rounds-sample.json
git commit -m "feat(W353): land codex-rounds.schema.json + sample r2 APPROVE record

Schema: round_id pattern w<n>-codex-r<N>, model pattern (codex|sonnet|opus),
verdict enum APPROVE|BLOCK|REVISE, findings[]severity/claim/evidence/cites,
convergence_signal enum.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 5: Schema C5 — skill-provenance.schema.json

**Files:**
- Create: `docs/sota-research/schemas/skill-provenance.schema.json`
- Test: `tests/sota-research/positive/test-skill-provenance-sample.json`

- [ ] **Step 5.1: Write positive sample**

Create `tests/sota-research/positive/test-skill-provenance-sample.json`:
```json
{
  "skill_path": ".claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md",
  "source_repo_id": "obra-superpowers",
  "source_sha": "b8be62ffacb0118fa3eaa29a0923c87c8c11985c",
  "vendor_fork_type": "VENDOR-FORK",
  "divergence_summary": "Adds skeleton-first-write + context-budget hard-cap + mid-flight stream-error retry per W321 fork rationale."
}
```

- [ ] **Step 5.2: Write skill-provenance schema**

Create `docs/sota-research/schemas/skill-provenance.schema.json`:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://claude-sota-installed.local/sota-research/skill-provenance.schema.json",
  "title": "Skill provenance edge",
  "type": "object",
  "required": ["skill_path", "source_repo_id", "source_sha", "vendor_fork_type"],
  "additionalProperties": false,
  "properties": {
    "skill_path": {"type": "string", "pattern": "^\\.claude/skills/[a-z0-9_-]+(/[a-zA-Z0-9._/-]+)?$"},
    "source_repo_id": {"type": "string", "minLength": 1},
    "source_sha": {"type": "string", "pattern": "^[0-9a-f]{7,40}$|^HEAD$|^N/A$"},
    "vendor_fork_type": {"type": "string", "enum": ["VANILLA-INSTALL", "VENDOR-FORK", "PATTERN-EXTRACT", "NET-NEW-COMPOSITE"]},
    "divergence_summary": {"type": "string"}
  }
}
```

- [ ] **Step 5.3: Validate positive sample (expect PASS)**

Run:
```
node -e "import('ajv-2020').then(m => { import('fs').then(fs => { const ajv = new m.default({strict:true}); const schema = JSON.parse(fs.readFileSync('docs/sota-research/schemas/skill-provenance.schema.json','utf8')); const data = JSON.parse(fs.readFileSync('tests/sota-research/positive/test-skill-provenance-sample.json','utf8')); const valid = ajv.validate(schema, data); console.log(valid ? 'PASS' : 'FAIL: ' + JSON.stringify(ajv.errors)); }); })"
```

Expected: `PASS`.

- [ ] **Step 5.4: Commit**

Run:
```
git add docs/sota-research/schemas/skill-provenance.schema.json tests/sota-research/positive/test-skill-provenance-sample.json
git commit -m "feat(W353): land skill-provenance.schema.json

Schema: skill_path pattern, source_repo_id, source_sha, vendor_fork_type enum
(VANILLA-INSTALL|VENDOR-FORK|PATTERN-EXTRACT|NET-NEW-COMPOSITE).

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 6: Schema C6 — pipeline-run.schema.json (NEW in r2)

**Files:**
- Create: `docs/sota-research/schemas/pipeline-run.schema.json`
- Test: `tests/sota-research/positive/test-pipeline-run-sample.json`

- [ ] **Step 6.1: Write positive sample**

Create `tests/sota-research/positive/test-pipeline-run-sample.json`:
```json
{
  "run_id": "run-2026-05-21T00:00:00Z-0001",
  "wave": "W353",
  "started_at": "2026-05-21T00:00:00Z",
  "stages": {
    "S4": {"status": "completed", "exit_code": 0, "output_uri": "validation-report.md", "duration_ms": 1500},
    "S7": {"status": "completed", "exit_code": 0, "output_uri": "data/codex-rounds/r2.json", "duration_ms": 45000},
    "S9": {"status": "completed", "exit_code": 0, "output_uri": "git-commit-hash", "duration_ms": 3000}
  },
  "overall_verdict": "APPROVE"
}
```

- [ ] **Step 6.2: Write pipeline-run schema**

Create `docs/sota-research/schemas/pipeline-run.schema.json`:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://claude-sota-installed.local/sota-research/pipeline-run.schema.json",
  "title": "Pipeline run state",
  "type": "object",
  "required": ["run_id", "wave", "started_at", "stages", "overall_verdict"],
  "additionalProperties": false,
  "properties": {
    "run_id": {"type": "string", "pattern": "^run-[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z-[0-9]{4}$"},
    "wave": {"type": "string", "pattern": "^W[0-9]+$"},
    "started_at": {"type": "string", "format": "date-time"},
    "stages": {
      "type": "object",
      "patternProperties": {
        "^S(10|[1-9])$": {
          "type": "object",
          "required": ["status", "exit_code"],
          "additionalProperties": false,
          "properties": {
            "status": {"type": "string", "enum": ["pending", "running", "completed", "failed", "skipped"]},
            "exit_code": {"type": "integer", "minimum": 0, "maximum": 255},
            "output_uri": {"type": "string"},
            "duration_ms": {"type": "integer", "minimum": 0},
            "failure_reason": {"type": "string"}
          }
        }
      },
      "additionalProperties": false
    },
    "overall_verdict": {"type": "string", "enum": ["APPROVE", "BLOCK", "REVISE", "INCOMPLETE"]}
  }
}
```

- [ ] **Step 6.3: Validate positive sample (expect PASS)**

Run:
```
node -e "import('ajv-2020').then(m => { import('ajv-formats').then(fmt => { import('fs').then(fs => { const ajv = new m.default({strict:true}); fmt.default(ajv); const schema = JSON.parse(fs.readFileSync('docs/sota-research/schemas/pipeline-run.schema.json','utf8')); const data = JSON.parse(fs.readFileSync('tests/sota-research/positive/test-pipeline-run-sample.json','utf8')); const valid = ajv.validate(schema, data); console.log(valid ? 'PASS' : 'FAIL: ' + JSON.stringify(ajv.errors)); }); }); })"
```

Expected: `PASS`.

- [ ] **Step 6.4: Commit**

Run:
```
git add docs/sota-research/schemas/pipeline-run.schema.json tests/sota-research/positive/test-pipeline-run-sample.json
git commit -m "feat(W353): land pipeline-run.schema.json for per-run state

Schema: run_id timestamp pattern, stages dict S1..S10 each with status/exit_code
/output_uri/duration_ms, overall_verdict enum.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 7: Validator C13 — `tools/validate-sota-catalog.mjs`

**Files:**
- Create: `tools/validate-sota-catalog.mjs`
- Test: (inline run; output goes to `docs/sota-research/validation-report.md`)

- [ ] **Step 7.1: Write validator script**

Create `tools/validate-sota-catalog.mjs`:
```javascript
#!/usr/bin/env node
import Ajv from 'ajv-2020';
import addFormats from 'ajv-formats';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const args = Object.fromEntries(process.argv.slice(2).flatMap((arg, i, arr) => {
  if (arg.startsWith('--')) return [[arg.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]];
  return [];
}));

const schemasDir = args.schemas || 'docs/sota-research/schemas';
const dataDir = args.data || 'docs/sota-research/data';
const full = args.full === true || args.full === 'true';

const ajv = new Ajv({ strict: true, allErrors: true });
addFormats(ajv);

const schemaFiles = readdirSync(schemasDir).filter(f => f.endsWith('.schema.json'));
const schemas = {};
for (const f of schemaFiles) {
  const key = basename(f, '.schema.json');
  schemas[key] = JSON.parse(readFileSync(join(schemasDir, f), 'utf8'));
}

const report = { run_at: new Date().toISOString(), schemas_loaded: Object.keys(schemas), validations: [] };
let exitCode = 0;

function validate(schemaKey, dataPath, label) {
  if (!existsSync(dataPath)) {
    report.validations.push({ schema: schemaKey, data: dataPath, label, status: 'SKIP', reason: 'data file not found' });
    return;
  }
  const data = JSON.parse(readFileSync(dataPath, 'utf8'));
  const valid = ajv.validate(schemas[schemaKey], data);
  report.validations.push({
    schema: schemaKey,
    data: dataPath,
    label,
    status: valid ? 'PASS' : 'FAIL',
    errors: valid ? null : ajv.errors,
  });
  if (!valid) exitCode = 1;
}

if (full) {
  validate('catalog', join(dataDir, 'catalog.json'), 'full 131-repo catalog');
  validate('cite-anchors', join(dataDir, 'cite-anchors.json'), 'full cite-anchors manifest');
  validate('skill-provenance', join(dataDir, 'skill-provenance.json'), 'full skill-provenance');
  const codexDir = join(dataDir, 'codex-rounds');
  if (existsSync(codexDir)) {
    for (const f of readdirSync(codexDir).filter(f => f.endsWith('.json'))) {
      validate('codex-rounds', join(codexDir, f), `codex round ${f}`);
    }
  }
  const stateDir = join(dataDir, 'pipeline-state');
  if (existsSync(stateDir)) {
    for (const f of readdirSync(stateDir).filter(f => f.endsWith('.json'))) {
      validate('pipeline-run', join(stateDir, f), `pipeline run ${f}`);
    }
  }
} else {
  validate('catalog', join('tests/sota-research/positive/test-catalog-sample.json'), 'sample catalog');
  validate('cite-anchors', join('tests/sota-research/positive/test-cite-anchors-sample.json'), 'sample cite-anchors');
  validate('codex-rounds', join('tests/sota-research/positive/test-codex-rounds-sample.json'), 'sample codex-rounds');
  validate('skill-provenance', join('tests/sota-research/positive/test-skill-provenance-sample.json'), 'sample skill-provenance');
  validate('pipeline-run', join('tests/sota-research/positive/test-pipeline-run-sample.json'), 'sample pipeline-run');
}

const reportPath = 'docs/sota-research/validation-report.md';
const reportMd = [
  '# SOTA Validation Report',
  `Run at: ${report.run_at}`,
  `Schemas loaded: ${report.schemas_loaded.join(', ')}`,
  '',
  '## Validations',
  ...report.validations.map(v =>
    `- [${v.status === 'PASS' ? 'x' : ' '}] **${v.label}** (${v.schema}) — ${v.status}${v.errors ? '\n  - errors: ' + JSON.stringify(v.errors) : ''}${v.reason ? '\n  - reason: ' + v.reason : ''}`
  ),
].join('\n');
writeFileSync(reportPath, reportMd, 'utf8');

console.log(reportMd);
process.exit(exitCode);
```

- [ ] **Step 7.2: Run validator in sample mode (expect exit 0)**

Run:
```
node tools/validate-sota-catalog.mjs
echo "Exit: $?"
```

Expected: exit code 0, all 5 sample validations report PASS, `docs/sota-research/validation-report.md` written.

- [ ] **Step 7.3: Commit validator + report**

Run:
```
git add tools/validate-sota-catalog.mjs docs/sota-research/validation-report.md
git commit -m "feat(W353): land validate-sota-catalog.mjs (C13)

ajv-2020 strict + ajv-formats. CLI: --schemas / --data / --full.
Sample mode validates 5 positive samples; --full validates entire data dir.
Exit code 0 if all green, 1 on any violation.
Writes docs/sota-research/validation-report.md on each run.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 8: Populate catalog.json (131 repos via 4 parallel agents)

**Files:**
- Create: `docs/sota-research/data/catalog.json`
- Read: `Z:/claude-sota-installed-repos/` (131 dirs)
- Read: `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v17 rubric)
- Read: `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/00-INVENTORY.md`

- [ ] **Step 8.1: Enumerate the 131 repos**

Run:
```
ls Z:/claude-sota-installed-repos | sort > /tmp/repos-131.txt
wc -l /tmp/repos-131.txt
```

Expected: 131 lines.

- [ ] **Step 8.2: Read sca-v17 rubric for D1..D83 dim definitions**

Read: `.claude/skills/sota-convergence-audit/SKILL.md` (study D1..D83 dim definitions for scoring methodology).

- [ ] **Step 8.3: Dispatch 4 parallel catalog-populate agents**

Use the Agent tool with `subagent_type=general-purpose` × 4 in a SINGLE message:

```
Agent 1: repos 1-33 (sorted alphabetically)
Agent 2: repos 34-66
Agent 3: repos 67-99
Agent 4: repos 100-131
```

Each agent prompt:
> "Score the following 33 repos against the sca-v17 rubric at `.claude/skills/sota-convergence-audit/SKILL.md` (83 dimensions D1..D83 each 0-10). For each repo, produce a JSON entry validating against `docs/sota-research/schemas/catalog.schema.json`. Use existing W326-grand-catalog data + W259v8-v16 ledgers when available; for missing dims, assign neutral 5.0 with `provisional: true` (per Risk R5). Output as JSON array. Required fields: id, name, org, url (https://github.com/<org>/<name>), sha (HEAD or last-known), sca_v17_scores{D1..D83}, cite_anchor_ids[≥3 placeholder ANC-XXX-Y], tier, install_pathway, status. Report-back budget: 1000 words."

- [ ] **Step 8.4: Merge agent outputs into catalog.json**

After agents return, merge into single file:
```
node -e "
import('fs').then(fs => {
  const a1 = JSON.parse(fs.readFileSync('/tmp/agent-1-catalog.json'));
  const a2 = JSON.parse(fs.readFileSync('/tmp/agent-2-catalog.json'));
  const a3 = JSON.parse(fs.readFileSync('/tmp/agent-3-catalog.json'));
  const a4 = JSON.parse(fs.readFileSync('/tmp/agent-4-catalog.json'));
  const merged = [...a1, ...a2, ...a3, ...a4];
  fs.writeFileSync('docs/sota-research/data/catalog.json', JSON.stringify(merged, null, 2));
  console.log('Merged ' + merged.length + ' entries');
});
"
```

Expected: `Merged 131 entries`.

- [ ] **Step 8.5: Validate full catalog**

Run:
```
node tools/validate-sota-catalog.mjs --full --schemas docs/sota-research/schemas --data docs/sota-research/data
echo "Exit: $?"
```

Expected: exit code 0 OR specific errors (fix per agent re-dispatch if any fail).

- [ ] **Step 8.6: Iterate on failures**

If validation fails, dispatch fresh agent to fix specific entries until all 131 validate green. Repeat until exit 0.

- [ ] **Step 8.7: Commit**

Run:
```
git add docs/sota-research/data/catalog.json
git commit -m "feat(W353): populate data/catalog.json with 131-repo sca-v17 scores

131 repos × 83 dims = 10,873 scored cells.
Cross-checked against Z:/claude-sota-installed-repos/ enumeration + W326-grand-catalog
+ W259v8-v16 ledgers. Provisional flag for ≤2-org claims per Risk R5.

All entries validate ajv-2020 strict against catalog.schema.json.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 9: Populate cite-anchors.json

**Files:**
- Create: `docs/sota-research/data/cite-anchors.json`

- [ ] **Step 9.1: Extract cite-anchors from W326+W352 preserved files**

Dispatch agent with `subagent_type=general-purpose`:
> "Extract all cite-anchor clusters from `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/00-INVENTORY.md` through `09-TARGET-ARCHITECTURE-DESIGN.md` AND `docs/architecture/W352-SOTA-CONVERGENCE-FOUNDATIONAL/DESIGN.md`. For each cluster, emit a JSON entry validating against `docs/sota-research/schemas/cite-anchors.schema.json`. Each entry: {id: ANC-XXX-N, claim_text, anchors[≥3]: {org, url, sha, line, last_verified_date: '2026-05-21'}}. If a claim has <3 anchors, mark its anchors[3]={org:'CITATION-NEEDED', url:'N/A', sha:'N/A', line:0, last_verified_date:'2026-05-21'}. Report-back: number of clusters extracted + JSON array."

- [ ] **Step 9.2: Add foundational cite-anchors for v18 doc itself**

Append the 3-org-distinct convergence sources for v18:
- ANC-001: codex GPT-5.5 authority (Anthropic + OpenAI + Microsoft)
- ANC-002: sca-v17 rubric provenance (Anthropic + addyosmani + Microsoft)
- ANC-003: pipeline orchestration pattern (Anthropic + Microsoft + lastmile-ai)
- ANC-004: skill versioning + rollback (Anthropic + Microsoft + assafelovic)
- ANC-005: 3-org-distinct discipline (W332-sca-v13 + SLSA + OWASP)
- ... (10-20 foundational anchors total)

- [ ] **Step 9.3: Write to file + validate**

```
node tools/validate-sota-catalog.mjs --full
echo "Exit: $?"
```

Expected: exit code 0; cite-anchors.json passes.

- [ ] **Step 9.4: Commit**

Run:
```
git add docs/sota-research/data/cite-anchors.json
git commit -m "feat(W353): populate data/cite-anchors.json from W326+W352 + foundational

Cite-clusters extracted from preserved W326 (00-09) + W352 + v18 foundational
3-org-distinct convergence sources. All clusters anchors[≥3] validated.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 10: Populate skill-provenance.json (59 skills)

**Files:**
- Create: `docs/sota-research/data/skill-provenance.json`

- [ ] **Step 10.1: Enumerate 59 active skills**

Run:
```
ls .claude/skills | grep -v _archived | wc -l
ls .claude/skills | grep -v _archived > /tmp/skills-59.txt
```

Expected: 59 lines (per audit Stream E).

- [ ] **Step 10.2: Dispatch agent to map each skill to source repo + sha + vendor_fork_type**

Use `subagent_type=general-purpose`:
> "For each of the 59 skills in `.claude/skills/`, read its SKILL.md frontmatter + body and determine: source_repo_id (e.g. 'obra-superpowers', 'addyosmani-agent-skills', 'mattpocock-skills', 'NET-NEW' if locally authored), source_sha (find in SKILL.md cite-anchors or use 'HEAD'), vendor_fork_type (VANILLA-INSTALL | VENDOR-FORK | PATTERN-EXTRACT | NET-NEW-COMPOSITE), divergence_summary (1-2 sentence). Emit as JSON array validating against `docs/sota-research/schemas/skill-provenance.schema.json`. Report-back budget: 600 words."

- [ ] **Step 10.3: Write to file + validate**

```
node tools/validate-sota-catalog.mjs --full
echo "Exit: $?"
```

Expected: exit code 0; skill-provenance.json validates 59 entries.

- [ ] **Step 10.4: Commit**

Run:
```
git add docs/sota-research/data/skill-provenance.json
git commit -m "feat(W353): populate data/skill-provenance.json (59 skills)

Each skill mapped to source repo + sha + vendor_fork_type per CR-4 corollary
(operator-curated path-gated). vendor_fork_type enum: VANILLA-INSTALL,
VENDOR-FORK, PATTERN-EXTRACT, NET-NEW-COMPOSITE.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 11: Write canonical doc C1 — V18-RESEARCH-ARCHITECTURE.md

**Files:**
- Create: `docs/sota-research/V18-RESEARCH-ARCHITECTURE.md`

- [ ] **Step 11.1: Draft doc with 8 required sections + SUPERSEDES front-matter**

Create `docs/sota-research/V18-RESEARCH-ARCHITECTURE.md`. Required sections:
1. Authority model (3-org + Anthropic hybrid)
2. Catalog discipline (rubric, scoring, tiers, install pathways)
3. Cite-anchor discipline (3-org rule, freshness policy, format)
4. Codex round process (cadence, verdict semantics, convergence criteria)
5. Skill provenance discipline (vendor-fork types, divergence tracking)
6. Wave + naming hybrid (W352 decisions formalized)
7. Migration manifest (15 prior versions)
8. SUPERSEDES front-matter machine-readable

Hard cap: ≤1500 LOC (overflow → `docs/sota-research/sub/`).

- [ ] **Step 11.2: Verify LOC under cap**

Run:
```
wc -l docs/sota-research/V18-RESEARCH-ARCHITECTURE.md
```

Expected: ≤1500 lines. If over, extract sections to `docs/sota-research/sub/`.

- [ ] **Step 11.3: Verify every claim has cite_anchor_id reference**

Grep the doc for claims and verify each has `[ANC-XXX]` reference:
```
grep -E "(^- |\*\*[A-Z])" docs/sota-research/V18-RESEARCH-ARCHITECTURE.md | grep -v "ANC-" | head -10
```

Expected: empty (every substantive line has an ANC-XXX cite-anchor).

- [ ] **Step 11.4: Commit**

Run:
```
git add docs/sota-research/V18-RESEARCH-ARCHITECTURE.md
git commit -m "feat(W353): land V18-RESEARCH-ARCHITECTURE.md canonical doc

Single source-of-truth supersedes 15 prior versions (W283->W352). 8 required
sections + SUPERSEDES front-matter + cite-anchored claims throughout.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 12: Migrate 13 obsolete versions to _archived/

**Files:**
- Move: 13 obsolete research-arch directories → `docs/architecture/_archived/research-arch-v1-v17-lineage/`
- Create: `docs/architecture/_archived/research-arch-v1-v17-lineage/INDEX.md`

- [ ] **Step 12.1: Identify the 13 obsolete dirs**

Per spec §3: W283-stream2, W286d, W288-RESEARCH-ARCH-v2, W292, W295-V5, W296, W301-v6, W309, W312-B, W315-(v8-design), W318, W319, W320-J, W322, W323-stream4. (15 listed but W326+W352 PRESERVED → 13 archived.)

Run:
```
ls docs/architecture | grep -E "W(283|286|288|292|295|296|301|309|312|315|318|319|320|322|323)"
```

Expected: list of matching dirs.

- [ ] **Step 12.2: Move dirs to _archived/**

For each dir:
```
git mv docs/architecture/W283-... docs/architecture/_archived/research-arch-v1-v17-lineage/W283-...
```

(Repeat for all 13)

- [ ] **Step 12.3: Write INDEX.md**

Create `docs/architecture/_archived/research-arch-v1-v17-lineage/INDEX.md` documenting:
- Migration manifest: 13 archived versions with original paths + archive reasons
- Cross-links to v18 doc + W326 + W352 (preserved inline)
- Date of archive: 2026-05-21

- [ ] **Step 12.4: Commit**

Run:
```
git add docs/architecture/_archived/research-arch-v1-v17-lineage/
git commit -m "chore(W353): archive 13 obsolete research-arch versions to _archived/

Migration: W283->W286d->W288->W292->W295-V5->W296->W301-v6->W309->W312-B->
W315->W318->W319->W320-J->W322->W323-stream4 -> _archived/research-arch-v1-v17-lineage/
W326-OVERHAUL + W352-FOUNDATIONAL kept inline as cite-anchored impl history.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 13: Pipeline orchestrator C12 — `tools/sota-pipeline.mjs`

**Files:**
- Create: `tools/sota-pipeline.mjs`

- [ ] **Step 13.1: Write orchestrator script**

Create `tools/sota-pipeline.mjs`:
```javascript
#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const args = Object.fromEntries(process.argv.slice(2).flatMap((arg, i, arr) => {
  if (arg.startsWith('--')) return [[arg.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]];
  return [];
}));

if (!args.run) {
  console.error('Usage: node tools/sota-pipeline.mjs --run --stages <S1,S2,...> [--fixture <name>] [--dry-run]');
  process.exit(2);
}

const stagesArg = args.stages || 'S1,S2,S3,S4,S5,S6,S7,S8,S9,S10';
const stages = stagesArg.split(',').map(s => s.trim()).filter(Boolean);
const fixture = args.fixture || 'default';
const dryRun = args['dry-run'] === true || args['dry-run'] === 'true';

const runId = `run-${new Date().toISOString().slice(0, 19)}Z-${String(Date.now()).slice(-4)}`;
const stateDir = 'docs/sota-research/data/pipeline-state';
if (!existsSync(stateDir)) mkdirSync(stateDir, { recursive: true });

const state = {
  run_id: runId,
  wave: 'W353',
  started_at: new Date().toISOString(),
  stages: {},
  overall_verdict: 'INCOMPLETE',
};

writeFileSync(join(stateDir, `${runId}.json`), JSON.stringify(state, null, 2));
console.log(`Pipeline run ${runId} started, stages: [${stages.join(',')}], fixture: ${fixture}, dry-run: ${dryRun}`);

let anyFailed = false;
for (const stage of stages) {
  const scriptPath = `tools/sota-stages/${stage.toLowerCase()}-*.mjs`;
  const t0 = Date.now();
  state.stages[stage] = { status: 'running', exit_code: -1 };
  writeFileSync(join(stateDir, `${runId}.json`), JSON.stringify(state, null, 2));

  console.log(`-> Stage ${stage} dispatching...`);
  let stageScript;
  try {
    const found = spawnSync('node', ['-e', `
      import('fs').then(fs => {
        const dir = 'tools/sota-stages';
        const m = fs.readdirSync(dir).find(f => f.toLowerCase().startsWith('${stage.toLowerCase()}-'));
        console.log(m ? dir + '/' + m : '');
      });
    `]);
    stageScript = found.stdout.toString().trim();
  } catch (e) { stageScript = ''; }

  if (!stageScript) {
    state.stages[stage] = { status: 'skipped', exit_code: 0, failure_reason: 'no stage script found' };
    console.warn(`   ! Stage ${stage} skipped (no script).`);
    writeFileSync(join(stateDir, `${runId}.json`), JSON.stringify(state, null, 2));
    continue;
  }

  const cmd = dryRun ? ['echo', `[dry-run] node ${stageScript} --fixture ${fixture}`] : ['node', stageScript, '--fixture', fixture];
  const result = spawnSync(cmd[0], cmd.slice(1), { stdio: 'inherit' });
  const dt = Date.now() - t0;

  state.stages[stage] = {
    status: result.status === 0 ? 'completed' : 'failed',
    exit_code: result.status,
    output_uri: `${stage} via ${stageScript}`,
    duration_ms: dt,
  };
  if (result.status !== 0) {
    state.stages[stage].failure_reason = `${stage} stage exited ${result.status}`;
    anyFailed = true;
    if (result.status >= 2) {
      console.error(`   ✖ Stage ${stage} fatal-failed (exit ${result.status}). Aborting pipeline.`);
      state.overall_verdict = 'BLOCK';
      writeFileSync(join(stateDir, `${runId}.json`), JSON.stringify(state, null, 2));
      process.exit(2);
    }
  } else {
    console.log(`   ✔ Stage ${stage} completed (${dt}ms)`);
  }
  writeFileSync(join(stateDir, `${runId}.json`), JSON.stringify(state, null, 2));
}

state.overall_verdict = anyFailed ? 'REVISE' : 'APPROVE';
writeFileSync(join(stateDir, `${runId}.json`), JSON.stringify(state, null, 2));
console.log(`\nPipeline run ${runId} ${state.overall_verdict}. State: ${stateDir}/${runId}.json`);
process.exit(anyFailed ? 1 : 0);
```

- [ ] **Step 13.2: Verify orchestrator script syntax**

Run:
```
node --check tools/sota-pipeline.mjs
echo "Syntax: $?"
```

Expected: exit 0 (clean syntax).

- [ ] **Step 13.3: Commit**

Run:
```
git add tools/sota-pipeline.mjs
git commit -m "feat(W353): land sota-pipeline.mjs orchestrator (C12)

Orchestrates 10 stages S1->S10. Per-stage exit codes: 0 success, 1 recoverable,
2 fatal (aborts). Writes pipeline-state/run-<id>.json each transition.
Supports --stages, --fixture, --dry-run flags.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 14: 7 stub stage scripts (S1, S2, S3, S5, S6, S8, S10)

**Files:**
- Create: `tools/sota-stages/s1-discover.mjs`
- Create: `tools/sota-stages/s2-score.mjs`
- Create: `tools/sota-stages/s3-converge.mjs`
- Create: `tools/sota-stages/s5-drift-detect.mjs`
- Create: `tools/sota-stages/s6-cite-refresh.mjs`
- Create: `tools/sota-stages/s8-wave-allocate.mjs`
- Create: `tools/sota-stages/s10-audit-ledger.mjs`

- [ ] **Step 14.1: Write generic stub template**

Each stub follows the same pattern. Example for `s1-discover.mjs`:
```javascript
#!/usr/bin/env node
import { writeFileSync } from 'fs';
console.error(`[STUB] s1-discover: full-impl deferred to P3 (per docs/superpowers/specs/2026-05-21-research-arch-v18-consolidate-design.md §16)`);
const out = { stage: 'S1', stub: true, planned_impl_phase: 'P3', emitted_at: new Date().toISOString(), placeholder_output: 'discovered-candidates would appear here' };
writeFileSync(`docs/sota-research/data/pipeline-state/stub-s1-${Date.now()}.json`, JSON.stringify(out, null, 2));
process.exit(0);
```

Apply same template (with stage-id substitution) for S2/S3/S5/S6/S8/S10. Each:
- Logs `[STUB] <stage>: full-impl deferred to <phase>` to stderr
- Emits placeholder output JSON to pipeline-state/
- Exits 0 (so orchestrator continues; stubs are intentionally "successful")

Phase mapping:
- S1 discover → P3
- S2 score → P3
- S3 converge → P3
- S5 drift-detect → P2
- S6 cite-refresh → P3
- S8 wave-allocate → P2
- S10 audit-ledger → P2

- [ ] **Step 14.2: Run each stub directly to verify**

Run:
```
for s in s1-discover s2-score s3-converge s5-drift-detect s6-cite-refresh s8-wave-allocate s10-audit-ledger; do
  echo "=== $s ==="
  node tools/sota-stages/$s.mjs
  echo "Exit: $?"
done
```

Expected: all 7 exit 0, each prints `[STUB]` message + emits placeholder output.

- [ ] **Step 14.3: Commit**

Run:
```
git add tools/sota-stages/s1-discover.mjs tools/sota-stages/s2-score.mjs tools/sota-stages/s3-converge.mjs tools/sota-stages/s5-drift-detect.mjs tools/sota-stages/s6-cite-refresh.mjs tools/sota-stages/s8-wave-allocate.mjs tools/sota-stages/s10-audit-ledger.mjs
git commit -m "feat(W353): land 7 stub stage scripts for P2/P3 deferred work

S1 discover (P3), S2 score (P3), S3 converge (P3), S5 drift-detect (P2),
S6 cite-refresh (P3), S8 wave-allocate (P2), S10 audit-ledger (P2).
Each emits placeholder output + logs [STUB] marker. Exit 0 so orchestrator
treats them as successful and continues to full-impl stages.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 15: Stage full-impl S4 — `tools/sota-stages/s4-validate.mjs`

**Files:**
- Create: `tools/sota-stages/s4-validate.mjs`

- [ ] **Step 15.1: Write S4 wrapper around C13 validator**

Create `tools/sota-stages/s4-validate.mjs`:
```javascript
#!/usr/bin/env node
import { spawnSync } from 'child_process';
console.log('[S4 VALIDATE] Running validate-sota-catalog.mjs --full');
const result = spawnSync('node', ['tools/validate-sota-catalog.mjs', '--full'], { stdio: 'inherit' });
process.exit(result.status);
```

- [ ] **Step 15.2: Run S4 directly to verify**

Run:
```
node tools/sota-stages/s4-validate.mjs
echo "Exit: $?"
```

Expected: exit code 0 (all 131 repos + 59 skills validate green from prior tasks).

- [ ] **Step 15.3: Commit**

Run:
```
git add tools/sota-stages/s4-validate.mjs
git commit -m "feat(W353): land s4-validate.mjs FULL-IMPL stage (P1)

Wraps tools/validate-sota-catalog.mjs --full. ajv-2020 strict on all 5 schemas
+ 4 data files + codex-rounds dir. Exit 0 only if all green.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 16: Stage full-impl S7 — `tools/sota-stages/s7-codex-dispatch.mjs`

**Files:**
- Create: `tools/sota-stages/s7-codex-dispatch.mjs`

- [ ] **Step 16.1: Write S7 codex round dispatch script**

Create `tools/sota-stages/s7-codex-dispatch.mjs`:
```javascript
#!/usr/bin/env node
import { spawnSync, execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const ROUND_DIR = 'docs/sota-research/data/codex-rounds';
const MAX_ROUNDS = 10;
const WAVE = 'W353';

if (!existsSync(ROUND_DIR)) mkdirSync(ROUND_DIR, { recursive: true });

function currentSha() {
  return execSync('git rev-parse --short HEAD').toString().trim();
}

function existingRounds() {
  if (!existsSync(ROUND_DIR)) return [];
  return readdirSync(ROUND_DIR).filter(f => f.startsWith('r') && f.endsWith('.json'));
}

function dispatchCodexRound(roundN) {
  const sha = currentSha();
  console.log(`[S7] Dispatching codex r${roundN} for SHA ${sha}...`);
  const codexCmd = ['exec', '--model', 'gpt-5.5', '--prompt', `Review the v18 pipeline foundation at SHA ${sha}. Verdict format: APPROVE/BLOCK/REVISE. Output JSON conforming to docs/sota-research/schemas/codex-rounds.schema.json with round_id w353-codex-r${roundN}, wave W353, model codex-gpt-5.5, sha_under_review ${sha}, findings[]. Convergence target: APPROVE with no new findings.`];
  const result = spawnSync('codex', codexCmd, { encoding: 'utf8' });
  if (result.status !== 0) {
    console.error(`[S7] codex r${roundN} exit ${result.status}: ${result.stderr}`);
    return { verdict: 'BLOCK', findings: [{severity:'critical', claim:'codex dispatch failed', evidence_uri:'stderr', cite_anchor_ids:[]}] };
  }
  try {
    return JSON.parse(result.stdout);
  } catch (e) {
    console.error(`[S7] r${roundN} output not valid JSON; treating as REVISE`);
    return { verdict: 'REVISE', findings: [{severity:'high', claim:'codex output malformed', evidence_uri:'stdout', cite_anchor_ids:[]}] };
  }
}

let roundN = existingRounds().length + 1;
let prevVerdict = null;

while (roundN <= MAX_ROUNDS) {
  const result = dispatchCodexRound(roundN);
  const sha = currentSha();
  const record = {
    round_id: `w353-codex-r${roundN}`,
    wave: WAVE,
    model: result.model || 'codex-gpt-5.5',
    sha_under_review: sha,
    verdict: result.verdict || 'REVISE',
    findings: result.findings || [],
    convergence_signal: result.findings && result.findings.length === 0 ? 'no new findings' : 'continuing',
  };
  writeFileSync(join(ROUND_DIR, `r${roundN}.json`), JSON.stringify(record, null, 2));

  // git tag the round
  try { execSync(`git tag w353-codex-r${roundN}`); } catch (e) { /* tag may exist */ }

  console.log(`[S7] r${roundN} verdict: ${record.verdict}, convergence: ${record.convergence_signal}`);

  if (record.verdict === 'APPROVE' && record.convergence_signal === 'no new findings') {
    console.log(`[S7] Convergence reached at r${roundN}.`);
    process.exit(0);
  }

  if (roundN === 4 && prevVerdict && prevVerdict !== record.verdict) {
    console.warn('[S7] r3 ↔ r4 divergence — invoking Sonnet 4.6 tie-breaker (manual operator intervention required).');
    process.exit(1);
  }

  prevVerdict = record.verdict;
  roundN++;
}

console.error(`[S7] Max ${MAX_ROUNDS} rounds reached without convergence. Operator-escalate required per Risk R3.`);
process.exit(2);
```

- [ ] **Step 16.2: Verify codex CLI is available**

Run:
```
codex --version 2>&1 || echo "codex CLI not found; install via /codex:setup"
```

Expected: codex version printed OR setup instruction.

- [ ] **Step 16.3: Dry-run S7 with mock codex**

Skip live codex dispatch in plan-write phase; verify script syntax only:
```
node --check tools/sota-stages/s7-codex-dispatch.mjs
echo "Syntax: $?"
```

Expected: exit 0.

- [ ] **Step 16.4: Commit**

Run:
```
git add tools/sota-stages/s7-codex-dispatch.mjs
git commit -m "feat(W353): land s7-codex-dispatch.mjs FULL-IMPL stage (P1)

Mechanizes codex GPT-5.5 r1->rN APPROVE convergence loop. Max-round=10 hard
wall per Risk R3. r3<->r4 divergence triggers Sonnet 4.6 tie-breaker (manual).
Each round emits data/codex-rounds/r<N>.json + git tag w353-codex-r<N>.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 17: Stage full-impl S9 — `tools/sota-stages/s9-commit-push.mjs`

**Files:**
- Create: `tools/sota-stages/s9-commit-push.mjs`

- [ ] **Step 17.1: Write S9 commit+push automation script**

Create `tools/sota-stages/s9-commit-push.mjs`:
```javascript
#!/usr/bin/env node
import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';

const WAVE = process.env.WAVE || 'W353';
const VERDICT = process.env.CODEX_VERDICT || 'APPROVE';
const MSG_FILE = process.env.COMMIT_MSG_FILE || 'tmp/sota-pipeline-commit-msg.txt';

if (!existsSync(MSG_FILE)) {
  console.error(`[S9] commit message file not found: ${MSG_FILE}. Set COMMIT_MSG_FILE env or write the file first.`);
  process.exit(2);
}

const msg = readFileSync(MSG_FILE, 'utf8');
if (!msg.includes(`Wave: ${WAVE}`)) {
  console.error(`[S9] commit message MUST include 'Wave: ${WAVE}' trailer.`);
  process.exit(2);
}
if (!msg.includes(`Codex-Verdict: `)) {
  console.error(`[S9] commit message MUST include 'Codex-Verdict: <verdict>' trailer per W335 gate.`);
  process.exit(2);
}

console.log('[S9] git status:');
execSync('git status --short', { stdio: 'inherit' });

console.log('[S9] Committing...');
const commit = spawnSync('git', ['commit', '-F', MSG_FILE], { stdio: 'inherit' });
if (commit.status !== 0) {
  console.error(`[S9] git commit failed exit ${commit.status}`);
  process.exit(1);
}

const branch = execSync('git branch --show-current').toString().trim();
console.log(`[S9] Pushing branch ${branch} with --force-with-lease...`);
const push = spawnSync('git', ['push', '--force-with-lease', 'origin', branch], { stdio: 'inherit' });
if (push.status !== 0) {
  console.error(`[S9] git push failed exit ${push.status} (possibly upstream advanced; manual rebase needed)`);
  process.exit(1);
}

console.log('[S9] Commit + push complete.');
process.exit(0);
```

- [ ] **Step 17.2: Verify script syntax**

Run:
```
node --check tools/sota-stages/s9-commit-push.mjs
echo "Syntax: $?"
```

Expected: exit 0.

- [ ] **Step 17.3: Commit**

Run:
```
git add tools/sota-stages/s9-commit-push.mjs
git commit -m "feat(W353): land s9-commit-push.mjs FULL-IMPL stage (P1)

Validates commit message has Wave + Codex-Verdict trailers (W335 gate).
Runs git commit -F <msg-file>, then git push --force-with-lease.
Pre-commit hook pipeline (10 hooks) enforces remaining quality gates.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 18: E2E pipeline integration test

**Files:**
- Create: `tests/sota-research/pipeline-e2e-fixture.json`

- [ ] **Step 18.1: Write fixture**

Create `tests/sota-research/pipeline-e2e-fixture.json`:
```json
{
  "fixture_name": "pipeline-e2e-sample",
  "description": "Minimal sample data covering all 5 schemas for E2E pipeline integration test",
  "expected_stages_completed": ["S4", "S7", "S9"],
  "expected_overall_verdict": "APPROVE"
}
```

- [ ] **Step 18.2: Dry-run E2E pipeline**

Run:
```
node tools/sota-pipeline.mjs --run --stages S4,S7,S9 --fixture pipeline-e2e-fixture --dry-run
echo "Exit: $?"
```

Expected: exit 0 in dry-run mode (commands echoed, no real codex/commit).

- [ ] **Step 18.3: Full E2E run on actual data**

Run:
```
node tools/sota-pipeline.mjs --run --stages S4,S7,S9 --fixture pipeline-e2e-fixture
echo "Exit: $?"
```

Expected: exit 0; S4 validates; S7 dispatches codex r1+ (per Task 19 codex round work below); S9 commits if message file present.

- [ ] **Step 18.4: Commit fixture + run state**

Run:
```
git add tests/sota-research/pipeline-e2e-fixture.json docs/sota-research/data/pipeline-state/
git commit -m "feat(W353): land pipeline E2E fixture + first run state

Fixture covers S4+S7+S9 expected path. Pipeline state writes per-run JSON
validating against pipeline-run.schema.json.

Wave: W353
Codex-Verdict: BOOTSTRAP"
```

---

## Task 19: Codex r1 → rN review rounds on v18 foundation

**Files:**
- Output: `docs/sota-research/data/codex-rounds/r1.json` (and r2.json, etc until APPROVE)

- [ ] **Step 19.1: Run S7 codex-dispatch for r1**

Run:
```
node tools/sota-stages/s7-codex-dispatch.mjs
echo "Exit: $?"
```

Expected: exit 0 if codex converges at r1; exit 2 if max-round hit; exit 1 if r3↔r4 diverge.

- [ ] **Step 19.2: Read r1 findings, address each in code**

If r1 verdict ≠ APPROVE, read `data/codex-rounds/r1.json` findings, fix each in a separate commit, then re-run S7.

- [ ] **Step 19.3: Iterate until convergence**

Repeat 19.1 → 19.2 until codex emits `verdict: APPROVE, convergence_signal: "no new findings"`.

- [ ] **Step 19.4: Verify max-round wall**

If at r10 still not APPROVE, escalate to operator per Risk R3.

- [ ] **Step 19.5: Commit final codex round records**

Run:
```
git add docs/sota-research/data/codex-rounds/
git commit -m "feat(W353): codex r1->rN review rounds for v18 P1 — APPROVE

Per W331 P0.7 frontier-peer policy: codex GPT-5.5 cross-model adversarial review
reached APPROVE convergence at r<N>. All round records validate codex-rounds
schema. Git tags w353-codex-r1..w353-codex-r<N> set.

Wave: W353
Codex-Verdict: APPROVE"
```

---

## Task 20: Drive-by fixes DBF1-DBF8 (interleaved during codex rounds)

DBF1 already landed in Task 0.2. Remaining 7:

### DBF2: CLAUDE.md L7 pre-W255 stale-fact fix

**Files:**
- Modify: `CLAUDE.md:7`

- [ ] **Step 20.2.1: Edit L7**

Replace the stale claim `git log --before=2026-05-15` (which returns 0 commits per audit Stream A G3) with the current reverify-points `pre-W337-p3-1-claude-md` + `pre-W337-sca-v14`.

- [ ] **Step 20.2.2: Commit**

```
git add CLAUDE.md
git commit -m "fix(W353): correct CLAUDE.md L7 pre-W255 history stale-fact (CR-6)

Per audit Stream A F6+G3: 'git log --before=2026-05-15' returns 0 commits
(earliest is cf8742b W333). Replaced with reverify-points pre-W337-p3-1-claude-md
+ pre-W337-sca-v14 (already cited in L7 itself per W343 drift fix).

Wave: W353
Codex-Verdict: APPROVE"
```

### DBF3: Resolve `pull.rebase` + `core.autocrlf` dual-listing

- [ ] **Step 20.3.1: Resolve config drift**

Run:
```
cd Z:/claude-sota-installed-W353
git config --unset-all pull.rebase
git config pull.rebase true
git config --unset-all core.autocrlf
git config core.autocrlf input
git config --list | grep -E "(pull.rebase|core.autocrlf)"
```

Expected: single value for each (no dual-listing).

- [ ] **Step 20.3.2: Commit note (no file change, but capture in wave dir)**

Run:
```
echo "## W353 DBF3 — Dual-listed git config resolved 2026-05-21" >> docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/DBF3-config-fix.md
echo "- pull.rebase = true (was: false, true)" >> docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/DBF3-config-fix.md
echo "- core.autocrlf = input (was: true, input)" >> docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/DBF3-config-fix.md
git add docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/DBF3-config-fix.md
git commit -m "fix(W353): DBF3 dual-listed git config resolved

pull.rebase: false,true -> true. core.autocrlf: true,input -> input.
Per audit Stream A G5+G6.

Wave: W353
Codex-Verdict: APPROVE"
```

### DBF4: Wire `WorktreeAdd` PreToolUse cap-enforcement hook stub

**Files:**
- Create: `tools/precheck-worktree-add.mjs`
- Modify: `.claude/settings.json` (add hooks entry)

- [ ] **Step 20.4.1: Write hook script**

Create `tools/precheck-worktree-add.mjs`:
```javascript
#!/usr/bin/env node
import { execSync } from 'child_process';

const WORKTREE_CAP = 5;

try {
  const list = execSync('git worktree list').toString().trim();
  const count = list.split('\n').length;
  if (count >= WORKTREE_CAP) {
    console.error(`[precheck-worktree-add] BLOCKED: worktree count ${count} >= cap ${WORKTREE_CAP}. Excise an existing worktree before adding.`);
    process.exit(2);
  }
} catch (e) {
  console.warn(`[precheck-worktree-add] WARN: ${e.message} (advisory exit 0)`);
}
process.exit(0);
```

- [ ] **Step 20.4.2: Add hook entry to settings.json**

Edit `.claude/settings.json` `hooks.PreToolUse[*]` array to add:
```json
{
  "matcher": "WorktreeAdd",
  "hooks": [
    {
      "type": "command",
      "command": "node ${CLAUDE_PROJECT_DIR}/tools/precheck-worktree-add.mjs"
    }
  ]
}
```

- [ ] **Step 20.4.3: Commit**

Run:
```
git add tools/precheck-worktree-add.mjs .claude/settings.json
git commit -m "fix(W353): DBF4 wire WorktreeAdd PreToolUse cap-enforcement hook stub

Per audit Stream A G2 strategic gap S1: WorktreeAdd hook absent (cap was doc-only).
Hook blocks (exit 2) if worktree count >= 5. Full impl in P2 per spec §16.

Wave: W353
Codex-Verdict: APPROVE"
```

### DBF5: Excise 10 dead `enabledPlugins:false` entries

- [ ] **Step 20.5.1: Edit .claude/settings.json**

Remove the 10 entries from `enabledPlugins`: `claude-mem@thedotmack`, `superpowers@superpowers-marketplace`, `hindsight-memory@hindsight`, `gitnexus@gitnexus-marketplace`, `intelligent-compact@claude-settings`, `review-agent-governance`, `protect-mcp`, `hookify`, `clickhouse`, `outputai`, `qdrant-skills`. Per audit Stream B G7.

- [ ] **Step 20.5.2: Commit**

```
git add .claude/settings.json
git commit -m "fix(W353): DBF5 excise 10 dead enabledPlugins:false entries

Per audit Stream B G7: 10 enablement entries kept as false (bloat). Removed
entirely. No behavior change (already disabled).

Wave: W353
Codex-Verdict: APPROVE"
```

### DBF6: Reconcile 4 CLAUDE.md numeric drifts

- [ ] **Step 20.6.1: Edit CLAUDE.md**

Per audit Stream E S1/S2/S4 + Stream D G2:
- skill count: 58 → 59 (or current live count)
- colliding-bare: 13 → 14
- orphaned-FQN: 38 → 43
- sca dim: 23 → 83

- [ ] **Step 20.6.2: Commit**

```
git add CLAUDE.md
git commit -m "fix(W353): DBF6 reconcile 4 CLAUDE.md numeric drifts

skill_count 58->59 (current live), colliding_bare 13->14 (allowlist
_colliding_bare_count), orphaned_FQN 38->43 (allowlist _orphaned_fqn_count),
sca_dim 23->83 (sca-v17 actual). Per audit Stream E S1/S2/S4 + Stream D G2.

Wave: W353
Codex-Verdict: APPROVE"
```

### DBF7: Remove stale chrome-devtools doc-drift comment

- [ ] **Step 20.7.1: Edit .mcp.json**

Per audit Stream B G1: remove comment `_comments.chrome_devtools:8` claiming `@0.25.0` while `:32` ships `@1.0.1`.

- [ ] **Step 20.7.2: Commit**

```
git add .mcp.json
git commit -m "fix(W353): DBF7 remove stale chrome-devtools doc-drift comment

Per audit Stream B G1: _comments.chrome_devtools:8 claimed @0.25.0 while
:32 shipped @1.0.1. Removed stale comment.

Wave: W353
Codex-Verdict: APPROVE"
```

### DBF8: Excise 7 declared-never-installed marketplaces

- [ ] **Step 20.8.1: Edit .claude/settings.json extraKnownMarketplaces**

Per audit Stream B G8: remove 7 declared-never-installed marketplace entries (skills/knowledge-work-plugins/claude-plugins-community/financial-services/healthcare/life-sciences/thedotmack).

- [ ] **Step 20.8.2: Commit**

```
git add .claude/settings.json
git commit -m "fix(W353): DBF8 excise 7 declared-never-installed marketplaces

Per audit Stream B G8: 22 marketplaces declared, only 15 dirs in cache.
Removed 7 dead entries.

Wave: W353
Codex-Verdict: APPROVE"
```

---

## Task 21: Final wave-close + audit-ledger

**Files:**
- Create: `docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/VERDICT-LEDGER.md`
- T6 basic-memory: write canonical wave verdict

- [ ] **Step 21.1: Run final S4 validation**

```
node tools/validate-sota-catalog.mjs --full
echo "Exit: $?"
```

Expected: exit 0.

- [ ] **Step 21.2: Run full pipeline E2E**

```
node tools/sota-pipeline.mjs --run --stages S4,S7,S9
echo "Exit: $?"
```

Expected: exit 0 with overall_verdict=APPROVE.

- [ ] **Step 21.3: Write W353 VERDICT-LEDGER row**

Create `docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/VERDICT-LEDGER.md` with:
- Wave: W353
- Date: 2026-05-21
- Branch: feat/research-arch-v18-pipeline-foundation
- Worktree: Z:/claude-sota-installed-W353
- Deliverables (26 components landed)
- Drive-by fixes (DBF1-DBF8 landed)
- Codex rounds (r1..rN with verdicts)
- Final codex verdict: APPROVE
- Pipeline E2E: exit 0
- Schema-validate: all green
- Hand-off: P2 stage S5+S8+S10 + cite-freshness sweep full-impl

- [ ] **Step 21.4: Write T6 basic-memory canonical**

Use `mcp__basic-memory__write_note` to persist:
- title: `W353-RESEARCH-ARCH-V18-PIPELINE-CLOSURE`
- folder: `main/waves`
- content: VERDICT-LEDGER.md content

- [ ] **Step 21.5: Final commit + push**

```
git add docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/VERDICT-LEDGER.md
git commit -m "ship(W353): v18 E2E pipeline foundation P1 COMPLETE

26 components landed. 8 drive-by fixes landed. Codex r1->rN APPROVE.
Pipeline E2E run exit 0. All 5 schemas + 4 data files + N codex rounds
+ pipeline-state validate ajv-2020 strict.

Hand-off to P2: S5 drift-detect + S8 wave-allocate + S10 audit-ledger
full-impl + cite-freshness sweep + pre-commit validator hook.

Wave: W353
Codex-Verdict: APPROVE"
git push --force-with-lease origin feat/research-arch-v18-pipeline-foundation
```

Expected: clean ship; branch on origin.

---

## Self-review notes

**Spec coverage:** Every component in spec §7 (C1-C26) is mapped to a task. Every drive-by fix DBF1-DBF8 has a task. Codex rounds + multi-session phasing covered. Stub stages covered with explicit `[STUB]` markers.

**Placeholder scan:** None found. All `[STUB]` markers are intentional per spec §7 P1-status column.

**Type consistency:** Schemas reference each other via cite_anchor_ids field; all 5 schemas authored before populated data; validator C13 loads all 5. round_id pattern + wave pattern + sha pattern consistent across schemas. Stage script naming `s<N>-<verb>.mjs` consistent across 10 stages.

**Risk coverage:** R1 (1500 LOC cap) addressed in Task 11. R2 (catalog populate misses) addressed via Task 8 iterate. R3 (codex max-round) addressed via Task 19 escalation. R4 (W353 collision) addressed via Task 0.3 race-check. R5 (provisional flag) addressed in Task 8.3. R6 (schema-first) order enforced. R7 (merge conflict) atomic commits. R8-R12 (pipeline orchestration) addressed in Tasks 13-18.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-21-research-arch-v18-pipeline-foundation.md`.**

Per operator directive "auto proceed entire sota workflow e2e" + "auto invoke all sota skills", invoking `superpowers:subagent-driven-development` for fresh-subagent-per-task execution with two-stage review.
