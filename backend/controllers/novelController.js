const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { writeFile, readFile } = require('../models/info');

const authorsFilePath = path.join(__dirname, '..', 'data', 'authors.json');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const novelsFilePath = path.join(__dirname, '..', 'data', 'novels.json');
const chaptersFilePath = path.join(__dirname, '..', 'data', 'chapters.json');
const reviewsFilePath = path.join(__dirname, '..', 'data', 'reviews.json');

const uploadNovel = (req, res) => {
    const { userId, title, description, introVideo } = req.body;

    if (!userId || !title || !description || !introVideo) {
        res.status(400).json({ msg: "Novel details required." });
    }
    
    if (!req.file) {
        return res.status(404).send("No file were uploaded. ");
    }

    const authors = readFile(authorsFilePath);

    let author = null;
    for (let i = 0; i < authors.length; i++) {
        if (authors[i].userId === userId) {
            author = authors[i];
            break;
        }
    }

    if (!author) {
        return res.status(404).json({ msg: "Author not found" });
    }

    const newNovel = {
        id: uuidv4(),
        title,
        description,
        coverPhoto: req.file.filename,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        introVideo: introVideo,
        reviews: [],
        chapters: [],
        authorId: author.id
    };

    const novels = readFile(novelsFilePath);
    novels.push(newNovel);
    writeFile(novelsFilePath, novels);

    author.novels = author.novels || [];
    author.novels.push(newNovel.id);
    writeFile(authorsFilePath, authors);

    return res.status(201).json({ msg: "Novel uploaded", novel: newNovel });
};


const getNovels = (req, res) => {
    try {
        const novels = readFile(novelsFilePath);
        res.status(200).json(novels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNovelById = (req, res) => {
    try {
        const novels = readFile(novelsFilePath);
        for (let i = 0; i < novels.length; i++) {
            if (novels[i].id == req.params.id) {
                res.status(200).json(novels[i]);
            }
        }
    } catch (error) {
        res.status(404).send("No novel found...");
    }
}

const getNovelByTitle = (req, res) => {
    const novels = readFile(novelsFilePath);
    const novelsFound = [];
    for (let i = 0; i < novels.length; i++) {
      if (novels[i].title == req.params.title) {
        novelsFound.push(novels[i]);
      }
    }
    if (novelsFound.length > 0) {
      res.status(200).json(novelsFound);
    } else {
      res.status(404).send("No novels found...");
    }
}

const uploadChapter = (req, res) => {
    const { novelId } = req.params;
    const { chapterName, chapterContent } = req.body;
    
    if (!novelId || !chapterName || !chapterContent) {
        res.status(400).json({ msg: "Chapter Content required." });
    }

    const novels = readFile(novelsFilePath);
    let novel = null;
    for (let i = 0; i < novels.length; i++) {
        if (novels[i].id === novelId) {
            novel = novels[i];
            break;
        }
    }

    if (!novel) {
        return res.status(404).json({ msg: "Novel not found" });
    }

    const chapterNumber = novel.chapters.length + 1;

    const newChapter = {
        id: uuidv4(),
        novelId: novelId,
        chapterNumber: chapterNumber,
        chapterName: chapterName,
        chapterContent: chapterContent,
        timestamp: new Date().toLocaleString(),
    };

    const chapters = readFile(chaptersFilePath);

    chapters.push(newChapter);
    writeFile(chaptersFilePath, chapters);

    novel.chapters.push(newChapter.id);
    writeFile(novelsFilePath, novels);

    return res.status(201).json({ msg: "Chapter uploaded", chapter: newChapter });
};

const getChaptersByNovelId = (req, res) => {
    const { novelId } = req.params;

    const chapters = readFile(chaptersFilePath);
    const novelChapters = [];

    for (let i = 0; i < chapters.length; i++) {
        if (chapters[i].novelId === novelId) {
            novelChapters.push(chapters[i]);
        }
    }

    if (novelChapters.length === 0) {
        return res.status(404).json({ msg: "No chapters found for this novel." });
    }

    novelChapters.sort((a, b) => a.chapterNumber - b.chapterNumber);

    return res.status(200).json(novelChapters);
};

const uploadReview = (req, res) => {
    const { novelId } = req.params;
    const { userId, reviewTitle, reviewContent } = req.body;
    
    if (!novelId || !reviewTitle || !reviewContent) {
        res.status(400).json({ msg: "Review Content required." });
    }

    const novels = readFile(novelsFilePath);
    let novel = null;
    for (let i = 0; i < novels.length; i++) {
        if (novels[i].id === novelId) {
            novel = novels[i];
            break;
        }
    }

    if (!novel) { 
        return res.status(404).json({ msg: "Novel not found" });
    }

    const newReview = {
        id: uuidv4(),
        novelId: novelId,
        reviewTitle: reviewTitle,
        reviewContent: reviewContent,
        likes: 0,
        replies: [],
        timestamp: new Date().toLocaleString(),
    };

    const reviews = readFile(reviewsFilePath);

    reviews.push(newReview);
    writeFile(reviewsFilePath, reviews);

    novel.reviews.push(newReview.id);
    writeFile(novelsFilePath, novels);

    const users = readFile(usersFilePath);
    let user = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            user = users[i];
            break;
        }
    }
    if (user) {
        user.reviews.push(newReview.id);
        writeFile(usersFilePath, users);
    } else {
        res.status(404).json({ msg: "User not found." });
    }

    res.status(201).json({ msg: "Review uploaded", chapter: newReview });
};

const addReplyToReview = (req, res) => {
    const { content } = req.body;
    const reviews = readFile(reviewsFilePath);
    let review = null;
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].id == req.params.reviewId) {
            review = reviews[i];
            break;
        }
    }

    if (!review) {
        res.status(400).json({ msg: "Review not found" });
    }

    const reply = {
        id: uuidv4(),
        content: content,
        likes: 0,
        reviewId: req.params.reviewId,
        timestamp: new Date().toLocaleString()
    };
    review.replies.push(reply);
    writeFile(reviewsFilePath, reviews);

    res.status(201).json(reply);
};

const getReviews = (req, res) => {
    try {
        const reviews = readFile(reviewsFilePath);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    uploadNovel,
    getNovels,
    getNovelById,
    getNovelByTitle,
    uploadChapter,
    getChaptersByNovelId,
    uploadReview,
    addReplyToReview,
    getReviews
}