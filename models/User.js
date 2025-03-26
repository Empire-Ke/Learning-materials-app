const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 8),
    role: 'admin',
    points: 0,
    badges: []
  },
  {
    id: 2,
    username: 'user',
    password: bcrypt.hashSync('user123', 8),
    role: 'user',
    points: 0,
    badges: []
  }
];

let nextId = 3;

const findUserByUsername = (username) => users.find(user => user.username === username);

const findUserById = (id) => users.find(user => user.id === id);

const saveUser = (user) => {
  user.id = nextId++;
  users.push(user);
  return user;
};

const updateUser = (user) => {
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index] = user;
  }
  return user;
};

module.exports = {
  findUserByUsername,
  findUserById,
  saveUser,
  updateUser,
  users // Exporting users array for testing purposes
};