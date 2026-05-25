// parallel-guard-regex.mjs — W343 P0(b) shared-regex extraction
//
// ROOT CAUSE (W343 P0.b): multi-stream-intent regex constants live as private
// module-internal constants in `tools/parallel-guard-detector.mjs`
// (MULTI_STREAM_RE + MULTI_STREAM_WEAK_PAIR_RE). Consumers that want named
// re-exports under SOTA STRONG_RE / WEAK_PAIR_RE conventions had no central
// import surface — every additional consumer would duplicate the same regex
// source-of-truth, inviting drift (precisely the W341-r3 / r4 dead-code class
// of bug that already cost ~99.67% silent-serial fallback at parallel_ratio
// 0.0033/1828-turn-30d-window per W325-A F1 SEV-1).
//
// THIS MODULE re-exports the canonical regex constants from
// `parallel-guard-detector.mjs` under SOTA-convention names:
//
//   STRONG_RE     — intrinsically multi-stream lexical signals
//   WEAK_PAIR_RE  — weak-verb + quantifier pairs (bidirectional, <=80 chars)
//   MULTI_STREAM_RE — legacy alias retained for any downstream consumer
//                    that imports the original name.
//
// CONSUMERS (post-W343 P0.b):
//   - tools/preagent-parallel-guard.mjs    (PreToolUse[Agent] enforcement)
//   - tools/parallel-guard-userpromptsubmit.mjs (UserPromptSubmit message-
//      level intent capture — currently imports via detector.mjs; safe to
//      migrate to this module in a follow-up wave for consistency.)
//
// Detector.mjs remains the single source of truth for the regex strings; this
// module is a thin alias surface that keeps the SOTA-named imports stable
// even if detector.mjs internals are refactored.
//
// References:
//   - W343-SOTA-UNLEASH P0(b) shared-regex extraction
//   - W341 P0.1 r3+r4 root-cause: per-hook private regex → silent dead-code
//   - CLAUDE.md L19 / W269 / W312-D parallel-dispatch mandate
//   - https://docs.anthropic.com/en/docs/claude-code/hooks (event schema)

import {
  MULTI_STREAM_RE as _MULTI_STREAM_RE,
  MULTI_STREAM_WEAK_PAIR_RE as _MULTI_STREAM_WEAK_PAIR_RE,
} from './parallel-guard-detector.mjs';

// Primary SOTA-convention exports.
export const STRONG_RE = _MULTI_STREAM_RE;
export const WEAK_PAIR_RE = _MULTI_STREAM_WEAK_PAIR_RE;

// Legacy alias — preserved for downstream code already importing the original
// detector-internal name. New code SHOULD prefer STRONG_RE.
export const MULTI_STREAM_RE = _MULTI_STREAM_RE;

// ----------------------------------------------------------------------------
// Smoke-test stub: run `node tools/parallel-guard-regex.mjs` to validate.
// Five paste-ready cases: 3 STRONG hits + 1 WEAK pair + 1 negative.
// Cross-platform main-module detection — Windows `file:///Z:/...` and POSIX
// `file:///path/...` both normalise via URL parsing.
// ----------------------------------------------------------------------------
const _argv1 = process.argv[1] ? process.argv[1].replace(/\\/g, '/') : '';
// Guard against empty argv1 (eval/REPL contexts) where endsWith('') would
// always be true and falsely re-run the smoke-test under any importer.
const _isMain =
  _argv1.length > 0 &&
  (import.meta.url === `file://${_argv1}` ||
    import.meta.url === `file:///${_argv1}` ||
    import.meta.url.endsWith('/' + _argv1.split('/').pop()));
if (_isMain && _argv1.endsWith('parallel-guard-regex.mjs')) {
  const cases = [
    // 1. STRONG: explicit "in parallel"
    {
      label: 'STRONG: in parallel',
      text: 'Please run these tasks in parallel across the codebase.',
      strong: true,
      weak: false,
    },
    // 2. STRONG: stream label
    {
      label: 'STRONG: Stream A label',
      text: 'Stream A handles the regex extraction; Stream B handles the validator.',
      strong: true,
      weak: false,
    },
    // 3. STRONG: fan-out (kept tight to avoid weak-verb collateral matches)
    {
      label: 'STRONG: fan-out only',
      text: 'Use a fan-out for these tasks.',
      strong: true,
      weak: false,
    },
    // 4. WEAK PAIR: audit + across (no STRONG signal alone — "audit" is weak;
    //    "across" makes it a valid pair). We synthesize a sentence where the
    //    STRONG regex does NOT match the verb on its own but the WEAK PAIR
    //    catches the verb+quantifier coupling.
    {
      label: 'WEAK PAIR: audit ... across',
      text: 'Please audit the security posture across the four production services.',
      strong: false,
      weak: true,
    },
    // 5. NEGATIVE: benign solo task (no STRONG, no WEAK pair).
    {
      label: 'NEGATIVE: benign solo task',
      text: 'Read the file at tools/foo.mjs and fix the typo on line 3.',
      strong: false,
      weak: false,
    },
  ];

  let pass = 0;
  let fail = 0;
  for (const c of cases) {
    const gotStrong = STRONG_RE.test(c.text);
    const gotWeak = WEAK_PAIR_RE.test(c.text);
    const ok = gotStrong === c.strong && gotWeak === c.weak;
    if (ok) {
      pass++;
      process.stdout.write(
        `PASS  ${c.label}  (strong=${gotStrong}, weak=${gotWeak})\n`,
      );
    } else {
      fail++;
      process.stdout.write(
        `FAIL  ${c.label}  expected strong=${c.strong} weak=${c.weak}, ` +
          `got strong=${gotStrong} weak=${gotWeak}\n` +
          `      text: ${c.text}\n`,
      );
    }
  }
  process.stdout.write(`\n${pass}/${cases.length} PASS (${fail} fail)\n`);
  process.exit(fail === 0 ? 0 : 1);
}
