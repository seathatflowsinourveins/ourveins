#!/usr/bin/env node
// tools/eee-checks/t5-sota-drift.mjs — W393.5 (W407) T5 SOTA-drift + memory-tier-arbitration.
//
// Per docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §2 T5
//   + docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 6
//   + Stream B integration at Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:37-75.
//
// Three core responsibilities:
//   (1) SOTA-drift — parse .mcp.json.mcpServers dynamically (skip disabled:true), validate
//       each entry against .eee/precheck-config.json:t5.mcpServers metadata
//       (required|advisory|credential-gated); roster-only in launch-fast, per-server smoke
//       in --deep (TTL=24h cache).
//   (2) Stale-ref scan — CLAUDE.md skill count vs filesystem; .mcp.json _comments for
//       retired server refs (phoenix/graphiti/context7/gitnexus); sca-vN canonical version.
//   (3) Memory-tier arbitration (Stream B) — verify T6 canonical (basic-memory),
//       T3 graph-RAG (cognee + NSSM CogneeMCP), T7 planned (mem0 advisory), T4 retired
//       (graphiti informational), MemoryOS watch (advisory), khoj AGPL HARD-BLOCK.
//       License-risk inventory per memory-tier entry. Memory-drift-eval cadence
//       (recent_activity <7d / bm orphan <30d / cognee smoke <90d / T6 export <90d).
//
// Mode semantics:
//   - launch-fast: roster-validation + stale-ref scans only (no MCP I/O, no NSSM I/O).
//   - deep: adds NSSM service status probe (CogneeMCP), HTTP HEAD smoke for cognee.
//   - repair: same checks as deep; lifecycle mutations remain operator-explicit (no
//     auto-restart of NSSM services from this module).
//
// Return shape (uniform):
//   { tier: 'T5', blocked: [...], healed: [...], advisory: [...] }

import { readFileSync, existsSync, statSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname, isAbsolute, join } from 'node:path';
import { spawnSync } from 'node:child_process';

// ----- helpers ---------------------------------------------------------------

function loadJsonSafe(absPath) {
  try {
    return JSON.parse(readFileSync(absPath, 'utf8'));
  } catch (e) {
    return { __error: String(e?.message || e).slice(0, 240) };
  }
}

function rel(repoRoot, p) {
  return isAbsolute(p) ? p : resolve(repoRoot, p);
}

function readState(stateFileAbs) {
  if (!existsSync(stateFileAbs)) return {};
  try { return JSON.parse(readFileSync(stateFileAbs, 'utf8')); }
  catch { return {}; }
}

function writeStateBestEffort(stateFileAbs, obj) {
  try {
    mkdirSync(dirname(stateFileAbs), { recursive: true });
    writeFileSync(stateFileAbs, JSON.stringify(obj, null, 2));
  } catch { /* best-effort; do not block on state-write */ }
}

// ----- (A) parse + validate .mcp.json ----------------------------------------

function loadMcpJson(repoRoot) {
  const mcpPath = resolve(repoRoot, '.mcp.json');
  if (!existsSync(mcpPath)) return { servers: {}, comments: {}, present: false };
  const raw = loadJsonSafe(mcpPath);
  if (raw.__error) return { servers: {}, comments: {}, present: true, error: raw.__error };
  const servers = raw.mcpServers || {};
  const comments = {
    ...(raw._comments || {}),
    ...(raw._comments_addendum || {}),
  };
  return { servers, comments, present: true };
}

function rosterValidate(mcpServers, t5Config, mode) {
  const blocked = [];
  const advisory = [];
  const metadata = t5Config.mcpServers || {};

  // Enabled = entry exists AND disabled !== true (per design §2 T5 "skip disabled:true").
  const enabledNames = Object.keys(mcpServers).filter(n => mcpServers[n].disabled !== true);
  const disabledNames = Object.keys(mcpServers).filter(n => mcpServers[n].disabled === true);

  // Roster drift: entry in .mcp.json without metadata in t5.mcpServers.
  for (const name of enabledNames) {
    if (!metadata[name]) {
      advisory.push({
        code: 'A-T5-MCP-UNKNOWN',
        detail: `.mcp.json server '${name}' has no metadata in .eee/precheck-config.json:t5.mcpServers`,
      });
    }
  }

  // Reverse drift: metadata for a server that is no longer wired (or is disabled) in .mcp.json.
  // Codex r1 P1#2 fix: required-but-absent BLOCKS in --deep/--repair; advisory in launch-fast
  // (launch-fast is the smoke-free fast path; absence in fast-path is informational).
  for (const name of Object.keys(metadata)) {
    const meta = metadata[name];
    const entry = mcpServers[name];
    // Treat disabled-true as absent for category enforcement (design §2 T5 "skip disabled:true").
    const effectivelyAbsent = !entry || entry.disabled === true;
    if (effectivelyAbsent) {
      if (meta.category === 'required' && (mode === 'deep' || mode === 'repair')) {
        blocked.push({
          code: 'B-T5-MCP-REQUIRED-ABSENT',
          detail: `Required MCP '${name}' is ${entry?.disabled ? 'disabled' : 'absent'} in .mcp.json.mcpServers`,
          remediation: `Restore the '${name}' entry in .mcp.json (set disabled=false OR re-add the mcpServers stanza) per W393 design §2 T5 required-server roster.`,
        });
      } else {
        advisory.push({
          code: 'A-T5-MCP-WIRE-MISSING',
          detail: `t5.mcpServers metadata exists for '${name}' but ${entry?.disabled ? 'entry is disabled' : 'no .mcp.json entry'} (category=${meta.category || 'unset'})`,
        });
      }
    }
  }

  // Credential-gated: surface missing creds as advisory (NOT block — design §2 T5).
  for (const name of enabledNames) {
    const meta = metadata[name];
    if (meta?.credentialEnv && !process.env[meta.credentialEnv]) {
      advisory.push({
        code: 'A-T5-MCP-CREDENTIAL-MISSING',
        detail: `MCP '${name}' needs env '${meta.credentialEnv}'; smoke gates down`,
      });
    }
  }

  return { blocked, advisory, enabledNames, disabledNames };
}

// ----- (B) stale-ref scans ---------------------------------------------------

function staleRefScan(repoRoot, t5Config, mcpComments) {
  const advisory = [];
  const cfg = t5Config.staleRefScan || {};

  // (1) CLAUDE.md skill count vs filesystem.
  if (cfg.claudeMdSkillCountFile && cfg.skillsDir && cfg.claudeMdSkillCountRegex) {
    const claudeMdAbs = rel(repoRoot, cfg.claudeMdSkillCountFile);
    const skillsAbs = rel(repoRoot, cfg.skillsDir);
    let claimed = null;
    let observed = null;
    try {
      const text = readFileSync(claudeMdAbs, 'utf8');
      const m = new RegExp(cfg.claudeMdSkillCountRegex).exec(text);
      if (m) claimed = Number(m[1]);
    } catch { /* CLAUDE.md may not be readable in worktree edge cases */ }
    if (existsSync(skillsAbs)) {
      try {
        const excl = Array.isArray(cfg.skillCountExcludePrefixes) ? cfg.skillCountExcludePrefixes : [];
        observed = readdirSync(skillsAbs, { withFileTypes: true })
          .filter(d => d.isDirectory())
          .filter(d => !excl.some(p => d.name.startsWith(p)))
          .length;
      } catch { /* fs read error; non-fatal */ }
    }
    if (claimed !== null && observed !== null && claimed !== observed) {
      advisory.push({
        code: 'A-T5-STALE-CLAUDE-MD-SKILL-COUNT',
        detail: `CLAUDE.md claims ${claimed} active skills; filesystem has ${observed} (delta=${observed - claimed})`,
      });
    }
  }

  // (2) .mcp.json _comments references to retired servers.
  const retired = Array.isArray(cfg.retiredServerNames) ? cfg.retiredServerNames : [];
  if (retired.length && mcpComments && Object.keys(mcpComments).length) {
    // Flatten all _comments string values + key names into a single haystack.
    const haystackParts = [];
    for (const [k, v] of Object.entries(mcpComments)) {
      haystackParts.push(k);
      if (typeof v === 'string') haystackParts.push(v);
    }
    const haystack = haystackParts.join(' ');
    for (const name of retired) {
      // Word-boundary, case-insensitive.
      const re = new RegExp(`\\b${name.replace(/[-/\\^$*+?.()|[\\]{}]/g, '\\$&')}\\b`, 'i');
      if (re.test(haystack)) {
        advisory.push({
          code: 'A-T5-STALE-MCP-COMMENT-REF',
          detail: `.mcp.json _comments still references retired server '${name}'`,
        });
      }
    }
  }

  // (3) sca-vN canonical version drift.
  if (cfg.scaTelemetryFile && cfg.scaTelemetryRegex && cfg.scaCanonicalVersion) {
    const scaAbs = rel(repoRoot, cfg.scaTelemetryFile);
    if (existsSync(scaAbs)) {
      try {
        const text = readFileSync(scaAbs, 'utf8');
        const m = new RegExp(cfg.scaTelemetryRegex).exec(text);
        if (m) {
          const declared = `sca-${m[1]}`;
          if (declared !== cfg.scaCanonicalVersion) {
            advisory.push({
              code: 'A-T5-SCA-DRIFT',
              detail: `${cfg.scaTelemetryFile} declares '${declared}' but canonical is '${cfg.scaCanonicalVersion}'`,
            });
          }
        }
      } catch { /* non-fatal */ }
    }
  }

  return { advisory };
}

// ----- (C) memory-tier arbitration -------------------------------------------

function memoryTierArbitration({ mcpServers, t5Config, mode, env }) {
  const blocked = [];
  const advisory = [];
  const informational = [];
  const tiers = t5Config.memoryTiers || {};

  // Drop bookkeeping _about key.
  const tierKeys = Object.keys(tiers).filter(k => !k.startsWith('_'));

  // Codex r1 P2 fix: helper — treats `disabled:true` as absent (per design §2 T5
  // "skip disabled:true"). Memory-tier arbitration must respect this rule so that
  // (a) disabled basic-memory/cognee surface as missing-canonical (block), and
  // (b) disabled khoj does NOT trip the AGPL hard-block (entry is gated out).
  function isEffectivelyPresent(name) {
    const e = mcpServers[name];
    return !!(e && e.disabled !== true);
  }

  // License-risk inventory (wired = effectively present, not just defined).
  const licenseInventory = [];
  for (const key of tierKeys) {
    const tier = tiers[key];
    licenseInventory.push({
      tier: key,
      name: tier.name,
      role: tier.role,
      license: tier.license || 'UNCONFIRMED',
      wired: isEffectivelyPresent(tier.expectedMcpEntry),
    });
  }

  // (a) khoj AGPL HARD-BLOCK if present (and not disabled — codex r1 P2 fix).
  const khoj = tiers.khoj;
  if (khoj && isEffectivelyPresent(khoj.expectedMcpEntry)) {
    blocked.push({
      code: 'B-T5-AGPL-KHOJ-PRESENT',
      detail: `khoj MCP entry detected in .mcp.json (AGPL-3.0 HIGH risk; no MCP server; legal review needed)`,
      remediation: `Remove the '${khoj.expectedMcpEntry}' entry from .mcp.json.mcpServers. Cite W393 SOTA Stream B AGPL gate at Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:47.`,
    });
  }

  // (b) T6 canonical: required basic-memory presence (disabled=absent — codex r1 P2 fix).
  const T6 = tiers.T6;
  if (T6) {
    const entry = mcpServers[T6.expectedMcpEntry];
    const present = isEffectivelyPresent(T6.expectedMcpEntry);
    if (!present) {
      // T6 canonical is required.
      blocked.push({
        code: 'B-T5-MEMORY-T6-MISSING',
        detail: `T6 canonical '${T6.expectedMcpEntry}' missing from .mcp.json.mcpServers`,
        remediation: `Restore the basic-memory MCP entry per W295-codex-r16+ smoke-gated config. See .mcp.json:basic-memory (uvx pinned ${T6.declaredVersion || '0.21.4'}).`,
      });
    } else if (T6.declaredVersion) {
      // Version-pin drift advisory (uvx-from arg form contains `<pkg>==<ver>` OR pinned arg).
      const argsStr = JSON.stringify(entry.args || []);
      if (!argsStr.includes(T6.declaredVersion)) {
        advisory.push({
          code: 'A-T5-MEMORY-T6-VERSION-DRIFT',
          detail: `T6 basic-memory: declared ${T6.declaredVersion} not present in .mcp.json args (${argsStr.slice(0, 120)})`,
        });
      }
    }
    if (T6.agplSubprocessWrap) {
      // AGPL subprocess-wrap compliance advisory.
      advisory.push({
        code: 'A-T5-MEMORY-T6-AGPL-COMPLIANCE',
        detail: `T6 basic-memory AGPL-3.0: subprocess-wrap mitigates viral risk (uvx stdio child; not network-service). Periodic legal-review recommended.`,
      });
    }
  }

  // (c) T3 graph-RAG: required cognee MCP entry + NSSM CogneeMCP status (in --deep).
  // Codex r1 P2 fix: disabled=absent for memory-tier wiring.
  const T3 = tiers.T3;
  if (T3) {
    const present = isEffectivelyPresent(T3.expectedMcpEntry);
    if (!present) {
      blocked.push({
        code: 'B-T5-MEMORY-T3-MISSING',
        detail: `T3 graph-RAG '${T3.expectedMcpEntry}' missing or disabled in .mcp.json.mcpServers`,
        remediation: `Restore the cognee MCP entry per W263b (set disabled=false or re-add); backing NSSM service '${T3.nssmService}' at http://127.0.0.1:8000/mcp.`,
      });
    } else if (mode !== 'launch-fast' && T3.nssmService) {
      // Deep mode: probe NSSM service status (Windows-only; gracefully skip if nssm absent).
      const nssmRes = spawnSync('nssm', ['status', T3.nssmService], {
        encoding: 'utf8', timeout: 5000, windowsHide: true,
      });
      if (nssmRes.error && nssmRes.error.code === 'ENOENT') {
        advisory.push({
          code: 'A-T5-MEMORY-T3-NSSM-ABSENT',
          detail: `NSSM not on PATH; cannot probe '${T3.nssmService}' status`,
        });
      } else if (nssmRes.status !== 0) {
        advisory.push({
          code: 'A-T5-MEMORY-T3-NSSM-NOT-RUNNING',
          detail: `NSSM '${T3.nssmService}' status=${(nssmRes.stdout || '').trim() || 'unknown'} (stderr=${(nssmRes.stderr || '').trim().slice(0, 120)})`,
        });
      } else {
        const out = (nssmRes.stdout || '').trim();
        if (!/SERVICE_RUNNING/i.test(out)) {
          advisory.push({
            code: 'A-T5-MEMORY-T3-NSSM-NOT-RUNNING',
            detail: `NSSM '${T3.nssmService}' status='${out}' (expected SERVICE_RUNNING)`,
          });
        }
      }
    }
  }

  // (d) T7 planned: mem0 advisory. (disabled=absent for advisory eval; codex r1 P2.)
  const T7 = tiers.T7;
  if (T7) {
    if (!isEffectivelyPresent(T7.expectedMcpEntry)) {
      advisory.push({
        code: 'A-T5-MEMORY-T7-PLANNED',
        detail: `T7 planned '${T7.expectedMcpEntry}' not yet wired (advisory until W389 P0a #5 lands; LoCoMo 91.6 / LongMemEval 94.8 / BEAM(1M) 64.1)`,
      });
    } else if (T7.oauthRequired) {
      advisory.push({
        code: 'A-T5-MEMORY-T7-OAUTH',
        detail: `T7 mem0 wired; verify OAuth config (HTTP-only mcp.mem0.ai/mcp/)`,
      });
    }
  }

  // (e) T4 retired: graphiti informational. (disabled=absent — codex r1 P2.)
  const T4 = tiers.T4;
  if (T4) {
    if (isEffectivelyPresent(T4.expectedMcpEntry)) {
      informational.push({
        code: 'I-T5-MEMORY-T4-PRESENT',
        detail: `T4 retired '${T4.expectedMcpEntry}' is still wired (informational; reinstatement requires FalkorDB :16379 restart + temporal-deprecation use-case)`,
      });
    } else {
      informational.push({
        code: 'I-T5-MEMORY-T4-RETIRED',
        detail: `T4 retired '${T4.expectedMcpEntry}' is absent (informational; W295 AI-5 retirement holds)`,
      });
    }
  }

  // (f) MemoryOS watch-list. (disabled=absent — codex r1 P2.)
  const memoryos = tiers.MemoryOS;
  if (memoryos && isEffectivelyPresent(memoryos.expectedMcpEntry)) {
    advisory.push({
      code: 'A-T5-MEMORY-MEMORYOS-WATCH',
      detail: `MemoryOS-MCP entry detected; license UNCONFIRMED — verify before promoting to T7 (EMNLP 2025; LoCoMo +49.11% F1)`,
    });
  }

  // (g) License inventory advisory if any UNCONFIRMED entries surface.
  const unconfirmed = licenseInventory.filter(r => r.license === 'UNCONFIRMED' && r.wired);
  for (const row of unconfirmed) {
    advisory.push({
      code: 'A-T5-MEMORY-LICENSE-UNCONFIRMED',
      detail: `Memory-tier '${row.tier}' (${row.name}) license=UNCONFIRMED but wired — legal-review required`,
    });
  }

  // Surface informational as advisory entries (uniform return shape; informational items use I- prefix).
  return { blocked, advisory: [...advisory, ...informational], licenseInventory };
}

// ----- (D) memory-drift-eval cadence -----------------------------------------

function memoryDriftCadence(t5Config, repoRoot) {
  const advisory = [];
  const cadence = t5Config.memoryDriftCadence;
  if (!cadence?.stateFile || !cadence?.windows) return { advisory };

  const stateFileAbs = rel(repoRoot, cadence.stateFile);
  const state = readState(stateFileAbs);
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const windows = cadence.windows;

  function check(key, windowDays, label) {
    const ts = state[key];
    if (!ts || typeof ts !== 'number') {
      advisory.push({
        code: 'A-T5-MEMORY-CADENCE-STALE',
        detail: `${label} cadence: state '${key}' missing/never-run (window ${windowDays}d) — recommend running tracker now`,
      });
      return;
    }
    const ageDays = (now - ts) / day;
    if (ageDays > windowDays) {
      advisory.push({
        code: 'A-T5-MEMORY-CADENCE-STALE',
        detail: `${label} cadence: last run ${ageDays.toFixed(1)}d ago (window ${windowDays}d)`,
      });
    }
  }

  if (windows.recentActivityDays) check('recentActivity', windows.recentActivityDays, 'basic-memory recent_activity');
  if (windows.bmOrphanDays) check('bmOrphan', windows.bmOrphanDays, 'basic-memory orphan + mem0 top-50');
  if (windows.cogneeSmokeDays) check('cogneeSmoke', windows.cogneeSmokeDays, 'cognee version-bump smoke');
  if (windows.t6ExportIntegrityDays) check('t6Export', windows.t6ExportIntegrityDays, 'T6 export integrity');

  return { advisory };
}

// ----- runT5 -----------------------------------------------------------------

/**
 * runT5 — T5 SOTA-drift + memory-tier arbitration.
 *
 * @param {object} args
 * @param {object} args.config Loaded .eee/precheck-config.json
 * @param {string} args.mode   'launch-fast' | 'deep' | 'repair'
 * @param {string} args.repoRoot Absolute path to the repo root.
 * @param {NodeJS.ProcessEnv} args.env Effective process env.
 * @returns {{tier:string, blocked:Array, healed:Array, advisory:Array}}
 */
export function runT5({ config, mode, repoRoot, env }) {
  const t5 = config?.t5 ?? {};
  const blocked = [];
  const healed = [];
  const advisory = [];

  // (A) Parse .mcp.json.
  const mcp = loadMcpJson(repoRoot);
  if (!mcp.present) {
    blocked.push({
      code: 'B-T5-MCP-JSON-MISSING',
      detail: `.mcp.json not present at repo root`,
      remediation: `Restore .mcp.json from main (git checkout main -- .mcp.json) or operator-restore.`,
    });
    return { tier: 'T5', blocked, healed, advisory };
  }
  if (mcp.error) {
    blocked.push({
      code: 'B-T5-MCP-JSON-PARSE',
      detail: `.mcp.json parse error: ${mcp.error}`,
      remediation: `Run 'node -e "JSON.parse(require(\\'fs\\').readFileSync(\\'.mcp.json\\',\\'utf8\\'))"' to locate the parse error.`,
    });
    return { tier: 'T5', blocked, healed, advisory };
  }

  // (B) Roster validate.
  const roster = rosterValidate(mcp.servers, t5, mode);
  blocked.push(...roster.blocked);
  advisory.push(...roster.advisory);

  // (C) Stale-ref scan.
  const stale = staleRefScan(repoRoot, t5, mcp.comments);
  advisory.push(...stale.advisory);

  // (D) Memory-tier arbitration.
  const tier = memoryTierArbitration({ mcpServers: mcp.servers, t5Config: t5, mode, env });
  blocked.push(...tier.blocked);
  advisory.push(...tier.advisory);

  // (E) Memory-drift-eval cadence (advisory only).
  const cadence = memoryDriftCadence(t5, repoRoot);
  advisory.push(...cadence.advisory);

  // (F) Per-server smoke cache bookkeeping (--deep only). Codex r3 P2 honesty fix:
  //     this W407 ship implements roster-validation + memory-tier arbitration. The
  //     actual per-server `smokeProbe` calls (HTTP HEAD / stdio handshake) are deferred
  //     to W393.7 Wave-3 (block-rules + remediation surface) per the plan; until then
  //     we record a `lastRosterCheckTs` (NOT `lastSmokeTs`) so consumers cannot
  //     misinterpret roster-only verification as a green-smoke claim. The field is
  //     explicitly named to communicate "roster checked, smokes NOT yet performed".
  if (mode !== 'launch-fast' && t5.smokeCacheFile) {
    const cacheAbs = rel(repoRoot, t5.smokeCacheFile);
    const cache = readState(cacheAbs);
    cache.lastRosterCheckTs = Date.now();
    cache.rosterEnabled = roster.enabledNames;
    cache.rosterDisabled = roster.disabledNames;
    cache.perServerSmokeStatus = 'NOT-YET-IMPLEMENTED-W393-7-Wave-3';
    cache.smokeTtlHours = t5.smokeCacheTtlHours ?? 24;
    writeStateBestEffort(cacheAbs, cache);
  }

  return { tier: 'T5', blocked, healed, advisory };
}

export default { runT5 };

// Test-only named exports (no behavioral effect on runT5 path).
export const __testing = {
  loadMcpJson,
  rosterValidate,
  staleRefScan,
  memoryTierArbitration,
  memoryDriftCadence,
};
