fs = require('fs');

const words = [];

fs.readFile('./words.txt', (err, data) => {
  if (err) {
    return console.log(err);
  }
  var contents = data.toString().split('\n');
  for (var i = 0; i < contents.length; i++) {
    if (!/[^a-zA-Z]/.test(contents[i]) && contents[i].length >= 4) {
      words.push(contents[i].toLowerCase());
    }
  }

});

const users = [];

var rooms = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  var wins = 0;

  const user = { id, name, room, wins };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.slice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const findRoom = (room) => rooms.filter((r) => r[0] === room);

const addRoom = (room) => {
  const randwordfull = words[Math.floor(Math.random() * words.length)];
  const cut = Math.random() * (randwordfull.length - 3);
  const randword = randwordfull.slice(cut, cut + 3);
  rooms.push([room, randword, new Date()]);
  return randword;
};

const changeWord = (room) => {
  for (var i = 0; i < rooms.length; i++) {
    if (room == rooms[i][0]) {
      const randwordfull = words[Math.floor(Math.random() * words.length)];
      const cut = Math.random() * (randwordfull.length - 3);
      const randword = randwordfull.slice(cut, cut + 3);
      rooms[i][1] = randword;
      return randword;
    }
  }
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, findRoom, addRoom, words, changeWord };