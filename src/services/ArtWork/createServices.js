const database = require("../../schemas/index");

const create = async (obj) => {
   const artWork = await database.ArtWork.create(obj);
   return artWork;
}

module.exports = create;