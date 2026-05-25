
## Wave 153 Fire 9 — Minimal disabled-plugin cite-pointer (V3 ADVERSARIAL SCOPE-DOWN; per V3-F8 #4 prescription review)

**Date**: 2026-05-11
**Cron iteration**: `9eb2e02a` 9/N
**Class**: META-process audit + minimal cite-pointer (NO new standalone index file per V3 ADVERSARIAL scope-down)
**Risk class**: LOW (doc-only append; reversible via git revert)

### V2+V3 Path P dispatch

| Voice | bg task | Wall-clock | Tokens | Exit | Verdict | Confidence |
|---|---|---|---|---|---|---|
| V2 design proposer | `b8bbz2v5q` | ~80s | 108,773 | 0 | APPROVE-DESIGN (155-LOC full MD-table) | 0.91 |
| V3 ADVERSARIAL | `bhiboivh5` | ~110s | 110,596 | 0 | F9-SCOPED-DOWN (5-10 line cite-pointer) | 0.86 |

Both via Path P 6-param strict-conform (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + 300s timeout + foreground+tee + JSON-strict EOF schema).

### Convergence consensus

**ACTION**: V3 SCOPE-DOWN-TO-MINIMAL wins per FM-09 base rate (V3 ADVERSARIAL catches V2-missed dimensions). Minimal cite-pointer below preserves disabled-plugin discovery without creating new standalone index file.

**RECURSIVE FM-09 CATCH**: V3 F9 caught V3-F8's OWN prescription #4 ("add disabled-plugin cite/discovery index") as overclaimed — "V3 F8 jumped from 'preserve searchable cite corpus' to 'add cite/discovery index' when filesystem rg + Read already cover the actual discovery problem". **FM-09 ladder: 19/19 → 20/20 firm** (10th consecutive arc).

---

### Disabled-plugin discovery — minimal cite-pointer

**WARNING**: The 4 plugins below are DISABLED in `.claude/settings.json:527-530` — they are NOT runtime-loaded. Their cached SKILL.md/README files are CITE-ONLY discovery material. DO NOT call /maker-setup, do NOT assume Output.ai hooks fire, do NOT use ClickHouse Cloud MCP without first re-enabling per the trigger.

**Disabled plugins (W153 F7 commit `e191378`)**:

| Plugin | Cache path | Skill count | Disposition | Re-enable trigger |
|---|---|---|---|---|
| clickhouse@claude-plugins-official | `.claude/plugins/cache/claude-plugins-official/clickhouse/1.0.0/` | 2 SKILL.md + `.mcp.json` (clickhouse.cloud remote MCP) | PARTIAL-OVERLAP CONFIG-PRUNE | Named ClickHouse Cloud analytics workflow + OAuth owner exists (e.g., JSONL→ClickHouse provenance analytics) |
| outputai@claude-plugins-official | `.claude/plugins/cache/claude-plugins-official/outputai/0.2.1/` | 47 SKILL.md + SessionStart hook (`hooks/hooks.json`) | ACTIVE-HOOK/FRAMEWORK-CONTEXT (V3 NEW candidate class n=1) | Operator commits named Output.ai TypeScript workflow app with input path/wiring path/success criterion |
| qdrant-skills@claude-plugins-official | `.claude/plugins/cache/claude-plugins-official/qdrant-skills/1.0.0/` | 26 SKILL.md (vector-search architecture guidance) | PARTIAL-OVERLAP CONFIG-PRUNE | Qdrant L2 promoted from staged/deferred to active MCP-backed runtime work |
| cwc-makers@claude-plugins-official | `.claude/plugins/cache/claude-plugins-official/cwc-makers/1.0.0/` | 2 SKILL.md + `/maker-setup` command + `m5-onboard` skill | GENUINELY-NEW-BUT-DEMAND-ABSENCE (V2 NEW candidate class n=1) | Cardputer hardware attached OR portable-display workflow active |

**Discovery `rg` recipe** (replaces standalone index per V3 SCOPE-DOWN):

```bash
# Search ALL disabled-plugin SKILL.md + README + hooks/MCP material:
rg --no-heading -t md "<query>" \
  .claude/plugins/cache/claude-plugins-official/clickhouse/*/ \
  .claude/plugins/cache/claude-plugins-official/outputai/*/ \
  .claude/plugins/cache/claude-plugins-official/qdrant-skills/*/ \
  .claude/plugins/cache/claude-plugins-official/cwc-makers/*/

# Or grep across all 77 SKILL.md descriptions:
find .claude/plugins/cache/claude-plugins-official/{clickhouse,outputai,qdrant-skills,cwc-makers} \
  -name 'SKILL.md' -exec rg --no-heading -m1 "^description:" {} \;
```

**Authoritative current state**: read `.claude/plugins/installed_plugins.json` for installed_git_commit_sha + cache_path per plugin. Cache version may bump on plugin refresh — use glob `.claude/plugins/cache/claude-plugins-official/<plugin>/*/` rather than hardcoded version paths to avoid FM-20 path-drift cascade.

**Full SRA D1-D10 + regret-risk + FM-class details**: see `docs/wave153-f8-sra-d1d10-audit-2026-05-11.md`.

---

### V3 caught V3-F8 self-overclaim (RECURSIVE FM-09 catch)

V3 F8 prescription #4 said: "Add a disabled-plugin cite/discovery index so cached SKILL.md/README material remains searchable without enabling hooks/MCP/commands."

V3 F9 ADVERSARIAL caught V3-F8's own prescription as overclaimed:

> "V3 F8 correctly caught passive discovery loss, but jumped from 'preserve searchable cite corpus' to 'add disabled-plugin cite/discovery index'. Current evidence shows cache paths, installed metadata, direct grep, and F7/F8 docs already preserve discovery enough for targeted agents. The real gap is operator instruction, not corpus creation."

Resolution: F9 minimal cite-pointer above (this section) satisfies the actual discovery problem without creating new standalone index file per CR-5 bootstrap discipline.

### Ladders advance

- **FM-09 V3 ADVERSARIAL same-arc 100%**: 19/19 → **20/20 firm** (V3 caught V3-F8 self-overclaim; 10th consecutive arc)
- **Mia n=**: 333 → **334** (V3-F8 self-overclaim cross-fire catch)
- **Path P n=**: 38 → **40** (V2+V3 PARALLEL)
- **Pattern D n=**: 38 → **40**
- **CR-3 cross-model gate non-Phase-1-bootstrap**: 6 → **7** (W152 F29 + W153 F1+F2+F5+F7+F8+F9)
- **FM-20 path-drift cascade defense triggered** (V3 caught V3-F8 prescription drift)

### Verdict files persisted

- `.claude/state/codex_consult_w153_f9_disabled_cite_index_v2_OUT.txt` (V2 2868 LOC / 108,773 tok; APPROVE-DESIGN 0.91)
- `.claude/state/codex_consult_w153_f9_disabled_cite_index_v3_adversarial_OUT.txt` (V3 11,621 LOC / 110,596 tok; F9-SCOPED-DOWN 0.86)

### Files in commit

- `docs/wave153-f9-cite-pointer-minimal-2026-05-11.md` (NEW; ship doc with V2+V3 verdicts + convergence)
- `docs/install-provenance.md` (this F9 entry + minimal cite-pointer per V3 prescription)

### Cardinal-rule conformance

CR-1 ✓ TIER-1-DIRECT cite trail / CR-3 ✓ V2+V3 PARALLEL (7th non-Phase-1-bootstrap) / **CR-5 ✓ minimal cite-pointer APPENDS to existing bootstrap doc (install-provenance.md); NO new standalone index file per V3 SCOPE-DOWN** / CR-8 ✓ TIER-3-LOCAL-COMPOSITION + V3 ADVERSARIAL SOTA-pattern adapter discipline / CR-9 LOW risk / CR-10 ✓ research-first / CR-11 ✓ META-process (recursive FM-09 catch on V3-F8 own prescription) / CR-12 ✓ PARTIAL-OVERLAP per V3

### FM defense

FM-02 (b)+(c) ✓ atomic narrow `--only` via ship script wrapper / **FM-09 V3 ADVERSARIAL 19/19 → 20/20 firm (RECURSIVE catch of V3-F8 own prescription)** / FM-15 ✓ / FM-17.f orchestrator-direct V2+V3 ✓ / FM-21.a CronCreate defense ✓ / FM-21.b STATE PROBE ✓ / **FM-20 path-drift cascade defense** TRIGGERED (V3 caught V3-F8 cross-fire prescription drift)

### Revert path

`git revert <commit-sha>` <30s. settings.json + cache unchanged from F7. No state mutation.

---
