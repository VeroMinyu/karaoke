const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const performanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  song: { type: Schema.Types.ObjectId, ref: "Song" },
  video_url: String,
  caption_url: String,
  likes: { type: Number, default: 0 },
  comments: [
    {
      comment: String,
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
