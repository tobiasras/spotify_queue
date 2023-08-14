import db from '../database/mongodb.js'
import spotifyPlayer from "../spotify/player/spotifyPlayer.js";

let currentTimeout

/**
    returns if queue is playing or not
 */
export function isQueuePlaying() {
    if (currentTimeout){
        // when using clearTimeout(currentTimeout) it does not set currentTimeout to null
        // there is a field _destroyed (bool) if true the currenTimeout has been stopped
        return !currentTimeout._destroyed
    }
    return false;
}

export function startQueue(socket) {
    songCycle(0, socket) // 0, because no song is playing
}

export function skipSong(socket) {
    clearTimeout(currentTimeout)
    songCycle(0, socket) // 0, because no song is playing
}


export function stopQueue() {
    clearTimeout(currentTimeout)
    spotifyPlayer.pause()

}


function songCycle(length, socket) {
    console.log(`songCycle - length: ${length}`)

    db.queue.find().toArray().then((currentQueue) => {
        socket.emit("queue", currentQueue)
    })

    currentTimeout = setTimeout(async () => {
        try {
            let result = await db.queue.findOneAndDelete({}, {sort: {_id: 1}}); // DELETES SONG AFTER FETCH
            let newTrack = result.value
            if (!newTrack) {
                newTrack = await db.fallbackPlaylist.findOneAndUpdate(
                    {},
                    {$inc: {"amount_played": 1}},
                    {sort: {"amount_played": 1},}
                )
            }
            spotifyPlayer.addSong(newTrack.uri).then(() => {
                    spotifyPlayer.next().then(value => {
                        console.log("next song:", value)
                    })
            })

            console.log(`next song:  ${newTrack.name}`)
            songCycle(newTrack.duration_ms, socket)
        } catch {
            return "spotify has stopped"
        }
    }, length)
}

export function addSongToQueue(track) {
    return new Promise(async (resolve, reject) => {
        // CHECK IF SONG IS IN BANNED LIST
        try {
            const result = await db.bannedSongs.findOne({id: track.id})
            if (result) {
                reject("song banned")
            }
        } catch (e) {
            console.log(e, "Error searching if song is banned")
            reject("database error")
        }

        // CHECK IF SONG IS IN QUEUE
        try {
            const result = await db.queue.findOne({id: track.id})
            if (result) {
                reject("multiple songs")
            }
        } catch (e) {
            console.log(e, "Error searching if song is in queue")
            reject("database error")
        }

        try {
            await db.queue.insertOne(track)
            resolve("song added to queue")
        } catch (e) {
            reject("database error")
        }

    })
}
