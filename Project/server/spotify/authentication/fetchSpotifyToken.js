/**
 * Used for getting the spotify access token takes:
 *
 * @param requestTokenInfo
 * requestTokenInfo {
 *     grant_type: 'authorization_code',
 *     code: code),
 *     redirect_uri', 'http://localhost:8080/auth/callback/')
 * }
 *
 * @returns {Promise<any>}
 */
import log from '../../logger/logger.js'

export async function fetchSpotifyToken (requestTokenInfo) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // eslint-disable-next-line new-cap
      Authorization: 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    body: requestTokenInfo
  })

  log.info({ label: 'spotify-token', message: `fetching spotify tokens, Status: ${response.status}` })

  return response.json()
}
