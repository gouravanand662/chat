const express = require('express')        //importing the express module
const app = express()       //calling express function
const http = require('http').createServer(app)    //http server

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

//middleware- this tells us where our static files (like CSS) are
app.use(express.static(__dirname + '/public'))

//creating the route
app.get('/', (req, res) => {    //if someone requests for this URL
    res.sendFile(__dirname + '/index.html')   //then send this file
})

// Socket
// importing the socket
const io = require('socket.io')(http)    //through this the socket gets to know which server to work upon

io.on('connection', (socket) => {   //whenever any browser connects this functiongets called
    console.log('Connected...')     //ab yaha pe client-side se jo event emit kie the(message wagera) usko listen krna h
    socket.on('message', (msg) => {       //'message' me wahi name hga jo broadcast kia gya tha
        socket.broadcast.emit('message', msg)    //toh jo msg recieve ho rha h usko broadcast krna h to all the connected sockets or browser
    })

})
