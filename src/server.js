import http from 'http'
import WebSocket from 'ws'
import express from "express";

const app = express()
const port = 3000

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"))

const handleListen = () => console.log('app listen : %s', `http://localhost:${port}`)

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const sockets = []

const parseMessagePayload = msg => msg.toString('utf8')
const handleMessage = msg => {
  const { type, payload } = JSON.parse(msg)
  if (type === "message") sockets.forEach(s => s.send(parseMessagePayload(payload)))
  if (type === "nickname") console.log(payload)
}

const handleConnection = socket => {
  sockets.push(socket)
  console.log('🧚 WebSocket Connected to Client.')

  socket.on('close', ()=> console.log('🧚 WebSocket Disconnected from Client.'))
  socket.on('message', handleMessage)

  socket.send('hello 🐶')
}

wss.on("connection", handleConnection)

server.listen(3000, handleListen)