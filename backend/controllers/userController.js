const path = require('path');

const { writeFile, readFile } = require('../models/info');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const getAllUsers = (req, res) => {
  try {
    const users = readFile(usersFilePath);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const getUserByName = (req, res) => {
  const users = readFile(usersFilePath);
  const usersFound = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].name == req.params.name) {
      usersFound.push(users[i]);
    }
  }
  if (usersFound.length > 0) {
    res.status(200).json(usersFound);
  } else {
    res.status(404).send("No users found...");
  }
}

module.exports = {
  getAllUsers,
  getUserByName
};

