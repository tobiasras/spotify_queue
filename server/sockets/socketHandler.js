export const socketHandler = (io) => {
    io.on("connection", (socket) => {        
        socket.emit("queue", "--- test queue ---");
    });
}

// io.on('connection', async socket => {
//   console.log('addToQueue')
//   socket.on('addToQueue', (addToQueue) => {
//     console.log(addToQueue)
//     // socket.emit('addToQueue', addToQueue);
//   })
// })
// io.on('connection', async socket => {
//   console.log('playing')
//   socket.on('playing', (playing) => {
//     console.log(playing)
//     // socket.emit('playing', playing);
//   })
// })
// io.on('connection', async socket => {
//   console.log('play')
//   socket.on('play', (play) => {
//     console.log(play)
//     // socket.emit('play', play);
//   })
// })
// io.on('connection', async socket => {
//   console.log('nextTrack')
//   socket.on('nextTrack', (nextTrack) => {
//     console.log(nextTrack)
//     // socket.emit('nextTrack', nextTrack);
//   })
// })
// io.on('connection', async socket => {
//   console.log('prevTrack')
//   socket.on('prevTrack', (prevTrack) => {
//     console.log(prevTrack)
//     // socket.emit('prevTrack', prevTrack);
//   })
// })

// ROUTES
