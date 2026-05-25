#!/usr/bin/env node
// tools/eee-checks/t4-github.mjs — W393.4 (W406) T4 GitHub state CURRENT-vs-FUTURE
//                                  + pluggable-peer Slot A-E advisory.
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §2 T4 + §6
//   + docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 5
//   + Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:76-101 (Stream C
//     pluggable-peer Slot A-E architecture).
//
// Mode semantics (per plan modes block):
//   - launch-fast: skip entirely (T4 not listed in launch-fast.tiers); no network calls
//                  are permitted in launch-fast per W393 design §2.
//   - deep / repair: full CURRENT-state probes (gh + git + GitHub API + workflow parse)
//                    + FUTURE-state Slot A-E advisory scan.
//
// CURRENT-state checks (block-on-failure):
//   1. `gh auth status` exits 0 (authenticated).
//   2. `git rev-parse origin/main` resolves a SHA.
//   3. ruleset query returns ≥1 active ruleset with the 5 W387 required checks present.
//   4. .github/workflows/codex-review.yml exists + has BOTH skip-on-missing-key form AND
//      fail-only-on-BLOCK guard (honest-reporting behavior per W393 §2 T4).
//   5. Recent merges: `gh pr list --state merged --limit 5` returns ≥1 within 7 days.
//
// FUTURE-state Slot A-E advisory (ADVISORY only; never block; cite W393 §6
// "advisory-until-public-org-transition"):
//   - Slot A (MAF 1.0 orchestration): `agent-framework` pip pkg OR `microsoft/agent-framework`
//                                     plugin → advisory absent.
//   - Slot B (LangGraph stateful graph): `langgraph` pip pkg OR LangGraph MCP entry →
//                                        advisory absent.
//   - Slot C (PydanticAI cross-model tools): `pydantic-ai` pip pkg → advisory absent.
//   - Slot D (Mastra TS A2A bridge): `mastra` npm pkg OR plugin → advisory absent.
//   - Slot E (OpenHands sandbox peer): `openhands-dispatch` MCP entry in .mcp.json →
//                                      advisory if MISSING (W375 expected present).
//
// Slots A-D are NEVER blocking (advisory until org-transition lands the bypass split).
// Slot E surfaces an advisory only when absent (regression detector).
//
// Return shape (uniform per plan §self-review #4):
//   { tier: 'T4', blocked: [...], healed: [...], advisory: [...] }

import { readFileSync, existsSync } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import { spawnSync } from 'node:child_process';

const SUBPROCESS_TIMEOUT_MS = 8000;
// W387 ruleset required-check contexts default (used when config.t4.current.requiredCheckContexts
// is absent). Codex r2 P0 #3 fix: config-defined values take precedence; hardcoded only as
// a fallback so the module remains self-contained for testability.
const DEFAULT_REQUIRED_CHECK_CONTEXTS = [
  'Pre-commit gates',
  'CodeQL javascript-typescript',
  'CodeQL python',
  'commitlint (commit-message discipline)',
  'Codex-Verdict trailer (binding)',
];
const DEFAULT_RECENT_MERGE_WINDOW_DAYS = 7;

function runCmd(cmd, args, { env, cwd, timeoutMs = SUBPROCESS_TIMEOUT_MS } = {}) {
  return spawnSync(cmd, args, {
    encoding: 'utf8',
    timeout: timeoutMs,
    windowsHide: true,
    env,
    cwd,
  });
}

function safeReadJson(stdout) {
  if (!stdout) return null;
  try { return JSON.parse(stdout); }
  catch { return null; }
}

// ---------------------------------------------------------------------------
// CURRENT-state probes
// ---------------------------------------------------------------------------

function checkGhAuth({ env, cwd }) {
  const res = runCmd('gh', ['auth', 'status'], { env, cwd });
  if (res.error || res.status !== 0) {
    return {
      blocked: true,
      detail: `gh auth status non-zero (exit=${res.status}, error=${res.error ? String(res.error.message).slice(0, 120) : 'none'})`,
      remediation: 'Run `gh auth login --scopes repo,workflow,admin:read`.',
    };
  }
  // Soft-check scopes from stderr (gh prints scopes there). Do not block on a missing
  // scope when the active token is a PAT (PATs use `repo`/`workflow` flags but the
  // `gh auth status` line uses different phrasing per token type). Surface as advisory.
  const text = `${res.stdout || ''}\n${res.stderr || ''}`;
  const advisoryScopes = [];
  const expected = ['repo', 'workflow'];
  for (const scope of expected) {
    if (!text.includes(scope)) advisoryScopes.push(scope);
  }
  return { blocked: false, advisoryScopes };
}

function checkGitOriginMain({ env, cwd }) {
  const res = runCmd('git', ['rev-parse', 'origin/main'], { env, cwd });
  if (res.error || res.status !== 0) {
    return {
      blocked: true,
      detail: `git rev-parse origin/main failed: ${(res.stderr || res.stdout || '').slice(0, 200)}`,
      remediation: 'Run `git fetch origin main` to refresh the remote tracking branch.',
    };
  }
  const sha = (res.stdout || '').trim();
  if (!/^[0-9a-f]{7,40}$/.test(sha)) {
    return {
      blocked: true,
      detail: `git rev-parse origin/main returned non-SHA value: '${sha}'`,
      remediation: 'Run `git fetch origin main` and re-verify.',
    };
  }
  return { blocked: false, sha };
}

function checkRebaseInProgress({ repoRoot }) {
  const rebaseMerge = resolve(repoRoot, '.git/rebase-merge');
  const rebaseApply = resolve(repoRoot, '.git/rebase-apply');
  if (existsSync(rebaseMerge) || existsSync(rebaseApply)) {
    return {
      advisory: true,
      detail: `Rebase in progress (.git/rebase-merge or .git/rebase-apply exists). Pre-commit ruleset semantics may behave unexpectedly until rebase completes.`,
    };
  }
  return { advisory: false };
}

function checkRuleset({ env, cwd, config }) {
  const repoSlug = config?.t4?.current?.repoSlug || 'seathatflowsinourveins/claude-sota-installed';
  const res = runCmd('gh', ['api', `repos/${repoSlug}/rulesets`], { env, cwd });
  if (res.error || res.status !== 0) {
    return {
      blocked: true,
      rulesets: null,
      detail: `Ruleset query failed (exit=${res.status}): ${(res.stderr || res.stdout || '').slice(0, 200)}`,
      remediation: `Verify gh has admin:read scope and ${repoSlug} access; re-run \`gh auth refresh -s admin:read\`.`,
    };
  }
  const rulesets = safeReadJson(res.stdout);
  if (!Array.isArray(rulesets) || rulesets.length === 0) {
    return {
      blocked: true,
      detail: `No rulesets returned for ${repoSlug}; W387 main-branch-protection-sota ruleset missing.`,
      remediation: 'Re-apply the W387 ruleset per docs/architecture/W387-RULESET/.',
    };
  }
  const active = rulesets.filter(r => r && r.enforcement === 'active');
  if (active.length === 0) {
    return {
      blocked: true,
      detail: `Rulesets exist but none are enforcement=active.`,
      remediation: 'Activate the W387 ruleset (enforcement: active) via the GitHub UI or `gh api PATCH`.',
    };
  }
  // Probe the FIRST active ruleset for the 5 W387 required checks. Fetch detail to read
  // the `rules[].parameters.required_status_checks[]` shape.
  const rulesetId = active[0].id;
  const detailRes = runCmd('gh', ['api', `repos/${repoSlug}/rulesets/${rulesetId}`], { env, cwd });
  if (detailRes.error || detailRes.status !== 0) {
    return {
      blocked: true,
      detail: `Ruleset detail query failed (exit=${detailRes.status}): ${(detailRes.stderr || detailRes.stdout || '').slice(0, 200)}`,
      remediation: 'Verify gh admin:read scope and ruleset detail readability.',
    };
  }
  const rsDetail = safeReadJson(detailRes.stdout);
  if (!rsDetail || !Array.isArray(rsDetail.rules)) {
    return {
      blocked: true,
      detail: `Ruleset detail malformed (id=${rulesetId}); could not parse rules[]`,
      remediation: 'Inspect `gh api repos/.../rulesets/<id>` output manually; restore ruleset shape.',
    };
  }
  const statusChecksRule = rsDetail.rules.find(r => r && r.type === 'required_status_checks');
  if (!statusChecksRule || !statusChecksRule.parameters
      || !Array.isArray(statusChecksRule.parameters.required_status_checks)) {
    return {
      blocked: true,
      detail: `Ruleset id=${rulesetId} has no required_status_checks rule.`,
      remediation: 'Re-apply W387 ruleset with required_status_checks shape per design spec §2 T4.',
    };
  }
  const presentContexts = statusChecksRule.parameters.required_status_checks
    .map(c => c && c.context)
    .filter(Boolean);
  // Codex r2 P0 #3 fix: honor config-defined required-check contexts. Hardcoded list
  // is the fallback for legacy / test configs that omit the field.
  const requiredContexts = Array.isArray(config?.t4?.current?.requiredCheckContexts)
                           && config.t4.current.requiredCheckContexts.length > 0
    ? config.t4.current.requiredCheckContexts
    : DEFAULT_REQUIRED_CHECK_CONTEXTS;
  const missing = requiredContexts.filter(c => !presentContexts.includes(c));
  if (missing.length > 0) {
    return {
      blocked: true,
      rulesets,
      detail: `Active ruleset missing required checks: ${missing.join(', ')}`,
      remediation: `Reconcile ruleset required_status_checks against the ${requiredContexts.length} W387 contexts per .eee/precheck-config.json:t4.current.requiredCheckContexts.`,
    };
  }
  return { blocked: false, rulesetId, presentContexts, rulesets };
}

function checkCodexReviewWorkflow({ repoRoot }) {
  const wfPath = resolve(repoRoot, '.github/workflows/codex-review.yml');
  if (!existsSync(wfPath)) {
    return {
      blocked: true,
      detail: 'codex-review workflow file missing at .github/workflows/codex-review.yml',
      remediation: 'Restore the codex-review.yml workflow per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §6.',
    };
  }
  let content;
  try { content = readFileSync(wfPath, 'utf8'); }
  catch (e) {
    return {
      blocked: true,
      detail: `Failed to read codex-review.yml: ${e.message}`,
      remediation: 'Verify file readability + permissions.',
    };
  }
  // Honest-behavior probe per W393 §2 T4: workflow MUST currently
  //   (a) SKIP when vars.OPENAI_API_KEY_AVAILABLE != 'true'
  //   (b) FAIL only on `VERDICT: BLOCK` (not REVISE / NEEDS-REVISION).
  // If EITHER is missing, the workflow has been silently hardened and T4's "honest current"
  // statement is stale. Report as advisory (a hardened workflow is still valid; the design
  // spec calls out the planned hardening in §6 POST-W392).
  const skipPattern = /OPENAI_API_KEY_AVAILABLE\s*==\s*['"]true['"]/;
  const blockOnlyPattern = /verdict\s*==\s*['"]BLOCK['"]/i;
  const advisory = [];
  if (!skipPattern.test(content)) {
    advisory.push({
      code: 'A-T4-CODEX-REVIEW-SKIP-DRIFT',
      detail: 'codex-review.yml no longer contains the OPENAI_API_KEY_AVAILABLE skip-gate; workflow has hardened past the W393 §2 T4 "current behavior" snapshot.',
    });
  }
  if (!blockOnlyPattern.test(content)) {
    advisory.push({
      code: 'A-T4-CODEX-REVIEW-FAIL-DRIFT',
      detail: 'codex-review.yml no longer fails ONLY on `verdict == BLOCK`; workflow has hardened to REVISE/NEEDS-REVISION too. Update design spec §2 T4 snapshot.',
    });
  }
  return { blocked: false, advisory };
}

function checkRecentMerges({ env, cwd, config }) {
  // Codex r2 P0 #3 fix: honor config-defined window. Default fallback for legacy configs.
  const windowDays = Number.isFinite(config?.t4?.current?.recentMergeWindowDays)
                     && config.t4.current.recentMergeWindowDays > 0
    ? config.t4.current.recentMergeWindowDays
    : DEFAULT_RECENT_MERGE_WINDOW_DAYS;
  // Compute cutoff date stamp (YYYY-MM-DD) ourselves so we are not subject to gh
  // server-side default behaviors. `gh pr list --search "merged:>=YYYY-MM-DD"` is a
  // first-class form per gh docs.
  const cutoffMs = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  const cutoff = new Date(cutoffMs).toISOString().slice(0, 10);
  const res = runCmd('gh', [
    'pr', 'list',
    '--state', 'merged',
    '--limit', '5',
    '--search', `merged:>=${cutoff}`,
    '--json', 'number,mergedAt',
  ], { env, cwd });
  if (res.error || res.status !== 0) {
    // Treat probe failure as advisory (recency check is informational; missing merges
    // is itself a valid signal that the repo is quiet, not broken).
    return {
      blocked: false,
      advisory: [{
        code: 'A-T4-RECENT-MERGES-PROBE',
        detail: `gh pr list probe non-zero (exit=${res.status}): ${(res.stderr || '').slice(0, 200)}`,
      }],
    };
  }
  const merges = safeReadJson(res.stdout);
  if (!Array.isArray(merges) || merges.length === 0) {
    return {
      blocked: false,
      advisory: [{
        code: 'A-T4-RECENT-MERGES-EMPTY',
        detail: `No merged PRs within the last ${windowDays} days (cutoff ${cutoff}); clean-merge cycle may be stalled.`,
      }],
    };
  }
  return { blocked: false, count: merges.length };
}

// ---------------------------------------------------------------------------
// FUTURE-state advisory probes
// ---------------------------------------------------------------------------
// May-2026 advanced autonomous workflow signals (codex r1 P0 #1):
//   - Copilot Coding Agent enabled
//   - skip-approval setting
//   - 2-ruleset bypass split (Ruleset-A bypassable for Copilot; Ruleset-B non-bypassable)
//   - merge_queue config
// All ADVISORY ALWAYS per W393 §6 advisory-until-public-org-transition.

function checkFutureState({ env, cwd, config, rulesets }) {
  const advisory = [];
  const t4cfg = config?.t4 ?? {};
  const repoSlug = t4cfg.current?.repoSlug || 'seathatflowsinourveins/claude-sota-installed';

  // (a) Copilot Coding Agent enabled — query the repo `copilot/coding-agent` GitHub API
  // surface. This endpoint may not exist for non-public-org repos; treat 404 / non-zero
  // as "absent" advisory (not a probe failure).
  // Per W393 §6 codex r1#9, this remains advisory-only until org transition.
  const cpRes = runCmd('gh', [
    'api', `repos/${repoSlug}/copilot/coding-agent`,
    '--silent',
  ], { env, cwd, timeoutMs: 6000 });
  if (cpRes.error || cpRes.status !== 0) {
    advisory.push({
      code: 'A-T4-FUTURE-COPILOT-AGENT-ABSENT',
      detail: 'Copilot Coding Agent endpoint not enabled (probe exit=' + cpRes.status + '). Advisory-until-public-org-transition per W393 §6.',
    });
  } else {
    advisory.push({
      code: 'A-T4-FUTURE-COPILOT-AGENT-PRESENT',
      detail: 'Copilot Coding Agent endpoint reachable. Advisory per W393 §6 (operator confirms via admin settings).',
    });
  }

  // (b) skip-approval setting — surfaced as advisory-only; no programmatic probe in
  // public gh API as of 2026-03-13 changelog (operator-side admin setting). We surface
  // it as ABSENT-by-default until operator confirms.
  advisory.push({
    code: 'A-T4-FUTURE-SKIP-APPROVAL-PENDING',
    detail: 'skip-approval (https://github.blog/changelog/2026-03-13) is operator-side admin setting; no API probe in current gh CLI. Confirmed via admin UI after org transition.',
  });

  // (c) 2-ruleset bypass split — detect by counting active rulesets. The W393 §6
  // POST-PUBLIC-ORG state is "Ruleset-A main-copilot-bypassable + Ruleset-B
  // main-structural-protection" (2 active rulesets). CURRENT state is 1 active ruleset.
  if (Array.isArray(rulesets)) {
    const active = rulesets.filter(r => r && r.enforcement === 'active');
    if (active.length >= 2) {
      const splitPresent = active.some(r => /bypass/i.test(r.name)) && active.some(r => /structural/i.test(r.name));
      if (splitPresent) {
        advisory.push({
          code: 'A-T4-FUTURE-RULESET-SPLIT-PRESENT',
          detail: `2-ruleset bypass split detected (active=${active.length}). POST-PUBLIC-ORG W393 §6 advanced workflow state.`,
        });
      } else {
        advisory.push({
          code: 'A-T4-FUTURE-RULESET-SPLIT-PARTIAL',
          detail: `${active.length} active rulesets but bypass-split name convention not detected; verify per W389 codex r2#1.`,
        });
      }
    } else {
      advisory.push({
        code: 'A-T4-FUTURE-RULESET-SPLIT-ABSENT',
        detail: `Single-ruleset state (active=${active.length}); 2-ruleset bypass split pending public-org transition per W393 §6.`,
      });
    }
  }

  // (d) Merge-queue precondition probe — GraphQL `branchProtectionRules.nodes[]`.
  // Codex r3 fix: this probe alone CANNOT confirm full merge-queue enablement
  // (GitHub docs distinguish "Require merge queue" from "Require strict status checks":
  //  https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue
  //  https://docs.github.com/en/graphql/reference/objects).
  // We therefore probe ONLY the PRECONDITION (strict-status-checks) and use the
  // advisory code A-T4-FUTURE-MERGE-QUEUE-PRECONDITION-{PRESENT,ABSENT,PROBE-UNAVAILABLE}.
  // A separate full-merge-queue probe is a follow-on enhancement (would need
  // `repository.mergeQueue` field via authenticated GraphQL, currently behind
  // GitHub merge-queue feature flag).
  // Inline GraphQL query — repository(owner, name) literals; no unused query variable
  // (codex r3 #3 fix). The args feed `gh api graphql -f query='...'`.
  const [owner, name] = repoSlug.split('/');
  const mqQueryStr = `query { repository(owner: "${owner}", name: "${name}") { branchProtectionRules(first: 5) { nodes { pattern requiresStrictStatusChecks } } } }`;
  const mqRes = runCmd('gh', ['api', 'graphql', '-f', `query=${mqQueryStr}`], { env, cwd, timeoutMs: 8000 });
  const mqResult = classifyMergeQueueProbe(mqRes);
  advisory.push(mqResult);

  return { advisory };
}

/**
 * Classify a GraphQL merge-queue-precondition probe response into a single advisory.
 * Exported for unit testing per codex r2 P0 #2 fix (injectable command runner).
 *
 * Honest reporting per codex r3: this function classifies the PRECONDITION
 * (`requiresStrictStatusChecks`), not full merge-queue enablement. The full
 * `mergeQueue` field on Repository (and `Branch.branchProtectionRule.requiresMergeQueue`)
 * requires the GitHub merge-queue feature-flag / paid tier and is a follow-on probe.
 *
 * @param {{status?:number, stdout?:string, stderr?:string, error?:Error}} probeRes
 *   spawnSync-shaped result (or compatible mock).
 * @returns {{code:string, detail:string}}
 */
export function classifyMergeQueueProbe(probeRes) {
  // PROBE-UNAVAILABLE: gh GraphQL surface error (404 / 422 schema-error / network).
  if (probeRes.error) {
    return {
      code: 'A-T4-FUTURE-MERGE-QUEUE-PROBE-UNAVAILABLE',
      detail: `merge-queue precondition GraphQL probe error: ${String(probeRes.error.message || probeRes.error).slice(0, 200)}.`,
    };
  }
  if (probeRes.status !== 0) {
    const errText = (probeRes.stderr || probeRes.stdout || '').slice(0, 200);
    if (/schema|field|undefined/i.test(errText)) {
      return {
        code: 'A-T4-FUTURE-MERGE-QUEUE-PROBE-UNAVAILABLE',
        detail: `merge-queue precondition GraphQL field absent (likely unsupported on this gh version or repo tier): ${errText}`,
      };
    }
    return {
      code: 'A-T4-FUTURE-MERGE-QUEUE-PROBE-UNAVAILABLE',
      detail: `merge-queue precondition GraphQL probe non-zero (exit=${probeRes.status}): ${errText}`,
    };
  }
  // PRESENT/ABSENT triage from GraphQL payload.
  const json = safeReadJson(probeRes.stdout);
  if (!json || !json.data || !json.data.repository) {
    return {
      code: 'A-T4-FUTURE-MERGE-QUEUE-PROBE-UNAVAILABLE',
      detail: 'merge-queue precondition GraphQL response missing data.repository; cannot classify.',
    };
  }
  const rules = json.data.repository.branchProtectionRules?.nodes || [];
  const anyStrict = rules.some(n => n && n.requiresStrictStatusChecks === true);
  if (anyStrict) {
    return {
      code: 'A-T4-FUTURE-MERGE-QUEUE-PRECONDITION-PRESENT',
      detail: 'GraphQL branchProtectionRules carry requiresStrictStatusChecks=true on at least one rule; merge-queue PRECONDITION (ALLGREEN strict-checks) IS active. Full merge-queue enablement is a separate setting per https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue and pending public-org transition per W393 §6.',
    };
  }
  return {
    code: 'A-T4-FUTURE-MERGE-QUEUE-PRECONDITION-ABSENT',
    detail: 'No GraphQL branchProtectionRules with requiresStrictStatusChecks=true; merge-queue precondition absent. Pending public-org transition per W393 §6.',
  };
}

// ---------------------------------------------------------------------------
// FUTURE-state Slot A-E advisory
// ---------------------------------------------------------------------------

function probePipPkg(name, { env, cwd }) {
  const res = runCmd('pip', ['show', name], { env, cwd, timeoutMs: 5000 });
  return !res.error && res.status === 0;
}

function probePipPkgWithExtraCapability(pkgName, importTest, { env, cwd }) {
  // Verify pkg presence AND optional-capability extras (codex r1 P0 #2 fix).
  // Slot C cite (Stream C 86): PydanticAI is `pip install pydantic-ai[mcp]` — the [mcp]
  // extra installs the MCP integration deps. We probe by (1) confirming pkg installed,
  // (2) attempting `python -c "<importTest>"` which exits 0 only if extras are wired.
  if (!probePipPkg(pkgName, { env, cwd })) return { present: false, reason: 'pkg-absent' };
  if (!importTest) return { present: true, reason: 'pkg-present-no-extra-check' };
  const res = runCmd('python', ['-c', importTest], { env, cwd, timeoutMs: 8000 });
  if (res.error || res.status !== 0) {
    return { present: false, reason: 'extra-import-failed' };
  }
  return { present: true, reason: 'pkg+extra-present' };
}

function probeNpmGlobalPkg(name, { env, cwd }) {
  // `npm ls -g <pkg> --depth=0` exits 0 with the pkg in output when installed globally.
  const res = runCmd('npm', ['ls', '-g', name, '--depth=0', '--json'], { env, cwd, timeoutMs: 8000 });
  if (res.error) return false;
  const parsed = safeReadJson(res.stdout);
  if (!parsed || !parsed.dependencies) return false;
  return Boolean(parsed.dependencies[name]);
}

// Parse-error-aware loaders (codex r1 P1 #3 fix — no silent fallbacks for malformed
// state files; surface as a parse-error advisory so the operator sees the failure mode).
function loadInstalledPlugins({ repoRoot }) {
  const p = resolve(repoRoot, '.claude/plugins/installed_plugins.json');
  if (!existsSync(p)) return { data: {}, parseError: null, present: false };
  try {
    const raw = readFileSync(p, 'utf8');
    const json = JSON.parse(raw);
    if (!json || typeof json !== 'object') {
      return { data: {}, parseError: 'installed_plugins.json root is not an object', present: true };
    }
    return { data: json, parseError: null, present: true };
  } catch (e) {
    return { data: {}, parseError: `installed_plugins.json parse failed: ${e.message}`, present: true };
  }
}

function loadMcpJson({ repoRoot }) {
  const p = resolve(repoRoot, '.mcp.json');
  if (!existsSync(p)) return { data: { mcpServers: {} }, parseError: null, present: false };
  try {
    const raw = readFileSync(p, 'utf8');
    const json = JSON.parse(raw);
    if (!json || typeof json !== 'object') {
      return { data: { mcpServers: {} }, parseError: '.mcp.json root is not an object', present: true };
    }
    return { data: json, parseError: null, present: true };
  } catch (e) {
    return { data: { mcpServers: {} }, parseError: `.mcp.json parse failed: ${e.message}`, present: true };
  }
}

function hasInstalledPluginMatching(plugins, regex) {
  // .claude/plugins/installed_plugins.json structure (per actual file inspection):
  //   { "version": 2, "plugins": { "<id>@<marketplace>": [ { ... } ] } }
  const reg = plugins?.plugins;
  if (!reg || typeof reg !== 'object') return false;
  for (const key of Object.keys(reg)) {
    if (regex.test(key)) return true;
  }
  return false;
}

function checkSlotPresence({ slot, env, cwd, repoRoot, plugins, mcp }) {
  // Returns { present: bool, detail: string } per slot. Probes are honored from the
  // config-level `slot.probe` object when present, with sensible defaults that match
  // Stream C spec exactly (codex r1 P0 #2 fix).
  const probe = slot.probe || {};
  switch (slot.id) {
    case 'A': {
      // Stream C Slot A: MAF 1.0 — `agent-framework` pip pkg OR `microsoft/agent-framework` plugin.
      const pipPkg = probe.pipPkg || 'agent-framework';
      const pluginRegex = new RegExp(probe.pluginRegex || 'agent-framework|microsoft.*agent-framework', 'i');
      const pkgPresent = probePipPkg(pipPkg, { env, cwd });
      const pluginPresent = hasInstalledPluginMatching(plugins, pluginRegex);
      return {
        present: pkgPresent || pluginPresent,
        detail: `pip pkg ${pipPkg}=${pkgPresent ? 'present' : 'absent'}, plugin=${pluginPresent ? 'present' : 'absent'}`,
      };
    }
    case 'B': {
      // Stream C Slot B: LangGraph — `langgraph` + `langgraph-checkpoint-postgres` OR
      // LangGraph MCP wrapping. Bare `langgraph` alone is NOT sufficient (per codex
      // r1 P0 #2 — Stream C requires the checkpoint backend for stateful execution).
      const corePkg = probe.pipPkg || 'langgraph';
      const checkpointPkg = probe.checkpointPkg || 'langgraph-checkpoint-postgres';
      const mcpRegex = new RegExp(probe.mcpRegex || 'langgraph', 'i');
      const corePresent = probePipPkg(corePkg, { env, cwd });
      const checkpointPresent = probePipPkg(checkpointPkg, { env, cwd });
      const mcpEntries = Object.keys(mcp.mcpServers || {});
      const mcpPresent = mcpEntries.some(k => mcpRegex.test(k));
      const pipPairPresent = corePresent && checkpointPresent;
      const overall = pipPairPresent || mcpPresent;
      return {
        present: overall,
        detail: `pip ${corePkg}=${corePresent ? 'present' : 'absent'}, ${checkpointPkg}=${checkpointPresent ? 'present' : 'absent'}, mcp=${mcpPresent ? 'present' : 'absent'} (Stream C requires pip pair AND/OR mcp)`,
      };
    }
    case 'C': {
      // Stream C Slot C: PydanticAI — `pydantic-ai[mcp]` (the [mcp] extra). Verify the
      // extra is wired by attempting `python -c "from pydantic_ai.mcp import ..."` —
      // import success implies the extra was installed (codex r1 P0 #2 fix).
      const pipPkg = probe.pipPkg || 'pydantic-ai';
      const importTest = probe.extraImportTest || 'import pydantic_ai.mcp';
      const result = probePipPkgWithExtraCapability(pipPkg, importTest, { env, cwd });
      return {
        present: result.present,
        detail: `pip ${pipPkg}=${result.reason} (Stream C requires pydantic-ai[mcp] extra)`,
      };
    }
    case 'D': {
      // Stream C Slot D: Mastra (TS) — `mastra` npm pkg OR mastra plugin.
      const npmPkg = probe.npmGlobalPkg || 'mastra';
      const pluginRegex = new RegExp(probe.pluginRegex || '\\bmastra\\b', 'i');
      const pkgPresent = probeNpmGlobalPkg(npmPkg, { env, cwd });
      const pluginPresent = hasInstalledPluginMatching(plugins, pluginRegex);
      return {
        present: pkgPresent || pluginPresent,
        detail: `npm pkg ${npmPkg}=${pkgPresent ? 'present' : 'absent'}, plugin=${pluginPresent ? 'present' : 'absent'}`,
      };
    }
    case 'E': {
      // Stream C Slot E: OpenHands — `openhands-dispatch` MCP entry (W375; PRESENT-expected).
      const mcpRegex = new RegExp(probe.mcpRegex || 'openhands-dispatch', 'i');
      const mcpEntries = Object.keys(mcp.mcpServers || {});
      const mcpPresent = mcpEntries.some(k => mcpRegex.test(k));
      return {
        present: mcpPresent,
        detail: `mcp entry matching /${mcpRegex.source}/=${mcpPresent ? 'present' : 'absent'}`,
      };
    }
    default:
      return { present: false, detail: `unknown slot id ${slot.id}` };
  }
}

// ---------------------------------------------------------------------------
// runT4 entry point
// ---------------------------------------------------------------------------

/**
 * runT4 — T4 GitHub state CURRENT-vs-FUTURE + Slot A-E pluggable-peer advisory.
 *
 * @param {object} args
 * @param {object} args.config Loaded .eee/precheck-config.json
 * @param {string} args.mode   'launch-fast' | 'deep' | 'repair'
 * @param {string} args.repoRoot Absolute path to the repo root.
 * @param {NodeJS.ProcessEnv} args.env Effective process env.
 * @returns {{tier:string, blocked:Array, healed:Array, advisory:Array}}
 */
export function runT4({ config, mode, repoRoot, env }) {
  const blocked = [];
  const healed = [];
  const advisory = [];

  // T4 is gated to network modes. launch-fast must skip per W393 §2 design (T4 not in
  // launch-fast.tiers); if invoked accidentally, no-op with a single advisory.
  if (mode === 'launch-fast') {
    advisory.push({
      code: 'A-T4-SKIPPED-LAUNCH-FAST',
      detail: 'T4 GitHub-state checks skipped in launch-fast mode (no network per W393 §2).',
    });
    return { tier: 'T4', blocked, healed, advisory };
  }

  const t4cfg = config?.t4 ?? {};
  const cwd = repoRoot;
  const probeOpts = { env, cwd, repoRoot, config };

  // -- CURRENT-state ------------------------------------------------------
  // 1. gh auth status
  const ghAuth = checkGhAuth(probeOpts);
  if (ghAuth.blocked) {
    blocked.push({ code: 'B-T4-GH-AUTH', detail: ghAuth.detail, remediation: ghAuth.remediation });
  } else if (ghAuth.advisoryScopes && ghAuth.advisoryScopes.length > 0) {
    advisory.push({
      code: 'A-T4-GH-SCOPES',
      detail: `gh auth status did not surface expected scopes: ${ghAuth.advisoryScopes.join(', ')} (PAT-bearer may use scope-flag form).`,
    });
  }

  // 2. git origin/main reachable
  const gitMain = checkGitOriginMain(probeOpts);
  if (gitMain.blocked) {
    blocked.push({ code: 'B-T4-ORIGIN-MAIN', detail: gitMain.detail, remediation: gitMain.remediation });
  }

  // 2a. Rebase-in-progress advisory (not blocking — pre-commit hooks handle that path).
  const rebase = checkRebaseInProgress(probeOpts);
  if (rebase.advisory) {
    advisory.push({ code: 'A-T4-REBASE-IN-PROGRESS', detail: rebase.detail });
  }

  // 3. Ruleset query — only if gh auth OK (depends on `gh api`).
  let rulesetsForFuture = null;
  if (!ghAuth.blocked) {
    const ruleset = checkRuleset({ ...probeOpts });
    if (ruleset.blocked) {
      blocked.push({ code: 'B-T4-RULESET', detail: ruleset.detail, remediation: ruleset.remediation });
    }
    // Even on block we propagate the rulesets array if the probe returned data, so the
    // FUTURE-state 2-ruleset bypass-split check can run independently.
    rulesetsForFuture = ruleset.rulesets ?? null;
  }

  // 4. codex-review workflow honest-behavior probe
  const codexWf = checkCodexReviewWorkflow(probeOpts);
  if (codexWf.blocked) {
    blocked.push({ code: 'B-T4-CODEX-REVIEW', detail: codexWf.detail, remediation: codexWf.remediation });
  } else if (Array.isArray(codexWf.advisory)) {
    for (const a of codexWf.advisory) advisory.push(a);
  }

  // 5. Recent merges — informational; do not block on quiet repo.
  if (!ghAuth.blocked) {
    const merges = checkRecentMerges({ ...probeOpts, config });
    if (Array.isArray(merges.advisory)) for (const a of merges.advisory) advisory.push(a);
  }

  // -- FUTURE-state advisory (May-2026 advanced autonomous workflow) -----
  // Codex r1 P0 #1 fix: explicit A-T4-FUTURE-* probes for Copilot Coding Agent,
  // skip-approval, 2-ruleset bypass split, merge_queue. ADVISORY ALWAYS per W393 §6.
  if (!ghAuth.blocked) {
    const futureResult = checkFutureState({ env, cwd, config, rulesets: rulesetsForFuture });
    for (const a of futureResult.advisory) advisory.push(a);
  }

  // -- FUTURE-state Slot A-E advisory ------------------------------------
  // ALWAYS advisory; never block (per W393 §6 advisory-until-public-org-transition for
  // Slot A-D; Slot E is regression-detector — surfaces an advisory only when missing).
  const slots = Array.isArray(t4cfg.slots) && t4cfg.slots.length > 0
    ? t4cfg.slots
    : [
        { id: 'A', name: 'MAF 1.0 orchestration' },
        { id: 'B', name: 'LangGraph stateful graph' },
        { id: 'C', name: 'PydanticAI cross-model tools' },
        { id: 'D', name: 'Mastra TS A2A bridge' },
        { id: 'E', name: 'OpenHands sandbox peer' },
      ];

  // Codex r1 P1 #3 fix: surface parse errors as advisory (no silent fallback to empty
  // registries). A malformed .mcp.json / installed_plugins.json is operator-actionable
  // state; eee-precheck must flag it instead of returning false-negatives for every slot.
  const pluginsLoaded = loadInstalledPlugins(probeOpts);
  if (pluginsLoaded.parseError) {
    advisory.push({
      code: 'A-T4-INSTALLED-PLUGINS-PARSE-ERROR',
      detail: pluginsLoaded.parseError,
    });
  }
  const mcpLoaded = loadMcpJson(probeOpts);
  if (mcpLoaded.parseError) {
    advisory.push({
      code: 'A-T4-MCP-JSON-PARSE-ERROR',
      detail: mcpLoaded.parseError,
    });
  }

  for (const slot of slots) {
    const result = checkSlotPresence({
      slot, env, cwd, repoRoot,
      plugins: pluginsLoaded.data,
      mcp: mcpLoaded.data,
    });
    if (slot.id === 'E') {
      // Slot E: PRESENT-expected per W375 (openhands-dispatch already wired).
      // Surface an advisory only when MISSING.
      if (!result.present) {
        advisory.push({
          code: 'A-T4-SLOT-E-MISSING',
          detail: `Slot E (${slot.name}) MISSING — expected per W375 wiring (openhands-dispatch MCP entry absent). ${result.detail}.`,
        });
      }
      // (Present → silently OK; no advisory noise.)
    } else {
      // Slots A-D: ADVISORY ALWAYS per W393 §6 (regardless of presence). Convey the
      // absent/present state so operators can audit pluggable-peer readiness.
      const status = result.present ? 'PRESENT' : 'ABSENT';
      advisory.push({
        code: `A-T4-SLOT-${slot.id}-${status}`,
        detail: `Slot ${slot.id} (${slot.name}) ${status} — ${result.detail}. Advisory-until-public-org-transition per W393 §6.`,
      });
    }
  }

  return { tier: 'T4', blocked, healed, advisory };
}

export default { runT4 };
