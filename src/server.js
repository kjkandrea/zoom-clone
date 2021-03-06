import http from 'http'
// import WebSocket from 'ws'
import SocketIO from 'socket.io'
import express from 'express'

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use('/public', express.static(__dirname + '/public'))
app.use('/assets', express.static(__dirname + '/assets'))
app.get('/', (req, res) => res.render('home'))

const handleListen = () => console.log('app listen : %s',
  `http://localhost:${port}`)

const server = http.createServer(app)
const io = SocketIO(server)

const getAdapter = io => {
  return io?.sockets?.adapter;
}

const getPublicRooms = io => {
  const { sids, rooms } = getAdapter(io)

  const publicRooms = []
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) publicRooms.push(key)
  })
  return publicRooms
}

const getRoomCount = (io, roomName) => {
  const { rooms } = getAdapter(io)
  return rooms.get(roomName)?.size ?? 0
}

io.on('connection', socket => {
  socket['nickname'] = 'anonymous'
  socket.onAny(evt => console.log(`socket evt : ${evt}`))
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName)
    done(roomName)
    socket.to(roomName).emit('welcome', socket.nickname, roomName, getRoomCount(io, roomName))
    io.sockets.emit("room_change", getPublicRooms(io))
  })
  socket.on('disconnecting', () => {
    socket.rooms.forEach(room => socket.to(room).emit('bye', socket.nickname, room, getRoomCount(io, room) - 1))
  })
  socket.on('disconnect', () => {
    io.sockets.emit("room_change", getPublicRooms(io))
  })
  socket.on('new_message', (msg, sayRoomName, done) => {
    socket.to(sayRoomName).emit('new_message', `${socket.nickname}: ${msg}`)
    done()
  })
  socket.on('nickname', nickname => socket.nickname = nickname)
})

server.listen(3000, handleListen)