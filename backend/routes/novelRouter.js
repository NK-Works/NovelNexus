const express = require('express');
const novelRouter = express.Router();
const novelController = require('../controllers/novelController');
const isLoggedIn = require('../authentication/authentication');
const upload = require('../middlewares/multer');

novelRouter.get('/', novelController.getNovels);
novelRouter.get('/:id', novelController.getNovelById);
novelRouter.get('/title/:title', isLoggedIn, novelController.getNovelByTitle);
novelRouter.get('/:novelId/chapters', isLoggedIn, novelController.getChaptersByNovelId);
novelRouter.get('/reviews', novelController.getReviews);
novelRouter.get('/:novelId/reviews', novelController.getReviewsByNovelId);
novelRouter.get('/:novelId/reviews/:reviewId', novelController.getReviewsById);

novelRouter.post('/', isLoggedIn, upload.uploadCoverPhoto.single('coverPhoto'), novelController.uploadNovel);
novelRouter.post('/:novelId/chapters', isLoggedIn, novelController.uploadChapter);
novelRouter.post('/:novelId/reviews', isLoggedIn, novelController.uploadReview);
novelRouter.post('/:novelId/reviews/:reviewId', novelController.addReplyToReview);

module.exports = novelRouter;
