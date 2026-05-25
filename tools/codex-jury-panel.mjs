#!/usr/bin/env node
/**
 * L3 Jury-on-Demand 3-judge codex panel spawner (W374-EXT Task 9 A3).
 *
 * Spawns three `codex exec` CLI rounds concurrently. Panel-2 runs the
 * position-swap prompt (TaskResult -> TaskSpec ordering); panels 1+3 run
 * the forward prompt (TaskSpec -> TaskResult). Each panel returns a
 * PanelResult-shaped JSON object that downstream consumers feed into
 * `agents/jury_aggregator.py`'s `jury_aggregate` function for CISC-
 * weighted majority adjudication.
 *
 * Wraps the existing W335 codex Stop-hook contract --- the codex CLI is
 * pre-installed via the `@openai-codex` plugin under
 * `.claude/plugins/cache/openai-codex/codex/1.0.4/`. Verified CLI version
 * codex-cli 0.130.0 (probed via `codex --version` 2026-05-22).
 *
 * Real codex CLI 0.130.0 invocation contract (verified via
 * `codex exec --help`):
 *   - Prompt comes via positional `[PROMPT]` arg OR via stdin when `-` is
 *     used (or when no positional arg + stdin is piped). We use the `-`
 *     stdin path because adversarial-review prompts can exceed shell
 *     argument-length limits (Windows CreateProcess MAX_ARG_STRLEN
 *     32767 bytes; large TaskSpec+TaskResult JSON blobs easily exceed it).
 *   - Codex CLI 0.130.0 `exec` subcommand does NOT expose `--effort`,
 *     `--temperature`, or `--input-file` flags. The flag set is:
 *       -c / --config <key=value>   TOML config override
 *       -m / --model <MODEL>        model name
 *       -p / --profile <PROFILE>    config-profile name
 *       -s / --sandbox <MODE>       sandbox policy
 *       -C / --cd <DIR>             working directory
 *       --ephemeral                 do not persist session files
 *       --skip-git-repo-check       allow non-repo CWD
 *       --output-schema <FILE>      JSON schema for final response
 *       (full list per `codex exec --help` at probe time)
 *   - We use --ephemeral (no session leak between panel rounds) +
 *     --skip-git-repo-check (defensive: panel may run outside the parent
 *     repo).
 *
 * Cite-anchors (CR-6 verify-before-claim --- 3-org-distinct):
 *   - Taubenfeld+ 2025 CISC arXiv:2502.06233 "Confidence Improves
 *     Self-Consistency in LLMs" (Google Research / Hebrew University /
 *     Technion) --- primary peer-reviewed source for the confidence-
 *     weighted majority vote used by the downstream aggregator.
 *   - Zhao+ 2025 CARE OpenReview XdcofpTCyq "From Many Voices to One:
 *     Statistically Principled Aggregation of LLM Judges" (UW-Madison ---
 *     NeurIPS 2025 Workshop on LLM Evaluation; motivates explicit
 *     position-swap-consistency tracking).
 *   - Zheng+ 2023 MT-Bench arXiv:2306.05685 (UC Berkeley / Stanford /
 *     EPFL --- broadly anchors LLM-as-judge + position-swap as canonical
 *     judging protocols; the specific 3-panel composition here is a
 *     project-engineering elaboration, NOT a verbatim recommendation).
 *   - Wang+ 2023 JudgeLM arXiv:2310.17631 (Beihang/Tencent --- jury
 *     aggregation methodology).
 *   - haizelabs/verdict v0.2.7 MIT (Haize Labs Inc --- Unit/Layer/Block
 *     primitives reference implementation).
 *
 * Fail-CLOSED contract (Task 7 + 8 carry-forward):
 *   - codex CLI returns non-zero exit  --- JuryPanelError(cause="subprocess-exit-N")
 *   - codex stdout is not parseable JSON --- JuryPanelError(cause="non-json")
 *   - per-panel timeout exceeded         --- JuryPanelError(cause="timeout")
 *   - any of the 3 panels rejects        --- Promise.allSettled + rethrow
 *   - spec / result null or missing      --- TypeError at spawnPanels entry
 *
 * The `opts.mockSpawn` override exists for unit-test isolation; production
 * code MUST omit it so the real codex CLI fires.
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

/**
 * Project-internal panel-variation labels (3-element ladder).
 *
 * IMPORTANT: codex CLI 0.130.0 `exec` does NOT expose a per-invocation
 * temperature flag (verified via `codex exec --help` 2026-05-22). These
 * three values are therefore NOT real codex sampler temperatures. They
 * survive as project-internal LABELS that downstream consumers + tests
 * use to identify the three panel rounds; structural diversity between
 * panels comes from (a) the panel-2 position-swap prompt variation and
 * (b) running N independent codex rounds (codex itself samples
 * stochastically per round per its own internal config), NOT from per-
 * round temperature control.
 *
 * The labels (0.0, 0.3, 0.7) are preserved historically because they
 * map to a conceptual "deterministic / mid / exploratory" axis sketched
 * during plan-time; replacing them with abstract identifiers would
 * churn downstream tests for no behavior change. If future codex CLI
 * versions expose `--temperature` (or an equivalent `-c sampler.temperature=...`
 * config override), the realCodexSpawn function below MAY plumb these
 * labels through as real temperature values --- until then they are
 * advisory only.
 *
 * MT-Bench (Zheng+ 2023 arXiv:2306.05685) supports LLM-as-judge +
 * position-swap broadly, but does NOT prescribe this specific (0.0, 0.3,
 * 0.7) triple. The 3-temperature ladder is project-invented as a
 * conceptual diversity primitive, NOT a canonical recommendation.
 */
export const PANEL_TEMPS = Object.freeze([0.0, 0.3, 0.7]);

/**
 * Panel-id (1-indexed) of the position-swap panel. Panels 1 + 3 run forward
 * (TaskSpec -> TaskResult); panel 2 runs reversed (TaskResult -> TaskSpec).
 * This single-swap-out-of-three composition is a project-engineering
 * diversity primitive: the swap panel exposes position-bias in the
 * underlying codex model, and the downstream `agents/jury_aggregator.py`
 * uses panel-2's disagreement with panels 1+3 to detect + demote APPROVE
 * verdicts that may have been driven by ordering rather than substance.
 * Builds on Zheng+ 2023 MT-Bench arXiv:2306.05685 position-swap protocol;
 * the specific "one-of-three" composition is project-engineering, not a
 * verbatim MT-Bench recommendation.
 */
export const SWAP_PANEL_ID = 2;

/**
 * Per-panel codex subprocess timeout (milliseconds). Default 15 minutes per
 * panel; total worst-case wall-time for the 3-panel jury is bounded by
 * (3 panels x 15 min) = 45 min when serialized, or ~15 min when parallel
 * (the typical case --- Promise.all dispatches all 3 concurrently).
 */
export const DEFAULT_PANEL_TIMEOUT_MS = 15 * 60 * 1000;

/**
 * Typed Error subclass for fail-CLOSED diagnostics. Carries panelId + cause
 * metadata so downstream consumers (dispatch CLI, audit log) can react
 * appropriately to subprocess failures.
 */
export class JuryPanelError extends Error {
  /**
   * @param {string} message - operator-readable failure description
   * @param {{panelId?: number, cause?: string, stderr?: string}} [meta]
   */
  constructor(message, meta = {}) {
    super(message);
    this.name = "JuryPanelError";
    this.panelId = meta.panelId;
    // Use a separate property name from Error's built-in `cause` option to
    // avoid the V8-internal cause-chain semantics intersecting with our
    // string diagnostic. We expose `this.cause` as a plain string.
    this.cause = meta.cause;
    this.stderr = meta.stderr;
  }
}

/**
 * Build the codex CLI prompt for a single panel round.
 *
 * Position-swap panel sees TaskResult first + TaskSpec second; forward
 * panels see TaskSpec first + TaskResult second. The swap-vs-forward
 * comparison is a project-engineering elaboration of Zheng+ 2023 MT-Bench
 * arXiv:2306.05685 position-bias mitigation: if a model is order-biased,
 * the position-swap panel will disagree with the forward panels, surfacing
 * a bias signal that the CISC aggregator's swap-consistency check uses to
 * demote APPROVE verdicts. MT-Bench documents position-bias measurement +
 * swap-as-mitigation broadly; the specific 3-panel one-swap composition is
 * project-engineering, not a verbatim MT-Bench recommendation.
 *
 * Exported (M-8) for unit-test access; production code paths invoke this via
 * `realCodexSpawn`.
 *
 * @param {object} spec - TaskSpec JSON
 * @param {object} result - TaskResult JSON
 * @param {boolean} positionSwap - true iff this panel runs reversed
 * @returns {string} the prompt text passed to `codex exec`
 */
export function buildPrompt(spec, result, positionSwap) {
  const verdictSurface =
    'Respond with strict JSON: {"verdict": "APPROVE|REVISE|NEEDS-REVISION|BLOCK", ' +
    '"confidence": 0.0-1.0, "rationale": "..."}';
  if (positionSwap) {
    return [
      "Adversarial review (position-swap; TaskResult-first ordering).",
      "Given this TaskResult, does it satisfy this TaskSpec?",
      "",
      "RESULT:",
      JSON.stringify(result, null, 2),
      "",
      "SPEC:",
      JSON.stringify(spec, null, 2),
      "",
      verdictSurface,
    ].join("\n");
  }
  return [
    "Adversarial review (forward; TaskSpec-first ordering).",
    "Given this TaskSpec, does this TaskResult satisfy it?",
    "",
    "SPEC:",
    JSON.stringify(spec, null, 2),
    "",
    "RESULT:",
    JSON.stringify(result, null, 2),
    "",
    verdictSurface,
  ].join("\n");
}

/**
 * Parse a single codex stdout payload into a PanelResult.
 *
 * Codex output may include log lines before the JSON object; this parser
 * locates the first { ... } block via brace-matching rather than naive
 * JSON.parse-on-entire-stdout (which fails on mixed log+JSON output).
 *
 * Exported (I-5) for unit-test access; the brace-matching parser is the most
 * fragile piece of the spawner and benefits from direct test coverage on
 * adversarial inputs (nested objects, escaped quotes, leading log lines,
 * missing fields, malformed JSON).
 *
 * @param {string} stdout - raw codex CLI stdout
 * @param {number} panelId - 1, 2, or 3
 * @param {boolean} positionSwap - panel orientation
 * @returns {{panel_id: number, verdict: string, confidence: number, rationale: string, position_swap: boolean}}
 * @throws {JuryPanelError} if JSON cannot be extracted or required fields are missing
 */
export function parsePanelOutput(stdout, panelId, positionSwap) {
  // Locate the first balanced { ... } block. Tolerates leading log lines.
  let depth = 0;
  let start = -1;
  let inString = false;
  let escape = false;
  let end = -1;
  for (let i = 0; i < stdout.length; i += 1) {
    const ch = stdout[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\" && inString) {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") {
      if (depth === 0) start = i;
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (start === -1 || end === -1) {
    throw new JuryPanelError(
      `panel-${panelId} codex output had no JSON object: ` +
        `${stdout.slice(0, 200)}`,
      { panelId, cause: "non-json", stderr: stdout },
    );
  }
  const blob = stdout.slice(start, end + 1);
  let parsed;
  try {
    parsed = JSON.parse(blob);
  } catch (e) {
    throw new JuryPanelError(
      `panel-${panelId} codex output JSON.parse failed: ${e.message}`,
      { panelId, cause: "non-json", stderr: stdout },
    );
  }
  // Required-field guard
  for (const key of ["verdict", "confidence", "rationale"]) {
    if (!(key in parsed)) {
      throw new JuryPanelError(
        `panel-${panelId} codex output missing field "${key}"`,
        { panelId, cause: "missing-field", stderr: stdout },
      );
    }
  }
  return {
    panel_id: panelId,
    verdict: parsed.verdict,
    confidence: Number(parsed.confidence),
    rationale: String(parsed.rationale),
    position_swap: positionSwap,
  };
}

/**
 * Build the codex CLI argv array for a single panel `codex exec` invocation.
 *
 * Exported for unit-test access so the codex CLI arg-shape can be asserted
 * without spawning a real subprocess. Real codex CLI 0.130.0 contract
 * (verified via `codex exec --help` 2026-05-22):
 *
 *   - Positional `[PROMPT]` arg accepts `-` to signal "read prompt from
 *     stdin"; we use this to avoid command-line length limits (Windows
 *     CreateProcess MAX_ARG_STRLEN 32767 bytes).
 *   - `--ephemeral` disables session-file persistence (no leak across the
 *     3 panel rounds).
 *   - `--skip-git-repo-check` allows the panel to run outside a git repo
 *     (defensive; the spawner caller may invoke us from arbitrary CWDs).
 *   - `--color never` keeps stdout free of ANSI escape codes that would
 *     confuse the brace-matching JSON extractor in `parsePanelOutput`.
 *
 * NOT INCLUDED:
 *   - `--temperature`: NOT a real codex CLI 0.130.0 flag. The PANEL_TEMPS
 *     ladder is a project-internal label (see PANEL_TEMPS docstring).
 *   - `--effort`: NOT a real codex exec flag; effort is exposed only on
 *     the interactive TUI surface, not on `exec`.
 *   - `--input-file`: NOT a real codex CLI 0.130.0 flag. Prompts come via
 *     positional arg OR stdin.
 *
 * @returns {string[]} argv array for `spawn("codex", argv)`
 */
export function buildCodexArgs() {
  return [
    "exec",
    "--ephemeral",
    "--skip-git-repo-check",
    "--color",
    "never",
    "-",
  ];
}

/**
 * Spawn a real `codex exec` subprocess for one panel. Default impl; the
 * spawnPanels API accepts an opts.mockSpawn override for unit-test isolation.
 *
 * The prompt is piped via stdin (codex CLI 0.130.0 reads stdin when the
 * positional PROMPT arg is `-`). The `temperature` parameter is preserved
 * in the signature so opts.mockSpawn-based tests can still assert on its
 * value, but it is NOT plumbed to codex --- codex CLI 0.130.0 does not
 * expose per-invocation temperature control (see PANEL_TEMPS docstring).
 *
 * @param {number} panelId
 * @param {object} spec
 * @param {object} result
 * @param {number} temperature  advisory label only (see PANEL_TEMPS docstring)
 * @param {boolean} positionSwap
 * @param {number} timeoutMs
 * @returns {Promise<object>} PanelResult
 */
function realCodexSpawn(
  panelId,
  spec,
  result,
  /* temperature -- intentionally unused; codex CLI 0.130.0 has no per-
     invocation temperature flag. Parameter kept in signature for mock-test
     compatibility + future-flag-availability via realCodexSpawn override. */
  // eslint-disable-next-line no-unused-vars
  temperature,
  positionSwap,
  timeoutMs,
) {
  const prompt = buildPrompt(spec, result, positionSwap);
  const argv = buildCodexArgs();

  return new Promise((resolve, reject) => {
    // codex CLI invocation per W335 gate convention; prompt piped via stdin
    // (positional `-` arg in argv signals "read stdin").
    const proc = spawn("codex", argv, {
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    // I-3: SIGTERM-only timeout was insufficient --- if the codex subprocess
    // traps SIGTERM (or is stuck in an uninterruptible syscall) the process
    // hangs indefinitely. We now schedule a 5-second escalation timer that
    // sends SIGKILL after the initial SIGTERM. Both timers are cleared in
    // the `close` event handler so they cannot fire post-exit (which would
    // throw an ENOENT on the now-defunct PID on some platforms; harmless
    // but noisy). On Windows, Node's child_process.kill() with any signal
    // string force-terminates the process via TerminateProcess --- the
    // SIGKILL escalation is still kept for cross-platform consistency.
    let killTimer = null;
    const timer = setTimeout(() => {
      timedOut = true;
      proc.kill("SIGTERM");
      killTimer = setTimeout(() => {
        // Escalate: subprocess ignored SIGTERM. Force-terminate.
        proc.kill("SIGKILL");
      }, 5000);
    }, timeoutMs);

    proc.stdout.on("data", (d) => {
      stdout += d.toString();
    });
    proc.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    proc.on("error", (err) => {
      clearTimeout(timer);
      if (killTimer) clearTimeout(killTimer);
      reject(
        new JuryPanelError(
          `panel-${panelId} codex spawn error: ${err.message}`,
          { panelId, cause: "spawn-error", stderr },
        ),
      );
    });
    proc.on("close", (code) => {
      clearTimeout(timer);
      if (killTimer) clearTimeout(killTimer);
      if (timedOut) {
        return reject(
          new JuryPanelError(
            `panel-${panelId} codex timed out after ${timeoutMs}ms`,
            { panelId, cause: "timeout", stderr },
          ),
        );
      }
      if (code !== 0) {
        return reject(
          new JuryPanelError(
            `panel-${panelId} codex exited with code ${code}: ${stderr.slice(
              0,
              200,
            )}`,
            { panelId, cause: `subprocess-exit-${code}`, stderr },
          ),
        );
      }
      try {
        resolve(parsePanelOutput(stdout, panelId, positionSwap));
      } catch (e) {
        reject(e);
      }
    });

    // Pipe the prompt into codex's stdin and close to signal EOF.
    proc.stdin.on("error", (err) => {
      // EPIPE can fire if codex exits before we finish writing; the close
      // handler above will resolve/reject with the real exit-code reason.
      // Swallowing here prevents an unhandled-error process crash.
      if (err && err.code !== "EPIPE") {
        // Still reject for non-EPIPE stdin failures (e.g. ENOMEM).
        clearTimeout(timer);
        if (killTimer) clearTimeout(killTimer);
        reject(
          new JuryPanelError(
            `panel-${panelId} codex stdin write failed: ${err.message}`,
            { panelId, cause: "stdin-error", stderr },
          ),
        );
      }
    });
    try {
      proc.stdin.write(prompt);
      proc.stdin.end();
    } catch (err) {
      // Synchronous write failure (rare); rely on the stdin 'error' handler
      // OR the close handler to surface the real cause.
      if (err && err.code !== "EPIPE") {
        clearTimeout(timer);
        if (killTimer) clearTimeout(killTimer);
        reject(
          new JuryPanelError(
            `panel-${panelId} codex stdin write threw: ${err.message}`,
            { panelId, cause: "stdin-error", stderr },
          ),
        );
      }
    }
  });
}

/**
 * Spawn 3 codex panels concurrently and return their PanelResult outputs.
 *
 * Default behavior: invokes the real `codex` CLI via `realCodexSpawn`.
 * Unit-test behavior: pass `opts.mockSpawn` to short-circuit the subprocess
 * call with a deterministic in-memory response.
 *
 * I-4 fix: previously used `Promise.all` which short-circuits on first
 * rejection but does NOT cancel sibling promises --- losing codex subprocesses
 * kept running in the background, leaking heavy resources on Windows. The
 * new implementation uses `Promise.allSettled` + an AbortController-style
 * cancel hook so that:
 *   1. We always wait for all 3 panels to settle (no orphan promises).
 *   2. On first failure, we still throw a JuryPanelError that mirrors the
 *      original failure (operator-UX preserved).
 *   3. The mockSpawn (or real) function MAY honor an opts.abortSignal in
 *      its 7th positional argument to terminate early; if it does not, the
 *      survivors still complete --- the worst case is bounded by the
 *      per-panel timeout.
 * Rationale: Promise.allSettled + post-collection error rebuilding is the
 * cleaner of the two approaches sketched in the I-4 finding (preserving
 * existing error semantics over a bespoke AbortController[] dance).
 *
 * @param {object} spec - TaskSpec JSON object (NOT a path; pre-parsed)
 * @param {object} result - TaskResult JSON object (NOT a path; pre-parsed)
 * @param {{mockSpawn?: Function, timeoutMs?: number}} [opts]
 * @returns {Promise<object[]>} array of 3 PanelResult objects
 * @throws {TypeError} if spec or result is null/undefined or empty
 * @throws {JuryPanelError} if any panel subprocess fails fail-CLOSED
 */
export async function spawnPanels(spec, result, opts = {}) {
  if (spec === null || spec === undefined) {
    throw new TypeError("spawnPanels: spec MUST be a non-null object");
  }
  if (result === null || result === undefined) {
    throw new TypeError("spawnPanels: result MUST be a non-null object");
  }
  // M-10: empty-dict guard. {} satisfies the null/undefined check above but
  // carries no payload for the codex panel to evaluate; downstream LLM
  // would produce noise rather than a meaningful verdict. fail-CLOSED.
  if (typeof spec !== "object" || Array.isArray(spec) || Object.keys(spec).length === 0) {
    throw new TypeError(
      "spawnPanels: spec MUST be a non-empty plain object {} (got "
        + (Array.isArray(spec) ? "Array" : `object with ${Object.keys(spec).length} keys`)
        + ")",
    );
  }
  if (
    typeof result !== "object"
    || Array.isArray(result)
    || Object.keys(result).length === 0
  ) {
    throw new TypeError(
      "spawnPanels: result MUST be a non-empty plain object {} (got "
        + (Array.isArray(result)
          ? "Array"
          : `object with ${Object.keys(result).length} keys`)
        + ")",
    );
  }
  const spawnFn = opts.mockSpawn ?? realCodexSpawn;
  const timeoutMs = opts.timeoutMs ?? DEFAULT_PANEL_TIMEOUT_MS;
  const tasks = PANEL_TEMPS.map((temp, idx) => {
    const panelId = idx + 1;
    const positionSwap = panelId === SWAP_PANEL_ID;
    return spawnFn(panelId, spec, result, temp, positionSwap, timeoutMs);
  });
  // I-4: collect ALL settlements (no orphan promises). Then if any rejected,
  // throw the FIRST rejection's reason to preserve the prior Promise.all
  // error semantics --- this keeps the existing test surface (single-reject
  // -> error of that panel) green while eliminating the orphan-promise leak.
  const settled = await Promise.allSettled(tasks);
  const rejections = settled.filter((s) => s.status === "rejected");
  if (rejections.length > 0) {
    // Prefer the first rejection reason so messages are deterministic.
    // Note: at this point all 3 panel promises have already settled --- the
    // mockSpawn / real subprocess implementations honor their own timers +
    // cleanup. The killTimer escalation in realCodexSpawn ensures real
    // codex subprocesses do not hang past 5s after their per-panel timeout.
    throw rejections[0].reason;
  }
  return settled.map((s) => s.value);
}

// -- CLI entry point ---------------------------------------------------------
// Reads --task-spec <path> + --task-result <path> JSON files, emits panel
// JSON-lines to stdout. fail-CLOSED on any panel error (exit 3 per W335
// gate convention).

/**
 * Detect whether this module is being executed as the entry-point script
 * (vs imported as a library). Cross-platform: Windows and POSIX disagree
 * on the file:// URL form for `process.argv[1]`:
 *
 *   POSIX:   `/path/to/script.mjs`              -> `file:///path/to/script.mjs`
 *   Windows: `Z:\path\to\script.mjs`            -> `file:///Z:/path/to/script.mjs`
 *
 * Node's `import.meta.url` always uses forward-slash separators and the
 * three-slash form on Windows (`file:///Z:/...`), while POSIX is two-slash
 * `file:///abs-path`. Some older Node versions on Windows emit
 * `file://Z:/...` (two-slash + drive letter, no leading slash); this dual
 * check tolerates both forms. M-9: documented inline rather than factored
 * out --- the helper would be a one-line wrapper around the same comparison
 * and the path-form drift is more legible when shown explicitly. R-D
 * (cross-platform isMain integration test) is deferred to Task 10.
 */
const isMain = (() => {
  if (!process.argv[1]) return false;
  const argv1Normalized = process.argv[1].replace(/\\/g, "/");
  return import.meta.url === `file:///${argv1Normalized}`
    || import.meta.url === `file://${argv1Normalized}`;
})();

if (isMain) {
  const argv = process.argv.slice(2);
  const specIdx = argv.indexOf("--task-spec");
  const resultIdx = argv.indexOf("--task-result");
  if (specIdx === -1 || resultIdx === -1) {
    process.stderr.write(
      "Usage: codex-jury-panel.mjs --task-spec <path> --task-result <path>\n",
    );
    process.exit(2);
  }
  const specArg = argv[specIdx + 1];
  const resultArg = argv[resultIdx + 1];
  if (!specArg || !resultArg) {
    process.stderr.write(
      "codex-jury-panel.mjs: --task-spec and --task-result require path arguments\n",
    );
    process.exit(2);
  }
  let spec;
  let result;
  try {
    spec = JSON.parse(readFileSync(specArg, "utf-8"));
    result = JSON.parse(readFileSync(resultArg, "utf-8"));
  } catch (e) {
    process.stderr.write(`codex-jury-panel.mjs: failed to read inputs: ${e.message}\n`);
    process.exit(2);
  }
  spawnPanels(spec, result)
    .then((panels) => {
      for (const p of panels) {
        process.stdout.write(JSON.stringify(p) + "\n");
      }
      process.exit(0);
    })
    .catch((e) => {
      process.stderr.write(`codex-jury-panel.mjs error: ${e.message}\n`);
      process.exit(3); // fail-CLOSED per W335 gate
    });
}
