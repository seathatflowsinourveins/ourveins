---
name: tdd
description: Test-driven development with red-green-refactor loop. Use when user wants to build features or fix bugs using TDD, mentions "red-green-refactor", wants integration tests, or asks for test-first development.
---

> Vendored from `mattpocock/skills` @ `67bce91c80cd1020a4f068ced32d0281656842ad` (2026-05-18 12:21 UTC) via W309 row #35 T2 VENDOR-FORK + W310 P1b ship.
>
> **Upstream**: https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md (SKILL.md sha `7a989411eb3c4d0879cb33b2d7d05831add27b84`)
> **License**: MIT (LICENSE sha `f1dd2c09108dde1a5f56097cee8461b3ea834499`, Copyright (c) 2026 Matt Pocock) — pinned MIT re-verified live W310 P1b 2026-05-18.
> **Note**: Supporting files referenced (`tests.md`, `mocking.md`, `deep-modules.md`, `interface-design.md`, `refactoring.md`) link to upstream URLs below. NOT vendored in this initial ship; the core RED→GREEN loop is self-contained in this SKILL.md.
> **Cardinal-rule compliance**: cite-anchored to CLAUDE.md:30 (operator-curated skills, Anthropic-sanctioned per `https://code.claude.com/docs/en/skills`); CR-3 documented subagent / CR-4 operator-curated path.
> **Coexistence-with-installed**: `tdd-workflows:tdd-cycle / tdd-green / tdd-red` already installed via tdd-workflows plugin — this vendored skill adds the philosophy + vertical-slice anti-horizontal pattern that the existing tdd-workflows plugin does not document (different surface, no behavioral collision).
> **W309 row #35 cite anchor**: T2 VENDOR-FORK verdict ratified W309; this is the corresponding ship action.

# Test-Driven Development

## Philosophy

**Core principle**: Tests should verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't.

**Good tests** are integration-style: they exercise real code paths through public APIs. They describe _what_ the system does, not _how_ it does it. A good test reads like a specification - "user can checkout with valid cart" tells you exactly what capability exists. These tests survive refactors because they don't care about internal structure.

**Bad tests** are coupled to implementation. They mock internal collaborators, test private methods, or verify through external means (like querying a database directly instead of using the interface). The warning sign: your test breaks when you refactor, but behavior hasn't changed. If you rename an internal function and tests fail, those tests were testing implementation, not behavior.

See [tests.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/tests.md) (upstream) for examples and [mocking.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/mocking.md) (upstream) for mocking guidelines.

## Anti-Pattern: Horizontal Slices

**DO NOT write all tests first, then all implementation.** This is "horizontal slicing" - treating RED as "write all tests" and GREEN as "write all code."

This produces **crap tests**:

- Tests written in bulk test _imagined_ behavior, not _actual_ behavior
- You end up testing the _shape_ of things (data structures, function signatures) rather than user-facing behavior
- Tests become insensitive to real changes - they pass when behavior breaks, fail when behavior is fine
- You outrun your headlights, committing to test structure before understanding the implementation

**Correct approach**: Vertical slices via tracer bullets. One test → one implementation → repeat. Each test responds to what you learned from the previous cycle. Because you just wrote the code, you know exactly what behavior matters and how to verify it.

```
WRONG (horizontal):
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

RIGHT (vertical):
  RED→GREEN: test1→impl1
  RED→GREEN: test2→impl2
  RED→GREEN: test3→impl3
  ...
```

## Workflow

### 1. Planning

When exploring the codebase, use the project's domain glossary so that test names and interface vocabulary match the project's language, and respect ADRs in the area you're touching.

Before writing any code:

- [ ] Confirm with user what interface changes are needed
- [ ] Confirm with user which behaviors to test (prioritize)
- [ ] Identify opportunities for [deep modules](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/deep-modules.md) (small interface, deep implementation)
- [ ] Design interfaces for [testability](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/interface-design.md)
- [ ] List the behaviors to test (not implementation steps)
- [ ] Get user approval on the plan

Ask: "What should the public interface look like? Which behaviors are most important to test?"

**You can't test everything.** Confirm with the user exactly which behaviors matter most. Focus testing effort on critical paths and complex logic, not every possible edge case.

### 2. Tracer Bullet

Write ONE test that confirms ONE thing about the system:

```
RED:   Write test for first behavior → test fails
GREEN: Write minimal code to pass → test passes
```

This is your tracer bullet - proves the path works end-to-end.

### 3. Incremental Loop

For each remaining behavior:

```
RED:   Write next test → fails
GREEN: Minimal code to pass → passes
```

Rules:

- One test at a time
- Only enough code to pass current test
- Don't anticipate future tests
- Keep tests focused on observable behavior

### 4. Refactor

After all tests pass, look for [refactor candidates](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/refactoring.md):

- [ ] Extract duplication
- [ ] Deepen modules (move complexity behind simple interfaces)
- [ ] Apply SOLID principles where natural
- [ ] Consider what new code reveals about existing code
- [ ] Run tests after each refactor step

**Never refactor while RED.** Get to GREEN first.

## Checklist Per Cycle

```
[ ] Test describes behavior, not implementation
[ ] Test uses public interface only
[ ] Test would survive internal refactor
[ ] Code is minimal for this test
[ ] No speculative features added
```
