---
name: hook-metadata-discipline
description: Use when authoring or reviewing a Claude Code hook that reads its own configuration. Enforces claudekit's Hook Metadata + Zod-validated `getHookConfig<T>()` pattern — every hook declares static `metadata` (id/displayName/description/category/triggerEvent/matcher), every hook-specific config schema lives in a typed Zod `ConfigSchema`, and runtime reads go through `getHookConfig<T>(hookId)` NOT raw `process.env` or `JSON.parse(readFileSync(...))`. Triggers on "write a hook", "new hook", "hook config", "hook settings", "settings.json hook", "PreToolUse", "PostToolUse", "Stop hook", "SubagentStop", "hook validation", or any hook author asking how to read user-supplied options. Anchors: claudekit `cli/utils/claudekit-config.ts` + `cli/types/claudekit-config.ts` + colinhacks/zod typed-parse contract + Anthropic hook-payload schema docs.
---

# hook-metadata-discipline (W344 P3)

> **W344 P3 closure** — operator-curated local skill per cardinal-rule-4 (Anthropic-sanctioned local-skills path). Extracted pattern from carlrannaberg/claudekit MIT.

## When to fire

Auto-fire on `description` triggers above. Concretely:
- Hook author writes a new `.ts/.js/.mjs` hook file or stub.
- Hook author adds a `loadConfig()`-style call.
- Reviewer sees `process.env['<HOOK>_<KEY>']` reads, `JSON.parse(fs.readFileSync('.claude/...'))` in a hook body, or hook config typed as `any`.

## The pattern (3 parts)

### 1. Static `metadata` on every hook class

Every hook declares an Anthropic-event-matched metadata block — used for auto-discovery and registration. Source: `cli/hooks/self-review.ts:24-31` @ claudekit MIT.

```typescript
export class SelfReviewHook extends BaseHook {
  name = 'self-review';

  static metadata = {
    id: 'self-review',
    displayName: 'Self Review',
    description: 'Prompts a critical self-review to catch integration and refactoring issues',
    category: 'validation' as const,
    triggerEvent: ['Stop', 'SubagentStop'] as const,
    matcher: '*',
  };
}
```

### 2. Zod schema per hook-id in a central types file

Source: `cli/types/claudekit-config.ts:31-42, 61-91, 94-120` @ claudekit MIT.

```typescript
import { z } from 'zod';

const SelfReviewConfigSchema = z.object({
  timeout: z.number().min(1000).max(300000).optional(),
  targetPatterns: z.array(z.string()).optional(),
  focusAreas: z.array(z.object({
    name: z.string(),
    questions: z.array(z.string()),
  })).optional(),
});

const HooksConfigurationSchema = z.object({
  'self-review': SelfReviewConfigSchema.optional(),
  // ...one optional entry per hook-id
  global: z.object({
    timeout: z.number().min(1000).max(300000).optional(),
    enabled: z.boolean().optional(),
  }).optional(),
});

export const ClaudekitConfigSchema = z.object({
  hooks: HooksConfigurationSchema.optional(),
  packageManager: z.enum(['npm', 'yarn', 'pnpm', 'bun']).optional(),
  environment: z.record(z.string()).optional(),
});

export type ClaudekitConfig = z.infer<typeof ClaudekitConfigSchema>;

export function validateClaudekitConfig(data: unknown): {
  valid: boolean; errors?: string[]; data?: ClaudekitConfig;
} {
  try { return { valid: true, data: ClaudekitConfigSchema.parse(data) }; }
  catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`) };
    }
    return { valid: false, errors: ['Invalid configuration format'] };
  }
}
```

### 3. `getHookConfig<T>()` — the only sanctioned reader

Source: `cli/utils/claudekit-config.ts:46-49` @ claudekit MIT.

```typescript
export function getHookConfig<T = unknown>(hookId: string, projectRoot?: string): T | undefined {
  const config = loadClaudekitConfig(projectRoot);  // reads .claudekit/config.json + Zod-parses
  return config.hooks?.[hookId as keyof typeof config.hooks] as T;
}
```

Hook author invocation (source `cli/hooks/self-review.ts:143-145`):

```typescript
private loadConfig(): SelfReviewConfig {
  return getHookConfig<SelfReviewConfig>('self-review') ?? {};
}
```

## 3-org-distinct anchors

| Source | Pattern |
|---|---|
| carlrannaberg/claudekit `cli/utils/claudekit-config.ts:46-49` MIT | Typed `getHookConfig<T>(hookId)` reader, Zod-validated config root |
| colinhacks/zod `ZodSchema.parse()` runtime+compile contract | `z.infer<typeof Schema>` gives static type from runtime schema — same shape claudekit uses |
| Anthropic `https://docs.anthropic.com/en/docs/claude-code/hooks` hook-payload schema | Anthropic publishes JSON payload shapes (PreToolUse / PostToolUse / Stop / SubagentStop) — claudekit's `metadata.triggerEvent` literal-union mirrors that enum |

3-org-distinct convergence per sca-v13. Verdict: typed-schema config reads are SOTA across Zod-using TS projects; raw `process.env` / unvalidated JSON in hook bodies is a SEV-2 anti-pattern (silent prod drift, no IDE completion).

## Enforcement procedure (review-time)

When reviewing a hook PR or authoring a new hook:

1. **Reject** any hook missing `static metadata = { id, displayName, description, category, triggerEvent, matcher }`.
2. **Reject** any hook reading config via `process.env`, raw `fs.readFileSync`, or `JSON.parse` without Zod validation.
3. **Require** a Zod schema entry in the central types module for the hook's `id`.
4. **Require** `getHookConfig<T>(hookId)` (or operator-equivalent typed reader) as the sole config entry-point.
5. **Verify** `z.infer<typeof Schema>` is the source of the TypeScript `T` — no hand-maintained interface drift.

## Cite-anchors

- claudekit `cli/utils/claudekit-config.ts:1-49` + `cli/types/claudekit-config.ts:1-120` + `cli/hooks/self-review.ts:24-31, 143-145` @ MIT.
- Zod `https://github.com/colinhacks/zod` typed-parse contract.
- Anthropic hook-payload schema: `https://docs.anthropic.com/en/docs/claude-code/hooks` (UNVERIFIED — exact path & line numbers not probed this session; cite-form matches Anthropic doc conventions).

## Adapt-for-local-runtime notes

This runtime is plugin-loaded primitive-only per cardinal-rule-1. Project-owned hook bodies are forbidden per cardinal-rule-2 EXCEPT the sanctioned bug-patch shim. If you do author a sanctioned shim, the discipline above still applies: declare a metadata block in a leading comment, Zod-validate any env var or settings.json field it reads, and centralize the schema even if there is only one consumer.
