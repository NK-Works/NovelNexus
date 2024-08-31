const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { writeFile, readFile } = require('../models/info');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const authorsFilePath = path.join(__dirname, '..', 'data', 'authors.json');

const applyForAuthor = (req, res) => {
    const { userId, penName, bio } = req.body;

    if (!userId || !penName || !bio) {
        res.status(400).json({ msg: "Pen name and bio are required." });
    }

    const users = readFile(usersFilePath);
    const authors = readFile(authorsFilePath);

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            if (users[i].role === "author") {
                res.status(400).json({ msg: "User is already an author." });
            }

            users[i].role = "author";
            writeFile(usersFilePath, users);

            const newAuthor = {
                id: uuidv4(),
                userId: users[i].id,
                penName: penName,
                bio: bio,
                novels: [],
            };

            authors.push(newAuthor);
            writeFile(authorsFilePath, authors);

            res.status(200).json({ msg: "You have become an author.", author: newAuthor });
        }
    }

    res.status(404).json({ msg: "User not found." });
};

const getAuthors = (req, res) => {
    try {
        const authors = readFile(authorsFilePath);
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAuthorById = (req, res) => {
    try {
        const authors = readFile(authorsFilePath);
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].id == req.params.id) {
                res.status(200).json(authors[i]);
            }
        }
    } catch (error) {
        res.status(404).send("No author found...");
    }
};

module.exports = {
    applyForAuthor,
    getAuthors,
    getAuthorById,
};


