import './config/env.js'
import express from 'express'
import cors from 'cors'
import routerSpotifyAuthentication from './routers/spotifyAuthentication.js'
import adminLogin from './routers/adminLogin.js'
import spotifySearch from './routers/spotifySearch.js'
import http from "http"
import {socketHandler} from './sockets/socketHandler.js'
import {Server} from 'socket.io'
import {checkIfLoggedInBefore} from "./spotify/authentication/spotifyAccessToken.js";
import {devmode} from "./spotify/util/devmode.js";
import {skipSong, startQueue, stopQueue} from "./Queue/queue.js";

const app = express()



// RUN SETTINGS
const isDevMode = process.argv.indexOf('devmode') !== -1

// GLOBAL MIDDLEWARE
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

// CHECKS IF LOGGED IN
checkIfLoggedInBefore().then((isLoggedIn) => {
    console.log("is logged in", isLoggedIn)
})

// SOCKETS
const server = http.createServer(app)
// const io = new Server(server)
export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})


app.use('/auth', routerSpotifyAuthentication)
app.use('/admin', adminLogin)
app.use('/search', spotifySearch)

app.get('/start', (req, res) => {
  startQueue(io)
  res.sendStatus(204);
})

app.get('/skip', (req, res) => {
  skipSong(io)
  res.sendStatus(204);
})

app.get('/stop', (req, res) => {
  stopQueue()
  res.sendStatus(204);
})



isDevMode && devmode(app)

socketHandler(io)

server.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is running')
  }
})
