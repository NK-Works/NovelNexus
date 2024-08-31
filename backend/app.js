const express = require('express');
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const port = 3001;

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRotuer');
const postRouter = require('./routes/postRouter');
const authorRouter = require('./routes/authorRotuer');
const novelRouter = require('./routes/novelRouter');

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/authors', authorRouter);
app.use('/api/novels', novelRouter);


// Start server
app.listen((port),()=>{
    console.log(`Server running at http://localhost:${port}`);
  })