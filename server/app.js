import './config/env.js'
import express from 'express'
import http from "http"
import {socketHandler} from './sockets/socketHandler.js'
import {Server} from 'socket.io'
import {checkIfLoggedInBefore} from "./spotify/authentication/spotifyAccessToken.js";

import spotifyAuthenticationRoutes from './routers/spotifyAuthenticationRoutes.js'
import adminRoutes from './routers/adminRoutes.js'
import spotifyRoutes from './routers/spotifyRoutes.js'
import queueRoutes from "./routers/queueRoutes.js"
import path from "path";

const app = express()

// GLOBAL MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// FETCH SPOTIFY ACCESS_TOKEN AND REFRESH_TOKEN from database
checkIfLoggedInBefore().then((isLoggedIn) => {
    console.log("is logged in", isLoggedIn)
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
// app.use('/utility', utilityRouter) // dont use this in production

// PAGES
app.use(express.static('../client/build/'))
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'))
})

server.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is running')
  }
})
