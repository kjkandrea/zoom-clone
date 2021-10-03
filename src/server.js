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


wss.on("connection", socket => {
  console.log('🧚 WebSocket Connected to Client.')

  socket.on('close', ()=> console.log('🧚 WebSocket Disconnected from Client.'))
  socket.on('message', message => {
    console.log('client say : ', message.toString('utf8'))
  })

  socket.send('hello 🐶')
})

server.listen(3000, handleListen)