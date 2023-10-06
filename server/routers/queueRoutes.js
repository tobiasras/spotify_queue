import express from 'express'
import { currentTrack, isQueuePlaying, skipSong, startQueue, stopQueue } from '../queue/queue.js'
import { io } from '../app.js'
import { authenticateSecret } from '../middelware/adminAuthMiddelware.js'
import log from '../logger/logger.js'

const queueRoutes = express.Router()

queueRoutes.get('/api/queue/state', (req, res) => {
  log.info({ label: '/api/queue/state', message: 'called' })
  res.send({ isPlaying: isQueuePlaying() })
})

queueRoutes.get('/api/queue/start', authenticateSecret, (req, res) => {
  log.info({ label: '/api/queue/start', message: 'called' })
  startQueue(io)
  res.sendStatus(204)
})

queueRoutes.get('/api/queue/skip', authenticateSecret, (req, res) => {
  log.info({ label: '/api/queue/skip', message: 'called' })
  skipSong(io)
  res.sendStatus(204)
})

queueRoutes.get('/api/queue/stop', authenticateSecret, (req, res) => {
  log.info({ label: '/api/queue/stop', message: 'called' })
  stopQueue()
  res.sendStatus(204)
})

queueRoutes.get('/api/queue/track', (req, res) => {
  if (isQueuePlaying()) {
    res.send(currentTrack)
  } else { res.sendStatus(404) }
})

export default queueRoutes
