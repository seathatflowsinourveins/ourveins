// W347 sca-v22 §4 decision-impact telemetry core lib
// CR-2 exempt: tools/lib/* are not hook bodies (hooks live under .claude/hooks/**).
// Anchors: Anthropic claude-cookbooks evaluator-optimizer + Google SRE Ch.4 SLO + Wilson 1927.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export const STATE_PATH = 'Z:/claude-sota-installed/.claude/state/sca-decision-outcomes.json';
export const SLO_EFFECTIVENESS_RATIO = 0.80; // 80% effectiveness target (Google SRE Ch.4)
export const OUTCOME_TRACKED_AFTER_N_WAVES = 3;

// pre-v22 denoms (historical per SKILL.md §10)
export const DENOM_INSTALL_V16 = 46.9;
export const DENOM_PATTERN_V16 = 21.8;
// sca-v22 denoms (current — placeholder; operator updates per §10 codify)
export const DENOM_INSTALL_V17 = 48.5;
export const DENOM_PATTERN_V17 = 22.8;

// Required ledger fields per sca-v22 §10 (subset enforced; extra fields preserved)
export const REQUIRED_FIELDS = [
  'slug', 'wave', 'verdict', 'install_score', 'pattern_score',
  'rule_version', 'mcp_family_attribution', 'date',
];

export async function loadState() {
  try {
    const buf = await readFile(STATE_PATH, 'utf8');
    return JSON.parse(buf);
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

export async function saveState(arr) {
  await mkdir(dirname(STATE_PATH), { recursive: true });
  // atomic-ish: write to tmp + rename (Windows-safe per W342-Z L1 rename(2))
  const tmp = `${STATE_PATH}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(arr, null, 2) + '\n', 'utf8');
  const { rename } = await import('node:fs/promises');
  await rename(tmp, STATE_PATH);
}

export function validateDecision(d) {
  const missing = REQUIRED_FIELDS.filter(f => d[f] === undefined || d[f] === null);
  if (missing.length) throw new Error(`Missing required fields: ${missing.join(',')}`);
  if (typeof d.install_score !== 'number' || d.install_score < 0 || d.install_score > 5)
    throw new Error(`install_score must be 0-5, got ${d.install_score}`);
  if (typeof d.pattern_score !== 'number' || d.pattern_score < 0 || d.pattern_score > 5)
    throw new Error(`pattern_score must be 0-5, got ${d.pattern_score}`);
  if (!Array.isArray(d.mcp_family_attribution))
    throw new Error('mcp_family_attribution must be array');
  return true;
}

// Wilson score CI lower bound (1927) — robust small-n binomial proportion CI
export function wilsonLowerBound(successes, total, z = 1.96) {
  if (total === 0) return 0;
  const p = successes / total;
  const denom = 1 + (z * z) / total;
  const center = p + (z * z) / (2 * total);
  const margin = z * Math.sqrt((p * (1 - p) + (z * z) / (4 * total)) / total);
  return (center - margin) / denom;
}

// Re-score under v22 weights (D80 unchanged in v16→v17; placeholder for future rebalance)
// Drift = decision passed under v_prior but fails under v22 (or vice versa)
export function reScoreUnderV17(d) {
  // v16→v22 same dims for now; drift surfaces if rule_version != current
  const currentVersion = 'sca-v22';
  const wasVersion = d.rule_version || 'unknown';
  // Re-evaluate composite vs current denom (scores already normalized)
  // Threshold drift: T1 ≥4.0 install_score under any version
  const drift = wasVersion !== currentVersion;
  return {
    slug: d.slug,
    wave: d.wave,
    prior_version: wasVersion,
    prior_install_score: d.install_score,
    prior_pattern_score: d.pattern_score,
    current_version: currentVersion,
    drift_flagged: drift,
    drift_reason: drift ? `rule_version drift ${wasVersion} → ${currentVersion}` : null,
  };
}
