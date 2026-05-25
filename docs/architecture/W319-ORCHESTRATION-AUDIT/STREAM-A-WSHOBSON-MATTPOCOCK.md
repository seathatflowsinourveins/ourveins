# W319 Stream A — wshobson/agents + mattpocock/skills HEAD-vs-installed Drift (2026-05-19)

> Scope: line-by-line diff of `wshobson/agents` HEAD vs our installed SHA. Quick scan of `mattpocock/skills` for orchestration-relevant new skills.

## 1. wshobson/agents — HEAD `ece811f2` vs installed `08ded5e7`

**Local clone**: `Z:/repos/deps/wshobson-agents/` HEAD `ece811f23310a37ceb43496dbac0e244fe6845b6` (2026-05-02 `docs(security-scanning): remove links to unwritten SAST reference and asset files (#516)`).

**Installed SHA**: `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (per `installed_plugins.json:320` for `agent-teams@claude-code-workflows`).

**Drift**: ALL 80 plugins in `plugins/` dir are at the same upstream SHA — wshobson plugins are bumped together as the marketplace.

### 1.1 agent-teams changes (installed → HEAD)

```diff
diff plugins/agent-teams/agents/team-debugger.md      (2 lines changed)
diff plugins/agent-teams/agents/team-implementer.md   (2 lines changed)
diff plugins/agent-teams/agents/team-lead.md          (7 lines changed)
diff plugins/agent-teams/agents/team-reviewer.md      (2 lines changed)
diff plugins/agent-teams/commands/team-spawn.md       (5 lines changed)
diff plugins/agent-teams/skills/team-communication-protocols/SKILL.md      (5 lines changed)
diff plugins/agent-teams/skills/team-composition-patterns/SKILL.md         (18 lines changed)
diff plugins/agent-teams/skills/team-composition-patterns/references/agent-type-selection.md  (40 lines changed)
```

**Total: 8 files modified, 81 lines changed.** Almost all are coherent thematic edits in 2 batches.

### 1.2 BREAKING CONCEPTUAL CHANGE — team-lead tool allowlist gutted

**File**: `plugins/agent-teams/agents/team-lead.md`

```diff
-tools: Read, Glob, Grep, Bash, Agent, TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage
+tools: Read, Glob, Grep, Bash
```

Upstream HEAD's team-lead **NO LONGER has** `Agent`, `TeamCreate`, `TeamDelete`, `TaskCreate`, `TaskList`, `TaskGet`, `TaskUpdate`, or `SendMessage` in its allowlist. Per agent-frontmatter semantics (Anthropic CC sub-agent docs), this means upstream team-lead **CANNOT** create teams, spawn agents, dispatch tasks, or message — it can only `Read/Glob/Grep/Bash`.

**Implication**: upstream wshobson team-lead has been **DEORCHESTRATIONALIZED** — it is now a pure reasoning/synthesis agent. The actual orchestration primitives (`TeamCreate`, `Agent`, `SendMessage`) are now expected to be called by the **main session lead** (= the operator-facing Claude Code session), with team-lead being just a subagent the lead consults.

### 1.3 team-spawn.md change — subagent_type defaults to `general-purpose`

**File**: `plugins/agent-teams/commands/team-spawn.md`

```diff
-   - `name`: unique descriptive member name (e.g., "fullstack-lead", "frontend-impl", "security-reviewer")
-   - `subagent_type`: the selected role (for example, `agent-teams:team-lead`, `agent-teams:team-implementer`, `agent-teams:team-reviewer`, `agent-teams:team-debugger`, or `general-purpose` for research)
+   - `name`: descriptive member name (e.g., "security-reviewer", "hypothesis-1")
+   - `subagent_type`: "general-purpose" (teammates need full tool access)
    - `prompt`: Role-specific instructions referencing the appropriate agent definition
-3. Do not use the role name `team-lead` as the spawned member name. Team creation can reserve role-like names, so use a unique member name and address the teammate by the actual name returned by `Agent` or listed in `~/.claude/teams/{team-name}/config.json`.
```

**Upstream now mandates `subagent_type: "general-purpose"` for ALL teammates** (Phase 2 of team-spawn). This is a **DIRECT CONTRADICTION** of our installed v1.0.2 which uses `agent-teams:team-lead/reviewer/debugger/implementer` typed subagent_types.

**Why**: per the agent-type-selection.md diff (next subsection), upstream concludes that the typed `agent-teams:*` agents had **too-restrictive `tools:` allowlists** (read-only with team-tools) which prevented them from doing real work. Solution: drop the typed wrapper, use `general-purpose` (all tools), pass role-specific behaviour via the `prompt` argument.

### 1.4 agent-type-selection.md major rework

**File**: `plugins/agent-teams/skills/team-composition-patterns/references/agent-type-selection.md`

```diff
-| agent-teams:team-lead        | Yes | No  | No  | Yes | Yes | Team orchestration |
-| agent-teams:team-reviewer    | Yes | No  | No  | Yes | Yes | Code review        |
-| agent-teams:team-debugger    | Yes | No  | No  | Yes | Yes | Bug investigation  |
-| agent-teams:team-implementer | Yes | Yes | Yes | Yes | Yes | Feature building   |
+| agent-teams:team-lead        | Yes | Yes | Yes | Yes | Team orchestration |
+| agent-teams:team-reviewer    | Yes | Yes | Yes | Yes | Code review        |
+| agent-teams:team-debugger    | Yes | Yes | Yes | Yes | Bug investigation  |
+| agent-teams:team-implementer | Yes | Yes | Yes | Yes | Feature building   |
```

Upstream now grants **Write/Edit access to all typed agents**, removes the "Team Tools" column entirely (since SendMessage/Task* are no longer their tools).

### 1.5 SendMessage references in skills

Upstream removed:
- Mention of "agent-teams communication tools such as SendMessage, TaskList, TaskGet, TaskUpdate must be listed explicitly when an agent uses a restricted tool allowlist" (because typed agents no longer have restricted allowlists in upstream)
- Suffix-name handling guidance ("if a teammate was spawned as `team-lead-2`, send to `team-lead-2`") — simplified to just "Always use `name` ... never use `agentId` directly"

### 1.6 Strategic interpretation

Upstream wshobson has **pivoted the orchestration model**:
- **Installed v1.0.2 model**: typed agents with constrained tool allowlists; team-lead has TeamCreate/SendMessage as a 1st-class primitive; sub-agents communicate via SendMessage.
- **Upstream HEAD model**: all teammates are `general-purpose` with full tool access; orchestration primitives (TeamCreate, Agent, SendMessage) are called by the **main session lead** directly; the team-lead-as-subagent has been demoted to pure reasoning role.

**Which is correct per Anthropic CC?** Per `https://code.claude.com/docs/en/agent-teams` and W314-C-§3 + W318-A-§2: **only the main-session lead has TeamCreate/Agent/SendMessage**. Subagents (regardless of subagent_type) **cannot fan-out further** (the "No nested teams" rule).

This means **upstream HEAD is correct** in its conceptual model and the **installed v1.0.2 README is misleading** when it suggests team-lead-as-subagent can call TeamCreate. The W314-C OPERATIONAL verdict was correct (env-var-gated, not broken) BUT the operational use of team-lead-as-subagent would still hit the no-nested-teams wall.

### 1.7 Adoption decision

| Option                                                      | Pros                                                                                          | Cons                                                                                                                           |
|-------------------------------------------------------------|------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| (a) `/plugin update agent-teams@claude-code-workflows`      | Aligns with upstream + Anthropic CC primitive design (no nested teams). Reduces silent-fallback surface. | Plugin version may not advance past 1.0.2 yet — upstream may still be in-flight. Operator must `/plugin update` interactively. |
| (b) Pin to v1.0.2 + document the divergence                 | No churn. Operator behaviour stable.                                                          | Operator following installed README may attempt nested-team patterns that hit no-nested-teams wall silently. **Status quo**.   |
| (c) Vendor-fork agent-teams skills to `/.claude/skills/`    | Operator-curated wording, ECC cardinal-rule-4 compliant.                                      | Maintenance cost; diverges from official skill.                                                                                |

**W319 Stream A recommendation**: **(a) UPDATE to upstream HEAD**. The upstream model is cardinal-rule-3-compliant (uses Anthropic CC sub-agent docs correctly) and reduces the silent-fallback surface (subagent confusion about TeamCreate availability). However, since `/plugin update` requires interactive operator confirmation per W314-r2-AI-r2-1 carry-over, this is a P1 W320 operator-AI. **HOLD-UPDATE this wave** since W314-r2-AI-r2-1 is still in-queue.

## 2. wshobson/agents NEW plugins (not in our enabled set)

| Plugin                          | Status this runtime                                       | NEW vs. our cite | Notes |
|---------------------------------|-----------------------------------------------------------|------------------|-------|
| `meigen-ai-design`              | not in `installed_plugins.json`                           | YES              | meigen-ai-design 1.0.5 (PR #510). Design system plugin. Not orchestration. |
| `brand-landingpage`             | not installed                                             | YES (PR #509)    | Landing page workflow. Not orchestration. |
| `review-agent-governance`       | installed (`installed_plugins.json:400-409`); **disabled** in settings.json:250 | partial — installed but disabled | Ships agents + hooks + policies + skills. Cardinal-rule-relevant: re-evaluate if needed for W269 enforcement. |
| `signed-audit-trails`           | installed + enabled (`settings.json:242`)                  | NO               | Already in our enabled set. |

## 3. mattpocock/skills — HEAD `67bce91c` (2026-05-18, README typo fix)

**Local clone**: `Z:/repos/deps/mattpocock-skills/`. Per CLAUDE.md L48 our existing vendor-fork cites `67bce91c80cd` — **exact match**, no drift.

### 3.1 Existing vendor-fork skills (per CLAUDE.md L48)

`grill-with-docs`, `tdd`, `caveman`, `diagnose` — copied to `.claude/skills/`.

### 3.2 NEW orchestration-relevant skills in mattpocock HEAD

```
skills/productivity/handoff/SKILL.md           ← orchestration-adjacent (session-handoff)
skills/in-progress/review/SKILL.md              ← code-review skill, NOT orchestration
skills/engineering/zoom-out/SKILL.md            ← strategic-reasoning, NOT orchestration
```

**`handoff` (already cited W314-r2-AI-r2-4 as a candidate)**:
```
---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
---
Write a handoff document summarising the current conversation so a fresh agent can continue the work.
Save it to a path produced by `mktemp -t handoff-XXXXXX.md`.
Suggest the skills to be used, if any, by the next session.
Do not duplicate content already captured in other artifacts ...
```

**Pattern**: explicit session-handoff document, written to a temp file, referenced by path. Pattern complements our `superpowers:finishing-a-development-branch` + `caveman` skills.

**Adoption**: W319 forward-AI: vendor-fork `mattpocock/skills/skills/productivity/handoff/SKILL.md` to `.claude/skills/handoff/SKILL.md` per cardinal-rule-4 operator-curated path. **CARRYOVER from W314-r2-AI-r2-4** (already queued).

### 3.3 Other mattpocock skills not orchestration-relevant

- `productivity/grill-me`, `engineering/grill-with-docs` (already vendor-forked)
- `engineering/tdd`, `productivity/caveman`, `engineering/diagnose` (already vendor-forked)
- `engineering/triage`, `engineering/to-prd`, `engineering/to-issues`, `engineering/prototype` (planning/triage skills; not orchestration; consider for future PRD-writing pattern audit)
- `misc/git-guardrails-claude-code` (git-discipline skill; could augment block-no-verify plugin)

## 4. Net-new SOTA from wshobson + mattpocock NOT in our runtime

| # | Pattern                                                         | Source                                                                       | Adoption recommendation                                                                |
|---|-----------------------------------------------------------------|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| 1 | **Upstream agent-teams pivot: `general-purpose` for teammates** | `wshobson/agents` HEAD `ece811f2` agent-teams plugin                         | **MED** — update via `/plugin update agent-teams@claude-code-workflows` interactively. |
| 2 | **mattpocock/handoff skill**                                    | `mattpocock/skills @ 67bce91c skills/productivity/handoff/SKILL.md`          | **MED** — vendor-fork to `.claude/skills/handoff/` (W314-r2-AI-r2-4 carry-over).        |
| 3 | **review-agent-governance plugin re-enable**                    | wshobson `plugins/review-agent-governance/`                                  | **LOW** — re-evaluate for W269 review-gate enforcement.                                |
| 4 | **mattpocock/zoom-out + triage + to-prd skills**                | `mattpocock/skills @ 67bce91c skills/engineering/{zoom-out,triage,to-prd}`   | **LOW** — strategic-planning skills; consider when feature-dev workflow audited.       |

## 5. Cite index

- `https://github.com/wshobson/agents/tree/ece811f2/plugins/agent-teams/`
- `https://github.com/wshobson/agents/tree/ece811f2/plugins/agent-teams/agents/team-lead.md`
- `https://github.com/wshobson/agents/tree/ece811f2/plugins/agent-teams/commands/team-spawn.md`
- `https://github.com/wshobson/agents/tree/ece811f2/plugins/agent-teams/skills/team-composition-patterns/references/agent-type-selection.md`
- `https://github.com/mattpocock/skills/tree/67bce91c/skills/productivity/handoff/SKILL.md`
- `https://code.claude.com/docs/en/agent-teams`
- `https://docs.anthropic.com/en/docs/claude-code/sub-agents`
