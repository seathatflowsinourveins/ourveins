## ARTIFACT-INLINE: tmp/wave101-B-ship2l-anthropics-skills-install-2026-05-08.md

# Ship 2L — anthropics/skills install design

## 1. Repo audit (anthropics/skills @ HEAD `d211d437443a7b2496a3dad9575e7dddd724c585`)

**Source**: `https://github.com/anthropics/skills` 130,494★ Apache-2.0 Anthropic OFFICIAL
**Cite anchors** (TIER-1-DIRECT):
- `Z:/repos/deps/anthropics-skills/README.md:1-50` (canonical install instructions)
- `Z:/repos/deps/anthropics-skills/.claude-plugin/marketplace.json:1-49` (marketplace manifest defining 3 plugins)
- HEAD `d211d437` (sibling clone) — fresh marketplace clone at `.claude/plugins/marketplaces/anthropic-agent-skills/` already at this SHA

**Repo structure** (top-level):
```
.claude-plugin/marketplace.json   # Defines 3 plugins (document-skills, example-skills, claude-api)
README.md                         # Install via /plugin marketplace add anthropics/skills
THIRD_PARTY_NOTICES.md
skills/                           # 17 skill folders (each with SKILL.md)
spec/                             # Agent Skills specification
template/                         # Skill template scaffold
```

**17 skills enumerated** (from `skills/` directory):
- **document-skills plugin** (4): docx, pdf, pptx, xlsx (source-available, NOT open source — under Anthropic license)
- **example-skills plugin** (12): algorithmic-art, brand-guidelines, canvas-design, doc-coauthoring, frontend-design, internal-comms, mcp-builder, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing
- **claude-api plugin** (1): claude-api

**Canonical install pattern** (per README.md L37-50): plugin marketplace mechanism, NOT raw `git clone .local/`:
```
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
/plugin install claude-api@anthropic-agent-skills
```

## 2. Current state probe (Mia pre-apply)

**Marketplace registration** (`Z:/claude-sota-installed/.claude/plugins/known_marketplaces.json`):
- `anthropic-agent-skills` ALREADY ADDED at HEAD `d211d437`, lastUpdated 2026-05-08T04:20:37.856Z
- Source: `{source: github, repo: anthropics/skills}`
- installLocation: `Z:\claude-sota-installed\.claude\plugins\marketplaces\anthropic-agent-skills`

**Plugin installation state** (`Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`):
- `document-skills@anthropic-agent-skills` — **NOT INSTALLED**
- `example-skills@anthropic-agent-skills` — **NOT INSTALLED**
- `claude-api@anthropic-agent-skills` — **NOT INSTALLED**
- `skill-creator@claude-plugins-official` — INSTALLED (different source: `claude-plugins-official`, not `anthropic-agent-skills`)

**Skill collision audit** (`.claude/skills/` enumeration):
- Existing local skills: only `learned/` subfolder
- **Zero collisions** with anthropics/skills plugin contents
- skill-creator: dual source — already installed via `claude-plugins-official`. anthropics/skills `example-skills` plugin includes its own `skill-creator` folder. Plugin install would create a SECOND skill-creator instance — potential precedence issue but per CC plugin namespace rules, both can coexist (each scoped under its plugin name).

**Cache state**: `.claude/plugins/cache/anthropic-agent-skills/` — does NOT exist yet (no plugins installed → no cache populated). This is the **Wave 100 Ship 2R "plugin enable → cache populate gap"** in active form.

## 3. Integration layer recommendation — Option B (canonical plugin marketplace)

**Recommended: Option B** — Use `/plugin install` against the already-added marketplace.

**Rationale**:
- **CR-12 PRIMARY upstream-install-priority**: README L37 documents the canonical Anthropic install pattern is `/plugin marketplace add anthropics/skills` + `/plugin install`. This IS the official-native-channel per CR-6.
- **CR-5 install-priority**: plugin marketplace is the canonical SOTA install primitive (not raw git clone)
- **CR-9 install-risk discipline**: marketplace mechanism handles version pinning, dependency resolution, cache management (vs hand-copying skills/ to .claude/skills/ which would be a CR-6 violation — copying from Z:/repos/deps/ when official channel exists)

**Why NOT Option A** (copy/symlink to `.claude/skills/`):
- Violates CR-6: Z:/repos/deps/ is "stale per Marker Decay corollary" — official install channel exists (marketplace)
- Violates CR-12: marketplace is the canonical upstream channel; bypassing it = picking Path B/C when Path A available
- Loses plugin namespace scoping (would conflict with skill-creator@claude-plugins-official already installed)

**Why NOT Option C** (cite-import-AMBER pointer):
- anthropics/skills is install-class, not cite-class. CR-12 mandates upstream install when available.
- Cite-import-AMBER reserved for sibling-novel patterns with no upstream parity (CR-12 TERTIARY)

## 4. Concrete install command sequence

```bash
# Step 1: Verify marketplace freshness (already added; refresh per CR-6)
/plugin marketplace update anthropic-agent-skills

# Step 2: Install 3 plugins (canonical 3-plugin set per marketplace.json)
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
/plugin install claude-api@anthropic-agent-skills

# Step 3: Verify cache population (Wave 100 Ship 2R lesson — enable→cache gap)
ls Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/

# Step 4: Restart CC session to load plugin skills (per CC plugin lifecycle)
# (operator runs after install; skills become discoverable post-restart)
```

**Scope per ONE-LOGICAL-UNIT-PER-FIRE**: Ship 2L = git clone equivalent (marketplace already added) + 3 `/plugin install` invocations. Cardinal-rule citations for individual skills = Ship 2L-followup.

## 5. CR-9 version-pin (HEAD SHA recorded)

**Marketplace pin**:
- Marketplace: `anthropic-agent-skills`
- Source: `https://github.com/anthropics/skills`
- HEAD SHA: `d211d437443a7b2496a3dad9575e7dddd724c585` (verified 2026-05-08 via `git rev-parse HEAD`)
- Last marketplace update: 2026-05-08T04:20:37.856Z

**Per-plugin pins** (recorded post-install in `installed_plugins.json` `gitCommitSha` field — automatic via `/plugin install` mechanism). Manifest entry should record:
```
plugin: document-skills@anthropic-agent-skills
  marketplace_sha: d211d437443a7b2496a3dad9575e7dddd724c585
  installed_at: <post-install timestamp>
  cite_anchor: Z:/repos/deps/anthropics-skills/.claude-plugin/marketplace.json:13-23
```
(Same pattern for example-skills and claude-api; lines per marketplace.json plugin block.)

**CR-9 acknowledgment**: marketplace mechanism handles version drift — no `@latest` bare pins. Each install captures HEAD SHA at install time. 2-round fix-forward budget: first install may need cache verification step (Ship 2R lesson).

## 6. CR-12 upstream-install-priority verification

**Path A UPSTREAM-INSTALL-AVAILABLE**: ✅ CONFIRMED
- Anthropic OFFICIAL marketplace registration verified
- `/plugin marketplace add anthropics/skills` documented in README L41 (canonical Anthropic install)
- Marketplace.json defines 3 plugins for granular install
- 130,494★ Anthropic OFFICIAL Apache-2.0 (axis-1+2+3 PASS via STRONG-PROVENANCE-EXPRESS)

**HONEST-NON-FINDING gate**: NOT TRIGGERED — upstream parity exists. Path A applies.

**No cite-import-AMBER needed** — full upstream install path available.

## 7. Mia probe outputs

**Collision check** (`.claude/skills/` enumeration):
- Existing: `.claude/skills/learned/` only
- Anthropics 17 skills: zero name-collisions with `learned/`
- skill-creator: pre-existing at `claude-plugins-official` source; anthropics version coexists under `anthropic-agent-skills` namespace (CC plugin scoping)

**skill-creator pairing analysis**:
- Currently installed: `skill-creator@claude-plugins-official` v `e3064c093ea5` (Wave 100 Ship 2N-batch1)
- anthropic-agent-skills `example-skills` plugin includes its own `skill-creator` folder
- Per CC plugin namespace: both coexist (different plugin scopes); user invokes via plugin-prefixed reference
- **Recommendation**: install `example-skills@anthropic-agent-skills` regardless — duplicate skill-creator is non-blocking; anthropics version is the canonical reference upstream

**Ship 2N-batch1 lineage**: Wave 100 enabled `skill-creator@claude-plugins-official` paired with anthropics/skills marketplace registration (this Ship 2L). Ship 2L completes the pairing by installing the canonical 3 plugins from anthropic-agent-skills.

## 8. Estimated install LOC + post-install verification

**Install LOC**: ~4 commands (1 marketplace update + 3 plugin install + 1 verify). Settings.json plugin enablement may or may not be needed (CC auto-enables installed plugins).

**Post-install verification recipe**:
```bash
# Verify all 3 plugins listed as installed
cat Z:/claude-sota-installed/.claude/plugins/installed_plugins.json | grep -E "document-skills|example-skills|claude-api"

# Verify cache populated (Wave 100 Ship 2R discipline)
find Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills -name "SKILL.md" | wc -l
# Expected: 17 (one per skill folder)

# Verify marketplace SHA pin recorded
grep "d211d437" Z:/claude-sota-installed/.claude/plugins/installed_plugins.json
# Expected: 3 hits (one per installed plugin)

# Smoke probe: invoke a skill (e.g., template format)
# After CC restart: ask "use the canvas-design skill to..." — verify discovery
```

**Provenance log entry** (append to `docs/install-provenance.md`):
```
## Wave 101 Ship 2L — anthropics/skills 3-plugin install (2026-05-08)
- marketplace: anthropic-agent-skills @ d211d437 (already added Wave 100)
- plugins installed: document-skills + example-skills + claude-api
- 17 skills now plugin-discoverable
- CR-12 PRIMARY path; CR-6 official-native-channel via /plugin install
- Smoke probe: cache populated 17 SKILL.md files; restart required for runtime discovery
```

---

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before commit
VERDICT: APPROVE-DESIGN
confidence: 0.91
recommended Integration Option: B (canonical plugin marketplace install)
install command sequence: [/plugin marketplace update anthropic-agent-skills → /plugin install document-skills@anthropic-agent-skills → /plugin install example-skills@anthropic-agent-skills → /plugin install claude-api@anthropic-agent-skills]
CR-9 version-pin: marketplace SHA d211d437443a7b2496a3dad9575e7dddd724c585; per-plugin SHAs auto-recorded in installed_plugins.json post-install
HONEST-NON-FINDING: zero skill-name collisions in .claude/skills/; marketplace already added (no `/plugin marketplace add` needed); plugin scoping handles dual skill-creator coexistence
