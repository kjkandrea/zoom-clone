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

io.on('connection', socket => {
  socket['nickname'] = 'anonymous'
  socket.onAny(evt => console.log(`socket evt : ${evt}`))
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName)
    done(roomName)
    socket.to(roomName).emit('welcome', socket.nickname)
    socket.on('disconnecting',
      () => socket.rooms.forEach(room => socket.to(room).emit('bye', socket.nickname)))
    socket.on('new_message', (msg, sayRoomName, done) => {
      socket.to(sayRoomName).emit('new_message',  `${socket.nickname}: ${msg}`)
      done()
    })
    socket.on('nickname', nickname => socket.nickname = nickname)
  })
})

// const wss = new WebSocket.Server({ server })

// const sockets = []
//
// const parseMessagePayload = msg => msg.toString('utf8')
// const handleMessage = (msg, socket) => {
//   const { type, payload } = JSON.parse(msg)
//   if (type === "message") sockets.forEach(s =>
//     s.send(JSON.stringify({
//       nickname: socket.nickname,
//       message: parseMessagePayload(payload)
//     })))
//   if (type === "nickname") socket['nickname'] = payload
// }
//
// const handleConnection = socket => {
//   sockets.push(socket)
//   console.log('🧚 WebSocket Connected to Client.')
//   socket['nickname'] = 'anonymous'
//
//   socket.on('close', ()=> console.log('🧚 WebSocket Disconnected from
// Client.')) socket.on('message', msg => handleMessage(msg, socket)) }
// wss.on("connection", handleConnection)

server.listen(3000, handleListen)