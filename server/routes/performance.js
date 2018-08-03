const express = require("express");
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Performance = require('../models/Performance');
const multer = require("multer");
const upload = multer({ dest: "videos/karaoke" });

router.post('/', upload.single('video'), (req,res,next) => {
  const { user, song } = req.body;

  console.log(req.file);
  const newPerformance = new Performance({
    user,
    song,
    video_url: req.file.url ? req.file.url : ""
  });

  newPerformance.save().then(performance => {
    res.status(200).json(performance);
  })
  .catch(e => res.status(500).json({ message: e.message }));
})

module.exports = router;