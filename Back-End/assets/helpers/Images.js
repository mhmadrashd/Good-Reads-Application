const multer = require("multer");

/** DiskStorage for Saving Images */

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (req.baseUrl) {
      case "/user":
        cb(null, "./assets/images/users");
        break;
      case "/author":
        cb(null, "./assets/images/authors");
        break;
      case "/book":
        cb(null, "./assets/images/books");
        break;
      default:
        cb(null, "./assets/images");
        break;
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// Image mimetype validation
/*


*/
const Upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = Upload;
