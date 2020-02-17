export default {
  formatDataFromAPI: data => {
    const formatData = data.map(item => {
      const isVectorReady = item.isVectorReady
      const formatItem = {
        ...item,
        id: item.stringId,
        ...(isVectorReady !== null && { isQueryVectorReady: isVectorReady })
      }

      delete formatItem.stringId
      if (isVectorReady !== null) {
        delete formatItem.isVectorReady
      }
      return formatItem
    })

    return formatData
  },

  formatData: data => {
    const formatData = data.map(item => {
      const formatItem = {
        ...item,
        id: item.stringId
      }

      delete formatItem.stringId
      return formatItem
    })

    return formatData
  },

  formatObjFromAPI: data => {
    const format = {
      ...data,
      id: data.stringId ? data.stringId : data.id
    }
    if (format.stringId) {
      delete format.stringId
    }

    return format
  },

  formatQueryDetail: data => {
    const isVectorReady = data.isVectorReady
    const format = {
      ...data,
      id: data.stringId ? data.stringId : data.id,
      ...(isVectorReady && { isQueryVectorReady: isVectorReady })
    }
    if (format.stringId) {
      delete format.stringId
    }

    if (isVectorReady) {
      delete format.isVectorReady
    }

    return format
  }
}
