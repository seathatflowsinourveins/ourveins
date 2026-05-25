# W411c — AGENT_CONTRACT.yaml + CI verdict-gate

> Operator overview · 2026-05-24 · closes W411 audit Gap-3 / Deliverable-2

## Why

The W411 deep-convergence research audit
(`Z:/claude-sota-installed-state/W411-CONVERGENCE-AUDIT-REPORT.md` §2.2 Gap-3
+ §4 Deliverable-2) identified that Phase-0a delivers strong **imperative**
contract enforcement via `tools/eee-checks/block-rules.mjs` B1-B10 + 67 tests +
the existing pre-commit pipeline, but ships **NO declarative single-pane audit
artifact**. The SOTA frontier — set by `pyyush/agentcontracts v0.2.0`
(Apache-2.0, March 26 2026) + `flyersworder/agent-contracts v0.3.0` (Apache-2.0,
March 28 2026) — converged on **declarative YAML contracts + CI verdict
artifacts** as the canonical pattern for an operator-auditable, machine-
enforceable agent-effects boundary.

This wave lands that declarative overlay **without removing the imperative
half** — defense-in-depth, not replacement.

## Codex r1 correction trail

The initial W411c draft was BLOCKED by codex GPT-5.5 r1 with 4 findings (3 BLOCK
+ 1 HIGH): wrong PyPI package name (`agentcontracts` → must be `aicontracts`),
wrong CLI contract (`check-verdict --contract --output` → real signature is
positional `check-verdict <verdict.json>`), wrong YAML schema shape (`metadata`
→ `identity`, nested `budgets` → flat `max_*`, `verdict.output.path` →
`observability.run_artifact_path`), and unsupported `deny:` override claim
(schema is allowlist-default-deny, no explicit deny field). All 4 findings
verified via PyPI page fetch + local schema inspection at
`<site-packages>/agent_contracts/schemas/agent-contract.schema.json`. The
current files are the corrected post-codex-r1 state.

## What lands

| File | Purpose |
|---|---|
| `AGENT_CONTRACT.yaml` (repo root) | Schema-conformant per pyyush/agentcontracts v0.2.0 (`agent_contract: "0.1.0"`). Validates with `aicontracts validate` → Tier 2 (Composable). |
| `.pre-commit-config.yaml` (+ `aicontracts-validate` hook) | Pre-commit gate runs `aicontracts validate <path>`; advisory if CLI absent (bootstrap-friendly), binding once installed. |
| `.github/workflows/agentcontracts.yml` | Required PR status check. Runs `aicontracts validate` (always) + `aicontracts check-verdict` (on any verdict.json artifact discovered in the PR). Blocks merge on validation FAIL or verdict outcome ∈ {blocked, fail}. Pinned first-party Actions. |
| `.gitignore` (`.agent-contracts/runs/` entry) | Belt-and-suspenders against stray in-repo verdict.json writes; state-outside-repo lives at `Z:/claude-sota-installed-state/.agent-contracts/`. |

## What stays as-is (defense-in-depth)

| Layer | File | Role |
|---|---|---|
| L1 imperative, RUNTIME | `tools/eee-checks/block-rules.mjs` | B1-B10 runtime block-rules (services / CLI / MCP / state). |
| L2 imperative, COMMIT | `.pre-commit-config.yaml` (gitleaks / ruff / shellcheck / actionlint / cr2-2kb / etc.) | Per-commit imperative gates. |
| L3 declarative, COMMIT | `AGENT_CONTRACT.yaml` + `aicontracts-validate` hook (NEW) | Per-commit schema-conformance gate. |
| L4 declarative, CI | `.github/workflows/agentcontracts.yml` (NEW) | Server-side validate + verdict gate. |

L1-L2 stay; L3-L4 are NEW. If `aicontracts` CLI is uninstalled the L3 hook is
advisory-only; the L4 CI workflow installs the CLI in its own runner and is
binding.

## How the verdict.json flow works (per pyyush/agentcontracts v0.2.0)

- `AGENT_CONTRACT.yaml` declares postconditions with CEL-like `check:` expressions.
- At agent runtime, the appropriate adapter (one of
  `<site-packages>/agent_contracts/adapters/{claude_agent,langchain,openai_agents}.py`)
  records check outcomes and writes a `verdict.json` artifact to the path declared
  in `observability.run_artifact_path` (`.agent-contracts/runs/{run_id}/verdict.json`
  by default). aicontracts v0.2.0 source has NO env-var redirect hook; state-
  outside-repo placement is via either (a) editing
  `observability.run_artifact_path` to an absolute path, or (b) operator-side
  symlink `mklink /D .agent-contracts Z:\claude-sota-installed-state\.agent-contracts`.
- `aicontracts check-verdict <path>` inspects the verdict and exits 1 on
  outcome ∈ {blocked, fail}. The CI workflow's "Check verdict.json" step does this.
- **Today**: no agent-runtime adapter is wired into eee.ps1 yet. The L4 workflow
  runs `validate` (always meaningful) + a no-op pass-through on verdict.json
  (only fires when an adapter run lands artifacts in the PR). Adapter wiring is
  a follow-on wave.

## Cardinal-rule alignment (CLAUDE.md R1-R6)

- **R1 (trust-tuple)**: PyPI `aicontracts==0.2.0` — Apache-2.0 (license-risk
  audit PASS), most-recent release March 26 2026 (within audit window), maintainer
  identity `pyyush` on GitHub, install via `pip install aicontracts==0.2.0`
  (provenance via PyPI metadata).
- **R2 (hook-discipline)**: pre-commit hook invokes `aicontracts` directly via
  `bash -c '... aicontracts validate <path> ...'` — no project-owned hook body
  file under `.claude/hooks/**`.
- **R3 (subagent-discipline)**: no new `subagent_type` introduced.
- **R4 (project-behavior)**: no `.claude/rules/` auto-fire prompt added; no
  CLAUDE.md changes.
- **R5 (sandbox-discipline)**: declarative-allowlist hardening atop the
  existing CC permissions + pre-commit + CI gates — not a custom guard script.
- **R6 (verify-before-claim)**: every `contract.postconditions[].check` is a
  CEL-like expression over the runtime-adapter verdict shape; verdict.json is
  the machine-readable audit artifact.

## Cite-anchors (3-org-distinct floor per CR-6 / sca-v13)

1. **pyyush/agentcontracts v0.2.0** (schema authority, Apache-2.0) — March 26
   2026: <https://github.com/pyyush/agentcontracts>
2. **PyPI aicontracts==0.2.0** (install authority, package name verified):
   <https://pypi.org/project/aicontracts/0.2.0/>
3. **flyersworder/agent-contracts v0.3.0** (pattern reference, Apache-2.0) —
   March 28 2026: <https://github.com/flyersworder/agent-contracts>
4. **Anthropic Claude Code sub-agents docs** (tool surface authority):
   <https://docs.anthropic.com/en/docs/claude-code/sub-agents>
5. **W411 convergence audit** (operator-curated; in-runtime artifact):
   `Z:/claude-sota-installed-state/W411-CONVERGENCE-AUDIT-REPORT.md`

## Operator install path (one-time, optional)

```powershell
# Inside the shared venv per CLAUDE.local.md (Z:\venvs\claude\):
pip install 'aicontracts==0.2.0'

# Smoke-test (acceptance criterion (a)) — verified locally 2026-05-24 PASS:
aicontracts validate AGENT_CONTRACT.yaml     # expect exit 0, Tier 2 (Composable)

# List declared postconditions (advisory):
aicontracts test AGENT_CONTRACT.yaml

# Inspect any locally-produced verdict.json:
aicontracts check-verdict Z:/claude-sota-installed-state/.agent-contracts/runs/<run-id>/verdict.json
```

If `aicontracts` is uninstalled, the L3 pre-commit hook prints an advisory
and exits 0. The L4 CI workflow always runs against a clean runner with the
CLI installed, so the binding gate is the CI layer.

## Acceptance-criteria record (per W411 audit Deliverable-2)

| ID | Criterion | Status |
|---|---|---|
| (a) | `aicontracts validate AGENT_CONTRACT.yaml` passes | Verified locally 2026-05-24: `Validation: PASSED · Tier: 2 (Composable)`. Same step runs in L4 CI workflow. |
| (b) | `aicontracts validate` integrated as pre-commit hook (CR-2-compliant) | `aicontracts-validate` entry appended to `.pre-commit-config.yaml` — inline `bash -c '... aicontracts validate ...'` direct-CLI form. |
| (c) | verdict.json written to `Z:/claude-sota-installed-state/.agent-contracts/runs/{run_id}/` | Declared in `AGENT_CONTRACT.yaml:observability.run_artifact_path` as the schema-canonical relative path. aicontracts v0.2.0 source has NO env-var redirect hook (verified at `<site-packages>/agent_contracts/cli.py`+`types.py`); state-outside-repo redirect is via operator symlink convention (`mklink /D .agent-contracts Z:/claude-sota-installed-state/.agent-contracts`). The in-repo `.agent-contracts/runs/` path is .gitignored as belt-and-suspenders. Runtime adapter wiring is a follow-on wave — advisory until then. |
| (d) | `.github/workflows/agentcontracts.yml` blocks merge on `blocked`/`fail` | Workflow's "Check verdict.json" step exits 1 on validate-FAIL or any discovered verdict.json with outcome ∈ {blocked, fail}. |

## Escape hatches (CR-5 condition-(b) operator-only)

- `$env:AGENTCONTRACTS_GATE_DISABLE=1` — disables the L3 pre-commit hook (CI L4 still binds).
- State-outside-repo redirect: aicontracts v0.2.0 has no env-var hook for
  the run-artifact path. Operators can either (a) edit
  `observability.run_artifact_path` in `AGENT_CONTRACT.yaml` to point at an
  absolute state-outside-repo path, or (b) create an operator-side symlink
  `mklink /D .agent-contracts Z:\claude-sota-installed-state\.agent-contracts`.

## Schema bypass limitation (codex r5..r9 review chain)

The aicontracts v0.2.0 schema uses **fnmatch glob-matching on normalized
command strings**. There is NO token-aware shell-argument matcher. Any
pattern with a trailing `*` admits arbitrary subsequent args (including
`--force`, `-d` delete, `--method DELETE`, `-exec rm`, and shell-redirection
`> /etc/passwd`).

The codex r5..r9 cross-model review chain surfaced this systematically:
- r5: `git push origin refs/heads/*` admits `... main --force`.
- r6: `git reset HEAD *` admits `... --hard`.
- r7: `git worktree *` admits `remove --force`; `gh repo *` admits `delete --yes`.
- r8: `git tag -a *` admits `-f`; `git config core.*` admits `core.hooksPath`.
- r9: `gh api repos/*` admits `--method DELETE`; `sed -n *` admits `s/.../w file`.

**W411c's response — explicit two-layer framing:**

1. **The YAML allowlist is the AUDIT-TRAIL layer.** It codifies operator
   INTENT — what shape of command the agent is operator-sanctioned to run.
   It does NOT claim to prevent every destructive-arg bypass possible under
   fnmatch's trailing-wildcard semantics. The patterns are deliberately
   permissive enough to support the wave-execution workflow without
   constant maintenance churn.
2. **The BINDING force-prevention layer is the imperative half:**
   - Pre-commit gates (gitleaks / cr2-2kb-hooks / z-phantom-guard /
     wave-lock-validate / codex-trailer-gate / cite-floor-check / etc.).
   - `tools/eee-checks/block-rules.mjs` B1-B10 (runtime block-rules).
   - GitHub branch-protection (server-side enforcement on main).
   - CC permission-mode sandbox (Anthropic CLI-level).
   - Operator-side GitHub admin perms (gh repo delete requires admin role).
3. **Destructive verbs that DO admit safe-only enumeration** are enumerated
   exactly:
   - `git push` family: only safe push forms (NO branch globs that admit
     `--force`). `--force-with-lease` is the CCBP-mandated safe equivalent.
   - `git reset` family: only `--soft` / `--mixed` / no-arg forms (NO `--hard`).
   - `git pull` family: only `--ff-only` and `--rebase` (NO destructive merge).

If a future aicontracts release adds a token-aware matcher (upstream issue
would land here when filed), the YAML allowlist can be tightened further.

## Rollback

`git revert <W411c-commit>` restores the prior state. No external state is
mutated by the contract itself; verdict.json under
`Z:/claude-sota-installed-state/.agent-contracts/` is purely an audit artifact
and can be deleted at any time.
