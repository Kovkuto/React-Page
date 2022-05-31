export const requiredField = (value) => {
    if (!value) return "Field is required"
    return undefined
}

export const minLength = (length) => (value) => {
    if (value) if (value.length < length) return `Min length is ${length}`
    return undefined
}
