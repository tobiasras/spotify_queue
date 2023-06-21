import getAccessToken from '../spotify/spotifytAccesToken.js'
import express from 'express'
import sendMessageByStatus from '../spotify/util/sendMessage.js'
import { filterTrackObject } from '../spotify/filters/trackObjectFilter.js'

const routerSpotifyPlayer = express.Router()

routerSpotifyPlayer.get('/state', async (req, res) => {
  const promise = fetch('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  const response = await promise

  if (response.status !== 200) {
    sendMessageByStatus(response, res)
  } else {
    const result = await response.json()
    const state = {
      track: filterTrackObject(result.item),
      is_playing: result.is_playing
    }

    res.send(state)
  }
})

routerSpotifyPlayer.post('/next', async (req, res) => {
  const promise = fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })

  const response = await promise
  sendMessageByStatus(response, res)
})

routerSpotifyPlayer.post('/previous', async (req, res) => {
  const promise = fetch('https://api.spotify.com/v1/me/player/previous', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  const response = await promise
  sendMessageByStatus(response, res)
})

routerSpotifyPlayer.put('/play', async (req, res) => {
  const promise = fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })

  const response = await promise

  if (response.status === 403) {
    res.status(403)
    res.send({ message: 'track is already playing' })
  } else if (response.status === 404) {
    res.status(404)
    res.send({ message: 'cant find device to play' })
  } else {
    sendMessageByStatus(response, res)
  }
})

routerSpotifyPlayer.put('/pause', async (req, res) => {
  const promise = fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })

  const response = await promise

  if (response.status === 403) {
    res.status(403)
    res.send({ message: 'no track is playing' })
  } else if (response.status === 404) {
    res.status(404)
    res.send({ message: 'cant find device to play' })
  } else {
    sendMessageByStatus(response, res)
  }
})

export default routerSpotifyPlayer
