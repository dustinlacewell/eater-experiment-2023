import * as consts from "./consts";

export const localTokens = {
    Canvas: Symbol.for("Canvas"),
    Context: Symbol.for("Context"),
} as const

// map const names to symbols
const constTokens = Object.entries(consts).reduce((acc, [key, val]) => {
    acc[key as keyof typeof consts] = Symbol.for(key)
    return acc
}, {} as Record<keyof typeof consts, symbol>)

export const tokens = {
    ...localTokens,
    ...constTokens,
} as const