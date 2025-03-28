const multer = require("multer");
const path = require('path');
const { randomString } = require('../utils/utility');

const fileFilter = (req, file, next) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
        next(null, true); //allow the file
    } else {
        next(new Error("Only images with jpeg,png and gif formats are allowed"), false);//Reject the file 
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, 'public/images');
        },
        filename: (req, file, next) => {
            next(null, file.mimetype.split('/')[0].toLowerCase() + '_' + randomString() + '_' + Date.now() + path.extname(file.originalname).toLowerCase());
        }
    }),
    fileFilter: fileFilter,
    limits: { fileSize: 104857600 }
});

module.exports = upload;