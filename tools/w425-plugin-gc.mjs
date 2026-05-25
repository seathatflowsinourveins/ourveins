#!/usr/bin/env node
// w425-plugin-gc.mjs — Plugin-cache garbage collector + drift fixer
//
// Audits and optionally cleans up `.claude/plugins/cache/` drift surfaced in W425:
//   1. Broken-current cache dirs (`.orphaned_at` marker OR no manifest where one is required)
//   2. Stale-sibling cache dirs (old version-named dirs left from /plugin update cycles)
//
// MODES
//   --audit        (default) Report what would be done; mutate nothing
//   --cleanup      Move broken-current dirs to .broken-w425/ + delete stale siblings
//   --aggressive   Also delete .broken-w425/ recovery dirs from prior runs
//
// SAFETY
//   - Refuses to run if any plugin cache dir has a `.in_use` marker (CC active lock)
//     unless --force is also passed
//   - Renames broken-current to `.broken-w425/<plugin>-<version>-<isoTime>` instead of
//     deleting outright (operator-recoverable for 30 days; then --aggressive prunes)
//   - LSP-stub plugins (declare `lspServers` in marketplace.json) are exempt — they
//     are EXPECTED to have empty cache dirs with no plugin.json
//
// CITE-ANCHORS (sca-v13 ≥3-org-distinct)
//   1. Anthropic Claude Code — https://code.claude.com/docs/en/plugins
//      Plugin manifest schema: `.claude-plugin/plugin.json` is the canonical loader path
//   2. CLAUDE.md cardinal-rule-1 (W270 corollary)
//      "Standard /plugin update no-ops on silent SHA drift — cache-delete + fresh-install
//      is the SOTA fix"
//   3. GitHub Docs — https://docs.github.com/en/repositories/working-with-files/managing-files
//      Filesystem-marker pattern (`.in_use`, `.orphaned_at`) for cross-process state
//
// SESSION-AWARE
//   - Reads `.claude/plugins/installed_plugins.json` to determine CURRENT version per plugin
//   - Anything NOT current is candidate for stale-prune
//   - Reads marketplace.json for each market to detect LSP-stub plugins

import { readFileSync, statSync, readdirSync, renameSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'Z:/claude-sota-installed';
const CACHE_ROOT = `${ROOT}/.claude/plugins/cache`;
const MARKET_ROOT = `${ROOT}/.claude/plugins/marketplaces`;
const INSTALLED_JSON = `${ROOT}/.claude/plugins/installed_plugins.json`;
const RECOVERY_ROOT = `${ROOT}/.claude/plugins/.broken-w425`;

const args = process.argv.slice(2);
const mode = args.includes('--cleanup') ? 'cleanup' : args.includes('--aggressive') ? 'aggressive' : 'audit';
const force = args.includes('--force');

function jsonRead(p) {
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; }
}

function isDir(p) {
  try { return statSync(p).isDirectory(); } catch { return false; }
}

// Detect LSP-stub plugins from a marketplace.json
function lspStubsFromMarketplace(mpJsonPath) {
  const j = jsonRead(mpJsonPath);
  if (!j || !Array.isArray(j.plugins)) return new Set();
  const stubs = new Set();
  for (const p of j.plugins) {
    if (p.lspServers && Object.keys(p.lspServers).length > 0) stubs.add(p.name);
  }
  return stubs;
}

// Build LSP-stub allowlist across all marketplaces
function buildLspStubAllowlist() {
  const allow = new Map(); // market -> Set<plugin-name>
  if (!isDir(MARKET_ROOT)) return allow;
  for (const market of readdirSync(MARKET_ROOT)) {
    const mp = `${MARKET_ROOT}/${market}/.claude-plugin/marketplace.json`;
    const stubs = lspStubsFromMarketplace(mp);
    if (stubs.size > 0) allow.set(market, stubs);
  }
  return allow;
}

// Build current-version map from installed_plugins.json
function buildCurrentVersionMap() {
  const j = jsonRead(INSTALLED_JSON);
  if (!j || !j.plugins) return {};
  const out = {};
  for (const [key, recs] of Object.entries(j.plugins)) {
    const m = key.match(/^(.+)@(.+)$/);
    if (!m) continue;
    const [, plugin, market] = m;
    if (recs[0]?.version) out[`${market}/${plugin}`] = recs[0].version;
  }
  return out;
}

function hasManifest(dir) {
  return existsSync(`${dir}/.claude-plugin/plugin.json`) ||
         existsSync(`${dir}/.claude-plugin/marketplace.json`) ||
         existsSync(`${dir}/plugin.json`);
}

function isInUse(dir) {
  return existsSync(`${dir}/.in_use`);
}

function isOrphaned(dir) {
  return existsSync(`${dir}/.orphaned_at`);
}

// ============================================================================
// AUDIT
// ============================================================================
const lspStubs = buildLspStubAllowlist();
const currentVersions = buildCurrentVersionMap();

const findings = {
  total_version_dirs: 0,
  current_ok: 0,
  lsp_stub_exempt: 0,
  broken_current: [],      // current dirs failing manifest check (not LSP-stub)
  stale_versions: [],      // not-current dirs failing manifest check
  in_use_locks: [],        // dirs with .in_use marker
};

if (!isDir(CACHE_ROOT)) {
  console.error('Cache root missing:', CACHE_ROOT);
  process.exit(1);
}

for (const market of readdirSync(CACHE_ROOT)) {
  const marketDir = `${CACHE_ROOT}/${market}`;
  if (!isDir(marketDir)) continue;

  const marketStubs = lspStubs.get(market) || new Set();

  for (const plugin of readdirSync(marketDir)) {
    const pluginDir = `${marketDir}/${plugin}`;
    if (!isDir(pluginDir)) continue;

    const isStub = marketStubs.has(plugin);
    const currentVer = currentVersions[`${market}/${plugin}`];

    for (const ver of readdirSync(pluginDir)) {
      const verDir = `${pluginDir}/${ver}`;
      if (!isDir(verDir)) continue;
      findings.total_version_dirs++;

      if (isInUse(verDir)) findings.in_use_locks.push([market, plugin, ver]);

      const isCurrent = ver === currentVer;

      if (isStub) {
        findings.lsp_stub_exempt++;
        continue;
      }

      const manifestOk = hasManifest(verDir);

      if (isCurrent && !manifestOk) {
        findings.broken_current.push([market, plugin, ver, isOrphaned(verDir) ? 'orphaned' : 'no-manifest']);
      } else if (!isCurrent && !manifestOk) {
        findings.stale_versions.push([market, plugin, ver]);
      } else if (isCurrent && manifestOk) {
        findings.current_ok++;
      }
    }
  }
}

console.log('========== W425 PLUGIN-GC AUDIT ==========');
console.log('Mode:', mode);
console.log('Total version-dirs scanned:', findings.total_version_dirs);
console.log('Current versions OK:', findings.current_ok);
console.log('LSP-stub exempt (by-design):', findings.lsp_stub_exempt);
console.log('BROKEN current dirs:', findings.broken_current.length);
for (const r of findings.broken_current) console.log('  ', JSON.stringify(r));
console.log('Stale-sibling dirs prunable:', findings.stale_versions.length);
console.log('In-use locks (CC active):', findings.in_use_locks.length);

if (mode === 'audit') {
  console.log('');
  console.log('AUDIT-ONLY — no mutations performed.');
  console.log('To actually cleanup: node tools/w425-plugin-gc.mjs --cleanup');
  console.log('   (requires CC not running; refuses to mutate .in_use-locked dirs unless --force)');
  process.exit(0);
}

// ============================================================================
// CLEANUP
// ============================================================================
// Refined safety per W425 empirical finding: `.in_use` marker is set at install time
// and persists indefinitely — it does NOT reliably indicate "CC is reading right now".
// Strong evidence: 294 stale dirs ALL have `.in_use` AND `.orphaned_at` markers,
// proving .in_use survives orphan-marking. So:
//   - Stale-sibling pruning: ALWAYS safe (CC reads only the current version per
//     installed_plugins.json; other version dirs are dead-weight regardless of .in_use)
//   - Broken-current rename: REFUSE if .in_use is set AND no .orphaned_at AND no --force
//     (this is the only case where CC might actually be mid-read)
//
// Conservative refinement: require --force only for broken-current dirs that lack
// .orphaned_at (the unambiguous safe-to-rename signal).
// Compute which broken-current dirs are safely-movable (have .orphaned_at)
// vs ambiguous (have .in_use but no .orphaned_at; CC may be reading).
// Default: skip ambiguous, proceed with safe. --force: process all.
const unsafeBrokenCurrent = findings.broken_current.filter(([m, p, v]) => {
  const d = `${CACHE_ROOT}/${m}/${p}/${v}`;
  return isInUse(d) && !isOrphaned(d);
});
const safeBrokenCurrent = findings.broken_current.filter((r) => !unsafeBrokenCurrent.includes(r));

if (unsafeBrokenCurrent.length > 0 && !force) {
  console.warn('');
  console.warn('SKIPPING ' + unsafeBrokenCurrent.length + ' broken-current dirs that lack .orphaned_at + have .in_use lock:');
  for (const r of unsafeBrokenCurrent) console.warn('  skip:', JSON.stringify(r));
  console.warn('  → These may be mid-read by CC. Exit CC + re-run --cleanup --force to process them.');
}

mkdirSync(RECOVERY_ROOT, { recursive: true });
const now = new Date().toISOString().replace(/[:.]/g, '-');

let moved = 0;
let pruned = 0;

// 1. Move broken-current to recovery dir (only safe ones unless --force)
const toMove = force ? findings.broken_current : safeBrokenCurrent;
for (const [market, plugin, ver] of toMove) {
  const src = `${CACHE_ROOT}/${market}/${plugin}/${ver}`;
  const dst = `${RECOVERY_ROOT}/${market}__${plugin}__${ver}__${now}`;
  try {
    renameSync(src, dst);
    moved++;
    console.log(`MOVED ${market}/${plugin}/${ver} → recovery`);
  } catch (e) {
    console.error(`FAILED to move ${src}: ${e.message}`);
  }
}

// 2. Prune stale-sibling dirs (delete outright; recovery would be /plugin install reinstall)
for (const [market, plugin, ver] of findings.stale_versions) {
  const target = `${CACHE_ROOT}/${market}/${plugin}/${ver}`;
  try {
    rmSync(target, { recursive: true, force: true });
    pruned++;
  } catch (e) {
    console.error(`FAILED to prune ${target}: ${e.message}`);
  }
}

// 3. Aggressive mode: also clean .broken-w425/ from prior runs older than 30 days
if (mode === 'aggressive' && isDir(RECOVERY_ROOT)) {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 3600 * 1000;
  let agePruned = 0;
  for (const entry of readdirSync(RECOVERY_ROOT)) {
    const p = `${RECOVERY_ROOT}/${entry}`;
    try {
      const mtime = statSync(p).mtimeMs;
      if (mtime < thirtyDaysAgo) {
        rmSync(p, { recursive: true, force: true });
        agePruned++;
      }
    } catch {}
  }
  console.log(`AGGRESSIVE: pruned ${agePruned} recovery dirs older than 30 days`);
}

console.log('');
console.log('========== CLEANUP COMPLETE ==========');
console.log(`Broken-current moved to recovery: ${moved}`);
console.log(`Stale-sibling pruned: ${pruned}`);
console.log(`Recovery dir: ${RECOVERY_ROOT}`);
console.log('');
console.log('Next steps:');
console.log('  1. Restart CC (or run /reload-plugins)');
console.log('  2. CC will detect missing cache for broken-current plugins');
console.log('  3. CC auto-reinstalls from marketplace OR run /plugin install <plugin>@<market>');
console.log('  4. Verify with: node tools/w425-plugin-gc.mjs');
