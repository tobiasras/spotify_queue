import express from 'express'
import getAccessToken from '../spotify/spotifytAccesToken.js'
import sendMessageByStatus from '../spotify/util/sendMessage.js'
import { filterTrackObject } from '../spotify/filters/trackObjectFilter.js'

const routerSearch = express.Router()

routerSearch.get('/', async (req, res) => {
  const query = req.query.q
  if (!query) {
    res.status(400).send('Search query is empty')
    return
  }
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`
  const promise = fetch(url, {
    headers: {
      Authorization: 'Bearer ' + await getAccessToken()
    }
  })
  const response = await promise
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
})
export default routerSearch
