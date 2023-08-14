import express from 'express'
import {getQueueState, skipSong, startQueue, stopQueue} from "../queue/queue.js";
import {io} from "../app.js";

const queueRouter = express.Router()



queueRouter.get('/state', (req, res) => {
   getQueueState()
})

queueRouter.get('/start', (req, res) => {
   startQueue(io)
   res.sendStatus(204);
})

queueRouter.get('/skip', (req, res) => {
   skipSong(io)
   res.sendStatus(204);
})

queueRouter.get('/stop', (req, res) => {
   stopQueue()
   res.sendStatus(204);
})








export default router
