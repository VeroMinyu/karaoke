const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const songSchema = new Schema({
    title: String,
    artist: String,
    popularity: {type: Number, default:0},
    video_id: String,
    video_name: String,
    video_img: String,
    offset: {type: Number, default: 0},
    lyrics: [{time:Number,lyrics:String}]
},{
    usePushEach: true
});
songSchema.set("timestamps", true);

const Song = mongoose.model('Song', songSchema)
module.exports = Song;