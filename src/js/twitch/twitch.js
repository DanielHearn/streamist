const clientID = 'w7r2pt1g7eqz2ctv34huqvpwzzcqvl'
const clientSecret = 'w0ewj78ppny2exj7ck4kmhaeld8tzs'
const apiRoot = 'https://api.twitch.tv/helix/'
const authRoot = 'https://id.twitch.tv/oauth2/token'
const fetch = window.fetch

export function getAccessToken () {
  const url = `${authRoot}?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache'
  })
    .then(response => response.json())
}

export function getTopStreams (accessToken, quantity = 20) {
  const url = `${apiRoot}streams?first=${quantity}`
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Authorization': `Bearer ${accessToken}`, 
      'Client-ID': clientID
    }
  })
    .then(response => response.json())
    .then(response => response.data)
}

export function getGameInfo (accessToken, ids) {
  const url = `${apiRoot}games?id=${ids.join('&id=')}`
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Authorization': `Bearer ${accessToken}`, 
      'Client-ID': clientID
    }
  }).then(response => response.json())
}
