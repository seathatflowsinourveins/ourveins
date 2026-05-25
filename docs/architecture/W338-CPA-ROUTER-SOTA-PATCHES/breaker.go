// Package auth — provider-wide circuit breaker (W338 Patch 3).
//
// Drop into: sdk/cliproxy/auth/breaker.go
//
// Pattern: classic 3-state breaker from Nygard "Release It!" + sony/gobreaker.
//   CLOSED    — normal traffic; counting failures
//   OPEN      — all requests short-circuited for cooldown window
//   HALF-OPEN — single probe request; success → CLOSED, fail → OPEN
//
// Trip condition: ≥failureThreshold 529s within failureWindow.
// Cool: openDuration with full-jitter (defeats coordinated retry storms across
// multiple breaker instances if the proxy is horizontally scaled).
//
// 3-org-distinct references per sca-v13:
//   1. Nygard, "Release It!" (Pragmatic Bookshelf, ISBN 978-1680502398)
//   2. sony/gobreaker (MIT) — github.com/sony/gobreaker
//   3. resilience4j (Apache-2.0) — github.com/resilience4j/resilience4j
//
// Wire into selector.go SessionAffinity Pick: skip auths whose provider is OPEN.

package auth

import (
	"errors"
	"math/rand"
	"sync"
	"time"
)

// BreakerState enumerates the 3 states.
type BreakerState int

const (
	StateClosed BreakerState = iota
	StateOpen
	StateHalfOpen
)

func (s BreakerState) String() string {
	switch s {
	case StateClosed:
		return "closed"
	case StateOpen:
		return "open"
	case StateHalfOpen:
		return "half-open"
	}
	return "unknown"
}

// ErrBreakerOpen is returned when the breaker rejects a request.
var ErrBreakerOpen = errors.New("provider circuit breaker open")

// ProviderBreaker tracks per-provider failure rates and gates requests.
type ProviderBreaker struct {
	mu       sync.RWMutex
	states   map[string]*breakerState

	// Tunables — sensible defaults per sony/gobreaker conventions.
	failureThreshold int           // # 529s in window to trip (default 3)
	failureWindow    time.Duration // sliding window (default 10s)
	openDuration     time.Duration // base cool before HALF-OPEN (default 15s)
	openMaxDuration  time.Duration // cap after escalation (default 5m)
}

type breakerState struct {
	state        BreakerState
	failures     []time.Time // sliding window of 529 timestamps
	openUntil    time.Time
	openLevel    int // escalation level for repeated trips
	halfOpenSlot bool
}

// NewProviderBreaker constructs a breaker with default tunables.
func NewProviderBreaker() *ProviderBreaker {
	return &ProviderBreaker{
		states:           make(map[string]*breakerState),
		failureThreshold: 3,
		failureWindow:    10 * time.Second,
		openDuration:     15 * time.Second,
		openMaxDuration:  5 * time.Minute,
	}
}

// Allow returns nil if the request may proceed, or ErrBreakerOpen otherwise.
// In HALF-OPEN, allows ONE probe through (others see ErrBreakerOpen).
func (b *ProviderBreaker) Allow(provider string) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	s := b.getOrInit(provider)
	now := time.Now()

	switch s.state {
	case StateClosed:
		return nil
	case StateOpen:
		if now.After(s.openUntil) {
			s.state = StateHalfOpen
			s.halfOpenSlot = false
		} else {
			return ErrBreakerOpen
		}
		fallthrough
	case StateHalfOpen:
		if s.halfOpenSlot {
			return ErrBreakerOpen
		}
		s.halfOpenSlot = true
		return nil
	}
	return nil
}

// RecordOverload registers a 529 from this provider. May trip the breaker.
func (b *ProviderBreaker) RecordOverload(provider string) {
	b.mu.Lock()
	defer b.mu.Unlock()

	s := b.getOrInit(provider)
	now := time.Now()

	// Trim out-of-window entries.
	cutoff := now.Add(-b.failureWindow)
	pruned := s.failures[:0]
	for _, t := range s.failures {
		if t.After(cutoff) {
			pruned = append(pruned, t)
		}
	}
	s.failures = append(pruned, now)

	if s.state == StateClosed && len(s.failures) >= b.failureThreshold {
		b.trip(s, now)
		return
	}
	if s.state == StateHalfOpen {
		b.trip(s, now)
	}
}

// RecordSuccess registers a successful response.
// In HALF-OPEN, success closes the breaker. In CLOSED, no-op.
func (b *ProviderBreaker) RecordSuccess(provider string) {
	b.mu.Lock()
	defer b.mu.Unlock()

	s := b.getOrInit(provider)
	if s.state == StateHalfOpen {
		s.state = StateClosed
		s.failures = s.failures[:0]
		s.openLevel = 0
		s.halfOpenSlot = false
	}
}

// State returns the current breaker state for diagnostics.
func (b *ProviderBreaker) State(provider string) BreakerState {
	b.mu.RLock()
	defer b.mu.RUnlock()
	if s, ok := b.states[provider]; ok {
		return s.state
	}
	return StateClosed
}

// SetTunables — runtime adjustment from config or admin endpoint.
func (b *ProviderBreaker) SetTunables(threshold int, window, open, openMax time.Duration) {
	b.mu.Lock()
	defer b.mu.Unlock()
	if threshold > 0 {
		b.failureThreshold = threshold
	}
	if window > 0 {
		b.failureWindow = window
	}
	if open > 0 {
		b.openDuration = open
	}
	if openMax > 0 {
		b.openMaxDuration = openMax
	}
}

// --- private ---

func (b *ProviderBreaker) getOrInit(provider string) *breakerState {
	s, ok := b.states[provider]
	if !ok {
		s = &breakerState{state: StateClosed}
		b.states[provider] = s
	}
	return s
}

// trip moves state to OPEN with full-jitter cool duration.
// Repeated trips escalate up to openMaxDuration.
func (b *ProviderBreaker) trip(s *breakerState, now time.Time) {
	maxCool := b.openDuration * time.Duration(1<<s.openLevel)
	if maxCool >= b.openMaxDuration {
		maxCool = b.openMaxDuration
	}
	// Full-jitter per Brooker 2015. Range = [maxCool/4, maxCool].
	jitterRange := int64(maxCool - maxCool/4)
	jittered := time.Duration(rand.Int63n(jitterRange)) + (maxCool / 4)

	s.state = StateOpen
	s.openUntil = now.Add(jittered)
	s.failures = s.failures[:0]
	s.halfOpenSlot = false
	if s.openLevel < 10 { // arbitrary safe cap
		s.openLevel++
	}
}
