import { isValid } from 'date-fns'

export const validateField = function (data, field, expectedType) {
  return data[field] && typeof data[field] === expectedType
}

export const validateDate = function (data, field) {
  if (validateField(data, field, 'string')) {
    if (!isValid(new Date(data[field]))) {
      return false
    }
  } else if (validateField(data, field, 'object')) {
    if (!isValid(data[field])) {
      return false
    }
  } else {
    return false
  }
  return true
}

export const validateArray = function (data, field, itemExpectedType) {
  const fieldData = data[field]
  if (fieldData && typeof fieldData === 'object' && Array.isArray(fieldData)) {
    for (let i = 0; i < fieldData.length; i++) {
      if (fieldData.hasOwnProperty(i)) {
        if (!validateField(fieldData, i, itemExpectedType)) {
          return false
        }
      } else {
        return false
      }
    }
  } else {
    return false
  }
  return true
}
