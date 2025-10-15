# useEffect

- status: in_progress
- path: interview/notes/hooks/use-effect.md
- category: hooks

## Overview
useEffect is React's hook for performing side effects in functional components. It runs after render and can be used for data fetching, subscriptions, timers, and DOM manipulation. The mental model is that effects run after the DOM has been updated, and you can control when they run using dependency arrays.

## Why it matters in interviews
Common scenarios include data fetching, setting up subscriptions, cleanup on unmount, and understanding the component lifecycle. Interviewers often ask about dependency arrays, cleanup functions, and avoiding infinite loops.

## Key APIs / signatures
```typescript
function useEffect(effect: EffectCallback, deps?: DependencyList): void

type EffectCallback = () => void | (() => void)
type DependencyList = ReadonlyArray<any>
```

## TypeScript insights
- Effect functions can return cleanup functions
- Dependency arrays should include all values from component scope that are used inside the effect
- Use `useCallback` and `useMemo` to stabilize dependencies
- Async effects need careful handling since useEffect can't be async directly

## Pitfalls and anti-patterns
- **Missing dependencies**: Always include all values from component scope used in the effect
- **Infinite loops**: Avoid including objects/arrays that are recreated on every render
- **Stale closures**: Use functional updates or include dependencies properly
- **Memory leaks**: Always clean up subscriptions, timers, and event listeners
- **Async in effects**: Don't make the effect function async; use async functions inside

## Exercise(s)
1. Data fetching with loading states
   - goal: Fetch data from an API and handle loading/error states
   - steps:
     - Create state for data, loading, and error
     - Use useEffect to fetch data on mount
     - Handle async operations properly
     - Add cleanup to cancel requests
     - Implement retry functionality
   - expected result: Data loads on mount, shows loading state, handles errors gracefully

2. Timer with cleanup
   - goal: Create a countdown timer that cleans up properly
   - steps:
     - Create state for countdown value
     - Use useEffect with setInterval
     - Clean up interval on unmount
     - Handle component unmounting during countdown
     - Add pause/resume functionality
   - expected result: Timer counts down correctly, cleans up on unmount, can be paused/resumed

## Testing plan
- Tools: Manual testing via UI interactions
- Test cases:
  - Data fetching shows loading state initially
  - Data loads successfully and displays
  - Error states are handled gracefully
  - Timer counts down correctly
  - Cleanup happens on unmount
  - Pause/resume works correctly
- Assertions: Visual verification of state changes and cleanup behavior

## Q&A (3–5)
- Q: When does useEffect run?
  - A: After the DOM has been updated, but before the browser paints. It runs after every render by default, unless you provide a dependency array.

- Q: How do you prevent useEffect from running on every render?
  - A: Provide a dependency array. Empty array `[]` runs only on mount/unmount, specific dependencies run when those values change.

- Q: What's the difference between useEffect and useLayoutEffect?
  - A: useLayoutEffect runs synchronously after DOM mutations but before paint, while useEffect runs asynchronously after paint. Use useLayoutEffect for DOM measurements.

- Q: How do you handle async operations in useEffect?
  - A: Don't make the effect function async. Instead, create an async function inside the effect and call it, or use a library like React Query.

- Q: Why is cleanup important in useEffect?
  - A: Cleanup prevents memory leaks by canceling subscriptions, timers, and requests when the component unmounts or dependencies change.

## Progress
Planned. Implementation next in `playgrounds/use-effect` with two exercises (fetch + timer).
