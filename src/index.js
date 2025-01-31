const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)


const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))

server.listen(port , () => {
    console.log(`server is up ${port}`);
})