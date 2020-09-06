export default {}

type FunctionA<T> = (...args: string[]) => Promise<T | void>
type FunctionB<T> = (result: T, ...args: string[]) => Promise<string>

interface IPairedFunctions<T> {
    name: string
    funcA?: FunctionA<T>
    funcB?: FunctionB<T>
}

class MyClass {
    AddCallback<T>(callback: IPairedFunctions<T>) {
        // Do nothing, only worried about types for input
    }
}

const myClass = new MyClass()

// When both functions are added the type T flows from return of funcA to input of funcB as expected
myClass.AddCallback<number>({
    name: "My Paired Functions",
    funcA: async (arg1: string, arg2: string) => {
        return [arg1, arg2]
            .map(x => parseInt(x))
            .reduce((sum, a) => sum += a, 0)
    },
    funcB: async result => `Add result is: ${result}`
})

// However intention is that 1 of the functions must be provided. At least funcA or funcB
// Should be compile error but both types optional
myClass.AddCallback<number>({
    name: "My Paired Functions"
})
