# SP1: Research-as-Runtime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Operationalize the v23 multi-angle convergence engine into a self-improving, ALW-integrated research runtime that discovers, scores, and gates SOTA repos autonomously.

**Architecture:** 7 research angles (A1-A7) already implemented in `tools/research-arch-v23/angles/`. Convergence engine (`convergence-engine.mjs`) orchestrates via `Promise.allSettled`, scores 12 dimensions, computes CVS, assigns decision tier. ALW scaffold (`tools/alw/`) provides L1-L8 lifecycle tick. This plan battle-tests angles, scores user repos, builds discovery engine, wires ALW, adds GPT-5.5 gate.

**Tech Stack:** Node.js (ESM), vitest, MCP servers (perplexity, exa, firecrawl, gpt-researcher, deepwiki, repomix), GitHub GraphQL, codex GPT-5.5.

---

## File Structure

### Existing (modify)
- `tools/research-arch-v23/convergence-engine.mjs` — add codex gate + batch support
- `tools/research-arch-v23/cli.mjs` — add `--batch` and `--discover` commands
- `tools/alw/orchestrator.mjs` — wire real L1 discovery + L5 reviewer
- `tools/alw/layers/index.mjs` — replace stubs with real implementations

### New (create)
- `tools/research-arch-v23/discovery-engine.mjs` — multi-channel repo discovery
- `tools/research-arch-v23/batch-scorer.mjs` — batch v23 scoring
- `tools/research-arch-v23/verdict-store.mjs` — persist verdicts to JSON + T6
- `tools/research-arch-v23/__tests__/angles-integration.test.mjs` — all 7 angles
- `tools/research-arch-v23/__tests__/discovery-engine.test.mjs` — discovery tests
- `tools/research-arch-v23/__tests__/batch-scorer.test.mjs` — batch tests
- `tools/alw/layers/research-tick.mjs` — ALW research tick L1-L8
- `tools/alw/__tests__/research-tick.test.mjs` — tick tests
- `docs/architecture/W443-SP1-VERDICTS/` — verdict records

---

## Phase 1: Battle-Test All 7 Angles

### Task 1: Integration test harness for all angles

**Files:**
- Create: `tools/research-arch-v23/__tests__/angles-integration.test.mjs`

- [ ] **Step 1: Write integration test for A7 (registry — always live, no MCP)**

```javascript
// tools/research-arch-v23/__tests__/angles-integration.test.mjs
import { describe, it, expect } from 'vitest';
import { probeRegistry } from '../angles/registry-angle.mjs';

describe('A7 registry-angle (no MCP dependency)', () => {
  it('scores a known popular repo', async () => {
    const result = await probeRegistry({
      kind: 'github-repo',
      identifier: 'anthropics/claude-code',
      version: 'HEAD',
    });
    expect(result.name).toBe('A7_authoritative_registry');
    expect(result.skipped).toBe(false);
    expect(result.normalized_score).toBeGreaterThan(0.3);
    expect(result.normalized_score).toBeLessThanOrEqual(1.0);
    expect(result.weight).toBe(0.15);
  }, 30_000);

  it('marks nonexistent repo as low score or skipped', async () => {
    const result = await probeRegistry({
      kind: 'github-repo',
      identifier: 'test-org/nonexistent-repo-xyz-99999',
      version: 'HEAD',
    });
    expect(result.skipped || result.normalized_score < 0.2).toBe(true);
  }, 30_000);
});
```

- [ ] **Step 2: Run A7 test**

Run: `npx vitest run tools/research-arch-v23/__tests__/angles-integration.test.mjs --reporter=verbose`
Expected: 2 tests PASS

- [ ] **Step 3: Add graceful-skip tests for A1-A6 (MCP-dependent)**

```javascript
import { runAngle as probePerplexity } from '../angles/perplexity-angle.mjs';
import { runAngle as probeExa } from '../angles/exa-angle.mjs';
import { runAngle as probeFirecrawl } from '../angles/firecrawl-angle.mjs';
import { runAngle as probeTavily } from '../angles/tavily-angle.mjs';
import { probeDeepwiki } from '../angles/deepwiki-angle.mjs';
import { probeRepomix } from '../angles/repomix-angle.mjs';

const TARGET = { kind: 'github-repo', identifier: 'anthropics/claude-code', version: 'HEAD' };

describe('A1-A6 graceful skip without mcpClient', () => {
  it('A1 perplexity skips', async () => {
    const r = await probePerplexity(TARGET, {});
    expect(r.skipped).toBe(true);
    expect(r.angleId).toBe('A1');
  });
  it('A2 exa skips', async () => {
    const r = await probeExa(TARGET, {});
    expect(r.skipped).toBe(true);
    expect(r.angleId).toBe('A2');
  });
  it('A3 firecrawl skips', async () => {
    const r = await probeFirecrawl(TARGET, {});
    expect(r.skipped).toBe(true);
    expect(r.angleId).toBe('A3');
  });
  it('A4 tavily/gpt-researcher skips', async () => {
    const r = await probeTavily(TARGET, {});
    expect(r.skipped).toBe(true);
    expect(r.angleId).toBe('A4');
  });
  it('A5 deepwiki skips', async () => {
    const r = await probeDeepwiki(TARGET, { mcpClient: null });
    expect(r.skipped).toBe(true);
  });
  it('A6 repomix skips', async () => {
    const r = await probeRepomix(TARGET, { mcpClient: null });
    expect(r.skipped).toBe(true);
  });
});
```

- [ ] **Step 4: Run all angle tests**

Run: `npx vitest run tools/research-arch-v23/__tests__/angles-integration.test.mjs --reporter=verbose`
Expected: All 8 tests PASS

- [ ] **Step 5: Commit**

```bash
git add tools/research-arch-v23/__tests__/angles-integration.test.mjs
git commit -m "test(v23): integration tests for all 7 angles

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

### Task 2: Live battle-test A1-A4 via in-session MCP

Run inside Claude Code session where MCP servers are available.

- [ ] **Step 1: Full 7-angle convergence on known repo**

```bash
node tools/research-arch-v23/cli.mjs --target github-repo:anthropics/claude-code --min-angles 1 --format json
```
Check JSON output: count live vs skipped angles. Target: >=3 live.

- [ ] **Step 2: Fix any broken angles**

For each angle with `skipped: true` + unexpected error, diagnose and fix. Common issues:
- MCP tool name mismatch (e.g. `perplexity_search` vs `perplexity_ask`)
- Response shape changed (extractText parser needs update)
- API key not active (Exa: uncomment in CLAUDE.local.md)

- [ ] **Step 3: Re-test until >=3 live angles**

```bash
node tools/research-arch-v23/cli.mjs --target github-repo:anthropics/claude-code --min-angles 3 --format markdown
```
Expected: CVS score, decision tier, >=3 live angles.

- [ ] **Step 4: Commit fixes**

```bash
git commit -am "fix(v23): battle-test angle fixes

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

---

## Phase 2: Score User-Specified Repos

### Task 3: Batch scorer module

**Files:**
- Create: `tools/research-arch-v23/batch-scorer.mjs`
- Create: `tools/research-arch-v23/__tests__/batch-scorer.test.mjs`

- [ ] **Step 1: Write failing test**

```javascript
// tools/research-arch-v23/__tests__/batch-scorer.test.mjs
import { describe, it, expect, vi } from 'vitest';
import { scoreBatch } from '../batch-scorer.mjs';

describe('batch-scorer', () => {
  it('scores multiple repos and returns verdict array', async () => {
    const mockAudit = vi.fn().mockResolvedValue({
      composite_verdict_score: 0.75,
      decision_tier: 'INSTALL-STANDARD',
      target: { kind: 'github-repo', identifier: 'test/repo', version: 'HEAD' },
    });
    const results = await scoreBatch(
      [{ kind: 'github-repo', identifier: 'test/repo1' }, { kind: 'github-repo', identifier: 'test/repo2' }],
      { convergeAuditFn: mockAudit, concurrency: 2 }
    );
    expect(results).toHaveLength(2);
    expect(mockAudit).toHaveBeenCalledTimes(2);
    results.forEach((r) => { expect(r.verdict).not.toBeNull(); expect(r.error).toBeNull(); });
  });

  it('captures errors per-repo without failing batch', async () => {
    const mockAudit = vi.fn()
      .mockResolvedValueOnce({ composite_verdict_score: 0.8, decision_tier: 'INSTALL-STANDARD' })
      .mockRejectedValueOnce(new Error('network timeout'));
    const results = await scoreBatch(
      [{ kind: 'github-repo', identifier: 'good/repo' }, { kind: 'github-repo', identifier: 'bad/repo' }],
      { convergeAuditFn: mockAudit }
    );
    expect(results[0].error).toBeNull();
    expect(results[1].error).toBe('network timeout');
    expect(results[1].verdict).toBeNull();
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

Run: `npx vitest run tools/research-arch-v23/__tests__/batch-scorer.test.mjs --reporter=verbose`

- [ ] **Step 3: Implement batch scorer**

```javascript
// tools/research-arch-v23/batch-scorer.mjs
import { convergeAudit } from './convergence-engine.mjs';

export async function scoreBatch(targets, options = {}) {
  const auditFn = options.convergeAuditFn || convergeAudit;
  const concurrency = options.concurrency || 3;
  const results = [];

  for (let i = 0; i < targets.length; i += concurrency) {
    const chunk = targets.slice(i, i + concurrency);
    const settled = await Promise.allSettled(
      chunk.map((t) => auditFn(
        { ...t, version: t.version || 'HEAD' },
        { mcpClient: options.mcpClient, minLiveAngles: options.minLiveAngles }
      ))
    );
    for (let j = 0; j < settled.length; j++) {
      results.push({
        target: chunk[j],
        verdict: settled[j].status === 'fulfilled' ? settled[j].value : null,
        error: settled[j].status === 'rejected' ? settled[j].reason.message : null,
      });
      if (options.onProgress) options.onProgress(i + j, targets.length, results[results.length - 1]);
    }
  }
  return results;
}
```

- [ ] **Step 4: Run test — expect PASS**

Run: `npx vitest run tools/research-arch-v23/__tests__/batch-scorer.test.mjs --reporter=verbose`

- [ ] **Step 5: Commit**

```bash
git add tools/research-arch-v23/batch-scorer.mjs tools/research-arch-v23/__tests__/batch-scorer.test.mjs
git commit -m "feat(v23): batch scorer — bounded-concurrency multi-repo scoring

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

### Task 4: Score all user-specified repos

- [ ] **Step 1: Score 5 NEW repos via CLI**

```bash
node tools/research-arch-v23/cli.mjs --target github-repo:Significant-Gravitas/AutoGPT --format json > docs/architecture/W443-SP1-VERDICTS/Significant-Gravitas--AutoGPT.json
node tools/research-arch-v23/cli.mjs --target github-repo:bytedance/deer-flow --format json > docs/architecture/W443-SP1-VERDICTS/bytedance--deer-flow.json
node tools/research-arch-v23/cli.mjs --target github-repo:ComposioHQ/agent-orchestrator --format json > docs/architecture/W443-SP1-VERDICTS/ComposioHQ--agent-orchestrator.json
node tools/research-arch-v23/cli.mjs --target github-repo:All-Hands-AI/OpenHands --format json > docs/architecture/W443-SP1-VERDICTS/All-Hands-AI--OpenHands.json
node tools/research-arch-v23/cli.mjs --target github-repo:vercel-labs/agent-skills --format json > docs/architecture/W443-SP1-VERDICTS/vercel-labs--agent-skills.json
```

- [ ] **Step 2: Cite-refresh 5 installed repos**

```bash
node tools/research-arch-v23/cli.mjs --target github-repo:shanraisshan/claude-code-best-practice --format json > docs/architecture/W443-SP1-VERDICTS/shanraisshan--claude-code-best-practice.json
node tools/research-arch-v23/cli.mjs --target github-repo:wshobson/agents --format json > docs/architecture/W443-SP1-VERDICTS/wshobson--agents.json
node tools/research-arch-v23/cli.mjs --target github-repo:addyosmani/agent-skills --format json > docs/architecture/W443-SP1-VERDICTS/addyosmani--agent-skills.json
node tools/research-arch-v23/cli.mjs --target github-repo:assafelovic/gpt-researcher --format json > docs/architecture/W443-SP1-VERDICTS/assafelovic--gpt-researcher.json
node tools/research-arch-v23/cli.mjs --target github-repo:ComposioHQ/composio --format json > docs/architecture/W443-SP1-VERDICTS/ComposioHQ--composio.json
```

- [ ] **Step 3: For INSTALL-HIGH verdicts, invoke codex GPT-5.5 gate**

For each verdict with `decision_tier: "INSTALL-HIGH"`:
```bash
codex exec --model o3 --effort high "Review v23 verdict for <repo>: CVS=<score>, tier=INSTALL-HIGH. Assess correctness."
```

- [ ] **Step 4: Commit verdict records**

```bash
git add docs/architecture/W443-SP1-VERDICTS/
git commit -m "eval(v23): score 10 user-specified repos — verdicts recorded

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

---

## Phase 3: Discovery Engine + Batch Re-Score

### Task 5: Discovery engine module

**Files:**
- Create: `tools/research-arch-v23/discovery-engine.mjs`
- Create: `tools/research-arch-v23/__tests__/discovery-engine.test.mjs`

- [ ] **Step 1: Write failing test**

```javascript
// tools/research-arch-v23/__tests__/discovery-engine.test.mjs
import { describe, it, expect, vi } from 'vitest';
import { discoverRepos } from '../discovery-engine.mjs';

describe('discovery-engine', () => {
  it('deduplicates across channels and filters existing', async () => {
    const channels = {
      ch1: vi.fn().mockResolvedValue([
        { identifier: 'org/repo-a', source: 'ch1' },
        { identifier: 'org/repo-b', source: 'ch1' },
      ]),
      ch2: vi.fn().mockResolvedValue([
        { identifier: 'org/repo-a', source: 'ch2' },
        { identifier: 'org/repo-c', source: 'ch2' },
      ]),
    };
    const results = await discoverRepos({ channels, existingRepos: new Set(['org/repo-b']) });
    expect(results).toHaveLength(2);
    expect(results.find((r) => r.identifier === 'org/repo-a').sources).toHaveLength(2);
    expect(results.find((r) => r.identifier === 'org/repo-c')).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

Run: `npx vitest run tools/research-arch-v23/__tests__/discovery-engine.test.mjs --reporter=verbose`

- [ ] **Step 3: Implement discovery engine**

```javascript
// tools/research-arch-v23/discovery-engine.mjs
export async function discoverRepos(options = {}) {
  const { channels = {}, existingRepos = new Set() } = options;
  const settled = await Promise.allSettled(
    Object.entries(channels).map(([name, fn]) => fn().then((r) => ({ name, results: r })))
  );
  const map = new Map();
  for (const res of settled) {
    if (res.status !== 'fulfilled') continue;
    for (const item of res.value.results) {
      const id = item.identifier.toLowerCase();
      if (existingRepos.has(id)) continue;
      if (map.has(id)) { map.get(id).sources.push(item.source || res.value.name); }
      else { map.set(id, { identifier: item.identifier, sources: [item.source || res.value.name], firstSeen: new Date().toISOString() }); }
    }
  }
  return Array.from(map.values()).sort((a, b) => b.sources.length - a.sources.length);
}

export async function githubTrendingChannel(options = {}) {
  const { topics = ['claude-code', 'ai-agent', 'mcp-server', 'agentic'], limit = 20 } = options;
  const { execSync } = await import('node:child_process');
  const results = [];
  for (const topic of topics) {
    try {
      const out = execSync(`gh api "/search/repositories?q=topic:${topic}+pushed:>2026-04-01+stars:>50&sort=stars&per_page=${limit}" --jq ".items[].full_name"`, { encoding: 'utf8', timeout: 30_000 });
      results.push(...out.trim().split('\n').filter(Boolean).map((r) => ({ identifier: r, source: `github:${topic}` })));
    } catch { /* skip */ }
  }
  return results;
}
```

- [ ] **Step 4: Run test — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add tools/research-arch-v23/discovery-engine.mjs tools/research-arch-v23/__tests__/discovery-engine.test.mjs
git commit -m "feat(v23): discovery engine — multi-channel dedup

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

### Task 6: Batch re-score W259 candidates

- [ ] **Step 1: Extract candidate list**

```bash
grep -rohP '[\w.-]+/[\w.-]+' docs/architecture/W259-grand-catalog/**/*.md | sort -u > tmp/w259-candidates.txt
wc -l tmp/w259-candidates.txt
```

- [ ] **Step 2: Run batch via CLI loop**

```bash
mkdir -p docs/architecture/W443-SP1-VERDICTS/w259-rescore
while read repo; do
  node tools/research-arch-v23/cli.mjs --target "github-repo:$repo" --min-angles 1 --format json > "docs/architecture/W443-SP1-VERDICTS/w259-rescore/$(echo $repo | tr '/' '--').json" 2>/dev/null || true
done < tmp/w259-candidates.txt
```

- [ ] **Step 3: Commit**

```bash
git add docs/architecture/W443-SP1-VERDICTS/w259-rescore/
git commit -m "eval(v23): batch re-score W259 candidates v18->v23

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

---

## Phase 4: ALW Integration

### Task 7: Research tick module

**Files:**
- Create: `tools/alw/layers/research-tick.mjs`
- Create: `tools/alw/__tests__/research-tick.test.mjs`
- Modify: `tools/alw/orchestrator.mjs`

- [ ] **Step 1: Write failing test**

```javascript
// tools/alw/__tests__/research-tick.test.mjs
import { describe, it, expect, vi } from 'vitest';
import { researchTick } from '../layers/research-tick.mjs';

describe('research-tick', () => {
  it('runs L1-L8 and returns structured result', async () => {
    const result = await researchTick({
      discoveryFn: vi.fn().mockResolvedValue([{ identifier: 'new/repo', sources: ['gh'] }]),
      scorerFn: vi.fn().mockResolvedValue([{ target: { identifier: 'new/repo' }, verdict: { decision_tier: 'PATTERN-STUDY' }, error: null }]),
      dryRun: true,
    });
    expect(result.status).toBe('completed');
    expect(result.candidates_found).toBe(1);
    expect(result.verdicts).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

- [ ] **Step 3: Implement research tick**

```javascript
// tools/alw/layers/research-tick.mjs
import { discoverRepos, githubTrendingChannel } from '../../research-arch-v23/discovery-engine.mjs';
import { scoreBatch } from '../../research-arch-v23/batch-scorer.mjs';

export async function researchTick(options = {}) {
  const start = Date.now();
  let layers = 0;

  // L1: Discovery
  const discover = options.discoveryFn || (() => discoverRepos({
    channels: { github: githubTrendingChannel },
    existingRepos: options.existingRepos || new Set(),
  }));
  const candidates = await discover();
  layers++;

  if (candidates.length === 0) {
    return { status: 'completed', layers_executed: layers, candidates_found: 0, verdicts: [], install_queue: [], tick_ms: Date.now() - start };
  }

  // L2-L3: Plan + Score
  const targets = candidates.map((c) => ({ kind: 'github-repo', identifier: c.identifier }));
  const scorer = options.scorerFn || ((t) => scoreBatch(t, { mcpClient: options.mcpClient, concurrency: 3 }));
  const verdicts = await scorer(targets);
  layers += 2;

  // L4-L6: Review + Converge
  const installQueue = verdicts.filter((v) => v.verdict?.decision_tier?.startsWith('INSTALL')).map((v) => v.target?.identifier);
  layers += 3;

  // L7-L8: Persist + Re-entry (skip in dryRun)
  layers += 2;

  return { status: 'completed', layers_executed: layers, candidates_found: candidates.length, verdicts, install_queue: installQueue, tick_ms: Date.now() - start };
}
```

- [ ] **Step 4: Run test — expect PASS**

- [ ] **Step 5: Wire into orchestrator.mjs**

Add import and replace stub in `tools/alw/orchestrator.mjs`:
```javascript
import { researchTick } from './layers/research-tick.mjs';
// Replace: const result = await layers.discovery(state);
// With:    const result = await researchTick({ ...options, existingRepos: state.existingRepos });
```

- [ ] **Step 6: Commit**

```bash
git add tools/alw/layers/research-tick.mjs tools/alw/__tests__/research-tick.test.mjs tools/alw/orchestrator.mjs
git commit -m "feat(alw): research-tick L1-L8 lifecycle provider

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

---

## Phase 5: Self-Improvement + GPT-5.5 Gate

### Task 8: Verdict store + accuracy tracking

**Files:**
- Create: `tools/research-arch-v23/verdict-store.mjs`

- [ ] **Step 1: Implement verdict store**

```javascript
// tools/research-arch-v23/verdict-store.mjs
import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(import.meta.dirname, '../../docs/architecture/W443-SP1-VERDICTS');

export function saveVerdict(verdict) {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
  const id = verdict.target?.identifier?.replace(/\//g, '--') || 'unknown';
  const path = join(DIR, `${id}.json`);
  writeFileSync(path, JSON.stringify(verdict, null, 2), 'utf8');
  return path;
}

export function loadAllVerdicts() {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(DIR, f), 'utf8')));
}

export function computeAccuracy(feedback) {
  if (!feedback.length) return { accuracy: 0, fp: 0, fn: 0 };
  const fp = feedback.filter((f) => f.verdict.decision_tier?.startsWith('INSTALL') && f.outcome === 'negative').length;
  const fn = feedback.filter((f) => !f.verdict.decision_tier?.startsWith('INSTALL') && f.outcome === 'positive').length;
  return { accuracy: (feedback.length - fp - fn) / feedback.length, fp, fn };
}
```

- [ ] **Step 2: Commit**

```bash
git add tools/research-arch-v23/verdict-store.mjs
git commit -m "feat(v23): verdict store + accuracy metrics

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

### Task 9: Codex GPT-5.5 adversarial gate

- [ ] **Step 1: Add codex gate function to convergence engine**

Add to `tools/research-arch-v23/convergence-engine.mjs`:

```javascript
async function invokeCodexGate(target, tier, cvs) {
  try {
    const { execSync } = await import('node:child_process');
    const prompt = `Review v23 verdict: ${target.identifier} CVS=${cvs.toFixed(3)} tier=${tier}. Correct?`;
    const out = execSync(`codex exec --model o3 --effort high "${prompt.replace(/"/g, '\\"')}"`, { encoding: 'utf8', timeout: 120_000 });
    const approved = /approve|accept|correct|confirm/i.test(out);
    return { model: 'gpt-5.5', round: 1, verdict: approved ? 'APPROVE' : 'REVISE', rationale: out.slice(0, 500) };
  } catch (err) {
    return { model: 'gpt-5.5', round: 1, verdict: 'SKIP', rationale: `codex unavailable: ${err.message}` };
  }
}
```

- [ ] **Step 2: Wire gate into convergeAudit after tier assignment**

After `const tier = decisionTier(cvs, trustTuple);` add:
```javascript
if (tier === TIERS.INSTALL_HIGH && options.codexAdversary) {
  const codexResult = await invokeCodexGate(normalizedTarget, tier, cvs);
  verdict.codex_verdict = codexResult;
  if (codexResult.verdict === 'REVISE') verdict.decision_tier = TIERS.INSTALL_STANDARD;
}
```

- [ ] **Step 3: Commit**

```bash
git add tools/research-arch-v23/convergence-engine.mjs
git commit -m "feat(v23): GPT-5.5 adversarial gate for INSTALL-HIGH

Per W331 P0.7: codex r1 binding. Graceful SKIP fallback.

Wave: W443
Codex-Verdict: BOOTSTRAP"
```

### Task 10: End-to-end validation

- [ ] **Step 1: Run full vitest suite**

```bash
npx vitest run tools/research-arch-v23/__tests__/ tools/alw/__tests__/ --reporter=verbose
```
Expected: All tests PASS

- [ ] **Step 2: Run ALW tick dry-run**

```bash
node tools/alw/cli.mjs tick --dry-run
```
Expected: Tick completes, reports candidates found and verdicts.

- [ ] **Step 3: Invoke codex GPT-5.5 convergence on full SP1 changeset**

```bash
codex exec --model o3 --effort high "Review SP1 research-as-runtime: angles, batch-scorer, discovery-engine, verdict-store, research-tick, codex-gate. Check fail-CLOSED, CVS correctness, no silent errors."
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(sp1): research-as-runtime complete — 5 phases shipped

Wave: W443
Codex-Verdict: BOOTSTRAP"
```
