export default {}

type FunctionA<T> = (...args: string[]) => Promise<T>
type FunctionB<T> = (result: T, ...args: string[]) => Promise<string>

type PairedFns<T> =
    | {
        name: string
        funcA: FunctionA<T>
        funcB?: FunctionB<T extends void ? never : T>
    }
    | {
        name: string
        funcA?: FunctionA<T>
        funcB: FunctionB<T extends void ? never : T>
    }

class MyClass {
    AddCallback<T>(callback: PairedFns<T>) {
        // Do nothing, only worried about types for input
    }
}

const myClass = new MyClass()

// Both functions provided
// FuncA returns number
// result should be number
myClass.AddCallback({
    name: "FuncA return number",
    funcA: async (arg1, arg2) => {
        const sum = [arg1, arg2]
            .map(x => parseInt(x))
            .reduce((sum, a) => sum += a, 0)

        return sum
    },
    funcB: async result => `Add result is: ${result}`
})

// Both functions provided
// Func a returns object,
// result argument of funcB should be the type of this object
myClass.AddCallback({
    name: "FuncA return object",
    funcA: async (arg1, arg2) => {
        return {
            x: 2,
            arg1,
            arg2
        }
    },
    funcB: async result => `Add result is: ${result}`
})

myClass.AddCallback({
    name: "My Paired Functions",
    funcA: async () => {
        let sum = 2 + 2
    }
})

// Since `funcA` isn't provided, type of result should be "never"


myClass.AddCallback({
    name: "My Paired Functions",
    funcB: async (result) => {
        return "Types don't flow as expected"
    }
})