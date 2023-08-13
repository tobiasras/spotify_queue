import {addSongToQueue, startQueue} from "../queue/queue.js";
import db from '../database/mongodb.js'

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        socket.on('buttonClick', (data) => {
            socket.emit('addToQueue', data);
        })

        socket.on('addSong', async (data) => {
            try {
                const response = await addSongToQueue(data)
                socket.emit("addedSongResponse", response)
            } catch (errorMessage) {
                /*
                Types of error messages:
                    "database error"
                    "song banned"
                    "multiple songs"
                    "spotify status, ####"
                 */
                socket.emit("addedSongResponse", errorMessage)
            }
        })

        socket.on('loadQueue', async () => {
            try {
                const result = await db.queue.find()
                socket.emit("queue", await result.toArray())
            } catch (e){
                console.log(e, "error in database")
            }
        })

    });
}


// })
// io.on('connection', async socket => {
//   console.log('playing')
//   socket.on('playing', (playing) => {
//     console.log(playing)
//     // socket.emit('playing', playing);
//   })
// })


// io.on('connection', async socket => {
//   console.log('play')
//   socket.on('play', (play) => {
//     console.log(play)
//     // socket.emit('play', play);
//   })
// })


// io.on('connection', async socket => {
//   console.log('nextTrack')
//   socket.on('nextTrack', (nextTrack) => {
//     console.log(nextTrack)
//     // socket.emit('nextTrack', nextTrack);
//   })
// })


// io.on('connection', async socket => {
//   console.log('prevTrack')
//   socket.on('prevTrack', (prevTrack) => {
//     console.log(prevTrack)
//     // socket.emit('prevTrack', prevTrack);
//   })
// })

// ROUTES
