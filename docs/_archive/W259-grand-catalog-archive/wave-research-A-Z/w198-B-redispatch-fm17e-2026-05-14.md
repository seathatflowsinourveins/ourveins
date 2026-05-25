# W198 P2 FM-17.e Single-Claim BRIDGE-MODE Audit

Date: 2026-05-14

## Verdict

VERDICT: GENUINELY-NOVEL

Confidence: 0.88

## Claim Audited

FM-17.e codifies a CC-runtime autocompact-thrashing failure mode for BRIDGE-MODE codex-rescue:

- CC-runtime autocompact fires when a single tool output exceeds the context-window threshold.
- If the agent brief re-issues the same large-content tool call, context refills immediately after compaction.
- After 3 consecutive thrash cycles, CC-runtime self-aborts.
- Diagnostic discriminator is literal notification text: `Autocompact is thrashing`.
- Recovery path in the prompt: brief-tightening via `ctx_execute_file` substitution.

Local confirmation source: `Z:/claude-sota-installed/.claude/rules/fm17-subagent-fleet-depletion.md:97-98`.

## Probe Performed

Read local FM-17.e definition lines 90-110, then grepped each cohort repo for:

`autocompact|thrash|context compact|compact|recovery|FM-17`

Cohort:

- `Z:/repos/deps/superpowers`
- `Z:/repos/deps/addy-agent-skills`
- `Z:/repos/deps/mattpocock-skills`
- `Z:/repos/deps/everything-claude-code`
- `Z:/repos/deps/wshobson-agents`

## Evidence

### Local FM-17.e Definition

`fm17-subagent-fleet-depletion.md:97-98` defines `FM-17.e - Autocompact-thrashing` and describes the CC-runtime autocompact loop, 3 consecutive thrash cycles, self-abort, and diagnostic discriminator between `"stream watchdog"` and `"Autocompact is thrashing"`.

### Cohort Findings

`superpowers`:

- Matches only generic compaction/session concepts and generic debugging "thrashing".
- Examples: SessionStart on `compact`, persistence across context compaction, systematic debugging warning against guess-and-check thrashing.
- No literal `Autocompact is thrashing`.
- No FM-17.e-equivalent detection+recovery pattern.

`addy-agent-skills`:

- Path missing in this workspace during probe: `Z:/repos/deps/addy-agent-skills`.
- No cohort match available from this repo copy.

`mattpocock-skills`:

- Matches only handoff/compact wording.
- Example: compact current conversation into a handoff document.
- No literal `Autocompact is thrashing`.
- No CC-runtime autocompact-thrashing detection+recovery pattern.

`everything-claude-code`:

- Contains substantial strategic compaction guidance and hooks:
  - `hooks/README.md`: PreCompact and strategic compact hooks.
  - `README.md`: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`, `/compact`, and strategic compaction guidance.
  - `skills/strategic-compact/` appears in manifests/package metadata.
- These are proactive/manual context-management patterns, not a BRIDGE-MODE failure detector for literal `Autocompact is thrashing`.
- No FM-17.e-equivalent detection+recovery pattern found.

`wshobson-agents`:

- Matches are generic recovery/compact hits across agent templates, incident response, UI compact layout, data engineering file compaction, and similar domain content.
- One visible `autoCompact` hit is unrelated Spark/data-file compaction.
- No literal `Autocompact is thrashing`.
- No CC-runtime autocompact-thrashing detection+recovery pattern.

## Conclusion

No cohort repo in the probed set ships an equivalent pattern combining:

- CC-runtime autocompact-thrashing detection,
- literal `Autocompact is thrashing` diagnostic text,
- minimal tool-use/long-duration BRIDGE-MODE signature,
- and recovery by brief-tightening / `ctx_execute_file` substitution.

Therefore the FM-17.e codification is assessed as GENUINELY-NOVEL against this cohort.
