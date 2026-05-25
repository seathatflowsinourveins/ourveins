/**
 * commitlint config — W317-D + W352-S2
 *
 * Extends Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/)
 * with project-specific allowances for the W-wave commit prose this runtime uses:
 *
 *   ship(W317-r2): ...
 *   chore(W316): ...
 *   fix(W313 stream-A): ...
 *
 * Wired via .pre-commit-config.yaml commit-msg stage. Run with `--strict` flag
 * so commitlint exits 3 on errors (default exit 0 — silently passes).
 * Cite: @commitlint/config-conventional@20.5.3 rules (Angular preset).
 *
 * W352-S2 — Wave: W<N> trailer enforcement (closes W350-META-AUDIT F-A1)
 * Codex r1 reframe: trailer IS adopted (5+ recent commits per
 * `git log --grep '^Wave: W' --since=2026-04-15`); MECHANIZATION is the gap.
 *
 * Custom rule `body-must-contain-wave-trailer` registered via the `plugins`
 * array (commitlint v20.x plugins API). The rule receives the parsed commit
 * object {raw, header, body, footer, ...} and returns [boolean, errMsg].
 * Exemptions for dependabot/release-please/Revert/Merge live in
 * `.commitlintrc.json` `ignores:` field (commitlint loads both configs).
 */
// W352-S2 — ignores list (commitlint v20.x requires function form, not regex strings).
// Exempts dependabot[bot], chore(deps), release-please, Revert, Merge commits from
// the body-must-contain-wave-trailer rule (and all other rules — commitlint short-circuits
// when an ignore matches). Mirror in .commitlintrc.json points back to this file via
// `extends: ['./commitlint.config.cjs']` so the ignores apply through both entry points.
// Cite: https://commitlint.js.org/reference/configuration.html#ignores (functions only).
const WAVE_TRAILER_IGNORES = [
  (msg) => /^(dependabot)(\[bot\])?:/i.test(msg),
  (msg) => /^chore\(deps\):/i.test(msg),
  (msg) => /^release-please/i.test(msg),
  (msg) => /^Revert /.test(msg),
  (msg) => /^Merge /.test(msg),
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: WAVE_TRAILER_IGNORES,
  plugins: [
    {
      rules: {
        'body-must-contain-wave-trailer': (parsed) => {
          const raw = (parsed && parsed.raw) || '';
          const hasWaveTrailer = /^Wave:\s*W\d+/m.test(raw);
          return [
            hasWaveTrailer,
            'commit message MUST contain `Wave: W<N>` trailer in body or footer (closes W350-META-AUDIT F-A1; exempt via .commitlintrc.json ignores field for dependabot/release-please/Revert/Merge)'
          ];
        },
      },
    },
  ],
  rules: {
    'body-must-contain-wave-trailer': [2, 'always'],
    // Allow long subjects — W-wave commits routinely exceed 72 chars due to
    // mandatory wave-tag + multi-stream synthesis in the subject line.
    'header-max-length': [2, 'always', 240],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],

    // Allow lowercase + mixed-case scopes (the default is lowercase only, but
    // W-wave tags like "W317-r2" + "stream-A" mix case).
    'scope-case': [0],
    'subject-case': [0],

    // Allow empty body — many ship commits are one-liners; the docs/architecture/
    // wave-folder holds the prose.
    'body-leading-blank': [1, 'always'],
    // 'footer-leading-blank': disabled per W317 commit-message accommodation —
    // multi-paragraph ship-prose can include 'token: value'-style sentences in
    // the body that commitlint heuristically misinterprets as footer trailers,
    // tripping the strict warning. Footer trailers (BREAKING CHANGE:, Refs:) are
    // still permitted but no longer warning-strict-blocked on leading-blank.
    'footer-leading-blank': [0],

    // Type whitelist — keep the Angular preset list AND add `ship` (custom for
    // wave-shipping commits) + `wip` (rare in-progress checkpoints) + `eval`
    // (W432-COMMITLINT-EVAL — sca-v* / benchmark / retroactive-scoring commits).
    // Cite anchors (≥3 distinct orgs per W352-S9):
    //   Conventional Commits https://www.conventionalcommits.org/en/v1.0.0/ — custom types allowed
    //   @commitlint/config-conventional v20 — type-enum extensible per project semantics
    //   NIST SP 800-218 PW.7 — evaluation as distinct lifecycle activity
    //   ISO/IEC 25010:2011 §4.2.6 — maintainability quality-attribute scoring
    //   W432-R3 sca-v22 BASELINE.md commit `fbd1a51 eval(W432-R3)` landed on main —
    //   historical-record discipline (W341-B Q11) requires commitlint preserve the prefix.
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'ship',
        'wip',
        'eval',
      ],
    ],
  },
};
