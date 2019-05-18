export const config = {
  logging: true,
  maxHistoryLength: 20,
  appName: {
    formatted: 'Manytwitch',
    lowercase: 'manytwitch'
  },
  availableLayouts: [
    { id: 'grid', name: 'Grid' },
    { id: 'columns', name: 'Columns' },
    { id: 'rows', name: 'Rows' }
  ]
}

export const defaultData = {
  options: {
    chatVisible: true,
    menuVisible: true,
    startMuted: true,
    navVisible: true,
    currentLayout: { id: 'grid', name: 'Grid' }
  },
  streams: [],
  streamHistory: [],
  streamPresets: [],
  streamFavorites: []
}
