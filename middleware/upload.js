const multer = require('multer');
const path = require('path');
const fs = require('fs');

/* ensure folder exists */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * @param {string} folder - uploads ke andar ka folder
 */
const createUploader = (folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join('uploads', folder);
      ensureDir(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() + '-' + file.fieldname + path.extname(file.originalname)
      );
    }
  });

  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 5MB
  });
};

module.exports = {
  categoryUpload: createUploader('categories'),
  productUpload: createUploader('products')
};
