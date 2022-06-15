export const updateObjectInArray = (items: any[], itemId: any, obPropName: string, newObjProps: any) => {
    return items.map(item => item[obPropName] === itemId ? {
        ...item,
        ...newObjProps
    } : item)
}
