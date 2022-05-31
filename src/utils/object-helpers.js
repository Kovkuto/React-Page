export const updateObjectInArray = (items, itemId, obPropName, newObjProps) => {
    return items.map(item => item[obPropName] === itemId ? {
        ...item,
        ...newObjProps
    } : item)
}

