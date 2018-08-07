const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const performanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  song: { type: Schema.Types.ObjectId, ref: "Song" },
  video_url: String,
  screenShot: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  views: [{
    createdAt: {type: Date, default: Date.now}
  }],
  comments: [
    {
      comment: String,
      date: Date,
      user: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ]
},
  {
    usePushEach: true
  });
performanceSchema.set("timestamps", true);

const Performance = mongoose.model("Performance", performanceSchema);
module.exports = Performance;
