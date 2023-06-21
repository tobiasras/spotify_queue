import spotifyToken from './spotifyToken.js'
let timeToExpire
let accessKey = null
let requestKey = null

export default async function getAccessToken () {
  if (!requestKey) {
    return null
  }

  const nowTime = new Date()
  if (!accessKey) {
    await requestToken(nowTime)
    return accessKey
  }

  if (timeToExpire < nowTime) {
    await requestToken(nowTime)
    return accessKey
  } else {
    return accessKey
  }
}

async function requestToken (nowTime) {
  const body = new URLSearchParams()
  body.append('grant_type', 'refresh_token')
  body.append('refresh_token', requestKey)

  const res = await spotifyToken(body)

  accessKey = res.access_token
  timeToExpire = new Date(nowTime.getTime() + res.expires_in * 1000)
}

export function setupAccessToken (setup) {
  accessKey = setup.access_token
  requestKey = setup.refresh_token
  timeToExpire = new Date(new Date().getTime() + setup.expires_in * 1000)
}
