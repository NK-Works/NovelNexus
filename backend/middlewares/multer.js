const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Ensure directories exist
const coverPhotoPath = path.join(__dirname, '..', 'public', 'images', 'novelcovers');
const otherFilesPath = path.join(__dirname, '..', 'public', 'images', 'posts');

if (!fs.existsSync(coverPhotoPath)) {
    fs.mkdirSync(coverPhotoPath, { recursive: true });
}

if (!fs.existsSync(otherFilesPath)) {
    fs.mkdirSync(otherFilesPath, { recursive: true });
}

// Storage for cover photos
const coverPhotoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, coverPhotoPath);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename + path.extname(file.originalname));
    }
});

// Storage for other files
const postFilesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, otherFilesPath);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename + path.extname(file.originalname));
    }
});

// Create Multer instances
const uploadCoverPhoto = multer({ storage: coverPhotoStorage });
const uploadpostFiles = multer({ storage: postFilesStorage });

module.exports = {
    uploadCoverPhoto,
    uploadpostFiles
};
