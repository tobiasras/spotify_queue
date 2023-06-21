import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import routerSpotifyAuthentication from './routes/spotifyAuthentication.js'
import adminLogin from './routes/adminLogin.js'
import spotifyPlayer from './routes/spotifyPlayer.js'
import spotifyQueue from './routes/spotifyQueue.js'
import spotifySearch from './routes/spotifySearch.js'
import { createLimiter } from './routes/Limiters/limiters.js'

const app = express()

const isNoLimit = process.argv.indexOf('nolimit') !== -1

app.use(express.json())
app.use(cors())
dotenv.config()
app.use(express.urlencoded({ extended: true }))

if (!isNoLimit) {
  app.use('/auth', createLimiter(15, 50))
  app.use('/admin', createLimiter(5, 5))
  app.use('/player', createLimiter(15, 100))

  app.get('/queue', createLimiter(15, 5))
  app.post('/queue', createLimiter(5, 1))
}

app.use('/auth', routerSpotifyAuthentication)
app.use('/admin', adminLogin)
app.use('/player', spotifyPlayer)
app.use('/queue', spotifyQueue)
app.use('/search', spotifySearch)

app.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is running')
    console.log('limits = ' + isNoLimit)
  }
})
