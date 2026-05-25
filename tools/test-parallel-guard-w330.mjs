#!/usr/bin/env node
// test-parallel-guard-w330.mjs — W330 P0-A test harness
//
// Simulates 3 scenarios against the upgraded preagent-parallel-guard.mjs:
//   1. SOLO-TRIVIAL: single-stream wording, solo Agent — should PASS (exit 0, no advisory)
//   2. MULTI-STREAM-SOLO-1: multi-stream wording, solo Agent, 1st offense — WARN (exit 0, advisory)
//   3. MULTI-STREAM-SOLO-2: same as #2 but counter already at 1 — BLOCK (exit 2)
//
// Each scenario:
//   - writes a synthetic session JSONL to a tmp dir
//   - sets env to point guard at it
//   - spawns the guard with a synthetic event JSON on stdin
//   - asserts on exitCode + stdout JSON
//
// Run: node tools/test-parallel-guard-w330.mjs

import { spawn } from 'node:child_process';
import { mkdtemp, writeFile, mkdir, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const GUARD = join(process.cwd(), 'tools', 'preagent-parallel-guard.mjs');
const SESSION_ID = '00000000-0000-0000-0000-00000000beef';

function jsonl(...records) {
  return records.map((r) => JSON.stringify(r)).join('\n') + '\n';
}

function userMsg(text) {
  return { message: { role: 'user', content: [{ type: 'text', text }] } };
}
function assistantMsg(text, agentBlockCount = 1) {
  const content = [{ type: 'text', text }];
  for (let i = 0; i < agentBlockCount; i++) {
    content.push({ type: 'tool_use', name: 'Agent', input: {} });
  }
  return { message: { role: 'assistant', content } };
}

async function runGuard({ env, eventJson }) {
  return await new Promise((resolve) => {
    const child = spawn(process.execPath, [GUARD], {
      env: { ...process.env, ...env },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (c) => (stdout += c));
    child.stderr.on('data', (c) => (stderr += c));
    child.on('close', (code) => resolve({ code, stdout, stderr }));
    child.stdin.write(JSON.stringify(eventJson));
    child.stdin.end();
  });
}

async function setupSession(scenarioDir, sessionJsonl) {
  // Guard joins CLAUDE_CODE_PROJECT_DIR + `${sessionId}.jsonl` directly,
  // so the env var must point at the dir CONTAINING the JSONL.
  await mkdir(scenarioDir, { recursive: true });
  await writeFile(join(scenarioDir, `${SESSION_ID}.jsonl`), sessionJsonl, 'utf8');
  return scenarioDir;
}

function assert(cond, msg) {
  if (!cond) {
    console.error(`  FAIL: ${msg}`);
    process.exitCode = 1;
    return false;
  }
  console.log(`  OK:   ${msg}`);
  return true;
}

async function main() {
  const tmpBase = await mkdtemp(join(tmpdir(), 'w330-guard-test-'));
  const tmpDir = join(tmpBase, 'tmp');
  await mkdir(tmpDir, { recursive: true });
  const counterPath = join(tmpDir, `.parallel-guard-counter-${SESSION_ID}.json`);
  // W338-P0d-fix updated W348 P0 — tick state must be cleared between scenarios;
  // without this, ticks accumulate across cases and the guard's recentTicks>=2
  // FAST-PATH false-fires (early-exits without counter increment or advisory emit).
  // W343 P0.4 migrated from single-file `.jsonl` to per-session DIRECTORY `.d/`
  // with per-PID rename-atomic entries; cleanup must be recursive directory rm.
  // Cite: docs/architecture/W348-SOTA-FIX/C-hooks-tools-audit.md Bug-A root-cause.
  const tickDir = join(tmpDir, `.parallel-guard-ticks-${SESSION_ID}.d`);

  let allPass = true;

  // -------- Scenario 1: SOLO-TRIVIAL --------
  console.log('\n[1] SOLO-TRIVIAL — single-stream wording, solo Agent (should exit 0, NO advisory)');
  {
    const dir = join(tmpBase, 's1');
    const sessionJsonl = jsonl(
      userMsg('Please rename one variable in foo.ts'),
      assistantMsg('Renaming variable now.', 1),
    );
    const projDir = await setupSession(dir, sessionJsonl);
    // ensure no counter file or stale ticks
    try { await rm(counterPath); } catch {}
    try { await rm(tickDir, { recursive: true, force: true }); } catch {}
    const res = await runGuard({
      env: {
        CLAUDE_CODE_PROJECT_DIR: dir,
        CLAUDE_CODE_TMPDIR: tmpDir,
        CLAUDE_SESSION_ID: SESSION_ID,
      },
      eventJson: { session_id: SESSION_ID, tool_name: 'Agent' },
    });
    allPass = assert(res.code === 0, `exit code = 0 (got ${res.code})`) && allPass;
    allPass = assert(!res.stdout.includes('parallel-dispatch advisory'), 'no advisory emitted on stdout') && allPass;
    void projDir;
  }

  // -------- Scenario 2: MULTI-STREAM-SOLO-1 (1st offense) --------
  console.log('\n[2] MULTI-STREAM-SOLO-1 — multi-stream wording, solo Agent, 1st offense (WARN, exit 0)');
  {
    const dir = join(tmpBase, 's2');
    const sessionJsonl = jsonl(
      userMsg('Please audit and review across all modules in parallel — Stream A, Stream B, Stream C.'),
      assistantMsg('Dispatching investigation.', 1),
    );
    await setupSession(dir, sessionJsonl);
    try { await rm(counterPath); } catch {}
    try { await rm(tickDir, { recursive: true, force: true }); } catch {}
    const res = await runGuard({
      env: {
        CLAUDE_CODE_PROJECT_DIR: dir,
        CLAUDE_CODE_TMPDIR: tmpDir,
        CLAUDE_SESSION_ID: SESSION_ID,
      },
      eventJson: { session_id: SESSION_ID, tool_name: 'Agent' },
    });
    allPass = assert(res.code === 0, `exit code = 0 on 1st offense (got ${res.code})`) && allPass;
    allPass = assert(res.stdout.includes('parallel-dispatch advisory'), 'advisory emitted on stdout') && allPass;
    // counter should now be 1
    let counter = null;
    try { counter = JSON.parse(await readFile(counterPath, 'utf8')); } catch {}
    allPass = assert(counter && counter.count === 1, `counter incremented to 1 (got ${counter?.count})`) && allPass;
  }

  // -------- Scenario 3: MULTI-STREAM-SOLO-2 (2nd consecutive offense) --------
  console.log('\n[3] MULTI-STREAM-SOLO-2 — counter already at 1, another solo dispatch (BLOCK, exit 2)');
  {
    const dir = join(tmpBase, 's3');
    const sessionJsonl = jsonl(
      userMsg('Continue the audit — investigate every module in parallel.'),
      assistantMsg('Dispatching one more.', 1),
    );
    await setupSession(dir, sessionJsonl);
    // counter remains from scenario 2 (count=1); but clear tick file so the
    // 2-ticks-in-10s parallel-fan-out detection doesn't false-fire on scenario 2's tick.
    try { await rm(tickDir, { recursive: true, force: true }); } catch {}
    const res = await runGuard({
      env: {
        CLAUDE_CODE_PROJECT_DIR: dir,
        CLAUDE_CODE_TMPDIR: tmpDir,
        CLAUDE_SESSION_ID: SESSION_ID,
      },
      eventJson: { session_id: SESSION_ID, tool_name: 'Agent' },
    });
    allPass = assert(res.code === 2, `exit code = 2 (blocking) on 2nd offense (got ${res.code})`) && allPass;
    allPass = assert(res.stderr.length > 0, `stderr non-empty with block reason (got ${res.stderr.length} bytes)`) && allPass;
    allPass = assert(/W330|blocking|2nd|consecutive/i.test(res.stderr), 'stderr explains blocking reason') && allPass;
  }

  // -------- Scenario 4: ESCAPE-HATCH override --------
  console.log('\n[4] ESCAPE-HATCH — CLAUDE_PARALLEL_GUARD_DISABLE=1 forces exit 0 even on repeat offense');
  {
    const dir = join(tmpBase, 's4');
    const sessionJsonl = jsonl(
      userMsg('Continue the audit — investigate every module in parallel.'),
      assistantMsg('Dispatching one more.', 1),
    );
    await setupSession(dir, sessionJsonl);
    // counter still at 1 from scenario 2; would normally block
    const res = await runGuard({
      env: {
        CLAUDE_CODE_PROJECT_DIR: dir,
        CLAUDE_CODE_TMPDIR: tmpDir,
        CLAUDE_SESSION_ID: SESSION_ID,
        CLAUDE_PARALLEL_GUARD_DISABLE: '1',
      },
      eventJson: { session_id: SESSION_ID, tool_name: 'Agent' },
    });
    allPass = assert(res.code === 0, `escape hatch forces exit 0 (got ${res.code})`) && allPass;
  }

  // -------- Scenario 5: PARALLEL-DISPATCH-EVIDENCE resets counter --------
  console.log('\n[5] PARALLEL-DISPATCH-EVIDENCE — assistant turn has 2+ Agent blocks → counter resets to 0');
  {
    const dir = join(tmpBase, 's5');
    const sessionJsonl = jsonl(
      userMsg('Audit + review in parallel.'),
      assistantMsg('Parallel dispatch incoming.', 2), // 2 Agent blocks → evidence of parallelism
    );
    await setupSession(dir, sessionJsonl);
    // Pre-seed counter to 1 so we can verify the reset; clear stale ticks
    await writeFile(counterPath, JSON.stringify({ count: 1, lastViolationTs: Date.now() }), 'utf8');
    try { await rm(tickDir, { recursive: true, force: true }); } catch {}
    const res = await runGuard({
      env: {
        CLAUDE_CODE_PROJECT_DIR: dir,
        CLAUDE_CODE_TMPDIR: tmpDir,
        CLAUDE_SESSION_ID: SESSION_ID,
      },
      eventJson: { session_id: SESSION_ID, tool_name: 'Agent' },
    });
    allPass = assert(res.code === 0, `exit code = 0 (parallel evidence) — got ${res.code}`) && allPass;
    let counter = null;
    try { counter = JSON.parse(await readFile(counterPath, 'utf8')); } catch {}
    allPass = assert(counter && counter.count === 0, `counter reset to 0 (got ${counter?.count})`) && allPass;
  }

  // -------- Scenario 6: WEAK-TERMS-SOLO-BENIGN (codex W341 round-1 regression) --------
  // Codex required: benign solo-Agent prompts containing research/analyze/evaluate/
  // harness/monitor/rank/score (W341 WEAK terms) MUST exit 0 with NO advisory.
  // These verbs alone are NOT multi-stream — only paired with quantifiers
  // (across/all-repos/multiple-streams/in-parallel) do they indicate fan-out.
  console.log('\n[6] WEAK-TERMS-SOLO-BENIGN — solo prompts with research/analyze/harness/monitor/rank/score/evaluate alone (exit 0, NO advisory)');
  {
    const benignPrompts = [
      'research this package issue and fix it',
      'analyze this one file for the null-ptr bug',
      'write a harness for this single bug',
      'evaluate whether this PR is mergeable',
      'rank these three options on cost',
      'score this one prompt against the rubric',
      'monitor disk usage on /var',
      'discover why this test is flaking',
      'dispatch a single email to the team',
      'ingest this single CSV row',
      // Codex round-2 additions — strong-singleton demotion regression
      'review this one file for the typo',
      'investigate this failing test',
      'synthesize this single document into bullet points',
      'audit this function for null-ptr safety',
      'sweep this one directory for stale lockfiles',
      'write a comprehensive comment for this function',
      'this ecosystem of three tools needs a docstring',
      // Codex W342 round-3 additions — bare `everything` quantifier false-positive
      'review this one file and make sure everything is correct',
      'audit this function — verify everything is null-safe',
      'evaluate this single PR; everything must compile',
    ];
    let scenarioPass = true;
    for (let i = 0; i < benignPrompts.length; i++) {
      const prompt = benignPrompts[i];
      const dir = join(tmpBase, `s6-${i}`);
      const sessionJsonl = jsonl(
        userMsg(prompt),
        assistantMsg('Working on it.', 1),
      );
      await setupSession(dir, sessionJsonl);
      try { await rm(counterPath); } catch {}
      try { await rm(tickDir, { recursive: true, force: true }); } catch {}
      const res = await runGuard({
        env: {
          CLAUDE_CODE_PROJECT_DIR: dir,
          CLAUDE_CODE_TMPDIR: tmpDir,
          CLAUDE_SESSION_ID: SESSION_ID,
        },
        eventJson: { session_id: SESSION_ID, tool_name: 'Agent' },
      });
      const passExit = res.code === 0;
      const passNoAdvisory = !res.stdout.includes('parallel-dispatch advisory');
      if (!passExit || !passNoAdvisory) {
        console.log(`  FAIL: benign prompt #${i} "${prompt}" — exit=${res.code} advisory=${!passNoAdvisory}`);
        scenarioPass = false;
      }
    }
    allPass = assert(scenarioPass, `all ${benignPrompts.length} benign solo prompts exit 0 with no advisory`) && allPass;
  }

  // -------- Scenario 8: E2E UserPromptSubmit -> PreToolUse for benign solo (codex W341 round-3 regression) --------
  // Codex round-3 caught: tools/parallel-guard-userpromptsubmit.mjs had a STALE
  // strong-regex that set multiStreamIntent=true on benign solo prompts, and
  // preagent-parallel-guard.mjs prefers state.multiStreamIntent over its local
  // regex (line 363-364). Production path bypassed round-3 demotion entirely.
  // This scenario fires UserPromptSubmit FIRST (sets intent flag), then
  // PreToolUse[Agent]. Refactor now shares detectMultiStream() — verify the
  // end-to-end flow agrees with the isolated-PreToolUse scenario 6.
  console.log('\n[8] E2E UserPromptSubmit->PreToolUse — benign solo prompt through both hooks (NO advisory, intent flag false)');
  {
    const benignE2EPrompts = [
      'review this one file for the typo',
      'investigate this failing test',
      'audit this function for null-ptr safety',
      'research this package issue and fix it',
      'analyze this one file for the null-ptr bug',
    ];
    const USERPROMPT_HOOK = join(process.cwd(), 'tools', 'parallel-guard-userpromptsubmit.mjs');
    let scenarioPass = true;
    for (let i = 0; i < benignE2EPrompts.length; i++) {
      const prompt = benignE2EPrompts[i];
      const dir = join(tmpBase, `s8-${i}`);
      // Clear any prior state from previous iteration
      try { await rm(counterPath); } catch {}
      try { await rm(tickDir, { recursive: true, force: true }); } catch {}
      // Fire UserPromptSubmit — writes intent flag directly to counterPath
      // (shared with PreToolUse per W341 round-4 architectural fix).
      const userPromptEvent = { session_id: SESSION_ID, prompt };
      await new Promise((resolve) => {
        const child = spawn(process.execPath, [USERPROMPT_HOOK], {
          env: {
            ...process.env,
            CLAUDE_CODE_PROJECT_DIR: dir,
            CLAUDE_CODE_TMPDIR: tmpDir,
            CLAUDE_SESSION_ID: SESSION_ID,
          },
          stdio: ['pipe', 'pipe', 'pipe'],
        });
        child.on('close', () => resolve());
        child.stdin.write(JSON.stringify(userPromptEvent));
        child.stdin.end();
      });
      // Read the state written by UserPromptSubmit — same path as PreToolUse reads.
      let userPromptState = null;
      try {
        userPromptState = JSON.parse(await readFile(counterPath, 'utf8'));
      } catch {
        /* state file may not exist if UserPromptSubmit determined no intent */
      }
      // Setup session JSONL + fire PreToolUse[Agent] (reads same counterPath)
      const sessionJsonl = jsonl(
        userMsg(prompt),
        assistantMsg('Working on it.', 1),
      );
      await setupSession(dir, sessionJsonl);
      const res = await runGuard({
        env: {
          CLAUDE_CODE_PROJECT_DIR: dir,
          CLAUDE_CODE_TMPDIR: tmpDir,
          CLAUDE_SESSION_ID: SESSION_ID,
        },
        eventJson: { session_id: SESSION_ID, tool_name: 'Agent' },
      });
      const intentSet = userPromptState?.multiStreamIntent === true;
      const passExit = res.code === 0;
      const passNoAdvisory = !res.stdout.includes('parallel-dispatch advisory');
      if (intentSet || !passExit || !passNoAdvisory) {
        console.log(`  FAIL: E2E benign prompt #${i} "${prompt}" — intentSet=${intentSet} exit=${res.code} advisory=${!passNoAdvisory}`);
        scenarioPass = false;
      }
    }
    allPass = assert(scenarioPass, `all ${benignE2EPrompts.length} E2E benign prompts pass UserPromptSubmit + PreToolUse with no advisory`) && allPass;
  }

  // -------- Scenario 7: WEAK-TERMS-PAIRED-MULTI (codex W341 round-1 regression) --------
  // Verify weak terms DO trigger advisory when paired with quantifier markers.
  console.log('\n[7] WEAK-TERMS-PAIRED-MULTI — solo Agent with weak verb + quantifier (1st offense advisory)');
  {
    const dir = join(tmpBase, 's7');
    const sessionJsonl = jsonl(
      userMsg('research across all 10 repos and rank them by stars'),
      assistantMsg('Dispatching investigation.', 1),
    );
    await setupSession(dir, sessionJsonl);
    try { await rm(counterPath); } catch {}
    try { await rm(tickDir, { recursive: true, force: true }); } catch {}
    const res = await runGuard({
      env: {
        CLAUDE_CODE_PROJECT_DIR: dir,
        CLAUDE_CODE_TMPDIR: tmpDir,
        CLAUDE_SESSION_ID: SESSION_ID,
      },
      eventJson: { session_id: SESSION_ID, tool_name: 'Agent' },
    });
    allPass = assert(res.code === 0, `exit code = 0 on 1st offense (got ${res.code})`) && allPass;
    allPass = assert(res.stdout.includes('parallel-dispatch advisory'), 'advisory emitted for weak-term + quantifier pair') && allPass;
  }

  // Cleanup
  try { await rm(tmpBase, { recursive: true, force: true }); } catch {}

  console.log(`\n${allPass ? 'ALL TESTS PASS' : 'SOME TESTS FAILED'} — exit ${allPass ? 0 : 1}`);
  process.exit(allPass ? 0 : 1);
}

main().catch((e) => {
  console.error('TEST HARNESS ERROR:', e);
  process.exit(1);
});
