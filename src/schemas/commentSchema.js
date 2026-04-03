const { Schema, createConnection } = require("mongoose");


const commentSchema = new Schema({
  user: String,
  /** URL de foto de perfil (p. ej. Google); comentarios viejos pueden no tenerla */
  picture: String,
  title: String,
  body: String,
  artwork_id: { type: Schema.Types.ObjectId, ref: "ArtWork" },
});

module.exports = commentSchema;
