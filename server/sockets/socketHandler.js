import {addSongToQueue, currentTrack, isQueuePlaying, startQueue} from "../queue/queue.js";
import db from '../database/mongodb.js'
import {io} from "../app.js";
import log from "../logger/logger.js";

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        socket.on('buttonClick', (data) => {
            socket.emit('addToQueue', data);
        })

        socket.on('addSong', async (data) => {
            try {
                log.info({label: "Queue", message: `Song added to queue`})
                const response = await addSongToQueue(data)
                socket.emit("addedSongResponse", response)

                const currentQueue = await db.queue.find().toArray()
                io.emit("queue", currentQueue)
            } catch (errorMessage) {
                log.warn({label: "Queue", message: `error adding song to queue: ${errorMessage}`})
                socket.emit("addedSongResponse", errorMessage)
            }
        })

        socket.on("loadCurrentSong", () => {
            socket.emit("currentSong", currentTrack)
        })


        socket.on('loadQueue', async () => {
            try {
                const result = await db.queue.find()
                socket.emit("queue", await result.toArray())
            } catch (e) {
                console.log(e, "error in database")
            }
        })


        socket.on("loadPlayerState", () => {
            socket.emit("playerState", isQueuePlaying())
        })
    });
}
