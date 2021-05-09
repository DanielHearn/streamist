export const config = {
  logging: true,
  maxHistoryLength: 20,
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
    chatLocation: 'right',
    currentLayout: { id: 'grid', name: 'Grid' },
    popularStreamLanguages: [{value: 'en', label: 'English'}]
  },
  streams: [],
  streamHistory: [],
  streamPresets: [],
  streamFavorites: []
}
