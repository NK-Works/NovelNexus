const { writeFile, readFile } = require('../models/info');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
const commentsFilePath = path.join(__dirname, '..', 'data', 'postComments.json');

const addPosts = (req, res) => {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
        return res.status(400).send("Bad request...");
    }

    if (!req.file) {
        return res.status(404).send("No file were uploaded. ");
    }

    const users = readFile(usersFilePath);
    const posts = readFile(postsFilePath);

    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            user = users[i];
            break;
        }
    }

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const post = {
        id: uuidv4(),
        title,
        content,
        image: req.file.filename,
        comments: [],
        likes: 0,
        userId,
        timeStamp: new Date().toLocaleString()
    };

    posts.push(post);
    writeFile(postsFilePath, posts);

    user.posts = user.posts || [];
    user.posts.push(post.id);
    writeFile(usersFilePath, users);

    res.status(201).json(post);
};

const getAllPosts = (req, res) => {
    try {
        const posts = readFile(postsFilePath);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
}

// Function to add a comment to a post
const addCommentToPost = (req, res) => {
    const {content} = req.body;
    const posts = readFile(postsFilePath);
    let post = null;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id == req.params.id) {
            post = posts[i];
            break;
        }
    }

    if (!post) {
        res.status(400).json({ msg: "Post not found" });
    }

    const comment = {
        id: uuidv4(),
        content: content,
        likes: 0,
        postId: req.params.id,
        timestamp: new Date().toLocaleString()
    };
    const comments = readFile(commentsFilePath);
    comments.push(comment);
    writeFile(commentsFilePath, comments);
    
    post.comments.push(comment.id);
    writeFile(postsFilePath, posts);
    res.status(201).json(comment);
};

const getCommentsByPost = (postId) => {
    const comments = readFile(commentsFilePath);
    const commentsByPost = [];
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].postId == postId) {
            commentsByPost.push(comments[i]);
        }
    }
    return commentsByPost;
}

const getPostById = (req, res) => {
    try {
        const posts = readFile(postsFilePath);
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id == req.params.id) {
                const postComments = getCommentsByPost(posts[i].id);
                // Combine post with its comments
                const postWithComments = {
                    ...posts[i],
                    comments: postComments
                };
                res.status(200).json(postWithComments);
            }
        }
    } catch (error) {
        res.status(404).send("No post found...");
    }
};

module.exports = {
    addPosts,
    getAllPosts,
    addCommentToPost,
    getPostById,
};
