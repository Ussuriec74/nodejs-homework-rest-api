const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../tmp"),
  filename: (req, file, cb) => {
    const [filename, extencion] = file.originalname.split(".");
    cb(null, `${filename}.${extencion}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };



