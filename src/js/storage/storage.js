const fields = {
  options: 'options',
  presets: 'stream_presets',
  history: 'stream_history',
  favorites: `channel_favorites`
}

const localStorage = window.localStorage

// Getters
export const getStoredOptions = function () {
  return localStorage.getItem(fields.options)
}

export const getStoredPresets = function () {
  return localStorage.getItem(fields.presets)
}

export const getStoredFavorites = function () {
  return localStorage.getItem(fields.favorites)
}

export const getStoredHistory = function () {
  return localStorage.getItem(fields.history)
}

// Setters
export const setStoredOptions = function (options) {
  localStorage.setItem(fields.options, JSON.stringify(options))
}

export const setStoredPresets = function (presets) {
  localStorage.setItem(fields.presets, JSON.stringify(presets))
}

export const setStoredFavorites = function (favorites) {
  localStorage.setItem(fields.favorites, JSON.stringify(favorites))
}

export const setStoredHistory = function (history) {
  localStorage.setItem(fields.history, JSON.stringify(history))
}
