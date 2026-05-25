// tools/alw/__tests__/orchestrator.test.mjs
import {describe, it, expect, vi} from 'vitest';
import {tick, discovery, planner, dispatcher, executor, reviewer, convergence, persistence, reentry} from '../orchestrator.mjs';

describe('tick', () => {
  it('returns idle status when discovery queue is empty', async () => {
    const result = await tick();
    expect(result.status).toBe('idle');
    expect(result.tick_ms).toBeGreaterThanOrEqual(0);
    expect(result.layers_executed).toEqual(['L1:discovery']);
  });

  it('executes all 8 layers when work-item present (via queue_override)', async () => {
    const result = await tick({queue_override: [{id: 'test-001', kind: 'audit'}]});
    expect(result.status).toBe('completed');
    expect(result.work_item).toBe('test-001');
    expect(result.layers_executed).toEqual([
      'L1:discovery', 'L2:planner', 'L3:dispatcher', 'L4:executor',
      'L5:reviewer', 'L6:convergence', 'L7:persistence', 'L8:reentry',
    ]);
  });

  it('records tick_ms', async () => {
    const result = await tick();
    expect(typeof result.tick_ms).toBe('number');
  });
});

describe('L1-L8 stub functions', () => {
  it('discovery returns empty array (W441 scaffold)', async () => {
    expect(await discovery({})).toEqual([]);
  });
  it('planner returns plan shape with topology', async () => {
    const p = await planner({id: 'x'}, {});
    expect(p.id).toBe('x');
    expect(p.topology).toBe('single-agent');
  });
  it('reviewer returns scaffold verdict', async () => {
    const r = await reviewer({}, {});
    expect(r.consensus.verdict).toBe('NOOP-SCAFFOLD');
  });
  it('persistence returns saved count (real L7 implementation, W443)', async () => {
    const result = await persistence({}, {});
    expect(result).toEqual({ saved: 0 });
  });
});

describe('dependency injection (W441.7 codex r1 REVISE fix)', () => {
  it('uses custom dispatcher override when supplied via options', async () => {
    const customDispatcher = vi.fn(async (plan, options) => ({
      topology: plan.topology,
      action: 'custom-w442-impl',
    }));
    const result = await tick({
      queue_override: [{id: 'di-test-001', kind: 'audit'}],
      dispatcher: customDispatcher,
    });
    expect(result.status).toBe('completed');
    expect(customDispatcher).toHaveBeenCalledTimes(1);
    expect(customDispatcher.mock.calls[0][0]).toEqual(
      expect.objectContaining({topology: 'single-agent'}),
    );
  });

  it('default behavior unchanged when no overrides supplied', async () => {
    // Sanity: re-run existing happy path; verifies defaults still wire correctly.
    const result = await tick({queue_override: [{id: 'default-001', kind: 'audit'}]});
    expect(result.status).toBe('completed');
    expect(result.layers_executed).toHaveLength(8);
  });

  it('all 8 layers can be overridden simultaneously and are invoked in order', async () => {
    const callOrder = [];
    const mkMock = (label, returnValue) => vi.fn(async () => {
      callOrder.push(label);
      return returnValue;
    });

    const mocks = {
      discovery: mkMock('L1', [{id: 'mock-001'}]),
      planner: mkMock('L2', {id: 'mock-001', topology: 'parallel-fan-out'}),
      dispatcher: mkMock('L3', {topology: 'parallel-fan-out', action: 'mock'}),
      executor: mkMock('L4', {status: 'mock-ok'}),
      reviewer: mkMock('L5', {tiers: ['mock'], consensus: {verdict: 'APPROVE'}}),
      convergence: mkMock('L6', {status: 'mock-final', iterations: 1}),
      persistence: mkMock('L7', null),
      reentry: mkMock('L8', null),
    };

    const result = await tick(mocks);

    // All 8 layers called exactly once, in canonical order.
    expect(callOrder).toEqual(['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8']);
    expect(mocks.discovery).toHaveBeenCalledTimes(1);
    expect(mocks.planner).toHaveBeenCalledTimes(1);
    expect(mocks.dispatcher).toHaveBeenCalledTimes(1);
    expect(mocks.executor).toHaveBeenCalledTimes(1);
    expect(mocks.reviewer).toHaveBeenCalledTimes(1);
    expect(mocks.convergence).toHaveBeenCalledTimes(1);
    expect(mocks.persistence).toHaveBeenCalledTimes(1);
    expect(mocks.reentry).toHaveBeenCalledTimes(1);

    // Discovery's return value flows through as the work queue.
    expect(result.status).toBe('completed');
    expect(result.work_item).toBe('mock-001');
    expect(result.layers_executed).toEqual([
      'L1:discovery', 'L2:planner', 'L3:dispatcher', 'L4:executor',
      'L5:reviewer', 'L6:convergence', 'L7:persistence', 'L8:reentry',
    ]);
  });

  it('queue_override takes precedence over discovery override', async () => {
    const discoveryMock = vi.fn(async () => [{id: 'from-discovery'}]);
    const result = await tick({
      queue_override: [{id: 'from-override'}],
      discovery: discoveryMock,
    });
    expect(result.work_item).toBe('from-override');
    // Discovery was bypassed because queue_override short-circuits the await.
    expect(discoveryMock).not.toHaveBeenCalled();
  });
});
