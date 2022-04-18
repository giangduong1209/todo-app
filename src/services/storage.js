export const saveTokenInLocalStorage = (nameKey, tokenDetail) => {
  localStorage.setItem(nameKey, JSON.stringify(tokenDetail))
}

export const getTokenInLocalStorage = (nameKey) => {
  const dataStorage = localStorage.getItem(nameKey)
  if (dataStorage) {
    return JSON.parse(dataStorage)
  } else {
    return nameKey
  }
}

export const removeTokenInLocalStorage = (nameKey) =>
  localStorage.removeItem(nameKey)
