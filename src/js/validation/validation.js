export const validateField = function validateField (data, field, expectedType) {
  return data[field] && typeof data[field] === expectedType
}
