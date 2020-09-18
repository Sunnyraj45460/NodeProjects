const socketIo=require('socket.io')
const io = socketIo(3000)

const users = {}

io.on('connection', socket => {

    socket.on('user-name',name=>{
        users[socket.id]=name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on("message", message => {
        socket.broadcast.emit("chat-message",{message,cname: users[socket.id]})
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})
