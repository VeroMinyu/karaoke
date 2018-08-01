require('dotenv').config();

const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const { ensureLoggedIn } = require("connect-ensure-login");
const fs = require('fs');
const youtubedl = require('youtube-dl');
const youtubeSearch = require('youtube-search');
var opts = {
    maxResults: 15,
    key: process.env.API_KEY
};

router.get("/", ensureLoggedIn(), (req, res, next) => {
    Song.find().sort({ popularity: -1 })
        .then(songList => res.status(200).json(songList))
        .catch(e => res.status(500).json({ message: e.message }))
})

router.get("/:id", ensureLoggedIn(), (req, res, next) => {
    Song.findById(req.params.id)
        .then(oneSong => {
            return Song.findByIdAndUpdate(oneSong._id, { popularity: oneSong.popularity++ }, { new: true })
        })
        .then(song => res.status(200).json(song))
        .catch(e => res.status(500).json({ message: e.message }))
})

router.get("/recommendations/:artist", ensureLoggedIn(), (req, res, next) => {
    youtubeSearch(req.params.artist, opts, function (err, results) {
        if (err) res.status(500).json({ message: err.message });
        else {
            var cleaned = results.filter(song => song.kind == "youtube#video")
            var sorted = [];
            Song.find({})
            .then((data)=>{
                var allVideoIds = data.map(each => each.video_id)
                for (var i = 0; i < cleaned.length; i++) {
                    if (allVideoIds.includes(cleaned[i].id)) {
                        var index = allVideoIds.indexOf(cleaned[i].id);
                        sorted.unshift(data[index])
                    } else {
                        sorted.push(cleaned[i])
                    }
                }
                return res.status(200).json(sorted);
            })
            .catch(e => res.status(500).json({ message: e.message }))
        }
    });
})

router.post("/", (req, res, next) => {
    const { title, artist, youtube_url, lyrics } = req.body;

    const lyricsReady = transform(lyrics)
    const video_id = getVideoId(youtube_url);
    const imgReady = `https://img.youtube.com/vi/${video_id}/0.jpg`

    youtubedl.getInfo(youtube_url, function (err, info) {
        if (err) {
            res.status(500).json({ message: err.message })
        } else {
            var video = youtubedl(youtube_url, ['--format=18']);
            video.pipe(fs.createWriteStream(`videos/videos/${info.title}.mp4`));
            video.on('end', function () {
                const newSong = new Song({
                    title,
                    artist,
                    video_id,
                    video_name: `${info.title}.mp4`,
                    video_img: imgReady,
                    lyrics: lyricsReady
                })

                newSong.save()
                    .then(song => res.status(200).json(song))
                    .catch(err => res.status(500).json({ message: err.message }))
            });
        }
    })
})

const transform = lyrics => {
    const lyricsArr = lyrics.split(/\r\n|\n/);
    const result = [];
    lyricsArr.forEach(e => {
        if (e.search(/^(\[)(\d*)(:)(.*)(\])(.*)/i) >= 0) {
            const line = e.match(/^(\[)(\d*)(:)(.*)(\])(.*)/i);
            result.push({
                time: (parseInt(line[2]) * 60) + parseInt(line[4]),
                lyrics: line[6]
            });
        }
    });
    return result;
}

const getVideoId = url => {
    let video_id = url.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
}


module.exports = router;