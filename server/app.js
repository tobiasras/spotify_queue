import './config/env.js'

import express from 'express'
import cors from 'cors'
import http from "http"
import {socketHandler} from './sockets/socketHandler.js'
import {Server} from 'socket.io'

import {checkIfLoggedInBefore} from "./spotify/authentication/spotifyAccessToken.js";
import {devmode} from "./spotify/util/devmode.js";

import spotifyAuthenticationRoutes from './routers/spotifyAuthenticationRoutes.js'
import adminRoutes from './routers/adminRoutes.js'
import spotifyRoutes from './routers/spotifyRoutes.js'
import queueRoutes from "./routers/queueRoutes.js"
import {authenticateSecret} from "./middelware/adminAuthMiddelware.js";

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
export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})


app.use('/auth', spotifyAuthenticationRoutes)
app.use('/admin' ,adminRoutes)
app.use('/search', spotifyRoutes)
app.use('/queue', queueRoutes)


isDevMode && devmode(app)

socketHandler(io)

server.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is running')
  }
})
