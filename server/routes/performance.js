const express = require("express");
const router = express.Router();
const Performance = require('../models/Performance');
const { ensureLoggedIn } = require("connect-ensure-login");

const uploadCloud = require('../config/cloudinaryPerformances');

router.get('/', ensureLoggedIn(), (req, res, next) => {
  Performance.find().sort({ createdAt: -1 })
    .then(performances => res.status(200).json(performances))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.get('/:id', ensureLoggedIn(), (req, res, next) => {
  Performance.findById(req.params.id)
    .then(perf => res.status(200).json(perf))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.post('/', ensureLoggedIn(), uploadCloud.single('video'), (req, res, next) => {
  const { user, song } = req.body;

  if (req.file) {
    const newPerformance = new Performance({
      user,
      song,
      video_url: req.file.secure_url
    });
  
    newPerformance.save().then(performance => {
      res.status(200).json(performance);
    })
    .catch(e => res.status(500).json({ message: e.message }));
  } else {
    res.status(500).json({ message: "Error saving video." })
  }
});

module.exports = router;