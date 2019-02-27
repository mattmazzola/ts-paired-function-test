export type FunctionAVoid = (...args: string[]) => Promise<void>
export type FunctionA<T> = (...args: string[]) => Promise<T>
export type FunctionB<T> = (result: T, ...args: string[]) => Promise<string>

interface IFuncName {
    name: string
}
interface IFuncAVoidRenderOptional extends IFuncName {
    funcA: FunctionAVoid
    funcB?: FunctionB<never>
}

interface IFuncAReturnsTSoFuncBRequired<T> extends IFuncName {
    funcA?: FunctionA<T>
    funcB: FunctionB<T>
}

type IPairedFunctions<T> =
    IFuncAVoidRenderOptional
    | IFuncAReturnsTSoFuncBRequired<T>

class MyClass {
    AddCallback<T>(callback: IPairedFunctions<T>) {
        // Do nothing, only worried about types for input
    }
}

const myClass = new MyClass()

// Since function A returns a Number the value should be passed to be function B and known to be a number.
// It is complaining about "any" which should not be since T is specified to be number
myClass.AddCallback({
    name: "My Paired Functions",
    funcA: async (arg1: string, arg2: string) => {
        return [arg1, arg2]
            .map(x => parseInt(x))
            .reduce((sum, a) => sum += a, 0)
    },
    funcB: async result => `Add result is: ${result}`
})

// Correctly accepts doesn't require func B since it detects funcA returns void
myClass.AddCallback({
    name: "My Paired Functions",
    funcA: async () => {
        let sum = 2 + 2
    }
})

// Again the types don't flow as expected. `result` argument is "any" but should be "never" since `funcA` returns void.
myClass.AddCallback({
    name: "My Paired Functions",
    funcA: async () => {
        let sum = 2 + 2
    },
    funcB: async (result) => {
        return "Types don't flow as expected"
    }
})

// Since `funcA` isn't provided, type of result should be "never"
myClass.AddCallback({
    name: "My Paired Functions",
    funcB: async (result) => {
        return "Types don't flow as expected"
    }
})
