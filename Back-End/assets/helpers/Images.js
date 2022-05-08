const multer = require("multer");

/** DiskStorage for Saving Images */

const Storage = multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, './assets/images')
        },
        filename:(req, file, cb)=>{
        cb(null,Date.now() + file.originalname)
    },
});

// Image mimetype validation
/*


*/ 
const Upload = multer({
        storage:Storage,
        limits: { 
            fileSize:1024 * 1024 * 5,
        }
    })
    

module.exports = Upload;    