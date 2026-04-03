const { Schema, createConnection } = require("mongoose");


const commentSchema = new Schema({
  user: String,
  title: String,
  body: String,
  artwork_id: { type: Schema.Types.ObjectId, ref: "ArtWork" },
});

module.exports = commentSchema;
