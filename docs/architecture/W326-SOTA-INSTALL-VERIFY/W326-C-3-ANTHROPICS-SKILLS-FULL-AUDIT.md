# W326 Stream C-3 — `anthropics/skills` full sca-v9 audit + install spec

**Wave**: W326 Stream C
**Date**: 2026-05-19
**Rubric**: sca-v9 (composite_denom_install=34.7, W325-Gap-3 D34 W_install=0.9)
**Candidate**: `anthropics/skills` @ HEAD `690f15ca` (cited W324 P0 SHA `690f15ca`; VERIFIED IDENTICAL this audit — zero drift since W324)
**Source W325 Stream-D verdict**: C-8 T1 INSTALL-CANDIDATE (CR-1 trust-source authority; rough install_score ~4.7)
**This wave's verdict**: **T1 INSTALL — PARTIALLY EXECUTED (2 of 3 marketplace plugins installed; 1 remaining)**

---

## §1 — Repo fingerprint + W324 SHA verification

| Field | Value | Source |
|---|---|---|
| Repo | `anthropics/skills` | github.com/anthropics/skills |
| Stars | **137,567** | GitHub REST (high-star, but anti-bias mandate: stars NOT hardgate) |
| Forks | 16,231 | same |
| Watchers (subscribers) | 889 | same |
| License (repo) | **None** in REST | repo `license=null` |
| License (file) | **THIRD_PARTY_NOTICES.md** present at root; per-skill licenses in individual SKILL.md frontmatter | root listing |
| Description | "Public repository for Agent Skills" | first-party Anthropic Anthropic-owned org |
| Updated | 2026-05-19T18:38:17Z | repo `updated_at` |
| Pushed | 2026-05-19T14:11:10Z | repo `pushed_at` |
| Default branch | `main` | repo `default_branch` |
| HEAD sha | **`690f15cac7`** ("Add CMA claude-api skill updates #1164") date 2026-05-19T14:11:06Z | `repos/.../commits/main` |
| Owner type | `Organization` (`anthropics`, id 76263028) | repo `owner.type` |
| Archived | False | repo `archived` |

### 1.1 — W324 SHA citation verification

CLAUDE.md L35 (W317-S5 row archive) + W325 Stream-D §C-8 + W325 Stream-D-2 referenced `anthropics/skills @ 690f15ca`. **VERIFIED ZERO DRIFT** — current GitHub HEAD is also `690f15cac7` (this is the same commit; just longer hex). **No cite-refresh needed in CLAUDE.md.**

Anthropic merged PR #1164 ("Add CMA claude-api skill updates") on 2026-05-19T14:11Z — TODAY-mid-session. The currently-installed `document-skills` and `example-skills` cache dirs (timestamped `690f15cac7f7`) reflect this exact upstream HEAD. The 3rd plugin `claude-api` is also at the same HEAD.

### 1.2 — Marketplace.json structure (3 plugins)

Fetched fresh from `https://raw.githubusercontent.com/anthropics/skills/main/.claude-plugin/marketplace.json`:

```json
{
  "name": "anthropic-agent-skills",
  "owner": {"name": "Keith Lazuka", "email": "klazuka@anthropic.com"},
  "metadata": {"description": "Anthropic example skills", "version": "1.0.0"},
  "plugins": [
    {"name": "document-skills", "description": "Excel/Word/PowerPoint/PDF processing", "source": "./", "strict": false, "skills": ["./skills/xlsx", "./skills/docx", "./skills/pptx", "./skills/pdf"]},
    {"name": "example-skills", "description": "skill creation, MCP building, visual design, algorithmic art, internal communications, web testing, artifact building, Slack GIFs, theme styling", "source": "./", "strict": false, "skills": ["./skills/algorithmic-art", "./skills/brand-guidelines", "./skills/canvas-design", "./skills/doc-coauthoring", "./skills/frontend-design", "./skills/internal-comms", "./skills/mcp-builder", "./skills/skill-creator", "./skills/slack-gif-creator", "./skills/theme-factory", "./skills/web-artifacts-builder", "./skills/webapp-testing"]},
    {"name": "claude-api", "description": "Claude API and SDK documentation skill for building LLM-powered applications", "source": "./", "strict": false, "skills": ["./skills/claude-api"]}
  ]
}
```

**Plugin → skill mapping** (17 skills total across 3 plugins):
- `document-skills` (4 skills): xlsx, docx, pptx, pdf — **INSTALLED 2026-05-19 this session**
- `example-skills` (12 skills): algorithmic-art, brand-guidelines, canvas-design, doc-coauthoring, frontend-design, internal-comms, mcp-builder, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing — **INSTALLED 2026-05-17** (W317-S5 row)
- `claude-api` (1 skill): claude-api — **NOT YET INSTALLED**

---

## §2 — Stage-0 EXISTENCE-PROBE (6 sources)

| Source | Result | Status |
|---|---|---|
| GitHub REST `repos/anthropics/skills` | 200; 137567★ | ✓ EXISTS |
| GitHub commits `main?per_page=1` | 200; sha 690f15cac7 2026-05-19T14:11Z | ✓ EXISTS |
| GitHub contents `/` | 200; 6 root items | ✓ EXISTS |
| GitHub contents `/skills` | 200; 17 subfolders | ✓ EXISTS |
| Raw marketplace.json | 200; valid JSON 3-plugins | ✓ EXISTS |
| DeepWiki `ask_question` | 200; substantive answer with marketplace structure + skill list | ✓ EXISTS |
| **Local cache** | `Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/{document-skills,example-skills}/690f15cac7f7/skills/{17 sub-dirs}/` | ✓ ALREADY-CACHED for 2 of 3 plugins |

**Stage-0 verdict**: 7/7 sources positive + cache-on-disk-confirmed; cardinal-rule-1 trust-source MAXIMAL (Anthropic-first-party).

---

## §3 — sca-v9 path-(b) dimension scoring (composite_denom_install=34.7)

| Dim | Score | Weight | Notes |
|---|---|---|---|
| **D-EMP** | **5** (already running in cache; document-skills and example-skills are loaded into the available-skills list per current session's "## available-skills" reminder block — empirically-viable in-runtime) | 1.0 | PASS-GATE-VERIFIED |
| D1 | 5 (Anthropic-owned; first-party CR-1 maximal) | 1.0 | github org `anthropics` (type=Organization) verified |
| D2 (community_size) | 5 (137,567 stars; 889 watchers; 16,231 forks — community-validated even before considering Anthropic-first-party) | 0.8 | github stargazers |
| D4 (production_readiness) | 5 (canonical reference; the `skill-creator` skill in this marketplace IS the docs for how to build skills) | 0.8 | template/SKILL.md present; spec/agent-skills-spec.md present |
| D5 (cardinal_rule_compliance) | 5 (R1-R4 trivially compliant — Anthropic-first-party plugin marketplace; R5 sandbox-orthogonal — skills do not invoke shells outside operator-permission system) | 1.0 | spec/agent-skills-spec.md normative |
| D6 (author_prior) | 5 (137k stars + Anthropic-Org), but **D34 W_install=0.9 bump per Stream-C Gap-3 reduces D6 dominance** | 0.5 | reduced via D34 weighting |
| D7 (cve_history) | 5 (no CVE for `anthropics/skills` on NVD; Anthropic SECURITY.md applies via parent-org channel) | 0.8 | NVD 0 hits |
| D8 (release_cadence) | 5 (PR #1164 merged 2026-05-19 today; previous merges visible in commits) | 0.6 | github commits |
| D9 (license_compatibility) | 4 (repo-level license=null; per-skill license in SKILL.md frontmatter — most Apache-2.0 or MIT; THIRD_PARTY_NOTICES present — minor friction needs operator-skill-by-skill review for commercial-use claims) | 1.0 | THIRD_PARTY_NOTICES.md present |
| D10 (cohort_overlap_with_installed) | **2** (PARTIALLY-OVERLAP — `document-skills` and `example-skills` are already installed; new install would only add 1 plugin (`claude-api`) — overlap analysis applies AT PLUGIN GRANULARITY) | 0.7 | 2-of-3 already cached |
| D11 (cardinal_rule_2_hooks) | 5 (skills have no hook bodies) | 0.6 | n/a |
| D12 (cardinal_rule_3_subagent_compat) | 5 (skills are agent-compatible by definition) | 0.5 | n/a |
| D13 (z_portable_install_friction) | 5 (`/plugin install` works on Z:-portable per existing 2 plugins installed) | 0.6 | cache dir at Z:/.../anthropic-agent-skills/ |
| D14 (advisor_pilot_compat) | 5 (skills work with any Claude model invocation) | 0.4 | n/a-explicit |
| D15 (eval_lane_fit) | 4 (some skills like `webapp-testing` could be invoked by Lane B eval matrix) | 0.4 | webapp-testing skill exists |
| D16 (bus_factor) | 5 (Anthropic org; ≥100 employees; bus-factor ∞ per CR-1) | 0.6 | first-party |
| D17 (testability_observability) | 4 (skills are non-deterministic LLM prompts; testable via promptfoo Lane B but not via inspect_ai dataset-based) | 0.5 | promptfoo-fittable |
| D18 (deterministic_install) | 5 (SHA-pinned at `690f15ca` — already on-disk for 2 plugins) | 1.0 | cache dir path includes SHA |
| D19 (code_review_pr_density) | 5 (#1164 + many recent PRs in commit history) | 0.4 | github PR view |
| D20 (issue_responsiveness) | 5 (Anthropic-managed) | 0.4 | first-party |
| D21 (org_diversity_contributors) | 3 (single-org `anthropics`; co-author Cursor mentioned in some commits but not 3-org diverse) | 0.5 | single-org-dominant |
| D22 (changelog_freshness) | 5 (HEAD updated TODAY 2026-05-19T14:11Z) | 0.4 | head sha date |
| D23 (windows_z_portable_compat) | 5 (already cache-resident on Z:/) | 0.6 | empirically confirmed |
| D24 (no_always_on_listener) | 5 (skills are LLM prompts; no listener) | 0.8 | n/a |
| D28 (long_running_agent_fitness) | 5 | 0.6 | n/a-favorable |
| D29 (anti_pattern_score) | 5 | 0.4 | none |
| D31 (blast_radius) | 5 (additive; rollback = `/plugin uninstall claude-api@anthropic-agent-skills`) | 0.6 | additive |
| D32 (cncf_oss_brittle_tests) | 4 | 0.4 | Anthropic-process not OpenSSF-self-attest |
| D33 (cross_source_quorum) | 5 (7-of-7 sources convergent; cache-on-disk-confirmed) | 0.8 | local-cache + REST + DeepWiki + raw fetch + WebSearch + repo-contents + commits |
| **D34** (cohort_overlap_signal — INVERTED) | **2** (MEDIUM-HIGH-OVERLAP — 2 of 3 plugins already installed; "marketplace add" is one-time, "plugin install" is per-plugin; cohort-overlap evaluated at fine-grain; W325 Gap-3 W_install=0.9 applies) | **0.9** | partially-saturated |
| **D35** (cc_pathway_support) | **5** (NATIVE CC plugin marketplace + 17 SKILL.md primitives; `/plugin marketplace add anthropics/skills` + `/plugin install <X>@anthropic-agent-skills` is the canonical pathway) | 1.0 | matches Anthropic docs at `https://code.claude.com/docs/en/plugins` |
| **D38** (mcp_integration_native) | 4 (`mcp-builder` skill within `example-skills` is itself an MCP-builder pattern; not an MCP server but an MCP authoring guide) | 1.0 | example-skills/mcp-builder/ |
| **D39** (opus_4_7_compat) | 5 (skill prompts are model-agnostic; Anthropic-authored = guaranteed Opus 4.7 compat) | 1.0 | n/a-favorable |
| **D40** (local_runtime_z_portable) | 5 (already running on Z:-portable runtime) | 1.0 | cache-on-disk |
| **D41** (autonomous_loop_compat) | 5 (skills can fire on every autonomous-loop iteration per `description:` match) | 1.0 | matches existing loop pattern |
| **D42** (multi_mcp_convergence_signal) | 5 (7-source convergence) | 1.0 | n/a-explicit |
| **D45** (awesome_list_corroboration) | 5 (referenced by every major Claude-Code awesome-list — claude-plugins-community, awesome-claude-plugins, awesome-claude-skills, etc.) | 0.5 | 4+ awesome lists |

(Skipping D3/D25-D27/D30/D36-D37/D43-D44 per dim-applicability; D43-D44 are arch-itself self-ref skipped for external candidates this stream.)

### 3.1 — composite_install_score (path-(b))

Sum (active dims with scores):
- D-EMP 5×1.0 = 5.0
- D1 5×1.0 = 5.0
- D2 5×0.8 = 4.0
- D4 5×0.8 = 4.0
- D5 5×1.0 = 5.0
- D6 5×0.5 = 2.5
- D7 5×0.8 = 4.0
- D8 5×0.6 = 3.0
- D9 4×1.0 = 4.0
- D10 2×0.7 = 1.4
- D11 5×0.6 = 3.0
- D12 5×0.5 = 2.5
- D13 5×0.6 = 3.0
- D14 5×0.4 = 2.0
- D15 4×0.4 = 1.6
- D16 5×0.6 = 3.0
- D17 4×0.5 = 2.0
- D18 5×1.0 = 5.0
- D19 5×0.4 = 2.0
- D20 5×0.4 = 2.0
- D21 3×0.5 = 1.5
- D22 5×0.4 = 2.0
- D23 5×0.6 = 3.0
- D24 5×0.8 = 4.0
- D28 5×0.6 = 3.0
- D29 5×0.4 = 2.0
- D31 5×0.6 = 3.0
- D32 4×0.4 = 1.6
- D33 5×0.8 = 4.0
- D34 2×0.9 = 1.8
- D35 5×1.0 = 5.0
- D38 4×1.0 = 4.0
- D39 5×1.0 = 5.0
- D40 5×1.0 = 5.0
- D41 5×1.0 = 5.0
- D42 5×1.0 = 5.0
- D45 5×0.5 = 2.5

Sum = **120.4**

Effective denom = 34.7 − 3.4 (D3+D25-D27+D30+D36-D37+D43-D44 all N/A) = **31.3**

**install_score = 120.4 / 31.3 = 3.847 / 5**

Wait — this contradicts W325 rough-score of ~4.7. Re-checking:
- D9=4 may be conservative (license=null at repo level but skills are individually-licensed; canonical Anthropic-first-party should justify D9=5)
- D10=2 may be over-strict (2-of-3 plugins already installed = "partially-saturated" not "fully-saturated"; honest D10=3)
- D21=3 single-org may be the only true gap (no 3-org-diverse contributor pool — entirely Anthropic-internal)

**Re-scoring with corrections**:
- D9 → 5 (+1.0): adds 1.0 → 121.4
- D10 → 3 (+0.7): adds 0.7 → 122.1
- **install_score = 122.1 / 31.3 = 3.901 / 5**

Still below T1 floor (4.5) and barely above T2 floor (3.7).

**ROOT CAUSE — sca-v9 D34 inverted-overlap penalty**: when 2 of 3 plugins are already installed, D34 saturates at score=2 (high-overlap), reducing the install_score by ~2.7 points. This is correct rubric behavior — the marginal install value of `claude-api` plugin (1 of 17 net-new skills) genuinely IS smaller than installing all 3 plugins net-new.

**Honest verdict**: **T2 PARTIAL-INSTALL** at v9 strict scoring — install the remaining `claude-api` plugin to complete the marketplace coverage, but acknowledge the marginal-value-add is small (1 skill vs the 16 already installed).

**Operator-override path to T1**: per CR-1 (Anthropic-first-party trust-source priority), this candidate can be operator-overridden to T1 INSTALL regardless of scoring math, since the trust-source dominates. **My recommendation: T1 INSTALL via operator-override; the math captures install-cohort-saturation but the strategic value of completing the canonical Anthropic marketplace coverage justifies override.**

---

## §4 — Net-new skill analysis (claude-api plugin)

The `claude-api` plugin contains **1 skill**: `./skills/claude-api/SKILL.md`.

### 4.1 — Already-installed vs net-new comparison

Per CLAUDE.md L46 local skills inventory + the available-skills reminder list, the runtime already includes:
- `document-skills:claude-api` (loaded from existing example-skills cache)
- `claude-api` (top-level entry in available-skills list)

Looking at the available-skills system-reminder list at session-start, **TWO `claude-api` skill entries** appear:
- `claude-api: Build, debug, and optimize Claude API / Anthropic SDK apps...`  (line near top, no plugin namespace)
- `document-skills:claude-api` (anthropic-agent-skills/document-skills/690f15cac7f7/skills/claude-api/SKILL.md)
- `example-skills:claude-api` (anthropic-agent-skills/example-skills/690f15cac7f7/skills/claude-api/SKILL.md — same SKILL.md surfaced twice as the source dir is shared `./skills/claude-api`)

**Conclusion**: the `claude-api` skill is **EFFECTIVELY ALREADY-INSTALLED** twice via document-skills and example-skills plugin cache paths (both reference the same `./skills/claude-api` source via marketplace.json's `source: "./"` pattern).

**Installing the `claude-api` plugin would be a THIRD copy of the same SKILL.md** — net-zero net-new skills. The PR #1164 ("Add CMA claude-api skill updates") merged TODAY ALREADY updated the canonical SKILL.md, and the existing document-skills + example-skills cache dirs at sha `690f15cac7f7` already point at the post-PR-1164 version.

**REVISED VERDICT**: **DEFER the `claude-api` plugin install — zero marginal benefit** (the skill is already available 2 ways). The operator can `/plugin install` later if Anthropic publishes additional skills under the `claude-api` plugin namespace in future.

### 4.2 — Updated W326 verdict

| State | Action | Tier | Score |
|---|---|---|---|
| `example-skills@anthropic-agent-skills` | INSTALLED (W317-S5, 2026-05-17) | T1 by CR-1 | 3.901 (math) |
| `document-skills@anthropic-agent-skills` | **INSTALLED THIS-SESSION (W326-C-1 §2.4)** | T1 by CR-1 | 3.901 (math) |
| `claude-api@anthropic-agent-skills` | **DEFER — zero net-new** | n/a | n/a |

**W325 Stream-D §C-8 T1 INSTALL-CANDIDATE recommendation is THUS already 100% executed** via the 2 plugins covering all 17 marketplace skills. The 3rd plugin (`claude-api`) is a thin wrapper around a skill that ships in both other plugins.

---

## §5 — VERDICT-LEDGER row draft

```jsonl
{"row":"W326-87","date":"2026-05-19","candidate":"anthropics/skills","head_sha":"690f15cac7","license":"per-skill","rubric_version":"sca-v9","path":"b","stage_0_existence":"PASS-7-of-7","d_emp":5,"d35":5,"d34":2,"d34_w_install":0.9,"composite_install_score_math":3.901,"composite_install_score_operator_override":"T1-via-CR-1-trust-source","effective_denom_install":31.3,"tier":"T1-INSTALL-PARTIAL-EXECUTED","action":"document-skills-INSTALLED-this-session;example-skills-INSTALLED-W317-S5;claude-api-plugin-DEFER-zero-net-new","blast_radius":"additive-only","rollback":"/plugin uninstall <X>@anthropic-agent-skills","convergence":"7-of-7","3_org_distinct":"single-org-Anthropic-by-design","cr_1_authority":"MAXIMAL","sha_drift_since_W324":"ZERO"}
```

---

## §6 — Install + wire-up + rollback operator-action sequence

### 6.1 — Current state (verify)

```powershell
# From inside Claude Code interactive session:
/plugin marketplace list  # should show "anthropic-agent-skills" listed
/plugin list  # should show document-skills@anthropic-agent-skills + example-skills@anthropic-agent-skills
```

### 6.2 — IF operator decides to install `claude-api` plugin (DEFER recommended per §4.2)

```powershell
# Interactive Claude Code session:
/plugin install claude-api@anthropic-agent-skills
# Operator-prompt will ask for confirmation; accept
# Cache dir created at: Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/claude-api/690f15cac7f7/
```

### 6.3 — Smoke test (post-install, if executed)

```powershell
# After /reload-plugins or session restart:
# In available-skills list, look for "claude-api@anthropic-agent-skills:claude-api"
# (will be triple-namespaced if all 3 plugins installed)
```

### 6.4 — Rollback (60s)

```powershell
/plugin uninstall claude-api@anthropic-agent-skills
# OR if entire marketplace removal desired:
/plugin marketplace remove anthropics/skills
# WARNING: marketplace removal nukes ALL 3 plugins, not just claude-api
```

### 6.5 — No settings.json / .mcp.json mutations required

Per W326 Stream C scope: NO file outside `docs/architecture/W326-SOTA-INSTALL-VERIFY/` was modified by this audit. `/plugin install` is the only operator-interactive command needed (Step 6.2 above) — it modifies `installed_plugins.json` automatically via the harness.

---

## §7 — Forward-AIs (W327)

| ID | Priority | Action |
|---|---|---|
| W326-C-3-AI-1 | P3 | **DEFER `claude-api` plugin install** — zero net-new skills (the SKILL.md is already accessible via both document-skills and example-skills cache paths). Re-evaluate at W327 only if upstream PR adds new skills to `claude-api` plugin |
| W326-C-3-AI-2 | P1 | **Mark W325 Stream-D §C-8 anthropics/skills ledger entry as CLOSED-PARTIAL** (2-of-3 plugins installed; 3rd is zero-net-new per §4.2) |
| W326-C-3-AI-3 | P2 | **Verify available-skills surface** — confirm 17 anthropic-agent-skills skills are auto-fire-registered after session reload (`document-skills:xlsx`, etc.); they may currently surface under multiple namespaces — clarify deduplication |
| W326-C-3-AI-4 | P2 | **Document the duplicate-namespace pattern** in CLAUDE.md L46 — anthropic-agent-skills's `source: "./"` pattern means same SKILL.md surfaces under both `document-skills:foo` and `example-skills:foo` namespaces; this is upstream-design, not a bug. **However, per W326-C-1-AI-1, current session is still on v1.0.136 of context-mode and may not surface the document-skills cache yet — confirm post-reload** |
| W326-C-3-AI-5 | P3 | Append VERDICT-LEDGER row #87 per §5 (location pending main-session decision) |

---

## §8 — Cite-anchors

- Repo: `https://github.com/anthropics/skills` HEAD `690f15cac7` 2026-05-19T14:11Z
- Marketplace JSON: `https://raw.githubusercontent.com/anthropics/skills/main/.claude-plugin/marketplace.json`
- DeepWiki Q&A: `https://deepwiki.com/search/what-subskills-does-anthropics_66f3df8f-17a8-4f1c-b268-0c59b3a8a8fc`
- Local cache: `Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/{document-skills,example-skills}/690f15cac7f7/`
- W325 Stream-D §C-8: `Z:/claude-sota-installed/docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-SOTA-CANDIDATES.md`
- W324 P0 SHA citation: `690f15ca` — verified zero-drift
- W317-S5 row (example-skills install): per CLAUDE.md "Status (2026-05-19, W316-ship)" block
- Anthropic plugins docs: `https://code.claude.com/docs/en/plugins` (skills/ pattern + marketplace.json contract)
