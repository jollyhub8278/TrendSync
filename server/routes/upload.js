const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Folder to save uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.array('media'), (req, res) => {
  const files = req.files;
  res.json({
    message: 'Files uploaded successfully',
    files: files.map(file => ({
      url: `/uploads/${file.filename}`,
      name: file.originalname,
      type: file.mimetype
    }))
  });
});

module.exports = router;

// Serve static files from the uploads directory