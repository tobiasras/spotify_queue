import express from 'express'
import {currentTrack, isQueuePlaying, skipSong, startQueue, stopQueue} from "../queue/queue.js";
import { io } from "../app.js";
import { authenticateSecret } from "../middelware/adminAuthMiddelware.js";

const queueRoutes = express.Router()

queueRoutes.get('/state' , (req, res) => {
   res.send({"isPlaying": isQueuePlaying()});
})

queueRoutes.get('/start', authenticateSecret , (req, res) => {
   startQueue(io)
   res.sendStatus(204);
})

queueRoutes.get('/skip', authenticateSecret , (req, res) => {
   skipSong(io)
   res.sendStatus(204);
})

queueRoutes.get('/stop', authenticateSecret , (req, res) => {
   stopQueue()
   res.sendStatus(204)
})


queueRoutes.get('/track', (req, res) => {
   if (isQueuePlaying()){
      res.send(currentTrack)
   } else
      res.sendStatus(404)
})

export default queueRoutes
