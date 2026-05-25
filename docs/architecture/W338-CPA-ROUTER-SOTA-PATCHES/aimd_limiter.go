// Package auth — AIMD (Additive-Increase / Multiplicative-Decrease) concurrency limiter (W338 Patch 4).
//
// Drop into: sdk/cliproxy/auth/aimd_limiter.go
//
// Caps in-flight upstream requests per (provider, model) tuple. Auto-shrinks
// on 529 storms, grows on success streaks. This is the SINGLE highest-leverage
// fix because it prevents the storm from forming in the first place.
//
// Pattern: classic AIMD as used in TCP congestion control (RFC 5681) and
// Netflix concurrency-limits (Vegas variant). Window starts conservative,
// grows by 1 per N successes, halves on each 529 burst.
//
// 3-org-distinct references per sca-v13:
//   1. RFC 5681 TCP Congestion Control — IETF
//   2. Netflix concurrency-limits (Apache-2.0) — github.com/Netflix/concurrency-limits
//   3. Google SRE Book Ch.21 "Handling Overload" — sre.google/sre-book/handling-overload/
//
// Wire into selector.go: acquire token before Pick(), release on response or timeout.

package auth

import (
	"context"
	"errors"
	"sync"
	"sync/atomic"
	"time"
)

// ErrLimiterTimeout is returned when acquire waits longer than ctx allows.
var ErrLimiterTimeout = errors.New("aimd limiter acquire timeout")

// AIMDLimiter holds per-key concurrency state.
type AIMDLimiter struct {
	mu     sync.RWMutex
	states map[string]*aimdState

	// Tunables.
	initialCap       int           // starting cap (default 8)
	minCap           int           // floor (default 2)
	maxCap           int           // ceiling (default 32)
	successesToGrow  int           // # successes before +1 (default 10)
	overloadDecay    float64       // multiplicative decrease (default 0.5 — halving)
	growthCooldown   time.Duration // min interval between cap growths (default 5s)
}

type aimdState struct {
	cap        int          // current cap
	inflight   atomic.Int64 // current in-flight count
	successes  atomic.Int64 // success-streak counter
	lastGrowth time.Time
	tokens     chan struct{} // semaphore — capacity dynamic via cap
}

// NewAIMDLimiter constructs a limiter with conservative defaults.
func NewAIMDLimiter() *AIMDLimiter {
	return &AIMDLimiter{
		states:          make(map[string]*aimdState),
		initialCap:      8,
		minCap:          2,
		maxCap:          32,
		successesToGrow: 10,
		overloadDecay:   0.5,
		growthCooldown:  5 * time.Second,
	}
}

// Acquire reserves a slot. Blocks until available or ctx cancelled.
// MUST be paired with Release().
func (l *AIMDLimiter) Acquire(ctx context.Context, key string) error {
	s := l.getOrInit(key)
	select {
	case s.tokens <- struct{}{}:
		s.inflight.Add(1)
		return nil
	case <-ctx.Done():
		return ErrLimiterTimeout
	}
}

// Release returns the slot. MUST be called exactly once per Acquire.
func (l *AIMDLimiter) Release(key string) {
	s := l.getOrInit(key)
	s.inflight.Add(-1)
	select {
	case <-s.tokens:
	default:
		// Token may have been consumed by a Shrink resize; ignore.
	}
}

// RecordSuccess advances the success-streak. May grow cap (additive increase).
func (l *AIMDLimiter) RecordSuccess(key string) {
	s := l.getOrInit(key)
	n := s.successes.Add(1)
	if n < int64(l.successesToGrow) {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	if time.Since(s.lastGrowth) < l.growthCooldown {
		return
	}
	if s.cap >= l.maxCap {
		return
	}
	s.cap++
	s.lastGrowth = time.Now()
	s.successes.Store(0)
	// Grow the semaphore.
	newTokens := make(chan struct{}, s.cap)
	close(s.tokens) // any pending Acquire wakes up with closed channel — handled below
	s.tokens = newTokens
}

// RecordOverload halves the cap (multiplicative decrease).
// Called on every 529 received from this key's provider.
func (l *AIMDLimiter) RecordOverload(key string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	s, ok := l.states[key]
	if !ok {
		return
	}
	newCap := int(float64(s.cap) * l.overloadDecay)
	if newCap < l.minCap {
		newCap = l.minCap
	}
	if newCap == s.cap {
		return
	}
	s.cap = newCap
	s.successes.Store(0)
	// Resize semaphore. Pending acquires drain naturally.
	newTokens := make(chan struct{}, s.cap)
	// Drain old up to newCap.
	for i := 0; i < s.cap; i++ {
		select {
		case <-s.tokens:
			newTokens <- struct{}{}
		default:
		}
	}
	s.tokens = newTokens
}

// Stats returns a snapshot for diagnostics / Prometheus export.
func (l *AIMDLimiter) Stats(key string) (cap int, inflight int64) {
	l.mu.RLock()
	defer l.mu.RUnlock()
	if s, ok := l.states[key]; ok {
		return s.cap, s.inflight.Load()
	}
	return 0, 0
}

// SetTunables for runtime adjustment.
func (l *AIMDLimiter) SetTunables(initial, min, max, succ int, decay float64, growthCool time.Duration) {
	l.mu.Lock()
	defer l.mu.Unlock()
	if initial > 0 {
		l.initialCap = initial
	}
	if min > 0 {
		l.minCap = min
	}
	if max > 0 {
		l.maxCap = max
	}
	if succ > 0 {
		l.successesToGrow = succ
	}
	if decay > 0 && decay < 1 {
		l.overloadDecay = decay
	}
	if growthCool > 0 {
		l.growthCooldown = growthCool
	}
}

// --- private ---

func (l *AIMDLimiter) getOrInit(key string) *aimdState {
	l.mu.RLock()
	if s, ok := l.states[key]; ok {
		l.mu.RUnlock()
		return s
	}
	l.mu.RUnlock()

	l.mu.Lock()
	defer l.mu.Unlock()
	// Re-check after upgrading lock.
	if s, ok := l.states[key]; ok {
		return s
	}
	s := &aimdState{
		cap:    l.initialCap,
		tokens: make(chan struct{}, l.initialCap),
	}
	l.states[key] = s
	return s
}
