import express from "express";

const app = express()
const port = 3000

app.set("view engine", "pug")
app.set("views", __dirname + "/views")

app.get("/", (req, res) => res.render("home"))

const handleListen = () => console.log('app listen : %s', `http://localhost:${port}`)
app.listen(port, handleListen)