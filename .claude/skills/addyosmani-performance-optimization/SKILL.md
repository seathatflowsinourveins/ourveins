---
name: addyosmani-performance-optimization
description: Code-design-time performance guidance when writing or reviewing performance-sensitive code. Use when adding code paths in hot loops, page-render critical paths, or data-aggregation pipelines. Use when the operator says "make this faster", "performance-critical", "hot path", or "Core Web Vitals". Use when reviewing for measurable design-stage perf wins (algorithmic complexity, allocation patterns, IO batching, lazy-load shape). Distinct from `engineering-advanced-skills:performance-profiler` (active runtime profiling) — this skill enforces design-stage perf discipline BEFORE profiler data exists.
---

# Performance Optimization (addyosmani vendor-fork — design-time variant)

## Overview

Performance discipline applied AT DESIGN/WRITE TIME — algorithmic complexity, allocation patterns, IO batching, render-path shape, caching geometry. This skill is intentionally restricted to **code-design-time guidance** to avoid overlapping with the active-profiling skills. Vendor-forked from `addyosmani/agent-skills @ f17c6e88` (MIT licensed) per W332-B closure.

## Source

Source: addyosmani/agent-skills @ f17c6e88 MIT licensed; vendor-fork via ctx_fetch_and_index 2026-05-19 — file `skills/performance-optimization/SKILL.md` (11593 bytes, blob SHA `dcc37e047cbd9e95f15c06dfa9bff860214acf92`).

## Behavior (preserved from upstream f17c6e88, scope-restricted)

Design-stage perf checklist:

1. **Algorithmic complexity**: estimate Big-O before writing; if a loop is O(n²) on n>1000, REDESIGN before coding.
2. **Allocation patterns**: avoid per-iteration allocation in hot loops (object pools, reusable buffers); prefer streaming over loading entire datasets.
3. **IO batching**: collapse N+1 queries; prefer bulk-read APIs; batch writes; cache lookup results.
4. **Render-path shape** (frontend): minimize critical-CSS; defer non-critical JS; lazy-load below-the-fold; respect `prefers-reduced-motion`.
5. **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1, INP <200ms targets baked into design choices.
6. **Caching geometry**: pick the smallest TTL that meets correctness; explicit-invalidation > magic-stale-revalidate when correctness matters.
7. **Lazy evaluation**: prefer generators / iterators over materialized lists when the consumer is itself streaming.
8. **Measure-first principle**: NEVER optimize without a baseline; if no measurement exists, the first task is to add one (NOT to guess at hot spots).

**Measure-first hard rule**: this skill produces design guidance, NOT speculative optimization. If a profiler trace is needed, **defer to `engineering-advanced-skills:performance-profiler`** for runtime instrumentation.

## Scope restriction (vs. sibling skills)

**This skill DOES NOT cover**:
- Active CPU/memory profiling → use `engineering-advanced-skills:performance-profiler`
- Bazel build optimization → use `developer-essentials:bazel-build-optimization`
- Turborepo cache tuning → use `developer-essentials:turborepo-caching`
- React-specific perf patterns → use `vercel-react-best-practices`
- SQL query tuning → use `developer-essentials:sql-optimization-patterns`

**This skill DOES cover**: write-time algorithmic + allocation + IO-shape + render-path-design guidance, framework-agnostic.

## Cardinal-rule conformance

- **R1**: MIT-licensed; commit-pinned `f17c6e88`; operator-curated R4(b) skill.
- **R2**: pure-prose SKILL.md.
- **R3**: no subagent declaration.
- **R4(b)**: path-gated; auto-fire per SKILL.md `description:`; scope explicitly restricted via "Distinct from" clause + sibling deferral block.
- **R5**: advisory behavioral skill; no destructive ops.

## Provenance

- **Wave**: W332-B (SDLC-coverage extension v2)
- **Source commit**: `addyosmani/agent-skills @ f17c6e88c904dc747381c374312c2d58e10647ae`
- **Source file**: `skills/performance-optimization/SKILL.md`
- **Source blob SHA**: `dcc37e047cbd9e95f15c06dfa9bff860214acf92`
- **Source size**: 11593 bytes (68 indexed sections)
- **License**: MIT
- **Sibling-overlap audit**: HIGH-RISK overlap with `engineering-advanced-skills:performance-profiler` + 4 framework-specific perf skills; mitigated via explicit design-time-vs-runtime split + sibling-deferral block.
- **Trigger-phrase cardinality**: 5 distinct trigger phrases (≤8 per CR-4 corollary).
- **Vendor-fork rationale**: closes the "design-time perf discipline" gap; existing perf skills are runtime/framework-specific.
