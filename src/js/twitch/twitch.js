const clientID = 'w7r2pt1g7eqz2ctv34huqvpwzzcqvl'
const apiRoot = 'https://api.twitch.tv/helix/'
const fetch = window.fetch

export function getTopStreams (quantity = 20) {
  const url = `${apiRoot}streams?first=${quantity}`
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Client-id': clientID
    }
  })
    .then(response => response.json())
    .then(response => response.data)
}

export function getGameInfo (ids) {
  const url = `${apiRoot}games?id=${ids.join('&id=')}`
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Client-id': clientID
    }
  }).then(response => response.json())
}
