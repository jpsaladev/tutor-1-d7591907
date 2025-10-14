# useState

- status: in_progress
- path: interview/notes/hooks/use-state.md
- category: hooks

## Overview
useState is React's hook for managing component state. It returns a stateful value and a setter function to update it. The mental model is that each useState call creates an independent piece of state that persists across re-renders. Use it when you need to store and update data that affects what the component renders.

## Why it matters in interviews
Common interview scenarios include building interactive components (counters, forms, toggles), understanding state updates (functional vs direct), preventing stale closures, and knowing when to lift state up vs keep it local.

## Key APIs / signatures
```typescript
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]
```

## TypeScript insights
- TypeScript infers the state type from the initial value
- Use explicit generics for complex types: `useState<User | null>(null)`
- Functional updates help with closures: `setCount(prev => prev + 1)`
- Event handlers need proper typing: `ChangeEvent<HTMLInputElement>`

## Pitfalls and anti-patterns
- **Stale closures**: Use functional updates when state depends on previous state
- **Object mutation**: Always create new objects/arrays instead of mutating existing ones
- **Initial state functions**: Use lazy initialization for expensive computations: `useState(() => expensiveCalculation())`
- **Too many useState calls**: Consider useReducer for complex state logic
- **Missing dependencies**: Remember that setState functions are stable and don't need to be in dependency arrays

## Exercise(s)
1. Counter with adjustable step
   - goal: Build a counter that can increment/decrement by a configurable step
   - steps: 
     - Create state for count and step
     - Add increment/decrement buttons
     - Add input to change step value
     - Use functional updates to prevent stale state
     - Disable decrement when count would go negative
   - expected result: Counter updates correctly, step changes work, buttons disable appropriately

2. Controlled vs uncontrolled input toggle
   - goal: Demonstrate the difference between controlled and uncontrolled inputs
   - steps:
     - Create state for input value and control mode
     - Add toggle to switch between controlled/uncontrolled
     - Show how value is preserved when switching back to controlled
     - Handle ChangeEvent<HTMLInputElement> properly
   - expected result: Input behaves correctly in both modes, value persists when switching

## Testing plan
- Tools: Manual testing via UI interactions
- Test cases: 
  - Counter increments/decrements correctly
  - Step changes affect counter behavior
  - Buttons disable when count would go negative
  - Input switches between controlled/uncontrolled modes
  - Value persists when switching modes
- Assertions: Visual verification of UI state changes

## Q&A (3–5)
- Q: What's the difference between `setState(newValue)` and `setState(prev => prev + 1)`?
  - A: Direct updates can cause stale closures when the state depends on previous state. Functional updates always receive the latest state value.

- Q: When should you use lazy initial state?
  - A: When the initial state requires expensive computation that you only want to run once on mount, not on every re-render.

- Q: Can you call useState conditionally?
  - A: No, hooks must be called in the same order every render. Use conditional logic inside the hook instead.

- Q: What happens if you don't provide an initial state?
  - A: The state will be undefined initially, and TypeScript will infer the type as `S | undefined`.

- Q: How do you update state based on props?
  - A: Use useEffect to sync state with props when needed, or consider if the state should be lifted up to the parent component.

## Progress
**Implemented:**
- Created interactive counter with adjustable step (Exercise 1)
- Built controlled vs uncontrolled input toggle (Exercise 2)
- Added proper TypeScript typing for all state and events
- Implemented functional updates to prevent stale closures
- Added accessibility features (labels, disabled states)
- Created visual indicators for current mode and state

**Verified:**
- Counter increments/decrements correctly with different step values
- Buttons disable appropriately when count would go negative
- Input switches between controlled/uncontrolled modes correctly
- Value persists when switching between modes
- All TypeScript types are properly inferred and explicit where needed

**Key learnings:**
- Functional updates (`setCount(prev => prev + step)`) are crucial for preventing stale closures
- Controlled inputs require `value` prop, uncontrolled use `defaultValue`
- Derived state (`canDecrement`) helps with conditional rendering
- Proper event typing (`ChangeEvent<HTMLInputElement>`) improves type safety

**Open questions:**
- None for this topic - ready to move to useEffect
