const express = require('express');
const novelRouter = express.Router();
const novelController = require('../controllers/novelController');
const isLoggedIn = require('../authentication/authentication');
const upload = require('../middlewares/multer');

novelRouter.get('/', isLoggedIn, novelController.getNovels);
novelRouter.get('/:id', isLoggedIn, novelController.getNovelById);
novelRouter.get('/title/:title', isLoggedIn, novelController.getNovelByTitle);
novelRouter.get('/:novelId/chapters', isLoggedIn, novelController.getChaptersByNovelId);
novelRouter.get('/:novelId/reviews', isLoggedIn, novelController.getReviews);

novelRouter.post('/', isLoggedIn, upload.single("file"), novelController.uploadNovel);
novelRouter.post('/:novelId/chapters', isLoggedIn, novelController.uploadChapter);
novelRouter.post('/:novelId/reviews', isLoggedIn, novelController.uploadReview);
novelRouter.post('/:novelId/reviews/:reviewId', isLoggedIn, novelController.addReplyToReview);

module.exports = novelRouter;
