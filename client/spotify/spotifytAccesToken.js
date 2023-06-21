import spotifyToken from './spotifyToken.js'
let timeToExpire
let accesKey = null
let requestKey = null

export default async function getAccessToken () {
  if (!requestKey) {
    return null
  }

  const nowTime = new Date()
  if (!accesKey) {
    await requestToken(nowTime)
    return accesKey
  }

  if (timeToExpire < nowTime) {
    await requestToken(nowTime)
    return accesKey
  } else {
    return accesKey
  }
}

async function requestToken (nowTime) {
  const body = new URLSearchParams()
  body.append('grant_type', 'refresh_token')
  body.append('refresh_token', requestKey)

  const res = await spotifyToken(body)

  accesKey = res.access_token
  timeToExpire = new Date(nowTime.getTime() + res.expires_in * 1000)
}

export function setupAccessToken (setup) {
  accesKey = setup.access_token
  requestKey = setup.refresh_token
  timeToExpire = new Date(new Date().getTime() + setup.expires_in * 1000)
}
