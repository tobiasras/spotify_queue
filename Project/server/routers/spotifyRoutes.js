import express from 'express'
import { getAccessToken } from '../spotify/authentication/spotifyAccessToken.js'
import sendMessageByStatus from '../spotify/util/sendMessage.js'
import { filterTrackObject } from '../spotify/filters/trackObjectFilter.js'
import log from '../logger/logger.js'

const routerSearch = express.Router()

routerSearch.get('/api/search', async (req, res) => {
  const query = req.query.q
  log.info({ label: 'Spotify search', message: `Search query: ${req.query.q}` })

  if (!query) {
    res.status(400).send('Search query is empty')
    return
  }
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`

  try {
    const accessToken = await getAccessToken()

    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    if (response.status !== 200) {
      sendMessageByStatus(response.status, res)
    } else {
      const result = await response.json()
      const trackList = []
      const tracks = result.tracks.items
      tracks.forEach(track => {
        const filteredTrack = filterTrackObject(track)
        trackList.push(filteredTrack)
      })
      res.send(trackList)
    }
  } catch (e) {
    res.sendStatus(400)
  }
})
export default routerSearch
