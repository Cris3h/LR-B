const database = require("../../schemas/index");

const create = async (obj) => {
  const { image, images, ...rest } = obj;
  const payload = { ...rest };

  if (Array.isArray(images) && images.length > 0) {
    payload.images = images;
  } else if (image) {
    payload.images = [image];
  }

  const artWork = await database.ArtWork.create(payload);
  return artWork;
};

module.exports = create;