import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import routerSpotifyAuthentication from './routers/spotifyAuthentication.js'
import adminLogin from './routers/adminLogin.js'
import spotifySearch from './routers/spotifySearch.js'
dotenv.config()

const app = express()

// RUN SETTINGS
const isNoLimit = process.argv.indexOf('nolimit') !== -1

// GLOBAL MIDDLEWARE
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.use('/auth', routerSpotifyAuthentication)
app.use('/admin', adminLogin)
app.use('/search', spotifySearch)


app.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is running')
    console.log('limits = ' + isNoLimit)
  }
})
