import express from "express";

const app = express();
const port = 3000;

const handleListen = () => console.log('app listen : %s', `http://localhost:${port}`)
app.listen(port, handleListen)