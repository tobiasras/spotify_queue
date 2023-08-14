import express from 'express'
import {isQueuePlaying, skipSong, startQueue, stopQueue} from "../queue/queue.js";
import { io } from "../app.js";
import { authenticateSecret } from "../middelware/adminAuthMiddelware.js";

const queueRoutes = express.Router()

queueRoutes.get('/state', (req, res) => {
   res.send({"isPlaying": isQueuePlaying()});
})

queueRoutes.get('/start', (req, res) => {
   startQueue(io)
   res.sendStatus(204);
})

queueRoutes.get('/skip', (req, res) => {
   skipSong(io)
   res.sendStatus(204);
})

queueRoutes.get('/stop', (req, res) => {
   stopQueue()
   res.sendStatus(204)
})

export default queueRoutes
