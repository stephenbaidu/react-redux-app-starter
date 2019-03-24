export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const replaceObjectById = (oldList, object) => {
  const updatedList = Object.assign([], oldList)
  const index = updatedList.findIndex( obj => obj.id === object.id)
  updatedList[index] = object
  return updatedList
}

export const deleteObjectById = (oldList, object) => {
  return oldList.filter(obj => obj.id !== object.id)
}
