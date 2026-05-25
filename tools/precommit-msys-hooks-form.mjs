#!/usr/bin/env node
// precommit-msys-hooks-form.mjs — static hooks.json shell-form pathology validator
//
// W335 P1-6 closure (W335 Stream D recommendation):
// 5 plugins disabled this wave (W335-MSYS-1..5: hookify + intelligent-compact +
// self-improving-agent + claude-mem + protect-mcp) for hooks-form pathology on
// Windows. This pre-commit gate codifies the static rule that flags the
// same pathology BEFORE another plugin install lands.
//
// Rule (per W335-MSYS pattern + Microsoft docs):
//   A hooks.json `command` field is FLAGGED if BOTH:
//     (1) it is shell-form (single string) — i.e. not exec-form (command + args[])
//     (2) it contains literal ${CLAUDE_PLUGIN_ROOT}
//   UNLESS one of the escape clauses holds:
//     (a) exec-form: `args` is an array (the command is a literal binary like "node")
//     (b) shell:bash + cygpath: command embeds `cygpath` translation
//     (c) bash -c invocation: command starts with `bash -c ` (POSIX path semantics)
//
// Pattern AND-of-(1,2) without ANY of (a..c) → VIOLATION.
//
// W336 codex r1 REVISE-fix: dropped the prior "(d) WIN32 absolute path" escape
// clause as dead code — L122 already returns early when ${CLAUDE_PLUGIN_ROOT} is
// absent, so any command reaching the escape-check block CONTAINS the variable.
// Having a WIN32 abs path ALONGSIDE the variable does not mitigate the variable's
// MSYS-pathology risk; "instead of" semantics are structurally unreachable here.
//
// Scope (W352-MSYS-FIX 2026-05-20):
//   ENFORCE_ROOTS  = [.claude/hooks]                — project-owned (CR-2 enforce target)
//   ADVISORY_ROOTS = [.claude/plugins/cache, env CLAUDE_CODE_PLUGIN_CACHE_DIR/cache]
//                                                  — upstream-vendored (CR-2 EXEMPT;
//                                                    advisory-only; NEVER blocks)
// Both root sets walked every commit (always_run=true) so a `/plugin install`
// regression surfaces at the next commit boundary as ADVISORY noise — operator
// can disable the offending plugin or file an upstream PR; CR-2 explicitly
// exempts upstream-plugin hooks from project-owned discipline.
//
// Exit code 0 = clean OR advisory-only OR escape hatch; exit 2 = enforce-mode
// PROJECT-OWNED violation. Plugin-cache violations NEVER cause exit 2 — they
// are reported to stderr but ignored for exit-code purposes.
//
// Dual-mode per CLAUDE.md L29 W325-A precedent (applies only to ENFORCE_ROOTS):
//   default       — advisory: report project-owned violations to stderr, exit 0
//   ENFORCE=1     — binding: report + exit 2 on any project-owned violation
// Plugin-cache violations: ALWAYS advisory-only regardless of ENFORCE setting.
// Rationale: W352-MSYS-FIX correction — original W335 gate over-enforced on
// upstream-cache violations forcing MSYS_HOOKS_FORM_GATE_DISABLE=1 bypass on
// every commit (134+ cache violations as of W352 ship; all upstream-vendored;
// CR-2 EXEMPT). Split keeps project-owned discipline binding while ending the
// bypass-treadmill regression for cache noise.
//
// Escape hatches (operator-only, CR-5 condition-(b) sanctioned):
//   MSYS_HOOKS_FORM_GATE_DISABLE=1     — skip gate entirely (exit 0, no report)
//   MSYS_HOOKS_FORM_GATE_ENFORCE=1     — flip to binding mode on PROJECT-OWNED only
//
// Cite (3-org-distinct anchors):
//   1. Microsoft Docs — https://learn.microsoft.com/en-us/windows/wsl/filesystems
//      (Windows-path-vs-POSIX-path interpretation pathology; `cygpath` mitigation)
//   2. Anthropic — https://docs.anthropic.com/en/docs/claude-code/hooks
//      (hooks.json schema: `command` shell-form vs exec-form; `${CLAUDE_PLUGIN_ROOT}`)
//   3. Git Project — https://git-scm.com/docs/githooks#_pre_commit (pre-commit stage)
//
// Adversarial review trail: this file + W335-MSYS-1..5 disable commit chain
// (272d075..4b55255, branch goal/W335-sota-convergence).

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, sep, relative } from 'node:path';

const ESCAPE_HATCH = process.env.MSYS_HOOKS_FORM_GATE_DISABLE === '1';
const ENFORCE = process.env.MSYS_HOOKS_FORM_GATE_ENFORCE === '1';
if (ESCAPE_HATCH) {
  process.stderr.write('[msys-hooks-form-gate] BYPASS via MSYS_HOOKS_FORM_GATE_DISABLE=1 (operator escape hatch)\n');
  process.exit(0);
}

const ROOT = process.cwd();
// W352-MSYS-FIX 2026-05-20: split scan roots into ENFORCE (project-owned) vs
// ADVISORY (upstream-vendored). Cardinal-rule-2 explicitly EXEMPTS upstream
// plugin hooks (`.claude/plugins/cache/**`) — they are out of operator-edit
// scope. Gate was previously ENFORCE'ing on cache paths, causing every commit
// to require MSYS_HOOKS_FORM_GATE_DISABLE=1 bypass even when no project-owned
// hooks changed. Forward path: ENFORCE only on `.claude/hooks/**`; cache stays
// advisory-only regardless of ENFORCE env var. This restores the gate's
// original W335-MSYS-1..5 triage value WITHOUT the false-positive ENFORCE
// regression.
//
// Plugin cache lives in the MAIN worktree's .claude/plugins/cache, not necessarily
// inside the current git worktree. Anthropic runtime exports
// CLAUDE_CODE_PLUGIN_CACHE_DIR pointing to the actual cache root; honour it when
// set, else fall back to the in-worktree path (single-worktree case).
const PLUGIN_CACHE_DIR = process.env.CLAUDE_CODE_PLUGIN_CACHE_DIR
  ? join(process.env.CLAUDE_CODE_PLUGIN_CACHE_DIR.replace(/[\\/]+$/, ''), 'cache')
  : null;
const ENFORCE_ROOTS = [
  join(ROOT, '.claude/hooks'),                   // project-owned hooks (CR-2 enforcement target)
];
// Dedup against ENFORCE_ROOTS and against duplicate cache paths (codex r1 minor:
// when CLAUDE_CODE_PLUGIN_CACHE_DIR/cache resolves to .claude/plugins/cache the
// scan walks the same tree twice, doubling advisory counts).
const _adv = [
  PLUGIN_CACHE_DIR,                              // absolute (preferred when env set)
  join(ROOT, '.claude/plugins/cache'),           // relative fallback (upstream-vendored — CR-2 EXEMPT)
].filter(Boolean);
const ADVISORY_ROOTS = [];
const _seen = new Set(ENFORCE_ROOTS.map((p) => p.replace(/[\\/]+$/, '')));
for (const p of _adv) {
  const norm = p.replace(/[\\/]+$/, '');
  if (_seen.has(norm)) continue;
  _seen.add(norm);
  ADVISORY_ROOTS.push(p);
}
const PLUGIN_VAR_RE = /\$\{CLAUDE_PLUGIN_ROOT\}/;
const CYGPATH_RE = /\bcygpath\b/;
const BASH_C_RE = /^\s*bash\s+-c\s/;
// W336 codex r1 REVISE-fix: dropped WIN32_ABS_RE as dead code (see header).
const HOOK_FILE_PATTERNS = [/^hooks\.json$/];   // future: add `*.hook.json` etc

const enforceViolations = [];
const advisoryViolations = [];
let currentBucket = enforceViolations;

function walk(dir, origin, depth = 0) {
  if (depth > 8) return;            // safety cap on recursion
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    const full = join(dir, name);
    let st;
    try { st = statSync(full); } catch { continue; }
    if (st.isDirectory()) { walk(full, origin, depth + 1); continue; }
    if (!st.isFile()) continue;
    if (!HOOK_FILE_PATTERNS.some((re) => re.test(name))) continue;
    auditFile(full, origin);
  }
}

function auditFile(path, origin) {
  let raw;
  try { raw = readFileSync(path, 'utf8'); } catch { return; }
  let parsed;
  try { parsed = JSON.parse(raw); } catch (err) {
    currentBucket.push({ path, reason: `invalid JSON: ${err.message}` });
    return;
  }
  // Anthropic hooks.json schema (two forms, both valid):
  //   (a) Top-level events: { "PreToolUse": [...] }
  //   (b) Nested under "hooks": { "description": "...", "hooks": { "PreToolUse": [...] } }
  // Source: https://docs.anthropic.com/en/docs/claude-code/hooks
  // Descend one level if parsed has a `hooks` object key (form b); else use top-level (form a).
  const eventMap = parsed && typeof parsed === 'object' && parsed.hooks && typeof parsed.hooks === 'object' && !Array.isArray(parsed.hooks)
    ? parsed.hooks
    : parsed;
  for (const [event, entries] of Object.entries(eventMap)) {
    if (!Array.isArray(entries)) continue;
    for (const matcherObj of entries) {
      const hookList = matcherObj?.hooks;
      if (!Array.isArray(hookList)) continue;
      for (const hook of hookList) {
        const cmd = hook?.command;
        const args = hook?.args;
        if (typeof cmd !== 'string') continue;
        if (!PLUGIN_VAR_RE.test(cmd)) continue;
        // Escape clauses (W336 codex r1: (d) removed as dead code; see header):
        if (Array.isArray(args)) continue;                  // (a) exec-form
        if (CYGPATH_RE.test(cmd)) continue;                  // (b) cygpath translation
        if (BASH_C_RE.test(cmd)) continue;                   // (c) bash -c wrap
        currentBucket.push({
          path: relative(ROOT, path),
          event,
          command: cmd.length > 120 ? cmd.slice(0, 117) + '...' : cmd,
          origin,
        });
      }
    }
  }
}

// Scan project-owned paths first (collect into enforceViolations)
currentBucket = enforceViolations;
for (const abs of ENFORCE_ROOTS) {
  if (existsSync(abs)) walk(abs);
}
// Then scan upstream-vendored paths (collect into advisoryViolations)
currentBucket = advisoryViolations;
for (const abs of ADVISORY_ROOTS) {
  if (existsSync(abs)) walk(abs);
}

if (enforceViolations.length === 0 && advisoryViolations.length === 0) {
  process.stderr.write('[msys-hooks-form-gate] PASS: 0 shell-form pathology violations\n');
  process.exit(0);
}

// Report advisory violations (upstream cache) — never block
if (advisoryViolations.length > 0) {
  process.stderr.write(`\n[msys-hooks-form-gate] ADVISORY: ${advisoryViolations.length} upstream-plugin-cache violation(s) (CR-2 EXEMPT — operator must disable plugin OR file upstream PR; never blocks commit)\n`);
  for (const v of advisoryViolations.slice(0, 10)) {
    process.stderr.write(`  ${v.path}${v.event ? ` (${v.event})` : ''}\n`);
    if (v.command) process.stderr.write(`    command: ${v.command.slice(0, 100)}...\n`);
  }
  if (advisoryViolations.length > 10) process.stderr.write(`  ... and ${advisoryViolations.length - 10} more (truncated)\n`);
}

if (enforceViolations.length === 0) {
  process.stderr.write('[msys-hooks-form-gate] PASS: 0 project-owned hook violations (upstream-cache advisory above is non-blocking)\n');
  process.exit(0);
}

const mode = ENFORCE ? 'BLOCK' : 'ADVISORY';
process.stderr.write(`\n[msys-hooks-form-gate] ${mode}: ${enforceViolations.length} project-owned shell-form pathology violation(s)\n`);
if (!ENFORCE) process.stderr.write('  (advisory-mode; set MSYS_HOOKS_FORM_GATE_ENFORCE=1 to BLOCK)\n');
for (const v of enforceViolations) {
  process.stderr.write(`  ${v.path}${v.event ? ` (${v.event})` : ''}\n`);
  if (v.command) process.stderr.write(`    command: ${v.command}\n`);
  if (v.reason) process.stderr.write(`    reason : ${v.reason}\n`);
}
process.stderr.write(`
Remediation paths (any ONE satisfies escape clause):
  (a) exec-form: convert command-string to {"command": "node", "args": ["\${CLAUDE_PLUGIN_ROOT}/..."]}
  (b) shell:bash + cygpath: wrap the path via cygpath -u "\${CLAUDE_PLUGIN_ROOT}/..."
  (c) bash -c invocation: prefix with bash -c '<command>'  (POSIX path semantics)
  (NOTE: a prior "(d) WIN32-abs path" remediation was removed in W336 codex r1 as
   unreachable — once \${CLAUDE_PLUGIN_ROOT} is present in the command, embedding
   a WIN32-abs path alongside it does NOT mitigate the var's MSYS pathology.)

Operator escape hatch: set env MSYS_HOOKS_FORM_GATE_DISABLE=1 (per W335 P1-6 + CR-5 b)
Operator enforce flip:  set env MSYS_HOOKS_FORM_GATE_ENFORCE=1 (binding exit 2)
Source: tools/precommit-msys-hooks-form.mjs + .pre-commit-config.yaml#msys-hooks-form
`);
process.exit(willBlock ? 2 : 0);
