// parallel-guard-detector.mjs — W341 P0.1 round-3 architectural fix
// (codex round-3 REVISE: production path bypassed local regex via
// `multiStreamIntent` flag set by UserPromptSubmit hook using stale regex).
//
// SHARED multi-stream detector — single source of truth for:
//   - tools/preagent-parallel-guard.mjs (PreToolUse[Agent])
//   - tools/parallel-guard-userpromptsubmit.mjs (UserPromptSubmit)
//
// Detection model:
//   STRONG — intrinsically multi-stream lexical signals (no benign solo
//   interpretation): fan-out, in parallel, parallel-{dispatch,...}, stream X,
//   wave W\d+, verify across, compare across, cross-model, reconnaissance,
//   recon, deep-{audit,recon,dive,study}, all-{dimensions,repos,...},
//   multi-{agent,stream,...}, SOTA{,practice,unleash}, gap-resolut,
//   line-by-line, every-{dimension,...}, orchestrat{ion,or}.
//
//   WEAK_PAIR — generic verbs that ONLY indicate multi-stream when paired
//   with a quantifier marker within ~80 chars (bidirectional). Demoted from
//   STRONG per codex round-1 + round-2 false-positive findings.
//   Verbs: audit, review, sweep, investigate, comprehensive(ly), synthesi[sz]e,
//   ecosystem, research, analy[sz]e, evaluate, rank, score, monitor, harness,
//   dispatch, ingest, discover(y).
//   Quantifiers: across, all {repos,streams,...}, every {repo,...},
//   multiple {repos,...}, in parallel, fan-out, each {repo,...}, cross-model,
//   the entire/whole/full {codebase,runtime,ecosystem,architecture,system},
//   "the codebase"/"the runtime"/"the ecosystem"/"the architecture"/"everything".
//
// detectMultiStream(text) returns true iff STRONG.test(text) || WEAK_PAIR.test(text).

export const MULTI_STREAM_WEAK_VERBS =
  '(?:audit|review|sweep|investigate|comprehensive(?:ly)?|synthesi[sz]e?|ecosystem|research|analy[sz]e|evaluate|rank|score|monitor|harness|dispatch|ingest|discover(?:y)?)';

export const MULTI_STREAM_QUANTIFIERS =
  '(?:across|all (?:repos|streams|files|dimensions|hooks|skills|plugins|modules|sources|servers|aspects|components|things)|every (?:repo|stream|file|dimension|hook|skill|plugin|module|source|server|aspect|component)|multiple\\s+(?:repos|streams|files|dimensions|hooks|skills|modules|sources)|in parallel|fan[- ]?out|each\\s+(?:repo|stream|file|dimension|hook|skill|module)|cross[- ]model|the\\s+(?:entire|whole|full)\\s+(?:codebase|repo(?:sitory)?|project|runtime|ecosystem|architecture|system)|the codebase|the runtime|the ecosystem|the architecture|everything\\s+(?:in|across|under|within)\\s+(?:the\\s+)?(?:codebase|repo(?:sitory)?|project|runtime|ecosystem|architecture|system))';

export const MULTI_STREAM_RE =
  /\b(fan[- ]?out|in parallel|parallel(?:\s+(?:dispatch|investigation|streams?|tasks?|work|agents?))?|stream\s+[a-z]\b|verify across|compare across|cross[- ]model|reconn?aissance|recon|wave\s+W?\d+|deep[- ](?:audit|recon|dive|study)|all (?:dimensions|repos|streams|files|hooks|skills|plugins|modules|sources|aspects|components)|multi[- ](?:agent|stream|repo|file)|SOTA(?:\s+(?:practice|unleash|features))?|gap[- ]resolut|line[- ]by[- ]line|every (?:dimension|repo|stream|file|hook|skill|plugin|module)|orchestrat(?:ion|or))\b/i;

export const MULTI_STREAM_WEAK_PAIR_RE = new RegExp(
  `\\b${MULTI_STREAM_WEAK_VERBS}\\b[\\s\\S]{0,80}\\b${MULTI_STREAM_QUANTIFIERS}\\b|\\b${MULTI_STREAM_QUANTIFIERS}\\b[\\s\\S]{0,80}\\b${MULTI_STREAM_WEAK_VERBS}\\b`,
  'i',
);

export function detectMultiStream(text) {
  if (typeof text !== 'string' || text.length === 0) return false;
  return MULTI_STREAM_RE.test(text) || MULTI_STREAM_WEAK_PAIR_RE.test(text);
}

// W341 P0.1 round-4 architectural fix (codex round-4 REVISE) — UserPromptSubmit
// wrote to `parallel-guard-session-<sid>.json` while PreToolUse read from
// `.parallel-guard-counter-<sid>.json`. Different files = the `multiStreamIntent`
// flag set at UserPromptSubmit was dead-code in production. Shared
// `counterPath()` here ensures both hooks read/write the SAME file. Honors
// `CLAUDE_CODE_TMPDIR` for test-fixture isolation; falls back to the canonical
// `.claude/state` path for production runs.
export function counterPath(sessionId) {
  const safeId = String(sessionId || 'unknown').replace(/[^a-z0-9-]/gi, '_');
  const base = process.env.CLAUDE_CODE_TMPDIR || 'Z:/claude-sota-installed/.claude/state';
  return `${base}/.parallel-guard-counter-${safeId}.json`;
}
