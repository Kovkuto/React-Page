export const updateObjectInArray = (items: any[], itemId: any, obPropName: string, newObjProps: any) => {
    return items.map(item => item[obPropName] === itemId ? {
        ...item,
        ...newObjProps
    } : item)
}

export const createExpectedState = <T>(state: T, changeObject: Object) => {
    return {
        ...state,
        ...changeObject
    }
}
