const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { generatemsg, generateLocation } = require('./Utils/messagestore')

const { addUser, removeUser, getUser, getUserInEvent } = require('./Utils/userstore')
  const io = require("socket.io")(server, {
    cors: [{
      origin: "https://localhost:44343",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    },
    {
      origin: "https://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    },
    {
      origin: "https://akawe-admin-dev.troondemo.com",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }]
  });
//const io = require("socket.io")(server)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
server.listen(3002, () => {
  console.log('listening on *:3002');
});

io.on('connection', (socket) => {
  console.log('a user connected');
    socket.on('join', (obj, cb) => { 
       debugger
        const { error, user } = addUser({ id: socket.id,userid:obj.userid, profilepath:obj.profilepath,username: obj.username, eventid: obj.eventid})

        if (error) {
            return cb(error)
        }
        obj['socketid'] = socket.id; 
        socket.join(user.eventid)
        const usersoc = getUser(socket.id);
        console.log('usersoc')
        console.log(usersoc)
        //socket.emit("message", obj)
        //socket.broadcast.to(user.eventid).emit("message", obj)
        // io.to(user.eventid).emit("eventData", {
        //     eventid: user.eventid,
        //     users: getUserInEvent(user.eventid)
        // })
        //cb()
        
        //io.emit('chat',obj)
    });
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    socket.on("sendMessage", (obj, cb) => {
      console.log(obj)
        const user = getUser(socket.id);
        console.log('usermessage')
        console.log(user)
        if(user!=undefined){
         
          io.to(user.eventid).emit("message", generatemsg(user, obj))
         
        }
        
        //cb()
    });
    socket.on("disconnect", () => {
        const user = removeUser(socket.id)
        console.log(user)
        if (user) {
            io.to(user.eventid).emit("message", generatemsg(`Admin ${user.username} A user  has left`))

            io.to(user.eventid).emit("roomData", {
              eventid: user.eventid,
                users: getUserInEvent(user.eventid)
            })
        }

    });
});

 
