const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = express.Router();

router.get("/", (req,res) => {
    res.send({response: "Running"}).status(200);
})

const { addUser, removeUser, getUser, getUsersInRoom, findRoom, addRoom, words, changeWord  } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
    
        if(error) return callback(error);
    
        socket.join(user.room);
    
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        var keyword = "";
        var roomname = findRoom(user.room);

        if (roomname.length == 0) {
          keyword = addRoom(user.room);
        } else {
          keyword = roomname[0][1];
        }
        
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), keyword: keyword });
        
        callback();
      });
    
      socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        if (!user) {
          return;
        }
        io.to(user.room).emit('message', { user: user.name, text: message });
        
        var currentTime = new Date();
        if (words.indexOf(message) != -1 && findRoom(user.room)[0] && message.includes(findRoom(user.room)[0][1])) {
          user.wins += 1;
          socket.emit('message', { user: 'admin', text: `${user.name} has won!`});
          socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has won!` });
          const newWord = changeWord(user.room);
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), keyword: newWord });
        } else if (message.includes("!skip") ) {
          if ((currentTime - findRoom(user.room)[0][2]) > 30000) {
            socket.emit('message', { user: 'admin', text: `Skipping this round...`});
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `Skipping this round...` });
            findRoom(user.room)[0][2] = currentTime;
            const newWord = changeWord(user.room);
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), keyword: newWord });
          }
        }
        callback();
      });
    
      socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
      })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})