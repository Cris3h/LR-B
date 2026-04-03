const database = require("../../schemas");

const getAll = async () => {
  const artWork =  await database.ArtWork.find({}).populate('comments'/*, ["can LF a property", ,]*/);
  return artWork;
}

module.exports = getAll;