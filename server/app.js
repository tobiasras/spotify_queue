import './config/env.js'
import express from 'express'
import http from 'http'
import { socketHandler } from './sockets/socketHandler.js'
import { Server } from 'socket.io'
import { checkIfLoggedInBefore } from './spotify/authentication/spotifyAccessToken.js'

import spotifyAuthenticationRoutes from './routers/spotifyAuthenticationRoutes.js'
import adminRoutes from './routers/adminRoutes.js'
import spotifyRoutes from './routers/spotifyRoutes.js'
import queueRoutes from './routers/queueRoutes.js'
import path from 'path'
import log from './logger/logger.js'

const app = express()

// GLOBAL MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

checkIfLoggedInBefore().then((isLoggedIn) => {
  log.info({ label: 'startup', message: `Spotify login status: ${isLoggedIn}` })
})

// SOCKETS
const server = http.createServer(app)
export const io = new Server(server)
socketHandler(io)

// ROUTES
app.use(spotifyAuthenticationRoutes)
app.use(adminRoutes)
app.use(spotifyRoutes)
app.use(queueRoutes)

// PAGES
app.use(express.static('../client/build/'))
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'))
})

server.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    log.info({ label: 'startup', message: 'Server is running on: 8080' })
  }
})
