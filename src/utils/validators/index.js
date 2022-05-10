export const requiredField = (value) => {
    if (!value) return "Field is required"
    return undefined
}

export const minLength = (minLength) => (value) => {
    if (value && value.length < minLength) return `Minimal length is ${minLength} symbols`
    return undefined
} 
