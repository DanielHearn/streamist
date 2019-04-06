const clientID = 'w7r2pt1g7eqz2ctv34huqvpwzzcqvl'
const apiRoot = 'https://api.twitch.tv/helix/'

export async function getTopStreams () {
  const url = `${apiRoot}/streams`
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Client-id': clientID
    }
  })
    .then(response => response.json())
    .then(response => response.data)
}
