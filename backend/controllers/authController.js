const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const secret_key = "heyAnneshuITSmyJWTapplication"

const { writeFile, readFile } = require('../models/info');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const signupUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name, !email, !password) {
        return res.status(400).send("Bad request...");
    }

    const users = readFile(usersFilePath);
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            return res.status(400).json({
                msg: "Email already exists..."
            });
        }
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = {
        id: uuidv4(),
        name: name,
        email: email,
        role: "user", // author
        posts: [],
        reviews: [],
        likedNovels: 0,
        userimage: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        password: hashedPassword
    };

    users.push(newUser);
    writeFile(usersFilePath, users);
    return res.status(201).json(newUser);
}

const loginUser = (req, res) => {
    try {
        const users = readFile(usersFilePath);
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.body.email) {
                if (bcrypt.compareSync(req.body.password, users[i].password)) {
                    // Generate JWT
                    const token = jwt.sign({ userId: users[i].id }, secret_key, {expiresIn: '1d'});
                    res.cookie("token", token)
                    res.status(200).json({
                        msg: "Login successful...",
                        token: token
                    });
                    // console.log(token);
    
                } else {
                    res.status(400).json({
                        msg: "Incorrect password..."
                    });
                }
            }
        }
    } catch(error) {
        res.status(400).json({
            msg: "Email don't exist..."
        });
    }
}

const logoutUser = (req, res) => {
    res.status(200).cookie("token",  "").json({
        msg: "Logout successful..."
    });
};

module.exports = {
    signupUser,
    loginUser,
    logoutUser
};