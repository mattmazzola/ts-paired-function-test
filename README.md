Trying to figure out how to flow the return type of 1 function through to another when functions are passed as options to a configuration object.

Configuration object accepts `name`, `funcA`, and `funcB`

Example:
```typescript
{
    name: "Sample Config Object",
    funcA: () => 1 + 2,
    funcB: (resultOfFuncA) => `Your number is: ${resultOfFuncA + 3}`
}
```

Rules about config objects:
- Must always have a `name`
- `funcA` may or may not be provided. It can return a type T or nothing in which case it returns void
- If `funcA` is not provided or returns void there is no result to pass to `funcB` thus `funcB` should be prevented from trying to use it. This is the reason for attempting to use `never` or `void` as argument type.
  (You might ask Why call the `funcB` with the undefined argument from `funcA`? In the real scenario we rely on positions of arguments for `funcB` function and don't want the user to have to change things if they update the `funcA`. Essentially trying to preserve signature of function)

- If `funcA` is provided and returns something this value will get passed as first argument to `funcB`.