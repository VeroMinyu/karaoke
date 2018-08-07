const express = require("express");
const router = express.Router();
const Performance = require('../models/Performance');
const { ensureLoggedIn } = require("connect-ensure-login");
const base64Img = require('base64-img')

const uploadCloud = require('../config/cloudinaryPerformances');
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

router.get('/', ensureLoggedIn(), (req, res, next) => {
  Performance.find().sort({ createdAt: -1 })
    .populate("user")
    .populate("song")
    .then(performances => res.status(200).json(performances))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.get('/user/:id', ensureLoggedIn(), (req, res, next) => {
  Performance.find({user: req.params.id})
    .sort({ createdAt: -1 })
    .populate("song")
    .then(perf => res.status(200).json(perf))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.get('/:id', ensureLoggedIn(), (req, res, next) => {
  Performance.findById(req.params.id)
    .then(perf => {
      return Performance.findByIdAndUpdate(perf._id, { $inc: { views: 1 } }, { new: true })
        .populate('user')
        .populate('song')
        .populate("likes")
        .populate('comments.user')
        .then(performance => res.status(200).json(performance))
    })
    .catch(e => res.status(500).json({ message: e.message }));
});

router.delete('/:id', ensureLoggedIn(), (req, res, next) => {
  Performance.findByIdAndRemove(req.params.id)
    .then(perf => res.status(200).json(perf))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.post("/", ensureLoggedIn(), uploadCloud.single("video"), (req, res, next) => {
  const { user, song, screenShot } = req.body;
  const base64Promise = new Promise((resolve, reject) => {
    base64Img.img(screenShot, "videos/screenshots", new Date().getTime(), (err, filepath) => {
      if (err) {
        reject(new Error(err.message));
      } else {
        resolve(filepath);
      }
    });
  });

  base64Promise
    .then(filepath => {
      const cloudinaryPromise = new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filepath, result => {
          if (result.hasOwnProperty("public_id")) {
            resolve(result);
          } else {
            reject(new Error("Error uploading file."));
          }
        }, { width: 640, folder: "users" });
      });
      return cloudinaryPromise;
    })
    .then(response => {
      if (req.file) {
        const newPerformance = new Performance({
          user,
          song,
          screenShot: response.secure_url,
          video_url: req.file.secure_url
        });

        return newPerformance.save();
      } else {
        throw new Error("Error saving video.");
      }
    })
    .then(performance => {
      res.status(200).json(performance);
    })
    .catch(e => res.status(500).json({ message: e.message }));
});

module.exports = router;