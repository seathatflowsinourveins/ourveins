// tools/research-arch-v23/angles/repomix-angle.mjs
// A6 — repomix MCP wrapper for code-content ingest.
// MCP-client-injected via options.mcpClient; falls back to skipped:true if no MCP session.
// Cite-anchor: docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md §2.1 A6.
// Per soul.md §6 fail-CLOSED: missing MCP session => skipped, NOT silent default.

// Language-neutral default pattern covering function/method/class/def/fn definitions
// across JavaScript/TypeScript, Python, Go, Rust, Java, C++/C, Ruby, Swift, Kotlin, PHP.
// Codex r1 REVISE #3 (W441.4): prior default `'export (function|class|const|default)'`
// was JS/TS-biased and missed Python/Go/Rust/Java/Ruby/Swift code-signals entirely.
// Users SHOULD pass `options.pattern` for language-targeted probing (e.g. Python-only
// repos may prefer `'^(?:async\\s+)?def\\s+\\w+'` for tighter signal).
const DEFAULT_PATTERN =
  '(?:^|\\s)(?:export\\s+)?(?:(?:async\\s+)?function\\s+\\w+|class\\s+\\w+|def\\s+\\w+|fn\\s+\\w+|func\\s+\\w+|public\\s+(?:static\\s+)?(?:void|class|int|String|[A-Z]\\w*)\\s+\\w+|private\\s+(?:static\\s+)?\\w+\\s+\\w+|impl\\s+\\w+|trait\\s+\\w+|interface\\s+\\w+|module\\s+\\w+)';

// GitHub canonical owner/repo regex per https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts
//   owner: starts with alphanumeric, may contain hyphens, max 39 chars
//   repo:  alphanumeric + `.`, `_`, `-`, length 1-100
// Tightened from prior `/^[^@\s]+\/[^@\s]+$/` which accepted `owner/repo/extra` (codex r1 REVISE #2 — W441.4).
// Matches sibling registry-angle.mjs:21 GH_OWNER_REPO_RE for cross-angle validation consistency.
const GH_OWNER_REPO_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38})\/[a-zA-Z0-9._-]{1,100}$/;

/**
 * Probe repomix for code-content ingest of a target repo.
 *
 * Fail-CLOSED contract (codex r1 REVISE #1 — W441.4):
 *   - The repomix MCP server has a known silent-fail mode for large repos where
 *     `pack_remote_repository` returns a valid `outputId` BUT `totalFiles: 0`,
 *     meaning the pack is empty and no real code was ingested. Empirically confirmed
 *     in W441 deep-dives across 3-of-3 candidate runs (obra/superpowers,
 *     gpt-researcher, claude-cookbooks). Without this guard the angle would score 0
 *     on a "completed" pack, polluting downstream sca-v23 composites.
 *   - Treat `totalFiles === 0` as a probe failure → null outputId → existing
 *     fail-CLOSED `skipped:true` path fires with explanatory reason.
 *
 * @param {Object} target {kind, identifier, version}
 * @param {Object} options {mcpClient?, dryRun?, pattern?}
 *   @param {string} [options.pattern] - Custom grep pattern for language-targeted
 *     probing. Defaults to a language-neutral multi-language code-signal regex
 *     covering function/class/method/def/fn/impl/trait/interface across
 *     JS/TS/Python/Go/Rust/Java/C++/Ruby. Override for tighter per-language signal.
 * @returns {Promise<Object>} A6 angle result conforming to sca-v23.
 */
export async function probeRepomix(target, options = {}) {
  if (!target || !target.identifier) {
    return {
      name: 'A6_repomix_ingest',
      skipped: true,
      reason: 'invalid target (missing identifier)',
      normalized_score: 0,
      weight: 0.15,
    };
  }

  if (options.dryRun) {
    return {
      name: 'A6_repomix_ingest',
      skipped: true,
      reason: 'dryRun mode',
      normalized_score: 0,
      weight: 0.15,
    };
  }

  if (!options.mcpClient || typeof options.mcpClient.callTool !== 'function') {
    return {
      name: 'A6_repomix_ingest',
      skipped: true,
      reason: 'no MCP session (mcpClient.callTool not available)',
      normalized_score: 0,
      weight: 0.15,
    };
  }

  // repomix MCP pack_remote_repository requires GitHub-canonical owner/repo identifier.
  // Tightened from `/^[^@\s]+\/[^@\s]+$/` per codex r1 REVISE #2 (W441.4) — prior regex
  // accepted `owner/repo/extra`, owners >39 chars, and disallowed-char-containing names.
  if (!GH_OWNER_REPO_RE.test(target.identifier)) {
    return {
      name: 'A6_repomix_ingest',
      skipped: true,
      reason: `identifier ${target.identifier} does not match canonical owner/repo regex ${GH_OWNER_REPO_RE}`,
      normalized_score: 0,
      weight: 0.15,
    };
  }

  const pattern = options.pattern || DEFAULT_PATTERN;
  const probeErrors = [];
  let outputId = null;
  let filesPacked = 0;
  let patternsMatched = [];

  // Probe 1: pack remote repository (compressed for token-efficiency)
  try {
    const packResult = await options.mcpClient.callTool({
      server: 'repomix',
      name: 'pack_remote_repository',
      arguments: { remote: `https://github.com/${target.identifier}`, compress: true },
    });
    outputId = packResult?.outputId || packResult?.id || null;
    filesPacked = packResult?.filesPackaged || packResult?.totalFiles || 0;

    // Codex r1 REVISE #1 (W441.4) — fail-CLOSED on known repomix totalFiles:0 silent-fail bug.
    // Empirically convergent across 3-of-3 W441 deep-dive candidates: a non-null outputId
    // with filesPacked === 0 means the pack ran but ingested nothing (commonly seen on
    // large repos where repomix internal limits trigger silently). Force null outputId so
    // the existing `if (!outputId && probeErrors.length > 0)` skip-path fires.
    if (outputId && filesPacked === 0) {
      probeErrors.push(
        `pack returned outputId=${outputId} with totalFiles=0 (known repomix MCP silent-fail bug for large repos; empirically confirmed W441 3-of-3 deep-dives)`
      );
      outputId = null;
    }
  } catch (err) {
    probeErrors.push(`pack_remote_repository: ${err.message}`);
  }

  // Probe 2: grep extracted patterns from packed output
  if (outputId) {
    try {
      const grepResult = await options.mcpClient.callTool({
        server: 'repomix',
        name: 'grep_repomix_output',
        arguments: { outputId, pattern },
      });
      patternsMatched = (grepResult?.matches || []).slice(0, 20).map(m => m.line || m.text || String(m));
    } catch (err) {
      probeErrors.push(`grep_repomix_output: ${err.message}`);
    }
  }

  // Fail-CLOSED: pack failed entirely (network error, MCP timeout, or totalFiles:0 silent-fail) => no usable output
  if (!outputId && probeErrors.length > 0) {
    return {
      name: 'A6_repomix_ingest',
      skipped: true,
      reason: `pack failed: ${probeErrors.join('; ')}`,
      normalized_score: 0,
      weight: 0.15,
    };
  }

  // Score composite:
  //   filesScore = files-packed quantity (log-scaled to 0-1; substantive repos pack >50 files)
  //   patternBoost = 1.0 if any patterns matched (real code), 0.5 if none (sparse repo)
  const filesScore = Math.min(1.0, filesPacked / 100);
  const patternBoost = patternsMatched.length > 0 ? 1.0 : 0.5;
  const score = filesScore * patternBoost;

  return {
    name: 'A6_repomix_ingest',
    repo: target.identifier,
    packed_output_path: outputId,
    files_packed: filesPacked,
    patterns_extracted: patternsMatched,
    probe_errors: probeErrors.length > 0 ? probeErrors : undefined,
    normalized_score: Number(score.toFixed(3)),
    weight: 0.15,
  };
}
