import querystring from 'querystring'
import {clearToken, getAccessToken, setSpotifyTokensValues} from '../spotify/authentication/spotifyAccessToken.js'
import express from 'express'
import {fetchSpotifyToken} from "../spotify/authentication/fetchSpotifyToken.js";
import {isQueuePlaying, stopQueue} from "../queue/queue.js";
import log from "../logger/logger.js";

const routerSpotifyAuthentication = express.Router() // URL : /auth/***


routerSpotifyAuthentication.get('/api/auth/login', (req, res) => {
  const redirectLink = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-modify-playback-state ' + 'user-read-private ' + 'user-read-email ' + 'user-read-playback-state',
        redirect_uri: process.env.SPOTIFY_CLIENT_CALLBACK_URL
      })

  res.send({
    redirectLink
  })
})

routerSpotifyAuthentication.get('/api/auth/logout', (req, res) => {
  log.info({label: "Logout", message: `logout of spotify:` })

  if (isQueuePlaying()){
    stopQueue()
  }
  clearToken()
  res.sendStatus(204)
})


/**
 * USED BY FRONTEND TO CHECK IF A SPOTIFY ACCOUNT IS CONNECTED
 * SENDS NAME OF SPOTIFY ACCOUNT OWNER
 */
routerSpotifyAuthentication.get('/api/auth/state', async (req, res) => {
  try {
    const accessToken = await getAccessToken()

    const result = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + await accessToken
      }
    })
    res.send(await result.json())
  } catch (e) {
    log.warn({label: "/api/auth/state", message: `spotify account not connected` })
    res.sendStatus(400)
  }
})


routerSpotifyAuthentication.get('/api/auth/callback', async (req, res) => {
  log.warn({label: "/api/auth/callback", message: `called` })

  const code = req.query.code || null
  const requestTokenInfo = new URLSearchParams()
  requestTokenInfo.append('grant_type', 'authorization_code')
  requestTokenInfo.append('code', code)
  requestTokenInfo.append('redirect_uri', process.env.SPOTIFY_CLIENT_CALLBACK_URL)

  const token = await fetchSpotifyToken(requestTokenInfo)

  token.username = process.env.USER
  token.creationTime = new Date()

  setSpotifyTokensValues(token)

  res.redirect('/admin')
})


export default routerSpotifyAuthentication
