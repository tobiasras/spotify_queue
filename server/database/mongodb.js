import { MongoClient, ServerApiVersion } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const db = client.db('spotify_queue')

export default {
  logs: db.collection('logs'),
  queue: db.collection('queue'),
  playedSongs: db.collection('played_songs'),
  bannedSongs: db.collection('banned_songs'),
  fallbackPlaylist: db.collection('fallback_playlist'),
  spotifyAccess: db.collection('spotify_tokens')
}
