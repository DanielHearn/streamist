function generateHash (length) {
  return Math.random().toString(36).slice(-length)
}

export const generateID = generateHash
