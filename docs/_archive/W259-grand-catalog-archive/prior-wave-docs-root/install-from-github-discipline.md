# install-from-github discipline — cardinal-rule-6 mechanics

> **The Rule** (cardinal-rule-6 from `CLAUDE.md`): every install command MUST first refresh upstream from GitHub / npm / PyPI / cargo / docker registry. NEVER copy from `Z:/repos/deps/<repo>/` (those may be stale per Marker Decay corollary at `Z:/claude-sota/.claude/rules/evidence-policy.md`).
>
> **Cite anchor**: user directive 2026-05-06 "must be completly new sota and native install repos, also pull form the newest github before install" — n=1 user-trigger automatic per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction.

## The 6 install patterns (per install class)

> **Upstream cite anchors per pattern** (Wave 50 Agent B P1 fix-forward):
> - Pattern 1 (npm): `https://docs.npmjs.com/cli/v10/commands/npm-view` (npm view dist-tags.latest semantics) + `https://docs.npmjs.com/cli/v10/commands/npm-install` (`-g` global install + `@<version>` syntax)
> - Pattern 2 (uvx): `https://docs.astral.sh/uv/concepts/tools/` (uvx tool runner) + `https://docs.astral.sh/uv/reference/cli/#uvx` (`--refresh` / `--reinstall` semantics)
> - Pattern 3 (git clone): `https://git-scm.com/docs/git-clone` (`--depth 1` shallow clone semantics) + `https://git-scm.com/docs/git-fetch` (`fetch origin` refresh semantics)
> - Pattern 4 (gh release): `https://cli.github.com/manual/gh_release_download` (release asset download) + `https://cli.github.com/manual/gh_release_list` (latest tag query)
> - Pattern 5 (docker): `https://docs.docker.com/reference/cli/docker/image/pull/` (image pull semantics) + `https://docs.docker.com/reference/cli/docker/inspect/` (digest capture via RepoDigests)
> - Pattern 6 (plugin): `https://code.claude.com/docs/en/plugins` (Anthropic CC plugin marketplace primitive) + `https://code.claude.com/docs/en/cli-reference#plugin` (slash-command CLI reference)
>
> All cites VERIFIED (2026-05-06) — pattern semantics current per cardinal-rule-1.

### Pattern 1 — npm package install (CLI binary or Node module)

```powershell
# WRONG — uses pinned version OR cached tarball
npm install -g <pkg>@<old-version>

# RIGHT — refresh dist-tag, install latest
$latest = (npm view <pkg> dist-tags.latest)
npm install -g "<pkg>@$latest"
# Log to install-provenance.md: pkg, version, install command, timestamp, npm view dist-tags.latest output
```

### Pattern 2 — uvx / Python tool install

```powershell
# WRONG — uvx caches by default
uvx <pkg>

# RIGHT — force refresh
uvx --refresh <pkg>
# OR for one-shot reinstall:
uvx --reinstall <pkg>
# Log to install-provenance.md
```

### Pattern 3 — git clone (fresh upstream)

```powershell
# WRONG — copy from Z:/repos/deps/<repo>/ (may be stale)
xcopy "Z:/repos/deps/<repo>" "Z:/claude-sota-installed/.claude/.../"

# RIGHT — fresh shallow clone from upstream
git clone --depth 1 "https://github.com/<owner>/<repo>.git" "Z:/claude-sota-installed/.claude/<dest>/"
# Capture HEAD SHA for cite anchor (var-capture form per Wave 50 Agent C P2-3 — write-redirection blocked under codex-readonly policy):
$sha = git -C "Z:/claude-sota-installed/.claude/<dest>" rev-parse HEAD
# Then log via Write tool / Edit append to docs/install-provenance.md (NOT shell `>` redirection — that fails the codex-readonly adversarial review path)
```

### Pattern 4 — gh release download (binary release)

```powershell
# Get latest release tag, then download
$tag = (gh release list --repo <owner>/<repo> --limit 1 --json tagName -q '.[0].tagName')
gh release download $tag --repo <owner>/<repo> --pattern "<asset-pattern>" --dir "Z:/claude-sota-installed/<dest>/"
# Log to install-provenance.md
```

### Pattern 5 — docker pull (service container)

```powershell
# WRONG — uses :latest tag without refresh
docker run <image>:latest

# RIGHT — explicit pull first, capture digest
docker pull "<image>:latest"
$digest = (docker inspect "<image>:latest" --format '{{index .RepoDigests 0}}')
# Log digest + tag + pull timestamp to install-provenance.md
docker run [...] "<image>:latest"
```

### Pattern 6 — claude code plugin install (marketplace)

```text
/plugin install <repo-name>           # If marketplace already added
# OR
/plugin marketplace add <marketplace-url>
/plugin install <repo-name>
# Capture: /plugin list output → log to install-provenance.md
```

**Step 7 (post-install — per Wave 50 Agent C P2-1)**: After first `/plugin install` succeeds, update `tools/eee.ps1` ENV (c) block — uncomment `$env:CLAUDE_PLUGIN_ROOT` and set to the installed plugin root path. Without this, subsequent `eee` launches lack `CLAUDE_PLUGIN_ROOT`, causing plugin resolution failures. Mirror update to `CLAUDE.local.md` ENV (c) block. Log the env addition as a settings-edit row in `docs/sota-installed-manifest.md` Section 0 supplementary.

## Post-install verification (mandatory per cardinal-rule-1)

For every install, log to `docs/sota-installed-manifest.md` row:

| field | value |
|---|---|
| primitive | what does this install provide (rule / agent / skill / mcp / cli / hook / setting) |
| install pattern | 1-6 from above |
| install command (verbatim) | exact command run |
| upstream HEAD SHA / version | captured at install time |
| install timestamp | ISO 8601 |
| convergence-gate axis 1 | maintainership: official-org / named-T2 / single-author |
| convergence-gate axis 2 | endorsement: named-T2 / community-only / none |
| convergence-gate axis 3 | velocity: STABLE-BURN-IN / ACTIVE-ITERATION / SUSTAINED-ACTIVE / FAST-CHURN / STRONG-PROVENANCE-EXPRESS |
| Probe DAG outcome | P1 LICENSE / P2 registry / P3 plugin-namespace / P4 GraphQL bands / P5 README / P6 deep audit results |
| smoke probe outcome | actual operational test (e.g., MCP `tools/list` returned, CLI `--version` returned, plugin appears in `/plugin list`) |
| disposition | INSTALLED / DEFERRED-PENDING-FIX / REJECTED-POST-PROBE / etc. |

## Anti-patterns (forbidden in this runtime)

- **Copy from `Z:/repos/deps/<repo>/`** — those are claude-sota's local clones, may be stale per Marker Decay (`Z:/claude-sota/.claude/rules/evidence-policy.md`). VERBOTEN as install source.
- **Wholesale-port from `Z:/claude-sota/`** — that's the sibling SOTA-evolving runtime. Each primitive must be re-installed from upstream, not copy-ported. Cite-import (file:line reference) is allowed; code-import (copy-paste) is NOT.
- **Pin to old version "for stability"** — refuted by user directive "pull from newest". Stability comes from convergence-gate axis-3 (STABLE-BURN-IN / SUSTAINED-ACTIVE bands), not from pinning to outdated SHAs.
- **Skip Probe DAG before install** — refuted by `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` (Probe 4 plugin-namespace + Probe 5 mode-harness-shape + Probe 6 LICENSE/registry + Probe 7 demand-absence ALL gate adoption).
- **Install without logging to manifest** — refuted by `audit-action-loop.md §Surface stage`: undocumented installs accumulate as drift; next session has no provenance.
- **Non-official channel install** (NEW per user refinement 2026-05-06 "all install with offical native sota approach, clean and offical") — refuted by cardinal-rule-6 official-native-channel clause. NEVER use:
  - npm mirror sites (e.g., `cnpm`, internal artifact servers) when `https://registry.npmjs.org` is the canonical source
  - GitHub mirror clones (`https://gitlab.com/<mirror>/<repo>`) when `https://github.com/<owner>/<repo>` is the canonical upstream
  - Shell-script wrappers around official CLI primitives (e.g., custom `install-mcp.ps1` when `/plugin install <pkg>` is the Anthropic-canonical primitive)
  - Side-loaded binaries (manual download + manual PATH placement) when a package manager primitive exists (`winget` / `npm install -g` / `cargo install` / `gh release download`)
  - Custom Docker registries when the upstream image is published to `https://hub.docker.com/`
  
  Discipline: every install MUST go through the canonical primitive its upstream maintainer publishes for. If that primitive is unclear, READ the repo's README "Installation" section + `docs/install.md` BEFORE inventing a workaround. Workaround = self-invention = cardinal-rule-5 violation.

## Phase-gated unleash (cardinal-rule-7 from CLAUDE.md)

This runtime starts in `permissions.defaultMode: "default"` (gated). Per cardinal-rule-7, `permissions.allow[]` populates per-install:
- Each manifest row that needs a settings.json `allow[]` entry SPECIFIES it in the row's "settings additions" column post-install.
- Each `allow[]` entry MUST cite the manifest row that authorized it (audit-trail forward-traceable).
- Phase 3 transition (`defaultMode: "bypassPermissions"`) requires arc-convergence verdict + Tier-0 through Tier-5 all INSTALLED + N-day burn-in per axis-3 STABLE-BURN-IN.

## Acceptable cite-import (NOT install-import)

- Adapting an env block from claude-sota CLAUDE.local.md → cite anchor with file:line + HEAD SHA, then write fresh content. Permitted because env block is bootstrap-machine-specific, not an architectural primitive.
- Cardinal-rule numbering convention (1-11 schema) — adapted SOTA practice from CCBP `claude-memory.md` cite-discipline + Karpathy gist + cross-model-workflow + RPI workflow. Per cardinal-rule-11 META-process discipline (Wave 50 fire 6 user-trigger correction): claude-sota-installed cardinal rules cite UPSTREAM directly (TIER-1-DIRECT), NOT via sibling claude-sota chain. Sibling cite-import-AMBER per Section 14.5 ONLY for sibling-novel discipline with no upstream parity (citation-discipline.md cite-class lattice / evidence-policy.md Marker Decay).

## When to re-install

Per `Z:/claude-sota/.claude/rules/evidence-policy.md` Marker Decay corollary: install anchors valid AT INSTALL TIME, decay over time. Re-install gate triggers:

1. Upstream ships a breaking change (changelog watch via `gh release list --repo <owner>/<repo> --limit 5`)
2. Convergence-gate axis-3 band shift (e.g., FAST-CHURN → ACTIVE-ITERATION after 90d) — opportunity to upgrade if axis-1+2 still PASS
3. CVE / security advisory on installed package
4. > 90 days since last install (Marker Decay: re-verify HEAD SHA still matches manifest)
5. New manifest column added (e.g., axis-4 harness-fit) — re-evaluate existing installs against new dimension

Re-installs follow Pattern 1-6 above + log to `install-provenance.md` as a new row (not edit-in-place).
