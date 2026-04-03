const { Schema } = require("mongoose");

function mergeLegacyImages(doc, ret) {
  const hasImages = Array.isArray(ret.images) && ret.images.length > 0;
  if (!hasImages && ret.image) {
    ret.images = [ret.image];
  }
  if (!Array.isArray(ret.images)) ret.images = [];
  delete ret.image;
  return ret;
}

const artWorkSchema = new Schema({
  name: String,
  place: Object,
  /** @deprecated Preferir `images`; se fusiona en JSON si no hay array */
  image: String,
  images: { type: [String], default: [] },
  description: String,
  coordinates: Array,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

artWorkSchema.set("toJSON", {
  virtuals: true,
  transform: mergeLegacyImages,
});
artWorkSchema.set("toObject", {
  virtuals: true,
  transform: mergeLegacyImages,
});

module.exports = artWorkSchema;