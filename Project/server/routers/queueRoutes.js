import express from 'express'
import {clearQueue, currentTrack, isQueuePlaying, skipSong, startQueue, stopQueue} from '../queue/queue.js'
import {io} from '../app.js'
import {authenticateSecret} from '../middelware/adminAuthMiddelware.js'
import log from '../logger/logger.js'
import db from '../database/mongodb.js'

const queueRoutes = express.Router()

queueRoutes.get('/api/queue/state', (req, res) => {
    log.info({label: '/api/queue/state', message: 'called'})
    res.send({isPlaying: isQueuePlaying()})
})

queueRoutes.get('/api/queue/start', authenticateSecret, (req, res) => {
    log.info({label: '/api/queue/start', message: 'called'})
    startQueue(io)
    res.sendStatus(204)
})

queueRoutes.get('/api/queue/skip', authenticateSecret, (req, res) => {
    log.info({label: '/api/queue/skip', message: 'called'})
    skipSong(io)
    res.sendStatus(204)
})

queueRoutes.get('/api/queue/stop', authenticateSecret, (req, res) => {
    log.info({label: '/api/queue/stop', message: 'called'})
    stopQueue()
    res.sendStatus(204)
})

queueRoutes.get('/api/queue/track', (req, res) => {
    if (isQueuePlaying()) {
        res.send(currentTrack)
    } else {
        res.sendStatus(404)
    }
})

/**
Adds current playing song to the fallback playlist
 */
queueRoutes.post('/api/queue/fallback', authenticateSecret, async (req, res) => {

    const track = await db.fallbackPlaylist.findOne({id: currentTrack.id})
    if (track) {
        log.info({label: '/api/queue/fallback', message: `${currentTrack.name} allready exist in fallback database`})
        return res.sendStatus(409)
    }

    const trackToFallBackPlaylist = currentTrack
    trackToFallBackPlaylist["last_played"] = new Date()

    log.info({label: '/api/queue/fallback', message: `Added new song to fallback playlist: ${trackToFallBackPlaylist.name}`})

    try {
        const response = db.fallbackPlaylist.insertOne(trackToFallBackPlaylist)
        console.log(await response)
        res.sendStatus(204)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})

queueRoutes.post('/api/queue/ban', authenticateSecret, async (req, res) => {

    const track = await db.bannedSongs.findOne({id: currentTrack.id})
    if (track) {
        log.info({label: '/api/queue/ban', message: `${currentTrack.name} allready exist in banned songs`})
        return res.sendStatus(409)
    }

    const trackToBannedList = currentTrack
    log.info({label: '/api/queue/fallback', message: `Added new song to banned list: ${trackToBannedList.name}`})

    try {
        const response = db.bannedSongs.insertOne(trackToBannedList)
        console.log(await response)
        res.sendStatus(204)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})




queueRoutes.get('/api/queue/clear', authenticateSecret, async (req, res) => {
    await clearQueue();

    res.sendStatus(204)
})




export default queueRoutes
