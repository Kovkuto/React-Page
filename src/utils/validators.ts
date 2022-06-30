export type FieldValidator = (value: string) => string | undefined 

export const requiredField = (value: string) => {
    if (!value) return "Field is required"
    return undefined
}

export const minLength = (length: number) => (value: string) => {
    if (value) if (value.length < length) return `Min length is ${length}`
    return undefined
}
