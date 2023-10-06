import express from 'express'
import db from '../database/mongodb.js'
const utilityRouter = express.Router()

utilityRouter.post('/fallback-playlist', async (req, res) => {
  const result = await db.queue.find()
  const queue = await result.toArray()
  const time = new Date(0)

  const tracksWithLastPlayedField = queue.map(track => {
    track.last_played = time
    return track
  })

  try {
    const response = db.fallbackPlaylist.insertMany(tracksWithLastPlayedField)
    console.log(await response)
    res.sendStatus(204)
  } catch (e) {
    res.sendStatus(400)
  }
})

export default utilityRouter
