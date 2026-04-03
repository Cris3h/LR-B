const database = require("../../schemas/index");


const getOne = async (id) => {
  const db = await database.ArtWork.findById(id).populate("comments");
  return db;
};

module.exports = getOne;

