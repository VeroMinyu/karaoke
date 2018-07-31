const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const songSchema = new Schema({
    title: String,
    artist: String,
    popularity: Number,
    video_name: String,
    lyrics: String
},{
    usePushEach: true
});

const Song = mongoose.model('Song', songSchema)
module.exports = Song;