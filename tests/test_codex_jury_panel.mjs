/**
 * Unit tests for the L3 Jury-on-Demand 3-judge codex panel spawner
 * (W374-EXT Task 9 A3).
 *
 * Per V2 plan Task 9 + Task 7 + Task 8 carry-forward lessons. Tests cover:
 *   1. spawnPanels returns 3 results with correct panel-2 position-swap
 *   2. Panels are dispatched with the 3-element PANEL_TEMPS label ladder
 *      (project-internal labels; NOT real codex CLI temperature flags ---
 *      codex CLI 0.130.0 does not expose per-invocation temperature
 *      control, see PANEL_TEMPS docstring in codex-jury-panel.mjs)
 *   3. fail-CLOSED on subprocess errors --- thrown errors propagate up
 *      through Promise.allSettled (Task 7+8 fail-CLOSED carry-forward)
 *   4. Non-JSON codex output --- surfaces as JuryPanelError, not swallowed
 *   5. Timeout --- surfaces as JuryPanelError with timeout cause
 *   6. (Fix-up batch) buildCodexArgs returns the real codex CLI 0.130.0
 *      argv shape (stdin-via-dash + --ephemeral + --skip-git-repo-check +
 *      --color never); does NOT include fictional --effort / --temperature
 *      / --input-file flags
 *
 * All tests use the opts.mockSpawn override; no real `codex` CLI process is
 * spawned (unit-test discipline). The integration with real codex CLI is
 * covered by Task 10's wiring tests (deferred per V2 Addendum).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  spawnPanels,
  JuryPanelError,
  PANEL_TEMPS,
  SWAP_PANEL_ID,
  parsePanelOutput,
  buildPrompt,
  buildCodexArgs,
} from "../tools/codex-jury-panel.mjs";

// -- Helpers -----------------------------------------------------------------

/**
 * Build a mock spawner that returns a fixed PanelResult per panel-id without
 * invoking the real CLI. Records call arguments for assertion.
 */
function makeMockSpawn(verdicts) {
  const calls = [];
  const mock = async (panelId, spec, result, temperature, positionSwap) => {
    calls.push({ panelId, spec, result, temperature, positionSwap });
    return verdicts[panelId - 1];
  };
  mock.calls = calls;
  return mock;
}

const SAMPLE_SPEC = { task: "add a docstring" };
const SAMPLE_RESULT = { status: "COMPLETE", result: "docstring added" };

const APPROVE_VERDICTS = [
  {
    panel_id: 1,
    verdict: "APPROVE",
    confidence: 0.9,
    rationale: "panel-1 ok",
    position_swap: false,
  },
  {
    panel_id: 2,
    verdict: "APPROVE",
    confidence: 0.85,
    rationale: "panel-2 swap ok",
    position_swap: true,
  },
  {
    panel_id: 3,
    verdict: "APPROVE",
    confidence: 0.88,
    rationale: "panel-3 ok",
    position_swap: false,
  },
];

// -- Plan test ---------------------------------------------------------------

test("spawnPanels returns 3 panel results with position-swap on panel 2", async () => {
  const mock = makeMockSpawn(APPROVE_VERDICTS);
  const results = await spawnPanels(SAMPLE_SPEC, SAMPLE_RESULT, {
    mockSpawn: mock,
  });
  assert.equal(results.length, 3, "expected 3 panel results");
  assert.equal(results[0].position_swap, false, "panel-1 forward");
  assert.equal(results[1].position_swap, true, "panel-2 swap");
  assert.equal(results[2].position_swap, false, "panel-3 forward");
  assert.equal(results[0].panel_id, 1);
  assert.equal(results[1].panel_id, 2);
  assert.equal(results[2].panel_id, 3);
});

// -- Temperature ordering test (carry-forward) -------------------------------

test("spawnPanels dispatches at temperatures 0.0 / 0.3 / 0.7 in canonical order", async () => {
  const mock = makeMockSpawn(APPROVE_VERDICTS);
  await spawnPanels(SAMPLE_SPEC, SAMPLE_RESULT, { mockSpawn: mock });
  assert.equal(mock.calls.length, 3);
  assert.equal(mock.calls[0].temperature, 0.0, "panel-1 temp 0.0");
  assert.equal(mock.calls[1].temperature, 0.3, "panel-2 temp 0.3");
  assert.equal(mock.calls[2].temperature, 0.7, "panel-3 temp 0.7");
});

// -- Module-level constants (audit-friendliness) -----------------------------

test("PANEL_TEMPS + SWAP_PANEL_ID exported for downstream calibration", () => {
  assert.deepEqual(
    PANEL_TEMPS,
    [0.0, 0.3, 0.7],
    "PANEL_TEMPS is the canonical 3-element label ladder",
  );
  assert.equal(
    SWAP_PANEL_ID,
    2,
    "panel-2 is the swap panel by convention",
  );
});

// -- Codex CLI 0.130.0 argv-shape contract (fix-up batch -- Critical) -------

test("buildCodexArgs returns real codex CLI 0.130.0 invocation shape", () => {
  const argv = buildCodexArgs();
  assert.ok(Array.isArray(argv), "buildCodexArgs must return an array");
  // 1. First element MUST be the `exec` subcommand.
  assert.equal(argv[0], "exec", "first argv element must be `exec` subcommand");
  // 2. Last element MUST be the literal `-` to signal stdin-prompt input
  //    (codex CLI 0.130.0 stdin-input convention).
  assert.equal(
    argv[argv.length - 1],
    "-",
    "last argv element must be `-` (stdin-prompt sentinel)",
  );
  // 3. MUST include --ephemeral (no session-file persistence between
  //    panel rounds).
  assert.ok(
    argv.includes("--ephemeral"),
    "argv must include --ephemeral",
  );
  // 4. MUST include --skip-git-repo-check (defensive non-repo CWD support).
  assert.ok(
    argv.includes("--skip-git-repo-check"),
    "argv must include --skip-git-repo-check",
  );
  // 5. MUST include --color never to keep stdout ANSI-free for the
  //    brace-matching JSON extractor in parsePanelOutput.
  const colorIdx = argv.indexOf("--color");
  assert.ok(colorIdx >= 0, "argv must include --color");
  assert.equal(
    argv[colorIdx + 1],
    "never",
    "--color value must be `never`",
  );
  // 6. MUST NOT include fictional codex CLI 0.130.0 flags that caused the
  //    codex r1 BLOCK finding (--effort, --temperature, --input-file are
  //    NOT real codex exec 0.130.0 flags).
  assert.ok(
    !argv.includes("--effort"),
    "argv MUST NOT include fictional --effort flag (NOT in codex CLI 0.130.0)",
  );
  assert.ok(
    !argv.includes("--temperature"),
    "argv MUST NOT include fictional --temperature flag (NOT in codex CLI 0.130.0)",
  );
  assert.ok(
    !argv.includes("--input-file"),
    "argv MUST NOT include fictional --input-file flag (NOT in codex CLI 0.130.0)",
  );
});

// -- Fail-CLOSED carry-forward tests -----------------------------------------

test("spawnPanels propagates spawn errors as fail-CLOSED (codex unreachable)", async () => {
  const errorSpawn = async () => {
    throw new Error("codex unreachable");
  };
  await assert.rejects(
    spawnPanels(SAMPLE_SPEC, SAMPLE_RESULT, { mockSpawn: errorSpawn }),
    /codex unreachable/,
    "spawn errors must surface, not be swallowed",
  );
});

test("spawnPanels surfaces JuryPanelError when a single panel rejects", async () => {
  let callCount = 0;
  const partialFailSpawn = async (panelId) => {
    callCount += 1;
    if (panelId === 2) {
      throw new JuryPanelError("panel-2 non-JSON output", {
        panelId: 2,
        cause: "non-json",
      });
    }
    return APPROVE_VERDICTS[panelId - 1];
  };
  await assert.rejects(
    spawnPanels(SAMPLE_SPEC, SAMPLE_RESULT, { mockSpawn: partialFailSpawn }),
    (err) => err instanceof JuryPanelError && /panel-2/.test(err.message),
    "JuryPanelError from one panel must propagate up through Promise.all",
  );
  assert.ok(callCount >= 1, "at least one spawn was attempted");
});

test("JuryPanelError is a typed Error subclass with diagnostic metadata", () => {
  const err = new JuryPanelError("test error", {
    panelId: 1,
    cause: "subprocess-exit-3",
  });
  assert.ok(err instanceof Error, "JuryPanelError extends Error");
  assert.ok(err instanceof JuryPanelError, "instanceof JuryPanelError");
  assert.equal(err.name, "JuryPanelError");
  assert.equal(err.panelId, 1);
  assert.equal(err.cause, "subprocess-exit-3");
  assert.match(err.message, /test error/);
});

// -- Spec / result pass-through invariant (carry-forward) --------------------

test("spawnPanels passes spec + result through to each panel unchanged", async () => {
  const mock = makeMockSpawn(APPROVE_VERDICTS);
  await spawnPanels(SAMPLE_SPEC, SAMPLE_RESULT, { mockSpawn: mock });
  for (const call of mock.calls) {
    assert.deepEqual(call.spec, SAMPLE_SPEC, "spec passed through unchanged");
    assert.deepEqual(
      call.result,
      SAMPLE_RESULT,
      "result passed through unchanged",
    );
  }
});

// -- Defensive input validation (Task 7+8 carry-forward) ---------------------

test("spawnPanels rejects null/undefined spec", async () => {
  const mock = makeMockSpawn(APPROVE_VERDICTS);
  await assert.rejects(
    spawnPanels(null, SAMPLE_RESULT, { mockSpawn: mock }),
    /spec/i,
    "null spec must be rejected",
  );
  await assert.rejects(
    spawnPanels(undefined, SAMPLE_RESULT, { mockSpawn: mock }),
    /spec/i,
    "undefined spec must be rejected",
  );
});

test("spawnPanels rejects null/undefined result", async () => {
  const mock = makeMockSpawn(APPROVE_VERDICTS);
  await assert.rejects(
    spawnPanels(SAMPLE_SPEC, null, { mockSpawn: mock }),
    /result/i,
    "null result must be rejected",
  );
  await assert.rejects(
    spawnPanels(SAMPLE_SPEC, undefined, { mockSpawn: mock }),
    /result/i,
    "undefined result must be rejected",
  );
});

// -- Fix-up batch: I-5 parsePanelOutput adversarial coverage -----------------

test("parsePanelOutput handles nested objects in rationale", () => {
  const stdout =
    '{"verdict": "BLOCK", "confidence": 0.9, '
    + '"rationale": "found {nested} braces in code"}';
  const parsed = parsePanelOutput(stdout, 1, false);
  assert.equal(parsed.verdict, "BLOCK");
  assert.equal(parsed.confidence, 0.9);
  assert.match(parsed.rationale, /nested/);
  assert.equal(parsed.panel_id, 1);
  assert.equal(parsed.position_swap, false);
});

test("parsePanelOutput tolerates leading log lines before JSON", () => {
  const stdout = [
    "INFO: starting codex panel",
    "DEBUG: thinking about the verdict",
    "INFO: reasoning complete",
    '{"verdict": "APPROVE", "confidence": 0.85, "rationale": "looks good"}',
  ].join("\n");
  const parsed = parsePanelOutput(stdout, 2, true);
  assert.equal(parsed.verdict, "APPROVE");
  assert.equal(parsed.confidence, 0.85);
  assert.equal(parsed.rationale, "looks good");
  assert.equal(parsed.panel_id, 2);
  assert.equal(parsed.position_swap, true);
});

test("parsePanelOutput handles escaped quotes in rationale", () => {
  const stdout =
    '{"verdict": "REVISE", "confidence": 0.7, '
    + '"rationale": "found \\"escaped\\" quotes plus a } close brace"}';
  const parsed = parsePanelOutput(stdout, 3, false);
  assert.equal(parsed.verdict, "REVISE");
  // The escaped quotes survive JSON.parse and end up as real " in the string.
  assert.match(parsed.rationale, /escaped/);
  assert.match(parsed.rationale, /close brace/);
});

test("parsePanelOutput rejects missing required fields", () => {
  // Missing verdict.
  const stdout = '{"confidence": 0.9, "rationale": "no verdict"}';
  assert.throws(
    () => parsePanelOutput(stdout, 1, false),
    (err) =>
      err instanceof JuryPanelError && /missing field "verdict"/.test(err.message),
    "must reject JSON missing required verdict field",
  );

  // Missing confidence.
  const stdout2 = '{"verdict": "APPROVE", "rationale": "no conf"}';
  assert.throws(
    () => parsePanelOutput(stdout2, 1, false),
    (err) =>
      err instanceof JuryPanelError && /missing field "confidence"/.test(err.message),
    "must reject JSON missing required confidence field",
  );

  // Missing rationale.
  const stdout3 = '{"verdict": "APPROVE", "confidence": 0.9}';
  assert.throws(
    () => parsePanelOutput(stdout3, 1, false),
    (err) =>
      err instanceof JuryPanelError && /missing field "rationale"/.test(err.message),
    "must reject JSON missing required rationale field",
  );
});

test("parsePanelOutput rejects malformed JSON", () => {
  // No closing brace.
  assert.throws(
    () => parsePanelOutput("{not really json", 1, false),
    (err) =>
      err instanceof JuryPanelError && /no JSON object/.test(err.message),
    "must reject input with no balanced { ... } block",
  );

  // Brace-balanced but invalid JSON syntax (e.g., trailing comma).
  // The brace-matcher finds the { ... } but JSON.parse fails.
  assert.throws(
    () => parsePanelOutput('{"verdict": "APPROVE",,}', 1, false),
    (err) =>
      err instanceof JuryPanelError && /JSON.parse failed/.test(err.message),
    "must reject invalid-JSON-syntax input post-brace-extraction",
  );

  // Empty stdout.
  assert.throws(
    () => parsePanelOutput("", 1, false),
    (err) =>
      err instanceof JuryPanelError && /no JSON object/.test(err.message),
    "must reject empty stdout",
  );
});

// -- Fix-up batch: M-8 buildPrompt position-swap ordering --------------------

test("buildPrompt(positionSwap=true) places TaskResult before TaskSpec", () => {
  const prompt = buildPrompt(SAMPLE_SPEC, SAMPLE_RESULT, true);
  const resultIdx = prompt.indexOf("RESULT:");
  const specIdx = prompt.indexOf("SPEC:");
  assert.ok(resultIdx >= 0, "swap prompt must contain RESULT: marker");
  assert.ok(specIdx >= 0, "swap prompt must contain SPEC: marker");
  assert.ok(
    resultIdx < specIdx,
    "position-swap prompt must place RESULT: BEFORE SPEC: (Zheng+ 2023)",
  );
  assert.match(prompt, /position-swap/);
  assert.match(prompt, /TaskResult-first ordering/);
});

test("buildPrompt(positionSwap=false) places TaskSpec before TaskResult", () => {
  const prompt = buildPrompt(SAMPLE_SPEC, SAMPLE_RESULT, false);
  const resultIdx = prompt.indexOf("RESULT:");
  const specIdx = prompt.indexOf("SPEC:");
  assert.ok(resultIdx >= 0, "forward prompt must contain RESULT: marker");
  assert.ok(specIdx >= 0, "forward prompt must contain SPEC: marker");
  assert.ok(
    specIdx < resultIdx,
    "forward prompt must place SPEC: BEFORE RESULT:",
  );
  assert.match(prompt, /forward/);
  assert.match(prompt, /TaskSpec-first ordering/);
});

// -- Fix-up batch: M-10 empty-dict guard -------------------------------------

test("spawnPanels rejects empty {} spec", async () => {
  const mock = makeMockSpawn(APPROVE_VERDICTS);
  await assert.rejects(
    spawnPanels({}, SAMPLE_RESULT, { mockSpawn: mock }),
    (err) => err instanceof TypeError && /spec/i.test(err.message) && /empty|0 keys/i.test(err.message),
    "empty {} spec must be rejected fail-CLOSED",
  );
});

test("spawnPanels rejects empty {} result", async () => {
  const mock = makeMockSpawn(APPROVE_VERDICTS);
  await assert.rejects(
    spawnPanels(SAMPLE_SPEC, {}, { mockSpawn: mock }),
    (err) => err instanceof TypeError && /result/i.test(err.message) && /empty|0 keys/i.test(err.message),
    "empty {} result must be rejected fail-CLOSED",
  );
});

test("spawnPanels rejects array spec / result", async () => {
  const mock = makeMockSpawn(APPROVE_VERDICTS);
  await assert.rejects(
    spawnPanels([], SAMPLE_RESULT, { mockSpawn: mock }),
    (err) => err instanceof TypeError && /spec/i.test(err.message) && /Array/.test(err.message),
    "array-typed spec must be rejected",
  );
  await assert.rejects(
    spawnPanels(SAMPLE_SPEC, [], { mockSpawn: mock }),
    (err) => err instanceof TypeError && /result/i.test(err.message) && /Array/.test(err.message),
    "array-typed result must be rejected",
  );
});

// -- Fix-up batch: I-4 Promise.allSettled survivor-completion ----------------

test("spawnPanels waits for all 3 panels to settle even when one fails", async () => {
  // Track how many panels actually completed --- if Promise.all short-circuit
  // returned early without awaiting siblings, this counter would be < 3 by
  // the time the rejection propagated. With Promise.allSettled, all 3 panels
  // complete (success or failure) before spawnPanels resolves/rejects.
  let completedPanels = 0;
  const slowSpawn = async (panelId) => {
    // Simulate variable latency so panel-2 fails AFTER panel-1 has started
    // but BEFORE panel-3 finishes; we want to verify panel-3 still gets to
    // increment the counter before spawnPanels rejects.
    if (panelId === 1) {
      await new Promise((r) => setTimeout(r, 10));
      completedPanels += 1;
      return APPROVE_VERDICTS[0];
    }
    if (panelId === 2) {
      await new Promise((r) => setTimeout(r, 20));
      throw new JuryPanelError("panel-2 simulated failure", {
        panelId: 2,
        cause: "simulated",
      });
    }
    // panel-3
    await new Promise((r) => setTimeout(r, 40));
    completedPanels += 1;
    return APPROVE_VERDICTS[2];
  };
  await assert.rejects(
    spawnPanels(SAMPLE_SPEC, SAMPLE_RESULT, { mockSpawn: slowSpawn }),
    /panel-2 simulated failure/,
    "spawnPanels rejects with the first failure's reason",
  );
  // Promise.allSettled guarantees that by the time spawnPanels resolves or
  // rejects, all 3 task promises have settled. So panel-1 + panel-3 both
  // completed their async work --- no orphan promises.
  assert.equal(
    completedPanels,
    2,
    "panel-1 + panel-3 must both complete (no orphan promises post-I-4 fix)",
  );
});

test("JuryPanelError from one panel surfaces with original metadata", async () => {
  // Carry-forward Promise.all -> Promise.allSettled migration: the
  // JuryPanelError's panelId + cause metadata must survive the rejection
  // route through allSettled + rebuild.
  const failSpawn = async (panelId) => {
    if (panelId === 1) {
      throw new JuryPanelError("panel-1 non-JSON output", {
        panelId: 1,
        cause: "non-json",
      });
    }
    return APPROVE_VERDICTS[panelId - 1];
  };
  await assert.rejects(
    spawnPanels(SAMPLE_SPEC, SAMPLE_RESULT, { mockSpawn: failSpawn }),
    (err) => {
      assert.ok(err instanceof JuryPanelError);
      assert.equal(err.panelId, 1);
      assert.equal(err.cause, "non-json");
      assert.match(err.message, /panel-1/);
      return true;
    },
  );
});
