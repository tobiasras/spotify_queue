import db from '../database/mongodb.js'
import spotifyPlayer from '../spotify/player/spotifyPlayer.js'
import {io} from '../app.js'
import log from '../logger/logger.js'

let currentTimeout
export let currentTrack


/**
 returns if queue is playing or not
 */
export function isQueuePlaying() {
    if (currentTimeout) {
        // when using clearTimeout(currentTimeout) it does not set currentTimeout to null
        // there is a field _destroyed (bool) if true the currenTimeout has been stopped
        return !currentTimeout._destroyed
    }
    return false
}

export function startQueue(socket) {
    io.emit('playerState', true)

    return songCycle(0, socket)
}

export function skipSong(socket) {

    const promise = db.playedSongs.updateOne(
        { "name": currentTrack.name },
        { $set: {"song_skipped": true} }
    )

    promise.then(res => {
        console.log(res)
    })

    log.info({label: 'played songs', message: `Updated skip field on plated songs to true`})

    clearTimeout(currentTimeout)
    songCycle(0, socket)
}

export function stopQueue() {
    clearTimeout(currentTimeout)
    spotifyPlayer.pause()
    io.emit('playerState', false)
}

export async function addSongToQueue(track) {
    // CHECK IF SONG IS IN BANNED LIST
    try {
        const result = await db.bannedSongs.findOne({uri: track.uri})
        if (result) {
            console.log('song is banned')
            return 'song banned'
        }
    } catch (e) {
        console.log(e, 'Error searching if song is banned')
        return 'database error'
    }

    // CHECK IF SONG IS IN QUEUE
    try {
        const result = await db.queue.findOne({uri: track.uri})
        if (result) {
            return 'multiple songs'
        }
    } catch (e) {
        console.log(e, 'Error searching if song is in queue')
        return 'database error'
    }

    try {
        await db.queue.insertOne(track)
        return 'song added to queue'
    } catch (e) {
        return 'database error'
    }
}

export async function clearQueue(){
    const res = await db.queue.deleteMany()
    console.log(res)



    io.emit('queue', [])
}

function songCycle(length, socket) {
    db.queue.find().toArray().then((currentQueue) => {
        socket.emit('queue', currentQueue)
    })

    currentTimeout = setTimeout(async () => {
        try {
            let result = await db.queue.findOneAndDelete({}, {sort: {_id: 1}}) // DELETES SONG AFTER FETCH
            let newTrack = result.value

            let isFallbackTrack = false;

            if (!newTrack) {
                log.info({label: 'queue', message: `No track in queue, fetching fallback track:`})
                // NO SONGS IN QUEUE
                // FALL BACK PLAYLIST IS NEEDED
                result = await db.fallbackPlaylist.findOneAndUpdate(
                    {}, // your query
                    {
                        $set: {
                            last_played: new Date()
                        }
                    }, {
                        sort: {last_played: 1},
                        returnOriginal: false
                    }
                )
                newTrack = result.value
                isFallbackTrack = true
            }

            log.info({label: 'queue', message: `Track found, ${newTrack.name}`})
            spotifyPlayer.addSong(newTrack.uri).then(() => {
                try {
                    spotifyPlayer.next().then(() => {

                        try {
                            db.playedSongs.insertOne({
                                "song_skipped": false, // init false, gets updated in skip song method
                                "duration_ms": newTrack["duration_ms"],
                                "href": newTrack.href,
                                "id":newTrack.id,
                                "is_fallback_playlist": isFallbackTrack,
                                "played_at": new Date(),
                                "uri": newTrack.uri,
                                "name": newTrack.name,
                            });

                        } catch (e) {
                            log.warning({label: 'Played songs db', message: 'Failed adding played song to playlist'})
                        }

                        currentTrack = newTrack
                        socket.emit('currentSong', currentTrack)
                    })

                } catch (e) {
                    log.info({label: 'starting new queue', message: 'no suitable spotify player found'})
                }
            })

            // makes sure song is cut before end otherwise song can be skipped by spotify
            songCycle(newTrack.duration_ms-100, socket)


        } catch (e) {
            console.log(e)
            return 'spotify has stopped'
        }
    }, length)
}
