const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');
const isLoggedIn = require('../authentication/authentication');
const upload = require('../middlewares/multer');

postRouter.get('/', isLoggedIn, postController.getAllPosts);
postRouter.get('/:id', isLoggedIn, postController.getPostById);

postRouter.post('/', isLoggedIn, upload.single("file"), postController.addPosts);
postRouter.post('/:id', isLoggedIn, postController.addCommentToPost);

module.exports = postRouter;