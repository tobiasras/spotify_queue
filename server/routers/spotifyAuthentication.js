import querystring from 'querystring'
import { getAccessToken } from '../spotify/authentication/spotifyAccessToken.js'

import express from 'express'
import {fetchSpotifyToken} from "../spotify/authentication/fetchSpotifyToken.js";

const routerSpotifyAuthentication = express.Router()

routerSpotifyAuthentication.get('/state', async (req, res) => {
  if (!await getAccessToken()) {
    const response = {
      message: 'NO_ACCOUNT_CONNECTED'
    }
    res.send(response)
  } else {
    const response = fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + await getAccessToken()
      }
    })

    const result = await response
    res.send(await result.json())
  }
})

routerSpotifyAuthentication.get('/login', function (req, res) {
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

routerSpotifyAuthentication.get('/callback', async (req, res) => {
  const code = req.query.code || null
  const requestTokenInfo = new URLSearchParams()
  requestTokenInfo.append('grant_type', 'authorization_code')
  requestTokenInfo.append('code', code)
  requestTokenInfo.append('redirect_uri', process.env.SPOTIFY_CLIENT_CALLBACK_URL)

  const token = await fetchSpotifyToken(requestTokenInfo)
  token.username = process.env.USERNAME
  token.creationTime = new Date()

  res.redirect('http://localhost:3000/admin')
})


export default routerSpotifyAuthentication
