const database = require("../../schemas/index");

const getAll = async () => {
   const comment = await database.Comment.find({}).populate('artwork_id') //para por si las dudas
   return comment;
};

module.exports = getAll;