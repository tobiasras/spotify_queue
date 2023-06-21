import { MongoClient, ServerApiVersion } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const db = client.db('spotify-queue')
export default {
    logs: db.collection('logs'),
    queue: db.collection('queue'),
    playedSongs: db.collection('played-songs'),
    fallbackPlaylist: db.collection('fallback-playlist')
}
