export function capitlizeString(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const getStatus = (
  isQueryVectorReady,
  truthEncodeAnswer,
  otherQuery
) => {
  if (truthEncodeAnswer) {
    return 'Ready'
  } else {
    if (otherQuery) {
      if (isQueryVectorReady) {
        return 'Query Vector is ready'
      }
    }
    return 'Not Ready'
  }
}
