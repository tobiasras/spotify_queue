import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import routerSpotifyAuthentication from './routers/spotifyAuthentication.js'
import adminLogin from './routers/adminLogin.js'
import spotifySearch from './routers/spotifySearch.js'
import http from 'http'
import { Server } from 'socket.io'
import {socketHandler} from './sockets/socketHandler.js'
dotenv.config()
const app = express()

// RUN SETTINGS
const isNoLimit = process.argv.indexOf('nolimit') !== -1

// GLOBAL MIDDLEWARE
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

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


io.on("connection", (socket) => {
  console.log(socket);
  socket.emit("queue", "--- test queue ---");
});

socketHandler(io)

server.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is running')
    console.log('limits = ' + !isNoLimit)
  }
})
